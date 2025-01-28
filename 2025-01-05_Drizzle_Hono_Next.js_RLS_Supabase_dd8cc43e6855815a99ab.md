<!--
title:   Drizzle RLS Supabase Next.js Hono 最小限の開発
tags:    Drizzle,Hono,Next.js,RLS,Supabase
id:      dd8cc43e6855815a99ab
private: true
-->
----------------------------------------
----------------------------------------

Drizzle ORM - PostgreSQL
https://orm.drizzle.team/docs/get-started/supabase-existing
既存のプロジェクトでDrizzleとSupabaseを使い始める
Get Started with Drizzle and Supabase in existing project


2025年1月26日
現在: 限定記事

タイトル

Next.js、Supabase、Drizzle(メイン)で認証とRLSの基礎的なWebアプリ ( App router、Serve Actions、コロケーション、テスト)

目的
Drizzleを中心にBlog記事を書いています。

Next.jsとSupabaseの基本認証して、Drizzleを使ってテーブルを作り、RLSを有効化して、RLSのpolicyを設定、アクセスの確認、DBに入力したデータの確認、投稿の保存の確認、Next.jsのアーキテクチャ コロケーション そしてテストのそれぞれの動作とつながりの確認。
GraphQLでのアクセス。

Honoに拘る理由はRPCによるエディターの補完機能と
AIによる推論しやすくなるよう情報量を増やすことにある。
Next.jsのバックエンドが弱いからではない。
小さなアプリの場合は十分に役に立つ。



----------------------------------------

# todo すること

Next.js
Hono
Supabase
Drizzle
GraphQL
Zod

基礎的な認証 ソーシャルログイン (GitHub)
Drizzleのテーブル設計
DrizzleのRLS
DrizzleのPolicy
Hono REST API
Supabase
GraphQL
App router
Serve Actions
DBのCRUD
バリデーション
コロケーション
テスト


----------------------------------------

# 用語

* スキーマ

Supabaseにおけるスキーマは、データベースの構造（テーブル、ビュー、関数など）を定義する名前空間です。
デフォルトではpublicスキーマが使用され、テーブルなどが作成されます。
SupabaseのダッシュボードやSQLエディタでスキーマを操作できます。

Drizzleにおけるスキーマは、TypeScriptで記述されたデータベースの構造定義です。
テーブルの定義、データ型、リレーションなどをコードで表現します。
この定義に基づいて、DrizzleはSQLクエリの生成やマイグレーションの実行を行います。

※文脈によってスキーマの意味が微妙に異なります。データベース全体の大枠の構造を指す場合もあれば、特定のテーブルの構造を指す場合もあります。



* コロケーション

関連するコード（コンポーネント、スタイル、テストなど）を近くに配置することで、開発効率と保守性を向上させる設計パターンです。
例えば、Reactのコンポーネントとそのスタイル、テストコードを同じディレクトリに配置することで、変更や修正が容易になります。



* zod

TypeScript でスキーマ宣言とバリデーションを行うための汎用的なライブラリです。



* zod-validator

zod-validator は、Hono フレームワークで使用するための Zod のバリデーションライブラリです。



* drizzle-zod

Drizzle ORM のプラグインで、Drizzle ORM のスキーマから Zod スキーマを生成することができます。
これにより、データベースのスキーマとアプリケーションのバリデーションスキーマの変更に追従して同期させることができ、手動で変更する手間が省けます。

* GraphQL





----------------------------------------

# 前提

この記事では、Drizzle ORMのRLS（Row Level Security）を中心に、基礎的なWebアプリケーションをつくります。

いちから一通り動くところまで作ります。
(以前書いた記事を再利用していてリンクを貼ってあります。)

Drizzle以外の👇️基本的な事を理解している。
Next.js
Supabase (ローカル環境)
node
TypeScript
VSCode
Vercel



# 環境

Next.js 15
Supabase ローカル環境
Supabase CLI
Drizzle 0.38
(DrizzleはRLSをサポートしています。)



# Drizzle ORM

Drizzle ORM - next gen TypeScript ORM.

https://orm.drizzle.team/



# 重要コマンド

## 主要コマンド＆操作一覧

```terminal
# Drizzleの操作

npm run db:generate
npm run db:migrate
npm run db:push
npm run db:pull
npm run db:seeds
npm run db:reset

```



```sql
-- テーブル内のデータを取得
SELECT * FROM users;
SELECT * FROM auth.users;

-- テーブル内のデータを削除 users
DELETE FROM users; -- 特定の条件で削除する場合
TRUNCATE TABLE users; -- テーブルのデータをすべて削除（高速）

-- auth.usersに関連するデータの削除
TRUNCATE TABLE auth.users, roots, user_profiles CASCADE;


-- テーブルを削除
DROP TABLE users;

```

※SupabaseのダッシュボードのSQL EditorからSQL文を直接実行します。



@@ その他コマンド

```
npx drizzle-kit check
npx drizzle-kit up
npx drizzle-kit studio

```



----------------------------------------

# 開発環境構築: Next.js ローカルSupabase Drizzle 環境のセットアップ
 (内容: Next.js ローカル環境でのSupabase Drizzle、必要なツールのインストールなどを解説)

@@ Next.js インストール

アプリ名: drizzle_rls_supabase

```terminal
npx create-next-app@latest --typescript --tailwind --eslint

[app name] #drizzle_rls_supabase
√ Would you like your code inside a `src/` directory? ... No / [Yes]
√ Would you like to use App Router? (recommended) ... No / [Yes]
√ Would you like to use Turbopack for `next dev`? ... No / [Yes]
√ Would you like to customize the import alias (`@/*` by default)? ... No / [Yes]
√ What import alias would you like configured? ... @/*


```



package.jsonにscriptsを登録しておきます。

```package.json
...
  "scripts": {
    ...
    "db:generate": "npx drizzle-kit generate",
    "db:migrate": "npx drizzle-kit migrate",
    "db:push": "npx drizzle-kit push",
    "db:pull": "npx drizzle-kit pull",
    "db:seeds": "npx tsx src/db/seeds.ts",
    "db:reset": "npx tsx src/db/reset.ts"
  },

```

※ `db:seeds` コマンドはすでにテーブル内にデータが入っているとエラーになります。

※👇これらのファイルは後で用意します。

```
src/db/seeds.ts
src/db/reset.ts

```



@@ ローカルのSupabase インストール

```terminal
# 必要ライブラリ
npm install @supabase/supabase-js react-icons @supabase/auth-helpers-nextjs

# supabase cliのupdate
scoop update supabase

# supabaseのコマンド
supabase init
supabase start
supabase status

```

```terminal
         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: ey*****
service_role key: ey*****
   S3 Access Key: 62*****
   S3 Secret Key: 85*****
       S3 Region: local

```



@@ Drizzle インストール

```terminal
npm install drizzle-orm pg dotenv
npm install -D drizzle-kit tsx

```

dotenvライブラリ はseedsスクリプトファイル等を動かすのに
環境変数が必要で、その時に読み込むために必要です。



はじめる Drizzle (Next.js 15 と Supabase 最小限の開発環境構築 Drizzleは0.36からRLSに対応しました。) #Next.js15 - Qiita

https://qiita.com/masakinihirota/items/57cff03009f407ec0946

@@ 環境変数

環境変数のファイルは `.env` というファイル名にします。

<details><summary>Next.jsの環境変数設定に関するトラブルシューティング(Windows10環境)</summary>
`.env.local` ファイルでは環境変数を読み込んでくれませんでした。
`.env.local` の設定は正しいと信じ込み、他の場所で色々触ってみましたが undefinedとなり 読み込んでくれませんでした。
以前あったトラブルを思い出し `.env`とファイル名を変えたら読み込んでくれました。

</details>



@@ Next.js、Supabase、GITHUBの環境変数

```terminal
touch .env

```

```.env
# 環境変数
# Next.js 15
# GITHUBの環境変数
GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"
GITHUB_CLIENT_ID="Ox*****"
GITHUB_SECRET="e3*****"

# ローカルのSupabase環境変数
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ey*****"

# Drizzleの環境変数
# ローカルのSupabaseへの接続用
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# サーバーのSupabaseへの接続用
# DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE].supabase.co:5432/postgres

```



@@ Drizzleの環境変数

環境設定ファイルの作成

```terminal
touch drizzle.config.ts

```

1つのスキーマファイルでテーブルを設計するか、スキーマフォルダを作ってそこに複数のスキーマファイルをいれるか選んでください。


@@@ Drizzleの設定: 1つのスキーマファイルを使う場合の設定

```drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  // スキーマファイル schema.ts を読み込む
  schema: "./src/db/schema.ts",
  // Supabase へのマイグレーションファイルを出力するディレクトリ
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```

※👆schema.tsファイルにスキーマを書きます。

```
src
├── app
│   ├── layout.tsx
│   └── page.tsx    # ページコンポーネント
└── db
    └── schema.ts   # Drizzleのスキーマファイル

```



@@@ Drizzleの設定: 複数のスキーマファイルを使う場合の設定

```drizzle.config.ts
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

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

※👆schemaフォルダの下に複数のスキーマファイルを置けます。

例

```
src
├── app
└── db
    └── schema
        ├── products.ts
        └── users.ts

```

※ products.ts users.ts はDrizzle用のスキーマファイルです。
テーブル毎など自由に作れます。大量にDBテーブルの設定が必要な場合などに便利です。



----------------------------------------

# 認証機能の実装: Supabase Authを用いたユーザー認証

認証に関しては👇️下記の記事を参照してください。

GitHub認証 ソーシャルログイン (Next.js Supabase ローカル開発環境用) #GitHub - Qiita

https://qiita.com/masakinihirota/items/fd20283abc1ba51e5fee

Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub) #OAuth - Qiita

https://qiita.com/masakinihirota/items/706326a64dab3ffbf55b

GitHub認証 ローカルで動かす OAuth-practice #localhost - Qiita

https://qiita.com/masakinihirota/items/f9b99ca444ddeda1f4ef



### SupabaseでのGitHub認証の有効化

Supabaseの設定ファイルに追記します。

```config.toml
...
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

```



# Supabaseがエラーで起動しない場合

supabase_vector_[アプリ名] container is not ready: unhealthy エラー対処方法 Supabaseローカル開発環境 #Supabase - Qiita

https://qiita.com/masakinihirota/items/5578a6cf89780de120a3

```config.toml
...
[analytics]
enabled = false
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

```

👆設定ファイルの一部 [analytics] を無効化します。



# Next.js での GitHub認証コードの実装

## src\app\layout.tsx

```src\app\layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```



## src\app\page.tsx

```src\app\page.tsx
import { SocialLoginButtons } from '@/components/auth/social-login-buttons';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <h1 className="text-2xl font-bold text-center text-foreground">
        ソーシャルログイン
      </h1>
      <SocialLoginButtons />
    </div>
  );
}

```



## src\components\auth\social-login-buttons.tsx

```src\components\auth\social-login-buttons.tsx
'use client';

import { supabase } from '@/lib/supabase';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export function SocialLoginButtons() {
  // 確認
  console.log('SocialLoginButtons');
  const handleGithubLogin = async () => {
    // 確認
    console.log('handleGithubLogin');
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // サーバー側でのリダイレクトURLを指定
        // redirectTo: `${window.location.origin}/auth/callback`,
        // ローカル環境でのリダイレクトURLを指定
        redirectTo: 'http://192.168.1.2:3000/auth/callback',
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <button
        onClick={handleGithubLogin}
      >
        <FaGithub className="w-5 h-5" />
        GitHubでログイン
      </button>
    </div>
  );
}

```



## src\lib\supabase.ts

```src\lib\supabase.ts
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

```

## src\app\auth\callback\route.ts

```src\app\auth\callback\route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}

```


認証部分のコードはこれで全てです。

GitHubの認証が成功するか確認してください。

確認方法は
Next.jsを立ち上げ、
Supabaseを立ち上げ
ログインボタンを押せば、Supabaseのauth.usersテーブルにユーザーが登録されています。



## Supabaseに登録したユーザーを見る方法

Table Editorから schema authを選択
usersテーブルを選択

SQL Editorから
SQL文を入力

ダッシュボードから Authentication
から見ることが出来ます。


## Supabaseから認証済みユーザーデータの削除

これはシステムに登録されているので、削除手段が少ないです。

Supabaseダッシュボードの Authentication から削除できます。

### 削除方法

Supabaseのダッシュボードを開き、左サイドメニューのAuthenticationでUsersテーブルの情報が見れます。

そして削除したいユーザーを選択すると、詳細な情報のウィンドウが開かれます。
そのウィンドウの下に削除ボタンがあるので削除します。

※auth.usersテーブルからユーザーを削除しても、ユーザーは自動的にサインアウトされません。気をつけてください。



----------------------------------------

# ソーシャルログインの確認まで終了



----------------------------------------
----------------------------------------
----------------------------------------

# Supabase データベース設計：テーブル定義とデータ構造

この章では
SupabaseのGitHub認証で認証されたユーザーを、トリガーを利用してデータの同期をしてNext.jsアプリ側でも使えるようにします。

Drizzleによるデータベースの作成、RLS、ポリシーの作成等を行います。



## Supabase データベースの設計: テーブル定義とデータ構造

User Management | Supabase Docs

https://supabase.com/docs/guides/auth/managing-user-data

Supabase を利用する場合、デフォルトで `auth.users` テーブルが提供されます。
これは認証システムによって管理され、GitHub認証などの際にユーザー情報が保存されます。

セキュリティ上の理由でSupabaseのauthスキーマにはAPIでアクセスできません、
なのでpublicスキーマにユーザーテーブル(roots)を作って、トリガー関数を利用しデータをコピーします。

今回はDrizzle ORMを利用してテーブル定義、RLSの設定、push、マイグレーションファイルの作成を行います。



## 想定しているフォルダ構造

```
src
├── app
│   ├── auth
│   │   └── callback
│   │       └── route.ts
│   ├── login
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── auth
│       └── social-login-buttons.tsx
├── db								<< Drizzle関連フォルダ
│   ├── schema
│   │   ├── roots.ts
│   │   └── user_profiles.ts
│   └── add_root.sql
└── lib
    └── supabase.ts

```



## DBスキーマ名のルール

DBのテーブルのスキーマ名は

* Drizzle キャメルケースを使用して書きます。

* Supabase スネークケースを使用して設定します。

Drizzleはこの違いを吸収する仕組みがあります。

例えば、Drizzleで`fullName`、Supabaseで`full_name`としたい場合は、👇次のように記述します。

```typescript
fullName: text('full_name'),

```

👆 Drizzleは この行で Supabaseに渡すカラム名を `full_name` になるように設定しています。



## postgresでの名前のルール (Supabaseも)

* 文字種: 英字(a-z)、数字(0-9)、アンダースコア(\_)を使用します。
* 開始文字: 英字またはアンダースコアで開始します、数字ではじめられません。
* 長さ: 最大63文字です。
* 予約語: SQLの予約語(SELECT, FROM, WHEREなど)はそのまま使用できません。使用する場合はダブルクォーテーションで囲みます。(例: "SELECT")
* 大文字小文字の扱い: デフォルトでは区別しませんが内部的にはすべて小文字をしようします。

※大文字やキャメルケースを使うとエラーになりましたが、
小文字やスネークケースに直すとエラーが解消されました。



### 行レベルセキュリティ(RLS)の実装

テーブルはそのままだと誰でも見れるようになっています。

RLSを有効化することで、デフォルトでテーブルへのアクセスが制限されます。
ポリシーを設定することで、アクセス制御を定義できます。

DrizzleのRLSを有効化する方法は簡単で、テーブルのコードの末尾に

```
.enableRLS();

```

を追加するだけで、そのテーブルでRLSが有効化されます。




Supabaseでは、Policiesを使用してアクセス制御を定義します。

```sql
CREATE POLICY name ON table_name
AS PERMISSIVE -- PERMISSIVE | RESTRICTIVE
FOR ALL -- ALL | SELECT | INSERT | UPDATE | DELETE
TO role_name -- Default: PUBLIC
USING ( using_expression )
WITH CHECK ( check_expression );

```

name はこのPolicyの名前です。

複数の操作を指定する場合は、パイプ記号（|）で区切ります。
たとえば、FOR SELECT | UPDATE は、ポリシーが SELECT と UPDATE の両方の操作に適用されることを意味します。

TO role_name | PUBLIC
ポリシーが適用されるロールを指定します。
PUBLICは全ユーザーに適用されます。

role_name
指定されたデータベースロールにのみポリシーが適用されます。
PUBLIC: 明示的にロールが付与されていないユーザーを含む、すべてのユーザーにポリシーが適用されます。TO句が省略された場合はこれがデフォルトになります。

USING (using_expression)
この式はSELECT操作で使用されます。
using_expressionは、どの行が指定されたロールに表示されるかを決定するSQL式です。
この式は真偽値（trueまたはfalse）を返す必要があります。
式が特定の行に対してtrueと評価された場合、その行は表示されます。
そうでない場合は非表示になります。

WITH CHECK (check_expression)
この句はINSERTおよびUPDATE操作で使用されます。
check_expressionは、新しい行または変更された行を挿入または更新できるかどうかを決定するSQL式です。
式がtrueと評価された場合、操作は許可されます。
そうでない場合は拒否されます。
これにより、ユーザーはUSING句に従って表示できないデータを挿入または更新することを防ぎます。
データの一貫性を保つためには、USINGとWITH CHECKの式を一致させることが重要です。



例：usersテーブルにRLSを設定する場合

SQL文でpolicyを設定する場合

```sql
create policy "table_name" on public.users
for select
using ( (select auth.uid()) = user_id );

```

この例では、USING 式で user_id = auth.uid() という条件を指定しています。
現在のユーザーIDと`user_id`が一致する行のみ表示します。

auth.uid() は Supabase が提供するヘルパー関数で、現在の認証ユーザーの ID を返します。



SQL文でRLSを有効化する場合は以下のSQLを実行します。

```sql
alter table "table_name" enable row level security;

```

Supabaseのダッシュボード上からもボタンをクリックすることでRLSを有効化出来ます。


### SupabaseでのRLSの場所

Supabase ダッシュボードでのRLS関連情報を見れる場所

* テーブル users は
左メニューの Table Editor を開くと
個別のテーブルとその中のデータが見れます。

左メニューの Databaseを開くと
Schema Visualizer でVisual Schema Designer が見れます。

Visual Schema Designer | Supabase Features
https://supabase.com/features/visual-schema-designer

左メニューの Databaseを開き
Tablesを選ぶと
全テーブルの情報が見れます。

* ロール Roles は
左メニューの Databaseから
ACCESS CONTROLの Roles を選択します。
現在設定されている全Rolesが見れます。

* ポリシー policies は
左メニューの Databaseから
ACCESS CONTROLの Policies を選択します。



----------------------------------------

# Drizzleでのテーブル作成、RLSの設定

今回、Next.jsで使うユーザー管理テーブルを roots テーブルとします。
ユーザーの情報を保存するテーブルを user_profilesテーブルとします。

Supabaseではデフォルトで`auth.users`テーブルが提供されますが、セキュリティと柔軟性の観点から、`public`スキーマに`roots`テーブルを作成し、必要なユーザー情報をコピーします。

認証情報とアプリデータを分離することで、セキュリティリスクの軽減、Supabase以外のサービスへの移行の容易化、そしてpublic.roots以下に必要情報をまとめることでデータ管理をしやすくします。



## publicスキーマにNext.jsユーザー用のテーブルを作成

`auth.users`テーブルの情報から必要なデータをコピーするための`roots`テーブルをDrizzleで定義します。

### rootsテーブルの作成

src\db\schema\roots.ts

```roots.ts
import { pgTable, text, uuid, foreignKey } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const roots = pgTable(
  "roots",
  {
    id: uuid('id').primaryKey().notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [authUsers.id],
    }).onDelete("cascade"),
  ]
);

```



### user_profilesテーブルの作成

`roots`テーブルに属する`user_profiles`テーブルを定義します。

src\db\schema\user_profiles.ts

```user_profiles.ts
import { pgTable, text, uuid, foreignKey } from "drizzle-orm/pg-core";
import { roots } from "./roots";

export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid('id').primaryKey().notNull(),
    rootId: uuid('root_id').notNull(),
    profileData: text('profile_data'),
  },
  (table) => [
    foreignKey({
      columns: [table.rootId],
      foreignColumns: [roots.id],
    }).onDelete("cascade"),
  ]
);

```

`onDelete("cascade")`により、`auth.users`の行が削除された場合、対応する`roots`の行も自動的に削除されます。



## トリガーによるユーザー情報の同期

`auth.users`への`INSERT`時に`public.roots`にユーザー情報を同期させるトリガーと関数をSQLで定義します。

Drizzle ORM はトリガーを直接管理する機能を提供していません 。
そのため、トリガー関数はSupabaseで直接 SQL 文を実行します。



src\db\add_root.sql

```add_root.sql
-- public.rootsに行を挿入する関数
create or replace function public.add_root()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.roots (id, first_name, last_name)
    values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
    return new;
end;
$$;

-- ユーザー作成時に関数を起動するトリガー
create trigger add_root
    after insert on auth.users
    for each row execute procedure public.add_root();

```

※テーブル名は複数形で、トリガー名、関数名には単数形にしています。



テーブルの準備はこれで整いました。

次はSupabaseにテーブルを作り、Seedingそしてデータの確認の後、
その後でテーブルにRLSを設定します。



----------------------------------------

# Drizzleで作ったテーブルのコードをSupabaseに反映させる。

## migrationとpushコマンド

どちらかのコマンドでSupabaseにテーブルを作ります。

* migration: マイグレーションファイルを作成してテーブルを作成します。

```
npx drizzle-kit generate
npm run db:generate

```

※👆どちらでもいい

* push: マイグレーションファイルを作成せずに直接DBを変更します。

```
npx drizzle-kit push
npm run db:push

```

※👆どちらでもいい

※開発中は何度もDBのテーブルを追加削除、設計変更を加えると思うので
Supabaseのサーバー(実運用環境)に反映させるまでは(＝ほぼ完成ぐらいまで)
pushですませて、それまではマイグレーションファイルを作りません。

Supabaseに反映後
GitHubの認証を設定済みなので
Next.jsアプリを起動後ログインボタンを押します。

Supabaseのダッシュボードで確認すると、ユーザーが登録されています。



----------------------------------------

# Seeding(テーブルへのデータ投入)

次はDrizzleの機能を用いて初期データを登録します。

rootsテーブルと、user_profilesテーブルにseedデータを登録することを目標とします。

drizzle-seed を利用します。

```terminal
npm i drizzle-seed

```



# 環境変数を読み込んでくれない

ターミナルからスクリプトを実行して👇環境変数をチェックすると読み込んでいませんでした。

```
"db:seeds": "tsx src/db/seeds.ts"

```

.envの環境変数はNext.js用のなのでpackage.jsonに書いた
スクリプトである tsx コマンドからのコードには環境変数を読み込みません。
それらを読み込ませるように dotenvライブラリを使用します。

```terminal
npm install dotenv

```

```seeds.tsx
import dotenv from "dotenv"

// 環境変数を読み込む
dotenv.config()

```

👆️追加します。

console.logを確認すると、.envファイルから環境変数を読んでくれるようになります。



## Seedデータ

### Drizzle公式ドキュメントのサンプル

Drizzle ORM - Overview

https://orm.drizzle.team/docs/seed-overview



Drizzle公式ドキュメントのサンプルをNext.jsとSupabaseでも動くかどうか確認します。
※微妙に修正が必要でした。

👇 スキーマをスキーマフォルダから読み込むように変更し、環境変数をライブラリで読み込ませています。
スキーマの指定はオブジェクトになっています。

src\db\seeds.ts

```seed.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

import dotenv from "dotenv"
import { users } from "@/db/schema/users";

// 環境変数を読み込む
dotenv.config()

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  console.log("Seeding database...");
  console.log("Database URL: ", process.env.DATABASE_URL);
  await seed(db, { users });
}

main();

```



src\db\reset.ts

```reset.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";

import dotenv from "dotenv"
import { users } from "@/db/schema/users";

// 環境変数を読み込む
dotenv.config()

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  console.log("Rest database...");
  console.log("Database URL: ", process.env.DATABASE_URL);
  await reset(db, { users });
}

main();

```

動作確認完了
10件のSeedデータの確認
テーブルデータのリセットの確認

👆公式ドキュメントのSeedindから参考にしたサンプルを動かしました。



### rootsテーブルとuser_profilesテーブル

rootsテーブルはauth.usersテーブルとつながっているため
外部からのアクセスは受け付けてないようです。
スキーマを渡してもseed関数はエラーのままでした。

Supabaseにとってauthは特別なスキーマで、セキュリティが理由で外部からのアクセスを禁止しています。
Drizzle等のツールからのseedデータの挿入でも入力ができないようになっています。

Supabase authスキーマに関わっているテーブルに挿入するデータは、直接実行するSQL文を作り挿入することにします。

👇それぞれ10件づつ seedファイルを作成します。

<details><summary>ダミーデータ用のSQL文</summary>

supabase/seed.sql

```seed.sql
-- usersテーブルにダミーデータを挿入
insert into auth.users(
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token,
  confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change,
  email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin,
  created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token,
  phone_change_sent_at, email_change_token_current, email_change_confirm_status,
  banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous
)
values
  (
    '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'public', 'user', 'john.doe@example.com', 'encrypted_password_1',
    '2023-01-01T00:00:00Z', '2023-01-01T00:00:00Z', 'confirmation_token_1', '2023-01-01T00:00:00Z', 'recovery_token_1', '2023-01-01T00:00:00Z',
    'email_change_token_new_1', 'john.new@example.com', '2023-01-01T00:00:00Z', '2023-01-01T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-01T00:00:00Z', '2023-01-01T00:00:00Z', '1234567890', '2023-01-01T00:00:00Z', '1234567890', 'phone_change_token_1',
    '2023-01-01T00:00:00Z', 'email_change_token_current_1', 1, '2023-01-01T00:00:00Z', 'reauthentication_token_1',
    '2023-01-01T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'public', 'user', 'jane.smith@example.com', 'encrypted_password_2',
    '2023-01-02T00:00:00Z', '2023-01-02T00:00:00Z', 'confirmation_token_2', '2023-01-02T00:00:00Z', 'recovery_token_2', '2023-01-02T00:00:00Z',
    'email_change_token_new_2', 'jane.new@example.com', '2023-01-02T00:00:00Z', '2023-01-02T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-02T00:00:00Z', '2023-01-02T00:00:00Z', '0987654321', '2023-01-02T00:00:00Z', '0987654321', 'phone_change_token_2',
    '2023-01-02T00:00:00Z', 'email_change_token_current_2', 1, '2023-01-02T00:00:00Z', 'reauthentication_token_2',
    '2023-01-02T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'public', 'user', 'alice.johnson@example.com', 'encrypted_password_3',
    '2023-01-03T00:00:00Z', '2023-01-03T00:00:00Z', 'confirmation_token_3', '2023-01-03T00:00:00Z', 'recovery_token_3', '2023-01-03T00:00:00Z',
    'email_change_token_new_3', 'alice.new@example.com', '2023-01-03T00:00:00Z', '2023-01-03T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-03T00:00:00Z', '2023-01-03T00:00:00Z', '1122334455', '2023-01-03T00:00:00Z', '1122334455', 'phone_change_token_3',
    '2023-01-03T00:00:00Z', 'email_change_token_current_3', 1, '2023-01-03T00:00:00Z', 'reauthentication_token_3',
    '2023-01-03T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'public', 'user', 'bob.brown@example.com', 'encrypted_password_4',
    '2023-01-04T00:00:00Z', '2023-01-04T00:00:00Z', 'confirmation_token_4', '2023-01-04T00:00:00Z', 'recovery_token_4', '2023-01-04T00:00:00Z',
    'email_change_token_new_4', 'bob.new@example.com', '2023-01-04T00:00:00Z', '2023-01-04T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-04T00:00:00Z', '2023-01-04T00:00:00Z', '2233445566', '2023-01-04T00:00:00Z', '2233445566', 'phone_change_token_4',
    '2023-01-04T00:00:00Z', 'email_change_token_current_4', 1, '2023-01-04T00:00:00Z', 'reauthentication_token_4',
    '2023-01-04T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'public', 'user', 'charlie.davis@example.com', 'encrypted_password_5',
    '2023-01-05T00:00:00Z', '2023-01-05T00:00:00Z', 'confirmation_token_5', '2023-01-05T00:00:00Z', 'recovery_token_5', '2023-01-05T00:00:00Z',
    'email_change_token_new_5', 'charlie.new@example.com', '2023-01-05T00:00:00Z', '2023-01-05T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-05T00:00:00Z', '2023-01-05T00:00:00Z', '3344556677', '2023-01-05T00:00:00Z', '3344556677', 'phone_change_token_5',
    '2023-01-05T00:00:00Z', 'email_change_token_current_5', 1, '2023-01-05T00:00:00Z', 'reauthentication_token_5',
    '2023-01-05T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'public', 'user', 'david.evans@example.com', 'encrypted_password_6',
    '2023-01-06T00:00:00Z', '2023-01-06T00:00:00Z', 'confirmation_token_6', '2023-01-06T00:00:00Z', 'recovery_token_6', '2023-01-06T00:00:00Z',
    'email_change_token_new_6', 'david.new@example.com', '2023-01-06T00:00:00Z', '2023-01-06T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-06T00:00:00Z', '2023-01-06T00:00:00Z', '4455667788', '2023-01-06T00:00:00Z', '4455667788', 'phone_change_token_6',
    '2023-01-06T00:00:00Z', 'email_change_token_current_6', 1, '2023-01-06T00:00:00Z', 'reauthentication_token_6',
    '2023-01-06T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007', 'public', 'user', 'eve.foster@example.com', 'encrypted_password_7',
    '2023-01-07T00:00:00Z', '2023-01-07T00:00:00Z', 'confirmation_token_7', '2023-01-07T00:00:00Z', 'recovery_token_7', '2023-01-07T00:00:00Z',
    'email_change_token_new_7', 'eve.new@example.com', '2023-01-07T00:00:00Z', '2023-01-07T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-07T00:00:00Z', '2023-01-07T00:00:00Z', '5566778899', '2023-01-07T00:00:00Z', '5566778899', 'phone_change_token_7',
    '2023-01-07T00:00:00Z', 'email_change_token_current_7', 1, '2023-01-07T00:00:00Z', 'reauthentication_token_7',
    '2023-01-07T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008', 'public', 'user', 'frank.green@example.com', 'encrypted_password_8',
    '2023-01-08T00:00:00Z', '2023-01-08T00:00:00Z', 'confirmation_token_8', '2023-01-08T00:00:00Z', 'recovery_token_8', '2023-01-08T00:00:00Z',
    'email_change_token_new_8', 'frank.new@example.com', '2023-01-08T00:00:00Z', '2023-01-08T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-08T00:00:00Z', '2023-01-08T00:00:00Z', '6677889900', '2023-01-08T00:00:00Z', '6677889900', 'phone_change_token_8',
    '2023-01-08T00:00:00Z', 'email_change_token_current_8', 1, '2023-01-08T00:00:00Z', 'reauthentication_token_8',
    '2023-01-08T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000009', 'public', 'user', 'grace.harris@example.com', 'encrypted_password_9',
    '2023-01-09T00:00:00Z', '2023-01-09T00:00:00Z', 'confirmation_token_9', '2023-01-09T00:00:00Z', 'recovery_token_9', '2023-01-09T00:00:00Z',
    'email_change_token_new_9', 'grace.new@example.com', '2023-01-09T00:00:00Z', '2023-01-09T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-09T00:00:00Z', '2023-01-09T00:00:00Z', '7788990011', '2023-01-09T00:00:00Z', '7788990011', 'phone_change_token_9',
    '2023-01-09T00:00:00Z', 'email_change_token_current_9', 1, '2023-01-09T00:00:00Z', 'reauthentication_token_9',
    '2023-01-09T00:00:00Z', false, null, false
  ),
  (
    '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000010', 'public', 'user', 'hank.ivy@example.com', 'encrypted_password_10',
    '2023-01-10T00:00:00Z', '2023-01-10T00:00:00Z', 'confirmation_token_10', '2023-01-10T00:00:00Z', 'recovery_token_10', '2023-01-10T00:00:00Z',
    'email_change_token_new_10', 'hank.new@example.com', '2023-01-10T00:00:00Z', '2023-01-10T00:00:00Z', '{"app_meta": "data"}', '{"user_meta": "data"}',
    false, '2023-01-10T00:00:00Z', '2023-01-10T00:00:00Z', '8899001122', '2023-01-10T00:00:00Z', '8899001122', 'phone_change_token_10',
    '2023-01-10T00:00:00Z', 'email_change_token_current_10', 1, '2023-01-10T00:00:00Z', 'reauthentication_token_10',
    '2023-01-10T00:00:00Z', false, null, false
  );

-- rootsテーブルにダミーデータを挿入
insert into roots(id, first_name, last_name)
values
  ('00000000-0000-0000-0000-000000000001', 'John', 'Doe'),
  ('00000000-0000-0000-0000-000000000002', 'Jane', 'Smith'),
  ('00000000-0000-0000-0000-000000000003', 'Alice', 'Johnson'),
  ('00000000-0000-0000-0000-000000000004', 'Bob', 'Brown'),
  ('00000000-0000-0000-0000-000000000005', 'Charlie', 'Davis'),
  ('00000000-0000-0000-0000-000000000006', 'David', 'Evans'),
  ('00000000-0000-0000-0000-000000000007', 'Eve', 'Foster'),
  ('00000000-0000-0000-0000-000000000008', 'Frank', 'Green'),
  ('00000000-0000-0000-0000-000000000009', 'Grace', 'Harris'),
  ('00000000-0000-0000-0000-000000000010', 'Hank', 'Ivy');

-- user_profilesテーブルにダミーデータを挿入
insert into user_profiles(id, root_id, profile_data)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Profile data for John Doe'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Profile data for Jane Smith'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Profile data for Alice Johnson'),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Profile data for Bob Brown'),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Profile data for Charlie Davis'),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'Profile data for David Evans'),
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007', 'Profile data for Eve Foster'),
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008', 'Profile data for Frank Green'),
  ('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000009', 'Profile data for Grace Harris'),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000010', 'Profile data for Hank Ivy');

```

SupabaseのダッシュボードのSQL Editorに直接貼り付けます。

</details>



### データの削除したい場合

auth.usersに関連するデータの削除、外部キーでつながっているテーブの全データの削除(テーブルは削除しません)を行うSQL文です。

```sql
-- auth.usersに関連するデータの削除
TRUNCATE TABLE auth.users, roots, user_profiles CASCADE;

```

CASCADE機能でつながっている関連データも全て削除します。

### seed.sqlを読み込まないトラブル

※もし起動時にseed.sql文を読み込まず、テーブルにデータが挿入されなかったら、
手動でseed.sql文の中身を SQL Editor で実行します。



### seedファイルを複数用意、まとめて読み込ませる方法

1関連テーブル郡(外部キーでつながっている)、1seedファイルを原則にしています。

config.toml の[db.seed]項目を編集します。

```config.toml
[db.seed]
# If enabled, seeds the database after migrations during a db reset.
enabled = true
# Specifies an ordered list of seed files to load during db reset.
# Supports glob patterns relative to supabase directory: './seeds/*.sql'
sql_paths = ['./seeds/*.sql']

```

これでsupabase/seeds/フォルダ以下の*.sql文をすべて読み込んでくれます。

```seedファイル
auth.users.sql
public.users.sql

```

SQL文を実行することで、
ローカルのSupabaseに設定した全てのテーブルにダミーデータの挿入が確認できたらこの章は完了です。

※テーブルをpush時に、トリガーと関数のSQL文の実行を忘れないでください。
GitHub認証時に認証されたユーザーのデータがpublicスキーマのテーブル側に反映させるために必要です。

※Supabaseのauthスキーマで外部参照がカラムとやはりdrizzle-seedがうまく動きません。推測はあたっているようです。
そのテーブルの値は手動でSQL文を実行してください。

DrizzleのクライアントにRLSの上位roleを割り当てられたら動くかもですが、そのツールはなさそうです。



----------------------------------------

参考 drizzle-seedの使い方

# Seed値のrefine

Seedデータの生成関数です。
通常はランダムに適当な値を生成します。
seed値を与えることで常に同じ値が生成されます。
より洗練されたデータを生成するためにrefine関数を使います。

Drizzleドキュメント Generators

https://qiita.com/masakinihirota/items/993d991df6f8c198a445#generators



## refine関数 (drizzle-seed 提供)

default: 常に同じ値を生成します。
valuesFromArray: 指定された配列から値を生成します。
intPrimaryKey: 1 から始まる連続した整数を生成します。
number: 指定された範囲内の浮動小数点数を生成します。
int: 指定された範囲内の整数を生成します。
datetime: 日時オブジェクトを生成します。
year: YYYY 形式で年を生成します。
interval: 時間間隔を生成します。
string: ランダムな文字列を生成します。
firstName: 人のファーストネームを生成します。
lastName: 人の姓を生成します。
fullName: 人のフルネームを生成します。
email: 固有のメールアドレスを生成します。
phoneNumber: 固有の電話番号を生成します。
country: 国名を生成します。
city: 都市名を生成します。
streetAddress: 住所を生成します。
jobTitle: 役職名を生成します。
postcode: 郵便番号を生成します。
state: 米国の州を生成します。
companyName: ランダムな会社名を生成します。
loremIpsum: lorem ipsum テキスト文を生成します。
point: 2D ポイントを生成します。
line: 2次元直線を生成します。



----------------------------------------

ここまででテーブルを作り、そこにSeedデータを入力して
基本的なDB側の下準備は整ったはずです。

次はDBのデータをブラウザに表示します。

REST API
Graphql
の2種類を試します。


次はNext.jsからREST APIかGraphqlでDBのテーブルにアクセスしてブラウザにDBのデータを表示させます。



----------------------------------------

# DBへのアクセス方法

現在、選択できるDBへのアクセス手段
複数のツールを組み合わせでアクセスします。

* Hono バックエンド
* Drizzle クエリービルダー
* Supabase クライアント
* REST API
* Next.js Server actions
* Next.js route.ts
* GraphQL

例
Supabaseクライアント + Next.js Server Actions
Supabaseクライアント + Next.js Route Handlers (route.ts)
Supabaseクライアント + Graphql APIサーバー(Supabase側で用意されています。)
REST API + Next.js Server Actions / Route Handlers

想定は
Next.js Hono Drizzle GraphQL Supabase
の組み合わせ

Next.js フロントエンド
Hono バックエンド
Drizzle テーブルスキーマ、データ管理
GraphQL フロントエンドやDBへのアクセス
Supabase テーブルデータ



※実際に開発者が使う場合は好みになりますが、型の安全性が高くなったNext.js +Hono +Drizzle +Graphql +Supabase が良さそうです。
この組み合わせだと、型安全による開発体験が良くなり、HonoのRPC機能により 型が異なるとBuildが通らなくなります。
フォーム関連にはServer actionsを使うなど使い分けをします。

### Supabaseを利用する方法

※Next.js Supabase Drizzle Honoの組み合わせを利用した場合です。

1. Drizzleのクエリビルダー 
Drizzle ORMのクエリビルダーを利用してSQLクエリを生成し、Supabaseからデータを取得します。
複雑なクエリを実行したい中規模アプリケーション（テーブル数10～99個）に適しています。

2. Honoを使用 
Honoという軽量WebフレームワークでAPIエンドポイントを作成し、Supabaseにアクセスします。
パフォーマンス重視の場合に有効です。
開発時に型安全な開発が出来るようになります。

3. Supabaseクライアント 
Supabaseが提供するJavaScriptライブラリを使用してSupabaseに接続します。
小規模アプリケーション（テーブル数1～2個）に適しています。
Next.jsとSupabase直接繋げられます。
コロケーションに適しています。

4. Next.js Server Actions 
Next.js 13のServer Actionsを使用してサーバーサイドでSupabaseにアクセスします。
セキュリティ重視の場合に有効です。
コロケーションに適しています。

5. route.tsファイル 
Next.jsのAPI Routesを使用してAPIエンドポイントを作成し、Supabaseにアクセスします。
フロントエンドとバックエンドを分離したい場合に有効です。



----------------------------------------

# Honoを組み込む

## 目的

Honoを素で使ってみます。



## Hono の導入

```terminal
npm install hono

```



## それぞれのzod系バリデーションライブラリ

zod
zodの本体

drizzle-zod
drizzleのスキーマを渡してバリデーションが出来ます。

@hono/zod-validator
honoがzodを利用したバリデーションが出来ます。



## Honoの基本形

Next.js
Hono
Vercel

コードを追加します。

src\app\api\[...route]\route.ts

```route.ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

// Vercelに一番近い場所で実行するよう指定します。
export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

export const GET = handle(app)

```

src\app\hono\page.tsx

```page.tsx
"use client";

import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/hello')
      const { message } = await res.json()
      setMessage(message)
    }
    fetchData()
  }, [])

  if (!message) return <p>Loading...</p>

  return <p>{message}</p>
}

```

src\app\page.tsx

```page.tsx
export default function Home() {
  return (
    <div className="">
      {/* ログインページへのリンク */}
      <a href="/login" className="text-blue-200">ログイン</a>
      <br />
      {/* Honoページへのリンク */}
      <a href="/hono">Hono</a>
    </div>
  );
}

```

ブラウザに、
Hello from Hono!
と表示できたら成功です。



# Honoの基礎

Honoはrequestを受け取り、reaponseを返します。
Web標準であり、 honoはそれに従っています。

fetch関数が取り扱うオブジェクト
	Request
	Response

リクエストを受け取り、レスポンスを返します。

`function fetch(request: Request): Promise<Response>;`



Honoの基本的な使い方を理解しました。






----------------------------------------

# ここまで

Next.js
SupabaseのDB機能
Supabaseの認証機能
SupabaseのGraphql機能
DrizzleのDBスキーマとそのテーブルのデータの入力
Honoの基礎的な使い方まで勉強しました。

次は、Supabaseへのデータにアクセスします。



----------------------------------------

ここで一旦Supabaseに戻ります。

# Supabaseにアクセス

Supabaseにアクセスし、ブラウザ上にデータを表示します。

シンプルなusersテーブルを作ります。

## コード

src\types\user.ts

```user.ts
/**
 * ユーザーのデータ型を定義します
 */
export interface User {
  id: number
  name: string
}

```


スキーマの作成

src\db\schema\users.ts

```users.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  // createdAt: text('created_at').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
});

```



src\app\users\page.tsx

```page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { fetchUserData } from '../api/users/route'
import { User } from '../../types/user'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchUserData()
        setUsers(data)
      } catch (error) {
        console.log("🚀 ~ getData ~ error:", error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  if (isLoading) return <p>読み込み中...</p>
  if (hasError) return <p>データの取得に失敗しました。</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

```



src\app\api\users\route.ts

```route.ts
import { supabase } from '@/lib/supabase'
import { User } from '@/types/user' // User型をインポート

/**
 * ユーザーデータを取得する関数
 * @returns {Promise<User[]>} ユーザーデータの配列
 */
export const fetchUserData = async (): Promise<User[]> => {
  // Supabaseクライアントを使ってデータを取得
  const { data, error } = await supabase
    .from('users') // 'users' テーブルから
    .select('*') // 全てのカラムを選択

  // エラーチェック
  if (error) {
    console.error('データの取得に失敗しました:', error.message)
    throw new Error('データの取得に失敗しました')
  }

  // データを返す
  return data as User[]
}

```



seedデータ

src\db\seeds.ts

```seeds.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

import dotenv from "dotenv"
import { users } from "@/db/schema/users";
import { countries } from "@/db/schema/countries";

// 環境変数を読み込む
dotenv.config()

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  console.log("Seeding database...");
  console.log("Database URL: ", process.env.DATABASE_URL);

  // seedデータを挿入
  // usersスキーマの定義を渡します。
  await seed(db, { users });
}

main();

```



```terminal
npm run db:push
npm run db:seeds

npm run dev

```

これでブラウザを開けば
http://localhost:3000/users
にユーザーデータが表示されるはずです。



これで、Supabaseクライアントを使ってデータを取得、表示する方法を学びました。



----------------------------------------

SupabaseでのGraphQLの使い方は？
GraphQLは2022/03/29 に対応

# SupabaseのGraphQLを利用したアクセス方法

ローカルのSupabaseにはGraphqlのAPIが最初から設定されています。
Graphqlサーバーの代わりも担っているわけです。
Graphqlのクライアントを用意してアクセスします。

























SupabaseのGraphQL機能を使ってNext.jsで簡単なアプリを作ってみる #PostgreSQL - Qiita
https://qiita.com/dshukertjr/items/be036d38f77b1359f4be

GraphQL | Supabase Docs
https://supabase.com/docs/guides/graphql

Supabaseのローカル メニューから Integrationsを選択
Graphqlを選び
右側の画面でGraphqlを選びます。
GraphqlコードのブラウザIDE
http://localhost:54323/project/default/integrations/graphiql/graphiql
Graphqlのコードを試せます。


SupabaseでGraphQLを使いたい理由
必要なデータのみを取得: REST APIのように過剰なデータを取得することなく、必要なデータだけを取得できるため、効率的でパフォーマンスが向上します。
ベンダーロックインの回避: GraphQLは標準規格であるため、特定のベンダーに依存することを避けられます。
型安全性: GraphQLスキーマによって型が定義されるため、クライアント側で型安全性を確保できます。
ドキュメントの自動生成: GraphQLスキーマからドキュメントを自動生成できるため、APIドキュメントの作成と保守が容易になります。

Supabaseクライアントでアクセスをするとロックインで他のDBに切り替えられない・・・となりますが、
ミニアプリの場合、他の構成で開発する場合は一から作り直すと思います。


# アクセスするツール

Supabaseはpg_graphqlというPostgreSQLの拡張機能でアクセスします。
Supabaseが提供しているGraphQLエンドポイントはSupabaseのRLSも使えて、セキュアなアプリが簡単に作れます。

Supabase - データベースと認証認可機能
pg_graphql - PostgresのGraphQL用拡張機能
Next.js - フロントエンドフレームワーク
Tailwind CSS - スタイリング
Apollo Client - GraphQLクライアント

# 下準備

テーブルを作る、データを入れる(以前作った、usesテーブルを再利用)

GraphQL周りの型生成

TypeScript with Apollo Client - Apollo GraphQL Docs
https://www.apollographql.com/docs/react/development-testing/static-typing

GraphQLクライアントとしてApollo Client

```terminal
npm i @apollo/client graphql

npm i -D typescript graphql @graphql-codegen/cli @graphql-codegen/client-preset @graphql-typed-document-node/core

```









GraphQLクエリの作成:

GraphQLでは、データを取得するためのクエリを作成します。
例えば、特定のテーブルからデータを取得するクエリは以下のようになります。

クエリの基本形
query {
  your_table_name {
    id
    column1
    column2
  }
}

クエリの実行場所
Supabaseダッシュボードから
左メニューのIntegration(一番下)を開き、
右画面のタブ GraphQLを選びます。



query {
  users {
    id
    name
    created_at
  }
}




最後にpackage.jsonのscriptsにgraphql-codegenを追加しましょう。
これで `npm run compile` でTypescript用の型が生成されるようになります。


```package.json
...
  "scripts": {
    "compile": "graphql-codegen",
    "watch": "graphql-codegen -w"
  }

```


Blog
   "compile": "graphql-codegen --require dotenv/config --config codegen.ts dotenv_config_path=.env.local"
  },



## 

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '<URL_OF_YOUR_GRAPHQL_API>',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;



## 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------
----------------------------------------





