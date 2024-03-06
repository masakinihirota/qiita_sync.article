<!--
title:   Next.js App Router と Supabase と Stripe のスターターアプリに色んなパターンの環境変数を設定
tags:    AppRouter,Next.js,Supabase,stripe
id:      1ae7d17377b8bac524d5
private: false
-->

追記 2024年3月7日

Next.js Supabase Stripe のスターターアプリを デプロイボタンを利用して設定するハンズオン。 #Next.js - Qiita
https://qiita.com/masakinihirota/items/695f572b05b82c2a7d57

↑この記事はこの記事を書いた後、デプロイボタンを利用してパターン1のみを設定した記事になります。

↓この記事はパターン１，２，３の環境変数の設定した記事です。
↓Stripeの設定で説明がない所がありました、そのせいで一部失敗することがわかっています。
(商品を購入するところでエラーになる)
（↑の記事では修正されています。）

追記終了

# Nextjs Supabase Stripe スターターアプリケーション

nextjs-subscription-payments というリポジトリが大型アップデートされました。
動かしてみた所、デプロイボタン、環境変数の設定の仕方など色々つまずいたり混乱したので、調べたことを記事にしました。

※その後、理解した後デプロイボタン経由でも成功しました。

:::note info
この記事の内容
ローカルとサーバーの組み合わせた時のパターンを3つに絞って、それぞれの環境変数を設定し動作確認をしました。

パータン1
Next.jsサーバー (Vercel等)
Supabaseサーバー

パターン2
Next.jsローカル
Supabaseサーバー

パターン3
Next.jsローカル
Supabaseローカル (Docker)

※Stripeはテスト環境だけです。
本番環境の設定等は自己責任でお願いします。

:::


Fastest way to build a SaaS in 2024 - Next.js, Supabase and Stripe - YouTube

https://www.youtube.com/watch?v=I7CFD99sp1g

この記事を書いている途中に発表された↑Supabase公式動画
※このリポジトリの↓アップデートに直に関わっているので当然ですが。

Next.js 14 & Supabase SSR by dalkommatt · Pull Request #278 · vercel/nextjs-subscription-payments
https://github.com/vercel/nextjs-subscription-payments/pull/278



----------------------------------------

# Next.jsのアプリケーション

Next.jsをベースにSupabaseとStripeを動かすアプリケーションです。

vercel/nextjs-subscription-payments: Clone, deploy, and fully customize a SaaS subscription application with Next.js.
https://github.com/vercel/nextjs-subscription-payments

※このNext.jsアプリケーションはスターターアプリケーションです。

※Windows環境では
readme.mdファイルに書いてあるデプロイボタンを
使用してもうまく動作しなかったので手動で行っています。



----------------------------------------

# 開発時の使用ツール

Next.js
GitHub
Vercel
Supabase
Stripe



----------------------------------------

# アカウント

用意するアカウント

それぞれのWebサービスを利用します。アカウントを作成しておいてください。
※無料です。

GitHub アカウント
Supabase アカウント
Vercel アカウント
Stripe アカウント



----------------------------------------

# CLI

それぞれのCLIをインストールしておきます。
VSCodeのターミナル上で直接命令ができるようになります。

GitHub CLI
Supabase CLI
Vercel CLI
Stripe CLI

それぞれインストールをしておいてください。

それぞれのCLIをインストールしておくと、
それぞれのWebサービスにログイン(orサインアップ)が出来るようになります。

そのあとプロジェクトにリンクさせたり、Webhookが実行出来るようになります。

Webhookは、Webアプリケーションで特定のイベントが発生した際に、他のアプリケーションへリアルタイムで通知する仕組みです。



----------------------------------------

ログイン

`supabase login`

↑ブラウザが立ち上がり、自動でログインします。(ブラウザの方で認証済みの場合)

`supabase link --project-ref [Reference ID] -p [Database Password]`

↑ローカルとサーバーのプロジェクトをリンクさせます。

リンクされたかどうかの確認

```terminal
supabase projects list

```

Supabaseのサーバーのリストが表示されればリンクされています。



----------------------------------------

# 開発環境 構成の事前準備

ローカル開発環境
サーバーの本番環境
この2つの環境変数を用意します。

Next.jsはローカルとVercel上にデプロイします。
※GitHubを経由します。

ローカルの環境は
SupabaseはサーバーとDockerで動かすローカル開発環境があります。

Stripeはサーバーのみですがテスト環境と、本番環境があります。

GitHubはサーバーだけです。



----------------------------------------

# スターターアプリケーションのリポジトリにある環境変数ファイル

<details><summary>スターターアプリケーションのリポジトリにある環境変数ファイル</summary>

※まだ↓未設定です。

```.env.example
SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID=
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET=

```



```.env.local.example
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# These environment variables are used for Supabase Local Dev
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
SUPABASE_SERVICE_ROLE_KEY=

# Get these from Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

</details>



```terminal
.env.example
.env.local.example

```

の2つの環境変数のサンプルファイルがあります。

これをコピーして

```terminal
.env
.env.local

```

に名前を変更します。
.gitignoreファイルに登録します。

```.gitignore
.env*

```

`.env` にはGitHub認証用の環境変数
`.evn.local` にはNext.jsの環境変数を設定します。

Next.jsは複数の環境変数ファイルがあっても読み込んでくれます。

Supabaseのサーバーorローカル
Stripeのサーバー
それぞれの環境変数を登録します。

※環境変数を2つに分ける意味は、
SupabaseがGitHub認証の環境変数を読み込む場合、
.envファイルからしかよんでくれないからです。
なのでこのリポジトリは2つに分かれているようです。

## 環境変数設定時の細かなルール

```
◯
http://127.0.0.1:54321/auth/v1/callback

☓
http://127.0.0.1:54321/auth/v1/callback/

```

※↑末尾にスラッシュはつけません。



## localhostよりも127.0.0.1で設定

最近はlocalhostよりも

```
127.0.0.1

```

での設定が推奨されることが多いです。



# supabase/config.toml

これはローカルのSupabaseの設定ファイルです。
GitHub認証の有効化などの設定を追記できます。

<details><summary>ローカルのSupabase環境変数ファイルconfig.toml</summary>

```supabase\config.toml
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "nextjs-subscription-payments"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. public and storage are always included.
schemas = ["public", "storage", "graphql_public"]
# Extra schemas to add to the search_path of every request. public is always included.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 15

[db.pooler]
enabled = false
# Port to use for the local connection pooler.
port = 54329
# Specifies when a server connection can be reused by other clients.
# Configure one of the supported pooler modes: `transaction`, `session`.
pool_mode = "transaction"
# How many server connections to allow per user/database pair.
default_pool_size = 20
# Maximum number of client connections allowed.
max_client_conn = 100

[realtime]
enabled = true
# Bind realtime via either IPv4 or IPv6. (default: IPv6)
# ip_version = "IPv6"
# The maximum length in bytes of HTTP request headers. (default: 4096)
# max_header_length = 4096

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://127.0.0.1:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 (1 week).
jwt_expiry = 3600
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true
# Allow/disallow testing manual linking of accounts
enable_manual_linking = false

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = true
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending OTP to users
template = "Your code is {{ .Code }} ."

# Use pre-defined map of phone number to OTP for testing.
[auth.sms.test_otp]
# 4152127777 = "123456"

# This hook runs before a token is issued and allows you to add additional claims based on the authentication method used.
[auth.hook.custom_access_token]
# enabled = true
# uri = "pg-functions://<database>/<schema>/<hook_name>"


# Configure one of the supported SMS providers: `twilio`, `twilio_verify`, `messagebird`, `textlocal`, `vonage`.
[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin_oidc`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.github]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID)"
# DO NOT commit your OAuth provider secret to git. Use environment variable substitution instead:
secret = "env(SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = "env(SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI)"
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""

[analytics]
enabled = false
port = 54327
vector_port = 54328
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

# Experimental features may be deprecated any time
[experimental]
# Configures Postgres storage engine to use OrioleDB (S3)
orioledb_version = ""
# Configures S3 bucket URL, eg. <bucket_name>.s3-<region>.amazonaws.com
s3_host = "env(S3_HOST)"
# Configures S3 bucket region, eg. us-east-1
s3_region = "env(S3_REGION)"
# Configures AWS_ACCESS_KEY_ID for S3 bucket
s3_access_key = "env(S3_ACCESS_KEY)"
# Configures AWS_SECRET_ACCESS_KEY for S3 bucket
s3_secret_key = "env(S3_SECRET_KEY)"

```

`[auth.external.github]`

ここでGitHub認証の環境変数を設定しています。

※Supabaseは多様な認証に対応していますが、
このスターターリポジトリはGitHubのみ準備されています。

`env()`関数を使うことで
直接環境変数ファイルから読み込んでいます。

※SupabaseのGitHub認証の環境変数は、
なぜか`.env`ファイルからしか読み込んでくれません。

ですのでこのリポジトリは
.envファイルと
.env.localに分かれています。

.envはGitHubの設定ファイルになっています。
.evnにSupabaseとStripeの環境変数が書かれています。

※Next.jsは複数の環境変数ファイルを読み込んでくれます。

※今回の記事ではGitHubに関連するところだけ追記しています。

Managing config and secrets | Supabase Docs
https://supabase.com/docs/guides/cli/managing-config

</details>



----------------------------------------

# 3つの環境組み合わせのパターン

## パターンに名前をつけて見やすくします。
パターン 1 公開用パターン
パターン 2 開発用（Next.jsはローカル、Supabaseはサーバー）パターン
パターン 3 開発用（Next.jsとSupabase、どちらもローカル）パターン

※DBのテストもやる場合はパターン3が便利です。

参考
SupabaseとStripeを連携させるNext.jsのサンプルアプリケーションをローカル環境で動かしてみた | WP-kyoto
https://wp-kyoto.net/try-supabase-by-usgin-vercel-stripe-subscription-example/

↑この参考サイトのパターンは2です。



## パターン 1 公開用パターン

サーバー側で動かす。
Next.js
Supabase
GitHub
Stripe



## パターン 2 開発用（Next.jsはローカル、Supabaseはサーバー）パターン

サーバー側で動かす。
Supabase
GitHub
Stripe

ローカル側で動かす。
Next.js



## パターン 3 開発用（Next.jsとSupabase、どちらもローカル）パターン

サーバー側で動かす。
GitHub
Stripe

ローカル側で動かす。
Next.js
Supabase



----------------------------------------
----------------------------------------
----------------------------------------

# 環境変数を設定する前の下準備

Next.jsアプリケーションのインストール
Supabaseのプロジェクトの作成
Supabase、Stripe、GitHub認証などの環境変数の取得
SupabaseにStripeで必要なテーブルの作成
StripeとNext.jsに価格を設定
Webhookの設定
等を行います。

※Supabaseはサーバーとローカルの両方にテーブルを設定します。



----------------------------------------

## Next.jsアプリケーションのインストールと起動

vercel/nextjs-subscription-payments

```terminal
gh repo clone vercel/nextjs-subscription-payments 「アプリケーション名」

pnpm install
pnpm run dev

```

Next.jsは環境変数ファイルを変更する事に読み込み直してくれます。




# 使用する環境変数ファイルのコピー

リポジトリにあるサンプルをコピーして使います。

powershell

```powershell
Copy-Item .env.local.example .env.local
Copy-Item .env.example .env

```

※WindowsのPowerShellでコピーする場合は`Copy-Item`コマンドを使ってください。



----------------------------------------

## Supabaseのプロジェクトの作成

Supabaseのダッシュボードからサーバのプロジェクトを作成します。
環境変数はプロジェクトごとに変わります。
無料範囲では2つだけ起動させておけます。
プロジェクトを停止すればもっと作成できます。

ローカルのプロジェクトは1つだけで大丈夫です。
環境変数はローカルでは固定です。

※ローカルのSupabaseのプロジェクトは、
Next.js等のアプリケーションにSupabaseを初期化させれば
いくらでも作れます。



----------------------------------------

## SupabaseにStripeで必要なテーブルの作成

Next.jsアプリケーションで利用するテーブルを作成します。
リポジトリ内にあるschema.sqlの内容をコピーして、
SupabaseのSQL Editorに貼り付け実行します。

※Supabaseのサーバーとローカル両方にテーブルを作ります。


### 警告について

```schema.sql (一部)
/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
drop publication if exists supabase_realtime;
create publication supabase_realtime for table products, prices;

```

drop命令を実行しようとすると警告が出ます。
この部分だったらSupabaseは新規プロジェクトなので警告されても大丈夫です。

<details><summary>drop&パプリケーション (by AI)</summary>

# drop命令

このSQLスクリプトの部分は、PostgreSQLのリアルタイム機能を設定するためのものです。具体的には、`products`テーブルと`prices`テーブルの変更をリアルタイムで追跡するためのパブリケーションを作成しています。

1. `drop publication if exists supabase_realtime;`:
   この行は、`supabase_realtime`という名前のパブリケーションが既に存在する場合、それを削除します。これは、同じ名前のパブリケーションを作成する前に、既存のパブリケーションがないことを確認するためのステップです。

2. `create publication supabase_realtime for table products, prices;`:
   この行は、`products`テーブルと`prices`テーブルの変更をリアルタイムで追跡するためのパブリケーションを作成します。パブリケーションは、特定のテーブルの変更を追跡し、それらの変更を他のデータベースにレプリケートするためのものです。この場合、`supabase_realtime`パブリケーションは、`products`テーブルと`prices`テーブルの変更を追跡します。

注意点としては、パブリケーションを作成する前に、既存の同名のパブリケーションがないことを確認することが重要です。また、パブリケーションはデータベースのリソースを消費するため、必要なテーブルのみを追跡するように設定することが推奨されます。

具体的な使用例としては、`products`テーブルや`prices`テーブルに新しい行が追加されたり、既存の行が更新されたり削除されたりしたとき、それらの変更をリアルタイムで追跡し、アプリケーションにリアルタイムの更新を提供することができます。これにより、ユーザーはページをリロードすることなく、最新の製品情報や価格情報を見ることができます。

# パプリケーション

パブリケーションとは
PostgreSQLにおけるパブリケーションは、論理レプリケーションで使用する、テーブルの変更を配信するための設定です。具体的には、以下の機能を提供します。

特定のテーブルの変更をリアルタイムで追跡
追跡した変更を他のデータベースにレプリケート
パブリケーションの構成要素
パブリケーションには、以下の構成要素があります。

名前: パブリケーションを識別するための名前
テーブル: 変更を追跡するテーブル
操作: INSERT、UPDATE、DELETEなど、追跡する操作
オプション: レプリケーションのタイミングや方法などを設定
パブリケーションの利点
パブリケーションを使用する利点は、以下のとおりです。

リアルタイムデータ配信: 他のデータベースにリアルタイムで変更を配信することで、常に最新のデータを利用することができます。
データの整合性: レプリケーションによって、複数のデータベース間でデータの整合性を保つことができます。
スケーラビリティ: パブリケーションを使用することで、複数のデータベースに負荷を分散させることができます。
パブリケーションの使用例
パブリケーションは、以下のようなユースケースでよく使用されます。

リアルタイムアプリケーション: チャットアプリやEコマースサイトなど、リアルタイムでデータ更新を反映するアプリケーション
データ分析: データ分析基盤にリアルタイムでデータを配信することで、最新のデータに基づいて分析を行うことができます。
災害復旧: データベース障害発生時に、パブリケーションを使用してスタンバイデータベースにデータを復元することができます。
警告について
ご質問の警告は、schema.sqlでsupabase_realtimeという名前のパブリケーションを作成しようとしているためです。このパブリケーションは、productsテーブルとpricesテーブルの変更をリアルタイムで追跡します。

この警告が表示される理由は、publicスキーマ以外のテーブルに対してパブリケーションを作成する場合、潜在的なセキュリティリスクがあるためです。publicスキーマは、すべてのユーザーがアクセスできるデフォルトのスキーマです。そのため、publicスキーマ以外のテーブルに対してパブリケーションを作成すると、悪意のあるユーザーがパブリケーションを通じてデータを不正に取得できる可能性があります。

この警告を無視するには、-Wオプションを付けてdropコマンドを実行します。

drop publication -W if exists supabase_realtime;
ただし、このオプションを使用する場合は、セキュリティリスクを理解した上で実行する必要があります。

Supabaseでのパブリケーション
Supabaseは、PostgreSQLをベースとしたオープンソースのリアルタイムデータベースサービスです。Supabaseでは、リアルタイム機能を簡単に利用できるように、パブリケーションの設定を自動的に行ってくれます。

そのため、Supabaseを使用している場合は、schema.sqlのような手動設定は必要ありません。

まとめ
パブリケーションは、PostgreSQLの論理レプリケーションで使用する重要な機能です。リアルタイムデータ配信やデータの整合性など、さまざまな利点があります。

Supabaseを使用している場合は、自動設定によって簡単にリアルタイム機能を利用できます。

</details>

テーブルが５つ作成されます。

```table
customers
prices
products
subscriptions
users

```



## ユーザーの作成

アプリケーションにログインするユーザーを作成します。

「Add user」ボタンをクリックすると、
新しいユーザーが作成できます。



----------------------------------------

## Supabaseの環境変数の取得

Supabase はサーバーのプロジェクトを利用します。
Supabaseのプロジェクトの環境変数を取得します。

<details><summary>取得時のSupabaseテンプレート</summary>

```
Supabaseプロジェクト
組織 Organization

Project name
*****

Database Password
[Database Password]

Region
Northeast Asia (Tokyo)

左サイドバーにある Project setting から

Project Settings > General
Reference ID
*****

Project Setting > API > Project URL
*****

Project Setting > API > Project API keys > anon public
*****

Project Setting > API > Project API keys > service_role secret
*****

Project Setting > API > JWT Settings > JWT Secret
*****

アクセストークン
Supabase | Supabase
https://app.supabase.com/account/tokens

「Generate new token」ボタンを押します。

名前

supabase login アクセストークン
*****

Table Plus接続
postgresql://postgres:[PASSWORD]@db.[Reference ID].supabase.co:5432/postgres

ダッシュボード
https://app.supabase.com/project/[Reference ID]

作成コマンド(link)
supabase link --project-ref [Reference ID] -p [Database Password]

型の取得
npx supabase gen types typescript --project-id [Reference ID]

```

</details>

↑Supabaseの環境変数をメモしておきます。



----------------------------------------

# Stripeの環境変数の取得

Stripeは新しくアカウントを作ります。

最小限の設定の場合は、価格などがNext.jsのリポジトリからでも設定できるので
Stripeのダッシュボード上から特に設定は必要ありません。
必要な公開キーと秘密キーの取得だけです。

これで環境変数の準備が出来ました。

※StripeのCLIをインストールしておいてください。

Stripeは
テスト環境と本番環境があります。
※この記事ではテスト環境のみを扱います。

Stripeでアカウントを作り
テスト環境の公開キーと秘密キーを取得します。

```
stripeの公開キー
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
*****

stripeの秘密キー
STRIPE_SECRET_KEY
*****

```



## Webhookの設定

Stripeはキーとは別に
ローカルで開発する時WebHookを起動させて
WebHookのキーを取得する必要があります。

そのキーを取得するには

アプリケーションを起動させます。

:::note warn
次に説明するコマンドの順番を守ってください。

Next.jsのサーバーを立ち上げて(pnpm run dev)おいてから。
StripeのAPI監視(stripe listen)
価格設定の実行(stripe fixtures)
この順番を守ってください。

私は、起動させずに stripe fixturesコマンドを実行したのでアプリケーションに価格が反映されずに、かなり長い間つまづきました。

この手順でするとStripeとSupabaseのテーブルに同時に登録できるようです。
失敗した原因は、片方しか立ち上げてなかったので価格がNext.jsアプリケーションに反映されませんでした。

:::


↓それぞれVSCodeのターミナルの別ウィンドウで実行します。

```terminal
pnpm run dev

```

```terminal
stripe listen --forward-to http://127.0.0.1:3000/api/webhooks

```

↑stripe listenを実行すると表示されます。

`STRIPE_WEBHOOK_SECRET`の値になります。


```terminal
stripe fixtures fixtures/stripe-fixtures.json

```

↑サンプルの価格を設定します。

Next.js Subscription Starter
http://localhost:3000/

でサンプルの価格が反映されているかどうか確認してください。

公式リポジトリのデモ画面のように
Pricing Plans
が表示されます。



----------------------------------------

# GitHub認証

次は右上の「Sign In」ボタンを使えるようにします。
GitHubの認証を設定します。

※メールの送受信や、メール認証の設定はこの記事の範囲外です。



# SupabaseのサーバーでGitHub認証を有効化する。

Authentication | Supabase
https://supabase.com/dashboard/project/_/auth/providers

Supabaseのプロジェクトの左サイドバーのメニューに
Authentication
Providers
を選択します。

右にAuth Providers一覧が表示されます。

GitHubを選択して、
GitHub enabledにしておきます。

Client IDとClient Secretは後ほど取得してきます。

Callback URL (for OAuth)の値は、
後でGitHub認証を登録する時に必要なのでメモをしておきます。

```Callback URL (for OAuth)
https://[Reference ID].supabase.co/auth/v1/callback

```

後ほどGitHubからGitHub認証で使用する
Client IDとClient Secretを取得したら入力して
Saveボタンを押します。



# SupabaseのローカルでGitHub認証を有効化する。

supabase\config.toml
の

```
[auth.external.github]
enabled = true

```

このように有効化します。

GitHubのOAuth認証を取得してきます。



----------------------------------------



# GitHub認証の環境変数の取得

GitHubの認証を新しく作ります。

今回のGitHub認証はSupabaseにコールバック関数をつかっているため、
Supabaseのサーバー用とSupabaseのローカル用
の2つを用意する必要があります。

## パターン2用の新しくOAuth Appsを作成します。


取得場所

Developer applications
https://github.com/settings/developers

↑ここで新しくOAuth Appsを作成します。

入力値


### Supabaseのプロジェクトがサーバーの場合

```
Application name
supabase_server(適当)

Homepage URL
http://127.0.0.1:3000

Authorization callback URL
https://[Reference ID].supabase.co/auth/v1/callback

```

名前は適当につけます。

Homepage URLは
Next.jsをローカルで動かすので
ローカルの値を使います。

Authorization callback URL
はSupabaseのGitHub認証を有効化した場所にあります。

Authentication | Supabase
https://supabase.com/dashboard/project/_/auth/providers



GitHub認証の
クライアントID
クライアントシークレット
を取得します。

```
OAuth Apps
supabase_server

Client ID
[Client ID]

Client secret
[Client secret]

```


## パターン3用の新しくOAuth Appsを作成します。

パターン3はパターン2のSupabaseがローカルに変わっています。

```
Application name
supabase_server(適当)

Homepage URL
http://127.0.0.1:3000

Authorization callback URL
http://127.0.0.1:54321/auth/v1/callback

```

```
http://127.0.0.1:54321

```

このURLはSupabaseのローカルのURLです。この後ろにコールバックの場所を指定しています。



GitHub認証の
クライアントID
クライアントシークレット
を取得します。

```
OAuth Apps
supabase_server

Client ID
[Client ID]

Client secret
[Client secret]

```

ここまででツールの設定と環境変数が用意できました。
次から実際に動かします。


----------------------------------------

# 成功したサンプル

これまで取得してきたデータを
環境変数ファイルの項目に埋めていってください。

## .env.local


## パターン 2 開発用（Next.jsはローカル、Supabaseはサーバー）パターン

```.env.local
# 動作確認済み
# パターン2
# 環境変数
# Next.js ローカル
# Supabase サーバー
# Stripe サーバー
# GitHub サーバー

# Next.js npm run dev
NEXT_PUBLIC_SITE_URL="http://127.0.0.1:3000"

# Supabase Server
# These environment variables are used for Supabase Local Dev
NEXT_PUBLIC_SUPABASE_URL="https://[Reference ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhb*****nvI"
SUPABASE_SERVICE_ROLE_KEY="eyJ*****tYU"

# Get these from Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51O*****E6O"
STRIPE_SECRET_KEY="sk_test_51O*****qVm"
STRIPE_WEBHOOK_SECRET="whsec_1bc*****91a"

# GitHub認証環境変数
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID="[Client ID]"
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET="[Client secret]"
SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"

```

## パターン 3 開発用（Next.jsとSupabase、どちらもローカル）パターン

```.env.local
# パターン3
# 環境変数
# Next.js ローカル
# Supabase ローカル
# Stripe サーバー

# Next.js npm run dev
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# These environment variables are used for Supabase Local Dev
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ*****_I0"
SUPABASE_SERVICE_ROLE_KEY="eyJ*****1IU"

# Get these from Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51O*****E6O
STRIPE_SECRET_KEY=sk_test_51O*****qVm
STRIPE_WEBHOOK_SECRET=whsec_1bc*****91a

```



## .env

```.env
# GitHub認証環境変数

# GitHub認証 Next.jsローカル Supabaseサーバー パターン
# Application name
    # vns_template_NextjsLocal_supabaseServer
# SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID="[Client ID]"
# SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET="[Client secret]"
# SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="https://[Reference ID].supabase.co/auth/v1/callback"



# GitHub認証 Next.jsローカル  Supabaseローカル パターン

# Application name
	# vns_template_local
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID="[Client ID]"
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET="[Client secret]"
SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"

```

※環境変数ファイルを一つにまとめようとしてもエラーになります。
SupabaseはGitHub認証の環境変数ファイルは.envファイルからしか読み込みません。
.env.localに書いても読み込んでくれません。

----------------------------------------

正しく各項目が埋まると、正常に動くはずです。

ローカル開発環境の場合は
http://127.0.0.1:3000 にアクセスしてください。

本番環境の場合は
デプロイしたURLにアクセスしてください。

反映されてないと、
No subscription pricing plans found.
Create them in your <Link>Stripe Dashboard</Link>

と白とピンクの警告文が出ます。

その場合は元に戻ってやり直してください。



----------------------------------------
----------------------------------------
----------------------------------------

ここまでで、
正常に動作していれば
パターン2と3が成功しているはずです。

最後に本番環境のパータン1を設定します。



----------------------------------------
----------------------------------------
----------------------------------------

# パターン 1 公開用パターン

すべてをサーバー側で動かします。
Next.js
Supabase
GitHub
Stripe
Vercel

ここからはNext.jsアプリケーションをVercelで
動かすように設定します。

GitHubにスターターアプリケーションのコードをPUSHして、
そしてPUSHしたら自動でVercelにデプロイするように設定します。



----------------------------------------

# GitHubのリポジトリの作成

VSCodeでGitHubにpushします。
VSCodeで以前にGitHubにリポジトリを作ってあると、
殆どの操作をすること無く作成できます。

半自動で作成されたポジトリ
masakinihirota/nextjs-subscription-payments: Clone, deploy, and fully customize a SaaS subscription application with Next.js.
https://github.com/masakinihirota/nextjs-subscription-payments



----------------------------------------

次にGitHubのリポジトリとVercelの連携をします。

# Vercel

Next.jsのアプリケーションをVercelに登録して、
サーバーで動くようにして、そのURLを取得します。

Vercel – Vercel
https://vercel.com/dashboard

右上の「Add New」ボタンから

Projectを選択


そうするとGitHubに登録してあるリポジトリ一覧が表示されるので、先程のプロジェクトを選択します。

Environment Variablesを開き、環境変数を設定します。

Supabaseの環境変数を設定します。

※ここではSupabaseの設定のみをします。


```Vercel 環境変数
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

```

の3つを設定します。

パターン2のSupabaseのサーバーの環境変数をそのまま使います。

```.env.local
# Supabase Server
# These environment variables are used for Supabase Local Dev
NEXT_PUBLIC_SUPABASE_URL
https://[Reference ID].supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJ*****1vI

SUPABASE_SERVICE_ROLE_KEY
eyJ*****2YU

```

これでVercel上でのNext.jsのビルドが通るようになります。
※このスターターのNext.jsアプリケーションはSupabaseの環境変数が必ず必要です。



----------------------------------------

ビルドが成功したら

Continue to Dashboardをクリックすると、
Vercelのプロジェクト管理画面にいきます。


基本的に2つのURLが表示されています。

## Deployment

Deploymentはビルドごとに新しいURLが作られます。
変動するURLですね。

## Domains

Domainsは変わらずに同じURLのままです。
※GitHub認証の登録時などはこちらの固定URLを利用します。
※独自ドメインを設定すれば変更できます。

例

```
Deployment
nextjs-subscription-payments-n94r3oxv2-masakinihirota.vercel.app

Domains
nextjs-subscription-payments-chi-black.vercel.app

```

パターン２のSupabaseのサーバーに登録済みだからか、
すでにStripeの商品が表示されていました。

Stripeの公開キーと秘密キーはまだVercelに登録していません。



----------------------------------------

# パターン1用のGitHub認証の環境変数の取得 (サーバー用)

GitHub認証のキーを取得するには
Vercelでの公開される先のURLが必要です。



## パターン1 用の新しくOAuth Appsを作成

取得場所

GitHub
Developer applications
https://github.com/settings/developers

↑ここで新しくOAuth Appsを作成します。


### Next.jsのアプリケーションとSupabaseのプロジェクトがサーバーの場合

```
Application name
NextjsSupabase_server (適当)

Homepage URL(VercelのDomainsの方)
https://nextjs-subscription-payments-chi-black.vercel.app

Authorization callback URL
https://[Reference ID].supabase.co/auth/v1/callback

```

名前は適当につけます。

Homepage URLは
Next.jsをローカルで動かすので
ローカルの値を使います。

Authorization callback URL
はSupabaseのGitHub認証を有効化した場所にあります。


GitHub認証の
クライアントID
クライアントシークレット
を取得します。




このURLはSupabaseのローカルのURLです。この後ろにコールバックの場所を指定しています。



GitHub認証の
クライアントID
クライアントシークレット
を取得します。



```
OAuth Apps
NextjsSupabase_server

Client ID
[Client ID]

Client secret
[Client secret]

```

Supabaseのコールバックは

Authentication | Supabase
https://supabase.com/dashboard/project/_/auth/providers

Authenticationの
Providersの
GitHubを開いて
Callback URL (for OAuth)をコピーします。

```
https://[Reference ID].supabase.co/auth/v1/callback

```



ここまででツールの設定と環境変数が用意できました。
次から実際に動かします。



# GitHub認証環境変数

```.env
# GitHub認証 Next.jsサーバー Supabaseサーバー パターン
# Application name
    # NextjsSupabase_server
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID="[Client ID]"
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET="[Client secret]"
SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="https://[Reference ID].supabase.co/auth/v1/callback"

```


GitHub認証を取得して、Vercelの環境変数に登録したら。

動作確認をします。

自分が作ったサイトに訪れて、機能を試します。

うまく動いたら、これで完成です。

お疲れさまでした。

----------------------------------------

Gemini
https://gemini.google.com/app

疑問はまずAIに聞いて下さい。
大抵の疑問は答えてくれます。
無料です。

----------------------------------------
----------------------------------------
----------------------------------------

# 参考

OAuth アプリケーション - GitHub Docs
https://docs.github.com/ja/apps/oauth-apps

Managing config and secrets | Supabase Docs
https://supabase.com/docs/guides/cli/managing-config

SupabaseとStripeを連携させるNext.jsのサンプルアプリをローカル環境で動かしてみた | WP-kyoto
https://wp-kyoto.net/try-supabase-by-usgin-vercel-stripe-subscription-example/
