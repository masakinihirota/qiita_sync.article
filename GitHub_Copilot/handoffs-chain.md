<!--
This file: handoffs-chain.md
Scenario: Idea → Plan → Design → Failing Tests → Implementation → Review — chain them using handoffs.
-->

# Handoffs チェーン：アイデアから完成まで（テンプレート）

目的: アイデアから具体的な成果物までを、複数のカスタムエージェントで段階的に進めるワークフローを `handoffs` を使って定義する例を示します。

例シナリオ（想定）: シンプルな TODO アプリを作る
- アイデア: TODOアプリを作りたい（優先機能: タスク追加、削除、完了、フィルター機能）
- 目的: 最低限の機能を備えた TODO アプリをTDDで実装して公開する

ワークフロー（チェーン）:
- Step 0: idea_agent — アイデアを明確化
- Step 1: planner — 要件定義・実装計画を作成
- Step 2: failing_tester — まず失敗するテストを生成（TDDの入口）
- Step 3: implementation — テストが通るように実装（編集）
- Step 4: code_reviewer — コード品質・セキュリティレビュー

---

## 各 Step の Agent（テンプレート）

以下は各ステップで使う `.agent.md` のフロントマター（YAML）サンプルと、本文に入れるべき要件・振る舞いの例です。

---

## 0) idea_agent.agent.md — アイデアの整理

```yaml
---
name: idea_agent
description: Collect initial product idea and goals.
tools: [ 'search' ]
handoffs:
  - label: Proceed to Planner
    agent: planner
    prompt: Based on the idea below, produce a clear requirements summary and plan for implementation.
    send: false
---
```

Body（例）:
- ユーザのアイデア（例: TODOアプリの機能）を受け取り、目的・優先機能・ユーザー像を明確化してください。
- 出力: 簡潔な要件要約（Overview）、優先機能リスト、成功条件、想定制約。

---

## 1) planner.agent.md — 計画・設計（要件定義）

```yaml
---
name: planner
description: Generate implementation plan, high-level design, tasks and estimated effort.
tools: [ 'search', 'fetch', 'githubRepo', 'usages' ]
handoffs:
  - label: Create Failing Tests
    agent: failing_tester
    prompt: From the approved plan below, create unit/integration tests that currently fail for the intended behavior.
    send: false
  - label: Start Implementation
    agent: implementation
    prompt: Implement the initial features as defined in the plan.
    send: false
---
```

Body（例）:
- 要件を受けて、概要 (Overview)、詳細要件 (Requirements)、実装手順 (Implementation Steps)、優先度の高いタスクを列挙する。
- 期待する成果物: 設計要約、API 仕様（例: エンドポイント / Route）、UI 仕様、優先タスクリスト。

---

## 2) failing_tester.agent.md — 失敗するテスト生成（TDD入口）

```yaml
---
name: failing_tester
description: Create failing tests for features defined in the plan.
tools: [ 'search', 'fetch' ]
handoffs:
  - label: Implement to Pass Tests
    agent: implementation
    prompt: Implement code changes to make the tests below pass. Focus on the minimal change to satisfy tests.
    send: false
---
```

Body（例）:
- Planner の要件に基づき、優先度の高い機能に対して失敗するユニット/統合テストを作成する。
- 期待する成果物: `tests/` 直下の具体的なテストケース（テスト名と期待値）、どの機能を検証するかを明記。

---

## 3) implementation.agent.md — 実装（テスト合格）

```yaml
---
name: implementation
description: Implement code changes to satisfy failing tests.
tools: [ 'edit', 'search', 'fetch', 'githubRepo' ]
handoffs:
  - label: Request Code Review
    agent: code_reviewer
    prompt: The implementation below has been completed. Please review for quality, performance, and security issues.
    send: false
---
```

Body（例）:
- 失敗テストの話を参照し、必要最小限のコード変更でテストを通す（TDDの「赤→緑→リファクタ」のサイクルに従う）。
- 期待する成果物: 変更されたソースコード、テストがグリーンになったことの証拠（テストログ/確認コメント）。

---

## 4) code_reviewer.agent.md — コードレビュー

```yaml
---
name: code_reviewer
description: Review implementation for quality, security, and design conformance.
tools: [ 'search', 'fetch', 'githubRepo', 'usages' ]
handoffs:
  - label: Merge & Release
    agent: release_agent
    prompt: After this review, prepare the changes for merge and release (or generate release notes and run final checks).
    send: false
---
```

Body（例）:
- 変更点が設計/要件に合っているか、セキュリティ・品質の観点から問題がないかをチェック。
- 期待する成果物: レビューコメント、必要な改善点、承認または差し戻しの決定。

---

## 5) release_agent（任意） — リリース準備

（必要な場合）マージとリリース準備（Changelog、バージョン更新、デプロイ手順）。

```yaml
---
name: release_agent
description: Prepare merge, changelog, and release steps.
tools: [ 'githubRepo' ]
handoffs:
  - label: Done
    agent: done_agent
    prompt: Mark the feature as completed and describe the outcome.
    send: false
---
```

---

## 実践上のヒント（運用）
- 各ハンドオフで**必要な最小限のコンテキスト**（計画の要点、対象ファイル、テスト名）を渡すと実行が安定します。例: `Plan: Implement addTask API with fields [title, dueDate]` や `Tests: AddTaskTest.test_create_task_fails` をプロンプトに明示。
- `send: false` を第一段階で使い、手動確認を挟むフローから始めると安全です。信頼できるプロンプトが確立できたら `send: true` の自動実行を検討します。
- エージェントごとの `tools`（編集、検索、リポジトリ参照）を適切に分けておくと、誤処理・権限ミスが減ります。
- ハンドオフのテストは小さく（機能単位）しておくと、段階的な TDD に向いています。

---

このテンプレートを使って、実際に `.github/agents` 内に agent ファイルを作成して試してみましょう。お望みなら、特定の機能（例：TODOアプリのタスク追加機能）に沿った `*.agent.md` 実ファイルを生成してコミット用テンプレートを作成します。どのステップを作成しましょうか？


