<!--
title: GitHub Copilot 導入後のはじめの一歩
tags:  github copilot
private: false
-->

# 導入後（課金後）
導入後に何をしていいのか？何が出来るのかがよくわからなかったので調べてみた。

# 環境
Windows10
GitHub Copilot 導入 1年契約済(or1月契約)
VSCode

# はじめの一歩

VSCodeで使用する。問題はここから、

最初に
VSCode拡張機能を入れる
* GitHub Copilot
* GitHub Copilot Labs

* GitHub Copilot Nightly（不明）
これはGitHub Copilotをアンイストールしないとインストール出来ない。

* GitHub Copilot X 発表はされたがまだ詳細は報告されていない(2023年3月28日)


上記の拡張機能を入れるとVSCodeの再起動が求められる。
次に拡張機能を利用するためにGitHubにログインするよう求められる。
ログインをする。
GitHub Copilot Labsで認証する。

# 使い方

## GitHub Copilot

### 何かを作る
新しいファイルを用意する。
拡張子を使用する言語にしておく。
コメント欄に何かを書く。
候補が出てくる。
**TABキー**で決定する。

他の候補を見たい時
候補が出ている場面で
**次候補を見る: Alt＋]**
**戻る: Alt＋[**


手動で候補を出したい時
Ctrl + Space




## GitHub Copilot Labs

新しいファイルを用意する、拡張子を使用する言語にしておく。
既存のファイルでもよい。

左サイドバーにあるCopilot アイコンを押す。
クリックすると

* EXPLAIN コードの解説をおこなう
* LANGUAGE TRANSLATION  言語の変換
例：JavaScriptのコードをPythonへ変換

* BRUSHES  アイコンをクリックする事で各種機能が使用できる。
* TEST GENERATION コードに対してテストコードを作る

それぞれの機能を使用することが出来る。



### BRUSHES機能
コードを読みやすくしたり各行ごとにコメントを追加する機能です。
この機能は、標準で提供されている機能で満足していない場合、CUSTOMという機能を使うことで、ChatGPTにお願いするようなことをGitHub Copilotに対して指示することができます。

