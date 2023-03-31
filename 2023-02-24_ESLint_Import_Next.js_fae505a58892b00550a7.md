<!--
title:   Next.js開発 ESLintでimport文の自動挿入、自動削除、自動ソート
tags:    ESLint,Import,Next.js
id:      fae505a58892b00550a7
private: false
-->

# 簡易版（まとめ）



## インストール
Next.jsのインストール
npx create-next-app

## .eslintrc.json

```.eslintrc.json
{
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "next/core-web-vitals",
  "plugins": ["import", "unused-imports"], // eslint-plugin- 接頭辞は省略
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        // それぞれのgroupsとの間は1行分空ける。
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
        // 大文字小文字関係なくアルファベット順にする。
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "pathGroups": [
          { "pattern": "src/types/**", "group": "internal", "position": "before" },
          { "pattern": "src/repositories/**", "group": "internal", "position": "before" }
        ]
      }
    ]
  }
}

```

成功しているならば、import文の自動挿入と自動削除が成功します。

終了

# 完成リポジトリ

https://github.com/masakinihirota/eslint_auto

## 環境

VScode
Next.js@^13
Prettier@^2.5.1
ESLint@^8.7.0
typescript@^4.4.4
@typescript-eslint/parser@^5.0.1
eslint-config-next

## VSCode拡張機能

VScodeに下記の拡張機能をインストールします。

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## インストール

Next.jsはこれを使ってインストールをします。
（最初からsrcディレクトリを作ってくれて便利＆TailwindCSS派）

https://create.t3.gg/

Next.jsのインストール

`npm create t3-app@latest`

## VSCode側の設定

VSCodeのsettings.jsonを開きます。（ショートカット Ctrl + ，）
もしくは、
左下の歯車アイコンから
設定＞右上にある「設定（JSON）を開く」ボタンをクリックします。

```settings.json
{
  // settings.jsonに追記してください。
  //
  // フォーマット
  // フォーマットをprettierで実行
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 貼り付け時にフォーマット
  "editor.formatOnPaste": false,
  // 入力直後にフォーマット
  "editor.formatOnType": false,
  // 保存直後にフォーマット
  "editor.formatOnSave": true,
  // 保存時にファイルの変更部分だけを
  // 自動的に整形するかどうかを設定する。
  // "file" 保存時にファイル全体が整形されます。
  // "modifications" 保存時に変更部分だけが整形されます。
  "editor.formatOnSaveMode": "file",
  // 自動保存するタイミング
  // "onFocusChange" フォーカスが外れた時
  "files.autoSave": "onFocusChange",
  // files.autoSaveのafterDelay設定値（デフォルトは1000）
  "files.autoSaveDelay": 1000,
}

```

# 必要なプラグインをインストール

`npm install --save-dev eslint-config-next`
`npm install --save-dev eslint-plugin-import`
`npm install --save-dev eslint-plugin-unused-imports`



# import文を自動的に挿入

VScodeのsettings.jsonに追記します。

```settings.json
  // TypeScript JavaScript
  "editor.codeActionsOnSave": {
    // import文を自動で探して挿入する。
    "source.addMissingImports": true,
    // 保存時にeslintを実行
    "source.fixAll.eslint": true
  },
```

# import文を自動的に削除

https://www.npmjs.com/package/eslint-plugin-unused-imports

`plugins` に `unused-imports` を追加します。

```.eslintrc.cjs
  plugins: ["@typescript-eslint", "unused-imports"],

```

rules に `unused-imports/no-unused-imports` を追加します。

`eslint-plugin-unused-imports` を plugins と rules に追加します

```.eslintrc.cjs
  "plugins": ["unused-imports"],

  "rules": {
    "unused-imports/no-unused-imports": "warn",
  }

```

# import文を自動的にソート

ファイルに設定を書きます。

```.eslintrc.cjs
"plugins": ["import"]

```

ソート順を調整します。

```
"import/order": [
      "error",
      {
        // 優先順位
        groups: [
          "builtin", // node
          "external", // npm install
          "internal", // パス設定したモジュール
          "parent", // 親子
          "sibling",
          "index",
          "object", // オブジェクト
          "type", // 型
        ],
        // それぞれのgroupsとの間は1行分空ける。
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
        // 大文字小文字関係なくアルファベット順にする。
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],

```

## 詳細ドキュメント

https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md

`["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"]`
この順番で設定すると、以下の例のような優先順位でソートされます。

<details><summary>参考例</summary>

```
// 1. ノード「組み込み」モジュール
import fs from 'fs';
import path from 'path';

// 2. "外部 "モジュール
import _ from 'lodash';
import chalk from 'chalk';

// 3. "内部 "モジュール
// (pathやwebpackで内部パスの扱いを変えている場合)
import foo from 'src/foo';

// 4. "親 "ディレクトリからのモジュール
import foo from '../foo';
import qux from '../../foo/qux';

// 5. "兄弟 "モジュール（同じディレクトリまたは兄弟ディレクトリから
import bar from './bar';
import baz from './bar/baz';

// 6. 現在のディレクトリの「インデックス
import main from './';

// 7. "オブジェクト "のインポート（TypeScriptでのみ利用可能）
import log = console.log;

// 8. "type "インポート（FlowとTypeScriptでのみ利用可能）。
import type { Foo } from 'foo';

```

</details>

# package.json 完成全文

<details><summary>package.json全文</summary>

```package.json
{
  "name": "eslint_auto",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start"
  },
  "dependencies": {
    "@tanstack/react-query": "^4.20.2",
    "@trpc/client": "^10.9.0",
    "@trpc/next": "^10.9.0",
    "@trpc/react-query": "^10.9.0",
    "@trpc/server": "^10.9.0",
    "next": "13.1.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "superjson": "1.9.1",
    "zod": "^3.20.2"
  },
  "devDependencies": {
    "@types/eslint": "^8.21.1",
    "@types/node": "^18.11.18",
    "@types/prettier": "^2.7.2",
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.10",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "autoprefixer": "^10.4.7",
    "eslint": "^8.30.0",
    "eslint-config-next": "13.1.6",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-unused-imports": "^2.0.0",
    "postcss": "^8.4.14",
    "prettier": "^2.8.1",
    "prettier-plugin-tailwindcss": "^0.2.1",
    "tailwindcss": "^3.2.0",
    "typescript": "^4.9.4"
  },
  "ct3aMetadata": {
    "initVersion": "7.5.6"
  }
}

```

</details>

# eslintrc.cjs 完成全文

<details><summary>eslintrc.cjs全文</summary>

```.eslintrc.cjs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "unused-imports/no-unused-imports": "warn",
    "import/order": [
      // 順番が間違っていた時の警告方法 "error"
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        // それぞれのgroupsとの間は1行分空ける。
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
        // 大文字小文字関係なくアルファベット順にする。
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};

```
</details>


# 再起動
**※重要:設定を反映させるためにVSCodeを再起動させます。**

# 試してみる

シンプルに余分なものを削ったファイルです、色々試してみてください。

```src\pages\index.tsx
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href="/">Home</Link>
    </>
  );
};

export default Home;

```

このファイルで
import文を削ってみたり、
タグを削ってみたり、
import文の順番を変えてみたりして効果を実感してみてください。

import文が本文で必要だったら自動インストールされますし、
たとえば<Link>タグを削ると`import Link`も自動的に削除されます。

# 参考

React+TSプロジェクトで便利だったLint/Format設定紹介
https://zenn.dev/yoshiko/articles/0994f518015c04

importの順番をルール化して自動で整列させるeslint-plugin-import
https://zenn.dev/rena_h/scraps/fd330154d02f76
