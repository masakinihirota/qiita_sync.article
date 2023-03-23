<!--
title:   VSCode 拡張機能 ChatGPT - Genie AI を使用するための下準備。モデル選択や日本語化等（Windows版 gpt-4対応)
tags:    ChatGPT,VSCode,setting.json,拡張機能
id:      27ef33b9edf4aa58fabd
private: false
-->

VSCode 上で ChatGPT を便利に使うためのツールの下準備をします。
これは過去に削除された拡張機能の代替ツールであり、その削除された拡張機能の機能をほぼ全部受け継いでいます。

## 主な機能

1. コードを範囲選択します。
1. 右クリックメニューから選択します。

### 右クリックメニュー

- コメントからコードを生成する （Codex 系モデルのみ使用可能です。）
- 選択した範囲からお手本を作る
- テストコードを作る
- バグを発見する
- リファクタリング（Optimize : 最適化）する
- コードの説明する
- コメントを挿入する
- コードを完成させる
- アドホックなメニュー（一時的に右クリックメニューを作成して使えるようにする）
- カスタムプロンプト１（設定画面でユーザーがカスタムしてつくる右クリックメニュー）
- カスタムプロンプト２（設定画面でユーザーがカスタムしてつくる右クリックメニュー）

**※機能の詳細はこれ以前に削除された拡張機能の説明部分を読んで下さい。**

※カスタムプロンプトの使い方として、例えば翻訳機能を設定をします。

## ChatGPT - Genie AI

https://marketplace.visualstudio.com/items?itemName=genieai.chatgpt-vscode

## 概要

- 以前の拡張機能と機能はほぼ同じです。
- `API Key`の保存方法が変わりました。
- モデルに名前を付けられるようになりました。
- アドホックメニュー その場で右クリックのコマンドの編集が可能になりました。
  （設定でアドホックメニューを有効化した場合）
- 対応モデルか増えました。
  > GPT-4 有料版 (追加)
  > GPT-4-03-14 スナップショットモデル 有料版 (追加)
  > GPT-4-32K 有料版 (追加)
  > GPT-4-32K-03-14 スナップショットモデル 有料版 (追加)
  > gpt-3.5-turbo 有料版
  > gpt-3.5-turbo-0301 スナップショットモデル 有料版
  > text-davinci-003 text-davinci-003 有料版
  > text-curie-001 text-curie-001 有料版
  > text-babbage-001 有料版
  > text-ada-001 text-ada-001 有料版
  > code-davinci-002 code-davinci-002 限定ベータ期間中は無料
  > code-cushman-001 限定ベータ期間中は無料

※GPT-4 は、OpenAI が開発した次世代の大規模言語モデルのことを指します。コンテキストサイズが 8k のバージョンと 32k のバージョンがあります。。
※コンテキストサイズが大きくなると、より長い文脈を理解することができるようになります。ただし、コンテキストサイズが大きくなると、計算量が増えるため、処理速度が遅くなる可能性があります。

※ アドホックメニューは自由に編集できます。
使用例としては"次の文章を翻訳してください"等と設定して使います。

## モデルの価格

追加されたモデルの価格は

- GPT-4-8k バージョン 1000 トークンにつき約 3 円（$0.03）
  （8k は約 8000 単語で約 24 円に相当、約 40 ページ〜64 ページの本の分量）
- GPT-4-32k バージョン 1000 トークンにつき約 6 円（$0.06）
  （32k は約 32000 単語で約 192 円に相当、約 160〜256 ページの本の分量）

## API Key 保存方法

`API Key` の 保存方法は **VSCode の左サイドバーからこの拡張機能アイコン** を開きます。
`Temperature:`の下に入力欄がありますのでなにか適当な質問します。

例
`TypeScriptでFizzBuzz問題を書いてください。`
質問を入力後`Askボタン`を押します。
そうすると右下に`API Key`が要求されますので入力します。
そして質問の回答がファイルに出力されます。

※この`API Key`は削除しない限り 2 回目からは要求されません。

## API Key 削除方法

`Ctrl + Shift + P` でコマンドパレットを開きます。
`Genie: Clear API Key`を入力します。
コマンドが現れるので選択するとキーが削除されます。
もう一度 FizzBuzz 問題を解かせようとすると`API Key`を要求してきますので削除されたのがわかります。

## VSCode での設定

設定例

```VSCode setting.json

  // ChatGPT - Genie AI
  // AI の名前をつけます。
  "genieai.personalizedName": "＜AIの名前＞",
  // 使用するモデルです。
  // ※ 重要 このモデル選択で有料か無料かが決まります。
  // "genieai.openai.model": "gpt-4",
  "genieai.openai.model": "code-davinci-002",
  // チャットボットが返答を生成するときに、どれだけ多様で創造的な言葉を使うかを決めるものです。Temperatureは、0から1までの間の数値で表されます。
  // ※重要 プログラミングコードなら0.5～0.7が良いとされています。
  "genieai.openai.temperature": 0.5,
  // 右クリックメニューの日本語化
  "genieai.promptPrefix.addTests": "次のコードに対するテストを実装してください",
  "genieai.promptPrefix.findProblems": "次のコードの問題点を見つけてください",
  "genieai.promptPrefix.optimize": "次のコードを最適化してください",
  "genieai.promptPrefix.explain": "次のコードを説明してください",
  "genieai.promptPrefix.addComments": "次のコードにコメントを追加してください",
  "genieai.promptPrefix.completeCode": "次のコードを完成させてください",
  // ユーザーによるカスタム設定 右クリックメニューが増える
  "genieai.promptPrefix.customPrompt1": "次の文章を翻訳してください",
  "genieai.promptPrefix.customPrompt1-enabled": true,
  "genieai.response.showNotification": true,
  "genieai.promptPrefix.adhoc-enabled": false,

```

※この通り`gpt-4`（有料）にも対応しています。
※アドホックメニューはデフォルトでは無効です。

# 参考

https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt&ssr=false#review-details

この拡張機能は下記の方にある削除された拡張機能を作った作者がこの代替ツールを提案しています。

---

# Superpower ChatGPT

この拡張機能は、現在 不具合でブラウザ上で ChatGPT を操作しようとするとうまく動作しません。（現在:2023 年 3 月 23 日）

Chrome ブラウザでの拡張機能

https://chrome.google.com/webstore/detail/superpower-chatgpt/amhmeenmapldpjdedekalnfifgnpfnkc

この拡張機能は
Chrome ブラウザ上で ChatGPT を便利に使う拡張機能です。
markdown、JSON、text 形式で保存できます。
テンプレートを使えます。
書き直し、わかりやすく書き換え、説明、要約等。
履歴の選択削除
文字数のカウント
その他

---

# 以下 2023 年 3 月 22 日以前の古い情報

# 拡張機能そのものがマーケットプレイスから削除される

※ 2023 年 3 月 19 日

https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt

## 要約

- ChatGPT 拡張機能が規約違反で使用されていることが判明し、私たちは残念ながらプロジェクトを終了することにしました。
- vs-code マーケットプレイスには以前のバージョンを削除する機能がないため、製品を完全に削除することができないのが残念です。
- ChatGPT 拡張機能が公式製品であると誤解されることがありましたが、実際にはオープンソースプロジェクトであり、私たちはこのプロジェクトを商業化することよりもオープンソース化することを目指していました。
- ChatGPT 拡張機能のソースコードはリポジトリに残され、学習や改善に役立てることができます。
  私たちがこの決断を下すことになったことを心よりお詫び申し上げます。多くの方々に愛されていたこのプロジェクトに未来を託していただいた方々にも深くお詫び申し上げます。
  代わりに、同様の目的を持つ素晴らしいプロジェクトが vs-code マーケットプレイスにたくさんありますので、ぜひお試しください。私たちはこの拡張機能を今後公開する予定はありませんが、ソースコードは自由にご利用いただけます。

# vsix ファイルからインストールして動作を確認する方法

https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt&ssr=false#version-history
上記リンクから、Version History から **Version 3.9.7（最新版より一つ前）** を Download
次に
VSCode から
VSCode の左サイドーバーの「拡張機能」を選択
左サイドーバー「拡張機能」の右上にある
三点リーダーアイコンを選択
ドロップダウンメニューが出てくる
その最下部の**vsix からのインストール**を選択。
ダウンロードしていたファイルを選択。
`gencay.vscode-chatgpt-3.9.7.vsix`
（実質最終バージョン）
インストールボタンを押す。
動作してなかったら VSCode を再起動する。
（更新をうながすボタンは無視すること）
**※この拡張機能を使用することは、セキュリティリスクがあるためお勧めできません。情報セキュリティには常に注意が必要であり、信頼できるソースからのみソフトウェアや拡張機能をインストールすることをお勧めします。代替の拡張機能を探してお使いください。**

# 結論から

追記 2023 年 3 月 16 日
`GPT-4` が発表されました、使える（openai に申込済み）＆お金に余裕がるなら `GPT-4` を使いましょう。
API も発表されていますので、すぐに VScode 拡張機能も誰かが発表するでしょう。
（もしかしたら、近い将来この拡張機能も対応するかもしれません。）

例えとして、能力的には `gpt-3.5-turbo` は高校生レベルの英会話ができる人ですが、`GPT-4` は大学教授レベルの英語ができる人です。

しかし AI が何でも出来て仕事が消えるという心配をしている人を見かけますが、英語を出来るようになったからと言ってそれで問題が全て解決できるようになるとはおもいません、まだ現状はすごい便利な道具が発明された程度です。

追記終了

ChatGPT のアカウントを取得後
VSCode を立ち上げ ChatGPT の **「拡張機能 ChatGPT」** をインストールします。
この拡張機能の機能は**VSCode の右クリックメニューから ChatGPT を動かします。**

https://marketplace.visualstudio.com/items?itemName=gencay.vscode-chatgpt

拡張機能をインストール後、VSCode の`setting.json`に下記を貼り付けます。
（この設定は個人のプログラミング用です、誰もが見られる`setting.json`にパスワードなどが書かれているので学校や会社組織では利用しないでください。）

※動かず、赤文字が返ってきたら VScode を再起動してみてください。

```setting.json（個人用）
  // VSCode 拡張機能 ChatGPT v3.9.5 設定 2023年3月10日
  // ※最重要 使用AIモデル どのモデルを選ぶかで料金が決まる
  // 使用AIモデル
  // code-davinci-002は自然言語をコード化するのに最適化されたモデル
  "chatgpt.gpt3.model": "code-davinci-002",
  // ※秘密 API Key
  "chatgpt.gpt3.apiKey": "＜API Key＞",
  // チャットボットが返答を生成するときに、どれだけ多様で創造的な言葉を使うかを決めるものです。Temperatureは、0から1までの数値で表されます。「0」は予測しやすい言葉を使うことを意味し、「1」は予測しにくい言葉を使うことを意味します。
    // ※重要 プログラミングコードなら0～0.5～0.9が良いとされています。
  "chatgpt.gpt3.temperature": 0.7
  // 厳密 0
  // バランス 0.5
  // 独創:0.9

  // ログイン
  // EdgeブラウザのPath
  "chatgpt.chromiumPath": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  // openai.comのアカウント:メールアドレス（ログイン認証時に使用）
  "chatgpt.emailAddress": "＜メールアドレス＞",
  // ※秘密 openai.comのアカウント:パスワード（ログイン認証時に使用）
  "chatgpt.password": "＜パスワード＞",

  // 右クリックメニューの日本語化
  "chatgpt.promptPrefix.addComments": "次のコードにコメントを追加してください",
  "chatgpt.promptPrefix.addTests": "次のコードに対するテストを実装してください",
  "chatgpt.promptPrefix.completeCode": "次のコードを完成させてください。",
  "chatgpt.promptPrefix.explain": "次のコードを説明してください",
  "chatgpt.promptPrefix.findProblems": "次のコードの問題点を見つけてください",
  "chatgpt.promptPrefix.optimize": "次のコードを最適化してください",
  // ユーザーによるカスタム設定 右クリックメニューが増える
  "chatgpt.promptPrefix.customPrompt1": "＜自由に設定する１＞",
  "chatgpt.promptPrefix.customPrompt1-enabled": false,
  "chatgpt.promptPrefix.customPrompt2": "＜自由に設定する２＞",
  "chatgpt.promptPrefix.customPrompt2-enabled": false,
  // 自動的にスクロールをするかどうか
  "chatgpt.response.autoScroll": true,

```

※`code-davinci-002`モデルは現在 `Limited beta` で無料で使えるモデルです。 (2023 年 3 月 11 日)
※`gpt-3.5-turbo`最新モデルを試してから`code-davinci-002`モデルも使ってみて比較してみると良いと公式で書かれています。
※`gpt-3.5-turbo`最新モデルはスピードが`code-davinci-002`モデルより体感で **100 倍** 早いです、ただし有料。

**参考**

https://platform.openai.com/docs/models/codex

# 使い方

範囲選択 ＞＞ 右クリックメニューから選択します。

- コメントからコードを生成する （Codex 系モデルのみ使用可能です。）
- 選択した範囲からお手本を作る
- テストコードを作る
- バグを発見する
- リファクタリング（Optimize : 最適化）する
- コードの説明する
- コメントを挿入する
- コードを完成させる
- アドホックなメニュー（一時的に右クリックメニューを作成して使えるようにする）
- カスタムプロンプト１（設定画面でユーザーがカスタムしてつくる右クリックメニュー）
- カスタムプロンプト２（設定画面でユーザーがカスタムしてつくる右クリックメニュー）

# 実際に使用してみる

VSCode を開き、新しいファイルを作ります。
コメントにして、言語と命令を書きます。

```test001.js (フォーマット)
// 言語を指定
// 命令を書く

```

## 実際の例

```test001.js
// Javascript
// 1 から 10 までを表示する

```

- 必要なコメント部分を範囲選択します。
- 右クリックメニューを開き、`ChatGPT-Codex: Generate code`を選択します。
- 左側に CHATGPT: CONVERSATION WINDOW が開きコードを順次出力していきます。
- （待つ、待つ、待つ）別の作業をするか、休憩をしていましょう。
- `CopyもしくはInsert`で カーソルのある場所にコードを挿入します。
  （終了）

## 出力結果

```test001.js
// Javascript
// 1から10までを表示する
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

```

※注意 右クリックメニュー`ChatGPT-Codex: Generate code`は Codex 系のモデルのみ使用可能です。`gpt-3.5-turbo`モデルでは右クリックメニューに表示されません。ただ，テストを書かせたり、コメントを書かせたりすると体感で 100 倍早いです。（さすが有料）
スピードを求めるのならば `OpeAI API Key - code-cushman-001`モデルも速さだけなら`gpt-3.5-turbo`モデルに負けません。（挙動がちょっとおかしいけど）

## 使い分け

現在設定している`code-davinci-002`は自然言語をコード化するのに最適化されたモデルです。
会話での AI モデルを使いたい場合は、ブラウザ上で ChatGPT を利用しています。

**参考**

https://qiita.com/tak001/items/c3000b3ce9b6e72b2ae5

VScode から ChatGPT を使用するのに最低限必要なのは

- openai.com のアカウント（メールアドレス、パスワード）
- API Key

## 参考

OpenAI Codex の使い方｜ npaka ｜ note
https://note.com/npaka/n/n895083c75c16

ChatGPT は VSCode 上で使えるようになった「だけでは駄目」で、
人間側にもテクニックで潜在能力を引き出す力が求められます。

## COT

Chain-of-Thought というテクニック

### 参考

ChatGPT は馬鹿じゃない！ 真の実力を解放するプロンプトエンジニアリングの最前線

https://zenn.dev/noritamarino/articles/a2321a65fe2be8

```
問題
鶴と亀が合計80匹います。
足の数の和が200本であったとき、鶴と亀はそれぞれ何匹いますか？

回答は以下のJSONフォーマットに従ってください。
{
   "鶴の数": ,
   "亀の数":
}

```

上記のように単純に問題を与えると、答えを間違える。
記事の実験では 100 回解かせて数～３０％の正解となる。

次に、
下記のように一旦解法を与えてから問題を解かせると **COT という連鎖的な思考** をさせることで正解率が高くなる。
記事の実験では 100 回解かせて 90％の正解となる。

```
例題
鶴と亀が合計80匹います。
足の数の和が200本であったとき、鶴と亀はそれぞれ何匹いますか？

解法
鶴の数をx、亀の数をyとする
鶴と亀の合計は6匹なので、x + y = 6 (式1)
足の数の合計は20本なので、2x + 4y = 20 (式2)
式1を変形すると、y = 6 - x (式3)
式2に式3を代入すると、2x + 4(6 - x) = 20 (式4)
式4を変形する
2x + 24 - 4x = 20
-2x + 24 = 20
-2x = 20 - 24
-2x = -4
-2x / -2 = -4 / -2
x = 2
これを式1に代入すると、
2 + y = 6
y = 6 - 2
y = 4
よって、鶴は2匹、亀は4匹である

答え
{
    "鶴の数": 2,
    "亀の数": 4
}


問題
鶴と亀が合計80匹います。
足の数の和が200本であったとき、鶴と亀はそれぞれ何匹いますか？

解法

答え
{
    "鶴の数": ,
    "亀の数":
}

```

## ChatGPT の「モデル」とは

人間の言語を理解し生成するために膨大なテキストデータを学習した数学的なモデルです。入力された文章に対して適切な返答を生成することができます。
車のエンジンみたいなイメージです。

※最新の情報が含まれる場合は **「Bing」** のほうが信頼できる。

終わり。

# 以下 詳細 (という名の私的メモ)

前提 OpenAI のアカウントはすでに持っている

## 環境

OS : Windows10
エディタ : VSCode
ブラウザ : Edge
ブラウザ : Chrome
AI 検索サイト [Bing https://www.bing.com/](https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx)

### OpenAI API

ChatGPT のサービスを提供しているサイト
https://platform.openai.com/overview

※ 必須
OpenAI アカウント （ChatGPT を使用できるようになります）
このアカウントを取るのに SMS 認証が必要です。

OpenAI で API Key を取得する。
https://platform.openai.com/account/api-Keys

ChatGPT のモデルには無料のモデルと有料のモデルがあります。

また、実は最新の ChatGPT のモデル gpt-3.5-turbo が既存のモデルのコストより 1/10 安いです。
有料のモデルを選ぶならこれを選ぶべきだと思います。

### Microsoft

Microsoft アカウント （Bing を使用するるために登録に必要）
Bing は無料 （最新の調べ物をする時は調査した URL を表示してくれる Bing の方が信頼できます。）

### Chrome 拡張機能

**Bing Chat for All Browsers**
Chrome ブラウザでも Bing が使えるようになる Chrome の拡張機能。

https://chrome.google.com/webstore/detail/bing-chat-for-all-browser/jofbglonpbndadajbafmmaklbfbkggpo

※ Microsoft アカウントが必要 Bing が Chrome でも使えるようになります。

## 拡張機能 ChatGPT の設定

VScode の設定
左下の`歯車アイコン`から`設定`を選択します、そして検索ワードに下記ワードを入力します。
`Chatgpt`

### 設定項目 Chatgpt:Method

`Use browser integration`
`Use OpenAI API Key integration`
の 2 つから選びます。

`Use browser integration`
ブラウザ経由でログインする。
この方式はブラウザを開き常にログインしている必要があります。
ブラウザや VS-Code インスタンスを閉じると、次のセッションで再度ログインが必要となります。
メールアドレスとパスワードが設定してあると自動で入力して、ログインウィンドウを自動で最小化します。

`Use OpenAI API Key integration`（推奨）
API Key を使用してログインします。
こちらのほうが安定していて、ログインも早い。
`OpenAI API Key`が必要

### 設定項目 Chatgpt: Authentication Type

`OpenAI Authentication` （推奨） メールアドレスを利用して OpenAI にログイン
`Google Authentication` Google アカウントを利用して OpenAI にログイン
`Microsoft Authentication` Microsoft アカウントを利用して OpenAI にログイン

### 設定項目 Chatgpt: Email Address

OpenAI の登録メールアドレス
ログイン時に必要

### 設定項目 Chatgpt: Password

OpenAI の登録パスワード
ログイン時に必要

### 設定項目 Chatgpt: Chromium Path

ブラウザ : Edge への Path
登録しなくても一応動く

### 設定項目 Chatgpt › Gpt3: Generate Code-enabled

コメントやコードを選択後、右クリックメニューからコードを生成出来るようにする。
例えば、関数を選択すると使用例が表示される。
この項目は code-\*\*\* モデル（コード生成用専用モデル）でのみ使える。

### 設定項目 Chatgpt › Prompt Prefix: Add Tests

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードに対するテストを実装してください」

Prefix
接頭辞,接頭語,人名の前に付ける敬称 他動～の前に付ける

### 設定項目 Chatgpt › Prompt Prefix: Add Tests-enabled

VSCode の右クリックメニューにテスト項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Find Problems

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードの問題点を見つけてください」

### 設定項目 Chatgpt › Prompt Prefix: Find Problems-enabled

VSCode の右クリックメニューに問題を見つける項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Optimize

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードを最適化してください」
リファクタリングをしてくれる。

Optimize
最も効果的にする,最大限に利用する,最適化する

### 設定項目 Chatgpt › Prompt Prefix: Optimize-enabled

VSCode の右クリックメニューに最適化の項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Explain

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードを説明してください」

### 設定項目 Chatgpt › Prompt Prefix: Explain-enabled

VSCode の右クリックメニューに説明させる項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Add Comments

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードにコメントを追加してください」

### 設定項目 Chatgpt › Prompt Prefix: Add Comments-enabled

VSCode の右クリックメニューにコメントを追加する項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Complete Code

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

「次のコードを完成させてください。」

### 設定項目 Chatgpt › Prompt Prefix: Complete Code-enabled

VSCode の右クリックメニューにコードを完成させる項目を追加する。

### 設定項目 Chatgpt › Prompt Prefix: Custom Prompt1

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

＜自由に設定する１＞
※不要なら無効にする

### 設定項目 Chatgpt › Prompt Prefix: Custom Prompt1-enabled

VSCode の右クリックメニューに項目を追加する。
※不要なら無効にする

### 設定項目 Chatgpt › Prompt Prefix: Custom Prompt2

入力する文言の先頭に追加する文字列。
日本語で書くと、返信が日本語で返ってくる。

＜自由に設定する２＞
※不要なら無効にする

### 設定項目 Chatgpt › Prompt Prefix: Custom Prompt2-enabled

VSCode の右クリックメニューに項目を追加する。
※不要なら無効にする

### 設定項目 Chatgpt › Prompt Prefix: Adhoc-enabled

アドホックな右クリックメニューを追加する。
設定ファイルをいじらなくてもその場で右クリックメニューを追加、編集できる。

アドホックとは、ラテン語で「特定の目的のための」「その場限りの」などという意味の言葉です。

### 設定項目 Chatgpt › Gpt3: Api Key

OpenAI の API を利用するための API Key を登録する。
※公開しないよう、セキュリティに注意してください。

### 設定項目 Chatgpt › Gpt3: Model （最重要）

OpenAI のモデルは、目的によってプロンプトを使い分ける必要があります。ドキュメンテーションを参照してください。400 件の Bad Request というエラーが出たら、プロンプトに合ったモデルを選んでいるかどうか確認してください。

※ どのモデルを選択するかで、最新のモデルか、有料のモデルか、無料のモデルかを選ぶことが出来る、この拡張機能でいちばん重要な設定です。
（有料モデルでも、最初の 5 ドル相当は無料サービスがあります）

※ 別項目にモデルの説明があります。

### 設定項目 Chatgpt › Gpt3: Temperature （重要）

Temperature とは、OpenAI の API でテキストを生成するときに使うパラメーターの一つです。
temperature の値が高いほど、モデルはよりリスクを取って創造的なテキストを生成します。
逆に、値が低いほど、モデルはより確率の高い単語を選んで決まった答えに近いテキストを生成します。

例えば、0.9 という高い値を使うと、より面白くて予測できないテキストが出てきますが、0 という値を使うと、より正確で一意なテキストが出てきます。
プログラミングをするなら 0.5 ～ 0.7 が良いとされています。

### 設定項目 Chatgpt › Response: Auto Scroll

返信を自動的にスクロールするかどうか決めます。

# モデル（最重要）

ChatGPT の「モデル」とは
人間の言語を理解し生成するために膨大なテキストデータを学習した数学的なモデルです。入力された文章に対して適切な返答を生成することができます。
車のエンジンみたいなイメージです。

## コードを書くなら（期間限定で無料）

OpeAI API Key - code-davinci-002

## チャットするなら（有料：5 ＄相当まで無料）

OpeAI API Key - gpt-3.5-turbo gpt-3.5-turbo

## チャットするなら（無料）

Browser autologin - default ChatGPT model
を選択します。

現在、gpt-3.5-turbo はチャットに最適化された最高性能のモデルです。
一番の高性能ですが、他の有料モデルよりも 1/10 の料金で使用できます。

# モデルの種類

| モデル名             | 説明                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| GPT-3.5              | GPT-3 を改良し、自然言語やコードの生成だけでなく、理解することができるモデル |
| DALL-E (Beta)        | 自然言語によるプロンプトを与え、画像を生成・編集するモデル                   |
| Whisper (Beta)       | 音声をテキストに変換することができるモデル                                   |
| Embeddings           | テキストを数値に変換することができるモデル                                   |
| Codex (Limited beta) | 自然言語をコードに変換するなど、コードを理解し生成することができるモデル     |
| Moderation           | 繊細なテキストや安全でないテキストを検出することができる微調整されたモデル   |
| GPT-3                | 自然言語を理解し生成できるモデル                                             |

## 設定から選べるモデル

Chatgpt › Gpt3: Model の項目で AI のモデルを選択します。

| サービス名        | 採用モデル    | モデル名                                  | 最大リクエスト | 価格                                               |
| ----------------- | ------------- | ----------------------------------------- | -------------- | -------------------------------------------------- |
| Browser autologin | GPT-3.5       | default ChatGPT model                     | 不明           | 無料                                               |
| Browser autologin | GPT-3.5-turbo | ChatGPT Plus default model                | 不明           | 月額 20 ドル                                       |
| Browser autologin | GPT-3.5-turbo | ChatGPT Plus legacy model                 | 不明           | 月額 20 ドル                                       |
| OpeAI API Key     | GPT-3.5-turbo | gpt-3.5-turbo (既定)                      | 4096           | 1000 トークンあたり$0.08                           |
| OpeAI API Key     | GPT-3.5-turbo | gpt-3.5-turbo-0301 スナップショットモデル | 4096           | 1000 トークンあたり$0.08                           |
| OpeAI API Key     | GPT-3.5       | text-davinci-003                          | 4097           | 1000 トークンあたり$0.06                           |
| OpeAI API Key     | GPT-3         | text-curie-001                            | 2049           | 1000 トークンあたり$0.04                           |
| OpeAI API Key     | GPT-3         | text-babbage-001                          | 2049           | 1000 トークンあたり$0.02                           |
| OpeAI API Key     | GPT-3         | text-ada-001                              | 2049           | 1000 トークンあたり$0.01                           |
| OpeAI API Key     | Codex         | code-davinci-002                          | 2049           | 1000 トークンあたり$0.06（限定ベータ期間中は無料） |
| OpeAI API Key     | Codex         | code-cushman-001                          | 2048           | 未定（限定ベータ期間中は無料）                     |

※最大リクエストの単位 : tokens

参考

https://platform.openai.com/docs/models/codex

Codex モデルは、限定ベータ期間中は無料で使用でき、レート制限が緩和されます。

### 設定項目 Chatgpt › Gpt3: Model の解説

`Browser autologin - default ChatGPT model` 無料版
chat.openai.com で使用されているのと同じ Free Tier ChatGPT モデル。

`Browser autologin - ChatGPT Plus default model` 有料版
ChatGPT Plus 会員用のモデル

`Browser autologin - ChatGPT Plus legacy model` 有料版
ChatGPT Plus 会員用のモデル

`OpeAI API Key - gpt-3.5-turbo` gpt-3.5-turbo 既定 有料版
text-davinci-003 の 1/10 のコストで、GPT-3.5 の最高性能モデル、チャット用に最適化されたモデルです。

`OpeAI API Key - gpt-3.5-turbo-0301` スナップショットモデル 有料版
2023 年 3 月 1 日のモデル。この日時に情報が固定されたモデル。例えば 3 月 1 日は水曜日だが、他の日に今日は何日？と AI に聞いても必ず 3 月 1 日の水曜日と返信します。

`OpeAI API Key - text-davinci-003` text-davinci-003 有料版
text-davinci-003 モデルは gpt-3.5-turbo モデルの 10 倍コストがかかる

`OpeAI API Key - text-curie-001` text-curie-001 有料版
GPT-3 モデル 非常に高機能で、Davinci より高速で低価格。

`OpeAI API Key - text-babbage-001` 有料版
GPT-3 モデル 素直な作業ができる、非常に速い、コストが低い。

`OpeAI API Key - text-ada-001` text-ada-001 有料版
GPT-3 モデル 非常にシンプルな作業が可能で、通常 GPT-3 シリーズの中で最も高速なモデルであり、最も低価格です。

`OpeAI API Key - code-davinci-002` code-davinci-002 限定ベータ期間中は無料
code-davinci-002 自然言語をコード化するには最も高性能なモデル
コーデックスの中で最も高性能なモデル。特に自然言語からコードへの変換を得意とします。コードの補完だけでなく、コード内に補完を挿入することもサポートします。

`OpeAI API Key - code-cushman-001` 限定ベータ期間中は無料
Davinci Codex とほぼ同じ性能ですが、若干高速です。このスピードの優位性により、リアルタイムアプリケーションに強いといえます。完成を待たずにコードを送信するので出力上限の限界までコードを生成し続けます。

※ada が一番速度が速く料金も安いですが一番能力が低いです。
逆に davinci は一番能力が高いですが料金も一番高くなっています。

```
（高性能、高コスト）
text-davinci-003
text-curie-001
text-babbage-001
text-ada-001
（低性能、低コスト）
```

## 用語

スナップショットモデル
情報をその日付で固定されたモデル。

Embeddings
テキストやオブジェクトを数値のリストに変換する方法のことです。この数値のリストは、ベクトルと呼ばれます。ベクトルは、テキストやオブジェクトの意味や関係を表現できます。例えば、猫と犬は似ている動物なので、猫と犬のベクトルは近くにあります。埋め込みは、機械学習において、テキストやオブジェクトを扱いやすくするために使われます。

Moderation
テキストが不適切や危険な可能性があるかどうかを検出できるように調整されたモデルのことです。
節制や温和さという意味もあります。

Models - OpenAI API
https://platform.openai.com/docs/models

---

# 参考 1

https://qiita.com/akiraak/items/b8ad643eafe1a32341ff

## その他便利な使い方

###メソッド名を提案してもらう
`<処理内容>という処理を行うメソッド名の候補をいくつか教えてください`

### 変数名を提案してもらう

`<***>という役割の変数名の候補をいくつか教えてください`

### 要約、詳細な解説、小学生でもわかるように

`<用語>を要約して`
`<＊＊＊>を詳しく解説して`
`<＊＊＊>小学生でもわかるように解説して`

### 上限が来るなどして途中で止まったら

`続きを書いて`

### サンプルコードを教えてもらう

`<＊＊＊>の実例コードを教えて`
`<＊＊＊>のサンプルコードを教えて`

### データベース設計を提案してもらう

`<app機能>のデータベース設計して`
`チャット機能のデータベース設計して`

### 用途の違いを教えてもらう

`<A> と <B> の違いを教えて`

### 英単語の違いを教えてもらう

`hopeとwishの違いを教えて`

# 参考 2

https://delaymania.com/202302/webservice/chatgpt-fukatsu-prompt/

https://thepast.jp/blog/the-ultimate-guide-for-using-chatgpt-for-english-learning/

```
#命令書:
あなたは、プロの編集者です。
以下の制約条件と入力文をもとに、 最高の要約を出力してください。

#制約条件:
・文字数は300文字程度。
・小学生にもわかりやすく。
・重要なキーワードを取り残さない。
・文章を簡潔に。
・もし、最適な情報を提供できない場合は、その旨を伝える。

#入力文:
<ここに入力文を挿入>

#出力文:
```

```
#命令書:
あなたは、アメリカ人のプロの英語講師です。
以下の制約条件と入力文をもとに、 最高の添削を出力してください。

#制約条件:
・文字数は200文字程度。
・TOEIC 575点にも分かりやすく。
・文章を簡潔に。
・文法間違い、より適切な表現があれば訂正する。
・訂正した理由を述べる。

#入力文:(ここに日記を挿入)

#出力文:
```

```
#命令書:
あなたは、Pearson社に勤めるビジネスパーソンです。
以下の詳細をもとに、 最高のビジネスメールを書いて下さい。

#詳細:

担当者名：Adamさん
請求書送付のメール
請求書をメールに添付した
商品：英英辞典
金額：3,300円(税込)
#出力文:
```

```
#命令書:
あなたは、アメリカ人のプロの英語講師です。
以下の制約条件をもとに、 私とチャットしてください。

#制約条件:
・私は英語初級者である。
・トピックはあなたが決める。
・一文ずつ会話をする。
・文法間違い、より適切な表現があれば訂正し、その理由を述べる。
```

```
#命令書:
あなたは、アメリカ人のプロの英語講師です。
以下の制約条件とサンプルをもとに、 最高の問題を出力してください。

#制約条件:

問題を5つ作成する。
英語初級者にも分かりやすく。
深いリサーチが必要なトピックは避ける。
#サンプル:
 Some people say that technology has made us feel alone more often. Do you agree with this idea?
Do you agree that technology has made our lives easier?
#出力文:
```

## ポイント

押さえておきたいポイントは以下の 6 点です。

- ロールを明確にする
- 入力から出力を作ることを明確にする
- 何を出力するかを明確にする
- マークアップ言語を用いて、 本文でない部分を明確にする。
- 命令を箇条書きで明確にする。
- さまざまなワードで、AI の出力しうる空間を、 積極的に狭くしていく。

---

## その他の情報も加味して考えた命令書

```
=命令書:
あなたは高い能力を持つプロのWeb制作者です。
以下の制約条件と入力文を守ってください。

=制約条件:
・英語で調べて日本語で回答してください
・プログラミング初心者でも理解できるようにわかりやすく解説してください
・一歩一歩考えていきましょう
・コードを書く際にどうやって使うかを考えます
・重要なキーワードを取り残さない
・もし、最適な情報を提供できない場合は、その旨を伝える
・より良い回答をするために、もっと情報が必要な場合は私に質問をしてください



=入力文:




=出力文:




```

=に変えたのはエディタで markdown ファイルを読み込むと、つかうエディタによっては見出しになってしまうから。

英語で調べることで良い回答が得られることが知られてきたので、
英語で調べて日本語で回答してください
とすることで翻訳する手間が減る。

# 参考 3 キーワードテクニック

`＊＊＊の要点を教えて`

`＊＊＊ と比較表にして`

途中で止まってしまった場合は、
`続きを書いてください`

# 参考 4 英語論文の要約

```
論文「XXX」の内容を以下の構成で教えてください。

-abstract
-background
-methods
-results
-discussion
-limitation
-possible application
```

# 参考 5 ChatGPT の会話の保存方法

## ブラザの標準機能 HTML ファイルで保存

これが一番オススメ、HTML 形式で保存されるのでとても見やすい。

https://gpt.webmist.info/chatgpt-output-log/

## Chrome 拡張機能 Save ChatGPT テキストファイルで保存

この拡張機能は素のテキストファイルで保存するので、HTML 形式で保存される方法よりも見づらくなっている。

https://chrome.google.com/webstore/detail/save-chatgpt/iccmddoieihalmghkeocgmlpilhgnnfn/related?hl=ja

# 参考 6 プログラミングテクニック

## GitHub Copilot を利用する。

コードを書くなら GitHub Copilot
月額 10 ドル、年額 100 ドル
※これを使うのが一番いいかも

［速報］「GitHub Copilot X」発表、ChatGPT-4 ベースで大幅強化。AI にバグの調査依頼と修正案を指示、ドキュメントを学習し回答も － Publickey
https://www.publickey1.jp/blog/23/github_copilot_xchatgpt-4ai.html

## 関数をまるごとコピペする

その関数のドキュメントを自動生成してくれる。

## JDoc 形式

JDoc 形式でと指定すると、希望通り出力してくれる。

## 英語で聞く

日本語を DeepL で英語に翻訳して、結果を日本語に翻訳する。

# 参考 7 翻訳

文章を翻訳させてみる

例文

> Docs that feel tailored for you. Spend less time searching and more time learning, by getting personalized answers that are grounded in maintainer-written documentation, with inline citations. Load content → Ask question → Profit.

## code-davinci-002 (期間限定無料モデル) で翻訳

かかった時間 約 1 分
※自然言語をコードに変換するのに特化したモデル

> 1.  翻訳したもの: 適切に設計されたドキュメントです。検索の時間を減らし、著者によって書かれた文章内に記述された引用と個別の回答の説明に基づいた学習の時間を増やしてください。コンテンツのロード → 質問の件名の間違い → 利益。

## gpt-3.5-turbo (有料モデル) で翻訳

かかった時間 3 ～ 5 秒

> 次のコードはプレーンテキストのプログラミング言語で書かれています：あなたに合わせた文書。メンテナーが書いたドキュメントに基づいた、インライン引用を含むパーソナライズされた回答を取得することにより、検索にかける時間を短縮し、学習に費やす時間を増やします。コンテンツを読み込む → 質問する → 利益を得る。

## DeepL で翻訳 Windows アプリ版で翻訳

かかった時間 1 秒

> あなたのために作られたドキュメント。検索する時間を減らし、学ぶ時間を増やしましょう。インライン引用を含む、メンテナが作成したドキュメントに基づいた、パーソナライズされた回答を得ることができます。コンテンツを読み込む → 質問する → 利益を得る。
