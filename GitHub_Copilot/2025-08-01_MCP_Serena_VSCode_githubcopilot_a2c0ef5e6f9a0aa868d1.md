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
uv と uvxが使用可能

最初に設定しておくこと

`git config --global core.autocrlf`
をtrueにします。
	余計な差分を作らないため

`git config --global core.autocrlf true`
で有効化します。


## 動くかどうかの動作確認

```terminal
uvx --from git+https://github.com/oraios/serena serena start-mcp-server

```

ターミナルで停止すると終了します。



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


実行するとSerenaのダッシュボードがブラウザで自動的に開きます。



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


👆️ `--context ide-assistant`を設定しています。

![スクリーンショット 2025-08-01 125412.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/85b35727-bc47-447f-9589-fea1230a26fb.png)


設定が完了したら起動ボタンを押してみてください。

インストールが成功すると、
serenaのサーバ起動がローカルから確認できます。
http://127.0.0.1:24282/dashboard/index.html

👆️このダッシュボードが自動で開きます。


クライアントによるMCPサーバーの起動: MCPサーバーは通常、クライアントアプリケーションによってサブプロセスとして実行されます。そのため、ユーザーが手動でサーバーを起動する必要はほとんどなく、クライアントの設定を通じてSerenaを起動するコマンドが提供されます。

## 使い方

プロジェクトへの名前や絶対パスなどを教えることで
Serenaは「アクティベート」します。

アクティベートとは
特定のプロジェクトをSerenaが認識し、そのプロジェクトに対する作業コンテキストを確立するプロセスを指します。

アクティベートすることでSerenaは祖のプロジェクトやワークスペースに対して有効化されます。


## プロジェクトのアクティベート

プロジェクトをVSCodeで開き、
例えば
「現在のプロジェクトを Serena MCPを利用して分析してください。」
とGitHub Copilotにお願いします。

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

以上です、お疲れ様でした。



インストール方法は３つあり、そのうち１つを紹介しました。
アプリに組み込めたりもできるそうです。
