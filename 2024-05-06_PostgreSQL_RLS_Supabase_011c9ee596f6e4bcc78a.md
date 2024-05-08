<!--
title:   RLS(Row Level Security)入門ガイド Supabase(Postgres)データセキュリティの基礎
tags:    PostgreSQL,RLS,Supabase
id:      011c9ee596f6e4bcc78a
private: false
-->
<!--
title:   RLS(Row Level Security)入門ガイド Supabase(Postgres)データセキュリティの基礎
tags:    Supabase,Postgres,RLS,Row Level Security
private: false
-->
# 用語

## Policy

ポリシーは、PostgreSQLの ルールエンジン です。
ルールエンジンと言われてもピンと来ないかもしれません。

部屋の入室許可を自分だけにするか、家族全員にするか、友人にも許可するか等、
誰が何をしてもいいか？を決めるのがポリシーです。



## RLS

RLSは、Row Level Securityの略です。
PostgreSQLの代表的なセキュリティキーワードの一つです。

RLSはポリシーをテーブルの行に対して適用することができます。

認証 誰がマンションに出入りできるか？
Authentication

認可 誰が部屋に入る許可を持っているか？
Authorization

RLS 入った人が、その部屋の中で何ができるか？
row-level security



## ロール

PostgreSQLにおいて、ロールは、データベース内のユーザーやグループを表すオブジェクトです。ロールは、データベースに接続するための認証情報を持ち、データベース内のオブジェクトに対するアクセス権を持つことができます。

ロールは、CREATE ROLEステートメントを使用して作成できます。

以下は、新しいロールを作成する例です。

```sql
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';

```

上記の例では、myuserという名前の新しいロールが作成され、LOGIN権限が付与され、パスワードが設定されています。

ロールには、様々な権限を付与することができます。
例えば、GRANTステートメントを使用して、ロールにテーブルへのアクセス権を付与することができます。

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON mytable TO myuser;

```

上記の例では、mytableという名前のテーブルに対して、myuserロールに対してSELECT、INSERT、UPDATE、DELETEの権限が付与されています。

ロールには、他のロールをスーパーユーザーとして指定することもできます。これにより、スーパーユーザーに与えられた権限が、指定されたロールにも付与されます。

```
GRANT myadmin TO myuser;

```

上記の例では、myadminという名前のロールがスーパーユーザーとして指定され、myuserロールに付与されています。


## RLSのロール

RLS（Row Level Security）におけるロールは、PostgreSQLのロールとは異なります。RLSのロールは、テーブルに対するアクセス権を制御するために使用されます。

RLSのロールは、CREATE ROLEステートメントを使用して作成できます。

以下は、新しいRLSロールを作成する例です。


```sql
CREATE ROLE my_rls_role;

```

上記の例では、my_rls_roleという名前の新しいRLSロールが作成されています。

RLSロールには、テーブルに対するアクセス権を付与することができます。

例えば、GRANTステートメントを使用して、RLSロールにテーブルへのアクセス権を付与することができます。

```
GRANT SELECT, INSERT, UPDATE, DELETE ON mytable TO my_rls_role;

```

上記の例では、mytableという名前のテーブルに対して、my_rls_roleロールに対してSELECT、INSERT、UPDATE、DELETEの権限が付与されています。

RLSロールは、ポリシーの定義に使用されます。ポリシーは、テーブルに対するアクセス権を制御するために使用されます。ポリシーは、CREATE POLICYステートメントを使用して作成できます。以下は、新しいポリシーを作成する例です。

```sql
CREATE POLICY my_policy ON mytable FOR SELECT TO my_rls_role USING (column = 'value');

```

上記の例では、mytableという名前のテーブルに対して、my_policyという名前の新しいポリシーが作成され、my_rls_roleロールに対してSELECTの権限が付与されています。ポリシーの条件は、USING句で指定されています。



## サービング

ファイルを提供することを指します。

SupabaseStorageでは、アップロードされたファイルを保存し、
必要に応じてそのファイルにアクセスするためのURLを生成することができます。

これにより、アプリケーションからファイルを簡単に提供することができます。

例えば、ユーザーがアップロードしたプロフィール画像を表示する場合、
その画像にアクセスするためのURLを生成し、
そのURLをimgタグのsrc属性に設定することで、
画像を表示することができます。



----------------------------------------

# RLS入門

## 有効化

publicに art というテーブルがあるとします。

まずは、RLSを有効化します。

```sql
-- Enable RLS
ALTER TABLE public.art
  ENABLE ROW LEVEL SECURITY;

```

ALTER TABLE でテーブルの権限を変更すると宣言しています。

public.artというテーブルを指定しています。

ENABLE ROW LEVEL SECURITY;
これでRLSが有効化されました。



## 最初の設定

```sql
-- Create Policy
CREATE POLICY "make_art_table_read_only"
ON public.art FOR SELECT USING (
  true
);

```

※ユーザー全員に許可しています。



----------------------------------------

# 基本構文

## RLSの書き方

```sql
create policy "[ポリシーの説明]"
  on [対象テーブル]
  for [対象の操作]
  to [対象のロール]
  using (
    [許可条件]
);

```

### [ポリシーの説明]

このポリシーの目的、説明を書きます。



### on [対象テーブル]

テーブルを指定します。



### for [対象の操作]

基本5つ

SELECT	選ぶ
INSERT		挿入
UPDATE	更新
DELETE	削除
ALL		全て

RLS（Row Level Security）において、複数のアクションに対して同じポリシーを適用する場合、FORキーワードを使用して、複数のアクションを指定することができます。

以下は、FORキーワードを使用して、SELECT、INSERT、UPDATE、DELETEのすべてのアクションに対して同じポリシーを適用する例です。

```sql
CREATE POLICY my_policy
ON mytable
FOR SELECT, INSERT, UPDATE, DELETE
TO my_role
USING (column = 'value');

```

上記の例では、mytableという名前のテーブルに対して、my_policyという名前の新しいポリシーが作成され、my_roleロールに対してSELECT、INSERT、UPDATE、DELETEの権限が付与されています。
ポリシーの条件は、USING句で指定されています。

FORキーワードを使用することで、同じポリシーを複数のアクションに対して適用することができます。
ただし、異なるアクションに対して異なるポリシーを適用する場合は、それぞれのアクションに対して別々のポリシーを作成する必要があります。



### to [対象のロール]

これはこの記事の最初の方で説明したロールを選びます。


### using

ここに[許可条件]を入力します。



#### [許可条件]の種類

```sql
USING (condition)
WITH CHECK (condition);

```

USING (condition)
行に対するSELECTやDELETEを許可する条件を指定します。

現在テーブルに既に保存されているデータを参照し権限設定ができます。

WITH CHECK (condition)
行に対するINSERTやUPDATEを許可する条件を指定します。

新しく作成されるデータを指していて、insertやupdateをする際に更新後のデータを使って制限をかけることができます。



----------------------------------------

# ダッシュボードからの Supabase RLS の作成

RLSを有効化した後はSupabaseのダッシュボードの左サイドバー
Table Editorからテーブルを選び

右上の
New policies
もしくは
X Auth policies
のボタンを押します。

そうしたら、新規作成か編集が出来ます。

そしてRLSをどう作るか選択が出来ます。

```
Get started quickly
テンプレートから作成

For full customization
フルカスタマイズ

```



----------------------------------------

# RLSの create policy と alter policy

PostgreSQLのRow Level Security（RLS）を使用する場合、create policyとalter policyを使用して、テーブルにポリシーを作成および変更できます。

## alter policy

create policyは、新しいポリシーを作成するために使用されます。

以下は、create policyを使用して、todosテーブルに対して、ユーザーが自分自身のタスクのみを選択できるようにするポリシーの例です。

```sql
create policy "Individuals can view their own todos."
on todos for select
using ( (select auth.uid()) = user_id );

```



## alter policy

alter policyは、既存のポリシーを変更するために使用されます。

以下は、alter policyを使用して、postsテーブルに対して、投稿の所有者のみが投稿を更新できるようにするポリシーの例です。

```sql
alter table posts enable row level security;

alter policy "Allow update for owners" on posts for
update
  using ((select auth.uid()) = user_id);

```

ポリシーを変更する場合、alter policyを使用して、ポリシーの名前、テーブルの名前、および変更するポリシーの種類を指定する必要があります。



----------------------------------------

# 応用例

あるユーザーが他のユーザーのデータを見ることは許可したいが、そのデータを変更することは許可したくない、という場合の行レベルセキュリティ（RLS）ポリシーの例を以下に示します。

まず、RLSを有効にするために、以下のコマンドを実行します：

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

次に、全てのユーザーが他のユーザーのプロフィールを見ることを許可するポリシーを作成します：

```sql
CREATE POLICY "All users can view profiles."
  ON profiles
  FOR SELECT
  USING (true);

```

このポリシーでは、`USING`条件に`true`を指定しているため、全ての行がSELECT操作に対して選択可能となります。

最後に、ユーザーが自分のプロフィールのみを更新できるようにするポリシーを作成します：

```sql
CREATE POLICY "Users can update their own profiles."
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

このポリシーでは、`USING`条件と`WITH CHECK`条件に`auth.uid() = id`を指定しているため、現在のユーザーのIDが行のIDと等しい場合のみ、その行がUPDATE操作に対して更新可能となります。

この例では、`auth.uid()`という関数はPostgreSQLの標準ではなく、おそらくカスタム関数または特定のフレームワークの一部である可能性があります。この関数が存在し、期待通りの動作をすることを確認してください。



----------------------------------------

# ヘルパー関数

auth.uid()：リクエストを行ったユーザーのUIDを返す

auth.jwt()：リクエストを行ったユーザーのメタデータを返す

using ( team_id in (select auth.jwt() -> 'app_metadata' -> 'teams'));

この条件は、現在のユーザーが所属するチーム（auth.jwt() -> 'app_metadata' -> 'teams'で取得）に行のteam_idが含まれている場合に真となります。

したがって、この条件を使用すると、ユーザーは自分が所属するチームの行のみを選択または更新することができます。



----------------------------------------
----------------------------------------
----------------------------------------

# Supabase RLSの各ロールが持つ権限「強さ順」の一覧

| ロール                      | 権限                                                                                   |
|---------------------------|----------------------------------------------------------------------------------------|
| supabase_admin            | データベースの作成、削除、テーブルの作成、削除、更新、データの挿入、更新、削除、インデックスの作成、削除、スキーマの作成、削除、ユーザーの作成、削除、ロールの作成、削除、権限の付与、削除、データベースのバックアップ、リストア |
| supabase_auth_admin       | 認証プロバイダーの作成、削除、ユーザーの作成、削除、ユーザーの検証、ユーザーのロールの変更                                        |
| supabase_functions_admin  | 関数の作成、削除、更新、関数の実行                                                           |
| supabase_realtime_admin   | リアルタイムデータの作成、削除、更新、リアルタイムデータの購読                                                  |
| supabase_replication_admin| レプリケーションの設定、開始、停止、レプリケーションスロットの作成、削除                                              |
| supabase_storage_admin    | ストレージの作成、削除、更新、ストレージへのファイルのアップロード、ダウンロード、削除                                     |
| postgres                  | データベースの作成、削除、テーブルの作成、削除、更新、データの挿入、更新、削除、インデックスの作成、削除、スキーマの作成、削除、ユーザーの作成、削除、ロールの作成、削除、権限の付与、削除、データベースのバックアップ、リストア |
| pgbouncer                 | データベースへの接続、切断                                                                  |
| pgsodium_keyholder        | 暗号化キーの作成、削除、更新、暗号化キーの使用                                               |
| pgsodium_keyiduser        | 暗号化キーの使用                                                                           |
| pgsodium_keymaker         | 暗号化キーの作成                                                                           |
| service_role              | 様々な管理タスクの実行                                                                      |
| authenticated             | データベースの読み取り、書き込み                                                             |
| dashboard_user            | ダッシュボードの閲覧、プロジェクトの作成、削除、更新、テーブルの作成、削除、更新、データの挿入、更新、削除                            |
| anon                      | データベースの読み取り                                                                      |
| supabase_read_only_user   | データベースの読み取り                                                                      |
| authenticator             | 認証のためのロール                                                                         |



----------------------------------------

# Supabase RLSの各ロールの上位互換、下位互換を表した図

supabase_admin
├── supabase_auth_admin
├── supabase_functions_admin
├── supabase_realtime_admin
├── supabase_replication_admin
└── supabase_storage_admin

postgres
├── pgbouncer
├── pgsodium_keyholder
├── pgsodium_keyiduser
└── pgsodium_keymaker

service_role

authenticated
└── dashboard_user

anon

supabase_read_only_user

authenticator


## 解説

上位互換の関係では、上位のロールは下位のロールのすべての権限を持ちます。

例えば、supabase_adminロールは、supabase_auth_admin、supabase_functions_admin、supabase_realtime_admin、supabase_replication_admin、supabase_storage_adminロールのすべての権限を持ちます。

下位互換の関係では、下位のロールは上位のロールの一部の権限しか持ちません。例えば、pgbouncerロールは、postgresロールの一部の権限しか持ちません。



----------------------------------------

# Supabase 役割の権限順一覧

## supabase_admin

データベースを管理するためのロールです。
このロールは、データベースの管理者に与えられる権限を持っています。
つまり、データベースの作成、削除、テーブルの作成、削除、データの追加、更新、削除など、データベースの管理に必要なすべての操作を実行できます。

ただし、このロールは、データベースのアクセス権限を持つユーザーにのみ与えることができます。



## supabase_auth_admin

認証関連のタスクを実行するためのロールです。
このロールは、認証ミドルウェアがデータベースに接続してマイグレーションを実行するために使用されます。
このロールは、authスキーマにアクセスする権限を持っています。
つまり、認証関連のテーブル、ビュー、および関数にアクセスできます。
ただし、このロールは、認証に関連するタスクを実行するために必要なユーザーにのみ与えることができます。



## supabase_functions_admin

関数を管理するためのロールです。このロールは、関数の作成、更新、削除、および実行など、関数に関連するすべての操作を実行できます。
ただし、このロールは、関数を管理するために必要なユーザーにのみ与えることができます。



## supabase_realtime_admin

リアルタイム機能を管理するためのロールです。
このロールは、リアルタイム機能を使用するために必要な権限を持っています。
つまり、リアルタイム機能を使用するために必要なすべてのテーブル、ビュー、および関数にアクセスできます。
また、このロールは、リアルタイム機能を使用するために必要なすべての権限を持っています。
ただし、このロールは、リアルタイム機能を使用するために必要なユーザーにのみ与えることができます。



## supabase_replication_admin

レプリケーションを管理するためのロールです。
このロールは、レプリケーションに必要なすべての操作を実行できます。
つまり、レプリケーションの作成、更新、削除、および監視など、レプリケーションに関連するすべての操作を実行できます。
ただし、このロールは、レプリケーションを管理するために必要なユーザーにのみ与えることができます。



## supabase_storage_admin

ストレージ関連のタスクを実行するためのロールです。このロールは、
ストレージミドルウェアがデータベースに接続してマイグレーションを実行するために使用されます。
このロールは、storageスキーマにアクセスする権限を持っています。
つまり、ストレージ関連のテーブル、ビュー、および関数にアクセスできます。
ただし、このロールは、ストレージに関連するタスクを実行するために必要なユーザーにのみ与えることができます。



## postgres

PostgreSQLのデフォルトのロールで、管理者権限を持っています。
つまり、このロールは、PostgreSQLの管理者に与えられる権限を持っています。
このロールは、データベースの作成、削除、テーブルの作成、削除、データの追加、更新、削除など、データベースの管理に必要なすべての操作を実行できます。
ただし、このロールは、データベースのアクセス権限を持つユーザーにのみ与えることができます。



## pgbouncer

PgBouncerを管理するためのロールです。
pgbouncerは、PostgreSQLのコネクションプーリングツールであり、Supabaseでは使用されています。
pgbouncerを管理するためのロールは、pgbouncerの設定ファイルを編集するために必要です。
つまり、pgbouncerの設定を変更するために必要なすべての操作を実行できます。
ただし、このロールは、pgbouncerを管理するために必要なユーザーにのみ与えることができます。



## pgsodium_keyholder

pg_sodiumの鍵を管理するためのロールです。
このロールは、pg_sodiumの鍵を作成、更新、削除するために必要な権限を持っています。
つまり、pg_sodiumの鍵を管理するために必要なすべての操作を実行できます。
ただし、このロールは、pg_sodiumの鍵を管理するために必要なユーザーにのみ与えることができます。



## pgsodium_keyiduser
pgsodium_keyiduserは、pg_sodiumの鍵を管理するためのロールである可能性があります。
pg_sodiumの鍵を管理するためのロールは、pgsodium_keyholderであることが一般的です。
pgsodium_keyholderは、pg_sodiumの鍵を作成、更新、削除するために必要な権限を持っています。
つまり、pg_sodiumの鍵を管理するために必要なすべての操作を実行できます。
ただし、このロールは、pg_sodiumの鍵を管理するために必要なユーザーにのみ与えることができます。



## pgsodium_keymaker

pgsodium_keymakerに関する情報は、上記のドキュメントには含まれていません。
ただし、pgsodium_keymakerは、pg_sodiumの鍵を作成するためのロールである可能性があります。
pg_sodiumの鍵を作成するためのロールは、pgsodium_keyholderであることが一般的です。
pgsodium_keyholderは、pg_sodiumの鍵を作成、更新、削除するために必要な権限を持っています。
つまり、pg_sodiumの鍵を管理するために必要なすべての操作を実行できます。
ただし、このロールは、pg_sodiumの鍵を作成するために必要なユーザーにのみ与えることができます。



## service_role

SupabaseのAPI（PostgREST）がRLS（Row Level Security）をバイパスするために使用する、昇格されたアクセスを持つ事前定義されたPostgreSQLロールです。
つまり、このロールは、RLSによって制御されるテーブルへのアクセスを制限された場合でも、APIがテーブルにアクセスできるようにするために使用されます。
ただし、このロールは、プライベートサーバーでのみ使用することが推奨されています。
service_roleロールは、PostgreSQLのnologinおよびnoinherit属性を持ち、ログインできず、他のロールから継承されません。service_roleロールは、RLSポリシーによって制御されるテーブルへのアクセスを許可するために使用されます。



## authenticated

認証済みユーザー向けのロールです。
つまり、APIキーを持っているユーザーがログインしている場合、このロールで許可された操作を実行することができます。
このロールは、PostgRESTのAPIが使用するロールであり、認証されたユーザーが実行できる操作を制御するために使用されます。

authenticatedロールは、PostgreSQLのnologinおよびnoinherit属性を持ち、ログインできず、他のロールから継承されません。
authenticatedロールは、認証されたユーザーが実行できる操作を制御するために使用されるため、RLSポリシーによって制御されるテーブルへのアクセスを許可するために使用されます。



## dashboard_user

Supabaseのダッシュボードにアクセスするためのロールです。
このロールは、SupabaseのUIを介してコマンドを実行するために必要です。
つまり、このロールを持つユーザーは、Supabaseのダッシュボードを使用して、データベースの管理や設定を行うことができます。
ただし、このロールは、ダッシュボードにアクセスするために必要なユーザーにのみ与えることができます。



## anon

匿名ユーザー向けのロールです。つまり、APIキーを持っていないユーザーがログインしていない場合でも、このロールで許可された操作を実行することができます。

このロールは、PostgRESTのAPIが使用するロールであり、認証されていないユーザーが実行できる操作を制御するために使用されます。

anonロールは、PostgreSQLのnologinおよびnoinherit属性を持ち、ログインできず、他のロールから継承されません。

anonロールは、認証されていないユーザーが実行できる操作を制御するために使用されるため、RLSポリシーによって制御されるテーブルへのアクセスを許可するために使用されます。



## supabase_read_only_user

読み取り専用のユーザー向けのロールです。
つまり、このロールを持つユーザーは、データベースの読み取り操作のみを実行することができます。
このロールは、データベースの読み取り操作のみを必要とするユーザーに対して使用されます。
supabase_read_only_userロールは、PostgreSQLのnologinおよびnoinherit属性を持ち、ログインできず、他のロールから継承されません。
supabase_read_only_userロールは、RLSポリシーによって制御されるテーブルへのアクセスを許可するために使用されます。


## authenticator

認証プロバイダーを管理するためのロールです。
このロールは、API（PostgREST）がJWTを検証し、その後JWT検証によって決定された別のロールに「変更する」ために使用されます。
つまり、このロールは、認証プロバイダーを使用してユーザーを認証するために必要な権限を持っています。
ただし、このロールは、API（PostgREST）が使用するロールであり、認証プロバイダーを管理するために必要なユーザーにのみ与えることができます。



----------------------------------------
----------------------------------------
----------------------------------------

# SupabaseのRLSのテンプレート

※SupabaseがダッシュボードからGUIでRLSを作る時に表示される全てのテンプレートの一覧です。



## 選択

すべてのユーザの読み取りアクセスを有効にする。
このポリシーは、SELECT操作によるすべてのユーザのテーブルへの読み取りアクセスを許可します。

```sql
create policy "Enable read access for all users"
on "public"."users"
for select using (true);

```



## 挿入

認証されたユーザのみ挿入を有効にする。
このポリシーは、認証されたユーザに対してのみ、テーブルへのインサートアクセスを許可します。

```sql
create policy "Enable insert for authenticated users only"
on "public"."users"
for insert to authenticated
with check (true);

```



## 更新

電子メールに基づくユーザの更新を有効にする。
このポリシーは、テーブルに "email" カラムがあると仮定し、"email" カラムが自分のメールアドレスと一致する行の更新を許可します。

```sql
create policy "Enable update for users based on email"
on "public"."users"
for update using (
  (select auth.jwt()) ->> 'email' = email
) with check (
  (select auth.jwt()) ->> 'email' = email
);

```



## 削除

user_idに基づいてユーザの削除を有効にする。
このポリシーは、テーブルに "user_id "カラムがあり、ユーザが "user_id "カラムが自分のIDと一致する行を削除できることを想定しています。

```sql
create policy "Enable delete for users based on user_id"
on "public"."users"
for delete using (
  (select auth.uid()) = user_id
);

```



## 挿入

user_idに基づくユーザの挿入を許可する。
このポリシーは、テーブルに "user_id "カラムがあり、ユーザが "user_id "カラムとIDが一致する行を挿入できることを想定しています。

```sql
create policy "Enable insert for users based on user_id"
on "public"."users"
for insert with check (
  (select auth.uid()) = user_id
);

```



## UPDATE

テーブル結合を使ったポリシー
より高度な RLS ルールを構築するための、テーブルをまたがるクエリ。

teams および members という 2 つのテーブルを想定した場合、members テーブルへのアクセスを制御するために、ポリシーの中で両方のテーブルにクエリを発行することができます。

```sql
create policy "Members can update team details if they belong to the team"
on teams for update using (
  (select auth.uid()) in (
    select user_id from members where team_id = id
  )
);

```



## ALL

セキュリティ定義関数を使用したポリシー。
多対多の関係で、リンクテーブルへのアクセスを制限したい場合に便利です。

teams および members という 2 つのテーブルを想定すると、セキュリティ定義関数をポリシーと組み合わせて使用することで、members テーブルへのアクセスを制御できます。

```sql
create or replace function get_teams_for_user(user_id uuid)
returns setof bigint as $$
  select team_id from members where user_id = $1
$$ stable language sql security definer;

create policy "Team members can update team members if they belong to the team"
on members
for all using (
  team_id in (select get_teams_for_user(auth.uid()))
);

```



## 選択

Time To Live（TTL）を実装するためのポリシー。
InstagramのストーリーやSnapchatで見られるような、メッセージが1日で期限切れになるTTLのような機能を実装する。

テーブルの下の行は、過去24時間以内に作成されたものだけが利用可能です。

```sql
create policy "Stories are live for a day"
on "public"."users"
for select using (
  created_at > (current_timestamp - interval '1 day')
);

```



----------------------------------------
----------------------------------------
----------------------------------------

# Q&A

## Q: RLSは作ったテーブル全部に有効化する必要がありますか？

A: はい、publicスキーマに作成されたすべてのテーブル、ビュー、および関数に対してRLSを有効にすることを推奨します。
これにより、認証されたユーザーがアクセスできるデータを制御することができます。

ただし、RLSを有効にすると、RLSポリシーが設定されていない場合、認証されたユーザーでもデータにアクセスできなくなるため、注意が必要です。
また、RLSを有効にすると、パフォーマンスに影響を与える可能性があるため、パフォーマンスの最適化にも注意する必要があります。



## Q: RLSを有効化すると誰もアクセスできなくなりますか？

A: はい、その通りです。
enable row level security句を使用してテーブルでRLSを有効にすると、パブリックanonキーを使用してAPIからデータにアクセスできなくなります。

ポリシーを作成するまで、データは誰にもアクセスできなくなります。

けれども、publicスキーマで作成されたテーブルは、Supabase Data APIを介してアクセスできます。

アクセスを制限するには、publicスキーマのすべてのテーブル、ビュー、および関数に対してRow Level Security（RLS）を有効にします。

その後、認証トークンに基づいてユーザーに特定のデータベース行または関数へのアクセスを許可するRLSポリシーを作成できます。

Supabaseダッシュボードを介して作成されたテーブルは、デフォルトでRLSが有効になっています。

SQLエディタまたは他の方法でテーブルを作成した場合は、次のようにRLSを有効にします。

```sql
alter table "table_name" enable row level security;

```

RLSを有効にすると、ユーザーがデータにアクセスおよび更新することを許可または拒否するポリシーを作成できます。

Row Level Securityポリシーの作成方法については、Authorization documentationで詳しく説明しています。



## Q: 認証、認可、およびRLSとは

A1: 認証
認証は、ユーザーがアプリケーションにログインするために必要なプロセスです。Supabase Authを使用すると、ユーザーの認証を簡単に実装できます。Next.jsアプリ内にアクセスすることを許可するために、@supabase/supabase-jsパッケージを使用して、Supabaseクライアントを作成し、signInメソッドを使用してユーザーを認証します。

A2: 認可
認可は、認証されたユーザーがアプリケーション内でどのような操作を実行できるかを制御するために使用されます。Supabaseでは、認可を実装するために、RLS（Row Level Security）を使用します。
RLSを使用すると、認証されたユーザーが特定の個人のデータにアクセスすることを許可することができます。
Next.jsアプリ内で特定の個人のデータにアクセスするためには、@supabase/supabase-jsパッケージを使用して、Supabaseクライアントを作成し、fromメソッドを使用して、特定のテーブルにアクセスします。

A3: RLS
RLSは、認証されたユーザーが特定の個人のデータの特定の項目にアクセスすることを許可するために使用されます。
RLSを使用すると、認証されたユーザーがアクセスできるデータを制御することができます。
Next.jsアプリ内で特定の個人のデータの特定の項目にアクセスするためには、RLSポリシーを作成し、@supabase/supabase-jsパッケージを使用して、Supabaseクライアントを作成し、fromメソッドを使用して、特定のテーブルにアクセスします。

----------------------------------------
----------------------------------------
----------------------------------------

Supabase AI

https://supabase.com/docs

ここから右上の検索BOXをクリックすると
AIに質問できるダイアログが表示されます。
「Ask Supabase AI a question...」



参考

Supabase Auth スキーマ と そのテーブルの詳細 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/7f65f732ecbafbd5cb00