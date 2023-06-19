<!--
title:   Supabase ローカル開発環境 ＋ サーバー運用を想定 2023
tags:    Docker,Next.js,PostgreSQL,Supabase
id:      be94b4c74a7850a4b79c
private: false
-->

[WIP]

2023年6月18日
Supabase ローカル開発環境2023年6月版


※重要
GitHub copilotを利用しましょう(年14000円ぐらい)、GitHub copilotが使えるようになればGitHub copilot chatも使えるようになります。（ウェイトリストに登録が必要）

ChatGPTのGPT-4が使えるようになれば最強だと思いますが、こっちはcopilotの2倍の料金がかかっているようなので使うのは見合わせています。コードを書くだけならGitHub copilotとGitHub copilot chatだけで十分です。



# 用語
ローカル
ローカルPCのDockerで動かしているSupabaseプロジェクト、
もしくはローカル側を指す。

サーバー
ウェブサイトのダッシュボードからアクセスするSupabaseプロジェクト、
もしくはサーバー側を指す。

ローカルダッシュボード
Studio URL
http://localhost:54323/project/default


サーバーダッシュボード
https://app.supabase.com/project/[project-id]

サーバープロジェクトリスト
https://app.supabase.com/projects
※projectsは複数形になっています。



※ この記事だけの用語です。




目的
Supabaseのローカル開発環境を構築する。
Next.jsをローカルで開発をする
サーバーにデプロイする。
サーバで本番運用する。



環境
Windows 10
VSCode
Git
GitHub (アカウント取得済み、基本的なコマンドは使える)
Docker Desktop (ローカル環境でDockerコンテナを実行するためのツール)
Supabase (アカウント取得済み、新規にProjectを作成済み)
Vercel (Webアプリケーションのプラットフォーム アカウント取得済み)
DBeaver（オープンソースのデータベース管理ツール）

※アカウント作成や、Supabaseの新規プロジェクトそれに伴うproject-idなどはすでにわかっているものとします。





Supabaseデータのテンプレート
サーバでプロジェクトを作ったらダッシュボードから値を調べて書き込みます。

```Supabaseデータのテンプレート .env.local

作成日
20**年**月**日

Supabaseプロジェクト
組織 Organization

Name


Database Password



Region
Northeast Asia (Tokyo)

左サイドバーにある
Project setting > General settings
Reference ID (=project-id)



Project Setting > API > Project URL



Project Setting > API > Project API keys > anon public



Project Setting > API > Project API keys > service_role secret



Project Setting > API > JWT Settings > JWT Secret





アクセストークン
Supabase | Supabase
https://app.supabase.com/account/tokens

supabase login アクセストークン



Table Plus接続
postgresql://postgres:[PASSWORD]@db.[Reference ID].supabase.co:5432/postgres

ダッシュボード
https://app.supabase.com/project/[Reference ID]



作成コマンド



```





# 使用ツール
Next.js 13 app router
TailwindCSS
Storybook 7 SFC3
pgAdmin4



# 入手先（アカウントやツール）

Visual Studio Code - Code Editing. Redefined

https://code.visualstudio.com/

GitHub Japan | GitHub

https://github.co.jp/

Docker Desktop

https://www.docker.com/products/docker-desktop/

Supabase

https://app.supabase.com/

Vercel

https://vercel.com/





ローカルにSupabaseのCLI (command line interface)をインストールします。

## 公式
Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/cli

## 参考

SupabaseCLIでローカル環境構築

https://zenn.dev/slowhand/articles/209699774226af







# CLIインストール
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

アップデート
scoop update supabase
※結構頻繁にアップデートされるので時々実行します。



supabaseのグローバルインストールはサポートされていません。
使用できない
npm install -g supabase



ログインする前に
Supabaseのアクセストークンを取得します。

Supabaseアクセストークンの取得場所

https://app.supabase.com/account/tokens




Supabaseのサーバーで作ったプロジェクトとの接続のために
ローカルPCからサーバーにログインします。

supabase login

ここでアクセストークンが必要です。
接続が切れるまでログインは1度だけで大丈夫です。

ログインできているかを確認します。
supabase projects list


作成したプロジェクト一覧が表示されていれば大丈夫です。





Next.jsにsupabaseをインストールします。

supabase インストール

npm install supabase

Docker Desktopインストールをした後に
Docker Desktopを立ち上げておきます。


supabaseの初期化、Next.jsにインストールします。

supabase init


Generate VS Code workspace settings? [y/N]
VS Code workspaceで開発をしますかと聞いてくるのでy/Nを押します。
※この選択は自由にしてください。

↓そうするとRootにsupabaseフォルダとファイルが出来上がります。

```
06-18 14:27:46> ls

    Directory: ***********\supabase

Mode                 LastWriteTime         Length Name
----                 ------         ------ ----
-a---          2023/06/18    14:26             27 .gitignore
-a---          2023/06/18    14:26           3136 config.toml
-a---          2023/06/18    14:26              0 seed.sql



```


# toml拡張機能

VSCodeの場合、tomlを見やすくするVSCode拡張機能が提案されます。

自分はEven Better TOML v0.19.0を選びました。

選んだ理由

| 名前  | 前回のリリース日  | ★の数 | DL数 |
| --------- | ---------- |---------- | ---------- |
| Even Better TOML v0.19.0 | 2022/11/2 0:39:57        | ★★★★★| 455157 |
| Better TOML v0.3.2       | 2018/2/18 17:50:44       |★★★| 1703424 |

Even Better TOML - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml

を入れます。



# PCの必要メモリ

ローカルでDockerを開始する前に
Dockerの現状を確認
弱いPCだとDockerを使うと非常に重くなる。
メモリが32GBできつい、64GBは欲しい。

※設定で必要メモリを抑えられるらしい。（未調査）
※DockerDesktopの代替ツールで軽くなるらしい。（未調査）





# DockerDesktopを使用するための事前準備

※DockerDesktopで色々遊んでいたのを消す作業です、DockerDesktopを初めてインストールする人は飛ばしてください。

※これらのコマンドを実行するとDB内の情報は完全にリセットされます。

コンテナ起動中のものだけを表示します。

docker container ls

コンテナ停止中のもの含めて全部を表示します。

docker container ls -a

他の起動中のコンテナをすべて停止します。

docker stop $(docker ps -q)

コンテナをすべて削除します。 (rmコマンドは起動中のものは削除できない)

docker rm $(docker ps -aq)

未使用のVolumeを一括削除します。

docker volume prune

※Dockerのイメージは消していません。



きれいになったらSupabaseのコンテナを作成し起動します。

supabase start

Dockerのイメージを組み合わせてSupabaseのコンテナを作成します。
Dockerのイメージをダウンロードするのにかなり時間がかかります。
Dockerのイメージを消さないで残していたら新しいコンテナがすぐに立ち上がります。




supabase startが成功すると。



```
06-18 15:49:49> supabase start
Seeding data supabase\seed.sql...me...
                                 Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhb**********************************n_I0
service_role key: eyJhbGci*******************************pN81IU



```

※データが見やすいように出力を整形しています。

ローカルの環境変数が表示されます。
作成したコンテナに依存しているようで、何度立ち上げ直しても **key** は同じ値になります。




supabase status

で現在の起動状況がわかります。

supabase statusでも上の環境変数が表示されます。

停止させる場合は

volumeに保存する場合(デフォルト)

supabase stop

volumeに保存したくなければ、オプションをつけます。

supabase stop --no-backup

volumeに保存しておくと
seed.sql以外のDBデータ等も保存されます。






# ローカル開発

公式
Local Development | Supabase Docs

https://supabase.com/docs/guides/getting-started/local-development

※この項目は半分以上は公式の翻訳です。




## マイグレーション
Supabaseは実質PostgresなのでSQL文が使えます。

データベースの変更は「マイグレーション」を通じて管理されます。データベースのマイグレーションは、データベースへの変更を長期的に追跡するための一般的な方法です。


### 最初のマイグレーションファイルの作成
まず、従業員テーブルを作成するために必要なSQLを格納するために、新しいマイグレーションファイルを作成します。


supabase migration new create_employees_table

このコマンドを実行すると
supabase\migrations ディレクトリ内に

空の
supabase\migrations\[タイムスタンプ]_create_employees_table.sql
ファイルが作成されます。

空のファイルなので削除しても大丈夫です、
SQL文などを書いてリセットコマンドを実行するとそのSQL文を読んでテーブルが立ち上げごとに再構成されます。

ダッシュボードでポチポチと作成したテーブルをマイグレーションファイルに保存しないで、リセットコマンドを実行するとその変更は反映されず、マイグレーションファイルに則ってテーブルが生成されます。

リセットコマンド

supabase db reset


ダッシュボードからポチポチと作成したテーブルをマイグレーションファイルに反映させるには？
(後述)



このemployeesテーブルを作成するSQLを追加します。

SQL文で簡単なテーブルを作ってみます。

まずはローカルのダッシュボードを開いて、自分が作ったテーブルはまだないことを確認します。

ローカルダッシュボード
Studio URL

http://localhost:54323/project/default

サーバーダッシュボード

https://app.supabase.com/project/[project-id]

ローカルダッシュボードのTable editorを開いてテーブルがないのを確認しておきます。
※Supabaseコンテナを立ち上げた時に、Authentication関連のテーブル等は作成済みです。

先ほど作成したマイグレーションファイルに以下のSQLを追加します。

```supabase\migrations\[タイムスタンプ]_create_employees_table.sql
create table
employees (
	id bigint primary key generated always as identity,
	name text,
	email text,
	created_at timestamptz default now()
);



```



マイグレーションを適用する
マイグレーションファイルができたので、このマイグレーションを実行し、employeesテーブルを作成することができます。

ここでresetコマンドを使用して、データベースを現在のマイグレーションにリセットします。



リセットコマンド
supabase db reset
を実行します。

```
06-19 01:09:03> supabase db reset
Resetting local database...
Initializing schema...
Applying migration [タイムスタンプ]_create_employees_table.sql...
Seeding data supabase\seed.sql...
Restarting containers...
Finished supabase db reset on branch supabase/local.



```

ローカルダッシュボードの左サイドバーにあるTable editorを確認すると、テーブルが作られています。

ローカルでテーブルを作成する方法は
* SQL文をCLIからコマンドで作成する方法
* ローカルダッシュボードの左サイドバーにあるTable editorから作成する方法
* Postgresに対応したDBツール（星の数のごとくある）から操作する方法
などがあります。



このリセットコマンドは少々わかりにくいですが、

supabase db reset
を実行すると現在supabaseにあるsupabase\migrationsフォルダ内にある SQL文を実行します。

そうすることで最後にマイグレーション（作成）した状態に戻すというコマンドになっています。


> 例えば、gitでcommitせずにcheckoutして変更をすべて放棄するような感じで、
最新のcommitしたところまで戻ります。
> git checkoutコマンドを使用して、コミットせずにブランチを切り替えると、現在のブランチの変更内容が破棄され、切り替え先のブランチの状態に移行します。つまり、変更内容が失われてしまいます。
> 例えば、featureブランチで作業をしているときに、mainブランチに切り替えたい場合、git checkout mainコマンドを実行します。このコマンドを実行すると、featureブランチでの変更内容が破棄され、mainブランチの最新の状態に移行します。



これでCLI(コマンドライン)からテーブルを作成する方法が確認できました。
次にテーブルに初期データを挿入する方法を説明します。



# 初期データの追加

supabase/seed.sqlファイルには、テーブルに挿入する初期データを記述することができます。このファイルにデータを追加すると、データベースをリセットするたびに初期データが挿入されます。

リセットコマンド
supabase db reset
を実行するごとに値が挿入されます。


例えば、employeesテーブルにデータを挿入する場合は、supabase/seed.sqlファイルにINSERT文を記述することができます。このファイルに記述されたINSERT文は、データベースをリセットするたびに実行され、テーブルにデータが挿入されます。



例

```supabase/seed.sql
insert into
public.employees (name)
values
('Erlich Bachman'),
('Richard Hendricks'),
('Monica Hall');



```

ローカルダッシュボードを再読込してください、これで、ダッシュボードに従業員テーブルとシードデータが表示されるはずです。データベースの変更はすべてコードに取り込まれ、いつでもシードデータとともに既知の状態にリセットすることができます。

テーブルの設計はマイグレーションファイルに、初期データはシードファイルに記述するというのが一般的なやり方です。


## テーブル設計による変更点の差分を見る

マイグレーションしたテーブル設計と、まだマイグレーションファイルに登録していないテーブル設計の差分を見る方法を説明します。

例えば、ダッシュボードの左サイドバーにあるTable editorからcitiesという新しいテーブルを作成し、id、created_at、name、updated_atというカラムを設定します。

※テーブル名は日本語も使えますが、サイドツール等で不具合が出るかも知れないので極力使わないようにします。

RLSは練習では不要なのでOFFにしておきます。
RLSは各自学習してください。

Row Level Security | Supabase Docs

https://supabase.com/docs/guides/auth/row-level-security



まだマイグレーションに未登録のテーブル設計のSQL文を見るには、

supabase db diff --schema public

※Supabaseでは基本的にpublicスキーマを使います。
publicとは、PostgreSQLにおけるスキーマの一つで、デフォルトのスキーマです。スキーマとは、データベース内のオブジェクト（テーブル、ビュー、関数、トリガーなど）を論理的に分類するための仕組みであり、複数のスキーマを作成することができます。publicスキーマは、データベースを作成した際に自動的に作成され、デフォルトで使用されるスキーマです。Supabaseでは、publicスキーマを使用することが推奨されています。


コマンドを実行します。
これは、テーブルとカラムを作成するために実行されるSQLを表示します。

supabase db diffの出力はターミナルに次のように出力されます。

```
06-19 01:30:01> supabase db diff --schema public
Connecting to local database...
Creating shadow database...
Applying migration 20230618160745_create_employees_table.sql...
Diffing schemas: public
Finished supabase db diff on branch supabase/local.

create table "public"."cities" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "updated_at" timestamp with time zone
);


CREATE UNIQUE INDEX cities_pkey ON public.cities USING btree (id);

alter table "public"."cities" add constraint "cities_pkey" PRIMARY KEY using index "cities_pkey";



```

この出力されたSQL文を登録するために、新たにマイグレーションファイルを作成します。

supabase migration new create_cities_table

↓このような空のファイルがマイグレーションフォルダに作成されます。
supabase\migrations\[タイムスタンプ]_create_cities_table.sql
を開いてSQL文の部分を貼り付けます。

```
create table "public"."cities" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" text,
    "updated_at" timestamp with time zone
);


CREATE UNIQUE INDEX cities_pkey ON public.cities USING btree (id);

alter table "public"."cities" add constraint "cities_pkey" PRIMARY KEY using index "cities_pkey";



```


※貼り付ける前にこの状態でのリセットコマンドを試してみます。
リセットコマンド
supabase db reset
を実行して、ローカルダッシュボードを再読込すると(＝最近は自動再読込してくれる時がありますがしてくれない時も・・再読み込みの条件は不明)
citiesテーブルが消えています。employeesテーブルは残っています。
マイグレーションフォルダも今、

supabase\migrations\[タイムスタンプ]_create_employees_table.sql
supabase\migrations\[タイムスタンプ]_create_cities_table.sql

この2ファイルあるはずです。

[タイムスタンプ]_create_employees_table.sqlにはテーブルのSQL文があり
[タイムスタンプ]_create_cities_table.sqlには空のファイルになっています。

リセットコマンドはこのようにマイグレーションファイルを読み込んでテーブルを再現させてくれています。


確認したところで
supabase\migrations\[タイムスタンプ]_create_cities_table.sql
の中身を先程出力させたSQL文を貼り付けます。

リセットコマンド
supabase db reset
を実行します。

ブラウザを再読み込みさせると、これでemployeesテーブルとcitiesテーブルが再現されたことがわかると思います。

次はローカルで作ったDBの設定をサーバーに反映させる方法を見ていきます。


# Link your project

まずは
supabase link
を使用して、自分のローカルとサーバーのそれぞれのプロジェクトを関連付けます。

関連付けることでローカルのDBの状態をサーバーに反映させることができます。

supabase link --project-ref [project-id] -p [データベースパスワード]
`supabase link -p ************ --project-ref ********************`

プロジェクト同士をリンクをさせると双方のマイグレーションの状態がわかります。

supabase migration list

のコマンドを実行します。

※重要 このリストはあくまでもローカル側から見たマイグレーション適用状況です。
ローカルでのコマンドの結果が記録されているだけです。
つまりサーバーでプロジェクトのテーブルを色々いじって設定していたとしても、このローカルのsupabase migration listには反映されません。

コマンドを実行します。

```
06-19 01:59:34> supabase migration list

        LOCAL      │ REMOTE │     TIME (UTC)
  ─────────────────┼────────┼─────────
    20230618160745 │        │ 2023-06-18 16:07:45
    20230618164204 │        │ 2023-06-18 16:42:04

```

※ LOCALの数字はマイグレーションファイルのタイムスタンプと同じです。

このリストを見ると、ローカルで2つのマイグレーションファイルを作成したことがわかります。

※見やすくなるよう出力データを加工しています。


これをサーバーに 反映させるために、次のコマンドを実行させます。

supabase db push
を実行します。

supabase migration list でどうなったかを見ます。



```
06-19 02:15:28> supabase migration list

        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼───────────────┼──────────────────
    20230618160745 │ 20230618160745 │ 2023-06-18 16:07:45
    20230618164204 │ 20230618164204 │ 2023-06-18 16:42:04



```

※ LOCALとREMOTEの数字はマイグレーションファイルのタイムスタンプと同じです。

※見やすくなるよう出力データを加工しています。

これでサーバーとのDBの同期が取れました。
サーバー側からも確認してみます。

サーバーのダッシュボードを開きます。

https://app.supabase.com/project/[project-id]

サーバーのプロジェクトリストからでもいけます。
https://app.supabase.com/projects
※projectsは複数形になっています。



サーバー側でプロジェクトを開き左サイドバーにあるTable editorを見ると、テーブルの設計が反映されていることがわかります。

ローカルとサーバーに同じマイグレーションファイルが反映されている状態を**データベースの同期が取れている状態**と定義しておきます。

```
06-19 02:15:28> supabase migration list

        LOCAL      │     REMOTE     │     TIME (UTC)
  ───────┼───────┼─────────
    20230618160745 │ 20230618160745 │ 2023-06-18 16:07:45
    20230618164204 │ 20230618164204 │ 2023-06-18 16:42:04



```

※同期が取れている状態


### 豆知識
現在サーバー側にはローカル側にはまだない機能が複数あります。
そのうちの一つがテーブル定義を見る機能です。

サーバーのTable editorを開きテーブルを選択します。
そうすると、左上の2行目に <> API Data Definitionという文字列が見えます。
Definitionを選択するとそのテーブルのSQL文が表示されます。

```
create table
  public.employees (
    id bigint generated always as identity not null,
    name text null,
    email text null,
    created_at timestamp with time zone null default now(),
    constraint employees_pkey primary key (id)
  ) tablespace pg_default;



```




しかし、残念ながら
ローカルに入れてあったseedファイルに設定していたデータは反映されていません。
(個人の感想: これはテーブルに巨大なデータがあった時に動作の保証が取れないためにこのような形になっているのかも知れません。)



ローカルの値をサーバーに反映させる方法
調査中







# Edge Functionsを導入する

プロジェクトがEdge Functionsを使用している場合、functions deployを使用してこれらをデプロイすることができます：

supabase functions deploy <function_name>を使用します。

調査中





# ローカルでAuthを使用する

ローカルでAuthを使用するには、supabase initを実行した後に作成されるプロジェクトのsupabase/config.tomlファイルを更新します。必要なプロバイダを追加し、enabled を true に設定します。

config.toml

[auth.external.github] を追加します。
enabled = true
client_id = ""
secret = ""
これらの変更を有効にするには、supabase stopとsupabase startを再度実行する必要があります。

調査中



# ローカルログの有効化

ローカルログは、Supabase Analytics Serverに依存しています。これはCLI設定によって有効にすることができ、Google CloudプロジェクトとBigQueryアクセスが必要です。

注意
Google Cloudプロジェクトは課金を有効にしておく必要があります。

要件は以下の通りです：

Googleクラウドプロジェクト番号
GoogleクラウドプロジェクトID
Google Cloudサービスアカウントキー（Google Cloud IAMダッシュボードから取得し、サービスアカウントにBigQuery Adminロールが割り当てられていること。
これら3つの項目が揃ったら、以下の手順で進めてください：

まず、プロジェクトのsupabase/config.tomlを更新します：

[アナリティクス]を
enabled = true
gcp_project_number = "123456"
gcp_project_id = "my-project-id"
gcp_jwt_path = "supabase/gcloud.json"

次に、サービスアカウントのキー（JSONファイル）を対応するパスに配置し、その名前が正しく付けられていることを確認します。

最後に、supabase startを使用してローカルスタックを起動します。

これにより、ロギングドライバーが切り替わり、ログがAnalyticsサーバーに直接送られるようになります。Studio Logs ExplorerとLogs UIを使用して、ログの表示とクエリーを行うことができます。

調査中


# 制限事項および考慮事項
ローカル開発環境は、Supabase Platformほど機能が充実していません。ホストされたプラットフォームとローカル環境との間で同等になるように取り組んでいます。
以下は、その相違点です：

Functionsインターフェイスは近日公開予定です。
ダッシュボードでは、プロジェクトの設定を更新することはできません。これはCLIを使用して行う必要があります。
CLIのバージョンによって使用するローカルバージョンのStudioが決まるので、ローカルのSupabase CLIを最新に保つようにしてください。






# 型生成

src/typesフォルダの作成
supabase gen types typescript --local > /src/types/database.types.ts

調査中


# ツールによるクライアント接続

DBeaver

postgresql://{ユーザー名:パスワード}@{ホスト名}:{ポート番号}/{DB名}
postgres://postgres:postgres@localhost:5432/postgres


調査中



# 認証＆認可

認証はmiddleware.jsで行って
認可はRLSで行うのが
基本的な考え方になるのか？

認証は誰であるかを証明し
認可はその人が何ができるかを証明する




# 参考URL


https://zenn.dev/slowhand/articles/209699774226af

