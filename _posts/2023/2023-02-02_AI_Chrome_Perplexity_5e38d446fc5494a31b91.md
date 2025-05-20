<!--
title:   Perplexity AI（無料でAIが質問に答えてくれる神ツール）を Chrome の検索エンジンにする設定方法。
tags:    AI,Chrome,Perplexity
id:      5e38d446fc5494a31b91
private: false
-->
# サイトのURL

Perplexity AI: Ask Anything

https://www.perplexity.ai/

# 環境
Windows10
Chrome

# 自分から見た長所
ChatGPTだと信頼性が低い回答が返ってくるが、
Perplexity AIはその信頼度が低い分を補って、参考URLを添えて回答してくれる。
質問を継いで質問ができる。
次の質問候補を出してくれる。

# 欠点
日本語変換の決定キーを押すと質問文として送信されてしまう。
ChatGPTは回答の仕方が文であったり表であったり表現が豊かだが、
Perplexityは文章と参考サイトのリンクが表示されるだけ。
性能ではChatGPTに負けている。（その分、回答の信頼度は高い）

# Chromeでの設定方法
Chrome右上の「︙」（縦3点リーダー）から
＞設定
＞左サイドのメニューから「検索エンジン」
＞検索エンジンとサイト内検索を管理する

## 設定ページはURL入力からダイレクトに飛べる

`chrome://settings/searchEngines`

![Chromeキャプチャ指示挿入済み.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ac38f205-05fe-70f2-b595-7da98dcb34de.png)

# 設定例

設定例1

```
PerplexityAI
っｆ
https://www.perplexity.ai/?q=%sについて日本語で答えてください。
```

実際にキャプチャした設定例1
![キャプチャ設定例1.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/413909cf-591d-90ee-78e8-3e01c06436e3.png)


設定例2

```
PerplexityAI
ff
https://www.perplexity.ai/?q=%sについて日本語で答えてください。
```

# ショートカットキーについて
「っｆ」と「ff」これは日本語入力時でも英語入力時でもホームポジションから動かさないで入力できるため。
※各自の使いやすいショートカットキーを設定してください。

「q=%sについて日本語で答えてください。」
この%sは質問するキーワードで、
その後ろの文章を自動的に付け足して質問をしてくれます。


## 日本語入力時
日本語入力時の詳細な動作は
Fキーを2回にリターンキーで確定＋スペースキーを押すと検索エンジンが「Perplexity AI」に変わります。
スペースキーを押して入力単語がショートカットキーだとChromeに認識させる必要があります。

変換を記憶させておけば
っｆがffに変換され英語入力時と同じになるのであとはスペースキーを押せば検索単語を受け付けてくれる。

## 英語入力時
英語入力時だと、ff（自分で設定したショートカットキー）の2文字＋スペースキーで検索単語を受け付けてくれる。

# 検索エンジンのデフォルトに設定する。
perplexityを設定した右側に「︙」（縦3点リーダー）があるのでそれを押して、
デフォルトを選択すると、デフォルト設定になる。




# 早速質問してみる。

## 手順
新しいタブを開き、ブラウザのフォーカスが自動的に検索窓に移動する。
ショートカットキーを入力すると、検索エンジンがPerplexity AIに変更される。
そこに検索キーワードを入力する。

この手順だとホームポジションから手を動かさなくてもよい。

## 実践
日本語入力時
`Ctrl ＋ T` で新しいタブを開く
ショートカットキー ＋ 確定キー ＋ スペース ＋ キーワード入力

英語入力時
`Ctrl ＋ T` で新しいタブを開く
ショートカットキー ＋ スペース ＋ キーワード入力


## 質問 1
Perplexityの日本語の読み方を教えてください

PERPLEXITY
「perplexity」の日本語の読み方は「パープレクシティー」である[1][2]。意味としては、当惑、困惑、混乱などがある[3][4][5][2]。

URLをコピーすれば同じ質問を共有できる。

https://www.perplexity.ai/?s=u&uuid=ffe461e7-02ec-4115-8c02-0d4201fa2ea9

## 質問 2
PERPLEXITYについて日本語で答えてください。
PERPLEXITY
Perplexityとは、ある事象に対して、別の事象が発生した際の頻度（確率）を対数を組み合わせて表す機械学習の指標である[1]。Perplexity.aiは、AIを用いた質問応答サービスで、日本語にも対応している[2]。6つの特徴として、情報ソースが常に新しい[3]、情報の元ソースが明確[3]、個別のURLが残せる[3]、SNSで回答URLが自律して拡散される[3]、ログインが不要[3]、日本語にも対応する[2][4]などがある。

https://www.perplexity.ai/?s=u&uuid=5ba5e780-bc42-41c2-abae-1f356dc3263a

## 質問 3
ChatGPTについて日本語で答えてください。
PERPLEXITY
ChatGPTは、OpenAIが開発した自然言語処理モデルであり、テキストで質問を投げかけることでAIが回答を表示する[1]。Google Translateの拡張機能を使うことで日本語化することが可能であり、ページ全体を日本語化するのが良い[2]。ChatGPTは文章を書くためのツールとして使用され、子供にも分かりやすく説明することが可能[3]。

https://www.perplexity.ai/?s=u&uuid=4055206d-bbb7-4d7b-a609-c96aacbd357a


# Chrome拡張機能

Perplexity

https://chrome.google.com/webstore/detail/perplexity/hlgbcneanomplepojfcnclggenpcoldo/

- ツールバーから簡単に質問できる
- 閲覧中の質問に簡単に回答できます。
- ワンクリックでGoogleやBingの検索エンジン体験を強化

# 日本語入力に対応したPerplexity AIサイト

日本語入力だと変換時に送信されてしまうがその欠点を緩和してくれるサイト。

perplexity Askに聞いてみる

https://pancakeknife.bubbleapps.io/perplexity


# （おまけ）google日本語入力に単語登録をする
（追加質問する時に入力しないと英語で返ってくる時がある）

ショートカットキー
ｔ

登録語句候補
について日本語で答えてください。
とはなんですか？日本語で解説してください。
を詳しく日本語で教えて下さい。
等
