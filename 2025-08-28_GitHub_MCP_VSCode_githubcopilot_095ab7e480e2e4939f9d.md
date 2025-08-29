<!--
title:   VSCode MCP 上限128個問題 犯人はお前だGitHub（91個）！ 生成AI
tags:    GitHub,MCP,VSCode,githubcopilot
id:      095ab7e480e2e4939f9d
private: false
-->
さて2025年8月の月末ですGitHub Copilotをつかっていてもまだポイントが余りまくっているので贅沢に Sonnet4で聞いてみることにします。

![スクリーンショット 2025-08-29 073307.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/546aed6b-4ef0-48dd-a8b4-eb0fe1123c00.png)

👆️呼び出し方は、右下のAIモデル選択の右側にあるレンチアイコンをクリックします。
これだけみても、GitHubを含めるだけで、上限の128個になることがわかります。

![スクリーンショット 2025-08-29 072346.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/f32a3e54-49ae-4176-80e2-43ecbcc81eac.png)

👆️GitHub MCPのtoolsは91個あります。

![スクリーンショット 2025-08-29 072255.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/d5e6fe4c-8017-40af-bca7-c32b23562e64.png)

👆️上限変更は、現在開発中のようです。

問題解決のためにGitHub Copilot Claude Sonnet 4の力を借ります。

## GitHub Copilot Claude Sonnet 4 への指示書1

```
VScodeでMCPのtoolsを使える上限は128個です。

私はMCPをgithubはもちろんgit、Figma等を使っています。

そのうちGitHubは91個を占めています。
そうです窮屈な犯人はGitHubが原因なのです。

そこでGitHubで個人で使うツール、組織で使うツール、不要なツールの3段階に分けてみることにしました。
そうすれば多少は圧縮問題が解決されると思います。

それでは表で使えるもの使えないものを分けてください。

```


## GitHub Copilot Claude Sonnet 4の返信

VScodeのMCP tools制限に対する解決策として、GitHubのツールを3段階に分類しますね。現在のプロジェクトから判断すると、Next.jsベースの個人プロジェクトのようですので、以下のように分類します：

## GitHub MCP Tools 分類表

| ツール名 | 個人開発 | 組織開発 | 不要/低優先度 | 説明 |
|---------|---------|---------|-------------|------|
| **Repository管理** |  |  |  |  |
| create-repository | ⭐ | ⭐ |  | 新規リポジトリ作成 |
| get-repository | ⭐ | ⭐ |  | リポジトリ情報取得 |
| fork-repository | ⭐ | ⭐ |  | フォーク作成 |
| list-repositories | ⭐ | ⭐ |  | リポジトリ一覧 |
| **ファイル操作** |  |  |  |  |
| get-file-contents | ⭐ | ⭐ |  | ファイル内容取得 |
| create-or-update-file | ⭐ | ⭐ |  | ファイル作成/更新 |
| search-code | ⭐ | ⭐ |  | コード検索 |
| **Issue/PR管理** |  |  |  |  |
| create-issue | ⭐ | ⭐ |  | Issue作成 |
| list-issues | ⭐ | ⭐ |  | Issue一覧 |
| create-pull-request | ⭐ | ⭐ |  | PR作成 |
| list-pull-requests | ⭐ | ⭐ |  | PR一覧 |
| **Branch操作** |  |  |  |  |
| create-branch | ⭐ | ⭐ |  | ブランチ作成 |
| list-branches | ⭐ | ⭐ |  | ブランチ一覧 |
| **組織専用機能** |  |  |  |  |
| manage-teams |  | ⭐ |  | チーム管理 |
| organization-settings |  | ⭐ |  | 組織設定 |
| manage-permissions |  | ⭐ |  | 権限管理 |
| **低優先度/不要** |  |  |  |  |
| get-repository-stats |  |  | ❌ | 統計情報（基本不要） |
| manage-webhooks |  |  | ❌ | Webhook管理 |
| manage-deploy-keys |  |  | ❌ | デプロイキー管理 |
| repository-security |  |  | ❌ | セキュリティ設定 |
| manage-releases |  |  | ❌ | リリース管理（手動で十分） |

## 推奨設定

**個人開発時（約15-20個のツール）：**
- Repository基本操作
- ファイル操作
- Issue/PR基本機能
- Branch操作

**組織開発時（追加で10-15個）：**
- チーム管理機能
- 権限管理
- 組織設定

これにより、91個から30-35個程度まで削減でき、git（約10個）とFigma（約10-15個）と合わせても制限内に収まるはずです。

現在のNext.jsプロジェクトでは個人開発設定がおすすめです。




## GitHub Copilot Claude Sonnet 4 への指示書2

私が今 使用しているMCPリスト

```vscode
Ctrl + Shift + p
MCP ユーザー構成を開く
```

mcp.jsonを開いてから👇️指示を出します。

```
設定しているMCPのリストを出して

```

返信

現在開いているMCP設定ファイルの内容を確認します。

## 現在設定されているMCPサーバーリスト

以下が設定されているMCPサーバーです：

| サーバー名 | 種類 | 説明 | 推定ツール数 |
|-----------|------|------|------------|
| **vscode** | npx | VSCode操作・デバッグ・実行 | 10-15個 |
| **mcp-installer** | npx | MCP インストーラー | 5個 |
| **shadcn-ui** | npx | shadcn/ui コンポーネント管理 | 10個 |
| **serena** | uvx | IDE アシスタント | 20-30個 |
| **github** | HTTP | GitHub 操作（ギャラリー版） | 91個 |
| **Sentry** | HTTP | エラー監視・分析 | 15-20個 |
| **Framelink Figma MCP** | stdio | Figma デザイン操作 | 10-15個 |
| **Postgres(LOCAL-supabase)** | stdio | PostgreSQL データベース操作 | 5個 |
| **context7** | stdio | ライブラリドキュメント検索 | 5個 |
| **git** | uvx | Git バージョン管理 | 10個 |
| **playwright** | npx | ブラウザテスト自動化 | 15-20個 |
| **sequentialthinking** | stdio | 思考プロセス支援 | 3個 |
| **markitdown** | uvx | マークダウン変換 | 3個 |

## 合計推定ツール数：約200個

これが128個制限を大幅に超えている原因ですね。特に問題となるのは：
- **GitHub**: 91個（最大の原因）
- **Playwright**: 24個
- **Serena**: 19個
- **Sentry**: 19個
その他多数

## 解決策の提案

1. **GitHub MCPを軽量版に変更**（91個→20個程度）
2. **使用頻度の低いサーバーを無効化**
3. **必要に応じて動的に有効/無効を切り替え**

以上ですほぼAIの記事でした。