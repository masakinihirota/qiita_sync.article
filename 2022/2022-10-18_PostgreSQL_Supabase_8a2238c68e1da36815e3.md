<!--
title:   Supabase CLI のコマンド (v1.8.7)
tags:    PostgreSQL,Supabase
id:      8a2238c68e1da36815e3
private: false
-->
※現在この記事は少し古くなっています、下記の記事をご覧ください。
[Supabase CLI のコマンド (v1.28.3)](https://qiita.com/masakinihirota/items/685f70770d8224ba2fa5#comment-96ad1f43ba2932b8733b) 2023年1月10日


# よく使うコマンド群

| コマンド | 説明 |
|:-|:-|
| `supabase start` | supabaseコンテナ開始 |
| `supabase stop` | supabaseコンテナ終了 |
| `supabase stop --backup` | supabaseコンテナ終了＋スキーマやテーブル内のデータを保存 |
| `supabase db reset` | 最後に`マイグレーション`した状態に戻す |
| `supabase db diff --use-migra` | 外部ツールmigraを使った差分をターミナルに表示 (高速、高性能) |
| `supabase db diff --use-migra` -f [ファイル名] | 外部ツールmigraを使って、スキーマの差分を新しい`マイグレーション`ファイルに保存 (高速、高性能) |
| `supabase db remote changes` -p [Database Password] | リモートサーバーのデータベースの変更を表示 |
| `supabase db remote commit` -p [Database Password]  | リモートサーバーのデータベースの変更から新しい`マイグレーション`ファイルを作成 |
| `supabase db push -p [Database Password]` | 新しい`マイグレーション`をリモートサーバーのデータベースに送信し適用させる。 |
| `supabase db push -p [Database Password] --dry-run` | `db push` コマンドのリハーサル |

未調査＆新規に追加されたコマンド
`supabase migration`
`supabase functions`
`supabase completion`
`supabase gen`



※`マイグレーション`
テーブルの新規作成、更新、削除などの情報を記録する行為。
通常はファイルに保存して、`マイグレーション`ファイルを作る。
現在、複数の`マイグレーション`ファイルをまとめるコマンドは無い。

※全部をやり直したい時は、ルート直下にある`supabase`フォルダを削除して`supabase init`

# 重要コマンド
supabase CLI の更新
`scoop update supabase`
※1-2週間に1度は実行をオススメ

https://github.com/supabase/cli

# 全コマンド群
`
supabase link --project-ref [project-id] -p [Database Password]
supabase start
supabase stop
supabase stop --backup
supabase db reset
supabase db diff --use-migra
supabase db diff --use-migra -f [ファイル名]
supabase db remote changes -p [Database Password]
supabase db remote commit -p [Database Password]
supabase db push -p [Database Password]
supabase db push -p [Database Password] --dry-run
`




# 環境
Windows 10
VScode
powershell
[Docker Desktop](https://www.docker.com/products/docker-desktop/)
[Supabase](https://github.com/supabase/supabase)
[Supabase CLI v1.8.7](https://github.com/supabase/cli)

※ 便利なVScode拡張機能
普段見かけない拡張子.toml
これはVScodeの拡張機能 `Better TOML` をインストールすると
`supabase\config.toml`を綺麗に見ることが出来る

# Supabaseダッシュボード
SupabaseをWebブラウザ上でGUIで操作できる

リモートサーバーのダッシュボード
https://app.supabase.com/

ローカルデータベースのダッシュボード
http://localhost:54323/

# ドキュメント
英語 Supabaseローカルデータベース開発環境マニュアル
Local Development | Supabase
https://supabase.com/docs/guides/cli/local-development

日本語 非公式ユーザーマニュアル | Supabase
https://www.supabase.jp/docs/
※少々古い、未翻訳あり、コマンドが変更された箇所も。

# Supabase CLIのインストール
Supabase CLIのインストール (powershell)
`scoop bucket add supabase https://github.com/supabase/scoop-bucket.git`
`scoop install supabase`

# 初期設定
ログインをする
`supabase login`
開発初期の最初に1回だけ実行する
※アクセストークンを要求される、アクセストークンは
https://app.supabase.com/account/tokens
こちらで取得する。

# link
`supabase link --project-ref [project-id] -p [Database Password]`
リモートサーバーと接続するために必要。

※ `Docker Desktop` を再起動する毎に必要。

# プロジェクト単位で実行
初期化
`supabase init`
プロジェクトを作る毎に実行する。

## 例
たとえば、Next.js をインストール後このコマンドを実行する。
そうするとルート直下に`supabaseフォルダ`が作られる。
この中に、supabaseの設定ファイルや、`マイグレーション`ファイルが作成される。

## 完全リセット
全部をやり直したい時は、この`supabase`フォルダを削除して、再度 `supabase init`を実行する。
ただし、リモートサーバーのデータはそのまま残るので、リモートサーバー側もプロジェクトごと削除(もしくはポーズ)して、新しくプロジェクトを作る。

※ 現在はプロジェクトを停止(pouse)すると3つ以上のプロジェクトを作成可能。
supabaseの無料アカウントならばアクティブなプロジェクトは２つまでが上限となっている、なので、プロジェクトを停止さえしておけばその他のプロジェクトをたくさん作れる。

# Docker の実行環境
`Docker Desktop`をインストール

Docker Desktop - Docker
https://www.docker.com/products/docker-desktop/

Docker Desktopを立ち上げておくと
ローカル開発環境でのsupabaseを立ち上げられるようになる。
`supabase start`
でイメージをダウンロード後実行される。
※現在はこのコマンド1つでsupabaseコンテナがノーコンフィグで立ち上がる。

# コマンド群
## 起動／終了関連
`supabase start`
このコマンドを実行すると`supabase`のコンテナが起動する、Dockerイメージやその関連ファイルが無い場合は自動的にダウンロードする。

`supabase stop`
このコマンドを実行するとマイグレーションファイルに保存していないテーブルやバックアップしていないテーブル内のデータは空になる
通常、`supabase start`とセットで使う。

`supabase stop --backup`
`データベーススキーマやテーブルに入力したデータ等`を保存したまま終了させる。
これはまだマイグレーションファイルに保存をしていないデータベーススキーマも保存される。
※ 何回か、`supabaseの停止`に失敗することがあった、だが失敗直後すぐ2回目のコマンド実行をしたら成功した。

## supabase db 関連

`supabase db reset`
ファイルに保存していないデータベーススキーマを全て消して、最後にマイグレーションした状態にリセットする、マイグレーションをしていない場合は`supabase start`立ち上げ時の状態に戻る。

※ローカル側の `supabase/migrationsフォルダ`内にあるマイグレーションファイルをすべて読み込み、それらすべてのデータベーススキーマをローカルデータベースに反映させる。

`supabase db diff`
データベーススキーマの差分を見る。
VScodeのterminalに表示される。
※ 非推奨 --use-migra オプションを付けるべき

`supabase db diff -f [ファイル名]`
データベーススキーマの差分をマイグレーションファイルに保存
タイムスタンプ＋指定したファイル名に保存される。
※ 非推奨 --use-migra オプションを付けるべき

`supabase db diff --use-migra `
データベーススキーマの差分を見る。
VScodeのterminalに表示される。

`supabase db diff --use-migra -f [ファイル名]`
まだマイグレーションファイルに保存されていないスキーマの差分を新たなマイグレーションファイルを作成して保存する。
(今までにマイグレーションファイルに保存したスキーマ(テーブル情報)とテーブル操作をしてまだマイグレーションファイルに保存していないスキーマの差分を保存する。)
タイムスタンプ＋指定したファイル名に保存される。

※migraとは、データベーススキーマの差分を調べる外部ツール
--use-migraオプションで指定する[ファイル名]と -fオプションで指定する[ファイル名]は同じにする。

migra(Python製) diffツール
データベーススキーマからSQLスクリプトファイルを作成する。

supabaseがmigraを使う理由
https://www.slip.so/tutorials/database-migrations-in-supabase-with-migra

## supabase db リモートサーバー 関連
`supabase db remote changes -p [Database Password]`
リモートサーバーのデータベースの変更を表示する

`supabase db remote commit -p [Database Password]`
リモートサーバーのデータベースの変更を、ローカルデータベース側の `supabase/migrationsフォルダ`に新しいマイグレーションファイルを作成する。

※詳細
このコマンドの目的はリモートサーバー側のデータベーススキーマの変更をローカルデータベース側に反映させるための使う。

まず最初にこのコマンドを実行することで、リモートサーバー側のデータベーススキーマの変更が、ローカルデータベース側にマイグレーションファイルとして生成される。

生成される場所はローカル側のマイグレーションファイルがお体ある場所と同じ`supabase/migrationsフォルダ`に置かれる。
しかし、 リモート側のマイグレーションファイルと判断するために、ファイル名に`[タイムスタンプ]_remote_commit.sql`という形式でファイルが生成される。

ただし、まだこれはマイグレーションファイルを生成するだけなのでローカルデータベースには反映されていない。

マイグレーションファイルはあるのにデータベースに反映するためには、`supabase db reset`コマンドを使用することで、ローカル側にあるマイグレーションファイルが反映される。

`supabase db push -p [Database Password]`
新しいマイグレーションをリモートサーバーのデータベースにプッシュする。

`supabase db push -p [Database Password] --dry-run`
`db push` コマンドのリハーサルを行う。

※ pushコマンドは追記するコマンドです
もうすでにリモート側に他のテーブルがある場合で衝突しない場合に追記されます。


# powershellでの supabaseコマンド補完

`supabase completion powershell | Out-String | Invoke-Expression`

例
`su`
を入力後、数回tabキーで
`supabase.exe`
までを補完してくれる。
※VScodeのターミナル上での`supabase.exe`は`supabase`と同じ。

`supabase.exe s`
を入力後、数回tabキーで
`supabase.exe status`
までを補完できる。

その他の補完が利用可能なshellは
bash、fish、zsh

# よくある失敗、疑問、問題解決
Docker Desktopは立ち上がっていますか？

1回目のコマンド失敗したのなら、駄目元で2回目を実行してみる。
※github issuesで見かけた解決方法
実際に、1回目でコマンド失敗後、直後の2回目で成功したコマンドもあった。
(長時間触ってなかったので自動停止していて、立ち上がりに時間がかかって失敗していたのかも。)

`supabase db remote changes`や`supabase db remote commit`のコマンドでエラーが出たら
`supabase db push`で同期させてみる。

リモートサーバー側が関わるコマンドは実行時間がかなり長い。0.5～10数分。こまめにマイグレーションファイルを作成したほうが良い。

テーブル名に日本語を使うとコマンドの実行時間が長くなる気がする。



# 現時点で推奨しないコマンド
ブランチ系
主な理由、gitのような高性能ではない。

ブランチ系のコマンド
`supabase db branch create [新しいブランチ名]`
`supabase db branch delete`
`supabase db branch list`
`supabase db branch switch [ブランチ名]`

痛い目を見た例
新しくデータベーススキーマをマイグレーションファイルにすると
接続しなくなった。
それでsupabase stop>supabase startをしたら
新しいブランチが消えた

# 使い方がわかってないもの

## lint系
supabase db lint [flags]

いつどのような場面で使うかがわからない

Checks local database for typing error
ローカルデータベースのタイピングエラーをチェックする

## secrets系
`supabase secrets list`
`supabase secrets set`
`supabase secrets unset`

## functions系
`supabase functions deploy <function_name>`

## マイグレーション系
`supabase db diff --schema [strings]`

## テスト系
`supabase db test`

https://supabase.com/docs/guides/database/extensions/pgtap

このコマンドを使うにはpgtapのextensionを有効にする必要がある。

有効にした後、supabaseコンテナを再起動する。
supabaesフォルダの下に適当なファイルを作成する。

```[ファイル名].txt
begin;
select plan( 1 );

select has_table( 'profiles' );

select * from finish();
rollback;

```

※ 拡張子はわからないのでtxtにしておく。
※ テストファイルの書き方が不明

テストファイル作成後、
`supabase db test`
を実行する。

## edge function系

supabase functions delete
supabase functions deploy
supabase functions new
supabase functions serve

| コマンド | 説明 |
|:-|:-|
|delete | Supabaseから関数を削除|
|deploy | Supabaseに関数をデプロイ|
|new | ローカルで新しいFunctionを作成|
|serve | ローカルでFunctionを実行|


# 廃止？されたコマンド
`supabase CLI v1.0.0` へのメジャーバージョンアップは2022年8月頃に行われました。
その際に、不要になった or 消えたコマンドがあります。

`supabase db remote set`
Linkコマンドでリモートサーバーと接続設定するようになったので不要になったようです。

`supabase db commit`
以前はこのコマンドでマイグレーションファイルを作っておいてPUSHしていたようだが、現在では`supabase diff`コマンドでマイグレーションファイルを作る。


# 以下実験

## 実験目的
ローカルでのマイグレーションファイルを勝手にいじっても影響は受けないのか？

テーブル作成方法
テーブルをGUIで作る
http://localhost:54323/project/default/editor

マイグレーションファイル作成方法
2種類
`supabase db diff -f [ファイル名]`
`supabase db diff -f [ファイル名] --use-migra`

実験終了後に
`supabase stop`
`supabase start`
のコマンドを実行して結果を見る

### 実験 01
マイグレーションファイルを作った後、
出来たマイグレーションファイルを手動で消して、もう一度マイグレーションファイルを作る。

### 結果 01

同じテーブルが再現できた。

### 実験 02
テーブルを作り、マイグレーションファイルを作る
これを2回繰り返す。
出来たマイグレーションファイルの中身を一つにまとめる。

### 結果 02
同じテーブルが出来た。

### 実験 03-1
スキーマに差分は無いパターンで実験。
外部ツール`migra`を使わないバージョンと使ったバージョンで速さを比べる。
テーブルは作成済みで、マイグレーションファイルも作成してある。

### 結果 03-1
外部ツール`migra`は早い
通常コマンドは差分が無くてもマイグレーションファイルを新規に作成する。(中身はコメントのみのファイル)
外部ツール`migra`は差分がないとマイグレーションファイルを新規に作成しない。

テーブル4個*カラム2つ
| オプションの有無 | コマンド例 |実行時間|
|:-|:-|:-|
|通常|supabase db diff -f normal |29秒25|
|通常|supabase db diff -f normal |31秒67|
|外部ツール`migra`|supabase db diff -f useMigra --use-migra|4秒75|
|外部ツール`migra`|supabase db diff -f useMigra --use-migra|5秒36|

※ これはテーブルを作成せず、既存のテーブル（マイグレーション済み）だけで行った実験。

### 実験 03-2
スキーマに差分が有るパターンで実験。
既存のテーブルの為にマイグレーションファイル作成後、新たに3つのテーブルを作って、マイグレーションファイルを作成する。

### 結果 03-2
外部ツール`migra`は早い

テーブル7個*カラム2つ
| オプションの有無 | コマンド例 |実行時間|
|:-|:-|:-|
|通常|supabase db diff -f normal |34秒13|
|外部ツール`migra`|supabase db diff -f useMigra --use-migra|5秒43|

※テーブルは4つから3個増えて合計7個

### 実験 04
例
外部ツール`migra`は出来たマイグレーションファイル`20221020032411_init.sql`を
`init.sql`
`init.txt`
`init`
などとファイル名を変更する。

### 結果 04
このようにタイムスタンプ分を外しても、ファイル名を変更しても、拡張子を変更や削除しても、
`No changes found`と出てファイルの内容を読み込んでくれる。
`migration` フォルダ内のファイルをすべて読んでくれる。

## 結論
外部ツール`migra`を使用するオプション `--use-migra`は必ずつける。

ファイル名は自由につけられる。

マイグレーションファイルを消したら、次に新しくマイグレーションファイルを作成すると前回消した文のSQL文が作成される。

マイグレーションファイルが沢山できてしまってこまったら
全部消して、マイグレーションファイルを新たに作れば
1ファイルにマイグレーションファイルが作成される。

ただし、外部キーや循環テーブルなどがある場合はこの限りではない。

`supabase stop`と`supabase start`を実行するとマイグレーションファイルに保存されているテーブルのみ復活する。
マイグレーションファイルが無いとテーブルは消える。

githubにpushしているならローカルのマイグレーションファイルは時々一つにまとめておくといいかも。

# Supabase blog
2022-08-15

https://supabase.com/blog/supabase-cli-v1-and-admin-api-beta

2022-08-16

https://supabase.com/blog/supabase-js-v2

# ローカル開発環境

```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSJ9.vI9obAHOGyVVKa3pD--kJlyxp-Z2zV9UUMAhKpNLAcU
```

※ ローカル環境変数の値は **固定値** です。

## REST API

REST APIの仕様書(OpenAPI)は
`https://your-project.supabase.co/rest/v1/?apikey=your-anon-key`

http://localhost:54321/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs

OpenAPIのJSONからTypeScriptの型情報を作成する。
※ ローカル環境変数の値は **固定値** です。
