<!--
title:   便利なMCP 2025年4月版 (もう古いコードの提案はしなくなるMCP他)
tags:    Context7,MCP,Playwright,Supabase
id:      8971aa8ccead3193e77f
private: false
-->

# VSCodeでのMCP設定

VSCodeの左下の歯車アイコンから「設定」を開きます。

設定の検索から 「mcp」 で検索します。

ユーザーもしくはワークスペースを選択します。

* ユーザーだとVSCode本体のsettings.jsonが開きます。
* ワークスペースだとワークスペースのルートに `.vscode` フォルダが作成され、そこに `settings.json` が作成されます。
※ワークスペースはワークスペースファイル内([ワークスペース名].code-workspace)でも設定できます。

VSCode設定の優先順位は ワークスペース＞ユーザー＞デフォルトです。

「settings.jsonで編集」を開きます。

`.vscode\settings.json`

👆(ワークスペースの場合)設定ファイルが作成されます。

mcpのサンプルが表示されます。
このサンプルはGitHub Copilotが日時を取得するためのサンプルです。

```settings.json
"mcp": {
	"inputs": [],
	"servers": {
		"mcp-server-time": {
			"command": "[PythonのPath]",
			"args": [
				"-m",
				"mcp_server_time",
     "--local-timezone=Asia/Tokyo"
			],
			"env": {
				"PATH": "${env:PATH}"
			}
		}
	}
}

```

※Pythonをインストールしておく必要があります。



# 便利なMCP紹介

## Context7

https://context7.com/

Context7 MCP Server

https://mcp.so/server/c7-mcp-server/quiint

upstash/context7: Instant LLM Context for Agents and Developers

https://github.com/upstash/context7


GitHub Copilotを使っていると、時々 古い情報のコードが提案されることがあります。
これは、カットオフ（＝ある特定期間までの情報）されているので最新情報に追いついていないからです。

その弱点を補うのがこの Context7です。
Context7を使用することで、常に最新バージョンのドキュメントやコード例が提案されるようになります。
そしてスニペットと呼ばれる、具体的なコード例も使用することが出来ます。

このスニペットとは、最新バージョンに対応しているコードでの動作確認がされているミニコードです。

Cursorの`@Doc`機能と似ていますが、`@Doc`はユーザーがドキュメントの場所を指定する必要があります。
Context7を設定すれば、必要なドキュメントへのアクセスが自動化され、常に最新の情報が得られます。

2025年4月現在、Context7は446のサイトに対応しています。

### 主な対応ドキュメント、スニペット

* Next.js
* Supabase
* Hono
* Elasticsearch
* Laravel
* Clerk
* MongoDB
* FastAPI

### 主な特徴

* 最新のバージョン固有ドキュメントを自動で提供
* ソースコードから実際に動作するコード例
* 無駄な情報がなく、関連性の高い情報を提供
* VSCodeやCursor、ClaudeなどのAIツールへの簡単な統合
* MCP (Model Context Protocol) サーバーとの連携
* 個人利用は1日あたり最大 50 クエリまで無料


### インストール

```terminal
npm install -g c7-mcp-server

```

```settings.json
...
"context7": {
  "command": "c7-mcp-server", // インストールまたはリンクされたコマンド名
  "args": [] // デフォルトでは引数は不要（stdioトランスポート用）
  // "env": {} // 必要に応じて環境変数を追加
}

```



## Supabase

Model context protocol (MCP) | Supabase Docs

https://supabase.com/docs/guides/getting-started/mcp



Supabaseへのアクセスが便利になるMCP

### 主な特徴

* Supabaseへのアクセスを効率化
* 最新ドキュメントやコードスニペットを提供
* 開発者が簡単にリアルタイムアプリケーションや認証機能を構築可能
* 複雑なSQLクエリを簡単な言葉で実行
* レポート作成や洞察の抽出が容易


### ローカル用のSupabase MCPの設定

Docker Desktopをインストールして、ローカルのSupabaseを立ち上げます。

VSCode settings.jsonに以下の設定を追加します。
VSCodeでMCPを有効にするための設定を行います。

```settings.json
"chat.mcp.enabled": true

```

SupabaseのMCPをローカルのSupabaseで動かすための設定ファイルを作成します。
VSCodeのリポジトリ ルート直下に
`.vscode/mcp.json` ファイルを作成します。


```mcp.json
"servers": {
	"supabase": {
		"command": "cmd",
		"args": [
			"/c",
			"npx",
			"-y",
			"@modelcontextprotocol/server-postgres",
			"postgresql://postgres:postgres@127.0.0.1:54322/postgres"
		]
	}
}

```


### 複数設定

MCPを複数設定することができます。settings.jsonの適当な場所に挿入してください。
設定後 起動させてください。

```settings.json
...
"mcp": {
	"inputs": [],
	"servers": {
		"mcp-server-time": {
			"command": "[pythonのPath]",
			"args": [
				"-m",
				"mcp_server_time",
     "--local-timezone=Asia/Tokyo"
			],
			"env": {
				"PATH": "${env:PATH}"
			}
		},
 "supabase": {
   "command": "cmd",
   "args": [
     "/c",
     "npx",
     "-y",
     "@modelcontextprotocol/server-postgres",
     "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
   ]
 }
	}
}

```

※👆️このローカルのSupabaseはDocker Desktop等で立ち上げておいてください。

SupabaseのMCPをローカルで動かすための設定ファイルを作成します。

supabase-community/supabase-mcp: Connect Supabase to your AI assistants

https://github.com/supabase-community/supabase-mcp



## Playwright

https://mcp.so/server/playwright-mcp/microsoft

Playwrightは、テストを自然言語で記述できるようにするMCPです。
AIと連携することで、高品質なテストコードの生成をサポートします。

### 主な特徴
* 自然言語によるテスト記述
* ドキュメントからコードスニペットと例を自動抽出
* LLMを活用した説明とメタデータの強化
* セマンティック検索のためのベクトル化機能
* 関連性に基づくカスタムアルゴリズムでの結果スコアリング
* 高速なパフォーマンスのためのRedisキャッシュ


## Figma

Figmaの図をダイレクトにコード化

### 主な特徴
？



## Stripe

Stripe - MCP Server | Cursor Directory

https://cursor.directory/mcp/stripe


CursorでStripe MCPを使ってサブスクリプションの実装をやらせてみる

https://wp-kyoto.net/generate-code-with-cursor-and-stripe-mcp/


## GitHub

### 主な特徴

* GitHubワークフローとプロセスを自動化します。
* プルリクエストやイシューの追跡が自動化します。
* GitHubリポジトリからデータを抽出して分析します。
* GitHub のエコシステムとやり取りする AI 搭載のツールとアプリケーションを構築します。

github/github-mcp-server: GitHub's official MCP Server
https://github.com/github/github-mcp-server

Introduction - Model Context Protocol

https://modelcontextprotocol.io/introduction


コンテナ内でサーバーを実行するには、Dockerをインストールする必要があります。

GitHub のアクセストークンが必要です。
アクセストークンを作成するには、GitHubの設定ページにアクセスし、[Developer settings] > [Personal access tokens] > [Tokens (classic)]を選択します。
次に、[Generate new token (classic)]をクリックし、必要なスコープを選択してトークンを生成します。

Create a GitHub Personal Access Token.

https://github.com/settings/personal-access-tokens/new

👆️認証必須

GitHub - MCP Server | Cursor Directory

https://cursor.directory/mcp/github

```mcp.json
"mcp": {
    "inputs": [],
    "servers": {
        "mcp-server-time": {
            "command": "python",
            "args": [
                "-m",
                "mcp_server_time",
                "--local-timezone=America/Los_Angeles"
            ],
            "env": {}
        },
        "github": {
            "command": "cmd",
            "args": [
                "/c",
                "npx",
                "-y",
                "@modelcontextprotocol/server-github"
            ],
            "env": {
                "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
            }
        }
    }
}

```



## Raygun

### 主な特徴

* エラー追跡・分析
* リアルタイムモニタリング
* ユーザーが気づく前にクラッシュを検出
* 実用的な洞察が可能
* アプリケーションの安定稼働をサポート

MindscapeHQ/mcp-server-raygun

https://github.com/MindscapeHQ/mcp-server-raygun

```mcp.json
{
  "mcpServers": {
    "raygun": {
      "command": "npx",
      "args": ["-y", "@raygun.io/mcp-server-raygun"],
      "env": {
        "RAYGUN_PAT_TOKEN": "your-pat-token-here"
      }
    }
  }
}

```



# MCP 関連URL

## 探す

Smithery - Model Context Protocol Registry

https://smithery.ai/

VeyraX

https://www.veyrax.com/marketplace

MCP Servers for Cursor

https://cursor.directory/mcp

modelcontextprotocol/servers: Model Context Protocol Servers

https://github.com/modelcontextprotocol/servers

🌟 Reference Servers
Anthropic自身が実装したMCPサーバー

🤝 Third-Party Servers
Anthropic以外が実装したMCPサーバー


## VSCodeのMCP Issues

Issues · microsoft/vscode

https://github.com/microsoft/vscode/labels/chat-mcp



## MCP

Introduction - Model Context Protocol

https://modelcontextprotocol.io/introduction



---

# GitHub Copilotに最新の情報を取得させ、認識させる方法

GitHub Copilotは、使用する基盤モデルによって提案内容が左右されます。
最新モデルであっても、常に最新のライブラリやフレームワークに対応しているとは限りません。
そのため、GitHub Copilotに最新情報を認識させるには、以下の方法があります。

1. 人力
2. 1ファイル化してGitHub Copilotに認識させる
3. RAGに最新の情報を取得させ、認識させる方法
4. MCPを使用する
5. エージェントモードでLLMが自分で調べる

※下に行くほど人間が楽になります。
※5のエージェントモードはGitHub Copilot Agent modeのことではない。LLMが自律行動する場合のこと

1. 人力 (とてもたいへん)

* ドキュメントを参照する: 使用しているライブラリやフレームワークの公式ドキュメントを確認し、最新の情報を把握します。
最新のバージョンの情報を追いかけます。
学習して使い方を覚えて組み込めるようにします。

* GitHubリポジトリを確認する: 使用しているライブラリやフレームワークのGitHubリポジトリを確認し、最新のコードや変更履歴を把握します。



2. 1ファイル化してGitHub Copilotに認識させる

* 関連する情報を1つのファイルにまとめ、GitHub Copilotにそのファイルを読み込ませて、コードを提案するように指示します（チャットやプロンプト、指示書を使用）。
* GitHubリポジトリを1ファイル化するツール


* uithub GitHubのサイトのリポジトリを1ファイル化
* repomix CLIのコマンド一つで1ファイル化

その他多数



* MCPクライアントアプリ、AI搭載IDE

VSCode
Cursor
Windsurf

1ファイル化したものをMCPクライアントアプリに読み込ませることで、GitHub Copilotが最新の情報を認識しやすくなります。


3. RAGに最新の情報を取得させ、認識させる方法

* RAG（Retrieval-Augmented Generation）を使用して、最新の情報を取得し、LLMに認識させる方法です。
* RAGは、LLMが情報を生成する際に、外部の情報源から取得した情報を組み合わせて生成する手法です。


4. MCPを使用する

* Context7 ＜＜今回のBlog

事前準備された最新バージョンの情報等を用意しておき、LLMが自律的に最新の情報、コード、スニペットを収集できるようにします。



5. エージェントモードでLLMに自律的に調べさせる

* エージェントモードを搭載したエディタなどを使用し、LLMが自律的に情報を収集し、それに基づいてコードを生成する環境が実現しつつあります。

※このエージェントモードはGitHub Copilot Agent modeとは別です。



# 最後に

AIには、弱いAIと強いAIという分類があります。

* 弱いAI 人からの指示に基づいて動作するAI
* 強いAI 自律的に行動し、自分で情報を収集や判断できるAI

もし強いAIが現れれば、技術的特異点（シンギュラリティ）が起こったと言えるかもしれません。

