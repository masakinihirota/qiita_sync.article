<!--
title:   便利なMCP 2025年4月版 (もう古いコードの提案はしなくなるMCP他)
tags:    Context7,MCP,Playwright,Supabase
id:      8971aa8ccead3193e77f
private: false
-->
# 便利なMCP紹介

## Context7

https://context7.com/

Context7 MCP Server

https://mcp.so/server/c7-mcp-server/quiint

GitHub Copilotを使っていると、時々 古い情報のコードが提案されます。
これは、カットオフ（＝ある特定期間までの情報）されているので最新情報に追いついていないからです。

その弱点を補うのがこの Context7です。
使用することで、常に最新バージョンのコードが提案されるようになります。
そしてスニペットと呼ばれる、具体的なコード例も使用することが出来ます。

このスニペットとは、最新バージョンに対応しているコードでの動作確認がされているミニコードです。

Curosor の@Docと似ていますが、この機能は人間の手でサイトを指定する必要があります。
Context7を設定すれば、人間の手で一つ一つ登録しなくてもよくなります。
しかも必要な情報にのみアクセスが可能になります。
Context7には対応サイトが2025年4月現在 446 あります。

主な対応ドキュメント、スニペット
Next.js
Supabase
Hono
Elasticsearch
Laravel
Clerk
MongoDB
FastAPI

主な特徴：
- 最新のバージョン固有ドキュメントを自動で提供
- ソースからの実際に動作するコード例を取得
- 無駄な情報のない簡潔で関連性の高い情報を提供
- CursorやClaudeなどのAIツールへの簡単な統合
- モデルコンテキストプロトコル(MCP)サーバーとの連携



## Supabase

Model context protocol (MCP) | Supabase Docs

https://supabase.com/docs/guides/getting-started/mcp?queryGroups=os&os=windows

Supabaseへのアクセスが便利になるMCP

主な特徴：
- Supabaseへのアクセスを効率化
- 最新ドキュメントやコードスニペットを提供
- 開発者が簡単にリアルタイムアプリケーションや認証機能を構築可能



## Playwright

https://mcp.so/server/playwright-mcp/microsoft

Playwrightは、テストを自然言語で記述できるようにするMCPです。
AIと連携することで、高品質なテストコードの生成をサポートします。

主な特徴：
- 自然言語によるテスト記述
- ドキュメントからコードスニペットと例の自動抽出
- LLMを活用した説明とメタデータの強化
- セマンティック検索のためのベクトル化機能
- 関連性に基づくカスタムアルゴリズムでの結果スコアリング
- 高速なパフォーマンスのためのRedisキャッシュ