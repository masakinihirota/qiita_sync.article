<!--
title:   Supabase ローカル開発環境 ＋ サーバー運用を想定 2023
tags:    Docker,Next.js,PostgreSQL,Supabase
id:      be94b4c74a7850a4b79c
private: false
-->

[WIP]

# 重要コマンド
scoop update supabase


# 目的
Supabaseのローカル開発環境を構築する。
Next.jsをローカルで開発をする
サーバーにデプロイする。
サーバで本番運用する。



# 用語

この記事だけの用語です。

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








# 環境
Windows 10
Powershell
VSCode
Git
GitHub
Docker Desktop
Supabase
Vercel

Next.js 13 app router
TailwindCSS
Storybook 7 SFC3

データベース管理ツール
pgAdmin4
DBeaver

※アカウント作成や、Supabaseの新規プロジェクトに伴うproject-idなどは、すでに取得済みとします。




# Supabaseの .envデータのテンプレート

サーバー上でプロジェクトを作成したら、ダッシュボードから値を調べて書き込みます。

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





# Supabase CLI

Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/cli

ローカルにSupabaseのCLI (command line interface)をインストールします。

scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

アップデート
scoop update supabase

※頻繁にアップデートされるため、定期的にこのコマンドを実行することをお勧めします。


# Supabaseアクセストークン

ログインする前に
Supabaseのアクセストークンを取得します。
Supabaseアクセストークンの取得場所

https://app.supabase.com/account/tokens



# サーバーへのログイン
Supabaseのサーバーで作ったプロジェクトとの接続のために
ローカルPCからサーバーにログインします。

supabase login

ここでアクセストークンが必要です。
接続が切れるまでログインは1度だけで大丈夫です。

ログインできているかを確認します。

supabase projects list

作成したプロジェクト一覧が表示されていれば大丈夫です。


# サーバーとローカルのプロジェクトをリンク

ローカルとサーバーのそれぞれのプロジェクト同士を関連付けます。

supabase link

supabase link --project-ref [project-id] -p [データベースパスワード]
`supabase link --project-ref ******************** -p ************`

CI 環境などでデータベースのパスワードの入力を求められたくない場合は、
環境変数を使用できます。

SUPABASE_DB_PASSWORD

リンクに成功すれば、ローカルで開発したものをサーバー上にあげることが出来るようになります。

# Supabaseのインストール

Next.jsにsupabaseをインストールします。

supabase インストール

npm install supabase

次にSupabaseコンテナをつくります。
Docker Desktopをインストールをした後にDocker Desktopを立ち上げておきます。


# supabaseの初期化

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



# VSCode toml拡張機能

拡張子tomlのファイルを見やすくする拡張機能

自分はEven Better TOML v0.19.0を選びました。

選んだ理由

| 名前  | 前回のリリース日  | ★の数 | DL数 |
| --------- | ---------- |---------- | ---------- |
| Even Better TOML v0.19.0 | 2022/11/2 0:39:57        | ★★★★★| 455157 |
| Better TOML v0.3.2       | 2018/2/18 17:50:44       |★★★| 1703424 |

Even Better TOML - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml

を入れます。





# DockerDesktopを使用するための事前準備


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

※これらのコマンドを実行するとDB内の情報は完全にリセットされます。



# ローカルのSupabaseを始める

Supabaseのコンテナを作成し起動します。

supabase start

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

supabase statusでも上の環境変数（API URLやGraphQL URL等）が表示されます。

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



# マイグレーション

データベースのスキーマを変更するための仕組みです。マイグレーションを使用することで、データベースのスキーマをバージョン管理し、複数の開発者が同じデータベースを共有する際に、スキーマの整合性を保つことができます。

具体的には、マイグレーションでは、データベースのテーブルやカラムの追加、変更、削除などの操作を行うことができます。また、マイグレーションは、データベースの初期化や、サンプルデータの挿入などの操作も行うことができます。



# 最初のマイグレーションファイルの作成

まず、従業員テーブルを作成するために必要なSQLを格納するために、新しい空のマイグレーションファイルを作成します。

supabase migration new create_employees_table

このコマンドを実行すると
supabase\migrations ディレクトリ内に

空の
supabase\migrations\[タイムスタンプ]_create_employees_table.sql
ファイルが作成されます。

※空のファイルなので削除しても大丈夫です、

このファイルにSQL文を書いてリセットコマンドを実行すると、このSQL文を読んでテーブルが作成されSupabaseに反映されます。

SQL文やダッシュボードでポチポチと作成したテーブルをマイグレーションファイルに保存しないと、リセットコマンドを実行するとその変更は破棄されてしまいます。
保存しておきたい設定はマイグレーションファイルに保存しておく必要があります。



## supabase db reset コマンド

supabase db reset

このコマンドはローカルデータベースをクリーンな状態にリセットします。
データやスキーマの変更は破棄されます。

ローカルの Postgres コンテナを再作成し、supabase/migrations ディレクトリで見つかったすべてのローカルマイグレーションを適用します。

テストデータが supabase/seed.sql で定義されている場合、マイグレーションが実行された後にシードのデータがSupabaseに挿入されます。

# employeesテーブルを作成してみる。

SQL文で簡単なテーブルを作ってみます。

まずはローカルのダッシュボードを開いて、自分が作ったテーブルはまだないことを確認します。

ローカルダッシュボード
Studio URL

http://localhost:54323/project/default

サーバーダッシュボード

https://app.supabase.com/project/[project-id]

ローカルダッシュボードのTable editorを開いてテーブルがないのを確認しておきます。

先ほど新規作成した空のマイグレーションファイルに以下のSQLを追加します。

```supabase\migrations\[タイムスタンプ]_create_employees_table.sql
create table
employees (
	id bigint primary key generated always as identity,
	name text,
	email text,
	created_at timestamptz default now()
);



```

ここでリセットコマンド
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

そしてローカルダッシュボードの左サイドバーにあるTable editorを確認すると、テーブルが作られています。

ローカルでテーブルを作成する方法は
* SQL文をCLIからコマンドで作成する方法
* ローカルダッシュボードの左サイドバーにあるTable editorから作成する方法
* Postgresに対応したDBツール（星の数のごとくある）から操作する方法
などがあります。



このリセットコマンドは少々わかりにくいですが、
supabase db reset
を実行すると、現在Supabaseにあるsupabase/migrationsフォルダ内にあるSQL文を実行します。そうすることで、Supabaseにマイグレーションファイルに設定した設定が反映されます。

> 例えば、gitでcommitせずにcheckoutして変更をすべて放棄すると、最新のcommitしたところまで戻ります。
> git checkoutコマンドを使用して、コミットせずにブランチを切り替えると、現在のブランチの変更内容が破棄され、切り替え先のブランチの状態に移行します。つまり、変更内容が失われてしまいます。
このようにリセットコマンドはマイグレーションファイルに保存していない全ての変更を破棄して保存してあるすべてのマイグレーションファイルの状態に戻します。



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



# テーブル設計による変更点の差分を見る

マイグレーションファイルに保存したテーブルと、まだマイグレーションファイルに保存していないテーブルの差分を見る方法

まず、ダッシュボードの左サイドバーにあるTable editorからcitiesという新しいテーブルを作成し、id、created_at、name、updated_atというカラムを設定します。

これで、マイグレーションファイルに保存していないテーブルが出来ました。

この状態で次のコマンドを実行します。

supabase db diff --schema public



## supabase db diffコマンド

supabase db diff

実行例1

supabase db diff --schema public

とすると、マイグレーションファイルに保存していないテーブルが表示されます。

実行例2
supabase db diff -f [マイグレーションファイル]

supabase db diff -f testmigration01
とすると
supabase\migrations\20230621005817_testmigration01.sql
のようにmigrationsフォルダにマイグレーションファイルを作ってくれます。

続けてテーブル作成など何もせず、ファイル名だけ変えたsupabase db diffコマンドを実行すると。
supabase db diff -f testmigration02
差分がなにもないためにマイグレーションファイルは作成されません。



ローカルまたはサーバーのデータベースに対して行われたスキーマの変更を差分表示します。

サーバーまたはセルフホストデータベースに対して diff を実行する場合は、それぞれ --linked または --db-url フラグを指定します。

コンテナ内で djrobstep/migra を実行し、ターゲットデータベースとシャドウデータベース間のスキーマの相違を比較します。

シャドウデータベースは、別のコンテナでローカルのsupabase/migrationsディレクトリのマイグレーションを適用して作成されます。出力はデフォルトでstdoutに書き出されます。便宜上、-fフラグを渡すことで、スキーマの差分を新しいマイグレーションファイルとして保存することもできます。

デフォルトでは、ターゲットデータベースのすべてのスキーマが差分されます。スキーマのサブセットに差分を制限するには、-schema public,extensionsフラグを使用します。

Flags
-f, -ファイル <文字列
スキーマの差分を新しいマイグレーションファイルに保存します。

--linked
リンクされたプロジェクトに対してローカルスキーマを差分する。

-s, --schema <文字列>.
インクルードするスキーマのリストを表示します。

--use-migra
スキーマの差分を生成するためにmigraを使用します。

--use-pgadmin
スキーマの差分を生成するためにpgAdminを使用します。

--db-url <string>
指定されたデータベースURLを用いて接続する






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


## サーバーとのLink 

supabase link
を使用して、自分のローカルとサーバーのそれぞれのプロジェクトを関連付けます。

関連付けることでローカルのDBの状態をサーバーに反映させることができます。

supabase link --project-ref [project-id] -p [データベースパスワード]
`supabase link --project-ref ******************** -p ************`

CI 環境などでデータベースのパスワードの入力を求められたくない場合は、
環境変数を使用できます。
SUPABASE_DB_PASSWORD


プロジェクト同士をリンクをさせると双方のマイグレーションの状態がわかります。

supabase migration list

のコマンドを実行します。

※重要：このリストは、あくまでもローカル側から見たマイグレーション適用状況を示しています。
つまり、ローカルで実行したコマンドの結果が記録されているだけであり、サーバーでプロジェクトのテーブルを変更していた場合でも、このローカルのsupabase migration listにはまだ反映されていません。



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

お試しコマンド
supabase db push --dry-run

本番コマンド
supabase db push
を実行します。






### supabase/migrations ディレクトリ
ローカルのマイグレーションを保存、管理する場所

### supabase_migrations.schema_migrationsテーブル
サーバーのマイグレーションを保存、管理する場所


### supabase db pushコマンド

supabase linkを実行して、ローカルをサーバーにリンクさせる必要があります。セルフホスティングのデータベースの場合、-db-urlフラグを使用して接続パラメータを渡します。

このコマンドを初めて実行すると、
supabase_migrations.schema_migrations
にマイグレーション履歴テーブルが作成されます。

マイグレーションの適用に成功すると、タイムスタンプを一意なIDとして、マイグレーション履歴テーブルに新しい行が挿入されます。

それ以降のsupabase db pushは、適用済みのマイグレーションはスキップされます。


適用前に変更点のリストを見るには、-dry-runフラグを使用します。

フラグ
--dry-run
適用されるはずのマイグレーションを出力するが、実際には適用しない。
-p, --password <string> (パスワード<文字列>)
サーバーデータベースのパスワード。

--db-url <string>
指定されたデータベースのURLを使用して接続します。

##### マイグレーション履歴テーブルを変更するには？
migration repairコマンドを使用します。

マイグレーションを実際に実行せずに、既存のエントリーを削除したり、新しいエントリーを挿入したりするなど



参考
※supabase_migrations.schema_migrations＞＞ローカルとサーバーの同期がズレた時に





#### supabase db remoteコマンド

supabase db remote commit

サーバーからスキーマの変更を取得し、マイグレーション履歴テーブルに新しい行を挿入します。

supabase linkを実行し、ローカルプロジェクトをサーバーにリンクする必要があります。

セルフホストデータベースの場合、-db-urlフラグを使用して接続パラメータを渡すことができます。

マイグレーション履歴テーブルにエントリが存在しない場合、pg_dumpを使用して、作成したリモートスキーマのすべての内容をキャプチャします。

その後、マイグレーション履歴テーブルに新しいレコードが挿入されます。
このコマンドのその後の実行は、db diff -linkedと同様に、サーバーに対するスキーマの変更の差分のみを行います。

Flags
--db-url <string>
指定されたデータベースのURLを使用して接続する

-p, --password <string>
サーバーデータベースのパスワードを指定します。

-s, --schema <strings>
インクルードするスキーマのリスト。







### supabase migration list

ローカルとサーバーの両方のデータベースのマイグレーション履歴を一覧表示します。

supabase linkを実行し、ローカルプロジェクトをサーバーにリンクする必要があります。
セルフホスティングデータベースでは、-db-urlフラグを使用して接続パラメータを渡すことができます。

URL文字列はRFC 3986に従ってエスケープする必要があります。

ローカルなマイグレーションは supabase/migrations ディレクトリに保存され、
サーバーのマイグレーションは supabase_migrations.schema_migrations テーブルに追跡されます。

タイムスタンプのみが比較され、差異が特定されます。

ローカルとサーバーのマイグレーション履歴に不一致がある場合、
migration repairコマンドを使用して解決します。




### supabase db remote commitとsupabase db pushの違い

supabase db remote commit -p [Database Password]

サーバーの変更を、ローカルの supabase/migrationsフォルダに新しいマイグレーションファイルを作成します。

supabase db push -p [Database Password]

新しいマイグレーションをサーバーのデータベースにプッシュします。
また、–dry-run オプションを使用することで、このコマンドのリハーサルを行うことができます。















##### ローカルとサーバーの同期がズレた時に

ローカルとサーバーのマイグレーションがズレた場合には、以下の手順で対処することができます。

1. ローカルのマイグレーションファイルを削除する。

2. サーバーのsupabase_migrations.schema_migrationsテーブルのレコードを全て削除する。そのためには、以下のSQLクエリを実行します。
※削除コマンドを実行する時は注意してください。

`delete from supabase_migrations.schema_migrations;`

3. supabase db remote commitコマンドを使用して、サーバーとローカルをリンクし直します。

ただし、この手順は、サーバーに保存されているデータを全て削除するため、注意が必要です。また、この手順は、ローカルとサーバーのマイグレーションがズレた場合に限定されるため、通常のマイグレーションには使用できません。

※これはあくまでも手っ取り早く処理する方法であって取り扱いに注意する必要があります。。
※マイグレーションを1つづ丁寧に処理する方法もあります。











コマンドの説明から戻りまして、
supabase migration list
でどうなったかを見ます。

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



### Supabaseサーバーテーブルの豆知識
現在Supabaseではサーバー側には実装されているが、ローカル側にはまだない機能が複数あります。
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











----------------------------------------


# Supabaseクライアントの生成

```
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

```


## Supabaseクライアントの必須項目
supabaseUrl（必須）：プロジェクトダッシュボードで作成したときに提供される一意のSupabase URL。
supabaseKey（必須）：プロジェクトダッシュボードで作成したときに提供される一意のSupabaseキー。



## Supabaseクライアントのオプション項目

### authのオプション
認証オブジェクト

autoRefreshToken（オプション）
ログイン済みユーザーのトークンを自動的に更新するかどうかを指定するブール値。デフォルトはtrue。

detectSessionInUrl（オプション）
URLからセッションを検出するかどうかを指定するブール値。OAuthログインのコールバックに使用されます。デフォルトはtrue。


flowType（オプション）
flowTypeプロパティを使用することで、Supabaseクライアントが使用するOAuthフローを指定することができます。
デフォルトでは、implicit flowが使用されます。
デフォルトでは、implicit flowを使用します。

ただし、モバイルアプリケーションやサーバーサイドアプリケーションでは、PKCEが推奨されています。
PKCEを使用することで、より安全なOAuth認証を実現することができます。

OAuthフローは、認証サーバーとクライアントアプリケーション間での認証と認可を行うためのプロトコルです。

PKCE（Proof Key for Code Exchange）は、OAuth 2.0の認証フローの一つで、Webアプリケーションやモバイルアプリケーションなど、クライアントが公開されたクライアントシークレットを使用せずに、より安全な認証を実現するための仕組みです。

PKCEは、認証コードを取得する前に、ランダムな文字列（code_verifier）を生成し、ハッシュ関数を使用して変換した値（code_challenge）を作成します。このcode_challengeを、認証コードを取得する際に、認証サーバーに送信します。認証サーバーは、code_challengeを保存し、認証コードを発行します。その後、クライアントは、認証コードを使用してアクセストークンを取得するために、code_verifierを使用してcode_challengeを再計算し、認証サーバーに送信します。認証サーバーは、再計算されたcode_challengeと保存されたcode_challengeを比較し、一致する場合にのみアクセストークンを発行します。

このように、PKCEは、ランダムな文字列を使用して、認証コードを取得する前と後に、認証サーバーとクライアント間で秘密情報を共有することなく、より安全な認証を実現することができます。PKCEは、モバイルアプリケーションやサーバーサイドアプリケーションなど、公開されたクライアントシークレットを使用できない場合に特に有用です。

persistSession（オプション）：ログイン済みセッションをストレージに永続化するかどうかを指定するブール値。デフォルトはtrue。

storage（オプション）：ログイン済みセッションを保存するために使用されるストレージプロバイダー。

storageKey（オプション）：ローカルストレージにトークンを保存するために使用されるオプションのキー名。

### dbのオプション
テーブルが属するPostgresスキーマ。Supabaseで公開されているスキーマのリストに含まれている必要があります。デフォルトはpublicです。

schema（オプション）：スキーマ名。

### globalのオプション

fetch（オプション）：カスタムfetch実装。

headers（オプション）：クライアントを初期化するためのオプションヘッダー。

realtime（オプション）：realtime-jsインスタンスに渡されるオプション。







# Database Functions

作成方法
ダッシュボードから作成する。
SQLを使用して作成する。


Database Webhooks
データベースの変更をトリガーとして、外部のWebサービスに通知する仕組みです。データベースに変更があった場合、Webhookがトリガーされ、指定されたURLにHTTPリクエストが送信されます。外部のWebサービスは、このHTTPリクエストを受信して、データベースの変更に応じた処理を実行することができます。

例えば、データベースに新しいレコードが追加された場合、Webhookがトリガーされ、指定されたURLにHTTPリクエストが送信されます。外部のWebサービスは、このHTTPリクエストを受信して、新しいレコードを処理することができます。このように、Database Webhooksを使用することで、データベースの変更に応じたリアルタイムな処理を実現することができます。





# Supabaseの拡張機能







































----------------------------------------
----------------------------------------
----------------------------------------




# 以下調査中
※ここより下は調査中
調査中という名の書きかけの項目郡
完成したらこの位置よりも上に移動させて、
必要なさそうなら永遠に調査中

# Supabase CLI (調査中)

## Supabase CLI コマンドの全体像を把握する

全コマンドのリスト

Supabase CLI reference
https://supabase.com/docs/reference/cli/supabase-init

CLIのこれまで出てきた以外のコマンドを調査


### 全コマンド調査

```
06-21 05:31:05> supabase -h
Supabase CLI 1.68.6

Usage:
  supabase [command]

Local Development:
  db                   Manage local Postgres databases
  gen                  Run code generation tools
  init                 Initialize a local project
  inspect              Tools to inspect your Supabase Database
  link                 Link to a Supabase project
  login                Authenticate using an access token
  migration            Manage database migration scripts
  start                Start containers for Supabase local development
  status               Show status of local Supabase containers
  stop                 Stop all local Supabase containers
  test                 Run tests on local Supabase containers

Management APIs:
  domains              Manage custom domain names for Supabase projects
  functions            Manage Supabase Edge functions
  network-bans         Manage network bans
  network-restrictions Manage network restrictions
  orgs                 Manage Supabase organizations
  projects             Manage Supabase projects
  secrets              Manage Supabase secrets
  ssl-enforcement      Manage SSL enforcement configuration
  sso                  Manage Single Sign-On (SSO) authentication for projects
  vanity-subdomains    Manage vanity subdomains for Supabase projects

Additional Commands:
  completion           Generate the autocompletion script for the specified shell
  help                 Help about any command

Flags:
      --debug                             output debug logs to stderr
      --dns-resolver [ native | https ]   lookup domain names using the specified resolver (default native)
      --experimental                      enable experimental features
  -h, --help                              help for supabase
  -v, --version                           version for supabase
      --workdir string                    path to a Supabase project directory

Use "supabase [command] --help" for more information about a command.



```



全コマンド
ここから第2の引数を取るコマンドもありさらに派生し増えていく

#### ローカル用コマンド

supabase db
supabase gen
supabase init
supabase inspect
supabase link
supabase login
supabase migration
supabase start
supabase status
supabase stop
supabase test

ローカルPostgresデータベースの管理
コード生成ツールの実行
ローカルプロジェクトの初期化
Supabaseデータベースを検査するツール
Supabaseプロジェクトにリンクする
アクセストークンを使った認証
データベースマイグレーションスクリプトの管理
Supabaseのローカル開発用のコンテナを起動する
Supabaseのローカルコンテナのステータスを表示する
すべてのローカルSupabaseコンテナを停止する
ローカルSupabaseコンテナでテストを実行する



####管理用コマンド

supabase domains
supabase functions
supabase network-bans
supabase network-restrictions
supabase orgs
supabase projects
supabase secrets
supabase ssl-enforcement
supabase sso
supabase vanity-subdomains

ドメイン Supabaseプロジェクト用のカスタムドメイン名を管理する。
機能 Supabase Edgeの機能を管理する
ネットワーク禁止を管理する
network-restrictions ネットワークの制限を管理する
Supabaseの組織を管理する
projects Supabase のプロジェクトを管理する
secrets Supabase のシークレットを管理する
ssl-enforcement SSL の強制設定を管理します。
sso プロジェクトのシングルサインオン(SSO)認証の管理
バニティサブドメイン Supabaseプロジェクトのバニティサブドメインを管理します。



#### 追加コマンド

supabase completion
supabase -h

completion           Generate the autocompletion script for the specified shell
help                 Help about any command

シェル補完
ヘルプ














----------------------------------------




## ローカルの値をサーバーに反映させる方法

調査中
調査中
調査中
調査中
調査中





## Edge Functionsを導入する (調査中)

プロジェクトがEdge Functionsを使用している場合、functions deployを使用してこれらをデプロイすることができます：

supabase functions deploy <function_name>を使用します。

調査中
調査中
調査中
調査中
調査中

SupabaseのEdge Functionsは、サーバーレスなJavaScript関数を実行するための機能です。Edge Functionsを使用することで、フロントエンドから直接JavaScript関数を呼び出すことができます。これにより、サーバーサイドの処理をフロントエンド側で実行することができ、APIの呼び出し回数を減らすことができます。

具体的には、Edge Functionsを使用することで、以下のような処理を実行することができます。

フォームのバリデーション
メールの送信
ファイルのアップロード
外部APIの呼び出し
Edge Functionsは、SupabaseのインフラストラクチャーであるEdge Network上で実行されます。Edge Networkは、世界中に分散したエッジサーバーから構成されており、高速で安定した処理を実現することができます。また、Edge Functionsは、Supabaseの認証機能と連携することができるため、セキュアな処理を実現することができます。



## ローカルでAuthを使用する (調査中)

ローカルでAuthを使用するには、supabase initを実行した後に作成されるプロジェクトのsupabase/config.tomlファイルを更新します。必要なプロバイダを追加し、enabled を true に設定します。

config.toml

[auth.external.github] を追加します。
enabled = true
client_id = ""
secret = ""
これらの変更を有効にするには、supabase stopとsupabase startを再度実行する必要があります。

調査中
調査中
調査中
調査中
調査中



## ローカルログの有効化 (調査中)

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


### 制限事項および考慮事項
ローカル開発環境は、Supabase Platformほど機能が充実していません。ホストされたプラットフォームとローカル環境との間で同等になるように取り組んでいます。
以下は、その相違点です：

Functionsインターフェイスは近日公開予定です。
ダッシュボードでは、プロジェクトの設定を更新することはできません。これはCLIを使用して行う必要があります。
CLIのバージョンによって使用するローカルバージョンのStudioが決まるので、ローカルのSupabase CLIを最新に保つようにしてください。











## キーと型の生成

2つのコマンド

```
supabase gen keys
supabase gen types



```

キーと型の2種類


### 型の生成

例

まずsrc/typesフォルダを作成しておきます。

supabase gen types typescript --local > /src/types/database.types.ts

データベースの型が出来ます。



Flags
--db-url <string>
Generate types from a database url.

--linked
Generate types from the linked project.

--local
Generate types from the local dev database.

--project-id <string>
Generate types from a project ID.

--schema <stringArray>
Schemas to generate types for.





### キーの生成 (調査中)

supabase gen keys

Flags
-o, --output <[ env | json | toml | yaml ]>
Optional
no type
Output format of key variables.

Open accepted values
--override-name <strings>
Optional
no type
Override specific variable names.

--project-ref <string>
Optional
no type
Project ref of the Supabase project.

--experimental
REQUIRED
no type
enable experimental features


調査中




## supabase db  (調査中)

supabase db diff
supabase db dump
supabase db lint
supabase db push
supabase db remote
supabase db reset
supabase db start

diff        Diffs the local database for schema changes
dump        Dumps data or schemas from the remote database
lint        Checks local database for typing error
push        Push new migrations to the remote database
remote      Manage remote databases
reset       Resets the local database to current migrations
start       Starts local Postgres database



### supabase db dump  (調査中)

supabase db dump

サーバーからコンテンツをダンプします。

#### ダンプとは？
データベースやファイルシステムなどの情報を、別の場所にバックアップすることを指します。

データベースの場合、ダンプは、データベース内のテーブルやデータを、SQLファイルやバイナリファイルなどの形式でエクスポートすることを指します。

ダンプを取得することで、データのバックアップや移行、復元などが容易になります。



このコマンドの実行前に、
supabase link
を実行し、
ローカルプロジェクトをサーバーとリンクする必要があります。

セルフホスティングのデータベースの場合、-db-urlフラグを使用して接続パラメータを渡します。

Supabaseが管理するスキーマを除外するためのフラグを追加したコンテナ内でpg_dumpを実行します。

無視されるスキーマには、auth、stroage、および拡張機能によって作成されたスキーマです。

デフォルトのダンプには、データやカスタムロールは含まれていません。

これらの内容を明示的にダンプするには、--data-only および --role-only フラグのいずれかを指定します。

supabase db dumpコマンドでダンプファイルを作成することができますが、デフォルトではデータは含まれません。データを含めるには、--data-onlyフラグを指定する必要があります。ダンプファイルを作成した後、テキストエディタなどでファイルを開いて、テーブル内のデータを確認することができます。ただし、ダンプファイルはテキスト形式であるため、大量のデータが含まれる場合は、ファイルの読み込みに時間がかかる可能性があります。





supabase db dump --role-only > rolo-only.txt

↓下記に出力されます 
supabase\rolo-only.txt



supabase db dump --role-only -f rolo-only2.txt

↓下記に出力されます 
rolo-only2.txt





supabase db dump --data-only > data-only.txt

↓下記に出力されます 
supabase\data-only.txt



supabase db dump --data-only -f data-only2.txt

↓下記に出力されます 
data-only2.txt





### supabase db lint (調査中)

supabase db lint



スキーマエラーのためにローカルデータベースをリントします。

ローカルデータベースに対するリントを行うには、ローカルSupabaseコンテナが動作している必要があります。

サーバーまたはセルフホスティングのデータベースに対してリントを行うには、それぞれ --linked または --db-url フラグを指定します。

ローカルのPostgresコンテナでplpgsql_check拡張を実行し、すべてのスキーマにエラーがないかチェックします。


特定のスキーマのみに対するリントを行うには、--schemaフラグを渡します。

Flags
--level <[ warning | error ]>
エラーレベルを表示する。

--linked
リンク先のプロジェクトにスキーマエラーがないかリントする。

-s, --schema <strings>
インクルードするスキーマをリストアップする。

--db-url <string>
指定されたデータベースのURLを用いて接続する










## supabase migration関連


### supabase migration new

使用例
supabase migration new schema_test


スーパベースマイグレーション新規作成
ローカルに新しいマイグレーションファイルを作成します。

現在のワークディレクトリにsupabase/migrationsディレクトリが存在しない場合、そのディレクトリが作成されます。
すべてのスキーママイグレーションファイルはこのディレクトリに <timestamp>_<name>.sql というパターンで作成されます。

db diffのような他のコマンドからの出力は、stdinを介してmigration new <name>にパイプされるかもしれません。











### supabase migration repair

サーバーのマイグレーション履歴テーブルを修復する。

supabase linkを実行して、ローカルをサーバーのデータベースとリンクする必要があります。

ローカルとサーバーのマイグレーション履歴が同期していない場合、
特定のマイグレーションを
 --status applied
または
--status reverted
とマークすることでサーバーの履歴を修復することができます。
元に戻すと、マイグレーション履歴テーブルから既存のレコードが削除され、適用とマークすると、新しいレコードが挿入されます。

例えば、
supabase db remote commit
を初めて実行した後、マイグレーション履歴テーブルは次のようになります。

使用例

supabase migration list

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230103054303 │ 20230103054303 │ 2023-01-03 05:43:03



```



マイグレーション履歴をクリーンな状態に戻すには、まず、ローカルのマイグレーションファイルを削除します。



rm supabase/migrations/20230103054303_remote_commit.sql



supabase migration list

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
                   │ 20230103054303 │ 2023-01-03 05:43:03



```

次に、サーバーのマイグレーション20230103054303を元に戻したとしてマークします。



supabase migration repair 20230103054303 --status reverted
このコマンドを実行すると
Repaired migration history: 20230103054303 => reverted
と返ってきます。



supabase migration list

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────



```



これで、再び
supabase db remote commit
を実行して、サーバーのスキーマをローカルマイグレーションファイルとしてダンプすることができます。


Flags
--db-url <string>
-p, --password <string>
--status <[ applied | reverted ]>










### supabase migration up

supabase migration up

保留中のマイグレーションをローカルデータベースに適用する


### supabase projects

#### supabase projects create
プロジェクトの作成

Flags
--db-password <string>
-i, --interactive
--org-id <string>
--plan <[ free | pro ]>
--region <string>


#### supabase projects list

プロジェクトの一覧







### supabase orgs

Supabase組織の管理

supabase orgs list

```
06-20 16:46:38> supabase orgs list


            ID         │          NAME
  ─────────────────────┼──────────────────────────
    cute-********-*******uq │ Supabase_***********a



```





### supabase functions

#### supabase functions new

ローカルで新しい関数を作成する

使用例
supabase functions new <Function name>



#### supabase functions download

リンク先のSupabaseプロジェクトよりFunctionのソースコードをダウンロードする。

Flags
--project-ref <string>

使用例
supabase functions download <Function name> [flags]



#### supabase functions serve

？？？
すべての機能をローカルに提供する

使用例
supabase functions serve <Function name> [flags]



Flags
--env-file <string>
Functionの環境に設定するenvファイルへのパス。

--import-map <string>
Path to import map file.
？？？

--no-verify-jwt
ファンクションのJWT検証を無効にします。


#### supabase functions deploy

リンク先のSupabaseプロジェクトにFunctionをデプロイする。

使用例
supabase functions deploy <Function name> [flags]



Flags
--import-map <string>
Path to import map file.
？？？


--no-verify-jwt
ファンクションのJWT検証を無効にします。

--project-ref <string>
Project ref of the Supabase project.
？？？





#### supabase functions delete

リンク先のSupabaseプロジェクトからFunctionを削除します。
ローカルのファンクションは削除しません。

使用例
supabase functions delete <Function name> [flags]

Flags
--project-ref <string>
Project ref of the Supabase project.
？？？




### supabase secrets

#### supabase secrets set

リンク先のSupabaseプロジェクトにシークレット（複数可）を設定します。
？？？

使用例
supabase secrets set [flags] <NAME=VALUE> ...

Flags
--env-file <string>
.env ファイルからシークレットを読み取ります。

--project-ref <string>
Project ref of the Supabase project.
？？？


#### supabase secrets list
リンクされたプロジェクト内のすべてのシークレットをリストします。

使用例
supabase secrets list

```
06-20 21:28:42> supabase secrets list


    NAME │ DIGEST
  ───────┼─────────




```


Flags
--project-ref <string>
Project ref of the Supabase project.
？？？


#### supabase secrets unset

リンクされた Supabase プロジェクトからシークレットの設定を解除します。

使用例
supabase secrets unset <NAME> ...



Flags
--project-ref <string>
Project ref of the Supabase project.
？？？




### supabase sso

Supabase プロジェクトの SSO 認証を管理します。

SSOって何？

Flags
--project-ref <string>
REQUIRED
string
Project ref of the Supabase project.

--output [ pretty | json | yaml | toml ]
Optional
[ pretty | json | yaml | toml ]
Output format of the command, useful when using the CLI in scripts or CI workflows.
コマンドの出力形式。スクリプトやCIワークフローでCLIを使用する場合に便利です。



#### supabase sso list

SupabaseプロジェクトへのSSO IDプロバイダへの接続をすべてリストアップします。


#### supabase sso show

supabase sso show <provider-id>

使用例
supabase sso show 6df4*******************ea5 \
  --project-ref abcdefghijklmnopqrst



ID プロバイダへの確立された接続に関する情報を提供します。--metadata を使用すると、プロジェクトの構成に保存されている生の SAML 2.0 メタデータ XML ドキュメントを取得できます。



#### supabase sso add

SSOアイデンティティプロバイダへの新しい接続をSupabaseプロジェクトに追加して設定します。


Flags
--project-ref <string>
REQUIRED
string
Project ref of the Supabase project.

--output [ pretty | json | yaml | toml ]
Optional
[ pretty | json | yaml | toml ]
Output format of the command, useful when using the CLI in scripts or CI workflows.


Open accepted values

--type saml
REQUIRED
string
追加されるIDプロバイダのタイプ。現時点ではSAML 2.0のみがサポートされています。


Open accepted values
--metadata-url <URL>
REQUIRED
string
追加される ID プロバイダがサポートする SAML 機能を記述した SAML 2.0 メタデータ XML 文書を指す URL（通常は HTTPS）です。metadata-fileと相互に排他的です。



--metadata-file <path to file>
REQUIRED
string
追加する ID プロバイダがサポートする SAML 機能を記述した SAML 2.0 メタデータ XML ドキュメントを含むファイルへのパス。可能であれば、-metadata-url を使用することをお勧めします。metadata-urlとは相互に排他的です。



domains
Optional
string
この ID プロバイダーと関連付ける電子メールドメインのカンマ区切りリストです。ユーザーの電子メールアドレスに基づいて正しいIDプロバイダを特定することにより、フロントエンドでユーザーを素早くサインインさせるために使用します。



attribute-mapping-file
Optional
string
この ID プロバイダに添付される属性マッピングを記述した JSON 文書を含むファイル。SAML アサーションに含まれるユーザ情報は、この文書で規定される規則に従ってマッピングされます。

```
supabase sso add \
  --project-ref abcdefgijklmnopqrst \
  --type saml \
  --metadata-url 'https://...' \
  --domains company.com


```


#### supabase sso update

すでに追加されている SSO ID プロバイダーの構成設定を更新します。

Flags
--project-ref <string>
REQUIRED
string
Project ref of the Supabase project.
？？？



--output [ pretty | json | yaml | toml ]
Optional
[ pretty | json | yaml | toml ]
コマンドの出力形式。スクリプトやCIワークフローでCLIを使用する場合に便利です。



Open accepted values

--metadata-url <URL>
Optional
string
追加される ID プロバイダがサポートする SAML 機能を記述した SAML 2.0 メタデータ XML 文書を指す URL（通常は HTTPS）です。metadata-fileと相互に排他的です。



--metadata-file <path to file>
Optional
string
追加する ID プロバイダがサポートする SAML 機能を記述した SAML 2.0 メタデータ XML ドキュメントを含むファイルへのパス。可能であれば、-metadata-url を使用することをお勧めします。metadata-urlとは相互に排他的です。



domains
Optional
string
この ID プロバイダーと関連付ける電子メールドメインのカンマ区切りリストです。ユーザーの電子メールアドレスに基づいて正しいIDプロバイダを特定することにより、フロントエンドでユーザーを迅速にサインインさせるために使用されます。指定すると、IDプロバイダに既に接続されているすべてのドメインが、このリストに置き換えられます。



add-domains
Optional
no type
これらの追加の電子メールドメインを既存のドメインセットに関連付けます。詳細な説明については、-domainsを参照してください。



remove-domains
Optional
no type
既存のドメインセットから、これらの電子メールドメインを削除します。詳細な説明については、-domainsを参照してください。



attribute-mapping-file
Optional
string
この ID プロバイダに添付される属性マッピングを記述した JSON 文書を含むファイル。SAML アサーションに含まれるユーザ情報は、この文書で規定される規則に従ってマッピングされる。



Replace domains

```
supabase sso update 6df******************************ea5 \
  --project-ref abcdefghijklmnopqrst \
  --domains new-company.com,new-company.net


```

#### supabase sso remove

既に追加されているSSO IDプロバイダーへの接続を削除します。プロバイダーを削除すると、既存のユーザーはログインできなくなります。このコマンドは慎重に扱ってください。




#### supabase sso info

使用例
supabase sso info --project-ref abcdefghijklmnopqrst



プロジェクトがSAML 2.0互換のIDプロバイダーに登録されるために必要な、重要なSSO情報をすべて返します。






### supabase domains (未調査)

Supabaseプロジェクトのカスタムドメイン名を管理します。

カスタムドメインとバニティサブドメインの使用は相互に排他的です。

？？？



supabase domains activate
supabase domains create
supabase domains delete
supabase domains get
supabase domains reverify





### supabase vanity-subdomains (未調査)

supabase vanity subdomains activate
supabase vanity subdomains check availability
supabase vanity subdomains delete
supabase vanity subdomains get



### supabase network-bans

ネットワーク禁止は、トラフィックパターンが不正に見える場合に一時的にブロックされるIPです（例：複数の認証試行失敗）。

サブコマンドを使用すると、現在の禁止を表示し、必要に応じてIPのブロックを解除することができます。

supabase network bans get
supabase network bans remove




### supabase network-restrictions

supabase network restrictions get
supabase network restrictions update



### supabase ssl-enforcement

supabase ssl enforcement get
supabase ssl enforcement update

supabase ssl-enforcement get
supabase ssl-enforcement update [flags]



### supabase completion

指定されたシェルの supabase 用のオートコンプリートスクリプトを生成する。
生成されたスクリプトの使用方法の詳細については、各サブコマンドのヘルプを参照してください。

supabase completion bash
supabase completion fish
supabase completion powershell
supabase completion zsh






























supabase db start （ドキュメントに説明無し）













## ツールによるクライアント接続

DBeaver

postgresql://{ユーザー名:パスワード}@{ホスト名}:{ポート番号}/{DB名}。
postgres://postgres:postgres@localhost:5432/postgres






調査中



## 認証＆認可

認証はmiddleware.jsで行って
認可はRLSで行うのが
基本的な考え方になるのか？

認証は誰であるかを証明し
認可はその人が何ができるかを証明する









## ローカルデータベースのテスト

ローカルデータベースに対して pgTAP テストを実行します。
supabase start
でSupabaseを起動させておく必要があります。


最初に、テストファイルを作成します。

supabase test new

例
テストファイル名:abc
とする。

```
06-20 16:17:11> supabase test new abc
Created new pgtap test at supabase\tests\abc_test.sql.



```

supabase\tests\abc_test.sql
ここにテストファイルが出来ました。

このまま動かしてみます。

```
06-20 16:17:41> supabase test db
psql:supabase/tests/abc_test.sql:6: ERROR:  # No tests run!

CONTEXT:  PL/pgSQL function _finish(integer,integer,integer,boolean) line 12 at RAISE
SQL function "finish" statement 1
supabase/tests/abc_test.sql ..
Dubious, test returned 3 (wstat 768, 0x300)
Failed 1/1 subtests

Test Summary Report
-------------------
supabase/tests/abc_test.sql (Wstat: 768 Tests: 0 Failed: 0)
  Non-zero exit status: 3
  Parse errors: Bad plan.  You planned 1 tests but ran 0.
Files=1, Tests=0,  0 wallclock secs ( 0.03 usr  0.00 sys +  0.02 cusr  0.01 csys =  0.06 CPU)
Result: FAIL
Error: error executing command
Try rerunning the command with --debug to troubleshoot the error.

```

失敗したようだ

pgTAP: Documentation
https://pgtap.org/documentation.html

要調査
要調査
要調査
要調査
要調査



supabase/testsディレクトリからマウントされたユニットテストファイルのボリュームを持つコンテナ内でpg_proveを実行します。テストファイルのサフィックスは.sqlまたは.pgのいずれかの拡張子にすることができます。

各テストは独自のトランザクションに包まれているため、成功や失敗にかかわらず、個別にロールバックされます。






# Supabase CLIから消えたコマンド

supabase db remote set

Linkコマンドを使うので
setする必要がなくなり
消えたみたいだ


# RLS

Row Level Security | Supabase Docs

https://supabase.com/docs/guides/auth/row-level-security






# 参考

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

https://zenn.dev/slowhand/articles/209699774226af

