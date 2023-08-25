<!--
title:   VSCodeでTypeScriptを気軽に実行する環境を作る。部分実行も可能
tags:    CodeRunner,TypeScript,VSCode
id:      7ee5c2aa405c2b37d1c5
private: false
-->
VSCodeでRubyを気軽に実行する環境を作る。 - Qiita
https://qiita.com/masakinihirota/items/ec90086bab86f369fa15
これのTypeScript版です。
同じくVSCodeの拡張機能であるCodeRunnerを使います。

# VSCodeにTypeScriptが動く環境を追加します。

node.jsが入っていれば`ts-node`というコマンドでTypeScriptファイルは実行できるのですが、いちいちコマンドラインから入力するのは面倒なのでショートカットキーを使って一発で動作確認出来るようにします。

## 環境
Windows10
[Node.js v14.16.1](https://nodejs.org/ja/)
VSCodeには、いろいろカスタマイズしてインストール済み。

# TyepScriptとts-nodeのインストール
**（重要）TypeScriptのファイルをCodeRunnerで実行するためには`typescript`と`ts-node`をグローバルインストールする必要があります。** これはどんな場所でも実行できるようにするための必要な措置です。

`npm install -g typescript ts-node`

## TypeScriptのインストールを確認する。
VSCodeを立ち上げ、TypeScriptがインストールされているかどうかを見ます。

VSCodeのメニューから
表示＞総合ターミナルでターミナルを立ち上げます。

VSCodeのターミナルから

```
> tsc -v
Version 5.2.2

> ts-node -v
v10.9.1

```
# 拡張機能CodeRunnerをインストール

![CodeRunner.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/eb0eb5d8-2068-8d00-0658-a4bec1e9b5ef.png)

１，左サイドバーの拡張機能を選択。
２，検索窓から「code runner」を入力します。
拡張機能インストール候補リストから「Code Runner」をインストールします。

# VSCode のsettings.json
TypeScriptを実行するために下記の設定をします。
VSCodeのsettings.jsonに追記します。

`code-runner.executorMap`はCodeRunnerでデフォルトで設定されているファイルタイプに実行時オプションを付けたい時に設定します、オプションを付ける必要がない時は設定する必要はありません。(下記の設定例はオプションが付いていないので設定しなくてもJavaScriptファイルやTypeScriptファイルは実行されます。)
(`clear`を付けることでターミナルを一旦キレイにしてから実行しています。)

```VSCode:settings.json
  "code-runner.executorMap": {
    "javascript": "clear; node",
    "typescript": "clear; ts-node"
  },
```

# 注意
今、実行したいTypeScriptファイルの場所に`tsconfig.json`が無い場合は下記の設定は不要です。CodeRunnerは動きます。

あるプロジェクトで既に`tsconfig.json`がある場合、このファイルの設定の中で`isolatedModules`が`true`になっている場合はエラーとなります。`false`に設定し直すことでCodeRunnerでも動くようになります。

設定例
TypeScriptの設定ファイル

```tsconfig.json
{
  "compilerOptions": {
    "isolatedModules": false,
}

```

他には
VSCodeファイルが認識するファイルタイプがTypeScriptになっているか確認してください。
（VSCodeの下部にファイルタイプが表示されています）
デフォルトの設定では`*.ts`ファイルはTypeScriptファイルであると認識されるので下記の設定は不要です。

他の拡張子でもTypeScriptファイルとして動かしたい場合は設定を書く必要があります。
注意：この設定は拡張子をある特定のファイルタイプに結びつけるものなので、スニペットの設定などをしていると無効になってしまう場合があります。

VSCodeの設定ファイル

```setting.json
  // 拡張子に対応するファイルタイプ
  "files.associations": {
    "*.tsx": "typescript"
  },

```

### お試し用プログラム
一旦VSCodeを再起動させてから、
TypeScriptファイルを作成するフォルダを作ります。
VSCodeでそのフォルダを開いてTypeScriptファイルを作成しファイルを新規作成しファイルの拡張子を「.ts」にします。

```TypeScript:typescript.ts
const main = () => {
  console.log('Hello!');
  console.log("Hello!");
  console.log("Hello!");
};

main();

```

コマンドパレット（Ctrl + Shift + p）を開き、
`run code`
と検索して、コマンドを選び実行します。

ショートカットはctrl + alt + N

実行結果

```
> ts-node "c:\{現在のフォルダ}\typescript.ts"
Hello!
Hello!
Hello!
```

※JavaScriptファイルにコンパイルをしているので少々時間がかかります。

# 部分実行
CodeRunnerはコードの一部だけを実行する機能もあります。
例えば
`console.log('Hello!');`部分を選択してからCodeRunnerを実行します。そうすると選択した部分だけ実行されます。

また、このように2行を

```
  console.log("Hello!");
  console.log("Hello!");
```
範囲選択して囲んで実行すると

```
Hello!
Hello!
```
このように2行だけ命令が実行され結果が表示されます。

# CodeRunnerのデフォルトで動く言語

TypeScript以外でも
java, c, cpp, javascript, php, python, perl, ruby, go, lua, groovy, powershell, bat, shellscript, fsharp, csharp, vbscript, typescript, coffeescript, swift, r, clojure, haxe, objective-c, rust, racket, ahk, autoit, kotlin, dart, pascal, haskell, nim, d, lispが特に設定せずに使用可能です、他の言語もコマンドを設定すれば可能です。

### 独自設定
自分の場合は、ショートカットを設定しています。
ファイル＞基本設定＞キーボードショートカット
`run code`で検索して、
キーバインドのCtrl + 1 に設定しています。

### その他 設定のオプション
Code Runner - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner

### 2021/05/16 現在のcode-runner部分のsettings.json
現在未使用の設定部分はコメントアウト。

```VSCode:settings.json
  // 拡張機能 code-runner
  // code-runnerの表示をターミナルに変更
  "code-runner.runInTerminal": true,
  // code-runnerのコマンドをエディタ上での右クリックで表示しない
  "code-runner.showRunCommandInEditorContextMenu": false,
  // code-runnerのコマンドをエクスプローラー上での右クリックで表示しない
  "code-runner.showRunCommandInExplorerContextMenu": false,
  "code-runner.executorMap": {
    "javascript": "clear; node",
    "typescript": "clear; ts-node"
  // code-runner実行時にターミナルを一旦クリア
  "code-runner.clearPreviousOutput": true,

```

自分の環境では`code-runner.clearPreviousOutput`が効いていないので`clear`を設定しています。


## キーボードショートカットキーの設定
ファイル＞ユーザー設定＞キーボードショートカット
右上アイコンの「キーボードショートカットをひらく(JSON)」

もしくは
ctrl+shift+p
基本設定：キーボード ショートカットを開く(JSON)

### ショートカットキーの設定

ctrl+1 CodeRunnerの実行

ctrl+2 2種類設定しています。
エディタ本体にフォーカスがあるときはターミナルにフォーカスが移動します。
ターミナルにフォーカスがあるときはエディタ本体にフォーカスが移動します。

これはCodeRunnerを実行するとカーソルのフォーカスがターミナルに自動的に移動してしまうためエディタ本体に戻るためにこのようにしています。

```keybindings.json
    // CodeRunnerの実行
  {
    "key": "ctrl+1",
    "command": "code-runner.run"
  },
    // ターミナル間移動
    "key": "ctrl+2",
    "command": "workbench.action.terminal.focus",
    "when": "editorTextFocus"
  },
  {
    // ターミナル間移動
    "key": "ctrl+2",
    "command": "workbench.action.focusFirstEditorGroup",
    "when": "terminalFocus"
  },


```
