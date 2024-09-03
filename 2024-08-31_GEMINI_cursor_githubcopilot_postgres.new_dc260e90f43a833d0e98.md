<!--
title:   私の使用しているAI関連サイト 2024年 8月版
tags:    GEMINI,cursor,githubcopilot,postgres.new
id:      dc260e90f43a833d0e98
private: false
-->
AIのサイトは雨後の筍のごとく現れるのと同時に、新機能もよく追加やアップデートもされ追うのは大変です。
それらの中で自分が使っている or 良さそうと思う無料、有料AIサイトを並べてみました。

評価方法： 絶対相対評価
まず一番よく使うのをトップにおいて固定し、2番目からはその一つ上のサイトと比較して同じぐらい便利か？もしくは一段落ちるか？という感じで相対評価していきます。
同じぐらいに評価したものは同じティアに入れます。

# ティア 1

## gemini

https://gemini.google.com/app

Google謹製 AIに質問したい時は良くここを使います。 無料
また、Youtubeの要約も得意です。

例えば、Youtubeで「＊＊＊＊で5つの発表」という動画があった時、その5つをまとめてくれます。
動画を見なくても、その動画は何を言いたいのかがわかります。

動画の要約の使い方はプロンプトに、

```
https://www.youtube.com/のURL ＜＜＜＜ 優しく日本語で簡単な解説をしてください。

```

と入力する方法で使っています。



## GitHub Copilot

https://github.com/features/copilot

プログラムを書く時に使います。(年契約で課金中 月10ドル)
後発 (Cursor ＋ Claude 3.5 Sonnet) に便利機能が少し追い抜かれ気味ですが、そこら辺は頑張って欲しいですね。



## postgres.new

https://postgres.new/

PostgreSQL系DB付きの本格アプリを作るときにすごい便利なサイトです。

例えば、
todoアプリを作るのを手伝ってください。とプロンプトを送ると、データベースのテーブル設計をしてくれて SQL文を書いてくれて同時にそのER図が表示されます。
更にAIと会話をして設計の修正や追加をしていけますし、同時にSQL文を実行するとER図にも反映されます。
その他にも色々機能があります。



# ティア 2

## notebookLM

https://notebooklm.google.com/

読み込んだ資料「のみ」で答えを出してくれるAIサイト、
例えば数百ページのPDFファイルを読み込ませて質問すると、その箇所を示して教えてくれます。


## v0

https://v0.dev/chat

AIと相談しながらTailwindCSSで装飾されたフロントエンドを作るのを手伝ってくれます。
無料だと少し使えます、本当に便利ですが本格的に使うとなると課金が必要です。



## napkin

https://app.napkin.ai/signin

これはスライドショーやPDFファイルによくある説明用の図形を生成してくれるAIです。
本当はティア1に入れたいのですが、使い始めたばかりなのでここに置きます。



## Supabaeのドキュメント用AI

https://supabase.com/

Supabaeに関する質問をAIが答えてくれます。
DB付きのアプリ開発者用です。



## YouTube Summary with ChatGPT & Claude

https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli

これはChromeの拡張機能です。
動画の要約などをしてくれます。

👇️TinaMindという拡張機能が👆️これの上位互換のようです。

https://chromewebstore.google.com/detail/tinamind-gpt-4%E6%90%AD%E8%BC%89%E3%81%AEai%E3%82%A2%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%88/befflofjcniongenjmbkgkoljhgliihe



## Chat Hub

https://chromewebstore.google.com/detail/chathub-gpt-4%E3%80%81gemini%E3%80%81clau/iaakpnchhognanibcahlpcplchdfmgma

これはChromeの拡張機能です。
有料は6つ、無料は2つまで同時に複数のAIチャットサイトにプロンプトを送れます。



## AI Studio

https://aistudio.google.com/app/prompts/new_chat

Google AI Studioは、Googleが提供する生成AIアプリケーション開発のためのプラットフォームです。



# ティア 3

## Perplexity

https://www.perplexity.ai/

Perplexity AIは、主に情報検索に特化した対話型AIアシスタントです。



## Phind

https://www.phind.com/search?cache=gclpezldrb0h884xb8qkladd

Phindは、プログラミングや技術的な質問に特化した回答をします。



## ChatGPT

https://openai.com/chatgpt/

無料ならGeminiの方が上なのでもうあまり使っていませんが、普通に良いです。



## Copilot

https://copilot.microsoft.com/

マイクロソフト社のAI検索サイトです。
このサイトはダークモードに対応していないのが残念です。



## wrtn

https://wrtn.jp/

読めません、リートンと読むようです。
それぞれの分野に特化したキャラクターが答えてくれます。
日本製と言うのでここに置きます。



## ImageFX

https://aitestkitchen.withgoogle.com/ja/tools/image-fx

画像生成系AIです。プロンプトを入力すると画像が生成されます。



# 普通 or それ以下

## Cursorエディタ

https://www.cursor.com/

次世代AIエディタ、最近アップデートされ、複数ファイルの同時生成、編集などが可能になっています。
もし課金して有料で使用するなら ティア1評価です。 (現在 未課金 Claudeと合わせて 月20ドル)

私はティア1のGitHub Copilotに課金をしているので、合わせると 合計 月30ドルになってしまうので見送り中です。



## Claude 3.5 Sonnet

有料で力を発揮します。 これはCursorエディタでほんのちょっとだけ有料版が使えます。
Cursorエディタとの相性は抜群に良かったです、お金持ちなら課金して使うとレジェンドクラスに便利なツールだと思います。
自分は課金してないのでここに置きます。



## Mozilla Developer Network (MDN) のウェブサイト

https://developer.mozilla.org/en-US/plus/ai-help

Web開発に必要なMDNのAIで聞けるサイトです。
英語なのでほぼ使っていません。
AIに聞けるので便利は便利です。



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

これはカードゲームから来ている評価の仕方で、 私はこれらに登録したAIサイトはブックマークバーにブックマークしているぐらい便利なサイトです。



# 終わりに

これらは美人投票ではなく、自分の価値観で便利だと判断したものを並べています。

現在、個人でAIサイト情報を追いかけるの不可能なので、もしこれが便利だというサイトがありましたら教えて下さい。

以上、現在私が使っているAIサイトでした。