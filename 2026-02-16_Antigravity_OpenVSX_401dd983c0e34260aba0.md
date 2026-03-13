<!--
title:   Antigravityのマーケットプレイスの設定が未設定(空)やopen VSXの場合 VSCode(オリジナル)の設定にする。
tags:    Antigravity,OpenVSX
id:      401dd983c0e34260aba0
private: false
-->
AntigravityはVSCodeのフォーク版です。要はコピーして土台として利用しています。
なのでVSCodeの拡張機能が動きます。

<details><summary>Open VSXのAI解説</summary>

## Open VSXとは？

**Open VSX** は、Eclipse Foundationが運営する、VS Code拡張機能のための**オープンソースなレジストリ（公開場所）** です。

### なぜOpen VSXが必要なのか？

実は、Microsoftが運営する「VS Code Marketplace」には、**「Microsoft公式のVS Code（バイナリ）以外から利用してはいけない」** という利用規約上の制限があります。

そのため、Antigravity、VSCodium、Eclipse Theiaといった「VS Codeをベースに作られた別のエディタ」は、ライセンスの問題を避けるために、デフォルトでこの**Open VSX**を参照するように設定されています。

---

### VS Code Marketplace と Open VSX の違い

| 項目 | VS Code Marketplace (MS) | Open VSX Registry |
| --- | --- | --- |
| **運営** | Microsoft | Eclipse Foundation |
| **主な利用者** | 公式VS Codeユーザー | フォーク版（Antigravity等）ユーザー |
| **拡張機能の数** | 非常に多い（ほぼ全て） | やや少ない（有志が登録） |
| **ライセンス** | プロプライエタリ（制限あり） | オープンソース（自由） |

---

### 💡 AntigravityでURLを変更する際のアドバイス

手順で紹介していただいた通り、MicrosoftのURLに変更することで、公式マーケットプレイスにある膨大な拡張機能にアクセスできるようになります。ただし、以下の点に留意しておくとより安全です。

* **規約の認識:** 技術的にはURL変更で動きますが、規約上は「非公式バイナリからの利用」になるため、自己責任での利用が基本となります。
* **互換性:** * **独自API:** 一部の拡張機能（特にMicrosoft製のPython、C++、GitHub Copilotなど）は、公式VS Code特有のライセンスや非公開APIに依存している場合があり、URLを変えても正しく動作しないことがあります。
* **再起動の重要性:** 設定を書き換えた後、キャッシュが残っていると古いマーケットプレイスの結果が表示されることがあるため、おっしゃる通り**再起動**は必須のステップですね。

</details>

AntigravityエディターはデフォルトでOpen VSXを使用しています。(設定が空行の場合)
それをVSCodeの公式マーケットプレイスのURLに変更します。

手順1: Antigravity Settingsを開く

Antigravityを起動
左サイドメニューの拡張機能を選択・・・すると👇️が開きます。

![スクリーンショット 2026-02-17 022038.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8f7cfb37-3cdd-4250-9ee8-1e633ae70e77.png)

👆️ Antigravity settingsを選択します。すると👇️が開きます。

![スクリーンショット 2026-02-17 022305.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/925dbebf-8ee6-4484-8366-b4c1ef538d46.png)


手順2: マーケットプレイスのURLを変更

マーケットプレイスを VS Code Marketplace（Microsoftの公式マーケットプレイス）に変更

MARKETPLACE セクションで以下のように変更します：


Marketplace Item URL

`https://marketplace.visualstudio.com/items`

Marketplace Gallery URL

`https://marketplace.visualstudio.com/_apis/public/gallery`

設定後のスクリーンショット

![スクリーンショット 2026-02-17 021931.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2b7777e3-adb0-48c1-a86d-1a36c555f3c4.png)

設定すれば拡張機能のマーケットが変わります。

設定の変更が反映されてない場合はAntigravityを再起動させましょう。

※VSCodeでは動いてもAntigravityでは動かない拡張機能もあるので注意してください。