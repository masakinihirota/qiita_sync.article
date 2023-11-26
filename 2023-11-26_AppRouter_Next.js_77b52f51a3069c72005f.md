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