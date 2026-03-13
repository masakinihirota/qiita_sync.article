<!--
title:   Antigravityを使う前に: Next.js用に人間には厳しいルールを適用したサンプル
tags:    Antigravity,Gemini,Sonnet,Supabase,codex
id:      dbbd8f897114a422d83a
private: false
-->
## 目的

Antigravityを使う前に、通常のNext.js 16 に厳しいルールを設定したサンプルWebアプリを作りました。
サンプルの機能は(ダミーデータの)リスト表示とソート機能のみです。

AIはコピーするのは得意ですから一番最初にガッツリとしたガードレールを分厚く作ってみました、
これで2個目のコンポーネント以降は最初のコンポーネントを真似て作ってくれるはずです。

UIとロジック(データの紐付け、状態管理、API)を同時に生成しようとすると、生成AIのコードをシンプルに保つためです。 無限ループにハマった時に対応しやすくなると思いました。

ルールはAntigravity用に人間には厳しいルールを書きました。

AIで作成してもらい、別AIにチェックしてもらった所、サンプルとしてはほぼ100%近いとの評価をもらっています。

gitを使い開発
huskyを使いコミット時にESLint Prettier
push時にbuildで動作確認を行う。


## WebサービスのUI/UX開発順

要件定義書
設計書
UI/UXの必要項目のリスト化
UI/UXのデザイン(Gemini3やFigma、v0等)
タスクリスト作成(TDDテスト駆動開発)
見た目だけの静的UI/UXサイト(必要ならダミーデータを使ってのTDDテスト駆動開発)
人間の感覚で使いやすいかをチェック、AIレビュー(UI/UX)
ロジック開発(TDDテスト駆動開発)
データベースにつなげる(Supabaseの宣言型スキーマで作成)ダミーデータは残しておく
フェッチ(TDDテスト駆動開発)
指示書に沿っているかのレビューをAIに依頼
レビューの依頼はもっと細かくしてもいい
結合テスト

※ドラッグアンドドロップにソート、ドロップダウンメニュー等の複合技とか複雑なのは、一つづつ分解して開発する。

Barrel Export の採用 App routerとコンポーネントの分離、独立

### 📌 Barrel Export（バレルエクスポート）とは？
Barrel Export は、ディレクトリの入口（通常 `index.ts`）にそのディレクトリ配下の複数ファイルからの再エクスポート（re-export）をまとめたファイルを置く手法です。
パスを短く・分かりやすくすることで、利用側のインポートをシンプルにする目的で使われます。


## 指示書のリポジトリサンプル

https://github.com/masakinihirota/strict-rules-nextjs

👆️このリポジトリの **.agentフォルダ内** が今回の指示書のサンプルです。

## 紹介動画(NotebookLM製)

https://www.youtube.com/watch?v=q0QSgyHL3QQ

## 紹介スライドショー(NotebookLM製)

https://github.com/masakinihirota/strict-rules-nextjs/blob/main/Nextjs_Quality_Enforced.pdf

## 🛠️ このリポジトリの採用ツール・技術スタック

### **コア技術**
- ✅ **Next.js 16.0.8** (App Router)
- ✅ **React 19.2.1**
- ✅ **TypeScript 5**
- ✅ **Tailwind CSS 4** (`@tailwindcss/postcss`)

### **UI・スタイリング**
- ✅ **Radix UI** (`@radix-ui/react-avatar`)
- ✅ **Shadcn/UI** (components/ui配下)
- ✅ **Lucide React** (アイコン)
- ✅ **class-variance-authority** (CVA)
- ✅ **clsx** + **tailwind-merge** (クラス結合)
- ✅ **tw-animate-css** (アニメーション)

### **テスト**
- ✅ **Vitest 4.0.15** (テストランナー)
- ✅ **React Testing Library 16.3.0**
- ✅ **@testing-library/jest-dom**
- ✅ **jsdom** (DOM環境)
- ✅ **@vitejs/plugin-react** (Vite React統合)

### **コード品質・フォーマット**
- ✅ **ESLint 9** + **eslint-config-next**
- ✅ **@typescript-eslint/eslint-plugin**
- ✅ **eslint-plugin-functional** (関数型プログラミング強制)
- ✅ **Prettier 3.4.2**
- ✅ **eslint-config-prettier** + **eslint-plugin-prettier**
- ✅ **Husky 9.1.7** (Git hooks)

### **バックエンド・データベース**
- ✅ **Supabase** (型生成スクリプト `supabase:types:local`)

### **実験的機能**
- ✅ **React Compiler** (`babel-plugin-react-compiler 1.0.0`)

### **パッケージマネージャー**
- ✅ **pnpm** (lockファイル: `pnpm-lock.yaml`)

---

**特徴**: 関数型プログラミング重視（`eslint-plugin-functional`）、厳格なルール適用、テストカバレッジ重視の構成です。




## 指示書ファイルの構造

```

.agent
├── rules
│   ├── .copilot-architecture-instructions.md
│   ├── .copilot-codeGeneration-instructions.md
│   ├── .copilot-techstack-instructions.md
│   ├── decision-log-instruction.md
│   ├── declarative-supabase-schemas.md
│   ├── japanese.md
│   ├── ui-dadsi-instruction.md
│   └── ui-shadcn-instruction.md
└── workflows
    ├── .db-antipattern1-instructions.md
    ├── .db-antipattern2-instructions.md
    ├── 0-understanding-the-current-situation.md
    ├── 1-check-instruction.md
    ├── next-implementation.md
    ├── ui-principles1-instruction.md
    ├── ui-principles2-instruction.md
    ├── ui-principles3-instruction.md
    ├── ux1-instruction.md
    ├── ux2-instruction.md
    └── ux3-instruction.md

```

`.agent/rules` は常に適用するルール
`.agent/workflows` は作成した後チェックするルール
が基本的においてある。

workflowsフォルダに入れておくとAntigravityではスラッシュコマンドになるので

チャット欄から

```
/next-implementation.md

```

と入力すれば実行される。

# 指示書の説明

## 具体的な指示一覧

各ルールファイルとワークフローファイルの**主な機能**をリスト形式でまとめます:

## 📋 rules（ルール）- 主な機能

### .copilot-codeGeneration-instructions.md
- ✅ `class`/`enum`/`throw`/`try-catch`の使用禁止
- ✅ `let`禁止、`const`と`readonly`による完全な不変性強制
- ✅ Default Export禁止、Named Exportのみ使用
- ✅ Barrel Export（`index.ts`）の必須化
- ✅ 引数2つ以上の場合はオブジェクト形式強制
- ✅ Result型による型安全なエラー処理
- ✅ Zod `safeParse`の強制（`parse`禁止）
- ✅ 型アサーション（`as`/`!`）禁止
- ✅ ネスト深さ1まで、早期リターン推奨
- ✅ TSDoc必須化（目的・引数・注意事項）
- ✅ 結合テスト重視、サーバー側100%カバレッジ目標
- ✅ TDD（RGR）サイクルの実行手順定義

### decision-log-instruction.md
- ✅ 仕様変更を`decision_log.md`に集約
- ✅ 優先順位: 決定ログ > 会話 > 設計書
- ✅ 設計書の直接更新禁止（決定ログ経由）
- ✅ 長期的なコンテキスト維持

### declarative-supabase-schemas.md
- ✅ `supabase/schemas/`に宣言型SQL定義
- ✅ `supabase db diff`で自動マイグレーション生成
- ✅ スキーマの一元管理（真実の源泉）
- ✅ RLS（Row Level Security）ポリシーの宣言的管理
- ✅ ビュー/関数の変更容易化

### japanese.md
- ✅ すべての出力を日本語化
- ✅ Implementation Plan等のアーティファクトも日本語化
- ✅ 初心者向けの丁寧な説明必須

### ui-dadsi-instruction.md
- ✅ WCAG 2.1 AA準拠
- ✅ `disabled`属性禁止 → `aria-disabled`使用
- ✅ コントラスト比4.5:1以上厳守
- ✅ ARIA属性必須化（`aria-label`/`aria-describedby`等）
- ✅ `sr-only`によるスクリーンリーダー対応
- ✅ React Key Propsの一意性確保
- ✅ Tailwind標準クラスによるタイポグラフィ定義
- ✅ デジタル庁カラーパレット準拠

### ui-shadcn-instruction.md
- ✅ Shadcn/UIのプロンプト補助
- ✅ モダンなミニマリズム推奨
- ✅ 余白（ホワイトスペース）の積極活用
- ✅ レスポンシブデザイン対応
- ✅ 視線誘導の設計
- ✅ DADS/HID優先の階層ルール明示

---

## 📋 workflows（ワークフロー）- 主な機能

### .db-antipattern-instructions.md
- ✅ ジェイウォーク（カンマ区切りID）検出
- ✅ ナイーブツリー（階層構造の非効率実装）検出
- ✅ IDリクワイアド（無意味なID列）検出
- ✅ 論理設計・物理設計・クエリ・アプリの4カテゴリー判定
- ✅ 各アンチパターンの解決策提示

### 0-understanding-the-current-situation.md
- ✅ プロジェクト全体の進捗把握
- ✅ 棒グラフによる進捗可視化
- ✅ 問題検出時のタスクリスト自動作成
- ✅ 問題解決まで繰り返し実行

### check-instruction.md
- ✅ 全指示書の遵守状況チェック
- ✅ コード生成規範の確認
- ✅ 決定ログ運用の確認
- ✅ Supabaseスキーマ管理の確認
- ✅ UI設計指針の確認

### next-implementation.md
- ✅ Implementation Plan確認
- ✅ Taskリスト確認
- ✅ 未実装検出時の実装開始トリガー

### ui-principles-instruction.md
- ✅ HID 24指針の適用
- ✅ Supabase互換モックデータ運用
- ✅ `src/lib/mock-data/`配下の型定義
- ✅ UUID形式・ISO 8601形式の徹底
- ✅ DADS→HID→Shadcnの優先順位管理

### ux-instruction.md
- ✅ ドハティの閾値（0.4秒応答）対応
- ✅ 認知負荷軽減（段階的開示）
- ✅ ツァイガルニク効果（未完了タスク表示）
- ✅ 目標勾配効果（プログレスバー強調）
- ✅ ゲーミフィケーション要素
- ✅ ピーク・エンドの法則（完了時フィードバック）
- ✅ 社会的証明（レビュー・ロゴ表示）
- ✅ 労働の錯覚（ローディング演出）
- ✅ 確証バイアス・共感ギャップ回避

## 📁 rules（ルール）指示書ファイルの説明

### .copilot-codeGeneration-instructions.md
**コード生成の基本規範**
TypeScript/Next.js/Supabaseでの開発における厳格なコーディングルールを定義。不変性、関数型プログラミング、テスト駆動開発（TDD）、エラー処理の型安全性を徹底し、`class`/`enum`/`throw`の使用を禁止。Result型による例外処理、Barrel Export、100%カバレッジ目標などを規定。

### decision-log-instruction.md
**決定ログの運用ルール**
仕様変更を`decision_log.md`に集約し、設計書との差分を管理。優先順位は「決定ログ > 直近の会話 > 設計書」とし、仕様変更時は設計書を直接更新せず、まず決定ログに記録することを義務付け。

### declarative-supabase-schemas.md
**Supabase宣言型スキーマ管理**
Supabaseの宣言型アプローチでDBスキーマを管理する手順書。`supabase/schemas/`にSQL定義を配置し、`supabase db diff`でマイグレーションを自動生成。スキーマの真実の源泉を一元化し、変更履歴を自動追跡。

### japanese.md
**日本語化の徹底**
すべての出力（Implementation Plan、Walkthrough、Task等のアーティファクト含む）を日本語で行うことを要求。プロジェクト未経験者でも理解できるよう、丁寧な説明とコメントを必須化。

### ui-dadsi-instruction.md
**デジタル庁デザインシステム（DADS）実装指針**
WCAG 2.1 AA準拠のアクセシビリティ要件を最優先。`disabled`属性の禁止（代わりに`aria-disabled`使用）、コントラスト比4.5:1以上、ARIA属性の必須化、Tailwind CSSによるタイポグラフィ/カラーパレット定義。

### ui-shadcn-instruction.md
**Shadcn/UI プロンプト補助**
Shadcn/UIの利用を前提としたプロンプト改善案。実装規約ではなく、DADS/HIDと矛盾する場合は必ずDADS→HIDを優先。モダンなミニマリズム、余白の活用、視線誘導など現代的Webデザインの要素を提示。

---

## 📁 workflows（ワークフロー）指示書ファイルの説明

### .db-antipattern-instructions.md
**データベース設計アンチパターン判定**
SQLアンチパターン（ジェイウォーク、ナイーブツリー、IDリクワイアドなど）のチェックリスト。論理設計、物理設計、クエリ、アプリケーション開発の4カテゴリーでアンチパターンを検出・回避する指針。

### 0-understanding-the-current-situation.md
**現状把握のワークフロー**
プロジェクト全体の進捗状況を把握し、棒グラフで可視化。問題が見つかった場合はタスクリストを作成し、一つずつ対処。問題がなくなるまで繰り返し実行。

### check-instruction.md
**指示書遵守のチェック**
各種指示書（コード生成、決定ログ、Supabaseスキーマ、UI設計など）に従っているかを確認するチェックリスト。

### next-implementation.md
**実装の開始**
Implementation PlanやTaskリストを確認し、未実装が残っていれば実装を開始するトリガー。

### ui-principles-instruction.md
**ヒューマンインターフェースデザイン（HID）24指針**
Supabase互換のモックデータ運用ルールとHIDの24原則を定義。DADS（スタイル）→本書（行動原則/UX）→Shadcn（参考）の優先順位で、情報設計・操作性を整理。

### ux-instruction.md
**UX心理学的デザイン要件**
ドハティの閾値、ツァイガルニク効果、ピーク・エンドの法則など、UX心理学の知見を実装に適用。パフォーマンス、モチベーション、意思決定、信頼構築の観点から、ユーザー体験を最適化する指示書。


# 参考

Next.js App routerでの ルーティングとコンポーネントを別々に管理 #AppRouter - Qiita

https://qiita.com/masakinihirota/items/2695cba68816794e33d3

Supabaseの宣言型データベーススキーマの実践 #PostgreSQL - Qiita

https://qiita.com/masakinihirota/items/ee83b0d210d1dd224046