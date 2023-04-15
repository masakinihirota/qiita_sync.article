<!--
title:   無料で始めるAmazon CodeWhisperer  on VSCode（Github Copilotと同等の性能？）
tags:    Amazon,CodeWhisperer,copilot
id:      52d3fad3aea8300d391f
private: false
-->

# Github Copilot と Amazon CodeWhisperer の比較

現時点では Github Copilot の方が使いやすい。

単純な機能だと同じくらいだが、
Github Copilot は、コマンドパレットがあるので、その分便利さでまさる。
それにGithub Copilotは、そのページ全体の情報から判断をしてくれるし、コードの補完だけでなくコメントの補完もしてくれる。

# Amazon CodeWhispererとは？

AIによるコーディング支援ツールであり個人利用なら無料で利用できます、プログラマが書き始めたコードの続きやコメントの内容からコードを提案してくれます。CodeWhispererはオープンソースリポジトリ、Amazon内部リポジトリ、APIドキュメント、フォーラムなどから収集した数十億行のコードを基にした機械学習から、プログラマが書き始めたコードの続きや、コメントの内容からコードを提案してくれるため、プログラマの生産性向上が期待できます。

**Amazon CodeWhisperer** はAWSのVSCode拡張機能 **AWS Toolkit**の一部です。
Github Copilotと似たような機能を持っています。

# 必要な物
VSCode
AWSアカウント（登録用メールアドレス）（すでに所有済み）
AWS ビルダー ID（無料）
AWS Toolkit（VSCode拡張機能）

※すでにAWSアカウントは所持しているので、AWSアカウントの作成は省略します。

# 始め方

## AWSアカウントの作成

https://aws.amazon.com/jp/

※AWSアカウントの作成手順は省略します。

## AWS Toolkit for Visual Studio Codeのインストール

公式ドキュメント

https://docs.aws.amazon.com/ja_jp/toolkit-for-vscode/latest/userguide/setup-toolkit.html

VSCodeの拡張機能でAWS Toolkitをインストールします。

https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode

インストールし終わったらVSCodeを再起動させてください。

# AWS Toolkit 利用開始

AWS Toolkit拡張機能を開きます。

![1.1 VSCode左サイドバー画面.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/bc6effbf-337f-8f12-f6ff-117dcfb0b3ad.png)

VSCodeの左サイドバーにAWS Toolkitのアイコンが追加されているはずです。

左サイドバーの右にウィンドウが開きます。

そうすると質問が開始されます。

Show the default region "ap-northeast-1" for credentials "profiler:default: in aws explorer?

> クレデンシャル「profiler:default: in aws explore」のデフォルトリージョン「ap-northeast-1」を表示しますか？

DEVELOPER TOOLSのCodeWhispererを開きます。
Startボタンを押します。


個人の認証方法が選択するようにウィンドウが開きます。


![2 認証選択.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/f7d4ead3-d85a-90ae-6840-64950dc8c660.png)


Select a connection option to start using CodeWhisperer

* Use a personal email to sign up and sign in with AWS Builder ID
AWS Builder ID is a new, personal profile for builders.

* Connect using AWS AIM Identify Center
Sign in to your company's AIM Identify Center access portal login page.

* Use IAM Credentials not supported
Not supported by Code Whisperer.

今回は、1番上を選択します。

そうするとポップアップウィンドウが開き、コードが表示されます。

![3.1 認証コード画面モザイク後.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/edaa43c1-7c75-e5f3-10cd-8f14f8472686.png)


Copy Code and Proceedボタンを押すとコードがクリップボードにコピーされます。（一応、コードをメモしておいてください。）

ボタンを押すとブラウザを開きますかと聞いてくるので開きます。

例
AAAA-BBBB
（毎回、開くごとに変わります。）


![4 AWS認証画面.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/fe7e16ca-a294-e960-1b31-648b47a77248.png)


ブラウザが開くので、コードを貼り付けて
Nextボタンを押します。

AWS ビルダー ID の作成画面が開きます。

![5 ブラウザ画面.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b800d8cb-9911-e0b6-8381-682156a248ed.png)


メールアドレスを入力します。

Nextボタンを押します。

![6 ブラウザ画面2.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/eddc9640-ad4d-afcd-aecf-0ba5f1e899b1.png)

新しいCreate your AWS Builder ID 作成画面が開きます。
Your name（公開用の名前）を入力して Nextボタンを押します。

![7 ブラウザ画面3.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9673fef9-1c6b-d980-a068-9bf83f70e4c8.png)

Email verification画面が開きます。
メール（Verify your AWS Builder ID email address）が送られてきますので、メールを確認して、メールに記載されているコードを入力して、Verifyボタンを押します。

![8 ブラウザ画面4 パスワード入力.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8e0d3a8e-35e7-e4d9-85a2-886390e64f7e.png)

パスワード入力画面が表示されるのでパスワードを新たに設定します。
8-64文字の英字（大文字と小文字を含める）
数字
記号（!@#$%^&*()_+-=[]{}|;':",./<>?）等を使用してください。

AWS ビルダー ID の作成ボタンを押します。

VSCodeに戻り、これでVSCode上で **Amazon CodeWhisperer** が利用できるようになります。



# その他

Amazon CodeWhisperer公式ページ
AI Code Generator - Amazon CodeWhisperer - AWS

https://aws.amazon.com/jp/codewhisperer/



# AWS Toolkitの機能

**Amazon CodeWhisperer** は **AWS Toolkit** 内の機能の一部です。

## 主な機能

* AWS リソースの表示、変更、デプロイ
* S3 サポート
* Lambda 関数のダウンロードとアップロード
* IDE からの AWS のトラブルシューティング
* CloudWatch ログ
* ECS
* **Amazon CodeWhisperer**
* Amazon CodeCatalyst
* クラウドフォーメーション


# 参考
GitHub Copilot導入後、初めて使う時 - Qiita
https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882
