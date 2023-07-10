<!--
title:   Next.js template (supabase)
tags:    Next.js,supabase
id:      3ad7a1564d2b6c56d4db
private: true
-->
Next.jsと関連するツールをインストールしてテンプレートとして利用します。

# 重要コマンド

```

test

Supabase CLI 更新
scoop update supabase

ショートカット設定
(Microsoft.PowerShell_profile.ps1 のショートカット設定)
d	Next.jsローカルサーバーを起動
s	storybookを起動

Supabase CLI
supabase start
supabase stop
supabase db reset
supabase status

Supabase ダッシュボード
http://localhost:54323

npm run storybook
インタラクションテスト storybookを起動させて
npm run test-storybook

Vercel
npx vercel login
npx vercel link
npx vercel env pull
```

# 作業コマンド

短縮コマンド
cb	ブランチの作成

mainブランチに移動
main

ブランチのマージ
直前にいたブランチのマージ
git merge -

ブランチの削除
DDD ブランチ名

git merge [マージしたいブランチ名]






## ローカルのダッシュボード

Next.js
http://localhost:3000

Supabase
http://localhost:54323/projects

Storybook
http://localhost:6006/



Next.js 13 app router テンプレートの作成

# 名前
next13apptemplate

# 環境
Next.js
typescript
TailwindCSS

eslint
Supabase
Storybook

GitHub
Vercel


## 他のインストール候補

### UI
mantine
Shadcn/ui

### デザイン
Figma
デザイントークン
デザインシステム

### i18n
react-i18next

Introduction - react-i18next documentation
https://react.i18next.com/


### テスト関連
Jest
vitest
Chromatic
Testing Library
Cypress
Playwright


## 開発時の利用ツール
DB関連
DBeaver
Table Plus
A5:SQL Mk-2


### その他
zod
tRPC
Prisma


# ルール

書いたコードはsrcフォルダ以下に移動する
src/

共通のstyleコード
src/styles



ブランチは基本2種類
mainブランチ 公開用のコード
必要に応じて開発用のブランチを作成(ここで開発をする)
この２つを軸に開発していく
一区切りついたら開発用のブランチをmainにマージしていく

## 開発手法
コロケーション

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
Storyファイルも一緒に
コンポーネントフォルダのrootに置く

コロケーション | makotot.dev ファイルの配置
https://www.makotot.dev/posts/colocation-translation-ja

インタラクションテスト
ストーリーとテストを一元管理できる
ストーリーファイルにテストを記述する事になるため、
ストーリーとテストを一元管理できます。

テストを実行する方法は主に2つで、
通常はブラウザ上でStorybookを
表示して実行します。

テストランナーをセットアップすることで、
CLIでの実行が可能になります。





# インストール

## 基本

npmを最新にする
npm install -g npm@latest

Next.jsをインストール
npx create-next-app@latest
	app routerを使用する

Storybookのインストール
npx storybook@latest init

.gitignoreに登録
package-lock.json


### TailwindCSS

https://nextjs.org/docs/app/building-your-application/styling/tailwind-css

```src\styles\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

``````

### eslint
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-import-resolver-typescript


```.eslintrc.json
{
  // ESLintの設定ファイルがプロジェクトのルートディレクトリにあることを指定する
  "root": true,
  "extends": [
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    // JSXを使用することを許可するために、ecmaFeaturesオブジェクト内のjsxプロパティをtrueに設定しています。これにより、ESLintはJSXを含むJavaScriptのコードを解析することができます。
    "ecmaFeatures": {
      "jsx": true
    },
    // ECMAScriptの最新バージョンを使用することを指定する
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react", "import"],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".json"]
      },

      "typescript": {
        "config": "tsconfig.json",
        // TypeScriptの型推論を改善するためのESLintの設定です。この設定をtrueにすると、ESLintは常に型情報を使用して、変数や関数の型を推論しようとします。これにより、TypeScriptの型推論の精度が向上し、より正確な型チェックが可能になります。
        "alwaysTryTypes": true
      }
    }
  },
  "rules": {
    "@typescript-eslint/ban-types": [
      "error",
      {
        // 空のオブジェクト型を禁止する
        "types": {
          "{}": false
        }
      }
    ],
    // Reactコンポーネントのprop-typesをチェックするルールです。
    "react/prop-types": ["off"],
    // Reactをインポートする必要がない場合に警告を出すルールです。
    "react/react-in-jsx-scope": "off",
    // .jsxまたは.tsxファイルでJSXを使用することを強制するルールです。
    // Reactコンポーネントを定義するファイルの拡張子が.jsxまたは.tsxであることを要求します。これにより、Reactコンポーネントを含むファイルを簡単に特定することができ、コードの可読性を向上させることができます。
    "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }],
    // import文の順序を強制するルールです。
    "import/order": ["error"],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "singleQuote": true,
        "tabWidth": 2
      }
    ]
  }
}


```

### prettier
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier

自動でフォーマットする場合
Visual Studio Codeの拡張機能
「Prettier - Code formatter」をインストールします


```.prettierrc
{
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 2
}

```

### スクリプトの追加

```package.json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx .",
    "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx --fix .",
    "test": "jest --env=jsdom --verbose",

  },

``````

--env=jsdom --verboseのオプション
テストファイル1個1個に対してテストが通ったかを確認することができます。











# サービスとの連携コマンド

vercel関連
Next.js×Supabase×Vercel連携について - Qiita
https://qiita.com/kaho_eng/items/8a7faf77222a599fb31c

npx vercel login

Vercelプロジェクトをローカル環境にクローンしたプロジェクトにリンクします。
npx vercel link

環境変数をVercelプロジェクトからコピー .env.localに上書きされる
npx vercel env pull




# URL
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
