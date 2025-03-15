<!--
title:   第二版 VSCode の Rules for AI 全体のルール設定 翻訳 GitHub Copilot
tags:    githubcopilot
id:      247bee4bd66ace86e1da
private: true
-->
注意:
この記事はGitHub Copilotの指示書の自分なりの使い方です。

GitHub Copilot指示書は3種類あり
1. VSCodeの指示書
2. 静的な指示書
3. 動的な指示書
と番号を振ってあります。

👆記事内では1番目、2番目、3番目とします。



----------------------------------------

# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

※第一版に相当する VSCodeのRules for AI 全体のルール設定 翻訳 GitHub Copilotも合わせてご覧ください。



----------------------------------------

# 用語

* 指示書(独自)

英語では custom instructions file

この記事ではGitHub Copilot に指示をするファイルを指示書と呼びます。
GitHub Copilotには3種類の方法での指示書が設定できます。
ルールが被ってしまうと管理が大変なので目的別に指示書を使い分けます。



* プロンプトファイル

目的や、機能ごとにGitHub Copilotに読み込ませる指示書です。

この記事では3番目に当たります。
動的な指示書と位置づけています。

以前は指示書全部をプロンプトファイルとしていましたが、
今回のアップデートから目的別に指示を出す動的な指示書をプロンプトファイルと呼んでいます。



* リポジトリ

Webアプリケーションのソースコードや関連ファイルを管理するための保管場所です。
Gitバージョン管理システムを用いて、変更履歴の追跡や共同開発を容易にします。



----------------------------------------

# GitHub Copilotの指示書とは

GitHub Copilot in VS Code
https://code.visualstudio.com/docs/copilot/overview

Custom instructions for GitHub Copilot in VS Code
https://code.visualstudio.com/docs/copilot/copilot-customization

GitHub Copilotには事前に設定しておく
指示書があります。

詳しくは

VSCode の Rules for AI 全体のルール設定 翻訳 GitHub Copilot #githubcopilot - Qiita
https://qiita.com/masakinihirota/items/1694715063247574467d

👆この記事ではVSCodeに設定する指示と、リポジトリに設定する指示のかなりの部分が被っています。

👆この記事以降にプロンプトファイルという機能が追加されました。

以前は実質1つのみでしたが
(VSCode本体に書くか、リポジトリ直下に書くか)

3つ目の指示書、プロンプトファイルの導入で
静的(固定)なルール
動的なルール
を使い分けるという意味で、さらに柔軟な運用ができるようになりました。

今回はGitHub Copilotの指示書が3種類になったので、目的別にルールを使い分けてみます。





## 現在のGitHub Copilotの指示書の種類

3種類あります。

3種類を使い分けるとしたら
1. 固定のルールをVSCode本体(settings.json)に書きます。
2. リポジトリ全体のルールをcopilot-instructions.mdに書きます。
3. 個別の機能や目的のルールはプロンプトファイルに書きます。

1の固定のルールとはVSCodeを使う時に毎回必ず守ってもらうルール。

2のリポジトリ全体のルールとはそのリポジトリで使う全体のルール

3の開発者の目的を明確に伝えるための指示書になります。
(毎回設定を全部読み込ませると、GitHub Copilotの提案がぼやけてしまうため。)


## 指示書のファイルの種類

1. VSCodeの設定settings.jsonファイル内
2. copilot-instructions.md
3. プロンプトファイル

これを使い分けて利用します。

### VSCode側の設定

settings.json

1のsettings.jsonファイル内は通常のVSCodeの設定を開いて指示を追加できます。
自然言語とファイル名を指定できます。

これをVSCodeを使う上で必ず使う指示を書きます。

例
常に日本語で分かりやすい言葉を選び、丁寧な表現を心がけます。
語尾を「にゃー」をつけてください。



### GitHub Copilot側の設定

```
copilot-instructions.md
.copilot-codeGeneration-instructions.md
.copilot-test-instructions.md
.copilot-review-instructions.md
.copilot-commit-message-instructions.md

```

※デフォルト設定名

それぞれ
コード生成用の指示書
テスト用の指示書
レビュー用の指示書
コミットメッセージ用の指示書

2 copilot-instructions.md このファイルはリポジトリのルート直下の.github内に置くよう定められています。

リポジトリ全体に影響を与えるルールを書きます

例
TypeScript、Node.js、Next.js (App Router)、React、Shadcn UI、Radix UI、Tailwind CSS、Zustand、Supabase、Zod、Stripeのエキスパートとして振る舞います。"
Next.js 15 を使います。
App routerを使います。
Supabaseを使います。
Honoを使います。
Stripeを使います。
Storybookを使います。
vitestを使います。

※できればツールのバージョンも指定します。
まとめてお願いすると聞いてもらえない場合があります。

3 プロンプトファイルは、ワークスペースの `.github/prompts` ディレクトリに 拡張子 `*****.prompt.md` のファイルを作成します。



----------------------------------------

# 指示書の使い分け

1. 固定ルールを `settings.json`
2. 全体静的ルールを `copilot-instructions.md`
3. 個別動的ルールを プロンプトファイル

固定ルールにはVSCodeの基本的なルールを書きます。
全体ルールにはリポジトリ単位のルールを書きます。
個別動的ルールは目的、機能単位にルールを書きます。
👆このように使い分けます。



----------------------------------------

# 指示書のためのリポジトリを作成

※GitHub Copilotはインストール、有効化済みとします。
※GitHub CLIがインストール済み
`ghコマンド` が使えるようになります。

## VSCode Insidersのインストール(スキップ可)

GitHub Copilot Agent modeは
VSCode Insidersでのみ使用できます。
(VSCodeの先行試験バージョン)
現在:2025年3月14日時点

Download Visual Studio Code Insiders
https://code.visualstudio.com/insiders/

Agent modeを使用したい場合は、インストールしておきます。

### GitHub Copilot Agent modeを有効化の確認

GitHub Copilotのエージェントモードを使ってみた #AI - Qiita
https://qiita.com/kei1-dev/items/e6b0ead5f24de35e30ed



## プロンプトファイルの有効化

GitHub Copilot のリポジトリ カスタム命令を追加する - GitHub Docs
https://docs.github.com/ja/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

VSCodeの設定

```settings.json
	"chat.promptFiles": true,

```

👆を追加します。



## 開発用のリポジトリの作成

開発するためにgitのリポジトリを作ります。

👇今回はスターターを使います。

nextjs/saas-starter: Get started quickly with Next.js, Postgres, Stripe, and shadcn/ui.
https://github.com/nextjs/saas-starter

### スターターのインストール

```terminal
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install

```

👆このスターターで使っている技術を洗い出します。

uithub というサービスでAIに聞くと便利です。
uithub はリポジトリを1ファイルにするWebサービスです。

Easily Ask Your LLM Coding Questions
https://uithub.com/

※似たようなサービスはかなりあります。

このURLをNotebookLMに読み込ませることで、そのリポジトリの解説が出来るようになります。

URLで登録しておくことで、NotebookLMの情報をいちいち手動で更新する必要がなくなります。


## 技術選定

次に技術選定をしておきます。
スターターで使用している技術
スターターに追加したい技術
を選んでおきます。

### 使用ツール、ライブラリ

例
Next.js
Supabase
Drizzle ORM
Hono API
Shadcn/UI
TailwindCSS

### テストツール

例
vitest
Storybook
テストケースは日本語で書く

### アカウント作成
Supabase(一部無料、有料)
Stripe(一部無料、有料)

※小さいアプリ、もしくはテストだけならば無料で使えます。



## 開発用のリポジトリにツールの追加(スキップ可)

自分の使いたいツールやライブラリを追加

例
Honoなど

<details><summary>(省略)ローカルの開発環境設定</summary>

※👇基本的の素のスタータでも指示書の書き方は同じです。
自分独自の追加ツールを組み合わせてください。

ここからの環境設定は各自違うので、自分の場合を大まかに書いておきます。
詳細は私のQiita記事を御覧ください。

これをわざわざ書く目的は、
自分が十二分に使い倒しているツールや
技術などは
AIに指示するよりも
手動でインストールしたほうが早いからです。

そして手動でインストールして
基本的な使い方、
自分の使い方を
AIに教えるためでもあります。

例
DBはSupabaseを使う。
Drizzle ORMを使う。
APIはHonoを使う。

ツールを導入して、
いつも使っているコードの書き方も同時に書いておくと、AIも同コードを書いたほうがいいか理解してもらえます。

サンプルにもなります。

アーキテクチャ、フォルダ構造のサンプルにもなります。

例
コロケーション(一箇所にまとめておく考え方)を利用して、
1機能のコンポーネントのファイルは一箇所にまとめて置く。
	ビューコンポーネント(表示)
	ビジネスロジックコンポーネント(計算、アルゴリズム)
	フェッチコンポーネント(データの取得)
	テストファイル(ユニットテストvitest)
	ストーリファイル(Storybook)
をGitHub Copilotに教えます。


ローカルで開発するので、ローカルの開発環境を準備します。

URL

# ローカルの環境設定

スターターの\lib\db\setup.tsを参考にします。

## Stripeの設定

Step 1: Checking if Stripe CLI is installed and authenticated...
Step 3: Getting Stripe Secret Key
Step 4: Creating Stripe webhook...
今は行わない

# DBをSupabaseに変更

Step 2: Setting up Postgres

```terminal
stripe --version
stripe config --list

```

## ローカルのSupabase Dockerの立ち上げ

```terminal
supabase init
supabase start
supabase status

```

## 環境変数の設定

Step 5: Generating AUTH_SECRET...
Step 6: Writing environment variables to .env

```.env
？？？？？

```

アクセスの確認

ローカルのSupabaseの立ち上げ確認

</details>






省略するのは、スターターをカスタマイズして自分の慣れ親しんだツールを使い、それを指示書に教えるために必要ですが、ここをスキップしてもやることは同じだからです。

これでGitHub Copilotに与えるリポジトリの準備ができました。


----------------------------------------

ここからがメイン

# 具体的な指示書の作成

## 指示書の設定場所

### VSCodeのsettings.json

VSCodeの設定を開きます。

### copilot-instructions.md

リポジトリのルート直下

`.github/copilot-instructions.md`

を作成して指示を記入します。

```terminal
mkdir .github
touch .github/copilot-instructions.md

```

### プロンプトファイル

`.github/prompts/`フォルダを作成して、その中に置きます。

## 拡張子

```
*****.prompt.md

```

例

```terminal
mkdir .github/prompts/
touch .github/prompts/code-style.prompt.md
touch .github/prompts/comment-rule.prompt.md
touch .github/prompts/test-rule.prompt.md

```

👆GitHub Copilot公式ドキュメントでのファイル名

自分は、
コーディングスタイル
コメントルール
テストルールは
静的な指示書に書いたほうがいいと思います。

----------------------------------------

# 指示書の全体の配置

## 1. VSCode

settings.json

settings.json内に直接書くか、
指定したファイルを読み込みます。

## リポジトリ内

### 1. VSCodeに読み込ませる指示書

リポジトリ直下 or .github/直下
.copilot-codeGeneration-instructions.md
.copilot-test-instructions.md
.copilot-review-instructions.md
.copilot-commit-message-instructions.md

### 2. リポジトリ全体の指示書
.github/copilot-instructions.md

### 3. プロンプトファイル
.github/prompts/code-style.prompt.md
.github/prompts/comment-rule.prompt.md
.github/prompts/test-rule.prompt.md



----------------------------------------

# 1. VSCodeの指示書

固定(VSCode)の指示書
個人用のルールを書きます。

VSCodeのGitHub Copilotを使う上でずっと使い続けるルール

このファイルの指示の優先度は一番後回しにします。
※ルールが被った場合のため

## settings.jsonに登録する指示書の作成

```terminal
touch .copilot-codeGeneration-instructions.md
touch .copilot-test-instructions.md
touch .copilot-review-instructions.md
touch .copilot-commit-message-instructions.md

```

👆それぞれ
コード生成用の指示書
テスト用の指示書
レビュー用の指示書
コミットメッセージ用の指示書

※拡張子は `*****.md` です



## settings.json テンプレート

settings.json内で指示書を指定できます。
👇settings.json内の好きな場所に挿入してください。

```settings.json(一部)
// Customize GitHub Copilot in VS Code
 // https://code.visualstudio.com/docs/copilot/copilot-customization
 // テンプレート
 // 有効化(デフォルト)
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "github.copilot.chat.codeGeneration.instructions": [ // コード生成の設定です。
    {
      "file": ".copilot-codeGeneration-instructions.md"
    },
  ],
  "github.copilot.chat.testGeneration.instructions": [ // テストコード生成の設定です。
    {
      "file": ".copilot-test-instructions.md"
    },
  ],
  "github.copilot.chat.reviewSelection.instructions": [ // コードレビューの設定です。
   {
      "file": ".copilot-review-instructions.md"
    },
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [ //コミットメッセージ生成の設定です。
    {
      "file": ".copilot-commit-message-instructions.md"
    },
  ],

```

※👆ファイル指定式を採用しています。
指示は自然言語でも可能です。

自然言語で指示する場合は、

```settings.json
    {
      "text": "初心者にも分かりやすく説明します。"
    },

```

👆このように書きます。



## settings.json

それぞれの指示書に書きます。

### コード生成用の指示書

```.copilot-codeGeneration-instructions.md
# コード生成に関する指示

このファイルでは、GitHub Copilotがコードを生成する際に従うべき具体的な指示を定義します。

このファイルのルールの優先度は低いです。

## コード生成

* コードを書く前に既存のコードを深くレビューし動作を確認します。

* 正確な例を用いて、簡潔で技術的なTypeScriptコードを記述します。

* 宣言的なJSXを記述します。
* 関数型および宣言型のプログラミングパターンを使用し、クラスの使用は避けます。
* 補助動詞（`isLoading`、`hasError`など）を用いた説明的な変数名を使用します。
* ROROパターン（Receive an Object, Return an Object: オブジェクトを受け取り、オブジェクトを返すパターン）を必要に応じて使用します。
* エクスポートされたコンポーネント、サブコンポーネント、ヘルパー、静的コンテンツ、型でファイルを構成します。
* ディレクトリ名にはケバブケースを使用します（例：`components/personal-information`）。
* コンポーネントは名前付きエクスポートを使用します。
* コンポーネント名にはケバブケースを使用します（例：`my-component.tsx`）。
* 純粋な関数には `function` キーワードを使用します。
* 単純なステートメントには簡潔な構文を使用します。
* 条件文では不要な中括弧を避け、1行文では中括弧を省略します。
* セミコロンは省略します（ただし、文の曖昧さを避けるために必要な場合は使用します）。

## コメント

* コード例を示す際は、各行の目的を詳細なコメントで説明し、実行結果も示します。
* 複雑なロジックには明確で簡潔なコメントを付けます。

## セキュリティ

* データを危険にさらしたり、新たな脆弱性をもたらさないように、あらゆる段階で確認します。


```



### テスト用の指示書

```.copilot-test-instructions.md
# テストに関する指示

このファイルでは、GitHub Copilotがテストコードを生成する際に従うべき具体的な指示を定義します。

## テストファイル

* コンポーネントのテストコードはコンポーネントファイルと同じ場所に置くというコロケーションの考え方を採用します。


## テストコード ユニットテスト

* テストにはvitestとReact Testing Libraryを使用してコンポーネントのユニットテストを記述します。
* テストケースは日本語で書いてください。
* テストは `describe` でグループ化します。
* テストは `it` でテストケースを書いてください。
* 変数名などのフィールド名にはアンダースコアを使用してください。

## テストコード 統合テスト

* 重要なユーザーフローには統合テストを実装します。

```



### レビュー用の指示書

```.copilot-review-instructions.md
# コードレビューに関する指示

このファイルでは、GitHub Copilotがコードレビューを行う際に考慮すべき具体的な指示を定義します。

* 潜在的なセキュリティリスクがある場合は、追加のレビューを行います。
* コードの可読性を重視してレビューしてください。
* エラーハンドリングが適切か確認してください。
* テストケースが網羅されているか確認してください。

```



### コミットメッセージ用の指示書

```.copilot-commit-message-instructions.md
# コミットメッセージに関する指示

このファイルでは、GitHub Copilotがコミットメッセージを生成する際に従うべき具体的な指示を定義します。

* コミットメッセージは短く、要点を押さえたものにしてください。
* 変更内容の概要を明確に書いてください。

```



----------------------------------------

# 2. リポジトリ全体への静的な指示書

静的な指示書
チーム全体で共有するルールを書きます。

使いまわしをするルールです。

このファイルの指示の優先度は低くします。

リポジトリを分析して
使用しているツールの具体的な使用方法を指示します。

## 指示書の場所

リポジトリ直下

`.github/copilot-instructions.md` ファイル

## 2. 静的ルール (`.github/copilot-instructions.md`)

これらはリポジトリ全体に適用されるルールであり、プロジェクトの技術スタックやコーディング規約などを定義します。

```.github/copilot-instructions.md
# GitHub Copilot 全体の指示書

このリポジトリでは、Next.js SaaS スターターテンプレート ([https://github.com/nextjs/saas-starter](https://github.com/nextjs/saas-starter)) をベースに開発を行います。

## 振る舞い

* TypeScript、Node.js、Next.js (App Router)、React、Shadcn/UI、Radix UI、Tailwind CSS、Zustand、Supabase、Zod、Stripe、Vitest、 React Testing Library、Storybookのエキスパートとして振る舞います。



## 使用技術スタック

### 基本事項

* 言語: TypeScript、Node.js
* フレームワーク: Next.js (App Router)、React
* UIライブラリ: Shadcn/UI、 Radix UI、 Tailwind CSS
* 状態管理: Zustand
* バックエンド: Supabase、 Drizzle ORM
* スキーマ検証: Zod
* 決済: Stripe
* テスト: Vitest、 React Testing Library
* UIコンポーネントの管理: Storybook (ストーリファイル)



## コーディング規約

* 関数型および宣言型のプログラミングパターンを推奨し、クラスの使用はしないでください。
* 環境変数は `.env` ファイル `.env.local` ファイルで管理し、Next.js の仕組みに従って安全に利用してください。
* コンポーネントの配置パターンには、コンポーネントのコロケーション を考慮してください。
* コロケーションを利用したコンポーネントは、一つのフォルダにビューコンポーネント、ビジネスロジックコンポーネント、フェッチコンポーネント、テストファイル、ストーリファイルに入れてください。



## GitHub Copilot への追加指示

* 常に最新の Next.js (App Router) のベストプラクティス に従ったコードを生成してください。
* Supabase の認証、データベース操作、ストレージ利用に関するコード生成を支援してください。
* Stripe を利用した支払い処理、サブスクリプション管理に関するコード生成を支援してください。
* Shadcn/UI のコンポーネントを利用した、アクセシビリティの高いUIの実装を支援してください。
* Tailwind CSS を用いた、保守性の高いスタイリングの実装を支援してください。

## テストに関する指示

* vitest を使用したユニットテストの記述をしてください。
* React Testing Library を使用したコンポーネントのテストを記述してください。
* テストはdescribeでグループ化し、itでテストケースを記述してください。
* テストケースは日本語で記述してください。

## UIに関する指示

* UIはシンプルで直感的なデザインを心がけてください。
* モバイルフレンドリーなレスポンシブデザインを考慮してください。

## セキュリティ

* .env*ファイルはgitでコミットしません、必ずステージにあげないでください。

## ドキュメント

* README.md には使い方や説明等を記入してください。
* 設計書に関することは/docsフォルダ直下の設計書ファイル郡に反映させてください。
* 変更はそれぞれ /docsフォルダ や README.md に反映させてください。

```



----------------------------------------

# 3．目的、機能単位の指示書

GitHub Copilotではプロンプトファイルと呼びます。

※プロンプトファイル(*.prompt.md)は毎回指定する必要があります。
この指示書はGitHub Copilotへのドラッグアンドドロップでも読み込ませ指定することが出来ます。



## 動的な指示書

特定の目的や、単体の機能を作る時用のルールを書きます。
機能を具体的に明確化してGitHub Copilotに説明するために必要です。

使い捨てするルールです。

このファイルの指示の優先度は一番高くします。



## 指示書の場所

リポジトリ直下

`.github/prompts` フォルダ

フォルダ内にプロンプトファイルとして作成します。

※拡張子は `*****.prompt.md` です



## 3. 動的ルール（プロンプトファイル `*.prompt.md`）

これらは特定の機能やタスクを開発する際に、必要に応じて利用する指示書です。
例えば、特定のReactコンポーネントを作成する場合の指示書は以下のようになります。

例: `components/user-profile.prompt.md`

```components/user-profile.prompt.md
# ユーザープロファイルコンポーネントの作成

## コンポーネントの目的

* ログインしているユーザーのプロフィール情報を表示するコンポーネントを作成します。

他の指示書と条件が被っていたらこのファイルを最優先します。

## 技術要件

* Next.js v15を使用します。
* APIは Hono v4 を使用します。
* Reactを関数コンポーネントとして実装します。
* TypeScript で型定義を行います。
* UIは Radix UI の `<Avatar>` コンポーネントと適切なレイアウト要素を使用します。
* スタイルは Tailwind CSS を適用します。
* ユーザーデータは Supabase から取得します。

※バージョンも指定します。

## データ要件

* 以下のユーザー情報フィールドを表示します。

名前 (表示名)
メールアドレス
プロフィール画像 (URL)

## GitHub Copilot への指示

* Supabase のクライアントライブラリを使用して、ユーザーデータを非同期にフェッチする処理を実装してください。
* ローディング状態やエラー状態を適切に処理するUIを実装してください。
* プロフィール画像が存在しない場合のデフォルト表示を設定してください。
* Radix UI のコンポーネントを効果的に組み合わせて、アクセシブルなUIを構築してください。
* Tailwind CSS のユーティリティクラスを使用して、シンプルで見やすいスタイルを適用してください。
* 作成したコンポーネントの Storybook のストーリーファイル (`*****.stories.tsx`) を作成し、様々な表示パターンをテストできるようにしてください。
* vitest と React Testing Library を用いた簡単なユニットテストを作成してください。
例えば、データのローディング状態の表示や、ユーザー情報のレンダリングなどをテストしてください。



## 追加事項(将来の拡張予定)

* ダークモードにも対応できるようなスタイリングを検討してください。
* 将来的な拡張性を考慮し、コンポーネントのpropsを適切に定義してください。

```

※使い終わったプロンプトファイルは
`.github/prompts/old` フォルダを作成し
そこに移動させておきます。 (独自ルール)
削除しても構いません。



## ルールの個別具体的な例

### 例1: `component-style.prompt.md` (特定のコンポーネントのスタイルに関する指示)

```component-style.prompt.md
*   目標は、新しいユーザープロファイルコンポーネント (`UserProfile.tsx`) を生成することです。
*   このコンポーネントは、以下の要件を満たす必要があります。
    UIライブラリ: Shadcn UI の `Card` コンポーネントをベースにしてください。
    スタイル: Tailwind CSS を使用して、以下のスタイルを適用してください。
	 *   背景色は `bg-gray-100`
	 *   文字色は `text-gray-800`
	 *   角丸は `rounded-md`
	 *   内側のpaddingは `p-4`
    レスポンシブ: 画面幅が小さい場合は、要素が適切に折り返されるようにしてください。
    必要に応じてFigma参照



### 例2: `api-integration.prompt.md` (特定のAPI連携に関する指示)

* 目標は、`/api/users` エンドポイントからユーザーデータを取得し、それを表示する処理を実装することです。
* 以下の点を考慮してください。
    データ取得: Hono API を使用してデータを取得してください。
    認証: Supabase の認証ヘルパー (`supabase-auth-helpers`) を使用して、認証済みのユーザーのデータのみを取得してください。
    データ形式: APIのレスポンスは以下のJSON形式です。

json
{
  "id": "...",
  "name": "...",
  "email": "..."
}

エラーハンドリング: データ取得に失敗した場合は、適切なエラーメッセージを表示してください。

```



### 例3: `design.prompt.md` (設計書に関する指示)

```design.prompt.md
### 設計書

* 構想、概要を読んで設計書を書いてください。
	* 構想、概要: [Webアプリ].concept.md
	* 要件定義: [Webアプリ].requirements.md
	* 画面設計書: [Webアプリ].screen.md
	* 画面遷移図: [Webアプリ].screen-transition-diagram.md

* 設計書を docs フォルダ直下に作成してください：
	* 設計書: [Webアプリ].design.md
	* データベース設計: [Webアプリ].db.md
	* データベーススキーマ: [Webアプリ].db-schema.md
	* データベース関連図: [Webアプリ].db-entity-relationship-diagram.md
	* API設計書: [Webアプリ].api.md
	* テスト設計書: [Webアプリ].test.md

* 既存のWebアプリを修正する場合：
	* 既存のリポジトリを参照してWebアプリを開発してください
	* 変更時に設計書も同時に更新してください
* 設計書を作成したら、コードを作成する前にユーザーに設計書のチェックを依頼してください。

```

プロンプトファイルが長くなる場合は、タスク分解を行い、個々の指示の長さを短くして複数のファイルに分割します。

これは、AIの理解を助けるためです。

また、人間が指示書を作成する際にも、タスク分解を行うことで、タスクの抜け漏れや不足を防ぐことができます。



## GitHub Copilotで使用可能なAIモデル

2025年3月16日現在

Claude 3.5
Claude 3.7 sonnet
Claude 3.7 sonnet Thinking
Gemini 2.0 Flash
GPT-4o
o1
o3-mini

## AIモデルが受け付けるプロンプトの長さ

Claude 3.5 Sonnet: 約200Kトークン（おおよそ300,000文字に相当）

Claude 3.7 Sonnet: 約200Kトークン（おおよそ300,000文字に相当）

Claude 3.7 Sonnet - Extended Thinking: 約200Kトークン（おおよそ300,000文字に相当）

Gemini 2.0 Flash: 最大1Mトークン（おおよそ1,500,000文字に相当）

GPT-4o: 最大128Kトークン（おおよそ192,000文字に相当）

o1: 最大128Kトークン（おおよそ192,000文字に相当）

o3-mini: 最大200Kトークン（おおよそ300,000文字に相当）

Gemini 2.0 Flash は最大1Mトークンを受け付けるため、ファイルサイズとしてはおおよそ1,500,000文字となります。






## 指示書に具体的な例を書くのが難しい時

リポジトリのどこか適当な場所に playground フォルダを作成します。

コンポーネントの例だったら
componentsフォルダの直下に置きます。
そしてお手本になるコンポーネントを書き、
GitHub Copilotにpalygroundフォルダを参考にしてくださいと指示を出します。



----------------------------------------

# おまけ: GitHub CopilotをMCPで強化する

MCP（Model Context Protocol）は、AIが外部の情報源にアクセスするためのプロトコルです。

例えば、Next.jsやSupabaseのドキュメントといった情報を、AIが理解しやすい形式で接続するためのルールを定めています。

現時点では、GitHub CopilotはMCPに直接対応していませんが、VS Codeの拡張機能を利用することで、MCPサーバーを介して外部情報にアクセスし、GitHub Copilotの機能を拡張できます。

* MCPの概要:
    * MCPは、大規模言語モデル（LLM）が様々なデータソースやツールと連携するためのオープンな標準プロトコルです。
    * これにより、AIは最新のドキュメントやデータベース、APIなどの外部情報に基づいた、より正確でコンテキストに沿った提案やコード生成が可能になります。

* MCPサーバー:
    * MCPサーバーは、外部情報とLLMとの橋渡し役を担います。
    * 様々なデータソースに対応したMCPサーバーが開発されており、目的に応じて選択できます。

* VS Code拡張機能:
    * VS CodeでMCPを利用するためには、MCPサーバーと連携する拡張機能が必要です。
    * 例として、Clineなどの拡張機能が挙げられます。これらの拡張機能は、MCPサーバーをVS Code上で実行し、GitHub Copilotと連携させることができます。

* MCPの利点:
    * AIの知識を最新の状態に保つことができます。
    * 特定のドメイン知識や企業内の情報など、AIがデフォルトでは持たない情報にアクセスできます。
    * より複雑なタスクや、外部システムとの連携が必要な開発を支援できます。

* MCPを利用することで、GitHub Copilotをより強力な開発支援ツールとして活用できます。



##



