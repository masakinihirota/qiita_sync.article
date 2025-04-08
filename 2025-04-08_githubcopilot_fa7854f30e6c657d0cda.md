<!--
title:   第三版 VSCode の Rules for AI 全体のルール設定
tags:    githubcopilot
id:      fa7854f30e6c657d0cda
private: false
-->
注意:
この記事はGitHub Copilotの指示書の自分なりの使い方です。

AI開発が最盛期の今、一人開発者でも中型のWebアプリを開発できるようになりました。
その時にどのように開発体制を整えたらいいかと考えてみました。

小型なら設計書もいらないかもしれません。
大型なら複数人がそれぞれを担当しているかも知れません。

**これは、中型のWebアプリを一人で開発する場合のVSCodeワークスペースになります。**



# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

https://qiita.com/masakinihirota/items/fa7854f30e6c657d0cda

Gitリポジトリを
第一版は1種類 指示書を1枚すべてに集約する
第二版は3種類 指示書をVSCode固定と プロジェクト単位での静的、動的 の3つに分ける
第三版は5種類 ワークスペースを利用して複数のリポジトリを活用します。

**GitHub Copilotはワークスペースの範囲内を見ているという情報からこの構造を採用してみました。**

# 5つのリポジトリ

ワークスペースにそれぞれの情報を集約する
1. 設計書
2. Webアプリ
3. 指示書(GitHub Copilotへの指示)
4. タスクリスト
5. ドキュメント
の5つ

## リポジトリの命名

最初にVSCodeのワークスペースを作ります。

1. [アプリ名]
2. [アプリ名]-custom-instructions
3. [アプリ名]-design
4. [アプリ名]-design-task-list
5. [アプリ名]-doc

👆この5つのフォルダを作って
VSCodeのワークスペースに登録します。


## 1. [アプリ名]

アプリのコード
Next.js
Hono
Supabase
Drizzle
などをインストールしています。

## 2. [アプリ名]-custom-instructions

GitHub Copilotの指示書を書いているリポジトリです。

* `settings.json`

VSCodeの固定のルール
※ワークスペースの[アプリ名].code-workspaceにも書けます。

* `.github\copilot-instructions.md`
プロジェクト全体のルール

* `.github\*****-instructions.md`
 個別のルール

* `.github/prompts/*****.prompt.md`

GitHub Copilot プロンプト用ルール
タスクの指示書であり、実装書になります。

タスクリストから設計を持ってきてタスクごとに作り、
タスクの指示書をステップに分解して段階ごとに実装をしていきます。

フォルダ内の個別のタスク指示書
 (`[YYYYMMDD]-[タスクid]-[タスク名]-[タスクの種類].prompt.md`) -

タスクのイメージとして、Webアプリの1機能もしくは、1ページに相当すると考えています。
そして1タスクを複数のステップに分けて、一つづつ実装していきます。

* メモリーバンク: `_memory-bank/_memory-bank-instructions.md` (過去の会話や作業内容の記録。会話開始時に読み込む)

セッションを継続するために開発の記録を自動的にしてもらっています。

## 3. [アプリ名]-design

設計書を書いています。
人間の考えた文書です。
これをタスクリストリポジトリに渡してコード化する下準備をしています。

## 4. [アプリ名]-design-task-list

タスクリストです。
設計書をタスク分解をして、タスクリストにします。
そして、タスクリストをつかって開発の進捗状況を管理しています。

それぞれのタスクに
[ ] 実装予定
[~] 実装中
[X] 実装済み
とチェックしていきます。

設計書で書いたものをGitHub Copilotに渡しやすい大きさに分割しています。

1つのタスクは複数のステップに分けます。

1つのタスクをプロンプトファイルにまとめ上げて、
ステップごとにGitHub Copilotなどを利用して
コードの実装をしていきます。

## 5. [アプリ名]-doc

[アプリ名]のドキュメントです
vitepressやNextraなどの静的ライブラリを使用しています。

Honoがvitepressを採用していたので試してみることにしました。

プロンプトファイルなどを読み込ませてドキュメントを書いています。



### 指示書のフォルダ・ファイル構成

2の [アプリ名]-custom-instructions リポジトリ

```
.
├── _memory-bank
│   └── _memory-bank-instructions.md          # メモリーバンク指示
├── .github
│   ├── prompts        (プロンプトファイル)
│   │   ├── completes # (実装済み プロンプトファイル)
│   │   └── [YYYYMMDD]-[タスクid]-[タスク名]-[タスクの種類].prompt.md # (実装予定のプロンプトファイル)
│   ├── .copilot-codeGeneration-instructions.md # コード生成指示 (個別の指示書)
│   ├── .copilot-commit-message-instructions.md # コミットメッセージ指示 (個別の指示書)
│   ├── .copilot-review-instructions.md       # レビュー指示 (個別の指示書)
│   ├── .copilot-task-instructions.md         # タスク指示 (個別の指示書)
│   ├── .copilot-test-instructions.md         # テスト指示 (個別の指示書)
│   ├── .supabase-instructions.md             # Supabase連携指示 (個別の指示書)
│   └── copilot-instructions.md               # このファイル (全体指示書)
└── README-copilot-instructions.md            # (この指示書に関する説明)

```

あとは第二版の考えと一緒です。





---

(調査、研究中)

# 開発AI

GitHub Copilot

Cline
Roo code
	ブーメランモード
    タスクをサブタスクに分解して開発していく

それぞれのリポジトリの内容は
第二版のを再利用しています。
