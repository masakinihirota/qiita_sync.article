<!--
title:   VSCode MCP 上限128個問題 犯人はお前だGitHub（91個）！ 生成AI
tags:    GitHub,GitHubCopilot,MCP,VSCode
id:      095ab7e480e2e4939f9d
private: false
-->
追加 2025年8月31日

現状のtools 128個

```*****.chatmode.md
---
description: '＊＊＊＊＊'
tools: ['extensions', 'codebase', 'usages', 'vscodeAPI', 'think', 'problems', 'changes', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'openSimpleBrowser', 'fetch', 'findTestFiles', 'searchResults', 'githubRepo', 'todos', 'runTests', 'runCommands', 'editFiles', 'runNotebooks', 'search', 'new', 'runTasks', 'add_issue_comment', 'cancel_workflow_run', 'create_branch', 'create_issue', 'create_or_update_file', 'create_pull_request', 'create_pull_request_with_copilot', 'create_repository', 'delete_file', 'get_dependabot_alert', 'get_file_contents', 'get_issue', 'get_pull_request', 'get_pull_request_diff', 'get_pull_request_files', 'get_workflow_run', 'list_branches', 'list_dependabot_alerts', 'list_issues', 'list_notifications', 'list_workflow_runs', 'list_workflows', 'mark_all_notifications_read', 'merge_pull_request', 'push_files', 'search_code', 'update_issue', 'sequentialthinking', 'Postgres(LOCAL-supabase)', 'shadcn-ui', 'context7', 'vscode', 'Framelink Figma MCP', 'playwright', 'git', 'serena']
---

(GitHub Copilotへの指示)

```

追加終了


AIの答えをそのまま貼り付けて、自分で選択しようとした所表が間違っていることが判明したので、
スクリーンショットを取って、それから解析して調べ直しました。

## MCPサーバー:GitHub Tools 91個の機能一覧

```
- `add_comment_to_pending_review`: 保留中レビューにコメントを追加
- `add_issue_comment`: 特定のissueにコメントを追加
- `add_sub_issue`: 親issueにサブissueを追加
- `assign_copilot_to_issue`: 特定のissueにCopilotをアサイン
- `cancel_workflow_run`: ワークフロー実行をキャンセル
- `create_and_submit_pull_request_review`: プルリクエストのレビューを作成・提出
- `create_branch`: 新しいブランチを作成
- `create_gist`: 新しいgistを作成
- `create_issue`: GitHubリポジトリに新しいissueを作成
- `create_or_update_file`: GitHubリポジトリ内の単一ファイルを作成または更新
- `create_pending_pull_request_review`: プルリクエストの保留中レビューを作成
- `create_pull_request_with_copilot`: GitHub Copilot AIエージェントにタスクを委任してプルリクエストを作成
- `create_pull_request`: 新しいプルリクエストを作成
- `create_repository`: 新しいGitHubリポジトリをアカウント内に作成
- `delete_file`: GitHubリポジトリからファイルを削除
- `delete_pending_pull_request_review`: 保留中レビューを削除
- `delete_workflow_run_logs`: ワークフロー実行のログを削除
- `dismiss_notification`: 通知を既読またはアーカイブに変更
- `download_workflow_run_artifact`: ワークフローアーティファクトのダウンロードURLを取得
- `fork_repository`: GitHubリポジトリを自分のアカウントや指定した組織にフォーク
- `get_code_scanning_alert`: 特定のコードスキャニングアラートの詳細を取得
- `get_commit`: 特定のコミットの詳細を取得
- `get_dependabot_alert`: 特定のDependabotアラートの詳細を取得
- `get_discussion_comments`: ディスカッションのコメントを取得
- `get_discussion`: 特定のディスカッションの詳細を取得
- `get_file_contents`: GitHubリポジトリからファイルまたはディレクトリの内容を取得
- `get_global_security_advisory`: グローバルセキュリティアドバイザリの詳細を取得
- `get_issue_comments`: 特定のissueのコメントを取得
- `get_issue`: 特定のissueの詳細情報を取得
- `get_job_logs`: 特定のワークフロージョブのログをダウンロード
- `get_latest_release`: 最新のリリース情報を取得
- `get_me`: 認証済みGitHubユーザーの詳細を取得
- `get_notification_details`: 特定の通知の詳細情報を取得
- `get_pull_request_comments`: プルリクエストのコメントを取得
- `get_pull_request_diff`: プルリクエストの差分を取得
- `get_pull_request_files`: プルリクエストで変更されたファイルを取得
- `get_pull_request_reviews`: プルリクエストのレビュー一覧を取得
- `get_pull_request_status`: プルリクエストのステータスを取得
- `get_pull_request`: 特定のプルリクエストの詳細を取得
- `get_release_by_tag`: タグ名による特定リリースの取得
- `get_secret_scanning_alert`: 特定のシークレットスキャニングアラートの詳細を取得
- `get_tag`: 特定のgitタグの詳細を取得
- `get_teams`: ユーザーが所属するチームの詳細を取得
- `get_team_members`: 特定チームのメンバーユーザー名を取得
- `get_workflow_run_logs`: ワークフロー実行のログをダウンロード
- `get_workflow_run_usage`: ワークフロー実行の使用メトリクスを取得
- `get_workflow_run`: 特定のワークフロー実行の詳細を取得
- `list_branches`: リポジトリ内のブランチ一覧を取得
- `list_code_scanning_alerts`: コードスキャニングアラート一覧を取得
- `list_commits`: ブランチ内のコミット一覧を取得
- `list_dependabot_alerts`: Dependabotアラート一覧を取得
- `list_discussions`: リポジトリや組織のディスカッション一覧を取得
- `list_discussion_categories`: ディスカッションカテゴリ一覧を取得
- `list_gists`: ユーザーのgist一覧を取得
- `list_global_security_advisories`: グローバルセキュリティアドバイザリ一覧を取得
- `list_issues`: リポジトリ内のissue一覧を取得
- `list_issue_types`: リポジトリオーナー（組織）がサポートするissueタイプ一覧を取得
- `list_notifications`: 認証済みユーザーの通知一覧を取得
- `list_org_repository_security_advisories`: 組織のリポジトリセキュリティアドバイザリ一覧を取得
- `list_pull_requests`: リポジトリ内のプルリクエスト一覧を取得
- `list_releases`: リポジトリ内のリリース一覧を取得
- `list_repository_security_advisories`: リポジトリのセキュリティアドバイザリ一覧を取得
- `list_secret_scanning_alerts`: シークレットスキャニングアラート一覧を取得
- `list_sub_issues`: 特定のissueのサブissue一覧を取得
- `list_tags`: リポジトリ内のgitタグ一覧を取得
- `list_workflows`: リポジトリ内のワークフロー一覧を取得
- `list_workflow_jobs`: ワークフロー実行のジョブ一覧を取得
- `list_workflow_runs`: 特定のワークフローの実行履歴を取得
- `list_workflow_run_artifacts`: ワークフロー実行のアーティファクト一覧を取得
- `manage_notification_subscription`: 通知サブスクリプションの管理
- `manage_repository_notification_subscription`: リポジトリ通知サブスクリプションの管理
- `mark_all_notifications_read`: すべての通知を既読に変更
- `merge_pull_request`: プルリクエストをマージ
- `push_files`: 単一コミットで複数のファイルをGitHubリポジトリにプッシュ
- `remove_sub_issue`: 親issueからサブissueを削除
- `reprioritize_sub_issue`: サブissueの優先順位を変更
- `request_copilot_review`: GitHub Copilotによるコードレビューを要求
- `rerun_failed_jobs`: 失敗したジョブのみを再実行
- `rerun_workflow_run`: ワークフロー実行を再実行
- `run_workflow`: Actions ワークフローを実行
- `search_code`: 全GitHubリポジトリでの高精度コード検索
- `search_issues`: Issues検索
- `search_orgs`: 組織検索
- `search_pull_requests`: プルリクエスト検索
- `search_repositories`: リポジトリの検索
- `search_users`: ユーザー検索
- `submit_pending_pull_request_review`: 保留中レビューを提出
- `update_gist`: 既存のgistを更新
- `update_issue`: 既存のissueを更新
- `update_pull_request_branch`: プルリクエストのブランチを最新の変更で更新
- `update_pull_request`: 既存のプルリクエストを更新


```


# 個人開発 厳選版 GitHub Tools

個人開発で使用するGitHub Toolsを、**このプロジェクト（VNS Web アプリケーション開発）に必要な機能に絞って** 厳選します。

| 分類 | ツール名 | 説明 | 必要度 |
|------|----------|------|--------|
| **リポジトリ管理** | `create_repository` | 新しいGitHubリポジトリを作成 | ⭐⭐⭐ |
| **ファイル操作** | `create_or_update_file` | リポジトリ内のファイルを作成または更新 | ⭐⭐⭐ |
| | `get_file_contents` | ファイルまたはディレクトリの内容を取得 | ⭐⭐⭐ |
| | `push_files` | 複数ファイルを単一コミットでプッシュ | ⭐⭐⭐ |
| **ブランチ操作** | `create_branch` | 新しいブランチを作成 | ⭐⭐⭐ |
| | `list_branches` | ブランチ一覧を取得 | ⭐⭐ |
| **Issue管理** | `create_issue` | 新しいissueを作成 | ⭐⭐⭐ |
| | `get_issue` | 特定のissueの詳細情報を取得 | ⭐⭐⭐ |
| | `list_issues` | リポジトリ内のissue一覧を取得 | ⭐⭐⭐ |
| | `update_issue` | 既存のissueを更新 | ⭐⭐ |
| | `add_issue_comment` | issueにコメントを追加 | ⭐⭐ |
| **プルリクエスト** | `create_pull_request` | 新しいプルリクエストを作成 | ⭐⭐⭐ |
| | `get_pull_request` | プルリクエストの詳細を取得 | ⭐⭐⭐ |
| | `merge_pull_request` | プルリクエストをマージ | ⭐⭐⭐ |
| | `get_pull_request_diff` | プルリクエストの差分を取得 | ⭐⭐ |
| | `get_pull_request_files` | 変更されたファイルを取得 | ⭐⭐ |
| **GitHub Actions** | `list_workflows` | ワークフロー一覧を取得 | ⭐⭐⭐ |
| | `run_workflow` | Actionsワークフローを実行 | ⭐⭐ |
| | `list_workflow_runs` | ワークフローの実行履歴を取得 | ⭐⭐ |
| | `get_workflow_run` | ワークフロー実行の詳細を取得 | ⭐⭐ |
| | `cancel_workflow_run` | ワークフロー実行をキャンセル | ⭐ |
| **セキュリティ** | `list_dependabot_alerts` | Dependabotアラート一覧を取得 | ⭐⭐ |
| | `get_dependabot_alert` | Dependabotアラートの詳細を取得 | ⭐⭐ |
| **検索** | `search_code` | 全GitHubでのコード検索 | ⭐⭐ |
| **通知管理** | `list_notifications` | 通知一覧を取得 | ⭐ |
| | `mark_all_notifications_read` | すべての通知を既読に変更 | ⭐ |

## プロジェクト特化の推奨ワークフロー

### 1. 開発フェーズ別の使い分け

**Phase 1-2（要件定義・設計）**
- `create_issue`：要件やタスクをIssueとして管理
- `get_file_contents`：設計書リポジトリの参照

**Phase 3（タスクリスト作成・実装準備）**
- `create_branch`：機能ブランチ作成
- `create_or_update_file`：プロンプトファイル作成

**Phase 4（実装）**
- `push_files`：複数ファイルの一括コミット
- `create_pull_request`：機能完成時のPR作成
- `merge_pull_request`：レビュー後のマージ

### 2. 継続的な品質管理
- `list_workflows`：CI/CDパイプラインの監視
- `list_dependabot_alerts`：セキュリティアップデートの確認
- `search_code`：実装パターンの調査



# 機能で分ける


GitHub MCP サーバーで利用可能な機能の一覧をまとめました。以下のような機能が提供されています：

## リポジトリ管理

### 作成・削除系
- `create_repository`: 新しいGitHubリポジトリをアカウント内に作成
- `delete_file`: GitHubリポジトリからファイルを削除
- `fork_repository`: GitHubリポジトリを自分のアカウントや指定した組織にフォーク

### ファイル操作系
- `get_file_contents`: GitHubリポジトリからファイルまたはディレクトリの内容を取得
- `create_or_update_file`: GitHubリポジトリ内の単一ファイルを作成または更新
- `push_files`: 単一コミットで複数のファイルをGitHubリポジトリにプッシュ

## Issues・Pull Requests管理

### Issues関連
- `create_issue`: GitHubリポジトリに新しいissueを作成
- `get_issue`: 特定のissueの詳細情報を取得
- `update_issue`: 既存のissueを更新
- `list_issues`: リポジトリ内のissue一覧を取得
- `add_issue_comment`: 特定のissueにコメントを追加
- `get_issue_comments`: 特定のissueのコメントを取得

### Sub-Issues関連
- `add_sub_issue`: 親issueにサブissueを追加
- `list_sub_issues`: 特定のissueのサブissue一覧を取得
- `remove_sub_issue`: 親issueからサブissueを削除
- `reprioritize_sub_issue`: サブissueの優先順位を変更

### Pull Requests関連
- `create_pull_request`: 新しいプルリクエストを作成
- `get_pull_request`: 特定のプルリクエストの詳細を取得
- `update_pull_request`: 既存のプルリクエストを更新
- `list_pull_requests`: リポジトリ内のプルリクエスト一覧を取得
- `merge_pull_request`: プルリクエストをマージ
- `get_pull_request_diff`: プルリクエストの差分を取得
- `get_pull_request_files`: プルリクエストで変更されたファイルを取得
- `get_pull_request_comments`: プルリクエストのコメントを取得
- `get_pull_request_status`: プルリクエストのステータスを取得
- `update_pull_request_branch`: プルリクエストのブランチを最新の変更で更新

## レビュー機能

### レビュー作成・管理
- `create_and_submit_pull_request_review`: プルリクエストのレビューを作成・提出
- `create_pending_pull_request_review`: プルリクエストの保留中レビューを作成
- `add_comment_to_pending_review`: 保留中レビューにコメントを追加
- `submit_pending_pull_request_review`: 保留中レビューを提出
- `delete_pending_pull_request_review`: 保留中レビューを削除
- `get_pull_request_reviews`: プルリクエストのレビュー一覧を取得
- `request_copilot_review`: GitHub Copilotによるコードレビューを要求

## GitHub Actions・ワークフロー

### ワークフロー管理
- `list_workflows`: リポジトリ内のワークフロー一覧を取得
- `run_workflow`: Actions ワークフローを実行
- `list_workflow_runs`: 特定のワークフローの実行履歴を取得
- `get_workflow_run`: 特定のワークフロー実行の詳細を取得
- `cancel_workflow_run`: ワークフロー実行をキャンセル
- `rerun_workflow_run`: ワークフロー実行を再実行
- `rerun_failed_jobs`: 失敗したジョブのみを再実行

### ジョブ・アーティファクト管理
- `list_workflow_jobs`: ワークフロー実行のジョブ一覧を取得
- `get_job_logs`: 特定のワークフロージョブのログをダウンロード
- `list_workflow_run_artifacts`: ワークフロー実行のアーティファクト一覧を取得
- `download_workflow_run_artifact`: ワークフローアーティファクトのダウンロードURLを取得
- `delete_workflow_run_logs`: ワークフロー実行のログを削除
- `get_workflow_run_usage`: ワークフロー実行の使用メトリクスを取得
- `get_workflow_run_logs`: ワークフロー実行のログをダウンロード

## セキュリティ・アラート

### セキュリティアラート
- `list_code_scanning_alerts`: コードスキャニングアラート一覧を取得
- `get_code_scanning_alert`: 特定のコードスキャニングアラートの詳細を取得
- `list_secret_scanning_alerts`: シークレットスキャニングアラート一覧を取得
- `get_secret_scanning_alert`: 特定のシークレットスキャニングアラートの詳細を取得
- `list_dependabot_alerts`: Dependabotアラート一覧を取得
- `get_dependabot_alert`: 特定のDependabotアラートの詳細を取得
- `list_global_security_advisories`: グローバルセキュリティアドバイザリ一覧を取得
- `get_global_security_advisory`: グローバルセキュリティアドバイザリの詳細を取得
- `list_repository_security_advisories`: リポジトリのセキュリティアドバイザリ一覧を取得
- `list_org_repository_security_advisories`: 組織のリポジトリセキュリティアドバイザリ一覧を取得

## その他の機能

### ブランチ・タグ管理
- `create_branch`: 新しいブランチを作成
- `list_branches`: リポジトリ内のブランチ一覧を取得
- `list_tags`: リポジトリ内のgitタグ一覧を取得
- `get_tag`: 特定のgitタグの詳細を取得
- `list_commits`: ブランチ内のコミット一覧を取得
- `get_commit`: 特定のコミットの詳細を取得

### リリース管理
- `list_releases`: リポジトリ内のリリース一覧を取得
- `get_latest_release`: 最新のリリース情報を取得
- `get_release_by_tag`: タグ名による特定リリースの取得

### Gist管理
- `create_gist`: 新しいgistを作成
- `list_gists`: ユーザーのgist一覧を取得
- `update_gist`: 既存のgistを更新

### Discussions・通知
- `list_discussions`: リポジトリや組織のディスカッション一覧を取得
- `get_discussion`: 特定のディスカッションの詳細を取得
- `get_discussion_comments`: ディスカッションのコメントを取得
- `list_discussion_categories`: ディスカッションカテゴリ一覧を取得
- `list_notifications`: 認証済みユーザーの通知一覧を取得
- `get_notification_details`: 特定の通知の詳細情報を取得
- `dismiss_notification`: 通知を既読またはアーカイブに変更
- `mark_all_notifications_read`: すべての通知を既読に変更

### ユーザー・組織・検索
- `get_me`: 認証済みGitHubユーザーの詳細を取得
- `search_repositories`: リポジトリの検索
- `search_code`: 全GitHubリポジトリでの高精度コード検索
- `search_issues`: Issues検索
- `search_pull_requests`: プルリクエスト検索
- `search_users`: ユーザー検索
- `search_orgs`: 組織検索
- `get_teams`: ユーザーが所属するチームの詳細を取得
- `get_team_members`: 特定チームのメンバーユーザー名を取得

### 通知・サブスクリプション管理
- `manage_notification_subscription`: 通知サブスクリプションの管理
- `manage_repository_notification_subscription`: リポジトリ通知サブスクリプションの管理

### Copilot統合
- `assign_copilot_to_issue`: 特定のissueにCopilotをアサイン
- `create_pull_request_with_copilot`: GitHub Copilot AIエージェントにタスクを委任してプルリクエストを作成

### issue_types関連
- `list_issue_types`: リポジトリオーナー（組織）がサポートするissueタイプ一覧を取得

これらの機能により、GitHub上での開発ワークフロー全体を効率的に管理・自動化することが可能です。

## Tips とアドバイス

GitHub MCPを効果的に活用するために：

1. **ワークフロー自動化**: `run_workflow` や `create_pull_request_with_copilot` を活用して、定期的なタスクを自動化できます
2. **セキュリティ管理**: セキュリティアラート関連の機能を定期的にチェックして、プロジェクトの安全性を保ちましょう
3. **レビュープロセスの効率化**: Copilotによるコードレビュー機能を活用して、コードの品質向上と開発速度の両立が可能です
4. **通知管理**: 通知関連の機能を使って、重要な情報を見逃さないようにしつつ、ノイズを減らすことができます








---

# ここより下は間違っている記事

AI出力が間違っていました、
~~めんどう・・~~
スクリーンショットなど残しておきたい部分もあるので残しておきます。

MCP の github には
 get-repository
などはありませんでした。

--- old

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