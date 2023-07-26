<!--
title:   Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。
tags:    AppRouter,DarkMode,I18n,Next.js13,shadcn
id:      7cf6181ba61fe9dc3802
private: true
-->


# やること

shadcn/ui公式ドキュメント

Dark Mode - shadcn/ui

https://ui.shadcn.com/docs/dark-mode

1. Next.js に shadcn/ui でダークモードを追加する

shadcn/uiを調査する。
ダークモードが成功したら

2. 開発用テンプレートにダークモードを追加する

Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui) - Qiita

https://qiita.com/masakinihirota/items/3ad7a1564d2b6c56d4db


# 第１部 Next.js ＋ shadcn/uiダークモード

## はじめに - shadcn/ui

https://ui.shadcn.com/docs

コンポーネントライブラリではない

コンポーネントのコレクション

必要なコンポーネントを選択します。
コードをコピーしてプロジェクトに貼り付け、
ニーズに合わせてカスタマイズします。

## インストール - shadcn/ui

https://ui.shadcn.com/docs/installation

Next.jsを選択

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

npx create-next-app@latest my-app --typescript --tailwind --eslint

npx shadcn-ui@latest init

構造

```tree
src.
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

* UIコンポーネントはcomponents/uiフォルダに配置しています。

* <PageHeader />や<MainNav />などの残りのコンポーネントは、componentsフォルダに配置します。

* libフォルダにはすべてのユーティリティ関数が入っています。utils.tsにはcnヘルパーを定義しています。

* stylesフォルダにはグローバルCSSが入っています。


ボタンを追加してみる

npx shadcn-ui@latest add button

```ButtonTestPage.jsx
import { Button } from "@/components/ui"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

TypeScript

```components.json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "tsx": true,           <<< TypeScriptを使う場合はtrue
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}

```




























# 第２部 開発用テンプレート ＋ shadcn/uiダークモード










# 第３部 ダークモードの調査




































# shadcn/ui の読み方は？

作者本人のツィート

https://twitter.com/shadcn/status/1647397488742080512

> @shadcn how do i properly pronounce your handle when i'm introducing your projects to others 😅 been saying "shad-see-enn" but idk if that's correct

@shadcn 他の人にあなたのプロジェクトを紹介するとき、あなたのハンドルネームをどう発音すればいいのでしょうか？


> shad as in shadow

シャドウ

シャドウ ユーザーインターフェース

