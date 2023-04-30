<!--
title:   VSCodeでmarkdownを書いたらhtmlへ自動変換する。
tags:    HTML,Markdown,VSCode
id:      7d05c08d6138ae973e90
private: false
-->
# markdownをhtmlに変換したい。
調べてみるとpandocとか外部アプリ？が必要だったりと色々面倒なのですが
これは拡張機能を一つ入れるだけで手軽に出来ます。

# インストール拡張機能「markdown-pdf」
[vscode-markdown-pdf/README.ja.md at master · yzane/vscode-markdown-pdf](https://github.com/yzane/vscode-markdown-pdf/blob/master/README.ja.md)

本来PDFに変換するものですが
HTMLにも変換できます。

変換できる全フォーマット
（PDF、html、png、jpeg）

# インストール方法
Ctrl+p もしくは F1キーから
「pdf」で検索
「Markdown PDF」をインストールします。

# 設定を書き込む
ファイル＞基本設定＞ユーザー設定

`settings.json
// 自動セーブ
"markdown-pdf.convertOnSave": true,
// 出力フォーマット: pdf, html, png, jpeg
"markdown-pdf.type": "html",
`
を追加する。
※デフォルトではPDFが出力される。

設定が終了したらVSCodeを再起動します

※不満点
出力先を指定できない
（複数ファイルで利用した場合すべて1箇所に集まってしまう）
mdファイルはすべてhtmlに変換される。
（指定したファイルだけhtmlファイルに変換できないか？）