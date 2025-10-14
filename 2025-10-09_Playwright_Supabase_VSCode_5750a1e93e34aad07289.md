<!--
title:   Playwright の Agents 発表 実験的機能であり VSCode Insiders 動作します
tags:    Playwright,Supabase,VSCode
id:      5750a1e93e34aad07289
private: true
-->

## 環境
Playwright Agents
VSCode v1.105 Insiders (VSCode実験版 2025年10月9日現在の最新版)
Next.js 15
Supabase
Supabase CLI

# 🚀 Playwright Agentで実現する Next.js + ローカルSupabase アプリの超効率的なE2Eテスト開発

## 序章：AI駆動型テスト開発の新しいパラダイム

アジャイル開発において、エンドツーエンド（E2E）テストは品質保証の要ですが、UI変更やデータ構造の変更に伴う**テストコードのメンテナンス**は大きな負担となります。

本記事では、**Next.js**と**ローカルで起動したSupabase**で構築されたアプリケーションを対象に、**Playwright Agents**を導入し、**AIによるテスト計画策定から自動修復まで**を実現するハンズオンを行います。

### 💡 Playwright Agentsとは？

Playwright Agentsは、テストプロセス全体を自動化するために連携する3つのAIエージェントで構成されています。

| エージェント | 役割 | 機能の概要 |
| :--- | :--- | :--- |
| **🎭 Planner** | テスト計画の策定 | アプリケーションを探索し、Markdown形式のテストプランを生成します。 |
| **🎭 Generator** | テストコードの生成 | Markdownプランを読み込み、実行可能なPlaywright Testファイルに変換します。 |
| **🎭 Healer** | テストの自動修復 | 失敗したテストを自動で検知し、ロケーターの更新などパッチを適用して修復します。 |

-----

## Part 1: 環境構築とエージェントの初期設定

### 1\. Next.js + Supabaseプロジェクトの準備

Supabaseの認証とデータベース操作を含むTodoリストのようなアプリケーションを想定します。ローカル環境でSupabaseを起動することが重要です。

1.  **プロジェクトの初期化**

```terminal
# Next.jsプロジェクトをSupabase連携テンプレートで作成
npx create-next-app -e with-supabase playwright-ai
cd playwright-ai

# Supabase CLIの初期化
supabase init

```

2.  **ローカルSupabaseの起動**
ローカルDBの入出力テストを行うため、Supabaseをローカル環境で起動します。

```terminal
# ローカルのSupabaseコンテナを起動
supabase start

# ステータス表示(環境変数など)
supabase status

```

*（Note：このとき表示される`anon`キーや`URL`をNext.js側で環境変数として設定します。）*

```.env.local
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ*****"

```



### 2\. Playwrightのインストールとエージェント定義の初期化

Playwrightをインストールし、AIエージェントを使用するための定義ファイルを生成します。

1.  **Playwrightのインストール**

```terminal
npm install -D playwright
npx playwright install

```

2.  **Playwright Agentsの初期化**
今回は**VS Code**でのエージェント体験を前提とします。

```terminal
# VS Code向けのエージェント定義ファイルを生成
npx playwright init-agents --loop=vscode

```

*（Note：エージェント機能の利用には、**VS Code v1.105 Insiders**またはそれ以降の安定版が必要です。）*
これにより、`.github/`ディレクトリにエージェント定義が、`playwright.config.ts`にはエージェント関連の設定が追加されます。

-----

## Part 2: テスト環境のブートストラップと計画立案 (🎭 Planner)

### 1\. シードテスト (`seed.spec.ts`) の作成

Playwright Agentsは、まず**シードテスト**を実行してテスト環境をブートストラップします。Supabaseアプリケーションの場合、これは**ログイン処理**を行い、以降のテストを認証済みの状態で開始するために利用します。

#### 📝 `tests/seed.spec.ts` の作成とDBへのアクセス

```typescript
// tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test('setup environment and login', async ({ page }) => {
  // 1. DB操作: テストユーザーが存在することを確認または作成 (オプション)
  //   実際にはSupabaseのテスト用クライアントでDBをクリア/シードする処理をここに含めることができます。

  // 2. ログイン処理
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button:has-text("Login")');

  // 3. ログイン後の確認
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

```

### 2\. 🎭 Plannerの実行とテスト計画の生成

Plannerエージェントに、**ログイン後にDBにデータを追加・検証するシナリオ**を指示します。

1.  **Plannerへのリクエスト**

```terminal
# ログイン済みの状態から、新規Todoを作成し、リストに表示されることを検証する計画を依頼
npx playwright planner "Generate a plan for creating a new todo item and verifying its presence in the list. Start from the logged-in state defined in seed.spec.ts, as this confirms DB input and output via the browser."

```

2.  **出力の確認**
Plannerは、以下のような**Markdownテスト計画**を`specs/`ディレクトリ（例：`specs/create-todo.md`）に出力します。

```markdown
# specs/create-todo.md (出力例)

## Scenario: Add a valid todo item and verify DB persistence

### Steps:
1. Navigate to the Todo list page on the dashboard.
2. Click the 'Add New Todo' button.
3. Fill the text field with the todo title "Playwright Agent Masterclass".
4. Click the 'Save' button.

### Expected Outcome:
- The new todo item with the title "Playwright Agent Masterclass" is visible in the list on the browser.
- A success notification is displayed confirming DB insertion.

```

-----

## Part 3: テストコードの生成と実行 (🎭 Generator & 🎭 Healer)

### 1\. 🎭 Generatorによるテストコードの自動生成

Plannerが作成したMarkdown計画を基に、Generatorが実行可能なPlaywrightテストコードを生成します。

1.  **Generatorへのリクエスト**

```terminal
# 生成されたMarkdownファイル名を指定して、テストコードの生成を依頼
npx playwright generator specs/create-todo.md

```

2.  **出力の確認**
Generatorは、`tests/`ディレクトリ（例：`tests/create/add-valid-todo.spec.ts`）に**Playwrightテストファイル**を生成します。このコードは、Markdownのステップを具体的なロケーターとアサーションに変換しています。

*（Note：生成されたテストコードは、ブラウザを介してSupabaseのDBにデータが書き込まれ、その後読み込まれて画面に表示されるという**E2Eのデータフロー全体**を検証します。）*

### 2\. 🎭 Healerによるテストの実行と自動修復

生成されたテストを実行します。もしUIに変更があった場合、**Healer**が自動でテストを修復します。

1.  **テストの意図的な失敗（シミュレーション）**
意図的にアプリケーションのUIを変更します。（例：Todo作成フォームの「Save」ボタンのテキストを「登録」に変更するなど）

2.  **テストの実行とHealerの起動**
テストを実行すると、Healerが失敗を検知し、自動でパッチ適用を試みます。

```terminal
# テストを実行
npx playwright test tests/create/add-valid-todo.spec.ts
# 失敗するとHealerが自動介入し、新しいロケーター（例：Submit）を探して修正します。

```

3.  **出力の確認**
Healerは失敗したテストを再実行し、\*\*テストコードを自動で修正（パッチ）\*\*します。修正後のテストファイルを確認すると、古いロケーターが新しいものに更新されていることが確認できます。

-----

## 結び：エージェント駆動型テスト開発の未来

Playwright Agentsは、Next.js + Supabaseのような最新の技術スタックを用いたアプリケーションにおいて、**テスト計画・コード生成・メンテナンス**という従来のE2Eテストのボトルネックを解消します。

| エージェント | 役割 | 開発者が行う作業 |
| :--- | :--- | :--- |
| **Planner** | テスト計画の立案 | テストしたい**シナリオを自然言語で指示**するだけ |
| **Generator** | テストコードの具現化 | 計画ファイルを指定し、コード生成を指示 |
| **Healer** | テスト資産の保護 | **テストを実行するだけ**で、UI変更による失敗を自動で修復 |

この強力なエージェントの連携により、開発者は安心してUI/UXの改善や新機能開発に集中できるようになります。あなたのプロジェクトでも、この**エージェント駆動型テスト開発**をぜひ体験してみてください！

-----








## 参考

Agents | Playwright
https://playwright.dev/docs/test-agents




