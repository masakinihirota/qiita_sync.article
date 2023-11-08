<!--
title:   ESLint Flat Config 入門 ドキュメント編 (Next.js App router、React)
tags:    ESLint,Next.js,React,flatConfig
id:      04b4cb846b1a5cf8d23c
private: false
-->

# ドキュメント編

ドキュメント編はドキュメントの翻訳になります、これを踏み台にNext.js App router に合ったESLint Flat Configを調べていきます。

このページの翻訳です。
Configuration Files (New) - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/use/configure/configuration-files-new


[ESLint Flat Config 入門編 +ESLintの基礎知識](2023-11-08_React_flatConfig_4674389f844fd7e50058.md)
ESLint Flat Config 入門 ドキュメント編 (Next.js App router、React) #React - Qiita
[ESLint Flat Config 入門 マイグレーション編 (Next.js App router、React) #React - Qiita](2023-11-07_React_flatConfig_08908beecd2ca11aa729.md)



# ESLint Rules

全 ESLint & typescript-eslint ルール一覧

https://docs.google.com/spreadsheets/d/1zUU5h_nEXFCg_E2ktmE7Hv-SFir5Y0tFkKcQ1oMQCBc/edit?usp=sharing

Google Spreadsheetに書き起こしました。

ESLint のルールを一覧で見ることができます。
typescript-eslint のルールを一覧で見ることができます。
全ルールをABC順ソートしています。



# ESLint

Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linte

https://eslint.org/



# 新設定ファイル eslint.config.js

ESLintは v9から Flat Config がデフォルトで採用されます。

※現在のバージョンはv8 ですが Flat Config で設定できます。(2023年11月6日)

今までの設定は難解で、設定がネストされ複雑化していましたが、これからの設定はすべて同列に置かれシンプルになり、設定ファイルの名前も `eslint.config.js` に統一されます。

設定が重複した場合、上にある設定は下にある設定に上書きされてしまいます。
基本的にベースとなる設定ファイルを上に置き、下に独自の設定を追加していく形になります。


# Flat Confgi ドキュメントページ

以下ドキュメントページの翻訳部分です。



# Configuration Files (New) - ESLint - Pluggable JavaScript Linter

設定ファイル (新) - ESLint - プラグインJavaScriptリンター



## Excerpt

抜粋

JavaScriptのパターンを特定して報告するための、プラグ可能で設定可能なリンターツール。簡単にコードの品質を維持します。

注意 この設定システムは完全な機能ですが、デフォルトでは有効になっていません。オプトインするには、eslint.config.jsファイルをプロジェクトのルートに置くか、ESLINT_USE_FLAT_CONFIG環境変数をtrueに設定してください。

eslint.config.jsファイルがあってもオプトアウトするには、環境変数をfalseに設定します。

ESLintプロジェクトの設定を設定ファイルに入れることができます。組み込みのルール、どのようにしてそれらを強制するか、カスタムルールを持つプラグイン、共有可能な設定、どのファイルにルールを適用するかなどを含めることができます。



## Configuration File

設定ファイル

ESLintの設定ファイルは、 eslint.config.js という名前です。プロジェクトのルートディレクトリに配置し、設定オブジェクトの配列をエクスポートする必要があります。

以下は例です。

```eslint.config.js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];

```

この例では、設定配列には1つの設定オブジェクトしか含まれていません。設定オブジェクトは2つのルールを有効にしますsemiとprefer-const。これらのルールは、この設定ファイルを使用してESLintが処理するすべてのファイルに適用されます。

プロジェクトがpackage.jsonファイルで "type":"module" を指定していない場合、 eslint.config.js はCommonJS形式である必要があります。

```eslint.config.js
module.exports = [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];

```

設定ファイルは、設定配列に解決するpromiseをエクスポートすることもできます。これは、次の例のように、CommonJS設定ファイルでESM依存関係を使用するのに便利です。

```eslint.config.js
module.exports = (async () => {

    const someDependency = await import("some-esm-dependency");

    return [
        // ... use `someDependency` here
    ];

})();

```

注意 ESLintはeslint.config.jsという名前の設定ファイルだけを自動的に探し、eslint.config.cjsやeslint.config.mjsは探しません。デフォルトと異なるファイル名を指定したい場合は、-configコマンドラインオプションを使用してください。



## Configuration Objects

設定オブジェクト

各設定オブジェクトには、ESLintがファイルのセットで実行するために必要なすべての情報が含まれています。各設定オブジェクトは、次のプロパティで構成されています。

- `files` - 設定オブジェクトが適用するファイルを示すグロブパターンの配列。指定されていない場合、設定オブジェクトは他の設定オブジェクトによって一致するすべてのファイルに適用されます。

- `ignores` - 設定オブジェクトが適用されないファイルを示すグロブパターンの配列。指定されていない場合、設定オブジェクトは `files` によって一致するすべてのファイルに適用されます。

- `languageOptions` - JavaScript がどのようにリントされるかに関連する設定を含むオブジェクト。
    - `ecmaVersion` - サポートする ECMAScript のバージョン。任意の年 (例 `2022`) またはバージョン (例 `5`) を指定することができる。最新のバージョンをサポートする場合は `"latest"` を設定する。(デフォルト: `"latest"`)
    - sourceType` - JavaScript のソースコードの種類。指定できる値は、従来のスクリプトファイルには `"script"`、ECMAScriptモジュール (ESM) には `"module"`、CommonJSファイルには `"commonjs"` である。(デフォルト: `.js` と `.mjs` ファイルには `"module"`; `.cjs` ファイルには `"commonjs"`)
    - グローバルスコープに追加するオブジェクトを指定するオブジェクト。
    - parse()` メソッドまたは `parseForESLint()` メソッドを持つオブジェクト。(デフォルト: [`espree`](https://github.com/eslint/espree))
    - parse()` または `parseForESLint()` メソッドに直接渡す追加オプションを指定するオブジェクト。利用可能なオプションはパーサに依存します。

- `linterOptions` - リントプロセスに関連する設定を含むオブジェクト。
    - `noInlineConfig` - インライン設定が許可されているかどうかを示すブール値。
    - `reportUnusedDisableDirectives` - 未使用のdisableおよびenableディレクティブを追跡および報告するかどうかを示すブール値。

- `processor` - `preprocess()` と `postprocess()` メソッドを含むオブジェクト、またはプラグイン内のプロセッサの名前 (例 `"pluginName/processorName"`) を示す文字列。

- `plugins` - プラグイン名とプラグインオブジェクトの名前付きマッピングを含むオブジェクト。`files` が指定されている場合、これらのプラグインは一致するファイルでのみ利用可能です。

- `rules` - 設定されたルールを含むオブジェクト。`files` または `ignores` が指定されている場合、これらのルール設定は一致するファイルでのみ利用可能です。

   `settings` - An object containing name-value pairs of information that should be available to all rules.

- `settings` - すべてのルールで利用可能な情報の名前と値のペアを含むオブジェクト。



### Specifying `files` and `ignores`

Tip ファイルで指定されたパターンと無視するパターンはminimatch構文を使用し、eslint.config.jsファイルの場所からの相対評価となります。

 `files` と `ignores` の組み合わせを使用して、どのファイルに設定オブジェクトを適用するか、どのファイルに適用しないかを決定することができます。デフォルトでは、ESLintは `**/*.js`、 `**/*.cjs`、 `**/*.mjs` に一致します。`files` または `ignores` を指定しない設定オブジェクトは、他の設定オブジェクトで一致したすべてのファイルに適用されるため、これらの設定オブジェクトはデフォルトでESLintに渡されるすべてのJavaScriptファイルに適用されます。

For example:

```eslint.config.js
export default [
    {
        rules: {
            semi: "error"
        }
    }
];

```

この設定では、 `semi` ルールはESLintのデフォルトファイルに一致するすべてのファイルで有効になります。したがって、 `example.js` をESLintに渡すと、 `semi` ルールが適用されます。 `example.txt` のようなJavaScript以外のファイルを渡すと、 `semi` ルールは適用されません。 (ESLintは、設定がないためファイルが無視されたことを知らせるエラーメッセージを出力します。)



#### Excluding files with `ignores`

 `files` と `ignores` パターンの組み合わせを指定することで、設定オブジェクトが適用されるファイルを制限することができます。たとえば、特定のルールを `src` ディレクトリのファイルにのみ適用したい場合があります。

```eslint.config.js
export default [
    {
        files: ["src/**/*.js"],
        rules: {
            semi: "error"
        }
    }
];

```

ここでは、 `src` ディレクトリのJavaScriptファイルのみに `semi` ルールが適用されます。別のディレクトリのファイルでESLintを実行すると、この設定オブジェクトはスキップされます。 `ignores` を追加することで、 `src` の一部のファイルをこの設定オブジェクトから削除することもできます。

```eslint.config.js
export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];

```

この設定オブジェクトは、 `src` ディレクトリのすべてのJavaScriptファイルに一致しますが、 `.config.js` で終わるファイルは除外されます。 `ignores` で否定パターンを使用して、無視パターンからファイルを除外することもできます。

```eslint.config.js
export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js", "!**/eslint.config.js"],
        rules: {
            semi: "error"
        }
    }
];

```

ここでは、設定オブジェクトは `eslint.config.js` を除いて `.config.js` で終わるファイルを除外します。そのファイルにはまだ `semi` が適用されています。

グローバルではない `ignores` パターンは、ファイル名のみに一致することができます。 `"dir-to-exclude/"` のようなパターンは何も無視しません。特定のディレクトリのすべてを無視するには、 `"dir-to-exclude/**"` のようなパターンを使用する必要があります。

 `ignores` が `files` なしで使用され、他のキー ( `rules` など) がある場合、設定オブジェクトは `ignores` で指定されたファイルを除いてすべてのファイルに適用されます。たとえば:

```eslint.config.js
export default [
    {
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];

```

この設定オブジェクトは、 `.config.js` で終わるファイルを除いてすべてのファイルに適用されます。実際には、これは `files` を `**/*` に設定しているのと同じです。一般的には、 `ignores` を指定している場合は常に `files` を含めることが良いでしょう。



#### Globally ignoring files with `ignores`

 `ignores` が設定オブジェクト内の他のキーなしで使用される場合、パターンはグローバルな無視として機能します。以下は例です。

```eslint.config.js
export default [
    {
        ignores: [".config/*"]
    }
];

```

この設定では、 `.config` ディレクトリのすべてのファイルを無視するように指定しています。このパターンは、デフォルトのパターン ( `["**/node_modules/", ".git/"]`) の後に追加されます。

デフォルトのパターンで無視されているファイルやディレクトリを無視解除することもできます。たとえば、この設定では `node_modules/mylibrary` を無視解除します。

```eslint.config.js
export default [
    {
        ignores: [
            "!node_modules/",           // unignore `node_modules/` directory
            "node_modules/*",           // ignore its content
            "!node_modules/mylibrary/"  // unignore `node_modules/mylibrary` directory
        ]
    }
];

```

グローバルな `ignores` パターンのみがディレクトリに一致することに注意してください。設定に固有の `ignores` パターンは、ファイル名のみに一致します。



#### Cascading configuration objects

カスケード構成オブジェクト

特定のファイル名に複数の設定オブジェクトが一致する場合、設定オブジェクトはマージされ、競合がある場合は後のオブジェクトが前のオブジェクトを上書きします。たとえば:

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                MY_CUSTOM_GLOBAL: "readonly"
            }
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly"
            }
        }
    }
];

```

この設定を使用すると、すべてのJavaScriptファイルは `MY_CUSTOM_GLOBAL` という名前のカスタムグローバルオブジェクトを定義しますが、 `tests` ディレクトリのJavaScriptファイルは `MY_CUSTOM_GLOBAL` に加えて `it` と `describe` をグローバルオブジェクトとして定義します。テストディレクトリのJavaScriptファイルでは、両方の設定オブジェクトが適用されるため、 `languageOptions.globals` はマージされて最終的な結果が作成されます。



### Configuring linter options

リンターオプションの設定

リントプロセスに固有のオプションは、 `linterOptions` オブジェクトを使用して設定することができます。これらは、リントの進行方法に影響を与え、ファイルのソースコードの解釈方法には影響しません。



#### Disabling inline configuration

インライン構成を無効にする

インライン設定は、 `/*eslint semi: error*/` のような `/*eslint*/` コメントを使用して実装されています。 `noInlineConfig` を `true` に設定すると、インライン設定を無効にすることができます。有効にすると、すべてのインライン設定は無視されます。以下は例です。

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        linterOptions: {
            noInlineConfig: true
        }
    }
];

```



#### Reporting unused disable directives

未使用の無効化ディレクティブの報告

 `/*eslint-disable*/` 、 `/*eslint-enable*/` および `/*eslint-disable-next-line*/` のような無効化および有効化ディレクティブは、コードの一部を無効にするために使用されます。コードが変更されると、コードが変更されてルールがトリガーされなくなったため、これらのディレクティブが不要になる可能性があります。この例のように、 `reportUnusedDisableDirectives` オプションを `true` に設定することで、これらの未使用の無効化ディレクティブの報告を有効にすることができます。

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        linterOptions: {
            reportUnusedDisableDirectives: true
        }
    }
];

```

デフォルトでは、未使用の無効化および有効化ディレクティブは警告として報告されます。 `--report-unused-disable-directives` コマンドラインオプションを使用してこの設定を変更できます。



### Configuring language options

言語オプションの設定

ESLintがJavaScriptコードを評価する方法に固有のオプションは、 `languageOptions` オブジェクトを使用して設定することができます。



#### Configuring the JavaScript version

JavaScriptバージョンの設定

JavaScript (ECMAScript) のバージョンを設定するには、 `ecmaVersion` プロパティを使用します。このプロパティは、コードで有効なグローバル変数と構文を決定し、バージョン番号 ( `6` のような)、年番号 ( `2022` のような)、または `"latest"` (ESLintがサポートする最新バージョン) に設定することができます。デフォルトでは、 `ecmaVersion` は `"latest"` に設定されており、JavaScriptコードを古いバージョンとして評価する必要がある場合を除いて、このデフォルトを維持することをお勧めします。たとえば、古いランタイムではECMAScript 5のみを許可する場合、ESLintを次のように設定できます。

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 5
        }
    }
];

```



#### Configuring the JavaScript source type

JavaScriptソースタイプの設定

ESLintは、コードを次の3つの方法で評価できます。

1. ECMAScriptモジュール (ESM) - コードにはモジュールスコープがあり、厳格モードで実行されます。
2. CommonJS - コードにはトップレベルの関数スコープがあり、非厳格モードで実行されます。
3. Script - コードには共有グローバルスコープがあり、非厳格モードで実行されます。


コードがどのモードで実行されるかを指定するには、 `sourceType` プロパティを指定します。このプロパティは `"module"`、 `"commonjs"`、または `"script"` に設定することができます。デフォルトでは、 `sourceType` は `.js` と `.mjs` ファイルに `"module"` に設定され、 `.cjs` ファイルには `"commonjs"` に設定されます。以下は例です。

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "script"
        }
    }
];

```



#### Configuring a custom parser and its options

カスタムパーサーとそのオプションの設定

多くの場合、ESLintがJavaScriptコードを解析するために出荷するデフォルトのパーサを使用できます。 `parser` プロパティを使用してデフォルトのパーサをオーバーライドすることもできます。 `parser` プロパティは、 `parse()` メソッドまたは `parseForESLint()` メソッドを含むオブジェクトでなければなりません。たとえば、 [`@babel/eslint-parser`](https://www.npmjs.com/package/@babel/eslint-parser) パッケージを使用して、ESLintが実験的な構文を解析できるようにすることができます。

```eslint.config.js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser
        }
    }
];

```

この設定では、デフォルトのEspreeパーサの代わりにBabelパーサが `.js` と `.mjs` で終わるすべてのファイルを解析するようになります。

 `parserOptions` プロパティを使用して、カスタムパーサに直接オプションを渡すこともできます。このプロパティは、使用しているパーサに固有の名前と値のペアのオブジェクトです。Babelパーサの場合、次のようにオプションを渡すことができます。

```eslint.config.js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    // your babel options
                    presets: ["@babel/preset-env"],
                }
            }
        }
    }
];

```



#### Configuring global variables

グローバル変数の設定

設定オブジェクト内のグローバル変数を設定するには、 `globals` 設定プロパティを、使用する各グローバル変数の名前で名前付きのオブジェクトに設定します。各グローバル変数キーに対して、対応する値を `"writable"` に設定して変数を上書きできるようにするか、 `"readonly"` に設定して上書きできないようにします。たとえば:

```eslint.config.js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                var1: "writable",
                var2: "readonly"
            }
        }
    }
];

```

これらの例では、 `var1` をコードで上書きできるようにしますが、 `var2` では上書きできないようにします。

グローバルは文字列 `"off"` で無効にすることができます。たとえば、ES2015のほとんどのグローバルが利用可能であるが、 `Promise` が利用できない環境では、この設定を使用することができます。

```eslint.config.js
export default [
    {
        languageOptions: {
            globals: {
                Promise: "off"
            }
        }
    }
];

```

歴史的な理由から、ブール値 `false` と文字列値 `"readable"` は `"readonly"` と同じです。同様に、ブール値 `true` と文字列値 `"writeable"` は `"writable"` と同じです。ただし、古い値の使用は非推奨です。



##### Predefined global variables

定義済みグローバル変数

設定された `languageOptions.ecmaVersion` に基づいて自動的に有効になるECMAScript標準の組み込みグローバルを除いて、ESLintはグローバル変数の事前定義済みのセットを提供しません。特定の環境のすべてのグローバルを追加で有効にするには、 [`globals`](https://www.npmjs.com/package/globals) パッケージを使用できます。たとえば、次のようにして、 `console` を含む他のブラウザグローバルを設定に追加できます。

```eslint.config.js
import globals from "globals";
export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    }
];

```



### Using plugins in your configuration

設定でプラグインを使用する

プラグインは、ESLintプロジェクト間でルール、プロセッサ、構成、パーサなどを共有するために使用されます。



#### Using plugin rules

プラグインルールの使用

プラグインに含まれる特定のルールを使用することができます。これを行うには、 `plugins` キーを使用して設定オブジェクトでプラグインを指定します。 `plugin` キーの値は、プラグインの名前がプロパティ名であり、値がプラグインオブジェクト自体であるオブジェクトです。以下は例です。

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

この設定では、JSDocプラグインの名前が `jsdoc` であるように定義されています。各ルール名の接頭辞 `jsdoc/` は、その名前のプラグインからではなくESLint自体から来ていることを示しています。

プラグインの名前とプラグインオブジェクトの両方が `jsdoc` であるため、この設定を次のように短縮することもできます。

```eslint.config.js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];

```

これは最も一般的な規約ですが、プラグインが指定する名前を使用する必要はありません。次のような任意の接頭辞を指定できます。

```eslint.config.js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsd: jsdoc
        },
        rules: {
            "jsd/require-description": "error",
            "jsd/check-values": "error"
        }
    }
];

```

この設定オブジェクトでは、 `jsdoc` の代わりに接頭辞プラグインとして `jsd` を使用しています。



#### Using configurations included in plugins

プラグインに含まれる構成の使用

プラグインに含まれる構成を、 `eslint.config.js` 構成配列に直接追加することで使用できます。これは、プラグインの推奨構成に対してよく行われます。以下は例です。

```eslint.config.js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    // configuration included in plugin
    jsdoc.configs["flat/recommended"],
    // other configuration objects...
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "warn",
        }
    }
];

```



### Using processors

プロセッサの使用

プロセッサを使用すると、ESLintはテキストをコードの断片に変換してESLintがリントできるようにすることができます。 `processor` プロパティを定義して、プラグイン内のプロセッサを参照するためのフォーマット `"pluginName/processorName"` または `preprocess()` と `postprocess()` メソッドの両方を含むオブジェクトを含むプロセッサを使用するファイルタイプを指定できます。たとえば、MarkdownファイルからJavaScriptコードブロックを抽出するには、このように設定に追加します。

```eslint.config.js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    }
];

```

この設定オブジェクトでは、 `markdown` という名前のプラグインに含まれる `markdown` という名前のプロセッサがあることを指定しています。この設定は、 `.md` で終わるすべてのファイルにプロセッサを適用します。

プロセッサは、 `0.js` や `1.js` のように設定オブジェクト内のファイル名として機能する名前付きコードブロックを作成することができます。ESLintは、そのような名前付きコードブロックを元のファイルの子として処理します。たとえば、次のように、Markdownファイルの `.js` で終わる名前付きコードブロックに対して `strict` ルールを無効にします。

```eslint.config.js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    },

    // applies only to code blocks
    {
        files: ["**/*.md/*.js"],
        rules: {
            strict: "off"
        }
    }
];

```



### Configuring rules

 `rules` プロパティを追加して、ルールの設定を含むオブジェクトを含めることで、設定オブジェクト内の任意の数のルールを設定できます。このオブジェクトの名前はルールの名前であり、値はそれらのルールのそれぞれの設定です。以下は例です。

```eslint.config.js
export default [
    {
        rules: {
            semi: "error"
        }
    }
];

```

この設定オブジェクトでは、 [`semi`](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/docs/latest/rules/semi) ルールを `"error"` の重大度で有効にすることを指定しています。また、最初のアイテムが重大度で、その後の各アイテムがルールのオプションである配列を指定することで、ルールにオプションを指定することもできます。たとえば、オプションとして `"never"` を渡すことで、 `semi` ルールをセミコロンを許可しないように切り替えることができます。

```eslint.config.js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    }
];

```

各ルールは独自のオプションを指定し、有効なJSONデータ型であれば何でもかまいません。使用するルールのドキュメントで、使用可能なオプションの詳細について確認してください。



#### Rule severities

ルールの重大度

ルールに指定できる重大度は3つあります。

- error"` (または `2`) - 報告された問題はエラーとして扱われます。ESLint CLIを使用する場合、エラーが発生するとCLIは0以外のコードで終了します。


- warn"` (または `1`) - 報告された問題は警告として扱われます。ESLint CLIを使用する場合、警告は報告されますが、終了コードは変更されません。警告のみが報告された場合、終了コードは0になります。
- off"` (または `0`) - ルールを完全にオフにする。



#### Rule configuration cascade

ルール設定のカスケード

同じルールを複数の設定オブジェクトが指定する場合、ルールの設定は後のオブジェクトが以前のオブジェクトより優先されるようにマージされます。たとえば:

```eslint.config.js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    },
    {
        rules: {
            semi: ["warn", "always"]
        }
    }
];

```

この設定を使用すると、 `semi` の最終ルール設定は `["warn", "always"]` になります。配列は、設定が重大度とオプションであることを示します。次の例のように、文字列または数値のみを定義することで、重大度のみを変更することができます。

```eslint.config.js
export default [
    {
        rules: {
            semi: ["error", "never"]
        }
    },
    {
        rules: {
            semi: "warn"
        }
    }
];

```

ここでは、2番目の設定オブジェクトは重大度のみをオーバーライドするため、 `semi` の最終設定は `["warn", "never"]` になります。



### Configuring shared settings

共有設定の設定

ESLintは、設定ファイルに共有設定を追加することをサポートしています。設定オブジェクトに `settings` オブジェクトを追加すると、すべてのルールに渡されます。慣例として、プラグインは、他のプラグインとの衝突を避けるために、興味のある設定を名前空間にします。プラグインは `settings` を使用して、すべてのルールで共有する必要のある情報を指定できます。これは、カスタムルールを追加して、同じ情報にアクセスできるようにしたい場合に便利です。以下は例です。

```eslint.config.js
export default [
    {
        settings: {
            sharedData: "Hello"
        }
    }
];

```



### Using predefined configurations

事前定義済み構成の使用

ESLintには、JavaScriptの2つの事前定義済み構成があります。

- `js.configs.recommended` - ESLintが潜在的なエラーを避けるために推奨するルールを有効にする。

- `js.configs.all` - ESLintに同梱されている全てのルールを有効にする。

これらの事前定義済みの構成を含めるには、 `@eslint/js` パッケージをインストールし、次の設定オブジェクトの他のプロパティを変更します。

```eslint.config.js
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            semi: ["warn", "always"]
        }
    }
];

```

ここでは、 `js.configs.recommended` 事前定義済み構成が最初に適用され、別の設定オブジェクトが `semi` の必要な構成を追加します。

次のように、 `files` キーを持つ構成オブジェクトを指定することで、これらの事前定義済み構成をファイルのサブセットにのみ適用することができます。

```eslint.config.js
import js from "@eslint/js";

export default [
    {
        files: ["**/src/safe/*.js"],
        ...js.configs.recommended
    }
];

```



## Configuration File Resolution

構成ファイルの解決

ESLintがコマンドラインで実行されると、まずカレントディレクトリを `eslint.config.js` でチェックします。ファイルが見つからない場合は、次の親ディレクトリをファイルにします。この検索は、ファイルが見つかるか、ルートディレクトリに到達するまで続きます。

 `ESLINT_USE_FLAT_CONFIG` 環境変数を `true` に設定し、 `-c` または `--config` オプションを使用して、代替の構成ファイルを指定することで、 `eslint.config.js` の検索を防ぐことができます。

```
ESLINT_USE_FLAT_CONFIG=true npx eslint --config some-other-file.js **/*.js
```

この場合、ESLintは `eslint.config.js` を検索せず、代わりに `some-other-file.js` を使用します。