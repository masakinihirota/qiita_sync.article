<!--
title:   GitHub Copilot ビーストモード for VSCode でのモードの自作が可能に (公式)
tags:    VSCode,githubcopilot
id:      10a9fb85bd04d885d0b5
private: false
-->
今回、VSCode1.102のリリースでAIモデルへの指示を独自にできるようになりました。
edit、ask、agent に続く第4のモードを自作できるようになりました。
これはその使用例の一つです。

エヴァンゲリオンを思い出しました。

# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

https://qiita.com/masakinihirota/items/8971aa8ccead3193e77f

https://qiita.com/masakinihirota/items/96e2eb8929b0321d1a20


## ソース

VSCode1.102のリリースノート（日本語訳） – もふもふのブログ

https://mome-n.com/posts/vscode-1.102-release/

June 2025 (version 1.102)

https://code.visualstudio.com/updates/v1_102

👆️に記載

## 必要バージョン

VSCode
バージョン1.102以上

## プラン

GitHub Copilot の proプラン以上を推奨。
proプラン(約1500円/月)は GPT-4.1 と GPT-4oを無制限に使えます。

## ビーストモードのソース(英語)

`https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf`

ビーストモードのインストール方法(英語)

`https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf#file-beastmode-install-md`


## 場所



![スクリーンショット 2025-07-23 004124.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/bff8f758-e8c8-47f6-af9a-19ede0770089.png)

ファイルの配置場所は `.gthub/chatmodes` の下になります。

`.github/chatmodes/[ファイル名].chatmode.md`
👆️ファイル名は自由に編集できます。
[ファイル名]がそのままモードの名前になります。



## 手動インストール方法

VSCodeのsettings.json (VSCodeの設定)を開き設定をします。

```settings.json
	// 自動実行モード GitHub Copilot Agent mode
	"chat.agent.enabled": true,
	// 自動実行モード (beast モード)
	// https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf
	"chat.tools.autoApprove": true,
	"chat.agent.maxRequests": 100,

```



👇️ 次に、GitHub Copilot を開き 「モードの構成...」を開きます。

![スクリーンショット 2025-07-23 004445.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/68674d5b-6fb6-4ed7-94fa-dca2c32d2719.png)


👇️ そうすると、上部にウィンドウが開きます。
＋新しいカスタム チャット モードファイルを作成... で新しく作成します。

![スクリーンショット 2025-07-23 004523.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/5f6cdf8f-480a-4514-8fdf-edb40370578e.png)



testと入力すると、このようにファイルが作成されます。

![スクリーンショット 2025-07-23 004833.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/97a3fbdc-eec1-4d27-a028-8baa3352228d.png)

`test.chatmode.md` ファイルが新しく作成されるので、指示を入力します。

`.github/chatmodes/[ファイル名].chatmode.md`

ここにビーストモードファイルの内容をコピーします。

[https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf#file-beastmode-chatmode-md](https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf#file-beastmode-chatmode-md)



## 使い方

他のモード(edit ask agent)と同様にモードを選択して使用するだけです。



## その他

他のサンプルはコチラをご覧ください。

github/awesome-copilot: Community-contributed instructions, prompts, and configurations to help you make the most of GitHub Copilot.

https://github.com/github/awesome-copilot

Xで、モードのファイル内容を **Gemini CLI** に渡して実行させてみるなどの報告もありました。