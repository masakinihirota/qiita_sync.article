<!--
title:   Supabase ローカル開発環境 ＋ サーバー運用 2023年9月 (with Next.js 13 App router)
tags:    Docker,Next.js,PostgreSQL,Supabase
id:      be94b4c74a7850a4b79c
private: false
-->

# 重要コマンド

Supabase CLIのアップデート
現在 2023年9月18日 supabase CLI 1.93.0
scoop update supabase

## ローカル、サーバー問わず、Supabaseのダッシュボードからテーブルに変更を加えた時

現在のDBの状態(＝スキーマ)と、マイグレーションファイル に記録されているスキーマとの差分を取ります。

supabase db diff -f 接尾辞

※通常は-f フラグを使用して接尾辞を追加してマイグレーションファイルに出力します。

↓サーバー(＝リンク先のプロジェクト)に対しての、ローカルのマイグレーションファイルに記録されているスキーマとの差分を取ります。

supabase db diff --linked -f 接尾辞



# サーバーと繋がっているかの確認

supabase projects list

↑プロジェクトのリストが取得できていればサーバーと繋がっています。
(Supabaseを起動しているNext.jsアプリのRoot直下でなくても大丈夫です。)


# ローカルでのSupabaseのコンテナの操作

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



# マイグレーションリストの操作

↓REMOTE側の削除方法
supabase migration repair 20230918014029 --status reverted

↓REMOTE側の挿入方法
supabase migration repair 20230918014029 --status applied

※数字はマイグレーションファイルのタイムスタンプ部分です。

ローカル側はマイグレーションファイル自体を削除すれば消えます。



# ローカル側のスキーマを サーバーに反映

supabase db push



# サーバー側のスキーマを ローカルに反映

supabase db pull



# DB内のデータの保存

リモートデータベースからコンテンツをダンプします。



## スキーマのみ

supabase db dump -f supabase/schema.sql



## データのみ

supabase db dump -f supabase/seed.sql --data-only

データの保存、バックアップはデータベース管理ツールを使用します。



# バックアップ＆リストア データベース管理ツール

pgAdmin4
DBeaver

↑この2つが候補です。



# 重要URL

ローカルダッシュボード
Studio URL
http://localhost:54323/project/default

サーバーダッシュボード
https://app.supabase.com/project/[project-id]

アクセストークン
Supabase | Supabase
https://app.supabase.com/account/tokens



# 重要ルール

マイグレーションファイルを削除したら、リセットコマンドを実行するか再起動します。
そのままにしておくと、サーバーとの同期が崩れて後々大変なことになります。

SQL文を書き換えたり、SQL文エラーだったら修正すれば大丈夫です。



----------------------------------------

# 前提条件
React、Next.jsの基礎知識
DBの基礎知識
git、GitHubの基礎知識
Supabaseのアカウント作成、新規プロジェクト、環境変数
等はすでに取得済みとします。



----------------------------------------

# リンク

## CLIドキュメント

ローカル開発関連

Local Dev with CLI | Supabase Docs
https://supabase.com/docs/guides/cli

https://supabase.com/docs/reference/cli/supabase-init


## 開発時のURL

ローカルダッシュボード
Studio URL
http://localhost:54323/project/default

サーバーダッシュボード
https://app.supabase.com/project/[project-id]

※[project-id] ここに自分のproject-idを入れてください。

サーバープロジェクトリスト
https://app.supabase.com/projects
※projectsは複数形になっています。



## Supabaseローカル開発 URL

公式ドキュメント
Local Development | Supabase Docs

https://supabase.com/docs/guides/getting-started/local-development



# 環境

Windows 10
Powershell
VSCode
Git
GitHub
Supabase
Docker Desktop
Vercel

Next.js 13 App router
TailwindCSS

データベース管理ツール
pgAdmin4
DBeaver




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

# この記事の目的

## Supabase環境構築関連

Supabaseのサーバー本番運用環境を構築する。
Supabaseのローカル開発環境を構築する。
Next.jsをローカルで開発をする
サーバーにデプロイする。
サーバで本番運用する。

手順

サーバーでSupabaseのプロジェクトを作成
ローカルで開発環境を作成
サーバーのデータをローカルに反映させる。
サーバーでバックアップを取る
ローカルでバックアップを取る

ローカルをリストアする。
サーバーをリストアする。
直接 or 間接(ローカルでリストアしたものをPUSH？)



----------------------------------------


全体の構成

# サーバーにSupabaseの新規にプロジェクトを作成

# ローカルにNext.js + Supabaseのアプリをインストール。

# ローカルにDockerをインストール。

# Dockerを利用してローカルにSupabaseのプロジェクトを作成

# ローカルでSupabaseを動かすために Supabase CLIをインストール

# ローカルでの基本動作

# サーバーの様々データをローカルに反映させる

# サーバーとローカルで同期を取る

# Supabaseのバックアップ

## サーバーをバックアップ

## ローカルをバックアップ

# Supabaseのリストア

## サーバーをバックアップデータからリストア

## ローカルをバックアップデータからリストア

# Supabase CLIのコマンドの調査

Webアプリで使うのに最低限必要なコマンド




----------------------------------------


# サーバーにSupabaseの新規にプロジェクトを作成

Supabaseのダッシュボードを開きます。

https://supabase.com/dashboard/projects

緑色ボタンの New projectを押してプロジェクトを作成します。


Name [適当な名前を入力]local_dev
Database Password (********)

Region 自分の住む所から一番近い場所


Create new projectボタンを押す。


Supabaseのデータを取得します。



```
Supabaseプロジェクト
組織 Organization

Name
local_dev

Database Password
*****

Region
Northeast Asia (Tokyo)

左サイドバーにある Project setting から

Project Settings > General
Reference ID (=project-id)
ezxablkaqwpwmyoggipe

Project Setting > API > Project URL
https://ezxablkaqwpwmyoggipe.supabase.co

Project Setting > API > Project API keys > anon public
eyJh*****************eEg

Project Setting > API > Project API keys > service_role secret
eyJ******************HOs

Project Setting > API > JWT Settings > JWT Secret
eyU*****************A==

アクセストークン
Supabase | Supabase
https://app.supabase.com/account/tokens

```





# ローカルにNext.js + Supabaseの Next.jsアプリ をインストール。

next.js/examples/with-supabase at canary · vercel/next.js
https://github.com/vercel/next.js/tree/canary/examples/with-supabase

Use Supabase with Next.js | Supabase Docs
https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

このページの Next.jsアプリ を利用します。



1.

SupabaseのダッシュボードのSQL Editorへ行き

```
 -- Create the table
 create table countries (
   id serial primary key,
   name text not null
 );

 -- Insert some sample data into the table
 insert into countries (name) values ('United States');
 insert into countries (name) values ('Canada');
 insert into countries (name) values ('Mexico');

```

↑このコードを貼り付けて 右下のRUN CTRLボタンを押します。

Success. No rows returnedがでたら成功です。



2.

PC内の適当な場所で

npx create-next-app -e with-supabase my-app && cd my-app

※名前my-appは適当に変えてください。



3.

.env.local.example
を
.env.local
に変更します。

```.env.local
# Update these with your Supabase details from your project settings > API
# https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```

your-project-urlは
https://ezxablkaqwpwmyoggipe.supabase.co

your-anon-keyは
eyJh*****************eEg
に相当します。
自分の環境値を入力してください。



4.

新しいファイルを作成します。
mkdir app/countries
touch app/countries/page.tsx

```app/countries/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from("countries").select();

  return (
    <ul className="my-auto text-foreground">
      {countries?.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
}

```



5.

npm run dev

http://localhost:3000/countries

↑countriesページを開いて

```
United States
Canada
Mexico

```

画面に↑が表示されていたら、Next.js経由でSupabaseからデータを取得できています。

これでNext.jsとSupabaseの必要最低限の動作確認が出来ました。



----------------------------------------

VSCodeでgitをコミットしておきます。

「必要最低限の動作確認」

git checkout -b local_dev

↑このコマンドでgitのブランチlocal_devを新規に作成して、このブランチに移動します。

これからはローカルの開発ブランチで作成して、テストして
テストが成功したら。
mainブランチに移動してlocal_devブランチをマージして
mainブランチをGitHubにpushして
GitHubを監視してもらっているVercelで自動でプロイしてもらいます。
そして開発ブランチlocal_devに戻って開発を続けます。

そうすればVSCodeからpusuするたびに自動でインターネットに公開されることになります。

(これで最低限のテスト駆動開発らしきものを動かせます。)



----------------------------------------

# ローカルにDockerをインストール。

Docker Desktop
Docker Desktop: The #1 Containerization Tool for Developers | Docker

https://www.docker.com/products/docker-desktop/

Download for windowsをインストールします。
Docker Desktopを立ち上げます。



Dockerを以前使っていた場合、それらは不要なので一新します。
※この作業は過去のすべてのデータを削除して０から始めるやり方です。

```

コンテナ起動中のものだけを表示します。
docker container ls

コンテナ停止中のもの含めて全部表示します。
docker container ls -a

他の起動中のコンテナもすべて停止します。
docker stop $(docker ps -q)

コンテナをすべて削除 (rmコマンドは起動中のものは削除できない)します。
docker rm $(docker ps -aq)

未使用のVolumeを一括削除します。
docker volume prune

```

※これらのコマンドを実行するとDB内の情報は完全にリセットされます。
コンテナの利点はすぐに立ち上げ、削除ができる事なので気にせず削除、再利用します。



# Dockerを利用してローカルにSupabaseのプロジェクトを作成

CLI と GitHub Action
Local Dev with CLI | Supabase Docs
https://supabase.com/docs/guides/cli

ローカル開発
Local Development | Supabase Docs
https://supabase.com/docs/guides/cli/local-development

CLIドキュメント
Supabase CLI reference
https://supabase.com/docs/reference/cli/introduction

GitHub Action
supabase/setup-cli: A GitHub action for interacting with your Supabase projects using the CLI.
https://github.com/supabase/setup-cli



> Supabase CLIは、ローカルでプロジェクトを開発し、Supabaseプラットフォームへデプロイするためのツールを提供します。
CLIはまだ開発中ですが、SupabaseプロジェクトとSupabaseプラットフォームを操作するためのすべての機能を含んでいます。

Supabaseをローカルで実行: supabase init および supabase start

データベースのマイグレーションを管理する: supabase migration

CI/CDによる本番環境へのリリース: supabase db push

Supabaseプロジェクトの管理: supabase projects

データベーススキーマから型を直接生成する: supabase gen types

コミュニティがサポートするTypeScript型を生成するGitHub Action

シェルオートコンプリート: supabase completion

その他






# ローカルでSupabaseを動かすために Supabase CLIをインストール

Supabase CLI | Supabase Docs
https://supabase.com/docs/guides/cli/getting-started


Windows用の Supabase CLI をインストールします。

```
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

scoop update supabase


```





# ローカルでの基本動作

先程動作確認したNext.jsのルートから

Local Development | Supabase Docs

https://supabase.com/docs/guides/cli/local-development

```
supabase login

```

※アクセストークンが必要です。

Supabaseアクセストークンの取得場所

https://app.supabase.com/account/tokens



> Finished supabase login.
と成功したら

supabase projects list

※↑これでサーバー側で作られているプロジェクトのリストが見れます。

作成したプロジェクト一覧が表示されていれば大丈夫です。




supabase init

※Generate VS Code workspace settings? [y/N]
VSCode workspaceは今回不要なのでN（デフォルト値）を押します。

初期化したので
supabase\seed.sql

```supabase\seed.sql

```
は空ファイルになりました。



> Finished supabase init.
と成功したら

supabase start

※初めてこのコマンドを利用する場合、Dockerイメージ等をダウンロードしてくるのでしばらく時間がかかります。



```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ****************************_I0
service_role key: ey*****************************U

```



↑これをもう一度見たい場合は

supabase status

で再度表示されます。



DockerのSupabaseコンテナを止める場合基本的に２つの方法があります。

これまでの記録を、
Dockerのvolumeに保存する場合

supabase stop

Dockerのvolumeに保存しない場合

supabase stop --no-backup

※volumeに保存しておくと、スキーマやDBのデータ等も保存されます。



これでサーバーとローカル両方でプロジェクトを作ったので連携させます。



## サーバーとローカルのプロジェクトをリンク

ローカルとサーバーのそれぞれのプロジェクト同士を関連付けます。

supabase link --project-ref [project-id] -p [データベースパスワード]

成功すると、
>Finished supabase link.

※CI 環境などでデータベースのパスワードの入力を求められたくない場合は、
環境変数を使用できます。VercelなどにSupabaseと連携して環境変数を登録して使います。

リンクに成功すれば、ローカルで開発したものをサーバー上にあげる事が出来るようになります。

プロジェクト同士をリンクをさせると双方のマイグレーションの状態がわかります。


## supabase migration list

ローカルとサーバーの両方のデータベースのマイグレーション履歴を一覧表示します。

supabase linkを実行し、ローカルプロジェクトをサーバーにリンクする必要があります。
セルフホスティングデータベースでは、-db-urlフラグを使用して接続パラメータを渡すことができます。

URL文字列はRFC 3986に従ってエスケープする必要があります。

ローカルなマイグレーションは supabase/migrations ディレクトリに保存され、
サーバーのマイグレーションは supabase_migrations.schema_migrations テーブルに追跡されます。

タイムスタンプのみが比較され、差異が特定されます。

ローカルとサーバーのマイグレーション履歴に不一致がある場合、
migration repairコマンドを使用して解決します。



supabase migration list を実行すると、↓このように表示されます。

```
> supabase migration list

        LOCAL      │ REMOTE │     TIME (UTC)
  ─────────────────┼────────┼─────────
    20230918014029 │        │ 2023-09-18 01:40:29

```

※重要：このリストは、あくまでもローカル側から見たマイグレーション適用状況を示しています。
つまり、ローカルで実行したコマンドの結果が記録されているだけであり、サーバーでプロジェクトのテーブルを変更していた場合でも、このローカルの supabase migration list にはまだ反映されていません。










# サーバーとローカルで同期を取る

最初にサーバーとリモートの同期をとります。


人間の手で一致させます。

まず現状を把握します。


supabase migration list

```
        LOCAL      │ REMOTE │     TIME (UTC)
  ─────────────────┼────────┼──────────────────────
    20230618024722 │        │ 2023-06-18 02:47:22

```

※↑出力は環境等によって変わります。

ローカルの 20230618024722 は初期化時の説明用にマイグレーションファイルが作成されています。

マイグレーションファイルの場所
supabase\migrations
ここに
supabase\migrations\20230618024722_init.sql
が置いてあるので、削除します。

supabase db reset
を実行してマイグレーションファイルの状況を反映させます。



## supabase db reset コマンド

supabase db reset

このコマンドはローカルデータベースをクリーンな状態にリセットします。
データやスキーマの変更は破棄されます。

ローカルの Postgres コンテナを再作成し、supabase/migrations ディレクトリで見つかったすべてのローカルマイグレーションを適用します。

テストデータが supabase/seed.sql で定義されている場合、マイグレーションが実行された後にシードのデータがSupabaseに挿入されます。











このように不要になったマイグレーションファイルを削除したら
１動作毎（複数のマイグレーションファイルを同時に削除等）に
supabase db reset
↑このコマンドを実行しておくと、後々のトラブルが減ります。

例えば、マイグレーションファイルを削除してから、マイグレーションファイルを作成してそれを反映させるために
supabase db reset
を実行しても整合性が取れなくて、エラーになることがありました。
そんな時はSupabaseを再起動させます。
supabase stop
supabase start



もう一度実行すると
supabase migration list

```
    LOCAL │ REMOTE │ TIME (UTC)
  ────────┼────────┼─────────────

```

ローカルにもサーバーにも何もない状態です。

※しかし、これまでサーバー側でNext.jsのサンプルを動かして、動作確認しているはずです。

つまり
supabase migration list
のコマンドはローカルからみたマイグレーションの状況をみていることになります。
supabase migration list
のコマンドは、サーバー側に問い合わせている結果ではなく、ローカル側で記録されているマイグレーションの状況でしかありません。


つまり、現在 ↑REMOTE の状態と、サーバーのプロジェクトのスキーマは一致していません。

そこで サーバー側のスキーマを ローカルに反映させます。

supabase db pull

```
Connecting to remote database...
Schema written to supabase\migrations\20230918014029_remote_schema.sql
Update remote migration history table? [Y/n]
Finished supabase db pull.

```

>Finished supabase db pull.
と表示されたので成功です。



supabase\migrations\20230918014029_remote_schema.sql
というファイルが出来ています。

```supabase\migrations\20230918014029_remote_schema.sql

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

中身を読んでみると、

```
CREATE TABLE IF NOT EXISTS "public"."countries" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);

```

先程Next.jsで作った countries テーブルを作るSQL文が書いてあります。

つまりサーバーのSQL文がローカルに反映されています。

ローカル側の特徴として
マイグレーションファイルだけでは駄目で
マイグレーションファイルを作った後、コマンドを使ってSupabaseのDBに反映させる必要があります。


----------------------------------------

supabase db reset

↑このコマンドは 開発中とっても有能で、
ローカルのSupabaseダッシュボードからテーブルをいじったり、
SQL文やSeedファイルにデータをいろいろ触っても
このコマンド１つで、すべてマイグレーションファイルと、Seedファイルの通りに元に戻してくれます。

なので、逆にマイグレーションファイルを削除したら、削除した部分のスキーマをSupabaseのDBから消すことも出来ます。

ローカルで開発するには最も重宝するコマンドの一つです。

マイグレーションファイルを作成することは、
編集したテキストファイルを保存するのに似ています。
DBに色々と変更したことをまとめて記録するからです。

マイグレーションファイルを消すということは、
編集したテキストファイルを保存しないで、ファイルを閉じるのに似ています。

supabase\migrationsに置いてあるスキーマファイルのとおりにDBの構造を維持してねという考え方なので。この場所がDB設計のすべてが置いてあります。
なのでここでスキーマファイルをゼロにすると、DBの設計は空白になります。

しかし、このコマンドでエラーが出てしまったら

supabase stop
supabase start

とDockerを再起動させてみてください。

エラーの原因はマイグレーションファイルを削除したり、編集したり、整合性が取れていなかった時に出る場合があります。
その時はエラーメッセージを見て判断してください。

※マイグレーション関連でエラーがでたら一通りエラーを眺めて、対処できそうになかったら再起動をしてみてください。マイグレーションファイルの中が正常だったなら新しくマイグレーションが適用されたSupabaseが立ち上がります。

DBの中身を保存したくない時は
supabase stop --no-backup
を実行してDockerを停止させます。



----------------------------------------



現状を把握してみます。

supabase migration list

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230918014029 │ 20230918014029 │ 2023-09-18 01:40:29

```

LOCAL と REMOTE が一致しています。
これでようやく スキーマは ローカルとサーバーの同期が取れている状態になりました。


同期が取れているかどうかの確認方法
supabase db reset
supabase db push
supabase db pull
この３つのコマンドを実行すると、変更は無いと
no schema changes found
赤文字で教えてくれます。



## ローカルDBの中身

では中身のデータはどうでしょうか？

サーバーには国名を登録したのを覚えているでしょうか？

ローカルのテーブルの中身はどうでしょうか？



supabase status で表示されているローカルの↓ダッシュボードを見てみます。

Studio URL: http://localhost:54323



ダッシュボードの左サイドバーに Table Editor があります。
そこを見てみると、 countries テーブルがあります。
スキーマはDBに登録されているのがわかります。

しかし肝心のテーブル中身は空のままです。

サーバーのDBのバックアップを取って
そのバックアップからローカルにリストアしてみようと思います。

またサーバーのデータが大きい場合のための差分バックアップも調べてみます。



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




----------------------------------------


# Supabase CLIのコマンドの調査


## CLI の基本命令



----------------------------------------




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
supabase db pull
を初めて実行した後、マイグレーション履歴テーブルは次のようになります。

使用例

supabase migration list

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230103054303 │ 20230103054303 │ 2023-01-03 05:43:03



```



マイグレーション履歴をクリーンな状態に戻すには、まず、ローカルのマイグレーションファイルを削除します。



rm supabase/migrations/20230103054303_remote.sql



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
supabase db pull
を実行して、サーバーのスキーマをローカルマイグレーションファイルとしてダンプすることができます。



Flags
--db-url <string>
-p, --password <string>
--status <[ applied | reverted ]>



### supabase migration up

supabase migration up

保留中のマイグレーションをローカルに適用します。

例えば、
newコマンドでマイグレーションを作った時、その内容をローカルに適用します。

マイグレーションファイルの中身はSQL文なので、自力で書こうと思えばかけます。

ダッシュボードのSQL Editorを介さず、直接マイグレーションファイルを作成した時に使用します。










----------------------------------------















----------------------------------------



# supabase migration squash

supabase migration squash

マイグレーションを単一のファイルにまとめます。

supabase migration squashを実行した後
supabase migration listを見ると同期が取れていないので調整する必要がありました。

正しい方法は分からなかったので、
supabase migration squashコマンドを実行した後は

REMOTE側を全て削除してから
supabase migration squashコマンドでできたマイグレーションファイルを

↓REMOTE側に挿入しています。
supabase migration repair 20230918014029 --status applied


----------------------------------------


# ローカルでマイグレーションファイルを作成する

supabase migration new create_employees_table

例
supabase migration new add_department_to_employees_table

supabase\migrations\20230918085418_add_department_to_employees_table.sql
supabase\migrations\20230918085422_add_department_to_employees_table.sql

ファイル名はタイムスタンプと接尾辞で構成されています。
20230918085422や20230918085418がタイムスタンプです。
add_department_to_employees_tableが接尾辞です。
タイムスタンプによってファイル名が生成されるので何度同じコマンドを実行しても大丈夫です。



----------------------------------------

# supabase db diff

ローカルあるいはリモートのデータベースに対するスキーマの変更の差分を取得します。

↓フラグのデフォルト値はローカルです。
supabase db diff

supabase db diff -f 接尾辞

通常は-f フラグを使用して接尾辞を追加してマイグレーションファイルに出力します。

↓リンク先のプロジェクトに対してのローカルのマイグレーションファイルの差分を取ります。
supabase db diff --linked

マイグレーションファイルを指定することも出来ます。



## ダッシュボードからGUIでテーブルなどを追加した場合

ダッシュボードから直接DBの変更をした場合に、マイグレーションファイルに記録する方法。

ダッシュボードのTable editorからテーブルの構造をいじったり、SQL文でスキーマを変更したら、まず差分を取ります。

supabase db diff -f 接尾辞
↓
supabase\migrations\20230920103250_接尾辞.sql

このようにタイムテーブルと接尾辞でマイグレーションファイルが作成されます。

supabase migration list で確認します。

```

        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230917104838 │ 20230917104838 │ 2023-09-17 10:48:38
    20230920103250 │                │ 2023-09-20 10:32:50  ＜＜追加された

```

20230920103250が追加されました。

ダッシュボードから直接変更した設定をマイグレーションファイルにするのに supabase db diff コマンドを使用します。

リセットコマンド supabae db reset は逆でマイグレーションファイルからDBに設定を反映させます。

REMOTE側にも反映させるには
supabase db push を使用します。

supabase migration list で確認します。

```

        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230917104838 │ 20230917104838 │ 2023-09-17 10:48:38
    20230920103250 │ 20230920103250 │ 2023-09-20 10:32:50

```

REMOTE側にも反映されました。

これでローカルとサーバーで同期が取れている状態です。



----------------------------------------

# キーと型の生成

Docker Desktopを起動させておきます。（ローカル開発時）
`src/types`フォルダは作成しておきます。（型の生成場所は自由）

DBのテーブルを変更した場合は、再度型を生成する必要があります。（重要）



## supabase gen

supabase gen keys
supabase gen types

### keyの取得(実験的機能)

supabase gen keys get --experimental

↓実行結果

```
> supabase gen keys get --experimental
NEXT_PUBLIC_SUPABASE_URL="ezxablkaqwpwmyoggipe-local_dev.fly.dev"
SUPABASE_AUTH_ANON_KEY="ey****************************WYg"
SUPABASE_AUTH_JWT_SECRET="eyU****************************hr6A=="
SUPABASE_AUTH_SERVICE_ROLE_KEY="ey****************************SeA"
SUPABASE_DB_PASSWORD="9d****************************17"

```



#### 型の取得

基本形
supabase gen types typescript --local

出力先の設定

まずsrc/typesフォルダを作成しておきます。

mkdir app/types

※保存先は各自自由に決めます。

supabase gen types typescript --local > app/types/database.types.ts

データベースの型が出来ます。

※Next.jsでsrc フォルダを使用している人は、パスを適当に合わせてください。


ヘルプ
supabase gen types typescript --local -h

オプション
--local
--linked
--project-id
--db-url

Examples:
  supabase gen types typescript --local
  supabase gen types typescript --linked
  supabase gen types typescript --project-id abc-def-123 --schema public --schema private
  supabase gen types typescript --db-url 'postgresql://...' --schema public --schema auth


----------------------------------------

例




↓中身はこうなっています。

```database.types.ts
//一部抜粋
        Row: {
          content: string | null;
          user_id: string | null;
          id: string;
          created_at: string | null;
        };
        Insert: {
          content?: string | null;
          user_id?: string | null;
          id?: string;
          created_at?: string | null;
        };
        Update: {
          content?: string | null;
          user_id?: string | null;
          id?: string;
          created_at?: string | null;
        };

```

Row
説明: テーブルの行を取得する時に使用される型、select文を実行するときに、Rowの型を指定して取得したデータを型付けすることができます。

Insert  インサートにはInsertを使用する
説明: テーブルに行を挿入するために使用される型、insert文を実行するときに、Insertの型を指定して挿入するデータを型付けすることができます。

Update
説明: テーブルの行を更新するために使用される型、update文を実行するときに、Updateの型を指定して更新するデータを型付けすることができます。


※Rowとか説明もなしに書かれていて、何がどうなっているのかわかりにくいですが、select文を実行するときに、Rowの型を指定して取得したデータを型付けすることができます。

↓実際の使い方、`database.types.ts`という型を生成したファイルから

```database.types.ts
interface Database {
  public: {
    Tables: {
      movies: {
        Row: {} // The data expected to be returned from a "select" statement.
        Insert: {} // The data expected passed to an "insert" statement.
        Update: {} // The data expected passed to an "update" statement.
      }
    }
  }
}

```

↑型ファイル`database.types.ts`の中身はこうなっています。

↓このように型をimportします。
`import type { Database } from './lib/database.types';`

↓実際に型ファイルを使用してデータを取得するコード例
データベースから`public.movies`テーブルの全データ`.select('*')`を取得しています。

これが基本形です。

```typescript.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './lib/database.types';

const supabaseUrl = 'https://your-supabase-url.com';
const supabaseKey = 'your-supabase-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getMovies() {
  const { data, error } = await supabase
    .from<Database['public']['Tables']['movies']['Row']>('public.movies')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}

getMovies();

```

↑TypeScriptの場合は、`from`メソッドに型を渡す必要があります。
TypeScriptのジェネリック型を使用して、型を渡すことができます。

`.from<Database['public']['Tables']['movies']['Row']>`

Rowを渡しているのでSQL文でいうselectでデータを取得するとわかります。
Rowは型を生成するごとに変わります。

```database.types.ts
// 一部抜粋
Row: {
  content: string | null;
  user_id: string | null;
  id: string;
  created_at: string | null;
};

```


----------------------------------------

## Injecting type definitions


```typescript.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from 'lib/database.types'

  // ↓ジェネリック型を使用して、型を渡すことができます。
const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

```

このようにDBで生成した型を読み込ませて、ジェネリック型を使用して `createClient<Database> `で型を指定するとこの型が適用されます。

このコードでは、Supabaseクライアントを作成する際に、createClient関数にジェネリック型<Database>を指定しています。これにより、Supabaseクライアントが使用する型がDatabase型になり、型安全性が向上します。また、Database型は、DBで生成した型定義を読み込んでいるため、正しい型が適用されるようになっています。









----------------------------------------


supabase completion powershell








----------------------------------------

# Tips

## Supabaseサーバーテーブルの豆知識

以前はサーバーだけにあった「<>API」「Data」「Definition」という機能がローカルのTable editorでも使えるようになりました。

ダッシュボードの左サイドバーからTable editorを開いてもらい。
あるテーブルを開いてもらいます。

現在は countries テーブルが１つあるはずです。
それを選択すると



###  「<>API」

右上に 「<>API」というボタンがあるので押します。

そうすると、テーブルの詳細な説明や、Next.jsからアクセスするコードが表示されます。

また、型生成するコマンドを見る事も可能です。



### 「Data」

これは標準のテーブル情報を表示します。



### 「Definition」

テーブルのSQL文が表示されます。



----------------------------------------

## 全コマンド調査

supabase -h

```
Supabase CLI 1.93.0

Usage:
  supabase [command]

Local Development:
  db                   Manage Postgres databases
  gen                  Run code generation tools
  init                 Initialize a local project
  inspect              Tools to inspect your Supabase project
  link                 Link to a Supabase project
  login                Authenticate using an access token
  migration            Manage database migration scripts
  start                Start containers for Supabase local development
  status               Show status of local Supabase containers
  stop                 Stop all local Supabase containers
  test                 Run tests on local Supabase containers

Management APIs:
  branches             Manage Supabase preview branches
  domains              Manage custom domain names for Supabase projects
  functions            Manage Supabase Edge functions
  network-bans         Manage network bans
  network-restrictions Manage network restrictions
  orgs                 Manage Supabase organizations
  postgres-config      Manage Postgres database config
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



----------------------------------------

# 本文中にでてこなかった 残りのCLI コマンド一覧

ここより下は本文で使用していないコマンドです。

## supabase test

supabase test new
最初に、テストファイルを作成します。



supabase test db

supabase test dbについて
supabase test dbは、Supabase CLIが提供するPostgreSQLのテストツールです。
このコマンドを使用すると、ローカルのデータベースに対してテストを実行することができます。

以下は、supabase test dbコマンドの使用方法です。

```
supabase test db --help

Tests local database with pgTAP

Usage:
  supabase test db [flags]

```



このツールは、pgTAPによって提供されており、PostgreSQLの拡張機能を使用して、データベースのテストを実行します。

pgTAPは、PostgreSQLのテスト駆動開発（TDD）フレームワークであり、データベースのテストを書くための多数の関数を提供しています。



以下は、supabase test dbコマンドを使用して、データベースのテストを実行する例です。

tests/databaseディレクトリを作成します。

```
mkdir -p ./tests/database

```

tests/databaseディレクトリに、.test.sql拡張子を持つ新しいファイルを作成します。

```
touch ./tests/database/hello_world.test.sql

```

hello_world.test.sqlファイルに、以下のようなテストを記述します。

```
-- hello_world.test.sql

--# Test the hello_world function
SELECT plan(1);
SELECT ok(hello_world() = 'Hello, world!');

```



supabase test dbコマンドを使用して、テストを実行します。

```
supabase test db

```



supabase/testsディレクトリからマウントされたユニットテストファイルのボリュームを持つコンテナ内でpg_proveを実行します。テストファイルのサフィックスは.sqlまたは.pgのいずれかの拡張子にすることができます。

各テストは独自のトランザクションに包まれているため、成功や失敗にかかわらず、個別にロールバックされます。








## supabase db

supabase db lint

supabase db lintというのは？
supabase db lintは、Supabase CLIが提供するPostgreSQLのLintingツールです。

このコマンドを使用すると、ローカルのデータベースに対して型エラーをチェックすることができます。

以下は、supabase db lintコマンドの使用方法です。

supabase db lint --help

Checks local database for typing error

Usage:
  supabase db lint [flags]

Flags:
  --level [ warning | error ] Error level to emit. (default warning)
  --linked Lints the linked project for schema errors.
  -s, --schema strings List of schema to include. (default all)



このツールは、plpgsql_checkによって提供されており、PostgreSQLのパーサー/評価機能を利用して、ランタイム時に発生する可能性のあるエラーを表示します。

以下の機能を提供しています。

	関数パラメータに正しい型が使用されているかを検証する
	未使用の変数や関数引数を特定する
	RETURNコマンドの後にあるコード（デッドコード）を検出する
	PostgreSQL関数に欠落しているRETURNコマンドを検出する
	パフォーマンスの問題になる可能性がある不要な隠れたキャストを特定する
	SQLインジェクションの脆弱性に対するEXECUTEステートメントをチェックする







## supabase inspect db

Supabase データベースを検査するツールです。
SQL文の呼び出し回数とかを調べます。

supabase inspect db calls
supabase inspect db long-running-queries
supabase inspect db outliers
supabase inspect db blocking
supabase inspect db locks
supabase inspect db total-index-size
supabase inspect db index-sizes
supabase inspect db index-usage
supabase inspect db unused-indexes
supabase inspect db total-table-sizes
supabase inspect db table-sizes
supabase inspect db table-index-sizes
supabase inspect db cache-hit
supabase inspect db table-record-counts
supabase inspect db seq-scans
supabase inspect db replication-slots
supabase inspect db role-connections
supabase inspect db bloat
supabase inspect db vacuum-stats



## supabase branches

Supabase プレビューブランチを管理します。

supabase branches create
supabase branches list
supabase branches get
supabase branches update
supabase branches delete
supabase branches disable

Supabase プレビューブランチ

Supabaseのプレビューブランチは、開発者が最新の機能をテストするために使用できる、最新のコードが含まれたブランチです。
プレビューブランチを管理するには、以下の手順に従ってください。

ローカルでの開発を開始する前に、Supabaseのプレビューブランチをクローンします。

git clone https://github.com/supabase/supabase.git

ローカルでの開発を開始する前に、プレビューブランチを最新の状態に更新します。

git pull origin preview

ローカルでの開発が完了したら、変更をプレビューブランチにプッシュします。
git push origin preview

以上が、Supabaseのプレビューブランチを管理するための基本的な手順です。






## supabase functions

supabase functions new
ローカルで新しい関数を作成する
supabase functions new <Function name>

supabase functions list

supabase functions download
リンク先のSupabaseプロジェクトよりFunctionのソースコードをダウンロードする。

Flags
--project-ref <string>

使用例
supabase functions download <Function name> [flags]

supabase functions serve

supabase functions deploy
リンク先のSupabaseプロジェクトにFunctionをデプロイする。

supabase functions delete
リンク先のSupabaseプロジェクトからFunctionを削除します。
ローカルのファンクションは削除しません。





## supabase postgres-config

現在の Postgres データベース設定を取得します。

supabase postgres-config get
supabase postgres-config update













----------------------------------------

# Web開発中に不要と判断したもの

## supabase projects

supabase projects create
supabase projects list
supabase projects api-keys

### supabase projects create

プロジェクトの作成

Flags
--db-password <string>
-i, --interactive
--org-id <string>
--plan <[ free | pro ]>
--region <string>

### supabase projects list

プロジェクトの一覧



### supabase projects api-keys

Supabaseプロジェクトの全てのAPIキーをリストアップします。



## supabase orgs

supabase orgs create
supabase orgs list


### supabase orgs

Supabase組織の管理

supabase orgs list

```
06-20 16:46:38> supabase orgs list


            ID         │          NAME
  ─────────────────────┼──────────────────────────
    cute-********-*******uq │ Supabase_***********a



```



## supabase domains

supabase domains activate
supabase domains create
supabase domains get
supabase domains reverify
supabase domains delete



## supabase vanity-subdomains

supabase vanity-subdomains activate
supabase vanity-subdomains get
supabase vanity-subdomains check-availability
supabase vanity-subdomains delete



## supabase ssl-enforcement

supabase ssl-enforcement get
supabase ssl-enforcement update



## supabase completion

supabase completion zsh
supabase completion fish
supabase completion bash



## supabase secrets

supabase secrets set
supabase secrets list
supabase secrets unset



## supabase sso

Supabase プロジェクトの SSO 認証を管理します。

SSO
シングルサインオン

supabase sso add
SSOアイデンティティプロバイダへの新しい接続をSupabaseプロジェクトに追加して設定します。

supabase sso list
SupabaseプロジェクトへのSSO IDプロバイダへの接続をすべてリストアップします。

supabase sso show

supabase sso info

supabase sso update
すでに追加されている SSO ID プロバイダーの構成設定を更新します。

supabase sso remove



## supabase network-bans

supabase network-bans get
supabase network-bans remove
supabase network-restrictions
supabase network-restrictions get
supabase network-restrictions update



# 非推奨になったコマンド

↓非推奨になったコマンド
supabase db remote commit

↓かわりにこちらを使用してください
supabase db pull



----------------------------------------

# 参考

Supabase CLI のコマンド (v1.93.0) - Qiita

https://qiita.com/masakinihirota/items/b84c071415eeebb4a252

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





----------------------------------------
----------------------------------------
----------------------------------------
----------------------------------------
----------------------------------------

# データベースの操作 マイグレーション編

マイグレーションファイルの新規作成
supabase migration new [接尾辞]
↓
supabase\migrations\20230919202640_[接尾辞].sql.
と新規作成されます。

システムはタイムスタンプの部分を見てどのマイグレーションに相当するかを判断しています。

マイグレーションファイルは
[タイムスタンプ]と[接尾辞]とsql拡張子で出来ています。

supabase migration listを操作する書式

supabase migration list

```
    LOCAL │ REMOTE │ TIME (UTC)
  ────────┼────────┼─────────────

```

↑最初は空っぽです。

これにテーブル新規作成などを記録してスキーマが作成されていきます。
そのスキーマを記録したファイルがマイグレーションファイルになります。

マイグレーションファイルを作成した後に
supabase db resetコマンドを実行するとマイグレーションリストに記録されていきます。

ただ、後でテーブルのスキーマを変更したりなどの操作をしたい場合に↓これらのコマンドが必要になります。

基本形
supabase migration repair [タイムスタンプ] --status [reverted|applied]

例
↓このようにマイグレーションファイルがあるとした場合
supabase\migrations\20230918014029_remote_schema.sql
                                  ^^^^^^^^^^^
20230918014029 ＜＜この部分のタイムスタンプをコマンドに使用します。

例
supabase migration listで表示される
↓REMOTE側の削除方法

supabase migration repair 20230918014029 --status reverted



supabase migration listで表示される
↓REMOTE側の挿入方法

supabase migration repair 20230918014029 --status applied



supabase migration squash

このように、↓2つのマイグレーションファイルがあるバア愛
supabase\migrations\20230918014029_remote_schema.sql
supabase\migrations\20230919191748_add_department_to_employees_table.sql

supabase migration squash
と実行すると

supabase\migrations\20230919191748_add_department_to_employees_table.sql
と1つのファイルにまとまります。

supabase migration listをみると。

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
                   │ 20230918014029 │ 2023-09-18 01:40:29
    20230919191748 │ 20230919191748 │ 2023-09-19 19:17:48

```

ズレが生じています。

supabase db pushを実行しようとするとエラーになりました。

supabase migration repair --status reverted 20230918014029
supabase migration repair --status reverted 20230919191748
このコマンドを実行してくださいと指示が出ます。



supabase migration listを実行して

```
        LOCAL      │ REMOTE │     TIME (UTC)
  ─────────────────┼────────┼──────────────────────
    20230919191748 │        │ 2023-09-19 19:17:48

```

REMOTE側を修復します。
supabase migration repair --status applied 20230919191748

```
        LOCAL      │     REMOTE     │     TIME (UTC)
  ─────────────────┼────────────────┼──────────────────────
    20230919191748 │ 20230919191748 │ 2023-09-19 19:17:48

```

これでローカルとサーバーの同期が取れたので

supabase db push
supabase db pull
で同期の確認を取ります。



# マイグレーションの調査の終わりに・・・

調査が終わったので、
マイグレーションファイルやseedファイルを削除して
supabase db resetコマンドで初期化します。

supabase migration listをみてREMOTE側が残っているので削除しておきます。

supabase migration repair --status reverted 20230919191748

リストを表示させてみると
supabase migration list

```
    LOCAL │ REMOTE │ TIME (UTC)
  ────────┼────────┼─────────────

```

最後にもう一度 supabase db reset して、綺麗になりました。






# ローカルでのシードファイルの作成

snaplet を使用します。

npx snaplet generate --sql > supabase/seed.sql

データベースのシード | スーパーベースのドキュメント
https://supabase.com/docs/guides/cli/seeding-your-database

Generate data | Snaplet
https://docs.snaplet.dev/references/data-operations/generate/

詳細は↑このマニュアルをご覧ください


※サーバーのデータをseedファイルにする方法は、

supabase db dump -f supabase/seed.sql --data-only

を実行します。



# テストとリンティング

Testing and linting | Supabase Docs
https://supabase.com/docs/guides/cli/testing-and-linting

Supabase CLI は、
Postgres データベース
Edge 関数のテスト
lint
これらに役立つ一連のツールを提供しています。


## データベースのテスト

Testing Your Database | Supabase Docs
https://supabase.com/docs/guides/database/testing

pgTAP: Unit Testing | Supabase Docs
https://supabase.com/docs/guides/database/extensions/pgtap

pgTAP: Unit Testing | Supabase Docs
https://supabase.com/docs/guides/database/extensions/pgtap

## エッジ機能のテスト

Testing in Deno | Deno Docs
https://docs.deno.com/runtime/manual/basics/testing

Testing your Edge Functions | Supabase Docs
https://supabase.com/docs/guides/functions/unit-test

認証メールのテスト
インバケットへのアクセス
本番環境への移行



## データベースのリンティング


### 解説

このコマンドは、Supabase CLIを使用して、PostgreSQLデータベースのLinting（静的解析）を行うためのコマンドです。以下に、各フラグの説明を順番に解説します。

- `--level`: エラーレベルを指定するフラグです。デフォルトでは`warning`になっています。

- `--linked`: リンクされたプロジェクトのスキーマエラーをLintingするフラグです。

- `-s, --schema`: Lintingに含めるスキーマのリストを指定するフラグです。デフォルトではすべてのスキーマが含まれます。

このコマンドは、PostgreSQLの内部パーサー/評価機能を利用して、実行時に発生するエラーを検出することができます。具体的には、以下のような機能が提供されます。

- 関数パラメーターに正しい型が使用されているかを検証する
- 未使用の変数や関数引数を特定する
- RETURNコマンドの後にあるコードを検出する（デッドコード）
- Postgres関数での不足しているRETURNコマンドを検出する
- パフォーマンスの問題になる可能性がある不要な隠れたキャストを特定する
- SQLインジェクションの脆弱性に対するEXECUTEステートメントをチェックする

このコマンドは、PostgreSQLデータベースのLintingを簡単に行うことができます。
また、実行時に発生するエラーを検出するため、データベースの品質を維持することができます。



# GitHub Actions

Generate types using GitHub Actions | Supabase Docs
https://supabase.com/docs/guides/cli/github-action/generating-types

型を自動的に生成できます。








# よく分からなかったもの

--use-copyフラグの使い方

supabase db dump -f origin
supabase db dump --use-copy -f usecopy

ファイルに出力されたものは同じでした。



