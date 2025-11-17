<!--
Source: https://code.visualstudio.com/docs/copilot/customization/custom-agents
-->

# Handoffs まとめ（VS Code カスタムエージェント）

このファイルは、VS Code のカスタムエージェント機能における `handoffs`（エージェント間ハンドオフ）について、公式ドキュメントの要点と実践例をまとめたものです。

---

## 概要
- Handoffs は、カスタムエージェント間で「順序立てたワークフロー」を構築するための機能です。
- チャット応答完了後に表示されるハンドオフボタンを押すことで、次のエージェントへ**コンテキスト**と**あらかじめ用意されたプロンプト**を渡せます。
- 典型的な利用例： 計画（Planner）→ 実装（Implementation）→ レビュー（Code Review）などの段階的ワークフロー。

## 仕組み（簡単な流れ）
1. ユーザが `planner` エージェントにより計画を生成する。
2. 画面に「ハンドオフボタン」が表示される（例: "Start Implementation"）。
3. ボタンを押すと、指定した `agent` へ切り替わり、`prompt` が入力欄に事前セットされる。
4. `send: true` の場合は自動送信され、`send: false` の場合はユーザが確認してから送信します（デフォルトは `false`）。

## `.agent.md` での設定（YAML）
- `handoffs` はフロントマター（YAML）に設定します。キーは以下です：

| キー | 説明 |
| :--- | :--- |
| `label` | ハンドオフボタンに表示されるテキスト |
| `agent` | 遷移先エージェントの識別子（ファイル名／name） |
| `prompt` | 遷移先に渡す事前入力プロンプト |
| `send` | 真の場合は押下と同時に自動送信（既定は `false`） |

> 注意: `tools` に定義していないツールは、その環境で利用できない場合に無視されます。

## 代表的な設定例（テンプレート）

### 計画（Planner）→ 実装（Implementation）
```yaml
---
description: Generate an implementation plan
tools: [ 'search', 'fetch' ]
handoffs:
	- label: Start Implementation
		agent: implementation
		prompt: Now implement the plan outlined above.
		send: false
---
```

### 実装（Implementation）→ コードレビュー（Code Reviewer）
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

### 失敗テスト（Failing Test）→ 実装（TDD フロー）
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

## 運用のポイント（ベストプラクティス）
- 最初は `send: false` で運用する（誤送信の抑止、手動確認が可能）。
- `prompt` はできるだけ具象化（関連ファイル、テスト名、モジュール、制約などを含める）。
- エージェントごとに `tools` を限定し、役割に応じたアクセス権を付与する（例：Planner は read-only、Implementation は edit 権限）。
- 小さなワークフローから始めて、問題がなければ段階的に拡張する。
- チャット履歴やハンドオフ時のコンテキストはログとして残す（追跡と監査に有効）。

## 制約と注意点
- 指定した `tools` が利用不可の場合、それらは無視されます。
- `.agent.md` はワークスペース (`.github/agents`) またはユーザープロファイルに配置可能。
- `agent` の識別子は `name` フィールド、またはファイル名による指定が利用されます。

## 参考（公式）
- VS Code Docs - Custom agents（Handoffs の説明）
- https://code.visualstudio.com/docs/copilot/customization/custom-agents

---

必要であれば、このファイル内に各ステップ（planner → failing_tester → implementation → code_reviewer）用の完全な `*.agent.md` テンプレートを追加で生成できます。どのテンプレートを優先しますか？

