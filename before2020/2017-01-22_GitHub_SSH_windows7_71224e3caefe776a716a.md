<!--
title:   GitHubでsshキーを再登録 Windows7
tags:    GitHub,SSH,ssh公開鍵認証,windows7
id:      71224e3caefe776a716a
private: false
-->
#環境
Windows7 64bit

#現状
Windows7を新たに再インストールしてからGitHubにアクセスしようとするとするけど、GitHubのために色々書いた設定は綺麗サッパリ忘れており、sshキーの公開鍵も秘密鍵も今は無い。

#これからすること。
Githubに公開鍵と秘密鍵を新たに設定し直します。

##作業開始
私の場合はもう古い公開鍵も秘密鍵も無いのでGithubに登録しておいた公開鍵を消しておきます。

##Github側の作業
GitHubの公開鍵登録場所にアクセス
SSH and GPG keys
https://github.com/settings/keys

公開鍵を削除 「Delete」ボタンを押します。
「I understand, please delete this SSH key」
と出るので押し消しちゃいます。

##Windows側の作業
まずはgitをインストールします。
Git for Windows
https://git-for-windows.github.io/
このサイトからDownloadボタンを押してアプリケーションをダウンロードします。
ダウンロードしたファイルをダブルクリックしてインストールをします。
インストールが完了すると、これでssh-keygenコマンドが使えるようになります。
※ssh-keygenコマンドは公開鍵暗号方式のファイルを作るコマンドです。

##公開鍵暗号方式の鍵を作る。
Windowsのスタートボタンから「プログラムとファイルの検索」窓を開いて「git」
候補に「Git Bash」が表示されるのでそれを起動します。

（※コマンドプロンプトやPowerShellからではパスが通ってないのでssh-keygenコマンドを受け付けません。）

表示されたWindowに移動して
![MINGW64.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/7e2bf398-4efd-3739-18a5-5357b7da14b6.png)

鍵を生成する場所に移動します。
`cd ~/.ssh/`

何かファイルがあったらどこか別の場所に移動します。
私は最初からやり直しなので全部消しました。
（別の場所に移すかなどしてバックアップをとっておくと良いかも）

##キー生成
ssh-keygen -t rsa -C "自分のメール"
例：
``ssh-keygen -t rsa -C "masakinihirota@gmail.com"``
リターンキー3回押します。

すると
id_rsa.pub	#公開鍵
id_rsa		#秘密鍵
の2ファイルが生成されます。

![MINGW64作成後.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/569d94bc-11e4-7954-a9ea-b1ea7fc9b945.png)

![公開鍵.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/18e83cdb-99d1-81ef-0689-7bf252bf7f16.png)

ファイル名「id_rsa.pub」（ファイルの拡張子「.pub」）が公開鍵です。
誰かに見せても渡しても問題ありません。
ファイル「id_rsa」が秘密鍵です。
誰にも渡してはいけません、見せてもいけません。ネット上で公開してもいけません。
詳しくは「公開鍵暗号」でググってください。

#Githubへ公開鍵を登録
次にこの公開鍵を登録します
SSH and GPG keys
https://github.com/settings/keys
この場所で公開鍵を登録します。

##登録方法
SSH keysの 「New SSH Key」ボタンを押します。

Titleを付けます。
「公開鍵登録」
とでも適当につけます。

![公開鍵登録.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/72264965-6464-2d23-cd52-dd9a1bc3cbde.png)

Keyの場所には、
id_rsa.pubファイルをVSCode等のエディタで開きます。
（中身は単なるテキストファイルです。）
中身をコピー・アンド・ペーストします。

となりますので、確認できたら。
「Add SSH key」を押します。

※ここでGithubのパスワードを要求されます。

アクセス確認
``ssh -T git@github.com``

The authenticity of host 'github.com (***.***.***.***)' can't be established.
RSA key fingerprint is SHA256:nThXXXXXXXXXXXXXXXXXXXXXXXXSY8.
Are you sure you want to continue connecting (yes/no)?

知らない接続先だけどつなげちゃって大丈夫？と聞いてきます。
「yes」
と入力します。

**※ここで「yes」と入力しないと新しい接続先として認められずアクセスが弾かれてしまいます。**
（リターンキーを押しスキップさせてしまい アレ 接続できないぞとハマっちゃいました。）

Are you sure you want to continue connecting (yes/no)? yes
（続き）
Warning: Permanently added 'github.com,***.***.***.***' (RSA) to the list of known hosts.
Hi masakinihirota! You've successfully authenticated, but GitHub does not provide shell access.
と返信が来ます。
「接続に成功したよ、だけどシェルでのアクセスサービスは提供してないよ。」

##確認作業
成功したかどうか見るため適当なリポジトリをGithubからクローンしてみます。

適当な場所にディレクトリを作る
今回はディスクCに「2020」というディレクトリを作っておく。

cd （リポジトリをダウンロードする場所）
例：
``cd c:2020``

![2020.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/d6052eac-f156-ad1a-a4cb-a4aeaa0614b9.png)


クローンコマンド
git clone git@github.com:（GitHubユーザー名）/（リポジトリ名）.git
例：
``git clone git@github.com:masakinihirota/masakinihirota.git``

ローカル側（Windows7側）にリポジトリがダウンロードできたのを確認できたら終了です。