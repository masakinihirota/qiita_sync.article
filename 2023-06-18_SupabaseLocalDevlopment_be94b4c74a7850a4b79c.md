<!--
title:   Supabase ローカル開発環境 ＋ リモートサーバー 2023
tags:    Docker,Next.js,PostgreSQL,Supabase
id:      be94b4c74a7850a4b79c
private: true
-->
2023年6月18日
Supabase ローカル開発環境リメイク版

用語
ローカル
ローカルPCのDockerで動かしているSupabaseプロジェクト、
もしくはローカル側を指す。

サーバー
ウェブサイトのダッシュボードからアクセスするSupabaseプロジェクト、
もしくはサーバー側を指す。

※ この記事だけの用語です。




目的
Supabaseのローカル開発環境を構築する。
Next.jsをローカルで開発をする
サーバーにデプロイする。
サーバで本番運用する。



環境
Windows 10
VSCode
Git
GitHub (アカウント取得済み、git pushコマンドは使える)
Docker Desktop ※必須
Supabase (アカウント取得済み、新規にProjectを作成済み)
Vercel (アカウント取得済み)

※アカウント作成や、Supabaseの新規プロジェクトそれに伴うproject-idなどはすでにわかっているものとします。





Supabaseデータのテンプレート
サーバでプロジェクトを作ったらダッシュボードから値を調べて書き込みます。

```Supabaseデータのテンプレート .env.local

作成日
20**年**月**日

Supabaseプロジェクト
組織 Organization

Name


Database Password



Region
Northeast Asia (Tokyo)

左サイドバーにある
Project setting > General settings
Reference ID (=project-id)



Project Setting > API > Project URL



Project Setting > API > Project API keys > anon public



Project Setting > API > Project API keys > service_role secret



Project Setting > API > JWT Settings > JWT Secret





アクセストークン
Supabase | Supabase
https://app.supabase.com/account/tokens

supabase login アクセストークン



Table Plus接続
postgresql://postgres:[PASSWORD]@db.[Reference ID].supabase.co:5432/postgres

ダッシュボード
https://app.supabase.com/project/[Reference ID]



```





使用ツール
Next.js 13 app router
TailwindCSS
Storybook 7 SFC3
pgAdmin4



入手先（アカウントやツール）
Visual Studio Code - Code Editing. Redefined
https://code.visualstudio.com/

GitHub Japan | GitHub
https://github.co.jp/

Docker Desktop
https://www.docker.com/products/docker-desktop/

Supabase
https://app.supabase.com/

Vercel
https://vercel.com/





ローカルにSupabaseのCLI (command line interface)をインストールします。

公式
Supabase CLI | Supabase Docs
https://supabase.com/docs/guides/cli

参考
SupabaseCLIでローカル環境構築
https://zenn.dev/slowhand/articles/209699774226af







インストール
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

アップデート
scoop update supabase
※結構頻繁にアップデートされるので時々実行します。



ログインする前に
Supabaseのアクセストークンを取得します。
Supabase
https://app.supabase.com/account/tokens




Supabaseのサーバーで作ったプロジェクトとの接続のために
ローカルPCからサーバーにログインします。
supabase login

ここでアクセストークンが必要です。
接続が切れるまでログインは1度だけで大丈夫です。



Next.jsにsupabaseをインストールします。

supabase インストール
npm install supabase

Docker Desktopインストールをした後に
Docker Desktopを立ち上げておきます。


supabaseの初期化、Next.jsにインストール
supabase init


Generate VS Code workspace settings? [y/N]
VS Code workspaceで開発をしますかと聞いてくるのでNを押します。
※この選択は各自自由にしてください。

↓そうするとRootにsupabaseフォルダとファイルが出来上がります。

```
06-18 14:27:46> ls

    Directory: ***********\supabase

Mode                 LastWriteTime         Length Name
----                 ------         ------ ----
-a---          2023/06/18    14:26             27 .gitignore
-a---          2023/06/18    14:26           3136 config.toml
-a---          2023/06/18    14:26              0 seed.sql

```

VSCodeの場合、tomlを見やすくするVSCode拡張機能が提案されます。

選んだ理由

| 名前  | 前回のリリース日  | ★の数 | DL数 |
| --------- | ---------- |---------- | ---------- |
| Even Better TOML v0.19.0 | 2022/11/2 0:39:57        | ★★★★★| 455157 |
| Better TOML v0.3.2       | 2018/2/18 17:50:44       |★★★| 1703424 |

Even Better TOML - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml

を入れます。



ローカルでDockerを開始する前に
Dockerの現状を確認
弱いPCだとDockerを使うと非常に重くなる。
メモリが32GBできつい、64GBは欲しい。
※設定で必要メモリを抑えられるらしい。（未調査）
※DockerDesktopの代替ツールで軽くなるらしい。（未調査）



# DockerDesktopを使用するための事前準備

※DockerDesktopで色々遊んでいたのを消す作業です。
DockerDesktopを始めてインストールした人は飛ばしてください。

コンテナ起動中のものだけを表示します。
docker container ls

コンテナ停止中のもの含めて全部を表示します。
docker container ls -a

他の起動中のコンテナをすべて停止します。
docker stop $(docker ps -q)

コンテナをすべて削除します。 (rmコマンドは起動中のものは削除できない)
docker rm $(docker ps -aq)

未使用のVolumeを一括削除します。
docker volume prune

※Dockerのイメージは消していません。



きれいになったらSupabaseのコンテナを作成し起動します。

supabase start

Dockerのイメージを組み合わせてSupabaseのコンテナを作成します。
Dockerのイメージをダウンロードするのにかなり時間がかかります。
Dockerのイメージを消さないで残していたらすぐに立ち上がります。



supabase startが成功すると。

06-18 15:49:49> supabase start
Seeding data supabase\seed.sql...me...
                                 Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhb************************************************************************************************************n_I0
service_role key: eyJhbGci************************************************************************************************************pN81IU

ローカルの環境変数が表示されます。
作成したコンテナに依存しているようで、何度立ち上げ直しても **key** は同じ値になります。

















