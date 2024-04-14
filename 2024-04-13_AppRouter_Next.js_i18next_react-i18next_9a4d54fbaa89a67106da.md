<!--
title:   Next.js App Router の国際化 i18n (i18next react-i18next 他) ハンズオン
tags:    AppRouter,Next.js,i18next,react-i18next
id:      9a4d54fbaa89a67106da
private: false
-->
この記事では下記のBlog記事を参考にNext.jsの国際化と、日本語翻訳の追加、TypeScriptの型の追加を0から追跡しています。



Next.js ＋
JavaScript版リポジトリ
TypeScript版(JavaScript版+型)リポジトリ

# 元となる記事

https://locize.com/blog/next-app-dir-i18n/

↑このBlog記事のソースコードが↓下記のリポジトリにあります。

## JavaScript版リポジトリ

i18next/next-app-dir-i18next-example: Next.js 13/14 app directory feature in combination with i18next

https://github.com/i18next/next-app-dir-i18next-example

## TypeScript版(JavaScript版+型)リポジトリ

i18next/next-app-dir-i18next-example-ts: Next.js 13/14 app directory feature in combination with i18next

https://github.com/i18next/next-app-dir-i18next-example-ts

↑これらの記事は、動作させるために少し訂正が必要です。

----------------------------------------

調査して完成(動作確認済み)した私のリポジトリ

masakinihirota/next_i18n_type

https://github.com/masakinihirota/next_i18n_type



----------------------------------------
----------------------------------------
----------------------------------------

※ハンズオン形式でNext.jsをインストールするところから始めます。(写経)

# JavaScript版のインストール

## Next.js インストール
pnpm dlx create-next-app [アプリ名]

※[アプリ名]はnext_i18n_typeとしました。

## ライブラリのインストール
pnpm install i18next react-i18next i18next-resources-to-backend accept-language react-cookie i18next-browser-languagedetector

# JavaScript版
約800行

フォルダ構造

```txt
src
└── app
    └── [lng]
        ├── second-page
        │   └── page.js
        ├── layout.js
        └── page.js

```

----------------------------------------
----------------------------------------
----------------------------------------

VSCode拡張機能
Ascii Tree Generator - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=aprilandjan.ascii-tree-generator

Blogなどに貼るTreeを作ります。

```plain.txt
#app
##[lng]
###second-page
#####page.js
###layout.js
###page.js

```


----------------------------------------
----------------------------------------
----------------------------------------

# 0

	normalのNext.jsを初期化

	src\app\page.tsx

	export default function Home() {
	  return (
	    <main className="">TOP PAGE
	    </main>
	  );
	}


	src\app\globals.css

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

削除
src\app\page.tsx
src\app\[lng]\layout.js

----------------------------------------

# 1 Folder structure

```terminal
mkdir src/app/[lng]/
touch src/app/[lng]/page.js

```

```src/app/[lng]/page.js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${lng}/second-page`}>
        second page
      </Link>
    </>
  )
}

```



```terminal
mkdir src/app/[lng]/second-page/
touch src/app/[lng]/second-page/page.js

```

```src/app/[lng]/second-page/page.js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi from second page!</h1>
      <Link href={`/${lng}`}>
        back
      </Link>
    </>
  )
}

```



```terminal
touch src/app/[lng]/layout.js

```

```src/app/[lng]/layout.js
import { dir } from 'i18next'

const languages = ['en', 'de']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

```

動作確認
表示される、リンクも動作する
http://localhost:3000/ja
http://localhost:3000/en
http://localhost:3000/de
http://localhost:3000/aaa

404
http://localhost:3000/



----------------------------------------

# 2 Language detection

```terminal
mkdir src/app/i18n/
touch src/app/i18n/settings.js

```

```src/app/i18n/settings.js
export const fallbackLng = 'ja'
export const languages = [fallbackLng, 'en']

```



編集 src/app/[lng]/layout.js

```src/app/[lng]/layout.js
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

```



```terminal
touch src/middleware.js

```

```src/middleware.js
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req) {
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}

```



動作確認

表示される、リンクも動作する
http://localhost:3000/ja
http://localhost:3000/en

404(登録していない言語)
http://localhost:3000/de
http://localhost:3000/aaa

自動遷移
http://localhost:3000/
↓
http://localhost:3000/ja



----------------------------------------

# 3 i18n instrumentation

```terminal
touch src/app/i18n/index.js

```

```src/app/i18n/index.js
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

```


編集 src/app/i18n/settings.js

```src/app/i18n/settings.js
export const fallbackLng = 'ja'
export const languages = [fallbackLng, 'en']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

```

## 翻訳ファイル

```text
src
└── app
    └── i18n
        └── locales
            ├── de
            │   ├── translation.json
            │   └── second-page.json
            ├── en
            │   ├── translation.json
            │   └── second-page.json
            └── ja
                ├── translation.json
                └── second-page.json

```



```terminal
mkdir src/app/i18n/locales/de/
mkdir src/app/i18n/locales/en/
mkdir src/app/i18n/locales/ja/

touch src/app/i18n/locales/de/translation.json
touch src/app/i18n/locales/en/translation.json
touch src/app/i18n/locales/ja/translation.json

touch src/app/i18n/locales/de/second-page.json
touch src/app/i18n/locales/en/second-page.json
touch src/app/i18n/locales/ja/second-page.json

```

```src/app/i18n/locales/de/translation.json
{
  "title": "Hallo und willkommen bei VNS.BLUE!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}

```

```src/app/i18n/locales/en/translation.json
{
  "title": "Hello and welcome to VNS.BLUE!",
  "to-second-page": "To second page",
  "to-client-page": "To client page"
}

```

```src/app/i18n/locales/ja/translation.json
{
  "title": "こんには、VNS.BLUEへようこそ!",
  "to-second-page": "2ページ目へ",
  "to-client-page": "クライアントページへ"
}

```


```src/app/i18n/locales/de/second-page.json
{
  "title": "Hallo von der zweiten Seite!",
  "back-to-home": "Zurück zur Seite 1"
}

```

```src/app/i18n/locales/en/second-page.json
{
  "title": "Hi from second page!",
  "back-to-home": "Go back to page 1 "
}

```

```src/app/i18n/locales/ja/second-page.json
{
  "title": "Hi from second page!",
  "back-to-home": "１ページに戻る"
}

```


編集 src/app/[lng]/page.js

```src/app/[lng]/page.js
import Link from 'next/link'
import { useTranslation } from '../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
    </>
  )
}

```



編集 src/app/[lng]/second-page/page.js

```src/app/[lng]/second-page/page.js
import Link from 'next/link'
import { useTranslation } from '../../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
    </>
  )
}

```


動作確認

Hello
http://localhost:3000/ja
http://localhost:3000/en

404
http://localhost:3000/aaa

デフォルト言語に遷移
http://localhost:3000/
↓
http://localhost:3000/ja



----------------------------------------

# 4. Language switcher

```terminal
mkdir src/app/[lng]/components/Footer/
touch src/app/[lng]/components/Footer/index.js

```

```src/app/[lng]/components/Footer/index.js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}

```


## 翻訳ファイル

```src/app/i18n/locales/de/footer.json
{
  "languageSwitcher": "Wechseln von <1>{{lng}}</1> nach: "
}

```

```src/app/i18n/locales/en/footer.json
{
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}

```

```src\app\i18n\locales\ja\footer.json
{
  "languageSwitcher": "変更する <1>{{lng}}</1> から "
}

```



編集 src/app/[lng]/page.js

```src/app/[lng]/page.js
import Link from 'next/link'
import { useTranslation } from '../i18n'
import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

```



編集 src/app/[lng]/second-page/page.js


```src/app/[lng]/second-page/page.js
import Link from 'next/link'
import { useTranslation } from '../../i18n'
import { Footer } from '../components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

```



----------------------------------------

# 5. Client side

```terminal
touch src/app/i18n/client.js

```

```src/app/i18n/client.js
'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages, cookieName } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) return
      setCookie(cookieName, lng, { path: '/' })
    }, [lng, cookies.i18next])
  }
  return ret
}

```

クライアント側では通常のi18nextシングルトンです。
一度だけ初期化されます。

そして、"通常の"useTranslationフックを利用できます。
言語を渡せるようにラップするだけです。
サーバーサイドの言語検出に合わせるために、
`i18next-browser-languagedetector` を利用し、
それに従って設定します。



```txt
src
└── app
    └── [lng]
        └── components
            └── Footer
                ├── client.js
                ├── FooterBase.js
                └── index.js

```

```terminal
touch src/app/[lng]/components/Footer/FooterBase.js

```

```src/app/[lng]/components/Footer/FooterBase.js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '@/app/i18n/settings'

export const FooterBase = ({ t, lng }) => {
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}

```

編集 src/app/[lng]/components/Footer/index.js

```src/app/[lng]/components/Footer/index.js
import { useTranslation } from '@/app/i18n'
import { FooterBase } from './FooterBase'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```


```terminal
touch src/app/[lng]/components/Footer/client.js

```

```src/app/[lng]/components/Footer/client.js
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```



```terminal
mkdir src/app/[lng]/client-page/
touch src/app/[lng]/client-page/page.js

```

```src/app/[lng]/client-page/page.js
'use client'

import Link from 'next/link'
import { useTranslation } from '@/app/i18n/client'
import { Footer } from '../components/Footer/client'
import { useState } from 'react'

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)
  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('counter', { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">
          {t('back-to-home')}
        </button>
      </Link>
      <Footer lng={lng} />
    </>
  )
}

```



## 翻訳ファイル

```terminal
touch src/app/i18n/locales/de/client-page.json
touch src/app/i18n/locales/en/client-page.json
touch src/app/i18n/locales/ja/client-page.json

```

```src/app/i18n/locales/de/client-page.json
{
  "title": "Client Seite",
  "counter_one": "eines ausgewählt",
  "counter_other": "{{count}} ausgewählt",
  "counter_zero": "keines ausgewählt",
  "back-to-home": "Zurück zur Hauptseite"
}

```

```src/app/i18n/locales/en/client-page.json
{
  "title": "Client page",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "back-to-home": "Back to home"
}

```

```src/app/i18n/locales/ja/client-page.json
{
  "title": "クライアントページ",
  "counter_one": "1つ選択されました",
  "counter_other": "{{count}}個選択されました",
  "counter_zero": "選択されていません",
  "back-to-home": "ホームに戻る"
}

```



```src/app/[lng]/page.js
import Link from 'next/link'
import { useTranslation } from '@/app/i18n'
import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

```

動作確認

http://localhost:3000/





----------------------------------------
----------------------------------------
----------------------------------------

これまで調べてきたJavaScript版に型を追加します。

↓これらのリポジトリを参考にしています。

## TypeScript版(JavaScript版+型)

i18next/next-app-dir-i18next-example-ts: Next.js 13/14 app directory feature in combination with i18next

https://github.com/i18next/next-app-dir-i18next-example-ts



# 型の追加

拡張子の変更と、型を追加したもの

----------------------------------------

# 1 Folder structure

----------------------------------------

# 2 Language detection

```src/app/[lng]/layout.tsx
import { dir } from 'i18next'

// const languages = ['en', 'de']
import { languages,fallbackLng } from '@/app/i18n/settings'
import { useTranslation } from '../i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng)
  return {
    title: t('title'),
    content: 'A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.'
  }
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

```


```src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
  let lng: string | undefined | null
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '')
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}

```

----------------------------------------

# 3 i18n instrumentation

```src/app/i18n/index.ts
import { createInstance, Namespace, FlatNamespace, KeyPrefix } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { FallbackNs } from 'react-i18next'
import { getOptions } from './settings'

const initI18next = async (lng: string, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  lng: string,
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {}
) {
  const i18nextInstance = await initI18next(lng, Array.isArray(ns) ? ns as string[] : ns as string)
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

```

```src/app/i18n/settings.ts
// export const fallbackLng = 'ja'
// export const languages = [fallbackLng, 'en']

export const fallbackLng = 'ja'
export const languages = [fallbackLng, 'en','de']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    // backend: {
    //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
    // }
  }
}

```

## 翻訳ファイル

```text
src
└── app
    └── i18n
        └── locales
            ├── de
            │   ├── translation.json
            │   └── second-page.json
            ├── en
            │   ├── translation.json
            │   └── second-page.json
            └── ja
                ├── translation.json
                └── second-page.json

```

```src/app/i18n/locales/de/translation.json
{
  "h1": "Ein einfaches Beispiel",
  "title": "Hauptseite",
  "to-client-page": "Zur client seitigen Seite",
  "to-second-page": "Zur zweiten Seite",
  "welcome": "Willkommen ZU Next.js 13/14 <1>mit den neuen App-Verzeichnisfunktionen</1> und i18next",
  "blog": {
    "text": "Schau dir den entsprechenden <1>Blogeintrag</1> dieses Beispiels an.",
    "link": "https://locize.com/blog/next-app-dir-i18n/"
  }
}

```

```src/app/i18n/locales/en/translation.json
{
  "h1": "A simple example",
  "title": "Home",
  "to-client-page": "To client page",
  "to-second-page": "To second page",
  "welcome": "Welcome to Next.js 13/14 <1>with the new app directory features</1> and i18next",
  "blog": {
    "text": "Check out the corresponding <1>blog post</1> describing this example.",
    "link": "https://locize.com/blog/next-app-dir-i18n/"
  }
}

```

```src/app/i18n/locales/ja/translation.json
{
  "h1": "シンプルなサンプル",
  "title": "こんには、VNS.BLUEへようこそ!",
  "to-client-page": "クライアントページへ",
  "to-second-page": "2ページ目へ",
  "welcome": "Next.js 13/14へようこそ <1>新しいアプリディレクトリ機能</1>とi18next",
  "blog": {
    "text": "この例を説明した<1>ブログ記事</1>をご覧ください。",
    "link": "https://locize.com/blog/next-app-dir-i18n/"
  }
}

```



```src/app/i18n/locales/de/second-page.json
{
  "h1": "Eine zweite Seite, um das Routing zu demonstrieren",
  "title": "Hallo von der zweiten Seite!",
  "back-to-home": "Zurück zur Seite 1"
}

```

```src/app/i18n/locales/en/second-page.json
{
  "h1": "A second page, to demonstrate routing",
  "title": "Hi from second page!",
  "back-to-home": "Go back to page 1 "
}

```

```src/app/i18n/locales/ja/second-page.json
{
  "h1": "A second page, to demonstrate routing",
  "title": "Hi from second page!",
  "back-to-home": "１ページに戻る"
}

```



----------------------------------------

# 4 Language switcher

翻訳ファイル

```src/app/i18n/locales/de/footer.json
{
  "description": "Dies ist eine Nicht-Seitenkomponente, die einen eigenen Namespace erfordert",
  "helpLocize": "Wenn Sie <1>locize</1> einsetzen, unterstützen Sie direkt die Zukunft von <3>i18next</3>.",
  "languageSwitcher": "Wechseln von <1>{{lng}}</1> nach: "
}

```

```src/app/i18n/locales/en/footer.json
{
  "description": "This is a non-page component that requires its own namespace",
  "helpLocize": "With using <1>locize</1> you directly support the future of <3>i18next</3>.",
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}

```

```src\app\i18n\locales\ja\footer.json
{
  "description": "これは独自の名前空間を必要とする非ページコンポーネントです。", "helpLocize": "<1>locize</1>を使用することで、<3>i18next</3>の未来を直接サポートします。",
  "languageSwitcher": "変更する <1>{{lng}}</1> から "
}

```



```terminal
touch src\app\[lng]\components\Header.tsx

```

```src\app\[lng]\components\Header.tsx
export const Header = ({ heading }: { heading: string }) => (
  <>
    <h2>
      Next.js 13 <small>(app directory)</small> - i18next
      <hr />
    </h2>
    <h1>{heading}</h1>
    <a className="github" href="//github.com/i18next/i18next">
      <i className="typcn typcn-social-github-circular" />
    </a>
  </>
)

```



```src/app/[lng]/page.tsx
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng)

  return (
    <>
      <main>
        <Header heading={t('h1')} />
        <h2>
          <Trans t={t} i18nKey="welcome">
            Welcome to Next.js v13 <small>appDir</small> and i18next
          </Trans>
        </h2>
        <div style={{ width: '100%' }}>
          <p>
            <Trans t={t} i18nKey="blog.text">
              Check out the corresponding <a href={t('blog.link')}>blog post</a> describing this example.
            </Trans>
          </p>
          <a href={t('blog.link')}>
            <img
              style={{ width: '50%' }}
              alt="next 13 blog post"
              src="https://locize.com/blog/next-app-dir-i18n/next-app-dir-i18n.jpg"
            />
          </a>
        </div>
        <hr style={{ marginTop: 20, width: '90%' }} />
        <div>
          <Link href={`/${lng}/second-page`}>
            <button type="button">{t('to-second-page')}</button>
          </Link>
          <Link href={`/${lng}/client-page`}>
            <button type="button">{t('to-client-page')}</button>
          </Link>
        </div>
      </main>
      <Footer lng={lng}/>
    </>
  )
}

```


```terminal
touch src\app\[lng]\second-page\layout.tsx

```

```src\app\[lng]\second-page\layout.tsx
import { languages, fallbackLng } from '../../i18n/settings'
import { useTranslation } from '../../i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'second-page')
  return {
    title: t('title')
  }
}

export default function Layout({ children }: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return children
}

```

```src/app/[lng]/second-page/page.tsx
import Link from 'next/link'
import { useTranslation } from '../../i18n'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default async function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <main>
        <Header
          heading={t('h1')}
        />
        <Link href={`/${lng}`}>
          <button type="button">
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer lng={lng} path="/second-page" />
    </>
  )
}

```

----------------------------------------

# 5 Client side


```src/app/i18n/client.ts
'use client'

import { useEffect, useState } from 'react'
import i18next, { FlatNamespace, KeyPrefix } from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions, UseTranslationResponse, FallbackNs } from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
// import LocizeBackend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages, cookieName } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  // .use(LocizeBackend) // locize backend could be used on client side, but prefer to keep it in sync with server side
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  lng: string,
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) return
      setCookie(cookieName, lng, { path: '/' })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lng, cookies.i18next])
  }
  return ret
}

```


```text
src
└── app
    └── [lng]
        └── components
            └── Footer
                ├── client.tsx
                ├── FooterBase.tsx
                └── index.tsx

```



```src/app/[lng]/components/Footer/FooterBase.tsx
import { i18n } from 'i18next'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

export const FooterBase = ({ i18n, lng, path = '' }: { i18n: i18n, lng: string, path?: string }) => {
  const t = i18n.getFixedT(lng, 'footer')
  return (
    <footer>
      <Trans i18nKey="languageSwitcher" t={t}>
        {/* @ts-expect-error Trans interpolation */}
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}${path}`}>
              {l}
            </Link>
          </span>
        )
      })}
      <p>{t('description')}</p>
      <p
        style={{
          fontSize: 'smaller',
          fontStyle: 'italic',
          marginTop: 20,
        }}
      >
        <Trans i18nKey="helpLocize" t={t}>
          With using
          <a href="https://locize.com" target="_new">
            locize
          </a>
          you directly support the future of
          <a href="https://www.i18next.com" target="_new">
            i18next
          </a>
          .
        </Trans>
      </p>
    </footer>
  )
}

```

```src/app/[lng]/components/Footer/index.tsx
import { useTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = async ({ lng, path }: {
  lng: string;
  path?: string;
}) => {
  const { t, i18n } = await useTranslation(lng, 'footer')
  return <FooterBase i18n={i18n} lng={lng} path={path} />
}

```



```src/app/[lng]/components/Footer/client.tsx
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'
// import { useParams } from 'next/navigation'

export function Footer({ lng, path }: {
  lng: string;
  path: string;
}) {
  const { i18n } = useTranslation(lng, 'footer')
  return <FooterBase i18n={i18n} lng={lng} path={path} />
}

// if you like to avoid prop drilling, you can do so with useParams()
// export function Footer({ path }: {
//   path: string;
// }) {
//   const params = useParams<{ lng: string; }>()
//   const { i18n } = useTranslation(params.lng, 'footer')
//   return <FooterBase i18n={i18n} lng={params.lng} path={path} />
// }

```



```terminal
touch src\app\[lng]\client-page\layout.tsx

```

```src\app\[lng]\client-page\layout.tsx
import { languages, fallbackLng } from '../../i18n/settings'
import { useTranslation } from '../../i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'client-page')
  return {
    title: t('title')
  }
}

export default function Layout({ children }: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return children
}

```

```src/app/[lng]/client-page/page.tsx
'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18n/client'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer/client'
import { useState } from 'react'

export default function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)
  return (
    <>
      <main>
        <Header heading={t('h1')} />
        <p>{t('counter', { count: counter })}</p>
        <div>
          <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
          <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
        </div>
        <Link href={`/${lng}/second-client-page`}>
          {t('to-second-client-page')}
        </Link>
        <Link href={`/${lng}`}>
          <button type="button">
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer lng={lng} path="/client-page" />
    </>
  )
}

```



## 翻訳ファイル

```terminal
touch src/app/i18n/locales/de/client-page.json
touch src/app/i18n/locales/en/client-page.json
touch src/app/i18n/locales/ja/client-page.json

```

```src/app/i18n/locales/de/client-page.json
{
  "back-to-home": "Zurück zur Hauptseite",
  "counter_one": "eines ausgewählt",
  "counter_other": "{{count}} ausgewählt",
  "counter_zero": "keines ausgewählt",
  "h1": "Eine client Seite, um das client-seitige i18n zu demonstrieren",
  "title": "Client Seite",
  "to-second-client-page": "zur zweiten client Seite"
}

```

```src/app/i18n/locales/en/client-page.json
{
  "back-to-home": "Back to home",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "h1": "A client page, to demonstrate client side i18n",
  "title": "Client page",
  "to-second-client-page": "to second client page"
}

```

```src/app/i18n/locales/ja/client-page.json
{
  "back-to-home": "ホームに戻る",
  "counter_one": "1つ選択されました",
  "counter_other": "{{count}}個選択されました",
  "counter_zero": "選択されていません",
  "h1": "クライアント・サイドの国際化を実証するためのクライアント・ページ",
  "title": "クライアントページ",
  "to-second-client-page": "2番目のクライアントページへ"
}

```



----------------------------------------
----------------------------------------
----------------------------------------

# 終わりに

この記事は、あるNext.jsのスターターをi18n(国際化)しようとしたところ
言語変換ができなかったので0から調べてみました。

## 通常のNext.js

0からインストールしたNext.jsを国際化した場合

言語変換ができた



## スターターを国際化してみた結果。

vercel/nextjs-subscription-payments: Clone, deploy, and fully customize a SaaS subscription application with Next.js.

https://github.com/vercel/nextjs-subscription-payments

このリポジトリを使ってi18n化したところ、言語変換ができなかった

[WIP]原因を調査中