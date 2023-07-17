<!--
title:   with-supabase (Next.js公式examples集を分類)
tags:    AppRouter,Next.js,ServerAction,Supabase,middleware
id:      b4b168a056dc10776d87
private: true
-->

Next.js公式examples集を分類からサンプルを一つ取り上げてNext.jsを勉強します。

今回は
with-supabase

READ.MEにはVercelにデプロイさせるよう書かれていますが、ローカルのDockerで立ち上げます。

# 環境
Windows10
VSCode
Docker Desktop

# インストール
npx create-next-app -e with-supabase









# ローカルで動作させる

サンプルのインストール
with-supabaseというフォルダを作りそこでVSCodeを起動する。
ターミナルを開く
npx create-next-app -e with-supabase

プロジェクト名を聞かれるので
現在のフォルダ名をそのまま使うので「.」記号を入力します。

```
√ What is your project named? ... .

```

インストール完了後起動させてみる。
npm run dev


http://localhost:3000/


エラーが出ます。
```
Server Error
Error: either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!

```

これは環境変数を設定してくださいとエラーが出ます。
起動を中止します。(ctrl+c)

参考

Supabase ローカル開発環境 ＋ サーバー運用を想定 2023 - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

ローカルにSupabaseのプロジェクトを作ります。

上記の記事通りに
ローカルに
SupabaseのCLI
Docker Desktop
supabase （ローカルのSupabaseを操作するために必要）
をインストールします。

SupabaseのCLIのインストール
省略
Docker Desktopのインストール
省略

supabaseのインストール
npm i supabase --save-dev


supabaseのヘルプ
supabase help


Supabaseを初期化の前に

初期化コマンドを実行するとsupabase\seed.sqlがクリアされてしまうのでファイルを別に保存しておくか、↓のコードを貼り付けるか、gitのsupabase\seed.sqlファイルの変更を破棄して元に戻します。

↓シードファイルは初期化コマンドを実行すると消えてしまいます。

```supabase\seed.sql
insert into todos(title)
values
  ('Create Supabase project'),
  ('Create Next.js app from Supabase Starter template'),
  ('Keep building cool stuff!');

```

# Supabaseの初期化

ローカル用の設定をするために初期化します。

supabase init

supabase\config.toml等が新たに作られます。

# ローカルのSupabaseの起動

※Docker Desktopを起動させておきます。
すでに起動しているSupabaseのコンテナがあったのならば停止、削除しておきます。（ローカルに2つ以上のSupabaseは起動できないため）

起動中のコンテナをすべて停止するコマンド。
docker stop $(docker ps -q)


supabase start

成功すると


Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ**********************************YTn_I0
service_role key: eyJ********************************************pN81IU

Supabaseのstatusが表示されます。

↓このコマンドで同じ情報が表示されます。
supabase status


↓このファイル名を
.env.local.example
を
.env.local
に変更します。

※.gitignoreに登録されていて、gitに追跡されていないことを確認してください。



NEXT_PUBLIC_SUPABASE_URLには
API URLを設定します。

NEXT_PUBLIC_SUPABASE_ANON_KEY
anon key:を設定します。

```.env.local
# Update these with your Supabase details from your project settings > API
# https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ**********************************YTn_I0

```

※NEXT_PUBLIC_SUPABASE_API_KEYではありません、ANON_KEYです。



ここまでの設定が成功すると
↓このコマンドでブラウザで動作を確認できます。
npm run dev


ここまでが下準備です。
ここからコードを読んでいきます。

まずはサンプルのトップページにこれを見てと指示があります。


Look in the _examples folder to see how to create a Supabase client in all the different contexts.
>examplesフォルダで、Supabaseクライアントの作成方法をご覧ください。



| Type                | Src                                            |
|---------------------|------------------------------------------------|
| Client Components   | app/_examples/client-component/page.tsx        |
| Server Components   | app/_examples/server-component/page.tsx        |
| Server Actions      | app/_examples/server-action/page.tsx           |
| Route Handlers      | app/_examples/route-handler.ts                 |
| Middleware          | app/middleware.ts                              |
| Protected Routes    | app/_examples/protected/page.tsx               |





# Client Components

```
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function ClientComponent() {
  const [todos, setTodos] = useState<any[]>([])

  // Create a Supabase client configured to use cookies
  // ja:クッキーを使用するように構成されたSupabaseクライアントを作成します
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getTodos = async () => {
      // en:This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      // ja:これは、Supabaseに`todos`テーブルがあることを前提としています。READMEの`Create Table and seed with data`セクションをチェックしてください👇
      const { data } = await supabase.from("todos").select()
      if (data) {
        setTodos(data)
      }
    }

    getTodos()
  }, [supabase, setTodos])

  return <pre>{JSON.stringify(todos, null, 2)}</pre>
}



```

























参考

next.js/examples/with-supabase at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-supa
supabase - npm

https://www.npmjs.com/package/supabase?activeTab=readme

Supabase CLI reference

https://supabase.com/docs/reference/cli/supabase-init



# Supabase スターター

このスターターは、Supabase Auth がクッキーを使用するように設定し、Next.js アプリ全体（クライアントコンポーネント、サーバーコンポーネント、ルートハンドラ、サーバーアクション、ミドルウェア）でユーザーのセッションを利用できるようにします。

## 自分でデプロイする

Vercel のデプロイメントでは、Supabase のアカウントとプロジェクトの作成が案内されます。Supabase インテグレーションをインストールした後、関連するすべての環境変数が設定され、デプロイ後すぐにプロジェクトが使用できるようになります 🚀。

[Vercel でデプロイ](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

## 使い方

1. 新しい Supabase プロジェクトを作成する](https://database.new)
1. npx create-next-app -e with-supabase` を実行して、Supabase Starter テンプレートを使って Next.js アプリを作成します。
1. cd` を使ってアプリのディレクトリに移動します。
1. npm install` を実行して依存関係をインストールする。
1. .env.local.example`を`.env.local`にリネームし、[Supabase プロジェクトの API 設定](https://app.supabase.com/project/_/settings/api) から`NEXT_PUBLIC_SUPABASE_URL`と`NEXT_PUBLIC_SUPABASE_ANON_KEY` の値を更新する。
1. npm run dev` を実行してローカル開発サーバーを起動する。

> ローカルで Supabase を実行するには、[ローカル開発に関するドキュメント](https://supabase.com/docs/guides/getting-started/local-development) を参照してください。

### Supabase クライアントの作成

Supabase クライアントの作成例は、[`/app/_examples`](./app/_examples/)フォルダを参照してください：

- クライアントコンポーネント](./app/\_examples/client-component/page.tsx)
- サーバーコンポーネント](./app/\_examples/server-component/page.tsx)
- ルートハンドラ](./app/\_examples/route-handler/route.ts)
- サーバーアクション](./app/\_examples/server-action/page.tsx)

### todo`テーブルを作成し、データをシードする。

プロジェクトの SQL エディタ](https://app.supabase.com/project/_/sql)に移動し、`New query`をクリックし、[init.sql](./supabase/migrations/20230618024722_init.sql)ファイルの内容を貼り付け、`RUN`をクリックします。

これにより、基本的な `todos` テーブルが作成され、行レベルセキュリティ (RLS) が有効になり、`select` と `insert` アクションを `認証済み` ユーザに許可する RLS ポリシーが作成される。

テーブル `todos` にダミーデータを追加するには、[seed.sql](./supabase/seed.sql) ファイルの内容を実行してください。

## フィードバックと問題点

フィードバックや問題点は [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose) にお願いします。

## その他の Supabase の例

- [Next.js サブスクリプション決済スターター](https://github.com/vercel/nextjs-subscription-payments)
- クッキーベースの認証と Next.js 13 アプリルーター（無料コース）](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- Supabase 認証と Next.js アプリルーター](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js 認証ヘルパードキュメント](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

www.DeepL.com/Translator（無料版）で翻訳しました。
