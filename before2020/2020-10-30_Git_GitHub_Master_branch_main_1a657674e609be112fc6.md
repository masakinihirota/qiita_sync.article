<!--
title:   masterからmainに変更する（githubのリモート＆ローカルブランチ）branches
tags:    Git,GitHub,Master,branch,main
id:      1a657674e609be112fc6
private: false
-->
2023年12月25日 追記
また変更方法が変わりました。

リポジトリのトップ画面で
左上のタブバー(Code Issues Pull requests Actions Projects Wiki Security Insights Settings)の下にある
リポジトリ名の更に下にある
masterを押します。
そうするとその下にプルダウンメニューが開きます。
その中にあるView all branchesを押します。
ブランチの一覧が表示されます。
その中にある三点リーダー(...)を押します。ゴミ箱アイコンの横です。
そうすると「Rename branch」がありますので、押します。
名前を変更して「Rename branch」を押します。
ブラウザをリロードしたり、リポジトリのトップ画面に戻ると
ブランチ名が変更されているのが確認できます。

追記終了


2023年02月15 追記

# 手順 2023年以降

**リモートのリポジトリ名を変えてからローカルのリポジトリ名を変える。**

2023年現在
github上で直接デフォルトのブランチ名を変えられるシステムになっています。

## Settingsタブに移動した画面

画像の番号順に
1. Settingsを押す。
1. Branchesを押す。
1. ３の鉛筆アイコンを押すと小ウィンドウが開く。
1. デフォルトブランチ名を **main** に変更をする。
1. 「Rename branch」ボタンで決定する。

![2023master_main01記号.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2e31d9f2-d526-c03b-9578-43e23362ddb9.png)



![2023master_main02記号2.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/810356fa-9cbb-c6b4-d089-0472c106fdad.png)

## Codeタブに移動した画面

![2023master_main04記号.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/df6919d7-c1f2-65e9-1c1a-ee4cf72073e7.png)

1. Codeタブに移動する。
1. ローカル側も合わせるようにとgithub上で指示が出る。

```terminal
# ローカルでmasterからmainに変更
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a

```

これらのコマンドをローカル側で実行する。

追記終了



# 手順 2022年以前

**ローカルのリポジトリ名を変えてからリモートのリポジトリ名を変える。**

# ローカルのブランチ名をmainに変更
`git branch -m master main`

# リモートのブランチ名をmainに変更





ローカルで変えたブランチをリモートへpush

`git push -u origin main`

githubリポジトリ画面へ移動。
自分の場合は
`https://github.com/masakinihirota?tab=repositories`

目的のリポジトリを選択

さっきpushしたので、リモートリポジトリにはmasterとmainの2つ出来ているはずです。

![mastermainO.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8b478418-4733-2e9d-7c42-69b32e70916d.png)

Settings＞Branches＞Default branchでmainに変更後UPDATEボタンを押して、確認ボタンがポップアップされるので押します。

![settingO.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e95318c6-c495-c3f8-afc0-8f451b29a122.png)


![BranchO.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1273cd1d-8db8-cccf-3666-d426a343a37d.png)

リポジトリトップ画面に戻り、ブランチ名からView all branchesボタンを押します。

![viewO.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2e3fc1fe-01e1-3722-f94e-1bbe79f1931b.png)

masterを消去します。（赤いゴミ箱アイコンを押す）
ブラウザをリロードするとmasterブランチが消えているのが確認できます。
