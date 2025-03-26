<!--
title:   VSCode(ネイティブ)にMCPを設定して、GitHub Copilot Agent modeでSupabaseを操作する。
tags:    Agent,MCP,Supabase,VSCode,githubcopilot
id:      b5ae692191d197eb5ad7
private: false
-->
* VSCode InsidersはVSCodeの先行試験バージョンです。

* VSCode(ネイティブ)とは拡張機能を経ずに本体に設定することです。

# 要約

設定の方法は、VSCodeのリポジトリ直下(.vscode/)に👇設定ファイル(mcp.json)を置くだけです。

## Supabase(ローカル)の場合の設定ファイル

```.vscode/mcp.json
{
    "servers": {
        "supabase": {
          "command": "cmd",
          "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:postgres@127.0.0.1:54322/postgres"]
        }
    }
}

```

後は、GitHub Copilot Agent modeとのチャットでSupabaseを操作できます。
DB内のデータの読み込みやSupabase用のコードの提案はできますが、数値の書き換え等の直接の操作は出来ません。



# 追記 2025年3月26日

サンプル MCPの設定リポジトリ

https://github.com/masakinihirota/github-copilot-custom-instructions

追記終了



# 現状

VSCodeのMCPは、現在VSCode Insiders v1.99以上でのみ対応中
現在(2025年3月26日)のVSCodeは v1.98
順調にいけば2週間後に反映予定

# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

# 疑問と調査

MCPがスゴイ、VSCodeでもネイティブに使えないかな？

調べると、MCPは 1.99から対応(予定)
VSCode insider 1.99ではすでにMCPが使えるように組み込まれていました。



<details><summary>VSCodeの拡張機能でつかうMCP</summary>

MCPは有志の拡張機能で対応中

例えば
Cline もしくはその派生ツール(Roo code等)で使えます。
VSCode + GitHub Copilot + Cline + MCP
の組み合わせで定額で使えます。
※👆定額がお得。

Clineで使う場合Pythonをインストールしておきます。

```terminal
scoop install python
# 3.12以上が必要
python --version
# Python 3.13.2

```

</details>



# VSCode(ネイティブ)で使うMCP

## .vscode下に設定する

VSCodeのリポジトリ ルート直下に
`.vscode/mcp.json` ファイルを作成します。

```terminal
touch .vscode/mcp.json

```

ファイルを開き、右下の青いサーバーの追加ボタンを押します。？？
押した後の操作方法がわからないので設定ファイルを直接書きます。



----------------------------------------

# VSCodeにSupabaseのMCPを組み込んでみる。

## 事前準備

VSCode Insidersを用意します。
GitHub CopilotをVSCode Insidersでも動くようにしておきます。
Next.js アプリを起動(Supabaseが動くフレームワークなら何でも)
Supabaseをサーバーでプロジェクトを作成しておきます。
Supabaseをローカルにインストールします。
動作確認用に、ローカルのSupabaseをDocker desktopで起動しておきます。



## Supabase のMCPについて

Supabase公式ドキュメント MCP
Model context protocol (MCP) | Supabase Docs
https://supabase.com/docs/guides/getting-started/mcp

servers/src/postgres at main · modelcontextprotocol/servers
https://github.com/modelcontextprotocol/servers/tree/main/src/postgres

Supabase に接続すると、自然言語コマンドを使用してデータベースを照会したり、その他の SQL 操作を実行したりできるようになります。



## 使用できるエディタ

Supabaseで公式に使えるエディタ
* Cursor
* Windsurf (Codium)
* Cline (VS Code extension)
* Claude desktop

👆まだVSCode(ネイティブ)では使えないようです。



## サーバーのSupabase 接続文字列(connection-string)の取得

サーバーのプロジェクトを開きます。

Database | Supabase
https://supabase.com/dashboard/project/_/settings/database?showConnect=true

👆Connect to your project 画面が開きます。

Session pooler(画面の下の方にある)

```
postgresql://postgres.:[YOUR-Reference ID]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres

```

👆を設定します。

### Tips

環境変数に機密情報を含める場合は、`.env` ファイルを使用して管理してください。



## ローカルのSupabase 接続文字列(connection-string)の取得

`supabase status`コマンドで表示されます、

```terminal
supabase status

DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres

```

👆DB URLを設定で使います。



## VSCode Insidersに設定する。

* 基本形

```.vscode/mcp.json
{
  "servers": {
    "supabase": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"]
    }
  }
}

```

👆 <connection-string>を先程取得した文字列に置き換えます。

※`npx`が実行できる環境であること

`.vscode/mcp.json`ファイルの"supabase"の上に表示されるRunボタンを押します。
Runningを確認。


## サーバーの場合の設定

```.vscode/mcp.json
{
  "servers": {
    "supabase": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"]
    }
  }
}

```

👆<connection-string>を先程取得したサーバーの接続文字列に置き換えます。



## ローカルの場合の設定

```.vscode/mcp.json
{
    "servers": {
        "supabase": {
          "command": "cmd",
          "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:postgres@127.0.0.1:54322/postgres"]
        }
    }
}

```

👆<connection-string>を先程取得したローカルの接続文字列に置き換えます。
※ローカルは環境変数が同じなので丸ごとコピペでOKです。(置き換え済み)

※`npx`が実行できる環境であること

`.vscode/mcp.json`ファイルの"supabase"の上に表示されるRunボタンを押します。
Runningを確認。



----------------------------------------

# GitHub Copilot エージェントモードで確認

SupabaseのPublicに適当なテーブルをいくつか作っておきます。

## チャット欄から聞く1

SupabaseのPublicのテーブル名を教えて。

## GitHub Copilotからの返答1

テーブルの数と名前が正確だったら接続できています。
Supabaseからテーブルデータを正確に読み取ってくれました。



## チャット欄から聞く2

例
SupabaseのPublic.usersテーブルのid 1 の name を masakinihirota と入力して。

## GitHub Copilotからの返答2

👇コードが生成されました。

```query.sql
// public.users テーブルの id 1 の name を masakinihirota と設定する関数
export async function updateUserNameToMasakinihirota() {
  try {
    await db
      .update(users)
      .set({ name: 'masakinihirota' })
      .where(eq(users.id, 1))

    console.log('ユーザー名を masakinihirota に更新しました')
  } catch (error) {
    console.error('ユーザー名の更新中にエラーが発生しました:', error)
    throw error
  }
}

```

👆VSCodeから直接Supabaseの数値操作は出来ませんでした。

以上で設定＆確認終了です。
お疲れさまでした。



# 次のステップ

これで、MCP を使用して Supabase に接続されました。自然言語コマンドを使用してデータベースを操作できるようになりました。AI ツールにデータベースのクエリ、新しいテーブルの作成、その他の SQL 操作の実行を依頼してみてください。



----------------------------------------

おまけ: 調べていた途中でわかったGitHub Copilotの新機能

👇要するに、図も使えるようになるってことらしいです。

# Copilot Vision

画像によるコーディング支援がVS Codeで利用可能に

GitHub Copilotに、画像認識機能「Copilot Vision」が追加されました。これにより、テキストチャットに加えて、画像を使った指示が可能になります。

## Copilot Visionでできること

### モックアップ画像からのWebページ生成

UIデザインのモックアップ画像を読み込ませ、HTML/CSSコードを生成できます。

### エラー解析

コード実行時のエラー画面のスクリーンショットを読み込ませ、エラー内容の分析や説明を依頼できます。

現時点ではGPT-4oでのみ
Claude 3.5 SonnetやGemini 2.0でもサポート予定です。



## 画像の添付方法

OSやエクスプローラーから画像をドラッグ&ドロップ
クリップボードから画像を貼り付け
VS Codeウィンドウのスクリーンショットを添付（ペーパークリップボタン > Screenshot Window）

対応する画像形式は、JPEG/JPG、PNG、GIF、WebP



# GitHub Copilotのコードベースとは？

Copilot Chatにおける高度なコードベース検索
Copilot Chatのクエリに「#codebase」を追加すると、ワークスペース内の関連コードを検索できるようになります。
「#codebase」はテキスト検索やファイル検索などのツールを活用し、ワークスペースのコンテキストを取得します。
