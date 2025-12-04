<!--
title:   GitHub Copilotエディタを使ってUI/UXの作成 (Shadcn/UIとデジタル庁のデザインシステムで作成👈️相性が良い) Next.js用
tags:    GitHubCopilot,shadcn,shadcnui,デザインシステム,デジタル庁
id:      2174182f182f2ff63167
private: false
-->
## 初めに
UI/UX には デザイン標準などの営業用の言葉と 実際にエンジニアがUIをどのようにコードをAIに生成させるかの2種類あるとします。 この記事はGitHub Copilotエディタを使ってNext.jsのUI/UXをAIで作成する方法です。

## 使い方
作成した指示書を読み込んでくれる場所(VSCodeで設定する)に指示書ファイルを置きます。

現在の設定
 指示書は`.github/instructions` の下に置きます。

ビーストモードを使うと１回のチャットで、現在実装済みの全てのUIを見つけて最後まで適用してくれるはず。

https://qiita.com/masakinihirota/items/10a9fb85bd04d885d0b5

### GitHub Copilotのチャット欄での使用例

GitHub Copilotに指示します。

チャット1
`チャット
ログインフォームを作成してください。
デジタル庁デザインシステムの指示書（.github/instructions/dads-ui-instruction.md）と
参照コンポーネント（src/components/dads-reference/）を参考にしてください。

```

チャット2
```チャット
`.github/instructions/dads-ui-instruction.md` を読んで現在利用している全てのUIに適用させてください。

```

※ビーストモード用 ある程度UIがあると一つづつ適用させる指示は大変ですので、ビーストモードを採用しVSCodeのYOLOモードを設定すると、 1回の指示ですべてのUIに適用してくれます。
「全てのUI」と指定するところがポイントです。
最新のAIエディタならアプリ全体を見ているので、全部と指定するとWebアプリのリポジトリを検索して見つけ出してくれます。

チャット3

指示書が複数に別れていたら、ドラッグアンドドロップでチャット欄に渡して、それから下記のプロンプトで実行する。

```チャット
現在のWebアプリで使用されている全てのUIが指示通りになっているかをチェックをしてください。もし指示に従ってなかったら修正をお願いします。

```


## 使用しているAIエディタ
GitHub Copilot
Antigravity
でUIの実装方法を調べる
外部Webサービスは使わず

## 採用技術
Next.js 15
Tailwind CSS v4
Shadcn/UI

## 調査
基本的にはShadcn/uiとデジタル庁のデザインシステムを利用します。

AIを利用して調査

```
デジタル庁デザインシステム調査

## Plan: デジタル庁デザインシステム導入プラン

現在のプロジェクト（Next.js 15 + Tailwind CSS v4 + Shadcn/UI）に、デジタル庁デザインシステム（DADS）を導入し、AIがプロジェクトのUI作成時に参照できる仕組みを構築します。目標は「アクセシビリティ重視」「日本の行政標準に準拠したデザイン」をAIに指示するためのプロンプトと参照リソースを整備することです。

### Steps

1. **デジタル庁Tailwindプラグインをインストール**: `@digital-go-jp/tailwind-theme-plugin` をプロジェクトに追加し、`globals.css` で `@plugin '@digital-go-jp/tailwind-theme-plugin'` を設定
2. **Reactコンポーネントサンプルをプロジェクトに配置**: `digital-go-jp/design-system-example-components-react` リポジトリから必要なコンポーネントソースコードを `src/components/dads/`ディレクトリにコピー
3. **AI用指示書（プロンプト）を作成**: `.github/instructions/dads-ui-instruction.md` にデジタル庁デザインシステムの使用ルール・参照パス・コーディング規約を記述
4. **Shadcn/UIとの共存ルールを定義**: 既存の `src/components/ui/` コンポーネントとDADSコンポーネントの使い分けガイドラインを作成
5. **デザイントークン対応表を作成**: 既存のCSS変数（oklch系）とDADSトークンのマッピングドキュメントを整備

---

**💡 Tips & アドバイス**:
- DADSは **MITライセンス** なので商用利用・改変は自由です
- `aria-disabled` パターンなど、アクセシビリティのベストプラクティスがコンポーネントに組み込まれています
- Storybookが公開されているので、導入前に [https://design.digital.go.jp/dads/react/](https://design.digital.go.jp/dads/react/) でコンポーネントの動作確認ができます

```



```
## Shadcn/UI と デジタル庁デザインシステムの関係性

### Shadcn/UI の特徴

Shadcn/UI は**「デザインシステム」ではなく「コンポーネントコレクション」**です：

| 特徴 | 説明 |
|------|------|
| **スタイルなしのベース** | 機能的なコンポーネント（ボタン、フォーム等）の骨組みを提供 |
| **Radix UI ベース** | アクセシビリティ対応のヘッドレスUIライブラリ上に構築 |
| **カスタマイズ前提** | CSS変数でスタイルを自由に上書きする設計 |
| **デザイン思想は含まない** | 色・タイポグラフィ・余白のルールは含まれていない |

### デジタル庁デザインシステム（DADS）が補完できる部分

| DADSが提供するもの | Shadcn/UIに欠けているもの |
|-------------------|-------------------------|
| **カラーパレット** | ブランドカラー・セマンティックカラーの定義 |
| **タイポグラフィ規則** | フォントサイズ・行間・フォントファミリーの体系 |
| **アクセシビリティ基準** | WCAG準拠の具体的なガイドライン |
| **余白・グリッドシステム** | スペーシングの一貫したルール |
| **日本語最適化** | Noto Sans JP等、日本語フォントの設定 |

### 結論：非常に良い組み合わせ

```

Shadcn/UI（機能・構造） + DADS（デザイン・ルール） = 完全なUIシステム

```
**具体的な統合方法**:
1. **DADSのTailwindプラグイン** → カラー・タイポグラフィのトークンを導入
2. **Shadcn/UIのコンポーネント** → そのまま使用し、DADSトークンでスタイル上書き
3. **DADSにしかないコンポーネント** → DADSからコピーして追加

この組み合わせにより、Shadcn/UIの**使いやすさ・拡張性**を維持しながら、DADSの**日本の行政標準に準拠したデザイン品質とアクセシビリティ**を得られます。

---

**推奨方針**: **Shadcn/UIを維持しつつ、DADSのデザイントークン（カラー・タイポグラフィ・余白）を上書き適用**

これが最も効率的で、既存のコンポーネント資産を活かしながらデザイン品質を向上できます。

```

必要なコンポーネントは適宜取得します。
作成された指示書

```.github/instructions/dads-ui-instruction.md
---
applyTo: "src/components/**,src/app/**"
---

# デジタル庁デザインシステム（DADS）UI実装指示書

このプロジェクトでは、**Shadcn/UI（コンポーネント構造）** + **デジタル庁デザインシステム（デザイントークン）** の組み合わせでUIを構築します。

## 概要

- **デザインシステム**: デジタル庁デザインシステム（DADS）v2.9.0
- **公式サイト**: https://design.digital.go.jp/
- **ライセンス**: MIT License - Copyright (c) 2025 デジタル庁
- **Storybook**: https://design.digital.go.jp/dads/react/

## 参照リソース

| リソース | パス / URL |
|---------|-----------|
| **コンポーネント実装例** | `src/components/dads-reference/` |
| **Tailwindプラグイン** | `@digital-go-jp/tailwind-theme-plugin` |
| **公式ドキュメント** | https://design.digital.go.jp/ |

## デザイン原則

### 1. アクセシビリティファースト

- **WCAG 2.1 AA準拠**を必須とする
- **`disabled` 属性は使用しない** → 代わりに `aria-disabled="true"` を使用
  - 理由: スクリーンリーダーでも要素にフォーカスでき、なぜ無効なのかを伝えられる
- コントラスト比 **4.5:1 以上**を厳守
- フォーム要素には必ず **`aria-describedby`** でエラーメッセージやサポートテキストを関連付ける

\```tsx
// ❌ Bad: disabled 属性を使用
<button disabled>送信できません</button>

// ✅ Good: aria-disabled を使用
<button aria-disabled="true">送信できません</button>

\```

### 2. タイポグラフィトークン

DADSのタイポグラフィトークンを使用する。形式: `text-{種類}-{サイズ}{ウェイト}-{行間}`

| 用途 | トークン | 説明 |
|------|---------|------|
| 標準テキスト | `text-std-16N-170` | 16px, normal, 行間170% |
| 標準テキスト（太字） | `text-std-16B-170` | 16px, bold, 行間170% |
| 見出し | `text-std-24B-150` | 24px, bold, 行間150% |
| 大見出し | `text-std-32B-150` | 32px, bold, 行間150% |
| 密なテキスト | `text-dns-16N-130` | 16px, normal, 行間130% |
| アウトラインテキスト | `text-oln-16N-100` | 16px, normal, 行間100% |
| アウトラインテキスト（太字） | `text-oln-16B-100` | 16px, bold, 行間100% |

**フォントファミリー**: `font-sans`（Noto Sans JP）

### 3. カラーパレット

| 用途 | トークン | 説明 |
|------|---------|------|
| **プライマリ** | `bg-blue-900`, `text-blue-900` | メインアクション、リンク |
| **プライマリホバー** | `bg-blue-1000`, `text-blue-1000` | ホバー状態 |
| **プライマリアクティブ** | `bg-blue-1200`, `text-blue-1200` | アクティブ状態 |
| **エラー** | `bg-error-1`, `text-error-1` | エラー状態 |
| **エラーホバー** | `bg-red-1000`, `text-red-1000` | エラーホバー |
| **成功** | `bg-success-1`, `text-success-1` | 成功状態 |
| **成功ホバー** | `bg-green-1000`, `text-green-1000` | 成功ホバー |
| **グレー（テキスト）** | `text-solid-gray-800` | 本文テキスト |
| **グレー（補助）** | `text-solid-gray-600` | サポートテキスト |
| **グレー（無効）** | `text-solid-gray-420` | 無効状態テキスト |
| **グレー（背景）** | `bg-solid-gray-50` | 無効状態背景 |
| **ボーダー** | `border-solid-gray-600` | 標準ボーダー |
| **フォーカス** | `ring-yellow-300`, `outline-black` | フォーカスリング |

### 4. フォーカススタイル

すべてのインタラクティブ要素に以下のフォーカススタイルを適用:

\```css
focus-visible:outline focus-visible:outline-4 focus-visible:outline-black
focus-visible:outline-offset-[calc(2/16*1rem)]
focus-visible:ring-[calc(2/16*1rem)] focus-visible:ring-yellow-300

\```

### 5. 角丸（Border Radius）

| サイズ | トークン | 用途 |
|--------|---------|------|
| 4px | `rounded-4` | 極小要素 |
| 6px | `rounded-6` | 小さいボタン |
| 8px | `rounded-8` | 標準的なボタン、入力フィールド |
| 12px | `rounded-12` | 大きな要素 |
| 16px | `rounded-16` | カード、バナー |

## 実装ルール

### Shadcn/UIコンポーネントのスタイル上書き

既存のShadcn/UIコンポーネントを使用する際、クラス名をDADSトークンで上書きする:

\```tsx
// 例: Shadcn/UIのButtonをDADSスタイルで上書き
import { Button } from '@/components/ui/button';

<Button
  className="bg-blue-900 text-white text-oln-16B-100 rounded-8 min-h-14 px-4 py-3
             hover:bg-blue-1000 hover:underline
             active:bg-blue-1200
             focus-visible:outline focus-visible:outline-4 focus-visible:outline-black
             focus-visible:outline-offset-[calc(2/16*1rem)]
             focus-visible:ring-[calc(2/16*1rem)] focus-visible:ring-yellow-300"
>
  送信する
</Button>

\```

### 新規コンポーネント作成時

1. まず `src/components/dads-reference/` の実装例を確認
2. アクセシビリティ属性（aria-*）を必ず含める
3. DADSのデザイントークンを使用
4. フォーカススタイルを必ず実装

### フォーム要素の実装パターン

\```tsx
import { Label, SupportText, ErrorText, Input } from '@/components/dads-reference';

// フォームフィールドの基本構成
const FormField = () => {
  const formId = React.useId();
  const supportTextId = React.useId();
  const errorTextId = React.useId();
  const hasError = true; // バリデーション状態

  // エラー時は errorTextId を先に、supportTextId を後に
  const describedBy = hasError
    ? `${errorTextId} ${supportTextId}`
    : supportTextId;

  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={formId}>
        メールアドレス
        <RequirementBadge>※必須</RequirementBadge>
      </Label>
      <SupportText id={supportTextId}>
        確認メールを送信します
      </SupportText>
      <Input
        id={formId}
        name="email"
        type="email"
        aria-describedby={describedBy}
        isError={hasError}
      />
      {hasError && (
        <ErrorText id={errorTextId}>
          ＊正しいメールアドレスを入力してください
        </ErrorText>
      )}
    </div>
  );
};

\```

### ボタンのバリエーション

\```tsx
// 塗りボタン（プライマリアクション）
<Button variant="solid-fill" size="lg">送信する</Button>

// アウトラインボタン（セカンダリアクション）
<Button variant="outline" size="md">キャンセル</Button>

// テキストボタン（補助的なアクション）
<Button variant="text" size="sm">詳細を見る</Button>

// 無効化されたボタン
<Button variant="solid-fill" size="lg" aria-disabled={true}>
  送信できません
</Button>

\```

## 参照ファイル一覧

| コンポーネント | 参照パス | 用途 |
|---------------|---------|------|
| Button | `src/components/dads-reference/Button.tsx` | ボタン（3種類のバリアント） |
| Input | `src/components/dads-reference/Input.tsx` | テキスト入力 |
| Label | `src/components/dads-reference/Label.tsx` | フォームラベル |
| Select | `src/components/dads-reference/Select.tsx` | セレクトボックス |
| Checkbox | `src/components/dads-reference/Checkbox.tsx` | チェックボックス |
| Radio | `src/components/dads-reference/Radio.tsx` | ラジオボタン |
| ErrorText | `src/components/dads-reference/ErrorText.tsx` | エラーメッセージ |
| SupportText | `src/components/dads-reference/SupportText.tsx` | サポートテキスト |
| Textarea | `src/components/dads-reference/Textarea.tsx` | テキストエリア |

## 重要な注意事項

1. **`disabled` は使わない**: すべてのフォーム要素で `aria-disabled` を使用する
2. **id と aria-describedby の紐付け**: エラーメッセージ、サポートテキストは必ず id を持ち、入力要素と紐付ける
3. **フォーカス表示**: キーボード操作時のフォーカス表示を必ず実装する
4. **コントラスト**: テキストと背景のコントラスト比 4.5:1 以上を確保する
5. **日本語フォント**: Noto Sans JP を使用する（`font-sans`）

## ブレークポイント

| 名前 | サイズ | 用途 |
|------|--------|------|
| default | - | モバイル |
| `desktop:` | 48em (768px) | デスクトップ |
| `desktop-admin:` | 62em (992px) | 管理画面 |

\```tsx
// レスポンシブの例
<div className="px-4 desktop:px-8">
  <Button size="md" className="desktop:size-lg">
    送信
  </Button>
</div>

\```

```
