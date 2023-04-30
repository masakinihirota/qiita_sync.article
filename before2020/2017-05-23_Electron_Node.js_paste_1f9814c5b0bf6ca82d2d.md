<!--
title:   electronアプリから他のアプリへpasteするには？のメモ。
tags:    Electron,Node.js,paste
id:      1f9814c5b0bf6ca82d2d
private: false
-->
# electronから他のアプリへPasteするには？
JavaScriptは基本的にセキュリティ上の理由から他のアプリへの干渉は出来ないようになっています。
[electron](https://electron.atom.io/)はサーバーサイドのJavaScriptである[node.js](https://nodejs.org/ja/)を使用するネイティブアプリです。
なのでその制限が少し緩和されています、
・・・がpasteのやり方がわからなかったので調査＆メモしました。

※electron内でのpasteはショートカットが最初のメニューにあるし出来るのだが、他のアプリへ送る方法がわからなかった。（globalShortcutにCtrl+V（paste）を簡単に登録する方法はないだろうか？）

※JavaScriptからはセキュリティ上の理由から失敗するように作られているようです。
参考
[document.execCommand が切り取り、コピー、貼り付けで例外を投げなくなりました | Firefox サイト互換性情報](https://www.fxsitecompat.com/ja/docs/2015/document-execcommand-for-cut-copy-and-paste-no-longer-throws/)

## 作成する機能
- electronアプリを立ち上げる。（割愛）
- フォーカスを別アプリに移動し（例えばエディタ 文字を入力できる場所ならどこでも）electronで設定した文字列を別アプリ上でペーストする。
- ショートカットキーは「F1キー」に設定する。
（ショートカットは他アプリと競合していると自動的に失敗するように作られています。）

調べた中で一番手軽にやる方法は[node-key-sender](https://www.npmjs.com/package/node-key-sender)を使用する。
これはキーボードを自分で押したような動作をさせることが出来る。（らしい）

### electronで使用するAPI
（基本的なウィンドウを作るAPI＆方法は割愛）

#### globalShortcut
[electron/global-shortcut.md at master · electron/electron · GitHub](https://github.com/electron/electron/blob/master/docs-translations/jp/api/global-shortcut.md)

※globalShortcutはapp（ウィンドウ）がreadyになるまで使ってはいけない、なのでapp（ウィンドウ）がready状態になった後にglobalShortcutを設定する。

#### clipboard
[electron/clipboard.md at master · electron/electron · GitHub](https://github.com/electron/electron/blob/master/docs-translations/jp/api/clipboard.md)

JavaRunTimeが必須なので
[「Java」Java言語で開発されたソフトを実行するために必要なランタイム - 窓の杜ライブラリ](http://forest.watch.impress.co.jp/library/software/javaruntime/)
からダウンロード＆インストール。

node-key-senderのインストール
`npm install --save node-key-sender`

## 以下全ソース

```js:main.js
"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

//paste機能に必要な宣言
const clipboard = require('electron').clipboard;
const globalShortcut = electron.globalShortcut
var ks = require('node-key-sender');
//テスト用文字列
var clipboard_msg = 'Copy!';

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

//app（ウィンドウ）をready状態にした後に
//グローバルショートカットを設定する。
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 260, height: 260});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //paste機能部分
  //グローバルショートカットの設定
  globalShortcut.register('F1', function () {
    //クリップボードへメッセージの登録
    clipboard.writeText(clipboard_msg);
    //ペーストする信号を送信
    ks.sendCombination(['control', 'v']);
  })

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

```

```html:index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>electron_paste</title>
</head>
<body>
  <p>electron_paste</p>
</body>
</html>
```

```json:package.json
{
  "name": "electron_paste",
  "version": "0.1.0",
  "description": "function paste",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "masakinihirota",
  "license": "MIT",
  "devDependencies": {
    "electron": "^1.6.1",
    "node-key-sender": "^1.0.9"
  }
}

```

これで他のアプリにペーストが出来るようになる。
使い方はエレクトロンアプリを立ち上げておいて、他のアプリ上でショートカットキー「F1」を押す。
テキスト入力を受け付けているところならばどこでもok


## 追記（2017年5月24日）
あるアプリで貼り付け行為がうまく動きませんでした。
そこでは貼り付けるだけで文字が決定されず仮の状態のままという・・・
そこで単純に決定ボタンを（「enter」キー）を挿入してみました。しかし、それでは命令の実行順が想定通り行かないのでsleep()を挟むように微調整をしました。

（エディタやエクセルなどに貼り付ける時には決定ボタンの追加はいりません、アプリによって使い分けてください。）

参考
[JavaScript(Node.js) で sleep() アラカルト- Qiita] (http://qiita.com/albno273/items/c2d48fdcbf3a9a3434db)

修正バージョン
追加部分1と追加部分2の二箇所を追加

```js:main.js
"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

//paste機能に必要な宣言
const clipboard = require('electron').clipboard;
const globalShortcut = electron.globalShortcut
var ks = require('node-key-sender');
//テスト用文字列
var clipboard_msg = 'Copy!';

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

//追加部分1
function sleep(time) {
    const d1 = new Date();
    while (true) {
        const d2 = new Date();
        if (d2 - d1 > time) {
            return;
        }
    }
}

//app（ウィンドウ）をready状態にした後に
//グローバルショートカットを設定する。
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 260, height: 260});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //paste機能部分
  //グローバルショートカットの設定
  globalShortcut.register('F1', function() {
    //クリップボードへメッセージの登録
    clipboard.writeText(clipboard_msg);
    //ペーストする信号を送信
    ks.sendCombination(['control', 'v']);
    //追加部分2
    sleep(100);
    //決定する信号を送信
    ks.sendCombination(['enter']);

  })

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

```