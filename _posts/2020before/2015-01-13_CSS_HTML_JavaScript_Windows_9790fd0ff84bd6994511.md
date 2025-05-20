<!--
title:   WindowsでHTMLやCSS、JavaScriptをLIVERELOADを使い勉強をする
tags:    CSS,HTML,JavaScript,Windows,プログラミング
id:      9790fd0ff84bd6994511
private: false
-->
初心者の方へ
1ファイルだけで簡単なプログラムを確認するだけならLIVERELOADの方が手軽です。

追記に書いてあるgulpは飛ばしてください。

HTML、css、javascript、coffeescript、sass、テストなどある程度わかってきて本腰入れて勉強するならgulpがオススメです。

# 追記
2015年1月23日
[Gulp.js入門 - コーディングを10倍速くする環境を作る方法まとめ | 株式会社LIG]
(http://liginc.co.jp/web/tutorial/117900)

Gulpを知りました、このページで触ってみると導入は色々と面倒ですが長期的に見るとこちらのほうが良いようですね。
設定は簡単ですが、まだ発展途上なのと、プラグインの数が少なく日本語情報もすくないようです。

[gulpを始める。gulp設定ファイルはcoffeescript（gulpfile.coffee）で書く gulp 3.8以降 - Qiita](
http://qiita.com/masakinihirota/items/d5b645d588ebecea5d4f)



# 目的
WindowsでJavaScriptをChromeブラウザ＋LIVERELOAD＋エディタでサクサクWEBプログラミングを勉強していきます。

教科書＆参考書を読んで手を動かしながらChromeで動作確認をしつつ勉強を進めます。
Chromeブラウザを選んだのはJavaScriptのデバッグ環境が一番良いからです。

# LIVERELOADとは
エディタからファイルを保存するとChromeブラウザがその変更を感知して再読み込みand実行してくれます。

### Chrome拡張のLiveReloadは動かなかった
Chromeウェブストアから
[Chromeウェブストア LiveReload ](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei"LiveReload)
これをchromeブラウザにインストールしてみましたが上手く動いてくれません、ですのでLiveReloadアプリをインストールします。

# LiveReloadアプリをインストール
[LiveReload http://livereload.com/](http://livereload.com/)
ここからLiveReloadのウィンドウズ版’Windows?Try LiveReload 0.9.2 Alpha’をダウンロードしインストールします。

### 注意１
アルファ版なのでファイルを別フォルダ等に移動したりすると追跡しきれずエラーが出たりします。

### 注意２
一旦勉強をやめて再び立ち上げる時は、最初にLiveReloadアプリを立ち上げてからブラウザを開き、そこに勉強するファイルをドラッグアンドドロップします。

ブラウザが先に立ち上がっていてファイルのページが開いている場合はまずそのページを閉じてからLiveReloadアプリを立ち上げましょう。

# インストール後

適当な場所に勉強するためのフォルダを作り、そこに勉強する適当なファイル（ここではtest.html）を作ります。

```html:test.html

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

	<script>
	// JavaScriptを書いていく場所
		console.log("Hello!");

	</script>

<!-- LIVERELOADの２、</body>タグの前に貼り付ける場所 -->
	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
	</script>
</body>
</html>

```

`<script></script>`の間にjavascriptを書いていき勉強していきます。

# LIVERELOADの設定をする

![LIVERELOAD2.png](https://qiita-image-store.s3.amazonaws.com/0/44761/5b9f49a8-d1df-c861-cd56-3bfef6f638a5.png)

３，勉強するファイル（test.html）をChromeブラウザ上にドラッグアンドドロップする。

# javascriptコンソールを開く。
javascriptコンソールはChromeブラウザの機能の一つです。開発者向けにWEBプログラムのデバックを強力に手助けしてくれます。

## javascriptコンソールの開き方
Chromeブラウザ上で Ctrl+Shift+J とショートカットから開きます。
Chromeブラウザのメニューからは、その他のツール＞javascriptコンソールと選びます。

※Chromeブラウザのデベロッパーツールとjavascriptコンソールは開く場所が違うだけで同じツールです。

あとは、参考書＆教科書で勉強したことを書いていったり写経（参考書＆教科書をコピーアンドペーストをせず自分の手で入力していく勉強方法）していきます。

## 保存はCtrl+S
これで保存するたびにブラウザが自動感知して実行してくれます。
保存はCtrl+Sとショートカットキーで一区切り毎に頻繁に保存していきましょう。

# 実行画面
![実行画面.png](https://qiita-image-store.s3.amazonaws.com/0/44761/9500f0f7-3d2d-aad9-dfd5-4d4463d30a6b.png)

# 終わりに
LIVERELOADを使えばその他のWEBプログラミングの勉強もサクサク進みます、ぜひLIVERELOADを使ってライフチェンジ（今までの習慣を捨て、新しい習慣を取り入れる）しましょう。

# その他
## ファイルを分ける（javascript）
javascriptを別のファイルで作りたいときは
htmlファイルの中に
`<script src="myscript.js" type="text/javascript"></script>`
を追記します。
myscript.jsは好きなファイル名を変更してください。
javascriptファイルの挿入場所は`</body>`タグの前に書きます。

## ファイルを分ける（css）
cssは別途test.cssを用意してそこに書いていきます。
htmlファイルの中に
`<link rel="stylesheet" type="text/css" href="test.css">`
を追記します。
test.cssは好きなファイル名を変更してください。
cssファイルの挿入場所は`<head></head>`タグの間に挿入します。



## 挿入例

```html:test.html

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="test.css">
</head>
<body>

// 勉強してHTMLを書いていく場所

	<script>
// 勉強してJavaScriptを書いていく場所
		console.log("Hello!");

	</script>

<!-- LIVERELOADの２、</body>タグの前に貼り付ける場所 -->
	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
	</script>
<script src="myscript.js" type="text/javascript"></script>
</body>
</html>

```



画面に表示するときは`console.log("Hello!");`をjavascriptコンソールで確認するとデバッグもしやすいです。

javascriptコンソールの使い方を勉強するには、
[Chrome Developer Tools入門 (全10回) ](http://dotinstall.com/lessons/basic_chrome_dev_v2)
を御覧ください。

エディタはSublimeText3がオススメです。
[Sublime Text: The text editor you'll fall in love with](http://www.sublimetext.com/)

デュアルディスプレイで勉強すると便利です。