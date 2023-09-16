<!--
title:   Supabase ローカル開発環境 ＋ サーバー運用を想定 2023年9月
tags:    Docker,Next.js,PostgreSQL,Supabase
id:      be94b4c74a7850a4b79c
private: false
-->
[WIP]

# 重要コマンド

scoop update supabase

現在 2023年9月16日
supabase:  1.93.0


# Supabaseローカル開発 URL

公式
Local Development | Supabase Docs

https://supabase.com/docs/guides/getting-started/local-development



# 環境

Windows 10
Powershell
VSCode
Git
GitHub
Vercel
Docker Desktop
Supabase

Next.js 13 App router
TailwindCSS
	Storybook 7 SFC3

データベース管理ツール
pgAdmin4
DBeaver

※アカウント作成や、Supabaseの新規プロジェクトに伴う環境変数や、project-id等は、すでに取得済みとします。



# 用語

この記事だけの用語です。

ローカル
ローカルPCのDockerで動かしているSupabaseプロジェクト。
もしくはローカル側を指す。

サーバー
ウェブサイトのダッシュボードからアクセスするSupabaseプロジェクト。
もしくはサーバー側を指す。

# ローカルでSupabaseを始める。

前提
※ サーバですでにプロジェクトを作成している。



----------------------------------------

# リンク

ローカルダッシュボード
Studio URL
http://localhost:54323/project/default

サーバーダッシュボード
https://app.supabase.com/project/[project-id]

サーバープロジェクトリスト
https://app.supabase.com/projects
※projectsは複数形になっています。



----------------------------------------

全体の構成

# ローカルでSupabaseをインストール。

# ローカルでの基本動作

# サーバーの様々データをローカルに反映させる

# サーバーとローカルで同期を取る。

# バックアップをする

## サーバーをバックアップ

## ローカルをバックアップ

## サーバーをバックアップデータからリストア

## ローカルをバックアップデータからリストア



----------------------------------------

# この記事の目的

## Supabase環境構築関連

Supabaseのサーバー本番運用環境を構築する。
Supabaseのローカル開発環境を構築する。
Next.jsをローカルで開発をする
サーバーにデプロイする。
サーバで本番運用する。

手順

サーバーでSupabaseのプロジェクトを作成
ローカルで開発環境を作成
サーバーのデータをローカルに反映させる。
サーバーでバックアップを取る
ローカルでバックアップを取る



## リストア マニュアルの作成

1
バックアップデータからローカルにリストアして、動作確認。
ローカルのデータをサーバーにPUSHする。

2
バックアップデータからサーバーにリストアをして、動作確認。

どちらの方法が良いかをテストを行う


小さなアプリを作り動作を確認していく。



----------------------------------------
----------------------------------------
----------------------------------------

# Supabase

## Next.jsとSupabaseを利用したWebアプリの作成。

npx create-next-app -e with-supabase

↑Next.jsとSupabaseの両方を利用したWebアプリ

※このWebアプリは、Supabaseでプロジェクトを作成しておく必要があります。



## Supabaseのプロジェクトをサーバ側で作成する。

Supabase
https://supabase.com/

登録して、Supabaseのプロジェクトを作成します。
作成したプロジェクトの環境変数を↓メモしておきます。


----------------------------------------

## Supabaseの .envデータのメモ用テンプレート

サーバー上でプロジェクトを作成したら、ダッシュボードから値を調べて保存しておきます。

```Supabaseデータのテンプレート .env.local用

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



----------------------------------------
----------------------------------------
----------------------------------------

# ローカルでSupabaseをインストール。

## Supabase CLI

ローカルにSupabaseのCLIをインストールします。

Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/cli

ローカルにSupabaseのCLI (command line interface)をインストールします。

scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

CLIのアップデート
scoop update supabase



# Supabaseアクセストークン

ログインする前に
Supabaseのアクセストークンを取得します。
Supabaseアクセストークンの取得場所

https://app.supabase.com/account/tokens


# ローカルでの基本動作

## ローカルからサーバーへのログイン

Supabaseのサーバーで作ったプロジェクトとの接続のために
ローカルPCからサーバーにログインします。

supabase login

ここでアクセストークンが必要です。
接続が切れるまでログインは1度だけで大丈夫です。



ログインできているかを確認します。

supabase projects list

作成したプロジェクト一覧が表示されていれば大丈夫です。



## ローカルでSupabaseを立ち上げる。

Docker Desktopをダウンロード
Docker Desktop: The #1 Containerization Tool for Developers | Docker
https://www.docker.com/products/docker-desktop/

Download for Windowsをクリック。
ダウンロード出来たらインストールをします。

Supabaseの初期化

supabase init



Docker Desktopを立ち上げます。

ロカルでSupabaseを立ち上げます。

supabase start
しばらく待ちます。
特に初回起動時はコンテナのイメージファイルなどをダウンロードするので時間がかかります。

↓エラーが出た場合

## Dockerコンテナでのトラブルがあった時

以前のSupabase コンテナ等がある場合
起動時にエラーが出た時。
リセットしたい時。
以前のデータを削除したい時。


```

コンテナ起動中のものだけを表示します。
docker container ls

コンテナ停止中のもの含めて全部表示します。
docker container ls -a

他の起動中のコンテナもすべて停止します。
docker stop $(docker ps -q)

コンテナをすべて削除 (rmコマンドは起動中のものは削除できない)します。
docker rm $(docker ps -aq)

未使用のVolumeを一括削除します。
docker volume prune

```

※これらのコマンドを実行するとDB内の情報は完全にリセットされます。

※コンテナの利点はすぐに立ち上げ、削除ができる事なので気にせず削除、再生成していきます。

もう一度
supabase start

```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ****************************_I0
service_role key: ey*****************************U

```

もう一度見たい場合は

supabase status

で表示されます。



DockerのSupabaseコンテナを止めたい場合は

↓volumeに保存する場合(デフォルト)

supabase stop

volumeに保存したくなければ、↓オプションをつけます。

supabase stop --no-backup

※volumeに保存しておくと、seed.sql以外のDBデータ等も保存されます。








これでサーバーとローカル両方でプロジェクトを作ったので連携させます。

連携することでローカルで開発をしてテストをして、
サーバーで運用するというパターンが出来上がるはずです。



## サーバーとローカルのプロジェクトをリンク

ローカルとサーバーのそれぞれのプロジェクト同士を関連付けます。

supabase link

supabase link --project-ref [project-id] -p [データベースパスワード]
supabase link --project-ref ******************** -p ************




※CI 環境などでデータベースのパスワードの入力を求められたくない場合は、
環境変数を使用できます。VercelなどにSupabaseと連携して環境変数を登録して使います。

SUPABASE_DB_PASSWORD

リンクに成功すれば、ローカルで開発したものをサーバー上にあげることが出来るようになります。



# サーバーの様々データをローカルに反映させる

サーバーはNext.jsのサンブル通りに動かしていれば、小さなウェブアプリが出来て、簡単な動作確認をしていて、そしてデータベースにテーブルやデータが少し入っているはずです。
そのサーバで動作確認が取れているテーブルやデータをローカルに反映させてみます。













# サーバーとローカルで同期を取る。

# バックアップをする

## サーバーをバックアップ

## ローカルをバックアップ

## サーバーをバックアップデータからリストア

## ローカルをバックアップデータからリストア