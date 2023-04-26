
![Qiita Sync](https://github.com/masakinihirota/qiita_sync.article/actions/workflows/qiita_sync_check.yml/badge.svg)

Markdown記法 チートシート - Qiita
https://qiita.com/Qiita/items/c686397e4a0f4f11683d

※重要メモ
Web での Qiita 上で編集した時は下記手順を実行する。

- 自分の記事が保存してある `GitHub repository` を開く
- 画面上側にあるタブの"Actions"から"Qiita Sync" を開く
- "Run workflow" をクリックするを実行する。

---

# 新規に投稿するときのテンプレート

```ファイル名.md
<!--
title:   ＜タイトル＞
tags:    ＜タグ＞
private: false
-->

＜記事本文＞


```

# Qiita-Sync Template

Template repository to synchronize markdown files with [Qiita](https://qiita.com/) site.

Create your own repository based on this template and push your markdown files, then those files are automatically published in Qiita site.

## Preparation

1. Click "Use this template" button at top-right corner of this page, and create your GitHub repository.
2. Generate "Qiita Access Token" of at your Qiita site, and copy the generated Qiita Access Token.
3. Open "Settings" >> "Secrets" >> "Actions" >> "New repository secret" at your GitHub repository.
4. Input `QIITA_ACCESS_TOKEN` to "Name", and paste the generated Qiita Access Token to "Value", and click "Add secret"
5. Open "Actions" >> "Qiita Sync" >> "Run workflow" pulldown menu, and click "Run workflow" button
6. Your Qiita articles will be downloaded to your GitHub repository.
7. Rewrite this README for your own with the badge below (Replace `<Your-ID>` and `<Your-Repository>`)

```
![Qiita Sync](https://github.com/<Your-ID>/<Your-Repository>/actions/workflows/qiita_sync_check.yml/badge.svg)
```

## 準備

1. このページの右上にある "Use this template" ボタンをクリックして、GitHub リポジトリを作成します。
2. Qiita サイトで "Qiita Access Token" を作成し、生成された token をコピーします。
3. GitHub リポジトリで、"Settings" >> "Secrets" >> "Actions" >> "New repository secret" を開きます。
4. "Name" に `QIITA_ACCESS_TOKEN` と入力し、"Value" には生成された Qiita Access Token を貼り付けます。そして "Add secret" をクリックします。
5. "Actions" >> "Qiita Sync" >> "Run workflow" のプルダウンメニューを開き、"Run workflow" ボタンをクリックします。
6. GitHub リポジトリに Qiita 記事がダウンロードされます。
7. README を書き換え、以下のバッジを挿入します(`<Your-ID>` と `<Your-Repository>` は置き換えてください)

```
![Qiita Sync](https://github.com/<Your-ID>/<Your-Repository>/actions/workflows/qiita_sync_check.yml/badge.svg)
```

Find more details in:

- English: [Qiita-Sync README](https://github.com/ryokat3/qiita-sync)
- Japanese: [GitHub 連携で Qiita 記事を素敵な執筆環境で！](https://qiita.com/ryokat3/items/d054b95f68810f70b136)


## Qiita-Sync Template
