<!--
title:   Next.js 13 App router vitest の In-source testing
tags:    AppRouter,Next.js,Vitest,sourceInCode
id:      56d56563a9d429e824f7
private: true
-->

# 前提

↓この記事はテスト駆動開発を実践するための下準備みたいな記事です。

Next.js App router での vitest テスト (テンプレートから始めるテスト駆動開発 Next.js 13 App router、 vitest 、 Storybook、 Plop) - Qiita

https://qiita.com/masakinihirota/items/3c7ef09cbaebfa702bba

これを vitest の In-source testing に書き直したいと思います。

vitest の In-source testing を使おうとすると、
コードのファイルとテストファイルを分けて使う設定が使えませんでした。
※これも後で調査



# vitestの インソーステスティングを調査

予定

Next.js App router をインストール

vitestをインストール

In-source testingに設定をする


コードとテストを書く

Qiita記事のコードを変換する

終了



# この記事のリポジトリ

masakinihirota/template_testdriven
https://github.com/masakinihirota/template_testdriven



----------------------------------------

# 第1部

## 使用ツール

Next.js 13 App router
vitest
Storybook
Plop

Windows
VSCode



## ツール紹介

### Next.js 13 App router

React のフレームワーク

Next.js by Vercel - The React Framework
https://nextjs.org/



### vitest

viteを利用しているテスティングフレームワーク

Vitest | A blazing fast unit test framework powered by Vite

https://vitest.dev/



----------------------------------------

# 環境構築

## Next.js 13 App router

インストール

npx create-next-app inSourceTesting

選択

	全部Yes



動作確認

npm run dev



----------------------------------------

## vitest のインストール

インストール

npm i @vitejs/plugin-react

※このライブラリは -D フラグでインストールすると認識しない。

npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitest/ui jsdom vitest



## 補助ツールのインストール

### typesync

typesyncは、TypeScriptの型定義を調べてダウンロードしてくれます。
package.jsonを見て足りない型定義パッケージがあれば自動で追加してくれます。

インストール

npm i -D typesync

使い方

npx typesync



## VSCode拡張機能

Vitest - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer

この拡張機能を使用するためには、npm run test を実行させておく必要があります。
(vitest の ウォッチモード)

VSCodeのエディタ画面の行の左にGREENやREDのアイコンが表示されています。
左クリックでテストの実行
右クリックでメニューが開きます。



----------------------------------------

# vitest の設定

スクリプトの追加

```package.json
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",

```
testはウォッチ形式でソースコードを保存するたびにテストが回ります。
test:uiはブラウザでテスト結果を表示してくれます。





## vitestのコンフィグ設定

touch vitest.config.ts

```vitest.config.ts
/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
  },
});

```

※src以下のフォルダにある テストファイルのみ有効




# サンプル01 基礎 シンプルなクライアントコンポーネントとそのテストコード

mkdir src/app/client
touch src/app/client/page.tsx
touch src/app/client/page.test.tsx


```src/app/client/page.tsx
"use client"

import React from "react"

export default function ClientComponent() {
  return <h1>Client Component</h1>
}

```



```src/app/client/page.test.tsx
import { render, screen } from "@testing-library/react"
import React from "react"
import { expect, test } from "vitest"

import ClientComponent from "./page"

test("App Router: Works with Client Components", () => {
  render(<ClientComponent />)
  expect(
    screen.getByRole("heading", { level: 1, name: "Client Component" })
  ).toBeDefined()
})

```

テストの動作確認

npm test



ブラウザで表示

```src/app\page.tsx
import ClientComponent from "./client/page";
import Counter from "./components/component";

export default function Home() {
  return (
    <main>
      <h1>Welcome to VNS.BLUE</h1>
      <ClientComponent />
    </main>
  );
}

```

動作確認

npm run dev




























