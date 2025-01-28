<!--
title:   SupabaseをGraphQLで使う Next.js Drizzle
tags:    Drizzle,GraphQL,Next.js,Supabase
id:      3443d8cb3e2705e128e6
private: true
-->
現在のバージョン
Supabase GraphQL (pg_graphql) 1.5.9

supabase/pg_graphql: GraphQL support for PostgreSQL
https://github.com/supabase/pg_graphql

使用ツール(現在使用しているツール)
Next.js
Supabase
Drizzle
Hono

# GraphQLが使えるようになった時

```terminal
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ*****
service_role key: eyJ*****
   S3 Access Key: 625*****
   S3 Secret Key: 850*****
       S3 Region: local

```

👆️いつだったか、ローカルでSupabaseを立ち上げ使っている時に

`GraphQL URL: http://127.0.0.1:54321/graphql/v1`

が追加されてました、
その時はGraphQLを使う予定はなかったのでスルーしてましたが、
そろそろ使ってみようと思いSupabaseではどうやってGraphQLを使ったらいいのか調べてみます。

Next.jsとSupabaseの組み合わせです。



----------------------------------------

# 用語

## バルク操作

複数のデータを一度に処理することを指します。
例えば、データベースにおいて、複数のレコードを一度に挿入したり更新したりする操作です。

## ネットワークトリップ

データを送受信するために発生するネットワーク上の往復通信のことを指します。
具体的には、クライアント（例えば、アプリケーションやブラウザ）からサーバーにリクエストを送り、サーバーがそのリクエストに応じてレスポンスを返すまでの過程を言います。

## 準備済みステートメント

データベースに対して実行するSQLクエリを事前にコンパイルしておく方法のことを指します。
これにより、同じクエリを何度も実行する際に、毎回クエリを解析したりコンパイルしたりする必要がなくなります。

## スループット

特定のシステムやプロセスが一定の時間内に処理できる仕事の量やデータの量を指します。
主に、ネットワーク、データベース、コンピュータシステムなどのパフォーマンスを測定するために使用されます。
スループットは、システムのパフォーマンスを評価する重要な指標です。

## クエリのスループット

特定のデータベースやAPIにおいて、一定の時間内に処理できるクエリの数を指します。

##ページ ネーション

別のページに次のデータを用意します。

## リレー方式のページ ネーション

大量のデータをページごとに分割して表示する方法の一つで、特にAPIやデータベースのクエリでよく使われます。

この方式では、各ページのデータを「カーソル」と呼ばれる特定のポイントを使用して取得します。

* リレー方式以外のページネーション
オフセット方式
無限スクロール
リストビュー
フィルタリング

## スキーマ リフレクション

データベースやAPIにおいて、スキーマ（構造や型の定義）を動的に取得し、それに基づいてデータの操作やクエリを行う機能のことを指します。
特にGraphQLなどのAPIでよく使われます。

## Query

GraphQLでのデータ取得時の命令

## Mutation

GraphQLでのデータ変更時（追加、更新、削除）の命令

## スキーマのイントロスペクション

GraphQL APIのスキーマ情報を取得する機能のことです。

この機能を使うことで、クライアントはサーバーがどのようなデータを提供しているか、どのようなクエリやミューテーションが利用可能かを事前に知ることができます。

## スキーマ

DBのテーブル設計などを指します。

## Resolves

GraphQLでは、クライアントからのクエリに応じてデータを取得し、返す役割を担うのがResolverです。スキーマで定義された各フィールドに対して、対応するResolver関数が紐付けられており、クエリの実行時に適切なResolverが呼び出されることで、必要なデータが取得されます。

簡単に言うと、Resolverは「どのデータをどのように取得するか」を定義する関数です。データベースからのデータの取得、APIへのリクエスト、あるいは静的なデータの提供など、データ取得の具体的な処理を記述します。

## ラウンドトリップ

クライアントからのリクエストがサーバーに送信され、サーバーが処理を完了してクライアントに応答を返すまでの一連の処理です。

----------------------------------------

# 前提知識

Next.js、Supabaseの前提知識がある人向け
アカウント作成済み
プロジェクト作成済み
Supabase CLI インストール済み
SupabaseでDocker立ち上げたことがある。
Supabaseのテーブルを作ったりCRUDを触ったことがある。


----------------------------------------

このBlog記事で発表
2025年1月27日現在では情報は少し古いです。

# SupabaseでGraphqlの提供開始 29 Mar 2022

GraphQL is now available in Supabase
https://supabase.com/blog/graphql-now-available

supabase-community/supabase-graphql-example: A HackerNews-like clone built with Supabase and pg_graphql
https://github.com/supabase-community/supabase-graphql-example

Supabaseは、開発者がデータベースと効率的にやり取りできるようにGraphQLをサポートするAPIインターフェースを導入しました。
この機能はPostgreSQLを活用しており、データを柔軟にクエリできます。

## 利用開始

- 利用可能性
GraphQL（ベータ版）は2022年3月28日以降に作成されたSupabaseプロジェクト専用です。

- GraphQLの有効化
Supabaseダッシュボードから`pg_graphql`拡張を有効にするか、以下のSQLコマンドを実行します：

```sql
create extension pg_graphql;

```

- エンドポイント

GraphQLは `https://<project_ref>.supabase.co/graphql/v1` でアクセスできます。



## 主な特徴

- 最適化されたパフォーマンス :
- クエリは準備済みステートメントとしてキャッシュされ、再リクエスト時のクエリ計画時間を大幅に短縮します。
- すべての操作がバルク実行をサポートし、ネットワークトリップを減少させ、効率を向上させます。
- 基本的なクエリのスループットは、Supabaseの無料プランのハードウェアで約377.4リクエスト/秒に達します。

- スキーマの反映 :
- GraphQLの型はSQLスキーマから直接派生し、テーブルは型、カラムはフィールドになります。
- CRUD操作をサポートし、リレー方式のページネーション、フィルタオプション、フィールドの順序付けが可能です。

- セキュリティ :
- 統合されたPostgreSQLセキュリティにより、リクエストは既存のロール権限や行レベルセキュリティを尊重します。
- GraphQLインターフェースは、ユーザーの権限に基づいて異なるスキーマを提供でき、データアクセスの制御を強化します。

## 実例アプリケーション

- HackerNewsクローン
`pg_graphql`の機能を示すデモには以下が含まれます：
- GraphQLを利用したCRUD操作。
- GraphQLカーソル接続仕様に合わせたカーソルベースのページネーション。
- Supabase認証を通じてデータアクセスを安全にする機能。

## 制限事項と今後のロードマップ

- 現在のサポート内容は以下の通りです：
- スカラー列に対するCRUD。
- 配列型に対する読み取り専用アクセス。
- SQLコメントを通じた計算フィールドのサポート。
- 今後のアップデートでは、より複雑なデータ型やカスタム関数など、追加のデータベース機能のサポートを強化する予定です。



## スキーマリフレクション

GraphQL の型とフィールドは SQL スキーマから反映されます。

* テーブルが型になる
* 列がフィールドになる
* 外部キーがリレーションになる

テーブル

```sql
create table "Account" (
  "id" serial primary key,
  "email" varchar(255) not null,
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null
);

```

GraphQL基本型に変換されます

```GraphQL
type Account {
  id: Int!
  email: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

```

そして、リレー形式のキーセットのページネーション、フィルター、順序付け、（オプションの）名前の屈折を完備した、QueryとMutationタイプでの一括CRUD操作を公開する。
```GraphQL
type Query {
  accountCollection(
    first: Int
    last: Int
    before: Cursor
    after: Cursor
    filter: AccountFilter
    orderBy: [AccountOrderBy!]
  ): AccountConnection
}

type Mutation {
	insertIntoAccountCollection(
		objects: [AccountInsertInput!]!
	): AccountInsertResponse

	updateAccountCollection(
    set: AccountUpdateInput!
    filter: AccountFilter
    atMost: Int! = 1
  ): AccountUpdateResponse!

  deleteFromAccountCollection(
   filter: AccountFilter
    atMost: Int! = 1
  ): AccountDeleteResponse!

```

👆️のコードの説明

Query（クエリ）

`accountCollection` というクエリが定義されているよ。このクエリは、アカウントのコレクションを取得するためのものなんだ。

- 引数 :
- `first`
最初の何件を取得するかを指定する整数。
- `last`
最後の何件を取得するかを指定する整数。
- `before`
特定のカーソルの前のデータを取得するための引数。
- `after`
特定のカーソルの後のデータを取得するための引数。
- `filter`
取得したいアカウントの条件を指定するためのフィルター。
- `orderBy`
どのようにデータを並べるかを指定するための引数のリスト。

このクエリを使うことで、アカウントの情報を必要な分だけ効率的に取得できます。
Mutation（ミューテーション）

ここでは、3つのミューテーションが定義されています。これらはデータの変更を行うための命令です。

1. `insertIntoAccountCollection` : 挿入
- 新しいアカウントをコレクションに追加するためのミューテーション。`objects`には追加したいアカウントの情報がはいります。

2. `updateAccountCollection` : 更新
- 既存のアカウントを更新するためのミューテーション。`set`で更新する内容を指定し、`filter`でどのアカウントを更新するかを決めます。それに、`atMost`で最大何件まで更新するかを設定できます。

3. `deleteFromAccountCollection` : 削除
- アカウントを削除するためのミューテーション。`filter`で削除したいアカウントの条件を指定して、`atMost`で最大何件まで削除するかを決めます。



# GraphQL 関連Blog記事

GraphQL is now available in Supabase
https://supabase.com/blog/graphql-now-available
この章

pg_graphql: A GraphQL extension for PostgreSQL
https://supabase.com/blog/pg-graphql

pg_graphql v1.0
https://supabase.com/blog/pg-graphql-v1

What's New in pg_graphql v1.2
https://supabase.com/blog/whats-new-in-pg-graphql-v1-2

pg_graphql: Postgres functions now supported
https://supabase.com/blog/pg-graphql-postgres-functions



----------------------------------------

# Supabase データベースの拡張機能 pg_graphql

pg_graphql: GraphQL for PostgreSQL | Supabase Docs
https://supabase.com/docs/guides/database/extensions/pg_graphql

##

pg_graphqlは、SQLの代わりにGraphQLを使用してデータベースとやり取りするためのPostgreSQL拡張です。

この拡張は、既存のSQLスキーマからGraphQLスキーマを反映し、SQL関数であるgraphql.resolve(...)を通じてそれを公開します。

これにより、PostgreSQLに接続できるプログラミング言語であれば、サーバやプロセス、ライブラリを追加することなく、GraphQLを介してデータベースに問い合わせることができるようになります。

pg_graphqlresolveメソッドは、SupabaseAPIを支えるツールであるPostgRESTと相互運用するように設計されており、RPCを介してgraphql.resolve関数を呼び出すことで、HTTP/S上でGraphQLAPIを安全かつ高性能に公開することができます。

## Enable the extension#

* Dashboard

Dashboard の Databaseに行きます。
左サイドバーのExtensionsを選択します。
検索で "pg_graphql"を探します。
有効化します。

* SQL

```sql
-- 有効化 the "pg_graphql" extension
create extension pg_graphql;

-- 無効化 the "pg_graphql" extension
drop extension if exists pg_graphql;

```

SQLコードが `create extension` であっても、これは"拡張機能を有効にする"ことと同じです。

拡張機能を無効にするには、 `drop extension` を呼び出します。



## Usage

Supabaseで試します。

* テーブルを作成します。

Supabaseダッシュボードでの左サイドバーから SQL Editorを開きます。

👇 sql文をコピペします。

```sql
create table "Blog"(
  id serial primary key,
  name text not null,
  description text
);

insert into "Blog"(name)
values ('My Blog');

```

Table Eitorを見るとテーブルが作成されています。

GraphQLスキーマは、次のようにクエリを実行できます。

👇 sql文をコピペします。

```sql
select
  graphql.resolve($$
    {
      blogCollection(first: 1) {
        edges {
          node {
            id,
            name
          }
        }
      }
    }
  $$);

```

👆このSQL文の中にGraphQLクエリが埋め込まれた形になっていて、これはデータベースの拡張機能を利用して、SQL環境でGraphQLクエリを実行するための構文です。
通常のSQL文とは異なりますが、SQLの拡張機能を利用したSQL文です。

具体的には、`Blog`テーブルから最初の1件のレコードを取得し、その`id`と`name`を表示するGraphQLクエリを実行します。

以下に、クエリの各部分を分解して解説します。

*   `select graphql.resolve(...)`：これは、**`graphql.resolve`というSQL関数**を呼び出すことを意味します。`graphql.resolve`関数は、引数として与えられたGraphQLクエリを実行し、結果をJSON形式で返します。

*   `$$ ... $$`：これは、**SQLにおける文字列リテラル**です。
この記法で囲まれた部分は、文字列として扱われ、GraphQLクエリそのものがこの中に記述されます。

*   `{ blogCollection(first: 1) { edges { node { id, name } } } }`：これが**GraphQLクエリ**の部分です。
    *   `blogCollection(first: 1)`：これは、`blogCollection`という名前のコレクション（テーブルのようなもの）から、最初の1件 (`first: 1`) のレコードを取得することを指定しています。
    *   `edges { node { id, name } }`：これは、取得したレコードの情報をどのように取得するかを指定しています。
        *   `edges` は、取得したレコードをエッジという形式で返すことを意味します。
        *   `node` は、各エッジが持つノード（レコードそのもの）を表します。
        *   `id, name` は、各ノードから`id`と`name`というフィールドの値を取り出すことを指定しています。

したがって、このSQLクエリ全体は、「`Blog`テーブルから最初の1件のレコードを取得し、その`id`と`name`をGraphQLクエリを使ってJSON形式で取得する」という操作を表しています。

blogCollection のように、テーブル名に "Collection" を付加した名称は、GraphQL における一般的な命名規則に従ったものです。

edges は、レコードの配列を格納するフィールドで、それぞれのレコードは node フィールドを持ちます。

node は、edges が持つレコードそのものを表します。

このクエリを実行すると、以下のような👇 JSON形式の結果が返ってきます。

```resolve
{"data":{"blogCollection":{"edges":[{"node":{"id":1,"name":"My Blog"}}]}}}

```

👇 整形

```json
{
  "data": {
    "blogCollection": {
      "edges": [
        {
          "node": {
            "id": 1
            "name": "My Blog"
          }
        }
      ]
    }
  }
}

```

このJSONレスポンスは、GraphQLクエリの結果として`blogCollection`から最初の1件のレコードが取得され、その`id`が1、`name`が"My Blog"であることが示されています。

この`graphql.resolve`関数は、PostgreSQLでGraphQLクエリを実行するための重要な要素であり、Supabaseなどの環境でGraphQL APIを利用する際に活用されます。`pg_graphql`拡張機能を使用することで、SQLデータベースをGraphQL APIとして公開し、より柔軟なデータ取得が可能になります.

pg_graphqlはスキーマのイントロスペクションを完全にサポートしているので、任意のGraphQL IDEやスキーマ検査ツールに接続して、APIで使用可能なフィールドと引数の完全なセットを見ることができます。

----------------------------------------

※Supabaseでの利用を基準にしています。

# pg_graphql

pg_graphqlとは
PostgreSQL データベースに GraphQL サポートを追加します。
SupabaseがGraphQLサーバーを立てるために使っているライブラリです。

graphql.resolve: GraphQL クエリを実行するための SQL 関数。

## ドキュメント
pg_graphql
https://supabase.github.io/pg_graphql/

## ソースコード
supabase/pg_graphql: GraphQL support for PostgreSQL
https://github.com/supabase/pg_graphql

## Welcome

### 概要
pg_graphql単一の SQL 関数を使用して GraphQL でデータベースをクエリできるようにする PostgreSQL 拡張機能です。

この拡張機能は、既存の SQL スキーマから GraphQL スキーマを反映し、それを SQL 関数を通じて公開します。
graphql.resolve(...) により、PostgreSQL に接続できるプログラミング言語であれば、追加のサーバー、プロセス、ライブラリなしで GraphQL 経由でデータベースを操作できるようになります。

```sql
create table account(
    id serial primary key,
    email varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

create table blog(
    id serial primary key,
    owner_id integer not null references account(id),
    name varchar(255) not null,
    description varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null
);

create type blog_post_status as enum ('PENDING', 'RELEASED');

create table blog_post(
    id uuid not null default uuid_generate_v4() primary key,
    blog_id integer not null references blog(id),
    title varchar(255) not null,
    body varchar(10000),
    status blog_post_status not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

```

このSQL文がGraphQLスキーマに変換されます。

各テーブルは、外部キーによって定義されたリレーションシップを持つページング可能なコレクションでトップレベルのQueryタイプでエントリポイントを受け取ります。
テーブルも同様に、挿入、更新、削除の一括操作を可能にする Mutation 型のエントリポイントを受け取ります。



## Quickstart

Supabaseの場合
Supabaseのダッシュボードを開き、
左サイドメニューのIntegrationsを選びます。
右にINSTALLED INTEGRATIONSの項目に
GraphQL項目があるので選びます。

GraphQL IDE がここで使えます。

使い方は未知数。



## SQL Interface

GraphQL クエリ を Resolves  して JSONBを返します。

```
graphql.resolve(
    -- graphql query/mutation
    query text,
    -- json key/values pairs for variables
    variables jsonb default '{}'::jsonb,
    -- the name of the graphql operation in *query* to execute
    "operationName" text default null,
    -- extensions to include in the request
    extensions jsonb default null,
)
    returns jsonb

    strict
    volatile
    parallel safe
    language plpgsql

```

使用法

```
-- Create the extension
graphqldb= create extension pg_graphql;
CREATE EXTENSION

-- Create an example table
graphqldb= create table book(id int primary key, title text);
CREATE TABLE

-- Insert a record
graphqldb= insert into book(id, title) values (1, 'book 1');
INSERT 0 1

-- Query the table via GraphQL
graphqldb= select graphql.resolve($$
query {
  bookCollection {
    edges {
      node {
        id
      }
    }
  }
}
$$);

             resolve

{"data": {"bookCollection": {"edges": [{"node": {"id": 1}}]}}, "errors": []}

```



## API

データベースのテーブルとカラムを、GraphQLで使えるように変換しています。

SQLのテーブルがGraphQLの型になる: データベースにある「顧客テーブル」や「商品テーブル」といったテーブルが、GraphQLでは「顧客型」や「商品型」として扱われるようになります。

テーブルのカラムや外部キーがGraphQLのフィールドになる: テーブルの中にある「名前カラム」や「住所カラム」、他のテーブルとの関連を示す「注文ID（外部キー）」などが、GraphQLの型の中の「名前フィールド」や「住所フィールド」、「注文フィールド」として表現されます。

デフォルトでは名前はそのまま: 普通は、データベースの名前（例えばaccount_holderテーブル）がそのままGraphQLの名前（account_holder型）として使われます。
特に変換は行われません。

名前の変換（inflection）も可能: データベースでよく使われるsnake_case（単語をアンダースコアで繋ぐ書き方、例：account_holder）を、GraphQLやJavaScriptで一般的なPascalCase（単語の先頭を大文字にする書き方、例：AccountHolder）に自動で変換する機能もあります。
つまり、account_holderテーブルはAccountHolder型になります。

手動での名前変更も可能: 自動変換だけでなく、テーブル名、カラム名、リレーションシップ名（テーブル間の関係の名前）を個別に手動で設定することもできます。



### Primary Keys (Required)

主キーが必須

GraphQLスキーマ（GraphQLで使えるデータの定義）にテーブルを公開するための必須条件について。

GraphQLで使えるようにするには、テーブルに主キーが必要です。


* QueryType

GraphQLにおいて、データにアクセスする方法は大きく分けて2種類あります。

* Query（クエリ）: データの取得（読み取り）
* Mutation（ミューテーション）: データの変更（作成、更新、削除）
Query Type はGraphQLの読み取りの全てのエントリーポイントです。



#### Node

GraphQLにおいて、nodeインターフェースは、データ取得の効率性と柔軟性を高めるための重要な仕組みの一つです。

* SQL Setup

```
create table "Blog"(
  id serial primary key,
  name varchar(255) not null,
  description varchar(255),
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null
);

```

* GraphQL Types

```
"""The root type for querying data"""
type Query {

  """Retrieve a record by its `ID`"""
  node(nodeId: ID!): Node

}

```

ノード インターフェイスを効果的にクエリするには、インライン フラグメントを使用して、各タイプに対して返すフィールドを指定します。



#### Collections

「コレクション」は、GraphQLにおいて、データベースのテーブルからデータを取得する際の、整理された方法です。特に、大量のデータを扱う際に便利です。

* 各テーブルはQuery型にトップレベルのエントリを持つ: データベースの各テーブルは、GraphQLのQuery型の中で、そのテーブルのデータにアクセスするための専用の入り口（エントリ）を持っています。

* コレクションはコネクション型を返す: この入り口からデータを取得すると、「コネクション型」と呼ばれる特別な形式でデータが返ってきます。

* ページネーション、フィルタリング、ソートが可能: このコネクション型を使うことで、データを「ページネーション（分割表示）」、「フィルタリング（絞り込み）」、「ソート（並べ替え）」することができます。



* GraphQL Types

```
"""The root type for querying data"""
type Query {

  """A pagable collection of type `Blog`"""
  blogCollection(

    """Query the first `n` records in the collection"""
    first: Int

    """Query the last `n` records in the collection"""
    last: Int

    """Query values in the collection before the provided cursor"""
    before: Cursor

    """Query values in the collection after the provided cursor"""
    after: Cursor

    """
    Skip n values from the after cursor. Alternative to cursor pagination. Backward pagination not supported.
    """
    offset: Int

    """Filters to apply to the results set when querying from the collection"""
    filter: BlogFilter

    """Sort order to apply to the collection"""
    orderBy: [BlogOrderBy!]
  ): BlogConnection
}

```

種類
BlogConnection
BlogEdge
PageInfo
Blog
BlogOrderBy
BlogFilter



##### Pagination

コレクション（データのまとまり）を前後にページ移動するのは、first、last、before、afterというパラメータを使って行われ、これはRelayの仕様に従っています。

###### Keyset Pagination

キーセットページネーション: 従来のページネーションは、ページ番号を使ってページを移動していました（例：1ページ目、2ページ目、3ページ目）。キーセットページネーションは、カーソルと呼ばれる「データの位置を示す情報」を使ってページを移動します。

* QueryType

```
type Query {

  blogCollection(

    """Query the first `n` records in the collection"""
    first: Int

    """Query the last `n` records in the collection"""
    last: Int

    """Query values in the collection before the provided cursor"""
    before: Cursor

    """Query values in the collection after the provided cursor"""
    after: Cursor

    ...truncated...

  ): BlogConnection
}

```

first、last、before、afterパラメータ: これらのパラメータは、ページネーションを行うために使用されます。
first: 最初のN件のデータを取得します。
last: 最後のN件のデータを取得します。
after: 指定されたカーソルの後のデータを取得します（前方へのページ移動）。
before: 指定されたカーソルの前のデータを取得します（後方へのページ移動）。

Relayの仕様: Relayは、Facebookが開発したGraphQLクライアントフレームワークです。

Relayは、ページネーションなどのデータ取得に関するいくつかの規約を定めており、この文章で説明されているページネーションの方法もその一つです。

* pageInfoフィールド

GraphQLのコレクション（データのまとまり）をページネーション（分割表示）する際に、現在のページに関する情報を提供します。
コレクションから返ってくるデータには、現在のページの情報が入ったpageInfoというものが付いてきます。
これを使うと、次のページがあるかとか、最後のデータの位置とかがわかります。

* PageInfo型: pageInfoはPageInfo型で定義されており、以下のフィールドを持っています。

startCursor: 現在のページの最初のデータのカーソル（位置情報）。

endCursor: 現在のページの最後のデータのカーソル。

hasNextPage: 次のページがあるかどうかを示す真偽値（trueまたはfalse）。

hasPreviousPage: 前のページがあるかどうかを示す真偽値。

* 前方へのページネーション: コレクションを前方（次のページへ）にページネーションするには、firstとafter引数を使用します。

first: 取得するデータの最大件数。

after: どのカーソルの後からデータを取得するかを指定します。

* 最初のページの取得: 最初のページを取得する場合は、after引数はnullにするか、省略します。

コレクションの最後まで見終わったら、data.blogConnection.pageInfo.hasNextPageがfalseになります。

前のページに戻りたいときは、firstをlastに、afterをbeforeに、hasNextPageをhasPreviousPageに置き換えて同じことを繰り返します。



###### Offset Pagination

キーセットページネーションに加えて、firstとoffsetを使ってページを区切る方法もあります。
これはSQLのLIMITとOFFSETと同じように、結果の中でoffsetの数だけレコードを飛ばします。

これは、SQLのLIMITとOFFSET句に似た動作をします。

* オフセットページネーション: この方法は、firstとoffsetという2つのパラメータを使ってページネーションを行います。

first: 取得するデータの最大件数。これはキーセットページネーションのfirstと同じです。

offset: 結果の中でスキップするレコード数。これがオフセットページネーションの特徴です。

例えるなら、本棚から本を取り出すときに、
「最初の10冊を取ってきて」というのがfirst。
「最初の5冊は飛ばして、その次の10冊を取ってきて」というのがfirstとoffsetの組み合わせです。
この例えでいうとoffsetは5になります。

SQLのLIMITとOFFSETとの関係で説明すると、

```sql
SELECT * FROM products LIMIT 10 OFFSET 20;

```

というSQLクエリは、「productsテーブルから、21番目から30番目までの10件のレコードを取得する」という意味になります。これは、GraphQLのオフセットページネーションで、first: 10, offset: 20と指定するのとほぼ同じです。

※offsetベースのページネーションは、offsetの値が大きくなるにつれて効率が悪くなります。
このため、可能な限りカーソルベースのページネーション（キーセットページネーション）を使用することを推奨します。

これは、offsetの値が大きくなると、データベースはoffsetの数だけレコードを読み飛ばす必要があり、パフォーマンスに影響が出るためです。例えば、offset: 1000000と指定すると、データベースは最初の100万件のレコードを読み飛ばしてから、必要なデータを取得するため、非常に時間がかかります。



##### Filtering

結果セットをフィルタリングするには、フィルター引数を使用します。

* QueryType

```
type Query {

  blogCollection(

    """Filters to apply to the results set when querying from the collection"""
    filter: BlogFilter

    ...truncated...

  ): BlogConnection
}

```

<Table>Filter タイプは、フィルタ可能なフィールドとそれに関連付けられた <Type>Filter を列挙します。

👇 このリストは、<Type> フィルター タイプで使用できる演算子です。

| Operator | Description |
| :------- | :--------- |
| `eq` | Equal To |
| `neq` | Not Equal To |
| `gt` | Greater Than |
| `gte` | Greater Than Or Equal To |
| `in` | Contained by Value List |
| `lt` | Less Than |
| `lte` | Less Than Or Equal To |
| `isNull` | Is Null or Not Null |
| `startsWith` | Starts with prefix |
| `like` | Pattern Match. `%` as wildcard |
| `ilike` | Pattern Match. `%` as wildcard. Case Insensitive |
| `regex` | POSIX Regular Expression Match |
| `iregex` | POSIX Regular Expression Match. Case Insensitive |
| `contains` | Contains. Applies to array columns only. |
| `containedBy` | Contained in. Applies to array columns only. |
| `overlaps` | Overlap (have points in common). Applies to array columns only. |

※すべての演算子がすべての <Type>Filter タイプで使用できるわけではありません。たとえば、UUID は順序付けられていないため、UUIDFilter は eq と neq のみをサポートします。

GraphQLでは、リストを期待しているところにリストじゃない値が渡された場合、自動的にその値を要素が1つのリストに変換するルールがあります。
なので orの中に複数の条件を直接書くと、意図しないandの扱いになってしまうことがあるから注意が必要が必要です。
あと、カラム名にand、or、notを使うと、フィルタリングで問題が起きるから避けてください。

##### Ordering

並び順

特に指定がない場合、結果はデータベースのテーブルの主キーで昇順に並べられるます。
でも、orderBy引数に<Table>OrderByの配列を渡せば、並び順を自由に変えられます。

* QueryType

```
type Query {

  blogCollection(

    """Sort order to apply to the collection"""
    orderBy: [BlogOrderBy!]

    ...truncated...

  ): BlogConnection
}

```

並び順を指定するとき、配列の中の各要素には、キーと値のペアを1つだけしか書けません。
例えば、[{name: AscNullsLast}, {id: AscNullFirst}]はOKだけど、[{name: AscNullsLast, id: AscNullFirst}]みたいに、1つの要素の中に複数のキーと値のペアは書けません。



### MutationType

Mutation型は、データの追加、更新、削除を行うための入り口です。
それぞれのテーブルに対して、insertInto<Table>Collection（追加）、update<Table>Collection（更新）、deleteFrom<Table>Collection（削除）という操作が用意されています。


#### SQL Setup

```sql
create table "Blog"(
  id serial primary key,
  name varchar(255) not null,
  description varchar(255),
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp
);

```

* MutationType

```
"""The root type for creating and mutating data"""
type Mutation {

  """Adds one or more `BlogInsertResponse` records to the collection"""
  insertIntoBlogCollection(

    """Records to add to the Blog collection"""
    objects: [BlogInsertInput!]!

  ): BlogInsertResponse

  """Updates zero or more records in the collection"""
  updateBlogCollection(
    """
    Fields that are set will be updated for all records matching the `filter`
    """
    set: BlogUpdateInput!

    """Restricts the mutation's impact to records matching the critera"""
    filter: BlogFilter

    """
    The maximum number of records in the collection permitted to be affected
    """
    atMost: Int! = 1

  ): BlogUpdateResponse!

  """Deletes zero or more records from the collection"""
  deleteFromBlogCollection(
    """Restricts the mutation's impact to records matching the critera"""
    filter: BlogFilter

    """
    The maximum number of records in the collection permitted to be affected
    """
    atMost: Int! = 1

  ): BlogDeleteResponse!

}

```




#### Insert

コレクションにレコードを追加するには、Mutation タイプの insertInto<Table>Collection フィールドを使用します。

#### Update

コレクション内のレコードを更新するには、Mutation タイプの update<Table>Collection フィールドを使用します。

set 引数は更新する値を表すキーと値のペアであり、filter は更新するレコードを制御し、atMost は影響を受けるレコードの最大数を制限します。
Mutationによって影響を受けるレコードの数が atMost パラメータを超えると、操作はエラーを返します。

#### Delete

コレクションからレコードを削除するには、Mutation タイプの deleteFrom<Table>Collection フィールドを使用します。

filter は削除するレコードを制御し、atMost は削除するレコードの最大数を制限します。

Mutationによって影響を受けるレコードの数が atMost パラメータを超える場合、操作はエラーを返します。

###Concepts

GraphQLのnodeIdという概念と、RelayというGraphQLクライアントフレームワークとの関係について。

#### nodeId

主キーを持つテーブルには自動的にnodeIdというフィールドが追加されます。
このnodeIdを使うと、Query型のnodeという入り口から、そのテーブルの他のデータもまとめて取ってこれます。
このnodeIdはキャッシュのキーとしても使えます。
Relayというフレームワークを使うときは、ちょっと設定が必要です。

* nodeIdフィールド: データベースのテーブルに主キーが定義されている場合、GraphQLスキーマではそのテーブルに対応する型に自動的にnodeId: ID!というフィールドが追加されます。
このnodeIdは、そのテーブルのレコードを一意に識別するためのグローバルIDです。

* nodeエントリポイント: Query型にはnode(id: ID!)というエントリポイントが用意されています。
このエントリポイントにnodeIdを渡すことで、そのnodeIdに対応するレコードの他のフィールドを取得できます。
これは、GraphQLのスキーマ全体で一貫した方法でデータにアクセスするための仕組みです。

* キャッシュキーとしての利用: nodeIdはグローバルに一意なIDなので、クライアント側でデータをキャッシュする際のキーとしても使用できます。
これにより、同じデータを何度もサーバーにリクエストするのを避けることができます。

* Relayのサポート: Relayは、Facebookが開発したGraphQLクライアントフレームワークです。
Relayは、GraphQLのスキーマに対していくつかの規約を定めており、その一つに「型はidという名前のIDフィールドを持つべき」というものがあります。



#### Relationships

グラフ内のコレクション間の関係は外部キーから派生します。

##### One-to-Many

1対多 テーブルBを参照するテーブルAの外部キーは、テーブルAからテーブルBへの1対多のリレーションを定義します。

##### Many-to-One

多対 1 テーブル A の外部キーがテーブル B を参照することで、テーブル B からテーブル A への多対 1 の関係が定義されます。

##### One-to-One

1 対 1 の関係は、テーブル A の外部キーがテーブル B を参照することによって定義されます。
テーブル A の外部キーを構成する列は一意です。

### Custom Scalars

PostgreSQL、JSON、GraphQL でサポートされている型の違いにより、pg_graphql は特別な処理を必要とする PostgreSQL 組み込みを処理するためにいくつかの新しいスカラー型を追加します。

#### JSON

pg_graphql は、json および jsonb データ型をカスタム スカラー名 JSON の文字列としてシリアル化します。



#### BigInt

PostgreSQLのbigint型とbigserial型は64ビット整数です。

一方、JSONは32ビット整数をサポートしています。

PostgreSQLのbigint値はJSONで許容される最小/最大値の範囲外である可能性があるため、GraphQLスキーマではBigIntsとして表現され、値は文字列としてシリアライズされます。

#### BigFloat

PostgreSQLの数値型は任意の精度の浮動小数点値をサポートしています。

JSONのfloatは64ビット精度に制限されています。

PostgreSQLのnumeric型はJSONで扱える以上の精度を必要とする場合があるため、GraphQLスキーマではnumeric型はBigFloatとして表現され、値は文字列としてシリアライズされます。




#### Opaque

PostgreSQLの型システムは拡張可能であり、全ての型が全ての操作を扱えるわけではありません。

これらを考慮し、pg_graphqlはスカラOpaque型を導入しました。

Opaque型はPostgreSQLのto_jsonメソッドを使用して値を直列化します。

これにより、処理をクライアントに委譲することで、複雑な型や未知の型をスキーマに含めることができます。



---

## Views

ビュー、マテリアライズド ビュー、外部テーブルは pg_graphql で公開できます。

### Primary Keys (Required)

GraphQLスキーマにエンティティを反映させるには主キーが必要です。

テーブルはSQL DDLで主キーを定義できますが、主キーはビュー、マテリアライズド・ビュー、外部テーブルでは使用できません。

これらのエンティティに対しては、コメントディレクティブで「偽の」主キーを設定することができます。

### Relationships

pg_graphqlは外部キーを検査することでエンティティ間の関係を特定します。

ビュー、マテリアライズドビュー、外部テーブルは外部キーをサポートしていません。

このため、構造体を使用したコメントディレクティブで関係を定義することもできます。

---

## Functions

pg_graphql によって関数を公開して、カスタム クエリまたはミューテーションを実行できるようにすることができます。

### Query vs Mutation

たとえば、2 つの数値を加算する関数は、クエリ タイプでフィールドとして使用できます。



### Supported Return Types

組み込みのGraphQL スカラー型 Int、Float、String、Boolean、およびカスタムスカラー型が関数の引数および戻り値型としてサポートされています。

テーブルまたはビューを返す関数型もサポートされています。

このような関数はNodeインターフェースを実装します。



### Default Arguments

デフォルト値のない引数は GraphQL スキーマで必須です。オプションにするには、デフォルト値が必要です。



### Limitations

以下の機能はまだサポートされていません。
これらの機能を使用する関数はAPIで公開されません。

- テーブルのタプル型を受け付ける関数
- オーバーロードされた関数
- 名前のない引数を持つ関数
- voidを返す関数
- 変数型関数
- 複合型の配列を受け付ける、または返す関数
- 列挙型または列挙型の配列を受け付ける、または返す関数

---

## Computed Fields

### Computed Values

PostgreSQL Builtin (Preferred)

計算値PostgreSQL組み込み（優先）PostgreSQLには、生成された列をテーブルに追加する組み込みメソッドがあります。

生成された列は、生成されていない列と同じように反映されます。

これは、計算が制限を満たす場合に、計算フィールドを追加するための推奨される方法です。

- 式は不変でなければならない
- 式は現在の行しか参照できない

### Extending Types with Functions

生成された列の要件を満たさない任意の計算については、関数を作成することで、テーブルに反映されたGraphQL型を拡張することができます。

### Computed Relationships

計算リレーションは、リレーションシップを表現するのに役立つ。

- 外部キーをサポートしていないエンティティ間の関係
 - 複雑すぎて外部キーで表現できない関係

単純な関係であっても、外部キーをサポートしていないエンティティ（外部データラッパーやビューなど）を含む場合は、コメントディレクティブを定義するのが最も簡単な解決策です。

完全な例はビューのドキュメントを参照してください。

ビューのように主キーをサポートしていないエンティティを計算リレーションシップで使用するには、コメントディレクティブを使用して主キーを定義しなければならないことに注意してください。

あるいは、リレーションシップが複雑な場合やPostgRESTとの互換性が必要な場合は、関数を返すセットを使用してリレーションシップを定義することもできます。

### To-One

### To-Many

---

## Security

pg_graphql は、組み込みの PostgreSQL ロールと行のセキュリティを完全に尊重します。

### Table/Column Visibility

### Row Visibility

---

## Configuration

コメント ディレクティブを使用して、SQL エンティティに追加の構成オプションを設定できます。

### Comment Directives

コメント ディレクティブは、SQL エンティティに関連付けられた構成のスニペットであり、それらのエンティティの動作を変更します。

---

## Guides

### Supabase

SupabaseのGraphQL APIは、pg_graphqlを使用してデータベースのスキーマから自動的に反映されます。
このAPIは以下の機能をサポートしています。

*   基本的なCRUD操作（作成、読み取り、更新、削除）
*   テーブル、ビュー、マテリアライズドビュー、外部テーブルのサポート
*   テーブル/ビュー間の任意に深い関係
*   ユーザー定義の計算フィールド
*   Postgresのセキュリティモデル（行レベルセキュリティ、ロール、権限など）

すべてのリクエストは1回のラウンドトリップで解決されるため、高速なレスポンスタイムと高いスループットが得られます。

**SupabaseのGraphQL APIへのアクセス**

*   プロジェクトのGraphQL APIエンドポイントは `https://<PROJECT_REF>.supabase.co/graphql/v1` です。`<PROJECT_REF>` はプロジェクトの参照IDです。
*   APIにアクセスするには、すべてのリクエストにプロジェクトのAPIキーをヘッダーとして提供する必要があります。
    *   例：`apiKey: <API_KEY>`
*   ユーザー認証のためには、 `Authorization` ヘッダーにJWT（JSON Web Token）を渡します。
    *   例：`Authorization: Bearer <JWT>`
    *   JWTの取得方法については、認証ドキュメントを参照してください。
*   Supabase Authは、行レベルセキュリティ（RLS）と連携し、ユーザーがアクセスできるテーブル/行を制御できます。
*   SupabaseでGraphQLを始める最も簡単な方法は、Supabase Studioに組み込まれているGraphQL IDE（GraphiQL）を使用することです。



#### GraphQLクライアント



Supabase GraphQL APIには、以下のクライアントを使用してアクセスできます：

*   **Supabase Studio:**
    *   Supabase StudioのGraphiQL IDEを使用して、GraphQLリクエストを送信できます。
    *   GraphiQLは、Studio内の「API Docs > GraphQL > GraphiQL」からアクセスできます。
    * 画面右のGraphiQLのタブを選択します。
    *   クエリエディタにクエリを入力し、緑色のアイコンをクリックしてリクエストを送信します。

例 クエリー

```query
{
  __schema{
    types{
      name
    }
  }
}

```

👆 入力後、緑ボタンを押してください。

    *   結果はエディタの右側の出力ディスプレイに表示されます。
    *   APIを視覚的に探索するには、ドキュメントアイコンを選択し、各タイプをナビゲートして、グラフへの接続方法を確認します。
    *   pg_graphqlは、プロジェクトのSQLスキーマの構造をGraphQL APIに反映します。
pg_graphql は、プロジェクトの SQL スキーマの構造を GraphQL API に反映します。
プロジェクトが新しく空の場合、基本的なイントロスペクション タイプを除いて、GraphQL API も空になります。

まずは、SQL またはテーブル エディターに移動してテーブルを作成します。

テーブルエディターの右下にあるDefinitionボタンを押すと、今選択肢ているテーブルのSQL文が見れます。

今作成済みのusersテーブルのSQL文を見てみます。

```sql
create table
  public.users (
    id uuid not null,
    name text not null,
    created_at timestamp without time zone not null default now(),
    constraint users_pkey primary key (id)
  ) tablespace pg_default;

```

※テーブルにデータを適当に入れます。

GraphiQL に戻り、GraphQL API のクエリとミューテーション タイプに新しいテーブルが反映されていることを確認します。

```query
{
  usersCollection(first:1) {
    edges{
      node{
        nodeId
        name
        created_at
      }
    }
  }
}

```

中央の緑ボタンを押して 👆 のqueryを実行すると👇結果が出力されます。

```result
{
  "data": {
    "usersCollection": {
      "edges": [
        {
          "node": {
            "name": "Elvera",
            "nodeId": "WyJwdWJsaWMiLCAidXNlcnMiLCAiMmY1MzYzYjktOGZjMy00ODJhLWRhNmItMmQ2MDVmYjc4MmYxIl0=",
            "created_at": "2025-03-02T14:50:02.998"
          }
        }
      ]
    }
  }
}

```

以上でSupabaseダッシュボードでの使い方は終了です。

※GraphQLとGraphiQLは違うものです。

GraphQLは、APIを構築するためのクエリ言語であり、GraphiQLは、GraphQL APIを操作するためのIDE（統合開発環境）です。

**GraphQL**

*   **クエリ言語:** GraphQLは、APIからデータを効率的に取得するためのクエリ言語です。クライアントが必要とするデータを正確に指定し、過剰なデータ転送を避けることができます.
*   **スキーマ:** GraphQL APIは、データ型とリレーションシップを記述するスキーマに基づいて構築されます.
*   **単一ラウンドトリップ:** SupabaseのGraphQL APIは、すべてのリクエストを単一のラウンドトリップで処理し、高速な応答時間と高いスループットを実現します.
*   **柔軟性:** クライアントは、必要なデータのみを要求できるため、柔軟なデータ取得が可能です.
*   **多様な操作:** GraphQLは、基本的なCRUD操作（Create/Read/Update/Delete）をサポートし、テーブル、ビュー、マテリアライズドビュー、外部テーブルなど、さまざまなデータソースに対応できます.
*   **認証:** ユーザー認証には、`Authorization`ヘッダーを使用し、JWT（JSON Web Token）を渡します.
*   **セキュリティ:** Postgresのセキュリティモデル（Row Level Security、Roles、Grantsなど）をサポートしています.

**GraphiQL**

*   **GraphQL IDE:** GraphiQLは、GraphQL APIを探索し、クエリを実行するためのインタラクティブなIDEです.
*   **Supabase Studio:** Supabaseでは、GraphiQLがSupabase Studioに組み込まれており、簡単に利用できます.
*   **クエリエディタ:** GraphiQLには、クエリを入力する中央のクエリエディタがあり、実行結果は右側の出力ディスプレイに表示されます.
*   **ドキュメント探索:** APIを視覚的に探索するためのドキュメントアイコンも提供され、各型の接続関係を確認できます.
*   **HTTPリクエスト:** GraphiQLは、HTTPリクエストを送信してGraphQL APIにアクセスすることもできます.
*  **外部IDE:**  外部のIDEからSupabase GraphQLに接続するためのHTMLスニペットも提供されており、`PROJECT_REF`と`API_KEY`を適切に設定することで、外部のGraphiQL環境を利用できます.

| 特徴 | GraphQL | GraphiQL |
| ---- | -------- | -------- |
| 種類 | クエリ言語 | GraphQL IDE |
| 目的 | APIから効率的にデータを取得する | GraphQL APIを探索し、クエリを実行する |
| インタラクション | クライアントからAPIを呼び出すための言語 | ユーザーがGraphQL APIを操作するためのツール |
| 主な機能 | クエリの定義、データの取得、更新、削除 | クエリの作成、実行、結果の表示、APIドキュメントの探索 |
| 利用場所 | サーバー、クライアントサイドで使用 | 主に開発環境で使用 |

簡単に言うと、**GraphQLはデータのやり取りを定義する言葉**であり、**GraphiQLはその言葉を使ってAPIと対話するためのツール**です。

---

*   **HTTPリクエスト（cURL）:**
    *   cURLを使用してGraphQL APIにアクセスするには、GraphQL APIのURLにPOSTリクエストを送信します。
    *   プロジェクトのAPIキーを `apiKey` ヘッダーとして渡します。
        *   例：
        ```bash
        curl -X POST https://<PROJECT_REF>.supabase.co/graphql/v1 \
        -H 'apiKey: <API_KEY>' \
        -H 'Content-Type: application/json' \
        --data-raw '{"query": "{ accountCollection(first: 1) { edges { node { id } } } }", "variables": {}}'
        ```
*   **supabase-js:**
    *   supabase-jsは、GraphQLツールに依存せず、すべてのフレームワークと統合できます。
*   **外部GraphiQL IDE:**
    *   外部のGraphiQL IDEを使用する場合は、次のHTMLスニペットを`supabase_graphiql.html`として保存し、ブラウザで開いてください。`<PROJECT_REF>`と`<API_KEY>`を適切な値に置き換えます。

```html
<html>
  <head>
    <title>GraphiQL</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/graphiql/2.4.7/graphiql.css" rel="stylesheet" />
  </head>
  <body style="margin: 0;">
    <div id="graphiql" style="height: 100vh;"></div>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script
      crossorigin
      src="https://cdnjs.cloudflare.com/ajax/libs/graphiql/2.4.7/graphiql.js"
    ></script>
    <script>
      ////////////////
      // EDIT BELOW //
      ////////////////
      const fetcher = GraphiQL.createFetcher({
        url: 'https://<PROJECT_REF>.supabase.co/graphql/v1',
        headers: {
          "apiKey": "<API_KEY>",
        }
      });
      ReactDOM.render(
        React.createElement(GraphiQL, { fetcher: fetcher }),
        document.getElementById('graphiql'),
      );
    </script>
  </body>
</html>
```

**スキーマとテーブルの表示設定**

pg_graphqlは、Postgresの `search_path` と権限システムを使用して、GraphQLスキーマに公開されるスキーマとエンティティを決定します。デフォルトでは、Supabaseでは、`public` スキーマのテーブル、ビュー、および関数は、匿名（`anon`）およびログイン済み（`authenticated`）ロールに対して表示されます。

*   **APIからテーブルを削除する:**
    *   GraphQL APIからテーブルを削除するには、関連するロールからそのテーブルに対する権限を取り消します。
    *   例えば、匿名ユーザーからテーブル`foo`を削除するには、次のコマンドを実行します。

```sql
revoke all on table public.foo from anon;

```

    *   `insert`、`update`、`delete`、`truncate`などのより詳細な権限を取り消すことで、GraphQL APIの個々のエントリポイントを削除することもできます。
        *   例えば、`update`権限を取り消すと、APIの`Mutation`タイプから`updateFooCollection`エントリポイントが削除されます。
*   **APIにスキーマを追加する:**
    *   GraphQL APIにスキーマを追加するには、2つのステップが必要です。
        1.  新しいスキーマをAPIの検索パスに追加します。
            *   例：新しい`app`スキーマを追加する場合は、検索パスにコンマ区切りで追加します。
        2.  公開するスキーマとエンティティ（テーブル/ビュー/関数）が、関連するロールからアクセス可能であることを確認します。
            *   例：`public`スキーマの権限を一致させるには、次のコマンドを実行します：

```sql
grant usage on schema app to anon, authenticated, service_role;
grant all privileges on all tables in schema app to anon, authenticated, service_role;
grant all privileges on all routines in schema app to anon, authenticated, service_role;
grant all privileges on all sequences in schema app to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on sequences to anon, authenticated, service_role;

```

    *   実際には、特に匿名APIユーザーに対して、より安全な権限を設定することが推奨されます。

**バージョン管理**

GraphQL APIのアップグレード時期を制御して、安定性を最大限に高めることができます。pg_graphqlのバージョンと利用可能な最新バージョンを確認するには、次のコマンドを実行します：

```sql
select * from pg_available_extensions where name = 'pg_graphql'

```

このコマンドは、次のようなテーブルを返します：

| name       | default_version | installed_version | comment          |
| -------- | ------------- | ------------- | -------------- |
| pg_graphql  | 1.2.0             | 1.1.0                | GraphQL support |

`default_version` はデータベースで利用可能な最新バージョンであり、`installed_version` はデータベースで現在有効になっているバージョンです。例のように2つのバージョンが異なる場合は、次のコマンドを実行してインストールされているバージョンをアップグレードできます：

```sql
drop extension pg_graphql; -- drop version 1.1.0
create extension pg_graphql; -- install default version 1.2.0

```

この操作で、GraphQL APIをダウンタイムなしでアップグレードできます。アップグレードを決定する際には、変更履歴でアップグレードされたバージョンの機能を確認できます。

新しいバージョンのpg_graphqlを本番インスタンスに更新する前に、必ず開発環境またはステージング環境で徹底的にテストしてください。pg_graphqlはSemVerに従うため、マイナーおよびパッチの更新ではAPIの下位互換性が比較的安全です。それでも、変更がプロジェクトのAPIの特定の部分（リクエスト/秒またはCPU負荷など）に悪影響を与えないことを確認することが重要です。

* 開発

SupabaseCLIを使用してローカルプロジェクトを開始すると、`supabasestart`の出力には、GraphQLAPIを直接呼び出すために必要な情報が表示されます。

また、SupabaseStudioのURLを使用して、組み込みのGraphiQLIDEにアクセスすることもできます。

```terminal
supabase start
...

Started supabase local development setup.
GraphQL URL: http://localhost:54321/graphql/v1 <-- GraphQL endpoint
DB URL: ...
Studio URL: http://localhost:54323 <-- Supabase Studio
Inbucket URL: ...
JWT secret: ...
anon key: eyJhbGciOiJIUzI1...<truncated> <-- API_KEY
service_role key: ...

```



### Usage with Apollo

React アプリケーションで型安全な GraphQL クエリを実行するために、Apollo と GraphQL コード ジェネレーターで pg_graphql を使用する方法を説明します。

#### Apollo Setup

Pre-requisites
前提条件

Get started with Apollo Client - Apollo GraphQL Docs
https://www.apollographql.com/docs/react/get-started

https://the-guild.dev/graphql/codegen/docs/getting-started/installation

#### Configuring GraphQL Code Generator

### Usage with Relay

pg_graphql は、Relay との互換性を確保するために、GraphQL グローバル オブジェクト識別仕様 (ノード インターフェイス) と GraphQL カーソル接続仕様を実装します。

#### Relay Setup

Pre-requisites
前提条件

Installing in a Project | Relay
https://relay.dev/docs/getting-started/installation-and-setup/
#### Configuring the Relay Compiler

#### Configuring your Relay Environment

#### Pagination

たとえば、Todo アプリで作業していて、ページ区切りを追加したいとします。これを行うには、@connection と @prependNode を使用できます。

---

## Example Schema

以下は、サンプル SQL スキーマが GraphQL スキーマに変換される方法を示す完全な例です。

---

## Installation

まず、cargo install --locked cargo-pgrx@versionを実行してpgrxをインストールする、
ここで、バージョンはpg_graphqlが使用するpgrxのバージョンと互換性がなければなりません。

---

## Contributing

---

## Changelog

----------------------------------------

GraphQL | Supabase Docs
https://supabase.com/docs/guides/graphql

# Supabase GraphQLのドキュメント

Postgres で自動生成された GraphQL API。

*   Supabase GraphQL APIは、pg\_graphqlを使用してデータベースのスキーマから自動的に生成されます。
*   基本的なCRUD操作（作成、読み取り、更新、削除）をサポートします。
*   テーブル、ビュー、マテリアライズドビュー、外部テーブルをサポートします。
*   テーブル/ビュー間の任意の深さのリレーションシップをサポートします。
*   ユーザー定義の計算フィールドをサポートします。
*   Postgresのセキュリティモデル（行レベルセキュリティ、ロール、権限など）をサポートします。
*   すべてのリクエストは単一のラウンドトリップで解決され、高速な応答時間と高いスループットを実現します。

## Quickstart

GraphQL APIエンドポイント

```
https://<PROJECT_REF>.supabase.co/graphql/v1

```

`<PROJECT_REF>` はプロジェクトの参照IDで、supabaseプロジェクトの設定から確認できます。

```
curl -X POST https://<PROJECT_REF>.supabase.co/graphql/v1 \
    -H 'apiKey: <API_KEY>' \
    -H 'Content-Type: application/json' \
    --data-raw '{"query": "{ accountCollection(first: 1) { edges { node { id } } } }", "variables": {}}'

```

*   APIにアクセスするには、すべてのリクエストにプロジェクトのAPIキーをヘッダーとして設定する必要があります。

*   ユーザー認証には、`Authorization` ヘッダーにJWTを渡します。
    *   JWTの取得方法については、認証ドキュメントを参照してください。
    *   Supabase Authは、行レベルセキュリティ（RLS）と連携して、ユーザーがテーブル/行にアクセスできるかどうかを制御します。

```terminal
    -H 'Authorization: Bearer <JWT>'

```

Password-based Auth | Supabase Docs
https://supabase.com/docs/guides/auth/passwords

Row Level Security | Supabase Docs
https://supabase.com/docs/guides/database/postgres/row-level-security

*   SupabaseでGraphQLを始める最も簡単な方法は、Supabase Studioに組み込まれている👇GraphQL IDE（GraphiQL）を使用することです。

GraphQL | Supabase Docs
https://supabase.com/docs/guides/graphql#supabase-studio



## Clients

GraphQL | Supabase Docs
https://supabase.com/docs/guides/graphql#supabase-studio

Supabase GraphQL APIにアクセスするためのクライアントについて、簡単に説明します。

もしあなたがGraphQLやSupabaseを使い始めたばかりなら、まずは Supabase Studioのガイドに従ってGraphQLを試す ことを強くお勧めします。

これは、Supabaseに組み込まれているGraphiQL IDEを使う方法で、手軽にGraphQLの操作を学べます。
もしあなたがGraphQLやSupabaseの使用に慣れている、またはアプリケーションを本格的に運用する準備ができているなら、以下の方法でAPIにアクセスできます:

supabase-js
これはJavaScriptのライブラリで、様々なGraphQLフレームワークと連携できます。

GraphiQL
これは外部のIDEで、Supabase GraphQL APIに接続してクエリを実行できます。
Supabase Studioにも組み込まれていますが、ローカル環境でも利用可能です。

HTTPクライアント
`cURL`などのHTTPクライアントを使って、直接APIにリクエストを送信できます。`cURL`を使った例は以下です:

```bash
curl -X POST https://<PROJECT_REF>.supabase.co/graphql/v1 \
-H 'apiKey: <API_KEY>' \
-H 'Content-Type: application/json' \
--data-raw '{"query": "{ accountCollection(first: 1) { edges { node { id } } } }", "variables": {}}'

```

この例では、`<PROJECT_REF>`はあなたのプロジェクトの参照ID、`<API_KEY>`はAPIキーに置き換えてください。

### Supabase Studio

API Docs > GraphQL > GraphiQL.

中央のクエリーエディターにクエリーを入力し、緑色のアイコンを使ってサーバーにリクエストを送信します。

結果はエディターの右側にある出力ディスプレイに表示されます。

APIを視覚的に調べるには、以下に示すdocsアイコンを選択し、各タイプをナビゲートしてグラフへの接続方法を確認してください。

pg_graphqlはプロジェクトのSQLスキーマの構造をGraphQL APIに反映します。

プロジェクトが新しく空の場合、基本的なイントロスペクション型を除いて、GraphQLAPIも空になります。

型やフィールド名をGraphQLの規約である、型はPascalCase、フィールドはcamelCaseに合わせたい場合は、pg_graphql inflectionガイドを参照してください。

Configuration & Customization | Supabase Docs
https://supabase.com/docs/guides/graphql/configuration#inflection



### HTTP Request

HTTP 経由で GraphQL API にアクセスするには、まずProject Reference (PROJECT_REF)と API Key を収集します。

GraphQL | Supabase Docs
https://supabase.com/docs/guides/graphql#project-reference-project_ref

### cURL

cURLを使用してSupabase GraphQL APIにアクセスするには、以下に示すGraphQL APIのURLにPOSTリクエストを送信し、PROJECT_REFを代入し、apiKeyヘッダーとしてプロジェクトのAPI_KEYを渡します。

```terminal
curl -X POST https://<PROJECT_REF>.supabase.co/graphql/v1 \
    -H 'apiKey: <API_KEY>' \
    -H 'Content-Type: application/json' \
    --data-raw '{"query": "{ accountCollection(first: 1) { edges { node { id } } } }", "variables": {}}'

```

```
{
  accountCollection(first: 1) {
    edges {
      node {
        id
      }
    }
  }
}

```

### supabase-js

JSエコシステムは複数の著名なGraphQLフレームワークをサポートしています。

supabase-jsはあなたのGraphQLツールに無関心であり、それらすべてと統合することができます。

統合例については、SupabaseAuthのサポートを含むRelayガイドをご覧ください。

With Apollo | Supabase Docs
https://supabase.com/docs/guides/graphql/with-apollo

With Relay | Supabase Docs
https://supabase.com/docs/guides/graphql/with-relay


### GraphiQL

GraphiQLのような外部IDEを使ってSupabase GraphQLに接続したい場合は、以下のHTMLスニペットをsupabase_graphiql.htmlとして保存し、ブラウザで開いてください。

EDIT BELOWのコメントの下に、PROJECT_REFとAPI_KEYを必ず代入してください。



## Schema & Table Visibility

pg_graphqlはPostgresのsearch_pathと権限システムを使用して、どのスキーマとエンティティがGraphQLスキーマで公開されるかを決定します。
Supabaseのデフォルトでは、パブリックスキーマのテーブル、ビュー、関数は、匿名（anon）ロールとログイン（認証）ロールに表示されます。



### Remove a Table from the API

GraphQL APIからテーブルを削除するには、関連するロールからそのテーブルの権限を取り消すことができます。
例えば、匿名ユーザーのAPIからテーブルfooを削除するには、次のように実行します。

```
revoke all on table public.foo from anon;

```

同様に、より詳細なinsert、update、delete、truncateパーミッションを使用してパーミッションを取り消し、GraphQL APIの個々のエントリポイントを削除することができます。
たとえば、updateパーミッションを取り消すと、APIのMutationタイプにあるupdateFooCollectionエントリーポイントが削除されます。



### Add a Schema to the API

スキーマをGraphQL APIに追加するのは2段階のプロセスです。

まず、新しいスキーマをAPIの検索パスに追加する必要があります。
以下の例では、新しいアプリのスキーマをカンマ区切りで追加しています。

次に、公開するスキーマとエンティティ（テーブル/ビュー/関数）が、関連するロールによってアクセス可能であることを確認してください。 例えば、パブリック・スキーマの権限と一致するようにします。

実際には、特に匿名のAPIユーザーに対しては、より安全なパーミッションのセットを好む可能性が高いことに注意してください。

## Version Management

安定性を最大化するために、GraphQL APIをアップグレードするタイミングは自分でコントロールできます。
現在使用しているpg_graphqlのバージョンと、利用可能な最高アップグレード・バージョンを確認するには、以下を実行してください。

```
select * from pg_available_extensions where name = 'pg_graphql'

```

たとえば、次のテーブルが返されます。

| name | default_version | installed_version | comment |
|---|---|---|---|
| pg_graphql | 1.2.0 | 1.1.0 | GraphQL support |


default_versionはデータベースで使用可能な最も高いバージョンです。

installed_versionは、データベースで現在有効になっているバージョンです。

この2つが異なる場合、例のように次のように実行することでインストールされているバージョンをアップグレードすることができます。

```
drop extension pg_graphql;   -- drop version 1.1.0
create extension pg_graphql; -- install default version 1.2.0

```

アップグレードを決定する場合、変更履歴でアップグレードされたバージョンの機能を確認することができます。

pg_graphqlの新バージョンを本番インスタンスで更新する前に、必ず開発インスタンスまたはステージングインスタンスで広範囲にテストしてください。

pg_graphqlはSemVerに従っており、マイナー更新やパッチ更新におけるAPIの後方互換性は比較的安全です。

たとえそうであっても、変更がプロジェクトのAPIの仕様、例えばrequests/secやCPU負荷などに悪影響を与えないことを確認することが重要です。

## Local Development

Supabase CLIを通してローカルプロジェクトを開始する場合、supabase startの出力はGraphQL APIを直接呼び出すために必要な情報を提供します。
また、Supabase StudioのURLを使用して、組み込みのGraphiQL IDEにアクセスすることもできます。

```
supabase status
...

     GraphQL URL: http://localhost:54321/graphql/v1  <-- GraphQL endpoint
          DB URL: ...
      Studio URL: http://localhost:54323             <-- Supabase Studio
    Inbucket URL: ...
      JWT secret: ...
        anon key: eyJhbGciOiJIUzI1...<truncated>     <-- API_KEY
service_role key: ...

```

## Term Reference

Project Reference (PROJECT_REF)
API Key (API_KEY)





----------------------------------------

# GraphQL ツール

 Apollo Server や GraphQL Yoga などの一般的な GraphQL サーバーライブラリを使用してアクセス。

## Apollo

Apollo での接続
以前書いた記事の中で言及

https://qiita.com/masakinihirota/items/f12d16c31e6775f26b84


