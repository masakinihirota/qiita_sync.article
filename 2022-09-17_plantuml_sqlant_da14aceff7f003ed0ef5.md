<!--
title:   PlantUML入門 ER図を書く基本 for VSCode
tags:    ER図,plantuml,sqlant
id:      da14aceff7f003ed0ef5
private: false
-->
2023年6月23日 リニューアル

# 関連記事

VSCodeで書くPlantUML ER図 (ER図からコードへジャンプやテーマ、画像拡大縮小も大幅に便利に ) - Qiita

https://qiita.com/masakinihirota/items/f8357fc7d17456738e93

# 追記 2023年7月3日

## テンプレート
メインテーブル、サブテーブル、テーブル関係、パッケージ

```plantuml

' PlantUML ER図ファイルの拡張子 puml

' ルール
' テーブルの背景色
' リソースエンティティ
' #PaleTurquoise
' 水色 緑色系 (落ち着いた色)

' イベントエンティティ
' #NavajoWhite
' 黄色 オレンジ色系 (活発な色)

' |o-- 0 か 1
' ||-- 1 のみ
' }o-- 0 以上
' }|-- 1 以上

' main_tables }-d-|| sub_tables

' テンプレート

@startuml table_name

!define Table(name,desc) entity name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

' パッケージ
package package <<Database>> {

' テーブルの名前小文字複数形スネークケース
Table(main_tables, "メインテーブル") #PaleTurquoise {
    primary_key(id) <<generated>> [ID]
    --
    ' テーブルのカラム名 小文字スネークケース
    --
    ' 日付
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(sub_tables, "サブテーブル") #PaleTurquoise {
    primary_key(id) <<generated>> [ID]
    --
    ' 外部キー
    foreign_key(main_table_id) <<FK>> [メインテーブルID]
    --
    ' テーブルのカラム名 小文字スネークケース
    --
    ' 日付
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}



 main_tables }--|| sub_tables

'パッケージの閉じカッコ
}

@enduml

```

```template.puml

' PlantUML ER図ファイルの拡張子 puml

' ルール
' テーブルの背景色
' リソースエンティティ
' #PaleTurquoise
' 水色 緑色系 (落ち着いた色)

' イベントエンティティ
' #NavajoWhite
' 黄色 オレンジ色系 (活発な色)

' |o-- 0 か 1
' ||-- 1 のみ
' }o-- 0 以上
' }|-- 1 以上

' registration_records }-d-|| countries

' テンプレート

@startuml table_name

!define Table(name,desc) entity name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

' パッケージ
package package <<Database>> {

' テーブルの名前小文字複数形スネークケース
Table(main_tables, "メインテーブル") #PaleTurquoise {
    primary_key(id) <<generated>> [ID]
    --
    ' テーブルのカラム名 小文字スネークケース
    --
    ' 日付
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(sub_tables, "サブテーブル") #PaleTurquoise {
    primary_key(id) <<generated>> [ID]
    --
    ' 外部キー
    foreign_key(main_table_id) <<FK>> [メインテーブルID]
    --
    ' テーブルのカラム名 小文字スネークケース
    --
    ' 日付
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}



 main_tables }--|| sub_tables

'パッケージの閉じカッコ
}

@enduml

```

# 追記終了


# 追記 2023年6月27日

## テーブルをマクロで定義する方法

!define Table(name,desc)は、Tableという名前のマクロを定義しています。このマクロは、テーブルの名前と説明を引数として受け取り、テーブルを表すクラスを作成します。テーブルの名前はname、説明はdescという変数名で定義されています。テーブルの外観は、<< (T,#FFAAAA) >>で定義されています。<< (T,#FFAAAA) >>は、PlantUMLでテーブルを表すためのスタイルです。Tはテーブルを表し、#FFAAAAはテーブルの背景色を表しています。

!define primary_key(x)は、primary_keyという名前のマクロを定義しています。このマクロは、主キーを表すために使用されます。主キーの列名を引数として受け取り、その列名を太字で下線付きにします。

!define foreign_key(x)は、foreign_keyという名前のマクロを定義しています。このマクロは、外部キーを表すために使用されます。外部キーの列名を引数として受け取り、その列名を下線付きにします。



```table.puml
@startuml production_anime_table
!define Table(name,desc) entity name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

' ↓背景色の指定 #色
Table(works, "テーブル1: works") #lightblue {
  primary_key(id)
  ---
  タイトル
  新規登録日時
  最終更新日
}
@enduml

```

## テーブル単位で背景色を指定する方法

↓シャープ記号の後に色を指定します。
`Table(works, "テーブル1: works") #lightblue {`
↓場所と色でも指定できます。
`Table(works, "テーブル1: works") #back:lightblue {`
↓背景色と縁の色を指定しています。
`#lightblue;line:red`

### 背景色に使えそうな色の一覧

```plantuml
@startuml color
title
|= 色の名前 |
|<#lightblue> #lightblue |
|<#LightGoldenRodYellow> #LightGoldenRodYellow |
|<#LightGray> #LightGray |
|<#LightGreen> #LightGreen |
|<#LightGrey> #LightGrey |
|<#LightPink> #LightPink |
|<#LightSkyBlue> #LightSkyBlue |
|<#LightSteelBlue> #LightSteelBlue |
|<#MistyRose> #MistyRose |
|<#Moccasin> #Moccasin |
|<#NavajoWhite> #NavajoWhite |
|<#PaleGoldenRod> #PaleGoldenRod |
|<#PaleGreen> #PaleGreen |
|<#PaleTurquoise> #PaleTurquoise |
|<#PapayaWhip> #PapayaWhip |
|<#PeachPuff> #PeachPuff |
|<#Pink> #Pink |
|<#Plum> #Plum |
|<#PowderBlue> #PowderBlue |
|<#SpringGreen> #SpringGreen |
|<#Tan> #Tan |
|<#Thistle> #Thistle |
|<#Turquoise> #Turquoise |
|<#Wheat> #Wheat |
end title

@enduml

```

```color.puml
@startuml color
title
|= 色の名前 |
|<#lightblue> #lightblue |
|<#LightGoldenRodYellow> #LightGoldenRodYellow |
|<#LightGray> #LightGray |
|<#LightGreen> #LightGreen |
|<#LightGrey> #LightGrey |
|<#LightPink> #LightPink |
|<#LightSkyBlue> #LightSkyBlue |
|<#LightSteelBlue> #LightSteelBlue |
|<#MistyRose> #MistyRose |
|<#Moccasin> #Moccasin |
|<#NavajoWhite> #NavajoWhite |
|<#PaleGoldenRod> #PaleGoldenRod |
|<#PaleGreen> #PaleGreen |
|<#PaleTurquoise> #PaleTurquoise |
|<#PapayaWhip> #PapayaWhip |
|<#PeachPuff> #PeachPuff |
|<#Pink> #Pink |
|<#Plum> #Plum |
|<#PowderBlue> #PowderBlue |
|<#SpringGreen> #SpringGreen |
|<#Tan> #Tan |
|<#Thistle> #Thistle |
|<#Turquoise> #Turquoise |
|<#Wheat> #Wheat |
end title

@enduml

```



#lightblue
#LightGoldenRodYellow
#LightGray
#LightGreen
#LightGrey
#LightPink
#LightSkyBlue
#LightSteelBlue
#MistyRose
#Moccasin
#NavajoWhite
#PaleGoldenRod
#PaleGreen
#PaleTurquoise
#PapayaWhip
#PeachPuff
#Pink
#Plum
#PowderBlue
#SpringGreen
#Tan
#Thistle
#Turquoise
#Wheat

※ ライトモードで、テーブル文字の色が黒の場合

テーブルの背景色
リソースエンティティ
#PaleTurquoise
水色 緑色系 (落ち着いた色)

イベントエンティティ
#NavajoWhite
黄色 オレンジ色系 (活発な色)


ER図とは？書き方やテクニックをわかりやすく解説

https://products.sint.co.jp/ober/blog/create-er-diagram

ER図を見やすくするテクニック

リソースエンティティとイベントエンティティで色分けする
リソースエンティティを緑、
イベントエンティティを黄色で色分け

リソースエンティティは、データベースのテーブルのうち、最終的にマスタ系のテーブルとなるものを指します。

マスタ系のテーブルとは、主に静的なデータを管理するテーブルです。
例えば、商品マスタや顧客マスタなどが該当します。

イベントエンティティは、トランザクションを管理するテーブルで、主に動的なデータを管理するテーブルです。

リソースエンティティとイベントエンティティを色分けすることで、データと業務の関連がわかりやすくなります。



# 追記終了

# 追記 2023年6月26日

## テーブルの命名規則

テーブル名は
複数形、スネークケース、小文字のみ、英語で命名

カラム名は
テーブル名からわかることは書かない

１対多の関係で他テーブルのidを参照する場合は単数形を利用する

DATE型のカラムは「受動態_on」
opened_on

TIMESTAMP型のカラムは「受動態_at」
updated_at



## PlantUMLでのER図設定の追加
PlantUMLのプレビュー画像で「E」を「T」に変えたい。
項目の先頭に記号を付けて 項目名を太文字にしたい。
項目名を太文字にしたい。


```plantuml
@startuml modifications_E_to_T

!define TRANSACTION CAE7F2

entity users as "users\nユーザー" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
* **name** : text
**description** : text
created_at : TIMESTAMP

}

@enduml

```

```modifications_E_to_T.puml
@startuml modifications_E_to_T

!define TRANSACTION CAE7F2

entity users as "users\nユーザー" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
* **name** : text
**description** : text
created_at : TIMESTAMP

}

@enduml

```

# エンティティをグループ化

```plantuml
@startuml group
!define TRANSACTION CAE7F2

package database <<Database>> {
  entity entity01 <<T,TRANSACTION>> {
   'ここに項目を書く
  }
  entity entity02 <<T,TRANSACTION>> {
   'ここに項目を書く
  }
}

package folder <<folder>> {
  entity entity10 <<T,TRANSACTION>>{}
  entity entity11 <<T,TRANSACTION>>{}
}

package rectangle <<rectangle>> {
  entity entity30 <<T,TRANSACTION>>{}
}

package frame <<frame>> {
  entity entity40 <<T,TRANSACTION>>{}
}

package node <<node>> {
  entity entity50 <<T,TRANSACTION>>{}
}

package default {
  entity entity60 <<T,TRANSACTION>>{}
}

@enduml

```

```group.puml
@startuml group
!define TRANSACTION CAE7F2

package database <<Database>> {
  entity entity01 <<T,TRANSACTION>> {
   'ここに項目を書く
  }
  entity entity02 <<T,TRANSACTION>> {
   'ここに項目を書く
  }
}

package folder <<folder>> {
  entity entity10 <<T,TRANSACTION>>{}
  entity entity11 <<T,TRANSACTION>>{}
}

package rectangle <<rectangle>> {
  entity entity30 <<T,TRANSACTION>>{}
}

package frame <<frame>> {
  entity entity40 <<T,TRANSACTION>>{}
}

package node <<node>> {
  entity entity50 <<T,TRANSACTION>>{}
}

package default {
  entity entity60 <<T,TRANSACTION>>{}
}

@enduml

```

# それぞれを別ファイルで管理

テーブルとリレーションをそれぞれ別ファイルで管理することができます。

※注意: ↓下のテーブルファイルとリレーションファイルのコードはファイルを分けていなければエラーになります。

```plantuml
@startuml table
!define TRANSACTION CAE7F2
!define MASTER F9DFD5

entity users as "users\nユーザー" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
  name VARCHAR(30) [名前]
  # country_id [FK]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity posts as "posts\n記事" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
  title VARCHAR(30) [タイトル]
  body VARCHAR(255) [記事]
  # user_id [FK]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity countries as "countries\n国" <<M,MASTER>> {
  + id INT(10) [PK]
  --
  name VARCHAR(50) [国名]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

@enduml

```

```table.puml
@startuml table
!define TRANSACTION CAE7F2
!define MASTER F9DFD5

entity users as "users\nユーザー" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
  name VARCHAR(30) [名前]
  # country_id [FK]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity posts as "posts\n記事" <<T,TRANSACTION>> {
  + id INT(10) [PK]
  --
  title VARCHAR(30) [タイトル]
  body VARCHAR(255) [記事]
  # user_id [FK]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity countries as "countries\n国" <<M,MASTER>> {
  + id INT(10) [PK]
  --
  name VARCHAR(50) [国名]
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

@enduml

```
## リレーションファイル

```plantuml
@startuml relation

!include table.puml

users }|-l-|| countries
users ||-r-o{ posts

@enduml

```

``` relation.puml
@startuml relation

!include table.puml

users }|-l-|| countries
users ||-r-o{ posts

@enduml

```

※それぞれ別ファイルに分けておくと、ER図のコードが長くなっても見やすくなります。
※ファイルに分けずこのままAlt+dでプレビュー表示してもエラーになります。
`!include table.puml`
この行の指示通り、外に`table.puml`を作成しておく必要があります。

※VSCode拡張機能の「PlantUML - Simple Viewer」のコードジャンプ機能はリレーションファイルからではテーブルの項目にジャンプしてくれません。テーブルファイルを開いている状態からなら指定のテーブルの項目にジャンプしてくれます。

# 追記終了

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


# QiitaでPlantUMLの図を書く

` ```plantuml ` と` ``` `で囲むとその中に書いたPlantUMLのコードがQiita上でER図になります。





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

# PlantUMLのテーマ
昔の黄色と赤、灰色のテーマから、現在はデフォルトでは白と灰色のテーマになっています。

テーマを変更すると色々な図の見た目が変わります。

コードの先頭に

```
!theme toy
!theme vibrant
!theme _none_

```

のどれかをつけると適用されるようになります。

※この3つは自分の好みのテーマです。他に30個ほどがあります。
!theme _none_はデフォルト設定



## テーマギャラリー

このページ全てのテーマの使用例があります。

https://the-lum.github.io/puml-themes-gallery/

※全テーマの使用例を1ページに収めているので超巨大ページになっています、開く時に注意してください。


# 用語
エンティティ：重要なデータのまとまりを表すオブジェクトまたは概念のことです。DBに例えるとテーブルそのものです。

アトリビュート（属性）：エンティティ内にある属性情報です。エンティティの特性です。DBに例えるとテーブル内の項目を指します。

リレーション（関係）：エンティティ同士の関係を表現する線を指します。DBに例えるとプライマリキー、外部キーで関係を表します。

カーディナリティ（多重度）：「1対1」「1対多」「多対多」等、リレーション（関係）の詳細を表現する記号です。俗に言う鳥の足です。

エンティティの依存関係：エンティティ間で親子関係になり、必ず親子関係になるデータが必要です。図でいうと実線です。

エンティティの非依存関係：エンティティ間で「親子関係がない」関係のことです。親子関係のデータがなくても成り立つ関係です。図でいうと破線です。


![ER図の例.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/46621a28-3639-0cc6-1f39-73096725d55b.png)


# 目指す形、学習した結果
example1から8を順番に学習していくと、

```plantuml
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

※↑Qiitaの機能でPlantUMLのER図が表示できています。
↓そのコードです。


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


```plantuml
@startuml example01

entity users
entity profiles

users ||--o{ profiles : resume

@enduml

```

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


```plantuml
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


```plantuml
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

r
d
u
l
と省略できます。

```
users --right--o{ profiles : resume
' users --down--o{ profiles : resume
' users --up--o{ profiles : resume
' users --left--o{ profiles : resume
```

を

```
users --ri--o{ profiles : resume
' users --d--o{ profiles : resume
' users --u--o{ profiles : resume
' users --l--o{ profiles : resume
```

書き換えることが出来ます。

### コメント
シングルクォート' 以降はすべてコメントになります。
/' で始まり'/で終わる複数行のコメントを入れることもできます。


# example04

```plantuml
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

```plantuml
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

```plantuml
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

```plantuml
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

entity users #back:lightblue
entity profiles

users ||--o{ profiles : resume

@enduml

```

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

entity users #back:lightblue
entity profiles

users ||--o{ profiles : resume

@enduml

```


## example07の解説
### Font
FontSizeやFontColorを指定したものにします。

#### テーブル単位で背景色を指定する方法

↓シャープ記号の後に場所と色を指定します。
`entity users #back:lightblue`


# example08

孤立したエンティティを非表示または削除します。
デフォルトでは、すべてのクラスが表示されます：

```plantuml
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
remove(削除)すると非表示になり、表示領域が削除した分だけ減る。



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

```plantuml
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


```plantuml
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

# 関連線を直角にする

```plantuml
@startuml production_anime_table

!define Table(name,desc) entity name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

' 関連線が直角になる
skinparam linetype ortho

' パッケージ
package anime_items <<Database>> {

Table(anime_items, "アニメ") #PaleTurquoise  {
    primary_key(anime_id) <<generated>> [主キー]
    --
    userType [ユーザー種別 公式 or ユーザー]
    title [作品タイトル]
    furigana [ふりがな]
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(countries, "制作国") #PaleTurquoise  {
    primary_key(country_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    production_country [制作国]
    last_update_date timestamptz [最終更新日時]
}

Table(supported_languages, "対応言語") #PaleTurquoise  {
    primary_key(language_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    supported_language [対応言語]
    last_update_date timestamptz [最終更新日時]
}

Table(genres, "アニメジャンル") #PaleTurquoise  {
    primary_key(genre_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    genre [ジャンル]
}

Table(anime_genres, "中間テーブル") #PaleTurquoise {
    primary_key(anime_id) [主キー]
    primary_key(genre_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    foreign_key(genre_id) <<FK>>
}

Table(introduction_urls, "紹介URL") #PaleTurquoise {
    primary_key(introduction_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    introduction_site [紹介サイト]
    introduction_url [紹介URL]
    --
    is_advertisement [広告かどうか]
    is_affiliate [アフィリエイトリンクかどうか]
    --
    last_update_date timestamptz [最終更新日時]
}

Table(purchase_urls, "購入URL") #PaleTurquoise  {
    primary_key(purchase_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    purchase_site [購入サイト]
    purchase_url [購入URL]
    --
    is_advertisement [広告かどうか]
    is_affiliate [アフィリエイトリンクかどうか]
    --
    last_update_date timestamptz [最終更新日時]
}

Table(registrants, "作品の登録者情報") #PaleTurquoise  {
    primary_key(registration_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    registrant [登録者]
    registration_change_count [登録変更回数]
    consumption_points[消費ポイント]
    registration_date timestamptz [登録日時]
}

Table(anime_tags, "タグ情報") #PaleTurquoise {
    primary_key(tag_id) <<generated>> [ID]
    --
    tag_name varchar [タグ名]
    tag_description varchar [タグの説明]
    --
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(anime_tag_mappings, "中間テーブル") #PaleTurquoise {
    primary_key(tag_mapping_id) <<generated>> [ID]
    --
    foreign_key(anime_id) <<FK>> [アニメ作品ID]
    foreign_key(tag_id) <<FK>> [タグID]
    --
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}


' テーブルの関連線
anime_items ||-r-|{ countries
anime_items ||-u-|{ supported_languages
anime_items ||-d-o{ introduction_urls
anime_items ||-d-o{ purchase_urls
anime_items ||-u-|{ registrants
anime_genres |o-l-o{ anime_items
anime_genres |o--o{ genres
anime_tag_mappings |o--o{ anime_items
anime_tag_mappings |o-u-o{ anime_tags



'パッケージの閉じカッコ
}

@enduml

```

↓ この行を追加すると、線が直角になります。（コメント部分で追加しています。）

```
' 関連線が直角になる
skinparam linetype ortho
```

``` anime_items.puml
@startuml production_anime_table

!define Table(name,desc) entity name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

' 関連線が直角になる
skinparam linetype ortho

' パッケージ
package anime_items <<Database>> {

Table(anime_items, "アニメ") #PaleTurquoise  {
    primary_key(anime_id) <<generated>> [主キー]
    --
    userType [ユーザー種別 公式 or ユーザー]
    title [作品タイトル]
    furigana [ふりがな]
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(countries, "制作国") #PaleTurquoise  {
    primary_key(country_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    production_country [制作国]
    last_update_date timestamptz [最終更新日時]
}

Table(supported_languages, "対応言語") #PaleTurquoise  {
    primary_key(language_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    supported_language [対応言語]
    last_update_date timestamptz [最終更新日時]
}

Table(genres, "アニメジャンル") #PaleTurquoise  {
    primary_key(genre_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    genre [ジャンル]
}

Table(anime_genres, "中間テーブル") #PaleTurquoise {
    primary_key(anime_id) [主キー]
    primary_key(genre_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    foreign_key(genre_id) <<FK>>
}

Table(introduction_urls, "紹介URL") #PaleTurquoise {
    primary_key(introduction_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    introduction_site [紹介サイト]
    introduction_url [紹介URL]
    --
    is_advertisement [広告かどうか]
    is_affiliate [アフィリエイトリンクかどうか]
    --
    last_update_date timestamptz [最終更新日時]
}

Table(purchase_urls, "購入URL") #PaleTurquoise  {
    primary_key(purchase_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    purchase_site [購入サイト]
    purchase_url [購入URL]
    --
    is_advertisement [広告かどうか]
    is_affiliate [アフィリエイトリンクかどうか]
    --
    last_update_date timestamptz [最終更新日時]
}

Table(registrants, "作品の登録者情報") #PaleTurquoise  {
    primary_key(registration_id) [主キー]
    --
    foreign_key(anime_id) <<FK>>
    registrant [登録者]
    registration_change_count [登録変更回数]
    consumption_points[消費ポイント]
    registration_date timestamptz [登録日時]
}

Table(anime_tags, "タグ情報") #PaleTurquoise {
    primary_key(tag_id) <<generated>> [ID]
    --
    tag_name varchar [タグ名]
    tag_description varchar [タグの説明]
    --
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}

Table(anime_tag_mappings, "中間テーブル") #PaleTurquoise {
    primary_key(tag_mapping_id) <<generated>> [ID]
    --
    foreign_key(anime_id) <<FK>> [アニメ作品ID]
    foreign_key(tag_id) <<FK>> [タグID]
    --
    new_registration_date_time timestamptz [新規登録日時]
    last_update_date timestamptz [最終更新日時]
}


' テーブルの関連線
anime_items ||-r-|{ countries
anime_items ||-u-|{ supported_languages
anime_items ||-d-o{ introduction_urls
anime_items ||-d-o{ purchase_urls
anime_items ||-u-|{ registrants
anime_genres |o-l-o{ anime_items
anime_genres |o--o{ genres
anime_tag_mappings |o--o{ anime_items
anime_tag_mappings |o-u-o{ anime_tags



'パッケージの閉じカッコ
}

@enduml

```


# 参考

Class図での例だが具体例が沢山ある。
PlantUMLのER図はClass図の拡張なのでほぼすべてのClass図は参考にできる。

Real World PlantUML

https://real-world-plantuml.com/?type=class

QiitaでPlantUMLが使えるようになっていた - Qiita

https://qiita.com/kazuki43zoo/items/d23148c149f4d31d2521

設計 | PlantUMLでER図を作成 - わくわくBank

https://www.wakuwakubank.com/posts/805-design-uml-er/

〜テーブル設計基礎の「キ」　命名規則〜 - Qiita

https://qiita.com/tatsuya_1995/items/4b706fc40fe2f300bbc0

ER図とは？書き方やテクニックをわかりやすく解説

https://products.sint.co.jp/ober/blog/create-er-diagram

※大変参考になりました、ありがとうございました。
