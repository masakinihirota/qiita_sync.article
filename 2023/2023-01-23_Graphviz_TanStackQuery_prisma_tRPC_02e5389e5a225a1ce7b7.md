<!--
title:   tRPC ver 10.9.0 （Next.jsでの最小構成を調査）
tags:    Graphviz,TanStackQuery,prisma,tRPC
id:      02e5389e5a225a1ce7b7
private: false
-->

追記 2023 年 1 月 31 日
Perplexity AI: Ask Anything
https://www.perplexity.ai/

AI がソース付きで質問に答えてくれる。
`とはなんですか？日本語で解説してください。`
と質問の単語、文の後にこの文を追記すると日本語で答えてくれる。

追記終了

# 初めに

tRPC の記事は 2 個目[超入門 tRPC ハンズオン v10 ～](../2022/2022-09-21_tRPC_771036db647e9394a8fd.md)です、ベータが取れたこともあり改めて調べてみました。

## tRPC の紹介

### 公式

tRPC - Move Fast and Break Nothing. End-to-end typesafe APIs made easy. | tRPC
https://trpc.io/

### github

trpc/trpc: 🧙‍♀️ Move Fast and Break Nothing. End-to-end typesafe APIs made easy.
https://github.com/trpc/trpc

### Github での Star History

[![Star History Chart](https://api.star-history.com/svg?repos=trpc/trpc&type=Date)](https://star-history.com/#trpc/trpc)

#### Star 数

**2023/05/27 25.9K**
**2023/01/25 20.0k**
**2023/01/23 19.8k**
**2023/01/15 19.2k**
**2022/09/22 13.1k**

### tRPC の立ち位置

![tRPCvsGraphQL枠.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8a88dfce-465a-29c2-619f-90445545b633.png)

勢力図

![ベン図.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e8638611-3560-6173-f0b1-14ee643f699d.png)

# tRPC の初見の感想

tRPC は初見では何がどう動いているのかさっぱりわかりません。

他の RPC を触っていたのならばこれはこうだろうと推測できると思いますが、
初めて RPC を触った場合に、どうすればいいのか調査していきます。

## RPC（Remote Procedure Call）とは

あるコンピュータで動作するソフトウェアから、通信回線やコンピュータネットワークを通じて別のコンピュータ上で動作するソフトウェアへ命令を出して実行させる技術。

# 環境

Windows10
VScode
PowerShell
Typescript
Next.js

# ソース

基本的にこのページのソースを使います。

Next.js での使い方 | tRPC
https://trpc.io/docs/nextjs

採用理由
tRPC はフロントエンド、バックエンド両側とも Typescript が必須であること
Next.js にはフロントエンド、バックエンドが揃っていること。
tRPC を一番利用する BFF(backend for frontend)が Next.js だと思うから。

まずは最初に動かしてみます。

```bash
npm create next-app .

npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod
```

## フォルダ、ファイルの作成

```powershellsh
New-Item -ItemType "directory" src
Move-Item pages src

New-Item -ItemType "directory" src\pages\api\trpc
New-Item src\pages\api\trpc\[trpc].ts

New-Item -ItemType "directory" src\server\routers
New-Item src\server\routers\_app.ts

New-Item src\server\trpc.ts

New-Item -ItemType "directory" src\utils
New-Item src\utils\trpc.ts

```

## 既存ファイルの拡張子を変更

```powershellsh
Rename-Item src\pages\_app.js _app.tsx
Rename-Item src\pages\index.js index.tsx
```

# 最小構成のソース

## tRPC ルーターの作成

Next.js での使い方 | tRPC
https://trpc.io/docs/nextjs
ソースはこのページのを利用しています。

<details><summary>バックエンド側</summary>

```server/trpc.ts
import { TRPCError, initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

```

```server/routers/_app.ts
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

```

```pages/api/trpc/[trpc].ts
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

```

</details>

<details><summary>tRPC hooksの作成</summary>

```utils/trpc.ts
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});

```

</details>

<details><summary>設定</summary>

```pages/_app.tsx
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);

```

</details>

<details><summary>API リクエストの作成</summary>

```pages/index.tsx
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}

```

</details>

※ src\utils\trpc.ts でエラーが出るが問題なく動きます。
公式ページのエラー？
23 行目 config の下に赤い線が表示されます。

ソースはこれで完成です、早速動かしてみます。

```powershell
npm run dev

```

http://localhost:3000/

hello client
と表示されれば成功です。

# 解説

※ わかりやすくするため、tRPC に必要な所は追加して、不要な部分は削除して見ていきます。

## 大雑把な流れ

- ブラウザ画面（＝フロントエンド側）を表示、もしくはブラウザ画面からデータを入力する。
- バックエンド側にデータが送られる。
- 送られてきたデータをチェックする。
- バックエンド側でデータが加工される、もしくは DB からデータを取り出す、そのデータを加工する。
- 加工されたデータをフロントエンド側に送る。

フロントエンド側からバックエンドへプロシージャ関数を利用してデータの状態管理をおこなう。
この時に使用される技術が tRPC です。
プロシージャ関数が tRPC 技術で Tanstack Query の useQuery を使用します。
tRPC は `useQuery`をラップして使っている技術です。
tRPC の派生で`Jotai`をラップしている `jotai-trpc`もあります。

https://zenn.dev/dai_shi/articles/464db84e2ee3bb

## 構成

```
──src
    ├─pages
    │  │  _app.tsx # <-- add `withTRPC()`-HOC 高階コンポーネント
    │  │  index.tsx # <-- スタート地点 フロントエンド側 入力データを送信
    │  │
    │  └─api
    │      └─trpc
    │              [trpc].ts # <-- tRPC HTTP handler
    │
    ├─server
    │  │  trpc.ts # <-- プロシージャ関数のヘルパー
    │  │
    │  └─routers
    │          _app.ts # <-- メインappルーター
    │
    └─utils
            trpc.ts # <-- tRPCのhooks

```

## ファイルの簡単な解説

### フロントエンド側

`src\pages\index.tsx`
スタート地点
API リクエストの作成

`src\pages\_app.tsx`
設定
`withTRPC()` 高階コンポーネントを置くところ

### バックエンド側

この箇所にリクエストが集まる
`src\pages\api\trpc\[trpc].ts`
API エンドポイント（実態は `src/server/routers` 配下に実装する）
最初に実装が完了したらこのファイルを編集せずに、
tRPC ルーター
`src/server/routers/**/*.ts`
ここに定義を書いていきます。

`src\server\routers\_app.ts`
API エンドポイントを実装する。
他の API エンドポイントも `src/server/routers` 配下に追加する。

`src\server\trpc.ts`
server 側の trpc 設定

`src\utils\trpc.ts`
`tRPC hooks` の作成

# ソースコードを追っての tRPC の調査

ソースにコメントを書き込んでいく
（理解しやすくするために変更有り）

masakinihirota/trpc_nextjs_minimum
https://github.com/masakinihirota/trpc_nextjs_minimum

下記のソースと同じものです。

## tRPC 処理のスタート地点

```src\pages\index.tsx
// フロントエンド側
import { trpc } from '../utils/trpc';

// tRPC処理のスタート地点
export default function IndexPage() {
  // バックエンドに送る情報
  // 今回は「名前」
  // tRPCでバックエンド側の関数を実行している。
  // helloがプロシージャ関数
  // AutoComplication機能によりhelloが自動補完候補に出てくる。
  const hello = trpc.hello.useQuery({ text: '[名前]' });
  //            ^^^^^ "trpc."入力後、helloが補完候補に出てくる。
  // useQueryにカーソルを当てるとuseQueryの引数に設定するオブジェクトの情報が表示されます。
  // useQueryの引数に間違った情報を入れるとエラーになります。
  //  例えば'[名前]'の部分を数値にするとエラーになります。

  // hello.statusに通信のステータスが入ります。
  // この中にloadingやerrorなどが保存されています。
  // これはTanstack Queryの機能です。
  console.log(hello.status);

  // バックエンドからデータが帰ってくるまでLoadingを表示する。
  if (!hello.data) {
    // hello.dataにフェッチしてきたデータが入ります。
    // これはTanstack Queryの機能です。
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* 型を共有している自動補完
      ”hello.”と入力するしその後ろで補完を表示させると
      helloが持つメソッドが表示されます */}
      <p>{hello.data.greeting}</p>
      {/*            ^^^ 型がstring */}
    </div>
  );
}

```

```src\pages_app.tsx
// フロントエンド側
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// add `withTRPC()`-HOC here
export default trpc.withTRPC(MyApp);

```

tRPC の hooks を利用する。

```src\utils\trpc.ts
// フロントエンド側
// データを取得するため
import { httpBatchLink, loggerLink, httpLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/\_app';

// Next.js 用
// your typesafe tRPC hooks
export const trpc = createTRPCNext<AppRouter>({
config() {
// API エンドポイント
// ローカルホストのポート 3000/api/trpc に設定
// これに src\server\routers_app.ts で設定した
// プロシージャ関数を合わせてアクセスする
// 今回の例
// http://localhost:3000/api/trpc/hello
const url = `http://localhost:3000/api/trpc`;
return {
// ルーターを設定
links: [
// ログがブラウザのコンソールに表示される
loggerLink(),
// リンクの設定
// リンクは必ず一つ設定する必要があります。
// 1 つの場合それを終端リンクと呼びます。
// httpBatchLink は複数のリンク設定をしてそれらを一つにまとめます。
httpLink({
url,
}),
],
};
},
});

````

`loggerLink()`
この関数を挿入するとブラウザのコンソールにログが表示されます。

`httpLink()`
プロシージャが１つ用

`httpBatchLink()`
プロシージャが複数用

プロシージャ自身が複数の命令の塊だが、
そのプロシージャ単位でまとめるBatch

Batch
バッチ ひとまとめにした一連の処理内容
run a batch バッチを走らせる.

## バックエンド側へ

```src\pages\api\trpc\[trpc].ts
// 通常は触らないファイル。
// API ハンドラ（アダプタとも呼ばれる）は、バックエンドへのHTTPリクエストとtRPC間の接着剤として機能します。
//API ハンドラはサーバ内のルートに配置され、そのルートとそのサブルートへのすべてのリクエストを処理します。
// バックエンドからリクエストを受け取り、createContext関数を使ってコンテキストを生成し、リクエストとコンテキストをルーター内のプロシージャ関数に送ります。
// CORSを有効にする場合など特殊ケースに使用する。
// また、プロシージャ関数内でエラーが発生したときに実行されるコールバック関数であるonErrorなど色々なオプションの引数をとることができます。

import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';

// tRPCのHTTPレスポンスハンドラ
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  //
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // バグ報告
      console.error('Something went wrong', error);
    }
  },

});


````

```src\server\routers_app.ts
// バックエンド側
// 動的型チェック
import { z } from 'zod';
import { procedure, router } from '../trpc';

// メインのルーター
// ルーティングの設定を行う。
// フロントエンド側からアクセスするAPIエンドポイントの設定を行う。
// 今回はhelloだけだが、複数のAPIエンドポイントの設定を書くことが出来る。
export const appRouter = router({
  // APIエンドポイント
  // http://localhost:3000/api/trpc/hello
  // プロシージャ関数の設定
  // プロシージャ関数の設定によりフロントエンド側からアクセスが可能となる。
  // 行いたい動作をここに登録
  // 今回はフロントエンド側から「名前」を受け取って
  // バックエンド側でデータを加工してフロントエンド側に返します。
  // 受け取る際にデータの型チェックを行います。（動的型チェック）
  hello: procedure
    .input(
      z.object({
        text: z.string()
      }),
    )
    // 正常なデータと判断したら
    // 入力データを加工してフロントエンド側に返します。
    // queryの引数はresolver関数をとります。
    // resolver関数の戻り値をフロントエンド側に返します。
    .query(({ input }) => {
      // 戻す中身の確認
      console.log({input});
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// ルーターの型をフロントエンド側でも使えるように "export type" をしています。
export type AppRouter = typeof appRouter;

```

```src\server\trpc.ts
// バックエンド側
import { initTRPC } from '@trpc/server';

// createメソッドで、
// tRPCインスタンスの初期化
const t = initTRPC.create();

// ルーターのベース
export const router = t.router;
// プロシージャ関数のヘルパー
export const procedure = t.procedure;

```

この時点での動作確認をします。

```powershellsh
npm run dev
```

http://localhost:3000/

成功すれば、

`hello [名前]`

が表示されるはずです。

# 関連図

ファイルを追っているだけでは理解が難しいので
関連図にしてみます。

## 画像生成ツールのインストール

事前準備 Windows の場合

### Graphviz のインストール

Download | Graphviz
https://www.graphviz.org/download/

`graphviz-7.0.6 (64-bit) EXE installer` をダウンロード
インストール時に怪しいファイルですと警告がでます、今回は exe の方が path 設定もしてくれるのでこちらを使います。
気になる方は zip ファイルをダウンロードして環境変数を設定してください。

### dependency-cruiser のインストール

`powershellsh
npm install --save-dev dependency-cruiser
`

初期化
`powershellsh
npx depcruise --init
`

依存関係の画像を`svgファイル`へ出力
基本形
`src`以下を出力
`powershellsh
npx depcruise src --include-only "^src" --config --output-type dot | dot -T svg > dependency-graph.svg
`

## 画像

![関連図.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e7eda581-d390-22e0-3c0f-f561087a7e04.png)

# React の状態管理について、

`Tanstack Query`（旧名：React Query）という状態管理がバックエンドからデータを取ってくる。
状態管理ツールは今までブラウザ上（＝フロントエンド側）のみのデータを操作する関数だった。
tRPC を利用することでネットの壁を飛び越え、API を利用してサーバ側からデータを取ってこれるようになった。

# tRPC でのリンクとは

リンクの設定場所
`src\utils\trpc.ts`

リンクの概要
リンクを使用すると、
tRPC フロントエンド側とバックエンドの間のデータの流れを
カスタマイズできます。

リンクは、
tRPC の操作
(クエリ、ミューテーション、またはサブスクリプション)
または操作に基づく副作用
(ログ記録など)
のいずれかの 1 つだけを設定します。

複数の操作をまとめる
リンクをまとめて配列にすることで、
links プロパティを通じて tRPC フロントエンド側設定に提供することで、
リンクチェーンを表現することができます。

つまり、tRPC フロントエンド側はリクエストを行う際に
リンクの配列に追加された順にリンクを実行し、

レスポンスを処理する際には逆にリンクを
再度実行することになります。

フロントエンド側
リンクを繋げる、リンクバッチ

それをバックエンドにリクエストを送る

バックエンドはリクエストに返答する。

# API とプロシージャ関数

Next.js は API を持ちそれを設定します
API は URL の形をしています。

tRPC でプロシージャ関数を作り API に渡すには

API ＋ プロシージャ関数
`http://localhost:3000/api/trpc`
と
`hello`
を合わせて

`http://localhost:3000/api/trpc/hello`
と組み立てます。
これでバックエンドにアクセスしてデータを取得できます。

# VScode の自動補完について

バックエンドとフロントエンドの自動補完
バックエンド側が作られていると
フロントエンド側で AutoComplication が働く。

tRPC に Prisma（DB:データベースの ORM）を利用すると
Prisma のスキーマから型を自動的に取得する。

ORM（Object-Relational Mapping）
データベースと Node.js の間でデータをスムーズに取り出すツール

欠点
バックエンドもしくは DB（Prisma）側から作らないと
型の恩恵が得られない。
つまり先にフロントエンド側を作ろうとすると
AutoComplication が効かない。

# 用語

## API エンドポイント

バックエンド側のデータ入出力が可能な場所。

## BFF(backend for frontend)

フロントエンドとバックエンドの間を取り持つサーバー
バックエンドの API から取得したデータを加工してフロントエンドに渡す役割を持つ。
Next.js のようなタイプのフレームワーク

## HOC

高階コンポーネント (higher-order component)

## Prisma

Prisma とは TypeScript（Node.js）用の ORM（Object-Relational Mapping）
TypeScript とデータベースとのデータのやり取りを簡単に行えるようになります。
Prisma を使用すると Prisma が作成したスキーマ等から DB から型を取得することが出来る。
型があると AutoComplication が効く。

## RPC

リモートプロシージャコール
ネットワークで接続された他のコンピューターで関数などを実行させるための仕組み。

## Tanstack Query

「非同期」状態管理ツール
「非同期」という所が重要
（ただのデータ取得、キャッシュツールではない。）
コードジェネレーターで自動生成される hooks
TanStack Query | React Query, Solid Query, Svelte Query, Vue Query
https://tanstack.com/query/latest

## tRPC

TypeScript を使ってフロントエンドとバックエンドの両方で共通の型を持ち、
API エンドポイントで動的に型チェックを行い
フロントエンドとバックエンド間でデータのやり取りを行うライブラリ
Prisma を利用するとデータベースのスキーマから型の自動生成も行う。

## 型推論

静的な型付けを持つ言語において、
変数や関数シグネチャの型を明示的に宣言しなくても、
変数宣言における初期化のための初期値や、
関数呼び出しにおける実引数などといった、
周辺情報および文脈などから自動的に（暗黙的に）
各々の型を決定する

## クエリ

CRUD のうちの R、データを読み込むだけ、加工したり削除はしない。
ミューテーション
CRUD のうちの CUD を利用したデータの操作。

CRUD
Create 何かを作成
Read 何かを読む
Uudate 何かを更新する
Delete 何かを削除する
それぞれの頭文字で CRUD

## コンテキスト

データ送受信等に必要なメタデータ

## 宣言的

どうやってやるかではなく、
何をやりたいか？を書くプログラミング手法、
どのようにやるかは裏側で自動的に決まる。

## ハンドラー

プログラムやその一部分で、何らかの処理要求が発生したときに起動するもの。

## 非同期

2 つ以上の事象が同時に発生したり、関連する複数の事象が互いの完了を待たずに発生したりする概念

## フェッチ

プログラム等が特定の場所からデータを読み出す関数のこと。

## プロシージャ関数

tRPC での命令の一つの塊を指す。
例
[名前]という文字列を入力して、
型チェックをして
バックエンドに送信して
バックエンドから戻ってきた文字列を
コンポーネントに渡す。
（※ コンポーネントはそのデータを受け取ってブラウザに表示する。）

プロシージャとファンクションの違い
値を返すのがファンクション
値を返さないのがプロシージャ
（Wiki 調べ）

## ヘルパー

データ加工等の処理をライブラリ化したもの。

メタデータ
あるデータが付随して持つそのデータ自身についての付加的なデータを指す。
あるデータそのものではなく、そのデータを表す属性や関連する情報を記述したデータのこと。

## リクエスト

データの本体
例
[名前]

## ルーター

フロントエンドからバックエンドへの経路を設定したデータ。

# 雑学

## 静的、動的型チェック

TypeScript は静的型チェック
Zod は動的型チェック

TypeScript はソースコードに型チェックを入れ
ビルドすると消えますが
Zod は動作中に型チェックを行います。

# tRPC 技術を利用した T3 Stack

T3 Stack
基本
Next.js
TypeScript
基本この 2 つを利用する。

追加オプション（インストール時に選択可能）
NextAuth.js
Prisma
Tailwind CSS
tRPC

## T3 Axiom ＝ T3 における哲学

Typesafety is not optional(型安全はオプションじゃない)
＝型安全を最優先に利用していくスタイル。

# 雑感

## tRPC を使用できるまでの必要な技術

tRPC は色々な技術を使って実現されている。

## 事前に必要な技術

### 理解しておくべき技術

HTML＆CSS の基礎
Javascript（Node.js）
Typescript
React
Next.js
Zod

### 型安全

tRPC での型安全とは？
型付け出来るプログラム＝ TypeScript（静的な型チェック）
プログラマーが入力するデータのチェック

間違った入力が無いプログラム＝ Zod（動的な型チェック）
ユーザーが入力するデータのチェック
でそれぞれ対処している。

### 型推論

tRPC はプロシージャ関数のコードからフロントエンド側での型定義を推論します。
TypeScript の`Conditional types`という高度な技術が使われています。

業務で見つけた！ Conditional Types
https://engineering.linecorp.com/ja/blog/uit-conditional-types/

`ConditionalTypes`は TypeScript2.8 で追加された機能で、
部分型関係に基づいた型レベルの条件分岐や
パターンマッチができる機能です。
TypeScript の機能の中でも高度な部類であり、
一部の型に凝ったライブラリや曲芸的な遊びを除いては
なかなか実用例を聞かないものです。

### 型安全性

TypeScript でコンパイルが通ったら型でのバグが存在しない。

テストと型検査どっちがいいの？
両方やる
可能なところは型検査、難しいところはテストが一番楽
目的はバグを潰すこと。

型安全性入門
https://www.slideshare.net/AkinoriAbe1/ss-74534932`

# Zodios

Zod のスキーマが使える API クライアント Zodios を紹介したい - とろろこんぶろぐ

https://oisham.hatenablog.com/entry/2022/09/14/210857

Zodios とはなんですか？

https://www.perplexity.ai/?s=u&uuid=e5f940cb-699d-4348-b878-801a82d31a26
