<!--
title:   私の使用しているAI関連サイト 2024年 9月版
tags:    GEMINI,cursor,githubcopilot,gptengineer,postgres.new
id:      dc260e90f43a833d0e98
private: false
-->
# 評価方法： 絶対相対評価

まず一番よく使うのをトップにおいて固定し、2番目からはその一つ上のサイトと比較して同じぐらい便利か？もしくは一段落ちるか？という感じで相対評価していきます。
同じぐらいに評価したものは同じティアに入れます。

# 調査中

GUIでUIの微調整が出来る。

Reweb — The visual website builder for developers

https://www.reweb.so/



# ティア 1

## gemini

https://gemini.google.com/app

無料の利用可能 2024年9月15日 現在
課金有り 上位AIエンジンに


今はここを最もよく利用しています。
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



## notebookLM

https://notebooklm.google.com/

読み込んだ資料で **「のみ」** 答えを出してくれるAIサイトです。

例えば数百ページのPDFファイルでも読み込ませることも可能で、
質問すると、解説をしてくれて、引用した箇所もきちんと教えてくれます。







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






## YouTube Summary with ChatGPT & Claude

https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli

これはChromeの拡張機能です。
動画の要約などをしてくれます。

👇️TinaMindという拡張機能が👆️これの上位互換のようです。

https://chromewebstore.google.com/detail/tinamind-gpt-4%E6%90%AD%E8%BC%89%E3%81%AEai%E3%82%A2%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%88/befflofjcniongenjmbkgkoljhgliihe







# ティア 2



## Cursorエディタ

https://www.cursor.com/

次世代AIエディタ、最近アップデートされ、複数ファイルの同時生成、編集などが可能になっています。
もし課金して有料で使用するなら ティア1評価です。 (現在 未課金  20ドル／月で少々お高い。)
Claudeと合わせてつかうとものすごい生産性があると思います。




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





# ティア 3


## GPT Engineer

https://gptengineer.app/

無料の利用可能 2024年9月15日 現在
課金有り

* ドキュメント GPT Engineer Docs

https://docs.gptengineer.app/

現在 一部ベータ版

[v0](https://v0.dev/chat) の代替サービス。
同じようなことが出来るがちょっと違う。

* 良いところ

Supabaseとの連携 簡単！
複数ファイルの分割が可能( [v0](https://v0.dev/chat) では現在出来ない)。
他のライブラリに変更が可能。
例えば、shadcn/ui から MaterialUIに変更してくださいとお願いすると変えてくれます。

* 駄目なところ

デザインが [v0](https://v0.dev/chat) よりもよくないという声がチラホラ。






便利だけど上位互換のティア1,2にあるAIサイトが便利すぎてティア3評価になっているものたちです。

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




# 普通 or それ以下




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