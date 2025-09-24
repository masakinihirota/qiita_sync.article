<!--
title:   公式 Chrome DevTools MCP ： Chromeブラウザ用のMCPが登場 これは、Web開発者にとって必須級
tags:    Chrome,ChromeDevTool,DevTools,MCP
id:      a925a2b68ab8374c7fd0
private: false
-->
このMCPはChromeのブラウザ操作が可能です。
つまりVSCodeとGitHub CopilotとブラウザのChromeと直接対話が出来るようになりました。

これからは、ユーザーがGitHub CopilotやGemini CLIをより効果的に活用するために、指示スキルを鍛える必要になるでしょう。

## 環境

Windows11
Chromeブラウザ
VSCode
GitHub Copilot
Gemini CLI

## ソース

公式からChrome用のMCPの発表です。

Chrome DevTools (MCP) for your AI agent  |  Blog  |  Chrome for Developers
https://developer.chrome.com/blog/chrome-devtools-mcp

chrome-devtools-mcp/docs/tool-reference.md at main · ChromeDevTools/chrome-devtools-mcp
https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md



## MCPとは

AIエージェント(GitHub Copilot、Gemini CLI等)がChrome DevToolsを操作できるようにするためのプロトコルで、Model Context Protocolの略称です。

## 主な出来ること

チャットから
* コンソールログの出力
* リサイズ
* スクショ撮影
などの主なブラウザ操作がほぼ全て可能となります。



## Chrome DevTools MCP Tool Reference

### ツール一覧

- **click**: クリック
- **drag**: ドラッグ
- **fill**: 単一フォーム要素 (input, textarea, select)
- **fill_form**: 複数フォーム要素
- **handle_dialog**: ダイアログ操作
- **hover**: ホバー操作
- **upload_file**: ファイルアップロード

### ナビゲーション

- **close_page**: ページを閉じる
- **list_pages**: ページ一覧
- **navigate_page**: ページ移動
- **navigate_page_history**: 履歴
- **new_page**: 新しいページ
- **select_page**: ページを選択
- **wait_for**: 待機

### エミュレーション

- **emulate_cpu**: CPUをエミュレート
- **emulate_network**: ネットワークをエミュレート
- **resize_page**: ページのリサイズ

### パフォーマンス

- **performance_analyze_insight**: パフォーマンス分析のインサイト
- **performance_start_trace**: パフォーマンスのトレースを開始
- **performance_stop_trace**: パフォーマンスのトレースを停止

### ネットワーク

- **get_network_request**: ネットワークリクエストを取得
- **list_network_requests**: ネットワークリクエスト一覧

### デバッグ

- **evaluate_script**: スクリプトを評価
- **list_console_messages**: コンソールメッセージ一覧
- **take_screenshot**: スクリーンショットを撮る
- **take_snapshot**: スナップショットを撮る



## 出来ることの事例

ブラウザの動作検証が可能

チャットからの指示で、「Chrome」で意図したとおりに動作するか自動で検証する

ネットワークリクエストを解析してオリジン間リソース共有（CORS）の問題を発見できる。

コンソールログを検査して機能が期待どおりに動作しない原因を見つけられる
list_console_messagesで
devtoolsのconsoleを見てくれるようになる

AIエージェントにパフォーマンストレースを実行・分析をやらせ、どこに問題があるかを調べてもらう。

ChromeブラウザのUIをナビゲートしたり、フォームに入力したり、ボタンをクリックできるようになった。
ユーザー行動をシミュレートして不具合の再現が可能。
複雑なユーザーフローをテストができるようになった。

AIエージェントにライブページに接続してから、DOMとCSSを検査して、複雑なレイアウト問題を修正するための具体的な提案をしてもらえるようになった

「パフォーマンスチェックして」と頼むだけで、
DevToolsを自動操作して実用的なレポートが出力される

その他多数

## しなくて良くなること

スクリーンショットを見せる必要がなくなった
ブラウザのログをコピペして見せる必要がなくなった

その他多数
これからは指示で十分です。



## インストール

VSCodeの `ctrl + shift + p`でコマンドパレットを開きます。

"MCP: Open User Configuration" と検索します。

![スクリーンショット 2025-09-24 234908.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c2a0d321-e7f1-49de-977f-3b656dafab02.png)

mcp.jsonが開いたら👇️のように設定します。

![スクリーンショット 2025-09-24 234917.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c8fb1b55-3905-44e8-a6ef-c541a8ea7f56.png)

```mcp.json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}

```

実行ボタンを押して実行中になれば成功です。