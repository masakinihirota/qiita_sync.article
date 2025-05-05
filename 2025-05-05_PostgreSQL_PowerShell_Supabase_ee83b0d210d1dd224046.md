<!--
title:   Supabaseの宣言型データベーススキーマの実践
tags:    PostgreSQL,PowerShell,Supabase
id:      ee83b0d210d1dd224046
private: false
-->
# 欠点

欠点を最初に書く

マイグレーションファイルを生成するためにSupabaseをいちいちストップさせなきゃいけない、しかも忘れがち。
ストップさせてから差分を取ってマイグレーションファイルを生成するのだが、DBの編集をするのに長く時間がとられる。

Drizzleなら開発時はマイグレーションファイルすら作らず直接DB操作できるのでこっちの方が良い。
マイグレーションファイルを生成することも可能。

----------------------------------------

Drizzleなどは命令形で、マイグレーションが中心です。
宣言型の使いやすさに感動です。

TODO

型

---

# Supabase 宣言型スキーマによるデータベース管理

## はじめに

* Supabaseのサーバーリセット方法

最初に、Supabaseのサーバーのリセット
初期状態にする方法です。

publicスキーマを全削除して、新しくpublicスキーマを作成するだけです。

```SQL Editor
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

```

* マイグレーションファイルの取り扱いに関する教訓

Supabaseで宣言型スキーマを利用している場合、
`supabase/migrations`フォルダ内のマイグレーションファイルをさわらない、簡単に削除しない、もしサーバー側に反映されているマイグレーションファイルがあった場合に削除していると復活させるに苦労した。

## 宣言型スキーマ管理とは？

* 命令型アプローチ（マイグレーションファイル）との比較

従来のデータベース管理では、マイグレーションファイルを使用してデータベースの変更を記述します。これは、データベースの「変更手順」を記述する命令型のアプローチです。一方、宣言型スキーマ管理では、データベースの「最終的な状態」を記述します。

* 宣言型スキーマ管理の概要：データベースの最終的な状態を記述

Supabaseの宣言型スキーマ管理では、SQLファイルでテーブル、ビュー、関数などのデータベースオブジェクトの最終的な状態を宣言します。

* Supabaseにおける宣言型スキーマ管理：SQLファイルによる定義

SQL文がそのまま使えます。

## 宣言型スキーマ管理のメリット

* 可読性の向上
データベースの構造が単一のファイルで明確に定義されるため、理解しやすくなります。
* バージョニング
スキーマファイルをバージョン管理システム（Gitなど）で管理できるため、変更履歴を追跡できます。
* ミスの削減
ツールが自動的にマイグレーションファイルを生成するため、手動でのミスが減ります。
* 開発の効率化
データベースの変更が容易になるため、開発速度が向上します。

* `supabase db diff` コマンドによるマイグレーションファイルの自動生成
開発者はマイグレーションファイルを編集する必要はありません。
`supabase db diff` を実行すると、
マイグレーションフォルダが`supabase/`フォルダの下になくても
マイグレーションフォルダーとその下にマイグレーションファイルが自動的に生成されます。
Supabaseがよしなにしてくれます。
※エラーなどをチェックする場合などを除く、👇️既知の問題点があります。

👇既知の問題点を御覧ください。

Declarative database schemas | Supabase Docs

https://supabase.com/docs/guides/local-development/declarative-database-schemas#known-caveats

* マイグレーションファイルのフォーマット

`supabase/migrations/[タイムスタンプ]_[スキーマファイルのファイル名].sql`

---

# 宣言型スキーマ利用の基本的な流れ

1.  Supabaseを止める

```terminal
supabase stop

```

※このSupabaseの止め忘れが多いです。

2.  スキーマファイルを作成、編集する

`supabase/schemas/`フォルダを作って、この下に👇スキーマファイル(table.sql)を作ります。
スキーマファイルとは、内容がDBのテーブルなどを書いたSQL文のファイルです。
拡張子は、`スキーマファイル名.sql` です。

```
supabase
├── migrations
│   └── 20250505063458_root.sql
├── schemas
│   └── table.sql
├── config.toml
└── seed.sql

```

スキーマファイルは親、子、孫の入れ子構造に出来ます。

```
supabase
├── migrations
│   └── 20250505063458_root.sql
├── schemas
│   ├── production
│   │   ├── 1-table.sql
│   │   ├── 2-rls.sql
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   └── trigger.sql
│   ├── user
│   │   ├── _table.sql
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   ├── rls.sql
│   │   └── trigger.sql
│   ├── common.sql
│   ├── root_account.ts
│   └── table.sql
├── config.toml
└── seed.sql

```

3.  Supabaseの差分を取る（`supabase db diff -f [スキーマファイル名]`）

作成、編集したスキーマファイルと、今現在のSupabase内のテーブルなどの差分を取りマイグレーションファイルを作成します。

```terminal
supabase db diff -f [スキーマファイル名(マイグレーションのファイル名になります)]

#  実行例
supabase db diff -f test
Creating local database from declarative schemas:
 • supabase\schemas\common.sql
 • supabase\schemas\production\function.sql
 • supabase\schemas\production\policy.sql
 • supabase\schemas\production\table.sql
 • supabase\schemas\production\trigger.sql
 • supabase\schemas\root_account\table.sql
 • supabase\schemas\user\function.sql
 • supabase\schemas\user\policy.sql
 • supabase\schemas\user\table.sql
 • supabase\schemas\user\trigger.sql
Initialising schema...

```

👆このコマンドで、マイグレーションファイル(＝中身はSQL文ファイル)が作成されます。
複数の入れ子フォルダ構造でもスキーマファイルを読み込みます。
SQL文内にエラーがあると実行が中止されます。

4.  Supabaseを起動してマイグレーションを適用する。

```terminal
supabase start && supabase migration up
# or
supabase db reset

```

`supabase db reset`と`supabase migration up`の違い

* supabase db reset

データベースを完全にリセットし、最初から「すべてのマイグレーションを適用」します。
開発中にデータベースの状態をリセットしたい場合に使用します。

このコマンドは、マイグレーションファイルにスキーマがきちんと適用されているかのチェック機能としても使えます。

`supabase db reset` を実行して、新しいマイグレーションがエラーを発生しないことを確認してください。

シードファイル(`supabase/seed.sql`)があるならそれも読み込みます。

※データがすべて削除されます。本番環境では絶対に使用しないでください。
開発環境でスキーマやマイグレーションをテストする際に非常に便利です。

* supabase migration up

supabase db diff で差分を取った時に新しいマイグレーションファイルが生成されます。
その「新しく生成されたマイグレーションファイルを適用」します。

5.  ダッシュボードの確認

※ダッシュボードに反映されてない時

ダッシュボード

http://localhost:54323/project/default

ブラウザをリロードしてみてください。

以上で基本的な使い方は終了です。

---

# Supabaseの宣言型データベーススキーマの実践

Next.jsとSupabase UI Libraryを用いたOAuth認証を作成します。

## 技術スタック

Windows
PowerShell
Next.js
Supabase
Supabase UI Library

### ソーシャルログインの実装

Supabase UI Libraryを利用します。

* 👇ソーシャルログインの実装

Social Authentication

https://supabase.com/ui/docs/nextjs/social-auth

```terminal
pnpm dlx shadcn@latest add https://supabase.com/ui/r/social-auth-nextjs.json

```

* 環境変数の設定

```.env
NEXT_PUBLIC_SUPABASE_URL="*****"
NEXT_PUBLIC_SUPABASE_ANON_KEY="*****"

```

* Supabase CLIの初期化

```terminal
supabase init

```

* OAuth認証のID、シークレットキーの取得

他にも、リダイレクトURLの設定等を行っておきます。
詳細は各自で調べてください。


以前は認証を実装する方が長くかかりましたが、
今や認証を実装するよりも、各OAuth認証のidやシークレットキーを取得する時間の方が長くかかります。

ここまでで、Next.jsとDockerでSupabaseを立ち上げログインできるところまで確認します。



# 認証機能の実装（Google, GitHub, 匿名認証）

自分は
Google認証
GitHub認証
匿名認証
を動かすまでやりました。

👇このリポジトリは、認証のみです。
Supabaseの宣言型データベーススキーマはまだ採用していない状態です。

参考リポジトリ
masakinihirota/vns-masakinihirota-template

https://github.com/masakinihirota/vns-masakinihirota-template

👆この `config.toml`を参考に設定を行います。

他に
`.env.example`
`.env.local.example`
を参考にしてください。

---

## マイグレーション操作

参考
https://qiita.com/masakinihirota/items/685f70770d8224ba2fa5#supabase-db-remote-commit

## supabase migration list コマンド

```terminal
supabase migration list

   Local               | Remote               | Time (UTC)
  ---------------|----------------|---------------------
                          | 20250424163940 | 2025-04-24 16:39:40
   20250504163720 |                        | 2025-05-04 16:37:20

```

👆左はローカルのマイグレーションのタイムスタンプ
👆中央はサーバーのマイグレーションのタイムスタンプ
👆右は時間

左は`supabase/migrations`フォルダに入っているマイグレーションのファイルです。
中央はサーバー側で適用されているマイグレーションです。

左は単なるローカルのファイルなのでコマンドは使わず直接削除したりすることが可能です。
※サーバーに適用したマイグレーションファイルを削除しないでください。
専用コマンドを利用してください。
※削除した場合は`supabase migration up`コマンドなどで反映させておく必要があります。

問題はサーバーのマイグレーションです。
これを操作するのは専用のコマンドがあります。

サーバー側のマイグレーションは Supabase CLIで操作します。
ローカル側は`supabase/migrations`フォルダ内のマイグレーションファイルのタイムスタンプです。

### 重要な注意事項

このコマンドはローカル側から見たマイグレーションの状態です。
`supabase db pull` していない場合など、サーバーの状況は反映されていません。

例えば、サーバ側のSupabaseをブラウザ上のGUIでテーブルを作ったり、RLSを編集しても、pullしていない限りサーバーの正確な状況は反映されていません。

サーバー側でテーブルなどを編集した場合は、この👇コマンド `db pullコマンド` を実行して、サーバー側の変更をローカル側にも反映させておきましょう。

```terminal
supabase db pull

```

### `reverted` コマンド

サーバー側のマイグレーションを削除したい。

```terminal
supabase migration list

   Local               | Remote               | Time (UTC)
  ---------------|----------------|---------------------
                          | 20250424163940 | 2025-04-24 16:39:40
   20250504163720 |                        | 2025-05-04 16:37:20

```

中央のサーバーのマイグレーションを👆リストから削除したい場合に使います。
サーバー側のマイグレーションを操作します。

```terminal
supabase migration repair --status reverted [タイムスタンプ]
supabase migration repair --status reverted 20250424163940

```

を実行すると

```terminal
supabase migration list

   Local               | Remote               | Time (UTC)
  ---------------|----------------|---------------------
   20250504163720 |                        | 2025-05-04 16:37:20

```

サーバー側のマイグレーションが削除されます。

### `applied` コマンド

ローカルのマイグレーションをサーバー側に反映させたい。
これは一つ一つ反映させたい等、細かい操作をしたい時に必要です。

まとめて反映させたい時は `supabase migration up`コマンドがあります。

```terminal
supabase migration list

   Local               | Remote               | Time (UTC)
  ---------------|----------------|---------------------
   20250504163720 |                        | 2025-05-04 16:37:20

```

👆リストのローカルのマイグレーションをサーバー側にも反映させたい場合に使います。

サーバー側のマイグレーションを操作します。


```terminal
supabase migration repair --status applied [タイムスタンプ]
supabase migration repair --status applied 20250504163720

```

を実行すると

```terminal
supabase migration list

   Local               | Remote               | Time (UTC)
  ---------------|----------------|---------------------
   20250504163720 | 20250504163720  | 2025-05-04 16:37:20

```

👆サーバー側にローカルのマイグレーションが反映されます。



### ローカル側のみのマイグレーション

```terminal
supabase migration list

   Local                 | Remote | Time (UTC)
  ----------------|--------|---------------------
   20250504163720 |              | 2025-05-04 16:37:20

```

これは `supabase/migrations`フォルダ内にある `タイムスタンプ 20250504163720_***.sql` ファイルを削除すれば消せます。

```terminal
supabase migration list

   Local | Remote | Time (UTC)
  -------|--------|------------

```

削除後、👆このように消えます。

削除した後は、
Supabaseを停止して
新たにスキーマファイルからマイグレーションファイルを「生成してから」、
Supabaseを起動して
`supabase migration up`コマンドを実行してください。

---

# Supabaseの宣言型データベーススキーマを利用してみよう

基本的に、Supabaseの宣言型データベーススキーマをローカルで開発をしてサーバーにpushする方式で利用しています。

この記事では、最終的にGoogle認証やGitHub認証、匿名認証で取得したユーザーデータを、Publicスキーマにコピーするまでを行います。

1.  ローカルSupabaseを停止

```terminal
supabase stop

```

最初にローカルのSupabaseを停止させておきます。(重要)
※何度も停止させ忘れてスキーマファイルが適用できないと気づいていから停止する羽目になりました。

2.  必要に応じて `supabase/migrations/*` を削除

必要ならば
`supabase/migrations/*`
の中の全ファイルを削除します。
サーバーに適用したマイグレーションファイルがある場合は、専用コマンドを実行するか、サーバーのスキーマをリセット('supabase db reset')してください。

OAuth認証で認証した`auth.users`テーブルにあるデータをpublicスキーマのユーザー用テーブルにコピーします。
今回のユーザー用テーブルは `root_account` とします。

※簡単に削除しないようにしましょう。もし削除するならDockerのvolumeファイルも全部削除する覚悟で削除しましょう。ローカルとサーバーとマイグレーションの未適用と適用済みのファイルが時系列で混在していると人間には復活は不可能ではと思います。
ただ、スキーマファイルさえあれば、スキーマの復活は簡単です。
しかし入力されたデータはバックアップを取っておかないと全滅です。

3.  スキーマファイルの作成

場所はsupabaseをインストールした
`supabase/schemas/*`
に作成します。

👇root_accountスキーマファイルを作成します。
`supabase/schemas/root_account.sql`

例

```root_account.sql
CREATE TABLE IF NOT EXISTS public.root_account (
  id UUID PRIMARY KEY,
  aud TEXT,
  role TEXT,
  email TEXT UNIQUE,
  email_confirmed_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ,
  raw_app_meta_data JSONB,
  raw_user_meta_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

```

※テーブル名の規則として、「Supabaseはスネークケースでテーブル名を作成」します。
※OAuth認証で利用されているカラムから`root_account`テーブルにコピーするカラムを選択しています。

その他 スキーマファイル例

```1-table.sql
create table "production" (
  "id" uuid primary key not null,
  "created_at" timestamptz default now() not null,
  "updated_at" timestamptz
);

```



```user/table.sql
create table "user" (
  "id" uuid primary key not null,
  "created_at" timestamptz default now() not null,
  "updated_at" timestamptz,
  "email" varchar(255) unique not null,
  "password" varchar(255) not null
);

```




4.  マイグレーションファイルの作成

ローカルのSupabaseが停止していることを確認して
マイグレーションファイルを作成します。

```terminal
supabase db diff -f [マイグレーションのファイル名]

# 例
supabase db diff -f create_root_account_table

```

`supabase/migrations/`フォルダにマイグレーションファイルが作成されます。

```
supabase
├── migrations
│   ├── 20250503183643_create_root_account_table.sql
│   └── 20250503184843_add_new_edit.sql
├── schemas
│   └── root_account.sql
└── config.toml

```

5.  Supabaseの起動とマイグレーションの適用

```terminal
supabase start && supabase migration up
# or
supabase db reset

```

6.  ダッシュボードでの確認

http://localhost:54323/project/default/editor

を確認すると `root_account`テーブルが作成されているのが確認できます。

`root_account`を選択して、右下にある Definitionタブを選ぶと
テーブルのSQL文が表示されます。

これでSupabaseの宣言型データベーススキーマによるテーブルの作成は完成です。

# スキーマの変更のデプロイ

ローカルの編集結果を、サーバー側のリモートプロジェクトに反映させます。

```terminal
# Supabase CLIにloginする。
supabase login

# リモートプロジェクトをlinkする。
# 開発が一定ラインに進むまでlinkはしないほうが良い
supabase link

# リモートプロジェクトに変更をpushする。
supabase db push

```

# 依存関係の管理

宣言型スキーマを使えば、管理は非常にシンプルになります。
スキーマファイルはデフォルトで辞書式順序で実行されます。

* スキーマファイルの実行順序(重要)


複数のテーブル間に外部キーがある場合、「親テーブルを先に作成する必要がある」ため、順番が大切です。

ファイル名による辞書式順序がデフォルトです。

* `config.toml` による実行順序の指定

設定ファイルを使えば順番を宣言できます。

例

```
supabase
├── migrations
│   ├── 20250503183643_create_root_account_table.sql
│   └── 20250503184843_add_new_edit.sql
├── schemas
│   ├── AAAAA.sql
│   ├── BBBBB.sql
│   ├── CCCCC.sql
│   ├── DDDDD.sql
│   └── root_account.sql
└── config.toml

```

👆こんな感じで親テーブルがroot_accountに書いてある場合、設定がないと辞書順に読み込まれてしまいます。

読み込み順を設定するために、
👇設定ファイル `config.toml` に追記します。

```config.toml
[db.migrations]
schema_paths = [
  "./schemas/[優先したいスキーマファイル名].sql",
  "./schemas/root_account.sql",
  "./schemas/*.sql",
]

```

「*」ワイルドカードが使えます。

## 本番環境のスキーマを取得する

開発途中から、Supabaseの宣言的スキーマを導入する場合

👇このコマンドを実行して本番環境のスキーマを取得します。

```terminal
supabase db dump > supabase/schemas/prod.sql

```

取得した後は、各自でスキーマを小さなファイルに分割し、マイグレーションを生成できます。これを一度に行うことも、スキーマに変更を加えながら段階的に行うこともできます。

## スキーマ変更のロールバック

## スキーマ変更のロールバック

開発中は、新しいスキーマの変更を単一のマイグレーションファイルに保存するために、マイグレーションをロールバックする必要がある場合があります。

これは、ローカルデータベースを以前のバージョンにリセットすることで実行できます。

Supabaseが立ち上がっていることを確認してから

```terminal
# 立ち上がっているのを確認
supabase status

# db reset コマンド
supabase db reset --version [タイムスタンプ]
supabase db reset --version 20250503183643

```

👆ダウンマイグレーション、マイグレーションファイルのタイムスタンプを指定します。

👇Supabaseのダッシュボードを確認してください。
データベースのテーブルスキーマが以前の状態になって、
Supabaseに反映されているはずです。

Default Project | Default Organization | Supabase

http://localhost:54323/project/default/editor

※注意:スキーマファイルの方は元に戻っていないので元の状態に戻しておきます。

そして、既に本番環境にデプロイされているバージョンはリセットしないでください。

## すでにデプロイ済みのマイグレーションをロールバックする必要がある場合

最初に、バックアップを取っておきます。

ロールバック、変更前にバックアップしたデータのリストアを試しておいてください。

次に、スキーマファイルの変更を元に戻します。

その後、ダウンマイグレーションを含む新しいマイグレーションファイルを生成できます。
これにより、本番環境へのマイグレーションが常にロールフォワードされることが保証されます。

ダウンマイグレーションで生成されるSQL文は破壊的内容を含みます。
これらを実行する場合注意深く確認をしてください。

その他に関してはドキュメントをご覧ください。


---

## トリガーとトリガー関数は使えますか？

はい使えます、
トリガーはデフォルトでは、 `supabase db diff` コマンドは public スキーマを参照します。

ただし、そのトリガーが `auth` などの別のスキーマにある場合は、`-s auth` のようにスキーマを指定する必要があります。

別のスキーマのトリガーは `-s [スキーマ名]` のオプションを追加します。

`supabase db diff` はデフォルトで `public` スキーマを参照

## 列の名前を変更したり、データ型を変更したりするには？

まず、変更されたスキーマからマイグレーションファイルを生成して、すべてが反映されるかどうかを確認します。

## GUIでテーブルを変更したり、ファイルからテーブルを変更したりしてると、ファイルが増えて大変です。それにリモートやローカル、GUIとファイルで違いが出てきて差分の心配とかエラーとかになりませんか？

👇このコマンドで、サーバーのスキーマをローカルファイルにプルダウンできます。
※サーバーのSupabaseと Linkさせておいてください。
開発が一定ラインに進むまでlinkはしないほうが良い

`supabase db dump > supabase/schemas/prod.sql`

これを自分の好きなように分割したりして利用したり出来ます。

* ローカルの場合

--local オプションを付けます。

* サーバーの場合

--linked オプションを付けます。

👇を参考にしてください。

Declarative database schemas | Supabase Docs

https://supabase.com/docs/guides/local-development/declarative-database-schemas#pulling-in-your-production-schema

## 詳細な権限の変更

alterステートメント
挿入、削除、更新コマンドのようにデータ自体を変更するステートメント
これらは宣言型データベーススキーマでは認識されません。
そのために警告が表示される場合があります。

---

## ポリシー（RLS、カラムレベルセキュリティ）

RLSはSQL文に過ぎません、やり方は宣言スキーマとほぼ同じです。

1.  Supabaseを停止

`supabase stop`

※スキーマファイルを編集したら、適用させるために必ずSupabaseを一旦停止させましょう。(何度も忘れます。)
Supabaseを停止させないとスキーマファイルが反映されないので、エラーかな？と勘違いします。

2.  スキーマファイルを編集

RLS定義
`schema.sql`, `policy.sql`, `rls.sql` 等のファイルを用意します。
テーブルのSQL文と同じ場所に書いても大丈夫です。

```schema.sql、policy.sql、rls.sql
create policy "All root_account are public"
on root_account for select
using (true);

```

3.  `config.toml` によるスキーマファイルの読み込み順序の制御

RLSを設定するには、そのためのテーブルが必要です。
なのでテーブルを読み込む順番を制御する必要があります。

テーブルよりも前にRLSのルールのSQL文を読み込むような場合、存在しないとエラーが出ます。
読み込む優先順位を指定しましょう。

👇[db.migrations]はデフォルトだと48行目あたり。

`config.toml`の設定ファイルに読み込ませたいスキーマファイルを全部指定します。

```config.toml
[db.migrations]
schema_paths = [
    "./schemas/production/table.sql",
    "./schemas/production/rls.sql",
    "./schemas/user/table.sql",
    "./schemas/user/rls.sql",
    "./schemas/root_account/table.sql",
    "./schemas/root_account/policy.sql",
    "./schemas/*.sql",
]

```

4.  差分を取ってマイグレーションファイルを生成

`supabase db diff -f [*****]`

例

```terminal
supabase db diff -f rls

```

5.  Supabaseを起動してマイグレーションを適用

```terminal
supabase start && supabase migration up
# or
supabase db reset

```

ダッシュボードで確認できます。

以上で終了です。



## 辞書順をファイル側でいじった方法

優先順位を高くしたいファイル名の先頭に「_」アンダーバー記号などを付けて対応しています。

フォルダ構造

辞書順(A-Z)だと

```
policy.sql
rls.sql
table.sql

```

なので

```
_table.sql
policy.sql
rls.sql
や
1-table.sql
2-rls.sql
policy.sql

```

👆このように、優先順位を高くしたいファイル名の前に「_」記号等を付けています。
数字などの工夫でもSupabaseは読み込んでくれます。

_table.sql

```
supabase
├── migrations
│   └── 20250504094848_schema3.sql
├── schemas
│   ├── production
│   │   ├── 1-table.sql
│   │   ├── 2-rls.sql
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   └── trigger.sql
│   ├── root_account
│   │   ├── _table.sql
│   │   └── policy.sql
│   ├── user
│   │   ├── _table.sql
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   ├── rls.sql
│   │   └── trigger.sql
│   └── common.sql
├── .gitignore
└── config.toml

```

👆この方法だと、設定ファイル側での管理をする必要がありません。なので優先順位を👇未設定でも大丈夫です。

```config.toml
[db.migrations]
schema_paths = []

```

共通のスキーマファイルの優先順位を決めたい時等には利用します。

```config.toml
[db.migrations]
schema_paths = [
    "./schemas/common.sql",
    "./schemas/production/*.sql",
    "./schemas/user/*.sql",
    "./schemas/root_account/*.sql",
    "./schemas/*.sql",
]

```

👆テーブルや、機能単位でSQL文を利用する時に便利です。



```
supabase
├── migrations
│   └── 20250505063458_root.sql
├── schemas
│   ├── production
│   │   ├── 1-table.sql
│   │   ├── 2-rls.sql
│   │   └── 3-function.sql
│   ├── root_account
│   │   ├── 1-root_account.sql
│   │   ├── 2-rls.sql
│   │   └── 3-function.sql
│   ├── user
│   │   ├── 1-table.sql
│   │   ├── 2-rls.sql
│   │   └── 3-function.sql
│   └── common.sql
├── .gitignore
├── config.toml
└── seed.sql

```

👆️テーブル単位、機能単位などでテーブル構造の優先順位を直感的に決められます。


## ワイルドカードによる重複読み込み

```
    "./schemas/*.sql",
    "./schemas/*/*.sql",
```

例えば👆このように設定すると、「*」ワイルドカードの効果で、同じスキーマファイルを複数回読み込んでしまします。
スキーマファイルが重複して読み込まれないように修正してください。

ワイルドカードの使用を避け、必要なファイルを明示的に、かつ正しい順序で指定してください。

スキーマファイルが用意できたら、`supabase db diff -f [スキーマファイル]`コマンドを実行しています。
マイグレーションファイルが作成されます。
中を覗いてみます。(エラーが出てないなら必要ありませんが)

例

```[タイムスタンプ]_schema.sql
...
create policy "All production are public"
on "public"."production"
as permissive
for select
to public
using (true);


create policy "All root_account are public"
on "public"."root_account"
as permissive
for select
to public
using (true);


create policy "All user are public"
on "public"."user"
as permissive
for select
to public
using (true);
...

```

こんな感じでマイグレーションファイルが生成されます。

# Tips

```user/rls.sql
-- userはPostgreSQLの予約名なのでテーブル名に使用する場合は「""」で囲む必要があります。
create policy "All user are public"
on "user" for select
using (true);

```

## Policyの適用の確認

RLS等を有効化しておく必要があります。

Supabaseのダッシュボードのポリシー画面
AuthenticationのPoliciesメニューを選択します。

Authentication | Supabase

http://localhost:54323/project/default/auth/policies

RLSが有効かどうか等が見れます。

開発初期はRLSを有効化せずに、安定してきたらRLSを有効化しましょう。


## フォルダ単位で管理する

1.
`supabase/scheme/[テーブル名]/`フォルダの下に、[テーブル名]エンティティのスキーマ定義ファイルを置きます。

`supabase/scheme/[テーブル名]/table.sql`
`supabase/scheme/[テーブル名]/trigger.sql`
`supabase/scheme/[テーブル名]/view.sql`
`supabase/scheme/[テーブル名]/function.sql`
`supabase/scheme/[テーブル名]/policy.sql`

* 例

```
supabase
├── migrations
│   ├── 20250503183643_create_root_account_table.sql
│   └── 20250503184843_add_new_edit.sql
├── schemas
│   ├── production
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   ├── table.sql
│   │   ├── trigger.sql
│   │   └── view.sql
│   ├── user
│   │   ├── function.sql
│   │   ├── policy.sql
│   │   ├── table.sql
│   │   ├── trigger.sql
│   │   └── view.sql
│   ├── prod.sql
│   └── root_account.sql
└── config.toml

```

2.
`supabase/schemas/[スキーマ名]/[テーブル名]/` フォルダの下に、[テーブル名]エンティティのスキーマ定義ファイルを置きます。

supabase/schemas/[スキーマ名]/[テーブル名]/table.sql
supabase/schemas/[スキーマ名]/[テーブル名]/trigger.sql
supabase/schemas/[スキーマ名]/[テーブル名]/function.sql
supabase/schemas/[スキーマ名]/[テーブル名]/policy.sql
supabase/schemas/[スキーマ名]/[テーブル名]/view.sql

```
supabase
├── migrations
│   ├── 20250503183643_create_root_account_table.sql
│   └── 20250503184843_add_new_edit.sql
├── schemas
│   ├── production
│   │   ├── user_profiles
│   │   │   ├── function.sql
│   │   │   ├── policy.sql
│   │   │   ├── table.sql
│   │   │   └── trigger.sql
│   │   ├── products
│   │   │   ├── function.sql
│   │   │   ├── policy.sql
│   │   │   ├── table.sql
│   │   │   └── trigger.sql
│   │   ├── dashboard_view.sql
│   │   └── public.sql
│   ├── public
│   │   └── countries
│   │       ├── table.sql
│   │       └── policy.sql
│   └── config.toml

```


### スキーマ定義ファイル

* テーブル定義ファイル (table.sql): テーブルの構造（カラム名、データ型、制約など）をSQLやSupabase CLIの構文で記述したファイル。

* トリガー定義ファイル (trigger.sql): 特定のイベントが発生した際に自動的に実行される処理（トリガー）を定義したファイル。

* 関数定義ファイル (function.sql): データベース内で実行できるカスタム関数を定義したファイル。

* ポリシー定義ファイル (policy.sql): データのアクセス制御ルール（誰がどのデータに対してどのような操作を行えるか）を定義したファイル。Row Level Security (RLS) などを設定します。

* ビュー定義ファイル (view.sql): 仮想的なテーブルであるビューの定義を記述したファイル。複数のテーブルを結合したり、特定のカラムだけを表示したりする際に便利です。
## フォルダ名の設定

例

`supabase/scheme/[テーブル名]/`
`supabase/scheme/[スキーマ名.テーブル名]/`
`supabase/scheme/[public.テーブル名]/`
`supabase/scheme/[auth.テーブル名]/`

`supabase/schemas/[スキーマ名]/[テーブル名]/`
`supabase/schemas/[スキーマ名]/[ビュー名]/`
`supabase/schemas/public/[テーブル名]/`
`supabase/schemas/auth/[テーブル名]/`

## 共有スキーマ

共有スキーマは、複数のスキーマやテーブルで共通して利用するオブジェクト（関数、トリガー、型など）を定義するための特別なスキーマです。
Supabaseのプロジェクトにおいて、コードの再利用性を高め、管理を効率化するために役立ちます。


### 共有スキーマファイルの例

1.
`common.sql`
ファイルを作成します。

```common.sql
CREATE SCHEMA common;

```

2. オブジェクトの定義: 作成した共有スキーマの中に、共通して利用したい関数、トリガー、型などを定義します。
例えば、common.sql ファイルにこれらの定義を記述します。

3. 他のスキーマからの利用: 他のスキーマにあるテーブルや関数から、共有スキーマ内のオブジェクトを参照できます。
参照する際には、オブジェクト名をスキーマ名で修飾する必要があります。


```common.sql
-- publicスキーマのテーブルから commonスキーマの関数を呼び出す例
SELECT common.my_shared_function(column1) FROM public.my_table;

```

4. 共有スキーマの中身の例


* updated_at/created_at トリガー

多くのテーブルで共通して使用する、レコードの作成日時や更新日時を自動的に設定するトリガー関数とそのトリガー定義。



```common.sql
CREATE OR REPLACE FUNCTION common.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```



```public.users
-- public.users テーブルにトリガーを設定する例 (別のマイグレーションファイルなど)
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION common.set_updated_at();

```



* 拡張機能の有効化

uuid-ossp などのPostgreSQLの拡張機能を有効化する処理。これにより、複数のスキーマでUUID関数などを利用できるようになります。

```common.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

```

* カスタムデータ型

複数のテーブルで共通して使用するカスタムのデータ型（ENUM型など）。

```common.sql
CREATE TYPE common.status_enum AS ENUM ('active', 'inactive', 'pending');

```

* 共通関数

複数のテーブルや関数から利用されるユーティリティ関数。
例えば、データのフォーマット処理やバリデーション処理などを行う関数。

```common.sql
CREATE OR REPLACE FUNCTION common.format_date(timestamp with time zone)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char($1, 'YYYY-MM-DD HH24:MI:SS');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

```

共有化すると良いもの(これはAIの推奨)

* 監査ログ関連の機能: レコードの変更履歴を記録するトリガーや関数。
* ソフトデリート関連の機能: レコードを物理的に削除せず、論理的に削除するためのカラムやトリガー、関数。
* 汎用的なバリデーション関数: メールアドレスの形式チェック、文字列の長さ制限など、複数のテーブルで使用する可能性のあるバリデーション処理。
* ID生成ルール: UUIDの生成など、一貫したID生成方法を提供する関数。
* 地理空間情報関連の関数: 距離計算など、地理空間データを扱う場合に共通して使用する関数（PostGIS拡張機能と組み合わせて）。



設定ファイル

`common.sql`ファイルを最初に読み込むように設定します。

```config.toml
[db.migrations]
schema_paths = [
  "./schemas/common.sql",
  "./schemas/root_account.sql",
  "./schemas/*.sql",
]

```



## 関数本体の構文チェックの無効化

`SET check_function_bodies = off;`

PostgreSQLの関数は複雑になることがあり、複数の異なるテーブルに依存する場合や、テーブル同士が相互に依存することもあります。

PostgreSQLで関数を定義する際、デフォルトでは関数本体の構文チェックが行われます。
しかし、複雑な関数や、まだ存在しないテーブルや関数に依存する関数を定義しようとすると、このチェックがエラーを引き起こすことがあります。

`SET check_function_bodies = off;` を実行することで、その後の関数定義における構文チェックを一時的に無効化できます。
これにより、依存関係がまだ解決されていない状態でも関数を定義できるようになります。

共有スキーマを最初に読み込む際にこの設定を行うのは、共有スキーマ内で定義される関数が、他のスキーマのテーブルや関数に依存している可能性があるためです。
最初に構文チェックをオフにしておくことで、依存関係によるエラーを回避し、スムーズにスキーマ定義を進めることができます。

共有スキーマを活用することで、Supabaseプロジェクトの保守性、拡張性、そして開発効率を大きく向上させることができます。
ぜひ、プロジェクトの規模や要件に合わせて、共有スキーマの導入をしてみてください。

複数の親、子、孫テーブルが複雑に絡み合った既存テーブルを再利用する時に有効です。

---

一応、宣言的スキーマの利用方は理解できました。
次に従来の目的である、このスキルを用いて認証済みユーザーデータのコピーを実施します。

# トリガー編

トリガーとトリガー関数

認証時にユーザーデータをコピーするスキーマ、トリガー、トリガー関数を設定します。

関数の定義は常に上書きするようにします。

Supabaseの`auth.users`テーブルには、ユーザーの認証情報（メールアドレス、パスワードなど）が格納されます。
セキュリティ上の理由から、このテーブルのデータをアプリケーションで直接使用するのは推奨されません。

代わりに、`auth.users`テーブルから必要なデータを別のテーブル(`root_account`)にコピーし、アプリケーションではそのテーブルを使用します。

## 認証済みユーザーデータのコピー

👇このドキュメントを実践して、ついでに認証済みユーザーデータのコピーを実施します。

Declarative database schemas | Supabase Docs

https://supabase.com/docs/guides/local-development/declarative-database-schemas

認証済みユーザーデータのコピー

User Management | Supabase Docs

https://supabase.com/docs/guides/auth/managing-user-data

Supabaseの宣言型データベーススキーマと
そのスキーマの実際の使用方法
auth.usersテーブルをpublicスキーマのテーブル(root_account)として作成し、必要なデータをコピーします。

これをする目的は
認証用のテーブル(auth.users)と
Webアプリ用のテーブル(public.root_account)
の役割をそれぞれ分担させることにあります。

この記事では開発用のDockerを立ち上げ、ローカルで動作確認をしています。

## トリガー関数の作成

`auth.users`テーブルの変更を監視し、`public.root_account`テーブルにデータを同期するためのトリガー関数を作成します。

```trigger.sql
-- トリガー関数の作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.root_account (id, aud, role, email, email_confirmed_at, last_sign_in_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
  VALUES (NEW.id, NEW.aud, NEW.role, NEW.email, NEW.email_confirmed_at, NEW.last_sign_in_at, NEW.created_at, NEW.updated_at, NEW.raw_app_meta_data, NEW.raw_user_meta_data);
  RETURN NEW;
END;
$$;

```

## トリガーの作成

`auth.users`テーブルにトリガーを設定し、上記の関数を呼び出すようにします。

マイグレーションからはトリガーはauthスキーマに設定できません。

ちょっとしたテクニック(回避策)で
シードファイル`supabase/seed.sql`に書いておきます。

```seed.sql
-- トリガーの作成
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

```

※通常のマイグレーションファイルからはauthスキーマにトリガーは設定できません。(👇確認するのに苦労した)

Migrations do not allow `auth.users` triggers · Issue #120 · supabase/cli

https://github.com/supabase/cli/issues/120

### トラブルシューティング

* ユーザーデータがコピーされない場合の確認方法

SQL Editor での直接実行、適当な項目を選んでダイレクトにSQL文を実行してみます。

```sql
INSERT INTO public.profiles (id, aud, role)
VALUES (
  gen_random_uuid(), -- UUIDを自動生成
  'aud-value',
  'role-value'
);

```

👆(id, aud, role) が public.profilesに入れたいカラム名
👆VALUES () が新しくできたユーザーの実データ。
を設定します。

---

# Tips：PowerShell エイリアスコマンド

* Supabase CLI のよく使うコマンドのエイリアス設定例

PowerShellのエイリアスコマンド

`package.json` に登録してもいですが、Supabase等の全プロダクト共通のツールとして、共通コマンドを利用したい場合はこちらの方を利用したほうが良いです。

```Microsoft.PowerShell_profile.ps1
#----------------------------------------
#- supabase
#----------------------------------------
# supabase開始
function sss
{
    supabase start
}

function ssss
{
    supabase start && supabase migration up
}

# supabase停止
function xxx
{
    supabase stop
}

function xxx-xxx
{
    supabase stop --no-backup
}

function re
{
	supabase db reset $w
}

```

※`supabase stop --no-backup` を使用すると、supabase のローカル プロジェクト データがすべて削除されるため、注意して使用してください。

※オプションがない `supabase stop`は自動的にバックアップをします。

## まとめ

使いやすさの点では、どちらのツールも同じくらい便利です。
ただ、Supabaseのデータベースの設計情報を変更した場合、その変更を実際に反映させるためには、ちょっとした再起動などの作業が必要に時間をかなり使います。

この点においては、Drizzleの方がスムーズに設定変更できるので、Supabaseよりも一歩リードしていると言えますね。

Prizma？知りません

---

# DrizzleとSupabaseの宣言型データベーススキーマの共存？

型情報が欲しい時

軽くお試しでテーブルなどを編集したい時

マイグレーションファイルに記録しておく必要がない時

