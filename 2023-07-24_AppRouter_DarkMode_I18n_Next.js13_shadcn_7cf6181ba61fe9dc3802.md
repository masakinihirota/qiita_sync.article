<!--
title:   shadcn/ui で Next.js 13 App Router ダークモードを実装してみる。 それとi18n
tags:    AppRouter,DarkMode,I18n,Next.js13,shadcn
id:      7cf6181ba61fe9dc3802
private: true
-->

# 環境
Windows 10
VSCode
Node.js v20.4.0


Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

# プロジェクト作成

Next.js 13 App Router で作成します。

npx create-next-app@latest . --typescript --tailwind --eslint

App Router ... Yes
alias ... Yes



```
 npx create-next-app@latest . --typescript --tailwind --eslint
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in .

Using npm.

```

※インストール場所を動かしたらエラーが出るようになったので、もう一度。
pnpm installを実行するとエラーが消えました。


shadcn/ui をインストールします。

pnpm dlx shadcn-ui@latest init

```
.
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json

```

※↑まだ作成していないファイルもいくつかあります。

* UIコンポーネントはcomponents/uiフォルダに配置しています。
* <PageHeader />や<MainNav />などの残りのコンポーネントは、componentsフォルダに配置します。
* libフォルダにはすべてのユーティリティ関数が入っています。utils.tsにはcnヘルパーを定義しています。
* stylesフォルダにはグローバルCSSが入っています。



# 動作確認
buttonをインストールしてみます。

pnpm dlx shadcn-ui@latest add button

```src\app\page.tsx

```


pnpm run dev
