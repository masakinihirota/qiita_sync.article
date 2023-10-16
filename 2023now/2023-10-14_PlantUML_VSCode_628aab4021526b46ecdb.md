<!--
title:   VSCodeでの PlantUML開発環境 PlantUML画像からコードへジャンプ 背景色は黒で目に優しいテーマを使用
tags:    PlantUML,VSCode
id:      628aab4021526b46ecdb
private: false
-->
# VSCodeでのPlantUML環境

VSCode拡張機能はPlantUML - Simple Viewerv2.17.6 well-ar

PlantUML - Simple Viewer - Visual Studio Marketplace

https://marketplace.visualstudio.com/items?itemName=well-ar.plantuml

背景黒で目に優しいテーマを使用しています。

画像上で項目名をクリックするとコードの場所に飛んでくれます。
ただし同じ項目名があるとクリックしても１番目に（最初にヒットしたキーワード）飛んでしまいます。

![PlantUML_crt.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1abb26f6-e08c-23a2-3354-10f9125c2320.gif)

↑GIF画像の容量 1.2MB



```PlantUML.puml
@startuml vns

!theme crt-green

[*] -> トップページ : ランディングページ

トップページ -> トップページ : vnsボタンをクリック
vnsページ->トップページ : vnsボタンをクリック
vnsページ->トップページ : ログアウトをクリック
トップページ --> ユーザー登録orログイン : ユーザー登録orログインをクリック
ユーザー登録orログイン -->トップページ : ユーザー登録の中途取り消し\nBACKボタンをクリック

state vnsページ {
    ユーザー登録orログイン --> vnsページ : ログイン成功
    トップページ--> vnsページ : GetStartボタンをクリック(済)
    [*] ---->  ユーザープロフィール : ユーザープロフィールをクリック
    [*] --> マッチング結果 : 決定をクリック
    ユーザープロフィール -> 作品 : 作品をクリック
    ユーザープロフィール -> ユーザープロフィール : 編集をクリック
    ユーザープロフィール --> 作品 : 作品をクリック
    [*]  ---> 作品 : 作品をクリック
    作品 --> 作品 : 作品登録をクリック\n作品検索をクリック
    作品-->マッチング結果 : 決定をクリック
    ユーザープロフィール -> マッチング結果 : 決定をクリック
    マッチング結果 ->マッチング結果 : NEXTボタンをクリック
    [*] -d--> グループ : グループをクリック
    ユーザープロフィール -d-> グループ : グループをクリック

}

@enduml

```


# 使用Gifツール

ScreenToGif - 画面を録画し、編集して GIF、ビデオ、またはその他の形式で保存します。
https://www.screentogif.com/



# PlantUMLのテーマギャラリー

Welcome to PlantUML themes Gallery | puml-themes-gallery
https://the-lum.github.io/puml-themes-gallery/

↓使えそうだと思ったテーマ

```
' !theme toy
' !theme vibrant
' !theme _none_
' !theme amiga
' !theme blueprint
' !theme cloudscape-design
' !theme crt-green
' !theme lightgray
' !theme metal
' !theme reddress-darkblue
' !theme reddress-darkgreen
' !theme reddress-darkorange
' !theme reddress-darkred

```



# jsonデータの表示方法

```
@startjson "json"
{
  "firstName": "John",
  "lastName": "Smith"
}
@endjson

```
