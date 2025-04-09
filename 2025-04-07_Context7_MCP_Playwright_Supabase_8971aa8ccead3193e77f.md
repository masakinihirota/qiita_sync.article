<!--
title:   便利なMCP 2025年4月版 (もう古いコードの提案はしなくなるMCP他)
tags:    Context7,MCP,Playwright,Supabase
id:      8971aa8ccead3193e77f
private: false
-->
※立ち上げるごとにMCPの起動が必要です。
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



# MCPを最大限に活用した次世代のWebアプリ開発

* Next.js、Honoは **Context7 MCP** 最新のコードやスニペット
* デザインを v0やReaddy(=AIデザイン生成Webサービス)で作成。
* フロントエンドを **Figma MCP** 画面デザイン等
* バックエンドを **Supabase MCP** DB操作等
* 資料を **filesystem MCP** 指定したフォルダに資料や1ファイル化したファイルの読み込み
* テストを**Playwright MCP** 自然言語でのテストコードの自動生成
* Git管理を **GitHub MCP** GitHubの自動操作等
* 保守運用を **Raygun MCP** でエラーの自動追跡
* サブスクライブを **Stripe MCP** Stripeでの実装
* 多様なAIモデルを GitHub Copilot Agent mode、Claude Sonnet 3.5 3.7、GPT-4oでコード生成 追加が可能
* AI搭載エディタを VSCode、Cursor、Windsurf 他で利用できます。
* AI搭載エディタのエージェント化を AIの自律サポートを Cline、Roo codeで行います。

👆これで開発が出来ます。

<details><summary>詳細: MCPを最大限に活用した次世代のWebアプリ開発</summary>

Next.js、Honoなどのフレームワークと、様々なツールやサービスを組み合わせることで、開発効率を飛躍的に向上します。

## MCP (Model Context Protocol) とは

MCPは、AIモデルが外部の情報源（ドキュメント、コードなど）にアクセスし、それらを活用するための標準化されたプロトコルです。これにより、AIはより正確で最新の情報に基づいてコード生成や提案を行うことが可能になります。

## 開発環境

以下は、記事で紹介されている開発環境の概要です。


## エージェント化とは

AIの進化は、大きく以下の段階に分けられます。

* **AIによるコード生成、会話**: 開発者の指示に基づいてコードを生成したり、会話を行う段階。Copilot（副操縦士）がこの段階に相当し、開発者をサポートします。
* **エージェント化**: AIが開発者の代理として、より自律的にタスクを実行する段階。
* **自律型AI**: AI自身が考え、判断し、行動する段階。

エージェント化により、AIは開発者の指示を待つだけでなく、自ら必要な情報を収集し、タスクを遂行できるようになります。

## 各ツールの詳細

* **Next.js**: Reactベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成など、Webアプリケーション開発に必要な機能を提供します。
* **Hono**: 軽量で高速なWebフレームワークで、API開発などに適しています。
* **v0**: AIを活用したデザイン生成Webサービスで、Next.js、Tailwind CSS、Supabaseなどの技術を組み合わせて、コンポーネントを自動生成します。
* **Readdy**: AIとのチャットを通じて画面デザインを生成するWebサービスです。ドラッグ&ドロップ操作は不要で、AIとの対話によってWebサイトの見た目を構築できます。HTML、Vue、Reactなどの形式でエクスポート可能です。
* **Figma**: Webベースのデザインツールで、UIデザインやプロトタイピングに広く利用されています。
* **Supabase**: オープンソースのFirebase代替となるプラットフォームで、データベース、認証、ストレージなどの機能を提供します。
* **filesystem MCP**: 指定したフォルダ内のドキュメントやファイルを読み込み、AIが利用できるようにするMCPです。
* **Playwright MCP**: Playwrightは、E2Eテストを自動化するためのフレームワークです。Playwright MCPを使うことで、自然言語による指示からテストコードを自動生成できます。
* **GitHub MCP**: GitHubとの連携を自動化するMCPです。
* **Raygun MCP**: Raygunは、アプリケーションのエラーやパフォーマンスを監視するツールです。Raygun MCPを使うことで、エラーの自動追跡などが可能になります。
* **Stripe MCP**: Stripeは、オンライン決済プラットフォームです。Stripe MCPを使うことで、Stripeの機能をWebアプリケーションに組み込むことができます。
* **GitHub Copilot Agent mode、Claude Sonnet 3.5 3.7、GPT-4o**: コード生成に利用できる様々なAIモデルです。これらのモデルを組み合わせることで、より高度なコード生成が可能になります。
* **VSCode、Cursor、Windsurf**: AI機能を搭載したコードエディタです。
* **Cline、Roo code**: AIエディタをエージェント化するためのツールです。AIがより自律的に開発をサポートできるようになります。



</details>


---

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


### 最新コード

#### Next.js

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/vercel/next.js

#### TypeScript

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/microsoft/TypeScript-Website

#### TailwindCSS

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/tailwindlabs/tailwindcss

#### Hono

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/honojs/hono

#### Drizzle

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/drizzle-team/drizzle-orm

#### Zod

Context7 - Up-to-date documentation for LLMs and AI code editors

https://context7.com/colinhacks/zod


## Supabase

Model context protocol (MCP) | Supabase Docs

https://supabase.com/docs/guides/getting-started/mcp

alexander-zuev/supabase-mcp-server

https://github.com/alexander-zuev/supabase-mcp-server

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

※デフォルト値はローカルのSupabase用に設定されています。
サーバーのSupabaseプロジェクトでは、SUPABASE_PROJECT_REFとSUPABASE_DB_PASSWORDに値を指定する必要があります。

### 環境変数の設定

優先順位

1. 環境変数: 環境内で直接設定される値
2. ローカル.envファイル:.env現在の作業ディレクトリ内のファイル (ソースから実行している場合にのみ機能します)
3. グローバル設定ファイル:
ウィンドウズ:%APPDATA%\supabase-mcp\.env
macOS/Linux:~/.config/supabase-mcp/.env
4. デフォルト設定: ローカル開発のデフォルト (他の設定が見つからない場合) 👈今回の設定


#### サーバーのSupabase MCPの設定 (未設定)

サーバーのSupabaseプロジェクトでは次の形式を使用します。

`postgresql://postgres.[project_ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

[region]
`ap-northeast-1 北東アジア（東京）`

```env
# Create config directory
# On macOS/Linux
mkdir -p ~/.config/supabase-mcp
# On Windows (PowerShell)
mkdir -Force "$env:APPDATA\supabase-mcp"

# Create and edit .env file
# On macOS/Linux
nano ~/.config/supabase-mcp/.env
# On Windows (PowerShell)
notepad "$env:APPDATA\supabase-mcp\.env"

QUERY_API_KEY=your-api-key
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_DB_PASSWORD=your-db-password
SUPABASE_REGION=us-east-1
SUPABASE_ACCESS_TOKEN=your-access-token
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

```

```terminal
pipx install supabase-mcp-server

```

👇️動作未確認 (開発、分析はローカルで行うため)

```
{
  "mcpServers": {
    "supabase": {
      "command": "/full/path/to/supabase-mcp-server",  // Replace with the actual path from step 1
      "env": {
        "QUERY_API_KEY": "your-api-key",  // Required - get your API key at thequery.dev
        "SUPABASE_PROJECT_REF": "your-project-ref",
        "SUPABASE_DB_PASSWORD": "your-db-password",
        "SUPABASE_REGION": "us-east-1",  // optional, defaults to us-east-1
        "SUPABASE_ACCESS_TOKEN": "your-access-token",  // optional, for management API
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"  // optional, for Auth Admin SDK
      }
    }
  }
}

```



※詳細はドキュメントを見てください。

### MCPを複数設定

jsonの構造を利用して複数のMCPを設定することができます。
`settings.json`の適当な場所に挿入してください。

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



### Figma MCPで出来ること

デザイン情報とAIの連携を円滑にし、開発効率を向上させます。
Figmaのデザイン情報を構造化してAIに提供します。
活用例はコード自動生成、デザインに関する質問応答、コメント操作等。
デザインと開発者間のギャップを埋め、より効率的で精度の高い開発を行います。


* Figmaデザイン情報のAI提供

レイアウト情報: 要素の位置、サイズ、親子関係などをAIに構造的に提供。
スタイル情報: 色、フォント、ボーダー、シャドウなどのデザイン属性をAIに提供。
テキスト情報: 要素内のテキストコンテンツをAIに提供。

* AIによるデザインの理解と活用

コード生成: 提供されたデザイン情報を基に、HTML/CSS、Reactなどのコードを自動生成。
質問応答: Figmaデザインに関する質問（例：「このボタンの色は？」）に対して、正確な情報を基に回答。
デザイン分析: （将来的に）AIがデザインの構造やスタイルを分析し、改善提案などを行う可能性。

* Figmaとのインタラクション

コメント操作: Figma上のコメントを読み取ったり、AIがコメントを書き込んだりすることが可能です。



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

デザイン系のMCPなので気軽な動作確認がしづらいです。
ですので、MCP起動後、手動確認をしてみました。
👇のコマンドを実行します。

```terminal
npx -y figma-developer-mcp --figma-api-key="FIGMA-API-KEY" --stdio

```

```terminal
{"method":"notifications/message","params":{"level":"info","data":["Server connected and ready to process requests"]},"jsonrpc":"2.0"}

```

👆接続に成功したら、このようなメッセージが出ました。
準備が出来ているようです。

GitHub Copilot Agent mode(エージェントに切り替えます)で使えるようになりました。



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

# Gemini API キー

VSCode のGitHub CopilotでGemini系を使うのに登録が必要になりました。

無料で簡単に取得できます。

Geminiを使用するには、GeminiのAPIキーが必要です。
キーは Google AI Studio で数回のクリックで作成できます。

Gemini API キーを取得する  |  Google AI for Developers

https://ai.google.dev/gemini-api/docs/api-key

Get API key | Google AI Studio

https://aistudio.google.com/app/apikey?hl=ja

2025年4月10日現在
gemini 2.5 pro exp 3-25
gemini 2.0 flash
などが使えます。



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





