<!--
title:   Next.js 14 App router で動かす、Stripe Subscription Starter のハンズオン。
tags:    AppRouter,GitHub,Next.js,Supabase,stripe
id:      33cdd1f9cb1276211bdf
private: false
-->
# 重要コマンド

```
stripe listen --forward-to=localhost:3000/api/webhooks
npm run dev

```



<details><summary>詳細</summary>

Stripeを使用して開発する時には、
開発中にStripeの Webhooksの監視(listen)を行います。

```
stripe listen --forward-to=localhost:3000/api/webhooks

```

同時に

```
npm run dev

```

も実行します。

</details>




# Stripe Subscription Starter - Vercel

https://vercel.com/new/templates/next.js/subscription-starter

今回はこのStarterを使ってハンズオンをしていきます。


<details><summary>デプロイボタンを読みやすくします。</summary>

https://vercel.com/new/clone?
repository-url=https://github.com/vercel/nextjs-subscription-payments
env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY
envDescription=Stripe API キーを入力してください。
envLink=https://dashboard.stripe.com/apikeys
project-name=nextjs-subscription-payments
repository-name=nextjs-subscription-payments
integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6
external-id=https://github.com/vercel/nextjs-subscription-payments/tree/main

</details>


## ↑この Starter のデモ

https://subscription-payments.vercel.app/

※これと同じものを立ち上げる事を目標とします。
（実運用や細かい設定は範囲外です。）

Stripeはインボイス制度の導入などあって、このStarter開発当時と色々細かいところが変わっています、実際に今導入して普通に動くのかどうか、ハンズオン形式で見ていきます。



<details><summary>セットアップ開始前の準備</summary>

Next.jsの基礎
と
GitHubのアカウント と利用方法
Vercelのアカウント と利用方法
Supabaseのアカウント と利用方法
Stripeのアカウントと利用方法
を取得や調べておく必要があります。



* GitHub

GitHub Japan | GitHub
https://github.co.jp/

無料で使えます。



* Vercel

https://vercel.com/

無料プランがあります。



* Supabase

https://supabase.com/

無料プランがあります。

※ Supabaseの無料プランでは1組織に1プロジェクトを2個まで、合計2個のプロジェクトまでを起動できます。
2個以上のプロジェクトを作りたい場合は、2個起動している場合、どれかをスリープさせておく必要があります。



* Stripe | オンライン決済・決済代行プラットフォーム

https://stripe.com/jp

無料プランがあります。
実際の取引以外には料金は発生しません。



* Next.jsの基礎について

Next.jsの公式サイトがNext.js学習用のサイトを公開してくれています。

Learn Next.js | Next.js by Vercel - The React Framework

https://nextjs.org/learn

ここにNext.js の App router や Sever actionsの最新情報が詰まっています。(無料)
(2023年11月25日 現在)

</details>



----------------------------------------

↓README.mdに書かれている手順をそのままなぞっていきます。

# Step-by-step setup Starter セットアップの開始

↑上の方に書いたStripe Subscription Starter ページの **Deployボタン** を押して開始します。

You're almost done. (ほとんど終了)
と表示されます。



# Create Git Repository

続いて、ソースコードを置く場所を決めます。

今回はGitHubを選択します。

GitHubにリポジトリを作ります。

リポジトリ名を決めて Createボタンを押します。

vns




## Add Integrations

次にSupabaseを設定します。

Addボタンを押します。

新しいウィンドウが開いて
Choose organization
Install integrationボタンを押します。

例
Project nameを決めます。
vns-supabase

Database Passwordを決めます。
データベースパスワードは、Generate a passwordを押せば自動生成機能されます。

Regionを決定します、近いほどアクセスが良いです。

シードデータを作ります。
Create sample tables with seed data

成功すると右上にメッセージが出ます。



## Configure Project

環境変数を設定します。

API キー | Stripe のドキュメント

https://stripe.com/docs/keys

Stripeのダッシュボードのapikeysページから環境変数を取得します。

https://dashboard.stripe.com/apikeys

↑ここで、StripeのAPI keysを取得します。


```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY

```

Deployボタンを押します。

# Deploy

Deployが開始されます。

数分待ちます。



デプロイをします。
成功すると Congratulations! と表示されます。



----------------------------------------

# Configure Auth

## Supabaseでの設定

Dashboard | Supabase
https://supabase.com/dashboard/projects

先程作ったSupabaseのプロジェクトのダッシュボードを開きます。

左サイドバーにある Authentication > URL configuration
を選択します。


Site URLを公開されたURLに設定をします。

例えば、Vercelで公開されているURLを指定します。

```
https://[Vercelで作成された公開ページ].vercel.app/

```

Save ボタンを押します。

※独自ドメインがあるなら、Vercelで登録してそのURLを貼り付けます。



## Vercelでの設定

Vercel
https://vercel.com/

次に
先程作ったProjectの、Vercelでのダッシュボードを開きます。

Vercelのプロジェクト画面の上部メニューにあるSettingsから
Project Settings＞Environment Variables
を開きます。

ここで
NEXT_PUBLIC_SITE_URL
という環境変数を設定します。

先程登録したURLと同じURLを登録します。

```
Key
NEXT_PUBLIC_SITE_URL

Value
https://[Vercelで作成された公開ページ].vercel.app/

```

プレビューブランチとローカル開発が正しく動作するように

Environmentの

Productionだけチェックします。

Preview
と
Development
のチェックを **必ずはずし** ます。

設定が終了したら Saveボタンを押します。



----------------------------------------

[オプション]

デプロイプレビューのリダイレクトワイルドカードの設定



<details><summary>※デプロイ ボタンを使用してインストールした場合は必要ありません。</summary>

SupabaseのダッシュボードのAuthentication
URL Configurationへ行きます。

Redirect URLsが設定されています。

自分の設定例（これはデプロイボタンから、実際に自動で登録された物）

```Redirect URLs
https://nextjs-subscription-payments-[username].vercel.app/
https://nextjs-subscription-payments-[username].vercel.app/**
https://nextjs-*-subscription-payments-[username].vercel.app
https://nextjs-*-subscription-payments-[username].vercel.app/**

```

手動で登録する場合は↓を登録します。
https://*-[username].vercel.app/**

※[username]は自分の設定に合わせて登録してください。

</details>



----------------------------------------

[オプション] - OAuthプロバイダーの設定

GitHubやGoogleのようなサードパーティのログインプロバイダーを追加できます。
これらの設定方法については、ドキュメントを参照してください。

設定したら、Authコンポーネントページのprovider配列に追加できます。

Auth | Supabase Docs

https://supabase.com/docs/guides/auth#third-party-logins



<details><summary>提供OAuth一覧 (現在：2023年11月25日)</summary>

```
provider: 'google',
provider: 'facebook',
provider: 'apple',
provider: 'azure',
provider: 'twitter',
provider: 'github',
provider: 'gitlab',
provider: 'bitbucket',
provider: 'discord',
provider: 'figma',
provider: 'kakao',
provider: 'keycloak',
provider: 'linkedin_oidc',
provider: 'notion',
provider: 'slack',
provider: 'spotify',
provider: 'twitch',
provider: 'workos',
workos_provider: '<your_provider>',
provider: 'zoom',

```



### OAuthプロバイダー登録場所

nextjs-subscription-payments/app/signin/AuthUI.tsx at main · vercel/nextjs-subscription-payments

https://github.com/vercel/nextjs-subscription-payments/blob/main/app/signin/AuthUI.tsx

```nextjs-subscription-payments/app/signin/AuthUI.tsx
 <div className="flex flex-col space-y-4">
   <Auth
     supabaseClient={supabase}
     providers={['github']}      ＜＜＜＜この配列に登録するとブラウザ画面側で表示されます。


```

それぞれのOAuthボタンが表示されるだけですので、実際の認証はSupabaseのドキュメントを読んでください。

Social Login | Supabase Docs

https://supabase.com/docs/guides/auth/social-login

</details>



----------------------------------------

[オプション] - Supabase環境変数の設定

<details><summary>※デプロイ ボタンを使用してインストールした場合は必要ありません。</summary>



※デプロイボタンからインストールした場合は、Supabase Vercel Integrationというツールが環境変数を自動で設定してくれます。

Vercelプロジェクトの設定に移動し、「環境変数」をクリックすると、環境変数のリストが表示され、その横にSupabaseアイコンが表示されています。



nextjs-subscription-payments – Environment Variables - Vercel

https://vercel.com/[username]/nextjs-subscription-payments/settings/environment-variables

※ [username] は自分の設定に合わせてください。

```
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
SUPABASE_ANON_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER

```

それ以外の場合は、API設定に移動し、それらをVercelデプロイメントインターフェイスに貼り付けます。

Supabase の Project Settings
Settings＞＞API
このページからAPIキーをコピーします。

NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
フィールドに貼り付け、
プロジェクトURLをコピーしてVercelに貼り付けます。

</details>



----------------------------------------

これでSupabaseのセットアップが完了しました。
のこりはあと少しです。

ここまではマニュアル通りに順に設定していけばよかったですが、
Stripeの設定はかなりの知識が必要です。
Stripeのドキュメントを読んでください。



# Configure Stripe

Stripeの設定

次に、テスト支払いを処理するためにStripeを設定する必要があります。

以下の手順では、

ダッシュボードで右上にテスト環境になっていることを確認します。

Stripeダッシュボード

開発者 – 新規ビジネス – Stripe [テスト]

https://dashboard.stripe.com/test/apikeys

Stripe | オンライン決済・決済代行プラットフォーム

https://stripe.com/jp

Test payment methods | Stripe のドキュメント

https://stripe.com/docs/testing

テスト環境 | Stripe のドキュメント

https://stripe.com/docs/test-mode



## Create a webhook

Webhookの作成

Stripeの「開発者」セクションでWebhookを作成する必要があります。

上のアーキテクチャ図にあるように、
このWebhookはStripeとVercel Serverless Functionsを接続する部分です。

アーキテクチャ図に示されているように、
このWebhookはStripeとVercelのサーバーレス関数を接続する役割を果たします。



### 1

ダッシュボード
開発者 – 新規ビジネス – Stripe [テスト]

https://dashboard.stripe.com/test/apikeys

中央上にあるタブの中のWebhookタブを選択します。

オンラインエンドポイントの右にある  ＋エンドポイントを追加 ボタンを押します。
（パスワードを求められます。）



### 2

Stripe イベントのリッスン のページが開きます。

エンドポイントを追加

エンドポイントURL

エンドポイントURLに、本番デプロイURLの後に/api/webhooksを入力します。



```
エンドポイント URL

https://[Vercelで作成された公開ページ].vercel.app/api/webhooks

例
https://your-deployment-url.vercel.app/api/webhooks

説明

Webhooksの利用

```

リッスンする
アカウントでのイベント

バージョン

バージョンはそのまま
現在ご利用のバージョン 2022-11-15

※package.jsonに登録したライブラリをバージョンアップしたら変更する必要があります。
最新バージョンと2022-11-15は少々違うところがあるのでバージョンアップする場合は慎重に選択してください。



### 3

「リッスンするイベントを選択」の下にある「イベントを選択」をクリックします。

そうすると
送信するイベントの選択
のページが表示されます。



### 4

「全イベントを選択」のラジオボタンをチェックします。

全イベントが選択されます。

イベントを追加ボタンを押します。

さらに
イベントを追加ボタンを押します。

これで新しくWebhookが出来ました。


### 5

次のステップで必要になるため、Signing secretをコピーします。

先程登録したURLに

イベントを待っています。という文言の間に

署名シークレットがあり、
その下に表示ボタンがあるので押します。

署名シークレットが表示されるので、
コピーをします。

例

```署名シークレット

whsec_su*********************

```



### 6

デプロイ時に設定した
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
に加えて、Webhookのシークレット
STRIPE_WEBHOOK_SECRET
を、Vercelの環境変数に追加登録する必要があります。

Vercel

https://vercel.com/

Vercelのダッシュボードのトップページに戻ります。

プロジェクトを選択してください。

そして、Vercelのダッシュボードの上部のナビバーからSettingsを選択します。

Project Settings
Environment Variablesのページを開きます。

Webhooksの署名シークレットを登録します。

```環境変数登録
Key
STRIPE_WEBHOOK_SECRET

Value
whsec_su*********************

```

Saveボタンを押します。


これでWebhookまでの作業は完了です。



# Redeploy with new env vars

# 新しい環境変数での再デプロイ

新しく設定した環境変数が反映させ、すべてが正しく連携するために、Vercelでアプリを再デプロイする必要があります。

再デプロイすると再ビルドも同時に行われます。

## 再デプロイ

Vercelのダッシュボードのトップページに戻ります。

上部ナビバーからDeploymentsを選択します。

Deploymentsのページに プロジェクトのURLが表示されているはずです。

↓ このような形で登録されているはずです。
「登録したURL Ready main Xd ago by username アイコン 三点リーダー…」

この↑三点リーダー…ボタンを押します。

ドロップダウンメニューが表示されるので、その中の

Redeployを選択します。

Redeploy to Production と確認画面が出てきます。

※「既存のビルドキャッシュを使用する」オプションにはチェックを入れません。

Redeployボタンを押します。

1分少々待ちます

Vercelがアプリを再ビルド＋再デプロイし、成功が表示されたら、
環境変数やWebhookは正常にse一定されました。



----------------------------------------

次は
製品と価格の設定です。

その前に、
VSCodeに戻って、GitHub のリポジトリからローカルの開発環境にソースコードを
ダウンロード＆インストールをしておきます。



StripeのCLIもインストールをしておきます。

Stripe CLI を使ってみる | Stripe のドキュメント

https://stripe.com/docs/stripe-cli?locale=ja-JP



ローカル開発環境で開発時に立ち上げておきます。

```
stripe listen --forward-to=localhost:3000/api/webhooks
npm run dev

```













----------------------------------------

# Create product and pricing information

製品と価格情報の作成

アプリケーションのWebhookはStripe上の製品の更新を監視し、
それらを自動的にSupabaseデータベースに反映します。

Webhookリスナーが実行されている状態で、Stripeダッシュボードで製品と価格情報を作成できます。

Stripe Checkoutは、特定の間隔で事前に定義された金額を請求する価格をサポートしています。
より複雑なプラン（異なる価格帯やシートなど）はまだサポートされていません。



例えば、以下のような異なる価格帯のビジネスモデルを作成できます：

```
Product 1: Hobby
Price 1: 1 USD per month
Price 2: 10 USD per year

Product 2: Freelancer
Price 1: 10 USD per month
Price 2: 100 USD per year

```



具体的には、fixtures/stripe-fixtures.jsonというJSONファイルに定義された一連のAPIリクエストを実行することで、データのブートストラップ（初期セットアップ）を行います。

```terminal
stripe fixtures fixtures/stripe-fixtures.json

```

を実行します。

これにより、テスト用の商品と価格データがStripeアカウントに追加されます。

この手順はオプションであり、セットアップを高速化するためのものです。
この手順を行わなくてもシステムは動作しますが、行うことでテストデータの準備がより迅速に行えます。

重要：StripeのWebフックを正しく設定し、必要な環境変数を含めて再デプロイしていることを確認してください。




```terminal
stripe fixtures fixtures/stripe-fixtures.json

```

を、中身の数値を変えて何度も実行するとどうなるのか？
を実験する。







# Configure the Stripe customer portal

Stripeのカスタマーポータルを設定する


1. ↓設定でカスタムブランディングを設定する

https://dashboard.stripe.com/settings/branding


2. ↓カスタマーポータルの設定を構成する

https://dashboard.stripe.com/test/settings/billing/portal



3. 「顧客が支払い方法を更新できるようにする」をオンにする
4. 「顧客がサブスクリプションを更新できるようにする」をオンにする
5. 「顧客がサブスクリプションをキャンセルできるようにする」をオンにする

6. 追加したい商品と価格を追加する
7. 必要な事業情報とリンクを設定する

以上です

多くの内容がありましたが、それは価値があります。これで顧客からの定期収益を得る準備が整いました。🥳
















nextjs-subscription-payments/fixtures/stripe-fixtures.json at main · vercel/nextjs-subscription-payments

https://github.com/vercel/nextjs-subscription-payments/blob/main/fixtures/stripe-fixtures.json



## Stripe CLI をインストールする

Stripe CLI を使ってみる | Stripe のドキュメント

https://stripe.com/docs/stripe-cli#install

```terminal
stripe fixtures fixtures/stripe-fixtures.json

```



重要：
StripeのWebhookを正しく設定し、必要なすべての環境変数で再デプロイしたことを確認してください。



# Stripeカスタマーポータルの設定

1. 設定でカスタムブランディングを設定します。
2. カスタマーポータルの設定を構成します。
3. 「顧客が支払い方法を更新できるようにする」をオンにします。
4. 「顧客がサブスクリプションを更新できるようにする」をオンにします。
5. 「顧客がサブスクリプションをキャンセルできるようにする」をオンにします。
6. 希望する製品と価格を追加します。
7. 必要なビジネス情報とリンクを設定します。

↓これらの設定方法を下記に記します。

https://dashboard.stripe.com/settings/branding

1 ブランドカラーやアクセントカラー等の見た目を自分のブランドにあったものに変更します。



https://dashboard.stripe.com/test/settings/billing/portal

2 ↑このページを開きます。

3  決済手段のプルダウンメニューを開きます。
	決済手段をONにします。（デフォルトでON）

4 サブスクリプションのプルダウンメニューを開きます。
顧客がプランを切り替えられるようにする。
顧客がプランの数量を変更できるようにする。
をONにします。（デフォルトでOFF）

5 キャンセルのプルダウンメニューを開きます。
	サブスクリプションをキャンセルをONにします。（デフォルトでON）

6 デフォルトのまま使用します。
7 デフォルトのまま使用します。

※各項目の詳細はドキュメントをご覧ください。



# Next.js 14 へアップデート

Next.js 14 はNext.js 13 の安定版みたいなものなので、ほとんど苦労しませんでした。

ncu (npm-check-updates) というツールを使います。

グローバールにインストールします。

```terminal

npm install -g npm-check-updates

```



## アップデートの調査

```terminal

ncu

```

アップデートする情報が表示されます。



## アップデートの実行

問題ないと判断したら、

```terminal

ncu -u

```

を実行します。



```terminal

npm run dev

```

アップデート後、ローカルサーバーを立ち上げてみます。

開発環境で動かしてみましたが、Next.js 13 ー＞ Next.js 14 へのメジャーバージョンアップでの不具合は特に見つかりませんでした。



# generate-typesの設定

package.jsonの scriptを設定します。

YOUR_PROJECT_ID を書き換えます。

YOUR_PROJECT_IDは
Supabaseのダッシュボードから
左サイドバーの Project Settings
Settings
Project Settings
Reference IDをコピーします。

※Supabaseでの Reference ID は project-id と同じです。

```package.json

    "generate-types": "npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > types_db.ts"

```

注意
この型の取得はSupabaseのプロジェクトをネットから取得する scripts です。

もし、Supabase をローカルで開発環境を立ち上げる場合、
Dockerのコンテナをローカルで動かすので、それに合わせた設定が必要です。
ローカルの project-idに変えたり、 サーバーからローカルのデータベースを同期させたり色々工夫が必要です。

SupabaseのDBを変更したらマイグレーションを実行して、データの型を取得します。



# その他の設定

srcフォルダ等を使用して開発したい場合は、
ファイルやフォルダを移動してパスを設定します。



----------------------------------------

# ローカルで開発する設定

GitHub でCloneした場所にVSCodeを開きます。

次に、Vercel CLIを使用してプロジェクトをリンクします。

```terminal
vercel login
vercel link

```



ローカルで環境変数を設定します。
Vercel CLIを使って開発用env varsをダウンロードします。

```terminal
vercel env pull .env.local

```

このコマンドを実行すると、プロジェクトフォルダに新しい.env.localファイルが作成されます。



セキュリティ上の理由から、
このローカル環境ファイルに
SUPABASE_SERVICE_ROLE_KEYを
Supabaseダッシュボード
左サイドバーのProject Settings
そのとなりのAPIを選択します。
API Settings
Project API keys
service_role secret
から取得して、設定ファイルにコピーします。

※Vercelの環境変数の設定にすでに登録していたら、
もうすでに .env.local ファイルに記載されています。

SUPABASE_SERVICE_ROLE_KEY=ey******************************



# Stripe CLIを使用してウェブフックをテストする

Stripe CLIをインストールし、Stripeアカウントをリンクします。

Stripe CLI を使ってみる | Stripe のドキュメント
https://stripe.com/docs/stripe-cli

Stripe CLI を使ってみる | Stripe のドキュメント
https://stripe.com/docs/stripe-cli#login-account

次に、ローカルウェブフックの転送を開始します：

```
stripe listen --forward-to=localhost:3000/api/webhooks

```

このStripeコマンドを実行すると、コンソールにウェブフックシークレット（例：whsec_***）が表示されます。

.env.localファイルに
STRIPE_WEBHOOK_SECRET=whsec_***
の値を設定してください。

この値は、Vercelからのダウンロードした値と違います。
理由は
本番環境のWebhooksのkeyと
ローカル開発環境のWebhooksのkeyの違いです。
テスト用のWebhooksのkeyを先程生成したわけです。

※本番環境で実際に動かすときが来た場合には、新たにWebhooksのキーを取得することをお勧めします。



依存関係をインストールし、Next.jsクライアントを実行します。
別のターミナルで、以下のコマンドを実行して依存関係をインストールし、開発サーバーを起動します。

```
npm install

npm run dev

```



アプリケーションが正しく動作するために、ウェブフックの転送と開発サーバーは別々のターミナルで同時に実行されている必要があります。

最後に、ブラウザでhttp://localhost:3000にアクセスしてアプリケーションが表示されることを確認してください。

以上で ハンズオンは終了です。
これでStripeを使う開発環境までの準備が整いました。
デモ画面と同じものが立ち上がるはずです。



----------------------------------------

ここから下はこの記事の範囲外です。

Stripe Subscription Starter リポジトリの、残りREADME.mdの部分を翻訳しただけです。

# 本番で使う

ライブにする
ライブモードに移行する前に、すべてのテストモードStripe製品をアーカイブしてください。ライブモードの製品を作成する前に、以下の手順に従ってライブモードの環境変数とウェブフックを設定することをお勧めします。



# 本番環境変数の設定

プロジェクトをライブモードで実行し、Stripeで支払いを処理するには、「テストモード」から「本番モード」にStripeを切り替えます。

本番モードではStripeのAPIキーが異なり、本番モードのWebhookを別途作成する必要があります。

これらの値をコピーして、テストモードの値を置き換えるようにVercelに貼り付けます。



# 再デプロイ

その後、変更が反映されるように本番デプロイを再構築する必要があります。

プロジェクトのダッシュボードで、「デプロイ」タブに移動し、最新のデプロイを選択し、オーバーフローメニューボタン（「Visit」ボタンの隣）をクリックし、「再デプロイ」を選択します（「既存のビルドキャッシュを使用する」オプションは有効にしないでください）。

本番モードで実行されていることを確認するために、Stripeのテストカードでチェックアウトを試してみてください。テストカードは機能しないはずです。



# 信頼性についての注意事項

このテンプレートは、完了したStripeトランザクションをSupabaseデータベースにミラーリングします。

つまり、Supabaseデータベースが利用できない場合、Stripeトランザクションは成功しますが、Supabaseデータベースは更新されず、アプリケーションはStripeにエラーコードを返します。

デフォルトでは、Stripeは3日間、またはデータベースの更新が成功するまで、ウェブフックに対する応答の送信を最大3日間再試行します。

つまり、データベースが3日以内にオンラインに戻れば、Stripeトランザクションは最終的にSupabaseデータベースに反映されます。

長期間の停止の場合は、SupabaseデータベースをStripeと自動的に調整するプロセスを実装することをお勧めします。



# 最後に

Starterなのに設定にかなり時間をとられました。

実際に金銭をやり取りしたわけではないので、
現場で使えるかどうかは不明です。

一番のハードルだったのは Stripeのドキュメントです。
金銭に関することな上に、多様な方法での設定ややり取りを行うため、
ドキュメントの量が多く、理解する上でとても苦労をしました。

それにブラウザでの表示が重いです。
ダッシュボードを開くだけでも1分程かかりした。
Stripe関連を開発中の時は、ダッシュボードを常にブラウザで開いたままにしておいたほうがいいと思います。


----------------------------------------
----------------------------------------
----------------------------------------

コード解読







----------------------------------------
----------------------------------------
----------------------------------------



ここでGitHubの作成されたリポジトリから
ローカルPCにCloneします。

GitHubリポジトリから自分のPCにダウンロードする方法はどれでもいいです。

例：
ghコマンドを使う方法

VSCodeのterminalから実行します。

```terminal
gh repo clone [GitHubアカウント名]/[先ほど決めたリポジトリ名]

```

※ gh コマンドを利用するには、GitHub CLIをインストールしておく必要があります。


Starter のソースコードをダウンロード後、インストールします。

```
npm install
npm run dev

```



※次に環境変数などを設定していきます。



Supabaseのダッシュボードへ行きます。

Dashboard | Supabase

https://supabase.com/dashboard/projects

プロジェクトを開いてTable Editorを見て

```table
customers
prices
products
subscriptions
users

```



デプロイボタンからインストールしていれば出来ているはずです。
これらのテーブルが出来ていることを確認します。

テーブルが出来ていなかった場合は、
SQL Editorにある

`Stripe Subscriptions`

というSQL文を実行すれば同じテーブルが出来ます。


