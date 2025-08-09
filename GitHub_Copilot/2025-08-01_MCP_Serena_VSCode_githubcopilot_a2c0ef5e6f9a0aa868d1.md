<!--
title:   このMCPはプロジェクト全体を把握 VSCode GitHub Copilotで 「Serena MCP」を使う方法
tags:    MCP,Serena,VSCode,githubcopilot
id:      a2c0ef5e6f9a0aa868d1
private: false
-->
# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

https://qiita.com/masakinihirota/items/8971aa8ccead3193e77f

https://qiita.com/masakinihirota/items/96e2eb8929b0321d1a20

https://qiita.com/masakinihirota/items/a2c0ef5e6f9a0aa868d1

# はじめに

最近 Claude Code やKiro などプロジェクト全体を監視して、コードを書いたり、要件定義や設計やタスクリストを自動で作成したりと進化が激しいです。

一方、GitHub Copilotは全体をみるというよりも、現在の開いているファイルを手助けするというかんじです。

どうやらプロジェクト全体を見てくれてない、もしくは見ているのは少しだけというイメージがあります。

そこで 👇️ **Serena MCP** を使います。

oraios/serena: A powerful coding agent toolkit providing semantic retrieval and editing capabilities (MCP server & Agno integration)

https://github.com/oraios/serena

この Serena MCP はプロジェクトやワークスペース全体を把握してくれるMCPとなります。

それでは早速インストールからしてみましょう。



# 前提条件
VSCode インストール済み
GitHub Copilot有効化済み
uv と uvx が使用可能

最初に設定しておくこと

`git config --global core.autocrlf`
をtrueにします。
	余計な差分を作らないため

`git config --global core.autocrlf true`
で有効化します。



## 動くかどうかの動作確認

👇️ターミナル(黒い画面)から実行してみてください。

```terminal
uvx --from git+https://github.com/oraios/serena serena start-mcp-server

```

実行すると **Serena MCP** のダッシュボードがブラウザで自動的に開きます。
ターミナルで停止(Ctrl+C)すると終了します。



## MCPの設定ファイルの場所

VSCodeのMCP設定ファイルは
`mcp.json`
に記載されています。

この設定ファイルは・・・

MCP設定ファイルの場所
Windows11
`C:\Users\[ユーザー名]\AppData\Roaming\Code\User\mcp.json`

もしくはワークスペース、リポジトリのルートに `.vscode/mcp.json` ファイルを作ってそこに書き込みます。

ここには (C:\Users\[ユーザー名]\AppData\Roaming\Code\User) VSCodeの
`settings.json`
`keybindings.json`
が置かれている場所と同じです。



`Serena` の設定は、mcp.json ファイル内で以下のように定義されています：



```mcp.json
{
	"servers": {
		"serena": {
			"command": "uvx",
			"args": [
				"--from",
				"git+https://github.com/oraios/serena",
				"serena",
				"start-mcp-server",
				"--context",
				"ide-assistant"
			]
		},
...

```


👆️ オプションに `--context ide-assistant` を設定しています。
このオプションはVSCodeなどのIDEに対してアシストをするために必要みたいです。



![スクリーンショット 2025-08-01 125412.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/85b35727-bc47-447f-9589-fea1230a26fb.png)



設定が完了したら起動ボタンを押してみてください。

インストールが成功すると、
serenaのサーバ起動がローカルから確認できます。
http://127.0.0.1:24282/dashboard/index.html

👆️このダッシュボードが自動で開きます。


>クライアントによる Serena MCP サーバーの起動: MCPサーバーは通常、クライアントアプリケーションによってサブプロセスとして実行されます。 そのため、ユーザーが手動でサーバーを起動する必要はほとんどなく、クライアントの設定を通じて Serena MCP を起動するコマンドが提供されます。要はGitHub Copilotが自動で使ってくれれます、GitHub Copilotにプロジェクトを指定することでアクティベート状態になります。 プロジェクトの指示書などに書いておきます。

## 使い方

プロジェクトへの名前や絶対パスなどを教えることで
Serenaは「アクティベート」します。

>アクティベートとは
特定のプロジェクトをSerenaが認識し、そのプロジェクトに対する作業コンテキストを確立するプロセスを指します。

アクティベートすることでSerenaはそのプロジェクトやワークスペースに対して有効化されます。



## プロジェクトのアクティベート

プロジェクトを VSCode で開き、
例えば
「現在のプロジェクトを Serena MCP を利用して分析してください。」
と GitHub Copilot にお願いします。

ブラウザで自動的に
http://127.0.0.1:24283/dashboard/index.html
このダッシュボードが開きました。

![スクリーンショット 2025-08-01 122611.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/087dbdd5-27ac-4807-b36c-79cdfc26cf39.png)

👆実行中のスクリーンショット

分析に数分待ちます。

![スクリーンショット 2025-08-01 123211.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/23aeeaae-8c4b-441c-8f77-7a28b21161b3.png)

分析が終了すると・・・

![スクリーンショット 2025-08-01 123240.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ede532d4-7a87-4cca-8d32-f4bf6f798e11.png)

この結果は、プロジェクトのルートに `.serena`が作成され、そこに保存されます。



## プロジェクトでの使い方

GitHub Copilotの指示書(`.github/copilot-instructions.md`など)に書いておきます。

*「プロジェクト /path/to/my_project を有効化する」
*「プロジェクト my_project を有効化する」

👆️絶対パスで指定したり、プロジェクト名を指定します。
私は絶対パスで指定することをオススメします。

あと、ワークスペースも指定できるようですが、`[ワークスペース名].code-workspace`を指定すればいいようです。(未確認)

Serena MCP の利用方法は３つあり、そのうち１つを紹介しました。
* ux (ローカルインストール)
* uvx 今回の方法(サーバーインストール)
* Agno を使う(プロジェクト内で使う)

>Agnoとは
Serenaをエージェントとして利用するためのフレームワークであり、MCPサーバーのインストール方法とは少し性質が異なるものです。

以上です、お疲れ様でした。


# 以下、NotebookLMによる分析情報

👇️この記事と、Serena MCPのGitHub リポジトリをNotebookLMに与え、分析してもらいました。

https://qiita.com/masakinihirota/items/a2c0ef5e6f9a0aa868d1

https://github.com/oraios/serena


>承知いたしました。提供された情報を整理し、Serenaに関するブログ記事として見やすく構成します。

## Serena の強力な機能：開発者のためのインテリジェントなコードアシスタント

この記事では、Serena の核となる機能と、それが開発ワークフローをどのように向上させるかについて詳しく掘り下げます。

### Serena の核となる強み：セマンティック解析能力を強調

Serena は単にテキストベースでコードを解析するツールではありません。記事では「プロジェクト全体を把握」とありますが、これは Serena が **言語サーバー（Language Server Protocol: LSP）** に基づいて、コードをシンボルレベルで深く理解しているからこそ実現します。これにより、Serena はセマンティックなコードの取得や編集が可能です。まるでベテラン開発者が IDE の機能を使うように、正確なコンテキストを特定し、適切なコードの変更を行えます。

他のツールが RAG（Retrieval-Augmented Generation）ベースやテキストベースの分析に依存する一方で、Serena がシンボル理解に基づく点で優れており、より高精度なコード操作を可能にします。

-----

### 大規模プロジェクトにおけるインデックス作成の推奨

大規模なプロジェクトで Serena のツールを高速化するためには、プロジェクトのインデックスを作成することが強く推奨されます。この手順を行うことで、初回ツール使用時の遅延が大幅に改善されます。

**コマンド例:** プロジェクトディレクトリ内で以下を実行します。

```bash
serena index create
```

-----

### `--context ide-assistant` の詳細な利点

`--context ide-assistant` オプションは、IDE でのコードアシストに不可欠です。このオプションは、シンボリックな操作のためのツールを提供し、GitHub Copilot のようなクライアントのパフォーマンスを向上させる効果があります。これにより、よりスムーズでインテリジェントな開発体験が提供されます。

-----

### Serena ダッシュボードのさらなる活用法

Serena ダッシュボードは、単に開くだけのものではありません。セッション中のログ表示、Serena ツールの使用統計（`record_tool_usage_stats: True` 設定時）、そして特にクライアントが MCP サーバープロセスを適切に終了できない場合に発生する「ゾンビプロセス」を防ぐための安全なシャットダウン機能を提供します。これらの機能により、Serena をより効率的かつ安定して利用できます。

-----

### プロジェクトのアクティベートに関する補足

「GitHub Copilot が自動で使ってくれくれます、GitHub Copilot にプロジェクトを指定することでアクティベート状態になります。」という記述について、より正確には、
「GitHub Copilotが Serena の `activate_project` ツールを使用してプロジェクトをアクティベートし、ユーザーは LLM に対してその指示を与えることで Serena がプロジェクトのコンテキストを確立します」
というニュアンスです。これにより、Serena と LLM の役割分担がより明確になります。

-----

### セキュリティに関する注意点

`execute_shell_command` ツールは任意のシェルコマンドを実行できるため、セキュリティ上のリスクがあることに留意してください。通常、MCP サーバー経由で利用する場合、クライアントはユーザーに実行許可を求めます。しかし、Agno UI のようにユーザーの許可を求めないケースもあるため、注意が必要です。

Serena では、特定のツールを無効にしたり、プロジェクト設定ファイル（`.serena/project.yml`）で **読み取り専用モード（`read_only: true`）** を有効にしたりすることで、コードベースの変更を完全に禁止できます。これにより、より安心して Serena を利用することが可能です。

-----

### モード（Modes）についての簡単な紹介

**コンテキスト**が Serena の起動時に設定され、セッション中に変更できない静的な環境定義であるのに対し、**モード**はセッション中に動的に切り替え可能です。特定のタスクやインタラクションスタイルに合わせて Serena の挙動を微調整できるため、Serena の柔軟性が向上します。

-----

### オンボーディングとメモリーの機能

Serena がプロジェクトに初めて適用される際、 **「オンボーディングプロセス」** を実行し、プロジェクト構造を学習します。また、Serena はプロジェクトディレクトリ内の `.serena/memories/` に **「メモリー」** を保存し、将来の対話でそれを活用することでユーザーエクスペリエンスを大幅に向上させます。これにより、Serena のインテリジェンスが際立ちます。

-----

### Serena の費用対効果の再強調

Serena は **「無料でオープンソース」** であり、多くの有料 IDE ベースや API ベースのエージェントと比較して、「サブスクリプションや API キーが不要で、費用がかからない（特に Claude の無料ティアなどと連携した場合）」という大きな利点があります。この費用対効果の高さは、開発者が Serena を導入する大きな動機となるでしょう。

-----

Serena は、そのセマンティック解析能力、実用的なインデックス作成機能、詳細なコンテキスト制御、そしてコストパフォーマンスの高さにより、現代の開発ワークフローにおいて強力な味方となります。ぜひその機能を体験してみてください。