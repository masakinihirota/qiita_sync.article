<!--
title:   Next.js Supabaseの組み合わせに GitHub Actionsを導入する。
tags:    GitHub,GitHubActions,Next.js,Supabase
id:      9f5161c0f00c9e54f93a
private: true
-->
テンプレート

Next.js
Supabase
GitHub
GitHubActions




# Next.jsインストール

npx create-next-app -e with-supabase

Next.jsの公式サンプルの一つです。
↓このリポジトリをそのまま利用します。

next.js/examples/with-supabase at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-supabase



動作確認
npm run dev

これではまだ、このサンプルは動きません。

Supabaseの環境ファイルが必要です。

Supabaseのプロジェクトを作って環境変数を取得する必要があります。



# 環境ファイルを作る

※Supabaseでプロジェクトを作成済みで、
プロジェクトの設定情報は知っているものとします。

touch .env.local

```.env.local
NEXT_PUBLIC_SUPABASE_URL=https://zhlmcrnnjbsfhbnctenz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey***********************************74

```

.env.local.example
は削除します。



動作確認
npm run dev
npm run build
npm run start

※npm run devで起動していると、npm run buildはエラーを出して止まってしまうので、
npm run devは停止させてから npm run buildを実行させてください



----------------------------------------

# GitHubへの PUSH と Vercelへのデプロイ ＋ 独自ドメイン

動作確認できたのでGitHubとVercelに一気にデプロイします。

Next.js ✖️ SupabaseプロジェクトのVercelへのデプロイメモ
https://zenn.dev/shgs/articles/6b7fde20a6a596


## GitHub へのPUSH

GitHubへはVSCodeの機能 ソース管理で簡単にリポジトリが作成され、PUSH出来ました。

