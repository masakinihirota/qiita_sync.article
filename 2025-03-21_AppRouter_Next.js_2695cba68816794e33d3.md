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
import  ComponentA.tsx from "src/components/route1/ComponentA"
import  ComponentB.tsx from "src/components/route1/ComponentB"
import  ComponentC.tsx from "src/components/route1/ComponentC"

export { ComponentA, ComponentB, ComponentC }

```

👆exportは名前付きexportを使用します。

```page.tsx
import * as Route1 from "src/components/route1/Index"

<div>
<Route1.ComponentA/>
<Route1.ComponentB/>
<Route1.ComponentC/>
</div>

```

コンポーネントをindex.tsxからまとめてimportします。

# 参考

Next.jsのディレクトリ構成のベストプラクティスを知っていますか？ - YouTube
https://www.youtube.com/watch?v=ekUQ043k2TQ

14:30 頃