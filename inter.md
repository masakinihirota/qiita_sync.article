

# Next.js App Router での i18n 関連の公式ドキュメント

Routing: Internationalization | Next.js

https://nextjs.org/docs/app/building-your-application/routing/internationalization

next.config.js Options: rewrites | Next.js

https://nextjs.org/docs/app/api-reference/next-config-js/rewrites


Routing: Middleware | Next.js

https://nextjs.org/docs/app/building-your-application/routing/middleware



## Next.js 13 の App Router に対応しているi18 nの Next.js公式サンプル

現在Next.jsが用意している App router対応の i18n 国際化に対応しているサンプルは、以下の2つです。



next.js/examples/app-dir-i18n-routing at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing



next.js/examples/with-next-translate at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-next-translate





### Next.js 公式サンプル app-dir-i18n-routing

Format.JSを使用したi18nのサンプル

next.js/examples/app-dir-i18n-routing at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing

Intl.LocaleMatcher | Format.JS

https://formatjs.io/docs/polyfills/intl-localematcher/





### Next.js 公式サンプル with-next-translate

next-translate を使用した i18n のサンプル

next.js/examples/with-next-translate at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-next-translate

aralroca/next-translate: Next.js plugin + i18n API for Next.js 🌍 - Load page translations and use them in an easy way!

https://github.com/aralroca/next-translate


# Next.js ドキュメント Internationalization ページの翻訳

Routing: Internationalization | Next.js

https://nextjs.org/docs/app/building-your-application/routing/internationalization





## ルーティングの概要

使用するロケールを選択するために、ブラウザの言語設定を使用することをお勧めします。好みの言語を変更すると、アプリケーションに送られてくる Accept-Language ヘッダが変更されます。

たとえば、次のライブラリを使用すると、受信リクエストを調べて、ヘッダー、サポートする予定のロケール、およびデフォルトのロケールに基づいて、どのロケールを選択するかを決定できます。

```middleware.js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'

match(languages, locales, defaultLocale) // -> 'en-US'

```

↑このコードはブラウザの言語設定に基づいて、どのロケールを選択するかを決定するためのサンプルコードです。

↑このコードの解説

まず、Negotiator ライブラリを使って、ブラウザが受け入れる言語のリストを取得します。このリストは、accept-language ヘッダーから取得されます。次に、アプリケーションがサポートするロケールのリストと、デフォルトのロケールを定義します。

最後に、match 関数を使って、ブラウザが受け入れる言語のリストと、アプリケーションがサポートするロケールのリストを比較し、最適なロケールを選択↓します。この関数は、@formatjs/intl-localematcher ライブラリを使って実装されています。

```
match(languages, locales, defaultLocale) // -> 'en-US'

```



このコードは、i18n を実現するために必要な、ロケールの判定とルーティングの一例です。

ブラウザの言語設定に基づいて、最適なロケールを選択することで、ユーザーにとって使いやすい多言語対応のWebアプリケーションを実現することができます。

ただし、このコードはサンプルコードであり、実際のアプリケーションには、さまざまな注意点があります。

例えば、ブラウザが受け入れる言語のリストが空の場合や、アプリケーションがサポートするロケールのリストに含まれない言語が指定された場合などに、適切なエラー処理が必要です。
※ブラウザに設定されていない場合、言語リストにない場合。


# 翻訳の続き

ルーティングは、サブパス（/fr/products）またはドメイン（my-site.fr/products）によって国際化できます。
この情報があれば、ミドルウェア内のロケールに基づいてユーザーをリダイレクトすることができます。



```middleware.js
import { NextResponse } from 'next/server'

let locales = ['en-US', 'nl-NL', 'nl']

// ブラウザの言語設定から最適なロケールを取得します。
function getLocale(request) { ... }

export function middleware(request) {
  // パス名にサポートされているロケールが含まれているかどうかを確認します。
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // ロケールがない場合はリダイレクトします。
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // 例えば、リクエストされたURLは/productsです。
    // 新しいURLは/en-US/productsです。
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}

```

↑このコードは、Next.js アプリケーションで i18n を実現するためのサンプルコードの一部です。

↑このコードの解説

まず、NextResponse を使って、リダイレクトを実現するためのミドルウェア関数 middleware を定義しています。
この関数では、リクエストされた URL にロケールが含まれていない場合に、ブラウザの言語設定に基づいてリダイレクトする処理を行っています。

具体的には、getLocale 関数を使って、ブラウザの言語設定から最適なロケールを取得します。次に、リクエストされた URL にロケールが含まれていない場合には、new URL を使って、ロケールを含む新しい URL を作成し、NextResponse.redirect を使ってリダイレクトします。

また、config オブジェクトには、matcher というオプションがあります。matcher オプションを使うことで、どの URL に対してこのミドルウェア関数を適用するかを指定することができます。上記の例では、/ 以外のすべての URL に対してこのミドルウェア関数を適用するように設定されています。

このコードは、i18n を実現するための一例であり、実際のアプリケーションには、さまざまな注意点があります。例えば、リダイレクトループを防ぐために、リダイレクト先の URL にロケールが含まれているかどうかをチェックする必要があります。また、ロケールの判定方法や、サポートするロケールのリストなどは、アプリケーションに合わせて適切に設定する必要があります。



↓最後に、app/内のすべての特殊ファイルがapp/[lang]の下にネストされていることを確認してください。こうすることで、Next.jsルーターはルート内で異なるロケールを動的に処理し、langパラメータをすべてのレイアウトとページに転送できるようになります。たとえば


```src/app/[lang]/page.js
// 現在のロケールにアクセスできるようになりました

// e.g. /en-US/products -> `lang` is "en-US"
// ja: /ja/products -> `lang` is "ja"
export default async function Page({ params: { lang } }) {
  return ...
}
```

ルートレイアウトは、新しいフォルダにネストすることもできます（例：app/[lang]/layout.js）。



## Localization

ユーザーの好みのロケール（地域化）に基づいて表示内容を変更することは、Next.jsに限ったことではありません。以下に説明するパターンは、どんなウェブアプリケーションでも同じように機能します。

アプリケーション内で英語とオランダ語のコンテンツをサポートしたいとします。2つの異なる "辞書 "を管理することになります。これは、あるキーからローカライズされた文字列へのマッピングを与えるオブジェクトです。


```dictionaries/en.json
{
  "products": {
    "cart": "Add to Cart"
  }
}

```

```dictionaries/nl.json
{
  "products": {
    "cart": "Toevoegen aan Winkelwagen"
  }
}

```

次に、getDictionary 関数を作成して、要求されたロケールの翻訳をロードします。

```src/app/[lang]/dictionaries.js
import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()

```

現在選択されている言語が与えられれば、レイアウトやページ内の辞書を取得することができます。


```src/app/[lang]/page.js
import { getDictionary } from './dictionaries'

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}

```

app/ディレクトリ内のすべてのレイアウトとページのデフォルトはServer Componentsなので、翻訳ファイルのサイズがクライアントサイドのJavaScriptバンドルのサイズに影響することを心配する必要はありません。このコードはサーバーでのみ実行され、結果のHTMLのみがブラウザに送信されます。



## SG (Static Generation)

与えられたロケールのセットに対して静的なルートを生成するために、任意のページもしくはレイアウトでgenerateStaticParamsを使うことができます。

これは、たとえば、ルートレイアウトでグローバルにできます：



```src/app/[lang]/layout.js
export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'ja' }]
}

export default function Root({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}

```


Next.js公式ドキュメント

 Internationalization ドキュメント の解説はここまで。


