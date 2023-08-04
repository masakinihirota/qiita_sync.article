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

Qiita上で更新をGitHubに反映させた後、ローカル側でのPULLも忘れずに行いましょう。

---

Qiitaのタグ privateを変更する場合等はQiita側から変更したほうがトラブルがなくて良いです。
使えない記号(/記号) タグには使えない等と失敗するのを事前に教えてくれます。

# まとめ
Q: 記事を書く手順は？
A:
1. Qiita上で限定共有投稿で記事を書きます。
そうすると、Qiitaからidが割り振られた非公開の記事が出来ます。

1. そうしてからQiita SyncとQiitaSync Checkを実行します。（例えば、ローカルで記事を変更してPUSHするとこのコマンドの実行が開始されます。）

1. GitHub上にQiitaの記事が反映されるのでPULLするとローカルにも新たにidが割り振られた.mdファイルができます。

1. そのファイルを自由に編集します。 ＜＝投稿記事を書く

1. private: falseにします。

1. その後はPUSHすると自動でQiitaに反映されます。

※ この方法だとid問題でのトラブルを回避することが出来ます。

Q: VSCodeからQiitaへアップする記事を書くにはどうすればいいのか？
A: 新規記事をVSCodeで書く場合は、テンプレートを使い記事を書きます。
それをGithubにPUSHしたあと Workflowが自動実行してQiitaに反映されます。
その後（Workflowが終わった）、数分待ってから手動でVSCodeへPULLしましょう。

Q: Qiita Sync Checkでエラーが出る場合はどうすればいいのか？
A: Qiita Sync Checkでエラーが出る場合は、Qiita Sync Checkを実行する前にVSCodeへPULLしましょう。
そして手動でQiita Syncを実行しましょう。
成功するとQiita Sync Checkが自動で起動して成功するはずです。
成功したらもう一度PULLしましょう。

# IDが割り振られたQiitaの記事をローカル側でファイル名を変えてしまったら？
記事名をわかりやすく変更したい場合があります。
しかし、 そのままでは素直にSyncしてくれないので、

1. Qiita上の該当記事を削除します。

1. ローカルでその該当記事のID行を削除します。

1. PUSHしてGithubリポジトリと同期します。

1. その後、Qiita Syncを実行します。

※ git mvコマンドで問題ないかもしれない。（未検証）

# Qiita SyncとQiita Sync Checkでやらかし。

新規でローカルで記事を書いてからQiitaへアップする場合、もちろんidは割り振られてないのでid:の行は削除しておきます。

## やらかしたこと。

しかし、これを忘れてアップロードし続けると同じ内容の記事が新しい記事としてアップされてしまいます。

なので、Qiitaで記事を書いてからローカルへPULLしてidを割り振ってもらってから記事を書くとこの事故が防げると思います。




# まとめ
Q: VSCodeからQiitaへアップする記事を書くにはどうすればいいのか？
A: 新規記事をVSCodeで書く場合は、テンプレートを使い記事を書きます。
それをGithubにPUSHしたあと Workflowが自動実行してQiitaに反映されます。
その後（Workflowが終わった）、数分待ってから手動でVSCodeへPULLしましょう。

Q: Qiita Sync Checkでエラーが出る場合はどうすればいいのか？
A: Qiita Sync Checkでエラーが出る場合は、Qiita Sync Checkを実行する前にVSCodeへPULLしましょう。
そして手動でQiita Syncを実行しましょう。
成功するとQiita Sync Checkが自動で起動して成功するはずです。
成功したらもう一度PULLしましょう。

# この記事に関して
この記事は

GitHub 連携で Qiita 記事を素敵な執筆環境で！ - Qiita
https://qiita.com/ryokat3/items/d054b95f68810f70b136

を利用したときに躓いたポイントの対処方法をかいた体験記です。
Github actions を利用する流れはほぼ上記の記事のとおりです。
（この記事の Github actions 操作の６割ぐらいは元記事のコピペです。）


# テンプレート

```***.md
<!--
title:
tags:
id:
private: false
-->

```

## Tips 下書き
**markdownファイル** で書く。（＋テンプレートを消しておく。）

もしくは、
下書きは **textファイル** で作成する。（＋テンプレートを最上部に書き込む。）
**textファイル**で作成することで、監視対象ファイルにならない。
アップロードしたいときは、拡張子を **textファイル** から **markdownファイル** に変更する。


# 体験記
## Github でのリポジトリを作成

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

## Qiita Access Token の生成

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

## Qiita Access Token の登録

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

## 既存の Qiita 記事の同期

手動で Qiita と GitHub を同期させます。

### Github Actions の読み書きの許可

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

### アクションの登録

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

### Qiita 記事のダウンロード

git clone git@github.com:<Your-ID>/<Your-Repository>.git で Qiita 記事をローカルのデバイスにダウンロードします。次の変更を加えます。

実際に使用したコマンド
git clone git@github.com:masakinihirota/qiita-sync.git

### VScode 上で Qiita の記事を編集

このコマンドでローカルの VScode 上で編集できるようになり、編集したものをコミットし、github へ PUSH すると Qiita にも数分後には反映されているのがわかりました。

### 同期

準備完了以降は、記事を書いて、git で push するだけです。あとは自動的に同期が始まるので、通常手動で同期を行うことはありません。

ただ、Qiita の Web アプリケーションで記事を更新すると、次の cron 起動じに上記の失敗した場合のバッジが表示されます。同時に GitHub に登録したメールアドレス宛にも通知が行きます。その他、複数の新しい記事を一度にダウンロードする場合などに失敗することがあります。

そのような場合には、以下の手順で GitHub Actions を実行し、記事を同期させるようにします。

GitHub repository を開く
"Actions"、"Qiita Sync" を開く
"Run workflow" をクリックする

## 記事の執筆

注意点

### 既存の記事

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

## ローカル側からの新規の記事の作成

### ローカル側から記事を書く

新しいプロジェクトのためのQiita記事を新たに作る。

新たにローカルで作った記事をPUSHする。



#### 新規に記事を書く

```vns.md
<!--
title: VNS
tags:  VNS,Qiita-Sync
-->
テスト

```

というファイルを作り。
※IDは書いてはいけない。
※ファイル名は自由にできる。
※記事を新しいフォルダ下に配置、移動してもok。
※本文が書いてないとエラーになる。
※tagsに空白があるとエラーになる。
例えば`github copilot` ＜＜＜単語と単語の間に空白があるのでエラー。
これに対して`githubcopilot` 空白を消す、`github_copilot` アンダーバーを足す・・等と対処する。


* コミット後にGithubへ **PUSH** する。

* ActionsのページでQiita Syncと Qiita Sync Checkが動作するので、このworkflowが終わるまで待つ。

* **workflowが終わたら** 、VScode上からローカルへ **PULL** する。


今回はブラウザ上からGithubのActionページを目視でworkflowが終了するまでを監視をしたが、目視しない場合は**５分ほど待ってからPULLする**といいと思う。

※待っている間に、もしくはPULLし忘れているのにPUSHしてしまうと当然のようにトラブルになります、これで以前失敗しました。

VScode上からPULLすると。
タグ内に新たにQiitaから割り振られたIDが追記された先程の記事が書き換わっているのがわかります。

以上が、ローカルで作った記事をQiitaにアップロードして、それがローカルに反映されるまでの手順です。

##### 出来た記事

VNS - Qiita

https://qiita.com/masakinihirota/items/b191c5c1e94a0c449fea

※次のプロジェクトのための記事、現在はほぼ中身なし。2023年3月24日

### Qiita 上で記事を書いてローカル上で同期する

Qiita 上で中身が空の記事を書いてから
数分後
github 上に反映されているので
ローカルへ PULL すると
空の記事が表示される。
それを編集してから PUSH すると
Qiita 上に反映されているのが確認できました。

### Qiita 上で記事を削除した場合

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

### VSCode 上で記事を削除した場合
不明
Qiita側の記事は削除されない。


## フォルダを利用して記事を管理

フォルダを 2020 年以前の記事でまとめて
before2020、2021、2022、2023 と分けてみた。

フォルダ下に移動したファイルを更新して PUSH してみたところ
Qiita 上にもきっちりと反映されていたので。

フォルダを作成して記事を管理しても大丈夫のようです。

## トラブル
### Qiita Sync Checkのエラーが連続する

* 原因 Qiita上で編集してしまった。

* 対処方法
GitHub repository を開く
"Actions"、"Qiita Sync" を開く
"Run workflow" をクリックする。


### ゴースト（どうしても消えないエラー）

* 原因 Qiitaのウェブ上で削除した記事がGithub上に残っていた。

* 対処方法
消した記事を探し、Github上から削除する。
そして、ローカルにPULLする。Githubとローカルで同期が取れたら
"Actions"、"Qiita Sync" を開く
"Run workflow" をクリックする。

#### 調査したときの記録（ゴーストの原因）
Qiita Sync Checkでエラーが連続する時、
Qiita上で記事を消したが、GitHub上には記事が残っていて
それがPULLしてローカルまで持ってきてしまって
気づかずにローカルから記事をPUSHしてしまっていて・・・
と、このようにいつまでも削除した記事が残ってしまう状態。

場所は
* Qiita上
* GitHub上
* ローカル上

この3箇所に記事があるので思いがけず見逃してしまったままの状態の記事が生き残っている場合がある。
それをきっちり消すことでこの状態を脱することが出来た。

# 限定投稿

```***.md
<!--
title:
tags:
private: true
-->

```

Qiitaの限定投稿をするには、上記のように、private: true とします。

Qiitaで限定投稿をしてからQiita Syncチェックが行われると（一定時間後に自動で実行される、早く同期したければ手動で行う。）Githubに反映されます。
それをローカル側でPULLすると、VSCode上にも反映されます。

この手順で行えば、限定投稿をすることが出来ます。
そして、Qiita のidも取得できているので、ローカル側からの操作ミスで複数投稿をしてしまう事態も避けられます。（※[やらかしたこと](#やらかしたこと)参照）




### 後記

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

## 初めて Github actions を利用する前に設定をする必要がある

python - Permission denied to github-actions[bot] - Stack Overflow
https://stackoverflow.com/questions/72851548/permission-denied-to-github-actionsbot
