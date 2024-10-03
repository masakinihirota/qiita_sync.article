<!--
title:   私の使用しているAI関連サイト 2024年 10月版
tags:    GEMINI,cursor,githubcopilot,gptengineer,postgres.new
id:      dc260e90f43a833d0e98
private: false
-->
# 評価方法： 絶対相対評価

まず一番よく使う、もしくは好きなAIサイトをトップにおいて固定し(「絶対評価」)、2番目からは1番のサイトと比較して同じぐらい便利か？もしくは一段落ちるか？という感じで「相対評価」していきます。
同じぐらいに評価したものは同じティアに入ります。

評価方法
* ティア 1
* ティア 2
* ティア 3
* 普通 or 自分には合わなかった


# ティア 1

## gemini

https://gemini.google.com/app

geminiを最もよく利用しています。
使い方は意味不明な単語の説明から、わからない文章を噛み砕いてもらう時に利用しています。

使う理由は他のよりも最も早く質問できるから。
他のサイトは過去の質問を読み込んでいるからか、立ち上がりが遅いのです。

Google謹製 AIに質問したい時は良くここを使います。 無料

また、Youtubeの要約も得意です。

例えば、Youtubeで「＊＊＊＊で5つの発表」という動画があった時、その5つをまとめてくれます。
動画を見なくても、その動画は何を言いたいのかがわかります。

動画の要約の使い方はプロンプトに、

```
https://www.youtube.com/のURL ＜＜＜＜ 優しく日本語で簡単な解説をしてください。

```

と入力する方法で使っています。
時々拒否されるのが玉にキズです。
一度拒否されても、続けて同じ質問をすると答えてくれる時がありました。
処理が追いつかないと拒否する仕様なのでしょうか？


## GitHub Copilot

https://github.com/features/copilot

プログラムを書く時に使います。(年契約で課金中 月10ドル)

学生や、OSSの開発者は無料

GitHub Copilotに OpenAI の o1-preview または o1-mini が搭載(予定)

現在 waitlist で募集中

OpenAI o1-preview/o1-miniがVS CodeのGitHub Copilot ChatとGitHub Modelsで利用可能に | gihyo.jp

https://gihyo.jp/article/2024/09/openai-o1-github-copilot?utm_source=feed

Try out OpenAI o1 in GitHub Copilot and Models - The GitHub Blog

https://github.blog/news-insights/product-news/try-out-openai-o1-in-github-copilot-and-models/

GitHub · Where software is built

https://github.com/o1-waitlist-signup



## v0

https://v0.dev/chat

無料の利用可能 2024年9月15日 現在
課金有り

* ドキュメント v0.dev docs

https://v0.dev/docs

AIと相談しながらTailwindCSSで装飾されたフロントエンドを作るのを手伝ってくれます。
無料でも毎日クレジットが復活するので少しつづ進めていけます。
うまくすれば複雑なものでも1日1コンポーネント、簡単なものなら(手動でやったほうが早いが)3つぐらい出来ます。

本当に便利ですが本格的に使うとなると課金が必要です。

### リセット時間

無料だと1日に10回チャットが出来ます、それ以上はリセット時間を過ぎるまで待つ必要があります。
リセット時間が過ぎると試行回数が回復します。

世界標準時0時 = 日本標準時午前9時 (未確認)

https://x.com/v0/status/1840944045964869898

v0 では、Supabase、Drizzle、Prisma に関する質問に答えられるようになりました。

v0を日本語で利用できるようになりました。

https://x.com/v0/status/1841313318101037391



## notebookLM

https://notebooklm.google.com/

読み込んだ資料で **「のみ」** 答えを出してくれるAIサイトです。

例えば数百ページのPDFファイルでも読み込ませることも可能で、
質問すると、解説をしてくれて、引用した箇所もきちんと教えてくれます。

Googleの自分専用AI作成サービス「NotebookLM」で学習データにYouTubeの動画を指定可能に - GIGAZINE

https://gigazine.net/news/20240927-google-notebooklm-video-sources/

notebookLMがYoutubeの動画に対応しました。

Youtube動画を読み込ませて (英語の技術動画とか)
文字起こし
要約
Q&A
日本語に翻訳
理解度チェッククイズ
等を作ってもらいます。

英語のリスニングが壊滅的な自分でも内容がわかるようになりました。



## Genspark

https://www.genspark.ai/

ユーザーの検索クエリに基づいて、リアルタイムで情報を整理し、カスタムページを生成します。これにより、複数のウェブサイトを巡る必要がなく、一つのページで包括的な情報が見れます。

* AIコパイロット機能

各SparkpageにはAIコパイロットが組み込まれており、ユーザーの質問に対して動的に応答し、必要な情報を提供します。

つまり、複数の各分野にチューニングされ特化したAIが内蔵されており、それぞれのAIが得意分野ごとに答えを出してくれます。

* バイアスの排除と高品質な情報提供

Gensparkは商業的なバイアスを排除し、信頼性の高い情報源からのデータを統合して提供します。これにより、ユーザーは広告や偏った情報に惑わされることなく、純粋なコンテンツにアクセスできます。

* Gensparkの並行検索

並行検索の仕方

＊＊＊を様々な軸で並行検索でまとめてください。
を様々な軸で並行検索でまとめてください。

並行検索のプロンプトの使用例

PlayStationを様々な軸で並行検索でまとめてください。





## postgres.new

https://postgres.new/

PostgreSQL系DB付きの本格アプリを作るときにすごい便利なサイトです。

例えばチャットで
「todoアプリを作るのを手伝ってください。」
とプロンプトを送ると、データベースのテーブル設計をしてくれて、SQL文を書いてくれて、同時にそのER図が表示されます。

更にAIと会話をして設計の修正や追加をしていけますし、同時にSQL文を実行するとER図にも反映されます。





## Supabaeのドキュメント用AI

https://supabase.com/

Supabaeに関する質問をAIが答えてくれます。
Postgres DB付きのアプリ開発者用です。




## tailwindgenie

https://tailwindgenie.com/

Next.jsのアプリを作る時、TailwindCSSの装飾でパーツを作るツール

無料



## TinaMind

https://chromewebstore.google.com/detail/tinamind-gpt-4%E6%90%AD%E8%BC%89%E3%81%AEai%E3%82%A2%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%88/befflofjcniongenjmbkgkoljhgliihe

YouTube Summary with ChatGPT & Claudeの上位互換

Google Chromeの拡張機能です。

たくさんの機能が色々ありますが、自分は主にYouTube動画の翻訳 要約に使用しています。

英文と翻訳文が上下2行に表示されて便利です。



# ティア 2

## Cursorエディタ

https://www.cursor.com/

次世代AIエディタ、最近アップデートされ、複数ファイルの同時生成、編集などが可能になっています。
もし課金して有料で使用するなら ティア1評価です。 (現在 未課金  20ドル／月で少々お高い。 GitHub Copilotと比べ)
Claudeと合わせてつかうとものすごい生産性があると思います。

---

参考書な本を購入して触ってみましたが、やっぱり課金しないとVSCodeのままで十分と感じました。
肝心な機能は課金しないと、満足にこのツールの機能を十分に引き出せません。

肝はVSCodeでGitHub Copilotだと拡張機能扱いであること、これは拡張機能でAIを組み込むと流石に限度があります、
Cursorはエディタ自体にAI機能を組み込み、ネイティブにAIを使えるので十二分に👇️エディタ機能を生かせることが可能です。

※複数ファイルへのプロンプト、提案、管理、コード自動生成、AIモデルの選択、細かな調整、推論等。

無料で使う方はDocで公式ドキュメントを読み込ませて、無料のAIモデルを登録して、そして質問して使うという方法が良いでしょうか？
このようなツールを使うと、無料と有料のAIの差は思った以上にでます。
そこらの普通のツールだと有料でもちょっと毛が生えた程度に便利になるぐらいですが、このツールは有料と無料の差はかなり大きいです。

Cursorは、Docs機能を使った公式ドキュメントのQ&Aツールにしようと思っています。
AIモデルは無料Geminiを使う予定です。



## Chat Hub

https://chromewebstore.google.com/detail/chathub-gpt-4%E3%80%81gemini%E3%80%81clau/iaakpnchhognanibcahlpcplchdfmgma

これはChromeの拡張機能です。
有料は6つ、無料は2つまで同時に複数のAIチャットサイトにプロンプトを送れます。




## napkin

https://app.napkin.ai/

これはスライドショーやPDFファイルによくある説明用の図形を生成してくれるAIです。

説明の文章と、それに対応する図形をうまく合うような選択が出来ません。
慣れればいけるのでしょうか？

名前がちょっと不評。





## AI Studio

https://aistudio.google.com/app/prompts/new_chat

Googleが提供する生成AIアプリケーション開発のためのプラットフォームです。



## YouTube Summary with ChatGPT & Claude

https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli

これはChromeの拡張機能です。
動画の要約などをしてくれます。




# ティア 3

* 便利だけど上位互換のティア1,2にあるAIサイトが便利すぎてティア3評価になっているものたちです。

## Perplexity

https://www.perplexity.ai/

情報検索に特化した対話型AIアシスタントです。

有料ユーザーには、マルチステップ推論 ＋ Web検索を使用するのが最適です。

新しい機能として「推論」フォーカス（ベータ版）が追加されました。
この機能は、最新のOpenAI o1-miniモデルを採用しており、パズル、数学、コーディング問題など、複雑な推論を伴うタスクに特化しています。



## Phind

https://www.phind.com/search?cache=gclpezldrb0h884xb8qkladd

プログラミングや技術的な質問に特化した回答をします。



## ChatGPT

https://openai.com/chatgpt/

無料ならGeminiの方が上なのでもうあまり使っていませんが、普通に良いです。



## Copilot

https://copilot.microsoft.com/

マイクロソフト社のAI検索サイトです。
このサイトはダークモードに対応していないのが残念です。




# 普通 or 自分には合わなかった


## GPT Engineer

https://gptengineer.app/

無料の利用可能 2024年9月15日 現在
課金有り

* ドキュメント GPT Engineer Docs

https://docs.gptengineer.app/

現在 一部ベータ版

最初は瞬間風速最大で大変便利なんだけど、その後が続かない。
それで出来るのは、ある程度勉強したら自力でできる内容です。
それだったら課金するならGitHub CopilotかCursorにしたほうが良いという結論です。

無料の一月分を使ってしまうと、その後数週間何もできなくなるのも悪印象。
v0だと1日10回分チャットが回復します。(上限は一月で200回までらしい、違うかも)

[v0](https://v0.dev/chat) の代替サービス。
同じようなことが出来るがちょっと違う。

* 良いところ

Supabaseとの連携 簡単！
複数ファイルの分割が可能( [v0](https://v0.dev/chat) では現在出来ない)。
他のライブラリに変更が可能。
例えば、shadcn/ui から MaterialUIに変更してくださいとお願いすると変えてくれます。

* 駄目なところ

デザインが [v0](https://v0.dev/chat) よりもよくないという声がチラホラ。
物は良いのだが、無料で試すとすぐに上限が来て、翌日には復活しない。どうやら一月ぐらい待つ必要があるようだ。
[v0](https://v0.dev/chat) は上限が来ても、翌日には少し復活する。








## Claude 3.5 Sonnet

有料で力を発揮します。 これはCursorエディタでほんのちょっとだけ有料版が使えます。
Cursorエディタとの相性は抜群に良かったです、お金持ちなら課金して使うとレジェンドクラスに便利なツールだと思います。
自分は課金してないのでここに置きます。



## Mozilla Developer Network (MDN) のウェブサイト

https://developer.mozilla.org/en-US/plus/ai-help

Web開発に必要なMDNのAIで聞けるサイトです。
英語なのでほぼ使っていません。
AIに聞けるので、便利は便利です。




## ImageFX

https://aitestkitchen.withgoogle.com/ja/tools/image-fx

画像生成系AIです。プロンプトを入力すると画像が生成されます。
本当に自然な感じで出力されます。

1日40回位までは無料で使用することができます。




## wrtn

https://wrtn.jp/

読めません、リートンと読むようです。
それぞれの分野に特化したキャラクターが答えてくれます。
日本製と言うのでここに置きます。



他、ありすぎて非表示。



# 用語集

## プロンプト

AIへの質問や提案などを指します。

### AIでよく使うプロンプト

```
＜＜＜＜ 優しく日本語で簡単な解説をしてください。

```

👆️左側にURLや聞きたい文言を入れてこのプロンプトを使います。
＜＜＜＜は区切り記号です。

自分は、「＜＜＜＜ 優しく日本語で簡単な解説をしてください。」をGoogle日本語入力の単語登録に登録しています。



## ティア

これはカードゲームから来ている評価の仕方で、 私はこれらに登録したAIサイトはChromeブックマークバーにブックマークしているぐらい便利なサイトです。



# 終わりに

これらは美人投票ではなく、自分の価値観で便利だと判断したものを並べています。

以上、現在私が使っているAIサイトでした。