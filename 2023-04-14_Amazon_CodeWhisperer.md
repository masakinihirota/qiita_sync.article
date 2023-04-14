<!--
title:先月100ドル払って使用し始めたGit Copilotと同等の機能を持つAmazon_CodeWhispererが無料で使える？？
tags:Amazon_CodeWhisperer,Copilot
private: false
-->

そんなバナナ！
以下真面目に・・・

**Amazon_CodeWhisperer** はAWSのVSCode拡張機能 **AWS Toolkit**の一部です。


# 必要なもの
VSCode
AWSアカウント（登録用メールアドレス）（すでに所有済み）
AWS ビルダー ID（無料）
AWS Toolkit（VSCode拡張機能）

※すでにAWSアカウントは所持しているので、AWSアカウントの作成は省略します。

# 使用手順

## AWSアカウントの作成

アマゾン ウェブ サービス（AWS クラウド）- ホーム

https://aws.amazon.com/jp/

## AWS Toolkit for Visual Studio Codeのインストール

公式ドキュメント

https://docs.aws.amazon.com/ja_jp/toolkit-for-vscode/latest/userguide/setup-toolkit.html

VSCodeの拡張機能でAWS Toolkitをインストールします。

VSCode拡張機能マーケットプレイス

https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode


AWS Toolkit拡張機能を開きます。

VSCodeの左サイドバーにAWS Toolkitのアイコンが追加されているはずです。

左サイドバーの右にウィンドウが開きます。

そうすると質問が開始されます。

Show the default region "ap-northeast-1" for credentials "profiler:default: in aws explorer?

> クレデンシャル「profiler:default: in aws explore」のデフォルトリージョン「ap-northeast-1」を表示しますか？

DEVELOPER TOOLSのCodeWhispererを開きます。
Startボタンを押します。
Startボタンを押します。
Startボタンを押します。

個人の認証方法が選択するようにウィンドウが開きます。


Select a connection option to start using CodeWhisperer

1.
Use a personal email to sign up and sign in with AWS Builder ID
AWS Builder ID is a new, personal profile for builders.

2.
Connect using AWS AIM Identify Center
Sign in to your company's AIM Identify Center access portal login page.

3.
Use IAM Credentials not supported
Not supported by Code Whisperer.


今回1.を選択します。

そうするとポップアップウィンドウが開き、コードが表示されます。

Copy Code and Proceedボタンを押すとコードがクリップボードにコピーされます。（一応、コードをメモしておいてください。）

ボタンを押すとブラウザを開きますかと聞いてくるので開きます。

例
AAAA-BBBB
（毎回、開くごとに変わります。）


ブラウザが開くので、コードを貼り付けて
Nextボタンを押します。

AWS ビルダー ID の作成画面が開きます。

メールアドレスを入力します。

Nextボタンを押します。

新しいCreate your AWS Builder ID 作成画面が開きます。
Your name（公開用の名前）を入力して Nextボタンを押します。

Email verification画面が開きます。
メール（Verify your AWS Builder ID email address）が送られてきますので、メールを確認して、メールに記載されているコードを入力して、Verifyボタンを押します。

パスワード入力画面が表示されるのでパスワードを新たに設定します。
8-64文字の英字（大文字と小文字を含める）
数字
記号（!@#$%^&*()_+-=[]{}|;':",./<>?）等を使用してください。

AWS ビルダー ID の作成ボタンを押します。

これでVSCode上でAWS Toolkitが使用できるようになりました。



# その他

Amazon CodeWhisperer公式ページ
AI Code Generator - Amazon CodeWhisperer - AWS

https://aws.amazon.com/jp/codewhisperer/

登録場所
アマゾン ウェブ サービス（AWS クラウド）- ホーム
https://aws.amazon.com/jp/?nc2=h_lg

VSCodeの機能拡張の AWS Toolkit をインストールします。

- Visual Studio マーケットプレイス



Amazon_CodeWhispererはAWS Toolkit内の機能の一部です。

# AWS Toolkitの機能

* AWS リソースの表示、変更、デプロイ
* S3 サポート
* Lambda 関数のダウンロードとアップロード
* IDE からの AWS のトラブルシューティング
* CloudWatch ログ
* ECS
* **Amazon CodeWhisperer**
* Amazon CodeCatalyst
* クラウドフォーメーション



