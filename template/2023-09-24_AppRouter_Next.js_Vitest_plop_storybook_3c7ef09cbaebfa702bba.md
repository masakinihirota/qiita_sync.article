<!--
title:   Next.js App router での vitest テスト (テンプレートから始めるテスト駆動開発 Next.js 13 App router、 vitest 、 Storybook、 Plop)
tags:    AppRouter,Next.js,Vitest,plop,storybook
id:      3c7ef09cbaebfa702bba
private: false
-->
# この記事の趣旨

Next.js App router (React)でのテストコードはどう書かれているのかの調査

Next.js App routerでの
基本コンポーネントのテストコード
Hooksコンポーネントのテストコード
動的フォルダのテストコード
RSC(React Server Components)のテストコード

plopを使って、テンプレートを利用したテスト駆動開発の開発環境作り
plopを使うと最低限動くコンポーネントが自動生成されます。



# この記事のリポジトリ

masakinihirota/template_testdriven
https://github.com/masakinihirota/template_testdriven



# 理想的なテスト駆動開発のサイクル

1. コンポーネントの設計をします。

1. plopを使い `*.tsx` (コンポーネントのテンプレートファイル)を作成します。同時に `*.stories.js` (Storybookファイル)と `*.test.tsx` (テストファイル)も作成します。

1. テスト駆動開発 vitest を使ってサイクルを回します。
    * テストを書きます。 RED
    * コードを書きます。 GREEN
    * Storybookで動作確認をします。
    * リファクタリングを行います。 Refactoring
完成に近づくまで繰り返します。

1. 設計図通りに完成させます。

1. コンポーネントを本体に取り込みます。

以上を繰り返します。



# 第0部	 前提知識

## コロケーション

簡単に書くと、同じ場所にコードとテストファイルを置いておいたほうが保守しやすくなるのではないかという考え方。



## Next.js App router におけるサーバーコンポーネントとクライアントコンポーネント

Next.js で開発する上で知っておく知識

Next.jsでは基本的にコンポーネントはサーバーコンポーネントに設定されました。

クライアントコンポーネントとして使うには 最初の行に 'use client' というディレクティブをつけるなければなりません。

サーバーコンポーネントとクライアントコンポーネントの違いを知っておく必要があります。



## 表

Rendering: Composition Patterns | Next.js

https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

| 何がしたいか？ | Server Component | Client Component |
| --- | --- | --- |
| データの取得|✅| ❌|
| バックエンドのリソースに（直接）アクセスする。|✅| ❌|
| サーバー上に機密情報を保持する（アクセストークン、APIキーなど）。|✅| ❌|
| 大きな依存関係をサーバに残す / クライアントサイドのJavaScriptを減らす。|✅| ❌|
| インタラクティブ性とイベントリスナーを追加する (`onClick()`、`onChange()`など) | ❌ | ✅ |
| ステートとライフサイクルエフェクトを使う (`useState()`、`useReducer()`、`useEffect()` など) | ❌ | ✅ |
| ブラウザ専用のAPIを使う | ❌ | ✅ |.
| 状態、エフェクト、またはブラウザ専用APIに依存するカスタムフックを使用する。 | ❌ | ✅ |.
| [React Classのコンポーネント](https://react.dev/reference/react/Component)を使う。 | ❌ | ✅ |.


### サーバーコンポーネント側

データのフェッチ
バックエンドのリソースに（直接）アクセスする。
機密情報（アクセストークン、APIキーなど）をサーバーに保管する。
大きな依存関係をサーバに残す / クライアントサイドJavaScriptを減らす



### クライアントコンポーネント側

インタラクティブ性とイベントリスナーの追加 (onClick()、onChange()など)
ステートとライフサイクルエフェクトの使用 (useState(), useReducer(), useEffect() など)
ブラウザのみのAPIを使用する。
ステート、エフェクト、またはブラウザ専用APIに依存するカスタムフックを使用する。
React クラスコンポーネントを使用する。



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



### Storybook

コンポーネント管理ツール

Storybook: Frontend workshop for UI development

https://storybook.js.org/



### PLOP

テンプレート自動生成ツール

Consistency Made Simple : PLOP

https://plopjs.com/



----------------------------------------

## 環境構築

### Next.js 13 App router

インストール
npx create-next-app template_testdriven

選択

```
> npx create-next-app template_testdriven
√ Would you like to use TypeScript? ... No / (Yes)
√ Would you like to use ESLint? ... (No) / Yes
√ Would you like to use Tailwind CSS? ... (No) / Yes
√ Would you like to use `app/` directory? ... (No) / Yes
√ Would you like to use App Router? (recommended) ... No / (Yes)
√ Would you like to customize the default import alias? ... (No) / Yes

```

動作確認
npm run dev



### vitest

インストール
npm i @vitejs/plugin-react
※このライブラリは -D フラグでインストールすると認識しない。

npm i server-only

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

# vitest

スクリプトの追加

```package.json
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"

```

testはウォッチ形式でソースコードを保存するたびにテストが回ります。
test:uiはブラウザでテスト結果を表示してくれます。
storybook、build-storybookはstorybookインストール時に自動で追加されます。



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
    include: ["app/**/*.test.{js,ts,jsx,tsx}"],
  },
});

```



# サンプル01 基礎 シンプルなクライアントコンポーネントとそのテストコード

mkdir app/client
touch app/client/page.tsx
touch app/client/page.test.tsx


```app/client/page.tsx
"use client"

import React from "react"

export default function ClientComponent() {
  return <h1>Client Component</h1>
}

```



```app/client/page.test.tsx
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

```app/page.tsx
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



# サンプル02 Hooksを使用したクライアントコンポーネントとそのテストコード

コンポーネントファイルの作成

mkdir app/components
touch app/components/component.tsx
touch app/components/component.test.tsx

```app/components/component.tsx
"use client";

import React from "react";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      テスト用カウンター
      <h2>{count}</h2>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
};

export default Counter;

```

useStateを使っているので 'use client'ディレクティブを付けます。



↑コンポーネントのテストファイル

```app/components/component.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { expect, test } from "vitest"

import Component from "./component"

test("App Router: Works with Client Components (React State)", () => {
  render(<Component />)
  expect(screen.getByRole("heading", { level: 2, name: "0" })).toBeDefined()
  fireEvent.click(screen.getByRole("button"))
  expect(screen.getByRole("heading", { level: 2, name: "1" })).toBeDefined()
})

```

テストの動作確認

npm test



コンポーネントをブラウザにも表示させます。



```app\page.tsx
import Counter from "./components/component";

export default function Home() {
  return (
    <main>
      <h1>Welcome to VNS.BLUE</h1>
      <ClientComponent />
      <Counter />
    </main>
  );
}

```

動作確認

npm run dev



# サンプル03 動的なルートセグメントを使用した場合のテスト

mkdir app/blog/[slug]
touch app/blog/[slug]/page.tsx
touch app/blog/[slug]/page.test.tsx

```app/blog/[slug]/page.tsx
type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` }
}

export default function Page({ params }: Params) {
  return <h1>Slug: {params.slug}</h1>
}

```



```app/blog/[slug]/page.test.tsx
import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import Page from "./page"

test("App Router: Works with dynamic route segments", () => {
  render(<Page params={{ slug: "Test" }} />)
  expect(
    screen.getByRole("heading", { level: 1, name: "Slug: Test" })
  ).toBeDefined()
})

```

テストの動作確認

npm test



このテストは、Reactコンポーネント`Page`が、動的なルートセグメントを使用して正しく動作することを確認するためのテストです。

テストでは、`render()`関数を使用して`Page`コンポーネントをレンダリングし、`params`プロパティに`{ slug: "Test" }`を渡しています。その後、`screen.getByRole()`関数を使用して、レンダリングされたコンポーネントから`<h1>`要素を取得し、そのテキストが`Slug: Test`であることを確認しています。

つまり、このテストは、`Page`コンポーネントが、動的なルートセグメントを使用して、正しく`slug`パラメータを受け取り、表示することを確認しています。



## ブラウザに表示します。

http://localhost:3000/blog/123

123がslugにあたり、動的なページ生成をしてくれます。

この機能を使うことで日付＋タイトルといったURLを事前に用意しなくても動的にページが作成できます。



Topページを編集します。

```app\page.tsx
import Link from "next/link";
import ClientComponent from "./client/page";
import Counter from "./components/component";

export default function Home() {
  const blogId = "123";
  return (
    <main>
      <h1>Welcome to VNS.BLUE</h1>
      <ClientComponent />
      <Counter />
      <Link href={`/blog/${blogId}`}>Blogページ</Link>
    </main>
  );
}

```

動作確認

npm run dev



# サンプル04 RSCのテスト

React server componentsのテスト

サーバーコンポーネントのテスト。

mkdir app/rsc/
touch app/rsc/page.test.tsx
touch app/rsc/page.tsx


```app/rsc/page.tsx
// import 'server-only' does not currently
// work with Vitest

import React from "react"

export default function Page() {
  return <h1>App Router</h1>
}

```

server-onlyを使用することで完全にサーバーサイドでのみ実行されます。
しかし現在vitestで動きません。



```app/rsc/page.test.tsx
import { render, screen } from "@testing-library/react"
import React from "react"
import { expect, test } from "vitest"

import Page from "./page"

test("App Router: Works with Server Components", () => {
  render(<Page />)
  expect(
    screen.getByRole("heading", { level: 1, name: "App Router" })
  ).toBeDefined()
})

```

テストの動作確認

npm test



topページに表示させます。

```app\page.tsx
import Link from "next/link";
import ClientComponent from "./client/page";
import Counter from "./components/component";
import Page from "./rsc/page";

export default function Home() {
  const blogId = "123";
  return (
    <main>
      <h1>Welcome to VNS.BLUE</h1>
      <ClientComponent />
      <Counter />
      <Link href={`/blog/${blogId}`}>Blogページ</Link>
      <Page />
    </main>
  );
}

```



動作確認

npm run dev



以上4つのコンポーネントとテストファイルでした。



----------------------------------------

# Storybook

インストール

npx storybook@latest init

実行方法
npm run storybook

http://localhost:6006/


## Storybookの設定

サンプル01を元に最低限のストーリーファイルを作成します。

最低限とは
Storybookのダッシュボードに表示できるまで、それ以外の機能は無し。

最初にStorybookの設定ファイルで、
ストーリーファイル(*.sotries.ts)をどこに置いても探してもらえるようにします。

.storybook\main.ts

```.storybook\main.ts
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

```

※コロケーションの考え方により、コンポーネントコードのそばにテストファイルとストーリーファイルを置きたいと思います。
実際使用する時は srcフォルダ を作ってその下を見てもらえるようにします。

例

```
    "src/**/*.stories.@(js|jsx|mjs|ts|tsx)",

```

第1部のテストコードを作った時にコンポーネントはありますので
そのコンポーネントのストーリーファイル(*.stories.ts)を作ります。


## サンプル02の最低限のストーリーファイル


サンプル 01のコンポーネント用です。
↓最低限のストーリーファイル (*.stories.ts)

```app\client\page.stories.ts
import type { Meta, StoryObj } from "@storybook/react";

// 作ったコンポーネントをインポートします。
import Page from "./page";

const meta = {
  // Storybookのダッシュボードのサイドバーに表示されるタイトルを定義します。
  title: "01Client/page",
  component: Page,
  parameters: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storybookのダッシュボードのサイドバーに表示されるコンポーネントの色々なパーターンを定義します。
export const PageFirst: Story = {};
export const PageSecond: Story = {};
export const PageThird: Story = {};

```



----------------------------------------

## サンプル02の最低限のストーリーファイル

Hooksを使ったサンプル

```app\components\component.stories.ts
import type { Meta, StoryObj } from "@storybook/react";

// 作ったコンポーネントをインポートします。
import Counter from "./component";

const meta = {
  // Storybookのダッシュボードのサイドバーに表示されるタイトルを定義します。
  title: "02hooks/component",
  component: Counter,
  parameters: {},
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storybookのダッシュボードのサイドバーに表示されるコンポーネントの色々なパーターンを定義します。
export const ComponentFirst: Story = {};
export const ComponentSecond: Story = {};
export const ComponentThird: Story = {};

```



----------------------------------------

## サンプル03の最低限のストーリーファイル

動的なルートセグメントを使ったサンプル

```app\blog\[slug]\page.stories.ts
import type { Meta, StoryObj } from "@storybook/react";

// 作ったコンポーネントをインポートします。
import Page from "./page";

const meta = {
  // Storybookのダッシュボードのサイドバーに表示されるタイトルを定義します。
  title: "03slug/page",
  component: Page,
  parameters: {
    slug: "Button",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storybookのダッシュボードのサイドバーに表示されるコンポーネントの色々なパーターンを定義します。
// 今回はパラメーターを渡しています。
// このパラメーターは、コンポーネントのpropsとして渡されます。
export const SlugFirst: Story = { args: { params: { slug: "first_page" } } };
export const SlugSecond: Story = { args: { params: { slug: "second_page" } } };
export const SlugThird: Story = { args: { params: { slug: "third_page" } } };

```


### 解説

※↓このストーリーファイルでのポイント

SlugFirst: Story = { args: { params: { slug: "first_page" } } }

引数を渡す時に

args: { params: { slug: "first_page" } }

この形でpropsを渡しています。

Storybookでは、ストーリーファイルでコンポーネントの状態を定義するために、 args というオブジェクトを使用します。
args オブジェクトには、コンポーネントのプロパティに渡す値を設定することができます。
これにより、ストーリーファイルでコンポーネントの様々な状態を定義することができます。



----------------------------------------

## サンプル04の最低限のストーリーファイル

サーバーコンポーネントのテスト。

```app\rsc\page.stories.ts
import type { Meta, StoryObj } from "@storybook/react";

// 作ったコンポーネントをインポートします。
import Page from "./page";

const meta = {
  // Storybookのダッシュボードのサイドバーに表示されるタイトルを定義します。
  title: "04_rsc/page",
  component: Page,
  parameters: {
    slug: "Button",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storybookのダッシュボードのサイドバーに表示されるコンポーネントの色々なパーターンを定義します。
export const pageFirst: Story = {};
export const pageSecond: Story = {};
export const pageThird: Story = {};

```



----------------------------------------

Storybookのダッシュボードの表示順について
titleに数字を入れてみましたが
3 1 2 4 で数字順でソートされませんでした。



----------------------------------------

# Plop

ツールPlop を使うには設定ファイルとテンプレートファイルが必要です。

## インストール

npm i -g plop

※plop専用の後で紹介する VSCode拡張機能を使う場合、グローバルにインストールしておくほうが簡単に使えます、そうでないと色々と設定する必要が出てきます。



## plopの設定ファイル

touch plopfile.mjs



```plopfile.mjs
export default function (
  // JSDocコメントを使用して、import('plop').NodePlopAPIという型を指定しています。これは、plopというライブラリが提供するNodePlopAPIという型をインポートしていることを示しています。この型は、plopfile.mjsで使用されるplopオブジェクトの型を定義しています。
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "path",
        message: "どこにコンポーネントを置きますか？(例: app/components/)",
      },
      {
        type: "input",
        name: "name",
        message: "コンポーネントの名前を入力してください",
      },
      {
        type: "list",
        name: "componentType",
        message: "Component type",
        // サーバーコンポーネント、クライアントコンポーネント
        choices: ["server", "client"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/components/{{componentType}}/{{path}}/{{pascalCase name}}/{{name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: "app/components/{{componentType}}/{{path}}/{{pascalCase name}}/{{name}}.test.tsx",
        templateFile: "templates/component/component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "app/components/{{componentType}}/{{path}}/{{pascalCase name}}/{{name}}.stories.tsx",
        templateFile: "templates/component/component.stories.tsx.hbs",
      },
    ],
  });
}

```



## plop テンプレートファイルの作成

テンプレートファイルの置く場所

mkdir templates\component

このフォルダの中にテンプレートファイルを置きます。

例
templates\component\[ファイル名].tsx.hbs



## コンポーネントのテンプレートファイルを作成

touch templates\component\component.tsx.hbs

```templates\component\component.tsx.hbs
// "use client";

import React from "react";
import { FC } from 'react'; export

default function {{pascalCase name}}() {
	return <h1>{{pascalCase name}}</h1>;
}

```



## テストファイルのテンプレートファイルを作成

touch templates\component\component.test.tsx.hbs

```templates\component\component.test.tsx.hbs
import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import {{pascalCase name}} from "./{{name}}";

test("template component", () => {
  render(<{{pascalCase name}} />);
  expect(
    screen.getByRole("heading", { level: 1, name: "{{pascalCase name}}" })
  ).toBeDefined();
});

// // Vitestの基本構文
// describe("Vitest", () => {
//   beforeAll(() => {
//     // console.log("テストファイル開始前");
//   });
//   afterAll(() => {
//     // console.log("テストファイル終了後");
//   });

//   beforeEach(() => {
//     // console.log("テスト開始前");
//   });
//   afterEach(() => {
//     // console.log("テスト終了後");
//   });

//   test("マッチャー", () => {
//     expect(1 + 1).toBe(2);

//     expect({foo: "bar"}).toEqual({foo: "bar"});
//     expect([1, 2, 3]).toStrictEqual([1, 2, 3]);

//     expect(undefined).toBeUndefined();
//     expect("foo").toBeDefined();

//     expect(true).toBeTruthy();
//     expect(false).toBeFalsy();

//     expect(null).toBeNull();
//     expect("foo").not.toBeNull();

//     expect("foo").toHaveLength(3);
//     expect([1, 2, 3]).toHaveLength(3);

//     expect({foo: "bar", baz: "hoge"}).toHaveProperty("foo");
//     expect(["foo", "bar"]).toContain("foo");
//     expect([{foo: "bar"}, {foo: "hoge"}]).toContainEqual({foo: "bar"});
//     expect("foo12345").toMatch(/foo\d{5}/);

//     class CustomError extends Error {
//     }

//     const throwError = (message: string) => {
//       throw new CustomError(message);
//     };
//     expect(() => throwError("")).toThrow(); // エラーになることを検証
//     expect(() => throwError("")).toThrow(CustomError); // 送出したエラーの型判定
//   });

//   test.each`
//     unitPrice | quantity | expected
//     ${100}    | ${1}     | ${100}
//     ${150}    | ${2}     | ${300}
//     ${200}    | ${0}     | ${0}
//   `(
//     "パラメタライズドテスト:$unitPrice * $quantity = $expected",
//     ({unitPrice, quantity, expected}) => {
//       expect(unitPrice * quantity).toBe(expected);
//     }
//   );

//   test("モック", () => {
//     const mockFn = vi.fn((a: number) => a * 10);
//     mockFn(1);
//     mockFn(2);

//     expect(mockFn.mock.calls).toHaveLength(2);

//     expect(mockFn.mock.calls[0][0]).toBe(1); // 1回目の呼出の引数
//     expect(mockFn.mock.calls[1][0]).toBe(2); // 2回目の呼出の引数

//     expect(mockFn.mock.results[0].value).toBe(10); // 1回目の呼出の戻り値
//     expect(mockFn.mock.results[1].value).toBe(20); // 1回目の呼出の戻り値
//   });

//   test("Expectマッチャーユーティリティ", () => {
//     const obj = {
//       foo: "bar",
//       count: 10,
//       id: "123-456",
//       nested: {hoge: true, fuga: false},
//       array: [1, 2, 3],
//     };
//     expect(obj).toEqual({
//       foo: expect.any(String), // String
//       count: expect.anything(), // 値は何でもOK
//       id: expect.stringMatching(/\d{3}-\d{3}/), // 正規表現
//       nested: expect.objectContaining({hoge: true}), // 指定したkey-valueが含まれていること
//       array: expect.arrayContaining([1, 2]), // 配列に要素が含まれていること
//     });
//   });

//   test("スナップショットテスト", () => {
//     const html = `<div class="container">
//   <article>
//     <p class="title">UI生成結果</p>
//   </article>
// </div>`;
//     expect(html).toMatchSnapshot();
//   });
// });

```



## Storybook ストーリーファイルのテンプレートファイルを作成

touch templates\component\component.stories.tsx.hbs

```templates\component\component.stories.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";

// 作ったコンポーネントをインポートします。
import {{pascalCase name}}, { {{pascalCase name}}Props } from './{{name}}';

type T = typeof {{pascalCase name}}

const meta = {
  // Storybookのダッシュボードのサイドバーに表示されるタイトルを定義します。
  title: "{{componentType}}/{{pascalCase name}}",
  component: {{pascalCase name}},
  parameters: {},
  argTypes: {
  },
} satisfies Meta<T>;

export default meta;
type Story = StoryObj<T>;

// Storybookのダッシュボードのサイドバーに表示されるコンポーネントの色々なパーターンを定義します。
export const {{pascalCase name}}First: Story = {};
export const {{pascalCase name}}Second: Story = {};
export const {{pascalCase name}}Third: Story = {
    args : {
  },
};

```



# テンプレートの書き方のルール

* 拡張子

テンプレートファイルは .hbs という拡張子を使います。



* パス

{{path}}



* 名前

{{name}}



* 名前の変更

パスカルケース
{{pascalCase name}}

CurrentUserItem のように書きます。
要素語( current user item )の最初を大文字で書き始めます。

例えば、nameプロパティが"foo-bar"の場合、{{ pascalCase name }}は"FooBar"になります。

ケバブケース
{{ kebabCase name}}

current-user-item のように書きます。
ハイフン で要素語( current user item )を連結します。

例えば、nameプロパティが"FooBar"の場合、{{ kebabCase name }}は"foo-bar"になります。



## VSCode の拡張機能

File Templates - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=SamKirkland.plop-templates

※同じ名前のVSCode拡張機能がいくつかあるので間違えないようにしてください。



この VSCode の拡張機能は、右クリックから plop のテンプレートを使ってコンポーネントを自動生成できるようになります。今のところマウスからでも自動生成できるようになるだけです。
設定ファイルでpathを固定しなければマウスで指定した場所に自動生成が出来るようになります。


この拡張機能はデフォルトで、グローバルにインストールされた plop を使用することを想定しています。



Consistency Made Simple : PLOP

https://plopjs.com/



※plopの項目の最後に
テスト駆動開発をするのならばテンプレートを作るとき
わかりやすいエラーを入れておくといいと思います。
テスト駆動開発ならば他のテストをGREENにしてから
新しい次の開発につなげて、その最初のテストはREDに
したほうがいいとおもいます。



# 参考URL

next.js/examples/with-vitest at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-vitest

Consistency Made Simple : PLOP

https://plopjs.com/

効率的なUI開発の鍵：Next.js (TypeScript) にStorybookを導入 (storybook/main.jsではなくstorybook/main.tsを生成し構築) - Qiita

https://qiita.com/rikuto125/items/e596cdb53f2ead0eea18
