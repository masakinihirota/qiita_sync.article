<!--
title:   Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。
tags:    AppRouter,DarkMode,I18n,Next.js13,shadcn
id:      7cf6181ba61fe9dc3802
private: false
-->

shadcn/ui を利用した場合の ダークモード を調査しました。

ダークモードを使いたいだけならば、Chrome拡張機能である ↓ Dark Reader を使うのが簡単です。

https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh




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

Next.jsのインストール

npx create-next-app@latest shadcn_darkmode --typescript --tailwind --eslint

### TailwindCSS

src\app\globals.css
このファイルの配置を
src\styles\globals.css
へ移動します。

コマンド

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








## shadcnの初期化

npx shadcn-ui@latest init

global CSSのファイルの場所

src/styles/globals.css



```components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}

```



構造（参考）

```tree
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

* UIコンポーネントはcomponents/uiフォルダに配置しています。

* <PageHeader />や<MainNav />などの残りのコンポーネントは、componentsフォルダに配置します。

* libフォルダにはすべてのユーティリティ関数が入っています。utils.tsにはcnヘルパーを定義しています。

* stylesフォルダにはグローバルCSSが入っています。









ボタンを追加してみる

npx shadcn-ui@latest add button


ボタンを表示するコンポーネントを作成します。

```src\app\page.tsx
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1>VNS.BLUE</h1>
      <!-- ボタンコンポーネントテストページへのリンク -->
      <Link href="./ButtonTestPage">ButtonTestPage</Link>
    </main>
  )
}

```

ボタンコンポーネントテストページ

```src\app\ButtonTestPage\page.tsx
import { Button } from "@/components/ui/button"

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
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,          <<< TypeScriptを使う場合はtrue
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}

```



## Theming テーマ設定

Theming - shadcn/ui

https://ui.shadcn.com/docs/theming


テーマ設定に CSS変数 または TailwindCSS を使用します。

CSS 変数を使用する。
もしくは
Tailwind CSS の ユーティリティクラス を使用するかを選択できます。

ユーティリティクラス の例
<div className="bg-zinc-950 dark:bg-white" />

ユーティリティクラス を使用する場合の設定

```components.json
{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": false    ＜＜＜ false に設定します。
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}

```


CSS変数 の例

<div className="bg-background text-foreground" />

CSS変数 を使用する場合の設定

```components.json
{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true    ＜＜＜ true に設定します。
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}

```


Convention 規約

色に関しては、シンプルな背景と前景のコンベンションを使用しています。
前景変数はテキスト色に使用されます。
背景変数はコンポーネントの背景色に使用されます。

変数がコンポーネントの背景色に使用される場合、背景接尾辞は省略されます。

例えば、--primary-backgroundという変数は、コンポーネントの背景色に使用する場合は、--primaryとして省略して使用することができます。

例えば、次のようなCSS変数が与えられます。

--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;

※ --primary-backgroundは省略され--primaryになっています。


--primaryとは？
「--primary」は、カスタマイズ可能なCSS変数の一つで、プロジェクトで使用される主要な色を表します。
この変数は、コンポーネントの背景色やテキスト色など、プロジェクト内の様々な要素の色に使用されます。
例えば、以下のようにして「--primary」変数を使用して、背景色が変更されたdiv要素を作成することができます。

```
div {
  background-color: var(--primary);
}
```

「The background suffix」とは、前述の通り、背景色に使用されるCSS変数名において、接尾辞として使用される文字列のことを指します。例えば、変数名が「--primary」である場合、背景色に使用する場合は「--primary」とだけ指定し、接尾辞は省略されます。一方、テキスト色に使用する場合は、変数名に「-foreground」などの接尾辞を付けることが一般的です。このように、接尾辞を使用することで、変数名からどのような色が使用されるかを容易に理解することができます。




↑↑先程の↓この数値は

--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;

このように使われます。
<div className="bg-primary text-primary-foreground">Hello</div>

このコンポーネントの背景色は hsl(var(--primary))、前景色はhsl(var(--primary-foreground))となります。

CSS変数の値は、HSL色空間で定義されています。HSL色空間は、色相（Hue）、彩度（Saturation）、明度（Lightness）の3つの値を使用して色を表現します。HSL色空間は、RGB色空間よりも直感的に理解しやすいため、CSS変数の値をHSL色空間で定義しています。

HSLとは
HSLは、色相（Hue）、彩度（Saturation）、明度（Lightness）の3つの値を使用して色を表現する色空間の一つです。

色相は、色の種類を表し、0度から360度までの値で表されます。
彩度は、色の鮮やかさを表し、0%から100%までの値で表されます。
明度は、色の明るさを表し、0%から100%までの値で表されます。

例えば、赤色は色相が0度、彩度が100%、明度が50%となります。

CSS変数の値をHSL色空間で定義することで、色相、彩度、明度の値を直接指定することができます。











## List of variables

カスタマイズ可能なCSS変数の一覧

```
背景色
Default background color of <body />...その他
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;

薄い色調の背景色
Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch />
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;

カードの背景色
Background color for <Card />
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;

ユーザーがマウスオーバーしたときに表示される背景色
Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover />
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;

デフォルトのボーダー色
Default border color
--border: 214.3 31.8% 91.4%;

入力フィールドに使用されるボーダー色
Border color for inputs such as <Input />, <Select />, <Textarea />
--input: 214.3 31.8% 91.4%;

プライマリカラー
Primary colors for <Button />
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;

セカンダリカラー
Secondary colors for <Button />
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;

ホバーエフェクトなどのアクセントに使用されるカラー
Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;

「アクセントカラー」とは、UIの中で特定の要素に対して強調するために使用されるカラーを指します。例えば、ボタンやリンクなどのアクション要素に使用されます。アクセントカラーは、Primary colorsやSecondary colorsとは異なり、UIの中で特定の要素に対して強調するために使用されるため、視覚的に目立つ色が使用されることが多いです。プロジェクトによっては、Primary colorsとSecondary colorsに加えて、アクセントカラーとして「Third colors」を定義する場合があります。

削除やキャンセルなどの破壊的なアクションに使用されるカラー
Used for destructive actions such as <Button variant="destructive">
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;

フォーカスリングに使用されるカラー
Used for focus ring
--ring: 215 20.2% 65.1%;

フォーカスリングは、ユーザーがキーボードでフォーカスを移動したときに表示される、要素の周りに表示されるリング状のエフェクトです。

要素の角を丸めるために使用されるCSSプロパティ
Border radius for card, input and buttons
--radius: 0.5rem;

カード、入力フィールド、ボタンなどの要素に適用される角丸の半径

```


新しい色の追加
新しい色を追加するには、CSSファイルとtailwind.config.jsファイルに追加する必要があります。


```
app/globals.css
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
      },
    },
  },
}
```

これで、↓コンポーネントで警告ユーティリティ・クラスを使用できるようになりました。

<div className="bg-warning text-warning-foreground" />

その他のカラーフォーマット
テーマ設定にはHSLカラーを使用することをお勧めしますが、お好みにより他のカラーフォーマットを使用することもできます。

rgb、rgba、またはhslカラーの使用に関する詳細は、Tailwind CSSドキュメントを参照してください。



## ダークモード

Dark Mode - shadcn/ui

https://ui.shadcn.com/docs/dark-mode


### Create a theme provider テーマプロバイダーの作成

#### next-themes

next-themes - npm

https://www.npmjs.com/package/next-themes

デモ画面

https://next-themes-example.vercel.app/

Next.jsアプリのテーマを抽象化。

* 2行のコードで完璧なダークモードを実現
* prefers-color-schemeによるシステム設定
* カラースキームを使ったテーマブラウザUI
* 読み込み時にフラッシュなし(SSRとSSGの両方)
* タブとウィンドウ間でテーマを同期
* テーマ変更時のフラッシュを無効化
* 特定のテーマにページを強制的に合わせる
* クラスまたはデータ属性セレクタ
* useTheme フック

インストール

npm install next-themes


touch src\components\theme-provider.tsx

#### テーマプロバイダーの作成

```components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

#### ルートレイアウトにラップする

src\app\layout.tsx

```src\app\layout.tsx
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

```


#### テーマを切り替える モードトグルを作成する

odeTogglePageフォルダを作ります。

src\app\ModeTogglePage\page.tsx ファイルを作ります。

インストール
npx shadcn-ui@latest add dropdown-menu

```src\app\page.tsx
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1>VNS.BLUE</h1>
      <Link href="./ButtonTestPage">ButtonTestPage</Link>
      <Link href="./ModeTogglePage">ModeTogglePage</Link>
    </main>
  )
}

```

※↑各機能へのリンクを追加しました。



```src\app\ModeTogglePage\page.tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

```


npm run dev でローカルサーバーを起動して動作確認をします。

http://localhost:3000/ModeTogglePage











# 第２部 開発用テンプレート ＋ shadcn/uiダークモード

[WIP]








# 第３部 ダークモードの調査

[WIP]


































# shadcn/ui の読み方は？

作者本人のツィート

https://twitter.com/shadcn/status/1647397488742080512

> @shadcn how do i properly pronounce your handle when i'm introducing your projects to others 😅 been saying "shad-see-enn" but idk if that's correct

@shadcn 他の人にあなたのプロジェクトを紹介するとき、あなたのハンドルネームをどう発音すればいいのでしょうか？


> shad as in shadow

シャドウ

シャドウ ユーアイ
シャドウ ユーザーインターフェース

