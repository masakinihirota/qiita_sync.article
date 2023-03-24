<!--
title:   degitとは （GitHubリポジトリの中の一部だけを簡単にダウンロードするツール）
tags:    Bitbucket,Git,GitHub,GitLab,degit
id:      418eec4422fd06690924
private: false
-->
# リポジトリの中の一部をダウンロードしたい。

## 必要環境
[Node.js](https://nodejs.org/ja/) 8以上


### 使用例
#### 巨大リポジトリ Next.jsの中のサンプル hello-world をダウンロードしたい。

Next.jsのリポジトリ ***（約50000KB）***
https://github.com/vercel/next.js
（Next.js のお試しサンプルはNext.jsリポジトリ内に300本以上用意されています。）

Next.jsのリポジトリの中にあるサンプル hello-world ***（約2KB）***
https://github.com/vercel/next.js/tree/canary/examples/hello-world

git cloneコマンドはリポジトリすべてをダウンロードするため時間がかかります。
気軽にNext.jsのサンプルを試せません、そこで `degit` を使います。

#### degit の github リポジトリ
[Rich-Harris/degit: Straightforward project scaffolding](https://github.com/Rich-Harris/degit)

#### インストール
`npm install -g degit`

![next.jshelloworldusername.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/28be04a0-e376-2a7c-454b-e5d30c3b5fed.jpeg)


#### ダウンロード
`degit vercel/next.js/examples/hello-world`
このようにサンプル hello-world への ***ユーザーアカウント名＋パス*** を指定するだけでOKです。

※ユーザーアカウント名（ここではvercel）をつけることを忘れないでください。
degit ***vercel***/next.js/examples/hello-world
`degit ユーザーアカウント名＋パス`

ダウンロード先は空である必要があります、ローカル側になにも存在しない場合のみダウンロードできます。

## いくつかの使用パターン例
現在位置に直接ダウンロード（ダウンロード先のフォルダ名を指定しない場合）
`degit vercel/next.js/examples/hello-world`

ダウンロード先のフォルダを指定したい場合
`degit vercel/next.js/examples/hello-world ./{ダウンロード先のフォルダ名}`

フォルダ名を指定して（`/hello`）現在位置の下にダウンロード
`degit vercel/next.js/examples/hello-world ./hello`

フォルダ名を指定して（`/hello`）ルートフォルダの下にダウンロード
`degit vercel/next.js/examples/hello-world /hello`

X 出来ない ルートフォルダ直下（`/`）にダウンロードは不可 （強制コマンドオプションを使用すれば可能）
`degit vercel/next.js/examples/hello-world /`

# degit は使いたいが、degit自体を環境内にインストールしたくない場合。

`degit` の 前に `npx` をつければインストールせずに `degit` が使えます。

## 使用例
`npx degit ユーザーアカウント名/リポジトリのパス ./{ダウンロード先のフォルダ名}`

`npx degit vercel/next.js/examples/hello-world`
`npx degit vercel/next.js/examples/hello-world ./hello`
`npx degit vercel/next.js/examples/hello-world /hello`

# ブランチ、タグ、コミットを指定する
（デフォルトのブランチはmain）

`degit user/repo#dev`       # ブランチ dev
`degit user/repo#v1.2.3`    # タグ v1.2.3
`degit user/repo#1234abcd`  # commit ハッシュ 1234abcd

# リポジトリ全体をダウンロードする。
リポジトリ全体をダウンロードする事も可能です。（＝ `git clone` コマンドとほぼ同じ）

このコマンドは
`degit user/repo`
（`degit {ユーザーアカウント名}/｛リポジトリ名｝`）
以下と同じ
`degit github:user/repo`
`degit git@github.com:user/repo`
`degit https://github.com/user/repo`

# その他のソフトウェア開発のプラットフォームでの使用例

## GitLab からダウンロード
`degit gitlab:user/repo`
`degit git@gitlab.com:user/repo`
`degit https://gitlab.com/user/repo`

## BitBucket からダウンロード
`degit bitbucket:user/repo`
`degit git@bitbucket.org:user/repo`
`degit https://bitbucket.org/user/repo`

## Sourcehut からダウンロード
`degit git.sr.ht/user/repo`
`degit git@git.sr.ht:user/repo`
`degit https://git.sr.ht/user/repo`

# JavaScript API

Nodeスクリプトの中でdegitを使うこともできます。

```sampleAPI.js
const degit = require('degit');

const emitter = degit('user/repo', {
	cache: true,
	force: true,
	verbose: true,
});

emitter.on('info', info => {
	console.log(info.message);
});

emitter.clone('path/to/dest').then(() => {
	console.log('done');
});

```

# その他
`git clone` のオプションコマンドに `degit` と同じことが出来るコマンドがあります、しかし長く、覚えづらく、そして使いづらいです。

リポジトリの中の1つのファイルだけを取ってくる時はcurlコマンドを使っていました。