<!--
title:   SublimeText3で差分表示＆マージ Sublimerge Pro
tags:    SublimeText3,diff,merge
id:      a4be4cf4eb9a5f2b9118
private: false
-->
#Sublimergeの使い方
備忘録程度のもの

##インストール
コマンドパレット（Ctrl+shift+p）から
Sublimerge Pro
をインストールします。

##Sublimergeの使い方
###基本コマンド
コマンドパレット（Ctrl+shift+p）から
Sublimerge Compare to View
Sublimerge Compare to Clipboard
もしくは
右クリックから
Sublimerge>>Sublimerge Compare to View
Sublimerge>>Sublimerge Compare to Clipboard
のどちらかを選択します。
そうすると別ウィンドウにマージ専用ウィンドウが開きます。

差分がない場合警告が出てマージ専用ウィンドウは開きません。

####開いているファイルが1つだけの場合
クリップボードとの比較のみできます。

####開いているファイルが2つの場合
Compare to Viewを選択するとマージ専用ウィンドウが開きます。

####開いているファイルが3つ以上の場合
Compare to Viewを選ぶと現在開いているファイルと、その他の開いているファイルから選択した1つでマージ専用ウィンドウが開きます。

##左のフォルダツリーからは
shift+左クリックで現在のファイルとその上か下のファイルをえらび右クリックメニューからSublimerge>>Compare Selected Files
もしくは、
ctlr+左クリックで２つファイルを選択し、右クリックメニューからSublimerge>>Compare Selected Files

##ショートカットキー
現在開かれてるファイルとの比較をおこないます。
[ctrl]+[alt]+[d]

####開いているファイルが2つの場合
Compare to (ファイル名)を選択します。

####開いているファイルが3つ以上の場合
Compare to view...を選択して
候補のファイルが表示されるので比較するファイルを選択します。


##マージ専用ウィンドウでの（デフォルト）コマンド

/
差分の場所を選択し移動する。

ctrl+enter
ナビゲーター表示、非表示
ナビゲーターを非表示にすると編集可能。

↑キー
dff部分単位でカーソルを上へ移動

↓キー
dff部分単位でカーソルを下へ移動

→キー
現在選択しているdiff部分を右側ファイルにマージする。

←キー
現在選択しているdiff部分を左側ファイルにマージする。

shift+→キー
全diff部分を右側ファイルにマージする。

shift+←キー
全diff部分を左側ファイルにマージする。

##やり直す場合
マージ専用ウィンドウを保存せず閉じる。

保存した後やり直したい場合
（よくわからない、snapshot、Revertを使うようだ。）

##その他
5回に1回課金を求めてくる。（コマンド単位？）