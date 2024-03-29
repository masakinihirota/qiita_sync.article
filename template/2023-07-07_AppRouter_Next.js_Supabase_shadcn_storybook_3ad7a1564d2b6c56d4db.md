<!--
title:   Next.js app router 開発用テンプレート ノーマルバージョン (Storybook Supabase shadcn/ui)
tags:    AppRouter,Next.js,Supabase,shadcn,storybook
id:      3ad7a1564d2b6c56d4db
private: false
-->
# テンプレートインストール

https://github.com/masakinihirota/next13apptemplate

このリポジトリの右側にある緑ボタン **Use this template** を利用すれば、このリポジトリをベースに新しいリポジトリを作成できます。

※この記事とリポジトリとのコードに差分がもしあった場合、リポジトリのコードが正しいものとなります。

2023年7月30日 現時点で記事後にもテンプレートを育てているので記事のコードとの差分が少しずつ大きくなっています。

# この記事の趣旨

このリポジトリは既存のツールを組み合わせているだけなので何の機能もありません。
だからサンプルやデモではなくテンプレートです。

ただ、現在、複数の機能をまとめるだけでも微妙な設定の変更が必要で、それには多くの調査が必要になるため、ここにテンプレートとして記録に残しておきます。



# 開発環境

Windows 10
PowerShell
VSCode with GitHub Copilot chat
Next.js 13 app router
Supabase
Storybook
shadcn/ui
Vercel
i18n
JSDoc

# ソースからインストール

新しいインストール場所を選んでソースをダウンロードします。

`gh repo clone masakinihirota/next13apptemplate`

or

`git clone https://github.com/masakinihirota/next13apptemplate.git`

`cd next13apptemplate`

## npm でインストール

インストール
`npm i`

動作確認
`npm run dev`

※以上で終了です。

これより下は、このテンプレートの作成時のメモ兼ハンズオンになります。


# 開発用テンプレート

Next.js と関連するツールをインストールして Next.js アプリ開発のテンプレートとして利用します。

# テンプレートのリポジトリ

https://github.com/masakinihirota/next13apptemplate

↑ このテンプレートは この記事↓ を順にたどっていくと ↑ のリポジトリと同じになります。

# 開発中の確認＆ダッシュボード

Next.js

http://localhost:3000

Storybook

http://localhost:6006/

ローカルの Supabase

http://localhost:54323/projects

サーバーの Supabase

https://app.supabase.com/projects

Vercel

https://vercel.com/dashboard

---

# 便利サイト、チートシート

Tailwind CSS Cheat Sheet

https://tailwindcomponents.com/cheatsheet/

---



# 開発時の重要コマンド

よく使うコマンドや便利ツール等

```
Supabase CLI 更新
scoop update supabase

Next.jsローカルサーバーを起動
npm run dev

storybookを起動
npm run storybook

supabase start
supabase stop
supabase db reset
supabase status

Supabase ダッシュボード
http://localhost:54323

ストーリーブック
npm run storybook

インタラクションテスト (storybookを起動させて)
npm run test-storybook

Vercel
npm vercel login
npm vercel link
npm vercel env pull

インストール時から一定期間後に別ブランチを立てて実行
update可能なパッケージ一覧を取得
npm outdated

npm update

インストール
npm install -g npm-check-updates
npm-check-updates

ncu

全て最新バージョンにアップデートしたい場合は
ncu -u



開発ブランチのマージ

git checkout main
git merge -
※ - 記号は直前にチェックアウトしたブランチを指定してマージします。

JSDocを利用した自動生成ドキュメント
npm run doc

eslintでのチェック ルールに従ってないファイルをリスト表示します。
npx eslint src/**/*


```

# 開発のサイクル

開発のサイクルとして、作業ブランチを作り、そこでコードを書いてテストして、その後にコミットしたら main ブランチに移動後マージします。(これを繰り繰り返します。)

作業ブランチの作成
git checkout -b <branch-name>

※作業します。

main ブランチに移動
git checkout main

ブランチのマージ
直前にいたブランチのマージ
git merge -

（不要になった）ブランチの削除
git branch -d <branch-name>

---

# ハンズオンで作る Next.js 13 app router テンプレート

# リポジトリ名を決める

next13apptemplate

# テンプレートで使用するツールの調査

Next.js をインストール

<details><summary>インストールする予定のツール (長い)</summary>

(未)＝未インストール＆インストール候補

※ 重要なのは必要になった時に調べてインストールする。
一気に全部入れても混乱するだけで使いこなせません。

Next.js by Vercel - The React Framework

https://nextjs.org/

TypeScript: JavaScript With Syntax For Types.

https://www.typescriptlang.org/

Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.

https://tailwindcss.com/

Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter

https://eslint.org/

Prettier · Opinionated Code Formatter

https://prettier.io/

The Open Source Firebase Alternative | Supabase

https://supabase.com/

Storybook: Frontend workshop for UI development

https://storybook.js.org/

GitHub Japan | GitHub

https://github.co.jp/

Vercel

https://vercel.com/

(未) tRPC - Move Fast and Break Nothing. End-to-end typesafe APIs made easy. | tRPC

https://trpc.io/

tRPC は App router 未対応です。

[tRPC App router 対応状況](https://github.com/trpc/trpc/issues/3297)

## テスト関連

(未) Vitest | A blazing fast unit test framework powered by Vite

https://vitest.dev/

サンプル
next.js/examples/with-vitest at canary · vercel/next.js · GitHub

https://github.com/vercel/next.js/tree/canary/examples/with-vitest

(未) Chromatic: Storybook deployment, review, and test

https://www.chromatic.com/

(未) Testing Library | Testing Library

https://testing-library.com/

(未) JavaScript Component Testing and E2E Testing Framework | Cypress

https://www.cypress.io/

(未) Fast and reliable end-to-end testing for modern web apps | Playwright

https://playwright.dev/

(未) Jest · 🃏 Delightful JavaScript Testing

https://jestjs.io/ja/

## i18n 国際化

(未) react-i18next

Introduction - react-i18next documentation

https://react.i18next.com/

サンプル
next.js/examples/app-dir-i18n-routing at canary · vercel/next.js · GitHub

https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing

# 他のインストール候補

## UI ＆ CSS

### Next.js の app router に対応している UI コンポーネント集

shadcn/ui

https://ui.shadcn.com/

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

React の UI コンポーネントなら@shadcn/ui がちょうどいい

https://zenn.dev/mottox2/articles/react-shadcn-ui

(未) Kuma UI

https://www.kuma-ui.com/

(未) Mantine next example

https://v7.mantine.dev/

Can I use Mantine with Next.js app dir?
Currently, it is not recommended, we are working on new major version that will resolve all of the current issues related to server side rendering.

> Mantine を Next.js app dir で使用できますか？
> サーバーサイドレンダリングに関する現在の問題をすべて解決する新しいメジャーバージョンを開発中です。

この version7 が開発中です。

### Next.js の app router に対応している CSS

(未) vanilla-extract — Zero-runtime Stylesheets-in-TypeScript.

https://vanilla-extract.style/

CSS・TypeScript の相性が抜群。vanilla-extract が最高の CSS 開発体験をくれた

https://zenn.dev/moneyforward/articles/vanilla-extract

## デザイン

Figma

https://www.figma.com/

## 開発時の利用ツール

### DB関連

#### SQLクライアント

DBeaver Community

https://dbeaver.io/download/

TablePlus | Modern, Native Tool for Database Management

https://tableplus.com/download

A5:SQL Mk-2 - フリーの SQL クライアント/ER 図作成ソフト (松原正和)

https://a5m2.mmatsubara.com/

# その他

(未) Zod | Documentation

https://zod.dev/

(未) Prisma | Next-generation ORM for Node.js & TypeScript

https://www.prisma.io/

</details>

# ルール

書いたコードは src フォルダ以下に移動する
src/

共通の style コード
src/styles

ブランチは基本 2 種類
main ブランチ 公開用のコード
必要に応じて開発用のブランチを作成(ここで開発をする)
この２つを軸に開発していく
一区切りついたら開発用のブランチを main にマージしていく

## 開発手法

### 開発の開始

何を作るか決め
AIで開発計画を作り
そのプラン通りに開発していく
そして技術は必要になったときに学んでいく。

技術の学び方は公式ドキュメントを何回も読み込む。

疑問はすべてAIに聞いてみる。
基本的に間違った情報も出してくるので全面的に信頼しない。
AIの回答を参考にして、自分で調べて、自分で判断する。

何かを作る前にものづくりの仲間を作ったほうが
学習速度も、開発速度も上がる。

とにかく独学は止めた方がいい、Webの世界は広すぎる。
指導者や仲間がいないと迷走するだけ。
次から次へとでてくる新しい技術。
それらを全部追いかけるのは不可能だし、
作っている内に新しい技術が出てきて、使用している技術を変更したくなる。
こんなことをやっていたら無限に時間があっても、何も開発が終了しないまま終わってしまう。
必要な技術は必要になったら取得する意味もここにある。

そしてなによりも、周りは何かを作り完成させたことを評価する。

インプット８、アウトプット２

問題に直面したときも、今持っている技術で対処する。



### コロケーション

コロケーションとは、
関連するコードを近くに配置することで、
コードの理解性を向上させる設計パターンの一つです。
コロケーションパターンともいいます。

コロケーションパターンを採用することで
リマインド効果がある
半年前の自分は別人理論
コードを読みやすくする

一つのフォルダの中に一つのコンポーネント単位を置く
コンポーネントは複数のコンポーネントで成り立っておい
一つはデータコンポーネント
一つは表示コンポーネント
をつかう
テストファイルと
Story ファイルも一緒に
コンポーネントフォルダの root に置く

コロケーション | makotot.dev ファイルの配置

https://www.makotot.dev/posts/colocation-translation-ja

インタラクションテスト
ストーリーとテストを一元管理できる
ストーリーファイルにテストを記述する事になるため、
ストーリーとテストを一元管理できます。

テストを実行する方法は主に 2 つで、
通常はブラウザ上で Storybook を
表示して実行します。

テストランナーをセットアップすることで、
CLI での実行が可能になります。

# ディレクトリ構成

```tree
src
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json

```

参考
Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

---



# テンプレートの作成開始

## Next.js をインストール

npx create-next-app@latest

√ What is your project named? ... .
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
√ What import alias would you like configured? ... @/\*

※記事を書いた時のバージョン next 13.4.12

.eslintrc.json(初期)

```.eslintrc.json
{
  "extends": "next/core-web-vitals"
}

```

## TailwindCSS

https://nextjs.org/docs/app/building-your-application/styling/tailwind-css

src\app\globals.css
このファイルの配置を
src\styles\globals.css
へ移動します。

コマンド

New-Item -ItemType Directory -Path "src\styles"

Move-Item -Path "src\app\globals.css" -Destination "src\styles\globals.css"

globals.css ファイルから、デフォルトのインストール画面で必要だった CSS 部分を削除し、TailwindCSS で必要な部分だけを残します。

```src\styles\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

globals.css ファイルを読み込んでいるファイルの path を修正します。

```src\app\layout.tsx
import '@/styles/globals.css'

...

<html lang='ja'>

```

jaと日本語にも設定しておきます。



## tsconfig.json

TypeScriptを開発しやすくする

```tsconfig.json (変更箇所)
    "strict": false,
    "strictNullChecks": true,

```

"strict": false は、以下の設定を無効にします。

"noImplicitAny": true：暗黙的にany型として解釈される式を許可しません。
"strictNullChecks": true：nullとundefinedの扱いに関する厳密な型チェックを有効にします。
"strictFunctionTypes": true：関数の型チェックを厳密に行います。
"strictPropertyInitialization": true：クラスのプロパティの初期化を厳密に行います。
"noImplicitThis": true：thisの型チェックを厳密に行います。

↑この５つのうち

"strictNullChecks"だけ有効にします。



# ESLint と Prettier のインストール

## ESLint

Next.js と Storybook をインストールした直後の eslint の設定

```.eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:storybook/recommended"
  ]
}

```

next.js/packages/eslint-config-next/index.js at canary · vercel/next.js · GitHub

https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js

上記コードを調べると next/core-web-vitals は
next/recommended
react/recommended
react-hooks/recommended
を読み込んでいるので、↑ これらのインストールは不要です。

## VSCode の設定

VSCode の拡張機能を入れます。

ESLint - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Prettier - Code formatter - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Headwind - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=heybourn.headwind

※拡張機能 Headwind はTailwindCSSの className を全て同じように並べ替えます。

【自動整形】VSCode で Prettier を使う方法【設定必要です】 | RalaCode

https://ralacode.com/blog/post/vscode-prettier/

```setting.json (追記)
  // フォーマットをprettierで実行
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 貼り付け時にフォーマット
  "editor.formatOnPaste": false,
  // 入力直後にフォーマット
  "editor.formatOnType": false,
  // 保存直後にフォーマット
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    // import文を自動で探して挿入する。
    "source.addMissingImports": true,
    // 保存時にeslintを実行
    "source.fixAll.eslint": true
  },

```
※設定をする事で言語別に(TypeScript, markdown, html等)フォーマットの設定ができます。

VSCodeのフォーマット

Default FormatterをPrettierにする設定。

```setting.json
"editor.defaultFormatter": "esbenp.prettier-vscode"

```

プラグインがの効果をみるために src\app\page.tsx を全体的に書き換えます。

```src\app\page.tsx
import { type NextPage } from "next"

const Home: NextPage = () => {
  return (
    <main>
      <h1 className="pt-2 p-4">VNS.BLUE</h1>
      Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui)
    </main>
  )
}

export default Home

```

↑ このコードを保存すると、その瞬間に自動でフォーマット↓が実行されます。

<h1 className="pt-2 p-4">VNS.BLUE</h1>

↑ この部分が自動で並べ替えが行われます。↓

<h1 className="p-4 pt-2">VNS.BLUE</h1>

動作確認
npm run dev




### .eslintignore ファイルの作成

.eslintignore を作成します。

touch .eslintignore

↓lint 対象から外したいファイルを設定します。

```.eslintignore
# config
.eslintrc.json
.prettierrc
next.config.js
tailwind.config.js
tsconfig.json
postcss.config.js

# build dir
build/
bin/
obj/
out/
.next/

# 自動生成されたファイル
package-lock.json

# Storybook
*.stories.ts
*.stories.tsx

# CSSファイル
*.css

# mdxファイル
*.mdx

# すべての画像ファイルを除外する
**/*.png
**/*.jpg
**/*.jpeg
**/*.gif
**/*.ico

```

# prettier

公式サイト Install Prettier

https://prettier.io/docs/en/install.html

prettier のインストール

npm install -D prettier

eslint と設定が衝突するのを避けるための設定

npm install -D eslint-config-prettier

空の.prettierrc を作成して、Prettier を使用していることをエディターやその他のツールに知らせます。

touch .prettierrc

```.prettierrc

```

Prettier を VSCode で使うにはデフォルトのフォーマッターを Prettier に設定する必要があります。

.eslintrc.json に prettier 設定の追加をします。

```.eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ]
}

```

package.json に format コマンドを追加します。

```package.json (追記)
"scripts": {
  "format": "prettier --write ."
  ...

```

## .prettierrc 設定ファイルの追加

.prettierrc ファイルを設定します。

```.prettierrc
{
  "tabWidth": 4,
  "useTabs": false
}

```

※ルールは各自で好きなように設定してください。

↓ このプラグインは推奨されなくなりました。
eslint-plugin-prettier

次に、.prettierignore ファイルを作成して、どのファイルをフォーマットしないかを Prettier CLI とエディターに知らせます。

touch .prettierignore

```.prettierignore
# Ignore artifacts:
build
coverage

# dotfile
.env*

# markdown
*.md

# next.js
/.next/
/out/

# production
/build

package-lock.json

*.stories.ts
*.stories.tsx

```

## Prettier コマンド一覧

※通常は VSCode 側を設定すれば、保存時に自動で実行されるので、コマンドを打つことはほとんどありません。

動作確認のため prettier を実行します。

全体をフォーマットします。
npx prettier . --write

src ディレクトリ以下をフォーマットします。
npx prettier src/ --write

巨大プロジェクトの場合に時間短縮のためフォルダを指定したい場合
npx prettier [フォルダ名] --write

直接ファイルを指定する場合
npx prettier src\app\page.tsx --write

prettier が実行済みかの確認（上書きはしない）
npx prettier . --check



# eslint-plugin-import

Next.js 開発 ESLint で import 文の自動挿入、自動削除、自動ソート - Qiita

https://qiita.com/masakinihirota/items/fae505a58892b00550a7

npm install -D eslint-plugin-unused-imports --legacy-peer-deps


```.eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error"
  }
}

```

※ ↑この設定は必要な最小限の設定にしてあるので、自動挿入、自動削除の確認用として有効です。

さらに、並べ替えのルールを追加します。

```.eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["unused-imports"],
  "rules": {
    // TypeScriptで未使用の変数を許可するかどうかを指定します。この例では、offに設定されているため、未使用の変数を許可します。
    "@typescript-eslint/no-unused-vars": "off",
    // 未使用のインポートに関するルールを指定します。この例では、warnに設定されているため、未使用のインポートがある場合に警告を出します。
    "unused-imports/no-unused-imports": "warn",
    // モジュールのインポート順序に関するルールを指定します。この例では、配列の中に複数のグループが定義されています。各グループは、groupsプロパティで定義されています。
    "import/order": [
      "warn",
      {
        "groups": [
          // builtin: Node.js に組み込まれているモジュール
          // external: npm install 等 プロジェクト外部からインストールされたモジュール
          // internal: プロジェクト内のモジュールで、パスを指定してインポートされたもの
          // parent: 親モジュール 相対パスを使用してインポートされたもの
          // sibling: 兄弟モジュール 相対パスを使用してインポートされたもの
          // index: インデックスファイルで、相対パスを使用してインポートされたもの
          // object: オブジェクトファイルで、相対パスを使用してインポートされたもの
          // type: 型ファイルで、相対パスを使用してインポートされたもの
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ],
        // それぞれのgroupsとの間は1行分空けます。
        "newlines-between": "always",
        // 特定のグループの import 文を除外するかどうかを指定します。
        "pathGroupsExcludedImportTypes": ["builtin", "external"],
        // order オプションは、アルファベット順にします。
        // caseInsensitive オプションは、大文字小文字を無視してアルファベット順に並べるかどうかを指定します。
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "pathGroups": [
          // pattern: インポートパスのパターンを指定します。この例では、src/ディレクトリ以下のすべてのファイルを指定しています。
          // group: インポートパスが一致した場合に、どのグループに属するかを指定します。この例では、internalグループに属するように指定しています。
          // position: インポートパスが一致した場合に、どの位置に挿入するかを指定します。この例では、beforeに指定しているため、他のグループよりも前に挿入されます。
          {
            "pattern": "src/**",
            "group": "internal",
            "position": "before"
          }
        ]
      }
    ]
  }
}

```

## 確認用のページ

import 文の自動削除や自動挿入が試せます。

```src\app\page.tsx
// import文の順番も自動整形されます。
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main>
      {/* TailwindCSSのプロパティ値も自動整列されます。 */}
      <h1 className="pt-2 p-4">VNS.BLUE</h1>
      Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui)
      <br />
      {/* ↓この行を消すとimport文が自動削除されます。 */}
      <Link href="/">Home</Link>
    </main>
  );
};

export default Home;

```



## ESlintにTypeScriptのルールを追加

typescript-eslint

https://typescript-eslint.io/


npm install --save-dev @typescript-eslint/parser

※↑上記サイトの他のプラグインを使用すると、ESLintの他の機能が正常に動作しなくなるため、そのプラグインは外しました。

```.eslintrc.json
{
  "extends": ["eslint:recommended", "next/core-web-vitals", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    // tsx ファイル内のJSX構文を正しく解析できるようになります。
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module",
    "jsx": "react"
  },
  // react: Reactの構文を解析するためのルールを提供します。
  // import: import文の構文を解析するためのルールを提供します。
  // unused-imports: 未使用のimport文を検出するためのルールを提供します。
  "plugins": ["react", "import", "unused-imports"],
  "root": true,
  "rules": {
    // TypeScriptで未使用の変数を許可するかどうかを指定します。この例では、offに設定されているため、未使用の変数を許可します。
    "@typescript-eslint/no-unused-vars": "off",
    // 未使用のインポートに関するルールを指定します。この例では、warnに設定されているため、未使用のインポートがある場合に警告を出します。
    "unused-imports/no-unused-imports": "warn",
    // モジュールのインポート順序に関するルールを指定します。この例では、配列の中に複数のグループが定義されています。各グループは、groupsプロパティで定義されています。
    "import/order": [
      // エラーだと動作が止まります。
      // 警告だと警告表示はされますが動作は止まりません。
      "warn",
      {
        "groups": [
          // builtin: Node.js に組み込まれているモジュール
          // external: npm install 等 プロジェクト外部からインストールされたモジュール
          // internal: プロジェクト内のモジュールで、パスを指定してインポートされたもの
          // parent: 親モジュール 相対パスを使用してインポートされたもの
          // sibling: 兄弟モジュール 相対パスを使用してインポートされたもの
          // index: インデックスファイルで、相対パスを使用してインポートされたもの
          // object: オブジェクトファイルで、相対パスを使用してインポートされたもの
          // type: 型ファイルで、相対パスを使用してインポートされたもの
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ],
        // それぞれのgroupsとの間は1行分空けます。
        "newlines-between": "always",
        // 特定のグループの import 文を除外するかどうかを指定します。
        "pathGroupsExcludedImportTypes": ["builtin", "external"],
        // order オプションは、アルファベット順にします。
        // caseInsensitive オプションは、大文字小文字を無視してアルファベット順に並べるかどうかを指定します。
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "pathGroups": [
          // pattern: インポートパスのパターンを指定します。この例では、src/ディレクトリ以下のすべてのファイルを指定しています。
          // group: インポートパスが一致した場合に、どのグループに属するかを指定します。この例では、internalグループに属するように指定しています。
          // position: インポートパスが一致した場合に、どの位置に挿入するかを指定します。この例では、beforeに指定しているため、他のグループよりも前に挿入されます。
          {
            "pattern": "src/**",
            "group": "internal",
            "position": "before"
          }
        ]
      }
    ]
  }
}

```

import文の自動削除や自動挿入は保存ボタンを押すと実行されます。（VSCode 側で Prettier が自動実行の設定がされている場合）

(1度で動かない時は 保存ボタンを2,3回押してみてください。)

JavaScript と TypeScript のそれぞれの lint 設定

各個人それぞれが必要になったらインストールしてください。

Getting Started | typescript-eslint

https://typescript-eslint.io/getting-started/

Linting with Type Information | typescript-eslint

https://typescript-eslint.io/linting/typed-linting/

Configurations | typescript-eslint

https://typescript-eslint.io/linting/configs/




## ESlintでのチェックを実行する

### *.tsxファイルのみをチェックする場合

npx eslint src/**/*.tsx

### 全ファイルをチェックする場合

npx eslint src/**/*

※チェックをしないファイルタイプは .eslintignore に登録します。



# JSDoc

AI (GitHub Copilot chat) を利用して開発する場合には、JSDocを書くことが必須になると思っているので導入します。
JSDoc を書くのはAI(GitHub Copilot chat等)に任せます。

ESLint を使って JSDoc / TSDoc の記述を必須化する

https://zenn.dev/wakamsha/articles/setup-eslint-plugin-jsdoc



## JSDocのインストール

今回はグローバルインストールします。
npm install -g jsdoc

※各自の環境に合わせて好きな方法でインストールしてください。



## ESLintにJSDocを強制する場合の設定

.eslintrc.jsonに追記します。

"google"
↑このルールはJSDocを強制的に使用するように促します。

※JSDocが書いてないとエラーが出ます。

```.eslintrc.json

  "env": {
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "next/core-web-vitals",
    "google",
    "prettier"
  ],
  "parser

```

eslint-config-google - npm

https://www.npmjs.com/package/eslint-config-google

※Google スタイルを ESLint の推奨ルール セットと組み合わせて使用​​するには、両方を拡張し、必ずgoogle最後にリストします。

eslint-config-* の比較表

https://zenn.dev/tapioca/articles/5685d794f6452b

Rules Reference - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/rules/



## VSCodeでJSDocを書く方法

関数がある上の行にカーソルを持ってきて
`/** ＋エンターキー`
でJSDocの↓テンプレートが自動挿入されます。

```
/**
 *
 * @param inputs
 * @returns
 */
 export default function

```




コンポーネントの場合は@moduleをつけます。

例 JSDocのコメント

```src\app\ModeTogglePage\page.tsx
/**
 * テーマを切り替えるためのドロップダウンメニューを表示するコンポーネント。
 * @module ModeToggle
 * @return {JSX.Element} テーマを切り替えるためのドロップダウンメニューを含む React 要素。
 */
export default function ModeToggle() {
  const { setTheme } = useTheme();


```

※リファクタリングした後でも、AIに修正を依頼すると更新されたJSDocを提案してくれます。




### JSDocの使用例

↓なにか関数を作ります。

```
function increment(num: number): number {
  return num + 1;
}
```

↓関数の上の行にカーソルを持ってきて
`/** ＋エンターキー`
で JSDoc の↓テンプレートが自動挿入されます。

```
/**
 *
 * @param num
 * @returns
 */
function increment(num: number): number {
  return num + 1;
}

```

このままではエラーが出るので GitHub Copilot chat に↓修正をしてもらいます。

```
/**
 *
 * @param {number} num - 数値。
 * @return {number} 引数に1を加えた数値。
 */
function increment(num: number): number {
  return num + 1;
}
```

↓ 説明を追加します。
説明も GitHub Copilot chat で提案してもらいます。

```
/**
 * 引数に1を加えた数値を返す関数。
 * @param {number} num - 数値。
 * @return {number} 引数に1を加えた数値。
 */
function increment(num: number): number {
  return num + 1;
}

```

完成です。



## JSDocからドキュメントを作成する。

typedoc
TypeScript用 JSDocドキュメント生成ツール

typedoc - npm

https://www.npmjs.com/package/typedoc



### インストール

npm -D install typedoc

↓scriptsを追加します。

```package.json
  "scripts": {
    "doc": "typedoc --entryPointStrategy expand ./src"

```
### 実行

npm run doc

↑実行するとdocsフォルダが作成されます。

ブラウザで
`docs\index.html`
を開くとドキュメントが表示されます。

# JSDocのリファレンス

TypeScript: Documentation - JSDocリファレンス

https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html

@type
@param (or @arg or @argument)
@return
@typedef
@callback
@template
@class (or @constructor)
@this
@extends (or @augments)
@enum

Use JSDoc: Index

https://jsdoc.app/













# shadcn/ui

Next.js - shadcn/ui

https://ui.shadcn.com/docs/installation/next

React の UI コンポーネントなら@shadcn/ui がちょうどいい

https://zenn.dev/mottox2/articles/react-shadcn-ui

コンポーネントは CLI からインストールする方法と
サイトからコードをコピーするやり方があります。

shadcn/ui 公式の推奨 Next.js アプリの構成

```tree
src
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── main-nav.tsx
│   ├── page-header.tsx
│   └── ...
├── lib
│   └── utils.ts
├── styles
│   └── globals.css
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json

```

セットアップ 初期化

ui や utils のコンポーネント保存フォルダを作っておきます。

mkdir src/components/ui
mkdir src/lib/utils

npx shadcn-ui@latest init

globals.cssのインストール場所は指定します。

src/styles/globals.css

その他は全てデフォルト値を選択します。

```
npx shadcn-ui@latest init
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... src/styles/globals.css
√ Would you like to use CSS variables
for colors? ... no / yes
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/components
√ Configure the import alias for utils: ... @/lib/utils
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.

```

※VSCodeを再起動します。


```shadcn-u インストール
初期化
npx shadcn-ui@latest init

※初期化コマンドは既存設定ファイルがある場合上書きされます。

CLI からのコンポーネントインストール方法
npx @shadcn/ui add

npx @shadcn-ui add [options] [components...]

※addコマンドは既存コンポーネントファイルがあっても上書きされます。(確認)


options:
  -y, --yes          skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command

```

上下キーでカーソルが上下します。
スペースで選択します。
リターンキーで決定します。

```shadcn/uiコンポーネントリスト
components:
( )   accordion
( )   alert
( )   alert-dialog
( )   aspect-ratio
( )   avatar
( )   badge
( )   button
( )   calendar
( )   card
( )   checkbox
( )   collapsible
( )   command
( )   context-menu
( )   dialog
( )   dropdown-menu
( )   hover-card
( )   input
( )   label
( )   menubar
( )   navigation-menu
( )   popover
( )   progress
( )   radio-group
( )   scroll-area
( )   select
( )   separator
( )   sheet
( )   skeleton
( )   slider
( )   switch
( )   table
( )   tabs
( )   textarea
( )   toast
( )   toggle
( )   tooltip

```

このコマンドを実行すると、インストールするコンポーネントを選択できるようになります。

2023年7月26日現在 選択できるコンポーネント
※開発が活発なのでこのリスト以外にも増えている可能性があります。

インストールするコンポーネントを選択します。
A ですべてを選択します。

※すべて選択してインストールするとエラーになりました。

インストール先を指定します。
src/components/ui

※デフォルトでは すでにファイルがあると上書きされません。
上書きしたい場合は -o オプションをつけます。

## お試し

button コンポーネントをインストールしてみます。

npx shadcn-ui@latest add button

or

npx shadcn-ui@latest add
button を選択します。

インストール先を指定します。

動作確認用

```src\app\page.tsx
"use client";

// import文の順番も自動整形されます。
import { type NextPage } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  return (
    <main>
      {/* TailwindCSSのプロパティ値も自動整列されます。 */}
      <h1 className="pt-2 p-4">VNS.BLUE</h1>
      Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui)
      <br />
      {/* ↓この行を消すとimport文が自動削除されます。 */}
      <Link href="/">Home</Link>
      <div>
        <Button>shadcn/ui の Button</Button>
      </div>
    </main>
  );
};

export default Home;

```

※Next.js App Router ではクライアント側で動作させる場合に
"use client";
と書く必要があります。



# ダークモード

ダークモードの調査は↓別の記事にまとめました。

Next.js App Router 開発用テンプレートに shadcn/ui でダークモードを実装する。 - Qiita

https://qiita.com/masakinihirota/items/7cf6181ba61fe9dc3802


# tRPC

## インストール

Set up with Next.js | tRPC

https://trpc.io/docs/client/nextjs/setup

npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod

※ @trpc/next はインストールをしない。


## tRPCが動くようにコードを書く

```src\app\api\trpc\[trpc]\route.ts
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

import { appRouter } from "@/trpc-server";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions,
    ): object | Promise<object> {
      // empty context
      return {};
    },
  });
};

export const GET = handler;
export const POST = handler;

```



```src\app\clientcomponent\page.tsx
import MyRpcClientComponent from "@/app/MyRpcClientComponent";

export default async function Home() {
  return (
    <>
      <MyRpcClientComponent arg={1} />
      <MyRpcClientComponent arg={2} />
      <MyRpcClientComponent arg={3} />
      <MyRpcClientComponent arg={4} />
      <MyRpcClientComponent arg={5} />
    </>
  );
}

```



```src\app\servercomponent\page.tsx
import { appRouter } from "@/trpc-server"

export default async function rscPage() {
  const caller = appRouter.createCaller({})
  const result = await caller.userById(3)
  if (!result) {
    return <p>Not found</p>
  }

  return <p>Hi, {result.name}, greetings from RSC land!</p>
}

```


```src\app\layout.tsx
import "@/styles/globals.css";
import { Metadata } from "next";
import React from "react";

import { TrpcProvider } from "@/app/TrpcProvider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrpcProvider>
      <html lang="ja" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </TrpcProvider>
  );
}

```



```src\app\MyRpcClientComponent.tsx
"use client"
import { JSX } from "react";

import { trpc } from "@/trpc"

type MyRpcClientComponentProps = {
  arg: number
}

export default function MyRpcClientComponent(props: MyRpcClientComponentProps): JSX.Element {

  const name = trpc.userById.useQuery(props.arg)

  if (name.data == undefined) {
    console.log("name.data undefined")
    return <p>did not work</p>
  }
  console.log(`result.data is ${JSON.stringify(name.data)}`)

  return <p>Hello, {name.data!.name}, greetings from client component land!</p>
}

```



```src\app\page.tsx
import { type NextPage } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const Home: NextPage = () => {
  return (
    <main>
      <h1 className="p-4 pt-2 text-blue-300">VNS.BLUE</h1>
      <div className="text-green-400">
        Next.js app router 開発用テンプレート (Storybook Supabase shadcn/ui)
      </div>
      <br />
      {/* ↓<Button>タグを消すと<Button>のimport文が自動削除されます。 */}
      <div>
        <Button>shadcn/ui の Button</Button>
      </div>
      <br />
      <Link href="./ModeTogglePage">ModeTogglePage</Link>
      <br />
      <Link href="/servercomponent">リンクボタン:サーバーコンポーネント</Link>
      <br />
      <Link href="/clientcomponent">
        リンクボタン:クライアントコンポーネント
      </Link>
    </main>
  );
};

export default Home;

```


```src\app\TrpcProvider.tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React from "react";
import { useState } from "react"

import { trpc } from "@/trpc"

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
    </trpc.Provider>
  )
}

```



```src\trpc-server.ts
import { initTRPC } from "@trpc/server"
import { z } from "zod"

const t = initTRPC.create()

interface User {
  id: string
  name: string
}

const userList: User[] = [
  {
    id: "1",
    name: "VNS.BLUE:1",
  },
  {
    id: "2",
    name: "Masakinihirota:2",
  },
  {
    id: "3",
    name: "シュレディンガーの猫主義:3",
  },
  {
    id: "4",
    name: "アナザーディメンション:4",
  },
  {
    id: "5",
    name: "狂乱索餌:5",
  },
]

export const appRouter = t.router({
  userById: t.procedure.input(z.number()).query((req) => {
    const { input } = req
    return userList.find((u) => parseInt(u.id) === input)
  }),
})

export type AppRouter = typeof appRouter

```

```src\trpc.ts
import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "./trpc-server"
export const trpc = createTRPCReact<AppRouter>()

```





# i18n



































調査中...


[WIP]
これより下は調査中です。

# Storybook の動作確認

npm run storybook

Storybook
http://localhost:6006/

コロケーションパターンで開発するので、
コンポーネントファイルと
ストーリーファイル(SF3)と
テストファイルを同一フォルダ内に入れます。

現在はデフォルトのコンポーネントが stories フォルダに入っています。

## Storybook インタラクションテストの組み込み

Play function

https://storybook.js.org/docs/react/writing-stories/play-function

npm install @storybook/testing-library @storybook/jest @storybook/addon-interactions --save-dev

Storybook の「インタラクションテスト」でフロントエンドのテストをシンプルに管理する！｜ SHIFT Group 技術ブログ

https://note.com/shift_tech/n/n5646b52b3092

インタラクションテストに対応した
コンポーネントと
ストーリーを作成します。

```Button.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import "./button.css";

interface ButtonProps {
  testId: string;
  label: string;
  text?: string;
  href?: string;
  primary?: boolean;
  "data-testid"?: string;
}

export const Button = ({
  testId,
  label,
  text,
  href,
  primary = false,
  ...props
}: ButtonProps) => {
  const [textToggle, setTextToggle] = useState(false);
  const router = useRouter();
  const mode = primary ? "primary" : "";

  const onClick = () => {
    if (href) {
      router.push(href);
    } else {
      setTextToggle(!textToggle);
    }
  };

  return (
    <div>
      <button
        data-test-id={testId}
        type="button"
        className={["button", mode].join(" ")}
        onClick={onClick}
        {...props}
      >
        {　label　}
      </button>
      {textToggle && <div>{text}</div>}
    </div>
  );
};

```

```button.css
.button {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 10px 20px;
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.primary {
  color: white;
  background-color: #1ea7fd;
}

```

```Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { jest, expect } from "@storybook/jest";

import { Button } from "./Button";

const fn = jest.fn();

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      router: {
        push: fn,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Default",
    "data-testid": "button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ボタンにLabelの文字列が表示されている", async () => {
      await expect(canvas.getByText("Default")).toBeInTheDocument();
    });
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary",
    "data-testid": "button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ボタンのclassName属性にprimaryが適用されている", async () => {
      const button = canvas.getByTestId("button");
      await expect(button.classList.contains("primary")).toBe(true);
    });
  },
};

export const Toggle: Story = {
  args: {
    label: "Toggle",
    text: "Success",
    "data-testid": "button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ボタン押下でtextを表示する", async () => {
      await userEvent.click(canvas.getByTestId("button"));
      await expect(canvas.getByText("Success")).toBeInTheDocument();
    });

    await step("再度ボタン押下でtextを非表示にする", async () => {
      await userEvent.click(canvas.getByTestId("button"));
      await expect(canvas.queryByText("Success")).toBeNull();
    });
  },
};

export const Link: Story = {
  args: {
    label: "Link",
    href: "/auth/login",
    "data-testid": "button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ボタン押下でhrefで指定した画面に遷移する", async () => {
      await userEvent.click(canvas.getByTestId("button"));
      await expect(fn.mock.lastCall).toContainEqual("/auth/login");
    });
  },
};

```

Storybook のダッシュボードを立ち上げると
Atoms
Button
Default
Primary
Toggle
Link

が表示されます。

Interactions タブに移動すると
テストが PASS しています。

## カバレッジの計測

npm install -D @storybook/test-runner @storybook/addon-coverage

※カバレッジインストール後、storybook を再起動させておかないとエラーになります。

scripts を追加します。

```package.json
{
 "scripts": {
 ...
 "test-storybook": "test-storybook --coverage",
 }
}

```

```.storybook/main.ts

const config: StorybookConfig = {
 addons: [
 ...
 '@storybook/addon-coverage',
 ],
};

```

カバレッジの計測には storybook を起動させておく必要があります。
npm run storybook

カバレッジの計測(新しいターミナルで実行します。)
npm run test-storybook

インタラクションテストの動作確認
カバレッジの計測を確認

---

# Supabase

この Supabase 項目は

Supabase ローカル開発環境 ＋ サーバー運用を想定 2023 - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

を参考にしてください。

ローカルに Supabase の CLI (command line interface)をインストールします。

scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

アップデート
scoop update supabase

Supabase CLI のバージョン
supabase --version

Supabase 本体とクライアントと Supabase Auth ヘルパーのインストール
npm install supabase @supabase/supabase-js @supabase/auth-helpers-nextjs

Supabase の初期化
supabase init

## サーバー側との接続（必要な場合）

Supabase へのログイン
supabase login

Supabase プロジェクトへのリンク
supabase link

## Docker のインストール

Supabase ローカル開発環境 ＋ サーバー運用を想定 2023 - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

を参考にしてください。

## ローカルの Supabase を始める

supabase start

```
06-18 15:49:49> supabase start
Seeding data supabase\seed.sql...me...
                                 Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhb**********************************n_I0
service_role key: eyJhbGci*******************************pN81IU

```

ステータス
supabase status

ローカルの Supabase(Docker)を止める
supabase stop

## Supabase を利用したローカルでの開発

Supabase ローカル開発環境 ＋ サーバー運用を想定 2023 - Qiita

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

を参考にしてください。

## Supabase クライアントの基礎

src\utils\supabase.ts という新しいファイルを作成し、以下の内容を追加します。

```src\utils\supabase.ts

import { createClient } from '@supabase/supabase-js'

export default createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

```

これを呼び出すことで Supabase クライアントが作成できます。

---

# サービスとの連携コマンド

プロジェクトを GitHub で公開して、それを Vercel から連携させます。

取得した独自ドメインがあるのならドメイン登録もできます。

vercel 関連
Next.js×Supabase×Vercel 連携について - Qiita

https://qiita.com/kaho_eng/items/8a7faf77222a599fb31c

npm vercel login

Vercel プロジェクトをローカル環境にクローンしたプロジェクトにリンクします。
npm vercel link

環境変数を連携した Vercel プロジェクトからコピーして .env.local に上書きできます。
npm vercel env pull

---


# i18n

[WIP]

---

# 削除してもいいフォルダ

src\stories

このフォルダは Storybook をインストールするときにデフォルトで入ってくるサンプルなのでサンプルを見ながら書く人以外は消してしまってもいいです。

※コロケーションパターンで開発するので、コンポーネントファイル、テストファイル、Story ファイルはすべて同一のフォルダに入れます。
理由は半年前も経てばどのファイルがどのフォルダに入っているかわからなくなるからです。なのでコロケーションパターンの原則を出来る限り守ります。
グローバル化したいものや共通化したいものは除く。

---

# 参考 URL

GitHub Qiita 記事
Supabase ローカル開発環境 ＋ サーバー運用を想定 2023

https://qiita.com/masakinihirota/items/be94b4c74a7850a4b79c

GitHub masakinihirota/vns
https://github.com/masakinihirota/vns

Supabase VNS

https://app.supabase.com/project/gzctqdrrnnkaxwwtzbsw

Vercel VNS

https://vercel.com/masakinihirota/vns

Next.js by Vercel - The React Framework

https://nextjs.org/

Storybook

https://storybook.js.org/docs/react/get-started/install/

React×TypeScript ではじめる Vitest

https://zenn.dev/bs_kansai/articles/b79d97a8f921d6

Storybook(v7)を Vitest で再利用するとき

https://zenn.dev/pluto0004/articles/3bab7d07805cff

Storybook の「インタラクションテスト」でフロントエンドのテストをシンプルに管理する！｜ SHIFT Group 技術ブログ

https://note.com/shift_tech/n/n5646b52b3092

[2023 年]Next.js + eslint 周りの設定

https://zenn.dev/resistance_gowy/articles/91b4f62b9f48ec

【環境構築】Next × App Router × Prettier × ESLint × Husky × Shadcn/ui の環境構築をしてみる - Qiita

https://qiita.com/hiroto_dnpk/items/a7ebbca3294c7befb4b7

---

# 未インストール

<details><summary>未インストール[WIP]</summary>

# vitest

テストツール

???
npm create vite@latest

React と TypeScript を選択します。

cd vitest-react
npm install
npm run dev

ここからインストール？
npm install -D vitest

npm install -D jsdom @testing-library/react @testing-library/jest-dom

.eslintignore
ファイル内に vitest.config.ts を書く

```
vite.config.ts
vitest.config.ts
.eslintrc.cjs

```

Vitest の設定
vite.config.ts

```vitest.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ['src/**/*.test.tsx'],
        environment: 'jsdom',
    },
})

```

src/以下のみに設定してある

## テストコードの作成

App コンポーネントに対して、「Vite + React」が表示されているかのテストを書いてみます。

```
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../App';

test('renders h1 text', () => {
    render(<App />);
    const headerElement = screen.getByText("Vite + React");
    expect(headerElement).toBeInTheDocument();
});

```

実行
npm vitest

カバレッジの実行
npm vitest run --coverage

```
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.test.tsx'],
        environment: 'jsdom',
        coverage: {
            reporter: ['html'],
            reportsDirectory: './coverage'
        },
    },
})

```

</details>
