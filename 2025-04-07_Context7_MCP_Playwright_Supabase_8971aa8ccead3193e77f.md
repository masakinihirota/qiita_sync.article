<!--
title:   便利なMCP 2025年4月版 (もう古いコードの提案はしなくなるMCP他)
tags:    Context7,MCP,Playwright,Supabase
id:      8971aa8ccead3193e77f
private: false
-->
※立ち上げるごとにMCPの起動が必要。
`settings.json`などで、起動ボタンを押します。
有料や回数制限があるMCPがあるから仕方がないか。

# VSCodeでのMCP設定

VSCodeの左下の歯車アイコンから「設定」を開きます。

設定の検索から `mcp` で検索します。

👇MCP関連の設定画面が表示されます。
ユーザーもしくはワークスペースを選択します。

```
次でも変更されています(ワークスペース)
モデル コンテキスト プロトコル サーバー構成
settings.jsonで編集

```

* ユーザーだとVSCode本体の`settings.json`が開きます。
* ワークスペースだとワークスペースのルートに `.vscode` フォルダが作成され、そこに `settings.json` が作成されます。
※ワークスペースはワークスペースファイル内([ワークスペース名].code-workspace)でも設定できます。

VSCode設定の優先順位は ワークスペース＞ユーザー＞デフォルトです。

「`settings.json`で編集」を開きます。

`.vscode\settings.json`

👆(ワークスペースの場合)設定ファイルが作成されます。

mcpのサンプルが表示されます。
このサンプルはGitHub Copilotが日時を取得するためのサンプルです。

```settings.json
...
	"mcp": {
		"inputs": [],
		"servers": {
			"mcp-server-time": {
				"command": "[PythonのPath]",
				"args": ["-m", "mcp_server_time", "--local-timezone=Asia/Tokyo"],
				"env": {
					"PATH": "${env:PATH}"
				}
			}
		}
	}

```

※この`mcp-server-time`のMCPはPythonをインストールしておく必要があります。

👇VSCodeでMCPを有効にするための設定を行います。

```settings.json
...
"chat.mcp.enabled": true

```



# 便利なMCP紹介

## Context7

https://context7.com/

Context7 MCP Server

https://mcp.so/server/c7-mcp-server/quiint

https://mcp.so/server/c7-mcp-server/quiint?tab=content

upstash/context7: Instant LLM Context for Agents and Developers

https://github.com/upstash/context7


GitHub Copilotを使っていると、時々 古い情報のコードが提案されることがあります。
これは、カットオフ（＝ある特定期間までの情報）されているので最新情報に追いついていないからです。

その弱点を補うのがこの Context7です。
Context7を使用することで、常に最新バージョンのドキュメントやコード例が提案されるようになります。
そしてスニペットと呼ばれる、具体的なコード例も使用することが出来ます。

このスニペットとは、最新バージョンに対応しているコードでの動作確認がされているミニコードです。

Cursorの`@Doc`機能と似ていますが、`@Doc`はユーザーがドキュメントの場所を毎回指定する必要があります。
Context7を設定すれば、必要なドキュメントへのアクセスが自動化され、常に最新の情報と動作確認済みのスニペットが得られます。

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
その他

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

MCPはつなげるだけの役割で、実際に動かすのはGitHub Copilotです。
GitHub Copilotに指示してDBの情報を取得できないときがありますが、
それは人間の指示が悪い場合が多いと思います。

ダイレクトにQueryを発行してデータを取ってきてくれと指示を出すと。
GitHub Copilotはその通りに動いてくれます。

曖昧な指示、「データを取ってきて」とか曖昧だと素直に動かないと思います。



Supabaseへのアクセスが便利になるMCP

### 主な特徴

* Supabaseへのアクセスを効率化
* 最新ドキュメントやコードスニペットを提供
* 開発者が簡単にリアルタイムアプリケーションや認証機能を構築可能
* 複雑なSQLクエリを簡単な言葉で実行
* レポート作成や洞察の抽出が容易


### ローカル用のSupabase MCPの設定

Docker Desktopをインストールして、ローカルのSupabaseを立ち上げます。

SupabaseのMCPをローカルのSupabaseで動かすための設定ファイルを作成します。

```json
"mcpServers": {
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

MCPを複数設定することができます。`settings.json`の適当な場所に挿入してください。
設定後 起動させてください。





```settings.json
...
	//////////////////////////////////////////////////////////
	// MCP
	//////////////////////////////////////////////////////////
	"mcp": {
		"inputs": [],
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
			},
			"mcp-server-time": {
				"command": "[pythonのPath]",
				"args": ["-m", "mcp_server_time", "--local-timezone=Asia/Tokyo"],
				"env": {
					"PATH": "${env:PATH}"
				}
			},
			"context7": {
				"command": "c7-mcp-server", // インストールまたはリンクされたコマンド名
				"args": [] // デフォルトでは引数は不要（stdioトランスポート用）
				// "env": {} // 必要に応じて環境変数を追加
			}
		}
	}

```

※👆このローカルのSupabaseはDocker Desktop等で立ち上げておいてください。

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

Figmaの図をダイレクトにコード化等してくれます。

GLips/Figma-Context-MCP: MCP server to provide Figma layout information to AI coding agents like Cursor

https://github.com/GLips/Figma-Context-MCP

Figmaのアクセストークンが必要です。

無料ユーザーでもアクセストークンは作れます。
Figmaのサイトで、
左上の自分のアイコンから
設定＞セキュリティのタブ＞個人アクセストークン
で「新規トークンを作成」ボタンを押します。
許可の項目を自分で選び、(期限は無期限、わからなかったら全部下)FigmaのAPIキーを生成します。
1回だけ表示されるので適当な場所にメモしておきます。

### 主な特徴

* Figmaデザイン情報の提供
* Figmaコメント操作
* React等のコードを自動生成
* デザインに関する質疑応答

```json
...
{
	"mcpServers": {
		"Framelink Figma MCP": {
			"command": "cmd",
			"args": [
				"/c",
				"npx",
				"-y",
				"figma-developer-mcp",
				"--figma-api-key=FIGMA-API-KEY(figd_XXXXX)",
				"--stdio"
			]
		}
	}
}

```

### 動作確認

MCP起動後、手動確認、👇のコマンドを実行します。

```terminal
npx -y figma-developer-mcp --figma-api-key="FIGMA-API-KEY" --stdio
{"method":"notifications/message","params":{"level":"info","data":["Server connected and ready to process requests"]},"jsonrpc":"2.0"}

```

👆接続に成功したら、このようなメッセージが出ました。
準備が出来ているようです。



### 次世代のWebアプリ開発が可能。

* デザインを Readdy(AIデザイン生成ツール)で作成。
* フロントエンドをFigma MCP
* バックエンドをSupabase MCP

👆️これで開発が出来ます。

AIデザイン生成ツールはv0などもあります。

### Readdyとは

AIデザイン生成ツールです。
AIとのチャットで画面デザインを考えてくれます。
画面デザイン生成AIなので見た目だけ作ってくれます。

* キャッチコピー
Websites that Stand Out
Built and Published in Minutes
ドラッグ&ドロップ不要で、AIと対話しながら夢のウェブサイトを構築 即座に公開、またはコードやFigmaとしてエクスポートします。

Google認証でアカウントが作成できます。
無料でいくつ作れるかは不明。

HTML
Vue
React
を選べます。



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

👆認証必須

GitHub - MCP Server | Cursor Directory

https://cursor.directory/mcp/github

```mcp.json
...
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
				"args": ["/c", "npx", "-y", "@modelcontextprotocol/server-github"],
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
...
	"mcpServers": {
		"raygun": {
			"command": "npx",
			"args": ["-y", "@raygun.io/mcp-server-raygun"],
			"env": {
				"RAYGUN_PAT_TOKEN": "your-pat-token-here"
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
3. RAGに最新の情報を取得させ、認識させる
4. MCPを使用する
5. エージェントモードでLLMが自分で調べる

※下に行くほど人間が楽になります。
※5のエージェントモードはGitHub Copilot Agent modeのことではありません。
LLMが自律行動した場合のことを指します。

### 1 人力 (とてもたいへん)

* ドキュメントを参照する: 使用しているライブラリやフレームワークの公式ドキュメントを確認し、最新の情報を把握します。
最新のバージョンの情報を追いかけます。
学習して使い方を覚えて組み込めるようにします。

* GitHubリポジトリを確認する: 使用しているライブラリやフレームワークのGitHubリポジトリを確認し、最新のコードや変更履歴を把握します。

AIが流行る前の一般常識でした。


AIが流行った後は、ある程度最新の情報は仕方ないと自分で調べて1の方法を採用していました。
数カ月後にはいろいろな手法が生み出され、👇2. 以降の技術が出てきました。

### 2 1ファイル化してGitHub Copilotに認識させる

* 関連する情報を1つのファイルにまとめ、GitHub Copilotにそのファイルを読み込ませて、コードを提案するように指示します（チャットやプロンプト、指示書を使用）。
* GitHubリポジトリを1ファイル化するツール
* uithub GitHubのサイトのリポジトリを1ファイル化
* repomix CLIのコマンド一つで1ファイル化

その他多数

https://uithub.com/

https://repomix.com/


* MCPクライアントアプリ、AI搭載IDE

VSCode
Cursor
Windsurf

1ファイル化したものをMCPクライアントアプリに読み込ませることで、GitHub Copilotが最新の情報を認識しやすくなります。

### 3 RAGに最新の情報を取得させ、認識させる方法

* RAG（Retrieval-Augmented Generation）を使用して、最新の情報を取得し、LLMに認識させる方法です。
* RAGは、LLMが情報を生成する際に、外部の情報源から取得した情報を組み合わせて生成する手法です。

### 4 MCPを使用する

* Context7 ＜＜今回のBlogで紹介したMCP

事前準備された最新バージョンの情報等を用意しておき、LLMが自律的に最新の情報、コード、スニペットを収集できるようにします。



### 5 エージェントモードでLLMに自律的に調べさせる

* エージェントモードを搭載したエディタなどを使用し、LLMが自律的に情報を収集し、それに基づいてコードを生成する環境が実現しつつあります。

※このエージェントモードはGitHub Copilot Agent modeとは別です。



# 最後に

👆 5に関して、
エージェントという言葉のとおり代理人になるのが限界です。
自律タイプのAIはまだ出てきていません。

AIには、弱いAIと強いAIという分類があります。

* 弱いAI 人からの指示に基づいて動作するAI
* 強いAI 自律的に行動し、自分で情報を収集や判断できるAI

もし強いAIが現れれば、6. 自律調査ができる。が可能になれば、技術的特異点（シンギュラリティ）が起こったと言えるかもしれません。



---

# 記事を書いたあとで使ってみたMCP

## Brave Search

GitHub Copilotがネット検索をしてくれます

modelcontextprotocol/servers: Model Context Protocol Servers

https://github.com/modelcontextprotocol/servers/tree/main

👆この🌟 Reference Servers に登録されているので比較的安全だと思われるサイトです。

🌟 Reference Servers
Anthropic自身が実装したMCPサーバー

Anthropic はMCPを開発した会社であり、MCPの開発に関与しています。

### 前提条件

* 一応無料
* Stripe経由でカード情報と住所が必要
* サブスクライブ0$でのカード支払い登録が必要



### 出来ること

サブスクライブ0$で出来ること
* 画像検索
* ビデオ検索
* ニュース検索
* 提案
* スペルチェック
他



### 導入

https://brave.com/ja/

アカウント作成します。
サブスクライブに入会します。
Stripe経由でカードの情報を登録します
👆自己責任で！
メールでやり取りをしてアカウントを作成します。

サイトからAPIキーを生成します。
適当な場所に保存しておきます。

```settings.json
...
	"brave-search": {
		"command": "npx",
		"args": ["-y", "@modelcontextprotocol/server-brave-search"],
		"env": {
			"BRAVE_API_KEY": "[BRAVE_API_KEY]"
		}
	}

```

### インストール

```terminal
npx -y @modelcontextprotocol/server-brave-search

Error: BRAVE_API_KEY environment variable is required
is required

```

👆と出てきますが、このErrorは無視してよいようです。
起動ボタンを押して起動を確認します。
起動できれば、実行中と出ます。



### 使用例

* 設定ファイル(`settings.json`)で、Brave-searchを起動させます。
* GitHub Copilotをエージェントモードにします。

※GitHub Copilotの「質問する」、「編集」 モードでは検索しません。

エージェントモードに切り替えて指示をします。

例

```
Brave Searchで Brave Search について検索し、その概要を `Brave Search-summary.md` というファイル名で保存してください。

```

このように👆具体的に指示することが大切です。
使用するMCPと目的と、出力先等の詳細な情報をはっきり書いてください。

「*****について教えてください」と指示が曖昧ではGitHub Copilotは使ったり使わなかったりします。
GitHub Copilotは空気を読みません、行間を読みません。
前後の文脈から連想して回答しているだけです。

青い「続行」ボタンが表示されるので、押します。

続行ボタンのドロップダウンメニューで「常に許可」を選ぶと、毎回確認しなくなります。

実行の許可が求められるので
自分の責任で良いと思えれば
実行してもらいます。

青い「保持」ボタンを押します。

出力されたファイルを確認して、検索データが取れていればOKです。

使い終わったら有料、回数制限があるので、`settings.json`で停止させておきます。



---

## filesystem

指定した範囲のローカルファイルにアクセスが出来るようになります。

modelcontextprotocol/servers: Model Context Protocol Servers

https://github.com/modelcontextprotocol/servers/tree/main

### インストール

```terminal
npm install -g @modelcontextprotocol/server-filesystem

```



### 設定例

```settings.json
...
	"file-system": {
		"command": "npx",
		"args": [
			"-y",
			"@modelcontextprotocol/server-filesystem",
			"[アクセスしたいローカルファイルのフォルダ、パス]"
		]
	}

```

```
[アクセスしたいローカルファイルのフォルダ、パス]

	👇このように置き換えます。

"C:\\2025_src"

```

必要な資料を入れたフォルダを指定したりします。
複数のプロジェクトのパスが設定できます。

### 起動

起動ボタンを押して、エラーが出なければ成功です。