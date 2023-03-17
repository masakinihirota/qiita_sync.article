<!--
title:   Next.jsでFaunaを使う。Github Vercel Next.js FaunaでNext.jsに無料で簡単に安全にサーバレスDBを追加する。
tags:    Fauna,Next.js,Vercel,faunadb
id:      86e0716b914e94493f35
private: false
-->
# 目的
VercelにNext.jsのアプリをデプロイ後、GUIからFaunaデーターベースを使えるようにします。

簡単にとは？
※GUIからボタンを数個クリックしていくだけでデータベースが使えるようになります。

安全にとは？
※Vercelのマーケットプレイスからこの機能を登録すると安全にキーが管理出来ます。
（FaunaDBはデータにアクセスするためにキーと呼ばれる文字列を作成し管理する必要があります、それを自動化してくれます。）

## 必要なもの＆環境＆知識
Windows10
VSCode
node.js
Githubアカウント＆リポジトリ
Vercelアカウント
Faunaアカウント

VercelにNext.jsのアプリをGithub経由でデプロイできます。
Githubを軽く知っている。
Vercelを軽く知っている。
Faunaを軽く知っている。

具体的にはVScodeからGithubのリモートリポジトリにpush出来て、
それをVercelと連携してGithubのリポジトリを常に監視してすぐに反映される状態にしておく、これぐらいはできる知識を持っていること。
FaunaはNoSQLタイプのデータベースでキーでパーミッションを管理している。
などの基礎知識は勉強済みであること。

# Next.jsでFaunaを使う。

## 大まかな流れと説明
Integrations Marketplace – Vercel
https://vercel.com/integrations

これはVercelのマーケットプレイス
このマーケットプレイスではVercelにデプロイされたNext.js等のアプリに
ボタンクリックだけで機能を追加してくれるという代物。

そのVercelのマーケットプレイスにFaunaが追加されます。
これはVercelにアップロードしたNext.jsのアプリに
設定０（config zero）で自動的にFaunaを使えるようにしてくれます。

Faunaとは次世代型のサーバーレス専用DB（NoSQL型）
Firebaseに近いDB、独自のSQLであるFQL、ビルトインGraphQL

Faunaはマーケットプレイス内のカテゴリ：データベース内にあります。
Integrations Marketplace – Vercel
https://vercel.com/integrations?category=databases

上側（ntegrations under “Databases”）が追加できるやつです、
下側（Request Integrations）が次に追加して欲しいものの一覧が表示され投票できます（一端投票したら取り消せません）。

## 実際の作業

ローカルのVSCodeでNext.jsのアプリを作ったらGithubにpushします。
デプロイ後、VercelからGithubのリポジトリを指定すると継続して監視するようになります。
そうすることでGithubにpush後、自動的にVercelにデプロイをしてくれます。

ここまでで
Vercel上にNext.jsアプリがデプロイ済み
Faunaのアカウント済
この２つが揃っていると
VercelからFaunaを追加できる。

ここで
Integrations Marketplace – Vercel
https://vercel.com/integrations?category=databases
Vercelマーケットプレイスのデーターベースカテゴリ内にあるFaunaを追加します。

Faunaを選択、クリック
青いaddボタンを押します。

ポップアップウィンドウが開きます、
githubのアカウントを選択、
Faunaを利用するリポジトリを選択（もしくは全リポジトリ）

データベースを選択
新規に作るか、既存のデータベースを利用するか選択をします。

新規に作ると、
新しいデータベースの管理キーは、環境変数 `FAUNA_ADMIN_KEY` に格納されます。
（An admin key for the new database will be stored in the FAUNA_ADMIN_KEY environment variable.）

既存のデータベースを選ぶと
admin keyが作成され、環境変数 `FAUNA_ADMIN_KEY` に格納されます。
（An admin key will be created and stored in the FAUNA_ADMIN_KEY environment variable.）

これでNext.jsにFaunaのAdmin keyが設定されアプリから自由にデーターベースにアクセスできるようになります。

以上で設定は終了です。

---
※Admin keyは何でもできるトランプのジョーカみたいなキーなので、通常のアプリを作る時はserver keyかcustom keyを作ってデータベースにアクセスするようにします。

---

# Vercel上で設定されている環境変数を使う。

Vercel上の環境変数の設定は、
プロジェクトのトップページから上側にあるSettingsタブを選択、Project Settingsページが表示される。
次に左側にあるEnvironment Variablesを選択すると表示されます。

Vercel上で環境変数`FAUNA_ADMIN_KEY` が設定されています。
その使い方は下記ページなどを参照してください。


#### ドキュメントを読む

Environment Variables - Vercel Documentation
https://vercel.com/docs/environment-variables

Enter the desired Name for your Environment Variable. For example, if you are using Node.js and you create an Environment Variable named API_URL, it will be available under process.env.API_URL in your code.

>環境変数に必要な名前を入力します。例えば、Node.jsを使用している場合、API_URLという名前の環境変数を作成すると、コード内のprocess.env.API_URLで利用できるようになります。


---

#### 確認

`FAUNA_ADMIN_KEY`の場合は、

```
console.log(process.env.FAUNA_ADMIN_KEY);
```

とどこか適当なところにconsole.logを書き、
`vercel dev`
で実行すると、
ローカルでも（Vercel側の設定でローカルでの使用を許可済み）
`FAUNA_ADMIN_KEY`の中身が表示されます。

`vercel dev`の`vercel`コマンドを使用するには
`yarn global add vercel`でインストールしておきます。

#### vercelコマンドで動かす理由

vercelのサイトの方で設定してあるので下記の通常コマンドでは環境変数を読み込んできてくれません。

`npm run dev`
`yarn dev`
で実行しても
`FAUNA_ADMIN_KEY`の中身は表示されません。

なのでvercelのサイトで設定した環境変数を読み込んできてもらうために`vercel`コマンドを使います。

`vercel dev`
で実行すると、
`FAUNA_ADMIN_KEY`の中身がターミナルに表示されるのが確認できるかと思います。

`vercel`コマンドを止めるのは`ctrl+c`を2回押します。

参考
vercel-fauna – Environment Variables – Vercel
https://vercel.com/{ユーザー名}/vercel-fauna/settings/environment-variables

Vercelで設定した環境変数をNext.jsで使用する - Qiita
https://qiita.com/Slowhand0309/items/f954237520d343fa9e4c

---
##他の方法
`vercel env pull`を実行すると、
`.env`ファイルがローカル上に作成されます。
これはvercel上で設定した環境変数をダウンロードしています。

`.env`ファイルをローカルにダウンロード出来れば、
`npm run dev`
`yarn dev`
のどちらかを実行するとローカルでも環境変数が使えるようになっています。

※`.gitignore`に`.env`を **必ず** 登録しておきましょう。公開してしまい誰かに悪用されてしまうととんでもないことになる場合があります。


`
# 環境変数の全リスト表示
vercel env ls
# それぞれの環境の環境変数
vercel env ls production
vercel env ls preview
vercel env ls development
# secretsのリスト
vercel secrets list
`
※使わなくなった環境変数は自分で削除しましょう。
アプリ側を消してもVercel側のも同時に消さないと残ったままです。

---

## 利点
無料で簡単にスケーラブルなデータベースを使えるようになります。
※よくある一定ラインまでは無料

Admin keyを安全に管理できます。
GraphQLがビルトインされていて最初から使えます。


## 欠点
FQL（Fauna専用のSQL）
ほとんどの人はSQLを捨ててFQLを使おうという気にはなれないでしょう、それほどにSQLのノウハウは大量にあり、技術的に枯れています。

---
# その他

## Next.jsのアプリをGithubにpushする。
ターミナルから
npx create-next-app --typescript

質問に答えていく
アプリの名前、その他
cd アプリの名前
npm install

Github上でリポジトリを新規作成、
指示通りに設定していく
git remote add origin https://github.com/｛ユーザー名｝/リポジトリ
git push -u origin main


## Faunaについて。

※ Faunaはサーバレス専用のDB

※ FaunaDBは、公式ではFaunaに名前を改めようとしている（と思う）。
FaunaにはVSCodeの拡張機能FaunaDBとFaunaがあるが同じリポジトリであるにも関わらず、Faunaの方にだけ最新パッチを当てていたから。

Faunaはデータにアクセスするのに全てキーでパーミッションを管理する。
Admin keyは全てのアクセスが可能
Server keyはデータベース単位でアクセスが可能
カスタムキーは各データ単位でアクセスのコントロールが可能。
余計なデータにアクセスをさせないようにするため。
ユーザーがアクセス単位を設定できる。

Fauna is a flexible,
developer-friendly,
transactional database delivered to you as a secure,
web-native API with GraphQL.
Using Fauna with Vercel enables you to build blazing fast web apps that scale without limits.
No operations necessary.
Powerful and productive development experience
No connection pools, works seamlessly with serverless functions
Scales transparently with your API requests
Fast global reads and writes
Modern security integrations
Zero database operations

Faunaは、
柔軟性が高く、
開発者が使いやすいトランザクションデータベースで、
GraphQLを使用した安全なWebネイティブAPIとして提供されます。
VercelでFaunaを使用すると、
制限なく拡張できる超高速のWebアプリケーションを構築することができます。
運用は必要ありません。
パワフルで生産性の高い開発環境
コネクションプールを使用せず、サーバーレス機能とシームレスに連携
API リクエストに応じて透過的にスケールアップ
高速なグローバルリード/ライト
最新のセキュリティ統合
データベース操作が不要

＞次のロードマップでは、Vercelスターターキットと、
ワンクリックで使えるNext.jsテンプレートの予定です。

---

公式blog
New in Fauna: Add Fauna to your Vercel applications in minutes
https://fauna.com/blog/new-in-fauna-add-fauna-to-your-vercel-applications-in-minutes

Fauna公式ドキュメントのDeepL化 （＋Googl翻訳）

masakinihirota/FaunaDB_Documents: https://docs.fauna.com/fauna/current/start/ を軽く翻訳 and md化
https://github.com/masakinihirota/FaunaDB_Documents

Vercel公式ドキュメント
環境変数の項を日本語化

FaunaDB_Documents/Environment Variables.md at main · masakinihirota/FaunaDB_Documents
https://github.com/masakinihirota/FaunaDB_Documents/blob/main/Vercel/docs/Environment%20Variables.md