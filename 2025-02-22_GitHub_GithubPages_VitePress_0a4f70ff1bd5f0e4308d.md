<!--
title:   vitepress入門 GitHub Pagesにデプロイ、公開するまで。 静的サイトジェネレーター
tags:    GitHub,GithubPages,VitePress
id:      0a4f70ff1bd5f0e4308d
private: false
-->
調査理由
honoでのドキュメントに使われていたのを見て。

# 公式サイト

VitePress | Vite & Vue Powered Static Site Generator
https://vitepress.dev/

# インストール

空のフォルダを用意します。(日本語名フォルダを使わないでください)

```terminal
npm add -D vitepress

# 対話での初期化、選択は各自の自由にしてください。
npx vitepress init

┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  Practice Vitepress
│
◇  Site description:
│  temp site for practicing vitepress
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.

```

公開フォルダは
`docs`
にします。

## GitHub Copilot .gitignore

.gitignore ファイルに VitePress のキャッシュとビルド出力ディレクトリを追加します。

通常node_moduleｓsに加えて、

```.gitignore
# VitePress cache
.vitepress/cache

# VitePress build output
.vitepress/dist

```

👆️を追加します。



----------------------------------------

# ローカル立ち上げ、確認

```terminal
npm run docs:dev

```

ローカルdev
masakinihirota
http://localhost:5173/

```terminal
npm run docs:preview

```



## プレビュー

masakinihirota
http://localhost:4173/

## ビルド


```terminal
npm run docs:build

```

※ビルドが出来たらGitHubへデプロイしてください。
GitHubリポジトリの作成、デプロイ方法等は省略します。

リポジトリ例
masakinihirota/masakinihirota-docs
https://github.com/masakinihirota/masakinihirota-docs



----------------------------------------

# GitHub Pagesで公開する

## GitHub pagesの設定

`docs\.vitepress\config.mts` ファイルにbaseを設定します。
これはgithubにデプロイしたリポジトリ名になります。

:::note info

https://[username].github.io/[repository]/

[username]
[repository]
は各自の環境に合わせてください。
GitHubの自身のユーザー名と、作ったリポジトリの名前を入れます。

:::

今回のGitHub pagesの例
https://masakinihirota.github.io/masakinihirota-docs/

自分の場合は
[username] ＝＞ masakinihirota
[repository] ＝＞ masakinihirota-docs
となります。



## config.mtsへの追加

```config.mts
...
export default defineConfig({
	base: "/masakinihirota-docs/", // サイトがサブパスで提供される場合のベースパス


```

https://github.com/masakinihirota/masakinihirota-docs/blob/main/docs/.vitepress/config.mts

## GitHub側での設定。

masakinihirota/masakinihirota-docs
https://github.com/masakinihirota/masakinihirota-docs

👆 リポジトリから
👇 settingsタブ＞pagesを開きます。

Pages
https://github.com/masakinihirota/masakinihirota-docs/settings/pages

![vitest GitHub Pages.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ee91e1d7-76dc-4e57-a3d2-7a7a8b818d95.png)



初期設定は Noneになっているので
mainブランチを公開設定にします。

※自分の好きなブランチを公開ブランチに指定できます。自分は、mainを選択しました。



## GitHubへのデプロイ

index.mdファイルなどを編集して、GitHubへ変更をデプロイします。
そうすると、自動でGitHub上でビルドしてくれます。
その動作確認をします。

### GitHub リポジトリの actionsタブ

actionsタブを選択します。

![vitepress Gtihub actions.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/87c52ee8-7e6e-427a-b265-06155663e02a.png)



Workflow runs · masakinihirota/masakinihirota-docs
https://github.com/masakinihirota/masakinihirota-docs/actions

ここでミドリ色のチェックマークが付くと
GitHubでの自動ビルドが完了したことになります。

GitHub Pagesを訪れます。

masakinihirota
https://masakinihirota.github.io/masakinihirota-docs/

編集した部分が反映されているはずです。




docsフォルダを作ってそこで静的サイトが作成されます。



masakinihirota
masakinihirota/masakinihirota-docs
https://github.com/masakinihirota/masakinihirota-docs




----------------------------------------

# 実際のサイトの書き方

あとはMarkdownで書くだけです。
この記事ではここまでにします。
