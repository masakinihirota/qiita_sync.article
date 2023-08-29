<!--
title:   Next.js 13 App router と Supabase での４つのアクセス方法
tags:    AppRouter,Next.js,ServerAction,Supabase,middleware
id:      b4b168a056dc10776d87
private: false
-->

# Server Actions

Next.js の Server Actions は先日アルファが取れたようです。
Next.jsの公式ドキュメントで確認。ただし、ベータ版とも書かれていませんでした。
APIの関数として紹介されています。

現在、実験的機能のフラグをtrueにする事で利用できます。

https://nextjs.org/docs/app/api-reference/functions/server-actions

```
next.config.js
module.exports = {
  experimental: {
    serverActions: true,
  },
}

```

# この記事の完成リポジトリ

https://github.com/masakinihirota/vercel_supabase_starter

ダウンロード

```
gh repo clone masakinihirota/vercel_supabase_starter

```

Next.js公式examples集を分類（2023年7月版）
https://qiita.com/masakinihirota/items/c4c8931d7067349006ef

Next.jsのサンプル集の中の **with-supabase** を見ていきます。
このサンプルは Supabase 側でも 推奨されています。

next.js/examples/with-supabase at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-supabase

※このサンプルは認証機能付きです。



# 環境

Windows10
VSCode
Supabase



# 前提知識

Supabaseのアカウント作成済み。
Supabaseの環境変数の取得方法を理解している。
Supabaseのダッシュボードが使えるようになっている。



# インストール

npx create-next-app -e with-supabase

# 環境変数の設定

```.env.local
NEXT_PUBLIC_SUPABASE_URL=https://z************z.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey**************************74

```


これで設定が完了していれば

npm run dev

を実行すると

http://localhost:3000/

で起動の確認が出来ます。



参考

Supabase ローカル開発環境 ＋ サーバー運用を想定 2023 - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

※今回は Supabaseのローカル環境を必要としません。



# データベースの初期化

## マイグレーションファイルをサーバーに適用する方法

このリポジトリにはサンプル用のSQLがすでに用意されています。
それをSupabaseに適用します。

Supabaseのダッシュボードを開きます。

SQL Editorを開きます。

supabase\migrations\20230618024722_init.sql

```supabase\migrations\20230618024722_init.sql
create table if not exists todos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  is_complete boolean default false,
  user_id uuid references auth.users default auth.uid()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table todos
  enable row level security;

create policy "Authenticated users can select todos" on todos
  for select to authenticated using (true);

create policy "Authenticated users can insert their own todos" on todos
  for insert to authenticated with check (auth.uid() = user_id);

```

を貼り付けます。

右下の 「RUN CTRL」ボタンを押して 成功したら メッセージ ↓Successを確認できます。

「Success. No rows returned」

これで todos テーブルが出来ました。

※SupabaseのCLIからサーバーに直接適用できるかどうか調べてみましたが、ローカル環境を作らずに直接サーバーに適用させる方法はわかりませんでした。
ですので上記のようにSQL文をコピペしています。

通常、SupabaseのCLIは、ローカル環境でマイグレーションを作成し、DBでテーブルを作成して、シードファイルを読み込ませて、動作確認ができたらサーバーにPUSHしています。

ローカルからならたくさんのマイグレーションファイルを作ってもPUSH出来ますし、一つにまとめるコマンドもあるようですからローカルからサーバーに反映させるのには問題ありません。



## シードファイルをサーバーに適用する方法

supabase\seed.sql

```supabase\seed.sql
insert into todos(title)
values
  ('Create Supabase project'),
  ('Create Next.js app from Supabase Starter template'),
  ('Keep building cool stuff!');

```

シードファイルもテーブル作成と同様にSQL文を貼り付けて実行します。


Supabaseのダッシュボードの Table Editor で todosテーブルを選択すると。
データも入っていることが確認できます。


これでSupabase側の下準備は完了です。

これからNext.jsのコードからSupabaseにアクセスして
そのデータを表示するまでを実践します。




----------------------------------------

# Next.jsでのコンポーネント

サンプルには4つのコンポーネントが用意されています。
この4つにはSupabaseにアクセスする4種類のパターンが用意されています。


## 4種類のアクセス方法

### クライアントから Supabaseのデータを取得する方法
useEffectを利用してデータを取得しています。
Supabaseはクライアントから直接データを取得できます。
クライアントコンポーネントにしています。



### ルートハンドラーで Supabaseのデータを取得する方法
Next.jsのルーティング機能を使用してHTTPリクエストを送信してデータを取得しています。
Supabaseから直接データを取得しています。

ルートハンドラー
Webアプリケーションにおいて、特定のURLに対するリクエストを処理するための関数です。
ルートハンドラーは、リクエストを受け取り、適切なレスポンスを返すために使用されます。



### Server ActionsでSupabaseのDBを操作する方法

このサンプルではインサート関数を作ってタイトルを保存しています。
Supabaseから直接データを挿入しています。



### サーバーコンポーネントで Supabaseのデータを取得する方法

このサンプルではサーバーコンポーネントのクライアントを使用しています。
サーバーコンポーネントからデータを取得しているので、データの取得は高速で、セキュリティリスクは少ないです。

サーバーコンポーネント
サーバー側でのみ実行されるコンポーネントです。


## 4つのコンポーネント

```
app\_examples\client-component

app\_examples\route-handler

app\_examples\server-action

app\_examples\server-component

```

クライアントコンポーネント
ルートハンドラー
サーバーアクション
サーバーコンポーネント
の4種類です。

※Next.jsの App router のルールとして フォルダ名の先頭に _[アンダーバー]が
ついているとそのフォルダは無視されます。

```
app\_examples

```

このアンダーバーを消して

```
app\examples

```

にフォルダ名を変更します。

※VSCode上でフォルダ名を変更すると時間がかなりかかるので、
一旦VSCodeを閉じてエクスプローラー上から変更して、再度VSCodeを起動します。

最初にトップページにそれぞれのコンポーネントにリンクを貼っておきます。

ログイン部分の機能だけ残して不要な部分を削除します。
（見た目を綺麗にするだけです）



app\page.tsx

```app\page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import LogoutButton from "../components/LogoutButton"

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Link href="./examples/client-component">Client Component Example</Link>
      <Link href="./examples/route-handler">Route Handler Example</Link>
      <Link href="./examples/server-action">Server Action Example</Link>
      <Link href="./examples/server-component">Server Component Example</Link>
    </>
  )
}

```

リンクを貼るだけでコードの作業は完了です。

あとは
npm run dev
でローカル環境を立ち上げて

http://localhost:3000/

をブラウザで表示します。

ログインをします。
※ログインはそれぞれ各自で設定してください。


そうするとトップページに4つのリンクが表示されます。

```
Client Component Example
Route Handler Example
Server Action Example
Server Component Example

```

※ダッシュボードの Table Editor を開き todos テーブルのデータと見比べてください。
※Server Action Exampleはなにか文字列を入力してリターンキーを押すと、データがテーブルに登録されます。リターンキーを押しすぎるとそのまま複数のデータが登録されるので注意してください。













# Supabaseのアクセス方法の解説 （おまけ）

## Client Component Example

クライアントコンポーネントです。
なので"use client"とディレクティブが書かれています。


```
  const [todos, setTodos] = useState<any[]>([])

```

Hooks useState の基本的な使いかたなので説明の必要はありません。

```
  const supabase = createClientComponentClient()

```

createClientComponentClient を使用してクライアントを作っています。

※Supabaseのクライアントつくると Supabaseへアクセスする事ができるようになります。



```
  useEffect(() => {
    const getTodos = async () => {
      const { data } = await supabase.from("todos").select()
	// データがあるのなら
      if (data) {
        setTodos(data)
      }
    }

    getTodos()
  }, [supabase, setTodos])

```

↑Supabaseにアクセスするために非同期処理 async/await を利用しています。



```
supabase.from("todos").select()

```

↑このコードはSupabaseにアクセスしています。
見た目通り todos テーブルから select 関数で 全てのカラムを取得しています。



```
  }, [supabase, setTodos])

```

↑この行は useEffect の第2引数で 依存配列です。
どちらかが変更された場合に再度実行されます。
これも useEffect の基本的な使い方です。


  return <pre>{JSON.stringify(todos, null, 2)}</pre>

return文は取得したデータを表示するだけの役割です。

特に難しいところはありませんでした。



## Route Handler Example

Next.jsのルーティング機能を使用して、HTTPリクエストを受け取り、適切なルートにルーティングするための関数が定義されたファイルです。このファイルには、`GET`HTTPメソッド関数が定義されており、リクエストを受け取り、適切な処理を行うためのコードが記述されています。

`GET` 関数は、HTTP GETリクエストを受け取り、Supabaseを使用してデータを取得するための処理を行います。

このファイルは、Next.jsのルーティング機能を使用して、サーバーサイドでのAPIエンドポイントを簡単に作成するためのサンプルです。


ルートハンドラーのクライアントは
createRouteHandlerClient
を利用してクライアントを作成しています。

```
  const supabase = createRouteHandlerClient({ cookies })

```

※クッキーを使用してクライアントを作成しています。

```
  const { data: todos } = await supabase.from('todos').select()

```

これは前項のデータ取得方法と同じです。

```
  return NextResponse.json(todos)

```

取得したデータをjsonで返しています。

特に難しいところはありませんでした。



## Server Action Example

このサンプルのメイン Server Actions の利用方法です。
このサンプルでは、Supabaseの todos テーブルにデータを登録しています。

このコンポーネントは、`createServerActionClient` 関数を使用して、Supabaseのクライアントを初期化し、`useEffect` フックを使用して、コンポーネントがマウントされたときにデータを取得する処理を行っています。

取得したデータは、`setTodos` 関数を使用して、`todos` ステートに保存され、`JSON.stringify` メソッドを使用して、JSON形式で表示されます。



revalidatePath()
この関数は、ページのパスを受け取り、そのパスに関連するデータを再検証するための処理を行います。

Next.js Server Actions と revalidate 周りの挙動を確認する

https://zenn.dev/cybozu_frontend/articles/server-actions-and-revalidate





サーバーアクションのクライアントは
createServerActionClient
を利用してクライアントを作成しています。

ServerAction()関数は非同期関数です

```
  const addTodo = async (formData: FormData) => {
    "use server"
    const title = formData.get("title")

```

↑この場所で"use server" ディレクティブが宣言されています。

このファイルはサーバー側です、しかしこのように "use server"とディレクティブを宣言しないと関数をクライアントコンポーネントに渡すことは出来ません。

```
    <form action={addTodo}>
```

この場所で関数を渡しています。



```
    const title = formData.get("title")

```

↑この行で 、フォームから送信されたデータからタイトルを取得しています。
formDataという変数は、フォームのデータを表すオブジェクトです。get()メソッドを使用して、titleという名前のフィールドの値を取得します。

タイトルが存在する場合

```
      const supabase = createServerActionClient({ cookies })

```

クライアントを作成しています。

今回はクライアントからDBへ直接挿入をしています。


```
await supabase.from("todos").insert({ title })

```

↑この1行だけでフォームに入力したタイトルを直接DBに登録しています。
コードは非常にシンプルです。

```
      revalidatePath("/server-action-example")

```

revalidatePathをつかい、データが更新されていたらページのデータが最新のものに更新されます。


```
  return (
    <form action={addTodo}>
      <input name="title" />
    </form>
  )

```

↑return文でフォームに ServerAction関数である addTodo が登録されています。





## Server Component Example

このコンポーネントは、`createServerComponentClient` 関数を使用して、Supabaseのクライアントを初期化し、`useEffect` フックを使用して、コンポーネントがマウントされたときにデータを取得する処理を行っています。

サーバーコンポーネントなので、
データへのアクセス速度は早く、
セキュリティリスクは少なく、
安全にデータを扱うことが可能です。


```
  const supabase = createServerComponentClient({ cookies })

```

Supabaseのクライアントを作っています。

```
  const { data: todos } = await supabase.from('todos').select()

```

supabase.from('todos').select()
Supabaseの todos テーブルから すべてのデータを取得しています。


```
  return <pre>{JSON.stringify(todos, null, 2)}</pre>

```

`JSON.stringify()`関数は、JavaScriptオブジェクトをJSON文字列に変換するために使用されます。
この関数は、3つの引数を受け取ります。最初の引数は変換するオブジェクトであり、2番目の引数は置換関数であり、3番目の引数はインデントレベルです。この場合、`todos`オブジェクトが変換され、インデントレベルが2に設定されています。


App routerの特性を利用して サーバからDBにアクセスをしてもらって
それをブラウザで表示しています。

これも特に難しい処理はありません。

以上が４つのDBへのアクセス方法になります。



# ログアウト

ログアウトすると、ブラウザ上にはデータが表示されません。
Server Actionsからもデータを登録できません。
これは RLS が効いているからです。

最初に使用したSQL文で、テーブルを作成した後半に RLS を有効にするコードと
RLSの使用条件を設定したコードが書かれています。
