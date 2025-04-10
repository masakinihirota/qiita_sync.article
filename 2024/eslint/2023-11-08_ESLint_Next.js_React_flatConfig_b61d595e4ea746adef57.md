<!--
title:   ESLint Flat Config 入門編 +ESLintの基礎知識 (Next.js App router、React)
tags:    ESLint,Next.js,React,flatConfig
id:      b61d595e4ea746adef57
private: false
-->
# ESLint Flat Config 入門編

ESLint Flat Config 入門編 +ESLintの基礎知識
[ESLint Flat Config 入門 ドキュメント編 (Next.js App router、React) #React - Qiita](2023-11-08_ESLint_Next.js_React_flatConfig_04b4cb846b1a5cf8d23c.md)
[ESLint Flat Config 入門 マイグレーション編 (Next.js App router、React) #React - Qiita](2023-11-08_ESLint_Next.js_React_flatConfig_ba54efa93989de68d2a0.md)

※特にこだわりがなければ、古い設定ファイルからFlat Configへ移行するよりも、新しいツールだと思って0から構築したほうがいいと思います。

<details><summary>コラム：Flat Configに移行すべき？それとも今のまま？</summary>
Flat Configは設定をするときに簡単になるだけで、特に新しい機能があるというわけではありません。
現状特に不満がなければ古い設定方法で問題ありません。

Flat Configに移行するかどうかの判断
* 0からESLintを導入する。
* 新しい物好き、新しい機能を試してみたい。
という人には向いています。

※ここでいう新しい機能とはFlat Configの設定方法とESLint自身の機能という意味です。
前者は新しい設定方法になりましたが、後者はESLint自身の機能は変わっていません。

またサードパーティのPluginがFlat Configに対応していない場合があるという問題もでてきます。
ESLintのマニュアルも使用ユーザーから見たらかなり読みづらい構成になっています。
そもそも、いまどんなルールがオンになっているのか、オフになっているのかわかりません。
現在有効になっているルールはいくつあるのかもわかりません。
(もっと調べていけば、現状のルールを表示する方法はあるかもしれませんがまた見かけていません。)

GUIで使用するルールをオンオフできて、それをそのまま設定ファイルで出力してくれるWebサービスがあればなぁと妄想しています。

</details>



# 環境

Windows10
VSCode
node v18.17.1
Next.js 14



# 目的

Next.js 14で使用するESLintをFlat Config設定ファイルで動かします。

# Rules一覧

グーグルスプレッドシートにまとめました。

ESLint Rules - Google スプレッドシート

https://docs.google.com/spreadsheets/d/1zUU5h_nEXFCg_E2ktmE7Hv-SFir5Y0tFkKcQ1oMQCBc

各スプレッドシートは

* ESLintとtypescript-eslintの2つの全ルールをまとめてABC順にソート
* ESLintの全ルール
* typescript-eslintの全ルール

をまとめてあります。

※2023年11月7日時点



# 用語

## カスケード

小さな滝

ESLintにおいては、サブフォルダにも設定ファイルを置けて、そこから親へ遡ってルールを決めていくツリー構造でした。
それがFlat Configからはリスト構造になります。

:::note info
**このツリー構造からリスト構造に変更された**のが Flat Config の名付け元であり肝です。

Flat Config ってなんだ？という疑問の答えでもあります。

:::

<details><summary>コラム：ツリー構造からリスト構造への移行</summary>

ツリー構造で設定を書くよりもリスト構造で設定を書くほうが楽だと直感でわかります。
ツリー構造でカスケードを採用すると複数の枝からルールが登ってきますからね。
ESLintの仕組み上すべての設定ファイルを一つに統合します。

採用当時はOSのファイルシステムに沿った良い手法だったのだと思います。
しかし採用ルールがだんだんと増えていき、さらにTypeScriptの一般化でルールが一気に倍増、設定がより複雑になっていき、社外秘の熟成ダレになっていきました。

Flat Configはリスト構造である配列を使って前から順番にルールを適用していきます。
そして、後ろの方でルールが被ったら上書きするというルールを採用しています。
以前の設定でもoverrideで上書きしていましたが、Flat Configではoverrideと書く必要もなくデフォルトで上書きされます。

というわけで、カスケードが諸悪の根源の一つであったわけです。
かといってリスト構造への変更で300種類以上あるルールを整理しやすくなったかというとそうでもありません、どの共有設定を使い、どのルールをどのような順番に並べるのがベストプラクティスなのかなど、悩みのタネは尽きません。

</details>

## eslint.config.js

ESLintで使用する Flat Config用の設定ファイル名。
以前は複数の設定ファイル名が提供されていたが、Flat Configに刷新するにあたりファイル名は固定、使用ファイル数はこのファイル1つのみになりました。





## ESLint

JavaScriptの静的解析ツールです。
JavaScriptのコードを解析して、問題を見つけてくれます。
例えば、変数の宣言がないとか、変数の使い方が間違っているとか、そういう問題を見つけてくれます。



## linter、lint

コードを静的解析してコンパイルではじかれない潜在的なバグを警告するもの



## コードフォーマッタ

インデントや改行などのスタイルを一律に自動整形してくれます。
JavaScriptでは prettier がよく採用されています。

JavaScriptではコード解析とコードフォーマッターが分離してそれぞれ別のツールを組み合わせています。
現在、最も一般的な組み合わせが、ESLintとprettierです。



## Parser パーサ

ソースコードを特定の言語仕様に沿って解析してくれるライブラリです。
現在のデフォルトのESLintには初期設定時にTypeScriptの組み込みも考慮されています。



## Rules

すべてのルールはプラグインで追加します。
どのルールを有効にし、どのエラー レベルにするか決めます。



設定の解説

```eslint.config.js
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}

```

semi "と "quotes "はESLintのルール名です。
最初の値はルールのエラーレベルで、以下の値のいずれかを指定します：

"off "または0 - ルールをオフにする
"warn "または1 - ルールを警告としてオンにする（終了コードには影響しません）
"error "または2 - ルールをエラーとしてオンにする（終了コードは1になります）

3つのエラーレベルにより、ESLintがどのようにルールを適用するかを細かく制御することができます。



## Plugin

ESLintの組み込みルール以外に独自ルールを追加します。
ルール、環境、設定などを定義するサードパーティのプラグインです。
これらをまとめて適用した推奨の Shareable Config 共有設定をベースにして設計をカスタマイズしていきます。

pluginはimport文で読み込むようになりました。
eslint-plugin-*の接頭語を省略してpluginsに登録します。

```eslint.config.js
import react from "eslint-plugin-react";

export default [
  {
    plugins: {
      //eslint-plugin- 部分を省略可能
      react,
    },
  },
  {
    rules: {
      // ↑reactのルールを書く
    },
  },
  // ・・・
];

```



プラグインの環境を使用する場合は、必ず配列でプラグイン名を指定しplugins、接頭辞のないプラグイン名、スラッシュ、環境名を使用してください。



## Shareable Config 共有設定

※ESLintは約200のルールがあります。
TypeScriptのを追加すると300以上あります。

これら一つ一つ追加していくのは大変なので、各ベンダーが一般的に使われるだろうというルールをまとめたものが発表されています。
それが、Shareable Configです。

例
eslint:recommended
eslint-config-airbnb
airbnb ＜＜１番人気 、設定が沢山
stnadard ＜＜２番人気、シンプルな設定
google



## extends

extends は廃止されました。



## env 環境変数

env は廃止されました。
代わりに languageOptionsを使用します。



## グローバル変数

global - スクリプトが実行中にアクセスする追加のグローバル変数。

ファイルの中で定義する

/*globals 名前*/

というコメントを書くと、
指定した名前のグローバル変数・関数が
あることを ESLint に教えることができます。
名前はカンマ区切りで複数指定できます。

例

```
/*globals a, b, c */

設定ファイルで定義する
    "globals": {
        "$": false
    },

```

キー ("$"の部分)
変数名で、

値 (false) の部分は
**書き換え可能かどうか** を表すフラグ

false
書き換えられないグローバル変数となります。



## .eslintignore

廃止されました。

Flat Config の eslint.config.js の中に書くようになりました。

例

```eslint.config.js
  ...
  {
    // プロジェクト全体で無視するファイルを指定します。
    ignores: ["./.next/*", "./node_modules/*"],
  },
];

```

無視するファイルの設定ですので、最後尾に置くようにします。
最後尾が一番優先度が高くなります。





# ESLintの効果範囲

2種類あります。

* 設定ファイルに書く方法

設定ファイルにルールを書くと指定されたファイル全体に及びます。


* ファイルの最上部、もしくはコードの直前に書く方法

一般的は、ESLintで警告、またはエラーが出た場合に、そのルールを無効にしたいときに使用します。

ページ全体に効果を及ばせる方法と、コードの直前に書いて効果を効かせる方法があります。



# 新設定ファイル Flat Configとは？

以前のESLint設定ファイルは複雑化して難解になってしまいました。
なので、シンプルで使いやすいESLint設定ファイルを、
新たに設定することになりました。
それがFlat Configです。

Flat Configは ESLint v8.21.0 から試験的に導入されました。
デフォルトで使えるようになるのはv9からです。
v10では古い設定ファイルは使えなくなる予定です。

新しいFlat Configでは、設定は全てJavaScriptの配列として記述します。




## Flat Confgiの設定ファイル名

ファイル名と拡張子はeslint.config.jsに統一されます。




## Flat Config の有効化

ESLint v8 で Flat Config を利用するには、 eslint.config.js をプロジェクトのルートに置くか、
もしくは、環境変数を設定すると有効になります。

環境変数ファイル .env を作ります。

```.env.local
ESLINT_USE_FLAT_CONFIG=true

```

eslint.config.js をプロジェクトのルートにおいてあれば↑環境変数の設定は不要です。
falseに設定するとFlat Configは無効になります。



## 以前の設定ファイルとFlat Configで変わらないもの

* ルールを構成するための構文
* プロセッサーを構成するための構文
* 「CLI フラグの変更」に記載されているフラグの変更を除く CLI 。
* グローバル変数は同じ方法で設定されますが、プロパティが異なります。



## 以前の設定ファイルとFlat Configで変わるもの

* 設定を配列として入れていきます。
* プラグインやパーサーをJavaScriptオブジェクトとして表します。

CommonJSのrequire()文やESモジュールのimport文を使って、外部ファイルからプラグインやカスタムパーサーを読み込むことができます。


### 配列での設定

配列でルールを繋げていくので、分割しておいて後からスプレッド演算子「...」で統合することも可能です。

例えば、配列に入れた1番目のオブジェクトは filesでフィルタリングしていないので全てのファイルに適用されます。
2番目のルールはTypeScriptだけに適用されます。
後ろのルールが上書きされます。

```
export default [
  {
    // 全てのファイルに適用される
    rules: {
      // 何らかのルール
    },
  },
  {
    // TSファイルだけ適用される
    files: ["*.ts"],
    rules: {
      // 何らかのルール
    },
  },
...

```

# ESLint Flat Config

Next.js 14をインストールして、それに合わせてESLintのFlat Configを設定します。

# インストール

Next.js 14

npx create-next-app@latest

※オプションの選択は自由にして大丈夫です。

↓Next.jsのインストール時の.eslintrc.json

```.eslintrc.json
{
  "extends": "next/core-web-vitals"
}

```

# package.jsonにscriptの追加

VSCodeに拡張機能を入れれば自動でESLintは動作しますが、
手動で監視＆修正したい場合のscriptを設定します。

例
JavaScript TypeScript関連の監視＆修正 srcフォルダ配下が対象です。

```package.json
  "scripts": {
    "lint": "eslint --fix --ignore-path .gitignore 'src/**/*.{js,ts,jsx,tsx,html,md}'"

```




## ESLint の設定ファイル作成開始

0から設定ファイルを作ります。
↓このコマンドを使い、対話形式でESLintの初期設定を行います。

npm init @eslint/config

※ Flat Configを出力させるコマンドはまだ未実装のようです。



選んだ選択肢

```terminal
> To check syntax, find problems, and enforce code style

> JavaScript modules (import/export)

> React

Does your project use TypeScript?
> Yes

> Browser

> Use a popular style guide

> Standard: https://github.com/standard/eslint-config-standard-with-typescript

> JSON

Would you like to install them now?
> Yes

> npm

自動的にインストールされます。

```

以上で基本的な設定は終了です。



# お試しESLint

<details><summary>お試しESLint</summary>

その前に、簡単なJavaScriptのコードでESLintがどのような動作をするのか見てみます。

新規にファイルを作成して、

touch eslint.config.js

↓のコードを貼り付けます。(色々間違っているJavaScriptのコード)

```eslintTest.js
function eslintTest() {
  var message = "Hello vns.blue";
  var message = "Goodbye vns.blue";

  console.log("Visit vns.blue site.");

  const vnsList = ["apple", , "orange", "banana"];
}

```

↑ESLintがきちんと動作していると、↓沢山の警告がでます。

```terminal(PROBLEMS)
Missing return type on function.",
'eslintTest' is defined but never used.",
Missing space before function parentheses.",
Strings must use singlequote.",
Extra semicolon.",
'message' is already defined.",
'message' is assigned a value but never used.",
'vnsList' is assigned a value but never used.",
Unexpected comma in middle of array.",
Unexpected var, use let or const instead.",

```

これらの警告やエラーを修正するには、

* コードを修正する。
* ESLintの警告やエラーを無効にする。

の二通りあります。



# ESLintを無効にするルール

ページ全体でESLintの効果を無効にする方法。

/* eslint-disable */

↑ページの最上段にこのコメントを書きます。

一箇所

// eslint-disable-next-line @typescript-eslint/no-unused-vars

↑警告またはエラーが出ているコードの上に、対応したコメントを書きます。

例

```eslintTest.js
/* eslint-disable */
function eslintTest() {
  var message = "Hello vns.blue";
  var message = "Goodbye vns.blue";

  console.log("Visit vns.blue site.");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vnsList = ["apple", , "orange", "banana"];
}

```

途中から再度有効にしたい場合は↓をその場所に記入します。

/* eslint-enable */

```eslintTest.js
/* eslint-disable */
function eslintTest() {
  var message = "Hello vns.blue";
  var message = "Goodbye vns.blue";

  console.log("Visit vns.blue site.");

  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vnsList = ["apple", , "orange", "banana"];
}

```

</details>



次にNext.jsにあったESLintのFlat Config設定ファイルを書きます。



# Flat Configへの移行

↓古い設定ファイルは消します。
.eslintrc.js

↓Flat Config用の設定ファイル、Rootに置きます。

eslint.config.js



npm install @next/eslint-plugin-next eslint-plugin-react eslint-plugin-react-hooks

```eslint.config.js
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    ignores: ["./.next/*", "./node_modules/*", "./dist/*"],
  },
];

```

<details><summary>Standard</summary>

# Standard 選んだルールの詳細

選んだStandard とは eslint-config-standard-with-typescript のことです。

standard/eslint-config-standard-with-typescript: An ESLint shareable config for TypeScript that is based on eslint-config-standard and has TypeScript specific rules from @typescript-eslint/eslint-plugin.
https://github.com/standard/eslint-config-standard-with-typescript



eslint-config-standard-with-typescriptとは

eslint-config-standard
と
@typescript-eslint/eslint-plugin
の2つをまとめたものです。



eslint-config-standard
こちらはFlat configに対応しています。

@typescript-eslint/eslint-plugin



### eslint-config-standard

standard/eslint-config-standard: ESLint Config for JavaScript Standard Style

https://github.com/standard/eslint-config-standard

日本語
JavaScript Standard Style

https://standardjs.com/readme-ja



#### ルール

eslint-plugin-import - npm

https://www.npmjs.com/package/eslint-plugin-import

eslint-plugin-n - npm

https://www.npmjs.com/package/eslint-plugin-n

eslint-plugin-promise - npm

https://www.npmjs.com/package/eslint-plugin-promise



### @typescript-eslint/eslint-plugin - npm

https://www.npmjs.com/package/@typescript-eslint/eslint-plugin

eslint-config-standardをベースとし、@typescript-eslint/eslint-pluginのTypeScript固有のルールを持つ、TypeScript用のESLint共有設定です。



</details>











<details><summary>設定の細かい話</summary>

env
extends
parserOptions
plugins
rules



# 変わらない項目

ルールを設定する構文

プロセッサを設定する構文

CLI（CLIフラグの変更を除く）。CLIフラグの変更を参照してください。
グローバル変数は同じ方法で設定されますが、別のプロパティに設定されます（言語オプションの設定を参照）。



# 新しくなったルール

Plugin

Parser



## Pluginの設定方法

例 jsdoc

```eslint.config.js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];

```

## Parserの設定方法

Flat Config ファイルでは、カスタムパーサーをモジュールとしてインポートし、次に構成オブジェクトのlanguageOptions.parserプロパティに割り当てます。

```eslint.config.js
import babelParser from "@babel/eslint-parser";

export default [
    {
        // ...other config
        languageOptions: {
            parser: babelParser
        }
        // ...other config
    }
];

```



## Processorsの設定方法

プロセッサー

Flat Config ファイルでは、プロセッサーは名前でプラグインから参照できますが、構成に直接挿入することもできます。
プロセッサーは自動的に構成されることはありません。構成で明示的に設定する必要があります。

Flat Config では、次のすべての方法で同じことを表現できます。

```eslint.config.js
import somePlugin from "eslint-plugin-someplugin";

export default [
    {
        plugins: { somePlugin },
        processor: "somePlugin/someProcessor"
    },
    {
        plugins: { somePlugin },
        // We can embed the processor object in the config directly
        processor: somePlugin.processors.someProcessor
    },
    {
        // We don't need the plugin to be present in the config to use the processor directly
        processor: somePlugin.processors.someProcessor
    }
];

```

Flat Config では.mdプロセッサーが自動的に追加されないため、追加の構成要素を指定する必要があることに注意してください。

```
{
    files: ["**/*.md"],
    processor: somePlugin.processors[".md"]
}

```



## Glob-Based Configs

グロブベースの構成

デフォルトでは、 Flat Config ファイルは、エクスポートされた配列内の異なるグロブパターンベースの構成をサポートします。

構成オブジェクトのfilesプロパティにグロブパターンを含めることができます。

filesプロパティを指定しない場合、構成はグロブパターン "**/*.{js,mjs,cjs}"にデフォルトします。

基本的に、 Flat Config ファイルのすべての構成は、eslintrcのoverridesプロパティのようです。



Flat Config の場合、次の構成はデフォルトのグロブパターンです。

```eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended, // Recommended config applied to all files
    // Override the recommended config
    {
        rules: {
            indent: ["error", 2],
            "no-unused-vars": "warn"
        }
        // ...other configuration
    }
];

```

複数のグロブパターンに対して異なる構成をサポートするフラグ構成の例。

```eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended, // Recommended config applied to all files
    // File-pattern specific overrides
    {
        files: ["src/**/*", "test/**/*"],
        rules: {
            semi: ["warn", "always"]
        }
    },
    {
        files:["test/**/*"],
        rules: {
            "no-console": "off"
        }
    }
    // ...other configurations
];

```



## Configuring Language Options

言語オプションの設定

Flat Config ファイルでは、globalsとparserOptionsはlanguageOptionsキーの下に統合されます。

envプロパティは無くなりました。

特定のランタイムのグローバル変数のグループは、globals npmパッケージからインポートされ、globalsプロパティに含まれます。

スプレッド演算子（...）を使用して、一度に複数のグローバルをインポートできます。

Flat Config の同じ構成は次のとおりです。

```eslint.config.js
import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                myCustomGlobal: "readonly"
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module"
            }
        }
        // ...other config
    }
];

```



### Predefined and Shareable Configs

事前定義された構成と共有可能な構成



Flat Config ファイルでは、事前定義された構成は別のモジュールから Flat Config ファイルにインポートされます。

recommendedとallルール構成は、@eslint/jsパッケージにあります。
これらの構成を使用するには、このパッケージをインポートする必要があります。

```
npm install @eslint/js --save-dev

```

これらの構成をエクスポートされた配列に追加するか、それらから特定のルールを公開できます。

Flat Config では、ローカルConfig Filesとnpmパッケージ構成のモジュールをインポートする必要があります。




Flat Config で同じ構成を使用するには、次のようにします。

```eslint.config.js
import js from "@eslint/js";
import customConfig from "./custom-config.js";
import myConfig from "eslint-config-my-config";

export default [
    js.configs.recommended,
    customConfig,
    myConfig,
    {
        rules: {
            semi: ["warn", "always"]
        },
        // ...other config
    }
];

```



### Ignoring Files

ファイルを無視する

Flat Config でファイルを無視するには、構成オブジェクトのignoresプロパティを使用します。

ignoresプロパティは、グロブパターンの配列を受け入れます。

Flat Config は、.eslintignoreファイルから無視パターンをロードすることはサポートしていないため、これらのパターンを直接 Flat Config に移行する必要があります。



Flat Config の同じファイル無視パターンは次のとおりです。

```
export default [
    // ...other config
    {
        ignores: ["**/temp.js", "config/*"]
    }
];

```

また、 Flat Config では、ドットファイル（.dotfile.jsなど）はデフォルトでは無視されなくなりました。ドットファイルを無視する場合は、ファイル無視パターン "**/.*"を追加します。



## Linter Options

リンターオプション

Flat Config システムでは、リンターを構成するために使用できる新しいトップレベルプロパティlinterOptionsを導入します。

linterOptions オブジェクトでは、 noInlineConfig と reportUnusedDisableDirectives を含めることができます。



Flat Config の設定は次のとおりです。

```eslint.config.js
export default [
    {
        // ...other config
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: true
        }
    }
];

```



## Additional Changes

その他の変更

rootオブションはなくなりました。

filesオプションは配列である必要があります。

sourceTypeオプションは、新しい値「commonjs」をサポートするようになりました。

</details>

長いので折りたたみます。



# Flat Config 議論

<details><summary>GitHub issueでのFlat Configの議論</summary>

# Vercel

GitHub の Vercel Next.js でも議論されています。

How to use new "flat config" approach in Eslint? · vercel/next.js · Discussion #49337

https://github.com/vercel/next.js/discussions/49337

@next/eslint-plugin-next - npm

https://www.npmjs.com/package/@next/eslint-plugin-next

eslint-plugin-react - npm

https://www.npmjs.com/package/eslint-plugin-react

eslint-plugin-react-hooks - npm

https://www.npmjs.com/package/eslint-plugin-react-hooks



----------------------------------------

# ESLint

How can I use the new ESLint flat config in a Next.js project and also use 'canonical' rules? · eslint/eslint · Discussion #17228

https://github.com/eslint/eslint/discussions/17228


</details>



# 感想＆Tips

:::note info
以前のESLint設定ファイルは破棄して、Flat Config設定ファイルは一から作成したほうがいいと思います。

:::

Flat Configは、易しくなったと聞きます。確かに、設定の仕方は多少は改善されました。
しかし、共有設定で現在使用されているルールを調べたりするのは、依然として非常に大変です。

ESLint のドキュメントは、読みづらく、理解しにくいです。
ESLint V9 がリリースされるまでは、Flat Config に触らないほうがよいと思います。
ツリー構造をリスト構造に移行することに労力をかけるよりも、新しいツールとしてゼロから導入したほうが簡単だと思います。







# 参考

## 公式サイト

ESLint

https://eslint.org/

https://eslint.org/docs/latest/use/getting-started

typescript-eslint

https://typescript-eslint.io/

※typescript-eslint はTypeScriptのlintルールをESlintに追加するツールです。
(ESLintはJavaScript専用のツールです。)



## 公式ドキュメント、ブログ

Configuration Files (New) - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/use/configure/configuration-files-new

Configuration Migration Guide - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/use/configure/migration-guide

ESLint's new config system, Part 2: Introduction to flat config - ESLint - Pluggable JavaScript Linter

https://eslint.org/blog/2022/08/new-config-system-part-2/



## lintルールページ

Rules Reference - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/rules

Overview | typescript-eslint

https://typescript-eslint.io/rules
