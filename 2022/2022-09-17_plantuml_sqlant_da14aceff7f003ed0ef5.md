<!--
title:   PlantUML入門 ER図を書く基本 for VSCode
tags:    ER図,plantuml,sqlant
id:      da14aceff7f003ed0ef5
private: false
-->

2023年6月23日 リニューアル

# コードのリポジトリ

今回紹介したコードのリポジトリ

https://github.com/masakinihirota/plantuml

※↓Chrome拡張機能をいれるとGitHub上でもER図として見ることが出来るようになります。

PlantUML Viewer

https://chrome.google.com/webstore/detail/plantuml-viewer/legbfeljfbjgfifnkmpoajgpgejojooj?hl=ja

# PlantUMLについて

[PlantUML](http://plantuml.com/) というツールを使いER図を書きます。
PlantUMLを書くのはテキストファイルなので Git で差分を管理できます。

公式マニュアル（日本語）
[ダウンロードのページ](https://plantuml.com/ja/download)
このページにあります。

[PlantUML日本語マニュアル（PDFファイル）](https://plantuml.com/ja/guide)
※右上のボタンからダウンロード出来ます。

しかし、公式マニュアルはER図以外にも他の図の書き方の説明が豊富であまり実用的ではありません。


# 環境
Windows10
VSCode
GitHub
PlantUML - Simple Viewer (VSCode拡張機能)
PlantUML Viewer (Chrome拡張機能)



## 使用中の拡張機能

https://marketplace.visualstudio.com/items?itemName=well-ar.plantuml

Alt + Dキーでプレビューが表示されます。
ER図からコードのジャンプしてくれます。

その他の機能は↓下とほぼ同じです。

<details><summary>使用をやめた拡張機能</summary>

PlantUML

https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml

ダウンロード数は多いのですが、
この拡張機能にはER図からコードへジャンプする機能が無いので使うのを止めました。

</details>



現在、VSCode拡張機能をインストールするだけで PlantUML が利用できるようになります。
（昔は色々インストールとか設定とかマニュアル読み込まないと大変だったのです。）

インストールすると下記の拡張子がサポートされます。
`*.pu, *.puml, *.plantuml, *.iuml, *.wsd`

Syntax Highlightがサポートされ色が付きます。
ER図にエラーが無いのならば`Alt+D`キーでプレビューが表示されます。
プレビューの拡大縮小が可能です。

# 必要な知識
VScodeの基本的な知識
データベースの基本的な知識
(テーブル、プライマリキー、外部キーが説明できる程度)

# 現在の他の選択肢
Draw.io マウスで地道に書いていく必要があります。コード管理できない。
Mermaid VScodeの拡張機能がプレビュー画像を拡大縮小してくれません。

以上の理由からPlantUML を選択しました。



# PlantUML

PlantUMLで書ける図の種類は20以上あります。
`PlantUMLでのER図はClass図の拡張版という扱いです。`

Class図の記号に無く、ER図に必要な記号が追加サポートという形になっています。
逆に言えば、ER図を書く時にPlantUMLのClass図のテクニックがそのまま使えます。



# 用語
エンティティ：重要なデータのまとまりを表すオブジェクトまたは概念のことです。DBに例えるとテーブルそのものです。

アトリビュート（属性）：エンティティ内にある属性情報です。エンティティの特性です。DBに例えるとテーブル内の項目を指します。

リレーション（関係）：エンティティ同士の関係を表現する線を指します。DBに例えるとプライマリキー、外部キーで関係を表します。

カーディナリティ（多重度）：「1対1」「1対多」「多対多」等、リレーション（関係）の詳細を表現する記号です。俗に言う鳥の足です。

エンティティの依存関係：エンティティ間で親子関係になり、必ず親子関係になるデータが必要です。図でいうと実線です。

エンティティの非依存関係：エンティティ間で「親子関係がない」関係のことです。親子関係のデータがなくても成り立つ関係です。図でいうと破線です。


![ER図の例.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/46621a28-3639-0cc6-1f39-73096725d55b.png)


# 目指す形、学習した結果
example1から8を順番に見ていくと、

![EntityRelationship](http://localhost:30001/svg/SoWkIImgAStDKN3DAyaigGnApKaioSpFAyx8BE3YKW22LB2uWjBZvcMFc_SyRje699KK4eiLIejJYueLgi6AG41R8JJODIZUqqKXEi0x5YwigmjdWkNz77rT4IAUBd2sfnzGEYJUnJ744I4V0EIwWiGGUbnSVLo1Ocu-ZkumiLfqfqv_tBpsSVFKnqqB7pSjUToy6kpWWgByjCoSL5Gt1mJvktdwkE9pjZB2OsxOLS0CGV4RJD0_p3KepDCrd6AF4lJbuyPrpwViVjhSZ-pT-CpSn7GqJtlwEheJy39ok13mDTWqQlYEI_rnq-R7pGiVDmF9ZlTxPhrixNs-TzspQJkVRPxA1Kblkhf5cUaP9Rgw-TM82BLIA4ejBirDvOABwEgcv9VdwUhMLAE7WvK2cA60771SN0wfUId0N000 "EntityRelationship")

```PlantUML.puml
@startuml EntityRelationship

    entity "ユーザー" as users {
        + USER_ID [PK]
        --
        USER_NAME
        UID
        INSERT_DATA
        UPDATE_DATE
        DELETE_FLAG
       }

    entity "プロファイル" as profiles {
        + PROFILE_ID [PK]
        --
        # USER_ID [FK]
        --
        PROFILE_NAME
        PROFILE_OVERVIEW
        INSERT_DATA
        UPDATE_DATE
        DELETE_FLAG
    }

    entity "プロファイルの画像" as profile_images {
        + IMAGE_ID [PK]
        --
        # PROFILE_ID [FK]
        --
        PROFILE_IMAGE
        INSERT_DATA
        UPDATE_DATE
        DELETE_FLAG
    }


'コメント：配置方法
users --right--o{ profiles : resume
profiles --down--|{ profile_images : image ファイル

@enduml



```

このようなER図が書けるようになります。

# example01

ER図のシンプルな形から育てていく。
VScodeを立ち上げexample01.puという空ファイルを作ります。

![example01](http://localhost:30001/svg/SoWkIImgAStDKKYjICmjo4arCEJYIiqhoIofL2WjJYqgXd4AYlBJCdDIYxcumC8ADJMwkldLS645AuMYrEBIt5GkBeVKl1IWWG00 "example01")

```example01.puml
@startuml example01

entity users
entity profiles

users ||--o{ profiles : resume

@enduml



```



`Alt+D`でプレビューが開きます。



## example01の解説

### エンティティについて

PlantUMLのER図はエンティティとその間のリレーションを図にします。
つまり基本的にエンティティ（DBでいうテーブル）とリレーション（関係）
この2種類の文法がわかれば書けます。
（他にタイトルや、コメント等の文法がありますが。）

```
@startuml base
@enduml



```

この2行の間にコードを書きます。

entity（エンティティ）
DBのテーブルに当たります。

users、profiles
テーブルの名前です

{}
この中括弧の中にDBでいうテーブルの中身を書きます。

users ||--o{ profiles : resume

 ||--o{
この記号がカーディナリティ（多重度）です。いくつかのパターンを組み合わせて使います。

：
この記号の後ろにエンティティ同士の関係の説明を書きます。
「image ファイル」とスペースが空いても大丈夫です、日本語でもかけます。





# example02

![example02](http://localhost:30001/svg/SoWkIImgAStDKKYjICmjo4arCEBYKbTmpIl9BAaqC5IehT7Jgwc1yOqGKiOAjVbwUlbmAHE4bAb2JOskRdurZ6-6a39NgCdNrKKOQC751MLPAYWPAe4rweBrAXaysRtqoOuk9QXIGmC5AuNa_BoInCoyOgWcGqCaPK3tW4rMCdpSkEvnutwuHYC5eCx4zFIYrFJ4aipyF9XcOw1Ic6QGDu5-KJ9Go2zI0Be3fjS4gFNvWYtFjyzIUDou78YNF6vSzRXn0XUNGsfU2Z3O0000 "example02")

```example02.puml
@startuml example02

' Entity01 }|..|| Entity02
' Entity03 }o..o| Entity04
' Entity05 ||--o{ Entity06
' Entity07 |o--|| Entity08

Entity09 "1" ||-----o{ "0以上" Entity10 : contains
Entity11 "0以上"  }o--|| "1のみ" Entity12  : aggregation
Entity13 "1以上" }|..o| "0 or 1"  Entity14 : 破線 で つなぐ

@enduml



```



## example02の解説

### 鳥の足（カーディナリティ）の記号

鳥の足（カーディナリティ）とはエンティティ間の関係を表す記号

|	縦棒、縦線、Vertical Line
o	英小文字のoを使用する
}	右中括弧、エンティティが左側にある時使用する、Right Curly Bracket
{	左中括弧、エンティティが右側にある時使用する、Left Curly Bracket

記号	説明
|o--	0 か 1
||--		1 のみ
}o--	0 以上
}|--		1 以上



### エンティティの(非)依存関係の記号

鳥の足（カーディナリティ）同士をつなげる記号
エンティティ間との関係を表す

### リレーションをつなげる記号
--	実線
..	破線

自分は基本的に記号2文字を使います。
記号1文字と2文字を混ぜて使うと2文字使う箇所は、線が長く伸びます。
「-------」このように伸ばすと伸ばす分だけER図の方も伸びていきます。

Entity11 "0以上"
のように注釈をつけることが出来ます。
記号が読めるようになったら不要ですが、
第三者見る可能性があるなら付けておくと親切です。


# example03

![example03](http://localhost:30001/svg/SoWkIImgAStDKKYjICmjo4arCERYIiqhoIofL2WjJYqgLgZc2Wrs3OhtTE7IrNtPCElfZXtFjy_IrUMojNsog-TbUo-GPslBfQVtkBdpSNFpu-OEe82U7bTy_DCbgvvDQt-wTZfG83uUOegVewyhLoZGh5guBGL5-McPEQd5rLm1GVvkdZwk8AlKmHR0HS3QO1p_CDUWC4_NS90P42VgwXPbfcUKwEhcLyEDKx1IA4ejBirDvL9NWAbAoI_F8wYej82WafpKD5oMSJcavgK0WnC0 "example03")

```example03.puml
@startuml example03

entity users {
USER_ID
--通常線--
==二重線==
..ドット線..
__太文字線__
USER_NAME
UID
}

entity profiles{
PROFILE_ID
'--
==
PROFILE_NAME
PROFILE_OVERVIEW
}

users --right--o{ profiles : resume
' users --down--o{ profiles : resume
' users --up--o{ profiles : resume
' users --left--o{ profiles : resume

@enduml



```



## example03の解説

### アトリビュート（属性）をくくる

波括弧 {} を使って、アトリビュート（属性）をくくります。

### アトリビュート（属性）
{}でアトリビュート（属性）をくくります。

### 区切り文字
--記号は区切り文字になります。
項目の間に線を引きます。

記号 説明
-- 通常
== 二重線
.. ドット線
__ 太文字線

挟むことでタイトルを付けることも出来ます。
--通常--
==二重線==
..ドット線..
__太文字線__


### 伸ばす方向
right、down、up、leftで左側（users）を基準に線が伸びる方向が決まります。

### コメント
シングルクォート' 以降はすべてコメントになります。
/' で始まり'/で終わる複数行のコメントを入れることもできます。


# example04

```example04.puml
@startuml example04

' エンティティ名の日本語化
entity "ユーザー" as users {
' プライマリキー
+ USER_ID [PK]
--
USER_NAME
UID
}

' エンティティ名の日本語化
entity "プロファイル" as profiles {
' プライマリキー
' 丸記号
+ PROFILE_ID [PK]
--
' 外部キー
' ダイヤ記号
# USER_ID [FK]
--
PROFILE_NAME
PROFILE_OVERVIEW
}

users --right--o{ profiles : resume

@enduml



```


## example04の解説

プライマリキー、外部キー

### キー
[PK]	プライマリキー
[FK]	外部キー

### 記号
+	丸記号が項目の先頭につく
`#	ダイヤ記号が項目の先頭につく
*	黒い丸記号が項目の先頭につく

### 項目の日本語化

entity "ユーザー" as users {

"ユーザー" 表示する項目、
users テーブルの名前、
asでつなげることで日本語を表示できます。


# example05

```example05.puml
@startuml example05

' 拡大縮小
scale 0.7

' タイトル
title Values communication \n example
skinparam titleBorderRoundCorner 15
skinparam titleBorderThickness 2
skinparam titleBorderColor red
skinparam titleBackgroundColor #d9cb65


entity "ユーザー" as users {
' 丸記号
+ USER_ID [PK]
--
' 強調文字
**USER_NAME**
' 丸記号＋強調文字
* **UID**
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}

entity "プロファイル" as profiles {
+ PROFILE_ID [PK]
--
' ダイヤ記号
# USER_ID [FK]
--
PROFILE_NAME
PROFILE_OVERVIEW
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}

entity "プロファイルの画像" as profile_images {
+ IMAGE_ID [PK]
--
# PROFILE_ID [FK]
--
PROFILE_IMAGE
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}


' コメント：配置方法
users --right--o{ profiles : resume
profiles --down--|{ profile_images : image ファイル

' ヘッダー
header
<font color=red>Warning:</font>
Do not use in production.
製品版で使わないでね。
endheader

' フッター
center footer Generated for demonstration

' キャプション(見出し)
caption Values Network Service

' legend(説明文)
legend
' legend top right
' legend left
これは説明文です

ER図の解説を行います。
空行もそのまま表示されます。
endlegend

@enduml



```



## example05の解説
### プレビューを拡大、縮小

100%（同じ大きさ）
scale 1

80%の大きさ
scale 0.8

半分の大きさ
scale 0.5

1.5倍の大きさ
scale 1.5

その他の例
scale 2/3
scale 200 width
scale 200 height
scale 200*100
scale max 300*200
scale max 1024 width
scale max 800 height

※4倍ぐらいが限界

### タイトル
titleキーワードを使用してタイトルを入れることができます。
記号 \ を使用して改行することができます。
skinparam設定を使用してタイトルに枠線を付けることができます。

### キャプション
caption
(記事・論説などの)表題、タイトル、(章・節・ページなどの)見出し、(新聞・雑誌などの)写真の説明文、(映画・テレビの)字幕、(文書の)頭書(とうしよ)

caption キーワードを使用して
図の下部にキャプションを入れることができます。


### フッタとヘッダ

footer、headerのコマンドを使って、
生成された図にフッタとヘッダを追加することができます。

center、left、rightを使ってフッタ、
ヘッダの表示位置を指定することもできます。

タイトルと同様に、複数行にわたってフッタ
またはヘッダを定義することができます。
また、フッタとヘッダではHTMLタグを
使用することもできます。

### 強調文字と丸記号

強調文字
強調文字は2つの記号**で囲む。

丸記号
*を先頭に置く。

丸記号と強調文字を同時に使う時は、
* **UID**
先頭の*の後ろに空白を1つ空ける。



### legend (# 図の凡例)

legend
伝説、言い伝え、伝説的人物、(民族などについての)説話、(メダル・貨幣面などの)銘、
(地図・図表などの)凡例、(さし絵の)説明文、警告文、警句

legend と end legendの間に
図の凡例を追加します。

left、right、top、bottom、center を使って、図の凡例の位置を指定する事もできます。



# example06

ER図の外側に書ける説明文

```example06.puml
@startuml example06

header some header
footer some footer
title My title
caption This is caption
legend
The legend
end legend

entity users
entity profiles

users ||--o{ profiles : resume

@enduml



```



## example06の解説
### ER図の外側に書ける説明文など

表示する文の前に置く

title
header
footer
caption
legend	legendはend legendで囲む

# example07

色をつける、文字の大きさを変える
装飾文字等

```example07.puml
@startuml example07

<style>
title {
HorizontalAlignment right
FontSize 24
FontColor blue
}
header {
HorizontalAlignment center
FontSize 26
FontColor purple
}
footer {
HorizontalAlignment left
FontSize 28
FontColor red
}
legend {
FontSize 30
BackGroundColor yellow
Margin 30
Padding 50
}
caption {
FontSize 32
}
</style>
header some header
footer some footer
title My title
caption This is caption
legend
The legend
end legend

entity users
entity profiles

users ||--o{ profiles : resume

@enduml



```


## example07の解説
### Font
FontSizeやFontColorを指定したものにします。



# example08

孤立したエンティティを非表示または削除します。
デフォルトでは、すべてのクラスが表示されます：

```example08.puml
@startuml example08

entity "ユーザー" as users {
+ USER_ID [PK]
--
USER_NAME
UID
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}

entity "プロファイル" as profiles {
+ PROFILE_ID [PK]
--
' ダイヤ記号
# USER_ID [FK]
--
PROFILE_NAME
PROFILE_OVERVIEW
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}

entity "プロファイルの画像" as profile_images {
+ IMAGE_ID [PK]
--
# PROFILE_ID [FK]
--
PROFILE_IMAGE
INSERT_DATA
UPDATE_DATE
DELETE_FLAG
}


' コメント：配置方法
users --right--o{ profiles : resume


' hide @unlinked
' remove @unlinked

@enduml



```


## example08の解説

hide(隠す)すると非表示になる。
remode(削除)すると非表示になり、表示領域が削除した分だけ減る。



# Chrome拡張をいれてGitHub上でER図でみる。

GitHubで差分を見る時にPlantUMLを描画させる - Qiita

https://qiita.com/suzuki-hoge/items/648f5dbeeec5365666eb

PlantUML Viewer

https://chrome.google.com/webstore/detail/plantuml-viewer/legbfeljfbjgfifnkmpoajgpgejojooj?hl=ja

↑このChrome拡張機能を入れる。

使い方
GitHubの***.pumlファイルを開いてRawボタンを押します。





# データベースからPlantUML形式のファイルを出力する
今回はSupabase（PostgreSQLを使用している）のテーブルスキーマをPlantUML形式で出力する。

環境
Windows10
Rust
VScode
Supabase (PostgreSQL系を利用したデータベースサービス)
Sqlant (PostgreSQLのテーブルからPlantUML形式のテキストファイルを出力するツール)

## Rust をインストール
Rust をインストール - Rustプログラミング言語
https://www.rust-lang.org/ja/tools/install
指示に従ってインストール、今回はダウンロードしたファイルを実行するだけでインストールが完了した。

インストール後はVScodeを再起動して設定を反映させる。
Rustのインストール確認＆バージョン確認
` rustc -V `
rustc 1.64.0 (a55dd71d5 2022-09-19)

## sqlantのインストールと実行
Githubから検索してみた。
Search · PostgreSQL PlantUML
https://github.com/search?q=PostgreSQL+PlantUML

kurotych/sqlant: Generate PlantUML ER diagram textual description from SQL connection string
https://github.com/kurotych/sqlant
sqlantはデータベースからPlantUMLを出力するツール

このツールの選択理由は、更新日が新しく、利用方法もシンプルだった。
まだRustをインストールしたことがなかったので使えるのなら使ってみたくなった。

### インストール
` cargo install sqlant `

### sqlantの利用方法
` sqlant postgresql://[ユーザー名]:[パスワード]@localhost:54322/postgres `

## sqlantを使いpowershellから出力ファイルへパイプ処理をする
実行例
` sqlant postgresql://postgres:postgres@localhost:54322/postgres | out-file test01.plantuml `

※local環境でのSupabaseの設定はどのPC環境でも同じになる。

## 出力結果

```test01.puml
@startuml

hide circle
skinparam linetype ortho

entity "**test**" {
# <b>""id""</b>: //""integer"" <b><color:goldenrod>(PK) </color></b> //
---
* <b>""name""</b>: //""text""  //
}

@enduml

```

![ER図出力結果.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/03b474ab-0cfd-73a6-7d05-1b5ab38d1b21.jpeg)

※1テーブル2プロパティの単純なスキーマを出力してみた。


### Tips

`skin rose`を
`***.plantumlファイルの@startuml の直下`
に置くと装飾無効となりデフォルト色に戻ります。


```test01.puml
@startuml
skin rose

hide circle
skinparam linetype ortho

entity "**test**" {
# <b>""id""</b>: //""integer"" <b><color:goldenrod>(PK) </color></b> //
---
* <b>""name""</b>: //""text""  //
}

@enduml

```



# 参考
Class図での例だが具体例が沢山ある。
PlantUMLのER図はClass図の拡張なのでほぼすべてのClass図は参考にできる。

Real World PlantUML

https://real-world-plantuml.com/?type=class
