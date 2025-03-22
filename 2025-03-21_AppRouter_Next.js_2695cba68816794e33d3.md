<!--
title:   Next.js App routerでの ルーティングとコンポーネントを別々に管理
tags:    AppRouter,Next.js
id:      2695cba68816794e33d3
private: false
-->
Next.jsのApp Routerを使用して、ルーティングとコンポーネントを分離して管理する方法について。

まずページを設計し、そのページに必要なコンポーネントを作成します。
次に、作成したコンポーネントをindex.tsファイルにまとめます。
そして、route1/page.tsxなどのページコンポーネントから、index.tsファイルを介して必要なコンポーネントをまとめてimportします。

# なぜこのようなことをするのか？

v0などでコンポーネントを作る

Clineなどで1機能ごとにコードを生成してもらう。

GitHub Copilot Agent mode でコンポーネントやフェッチ、ビジネスロジックのコードを生成してもらう。

などAIに指示を与えやすくする方法だと考えています。



# フォルダ構造

Next.js App routerを使用します。
route1のページは ComponentA B Cでつくられています。

```
src/
├── app/
│   ├── page.tsx             # ルートページ
│   ├── route1/
│   │   ├── page.tsx         # ルート1のページ
│   └── route2/
│       └── page.tsx         # ルート2のページ
├── components/
│   ├── common/            # 共通コンポーネント
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   └── Input/
│   │       ├── Input.tsx
│   │       └── Input.test.tsx
│   ├── route1/               # route1ページ用のコンポーネント群
│   │   ├── ComponentA/       # コンポーネントA
│   │   │   ├── ComponentA.tsx
│   │   │   ├── ComponentA.logic.ts
│   │   │   ├── ComponentA.fetch.ts
│   │   │   └── ComponentA.test.ts
│   │   ├── ComponentB/       # コンポーネントB
│   │   │   ├── ComponentB.tsx
│   │   │   ├── ComponentB.logic.ts
│   │   │   ├── ComponentB.fetch.ts
│   │   │   └── ComponentB.test.ts
│   │   ├── ComponentC/       # コンポーネントC
│   │   │   ├── ComponentC.tsx
│   │   │   ├── ComponentC.logic.ts
│   │   │   ├── ComponentC.fetch.ts
│   │   │   └── ComponentC.test.ts
│   │   └── index.ts

```


## コンポーネントをまとめる

route1ページ用のコンポーネントをまとめます。

```index.ts
import  ComponentA from "src/components/route1/ComponentA"
import  ComponentB from "src/components/route1/ComponentB"
import  ComponentC from "src/components/route1/ComponentC"

export { ComponentA, ComponentB, ComponentC }

```

👆exportは名前付きexportを使用します。

src/app/route1/page.tsx

```page.tsx
import * as route1 from '@/components/route1'; // パスエイリアスを使用

export default function Route1Page() {
  return (
    <div>
      <route1.ComponentA />
      <route1.ComponentB />
      <route1.ComponentC />
    </div>
  );
}

```

コンポーネントをindex.tsxからまとめてimportします。

# コロケーション

ComponentA.logic.ts, ComponentA.fetch.tsのように、コンポーネントに関連するロジックやデータフェッチをコンポーネントと同じディレクトリに配置することをコロケーションと言います。

```
ComponentA.tsx
ComponentA.logic.ts
ComponentA.fetch.ts
ComponentA.test.ts

```

ComponentA.tsxは、ComponentA.logic.ts, ComponentA.fetch.tsをimportして使用します。

ComponentA.test.tsは、ComponentA.tsx, ComponentA.logic.ts, ComponentA.fetch.tsのテストを行います。



# データフェッチの場所

Next.jsの公式ドキュメントでは、データフェッチはサーバーコンポーネント（page.tsx や layout.tsx）で行うことを推奨しています。これにより、クライアントサイドでのデータフェッチによるパフォーマンス低下を防ぎ、SEOにも有利になります。

データフェッチをサーバーコンポーネントで行い、propsとしてコンポーネントに渡すことで、コンポーネントの再利用性とテストの容易性を高めることができます。

コンポーネント内でServer actionを使いデータフェッチを行うことでシンプルなコードになります。

# 参考

Next.jsのディレクトリ構成のベストプラクティスを知っていますか？ - YouTube
https://www.youtube.com/watch?v=ekUQ043k2TQ

14:30 頃～
