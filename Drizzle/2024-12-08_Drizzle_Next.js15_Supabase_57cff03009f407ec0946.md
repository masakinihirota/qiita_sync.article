<!--
title:   はじめる Drizzle (Next.js 15 と Supabase 最小限の開発環境構築 Drizzleは0.36からRLSに対応しました。)
tags:    Drizzle,Next.js15,Supabase
id:      57cff03009f407ec0946
private: false
-->

DrizzleがRLSに対応したというので使ってみることにしました。

# 事前に知っておくべきこと

Drizzleは生成すると、カラム名はキャメルケースを使用しています。
	firstName

Supabaseはカラム名はスネークケースを使用しています。
	first_name

※PostgreSQLのカラム名は、スネークケースを使うのが一般的です。
ですので Drizzle を利用する時に、テーブルを作成する時などは、スネークケースに変換する必要があります。



----------------------------------------

# Drizzle ORM

ORMとは、Object-Relational Mapping の略で、オブジェクト指向プログラミング言語とリレーショナルデータベースを結びつけるための技術です。

DrizzleはそのORMの一つで、TypeScriptで書かれたORMです。

Supabaseもマイグレーションファイルは生成できますが、TypeScriptでスキーマを書くことはできません。そこでDrizzleを使うことで、TypeScriptを使ってスキーマを書くことができます。



# 前提条件

この記事は、Next.js 15 とローカルの Supabase で Drizzle を用いて**データベース設定の接続まで**を確認します。

AIサイトのv0で簡単に環境構築が出来るようになりましたが、結局は仕組みを、コードを知らなければ、どこから手を付けていいかわからないので中身の勉強が必要です。
AIの力を使うのは2回目からでしょう。
というわけで自力でインストールしてみます。

一番の勉強は公式ドキュメントを読むことです。

# リポジトリ
masakinihirota/drizzle_Nextjs_Supabase_app

https://github.com/masakinihirota/drizzle_Nextjs_Supabase_app

Supabaseの設定は👇️これを御覧ください。

## Supabaseの環境構築

Supabase ローカル開発環境 ＋ サーバー運用 2023年9月 (with Next.js 13 App router) #Docker - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

を御覧ください。

Supabase の CLIはインストール済みとします。

## フォルダ構成 (主にDBに関連する最小構成)

```
src
├── app
│   ├── layout.tsx
│   └── page.tsx    # ページコンポーネント
└── db
    └── schema.ts   # Drizzleのスキーマファイル

supabase
├── migrations
│   ├── meta
│   │   └── 0000_snapshot.json    # Drizzleから生成されたスナップショットファイル
│   └── 0000_tricky_paibok.sql    # Drizzleから生成されたマイグレーションファイル
└── config.toml                  # Supabaseの設定ファイル

```

※Drizzle ORMはスキーマファイルからマイグレーションファイルを生成し、そのマイグレーションファイルをSupabase(データベース)に適用することで、Supabase(データベース)の構造を管理します。

## Supabaseのサーバーとローカル

- **ローカルの Supabase**: PCでの開発用 Supabase
- **サーバーの Supabase**: 実運用のネット上の Supabase

通常の開発では、この2つの Supabase を利用して、ローカルで開発環境を構築し、テストを行います。

動作確認が取れたら ローカルの設定をサーバーのSupabaseに写し、サーバーで実運用を行います。

ローカルのSupabaseからサーバーのSupabaseに設定を写す方法は、SupabaseのCLIを使って PUSHコマンドなどを利用します。 詳しくは👇️を御覧ください。



----------------------------------------

# Next.js 15 Supabase Drizzle の最小限の開発環境構築

## Next.jsをインストールします。

```terminal
npx create-next-app@latest [drizzle_Nextjs_Supabase_app]

# オプション選択
# TypeScriptを使用する
# ESLintを使用する
# Tailwind CSSを使用する
# `src/`ディレクトリを使用する
# App Routerを使用する
# Turbopackを使用する
# カスタマイズするデフォルトのインポートエイリアスを使用する
# エイリアスは @/*

cd [drizzle_Nextjs_Supabase_app]

```

必要な依存関係をインストールします。

Drizzle ORM - PostgreSQL

https://orm.drizzle.team/docs/get-started/supabase-new

```terminal
npm i drizzle-orm postgres dotenv
npm i -D drizzle-kit tsx

```

必要なら ` --legacy-peer-deps` オプションをつけます。



## Supabaseの初期設定

```terminal
supabase init

supabase start

supabase status

```

※ Supabase起動時のエラーの対処

```
supabase_vector_drizzle_2 container is not ready: unhealthy

```

というエラーが出たら。

```supabase\config.toml
[analytics]
enabled = false      <<falseに設定します。
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

```

※Windows でのローカルのSupabase起動時に確認しました。



## .env.local

※KEYはSupabaseを立ち上げた時に表示されます。

```terminal
touch .env.local

```

```.env.local
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ローカルのSupabase環境変数
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ey*****"

# Drizzleの環境変数
# ローカルのSupabaseへの接続用
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# サーバーのSupabaseへの接続用
# DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE].supabase.co:5432/postgres

```

https://supabase.com/dashboard/project/_/settings/database

サーバーのSupabaseの場合、👆️ここから、画面上部の Connectのリンクを開いて、URIが取得できます。



<details><summary>supabase-js vs drizzle-orm</summary>

supabase-js vs drizzle-orm : r/Supabase

https://www.reddit.com/r/Supabase/comments/19biicz/supaabsejs_vs_drizzleorm/?rdt=52841

最終的には、Supabase JS と Drizzle ORM の選択はプロジェクトの要件に依存します。迅速かつ統合されたソリューションを必要とする場合は Supabase JS が適していますが、複雑なクエリやマイグレーション機能を必要とする場合は Drizzle ORM の方が適しています。


※ここでは、Next.jsからDB(Supabaseのデータ)にアクセスする方法は2通りつくれます。

1. Supabaseのクライアントを作って、そのクライアントからアクセスする方法
2. Drizzle ORMを使ってSupabaseのDBにアクセスする方法

他にもPrismaを使ったり 他のORMツールを採用したり、SQL文を直に書く方法もあります。・・・が今回はこの2つ (Supabaseクライアント、Drizzle)だけです。

</details>



## drizzle.config.ts

これは Drizzle の設定ファイルです。

Supabase用に合わせたのDrizzleの環境設定

```
touch drizzle.config.ts

```



### スキーマファイルが1ファイルの場合の設定例

```drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  // スキーマファイルのパス
  schema: "./src/db/schema.ts",
  // Supabase へのマイグレーションファイルを出力するディレクトリ
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```



### スキーマファイルを複数使用する場合の設定例

```drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  // フォルダ内にあるスキーマファイルを読み込む
  schema: "./src/db/schema",
  // Supabase へのマイグレーションファイルを出力するディレクトリ
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```

* フォルダ構造

schemaフォルダ内に複数のスキーマファイルを配置します。

```
src
├── app
└── db
    └── schema
        ├── products.ts
        └── users.ts

```



## Connect (Supabaseローカル開発環境には不要)

接続プーラーを使用してデータベースに接続します。

データベース設定で、Use connection poolerがチェックされていることを確認し、URIをコピーしてDATABASE_URL環境変数として保存します。

Supabaseダッシュボードでの表示場所

https://supabase.com/dashboard/project/znazduolmsxbqigecsiz/settings/database

👇️

<details><summary>どのプーリング・モードを使うべきか？(公式情報)</summary>

Connection parameters

ドキュメント
コネクションプーラは（Postgresの外部の）システムであり、クライアントがリクエストする度にコネクションを割り当てることでPostgresのコネクションを管理します。

各プーリングモードでは接続の扱い方が異なります。

トランザクションモード
このモードはサーバーレス環境から接続する場合に推奨されます。接続はトランザクションの間、クライアントに割り当てられます。同じクライアントからの連続した2つのトランザクションは、2つの異なる接続で実行される可能性があります。プリペアドステートメントなどのセッションベースのPostgresの機能は、このオプションでは使用できません。

セッションモード
このモードはデータベースに直接接続するのと似ています。このモードではプリペアドステートメントを完全にサポートしています。新しいクライアントが接続すると、接続が切断されるまでそのクライアントに接続が割り当てられます。接続はクライアントが切断するまで保持されるため、プーラの接続制限に遭遇する可能性があります。

セッション・モードとトランザクション・モードの同時使用
アプリケーションでは、セッション・モード接続文字列（ポート 5432）とトランザクション・モード接続文字列（ポート 6543）を使用できます。

※設定画面でモード選択が出来ます。

</details>



### Supabase サーバー設定の場合

※ Supabaseをローカルではなく、サーバーを直接使う場合の設定

Supabaseのサーバー側のダッシュボードを開きます。

左サイドメニュー
Project Settings > CONFIGURATION > Database

右画面に移り

Database Settings >  Connection string > URIのタブを選択

```(サーバーの接続設定)
postgresql://postgres.******:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres

```

※東京サーバー

※サーバーの設定では、パスワード・プレースホルダを、実際のデータベース・パスワードに置き換えることを忘れないでください。



----------------------------------------

# スキーマファイルの作成

※作るアプリの設計をして設計書を作っておきます。
(Webアプリは、AI時代では設計書を作るのに労力をかけるのが9割、後は流れ作業です。AIにどんどん力を借りましょう。)

設計書を見てテーブルのコードをtypescriptで作成します。
設計書をAIに読み込ませて、提案してもらいます。

## schema.ts

```src\db\schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

```



----------------------------------------

# Drizzleのマイグレーション 基本操作

## 基本コマンド

```terminal
npx drizzle-kit generate
npx drizzle-kit push
npx drizzle-kit migrate
npx drizzle-kit pull

```

※`npx drizzle-kit pull` は `npx drizzle-kit introspect` のエイリアスです。



## 基本コマンドの解説

1. **`npx drizzle-kit generate`**
   データベースのスキーマからコードを生成します。スキーマに基づいて、必要なモデルやマイグレーションファイルを自動的に作成します。

2. **`npx drizzle-kit push`**
   生成したコードやマイグレーションをデータベースに適用するためのコマンドです。これを実行すると、データベースが最新の状態に更新されます。
   カラムが削除されてしまう場合警告が出ます。

3. **`npx drizzle-kit migrate`**
   データベースのマイグレーションを実行します。これにより、変更されたスキーマがデータベースに適用され、必要なテーブルやカラムが追加されます。

4. **`npx drizzle-kit pull`**
   データベースの現在の状態をスキーマとして取得します。これを実行すると、データベースの構造を反映したコードが生成されます。

※重要： 自分で `.ts` ファイルにデータベースの設定を書いた後、`drizzle-kit generate` コマンドを実行してマイグレーションファイルを作成します。

その後、作成したマイグレーションファイルを実際の Supabase に適用するのが `drizzle-kit push` コマンドです。



ここまでが下準備です。

----------------------------------------

# tsコードを、DBに反映させる手順

※最初に、ローカルのSupabaseのダッシュボードを開いておきます。

## tsコードからマイグレーションファイルの生成

schema.tsファイルに定義したスキーマを マイグレーションファイルに出力するコマンドを実行します。

```terminal
npx drizzle-kit generate

```

<details><summary>Drizzle経由で生成されたコード</summary>

`supabase\migrations\0000_tricky_paibok.sql`

に出力されました。

```0000_tricky_paibok.sql
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256)
);

```

※純粋なSQL文が出力されました。

</details>

* マイグレーションファイルのルール

Drizzle 連番と自動生成された名前
Supabase タイムスタンプ ユーザーが入力した名前

* マイグレーションファイルを新しく作る方法

```terminal
# Drizzleの場合
npx drizzle-kit generate

# Supabaseの場合
supabase migration new [Name]

```

## マイグレーションファイルをDBに反映

生成したマイグレーションファイルからSupabase DBに反映します。

```terminal
npx drizzle-kit push

```

※設定ファルがローカルのSupabaseに向いているので、ローカルのSupabaseに反映されます。

Supabaseのダッシュボードの Table Editorで正常に反映されている確認します。

※カラムを増やしたり、減らしたり、このコマンド2つだけでDBに直接設定できることが確認できたら終了です。


後は、テーブルにデータを入れたり、シードデータを設定したり、RLSを設定したりします。

それらは、Drizzle公式マニュアルをご覧ください。


# drizzle-kit コマンド一覧

`npx drizzle-kit` コマンドは、Drizzle ORM のためのツールキットです。以下は各コマンドの説明です。

ヘルプコマンド

`npx drizzle-kit -h`

```terminal
generate: マイグレーションファイルを生成します。
migrate: マイグレーションを実行します。
push: スキーマの変更を直接データベースに適用します。
studio: Drizzle Studio を起動します。
drop: 指定したマイグレーションファイルを削除して、連動しているスナップショットも更新します。


check: マイグレーションの状態を確認します。

introspect: データベースのスキーマを調査します。

up: スナップショットを新しいバージョンにアップグレードするために使用されます。

```

# 終わりに

DBに接続できて、
テーブルが作成できたら、
あとは、Next.js 15とSupabaseとDrizzle使って自由に開発が出来るようになります。



----------------------------------------

# 続き(未完成)
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中
以下、執筆中

Drizzleクライアントの作成
Drizzleクライアントを使ってのCRUD

todo
RLSの設定
CRUD



👇️ Supabaseのドキュメント側から見るDrizzleの利用方法

# SupabaseのQuickStart

Drizzle | Supabase ドキュメント

https://supabase.com/docs/guides/database/drizzle

## Install

```terminal
npm i drizzle-orm postgres
npm i -D drizzle-kit

```

## Create your models

```schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

```

## Connect

接続プーラーを使用してデータベースに接続します。

https://supabase.com/dashboard/project/_/settings/database

サーバーのSupabaseの場合、👆️ここから、画面上部の Connectのリンクを開いて、URIが取得できます。

データベース設定で、Use connection pooler がチェックされていることを確認し、URIをコピーしてDATABASE_URL環境変数として保存します。

パスワード・プレースホルダを実際のデータベース・パスワードに置き換えることを忘れないでください。


## Drizzleのクライアントの作成。

クライアントを作成すると、そこからDrizzle経由でDBにアクセスできるようになります。

```db.ts
import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

// 「トランザクション」プールモードではプリフェッチはサポートされていないため、プリフェッチを無効にします。
export const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client);

```



### コードの各部分の説明

1. 環境変数の読み込み:

```javascript
   import 'dotenv/config'

```

   - `dotenv`ライブラリを使って、環境変数を読み込みます。これにより、`.env`ファイルに定義された環境変数（例えば、`DATABASE_URL`）を使用できるようになります。



2. Drizzle ORMのインポート:

```javascript
   import { drizzle } from 'drizzle-orm/postgres-js'
   import postgres from 'postgres'

```

   - `drizzle`はDrizzle ORMのメインのエクスポートで、PostgreSQL用のクライアントをインポートします。



3. 接続文字列の取得:

```javascript
   const connectionString = process.env.DATABASE_URL

```

   - 環境変数からデータベースの接続文字列を取得します。この文字列には、データベースの場所、ユーザー名、パスワードなどの情報が含まれています。



4. データベースクライアントの作成:

```javascript
   export const client = postgres(connectionString, { prepare: false })

```

5. Drizzle ORMのインスタンス作成:

```javascript
   export const db = drizzle(client);

```

   - 作成したクライアントを使ってDrizzle ORMのインスタンスを作成します。この`db`を使用して、データベースに対する操作（クエリの実行など）を行います。



### 使い方の例

このコードを使ってデータベースに接続した後、以下のようにデータベース操作を行うことができます。

#### 1. データの挿入

```javascript
import { users } from './schema'; // 定義したモデルをインポート

async function addUser(fullName, phone) {
    await db.insert(users).values({ fullName, phone });
}

```



#### 2. データの取得

```javascript
async function getUsers() {
    const allUsers = await db.select().from(users);
    console.log(allUsers);
}

```



#### 3. データの更新

```javascript
async function updateUser(userId, newFullName) {
    await db.update(users).set({ fullName: newFullName }).where(users.id.equals(userId));
}

```



#### 4. データの削除

```javascript
async function deleteUser(userId) {
    await db.delete(users).where(users.id.equals(userId));
}

```

- 非同期処理の管理: 上記の関数はすべて非同期関数であるため、呼び出す際は`await`を使用するか、`.then()`で処理する必要があります。

