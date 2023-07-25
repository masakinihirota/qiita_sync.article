<!--
title:   shadcn/ui で Next.js 13 App Router ダークモードを実装してみる。 それとi18n
tags:    AppRouter,DarkMode,I18n,Next.js13,shadcn
id:      7cf6181ba61fe9dc3802
private: true
-->

# shadcn/ui の読み方は？

作者本人のツィート

https://twitter.com/shadcn/status/1647397488742080512

> @shadcn how do i properly pronounce your handle when i'm introducing your projects to others 😅 been saying "shad-see-enn" but idk if that's correct

@shadcn 他の人にあなたのプロジェクトを紹介するとき、あなたのハンドルネームをどう発音すればいいのでしょうか？

> shad as in shadow

シャドウ

シャドウ ユーザーインターフェース



# 環境

Windows 10
VSCode
Node.js v20.4.0

# Next.js インストール

Next.js インストール参考URL

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next



# プロジェクト作成

## Next.js 13 App Router で作成します。

pnpm create next-app@latest . --typescript --tailwind --eslint

選択（基本、全てデフォルト）
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

globals.cssを下記の場所に移動します。

src\styles\globals.css

Next.js独自の設定を消して、Tailwind CSSが最低限動くだけの設定に変更します。

```src\styles\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```


globals.cssを移動したので、src\app\layout.tsxファイルの設定を変更します。

```src\app\layout.tsx
import './globals.css'
↓
import "@/styles/globals.css"
```


動作確認
npm run dev



## shadcn/ui をインストールします。

pnpm dlx shadcn-ui@latest init

※初期化命令のためこのコマンドを実行すると、前回までに設定したすべてのファイルが上書きされます。


設定は、すべてデフォルト値でEnterを押します。

```
07-25 06:16:36> npx shadcn-ui@latest init
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... app/globals.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/components
√ Configure the import alias for utils: ... @/lib/utils
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.

```

## Configure components.json

components.jsonの中身を見てみます。

```components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}

```

基本的にすべてデフォルト値なので同じになると思います。

# アプリの構造

```
src
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


shadcn-uiの型がないので
src\app\page.jsxに変更します。

```src\app\page.jsx
import { Button } from "src/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

動作確認
npm run dev





React ハイドレーション エラーを修正する: Next.js ガイド

https://blog.idrisolubisi.com/how-to-fix-react-hydration-error-in-nextjs-practical-guide#










