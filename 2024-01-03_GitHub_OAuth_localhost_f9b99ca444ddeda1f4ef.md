<!--
title:   GitHub認証 ローカルで動かす OAuth-practice
tags:    GitHub,OAuth,localhost
id:      f9b99ca444ddeda1f4ef
private: false
-->
W.I.P

# GitHub認証

Next.js + Supabase <=ローカル開発環境を作成


GitHubのOAuth Appを新規作成します。
そうするとGitHub認証の環境変数が取得できます。

ローカル開発環境用のGitHub認証ができる環境変数を取得します。

## GitHubへアクセス

最初に GitHub

https://github.com/

にアクセスします。

右上のユーザーが表示されているアイコンから
Settings
そして
左サイドバーの
Developer settings
を選択します。

GitHub Apps

https://github.com/settings/apps

そうすると↑この場所に来るので、ここから

左サイドバーの
OAuth Apps
を選択します。

次に、
右上の 「New OAuth App」 ボタンを押します。

必要な項目を埋めていきます。

```
Application name
oauth-practice (適当な名前)

Homepage URL
http://localhost:3000

Authorization callback URL
http://localhost:54321/auth/v1/callback

```

※↑ローカル開発環境の場合

項目を埋めたら 緑色の 「Register application」 ボタンを押します。

そうすると、次の項目の値が生成されます。

```
Client ID
85ff....

Client secrets
af8a....

```

取得したClient ID等を .env に書き込みます。




```.env
DEV_GITHUB_CLIENT_ID={GITHUBのクライアントID}
DEV_GITHUB_SECRET={GITHUBのクライアントシークレット}

```





OAuth登録時のローカルでの設定例

※名前は自由につけます。

※ローカルで動かすには、URLは `localhost` ではなく `127.0.0.1` にする必要があります。

![Qiita GitHubOAuth登録情報.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e52868ff-ae1f-6570-6ecc-99ecc2aef6fb.png)

※Supabaseでの設定が 127.0.0.1 と固定されているため(だと思う)

GitHub側では `localhost` を `127.0.0.1` 自動変換してくれないため(だと思う)