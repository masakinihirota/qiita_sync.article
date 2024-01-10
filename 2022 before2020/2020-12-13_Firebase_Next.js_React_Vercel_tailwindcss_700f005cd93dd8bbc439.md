<!--
title:   現在の開発 技術選定 2022年 ※個人メモ
tags:    Firebase,Next.js,React,Vercel,tailwindcss
id:      700f005cd93dd8bbc439
private: false
-->
※個人メモ 要はこれから勉強するモノ
1年もしないでポシャるかもしれないし、10年以上使われるかもしれない、そんな先のことはわからないが、10年後でも満足できるであろう技術を選択してみた。

これから勉強するもの、現在６－８割ほど、広く浅くチュートリアルを触る程度の知識。
HerokuのPostgresを使うかSupabaseのPostgresを使うか料金、能力などを比較中
拡張機能、ライブラリ等の細かいものは省略。

# 技術選定リスト
VSCode(エディタ)
Node.js(言語)
React(言語)
TypeScript(言語)
Next.js(フロントエンド)
Vercel (ホスティング)
Docker（コンテナ管理）
Postgre（データベース）
Heroku(クラウド)
Supabase(クラウド)
Figma（デザイン）
Storybook（コンポーネント管理）

Urql（GraphQL）
Prisma（GraphQL）
Apollo（GraphQL）
ReactQuery（GraphQL）

TailwindCSS（装飾）
Headless UI（装飾）
Chakra UI (装飾)
daisy UI (装飾)
Mantine UI (装飾)

Jest（テスト）
React Testing Library（テスト）

ESlint（整形）
Prettier(整形)

DBeaver（DBクライアント）
A5:SQL Mk-2（DBクライアント）
Table Plus（DBクライアント）

あと他に必要なのは・・・？
認証


# 理由
VSCode(エディタ)
日本語の文は秀丸のほうが編集しやすい。

Node.js（言語）
ウェブサイト開発関連はこれ一択

React
コンポーネント開発の主軸

TypeScript
現在のウェブ開発のデファクトスタンダード、Node.jsで開発するならどう考えてもこれ一択。

Next.js
Reactを使うため
フレームワーク開発からコンポーネント開発へ

Vercel (ホスティング)
Next.jsの開発元で相性は◎
ある程度は無料

Docker（コンテナ管理）
ローカルでのウェブ、データベース開発のため

Postgre（データベース）
リレーショナルデータベースを採用

Heroku(クラウド)
データベース・サーバー

Supabase(クラウド)
データベース・サーバー

Figma（デザイン）
Storybookと組み合わせができるようだ

Storybook（コンポーネント管理）

Prisma（GraphQLのORM）

urql（データフェッチ GraphQLクライアント）
GraphQLに重点を置いています。
Apollo（データフェッチ GraphQLクライアント）
GraphQLに重点を置いています。
GraphQLでのサーバークライアント間のデータのやり取り
React Query（データフェッチ ）
データのフェッチに重点を置いています。

装飾
TailwindCSS（装飾）
Headless UI（装飾 UIコンポーネント集）
Chakra UI(装飾)

テスト
Jest（テスト）
React Testing Library（テスト）

ソース整形
ESlint（整形）
Prettier(整形)



# 保留にしたもの
理由NoSQLだと開発するアプリに合わないから。
Firebase (バックエンド)
Firebase Authentication (認証)
Firebase database (データベース)
Firebase Emulator (ローカル開発)

状態管理はどれがいいのかまだよくわかっていない。
Recoil（状態管理）
SWA（状態管理）

データベースのデータのメンテナンス方法がまだ不明
CMS（コンテンツマネージメントシステム)

まだ勉強中

# サービス提供サイト
## エディタ
VSCode
https://azure.microsoft.com/ja-jp/products/visual-studio-code/

## ソース整形
ESlint（整形）
https://eslint.org/
Prettier(整形)
https://prettier.io/

## 言語
Node.js（Javascriptのサーバサイド言語）
https://nodejs.org/ja/
TypeScript（Javascriptの型付AltJavascript）
https://www.typescriptlang.org/
React（コンポーネント型、フロントエンドフレームワーク）
https://ja.reactjs.org/

## コンテナ管理
Docker
https://www.docker.com/

## フロントエンドフレームワーク
Next.js
https://nextjs.org/

## データベース
Postgre（データベース）
https://www.postgresql.org/

## ホスティングサービス アプリのデプロイ用
Vercel （無料・有料）
https://vercel.com/

## GraphQL
Prisma（Node.js TypeScript ORM）
https://www.prisma.io/
Apollo（GraphQL）
https://www.apollographql.com/

## GraphQLサーバー
Hasura（無料・有料）
https://hasura.io/

## コンポーネント管理
Storybook
https://storybook.js.org/

## テスト
Jest
https://jestjs.io/

React Testing Library
https://testing-library.com/

## デザイン
Figma
https://www.figma.com/

# CSS 装飾
https://chakra-ui.com/
https://tailwindcss.com/

## Postgres クラウドサービス PaaS
Heroku （無料・有料）
https://jp.heroku.com
Supabase （無料・有料）
https://supabase.io/
ElephantSQL （無料・有料）
https://www.elephantsql.com/

オンラインのDBサービスのElephantSQL（PostgreSQL）を使う - Qiita
https://qiita.com/mikankitten/items/a9a0363c7b455e928179

# 用語
CMS
フロントエンドのソースコードを変更することなく、管理画面からコンテンツを操作するためのものです。
データの操作はAPIを経由して行います。
API経由なため他のサービスと連携がしやすくなります。

ヘッドレスCMS
ヘッドレスCMSならばビューを使用しないのでどんな端末であろうがコンテンツの一元管理が可能です。
以前はPC、スマフォ、タブレットそれぞれ用意する必要がありました。

# 雛形プロフィール
https://masakinihirota.com

オアシス宣言を利用してインターネットを安心で安全な世界にする。
https://github.com/masakinihirota

SNSの代替品VNSを開発する。
Value Network Service