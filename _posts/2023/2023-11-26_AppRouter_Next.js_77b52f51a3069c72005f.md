<!--
title:   Next.js のインストール時にsrcを選択した時と、しない時の差分の調査 (Next.js 14 App router)
tags:    AppRouter,Next.js
id:      77b52f51a3069c72005f
private: false
-->
Next.js のインストール時にsrcを選択した時としない時の差分の調査

Configuring: src Directory | Next.js

https://nextjs.org/docs/app/building-your-application/configuring/src-directory

# 理由
Next.jsサンプルなどで、srcフォルダを使わないApp routerのサンプルがあったので、
その時の差分はどこを修正すればいいのか調べました。

※自分は自分のコードをすべてsrcの下に置きたい派

↓例えば Vercel公式サンプルですが、srcフォルダは使われていません。

vercel/nextjs-subscription-payments: Clone, deploy, and fully customize a SaaS subscription application with Next.js.
https://github.com/vercel/nextjs-subscription-payments


この時自分でこのスターターを使う時に、ほんのちょっとファイルを修正するだけで、srcフォルダを使用できるようになります。

# 参考

Next.js App Router と Supabase と Stripe のスターターアプリに色んなパターンの環境変数を設定 #Next.js - Qiita
https://qiita.com/masakinihirota/items/1ae7d17377b8bac524d5

※Vercelのスターターを利用して、↑この記事を書いています。

----------------------------------------
----------------------------------------
----------------------------------------

# 差分＆移動＆修正

src/appフォルダを作ります。

```terminal
mkdir src/app

```

appフォルダの中身を、
src/appへ移動します。


```tailwind.config.ts
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
```

インストール時にTailwindCSSを使用しなければ修正は不要です。

```tsconfig.json
    "paths": {
      "@/*": ["./src/*"]
    }
```

必要なコードの修正箇所は2箇所だけです。
インストール時にpathsを設定しなければ修正は不要です。



# 追加

publicディレクトリはプロジェクトのルートに残しておきます。

package.json、next.config.js、tsconfig.jsonのような設定ファイルも、プロジェクトのルートに残しておきます。

.env.*ファイルはプロジェクトのルートに残しておきます。

src/appは、ルート・ディレクトリにappやpagesが存在する場合、無視されてしまいます。

srcを使用している場合、おそらく/componentsや/libなどの他のアプリケーションフォルダも移動します。（パスがきちんと設定してあれば移動させなくても大丈夫です。）

Middlewareを使用している場合は、srcディレクトリ内に配置されていることを確認してください。(※重要：結構忘れがち。)

Tailwind CSSを使用している場合は、contentセクションのtailwind.config.jsファイルに/srcプレフィックスを追加する必要があります。

# VSCodeのPath設定

VSCodeを利用している場合、ファイルを移動させるとファイル内のパスの設定が、
「自動で」変更されます。その時はpathが通るように「手動で」修正してください。



----------------------------------------
