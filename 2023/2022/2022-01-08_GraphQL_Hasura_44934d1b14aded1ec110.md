<!--
title:   Hasuraでつまづいたこと
tags:    GraphQL,Hasura
id:      44934d1b14aded1ec110
private: false
-->
# 追記 2022年1月9日
## docker compose restartではだめ down＆upで

docker-compose.ymlの設定の変更をしたときには。

例
HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
これはGUIのHasura consoleに関する命令
マイグレーションを移行する時
開発から本番環境へ
に設定しておくことを推奨
ただし、開発者が一人なら不要

HASURA_GRAPHQL_ENABLE_CONSOLE: "false"
のようにfalseにすると
http://localhost:8080/console
で
{"path":"$","error":"resource does not exist","code":"not-found"}
と表示される
これはブラウザ上からHasuraが操作できなくなるという意味。

コマンド
`docker compose restart`
では、設定値は反映されない

`docker compose down`
`docker compose up`
とする必要がある。

VScode側のHasura consoleを使ってみる
> hasura console
と打つと
http://localhost:9695/
とHasura consoleが立ち上がり使える。

まとめると
設定を反映させるためには
`docker compose down`
`docker compose up`
と順番に打つ。

HASURA_GRAPHQL_ENABLE_CONSOLE: "false"
と設定すると
Docker compose起動時に自動的に立ち上がる
ブラウザのGUI console
http://localhost:8080/console
は使えなくなる

hasura consoleで立ち上げたGUI console
http://localhost:9695/console
は使える。


## docker-compose.ymlでのDBの設定値は２つに別れたけど同じ値でもok

HASURA_GRAPHQL_METADATA_DATABASE_URL
PG_DATABASE_URL
メタデータと本体のデータの２つに別れたがどっちも同じデータベースの設定値でもok

例
HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
PG_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
どちらも同じ値でも起動を確認しました


## docker-compose.ymlのrestart: always

postgres
restart: alwaysを消すとhasura consoleが動かない

hasura
restart: alwaysを消しても挙動は同じ




# 記事 2022年1月8日

## Docker 起動時docker compose up した時マイグレーションファイルなどが見当たらない・・・どこにあるの？？

docker-compose.yml
があるディレクトリで
`hasura init`
を実行します

そうすると
hasuraフォルダ（hasura init実行時に変更可能）ができます。

`cd hasura`
`hasura console`
を実行すると
Hasuraランチャーが立ち上がります。

メッセージ（一部）
`x-hasura-admin-secret/x-hasura-access-key required, but not found`
がでる時がある。
これはDocker compose側で
HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
シークレットキーを設定してあるのに
config.yamlには設定していないため。

見つからないとあるので
config.yamlファイルに
admin_secret: myadminsecretkey
この行を追加する

```config.yaml
version: 3
endpoint: http://localhost:8080
admin_secret: myadminsecretkey
metadata_directory: metadata
actions:
  kind: synchronous
  handler_webhook_baseurl: http://localhost:3000

```

hasura init実行時に オプションを付ければ回避可能
hasura init <フォルダ名> --endpoint ＜endopoint＞ --admin-secret <パスワード>

例
`hasura init hasura --endpoint http://localhost:9000 --admin-secret myadminsecretkey`

--admin-secretはdocker-compose.ymlのHASURA_GRAPHQL_ADMIN_SECRETで設定した値を使う。

```docker-compose.yml
version: "3.6"
services:
  postgres:
    image: postgres:12
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgrespassword
  graphql-engine:
    image: hasura/graphql-engine:v2.1.1
    ports:
      - "8080:8080"
    depends_on:
      - "postgres"
    restart: always
    environment:
      ## postgres database to store Hasura metadata
      HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
      ## this env var can be used to add the above postgres database to Hasura as a data source. this can be removed/updated based on your needs
      PG_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
      ## enable the console served by server
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      ## enable debugging mode. It is recommended to disable this in production
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
volumes:
  db_data:

```

※それぞれのパスワードは適宜変更してください

docker-composeはversion2になって複数ソースが設定できるようになっていて
HASURA_GRAPHQL_METADATA_DATABASE_URL
PG_DATABASE_URL
上はpostgresデータベースのmetadata設定
下はpostgresデータベースの設定

コマンドも変わって
`docker compose up`
と「-」記号が消えました。

すでに
`hasura init`を実行した場所ではすでに存在するため
`hasura init`を再び実行しても「初期化」されません。
別のフォルダ名にすれば別の設定が可能なだけです。
初期化するためのコマンドはわかりません。

Hasura CLI Configuration Reference | Hasura GraphQL Docs
https://hasura.io/docs/latest/graphql/core/hasura-cli/config-reference.html

## console
つまり操作する場所がたくさん出てきます
軽く２つに分けると
ブラウザのGUI
と
VScodeのCUI
の２種類

### 種類
ブラウザのGUI
Hasura console	Hasuraそのもののを操作する場所（２種類ある）
Hasura Cloud console	HasuraCloudプロジェクト全体の管理する場所

VScodeのCUI
VScode console	CUIでHasuraを操作する場所

### Hasura Cloud consoleとHasura consoleの違い

Hasura Cloud consoleは
Hasura Cloud全体をプロジェクト単位で見る
https://cloud.hasura.io/projects

Hasura consoleは
HasuraもしくはHasura Cloudの１プロジェクト
例
http://localhost:8080/
http://localhost:9695/

## CUIのconsole
docer compose up（ローカルでDockerをつかってHasuraを利用した時）
docker composeで立ち上げた時に自動で起動されるconsoleは
http://localhost:8080/

コマンド hasura consoleで立ち上げた時に出来るconsole
http://localhost:9695/
この２つは別物です。

たとえば、データベースのテーブルを作ってみます
Hasura console でテーブルを作成すると
/hasura/migrations
とディレクトリに書き込まれます。

http://localhost:8080/
で作るとマイグレーションファイル等には反映されません

http://localhost:9695/
で作るとマイグレーションファイル等に反映されます。

http://localhost:9695/
だとDATA（上のバー）タブの
DataManager（左サイドバー）に
SQL
Migrations
となっており

Migrationsが追加されているのがわかります。

Migrationsの場所で
Allow Postgres schema changes via console
をOFFにすると
ブラウザ上のconsoleからスキーマの変更はできなくなります。

http://localhost:9695/で変更をして、
http://localhost:8080/で変更をして、
http://localhost:9695/で変更をすると、

どちらもVScodeの
hasura
	metadata
には反映されますが

hasura
	migrations
には
http://localhost:8080/の変更分は反映されません。

どこか他のデータベースで
このマイグレーションファイルを適用させると
http://localhost:8080/で変更した分は反映されないことになります。

## Hasuraにはエンドポイントがたくさんあるけど・・・どれがどれ？

Hasuraではエンドポイントがデータの出入り口なので
種類によって色々ある。

Hasura consoleのエンドポイント

<endpoint>と書いてあったら

ローカルのエンドポイント
http://localhost:8080/

Hasura Cloudのエンドポイント
https://*****.hasura.app/
*****は自分でつけた名前
を指している。（この形が基本）

Setting up Hasura migrations | Hasura GraphQL Docs
https://hasura.io/docs/latest/graphql/core/migrations/migrations-setup.html

In any case, the endpoint should not contain the v1/graphql API path. It should just be the hostname and any sub-path if it is configured that way.
いずれにせよ、エンドポイントにはv1/graphqlのAPIパスを含めるべきではないでしょう。それは単にホスト名と、そのように設定されている場合は任意のサブパスであるべきです。

GraphQL Endpointは
http://localhost:8080/v1/graphql
https://*****.hasura.app/v1/graphql

## Hasuraを利用したアプリのローカル開発でのディレクトリ構造は？

front
	（Next.jsアプリ）
hasura
	（マイグレーションファイル等）
docker-compose.yml

## Dockerを使いローカルで開発したHasuraのを、Hasura Cloudで使う方法は？

ローカルではDockerを利用した
Hasuraコンテナで動かしていた
Next.jsアプリを読み込めるのに

ネットに上げると読み込んでくれなくなった
未解決

hasura/github-integration-starter: Try out Hasura's GitHub Integration on Cloud Projects using the examples in this repo.
https://github.com/hasura/github-integration-starter
を使う。

ただWindowsでやるとエラーが出て、その問題が解決できなかった。
Hasura Cloudのプロジェクトの歯車アイコンから
Git Deploy[Beta]とある、未だ調査中・・・・・・・