<!--
title:   Drizzle RLS Supabase Next.js Hono 最小限の開発
tags:    Drizzle,Hono,Next.js,RLS,Supabase
id:      dd8cc43e6855815a99ab
private: true
-->
2025年1月26日
現在: 限定記事

todo




----------------------------------------
----------------------------------------

今回は👇️このスターターを利用します。

SAASスターター
nextjs/saas-starter: Get started quickly with Next.js, Postgres, , and shadcn/ui.

https://github.com/nextjs/saas-starter

👆スターターの紹介(Vercelでの紹介)
Next.js SaaS Starter Template

https://vercel.com/templates/next.js/next-js-saas-starter

👆️スターターのデモ
Next.js SaaS Starter

https://next-saas-start.vercel.app/



※このスターターはNext.jsのsrcディレクトリを使用していません。
srcディレクトリを使用したい場合は、👇️を参考にしてください。

ただし、スターターの最新アップデートを置いたい場合は、スターターをフォークします。その時srcディレクトリに移動させてしまうと毎回調整する羽目になるので使わないほうがいいです。

Next.js のインストール時にsrcを選択した時と、しない時の差分の調査 (Next.js 14 App router) #AppRouter - Qiita

https://qiita.com/masakinihirota/items/77b52f51a3069c72005f



----------------------------------------

# 環境変数の設定

Auth認証とSupabaseのローカルとサーバー

Next.js App Router と Supabase と Stripe のスターターアプリに色んなパターンの環境変数を設定 #Next.js - Qiita
https://qiita.com/masakinihirota/items/1ae7d17377b8bac524d5

	↑この記事はパターン1,2,3の3種類

Next.js Supabase Stripe のスターターアプリを デプロイボタンを利用して設定するハンズオン。 #Next.js - Qiita
https://qiita.com/masakinihirota/items/695f572b05b82c2a7d57

	↑この記事はパターン1の1種類

## 環境変数

今回使用する環境変数の設定はパターン3です。

パターン3は
Next.js ローカル
Supabase ローカル

※パターンの詳細は環境変数を設定した記事を御覧ください。

```.env.example
# This is an example of your .env file format, which pnpm db:setup will create.
# Note: c
POSTGRES_URL=postgresql://*****
STRIPE_SECRET_KEY=sk_test_*****
STRIPE_WEBHOOK_SECRET=whsec_*****
BASE_URL=http://localhost:3000
AUTH_SECRET="*****"

GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"
GITHUB_CLIENT_ID="*****"
GITHUB_SECRET="*****"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="*****"

```

```.env.local.example
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="*****"
NEXT_PUBLIC_SUPABASE_ANON_KEY="*****"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
SUPABASE_SERVICE_ROLE_KEY="*****"

```

todo
※重複あり、後でチェック



----------------------------------------

# スタータを利用してテンプレートの作成

使用している、追加するツール
Next.js
Supabase
Drizzle
Stripe
TailwindCSS

vitest テスト駆動開発
shadcn/ui UI集 ダークモード
Hono RPC機能
Biome コードチェック 整形
lefthook Gitコマンド実行時のフック
Storybook コンポーネント管理
vitest テスト駆動開発
Plop コードのテンプレートからの自動生成

等を組み合わせて使います。

pgAdmin 4
DBeaver
Postman
i18n 国際化

## 開発を助ける 外部アプリ&外部ツール データベース関連


pgAdmin - PostgreSQL Tools

https://www.pgadmin.org/

DBeaver Community | Free Universal Database Tool

https://dbeaver.io/

Postman API Platform | Sign Up for Free

https://www.postman.com/


## 外部への公開ドキュメント用

Nextra
ScreenToGif

Nextra 無料で簡単にドキュメントをMarkdownで編集出来る静的サイトを作るツール (ドキュメント編) #Next.js - Qiita

https://qiita.com/masakinihirota/items/c9c80914b227a1716cdc

ScreenToGif - 画面を録画し、編集して GIF、ビデオ、またはその他の形式で保存します。

https://www.screentogif.com/



## typesync

typesyncツールのインストール

typesyncは、TypeScriptの型定義を調べてダウンロードしてくれます。
package.jsonを見て足りない型定義パッケージがあれば自動で追加してくれます。

```terminal
# インストール
pnpm i -D typesync

# 使い方
npx typesync

```




##

有料なので使ってない
FigmaのDevモード


##





##











----------------------------------------

# 用語

※この記事だけの用語です。

* ローカル、LOCAL

ローカルPCのDockerで動かしているSupabaseプロジェクト。
もしくはローカル側を指します。

* サーバー、リモートデータベース、REMOTE

ウェブサイトのダッシュボードからアクセスするSupabaseプロジェクト。
もしくはサーバー側を指します。

* マイグレーションファイル

データベースのスキーマを変更するためのファイルです。

* スキーマ

DBの設計図。
データベースの構造やテーブルの定義などを定義したものです。
ローカルとサーバーの両方を用いて開発設計するために。
両方の設計図をシンクロさせておく必要があります。

* ダンプ

データベースの内容をファイルに出力することを指します。出力されたファイルには、テーブルやカラム、データなどが含まれます。
ダンプを取ることで、データベースのバックアップを取ることができます。
また、別のデータベースにデータを移行する際にも使用できます。




----------------------------------------

# 開発時使用コマンド

## Drizzle基本コマンド

```terminal
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
npx drizzle-kit pull
npx drizzle-kit reset

npm run db:seeds

```





## Supabaseのコマンド

terminal上で直接コマンドを叩きます。

```terminal
supabase start
supabase stop
supabase status
supabase reset
supabase link

supabase gen types typescript --local > src/types/types_db.ts

supabase db diff
supabase migration new

supabase db dump --data-only -f supabase/seed.sql

supabase push
supabase pull

```

supabaseのCLIを直接叩く (npxは使わない)

※supabaseのrestartは削除

※supabaseのCLIは直接叩けるようにしておいたほうが良いと思います。
supabaseのコマンドは他にも色々とあります。


supabase start
supabase stop
supabase status

DB内のデータを保存したくない場合は
supabase stop --no-backup

supabase stop では保存されますが、
supabase start で再度立ち上げ
supabase db reset を実行するとSeed等に記録されてないデータは消えます。

supabase db dump -f supabase/seed.sql --data-only


# マイグレーションファイルやシードファイルの設定を反映

supabase reset

# ローカルから見たマイグレーションの状態

supabase migration list




## SQL

SupabaseのダッシュボードのSQL EditorからSQL文を実行します。

テーブルデータ削除

```sql
# usersテーブルのデータの確認
SELECT * FROM users;

# usersテーブル内のデータの削除
-- テーブル内のデータを取得
SELECT * FROM users;

-- テーブル内のデータを削除
DELETE FROM users; -- 特定の条件で削除する場合
TRUNCATE TABLE users; -- テーブルのデータをすべて削除（高速）

-- テーブル自体を削除
DROP TABLE users;

Supabaseのロール一覧
SELECT * FROM pg_roles;

```

特定の条件に合致するデータを削除する場合は DELETE を使用します。
テーブル内の全てのデータを高速に削除する場合は TRUNCATE TABLE を使用します。
テーブル自体が不要になった場合は DROP TABLE を使用します。

※👆 TRUNCATE命令はDELETE命令よりも高速に動作しますが、間違って全件削除しても、元に戻せません。
外部キー制約がある場合には使用できません。

そのためにバックアップは **必須** です。



## package.jsonバージョン調査

```terminal
npm install -g npm-check-updates
# バージョン調査
ncu

# 全ライブラリ アップグレード
ncu -u

```

package.jsonのnpmのバージョンを一括で書き変えてくれるncuが便利だった - tacamy--blog

https://tacamy.hatenablog.com/entry/2016/08/10/193603

##




## git開発ブランチ

main		メイン
dev			開発

devで開発してチェックしてエラーに対処して、ビルドが通ったらmainにマージしてから、
mainはgithubへpushします。



## Supabase CLIのアップデート

supabase CLIの更新

```terminal
scoop update supabase

```


##




##





----------------------------------------

# 開発時 確認URL

## ローカル

Next.jsアプリ
http://localhost:3000

Storybook
http://localhost:6006/

ローカルのSupabaseのダッシュボード
http://127.0.0.1:54323/project/default

http://127.0.0.1:54323/project/default/editor

Drizzle Studio
？？？



## サーバー

Supabaseダッシュボード
Dashboard | Supabase
https://supabase.com/dashboard/projects

Vercelダッシュボード
https://vercel.com/dashboard

公開サイト
？？？



##





----------------------------------------

# それぞれのCLI

ローカル開発関連

公式ドキュメント
Local Development | Supabase Docs

https://supabase.com/docs/guides/getting-started/local-development

Local Dev with CLI | Supabase Docs
https://supabase.com/docs/guides/cli

https://supabase.com/docs/reference/cli/supabase-init

## ローカルのSupabase

想定として
開発用、テスト用のローカルのSupabase
運用用のサーバーのSupabaseを用意します。

そして、ローカルで開発したコード、スキーマ、データ等を
サーバーのSupabaseにデプロイし、同期させます。

## Supabase CLIのインストール

scoopを使用します。

※VSCodeのpowershellはscoopが最初から使えます。

Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=windows

```terminal
# install
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# update
scoop update supabase

```




## Stripe CLI のインストール

Stripe CLI を使ってみる | Stripe のドキュメント

https://docs.stripe.com/stripe-cli?locale=ja-JP

```terminal
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git

scoop install stripe

```




## Vercel CLI のインストール

Vercel CLI Overview

https://vercel.com/docs/cli

```terminal
# インストール
pnpm i -g vercel

# update
pnpm i -g vercel@latest

vercel --version

```



##

↓package.jsonのscript

```package.json
・・・
  "scripts": {
    "stripe:login": "stripe login",
    "stripe:listen": "stripe listen --forward-to=localhost:3000/api/webhooks",
    "stripe:fixtures": "stripe fixtures fixtures/stripe-fixtures.json",
    "supabase:start": "npx supabase start",
    "supabase:stop": "npx supabase stop",
    "supabase:status": "npx supabase status",
    "supabase:restart": "npm run supabase:stop && npm run supabase:start",
    "supabase:reset": "npx supabase reset",
    "supabase:link": "npx supabase link",
    "supabase:generate-types": "npx supabase gen types typescript --local --schema public > types_db.ts",
    "supabase:generate-migration": "npx supabase db diff | npx supabase migration new",
    "supabase:generate-seed": "npx supabase db dump --data-only -f supabase/seed.sql",
    "supabase:push": "npx supabase push",
    "supabase:pull": "npx supabase pull",
    "test": "vitest --run",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "stripe:login": "stripe login",
    "stripe:listen": "stripe listen --forward-to=localhost:3000/api/webhooks",
    "stripe:fixtures": "stripe fixtures fixtures/stripe-fixtures.json"
  },

```






----------------------------------------

# Supabase

Docker Desktopを使って
Supabaseを立ち上げます。

Supabaseの初期化

```terminal
supabase init

supabase start

```


## サーバーのSupabaseにログイン

これはローカルとサーバーのSupabaseをリンクさせて、後でスキーマ等の同期を取るために必要です。


```terminal
# サーバーのSupabaseにログイン
supabase login

# ローカルとサーバーのSupabaseとリンクを張る。
supabase link --project-ref [project-id]

# 現在のSupabaseのプロジェクトのリスト
supabase projects list

```

※パスワードが求められます。
※projects list表示ではプロジェクトが複数あると、LINKEDに●のチェックが入っています。

## サーバーとローカルのマイグレーション状況

```terminal
supabase migration list

```

※これはあくまでもローカルから見た状況です。
サーバーの最新の情報でない場合があります。



# Supabaseのマイグレーションの基礎

マイグレーションファイル新規作成する場合

```terminal
supabase migration new new_employee

```

supabase/migrations/<timestamp>_new_employee.sql
↑マイグレーションファイルが作成されるので SQL文を記入します。

例

```<timestamp>_new_employee.sql
create table public.employees (
  id integer primary key generated always as identity,
  name text
);

```

↓編集したマイグレーションファイルを反映させます。

```terminal
supabase db reset

```

※このコマンドはsupabase/migrations フォルダにある
マイグレーションファイルをすべて反映させます。

これで最新の状態になります。

Tips
マイグレーションファイルを作る時
コマンドラインからマイグレーションファイルを読み込めます。

```terminal
supabase migration new new_employee < create_employees_table.sql

```


Supabaseのマイグレーション
サーバー側の適用方法

↓REMOTE（サーバー）側への適用方法

```terminal
↓REMOTE側の削除方法
supabase migration repair 20230918014029 --status reverted

↓REMOTE側の挿入方法
supabase migration repair 20230918014029 --status applied

```

※数字はマイグレーションファイルのタイムスタンプ部分です。

ローカル側はマイグレーションファイル自体を削除すれば消えます。



↓REMOTE（サーバー）側の削除方法

```terminal
supabase migration repair 20231017052010 --status reverted
supabase migration repair 20231017082823 --status reverted

```


Supabase サーバーのダッシュボードからの変更がある場合に取り入れます。


# ローカル側のスキーマを サーバーに反映
`terminal
supabase db push

```

# サーバー側のスキーマを ローカルに反映

```terminal
supabase db pull

```

Supabase サーバーのデータベースの現在のスキーマをローカルのマイグレーションファイルにプルダウン（ダウンロード）するためのものです。
これにより、データベースのスキーマをバージョン管理することができます。

`supabase/migrations/<timestamp>_remote_schema.sql`
というファイルが作成されます。


```terminal
supabase db push

```

プッシュしたら、ローカルとリモートの両方のデータベースで移行バージョンが最新であることを確認します。

バックアップ

```terminal
#スキーマのみ
supabase db dump -f supabase/schema.sql

#データのみ
supabase db dump -f supabase/seed.sql --data-only

```

データの保存、バックアップはデータベース管理ツールを使用します。

# 重要ルール

マイグレーションファイルを削除したら、リセットコマンドを実行するか再起動します。
そのままにしておくと、サーバーとの同期が崩れて後々大変なことになります。

SQL文を書き換えたり、SQL文エラーだったら修正すれば大丈夫です。





スターター リポジトリ内にあるスキーマファイルの内容を、

* SupabaseのSQL Editorに貼り付け実行します。
* Drizzle経由の場合はDrizzleのコマンドを使用します。





## 型

型は
DrizzleやHonoを利用した場合は自動で作成されます。

Supabaseの CLIから型の生成をする場合は
型の保存場所を作成し保存します。

```terminal
mkdir types

```

```terminal
#サーバーの型の取得
supabase gen types typescript --project-id [Reference ID] > types/types_db.ts

#ローカルの型の取得
supabase gen types typescript --local --schema public > types/types_db.ts

supabase gen types typescript --local > types/types_db.ts

```

※[Reference ID] Supabaseの Reference ID を入力します。

Supabaseのpublicスキーマの場合 --schema オプションは省略できます。
`--schema public`

成功すると型ファイルが生成されます。





## Filtering

テーブルからデータを取得する際にフィルタリングを行う方法

```With filtering
let { data: users, error } = await supabase
  .from('users')
  .select("*")

  // 様々なフィルタリング条件を指定
  .eq('column', 'Equal to') // 等しい
  .gt('column', 'Greater than') // より大きい
  .lt('column', 'Less than') // より小さい
  .gte('column', 'Greater than or equal to') // 以上
  .lte('column', 'Less than or equal to') // 以下
  .like('column', '%CaseSensitive%') // ケースセンシティブな部分一致
  .ilike('column', '%CaseInsensitive%') // ケースインセンシティブな部分一致
  .is('column', null) // NULLである
  .in('column', ['Array', 'Values']) // 配列の中に含まれる
  .neq('column', 'Not equal to') // 等しくない

// 配列に関するフィルタリング条件
  .contains('array_column', ['array', 'contains']) // 配列の要素を含む
  .containedBy('array_column', ['contained', 'by']); // 配列の要素に含まれる

```


Supabase schemaのauthのテーブルはSupabaseのシステムで用意されています。



### SupabaseのpublicテーブルのRLS

テーブルpublic.usersを選択し、右上に
2Auth policies
のボタンを押します。

👇そうすると、現在有効なRLSが見れます。


#### UPDATE

```update.sql
alter policy "Can update own user data."
on "public"."users"
to public
using (
  (auth.uid() = id)
);

```

👆ユーザーテーブルの情報は、ユーザー自身のみが更新



#### SELECT

```select.sql
alter policy "Can view own user data."
on "public"."users"
to public
using (
  (auth.uid() = id)
);

```

👆ユーザーテーブルの情報は、ユーザー自身のみが取得



### API Docs

Table Editorの右上 API Docsボタンを押します。

現在のテーブルの情報が表示されます。

```Columns
Name	Format	Type	Description
id	uuid	string
full_name	text	string
avatar_url	text	string
billing_address	jsonb	json
payment_method	jsonb	json

```




基本構文が表示されます。

### Read rows

usersテーブルから全てのカラムを読み込み

```Read all rows
let { data: users, error } = await supabase
  .from('users')
  .select('*')

```



特定のカラムを読み込み

```Read specific columns
let { data: users, error } = await supabase
  .from('users')
  .select('some_column,other_column')

```



usersテーブルと、other_tableという関連テーブルからもデータを取得

```Read referenced tables
// 参照されている別のテーブルのデータも取得
let { data: users, error } = await supabase
  .from('users')
  .select(`
    some_column,
    other_table (
      foreign_key
    )
  `)

```



パギネーション付きでデータを取得

```With pagination
// ページネーションを使用してデータを取得
const { data: users, error } = await supabase
  .from('users')
  .select('*')
  .range(0, 9); // 取得するデータの範囲を指定（0から9件まで）

```




### Insert rows

insertはテーブルに挿入することができます。一括挿入やUPSERTも可能です。

insertはUPSERT用に置換された値も返します。

挿入

```Insert a row
const { data, error } = await supabase
  .from('users')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()

```

複数挿入

```Insert many rows
const { data, error } = await supabase
  .from('users')
  .insert([
    { some_column: 'someValue' },
    { some_column: 'otherValue' },
  ])
  .select()

```

特定の条件に一致する行を更新または挿入する方法

upsertメソッドは、指定された条件に一致する行が存在する場合は更新し、存在しない場合は新しい行を挿入します。

```Upsert matching rows
// 特定の条件に一致する行を更新または挿入
const { data, error } = await supabase
  .from('users')
  .upsert({ some_column: 'someValue' }) // 更新または挿入するデータを指定
  .select(); // 更新または挿入後のデータを取得

```



### Update rows

updateはデフォルトですべての行にマッチします。eq、lt、is などの水平フィルタを使用すると、特定の行を更新することができます。

updateはUPDATEで置換された値も返します。

```Update matching rows
const { data, error } = await supabase
  .from('users')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()

```



### Delete rows

deleteはデフォルトですべての行にマッチするので、フィルタを指定してください。
`Delete matching rows
// 特定の条件に一致する行を削除
const { error } = await supabase
  .from('users')
  .delete()
  .eq('some_column', 'someValue')

```



### Subscribe to changes

Subscribeは、PostgreSQLデータベースの特定のテーブルにおける変更をリアルタイムで監視します。

このコードでは、'custom-all-channel'というカスタムチャンネルを作成し、postgres_changesイベントを監視しています。

event: '*'としてすべてのイベントに対してサブスクライブし、schema: 'public'とtable: 'users'でpublicスキーマのusersテーブルの変更を監視しています。

変更が発生するたびに、コールバック関数が呼び出され、変更の詳細が含まれるペイロードがコンソールに出力されます。


```Subscribe to all events
// すべてのイベントに対してサブスクライブ
const channels = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

```



このコードでは、'custom-insert-channel'というカスタムチャンネルを作成し、postgres_changesイベントを監視しています。event: 'INSERT'として挿入イベントにのみサブスクライブし、schema: 'public'とtable: 'users'でpublicスキーマのusersテーブルの変更を監視しています。挿入イベントが発生するたびに、コンソールにメッセージが出力されます。

```Subscribe to inserts
// 挿入イベントに対してサブスクライブ
const channels = supabase.channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

```



```Subscribe to updates
// 更新イベントに対してサブスクライブ
const channels = supabase.channel('custom-update-channel')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

```



```Subscribe to deletes
// 削除イベントに対してサブスクライブ
const channels = supabase.channel('custom-delete-channel')
  .on(
    'postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

```



```Subscribe to specific rows
const channels = supabase.channel('custom-filter-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users', filter: 'some_column=eq.some_value' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

```




## ローカル、サーバー問わず、Supabaseのダッシュボードからテーブルに変更を加えた時

現在のDBの状態(＝スキーマ)と、マイグレーションファイル に記録されているスキーマとの差分を取ります。

supabase db diff -f 接尾辞

※通常は-f フラグを使用して接尾辞を追加してマイグレーションファイルに出力します。

↓サーバー(＝リンク先のプロジェクト)に対しての、ローカルのマイグレーションファイルに記録されているスキーマとの差分を取ります。

supabase db diff --linked -f 接尾辞











































## Supabaseの参考URL

※この記事では基本的にすべてローカルでの開発環境に合わせた環境変数を使用しています。

Vercelを経由して公開する場合、Supabase サーバーに合わせた環境変数を設定します。

## Supabaseの公式ドキュメントと記事

Local Dev with CLI | Supabase Docs

https://supabase.com/docs/guides/cli

Supabase ローカル開発環境 ＋ サーバー運用 2023年9月 (with Next.js 13 App router) #Docker - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

Supabase ローカル開発環境 ＋ リモートサーバー #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/f12d16c31e6775f26b84

Next.js 13 App router と Supabase での４つのアクセス方法 #Next.js - Qiita

https://qiita.com/masakinihirota/items/b4b168a056dc10776d87

Supabase Auth スキーマ と そのテーブルの詳細 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/7f65f732ecbafbd5cb00

RLS(Row Level Security)入門ガイド Supabase(Postgres)データセキュリティの基礎 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/011c9ee596f6e4bcc78a


etc.




----------------------------------------

# 開発を助けてくれるツールの導入

## ncuの導入 パッケージのアップデート

ncuは現在のバージョンを調べる＆更新してくれるツールです。

npmパッケージのvulnerability対応フロー - Qiita
https://qiita.com/riversun/items/7f1679509f38b1ae8adb

```terminal
# パッケージが最新か確認します。
pnpm outdated

# 全て最新バージョンにアップデートしたい場合は
ncu -u

```


## メジャーかマイナーか、どこまでバージョンアップするのかを選ぶ

### メジャーバージョンまで最新にしたい場合

```terminal
# インストール
npm i -g npm-check-updates

# 全て最新バージョンにアップデートしたい場合は
ncu -u

# としてから、インストールが必要
pnpm install

```

### マイナーバージョンまで最新にする場合

```terminal
pnpm update

```

## もう一度確認する

```terminal
pnpm outdated

# 確認してこれで良いのならインストールをします。
npm install --legacy-peer-deps
pnpm install --legacy-peer-deps

```



----------------------------------------

# shadcn/ui

UIコンポーネント

## 追加

## CLI からのコンポーネントインストール方法

`npx @shadcn-ui add`コマンドは、新しいUIコンポーネントをプロジェクトに追加するためのコマンドです。特定のオプションを指定することで、その動作をカスタマイズすることができます。


```terminal
pnpm dlx shadcn-ui@latest add

```

※package.jsonファイルのある場所で実行します。





----------------------------------------

# ダークモード

shadcn/uiのダークモードを追加します。

Next.js - shadcn/ui

https://ui.shadcn.com/docs/dark-mode/next

実装はマニュアル通りにインストールします。

Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。 #DarkMode - Qiita

https://qiita.com/masakinihirota/items/7cf6181ba61fe9dc3802

## インストール

```terminal
pnpm add next-themes

```

## テーマプロバイダーの作成

 `terminal
touch src\components\theme-provider.tsx

```

## 固定されている色の削除

スターターで色が固定されているバックグラウンドの色や、文字の色を削除します。

設定がうまくいくと、ボタンで切り替わるようになります。

## 動作確認

```terminal
npm run dev

```

でローカルサーバーを起動して動作確認をします。

----------------------------------------

# ヘッダーにアプリの作る機能のボタンを並べる

(ログインボタンそばの)ヘッダーに
ダークモード
言語
広告
Pricing
Account
ボタンの(仮)作成





##





##





----------------------------------------

# Storybook

コンポーネントを管理するツールをインストールします。

Get started with Storybook • Storybook docs

https://storybook.js.org/docs/get-started

## インストール

```terminal
pnpm dlx storybook@latest init

```

##

※初回は自動でStorybookが立ち上がり、Storybookチュートリアルが始まります。
このStorybookのチュートリアルはかなり出来が良いので、一度やってみることをおすすめします。

## 実行方法

```terminal
pnpm run storybook

```

http://localhost:6006/





##



## StorybookでのTailwindCSSの設定

Storybook でも TailwindCSS が使えるようにします。

TailwindCSSの設定ファイルを
`.storybook\preview.ts`
👆このファイルで読み込ませます。

※このアプリでは、TailwindCSSの設定は
`src/styles/main.css`
に書かれています。



`import "../src/styles/globals.css"`
を ↓ のファイルに追加します。

```.storybook\preview.ts
import type { Preview } from '@storybook/react';

import '../src/styles/main.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

```




----------------------------------------

# コロケーション

Next.jsでは、

`_フォルダ名`

↑このように書くと、ルーティングで無視されます、
その機能を利用して
_componentsを作成します。
そうして、この中に1ページ分のコンポーネントファイルを置きます。
これでルーティングから外れた1ページ分のコンポーネントが出来ます。

共通するコンポーネントは外側にある、共通のコンポーネントフォルダに置きます。

基本の必要ファイル
fetch.tsx
business.tsx
loading.tsx
error.tsx
page.tsx
***.stories.tsx
***.test.tsx






##

# 1ページコンポーネント

## ワイヤーフレーム

1ページの仮の見た目を作る

## テーブル設計

1画面のワイヤーフレームから必要なテーブルを設計する

## テーブル作成

設計したテーブルを実際にSupabaseのテーブルを作る

## データ入力

作ったテーブルに、テスト用の仮のデータを数件入力する

## データアクセス、取得

Next.jsからSupabaseへアクセスする
データを取得する

## データ加工

取得したデータを加工する


## データ表示

加工されたデータを受け取って
1ページに表示する

SupabaseDB を使ってデータにアクセスして、それを表示するNext.jsアプリ

## データ取得 fetchコンポーネント

```fetch.tsx
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの作成
const supabase = createClient('SUPABASE_URL', 'SUPABASE_KEY');

// データを取得する関数
export async function fetchData() {
  // データベースからデータを取得
  const { data, error } = await supabase.from('table_name').select('*');

  if (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }

  return data;
}

```



## データ加工 ビジネスコンポーネント

```business.tsx
import { fetchData } from './fetch';

// データを加工する関数
export function processData(data: any[]) {
  // ここでデータの加工や処理を行う
  // 例: 特定の条件に基づいたフィルタリングや並べ替え

  return data;
}

```



## データ表示 ビューコンポーネント

```page.tsx
// page.tsx
import { useEffect, useState } from 'react';
import { fetchData } from './fetch';
import { processData } from './business';

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  // データを取得して、stateにセットする
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        const processedData = processData(fetchedData);
        setData(processedData);
      }
    };
    getData();
  }, []);

  // データの表示
  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{/* データの表示 */}</li>
        ))}
      </ul>
    </div>
  );
}

```

実際のコード例を作ってください。




##





----------------------------------------

# テスト

Presentation/Logicを分離して、テストしやすさをあらかじめ担保する
ESLint prettier 静的解析
StorybookのUIカタログ
Snapshotテスト
VRT

フロントエンドの"ちょうどいい"自動テストのはじめかた - Atrae Tech Blog
https://atraetech.hatenablog.com/entry/2022/09/30/105747

自動テストのしやすさに主眼を置く



関数単位のテスト
Unit Test
	vitest
	Jest

コンポーネント単位のテスト
Integration Test
	React Testing Library

全体の動作のテスト
End to end Test(E2E)
	Playwright







##





##





----------------------------------------

# ファイル自動生成 1

App routerで必要なファイルを一挙に作る拡張機能

VSCode拡張機能
Next.js CLI - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=KristiyanVelkov.nextjs-cli

👆 pages.tsx、layouts.tsx、 errors.tsx、 not-found.tsx 他をまとめて自動生成します。



# ファイルの自動生成 2

scaffdogを導入してStorybookを使ったコンポーネント作成を幸せにしてみた #storybook - Qiita
https://qiita.com/yr_tms/items/5ccaf2d140bea1d6c2d1

👆 Next.js以外のファイル、Storyファイルやテストファイルも一緒に作りたいのならば
開発に慣れてきて、大量に作るようになったらこちらを利用します。



# ファイルの自動生成 3

Nextjs snippets - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=PulkitGangwar.nextjs-snippets

👆 スニペット形式でコードを書きます。 ただし、ファイルは手動で作ります。

拡張機能をインストールして、短縮コードを覚える必要があります。

※スニペットはVScodeの基本機能にあるので、その他のスニペットも自作することが出来ます。






##





##





----------------------------------------

# テスト駆動開発

再考 テスト駆動開発 #TDD - Qiita
https://qiita.com/masakinihirota/items/0a714d729d14da5cc7f4

基本的な Next.js 13 App router での vitest テストファイルの書き方 (テンプレートから始めるテスト駆動開発 Next.js 13 App router、 vitest 、 Storybook、 Plop) - Qiita

https://qiita.com/masakinihirota/items/3c7ef09cbaebfa702bba

目標
設計書を作ってから、それを元にテストリストを作成します。
1コンポーネントに最低1つのテストを作ります。
コロケーションでテストを作成します。

※設計書はテンプレートを作成後に考えます。



開発はコンポーネントを
テスト駆動開発
コロケーション
で行います。

コロケーションとは、同じ階層にコードとテストコードを一緒に並べておく開発手法です。

例
src/component/about.tsx			＜＜aboutコンポーネントファイル
src/component/about.test.tsx		＜＜aboutコンポーネントのテストファイル

コードとテストコードを一緒に置く。


テスト駆動開発に
vitest
React Testing Library
を利用します。

# vitest

Testing: Vitest | Next.js

https://nextjs.org/docs/app/building-your-application/testing/vitest

next.js/examples/with-vitest at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-vitest



現在、vitestは非同期のコンポーネントには対応していません。

## インストール

pnpm i @vitejs/plugin-react

※このライブラリは -D フラグでインストールすると認識しない。

pnpm i server-only

pnpm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitest/ui jsdom vitest



## VSCode拡張機能

Vitest - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer

この拡張機能を使用するためには、npm run test を実行させておく必要があります。
(vitest の ウォッチモード)

VSCodeのエディタ画面の行の左にGREENやREDのアイコンが表示されています。
左クリックでテストの実行
右クリックでメニューが開きます。

## スクリプトの追加

```package.json
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",

```

testはウォッチ形式でソースコードを保存するたびにテストが回ります。
test:uiはブラウザでテスト結果を表示してくれます。



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



----------------------------------------

## テスト実装編

### 4つのテストコード

1. 基本コンポーネントのテストコード
1. Hooksコンポーネントのテストコード
1. 動的フォルダのテストコード
1. RSC(React Server Components)のテストコード



#### サンプル01 基礎 シンプルなクライアントコンポーネントとそのテストコード

一番シンプルなコンポーネントを作り、
そこに指定された文字が表示されるコンポーネントかどうかテストをします。


mkdir src\app\sample\ClientComponent
touch src\app\sample\ClientComponent\Index.tsx
touch src\app\sample\ClientComponent\Index.test.tsx


```src\app\sample\ClientComponent\Index.tsx
"use client"
import React from "react"

export default function ClientComponent() {
  return <h1>Client Component</h1>
}

```



```src\app\sample\ClientComponent\Index.test.tsx
import { render, screen } from "@testing-library/react"
import React from "react"
import { expect, test } from "vitest"

import ClientComponent from './Index';

test("App Router: Works with Client Components", () => {
  render(<ClientComponent />)
  expect(
    screen.getByRole("heading", { level: 1, name: "Client Component" })
  ).toBeDefined()
})

```

テストの動作確認

npm test



ブラウザで表示します。

```app/page.tsx
import ClientComponent from '@/app/sample/ClientComponent/Index';

・・・

      テスト
      <ClientComponent />

```

動作確認

npm run dev



#### サンプル02 Hooksを使用したクライアントコンポーネントとそのテストコード

Hooksを利用してボタンを押すと＋１していくコンポーネントの作成

コンポーネントファイルの作成

touch src\app\sample\Counter\Counter.tsx
touch src\app\sample\Counter\Counter.test.tsx


```src\app\sample\Counter\Counter.tsx
"use client"

import React from "react"
import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      テスト用カウンター
      <h2>{count}</h2>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  )
}

export default Counter

```

useStateを使っているので 'use client'ディレクティブを付けます。



コンポーネントのテストファイル

```src\app\sample\Counter\Counter.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { expect, test } from "vitest"

import Counter from './Counter';

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
import Counter from '@/app/sample/Counter/Counter';
import ClientComponent from '@/app/sample/ClientComponent/Index';

・・・

      テスト
      <ClientComponent />
      <Counter />

```

動作確認

npm run dev



#### サンプル03 動的なルートセグメントを使用した場合のテスト

mkdir src\app\sample\[slug]
touch src\app\sample\[slug]\Page.tsx
touch src\app\sample\[slug]\Page.test.tsx


```src\app\sample\[slug]\Page.tsx
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



```src\app\sample\[slug]\Page.test.tsx
import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import Index from './Page';

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

http://localhost:3000/sample/123

123がslugに相当します、そして123を用いて動的なページ生成が生成されます。

この機能を使うことで日付＋タイトルといったURLを事前に用意しなくても動的にページが作成できます。



Topページを編集します。

```src\app\page.tsx

export default async function Index() {
  const blogId = '123'; <<追加

・・・

      テスト
      <ClientComponent />
      <Counter />
      <Link href={`/sample/${blogId}`}>Blogページ</Link>

```

動作確認

npm run dev



#### サンプル04 RSCのテスト

React server componentsのテスト

サーバーコンポーネントのテスト。

Hooksもインタラクティブな操作もないのでサーバーコンポーネントに出来ます。

mkdir src\app\sample_rsc
touch src\app\sample_rsc\Index.tsx
touch src\app\sample_rsc\Index.test.tsx


```src\app\sample_rsc\Index.tsx
// import 'server-only' does not currently
// work with Vitest

export default function Page() {
  return <h1>App Router</h1>
}

```

server-onlyを使用することで完全にサーバーサイドでのみ実行されます。
しかし現在vitestで動きません。

```src\app\sample_rsc\Index.test.tsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Index from './Index';

test('App Router: Works with Server Components', () => {
  render(<Index />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'App Router' })
  ).toBeDefined();
});

```

テストの動作確認

npm test



topページに表示させます。

```app\page.tsx
import Counter from '@/app/sample/Counter/Counter';
import ClientComponent from '@/app/sample/ClientComponent/Index';
import Page from '@/app/sample_rsc/Index';

・・・

      テスト 4種類
      <ClientComponent />
      <Counter />
      <Link href={`/blog/${blogId}`}>Blogページ</Link>
      <Page />

```



動作確認

npm run dev



以上、4つのコードとそのテストコードでした。

テストのコードは色んなパターンを網羅できるので各自調べてください。



外部データ（データベース等）を取得して表示するコンポーネントなど
モックを作ればいい？

コンポーネントのテストはvitest
コンポーネントのいろいろなpropsを試すにはStorybook
コンポーネントの開発はテスト駆動開発


----------------------------------------

vitestを初めて導入するので
Next.js 公式サンプル with-vitest を参考に
vitestを追加します。

next.js/examples/with-vitest at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-vitest

vitestではすべてのテストを `__tests__` に置くこともできますし、
App Router 内で他のファイルと一緒に配置することもできます。

例えば ↓コンポーネントファイルのすぐ隣にテストファイルを置くことが出来ます。

例
src/component.tsx			＜＜コンポーネントファイル
src/component.test.tsx		＜＜コンポーネントのテストファイル


※この動作を確認するためにテストファイルを テストファイルを置く専用フォルダ(__test__)ではなく、 `src/app`内に一緒に置いています。

さらにすすめて ↑component.tsx ファイル内に テストコードを書くことも可能です。

参考
In-source testing | Guide | Vitest

https://vitest.dev/guide/in-source.html#setup



インストール
npm i @vitejs/plugin-react
※このライブラリは -D フラグでインストールすると認識しない。

npm i server-only

npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitest/ui jsdom vitest



ツールのインストール

typesync

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



## スクリプトの追加

```package.json
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage",

```

testはウォッチ形式でソースコードを保存するたびにテストが回ります。
test:uiはブラウザでテスト結果を表示してくれます。



vitestのコンフィグ設定

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





App routerで書かれる **基本的な4種類のテストコード** を調べます。

1. 基本コンポーネントのテストコード
1. Hooksコンポーネントのテストコード
1. 動的フォルダのテストコード
1. RSC(React Server Components)のテストコード





# サンプル01 基礎 シンプルなクライアントコンポーネントとそのテストコード

mkdir src\__tests__\client\
touch src\__tests__\client\page.tsx
touch src\__tests__\client\page.test.tsx


```src\__tests__\client\page.tsx
"use client"
import React from "react"

export default function ClientComponent() {
  return <h1>Client Component</h1>
}

```



```src\__tests__\client\page.test.tsx
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
import ClientComponent from "@/__tests__/client/page"

・・・

      <h1 className="text-3xl font-bold underline">VNS.BLUE</h1>
      {/* テストとストーリーファイル 4種類 */}
      <ClientComponent />

```

動作確認

npm run dev



# サンプル02 Hooksを使用したクライアントコンポーネントとそのテストコード

コンポーネントファイルの作成

mkdir src\__tests__\components
touch src\__tests__\components\component.tsx
touch src\__tests__\components\component.test.tsx

```src\__tests__\components\component.tsx
"use client"

import React from "react"
import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      テスト用カウンター
      <h2>{count}</h2>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  )
}

export default Counter

```

useStateを使っているので 'use client'ディレクティブを付けます。



コンポーネントのテストファイル

```src\__tests__\components\component.test.tsx
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
import Counter from "@/__tests__/components/component"

・・・

      {/* テストとストーリーファイル 4種類 */}
      <ClientComponent />
      <Counter />

```

動作確認

npm run dev



# サンプル03 動的なルートセグメントを使用した場合のテスト

動的セグメントのテストなのでappフォルダの下に置く必要があります。

mkdir src\app\blog\[slug]
touch src\app\blog\[slug]\page.tsx
touch src\app\blog\[slug]\page.test.tsx

```src\app\blog\[slug]\page.tsx
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



```src\app\blog\[slug]\page.test.tsx
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

      {/* テストとストーリーファイル 4種類 */}
      <ClientComponent />
      <Counter />
      <Link href={`/blog/${blogId}`}>Blogページ</Link>

```

動作確認

npm run dev



# サンプル04 RSCのテスト

React server componentsのテスト

サーバーコンポーネントのテスト。

Hooksもインタラクティブな操作もないのでサーバーコンポーネントに出来ます。

mkdir src\__tests__\rsc
touch src\__tests__\rsc\page.test.tsx
touch src\__tests__\rsc\page.tsx


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
import Page from "@/__tests__/rsc/page"

      {/* テストとストーリーファイル 4種類 */}
      <ClientComponent />
      <Counter />
      <Link href={`/blog/${blogId}`}>Blogページ</Link>
      <Page />

```



動作確認

npm run dev



以上4つのコンポーネントとテストファイルでした。



----------------------------------------

# plop

plopという雛形ファイル自動生成ツールを使って、
コロケーションを実現します。

## Next.js コンポーネント
component サーバーorクライアント

## 機能でファイル分離

フェッチコンポーネント のファイル
ロジックコンポーネント のファイル
ビューコンポーネント のファイル

Storybook
テスト



##

componentは
サーバーかクライアントで使い分ける



## フェッチコンポーネント
'use server'
サーバーコンポーネント
表示するデータをSupabaseから取得してくる。



## ロジックコンポーネント

取得したデータを加工する



## ビューコンポーネント
'use client

page.tsx

加工したデーターを表示する
shadcn/UIを使って表示する。

クライアントコンポーネント
ボタンやhooksなどで利用



## Storybook ファイル SFC3

***.stories.tsx



## テスト ファイル

***.test.tsx



----------------------------------------


# Zod

TypeScript向けのスキーマ宣言とデータ検証のためのライブラリです。

ユーザー入力が期待通りかどうかをチェックし、型安全な方法でデータ構造を定義し、それに基づいてデータを検証することができます。

## インストール

```
pnpm add zod

```

## 簡単な確認

適当な場所にフォルダを作って
そこに、👇️Page.tsxを作って、その場所を開きます。

```Page.tsx
import { z } from 'zod';

export default function Page() {
  const stringScheme = z.string();

  // 'apple'が出力されます。
  const result = stringScheme.parse('apple')
  console.log(result);

  // エラーが発生します。
  const resultError = stringScheme.parse(true)
  console.log(resultError);

  return (
    <div>
      Zodテスト
    </div>
  );
}

```



## プリミティブな型

* z.string()：文字列
* z.number()：数値
* z.bigint()：bigint型
* z.boolean()：boolean型
* z.date()：日付
* z.symbol()：シンボル
* z.undefined()：undefined
* z.null()：null
* z.void()：void
* z.any()：any型
* z.unknown()：unknown型
* z.never()：never型



## オブジェクト型

オブジェクト型のスキーマを定義するには、z.object()関数を使用します。

```
const User = z.object({
  name: z.string(),
  age: z.number(),
});

```



## TypeScriptの型の生成

Zodは、スキーマからTypeScriptの型を生成することができます。

```
 const FormData = z.object({
    name: z.string().min(2).max(50),
    age: z.number()
  });

  type FormDataType = z.infer<typeof FormData>;

```

この例では、FormDataという名前のスキーマを定義し、その中にnameとageという2つのプロパティを定義しています。

nameプロパティは2文字以上50文字以下の文字列である必要があり、ageプロパティは数値型である必要があります。

z.infer型ガードを使用することで、FormDataスキーマからTypeScriptの型であるFormDataTypeを生成することができます。



----------------------------------------

#

Nextra 無料で簡単にドキュメントをMarkdownで編集出来る静的サイトを作るツール (ドキュメント編) #Next.js - Qiita
https://qiita.com/masakinihirota/items/c9c80914b227a1716cdc

ドキュメントに書かれていることが全て正しく最優先される。






##





##





----------------------------------------

# GitHub認証 google認証 Slack認証


Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub) #GitHub - Qiita

https://qiita.com/masakinihirota/items/706326a64dab3ffbf55b




```terminal
pnpm install @supabase/ssr @supabase/supabase-js

```


##

ローカルでGitHub認証などを動かすための
Supabase設定ファイル config.toml

参考
【Supabase】ローカル開発でOAuthの処理に苦しめられたので解決策のメモ書きを残します
https://zenn.dev/masa5714/articles/8922dfb9e0c9ff

1箇所目

```supabase\config.toml
[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://localhost:3000"]

```

2箇所目

```supabase\config.toml

[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

[auth.external.google]
enabled = true
client_id = "env(GOOGLE_CLIENT_ID)"
secret = "env(GOOGLE_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

[auth.external.azure]
enabled = false
client_id = "env(AZURE_CLIENT_ID)"
secret = "env(AZURE_SECRET)"
url = "https://login.microsoftonline.com/f242226b-5204-4bb2-86ff-69e42c87814c"
# Overrides the default auth redirectUrl.
redirect_uri = ""

[auth.external.slack]
enabled = true
client_id = "env(SLACK_CLIENT_ID)"
secret = "env(SLACK_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

```





##


# GitHub認証 無料

Login with GitHub | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-github

GitHub ログインの設定は、次の 3 つの部分で構成されます。

1. GitHub上で GitHub OAuth アプリを作成および構成する。
2. GitHub OAuth キーをSupabase プロジェクトに追加します。
3. ログイン コードをSupabase JS クライアント アプリに追加します。

※プロバイダー トークンは、プロジェクトのデータベースには意図的に保存されません。

OAuthフローを完了したブラウザーの外でプロバイダートークンを使用したい場合は、
管理下の安全なサーバーにプロバイダートークンを手動で送信する必要があります。


※ローカルでこの設定は使えない
あくまでもSupabaseのサーバーのみ

## 1. GitHub Oauth アプリを作成する

最初にSupabaseでCalll backの値を取得します。

Supabase ダッシュボードへ移動

Dashboard | Supabase
https://supabase.com/dashboard/projects

左側のサイドバーのAuthentication
Providersを選択。

GitHubを選択

GitHub enabled ボタンをオンにします。



設定します。

Client ID
まだ登録しません。

Client Secret
まだ登録しません。

Callback URL (for OAuth) ＜＜固定
https://*****.supabase.co/auth/v1/callback

↑このコールバックを取得します。
そしてGitHub側で登録します。



GitHubへ移動します。

masakinihirota (masakinihirota)
https://github.com/masakinihirota

GitHubの右上の写真から setting
一番下のDeveloper settings
OAuth Apps

右上写真下のNew OAuth Appボタンを押します。

作成します。

Application name
vns.blue
masakinihirota

Homepage URL
https://www.vns.blue/
https://www.masakinihirota.com/

Application description
vns
masakinihirota

取得したCallback URL を登録します。
Authorization callback URL

masakinihirota
https://*****.supabase.co/auth/v1/callback


Register Buttonボタンを押します。



登録すると
vns.blueのClient ID等が表示されます。
or
masakinihirotaのClient ID等が表示されます。

Supabase に戻ってGitHubで取得した値を登録します。

GitHub
vns
masakinihirota

Client ID
*****

Client Secret (携帯認証が必要)
*****

Callback URL (for OAuth)
	https://*****.supabase.co/auth/v1/callback

Saveボタンを押します。

以上でGitHubとSupabase間の認証の設定が終わりました。

SupabaseにGitHubの情報を登録します。

Client ID
と
Client Secret



# 実際にGitHubで認証をしてみる

仕組み
ユーザがサインアップする。
Supabaseはauth.usersテーブルに新しいユーザーを作成する。
SupabaseはユーザーのUUIDを含む新しいJWTを返す。
データベースへの全てのリクエストはJWTを送信します。
PostgresはJWTを検査し、リクエストを行ったユーザーを特定します。
ユーザのUIDは、行へのアクセスを制限するポリシーで使用できます。
SupabaseはPostgresの特別な関数、auth.uid()を提供し、
JWTからユーザのUIDを抽出します。
これはポリシーを作成する際に特に便利です。



ユーザー管理
Supabaseはユーザーを認証・管理するための複数のエンドポイントを提供します：

サインアップ
パスワードによるサインイン
パスワードレス/ワンタイムパスワード(OTP)によるサインイン
OAuthによるサインイン
サインアウト

ユーザーがサインアップすると、
SupabaseはそのユーザーにユニークなIDを割り当てます。

このIDはデータベースのどこからでも参照できます。
例えば、user_idフィールドを使ってauth.usersテーブルのidを
参照するprofilesテーブルを作成することができます。

Redirect URLs | Supabase Docs

https://supabase.com/docs/guides/auth/concepts/redirect-urls#vercel-preview-urls

リダイレクトURL
Supabase AuthでリダイレクトURLを設定する。



概要

パスワードレスサインインやサードパーティプロバイダを使用する場合、
Supabaseクライアントライブラリのメソッドには、
認証後にユーザをどこにリダイレクトさせるかを指定する
redirectToパラメータが用意されています。

デフォルトでは、ユーザはSITE_URLにリダイレクトされますが、
SITE_URLを変更したり、
リダイレクト先のURLを許可リストに追加したりすることができます。

必要なURLを許可リストに追加したら、
redirectToパラメータにユーザーをリダイレクトさせたいURLを
指定します。

リダイレクトURLにワイルドカードを使う。
Supabaseでは、
リダイレクトURLを許可リストに追加する際に
ワイルドカードを指定することができます。

NetlifyやVercelのようなプロバイダからのプレビューURLをサポートするために、
ワイルドカードのマッチパターンを使うことができます。





----------------------------------------

# 再起動

Dockerのボリュームを消して
最初の設定から開始する場合


```terminal
supabase start
pnpm run db:push
pnpm run dev

```

トリガーをダッシュボードからSQL分として実行して登録します。
※トリガーはDrizzleから登録できないため。

Next.jsのアプリを立ち上げてGitHub認証ボタンを押すと

Supabaseのダッシュボードで
auth.users
public.roots
のそれぞれにデータが登録されています。



ここから一つ一つ登録します。













----------------------------------------















----------------------------------------















----------------------------------------















----------------------------------------

# 認証時のユーザーデータをpublicスキーマ テーブルにコピー

GitHub認証成功時に、auth.usersにデータが挿入されます。
publicにrootsテーブルを作ります。
そこにGitHub認証時に得たデータをアプリで使うのに必要な項目だけコピーします。

テスト手順
Supabaseのvolumeをクリア
Supabaseを立ち上げる
Next.jsローカルサーバーを立ち上げる
http://localhost:3000/
SupabaseSQLエディタを立ち上げる
http://localhost:54323/project/default/editor/
SupabaseAuthスキーマのusersテーブルを表示する。
http://localhost:54323/project/default/auth/users

pushをしてrootsテーブルを登録します。
※同時にオリジナルのスキーマも登録されます。

トリガーを登録します。

GitHub認証でログインします。

データが
auth.usersからpublic.rootsテーブルにコピーされているかどうかを確認します。





GitHub認証の認証後のユーザーデータです

auth.users
{
  "instance_id": "00000000-0000-0000-0000-000000000000",
  "id": "90df79eb-41c3-4ba5-9b0c-e70130720e5d",
  "aud": "authenticated",
  "role": "authenticated",
  "email": "masakinihirota@gmail.com",
  "encrypted_password": null,
  "email_confirmed_at": "2025-02-04 22:31:59.610192+00",
  "invited_at": null,
  "confirmation_token": "",
  "confirmation_sent_at": null,
  "recovery_token": "",
  "recovery_sent_at": null,
  "email_change_token_new": "",
  "email_change": "",
  "email_change_sent_at": null,
  "last_sign_in_at": "2025-02-04 22:32:21.158266+00",
  "raw_app_meta_data": {
    "provider": "github",
    "providers": [
      "github"
    ]
  },
  "raw_user_meta_data": {
    "iss": "https://api.github.com",
    "sub": "7696510",
    "name": "masakinihirota",
    "email": "masakinihirota@gmail.com",
    "full_name": "masakinihirota",
    "user_name": "masakinihirota",
    "avatar_url": "https://avatars.githubusercontent.com/u/7696510?v=4",
    "provider_id": "7696510",
    "email_verified": true,
    "phone_verified": false,
    "preferred_username": "masakinihirota"
  },
  "is_super_admin": null,
  "created_at": "2025-02-04 22:31:59.583827+00",
  "updated_at": "2025-02-04 22:32:21.161319+00",
  "phone": null,
  "phone_confirmed_at": null,
  "phone_change": "",
  "phone_change_token": "",
  "phone_change_sent_at": null,
  "confirmed_at": "2025-02-04 22:31:59.610192+00",
  "email_change_token_current": "",
  "email_change_confirm_status": 0,
  "banned_until": null,
  "reauthentication_token": "",
  "reauthentication_sent_at": null,
  "is_sso_user": false,
  "deleted_at": null,
  "is_anonymous": false
}



## 必要な項目

ユーザーの一意なID。UUID。
`id`

Audience。認証対象の識別子。ここでは "authenticated" なので、認証済みユーザーであることを示す。
`aud`

	ユーザーのロール。ここでは "authenticated" で、認証済みユーザーであることを示す。
	`role`

ユーザーのメールアドレス。
`email`

メールアドレス確認日時。
`email_confirmed_at`

最終ログイン日時。
`last_sign_in_at`

アプリケーションメタデータ。
`raw_app_meta_data`

認証プロバイダー。ここでは "github"。
`provider`

認証プロバイダーのリスト。ここでは "github" のみ。
`providers`



`raw_user_meta_data`
ユーザーメタデータ。GitHubから取得したユーザー情報。

ユーザー名。
`name`

ユーザーのメールアドレス。
`email`

フルネーム。
`full_name`

ユーザー名（GitHubのユーザー名）。
`user_name`

メールアドレス確認済みかどうか。ここではtrue。
`email_verified`

`created_at`
ユーザー作成日時。
`updated_at`
ユーザー更新日時。

ユーザー削除日時。ここではnull。
`deleted_at`

匿名ユーザーかどうか。ここではfalse。
`is_anonymous`





    // メールアドレス確認日時。
    // `email_confirmed_at`
    // // 最終ログイン日時。
    // `last_sign_in_at`

    // アプリケーションメタデータ。
    // `raw_app_meta_data`

    // 認証プロバイダー。ここでは "github"。
    // `provider`

    // 認証プロバイダーのリスト。ここでは "github" のみ。
    // `providers`

    // `raw_user_meta_data`
    // ユーザーメタデータ。GitHubから取得したユーザー情報。

    // ユーザー名。
    // `name`

    // ユーザーのメールアドレス。
    // `email`

    // フルネーム。
    // `full_name`

    // ユーザー名（GitHubのユーザー名）。
    // `user_name`

    // メールアドレス確認済みかどうか。ここではtrue。
    // `email_verified`

    // `created_at`
    // ユーザー作成日時。
    // `updated_at`
    // ユーザー更新日時。

    // ユーザー削除日時。ここではnull。
    // `deleted_at`

    // 匿名ユーザーかどうか。ここではfalse。
    // `is_anonymous`




スターターオリジナルのスキーマ メール用users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at')
})




















----------------------------------------

# Google認証 無料

Login with Google | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-google

Supabase ダッシュボードで Google プロバイダーを構成する。



## 設定開始

Enable Sign in with Google をオンにします。

Client ID (for OAuth)
*****

Client Secret (for OAuth)
*****

Authorized Client IDs (for Android, One Tap, and Chrome extensions)
*****

Skip nonce checks
iOS関連らしいので今回は無視します。

Callback URL (for OAuth)
masakinihirota
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback




## ここからGoogle側の設定を調べます。

話題のSupabaseでサクッとGoogle認証機能をつくってみた！ - Qiita

https://qiita.com/kaho_eng/items/a37ff001ea9eae226183

GCP(Google Cloud Platform) で、Googleプロジェクトの作成

https://cloud.google.com/

サインインをします。

右上の「コンソール」を押します。
画面遷移先左上のプロジェクトの選択を押します。
右上の新しいプロジェクトを押します。

プロジェクト名と場所を設定します。

プロジェクト名
masakinihirota

場所
組織なし

作成ボタンを押します。

ダッシュボードのブラウザの最上段に作成したプロジェクト名がでていればOKです。

APIとサービス
OAuth同意画面
を選択します。

「ユーザーの種類」を選択します。
外部を選択し作成ボタンを押します。



アプリ登録の編集 画面になります。

アプリ名
vns.blue

masakinihirota

ユーザー サポートメール
masakinihirota@gmail.com

アプリのロゴ
設定しない


アプリのドメイン

アプリケーションのホームページ
https://masakinihirota.com/

アプリケーション プライバシー ポリシー リンク
設定しない

アプリケーション 利用規約 リンク
設定しない

承認済みドメイン
masakinihirota.com

デベロッパーの連絡先情報
masakinihirota@gmail.com

「保存して次へ」ボタンを押します。

非機密のスコープ
特に設定しません

機密性の高いスコープ
特に設定しません

制限付きのスコープ
特に設定しません

「保存して次へ」ボタンを押します。



省略可能な情報
特に設定しません

「保存して次へ」ボタンを押します。



OAuth 同意画面
ユーザーの種類
外部

アプリ名
masakinihirota

サポートメール
masakinihirota@gmail.com

アプリのロゴ
指定されていません

アプリケーション プライバシー ポリシー リンク
設定しない

アプリケーション 利用規約 リンク
設定しない

承認済みドメイン
masakinihirota.com

連絡先メールアドレス
masakinihirota@gmail.com

「ダッシュボードに戻る」ボタンを押します。



左サイドバーの認証情報を押します。

APIキー
*****

OAuth2.0 クライアント ID
編集ボタンを押します。

名前
masakinihirota

承認済みの JavaScript 生成元
https://masakinihirota.com

承認済みのリダイレクト URI＜＜＜Supabaseの Callback URL (for OAuth)
*****
を設定します。

「保存」ボタンを押します。

ダウンロードアイコンを押すと

クライアントID
*****

クライアントシークレット
*****

が表示されます。
Supabase側に設定します。

Supabase側に戻って
クライアントIDとクライアント シークレットを登録します。

Supabase側で設定したら 「Save」ボタンを押します。



----------------------------------------

# Slack認証 無料

GitHubと似たような感じで登録できます。

Supabaseのドキュメント Slackのログイン
Login with Slack | Supabase Docs
https://supabase.com/docs/guides/auth/social-login/auth-slack


## Supabaseの Slackを開きます。

左サイドバーのAuthentication
Providers
Slack

Slack enabledをオンにします。

Client ID
*****

Client Secret
*****

Callback URL (for OAuth)
*****



Slack 開発者ダッシュボードを開きます。
Slack API: Applications | Slack
https://api.slack.com/apps
にアクセスし、「Create an app」から新しくアプリを作成します。

ブラウザ内にウィンドウが開きます
クリックFrom scratch

アプリの名前を入力します
masakinihirota

Pick a workspace to develop your app in:
どのアプリに入れるかを選択します。

「Create App」ボタンを押します。

## App Credentials

Slack左サイドバーの
Basic Informationページ

App Credentialsの項目から

App ID
[App ID]
[App ID]


Client ID
*****

Client Secret
*****

Signing Secret
*****

Verification Token
*****

https://api.slack.com/apps/[App ID]/oauth?
Slack 左サイドバーの
OAuth & Permissions
ページを開きます。

Redirect URLｓの項目から
「Add New Redirect URL」ボタンを押します。

SupabaseのSlackの項目の
Callback URL (for OAuth)
https://*****.supabase.co/auth/v1/callback
https://*****.supabase.co/auth/v1/callback
を貼り付けます。

「Save URLs」ボタンを押します。


# Next.js側の実装

pnpm add @supabase/supabase-js @supabase/ui

/libsフォルダを作成し、配下にsupabaseClient.tsファイルを作成します。

supabaseClient.tsを以下のように記述し、Clientを初期化します。



## 参考

Supabase AuthでSlack認証を試してみた | DevelopersIO

https://dev.classmethod.jp/articles/supbase-auth-slack/






#





##





##





----------------------------------------

# ユーザー管理

【Next.js】管理者用ページを Route Groups で実現する
https://zenn.dev/chot/articles/next-layout-for-admin-page

一般ユーザーも閲覧可
/posts
/posts/:postId
/mypage

管理者のみ閲覧可
/dashboard
/settings

管理者かどうか
管理者かどうかチェックする layout.tsx を
Route Groups 直下に設置して、
管理者ページに対応する page.tsx をその Group に配置するだけです。






##





##





----------------------------------------

# 独自ドメインの設定

Vercelで独自ドメインを設定する方法 | YoheiKoブログ
https://yoheiko.com/blog/vercel%E3%81%A7%E3%81%AE%E7%8B%AC%E8%87%AA%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E8%A8%AD%E5%AE%9A/






##





##





----------------------------------------

#

## ファビコン

開発アプリのイメージ色

青系統の色に決める。

RGB	#
0		00
126		7E
254		FE

#007EFE
#007EFE
#007EFE

ファビコンを作り書き換えます。

src\app\favicon.ico





##





##





----------------------------------------

# バックアップ&リストア

を計画する。



----------------------------------------


# Supabaseのバックアップ

supabase db dump

リモートデータベースからコンテンツをダンプします。

ローカルがサーバーとリンクしている必要があります。
supabase linkを実行しておいてください。

このコマンドは
auth
storage
拡張機能
これらによって作成されたスキーマを含めないようにします。



デフォルトでのダンプには、データやカスタムロールは含まれません。

これらのコンテンツを明示的にダンプするには。

--data-only
--role-only

これらのフラグを指定する必要があります。



## サーバーをバックアップ

DBのスキーマはマイグレーション操作で

supabase db push
supabase db pull
コマンドでローカルと同期を取っているはずなので
1のBasic usageは今回は不要です。

2のRole onlyはロールを増やしていないので今回は不要です。

3のData onlyが今回の目的です。

バックアップと言うよりはサーバーデータのダンプをローカルにファイル形式で保存する形になります。

これでローカルとサーバーのデータが同じになり本番環境と同じものがローカルに出来ることになります。

しかし、この方法だとデータが巨大になってきた場合、テキスト形式なのでかなり時間がかかると思われます。



### 基本的な3つの使い方

1. Basic usage

supabase db dump -f supabase/schema.sql

スキーマを出力します。

出力先は↓になります。
supabase\schema.sql

今回の Next.jsアプリ は↓このような出力になりました。

```supabase\schema.sql

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."countries" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."countries" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."countries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."countries_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."countries_id_seq" OWNED BY "public"."countries"."id";

ALTER TABLE ONLY "public"."countries" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."countries_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."countries"
    ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."countries" TO "anon";
GRANT ALL ON TABLE "public"."countries" TO "authenticated";
GRANT ALL ON TABLE "public"."countries" TO "service_role";

GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."countries_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

```



```
Dumping schemas from remote database...
Dumped schema to supabase/schema.sql.

```



2. Role only

supabase db dump -f supabase/roles.sql --role-only

ロールを出力します。

出力先は↓になります。
supabase\roles.sql

今回の Next.jsアプリ は↓このような出力になりました。

```supabase\roles.sql
SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

ALTER ROLE "anon" SET "statement_timeout" TO '3s';

ALTER ROLE "authenticated" SET "statement_timeout" TO '8s';

ALTER ROLE "authenticator" SET "statement_timeout" TO '8s';

RESET ALL;

```



```
Dumping roles from remote database...
Dumped schema to supabase/roles.sql.

```



### 解説

supabase db dump -f supabase/roles.sql --role-onlyは、Supabase CLIが提供するPostgreSQLのダンプツールです。

このコマンドを使用すると、ローカルのデータベースのロール情報をエクスポートすることができます。

以下は、supabase db dumpコマンドの使用方法です。

```
supabase db dump --help
Dumps the database schema and data to a file

Usage:
  supabase db dump [flags]

Flags:
  -d, --data-only Dump only the data, no schema.
  -f, --file string Filename to write to. (default "database.sql")
  -h, --help help for dump
  -r, --schema-only Dump only the schema, no data.
  --db-url string Database URL to connect to.

```

--role-only フラグを使用すると、ロール情報のみをエクスポートすることができます。

-f フラグを使用すると、エクスポートするファイルの名前を指定することができます。

以下は、supabase db dump -f supabase/roles.sql --role-onlyコマンドを使用して、ローカルのデータベースのロール情報をエクスポートする例です。


```
supabase db dump -f supabase/roles.sql --role-only

```

このコマンドを実行すると、supabase/roles.sqlファイルにロール情報がエクスポートされます。



ローカルのデータベースのロール情報

ロールは、PostgreSQLのユーザー/グループアカウントのことを指します。
ロールは、データベースにアクセスするための権限を持ち、データベース内のオブジェクトに対するアクセス権を制御するために使用されます。



ロールには、以下の種類があります。

スーパーユーザー：すべての権限を持つ特別なロール。

データベースロール：データベースにアクセスするための権限を持つロール。
グループロール：他のロールを含むロール。

ロールのメンバーシップ：ロールが他のロールのメンバーであることを示す。

ロール情報をエクスポートすることは、データベースをバックアップするために重要です。

ロール情報を含めることで、データベースを復元する際に、同じロールを再作成することができます。



3. Data only

supabase db dump -f supabase/seed.sql --data-only

データを出力します。

出力先は↓になります。
supabase\seed.sql

今回の Next.jsアプリ は↓このような出力になりました。

```supabase\seed.sql
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."countries" ("id", "name") VALUES
	(1, 'United States'),
	(2, 'Canada'),
	(3, 'Mexico');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."countries_id_seq"', 3, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;

```



```
Dumping data from remote database...
Dumped schema to supabase/seed.sql.

```



これでサーバーのスキーマ、ロール、データをローカルにダンプできました。
これをローカルに反映させます。

実行前にブラウザでローカルのダッシュボードのテーブルを見ておいてください。

supabase db reset

ブラウザでローカルのダッシュボードをリロードすると、サーバー側で登録していた国のデータが挿入されているのが確認できました。



ただし、ダンプファイルはテキスト形式であるため、大量のデータが含まれる場合は、ファイルの読み込みに時間がかかる可能性があります。





















## ローカルをバックアップ

要調査

データベース管理ツール
pgAdmin4	バックアップ機能あり
DBeaver

DBeaverを使用する

postgresql://{ユーザー名:パスワード}@{ホスト名}:{ポート番号}/{DB名}

postgres://postgres:postgres@localhost:5432/postgres

postgresは追記型ですのでバキュームを忘れずに。





# pgAdmin 4 (DBクライアント)

## pgAdmin 4 Download
https://www.pgadmin.org/download/

## pgAdmin 4 インストール

pgAdmin 4 自体のインストール方法はネット上にたくさんあるので省略。

pgAdmin 4 は初めて起動するとき
マスターパスワードを必ず設定する必要がある。
これは Supabase とは関係なく、Pgadmin4 専用の設定。

マスターパスワードを設定する。

## pgAdmin 4からSupabase への接続情報を取得する

`supabase start`
で起動させておく

このコマンドを実行すると

```
> supabase start
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJh**********************************************************ssLNHzTs
service_role key: eyJh**********************************************************AhKpNLAcU

```

※Supabaseでのローカル開発環境の`supabase status`で出力される情報はどのDockerビルドでも同じになる。

この情報は Docker から supabase が立ち上がっているなら
`supabase status`
で再度表示可能。

上記情報の解説
API URL は Web サービスを使用するユーザーがブラウザから Supabase にアクセスする時の出入り口。
DB URL は postgresql クライアントから Supabase に入る時の設定



## DBクライアントの接続設定

### ローカル開発環境への接続設定

設定方法は
pgAdmin 4 はサーバーグループというグループの下に
各サーバーを管理していく。
サーバーグループはデフォルトのまま使用する。

サーバーグループの上で右クリック
作成＞サーバーを選択する

そうすると設定入力画面が出てくるので
2 行目のタブの一般
名称を適当に入力する。

2 行目のタブの接続
下記の通り入力する
![pgadmin supabase 接続.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e9e88864-0ca5-80e8-2bfb-ef1c8c01b4b7.jpeg)

デフォルトではユーザー名、パスワード共に
`postgres`
になっている。

画面通りに入力したら
右下の保存ボタンをクリック。

接続が成功すると
![pgadmin supabase 接続成功後.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2788f2c3-e282-cade-0463-521976bf64e8.jpeg)

と、いろいろ情報が見れるようになる。



### リモートサーバーへの接続設定

つづいてリモートサーバーの設定を行います。
サーバーグループの上で右クリックをして

作成＞サーバー
を選択。
２行目のタブの一般で
名称を入力

２行目のタブの接続で
![リモートサーバー接続設定情報.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9aa41d00-3f0d-4fd8-ed40-f65efd2f0a9a.png)

上記の通り下記に記入する。
SSL Connection の Download Certificate ダウンロードボタンを押して、ファイルを保存する。

![リモートサーバー 接続設定 接続ぼかし.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e8828c35-a459-7598-4a14-699c642e9304.png)

２行目のタブの SSL で
![SSL認証ファイル設定ぼかし.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ec3df025-a42f-11a7-3450-2dd7049446a8.png)

SSL モードを必須にする。
ロール認証にダウンロードしたファイルを指定する。

保存ボタンを押して成功すると、リモートサーバーの情報が色々と見れるようになる。



# DBeaver (DBクライアント)
pgAdmin 4 ではER図を見る機能がついてなかったので、DBeaverを使用することにしました。
DBeaverの接続方法は、


Supabaseのローカルへの接続設定

ターミナルから
` supabase status`で情報が得られる。

```
> supabase status
supabase local development setup is running.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhb*********************************************************************************************************************_I0
service_role key: eyJhb*************************************************************************************************************1IU

```

トップバー
データベース(D)＞新しい接続
PostgreSQLのアイコンを選択

```
Port: 54322
パスワード: postgres
```

この2つの項目を入力後、テスト接続で接続できるか試します。
成功すれば反応が返ってきます。

Supabaseのサーバーへの接続設定

```Server接続データ
Host: 「**********************」 Port: 54322
ユーザー名 postgres
パスワード 「**************」
```
これで左下にある接続テストボタンを押して接続が成功するかどうかを確認します。

## ER図の確認方法
データベース＞postgres＞スキーマ
スキーマを選ぶ
今回の場合はpublicスキーマを選択
テーブル＞テーブル名
ここで右側の領域に移って
ER図タブを選択する

![DBeaver ER図 解説入り.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b8b096aa-44ce-2cdd-41fd-a936953a8352.png)


スキーマはデータベースに作成されるテーブルや関数といったオブジェクトをグループ化するものです。
postgresqlではデータベースを作成すると自動的にpublicと呼ばれる特別なスキーマが作成されます。




















# Supabaseのリストア

データベース管理ツールのバックアップデータからリストアをします。

## サーバーをバックアップデータからリストア

## ローカルをバックアップデータからリストア

バックアップのデータの容量もそれほど大きくはなく、ツールを使うのだったらツールの使い方を調べればいいので、この項目はこれで終了します。

そして、必要になったら調べます。



----------------------------------------
----------------------------------------
----------------------------------------







##





##





----------------------------------------
----------------------------------------
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






----------------------------------------

# Tips

<details><summary>Tips Supabase</summary>
</details>



Supabase
Vercel
等の外部サービスサイトの設定が海外の場合があるので、確認をして日本に変更します。



Supabaseをローカルで動かすと重くなりすぎちゃう問題を解決する【Windows勢向け】
https://zenn.dev/masa5714/articles/3b5ea07c15f159


開発中は使わない機能を切っておくことで、PCが軽くなる場合があります。

例えば、↓リアルタイム、inbucket（メール）、ストレージ
のenabledの項目をfalseで切っておきます。

設定例

```supabase\config.toml
[realtime]
enabled = false

・・・

[inbucket]
enabled = false

・・・

[storage]
enabled = false

```







##





##





----------------------------------------

#

## リポジトリにsrcフォルダの作成

Next.js のインストール時にsrcを選択した時と、しない時の差分の調査 (Next.js 14 App router) #Next.js - Qiita
https://qiita.com/masakinihirota/items/77b52f51a3069c72005f

srcフォルダの下にappフォルダやその他を移動させます。
自分で直接触るコード関連

## srcフォルダを作ります。

```
mkdir src
mkdir src/app

```

フォルダ
app
components
styles
utils
middleware.ts
をsrcフォルダの下に移動させます。

移動させたら、元の/appフォルダ(中身は空)を削除します。

```tailwind.config.js
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

```

↑pathの修正

```tsconfig.json
    "paths": {
      "@/*": ["./src/*"]
    },

```

↑パスエイリアスの修正

```terminal
pnpm run dev

```

srcフォルダの下に移動させた後、
pathが見つからないと警告が出たらその都度修正します。

## pathの修正

後は、自分のコードをsrcフォルダ以下に置くようにします。

pathの
`@/src/`
になってしまった場合は
`@/`
に修正します。

例

```
import { getAuthTypes } from 'utils/auth-helpers/settings';
↓修正
import { getAuthTypes } from '@/utils/auth-helpers/settings';

```

※VSCodeの置換機能を使うと、すぐに終わります。





##





##




----------------------------------------

# 参考

VNS #Qiita-Sync - Qiita

https://qiita.com/masakinihirota/items/b191c5c1e94a0c449fea





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

#





##





##





----------------------------------------
----------------------------------------
