<!--
title:   ESLint Flat Config 入門 マイグレーション編 (Next.js App router、React)
tags:    ESLint,Next.js,React,flatConfig
id:      ba54efa93989de68d2a0
private: false
-->
# マイグレーション編

マイグレーション編はマイグレーションの翻訳になります、これを踏み台にNext.js App router に合ったESLint  Flat Configを調べていきます。

このページの翻訳です。
Configuration Migration Guide - ESLint - Pluggable JavaScript Linter

https://eslint.org/docs/latest/use/configure/migration-guide

[ESLint Flat Config 入門編 +ESLintの基礎知識](2023-11-08_ESLint_Next.js_React_flatConfig_b61d595e4ea746adef57.md)
[ESLint Flat Config 入門 ドキュメント編 (Next.js App router、React) #React - Qiita](2023-11-08_ESLint_Next.js_React_flatConfig_04b4cb846b1a5cf8d23c.md)
ESLint Flat Config 入門 マイグレーション編 (Next.js App router、React) #React - Qiita



# Configuration Migration Guide - ESLint - Pluggable JavaScript Linter

設定移行ガイド - ESLint - プラグインJavaScriptリンター

> ## Excerpt
> JavaScriptのパターンを識別して報告するためのプラグ可能で設定可能なリンターツール。簡単にコード品質を維持します。

このガイドでは、ESLint設定ファイルをeslintrc形式（通常は.eslintrc.jsまたは.eslintrc.jsonファイルで設定）から新しい Flat Config 形式（通常はeslint.config.jsファイルで設定）に移行する方法の概要を説明します。

Flat Config 形式については、[このブログ記事](https://eslint.org/blog/2022/08/new-config-system-part-2/)を参照してください。

これらの構成形式のリファレンス情報については、次のドキュメントを参照してください。



## Start Using Flat Config Files

Flat Config ファイルを使用する方法。

ESLint v9.0.0から、 Flat Config ファイル形式がデフォルトのConfig Files形式になります。ESLint v9.0.0がリリースされたら、追加の構成なしで Flat Config ファイル形式を使用できます。

ESLint v8で Flat Config を使用するには、プロジェクトのルートにeslint.config.jsファイルを配置するか、ESLINT_USE_FLAT_CONFIG環境変数をtrueに設定します。



## Things That Haven’t Changed between Configuration File Formats

Config Files形式間で変更されていないこと

Config Files形式はeslintrcから Flat Config に変更されましたが、次のことは変わりませんでした。

ルールを設定する構文
プロセッサを設定する構文
CLI（CLIフラグの変更を除く）。CLIフラグの変更を参照してください。
グローバル変数は同じ方法で設定されますが、別のプロパティに設定されます（言語オプションの設定を参照）。



## Key Differences between Configuration Formats

構成形式の主な違い

eslintrcと Flat Config 形式の最も顕著な違いは次のとおりです。



### Importing Plugins and Custom Parsers

プラグインとカスタムパーサーのインポート

eslintrcファイルは、プラグインをロードするためのpluginsプロパティ内と、外部構成をロードするためのextendsプロパティ内で、文字列ベースのインポートシステムを使用します。

Flat Config ファイルは、プラグインとパーサーをJavaScriptオブジェクトとして表します。これは、CommonJS require（）またはESモジュールimportステートメントを使用して、外部ファイルからプラグインとカスタムパーサーをロードできることを意味します。

たとえば、このeslintrcConfig Filesは、eslint-plugin-jsdocをロードし、そのプラグインからルールを設定します。

```.eslintrc.js
module.exports = {
    // ...other config
    plugins: ["jsdoc"],
    rules: {
        "jsdoc/require-description": "error",
        "jsdoc/check-values": "error"
    }
    // ...other config
};

```
Flat Config では、次のように同じことを行います。

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



### Custom Parsers

カスタムパーサー

#### eslintrcファイル

カスタムパーサーをインポートする方法はプラグインをインポートする方法と似ています。パーサーの名前を指定するには、文字列を使用します。



#### Flat Config ファイル

カスタムパーサーをモジュールとしてインポートし、次に構成オブジェクトのlanguageOptions.parserプロパティに割り当てます。

たとえば、このeslintrcConfig Filesは、@babel/eslint-parserパーサーを使用します。

```.eslintrc.js
module.exports = {
    // ...other config
    parser: "@babel/eslint-parser",
    // ...other config
};

```

Flat Config では、次のように同じことを行います。

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

### Processors

プロセッサー

#### eslintrcファイル

プロセッサーはプラグインで定義する必要があり、その後、構成で名前で参照する必要がありました。
ドットで始まるプロセッサーは、ESLintがそのファイル拡張子に自動的に構成するファイル拡張子名のプロセッサーを示していました。



#### Flat Config ファイル

プロセッサーは名前でプラグインから参照できますが、構成に直接挿入することもできます。
プロセッサーは自動的に構成されることはありません。構成で明示的に設定する必要があります。

プロセッサーを持つカスタムプラグインの例として

```node_modules/eslint-plugin-someplugin/index.js
module.exports = {
    processors: {
        ".md": {
            preprocess() {},
            postprocess() {}
        },
        "someProcessor": {
            preprocess() {},
            postprocess() {}
        }
    }
};

```

eslintrcでは、次のように構成します。

```.eslintrc.js
module.exports = {
    plugins: ["someplugin"],
    processor: "someplugin/someProcessor"
};

```

ESLintは、次のようなものも自動的に追加します。

```
{
     overrides: [{
        files: ["**/*.md"],
        processor: "someplugin/.md"
     }]
}

```

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



### Glob-Based Configs

グロブベースの構成

デフォルトでは、eslintrcファイルは、配置されているディレクトリとその子ディレクトリのすべてのファイル（.eslintignoreでカバーされていないファイルを除く）をリントします。異なるファイルグロブパターンに対して異なる構成を持つ場合は、overridesプロパティでそれらを指定できます。

デフォルトでは、 Flat Config ファイルは、エクスポートされた配列内の異なるグロブパターンベースの構成をサポートします。構成オブジェクトのfilesプロパティにグロブパターンを含めることができます。filesプロパティを指定しない場合、構成はグロブパターン "**/*.{js,mjs,cjs}"にデフォルトします。基本的に、 Flat Config ファイルのすべての構成は、eslintrcのoverridesプロパティのようです。



#### eslintrc Examples

eslintrcの例

たとえば、このeslintrcファイルは、配置されているディレクトリとその子ディレクトリのすべてのファイルに適用されます。

```.eslintrc.js
module.exports = {
    // ...other config
    rules: {
        semi: ["warn", "always"]
    }
};

```

このeslintrcファイルは、オーバーライドを使用した複数の構成をサポートしています。

```.eslintrc.js
module.exports = {
    // ...other config
    overrides: [
        {
            files: ["src/**/*"],
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
    ]
};

```

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

### Configuring Language Options

言語オプションの設定

eslintrcファイルでは、env、globals、およびparserOptionsプロパティ全体でさまざまな言語オプションを構成します。特定のランタイム（ブラウザJavaScriptのdocumentとwindow、Node.jsのprocessとrequireなど）のグローバル変数のグループは、envプロパティで構成されます。

Flat Config ファイルでは、globalsとparserOptionsはlanguageOptionsキーの下に統合されます。envプロパティは存在しません。特定のランタイムのグローバル変数のグループは、globals npmパッケージからインポートされ、globalsプロパティに含まれます。スプレッド演算子（...）を使用して、一度に複数のグローバルをインポートできます。

たとえば、次のeslintrcファイルには、言語オプションがあります。

```.eslintrc.js
module.exports = {
    env: {
        browser: true,
    },
    globals: {
        myCustomGlobal: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
    }
    // ...other config
}

```

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

eslintrc構成システムでは、ファイルのグローバルを定義するためにeslint-env構成コメントを使用できました。

これらのコメントは、 Flat Config でリントすると認識されなくなりました。

ESLintの将来のバージョンでは、eslint-envコメントがエラーとして報告されます。

そのため、eslintrcから Flat Config に移行する場合は、すべてのファイルからeslint-env構成コメントを削除する必要があります。

それらは、同等のがより冗長なglobal構成コメントと置き換えるか、Config Filesのglobals定義を優先するために削除できます。

たとえば、eslintrcを使用すると、リントするファイルは次のようになります。

```tests/my-file.js
/* eslint-env mocha */

describe("unit tests", () => {
    it("should pass", () => {
        // ...
    });
});

```

上記の例では、「describe」と「it」は、「/* eslint-env mocha */」コメントのためにグローバル識別子として認識されます。

同じ効果は、global構成コメントを使用して Flat Config で達成できます。

```tests/my-file.js
/* global describe, it -- Globals defined by Mocha */

describe("unit tests", () => {
    it("should pass", () => {
        // ...
    });
});

```

もう1つのオプションは、リントされているファイルからコメントを削除し、構成でグローバルを定義することです。

```eslint.config.js
import globals from "globals";

export default [
    // ...other config
    {
        files: [
            "tests/**"
        ],
        languageOptions: {
            globals: {
                ...globals.mocha
            }
        }
    }
];

```



### Predefined and Shareable Configs

事前定義された構成と共有可能な構成

eslintrcファイルでは、extendsプロパティを使用して、事前定義された構成と共有可能な構成を使用します。ESLintには、文字列としてアクセスできる2つの事前定義された構成が用意されています。

eslint:recommended：ESLintによって推奨されるルール
eslint:all：ESLintで配信されるすべてのルール

extendsプロパティを使用して、共有可能な構成を拡張することもできます。
共有可能な構成は、ローカルConfig Filesへのパスまたはnpmパッケージ名のいずれかである必要があります。



Flat Config ファイルでは、事前定義された構成は別のモジュールから Flat Config ファイルにインポートされます。recommendedとallルール構成は、@eslint/jsパッケージにあります。これらの構成を使用するには、このパッケージをインポートする必要があります。

```
npm install @eslint/js --save-dev

```

これらの構成をエクスポートされた配列に追加するか、それらから特定のルールを公開できます。 Flat Config では、ローカルConfig Filesとnpmパッケージ構成のモジュールをインポートする必要があります。

たとえば、組み込みのeslint:recommended構成を使用したeslintrcファイルは次のとおりです。

```.eslintrc.js
module.exports = {
    // ...other config
    extends: "eslint:recommended",
    rules: {
        semi: ["warn", "always"]
    },
    // ...other config
}

```

このeslintrcファイルは、組み込みの構成、ローカルのカスタム構成、およびnpmパッケージからの共有可能な構成を使用します。

```.eslintrc.js
module.exports = {
    // ...other config
    extends: ["eslint:recommended", "./custom-config.js", "eslint-config-my-config"],
    rules: {
        semi: ["warn", "always"]
    },
    // ...other config
}

```

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



JavaScriptモジュールをインポートするだけなので、ESLintがそれらを使用する前に構成オブジェクトを変更できることに注意してください。

たとえば、特定の構成オブジェクトをテストファイルにのみ適用したい場合があります。



```eslint.config.js

import js from "@eslint/js";
import customTestConfig from "./custom-test-config.js";

export default [
    js.configs.recommended,
    {
        ...customTestConfig,
        files: ["**/*.test.js"],
    },
];

```



### Using eslintrc Configs in Flat Config

Flat Config でeslintrc構成を使用する

Flat Config 形式にまだ更新されていない共有可能な構成があることがわかる場合は、FlatCompatユーティリティを使用して、eslintrc形式を Flat Config 形式に変換できます。

最初に、@eslint/eslintrcパッケージをインストールします。

```
npm install @eslint/eslintrc --save-dev

```

次に、FlatCompatをインポートし、既存のeslintrc構成を変換するための新しいインスタンスを作成します。たとえば、npmパッケージeslint-config-my-configがeslintrc形式の場合、次のように書きます。


```
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default [

    // mimic ESLintRC-style extends
    ...compat.extends("eslint-config-my-config"),
];

```

この例では、FlatCompat#extends()メソッドを使用して、eslint-config-my-configを Flat Config 配列に挿入します。

FlatCompatクラスの詳細については、パッケージのREADMEを参照してください。



### Ignoring Files

ファイルを無視する

eslintrcでは、プロジェクトのルートに別の.eslintignoreファイルを作成することで、ESLintがファイルを無視するようにすることができます。

.eslintignoreファイルは.gitignoreファイルと同じグロブパターン構文を使用します。または、eslintrcファイルでignorePatternsプロパティを使用できます。

Flat Config でファイルを無視するには、構成オブジェクトのignoresプロパティを使用できます。ignoresプロパティは、グロブパターンの配列を受け入れます。 Flat Config は、.eslintignoreファイルから無視パターンをロードすることはサポートしていないため、これらのパターンを直接 Flat Config に移行する必要があります。


たとえば、eslintrc構成で使用できる.eslintignoreの例は次のとおりです。

```
# .eslintignore
temp.js
config/*
# ...other ignored files

```

`ignorePatterns` の例

```.eslintrc.js
module.exports = {
    // ...other config
    ignorePatterns: ["temp.js", "config/*"],
};

```

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



### Linter Options

リンターオプション

ESlintrcファイルでは、 noInlineConfig および reportUnusedDisableDirectives プロパティを使用して、リンター自体を構成できます。

Flat Config システムでは、リンターを構成するために使用できる新しいトップレベルプロパティlinterOptionsを導入します。linterOptionsオブジェクトでは、noInlineConfigとreportUnusedDisableDirectivesを含めることができます。

たとえば、次のeslintrcファイルは、リンターオプションが有効になっています。

```.eslintrc.js
module.exports = {
    // ...other config
    noInlineConfig: true,
    reportUnusedDisableDirectives: true
}

```

Flat Config の同じオプションは次のとおりです。

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



### CLI Flag Changes

CLIフラグの変更

次のCLIフラグは、 Flat Config ファイル形式ではサポートされなくなりました。

-   `--rulesdir`
-   `--ext`
-   `--resolve-plugins-relative-to`

フラグ--no-eslintrcは、フラグ--no-config-lookupに置き換えられました。



### Additional Changes

その他の変更

eslintrcから Flat Config ファイル形式への次の変更が行われました。

ルートオプションはもう存在しません。（ Flat Config ファイルは、root：trueが設定されているかのように動作します。）

filesオプションはもう単一の文字列にはなれません。配列である必要があります。

sourceTypeオプションは、新しい値「commonjs」をサポートするようになりました（.eslintrcもサポートしていますが、ドキュメント化されていませんでした）。



## TypeScript Types for Flat Config Files

Flat Config ファイルのTypeScriptタイプ

Flat Config ファイル形式のTypeScriptタイプは、DefinitelyTypedプロジェクトで確認できます。

構成の配列内のオブジェクトのインターフェースは、FlatConfigと呼ばれます。


GitHubのDefinitelyTypedリポジトリで型定義を表示できます。