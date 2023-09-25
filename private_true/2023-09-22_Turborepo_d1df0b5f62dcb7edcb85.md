<!--
title:   monorepo モノレポとはなにか？ Turbo repoを調査。 動的サイト＋静的サイト
tags:    Turborepo
id:      d1df0b5f62dcb7edcb85
private: true
-->

モノレポとはなにか？
１つのリポジトリに複数のアプリか、アプリと共通ライブラリが

モノレポ（Monorepo）とは、複数のプロジェクトやアプリケーションを1つのリポジトリにまとめたものを指します。つまり、1つのリポジトリに複数のアプリケーションや共通ライブラリが含まれることがあります。

モノレポを使用することで、複数のプロジェクトやアプリケーションを管理するための手間を減らすことができます。また、共通のコードやライブラリを複数のプロジェクトで共有することができるため、コードの再利用性が高まります。

ただし、モノレポを使用する場合、リポジトリのサイズが大きくなるため、クローンやビルドに時間がかかることがあります。また、複数のアプリケーションが同じリポジトリに含まれるため、変更の競合が発生する可能性があるため、適切な管理が必要です。



apps\withsupa\tsconfig.json

apps\withsupa
--filter=./apps/withsupa

フォルダ名を指定する方法

turbo build --filter=./apps/withsupa
turbo dev --filter=./apps/withsupa
turbo start --filter=./apps/withsupa



基礎を学ぶための最小限のTurborepo

Turborepo Quickstart – Turborepo

https://turbo.build/repo/docs#why-turborepo

npx create-turbo -e basic

名前を適当につける
pnpmのワークスペースを使用する



ファイルをダウンロードします。 少し時間がかかるかもしれません。    

>>> 以下のTurborepoを新規作成します：

apps
 - appsdocs
 - appsweb
packages
 - packageseslint-config-custom
 - packages
 - packagesui



>>> 成功！basic_repo "に新しいTurborepoが作成されました： 

  pnpm run build
     すべてのアプリとパッケージをビルドする。

  pnpm run dev
     すべてのアプリとパッケージを開発する

  pnpm run lint
     すべてのアプリとパッケージのリントを行う

Turborepoはデフォルトでローカルにキャッシュします。
さらにリモートキャッシュを有効にしてください。   
以下のコマンドを入力してください：

cd basic_repo
pnpm dlx turbo login



リモートキャッシュに接続するには、任意のturborepoで以下を実行してください：
pnpm dlx turbo login
npx turbo link
※練習なのでこのコマンドは実行しません
他人と一緒に開発する時等に便利な機能です。






> pnpm dlx turbo login
Packages: +2
++
Progress: resolved 7, reused 2, downloaded 0, added 2, done
>>> Opening browser to https://vercel.com/turborepo/token?redirect_uri=http%3A%2F%2F127.0.0.1%3A9789      

>>> Success! Turborepo CLI authorized for masakinihirota@gmail.com

To connect to your Remote Cache, run the following in any turborepo:

  npx turbo link





> pnpm dlx turbo ログイン
パッケージ +2
++
進捗：解決7、再利用2、ダウンロード0、追加2、完了
>> ブラウザで https://vercel.com/turborepo/token?redirect_uri=http%3A%2F%2F127.0.0.1%3A9789 を開く。     

>>> 成功！TurborepoのCLIは、masakinihirota@gmail.com。



Create Turborepo
http://localhost:3000/














公式
Index – Turbo

https://turbo.build/



コード ジェネレーター:
turbo gen新しいワークスペースの作成や
既存のワークスペースのコピーなど、
ソース コードを生成するために使用します。


プロジェクトは相互依存可能
コードも共有できるが、しなくてもいい

機能的な理由ではなく
プロジェクト的な理由でモノレポにする
アプリとドキュメントを一緒にする。






新しいコンポーネントを UI ライブラリに追加する
新しい単体テストの作成
新しい MDX ブログ投稿の生成
などする場合

turbo gen

で始める。



----------------------------------------

Turborepo Quickstart – Turborepo
https://turbo.build/repo/docs

















特にモノレポにする必要もないが、開発する上で一緒にリポジトリに入れとけば楽になると思ってまとめようと思う。

そもそもモノレポという言葉だけしか知らない段階で決めたこと。
モノレポというのは
１
機能とライブラリ

２
動的サイトと静的サイト
動的サイトはWebアプリで、
静的サイトはWebアプリのドキュメント
を兼ねるみたい使ってみようと思った。




monorepo のサポート
プロジェクトルートからサブパッケージの npm scripts を直接実行する。

GitHub Action / CircleCI が動作する
？？？Renovate のサポート対象に含まれる







公式 日本語ドキュメント 翻訳 現時点 83% 2023年9月22日
ワークスペース | pnpm
https://pnpm.io/ja/workspaces#%E4%BD%BF%E7%94%A8%E4%BE%8B







pnpm のインストール
Node.js のバージョン v16.9.0 以上

npm install -g pnpm

pnpm -v
8.7.1

適当なプロジェクトのフォルダを作成

移動
monorepo\monorepo_test

初期化
pnpm init

.npmrc ファイル作ります。
pnpm 以外のコマンド利用を禁止します。
	npm , yarn 等



pnpmのモノレポ

pnpmは レポジトリのrootに pnpm-workspace.yaml ファイルを
作ってモノレポを管理します。

```pnpm-workspace.yaml
packages:
  # packagesディレクトリ配下をすべてを登録します。
  - 'packages/**'
  # testディレクトリ内のはpackageに含めません。
  - '!**/test/**'


```



サブパッケージのnpm scriptを実行する方法

filter を使います。
--filterフラグ


```package.json (root)
"scripts": {
  "dev:app1": "pnpm run dev --filter app1",
  "dev:app2": "pnpm run dev --filter app2",
  "dev:all": "pnpm run dev --filter ."
},

```

使い方

pnpm run dev:all



root
├── package.json
└── packages/
    ├── app1/
     |  └── package.json
    └── app2/
        └── package.json




```
{
  "name": "monorepo_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "pnpm": "8.7.1",
    "npm": "please_use_pnpm"
  },
  "packageManager": "pnpm@8.7.1",
  "scripts": {
    "app1": "pnpm -F \"app1\"",
    "app2": "pnpm -F \"app2\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```



フラグ
-F
--filter
pnpm のフィルタリング
これを使うとサブパッケージの npm scripts を
ルートから直接実行できます。






```monorepo_test/packages/app1/package.json
{
  "name": "app1",
  "scripts": {
    "test": "echo \"hello app1\""
  }
}

```


```monorepo_test/packages/app2/package.json
{
  "name": "app2",
  "scripts": {
    "test": "echo \"hello app2\""
  }
}

```

pnpm app1 test 
pnpm app2 test

これでルートからスクリプトを直接実行できます。





----------------------------------------

# node モジュールをインストールする方法

通常
cd 移動先
pnpm add -E <package_name>

-F フラグがあると

# packages/app1 にインストールします。
pnpm app1 add -E <package_name>



monorepo横断での利用のためにプロジェクトルートに
インストールする場合は-wオプションを付与します。

pnpm add -w -E <package_name>




----------------------------------------

# CI






----------------------------------------
----------------------------------------







●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●



モノレポにします。
Next.js	Webアプリ
Nextra	Webアプリのドキュメント

モノレポの作り方
パッケージマネージャーで(Yarn, npm, pnpm)で workspace の設定
turbo repoのインストール
package.json にpipelineの設定











グローバルにインストールをします。
pnpm install turbo --global

バージョンを確認します。
turbo --version



既存のプロジェクトに追加

Add Turborepo to your existing project – Turborepo

https://turbo.build/repo/docs/getting-started/add-to-project

新しいリポジトリのベースに turbo.json ファイルを追加します：
turbo.jsonの設定については、設定オプションのドキュメントを参照してください。



ルート直下に turbo.json を追加します。

```turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

```



.gitignore

```.gitignore
# Turbo Repo
.turbo

```



Modules: Packages | Node.js v20.7.0 Documentation
https://nodejs.org/api/packages.html#packagemanager

パッケージマネージャを指定します。

pnpm -v
8.7.1

```package.json
  "packageManager": "pnpm@8.7.1",

```














？？？
npx @turbo/codemod add-package-manager



turbo build lint

2回目はキャッシュが効いているのですぐに終了します。
turbo build lint

タスクは複数指定できます。


dev コマンドを turbo で実行してみてください。

turbo dev

http://localhost:3000/



特定のワークスペースに対してのみタスクを実行
デフォルトでは、turbo run dev とすると、全てのワークスペースの dev が実行されます。しかし、--filter={ワークスペース名} でワークスペースを絞って実行できます。以下では、web のみ開発環境を実行しています。

turbo dev --filter=web






Vercel

ローカルの Turborepo をリモート キャッシュにリンクする場合は、まず Vercel アカウントで Turborepo CLI を認証します。
turbo login

次に、Turborepo をリモート キャッシュにリンクします。
turbo link



リンクを切断したい場合

To disable Remote Caching,
npx turbo unlink


Turbo repo に 新しいアプリを追加する

初期化
pnpm init next-app doc


それぞれの環境変数を turbo repo に知らせる必要があります。

```turbo.json


```
















Nextra とコードのモノレポ構成が最高のドキュメント体験を与えてくれる - Qiita

https://qiita.com/zane/items/73ff55c280bee2c690bf

どこか独立した場所で
mkdir doc

その中でインストールをします。
npm i next react react-dom nextra nextra-theme-docs

npm i nextra nextra-theme-docs

```next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
 
module.exports = withNextra()
 
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })

```


```package.json
  "scripts": {
    "dev": "next dev -p 8000",
    "build": "next build",
    "start": "next start -p 8000"
  },

```

















●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●





●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●







