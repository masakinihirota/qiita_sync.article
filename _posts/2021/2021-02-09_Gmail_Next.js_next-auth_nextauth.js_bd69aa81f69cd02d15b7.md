<!--
title:   next-authの基本的な使い方。（gmailのsmtpサーバーを利用）
tags:    Gmail,Next.js,next-auth,nextauth.js
id:      bd69aa81f69cd02d15b7
private: false
-->
next-authの基本的な使い方。（メールリンク方式） - Qiita
https://qiita.com/masakinihirota/items/190360bfdcc4bf2b13ac
の続き。

# 今回の目標
前回はsmtp4devというダミーSMTPサーバーツールを使用してローカル内でメールリンク方式の認証をしていましたが、今回はgmailで利用できる無料SMTPサーバーを利用してメールリンク方式の認証を行います。

gmailは無料のSMTPサーバーを提供しています。
詳しくは下記をご覧ください。

GoogleのSMTPサーバー（あまり知られていない無料サービス）の使用方法
https://thefunky-monkey.com/page/googlesmtp/



# Googleアカウント設定

![セキュリティ sketch.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/0eacab12-4f7b-05a9-fc2b-2abd997b3a71.png)

Google アカウントのセキュリティ
https://myaccount.google.com/security
このセキュリティから「安全性の低いアプリのアクセス」を選び

![有効.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/7ef42bf9-60e6-c4b7-e1e0-6e37d08f8964.png)

安全性の低いアプリのアクセス
安全性の低いアプリの許可: 有効
にします。

この設定をしないと外部アプリ（今回は next.js）からのは全てシャットアウトされます。

![セキュリティ.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b56da77c-8418-36f3-8f86-46c7092bdb6f.png)

この設定をすると「安全性の低いアプリによるアクセスが有効になりました」と確認メールが来ます。
ボタンを押すと確認を促されます。
いま自分で設定したので
「はい、心当たりがあります」を選びます。
そうすると
「本人確認が完了しました
お使いのアカウントの保護を目的としています」
と表示されます。

# next.jsアプリ
メールの設定を変更します。

.env.localファイルの下記の部分を自分のメールに変更します。
NEXTAUTH_EMAIL_SERVER=smtp://{gmailのメールアドレス}:{メールのパスワード}@smtp.gmail.com:587

```.env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_TWITTER_ID=
NEXTAUTH_TWITTER_SECRET=
NEXTAUTH_GITHUB_ID=
NEXTAUTH_GITHUB_SECRET=
NEXTAUTH_GOOGLE_ID=
NEXTAUTH_GOOGLE_SECRET=
NEXTAUTH_FACEBOOK_ID=
NEXTAUTH_FACEBOOK_SECRET=
NEXTAUTH_EMAIL_SERVER=smtp://{gmailのメールアドレス}:{メールのパスワード}@smtp.gmail.com:587
NEXTAUTH_EMAIL_FROM=NextAuth <masakinihirota@gmail.com>
NEXTAUTH_DATABASE_URL=sqlite://localhost/:memory:?synchronize=true
```

.env.localファイルは.gitignoreでgitが追跡していない設定になっているはずです。
**パスワードが書かれているのでネットにアップしないよう気をつけましょう。**

![メール設定とパスワード.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/18b4a1fe-1d2d-78f6-9e86-c3a453531db2.png)

※モザイク部分はパスワードです。
以上で設定は終了です。

# アプリを立ち上げて確認
ターミナルから
`npm run dev`

http://localhost:3000/

右上のSign inボタンをクリックして
メールを入力して
Sign in with Emailボタンを押して
自分のところにメールが来たかを確認します。
メールが来たのを確認できたら
「Sign in」ボタンを押すと
サイトにログイン済みになっています。

＃比較
前回は下記のようでした。
![ローカル環境.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c7f21216-5a64-c331-bcd8-1519b5c71404.png)
から
![ローカルネット環境 gmail2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/acb09f09-e433-33c7-6ba1-37de1446cd40.png)
といように
一部の機能をネットに切り出せました。
