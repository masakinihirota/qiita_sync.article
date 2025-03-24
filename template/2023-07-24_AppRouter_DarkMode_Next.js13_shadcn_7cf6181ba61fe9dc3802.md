<!--
title:   Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。
tags:    AppRouter,DarkMode,Next.js13,shadcn
id:      7cf6181ba61fe9dc3802
private: false
-->
# この記事に関して

shadcn/ui を利用した場合の ダークモード を調査しました。

純粋にダークモードを使いたいだけならば、Chrome 拡張機能である ↓ Dark Reader を使ってもらうのが簡単です。

https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh

# Next.js 13 App Router への対応は？

Next.js 13 App Router 使用時にはまだ問題があるようです。

Next.js 13 appDir support · Issue #152 · pacocoursey/next-themes

https://github.com/pacocoursey/next-themes/issues/152

対処方法は プロパティ suppressHydrationWarning を利用します。
その他に mount 状態をチェックします。

詳しくは ↑Issue を御覧ください。

# リポジトリ

## 第 1 部のコード

masakinihirota/shadcn_darkmode

https://github.com/masakinihirota/shadcn_darkmode

※この記事とリポジトリとのコードに差分がもしあった場合、リポジトリのコードが正しいものとなります。

# やること

公式ドキュメントを読む。

shadcn/ui 公式ドキュメント

Dark Mode - shadcn/ui

https://ui.shadcn.com/docs/dark-mode

1. Next.js に shadcn/ui でダークモードを追加する

shadcn/ui を調査する。
ダークモードが成功したら

2. 開発用テンプレートにダークモードを追加する

Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui) - Qiita

https://qiita.com/masakinihirota/items/3ad7a1564d2b6c56d4db

## 環境

Windows10
VSCode
Next.js 13 App Router
shadcn/ui

# 基本的な shadcn/ui コマンド

```shadcn/ui コマンド
初期化
npx shadcn-ui@latest init

※初期化コマンドは既存設定ファイルがある場合上書きされます。

CLI からのコンポーネントインストール方法
npx @shadcn/ui add

npx @shadcn-ui add [options] [components...]

※addコマンドは既存コンポーネントファイルがあっても上書きされます。(確認)

options:
  -y, --yes          skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command

```

# 第１部 Next.js ＋ shadcn/ui ダークモード

## はじめに - shadcn/ui

https://ui.shadcn.com/docs

shadcn/ui はコンポーネントライブラリではありません、
コンポーネントのコレクションです。

必要なコンポーネントを選択します。
コードをコピーしてプロジェクトに貼り付け、
ニーズに合わせてカスタマイズします。

CLI からでもインストールできます。

## インストール - shadcn/ui

https://ui.shadcn.com/docs/installation

Next.js を選択

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

Next.js のインストール

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

ja と日本語にも設定しておきます。

## shadcn の初期化

npx shadcn-ui@latest init

global CSS のファイルの場所を指定します。

src/styles/globals.css

初期化が終了すると、components.json というファイルが作成されます。

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

## ソース構造（参考）

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

- UI コンポーネントは components/ui フォルダに配置しています。

- <PageHeader />や<MainNav />などの残りのコンポーネントは、components フォルダに配置します。

- lib フォルダにはすべてのユーティリティ関数が入っています。utils.ts には cn ヘルパーを定義しています。

- styles フォルダにはグローバル CSS が入っています。

## ボタンを追加してみる

コンポーネントのインストール

npx shadcn-ui@latest add

button コンポーネントを選択します。

インストール場所

src\components\ui

インストールされたファイル

src\components\ui\button.tsx

ボタンを表示するコンポーネントを作成します。

```src\app\page.tsx
// import文の順番も自動整形されます。
import { type NextPage } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  return (
    <main>
      {/* TailwindCSSのプロパティ値も自動整列されます。 */}
      <h1 className="p-4 pt-2">VNS.BLUE</h1>
      Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui)
      <br />
      {/* ↓この行を消すとimport文が自動削除されます。 */}
      <Link href="/">Home</Link>
      <div>
        <Button>shadcn/ui の Button</Button>
      </div>
      <br />
      <Link href="./ModeTogglePage">ModeTogglePage</Link>
    </main>
  );
};

export default Home;

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

```components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,          ＜＜＜ TypeScriptを使う場合はtrue
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

テーマ設定に CSS 変数 または TailwindCSS を使用します。

CSS 変数を使用する、
もしくは
Tailwind CSS の ユーティリティクラス を使用するかを選択できます。

↓ ユーティリティクラス の例

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

CSS 変数 の例

<div className="bg-background text-foreground" />

CSS 変数 を使用する場合の設定

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

### Convention 規約

色に関しては、シンプルな背景と前景のコンベンションを使用しています。
前景変数はテキスト色に使用されます。
背景変数はコンポーネントの背景色に使用されます。

変数がコンポーネントの背景色に使用される場合、背景接尾辞は省略されます。

例えば、--primary-background という変数は、コンポーネントの背景色に使用する場合は、--primary として省略して使用することができます。

例えば、次のような CSS 変数が与えられます。

--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;

※ --primary-background は省略され--primary になっています。

--primary とは？
「--primary」は、カスタマイズ可能な CSS 変数の一つで、プロジェクトで使用される主要な色を表します。
この変数は、コンポーネントの背景色やテキスト色など、プロジェクト内の様々な要素の色に使用されます。
例えば、以下のようにして「--primary」変数を使用して、背景色が変更された div 要素を作成することができます。

```
div {
  background-color: var(--primary);
}
```

「The background suffix」とは、前述の通り、背景色に使用される CSS 変数名において、接尾辞として使用される文字列のことを指します。例えば、変数名が「--primary」である場合、背景色に使用する場合は「--primary」とだけ指定し、接尾辞は省略されます。一方、テキスト色に使用する場合は、変数名に「-foreground」などの接尾辞を付けることが一般的です。このように、接尾辞を使用することで、変数名からどのような色が使用されるかを容易に理解することができます。

↑↑ 先程の ↓ この数値は

--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;

このように使われます。

<div className="bg-primary text-primary-foreground">Hello</div>

このコンポーネントの背景色は hsl(var(--primary))、前景色は hsl(var(--primary-foreground))となります。

CSS 変数の値は、HSL 色空間で定義されています。HSL 色空間は、色相（Hue）、彩度（Saturation）、明度（Lightness）の 3 つの値を使用して色を表現します。HSL 色空間は、RGB 色空間よりも直感的に理解しやすいため、CSS 変数の値を HSL 色空間で定義しています。

HSL とは
HSL は、色相（Hue）、彩度（Saturation）、明度（Lightness）の 3 つの値を使用して色を表現する色空間の一つです。

色相は、色の種類を表し、0 度から 360 度までの値で表されます。
彩度は、色の鮮やかさを表し、0%から 100%までの値で表されます。
明度は、色の明るさを表し、0%から 100%までの値で表されます。

例えば、赤色は色相が 0 度、彩度が 100%、明度が 50%となります。

CSS 変数の値を HSL 色空間で定義することで、色相、彩度、明度の値を直接指定することができます。

### List of variables

カスタマイズ可能な CSS 変数の一覧

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

### 新しい色の追加

新しい色を追加するには、CSS ファイル と tailwind.config.js ファイル に追加する必要があります。

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

これで、↓ コンポーネントで警告ユーティリティ・クラスを使用できるようになりました。

<div className="bg-warning text-warning-foreground" />

その他のカラーフォーマット
テーマ設定には HSL カラーを使用することをお勧めしますが、お好みにより他のカラーフォーマットを使用することもできます。

rgb、rgba、または hsl カラーの使用に関する詳細は、Tailwind CSS ドキュメントを参照してください。

## ダークモード

Dark Mode - shadcn/ui

https://ui.shadcn.com/docs/dark-mode

### Create a theme provider テーマプロバイダーの作成

#### next-themes

next-themes - npm

https://www.npmjs.com/package/next-themes

デモ画面

https://next-themes-example.vercel.app/

Next.js アプリのテーマを抽象化。

- 2 行のコードで完璧なダークモードを実現
- prefers-color-scheme によるシステム設定
- カラースキームを使ったテーマブラウザ UI
- 読み込み時にフラッシュなし(SSR と SSG の両方)
- タブとウィンドウ間でテーマを同期
- テーマ変更時のフラッシュを無効化
- 特定のテーマにページを強制的に合わせる
- クラスまたはデータ属性セレクタ
- useTheme フック

インストール

npm install next-themes

touch src\components\theme-provider.tsx

#### テーマプロバイダーの作成

```components/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

```

#### ルートレイアウトにラップする

src\app\layout.tsx

```src\app\layout.tsx
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React from "react";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

```

※ suppressHydrationWarning は、React がクライアント側でレンダリングされたコンテンツをハイドレーションすることを抑制するために使用されます。

これで Next.js 13 App Router 使用時にダークモードを使用してもハイドレーションエラーが回避できると報告されています。

【Next.js 13】 next-themes でダークモードを実装する方法 | logsuke

https://logsuke.com/web/programming/react/next-themes

#### テーマを切り替える モードトグルを作成する

ModeTogglePage フォルダを作ります。

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

※↑ 各機能へのリンクを追加しました。

```src\app\ModeTogglePage\page.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

```

npm run dev

でローカルサーバーを起動して動作確認をします。

http://localhost:3000/ModeTogglePage

切り替えが確認できれば作業は完了です。

# 第２部 開発用テンプレート ＋ shadcn/ui ダークモード

第１部で調べた内容を↓このリポジトリに組み込みました。

masakinihirota/next13apptemplate

https://github.com/masakinihirota/next13apptemplate/tree/main

↓この記事の一部を切り出したものになります。

Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui) - Qiita

https://qiita.com/masakinihirota/items/3ad7a1564d2b6c56d4db


















# 第３部 ダークモードの調査

Tailwind CSS を使った ダークモード実装の効率的なアプローチ

https://zenn.dev/deer/articles/d3b104ac97711d

Tailwind CSS のダークモード対応ガイド - snappify.com

https://snappify.com/view/8d426d44-f485-4c62-9bc8-8efe23f558ea

> まとめ
> 以上を踏まえ、冒頭で紹介した CSS 変数と　カスタムカラーを使うアプローチが最適解だという結論に至りました。このアプローチは最近海外で注目を集めている shadcn/ui で知りました。 shadcn/ui をつかうとよくある変数の定義とカスタムカラーの紐付けをプロジェクトに反映することができるので興味のある方は試してみてください。

## ライブラリ next-themes について

next-themes - npm

https://www.npmjs.com/package/next-themes

## 簡単な解説

<html class="dark">

↑ このように HTML に dark クラスを追加すると、
↓ このように TailwindCSS の dark モードが有効になります。

<div className="dark:bg-darkgrey dark:text-white">

## インストール

npm install next-themes

## App Router での利用時の問題点

Next.js 13 appDir support · Issue #152 · pacocoursey/next-themes

https://github.com/pacocoursey/next-themes/issues/152

## shadcn/ui その他

### CLI

CLI - shadcn/ui

https://ui.shadcn.com/docs/cli

(実験的コマンド)

↓ 更新が利用可能なコンポーネントのリストを取得します。

npx shadcn-ui diff

↓ diff [component] コマンドで変更の確認します。

npx shadcn-ui diff alert

### タイポグラフィ 装飾の使い方

タイポグラフィ - shadcn/ui

https://ui.shadcn.com/docs/components/typography

### Figma

@shadcn/ui - Design System – Figma

https://www.figma.com/community/file/1203061493325953101



# 参考

【Next.js 13】 next-themes でダークモードを実装する方法 | logsuke

https://logsuke.com/web/programming/react/next-themes

※この記事には、ハイドレーションエラー対策があります。

Next × Stitches × next-themes を使用してダークモード実装

https://zenn.dev/hiro4hiro4/articles/e90778a816df84

Tailwind CSS を使った ダークモード実装の効率的なアプローチ

https://zenn.dev/deer/articles/d3b104ac97711d

