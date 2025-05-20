<!--
title:   TeleportHQ ハンズオン (FigmaのデザインをNext.jsのコードに変換するまで。)
tags:    Figma,Next.js,TeleportHQ,ハンズオン
id:      819238e286e9a42929d7
private: false
-->
追記 2023年6月11日
TeleportHQが日本語に対応していました。

追記終了

---


FigmaのデザインからNext.jsのプロジェクトを作るまでのハンズオンです。

# TeleportHQとは
FigmaのデザインファイルをNext.jsのコードに変換します。
無料です。
（他にもたくさん便利な機能があります。）

## サイト
TeleportHQ
Low-code Front-end Design & Development Platform | TeleportHQ
https://teleporthq.io/
デザインのコード化ツール
無料 (3プロジェクトまで)


Figma
https://www.figma.com/
デザイン設計ツール
無料 (3つのFigmaファイルと3つのFigJamファイルまで)

Next.js by Vercel - The React Framework
https://nextjs.org/
無料 (オープンソース)

# 想定
Figmaの基本的な使い方を知っており、デザインを一通り書けてプロトタイプまで作ることが出来る。
Figmaプラグインの基本的な使い方を知っている。
Next.jsのインストールをしたことがある。
VSCodeを使える。



# ハンズオン
## Figma上に移動

### デザインの作成
まず最初にFigmaでデザインを書き、プロトタイプまで作ります。
デザインの一部のみをコード化することも可能です。
TeleportHQはフレームもコンポーネントも区別なくコード化出来ます。

※ 今回利用した自分がデザインしたファイルは
* 1ページのみの単純なデザインファイル
* 複雑なことはしていない
と至極単純なものです。

### デザインが出来上がったら

![加工済み_Figma プラグイン検索 右クリックメニュー.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/6b94a7fe-f363-3992-8806-10315d58dd70.png)

Figma上の右クリックメニューからTeleportHQのプラグインを探します。

![加工済み_Figma プラグイン検索結果.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/535abe76-7ea5-6cbf-1e31-c2ee6cbe4a56.jpeg)

検索キーワードは「TeleportHQ」と入力し、見つけたらインストールします。

Figmaの右クリックメニューから
プラグイン＞TeleportHQを選択。
そうすると、コード化するエレメントを選択してくださいと出ます。
コード化したい部分を選択します。


![加工済み_FigmaからTeleportHQへExport画像.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/5b750bc5-4a8e-32a2-3783-5aece04d4173.png)


そうすると、上図のような画面に変化をし、
選択すると上図のように、一部分を選択しコピーするか、全体をコピーしTeleportHQに新しいプロジェクトを作るかを選択します。

今回は右側の「Export as a new project」を選択します。

（ここでGoogleアカウントか、Githubのアカウント認証が求められるはず・・・（忘れた））



※ここでブラウザ上のTeleportHQのサイト（プレイグラウンド）に移動します。
プレイグラウンド（＝サンドボックス）とはブラウザ上で色々操作できる場所を提供してくれるサービスです。

ブラウザ上でTeleportHQサイトに来ました。
そしてうまくいっていればFigmaでデザインしたものがTeleportHQのプレイグラウンドで見ることが出来ているはずです。









## TeleportHQ上に移動
![加工済み_TeleportHQ 左Home選択.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/12549df3-6182-10b5-abcc-edecb7dd1d2b.png)

次に、コード化したいフレームorコンポーネントを選択します。
※重要：選択を間違えた場合、Next.jsのプロジェクト画面が真っ白になったり404ページが見つかりませんとなったりします。

![加工済み_TeleportHQ 右上メニュー.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/3db1e389-048c-c3f3-9ee3-ded1cbf3dd27.png)

デザインの選択を確認しましたら、
右上メニューの青い「Publish」公開ボタンの左隣にダウンロードボタンがあります。
（その隣はコード表示ボタンになります。）
ダウンロードボタンを押します。



![加工済み_TeleportHQ ダウンロードメニュー.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/0d107099-ceec-5ea8-902c-2f03256fb24e.png)

ここでどのフロントエンドのコードをダウンロードするかの選択が出来ます。

選択しましたら、下の「Export Code as ZIP」ダウンロードボタンを押します。






## VSCode上に移動
後はダウンロードしたファイルを解凍して、
VSCodeで開きます。

`npm install`
or
`yarn`
でインストールをします。

`npm run dev`
or
`yarn dev`
でローカルサーバーを立ち上げます。

成功していれば、デザインしたファイルが
http://localhost:3000/
上に表示されているはずです。