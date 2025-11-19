<!--
title:   Antigravity の完全削除 Windows (Googleが発表したAIエディタ)
tags:    Antigravity,VSCode
id:      34e0a9cf2695d866ad82
private: false
-->
Googleが発表したAIエディタ、Antigravity

Antigravity は VSCodeのフォークなのでやり方は基本同じです。

# Antigravityの削除

## 設定から削除する方法

👇️「Windowsのスタート」を開きます。

![スクリーンショット 2025-11-20 011818.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e8358557-6341-43d5-ac3a-3ea826f4e06a.png)

👇️Windowsのスタートの「設定」から

![設定.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c0704b06-18d1-4c5e-8134-9f89f0379f07.png)

👇️「アプリ」を開きます。

![アプリ.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8629385f-7a1a-4c4b-ba5c-035222e39cd0.png)

インストールされているアプリから Antigravity を探し右クリックでメニューを開いて、アンインストールがあるので削除します。

## 名前検索から削除する方法

👇️Windowsのスタートを開きます。

![スクリーンショット 2025-11-20 011818.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e8358557-6341-43d5-ac3a-3ea826f4e06a.png)

👆️この検索バーに「Antigarvity」と入力します。



![スクリーンショット 2025-11-20 015020.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/63f7194f-d8d5-42b7-b333-59467ec07b10.png)


これはWindowsの通常のアンインストールです。

### Antigravity の設定ファイルの削除

通常のアンインストールをしても設定ファイルは残っているので、それも全て削除します。

Antigravity はVSCodeのフォークなので、設定がPC内にまだ残っています。

残りの設定ファイルの削除します。

### Antigravity設定ファイル

👇️エクスプローラーの検索バーを開き

エクスプローラーの検索バー入力例
![app data.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/37a42dc9-7a69-48d4-822d-0fb926c44cb1.png)

```
%APPDATA%

```

を入力してリターンキーを押します。

**`Antigravityフォルダ`** を見つけて削除します。

### Antigravityユーザー設定ファイル

Antigravityユーザー設定ファイルを削除します。

同じ用にエクスプローラーの検索バーから

```
%USERPROFILE%

```

を入力します。

**`.antigravityフォルダ`** を見つけて削除します。
これでAntigravityインストール時の全ての関連フォルダとファイルは削除出来ました。

基本的にはAntigravity の関連ファイルはこれで全てのはずです。
(ソースコード(AI生成ファイル)等を残しているとかの場合は各自で判断してください。)


## 再起動

作業がすべて終わったらPCを再起動します。

もう一度インストールしたい人は 実行ファイルを起動させてください。

以上で終了です、お疲れさまでした。

私は、1回目のインストール時に 502エラー が連発してどうにもならなかったので一度完全アンインストールをしました。再インストール後はこのトラブルは解消されて502エラーは再現されませんでした。

これはその時の記録です。

# 参考

MacやLinuxは下記を参考にしてください。

【VSCode】完全アンインストールの仕方
https://zenn.dev/nuinui/articles/843ec500845d43