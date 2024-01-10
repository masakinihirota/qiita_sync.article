<!--
title:   Underscore.js テンプレート機能でfunction (n){return a.call(this,n,h)} と表示される。
tags:    JavaScript,Underscore.js
id:      aa2c36e61cc4838c8cb6
private: false
-->
[ドットインストール](http://dotinstall.com/)で ~~遊んで~~ 勉強している時にエラーが出てきたので対処した話。

# 環境
Windows7 64bit
ブラウザ Chrome
javascript node v0.10.35
Underscore.js v1.7.0
Underscore.js v1.4.4

# 勉強していた動画
[Underscore.js入門
＃10 テンプレート機能を使ってみよう]
(http://dotinstall.com/lessons/basic_underscorejs/22310)

# 問題
コンソールに
function (n){return a.call(this,n,h)}
と表示される。

# 解決
Stack Overflowにありました。

[javascript - underscore template error: function (n){return a.call(this,n,h)} - Stack Overflow]
(http://stackoverflow.com/questions/26560838/underscore-template-error-function-nreturn-a-callthis-n-h)

要は、第二引数のuserが読み込まれてないのでもう1段階間にいれる。

## 問題部分

```js:Underscore.html（抜粋）

var tpl = "<li><%- name %> (<%- score %>)</li>";
var x = _.template(tpl, user);
console.log(x);
```
↓
## 修正

```js:Underscore.html（抜粋）
var tpl = "<li><%- name %> (<%- score %>)</li>";
var answer = _.template(tpl);
var result = answer(user)
console.log(result);
```


## ソース

```js:Underscore.html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
	<script src="underscore-min.js"></script>
	<script>
		(function() {

			var x;
			var user = {
				name: 'taguchi',
				score: 80,
				web: 'http://www/dotinstall.com'
			};
			var tpl = "<li><%- name %> (<%- score %>)</li>";

			var answer = _.template(tpl);
			var result = answer(user)
			console.log(result);

		})();
	</script>
</body>
</html>
```


後記
ソースを眺めてみても間違ったところはないし、動画と結果が違うし何が悪いのか、ChromeDeveloperToolsでみても代入される文字列は想定とは違うものが代入されている、Underscore.jsのバージョンまで合わせて探してきて使ってみたが結果は同じ。
ググってみてようやく何とかなったが、なぜ第二引数のデータが読み込まれなかったのか？動画と何故違いが出たのか？は謎のまま。