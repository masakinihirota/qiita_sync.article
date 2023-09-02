<!--
title:   VSCodeで編集するよりも、外部エディタで編集したい時の拡張機能 ＞＞＞ 秀丸エディタ 
tags:    OpenInEditor,hidemaruEditor,秀丸エディタ
id:      2148391b298019b1ffec
private: false
-->
# 使う理由

VSCodeよりも秀丸エディタを使いたい時があります。
(日本語入力、マクロやグレップ機能 他)

そんな時この拡張機能を入れておいて、外部エディターで編集出来るようにしておけばその場ですぐにファイルが開けて便利です。



# サポートしているエディタ

Atom Editor
Emacs
IDEA 14 Community Edition
Sublime Text
PhpStorm
Vim
Visual Studio
WebStorm

※秀丸はサポートされてないので、直接設定をします。



# 拡張機能のインストール

Open in Editor - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=generalov.open-in-editor-vscode



## 拡張機能の設定

VSCodeの setting.json を開きます。

```setting.json
  "alt-editor.binary": "C:\\tool\\hidemaru.exe",
  "alt-editor.args": "/j{line},{column} {filename}"

```

上の行が秀丸エディタへのパスです。（パスは各自の環境に合わせてください）
下の行がVSCodeの中身をエディタに渡す命令です。

※パスを入力する時は\キーでパスの区切り文字をエスケープする必要があります。
※秀丸側は何も設定する必要はありません。



## 外部エディターの開き方

右クリックメニューから
 `Open in External Editor`
を選択します。

もしくは↓ショートカットで開きます。

`Shift + Alt + e`

(このショートカットキーはデフォルト値です、各自自由に設定してください。)