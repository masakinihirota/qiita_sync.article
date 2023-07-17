<!--
title:   VScode 属性値を折りたたむ 拡張機能 「Inline Fold」 TailwindCSS
tags:    SVG,VSCode,fold,inline,tailwindcss
id:      ae8dbdea9c18b40a9db0
private: false
-->
# Marketplace
Inline Fold
https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold

# VScode 拡張機能 Inline Foldとは
**属性値**を折りたたんでソースコードを見やすくしてくれます。
特にTailwindCSS等の **属性値** が長くなる場合に非常に効果的です。

## 基礎知識
開始タグに機能を追加するものを「属性」と言い
また、属性に指定されている値を**属性値**と言います。

### HTMLの基本

| 名称 | HTMLタグの書式 |英語|
|:-:|:-:|:-:|
| 要素 | `<p className="mt-4 text-xl">サンプル</p>`|
| 開始タグ | `<p className="mt-4 text-xl">`  |
| 属性 |  `className` |
| **属性値** | `"mt-4 text-xl"`  |An attribute value |
| コンテンツ  | `サンプル`  |
|  終了タグ | `</p>`  |



「[Inline fold](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold)」拡張機能を使うとこの**属性値**を折りたたみます。

```html
<p className="mt-4 text-xl">
```

これが

```html
<p className="。。。">
```

と短くなります。

また

```html
<a href="https://nextjs.org/learn"
   className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
>
```

このように長くても

```html
<a href="https://nextjs.org/learn"
   className="。。。"
>
```

と短くなります。

href属性も設定すると

```html
<a href="。。。"
   className="。。。"
>
```

と短くなります。

## マーケットプレイスからインストール

[Inline fold - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold)

## VScodeの拡張機能からインストール

コマンドパレットを開きます。

Windows : `Ctrl + Shift + P`
Mac : `Cmd + Shift + P`

`inline Fold` で検索します。

![加工済み01.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/234fce43-844f-083d-33ea-c3e2fb612c3c.png)

インストールするだけでTailwindCSSの部分は折り畳めるようになります。

## ショートカットキーを設定する

VScodeの設定を開きます。
※左下の歯車アイコンから「キーボードショートカット」を選択します。
`inline Fold Toggle`
を入力します。

ショートカットキーを設定します。
例えば `Ctrl + Alt + A` と設定します。（現在の自分の設定）

## 使用前、使用後
### 使用前
![02.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/a9081710-07b3-f2d8-e10b-0d6a8727080b.png)


### 使用後：TailwindCSSの箇所を折りたたむ
![03.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1c63941b-0ac7-1a32-2f05-08e14ea3ed97.png)



## 応用編：hrefを折りたたむ

`VScode 拡張機能 Inline Fold` の正規表現を変更して適用箇所を増やします。

VScodeの設定を開きます。
※左下の歯車アイコンから「設定」を選択します。

`inline fold regex`と入力します。

settings.jsonに書き出しておいたほうが便利なので設定をコピーしてsettings.jsonに貼り付けます。

やり方は、設定項目の左にある歯車から「JSONとして設定をコピー」を選択します、コピーしたものをsettings.json貼り付けます。

デフォルト値は
`
  "inlineFold.regex": "(class|className)=(({(`|))|(['\"`]))(.*?)(\\2|(\\4)})"
`

ですが、hrefも折りたたみの対象にするために `|href` を追加します。

```
  "inlineFold.regex": "(class|className|href)=(({(`|))|(['\"`]))(.*?)(\\2|(\\4)})"
                                       ^^^^^ 追加
```
このやり方を覚えれば、他のオプションも追加出来ます。

![04.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1dd3c79a-f60e-a8f0-0a1f-fbf1d7a639ed.png)

これでかなり見やすくなりました。

## オプション
```
inlineFold.regex コード行にマッチする正規表現
inlineFold.regexFlags 正規表現フラグ
inlineFold.regexGroup 折り返すべきコードにマッチする正規表現グループ
inlineFold.unfoldedOpacity クリックされたとき、または選択されたときの、折り畳まれていないコードの不透明度
inlineFold.maskChar 折り畳まれたコードをマスクするためのテキスト/文字
inlineFold.maskColorマスクする文字の色。
inlineFold.after 折り畳まれたコードの末尾に追加されるテキスト/文字(オプション)
inlineFold.supportedLanguages 対象言語のIDリスト（※）
inlineFold.unfoldOnLineSelect 行の一部が選択されたときに、その行を展開する。
inlineFold.autoFold ファイルを開いたときのインライン折りたたみのデフォルト状態
```

※対象言語のIDリスト
```
vue
html
svelte
vue-html
php
blade
erb
twig
nunjucks
django-html
jinja-html
javascript
typescript
javascriptreact
typescriptreact

```

## その他の便利な機能
「マウスポインターで折りたたみ箇所をクリックする」もしくは「カーソルを折りたたみ箇所に移動させる」
そうするとプロパティ部分が自動で展開します。


## 問題点
[Tailwind CSS IntelliSense - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

この拡張機能と一緒に使うとプロパティ部分は非表示になりますが、しかし色のアイコンだけ折りたたまれない時があります。
正規表現で判断しているので色のアイコンを完全に捕捉出来ないと思われます。
（ページ間を移動したりして戻った時に消えている時があります。）

![加工済み 05.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/aac9d600-408d-8715-6035-23e7ec935ab8.png)



## その他

### 設定された文字数以上の場合折りたたむ
```
Regex to Match: (class|className)=[`'{"]([^`'"}]{30,})[`'"}]
Regex Flags: g
Regex Group: 2
```

### SVG
`
Regex to Match: <svg(\s*.*?\s*)<\/svg>
Regex Flags: gs
Regex Group: 2
`

### Markdown links
`
Regex: \[.*\]\((.*)\)
Regex Flags: g
Regex Group: 1
Supported languages: markdown
`


# その他の便利拡張機能
Tailwind CSS クラスをソートしてくれます。
[Headwind - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind)



# 参考
紹介動画（英語）
https://www.youtube.com/shorts/4VUaoUAaMQg
