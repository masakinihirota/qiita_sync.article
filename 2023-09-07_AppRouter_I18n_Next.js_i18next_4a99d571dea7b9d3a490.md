<!--
title:   i18next
tags:    AppRouter,I18n,Next.js,i18next
id:      4a99d571dea7b9d3a490
private: true
-->

日本語化
1ファイル化
解説の追加
(一部未翻訳)

markdownファイルですので、
エディタについているアウトライン機能を使うと、
見出しをクリックすることで、
その見出しにジャンプできます。


GitHub Copilot:
ja:


title 国際化フレームワーク i18next入門

i18next 公式ドキュメントの解説
日本語化 md化


GitHub Copilot:
ja:


title 国際化フレームワーク i18next入門

i18next 公式ドキュメントの解説
日本語化 md化



# 用語集

翻訳ファイル
ローカライズされたテキストの集合を表すオブジェクトです。
i18nextの翻訳ファイルは、JSON形式で表現されたオブジェクトです。
オブジェクト内には、キーと値のペアが含まれており、キーは翻訳されるテキストを識別するための識別子で、値は翻訳されたテキストです。

例えば、英語の「hello」を日本語に翻訳する場合、キーには「hello」という文字列を、値には「こんにちは」という文字列を定義します。
また、i18nextでは、複数の言語に対応するために、言語ごとに翻訳ファイルを分けることができます。

JSON形式
JavaScript Object Notationの略で、JavaScriptのオブジェクトを表現するための軽量なデータ交換フォーマットです。

オブジェクト
キーと値のペアの集合で構成されるデータ型です。i18nextの翻訳ファイルは、JSON形式で表現されたオブジェクトです。

keys キー
オブジェクト内で値を参照するための識別子で、文字列で表現されます。

値
オブジェクト内でキーに対応するデータを表現するもので、任意のデータ型を持つことができます。

翻訳の管理
i18nextでは、翻訳ファイルをJSON形式で定義することで、簡単に翻訳を管理することができます。

t()
i18nextで提供される翻訳関数で、キーを渡すと翻訳されたテキストを返します。

interpolation
変数への埋め込み
翻訳されたテキスト内に、変数の値を埋め込むことです。i18nextでは、{{変数名}}の形式で変数を表現します。

interpolated values
翻訳されたテキスト内に埋め込まれた変数の値です。
i18nextでは、変数に対応する値を渡すことで、テキスト内に埋め込まれた値を置き換えることができます。

バリアント
i18nextでは、言語の特定のバージョンを「バリアント」と呼びます。
例えば、英語にはイギリス英語とアメリカ英語のように、地域やスクリプトなどが異なるバリアントがあります。

フォールバック
翻訳が見つからなかった場合に、別の翻訳を探すことです。
i18nextが異なる名前空間、言語、およびキーの組み合わせてコンテンツの最も関連性の高い翻訳を提供しようとするプロセスを指します。

例えば、英語の「hello」を日本語に翻訳すると「こんにちは」になりますが、もし「こんにちは」という翻訳が見つからなかった場合、i18nextは「hello」をそのまま表示するのではなく、別の翻訳を探します。このように、翻訳が見つからなくても、何かしらの翻訳を表示することができます。

発火
イベントが発生することを指します。
イベントが発生すると、登録されたイベントリスナーが自動的に呼び出されます。



----------------------------------------

# i18next documentation

## Introduction

導入

i18nextはJavaScriptで書かれた国際化フレームワークです。

以下のプラグインを提供しています。
ユーザー言語を検出する
翻訳をロードする
オプションで翻訳をキャッシュする
後処理をしたあとに拡張を有効に出来ます。

詳しくはプラグインの項目をご覧ください

### 柔軟性

日付の書式設定
色々な補完
gettextスタイルにも対応

詳しくはオプションの項目をご覧ください



### スケーラビリティ

このフレームワークはスケーラビリティを念頭に構築されました。i18nextでは、翻訳を複数のファイルに分割し、必要に応じて読み込むことができます。

小さなプロジェクトなら１ファイルに収められます。
大規模なプロジェクトには複数ファイルに分割が出来ます。
オンデマンドでロードするオプションが提供されています。



### Ecosystem

webpack を使用したコードからの翻訳の抽出
翻訳のバンドルからgettext,csv,RESXのJSONへの変換
その他モジュールが大量にあります。



----------------------------------------

# OVERVIEW

概要

## Getting started

### インストール

```
npm install i18next --save

```

i18nextはUMDという形式に対応しているため、commonjsやrequirejs、globalなどの環境でも使用することができます。さらに、/distフォルダには、commonjsやes6モジュールに対応したビルドが用意されており、webpackやrollup、node.jsなどで最適化されたi18nextを読み込むことができます。

UMDとは？
UMDはUniversal Module Definitionの略で、モジュールをブラウザやnode.jsなどの環境で使用するための仕様です。UMDに対応したモジュールは、ブラウザのグローバルオブジェクトに登録されます。


### denoでの導入

```
import i18next from 'https://deno.land/x/i18next/index.js'
// or import i18next from 'https://raw.githubusercontent.com/i18next/i18next/master/src/index.js'
// or import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js'

```

### Load from CDN

省略



### 重要な注意事項

最初のサンプルに入る前に、以下のことに注意してください。
デフォルトでは、i18nextは翻訳を検索するためにキーベースの記法を使用します。
この欠点は、キーが自然言語であってはならないことです。
キーの名前はフォールバックコンテンツとして使用されず、キー名には予約文字 : と . を含めてはなりません。
キーに自然言語を使用したい場合は、フォールバックガイドをお読みください。



### 基本的なサンプル

これらのサンプルは、コア機能の基本的な使用方法を示しているだけであり、本番環境で使用する場合は、フレームワークの統合を使用して、より良く、よりシンプルな統合を行ってください。
（innerHTMLを設定するのは、それがどのように機能するかを示すために行われています）。



```basicsample.js
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
});
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
document.getElementById('output').innerHTML = i18next.t('key');

```

↑関数の最下行部分に追記しているコード

https://www.i18next.com/overview/getting-started#basic-sample

↑ここを参考にしてくだい。

コールバック init シグネチャを使用します：

`}, function(err, t) {`

プロミスを使用する

`}).then(function(t) {`

async/awaitを使用する

`await i18next.init({`




### Extended sample

拡張されたサンプルでは、ブラウザの言語検出機能と、このドキュメントのi18next-gitbookリポジトリから翻訳ファイルを読み込むためのhttpバックエンドが追加されています。

https://jsfiddle.net/jamuhl/ferfywyf/525/

これで、基本的なセットアップの方法がわかりました。
それでは、次のことについて詳しく学びましょう。

* インターポレーション、フォーマット、複数形などの翻訳関数。
* プロジェクト用の拡張機能を見つける。
例えば、react - i18next、jquery - i18nextなど。これらのラッパーをi18nextの周りに配置すると、プロジェクトでi18nextを使用することがはるかに簡単になります。
そのようなモジュールのほとんどは、拡張された例が付属しています。
* 構成オプションについて詳しく調べる。
* 言語検出器を追加して、ユーザーの優先言語を検出します。
* バックエンドプラグインを追加して、サーバーまたはファイルシステムから翻訳をロードします。
* このReact.jsの例のように、i18nextをスマートな翻訳管理システムに接続します。



----------------------------------------

## Comparison to others

他の翻訳ライブラリとの比較

今では、例えばreact - i18nextをreact - intlと比較すると思うかもしれませんが、それは起こりません;)。しかし、なぜi18nextを信頼して国際化のための最良の選択肢であると言えるのかをリストアップします。



### Sustainability

持続可能性

i18nextは2011年末に作成されました。それは何を意味するのでしょうか？それは、あなたが今日使うであろうほとんどのライブラリ、あなたのメインのフロントエンド技術（react、vue、...）を含めて、それらよりも古いということです。

信じるか信じないかは別として、書いている時点で、v11.x.xは最小限の互換レイヤーを追加するだけでv1の代わりにドロップインできます。新しい素敵なものを使うためにものを壊すことは私たちにとって重要ではありません（それは私たちが開発の最新の可能性についていないことを意味しません）。



### Maturity

成熟

i18nextがオープンソースで利用可能になってからの期間に基づいて、i18nextで解決できない本当のi18nケースはありません。
i18nextとそのローカライゼーションサービスは、小規模から非常に大規模な企業まで使用されています。



### Extensibility

拡張性

ja: i18nextのv2では、i18nextを可能な限り拡張可能にするために、i18nextを完全に再構築しました。これを行うことで、i18nextはどのようなjavascript（およびいくつかの非javascript - .net、elm、iOS、androidなど）環境でも、どのようなUIフレームワークでも、どのようなi18n形式でも使用できます。...可能性は無限です。i18nextコアの周りにコミュニティが構築したものを見てみましょう。



### Richness

豊かさ

The regular i18n frameworks work like this:

1. すべての翻訳と使用される言語を渡します。
2.渡した翻訳と複数形と変数埋め込みの値に基づいて、正しい翻訳を返す関数を呼び出します。

What you don't get by others - but get with i18next

* 翻訳を複数のファイルに分割します。必要な翻訳のみをロードします。

* ほとんどの環境（ブラウザ、ネイティブ、サーバー）で言語を検出するプラグインがあります。これにより、検出する場所の優先順位を設定したり、リクエスト/訪問ごとに設定された言語をキャッシュしたりすることができます。

* サーバーやファイルシステムから翻訳をロードするプラグインは無限にあります...これらのバックエンドは、ロードが失敗したときに再試行されることや、ファイルが2度ロードされず、成功したときのコールバックが1度だけ呼び出されることも保証します。これらのバックエンドは、例えばlocalStorageにローカルキャッシュのための追加レイヤーを提供することもできます。

* 言語によって、何を読み込むか、どのようにフォールバックするかを指定できます。

* オブジェクトと配列のサポート

* 保存された翻訳の管理を完全に制御します。

* アプリケーションにとって重要な変更に対応する豊富なイベントシステム。

* 国際化フォーマットの自由度 - ICUがお好みですか？i18next - icuプラグインを使用してください。



### But I heard

でも聞いた



#### i18next is complicated

本当です。i18nextのドキュメントは、他のi18nフレームワークのドキュメントよりも大きいですが、それは（言語検出、翻訳ロードなど）を自分で構築しなければならない機能を提供していることへの敬意でもあります。

i18nextが他のi18nフレームワークと同じくらいシンプルである必要がない場合は、次のようにしてください。


```
import i18next from 'i18next';​

i18next.init({
    lng: 'de',
    resources: {
        de: {
            translation: {
                "hello world": "hallo Welt"
            }
        }
    }
});​
i18next.t('hello world'); // hallo Welt

```



### i18next is bloated

i18nextは膨大です

ふむ...これをまた1年後に聞いてみよう。国際化フレームワークが運用システムのニーズに追いつく必要があるとき。

私たちはコードベースをクリーンで読みやすく保つことに一生懸命です。私たちは多くのユーザーを助けるかもしれない新しい機能を追加します。



### i18next is too big

そう、minifiedで33kb、gzipで9kbというサイズは巨大です。しかし、あなたが前に見たように、内部には基本的な国際化機能以外にもたくさんのものがあります。

しかし、翻訳をプリコンパイルすることで小さくすることができます。私たちはi18nextをgzipで4kbまで下げることができます（宣伝になります）。



### We tell you

#### I18next can do more
I18nextでは更に多くのことが出来ます。

拡張機能のほんの2つのサンプルです。

a) エラーメッセージを動的にフォールバックさせたい。

```translation.json
{
    "error": {
        "unspecific": "Something went wrong.",
        "404": "The page was not found."
    }
}

```



例

```
const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "The page was not found"​

const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "Something went wrong"

```



b) あるいは、インターバル複数形のような言い方をする：

* まだたくさんの商品があります

* 残りわずかです。

* グッズは残っていません。
でドロップするだけです。

```
{
    key_interval: '(0){no goodies remaining...sorry you`re too late};(1-100){just a few goodies remaining...};(100-inf){many goodies still available};'
}

```



### Works on serverside

サーバーサイドで動作

他の国際化フレームワークの中にはサーバーサイドで動作するものもあるが、サーバーサイドに最適化されたものはあまりない。
翻訳をロードするのは一度だけです（新しいインスタンスを作成して翻訳を何度も注入するreact.jsのrender to stringを考えてください）。
また、非同期リクエストの間、設定された言語は維持されるのでしょうか、それとも同時リクエストによって正しい言語を設定する際に競合状態が発生するのでしょうか？



### Learn once - translate everywhere

一度学べばどこでも翻訳

i18nextが統合するテクノロジーの概要。いくつかリストアップされています： Electron、Phaser、iOS、Android、Aurelia、Meteor、React Native、Knockout、React、Next.js、Remix、Angular、Ember、jQuery、Vue、Grunt、IntelliJ IDEA、Webpack、NodeJS、Express、Django、Koa、Microsoft .NET、PHP、Ruby Rails、Couchbase、MongoDB、Redis、Firebase、Locize。

それだけで十分です。



### We bridge the gap to localization

ローカライゼーションへの橋渡し

正直なところ、国際化はサイトを翻訳する際の小さな痛みです。ローカリゼーションと翻訳プロセスは、本当に大変な作業の始まりです。

https://locize.com では、このギャップを埋め、これまでにないローカリゼーションのワークフローを実現します：



----------------------------------------

## API

### init

APIでの初期化

i18next.init(options, callback) // -> returns a Promise
この初期化処理 init を複数回呼び出さないでください。
i18nextモジュールのデフォルトのエクスポートは、initを呼び出し、初期化してできるi18nextインスタンスです。
createInstance関数を使用して追加のインスタンスを作成できます。
設定オプションの詳細については、オプションのページをお読みください。
コールバックは、すべての翻訳がロードされた後、または失敗したときにエラーとともに呼び出されます（バックエンドを使用している場合）。
そのため、t 関数を使う前に init が完了するのを待つ (コールバックを待つか、プロミスの解決を待つ) 必要があります。

>react-i18nextの場合、useSuspenseが有効になっていることを確認するか、HOCまたはフックでレディ状態を自分で処理してください。

>init を何度も呼び出さないでください。
言語を変更するには changeLanguage を使ってください。完全に異なる設定が必要な場合は、createInstance または cloneInstance を使用してください。

>バックエンドプラグインの使用時に読み込みの問題があった場合などにエラーが発生することがあります。

初期化例

```
i18next.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// with only callback
i18next.init((err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// using Promises
i18next
  .init({ /* options */ })
  .then(function(t) { t('key'); });

```

コールバックは、i18nextの初期化が完了した後に実行される関数です。
i18next.init()メソッドは、i18nextを初期化するために使用されます。
このメソッドは、非同期で実行されるため、初期化が完了する前に他の処理（＝翻訳）が実行される可能性があります。

そのため、初期化が完了した後に実行する処理をコールバック関数として渡す必要があります。
このコールバック関数では、初期化が正常に完了したかどうかをチェックし、エラーがあればエラーメッセージを表示します。
そして、初期化が完了したら、i18next.t()メソッドを使用して翻訳を行うことができます。

このように、コールバック関数を使用することで、i18nextの初期化が完了した後に必要な処理を実行することができます。



### use

プラグインの使用例

```
i18next.use(module)

```

use関数はi18nextに追加のプラグインをロードするためにあります。
利用可能なモジュールについてはプラグインページを参照し、プラグインのドキュメントを読むことを忘れないでください。


```
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import Cache from 'i18next-localstorage-cache';
import postProcessor from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(Cache)
  .use(LanguageDetector)
  .use(postProcessor)
  .init(options, callback);

```

↑プラグインを設定してから初期化しています。
これらのプラグインの解説は、それぞれ各項目をご覧ください。



### t

t関数

```
i18next.t(keys, options)

```

詳しい使い方は、変数埋め込み、書式設定、複数形などの翻訳関数をご覧ください。

1つのキーを文字列で指定することも、複数のキーを文字列の配列で指定することもできます。
最初に解決されたものが返されます。



基本的な使い方

```
// 設定された言語で値を返します。
i18next.t('my.key');

// 第一引数のキーがunknownの場合に、
// 設定された言語で 第2引数のキー 'my.key' で翻訳した値を返します。
i18next.t(['unknown.key', 'my.key']);

```

↑i18next.t()メソッドを使用して、'unknown.key'というキーに対応する翻訳されたテキストが存在しない場合に、'my.key'というキーに対応する翻訳されたテキストを取得しています。この場合、i18next.t()メソッドは、最初に指定されたキーに対応する翻訳が存在しない場合に、2番目に指定されたキーに対応する翻訳を返します。



### exists

存在確認

基本形

```
i18next.exists(key, options)

```



↓t関数と同じresolve機能を使用し、キーが存在すればtrueを返します。

```
// 存在すればtrue、存在しなければfalse
i18next.exists('my.key');

```



### getFixedT

```
i18next.getFixedT(lng, ns, keyPrefix)

```

i18nextのgetFixedT()メソッドについて、
このメソッドは、指定された言語、名前空間、キーのプレフィックスに対応する翻訳を取得するために使用されます。

例えば、以下のような翻訳があるとします。

```javascript.js
{
  "en": {
    "translation": {
      "greeting": "Hello",
      "farewell": "Goodbye"
    }
  },
  "ja": {
    "translation": {
      "greeting": "こんにちは",
      "farewell": "さようなら"
    }
  }
}

```

この場合、getFixedT()メソッドを使用して、日本語の翻訳を取得することができます。
例えば、以下のようになります。

```javascript
const t = i18next.getFixedT('ja', 'translation', 'greeting');
console.log(t()); // こんにちは
```

getFixedT()メソッドは、i18nextのt()メソッドとは異なり、言語、名前空間、キーのプレフィックスを指定することができます。これにより、特定の翻訳を取得することができます。

例えば、以下のような場合に使用することができます。

- 特定の言語の翻訳を取得したい場合
- 特定の名前空間の翻訳を取得したい場合
- 特定のキーのプレフィックスに対応する翻訳を取得したい場合

ただし、getFixedT()メソッドは、t()メソッドとは異なり、現在の言語設定に基づいて翻訳を取得することができません。そのため、明示的に言語、名前空間、キーのプレフィックスを指定する必要があります。

以上が、getFixedT()メソッドについての説明です。

与えられた言語または名前空間をデフォルトとするt関数を返します。
すべての引数は nullにすることが可能です

lngとnsの引数は言語または名前空間の配列で、その場合はフォールバックとして扱われます。
オプションのkeyPrefixは、返されるt関数に自動的に適用されます。



```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t('title'); // same as i18next.t('user.accountSettings.changePassword.title');

```

```
i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
// ↑ ↓ と同じ
i18next.t('user.accountSettings.changePassword.title');

```


↓プレフィックス付き名前空間表記のキーを使いたい場合は、keyPrefixオプションを使わないでください

```
const t = i18next.getFixedT(null, null, 'user.accountSettings.changePassword')
const title = t('ns:title'); // this will not work

```

↑このコードは動きません

返された関数では、t関数のように、言語や名前空間をオプションで渡したり、名前空間を前につけたりして上書きすることができます。



```
// 言語をドイツ語に固定する
const de = i18next.getFixedT('de');
de('myKey');

// または名前空間を anotherNamespace に固定する

const anotherNamespace = i18next.getFixedT(null, 'anotherNamespace');

anotherNamespace('anotherNamespaceKey');

```

nsのプレフィックスは不要

このような設定は不要→ i18n.t('anotherNamespace:anotherNamespaceKey')；
nsのプレフィックスは不要 i18n.t('anotherNamespace:anotherNamespaceKey')；



### changeLanguage

言語の変更

```
i18next.changeLanguage(lng, callback) // -> プロミスを返す

```



言語を変更します。コールバックは翻訳がロードされるか、ロード中にエラーが発生するとすぐに呼び出されます。

`lng`を指定せずに`changeLanguage`を呼び出すと、言語検出器を使用して言語を選択します。

'i18next'の言語設定の一つである'cimode'は、翻訳を無効にするために使用されます。
'cimode'を設定すると、'i18next'は翻訳を行わず、指定されたキーをそのまま返します。

これは、テスト目的で使用されることがあります。
例えば、'i18next'の't()'メソッドが正しく動作しているかどうかを確認するために、'cimode'を設定して、't()'メソッドがキーを返すことを確認することができます。



```
i18next.changeLanguage('en', (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// using Promises
i18next
  .changeLanguage('en')
  .then((t) => {
    t('key'); // -> same as i18next.t
  });

// ↓引数を与えない場合、このように手動で再検出をします。
i18next.changeLanguage().then(...)

```

i18nextは、ブラウザの言語設定やクエリパラメーターなどを使用して、通常は自動的に言語を検出しますが、場合によっては自動検出がうまく機能しないことがあります。
その場合、i18next.changeLanguage()メソッドを使用して、手動で言語を再検出することができます。
changeLanguage()メソッドに引数を与えない場合は、i18nextが自動的に言語を再検出します。
しかし、引数を与えることで明示的に言語を変更することもできます。



### language （←単数形）

単一の言語

`i18next.language`は、現在検出された言語または設定された言語に設定されます。

設定された言語がない場合、i18nextはクライアント側で言語を検出します。



`i18next.resolvedLanguage`は、設定された言語がない場合に使用されるプライマリ言語を返します。



#### 解説

これら３つの `i18next.language`、`i18next.resolvedLanguage`、`i18next.changeLanguage()`は、i18nextの言語設定に関連するプロパティとメソッドです。

- `i18next.language`は、現在の言語を取得するために使用されます。読み取り専用のプロパティであり、i18nextが現在使用している言語を取得するために使用されます。

- `i18next.resolvedLanguage`は、i18nextが自動的に検出した言語を取得するために使用されます。内部的に使用されるプロパティであり、通常は開発者が使用する必要はありません。

- `i18next.changeLanguage()`メソッドは、アプリケーションで使用する言語を変更するために使用されます。言語を動的に変更することができます。`changeLanguage()`メソッドに引数を与えることで、明示的に言語を変更することができます。引数を与えない場合は、i18nextが自動的に言語を再検出します。

これらのプロパティとメソッドは、i18nextの言語設定に関連しており、開発者がi18nextを使用する際に役立ちます。

設定(supportedLngs, load)に応じて主に使用される言語が必要な場合は、i18next.resolvedLanguageまたはi18next.languages[0]を使用する方が良いでしょう。



### languages （←複数形）

複数の言語

```
i18next.languages

```



翻訳値を検索するために使われる言語コードの配列が設定されます。
言語が設定されるとき、この配列は新しい言語コードで満たされます。

オーバーライドされない限り、この配列はフォールバックのためにそのコードのあまり特定されていないバージョンで満たされ、フォールバック言語のリストが続きます。
値は一意であるため、配列の前のほうに現れた場合は、再度追加されることはありません。

複数の言語を設定する方法

```
// フォールバック言語で初期化する
i18next.init({
  fallbackLng: ["es", "fr", "en-US", "dev"],
});

```

このコードは、i18nextでフォールバック言語を設定する方法を示しています。
フォールバック言語は、アプリケーションがサポートしていない言語を使用している場合に、代替として使用される言語です。

`fallbackLng`プロパティには、言語のリストが渡され、リストの最後にある`dev`がフォールバック言語として指定されています。
つまり、アプリケーションがサポートしていない言語が使用された場合、`dev`が最後のフォールバック言語として使用されます。

```
// 言語を変更する
i18next.changeLanguage("en-US-xx");

```

```
// 新しい言語とそのより一般的な形式、その後にフォールバック
i18next.languages; // ["en-US-xx", "en-US", "en", "es", "fr", "dev"]

```

このコードは、i18nextで使用可能な言語のリストを取得しています。
`i18next.languages`は、配列として言語のリストを返します。

この例では、`en-US-xx`、`en-US`、`en`、`es`、`fr`、`dev`の順で言語がリストされています。

`en-US-xx`は、`en-US`の特定のバリエーションを表しています。
`en-US`は、アメリカ英語を表しています。
`en`は、英語を表しています。
`es`は、スペイン語を表しています。
`fr`は、フランス語を表しています。
`dev`は、開発者が使用するための言語を表しています。

このように、i18next.languagesプロパティを使用することで、アプリケーションで使用可能な言語のリストを取得することができます。



```
// change the language again
i18next.changeLanguage("de-DE");

// previous language is not retained
i18next.languages; // ["de-DE", "de", "es", "fr", "en-US", "dev"]

```

`i18next.languages`プロパティを使用することで、現在設定されている言語のリストを取得することができます。
このコードのコメント「previous language is not retained」は、前回の言語が保持されていないことを示しています。
つまり、このコードが実行される前に、i18nextで使用されていた言語が保持されていないため、現在の言語リストには前回の言語が含まれていない可能性があるということです。

例えば、以下のようなシナリオを考えてみましょう。
ユーザーが最初にアプリケーションを開いたときに、言語を`en-US`に設定しました。
その後、ユーザーが言語を`fr`に変更した場合、`i18next.languages`プロパティを使用すると、`["fr","en-US","dev"]`という言語リストが返されます。

しかし、このコードが実行される前に、ユーザーが使用していた前回の言語が保持されていないため、`["fr","en-US","dev"]`には`en-US`が含まれていない可能性があります。

このように、`i18next.languages`プロパティを使用する場合は、前回の言語が保持されているかどうかに注意する必要があります。



### resolvedLanguage

解決言語

```
i18next.resolvedLanguage

```

「i18next.resolvedLanguage」というコードは、i18nextで使用されている言語を取得するためのプロパティです。
このプロパティは、i18nextが自動的に解決した言語を返します。

例えば、ユーザーがブラウザの言語を「ja-JP」と設定している場合、i18nextは自動的に「ja」という言語を解決します。
この場合、「i18next.resolvedLanguage」プロパティを使用すると、「ja」という言語が返されます。

これは、言語スイッチャーなどで、主要な使用言語として使用することができます。



### hasLoadedNamespace

```
i18next.hasLoadedNamespace(ns, options)
// -> true または false を返します。

```

「i18next.hasLoadedNamespace(ns,options)」というコードは、i18nextで使用される特定の名前空間がロードされたかどうかを確認するためのメソッドです。

このメソッドは、引数として名前空間（ns）とオプション（options）を受け取り、ロードされた場合はtrue、ロードされていない場合はfalseを返します。

例えば、以下のように使用することができます。

```javascript
i18next.hasLoadedNamespace('common', { lng: 'en' }); // commonという名前空間がロードされている場合はtrue、ロードされていない場合はfalseを返す
```

このように、i18next.hasLoadedNamespaceメソッドを使用することで、特定の名前空間がロードされたかどうかを確認することができます。



### loadNamespaces

i18next.loadNamespaces(ns, callback) // -> Promiseを返します。

init オプションで定義されていない追加のネームスペースをロードします。



```
i18next.loadNamespaces('myNamespace', (err) => { /* resources have been loaded */ });
i18next.loadNamespaces(['myNamespace1', 'myNamespace2'], (err) => { /* resources have been loaded */ });

// using Promises
i18next
  .loadNamespaces(['myNamespace1', 'myNamespace2'])
  .then(() => {});

```



### loadLanguages

i18next.loadLanguages(lngs, callback) // -> Promiseを返します。

initオプション(preload)で定義されていない追加言語をロードします。

```
i18next.loadLanguages('de', (err) => { /* resources have been loaded */ });
i18next.loadLanguages(['de', 'fr'], (err) => { /* resources have been loaded */ });

// using Promises
i18next
  .loadLanguages(['de', 'fr'])
  .then(() => {});

```



### reloadResources

リソースの再読み込み

```
i18next.reloadResources() // -> Promiseを返します。

```

「i18next.reloadResources()」というコードは、i18nextで使用されるリソース（翻訳ファイルなど）を再読み込みするためのメソッドです。
このメソッドは、Promiseを返します。

例えば、以下のように使用することができます。

```javascript
i18next.reloadResources().then(() => {
  console.log('リソースの再読み込みが完了しました');
});

```

このように、i18next.reloadResourcesメソッドを使用することで、i18nextで使用されるリソースを再読み込みすることができます。

すべてをリロードしたくない場合は、オプションで言語と名前空間の配列をパラメータとして渡すことができます。



```
// reload all
i18next.reloadResources();

// reload languages
i18next.reloadResources(['de', 'fr']);

// reload namespaces for all languages
i18next.reloadResources(null, ['ns1', 'ns2']);

// reload namespaces in languages
i18next.reloadResources(['de', 'fr'], ['ns1', 'ns2']);

// reload a namespace in a language
i18next.reloadResources('de', 'ns1');

// optional third param callback i18next@>=11.9.0
i18next.reloadResources('de', 'ns1', () => { /* reloaded */ });

// using Promises
i18next
  .reloadResources()
  .then(() => {});

```



### setDefaultNamespace

```
i18next.setDefaultNamespace(ns)

```

デフォルトの名前空間を変更します。



### dir

i18next.dir(lng)

言語の読み取り方向に応じてrtlまたはltrを返します。

```
// for current language
// 現在の言語を返します
i18next.dir();

// for another language
i18next.dir('en-US'); // -> "ltr";
i18next.dir('ar'); // -> "rtl";

```



`rtl`と`ltr`は、テキストの方向を指定するための略語です。
`rtl`は「RightToLeft」の略で、右から左にテキストが表示されることを示します。
一方、`ltr`は「LeftToRight」の略で、左から右にテキストが表示されることを示します。

これらの略語は、主に多言語対応のWebサイトやアプリケーションで使用されます。
例えば、アラビア語やヘブライ語など、右から左に書かれる言語では`rtl`が使用されます。
一方、英語や日本語など、左から右に書かれる言語では`ltr`が使用されます。

また、i18nextでは、`options`オブジェクトの`lng`プロパティに`rtl`または`ltr`を指定することで、テキストの方向を指定することができます。例えば、以下のように使用することができます。

```javascript
i18next.init({
  lng: 'ar', // アラビア語を使用する場合
  options: {
    lng: 'ar',
    direction: 'rtl' // テキストの方向を右から左に指定する
  }
});

```

※アラビア語とわかっていてもテキストの方向を指定する必要があります。



### format (非推奨)

```
i18next.format(data, format, lng)

```

i18next.formatは、i18next v8.4.0で導入されたものですが、v21.3.0以降はレガシーとなっています。
代わりに、i18next.tメソッドを使用することを推奨します。
i18next.tメソッドは、テキストの翻訳と変数の置換を同時に行うことができます。

```
// key = 'hello {{what}}'
i18next.t('key', { what: i18next.format('world', 'uppercase') }); // -> hello WORLD

```



### instance creation

インスタンスを作成します。



#### createInstance

```
i18next.createInstance(options, callback)

```

新しい i18next インスタンスを返します。
設定オプションの詳細については、オプションのページを読んでください。
コールバックを提供すると、自動的に init が呼び出されます。
コールバックはすべての翻訳がロードされた後か、失敗したときにエラーとともに呼び出されます(バックエンドを使用している場合)。

「instancecreation」とは、オブジェクト指向プログラミングにおいて、クラスから新しいオブジェクトを作成することを指します。

i18nextでは、`createInstance`メソッドを使用して、新しいi18nextインスタンスを作成することができます。
以下は、`createInstance`メソッドの使用例です。


```
const newInstance = i18next.createInstance({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// is the same as
const newInstance = i18next.createInstance();
newInstance.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

```

この例では、`options`オブジェクトを定義し、`createInstance`メソッドを使用して、新しいi18nextインスタンスを作成しています。
`options`オブジェクトには、i18nextの設定オプションが含まれています。
`createInstance`メソッドには、`options`オブジェクトと、オプションのコールバック関数が渡されています。

コールバック関数は、すべての翻訳がロードされた後に呼び出されます。
翻訳のロードに失敗した場合は、エラーが渡されます。
この例では、`createInstance`メソッドが呼び出された後、`instance`オブジェクトが作成され、`t`関数を使用して翻訳を取得しています。

新しいインスタンスを作成することで、異なるオプションを使用することができます。また、i18nextInstance.initメソッドを使用することで、新しいインスタンスを初期化することができます。



#### cloneInstance

```
i18next.cloneInstance(options)

```



現在のインスタンスのクローンを作成します。ストア、プラグイン、初期設定を共有します。ストレージを共有するインスタンスを作成しますが、設定言語やデフォルトの名前空間には依存しません。

「i18next.cloneInstance(options)」は、i18nextのインスタンスを複製するためのメソッドです。このメソッドは、1つの引数を受け取ります。引数は、オプションを指定するオブジェクトです。

例えば、以下のように使用することができます。

```javascript
const i18nextInstance = i18next.createInstance({
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome, {{name}}!'
      }
    }
  }
});

const clonedInstance = i18nextInstance.cloneInstance({
  lng: 'fr'
});

clonedInstance.init((err, t) => {
  console.log(t('welcome', { name: 'John' })); // -> "Bienvenue, John!"
});
```

このように、`i18next.cloneInstance`メソッドを使用することで、既存のi18nextのインスタンスを複製することができます。複製したインスタンスは、異なるオプションを使用することができます。また、`clonedInstance.init`メソッドを使用することで、複製したインスタンスを初期化することができます。



#### forkResourceStore

「forkResourceStore」オプションをtrueに設定することで、i18nextのストアを共有しないようにすることができます。

ストアは、i18nextが使用する翻訳リソースを格納する場所です。

通常、i18nextのインスタンスは、同じストアを共有します。しかし、`forkResourceStore`オプションをtrueに設定することで、新しいストアを作成し、既存のストアとは別に翻訳リソースを格納することができます。

例えば、以下のように使用することができます。

```javascript
const i18nextInstance = i18next.createInstance({
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome, {{name}}!'
      }
    }
  },
  forkResourceStore: true
});

const clonedInstance = i18nextInstance.cloneInstance({
  lng: 'fr'
});

clonedInstance.addResourceBundle('fr', 'translation', {
  welcome: 'Bienvenue, {{name}}!'
});

console.log(i18nextInstance.t('welcome')); // -> "Welcome, {{name}}!"
console.log(clonedInstance.t('welcome')); // -> "Bienvenue, {{name}}!"
```

このように、`forkResourceStore`オプションをtrueに設定することで、新しいストアを作成し、既存のストアとは別に翻訳リソースを格納することができます。



### events

すべてのイベントは↓このような形式で解除します。

offメソッドを使用します。

```
i18next.off('name', myFunction);

```

↓すべてのリスナーの配信を停止することができます。

```
i18next.off('name')

```

「i18next.off」は、i18nextで使用されるイベントのリスナーを解除するためのメソッドです。このメソッドは、2つの引数を受け取ります。1つ目の引数は、解除したいイベントの名前であり、2つ目の引数は、解除したいリスナーの関数です。

例えば、以下のように使用することができます。

```javascript
function myFunction() {
  console.log('Event fired!');
}

i18next.on('initialized', myFunction);

i18next.off('initialized', myFunction);
```

このように、`i18next.off`メソッドを使用することで、イベントのリスナーを解除することができます。また、イベントの名前だけを指定することで、そのイベントに関連するすべてのリスナーを解除することもできます。

例えば、以下のように使用することができます。

```javascript
i18next.off('initialized');
```

このように、`i18next.off`メソッドを使用することで、i18nextで使用されるイベントのリスナーを解除することができます。


#### 解説

1. イベントリスナーとは？

イベントリスナーとは、イベントが発生したときに自動的に呼び出される関数のことです。例えば、i18nextでは、`initialized`イベントがあり、i18nextが初期化されたときに自動的に呼び出されます。

2. イベントリスナーの登録

イベントリスナーを登録するには、`on`メソッドを使用します。例えば、以下のように使用することができます。

```javascript
function myFunction() {
  console.log('Event fired!');
}

i18next.on('initialized', myFunction);
```

このように、`on`メソッドを使用することで、`initialized`イベントに対するイベントリスナーを登録することができます。

3. イベントリスナーの解除

イベントリスナーを解除するには、`off`メソッドを使用します。例えば、以下のように使用することができます。

```javascript
i18next.off('initialized', myFunction);
```

このように、`off`メソッドを使用することで、`initialized`イベントに対するイベントリスナーを解除することができます。ただし、注意点として、解除するイベントリスナーは、登録したときと同じ関数である必要があります。また、解除するイベントリスナーを指定しない場合は、そのイベントに関連するすべてのリスナーが解除されます。

4. 具体例

以下の例では、`initialized`イベントに対するイベントリスナーを登録し、i18nextが初期化されたときに`myFunction`関数が呼び出されます。その後、`off`メソッドを使用して、イベントリスナーを解除します。

```javascript
function myFunction() {
  console.log('Event fired!');
}

i18next.on('initialized', myFunction);

i18next.init((err, t) => {
  console.log('i18next initialized!');
  i18next.off('initialized', myFunction);
});
```

このように、イベントリスナーを解除することで、イベントに対する応答を停止することができます。



#### onInitialized

```
i18next.on('initialized', function(options) {})

```

初期化後に発火します。



#### onLanguageChanged

```
i18next.on('languageChanged', function(lng) {})

```

changeLanguageが呼び出されたときに発火します。



#### onLoaded

```
i18next.on('loaded', function(loaded) {})

```

ロードされたリソースで発火します。



#### onFailedLoading

```
i18next.on('failedLoading', function(lng, ns, msg) {})

```

リソースのロードに失敗した場合に発火します（組み込みのリトライアルゴリズムの後）。



#### onMissingKey

```
i18next.on('missingKey', function(lngs, namespace, key, res) {})

```



保存されていないキーにアクセスしたときに発火します。saveMissingをtrueに設定する必要があります。


##### 解説

このイベントは、i18nextが翻訳キーを見つけられなかった場合に発生します。

「i18next.on('missingKey', function(lngs, namespace, key, res) {})」は、i18nextで使用される「missingKey」というイベントに対するイベントリスナーを登録するためのコードです。

このコードでは、4つの引数を持つ関数がイベントリスナーとして登録されています。
1つ目の引数は「lngs」で、翻訳が必要な言語を表します。
2つ目の引数は「namespace」で、翻訳が必要な名前空間を表します。
3つ目の引数は「key」で、翻訳が必要なキーを表します。
4つ目の引数は「res」で、翻訳が必要な場合に使用できるオプションの情報を表します。

例えば、以下のように使用することができます。

```javascript
i18next.on('missingKey', function(lngs, namespace, key, res) {
  console.log('Missing translation key:', key);
});

```

このように、i18nextで「missingKey」イベントが発生した場合に、指定した関数が自動的に呼び出されます。
この例では、翻訳キーが見つからなかった場合に、コンソールに「Missing translation key:」というメッセージが表示されます。




### store events

i18next.storeは、initコール後にのみ使用可能です。

「store events」とは、i18nextの翻訳データを保持する「store」オブジェクトに対するイベントのことです。i18nextでは、翻訳データを保持するために、様々な種類のストレージを使用することができます。例えば、メモリ内のオブジェクト、ローカルストレージ、サーバー上のデータベースなどです。

「store events」には、以下のようなイベントがあります。

- `added`: 新しい翻訳が追加されたときに発生します。
- `removed`: 翻訳が削除されたときに発生します。
- `changed`: 翻訳が変更されたときに発生します。
- `merged`: 翻訳がマージされたときに発生します。
- `languageChanged`: 言語が変更されたときに発生します。

これらのイベントは、i18nextの翻訳データに変更があった場合に自動的に発生します。例えば、以下のように使用することができます。

```javascript
i18next.store.on('added', function(lng, ns, key, value) {
  console.log('Translation added:', key, value);
});

i18next.addResource('en', 'translation', 'key', 'value');

```

このように、`on`メソッドを使用して、`added`イベントに対するイベントリスナーを登録することができます。そして、`addResource`メソッドを使用して、新しい翻訳を追加すると、登録したイベントリスナーが自動的に呼び出されます。この例では、翻訳が追加された場合に、コンソールに「Translation added:」というメッセージが表示されます。



#### onAdded

```
i18next.store.on('added', function(lng, ns) {})

```

リソースが追加されたときに発火します。



#### onRemoved

```
i18next.store.on('removed', function(lng, ns) {})

```

リソースが削除されたときに発火します。



#### resource handling

i18next または i18next.services.resourceStore でアクセスできます。



#### getResource

```
i18next.getResource(lng, ns, key, options)

```

##### 解説

「i18next.getResource(lng, ns, key, options)」は、i18nextで使用される翻訳データを取得するためのメソッドです。このメソッドは、指定された言語（lng）、名前空間（ns）、キー（key）に対応する翻訳データを取得します。オプション（options）を指定することで、翻訳データの取得方法をカスタマイズすることができます。

例えば、以下のように使用することができます。

```javascript
i18next.getResource('en', 'translation', 'hello', { /* options */ }, function(err, result) {
  console.log(result);
});

```

このように、`getResource`メソッドを使用して、指定された言語、名前空間、キーに対応する翻訳データを取得することができます。
この例では、`'en'`という言語、`'translation'`という名前空間、`'hello'`というキーに対応する翻訳データを取得しています。そして、取得した翻訳データは、コールバック関数の`result`引数に渡され、コンソールに表示されます。

指定されたキーによって1つの翻訳文を取得します。

options:

option
default
description


##### keySeparator

"."

キーを区切る文字。または、区切り文字が必要ない場合はfalseを指定します。



##### ignoreJSONStructure

true

キーがネストされたキーとして見つからない場合、フラットキーとして検索を試みます



#### addResource

```
i18next.addResource(lng, ns, key, value, options)

```

「i18next.addResource(lng, ns, key, value, options)」は、i18nextで使用される翻訳データを追加するためのメソッドです。このメソッドは、指定された言語（lng）、名前空間（ns）、キー（key）に対応する翻訳データ（value）を追加します。オプション（options）を指定することで、翻訳データの追加方法をカスタマイズすることができます。

例えば、以下のように使用することができます。

```javascript
i18next.addResource('en', 'translation', 'hello', 'Hello');

```

このように、`addResource`メソッドを使用して、指定された言語、名前空間、キーに対応する翻訳データを追加することができます。この例では、`'en'`という言語、`'translation'`という名前空間、`'hello'`というキーに対応する翻訳データとして`'Hello'`を追加しています。



options:

option
default
description



##### keySeparator

"."

キーを区切る文字。または、区切り文字が必要ない場合はfalseを指定します。



##### silent

false

trueに設定すると、追加されたイベントが発生しません



#### addResources

あとから翻訳データを追加する

```
i18next.addResources(lng, ns, resources)

```

あとから翻訳データを追加する



`addResources`は、i18nextのメソッドの1つで、複数のキーと値を追加することができます。

このメソッドには、追加するリソースの言語、名前空間、およびリソースのオブジェクトを指定する必要があります。

例えば、以下のようになります。

```javascript
i18next.addResources('ja', 'translation', {
key1: '値1',
key2: '値2',
key3: '値3'
});

```

この例では、`ja`という言語、`translation`という名前空間に、3つのキーと値を追加しています。
`key1`には`値1`、`key2`には`値2`、`key3`には`値3`が設定されています。
このように、`addResources`メソッドを使用することで、複数のキーと値を一度に追加することができます。



#### addResourceBundle

```
i18next.addResourceBundle(lng, ns, resources, deep, overwrite)

```

「i18next.addResourceBundle(lng, ns, resources, deep, overwrite)」は、i18nextで使用される翻訳データを一括で追加するためのメソッドです。

このメソッドは、指定された言語（lng）、名前空間（ns）、翻訳データ（resources）を一括で追加します。オプションの`deep`パラメータを`true`に設定することで、ネストされたオブジェクトを再帰的に追加することができます。また、オプションの`overwrite`パラメータを`true`に設定することで、既存の翻訳データを上書きすることができます。

例えば、以下のように使用することができます。

```javascript
i18next.addResourceBundle('en', 'translation', {
  'hello': 'Hello',
  'world': 'World'
}, true, true);
```

このように、`addResourceBundle`メソッドを使用して、指定された言語、名前空間、翻訳データを一括で追加することができます。

この例では、`'en'`という言語、`'translation'`という名前空間に、`'hello'`と`'world'`というキーに対応する翻訳データを一括で追加しています。`deep`パラメータを`true`に設定することで、ネストされたオブジェクトを再帰的に追加することができます。`overwrite`パラメータを`true`に設定することで、既存の翻訳データを上書きすることができます。



deep (デフォルトはfalse)パラメータをtrueに設定すると、そのファイル内の既存の翻訳を拡張します。deepとoverwrite（デフォルトはfalse）をtrueに設定すると、そのファイル内の既存の翻訳を上書きします。

deepとoverwriteを省略すると、リソースで提供されたもので既存のすべての翻訳を上書きします。deepを使用すると、既存のネストされた翻訳を保持し、新しい翻訳でそれらを上書きすることができます。

```
i18next.addResourceBundle('en', 'translations', {
key: 'value',
}, true, true);

```

#### hasResourceBundle

```
i18next.hasResourceBundle(lng, ns)

```

「i18next.hasResourceBundle(lng, ns)」は、指定された言語（lng）、名前空間（ns）に対応する翻訳データが存在するかどうかを判定するためのメソッドです。もし翻訳データが存在する場合は`true`を、存在しない場合は`false`を返します。

例えば、以下のように使用することができます。

```javascript
if (i18next.hasResourceBundle('en', 'translation')) {
  console.log('Translation data exists!');
} else {
  console.log('Translation data does not exist!');
}
```

このように、`hasResourceBundle`メソッドを使用して、指定された言語、名前空間に対応する翻訳データが存在するかどうかを判定することができます。この例では、`'en'`という言語、`'translation'`という名前空間に対応する翻訳データが存在する場合は、「Translation data exists!」というメッセージが表示されます。存在しない場合は、「Translation data does not exist!」というメッセージが表示されます。



#### getDataByLanguage

```
i18next.getDataByLanguage(lng)

```

「i18next.getDataByLanguage(lng)」は、指定された言語（lng）に対応する翻訳データを取得するためのメソッドです。このメソッドは、指定された言語に対応する全ての翻訳データを取得します。

例えば、以下のように使用することができます。

```javascript
const data = i18next.getDataByLanguage('en');
console.log(data);
```

このように、`getDataByLanguage`メソッドを使用して、指定された言語に対応する全ての翻訳データを取得することができます。

この例では、`'en'`という言語に対応する全ての翻訳データを取得しています。そして、取得した翻訳データは、`data`変数に格納され、コンソールに表示されます。



#### getResourceBundle

```
i18next.getResourceBundle(lng, ns)

```

「i18next.getResourceBundle(lng, ns)」は、指定された言語（lng）、名前空間（ns）に対応する翻訳データを取得するためのメソッドです。このメソッドは、指定された言語、名前空間に対応する全ての翻訳データを取得します。

Resourceは、i18nextで使用される翻訳データを表すオブジェクトのことです。このオブジェクトは、言語（lng）、名前空間（ns）、キー（key）に対応する翻訳文（value）を含んでいます。Resourceオブジェクトは、i18nextの多言語対応機能を実現するために使用されます。

例えば、以下のように使用することができます。

```javascript
const resources = i18next.getResourceBundle('en', 'translation');
console.log(resources);
```

このように、`getResourceBundle`メソッドを使用して、指定された言語、名前空間に対応する全ての翻訳データを取得することができます。

この例では、`'en'`という言語、`'translation'`という名前空間に対応する全ての翻訳データを取得しています。そして、取得した翻訳データは、`resources`変数に格納され、コンソールに表示されます。



### removeResourceBundle

```
i18next.removeResourceBundle(lng, ns)

```

既存のバンドルを削除します。



バンドルとは
i18nextで使用される翻訳データを管理するためのオブジェクトです。`Bundle`オブジェクトは、言語（lng）、名前空間（ns）、翻訳データ（resources）を含んでいます。

`Bundle`オブジェクトは、i18nextの多言語対応機能を実現するために使用されます。`Bundle`オブジェクトは、`i18next.init`メソッドで初期化され、`i18next.use`メソッドで使用されます。



----------------------------------------

## Configuration Options

`Configuration Options`は、i18nextの設定オプションを表すオブジェクトです。
このオブジェクトには、i18nextの動作をカスタマイズするための様々なオプションが含まれています。
例えば、言語のフォールバック、翻訳データのロード方法、翻訳文の置換方法などが設定できます。

`Configuration Options`は、`i18next.init`メソッドの引数として渡され、i18nextの動作をカスタマイズするために使用されます。

```
i18next.init(options, callback)

```

init()またはcreateInstance()を呼び出すためのすべてのオプション。



### Logging

option
default
description



##### debug

false

ログレベルをinfoに設定します。ロードが機能しない問題を見つけるのに役立ちます。



### Languages, namespaces, resources

option
default
description



##### resources

undefined

初期化に使用するリソース（バックエンドプラグインを使用していない場合やaddResourceBundleを使用していない場合）



##### lng

undefined

使用する言語（言語検出を上書きします）。 'cimode'に設定すると、出力テキストはキーになります。
アンダースコアなどではなく、'en-US'形式を使用してください。



##### appendNamespaceToCIMode

false

lng: 'cimode'を使用すると、返されるキーの先頭に名前空間が付加されます。



##### fallbackLng

'dev'

ユーザー言語の翻訳が利用できない場合に使用する言語。
falseに明示的に設定すると、fallbackLngをロードすることはありません。フォールバックドキュメントを参照してください。



##### supportedLngs

false

許可された言語の配列



##### nonExplicitSupportedLngs

false

もし true なら、メイン言語がサポートされているときに variant もサポートされているとみなします。
例えば、en が supportedLngs にあれば en-US は有効です。
もし true で i18next-http-backend のようなバックエンドを使うと、 リクエストエラーの原因になります。



##### load

'all'

調べる言語コードを定義する戦略。 例:設定された言語がen-USの場合: - 'all' ⇒ ['en-US', 'en', 'dev'] - 'currentOnly' ⇒ 'en-US' - 'languageOnly' ⇒ 'en'



##### preload

false

プリロードする言語の配列。 ビューをレンダリングする前に翻訳がロードされていることを保証するためにサーバーサイドで重要です。



##### lowerCaseLng

false

ロケールを完全に小文字にします。 例: en-US ⇒ en-us



##### cleanCode

false

主言語は小文字になります。例えば、EN ⇒ en のように、en-US のような完全なロケールは残す。



##### ns

'translation'

ロードする名前空間の文字列または配列



##### defaultNS

'translation'

(ns オプションがあり、defaultNS オプションが定義されていない場合、最初の名前空間が defaultNS オプションとして使用されます。)
(これをfalseまたは空の配列[]に設定すると、このフォールバック動作が無効になる。)

翻訳関数に渡されなかった場合に使用されるデフォルトの名前空間。



##### fallbackNS

false

指定された名前空間でキーが見つからない場合に検索する名前空間の文字列または配列。 NSフォールバックドキュメントを参照してください。



##### partialBundledLanguages

false

一部のリソースを初期化時に設定することを許可します。 他のリソースはバックエンドコネクタを使用してロードできます。



### Missing keys

i18nextの欠落したキー機能は、開発中に非常に便利です。 有効にすると（saveMissing:true）、まだ翻訳リソースの一部ではない使用されたi18nキーを収集し、使用されているバックエンドに保存しようとします（これには、create機能を提供するバックエンドプラグインが必要です）。

このビデオでは、saveMissing機能がどのように使用されるかを見ることができます。

i18next Crash Course | the JavaScript i18n framework - YouTube

https://www.youtube.com/watch?v=SA_9i4TtxLQ&t=1032s



option
default
description



##### saveMissing

false

キーが見つからない場合、バックエンドの save missing key 関数を呼び出します (create 関数をサポートしているバックエンドのみ)、

i.e.
i18next-fs-backend,
i18next-http-backend,
i18next-locize-backend
etc.



##### updateMissing

false

実験的: saveMissingを使用してデフォルト値を更新することを有効にします（defaultValueが翻訳された値と異なる場合にのみ機能します。初期開発時や、コードを真実のソースとして保持し、コードの外側の値を変更しない場合にのみ有用です。バックエンドが既にサポートしている場合のみサポートされます）



##### saveMissingTo

'fallback'

'current' or 'all'
デフォルトでは、設定されたフォールバック言語を使用して、欠落したキーを保存します。

// ja: 保存する言語を定義します。 'current'は現在使用されている/検出されている言語（i18next.language）を使用します。 'all'は、i18next.languagesに含まれるすべての言語に保存します。



##### saveMissingPlurals

true

「saveMissingPlurals」は、i18nextで使用されるオプションの一つで、翻訳データが存在しない場合に、自動的に翻訳データを生成するための機能です。

このオプションを有効にすると、i18nextは、翻訳データが存在しない場合に、自動的に翻訳データを生成し、それを保存することができます。また、複数形の翻訳データが存在しない場合にも、自動的に複数形の翻訳データを生成することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  saveMissing: true,
  saveMissingPlurals: true
});
```

このように、`saveMissingPlurals`オプションを`true`に設定することで、i18nextは、翻訳データが存在しない場合に、自動的に複数形の翻訳データを生成し、それを保存することができます。このオプションを使用することで、翻訳データの不足を自動的に補完することができます。




##### missingKeyHandler

false

function(lngs, ns, key, fallbackValue, updateMissing, options) { } カスタム欠落キー処理に使用されます (saveMissing を true に設定する必要があります!)。
optionsは、t()オプションと同様の内部値コンテナです。
fallbackValue引数は、翻訳が提供されない場合に表示される値です（通常はdefaultValue）。updateMissing 引数は、updateMissing 機能によって missingKeyHandler 関数が呼び出された場合に true に設定されます。

「missingKeyHandler」は、i18nextで使用されるオプションの一つで、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義するための機能です。このオプションを使用することで、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  missingKeyHandler: function(lng, ns, key, fallbackValue) {
    console.log('Missing translation key:', key);
    return key;
  }
});
```

このように、`missingKeyHandler`オプションを使用して、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義することができます。

この例では、翻訳データが存在しない場合に、コンソールに「Missing translation key:」というメッセージが表示され、翻訳キーがそのまま返されます。このように、`missingKeyHandler`オプションを使用することで、翻訳データの不足を自動的に補完することができます。






##### parseMissingKeyHandler

noop

function(key, defaultValue) { // return value to display }

「parseMissingKeyHandler」は、i18nextで使用されるオプションの一つで、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義するための機能です。

このオプションを使用することで、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  parseMissingKeyHandler: function(key) {
    console.log('Missing translation key:', key);
    return key;
  }
});
```

このように、`parseMissingKeyHandler`オプションを使用して、翻訳データが存在しない場合に、自動的に翻訳データを生成するためのカスタムハンドラーを定義することができます。

この例では、翻訳データが存在しない場合に、コンソールに「Missing translation key:」というメッセージが表示され、翻訳キーがそのまま返されます。このように、`parseMissingKeyHandler`オプションを使用することで、翻訳データの不足を自動的に補完することができます。



##### appendNamespaceToMissingKey

false

欠落したキーに名前空間を追加します。

「appendNamespaceToMissingKey」は、i18nextで使用されるオプションの一つで、翻訳データが存在しない場合に、自動的に翻訳データを生成するための機能です。

このオプションを有効にすると、i18nextは、翻訳データが存在しない場合に、自動的に翻訳データを生成する際に、名前空間（namespace）を翻訳キー（key）の前に付加することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  appendNamespaceToMissingKey: true
});

```

このように、`appendNamespaceToMissingKey`オプションを`true`に設定することで、i18nextは、翻訳データが存在しない場合に、自動的に翻訳データを生成する際に、名前空間を翻訳キーの前に付加することができます。

このオプションを使用することで、翻訳データの不足を自動的に補完することができます。



##### missingInterpolationHandler

noop

function(text, value) { return 'stringWithAlternativeValueOrUndefined' } gets called in case a interpolation value is undefined.
This method will not be called if the value is an empty string or null
// ja: インターポレーション値が未定義の場合に呼び出されます。
このメソッドは、値が空の文字列またはnullの場合は呼び出されません。

「missingInterpolationHandler」は、i18nextで使用されるオプションの一つで、翻訳文中に変数の値が埋め込まれている場合に、変数の値が存在しない場合に、自動的に代替テキストを生成するためのカスタムハンドラーを定義するための機能です。
このオプションを使用することで、翻訳文中の変数の値が存在しない場合に、代替テキストを自動的に生成することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  missingInterpolationHandler: function(text, value, options) {
    console.log('Missing interpolation value:', value);
    return text;
  }
});
```

このように、`missingInterpolationHandler`オプションを使用して、翻訳文中に変数の値が存在しない場合に、自動的に代替テキストを生成するためのカスタムハンドラーを定義することができます。

この例では、変数の値が存在しない場合に、コンソールに「Missing interpolation value:」というメッセージが表示され、翻訳文がそのまま返されます。
このように、`missingInterpolationHandler`オプションを使用することで、翻訳文中の変数の値が存在しない場合に、代替テキストを自動的に生成することができます。





##### missingKeyNoValueFallbackToKey

false

saveMissing機能を使用している場合、キーをデフォルト値としてフォールバックしないようにするために使用されます。 * i.e. i18next-http-backendを使用している場合、これにより、空の文字列値を持つキーが生成されます。


「missingKeyNoValueFallbackToKey」は、i18nextで使用されるオプションの一つで、翻訳データが存在しない場合に、翻訳キーをそのまま翻訳文として使用するための機能です。

このオプションを有効にすると、i18nextは、翻訳データが存在しない場合に、翻訳キーをそのまま翻訳文として使用することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  missingKeyNoValueFallbackToKey: true
});
```

このように、`missingKeyNoValueFallbackToKey`オプションを`true`に設定することで、i18nextは、翻訳データが存在しない場合に、翻訳キーをそのまま翻訳文として使用することができます。
このオプションを使用することで、翻訳データの不足を自動的に補完することができます。



### Translation defaults

翻訳データが存在しない場合に、デフォルトの翻訳文を使用します。

option
default
description



##### postProcess

false

デフォルトで適用する ポストプロセッサ の文字列または配列

「postProcess」は、i18nextで使用されるオプションの一つで、翻訳文を変換するためのカスタムプロセッサを定義するための機能です。
このオプションを使用することで、翻訳文を変換するための カスタムプロセッサ を定義することができます。

「カスタムプロセッサ」と「ポストプロセッサ」
i18nextで使用されるオプションの一つで、翻訳文を変換するための機能です。ただし、両者の違いは、実行されるタイミングにあります。

「カスタムプロセッサ」
翻訳文が取得される前に実行される機能で、翻訳文を変換するためのカスタムプロセッサを定義することができます。
例えば、翻訳文中の特定の文字列を自動的に置換するカスタムプロセッサを定義することができます。

両者とも、翻訳文を変換するためのカスタムプロセッサを定義することができますが、実行されるタイミングが異なるため、目的に応じて使い分けることが重要です。

「ポストプロセッサ」
翻訳文が取得された後に実行される機能で、翻訳文を変換するためのカスタムプロセッサを定義することができます。
例えば、翻訳文を大文字に変換するカスタムプロセッサを定義することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  postProcess: function(value, key, options) {
    return value.toUpperCase();
  }
});
```

このように、`postProcess`オプションを使用して、翻訳文を変換するためのカスタムプロセッサを定義することができます。

この例では、翻訳文を大文字に変換するカスタムプロセッサが定義されています。このように、`postProcess`オプションを使用することで、翻訳文を変換するためのカスタムプロセッサを定義することができます。



##### returnNull

true

null値を有効な翻訳として許可します。



##### returnEmptyString

true

空の文字列を有効な翻訳として許可します。



##### returnObjects

false

オブジェクトを有効な翻訳結果として許可します

「returnObjects」は、i18nextで使用されるオプションの一つで、翻訳データをオブジェクトとして返すか、文字列として返すかを指定するための機能です。
このオプションを使用することで、翻訳データをオブジェクトとして取得することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  returnObjects: true
});
```

このように、`returnObjects`オプションを`true`に設定することで、i18nextは、翻訳データをオブジェクトとして取得することができます。
このオプションを使用することで、翻訳データをより柔軟に扱うことができます。



##### returnDetails

false

使用された言語、名前空間、キー、値に関する情報を含むオブジェクトを返します。

「returnDetails」は、i18nextで使用されるオプションの一つで、翻訳データを取得する際に、使用された言語、名前空間、キー、値に関する情報を含むオブジェクトを返すための機能です。
このオプションを使用することで、翻訳データに関する詳細な情報を取得することができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  returnDetails: true
});
```

このように、`returnDetails`オプションを`true`に設定することで、i18nextは、翻訳データを取得する際に、使用された言語、名前空間、キー、値に関する情報を含むオブジェクトを返すことができます。
このオプションを使用することで、翻訳データに関する詳細な情報を取得することができます。



##### returnedObjectHandler

noop

returnObjectsがfalseに設定されている場合に、キーとしてオブジェクトが渡された場合に呼び出されます。

「returnedObjectHandler」は、i18nextで使用されるオプションの一つで、`returnObjects`が`false`に設定されている場合に、キーとしてオブジェクトが渡された場合に呼び出される関数を定義するための機能です。このオプションを使用することで、オブジェクトを翻訳データとして扱うことができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  returnObjects: false,
  returnedObjectHandler: function(key, value, options) {
    return JSON.stringify(value);
  }
});
```

このように、`returnedObjectHandler`オプションを使用して、オブジェクトを翻訳データとして扱うための関数を定義することができます。この例では、オブジェクトをJSON形式の文字列に変換する関数が定義されています。このように、`returnedObjectHandler`オプションを使用することで、オブジェクトを翻訳データとして扱うことができます。



##### joinArrays

false

配列が結合される文字。 例: ", "



##### overloadTranslationOptionHandler

function(args) { return { defaultValue: args[1] }; };

デフォルト値を設定します

「overloadTranslationOptionHandler」は、i18nextで使用されるオプションの一つで、翻訳データを取得する際に、オプションとして渡された値を優先して使用するための機能です。このオプションを使用することで、翻訳データをより柔軟に扱うことができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  overloadTranslationOptionHandler: function(args) {
    if (args[1] && args[1].myOption) {
      return { defaultValue: 'Custom default value' };
    }
  }
});
```

このように、`overloadTranslationOptionHandler`オプションを使用して、オプションとして渡された値を優先して使用するための関数を定義することができます。

この例では、`myOption`というオプションが渡された場合に、デフォルト値をカスタムの値に置き換える関数が定義されています。このように、`overloadTranslationOptionHandler`オプションを使用することで、翻訳データをより柔軟に扱うことができます。




##### interpolation

{...}

インターポレーションオプションを定義します。

「interpolation」は、i18nextで使用されるオプションの一つで、翻訳文中に変数を埋め込むための機能を定義するためのオプションです。

このオプションを使用することで、翻訳文中に変数を埋め込むことができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  interpolation: {
    prefix: '{{',
    suffix: '}}'
  }
});
```

このように、`interpolation`オプションを使用して、変数を埋め込むためのプレフィックスとサフィックスを定義することができます。

この例では、 `{ { ` と ` } } ` をプレフィックスとサフィックスとして定義しています。
このように、`interpolation`オプションを使用することで、翻訳文中に変数を埋め込むことができます。




##### skipInterpolation

false

translate関数がインターポレーションをスキップして、生の値を返すことを許可します



削除項目
simplifyPluralSuffix
(used in format < format v4)

true

will use 'plural' as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers



### Plugin options

option
default
description



##### detection

undefined

言語検出のオプション - ​ドキュメントを参照してください

https://www.i18next.com/overview/plugins-and-utils#language-detector



##### backend

undefined

バックエンドのオプション - ​ドキュメントを参照してください

https://www.i18next.com/overview/plugins-and-utils#backends



##### cache

undefined

バックエンドのキャッシュレイヤーのオプション - ​ドキュメントを参照してください

https://www.i18next.com/overview/plugins-and-utils#backends



### Others

option
default
description



##### initImmediate 即時初期化

true

init（）内のリソースロードをsetTimeout（デフォルトの非同期動作）でトリガーします。バックエンドが同期的にリソースをロードする場合は、これをfalseに設定します。
そのようにすると、init（）の後にi18next.t（）を呼び出すことができ、初期化コールバックに依存する必要がありません。
これは、i18next-fs-backendやi18next-sync-fs-backendなどの同期（ブロッキング）ロードバックエンドのみで機能します!

「initImmediate」は、i18nextで使用されるオプションの一つで、`init()`関数内の リソースロード を同期的に実行するか、非同期的に実行するかを指定するための機能です。
このオプションを使用することで、同期的にリソースをロードするバックエンドを使用する場合に、`init()`関数の後に`i18next.t()`関数を呼び出すことができます。

リソースロード
i18nextにおいては、翻訳データを含むJSONファイルなどのリソースを読み込むことです。

i18nextでは、異なる複数の場所から翻訳ファイルを読み込むことができます。
例えば、ファイルシステム、HTTPリクエスト、データベースなどから読み込むことができます。

また、複数の翻訳ファイルを一つにまとめることもできます。i18nextでは、`backend`オプションを使用して、異なるバックエンドプラグインを使用することができます。

例えば、`i18next - fs - backend`を使用してファイルシステムからJSONファイルを読み込むことができます。
また、`i18next - http - backend`を使用してHTTPリクエストを使用してJSONファイルを読み込むことができます。
これらのバックエンドプラグインを使用することで、異なる場所から翻訳ファイルを読み込むことができます。
そして、`i18next - merge - backend`を使用することで、複数の翻訳ファイルを一つにまとめることができます。



例えば、以下のように使用することができます。

```javascript
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

i18next
  .use(Backend)
  .init({
    initImmediate: true
  });

i18next.t('key');

```



このように、`initImmediate`オプションを使用して、`init()`関数内のリソースロードを同期的に実行するように設定することができます。

この例では、`i18next - fs - backend`を使用して同期的にリソースをロードするため、`initImmediate`オプションを`true`に設定しています。このように、`initImmediate`オプションを使用することで、同期的にリソースをロードするバックエンドを使用する場合に、`init()`関数の後に`i18next.t()`関数を呼び出すことができます。



##### keySeparator

'.'

キーを区切る文字。フラットなJSONで作業する場合は、これをfalseに設定することをお勧めします。



##### nsSeparator

':'

キーから名前空間を分割する文字



##### pluralSeparator

'_'

複数形のキーを分割する文字



##### contextSeparator

'_'

キーからコンテキストを分割する文字



##### ignoreJSONStructure

true

キーがネストされたキーとして見つからない場合、フラットキーとして検索しようとします

「ignoreJSONStructure」は、i18nextで使用されるオプションの一つで、翻訳データをJSON形式で定義する際に、ネストされたキーとして見つからない場合に、フラットキーとして検索するための機能を定義するためのオプションです。
このオプションを使用することで、翻訳データをより柔軟に扱うことができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  ignoreJSONStructure: true
});
```

このように、`ignoreJSONStructure`オプションを使用して、ネストされたキーとして見つからない場合に、フラットキーとして検索するように設定することができます。

この例では、`true`に設定しています。このように、`ignoreJSONStructure`オプションを使用することで、翻訳データをより柔軟に扱うことができます。





##### maxParallelReads

10

同時にバックエンドへの読み込みを制限し、同時に数千のソケットまたはファイルディスクリプタを開くことを防ぎます。これにより、ulimit -nが超過されるとEMFILEエラーが発生します（debug: trueを設定する必要があります）。並列性を制限すると、すべてのアイテムを読み込むのにかかる時間が、すべての読み込みが完了する前にすべての読み込みを開始するよりもかなり短くなります。

「maxParallelReads」は、i18nextで使用されるオプションの一つで、バックエンドからの読み込みを並列に行う際の最大数を指定するための機能です。このオプションを使用することで、バックエンドからの読み込みを効率的に行うことができます。

例えば、以下のように使用することができます。

```javascript
i18next.init({
  maxParallelReads: 10
});
```

このように、`maxParallelReads`オプションを使用して、バックエンドからの読み込みを並列に行う際の最大数を指定することができます。この例では、最大10個の読み込みを並列に行うように設定しています。このように、`maxParallelReads`オプションを使用することで、バックエンドからの読み込みを効率的に行うことができます。



### initImmediate

同期（ブロッキング）ロードを許可するバックエンドプラグインを使用する場合に、initImmediateを使用するサンプル。

「maxParallelReads」は、i18nextで使用されるオプションの一つで、バックエンドからの読み込みを並列に行う際の最大数を指定するための機能です。このオプションを使用することで、バックエンドからの読み込みを効率的に行うことができます。

この例では、`maxParallelReads`オプションを使用して、最大10個の読み込みを並列に行うように設定しています。しかし、この例では、バックエンドプラグインが同期（ブロッキング）ロードを許可しているため、`init()`関数が非同期で実行されるため、`t()`関数が呼び出された時点で翻訳データが読み込まれていないため、正しい値が返されません。

このような場合には、`initImmediate`オプションを使用することで、`init()`関数が同期的に実行されるようにすることができます。例えば、以下のように使用することができます。

```javascript
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

i18next
  .use(Backend)
  .init({
    maxParallelReads: 10,
    initImmediate: true
  });

i18next.t('key'); // -> 正しい値が返されます
```

このように、`initImmediate`オプションを使用することで、`init()`関数が同期的に実行されるようにすることができます。



```
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

// not working
i18next
  .use(Backend)
  .init();

i18next.t('key'); // -> will not return value as init was run async

/*
execution order of function calls
- init
- t
- loadResources (as called inside timeout)
*/

// working
i18next
  .use(Backend)
  .init({ initImmediate: false });

i18next.t('key'); // -> will return value

/*
execution order of function calls
- init
- loadResources (as called without timeout)
- t
*/

```



----------------------------------------

## Supported Frameworks

省略

このリストは公式には管理されていない。

ここにある情報はライブラリーのメンテナ自身が寄稿したものである。

問題や実装の詳細については、彼らのGitHubページを参照してください。

最後に、これらのライブラリの中には、予告なしに更新を停止するものもあれば、ページで警告するものもあります。

後者のシナリオでは、以下に非推奨とタグ付けされています。



----------------------------------------

# Plugins and Utils

### i18n formats

i18next形式（JSONベース）は、推奨されるソリューションであり、locize.comなどの翻訳管理ツールで広くサポートされていますが、以下のような別のエキサイティングな形式を好むことがあります。



name
format
description



##### i18next-fluent

fluent

i18nextを使用したmozillaのi18nFormatプラグイン

「i18next-fluent」は、i18nextで使用される翻訳フォーマットの一つで、Mozillaが開発したFluentという翻訳フォーマットを使用するためのプラグインです。Fluentは、i18nにおいてより柔軟な表現を可能にするために設計された翻訳フォーマットであり、i18next-fluentプラグインを使用することで、Fluent形式の翻訳データをi18nextで使用することができます。

「fluent」は、Mozillaが開発した翻訳フォーマットの名称です。Fluentは、i18nにおいてより柔軟な表現を可能にするために設計された翻訳フォーマットであり、i18next-fluentプラグインを使用することで、Fluent形式の翻訳データをi18nextで使用することができます。

「i18nFormatプラグイン」とは、i18nextで使用される翻訳フォーマットを拡張するためのプラグインのことです。i18nextには、デフォルトでJSON形式の翻訳ファイルを使用することができますが、i18nFormatプラグインを使用することで、異なる形式の翻訳ファイルを使用することができます。例えば、i18next-fluentプラグインを使用することで、Fluent形式の翻訳ファイルを使用することができます。





##### i18next-icu

ICU

i18next-icuは、i18nextで使用されるi18nFormatプラグインで、i18nextをベースにしたICU形式を使用します。


##### i18next-polyglot

polyglot

i18nextで使用するi18nFormatプラグイン



##### i18next-shopify

Shopify json format

Shopifyのjson形式を使用することで、開発者はShopifyで使用されている形式と同じ形式を使用してローカライズすることができます。

「i18next-shopify」は、i18nextで使用される翻訳フォーマットの一つで、Shopifyで使用されているJSON形式を使用するためのプラグインです。ShopifyのJSON形式を使用することで、開発者はShopifyで使用されている形式と同じ形式を使用してローカライズすることができます。i18next-shopifyプラグインを使用することで、ShopifyのJSON形式の翻訳データをi18nextで使用することができます。





### extraction tools

抽出ツールは、ソースコードから翻訳テキストを抽出するためのツールです。

コードに書いた翻訳部分を、抽出ツールを使用することで、翻訳テキストを手動で抽出する必要がなくなり、翻訳の効率を向上させることができます。



npm trends

https://npmtrends.com/babel-plugin-i18next-extract-vs-i18next-icu-vs-i18next-parser-vs-i18next-scanner-vs-i18next-scanner-webpack

一番人気
i18next-parser

その他
i18next-scanner
i18next-icu
babel-plugin-i18next-extract
i18next-scanner-webpack



#### i18next-scanner

Scan your code, extract translation keys/values, and merge them into i18n resource files.

`i18next-scanner`は、i18nextの翻訳ファイルを自動的に生成するためのツールです。

`i18next-parser`と同様に、JavaScript、TypeScript、React、Vueなどのファイルから翻訳テキストを抽出し、翻訳ファイルを生成することができます。
しかし、`i18next-scanner`は、より高度な機能を提供しています。

例えば、`i18next-scanner`は、翻訳テキストの自動翻訳や、翻訳ファイルのマージなどの機能を提供しています。


以下は、`i18next-scanner`を使用した例です。

1. `i18next-scanner`をインストールします。

```bash
npm install i18next-scanner --save-dev
```

2. `i18next-scanner`の設定ファイルを作成します。

```json
{
"input": ["src/**/*.{js,jsx,ts,tsx,vue}"],
"output": "./locales/{{lng}}/{{ns}}.json",
"keySeparator": false,
"nsSeparator": false,
"pluralSeparator": false,
"contextSeparator": false,
"defaultNamespace": "translation",
"locales": ["en", "ja"],
"fallbackLng": "en",
"resource": {
"loadPath": "locales/{{lng}}/{{ns}}.json",
"savePath": "locales/{{lng}}/{{ns}}.json",
"jsonIndent": 2,
"lineEnding": "\n"
},
"sort": true,
"func": {
"list": ["t", "i18next.t", "i18n.t"],
"extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
},
"trans": {
"component": "Trans",
"i18nKey": "i18nKey",
"defaultsKey": null,
"extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"],
"fallbackKey": false
},
"verbose": false,
"options": {
"func": {
"list": ["i18next.t", "i18n.t"],
"extensions": [".js", ".jsx"]
},
"trans": {
"component": "Trans",
"extensions": [".js", ".jsx"]
},
"lngs": ["en", "ja"],
"ns": ["translation"],
"defaultLng": "en",
"defaultNs": "translation",
"defaultValue": "",
"resource": {
"loadPath": "locales/{{lng}}/{{ns}}.json",
"savePath": "locales/{{lng}}/{{ns}}.json",
"jsonIndent": 2,
"lineEnding": "\n"
},
"removeUnusedKeys": true,
"keySeparator": false,
"nsSeparator": false,
"pluralSeparator": false,
"contextSeparator": false,
"keyAsDefaultValue": false,
"useKeysAsDefaultValue": false,
"reuseExistingTranslations": true,
"output": null,
"failOnWarnings": false,
"customValueTemplate": null,
"interpolation": {
"prefix": "{{",
"suffix": "}}"
},
"transKeepBasicHtmlNodesFor": ["br", "strong", "i"],
"transSupportBasicHtmlNodes": true,
"transKeepBasicNamepsaceKeys": false,
"transKeepCompleteKey": false,
"transKeepEmptyValues": false,
"transSplitDelimiter": "\\n",
"context": false,
"defaultValue": "",
"useKeysAsDefaultValue": false,
"nsSeparator": false,
"keySeparator": false,
"pluralSeparator": false,
"contextSeparator": false,
"transSupportBasicHtmlNodes": true,
"transKeepBasicHtmlNodesFor": ["br", "strong", "i"],
"transKeepBasicNamepsaceKeys": false,
"transKeepCompleteKey": false,
"transKeepEmptyValues": false,
"transSplitDelimiter": "\\n",
"escapeValue": false,
"partial": false,
"mark": "__",
"keepRemoved": false,
"keyAsDefaultValue": false,
"sort": false,
"func": {
"extensions": [".js", ".jsx"]
},
"trans": {
"extensions": [".js", ".jsx"]
}
}
}
```

この設定ファイルでは、以下のように設定を行っています。

- `input`: 翻訳テキストを抽出するファイルのパスを指定します。
- `output`: 翻訳ファイルの出力先を指定します。
- `locales`: 翻訳ファイルで使用する言語を指定します。
- `fallbackLng`: フォールバック言語を指定します。
- `resource`: 翻訳ファイルの読み込みと保存に関する設定を行います。
- `func`: 翻訳テキストを抽出するための関数名とファイル拡張子を指定します。
- `trans`: `Trans`コンポーネントで使用するプロパティ名を指定します。
- `options`: `i18next-scanner`のオプションを指定します。

3. `i18next-scanner`を実行します。

```bash
npx i18next-scanner
```

このコマンドを実行すると、指定したファイルから翻訳テキストが抽出され、翻訳ファイルが生成されます。

生成された翻訳ファイルは、指定した出力先に保存されます。

`i18next-scanner`は、`i18next-parser`と比較して高度な機能を提供しています。

しかし、設定ファイルの作成がより複雑になるため、初心者には扱いにくいかもしれません。



#### i18next-parser

A simple command line and gulp plugin that lets you parse your code and extract the translations keys in it.
※一番人気

`i18next-parser`

i18nextの翻訳ファイルを自動的に生成するためのツールです。



このツールを使用することで、i18nextの翻訳ファイルを手動で作成する必要がなくなります。

`i18next-parser`は、JavaScript、TypeScript、React、Vueなどのファイルから翻訳テキストを抽出し、翻訳ファイルを生成することができます。

また、`i18next-parser`は、複数の言語に対応しており、翻訳ファイルを自動的に生成することができます。

以下は、`i18next-parser`を使用した例です。

1. `i18next-parser`をインストールします。

```bash
npm install i18next-parser --save-dev
```

2. `i18next-parser`の設定ファイルを作成します。

```json
{
"input": ["src/**/*.{js,jsx,ts,tsx,vue}"],
"output": "./locales/{{lng}}/{{ns}}.json",
"keySeparator": false,
"nsSeparator": false,
"pluralSeparator": false,
"contextSeparator": false,
"defaultNamespace": "translation",
"locales": ["en", "ja"],
"fallbackLng": "en",
"resource": {
"loadPath": "locales/{{lng}}/{{ns}}.json",
"savePath": "locales/{{lng}}/{{ns}}.json",
"jsonIndent": 2,
"lineEnding": "\n"
},
"sort": true,
"func": {
"list": ["t", "i18next.t", "i18n.t"],
"extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
},
"trans": {
"component": "Trans",
"i18nKey": "i18nKey",
"defaultsKey": null,
"extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"],
"fallbackKey": false
},
"verbose": false
}
```

この設定ファイルでは、以下のように設定を行っています。

- `input`: 翻訳テキストを抽出するファイルのパスを指定します。
- `output`: 翻訳ファイルの出力先を指定します。
- `locales`: 翻訳ファイルで使用する言語を指定します。
- `fallbackLng`: フォールバック言語を指定します。
- `resource`: 翻訳ファイルの読み込みと保存に関する設定を行います。
- `func`: 翻訳テキストを抽出するための関数名とファイル拡張子を指定します。
- `trans`: `Trans`コンポーネントで使用するプロパティ名を指定します。

3. `i18next-parser`を実行します。

```bash
npx i18next-parser
```

このコマンドを実行すると、指定したファイルから翻訳テキストが抽出され、翻訳ファイルが生成されます。

生成された翻訳ファイルは、指定した出力先に保存されます。

#### babel-plugin-i18next-extract

A babel plugin that can extract keys in JSONv4 format.

日本語で開発しつつ、いつでも多言語対応できる環境を react-i18next で維持する - Qiita

https://qiita.com/suzukalight/items/54860fdda35e6ce983d9

コード中に翻訳部分をキーで書いておけば
後で翻訳ファイルにjson登録を自動で登録してくれる機能

これでコード中にキーを書いておけば
翻訳ファイルのjsonに登録し忘れても
自動で登録してくれます。



#### translation-check

UIに翻訳の概要を表示します。どのキーがまだ翻訳されていないかチェックできます。


----------------------------------------

### utils

util
type
description



##### i18next-gettext-converter

converter

gettextの.moまたは.poをi18nextのJSON形式に変換します。その逆も可能です。

`i18next-gettext-converter`は、gettextの.moまたは.poファイルをi18nextのJSON形式に変換するためのコンバーターです。
また、i18nextのJSON形式をgettextの.moまたは.poファイルに変換することもできます。

このコンバーターを使用することで、gettext形式で翻訳されたアプリケーションをi18next形式に変換することができます。

また、i18next形式で翻訳されたアプリケーションをgettext形式に変換することもできます。
これにより、異なる形式で翻訳されたアプリケーションを相互に変換することができます。



##### csv2i18nxet

converter

Convert CSV files to JSON & YAML for i18next.js

csv2i18nextは、CSVファイルをi18next.jsで使用されるJSONやYAML形式に変換するためのコンバーターです。

このコンバーターを使用することで、CSVファイルに含まれる翻訳データをi18next.jsで使用される形式に変換することができます。

また、変換されたJSONやYAML形式のファイルをi18next.jsで使用することで、多言語対応のアプリケーションを開発することができます。



##### i18next-json-csv-converter

converter

Convert between CSV files and JSON format for i18next

`i18next-json-csv-converter`は、CSVファイルとi18nextのJSON形式のファイルを相互に変換するためのコンバーターです。



このコンバーターを使用することで、CSVファイルに含まれる翻訳データをi18nextのJSON形式に変換することができます。

また、i18nextのJSON形式のファイルをCSVファイルに変換することもできます。

これにより、異なる形式で翻訳されたアプリケーションを相互に変換することができます。



##### resx2i18next

converter

Convert ResX-files to json resources compatible with i18next

`resx2i18next`は、ResXファイルをi18nextで使用されるJSON形式のリソースに変換するためのコンバーターです。

このコンバーターを使用することで、ResXファイルに含まれる翻訳データをi18nextで使用される形式に変換することができます。
また、変換されたJSON形式のリソースをi18nextで使用することで、多言語対応のアプリケーションを開発することができます。



##### i18nextResourceGenerator

extractor

Intellij IDEA Plugin for i18next resource generation

`i18nextResourceGenerator`は、IntelliJIDEA用のプラグインで、i18nextのリソースを自動的に生成するための抽出ツールです。

このプラグインを使用することで、アプリケーションのソースコードからi18nextのリソースを抽出し、JSON形式のファイルとして出力することができます。

また、抽出されたリソースを編集することもできます。

このプラグインを使用することで、i18nextのリソースを手動で作成する手間を省くことができます。

##### aurelia-i18next-parser

extractor

Extracts i18n keys and values from source files.

`aurelia - i18next - parser`は、Aureliaフレームワークで使用されるi18nextのキーと値をソースファイルから抽出するための抽出ツールです。

このツールを使用することで、Aureliaアプリケーションのソースコードからi18nextのキーと値を抽出し、JSON形式のファイルとして出力することができます。

また、抽出されたキーと値を編集することもできます。

このツールを使用することで、i18nextのキーと値を手動で作成する手間を省くことができます。



##### grunt-i18next

bundler

bundle language resource files for i18next

`grunt - i18next`は、Gruntタスクランナー用のプラグインで、i18nextの言語リソースファイルをバンドルするためのツールです。



このプラグインを使用することで、複数の言語リソースファイルを1つのファイルにまとめることができます。
また、バンドルされたファイルを圧縮することもできます。
このプラグインを使用することで、i18nextの言語リソースファイルを効率的に管理することができます。



##### i18next-gettext-loader

bundler

Webpackビルド中にgettext POファイルをi18next JSON形式に変換する

POファイルは、GNUgettextの翻訳メッセージカタログの一種で、多言語対応のアプリケーションで使用されるテキスト翻訳ファイルの一種です。

POファイルには、翻訳されたテキストメッセージと、それらのメッセージのオリジナルのテキストメッセージが含まれています。

POファイルは、翻訳者が翻訳するためのテキストメッセージを提供し、アプリケーションが異なる言語に翻訳されたテキストメッセージを表示するために使用されます。

POファイルは、テキストエディターで編集することができます。



##### i18next-po-loader

bundler

webpackでgettext POファイルをi18next形式として直接ロードする



##### i18next-loader

bundler

webpackローダーで、コードを翻訳し、各言語ごとにバンドルを生成できます。


##### @alienfast/i18next-loader

bundler

このwebpackローダーは、i18nextに必要なリソース構造を生成します。この構造は、ビルド時にクライアントバンドルと一緒にwebpackされるため、HTTPリクエストを介して言語リソースを読み込む必要がありません。



##### vite-plugin-i18next-loader

bundler

Viteプラグインは、1つから多数のライブラリにまたがる1つから多数のjson/yamlファイルから構成されるi18nextロケールをクライアントバンドルするためのものです。ゼロ構成HMRサポートが含まれています。


`vite-plugin-i18next-loader`は、Viteビルドツール用のプラグインで、i18nextのロケールをクライアントバンドルするためのツールです。

このプラグインを使用することで、複数のJSON/YAMLファイルから構成されるi18nextのロケールを1つのファイルにまとめることができます。

また、HMR（HotModuleReplacement）をサポートしており、ロケールファイルの変更を検知して自動的に更新することができます。

このプラグインを使用することで、i18nextのロケールを効率的に管理することができます。



##### webpack i18next-resource-store-loader

bundler

このローダーは、i18nextがHTTPリクエストを介して言語リソースを読み込むことなく、必要なresStore構成を生成します。この構成は、ディレクトリを指定して生成されます。

`webpacki18next-resource-store-loader`は、Webpackビルドツール用のローダーで、i18nextの言語リソースをHTTPリクエストを介して読み込むことなく、resStore構成を生成するためのツールです。

このローダーを使用することで、言語リソースを含むディレクトリを指定するだけで、i18nextのresStore構成を自動的に生成することができます。

また、生成されたresStore構成をWebpackのバンドルに含めることで、アプリケーションの初期ロード時間を短縮することができます。



##### ya-i18next-webpack-plugin

bundler

また別のi18next webpackプラグインです。このプラグインは、Webpackの解析フェーズからキーを収集し、指定されたパスに不足している翻訳を保存し、翻訳ファイルをコピーします。

`ya - i18next - webpack - plugin`は、Webpackビルドツール用のプラグインで、Webpackの解析フェーズからキーを収集し、指定されたパスに不足している翻訳を保存し、翻訳ファイルをコピーするためのツールです。

このプラグインを使用することで、Webpackの解析フェーズからi18nextのキーを収集し、翻訳が不足している場合は指定されたパスに保存することができます。
また、翻訳ファイルをコピーすることもできます。

このプラグインを使用することで、i18nextの翻訳を効率的に管理することができます。



##### rollup-plugin-i18next-conv

bundler/converter

rollupで.poファイルをインポートする



##### i18next-static-analysis

util

静的にコードを分析して、i18nextへの呼び出しを見つけ、サポートされているすべての言語でそれらを検証します

`i18next-static-analysis`は、i18nextの呼び出しを静的に解析し、サポートされているすべての言語に対して検証するためのユーティリティです。

このユーティリティを使用することで、アプリケーションのソースコードからi18nextの呼び出しを検出し、サポートされている言語に対して検証することができます。

また、検証に失敗した場合は、エラーメッセージを出力することができます。

このユーティリティを使用することで、i18nextの呼び出しを正しく使用することができます。



##### i18next-json-sync

util

i18nextのJSONリソースファイルをソース言語ファイルと同期させる

`i18next-json-sync`は、i18nextのJSONリソースファイルをソース言語ファイルと同期させるためのユーティリティです。

このユーティリティを使用することで、ソース言語ファイルが変更された場合に、i18nextのJSONリソースファイルを自動的に更新することができます。

また、JSONリソースファイルが変更された場合に、ソース言語ファイルを自動的に更新することもできます。

このユーティリティを使用することで、i18nextのJSONリソースファイルを手動で更新する手間を省くことができます。



##### i18next-locales-sync

util

i18nextのロケールリソースファイルをプライマリ言語に同期させます。ネームスペース、複数形、キーのソートなどをサポートしています。

`i18next-locales-sync`は、i18nextのロケールリソースファイルをプライマリ言語に同期させるためのユーティリティです。

このユーティリティを使用することで、プライマリ言語のリソースファイルが変更された場合に、i18nextのロケールリソースファイルを自動的に更新することができます。

また、ネームスペース、複数形、キーのソートなどをサポートしています。

このユーティリティを使用することで、i18nextのロケールリソースファイルを手動で更新する手間を省くことができます。



##### eslint-plugin-i18next

util

表示されるテキストがすべて翻訳されていることを確認します

`eslint-plugin-i18next`は、i18nextを使用しているアプリケーションで、すべての表示されるテキストが翻訳されていることを確認するためのESLintプラグインです。

このプラグインを使用することで、翻訳されていないテキストがある場合に、エラーメッセージを出力することができます。

また、翻訳されていないテキストを自動的に翻訳することもできます。

このプラグインを使用することで、i18nextを正しく使用し、翻訳されていないテキストを防止することができます。



##### i18next support for JetBrains IDEs

IDE integration

ナビゲーション、コード補完、ハイライト



##### i18next-hmr

bundler / DX

クライアントとサーバーの両方で翻訳リソースをリロードできるHMR webpackプラグイン

`i18next-hmr`は、Webpackビルドツール用のHMRプラグインで、クライアントとサーバーの両方で翻訳リソースをリロードすることができます。

このプラグインを使用することで、翻訳リソースが変更された場合に、クライアントとサーバーの両方で自動的にリロードすることができます。

また、このプラグインは、WebpackのHMR機能を使用して、翻訳リソースの変更を検知して自動的に更新することができます。

このプラグインを使用することで、翻訳リソースの変更を効率的に管理することができます。

HMR（HotModuleReplacement）
アプリケーションの実行中に、変更されたモジュールを自動的に更新する機能です。

HMRを使用することで、アプリケーションの再起動を行わずに、変更を反映することができます。

Webpackなどのビルドツールでは、HMRをサポートしており、ファイルの変更を検知して自動的に更新することができます。

i18nextの場合、HMRを使用することで、翻訳リソースの変更を検知して自動的に更新することができます。



##### translation-check

util / DX

翻訳の概要をUIで表示します。 まだ翻訳されていないキーを確認してください。

`translation-check`は、i18nextの翻訳をUIで表示し、どのキーがまだ翻訳されていないかを確認するためのユーティリティです。

このユーティリティを使用することで、i18nextの翻訳を視覚的に確認し、どのキーがまだ翻訳されていないかを確認することができます。

また、このユーティリティは、翻訳が不足しているキーを自動的に検出し、エラーメッセージを出力することができます。

このユーティリティを使用することで、i18nextの翻訳を効率的に管理することができます。



##### i18next-v4-format-converter

converter

CLIまたはプログラムで、旧i18next翻訳リソースを新しい形に変換します。


##### i18next-v4-format-converter-web

online-converter

ブラウザで古いi18next翻訳リソースを新しい形式に変換します。



##### Intellij idea i18next support plugin

Intellij idea i18next support plugin.



##### i18next-ts-loader

bundler / DX

ES6モジュールでロケールファイルを取得するWebpackローダー。オートコンプリート、タイプチェック、HMR、コンテンツベースのハッシュをサポートする。



`i18next-ts-loader`は、Webpackビルドツール用のローダーで、ES6モジュールを使用してロケールファイルを取得することができます。

このローダーは、自動補完、型チェック、HMR、コンテンツベースのハッシュなどをサポートしています。

このローダーを使用することで、i18nextのロケールファイルを効率的に管理することができます。

また、ES6モジュールを使用することで、モジュールのインポートとエクスポートを簡単に行うことができます。



### services

i18nextフォーマット（複数形の処理など）を完全にサポートし、i18nextの開発をスポンサーまたは貢献していることが知られているサービス。

name
description

##### locize​​

locizeは、i18nextを使用してローカライズプロセスを解決するローカライズサービスです。



### backend extenders

backend
description



##### chained backend

複数の既存のバックエンドを組み合わせて、フォールバックとキャッシュのシナリオを実現します。



##### i18next-multiload-backend-adapter​​

他のバックエンドのmultiload動作を有効にします。1つのリクエストで複数のlng-nsの組み合わせをロードする。この動作はi18next >=v11.0.0から削除されましたが、このアダプターを使用することで再び有効にすることができます。



### backends

backend
description



##### localstorage backend

これはブラウザで使用するためのi18nextキャッシュレイヤーです。localStorageからリソースをロードしてキャッシュします。チェーンバックエンドと組み合わせて使用することができます。



##### async storage backend

これは、react nativeで使用するためのi18nextキャッシュレイヤーです。AsyncStorageからリソースをロードしてキャッシュします。チェーンバックエンドと組み合わせて使用することができます。



##### filesystem

Node.jsで使用されるi18nextのバックエンドレイヤーと、Denoで使用されるバックエンドレイヤーです。ファイルシステムから翻訳をロードします。
チェーンバックエンドと組み合わせて使用することもできます。つまり、チェーンバックエンドとhttpバックエンドまたはlocizeバックエンドを組み合わせて使用することができます。



##### http backend

node.js、ブラウザー、およびDenoで使用されるi18nextのバックエンドレイヤー（xhrまたはfetchを使用します）



##### xhr backend

i18nextのバックエンドレイヤーで、ブラウザのxhrを使用します。



##### fetch backend

i18nextを使用するためのバックエンドレイヤー。ブラウザのfetchを使用します。



##### fluent backend

fluent構文の.ftlファイルをxhr経由でロードするバックエンド



##### key ondemand

リクエストに応じてキーを取得する



##### mongodb backend

MongoDBから翻訳をロードするためにNode.jsとDenoで使用されるi18nextのバックエンドレイヤー。



##### Firesotre backend

Node.jsとDenoで使用されるi18nextのバックエンドレイヤー。GoogleのFirestore DBから翻訳をロードします。



##### nodejs filesystem

node.jsバックエンドレイヤーは、ファイルシステムからリソースをロードするためにfsモジュールを使用してi18nextを使用します。


##### nodejs filesystem(electron)

i18next用node.jsバックエンド、fsモジュールを使用してelectronアプリのリソースをファイルシステムから安全にロードする。



##### nodejs remote

node.jsバックエンドレイヤーは、i18nextを使用してリソースを別のサーバーからロードするためにrequestモジュールを使用します。



##### nodejs couchbase

i18nextを使用してcouchbaseからリソースをロードするためのi18next node.jsバックエンドレイヤー



##### Zanata nodejs backend

Zanata nodejsバックエンドレイヤーは、Zanataのためのi18next node.jsバックエンドレイヤーです。



##### i18next-firebase-backend

i18nextを使用したFirebaseバックエンド



##### i18next-smart-bucket-backend​​

smart-bucket用のi18nextバックエンド


##### locize backend

locize.com - ローカライズサービスのバックエンドレイヤー


##### service backend

外部サービスのバックエンドレイヤー（spacetranslate.com -Simple Translation Service at Scaleやlocize.com -localization as a serviceなど）


##### locize nodejs backend

locize.com -ローカライゼーションサービスのバックエンドレイヤー


##### service node backend

外部サービスのバックエンドレイヤー（spacetranslate.com -Simple Translation Service at Scaleやlocize.com -localization as a serviceなど）


##### webpack import backend

webpackのコード分割を使用して、ファイルをjavascriptバンドルとしてロードします


##### Transifex backend

i18next backend for Transifex Native

「Transifex backend」は、i18nextで使用される翻訳フォーマットの一つで、Transifex Nativeという翻訳管理ツールを使用するためのプラグインです。
Transifex Nativeは、翻訳管理ツールであり、i18next backend for Transifex Nativeプラグインを使用することで、Transifex Nativeで管理されている翻訳データをi18nextで使用することができます。
このプラグインを使用することで、翻訳データの管理をTransifex Nativeに任せることができ、開発者は翻訳データの更新や管理に時間をかけることなく、アプリケーションのローカライズに集中することができます。



### language detector

language detector
description



##### universal (browser + nodejs)

ブラウザとサーバーの両方で動作する言語検出器 - Next.jsなどのユニバーサルフレームワークで使用することを想定しています。



##### browser

i18nextのブラウザ環境で使用される言語検出器



##### http

"any" httpバックエンド用の言語検出機能、およびDeno用の言語検出機能



##### nodejs koa

Koaフレームワーク用のi18next言語検出プラグイン。



##### react native localization settings

ネイティブのアプリごとの言語APIを使用して、システムの言語設定の変更を可能にするReact Native用の言語検出機能



##### react native

language detector for React Native.



##### react native Async Storage

React Nativeの言語検出機能。ユーザーの選択をAsync Storageに保存し、永続化に使用します。



##### electron

language detector for electron apps.



##### CLI

language detector for CLI.



### post processors

「post processors」は、i18nextで使用される翻訳フォーマットを拡張するための機能の一つで、翻訳されたテキストを加工するためのプラグインです。

i18nextでは、翻訳されたテキストを加工するために、sprintf post processorというプラグインが提供されています。

sprintf post processorは、sprintf関数を使用して、翻訳されたテキストに変数を埋め込むことができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

sprintf post processorを使用することで、以下のように変数を埋め込むことができます。

```javascript
i18next.t('welcome', { name: 'John' }); // "Welcome, John!"

```



post processor
description



##### sprintf post processor

sprintf post processor for i18next.

「sprintf post processor」は、i18nextで使用される翻訳フォーマットを拡張するためのプラグインの一つで、sprintf関数を使用して、翻訳されたテキストに変数を埋め込むことができます。
i18nextでは、sprintf post processorが提供されており、以下のような翻訳キーを使用することができます。

```json
{
  "welcome": "Welcome, %s!"
}
```

sprintf post processorを使用することで、以下のように変数を埋め込むことができます。

```javascript
i18next.t('welcome', 'John'); // "Welcome, John!"
```

このように、sprintf post processorを使用することで、翻訳されたテキストに変数を簡単に埋め込むことができます。



##### interval plurals

// interval based plurals like. "One Item", "A few items", "A lot of items"
// 1アイテム、数アイテム、多くのアイテム

「interval plurals」とは、数量に応じて複数形を変化させる際に、数値の範囲に応じて複数形を変化させる方法のことを指します。
例えば、「1個のアイテム」、「数個のアイテム」、「たくさんのアイテム」といったように、数値の範囲に応じて複数形を変化させる場合に使用されます。i18nextでは、interval pluralsをサポートしており、以下のような翻訳キーを使用することができます。

```json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items",
  "items_interval": [
    {
      "min": 0,
      "max": 1,
      "singular": "1 item",
      "plural": "{{count}} items"
    },
    {
      "min": 2,
      "max": 10,
      "singular": "{{count}} items",
      "plural": "{{count}} items"
    },
    {
      "min": 11,
      "max": 100,
      "singular": "{{count}} items",
      "plural": "{{count}} items"
    }
  ]
}
```

上記の例では、"items"というキーに対して、"items_plural"という複数形のキーと、"items_interval"というinterval pluralsを定義しています。"items_interval"には、数値の範囲に応じた複数形の定義が含まれており、"min"と"max"で範囲を指定し、"singular"と"plural"で単数形と複数形を指定しています。このように、interval pluralsを使用することで、数値の範囲に応じた複数形を簡単に定義することができます。



##### i18next-react-postprocessor

「i18next-react-postprocessor」は、i18nextで使用される翻訳フォーマットを拡張するためのプラグインの一つで、React要素をi18nextの翻訳文字列に埋め込むことができます。
React要素を翻訳文字列に埋め込むことで、翻訳されたテキストに動的なコンテンツを含めることができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

i18next-react-postprocessorを使用することで、以下のようにReact要素を埋め込むことができます。

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function Welcome({ name }) {
  const { t } = useTranslation();
  return <div>{t('welcome', { name: <strong>{name}</strong> })}</div>;
}
```

このように、i18next-react-postprocessorを使用することで、翻訳されたテキストに動的なコンテンツを含めることができます。




##### i18next-korean-postposition-processor

i18next post-processor for processing korean postposition

「i18next-korean-postposition-processor」は、i18nextで使用される翻訳フォーマットを拡張するためのプラグインの一つで、韓国語の助詞を処理するためのプラグインです。韓国語には、名詞の後ろに付く助詞が多数存在し、その助詞によって名詞の意味が変化するため、翻訳においては助詞の処理が重要となります。i18next-korean-postposition-processorを使用することで、翻訳されたテキストに含まれる韓国語の名詞に対して、適切な助詞を自動的に付与することができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "환영합니다, {{name}}님"
}
```

i18next-korean-postposition-processorを使用することで、以下のように適切な助詞を自動的に付与することができます。

```javascript
i18next.t('welcome', { name: '홍길동' }); // "환영합니다, 홍길동님"
```

このように、i18next-korean-postposition-processorを使用することで、韓国語の翻訳において助詞の処理を簡単に行うことができます。



##### i18next-pseude

「i18next-pseudolocalize」は、i18nextで使用される翻訳フォーマットを拡張するためのプラグインの一つで、疑似ローカライズを行うためのプラグインです。

疑似ローカライズとは、
テキストをローカライズする前に、ローカライズ後のテキストの長さや形式を確認するために使用される手法です。
i18next-pseudolocalizeを使用することで、疑似ローカライズを簡単に行うことができます。

例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

i18next-pseudolocalizeを使用することで、以下のように疑似ローカライズを行うことができます。

```javascript
i18next.use(pseudolocalize).t('welcome', { name: 'John' }); // "Wēłçømē, {{ñåmē}}!"
```

このように、i18next-pseudolocalizeを使用することで、疑似ローカライズを簡単に行うことができます。



##### i18next-emoji-postprocessor

「i18next-emoji-postprocessor」は、i18nextで使用される翻訳フォーマットを拡張するためのプラグインの一つで、全ての単語を絵文字に置き換えるためのプラグインです。
i18next-emoji-postprocessorを使用することで、翻訳されたテキストに含まれる全ての単語を絵文字に置き換えることができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

i18next-emoji-postprocessorを使用することで、以下のように全ての単語を絵文字に置き換えることができます。

```javascript
i18next.use(emojiPostProcessor).t('welcome', { name: 'John' }); // "👋, 🌍!"
```

このように、i18next-emoji-postprocessorを使用することで、翻訳されたテキストに含まれる全ての単語を絵文字に置き換えることができます。



### loggers

統合コンソールロガーのみが現在利用可能です。



### Create your own plugin

https://www.i18next.com/misc/creating-own-plugins


----------------------------------------

# For Enterprises

省略




----------------------------------------

# First setup help

何が必要なのかを考えてみましょう。

* どの環境のための国際化ソリューションをお探しですか？

  * サーバーレス環境（AWS lambda、Google Cloud Functions、Azure Functionsなど）のための特別な処理。

* あなたの環境のための言語検出器が必要ですか？

* 翻訳をアプリにバンドルしますか？

* http経由でアプリとは別に翻訳をロードしたいですか？

* 優れた翻訳管理システムで翻訳を管理したいですか？



## For which environment are you looking for an i18n solution?

どの環境のための国際化ソリューションをお探しですか？

クライアント、サーバー、ブラウザ、React、モバイル、デスクトップ、Node.js、Deno...。

適切なライブラリはたくさんあります。このリストを見てください。

https://www.i18next.com/overview/supported-frameworks



### Special handling for serverless environments (AWS lambda, Google Cloud Functions, Azure Functions, etc...)

サーバーレス環境のための特別な処理

i18next-fs-backend を使用する

```
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const backend = new Backend({
  // path where resources get loaded from
  loadPath: '/locales/{{lng}}/{{ns}}.json'
});

i18next
  .use(backend)
  .init({
    // initImmediate: false, // setting initImediate to false, will load the resources synchronously
    ...opts,
    ...yourOptions
  }); // yourOptions should not include backendOptions!

```

または、ファイルを直接インポート/要求する

```
import i18next from 'i18next';
import en from './locales/en.json'
import de from './locales/de.json'

i18next
  .init({
    ...opts,
    ...yourOptions,
    resources: {
      en,
      de
    }
  });
```



### Do you need a language detector for your environment?

あなたの環境に言語検出器が必要ですか？

* ブラウザ向けの例: i18next-browser-languageDetector
* HTTPサーバー向けの例 (express、Fastifyなど): i18next-http-middleware
* その他のプラグインがここにあります



### Do you want to bundle the translations with your app?

アプリと一緒に翻訳をバンドルしますか？

* 初期化時に翻訳を追加できます
* 初期化後に翻訳を追加できます
* サーバーサイドでは、ファイルシステムから翻訳を読み込むことができます



### Do you want to load the translations separate from your app via http?

アプリとは別に、HTTP経由で翻訳をロードしますか？

* 自分自身のエンドポイントから提供する場合: i18next-http-backend
* 翻訳管理システムのプロフェッショナルCDNから提供する場合: i18next-locize-backend
* その他のバックエンドの可能性がたくさんあります



### Do you want to manage your translations with an awesome translation management system?

優れた翻訳管理システムで翻訳を管理したいですか？



----------------------------------------

# TypeScript

i18n i18next ドキュメント TypeScript

TypeScript - i18next documentation
https://www.i18next.com/overview/typescript
ja:

i18nextには、型定義が組み込まれています。

IDEのエクスペリエンスを向上させ、エラー（型変換など）を防止するために、以下の手順に従って、t関数を完全にタイプセーフにすることができます。

型安全(キーと戻り値型)

1
これはオプションの機能であり、プロジェクトのサイズに応じてコンパイル時間に影響を与える場合があります。

このセクションを無視して、タイプの強化を行わないこともできます。



2
tsconfigのcompilerOptionsにstrictフラグまたはstrictNullChecksをtrueに設定してください。

TypeScript v5 を使用することをお勧めします。



3
プロジェクトが複数のi18nextインスタンスにまたがって異なる翻訳リソースを持っている場合、タイプセーフな翻訳を使用することはできません。

ここでは、TypeScriptをi18nextに最適に使用する方法についての簡単なガイドをご覧いただけます。



タイプセーフ翻訳をマスターし、正確なローカリゼーションを実現し、ランタイムエラーを排除することで、TypeScriptアプリケーションでi18nextの可能性を最大限に引き出す方法をご覧ください。



### Create a declaration file

宣言ファイルの作成

i18next用のTypeScript定義は、
TypeAugmentation
と
MergingInterfaces
を使用して拡張することができます。



そのため、最初のステップとして、
例えば宣言ファイル（i18next.d.ts）を作成してみます。



```i18next.d.ts
// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns1 from "locales/en/ns1.json";
import ns2 from "locales/en/ns2.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ns1";
    // custom resources type
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
    // other
  }
}

```

あるいは、すべての名前空間を一度に含めたい場合は、私たちが推奨する方法を使うこともできる：


```i18n.ts
export const defaultNS = "ns1";
export const resources = {
  en: {
    ns1,
    ns2,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["ns1", "ns2"],
  defaultNS,
  resources,
});

```

```i18next.d.ts
import { resources, defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}

```

srcの下かその上に@typesディレクトリを作り、そこにすべての型宣言を置くことをお勧めする。

例えば
src/@types/i18next.d.ts

### Some examples

リポジトリ

various examples (from simple i18next only to react-i18next prod ready)

react-i18next

next-i18next

next-13-app-dir-i18next-example-ts

react-i18next-example-app-ts



### Custom Type Options

カスタム型オプション

i18next用のTypeScriptを改善するためのオプションをいくつか提供しています。



すべてのオプションはデフォルト値で提供されており、

変更したい場合は、i18next型宣言ファイル(i18next.d.ts)の
CustomTypeOptionsインターフェイスの下に追加するだけです。



defaultNS

'translation'

デフォルトの名前空間。

これはReactアプリケーションではより実用的です。

名前空間を渡さずにuseTranslation()フックを呼び出すと、翻訳名前空間の型を推測します。



resources

object

初期化するリソース。

これは、適切なキーと戻り値の型を推測するために使用される、最も重要なオプションです。



fallbackNS

false

指定した名前空間で見つからない場合にキーを検索する名前空間の文字列または配列。

NS フォールバックのドキュメントを参照ください。



Fallback - i18next documentation

https://www.i18next.com/principles/fallback



keySeparator

'.'

Char to separate keys.



nsSeparator

':'

Char to split namespace from key

「nsSeparator」は、i18nextで使用されるオプションの一つで、翻訳キーの名前空間とキー名を区別するために使用される区切り文字を指定するために使用されます。デフォルトでは、コロン（:）が使用されます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "common": {
    "greeting": "Hello, world!"
  }
}
```

i18nextでは、デフォルトのnsSeparatorであるコロンを使用して、名前空間とキー名を区別します。例えば、以下のようにして、名前空間とキー名を指定することができます。

```json
{
  "common:greeting": "Hello, world!"
}

```

このように、nsSeparatorを使用することで、翻訳キーの名前空間とキー名を区別する際に、区切り文字を変更することができます。



pluralSeparator

'_'

Char to split namespace from key

「pluralSeparator」は、i18nextで使用されるオプションの一つで、複数形の形式を表現するために使用されるキーにおいて、単数形と複数形の区切り文字を指定するために使用されます。

デフォルトでは、アンダースコア（_）が使用されます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "apples": {
    "one": "1 apple",
    "other": "{{count}} apples"
  }
}
```

i18nextでは、デフォルトのpluralSeparatorであるアンダースコアを使用して、単数形と複数形のキーを区別します。

例えば、以下のようにして、単数形と複数形のキーを指定することができます。

```json
{
  "apples_one": "1 apple",
  "apples_other": "{{count}} apples"
}
```

このように、pluralSeparatorを使用することで、複数形のキーを指定する際に、キー名の区切り文字を変更することができます。



returnNull

true

Allows null values as valid translation.

「returnNull」は、i18nextで使用されるオプションの一つで、翻訳がnullである場合に、nullを有効な翻訳として扱うかどうかを指定するために使用されます。
デフォルトでは、falseに設定されており、nullは有効な翻訳として扱われません。しかし、returnNullをtrueに設定することで、nullを有効な翻訳として扱うことができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": null
}
```

i18nextでは、デフォルトではnullは有効な翻訳として扱われません。しかし、以下のようにして、returnNullをtrueに設定することで、nullを有効な翻訳として扱うことができます。

```javascript
i18next.init({
  returnNull: true,
  resources: {
    en: {
      translation: {
        "welcome": null
      }
    }
  }
});

i18next.t('welcome'); // null
```

このように、returnNullを使用することで、nullを有効な翻訳として扱うことができます。






returnObjects

false

Allows objects as valid translation result

通常翻訳は文字列で書きます、しかしオブジェクトを翻訳として使用することもできます。

「returnObjects」は、i18nextで使用されるオプションの一つで、翻訳がオブジェクトである場合に、オブジェクトを有効な翻訳として扱うかどうかを指定するために使用されます。

デフォルトでは、falseに設定されており、オブジェクトは有効な翻訳として扱われません。しかし、returnObjectsをtrueに設定することで、オブジェクトを有効な翻訳として扱うことができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": {
    "message": "Hello, world!",
    "author": "John"
  }
}
```

i18nextでは、デフォルトではオブジェクトは有効な翻訳として扱われません。
しかし、以下のようにして、returnObjectsをtrueに設定することで、オブジェクトを有効な翻訳として扱うことができます。

```javascript
i18next.init({
  returnObjects: true,
  resources: {
    en: {
      translation: {
        "welcome": {
          "message": "Hello, world!",
          "author": "John"
        }
      }
    }
  }
});

i18next.t('welcome'); // { message: "Hello, world!", author: "John" }
```

このように、returnObjectsを使用することで、オブジェクトを有効な翻訳として扱うことができます。






jsonFormat

'v4'

Jsonフォーマット・バージョン - V4では、接尾辞に複数形が使用できます。

複数形については↓こちらをご覧ください。

https://www.i18next.com/translation-function/plurals



allowObjectInHTMLChildren

false

HTML要素にオブジェクトを受け取れるようにするフラグ。

これは、オブジェクトをHTML要素に渡して、それぞれの 変数埋め込み値 に置き換えるようなReactアプリケーションでのみ有用です（主にTransコンポーネントで使用します）。

「allowObjectInHTMLChildren」は、i18nextで使用されるオプションの一つで、HTML要素にオブジェクトを受け取れるようにするかどうかを指定するために使用されます。
デフォルトでは、falseに設定されており、HTML要素にオブジェクトを受け取ることはできません。しかし、allowObjectInHTMLChildrenをtrueに設定することで、HTML要素にオブジェクトを受け取ることができます。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": {
    "message": "Hello, <strong>{{name}}</strong>!",
    "name": {
      "first": "John",
      "last": "Doe"
    }
  }
}
```

i18nextでは、以下のようにして、allowObjectInHTMLChildrenをtrueに設定することで、HTML要素にオブジェクトを受け取ることができます。

```javascript
i18next.init({
  allowObjectInHTMLChildren: true,
  resources: {
    en: {
      translation: {
        "welcome": {
          "message": "Hello, <strong>{{name.first}} {{name.last}}</strong>!",
          "name": {
            "first": "John",
            "last": "Doe"
          }
        }
      }
    }
  }
});

i18next.t('welcome.message', { name: { first: 'John', last: 'Doe' } }); // "Hello, <strong>John Doe</strong>!"
```

このように、allowObjectInHTMLChildrenを使用することで、HTML要素にオブジェクトを受け取ることができます。







interpolationPrefix

'{{'

Prefix for interpolation

interpolationSuffix

'}}'

Suffix for interpolation


「interpolationPrefix」と「interpolationSuffix」は、i18nextで使用されるオプションの一つで、翻訳文字列内で変数を置換するために使用されるプレフィックスとサフィックスを指定するために使用されます。

デフォルトでは、プレフィックスは「{{」、サフィックスは「}}」に設定されています。例えば、以下のような翻訳キーがあった場合、

```json
{
  "welcome": "Hello, {{name}}!"
}
```

i18nextでは、プレフィックスとサフィックスを使用して、変数を置換することができます。例えば、以下のようにして、プレフィックスとサフィックスを指定して、変数を置換することができます。

```javascript
i18next.init({
  interpolation: {
    prefix: '{{',
    suffix: '}}'
  },
  resources: {
    en: {
      translation: {
        "welcome": "Hello, {{name}}!"
      }
    }
  }
});

i18next.t('welcome', { name: 'John' }); // "Hello, John!"
```

このように、interpolationPrefixとinterpolationSuffixを使用することで、翻訳文字列内で変数を置換するためのプレフィックスとサフィックスを指定することができます。





### Troubleshooting

#### Not working interpolation values

インテリセンスが機能しない

使用しているTypeScriptのバージョンを更新してみてください。



#### Not working interpolation values

変数埋め込み値 が機能しない

t関数は 変数埋め込み値 を推論しますが、翻訳ファイル(リソース)がtsファイルに配置され、as const(このように)またはd.tsファイルのインターフェイス(このように生成できます)を使用している場合にのみ機能します。

JSONファイルはオブジェクトを型リテラルに変換するas constをサポートしていません(まだ)。



#### Slow compilation time

コンパイルに時間がかかる

v23.0.0以降、この問題は発生しなくなった。

t関数を完全にタイプするために、プライマリ・ロケール・ファイルやオブジェクトからすべてのネストしたキーを再帰的にマップしています。
プロジェクトのキーの数によっては、コンパイルに時間がかかることがあります。
これが生産性に悪影響を及ぼすようであれば、この機能は最適な選択ではないかもしれません。
必要であれば、いつでもGithubでissueを発行して、私たちから助けを得ることができます。




#### Type error - template literal

タイプエラー - テンプレート・リテラル

この問題に直面したら
string'型の引数は、...型のパラメータに代入できません。

このエラーは、テンプレートリテラル内で式を使用した場合に発生することがあります。この場合、TypeScriptは式の型を正しく解釈できず、エラーを発生させます。この問題を解決するには、式の型を明示的に指定する必要があります。

例えば、以下のようなコードがあった場合、

```typescript
const name = 'John';
const message = `Hello, ${name}!`;

function showMessage(msg: string) {
  console.log(msg);
}

showMessage(message);
```

このコードでは、テンプレートリテラルを使用して、変数「name」を含む文字列を作成しています。しかし、関数「showMessage」に渡す際に、TypeScriptはエラーを発生させます。

この問題を解決するには、式の型を明示的に指定する必要があります。例えば、以下のように、式の型を「string」に明示的に指定することができます。

```typescript
const name = 'John';
const message = `Hello, ${name}!` as string;

function showMessage(msg: string) {
  console.log(msg);
}

showMessage(message);
```

このように、式の型を明示的に指定することで、エラーを回避することができます。





以下の方法（式付きテンプレート・リテラル）を使用する場合：


```
// with i18next
i18next.t(`${expression}.title`);

// with react-i18next
const { t } = useTranslation();
t(`${expression}.title`);

```

```
// with react-i18next
const { t } = useTranslation(`${ns}Default`);

```



TypeScriptはリテラル値を失い、キーを文字列として推測してしまう。

この場合、次のようにテンプレート文字列をconstとしてアサートする必要があります。


```
// with i18next
i18next.t(`${expression}.title` as const);

// with react-i18next
const { t } = useTranslation();
t(`${expression}.title` as const);

```


今のところ、これが唯一の回避策です。

これはTypeScriptの制限であり、将来のある時点で対処される予定です。




#### Type error - excessively deep and possibly infinite

型エラー - 深すぎて無限に続く可能性がある

t関数を呼び出すたびにこの問題に直面する場合は、次のようになります。


TS2589: TS2589: Type Instantiation is excessively deep and possibly infinite.


おそらく型宣言を正しく設定していないことを意味するので、設定を見直してください。

必要であれば、いつでもGithubでissueを発行して、私たちから助けを得ることができます。



#### Tagged Template Literal (react-i18next only)

タグ付きテンプレートリテラル（react-i18nextのみ）

「Tagged Template Literal (react-i18next only)」は、react-i18nextで使用されるタグ付きテンプレートリテラル構文に関する情報です。この構文を使用する場合、以下のようになります。

```javascript
t`key1.key2`;

```

しかし、TemplateStringsArrayはまだジェネリック型を受け付けないため、キーと戻り値の型推論は機能しません。そのため、引数として任意の文字列を受け入れます。

このように、Tagged Template Literal構文を使用することで、i18nextのt関数をより簡潔に記述することができます。ただし、型推論が機能しないため、型情報を明示的に指定する必要がある場合があります。

TemplateStringsArray はまだジェネリック型を受け付けないので、キーと戻り値の型推論は機能しません。

タグ付きテンプレート・リテラル構文を使用することはできますが、引数として任意の文字列を受け入れます。











#### Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz

DefaultTFuncReturn'型の引数はxyz型のパラメータに代入できません。

※これはv23.0.0から必要なくなりました。

t関数はnullを返すことができます、この動作はデフォルトで設定されています、変更したい場合は、returnNull型をfalseに設定してください。



```
// i18next.d.ts
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    ...
  }
}

```

また、i18nextのコンフィギュレーションをアップデートして、適切な動作をするようにすることをお勧めします。

```
i18next.init({
  returnNull: false,
  // ...
});

```

----------------------------------------

# TRANSLATION FUNCTION

# Essentials i18nextの基礎情報

必要なもの

ここは i18next を使用する上で、基本的な情報をまとめたセクションです。。



### Accessing keys

resources with 2 keys:

```
{
    "key": "value of key",
    "look": {
        "deep": "value of look deep"
    }
}

```

i18nextでは、翻訳リソースがオブジェクトである場合、ドット記法を使用してオブジェクトのプロパティにアクセスすることができます。

例えば、以下のような翻訳リソースがあった場合、

```json
{
  "key": "value of key",
  "look": {
    "deep": "value of look deep"
  }
}
```

i18nextでは、以下のようにして、ドット記法を使用してオブジェクトのプロパティにアクセスすることができます。

```javascript
i18next.t('key'); // "value of key"
i18next.t('look.deep'); // "value of look deep"
```

このように、i18nextでは、ドット記法を使用してオブジェクトのプロパティにアクセスすることができます。





### Passing a default value

デフォルト値を渡す

翻訳でキーが見つからなかった場合のために、デフォルト値を渡すことができます：

```
i18next.t('key', 'default value to show');

```


「Passing a default value」は、i18nextで翻訳キーが見つからなかった場合に、デフォルト値を表示する方法に関する情報です。この場合、以下のようにして、デフォルト値を渡すことができます。

```javascript
i18next.t('key', 'default value to show');
```

このように、i18nextでは、翻訳キーが見つからなかった場合に、デフォルト値を表示することができます。
また、saveMissing機能を使用している場合、defaultValueは選択したバックエンドにも渡されます。例えば、以下のようなReact.jsの例があります。

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  const handleClick = () => {
    t('missing_key', 'default value to show');
  };

  return (
    <button onClick={handleClick}>
      {t('button_label')}
    </button>
  );
}
```

このように、i18nextでは、翻訳キーが見つからなかった場合に、デフォルト値を表示することができます。



aveMissing機能を使用している場合、このReact.jsの例にあるように、選択したバックエンドにdefaultValueを渡します。



### Accessing keys in different namespaces

異なる名前空間のキーへのアクセス

Namespaces are a feature in i18next internationalization framework which allows you to separate translations that get loaded into multiple files.

名前空間はi18next国際化フレームワークの機能で、複数のファイルに読み込まれる翻訳を分離できます。



「Accessing keys in different namespaces」は、i18nextで異なる名前空間のキーにアクセスする方法に関する情報です。
名前空間は、i18nextの国際化フレームワークの機能で、複数のファイルに読み込まれる翻訳を分離することができます。

例えば、以下のような翻訳リソースがあった場合、

```json
{
  "common": {
    "key1": "value of key1 in common namespace",
    "key2": "value of key2 in common namespace"
  },
  "moduleA": {
    "key1": "value of key1 in moduleA namespace",
    "key2": "value of key2 in moduleA namespace"
  }
}
```

i18nextでは、以下のようにして、異なる名前空間のキーにアクセスすることができます。

```javascript
i18next.t('common:key1'); // "value of key1 in common namespace"
i18next.t('moduleA:key1'); // "value of key1 in moduleA namespace"
```

このように、i18nextでは、名前空間を使用して、異なるファイルに分割された翻訳リソースを分離することができます。そして、ドット記法を使用して、異なる名前空間のキーにアクセスすることができます。





初期化

```
i18next.init({
ns: ['common', 'moduleA'],
defaultNS: 'moduleA'
});

```

```moduleA.json
{
"name": "Module A"
}

```

```common.json
{
"button": {
"save": "save"
}
}

```

```
i18next.t('name');
// -> "Module A"

// from different namespace (not recommended with namespace prefix when used in combination with natural language keys)
i18next.t('common:button.save') // -> "save"
// better use the ns option:
i18next.t('button.save', { ns: 'common' }) // -> "save"

```


### Multiple fallback keys

複数のフォールバックキー

i18nextでは、t関数にキーの配列を渡すことで、動的なキーに特定の値以外のフォールバック値を与えて翻訳することができます。例えば、エラーコードが表示され、場合によっては特定の警告を表示したい場合に使用することができます。また、キーの配列でt関数を呼び出すことで、特定のキー以外のフォールバック値を提供する動的キーを翻訳することができます。


「Multiple fallback keys」は、i18nextで複数のフォールバックキーを使用する方法に関する情報です。
t関数にキーの配列を渡すことで、動的なキーを翻訳し、特定のフォールバック値を提供することができます。

例えば、以下のような翻訳リソースがあった場合、

```json
{
  "error": {
    "code1": "Error message for code1",
    "code2": "Error message for code2"
  },
  "warning": {
    "code1": "Warning message for code1",
    "code2": "Warning message for code2"
  }
}
```

i18nextでは、以下のようにして、複数のフォールバックキーを使用することができます。

```javascript
i18next.t(['warning:code1', 'error:code1', 'error:code2'], { defaultValue: 'Default message' });
```

このように、i18nextでは、t関数にキーの配列を渡すことで、複数のフォールバックキーを使用することができます。
また、defaultValueオプションを使用することで、特定のフォールバック値を提供することができます。

複数のフォールバックキーを使用するのは
i18nextでt関数に複数のキーを渡すことで、翻訳が見つからなかった場合に複数のフォールバックキーを使用することができるという意味です。
つまり、最初に指定したキーが見つからなかった場合に、次のキーを順番に探し、最後に指定したキーが見つからなかった場合には、デフォルト値を表示することができます。
このように、複数のフォールバックキーを使用することで、翻訳が見つからなかった場合に、より適切なフォールバック値を提供することができます。

サンプルとして、エラーコードが表示され、特定の警告を表示したい場合を考えてみましょう：

keys

```
{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}
```



例

```
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "Something went wrong"

```


### Overview options

オプションの概要

```
i18next.t(key, options)

```



option
description



##### defaultValue

「defaultValue」は、i18nextで翻訳が見つからなかった場合に返すデフォルト値を指定するオプションです。

このオプションを使用することで、翻訳が見つからなかった場合に、デフォルト値を表示することができます。
また、複数形のデフォルト値を定義することもできます。複数形のデフォルト値を定義する場合は、defaultValue_other -> _suffixのように、_suffixには同じ複数形ルールが適用されます。



##### count

count value used for plurals

「count」は、i18nextで複数形を扱う際に使用する数値を指定するオプションです。

複数形を扱う場合、翻訳リソースには複数形のキーが含まれており、それぞれに対応する翻訳が定義されています。
このとき、数値に応じて適切な複数形の翻訳を選択するために、countオプションを使用します。

countオプションには、数値を指定します。例えば、以下のようにして、countオプションを使用して、複数形の翻訳を取得することができます。

```javascript
i18next.t('key', { count: 2 });
```

このように、countオプションを使用することで、数値に応じた複数形の翻訳を取得することができます。



##### context

used for contexts (eg. male / female)

「context」は、i18nextでコンテキストを扱う際に使用するオプションです。
コンテキストを使用する場合、翻訳リソースには同じキーが複数存在し、それぞれに対応する異なる翻訳が定義されています。

例えば、男性用と女性用の翻訳を分ける場合などが挙げられます。

このとき、contextオプションを使用して、適切な翻訳を取得することができます。
contextオプションには、コンテキストを表す文字列を指定します。
例えば、以下のようにして、contextオプションを使用して、コンテキストに応じた翻訳を取得することができます。

```javascript
i18next.t('key', { context: 'male' });

```

このように、contextオプションを使用することで、コンテキストに応じた翻訳を取得することができます。



##### replace

翻訳リソース内の変数を置き換えるオブジェクト - またはオプションに直接入れる

「replace」は、i18nextで変数を使用する際に、オブジェクトを変数に置き換える方法に関する情報です。
i18nextでは、翻訳リソース内に変数を含めることができます。
変数を含める場合、翻訳リソース内に変数名を含め、t関数の第二引数に変数を渡すことで、変数を翻訳に含めることができます。

例えば、以下のような翻訳リソースがあった場合、


```json
{
  "greeting": "Hello, {{name}}!"
}

```



i18nextでは、以下のようにして、オブジェクトを変数に置き換えることができます。

```javascript
const name = 'John';
i18next.t('greeting', { name });

```



また、オブジェクトを直接オプションに渡すこともできます。例えば、以下のようにして、オブジェクトを直接オプションに渡すことができます。



```javascript
i18next.t('greeting', { name: 'John' });

```



このように、i18nextでは、オブジェクトを変数に置き換えることができます。また、オブジェクトを直接オプションに渡すこともできます。






##### lng

「lng」は、i18nextで使用する言語をオーバーライドするためのオプションです。
i18nextでは、デフォルトでブラウザの言語設定を使用して言語を決定しますが、lngオプションを使用することで、明示的に言語を指定することができます。
lngオプションには、言語コードを指定します。例えば、以下のようにして、lngオプションを使用して、言語をオーバーライドすることができます。

```javascript
i18next.init({
  lng: 'ja',
  resources: {
    ja: {
      translation: {
        'hello': 'こんにちは'
      }
    }
  }
});

i18next.t('hello'); // 'こんにちは'
```

このように、lngオプションを使用することで、言語をオーバーライドすることができます。



##### lngs

override languages to use

「lngs」は、i18nextで使用する言語を複数指定するためのオプションです。
i18nextでは、デフォルトでブラウザの言語設定を使用して言語を決定しますが、lngsオプションを使用することで、複数の言語を指定することができます。

lngsオプションには、言語コードの配列を指定します。
例えば、以下のようにして、lngsオプションを使用して、複数の言語を指定することができます。

```javascript
i18next.init({
  lngs: ['en', 'ja'],
  resources: {
    en: {
      translation: {
        'hello': 'Hello'
      }
    },
    ja: {
      translation: {
        'hello': 'こんにちは'
      }
    }
  }
});

i18next.t('hello'); // 'Hello' (if browser language is not 'ja')

```

このように、lngsオプションを使用することで、複数の言語を指定することができます。i18nextは、指定された言語の順番に従って、最初に見つかった翻訳を使用します。



##### fallbackLng

翻訳が見つからなかった場合に、代替の言語を使用するためのオプションです。詳細については、fallbacksを参照してください。

「fallbackLng」は、i18nextで翻訳が見つからなかった場合に、代替の言語を使用するためのオプションです。
i18nextでは、翻訳リソースに翻訳が見つからなかった場合、デフォルトで同じ言語のデフォルト値を使用します。

しかし、fallbackLngオプションを使用することで、翻訳が見つからなかった場合に、代替の言語を使用することができます。
fallbackLngオプションには、言語コードを指定します。

例えば、以下のようにして、fallbackLngオプションを使用して、代替の言語を指定することができます。



```javascript
i18next.init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'hello': 'Hello'
      }
    },
    ja: {
      translation: {
        'hello': 'こんにちは'
      }
    }
  }
});

i18next.t('hello'); // 'Hello' (if 'hello' is not defined in 'ja')

```



このコードでは、i18nextがまず「ja」の翻訳リソースを探し、もし「hello」の翻訳が見つからなかった場合は、fallbackLngオプションで指定された「en」の翻訳リソースを探します。もし「hello」の翻訳が「ja」の翻訳リソースにも「en」の翻訳リソースにも見つからなかった場合は、i18nextは「hello」というキー自体を返します。

つまり、このコードでは、日本語の翻訳が見つからなかった場合には、英語の翻訳を使用するようになっています。



##### ns

override namespaces (string or array)

「ns」は、i18nextで使用する翻訳リソースの名前空間をオーバーライドするためのオプションです。
i18nextでは、翻訳リソースを名前空間に分けることができます。

名前空間を使用することで、翻訳リソースをより構造化し、管理しやすくすることができます。
nsオプションを使用することで、明示的に使用する名前空間を指定することができます。
nsオプションには、名前空間の名前を文字列または配列で指定します。

例えば、以下のようにして、nsオプションを使用して、名前空間をオーバーライドすることができます。

```javascript
i18next.init({
  ns: ['common', 'special'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {
        'hello': 'Hello'
      },
      special: {
        'welcome': 'Welcome to the special page!'
      }
    }
  }
});

i18next.t('hello'); // 'Hello'
i18next.t('welcome', { ns: 'special' }); // 'Welcome to the special page!'
```

このように、nsオプションを使用することで、明示的に使用する名前空間を指定することができます。また、defaultNSオプションを使用することで、デフォルトの名前空間を指定することができます。



##### keySeparator

override char to separate keys

「keySeparator」は、i18nextで翻訳リソース内のキーを区切るための文字をオーバーライドするためのオプションです。
i18nextでは、翻訳リソース内のキーを「.」で区切ることがデフォルトで設定されていますが、keySeparatorオプションを使用することで、キーを区切るための文字を変更することができます。
keySeparatorオプションには、区切り文字を指定します。

例えば、以下のようにして、keySeparatorオプションを使用して、キーを区切るための文字を変更することができます。

```javascript
i18next.init({
  keySeparator: '/',
  resources: {
    en: {
      translation: {
        'greeting/hello': 'Hello'
      }
    }
  }
});

i18next.t('greeting/hello'); // 'Hello'
```

このように、keySeparatorオプションを使用することで、翻訳リソース内のキーを区切るための文字を変更することができます。



##### nsSeparator

「nsSeparator」は、i18nextで名前空間とキーを区切るための文字をオーバーライドするためのオプションです。
i18nextでは、名前空間とキーを区切るために「:」を使用することがデフォルトで設定されていますが、nsSeparatorオプションを使用することで、名前空間とキーを区切るための文字を変更することができます。
nsSeparatorオプションには、区切り文字を指定します。

例えば、以下のようにして、nsSeparatorオプションを使用して、名前空間とキーを区切るための文字を変更することができます。

```javascript
i18next.init({
  nsSeparator: '/',
  resources: {
    en: {
      common: {
        'greeting/hello': 'Hello'
      }
    }
  }
});

i18next.t('common/greeting/hello'); // 'Hello'

```

このように、nsSeparatorオプションを使用することで、名前空間とキーを区切るための文字を変更することができます。



##### returnObjects

accessing an object not a translation string (can be set globally too)

「returnObjects」は、i18nextで翻訳リソースのオブジェクトを直接取得するためのオプションです。

i18nextでは、通常、i18next.t()メソッドを使用して、翻訳リソース内のキーに対応する翻訳文字列を取得します。
しかし、returnObjectsオプションを使用することで、翻訳リソース内のオブジェクトを直接取得することができます。returnObjectsオプションには、trueまたはfalseを指定します。
trueを指定すると、オブジェクトを取得できます。

例えば、以下のようにして、returnObjectsオプションを使用して、翻訳リソース内のオブジェクトを取得することができます。



```javascript
i18next.init({
  returnObjects: true,
  resources: {
    en: {
      translation: {
        greeting: {
          hello: 'Hello',
          goodbye: 'Goodbye'
        }
      }
    }
  }
});



i18next.t('greeting'); // { hello: 'Hello', goodbye: 'Goodbye' }

```



このように、returnObjectsオプションを使用することで、翻訳リソース内のオブジェクトを直接取得することができます。



##### returnDetails

「returnDetails」は、i18nextで使用する言語、名前空間、キー、値に関する情報を含むオブジェクトを返すためのオプションです。
i18nextでは、通常、i18next.t()メソッドを使用して、翻訳リソース内のキーに対応する翻訳文字列を取得します。
しかし、returnDetailsオプションを使用することで、使用された言語、名前空間、キー、値に関する情報を含むオブジェクトを取得することができます。
returnDetailsオプションには、trueまたはfalseを指定します。trueを指定すると、オブジェクトを取得できます。

例えば、以下のようにして、returnDetailsオプションを使用して、情報を含むオブジェクトを取得することができます。

```javascript
i18next.init({
  returnDetails: true,
  resources: {
    en: {
      translation: {
        greeting: {
          hello: 'Hello',
          goodbye: 'Goodbye'
        }
      }
    }
  }
});

i18next.t('greeting.hello'); // { usedKey: 'greeting.hello', usedLng: 'en', usedNS: 'translation', usedValue: 'Hello' }
```

このように、returnDetailsオプションを使用することで、使用された言語、名前空間、キー、値に関する情報を含むオブジェクトを取得することができます。



##### joinArrays

配列を結合する文字（グローバルに設定することもできます）の書き換え。

「joinArrays」は、i18nextで配列を文字列に変換する際に使用する区切り文字を指定するためのオプションです。
i18nextでは、翻訳リソース内の配列を文字列に変換する際に、デフォルトで「, 」が使用されます。
しかし、joinArraysオプションを使用することで、配列を文字列に変換する際に使用する区切り文字を指定することができます。
joinArraysオプションには、区切り文字を指定します。

例えば、以下のようにして、joinArraysオプションを使用して、配列を文字列に変換する際に使用する区切り文字を変更することができます。

```javascript
i18next.init({
  joinArrays: '\n',
  resources: {
    en: {
      translation: {
        fruits: ['apple', 'banana', 'orange']
      }
    }
  }
});

i18next.t('fruits'); // 'apple\nbanana\norange'

```

このように、joinArraysオプションを使用することで、配列を文字列に変換する際に使用する区切り文字を指定することができます。



##### postProcess

postProcessは、i18nextで翻訳文字列を後処理するためのオプションです。

「postProcess」は、i18nextで翻訳文字列を後処理するためのオプションです。
i18nextでは、翻訳リソース内のキーに対応する翻訳文字列を取得する際に、postProcessオプションで指定された後処理を適用することができます。
postProcessオプションには、後処理を行う関数または関数の配列を指定します。

例えば、以下のようにして、postProcessオプションを使用して、翻訳文字列を後処理することができます。

```javascript
i18next.init({
  postProcess: [
    (value, key, options) => {
      return value.toUpperCase();
    }
  ],
  resources: {
    en: {
      translation: {
        greeting: 'Hello'
      }
    }
  }
});

i18next.t('greeting'); // 'HELLO'

```

このように、postProcessオプションを使用することで、翻訳文字列を後処理することができます。
後処理関数は、翻訳文字列、キー、オプションを引数に取り、変換された文字列を返します。



##### interpolation

「interpolation」は、i18nextで変数を翻訳文字列に埋め込むためのオプションです。
i18nextでは、翻訳リソース内のキーに対応する翻訳文字列内に変数を埋め込むことができます。
デフォルトでは、変数は「{{変数名}}」のような形式で埋め込まれます。しかし、interpolationオプションを使用することで、変数の埋め込み形式を変更することができます。
interpolationオプションには、変数の開始文字列と終了文字列を指定するオブジェクトを渡します。

例えば、以下のようにして、interpolationオプションを使用して、変数の埋め込み形式を変更することができます。

```javascript
i18next.init({
  interpolation: {
    prefix: '%{',
    suffix: '}'
  },
  resources: {
    en: {
      translation: {
        greeting: 'Hello, %{name}!'
      }
    }
  }
});

i18next.t('greeting', { name: 'John' }); // 'Hello, John!'

```

このように、interpolationオプションを使用することで、変数の埋め込み形式を変更することができます。
prefixオプションには、変数の開始文字列を、suffixオプションには、変数の終了文字列を指定します。



##### skipInterpolation

「skipInterpolation」は、i18nextで変数の埋め込みやネストをスキップするためのオプションです。
i18nextでは、翻訳リソース内のキーに対応する翻訳文字列内に変数を埋め込むことができます。
しかし、skipInterpolationオプションを使用することで、特定のt関数呼び出しで変数の埋め込みやネストをスキップすることができます。

skipInterpolationオプションには、trueまたはfalseを指定します。
trueを指定すると、変数の埋め込みやネストをスキップすることができます。

例えば、以下のようにして、skipInterpolationオプションを使用して、特定のt関数呼び出しで変数の埋め込みやネストをスキップすることができます。

```javascript
i18next.init({
  resources: {
    en: {
      translation: {
        greeting: 'Hello, {{name}}!'
      }
    }
  }
});

i18next.t('greeting', { name: '<strong>John</strong>' }); // 'Hello, <strong>John</strong>!'
i18next.t('greeting', { name: '<strong>John</strong>' }, { skipInterpolation: true }); // 'Hello, {{name}}!'

```

このように、skipInterpolationオプションを使用することで、特定のt関数呼び出しで変数の埋め込みやネストをスキップすることができます。



##### ignoreJSONStructure

キーがネストキーとして見つからなかった場合、フラットキーとして検索を試みます

「ignoreJSONStructure」は、i18nextで翻訳リソースの構造を無視して、フラットなキーで翻訳文字列を取得するためのオプションです。
i18nextでは、翻訳リソースをツリー構造で管理することができます。
しかし、ignoreJSONStructureオプションを使用することで、翻訳リソースの構造を無視して、フラットなキーで翻訳文字列を取得することができます。

ignoreJSONStructureオプションには、trueまたはfalseを指定します。
trueを指定すると、翻訳リソースの構造を無視して、フラットなキーで翻訳文字列を取得することができます。

例えば、以下のようにして、ignoreJSONStructureオプションを使用して、フラットなキーで翻訳文字列を取得することができます。

```javascript
i18next.init({
  ignoreJSONStructure: true,
  resources: {
    en: {
      translation: {
        'greeting.hello': 'Hello',
        'greeting.goodbye': 'Goodbye',
        'message': 'This is a message'
      }
    }
  }
});

i18next.t('greeting.hello'); // 'Hello'
i18next.t('message'); // 'This is a message'

```



単純に文字列で検索することができます。

また、falseにすると

```
i18next.t('greeting.hello'); // undefined

```

このように翻訳文が取得できません。



ignoreJSONStructureオプションを使用することで、翻訳リソースの構造を無視して、フラットなキーで翻訳文字列を取得することができます。



----------------------------------------

# Interpolation

変数埋め込み
補間

Interpolationとは、i18nextで翻訳する際に、動的な値を翻訳文字列に埋め込むことができる機能です。

例えば、あなたが「こんにちは、{{name}}さん」という翻訳文字列を持っている場合、{{name}}の部分に実際の名前を埋め込むことができます。
これにより、翻訳文字列をより柔軟に、動的に変更することができます。
Interpolationは、i18nextで非常によく使われる機能の一つです。

デフォルトでは、i18nextでの変数の埋め込みによるXSS攻撃を防ぐために、変数の値がエスケープされます。

XSS攻撃とは、Webサイトに悪意のあるスクリプトを挿入することで、ユーザーの情報を盗むなどの攻撃を行うことができる脆弱性のことです。i18nextでは、変数の値がエスケープされることで、XSS攻撃を防ぐことができます。


↓このビデオをチェックしてください。

i18next Crash Course | the JavaScript i18n framework - YouTube

https://www.youtube.com/watch?v=SA_9i4TtxLQ&t=433s


あなたにとって提供される変数埋め込み機能が合わない場合は、sprintfサポートされた 変数埋め込み のために i18next-sprintf-postProcessor を使用することができます。



### Basic

基礎

変数埋め込み は、I18Nで最も使用される機能の一つです。



Keys

デフォルトでは、キーは文字列で囲まれます。

Sample

```
{
    "key": "{{what}} is {{how}}"
}

```

↓

```
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"

```



### Working with data models

You can also pass entire data models as a value for interpolation.

「Working with data models」とは、i18nextでの変数の埋め込みにおいて、単一の値だけでなく、データモデル全体を変数の値として渡すことができるという意味です。

これにより、複数の値を一度に変数に埋め込むことができ、より複雑な翻訳を行うことができます。
データモデルを変数の値として渡す場合は、オブジェクトを変数の値として渡し、翻訳文字列内でドット記法を使用してオブジェクトのプロパティを参照することができます。

例えば、以下のようにして、データモデルを変数の値として渡すことができます。

```javascript
const user = {
  name: 'John',
  age: 30
};

i18next.t('greeting', { user }); // 'Hello John, you are 30 years old.'

```

この例では、`user`というオブジェクトを変数の値として渡しています。
そして、翻訳文字列内で、`user`オブジェクトの`name`と`age`プロパティをドット記法を使用して参照しています。
これにより、複数の動的な値を含むより複雑な翻訳を作成することができます。


Keys

```
{
    "key": "I am {{author.name}}"
}

```

例

```
const author = {
name: 'Jan',
github: 'jamuhl'
};
i18next.t('key', { author });
// -> "I am Jan"

```


### Unescape

「Unescape」とは、i18nextでの変数の埋め込みにおいて、デフォルトでは変数の値がエスケープされるため、XSS攻撃を防ぐことができます。
しかし、エスケープされた値を使用する必要がない場合は、エスケープを無効にすることができます。

エスケープを無効にするには、キーの前に「-」を付けます。
もしくは、
翻訳をリクエストする際にescapeValueオプションをfalseに設定します。
これにより、エスケープされていない値を使用することができます。

Keys

```
{
    "keyEscaped": "no danger {{myVar}}",
    "keyUnescaped": "dangerous {{- myVar}}"
}

```

例

```
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"
i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"
i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)

```

警告: エスケープを無効にする場合は、ユーザー入力を自分でエスケープしてください！



### Additional options

変数埋め込み のプレフィックス/サフィックスなどのオプションは、
initオプションで上書きするか、
もしくは
t関数に追加オプションを渡すことで上書きします。



```
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});

```



option
default
description



##### escape

function

escape function function escape(str) { return str; }

GitHub Copilot: 以下は、修正後の文章です。

`escape`は、i18nextでの変数の埋め込みにおいて、デフォルトで変数の値がエスケープされるため、XSS攻撃を防ぐことができます。
しかし、エスケープを無効にすることもできます。
`escape`関数は、エスケープを無効にするために使用されます。
デフォルトでは、`escape`関数は引数に渡された文字列をそのまま返します。
つまり、エスケープを無効にすることができます。
`escape`関数を使用するには、i18nextのオプションで`escapeValue`を`false`に設定します。



##### escapeValue

true

`escapeValue`は、i18nextのオプションの一つです。

デフォルトでは`true`に設定されています
これは、i18nextでの変数の埋め込みにおいて、変数の値がエスケープされることを意味します。
これにより、XSS攻撃を防ぐことができます。

`escapeValue`を`false`に設定することで、エスケープを無効にします。
エスケープを無効にした場合は、XSS攻撃に対するセキュリティ上のリスクがあるため、注意が必要です。



##### useRawValueToEscape

false

`useRawValueToEscape`は、i18nextのオプションの一つで、デフォルトでは`false`に設定されています。

このオプションが`true`に設定されている場合、エスケープ関数に渡される値が文字列にキャストされず、カスタムエスケープ関数を使用する場合に便利です。
カスタムエスケープ関数を使用する場合、エスケープ関数内で値の型チェックを行う必要があるため、値を文字列にキャストする必要がありません。


##### prefix

"{{"

prefix for interpolation



##### suffix

"}}"

suffix for interpolation

オプションはたくさんありますが、デフォルトのままで十分です。



### All interpolation options

全ての変数を埋め込むオプション

option
default
description



##### format

noop function

`format`は、i18nextのオプションの一つで、デフォルトでは`noop`関数に設定されています。
`format`関数を使用すると、翻訳文字列内で変数をフォーマットすることができます。
フォーマット関数には、変数の値をフォーマットするためのカスタム関数を指定することができます。

`noop`関数
`noop`関数は、i18nextのオプションの一つで、何もしない空の関数です。
`format`オプションにカスタムフォーマット関数を指定しない場合、`noop`関数が使用されます。
`noop`関数は、フォーマット関数を指定しない場合に、エラーが発生しないようにするために使用されます。



##### formatSeparator

","

`formatSeparator`は、i18nextのオプションの一つで、デフォルトでは `, ` に設定されています。

例えば、以下のような翻訳文字列がある場合、`formatSeparator`オプションを使用して変数の値を区切ることができます。

```
"welcome": "Welcome, {{name}}! You have {{count}} messages."

```

以下は、`formatSeparator`オプションを` -`に変更した場合の例です。
区切り文字を変えてみると、以下のようになります。

変更後:

```
"welcome": "Welcome- {{name}}! You have {{count}} messages."

```

このように、`formatSeparator`オプションを変更することで、変数の値を区切る文字を変更することができます。
日付や数値や文字列に対して見やすくなるように使います。




##### escape

function

escape function function escape(str) { return str; }

`escape`は、i18nextでの変数の埋め込みにおいて、デフォルトで変数の値がエスケープされるため、XSS攻撃を防ぐことができます。
しかし、エスケープを無効にすることができます。
`escape`関数は、エスケープを無効にするために使用されます。

デフォルトでは、`escape`関数は引数に渡された文字列をそのまま返します。
つまり、エスケープを無効にすることができます。`escape`関数を使用するには、i18nextのオプションで`escapeValue`を`false`に設定する必要があります。

ただし、カスタムエスケープ関数を使用する場合は、`escape`関数をカスタマイズすることができます。`escape`関数をカスタマイズするには、`i18next.init`メソッドの`escape`オプションにカスタムエスケープ関数を指定する必要があります。
カスタムエスケープ関数は、引数に渡された文字列をエスケープした結果を返す必要があります。



##### escapeValue

true

escape passed in values to avoid XSS injection

`escapeValue`は、i18nextのオプションの一つで、デフォルトでは`true`に設定されています。
このオプションが`true`に設定されている場合、変数の値がエスケープされ、XSS攻撃を防ぐことができます。

ただし、エスケープを無効にすることもできます。`escape`関数を使用することで、エスケープを無効にすることができます。
`escape`関数を使用するには、i18nextのオプションで`escapeValue`を`false`に設定する必要があります。

また、カスタムエスケープ関数を使用する場合は、`escape`関数をカスタマイズすることができます。

`escape`関数をカスタマイズするには、`i18next.init`メソッドの`escape`オプションにカスタムエスケープ関数を指定する必要があります。
カスタムエスケープ関数は、引数に渡された文字列をエスケープした結果を返す必要があります。



##### useRawValueToEscape

false

i18nextのuseRawValueToEscapeは、翻訳された文字列の HTML エスケープ処理を無効にするオプションです。デフォルトでは、i18nextは翻訳された文字列を HTML エスケープ処理します。これは、翻訳された文字列に HTML タグやその他の特殊文字が含まれている場合に、安全に表示するために必要です。

しかし、一部のケースでは、翻訳された文字列の HTML エスケープ処理を無効にしたい場合があります。例えば、翻訳された文字列が HTML タグを生成するコンポーネントに使用される場合です。この場合、useRawValueToEscapeオプションを true に設定することで、翻訳された文字列の HTML エスケープ処理を無効にすることができます。

useRawValueToEscapeオプションを使用するには、i18next.t()メソッドの第二引数に true を渡します。例えば、次のコードでは、翻訳された文字列の HTML エスケープ処理を無効にしています。



```
import i18next from "i18next";

const messages = i18next.t("messages", {
  "en": {
    "hello": "Hello, world!",
  },
  "ja": {
    "hello": "<h1>こんにちは、世界！</h1>",
  },
});

// HTML エスケープ処理を無効にする
const translatedHello = i18next.t("hello", { useRawValueToEscape: true });

console.log(translatedHello); // <h1>こんにちは、世界！</h1>

```



このコードの出力は、次のようになります。



```
  < h1 > こんにちは、世界！</h1 >

```

useRawValueToEscapeオプションは、i18nextの Advanced Options で設定することもできます。



##### prefix

"{{"

prefix for interpolation



##### suffix

"}}"

suffix for interpolation
ja:



##### prefixEscaped

undefined

escaped prefix for interpolation (regexSafe)

`prefixEscaped`は、i18nextのオプションの一つで、デフォルトでは`undefined`に設定されています。このオプションは、変数のプレフィックスをエスケープするために使用されます。デフォルトでは、変数のプレフィックスは `{{` ですが、正規表現で使用する場合にはエスケープする必要があります。
`prefixEscaped`オプションを使用することで、エスケープされたプレフィックスを指定することができます。例えば、以下のように設定することができます。



```
"prefixEscaped": "\\{\\{"

```



この場合、変数のプレフィックスは `\{\{` となります。



`prefixEscaped`オプションを使用する場合、`prefix`オプションも設定する必要があります。
`prefix`オプションは、エスケープされていない変数のプレフィックスを指定します。



##### suffixEscaped

undefined

escaped suffix for interpolation (regexSafe)

`suffixEscaped`は、i18nextのオプションの一つで、デフォルトでは`undefined`に設定されています。
このオプションは、変数のサフィックスをエスケープするために使用されます。デフォルトでは、変数のサフィックスは `}}` ですが、正規表現で使用する場合にはエスケープする必要があります。
`suffixEscaped`オプションを使用することで、エスケープされたサフィックスを指定することができます。例えば、以下のように設定することができます。

```
"suffixEscaped": "\\}\\}"

```

この場合、変数のサフィックスは`\}\}`となります。`suffixEscaped`オプションを使用する場合、`suffix`オプションも設定する必要があります。`suffix`オプションは、エスケープされていない変数のサフィックスを指定します。



##### unescapeSuffix

undefined

suffix to unescaped mode



`unescapeSuffix`は、i18nextのオプションの一つで、デフォルトでは`undefined`に設定されています。
このオプションは、変数のサフィックスをエスケープ解除するために使用されます。
`suffixEscaped`オプションを使用して変数のサフィックスをエスケープした場合、`unescapeSuffix`オプションを使用してエスケープを解除することができます。例えば、以下のように設定することができます。



```
"suffixEscaped": "\\}\\}",
"unescapeSuffix": "}}"

```

この場合、変数のサフィックスは`\}\}`となり、エスケープ解除する場合は`}}`となります。
`unescapeSuffix`オプションを使用する場合、`suffix`オプションも設定する必要があります。
`suffix`オプションは、エスケープされていない変数のサフィックスを指定します。



##### unescapePrefix

"-"

prefix to unescaped mode

GitHub Copilot: `unescapePrefix`は、i18nextのオプションの一つで、デフォルトでは` - `に設定されています。
このオプションは、変数のプレフィックスをエスケープ解除するために使用されます。
`prefixEscaped`オプションを使用して変数のプレフィックスをエスケープした場合、`unescapePrefix`オプションを使用してエスケープを解除することができます。

例えば、以下のように設定することができます。

```
"prefixEscaped": "\\{\\{",
"unescapePrefix": "{{"

```



この場合、変数のプレフィックスは`\{\{`となり、エスケープ解除する場合は`{{`となります。
`unescapePrefix`オプションを使用する場合、`prefix`オプションも設定する必要があります。
`prefix`オプションは、エスケープされていない変数のプレフィックスを指定します。



##### nestingPrefix

"$t("

prefix for nesting

`nestingPrefix`は、i18nextのオプションの一つで、デフォルトでは`"$t("`に設定されています。
このオプションは、翻訳文字列内で他の翻訳文字列をネストするために使用されます。
`nestingPrefix`オプションを使用することで、ネストされた翻訳文字列のプレフィックスを指定することができます。
例えば、以下のように設定することができます。

```
"nestingPrefix": "$t(",
"welcome": "Welcome, {{name}}! You have {{count}} messages. {{ $t('notification') }}"

```

この場合、`$t('notification')`は、別の翻訳文字列を参照するために使用されています。`nestingPrefix`オプションを使用する場合、`nestingSuffix`オプションも設定する必要があります。
`nestingSuffix`オプションは、ネストされた翻訳文字列のサフィックスを指定します。



##### nestingSuffix

")"

suffix for nesting



`nestingSuffix`は、i18nextのオプションの一つで、デフォルトでは`")"`に設定されています。
このオプションは、翻訳文字列内で他の翻訳文字列をネストするために使用されます。
`nestingSuffix`オプションを使用することで、ネストされた翻訳文字列のサフィックスを指定することができます。

例えば、以下のように設定することができます。

```
"nestingPrefix": "$t(",
"nestingSuffix": ")",
"welcome": "Welcome, {{name}}! You have {{count}} messages. {{ $t('notification') }}"

```

この場合、`$t('notification')`は、別の翻訳文字列を参照するために使用されています。
`nestingSuffix`オプションを使用する場合、`nestingPrefix`オプションも設定する必要があります。
`nestingPrefix`オプションは、ネストされた翻訳文字列のプレフィックスを指定します。




##### nestingPrefixEscaped
##### nestingSuffixEscaped

undefined

`nestingPrefixEscaped`と`nestingSuffixEscaped`は、i18nextのオプションで、それぞれネストされた翻訳文字列のプレフィックスとサフィックスをエスケープするために使用されます。

デフォルトでは、`nestingPrefixEscaped`は`undefined`に設定されており、`nestingSuffixEscaped`は`)`に設定されています。

`nestingPrefixEscaped`は、ネストされた翻訳文字列のプレフィックスをエスケープするために使用されます。
デフォルトでは、ネストされた翻訳文字列のプレフィックスは`$t(`ですが、正規表現で使用する場合にはエスケープする必要があります。

`nestingPrefixEscaped`オプションを使用することで、エスケープされたプレフィックスを指定することができます。

`nestingSuffixEscaped`は、ネストされた翻訳文字列のサフィックスをエスケープするために使用されます。
デフォルトでは、ネストされた翻訳文字列のサフィックスは`)`ですが、正規表現で使用する場合にはエスケープする必要があります。
`nestingSuffixEscaped`オプションを使用することで、エスケープされたサフィックスを指定することができます。

例えば、以下のように設定することができます。

```
"nestingPrefixEscaped": "\\$t\\(",
"nestingSuffixEscaped": "\\)"

```

この場合、ネストされた翻訳文字列のプレフィックスは`\$t\(`、サフィックスは`\)`となります。`
nestingPrefixEscaped`と`nestingSuffixEscaped`オプションを使用する場合、それぞれのエスケープされていないプレフィックスとサフィックスを指定する必要があります。



##### nestingOptionsSeparator

","

separates the options from nesting key

`nestingOptionsSeparator`は、i18nextのオプションの一つで、デフォルトでは`,`に設定されています。
このオプションは、ネストされた翻訳文字列のオプションを区切るために使用されます。例えば、以下のように設定することができます。

```
"nestingOptionsSeparator": ",",
"welcome": "Welcome, {{name}}! You have {{count}} messages. {{ $t('notification', { 'count': count }, { 'defaultValue': 'No new notifications' }) }}"

```



この場合、`$t('notification', { 'count': count }, { 'defaultValue': 'No new notifications' })`は、`notification`というキーの翻訳文字列を参照しています。
`{ 'count': count } `は、`notification`の中で使用される変数を指定しています。
`{ 'defaultValue': 'No new notifications' } `は、`notification`が存在しない場合に表示されるデフォルトの値を指定しています。
`nestingOptionsSeparator`オプションを使用する場合、`nestingPrefix`と`nestingSuffix`オプションも設定する必要があります。
`nestingPrefix`オプションは、ネストされた翻訳文字列のプレフィックスを指定し、`nestingSuffix`オプションは、ネストされた翻訳文字列のサフィックスを指定します。



##### defaultVariables

undefined

global variables to use in interpolation replacements defaultVariables: { key: "value" }

`defaultVariables`は、i18nextのオプションの一つで、デフォルトでは`undefined`に設定されています。
このオプションは、翻訳文字列内で使用される変数のデフォルト値を指定するために使用されます。

例えば、以下のように設定することができます。

```
"defaultVariables": {
  "name": "John",
  "count": 5
},
"welcome": "Welcome, {{name}}! You have {{count}} messages."

```

この場合、`{ { name } } `と`{ { count } } `は、それぞれ`defaultVariables`オプションで指定された`name`と`count`の値に置き換えられます。
`defaultVariables`オプションを使用する場合、翻訳文字列内で使用される変数のデフォルト値を指定する必要があります。



##### maxReplaces

1000

after how many interpolation runs to break out before throwing a stack overflow

`maxReplaces`は、i18nextのオプションの一つで、デフォルトでは`1000`に設定されています。
このオプションは、翻訳文字列内での変数の置換を行う回数の上限を設定するために使用されます。

翻訳文字列内での変数の置換を行う回数が`maxReplaces`で指定された回数を超える場合、スタックオーバーフローが発生する可能性があります。
このオプションを使用することで、スタックオーバーフローを回避することができます。

例えば、以下のように設定することができます。

```
"maxReplaces": 10000,
"welcome": "Welcome, {{name}}! You have {{count}} messages."

```

この場合、`maxReplaces`は`10000`に設定されており、翻訳文字列内での変数の置換を行う回数が`10000`回を超える場合にスタックオーバーフローが発生する可能性があります。



##### skipOnVariables

true
(was false for <v21.0.0)
version21.0.0 以前はfalseでした。

Will skip to interpolate the variables, example:

```
  t('key', { a: '$t(nested)' })

```

これは、ネストされたキーを解決せず、変数の値として$t(nested)を使用します。

Another example:

```
t('key', { a: '{{otherVar}}': otherVar: 'another value' })

```


これは、otherVar変数を解決せず、変数の値として{{otherVar}}を使用します。
インターポレーション変数がユーザーから提供されるか、外部ソースからロードされる場合は、このオプションをtrueのままにすることを強くお勧めします。
やっていることがわかっている場合は、falseに設定することもできます。


### Impact on localization

このトピックに関するベストプラクティスをチェックしましょう。

https://www.i18next.com/principles/best-practices#impact-of-interpolation-on-localization



----------------------------------------

# Formatting

`Formatting`は、i18nextでのフォーマットに関する機能について説明されているセクションです。
このセクションでは、i18nextでのフォーマットの方法について説明されています。

例えば、以下のような内容が記載されています。

- i18nextでは、翻訳文字列内で変数を使用することができます。変数を使用することで、翻訳文字列の再利用性を高めることができます。
- i18nextでは、変数の値をフォーマットすることができます。フォーマットすることで、変数の値をより見やすくすることができます。
- i18nextでは、フォーマットには`sprintf`を使用することができます。`sprintf`を使用することで、変数の値をより柔軟にフォーマットすることができます。
- i18nextでは、`sprintf`の代わりに`i18next.format`を使用することもできます。`i18next.format`を使用することで、翻訳文字列内での変数のフォーマットをより簡単に行うことができます。

i18next>=21.3.0からは、に基づいた組み込みのフォーマット関数を使用することができます。

Intl APIをポリフィルする必要があるかもしれません。



Intl.PluralRules
Intl.RelativeTimeFormat
Intl.ListFormat
Intl.DisplayNames
Intl.NumberFormat (ES2020)
Intl.Locale
Intl.getCanonicalLocales
Intl.DateTimeFormat (ES2020)

i18nextのクラッシュコースビデオでこのトピックをチェックしてください。

https://www.youtube.com/watch?v=SA_9i4TtxLQ&t=557s



### Basic usage

基本的な使い方


翻訳文字列のシグネチャは以下のようになります。

```
{
  "key": "Some format {{value, formatname}}",
  "keyWithOptions": "Some format {{value, formatname(option1Name: option1Value; option2Name: option2Value)}}"
}

```

書式設定にオプションを渡す方法は3つあります。

1
翻訳文字列を使った中で渡す。
{{value, formatname(options1: options1Value)}}

2
呼び出すときにルートレベルのオプションを渡す。
t('key', { option1: option1Value })

3
このように、値ごとのオプションを渡す。
t('key', { formatParams: { value: { option1: option1Value } })

例

```
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t('intlNumber', { val: 1000 });
// --> Some 1,000
i18next.t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t('intlNumberWithOptions', { val: 2000 });
// --> Some 2,000.00
i18next.t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000

```


使用言語の上書き

言語はt.optionsに渡すことで上書きできます。

```
i18next.t('intlNumber', { val: 1000.1, lng: 'de' });
// or: i18next.t('intlNumber', { val: 1000.1, locale: 'de' });

i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { lng: 'de' } } });
// or: i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { locale: 'de' } } });

```

カスタムフォーマット関数の追加
独自の関数を追加するのは簡単です。

```
// after i18next.init(options);
i18next.services.formatter.add('lowercase', (value, lng, options) => {
  return value.toLowerCase();
});
i18next.services.formatter.add('underscore', (value, lng, options) => {
  return value.replace(/\s+/g, '_');
});

```

i18next.init() を呼び出した後に、必ずカスタムフォーマット関数を追加してください。

最適化されたパフォーマンスのためにaddCachedバージョンもあります。

```
i18next.services.formatter.addCached('specialformat', (lng, options) => {
  const formatter = new Intl.NumberFormat(lng, options);
  return (val) => formatter.format(val);
});

```

複数のフォーマッターを使用する

```
{
  "key": "Some format {{value, formatter1, formatter2}}"
}

```


### Built-in formats

組み込みフォーマット

数字 Number

```
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t('intlNumber', { val: 1000 });
// --> Some 1,000
i18next.t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t('intlNumberWithOptions', { val: 2000 });
// --> Some 2,000.00
i18next.t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000

```

このコードは、i18nextで数値をフォーマットする方法について説明しています。以下は、このコードの説明です。

- `i18next.t`は、i18nextで翻訳文字列を取得するための関数です。
第1引数に翻訳文字列のキーを、第2引数に変数の値を指定します。

- `intlNumber`と`intlNumberWithOptions`は、翻訳文字列内で数値をフォーマットするための例です。
`intlNumber`は、数値をデフォルトのフォーマットで表示します。
`intlNumberWithOptions`は、数値を小数点以下2桁で表示します。

- `minimumFractionDigits`は、小数点以下の最小桁数を指定するオプションです。
例えば、`minimumFractionDigits: 3`と指定すると、小数点以下3桁で表示されます。

- `formatParams`は、フォーマットオプションを指定するためのオブジェクトです。
例えば、`formatParams: { val: { minimumFractionDigits: 3 } } `と指定すると、
`val`という変数に対して小数点以下3桁で表示するオプションを指定します。


For options see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat


### Currency 通貨

通貨


```
// JSON
{
  "intlCurrencyWithOptionsSimplified": "The value is {{val, currency(USD)}}",
  "intlCurrencyWithOptions": "The value is {{val, currency(currency: USD)}}",
  "twoIntlCurrencyWithUniqueFormatOptions": "The value is {{localValue, currency}} or {{altValue, currency}}",
}

i18next.t('intlCurrencyWithOptionsSimplified', { val: 2000 });
// --> The value is $2,000.00
i18next.t('intlCurrencyWithOptions', { val: 2300 });
// --> The value is $2,300.00
i18next.t('twoIntlCurrencyWithUniqueFormatOptions',
          {
            localValue: 12345.67,
            altValue: 16543.21,
            formatParams: {
              localValue: { currency: 'USD', locale: 'en-US' },
              altValue: { currency: 'CAD', locale: 'fr-CA' },
            },
          },);
// --> The value is $12,345.67 or 16 543,21 $ CA

```

このコードは、i18nextで通貨をフォーマットする方法について説明しています。
以下は、このコードの説明です。

- `intlCurrencyWithOptionsSimplified`と`intlCurrencyWithOptions`は、翻訳文字列内で通貨をフォーマットするための例です。`intlCurrencyWithOptionsSimplified`は、通貨をデフォルトのフォーマットで表示します。
`intlCurrencyWithOptions`は、通貨をUSDで表示します。

- `twoIntlCurrencyWithUniqueFormatOptions`は、異なる通貨を同じ翻訳文字列内でフォーマットするための例です。
`localValue`と`altValue`は、異なる通貨の値を表します。

- `currency`は、通貨をフォーマットするためのオプションです。例えば、`currency: USD`と指定すると、通貨をUSDで表示します。

- `locale`は、ロケールを指定するためのオプションです。例えば、`locale: 'en-US'`と指定すると、ロケールをen-USに設定します。

For options see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat



### DateTime 日付と時間

日付と時間

```
// JSON
{
  "intlDateTime": "On the {{val, datetime}}",
}

i18next.t('intlDateTime', { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) });
// --> On the 12/20/2012
i18next.t('intlDateTime',
          {
            val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
            formatParams: {
              val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            },
          });
// --> On the Thursday, December 20, 2012

```

このコードは、i18nextで日付と時刻をフォーマットする方法について説明しています。
以下は、このコードの説明です。

- `intlDateTime`は、翻訳文字列内で日付と時刻をフォーマットするための例です。

- `i18next.t`は、i18nextで翻訳文字列を取得するための関数です。
第1引数に翻訳文字列のキーを、第2引数に変数の値を指定します。

- `val`は、日付と時刻を表す変数です。
`new Date(Date.UTC(2012, 11, 20, 3, 0, 0))`と指定することで、UTCの2012年12月20日3時0分0秒を表します。

- `formatParams`は、フォーマットオプションを指定するためのオブジェクトです。
例えば、`val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } `と指定すると、`val`という変数に対して、曜日、年、月、日を含むフォーマットを指定します。

For options see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat



### RelativeTime

RelativeTimeは、i18nextで相対時間をフォーマットするための機能について説明されているセクションです。
このセクションでは、i18nextで相対時間をフォーマットする方法について説明されています。

```
// JSON
{
  "intlRelativeTime": "Lorem {{val, relativetime}}",
  "intlRelativeTimeWithOptions": "Lorem {{val, relativetime(quarter)}}",
  "intlRelativeTimeWithOptionsExplicit": "Lorem {{val, relativetime(range: quarter; style: narrow;)}}",
}

i18next.t('intlRelativeTime', { val: 3 });
// --> Lorem in 3 days
i18next.t('intlRelativeTimeWithOptions', { val: -3 });
// --> Lorem 3 quarters ago
i18next.t('intlRelativeTimeWithOptionsExplicit', { val: -3 });
// --> Lorem 3 qtrs. ago
i18next.t('intlRelativeTimeWithOptionsExplicit', { val: -3, style: 'long' });
// --> Lorem 3 quarters ago

```

このコードは、i18nextで相対時間をフォーマットする方法について説明しています。
以下は、このコードの説明です。

- `i18next.t`は、i18nextで翻訳文字列を取得するための関数です。第1引数に翻訳文字列のキーを、第2引数に変数の値を指定します。

`intlRelativeTime`
`intlRelativeTimeWithOptions`
`intlRelativeTimeWithOptionsExplicit`
これらは、翻訳文字列内で相対時間をフォーマットするための例です。

`intlRelativeTime`は、相対時間をデフォルトのフォーマットで表示します。

`intlRelativeTimeWithOptions`は、相対時間を四半期で表示します。

`intlRelativeTimeWithOptionsExplicit`は、相対時間を四半期で表示し、スタイルをnarrowに設定します。

- `val`は、相対時間を表す変数です。`3`と指定することで、3日後を表します。`-3`と指定することで、3四半期前を表します。

- `range`は、相対時間の範囲を指定するオプションです。例えば、`range: quarter`と指定すると、四半期を範囲として表示します。

- `style`は、相対時間のスタイルを指定するオプションです。例えば、`style: narrow`と指定すると、短い形式で表示します。

For options see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat




### List

リスト

```
// JSON
{
  "intlList": "A list of {{val, list}}"
}

i18next.t('intlList', { val: ['locize', 'i18next', 'awesomeness'] });
  // --> A list of locize, i18next, and awesomeness

```

このコードは、i18nextでリストをフォーマットする方法について説明しています。
以下は、このコードの説明です。

- `i18next.t`は、i18nextで翻訳文字列を取得するための関数です。第1引数に翻訳文字列のキーを、第2引数に変数の値を指定します。

- `intlList`は、翻訳文字列内でリストをフォーマットするための例です。

- `val`は、リストを表す変数です。`['locize', 'i18next', 'awesomeness']`と指定することで、3つの要素を持つリストを表します。

- `list`は、リストをフォーマットするためのオプションです。例えば、`list: 'or'`と指定すると、最後の要素の前にorを挿入します。

For options see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat


### Legacy format function i18next<21.3.0

この項目は削除



### Additional options

追加オプション

インターポレーションとその他のオプションのプレフィックス/サフィックスは、initオプションで上書きすることができます。

例

```
i18next.init({
    interpolation: { ... }
});

```



option
default
description



##### alwaysFormat

false

すべての 変数が埋め込まれた値 に対してformat関数を呼び出すために使用されます。



##### format

noop function

この関数を渡すことは、i18next>=21.3.0ではLEGACYと見なされます。
format関数 function format(value, format, lng, edit) {}



##### formatSeparator

','

フォーマットと変数埋め込み値を区切るために使用されます。



これらフォーマットの設定は、デフォルトのオプションで十分カバーできるように設計されています。



----------------------------------------

# Plurals

複数形

複数形は 変数埋め込み やコンテキストと組み合わせることができます。
これらの複数形は、Intl APIで使用されているものと同様に簡素化されています。
Intl.PluralRules APIが利用できない場合は、i18nextのJSON形式のv3複数形処理を使用する必要があります。


注意: 変数名は 'count' でなければなりません。
そして、必ず存在しなければなりません: i18next.t('key', {count: 1}); 'count'が提供されない場合、'key'の値にフォールバックはありません。



複数のカウントが必要な場合は、ネスティングをご覧ください。

https://www.i18next.com/translation-function/nesting#passing-options-to-nestings


{count: 0}のための特別な翻訳を提供しています。
これにより、より自然な言語を使用することができます。
カウントが0で、_zeroエントリが存在する場合、言語の複数形接尾辞の代わりに使用されます。



🎓 i18nextのクラッシュコースのビデオでこのトピックをチェックしてください。

https://www.youtube.com/watch?t=485&v=SA_9i4TtxLQ&feature=youtu.be



### Singular / Plural

単数形／複数形

keys

```
{
  "key_one": "item",
  "key_other": "items",
  "keyWithCount_one": "{{count}} item",
  "keyWithCount_other": "{{count}} items"
}

```


例

```
i18next.t('key', {count: 0}); // -> "items"
i18next.t('key', {count: 1}); // -> "item"
i18next.t('key', {count: 5}); // -> "items"
i18next.t('key', {count: 100}); // -> "items"
i18next.t('keyWithCount', {count: 0}); // -> "0 items"
i18next.t('keyWithCount', {count: 1}); // -> "1 item"
i18next.t('keyWithCount', {count: 5}); // -> "5 items"
i18next.t('keyWithCount', {count: 100}); // -> "100 items"

```

v21.0.0から、サフィックスが変更された新しいJSONフォーマットv4が導入されました。
既存の翻訳を新しいv4形式に変換するには、 i18next-v4-format-converter または↓このWebツールをご覧ください。

https://i18next.github.io/i18next-v4-format-converter-web/



----------------------------------------

### Languages with multiple plurals

複数の複数形を持つ言語

例では、単数形のほかに5つの複数形を持つアラビア語を使用しています。

keys

```
{
  "key_zero": "zero",
  "key_one": "singular",
  "key_two": "two",
  "key_few": "few",
  "key_many": "many",
  "key_other": "other"
}

```

例

```
i18next.t('key', {count: 0}); // -> "zero"
i18next.t('key', {count: 1}); // -> "singular"
i18next.t('key', {count: 2}); // -> "two"
i18next.t('key', {count: 3}); // -> "few"
i18next.t('key', {count: 4}); // -> "few"
i18next.t('key', {count: 5}); // -> "few"
i18next.t('key', {count: 11}); // -> "many"
i18next.t('key', {count: 99}); // -> "many"
i18next.t('key', {count: 100}); // -> "other"

```



### 正しい複数形の接尾辞を見つけるには？

この小さなユーティリティを使えば、正しい複数形の接尾辞を求めることができます。

source code

https://jsfiddle.net/6bpxsgd4


あるいは、 translation-check を試してみてください。適切な複数形も表示されます。

あるいは、locizeのような翻訳管理システムを使うこともできます。



### 序数詞

序数（英語の "1st"、"2nd"、"3rd "のように、物事の順序や順位を指す）もサポートされています。
ordinalオプション（および_ordinal接尾辞）は、複数キーを決定するために序数を使用するようにヘルパーに指示します。
例えば、"32 "の場合、序数桁は "2 "なので、key_twoが使われます。



keys

```
// i.e. english
{
  "key_ordinal_one": "{{count}}st place", // 1st, 21st, 31st
  "key_ordinal_two": "{{count}}nd place", // 2nd, 22nd, 32nd
  "key_ordinal_few": "{{count}}rd place", // 3rd, 23rd, 33rd
  "key_ordinal_other": "{{count}}th place" // 4th, 5th, 24th, 11th
}

```

例

```
i18next.t('key', { count: 1, ordinal: true }); // -> "1st place"
i18next.t('key', { count: 21, ordinal: true }); // -> "21st place"
i18next.t('key', { count: 2, ordinal: true }); // -> "2nd place"
i18next.t('key', { count: 11, ordinal: true }); // -> "11th place"
i18next.t('key', { count: 32, ordinal: true }); // -> "32nd place"

```



### 区間複数表現

ある範囲内にあるアイテムの数を表すフレーズを定義したい場合、例えば、いくつかの項目やたくさんの項目などがあります。
このような場合には、 i18next-intervalplural-postprocessor というポストプロセッサーを追加する必要があります。


```
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

i18next
  .use(intervalPlural)
  .init(i18nextOptions);

```

keys

```
{
  "key1_one": "{{count}} item",
  "key1_other": "{{count}} items",
  "key1_interval": "(1)[one item];(2-7)[a few items];(7-inf)[a lot of items];",
  "key2_one": "{{count}} item",
  "key2_other": "{{count}} items",
  "key2_interval": "(1)[one item];(2-7)[a few items];"
  }

```

例

```
i18next.t('key1_interval', {postProcess: 'interval', count: 1}); // -> "one item"
i18next.t('key1_interval', {postProcess: 'interval', count: 4}); // -> "a few items"
i18next.t('key1_interval', {postProcess: 'interval', count: 100}); // -> "a lot of items"

// 範囲にマッチしない場合は、通常の複数形にフォールバックします。
// 例えば、"key1_interval"の場合、"key1_other"が使用されます。
i18next.t('key2_interval', {postProcess: 'interval', count: 1}); // -> "one item"
i18next.t('key2_interval', {postProcess: 'interval', count: 4}); // -> "a few items"
i18next.t('key2_interval', {postProcess: 'interval', count: 100}); // -> "100 items"

```


注意: i18next-intervalPlural-postProcessor のv3.0.0では、間隔エントリの正規表現が変更されたため、古いバージョンを使用している場合は、中括弧の代わりに波括弧を使用する必要があります。

```
"key2_interval": "(1){one item};(2-7){a few items};"

```



----------------------------------------

# Nesting

入れ子

`Nesting`は、i18nextで翻訳文字列をネストする方法です。
ネストすることで、翻訳文字列をより構造化し、管理しやすくなります。

以下は、ネストされた翻訳文字列の例です。

```javascript
{
  "dashboard": {
    "title": "ダッシュボード",
    "widgets": {
      "users": "ユーザー",
      "orders": "注文"
    }
  }
}
```

この例では、`dashboard`オブジェクトの中に、`title`と`widgets`という2つのプロパティがあります。`widgets`プロパティは、`users`と`orders`という2つのプロパティを持ちます。これにより、`dashboard.title`や`dashboard.widgets.users`といった形で、翻訳文字列を参照することができます。

ネストされた翻訳文字列を使用する場合、`keySeparator`オプションを設定する必要があります。デフォルトでは、`.`が使用されますが、`: `や` /`など、任意の文字列を使用することができます。

ネストすることで、翻訳文中の他のキーを参照することができます。これは、用語集を作るのに便利かもしれません。



### Basic

基本

keys

```
{
    "nesting1": "1 $t(nesting2)",
    "nesting2": "2 $t(nesting3)",
    "nesting3": "3",
}

```

sample

```
i18next.t('nesting1'); // -> "1 2 3"

```


他の名前空間のキーを参照するには

```
"nesting1": "1 $t(common:nesting2)",

```

### Passing options to nestings

オプションでデータモデル全体を渡すことができます。

keys

```
{
    "girlsAndBoys": "They have $t(girls, {\"count\": \"{{girls}}\" }) and $t(boys, {\"count\": \"{{boys}}\" })",
    "boys": "{{count}} boy",
    "boys_other": "{{count}} boys",
    "girls": "{{count}} girl",
    "girls_other": "{{count}} girls",
}

```

例

```
i18next.t('girlsAndBoys', {girls: 3, boys: 2});
// -> "They have 3 girls and 2 boys"

```



Make sure the options string is valid JSON and can be parsed using JSON.parse
'sampleKey': 'test $t(nest2, { "changedVarName": "{{var}}" })'

このコードは、i18nextで変数を置換する方法の一例です。`$t`関数を使用して、`nest2`というキーに対応する翻訳文字列を取得し、`{ "changedVarName": "{{var}}" } `というオプションを渡しています。
このオプションでは、 `{{var}}` という変数名を定義しています。

ただし、このオプション文字列は、JSON形式である必要があります。そのため、`Make sure the options string is valid JSON and can be parsed using JSON.parse`というコメントが付いています。

つまり、この文字列がJSON形式として正しいことを確認し、`JSON.parse`関数で解析できるようにする必要があります。

変数埋め込みをネストに渡す


keys

```
{
      "key1": "hello world",
      "key2": "say: {{val}}"
}

```

例

```
i18next.t('key2', {val: '$t(key1)'});
// -> "say: hello world"

```

i18next v21.0.0以降を使用している場合は、skipOnVariablesをfalseに設定する必要があります。

```
interpolation: {
  skipOnVariables: false
}

```

### Additional options

追加オプション

ネスティングのための接頭辞/接尾辞やその他のオプションは、initの 変数埋め込み オプションで上書きするか、t関数に追加オプションを渡すことで上書きすることができます。

例

```
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});

```



option
default
description



##### nestingPrefixEscaped

undefined

escaped prefix for nesting (regexSafe)

`nestingPrefixEscaped`は、i18nextでネストされた翻訳文字列を使用する際に、ネストの開始を示すプレフィックスをエスケープした文字列です。`regexSafe`というオプションを指定することで、正規表現で使用できるようにエスケープされた文字列が生成されます。

このプレフィックスは、デフォルトでは`__`となっていますが、`nestingPrefix`オプションで変更することができます。`nestingPrefixEscaped`は、このエスケープされたプレフィックスを表します。




##### nestingSuffixEscaped

undefined

escaped suffix for nesting (regexSafe)

`nestingSuffixEscaped`は、i18nextでネストされた翻訳文字列を使用する際に、ネストの終了を示すサフィックスをエスケープした文字列です。
`regexSafe`というオプションを指定することで、正規表現で使用できるようにエスケープされた文字列が生成されます。
このサフィックスは、デフォルトでは`__`となっていますが、`nestingSuffix`オプションで変更することができます。
`nestingSuffixEscaped`は、このエスケープされたサフィックスを表します。



多くのオプションがありますが、デフォルトの設定で十分です。



----------------------------------------

# Context

`Context`は、i18nextで翻訳文字列をコンテキストに応じて分類する方法です。
例えば、`male`と`female`という2つのコンテキストがある場合、それぞれのコンテキストに応じた翻訳文字列を定義することができます。
これにより、同じ単語でもコンテキストによって異なる翻訳文字列を使用することができます。

以下は、コンテキストを使用した翻訳文字列の例です。

```javascript
{
  "user": {
    "name": "名前",
    "gender_male": "男性",
    "gender_female": "女性"
  }
  }

```

この例では、`user`オブジェクトの中に、`name`というプロパティと、`gender_male`と`gender_female`という2つのプロパティがあります。
これにより、`user.name`や`user.gender_male`、`user.gender_female`のように、コンテキストに応じた翻訳文字列を参照することができます。

コンテキストを指定することで、翻訳を区別することができます。例えば、性別に応じた翻訳を提供する場合に役立ちます。

i18nextのクラッシュコースビデオでこのトピックをチェックしてください。

https://www.youtube.com/watch?t=653&v=SA_9i4TtxLQ&feature=youtu.be


Basic

keys

```
{
      "friend": "A friend",
      "friend_male": "A boyfriend",
      "friend_female": "A girlfriend"
}

```

例

```
i18next.t('friend'); // -> "A friend"
i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
i18next.t('friend', { context: 'female' }); // -> "A girlfriend"

```



### Combining with plurals

オプションでデータモデル全体を渡すことができます。

keys

```
{
      "friend_male_one": "A boyfriend",
      "friend_female_one": "A girlfriend",
      "friend_male_other": "{{count}} boyfriends",
      "friend_female_other": "{{count}} girlfriends"
}

```

sample

```
i18next.t('friend', {context: 'male', count: 1}); // -> "A boyfriend"
i18next.t('friend', {context: 'female', count: 1}); // -> "A girlfriend"
i18next.t('friend', {context: 'male', count: 100}); // -> "100 boyfriends"
i18next.t('friend', {context: 'female', count: 100}); // -> "100 girlfriends"

```



----------------------------------------

# Objects and Arrays

オブジェクトと配列

Objects
You can return objects or arrays to be used by third party modules localization:

オブジェクト
サードパーティのモジュールのローカライズに使用されるオブジェクトや配列を返すことができます。
i18nextでは、オブジェクトや配列を使用して、サードパーティ の モジュール の ローカライズ を行うことができます。

ローカライズ
ある製品やサービスを、特定の地域や言語に合わせて適応させることを指します。
具体的には、言語や通貨、日付や時間の書式、地域に応じた文化的な違いなどを考慮して、製品やサービスを変更することが含まれます。


keys

```
{
    "tree": {
        "res": "added {{something}}"
    },
    "array": ['a', 'b', 'c']
}

```

例

```
i18next.t('tree', { returnObjects: true, something: 'gold' });
// -> { res: 'added gold' }
i18next.t('array', { returnObjects: true });
// -> ['a', 'b', 'c']

```

i18nextの`t()`関数が返す値が、変数の埋め込みや複数形、ネストなどをサポートしています。
翻訳ファイル内で定義されたテキストに変数を埋め込んだり、複数形の翻訳を行ったり、オブジェクトのネストを扱ったりすることができます。
また、`returnObjects`オプションを`true`に設定することで、オブジェクトを返すことができます。
`returnObjects`オプションは、i18nextの初期化時に設定することができます。



### Arrays

配列

配列の値にアクセスしたり、それらを結合できます。

keys

```
{
      "arrayJoin": [
        "line1",
        "line2",
        "line3"
      ],
      "arrayJoinWithInterpolation": [
        "you",
        "can",
        "{{myVar}}"
      ],
      "arrayOfObjects": [
        { "name": "tom" },
        { "name": "steve" }
      ]
}

```

例

```
i18next.t('arrayJoin', { joinArrays: '+' });
// -> "line1+line2+line3"
i18next.t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' });
// -> "you can interpolate"
i18next.t('arrayOfObjects.0.name');
// -> "tom"

```

1つ目の例では、`arrayJoin`というキーに対応するテキストを取得しています。
`joinArrays`オプションに` + `を設定しているため、配列内の要素を` +`で結合した文字列が返されます。

2つ目の例では、`arrayJoinWithInterpolation`というキーに対応するテキストを取得しています。
`myVar`オプションに`interpolate`を設定しているため、テキスト内の`{ { myVar } } `が`interpolate`に置き換わります。
また、`joinArrays`オプションに` `（スペース）を設定しているため、配列内の要素をスペースで結合した文字列が返されます。

3つ目の例では、`arrayOfObjects.0.name`というキーに対応するテキストを取得しています。
このキーは、オブジェクトのネストを表しており、配列の最初の要素の`name`プロパティを取得しています。
結果として、`tom`という文字列が返されます。



----------------------------------------

# PRINCIPLES

# Best Practices

This content is available to you thanks to the contribution of following people:

* Jenny Reid

https://github.com/jennylreid


### Impact of Interpolation on localization

変数の埋め込みがローカライズに与える影響

他の言語に翻訳する場合、変数の埋め込みは実際に問題を引き起こします。基本的に、変数の埋め込みはテキストの断片を連結することを意味します。
英語の文章は文の断片に分割され、ランタイムでプログラム的に構築された場合、多言語の文法ルールを実装していない限り、翻訳するのは困難で、場合によっては不可能です。

ローカライズに与える影響を最小限に抑えるために、変数の埋め込みは控えめに使用してください。
変数の埋め込みは、ランタイムでのみ知ることができる値（例：動的な値）の場合には避けることができません。」

* タイムスタンプ
* ユーザーが入力したデータ

値が既知でリソースファイルで翻訳可能な場合、変数の埋め込みは避けるべきです。代わりに複数の独立した文字列値を使用してください。

例

以下のキーで{paymentType}の値を置き換えるために 変数への埋め込み を使用したいとします。

```
{
    "key": "All fees will be charged to the {{paymentType}} on file for this account."
}

```

ここで{paymentType}は「クレジットカード」または「PayPalアカウント」のいずれかを表します。
ドイツ語では、{paymentType}の前に置かれる「the」という単語の綴りは、渡される値に応じて変更する必要があります。」

```
{
    "key": "Alle Beträge werden dem {{paymentType}} für dieses Konto in Rechnung gestellt."
}

```

結果として、いくつかのランタイム文字列が壊れることになります

// -> "Alle Beträge werden dem Kreditkarte für dieses Konto in Rechnung gestellt." <- 'dem Kreditkarte' should be 'der Kreditkarte'
// ja:  "すべての料金は、このアカウントのクレジットカードに請求されます。" <- 'このアカウントのクレジットカード' is correct



// -> "Alle Beträge werden dem PayPal-Konto für dieses Konto in Rechnung gestellt." <- 'dem PayPal-Konto' is correct
// ja:  "すべての料金は、このアカウントのPayPalアカウントに請求されます。" <- 'このアカウントのPayPalアカウント' should be 'このアカウントのPayPalアカウント'

これは、非常に複雑なローカライズの問題の1つの単純な例です。
対応策として、2つの独立した完全に自己完結型の文字列を使用してください。

例

```
{
    "key1": "All fees will be charged to the credit card on file for this account."
    "key2": "All fees will be charged to the PayPal account on file for this account."

}

```



----------------------------------------

# Translation Resolution

翻訳の解決
i18nextが翻訳ファイルからテキストを取得する方法を指します。

i18nextでは、以下の順序で翻訳の解決が行われます。

1. i18nextが使用する言語を決定する。
2. i18nextが使用する言語に対応する翻訳ファイルを読み込む。
3. 翻訳ファイル内で、指定されたキーに対応するテキストを検索する。
4. テキストが見つかった場合、変数の埋め込みや複数形の処理を行い、最終的な翻訳結果を返す。

i18nextは、デフォルトでブラウザの言語設定を使用して言語を決定しますが、明示的に言語を指定することもできます。
また、i18nextは、複数の翻訳ファイルを使用することができ、翻訳ファイルの読み込み順序をカスタマイズすることもできます。


キーの翻訳プロセスは、i18nextの中心的な機能であり、このドキュメントは、i18nextがキーを適切なコンテンツに翻訳するための全体的なプロセスのガイドとして機能することを目的としています。特定のページや、特定の地域のユーザーに対して、適切なコンテンツを提供するためのものです。



### Core Elements

コア要素

i18nextの基本的な機能を表します。

以下に、i18nextのコア要素を示します。

- **i18next.init()**: i18nextを初期化するための関数です。i18nextを使用する前に、必ずこの関数を呼び出す必要があります。

- **i18next.t()**: 翻訳を行うための関数です。翻訳ファイル内で定義されたキーを指定することで、翻訳されたテキストを取得することができます。

- **翻訳ファイル**: ローカライズされたテキストの集合を表すオブジェクトです。
i18nextでは、JSON形式で定義された翻訳ファイルを使用します。

- **変数の埋め込み**: 翻訳されたテキスト内に、変数の値を埋め込むことです。
i18nextでは、`{ { 変数名 } }`の形式で変数を表現します。

- **複数形の処理**: 数量に応じて、翻訳されたテキストを変化させることです。
i18nextでは、`plural`オプションを使用して、複数形の処理を行うことができます。

- **言語の切り替え**: i18nextでは、複数の言語に対応する翻訳ファイルを使用することができます。
言語を切り替えるには、`i18next.changeLanguage()`関数を使用します。


#### Keys

JSONやPythonの辞書のようなオブジェクト構造の中のキーと似ています。キーは、特定のテキストのセットであり、検索されると対応する値を提供します。

例

キー

"key": "value"

この例は、キーが表現できる非常に基本的な概念を示していますが、これを形式的に表現できる能力は非常に重要です。
これにより、将来的にその有用性を拡張することができます。

キーは、テキストやその他のコンテンツの形式を、その潜在的なバリエーションに指定する非常に強力な方法です。

キーの使用方法に関する詳細については、翻訳関数のドキュメントを参照してください。

#### Languages

言語

言語は、キーを翻訳するために使用される表現方法です。キーを検索する際には、言語を指定して、どのバージョンのキーを使用するかを知る必要があります。重要なことは、キーが見つからない場合には、親言語またはデフォルト言語に gracefully にフォールバックできることです。

i18nextでは、言語は「コード」として知られる特定の値です。言語コードは、さまざまな方法で表現することができますが、一般的には以下の例のようになります。

例

"en-US"

要するに、英語やドイツ語のような「純粋な言語」コード、またはブラジルポルトガル語の場合のpt-BR、ラテンアメリカスペイン語の場合のes-419、または中国語の場合のzh-cmn-Hant-HKなどの言語とバリアントの識別子を使用します。
zh-cmn-Hant-HKは、香港で使用される繁体字で書かれた中国語の普通話バリエーションを表します。
この件に関する詳細については、IETF言語コードについて読むことをお勧めします。



### Namespaces

名前空間

Namespaces（名前空間）は、i18nextで翻訳ファイルを整理するための方法です。
名前空間を使用することで、翻訳ファイルを論理的にグループ化し、管理しやすくすることができます。

名前空間は、翻訳ファイル内のキーの接頭辞として表現されます。
例えば、`common.homepage.title`というキーは、`common`という名前空間内にある`homepage.title`というキーを表します。

名前空間を使用することで、翻訳ファイル内のキーの衝突を回避することができます。
また、名前空間を使用することで、特定の機能やページに関連する翻訳をグループ化することができます。

i18nextでは、デフォルトで`translation`という名前空間が使用されますが、必要に応じて独自の名前空間を定義することができます。
名前空間は、i18nextの初期化時に設定することができます。

名前空間は、異なる翻訳セットを論理的にグループ化することができるものと考えることができます。

例えば、アプリ内に3つのセクションがあり、それぞれ多数の個々のページがある場合がありますが、そのうち2つのセクションだけが類似したコンテンツを共有している場合があります。その場合、3つのセクションすべてのキーをロードする代わりに、共有された翻訳セットからキーをロードし、他のセクションをより小さなキーセットに分割して、必要に応じてロードすることができます。

特定の名前空間内には、それぞれ独自のキーセットを持つ言語セットが含まれることがあります。

例

```
"common" // Things that are reused everywhere, like "Confirm" and "Cancel" on buttons
"validation" // All validation text, like "email address not valid" in a form
"glossary" // Words we want to be reused consistently, like key words in your app

```

"common"：ボタンの「確認」と「キャンセル」など、アプリ全体で再利用されるものを含む翻訳を格納する名前空間です。

"validation"：フォーム内の「メールアドレスが無効です」といった、すべてのバリデーションテキストを含む翻訳を格納する名前空間です。

"glossary"：アプリ内で一貫して再利用する必要があるキーワードなど、一定の単語を含む翻訳を格納する名前空間です。

名前空間を使用することで、翻訳を論理的にグループ化し、管理しやすくすることができます。

名前空間の概念とその使用方法についての詳細は、この↓ドキュメントをご覧ください。

https://www.i18next.com/principles/namespaces



### Resolution Order

解決順序

デフォルトでは、キーを翻訳する際に、i18nextは最初の名前空間、言語、およびキーの組み合わせを試みます。

ただし、それが機能しない場合、i18nextは異なる組み合わせに gracefully にフォールバックして、コンテンツの最も関連性の高い翻訳を提供しようとします。
基本的なアイデアは、最も具体的なものから最も一般的なものまで、存在するキーを見つけることです。

以下は、i18nextがデフォルトで使用するプロセスです。

1. 類似するキー

特定のキーが見つからない場合、i18nextは、複数形、コンテキスト、単数形の順で最も適合するキーを探し、探しているキーに似たキーを見つけようとします。

2. 言語

キーが見つからない場合、i18nextは、現在の言語とフォールバック言語から構成される言語リストを順に処理します。

3. 名前空間

言語が一致しない場合、i18nextは、現在の名前空間とフォールバック名前空間から構成される名前空間リストを順に処理します。

4. フォールバックキー

それでもキーが見つからない場合、i18nは、指定されている場合はフォールバックキーを使用して、このプロセスを繰り返します。

5. キーが見つからない場合

キーがまだ見つからない場合、i18nは、フォールバックキーが指定されている場合は、最初に指定されたキー自体を返します。

各フォールバック方法の詳細については、↓フォールバックのドキュメントを参照してください。

https://www.i18next.com/principles/fallback



----------------------------------------

# Namespaces

名前空間

i18nextの国際化フレームワークの機能であり、複数のファイルにロードされる翻訳を分離することができます。

小規模なプロジェクトでは、すべてを1つのファイルにまとめることが合理的であるかもしれませんが、翻訳を複数のファイルに分割する必要がある場合があります。その理由は次のとおりです。

- ファイル内のセグメントが300以上になると、概要が失われるようになる
- すべての翻訳が最初のページでロードされる必要はなく、ロード時間を短縮することができる



### semantic reasons

しばしば、いくつかのセグメントを分離したいと思うのは、それらが一緒に属しているからです。
私たちは、ほとんどのプロジェクトでこれを行っています。例えば、以下のようになります。

* common.json -> どこでも再利用されるもの、例えばボタンのラベル「保存」、「キャンセル」など
* validation.json -> すべてのバリデーションテキスト
* glossary.json -> テキスト内で一貫して再利用する単語




### technical / editorial reasons

技術的/編集的な理由

翻訳がたくさんあると、全部を最初に読み込むと時間がかかってしまいます。だから、必要なときに必要な翻訳だけを読み込むようにしたいと思うことがあります。また、翻訳がたくさんあると、1つのファイルに全部入れると、見つけたい翻訳がどこにあるかわからなくなってしまうことがあります。

* ビュー/ページごとの名前空間
* アプリケーションセクション/機能セット（管理エリアなど）ごとの名前空間
* 遅延ロードされるモジュールごとの名前空間（シングルページアプリケーション）

例

```
i18next.init({
  ns: ['common', 'moduleA', 'moduleB'],
  defaultNS: 'moduleA'
}, (err, t) => {
  i18next.t('myKey'); // key in moduleA namespace (defined default)
  i18next.t('common:myKey'); // key in common namespace (not recommended with ns prefix when used in combination with natural language keys)
  // better use the ns option:
  i18next.t('myKey', { ns: 'common' });
});

// load additional namespaces after initialization
i18next.loadNamespaces('anotherNamespace', (err, t) => { /* ... */ });

```

Check the extended sample on the getting started page for a running sample.

https://www.i18next.com/overview/getting-started



----------------------------------------

# Fallback

Fallbackとは、i18nextが、翻訳が見つからなかった場合に、別の名前や言語、キーの組み合わせを試して、最も関連性の高い翻訳を提供しようとすることです。
具体的な組み合わせから順に試して、翻訳が見つかるまで続けます。
もし翻訳が見つからなかった場合は、i18nextは元のキーを返します。
フォールバックは、言語や名前空間、キーごとに定義することができます。

Graceful fallbacksを行うことは、i18nextの中心的な原則の1つです。
これにより、最も正確なコンテンツを表示しながら、同じコンテンツを何度も繰り返すことがなくなります。


### Language fallback

言語のフォールバック



#### Variant resolving - fallback from dialects or scripts

バリアントの解決 - 方言やスクリプトからのフォールバック

バリアント
i18nextでは、言語の特定のバージョンを「バリアント」と呼びます。
例えば、英語にはイギリス英語とアメリカ英語のように、地域やスクリプトなどが異なるバリアントがあります。

i18nextを使うと、各言語のバリアントごとに翻訳を定義できます。そして、もし特定のバリアントが見つからなかった場合、i18nextはより広い言語のバージョンに自動的にフォールバックします。
これにより、重複するコンテンツを書く必要が少なくなり、最も正確な翻訳を提供できます。

デフォルトでは、地域、スクリプトなどを含むバリアントが見つからない場合、i18nextはその言語のより広いバージョンで同じキーを探します。このため、言語のバリアントをサポートする場合、一般的な戦略は、純粋な言語内に共通のテキストを書き、バリアントで異なる部分のみを指定することです。


例

```
// fallback to one language
i18next.init({
  lng: "en-GB",
  resources: {
    "en-GB": {
      "translation": {
        "i18n": "Internationalisation"
      }
    },
    "en": {
      "translation": {
        "i18n": "Internationalization",
        "i18n_short": "i18n"
      }
    }
  }
}, () => {
  i18next.t('i18n'); // -> finds "Internationalisation"
  i18next.t('i18n_short'); // -> falls back to "en": "i18n"

  // force using en
  i18next.t('i18n', { lng: 'en' }); // -> "Internationalization"
});

```

このコードは、i18nextを使用して翻訳を行うためのサンプルコードです。
i18next.init()関数を使用して、i18nextを初期化し、翻訳に必要な設定を行います。

この例では、lngプロパティを使用して、デフォルトの言語を「en-GB」に設定しています。
また、resourcesプロパティを使用して、各言語の翻訳ファイルを定義しています。

i18next.t()関数を使用して、翻訳を行います。

最初の例では、i18next.t('i18n')というキーを指定して、翻訳されたテキストを取得しています。
この場合、現在の言語が「en-GB」であるため、「Internationalisation」という翻訳が返されます。

2番目の例では、i18next.t('i18n_short')というキーを指定して、翻訳されたテキストを取得しています。
この場合、現在の言語が「en-GB」であるため、翻訳が見つからないため、「en」の翻訳ファイルにフォールバックし、「i18n」という翻訳が返されます。

3番目の例では、i18next.t('i18n', { lng: 'en' })というキーを指定して、翻訳されたテキストを取得しています。
この場合、lngプロパティを使用して、強制的に言語を「en」に設定しています。
そのため、「Internationalization」という翻訳が返されます。

注意点としては、i18next.t()関数は非同期であるため、コールバック関数を使用して、翻訳が完了した後に処理を行う必要があることです。
また、i18nextでは、フォールバックを使用して、翻訳が見つからない場合に別の翻訳を探すことができるため、翻訳ファイルの定義に注意する必要があります。



### Fallback to different languages

異なる言語へのフォールバック

ユーザーの希望する言語を提供できない場合、フォールバックとして別の言語を指定することができます。これはメイン言語を示す場合や、地域ごとにフォールバックを異なるものにしたい場合などに便利です。



```
// fallback to one language
i18next.init({
    fallbackLng: 'en'
});

// fallback ordered
i18next.init({
    fallbackLng: ['fr', 'en']
});

// fallback depending on user language
i18next.init({
    fallbackLng: {
        'de-CH': ['fr', 'it'], //French and Italian are also spoken in Switzerland
        'zh-Hant': ['zh-Hans', 'en'],
        'es': ['fr'],
        'default': ['en']
    }
});

// フォールバックの配列を返す関数
// この関数は、上記のように文字列またはオブジェクトを返すこともできます。
i18next.init({
  fallbackLng: (code) => {
    if (!code || code === 'en') return ['en-US'];
    const fallbacks = [code];

    // We maintain en-US and en-AU. Some regions will prefer en-AU.
    if (code.startsWith('en-') && !['en-US', 'en-AU'].includes(code)) {
      if (['en-GB', 'en-NZ', 'en-IR'].includes(code)) fallbacks.push('en-AU');
      else fallbacks.push('en-US');
      return fallbacks;
    }

    // add pure lang
    const langPart = code.split('-')[0];
    if (langPart !== code) fallbacks.push(langPart);

    // finally, developer language
    fallbacks.push('dev');
    return fallbacks;
  }
});

```

↑このコードは、i18nextでフォールバックを初期化設定する4つの方法を示しています。

i18next.init()関数を使用して、i18nextを初期化し、fallbackLngプロパティを使用して、フォールバックの設定を行います。

最初の例では、fallbackLngプロパティに単一の言語コード「en」を指定しています。
これは、翻訳が見つからない場合に、英語の翻訳を使用することを意味します。

2番目の例では、fallbackLngプロパティに複数の言語コードを配列で指定しています。
これは、最初にフランス語の翻訳を探し、見つからない場合は英語の翻訳を使用することを意味します。

3番目の例では、fallbackLngプロパティにオブジェクトを指定しています。

このオブジェクトは、言語コードとその言語で使用するフォールバックの配列を定義しています。

例えば、スイスのドイツ語圏 ('de-CH')では、フランス語(fr)とイタリア語(it)も話されているため、フランス語とイタリア語の翻訳を探し、見つからない場合は英語の翻訳('default': ['en'])を使用することを意味します。

4番目の例では、fallbackLngプロパティに関数を指定しています。

この関数は、言語コードを受け取り、フォールバックの配列を返します。この例では、言語コードが「en」の場合は「en-US」を返し、それ以外の場合は言語コードを配列に追加し、純粋な言語コードを配列に追加し、最後に「dev」を追加しています。

注意点としては、i18nextのフォールバックは、翻訳が見つからない場合に別の翻訳を探すことができるため、翻訳ファイルの定義に注意する必要があります。
また、関数を使用してフォールバックを定義する場合は、非同期であるため、コールバック関数を使用して、翻訳が完了した後に処理を行う必要があります。



デフォルトはdevに設定されている。最初は、デフォルトを言語に設定するのは奇妙に見えるかもしれませんが、これにより、saveMissing機能を設定して、新しいキーをその開発者固有の言語に送ることができるようになります。そこから翻訳者は、例えば定義された専門用語を含む適切な英語を含む翻訳ファイルにテキストを修正することができます。本番環境で使用する場合は、fallbackLngを既存の言語に設定してください。



### Namespace fallback

名前空間フォールバック

i18nextはデフォルトでtranslationという名前の1つのファイルから翻訳をロードします。
しかし、名前空間と呼ばれる複数のファイルからロードするように設定できます。

ロードする複数の名前空間を定義することに加えて、フォールバック名前空間を設定することもできます。
そのため、翻訳するキーが指定された名前空間にない場合、指定されたフォールバックで検索します。


```app.json
{
  "title": "i18next"
}

```

```common.json
{
  "button": {
    "save": "save"
  }
}

```

例

```
i18next.init({
    // files to load
    ns: ['app', 'common'],

    // default namespace (needs no prefix on calling t)
    defaultNS: 'app',

    // fallback, can be a string or an array of namespaces
    fallbackNS: 'common'
}, () => {
    i18next.t('title') // -> "i18next"

    i18next.t('button.save') // -> "save" (fallback from common)

  // fallbackNSを使用しない場合、名前空間内のキーにアクセスするために名前空間のプレフィックスを付ける必要があります。これは、自然言語のキーと組み合わせて使用する場合には推奨されないため、注意が必要です。

    i18next.t('common:button.save') // -> "save"
    // better use the ns option:
    i18next.t('button.save', { ns: 'common' }) // -> "save"
});

```

このコードは、i18nextを使用して、複数の翻訳ファイルを読み込み、フォールバックを設定する方法を示しています。

例として、app.jsonとcommon.jsonという2つの翻訳ファイルを読み込み、app.jsonをデフォルトの名前空間として設定しています。

fallbackNSプロパティを使用して、common.jsonをフォールバックの名前空間として設定しています。

これにより、app.jsonに存在しないキーがある場合、common.jsonから翻訳を探すことができます。

i18next.t()関数を使用して、翻訳を行います。

例えば、i18next.t('title')というキーを指定して、翻訳されたテキストを取得しています。

この場合、デフォルトの名前空間であるapp.jsonから「i18next」という翻訳が返されます。

また、i18next.t('button.save')というキーを指定して、翻訳されたテキストを取得しています。

この場合、app.jsonには「button.save」というキーが存在しないため、フォールバックの名前空間であるcommon.jsonから「save」という翻訳が返されます。

注意点としては、i18nextでは、複数の翻訳ファイルを読み込むことができるため、翻訳ファイルの定義に注意する必要があります。
また、i18next.t()関数は非同期であるため、コールバック関数を使用して、翻訳が完了した後に処理を行う必要があります。
最後に、i18next.t()関数で名前空間を指定する方法についても注意が必要です。名前空間を指定する場合は、プレフィックスを使用するか、nsオプションを使用する必要があります。








### Key fallback

#### Key not found

キーが見つからない場合

キーが値を返さない場合、キーはフォールバックとして機能します。

```
i18next.t('notExistingKey'); // -> "notExistingKey"

```

ですから、フォールバック言語をロードする代わりに、キーがフォールバックになるようにi18nextを設定することができます：

```de.json
{
  "No one says a key can not be the fallback.": "Niemand sagt ein key kann nicht als Ersatz dienen."
}

```

```
i18next.init({
  lng: 'de',

  // allow keys to be phrases having `:`, `.`
  nsSeparator: false,
  keySeparator: false,

  // do not load a fallback
  fallbackLng: false
});

i18next.t('No one says a key can not be the fallback.')
// -> "Niemand sagt ein key kann nicht als Ersatz dienen."


i18next.t('This will be shown if the current loaded translations do not have this.');
// -> "This will be shown if the current loaded translations do not have this."

```

このコードは、i18nextを使用して、翻訳ファイルを読み込まずに翻訳を行う方法を示しています。

例として、de.jsonという翻訳ファイルを定義しています。

i18next.init()関数を使用して、i18nextを初期化し、lngプロパティに「de」を指定して、ドイツ語の翻訳を使用するように設定しています。

nsSeparatorプロパティとkeySeparatorプロパティにfalseを指定して、キーにコロンやドットを含めることができるようにしています。

fallbackLngプロパティにfalseを指定して、フォールバックを使用しないように設定しています。

i18next.t()関数を使用して、翻訳を行います。

例えば、i18next.t('No one says a key can not be the fallback.')というキーを指定して、翻訳されたテキストを取得しています。

この場合、翻訳ファイルを読み込まずに、直接キーに対応する翻訳を取得しています。

また、i18next.t()関数に存在しないキーを指定した場合、i18next.t()関数の引数に指定した文字列がそのまま返されます。

注意点としては、翻訳ファイルを読み込まずに翻訳を行う場合、翻訳ファイルの定義に注意する必要があります。
また、i18next.t()関数は非同期であるため、コールバック関数を使用して、翻訳が完了した後に処理を行う必要があります。

最後に、i18next.t()関数でキーにコロンやドットを含める場合、nsSeparatorプロパティとkeySeparatorプロパティを設定する必要があります。

このコードは機能しますし、ロードするファイルを減らすことができるかもしれませんが、コードとJSONファイルのフォールバック値を変更するたびに更新する必要があるため、翻訳の管理が非常に難しくなります。

可能ではありますが、お勧めしません。


### Missing values for existing keys

既存キーの欠落値

上記に加えて、JSON翻訳ファイルにキー（コードパーサーによって抽出されたものなど）が存在し、値が空文字列である場合に、欠落値をキーにフォールバックさせたい場合は、次の設定も必要です。

```
// 空の値を無効としてカウントすることを許可します（デフォルトではtrue）
returnEmptyString: false

```


### Calling with fallback keys

フォールバック・キーでの呼び出し

キーの配列を使ってt関数を呼び出すと、動的なキーに特定の値以外のフォールバック値を与えて翻訳することができます。
サンプルとして、エラーコードが表示され、場合によっては特定の警告を表示したい場合を考えてみます。

```translation.json
{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}

```

例

```
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "Something went wrong"

```

このコードは、i18nextを使用して、複数のキーを指定して翻訳を行う方法を示しています。

例として、translation.jsonという翻訳ファイルを定義しています。errorオブジェクト内には、unspecificと404という2つのキーが定義されています。



i18next.t()関数を使用して、翻訳を行います。

例えば、i18next.t([`error.${ error } `, 'error.unspecific'])という配列を引数に指定して、翻訳されたテキストを取得しています。

この場合、配列内の最初のキーが存在しない場合、2番目のキーが使用されます。

例えば、errorが404の場合、`error.404`というキーが存在するため、404に対応する翻訳が返されます。

一方、errorが502の場合、`error.502`というキーが存在しないため、フォールバックとしてunspecificに対応する翻訳が返されます。

注意点としては、i18next.t()関数で配列を使用する場合、配列内のキーの順序が重要であることです。

また、配列内のキーが多い場合、翻訳ファイルの定義に注意する必要があります。



----------------------------------------

# Plugins

プラグイン

i18nextには、利用可能な機能を強化するための多くのモジュールが付属しています。
以下のようなモジュールがあります:

* httpフェッチまたはファイルシステム(Node.js、Deno)からリソースをロードする。
* 例えばi18next-localstorage-backendを使用してリソースをキャッシュします。
* クエリストリング、ナビゲータ、クッキー、...によってユーザーの言語を検出します。
* 例えば sprintf サポートを追加するためなど。



```
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import sprintf from 'i18next-sprintf-postprocessor';

i18next
  .use(Backend) // or any other backend implementation
  .use(LanguageDetector) // or any other implementation
  .use(sprintf) // or any other post processor
  .init(options);

```

このコードは、i18nextを使用して、バックエンド、言語検出、ポストプロセッサを設定する方法を示しています。

i18nextをインポートし、Backend、LanguageDetector、sprintfをインポートしています。

i18next.use()関数を使用して、Backend、LanguageDetector、sprintfを設定しています。
Backendは、i18nextのバックエンドを設定するために使用されます。
LanguageDetectorは、ブラウザの言語を検出するために使用されます。
sprintfは、i18nextのポストプロセッサを設定するために使用されます。

使い方の詳細については、プラグインのドキュメント（リポジトリの readme ファイルまたは npm ウェブサイト）を読んでください。

なぜこのようなプラグインが必要なのかわからない場合は、最初のセットアップのヘルプページを見てください。

独自のプラグインを作るのが好きですか？



----------------------------------------

# HOW TO

# Add or Load Translations

i18nextを使って翻訳されたアプリに翻訳を読み込む方法はいくつかあります。
一番よく使われる方法は、i18nextに「バックエンドプラグイン」というものを追加することです。
バックエンドプラグインは、ブラウザで翻訳を読み込むために xhr/fetch リクエストを使うものから、Node.jsでデータベースやファイルシステムから翻訳を読み込むものまで、いろいろな種類があります。


Add on init

initで翻訳を追加できます。

```
import i18next from 'i18next';

i18next
  .init({
    resources: {
      en: {
        namespace1: {
          key: 'hello from namespace 1'
        },
        namespace2: {
          key: 'hello from namespace 2'
        }
      },
      de: {
        namespace1: {
          key: 'hallo von namespace 1'
        },
        namespace2: {
          key: 'hallo von namespace 2'
        }
      }
    }
  });

```

initの後に追加

initの後に翻訳を追加できます。



```
import i18next from 'i18next';

i18next.init({ resources: {} });
i18next.addResourceBundle('en', 'namespace1', {
  key: 'hello from namespace 1'
});

```

リソースの取り扱いについては↓こちらをご覧ください。

https://www.i18next.com/overview/api

少なくとも、init時に空のリソースオブジェクトを渡すようにしてください。そうしないと、i18nextは翻訳をロードしようとして、バックエンドを使用していないという警告を出します。



### Combined with a backend plugin

バックエンドプラグインとの組み合わせ

バックエンドのプラグインを使って翻訳を遅延ロードしたい場合、partialBundledLanguages: true オプションを使う必要があるかもしれません。
これにより、いくつかのリソース (あるいはリソースなし) を初期化時に設定し、他のリソースはバックエンドコネクタを使ってロードできるようになります。

ns オプションを設定することもできます。
名前空間を読み込まない場合は空の配列に (デフォルトの名前空間である 'translation' も使用しません)、あるいは読み込む名前空間を含む配列に設定します。

```
import i18next from 'i18next';

i18next.init({
  partialBundledLanguages: true,
  ns: [],
  resources: {}
});
i18next.addResourceBundle('en', 'namespace1', {
  key: 'hello from namespace 1'
});
// or via backend
// i18next.loadNamespaces(['myNamespace1', 'myNamespace2'])
// i18next.loadLanguages(['de', 'fr'])
// etc.

```

### Lazy load in memory translations

メモリ内の翻訳を遅延ロードする

i18next-resources-to-backendはリソースをi18nextバックエンドに変換するのに役立ちます。つまり、webpack を使用する場合などに、翻訳を遅延ロードすることもできます。

```
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({ /* other options */ })

```

### Load using a backend plugin

バックエンド・プラグインを使ってロードする

各プラグインには、リソースをロードするパスなどの設定セットが付属しています。
これらの設定は各リポジトリのreadmeファイルに記載されています。

ここではi18next-http-backendを使用してサーバーからリソースを読み込むサンプルを示します。


```
import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

```



リソースを定義することとバックエンドを持つことの組み合わせは、どちらか一方のソースをフォールバック・リソースとして暗黙のうちに受け取ることはありません。
フォールバックが必要な場合は、i18next-chained-backendを使用してください。
短い例が↓ここにあります。
i18next-chained-backendを使用すると、キャッシュ動作を作成することもできます。

https://github.com/i18next/i18next-http-backend/blob/master/example/fallback/app.js


What's a plugin?

🎓 i18nextのクラッシュコースのビデオでこのトピックをチェックしてください。

https://www.youtube.com/watch?t=953&v=SA_9i4TtxLQ&feature=youtu.be


### Load using a smart backend plugin serving directly from a CDN

CDNから直接提供するスマートなバックエンドプラグインを使用してロードします。

i18next-locize-backendを使用するだけで、CDNからリソースをロードできます。

```
import i18next from 'i18next';
import Backend from 'i18next-locize-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      projectId: '[PROJECT_ID]',
      apiKey: '[API_KEY]',
      referenceLng: '[LNG]'
    }
  });

```

React.jsを使ったアプリを作るときに、i18nextとlocizeを組み合わせると、簡単に翻訳を管理できます。この方法を使うと、開発者が翻訳を管理するのがとても簡単になります。また、自動翻訳機能を使うことで、新しい翻訳キーを追加すると、自動的に翻訳されます。

locizeは、i18nextプロジェクトのための完璧な翻訳管理ツールです。



----------------------------------------

# Extracting translations

翻訳の抽出

ある時点で、新しい翻訳キー/値を名前空間(翻訳)ファイルにどのように取り込むかという疑問にぶつかるでしょう。

### 1) 手動で新しい文字列を追加する

確かにこれは新しい翻訳を追加するための最も効率の悪い方法ですが、 多くのプロジェクトがこれをやっていることは知っています。開発者が余計な手間を省けるだけで、実際には何の問題もありません。

### 2) 抽出ツールを使う

i18next-scanner、i18next-parser、babel-plugin-i18next-extractはこの目標を達成するための賢明な選択です。
あるいは、translation-checkを試してみてください。どのキーがまだ翻訳されていないかチェックしてください。
抽出ツールの詳細については、プラグインとユーティリティのドキュメントページを参照してください。

### 3) ランタイム抽出

I18nextには、ランタイム中に解決できなかったすべてのキーを添付のバックエンドを使って送信する設定があります。

httpバックエンドの場合、init時にsaveMissing: trueを設定するだけです：

```
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en", // use en if detected lng is not available
    saveMissing: true // send not translated keys to endpoint
  });

export default i18n;

```

不足している翻訳がどこに送信されるかのオプションを確認してください。

node.jsとexpressをお使いですか？そのエンドポイントは無料で入手できます。

https://github.com/i18next/i18next-http-middleware#add-routes

これはreact-i18nextで作業する最も便利な方法です: 翻訳が自動的に追加されるので、カタログに翻訳を追加することをあまり気にせずに、アプリケーションを開発して実行するだけです。

このプロセスをステロイドにしたいですか？提供されているバックエンドを使用してlocize.comのローカリゼーションプロジェクトをフックアップするだけで、真の継続的なローカリゼーションプロセスでsaveMissingと翻訳のロードの両方が自動化されます。このチュートリアルをご覧ください！



----------------------------------------

# Caching

### Browser caching with local storage

ローカルストレージによるブラウザキャッシュ

i18nextでは、ブラウザで使用するキャッシュレイヤーを設定できます。これは localStorage からリソースをロードしてキャッシュし、連鎖するバックエンドと組み合わせて使うことができます。



```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        LocalStorageBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });

```

More information can be found here:
i18next-chained-backend
i18next-localstorage-backend
i18next-http-backend



### Server side caching with filesystem

ファイルシステムによるサーバーサイド・キャッシング

i18nextでは、サーバーサイドで使用するキャッシュレイヤーを設定できます。これはファイルシステムからリソースをロードしてキャッシュし、連鎖バックエンドと組み合わせて使用できます。



```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import FsBackend from "i18next-fs-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        FsBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        loadPath: './locales_cache/{{lng}}/{{ns}}.json',
        addPath: './locales_cache/{{lng}}/{{ns}}.json' // make sure the folders "locales_cache/{{lng}}" exists
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });

```

More information can be found here:
i18next-chained-backend
i18next-fs-backend
i18next-http-backend


### React-native caching with AsyncStorage

i18nextを使用すると、react-nativeで使用するキャッシュレイヤーを設定できます。AsyncStorageからリソースをロードしてキャッシュし、連鎖バックエンドと組み合わせて使用することができます。

```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import AsyncStorageBackend from "i18next-async-storage-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        AsyncStorageBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });

```

More information can be found here:
i18next-chained-backend
i18next-async-storage-backend
i18next-http-backend



### Server side Next.js caching with filesystem

ファイルシステムを利用したサーバーサイドNext.jsキャッシング

ファイルシステムを使った通常のサーバーサイドキャッシングと同様に、next-i18nextと組み合わせてNext.jsアプリで同じアプローチを使うことができます。ファイルシステムからリソースをロードしてキャッシュし、連鎖バックエンドと組み合わせて使用できます。

設定ファイルはおそらくこれに似ていますが、より完全な例として、locizeによるこの例をご覧ください。

```
// next-i18next.config.js
const ChainedBackend = require('i18next-chained-backend')
const FSBackend = require('i18next-fs-backend/cjs')
const HttpBackend = require('i18next-http-backend/cjs')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    backends: [
      FSBackend,
      HttpBackend
    ],
    backendOptions: [{ // make sure public/locales_cache/en and public/locales_cache/de exists
      loadPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      addPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
    }, {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }]
  },
  use: [ChainedBackend],
  ns: ['common', 'footer', 'second-page'], // the namespaces needs to be listed here, to make sure they got preloaded
  serializeConfig: false, // because of the custom use i18next plugin
  // debug: true,
}

```

More information can be found here:
next-i18next-locize example
i18next-chained-backend
i18next-fs-backend
i18next-http-backend

i18next-chained-backendとsaveMissingまたはupdateMissingを組み合わせて複数のバックエンドを使用しないことをお勧めします。



----------------------------------------

# Backend Fallback

ローカル翻訳を使用するフォールバックを定義しますか？

### Browser fallback with local / bundled translations

i18nextでは、ブラウザで使用されるフォールバックバックエンドを設定することができます。
i18nextはプライマリバックエンド(この場合httpバックエンド)からロードを試み、プライマリバックエンドが到達不可能もしくは翻訳を提供しない場合、2番目のバックエンド(この場合ローカルもしくはバンドルされた翻訳)が使われます。
これはすべて連鎖バックエンドのおかげです。



```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

const bundledResources = {
  en: {
    translations: {
      key: 'value'
    }
  }
};

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend(bundledResources)
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });

```



### You can also lazy load the in memory translations, i.e. when using webpack

メモリ内の翻訳を遅延ロードすることもできます。

```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend((lng, ns) => import(`./locales/${lng}/${ns}.json`))
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });

```

More information can be found here:
i18next-chained-backend
i18next-resources-to-backend
i18next-http-backend

### Server side fallback with filesystem

ファイルシステムによるサーバー側のフォールバック

サーバーサイドでは、インメモリーフォールバックの代わりにi18next-fs-backendを使うこともできます。

```
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import FsBackend from "i18next-fs-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        HttpBackend,
        FsBackend
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }, {
        loadPath: './locales_cache/{{lng}}/{{ns}}.json'
      }]
    }
  });

```

More information can be found here:
i18next-chained-backend
i18next-fs-backend
i18next-http-backend

i18next-chained-backendとsaveMissingまたはupdateMissingを組み合わせて複数のバックエンドを使用しないことをお勧めします。



----------------------------------------

# FAQ

Misc

英語の「miscellaneous」の略語で、様々な種類のものや、他のカテゴリーに分類されないものを指します。
プログラミングの文脈では、しばしば「Misc」というカテゴリーが使用され、様々な種類の関数や変数、定数などが含まれます。



### i18next is awesome. How can I support the project?

i18nextは素晴らしい。どのようにプロジェクトをサポートできますか？

私たちをサポートする方法はたくさんあります。リクエストされた機能のPRをする。ドキュメントを改善する。他の人が始めるのを手伝う。情報を広める。

さらに、locize.com - サービスとしてのローカリゼーション - を試してみてください。i18nextに寄付するようなものですが、あなたのプロジェクトの翻訳時間を節約するような追加的な利点があります。



### Loading issues

読み込みの問題

翻訳が表示されません！

init時にdebug: trueを設定し、コンソールログを確認してみてください。
loadPathを解決できないか、無効なjsonの警告が表示されるはずです。ブラウザから翻訳ファイルにアクセスできるか確認してください。



### Translation

#### How to translate the resource files?

リソースファイルを翻訳するには？

手早く機械翻訳を行うには、この無料翻訳機をご利用ください。
しかし、一般的には、i18nextリソースを翻訳するためにlocizeのようなスマートな翻訳管理サービスを使用することをお勧めします。

プロフェッショナルな翻訳のためには、人間の翻訳者と仕事をすることをお勧めします。または、少なくとも機械翻訳の結果を校正してください。



#### How do i know which plural suffix i have to use?

どの複数形接尾辞を使うべきか、どうすればわかりますか？

複数形のページに、それらを取得するツールがあります。
または、translation-checkを試してみてください。適切な複数形も表示されます。
または、locizeのようなスマートな翻訳管理システムを使うこともできます。



#### Why are my plural keys not working?

複数キーが機能しないのはなぜですか？

開発コンソールにこのような警告が表示されていませんか？

i18next::pluralResolver： あなたの環境はIntl APIと互換性がないようです。compatibilityJSON v3 フォーマットの処理にフォールバックします。

v21では、接尾辞をIntl APIで使用されているものにスリム化しました。

Intl.PluralRules APIが利用できない環境（古いAndroidデバイスなど）では、Intl.PluralRules APIをポリフィルする必要があるかもしれません。
これが利用できない場合、i18next JSONフォーマットv3の複数形処理にフォールバックします。また、jsonがすでに新しい接尾辞を使用している場合、複数形のキーはおそらく表示されません。

tldr;

「tldr;」は、「Too Long; Didn't Read」の略語で、長い文章やドキュメントの要約を表します。
この表現は、主にインターネット上で、長い記事やドキュメントに対して、要約を求める場合に使用されます。
また、長い文章を書く際に、最後に「tldr;」と簡潔な要約を記載することもあります。

```
npm install intl-pluralrules

import 'intl-pluralrules'

```

#### How should the language codes be formatted?

言語コードはどのようにフォーマットすべきでしょうか？

理論的には、特定の言語コードフォーマットに縛られることはありませんが、適切な複数形や正しいフォールバック解決など、組み込まれている言語機能をすべて利用したい場合は、以下のiso規範（BCP 47言語タグ）を使用することを強くお勧めします：

lng-(スクリプト)-REGION-(拡張子)

すなわち

* en, en-US または en-GB
* zh, zh-HK または zh-Hant-HK

その他の例は↓こちらです。

https://www.iana.org/assignments/language-tags/language-tags.xhtml

また、フォーマットに関するより詳しい情報は↓こちらをご覧ください。

https://www.w3.org/International/articles/language-tags/



### Process

#### How do I keep overview over my translation progress?

翻訳の進捗状況を確認するには？

translation-checkをお試しください。美しいUIで翻訳の概要を表示します。どのキーがまだ翻訳されていないか確認してください。

さらに翻訳が必要な場合は、翻訳管理ツールを使用することをお勧めします。



#### How to handle with changes in e2e tests?

e2e テストで変更があった場合の対処法は？

e2eテストでは、init時に言語をcimodeに設定するのが良い方法です。
これにより、i18next.t を呼び出すと常にキーを返すように i18next が設定されます。
返される値に名前空間を追加したい場合は、init で appendNamespaceToCIMode: true を変更してください。



#### How to use i18next in serverless environments?

サーバーレス環境でi18nextを使うには？

サーバーレス関数の仕組み上、データのキャッシュバージョンが利用可能であることを保証することはできません。サーバーレス関数は短命であり、いつでもシャットダウンすることができ、メモリ内またはファイルシステムのキャッシュを消去することができます。これは許容できるトレードオフかもしれないが、許容できない場合もある。

このため、リモートのバックエンドを使用せず、翻訳をダウンロードしてサーバーレス関数と一緒にパッケージ化することをお勧めします。



----------------------------------------

# MISC

# JSON Format

i18next JSONには、バージョン1から4までの4つのバージョンがあります。
バージョンが上がるにつれ、複数の複数形形式を持つ言語の複数形処理の方法が変更されています。
また、バージョン4では、Intl.PluralRulesAPIが使用されるようになり、バージョン3以前とは異なる複数形処理の方法が導入されています。

バージョン2以降では、ネストやインターポレーションの形式が設定可能になっています。
バージョン1から4までの詳細なフォーマットについては、それぞれのセクションで説明されています。
Intl.PluralRules API
複数形の形式を決定するためのAPIです。


このAPIは、言語によって異なる複数形の形式をサポートしており、複数形の形式を決定するために、数値を入力するだけで簡単に使用できます。
このAPIは、i18nライブラリなどで広く使用されています。
ただし、このAPIはすべてのブラウザでサポートされているわけではないため、必要に応じてポリフィルを使用する必要があります。



### i18next JSON v4

```
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyInterpolateWithFormatting": "replace this {{value, format}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple_one": "the singular",
  "keyPluralSimple_other": "the plural",
  "keyPluralMultipleEgArabic_zero": "the plural form 0",
  "keyPluralMultipleEgArabic_one": "the plural form 1",
  "keyPluralMultipleEgArabic_two": "the plural form 2",
  "keyPluralMultipleEgArabic_few": "the plural form 3",
  "keyPluralMultipleEgArabic_many": "the plural form 4",
  "keyPluralMultipleEgArabic_other": "the plural form 5",
  "keyWithArrayValue": ["multipe", "things"],
  "keyWithObjectValue": { "valueA": "return this with valueB", "valueB": "more text" }
}

```

これらはデフォルトです。ネスティングと変数埋め込み 形式は設定可能です。

機能の詳細については、ドキュメントを参照してください。

* Interpolation
* Formatting
* Plurals
* Nesting
* Objects and Arrays

v3との唯一の違いは、複数形の接尾辞です。

Intl.PluralRules APIをポリフィルする必要があるかもしれませんが、利用できない場合はi18next JSONフォーマットv3の複数形処理にフォールバックします。

既存の翻訳を新しいv4フォーマットに変換するには、i18next-v4-format-converterかこのウェブツールを見てください。(これはデフォルトの pluralSeparator _ を持つキーのみを扱います)

v3-v1は省略



----------------------------------------

# Creating own Plugins

省略


----------------------------------------

# Migration Guide

移行ガイド

v22.x.x to v23.0.0

省略


----------------------------------------

# The history of i18next

i18nextの歴史

省略



----------------------------------------

# Testimonials

推薦文

お客様の声



----------------------------------------

# 参考URL

# 情報源

Introduction - i18next documentation

https://www.i18next.com/
