<!--
title:   Next.js 13 App router vitest の In-source testing
tags:    AppRouter,Next.js,Vitest,sourceInCode
id:      56d56563a9d429e824f7
private: true
-->

# この記事の趣旨

↓前回の記事で Next.js 13 App router での vitest テストコードを書く。 という記事を書きました。

Next.js App router での vitest テスト (テンプレートから始めるテスト駆動開発 Next.js 13 App router、 vitest 、 Storybook、 Plop) - Qiita

https://qiita.com/masakinihirota/items/3c7ef09cbaebfa702bba

この記事を vitest の In-source testing に書き直したいと思います。



# vitestの インソーステスティングを調査

予定

Next.js App router をインストール

vitestをインストール

In-source testingに設定をする


コードとテストを書く

Qiita記事のコードを変換する

終了



# この記事のリポジトリ

？？？？？？？？？？？？


----------------------------------------

# 使用ツール

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

```src/app/page.tsx
import ClientComponent from "./client/page";

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

これでテストとブラウザに表示することが出来ました。



----------------------------------------

# vitest の In Source Testing

次に、作成したテストをコードの中に組み込んでみたいと思います。


# コードの中にテストがかける仕組み。

vitestでは import.meta.vitest を使います。

import.meta.vitest の型定義は、tsconfig の types オプションに渡した vitest/importMeta が持っています。

テスト記述用のAPIは、通常の静的なインポートではなく、import.meta.vitest から取得します。
import.meta.vitest が定義されていない場合、if文全体が使われないコードになり、アプリケーションをビルドした時に、テスト関連のコードはまるごと消えます。

よって開発時にのみテストコードが有効になります。



※コード＋テストのファイルは、一緒になったがゆえに大きくなりがちですが、
その時は関心を分離するためのリファクタリングを行いましょう。

※このコード＋テストを書く時はエディタで同一ファイルを画面分割して編集をします。



# 設定

vitest.config.tsを編集します。

```vitest.config.ts
/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.vitest": false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{js,ts,jsx,tsx}"],
  },
});


```

import.meta.vitestをfalseにすることで、ビルド時にテストコードが含まれないようにします。



```tsconfig.json

    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vitest/importMeta"]
  },


```

import.meta.vitest の型情報を追加します。



# In-Sourceのテストコード


先程書いたコンポーネントの中にテストコードを組み込みます。

`import.meta.vitest` は、テストランナーが提供するオブジェクトで、`it` と `expect` メソッドを持っています。



```src/app/client/page.tsx
"use client";

import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

export default function ClientComponent() {
  return <h1>Client Component</h1>;
}

if (import.meta.vitest) {
  test("App Router: Works with Client Components", () => {
    render(<ClientComponent />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Client Component" })
    ).toBeDefined();
  });
}

```


コンポーネントのコードの中にテストコードを組み込んだら

src\app\client\page.test.tsx

このファイルを削除します。

テストファイルとする対象は
    include: ["src/**/*.{js,ts,jsx,tsx}"],
としたのでこの拡張子がつくファイルはすべてテストファイルが含まれると判定されてしまいます。

Next.jsはファイル名は固有のルールがあるので変更できないので、
それにも対応する必要があるようです。

import文もテストの時だけ使いたいので、これにも対処する必要があります。

















































































----------------------------------------

# 参考URL

Vitest | A blazing fast unit test framework powered by Vite

https://vitest.dev/

Features | Guide | Vitest

https://vitest.dev/guide/features.html#in-source-testing

VitestのIn-source Testingを試してみた | Marginalia

https://blog.lacolaco.net/2023/08/vitest-in-source-testing/

