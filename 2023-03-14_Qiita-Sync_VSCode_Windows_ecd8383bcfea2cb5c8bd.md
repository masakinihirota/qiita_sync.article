<!--
title:   qiita-syncの導入 体験記
tags:    Qiita-Sync,VSCode,Windows,拡張機能
id:      ecd8383bcfea2cb5c8bd
private: false
-->
※注意項目
WebでのQiita上で編集した時は下記手順を実行する。
* GitHub repository を開く
* "Actions"、"Qiita Sync" を開く
* "Run workflow" をクリックするを実行する。

---

この記事は

GitHub 連携で Qiita 記事を素敵な執筆環境で！ - Qiita
https://qiita.com/ryokat3/items/d054b95f68810f70b136

を利用したときに躓いたポイントの対処方法をかいた体験記です。
Github actions を利用する流れはほぼ上記の記事のとおりです。
（この記事の Github actions 操作の６割ぐらいは元記事のコピペです。）

# Github でのリポジトリを作成

ryokat3/qiita-sync-template: Template Repository for Qiita-Sync
https://github.com/ryokat3/qiita-sync-template

Use this template をクリック
Create a new repository を選択

自分のリポジトリの新規作成に入る
Create a new repository from qiita-sync-template

Repository name を適当に入力

qiita_sync.article
とリポジトリ名をきめて（名前は任意）

緑ボタンの
Create repository from template
を押す。

masakinihirota/qiita_sync.article
https://github.com/masakinihirota/qiita_sync.article

# Qiita Access Token の生成

Qiita
https://qiita.com/settings/applications

個人用アクセストークン
新しくトークンを発行するをクリック
アクセストークンの説明を書く
qiita_sync.article 用のトークン
と今回は決めた

スコープ（範囲）
read_qiita
write_qiita
の 2 つにチェック

緑ボタンの
発行する
を押してトークンを生成
出来たトークンを適当な場所に保存しておく

c5＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊28a

# Qiita Access Token の登録

先ほど作成した「qiita_sync.article」のリポジトリで

Settings から

左サイドバーの
Security 群にある
secrets and variables
を選択

開いたメニューリストから
Actions を選択

緑ボタンの
New repository secret
を押す。

Name に
QIITA_ACCESS_TOKEN
と入力

Secret は
先ほど作成したトークンを入力
c5＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊28a

緑ボタンの
Add secret
を押して登録する。

# 既存の Qiita 記事の同期

手動で Qiita と GitHub を同期させます。

## Github Actions の読み書きの許可

リポジトリ名の下側の、バーにある Settings から
左サイドバーに
Code and automation
Actions
General
を選択

右側エリアの一番下にある
Workflow permissions という場所にある
そこでラジオボタンの
Read and write permissions
を選択して
下にある Save ボタンを押す。

※この許可を与えないと 403 エラーになる
初めて Github actions を利用するときにこのエラーに引っかかった

```
・
・
・
remote: Permission to masakinihirota/qiita_sync.article.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/masakinihirota/qiita_sync.article/': The requested URL returned error: 403
Error: Process completed with exit code 128.

```

と log に報告があがる。
認証を許可しておけば、このエラーを解消してくれる。

## アクションの登録

qiita_sync.article リポジトリの Actions を選択。
（Code の右側、Settings の左側の間に挟まれている Actions ）

左サイドバーにある
Qiita Sync を選択

ページ右側にある
Run workflow を押す。

ポップアップ画面ででてきた
緑ボタンの
Run workflow
を押す

※Run workflow が 2 回でてきてややこしい

数分後、Qiita からダウンロードされた記事が GitHub リポジトリに追加されます。ファイル名は 最初に記事を作成した日付 + タグ + 記事の ID + .md になります。

## Qiita 記事のダウンロード

git clone git@github.com:<Your-ID>/<Your-Repository>.git で Qiita 記事をローカルのデバイスにダウンロードします。次の変更を加えます。

実際に使用したコマンド
git clone git@github.com:masakinihirota/qiita-sync.git

## VScode 上で Qiita の記事を編集

このコマンドでローカルの VScode 上で編集できるようになり、編集したものをコミットし、github へ PUSH すると Qiita にも数分後には反映されているのがわかりました。

## 同期

準備完了以降は、記事を書いて、git で push するだけです。あとは自動的に同期が始まるので、通常手動で同期を行うことはありません。

ただ、Qiita の Web アプリケーションで記事を更新すると、次の cron 起動じに上記の失敗した場合のバッジが表示されます。同時に GitHub に登録したメールアドレス宛にも通知が行きます。その他、複数の新しい記事を一度にダウンロードする場合などに失敗することがあります。

そのような場合には、以下の手順で GitHub Actions を実行し、記事を同期させるようにします。

GitHub repository を開く
"Actions"、"Qiita Sync" を開く
"Run workflow" をクリックする

# 記事の執筆

注意点

## 既存の記事

記事のヘッダの id は記事と紐づいているので変更しない。
title と tags は自由に変更できる。

例

```既存の記事 (idが割り振られている)
<!--
title:   VSCode 拡張機能 ChatGPT を使用するための下準備。モデル選択や日本語化等（Windows版）
tags:    ChatGPT,VSCode,setting.json,拡張機能
id:      27**********************abd
private: false

-->

```

# ローカル側からの新規の記事の作成

## ローカル側から記事を書く

新しいプロジェクトのためのQiita記事を新たに作る。

新たにローカルで作った記事をPUSHする。



### 新規に記事を書く

```vns.md
<!--
title: VNS
tags:  VNS,Qiita-Sync
-->

```

というファイルを作り。
※ファイル名は自由にできる、フォルダ下でもok。

* コミット後にGithubへ **PUSH** する。

* ActionsのページでQiita Syncと Qiita Sync Checkが動作するので、このworkflowが終わるまで待つ。

* **workflowが終わたら** 、VScode上からローカルへ **PULL** する。


今回はブラウザ上からGithubのActionページを目視でworkflowが終了するまでを監視をしたが、目視しない場合は**５分ほど待ってからPULLする**といいと思う。

※待っている間に、もしくはPULLし忘れているのにPUSHしてしまうと当然のようにトラブルになります、これで以前失敗しました。

VScode上からPULLすると。
タグ内に新たにQiitaから割り振られたIDが追記された先程の記事が書き換わっているのがわかります。

以上が、ローカルで作った記事をQiitaにアップロードして、それがローカルに反映されるまでの手順です。

#### 出来た記事

VNS - Qiita

https://qiita.com/masakinihirota/items/b191c5c1e94a0c449fea

※次のプロジェクトのための記事、現在はほぼ中身なし。2023年3月24日

## Qiita 上で記事を書いてローカル上で同期する

Qiita 上で中身が空の記事を書いてから
数分後
github 上に反映されているので
ローカルへ PULL すると
空の記事が表示される。
それを編集してから PUSH すると
Qiita 上に反映されているのが確認できました。

## Qiita 上で記事を削除した場合

github 上で紐づいた Qiita 記事の md ファイルも削除する必要があります。

```
<!--
title:   Qiita syncの記事作成テスト
tags:    ChatGPT,VSCode,setting.json,拡張機能
id:      aa*************4b1
private: false
-->

```

Qiita 上では削除になっている id が github でまだ使用されたままだと Qiita 側が拒否され Qiita Sync Check でリジェクトされます。
なので Qiita 上で削除した記事はローカル側のファイルも消して
github へ PUSH しましょう。

※ Qiita 側で削除した記事の id は使用不可能となって公開できないようです。
VScode のローカル側に削除した id を使った記事の md ファイルを残したままだとシンクロできずにエラーになるようです。

ヘッダ部分の id だけを削除した場合は、次回更新時に、違う新しい記事として認識され Qiita 上で公開されてしまいます。

なので Qiita 上で削除する場合は、github 上の紐づいたファイルを探しておいて、Qiita 上で削除したと同時に github 上とローカル上のファイルを削除する必要があります。

# フォルダを利用して記事を管理

フォルダを 2020 年以前の記事でまとめて
before2020、2021、2022、2023 と分けてみた。

フォルダ下に移動したファイルを更新して PUSH してみたところ
Qiita 上にもきっちりと反映されていたので。

フォルダを作成して記事を管理しても大丈夫のようです。

## 後記

VSCode の拡張機能から Qiita の記事を投稿できるのかやってみた。 - Qiita
https://qiita.com/masakinihirota/items/eb7927aff8356c55e147

VSCode の拡張機能（2 個目）から Qiita の記事を投稿できるのかやってみた。 - Qiita
https://qiita.com/masakinihirota/items/a220dabddd238ada5c67

これは自分が以前に投稿した記事。

過去、他に Qiita 投稿ツールはあったが、今回は自動シンクロ機能がついているのが向上している部分だった。

# 参考

GitHub 連携で Qiita 記事を素敵な執筆環境で！ - Qiita
https://qiita.com/ryokat3/items/d054b95f68810f70b136

この記事は上記の記事の体験記です、初めて Github actions を利用するときに出た
エラーを対処した場合の対応もあり、記事にしました。

## 初めて Github actions を利用する前にこの設定する必要がある

python - Permission denied to github-actions[bot] - Stack Overflow
https://stackoverflow.com/questions/72851548/permission-denied-to-github-actionsbot
