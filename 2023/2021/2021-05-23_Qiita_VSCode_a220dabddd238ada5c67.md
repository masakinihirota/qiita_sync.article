<!--
title:   VSCodeの拡張機能（2個目）からQiitaの記事を投稿できるのかやってみた。
tags:    Qiita,VSCode
id:      a220dabddd238ada5c67
private: false
-->
# 前回の記事
1個目 vscode_qiitaapi
vscode_qiitaapi - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=yuuyu.vscode-qiitaapi&ssr=false#overview

前回のレビュー記事
VSCodeの拡張機能からQiitaの記事を投稿できるのかやってみた。 - Qiita
https://qiita.com/masakinihirota/items/eb7927aff8356c55e147

# レポジトリ
https://github.com/yuu-1st/vscode_qiitaapi
https://github.com/neet/vscode-qiita

# 総評
|評価|拡張機能名|
|---|---|
|○|vscode_qiitaapi（前回投稿したのVSCode拡張機能、↑記事）|
|△|vscode-qiita（今回のVSCode拡張機能）|

### vscode_qiitaapi ○
テンプレートを事前に書いているのでテンプレート作成後なら記事の投稿が簡単、投稿に特化。
機能がシンプル。
テンプレートは一旦書き方を覚えれば楽。
更新が安心で楽。（ショートカット登録で更に楽）
テンプレートが面倒（デフォルト値がほしい）
投稿や更新をたくさんする人はこちらのほうが良いと思う。
vscode_qiitaapiの方はつい先日リリースしたばかり。

### vscode-qiita △
テンプレートがいらないこと、右クリックで公開できること。
更新ができない＜＝かなり痛い（やり方見落としているだけかも）
記事一覧が取得できること。
投稿が面倒、投稿等は右クリックで出来るのは楽。
記事投稿時に、タイトル名やタグを記入するので使いにくい。
記事投稿時にタグを5つも設定するのは非常に面倒。
その他のリスト表示機能等ちょっとした使いやすさは上回っている。
最後のメンテナンスは9ヶ月前。

# 環境
Windows10
VSCode

vscode-qiita △
neet/vscode-qiita: 🔍 Smart Qiita integration for Visual Studio Code
https://github.com/neet/vscode-qiita

前回投稿したのとは別のQiita投稿用のVSCode拡張機能

違い
テンプレートがいらない。
記事一覧が取得できる。
ただし連続して記事一覧は取得できない。一旦、記事一覧をクリアしてしまうと一度VSCodeを再起動させる必要がある。
記事一覧から編集できる。
記事一覧上で右クリックからブラウザで表示、タイトルの編集、タグの編集、投稿を公開、削除、が可能。
mdファイル上で右クリックから投稿できる。
更新が出来ない、具体的には更新できず新しい記事として提出されてしまう。
（実際2重投稿になってしまったので慌てて消した。）

|評価|名前|最終更新月|インストール数|Version|
|---|---|---|---|---|
|○|vscode_qiitaapi|21年5月|4 installs | 0.1|
|△|vscode-qiita |19年2月| 594 installs | 0.1.11|