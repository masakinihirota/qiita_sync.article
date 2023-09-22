<!--
title:   monorepo モノレポとはなにか？ Turbo repoを調査。 動的サイト＋静的サイト
tags:    Turborepo
id:      d1df0b5f62dcb7edcb85
private: true
-->
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

pnpmは pnpm-workspace.yaml ファイルを作ってモノレポを管理します。


サブパッケージのnpm scriptを実行する方法

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







