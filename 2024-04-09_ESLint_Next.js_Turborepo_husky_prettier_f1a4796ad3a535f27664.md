<!--
title:   Next.js の ESLintとPrettier、turborepo、husky Next.js公式のドキュメントと独自調査
tags:    ESLint,Next.js,Turborepo,husky,prettier
id:      f1a4796ad3a535f27664
private: false
-->
この記事は、公式ドキュメントと、独自に調べた設定について書きました。

* 公式のドキュメントの設定
* 独自調査の設定
の二部に分けられています。

公式のドキュメントは基礎的な設定だけです。
独自調査では色々調べて作った設定です。

※この記事はvns_templateを作るために書きました。

----------------------------------------

# チェック＆整形＆修正コマンド

```terminal
pnpm run lint
pnpm run lint:debug
pnpm run lint:fix
pnpm run prettier-fix

```

これをhuskyをつかって、
コミット時とプッシュ時に自動実行させます。



----------------------------------------

# ESLint

ESLint自体はNext.jsインストール時に選択可能です。

Next.js 公式ドキュメント App Router用

Configuring: ESLint | Next.js

https://nextjs.org/docs/app/building-your-application/configuring/eslint



----------------------------------------

# 1部

## ESLintの設定ファイル


.eslintrc.jsonなどの設定ファイルがない場合

```terminal
pnpm run lint

```

↑初めて実行すると選択肢が出てきます。



```terminal
> pnpm run lint
You'll see a prompt like this:

? How would you like to configure ESLint?

❯ Strict (recommended)
Base
Cancel

```

どれかを選びます。
すでに、設定ファイルがあるならCancelを選びます。



### Strict (recommended)

```.eslintrc.json
{
  "extends": "next/core-web-vitals"
}

```

next/core-web-vitals はNext.jsに組み込まれています。


### Base

```.eslintrc.json
{
  "extends": "next"
}

```

※ドキュメントによると、自動で設定ファイルが生成されます。
(しかし、自分の場合は自動生成されなかったので手動で追加しました。)



next/core-web-vitals
か
next
のどちらかを選ぶことになります。

この設定ファイルに追加していきます。



----------------------------------------

# eslint-config-next

デフォルト構成 ( eslint-config-next) には、Next.js ですぐに使用できる最適な lint エクスペリエンスを実現するために必要なものがすべて含まれています。

このルールには
* eslint-plugin-react
* eslint-plugin-react-hooks
* eslint-plugin-next
を含んでいます。

これらは next.config.js の設定よりも優先されます。



## ESLint プラグイン

eslint-plugin-next
は次のルールで構成されています。

* **フォントの設定まわり**
  * @next/next/google-font-display: Google Fonts を使うとき、フォントの表示方法を正しく設定しているかチェック
  * @next/next/google-font-preconnect: Google Fonts を読み込む前に、ブラウザが準備するように促しているかチェック


* **next/script コンポーネントまわり**
  * @next/next/inline-script-id: インラインスクリプトを含む next/script には id 属性が必須かどうかを教えてくれる
  * @next/next/next-script-for-ga: Google Analytics のインラインスクリプトを使うときは、next/script コンポーネントを使うように勧める



* **Next.js 独自の挙動まわり**
  * @next/next/no-assign-module-variable: 特殊な変数 `module` に値を代入するのを防止
  * @next/next/no-async-client-component: クライアントコンポーネントを async 関数にしないように注意喚起
  * 他にも、特定のファイル以外で特定の機能を使わないように促すルールがあるよ



* **不要なタグやコンポーネントの使用を防止**
  * @next/next/no-css-tags 手動でスタイルシートのタグを書くのを防止
  * no-document-import-in-page `next/document`のクライアントからのインポートを防止
  * no-head-element <head>要素の直接使用を防ぎ、代わりにnext/headコンポーネントの使用を強制します。
Next.jsでは、`next/head`を使用してページの`<head>`要素を操作することが推奨されています。
  * no-head-import-in-document _document.js内でのnext/headの使用を防止
`_document.js`は、サーバーサイドでのみレンダリングされるため、`next/head`はここでは機能しません。

  * no-script-component-in-head `next/head`コンポーネント内での`next/script`の使用を防ぎます。`next/script`は`<body>`内でのみ使用することが推奨されています。
  * no-styled-jsx-in-document `pages/_document.js`での`styled-jsx`の使用を防ぎます。



* **パフォーマンス改善のためのルール**
  * @next/next/no-img-element: 画像 (img タグ) の使いすぎを防止 (読み込みが遅くなるため)
  * @next/next/no-sync-scripts: 同期スクリプトの使用を減らすように勧める (ページの読み込みが遅くなるため)



* **その他**
  * @next/next/no-html-link-for-pages: 内部リンク (<a> タグ) を使わず、Next.js のナビゲーション機能を使うように促す
  * @next/next/no-page-custom-font: 特定のページだけでカスタムフォントを使わないように注意喚起
  * @next/next/no-typos: データ取得処理 (getStaticProps や getServerSideProps) でよくある入力ミスを防止
  * @next/next/no-unwanted-polyfill: 余計な Polyfill.io の読み込みを防止



Next.js向けの ESLint ルール一覧

Next.js アプリのよくある間違いを防ぐために、Next.js では ESLint ルールが用意されています。

これらのルールは、Next.js のベストプラクティスとアンチパターンを強制するためのものです。



----------------------------------------

# カスタムディレクトリとファイルのリント

デフォルトでは、Next.jsはpages/, app/, components/, lib/, src/ディレクトリのすべてのファイルに対してESLintを実行します。ただし、next.config.jsのeslint configでdirsオプションを指定することで、本番ビルドで使用するディレクトリを指定することができます：


```next.config.js
module.exports = {

・・・

  eslint: {
    dirs: ['apps', 'utils'],
  },
}

```

↑'apps' ディレクトリと 'utils' ディレクトリでのみ ESLint を実行します。



----------------------------------------

# ESLintのキャッシュ

ESLintのキャッシュはデフォルトで有効になっています。

パフォーマンスを向上させるために、ESLintによって処理されるファイルの情報はデフォルトでキャッシュされます。これは.next/cacheまたは定義したビルドディレクトリに保存されます。
一つのソースファイルの内容以上に依存するESLintルールを含み、キャッシュを無効にする必要がある場合は、next lintで--no-cacheフラグを使用してください。

## キャッシュの無効化

```terminal
next lint --no-cache

```



----------------------------------------

# ルールの無効化

ルールを変更したり無効にしたい場合は、.eslintrcのrulesプロパティを使って直接変更することができます：

例

```.eslintrc.json
{

  "extends": "next",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }

}

```



----------------------------------------

# Core Web Vitals

## Next.js の lint 設定と Core Web Vitals

### Core Web Vitals とは？

Core Web Vitals は、Google が定めた、ウェブページの読み込み速度やインタラクティブさ、視覚的安定性などを測る指標のことです。ユーザーが快適にウェブページを利用できるかどうかを判断するのに役立ちます。

### Next.js の lint 設定と Core Web Vitals

Next.js には、コードの品質チェックを行う ESLint というツールが組み込まれています。`next/core-web-vitals` という設定を使うと、このチェックに Core Web Vitals に関するルールを追加できます。

### ポイント

* `next lint` コマンドを実行するときに `strict` オプションを選ぶか、`.eslintrc.json` ファイルに `extends: "next/core-web-vitals"` と記述すると、Core Web Vitals に関するルールが有効になります。
* 有効になると、本来は警告 (warning) レベルだったルールがエラー (error) レベルになり、コードが Core Web Vitals のスコアに悪影響を与える可能性がある箇所を厳しくチェックしてくれます。
* 新しく Next.js アプリケーションを作成するときには、この `next/core-web-vitals` 設定が初期設定として自動的に含まれています。

### まとめ

Next.js の lint 設定を使って、コードが Core Web Vitals のスコアを悪化させる可能性を事前に見つけ、修正することで、ユーザーに快適なウェブページが提供できます。


```.eslintrc.json
{
  "extends": "next/core-web-vitals"
}

```



# Additional Configurations

追加設定

## Next.js の lint 設定: 既存設定との統合

すでに別の ESLint 設定を使っている場合でも、`eslint-config-next` を取り入れることができます。ただし、**他の設定の後**、最後に `eslint-config-next` を継承するようにしてください。

**例:**

```.eslintrc.json
{
  "extends": ["eslint:recommended", "next/core-web-vitals"]
}

```

`next` という設定は、`parser` (構文解析器)、`plugins` (プラグイン)、`settings` (設定) などのプロパティのデフォルト値を既に設定済みです。特別な理由がない限り、これらのプロパティを手動で再定義する必要はありません。

もし他の共有可能な設定も取り入れる場合は、これらのプロパティが上書きや変更されないように注意してください。そうでない場合は、`next` 設定と同じような挙動を持つ設定を削除するか、上記のように Next.js ESLint プラグインから直接継承することをおすすめします。

**ポイント:**

- 既存の ESLint 設定がある場合は、`eslint-config-next` を最後に継承するようにしましょう。
- `next` 設定は必要なプロパティをデフォルトで設定済みなので、特別な理由がなければ変更する必要はありません。
- 他の設定と併用する場合、プロパティの競合に注意しましょう。



----------------------------------------

# Pretter

ESLint には、既存の Prettier 設定と競合する可能性があるコード形式ルールも含まれています。 ESLint と Prettier を連携させるために、ESLint 構成に eslint-config-prettier を含めることをお勧めします。



## インストール

```terminal
pnpm add --save-dev eslint-config-prettier

```

## 設定ファイル

既存の ESLint 設定ファイルにprettierを追加します。

```.eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"]
}

```





----------------------------------------

通常使用コマンド

```terminal
next lint

```

作った設定ファイル

```.eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"]
}

```

ここまでがNext.js 公式ドキュメント



----------------------------------------
----------------------------------------
----------------------------------------

# 2部

## Next.js 公式ドキュメント以外の追加設定

※個人の独自設定です。



----------------------------------------

## tsconfig.json

TypeScriptを開発しやすくします。

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



----------------------------------------

## ESLint 独自設定

.eslintrc.json ファイルを作成します。

```terminal
touch .eslintrc.json

```

```.eslintrc.json
{
  // JavaScriptの実行環境を指定
  "env": {
    "browser": true,
    "es2023": true,
    "node": true
  },
  "root": true,
  // 構文解析に使用するパーサーの指定
  // デフォルトの設定ではES5しかパースできない
  "parser": "@typescript-eslint/parser",
  // parserのオプションを設定
  // JSXやECMAScriptのバージョンの設定など
  "parserOptions": {
    "EXPERIMENTAL_useProjectService": true,
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },

  // 任意のルール実行時に適用される追加の共有設定
  "settings": {
    "react": {
      "version": "detect"
    }
  },

  // 追加ルールの指定
  // pluginsにルールを指定しても、ルールは適用されていない状態
  // 追加ルールを適用する場合は、extendsかrulesで設定が必要
  "plugins": ["react", "react-hooks", "@typescript-eslint", "import", "unused-imports"],

  // 共有設定の適用
  // 各pluginで公開されている設定ファイルを指定することで、ルールの設定を適用
  // ルール設定が重複する場合は、後から指定したものが適用される
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "next/core-web-vitals",
    "prettier"
  ],

  // 個別のルール設定
  // extendsで指定した共有設定以外の個別設定
  // 0:無効, 1:警告, 2: エラー
  "rules": {
    "no-case-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // typescript-eslintのban-ts-commentルールについて
    // https://qiita.com/KokiSakano/items/ff8dde69d7f4296e2480
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": false,
        "ts-nocheck": false,
        "ts-check": false
      }
    ],
    // TypeScriptで未使用の変数を許可するかどうかを指定します。この例では、offに設定されているため、未使用の変数を許可します。
    "@typescript-eslint/no-unused-vars": "off",
    // 未使用のインポートに関するルールを指定します。この例では、warnに設定されているため、未使用のインポートがある場合に警告を出します。
    "unused-imports/no-unused-imports": "warn",
    // モジュールのインポート順序に関するルールを指定します。この例では、配列の中に複数のグループが定義されています。各グループは、groupsプロパティで定義されています。
    "import/order": [
      "error",
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
          { "pattern": "src/**", "group": "internal", "position": "before" }
        ]
      }
    ]
  }
}

```



.eslintignoreファイルの作成

```terminal
touch .eslintignore

```

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

node_modules
public

# shad/cn
src/components/ui/

# supabase
# supabase型ファイル
types_db.ts

```


## ESLint の scripts

```package.json
"scripts": {
    "lint": "eslint --ext .ts,.js,.tsx,.jsx src",
    "lint:debug": "eslint --ext .ts,.js,.tsx,.jsx src --debug",
    "lint:fix": "eslint --ext .ts,.js,.tsx,.jsx src --fix",
}

```



----------------------------------------

# Prettier 独自設定

## インストール

公式サイト Install Prettier

https://prettier.io/docs/en/install.html

```terminal
touch .prettier.json

```

```package.json
"scripts": {
    "prettier-fix": "prettier --write .",
}

```



## Prettier 設定ファイル

```.prettier.json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid",
  "useTabs": false
}

```



## .prettierignoreファイルの作成

```terminal
touch .prettierignore

```

```.prettierignore
# Build artifacts
.turbo/
_next/
__tmp__/
dist/
node_modules/
target/
compiled/

types_db.ts
database.types.ts

# Ignore artifacts:
/build
coverage

# dotfile
.env*

# next.js
/.next/
/out/

package-lock.json
pnpm-lock.yaml

# Supabase
/supabase/
src/types/*
src/types/database.types.ts
src/types/types_db.ts

# Storybook
*.stories.ts
*.stories.tsx

# Dependency directories
node_modules

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# text
*.md
*.txt
*.csv

```



## Prettier コマンド一覧

※通常は VSCode 側を設定すれば、保存時に自動で実行されるので、コマンドを打つことはほとんどありません。

動作確認のため prettier を実行します。

```terminal
# 全体をフォーマットします。
pnpm run prettier-fix

# src ディレクトリ以下をフォーマットします。
npx prettier src/ --write

# 巨大プロジェクトの場合に時間短縮のためフォルダを指定したい場合
npx prettier [指定フォルダ名] --write

# 直接ファイルを指定する場合
npx prettier src\app\page.tsx --write

# prettier が実行済みかの確認（上書きはしない）
npx prettier . --check

```



## VSCodeの拡張機能

Prettier

Prettier - Code formatter - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode



## ESlintとPrettierの基本コマンド

```terminal
pnpm run lint
pnpm run lint:debug
pnpm run lint:fix
pnpm run prettier-fix

```



----------------------------------------

##  turborepo の導入

push時などにコードのチェックをしてもらいます。
高速化



## 公式ドキュメント

Add Turborepo to your existing project – Turborepo

https://turbo.build/repo/docs/getting-started/add-to-project



## インストール

グローバルにインストールします。

```terminal
pnpm add turbo --global

```



更新

```terminal
npx @turbo/codemod@latest update

```



設定ファイル
touch turbo.json

```turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "type-check": {}
  }
}

```



```.gitignore
・・・
# turborepo
.turbo

```

1回目の実行
turbo type-check build

※コミット後に実行します、アプリケーションを起動させていたら停止させておきます。

```terminal
 Tasks:    1 successful, 1 total
Cached:    1 cached, 1 total
  Time:    182ms >>> FULL TURBO

```

ビルドが成功すると緑色の文字でsuccessfulとでます。

2回目の実行
turbo type-check build

↑すぐに2回目を実行すると、すぐに終了するのでキャッシュされていることがわかります。



`turbo dev` (≒pnpm run dev)
開発モードでアプリケーションを起動します。ソースコードの変更を監視し、変更があるたびにアプリケーションを自動的に再起動します。

`turbo type-check build`
TypeScriptの型チェックを行い、その後にビルドプロセスを実行します。型チェックは、コード内の型エラーを検出するためのものです。



----------------------------------------

# husky のインストール
gitのコミット時にformatの実行します。

(package.jsonのscript)

githubへのpushの時に
buildを実行します。

## インストール

```terminal
pnpm i -D husky
npx husky init
touch .husky/pre-commit
touch .husky/pre-push

```

`turbo build`はturbo repoをインストールしている場合のコマンドです。

↑ファイルに記入するコマンドは自分の好みに設定します。

```.husky/pre-commit
pnpm run prettier-fix
pnpm run lint:fix

```

```.husky/pre-push
turbo type-check build

```



----------------------------------------

## プラグインのインストール

pnpm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-plugin-unused-imports eslint-plugin-storybook

↑の↓リスト

```
@typescript-eslint/parser
@typescript-eslint/eslint-plugin
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-import
eslint-plugin-unused-imports
eslint-plugin-storybook

```