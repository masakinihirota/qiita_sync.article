<!--
title:   Next.js App Router × コロケーション × バレルインポートで実現する、AI時代の人間との協働開発
tags:    AppRouter,Next.js,コロケーション,バレルインポート,大きな石開発
id:      ffce9f02e066f52d4d97
private: false
-->
イメージ図
![スクリーンショット 2026-05-16 060329.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b54f7c65-cea3-42b6-ba24-828c6902fc43.png)

## はじめに

個人開発の Web アプリを続けていると、ある時期から「コードベースの全体像が自分でも見えない」感覚になってきました。機能追加のたびに複数のフォルダをまたぐ修正が発生し、変更の影響範囲が直感的にわからなくなってくる。GitHub Copilot に頼んでも、関係のないファイルまで変更が提案されることが増えました。

「コロケーション ページ単位ミニアプリの集合体」という設計思想です。

---

## 0. 土台：「大きな石開発」から始まる

ミニアプリ集合体アーキテクチャは、最初から細部を作るのではなく、土台となる大枠を先に固めるという開発手法の上に成り立っています。筆者が別記事で提案している「[大きな石開発](2025/2025-06-04_GitHubCopilot_Next.js_Supabase_88d91559b9a111389b15.md)」の考え方です。

### 大きな石の法則とは

時間管理の教訓として知られる「大きな石の法則」を開発手法に応用したものです。

> 容器に石を入れるとき、**大きな石から先に入れないと、後から入れるスペースがなくなる。**

砂から先に入れると、大きな石は入りません。これをソフトウェア開発に当てはめています。

| 段階 | 内容 | このプロジェクトでの対応 |
|------|------|------------------------|
| 大きな石 | ルーティング・DB・認証・アーキテクチャ | Next.js / Better Auth / Drizzle ORM の選定、`app/` の Route Group 構造 |
| 小さな石 | 型定義・テスト・入出力設計 | コロケーションのテスト、バレルの公開 API 定義 |
| 砂 | ミニアプリの実装 | `src/components/` 配下の各ミニアプリ |
| 水 | DB連携・詳細UI・デプロイ | Server Action の実装、DB 連携 |

### 大きな石はプロジェクト開始時に一度だけ決める

このプロジェクトでの実際の流れはこうなります。

**最初に一度（大きな石）：**
- フレームワーク（Next.js App Router）、認証（Better Auth）、DB（Drizzle ORM + DB）を選定
- `src/app/` の Route Group 構造を設計
- 主要な DB スキーマの設計

**その後、機能追加のたびに繰り返す（小さな石 → 砂 → 水）：**
1. 型定義・テストを先に書く（TDD：小さな石）
2. `src/components/new-feature/` に ミニアプリを実装（砂）
3. DB 連携と UI の仕上げ（水）
4. `src/app/.../page.tsx` から import して組み込む

大きな石が固まっていると、ミニアプリを追加するたびに「どこに入れるか」が迷いません。Route Group のどのグループか、barrel の命名規則、ファイルのサフィックス ―― これらがすべて「大きな石」として先に決まっているからです。

### AI への指示と「大きな石」の関係

AI に指示を与えるとき、土台（大きな石）が固まっていると指示が具体的になります。

```
土台なし（AI が自由にアーキテクチャを選ぶ）:
  "マッチング機能を作って"
  → フレームワーク選択から始めてしまう

土台あり（AI の選択肢が限定される）:
  "src/components/sandbox/matching/ 配下に追加して。
   Next.js App Router、TypeScript、Drizzle ORM を使用。
   完成したら src/components/matching/ へ昇格する予定"
  → 既存の構造に従った実装のみ提案する
```

「大きな石」を決めることは、AI への最初の、そして最も重要な指示書を書くことでもあります。

---

## 1. アーキテクチャの全体像

### 1.1 思想の核心

このアーキテクチャは、一つのシンプルな原則から始まります。

> **「1 ページ = 1 つのミニアプリ」として設計する。**

ホーム画面、プロフィール設定、価値観入力、スキル管理 ―― これらはそれぞれが独立した「ミニアプリ」です。
巨大なモノリシックアプリを構築するのではなく、小さくて自己完結したミニアプリを **組み合わせて**全体を作ります。

```
vns-masakinihirota/
├── src/
│   ├── app/                          ← ルーティング専用（薄いエントリポイント）
│   │   └─── (protected)/
│   │       ├── (core)/
│   │       │   ├── home/
│   │       │   │   └── page.tsx      ← ミニアプリの「玄関」
│   │       │   ├── profile-display/
│   │       │   └── values/
│   │       └── (data-inputs)/
│   │           ├── media-rating/
│   │           └── skills/
│   └── components/                   ← ミニアプリの「実装」
│       ├── home/                     ← homeミニアプリ
│       │   ├── home-header.tsx
│       │   ├── home-tabs.tsx
│       │   ├── home.logic.ts
│       │   └── index.ts              ← 公開 API（バレル）
│       ├── values/                   ← valuesミニアプリ
│       └── profile-display/          ← profile-displayミニアプリ
```

`src/app/` は**ルーティングに専念**し、実際の機能は `src/components/` 配下のミニアプリが担います。

---

### 1.2 構成する三つの要素

| 要素 | 技術 | 役割 |
|------|------|------|
| 構造の分離 | Next.js App Router | `app/` = ルーティング、`components/` = 機能実装 |
| 近接配置 | コロケーション | 関連ファイルを同一フォルダにまとめる |
| 境界の明示 | バレルインポート | `index.ts` がミニアプリの公開 API となる |

---

## 2. コロケーション ― 「関連するものは近くに置く」

### 2.1 従来の構造との比較

**従来のレイヤー分割型:**

```
src/
├── components/    ← UI コンポーネント
├── hooks/         ← カスタムフック
├── utils/         ← ユーティリティ
├── types/         ← 型定義
└── store/         ← 状態管理

```

機能を追加・変更するたびに、**4〜5 フォルダをまたいで修正**が必要になります。
「このボタンの挙動を変えたい」という単純な変更が、複数の場所に散らばります。

**コロケーション型（本アーキテクチャ）:**

```
src/components/home/
├── home-header.tsx              ← Server Component（ヘッダーUI）
├── home-tabs.tsx                ← Client Component（タブ切り替え）
├── usage-guide-content.tsx      ← Client Component（ガイド内容）
├── home.logic.ts                ← ビジネスロジック
└── index.ts                     ← @barrel-type: mixed（公開API）

```

**home 機能に関するすべてが `home/` フォルダに集約されています。**
修正が必要なファイルの場所が絞られます。

### 2.2 ファイル命名規則

コロケーションをさらに効果的にするため、ファイルの役割を名前で表現します。

| サフィックス | 役割 | 例 |
|------------|------|-----|
| `.view.tsx` | 純粋なUIの表示 | `home-header.view.tsx` |
| `.container.tsx` | データ取得・状態管理の統括 | `values.container.tsx` |
| `.logic.ts` | ビジネスロジック・データ変換 | `home.logic.ts` |
| `.hook.ts` | カスタム React Hook | `profile-dashboard.hook.ts` |
| `.types.ts` | 型定義 | `profile-creation.types.ts` |
| `.constants.ts` | 定数 | `values-edit-tabs.constants.ts` |
| `.storage.ts` | ローカル永続化 | `matching.storage.ts` |
| `index.ts` | 公開 API（バレル） | `home/index.ts` |

この規則により、ファイル名を見ただけで**そのファイルの責務**がわかります。

---

## 3. バレルインポート ― ミニアプリの「窓口」

### 3.1 バレルインポートとは

バレルインポート（Barrel Export / Import）とは、複数のモジュール（ファイル）の書き出し（export）を1つのファイル（主に`index.ts`や`index.js`）に集約し、外部から一括でインポートできるようにする設計パターンです。

* **メリット:** 呼び出し側のインポート文のパスが簡潔になり、コードの見通しが良くなります。
* **デメリット:** 開発規模が大きくなると、未使用のコードまで読み込まれる「ツリーシェイキング（不要コードの除去）」の妨げになり、ビルドサイズやパフォーマンスが悪化する原因になることがあります。


各ミニアプリフォルダに置かれた `index.ts` は、そのミニアプリの**公開 API**として機能します。

```typescript
// src/components/home/index.ts
// @barrel-type: mixed
export { HomeHeader } from "./home-header/home-header";
export { HomeTabs } from "./home-tabs/home-tabs";
export { UsageGuideContent } from "./usage-guide-content/usage-guide-content";
```

```typescript
// src/app/(protected)/(1-core)/home/page.tsx
import { HomeHeader, HomeTabs } from "@/components/home"; // バレル経由でインポート
```

### 3.2 バレルインポートが生む「境界」

バレルインポートの最大の価値は、**ミニアプリの内部実装を隠蔽すること**です。

```
外部から見えるもの（index.ts が公開したもの）
    ↓
@/components/home  →  HomeHeader, HomeTabs, UsageGuideContent

外部から隠れるもの（内部実装）
    ↓
home/home-header/home-header-icon.tsx
home/home-tabs/home-tabs-skeleton.tsx
home/home.logic.ts  の内部関数
```

この境界があることで：
- 内部実装を変更しても、外部への影響を最小化できる
- 「このミニアプリが何を提供しているか」が `index.ts` を見れば把握できる
- **AI への指示範囲を明確に限定できる**（後述）

### 3.3 バレル型注釈システム

barrel ファイルに、以下の型注釈を付与しています。

```typescript
// src/components/home/index.ts
// @barrel-type: mixed        ← Server Component と Client Component が混在
```

```typescript
// src/components/auth/anonymous-login-form/index.ts
// @barrel-type: client       ← Client Component のみ
"use client";
export { AnonymousLoginForm } from "./anonymous-login-form";
```

```typescript
// src/components/admin/index.ts
// @barrel-type: server        ← Server Component のみ
export { AdminGroupPanel } from "./group-panel";
```

三種類の分類：

| 型 | 意味 |
|----|------|
| `server` | Server Component のみ |
| `client` | Client Component のみ（`"use client"` 付き） |
| `mixed` | 両方が混在（要注意） |

---

## 4. Next.js App Router との統合

### 4.1 `app/` は薄く保つ

```typescript
// src/app/(protected)/(core)/home/page.tsx
// ビジネスロジックは components/ にある

import { HomeHeader } from "@/components/home";
import { HomeTabs } from "@/components/home";
import { RootAccountCompletionPrompt } from "@/components/root-account";

export default async function HomePage() {
  return (
    <div>
      <HomeHeader />
      <HomeTabs />
      <RootAccountCompletionPrompt />
    </div>
  );
}
```

`page.tsx` はミニアプリのコンポーネントを**組み合わせるだけ**です。
「このページに何のミニアプリが乗っているか」が、数行のコードで表現されます。

### 4.2 Route Group による関心の分離

```
src/app/(protected)/
├── (core)/          ← コアUX（例えば ホーム、プロフィール、設定）
├── (connections)/   ← つながり機能（例えば マッチング、比較）
├── (places)/        ← 場所・コミュニティ
└── (data-inputs)/   ← データ入力（例えば 価値観、スキル、作品）
```

Route Group はルーティングに影響しませんが、**機能の意図を表現**します。
「これは入力系のページ群だ」という文脈が、フォルダ構造から読み取れます。

### 4.3 バレル×Client境界の問題と解決

Next.js App Router の Server Component / Client Component 分離は強力ですが、バレルインポートと組み合わせると落とし穴があります。

**問題:** `mixed` barrel（Server と Client が混在）を Server Component から import すると、Turbopack の import trace エラーが発生することがある。

```
Error: You're importing a component that needs "use client", but none of its
parents are marked with "use client", nor are they Server Components.
```

**今回の解決策:**

1. **Hook ファイル に `"use client"` を追加**

2. **全 barrel に `// @barrel-type` 注釈を追加**
   どの barrel が mixed なのかを把握しやすくした。

3. **CLIENT barrel に `"use client"` を barrel レベルで追加**
   Client のみの barrel は barrel 自体にも `"use client"` を付与して境界を明示。

4. **ESLint ルールで将来の違反を防止**
   `src/app/**/page,layout` から `mixed` barrel を import した際に警告。

---

## 5. テスト駆動開発（TDD）との組み合わせ

### 5.1 コロケーションはテストも同居させる

```
src/components/home/
├── home-header.tsx
├── home-header.test.tsx         ← テストも同じフォルダ
├── home-tabs.tsx
├── home-tabs.test.tsx           ← テストも同じフォルダ
├── home.logic.ts
├── home.logic.test.ts           ← ロジックのユニットテスト
└── index.ts
```

テストファイルは実装ファイルの**隣**に配置します（コロケーション）。
「このファイルにテストがあるか」を確認するために、別のフォルダを探す必要はありません。

### 5.2 RGR サイクル × ミニアプリ境界

TDD の Red → Green → Refactor サイクルは、ミニアプリ境界と相性が良いです。

```
1. Red: ミニアプリの仕様をテストで記述
   → "HomeTabs がタブ切り替えを動作させる" のテストを書く

2. Green: 最小限の実装でテストを通す
   → home-tabs.tsx に実装

3. Refactor: ミニアプリ内部をリファクタリング
   → 外部（index.ts）への影響なしに内部を整理できる
```

**ミニアプリの境界（= index.ts）を守ることで、リファクタリングの影響範囲が限定されます。**

### 5.3 テストファイルの種類

| 種類 | 対象 | ツール |
|------|------|--------|
| Unit Test | `.logic.ts`, `.hook.ts` の関数単位 | Vitest |
| Component Test | `.view.tsx`, `.container.tsx` の UI 単位 | Vitest + Testing Library |
| Integration Test | `page.tsx` 相当の画面統合 | Vitest |
| E2E Test | ユーザーシナリオ全体 | Playwright |

---

## 6. AI 協働開発での活用

### 6.1 AI への指示範囲の限定

実際に使っていて効果を実感しやすいのが、GitHub Copilot への指示精度の変化です。

バレルがない状態で「ホーム画面のタブを修正して」と指示すると、AI はアプリ全体のコードを参照対象にしがちで、関係ないファイルへの変更が提案されることがあります。

バレルがある状態では、「`src/components/home/` を修正して。公開 API は `home/index.ts`」という形で指示できます。AI に渡すコンテキストを人間側が意図的に絞れるようになります。

### 6.2 ミニアプリ単位での AI 活用パターン

```
パターン1: 新機能開発
  "src/components/matching/ 配下に、
   新しいフィルター機能を追加して。
   index.ts に MatchingFilter を export して"

パターン2: バグ修正
  "src/components/values/value-history-timeline/ の
   タイムライン表示が正しく動かない。
   このフォルダ内だけで解決して"

パターン3: テスト追加
  "src/components/profile-display/profile-dashboard.hook.ts の
   テストが不足している。
   同じフォルダにテストファイルを追加して"
```

**指示の「スコープ」が明確なので、AI は的外れな変更をしにくくなります。(重要)**

### 6.3 AI が理解しやすいコードとは

AI（LLM）は大量のコードを一度に処理するのが得意ですが、**文脈が曖昧だと精度が下がります。**

このアーキテクチャが 人間 と AI との協働に向いている理由：

| 特徴 | AI への恩恵 |
|------|------------|
| ファイル命名規則が一定 | `.hook.ts` = Hook、`.logic.ts` = ロジックと即座に判断できる |
| `index.ts` で公開 API が明示 | 「何を使って良いか」を理解しやすい |
| テストが隣にある | テストを参照して実装の意図を把握できる |
| `@barrel-type` 注釈 | Server/Client 境界を誤らない |
| フォルダ = 機能単位 | 指示の「どこを修正するか」が自然言語と一致 |

これは人間もAIも両者とも理解しやすいように、範囲を限定することが主な目的です。

---

## 7. 設計原則のまとめ

今回のアーキテクチャが拠り所にしている設計原則を整理します。

### 原則 1: 凝集度を高める

同じ目的のコードは同じ場所に置く（コロケーション）。
「ホーム画面に関するものはすべて `home/` に」という単純なルール。

### 原則 2: 結合度を下げる

ミニアプリ間の依存は `index.ts` を経由させる。
深い import（`@/components/home/home-tabs/home-tabs-skeleton`）は禁止。

### 原則 3: 境界を明示する

`index.ts` はミニアプリの**契約（API）**。
`"use client"` / `@barrel-type` は**境界の宣言**。

### 原則 4: 小さく保つ

1 ファイル 500 行を超えたら責務分割を検討。
大きなミニアプリは小さなミニアプリに分割する。

### 原則 5: AI に説明しやすい構造にする

「このフォルダが何をするのか」を自然言語で説明できる構造。
命名規則・注釈・テストが「コードの意図を伝えるドキュメント」として機能する。

---

## 8. 実践での注意点

### 8.1 `mixed` barrel は技術的負債

`@barrel-type: mixed` は「Server Component と Client Component が同じ barrel に混在している」状態です。
これは即座に問題を起こすわけではありませんが、スケール時のリスクになります。

**推奨する対処:** 新規開発時は最初から Server 専用・Client 専用のファイルを分けて作る。

### 8.2 バレルを分割しない

> `index.server.ts` / `index.client.ts` への分割は**あえて行いません。**

理由：
1. バレルはミニアプリの**単一の窓口**であることに価値がある
2. 分割すると「どちらから import するか」という新たな認知負荷が生まれる
3. `@barrel-type: mixed` + ESLint ルールで十分な安全性が確保できる

バレルインポートの「AI への指示範囲の限定」という機能を守るために、**1 ミニアプリ = 1 barrel** の原則を維持します。

### 8.3 Sandbox → 本番昇格のフロー

新機能は `src/components/sandbox/` で開発し、完成したら本番パスへ昇格させます。

```
開発フロー:
  1. src/components/sandbox/new-feature/ で実装・テスト
  2. テストが通り、品質基準を満たしたら昇格
  3. src/components/new-feature/ へ移動
  4. sandbox の barrel export を削除
  5. 本番の barrel (index.ts) に追加
```

Sandbox を使うことで、**本番コードを汚染せずに実験できます。**

---

## 9. 技術スタック全体像

```
┌─────────────────────────────────────────────────────┐
│                  Next.js 16 (App Router)             │
│  src/app/  ← ルーティング専用（薄い）                  │
└──────────────────┬──────────────────────────────────┘
                   │ import（バレル経由）
┌──────────────────▼──────────────────────────────────┐
│             src/components/  ← ミニアプリ群           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  home/   │ │ values/  │ │ skills/  │  ...       │
│  │ index.ts │ │ index.ts │ │ index.ts │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
         │ TypeScript + Tailwind CSS
         │ Better Auth（認証）
         │ Drizzle ORM（DB）
         │ Vitest（テスト）
         │ Supabase / Postgres（データストア）
```

---

## おわりに

アプリが大きくなっても、一度に理解しなければならない範囲が広がらない設計にしたいというのが出発点でした。

ページ単位ミニアプリの集合体というアーキテクチャは、その一つの答えです。「今日触るのは `home/` だけ」という集中ができるし、しばらく離れていたコードに戻ってきても、フォルダを開けば構造がわかります。

AI への指示も同様で、フォルダとバレルという境界を明示すると、提案の的外れ感が減ります。AI が賢くなったわけではなく、人間がコンテキストを絞りやすい構造になっているだけです。それで十分だと思っています。

`@barrel-type` 注釈も、問題が起きてから事後的に追加しました。完成した設計ではなく、実開発の中で少しずつ整理されてきたものです。

---

## 参考リンク

- [Next.js App Router ドキュメント](https://nextjs.org/docs/app)
- [Colocation パターンについて（Next.js 公式）](https://nextjs.org/docs/app/getting-started/project-structure#colocation)
- [AI駆動開発の手法「大きな石開発」（Qiita）](2025/2025-06-04_GitHubCopilot_Next.js_Supabase_88d91559b9a111389b15.md)
- [コンポーネントコロケーションパターン（Qiita）](_posts/2023/2023-06-03_component_collocation_pattern.md)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vitest](https://vitest.dev/)


※人間で言うと背骨に当たる部分
認証やセキュリティは大きな石(Next.js)を決めた後に一番に作り込んでおきます。

※吊り橋開発
吊り橋は向こう岸に細いロープを渡してそれをだんだん太くしていきます。
最初に最低限動くだけのものを作っておくという発想です。
Next.js 認証 セキュリティ データの入出力 DB ORM CRUD デプロイ等最小限の実装を完動まで作り込んでから実際の開発を始める。

※逆レビュー
自分はAIに情報を与えるほど正確に実装をしてもらえると考えています。
逆に、現在実装しているコードをAIに見てもらうということは現在のアプリのデータを正確に渡しているということですから、何が足りてないか、何が余計かを正確に見てもらえるということです。
自分の理想や目的と現在のコードをAIでレビューすることでどうすればいいかわかってきます。

※人間能力の中でAIよりも早いもの
人間の想像力は瞬時に成果物を想像できる
AIは物理的にコードを出力する必要がある、出来上がるのは未知だ
これを利用して設計書をじっくりと時間をかけて書く、正しい情報を必要な量だけ用意するようにする。
「これによってAIに出力させて、それを更にAIで修正というのを減らす」



## プロンプトのちょっとしたIME単語登録

調査と修正をお願いします。

なにかアドバイスあればください。

推奨度と理由付きで選択肢を出してください。

---

Tipsを出してもらうように基礎プロンプトファイルに仕込む