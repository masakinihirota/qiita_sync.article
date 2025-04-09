<!--
title:   template_masakinihirota
tags:    VNS,masakinihirota,vns.blue
id:      bd618dccf41dc663baf8
private: false
-->
オアシス宣言

自作アプリ masakinihirota用のテンプレートです。
Vercel公式が公開しているスターターを利用してオリジナルのテンプレートを作成します。

# 自作テンプレート

masakinihirota/template_masakinihirota

https://github.com/masakinihirota/template_masakinihirota

----------------------------------------

# スターターのリポジトリ

Vercel公式がNext.jsに+Supabase+Stripeで作ったリ↓ポジトリ

vercel/nextjs-subscription-payments: Clone, deploy, and fully customize a SaaS subscription application with Next.js.
https://github.com/vercel/nextjs-subscription-payments

スターターのデモ
Next.js Subscription Starter
https://subscription-payments.vercel.app/

↑このスターターアプリケーションに様々な設定や、環境変数を↓追加しました。

スターターのインストール、環境変数の設定は↓このBlogに書きました。

Next.js App Router と Supabase と Stripe のスターターアプリに色んなパターンの環境変数を設定 #Next.js - Qiita
https://qiita.com/masakinihirota/items/1ae7d17377b8bac524d5

	↑この記事はパターン1,2,3の3種類

Next.js Supabase Stripe のスターターアプリを デプロイボタンを利用して設定するハンズオン。 #Next.js - Qiita
https://qiita.com/masakinihirota/items/695f572b05b82c2a7d57

	↑この記事はパターン1の1種類

masakinihirota/vns_masakinihirota
https://github.com/masakinihirota/vns_masakinihirota

↑このリポジトリはクローンしただけでコード自体の変更はありません。

## 環境変数

今回使用する環境変数の設定はパターン3です。

パターン3は
Next.js ローカル
Supabase ローカル

※パターンの詳細は環境変数を設定した記事を御覧ください。



----------------------------------------

# インストール

基本的にローカルで開発できる状態にインストールしていきます。
Supabaseはローカルのを使います。

途中でVercelやSupabaseのサーバーを作って公開する過程もあります。



```
gh repo clone vercel/nextjs-subscription-payments .

pnpm install

```


```terminal
Copy-Item .env.local.example .env.local
Copy-Item .env.example .env

# 元ファイルの削除
Remove-Item .\.env.local.example
Remove-Item .\.env.example

```

環境変数の実際の値の設定は、先程紹介したのBlog記事を見てください。



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




## Tips

<details><summary>Tips Supabase</summary>

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

</details>



スターターで必要な、Supabase側の設定を行います。

Docker Desktopを使って
Supabaseを立ち上げます。

リポジトリ内にあるschema.sqlの内容をコピーして、
SupabaseのSQL Editorに貼り付け実行します。

supabase\schema.sql

Supabaseのダッシュボードからプロジェクトを選び、
左サイドバーにある、Table Editorを見ると、テーブルが５つ作成されます。

```
customers
prices
products
subscriptions
users

```



## Supabaseの型

型の保存場所を作成。

```terminal
mkdir src\types

```

型はこれから増えるので１か所にまとめておきます。

ルートにある
types_db.tsをsrc\typesに移動させておきます。


### pathの修正

```
import { Tables } from '@/types_db';

👇

import { Tables } from '@/types/types_db';

```


## 型の生成



```terminal
#サーバー
supabase gen types typescript --project-id [Reference ID] > src/types/types_db.ts

#ローカル
supabase gen types typescript --local --schema public > src/types/types_db.ts

supabase gen types typescript --local > src/types/types_db.ts


```

※[Reference ID] Supabaseの Reference ID を入力します。

publicの場合 --schema オプションは省略できます。
`--schema public`

成功すると型ファイルが生成されます。

# Stripeの設定 ローカル側（VSCode上での）Webhookの設定

```terminal
stripe login

Your pairing code *****

https://dashboard.stripe.com/stripecli/*****

```

が表示されます。


URLがターミナルに表示されるので、そのURLをブラウザで開きます。
サインインを求められます。

Stripe CLI にアカウント情報へのアクセスを許可しますか？
と聞かれるので、

pairing codeと一致しているはずなので、

アクセスを許可ボタンを押します。

```ブラウザ
アクセスを許可しました
このウィンドウを閉じて、CLI に戻ることができま

```

ブラウザを閉じます。


# Stripe設定価格の反映。

サンプルで
fixtures\stripe-fixtures.json
が事前に用意されています。

これをStripeに反映させます。

※👇この手続きは順番を適当にやると反映されない場合があります。

Next.jsのサーバーを立ち上げて(pnpm run dev)おいてから。
StripeのAPI監視(stripe listen)
価格設定の実行(stripe fixtures)
※この順番を守ってください。

実行順

```terminal
pnpm run dev

```

```ブラウザを開くと
No subscription pricing plans found. Create them in your Stripe Dashboard.

```

とまだ反映されていません。
別ウィンドウのterminalで

```terminal
stripe listen --forward-to http://127.0.0.1:3000/api/webhooks

```

👆 stripeコマンドを実行しておきます。

また、別ウィンドウのterminalで

```terminal
stripe fixtures fixtures/stripe-fixtures.json

```

を実行すると、stripe-fixtures.jsonに書いたStripeの設定が反映されます。

※このstripe-fixtures.jsonは追記型です、後からこのファイルを変更しても価格が新たに追加されるだけです。

↑それぞれ別のterminalを開いて実行します。
ブラウザをリロードしてください、
成功すれば、スターターのデモ画面のように サブスク プラン が表示されているはずです。




# GitHub認証の確認

Supabaseの左サイドバーのAuthenticationを開きます。
👇Usersを開きます。

http://localhost:54323/project/default/auth/users

Supabaseを作ったばかりなので、ユーザーはゼロです。

ブラウザで
http://localhost:3000/
を開きCookeiをクリアしておきます。

※ブラウザの右クリックから検証を開きアプリケーション タブを開きます。
左サイドバーのストレージにCookieがあるので開きます。

GitHub認証でユーザー登録(Sign In)を試します。
右上のSign In ボタンを押します。

Sign InのGitHubボタンを押します。

GitHubでログインしてみます、
自分の登録名がでたら成功です。

SupabaseのダッシュボードにもユーザーがGitHubで登録されています。
Supabaseのダッシュボードの左サイドバーからTable Editorを選択します。
usersテーブルにもユーザーが追加されているのが確認できます。

ブラウザのCookieにもsb-***-auth-token***と登録されています。



----------------------------------------

## Vercelにデプロイ

今回、このアプリをVercelにデプロイします。

### Vercel CLIをインストール

```terminal
pnpm i -g vercel

```

### ローカルでVercelへのログイン

```terminal
vercel login

```

	GitHubを選択します。

ブラウザにVercel CLI Login Successと表示されます。
ブラウザのこの画面を閉じます。

### vercelとプロジェクトのリンク

ローカル上からVercelとリンクするプロジェクトの選択

```terminal
vercel link

Vercel CLI 34.1.4
? Set up “*****\[プロジェクト名]”? yes
? Which scope should contain your
project? [プロジェクト名]'s projects
? Link to existing project? no
? What’s your project’s name?
[プロジェクト名]
? In which directory is your code
located? ./
Local settings detected in vercel.json:
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Development Command: next dev --port $PORT
- Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
- Output Directory: Next.js default
? Want to modify these settings? no
✅  Linked to [プロジェクト名]-project
s/[プロジェクト名] (created .vercel and added it to .gitignore)

```

## サーバー上のVercelとGitHubへの接続

Vercelを開き、新しく作ったプロジェクトを開きます。

Connect Git repositoryボタンを押します。

GitHubを選び、新しく作ったプロジェクトの右にあるConnectボタンを押します。




※ 環境変数は設定してないと空のままです。
Supabaseと連携をしておきます。

Next.js×Supabase×Vercel連携について #React - Qiita
https://qiita.com/kaho_eng/items/8a7faf77222a599fb31c

サーバー側にSupabaseのプロジェクトを作っておきます。

作ったSupabaseのプロジェクトをVercelとリンクします。


VercelのSettingsタブを選びます。

IntegrationsのBrowse Marketplaceを押します。
Supabaseを探して、追加します。

使いたいVercelとSupabaseを選びリンクします。

VercelとSupabaseの接続が完成したらbuildを行います。

Vercel上でbuildします。

成功するとStatusがReadyと表示されます。

vercelに登録されている環境変数をローカルに取得します。

```terminal
vercel env pull

```

	.env.localファイルが作成されます。
	既存のファイルがあると上書きするか聞いてきます。

Supabaseのローカルとサーバーの環境変数を使い分けると開発しやすくなります。

それぞれ別に環境変数ファイルを保存しておきます。


Vercelのプロジェクトを開きDomainsを見てみると
アプリの公開しているURLが表示されています。

これでもうすでに自分のアプリが世界に公開されている状態になっています。

Next.js Subscription Starter
https://masakinihirota.vercel.app/



----------------------------------------

※この記事では基本的にすべてローカルでの開発環境に合わせた環境変数を使用していました。

Vercelを経由して公開する場合、Supabase サーバーに合わせた環境変数を設定する必要があります。

## Vercel への環境変数を登録

Vercelでプロジェクトを開き、

上側のタブのSettingsを開きます。

左サイドバーの Environment Variablesを開きます。

ここに環境変数を入力します。

Supabaseのサーバーを使用する場合、それに対応した環境変数を入力します。

例

```Vercel環境変数
SUPABASE_AUTH_EXTERNAL_GITHUB_REDIRECT_URI="https://*****.supabase.co/auth/v1/callback"
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID=""
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET=""

```

※👆適当な値を入れてください。



----------------------------------------

これでスターターのイントールの設定は終了です。

ここからいろいろと便利な開発ツールを追加していきます。



----------------------------------------
----------------------------------------
----------------------------------------

## ローカルでの立ち上げ 動作確認

```terminal
npm run dev

supabase start

stripe listen --forward-to=localhost:3000/api/webhooks

pnpm test

```



# ローカル

Next.jsアプリ
http://localhost:3000

Storybook
http://localhost:6006/

ローカルの Supabase
http://127.0.0.1:54323/project/default



# サーバー

Supabaseダッシュボード
Dashboard | Supabase
https://supabase.com/dashboard/projects

Vercelダッシュボード
https://vercel.com/dashboard

公開サイト
Next.js and Supabase Starter Kit
https://masakinihirota.vercel.app/



----------------------------------------
----------------------------------------
----------------------------------------

# インストールする開発ツール

ESLint 機能 整形
Prettier コード 整形
husky チェック
国際化 i18n
shadcn/ui UI集 ダークモード
Storybook コンポーネント管理
vitest テスト駆動開発
Plop コードのテンプレートからの自動生成

↑スターターに、これらの開発用ツールを追加したものをテンプレートとします。

※lint-staged と husky の違いは？
lint-stagedは変更したファイルのチェックをして、それが通ったらhuskyで全体のチェックをするというイメージです。
しかしhuskyにはpre-commit機能があるのでlint-stagedの代替が可能ですのでlint-stagedは使用しません。

huskyの
pre-commit機能でgitにコミットする前にlintチェック等をします。
pre-push機能でgithubにpushする前にビルドします。


Next.js の ESLintとPrettier、turborepo、husky Next.js公式のドキュメントと独自調査 #Next.js - Qiita

https://qiita.com/masakinihirota/items/f1a4796ad3a535f27664

👆開発ツールを個別に調査した時の記事



## package.jsonのscript

※ package.jsonのscriptを自分なりに使いやすいように整理します。

各CLIをインストールしているので、直接実行するので、不要なscriptを削除したいと思います。


### CLI

supabase
Stripe
Vercel

#### CLIのインストール

scoopを使用します。

※VSCodeのpowershellはscoopが最初から使えるはずです。


##### Supabase CLI のインストール

Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=windows

```terminal
# install
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# update
scoop update supabase

```



##### Stripe CLI のインストール

Stripe CLI を使ってみる | Stripe のドキュメント

https://docs.stripe.com/stripe-cli?locale=ja-JP

```terminal
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git

scoop install stripe

```



##### Vercel CLI のインストール

Vercel CLI Overview

https://vercel.com/docs/cli

```terminal
# インストール
pnpm i -g vercel

# update
pnpm i -g vercel@latest

vercel --version

```


それぞれのCLIをインストールしてあればnpxを使わなくても実行できます。

特にSupabaseのCLIを整理します。

↓修正前のpackage.jsonのscript

```package.json
・・・
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prettier-fix": "prettier --write .",
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
    "supabase:pull": "npx supabase pull"
  },

・・・

```



例えば、

```package.json
    "supabase:start": "npx supabase start",

```

等は
SupabaseのCLIをイントールしますので、npxで実行する必要はないので削除します。

stripeのCLIもイントールしておきます。



↓不要なScriptの削除後のpackage.json

```package.json
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --ext .ts,.js,.tsx,.jsx src",
    "lint:debug": "eslint --ext .ts,.js,.tsx,.jsx src --debug",
    "lint:fix": "eslint --ext .ts,.js,.tsx,.jsx src --fix",
    "prettier-fix": "prettier --write .",
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

※後でインストールするvitest、storybookなどのscriptも一緒に設定しています。



## Stripeのコマンド

terminal上で直接コマンドを叩きます。

```terminal
stripe login
stripe listen --forward-to http://127.0.0.1:3000/api/webhooks
stripe fixtures fixtures/stripe-fixtures.json

```

fixtures/stripe-fixtures.json を編集して価格設定をすると反映されます。



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



## git開発ブランチ

main		メイン
dev			開発


devで開発してチェックしてエラーがなく、ビルドが通ったらmainにマージして
mainはgithubへpushします。

これはhuskyを使うと半自動化されます。
重要な決定は人間の手で、それ以外は自動化に出来ます。



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

# 確認してこれで良いのならインストールをする。
npm install --legacy-peer-deps
pnpm install --legacy-peer-deps

```



----------------------------------------
----------------------------------------
----------------------------------------

それでは実際にツールの追加をはじめます。
その前にトップ画面のコンポーネントの構造を把握しておきます。



# TOP画面 レイアウトの基本構成の使用コンポーネント

スターターで使われているトップ画面の使用コンポーネントの構成。
これらのコンポーネントをコメントアウトすれば、トップ画面がクリーンになります。


```src\app\layout.tsx
export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black loading">
        {/* <Navbar /> */}
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>
        {/* <Footer /> */}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

```

👆<Navbar />コンポーネントと<Footer />コンポーネント をコメントアウト



画面上部(ヘッダー部分)

```
app\layout.tsx
	components\ui\Navbar\Navbar.tsx

```

画面下部(フッター部分)

```
app\layout.tsx
	components\ui\Footer\Footer.tsx

```





本体

```
app\page.tsx
	components\ui\Pricing\Pricing.tsx

```

src\app\page.tsxをコピーして
src\app\PricingPage.tsxと名前を変更します。
そして、それをimportします。

```src\app\page.tsx
import PricingPage from "./PricingPage";

export default function Page() {
  return (
    <div className="">
      <PricingPage />
    </div>
  );
}

```

※PricingPageをコンポーネントとして呼び出しています。

これで切り分けられたので
<PricingPage />
をコメントアウトしておきます。

コピーした
src\app\PricingPage.tsx
はコンポーネントになったので、
src\components\PricingPage.tsx
へ移動します。

http://localhost:3000/
をみれば、Pricing Plansが表示されているはずです。

<PricingPage />をコメントアウトすれば、
TOP画面がきれいになりました。
これで、構想していたアプリをゼロから作ることができます。

必要になったら後で、
<Navbar />
<Footer />
<PricingPage />
をコードに戻してください。



----------------------------------------
----------------------------------------
----------------------------------------

# 開発を助けてくれるツールの導入

Next.js の ESLintとPrettier、turborepo、husky Next.js公式のドキュメントと独自調査 #Next.js - Qiita

https://qiita.com/masakinihirota/items/f1a4796ad3a535f27664

※長いので別の記事に分けました。

この記事の一部をベツのBlogに切り分けているだけで、実質的な続きです。
ESLint や Prettier、 turborepo、 husky を導入したい場合は利用してください。

```text
ESLint 静的解析ツール
prettier コードの整形ツール
husky Gitリポジトリのコミット時、プッシュ時に実行するスクリプトを管理するツール
Turborepo 並列処理を使用して高速にビルドするためのツール

```

これらを導入すると、コミット前、プッシュ前にエラーに気づけます。



## 参考

VSCodeで動かす Prettier 備忘録 #VSCode - Qiita

https://qiita.com/masakinihirota/items/26ba5ac12b476bc97751



----------------------------------------
----------------------------------------
----------------------------------------

# i18n 国際化

国際化の手順は↓に分けてます。

Next.js App Router の国際化 i18n (i18next react-i18next 他) ハンズオン #Next.js - Qiita
https://qiita.com/masakinihirota/items/9a4d54fbaa89a67106da



----------------------------------------

※重要

スターターのリポジトリのpackage.jsonのscriptのdevには

```package.json
   "dev": "next dev --turbo",

```

このように、--turboオブションがついていますが、この国際化をする時に言語変換がうまくいなかくなるので、

↓--turboオブションは削除してください。

```package.json
   "dev": "next dev",

```



----------------------------------------

## ライブラリのインストール

```terminal
pnpm install i18next react-i18next i18next-resources-to-backend accept-language react-cookie i18next-browser-languagedetector

```



----------------------------------------

## 下準備

i18nを導入する時、
不要、もしくは被ってしまうファイルを退避させておきます。

適当なフォルダを作ってそこに
src\app\page.js
src\app\layout.tsx
src\middleware.ts
を退避しておきます。



----------------------------------------

## 1 Folder structure

国際化した時のトップページを作っています。

```terminal
mkdir src/app/[lng]/
touch src/app/[lng]/page.js

```

```src/app/[lng]/page.js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${lng}/second-page`}>
        second page
      </Link>
    </>
  )
}

```



```terminal
mkdir src/app/[lng]/second-page/
touch src/app/[lng]/second-page/page.js

```

```src/app/[lng]/second-page/page.js
import Link from 'next/link'

export default function Page({ params: { lng } }) {
  return (
    <>
      <h1>Hi from second page!</h1>
      <Link href={`/${lng}`}>
        back
      </Link>
    </>
  )
}

```



```terminal
touch src/app/[lng]/layout.js

```

```src/app/[lng]/layout.js
import { dir } from 'i18next'

const languages = ['en', 'de']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

```

```terminal
pnpm run dev

```



### 動作確認

表示される、リンクも動作する
http://localhost:3000/ja
http://localhost:3000/en
http://localhost:3000/de
http://localhost:3000/aaa

404 This page could not be found.
http://localhost:3000/



----------------------------------------

## 2 Language detection

```terminal
mkdir src/app/i18n/
touch src/app/i18n/settings.js

```

```src/app/i18n/settings.js
export const fallbackLng = 'ja'
export const languages = [fallbackLng, 'en']

```



編集 src/app/[lng]/layout.js

```src/app/[lng]/layout.js
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}

```



```terminal
touch src/middleware.js

```

```src/middleware.js
import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req) {
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}

```



### 動作確認

表示される、リンクも動作する
http://localhost:3000/ja
http://localhost:3000/en

404(登録していない言語)
http://localhost:3000/de
http://localhost:3000/aaa

自動遷移
http://localhost:3000/
↓
http://localhost:3000/ja



----------------------------------------

## 3 i18n instrumentation

```terminal
touch src/app/i18n/index.js

```

```src/app/i18n/index.js
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

```


編集 src/app/i18n/settings.js

```src/app/i18n/settings.js
export const fallbackLng = 'ja'
export const languages = [fallbackLng, 'en']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

```



### コード解説

- `fallbackLng`という定数に、文字列"ja"を代入しています。
- `fallbackLng`は、デフォルトの言語を指定するための定数です。

- `defaultNS`という定数に、文字列"translation"を代入しています。
- `defaultNS`は、デフォルトの 命名空間 を指定するための定数です。NSはnema space (命名空間) の略語です。

- `cookieName`という定数に、文字列"i18next"を代入しています。
- `cookieName`は、i18nextライブラリが使用するクッキーの名前をつけています。

- `languages`という定数に、配列[fallbackLng, "en"]を代入しています。
- `languages`は、サポートする言語の配列を指定するための定数です。
- `fallbackLng`は、デフォルトの言語を指定するための定数であり、配列の最初の要素として使用されます。

- `getOptions`関数は、言語と命名空間を引数に取り、i18nextライブラリのオプションを返します。
- `lng`と`ns`は、それぞれ使用する言語と命名空間を指定するための引数です。

- `supportedLngs`は、サポートする言語の配列を指定するオプションです。

- `fallbackLng`は、デフォルトの言語を指定するオプションです。
- `lng`は、使用する言語を指定するオプションです。
- `lng`のデフォルト値は`fallbackLng`です。

- `fallbackNS`は、デフォルトの命名空間を指定するオプションです。
- `defaultNS`は、デフォルトの命名空間を指定するオプションです。

- `ns`は、使用する命名空間を指定するオプションです。
- `ns`のデフォルト値は`defaultNS`です。



### 命名空間（namespace）とは？

プログラム内で使用される識別子（変数名、関数名、クラス名など）
のスコープを限定するための仕組みです。

命名空間を使用することで、
同じ名前の識別子が複数存在する場合に、それらを区別することができます。

i18nextライブラリでは、翻訳対象のテキストを複数の命名空間に分けることができます。

例えば、ボタンのラベルを"button.label"という命名空間に、
メニューの項目を"menu.item"という命名空間に分けることができます。
これにより、翻訳対象のテキストをより細かく管理することができます。

命名空間を使用することで、
翻訳対象のテキストをより細かく管理することができます。

例えば、同じ言語であっても、
ボタンのラベルやメニューの項目など、
翻訳対象のテキストの種類によっては翻訳内容が異なる場合があります。

また、複数のページやコンポーネントで使用されるテキストがある場合、
それらを共通の命名空間にまとめることで重複した翻訳の作成を避けることができます。

さらに、命名空間を使用することで、翻訳対象のテキストをグループ化することができるため、
翻訳の修正や追加が容易になります。

例えば、Webアプリケーションの場合、複数のページやコンポーネントで使用されるテキストがある場合があります。この場合、命名空間を使用することで、翻訳対象のテキストをグループ化することができます。

例えば、以下のような命名空間を設定することができます。

例

```javascript
export const defaultNS = "common"

export const namespaces = [
  "common",
  "home",
  "about",
  "contact",
]

```

この場合、"common"という命名空間には、
複数のページやコンポーネントで使用される共通のテキストをまとめることができます。

また、"home"や"about"、"contact"といったページごとに命名空間を設定することで、
各ページで使用されるテキストをグループ化することができます。
これにより、翻訳の修正や追加が容易になります。
例えば、"common"という命名空間にあるテキストを修正する場合、
すべてのページやコンポーネントで使用されるテキストが修正されます。

また、新しいページを追加する場合には、
新しい命名空間を設定することで、
新しいページで使用されるテキストを簡単に管理することができます。



### 翻訳ファイル

```text
src
└── app
    └── i18n
        └── locales
            ├── de
            │   ├── translation.json
            │   └── second-page.json
            ├── en
            │   ├── translation.json
            │   └── second-page.json
            └── ja
                ├── translation.json
                └── second-page.json

```



```terminal
mkdir src/app/i18n/locales/de/
mkdir src/app/i18n/locales/en/
mkdir src/app/i18n/locales/ja/

touch src/app/i18n/locales/de/translation.json
touch src/app/i18n/locales/en/translation.json
touch src/app/i18n/locales/ja/translation.json

touch src/app/i18n/locales/de/second-page.json
touch src/app/i18n/locales/en/second-page.json
touch src/app/i18n/locales/ja/second-page.json

```

```src/app/i18n/locales/de/translation.json
{
  "title": "Hallo und willkommen bei VNS.BLUE!",
  "to-second-page": "Zur zweiten Seite",
  "to-client-page": "Zur clientseitigen Seite"
}

```

```src/app/i18n/locales/en/translation.json
{
  "title": "Hello and welcome to VNS.BLUE!",
  "to-second-page": "To second page",
  "to-client-page": "To client page"
}

```

```src/app/i18n/locales/ja/translation.json
{
  "title": "こんには、VNS.BLUEへようこそ!",
  "to-second-page": "2ページ目へ",
  "to-client-page": "クライアントページへ"
}

```


```src/app/i18n/locales/de/second-page.json
{
  "title": "Hallo von der zweiten Seite!",
  "back-to-home": "Zurück zur Seite 1"
}

```

```src/app/i18n/locales/en/second-page.json
{
  "title": "Hi from second page!",
  "back-to-home": "Go back to page 1 "
}

```

```src/app/i18n/locales/ja/second-page.json
{
  "title": "ここは2ページ目です。",
  "back-to-home": "１ページに戻る"
}

```


編集 src/app/[lng]/page.js

```src/app/[lng]/page.js
import Link from 'next/link'

import { useTranslation } from '../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
    </>
  )
}

```



編集 src/app/[lng]/second-page/page.js

```src/app/[lng]/second-page/page.js
import Link from 'next/link'

import { useTranslation } from '../../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
    </>
  )
}


```



### 動作確認

Hello
http://localhost:3000/ja
http://localhost:3000/en

404
http://localhost:3000/de
http://localhost:3000/aaa

デフォルト言語に遷移
http://localhost:3000/
↓
http://localhost:3000/ja



----------------------------------------

## 4. Language switcher

```terminal
mkdir src/app/[lng]/components/Footer/
touch src/app/[lng]/components/Footer/index.js

```

```src/app/[lng]/components/Footer/index.js
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { useTranslation } from '../../../i18n'
import { languages } from '../../../i18n/settings'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}

```


### 翻訳ファイル

```terminal
touch src/app/i18n/locales/de/footer.json
touch src/app/i18n/locales/en/footer.json
touch src/app/i18n/locales/ja/footer.json

```



```src/app/i18n/locales/de/footer.json
{
  "languageSwitcher": "Wechseln von <1>{{lng}}</1> nach: "
}

```

```src/app/i18n/locales/en/footer.json
{
  "languageSwitcher": "Switch from <1>{{lng}}</1> to: "
}

```

```src/app/i18n/locales/ja/footer.json
{
  "languageSwitcher": "変更する <1>{{lng}}</1> から "
}

```



編集 src/app/[lng]/page.js

```src/app/[lng]/page.js
import Link from 'next/link'

import { Footer } from './components/Footer'
import { useTranslation } from '../i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  );
}

```

👆<Footer>コンポーネントの追加



編集 src/app/[lng]/second-page/page.js


```src/app/[lng]/second-page/page.js
import Link from 'next/link'

import { useTranslation } from '../../i18n'
import { Footer } from '../components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page')
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>
        {t('back-to-home')}
      </Link>
      <Footer lng={lng}/>
    </>
  );
}

```

👆<Footer>コンポーネントの追加



### 動作確認

http://localhost:3000/en
http://localhost:3000/ja

Footerのリンクで言語変換が出来る。



----------------------------------------

## 5. Client side

クライアントコンポーネントでも翻訳します。
クライアントなので ReactのHooks や button等のUI が使えます。


```terminal
touch src/app/i18n/client.js

```

```src/app/i18n/client.js
'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'

import { getOptions, languages, cookieName } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) return
      setCookie(cookieName, lng, { path: '/' })
    }, [lng, cookies.i18next])
  }
  return ret
}

```



```terminal
touch src/app/[lng]/components/Footer/FooterBase.js

```

```src/app/[lng]/components/Footer/FooterBase.js
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { languages } from '@/app/i18n/settings';

export const FooterBase = ({ t, lng }) => {
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from { lng } to:{' '}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' or '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};


```

編集 src/app/[lng]/components/Footer/index.js

```src/app/[lng]/components/Footer/index.js
import { useTranslation } from '@/app/i18n'

import { FooterBase } from './FooterBase'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```


```terminal
touch src/app/[lng]/components/Footer/client.js

```

```src/app/[lng]/components/Footer/client.js
'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../../i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}

```



```terminal
mkdir src/app/[lng]/client-page/
touch src/app/[lng]/client-page/page.js

```

```src/app/[lng]/client-page/page.js
'use client'

import Link from 'next/link'
import { useTranslation } from '@/app/i18n/client'
import { Footer } from '../components/Footer/client'
import { useState } from 'react'

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)
  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('counter', { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">
          {t('back-to-home')}
        </button>
      </Link>
      <Footer lng={lng} />
    </>
  )
}

```



### 翻訳ファイル

```terminal
touch src/app/i18n/locales/de/client-page.json
touch src/app/i18n/locales/en/client-page.json
touch src/app/i18n/locales/ja/client-page.json

```

```src/app/i18n/locales/de/client-page.json
{
  "title": "Client Seite",
  "counter_one": "eines ausgewählt",
  "counter_other": "{{count}} ausgewählt",
  "counter_zero": "keines ausgewählt",
  "back-to-home": "Zurück zur Hauptseite"
}

```

```src/app/i18n/locales/en/client-page.json
{
  "title": "Client page",
  "counter_one": "one selected",
  "counter_other": "{{count}} selected",
  "counter_zero": "none selected",
  "back-to-home": "Back to home"
}

```

```src/app/i18n/locales/ja/client-page.json
{
  "title": "クライアントページ",
  "counter_one": "1つ選択されました",
  "counter_other": "{{count}}個選択されました",
  "counter_zero": "選択されていません",
  "back-to-home": "ホームに戻る"
}

```



編集 src/app/[lng]/page.js

```src/app/[lng]/page.js
import Link from 'next/link';

import { useTranslation } from '@/app/i18n'

import { Footer } from './components/Footer'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>
        {t('to-second-page')}
      </Link>
      <br />
      <Link href={`/${lng}/client-page`}>
        {t('to-client-page')}
      </Link>
      <Footer lng={lng}/>
    </>
  );
}

```



### 動作確認

http://localhost:3000/

色々リンクをたどってみてください。
翻訳機能が効いているはずです。


動作確認が完了したら、
i18nの翻訳機能の組み込みは完了しました。

しかし、現在rootにlayout.tsxが無いので
ビルドは通りません。

※開発モードのアプリケーションを立ち上げていると、ビルド自体が進行しません。


```terminal
pnpm run build

or

turbo type-check build

```

※ビルドをする時にはNext.jsのローカルアプリ(pnpm run dev)は落としておいてください。
立ち上げたままだとビルドが開始されません。



----------------------------------------

i18nの最初に移動させたファイルを元に戻します。

src\app\layout.tsx
src\app\page.tsx
を元に戻すと、ビルドが通るようになります。
(移動した\middleware.jsは後で)

この2つのファイルは共に余分なコンポーネントをコメントアウトしておいてありました。

layout.tsxでは
<Navbar />のコメントアウトを外します。



page.tsxは、
TOP PAGEの文字しか書かれていません。
他はコメントアウトしてあります。


src\app\[lng]\page.js へ
言語ページにリンクを張っておきます。

```src\app\[lng]\page.js
export default function Page() {
  return (
    <div className="">
      TOP PAGE
      {/* <PricingPage /> */}
      <a href="/ja">日本語ページ</a>
      <br />
      <a href="/en">English Page</a>
    </div>
  );
}

```

編集が完了したら、元の画面を表示してみます。

http://localhost:3000/



しかし、
http://localhost:3000/ja
でエラーが出るようになりました。

src\app\[lng]\layout.jsの機能を
src\app\layout.tsxへ移します。

デフォルトの言語を日本語に設定します。



編集 src\app\layout.tsx

```src\app\layout.tsx
import { dir } from 'i18next';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { languages } from '@/app/i18n/settings';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { getURL } from '@/utils/helpers';
import '@/styles/main.css';

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }));
}

const meta = {
  title: 'Next.js Subscription Starter',
  description: 'Brought to you by Vercel, Stripe, and Supabase.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL(),
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Stripe', 'Subscription'],
    authors: [{ name: 'Vercel', url: 'https://vercel.com/' }],
    creator: 'Vercel',
    publisher: 'Vercel',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
  };
}

export default async function RootLayout({ children, params: { lng = 'ja' } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="bg-black loading">
        <Navbar />
        <main className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]" id="skip">
          {children}
        </main>
        {/* <Footer /> */}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

```

👆このように編集したら、
src\app\[lng]\layout.js
の方は削除します。



### 動作確認

http://localhost:3000/
を開くと

http://localhost:3000/ja
と遷移してヘッダーとメイン画面が表示されているはずです。

メイン画面のi18n関連のリンクは正常ですが、
アカウント関連の機能はまだ機能していません。



## middleware

いまmiddlewareのファイルが
middleware.ts 退避させてあるファイル
middleware.js 新しく作ったファイル
と2つあります。

### middleware.js

新しく作ったほうのmiddleware.jsは
rootでも設定言語先にリダイレクトされるので修正します。

```middleware.js
import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';

import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};

export function middleware(req) {
  let lng;
  console.log('lng', lng);

  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    req.nextUrl.pathname !== '/' && // ルートパスの場合はリダイレクトしない
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

```



lint で警告が出ているので無効化します。

```src\app\i18n\client.js
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lng, cookies.i18next])

```





### middleware.ts

middlewareの2つのファルの機能を組み合わせます。

↑上のmiddleware.jsの拡張子をtsに変えて、middleware.tsの機能を組み込みます。

出来たのが↓こちらです。

```middleware.ts
import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
                '/((?!     _next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
};

export async function middleware(req: NextRequest) {
  // セッションの更新
  await updateSession(req);

  // 言語の取得
  let lng;
  if (req.cookies?.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // パスのlanguagesがサポートされていない場合はリダイレクトします
  if (
    req.nextUrl.pathname !== '/' && // ルートパスの場合はリダイレクトしない
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const referer = req.headers.get('referer');
    if (referer) {
      const refererUrl = new URL(referer);
      const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`));

      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
  }

  return NextResponse.next();
}

```




```src\app\page.tsx
export default function Page() {
  return (
    <div className="">
      {/* <PricingPage /> */}
      <br />
      <a href="/ja">日本語ページ</a>
      <br />
      <a href="/en">English Page</a>
    </div>
  );
}


```

移動させたmiddleware.tsファイルは削除してください。

i18n 国際化のインストールはこれで終了です。

ドイツ語対応は余裕があったらしてみてください。



### 動作確認

http://localhost:3000/

リンクの動作確認、
i18n国際化が動作してたら
確認完了です。



## 参考

Next.js 13 App Router の 国際化ドキュメント を色々と調査する。 #Next.js - Qiita

https://qiita.com/masakinihirota/items/873c2558e6d8864d8148



----------------------------------------
----------------------------------------
----------------------------------------

# フォルダ構造の再構築

今まではスターターのフォルダ構造をそのまま使っていましたが、
一旦立ち止まって、i18nに対応したフォルダ構造を再構築します。

基本的のコロケーションの考えでファイルを整理していきます。
コロケーションに関してはコロケーションの項を見てください。



# フォルダ構造

スターターの構造を国際化に対応させつつ
Next.jsのルートグループを使って役割ごとに分けます。

* 管理者
* 認証済み
* 未認証

Next.js App Routerはappフォルダ以下のルーティングが
そのままサイトのルートに決まりますが、
後はコンポーネント単位で組み込めますのでかなり自由に配置できます。


Routing: Route Groups | Next.js
https://nextjs.org/docs/app/building-your-application/routing/route-groups

Route Groupsをつかって、今までの構造を役割別に分類します。


```root以下のフォルダ
root
├── .husky
├── .next
├── .turbo
├── fixtures
├── node_modules
├── public
├── src
│   ├── app ルーティング
│   │   ├── [lng] <<国際化(別ツリーに作成)
│   │   ├── account
│   │   ├── api
│   │   ├── auth
│   │   ├── i18n <<翻訳ファイル
│   │   │   └── locales
│   │   └── signin
│   │       └── [id]
│   ├── components <<共通コンポーネント、パーツ
│   │   ├── icons
│   │   ├── laytou <<全体のレイアウトコンポーネント
│   │   │   ├── Footer 全体のフッター
│   │   │   ├── LngFooter 言語切替フッター
│   │   │   └── Navbar 全体のヘッダー
│   │   └── ui <<オリジナルのコンポーネント
│   ├── styles <<装飾
│   ├── types <<型
│   └── utils <<ユーティリティ
└── supabase

```

※深いところにあるフォルダは省略

laytouに関するコンポーネントを1か所にまとめる。

laytouフォルダの作成

```terminal
mkdir src\components\layout\

```

フッターコンポーネントは
src\components\ui\Footer\
を
src\components\layout\Footer\
に移動します。


ナビバーコンポーネントは
src\components\ui\Navbar\
を
src\components\layout\Navbar
に移動します。


src\app\[lng]\components\Footer\index.js
この言語切替のフッターコンポーネントを
LngFooter
と名前を変更します。

そしてコンポーネント管理フォルダ (src\components\) の下に移動します。

src\components\layout\LngFooter



src\app\[lng]\components
👆元のこのフォルダは削除しておきます。



## Route Groupsで分割する

Next.jsのRoute Groups機能を使います。

元のファイルやフォルダは(unauth)フォルダに入れます。

app以下はルーティング関連
(admin) 管理者用ページ
(auth) 認証済みユーザーページ
(unauth) 匿名、エンドユーザー用
を用意します

```[lng]以下のフォルダ
.
└── [lng]
    ├── (admin) 管理者用ページ
    ├── (auth) 認証ユーザー
    └── (unauth) 匿名、未認証ユーザー
        ├── client-page
        ├── second-page
        └── page

```



```src\app\[lng]\(unauth)\page.js
import Link from 'next/link';

import { useTranslation } from '@/app/i18n';
import { Footer } from '@/components/layout/LngFooter';

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/second-page`}>{t('to-second-page')}</Link>
      <br />
      <Link href={`/${lng}/client-page`}>{t('to-client-page')}</Link>
      <Footer lng={lng} />
    </>
  );
}

```


```src\app\[lng]\(unauth)\client-page\page.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useTranslation } from '@/app/i18n/client';
import { Footer } from '@/components/layout/LngFooter/client';

export default function Page({ params: { lng } }) {
  const { t } = useTranslation(lng, 'client-page');
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('counter', { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">{t('back-to-home')}</button>
      </Link>
      <Footer lng={lng} />
    </>
  );
}

```



```src\app\[lng]\(unauth)\second-page\page.js
import Link from 'next/link';

import { useTranslation } from '@/app/i18n';

import { Footer } from '@/components/layout/LngFooter';

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng, 'second-page');
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>{t('back-to-home')}</Link>
      <Footer lng={lng} />
    </>
  );
}

```



## グループルーティングのそれぞれの役割

Next.jsのRoute Groupsをつかった場合の一例です。

Routing: Route Groups | Next.js

https://nextjs.org/docs/app/building-your-application/routing/route-groups



### (admin) 管理者用ルートグループ

#### 役割

	サイト全体を管理する機能を提供します。

* ユーザー管理: ユーザーの登録、編集、削除、ブロックなどの操作
* コンテンツ管理: 記事、投稿、プロフィール情報の作成、編集、削除などの操作
* 設定管理: サイトの設定変更、機能の有効化/無効化などの操作
* レポート管理: サイトの利用状況やユーザーの行動に関するレポートの閲覧
* 問い合わせ管理: ユーザーからの問い合わせの閲覧と対応



### (auth) 認証済みユーザー用ルートグループ

#### 役割

	ログイン済みのユーザーが利用できる機能を提供します。

* ルートアカウント編集: ルートアカウント情報の操作
* ユーザープロフィール編集: プロフィール情報の操作
* マッチング機能: 他のユーザーとの検索、メッセージの送受信、などの操作
* コミュニティ機能: グループへの参加、イベントへの参加、他のユーザーとの交流などの操作
* 履歴管理: 過去の記録の閲覧
* プレミアム機能: 有料プランの利用などの操作



### (unauth)

#### 役割

	ログインしていないユーザーが利用できる機能を提供します。

* サイトトップページ: サイトの説明、機能紹介などのコンテンツ
* ユーザー登録: 新規ユーザーの登録
* ログイン: 既存ユーザーのログイン
* パスワードリセット: パスワードを忘れた場合の再設定
* 利用規約: サイト利用に関する規約の閲覧
* プライバシーポリシー: 個人情報保護に関するポリシーの閲覧



※テンプレートを使って、土台作成後はアプリ作成に集中できます。

その時、このRoute groups にそれぞれの機能を追加していきます。
どのようなアプリを作るかは、制作者次第です。



## middleware.ts

スターターで作成されている認証とアカウントは
国際化に対応していないので i18nのpath設定から除外します。

```src\middleware.ts
import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};

export async function middleware(req: NextRequest) {
  // セッションの更新
  await updateSession(req);

  // 言語の取得
  let lng;
  if (req.cookies?.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // パスのlanguagesがサポートされていない場合はリダイレクトします
  // スターター部分の認証機能関連のpathはi18nに対応してないのでハードコーディングしている。
  // 認証関連のパスはi18n機能に対応していない。
  if (
    req.nextUrl.pathname !== '/' && // ルートパスの場合はリダイレクトしない
    req.nextUrl.pathname !== '/signin' &&
    req.nextUrl.pathname !== '/signin/password_signin' &&
    req.nextUrl.pathname !== '/auth/callback' &&
    req.nextUrl.pathname !== '/account' &&
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const referer = req.headers.get('referer');
    if (referer) {
      const refererUrl = new URL(referer);
      const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`));

      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
  }

  return NextResponse.next();
}

```

フォルダを移動したことでpathの再設定が必要なファイルがあります、
それぞれ修正をしてください。



----------------------------------------
----------------------------------------
----------------------------------------

UIコンポーネント

# shadcn/ui

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

<details><summary>コラム shadcn/ui の読み方は？</summary>

作者本人のツィート

https://twitter.com/shadcn/status/1647397488742080512

> @shadcn how do i properly pronounce your handle when i'm introducing your projects to others 😅 been saying "shad-see-enn" but idk if that's correct

@shadcn 他の人にあなたのプロジェクトを紹介するとき、あなたのハンドルネームをどう発音すればいいのでしょうか？

> shad as in shadow

シャドウはshadowとだいたい同じです。

</details>



## 初期化

```terminal
pnpm dlx shadcn-ui@latest init

√ Which style would you like to use? » [Default]
√ Which color would you like to use as base color? » [Slate]
√ Would you like to use CSS variables for colors? ... [no] / yes

```

※初期化コマンドはすでにshadcn設定ファイルがある場合上書きされます。



## CLI からのコンポーネントインストール方法

`npx @shadcn-ui add`コマンドは、新しいUIコンポーネントをプロジェクトに追加するためのコマンドです。特定のオプションを指定することで、その動作をカスタマイズすることができます。


```terminal
pnpm dlx shadcn-ui@latest add

```

※package.jsonファイルのある場所で実行してください。



```terminal
pnpm dlx shadcn-ui@latest add

( )   accordion
( )   alert
( )   alert-dialog
( )   aspect-ratio
( )   avatar
( )   badge
( )   button
( )   calendar
( )   card
( )   checkbox
( )   collapsible
( )   command
( )   context-menu
( )   dialog
( )   dropdown-menu
( )   hover-card
( )   input
( )   label
( )   menubar
( )   navigation-menu
( )   popover
( )   progress
( )   radio-group
( )   scroll-area
( )   select
( )   separator
( )   sheet
( )   skeleton
( )   slider
( )   switch
( )   table
( )   tabs
( )   textarea
( )   toast
( )   toggle
( )   toggle-group
( )   tooltip

```

alert を選択してみます。

公式ドキュメントの通り追加してみます。

Alert - shadcn/ui

https://ui.shadcn.com/docs/components/alert



```src\app\page.tsx
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Page() {
  return (
    <div className="">
      {/* <PricingPage /> */}
      <br />
      <a href="/ja">日本語ページ</a>
      <br />
      <a href="/en">English Page</a>
      <Alert>
        <Terminal className="w-4 h-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}

```



----------------------------------------

# ダークモード

shadcn/uiのダークモードを追加します。

Next.js - shadcn/ui

https://ui.shadcn.com/docs/dark-mode/next

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

```src\components\theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

```



## ルートレイアウトにラップする

編集 src\app\layout.tsx

```src\app\layout.tsx
import { dir } from 'i18next';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

import { languages } from '@/app/i18n/settings';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { getURL } from '@/utils/helpers';

import '@/styles/main.css';

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }));
}

const meta = {
  title: 'Next.js Subscription Starter',
  description: 'Brought to you by Vercel, Stripe, and Supabase.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL(),
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Stripe', 'Subscription'],
    authors: [{ name: 'Vercel', url: 'https://vercel.com/' }],
    creator: 'Vercel',
    publisher: 'Vercel',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
  };
}

export default async function RootLayout({ children, params: { lng = 'ja' } }) {
  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body className="bg-black loading">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]" id="skip">
            {children}
          </main>
          {/* <Footer /> */}
          <Suspense>
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

```

```
    <html lang="ja" suppressHydrationWarning>

```

※ 👆suppressHydrationWarning は、React がクライアント側でレンダリングされたコンテンツをハイドレーションすることを抑制するために使用されます。



#### テーマを切り替える

モードトグルボタンコンポーネントを作成します。

```terminal
pnpm dlx shadcn-ui@latest add

(*) button
(*) dropdown-menu

```

👆 buttonとdropdown-menuを選択します。



buttonはそのままだと
src\components\ui\button.tsx
src\components\ui\Button\index.ts
とこのように被るので別の場所に移動させます。

適当な場所
src\components\button.tsx

そもそもコマンドでインストールするとかぶるので
Button - shadcn/ui
https://ui.shadcn.com/docs/components/button
👆shadcnのHPからコピーしてファイルを自由な場所においてもOKです。



i18n用のトグルページを作ります。
これはダークモード切り替え専用ページで
切り替えボタンだけのページです。

src\app\[lng]\ModeTogglePage\page.tsx ファイルを作ります。

```terminal
mkdir src\app\[lng]\ModeTogglePage\
touch src\app\[lng]\ModeTogglePage\page.tsx

```


```src\app\ModeTogglePage\page.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

```

↓トップページにトグルボタンページへのリンクを張ります。

編集 src\app\page.tsx

```src\app\page.tsx
import { Terminal } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Page() {
  return (
    <div className="">
      {/* <PricingPage /> */}
      <br />
      <a href="/ja">日本語ページ</a>
      <br />
      <a href="/en">English Page</a>
      <Alert>
        <Terminal className="w-4 h-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
      <Link href="./ModeTogglePage">ButtonTestPage</Link>
    </div>
  );
}

```

※これで完成しているはずですが、ボタンの色だけトグルしています。
最初のスターターで色がいろんな箇所でハードコーディングされているので、
それらをコメントアウト、または削除します。



## スターターのハードコーディングされているカラー設定のコメントアウト

```src\styles\main.css
html,
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', sans-serif;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  /* @apply text-white bg-zinc-800 antialiased; */
  @apply antialiased;
}

```

👆コメントアウト


ハードコーディングされていた全体の設定色をコメントアウトして
設定場所を理解したら色の設定部分は削除します。

※Header部分も修正したい人は調べてみてください。

例

```src\app\layout.tsx
  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      {/* <body className="bg-black loading"> */}
      <body className="loading">

```

👆例えばこのようにbg-blackと色が直接指定されている所を削除します。

削除するワード
bg-black
text-white
bg-zinc-***

主に影響を与えている箇所を修正

```src\app\layout.tsx
-      <body className="bg-black loading">
+      <body className=" loading">

```

```src\components\layout\Navbar\Navbar.module.css
.root {
-  @apply sticky top-0 bg-black z-40 transition-all duration-150 h-16 md:h-20;
+  @apply sticky top-0 z-40 transition-all duration-150 h-16 md:h-20;

.link {
-  @apply inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-zinc-200 rounded-md p-1;
+  @apply inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer rounded-md p-1;


-.link:hover {
-  @apply text-zinc-100;
-}

+/* .link:hover {
+  @apply text-zinc-100;
+} */

```

👆ナビバーのリンクの色とホバーした時のリンクの色

```src\styles\main.css
-  @apply text-white bg-zinc-800 antialiased;
+  @apply antialiased;

```



## Footerもダークモードのトグルボタンに対応

src\app\layout.tsx にあるFooter のコメントアウトを解除します。

Next.jsアプリにFooterが表示されます。

必要な部分だけ残して、後は削除します。
外部リンクを削除し、最低限見える所まで修正しています。

```src\components\layout\Footer\Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 ">
      <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 ">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2 border rounded-full border-zinc-700">
            </span>
            <span>VNS.BLUE</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                About
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Careers
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold transition duration-150 ease-in-out hover:text-zinc-200">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-zinc-200"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

```

※ハードコーディングされていた色のプロパティを削除しました。



----------------------------------------

## Accountもダークモードのトグルボタンに対応

```src\app\account\page.tsx
import { redirect } from 'next/navigation';

import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }

  return (
    <section className="mb-32 ">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} />
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}

```

※ハードコーディングされていた色のプロパティを削除しました。

----------------------------------------

👆これで最低限のダークモード切り替えが完了しました。

動作確認します。

```terminal
pnpm run dev

```

👇その他の箇所は各自が自分のイメージに合うように編集してください。

<details><summary>その他の箇所 (一部)</summary>
src\app\account\page.tsx

src\components\ui\AccountForms\EmailForm.tsx
src\components\ui\AccountForms\NameForm.tsx
src\components\ui\AuthForms\EmailSignIn.tsx
src\components\ui\AuthForms\ForgotPassword.tsx
src\components\ui\AuthForms\PasswordSignIn.tsx
src\components\ui\AuthForms\Signup.tsx
src\components\ui\AuthForms\UpdatePassword.tsx
src\components\ui\Button\Button.module.css
src\components\ui\Button\Button.module.css
src\components\ui\Card\Card.tsx
src\components\ui\Input\Input.module.css
src\components\ui\LoadingDots\LoadingDots.module.css
src\components\ui\LogoCloud\LogoCloud.tsx
src\components\ui\Pricing\Pricing.tsx
src\components\ui\Pricing\Pricing.tsx
src\components\ui\Toasts\toast.tsx

※他にも影響を与える箇所がある場合はそれぞれ対処してください。

</details>



## 動作確認

npm run dev

でローカルサーバーを起動して動作確認をします。

ダークモードの切り替えが確認できれば作業は完了です。



## 参考

Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。 #DarkMode - Qiita

https://qiita.com/masakinihirota/items/7cf6181ba61fe9dc3802



----------------------------------------

## アプリのLogo部分を自分のサイト名にする

```src\components\layout\Navbar\Navlinks.tsx
        <Link aria-label="Logo" className={s.logo} href="/">
          VNS.BLUE
        </Link>

```

↑ロゴ部分を自分のサイト名に変更します。



## ヘッダーにアプリの作る機能のボタンを並べる

ヘッダーに
ダークモード
言語
広告
Pricing
Account
ボタンの(仮)作成



## トグルボタンをヘッダーに移動

body部分に作ったダークモードのトグルボタンをNavlinksに移動させます。

src\app\[lng]\ModeTogglePage\page.tsx
<ModeToggle />
👆このコンポーネントを利用します。



```src\components\layout\Navbar\Navlinks.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import ModeToggle from '@/app/[lng]/ModeTogglePage/page';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  // eslint-disable-next-line
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          VNS.BLUE
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <ModeToggle />
          <Link className={s.link} href="/">
            言語
          </Link>
          <Link className={s.link} href="/">
            広告
          </Link>
        </nav>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/" className={s.link}>
            Pricing
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

```

<body>部分にあるトグルボタンは削除しても大丈夫です。



```src\app\page.tsx
<Link href="./ModeTogglePage">ButtonTestPage</Link>

```



----------------------------------------

## 動作確認

```terminal
npm run dev

```

でローカルサーバーを起動して動作確認をします。

Navbarでダークモードの切り替えが確認できれば作業は完了です。



----------------------------------------
----------------------------------------
----------------------------------------

コンポーネントを管理するツールをインストールします。

# Storybook

Get started with Storybook • Storybook docs

https://storybook.js.org/docs/get-started

## インストール

```terminal
pnpm dlx storybook@latest init

```

※初回は自動でStorybookが立ち上がり、Storybookチュートリアルが始まります。
このStorybookのチュートリアルはかなり出来が良いので、一度やってみることをおすすめします。

## 実行方法

```terminal
pnpm run storybook

```

http://localhost:6006/



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


## TailwindCSSを試す

TailwindCSSが効いているかどうかのお試しの Buttonコンポーネントとストーリーファイル。

```src\app\button\Button.tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({
  label,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:text-red-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {label}
    </button>
  );
};

```

```src\app\button\Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'TailwindCSS/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button TailwindCSS',
  },
};

```

```src\app\page.tsx
import { Button } from './button/Button';

・・・

<Button label="Storybook Test Button" />

・・・

```
👆 適当な場所にButtonコンポーネントを挿入しています。

動作確認

```terminal
pnpm run dev

pnpm run storybook

```

👆それぞれ別のTerminalで実行します。

Storybook
http://localhost:6006/

TailwindCSSの文字色などのプロパティ値が反映されていれば成功です。



## 参考

Storybook超入門（＋Next.js＋TypeScript） #React - Qiita

https://qiita.com/masakinihirota/items/ac552b8b492d2b962818



----------------------------------------
----------------------------------------
----------------------------------------

# Supabase

※開発で利用するSupabaseはWeb上のサーバーと、
Docker Desktopで立ち上げたのと2種類あります。
これらを便宜上サーバー、ローカルと呼びます。

Docker Desktopを利用して
ローカル環境にSupabaseを導入します。

Supabaseの話をすると長くなるので、公式ドキュメントと下記の記事をご覧ください。

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

etc.



## ローカルでのSupabaseの導入

Docker Desktopを利用して
ローカル環境にSupabaseを導入します。

開発は、
ローカル環境でPostgresのDBを触って開発します。
そしてそれをサーバーのDBに反映させる方法で行っていきます。



### Supabase CLIのアップデート

```terminal
scoop update supabase

```

## Supabaseにログイン

```terminal
supabase login

```

自動でブラウザが開きます。
ログインできたら閉じます。



# Supabaseのサーバーとローカルのプロジェクトをリンク

```terminal
supabase link --project-ref [project-id]

```

※パスワードが求められます。



```terminal
supabase projects list

```

サーバーのプロジェクト一覧が見れたらログイン成功です。

※projects list表示ではプロジェクトが複数あると、LINKEDに●のチェックが入っています。


サーバーとローカルのマイグレーション状況

```terminal
supabase migration list

```

※これはあくまでもローカルから見た状況です。
サーバーの最新の情報でない場合があります。



# 型の取得 DB(ローカル)

```terminal
supabase gen types typescript --local > src/types/types_db.ts

```


# 型の取得 DB(サーバー)

```terminal
supabase gen types typescript --project-id ***** > src/types/types_db.ts

```



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
supabase migration repair 20230618024722 --status applied
supabase migration repair 20231017082823 --status applied

```


Supabaseのマイグレーション
ローカル側の削除方法
マイグレーションのファイルを消すだけ

↓REMOTE（サーバー）側の削除方法

```terminal
supabase migration repair 20231017052010 --status reverted
supabase migration repair 20231017082823 --status reverted

```


Supabase サーバーのダッシュボードからの変更がある場合に取り入れます。

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


----------------------------------------
----------------------------------------
----------------------------------------

# ユーザーの認証状態を判断する

※認証はスターターに頼っているので、ユーザーが認証しているかどうかの有無だけは自分でチェックできるようにします。

Next.jsのローカルアプリ（`pnpm run dev`）を起動させて、
ユーザーの認証状態を確認します。

```src\app\page.tsx
・・・
      {/* userTestページへのリンク */}
      {/* テストなのでハードコーディングのリンク */}
      <Link href="/ja/userTest">userTest</Link>
・・・

```

```src\app\[lng]\userTest\page.tsx
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  console.log('user: ', user);

  return (
      <div className="">
        {user ? (
          <div>
            ユーザー認証中
          </div>
        ) : (
          <div>
            未ログイン
          </div>
        )}
      </div>
  );
}

```



## 解説
1. `import { createClient } from '@/utils/supabase/server';`
   - クライアント関数をimportします。

2. `const supabase = createClient();`
   - クライアントのインスタンスを作成します。

3. `const { data: { user } } = await supabase.auth.getUser();`
   - インスタンスから現在の認証状態（ログイン中またはログアウト中）を確認します。
認証されている場合、ユーザー情報が取得されます。この情報には、ユーザーのロールやその他の属性も含まれています。

4. `console.log('user情報: ', user);`
   - 確認のためuserデータの中身を見ます。

5. `user ?`
   - 条件文を使用して、表示するhtml情報を切り替えます。



Clientを作るのはSupabaseの中身にアクセスするため
Supabaseの中には各ユーザーの状態が保存されている。
だからクライアントをいくつ作ろうが結果は同じ。



<details><summary>user情報の中身</summary></details>

```
user情報:  {
  id: 'bcce1407-f302-4d1f-8ff9-6da8371576d9',
  aud: 'authenticated',
  role: 'authenticated',
  email: '*****@gmail.com',
  email_confirmed_at: '2024-04-30T00:50:06.100161Z',
  phone: '',
  confirmed_at: '2024-04-30T00:50:06.100161Z',
  last_sign_in_at: '2024-05-08T00:24:19.109395Z',
  app_metadata: { provider: 'github', providers: [ 'github' ] },
  user_metadata: {
    avatar_url: 'https://avatars.githubusercontent.com/u/7696510?v=4',
    email: '*****@gmail.com',
    email_verified: true,
    full_name: 'masakinihirota',
    iss: 'https://api.github.com',
    name: 'masakinihirota',
    phone_verified: false,
    preferred_username: 'masakinihirota',
    provider_id: '7696510',
    sub: '7696510',
    user_name: 'masakinihirota'
  },
  identities: [
    {
      identity_id: '0af821e2-683d-4ddc-8314-eb2cba169b6d',
      id: '7696510',
      user_id: 'bcce1407-f302-4d1f-8ff9-6da8371576d9',
      identity_data: [Object],
      provider: 'github',
      last_sign_in_at: '2024-04-30T00:50:06.09504Z',
      created_at: '2024-04-30T00:50:06.095073Z',
      updated_at: '2024-05-08T00:24:18.260691Z',
      email: '*****@gmail.com'
    }
  ],
  created_at: '2024-04-30T00:50:06.090609Z',
  updated_at: '2024-05-08T00:24:19.117078Z',
  is_anonymous: false
}

```



----------------------------------------
----------------------------------------
----------------------------------------

# スターターで用意されているテーブル

Supabase schemaのpublicのテーブルはサンプルが用意した5つがすでにあります。
Supabase schemaのauthのテーブルはSupabaseのシステムで用意されています。

Supabaseのダッシュボードから、
左サイドバーのTable Editorから見てみます。

customers
prices
products
subscriptions
users

の5つのテーブルが用意されていました。

今回はusersを見てみます。

参考

RLS(Row Level Security)入門ガイド Supabase(Postgres)データセキュリティの基礎 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/011c9ee596f6e4bcc78a



## Supabaseのpublic.usersテーブル

### Supabaseのpublic.usersテーブルのRLS

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



### Filtering

usersテーブルからデータを取得する際にフィルタリングを行う方法

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





	----------------------------------------
	----------------------------------------
	----------------------------------------

	public以外のスキーマへのアクセス方法

	第二引数にスキーマ名を指定します。


	スキーマがpublic以外の場合、fromメソッドの引数にスキーマ名を指定することができます。

	例えば、todoスキーマの場合は、以下のように指定できます。

	const todos = await supabase.from('todo', { schema: 'todo' }).select('*');

	ここでは、fromメソッドの第2引数にオプションとしてschemaを指定しています。schemaオプションには、テーブルが存在するスキーマ名を指定します。上記の例では、todoスキーマにあるtodoテーブルからすべてのTODOを取得しています。


	----------------------------------------

	Javascriptでのアクセス方法
	Supabaseの左サイドバーのTable Editorの右上にある
	ドキュメントのAPI Docsを開く



----------------------------------------
----------------------------------------
----------------------------------------

# Supabaseへのアクセス方法

参考
Next.js 13 App router と Supabase での４つのアクセス方法 #Next.js - Qiita

https://qiita.com/masakinihirota/items/b4b168a056dc10776d87

## 下準備

### todosテーブルの作成

```todos.sql
create table if not exists todos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  is_complete boolean default false,
  user_id uuid references auth.users default auth.uid()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table todos
  enable row level security;

create policy "Authenticated users can select todos" on todos
  for select to authenticated using (true);

create policy "Authenticated users can insert their own todos" on todos
  for insert to authenticated with check (auth.uid() = user_id);

```

👆SQL Editorで実行すると、
public.todosテーブルが出来ます。



### ダミーデータの作成

```dummy.sql
insert into todos(title)
values
  ('Create Supabase project'),
  ('Create Next.js app from Supabase Starter template'),
  ('Keep building cool stuff!');

```

👆SQL Editorで実行すると、
public.todosテーブルにダミーデータが挿入されます。

以上で下準備は完了です。



----------------------------------------

#### フォルダとファイルの追加

```terminal
mkdir src\app\examples\client-component
mkdir src\app\examples\route-handler
mkdir src\app\examples\server-action
mkdir src\app\examples\server-component

touch src\app\examples\client-component\page.tsx
touch src\app\examples\route-handler\page.tsx
touch src\app\examples\server-action\page.tsx
touch src\app\examples\server-component\page.tsx

```



#### リンクの追加

👇適当な場所にリンクを張ります。

```src\app\page.tsx
・・・
      <br />
      <Link href="./ja/examples/client-component">Client Component Example</Link>
      <br />
      <Link href="./ja/examples/route-handler">Route Handler Example</Link>
      <br />
      <Link href="./ja/examples/server-action">Server Action Example</Link>
      <br />
      <Link href="./ja/examples/server-component">Server Component Example</Link>
      <br />

・・・

```



### 型の取得

todosテーブルを新たに作ったので、型ファイルを作成します。
src\types\types_db.tsは型ファイルですが、この型ファイル(types_db.ts)はスターターが用意している型ファイルなので、Stripe関連の型が書かれています。

それとは別にローカルの型ファイル(types_db.ts)を作成します。

```terminal
supabase gen types typescript --local > src/types/types_db.ts

```


----------------------------------------

## 1 クライアントから Supabaseのデータを取得する方法

```src\app\[lng]\examples\client-component\page.tsx
'use client'

import { useEffect, useState } from 'react'

// Supabase クライアントのクライアントを作成
import { createClient } from '@/utils/supabase/client';

export default function ClientComponent() {
  const [todos, setTodos] = useState<any[]>([])
  const supabase = createClient();

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await supabase.from('todos').select()
      if (data) {
        setTodos(data)
      }
    }

    getTodos()
  }, [supabase, setTodos])

  return (<pre>{JSON.stringify(todos, null, 2)}</pre>)
}

```

### 動作確認

todosテーブルにダミーデータが登録されているのを確認しておきます。
ログインしているとtodosテーブルのデータが見れます。
ログアウトしているとtodosテーブルのデータは表示されません。


----------------------------------------

# 入出力

クライアントクライアント

```
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

```

👆クライアントを作る

関数を作る

```
export const getAllTodos = async () => {
  const todos = await supabase.from('todo').select('*');
  return todos.data;
};

```

```
export const addTodo = async (title: string) => {
  console.log('addTodo() title:', title);

  await supabase.from('todo').insert({ title });
};

```

```
export const deleteTodo = async (id: number) => {
  await supabase.from('todo').delete().eq('id', id);
};

```



----------------------------------------
----------------------------------------
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



----------------------------------------

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



----------------------------------------
----------------------------------------
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



----------------------------------------
----------------------------------------
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



----------------------------------------
----------------------------------------
----------------------------------------

# テスト駆動開発

再考 テスト駆動開発 #TDD - Qiita
https://qiita.com/masakinihirota/items/0a714d729d14da5cc7f4

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
----------------------------------------
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

#

<details><summary>コラム オンラインワークとリモートワーク</summary>

## リモートワークをオンラインワークへ改称する提案

**現状：リモートワークという言葉が持つ誤解**

リモートワークという言葉は、「リモコン」等を連想させるため、**遠くから離れた場所をコントロールする**というイメージが強いです。

**提案：オンラインワークという呼称のメリット**

* **場所の制約を明確に示す:** オンラインという表現は、インターネット環境さえあれば、どこからでも仕事ができるという**場所の自由度**を明確に示します。
* **柔軟な働き方を強調:** 時間や場所に縛られない、**多様な働き方**を可能にするというイメージを強調できます。
* **国際的な通用性:** 英語の "online work" は、世界共通で理解されるため、**グローバルな視点**にも適しています。

**改称による期待される効果**

* リモートワークという言葉が持つ誤解を解消し、**より正確なイメージ**を浸透させる。
* **多様な働き方への理解**を促進し、導入を後押しする。
* **テレワーク推進法**などの法整備や、**社会的な認知度向上**に貢献する。

**具体的な改称方法**

* 企業や団体が率先して、社内文書や対外的な情報発信において**「オンラインワーク」**という呼称を使用する。
* メディアや政府機関も、報道や政策立案において**「オンラインワーク」**という呼称を積極的に使用する。
* 一般市民への啓蒙活動を行い、**「オンラインワーク」**という言葉を広く認知させる。

**懸念点と対応**

* **既存の「リモートワーク」という言葉との混同**：
    * しばらくの間は、**「リモートワーク」**と**「オンラインワーク」**の両方の呼称を使い分け、併記することで、混乱を避ける。
* **一部の人の抵抗感**：
    * **「オンラインワーク」**のメリットを丁寧に説明し、理解を得る努力をする。

**結論**

リモートワークをオンラインワークと改称することは、**場所の制約を明確に示し、柔軟な働き方を強調する**というメリットがあります。

**改称によって、**多様な働き方への理解**を促進し、**社会全体における働き方の変革**を加速させることが期待できます。

**※** 上記はあくまで一例であり、具体的な改称方法については、関係者間で議論を深めていく必要があることを付記します。



</details>



##





##





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
そこに、👇Page.tsxを作って、その場所を開きます。

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
----------------------------------------
----------------------------------------

# デザインシステム(デジタル庁)

デザインシステムを使うかどうかは各自が判断をお願いします。

このテンプレートとは別の場所にインストールします。

```terminal
git clone https://github.com/digital-go-jp/design-system-example-components .

pnpm i

pnpm run storybook

```



----------------------------------------

#

Nextra 無料で簡単にドキュメントをMarkdownで編集出来る静的サイトを作るツール (ドキュメント編) #Next.js - Qiita
https://qiita.com/masakinihirota/items/c9c80914b227a1716cdc

ドキュメントに書かれていることが全て正しく最優先される。



----------------------------------------
----------------------------------------
----------------------------------------


これで、だいたい一般的なサイトの土台が作れました。

この土台から、自分のオリジナルのコードを埋めていきます。


----------------------------------------
----------------------------------------
----------------------------------------

以下 未実装

----------------------------------------

# google認証 Slack認証

google認証とSlack認証は、GitHub認証だけでは足りない場合追加します。



Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub) #GitHub - Qiita
https://qiita.com/masakinihirota/items/706326a64dab3ffbf55b

ローカルでGitHub認証などを動かすための
Supabase設定ファイル config.toml

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


----------------------------------------

# GitHub認証 無料

Login with GitHub | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-github

GitHub ログインの設定は、次の 3 つの部分で構成されます。

1. GitHub上で GitHub OAuth アプリを作成および構成する。
2. GitHub OAuth キーをSupabase プロジェクトに追加します。
3. ログイン コードをSupabase JS クライアント アプリに追加します。



プロバイダー トークンは、プロジェクトのデータベースには意図的に保存されません。
プロバイダー トークンは、プロジェクトのデータベースには意図的に保存されません。
プロバイダー トークンは、プロジェクトのデータベースには意図的に保存されません。

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
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback

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
vns.blue

masakinihirota
masakinihirota

Homepage URL
https://www.vns.blue/
https://www.vns.blue/

https://www.masakinihirota.com/
https://www.masakinihirota.com/

Application description
vns
vns
masakinihirota
masakinihirota

取得したCallback URL を登録します。
Authorization callback URL

masakinihirota
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback

Register Buttonボタンを押します。



登録すると
vns.blueのClient ID等が表示されます。
or
masakinihirotaのClient ID等が表示されます。

Supabase に戻ってGitHubで取得した値を登録します。

GitHub
vns
vns
masakinihirota
masakinihirota

Client ID
****************

Client Secret (携帯認証が必要)
****************



Callback URL (for OAuth)
vns.blueはどちらか
	https://gzctqdrrnnkaxwwtzbsw.supabase.co/auth/v1/callback
	https://gzctqdrrnnkaxwwtzbsw.supabase.co/auth/v1/callback
or
	https://moymglaixrfalkqfifpq.supabase.co/auth/v1/callback
	https://moymglaixrfalkqfifpq.supabase.co/auth/v1/callback

masakinihirota
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback
https://vivxvupohephesnkxkxo.supabase.co/auth/v1/callback

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



----------------------------------------

# Middleware

複数のMiddlewareを作成します。

## Qiita記事

Next.js 14 App router Middlewareを複数のファイルに分割する方法 #Next.js - Qiita

https://qiita.com/masakinihirota/items/c84daec1a48ee0a02199

Next.jsでの初心者向け Middleware.ts入門 (v13.1.0) ＋ 公式マニュアル 解説 ＋ 複数のMiddlewareの実装方法 #Next.js - Qiita

https://qiita.com/masakinihirota/items/30a5e06e3288031b9788



## middleware.tsの作成

middleware.ts はsrc直下に移動させます。



## オリジナルのmiddleware.tsの解説

```middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '../src/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};

```

AIにコードをペタっと貼り付けて聞いたほうが早く正確だと思いますが、

updateSession(request);

↑この関数はセッションを更新して、ログアウトしたユーザーなどを弾く効果があります。

configのmatcher設定は、
クライアントからのリクエストの選別をする機能になります。

この例では、静的ファイル、画像以外という設定になります。
つまり、静的ファイル、画像以外のすべてのリクエストを、このMiddlewareでチェックするようになります。

正規表現を知っていれば簡単です。


## Middlewareに適した機能

Middlewareは、リクエストとレスポンスの中間で処理を行う関数です。そのため、以下のような、リクエストやレスポンスを処理する機能に適しています。

認証チェック
画像処理(圧縮、サイズ変更 他)
リクエストのロギング
リダイレクト
キャッシュ制御
セッション管理
データ変換
国際化
アクセス制御

これを（全部実装するとは限りませんが）1ファイルにまとめるのは
スパゲティコードになるのは間違いないので、
機能単位で複数ファイルに分けます。






## Middlewareの分割

オリジナルのmiddleware.tsを、
複数のmiddleware.tsに分割します。

まず
middlewareフォルダをsrcフォルダの直下に作ります。

```
mkdir src/middlewares

```



機能単位毎にMiddlewareファイルを作成します。

```
touch src/middlewares/middleware1.ts
touch src/middlewares/middleware2.ts
touch src/middlewares/middleware3.ts

```



```src\middleware.ts
import { chain } from './middlewares/chain';
import { withMiddleware1 } from './middlewares/middleware1';
import { withMiddleware2 } from './middlewares/middleware2';
import { withMiddleware3 } from './middlewares/middleware3';

export default chain([withMiddleware1, withMiddleware2, withMiddleware3]);

// Rootへのリクエストのみ
// export const config = {
//   matcher: ['/'],
// };

// 画像と静的ファイルを除くすべてのリクエスト（デフォルト設定）
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

```



```src\middlewares\chain.ts
import { NextMiddleware, NextResponse } from 'next/server';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}

```



```src\middlewares\middleware1.ts
import { createClient } from '@/utils/supabase/middleware';
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware1(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(
      'middleware1.ts: request.nextUrl.pathname',
      request.nextUrl.pathname
    );

    // createClient関数のコードを見る
    // このコードはMiddleware上でセッションのチェックをしたいだけで
    // requestやeventを使っていないので、そのまま使っても問題ないと思います。
    // Middleware1 2 3 でrequest変数を使いまわしている。(バケツリレー？)
    const { supabase } = createClient(request);
    // const { supabase, response } = createClient(request);

    await supabase.auth.getUser();

    return middleware(request, event);
  };
}

```

middleware1.ts にはセッションの更新機能を追加しています。
これはスターターのリポジトリでも更新チェックをしています。



```src\middlewares\middleware2.ts
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware2(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.url;
    console.log('middleware2.ts: request.url', url);

    return middleware(request, event);
  };
}

```

console.log の出力は適当に決めています。



```src\middlewares\middleware3.ts
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware3(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const credentials = request.credentials;
    console.log('middleware3.ts: request.credentials', credentials);

    return middleware(request, event);
  };
}

```

console.log の出力は適当に決めています。




Middlewareの機能は、あとで必要になったら追加します。

現在はユーザーのセッションのチェックをmiddleware1で行っています。



----------------------------------------

#

型安全のブログ

TypeScript アプリを強化する: タイプセーフな翻訳のための i18next をマスターする
https://locize.com/blog/i18next-typescript/


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



----------------------------------------

# 独自ドメインの設定

Vercelで独自ドメインを設定する方法 | YoheiKoブログ
https://yoheiko.com/blog/vercel%E3%81%A7%E3%81%AE%E7%8B%AC%E8%87%AA%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E8%A8%AD%E5%AE%9A/



----------------------------------------

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



----------------------------------------

ファイル命名規則

基本Next.jsに従う

サーバーコンポーネント
***.server.tsx
クライアントコンポーネント
***.client.tsx

DBアクセス、フェッチしているところは
ファイル名に付ける
出来る限り分離する



役割
サーバーコンポーネント
データ取得
データ加工

クライアントコンポーネント
データ表示

Server Componentを上手く分離できない悩みを解消したい (Next.js App Router)
https://zenn.dev/kokone/articles/d04c9529d1cb21
zustand






## 開発を助ける 外部アプリ&外部ツール

Windows
Chrome
Firefox Developer Edition
VSCode
PowerShell
Vercel
GitHub
GitHub Copilot
GitHub Copilot chat
Docker
Docker Desktop



## 開発を助ける 外部アプリ&外部ツール データベース関連

pgAdmin 4
DBeaver
Postman

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

----------------------------------------

バックアップ
リストア
を計画する。

----------------------------------------

VNS #Qiita-Sync - Qiita

https://qiita.com/masakinihirota/items/b191c5c1e94a0c449fea
