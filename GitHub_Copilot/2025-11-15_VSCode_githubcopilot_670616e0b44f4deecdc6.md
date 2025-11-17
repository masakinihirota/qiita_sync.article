<!--
title:   GitHub Copilot VSCode v1.106「ハンドオフ」機能 実際にエージェントを使いバトンリレーしてみる。
tags:    VSCode,githubcopilot
id:      670616e0b44f4deecdc6
private: true
-->

# ハンドオフ機能（HandOff） — カスタムエージェントによる開発ワークフローの自動化

📌 目的: このドキュメントは、VS Code のカスタムエージェント（例: `.agent.md`）に使える「ハンドオフ」機能の解説、設定方法、具体的な活用例、運用上のコツをまとめたものです。

---

## 概要 — 「ハンドオフ」とは 💡

- 「ハンドオフ」は、あるカスタムエージェントの実行が完了したあと **ボタン操作** により、**関連コンテキスト（入力、生成物、メタ情報）** と **プロンプト** を別のエージェントへ渡して作業を引き継ぐ機能です。
- これにより、計画→実装→レビューといった複数フェーズにまたがるワークフローを、AIにより役割ベースで分担・連結できます。

## 仕組み（短く）🔧

- UI上は「ハンドオフボタン」が表示され、押すとコンテキストが指定されたターゲットエージェントへ移ります。
- YAMLフロントマターで `handoffs` を定義し、`label`, `agent`, `prompt`, `send` の値を設定します。
- `send: false` にするとユーザーが送信内容を確認してから移行できます。`send: true` は自動送信です。

---

## YAML 設定: 基本項目

| 項目 | 説明 | 例 |
|:---|:---|:---|
| `handoffs.label` | ハンドオフボタンのラベル | `Start Implementation` |
| `handoffs.agent` | 移行先エージェント識別子 | `implementation` |
| `handoffs.prompt` | 移行先に渡す指示テキスト（自由文） | `Now implement the plan outlined above.` |
| `handoffs.send` | 自動送信フラグ（true/false） | `false` |

---

## 活用例（短いサマリ）🧭

- 計画（Planner）→ 実装（Implementation）: 要件・設計をそのまま実装に渡す。
- 実装（Implementation）→ レビュー（Code Reviewer）: コード編集完了後にレビューへ移す。
- 失敗テスト（Failing Tester）→ 実装（Implementation）: TDDの流れで最初に失敗テストを作り、実装で合格させる。

---

## 具体的なシナリオ例（YAML + 解説）📑

### 例: Planner → Implementation

```yaml
---
description: Initial brainstorming and idea definition.
tools: [ 'search', 'fetch', 'githubRepo', 'usages' ]
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Now implement the plan outlined above.
    send: false
---
```

- 説明: Planner が作成した要件／設計／実装手順（Markdown などの構造化情報）を `implementation` に渡して実装を行わせます。

### 例: Implementation → Code Reviewer

```yaml
---
description: Implement code changes based on an approved plan.
tools: [ 'edit', 'search' ]
handoffs:
  - label: Request Code Review
    agent: code_reviewer
    prompt: Review the implementation changes just completed for quality and security issues.
    send: false
---
```

- 説明: 実装エージェントの変更をレビュー担当へ引き継ぐためのハンドオフです。レビュー用のエージェントは読み取り専用ツールで動作するのが推奨されます。

### 例: Failing Tester → Implementation（TDD）

```yaml
---
description: Generate failing tests that need implementation to pass.
tools: [ 'search', 'fetch' ]
handoffs:
  - label: Implement to Pass Tests
    agent: implementation
    prompt: Implement the required code changes to make the tests outlined above pass.
    send: false
---
```

- 説明: TDD で「最初に失敗するテストを作成」→ 実装でそのテストを合格させる流れに最適です。

---

## フルワークフロー: アイデア→計画→実装→レビュー（TDD採用）🔁

1. アイデア生成 → Planner
   - `idea_agent` が初期のアイデアを生成。
   - ハンドオフで `planner` へ渡し、要件定義や高レベル設計を作成。
2. Planner → Failing Tester
   - 計画承認後、TDD 用の失敗テストを生成する `failing_tester` へ移行。
3. Failing Tester → Implementation
   - 生成した失敗テストを渡し、実装 (`implementation`) にてテストを合格させる。
4. Implementation → Code Reviewer
   - 実装完了・テスト合格後にレビュー担当 (`code_reviewer`) に渡して最終チェックを実施。

---

## .agent.md のテンプレート（サンプル）🧩

1) `idea_agent.agent.md`

```markdown
---
description: 新しい機能やプロジェクトの初期アイデアと目標を定義します。
name: IdeaGenerator
target: vscode
tools: [ 'search' ]
handoffs:
  - label: 詳細な計画と設計を開始
    agent: planner
    prompt: このアイデアと目標に基づき、要件定義、高レベル設計、および実装ステップを含む詳細な計画を生成してください。
    send: false
---
```

2) `planner.agent.md`

```yaml
---
description: 要件定義、高レベル設計、および実装計画を生成します。
name: Planner
target: vscode
tools: [ 'search', 'fetch' ]
handoffs:
  - label: TDD: 失敗するテストケースを作成
    agent: failing_tester
    prompt: 承認された設計と要件に基づき、実装対象の機能に対応する、現在は失敗するテストコードのリストを作成してください。
    send: false
---
```

3) `failing_tester.agent.md`

```yaml
---
description: テスト駆動開発（TDD）のための失敗するテストコードを作成します。
name: FailingTester
target: vscode
tools: [ 'search', 'fetch' ]
handoffs:
  - label: 実装を開始し、テストを合格させる
    agent: implementation
    prompt: 直前に提示された失敗テストをすべて合格させるために必要なコード変更を実装し、ファイルに適用してください。
    send: false
---
```

4) `implementation.agent.md`

```yaml
---
description: コード変更を実装し、テストを合格させます。
name: Implementer
target: vscode
tools: [ 'edit', 'search' ]
handoffs:
  - label: 最終コードレビューに提出
    agent: code_reviewer
    prompt: 完了した実装（テスト合格済み）のコード変更全体について、品質、セキュリティ、および設計との整合性をレビューしてください。
    send: false
---
```

5) `code_reviewer.agent.md`

```yaml
---
description: 実装されたコードのセキュリティ脆弱性、品質、および設計との整合性をレビューします。
name: CodeReviewer
target: vscode
tools: [ 'search', 'fetch' ]
---
```

---

## 運用のコツ / ベストプラクティス ✅

- まずは `send: false` を使って、各ハンドオフの内容が期待どおりに渡るかを確認してから `send: true` を検討する。
- エージェントの `tools`（許可された操作）を役割ごとに限定する（Planner: 読取のみ、Implementation: 編集許可など）。
- `prompt` は具体的に。対象ファイル群、テスト名、期待結果、制約（コードスタイルや依存関係）を明記すると安定する。
- ハンドオフで渡すコンテキストは冗長になりがちなので、重要な要素（要件、失敗テスト、変更ファイル、テスト結果）に焦点を当てる。
- 小さな単位でハンドオフする（TDD のように小さな検証単位で進めるとレビューが容易）。

---

## 参考プロンプト（抜粋）✍️

- `Now implement the plan outlined above.` — 計画に基づいて実装を開始させる基本プロンプト
- `Review the implementation changes just completed for quality and security issues.` — 実装結果をレビューさせる基本プロンプト
- `Implement the required code changes to make the tests outlined above pass.` — 失敗テストを合格させる実装指示

---

## 付録: よくある問いと回答（FAQ）❓

- Q: エージェント間で大きなオブジェクト（大量のCIログやバイナリ）を渡せますか？
  - A: 直接のファイル転送は限定されます。必要なら要点（エラーの要約、失敗テストのファイルパス、行番号）を渡すのが実務的です。
- Q: 複数タスクを自動で連続実行できますか？
  - A: `send: true` とエージェントの自動プロンプトを組み合わせることで可能ですが、まずは検査・確認を挟む方式（`send: false`）で充分にテストしてください。

---

このドキュメントはプロジェクトのハンドオフ運用例です。必要に応じて、各 `agent` ファイルに固有の制約やプロンプトテンプレートを追加して運用を成熟させてください。

Tips: 最初は1つのワークフロー（例：Planner→Implementation）だけ導入して安定化させてから、他のフローを追加していくのがおすすめです。



---

# テスト駆動開発

## ✍️ プロンプトエンジニアリングでNext.jsのTDDを加速させる方法

テスト駆動開発（TDD）は、ソフトウェアの品質と設計を向上させる強力な手法です。しかし、特にNext.jsのようなモダンなフレームワークで実践しようとすると、「毎回の手順が面倒」「どうAIを活用すればいいか？」という疑問が生じがちです。

本記事では、AI（ここではChatGPTやGeminiなどの大規模言語モデルを指します）と連携し、お手持ちの「レッド、グリーン、リファクタリングの指示書」を最大限に活用して、Next.js開発でTDDを効率的に進める具体的な方法を解説します。

---

## 🚀 TDD開発を加速させる3つの鍵

TDDのサイクルをAIと回すために必要な要素は以下の3つです。この3つの要素を連携させることで、開発は一気にスピードアップします。

1.  **共通の「プロセス指示書」**（Red/Green/Refactorのテンプレート）
2.  **明確な「タスクリスト」**（開発の羅針盤）
3.  **小さな「TDDサイクル」**（開発のルーティン）

---

## 1. 共通の「プロセス指示書」を定義する

お手元の「レッド、グリーン、リファクタリングの指示書」は、すべてのタスクに共通して適用される**開発ルールブック**です。これをAIに最初にインプットすることで、AIはあなたの開発基準に合わせて振る舞う「TDDエンジニア」として機能します。

### 指示書に含めるべき内容の例

| フェーズ | 目的 | AIへの指示の例 |
| :--- | :--- | :--- |
| **🔴 Red** | **失敗の定義** | 「必ずテストは失敗すること。機能要件を満たさないテストを先に書くこと。プロダクションコードは書かないこと。」 |
| **🟢 Green** | **最小限の実装** | 「Redになったテストをパスする**最小限の**コードを書くこと。必要以上の予防的な実装は厳禁。」 |
| **✨ Refactor**| **品質の担保** | 「テストがパスすることを維持しつつ、可読性、DRY原則、Next.jsのベストプラクティスに基づきコードを改善すること。」 |

**👉 ポイント:** タスクごとにこの指示書を書き換える必要はありません。これは一度定義すれば共通で使えます。

---

## 2. TDDの道標となる「タスクリスト」の重要性

「TDDのルーティンはRed→Green→Refactorのサイクルか？」という問いに対し、「**タスクリストはこのルーティンを駆動させる、不可欠な一部**」と断言できます。

TDDは小さな一歩を繰り返す手法であるため、次に何をすべきかを示す**ロードマップ**が必須です。

### ✅ タスクリスト作成のコツ (AI活用)

まず、開発したい機能全体の要件をAIに与え、**「この要件を達成するために必要な、可能な限り小さなテスト項目（タスク）に分解してください」**と指示します。

| No. | 機能の概要 | テスト対象 | 期待される動作（TDDの1サイクル） |
| :-- | :--- | :--- | :--- |
| 1 | 初期表示 | `UserList` | ローディング中は「Loading...」が表示されること |
| 2 | データ取得 | `UserList` | ユーザーデータが3件表示されること |
| 3 | エラー処理 | `UserList` | API失敗時にエラーメッセージが表示されること |

タスクの粒度が小さければ小さいほど、後のデバッグが容易になり、TDDのフィードバックサイクルが早くなります。

---

## 3. 失敗を避ける！「タスク1つ＝1周」の原則

効率化のため、「タスクリストの項目全部を一気にRedテストとして書いてから、一気にGreenコードを書く」という**一括処理（バッチ処理）は、TDDの最大のメリットを損なうため避けるべき**です。

### 🚨 なぜ一括処理が危険なのか？

1.  **デバッグの泥沼化:** 一気に多くのテストが失敗すると、どのプロダクションコードがどのテストを失敗させているのか特定が難しくなり、デバッグに時間を浪費します。
2.  **原則の崩壊:** 「今失敗している1つのテストをパスするためだけのコードを書く」というTDDの**最小限の実装**という原則が崩れ、過剰な実装になりがちです。

### 🚀 正しいルーティン：タスク1つずつ完結させる

AIに指示を出す際は、タスクリストの項目を一つずつ取り出し、以下の小さなサイクルを完結させることが重要です。

| サイクル | AIへの指示 | 目的 |
| :--- | :--- | :--- |
| **1. 🔴 Red** | **「タスクX」**に基づき、**Redの指示書**に従ってテストコードを生成してください。 | 1つの失敗を確認する。 |
| **2. 🟢 Green** | **Greenの指示書**に従い、そのテストをパスする最小限のプロダクションコードを生成してください。 | すぐにGreenに戻す。 |
| **3. ✨ Refactor**| **Refactorの指示書**に従い、テストがパスすることを確認しつつコードを改善してください。 | 品質を担保する。 |
| **4. 次へ** | タスクリストの**次の項目**に移る。 | 反復（ルーティンの継続）。 |

### 完了の判断基準

Refactorフェーズで、「コードの重複はないか？」「命名は適切か？」といった**品質チェックリスト**すべてに「Yes」と答えられたら、そのタスクは完了です。自信を持って次のタスクに進みましょう。

この方法でAIと連携すれば、Next.js開発においてもTDDの安全性、設計の良さ、そしてスピードを両立させることができます。
