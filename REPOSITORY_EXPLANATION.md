# qiita_sync.article リポジトリの説明

## 概要

このリポジトリは、**Qiita**（日本の技術ブログプラットフォーム）の記事とGitHubリポジトリを同期するためのものです。`qiita-sync`ツールを使用して、マークダウン形式の記事をGitHubで管理し、Qiitaに自動的に公開・更新することができます。

## リポジトリの目的

1. **記事のバージョン管理**: Qiita記事をGitで管理することで、変更履歴を追跡できます
2. **ローカル執筆環境**: 好きなエディタ（VSCodeなど）で記事を書けます
3. **自動同期**: GitHub Actionsを使って、pushすると自動的にQiitaに反映されます
4. **バックアップ**: GitHubに記事のバックアップが保存されます

## リポジトリ構造

```
qiita_sync.article/
├── .github/
│   └── workflows/
│       ├── qiita_sync.yml          # Qiita同期ワークフロー（push時に実行）
│       └── qiita_sync_check.yml    # Qiita同期チェック
├── GitHub_Copilot/                 # GitHub Copilot関連の記事（16記事）
├── 2025/                           # 2025年の記事（15記事以上）
├── Drizzle/                        # Drizzle ORM関連の記事
├── private_true/                   # 非公開記事用ディレクトリ
├── vns_masakinihirota/            # 個人プロジェクト関連
├── supabase/                       # Supabase関連の記事
├── _posts/                         # その他の記事
├── .textlintrc.json               # textlintの設定ファイル
├── package.json                    # Node.js依存関係
└── README.md                       # リポジトリのREADME
```

## 記事の統計

- **総記事数**: 約233記事（マークダウンファイル）
- **主なトピック**:
  - GitHub Copilot（16記事）
  - Drizzle ORM
  - Supabase
  - Next.js
  - TypeScript
  - その他の開発ツール・技術

## Qiita Syncの仕組み

### 自動同期フロー

1. ローカルでマークダウンファイル（.md）を作成・編集
2. GitHubにpush
3. GitHub Actionsが自動実行
4. `qiita-sync`が記事を処理
5. Qiitaに記事が公開・更新される

### 記事フォーマット

各記事は以下の形式で記述されます：

```markdown
<!--
title:   記事のタイトル
tags:    タグ1,タグ2,タグ3
id:      Qiita記事ID（自動生成）
private: false
-->

記事の本文をここに書きます...
```

## 使用技術

### Python
- **qiita-sync**: Qiita APIとの同期を行うPythonパッケージ

### Node.js
- **textlint**: 日本語の校正ツール
- **textlint-rule-no-doubled-joshi**: 二重助詞チェックルール

### GitHub Actions
- push時に自動的に`qiita-sync sync .`を実行
- 変更があれば自動コミット・プッシュ

## ワークフロー

### 新規記事の投稿

1. テンプレートを使用して新しい.mdファイルを作成：
```markdown
<!--
title:   記事タイトル
tags:    タグ1,タグ2
private: false
-->

記事本文
```

2. 適切なディレクトリに配置（例：GitHub_Copilot/、2025/など）
3. `git add`、`git commit`、`git push`
4. GitHub Actionsが自動的にQiitaに公開

### 既存記事の更新

1. ローカルで.mdファイルを編集
2. `git commit`、`git push`
3. GitHub Actionsが自動的にQiitaを更新

### Qiita Web上で編集した場合

**重要**: Qiita Web上で記事を編集した場合は、以下の手順でGitHubに同期する必要があります：

1. GitHubリポジトリを開く
2. "Actions"タブをクリック
3. "Qiita Sync"を選択
4. "Run workflow"をクリック

これにより、Qiita上の変更がGitHubにダウンロードされます。

## 記事の校正

### textlintの使用

```bash
# 記事をチェック
npm run lint

# 自動修正
npm run fix
```

現在の設定では、**二重助詞**（同じ助詞の連続使用）をチェックしています。

## ファイル命名規則

- ファイル名にスペースを入れない
- 日本語のファイル名が使用可能
- 推奨フォーマット: `YYYY-MM-DD_トピック_サブトピック_ID.md`

例：
- `2025-03-27_githubcopilot_githubcopilotchat_0e58a6b921e4420a2882.md`
- `2025-01-05_Drizzle_Hono_Next.js_RLS_Supabase_dd8cc43e6855815a99ab.md`

## セットアップ（新規リポジトリの場合）

このリポジトリをテンプレートとして使用する場合：

1. "Use this template"ボタンをクリック
2. Qiitaで"Personal Access Token"を生成
3. GitHubリポジトリの Settings > Secrets > Actions で`QIITA_ACCESS_TOKEN`を設定
4. Actions > Qiita Sync > Run workflowを実行
5. Qiita記事がダウンロードされる

## メリット

1. **バージョン管理**: Gitで記事の変更履歴を管理
2. **オフライン執筆**: インターネット接続なしで記事を書ける
3. **好きなエディタ**: VSCode、Vim、Emacsなど、好きなエディタで執筆
4. **自動同期**: pushするだけでQiitaに反映
5. **バックアップ**: GitHubに自動バックアップ
6. **校正ツール**: textlintで日本語をチェック
7. **検索性**: Gitの検索機能で過去の記事を簡単に検索

## 注意事項

- Qiita Access Tokenは機密情報です。絶対に公開しないでください
- `private: true`を設定すると非公開記事になります
- ファイル名は変更可能ですが、記事IDは変更しないでください

## 参考リンク

- [qiita-sync公式リポジトリ](https://github.com/ryokat3/qiita-sync)
- [GitHub連携でQiita記事を素敵な執筆環境で！](https://qiita.com/ryokat3/items/d054b95f68810f70b136)
- [Qiita Markdown記法チートシート](https://qiita.com/Qiita/items/c686397e4a0f4f11683d)

## まとめ

このリポジトリは、masakinihirota氏の技術ブログ記事（約233記事）を管理するための個人的な執筆環境です。GitHub CopilotやSupabase、Next.jsなどのモダンな開発ツールに関する記事が多数収録されており、Qiita Syncを使用してGitHubとQiitaを自動同期することで、効率的な記事管理と公開を実現しています。
