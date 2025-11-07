# masakinihirota の Qiita 記事管理リポジトリ

![Qiita Sync](https://github.com/masakinihirota/qiita_sync.article/actions/workflows/qiita_sync_check.yml/badge.svg)

## このリポジトリについて

このリポジトリは、[Qiita](https://qiita.com/)に投稿している技術記事をGitHubで管理するためのものです。約233記事を収録しており、GitHub CopilotやSupabase、Next.jsなどのモダンな開発ツールに関する記事が中心です。

**📖 詳しい説明は [REPOSITORY_EXPLANATION.md](./REPOSITORY_EXPLANATION.md) をご覧ください。**

## 記事の主なトピック

- **GitHub Copilot** - AI支援コーディングツールの活用方法
- **Supabase** - Firebase代替のバックエンドサービス
- **Next.js** - Reactフレームワーク
- **Drizzle ORM** - TypeScript用のORMライブラリ
- **TypeScript** - 型安全なJavaScript
- **VSCode** - 開発環境とツール

---

## クイックリファレンス

### Markdown記法

Qiitaのマークダウン記法は[公式チートシート](https://qiita.com/Qiita/items/c686397e4a0f4f11683d)を参照してください。

### ⚠️ 重要：Qiita Web上で編集した場合

Qiita Web上で記事を編集した後は、以下の手順でGitHubに変更を同期してください：

1. このGitHubリポジトリを開く
2. "Actions"タブをクリック
3. "Qiita Sync"を選択
4. "Run workflow"をクリック

---

## 記事の作成・編集

### ファイル名のルール

- ファイル名にスペースを入れない
- 日本語のファイル名が使える
- 推奨フォーマット：`YYYY-MM-DD_トピック_サブトピック_ID.md`

### 新規投稿テンプレート

```markdown
<!--
title:   記事タイトル
tags:    タグ1,タグ2,タグ3
private: false
-->

記事の本文をここに書きます...
```

### 記事の校正

```bash
# 記事の文法チェック
npm run lint

# 自動修正
npm run fix
```

---

## Qiita-Sync について

このリポジトリは[Qiita-Sync](https://github.com/ryokat3/qiita-sync)を使用して、GitHubとQiitaを自動同期しています。

### テンプレートとして使用する場合

このリポジトリをテンプレートとして、自分のQiita記事管理リポジトリを作成できます。

### 準備手順

1. このページの右上の"Use this template"ボタンをクリックして、新しいGitHubリポジトリを作成
2. [Qiita](https://qiita.com/)で"Personal Access Token"を生成してコピー
3. GitHubリポジトリで、Settings > Secrets > Actions > "New repository secret"を開く
4. "Name"に`QIITA_ACCESS_TOKEN`と入力し、"Value"にトークンを貼り付けて"Add secret"をクリック
5. Actions > "Qiita Sync" > "Run workflow"を実行
6. Qiita記事がGitHubリポジトリにダウンロードされます

### バッジの更新

README内のバッジを以下のように更新してください（`<Your-ID>`と`<Your-Repository>`を置き換え）：

```markdown
![Qiita Sync](https://github.com/<Your-ID>/<Your-Repository>/actions/workflows/qiita_sync_check.yml/badge.svg)
```

## 参考リンク

- [Qiita-Sync 公式リポジトリ（English）](https://github.com/ryokat3/qiita-sync)
- [GitHub連携でQiita記事を素敵な執筆環境で！（Japanese）](https://qiita.com/ryokat3/items/d054b95f68810f70b136)
- [このリポジトリの詳細説明](./REPOSITORY_EXPLANATION.md)

