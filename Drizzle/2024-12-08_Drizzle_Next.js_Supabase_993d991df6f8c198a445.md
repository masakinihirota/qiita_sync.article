<!--
title:   Drizzle ドキュメント with Supabase Next.js
tags:    Drizzle,Next.js,Supabase
id:      993d991df6f8c198a445
private: false
-->
Drizzleバージョン 0.38
現在 2024年12月10日

Drizzle は、軽量で高速な TypeScript ORM です。

Drizzle 公式ドキュメント

Drizzle ORM - Query

https://orm.drizzle.team/docs/rqb

Next.js Supabase Drizzleを利用します。
Supabaseはローカルで開発とテストを、サーバーで運用をします。
DrizzleはローカルのSupabase DBを、TypeScriptのコードで管理します。

自分はこのページをNotebookLMに登録して使用しています。

NotebookLM

https://notebooklm.google.com/



# Drizzleの肝

👇この図がDrizzleで一番重要な部分です、後はこれの関連でしかありません。

* Drizzleのテーブル形式

![table.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/182e7115-7705-882a-164a-070fe7c7f079.png)


```tsx
export const [table name in typescript] = pgTable { [table name in database], {

	[column name in typescript] : [database type] ( [db column name] )
}

```

このコードの意味を理解することが、Drizzle理解の一番の早道だと思います。



----------------------------------------

# 重要コマンド

```terminal
npx drizzle-kit studio

npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push

```

## 主なコマンド

*   `npx drizzle-kit studio`：軽量な Drizzle Studio を起動します。データベースの構造とデータを視覚的に操作できます。

*   `npx drizzle-kit generate`：TypeScript の Drizzle スキーマに基づいて SQL マイグレーションファイルを生成します。
*   `npx drizzle-kit migrate`：`drizzle-kit generate` で生成された SQL マイグレーションファイルをデータベースに適用します。履歴が残り、チーム開発に向いています。
*   `npx drizzle-kit push`：TypeScript の Drizzle スキーマを直接データベースに適用します。テーブルのカラムを書き換えたりなど、個人開発の初期の頃はこのコマンドの方が良いです。



## `npx drizzle-kit migrate` と `npx drizzle-kit push` の違い

どちらもデータベースのスキーマを管理するためのコマンドですが、動作が異なります。

| コマンド | 動作 | 適した状況 |
| ------- | ---- | --------- |
| `npx drizzle-kit migrate` | SQL マイグレーションファイルをデータベースに適用 | コードベースファースト、マイグレーションファイルのバージョン管理 |
| `npx drizzle-kit push` | TypeScript のスキーマを直接データベースに適用 | ラピッドプロトタイピング、サーバーレスデータベース |




### 各コマンドの解説

#### `drizzle-kit studio`

*   **Drizzle Studio** は、データベースの構造とデータを視覚的に確認・操作できる GUI ツールです。
*   ローカル環境での開発に最適化されています。
*   PlanetScale, Cloudflare, Vercel Postgres のようなサーバーレスデータベースでは、各ベンダーの管理パネルで直接 Drizzle Studio を利用できます。



#### `drizzle-kit generate`

*   **SQL マイグレーションファイル**は、データベースのスキーマ（構造）を変更するための指示を記述したファイルです。
*   `drizzle-kit generate` コマンドを実行すると、TypeScript の Drizzle スキーマに基づいて SQL マイグレーションファイルが生成されます。
*   生成されたマイグレーションファイルは、`drizzle-kit migrate` コマンドでデータベースに適用したり、バージョン管理システムで管理したりすることができます。



#### `drizzle-kit migrate`

*   `drizzle-kit generate` で生成された SQL マイグレーションファイルをデータベースに適用します。
*   適用されたマイグレーションの履歴がデータベースに記録されるため、データベースのスキーマの変更履歴を管理することができます。



#### `drizzle-kit push`

*   TypeScript の Drizzle スキーマを直接データベースに適用します。
*   SQL マイグレーションファイルを作成する必要がなく、迅速にスキーマの変更をデータベースに反映させることができます。
*   開発の初期段階で試行錯誤を繰り返す **ラピッドプロトタイピング** に適しています。
*   ただし、適用されたマイグレーションの履歴は記録されません。



----------------------------------------

# 用語

* Views ビュー

ビューは、SQLクエリの結果を仮想的なテーブルとして扱うものです。
実際のデータは持っていません。

ビューは常に最新のデータを反映します。
元のテーブルが更新されると、ビューも自動的にその変更を反映します。
データを実際に保存しないため、クエリが実行されるたびに元のテーブルに対してクエリを実行する必要があり、大量のデータに対してはパフォーマンスが低下することがあります。



* MaterializedViews マテリアライズドビュー

ビューの結果を実際にデータベースに保存したものです。
これにより、特定のクエリの結果をキャッシュしておくことができます。
マテリアライズドビューは、定期的にまたは手動で更新する必要があります。
元のテーブルが更新されても、マテリアライズドビューは自動的には更新されません。
データが保存されているため、クエリの実行が速くなります。
とくに重いクエリを頻繁に実行する場合に有効です。


* DBのスキーマ

一般的にはデータの構造や配置を示す重要な概念です。

DBのスキーマとは、データベース内のデータの構造や配置を定義するものです。
一般的には、テーブル、カラム、データ型、制約などの情報が含まれます。スキーマは、データベースの設計や管理において重要な役割を果たします。

他のデータベース管理システムでは、スキーマはデータ型やその構造を指すこともあります。

NoSQLデータベースでは、スキーマレスの特性があり、データの構造が事前に定義されていません。



* PostgreSQLのスキーマ

データベースオブジェクトを論理的にグループ化するための仕組みです。
スキーマは名前空間のような役割を果たし、同じ名前のテーブルが異なるスキーマに存在することを可能にします。

DrizzleORMでは、pgSchema関数を使用してスキーマを作成し、そのスキーマ内にテーブルを定義できます。

`drizzle-orm/supabase` をインポートすると、Supabase で定義済みのスキーマ (auth、realtime など) やテーブル (authUsers、realtimeMessages など) を利用できます。

これらのスキーマやテーブルは Drizzle Kit によって既存のものとして扱われ、マイグレーションなどの操作対象外となります。

対象外の理由
Supabase が提供する これらのスキーマとテーブルは、Supabase のサービスにとって 中核的な機能 を提供するものであり、ユーザーが不用意に変更を加えることを防ぐためです。



* サーバーレスデータベース

インフラ 管理を不要にし、自動スケーリングやコスト効率、高可用性を提供するデータベースサービスです。



* シーケンス（Sequences）

シーケンスは、一意の番号を自動的に生成するためのオブジェクトで、主にプライマリキーやユニークな値を持つ必要があるカラムに利用されます。

自動インクリメント機能
シーケンスを使うことで、新しいレコードが挿入されるたびに自動的に番号を生成し、プライマリキーとして設定できます。
これにより、手動で番号を管理する手間を省けます。

一意性の保証
シーケンスによって生成される番号は常に一意であるため、重複することがありません。これがプライマリキーとしての要件を満たすために重要です。

シーケンス
一意の番号を自動生成するためのデータベースオブジェクト。



* ダイアレクト

特定のプログラミング言語やデータベースシステ
ムにおける、文法や構文の違いを指します。DBそれぞれ特有の方言のようなものです。

* ヘッドレス

通常のフレームワークやライブラリが提供するユーザーインターフェイス（UI）や特定の構造に依存せず、バックエンドの機能を独立して利用できることを指します。



* ポリシー

データベースのテーブルに対するアクセス制御を細かく設定します。 簡単に言うと、誰がどんな操作をできるかをルールで決めます。



* マイグレーションファイル

データベースのスキーマ（構造）を変更するための指示を記述したファイルです。



* マップする

データベースにおける「マッピング」データの対応付け: データベースのフィールドやテーブルとプログラムのデータ構造（オブジェクトやクラスなど）を対応させることを指します。ORM（Object-Relational Mapping）などの技術でよく使われます。データベースのカラムとオブジェクトのプロパティを関連付けること。



* ラウンドトリップコスト

クライアントからサーバーへリクエストを送信し、サーバーから応答を受け取るまでにかかる時間やリソースのコストを指します。このコストは、ネットワーク遅延やデータベースへのクエリ実行時間など、通信に伴う全体の処理時間に影響します。



* 列挙型（Enums）

固定された値のセットを定義するデータ型です。
データベースのカラムに格納できる値を制限したい場合に便利です。
例えば、曜日のカラムを作成する場合、"月曜日"、"火曜日"、...、"日曜日" のいずれかの値しか格納できないようにしたい場合、列挙型を使用します。
Drizzle ORM では、pgEnum 関数を使用して列挙型を定義できます。



----------------------------------------

# DrizzleORMとSupabaseのマイグレーションファイル

DrizzleORMで作成されるマイグレーションファイルは、Supabaseのマイグレーションファイルと同等のものです。

具体的には、純粋なSQL文が出力され、それが「マイグレーションファイル」として保存されます。



## 使用方法

SupabaseにDrizzle ORMを使用する際は、以下の手順が一般的です。

1. SQL文の出力
コードからDrizzle ORMを使ってSQL文を出力します。

2. マイグレーションファイルの保存
Drizzle ORMで生成するマイグレーションファイルの出力先を、Supabaseのマイグレーションファイルの保存場所に指定します。



### SupabaseとDrizzleのルール：カラム名

- Drizzle
スネークケースを利用

- Supabase
キャメルケースを利用

DrizzleをORMとして使用する場合、Server Actionsを利用することが推奨されます。



----------------------------------------

# Supabaseで使うDB ORM

## 候補

Drizzle
supabase-js
Prisma
SQL文

### supabase-js

テーブルが1,2個ならsupabase-js
データベースの型の生成はCLIで手動生成
Supabaseで使うならネイティブ
※トランザクションがない、rpcを使う必要がある


### Drizzle

テーブルが10-99(ちょっと大きいアプリ)ならDrizzle
SupabaseのGUIダッシュボードで2桁個のテーブルを扱うのは大変です。

Drizzleのクエリは、Prismaライクな書き方とSQLライクな書き方の両方をサポートしています。
SQLで書くのに慣れている人用です。

RLSに最近対応しました。

### Prisma

多くの人数が使っているのが良い人Prisma
独自のDSLを覚える必要があります。

### SQL文

SLQがベタ書きしたい、で良い人なら、ORM自体を使いません。

後は、個人の好みになります。

## 外部ツール

pgAdmin 4
DBeaver
等を使います。



----------------------------------------

# Drizzle と Drizzle Kit とは？

Drizzleは基本的なデータベース管理ツールです。
DrizzleKitはその機能を拡張するための設定ツールです。

## Drizzle

* Drizzleは、JavaScriptやTypeScriptを用いたデータベースマイグレーションやスキーマ管理のためのライブラリです。

* 主な機能データベースのスキーマを定義し、マイグレーションを行うための基本的なツールを提供します。

* 使用目的主にデータベースの構造を管理し、変更を追跡するために使用されます。



## DrizzleKit

* DrizzleKitは、Drizzleの機能を拡張するためのツールです。

* 主な機能TypeScriptやJavaScriptでの設定ファイルを使って、接続情報やマイグレーションの詳細な設定を行うことができます。

* 使用目的Drizzleの機能をより柔軟に利用するための設定やカスタマイズを行うために使用されます。



----------------------------------------
----------------------------------------

# MEET DRIZZLE

## Get Started

※このページでSupabaseを選択します。

## Get Started with Drizzle and Supabase

## Basic file structure 基本的なファイル構造

Drizzle ORM - PostgreSQL

https://orm.drizzle.team/docs/get-started/supabase-new

これがプロジェクトの基本的なファイル構成です。

src/dbフォルダ
	schema.ts

drizzleフォルダ
	SQL migrationファイル
	スナップショット
があります。

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 │   ├ 📂 db
 │   │  └ 📜 schema.ts
 │   └ 📜 index.ts
 ├ 📜 .env
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

```

* 1 インストール

```terminal
npm i drizzle-orm postgres dotenv
npm i -D drizzle-kit tsx

```



* 2 環境変数

.envプロジェクトのルート (+Supabase)

```.env
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabaseのクライアント作成用
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="*****"

# DrizzleのローカルのSupabaseへの接続用
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

```

※SUPABASE_ANON_KEYは公開可能ですが、KEYの設定は必要最低限にします。



* 3 テーブルを作成する

src/db ディレクトリ内に
schema.ts
ファイルを作成しテーブルを宣言します。

※ここにコードでテーブルを設計し、
DrizzleKitを使うことでSupabaseでも利用できるマイグレーションファイルが作成できます。
(そのためには、Drizzleの設定ファイルを作成するとき、out設定の出力先をSupabaseのマイグレーションフォルダに指定する必要があります。)

```src/db/schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

```

※👆非常にシンプルなテーブルのコードです。



* 4 Drizzle設定ファイルの設定

Drizzle config ファイル(drizzle.config.ts) は Drizzle Kitで使用される設定ファイルで、
	データベース接続、
	マイグレーションフォルダー、
	スキーマ ファイル
に関するすべての情報を設定します。

drizzle.config.tsはプロジェクトのルートにファイルを作成します。

```drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  // Supabase へのマイグレーションファイルを出力するディレクトリ
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```

※詳細は「MIGRATIONS > drizzle.config.ts」の項目をご覧ください



* 5 データベースへの変更の適用

`drizzle-kit push` コマンドを使用することで、データベースに直接変更を適用できます。

これはローカルの開発環境で新しいスキーマの設計や変更を素早くテストするのに便利な方法で、マイグレーションファイルを管理することなく、迅速に繰り返しテストを行うことができます：

```terminal
npx drizzle-kit push

```

```terminal
# マイグレーションファイルを生成します:

npx drizzle-kit generate

# マイグレーションをDBに適用します。

npx drizzle-kit migrate

```

👆Drizzleで、 .tsコードからSupabaseのDBに設定を反映させる一番基本的な方法です。



---

## Why Drizzle?

DrizzleORMは、ヘッドレスなTypeScriptORMで、シンプルさとパフォーマンスを兼ね備えています。

### 特徴

#### Headless ORM

ヘッドレスORM

Drizzleはライブラリと補完的なツールの集合体です。
従来のORMとは異なり、プロジェクトの構造に干渉せず、自由な開発をサポートします。

#### Why SQL-like? SQLライク

SQLに精通している開発者には親しみやすく、SQLの力を最大限に活用できる設計になっています。
複雑なフレームワークのAPIを学ぶ必要がありません。

データのアクセス
SQLのようなクエリを使用して、データベーススキーマをTypeScriptで定義し、データを効率的に取得できます。

### パフォーマンスと柔軟性

パフォーマンスDrizzleは常に1つのSQLクエリを出力し、サーバーレスデータベースでのパフォーマンスやラウンドトリップコストを心配する必要がありません。

サーバーレス対応依存関係がゼロで、スリムでサーバーレスに最適化されています。

主要なSQLダイアレクト（Postgres、MySQLなど）をサポートし、新しいドライバも追加中です。



### 使い方の例

```tsx
const result = await db.query.users.findMany({
	with: {
		posts: true
	},
});

```

DrizzleORMは、開発者が自分のスタイルでプロジェクトを構築できるように設計されており、データの柔軟な管理を可能にします。



---

## Guides

プログラミングや開発に関するさまざまなタスクを行うための、コードサンプルやステップバイステップの手順を集めたものです。

これを使うことで、初心者の人でも簡単に理解できるように、具体的な例を通じて学ぶことができます。

(※公式ドキュメントのLink先に詳細なサンプルがあります。)

### クエリ内の条件フィルタ
### SQL 値の増加
### SQL 値の減少
### クエリにカラムを含める、または除外する
### SQL 値の切り替え
### 行数のカウント
### クエリのアップサート
### SQL 制限/オフセット・ページ分割
### SQL カーソル・ベースのページネーション
### SQL デフォルト値としてのタイムスタンプ
### 少なくとも1つの関連する子行を持つ親行を選択する
### 空の配列をデフォルト値とする
### 各行で異なる値を持つ多数の更新
### 一意かつ大文字小文字を区別しない電子メールの処理
### pgvector拡張によるベクトル類似検索
### PostgreSQL全文検索
### Drizzle Kitを使用したCloudflare D1 HTTP API
### PostgreSQLにおける点データ型
### PostGISジオメトリポイント
### ローカルでPostgreSQLをセットアップする方法
### MySQLのローカル設定方法



---

## Tutorials

(※公式ドキュメントのLink先に詳細なサンプルがあります。)

### DrizzleとSupabaseエッジ関数
### Vercelエッジ関数とDrizzle
### DrizzleとNeon Postgres
### DrizzleとSupabaseデータベース
### TursoとDrizzle
### DrizzleとVercel Postgres
### Neon Postgresを使ったTodoアプリ



---

## Latest releases

最新リリース情報

Releases · drizzle-team/drizzle-orm
https://github.com/drizzle-team/drizzle-orm/releases

2024年12月4日現在

### ver. 0.37.0

ダイアレクト: 特定のデータベースに特化したSQLの言語。
SingleStore: 高速でリアルタイムデータ処理ができるデータベース。










### ver. 0.36.0

<details><summary>DrizzleのRLSサポート</summary>

Drizzleでは、データベースプロバイダでRLSを行うための特定の定義済みRLSロールと関数を用意していますが、独自のロジックを定義することもできます。



#### RLS: RLSの有効化
(抜粋)

```tsx
import { integer, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer(),
}).enableRLS();

```

👆このコードは、usersテーブルでRLSを有効化しています。

idのカラム単位でRLSを有効にするという意味は含みません。

※テーブルにポリシーが存在しない場合は、デフォルトの拒否ポリシーが使用されます。



#### RLS: 役割 Roles

```tsx
import { pgRole } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin', { createRole: true, createDb: true, inherit: true });

```

👆adminという名前の新しいロールを定義する方法です。



#### RLS: 役割 Roles の解説

**役割(ロール)** は、データベースへのアクセス権限をグループ化するために使用されます。特定のロールに属するユーザーは、そのロールに割り当てられた権限に基づいてデータベース操作を実行できます。

与えられたコードは、`admin`という名前の新しいロールを定義する方法を示しています。

```tsx
import { pgRole } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin', { createRole: true, createDb: true, inherit: true });

```

**解説:**

* `pgRole` 関数は、新しいロールを定義するために使用されます。
* `'admin'` は、作成するロールの名前です。
* `{ createRole: true, createDb: true, inherit: true }` は、ロールに割り当てる権限を指定するオプションです。
    * `createRole: true`:  このロールを持つユーザーは、新しいロールを作成する権限を持ちます。
    * `createDb: true`: このロールを持つユーザーは、新しいデータベースを作成する権限を持ちます。
    * `inherit: true`: このロールは、他のロールから権限を継承します。



**既存のロール**

データベースにすでにロールが存在する場合、`existing()`メソッドを使用して、`drizzle-kit` がそのロールを認識したり、マイグレーションに含めたりしないようにすることができます。

例：

```tsx
import { pgRole } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin').existing();

```

この例では、`admin` という名前のロールがすでにデータベースに存在すると仮定し、`drizzle-kit` はこのロールを管理しません。

drizzle-kit でデータベースを管理するとき、全部のロールをイチから作るわけではありません。

この existing() メソッドを使うと、drizzle-kit に「このロールはもうあるから、新しく作ったり、変更したりしないで！」って教えてあげられます。
なので、drizzle-kit はこの admin ロールについては何もせず、ほっといてくれます。



#### RLS: ポリシー Policies

```tsx
import { sql } from 'drizzle-orm';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy('policy', {
		as: 'permissive',
		to: admin,
		for: 'delete',
		using: sql``,
		withCheck: sql``,
	}),
]);

```

👆このコードは、`users` テーブルに対するアクセス制御を細かく設定する RLS ポリシーを定義しています。

**解説:**

1.  **`admin` ロールの定義**: `pgRole('admin')` で `admin` という名前のロールを定義しています。  ロールは、データベースへのアクセス権限をグループ化するために使用されます。

2.  **`users` テーブルの定義**: `pgTable('users', { id: integer() })` で `users` という名前のテーブルを定義し、`id` という整数型のカラムを作成しています。

3.  **`policy` ポリシーの定義**: `pgPolicy()` 関数を使って、`policy` という名前のポリシーを定義しています。 このポリシーは、以下の設定を持ちます。

    *   **`as: 'permissive'`**:  これはポリシーの種類を指定します。`permissive` は「許可的」という意味で、明示的に許可された操作以外はすべて拒否されます。
    *   **`to: admin'`**:  このポリシーを適用するロールを指定します。ここでは、`admin` ロールに属するユーザーだけがこのポリシーの対象となります。
    *   **`for: 'delete'`**:  このポリシーが適用される操作を指定します。ここでは、`delete` つまり削除操作にのみ適用されます。
    *   **`using: sql`**:  これは、ポリシーが許可される条件を SQL 文で記述する部分です。ここでは空なので、無条件で削除が許可されます。より複雑な条件を設定することもできます。
    *   **`withCheck: sql`**: これも条件を記述する部分ですが、`using` とは異なり、操作の実行前にチェックされる条件です。

このコードでは、 `admin` ロールを持つユーザーだけが `users` テーブルのレコードを削除できる RLS ポリシーを定義しています。



#### RLS: ポリシー Policies Link()

ポリシーを既存のテーブルにリンクするポリシーをデータベースの既存のテーブルにリンクする必要がある場合があります。

もっとも一般的な使用例は、Supabaseのようなデータベースプロバイダで、既存のテーブルにポリシーを追加する必要がある場合です。

この場合、.link()APIを使用します。

```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```

👆`realtimeMessages` という既存のテーブルに、新たに定義したポリシーをリンクする方法です。

**解説:**

1. **`authenticatedRole`**: Supabase で定義済みのロールで、認証済みのユーザーです。
1. **`pgPolicy`**: Drizzle ORM で RLS ポリシーを定義するための関数です。
1. **`"authenticated role insert policy"`**: 新しく定義するポリシーの名前です。
1. **`for: "insert"`**: このポリシーが適用される操作を指定します。ここでは、データの挿入操作に適用されます。
1. **`to: authenticatedRole`**: このポリシーが適用されるロールを指定します。ここでは、`authenticatedRole` に属する、つまり認証済みのユーザーがこのポリシーの対象となります。
1. **`using: sql`**: ポリシーが適用される条件を SQL 文で記述する部分です。ここでは空なので、無条件で挿入操作が許可されます。必要に応じて、ここに条件を記述することができます。
1. **`.link(realtimeMessages)`**: 定義したポリシーを `realtimeMessages` テーブルにリンクします。

**Supabase などの外部データベースプロバイダでは、あらかじめ定義されたテーブルが存在することがあります。**
これらのテーブルに独自の RLS ポリシーを追加したい場合に、`link()` メソッドを利用します。



#### RLS: マイグレーション Migrations

スキーマとロールを管理するためにdrizzle-kitを使用している場合、Drizzleスキーマで定義されていないロールを参照したい場合があります。

このような場合、drizzleスキーマで各ロールを定義し、.existing()でマークすることなく、drizzle-kitでこれらのロールの管理をスキップできます。

このような場合、drizzle.config.tsでentities.rolesを使用できます。

デフォルトでは、drizzle-kitはロールを管理しませんので、drizzle.config.tsでこの機能を有効にする必要があります。

```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true,
  entities: {
    roles: true
  }
});

```

この設定により、Drizzle Kit は schema で指定されたスキーマファイルに定義されているロールだけでなく、データベースにすでに存在するロールも認識します。

そして、Drizzle Kit は既存のロールに対しては変更を加えず、新規のロール定義のみをデータベースに適用します。



追加の設定オプションが必要な場合に備えて、もう少し例を見てみましょう。

* 管理者ロールがあり、管理可能なロールのリストから除外したい。

```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      exclude: ['admin']
    }
  }
});

```

* 管理者ロールがあり、それを管理可能なロールのリストに含めたい。

```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      include: ['admin']
    }
  }
});

```

Supabaseを使用していて、Supabaseで定義されたロールを除外したい場合は、プロバイダオプションにsupabaseを指定します。

```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase'
    }
  }
});

```

※Supabase では、あらかじめ定義されたロール (anon、authenticated など) が存在します。
これらのロールは Supabase のシステム内部で使用されるため、Drizzle Kit で管理する必要はありません。
provider: 'supabase' を指定することで、Drizzle Kit は Supabase が定義したロールを既存のものとして扱い、新規作成や変更を行わなくなります。

※Drizzle のバージョンによっては、Supabase が提供する新しいロールに対応していない場合があります。 その場合は、exclude オプションを使って、明示的に除外するロールを指定します。



#### RLS: RLS on views ビューにRLSをかける

Drizzleでは、ビューにRLSポリシーを指定することもできます。
そのためには、ビューのWITHオプションでsecurity_invokerを使用する必要があります。

```tsx
...

export const roomsUsersProfiles = pgView("rooms_users_profiles")
  .with({
    securityInvoker: true,
  })
  .as((qb) =>
    qb
      .select({
        ...getTableColumns(roomsUsers),
        email: profiles.email,
      })
      .from(roomsUsers)
      .innerJoin(profiles, eq(roomsUsers.userId, profiles.id))
  );

```



提供されたコードは、`roomsUsersProfiles` というビューに RLS ポリシーを適用する方法を示しています。

```tsx
export const roomsUsersProfiles = pgView("rooms_users_profiles")
  .with({
    securityInvoker: true,
  })
  .as((qb) =>
    qb
      .select({
        ...getTableColumns(roomsUsers),
        email: profiles.email,
      })
      .from(roomsUsers)
      .innerJoin(profiles, eq(roomsUsers.userId, profiles.id))
  );

```

**解説:**

1. **`roomsUsersProfiles`**: `roomsUsers` テーブルと `profiles` テーブルを結合したビューです。
1. **`pgView("rooms_users_profiles")`**: Drizzle ORM でビューを定義するための関数です。
1. **`.with({ securityInvoker: true })`**: ビューの WITH オプションで `security_invoker` を `true` に設定しています。これは、ビューに対するアクセス権限を、ビューを呼び出したユーザーではなく、ビューの定義に使用されたユーザーに基づいて評価することを意味します。

1. **`.as((qb) => ...)`**: ビューの内容を定義するクエリを指定しています。
   * **`qb`**: クエリビルダのインスタンスです。
   * **`.select({ ... })`**: ビューに含めるカラムを指定しています。`roomsUsers` テーブルのすべてのカラムと `profiles` テーブルの `email` カラムを選択しています。
   * **`.from(roomsUsers)`**: `roomsUsers` テーブルを基にします。
   * **`.innerJoin(profiles, eq(roomsUsers.userId, profiles.id))`**: `roomsUsers.userId` と `profiles.id` が一致する行を結合します。

**このコードは、`roomsUsersProfiles` ビューに対して RLS ポリシーを適用するために `securityInvoker` オプションを使用しています。**

**セキュリティの考慮点**

* `securityInvoker` オプションを使用すると、ビューの定義に使用されたユーザーの権限でビューが実行されるため、ビューの定義に使用するユーザーの権限を適切に制限する必要があります。
* 適用する RLS ポリシーの内容は、アプリケーションのセキュリティ要件に合わせて適切に設計する必要があります。



#### RLS: Using with Supabase

Supabaseで使用する

/supabase インポートには、既存のロールとしてマークされた定義済みのロールが含まれており、スキーマで使用できます。

このインポートは、RLS と Supabase をより簡単に使用できるよう、今後のリリースで機能やヘルパーが拡張される予定です。

```tsx
// drizzle-orm/supabase
export const anonRole = pgRole('anon').existing();
export const authenticatedRole = pgRole('authenticated').existing();
export const serviceRole = pgRole('service_role').existing();
export const postgresRole = pgRole('postgres_role').existing();
export const supabaseAuthAdminRole = pgRole('supabase_auth_admin').existing();

```

たとえば、Supabase の定義済みロールを次のように使用できます。

```tsx
import { sql } from 'drizzle-orm';
import { serviceRole } from 'drizzle-orm/supabase';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy(`policy-insert`, {
		for: 'insert',
		to: serviceRole,
		withCheck: sql`false`,
	}),
]);

```

/supabaseインポートには、アプリケーションで使用できる定義済みのテーブルや関数も含まれています。

```tsx
// drizzle-orm/supabase

const auth = pgSchema('auth');
export const authUsers = auth.table('users', {
	id: uuid().primaryKey().notNull(),
});

const realtime = pgSchema('realtime');
export const realtimeMessages = realtime.table(
	'messages',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey(),
		topic: text().notNull(),
		extension: text({
			enum: ['presence', 'broadcast', 'postgres_changes'],
		}).notNull(),
	},
);

export const authUid = sql`(select auth.uid())`;
export const realtimeTopic = sql`realtime.topic()`;

```

これにより、Drizzle Kitはそれらを既存のデータベースとして扱い、他のエンティティに接続するための情報としてのみ使用します。



```tsx
import { foreignKey, pgPolicy, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
	  // reference to the auth table from Supabase
      foreignColumns: [authUsers.id],
      name: "profiles_id_fk",
    }).onDelete("cascade"),
    pgPolicy("authenticated can view all profiles", {
      for: "select",
	  // using predefined role from Supabase
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);

```

Supabaseに存在するテーブルにポリシーを追加する例を確認してみましょう。

```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```

</details>



---

## Gotchas

これはDrizzleの使用例をまとめたライブラリになります

(空)



----------------------------------------

# FUNDAMENTALS 基礎

## Schema

Drizzle では、基礎となるデータベースがサポートするさまざまなモデルとプロパティを持つスキーマを TypeScript で定義できます。

スキーマを定義すると、
クエリ（Drizzle-ORMを使用）
や
マイグレーション（Drizzle-Kitを使用）において、
将来的な修正のためのソースとなります。



* Drizzle-Kit との連携
Drizzle Schema と連携してよく使われるツールに、Drizzle-Kit があります。

Drizzle-Kit は、Drizzle Schema からデータベースのマイグレーションスクリプトを生成するツールです。

これにより、データベースのスキーマ変更を安全かつ簡単に管理できます。



マイグレーションプロセスにDrizzle-Kitを使用する場合は、スキーマファイルに定義されているすべてのモデルをエクスポートし、Drizzle-Kitがそれらをインポートしてマイグレーション差分プロセスで使用できるようにしてください。



### スキーマファイルを整理する

Drizzleでスキーマを宣言するもっとも一般的な方法は、すべてのテーブルを1つのschema.tsファイルにまとめることです。

※スキーマファイルの名前は自由につけられます。
たとえば、models.tsに変えてもOKです。

この方法は、定義しているテーブルモデルの数がそれほど多くない場合や、1つのファイルにすべてをまとめても問題ない場合に有効です。

```
📦 <project root>
└ 📂 src
└ 📂 db
   └ 📜 schema.ts

```


drizzle.config.tsファイルでスキーマファイルへのパスを指定する必要があります。

この設定により、Drizzleはschema.tsファイルから読み込み、マイグレーション生成プロセス中にこの情報を使用します。

drizzle.config.tsファイルとDrizzleによるマイグレーションについての詳細は、ドキュメントの drizzle.config.ts の項目 を参照してください。



```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema.ts'
})

```



複数のファイルにスキーマDrizzleモデル（テーブル、列挙型、シーケンスなど）は、1つのファイルだけでなく、好きなファイルに配置できます。

Drizzle kitがそれらをインポートしてマイグレーションで使用できるように、それらのファイルからすべてのモデルをエクスポートすることが必要です。

1つの使用例として、各テーブルをそれぞれのファイルに分けることができます。

```
📦 <project root>
 └ 📂 src
    └ 📂 db
       └ 📂 schema
          ├ 📜 users.ts
          ├ 📜 countries.ts
          ├ 📜 cities.ts
          ├ 📜 products.ts
          ├ 📜 clients.ts
          └ 📜 etc.ts

```

👆schemaフォルダ内の複数のファイルに分割できます、ファイル名も自由につけられます。

drizzle.config.tsファイルでスキーマフォルダへのパスを指定する必要があります。

この設定により、Drizzleはスキーマフォルダから読み込み、再帰的にすべてのファイルを見つけ、そこからすべてのdrizzleテーブルを取得します。

drizzle.config.tsファイルとDrizzleによるマイグレーションについての詳細は、ドキュメントの drizzle.config.ts の項目 を参照してください。



```drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema'
})

```

👆schemaがフォルダ指定になっています。



```
📦 <project root>
 └ 📂 src
    └ 📂 db
       └ 📂 schema
          ├ 📜 users.ts
          ├ 📜 messaging.ts
          └ 📜 products.ts

```

👆shhemaフォルダでグループ化しています。



### データスキーマを形成する

Drizzleのスキーマは、使用しているデータベースからいくつかのモデルタイプで構成されています。

👇 drizzleで指定できること
	Tables with columns, constraints, etc. カラム、制約などを持つテーブル
	Schemas(PostgreSQL only) スキーマ
	Enums 列挙子
	Sequences(PostgreSQL only)  シーケンス
	Views ビュー
	Materialized Views ビュー マテリアライズド・ビュー
	etc.



#### テーブルと列の宣言

Drizzleのテーブルは少なくとも1つのカラムで定義されなければなりません。

1つ重要なことがあります。
drizzleには共通のテーブルオブジェクトというものはありません。


* 形式

```
export const [table name in typescript] = pgTable { [table name in database], {

	[column name in typescript] : [database type] ( [db column name] )
}

```

👆この形式を👇に当てはまります。

PostgreSQL Table

```tsx
import { pgTable, integer } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  id: integer()
});

```



デフォルトでは、DrizzleはデータベースクエリのカラムにTypeScriptのキー名を使用します。 そのため、👆例のスキーマとクエリはSQLクエリを生成します。

この例ではdbオブジェクトを使用していますが、その初期化についてはこのドキュメントでは説明しません。

データベースへの接続方法については、👇 Connections Docs を参照してください。

Drizzle ORM - PostgreSQL

https://orm.drizzle.team/docs/get-started-postgresql



#### TypeScript キー = データベース キー

Drizzleのschema.tsファイルでのカラムと
Supabaseのカラムは違います。

TypeScript		キャメルケース
Supabase		スネークケース
となっています。

```schema.ts
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const users = pgTable('users', {
  id: integer(),
  first_name: varchar()
})

```

```query.ts
await db.select().from(users);

```

```sql
SELECT "id", "first_name" from users;

```

TypeScriptのコードとデータベースで異なる名前を使いたい場合は、カラムエイリアスを使うことができます。

```schema.ts
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: integer(),
  firstName: varchar('first_name')
})

```

```query.ts
await db.select().from(users);

```

```sql
SELECT "id", "first_name" from users;

```



#### Camel and Snake casing

TypeScript		キャメルケース
Supabase		スネークケース

データベースモデル名はsnake_case規則に従うことが多いです。

TypeScript のクラス名や変数名は、通常はキャメルケース（camelCase）がよく使われます。

データベースのモデル名にはsnake_caseの規約が使われることが多いですが、TypeScriptではモデルの命名にcamelCaseを使うのが一般的です。

そのため、スキーマの中に多くのエイリアス定義が存在することになります。

これに対処するために、DrizzleはDrizzleデータベースの初期化時にオプションのパラメータを1つ追加することで、TypeScriptのcamelCaseをデータベース内のsnake_caseに自動的にマッピングする方法を提供します。

このようなマッピングのために、DrizzleDB宣言でcasingオプションを使用できます。

このパラメータはデータベースモデルの命名規則を指定するのに役立ち、JavaScriptのすべてのキーをそれに合わせてマッピングしようとします。

```schema.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: integer(),
  firstName: varchar()
})

```

```db.ts
const db = drizzle({ connection: process.env.DATABASE_URL, casing: 'snake_case' })

```

```query.ts
await db.select().from(users);

```

```sql
SELECT "id", "first_name" from users;

```

この👆変換後に firstNameがfirst_nameになっています。



### Advanced

DrizzleORMにはいくつかのトリックがあります。

Drizzleが完全にTypeScriptファイルである限り、単純なTypeScriptプロジェクトで行うことは基本的に何でもできます。

一般的な機能の1つは、カラムを別の場所に分けて再利用することです。

たとえば、updated_at、created_at、deleted_atカラムを考えてみましょう。

多くのテーブル/モデルでは、システム内のエンティティの作成、削除、更新を追跡し分析するために、これら3つのフィールドが必要になることがあります。

これらのカラムを別のファイルで定義し、それをインポートしてすべてのテーブルオブジェクトに分散させることができます。



* SQL 共通

```columns.helpers.ts
const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
}

```

* SQL 1

```users.sql.ts

export const users = pgTable('users', {
  id: integer(),
  ...timestamps
})

```

* SQL 2

```posts.sql.ts
export const posts = pgTable('posts', {
  id: integer(),
  ...timestamps
})

```

👆SQL 1と2に 共通の timestampsを設定しています。



#### Schemas

スキーマの作成

PostgreSQLにはスキーマと呼ばれるエンティティがあります。

これは独自のスキーマを設定する方法です。

※通常Supabaseは publicスキーマを利用し、ここにテーブルなどを設定しています。複数のデータベースを利用したり、テーブルの数が多くなったり、グループで分けたくなった時にスキーマで分割管理するのも一つの方法です。



1. スキーマの作成

import { pgSchema } from "drizzle-orm/pg-core";

export const customSchema = pgSchema('custom');



2. テーブルの定義

スキーマ内にテーブルを置くことができます。

import { integer, pgSchema } from "drizzle-orm/pg-core";

export const customSchema = pgSchema('custom');

export const users = customSchema.table('users', {
  id: integer()
})



### Example

例

基本がわかったら、実際のプロジェクトでカスタムスキーマを定義してみましょう。

すべての例ではgenerate Unique Stringを使用します。 この実装は、すべてのスキーマ例で提供されます。

```tsx
import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const users = table(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table) => {
    return {
      emailIndex: t.uniqueIndex("email_idx").on(table.email),
    };
  }
);

export const posts = table(
  "posts",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: t.varchar().$default(() => generateUniqueString(16)),
    title: t.varchar({ length: 256 }),
    ownerId: t.integer("owner_id").references(() => users.id),
  },
  (table) => {
    return {
      slugIndex: t.uniqueIndex("slug_idx").on(table.slug),
      titleIndex: t.index("title_idx").on(table.title),
    };
  }
);

export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: t.varchar({ length: 256 }),
  postId: t.integer("post_id").references(() => posts.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});

```

👆各要素の意味

* pgEnum: PostgreSQL の enum 型を定義する。rolesEnum は、guest, user, admin という3つの値を持つ列を定義するためのものです。

* pgTable: PostgreSQL のテーブルを定義する。

* primaryKey: 主キーを定義する。

* generatedAlwaysAsIdentity: 主キーの値を自動的に生成する。

* notNull: 値がNULLにならないようにする。

* references: 外部キーを設定する。他のテーブルの列を参照する関係を作ります。

* uniqueIndex: ユニークなインデックスを作成する。重複する値を許さないようにする。

* index: 通常のインデックスを作成する。検索を高速化する。

* $default: カラムのデフォルト値を設定する。



#### generateUniqueString implementation

最後に、ユニークな文字列を生成する関数の例です。

```tsx
// 指定された長さのランダムな英数字文字列を生成します。
function generateUniqueString(length: number = 12): string {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let uniqueString = "";
   for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       uniqueString += characters[randomIndex];
   }
   return uniqueString;
}

```



**関数の解説:**

1. **`length` パラメータ:** 生成する文字列の長さを指定します。デフォルト値は12です。
2. **`characters` 定数:** 使用可能な文字の集合を定義します。この場合、英大文字、英小文字、数字のすべてを含みます。
3. **`uniqueString` 変数:** 生成される文字列を格納します。初期値は空文字列です。
4. **`for` ループ:** 指定された長さ `length` の回数だけループします。
5. **`randomIndex` 変数:** `characters` 配列からランダムなインデックスを取得します。 `Math.random()` 関数は 0 以上 1 未満の乱数を生成し、`characters.length` を掛けることで 0 以上 `characters.length` 未満の乱数を生成します。 `Math.floor()` 関数は小数点以下を切り捨てることで、整数値のインデックスを取得します。
6. **`uniqueString += characters[randomIndex]`:** ランダムに選択された文字を `uniqueString` に追加します。
7. **`return uniqueString`:** 生成された文字列を返します。

**この関数は、データベースの主キーや一意な識識別子などを生成する際に役立ちます。**

ソースでは、スキーマの例で `generateUniqueString` 関数を使用して `posts` テーブルの `slug` カラムに一意な値を生成しています。



---

## Database connection with Drizzle

Drizzle ORM は、データベース ドライバーを介してデータベース上で SQL クエリを実行します。

DBとの接続方法の説明

```index.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { users } from "./schema"

const db = drizzle(process.env.DATABASE_URL);
const usersCount = await db.$count(users);

```

```schema.ts
import { pgTable, integer, text } from "drizzle-orm";

export const users = pgTable("users", {
  id: integer("id").generateAlwaysAsIdentity(),
  name: text("name"),
})

```

Drizzleは内部的にnode-postgresドライバインスタンスを作成し、必要に応じてdb.$client経由でアクセスできます。


```tsx
// node-postgres
import { drizzle } from "drizzle-orm/node-postgres"

const db = drizzle(process.env.DATABASE_URL);
const pool = db.$client;

```



```tsx
// node-postgres
// above is equivalent to
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

```



---

## Query data

Drizzle Queries + CRUD

Drizzleはデータベースへのクエリの方法をいくつか提供しており、次のプロジェクトでどれが必要になるかはあなた次第です。
SQLのような構文か、リレーショナル構文です。
確認してみましょう。

### Why SQL-like?

SQLを知っていれば、Drizzleを知っています。

他のORMやデータフレームワークはSQLから逸脱したり、抽象化する傾向があるため、SQLとフレームワークのAPIの両方を学ぶ必要があり、二重の学習曲線になります。

Drizzleで使えるのは、
SQLのような構文
リレーショナル構文


```tsx
// Access your data
await db
  .select()
	.from(posts)
	.leftJoin(comments, eq(posts.id, comments.post_id))
	.where(eq(posts.id, 10))

```

```sql
SELECT *
FROM posts
LEFT JOIN comments ON posts.id = comments.post_id
WHERE posts.id = 10

```

SQLライクな構文により、純粋なSQLでできることの多くを再現し、Drizzleが何を行い、どのようなクエリが生成されるかを正確に知ることができます。

select、insert、update、delete、エイリアス、WITH句、サブクエリ、プリペアドステートメントなどさまざまなクエリを実行できます。

例

```tsx
// insert
await db.insert(users).values({ email: 'user@gmail.com' })

```

👇

```sql
-- insert
INSERT INTO users (email) VALUES ('user@gmail.com')

```

```tsx
// update
await db.update(users)
        .set({ email: 'user@gmail.com' })
        .where(eq(users.id, 1))

```

👇

```sql
-- update
UPDATE users
SET email = 'user@gmail.com'
WHERE users.id = 1

```

```tsx
// delete
await db.delete(users).where(eq(users.id, 1))

```

👇

```sql
-- delete
DELETE FROM users WHERE users.id = 1

```



### Why not SQL-like?

私たちは常に完璧にバランスの取れたソリューションを目指しています。

SQLライクなクエリはお客様のニーズを100%カバーしますが、より効率的にデータをクエリできる一般的なシナリオもあります。

結合やデータマッピングを気にすることなく、もっとも便利でパフォーマンスの高い方法でデータベースからリレーショナルでネスト化されたデータを取得できるように、QueriesAPIを構築しました。

Drizzleは常に正確に1つのSQLクエリを出力します。

サーバーレスデータベースで自由に使うことができ、パフォーマンスやラウンドトリップコストを心配する必要はありません！


```tsx
const result = await db.query.users.findMany({
	with: {
		posts: true
	},
});

```



### Advanced

Drizzleでは、クエリを自由に組み合わせ、分割できます。

メインクエリから独立してフィルタを構成したり、サブクエリや条件文を分割したり、その他にもさまざまなことができます。

高度な例をいくつか見てみましょう：



#### WHERE文を作成してクエリで使用する

高度なフィルタリング：WHERE句の動的作成

```tsx
async function getProductsBy({
  name,
  category,
  maxPrice,
}: {
  name?: string;
  category?: string;
  maxPrice?: string;
}) {
  const filters: SQL[] = [];

  if (name) filters.push(ilike(products.name, name));
  if (category) filters.push(eq(products.category, category));
  if (maxPrice) filters.push(lte(products.price, maxPrice));

  return db
    .select()
    .from(products)
    .where(and(...filters));
}

```

👆 filtersは、空の配列から始めて、あとで条件がある場合には filters.push(...) を使って、必要な条件を追加します。

この関数は、`filters` という配列を使ってWHERE句を動的に作成することで、柔軟な検索機能を実現しています。

**コードの解説:**

1. **`getProductsBy` 関数:**
   - この関数は、`name`、`category`、`maxPrice` の3つのオプションパラメータを受け取ります。これらのパラメータは、それぞれ製品名、カテゴリ、最大価格を表し、いずれも省略可能です。
2. **`filters` 配列:**
   - この配列は、WHERE句に含める条件を格納するために使用されます。初期値は空の配列です。
3. **条件の追加:**
   - `if`文を使って、各パラメータが指定されている場合にのみ、対応する条件を `filters` 配列に追加します。
   - `ilike` 関数は、大文字小文字を区別せずに部分一致検索を行う条件を作成します。製品名に `name` が含まれる製品を検索する場合に使用されます。
   - `eq` 関数は、値が等しいことを比較する条件を作成します。カテゴリが `category` と一致する製品を検索する場合に使用されます。
   - `lte` 関数は、値が指定した値以下であることを比較する条件を作成します。価格が `maxPrice` 以下である製品を検索する場合に使用されます。
4. **`where` 句の作成:**
   - `and` 関数を使って、`filters` 配列内のすべての条件をAND演算子で結合します。
   - `where` メソッドに `and` 関数の結果を渡すことで、WHERE句が作成されます。
5. **クエリの作成:**
   - `db.select().from(products)` で基本的なクエリを作成し、`.where(and(...filters))` でWHERE句を追加します。
   - このクエリは、指定された条件を満たす製品を選択するSQLクエリを生成します。

**この関数の利点:**

* **柔軟性:** パラメータを省略することで、さまざまな条件で製品を検索できます。
* **可読性:** コードが簡潔で理解しやすくなっています。
* **再利用性:** この関数は、さまざまな場所で再利用できます。

**高度なフィルタリング:**

ソースによると、Drizzle APIは、TypeScriptと組み合わせることで、クエリにフィルタを組み合わせる強力で柔軟な方法を提供します。
  - 条件付きフィルタリング
  - 複数のフィルタを論理演算子で組み合わせる
  - SQLテンプレート構文を使用した複雑なフィルタの作成
  - limit offset pagination と cursor pagination を使用した高度なページネーション



#### サブクエリを別の変数に分け、メインクエリで使用する。

サブクエリを活用したクエリの実行

```tsx
const subquery = db
	.select()
	.from(internalStaff)
	.leftJoin(customUser, eq(internalStaff.userId, customUser.id))
	.as('internal_staff');

const mainQuery = await db
	.select()
	.from(ticket)
	.leftJoin(subquery, eq(subquery.internal_staff.userId, ticket.staffId));

```

👆エイリアスの使用: .as('internal_staff') でエイリアスを付けています。

`internalStaff` テーブルと `customUser` テーブルを結合したサブクエリを作成し、そのサブクエリを `ticket` テーブルに結合するメインクエリを実行する方法を示しています。

**コードの解説:**

1. **サブクエリの作成**
   -  `const subquery = db.select().from(internalStaff).leftJoin(customUser, eq(internalStaff.userId, customUser.id)).as('internal_staff');`
     - この行では、 `internalStaff` テーブルと `customUser` テーブルを `userId` をキーに左外部結合したサブクエリを作成しています。
     - `as('internal_staff')`  は、サブクエリに `internal_staff` というエイリアスを付けています。エイリアスを使用することで、メインクエリでサブクエリを参照しやすくなります。

2. **メインクエリの作成と実行**
   - `const mainQuery = await db.select().from(ticket).leftJoin(subquery, eq(subquery.internal_staff.userId, ticket.staffId));`
     - この行では、`ticket` テーブルと先に作成したサブクエリ `subquery` を `userId` をキーに左外部結合したメインクエリを作成し、実行しています。
     - メインクエリでは、サブクエリに付けたエイリアス `internal_staff` を使用して結合条件を指定しています。

**エイリアスの使用**:

- サブクエリにエイリアスを付けることで、メインクエリ内でサブクエリを参照しやすくなるため、可読性が向上します。
- エイリアスを使用することで、複雑なクエリをより構造化し、理解しやすくすることができます。

**サブクエリの利点**:

- サブクエリは、複雑なクエリを小さな部分に分割し、可読性を向上させることができます。
- サブクエリは、メインクエリとは独立して実行されるため、パフォーマンスが向上する可能性があります。
- サブクエリは、結合やフィルタリングなどの複雑な操作を実行するために使用できます。

**高度なクエリ**:

- ソースによると、Drizzle APIは、SQLライクな構文とリレーショナル構文を提供することで、高度なクエリを柔軟に構築することができます。
- 結合、サブクエリ、WITH句、エイリアスなど、SQLで可能な多くの操作をDrizzle APIを使用して実行できます。
- ソースには、WHERE句の作成、サブクエリの使用、集計、更新などの高度なクエリの例が示されています。

**結論**:

Drizzle ORM を使用することで、サブクエリを活用した高度なクエリを効率的に実行することができます。

提供されたコードは、サブクエリの使い方とエイリアスの重要性を示す良い例です。



---

## Migrations

Drizzle migrations fundamentals

SQL データベースでは、データを格納する前にエンティティのスキーマを厳密に定義する必要があります。

そして、エンティティの構造を変更する必要が生じた場合は、スキーマのマイグレーション を実行しなければなりません。

データベースのマイグレーションの管理には、複数の方法があります。

Drizzleは、データベースが先かコードベースが先かに関係なく、どちらのアプローチにも対応できるよう設計されています。



* データベースファースト

データベースのスキーマが真実の情報源となります。

データベーススキーマをデータベース上で直接管理するか、データベースマイグレーションツールを使って管理し、データベーススキーマをコードベースのアプリケーションレベルのエンティティに引き込みます。



* コードベース・ファースト

コードベース内のデータベーススキーマが真実の情報源となり、バージョン管理下に置かれます。

JavaScript/TypeScriptでデータベーススキーマを宣言および管理します。

Drizzleを直接使用するか、外部マイグレーションツールを使用してデータベーススキーマを適用します。



###  How can Drizzle help?

drizzle-kit を使います。

```terminal
drizzle-kit migrate
drizzle-kit generate
drizzle-kit push
drizzle-kit pull

```

* migrate: SQL マイグレーションファイルをデータベースに適用します。

* generate: TypeScript の Drizzle スキーマに基づいて SQL マイグレーションファイルを生成します。

* push: スキーマの変更をデータベースに直接プッシュします。

* pull: データベーススキーマを TypeScript にプルします。



データベースファーストとコードベースファーストの両方のアプローチに対応し、スキーマのプッシュ、SQLマイグレーションファイルの生成、データベースからのスキーマのプルなどが可能です。
一人で作業するにも、チームで作業するにも最適です。



### Now let’s pick the best option for your project:

Drizzle では、データベースからスキーマの現在の状態を取得し、それを TypeScript スキーマ ファイルとして保存するだけです。


では、あなたのプロジェクトに最適なオプションを選びましょう。

#### オプションの簡単な説明

Drizzle ORM マイグレーションの5つのオプションの特徴

オプション1: データベーススキーマを直接管理し、drizzle-kit pull でTypeScriptスキーマを生成します。

オプション2: TypeScriptスキーマを唯一の真実の情報源として、drizzle-kit push でDBに変更を適用します。

オプション3: TypeScriptスキーマからSQLマイグレーションファイルを生成し、drizzle-kit migrateで適用します。

オプション4: TypeScriptスキーマからSQLマイグレーションファイルを生成し、アプリケーションの実行時に適用します。

オプション5: TypeScriptスキーマからSQLマイグレーションファイルを生成し、手動または外部ツールで適用します。



※2がコード開発では最適です



#### オプション1

 外部マイグレーションツールを使って自分でデータベーススキーマを管理するか、データベース上で直接SQLマイグレーションを実行します。

Drizzleからデータベースからスキーマの現在の状態を取得し、TypeScriptスキーマファイルとして保存するだけです。  詳細



これはデータベースファーストのアプローチです。
既存のデータベース スキーマをプル
データベース スキーマを信頼できる情報源として持ち、Drizzle ではコマンドを使用してデータベース スキーマを TypeScript に取り込むことができます。

```terminal
drizzle-kit pull

```

👇

```tsx
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
};

```

#### オプション2

データベーススキーマをTypeScriptのコードベースに持ちたい。
Drizzleがスキーマを直接データベースに 「プッシュ 」したい 詳細を表示

これはコードベースファーストのアプローチです。

TypeScriptのDrizzleスキーマを真実のソースとし、Drizzleはdrizzle-kit pushコマンドを使ってスキーマの変更をデータベースにプッシュします。

これはラピッドプロトタイピングに最適なアプローチであり、私たちは何十ものチームや一人の開発者が、本番アプリケーションのプライマリ マイグレーション フローとしてこの方法をうまく使っているのを見てきました。

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";
export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(), // <--- added column
};

```



#### オプション 3

 TypeScriptコードベースにデータベーススキーマを持ち、DrizzleがSQLマイグレーションファイルを生成してデータベースに適用したい 詳細を表示

これはコードベースファーストのアプローチです。

TypeScriptで作成したDrizzleスキーマをソースとして、Drizzleはスキーマの変更に基づいたSQLマイグレーションファイルをdrizzle-kit generateで生成し、drizzle-kit migrateコマンドでデータベースに適用します。

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";
export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
};

```


#### オプション 4

 TypeScriptコードベースにデータベーススキーマを持ちたい、 DrizzleにSQLマイグレーションファイルを生成してもらい、実行時に適用したい 詳細を見る

これはコードベースファーストのアプローチです。

TypeScriptのDrizzleスキーマを真実のソースとし、Drizzleはdrizzle-kit generateでスキーマの変更に基づいたSQLマイグレーションファイルを生成し、アプリケーションの実行中にデータベースに適用できます。

このアプローチは、ゼロダウンタイムのデプロイ中にデータベースのマイグレーションを適用し、何か失敗した場合にDDLの変更をロールバックするようなモノリシックアプリケーションに広く使われています。

これは、デプロイ処理中に一度だけカスタムリソースでマイグレーションを実行するサーバーレスデプロイメントでも使用される。

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";
export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
};

```



#### オプション5

 TypeScriptコードベースにデータベーススキーマがあり、DrizzleにSQLマイグレーションファイルを生成してもらいたい。

これはコードベースファーストのアプローチです。TypeScriptで作成したDrizzleスキーマを真実のソースとし、Drizzleはdrizzle-kit generateでスキーマの変更に基づいたSQLマイグレーションファイルを生成します。

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";
export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
};

```



`drizzle-kit pull` では、drizzle.config.ts 設定ファイル
または CLI オプションで、drizzle.config.ts の設定にある dialect とデータベース接続 URL または `user:password@host:port/db` パラメータを指定する必要があります。

`drizzle-kit pull` は複数の設定ファイルを読み込めます。



----------------------------------------

# CONNECT

接続

Drizzle <> Supabase

接続できる沢山のDBの種類がありますが、今回はSupabase を選びます。

## Supabase

https://orm.drizzle.team/docs/connect-supabase

## Drizzle <> Supabase

Drizzle ORMを使用してPostgreSQLに接続し、初期設定からデータベース操作を行うためのガイドです。

このガイドでは、PostgreSQLのセットアップ、接続の基本、クエリの実行手順が説明されています。

node-postgres と postgres.js は、どちらもNode.jsでPostgreSQLデータベースに接続するためのライブラリですが、それぞれ異なる特徴と利点があります。



### node-postgres（pg）

	概要: node-postgresは、Node.js用の最も広く使われているPostgreSQLクライアントライブラリです。
	特徴:
		シンプルなAPI: 基本的なクエリの実行が簡単。
		プール管理: コネクションプール機能があり、効率的に接続を管理できます。
		広範なコミュニティ: 使用例やサポートが豊富で、ドキュメントも充実しています。
		型パーサー: PostgreSQLのデータ型に対するカスタマイズが可能。



### postgres.js

	概要: postgres.jsは、より新しいライブラリで、現代的なJavaScriptの機能を活用しています。
	特徴:
		プリペアードステートメント: デフォルトでプリペアードステートメントを使用し、パフォーマンスが向上します。
		軽量: より軽量で、シンプルな設計を持っています。
		自動型変換: データ型の自動変換が行われ、使いやすさが向上。
		トランザクションのサポート: トランザクション管理が簡単に行える。



### 選択のポイント

	node-postgresは、既存のプロジェクトやコミュニティのサポートが必要な場合に適しています。
	postgres.jsは、モダンな機能や軽量な設計を重視する場合に適しています。

用途やプロジェクトの要件に応じて、どちらのライブラリを選ぶか検討すると良いでしょう。質問があれば、さらにお答えします！



Drizzle ORMを使用してPostgreSQLデータベースに接続し、クエリを実行するための手順です。

Step 1 - Install packages パッケージのインストール:
postgres.jsを利用する場合

```terminal
npm i drizzle-orm postgres
npm i -D drizzle-kit

```

Step 2 - Initialize the driver and make a query
index.ts ドライバーの初期化とクエリの実行

```tsx
import { drizzle } from 'drizzle-orm/postgres-js'
const db = drizzle(process.env.DATABASE_URL);
const allUsers = await db.select().from(...);

```

クエリを実行する際には、db.select().from(...)のように記述します。

接続プールの使用:

Supabaseなどの環境で接続プールを使用する際は、準備済みステートメントを無効にする必要があります。これにより、エラーを避けることができます。

接続方法の選択

サーバーレス環境ではConnection Poolerを、長時間稼働するサーバーではDirect Connectionを使用してデータベースに接続します。



----------------------------------------

# MANAGE SCHEMA

## Data types

### PostgreSQL column types

これらすべての型をネイティブでサポートしていますが、それでも十分でない場合は、カスタムタイプを自由に作成できます。

このドキュメントのすべての例では、データベースのカラム名のエイリアスは使用しておらず、カラム名はTypeScriptのキーから生成されています。

必要であれば、カラム名にデータベースのエイリアスを使用できます。

また、casingパラメータを使用して、Drizzleのマッピング戦略を定義することもできます。

それについては、👇こちらをご覧ください。

Drizzle ORM - Schema

https://orm.drizzle.team/docs/sql-schema-declaration#shape-your-data-schema



### 型一覧

```
integer
	integer
	int
	int4

smallint
	smallint
	int2

bigint
	bigint
	int8

serial
	serial
	serial4

smallserial
	smallserial
	serial2

bigserial
	bigserial
	serial8

boolean

text
	text

varchar
	character varying(n)
	varchar(n)

char
	character(n)
	char(n)

numeric
	numeric
	decimal

real
	real
	float4

double precision
	double precision
	float8

json
	json

jsonb
	jsonb

time
	time
	timetz
	time with timezone
	time without timezone

timestamp
	timestamp
	timestamptz
	timestamp with time zone
	timestamp without time zone

date
	date

interval
	interval

point
	point

line
	line

enum
	enum
	enumerated types

Customizing data type

Identity Columns

```



-

#### integer

```tsx
import { integer, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	int: integer()
});

```

pgTable('table', { ... });
"table" という名前のテーブルを定義しています。

int: integer()
"int" という名前の整数型のカラムを定義しています。

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"int" integer
);

```



```tsx
import { sql } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	int1: integer().default(10)
	int2: integer().default(sql`'10'::int`)
});

```

int2
デフォルト値として sql\'10'::int を使用して文字列 '10' をinteger型に変換しています。

PostgreSQLでは、::int を使うことで文字列をinteger型にキャストすることができます。

sql 関数は、SQLの構文をそのまま使うことができるようにする関数です。

つまり、int2 はデフォルト値として文字列 '10' をinteger型に変換した値を持つことになります。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"int1" integer DEFAULT 10
	"int2" integer DEFAULT '10'::int
);

```


デフォルト値は '10'::int と指定されています。

これは、文字列'10'をinteger型にキャスト（型変換）しています。

PostgreSQLでは ::int を使って文字列をinteger型に変換することができます。



#### smallint

```tsx
import { smallint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	smallint: smallint()
});

```

smallint 型は、integer 型と比べて容量が小さく、-32768から32767までの整数を格納できます。

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"smallint" smallint
);

```



```tsx
import { sql } from "drizzle-orm";
import { smallint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	smallint1: smallint().default(10)
	smallint2: smallint().default(sql`'10'::smallint`)
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"smallint1" smallint DEFAULT 10
	"smallint2" smallint DEFAULT '10'::smallint
);

```

#### bigint

符号付き8バイト整数

```tsx
import { bigint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	bigint: bigint({ mode: 'number' })
});

// will be inferred as `number`
bigint: bigint({ mode: 'number' })

// will be inferred as `bigint`
bigint: bigint({ mode: 'bigint' })

```

bigint: bigint({ mode: 'number' }) を使用して、符号付き8バイト整数を格納できるカラムを定義しています。

mode: 'number' を指定することで、このカラムの値はTypeScriptでは number 型として推論されます。

bigint 型は、大きな整数を扱う場合に使用されます。
JavaScriptの number 型では正確に表現できない大きな整数を扱う必要がある場合は、 bigint 型を使用する必要があります。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"bigint" bigint
);

```

```tsx
import { sql } from "drizzle-orm";
import { bigint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	bigint1: bigint().default(10)
	bigint2: bigint().default(sql`'10'::bigint`)
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"bigint1" bigint DEFAULT 10
	"bigint2" bigint DEFAULT '10'::bigint
);

```

#### serial

自動的に増分される 4 バイトの整数。
一意の識別子列を作成するための表記上の利便性 (AUTO_INCREMENT他のデータベースでサポートされているプロパティと同様)。

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL

```tsx
import { serial, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  serial: serial(),
});

```

serial 型は、主キーとしてよく使用されます。主キーは、テーブル内の各行を一意に識別するカラムです。

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"serial" serial NOT NULL,
);

```



#### smallserial

自動的に増分される 2 バイトの整数。
一意の識別子列を作成するための表記上の利便性 (AUTO_INCREMENT他のデータベースでサポートされているプロパティと同様)。

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL

```tsx
import { smallserial, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  smallserial: smallserial(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"smallserial" smallserial NOT NULL,
);

```



#### bigserial

自動的に増分される 8 バイトの整数。一意の識別子列を作成するための表記上の利便性 (AUTO_INCREMENT他のデータベースでサポートされているプロパティと同様)。

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL

```tsx
import { bigserial, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  bigserial: bigserial({ mode: 'number' }),
});

```

bigserial:bigserial({mode:'number'})を使用して、自動的に増加する8バイト整数を格納できるカラムを定義しています。

mode:'number'を指定することで、このカラムの値はTypeScriptではnumber型として推論されます。

bigserial型は、大きな整数を扱う場合に使用され、PostgreSQLが自動的に値を生成してくれるため、開発者が主キーの値を手動で管理する必要がなくなります。

bigserial型のカラムは、デフォルトでNOTNULL制約が付与されます。

これは、カラムにNULL値を格納できないことを意味します。


```sql
CREATE TABLE IF NOT EXISTS "table" (
	"bigserial" bigserial NOT NULL,
);

```



#### boolean

PostgreSQL は標準 SQL 型 boolean を提供します。

PostgreSQL: Documentation: 17: 8.6. Boolean Type

https://www.postgresql.org/docs/current/datatype-boolean.html

```tsx
import { boolean, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	boolean: boolean()
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"boolean" boolean,
);

```



#### text

可変長（無制限）の文字列。

PostgreSQL: Documentation: 17: 8.3. Character Types

https://www.postgresql.org/docs/current/datatype-character.html

```tsx
import { text, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  text: text()
});

// will be inferred as text: "value1" | "value2" | null
text: text({ enum: ["value1", "value2"] })

```

text: text() を使用して、可変長（無制限）の文字列を格納できるカラムを定義しています。

デフォルト値は設定されていません。

text 型は、文字列データを格納する場合に最も一般的に使用される型です。

Drizzle ORM では、text 型のカラムに enum オプションを指定することで、列挙型を定義できます。

enum: ["value1", "value2"]: このカラムに格納できる値を "value1" と "value2" に制限します。

enum オプションを指定すると、このカラムの値はTypeScriptでは "value1" | "value2" | null 型として推論されます。

enum オプションを使用するメリットは、以下のとおりです。

データの整合性を確保できる: 指定された値以外の値がカラムに格納されるのを防ぐことができます。

コードの可読性を向上できる: 列挙型を使用することで、コードの意図が明確になります。

 text 型のカラムにも同様にデフォルト値を設定することができます。

例えば、**sql`'default text'::text`** を使うことで、文字列 'default text'` を text 型に変換した値をデフォルト値として設定できます。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"text" text,
);

```



#### varchar

可変長文字列。最大n文字数 (バイト数ではありません) の文字列を格納できます。

PostgreSQL: Documentation: 17: 8.3. Character Types

https://www.postgresql.org/docs/current/datatype-character.html

```tsx
import { varchar, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  varchar1: varchar(),
  varchar2: varchar({ length: 256 }),
});

// will be inferred as text: "value1" | "value2" | null
varchar: varchar({ enum: ["value1", "value2"] }),

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"varchar1" varchar,
	"varchar2" varchar(256),
);

```



#### char

固定長の空白が埋め込まれた文字列。最大n文字数 (バイト数ではありません) の文字列を格納できます。

PostgreSQL: Documentation: 17: 8.3. Character Types

https://www.postgresql.org/docs/current/datatype-character.html



```tsx
import { char, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  char1: char(),
  char2: char({ length: 256 }),
});

// will be inferred as text: "value1" | "value2" | null
char: char({ enum: ["value1", "value2"] }),

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"char1" char,
	"char2" char(256),
);

```



#### numeric

精度を選択できる正確な数値。小数点前最大 131072 桁、小数点後最大 16383 桁の非常に大きな桁数の数値を保存できます。

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-NUMERIC-DECIMAL

```tsx
import { numeric, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
  numeric1: numeric(),
  numeric2: numeric({ precision: 100 }),
  numeric3: numeric({ precision: 100, scale: 20 }),
});

```

numeric1
numeric() を使用して、精度とスケールを指定しないnumeric型のカラムを定義しています。
精度とスケールを指定しない場合、PostgreSQLは最大限の精度とスケールを使用します。

numeric2
numeric({ precision: 100 }) を使用して、精度が100桁のnumeric型のカラムを定義しています。
スケールは指定されていないため、PostgreSQLは自動的に適切なスケールを選択します。

numeric3
numeric({ precision: 100, scale: 20 }) を使用して、精度が100桁でスケールが20桁のnumeric型のカラムを定義しています。
これは、小数点以下20桁までの数値を格納できることを意味します。

numeric 型は、正確な数値を扱う場合に使用されます。特に、金融計算など、精度が重要なアプリケーションでよく使用されます。

numeric 型の精度は、小数点を含めた数値の最大桁数を指定します。

numeric 型のスケールは、小数点以下の最大桁数を指定します。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"numeric1" numeric,
	"numeric2" numeric(100),
	"numeric3" numeric(100, 20),
);

```



#### decimal

numericの別名。



#### real

単精度浮動小数点数（4バイト）

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html

```tsx
import { sql } from "drizzle-orm";
import { real, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	real1: real(),
	real2: real().default(10.10),
	real2: real().default(sql`'10.10'::real`),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"real1" real,
	"real2" real default 10.10,
	"real2" real default '10.10'::real
);

```



#### double precision

倍精度浮動小数点数（8バイト）

PostgreSQL: Documentation: 17: 8.1. Numeric Types

https://www.postgresql.org/docs/current/datatype-numeric.html

```tsx
import { sql } from "drizzle-orm";
import { doublePrecision, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	double1: doublePrecision(),
	double2: doublePrecision().default(10.10),
	double3: doublePrecision().default(sql`'10.10'::double precision`),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"double1" double precision,
	"double2" double precision default 10.10,
	"double3" double precision default '10.10'::double precision,
);

```



#### json

RFC 7159 で指定されているテキスト JSON データ。

PostgreSQL: Documentation: 17: 8.14. JSON Types

https://www.postgresql.org/docs/current/datatype-json.html

```tsx
import { sql } from "drizzle-orm";
import { json, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	json1: json(),
	json2: json().default({ foo: "bar" }),
	json3: json().default(sql`'{foo: "bar"}'::json`),
});

```


json1
json() を使用して、デフォルト値を設定しない json 型のカラムを定義しています。

json2
json().default({ foo: "bar" }) を使用して、デフォルト値としてJavaScriptオブジェクト { foo: "bar" } を持つ json 型のカラムを定義しています。

json3
json().default(sql\'{foo: "bar"}'::json`)を使用して、デフォルト値としてSQL式'{foo: "bar"}'::json'` を持つ json 型のカラムを定義しています。

json 型は、JSON形式のデータを格納するために使用されます。 jsonb 型も同様の目的で使用されますが、 jsonb 型はバイナリ形式でデータを格納するため、検索が高速になります。

Drizzle ORM では、 json 型のカラムにデフォルト値を設定する方法として、JavaScriptオブジェクトを直接指定する方法と、SQL式を使用する方法があります。

JavaScriptオブジェクトを直接指定する場合、 Drizzle ORM が自動的にJSON形式に変換してくれます。

SQL式を使用する場合、 ::json を使って値を json 型にキャストする必要があります。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"json1" json,
	"json2" json default '{"foo": "bar"}'::json,
	"json3" json default '{"foo": "bar"}'::json,
);

```

json オブジェクトの推論に .$type<...>() を指定できますが、実行時の値はチェックされません。

デフォルト値、insert、selectスキーマのコンパイル時の保護を提供します。



```tsx
// will be inferred as { foo: string }
json: json().$type<{ foo: string }>();

// will be inferred as string[]
json: json().$type<string[]>();

// won't compile
json: json().$type<string[]>().default({});

```

json 型のカラムの型推論とデフォルト値について

👆このコードは、**Drizzle ORM** を使ってPostgreSQLのテーブルを定義する際に、`json` 型のカラムにどのように型推論を指定し、デフォルト値を設定するかを示す例です。

*   **`json().$type<{ foo: string }>()`**
この例では、 `json()` 関数を使って **json** 型のカラムを定義し、 `$type<{ foo: string }>()` を使って、このカラムの値が `{ foo: string }` 型であることをTypeScriptに伝えています。

これは、データベースに格納されるJSONデータの構造をTypeScriptの型システムで表現することで、型安全性を確保することを目的としています。

*   **`json().$type<string[]>()`**: この例では、 `json()` 関数を使って **json** 型のカラムを定義し、 `$type<string[]>()` を使って、このカラムの値が `string[]` 型（文字列の配列）であることをTypeScriptに伝えています。

これも同様に、データベースに格納されるJSONデータの構造をTypeScriptの型システムで表現することで、型安全性を確保することを目的としています。



#### jsonb

分解されたバイナリ JSON データ。

PostgreSQL: Documentation: 17: 8.14. JSON Types

https://www.postgresql.org/docs/current/datatype-json.html

```tsx
import { jsonb, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	jsonb1: jsonb(),
	jsonb2: jsonb().default({ foo: "bar" }),
	jsonb3: jsonb().default(sql`'{foo: "bar"}'::jsonb`),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"jsonb1" jsonb,
	"jsonb2" jsonb default '{"foo": "bar"}'::jsonb,
	"jsonb3" jsonb default '{"foo": "bar"}'::jsonb,
);

```
json オブジェクトの推論に .$type<...>() を指定すると、実行時の値はチェックされません。 デフォルト値、insert、selectスキーマのコンパイル時の保護を提供します。

```tsx
// will be inferred as { foo: string }
jsonb: jsonb().$type<{ foo: string }>();

// will be inferred as string[]
jsonb: jsonb().$type<string[]>();

// won't compile
jsonb: jsonb().$type<string[]>().default({});

```



#### time

タイムゾーンの有無にかかわらず時刻。

PostgreSQL: Documentation: 17: 8.5. Date/Time Types

https://www.postgresql.org/docs/current/datatype-datetime.html

```tsx
import { time, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
  time1: time(),
  time2: time({ withTimezone: true }),
  time3: time({ precision: 6 }),
  time4: time({ precision: 6, withTimezone: true })
});

```

time 型のカラム定義について

*   **time1**: `time()` を使用して、タイムゾーン情報を持たない `time` 型のカラムを定義しています。
精度は指定されていないので、PostgreSQLのデフォルトの精度が使用されます。

*   **time2**:  `time({ withTimezone: true })` を使用して、タイムゾーン情報を持つ `time` 型のカラムを定義しています。
精度は指定されていないので、PostgreSQLのデフォルトの精度が使用されます。

*   **time3**:  `time({ precision: 6 })` を使用して、精度が6桁のタイムゾーン情報を持たない `time` 型のカラムを定義しています。

*   **time4**: `time({ precision: 6, withTimezone: true })` を使用して、精度が6桁のタイムゾーン情報を持つ `time` 型のカラムを定義しています。

`time` 型は、時刻を扱う場合に使用されます。 `withTimezone` オプションを指定することで、タイムゾーン情報を含めるかどうかを制御できます。

`precision` オプションを指定することで、小数点以下の桁数を指定できます。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"time1" time,
	"time2" time with timezone,
	"time3" time(6),
	"time4" time(6) with timezone,
);

```



#### timestamp

タイムゾーンの有無にかかわらず日付と時刻。

PostgreSQL: Documentation: 17: 8.5. Date/Time Types

https://www.postgresql.org/docs/current/datatype-datetime.html

```tsx
import { sql } from "drizzle-orm";
import { timestamp, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
  timestamp1: timestamp(),
	timestamp2: timestamp({ precision: 6, withTimezone: true }),
	timestamp3: timestamp().defaultNow(),
	timestamp4: timestamp().default(sql`now()`),
});

```

timestamp 型のカラム定義とデフォルト値について

*   **timestamp1**
`timestamp()` を使用して、タイムゾーン情報を持たない `timestamp` 型のカラムを定義しています。
精度は指定されていないので、PostgreSQL のデフォルトの精度が使用されます。

*   **timestamp2**
`timestamp({ precision: 6, withTimezone: true })` を使用して、精度が6桁のタイムゾーン情報を持つ `timestamp` 型のカラムを定義しています。

*   **timestamp3**
`timestamp().defaultNow()` を使用して、デフォルト値として `now()` 関数の値を持つ `timestamp` 型のカラムを定義しています。
`now()` 関数は、現在時刻を返します。

*   **timestamp4**
`timestamp().default(sql\`now()\`)` を使用して、デフォルト値としてSQL式 `now()` を持つ `timestamp` 型のカラムを定義しています。
`now()` 関数は、現在時刻を返します。

`timestamp` 型は、日付と時刻を扱う場合に使用されます。 `withTimezone` オプションを指定することで、タイムゾーン情報を含めるかどうかを制御できます。 `precision` オプションを指定することで、小数点以下の桁数を指定できます。

**Drizzle ORM** では、 `timestamp` 型のカラムにデフォルト値を設定する方法として、 `defaultNow()` 関数を使用する方法と、 `sql` タグを使ってSQL式を直接記述する方法があります。

*   `defaultNow()` 関数を使用する場合、カラムの値はテーブルにレコードが挿入されるたびに現在時刻に設定されます。

*   `sql` タグを使ってSQL式を直接記述する場合、より柔軟なデフォルト値の設定が可能になります。

例えば、特定の日付や時刻をデフォルト値として設定したり、他のカラムの値に基づいてデフォルト値を計算したりすることができます。

**補足**

*   `timestamp` 型には、日付を `Date` オブジェクトとして扱う `date` モードと、文字列として扱う `string` モードがあります。 `mode` オプションで指定できます。
*   `string` モードは、日付と文字列のマッピングを開発者自身が行いたい場合に使用します。
*   `date` モードでは、Drizzle がデータベースと JavaScript の `Date` オブジェクト間のマッピングを行います。
*   タイムゾーン情報を持つ `timestamp` 型 (`timestamp with timezone`) では、PostgreSQL インスタンスで設定されたタイムゾーンに変換された文字列が返されます。
*   PostgreSQL インスタンスのタイムゾーンは、 `show timezone;` というSQLクエリで確認できます。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"timestamp1" timestamp,
	"timestamp2" timestamp (6) with time zone,
	"timestamp3" timestamp default now(),
	"timestamp4" timestamp default now(),
);

```

日付または文字列のどちらの推論モードも指定できる：

```tsx
// will infer as date
timestamp: timestamp({ mode: "date" }),

// will infer as string
timestamp: timestamp({ mode: "string" }),

```

文字列モードはマッピングを行いません。

このモードはDrizzleORMに追加され、開発者が必要に応じて日付と日付のマッピングを自分で処理できるようにしました。

Drizzleは生の日付を文字列としてデータベースに渡したり、データベースから渡したりするので、動作はできるだけ予測可能で、データベースの動作と100%一致している必要があります。

日付モードは日付を扱う通常の方法です。

DrizzleはデータベースとJSDateオブジェクト間のマッピングをすべて行います。



timestamp と timestamp with timezone
のマッピングはどのように行われますか？

PostgreSQL のドキュメントには次のように記載されています:
タイムゾーンなしのtimestampと判定されたリテラルでは、PostgreSQLはタイムゾーンの表示を無視します。

つまり、結果の値は入力値の日付/時刻フィールドから生成され、時間帯の調整は行われません。



タイムゾーン付きtimestampの場合、内部的に格納される値は常にUTC（協定世界時、伝統的にはグリニッジ標準時、GMTとして知られています）です。

タイムゾーンが明示的に指定されている入力値は、そのタイムゾーンに適したオフセットを使用してUTCに変換されます。

入力文字列にタイムゾーンが指定されていない場合は、システムのTimeZoneパラメータで指定されたタイムゾーンであるとみなされ、そのタイムゾーンのオフセットを使用してUTCに変換されます。



そのため、timestamp with timezoneでは、Postgresインスタンスで設定されたタイムゾーンに変換された文字列が返されます。

👇このSQLクエリを使用してタイムゾーンを確認できます。

```tsx
show timezone;

```



#### date

カレンダーの日付（年、月、日）

PostgreSQL: Documentation: 17: 8.5. Date/Time Types

https://www.postgresql.org/docs/current/datatype-datetime.html

```tsx
import { date, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	date: date(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"date" date,
);

```

日付または文字列のどちらの推論モードも指定できます。

```tsx
// will infer as date
date: date({ mode: "date" }),

// will infer as string
date: date({ mode: "string" }),

```

#### interval

期間

PostgreSQL: Documentation: 17: 8.5. Date/Time Types

https://www.postgresql.org/docs/current/datatype-datetime.html

```tsx
import { interval, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
  interval1: interval(),
  interval2: interval({ fields: 'day' }),
  interval3: interval({ fields: 'month' , precision: 6 }),
});

```

interval 型のカラム定義について

* **interval1**
`interval()` を使用して、期間を表す `interval` 型のカラムを定義しています。フィールドや精度は指定されていないため、PostgreSQL のデフォルトの設定が使用されます。

* **interval2**
`interval({ fields: 'day' })` を使用して、日数を表す `interval` 型のカラムを定義しています。 `fields` オプションで `day` を指定することで、このカラムが日数を表すことを明示的に示しています。精度は指定されていないため、PostgreSQL のデフォルトの精度が使用されます。

* **interval3**
`interval({ fields: 'month', precision: 6 })` を使用して、月数を表す `interval` 型のカラムを定義しています。

`fields` オプションで `month` を指定することで、このカラムが月数を表すことを明示的に示しています。

`precision` オプションで `6` を指定することで、小数点以下の桁数を6桁に設定しています。

`interval` 型は、期間を表す場合に使用されます。

`fields` オプションで期間の単位を指定できます。

`precision` オプションで小数点以下の桁数を指定できます。

*   `interval` 型は、年、月、日、時、分、秒などの単位を組み合わせて期間を表すことができます。

*   `fields` オプションには、 `year`、`month`、`day`、`hour`、`minute`、`second` を指定できます。

*   `precision` オプションは、秒の単位に対してのみ有効です。

**interval 型のカラムの使用例**

以下は、`interval` 型のカラムの使用例です。

*   従業員の勤続年数を管理する
*   イベントの開催期間を管理する
*   タスクの所要時間を管理する
*   商品のレンタル期間を管理する

**interval 型の注意点**

*   `interval` 型は、PostgreSQL 固有の型です。
他のデータベースでは、異なる型を使用する必要があります。

*   `interval` 型の演算は、PostgreSQL のバージョンによって異なる場合があります。



```sql
CREATE TABLE IF NOT EXISTS "table" (
	"interval1" interval,
	"interval2" interval day,
	"interval3" interval(6) month,
);

```



#### point

幾何学的点型

PostgreSQL: Documentation: 17: 8.8. Geometric Types

https://www.postgresql.org/docs/current/datatype-geometric.html#DATATYPE-GEOMETRIC-POINTS

タイプには、pointデータベースからのマッピング用の 2 つのモードがあります:tupleおよびxy。

* tuple挿入時に受け入れられ、選択時にタプルにマップされます。したがって、データベース Point(1,2) は、drizzle で [1,2] として型指定されます。

*xy挿入に受け入れられ、選択時にx、y座標を持つオブジェクトにマップされます。したがって、データベースのPoint(1,2)は{ x: 1, y: 2 }drizzleで次のように型付けされます。

```tsx
const items = pgTable('items', {
 point: point(),
 pointObj: point({ mode: 'xy' }),
});

```

point 型のカラム定義について

* **point**
 `point()` を使用して、`point` 型のカラムを定義しています。
モードは指定されていないため、デフォルトの `tuple` モードが使用されます。

*   **pointObj**
`point({ mode: 'xy' })` を使用して、 `xy` モードの `point` 型のカラムを定義しています。

`point` 型は、2次元空間上の点を表す場合に使用されます。

`point` 型には、 `tuple` モードと `xy` モードの2つのモードがあります。

* **tuple** モード
挿入時にタプルを受け入れ、選択時にタプルにマップされます。
データベースの `Point(1,2)` は、Drizzle では  として型付けされます。

* **xy** モード
挿入時に `{x, y}` 形式のオブジェクトを受け入れ、選択時に `{x, y}` 形式のオブジェクトにマップされます。
データベースの `Point(1,2)` は、Drizzle では `{ x: 1, y: 2 }` として型付けされます。

* `point` 型は、PostgreSQL 固有の型です。
他のデータベースでは、異なる型を使用する必要があります。

```sql
CREATE TABLE IF NOT EXISTS "items" (
  "point" point,
  "pointObj" point,
);

```



#### line

幾何学的な線の種類

PostgreSQL: Documentation: 17: 8.8. Geometric Types

https://www.postgresql.org/docs/current/datatype-geometric.html#DATATYPE-LINE

タイプには、lineデータベースからのマッピング用の 2 つのモードがあります:tupleおよびabc。

* tuple挿入時に受け入れられ、選択時にタプルにマップされます。したがって、データベースの Line3 は、drizzle で [1,2,3] として型指定されます。

* abc挿入に受け入れられ、選択時に方程式の定数 a、b、c を持つオブジェクトにマップされますAx + By + C = 0。

したがって、データベースの Line3 は{ a: 1, b: 2, c: 3 }drizzle のように型指定されます。

```tsx
const items = pgTable('items', {
 line: line(),
 lineObj: point({ mode: 'abc' }),
});

```

幾何学的な線の種類について

`pgTable` 関数は、 `items` という名前のテーブルを作成します。

このテーブルには、 `line` と `lineObj` という2つのカラムがあり、どちらも幾何学的な線を表すために使用されます。

`line` 型は、PostgreSQLで幾何学的な線を表すために使用されます。 `line` 型には、 `tuple` モードと `abc` モードの2つのモードがあります。

**tupleモード**:

*   データベースへの挿入時: タプル `(1,2,3)` の形式で値を受け入れます。
*   データベースからの選択時: タプル  の形式で値が返されます。

**abcモード**:

*   データベースへの挿入時: 方程式 `Ax + By + C = 0` の係数 `a`、`b`、`c` を持つオブジェクト `{ a: 1, b: 2, c: 3 }` の形式で値を受け入れます。

*   データベースからの選択時:  方程式 `Ax + By + C = 0` の係数 `a`、`b`、`c` を持つオブジェクト `{ a: 1, b: 2, c: 3 }` の形式で値が返されます。

ソースには、 `line` 型のカラムにデフォルト値を設定する方法に関する情報はありません。



**line 型の使用例**:

*   地図上の道路や経路を表現する
*   CAD図面などの設計図で線分を表現する
*   グラフやチャートで線グラフを表現する



**line 型の注意点**:

*   `line` 型はPostgreSQL固有の型であり、他のデータベースシステムでは異なる型を使用する必要がある可能性があります。



```sql
CREATE TABLE IF NOT EXISTS "items" (
	"line" line,
	"lineObj" line,
);

```



#### enum

列挙型 (enum) は、静的で順序付けられた値のセットで構成されるデータ型です。

これらは、多くのプログラミング言語でサポートされている列挙型と同等です。

列挙型の例としては、曜日や、データの状態値のセットなどが挙げられます。

PostgreSQL: Documentation: 17: 8.7. Enumerated Types

https://www.postgresql.org/docs/current/datatype-enum.html

```tsx
import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy']);

export const table = pgTable('table', {
  mood: moodEnum(),
});

```

列挙型（enum）について

**列挙型の例**としては、曜日やデータの状態値のセットなどが挙げられます。

Drizzle ORMを使用してPostgreSQLのテーブルを定義する方法を示しており、 `pgEnum` 関数を使って作成したカスタム列挙型 `moodEnum` をカラムの型として使用する方法です。

**コードの解説**

1.  **pgEnum 関数による列挙型の定義:**
    *   `pgEnum('mood', ['sad', 'ok', 'happy'])` によって、`mood` という名前の列挙型が定義され、可能な値として `'sad'`、`'ok'`、`'happy'` が設定されています。

2.  **pgTable 関数によるテーブルの定義:**
    *   `pgTable('table', { mood: moodEnum() })` によって、`table` という名前のテーブルが定義され、その中に `mood` というカラムが定義されています。
    *   `mood` カラムの型には、先ほど定義した `moodEnum` が指定されています。



**pgEnum 関数と pgTable 関数の詳細**

*   **pgEnum 関数**: PostgreSQL の `ENUM` 型を作成するための関数です。 `ENUM` 型は、あらかじめ定義された値の集合から値をとるデータ型です。

*   **pgTable 関数**: PostgreSQL のテーブルを作成するための関数です。



**列挙型を使用するメリット**

*   **データの整合性確保**: テーブルのカラムに特定の値のみを許可することで、データベースの整合性を高めることができます。

*   **コードの可読性向上**: 列挙型を使用することで、コードがより読みやすくなります。

**列挙型を使用する際の注意点**

*   **値の変更不可**:  `ENUM` 型の値は、一度定義すると変更することができません。



```sql
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');

CREATE TABLE IF NOT EXISTS "table" (
	"mood" mood,
);

```



#### Customizing data type

すべての列ビルダーには.$type()、列のデータ型をカスタマイズできるメソッドがあります。

これは、たとえば、不明なタイプやブランド化されたタイプの場合に役立ちます。

```tsx
type UserId = number & { __brand: 'user_id' };
type Data = {
	foo: string;
	bar: number;
};

const users = pgTable('users', {
  id: serial().$type<UserId>().primaryKey(),
  jsonField: json().$type<Data>(),
});

```



#### Identity Columns

PostgreSQL は、列に一意の整数値を自動的に生成する方法として ID 列をサポートしています。

これらの値はシーケンスを使用して生成され、GENERATED AS IDENTITY 句を使用して定義できます。



##### ID 列の種類

* GENERATED ALWAYS AS IDENTITY: データベースは常に列の値を生成します。
OVERRIDING SYSTEM VALUE 句を使用しない限り、この列への手動挿入または更新は許可されません。

* GENERATED BY DEFAULT AS IDENTITY: データベースはデフォルトで値を生成しますが、手動で値を挿入または更新することもできます。
手動で値を指定すると、システム生成値の代わりにその値が使用されます。



##### 主な特徴

* 自動値生成: シーケンスを利用して、新しい行ごとに一意の値を生成します。

* カスタマイズ可能なシーケンス オプション: 開始値、増分、その他のシーケンス オプションを定義できます。

* 複数の ID 列のサポート: PostgreSQL では、テーブルごとに複数の ID 列を使用できます。



##### 制限事項

* 手動挿入の制限: GENERATED ALWAYS AS IDENTITY で定義された列の場合、手動挿入または更新には OVERRIDING SYSTEM VALUE 句が必要です。

* シーケンス制約: ID 列はシーケンスに依存するため、競合やギャップを回避するためにシーケンスを正しく管理する必要があります。



##### 使用例

```tsx
import { pgTable, integer, text } from 'drizzle-orm/pg-core'

export const ingredients = pgTable("ingredients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: text().notNull(),
  description: text(),
});

```

関数内でシーケンスに使用可能なすべてのプロパティを指定できます.generatedAlwaysAsIdentity()。さらに、これらのシーケンスにカスタム名を指定することもできます。

PostgreSQL: Documentation: 17: CREATE TABLE

https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-GENERATED-IDENTITY



#### Default value

句DEFAULTは、 を実行する際にユーザーが明示的に値を指定しなかった場合に、列に使用するデフォルト値を指定します。

列定義にINSERT明示的な句が添付されていない場合DEFAULT、列のデフォルト値は になりますNULL。

明示的なDEFAULT句では、デフォルト値がNULL、文字列定数、BLOB 定数、符号付き数値、または括弧で囲まれた任意の定数式であることを指定できます。

```tsx
import { sql } from "drizzle-orm";
import { integer, pgTable, uuid } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	integer1: integer().default(42),
	integer2: integer().default(sql`'42'::integer`),
	uuid1: uuid().defaultRandom(),
	uuid2: uuid().default(sql`gen_random_uuid()`),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"integer1" integer DEFAULT 42,
	"integer2" integer DEFAULT '42'::integer,
	"uuid1" uuid DEFAULT gen_random_uuid(),
	"uuid2" uuid DEFAULT gen_random_uuid()
);

```

$default()またはを使用すると$defaultFn()、同じ関数の異なるエイリアスが簡単に生成され、実行時にデフォルトを生成して、すべての挿入クエリでこれらの値を使用できます。

uuidこれらの関数はcuidなどのさまざまな実装を活用するのに役立ちます。

```tsx
import { text, pgTable } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';

const table = pgTable('table', {
	id: text().$defaultFn(() => createId()),
});

```

$onUpdate()またはを使用すると$onUpdateFn()、同じ関数の異なるエイリアスであるだけで、実行時にデフォルトを生成し、すべての更新クエリでこれらの値を使用できます。

動的な更新値を列に追加します。

行が更新されると関数が呼び出され、返された値が列値として使用されます (何も指定されていない場合)。

デフォルト値 (または $defaultFn) が指定されていない場合は、行が挿入されるときにも関数が呼び出され、返された値が列値として使用されます。

```tsx
import { integer, timestamp, text, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	updateCounter: integer().default(sql`1`).$onUpdateFn((): SQL => sql`${table.update_counter} + 1`),
	updatedAt: timestamp({ mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    	alwaysNull: text().$type<string | null>().$onUpdate(() => null),
});

```

SQL テーブル定義におけるカラムの更新動作について

カラムの更新時に特定の動作を実行する方法に焦点を当てています。

`pgTable` 関数は、 `table` という名前のテーブルを作成します。このテーブルには、 `updateCounter`、 `updatedAt`、 `alwaysNull` という3つのカラムがあります。各カラムには、更新時に特定の動作を実行するための関数が定義されています。



**各カラムの更新動作の詳細**

*   **updateCounter**: `integer()` を使用して整数型のカラムとして定義され、デフォルト値として `1` が設定されています。
 `$onUpdateFn()` 関数を使用して、更新時にカラムの値を1増やす動作が定義されています。この関数は、SQL構文を使用して `table.update_counter + 1` という式を返すことで実現されています。

*   **updatedAt**: `timestamp({ mode: 'date', precision: 3 })` を使用してタイムスタンプ型のカラムとして定義されています。
`mode: 'date'` は、値が日付として解釈されることを指定し、 `precision: 3` はミリ秒単位の精度を指定します。
`$onUpdate()` 関数を使用して、更新時にカラムの値を現在時刻に更新する動作が定義されています。
この関数は、 `new Date()` を返すことで実現されています。

*   **alwaysNull**: `text().$type<string | null>()` を使用してテキスト型のカラムとして定義され、 `string | null` 型として型付けされています。
`$onUpdate()` 関数を使用して、更新時にカラムの値を常に `null` に設定する動作が定義されています。
この関数は、 `null` を返すことで実現されています。

**$onUpdate() 関数と $onUpdateFn() 関数の詳細**

*   **$onUpdate() 関数**: カラムが更新されたときに実行される関数を指定します。
関数は、新しいカラム値として使用される値を返す必要があります。

*   **$onUpdateFn() 関数**:  `$onUpdate()` 関数と同様に、カラムが更新されたときに実行される関数を指定します。
ただし、 `$onUpdateFn()` 関数はSQL構文を使用して新しいカラム値を計算できます。



**カラム更新関数の使用例**

*   **updateCounter**: レコードの更新回数を追跡するために使用できます。

*   **updatedAt**: レコードが最後に更新された日時を追跡するために使用できます。

*   **alwaysNull**: 特定の条件下でカラムを常に `null` に設定するために使用できます。



#### Not null

NOT NULL制約は、関連付けられた列にNULL値が含まれていないことを規定します。

```tsx
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	integer: integer().notNull(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"integer" integer NOT NULL,
);

```



#### Primary key

主キー制約は、列または列のグループをテーブル内の行の一意の識別子として使用できることを示します。
この場合、値は一意であり、null ではないことが必要です。

```tsx
import { serial, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
	id: serial().primaryKey(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
	"id" serial PRIMARY KEY NOT NULL,
);

```

---

## Indexes & Constraints

Drizzle ORMのインデックスおよび制約について説明します。



### Constraints 制約

SQL制約とは、テーブルのカラムに適用されるルールです。

無効なデータがデータベースに入力されるのを防ぐために使用されます。
これにより、データベース内のデータの正確性と信頼性が保証されます。



### Default値

DEFAULT句は、INSERT時にユーザから値が提供されなかった場合に、そのカラムに使用するデフォルト値を指定します。

明示的なDEFAULT句が列定義に付加されていない場合、その列のデフォルト値はNULLです。

明示的なDEFAULT句は、デフォルト値がNULL、文字列定数、ブロブ定数、符号付き数値、または括弧で囲まれた定数式を指定できます。



```tsx
import { sql } from "drizzle-orm";
import { integer, uuid, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
  integer1: integer('integer1').default(42),
  integer2: integer('integer2').default(sql`'42'::integer`),
  uuid1: uuid('uuid1').defaultRandom(),
  uuid2: uuid('uuid2').default(sql`gen_random_uuid()`),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
  "integer1" integer DEFAULT 42,
  "integer2" integer DEFAULT '42'::integer,
  "uuid1" uuid DEFAULT gen_random_uuid(),
  "uuid2" uuid DEFAULT gen_random_uuid()
);

```



### Not null

デフォルトでは、カラムはNULL値を保持できます。

NOT NULL制約は、カラムがNULL値を受け付けないように強制します。

つまり、このフィールドに値を追加しない限り、新しいレコードを挿入したり、レコードを更新したりすることはできません。

```tsx
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable('table', {
  integer: integer('integer').notNull(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "table" (
  "integer" integer NOT NULL,
);

```



### Unique

UNIQUE制約は、列内のすべての値が異なることを保証します。

UNIQUE制約とPRIMARYKEY制約はどちらも、列または列の集合の一意性を保証します。

PRIMARYKEY制約は自動的にUNIQUE制約を持ちます。

1つのテーブルに多くのUNIQUE制約を持つことはできますが、PRIMARY KEY制約は1つだけです。

```tsx
import { integer, text, unique, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  id: integer('id').unique(),
});

export const table = pgTable('table', {
  id: integer('id').unique('custom_name'),
});

export const composite = pgTable('composite_example', {
  id: integer('id'),
  name: text('name'),
}, (t) => ({
  unq: unique().on(t.id, t.name),
  unq2: unique('custom_name').on(t.id, t.name)
}));

// In Postgres 15.0+ NULLS NOT DISTINCT is available
// This example demonstrates both available usages
export const userNulls = pgTable('user_nulls_example', {
  id: integer('id').unique("custom_name", { nulls: 'not distinct' }),
}, (t) => ({
  unq: unique().on(t.id).nullsNotDistinct()
}));

```

```sql
CREATE TABLE IF NOT EXISTS "composite_example" (
  "id" integer,
  "name" text,
  CONSTRAINT "composite_example_id_name_unique" UNIQUE("id","name"),
  CONSTRAINT "custom_name" UNIQUE("id","name")
);

CREATE TABLE IF NOT EXISTS "table" (
	"id" integer,
	CONSTRAINT "custom_name" UNIQUE("id")
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" integer,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);

CREATE TABLE IF NOT EXISTS "user_nulls_example" (
  "id" integer,
  CONSTRAINT "custom_name" UNIQUE NULLS NOT DISTINCT("id"),
  CONSTRAINT "user_nulls_example_id_unique" UNIQUE NULLS NOT DISTINCT("id")
);

```



### Check

Check制約は、カラムに配置できる値の範囲を制限するために使用されます。

列にCHECK制約を定義すると、その列の特定の値のみを許可します。

テーブルにCHECK制約を定義すると、行の他の列の値に基づいて、特定の列の値を制限できます。



```tsx
import { sql } from "drizzle-orm";
import { check, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey(),
    username: text().notNull(),
    age: integer(),
  },
  (table) => ({
    checkConstraint: check("age_check1", sql`${table.age} > 21`),
  })
);

```

SQL テーブル定義と制約について

**各カラムの詳細**

*   **id**: `uuid().defaultRandom().primaryKey()` を使用してUUID型のカラムとして定義され、主キーとして設定されています。`defaultRandom()` は、新しいレコードが挿入されるたびにランダムなUUIDが生成されることを指定します。
*   **username**: `text().notNull()` を使用してテキスト型のカラムとして定義され、NULL値を許可しないように設定されています。
*   **age**:  `integer()` を使用して整数型のカラムとして定義されています。

**チェック制約**

テーブル定義の3番目の引数として、 `checkConstraint` という名前のチェック制約が定義されています。
この制約は、`age` カラムの値が21より大きいことを保証します。

*   `check("age_check1", sql\`${table.age} > 21\`)` によって、`age_check1` という名前のチェック制約が定義され、SQL構文を使用して `table.age > 21` という条件が指定されています。

**pgTable 関数の詳細**

*   **pgTable 関数**: PostgreSQL のテーブルを作成するための関数です。
*   **check 関数**: テーブルにチェック制約を追加するための関数です。

**チェック制約を使用するメリット**

*   **データの整合性確保**: テーブルのカラムに特定の条件を満たす値のみを許可することで、データベースの整合性を高めることができます。

**チェック制約を使用する際の注意点**

*   **PostgreSQL 固有**:  `check` 関数で作成したチェック制約は、PostgreSQL 固有の機能です。他のデータベースでは、異なる方法でチェック制約を定義する必要があります。
*   **パフォーマンスへの影響**: チェック制約は、データの挿入や更新時にパフォーマンスに影響を与える可能性があります。



```sql
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "username" text NOT NULL,
    "age" integer,
    CONSTRAINT "age_check1" CHECK ("users"."age" > 21)
);

```


### Primary Key

PRIMARYKEY制約は、テーブル内の各レコードを一意に識別します。

プライマリ・キーはUNIQUE値を含む必要があり、NULL値を含むことはできません。

テーブルには1つのプライマリ・キーのみを持つことができ、このプライマリ・キーは単一または複数のカラム（フィールド）で構成できます。

```tsx
import { serial, text, pgTable } from "drizzle-orm/pg-core";

const user = pgTable('user', {
  id: serial('id').primaryKey(),
});

const table = pgTable('table', {
  id: text('cuid').primaryKey(),
});

```

```sql
CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS "table" (
  "cuid" text PRIMARY KEY,
);

```

### Composite Primary Key

PRIMARYKEYと同様に、複合プライマリキーも複数のフィールドを使ってテーブルの各レコードを一意に識別します。

DrizzleORMはそのための独立したprimaryKey演算子を提供しています。

```tsx
import { serial, text, integer, primaryKey, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const book = pgTable("book", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const booksToAuthors = pgTable("books_to_authors", {
  authorId: integer("author_id"),
  bookId: integer("book_id"),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.bookId, table.authorId] }),
    pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] }),
  };
});

```

```sql
...
CREATE TABLE IF NOT EXISTS "books_to_authors" (
  "author_id" integer,
  "book_id" integer,
  PRIMARY KEY("book_id","author_id"),
);

ALTER TABLE "books_to_authors" ADD CONSTRAINT "custom_name" PRIMARY KEY("book_id","author_id");

```



### Foreign key

FOREIGNKEY制約は、テーブル間のリンクを破壊するようなアクションを防ぐために使用されます。

FOREIGNKEYは、あるテーブルのフィールド（またはフィールドの集まり）で、別のテーブルのPRIMARYKEYを参照します。

外部キーを持つテーブルは子テーブルと呼ばれ、主キーを持つテーブルは被参照テーブルまたは親テーブルと呼ばれます。



DrizzleORMには外部キーを宣言する方法がいくつかあります。

カラム宣言文で宣言できます。

```tsx
import { serial, text, integer, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
});

export const book = pgTable("book", {
  id: serial("id"),
  name: text("name"),
  authorId: integer("author_id").references(() => user.id)
});

```

自己参照を行いたい場合は、TypeScript の制限により、参照コールバックの戻り値の型を明示的に設定するか、単体の foreignKey 演算子を使用する必要があります。

```tsx
import { serial, text, integer, foreignKey, pgTable, AnyPgColumn } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  parentId: integer("parent_id").references((): AnyPgColumn => user.id)
});

// or
export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  parentId: integer("parent_id"),
}, (table) => {
  return {
    parentReference: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "custom_fk"
    }),
  };
});

```

複数列の外部キーを宣言するには、専用の foreignKey 演算子を使用できます。

```tsx
import { serial, text, foreignKey, pgTable, AnyPgColumn } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  firstName: text("firstName"),
  lastName: text("lastName"),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.firstName, table.lastName]}),
  };
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  userFirstName: text("user_first_name"),
  userLastName: text("user_last_name"),
}, (table) => {
  return {
    userReference: foreignKey({
      columns: [table.userFirstName, table.userLastName],
      foreignColumns: [user.firstName, user.lastName]
      name: "custom_fk"
    })
  }
})

```



### Indexes

Drizzle ORMはインデックス宣言とユニークインデックス宣言の両方のAPIを提供します。

```tsx
import { serial, text, index, uniqueIndex, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
}, (table) => {
  return {
    nameIdx: index("name_idx").on(table.name),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  };
});

```

```sql
CREATE TABLE "user" (
  ...
);

CREATE INDEX "name_idx" ON "user" ("name");
CREATE UNIQUE INDEX "email_idx" ON "user" ("email");

```

```tsx
// First example, with `.on()`
index('name')
  .on(table.column1.asc(), table.column2.nullsFirst(), ...) or .onOnly(table.column1.desc().nullsLast(), table.column2, ...)
  .concurrently()
  .where(sql``)
  .with({ fillfactor: '70' })

// Second Example, with `.using()`
index('name')
  .using('btree', table.column1.asc(), sql`lower(${table.column2})`, table.column1.op('text_ops'))
  .where(sql``) // sql expression
  .with({ fillfactor: '70' })

```

---



## Sequences

Drizzle ORM - シーケンス (Sequences)

Drizzle ORMのシーケンス機能は、データベースで一意の番号を生成するために使用されます。これは主に、主キーの自動生成に非常に便利です。



### シーケンスとは？

* 定義
シーケンスは、連続した数字の列を生成するデータベースオブジェクトです。主に、一意の識別子や自動インクリメントの主キーを作成するために使用されます。

* 用途
データレコードを挿入する際に新しいシーケンス番号を利用して、各レコードに一意の値を割り当てます。

PostgreSQLにおけるシーケンスは、一意な識別子を生成するために作成された特別な単一行テーブルで、主キー値の自動インクリメントによく使用されます。

複数のセッションにまたがって一意なシーケンシャル値を生成するスレッドセーフな方法を提供します。

### 主な機能

#### 作成と初期化

新しいシーケンスを作成するにはCREATE SEQUENCEを使用します。

インクリメント値、開始値、最小/最大値、キャッシュ・サイズなどのパラメータを指定できます。



#### 操作関数

* nextval('sequence_name')： シーケンスを進め、次の値を返します。

* currval('sequence_name')： 現在のセッションのシーケンスの現在値を返す。

* setval('sequence_name', value)： シーケンスの現在値を設定する。

* lastval()： 現在のセッションで nextval が最後に返した値を返す。

#### 所有

シーケンスは、OWNED BY句を使用してテーブル・カラムにリンクできます。
テーブルや列を削除すると、関連するシーケンスも自動的に削除されます。

#### 循環

シーケンスは、CYCLEオプションを使用して、最大値または最小値に達したときに循環するように設定できます。デフォルトはNO CYCLEです。

#### キャッシュ

CACHEオプションを使用すると、シーケンス値を事前に割り当ててパフォーマンスを向上させることができます。



### 制限事項

* ギャップ
シーケンスはギャップレスではありません。
トランザクションの中断やクラッシュにより、シーケンス値にギャップが生じることがあります。

* 同時実行
シーケンスはセッション間で一意な値を提供するが、すべてのセッションを考慮した場合、値の順序がずれる可能性があります。

* ロールバックなし
シーケンスの変更は、トランザクションが失敗してもロールバックされません。
これにより一意な値が保証されるが、ギャップが生じる可能性があります。

* クラッシュリカバリ
ログに記録されていないシーケンスや、クラッシュ前に変更されたシーケンスは、以前の状態に正しく復元されない可能性があります。



### 実際の使用例

* デフォルトの動作
デフォルトでは、シーケンスは1ずつ増加し、1から始まります。

* カスタム動作
カスタム開始点、増分、最小/最大値、サイクリングを指定できます。

* 関連付け
一意な識別子の管理をシームレスにする、自動インクリメントフィールドのためのテーブルカラムとの一般的な関連付け。



```tsx
import { pgSchema, pgSequence } from "drizzle-orm/pg-core";

// No params specified
export const customSequence = pgSequence("name");

// Sequence with params
export const customSequence = pgSequence("name", {
      startWith: 100,
      maxValue: 10000,
      minValue: 100,
      cycle: true,
      cache: 10,
      increment: 2
});

// Sequence in custom schema
export const customSchema = pgSchema('custom_schema');
export const customSequence = customSchema.sequence("name");

```

Drizzle ORMにおけるシーケンスの定義方法

### シーケンスとは？

シーケンスは、データベース内で一意の連続した数値を生成するオブジェクトです。
主キー値の自動インクリメントによく使用されます。

### pgSequence関数

`pgSequence` 関数は、シーケンスを作成するための関数です。
シーケンス名は必須の引数です。

### シーケンスパラメータ

`pgSequence` 関数の2番目の引数として、シーケンスのパラメータを指定できます。

*   `startWith`: シーケンスの開始値を指定します。デフォルトは1です。
*   `maxValue`: シーケンスの最大値を指定します。
*   `minValue`: シーケンスの最小値を指定します。
*   `cycle`: シーケンスが最大値に達したときに、最小値から再開するかどうかを指定します。デフォルトはfalseです。
*   `cache`: シーケンス値のキャッシュサイズを指定します。
*   `increment`: シーケンスの増分値を指定します。デフォルトは1です。

### カスタムスキーマでのシーケンス定義

`pgSchema` 関数を使用してカスタムスキーマを作成し、そのスキーマ内でシーケンスを定義できます。

### コード例解説

1.  **パラメータなしのシーケンス**

```tsx
export const customSequence = pgSequence("name");

```

    この例では、"name"という名前のシーケンスが、デフォルトのパラメータで作成されます。

2.  **パラメータありのシーケンス**

```tsx
export const customSequence = pgSequence("name", {
      startWith: 100,
      maxValue: 10000,
      minValue: 100,
      cycle: true,
      cache: 10,
      increment: 2
});

```

この例では、"name"という名前のシーケンスが、指定されたパラメータで作成されます。

*   シーケンスは100から開始し、最大値は10000、最小値は100です。
*   シーケンスは最大値に達すると、最小値から再開します。
*   シーケンス値は10個までキャッシュされます。
*   シーケンスは2ずつ増加します。

3.  **カスタムスキーマでのシーケンス**

```tsx
export const customSchema = pgSchema('custom_schema');
export const customSequence = customSchema.sequence("name");

```

この例では、"custom\_schema"という名前のカスタムスキーマが作成され、そのスキーマ内で"name"という名前のシーケンスがデフォルトのパラメータで作成されます。



---

## Views

DrizzleORMでビューを宣言する方法はいくつかあります。

作成するビューを宣言することもできますし、すでにデータベースに存在するビューを宣言することもできます。

インラインクエリビルダ構文、スタンドアロンクエリビルダ、生のSQL演算子を使ってビューを宣言できます。

インラインクエリビルダでもスタンドアロンクエリビルダでもビューを作成すると、ビューカラムのスキーマは自動的に推測されます。

Drizzle ORM - ビュー (Views)

DrizzleORMのビュー機能は、データベース内のクエリ結果を仮想テーブルとして保存する方法です。

ビューを使用すると、複雑なクエリを簡略化し、再利用可能なデータセットを作成できます。



### ビューとは？

定義ビューは、SELECT文を使って生成される仮想テーブルです。

実際のデータを持っているわけではなく、基になるテーブルからデータを取得します。

用途データの抽象化や、特定のクエリの結果を簡単に参照できるようにするために使用されます。



### ビューの利点

1. 簡略化複雑なクエリを単純化し、ユーザーが簡単にデータにアクセスできるようにします。

2. セキュリティ特定の列や行を隠すことで、データへのアクセスを制限できます。

3. 再利用性同じクエリを何度も書く必要がなくなり、コードの再利用が可能になります。



### ビューの作成

ビューは以下のように作成します。

```sql
CREATE VIEW active_users AS
SELECT id, username
FROM users
WHERE is_active = true;

```

上記の例では、`active_users`というビューを作成し、`users`テーブルからアクティブなユーザーのIDとユーザー名を取得します。



### ビューの使用

ビューを使用する際は、通常のテーブルと同様にクエリを実行できます。

```sql
SELECT FROM active_users;

```

これにより、アクティブなユーザーの情報が取得されます。



### ビューの更新

ビューは通常、更新することができませんが、特定の条件を満たす場合、更新可能なビューを作成することもできます。



### まとめ

ビューは、データベースのデータを簡潔に扱うための強力なツールです。

複雑なクエリを簡略化し、データのセキュリティを高め、再利用性を向上させることができます。



#### Declaring views

```tsx
// schema.ts
import { pgTable, pgView, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial(),
  name: text(),
  email: text(),
  password: text(),
  role: text().$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userView = pgView("user_view").as((qb) => qb.select().from(user));
export const customersView = pgView("customers_view").as((qb) => qb.select().from(user).where(eq(user.role, "customer")));

```

Drizzle ORM を使ったビュー定義について

このコードは、Drizzle ORM を使用して PostgreSQL のビューを定義する方法を示しています。



#### テーブル定義

まず、`user` テーブルを定義しています。

*   `id`: `serial()` を使用して、自動インクリメントする整数型の主キーとして定義されています。
*   `name`, `email`, `password`: `text()` を使用して、テキスト型のカラムとして定義されています。
*   `role`: `text().$type<"admin" | "customer">()` を使用して、"admin" または "customer" のいずれかの値のみを持つテキスト型のカラムとして定義されています。
*   `createdAt`, `updatedAt`: `timestamp()` を使用して、タイムスタンプ型のカラムとして定義されています。



#### ビュー定義

次に、`user` テーブルに基づいて2つのビューを定義しています。

*   **userView**: `user` テーブルの全カラムを選択するビューです。 `qb.select().from(user)` によって、`user` テーブルからすべてのカラムを選択するクエリがビューの定義として使用されています。
*   **customersView**:  `role` カラムが "customer" であるユーザーのみを選択するビューです。 `qb.select().from(user).where(eq(user.role, "customer"))` によって、`user` テーブルから `role` カラムが "customer" である行のみを選択するクエリがビューの定義として使用されています。

#### pgView 関数の詳細

*   `pgView` 関数: PostgreSQL のビューを作成するための関数です。
*   `as` メソッド: ビューの定義を指定するために使用されます。クエリビルダ (`qb`) を使用して、ビューの SELECT 文を定義できます。

#### ビューを使用するメリット

*   **複雑なクエリの簡素化**: 複雑なクエリをビューとして定義することで、クエリの再利用性を高め、可読性を向上させることができます。
*   **データのセキュリティ向上**: ビューを使用して、ユーザーに特定のカラムや行へのアクセスのみを許可することができます。
*   **データの一貫性確保**: ビューを使用して、データの整合性を確保することができます。



```sql
CREATE VIEW "user_view" AS SELECT * FROM "user";
CREATE VIEW "customers_view" AS SELECT * FROM "user" WHERE "role" = 'customer';

```

カラムのサブセットが必要な場合は、クエリビルダーの.select({ ... })メソッドを使うことができます。

```tsx
export const customersView = pgView("customers_view").as((qb) => {
  return qb
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(user);
});

```

```sql
CREATE VIEW "customers_view" AS SELECT "id", "name", "email" FROM "user" WHERE "role" = 'customer';

```

スタンドアローンのクエリビルダを使用してビューを宣言することもできます。

```tsx
import { pgTable, pgView, serial, text, timestamp, QueryBuilder} from "drizzle-orm/pg-core";

const qb = new QueryBuilder();

export const user = pgTable("user", {
  id: serial(),
  name: text(),
  email: text(),
  password: text(),
  role: text().$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userView = pgView("user_view").as(qb.select().from(user));
export const customersView = pgView("customers_view").as(qb.select().from(user).where(eq(user.role, "customer")));

```

```sql
CREATE VIEW "user_view" AS SELECT * FROM "user";
CREATE VIEW "customers_view" AS SELECT * FROM "user" WHERE "role" = 'customer';

```



### Declaring views with raw SQL

クエリビルダがサポートしていない構文を使用してビューを宣言する必要がある場合は、直接 sql 演算子を使用して明示的にビュー列スキーマを指定できます。

```tsx
// regular view
const newYorkers = pgView('new_yorkers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  cityId: integer('city_id').notNull(),
}).as(sql`select * from ${users} where ${eq(users.cityId, 1)}`);

// materialized view
const newYorkers = pgMaterializedView('new_yorkers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  cityId: integer('city_id').notNull(),
}).as(sql`select * from ${users} where ${eq(users.cityId, 1)}`);

```



### Declaring existing views

データベース内の既存のビューへの読み取り専用アクセスが提供されている場合は、.existing() ビュー設定を使用する必要があります。

```tsx
export const user = pgTable("user", {
  id: serial(),
  name: text(),
  email: text(),
  password: text(),
  role: text().$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// regular view
export const trimmedUser = pgView("trimmed_user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
}).existing();

// materialized view won't make any difference, yet you can use it for consistency
export const trimmedUser = pgMaterializedView("trimmed_user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
}).existing();

```



### Materialized views

マテリアライズド・ビュー

PostgreSQLのマテリアライズドビューは、ビューと同様にルールシステムを使用しますが、結果はテーブルのような形式で保存されます。

Drizzle ORMはPostgreSQLのマテリアライズドビューをネイティブでサポートしています。

```tsx
// schema.ts
const newYorkers = pgMaterializedView('new_yorkers').as((qb) => qb.select().from(users).where(eq(users.cityId, 1)));

```

マテリアライズドビュー

例の`newYorkers` について

このコードは、Drizzle ORM を使用して、`newYorkers` という **マテリアライズドビュー** を定義しています。

マテリアライズドビューとは？

マテリアライズドビューは、ビュー定義のクエリ結果を **物理的に保存** するビューです。

通常のビューはクエリを実行するたびに結果を計算しますが、マテリアライズドビューは事前に計算された結果を返すため、パフォーマンスが向上します。

しかし、マテリアライズドビューは定期的に、または手動で更新する必要があります。

元のテーブルが更新されても、マテリアライズドビューは自動的には更新されないことに注意してください。

#### コードの詳細

*   `pgMaterializedView('new_yorkers')`: `newYorkers` という名前のマテリアライズドビューを作成します。
*   `.as((qb) => ...)`: ビューの定義をクエリビルダ (`qb`) を使用して指定します。
*   `qb.select().from(users)`: `users` テーブルからすべてのカラムを選択します。
*   `.where(eq(users.cityId, 1))`: `cityId` が 1 であるユーザーのみを選択します。

つまり、このコードは、`users` テーブルから `cityId` が 1 のユーザーのデータを取得し、`newYorkers` というマテリアライズドビューに保存します。

このビューに対してクエリを実行すると、事前に保存されたデータが返されるため、`users` テーブル全体をスキャンする必要がなくなり、パフォーマンスが向上します。



#### マテリアライズドビューのリフレッシュ

マテリアライズドビューは、データの変更を反映するために、定期的にリフレッシュする必要があります。

Drizzle ORM では、`refreshMaterializedView` 関数を使用してマテリアライズドビューをリフレッシュできます。

以下は、`newYorkers` マテリアライズドビューをリフレッシュする例です。



```tsx
await db.refreshMaterializedView(newYorkers);

```



#### まとめ

`newYorkers` マテリアライズドビューは、`cityId` が 1 のユーザーに関するクエリのパフォーマンスを向上させるために有効な手段です。

ただし、マテリアライズドビューは定期的にリフレッシュする必要があることに注意してください。



```sql
CREATE MATERIALIZED VIEW "new_yorkers" AS SELECT * FROM "users";

```

そうすれば、アプリケーションのランタイムでマテリアライズド・ビューをリフレッシュできます。

```tsx
await db.refreshMaterializedView(newYorkers);

await db.refreshMaterializedView(newYorkers).concurrently();

await db.refreshMaterializedView(newYorkers).withNoData();

```

マテリアライズドビューのリフレッシュ方法

ご提示のコードは、`newYorkers` というマテリアライズドビューをリフレッシュする3つの異なる方法を示しています。



#### `refreshMaterializedView()` 関数

Drizzle ORM では、`refreshMaterializedView` 関数を使用してマテリアライズドビューをリフレッシュできます。

この関数は、マテリアライズドビューの定義クエリを再実行し、ビューのデータを最新の状態に更新します。

1.  **`await db.refreshMaterializedView(newYorkers);`**

    このコードは、`newYorkers` マテリアライズドビューを **標準的な方法** でリフレッシュします。

リフレッシュ処理が完了するまで、他の操作はブロックされます。

2.  **`await db.refreshMaterializedView(newYorkers).concurrently();`**

    このコードは、`newYorkers` マテリアライズドビューを **コンカレント** にリフレッシュします。

この方法では、リフレッシュ処理中もビューへの読み取りアクセスが可能になります。

通常のマテリアライズドビューのリフレッシュでは、リフレッシュ処理が完了するまでビューがロックされ、読み取りアクセスができなくなります。

しかし、コンカレントリフレッシュを使用すると、リフレッシュ処理中もビューへの読み取りアクセスが可能になるため、ダウンタイムを最小限に抑えることができます。



3.  **`await db.refreshMaterializedView(newYorkers).withNoData();`**

    このコードは、`newYorkers` マテリアライズドビューを **データなし** でリフレッシュします。この方法では、ビューの定義のみが更新され、データは更新されません。このオプションは、ビューの定義を変更した場合にのみ使用されます。

#### それぞれの方法の使い分け

*   **標準的なリフレッシュ**: データの整合性を確保するために、定期的なメンテナンス時などに使用します。
*   **コンカレントリフレッシュ**: リフレッシュ処理中もビューへの読み取りアクセスを維持する必要がある場合に使用します。
*   **データなしリフレッシュ**: ビューの定義を変更した場合にのみ使用します。

#### まとめ

`refreshMaterializedView` 関数を使用すると、マテリアライズドビューを様々な方法でリフレッシュできます。

状況に応じて適切な方法を選択することで、データの整合性とパフォーマンスを最適化できます。



### Extended example

クエリー内のすべてのパラメーターは、$1、$2 などで置き換えられるのではなく、インライン化されます。

```tsx
// regular view
const newYorkers = pgView('new_yorkers')
  .with({
    checkOption: 'cascaded',
    securityBarrier: true,
    securityInvoker: true,
  })
  .as((qb) => {
    const sq = qb
      .$with('sq')
      .as(
        qb.select({ userId: users.id, cityId: cities.id })
          .from(users)
          .leftJoin(cities, eq(cities.id, users.homeCity))
          .where(sql`${users.age1} > 18`),
      );
    return qb.with(sq).select().from(sq).where(sql`${users.homeCity} = 1`);
  });

// materialized view
const newYorkers2 = pgMaterializedView('new_yorkers')
  .using('btree')
  .with({
    fillfactor: 90,
    toast_tuple_target: 0.5,
    autovacuum_enabled: true,
    ...
  })
  .tablespace('custom_tablespace')
  .withNoData()
  .as((qb) => {
    const sq = qb
      .$with('sq')
      .as(
        qb.select({ userId: users.id, cityId: cities.id })
          .from(users)
          .leftJoin(cities, eq(cities.id, users.homeCity))
          .where(sql`${users.age1} > 18`),
      );
    return qb.with(sq).select().from(sq).where(sql`${users.homeCity} = 1`);
  });

```

標準ビューとマテリアライズドビューの比較

👆このコードは、Drizzle ORM を使用して、`newYorkers` という名前の **標準ビュー** と **マテリアライズドビュー** を定義しています。

どちらも同じクエリを使用して、`cityId` が 1 である 18 歳以上のユーザーのデータを取得しますが、いくつかの重要な違いがあります。



#### ビュー

* **`pgView('newYorkers')`**: `newYorkers` という名前のビューを作成します。
* `.with(...)`: ビューの動作を制御するオプションを指定します。
* `checkOption: 'cascaded'`:  ビューに対する更新や挿入が、基礎となるテーブル (`users` と `cities`) の制約も満たすように強制します。
* `securityBarrier: true`:  ビューの定義に含まれていないテーブルへのアクセスを制限します。セキュリティ上の理由で使用されます。
* `securityInvoker: true`: ビューの所有者ではなく、ビューを使用するユーザーの権限でクエリを実行します。Row Level Security (RLS) の実装に使用されます。
* `.as((qb) => ...)`: ビューの定義をクエリビルダ (`qb`) を使用して指定します。
* `qb.$with('sq').as(...)`: `sq` という名前の共通テーブル式 (CTE) を定義し、その中で `users` テーブルと `cities` テーブルを結合して、18 歳以上のユーザーを選択します。
* `qb.with(sq).select().from(sq).where(sql\`${users.homeCity} = 1\`);`: CTE `sq` を使用して、`homeCity` が 1 であるユーザーを選択します。

ビューは、クエリを実行するたびに基礎となるテーブルからデータを動的に取得します。

したがって、常に最新データが反映されますが、クエリのパフォーマンスが低下する可能性があります。



#### マテリアライズドビュー (materialized view)

* **`pgMaterializedView('newYorkers')`**: `newYorkers` という名前のマテリアライズドビューを作成します。
* `.using('btree')`:  ビューのインデックス方法として B-tree を使用します。
これは、データの範囲検索に適したインデックス方法です。
* `.with(...)`: マテリアライズドビューの物理的なストレージを制御するオプションを指定します。
* `fillfactor`:  ページにデータを格納する割合を指定します。
更新や挿入のためのスペースを確保するために使用されます。
* `toast_tuple_target`:  TOAST (The Oversized-Attribute Storage Technique) を使用して大きな属性を外部テーブルに格納するしきい値を指定します。
* `autovacuum_enabled`:  自動バキュームを有効にするかどうかを指定します。
自動バキュームは、テーブルの更新や削除によって発生する空きスペースを自動的に回収する機能です。
* `.tablespace('custom_tablespace')`:  マテリアライズドビューを格納するテーブルスペースを指定します。
テーブルスペースは、データベースオブジェクトを格納するための論理的なストレージ領域です。
* `.withNoData()`:  マテリアライズドビューを作成する際にデータを格納しません。
データは後で手動でリフレッシュする必要があります。
* `.as((qb) => ...)`: 標準ビューと同じく、ビューの定義をクエリビルダ (`qb`) を使用して指定します。

マテリアライズドビューは、ビュー定義のクエリ結果を物理的に保存するため、クエリのパフォーマンスが向上します。
しかし、データの変更を反映するためには、定期的にリフレッシュする必要があります。

#### まとめ

ビューとマテリアライズドビューは、どちらもデータを取得するためのビューですが、パフォーマンスとデータの鮮度というトレードオフがあります。

標準ビューは常に最新データが反映されますが、クエリのパフォーマンスが低下する可能性があります。

マテリアライズドビューはクエリのパフォーマンスが向上しますが、定期的にリフレッシュする必要があります。

このコードでは、どちらのビューもRLSを有効にするために`securityInvoker:true`オプションを使用しています。

これにより、ビューの所有者ではなく、ビューを使用するユーザーの権限でクエリが実行されます。

RLSを使用すると、ユーザーごとに異なるデータを表示したり、データへのアクセスを制限したりすることができます。



---

## Schemas

**Drizzle ORM - スキーマ (Schemas)**

### 1. スキーマとは？

- **定義**: スキーマは、データベースの構造を定義するもので、テーブル、列、データ型、制約などを含みます。
- **役割**: データの整合性を確保し、データベースの設計を明確にします。



### 2. スキーマの利点

- **データ整合性の確保**: スキーマを用いることで、データ型や制約が明確になり、正確なデータ管理が可能です。
- **明確な設計**: 開発者や管理者がデータベースの構造を理解しやすくします。
- **効率的なクエリ**: スキーマに基づく最適化により、データベースのパフォーマンスが向上します。



### 3. スキーマの定義方法

Drizzle ORMでは、スキーマを以下のように定義します。

```tsx
import { schema } from 'drizzle-orm';

const usersSchema = schema.createTable('users', {
  id: schema.integer().primaryKey(),
  username: schema.string().notNull(),
  email: schema.string().unique(),
  createdAt: schema.dateTime().defaultNow(),
});

```

- **テーブル名**: `'users'`
- **カラム**:
  - `id`: 整数型、主キー
  - `username`: 文字列型、NULL不可
  - `email`: 文字列型、一意制約
  - `createdAt`: 日時型、デフォルトで現在時刻


### 4. まとめ

- スキーマはデータベース設計の基礎であり、整合性を保ちながら効率的なDB操作を実現します。



-

### Table schemas

Drizzle ORM は、PostgreSQL と MySQL の方言で SQL スキーマを宣言するための API を提供します。スキーマは、データベース内のテーブル、ビュー、インデックスなどを定義するものです。

もし、スキーマ内でエンティティ（テーブルやビューなど）を宣言した場合、クエリビルダはクエリにスキーマ名を自動的に追加します。

* **`select * from`**: テーブルからすべてのカラムを選択することを示す SQL 文です。
* **`"schema"`**: スキーマの名前です。ダブルクォートで囲むことで、スキーマ名が PostgreSQL の予約語と競突するのを防ぎます。
* **`.`**: スキーマ名とテーブル名を区切る記号です。
* **`"users"`**: テーブルの名前です。これもダブルクォートで囲むことで、テーブル名が PostgreSQL の予約語と競突するのを防ぎます。

Drizzle ORM のスキーマ機能を使うことで、データベースオブジェクトを整理し、クエリを明確化することができます。これは、大規模なアプリケーションや、複数のユーザーが共有するデータベースを設計する際に特に役立ちます。

例として、 `schema` という名前のスキーマ内に `users` という名前のテーブルを定義した場合、クエリビルダは以下のようにスキーマ名を追加したクエリを生成します。

`スキーマ名.テーブル名`

```sql
select * from "schema"."users"

```

```tsx
import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("my_schema");

export const colors = mySchema.enum('colors', ['red', 'green', 'blue']);

export const mySchemaUsers = mySchema.table('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  color: colors('color').default('red'),
});

```

```sql
CREATE SCHEMA "my_schema";

CREATE TYPE "my_schema"."colors" AS ENUM ('red', 'green', 'blue');

CREATE TABLE "my_schema"."users" (
  "id" serial PRIMARY KEY,
  "name" text,
  "color" "my_schema"."colors" DEFAULT 'red'
);

```



---

## Row-Level Security (RLS) 解説

DrizzleORM	行レベルセキュリティ(Row-LevelSecurity, RLS)

1. 行レベルセキュリティとは？

定義行レベルセキュリティ（RLS）は、データベース内の特定の行に対するアクセス制御を提供する機能です。

これにより、ユーザーやロールに基づいて、どの行にアクセスできるかを制限します。

2. RLSの利点

データの安全性向上特定のユーザーが必要なデータにのみアクセスできるようにすることで、データの漏洩や不正アクセスを防ぎます。

柔軟なアクセス制御ユーザーの役割や属性に応じて、異なるデータセットを提供することが可能です。

3. RLSの設定方法

Drizzle ORMでRLSを設定する例を以下に示します。



### RLS: RLSを有効にする方法

```tsx
import { integer, pgTable } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
	id: integer(),
}).enableRLS();

```

ポリシーがないとデフォルトで拒否のポリシーが適用されます。

4. RLSの利用

RLSを適用したテーブルに対するクエリは、ポリシーに基づいて自動的にフィルタリングされます。

これにより、ユーザーは自分に関連するデータのみを取得できます。

5. まとめ

行レベルセキュリティは、データベース内のデータに対するアクセスを厳密に制御するための強力なツールです。

これにより、情報の保護とユーザーの役割に応じたデータの提供が可能になります。



### RLS:Roles

役割

Drizzle ORMにおけるロールの定義

Drizzle ORMでは、データベースのロールをいくつかの方法で定義できます。



#### 新規ロールの定義

新しいロールを定義するには、`pgRole` 関数を使用します。

例として、`admin` というロールを定義するコードを見てみましょう。

```tsx
import { pgRole } from 'drizzle-orm/pg-core';
export const admin = pgRole('admin',{
    createRole: true,
    createDb: true,
    inherit: true
  });

```

このコードでは、以下のオプションを指定しています。

*   `createRole: true`:  このロールは、他のロールを作成する権限を持ちます。
*   `createDb: true`:  このロールは、新しいデータベースを作成する権限を持ちます。
*   `inherit: true`:  このロールは、デフォルトで他のロールの権限を継承します。



#### 既存ロールのマーク

データベースにすでに存在するロールがあり、`drizzle-kit` がそれを認識したり、マイグレーションに含めたりしたくない場合は、`existing()` メソッドを使用して、そのロールを既存のものとしてマークできます。

例として、すでにデータベースに存在する `admin` ロールをマークするコードを見てみましょう:

```tsx
import { pgRole } from 'drizzle-orm/pg-core';
export const admin = pgRole('admin').existing();
```

このコードでは、`drizzle-kit` は `admin` ロールを新しいロールとして扱わず、マイグレーションに含めません。



#### ロールの管理

デフォルトでは、`drizzle-kit` はロールを管理しません。

ロール管理を有効にするには、`drizzle.config.ts` ファイルで `entities.roles` オプションを `true` に設定する必要があります。

`drizzle.config.ts` ファイルの基本的な例を以下に示します。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true,
  entities: {
    roles: true // ロール管理を有効にする
  }
});

```

`drizzle.config.ts` ファイルでは、`exclude` オプションを使用して、管理から特定のロールを除外することもできます。

例として、`admin` ロールを除外する設定を以下に示します。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      exclude: ['admin'] // 'admin'ロールを除外
    }
  }
});

```

また、`include` オプションを使用して、特定のロールのみを管理に含めることもできます。

`Supabase` や `Neon` などのデータベースプロバイダーを使用している場合は、`provider` オプションを使用して、プロバイダーが定義したロールを除外できます。

さらに、`exclude` オプションを使用して、`provider` オプションで除外されなかった追加のロールを除外することもできます。



#### まとめ

Drizzle ORM では、`pgRole` 関数と `existing()` メソッドを使用して、ロールを定義および管理できます。

`drizzle-kit` を使用してロールを管理するには、`drizzle.config.ts` ファイルでロール管理を有効にし、必要に応じて除外または包含するロールを指定する必要があります。



### RLS:Polices

ポリシー

RLS を最大限に活用するには、Drizzle テーブル内でポリシーを定義します。

PostgreSQLでは、ポリシーは既存のテーブルにリンクされなければなりません。

ポリシーは常に特定のテーブルに関連付けられますので、
ポリシー定義は
pgTable
のパラメータとして定義することにしました。

ポリシーの定義:
ポリシーは特定のテーブルにリンクされていて、そのテーブルのデータにどのようにアクセスできるかを決めます。

たとえば、pgTableを使ってテーブルを作成し、その中でポリシーを定義します。

利用可能なすべてのプロパティを含む pgPolicy の例

```tsx
import { sql } from 'drizzle-orm';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy('policy', {
		as: 'permissive',
		to: admin,
		for: 'delete',
		using: sql,
		withCheck: sql,
	}),
]);

```

ポリシーのオプション:

* as
permissive（許可）
または
restrictive（制限）
を指定できます。

* to
ポリシーを適用するロールを指定します。
指定可能な値は
public
current_role
current_user
session_user
あるいは文字列としてのその他のロール名です。
pgRoleオブジェクトを参照することもできます。

* for
どの操作にこのポリシーを適用するかを決めます。
all
select
insert
update
delete.
全部、選択、挿入、更新、削除があります。

* using
ポリシーの条件として使うSQL文を指定します。

* withCheck
データのチェックに使うSQL文を指定します。

* withCheck



#### USING と WITH CHECK

* USING

読み取り（SELECT）時にアクセス可能な行を制御。

USING句は、クエリを実行する際に、どの行にアクセスできるかを制御します。

具体的には、USINGで指定された条件を満たす行のみが、SELECT文やUPDATE文、DELETE文で返されます。

つまり、ユーザーがアクセスできるデータを制限するために使います。

* WITH CHECK

WITHCHECK句は、データの挿入や更新時に、その操作が許可されるかどうかを制御します。

WITHCHECKで指定された条件を満たさない場合、INSERTやUPDATEが拒否されます。

つまり、新しいデータが条件に合致するかどうかを検証します。



#### USING と WITH CHECKの違い

以下の表で、PostgreSQLのRLSにおける`USING`と`WITH CHECK`の違いを表示します。

| 特徴          | USING  取得時  | WITH CHECK 更新時 |
|------------|-------------|--------------------|
| 主な目的      | 読み取り時の行アクセス制御              | 挿入・更新時のデータ検証                   |
| 使用される文  | SELECT, UPDATE, DELETE                    | INSERT, UPDATE                              |
| 条件の適用    | クエリ実行時にアクセス可能な行を制限    | 新しいデータが条件を満たしているかを確認  |
| 例            | `USING (user_id = current_user_id())`    | `WITH CHECK (user_id = current_user_id())` |



* .link()メソッド

既存のテーブルにポリシーをリンクする:
外部のデータベースプロバイダー（NeonやSupabaseなど）では、既存のテーブルにポリシーを追加する必要があります。
その場合は.link()メソッドを使います。

```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```

👆解説

認証されたロールがデータを挿入できるようにするためのポリシーを作っています。
pgPolicy関数を使ってポリシーを作成しています。

"authenticated role insert policy"はポリシーの名前です。

for: "insert"は、このポリシーが挿入操作に適用されることを示しています。

to: authenticatedRoleは、認証されたロール（ユーザー）がこのポリシーの対象であることを指定しています。

`using: sql``は、条件を指定するための部分ですが、現在は空になっています（ここに具体的な条件を書くことができます）。

最後に、link(realtimeMessages)で、リアルタイムメッセージとこのポリシーを関連付けています。



### RLS: Migrations

マイグレーション

スキーマとロールを管理するためにdrizzle-kitを使用している場合、Drizzleスキーマで定義されていないロールを参照したい場合があるかもしれません。

そのような場合、drizzleスキーマで各ロールを定義し、
.existing()でマークすることなく、drizzle-kitでこれらのロールの管理をスキップしたい場合があります。

このような場合、
drizzle.config.ts
で
entities.roles
を使用できます。

完全なリファレンスについては、drizzle.config.tsドキュメントを参照してください。

デフォルトでは、drizzle-kitはあなたのためにロールを管理しないので、drizzle.config.tsでこの機能を有効にする必要があります。



Drizzle Kitを使ってデータベースのスキーマやロールを管理する方法

とくに、Drizzleの設定ファイルであるdrizzle.config.tsを使って、どのロールを管理するかを設定する方法

* 基本

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql',
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true,
  entities: {
    roles: true // ロール管理を有効にする
  }
});

```

entities: { roles: true }を指定することで、Drizzleがロールを管理するようになります。



* 特定のロールを除外

もし管理したくないロールがある場合は、次のように設定できます。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  ...
  entities: {
    roles: {
      exclude: ['admin'] // 'admin'ロールを除外
    }
  }
});

```



ここでは、adminロールを除外しています。これにより、Drizzleはこのロールを管理しません。



* 特定のロールを含める

逆に、特定のロールを管理したい場合は、次のように設定します。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  ...
  entities: {
    roles: {
      include: ['admin'] // 'admin'ロールを含める
    }
  }
});

```

これで、adminロールが管理されるようになります。



* プロバイダオプションの使用

Supabaseを使っている場合は、特定のロールを除外するためにproviderオプションを使うこともできます。

```tsx
// Supabaseの場合
entities: {
  roles: {
    provider: 'supabase'
  }
}

```

これにより、Supabaseが定義したロールを除外できます。



* 新しいロールの除外

もしデータベースプロバイダによって新しいロールが追加されていて、これを除外したい場合も設定できます。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase',
      exclude: ['new_supabase_role'] // 新しいロールを除外
    }
  }
});

```



#### まとめ

Drizzle Kitを使うことで、データベースのロールを簡単に管理できます。管理したいロールや除外したいロールを設定することで、柔軟に対応できるのがポイントです。



### RLS: RLS on views

ビューのRLS

Drizzleでは、ビューにRLSポリシーを指定することもできます。

そのためには、ビューのWITHオプションでsecurity_invokerを使用する必要があります。

以下はその例です。



```tsx
...
export const roomsUsersProfiles = pgView("rooms_users_profiles")
  .with({
    securityInvoker: true,
  })
  .as((qb) =>
    qb
      .select({
        ...getTableColumns(roomsUsers),
        email: profiles.email,
      })
      .from(roomsUsers)
      .innerJoin(profiles, eq(roomsUsers.userId, profiles.id))
  );

```



### RLS: Supabaseと併用

SupabaseとRLSによる役割管理の活用

Supabaseを使用してRLS（Row Level Security）を適用し、既知の役割を利用する方法について解説します。

また、/supabase インポートには、既存のロールとしてマークされた定義済みのロールが用意されており、スキーマで使用できます。



1. Supabaseの事前定義された役割

anonRole: 未認証ユーザーの役割。
authenticatedRole: 認証されたユーザーの役割。
serviceRole: バックエンドサービス専用の役割。
postgresRole: PostgreSQL管理者の役割。
supabaseAuthAdminRole: Supabase認証管理者の役割。
これらの役割を使うことで、RLSポリシーを簡単に設定できます。

```tsx
// drizzle-orm/supabase
export const anonRole = pgRole('anon').existing();
export const authenticatedRole = pgRole('authenticated').existing();
export const serviceRole = pgRole('service_role').existing();
export const postgresRole = pgRole('postgres_role').existing();
export const supabaseAuthAdminRole = pgRole('supabase_auth_admin').existing();

```



RLSポリシーの設定

RLSを有効にする

```sql
ALTER TABLE "table_name" ENABLE ROW LEVEL SECURITY;

```



ユーザーが自分のプロフィールだけを見られるようにするためには、次のようなポリシーを設定します。

```sql
CREATE POLICY "User can see their own profile only"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

```



たとえば、Supabase の定義済みロールを次のように使用できます。

```tsx
import { sql } from 'drizzle-orm';
import { serviceRole } from 'drizzle-orm/supabase';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy(`policy-insert`, {
		for: 'insert',
		to: serviceRole,
		withCheck: sql`false`,
	}),
]);

```



/supabaseインポートには、アプリケーションで使用できる定義済みのテーブルや関数も含まれています。

```tsx
// drizzle-orm/supabase
const auth = pgSchema('auth');
export const authUsers = auth.table('users', {
	id: uuid().primaryKey().notNull(),
});
const realtime = pgSchema('realtime');
export const realtimeMessages = realtime.table(
	'messages',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey(),
		topic: text().notNull(),
		extension: text({
			enum: ['presence', 'broadcast', 'postgres_changes'],
		}).notNull(),
	},
);
export const authUid = sql`(select auth.uid())`;
export const realtimeTopic = sql`realtime.topic()`;

```



これにより、Drizzle Kitはそれらを既存のデータベースとして扱い、他のエンティティに接続するための情報としてのみ使用します。

```tsx
import { foreignKey, pgPolicy, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";
export const profiles = pgTable(
  "profiles",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
	  // reference to the auth table from Supabase
      foreignColumns: [authUsers.id],
      name: "profiles_id_fk",
    }).onDelete("cascade"),
    pgPolicy("authenticated can view all profiles", {
      for: "select",
	  // using predefined role from Supabase
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);

```



Supabaseに存在するテーブルにポリシーを追加する例を確認しましょう

```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```



また、SupabaseでDrizzleRLSを使用し、実際にクエリを作成する方法を紹介する素晴らしい例もあります。

また、CreateDrizzleという素晴らしいラッパーも含まれており、Supabaseとのトランザクション処理をすべて行うことができます。

今後のリリースでは、このラッパーはdrizzle-orm/supabaseに移動され、ネイティブで使用できるようになります。

DrizzleSupaSecureSlackリポジトリを確認してください。

このリポジトリからの実装例を以下に示します。

```tsx
type SupabaseToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
};

export function createDrizzle(token: SupabaseToken, { admin, client }: { admin: PgDatabase<any>; client: PgDatabase<any> }) {
  return {
    admin,
    rls: (async (transaction, ...rest) => {
      return await client.transaction(async (tx) => {
        // Supabase exposes auth.uid() and auth.jwt()
        // https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
        try {
          await tx.execute(sql`
          -- auth.jwt()
          select set_config('request.jwt.claims', '${sql.raw(
            JSON.stringify(token)
          )}', TRUE);
          -- auth.uid()
          select set_config('request.jwt.claim.sub', '${sql.raw(
            token.sub ?? ""
          )}', TRUE);
          -- set local role
          set local role ${sql.raw(token.role ?? "anon")};
          `);
          return await transaction(tx);
        } finally {
          await tx.execute(sql`
            -- reset
            select set_config('request.jwt.claims', NULL, TRUE);
            select set_config('request.jwt.claim.sub', NULL, TRUE);
            reset role;
            `);
        }
      }, ...rest);
    }) as typeof client.transaction,
  };
}

```



* SupabaseToken と createDrizzle の解説

SupabaseToken は、JWT（JSON Web Token）の構造を表す型で、さまざまな認証情報を持っています。

createDrizzle 関数は、このトークンを利用してデータベースのトランザクションを管理する機能を提供します。

このシステムは、Supabase を通じて PostgreSQL データベースに対する安全なアクセスを実現するために、行レベルのセキュリティ（RLS）を使用しています。

SupabaseToken について
説明: SupabaseToken は、ユーザーの認証状態を示す情報を含むオブジェクトです。

以下のプロパティを持っています。

```
iss: 発行者（Issuer）
sub: サブジェクト（Subject） - ユーザーID等
aud: 対象（Audience） - 認証対象
exp: 有効期限（Expiration） - トークンの有効期限
nbf: 使用開始時間（Not Before）
iat: 発行時間（Issued At）
jti: JWT ID - トークンの一意の識別子
role: ユーザーの役割（Role） - 管理者や一般ユーザーなど

```



* createDrizzle 関数の解説

目的
SupabaseToken を引数に取り、データベースとのインタラクションを安全に行うための関数です。

構造
admin と client これはそれぞれ管理者用のデータベース接続と一般クライアント用の接続を表します。
rls: 行レベルのセキュリティを使うための非同期関数です。

関数内の主な処理
トランザクション内での設定:
set_config: JWT クレームやユーザーIDを設定します。
set local role: ユーザーの役割を設定します。

トランザクションの処理:
await transaction(tx): 設定した情報に基づいてデータベースのトランザクションを実行します。

最後に、設定をリセットしてトランザクション中のセキュリティ状態を元に戻します。

```tsx
return await transaction(tx);

```



行レベルセキュリティ (RLS) について
RLSの重要性:

データベースの行ごとのアクセス制御を実施し、特定のユーザーが自身のデータのみを操作できるようにします。

たとえば、あるユーザーが自分のプロファイルを変更することのみを許可するポリシーを作成することで、アプリケーションのセキュリティを強化します。



RLSの設定方法:

テーブルを作成した後、以下のように RLS を有効にします。

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

```



ポリシーの例:

ユーザーが自分自身のプロファイルのみを更新できるようにするポリシーを設定できます。

```sql
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

```



```tsx
// https://github.com/orgs/supabase/discussions/23224
// Should be secure because we use the access token that is signed, and not the data read directly from the storage
export async function createDrizzleSupabaseClient() {
  const {
    data: { session },
  } = await createClient().auth.getSession();
  return createDrizzle(decode(session?.access_token ?? ""), { admin, client });
}

async function getRooms() {
  const db = await createDrizzleSupabaseClient();
  return db.rls((tx) => tx.select().from(rooms));
}

```




ビジネスロジックの適用
RLSを使うことで、ビジネスロジックに基づいた細かなデータ制御が可能になります。

たとえば、各ユーザーが特定のデータにアクセスできるように設定できます。

以下は、認証されたユーザーが自分のデータだけを更新できるようにした例です。

```sql
CREATE POLICY "Users can update their profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

```


* SupabaseとDrizzle ORMの統合

Drizzle ORMを使うと、Supabaseとの統合が非常に簡単になります。

以下はDrizzle ORMでRLSを実装する例です。

テーブルの定義

```tsx
import { pgTable, text, uuid, sql } from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

export const profiles = pgTable("profiles", {
    id: uuid().primaryKey().notNull(),
    user_id: uuid().notNull(),
    email: text().notNull(),
}, (table) => [
    pgPolicy("Authenticated users can view profiles", {
        for: "select",
        to: authenticatedRole,
        using: sql`auth.uid() = user_id`
    })
]);

```

* RLSポリシーのリンク

RLSをポリシーにリンクさせることで、管理が簡単になります。

```tsx
import { pgPolicy } from "drizzle-orm/pg-core";
export const policy = pgPolicy("authenticated insert policy", {
    for: "insert",
    to: authenticatedRole,
    using: sql``
}).link(realtimeMessages);

```



---

## Row-Level Security (RLS) ドキュメント翻訳

Drizzleを使用すると、Postgresテーブルの行レベルセキュリティ（RLS）を有効にし、さまざまなオプションでポリシーを作成し、ポリシーが適用されるロールを定義・管理できます。

DrizzleはPostgresのポリシーとロールの生表現をサポートします。これは、NeonやSupabaseのような一般的なPostgresデータベースプロバイダで動作します。

Drizzleでは、両方のデータベースプロバイダでRLSを使用するための特定の定義済みRLSロールと関数を用意していますが、独自のロジックを定義することもできます。

### RLS: Enable RLS

ポリシーを追加せずにテーブルの RLS を有効にしたい場合は、 .enableRLS() を使用します。

PostgreSQL のドキュメントに記載されているとおり、

テーブルにポリシーが存在しない場合、デフォルトの否認ポリシーが使用されます。

TRUNCATEやREFERENCESのようなテーブル全体に適用される操作は、行セキュリティの対象にはなりません。

```tsx
import { integer, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer(),
}).enableRLS();

```

テーブルにポリシーを追加すると、RLS が自動的に有効になります。そのため、テーブルにポリシーを追加するときに RLS を明示的に有効にする必要はありません。



### RLS: Roles

現在、Drizzleは以下のようにいくつかの異なるオプションでロールの定義をサポートしています。

より多くのオプションのサポートは将来のリリースで追加される予定です。

```tsx
import { pgRole } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin', { createRole: true, createDb: true, inherit: true });

```

ロールがすでにデータベースに存在し、drizzle-kitにそのロールを「参照」させたくない、またはマイグレーションに含めたくない場合、そのロールを既存ロールとしてマークできます。

```tsx
import { pgRole } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin').existing();

```



### RLS: Policies

RLS を最大限に活用するには、Drizzle テーブル内でポリシーを定義します。

PostgreSQLでは、ポリシーは既存のテーブルにリンクされなければなりません。

ポリシーは常に特定のテーブルに関連付けられますので、ポリシー定義はpgTableのパラメータとして定義することにしました。



#### Example of pgPolicy with all available properties

```tsx
import { sql } from 'drizzle-orm';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy('policy', {
		as: 'permissive',
		to: admin,
		for: 'delete',
		using: sql``,
		withCheck: sql``,
	}),
]);

```

#### Policy options

もちろん、以下のように日本語で表にするわね。

| オプション       | 説明   |
|-------------|-------|
| as | 値は「permissive」（許可的）または「restrictive」（制限的）です。 |
| to | ポリシーが適用されるロールを指定します。可能な値には「public」「current_role」「current_user」「session_user」などの文字列、および `pgRole` オブジェクトの参照が含まれます。 |
| for | このポリシーが適用されるコマンドを定義します。可能な値は「all」「select」「insert」「update」「delete」です。 |
| using | ポリシー作成文の USING 部分に適用される SQL 文です。 |
| withCheck | ポリシー作成文の WITH CHECK 部分に適用される SQL 文です。 |



#### Link Policy to an existing table

データベースの既存のテーブルにポリシーをリンクする必要がある場合があります。

もっとも一般的な使用例は、Supabaseのようなデータベースプロバイダで、既存のテーブルにポリシーを追加する必要がある場合です。

この場合、.link()APIを使用します。



```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```



### RLS: Migrations

スキーマとロールを管理するためにdrizzle-kitを使用している場合、Drizzleスキーマで定義されていないロールを参照したい状況があるかもしれません。

このような場合、drizzleスキーマで各ロールを定義し、.existing()でマークすることなく、drizzle-kitでこれらのロールの管理をスキップしたい場合があります。



このような場合、drizzle.config.tsでentities.rolesを使用できます。

完全なリファレンスについては、drizzle.config.ts ドキュメントを参照してください。

デフォルトでは、drizzle-kit はあなたのためにロールを管理しないので、drizzle.config.ts でこの機能を有効にする必要があります。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true,
  entities: {
    roles: true
  }
});

```

追加の設定オプションが必要な場合に備えて、もう少し例を見てみよう。

* 管理ロールがあり、管理可能なロールのリストから除外したい場合

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      exclude: ['admin']
    }
  }
});

```

* 管理者ロールがあり、それを管理可能なロールのリストに含めたい。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      include: ['admin']
    }
  }
});

```

* Supabaseを使用していて、Supabaseで定義されたロールを除外したい場合は、プロバイダオプションの

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase'
    }
  }
});

```

データベースプロバイダによって指定された新しいロールに比べて、Drizzleが若干古い状況に遭遇することがあります。

そのような場合は、プロバイダオプションを使用して、追加のロールを除外できます：

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase',
      exclude: ['new_supabase_role']
    }
  }
});

```

### RLS: RLS on views

Drizzleでは、ビューにRLSポリシーを指定することもできます。

そのためには、ビューのWITHオプションでsecurity_invokerを使用する必要があります。

以下は例です。

```tsx
...
export const roomsUsersProfiles = pgView("rooms_users_profiles")
  .with({
    securityInvoker: true,
  })
  .as((qb) =>
    qb
      .select({
        ...getTableColumns(roomsUsers),
        email: profiles.email,
      })
      .from(roomsUsers)
      .innerJoin(profiles, eq(roomsUsers.userId, profiles.id))
  );

```



### RLS: Using with Supabase

また、/supabase インポートには、既存のロールとしてマークされた定義済みのロールが用意されており、スキーマで使用できます。

```tsx
// drizzle-orm/supabase
export const anonRole = pgRole('anon').existing();
export const authenticatedRole = pgRole('authenticated').existing();
export const serviceRole = pgRole('service_role').existing();
export const postgresRole = pgRole('postgres_role').existing();
export const supabaseAuthAdminRole = pgRole('supabase_auth_admin').existing();

```

たとえば、Supabaseの定義済みロールを次のように使用できます。

```tsx
import { sql } from 'drizzle-orm';
import { serviceRole } from 'drizzle-orm/supabase';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';

export const admin = pgRole('admin');

export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy(`policy-insert`, {
		for: 'insert',
		to: serviceRole,
		withCheck: sql`false`,
	}),
]);

```

/supabaseインポートには、アプリケーションで使用できる定義済みのテーブルや関数も含まれています。

```tsx
// drizzle-orm/supabase
const auth = pgSchema('auth');
export const authUsers = auth.table('users', {
	id: uuid().primaryKey().notNull(),
});

const realtime = pgSchema('realtime');
export const realtimeMessages = realtime.table(
	'messages',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey(),
		topic: text().notNull(),
		extension: text({
			enum: ['presence', 'broadcast', 'postgres_changes'],
		}).notNull(),
	},
);

export const authUid = sql`(select auth.uid())`;
export const realtimeTopic = sql`realtime.topic()`;

```

これにより、Drizzle Kitはそれらを既存のデータベースとして扱い、他のエンティティに接続するための情報としてのみ使用します。

```tsx
import { foreignKey, pgPolicy, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
	  // reference to the auth table from Supabase
      foreignColumns: [authUsers.id],
      name: "profiles_id_fk",
    }).onDelete("cascade"),
    pgPolicy("authenticated can view all profiles", {
      for: "select",
	  // using predefined role from Supabase
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);

```

Supabaseに存在するテーブルにポリシーを追加する例を確認してみましょう。

```tsx
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);

```

また、SupabaseでDrizzleRLSを使用し、実際にクエリを作成する方法を紹介する素晴らしい例もあります。

また、CreateDrizzleという素晴らしいラッパーも含まれており、Supabaseとのトランザクション処理をすべて行うことができます。

今後のリリースでは、このラッパーはdrizzle-orm/supabaseに移動し、ネイティブで使用できるようになる予定です。



Drizzle SupaSecureSlack リポジトリを確認してください。

rphlmr/drizzle-supabase-rls
https://github.com/rphlmr/drizzle-supabase-rls

このリポジトリからの実装例を以下に示します。

```tsx
type SupabaseToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
};

export function createDrizzle(token: SupabaseToken, { admin, client }: { admin: PgDatabase<any>; client: PgDatabase<any> }) {
  return {
    admin,
    rls: (async (transaction, ...rest) => {
      return await client.transaction(async (tx) => {
        // Supabase exposes auth.uid() and auth.jwt()
        // https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
        try {
          await tx.execute(sql`
          -- auth.jwt()
          select set_config('request.jwt.claims', '${sql.raw(
            JSON.stringify(token)
          )}', TRUE);
          -- auth.uid()
          select set_config('request.jwt.claim.sub', '${sql.raw(
            token.sub ?? ""
          )}', TRUE);
          -- set local role
          set local role ${sql.raw(token.role ?? "anon")};
          `);
          return await transaction(tx);
        } finally {
          await tx.execute(sql`
            -- reset
            select set_config('request.jwt.claims', NULL, TRUE);
            select set_config('request.jwt.claim.sub', NULL, TRUE);
            reset role;
            `);
        }
      }, ...rest);
    }) as typeof client.transaction,
  };
}

```

そして これは次のように使用できます。

```tsx
// https://github.com/orgs/supabase/discussions/23224
// Should be secure because we use the access token that is signed, and not the data read directly from the storage
export async function createDrizzleSupabaseClient() {
  const {
    data: { session },
  } = await createClient().auth.getSession();
  return createDrizzle(decode(session?.access_token ?? ""), { admin, client });
}

async function getRooms() {
  const db = await createDrizzleSupabaseClient();
  return db.rls((tx) => tx.select().from(rooms));
}

```



---

## Extensions

### pg_vector
Drizzleスキーマ内に拡張機能を作成するための特別なコードはありません。

ベクトル型、インデックス、クエリを使用する場合は、pg_vector拡張がインストールされたPostgreSQLデータベースを使用していると仮定します。

pg_vectorはオープンソースのPostgres用ベクトル類似検索です。
ベクトルを他のデータと一緒に保存します。

サポートしています。

厳密および近似最近傍検索

単精度、半精度、バイナリ、スパースベクトル

L2距離、内積、余弦距離、L1距離、ハミング距離、ジャカード距離

(略)



### postgis

Drizzleスキーマ内に拡張機能を作成するための特別なコードはありません。

postgis型、インデックス、クエリを使用する場合は、postgis拡張がインストールされたPostgreSQLデータベースを持っていることを前提としています。

PostGISのウェブサイトでは

PostGISは、PostgreSQLリレーショナルデータベースの機能を拡張し、地理空間データの格納、インデックス作成、問い合わせをサポートします。

PostGIS拡張で introspect や push コマンドを使用していて、PostGIS テーブルを含めたくない場合は、extensionsFilters を使用してすべての PostGIS テーブルを無視できます。

(略)



---

## Relations

Drizzleリレーション

Drizzleリレーションの唯一の目的は、もっともシンプルで簡潔な方法でリレーショナルデータを検索できるようにすることです。

```tsx
// Relational queries
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/…';

const db = drizzle(client, { schema });

const result = db.query.users.findMany({
  with: {
    posts: true,
  },
});

```

```tsx
[{
  id: 10,
  name: "Dan",
  posts: [
    {
      id: 1,
      content: "SQL is awesome",
      authorId: 10,
    },
    {
      id: 2,
      content: "But check relational queries",
      authorId: 10,
    }
  ]
}]

```

```tsx
// Select with joins
import { drizzle } from 'drizzle-orm/…';
import { eq } from 'drizzle-orm';
import { posts, users } from './schema';

const db = drizzle(client);

const res = await db.select()
                    .from(users)
                    .leftJoin(posts, eq(posts.authorId, users.id))
                    .orderBy(users.id)
const mappedResult =

```



### 1対1

DrizzleORMでは、リレーション演算子を使ってテーブル間の一対一のリレーションを定義するAPIを提供しています。

ユーザが他のユーザを招待できる、ユーザとユーザの間の一対一の関係の例です
（この例では自己参照を使用しています）：


```tsx
import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
	invitedBy: integer('invited_by'),
});
export const usersRelations = relations(users, ({ one }) => ({
	invitee: one(users, {
		fields: [users.invitedBy],
		references: [users.id],
	}),
}));

```



もう1つの例は、別のテーブルに格納されたプロファイル情報を持つユーザーです。

この場合、外部キーは「profile_info」テーブルに格納されるため、ユーザー関係はフィールドも参照も持たない。

これはTypeScriptに、user.profileInfoがnullableであることを伝えます：



```tsx
import { pgTable, serial, text, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ one }) => ({
	profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	metadata: jsonb('metadata'),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
	user: one(users, { fields: [profileInfo.userId], references: [users.id] }),
}));

const user = await queryUserWithProfileInfo();
//____^? type { id: number, profileInfo: { ... } | null  }

```



### 1対多

Drizzle ORMでは、リレーション演算子を使ってテーブル間の一対多リレーションを定義するAPIを提供しています。ユーザと投稿の一対多リレーションの例



```tsx
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));

```



次に、投稿にコメントを追加してみましょう。

```tsx
...
export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
	comments: many(comments)
}));

export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	text: text('text'),
	authorId: integer('author_id'),
	postId: integer('post_id'),
});

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));

```



### 多対多

DrizzleORMは、ジャンクションテーブルやジョインテーブルと呼ばれるテーブル間の多対多リレーションを定義するAPIを提供します。

ユーザーとグループ間の多対多リレーションの例

```tsx
import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const usersToGroups = pgTable(
  'users_to_groups',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}));

```



### Foreign keys 外部キー

リレーションが外部キーに似ていることに気づいたかもしれない。
では、何が違うのでしょうか？



外部キーはテーブル間の関係を定義するという同じような目的を果たしますが、リレーションとは異なるレベルで機能します。

外部キーはデータベース・レベルの制約であり、挿入、更新、削除の操作のたびにチェックされ、制約に違反するとエラーになります。



一方、リレーションはより高いレベルの抽象化であり、アプリケーション・レベルでテーブル間のリレーションを定義するためだけに使用されます。

リレーションはデータベーススキーマに何ら影響を与えず、暗黙的に外部キーを作成することもありません。

つまり、リレーションシップと外部キーは一緒に使うことができますが、互いに依存するものではありません。

外部キーを使用せずにリレーションを定義することができ（逆も同様）、
外部キーをサポートしていないデータベースでも使用できます。

以下の2つの例は、Drizzleリレーショナルクエリを使用してデータを照会するという点ではまったく同じです。



```tsx
// schema1.ts
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});
export const usersRelations = relations(users, ({ one, many }) => ({
	profileInfo: one(users, {
		fields: [profileInfo.userId],
		references: [users.id],
	}),
}));
export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer("user_id"),
	metadata: jsonb("metadata"),
});

```



```tsx
// schema2.ts
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	profileInfo: one(users, {
		fields: [profileInfo.userId],
		references: [users.id],
	}),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer("user_id").references(() => users.id),
	metadata: jsonb("metadata"),
});

```



### Foreign key actions

詳細はpostgres foreignkeys docsを参照してください。

親テーブルの参照データが変更された時に発生するアクションを指定できます。

これらのアクションは「外部キーアクション」と呼ばれます。

PostgreSQLはこれらのアクションにいくつかのオプションを提供しています。

Delete/UpdateActions

* CASCADE:
親テーブルの行が削除されると、子テーブルの対応する行もすべて削除されます。
これにより、子テーブルに孤児となった行が存在しないようになります。

* NO ACTION:
これはデフォルトのアクションです。
子テーブルに関連する行がある場合、親テーブルの行が削除されるのを防ぎます。
親テーブルでのDELETE操作は失敗します。

* RESTRICT:
NO ACTIONと同様、子テーブルに従属行がある場合、親テーブルの行の削除を防ぎます。
基本的にはNO ACTIONと同じで、互換性のために含まれています。

* SET DEFAULT:
親テーブルの行が削除された場合、子テーブルの外部キー列にデフォルト値があれば、その値に設定されます。
デフォルト値がない場合、DELETEは失敗します。

* SET NULL:
親テーブルの行が削除されると、子テーブルの外部キー列はNULLに設定されます。
この操作は、子テーブルの外部キー列がNULL値を許可していることを前提としています。



ON DELETEと同様に、参照されるカラムが変更（更新）されたときに実行されるON UPDATEもあります。

可能なアクションは同じですが、SET NULL と SET UPDATEでは列リストを指定できません。

この場合、CASCADEは、参照されるカラムの更新された値を参照する行にコピーすることを意味します。

drizzleでは、references()の第2引数を使用して外部キーアクションを追加できます。



#### type of the actions

```tsx
export type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

// second argument of references interface
actions?: {
		onUpdate?: UpdateDeleteAction;
		onDelete?: UpdateDeleteAction;
	} | undefined

```



次の例では、postsスキーマのauthorフィールドにonDelete: 'cascade'を追加することで、ユーザーを削除すると関連するPostレコードもすべて削除されることを意味します。

```tsx
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	name: text('name'),
	author: integer('author').references(() => users.id, {onDelete: 'cascade'}).notNull(),
});

```

foreignKey演算子で指定された制約では、外部キーアクションは構文で定義されます。

```tsx
import { foreignKey, pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	name: text('name'),
	author: integer('author').notNull(),
}, (table) => ({
		fk: foreignKey({
			name: "author_fk",
			columns: [table.author],
			foreignColumns: [users.id],
		})
			.onDelete('cascade')
			.onUpdate('cascade')
	}),
);

```



### Disambiguating relations

Drizzleでは、同じ2つのテーブル間で複数のリレーションを定義した場合に、リレーションを曖昧にしないための方法としてrelationNameオプションも提供しています。

たとえば、postsテーブルでauthorとreviewerのリレーションを定義したとします。



```tsx
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
	author: many(posts, { relationName: 'author' }),
	reviewer: many(posts, { relationName: 'reviewer' }),
}));

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
	reviewerId: integer('reviewer_id'),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
		relationName: 'author',
	}),
	reviewer: one(users, {
		fields: [posts.reviewerId],
		references: [users.id],
		relationName: 'reviewer',
	}),
}));

```



----------------------------------------

# MIGRATIONS (解説)

## Overview

Drizzle Kit は、Drizzle を使用して SQL データベースのマイグレーションを管理するための CLI ツールです。

```terminal
npm i drizzle-kit

```

まず、Drizzleのスタートとマイグレーションの基礎を確認し、ビジネスニーズに最適なSQLマイグレーションフローを選択してください。

Drizzle Kitでは、スキーマに基づいて、SQLマイグレーションファイルの生成と実行、スキーマのデータベースへの直接プッシュ、データベースからのスキーマのプル、drizzle studioのスピンアップ、そしていくつかのユーティリティコマンドを実行できます。

```terminal
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
npx drizzle-kit pull
npx drizzle-kit check
npx drizzle-kit up
npx drizzle-kit studio

```

1. drizzle-kit generate
これは、Drizzleのスキーマに基づいてSQLのマイグレーションファイルを生成するためのコマンド。新しいスキーマを定義したり、変更したときに使います。

https://orm.drizzle.team/docs/drizzle-kit-generate

2. drizzle-kit migrate
生成したマイグレーションファイルをデータベースに適用するためのコマンドです。これでデータベースを最新の状態に保つことができます。

https://orm.drizzle.team/docs/drizzle-kit-migrate

3. drizzle-kit pull
データベースのスキーマを取得して、それをDrizzleのスキーマに変換してコードベースに保存するためのコマンドです。これでデータベースの状態を簡単に把握できます。

https://orm.drizzle.team/docs/drizzle-kit-pull

4. drizzle-kit push
Drizzleのスキーマをデータベースにプッシュするためのコマンド。新しいスキーマを宣言したり、変更したときに使います。

https://orm.drizzle.team/docs/drizzle-kit-push

5. drizzle-kit studio
データベースに接続して、Drizzle Studio用のプロキシサーバーを立ち上げるコマンドです。これを使うと、データベースを便利にブラウズできます。

https://orm.drizzle.team/docs/drizzle-kit-studio

6. drizzle-kit check
生成されたマイグレーションを確認して、競合やレースコンディションがないかをチェックするためのコマンドです。これで問題を未然に防げます。

https://orm.drizzle.team/docs/drizzle-kit-check

7. drizzle-kit up
以前に生成されたマイグレーションのスナップショットをアップグレードするためのコマンドです。これでデータベースの状態を調整できます。

https://orm.drizzle.team/docs/drizzle-kit-up



Drizzle Kit の設定は、drizzle.config.ts 設定ファイルまたは CLI params で行います。

Drizzle Kit がマイグレーションを生成するためには、少なくとも SQL 方言とスキーマパスを指定する必要があります。

📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle.config.ts  <--- Drizzle config file
 ├ 📜 package.json
 └ 📜 tsconfig.json


```tsx
// simple config
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});

```

```tsx
// extended config
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: "./database/",
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});

```



複数のデータベースがある場合
CLI paramでDrizzle Kitの設定パスを指定できるので、複数のデータベースステージや複数のデータベース、または同じプロジェクト上に異なるデータベースがある場合に非常に便利です：

```terminal
npx drizzle-kit push --config=drizzle-dev.drizzle.config
npx drizzle-kit push --config=drizzle-prod.drizzle.config

```

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

```



### generate

```terminal
drizzle-kit generate

```

drizzle-kit generate を使用すると、Drizzle スキーマの宣言時やその後のスキーマ変更時に、スキーマに基づいた SQL マイグレーションを生成できます。

Drizzleマイグレーションを管理するコードファーストのアプローチをカバーするように設計されています。

生成されたマイグレーションは、drizzle-kitmigrate、drizzle-ormのmigrate()、bytebaseのような外部マイグレーションツール、またはデータベース上で直接マイグレーションを実行することで適用できます。

drizzle-kitgenerateコマンドは方言とスキーマパスのオプションを指定する必要があり、drizzle.config.ts設定ファイルまたはCLIオプションで設定できます。


```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});

```

```terminal
npx drizzle-kit generate

```

```terminal
# As CLI options
npx drizzle-kit generate --dialect=postgresql --schema=./src/schema.ts

```



#### Schema files path

schema.tsファイルは1つでも、プロジェクトに分散させたいスキーマファイルをいくつでも持つことができます。

Drizzle Kitでは、スキーマ設定オプションを使用して、スキーマファイルへのパスをグロブとして指定する必要があります。

(複数の設定例)



#### Custom migration file name

CLIオプションに--nameを指定すると、カスタムマイグレーションファイル名を設定できます。

```terminal
npx drizzle-kit generate --name=init

```

```
📦 <project root>
 ├ 📂 drizzle
 │ ├ 📂 _meta
 │ └ 📜 0000_init.sql
 ├ 📂 src
 └ …

```



#### Multiple configuration files in one project

プロジェクト内に複数の設定ファイルを持つことができ、複数のデータベース・ステージや複数のデータベース、あるいは同じプロジェクト上に異なるデータベースがある場合に非常に便利です。

```terminal
npx drizzle-kit generate --config=drizzle-dev.config.ts
npx drizzle-kit generate --config=drizzle-prod.config.ts

```

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

```



#### Custom migrations

空のマイグレーションファイルを生成して、DrizzleKitやデータシーディングでは現在サポートされていないDDL代替用のカスタムSQLマイグレーションを作成できます

カスタムマイグレーションに関する拡張ドキュメント-👇こちらを参照してください。

Drizzle ORM - Custom migrations

https://orm.drizzle.team/docs/kit-custom-migrations

```terminal
drizzle-kit generate --custom --name=seed-users

```

```
📦 <project root>
 ├ 📂 drizzle
 │ ├ 📂 _meta
 │ ├ 📜 0000_init.sql
 │ └ 📜 0001_seed-users.sql
 ├ 📂 src
 └ …

```

```sql
-- ./drizzle/0001_seed-users.sql
INSERT INTO "users" ("name") VALUES('Dan');
INSERT INTO "users" ("name") VALUES('Andrew');
INSERT INTO "users" ("name") VALUES('Dandrew');

```

#### Extended list of available configurations

drizzle-kitのgenerateにはcliのみのオプションのリストがあります。

custom
カスタムマイグレーション用の空のSQLを生成する

name
カスタム名でマイグレーションを生成

```terminal
npx drizzle-kit push --name=init
npx drizzle-kit push --name=seed_users --custom

```

| 設定項目 | 必要性 | 説明     |
|---------|--------|-------|
| dialect    | 必須        | データベースのダイアレクト。`postgresql`、`mysql`、`sqlite`、`turso`、`singlestore`のいずれかを指定。 |
| schema     | 必須        | TypeScriptスキーマファイルまたは複数のスキーマファイルが含まれるフォルダへのパス。            |
| out        | 任意        | マイグレーションの出力フォルダ。デフォルトは`./drizzle`。                                   |
| config     | 任意        | 設定ファイルのパス。デフォルトは`drizzle.config.ts`。                                        |
| breakpoints | 任意        | SQL文のブレークポイント。デフォルトは`true`。                                               |



#### Extended example

0001_seed-users.sqlという名前のカスタムpostgresqlマイグレーションファイルを、

./src/schema.tsにあるDrizzleスキーマと、
デフォルトの./drizzleの代わりに

./migrationsという名前のmigrationフォルダを使って作成する方法です。

また、configsフォルダにdrizzle configファイルを配置します。

設定ファイルを作成しましょう：

```
📦 <project root>
 ├ 📂 migrations
 ├ 📂 configs
 │ └ 📜 drizzle.config.ts
 ├ 📂 src
 └ …

```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
});

```

👇コマンドを実行します。

```terminal
npx drizzle-kit generate --config=./configs/drizzle.config.ts --name=seed-users --custom

```

次のように作成されます。

```
📦 <project root>
 ├ …
 ├ 📂 migrations
 │ ├ 📂 _meta
 │ ├ 📜 0000_init.sql
 │ └ 📜 0001_seed-users.sql
 └ …

```

```sql
-- ./drizzle/0001_seed-users.sql
INSERT INTO "users" ("name") VALUES('Dan');
INSERT INTO "users" ("name") VALUES('Andrew');
INSERT INTO "users" ("name") VALUES('Dandrew');

```



### migrate

```terminal
drizzle-kit migrate

```



drizzle-kit migrate を使うと、drizzle-kit generate で生成された SQL migrations を適用できます。

これは、Drizzle migrations を管理するコードファースト(オプション3)のアプローチをカバーするように設計されています。

drizzle-kitのmigrateコマンドでは、drizzle.config.ts設定ファイルまたはCLIオプションで、方言とデータベース接続の認証情報を指定する必要があります。

```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
});

```

```terminal
npx drizzle-kit migrate

```

```terminal
# As CLI options
npx drizzle-kit migrate --dialect=postgresql --url=postgresql://user:password@host:port/dbname

```



#### Applied migrations log in the database

データベースに適用されたマイグレーションログ

マイグレーションを実行すると、Drizzle Kitは正常に適用されたマイグレーションに関するレコードをデータベースに保存します。

それは __drizzle_migrations という名前の migrations ログテーブルに保存されます。

このテーブルとスキーマ(PostgreSQLのみ)はdrizzle設定ファイルを使ってカスタマイズできます：


```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
  migrations: {
    table: 'my-migrations-table', // `__drizzle_migrations` by default
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
});

```



#### Multiple configuration files in one project

1つのプロジェクトに複数の設定ファイル

プロジェクト内に複数の設定ファイルを持つことができ、複数のデータベースステージや同じプロジェクト上に複数のデータベースがある場合に非常に便利です。

```terminal
npx drizzle-kit migrate --config=drizzle-dev.config.ts
npx drizzle-kit migrate --config=drizzle-prod.config.ts

```

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

```

#### Extended example

drizzle-kitのgenerateコマンドとdrizzle-kitのmigrateコマンドを使ってSQLマイグレーションを生成し、データベースに適用してみましょう。

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 │ ├ 📜 schema.ts
 │ └ 📜 index.ts
 ├ 📜 drizzle.config.ts
 └ …

```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
  migrations: {
    table: 'journal',
    schema: 'drizzle',
  },
});

```

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
})

```

コマンドを実行します。

```terminal
npx drizzle-kit generate --name=init

``

生成されます。


```
📦 <project root>
 ├ …
 ├ 📂 migrations
 │ ├ 📂 _meta
 │ └ 📜 0000_init.sql
 └ …

```

```sql
-- ./drizzle/0000_init.sql

CREATE TABLE "users"(
  id serial primary key,
  name text,
)

```

コマンドを実行します。

```terminal
npx drizzle-kit migrate

```

SQLのマイグレーションはデータベースに正常に適用されました。


### push

drizzle-kit push

drizzle-kit push は、SQL ファイルを生成することなく、スキーマとそれに続くスキーマの変更を直接データベースにプッシュします。

ラピッドプロトタイピングに最適なアプローチで、私たちは何十ものチームや単独の開発者が、本番アプリケーションの主要なマイグレーションフローとしてこの方法を使用しているのを見てきました。

ブルー/グリーンデプロイメント戦略や、Planetscale、Neon、Tursoなどのサーバーレスデータベースとの相性も抜群です。

 drizzle-kit push では、drizzle.config.ts設定ファイルまたはCLIオプションで、方言、スキーマファイルへのパス、データベース接続URLまたはuser:password@host:port/dbパラメータを指定する必要があります。


```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
});

```

```terminal
npx drizzle-kit push

```

-

```terminal
# With CLI options
npx drizzle-kit push --dialect=postgresql --schema=./src/schema.ts --url=postgresql://user:password@host:port/dbname

```

#### Schema files path

schema.tsファイルは1つでも、プロジェクトに分散させたいスキーマファイルをいくつでも持つことができます。

DrizzleKitでは、スキーマ設定オプションを使用して、スキーマファイルへのパスをグロブとして指定する必要があります。

(略)

#### Multiple configuration files in one project

(略)

#### Specifying database driver

Expo SQLiteとOP SQLiteはオンデバイス(ユーザーごと)データベースなので、マイグレーションをプッシュする方法はありません。
組み込みデータベースについては、Drizzleが組み込みマイグレーションを提供します。

Drizzle Kitにはデータベースドライバは付属していません、

方言に基づいて、現在のプロジェクトから利用可能なデータベースドライバを自動的に選択します。

aws-data-api、pglight、d1-httpなどの例外については、ドライバパラメータを明示的に指定する必要があります。

#### Including tables, schemas and extensions

drizzle-kit push はデフォルトでパブリックスキーマのすべてのテーブルを管理します。

tablesFilters、schemaFilter、extensionFilters オプションでテーブル、スキーマ、拡張機能のリストを設定できます。

| 設定項目| 説明   | デフォルト値  |
|--------|-------|------------|
| tablesFilter    | グロブベースのテーブル名フィルター。たとえば、`["users", "user_info"]`や`"user"`のように指定。 | `"*"`                     |
| schemaFilter    | スキーマ名のフィルター。たとえば、`["public", "drizzle"]`のように指定。                        | `["public"]`              |
| extensionsFilters| インストールされたデータベース拡張のリスト。たとえばば、`["postgis"]`のように指定。             | `[]`                      |



drizzle-kitがpublicスキーマのすべてのテーブルのみを操作するように設定し、postgis拡張がインストールされていることをdrizzle-kitに知らせます。


```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
  extensionsFilters: ["postgis"],
  schemaFilter: ["public"],
  tablesFilter: ["*"],
});

```

```terminal
npx drizzle-kit push

```



#### Extended list of configurations

drizzle-kit pushにはcliのみのオプションのリストがあります。

もちろん、以下のように日本語で表にするわね。

| 設定項目 | 説明  |
|--------|-------|
| verbose | 実行前にすべてのSQL文を表示する。  |
| strict  | SQL文を実行する前に常に承認を求める。  |
| force   | データ損失を伴うすべての文を自動的に承認する。 |


```terminal
npx drizzle-kit push --strict --verbose --force

```

私たちはdrizzle.config.tsファイルを通してdrizzle-kitを設定することを推奨していますが、CI/CDパイプラインなどで必要であればCLIを通してすべての設定オプションを提供できます。

もちろん、以下のように日本語で表にするわね。

| 設定項目 | 説明 | デフォルト値 |
|---------|-----|------------|
| dialect | データベースのダイアレクト。`postgresql`、`mysql`、`sqlite`、`turso`、`singlestore`のいずれかを指定。 | 必須 |
| schema | TypeScriptスキーマファイルまたは複数のスキーマファイルが含まれるフォルダへのパス。 | 必須 |
| driver | ドライバの例外。`aws-data-api`、`d1-http`、`pglight`など。 | |
| tablesFilter | テーブル名フィルター。 | |
| schemaFilter | スキーマ名のフィルター。 | `["public"]` |
| extensionsFilters| データベース拡張の内部フィルター。 | |
| url | データベース接続文字列。 | |
| user | データベースユーザー。 | |
| password | データベースパスワード。 | |
| host | ホスト。 | |
| port | ポート。 | |
| database | データベース名。 | |
| config | 設定ファイルのパス。デフォルトは`drizzle.config.ts`。 | `drizzle.config.ts` |



```terminal
npx drizzle-kit push dialect=postgresql schema=src/schema.ts url=postgresql://user:password@host:port/dbname

npx drizzle-kit push dialect=postgresql schema=src/schema.ts driver=pglite url=database/

npx drizzle-kit push dialect=postgresql schema=src/schema.ts --tablesFilter=‘user*’ --extensionsFilters=postgis url=postgresql://user:password@host:port/dbname

```

#### Extended example

プロジェクトでdrizzleスキーマを宣言し、drizzle-kit pushコマンドでデータベースにプッシュしてみましょう。

```
📦 <project root>
 ├ 📂 src
 │ ├ 📜 schema.ts
 │ └ 📜 index.ts
 ├ 📜 drizzle.config.ts
 └ …

```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
});

```

```tsx
// src/schema.ts
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
})

```

コマンドを実行します。

```terminal
npx drizzle-kit push

```

データベースから既存の（空の）スキーマを取り出し、SQLマイグレーションを生成し、それをフードの下で適用します。

```sql
CREATE TABLE "users"(
  id serial primary key,
  name text,
)

```

完了。



### pull

drizzle-kit pull

drizzle-kit pull を使用すると、既存のデータベーススキーマを文字通りプル（イントロスペクト）し、schema.ts drizzle スキーマファイルを生成できます。

TypeScriptプロジェクトの外部でデータベーススキーマを管理する必要がある場合や、他の誰かが管理しているデータベースを使用している場合には、素晴らしいアプローチです。

drizzle-kitのpullでは、dialectとデータベース接続URLまたはuser:password@host:port/dbパラメータを指定する必要があります：


```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
});

```

```terminal
npx drizzle-kit pull

```

-

```terminal
// With CLI options
npx drizzle-kit pull --dialect=postgresql --url=postgresql://user:password@host:port/dbname

```



#### Multiple configuration files in one project

(略)

#### Specifying database driver

(略)

#### Including tables, schemas and extensions

drizzle-kit push はデフォルトでパブリックスキーマのすべてのテーブルを管理します。

tablesFilters、schemaFilter、extensionFilters オプションでテーブル、スキーマ、拡張機能のリストを設定できます。

もちろん、以下のように日本語で表にするわね。

| 設定項目 | 説明 | デフォルト値 |
|---------|-----|------------|
| tablesFilter | グロブベースのテーブル名フィルター。例：`["users", "user_info"]`や`"user "`など。 | `" "` |
| schemaFilter | スキーマ名のフィルター。例：`["public", "drizzle"]`など。 | `["public"]` |
| extensionsFilters | インストールされたデータベース拡張のリスト。例：`["postgis"]`など。 | `[]` |

drizzle-kitがpublicスキーマのすべてのテーブルのみを操作するように設定し、postgis拡張がインストールされていることをdrizzle-kitに知らせます。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
  extensionsFilters: ["postgis"],
  schemaFilter: ["public"],
  tablesFilter: ["*"],
});

```

```terminal
npx drizzle-kit push

```



#### Extended list of configurations

私たちはdrizzle.config.tsファイルを通してdrizzle-kitを設定することを推奨していますが、CI/CDパイプラインなどで必要であればCLIを通してすべての設定オプションを提供できます。

もちろん、以下のように日本語で表にするわね。

| 設定項目 | 説明 | デフォルト値 |
|---------|-----|------------|
| dialect | データベースのダイアレクト `postgresql`、`mysql`、`sqlite`、`turso`、`singlestore`のいずれかを指定  | 必須 |
| driver | ドライバの例外 `aws-data-api`、`d1-http`、`pglight`など  | |
| out | マイグレーションの出力フォルダパス  | `./drizzle` |
| url | データベース接続文字列  | |
| user | データベースユーザー  | |
| password | データベースパスワード  | |
| host | ホスト  | |
| port | ポート  | |
| database | データベース名  | |
| config | 設定ファイルのパス デフォルトは`drizzle.config.ts`  | `drizzle.config.ts` |
| introspect-casing | カラムやテーブルなどのJSキー生成の戦略 キャメルケースを保持  | |
| tablesFilter | テーブル名フィルター  | |
| schemaFilter | スキーマ名のフィルター  | `["public"]` |
| extensionsFilters| データベース拡張の内部フィルター  | |


```terminal
npx drizzle-kit pull --dialect=postgresql --schema=src/schema.ts --url=postgresql://user:password@host:port/dbname
npx drizzle-kit pull --dialect=postgresql --schema=src/schema.ts --driver=pglite url=database/
npx drizzle-kit pull --dialect=postgresql --schema=src/schema.ts --tablesFilter=‘user*’ --extensionsFilters=postgis url=postgresql://user:password@host:port/dbname

```



### check

drizzle-kit check

コードチェック

drizzle-kit check コマンドを使用すると、生成された SQL マイグレーション履歴の整合性をチェックできます

これは、複数の開発者がプロジェクトに参加し、異なるブランチでデータベーススキーマを変更する場合に非常に便利です。

 drizzle-kit check コマンドを使用するには、drizzle.config.ts 設定ファイルまたは CLI オプションで、方言とデータベース接続の認証情報を指定する必要があります。

```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
});

```

```terminal
npx drizzle-kit check

```

-

```terminal
# As CLI options
npx drizzle-kit check --dialect=postgresql

```



#### Multiple configuration files in one project

(略)

#### Extended list of configurations

私たちはdrizzle.config.tsファイルを通してdrizzle-kitを設定することを推奨していますが、CI/CDパイプラインなどで必要であればCLIを通してすべての設定オプションを提供できます。


もちろん、以下のように日本語で表にするわね。

| 設定項目 | 説明 | デフォルト値 |
|---------|-----|------------|
| dialect | 使用しているデータベースのダイアレクト。`postgresql`、`mysql`、または`sqlite`のいずれか。 | 必須 |
| out | マイグレーションフォルダ。 | `./drizzle` |
| config | 設定ファイルのパス。 | `drizzle.config.ts` |

```terminal
npx drizzle-kit check --dialect=postgresql
npx drizzle-kit check --dialect=postgresql --our=./migrations-folder

```



### up

drizzle-kit up

スナップショットの更新

drizzle-kit up コマンドを使うと、drizzle スキーマスナップショットを新しいバージョンにアップグレードできます。

スキーマの json スナップショットに変更を加え、内部バージョンをアップグレードする際には必要になります。

drizzle-kit up コマンドは、drizzle.config.ts 設定ファイルまたは CLI オプションで指定できます。


```tsx
// With config file
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
});

```

```terminal
npx drizzle-kit up

```

-

```terminal
# As CLI options
npx drizzle-kit up --dialect=postgresql

```



#### Multiple configuration files in one project

(略)

#### Extended list of configurations

私たちはdrizzle.config.tsファイルを通してdrizzle-kitを設定することを推奨していますが、CI/CDパイプラインなどで必要であればCLIを通してすべての設定オプションを提供できます。

以下のように日本語で表にしました。

| 設定項目 | 説明 | デフォルト値 |
|---------|-----|------------|
|   dialect   | 使用しているデータベースのダイアレクト。`postgresql`、`mysql`、または`sqlite`のいずれか。 | 必須 |
|   out   | マイグレーションフォルダ。 | `./drizzle` |
|   config   | 設定ファイルのパス。 | `drizzle.config.ts` |



### studio

drizzle-kit studio

drizzle-kit studio コマンドは local.drizzle.studio にホストされている Drizzle Studio 用のサーバーを起動します。

このコマンドでは、drizzle.config.ts 設定ファイルでデータベース接続の認証情報を指定する必要があります。

デフォルトでは、127.0.0.1:4983 で Drizzle Studio サーバーを起動します。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname"
  },
});

```

```terminal
npx drizzle-kit migrate

```


#### Configuring host and port

```terminal
npx drizzle-kit studio --port=3000
npx drizzle-kit studio --host=0.0.0.0
npx drizzle-kit studio --host=0.0.0.0 --port=3000

```



#### Logging

verbose フラグを指定することで、すべての SQL 文のロギングを有効にできます。

```terminal
npx drizzle-kit studio --verbose

```



#### Safari and Brave support

SafariとBraveはデフォルトでlocalhostへのアクセスをブロックします。

mkcertをインストールし、自己署名証明書を生成する必要があります。

1. mkcertのインストール手順に従います。

2. mkcert -install

3. drizzle-kitスタジオを再起動します。

mkcert？？？



#### Embeddable version of Drizzle Studio

ローカル開発用のホスト版Drizzle Studioは永久無料であり、Drizzleのエコシステムを充実させることを目的としています。


* Drizzle Studio コンポーネント
Drizzle Studioのフレームワークに依存しないウェブコンポーネントで、あなたのUI React Vue Svelte VanillaJSなどに埋め込むことができます。

データベースをSaaSとして提供したり、SQLをベースとしたデータ中心のSaaSソリューションを提供する場合、または顧客と対面しない個人的な社内利用を目的とする場合、非常に強力なUIエレメントとなり、貴社のサービスを向上させることができます。

(略)



#### Drizzle Studio chrome extension

Drizzle Studioクローム拡張機能

Drizzle Studio chrome 拡張機能を使用すると、PlanetScale、Cloudflare、Vercel Postgres サーバーレスデータベースを各ベンダーの管理パネルで直接閲覧できます！



#### Limitations

ホスト版Drizzle Studioはローカルでの開発を目的としており、リモート（VPSなど）での使用は想定していません。

もしあなたのVPSにDrizzle Studioをデプロイしたい場合は、アルファ版のDrizzle Studio Gatewayがありますので、TwitterのDMかDiscord #drizzle-studioチャンネルまでご連絡ください。



#### Is it open source?

オープンソースですか？
Drizzle ORMとDrizzle Kitは完全にオープンソースですが、Studioはオープンソースではありません。

ローカル開発用のDrizzle Studioは、Drizzleのエコシステムを豊かにするために永久に無料で使用できます。



---

## Custom migrations

Migrations with Drizzle Kit

Drizzleでは、Drizzle Kitやデータシーディングでは現在サポートされていないDDL代替のための独自のカスタムSQLマイグレーションを記述するために、空のマイグレーションファイルを生成できます。


```terminal
drizzle-kit generate --custom --name=seed-users

```

```
📦 <project root>
 ├ 📂 drizzle
 │ ├ 📂 _meta
 │ ├ 📜 0000_init.sql
 │ └ 📜 0001_seed-users.sql
 ├ 📂 src
 └ …

```

```sql
-- ./drizzle/0001_seed-users.sql
INSERT INTO "users" ("name") VALUES('Dan');
INSERT INTO "users" ("name") VALUES('Andrew');
INSERT INTO "users" ("name") VALUES('Dandrew');

```



### Running JavaScript and TypeScript migrations

今後のリリースでは、カスタムJavaScriptとTypeScriptのマイグレーション/シードスクリプトを実行する機能を追加する予定です。

---

## Migrations for teams

このセクションは、マイグレーションフォルダー構造の次のバージョンのリリース直後に更新されます。

詳細な GitHub ディスカッションを読んで、更新を購読できます。

---

## Web and mobile

Drizzle migrations in web and mobile environments

次のリリースで更新

---

## drizzle.config.ts (翻訳)

Drizzle Kit configuration file

Drizzle Kit 設定ファイル

Drizzle Kitでは、TypeScriptまたはJavaScriptの設定ファイルで設定オプションを宣言できます。

```
📦 <project root>
├ ...
├ 📂 drizzle
├ 📂 src
├ 📜 drizzle.config.ts
└ 📜 package.json

```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
});

```



拡張設定ファイルの例

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: "./database/",
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  }

  breakpoints: true,
  strict: true,
  verbose: true,
});

```



### Multiple configuration files

設定ファイルを複数用意

例
ローカル開発用
サーバー本番用

```terminal
npx drizzle-kit generate --config=drizzle-dev.config.ts
npx drizzle-kit generate --config=drizzle-prod.config.ts

```

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json

```



### Migrations folder

outパラメータはマイグレーション用のフォルダを定義するためのもので、デフォルトではdrizzleのオプションです。

同じプロジェクト内に異なるデータベース用の別々のスキーマを多数持つことができ、それぞれに異なるマイグレーションフォルダを持つことができるので、とても便利です。

マイグレーションフォルダには、.sql マイグレーションファイルと、drizzle-kitが使用する_metaフォルダが含まれます。

```
📦 <project root>
 ├ ...
 ├ 📂 drizzle
 │ ├ 📂 _meta
 │ ├ 📜 user.ts
 │ ├ 📜 post.ts
 │ └ 📜 comment.ts
 ├ 📂 src
 ├ 📜 drizzle.config.ts
 └ 📜 package.json

```

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql" | "turso" | "singlestore"
  schema: "./src/schema/*",
  out: "./drizzle",
});

```



---

### dialect

| 設定項目 | 説明 |
|---------|-----|
| type | データベースの種類。`postgresql`、`mysql`、`sqlite`、`turso`、`singlestore`のいずれかを指定。 |
| default | — |
| commands | 利用可能なコマンド。`generate`、`migrate`、`push`、`pull`、`check`、`up`が含まれる。 |


```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
});

```



### schema

drizzleスキーマファイルまたはスキーマファイルを含むフォルダへのグロブベースのパス。

| 設定項目 | 説明 |
|---------|-----|
| type | データ型。`string`または`string[]`（文字列または文字列の配列）を指定。 |
| default | — |
| commands | 利用可能なコマンド。`generate`、`push`が含まれる。 |

(略)



### out

SQLマイグレーションファイル、スキーマのjsonスナップショット、drizzle-kit pullコマンドからのschema.tsの出力フォルダを定義します。

以下のように日本語で表にしました。

| 設定項目 | 説明 |
|---------|-----|
| type | データ型。`string`または`string[]`（文字列または文字列の配列）を指定。 |
| default | デフォルト値は`drizzle`。 |
| commands | 利用可能なコマンド。`generate`、`migrate`、`push`、`pull`、`check`、`up`が含まれる。 |


```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
});

```



### driver

(略)



---

### dbCredentials

データベースに接続するための情報をまとめたものです。

url, user:password@host:port/db params または例外ドライバ(aws-data-api d1-http pglight )固有の接続オプションの形式でのデータベース接続認証情報。

| 設定項目 | 説明 |
|---------|-----|
|type|ドライバの接続オプションのユニオン。|
|default|—|
|commands|利用可能なコマンド。`migrate`、`push`、`pull`が含まれる。|


```tsx
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://user:password@host:port/db",
  }
})

```

```tsx
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

// via connection params
export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    host: "host",
    port: 5432,
    user: "user",
    password: "password",
    database: "dbname",
    ssl: true, // can be boolean | "require" | "allow" | "prefer" | "verify-full" | options from node:tls
  }
})

```



### migrations

drizzle-kitのmigrateを実行すると、drizzleはデータベースに正常に適用されたmigrationsをpublicスキーマ(PostgreSQLのみ)の__drizzle_migrationsというログテーブルに記録します。

| 設定項目 | 説明 |
|---------|-----|
|type|データベースのテーブル名とスキーマ名を指定する形式。`{table
string,schema
string}`|
|default|デフォルト値は`{table
"__drizzle_migrations",schema
"drizzle"}`|
|commands|利用可能なコマンドは`migrate`（マイグレーション）。|


```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  migrations: {
    table: 'my-migrations-table', // `__drizzle_migrations` by default
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
});

```




### introspect

drizzle-kit pull コマンドのための設定です。
このコマンドは、データベースのスキーマを取得して、アプリケーション内で使用できるようにします。

casing
これは、コード内でのカラムキーの大文字小文字の扱いを決定します。

"preserve": 元の大文字小文字をそのまま保持します。
"camel": キャメルケース（例：firstName）に変換します。

```tsx
// camel
import * as p from "drizzle-orm/pg-core"

export const users = p.pgTable("users", {
  id: p.serial(),
  firstName: p.text("first-name"),
  lastName: p.text("LastName"),
  email: p.text(),
  phoneNumber: p.text("phone_number"),
});

```

```tsx
// preserve
import * as p from "drizzle-orm/pg-core"

export const users = p.pgTable("users", {
  id: p.serial(),
  "first-name": p.text("first-name"),
  LastName: p.text("LastName"),
  email: p.text(),
  phone_number: p.text("phone_number"),
});

```

```sql
SELECT a.attname AS column_name, format_type(a.atttypid, a.atttypmod) as data_type FROM pg_catalog.pg_attribute a;

```

以下のように表にしました。

```
| column_name | data_type |
|---|---|
| id | serial |
| first-name | text |
| LastName | text |
| email | text |
| phone_number | text |

```



---

### tablesFilter

1つのデータベースで複数のプロジェクトを実行したい場合は、👇こちらのガイドをご覧ください。

Drizzle ORM - Goodies
https://orm.drizzle.team/docs/goodies#multi-project-schema

tablesFilterは、データベース操作を行う際に対象とするテーブルを指定するためのオプションです。

これを使うことで、特定のテーブルだけを管理できます。

たとえば、複数のプロジェクトを1つのデータベースで運営している場合に便利です。

drizzle-kit push および drizzle-kit pull は、デフォルトでパブリックスキーマのすべてのテーブルを管理します。

tablesFilters, schemaFilter, extensionFilters オプションで、テーブル、スキーマ、拡張機能のリストを設定できます。

tablesFilter オプションでは、[「users」, 「user_info」] や 「user*」 のように、グロブベースのテーブル名フィルタを指定できます



| 設定項目 | 説明 |
|---|---|
| type | 設定の形式は`string`または`string[]`（文字列または文字列の配列）。 |
| default | デフォルト値は設定されていない（—）。 |
| commands | 利用可能なコマンドは`generate`、`push`、`pull`。 |

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  tablesFilter: ["users", "posts", "project1_*"],
});

```



### schemaFilter

1 つのデータベースで複数のプロジェクトを実行する場合は、👇ガイドをご覧ください。

Drizzle ORM - Goodies
https://orm.drizzle.team/docs/goodies#multi-project-schema

drizzle-kit push と drizzle-kit pull はデフォルトでパブリックスキーマのすべてのテーブルを管理します。

tablesFilters、schemaFilter、extensionFilters オプションでテーブル、スキーマ、拡張機能のリストを設定できます。

schemaFilter オプションでは、Drizzle Kit が管理するスキーマのリストを指定できます。

| 設定項目 | 説明 |
|---|---|
| type | 設定の形式は`string[]`（文字列の配列）。 |
| default | デフォルト値は`["public"]`。 |
| commands | 利用可能なコマンドは`generate`、`push`、`pull`。 |



```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  schemaFilter: ["public", "schema1", "schema2"],
});

```



### extensionsFilters

postgisのようないくつかの拡張機能は、データベースにインストールされるとパブリックスキーマに独自のテーブルを作成します。

これらのテーブルは、drizzle-kit push や drizzle-kit pull では無視する必要があります。

extensionsFilters オプションを使用すると、drizzle kit がスキーマ内のテーブルを無視するようにインストールされた拡張機能のリストを宣言できます。

| 設定項目 | 説明 |
|---|---|
| type | 設定の形式は`["postgis"]`（PostGISに関連する設定）。 |
| default | デフォルト値は`[]`（空の配列）。 |
| commands | 利用可能なコマンドは`push`、`pull`。 |

```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  extensionsFilters: ["postgis"],
});

```

---

### entities

この設定は、データベース内の特定のエンティティに対する管理設定を行うために作成されます。

現時点ではロールを含むのみですが、最終的にはテーブル、スキーマ、エクステンション、ファンクション、トリガなど、すべてのデータベースエンティティがここに移動する予定です。



### roles

Drizzle Kit を使用してスキーマと とくに定義されたロールを管理している場合、Drizzle スキーマで定義されていないロールがある場合があります。

そのような場合、Drizzleスキーマに各ロールを記述し、.existing()でマークすることなく、Drizzle Kitがそれらのロールをスキップすることを望むかもしれません。

ロールオプションを使用すると、以下のことが可能になります：

- Drizzle Kitでのロール管理を有効または無効にします。

- Drizzle Kitによる管理から特定のロールを除外します。

- Drizzle Kitによる管理に特定のロールを含める。

- NeonやSupabaseのような、特定のロールを管理しないプロバイダのモードを有効にします。

- 上記のオプションをすべて組み合わせる

| 設定項目 | 説明 |
|---|---|
| type | `boolean` | `{ provider: "neon" | "supabase", include: string[], exclude: string[] }` |
| default | デフォルト値は`false` |
| commands | `push`、`pull`、`generate` |

👇 デフォルトではdrizzle-kitはロールを管理しないので、drizzle.config.tsで有効にする必要があります。

```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  extensionsFilters: entities: {
    roles: true
  }
});

```

👇 管理者ロールがあり、管理可能なロールのリストから除外したい。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      exclude: ['admin']
    }
  }
});

```

👇 管理者ロールがあり、管理可能なロールのリストに加えたい。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      include: ['admin']
    }
  }
});

```

Supabaseを使用しており、Supabaseによって定義されたロールを除外したい場合は、プロバイダオプションを使用できます。

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase'
    }
  }
});

```

Drizzleがデータベースプロバイダによって指定された新しいロールに比べて若干古いという状況に遭遇することがあります。

そのため、プロバイダオプションと追加ロールの除外の両方を使用する必要があるかもしれません。

Drizzleでこれを簡単に行うことができます：

```tsx
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  ...
  entities: {
    roles: {
      provider: 'supabase',
      exclude: ['new_supabase_role']
    }
  }
});

```



---

### strict

drizzle-kit push コマンドの実行時に、印刷された SQL 文を実行するかどうかの確認を求めます。

| 設定項目 | 説明 |
|---|---|
| type | `boolean` |
| default | デフォルト値は`false` |
| commands | `push` |

```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  breakpoints: false,
});

```



### verbose


verboseは、コマンド実行時に詳細なログ情報やSQLステートメントを表示するオプションを指します。この設定を有効にすると、通常の実行結果に加えて、どのようなSQLが生成されたかや、どの処理が行われたかといった詳細な情報が出力されます。

これにより、開発者はデバッグを行いやすくなり、問題が発生した際のトラブルシューティングが効率的にできるようになります。具体的には、以下のような情報が得られます：

* 実行されたSQLクエリ
* エラーや警告メッセージ
* 処理の進行状況やタイミング

設定ファイルでverboseをtrueにすることで、この詳細な出力を得ることができます。

drizzle-kitのプッシュコマンド中にすべてのSQLステートメントを表示します。

| 設定項目 | 説明 |
|---|---|
| type | `boolean` |
| default | デフォルト値は`true` |
| commands | `generate`, `push` |



```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  breakpoints: false,
});

```



### breakpoints

Drizzle Kitは、生成されたSQLマイグレーションファイルに自動的に --> ステートメントブレークポイントを埋め込みます、

これは、1つのトランザクションで複数のDDL代替ステートメントをサポートしないデータベース(MySQLとSQLite)で必要です。


breakpointsオプションフラグでオン/オフを切り替えることができます。

| 設定項目 | 説明 |
|---|---|
| type | `boolean` |
| default | デフォルト値は`true` |
| commands | `generate`, `pull` |



```tsx
// drizzle.config.ts
export default defineConfig({
  dialect: "postgresql",
  breakpoints: false,
});

```

---

## drizzle.config.ts (解説)

Drizzle Kit configuration file

### Drizzle Kitの設定ファイルの基本

1. プロジェクトのルート
   - プロジェクトのルートディレクトリには、さまざまなフォルダやファイルが含まれています。

2. 設定ファイルのインポート
   - `drizzle-kit`から`defineConfig`をインポートします。
   `typescript
   import { defineConfig } from "drizzle-kit";
   `

3. 設定の定義
   - `defineConfig`を使って設定を定義します。以下は基本的な設定項目です。
   `typescript
   export default defineConfig({
     dialect
"postgresql", // 使用するデータベースの方言
     schema
"./src/schema.ts", // スキーマファイルのパス
     out
"./drizzle", // 出力先ディレクトリ
   });
   `

### 拡張された設定ファイルの例

より詳細な設定を行うこともできます。以下はその例です。

```tsx
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",
  driver: "pglite", // 使用するドライバー
  dbCredentials: {
    url: "./database/", // データベース接続情報
  },
  extensionsFilters: ["postgis"], // 使用する拡張機能
  schemaFilter: "public", // スキーマのフィルター
  tablesFilter: "*", // テーブルのフィルター
  introspect: {
    casing: "camel", // キャメルケースの設定
  },
  migrations: {
    prefix: "timestamp", // マイグレーションのプレフィックス
    table: "__drizzle_migrations__", // マイグレーション用テーブル名
    schema: "public", // スキーマ名
  },
  entities: {
    roles: {
      provider: '', // プロバイダー設定
      exclude: [], // 除外するエンティティ
      include: [] // 含めるエンティティ
    }
  },
  breakpoints: true, // ブレークポイントの設定
  strict: true, // 厳密モード
  verbose: true, // 詳細モード
});

```



### 各設定項目の役割

- dialect
使用するデータベースの種類を指定します（この例ではPostgreSQL）。
- schema
スキーマファイルのパスを指定します。
- out
生成されたファイルの出力先を指定します。
- dbCredentials
データベース接続情報を設定します。
- extensionsFilters
使用する拡張機能をフィルタリングします。
- schemaFilter
対象とするスキーマを指定します。
- tablesFilter
対象とするテーブルをフィルタリングします。
- introspect
データベースのスキーマを取得する際の設定を行います。
- migrations
マイグレーション設定を行います。
- entities
エンティティの設定を行います。
- breakpoints, strict, verbose
各種デバッグやモードを設定します。

このように、Drizzle Kitの設定ファイルを使うことで、データベースとの接続やスキーマの管理が効率的に行えます。何か不明な点があれば教えてください！








----------------------------------------

# SEEDING

Drizzle Seed

## Overview

drizzle-orm@0.36.4以降

Drizzle Seedは、データベースにリアルな偽データを生成するためのTypeScriptライブラリです。

drizzle-seedはTypeScriptライブラリで、決定論的でありながら現実的な偽データを生成してデータベースに投入できます。

シード可能な擬似乱数ジェネレーター(pRNG)を利用することで、生成されるデータが一貫しており、異なる実行でも再現可能であることを保証します。

これはテスト、開発、デバッグの目的で特に役立ちます。



#### What is Deterministic Data Generation?

決定論的データ生成とは何ですか？

決定論的データ生成とは、同じ入力が常に同じ出力を生成します。
drizzle-seedの文脈では、ライブラリを同じシード番号で初期化すると、毎回同じシーケンスの偽データが生成されます。
これにより、予測可能で再現性のあるデータセットが可能になります。



#### Pseudorandom Number Generator (pRNG)

擬似乱数ジェネレーター（pRNG）

擬似乱数ジェネレーターは、乱数の性質に近似した数列を生成するアルゴリズムです。

これはシードと呼ばれる初期値に基づいているため、そのランダム性を制御できます。

同じシードを使うことで、pRNGは同じ数列を生成し、データ生成プロセスの再現性を高めることができます。



#### Benefits of Using a pRNG:

擬似乱数ジェネレーター（pRNG）を使う利点

* 一貫性： テストが毎回同じデータで実行されることを保証します。

* デバッグ： 一貫性のあるデータセットを提供することで、バグの再現と修正が容易になります。

* コラボレーション： チームメンバーはシード番号を共有し、同じデータセットで作業できます。

drizzle-seedを使用することで、現実的な偽データを生成する能力と、必要なときにいつでもそれを再現する制御能力の両方を手に入れることができます。



### Installation

```terminal
npm i drizzle-seed

```



### Basic Usage

この例では、ランダムな名前とIDを持つ10人のユーザーを作成します。

seed.ts

```tsx
// seed.ts
import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

const users = pgTable("users", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { users });
}

main();

```

```json
"drizzle:seed": "tsx ./src/db/seed.ts"

```



### Options

オプション

#### count

デフォルトでは、seed 関数は 10 個のエンティティを作成します。

しかし、テストにもっと多くのエンティティが必要な場合は、seed オプション・オブジェクトで指定できます。

```tsx
await seed(db, schema, { count: 1000 });

```



#### seed

以降のすべての実行で異なる値のセットを生成するためにシードが必要な場合は、シード・オプションで異なる数値を定義できます。

どのような新しい数値でも、一意な値の集合が生成されます

```tsx
await seed(db, schema, { seed: 12345 });

```



### Reset database

drizzle-seedを使用すると、データベースを簡単にリセットし、テストスイートなどで新しい値をシードできます。

```tsx
// path to a file with schema you want to reset
import * as schema from "./schema.ts";
import { reset } from "drizzle-seed";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
}

main();

```

方言によって、データベースのリセット方法は異なります。

PostgreSQLの場合、drizzle-seedパッケージはリセット関数を実行した後、すべてのテーブルが空になるようにCASCADEオプション付きのTRUNCATE文を生成します。

```sql
TRUNCATE tableName1, tableName2, ... CASCADE;

```



### Refinements

drizzle-seedがデフォルトで使用するシードジェネレータ関数の動作を変更する必要がある場合、独自の実装を指定し、シード処理に独自の値のリストを使用することもできます。

 .refineは、drizzle-seedから利用可能なすべてのジェネレータ関数のリストを受け取るコールバックです。これは、refineしたいテーブルを表すキーを持つオブジェクトを返し、必要に応じてその動作を定義します。各テーブルにはいくつかのプロパティを指定できます。

- カラム： 必要なジェネレータ関数を指定することで、各カラムのデフォルトの動作を絞り込むことができます。

- count： データベースに挿入する行数を指定します。デフォルトでは10です。seed()オプションでグローバルカウントが定義されている場合は、ここで定義したカウントがこの特定のテーブルのそれを上書きします。

- を使用します： 関連エンティティを生成したい場合に、親テーブルごとに作成する参照エンティティの数を定義します。

情報
また、作成したい参照値の数に対して加重ランダム分布を指定することもできます。このAPIの詳細については、Weighted Randomのドキュメントセクションを参照してください。

Drizzle ORM - Overview
https://orm.drizzle.team/docs/seed-overview#weighted-random

#### API

```tsx
await seed(db, schema).refine((f) => ({
  users: {
    columns: {},
    count: 10,
    with: {
        posts: 10
    }
  },
}));

```

何が起こるかを説明するいくつかの例を見てみましょう。

```tsx
// schema.ts
import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey(),
  description: text(),
  userId: integer().references(() => users.id),
});

```

例 1: ユーザー テーブルのみに 20 個のエンティティをシードし、名前列のシード ロジックを改良する

```tsx
// index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './schema.ts'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { users: schema.users }).refine((f) => ({
    users: {
        columns: {
            name: f.fullName(),
        },
        count: 20
    }
  }));
}

main();

```

例 2: users テーブルに 20 エンティティをシードし、posts テーブルにシードして各ユーザに 10 件の投稿を追加し、posts から users への参照を作成する。

```tsx
// index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './schema.ts'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, schema).refine((f) => ({
    users: {
        count: 20,
        with: {
            posts: 10
        }
    }
  }));
}

main();

```

例3：usersテーブルに5つのエンティティを設定し、usersエンティティに接続することなく、データベースに100の投稿を入力します。

usersのid生成を改良して、10000から20000までの任意のintを与え 一意性を保つようにし、postsを改良して自分で定義した配列から値を取得するようにします。

```tsx
// index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './schema.ts'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, schema).refine((f) => ({
    users: {
        count: 5,
        columns: {
            id: f.int({
              minValue: 10000,
              maxValue: 20000,
              isUnique: true,
            }),
        }
    },
    posts: {
        count: 100,
        columns: {
            description: f.valuesFromArray({
            values: [
                "The sun set behind the mountains, painting the sky in hues of orange and purple",
                "I can't believe how good this homemade pizza turned out!",
                "Sometimes, all you need is a good book and a quiet corner.",
                "Who else thinks rainy days are perfect for binge-watching old movies?",
                "Tried a new hiking trail today and found the most amazing waterfall!",
                // ...
            ],
          })
        }
    }
  }));
}

main();

```

重要

このドキュメントでは、さらに多くの可能性を定義する予定ですが、今のところ、このドキュメントのいくつかのセクションを調べることができます。

ジェネレーターのセクションをチェックして、使用できるすべてのジェネレーター関数に精通してください。

とくに素晴らしい機能は、列に対して生成されるジェネレータ値と、drizzle-seedによって生成される関連エンティティの数を決定するための重み付きランダム化を使用する機能です。

詳しくは重み付きランダムに関するドキュメントをご覧ください。



### Weighted Random

seedの段階でデータベースに挿入する優先順位の異なる複数のデータセットを使用する必要がある場合があるかもしれません。

そのような場合のために、drizzle-seedはweighted randomと呼ばれるAPIを提供しています。

Drizzle Seed パッケージには、weighted random を使用できる場所がいくつかあります：

- 各テーブルの絞り込み内のカラム

- 作成される関連エンティティの量を決定するwithプロパティ

両方の例を確認してみましょう：

```tsx
// schema.ts
import { pgTable, integer, text, varchar, doublePrecision } from "drizzle-orm/pg-core";

export const orders = pgTable(
  "orders",
  {
    id: integer().primaryKey(),
    name: text().notNull(),
    quantityPerUnit: varchar().notNull(),
    unitPrice: doublePrecision().notNull(),
    unitsInStock: integer().notNull(),
    unitsOnOrder: integer().notNull(),
    reorderLevel: integer().notNull(),
    discontinued: integer().notNull(),
  }
);

export const details = pgTable(
  "details",
  {
    unitPrice: doublePrecision().notNull(),
    quantity: integer().notNull(),
    discount: doublePrecision().notNull(),

    orderId: integer()
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
  }
);

```

例 1： unitPrice生成ロジックを改良し、ランダムに5000個の価格を生成します。10-100の間の価格が生成される確率は30%、100-300の間の価格が生成される確率は70%です。

```tsx
// index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './schema.ts'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, schema).refine((f) => ({
    orders: {
       count: 5000,
       columns: {
           unitPrice: f.weightedRandom(
               [
                   {
                       weight: 0.3,
                       value: funcs.int({ minValue: 10, maxValue: 100 })
                   },
                   {
                       weight: 0.7,
                       value: funcs.number({ minValue: 100, maxValue: 300, precision: 100 })
                   }
               ]
           ),
       }
    }
  }));
}

main();

```

例2： 各注文に対して、60％の確率で1～3の詳細を、30％の確率で5～7の詳細を、10％の確率で8～10の詳細を生成する。

```tsx
// index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from './schema.ts'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, schema).refine((f) => ({
    orders: {
       with: {
           details:
               [
                   { weight: 0.6, count: [1, 2, 3] },
                   { weight: 0.3, count: [5, 6, 7] },
                   { weight: 0.1, count: [8, 9, 10] },
               ]
       }
    }
  }));
}

main();

```



### Complex example

```tsx
// main.ts
import { seed } from "drizzle-seed";
import * as schema from "./schema.ts";

const main = async () => {
    const titlesOfCourtesy = ["Ms.", "Mrs.", "Dr."];
    const unitsOnOrders = [0, 10, 20, 30, 50, 60, 70, 80, 100];
    const reorderLevels = [0, 5, 10, 15, 20, 25, 30];
    const quantityPerUnit = [
        "100 - 100 g pieces",
        "100 - 250 g bags",
        "10 - 200 g glasses",
        "10 - 4 oz boxes",
        "10 - 500 g pkgs.",
        "10 - 500 g pkgs."
    ];
    const discounts = [0.05, 0.15, 0.2, 0.25];

    await seed(db, schema).refine((funcs) => ({
        customers: {
            count: 10000,
            columns: {
                companyName: funcs.companyName(),
                contactName: funcs.fullName(),
                contactTitle: funcs.jobTitle(),
                address: funcs.streetAddress(),
                city: funcs.city(),
                postalCode: funcs.postcode(),
                region: funcs.state(),
                country: funcs.country(),
                phone: funcs.phoneNumber({ template: "(###) ###-####" }),
                fax: funcs.phoneNumber({ template: "(###) ###-####" })
            }
        },
        employees: {
            count: 200,
            columns: {
                firstName: funcs.firstName(),
                lastName: funcs.lastName(),
                title: funcs.jobTitle(),
                titleOfCourtesy: funcs.valuesFromArray({ values: titlesOfCourtesy }),
                birthDate: funcs.date({ minDate: "2010-12-31", maxDate: "2010-12-31" }),
                hireDate: funcs.date({ minDate: "2010-12-31", maxDate: "2024-08-26" }),
                address: funcs.streetAddress(),
                city: funcs.city(),
                postalCode: funcs.postcode(),
                country: funcs.country(),
                homePhone: funcs.phoneNumber({ template: "(###) ###-####" }),
                extension: funcs.int({ minValue: 428, maxValue: 5467 }),
                notes: funcs.loremIpsum()
            }
        },
        orders: {
            count: 50000,
            columns: {
                shipVia: funcs.int({ minValue: 1, maxValue: 3 }),
                freight: funcs.number({ minValue: 0, maxValue: 1000, precision: 100 }),
                shipName: funcs.streetAddress(),
                shipCity: funcs.city(),
                shipRegion: funcs.state(),
                shipPostalCode: funcs.postcode(),
                shipCountry: funcs.country()
            },
            with: {
                details:
                    [
                        { weight: 0.6, count: [1, 2, 3, 4] },
                        { weight: 0.2, count: [5, 6, 7, 8, 9, 10] },
                        { weight: 0.15, count: [11, 12, 13, 14, 15, 16, 17] },
                        { weight: 0.05, count: [18, 19, 20, 21, 22, 23, 24, 25] },
                    ]
            }
        },
        suppliers: {
            count: 1000,
            columns: {
                companyName: funcs.companyName(),
                contactName: funcs.fullName(),
                contactTitle: funcs.jobTitle(),
                address: funcs.streetAddress(),
                city: funcs.city(),
                postalCode: funcs.postcode(),
                region: funcs.state(),
                country: funcs.country(),
                phone: funcs.phoneNumber({ template: "(###) ###-####" })
            }
        },
        products: {
            count: 5000,
            columns: {
                name: funcs.companyName(),
                quantityPerUnit: funcs.valuesFromArray({ values: quantityPerUnit }),
                unitPrice: funcs.weightedRandom(
                    [
                        {
                            weight: 0.5,
                            value: funcs.int({ minValue: 3, maxValue: 300 })
                        },
                        {
                            weight: 0.5,
                            value: funcs.number({ minValue: 3, maxValue: 300, precision: 100 })
                        }
                    ]
                ),
                unitsInStock: funcs.int({ minValue: 0, maxValue: 125 }),
                unitsOnOrder: funcs.valuesFromArray({ values: unitsOnOrders }),
                reorderLevel: funcs.valuesFromArray({ values: reorderLevels }),
                discontinued: funcs.int({ minValue: 0, maxValue: 1 })
            }
        },
        details: {
            columns: {
                unitPrice: funcs.number({ minValue: 10, maxValue: 130 }),
                quantity: funcs.int({ minValue: 1, maxValue: 130 }),
                discount: funcs.weightedRandom(
                    [
                        { weight: 0.5, value: funcs.valuesFromArray({ values: discounts }) },
                        { weight: 0.5, value: funcs.default({ defaultValue: 0 }) }
                    ]
                )
            }
        }
    }));
}

main();

```

```tsx
// schema.ts
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customers = pgTable('customer', {
	id: varchar({ length: 256 }).primaryKey(),
	companyName: text().notNull(),
	contactName: text().notNull(),
	contactTitle: text().notNull(),
	address: text().notNull(),
	city: text().notNull(),
	postalCode: text(),
	region: text(),
	country: text().notNull(),
	phone: text().notNull(),
	fax: text(),
});

export const employees = pgTable(
	'employee',
	{
		id: integer().primaryKey(),
		lastName: text().notNull(),
		firstName: text(),
		title: text().notNull(),
		titleOfCourtesy: text().notNull(),
		birthDate: timestamp().notNull(),
		hireDate: timestamp().notNull(),
		address: text().notNull(),
		city: text().notNull(),
		postalCode: text().notNull(),
		country: text().notNull(),
		homePhone: text().notNull(),
		extension: integer().notNull(),
		notes: text().notNull(),
		reportsTo: integer().references((): AnyPgColumn => employees.id),
		photoPath: text(),
	},
);

export const orders = pgTable('order', {
	id: integer().primaryKey(),
	orderDate: timestamp().notNull(),
	requiredDate: timestamp().notNull(),
	shippedDate: timestamp(),
	shipVia: integer().notNull(),
	freight: numeric().notNull(),
	shipName: text().notNull(),
	shipCity: text().notNull(),
	shipRegion: text(),
	shipPostalCode: text(),
	shipCountry: text().notNull(),

	customerId: text().notNull().references(() => customers.id, { onDelete: 'cascade' }),

	employeeId: integer().notNull().references(() => employees.id, { onDelete: 'cascade' }),
});

export const suppliers = pgTable('supplier', {
	id: integer().primaryKey(),
	companyName: text().notNull(),
	contactName: text().notNull(),
	contactTitle: text().notNull(),
	address: text().notNull(),
	city: text().notNull(),
	region: text(),
	postalCode: text().notNull(),
	country: text().notNull(),
	phone: text().notNull(),
});

export const products = pgTable('product', {
	id: integer().primaryKey(),
	name: text().notNull(),
	quantityPerUnit: text().notNull(),
	unitPrice: numeric().notNull(),
	unitsInStock: integer().notNull(),
	unitsOnOrder: integer().notNull(),
	reorderLevel: integer().notNull(),
	discontinued: integer().notNull(),

	supplierId: integer().notNull().references(() => suppliers.id, { onDelete: 'cascade' }),
});

export const details = pgTable('order_detail', {
	unitPrice: numeric().notNull(),
	quantity: integer().notNull(),
	discount: numeric().notNull(),

	orderId: integer().notNull().references(() => orders.id, { onDelete: 'cascade' }),

	productId: integer().notNull().references(() => products.id, { onDelete: 'cascade' }),
});

```



### Limitations

#### Types limitations for with

による型の制限

TypeScript の制限と Drizzle の現在の API により、テーブル間の参照を適切に推測することができません。

つまり、with オプションはスキーマ内のすべてのテーブルを表示し、一対多のリレーションを持つテーブルを手動で選択する必要があります。

警告

withオプションは1対多のリレーションシップに対して機能する。

たとえば、1人のユーザーと多数の投稿がある場合、usersとpostsは使えますが、postsとusersは使えません。

#### Type limitations for the third parameter in Drizzle tables:
Drizzleテーブルにおける3番目のパラメータの型制限：

現在、Drizzleテーブルの3番目のパラメータの型はサポートされていません。実行時には機能しますが、型レベルでは正しく機能しません。



---

## Generators

### default

ジェネレータが呼び出されるたびに、同じ値を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| defaultValue | — | any |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      content: funcs.default({
        // value you want to generate
        defaultValue: "post content"
      }),
    },
  },
}));

```

### valuesFromArray

指定された配列から値を生成します

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| values | — | `any[]` | `{ weight: number; values: any[] }[]` |
| isUnique | データベースのカラムのユニーク性 | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      title: funcs.valuesFromArray({
        // Array of values you want to generate (can be an array of weighted values)
        values: ["Title1", "Title2", "Title3", "Title4", "Title5"],

        // Property that controls whether the generated values will be unique or not
        isUnique: true,
      }),
    },
  },
}));

```



### intPrimaryKey

1 から始まる連続した整数を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |



### number

指定された範囲内の浮動小数点数値を生成します

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique | データベースのカラムのユニーク性 | boolean |
| precision | 100 | number |
| maxValue | `precision 1000` （isUniqueがfalseの場合）<br>`precision count` （isUniqueがtrueの場合） | number |
| minValue | -maxValue | number |


```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  products: {
    columns: {
      unitPrice: funcs.number({
        // lower border of range.
        minValue: 10,

        // upper border of range.
        maxValue: 120,

        // precision of generated number:
        // precision equals 10 means that values will be accurate to one tenth (1.2, 34.6);
        // precision equals 100 means that values will be accurate to one hundredth (1.23, 34.67).
        precision: 100,

        // property that controls if generated values gonna be unique or not.
        isUnique: false,
      }),
    },
  },
}));

```



### int

指定された範囲内の整数を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique | データベースのカラムのユニーク性 | boolean |
| maxValue | `1000` （isUniqueがfalseの場合）<br>`count * 10` （isUniqueがtrueの場合） | number bigint |
| minValue | -maxValue | number bigint |


```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  products: {
    columns: {
      unitsInStock: funcs.int({
        // lower border of range.
        minValue: 0,

        // lower border of range.
        maxValue: 100,

        // property that controls if generated values gonna be unique or not.
        isUnique: false,
      }),
    },
  },
}));

```



### boolean

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      isAvailable: funcs.boolean(),
    },
  },
}));

```



### date

指定された範囲内で日付を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| minDate | `new Date('2020-05-08')` | string Date |
| maxDate | `new Date('2028-05-08')` | string Date |

いずれかのパラメータ（minDateまたはmaxDate）のみが指定された場合、指定されていないパラメータは、指定されたパラメータに8年を加算または減算して計算されます。


```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthDate: funcs.date({
        // lower border of range.
        minDate: "1990-01-01",

        // upper border of range.
        maxDate: "2010-12-31"
      }),
    },
  },
}));

```


### time

24時間形式で時間を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthTime: funcs.time(),
    },
  },
}));

```



### timestamp

タイムスタンプを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  orders: {
    columns: {
      shippedDate: funcs.timestamp(),
    },
  },
}));

```



### datetime

日時オブジェクトを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  orders: {
    columns: {
      shippedDate: funcs.datetime(),
    },
  },
}));

```



### year

YYYY 形式で年を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthYear: funcs.year(),
    },
  },
}));

```



### json

固定構造のJSONオブジェクトを生成します。

```tsx
{ email, name, isGraduated, hasJob, salary, startedWorking, visitedCountries}

// or

{ email, name, isGraduated, hasJob, visitedCountries }

```

JSON構造はランダムに選ばれます。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      metadata: funcs.json(),
    },
  },
}));

```



### interval

時間間隔を生成します。

生成される値の例：1年12日5分

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique     | カラムのユニーク性        | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      timeSpentOnWebsite: funcs.interval({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true
      }),
    },
  },
}));

```



### string

ランダムな文字列を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —                 | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      hashedPassword: funcs.string({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false
      }),
    },
  },
}));

```



### firstName

人のファーストネームを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      firstName: funcs.firstName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true
      }),
    },
  },
}));

```


### lastName

人の姓を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      lastName: funcs.lastName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false
      }),
    },
  },
}));

```



### fullName

人のフルネームを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      fullName: funcs.fullName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true
      }),
    },
  },
}));

```



### email

固有のメールアドレスを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      email: funcs.email(),
    },
  },
}));

```



### phoneNumber

固有の電話番号を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| template | — | string |
| prefixes | 使用するデータセットのプレフィックス | string[] |
| generatedDigitsNumbers | `7`（プレフィックスが定義されている場合） | number number[] |

```tsx
import { seed } from "drizzle-seed";

//generate phone number using template property
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `template` - phone number template, where all '#' symbols will be substituted with generated digits.
        template: "+(380) ###-####"
      }),
    },
  },
}));

```



```tsx
import { seed } from "drizzle-seed";

//generate phone number using template property
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `template` - phone number template, where all '#' symbols will be substituted with generated digits.
        template: "+(380) ###-####"
      }),
    },
  },
}));

```



```tsx
import { seed } from "drizzle-seed";

//generate phone number using prefixes and generatedDigitsNumbers properties
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `prefixes` - array of any string you want to be your phone number prefixes.(not compatible with `template` property)
        prefixes: ["+380 99", "+380 67"],

        // `generatedDigitsNumbers` - number of digits that will be added at the end of prefixes.(not compatible with `template` property)
        generatedDigitsNumbers: 7,
      }),
    },
  },
}));

```

```tsx
import { seed } from "drizzle-seed";

// generate phone number using prefixes and generatedDigitsNumbers properties but with different generatedDigitsNumbers for prefixes
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `prefixes` - array of any string you want to be your phone number prefixes.(not compatible with `template` property)
        prefixes: ["+380 99", "+380 67", "+1"],

        // `generatedDigitsNumbers` - number of digits that will be added at the end of prefixes.(not compatible with `template` property)
        generatedDigitsNumbers: [7, 7, 10],
      }),
    },
  },
}));

```



### country

国名を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      country: funcs.country({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false
      }),
    },
  },
}));

```



### city

都市名を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      city: funcs.city({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false
      }),
    },
  },
}));

```



### streetAddress

住所を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      streetAddress: funcs.streetAddress({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false
      }),
    },
  },
}));

```



### jobTitle

役職名を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      jobTitle: funcs.jobTitle(),
    },
  },
}));

```



### postcode

郵便番号を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      postcode: funcs.postcode({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true
      }),
    },
  },
}));

```



### state

米国の州を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| —              | —                 | —  |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      state: funcs.state(),
    },
  },
}));

```



### companyName

ランダムな会社名を生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique   | —          | boolean |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      company: funcs.companyName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true
      }),
    },
  },
}));

```



### loremIpsum

lorem ipsum テキスト文を生成する。

lorem ipsumは、
主にデザインやレイアウトのテストに使われるダミーテキストです。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| sentencesCount   | 1   | number |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      content: funcs.loremIpsum({
        // `sentencesCount` - number of sentences you want to generate as one generated value(string).
        sentencesCount: 2
      }),
    },
  },
}));

```



### point

x 座標と y 座標の指定された範囲内で 2D ポイントを生成します。

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique | データベースのカラムのユニーク性 | boolean |
| maxXValue | `10 * 1000` （isUniqueがfalseの場合）<br>`10 * count` （isUniqueがtrueの場合） | number |
| minXValue | -maxXValue | number |
| maxYValue | `10 * 1000` （isUniqueがfalseの場合）<br>`10 * count` （isUniqueがtrueの場合） | number |
| minYValue | -maxYValue | number |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  triangles: {
    columns: {
      pointCoords: funcs.point({
        // `isUnique` - property that controls if generated values gonna be unique or not.
        isUnique: true,

        // `minXValue` - lower bound of range for x coordinate.
        minXValue: -5,

        // `maxXValue` - upper bound of range for x coordinate.
        maxXValue: 20,

        // `minYValue` - lower bound of range for y coordinate.
        minYValue: 0,

        // `maxYValue` - upper bound of range for y coordinate.
        maxYValue: 30,
      }),
    },
  },
}));

```



### line

線のパラメータa,b,cを指定した範囲内で2次元直線を生成します。

```tsx
line equation: a*x + b*y + c = 0

```

| パラメータ名 | デフォルト値 | 型 |
|-----------|------------|---|
| isUnique | データベースのカラムのユニーク性 | boolean |
| maxAValue | `10 * 1000` （isUniqueがfalseの場合）<br>`10 * count` （isUniqueがtrueの場合） | number |
| minAValue | -maxAValue | number |
| maxBValue | `10 * 1000` （isUniqueがfalseの場合）<br>`10 * count` （isUniqueがtrueの場合） | number |
| minBValue | -maxBValue | number |
| maxCValue | `10 * 1000` （isUniqueがfalseの場合）<br>`10 * count` （isUniqueがtrueの場合） | number |
| minCValue | -maxCValue | number |

```tsx
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  lines: {
    columns: {
      lineParams: funcs.point({
        // `isUnique` - property that controls if generated values gonna be unique or not.
        isUnique: true,

        // `minAValue` - lower bound of range for a parameter.
        minAValue: -5,

        // `maxAValue` - upper bound of range for x parameter.
        maxAValue: 20,

        // `minBValue` - lower bound of range for y parameter.
        minBValue: 0,

        // `maxBValue` - upper bound of range for y parameter.
        maxBValue: 30,

        // `minCValue` - lower bound of range for y parameter.
        minCValue: 0,

        // `maxCValue` - upper bound of range for y parameter.
        maxCValue: 10,
      }),
    },
  },
}));

```



----------------------------------------

# ACCESS YOUR DATA

この機能は、ネストされたリレーショナルデータを簡単に取得できるようになります。

複雑な結合やデータマッピングを避けられるから、開発がすごく楽になります。



## Query

Drizzle Queries

DrizzleORMは、SQLの上に薄く型付けされたレイヤーを重ねるように設計されています。

私たちは、TypeScriptからSQLデータベースを操作する最良の方法を設計したと信じています。

リレーショナルクエリは、SQLデータベースからネストしたリレーショナルデータをクエリする際に、多重結合や複雑なデータマッピングを避け、優れた開発者エクスペリエンスを提供することを目的としています。

これは既存のスキーマ定義とクエリビルダの拡張機能です。

ニーズに応じて使用できます。

クラス最高の開発者エクスペリエンスとパフォーマンスの両方が得られるようにしました。

(略)



### Modes

Drizzleのリレーショナルクエリは、データベース上で実行するSQL文を常に正確に1つ生成しますが、これにはいくつかの注意点があります。

あらゆるデータベースに対してクラス最高のサポートを提供するために、モードを導入しました。

Drizzleリレーショナルクエリはサブクエリの横結合を使用しますが、今のところPlanetScaleではサポートしていません。

通常のMySQLデータベースでmysql2ドライバを使用する場合は、モードを指定する必要があります：「PlanetScaleでmysql2ドライバを使用する場合は、モードを指定する必要があります：「planetscale」

(略)



### Querying

リレーショナルクエリはDrizzleオリジナルの👇クエリビルダの拡張機能です。

Drizzle ORM - Select
https://orm.drizzle.team/docs/select

drizzle()の初期化時にスキーマファイルからすべてのテーブルとリレーションを提供し、db.query APIを使用する必要があります。

drizzle インポートパスは使用しているデータベースドライバによって異なります。

(略)

Drizzle は .findMany() および .findFirst() API を提供します。



### Find many

(略)

### Find first

.findFirst()は、クエリにリミット1を追加します。

(略)

### Include relations

With 演算子を使用すると、関連する複数のテーブルからデータを結合し、結果を適切に集計できます。

コメント付きの投稿をすべて取得します。

(略)

コメント付きの最初の投稿を取得します。

(略)

入れ子になったステートメントは必要なだけ連結できます。
ネストされたクエリに対して、DrizzleはCore Type APIを使用して型を推測します。

投稿のあるすべてのユーザーを取得します。各投稿にはコメントのリストが含まれている必要があります。

(略)



### Partial fields select

columnsパラメータを使用すると、データベースから取得したいカラムを含めたり省略したりできます。

Drizzleはクエリレベルで部分選択を行い、データベースから追加のデータは転送されません。

Drizzleは単一のSQL文を出力することに注意してください。

id、content、include commentsだけですべての投稿を取得します。

(略)

コンテンツのないすべての投稿を取得します。


(略)

trueとfalseの両方の選択オプションが存在する場合、falseのオプションはすべて無視されます。

name フィールドをインクルードし、id フィールドを除外する場合、id の除外は冗長になり、name 以外のフィールドはすべて除外されます。

同じクエリでフィールドを除外とインクルードする：

(略)

ネストされたリレーションからの列のみを含めます。

(略)



### Nested partial fields select

部分選択と同様に、ネストされたリレーションの列を含めたり除外したりできます。

(略)



### Select filters

SQLライクなクエリビルダのように、リレーショナルクエリAPIでは、演算子のリストを使ってフィルタや条件を定義できます。

drizzle-ormからインポートするか、コールバック構文から使用できます。

(略)

特定の日付以前に作成されたid=1の投稿とコメントを検索する：

(略)


### Limit & Offset

Drizzle ORMは、クエリおよびネストされたエンティティにリミットとオフセットのAPIを提供します。

5 件の投稿を検索:

(略)

投稿を検索し、最大 3 件のコメントを取得します。

(略)

オフセットはトップレベルのクエリでのみ使用できます。

(略)

5番目から10番目の投稿までのコメント付きの投稿を検索します。

(略)



### Order By

Drizzleはリレーショナルクエリビルダで順序を指定するためのAPIを提供します。

同じ順序付けコア API を使用するか、インポートなしでコールバックから演算子による順序付けを使用できます。

(略)

Order by asc + desc:

(略)



### Include custom fields

リレーショナルクエリーAPIでは、カスタムフィールドを追加できます。

データを取得し、それに追加関数を適用する必要がある場合に便利です。

重要
現在のところ、エクストラクエリでは集約はサポートしていません。

(略)

lowerName をキーとすると、返されるオブジェクトのすべてのフィールドに含まれます。

重要
.as(「<name_for_column>」) を明示的に指定する必要があります。

fullNameフィールド（firstNameとlastNameを連結したもの）を含めて、グループを持つすべてのユーザを取得するには、

Drizzleリレーショナルクエリビルダを使って以下のクエリを使用します。

(略)

コメント付きのすべての投稿を取得し、投稿コンテンツのサイズと各コメントコンテンツのサイズを計算するための追加フィールドを追加するには、次のようにします。

(略)



### Prepared statements

プリペアドステートメントはクエリのパフォーマンスを大幅に向上させるように設計されています。

👇ここを見てください

Drizzle ORM - Queries

https://orm.drizzle.team/docs/perf-queries

このセクションでは、Drizzleリレーショナルクエリビルダを使ってプレースホルダを定義し、プリペアドステートメントを実行する方法を説明します。

Placeholder in where

(略)

Placeholder in limit

(略)

Placeholder in offset

(略)

Multiple placeholders

(略)




---

## Select

SQL Select

Drizzleは、データベースからデータを取得するための方法を提供します。

DrizzleはSQLに似た方法でデータを取得できるツールです。

テーブルの構成に基づいて、結果の型が自動的に推測されます（カラムのNULL許可も考慮されます）。

要するに、データを取得するための簡単で安全な方法を提供しているということです。

(略)



### Basic select

すべての列を含むテーブルからすべての行を選択します。

(略)

結果の型は、カラムのnullabilityを含むテーブル定義に基づいて自動的に推測されることに注意してください。

Drizzleはselect *を使用する代わりに、常にselect句でカラムを明示的にリストします。

これは、クエリ結果のフィールドの順序を保証するために内部的に要求されるもので、一般的に良い習慣とされています。



### Partial select

テーブルからカラムのサブセットだけを選択したいこともあるでしょう。その場合は、選択オブジェクトを .select() メソッドに渡します：

(略)

SQLのように、テーブルのカラムだけでなく、任意の式を選択フィールドとして使うことができる：

(略)

sql<string>を指定することで、Drizzleにフィールドの期待される型が文字列であることを伝えます。
間違った指定（たとえば、文字列として返されるフィールドにsql<number>を使用する）をすると、実行時の値は期待される型と一致しません。Drizzleは提供された型ジェネリックに基づいて型キャストを行うことができません。

返される値に実行時の変換を適用する必要がある場合は、.mapWith()メソッドを使用できます。



### Conditional select

いくつかの条件に基づいて動的な選択オブジェクトを作成できます。

(略)



### Distinct select

.select() のかわりに .selectDistinct() を使用すると、 データセットから一意な行だけを取り出すことができます：

(略)

PostgreSQLでは、distinct on句を使用して一意な行を決定する方法を指定することもできます：

重要
distinct on句はPostgreSQLでのみサポートされています。

(略)



### Advanced select

TypeScriptを採用したDrizzle APIでは、さまざまな柔軟な方法でselectクエリを作成できます。より詳細な使用例については、専用ガイドをご覧ください。

Drizzle ORM - Include or Exclude Columns in Query

https://orm.drizzle.team/docs/guides/include-or-exclude-columns

(略)



### Filters

.where() メソッドでフィルタ演算子を使用すると、クエリ結果をフィルタリングできます：

Drizzle ORM - Filters

https://orm.drizzle.team/docs/operators

(略)

すべてのフィルター演算子はsql関数を使って実装されています。

これを使用して、任意のSQLフィルタを書いたり、独自の演算子を作成したりできます。

Drizzleが提供する演算子がどのように実装されているか、参考にしてみてください。

drizzle-orm/drizzle-orm/src/sql/expressions/conditions.ts at main · drizzle-team/drizzle-orm

https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sql/expressions/conditions.ts

(略)

フィルタ演算子やSQL関数に提供される値はすべて、自動的にパラメータ化されます。たとえば、このクエリは

```tsx
await db.select().from(users).where(eq(users.id, 42));

👆これは、👇下のように翻訳されます

select "id", "name", "age" from "users" where "id" = $1; -- params: [42]

```

not演算子を使用して条件を反転します。

(略)

スキーマを安全に変更し、テーブルやカラムの名前を変更することができ、生のSQLを書くときにカラム名やテーブル名をハードコーディングするのとは対照的に、テンプレート補間によってクエリに自動的に反映されます。

### Combining filters

フィルタ演算子とand()演算子、or()演算子を論理的に組み合わせることができます。

(略)



### Advanced filters

TypeScriptと組み合わせることで、Drizzle APIはクエリにフィルタを組み合わせる強力で柔軟な方法を提供します。

条件付きフィルタリングのプレビュー、

より詳細な使用例については、👇専用ガイドをご覧ください。

Drizzle ORM - Conditional filters in query

https://orm.drizzle.team/docs/guides/conditional-filters-in-query
(略)



### Limit & offset

.limit() および .offset() を使用して、クエリに limit 節および offset 節を追加します。

(略)



### Order By

.orderBy() を使用して、クエリに order by 節を追加し、指定したフィールドで結果をソートします。

(略)



### Advanced pagination

TypeScriptを採用したDrizzle APIでは、あらゆるSQLのページネーションやソートアプローチを実装できます。

詳細な使用例については、limit offset paginationとcursor paginationの👇ガイドをご覧ください。

Drizzle ORM - SQL Limit/Offset pagination
https://orm.drizzle.team/docs/guides/limit-offset-pagination

Drizzle ORM - SQL Cursor-based pagination
https://orm.drizzle.team/docs/guides/cursor-based-pagination

(略)



### WITH clause

WITH文のinsert、update、deleteでの使用方法の確認

with句を使用すると、複雑なクエリを共通テーブル式（CTE）と呼ばれる小さなサブクエリに分割して簡素化できます：

(略)

任意の SQL 値を CTE のフィールドとして選択し、他の CTE やメインのクエリで参照するには、そのフィールドにエイリアスを追加する必要があります。

(略)

エイリアスを提供しない場合、フィールドの型はDrizzleTypeErrorとなり、他のクエリで参照することができなくなります。

型エラーを無視してフィールドを使用しようとすると、エイリアスなしでフィールドを参照する方法がないため、ランタイムエラーが発生します。



### Select from subquery

SQLと同じように、サブクエリAPIを使うことで、クエリを他のクエリに埋め込むことができます。

(略)

サブクエリは、結合など、テーブルを使用できるあらゆる場所で使用できます。

(略)



### Aggregations

Drizzleでは、生のSQLで行うのと同じように、.groupBy()と.having()でグループ化とフィルタリングを行い、sum、count、avgなどの関数を使用して集計を行うことができます。

(略)

cast(...をintとして)が必要なのは、count()がPostgreSQLではbigintを、MySQLでは10進数を返すからです。また、.mapWith(Number) を使用して、実行時に値を数値にキャストすることもできます。

数の集約が必要な場合は、$count API を使用することをオススメします。



### Aggregations helpers

Drizzleにはラップされたsql関数のセットがあるので、アプリでよくあるケースのためにsqlテンプレートを書く必要はありません。

集計関数はSELECT文のGROUP BY句で使用されることが多いことを覚えておいてください。

そのため、1つのクエリで集約関数と他のカラムを使用して選択する場合は、.groupBy句を必ず使用してください。

#### count

式の値の数を返します。

(略)

#### countDistinct

expression関数は、expression内の重複しない値の数を返します。

(略)

#### avg

expression関数は、expressionに含まれるすべての非NULL値の平均（算術平均）を返します。

(略)

#### avgDistinct

expression関数は、expressionに含まれるすべての非NULL値の平均（算術平均）を返します。

(略)

#### sum

expression関数は、expressionに含まれるすべての非NULL値の合計を返します。

(略)

#### sumDistinct

expression関数は、expression内のすべての非NULL値および非重複値の合計を返します。

(略)

#### max

式中の最大値を返します。

(略)

#### min

式の最小値を返します。


(略)

#### より高度な例

(略)



### $count

db.$count()はcount(*)のユーティリティ・ラッパーで、そのままでもサブクエリとしても使える非常に柔軟な演算子です。

$count · drizzle-team/drizzle-orm · Discussion #3119
https://github.com/drizzle-team/drizzle-orm/discussions/3119

(略)

これはサブクエリでとくに便利です。

Drizzle ORM - Select

https://orm.drizzle.team/docs/select#select-from-subquery

(略)

リレーショナルクエリの使用例

Drizzle ORM - Query

https://orm.drizzle.team/docs/rqb

(略)



### Iterator

クエリから非常に大量の行を返す必要があり、それらをすべてメモリにロードしたくない場合は、.iterator() を使用してクエリを非同期イテレータに変換できます：

(略)

また、準備されたステートメントでも機能します。

(略)



---

## Insert

Drizzle ORM - Insert

https://orm.drizzle.team/docs/insert

SQL Insert

Drizzle ORMは、データベースのテーブルに行を挿入するもっともSQLに近い方法を提供します。



### Insert one row

Drizzleでのデータ挿入は非常に簡単で、SQLライクです。 自分の目で確かめてください。

(略)

特定のテーブルへの挿入型が必要な場合は、
typeof usersTable.$inferInsert構文を使用できます。

(略)



### Insert returning

PostgreSQLやSQLiteでは、このように行を挿入してそれを戻すことができる。

「Insert returning」は、データベースに新しい行を追加した後、その追加した行のデータを返してもらうための方法です。
この機能を使うと、データを挿入した後にその結果をすぐに取得できます。

(略)

### Insert $returningId

X PostgreSQL

MySQL自体は、INSERTを使用した後のRETURNINGをネイティブにサポートしていません。

オートインクリメント型（またはシリアル型）のプライマリキーでは、insertIdとaffectedRowsフィールドにアクセスする方法しかありません。

Drizzleでは、このようなケースを自動的に処理し、挿入されたすべてのIDを自動的に別のオブジェクトとして受け取る方法を用意しています。

(略)

そして、Drizzleでは$default関数で主キーを指定することで、実行時にカスタム主キーを生成できます。また、$returningId() のコールで、生成されたキーを返します。

(略)

If there is no primary keys -> type will be {}[] for such queries
プライマリ・キーがない場合 -> そのようなクエリは、型は {}[] になります。



### Insert multiple rows

(略)

### Upserts and conflicts

Drizzle ORMは、アップサートと競合を処理するためのシンプルなインターフェイスを提供します。



#### On conflict do nothing

onConflictDoNothingは、競合があれば挿入をキャンセルします。

(略)



### On conflict do update

onConflictDoUpdateは、競合があればその行を更新します。

(略)



#### where clauses

つまり、コンフリクトターゲットの一部として（つまり部分インデックスの場合）、または更新句の一部としてです。

(略)

Drizzleでこれらの条件を指定するには、setWhere句とtargetWhere句を使用します。

(略)

複合インデックス、または onConflictDoUpdate の複合プライマリ・キーによるアップサート

(略)



### On duplicate key update

MySQLはON CONFLICT句の代わりにON DUPLICATE KEY UPDATEをサポートしています。

MySQLはプライマリキーとユニークインデックスに基づいて自動的に競合の対象を決定し、ユニークインデックスが競合した場合に行を更新します。

DrizzleはonDuplicateKeyUpdateメソッドでこれをサポートします。

(略)

MySQLはコンフリクト時に何もしないことを直接サポートしていませんが、任意のカラムの値をそれ自身に設定することでno-opを実行し、同じ効果を得ることができます。

(略)



### with insert clause

select、update、deleteでのWITH文の使い方を確認する。

with句を使用すると、複雑なクエリを共通テーブル式（CTE）と呼ばれる小さなサブクエリに分割して簡素化できます。

(略)



### Insert into … select

SQLiteのドキュメントが言及しているように

INSERT文の2番目の形式は、VALUES句の代わりにSELECT文を含んでいます。

SELECT文の実行によって返されたデータの各行に対して、新しい項目がテーブルに挿入されます。

列リストが指定されている場合、SELECTの結果の列数は列リストの項目数と同じでなければなりません。

そうでない場合、列リストが指定されていなければ、SELECTの結果の列数はテーブルの列数と同じでなければなりません。

複合SELECTやORDERBY句やLIMIT句を含むSELECT文は、この形式のINSERT文で使用できます。

-

重要
構文解析の曖昧さを避けるために、SELECT文は常にWHERE句を含むべきです。

たとえその句が単に「WHEREtrue」であったとしても、upsert句が存在する場合です。

WHERE句がなければ、パーサは「ON」というトークンがSELECTの結合制約の一部なのか、upsert句の先頭なのかわかりません。

-

PostgreSQLのドキュメントに記載されています：

挿入する行を指定する問い合わせ（SELECT文）。

-

また、MySQLのドキュメントにあるように

INSERT ... SELECTを使用すると、1つまたは複数のテーブルから選択できるSELECT文の結果から、素早くテーブルに多くの行を挿入できます。

-

Drizzleはすべての方言で現在の構文をサポートしており、すべての方言で同じ構文を共有しています。一般的なシナリオとAPIの使い方を確認してみましょう。insertステートメント内でselectを使用するにはいくつかの方法があり、お好みの方法を選択できます：

* select 関数の内部でクエリ・ビルダーを渡すことができます。

* コールバック内でクエリ・ビルダーを使用できます。

* 使用したいカスタムselectクエリにSQLテンプレート・タグを渡すことができます。

(略)



---

## Update

SQL Update

```tsx
await db.update(users)
  .set({ name: 'Mr. Dan' })
  .where(eq(users.name, 'Dan'));

```



更新に渡すオブジェクトは、データベーススキーマのカラム名と一致するキーを持つ必要があります。

カラムを null に設定するには null を渡します。

次のように、更新オブジェクトで使用する値として SQL を渡すことができます。

```tsx
await db.update(users)
  .set({ updatedAt: sql`NOW()` })
  .where(eq(users.name, 'Dan'));

```



### Limit

X PostgreSQL

.limit()を使用して、クエリに制限句を追加します：

(略)



### Order By

.orderBy() を使用して、クエリに order by 節を追加し、指定したフィールドで結果をソートします。

(略)



### Update with returning

PostgreSQLとSQLiteでは、行を更新してそれを取り戻すことができます：

(略)



### with update clause

select、insert、deleteでのWITH文の使い方を確認する

with句を使用すると、複雑なクエリを共通テーブル式（CTE）と呼ばれる小さなサブクエリに分割して簡素化できます。

(略)



### Update … from

SQLiteのドキュメントにはこうあります：

	UPDATE-FROMの考え方はSQLの拡張であり、UPDATE文をデータベース内の他のテーブルによって駆動できるようにするものです。
	UPDATE-FROMの考え方はSQLの拡張であり、データベース内の他のテーブルによってUPDATE文を駆動することができます。
	UPDATE-FROMを使用すると、データベース内の他のテーブルとターゲットテーブルを結合し、更新が必要な行とその行の新しい値を計算することができます。



つまり、
あるテーブルのデータを他のテーブルを参照して更新できます。これを使うことで、どの行を更新するか決めるのに他のテーブルの情報を活用できます。


同様に、PostgreSQLのドキュメントには次のように書かれています：

	WHERE条件や更新式に他のテーブルのカラムを使用できるテーブル式

Drizzleもバージョンdrizzle-orm@0.36.3 からこの機能をサポートしています。

(略)

また、結合しているテーブルのエイリアスを作成することもできます。
（PGでは、更新中のテーブルのエイリアスも作成できます）

(略)

Postgresでは、結合したテーブルからカラムを返すこともできます。

(略)



---

## Delete

SQL Delete

テーブルのすべての行を削除できます。

(略)

また、フィルターや条件を使って削除することもできます。

(略)



### Limit

X PostgreSQL

(略)



### Order By

.orderBy() を使用して、クエリに order by 節を追加し、指定したフィールドで結果をソートします。

(略)



### Delete with return

PostgreSQLとSQLiteでは、行を削除して元に戻すことができます：

(略)



### WITH DELETE clause

WITH文のselect、insert、updateでの使用方法の確認

with句を使用すると、共通テーブル式（CTE）と呼ばれる小さなサブクエリに分割することで、複雑なクエリを簡素化できます。

(略)



---

## Filters

こちらはDrizzle ORMにおけるフィルター機能をまとめた表です。この表には、各演算子の機能とその使用方法が含まれています。

| 演算子名 | 説明 | 使用例 |
|---------|-----|-------|
| eq | 値が `n` と等しい | `where(eq(table.column, 5))` |
| ne | 値が `n` と等しくない | `where(ne(table.column, 5))` |
| gt | 値が `n` より大きい | `where(gt(table.column, 5))` |
| gte | 値が `n` 以上 | `where(gte(table.column, 5))` |
| lt | 値が `n` より小さい | `where(lt(table.column, 5))` |
| lte | 値が `n` 以下 | `where(lte(table.column, 5))` |
| exists | 値が存在する | `where(exists(db.select().from(table2)))` |
| notExists | 値が存在しない | `where(notExists(db.select().from(table2)))` |
| isNull | 値が `NULL` である | `where(isNull(table.column))` |
| isNotNull | 値が `NULL` ではない | `where(isNotNull(table.column))` |
| inArray | 値が指定された配列に含まれている | `where(inArray(table.column, [1, 2, 3, 4]))` |
| notInArray | 値が指定された配列に含まれていない | `where(notInArray(table.column, [1, 2, 3, 4]))`|
| between | 値が2つの値の間にある | `where(between(table.column, 2, 7))` |
| notBetween | 値が2つの値の間にない | `where(notBetween(table.column, 2, 7))` |
| like | 値が他の値に似ている（大小文字区別あり） | `where(like(table.column, '%pattern%'))` |
| ilike | 値が他の値に似ている（大小文字区別なし） | `where(ilike(table.column, '%pattern%'))` |
| notIlike | 値が他の値に似ていない（大小文字区別なし）| `where(notIlike(table.column, '%pattern%'))` |
| not | すべての条件が `false` である | `where(not(eq(table.column, 5)))` |
| and | すべての条件が `true` である | `where(and(gt(table.column, 5), lt(table.column, 10)))` |
| or | 一つ以上の条件が `true` である | `where(or(gt(table.column, 5), lt(table.column, 10)))` |
| arrayContains | カラムまたは表現がリストの全要素を含むか確認| `where(arrayContains(posts.tags, ['Typescript', 'ORM']))` |
| arrayContained | リストがカラムまたは表現の全要素を含むか確認| `where(arrayContained(posts.tags, ['Typescript', 'ORM']))` |
| arrayOverlaps | カラムまたは表現がリストのいずれかの要素を含むか確認| `where(arrayOverlaps(posts.tags, ['Typescript', 'ORM']))` |



#### 例
`where(like(table.column, 'あ'))`

likeは、たとえば1000文字の文字列の中でlike 'あ'という条件の場合、この一文字含まれているだけでtrueになります。

### その他の関連情報

#### 演算子の使用方法
- 各演算子は、SQLのWHERE句で条件を設定するために使用されます。
- たとえば、`eq`は特定のカラムの値が指定した値と等しい場合にのみデータを選択します。

#### 除外条件の設定
- `not`演算子を使うことで、条件に反するデータを選択することも可能です。これによって、データベースから除外したい項目を簡単に指定できます。

#### 配列操作
- `inArray`や`notInArray`演算子は、データベース内の配列に関連する条件を簡潔に処理するために利用されます。

### eq

(略)

### ne

(略)

### gt

(略)

### gte

(略)

### lt

(略)

### lte

(略)

### exists

(略)

### notExists

(略)

### isNull

(略)

### isNotNull

(略)

### inArray

(略)

### notInArray

(略)

### between

(略)

### notBetween

(略)

### like

(略)

### ilike

(略)

### notIlike

(略)

### not

(略)

### and

(略)

### or

(略)

### arrayContains

(略)

### arrayContained

(略)

### arrayOverlaps



---

## Utils

Drizzle query utils

### $count

db.$count()はcount(*)のユーティリティ・ラッパーで、そのままでもサブクエリとしても使える非常に柔軟な演算子です。

(略)

これはサブクエリでとくに便利です。

Drizzle ORM - Select

https://orm.drizzle.team/docs/select#select-from-subquery

(略)

リレーショナルクエリの使用例

Drizzle ORM - Query

https://orm.drizzle.team/docs/rqb

(略)



---

## Joins

Joins [SQL]

SQLのJoin句は、2つ以上のテーブルを関連するカラムに基づいて結合するために使用されます。Drizzle ORMのjoin構文は、SQL類似性と型安全性のバランスをとっています。

### Join types

Drizzle ORMにはINNER JOIN、FULL JOIN、LEFT JOIN、RIGHT JOINのAPIがあります。以下のテーブルスキーマに基づいた例を見てみましょう。

(略)



### Left Join

(略)

### Right Join

(略)

### Inner Join

(略)

### Full Join

(略)

### Partial select

特定のフィールドのサブセットを選択したり、フラットなレスポンスタイプを持つ必要がある場合、Drizzle ORMは部分選択による結合をサポートし、.select({ ... })構造に基づいて自動的にリターンタイプを推測します。

(略)

petIdがnullになることにお気づきかもしれませんが、これは左結合しているためで、ペットを持たないユーザーも存在します。

部分選択フィールドや集約に sql 演算子を使用する場合、適切な結果型を推論するために sql<type | null> を使用する必要があります！

(略)

多くのカラムを持つテーブルを結合する際に、NULL可能なフィールドが大量に発生するのを避けるために、入れ子になったselectオブジェクト構文を利用できます。このスマートな型推論は、すべてのテーブル・フィールドをNULL可能にするのではなく、オブジェクト全体をNULL可能にします！

(略)



### Aliases & Selfjoins

Drizzle ORMはテーブルエイリアスをサポートしており、セルフジョインが必要なときにとても便利です。たとえば、ユーザとその親を取得する必要があるとします。

(略)



### Aggregating results

Drizzle ORMは、構造を変更することなく、名前マップされた結果をドライバから提供します。結果は自由に操作できます。以下は、多項式リレーショナルデータをマッピングする例です。

(略)



### Many-to-one example

(略)



### Many-to-many example



---

## Magic sql operator

ORMライブラリーを使用する際、提供されているORM構文を使用して特定のクエリーを記述することが困難な場合があります。

そのような状況では、生の文字列としてクエリを作成するrawクエリを使用できます。

しかし、生のクエリには、型安全性やクエリパラメータ化の利点がないことがよくあります。

これに対処するために、多くのライブラリがSQLテンプレートという概念を導入しています。

このテンプレートによって、より型安全でパラメータ化されたクエリを書くことができ、コードの全体的な安全性と柔軟性が向上します。

強力なORMライブラリであるDrizzleもsqlテンプレートをサポートしています。

Drizzleのsqlテンプレートを使うことで、クエリをさらに詳しく作成できます。

ライブラリのクエリビルダを使ってクエリ全体を書くのが難しい場合、Drizzleクエリの特定のセクション内で選択的にsqlテンプレートを使用できます。

この柔軟性により、部分的なSELECT文、WHERE句、ORDERBY句、HAVING句、GROUPBY句、そしてリレーショナルクエリビルダーの中でもsqlテンプレートを使用できます。

Drizzleのsqlテンプレートの機能を活用することで、型安全性とクエリパラメータ化の利点を維持しながら、希望のクエリ構造と複雑さを実現できます。

これにより、アプリケーション内でより堅牢で保守しやすいコードを作成できます。



### sql“ template

他のORMでもよく見かける使い方のひとつに、生のクエリにsqlクエリをそのまま使用する機能があります。

(略)

現在のクエリを生成します。

(略)

sqlパラメータに指定されたテーブルとカラムは、テーブル名をエスケープした対応するSQL構文に自動的にマップされ、エスケープされたテーブル名がカラム名に付加されます。

さらに、${id}のような動的なパラメータは$1プレースホルダにマップされ、対応する値はデータベースに個別に渡される値の配列に移動します。

この方法は、SQLインジェクションの脆弱性を効果的に防ぎます。



### sql<T>

sql<T>は実行時のマッピングを行わないことに注意してください。

sql<T>を使って定義した型は、純粋にDrizzleのヘルパーです。

SQLクエリは非常に多用途でカスタマイズ可能であるため、正確な型を動的に決定する実行可能な方法がないことを理解することが重要です。



フィールドがunknown以外の特定の型を必要とする場所で使用するために、Drizzleでカスタム型を定義できます。

この機能は部分選択クエリでとくに有効で、選択されたフィールドの一貫した型付けを保証します。

(略)



### sql.mapWith()

データベースドライバからdrizzleに渡された値の実行時マッピングを行う必要がある場合、.mapWith()を使用できます。

この関数は、実行時にレスポンスをマッピングする異なる値を受け入れます。

mapWith内のインターフェイスがColumnで実装されているインターフェイスと同じであれば、特定のカラムマッピング戦略を複製できます。

(略)

また、DriverValueDecoderインターフェイスに独自の実装を渡すこともできます。

(略)



### sql.as<T>()

さまざまなケースで、使用したいカスタム・フィールドの名前をどのように決めるかが難しいことがあります。

選択されるフィールドのエイリアスを明示的に指定する必要がある場面に遭遇するかもしれません。

これは、複雑なクエリを扱う場合にとくに便利です。

このようなシナリオに対応するために、エイリアスを明示的に定義できる便利な.as('alias_name')ヘルパーを導入しました。

この機能を使うことで、フィールドに明確で意味のある名前をつけることができ、クエリをより直感的で読みやすいものにできます。


(略)



### sql.raw()

入力からパラメータ化された値を作成したり、テーブルやカラムをエスケープされたものにマップしたりする必要がない場合もあるでしょう。

その代わりに、単純にそのままクエリを生成したいこともあるでしょう。

そのような場合のために、sql.raw()関数を用意しています。

sql.raw()関数を使用すると、追加の処理やエスケープを行わずに生のSQL文をクエリに含めることができます。

これは、あらかじめ構成されたSQL文がある場合や、複雑なSQLコードや動的なSQLコードを直接クエリに組み込む必要がある場合に便利です。

(略)

sql関数の中でsql.raw()を使用することもでき、メインのsqlテンプレート関数でエスケープせずに生の文字列を含めることができます。

sql関数内でsql.raw()を使用することで、エスケープされていない生の文字列を直接問い合わせに組み込むことができます。

これは、テンプレート関数の自動エスケープや修正によって変更されないようにすべき特定のSQLコードや式がある場合にとくに有用です。

(略)



### sql.fromList()

SQLテンプレートはSQLチャンクを生成します。

これは、DrizzleでデータベースやクエリにSQLを適用した後に、クエリとパラメータに連結されるSQL部分の配列です。

特定のシナリオでは、カスタムビジネスロジックを使用してこれらのチャンクを配列に集約し、データベースやクエリに渡すことができる単一のSQL文に連結する必要があるかもしれません。

このような場合、fromList関数が非常に役に立ちます。

fromList関数を使うと、複数のSQLチャンクを1つのSQL文にまとめることができます。

この関数を使用すると、特定の要件にしたがって個々のSQL部分を集約して連結し、実行可能な統合SQLクエリを得ることができます。

(略)



### sql.join()

実際、sql.join関数はfromListヘルパーと同様の目的を果たします。

しかし、SQLチャンク間の空白を扱ったり、SQLチャンクを連結するための独自のセパレータを指定したりすることに関しては、さらなる柔軟性を提供します。

sql.joinを使うと、指定したセパレータを使ってSQLチャンクを連結できます。

この区切り文字には、チャンクの間に挿入したい文字列や文字を指定できます。

これは、SQLチャンクのフォーマットや区切りについて特定の要求がある場合にとくに便利です。

カスタムのセパレータを指定することで、最終的なSQLクエリの構造や書式を指定できます。

(略)



### sql.append()

すでにsqlテンプレートを使用してSQLを生成している場合は、append関数を使用して生成されたSQLに新しいチャンクを直接追加することで、fromListと同じ動作を実現できます。

append関数を使うことで、既存のSQL文字列に追加のSQLチャンクを動的に追加し、効果的に連結できます。

これにより、チャンクを最終的なSQLクエリに集約するためのカスタム・ロジックやビジネス・ルールを組み込むことができます。

(略)



### sql.empty()

sql.empty()を使用すると、空のSQLオブジェクトから開始し、必要に応じてSQLチャンクを動的に追加できます。

これにより、SQLクエリを段階的に作成し、カスタム・ロジックや条件を適用して各チャンクの内容を決定できます。

sql.empty()を使用してSQLオブジェクトを初期化した後は、パラメータ化、合成、エスケーピングなど、SQLテンプレートのあらゆる機能を利用できます。

これにより、柔軟かつ制御された方法でSQLクエリを構築し、特定の要件に適合させることができます。

(略)



### Convert sql to string and params

これまでのすべての例では、生成されたSQL出力とともに、TypeScriptでのSQLテンプレート構文の使い方を説明しました。

SQLテンプレートから生成されたクエリ文字列と対応するパラメータを取得する必要がある場合、クエリを生成するデータベースの方言を指定する必要があります。

データベースによってパラメータ化とエスケーピングの構文が異なるため、適切な方言を選択することが重要です。

方言を選択したら、対応する実装の機能を利用してSQLテンプレートを希望のクエリ文字列とパラメータ形式に変換できます。

これにより、使用しているデータベースシステムとの互換性が保証されます。

(略)



### sql select

部分セレクトクエリでもSQLの機能を使うことができます。部分セレクトクエリを使用すると、テーブルから特定のフィールドやカラムを取得できます。

部分 select クエリの詳細については、👇Core API ドキュメント を参照ください。

Drizzle ORM - Select

https://orm.drizzle.team/docs/select#basic-and-partial-select

テーブルから異なるカスタムフィールドを選択する

sql<T>, sql``.mapWith(), sql``.as<T>() の使用例をご覧ください。

(略)



### sql in where

確かに、Drizzleはsqlテンプレート内で使用できる式のセットを提供しています。しかし、データベースは拡張機能や他の手段で提供されるものを含め、より幅広い式を利用できることが多いのも事実です。

柔軟性を確保し、Drizzleがネイティブでサポートしていない式を利用できるようにするため、sql関数を使用してSQLテンプレートを直接書く自由があります。これにより、SQLのパワーをフルに活用し、ターゲットデータベースに固有の式や機能を組み込むことができます。

SQLテンプレートを使用することで、Drizzleの定義済みの式だけに制限されることはありません。代わりに、複雑なクエリを表現したり、基礎となるデータベースシステムが提供するサポートされている式を取り入れることができます。

Filtering by id but with sql
sqlを使用したidによるフィルタリング

(略)

Advanced fulltext search where statement
高度な全文検索 where 文

(略)



### sql in orderBy

SQLテンプレートは、Drizzleでは利用できない特定の注文機能が必要で、生のSQLに頼りたくない場合に、ORDER BY句で使用できます。

(略)

### sql in having and groupBy

SQLテンプレートは、Drizzleでは利用できない特定の注文機能が必要で、生のSQLに頼りたくない場合に、HAVING句とGROUP BY句で使用できます。

(略)



----------------------------------------

# PERFORMANCE

## Queries

* Query performance

Drizzleに関して言えば - 私たちはSQLの上に薄いTypeScriptレイヤーを載せており、オーバーヘッドはほとんどありません。

データベース上でクエリを実行すると、いくつかのことが起こります：

クエリビルダーのすべての設定がSQL文字列に連結される。
その文字列とパラメータがデータベースドライバに送られます。
ドライバがSQLクエリをバイナリSQL実行形式にコンパイルし、データベースに送信する。
プリペアドステートメントを使用すると、Drizzle ORM側でSQLの連結を一度行うだけで、データベースドライバはクエリを常に解析するのではなく、コンパイル済みのバイナリSQLを再利用できます。これは、大きなSQLクエリに対して非常に大きなパフォーマンス上の利点があります。

データベースドライバによってプリペアドステートメントをサポートする方法は異なり、Drizzle ORM の方が better-sqlite3 ドライバよりも高速な場合もあります。



### Prepared statement

(略)

### Placeholder

動的な実行時値を埋め込む必要がある場合はいつでも、sql.placeholder(...) apiを使用できます。

(略)



## Serverless

Drizzle Serverless performance

AWSLambaやVercelServerFunctions（これらはAWSLambaをベースにしている）のようなサーバーレス関数を使えば、最大15分まで生きることができ、データベース接続とプリペアドステートメントの両方を再利用できるため、非常に大きなメリットを得ることができる。

一方、ハンドエッジ関数は起動後すぐにクリーンアップする傾向があるため、パフォーマンス上のメリットはほとんどない。

データベース接続とプリペアド・ステートメントを再利用するには、ハンドラ・スコープの外で宣言する必要があります。

(略)



----------------------------------------

# Advanced

## Set Operations

SQLセット操作は、複数の問い合わせブロックの結果を1つの結果にまとめます。標準SQLでは、以下の3つのセット操作を定義しています： union、intersect、except、union all、intersect all、except allです。

### Union

和集合

2つのクエリ・ブロックのすべての結果を1つの結果に結合し、重複を取り除きます。

customersテーブルとusersテーブルから重複なくすべての名前を取得する。

(略)



### Union All

2つのクエリブロックからのすべての結果を、重複を除いて1つの結果にまとめる。

オンライン販売と店舗販売の2つのテーブルがある場合を考えてみましょう。

この場合、両方のテーブルのデータを1つの結果セットにまとめたいとします。

トランザクションが重複している可能性があるため、すべてのレコードを保持し、重複を排除したいとします。

(略)



### Intersect

2つのクエリ・ブロックの結果に共通する行だけを結合し、重複を除外する。

学生のコース登録情報を格納する2つのテーブルがあるとします。

2つの異なる学部間で共通するコースを見つけたいが、コース名は別々にしたい。

このシナリオでは、2つの学科間で共通するコースを見つけたいが、同じ学科の複数の学生が同じコースを複数回受講していても、同じコースを複数回カウントしたくない。

(略)



### Intersect All

2つのクエリブロックの結果に共通する行だけを、重複を除いて結合する。

顧客の注文に関するデータを含む2つのテーブルがあり、通常の顧客とVIP顧客の両方から注文された商品を識別したい場合を考えてみましょう。

この場合、異なる顧客によって複数回注文されたとしても、各商品の数量を追跡したい。

このシナリオでは、一般顧客とVIP顧客の両方から注文された商品を見つけたいが、同じ商品が異なる顧客から複数回注文された場合でも、数量情報を保持したい。

(略)



### Except

2つのクエリブロックAとBについて、重複を除いて、Bにも存在しないAの結果をすべて返す。

従業員のプロジェクト割り当てに関する情報を格納する2つのテーブルがあるとします。

ある部門に固有で、他の部門と共有されていないプロジェクトを、重複を除いて見つけたいとします。

このシナリオでは、ある部門に固有で、他の部門と共有されていないプロジェクトを特定します。

同じ部署の複数の従業員がそのプロジェクトにアサインされていても、同じプロジェクトを複数回カウントしたくない。

(略)

### Except All

2つのクエリブロック A と B に対して、B にも存在しない A の結果を、重複を含めてすべて返す。

顧客の注文に関するデータを含む2つのテーブルがあり、（VIP顧客を含まない）一般顧客によってのみ注文される商品を特定したいというシナリオを考えてみましょう。この場合、異なる常連客が複数回注文した場合でも、各商品の数量を追跡したい。

このシナリオでは、一般顧客によってのみ注文され、VIP顧客によって注文されない商品を見つけたい。同じ商品が異なる常連客によって複数回注文された場合でも、数量情報を保持したい。

(略)



## Generated Columns

SQLにおける生成列とは、テーブル内に列を作成し、その列の値が同じテーブル内の他の列を含む式に基づいて自動的に計算されるようにする機能です。これにより、データの一貫性を確保し、データベース設計を簡素化し、クエリのパフォーマンスを向上させることができます。

生成される列には2つのタイプがあります：

1. 仮想 (または非永続) 生成列： これらのカラムはクエリが実行されるたびに動的に計算されます。これらのカラムはデータベース内のストレージスペースを占有しません。

2. 保存型（または永続型）生成カラム： これらのカラムは、行の挿入時や更新時に計算され、その値はデータベースに保存されます。これによりインデックスが作成され、クエリのたびに値を再計算する必要がなくなるため、クエリのパフォーマンスが向上します。



生成されたカラムはとくに以下のような場合に役立ちます。

* 既存の列からの新しいデータの導出

* 手動更新を避けるための計算の自動化

* データの整合性と一貫性の確保

* 複雑な計算をデータベーススキーマ内に保持することによるアプリケーションロジックの簡素化



生成カラムの実装と使いかたはSQLデータベースによって大きく異なります。

PostgreSQL、MySQL、SQLiteは生成カラムに関してそれぞれ独自の機能、性能、制限を持っています。

この節では、それぞれのデータベースシステムで生成カラムを最適に利用する方法を理解するために、これらの違いを詳しく調べます。

### Database side

種類 保管のみ

#### 仕組み

* 挿入時や更新時に、他のカラムに基づいて自動的に値を計算します。

#### 機能

* 複雑な式を事前に計算することで、データアクセスを簡素化します。
* 生成された列のインデックス・サポートによるクエリ・パフォーマンスの向上。

#### 制限事項

* デフォルト値を指定することはできません。
* 式は他の生成された列を参照したり、サブクエリを含むことはできません。
* 生成された列式を変更するにはスキーマの変更が必要です。
* 主キー、外部キー、一意制約で直接使用することはできません。

詳細はPostgreSQLのドキュメントを参照してください。


### Drizzle side

Drizzleでは、任意のカラムタイプに.generatedAlwaysAs()関数を指定し、サポートされているSQLクエリを追加できます。

### Features

この関数は、生成された式を3つの方法で受け取ることができます。

(略)

コールバック - テーブルからカラムを参照する必要がある場合。

(略)

Example generated columns with full-text search

(略)



## Transactions

SQLトランザクションは、データベースとやり取りする1つ以上のSQL文のグループです。

トランザクション全体は、1つの論理単位としてデータベースにコミットしたり、1つの論理単位としてロールバック（元に戻す）できます。

DrizzleORMはトランザクション内でSQL文を実行するためのAPIを提供します。

(略)

Drizzle ORMはネストされたトランザクションAPIでセーブポイントをサポートします：

トランザクションにビジネスロジックを組み込み、必要なときにロールバックできます。

トランザクションから値を返すことができます。

トランザクションはリレーショナルクエリで使用できます。

方言固有のトランザクション設定APIを提供します。



## Batch

Batch API

### LibSQL バッチ API の説明: ソース

libSQLクライアントライブラリでは、バッチは暗黙のトランザクションで順番に実行される1つ以上のSQL文です。

トランザクションはlibSQLバックエンドによって制御されます。

すべての文が成功した場合、トランザクションはコミットされます。

ステートメントのいずれかが失敗すると、トランザクション全体がロールバックされ、変更は行われません。



### D1 バッチ API の説明: ソース

バッチ処理は、データベースへの1回の呼び出しで複数のSQL文を送信します。

これは、D1へのネットワーク往復による待ち時間を短縮するため、パフォーマンスに大きな影響を与える可能性があります。

D1は自動コミットで動作する。

我々の実装は、リスト内の各ステートメントが順次、非同期に実行されコミットされることを保証されます。

バッチされたステートメントはSQLトランザクションです。

シーケンス内のステートメントが失敗した場合、その特定のステートメントに対してエラーが返され、シーケンス全体を中断またはロールバックします。



### Drizzle ORMは、LibSQL、Neon、D1用のSQL文をバッチで実行するAPIを提供しています：

(略)



## Dynamic query building

デフォルトでは、DrizzleのすべてのクエリビルダはできるだけSQLに準拠しようとするため、ほとんどのメソッドは一度しか呼び出すことができません。たとえば、SELECT文にはWHERE句が1つしかないので、.where()は一度しか呼び出すことができません。

(略)

このような制限が実装されていなかった以前のORMバージョンでは、とくにこの例は多くのユーザーを混乱させる原因となっていました。

彼らはクエリビルダが複数の.where()呼び出しを単一の条件に「マージ」することを期待していたからです。



この動作は従来のクエリ作成、つまりクエリ全体を一度に作成する場合には便利です。

しかし、クエリを動的に作成したい場合、つまりクエリビルダを受け取りそれを拡張する共有関数がある場合には問題になります。

この問題を解決するために、Drizzleはクエリビルダーのための特別な'dynamic'モードを提供します。

これを有効にするには、クエリビルダで.$dynamic()を呼び出す必要があります。



指定されたページ番号とオプションのページサイズに基づいてクエリにLIMIT句とOFFSET句を追加する簡単なwithPagination関数を実装して、どのように動作するかを見てみましょう。

(略)

withPagination関数は汎用的であるため、たとえば結合を追加するなど、その中のクエリビルダーの結果型を変更できることに注意してください。

(略)

これは、PgSelectや他の同様の型が動的なクエリ構築で使用されるように特別に設計されているためです。

これらは動的モードでのみ使用できます。

以下は、動的クエリ構築で汎用パラメータとして使用できるすべての型のリストです。

| Dialect | Type |

| Query | Select | Insert | Update | Delete |
|------|-------|------|-------|-------|
| Postgres | PgSelect | PgInsert | PgUpdate | PgDelete |
| | PgSelectQueryBuilder | | | |
| MySQL | MySqlSelect | MySqlInsert | MySqlUpdate | MySqlDelete |
| | MySqlSelectQueryBuilder | | | |
| SQLite | SQLiteSelect | SQLiteInsert | SQLiteUpdate | SQLiteDelete |

(略)



## Read Replicas

プロジェクトにリードレプリカインスタンスのセットが含まれ、リードレプリカからの SELECT クエリを管理し、プライマリインスタンスに対して作成、削除、更新操作を実行する便利な方法が必要な場合、Drizzle の withReplicas() 関数を活用できます。

(略)

これで、以前と同じようにdbインスタンスを使用できます。

Drizzleはリードレプリカとプライマリインスタンスの選択を自動的に処理します。

(略)

プライマリ・キーを使用すると、読み取り操作でもプライマリ・インスタンスを強制的に使用できます。

(略)

Drizzleでは、リードレプリカを選択するカスタムロジックを指定することもできます。

ランダムにリードレプリカを選択するために、重み付け決定やその他のカスタム選択方法を行うことができます。

以下はリードレプリカを選択するカスタムロジックの実装例で、最初のレプリカが70%の確率で選択され、2番目のレプリカが30%の確率で選択されます。



どのようなタイプのランダムなリードレプリカ選択メソッドでも実装できることを覚えておいてください。

(略)



## Custom types

Common way of defining custom types

### Examples

customType定義がどのように機能するかを確認する最善の方法は、Drizzle ORMのcustomType関数を使って、postgresやmysqlの既存のデータ型をどのように定義できるかを確認することです。

Postgres Data Types

#### Serial

(略)

#### Text

(略)

#### Boolean

(略)

#### Jsonb

(略)

#### Timestamp

(略)

すべての型の使用方法は、Drizzle ORM で定義されている関数と同じです。たとえば

(略)



### TS-doc for type definitions

型やパラメーターの定義についてはts-docを参照してください。

(略)



## Goodies

### Type API

selectやinsertクエリでテーブルスキーマから型を取得するには、型ヘルパーを使用します。

(略)



### Logging

デフォルトのクエリロギングを有効にするには、drizzleの初期化関数に { logger: true } を渡します。

(略)

DefaultLoggerインスタンスを作成し、カスタムライターを指定することで、ログの送信先を変更できます。

(略)

カスタムロガーを作成することもできます。

(略)



### Multi-project schema

テーブル作成APIを使用すると、カスタマイズしたテーブル名を定義できます。
異なるプロジェクトのスキーマを1つのデータベースに保持する必要がある場合に非常に便利です。

(略)

### Printing SQL query

SQLクエリは、dbインスタンスまたはスタンドアロンのクエリビルダを使用して印刷できます。

(略)



### Raw SQL queries execution

もし複雑なクエリを実行する必要があり、drizzle-ormがそれをまだ扱えない場合は、db.executeメソッドを使って生のパラメトリッククエリを実行できます。

(略)



### Standalone query builder

Drizzle ORMは、データベースインスタンスを作成することなくクエリを作成し、生成されたSQLを取得できるスタンドアロンのクエリビルダを提供します。

(略)



### Get typed table columns

選択時に特定の列を省略する必要がある場合に非常に便利です。

(略)



### Get table information

(略)



### Compare objects types (instanceof alternative)

is()関数を使用して、オブジェクトが特定のDrizzle型であるかどうかをチェックできます。この関数はDrizzleのどの型でも使用できます。

(略)



### Mock Driver

このAPIは未定義のdrizzle({} as any)APIの後継で、Drizzleのテストでは内部的に使用していましたが、外部の開発者にはほとんど推奨していませんでした。

私たちは適切なAPIを構築し公開することを決定し、すべてのdrizzleドライバはdrizzle.mock()を持つようになりました。

(略)



----------------------------------------

# EXTENSIONS

## Prisma

Prismaを使用した既存のプロジェクトでDrizzleを試してみたい、または徐々に導入したいという方は、

PrismaクライアントにDrizzleAPIを追加する弊社のファーストクラス拡張機能をご利用ください。

これにより、既存のDB接続を使用し、Prismaクエリと共にDrizzleを使用できます。

(略)



## ESLint Plugin

特定のシナリオに対して型チェックを行うことが不可能な場合、あるいは可能であるがエラーメッセージが理解しにくい場合、推奨ルールを含むESLintパッケージを作成することにしました。

このパッケージは、開発者が開発中に重要なシナリオに対処できるように支援することを目的としています。

(略)



## drizzle-zod

drizzle-zod は Drizzle ORM 用のプラグインで、Drizzle ORM のスキーマから Zod スキーマを生成できます。

(略)

## drizzle-typebox

(略)

## drizzle-valibot

(略)

## drizzle-graphql

(略)



----------------------------------------
----------------------------------------

# Release 0.36.0 主な新機能

RLSを有効化
ポリシーの作成
ロールの定義・管理
を可能



##
pgPolicy関数によるポリシー定義
pgRole関数によるロール定義



##

RLSの有効化: .enableRLS() を使用して、ポリシーを追加せずにテーブルのRLSを有効化できるようになりました。 ポリシーがテーブルに追加されると、RLSは自動的に有効になります。

ロールの定義
pgRole を使用して、ロールを定義できるようになりました。 データベースにすでにロールが存在する場合、existing() を使用して、drizzle-kitがそのロールを「認識」したり、マイグレーションに含めたりしないようにできます。

ポリシーの定義
pgTable パラメータとして pgPolicy を使用して、ポリシーを定義できるようになりました。 permissive または restrictive、適用先のロール、適用されるコマンド (all、select、insert、update、delete)、USING 部分に適用されるSQLステートメント、WITH CHECK 部分に適用されるSQLステートメントなど、さまざまなオプションを指定できます。

既存のテーブルへのポリシーのリンク
.link() APIを使用して、既存のテーブルにポリシーをリンクできるようになりました。
これは、NeonやSupabaseなどのデータベースプロバイダーの既存のテーブルにポリシーを追加する場合に便利です。

マイグレーション
drizzle-kitでスキーマとロールを管理している場合
drizzle.config.ts で entities.roles を使用して、Drizzleスキーマで定義されていないロールを参照できます。
これにより、drizzle-kitがこれらのロールの管理をスキップできます。

ビューでのRLS
ビューでRLSポリシーを指定することもできます。 これには、ビューのWITHオプションで security_invoker を使用する必要があります。

Supabaseでの使用: drizzle-orm/supabase から、スキーマで使用できる事前定義されたロールのセットが提供されています。 これらのロールは既存としてマークされています。
また、アプリケーションで使用できる事前定義されたテーブルと関数が含まれています。



----------------------------------------

# ポリシーを追加せずにRLSを有効化する場合:
## .enableRLS() を使用します。
## この方法でRLSを有効化すると、テーブルにポリシーが存在しない場合、デフォルト拒否ポリシーが適用されます。
## つまり、行の参照や変更はできなくなります。

TRUNCATE や REFERENCES など、テーブル全体に適用される操作



# ポリシーを追加してRLSを有効化する場合:
## pgTable のパラメータとして pgPolicy を使用してポリシーを定義します。
## ポリシーを追加すると、RLSは自動的に有効になります。
## pgPolicy には、以下のようなオプションを指定できます。
	as: ポリシーの種類 (permissive または restrictive)
	to: ポリシーを適用するロール
	for: ポリシーを適用するコマンド (all, select, insert, update, delete)
	using: ポリシーの USING 部分に適用されるSQLステートメント
	withCheck: ポリシーの WITH CHECK 部分に適用されるSQLステートメント



# Neon や Supabase など、既存のテーブルにポリシーを追加する場合:
## .link() API を使用します。
## realtimeMessages は、Supabaseの既存のテーブルです。
## authenticatedRole は、Supabaseの事前定義されたロールです。








----------------------------------------

# 参考

## RLS に関して

RLS(Row Level Security)入門ガイド Supabase(Postgres)データセキュリティの基礎 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/011c9ee596f6e4bcc78a

----------------------------------------

seedデータ
開発中とのこと

SupabaseにはSeedファイルがあるので代用できる。

評判がいい、相性がいいライブラリ
drizzle-zod


