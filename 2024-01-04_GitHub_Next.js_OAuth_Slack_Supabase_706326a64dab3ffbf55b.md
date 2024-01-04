<!--
title:   Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub)
tags:    GitHub,Next.js,OAuth,Slack,Supabase
id:      706326a64dab3ffbf55b
private: false
-->
# 参考リポジトリ

supabase-by-example/oauth-flow at main · supabase-community/supabase-by-example
https://github.com/supabase-community/supabase-by-example/tree/main/oauth-flow

↑Supabaseのコミュニティのサンプルのうち
OAuthのサンプルを利用しています。

OAuthの複数あるサンプルのうち、↓Next.js の App router版を選んでいます。

## サンプル

supabase-by-example/oauth-flow/nextjs at main · supabase-community/supabase-by-example

https://github.com/supabase-community/supabase-by-example/tree/main/oauth-flow/nextjs



# 用語

便宜上、以下のように呼びます。

## サーバー

Supabaseのサーバー側
ブラウザ上からアクセスするSupabase

Dashboard | Supabase

https://supabase.com/dashboard/projects



## ローカル

Supabaseのローカル開発環境
PC内でDockerを起動させて動かしているSupabase



## サンプル

↓Supabaseのコミュニティのサンプルを指します。

https://github.com/supabase-community/supabase-by-example/tree/main/oauth-flow/nextjs

※ローカルでの認証の動作確認で使うのに便利です。



# はじめに

Supabaseで開発する際に、
ローカルで開発して、サーバーにデプロイする方法を採用しています。
その時に、OAuth認証を利用するのですが、ローカルとサーバーでは少し設定が変わるので、
ローカル用とサーバー用の2個OAuth認証を用意する必要があります。

# 重要

OAuthへの設定と、登録する情報は、

## サーバー上で認証を動かす場合は

Supabaseのサーバー側のデータはサーバー側から取得します。

Supabaseのサーバーの設定は、
Supabaseサーバーのダッシュボードの
左サイドバー Authenticationの
Providersの設定から取得します。

有効にするOAuthを選択して有効化してください。

Callback URL (for OAuth) も各OAuthに登録する時に必要ですのでメモをしておいてください。



## ローカル上で認証を動かす場合は

ローカル側のデータはローカル側から取得します。
ローカルの設定は少し特殊です。

Supabaseのローカルの設定は、
そのプロジェクトの `supabase/config.toml` に書き込みます。



※ supabase/config.tomlの場所
supabase CLI をインストール後
プロジェクトのルート直下で`supabase init` を実行すると、
プロジェクトのルート直下に`supabase`フォルダ が作成されます。
その中に `config.toml` が作成されています。



# Supabaseでの設定の共通の注意点

* localhost は `127.0.0.1` にします。

古い情報だと `localhost` と書いてるのがあります。

* 環境変数 `.env` ファイルではダブルクォーテーションで囲みます。

`.env.local` というファイル名は使用しないでください。
`.env`というファイル名で作成してください。

* 末尾にスラッシュはつけません。

良い例
`http://127.0.0.1:54321/auth/v1/callback`

悪い例
`http://127.0.0.1:54321/auth/v1/callback/`




# Supabase の共通設定

Supabaseのダッシュボードを開きます。
左サイドバーの ↓Authentication を選択します。

https://supabase.com/dashboard/project/[Reference ID]/auth/providers

Auth Providers ページが表示されます。

設定したい各OAuthを有効化します。

それぞれの Callback URL 先をメモしておきます。

Callback URL (for OAuth) を Copy します。

これは各OAuthに登録する時に必要です。

Supabase 側での情報を取得したら、次に各OAuthの情報を登録して Client ID 等を取得します。




# Supabaseの設定ファイル config.toml

## OAuth認証の有効化の基本形

```
[auth.external.*****]
enabled = true
client_id = "env(*****_CLIENT_ID)"
secret = "env(*****_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = "http://[URL]/auth/v1/callback"

```

↑*****には以下のような値が入ります。

```
apple
azure
bitbucket
discord
facebook
github
gitlab
google
keycloak
linkedin
notion
slack
spotify
twitch
twitter
workos
zoom

```

## Supabase初期化時のファイル (OAuth部分を抜粋)

↓supabase init コマンドでの初期化時の内容です。

```supabase/config.toml
# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
secret = ""
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""

```



<details><summary>サンプルのSupabase設定ファイルの内容</summary>

↓サンプルからコピーした内容です。

```supabase/config.toml
# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
secret = ""
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""
[auth.external.google]
enabled = false
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

```

</details>



## ローカルで環境変数 `.env` を使う場合の設定例

```.env
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh...."
SUPABASE_SERVICE_ROLE_KEY="eyJh...."

GITHUB_CLIENT_ID="{GitHubのクライアントID}"
GITHUB_SECRET="{GitHubのクライアントシークレット}"
GOOGLE_CLIENT_ID="{GoogleのクライアントID}"
GOOGLE_SECRET="{Googleのクライアントシークレット}"

```

## Supabaseの設定ファイル config.toml での環境変数の読み込み方

例

```supabase\config.toml
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

```

環境変数を読み込む場合は、拡張子tomlファイルでは↑env()関数を使います。


<details><summary>環境変数 Next.jsの場合</summary>

Next.jsの場合は、 `process.env.*****` で読み込みます。

例

```
export default function Home() {
  return (
    <div className="">
        NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
        <br />
        NEXT_PUBLIC_SUPABASE_URL="{process.env.NEXT_PUBLIC_SUPABASE_URL}"
        <br />
        <br />
        NEXT_PUBLIC_SUPABASE_REDIRECT_URL="http://localhost:54321/auth/v1/callback"
        <br />
        NEXT_PUBLIC_SUPABASE_REDIRECT_URL="{process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL}"
        <br />
        <br />
        NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh...."
        <br />
        NEXT_PUBLIC_SUPABASE_ANON_KEY="{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}"
    </div>
  )
}

```

</details>



----------------------------------------
----------------------------------------
----------------------------------------

# Slack認証 の Client ID を取得します。

Login with Slack | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-slack



## サーバー

Slack認証の取得

まずSlackにアカウントを作り
ログインします。
そしてワークスペース＝チャットする場所を作成します。
名前は適当につけます。

サインインをしてワークスペースを作っていると、

https://api.slack.com/apps

から
Create an Appボタンが表示されますので、このボタンを押します。

Create an app モーダルウィンドウが開きます。

※ モーダルウィンドウとは、元画面の上に別のウィンドウを表示し、
ユーザーに情報を伝える画面のことです。

From scratch を選択します。

Name app & choose workspaceモーダルウィンドウが開きます。

App Name
practice-app (適当につけます。)

ワークスペースを選択して決定ボタンを押します。

Basic Informationページが表示されます。

そうすると、下の方にある 「App Credentials」の項目から、

App ID
Date of App Creation
Client ID
Client Secret
Signing Secret
Verification Token
をメモしておきます。


```
App ID
A06C....

Date of App Creation
January 4, 2024

Client ID
6424....

Client Secret
9a6b....

Signing Secret
d12c....

Verification Token
BXGj....

```

次にリダイレクト先を設定します。
Slack API: Applications | masakinihirota Slack

`https://api.slack.com/apps/[App ID]/oauth?`


左サイドバーから OAuth & Permissions を選択し、
Redirect URLs 内の Add New Redirect URL を選択します。



あとは、Supabaseの設定ファイルに書き込みます。


## ローカル

Supabaseでは利用できません。
Slack側がHTTPSを要求してくるのに対して、
Supabaseのローカル側はHTTPで動作しているためです。

Slackの Redirect URLは  「https」 を要求されるので
Supabaseのローカル認証では使えないようです。

※Supabaseのローカルのリダイレクト先はHTTPの、

`http://127.0.0.1:54321/auth/v1/callback`

だからです。


----------------------------------------

# Google認証 の Client ID を取得します。

Login with Google | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-google



## サーバー

https://console.cloud.google.com/

ログインをします。

左上のGoogleアイコンの右側にあるプロジェクトを選択します。

モーダルウィンドウが開きます。
「新しいプロジェクト」を作成します。

※最大10件まで新規作成可能です。

プロジェクト名
oauth-practice (適当な名前)

「作成」ボタンを押します。

しばらく待ちます。

プロジェクトを選択します。

APIとサービスを選択します。

左サイドバーの OAuth 同意画面 を選択します。

### 1  OAuth 同意画面

User Type
外部を選択します。

「作成ボタン」を押します。



アプリ情報

※複数埋める箇所がありますが、必要項目だけ埋めてください。

アプリ名＊
oauth-practice (適当な名前)

ユーザーサポートメール＊
*****@gmail.com

デベロッパーの連絡先情報
メールアドレス＊
*****@gmail.com

「保存して次へ」ボタンを押します。



### ２スコープ

特に変更はありません。

「保存して次へ」ボタンを押します。



### ３テストユーザー

テスト中は１００名までアプリにアクセスできます。

特に変更はありません。

「保存して次へ」ボタンを押します。

### ４概要

入力した情報を確認した後に、

「ダッシュボードに戻る」ボタンを押します。


## 認証情報

次に、左サイドバーの認証情報を選択します。

「＋認証情報を作成」ボタンを押します。

OAuthクライアントIDを選択します。

アプリケーションの種類から適切なものを選びます。

ウェブ アプリケーションを選択します。

アプリケーションの種類＊
ウェブアプリケーション

名前＊
OAuth-practice (適当な名前)


承認済みのリダイレクトURI

「+URIを追加」ボタンを押します。

ローカルのコールバックURLを入力します。

`http://127.0.0.1:54321/auth/v1/callback`

「作成」ボタンを押します。


「OAuth クライアントを作成しました」と表示されます。



クライアントID
6511....

クライアントシークレット
GOCS....

作成日 2024年1月5日 5:32:41 GMT+9
ステータス ✔有効

が表示されるので保存しておきます。

JSONをダウンロードボタンを押すと、PCに保存できます。

「OK」ボタンを押します。


あとは、Supabaseの設定ファイルに書き込みます。





## ローカル

ローカルでは、リダイレクト先をこのように設定します。

`http://127.0.0.1:54321/auth/v1/callback`


----------------------------------------

# GitHub認証 の Client ID を取得します。

Login with GitHub | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-github



## サーバー


GitHubのOAuth Appを新規作成します。
そうするとGitHub認証の環境変数が取得できます。

ローカル開発環境用のGitHub認証ができる環境変数を取得します。

## GitHubへアクセス

最初に GitHub

https://github.com

にアクセスします。

右上のユーザーが表示されているアイコンから
Settings
そして
左サイドバーの
Developer settings
を選択します。

GitHub Apps

https://github.com/settings/apps

そうすると↑この場所に来るので、ここから

左サイドバーの
OAuth Apps
を選択します。

次に、
右上の 「New OAuth App」 ボタンを押します。

必要な項目を埋めていきます。

```
Application name
oauth-practice (適当な名前)

Homepage URL
http://localhost:3000

Authorization callback URL
http://localhost:54321/auth/v1/callback

```

※↑ローカル開発環境の場合

項目を埋めたら 緑色の 「Register application」 ボタンを押します。

そうすると、次の項目の値が生成されます。

```
Client ID
85ff....

Client secrets
af8a....

```

取得したClient ID等を .env に書き込みます。




```.env
GITHUB_CLIENT_ID={GITHUBのクライアントID}
GITHUB_SECRET={GITHUBのクライアントシークレット}

```

例

```.env
GITHUB_CLIENT_ID="85ff...."
GITHUB_SECRET="af8a...."

```

※ ↑環境変数はダブルクォーテーションで囲みます。




## ローカル

ローカルでは、リダイレクト先をこのように設定します。

`http://127.0.0.1:54321/auth/v1/callback`



----------------------------------------

# 各OAuthからクライアントIDとクライアントシークレットを取得後は

## サーバーの場合は
Supabaseのダッシュボードから
左サイドバーの Authentication を選択します。
Providers の項目から
各OAuthを有効化します。
各OAuthの Client ID とClient Secretを入力します。
「Save」ボタンを押します。

## ローカルの場合は

supabase\config.toml ファイルにredirect_urlを設定します。

.env ファイルに
各OAuthの Client ID とClient Secretを入力します。

Supabaseを再起動させます。



----------------------------------------
----------------------------------------
----------------------------------------

# 参考URL

## Slack認証

Supabase AuthでSlack認証を試してみた | DevelopersIO

https://dev.classmethod.jp/articles/supbase-auth-slack/



## Google認証

supabaseでLogin with Google

https://zenn.dev/t0m0120/scraps/d410609cee5c36

話題のSupabaseでサクッとGoogle認証機能をつくってみた！ #React - Qiita

https://qiita.com/kaho_eng/items/a37ff001ea9eae226183



## GitHub認証

GitHub認証 ローカルで動かす OAuth-practice #GitHub - Qiita

https://qiita.com/masakinihirota/items/f9b99ca444ddeda1f4ef

【Supabase入門】認証・DB・リアルタイムリスナーを使ってチャットアプリを作ろう

https://zenn.dev/chot/articles/ddd2844ad3ae61




※サンプル4つ目の Azure 認証は取得を諦めました。
~~・・・めんどくさくなった~~
4つもいらないと思ったため。