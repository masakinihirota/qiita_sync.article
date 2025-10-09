<!--
title:   ド本命 GitHub Copilot CLI (public preview) が登場！
tags:    githubcopilot,githubcopilotcli
id:      3a983f01cffc941ac101
private: false
-->
GitHub Copilot シリーズの中核をなす機能の一つになると思われる GitHub Copilot CLI のパブリックプレビューが発表されました。

**CLI** (GitHub Copilot CLIやGemini CLI等) は黒い画面で一見難しそうだけど使いたい3つの理由。
✅ 超高速: キーボードから手を離さず操作でき、思考の速さで作業完了。
✅ 強力な自動化: スクリプトで複雑な繰り返し作業をミスなく一発処理。
✅ 環境の再現性: コマンドのコピペで、誰でも同じ設定を再現できる。

マウスのGUIは操作性は高く便利だが、同じ作業で比較すると毎回アイコンを探してクリックしてなどが大変。



<details><summary>🚀 GitHub Copilot CLI(黒い画面)を使いたい大きなメリット(詳細)⚡</summary>

### 1. 圧倒的な「速さ」と「効率性」

GUIはマウスでカーソルを動かしてクリックする動作が必要だけど、CLIは**キーボードから手を離さず**に操作できる。

* **思考の直結:** 熟練者にとって、何かをしようと考えたとき、コマンドを打つ方が直感的で速い。「あのアイコンはどこだっけ？」と探す時間がゼロになる。
* **時短の積み重ね:** 例えば、ブラウザを開いて、AIサイトで質問して、結果をコピーして、ターミナルに戻るという一連の動作が、Copilot CLIなら**コマンド一つで完結**する。この小さな時短が、一日の開発で大きく効いてくる。

### 2. 「自動化」と「組み合わせ」の強力な力

これがCLIの最大の武器。GUIの操作は、基本的に「手作業」で一回一回行うものだけど、CLIは違う。

* **スクリプト化（自動化）:** 複雑な一連の作業（例: 複数のファイルを削除して、Gitにコミットして、Dockerイメージをビルドする）を**ファイルに書いて自動で実行**できる。これを「シェルスクリプト」と呼ぶ。人が手動でやるより、ミスもなくて速くて確実。
* **パイプライン接続:** 一つのコマンドの結果を、`|`（パイプ）を使って**次のコマンドの入力として渡す**ことができる。

    * **例:** 「`ログファイル`から`ERROR`という文字が入った行だけを抽出し、それをGitHub Copilot CLIに渡して`原因を分析`させる」という複雑な処理が、**一行で**できる。

### 3. 「再現性」と「連携」の容易さ

* **再現性:** コマンドは**テキスト**だから、作業手順を誰かに伝えるときも、**コマンドをコピー＆ペースト**するだけで済む。GUIのようにスクリーンショットを何枚も撮る必要がないから、**環境構築やテストの再現が非常に容易**です。
* **ツール連携:** Git、Docker、Supabase CLIなど、開発の現場で使うプロフェッショナルなツールのほとんどが**CLIベース**で動いている。
* GitHub Copilot CLIも、これらと同じ「黒い画面」に統合されることで、開発ワークフローにシームレスに溶け込める。

---

GitHub Copilot CLIは、**「次に何をすべきか分からない時」**や**「Gitやシェルコマンドの使い方を調べたい時」**に、ブラウザを開く手間なく、**いつものターミナルでAIに聞ける**ようにするためのツール。

なので、とっても開発が快適になる！ 😊

</details>



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

https://qiita.com/masakinihirota/items/a925a2b68ab8374c7fd0

https://qiita.com/masakinihirota/items/3a983f01cffc941ac101



## ソース

GitHub Copilot CLI is now in public preview - GitHub Changelog

https://github.blog/changelog/2025-09-25-github-copilot-cli-is-now-in-public-preview/

github/copilot-cli: GitHub Copilot CLI brings the power of Copilot coding agent directly to your terminal.

https://github.com/github/copilot-cli?utm_source=changelog-source-cta&utm_campaign=agentic-copilot-cli-launch-2025


## とりあえずインストール

```terminal
npm install -g @github/copilot

```


## GitHub Copilot CLI (Public Preview) 解説

### 🚀 はじめに

これは、GitHub Copilotが持つ強力なAIコーディング支援機能を、直接 手元のターミナルで使えるツールです。

GitHub Copilot CLIは、自然言語での対話を通じて、コードの構築、デバッグ、理解を可能にします。
GitHubのCopilotコーディングエージェントと同じエージェントハーネスによって動作しており、GitHubワークフローに深く統合されながら、インテリジェントな支援を提供します。

現在、このプロジェクトはまだ初期段階のプレビューとして公開されてます。



### 🌟 主な特徴とメリット

GitHub Copilot CLIを導入することで得られる主要なメリットは以下の通りです。

1.  **ターミナルネイティブな開発**：Copilotコーディングエージェントとコマンドラインで直接作業できます。コンテキストの切り替えは必要ありません。
2.  **GitHubとの統合**：既存のGitHubアカウントで認証され、自然言語を使用してリポジトリ、Issue、プルリクエストにアクセスできます。
3.  **エージェント機能**：複雑なタスクを計画し実行できるAIコラボレーターとして、コードの構築、編集、デバッグ、リファクタリングを支援します。
4.  **MCPによる拡張性**：このコーディングエージェントは、デフォルトでGitHubのMCPサーバーと共に提供され、カスタムMCPサーバーもサポートすることで機能の拡張性を高めています。
5.  **完全なコントロール**：実行前にすべてのアクションをプレビューできます。ユーザーの**明示的な承認**なしに何か処理が実行されることはありません。

### 🛠️ 利用開始の手順

GitHub Copilot CLIを利用するためのプラットフォーム、前提条件、およびインストール方法をご紹介します。

#### サポートされているプラットフォーム

*   Linux
*   macOS
*   Windows (試験的)

#### 前提条件

GitHub Copilot CLIを利用するには、以下の要件を満たす必要があります。

*   **アクティブなCopilotサブスクリプション**が必要です。
*   Node.js v22以上。
*   npm v10以上。
*   （Windowsの場合）PowerShell v6以上。

#### インストールと起動

1.  **インストール**：npmを使用してグローバルにインストールします。

    `terminal
    npm install -g @github/copilot
    `

2.  **起動**：以下のコマンドでGitHub Copilot CLIを起動します。

    `terminal
    copilot
    `

👇️起動しました。

![スクリーンショット 2025-09-26 175931.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e849bba6-faf4-4570-b59e-48062c8f7364.png)

初回起動時には、愛らしいアニメーションバナーが表示されます。`copilot`に`--banner`フラグを付けて起動すると、再度表示できます。

3.  **認証**：GitHubにログインしていない場合、`/login`スラッシュコマンドを使用するように求められます。画面の指示に従って認証を行ってください。

#### 利用方法のヒント

*   作業したいコードを含むフォルダ内で`copilot`を起動してください。
*   デフォルトでは、**Claude Sonnet 4**が利用されます。
*   GPT-5を利用したい場合は、環境変数を通じてサポートされています。`COPILOT_MODEL=gpt-5 copilot`（またはWindowsでは`set COPILOT_MODEL=gpt-5`を実行してから`copilot`）を実行することでGPT-5モードで起動できます。
*   注意点として、GitHub Copilot CLIにプロンプトを送信するたびに、プレミアムリクエストの月間クォータが1つ減少します。

### 👂 フィードバックと参加

GitHub Copilot CLIは現在、早期段階のプレビューであり、急速に構築が進められています。最新の機能と修正を得るために、クライアントを最新の状態に保つことが推奨されます。

あなたの洞察は非常に貴重です。フィードバックは以下のチャネルを通じて提供できます。

1.  このリポジトリでIssueを開く。
2.  Discussionsに参加する。
3.  CLIから`/feedback`を実行し、機密のフィードバック調査を提出する。

#### バグ報告や機能提案の方法

リポジトリには、ユーザーが具体的なフィードバックを提供できるように、Issueテンプレートが用意されています。

| テンプレート | 目的 | 必須情報（例） |
| :--- | :--- | :--- |
| **🐞 Bug Report** | GitHub Copilot CLIのバグまたは予期せぬ動作の報告。 | バージョン情報（`copilot --version`の出力）、再現手順、期待される動作、OSやシェルなどの追加コンテキスト。 |
| **⭐️ Feature Request** | 新しい機能または改善点の提案。 | 提案される解決策（Copilot CLIとそのユーザーにどのように利益をもたらすか）、価値を示すためのプロンプトまたはワークフローの例（3〜5個）。 |

利用規約について、本ソフトウェアの利用はGitHubの[プレリリースライセンス条項](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms)に従うものとされています。

## Helpコマンド

GitHub Copilot CLI起動後

```terminal
?

````

で表示されます。

![スクリーンショット 2025-09-26 180538.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e40af636-2149-4ea6-8f5a-0f9d0b96f405.png)

![スクリーンショット 2025-09-26 180552.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/fea4dad7-257b-488c-8ba7-050bd95c75f2.png)


```terminal
● Global shortcuts:
     @ - mention files, include contents in the current context
     Esc - cancel the current operation
     Ctrl+c - cancel operation if thinking, clear input if present, or exit
     Ctrl+d - shutdown
     Ctrl+l - clear the screen
     Ctrl+r - expand / collapse timeline

   Motion shortcuts:
     Ctrl+a - move to the beginning of the line
     Ctrl+e - move to the end of the line
     Ctrl+h - delete previous character
     Ctrl+w - delete previous word
     Ctrl+←/→ - move cursor by word

    Use ↑↓ keys to navigate command history

   Respects instructions sourced from various locations:
     `.github/instructions/**/*.instructions.md`
     `.github/copilot-instructions.md`
     `**/AGENTS.md`
     `CLAUDE.md`
     `GEMINI.md`
     `$HOME/.copilot/copilot-instructions.md`

   Available commands:
     /add-dir <directory> - Add a directory to the allowed list for file access
     /clear - Clear chat history on the screen
     /cwd [directory] - Change working directory or show current directory
     /exit - Exit the CLI
     /feedback - Provide feedback about the CLI
     /help - Show help for interactive commands
     /list-dirs - Display all allowed directories for file access
     /login - Log in to Copilot
     /logout - Log out of Copilot
     /mcp [show|add|edit|delete|disable|enable] [server-name] - Manage MCP server configuration
     /reset-allowed-tools - Reset the list of allowed tools
     /session - Show information about the current CLI session
     /theme [show|set|list] [auto|dark|light] - View or configure terminal theme
     /user [show|list|switch] - Manage GitHub user list

```

## GitHub Copilot CLI (Public Preview) 操作解説

AIを活用したコーディング支援をコマンドラインにもたらす**GitHub Copilot CLI**の対話型インターフェースで使用される主要なショートカット、設定ファイルパス、および利用可能なコマンドの一覧です。

### グローバルショートカット

    @ - ファイルを参照し、その内容を現在のコンテキストに含めます。
    Esc - 現在の操作をキャンセルします。
    Ctrl+c - AIが思考中の場合は操作をキャンセル、入力がある場合はクリア、または終了します。
    Ctrl+d - シャットダウン（CLIを終了）します。
    Ctrl+l - 画面をクリアします。
    Ctrl+r - タイムラインを展開/折りたたみます。

### 移動ショートカット

    Ctrl+a - 行の先頭に移動します。
    Ctrl+e - 行の末尾に移動します。
    Ctrl+h - 直前の文字を削除します。
    Ctrl+w - 直前の単語を削除します。
    Meta+←/→ - カーソルを単語単位で移動します。
    矢印キー↑↓キーでコマンド履歴をナビゲートします。

### さまざまな場所から読み込まれる指示ファイル

👇️これらのファイルは、Copilot CLIが応答を生成したり、複雑なタスクを計画・実行したりする際のAIエージェントの振る舞いを定義するために読み込まれます。

```
.github/instructions/**/*.instructions.md

.github/copilot-instructions.md

**/AGENTS.md

Copilot CLIはデフォルトでClaude Sonnet 4を利用するため、
このファイルはこのモデルの指示に使用されます。
CLAUDE.md

GEMINI.md

$HOME/.copilot/copilot-instructions.md

```

### 利用可能なコマンド

     /add-dir <directory> - ファイルアクセスが許可されたリストにディレクトリを追加します。
     /clear - 画面上のチャット履歴をクリアします。
     /cwd [directory] - 作業ディレクトリを変更または表示します。
     /exit - CLIを終了します。
     /feedback - CLIに関するフィードバックを提供します。
     /help - 対話型コマンドのヘルプを表示します。
     /list-dirs - ファイルアクセスが許可されたすべてのディレクトリを表示します。
     /login - Copilotにログインします。
     /logout - Copilotからログアウトします。
     /mcp [show|add|edit|delete|disable|enable] [server-name]
     /reset-allowed-tools - 許可されたツールの一覧をリセットします。
     /session - 現在のCLIセッションに関する情報を表示します。
     /theme [show|set|list] [auto|dark|light] - ターミナルのテーマを表示または設定します。
     /user [show|list|switch] - GitHubユーザーリストを管理します。


👆️Copilot CLIは、実行前にすべてのアクションをプレビューし、ユーザーの**明示的な承認**なしに何も実行しません。

GitHubにログインしていない場合、ユーザーはこのスラッシュコマンドを使用して認証するよう求められます。Copilot CLIは既存のGitHubアカウントで認証を行います。

     /feedback

👆️CLIに関するフィードバックを提供します。ユーザーはCLIからこのコマンドを実行し、**機密のフィードバック調査**を提出できます。

    /mcp [show|add|edit|delete|disable|enable] [server-name]

👆️MCPサーバー構成を管理します。このコーディングエージェントはGitHubのMCPサーバーと共に提供され、カスタムMCPサーバーもサポートすることで機能の**拡張性**を高めています。

     /user [show|list|switch]

👆️GitHubユーザーリストを管理します。Copilot CLIはGitHubワークフローに深く統合されます。