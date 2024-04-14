<!--
title:   Next.js 13 App Router の 国際化ドキュメント を色々と調査する。
tags:    AppRouter,I18n,Next.js,i18next
id:      873c2558e6d8864d8148
private: false
-->
# i18nを勉強する前に

ぼくたちのかんがえたさいきょうのi18n国家 - Qiita

https://qiita.com/yugui/items/55f2529c5a731badeff7

アプリをi18n対応する前に、まずはこの記事を読んでおくと良いと思います。この記事を読んだ後に、i18nを実装するときに、どのようなことに気をつければ良いかがわかると思います。そして実装前に心折れる人も出るかもしれません。ただ、日本語と英語だけだったら、ベタ書きで十分だと考えるようになるかもしれません。

AIはこの差分を十分に吸収できる可能性があると思います。



# この記事の目標

i18nの基礎知識を調べる。

そして、メジャーな言語に複数対応できるアプリにするためのi18nの知識を調べる。
最低でも3カ国以上で右から左になる文書（アラビア語）も使える程度のi18nを調べる。

i18nの完全対応というのは上記ブログを読めば不可能とわかるので、個人でそれほど負担にならない程度までを調べる。



# i18nとは

Internationalization の略で、国際化を意味します。
具体的には、アプリケーションの多言語化を実現するための技術です。

i18nを導入することで、アプリケーションの多言語化が容易になります。
例えば、日本語と英語の2つの言語をサポートするアプリケーションを開発する場合、i18nを使うことで、翻訳されたテキストを簡単に切り替えることができます。

i18nを実現するためには、多言語対応のテキストを別ファイルに分離し、アプリケーションからはそのファイルを参照するようにします。

また、多言語対応のテキストを動的に生成する場合は、テキストの生成方法をi18nに対応させる必要があります。



# ウェブアプリの2つの国際化手法

## ドメインルーティング

vns.jp なら日本語
vns.en なら英語
とドメイン最後部分を調べて言語を切り替える方法



## サブパスルーティング

vns.blue/jp なら日本語
vns.blue/en なら英語
とサブパスで切り替える方法

超大型アプリでもない限り、サブパスルーティングで十分だと思います。
※この記事ではサブパスルーティングを調べていきます。



# 国際化を実現させるための 主な2つの機能

i18n を実現させるためには 2つの機能をもたせる必要があります。



## 1.Localeの判定とそれにあわせたルーティング

対象言語にあったURLへのルーティング

例えばブラウザの設定が日本語だったら
そのブラウザからアクセスがあった場合は、日本語のページを表示する。



## 2.文章のローカライゼーション

対象文章の翻訳
辞書ファイルの用意

同じ画面でも、アクセスしてきたブラウザの設定が日本語の場合は日本語の文章を表示する。

アプリ側でも言語の切り返えスイッチを用意して、ユーザーが自由に言語の切り替えを出来るようにする。



# 用語

Locale: 言語や書式の設定を表す識別子。これには通常、ユーザーの好みの言語と、場合によっては地理的な地域が含まれる。

Localization: ローカライゼーション。Localeに基づいて、アプリケーションのテキストやその他のリソースを、対象の言語や地域に合わせて変更すること。

Internationalization: 国際化。アプリケーションを、ローカライゼーションをサポートするように設計すること。

i18n: 国際化を実現するための技術。

en-US: アメリカ英語

ja-JP: 日本語

nl: オランダ語、特定地域なし

nl-NL: オランダ語 オランダ



# Next.js 本体に備わっているネイティブな機能を利用した国際化

※国際化のライブラリを使用しない場合

Next.js のインストール

npx create-next-app -e with-supabase


Next.jsに備わっている国際化機能を利用する場合。

# Next.js Internationalization

Routing: Internationalization | Next.js
https://nextjs.org/docs/app/building-your-application/routing/internationalization

↑App router 対応の国際化ドキュメント



## ルーティングの概要

使用するロケールを選択するために、ブラウザの言語設定を使用することをお勧めします。
優先言語を変更すると、アプリケーションに送られてくる Accept-Language ヘッダが変更されます。

例えば、以下のライブラリを使うと、ヘッダ、サポート予定のロケール、 デフォルトのロケールに基づいて、どのロケールを選択するかを決定するために リクエストを見ることができます。



```middleware.js
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'

match(languages, locales, defaultLocale) // -> 'en-US'

```

ルーティングは、サブパス（/fr/products）またはドメイン（my-site.fr/products）によって国際化できます。
この情報があれば、ミドルウェア内のロケールに基づいてユーザーをリダイレクトすることができます。



このmiddleware.jsは、ブラウザの言語設定に基づいて、最適な言語を選択するためのロケールマッチングを行うためのものです。

以下に、コードの解説を記載します。

- `import { match } from '@formatjs/intl-localematcher'`：`@formatjs/intl-localematcher`
パッケージから `match` 関数をインポートします。この関数は、ブラウザの言語設定に基づいて、最適な言語を選択するためのロケールマッチングを行います。

- `import Negotiator from 'negotiator'`：`negotiator` パッケージから `Negotiator` クラスをインポートします。このクラスは、HTTP リクエストの `Accept-Language` ヘッダーから言語の優先順位を解析するために使用されます。

- `let headers = { 'accept-language': 'en-US,en;q=0.5' }`：HTTP リクエストの `Accept-Language` ヘッダーを表すオブジェクトを作成します。
このオブジェクトは、デフォルトの言語が `en-US` で、その他の言語が `en` であることを示しています。

HTTP リクエストの Accept-Language ヘッダーを表すオブジェクトを作成しています。
Accept-Language ヘッダーは、ブラウザがサポートする言語の優先順位を示します。
この例では、デフォルトの言語が en-US で、その他の言語が en であることを示しています。
q=0.5 は、言語の優先度を示すもので、q の値が大きいほど優先度が高くなります。q の値が省略された場合は、デフォルト値として q=1 が使用されます。

`Accept-Language` は、HTTP リクエストヘッダーの一つで、クライアントがサポートする言語の優先順位を示します。
このヘッダーは、Webサイトやアプリケーションが、ユーザーの言語設定に合わせたコンテンツを提供するために使用されます。
`Accept-Language` ヘッダーには、言語タグと優先度の情報が含まれます。言語タグは、言語と地域を表すコードで、例えば `en-US` は英語（アメリカ）を表します。
優先度は、言語タグの後ろに `;q=` と続く値で、0から1の範囲で指定されます。
優先度が高いほど、クライアントがその言語を優先することを示します。

例
Accept-Language: <language>
Accept-Language: *

↑<language>
言語タグです (「ロケール識別子」とも呼ばれることがあります)。これは言語を表す 2 ～ 3 文字の基本言語タグと、任意で追加のサブタグを '-' で区切って続けます。追加情報の多くは言語や地域の変化形 ('en-US' または 'fr-CA' など) または使用する文字の種類 ('sr-Latn' など) です。正書法の種類 ('de-DE-1996') など他の変化形は、通常このヘッダーのコンテキストでは使用されません。

```
// 重み値の構文によって重みづけされた複数の種別
Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5

```

↑このAccept-Languageヘッダーは、ブラウザがサポートする言語のリストを示しています。各言語には、優先度を示すq値が割り当てられています。この例では、ブラウザがサポートする言語の優先度は以下のようになっています。

- fr-CH: スイスのフランス語
- fr: フランス語
- en: 英語
- de: ドイツ語
- *: すべての言語

したがって、このヘッダーは、スイスのフランス語が最も優先され、次にフランス語、英語、ドイツ語、最後にすべての言語が優先されることを示しています。

;q= (Q 値の重み)
重みと呼ばれる、相対的な品質値を使用して表現される優先順位の順序で配置された値です。


- `let languages = new Negotiator({ headers }).languages()`：`Negotiator` クラスのインスタンスを作成し、`languages` メソッドを呼び出して、言語の優先順位を解析します。

- `let locales = ['en-US', 'nl-NL', 'nl']`：サポートされているロケールのリストを作成します。この例では、`en-US`、`nl-NL`、および `nl` の 3 つのロケールがサポートされています。

- `let defaultLocale = 'en-US'`：デフォルトのロケールを設定します。この例では、`en-US` がデフォルトのロケールとして設定されています。

- `match(languages, locales, defaultLocale)`：`match` 関数を呼び出して、最適なロケールを選択します。
この関数は、最適なロケールを返します。この例では、ブラウザの言語設定が `en-US` であるため、`en-US` が最適なロケールとして選択されます。

注意点としては、このコードは、ブラウザの言語設定に基づいて最適な言語を選択するための一例であり、実際のアプリケーションには適した方法で実装する必要があることです。また、このコードは、`Negotiator` クラスを使用して言語の優先順位を解析しているため、HTTP リクエストの `Accept-Language` ヘッダーが必要です。



Accept-Language - HTTP | MDN

https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept-Language





# Next.js ＋ 国際化のライブラリを利用する場合

## 主な i18nライブラリ

Next.js のApp routerに対応出来ているライブラリ。

i18next
react-i18next
next-i18next

next-i18next、react-i18next、i18next は、すべて i18n を実現するためのライブラリですが、それぞれ異なる役割を持っています。



### i18next

i18n のコアライブラリであり、多言語対応のテキストの翻訳や、ロケールの切り替えなどの機能を提供します。i18next は、JavaScript、TypeScript、React、Angular、Vue.js などのフレームワークやライブラリと統合することができます。

### react-i18next

React アプリケーションで i18next を使うためのライブラリです。react-i18next は、React コンポーネントで多言語対応のテキストを表示するための useTranslation フックや、Trans コンポーネントなどを提供します。

### next-i18next

Next.js アプリケーションで i18next を使うためのライブラリです。next-i18next は、Next.js のサーバーサイドレンダリングや静的サイト生成に対応した i18next の設定を提供します。また、next-i18next は、Next.js のルーティングと統合することができます。

これらのライブラリを組み合わせることで、React/Next.js アプリケーションで多言語対応のテキストを簡単に実現することができます。

※Next.js 13 のApp Router を使用する場合は、next-i18next は必要ありません。i18next と React-i18next を使用します。(↓のブログ参照)

i18n with Next.js 13/14 and app directory / App Router (an i18next guide)

https://locize.com/blog/next-app-dir-i18n/


今回、↑このブログの記事を元に、実装していきi18nに関して色々調べていきます。



# Next.js App Router での i18n関連 公式ドキュメント

Routing: Internationalization | Next.js

https://nextjs.org/docs/app/building-your-application/routing/internationalization

next.config.js Options: rewrites | Next.js

https://nextjs.org/docs/app/api-reference/next-config-js/rewrites


Routing: Middleware | Next.js

https://nextjs.org/docs/app/building-your-application/routing/middleware



## Next.js 13 の App Router に対応しているi18 nの Next.js公式サンプル

### Format.JSを使用したi18nのサンプル

next.js/examples/app-dir-i18n-routing at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples

Intl.LocaleMatcher | Format.JS

https://formatjs.io/docs/polyfills/intl-localematcher/





### next-translateを使用したi18nのサンプル
next.js/examples/with-next-translate at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-next-translate

aralroca/next-translate: Next.js plugin + i18n API for Next.js 🌍 - Load page translations and use them in an easy way!

https://github.com/aralroca/next-translate


# Next.js Internationalization ドキュメント

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

まず、Negotiator ライブラリを使って、ブラウザが受け入れる言語のリストを取得します。このリストは、accept-language ヘッダーから取得されます。次に、アプリケーションがサポートするロケールのリストと、デフォルトのロケールを定義します。

最後に、match 関数を使って、ブラウザが受け入れる言語のリストと、アプリケーションがサポートするロケールのリストを比較し、最適なロケールを選択します。この関数は、@formatjs/intl-localematcher ライブラリを使って実装されています。

このコードは、i18n を実現するために必要な、ロケールの判定とルーティングの一例です。ブラウザの言語設定に基づいて、最適なロケールを選択することで、ユーザーにとって使いやすい多言語対応のWebアプリケーションを実現することができます。ただし、このコードはサンプルコードであり、実際のアプリケーションには、さまざまな注意点があります。例えば、ブラウザが受け入れる言語のリストが空の場合や、アプリケーションがサポートするロケールのリストに含まれない言語が指定された場合などに、適切なエラー処理が必要です。

ルーティングは、サブパス（/fr/products）またはドメイン（my-site.fr/products）によって国際化できます。この情報があれば、ミドルウェア内のロケールに基づいてユーザーをリダイレクトすることができます。


```middleware.js
import { NextResponse } from 'next/server'

let locales = ['en-US', 'nl-NL', 'nl']

// ja: ブラウザの言語設定から最適なロケールを取得します。
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
    // e.g. incoming request is /products
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

まず、NextResponse を使って、リダイレクトを実現するためのミドルウェア関数 middleware を定義しています。
この関数では、リクエストされた URL にロケールが含まれていない場合に、ブラウザの言語設定に基づいてリダイレクトする処理を行っています。

具体的には、getLocale 関数を使って、ブラウザの言語設定から最適なロケールを取得します。
次に、リクエストされた URL にロケールが含まれていない場合には、new URL を使って、ロケールを含む新しい URL を作成し、NextResponse.redirect を使ってリダイレクトします。

また、config オブジェクトには、matcher というオプションがあります。matcher オプションを使うことで、どの URL に対してこのミドルウェア関数を適用するかを指定することができます。
上記の例では、/ 以外のすべての URL に対してこのミドルウェア関数を適用するように設定されています。

このコードは、i18n を実現するための一例であり、実際のアプリケーションには、さまざまな注意点があります。

例えば、リダイレクトループを防ぐために、リダイレクト先の URL にロケールが含まれているかどうかをチェックする必要があります。また、ロケールの判定方法や、サポートするロケールのリストなどは、アプリケーションに合わせて適切に設定する必要があります。

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

与えられたロケールのセットに対して静的なルートを生成するために、任意のページもしくはレイアウトでgenerateStaticParamsを使うことができます。これは、たとえば、ルートレイアウトでグローバルにできます：



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



Next.js Internationalization ドキュメント の解説はここまで。





# i18n with Next.js 13 and app directory ブログ

このブログをNext.jsで実装してみます。

i18n with Next.js 13/14 and app directory / App Router (an i18next guide)

https://locize.com/blog/next-app-dir-i18n/

※このブログによると 新しいアプローチが採用され next-i18next はもう必要ありません。



## 新しいアプローチを使用して国際化する方法

このセクションでは、 i18next、reverse-i18next、i18next-resources-to-backend を使用して新しいアプリ ディレクトリを国際化する方法を説明します。



Introduction - i18next documentation

https://www.i18next.com/

Introduction - react-i18next documentation

https://react.i18next.com/

i18next/i18next-resources-to-backend: This package helps to transform resources to an i18next backend

https://github.com/i18next/i18next-resources-to-backend



## インストール

npx create-next-app@latest . --typescript --tailwind --eslint

※使用するオプションを選択しておきます。

```
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in C:\2023src\next13appi18n.

Using npm.

```



### ライブラリのインストール

npm install i18next react-i18next i18next-resources-to-backend

src\app\globals.css
このファイルの配置を
src\styles\globals.css
へ移動します。

New-Item -ItemType Directory -Path "src\styles"

Move-Item -Path "src\app\globals.css" -Destination "src\styles\globals.css"

globals.css ファイルから、デフォルトのインストール画面で必要だった CSS 部分を削除し、TailwindCSS で必要な部分だけを残します。

```src\styles\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

globals.css ファイルを読み込んでいるファイルの path を修正します。

```src\app\layout.tsx
import '@/styles/globals.css'

...

<html lang='ja'>

```

jaと日本語にも設定しておきます。



## フォルダ構造

```フォルダ構造
src
└── app
    └── [lng]
        ├── second-page
        |   └── page.js
        ├── layout.js
        └── page.js

```


動的セグメントの作成
app/[lng]/
app/[lng]/page.js

例
app/ja/
app/en/

```src/app/[lng]/page.js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>VNS.BLUE</h1>
      <Link href={`/${lng}/second-page`}>
        second page
      </Link>
    </>
  )
}

```



```src/app/[lng]/second-page/page.js
import Link from "next/link"

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>VNS.BLUE second page!</h1>
      <Link href={`/${lng}`}>back</Link>
    </>
  )
}

```



```src/app/[lng]/layout.js
import { dir } from "i18next"

const languages = ["ja", "en"]

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  )
}

```



動作確認

npm run dev

http://localhost:3000/ja
http://localhost:3000/en

にアクセスすると ページが表示され、2ページ目へのリンクや戻るリンクも機能してるはずです。



## 言語の検出

前項で動作確認ができました、しかし

http://localhost:3000

にナビゲートするとNext.jsデフォルトページが返されます。

ここで Next.js ミドルウェア を作成し、コードを少しリファクタリングします：

まず、新しいファイル src/app/i18n/settings.js を作成します：

```src/app/i18n/settings.js
export const fallbackLng = "ja"
export const languages = [fallbackLng, "en"]

```



↓外部から設定ファイルを読み込みます。

```src/app/[lng]/layout.js
import { dir } from "i18next"

import { languages } from "../i18n/settings"

// ↑外部ファイルから読み込むために↓削除します
// const languages = ["ja", "en"]

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  )
}


```

ライブラリのインストール
npm install accept-language

```middleware.js
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

const cookieName = 'i18next'

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

ルートパス / に移動すると、最後に選択された言語のクッキーがすでにあるかどうかがチェックされ、フォールバックとしてAccept-Languageヘッダーがチェックされ、最後のフォールバックは定義されたフォールバック言語となります。

検出された言語は、適切なページにリダイレクトするために使用されます。










## i18n instrumentation

i18n instrumentation とは、
国際化対応（i18n）されたアプリケーションにおいて、ユーザーの言語設定や翻訳の使用状況などを計測することを指します。

i18n instrumentation を行うことで、ユーザーがどの言語を使用しているかや、どの翻訳がよく使われているかなどを把握することができます。これにより、アプリケーションの改善や、新しい言語のサポートなどに役立てることができます。

具体的には、i18n instrumentation を実現するためには、以下のような手法があります。

* イベントトラッキング：ユーザーが言語を切り替えたときや、翻訳を使用したときなどのイベントをトラッキングすることで、使用状況を把握することができます。

* ログ解析：アプリケーションのログから、ユーザーの言語設定や翻訳の使用状況を把握することができます。

* A/Bテスト：異なる翻訳を用意して、どちらがよく使われるかを比較することができます。

i18n instrumentation を行うことで、アプリケーションの改善や、ユーザーのニーズに合わせたサポートを提供することができます。ただし、プライバシーやセキュリティに関する問題にも注意する必要があります。




app/i18n/index.jsファイルでi18nextを準備しましょう: ここではi18nextのシングルトンを使用しませんが、コンパイルの間にすべてが並列に実行されるようなので、useTranslationの呼び出しごとに新しいインスタンスを作成します。別々のインスタンスを持つことで、翻訳の一貫性が保たれます。

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



app/i18n/settings.js ファイルに i18next オプションを追加します。


```src/app/i18n/settings.js
export const fallbackLng = "ja"
export const languages = [fallbackLng, "en"]
export const defaultNS = "translation"

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}

```

## 翻訳ファイルの場所

```
src
└── app
    └── i18n
        └── locales
            ├── en
            |   ├── translation.json
            |   └── second-page.json
            └── ja
                ├── translation.json
                └── second-page.json

```



```src/app/i18n/locales/en/translation.json
{
  "title": "Hi there!",
  "to-second-page": "To second page"
}

```

```src/app/i18n/locales/de/translation.json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite"
}

```


```src/app/i18n/locales/en/second-page.json
{
  "title": "Hi from second page!",
  "back-to-home": "Back to home"
}

```

```src/app/i18n/locales/de/second-page.json
{
  "title": "Hallo von der zweiten Seite!",
  "back-to-home": "Zurück zur Hauptseite"
}

```



サーバーページは非同期でuseTranslationのレスポンスを待つことができます。

```src/app/[lng]/page.js:
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


## 言語スイッチャー

次に、フッター コンポーネントで言語スイッチャーを定義しましょう。

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


react-i18nextのTransコンポーネントも使えます。

新しい名前空間:


```src/app/i18n/locales/en/footer.json
{
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}

```


```src/app/i18n/locales/de/footer.json
{
  "languageSwitcher": "Wechseln von <1>{{lng}}</1> nach: "
}

```



And add that Footer component to the pages:

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

すばらしいですね、最初の言語スイッチャーが作成されました。




※サーバー側でのエラー
useTranslationがサーバー側でawaitが使えないとエラーが出る。

src\app\[lng]\second-page\page.js
src\app\[lng]\components\Footer\index.js

```
// awaitが使えないとあるが、Next.js 13 ではサーバーサイドでawaitが使えるようになった
// 現在このページはサーバーサイドなのでエラーが出るのは間違い。無効化する。
// eslint-disable-next-line react-hooks/rules-of-hooks
const { t } = await useTranslation(lng, "footer")

```

※Next.jsでは基本全てのファイルはサーバーサイドで実行される。
ESlintはNext.js 13 の App Router に対応しきれておらず、クライアン側だと認識してしまっているのでこのエラーが出ているようだ。



## クライアント側

これまでのところ、サーバー側のページのみを作成しました。 それでは、クライアント側のページはどのように見えるのでしょうか? クライアント側の react コンポーネントは非同期にできないため、いくつかの調整を行う必要があります。


```src/app/i18n/client.js
'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

//
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
  }
  return ret
}

```

クライアント側では通常のi18nextシングルトンでよい。
一度だけ初期化されます。そして、"通常の "useTranslationフックを利用できます。言語を渡せるようにラップするだけです。

サーバーサイドの言語検出に合わせるために、i18next-browser-languagedetectorを利用し、それに従って設定します。

npm install i18next-browser-languagedetector

また、2つのバージョンのフッターコンポーネントを作成する必要があります。

```
src
└── app
    └── [lng]
        └── components
            └── Footer
                ├── client.js
                ├── FooterBase.js
                └── index.js

```




```src/app/[lng]/components/Footer/FooterBase.js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

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


サーバー側部分は引き続き非同期バージョン app/[lng]/components/Footer/index.js を使用します。



```src/app/[lng]/components/Footer/index.js
import { useTranslation } from "../../../i18n"
import { FooterBase } from "./FooterBase"

export const Footer = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "footer")
  return <FooterBase t={t} lng={lng} />
}

```

クライアント側部分は、新しい i18n/client バージョン、app/[lng]/components/Footer/client.js を使用します。

```src/app/[lng]/components/Footer/client.js
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```

クライアント側のページは次のようになります - app/[lng]/client-page/page.js

```src/app/[lng]/client-page/page.js
'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18n/client'
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

いくつかの翻訳リソースを使用すると、次のようになります。

```src/app/i18n/locales/en/client-page.json
{
  "title": "Client page",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "back-to-home": "Back to home"
}

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


最初のページのリンク - app/[lng]/page.js


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
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

```


翻訳リソース:

```src/app/i18n/locales/en/translation.json
{
  "title": "Hi there!",
  "to-second-page": "To second page",
  "to-client-page": "To client page"
}

```

```src/app/i18n/locales/de/translation.json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}

```

おめでとうございます🎊

結果は次のようになります

i18next/next-13-app-dir-i18next-example: Next.js 13 app directory feature in combination with i18next

https://github.com/i18next/next-13-app-dir-i18next-example



## ボーナス

locize.appを使用して、翻訳を管理する方法を学びましょう。

月700円ぐらい
2週間お試しfree



素晴らしい翻訳管理システムに接続し、コード外で翻訳を管理しましょう。

locizeで翻訳ファイルを同期しましょう。これはオンデマンドでも、CIサーバーでも、アプリをデプロイする前でもできます。

このステップに進むには
in locize: https://locize.app/register でサインアップし、ログインします。
locizeで：新しいプロジェクトを作成する。
locize-cliをインストールする。
locizeで: 追加言語をすべて追加する (これはAPI経由でも、locize-cliのmigrateコマンドでもできます)
locize-cliを使う
アプリをバンドルする前に、locize download コマンドを使用して、公開されている locize 翻訳を常にローカルリポジトリ（app/i18n/locales）にダウンロードします。

また、locize syncコマンドを使って、ローカルリポジトリ（app/i18n/locales）とlocizeで公開されている翻訳を同期させることもできます。

おめでとうございます🎊🎁。
新しいアプリディレクトリのセットアップ、Next.js、i18next、react-i18next、i18next-resources-to-backend、モダンローカライゼーションワークフローで、国際化についていくつか新しいことを学んでいただけたと思います。

ですから、もしあなたが国際化トピックを次のレベルに引き上げたいのであれば、ローカライゼーション管理プラットフォームであるlocizeを試してみる価値があります。

locizeの創設者はi18nextのクリエイターでもあります。ですから、locizeを使用することで、i18nextの未来を直接サポートすることになります。





localization & translation management platform | locize

https://locize.com/










----------------------------------------
----------------------------------------
----------------------------------------


# この項目のリポジトリ

next13appI18n

https://github.com/masakinihirota/next13appI18n



# インストール

## ライブラリのインストール

npm install i18next react-i18next i18next-resources-to-backend



## フォルダ構造

```フォルダ構造
src
└── app
    └── [lng]
        ├── second-page
         |   └── page.js
        ├── layout.js
        └── page.js

```

動的セグメントの作成
app/[lng]/
app/[lng]/page.js

例
app/ja/
app/en/

※[lng]は、このように言語ごとに階層を作ります。



mkdir src/app/[lng]
mkdir src/app/[lng]/second-page

touch src/app/[lng]/second-page/page.js
touch src/app/[lng]/layout.js
touch src/app/[lng]/page.js



```src/app/[lng]/second-page/page.js
import Link from "next/link";

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>VNS.BLUE 2</h1>
      2番目のページです。
      <Link href={`/${lng}`}>back</Link>
      <br />
      <Link href={`/`}>TOP page</Link>
    </>
  );
}

```



```src/app/[lng]/layout.js
import { dir } from "i18next";

const languages = ["en", "de"];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}

```




```src/app/[lng]/page.js
import Link from "next/link";

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>VNS.BLUE</h1>
      {lng}のページです
      <Link href={`/${lng}/second-page`}>second page</Link>
      <br />
      <Link href={`/`}>TOP page</Link>
    </>
  );
}


```


```src\app\page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import LogoutButton from "../components/LogoutButton";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Link href="/ja">日本語</Link>
      <Link href="/en">英語</Link>
    </>
  );
}

```

※トップページからのリンクを作成



動作確認

npm run dev

http://localhost:3000/ja
http://localhost:3000/en

にアクセスすると ページが表示され、2ページ目へのリンクや戻るリンクも機能してるはずです。



## 言語の検出

前項で動作確認ができました、しかし

http://localhost:3000

にナビゲートするとNext.jsデフォルトページが返されます。

ここで Next.js ミドルウェア を作成し、コードを少しリファクタリングします：

まず、新しいファイル src/app/i18n/settings.js を作成します：

mkdir src/app/i18n
touch src/app/i18n/settings.js

```src/app/i18n/settings.js
export const fallbackLng = "ja"
export const languages = [fallbackLng, "en"]

```



↓外部から設定ファイルを読み込みます。

```src/app/[lng]/layout.js
import { dir } from "i18next";

import { languages } from "../i18n/settings";

/**
 * Generates an array of objects containing the language parameter for each supported language.
 *
 * @return {Promise<Array<Object>>} An array of objects containing the language parameter for each supported language.
 */
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

/**
 * The root layout component that wraps the entire application.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.children - The child components to render.
 * @param {Object} props.params - The URL parameters.
 * @param {string} props.params.lng - The language parameter.
 * @return {JSX.Element} The rendered `RootLayout` component.
 */
export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}

```

ライブラリのインストール
npm install accept-language

```middleware.js
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

const cookieName = 'i18next'

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

ルートパス / に移動すると、最後に選択された言語のクッキーがすでにあるかどうかがチェックされ、フォールバックとしてAccept-Languageヘッダーがチェックされ、最後のフォールバックは定義されたフォールバック言語となります。

検出された言語は、適切なページにリダイレクトするために使用されます。










## i18n instrumentation

i18n instrumentation とは、
国際化対応（i18n）されたアプリケーションにおいて、ユーザーの言語設定や翻訳の使用状況などを計測することを指します。

i18n instrumentation を行うことで、ユーザーがどの言語を使用しているかや、どの翻訳がよく使われているかなどを把握することができます。これにより、アプリケーションの改善や、新しい言語のサポートなどに役立てることができます。

具体的には、i18n instrumentation を実現するためには、以下のような手法があります。

* イベントトラッキング：ユーザーが言語を切り替えたときや、翻訳を使用したときなどのイベントをトラッキングすることで、使用状況を把握することができます。

* ログ解析：アプリケーションのログから、ユーザーの言語設定や翻訳の使用状況を把握することができます。

* A/Bテスト：異なる翻訳を用意して、どちらがよく使われるかを比較することができます。

i18n instrumentation を行うことで、アプリケーションの改善や、ユーザーのニーズに合わせたサポートを提供することができます。ただし、プライバシーやセキュリティに関する問題にも注意する必要があります。




app/i18n/index.jsファイルでi18nextを準備しましょう
ここではi18nextのシングルトンを使用しませんが、コンパイルの間にすべてが並列に実行されるようなので、useTranslationの呼び出しごとに新しいインスタンスを作成します。別々のインスタンスを持つことで、翻訳の一貫性が保たれます。

touch src/app/i18n/index.js

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

/**
 * The hook that returns the translation function and i18n instance.
 *
 * @param {string} lng - The language code.
 * @param {string | string[]} ns - The namespace(s).
 * @param {Object} options - The options object.
 * @param {string} options.keyPrefix - The prefix for translation keys.
 * @returns {Promise<{ t: Function, i18n: i18n.Instance }>} The translation function and i18n instance.
 */
export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

```



app/i18n/settings.js ファイルに i18next オプションを追加します。


```src/app/i18n/settings.js
export const fallbackLng = "ja"
export const languages = [fallbackLng, "en"]
export const defaultNS = "translation"

/**
 * Returns the options object for i18next initialization.
 *
 * @param {string} lng - The language code.
 * @param {string} ns - The namespace.
 * @return {Object} The options object.
 * @property {boolean} [debug=false] - Whether to enable debug mode.
 * @property {string[]} supportedLngs - The supported language codes.
 * @property {string} fallbackLng - The fallback language code.
 * @property {string} lng - The current language code.
 * @property {string} fallbackNS - The fallback namespace.
 * @property {string} defaultNS - The default namespace.
 * @property {string} ns - The current namespace.
 */
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}

```

## 翻訳ファイルの場所

```
src
└── app
    └── i18n
        └── locales
            ├── en
            |   ├── translation.json
            |   └── second-page.json
            └── ja
                ├── translation.json
                └── second-page.json

```

mkdir src/app/i18n/locales/en
touch src/app/i18n/locales/en/translation.json
touch src/app/i18n/locales/en/second-page.json

mkdir src/app/i18n/locales/ja
touch src/app/i18n/locales/ja/translation.json
touch src/app/i18n/locales/ja/second-page.json


```src/app/i18n/locales/en/translation.json
{
  "title": "Hi there!",
  "to-second-page": "To second page"
}

```

```src/app/i18n/locales/ja/translation.json
{
  "title": "こんにちは！!",
  "to-second-page": "2ページ目へ"
}

```


```src/app/i18n/locales/en/second-page.json
{
  "title": "Hi from second page!",
  "back-to-home": "Back to home"
}

```

```src/app/i18n/locales/ja/second-page.json
{
  "title": "Hallo セカンドサイドから",
  "back-to-home": "メインページに戻る"
}

```



サーバーページは非同期でuseTranslationのレスポンスを待つことができます。

```src/app/[lng]/page.js:
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


## 言語スイッチャー

次に、フッター コンポーネントで言語スイッチャーを定義しましょう。

mkdir src/app/[lng]/components/Footer/
touch src/app/[lng]/components/Footer/index.js

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


react-i18nextのTransコンポーネントも使えます。

touch src/app/i18n/locales/en/footer.json

```src/app/i18n/locales/en/footer.json
{
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}

```

touch src/app/i18n/locales/ja/footer.json

```src/app/i18n/locales/ja/footer.json
{
  "languageSwitcher": "変更  <1>{{lng}}</1> nach: "
}

```



フッター・コンポーネントをページに追加する

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

すばらしいですね、最初の言語スイッチャーが作成されました。




※サーバー側でのエラー
※2023年8月31日現在ではエラーは表示されなくなっている。

useTranslationがサーバー側でawaitが使えないとエラーが出る。

src\app\[lng]\second-page\page.js
src\app\[lng]\components\Footer\index.js

```
// awaitが使えないとあるが、Next.js 13 ではサーバーサイドでawaitが使えるようになった
// 現在このページはサーバーサイドなのでエラーが出るのは間違い。無効化する。
// eslint-disable-next-line react-hooks/rules-of-hooks
const { t } = await useTranslation(lng, "footer")

```

※Next.jsでは基本全てのファイルはサーバーサイドで実行される。
ESlintはNext.js 13 の App Router に対応しきれておらず、クライアン側だと認識してしまっているのでこのエラーが出ているようだ。



## クライアント側

これまでのところ、サーバー側のページのみを作成しました。 それでは、クライアント側のページはどのように見えるのでしょうか? クライアント側の react コンポーネントは非同期にできないため、いくつかの調整を行う必要があります。

touch src/app/i18n/client.js

```src/app/i18n/client.js
'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// i18nextの初期化
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
  }
  return ret
}

```

クライアント側では通常のi18nextシングルトンでよい。
一度だけ初期化されます。そして、"通常の "useTranslationフックを利用できます。言語を渡せるようにラップするだけです。

サーバーサイドの言語検出に合わせるために、i18next-browser-languagedetectorを利用し、それに従って設定します。

npm install i18next-browser-languagedetector

また、2つのバージョンのフッターコンポーネントを作成する必要があります。

```
src
└── app
    └── [lng]
        └── components
            └── Footer
                ├── client.js
                ├── FooterBase.js
                └── index.js

```



touch src/app/[lng]/components/Footer/FooterBase.js

```src/app/[lng]/components/Footer/FooterBase.js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'

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


サーバー側部分は引き続き非同期バージョン app/[lng]/components/Footer/index.js を使用します。

src\app\[lng]\components\Footer\index.js

```src/app/[lng]/components/Footer/index.js
import { useTranslation } from "../../../i18n"
import { FooterBase } from "./FooterBase"

export const Footer = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "footer")
  return <FooterBase t={t} lng={lng} />
}

```

クライアント側部分は、新しい i18n/client バージョン、app/[lng]/components/Footer/client.js を使用します。

```src/app/[lng]/components/Footer/client.js
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```

クライアント側のページは次のようになります - app/[lng]/client-page/page.js

```src/app/[lng]/client-page/page.js
'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18n/client'
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

いくつかの翻訳リソースを使用すると、次のようになります。

```src/app/i18n/locales/en/client-page.json
{
  "title": "Client page",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "back-to-home": "Back to home"
}

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


最初のページのリンク - app/[lng]/page.js


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
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  )
}

```


翻訳リソース:

```src/app/i18n/locales/en/translation.json
{
  "title": "Hi there!",
  "to-second-page": "To second page",
  "to-client-page": "To client page"
}

```

```src/app/i18n/locales/de/translation.json
{
  "title": "Hallo Leute!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}

```

おめでとうございます🎊

結果は次のようになります

i18next/next-13-app-dir-i18next-example: Next.js 13 app directory feature in combination with i18next

https://github.com/i18next/next-13-app-dir-i18next-example



## ボーナス

locize.appを使用して、翻訳を管理する方法を学びましょう。

2週間お試しfree

素晴らしい翻訳管理システムに接続し、コード外で翻訳を管理しましょう。

locizeで翻訳ファイルを同期しましょう。これはオンデマンドでも、CIサーバーでも、アプリをデプロイする前でもできます。

このステップに進むには
in locize: https://locize.app/register でサインアップし、ログインします。
locizeで：新しいプロジェクトを作成する。
locize-cliをインストールする。
locizeで: 追加言語をすべて追加する (これはAPI経由でも、locize-cliのmigrateコマンドでもできます)
locize-cliを使う
アプリをバンドルする前に、locize download コマンドを使用して、公開されている locize 翻訳を常にローカルリポジトリ（app/i18n/locales）にダウンロードします。

また、locize syncコマンドを使って、ローカルリポジトリ（app/i18n/locales）とlocizeで公開されている翻訳を同期させることもできます。

おめでとうございます🎊🎁。
新しいアプリディレクトリのセットアップ、Next.js、i18next、react-i18next、i18next-resources-to-backend、モダンローカライゼーションワークフローで、国際化についていくつか新しいことを学んでいただけたと思います。

ですから、もしあなたが国際化トピックを次のレベルに引き上げたいのであれば、ローカライゼーション管理プラットフォームであるlocizeを試してみる価値があります。

locizeの創設者はi18nextのクリエイターでもあります。ですから、locizeを使用することで、i18nextの未来を直接サポートすることになります。





localization & translation management platform | locize

https://locize.com/






# 良さそうなライブラリ

QuiiBz/next-international: Type-safe internationalization (i18n) for Next.js

https://github.com/QuiiBz/next-international


# 参考

Next.jsのアプリを国際化対応する - Qiita

https://qiita.com/dende-h/items/7fc5e01c40b221641917






# 良さそうなライブラリ

QuiiBz/next-international: Type-safe internationalization (i18n) for Next.js
https://github.com/QuiiBz/next-international


# 参考

Next.jsのアプリを国際化対応する - Qiita

https://qiita.com/dende-h/items/7fc5e01c40b221641917

Next.jsで多言語対応のサイトを作るのが簡単すぎた件

https://zenn.dev/steelydylan/articles/nextjs-with-i18n
