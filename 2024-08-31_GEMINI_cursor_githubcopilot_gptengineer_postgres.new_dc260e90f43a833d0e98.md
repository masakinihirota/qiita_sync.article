<!--
title:   私の使用しているAI関連サイト UPDATE 2025年3月
tags:    Gemini,Perplexity,cursor,database.build,githubcopilot
id:      dc260e90f43a833d0e98
private: false
-->
# 結論

AIとは自分自身を映す鏡、自分の能力に左右される道具。

そしてドラえもん

フミコ・フミオさんはTwitterを使っています: 「ほぼ全員がご高齢者の会社上層部からの「対話型AI とは何かその功罪について簡潔に分かりやすく出来たら一言で説明しろ」という難題にヤケクソで「ドラえもんです」と答えたら「便利だけど取扱注意ということだな」とほぼ正解な認識をしてくれたので藤子・F・不二雄先生は偉大すぎる。」 / Twitter

https://twitter.com/Delete_All/status/1648519994580533255




# 現在のAIサイトの使い方、優先順 2025年2月

Gemini 2.0 を最初に使います。

その次は
Perplexity

さらに聞きたい時
genspark

wrtn
Gemini2.0がソース元を読み込まなかったときなど

コードを書くのは
GitHub Copilot

情報源を固定して、そこからだけ聞きたい時
notebookLMを利用して、ソースを登録します。
他にも、ある項目に特化した必要なデータにまとめて入力して答えてもらいます。

コンポーネント生成AI
v0





# 評価方法： 絶対相対評価

まず一番よく使う、もしくは好きなAIサイトをトップにおいて固定し(「絶対評価」)、2番目からは1番のサイトと比較して同じぐらい便利か？もしくは一段落ちるか？という感じで「相対評価」していきます。
同じぐらいに評価したものは同じティアに入ります。

評価形式
* ティア 1
* ティア 2
* ティア 3
* 普通 or 自分には合わなかった



## これからのAI

結論：人との対話型 CHOP が今後の主流になると思われます。

これからのAIプログラミングは、大きく分けて**AI自律型**と**人との対話型**の2つの方向に進むと考えられます。

つまり
AIにおまかせコース
AIといっしょに作るコース CHOP

*   **AI自律型**：AIに指示を与えるだけで、AIが自律的にタスクを実行し、**プログラミングを完了させる**タイプ。
*   **人との対話型（CHOP）**：AI（LLM）と対話しながら、人間がタスクグラフのコンテキストを取得・統合し、**コードを作成していく**タイプ。

記事の著者であるSteve Yegge氏は、現時点ではAI自律型に懐疑的であり、**人との対話型（CHOP）**を推奨しています。
ただし、将来的には**特別な目的を持った自律エージェント**が登場する可能性も示しています。



The Death of the Stubborn Developer | by Steve Yegge | Medium
https://steve-yegge.medium.com/the-death-of-the-stubborn-developer-b5e8f78d326b

The End of Programming as We Know It – O’Reilly
https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/

CLINEに全部賭けろ
https://zenn.dev/mizchi/articles/all-in-on-cline



|比較項目|自律エージェント|CHOP（チャットベースプログラミング）|
|:-------|:--------------|:------------------------------|
|**概念**|自律的にタスクグラフ全体を処理するAIエージェント。|LLMとのチャットを通じてタスクグラフのリーフノードを3Dプリントするようにコードを作成する。|
|**役割**|短いプロンプトを書き、結果をスポットチェックするだけで、重労働はエージェントが処理すると考えられている。|プログラマがLLMとチャットしながら、タスクグラフのコンテキストを取得・統合し、コードを作成する。|
|**スキル**|特になし。非技術系のCEOでもアプリを立ち上げられる可能性があるとされている。|チャットスキル、コンテキスト管理能力、ツールの利用能力などが必要。|
|**生産性向上**|CHOPが難しいと感じる人にとって、より簡単な解決策となる可能性がある。|企業エンジニアに最低30％の生産性向上をもたらし、状況によっては10倍、20倍以上に向上する可能性もある。|
|**学習コスト**|低い。新しいことを学ぶ必要がない。|高い。新しいスキルを学ぶ必要がある。|
|**実用性**|まだ実用的なものは登場していない。開発に時間がかかると予想されている。|現在利用可能。ChatGPTなどのコーディングアシスタントで利用できる。|
|**Sourcegraphの見解**|自律エージェントの研究結果を待つのではなく、プログラマがCHOPをより速く行うためのツールを提供することに注力している。|プログラマがタスクグラフを整理するエージェントであるべきだと考えている。LLMへの入力を高速化し、出力の処理を高速化することに注力する。|
|**課題**|実用的なものがまだない。|教える方法、学ぶ方法、評価する方法が不明。CodeAIの影響を測定する方法が不明。CHOPの恩恵は均一ではない。|
|**将来性**|懐疑的な意見もあるが、投資は続いている。|少なくとも3年、最大10年続くと予測されている。|

この表から、自律エージェントはまだ開発段階であり、**CHOPは現在利用可能**であることがわかります。著者であるSteveYegge氏は、**自律エージェントに頼るのではなく、すぐにCHOPを始めるべき**だと主張しています。









# 未来: 👇️これからリリース予定の期待しているサービス

## GitHub Spark (Wait List中)

自然言語を入力するだけでツールを作成できます。

［速報］GitHub、自然言語による指示だけでデスクトップ、タブレット、モバイルデバイス用のツールを作成できます。

対話だけでツールを作っていきます。コードを触れるプログラマーが直接コードを触ることも可能です。
つまりこのツールは主従逆転することになります。

「GitHub Spark」テクニカルプレビュー公開 － Publickey

https://www.publickey1.jp/blog/24/githubgithub_spark.html


使用するためにはWait Listに登録して待つ必要があります。

GitHub 次 | GitHub Spark

https://githubnext.com/projects/github-spark



## お試し中


Onlook – Cursor for Designers
https://onlook.com/ja/

React Webアプリ ＋ Figma

FigmaのDEV機能(有料機能)みたいなもの？・・・調査中

Onlookは、デザイナー向けのオープンソースツールで、リアルタイムでウェブサイトをデザインし、その変更を即座にコードに反映させることができます。このツールは、ReactとTailwindCSSを基盤としており、デザイナーとエンジニアの効率的なコラボレーションを手伝います。

Onlookの主な機能には、ユーザーが指示を出すことでAIチャットがコードを自動的に書き換える機能があります。
これにより、デザインの変更が簡単に行え、リアルタイムでのフィードバックが得られます。

また、Figmaのようなビジュアルエディタとしても機能し、デザイナーがブラウザ上で視覚的にデザインを行い、そのままコードに反映させることが可能です。これにより、デザインプロセスが大幅に効率化されます。

無料プランの場合、1日10回、月50回の制限があります。
有料プランでは月20ドルが必要です。





## 良いと噂を聞いたもの

* Cline

ClineはAIエージェントです。

AIエージェントとは、AIがコードを書き、人間が監督するという形になります。
これまではAIをコパイロット(副操縦士)を担当していましたが、これからはエージェント(代理人)になってもらえるということになります。

自分の仕事のお手伝いから、自分の代わりに働いてもらえる時代に入ったということですね、ただしAIの監督が必須です。それに、完全にAIに仕事を任せる時代はまだ先です。


AIがコードを書くことで、プログラマーはより戦略的な課題に集中することができるようになります。

AIの問題解決能力は現在のところ50%ぐらいです。
SWEベンチマークより

# ティア 1

絶対相対評価です。

## Gemini 2.0

使用頻度No.1

https://gemini.google.com/app

Gemini 2.0になり、能力の数値的には2024年12月時点で他のAIと比べるサイトで3位になっていました。

[参考]遂にChatGPT Plusを解約してGeminiに移行した話

https://zenn.dev/zuzuzu/articles/gemini_vs_chatgpt

リポジトリ全体コードレビュー: GitHubリポジトリ全体を読み込み、潜在的なバグや改善点を指摘

マルチモーダル対応: テキストだけでなく、画像や音声や画面共有でも認識可能

使う主な目的

質問、解説等

Youtube動画の主な要約
動画の要約は他のAIサイトでは駄目でした。


例えば、Youtubeで「*****で5つの発表」という動画があった時、その5つをまとめてくれます。
動画を見なくても、その動画は何を言いたいのかがわかります。

動画の要約の使い方はプロンプトに、

```
https://www.youtube.com/のURL ＜＜＜＜ 優しく日本語で簡単な解説をしてください。

```

と入力する方法で使っています。

※動画の要約してくれない場合が多々あります。



Google Geminiに画像生成AI「Imagen 3」実装 - PC Watch

https://pc.watch.impress.co.jp/docs/news/1630845.html

使ってみると、人物は有料の Gemini Advance モデルでないと出力してくれないようです。
※将来実装予定

「オアシスを書いて」とプロンプトを書くと、書いてくれました。

![Gemini_Generated_Image_lfj89elfj89elfj8.jfif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9c5dd13b-10d1-b54e-e6bf-d1d4e3f27c96.jpeg)










## GitHub Copilot

https://github.com/features/copilot

プログラムを書く時に使います。(年契約で課金中 月10ドル)

GitHub Copilot
GitHub Copilot Chat
GitHub Copilot CLI
GitHub Copilot Edits

👆️これらの機能があります。


学生や、OSSの開発者は無料です。

2024年12月15日現在
* 指示書機能
* 複数ファイルの編集機能
その他細かい機能
が追加されています。

指示書機能は事前にAIに細かい指示を出せる機能で

Cursor の Rules for AI 全体のルール設定 翻訳 #Next.js - Qiita

https://qiita.com/masakinihirota/items/4b55471205f7dd17482e

とほぼ同じことが出来ます。

👆Cursor の全体のルール設定と比べ、GitHub Copilotの方がチームでルールを共有しやすかったり、VSCodeの設定で組み込めたりほんの少し便利です。

複数ファイルの編集機能も Cursor とほぼ同じことが出来ます。



GitHub Copilotに OpenAI の
Claude 3.5 Sonnet
GPT 4o
o1-preview
o1-mini
AIモデルが選択可能です。

* GitHub Copilot WorkSpace

GitHub Copilot Workspaceは、AIの力を借りて、プログラミング作業を大幅に効率化する新しい開発環境です。

自然言語で指示
プログラミング言語ではなく、普段使っている言葉でAIに指示を出すことができます。

AIが自動でコード生成
あなたの指示に基づいて、AIが自動的にコードを生成したり、修正したりしてくれます。

一連の作業を自動化
コードの作成だけでなく、テストやデバッグなど、プログラミングに関わる様々な作業を自動化できます。



👇️Wait Listに登録が必要です。

GitHub Next | Copilot Workspace

https://githubnext.com/projects/copilot-workspace










## Perplexity

https://www.perplexity.ai/

早く便利になってきている。













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


* 自分がよく使う使い方

電子書籍(PDF版等)を読み込ませて、理解したい部分をコピペして解説をしてもらいます。
※PDFが文章をコピーできる形式のものの場合。

Chrome拡張
[NotebookLM Web Importer](https://chromewebstore.google.com/detail/notebooklm-web-importer/ijdefdijdmghafocfmmdojfghnpelnfn?pli=1)

ワンボタンで取り込み



## uithub

uithub は GitHubのリポジトリを読み込んで、1枚のテキスト化してくれるサービスです。

このサービスを利用することで、 notebookLMなど1ページだけしか読んでくれないサービスが利用しやすくなります。

利用方法は簡単で、GitHub のリポジトリを開いたら、ブラウザのURL欄のgithubの箇所をuithubに変えるだけです。

```
https://github.com/masakinihirota/[リポジトリ名]
👇        ~
https://uithub.com/masakinihirota/[リポジトリ名]
           ~

```

👆️実質1文字変えるだけでOKです。
これで、リポジトリの全てのファイルを読み込んで1枚のテキスト化してくれます。

### 参考記事

【効率10倍UPテク】utihubとNotebookLMを組み合わせると、Githubのソースコードの学習が超捗る話
https://zenn.dev/aimasaou/articles/77fa305c0e4c93

### 他の利用方法

ドキュメントは通常(私の場合)構想、要件定義、仕様書、設計書、テスト仕様書等をフォルダごとに、そして複数のファイルに分けて作っていますが、
このサービスを利用するとことで1ファイルに変換してAIに読み込ませるのが簡単になります。

このサービスでは base path を変えられるので特定のフォルダ以下を指定できます。

### 似たサービス

思いつきで作ったAIツールが5000スターを獲得した話
https://zenn.dev/yamadashy/articles/ai-tool-repomix-5000-star



### site2pdf

ウェブサイトをPDFに変換してダウンロードするコマンドラインツールです。
NotebookLM に読み込ませる際に使っています。

使い方は👇️を参考にしてください。

最近作ってる地味LLMコマンドラインツールたち: site2pdf, askrepo - laiso
https://laiso.hatenablog.com/entry/2024/11/04/113928












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
















## wrtn

https://wrtn.jp/

読めません・・・リートンと読むようです。

このサイトは、最新情報を扱っていない場合に使っています。
反応がシンプルに早い、それで十分です。


有料生成AIを無料・無制限で利用できる「リートン」が大規模リニューアル - 窓の杜

https://forest.watch.impress.co.jp/docs/news/1630839.html

「リートン」は複数の生成AIを日本語対応にしたAIプラットフォーム。「ChatGPT」「Claude」「Stable Diffusion 3」などの最新AIモデルを無料・無制限で利用することが可能。

👆️これらのモデルは使えますが、バージョンの指定はできず、現在どのバージョンを使っているかは不明です。

有料生成AIを無料・無制限で利用できるためか、反応が早い。
早いのは正義。

外部データを読み込むのに弱い。
X(Twitter)とかのデータは読み込んでくれなかった。























## v0

https://v0.dev/chat

テキストプロンプトからUIデザインコンポーネントを自動生成するサービスです。

現在プロジェクト単位で生成可能、Supabase、Vercel連携もできるそうです。

TailwindCSS
shadcn/ui
を利用しています。

無料の利用可能 (2024年10月19日 現在)

1日10回 リセット時間で回復。

* リセット時間

無料だと1日に10回チャットが出来ます、それ以上はリセット時間を過ぎるまで待つ必要があります。
リセット時間が過ぎると試行回数が回復します。

世界標準時0時 = 日本標準時午前9時

UIコンポーネントの生成サービス v0 (+ shadcn/ui TailwindCSS Next.js Supabase) #tailwindcss - Qiita
https://qiita.com/masakinihirota/items/e7da2254d7d54a6fad04













## Supabaseのドキュメント用AI

https://supabase.com/

Supabaseに関する質問をAIが答えてくれます。
Postgres DB付きのアプリ開発者用です。




































----------------------------------------


# ティア 2


## database.build

Postgres Sandbox
https://database.build/

データベースのスキーマ関連を生成してくれるサービスです。

PostgreSQL系DB付きの本格アプリを作るときにすごい便利なサイトです。

例えばチャットで
「todoアプリを作るのを手伝ってください。」
とプロンプトを送ると、データベースのテーブル設計をしてくれて、SQL文を書いてくれて、同時にそのER図が表示されます。

更にAIと会話をして設計の修正や追加をしていけますし、同時にSQL文を実行するとER図にも反映されます。







## Google AI Studio

https://aistudio.google.com/prompts/new_chat

便利だけど使いこなせていません。

Googleが提供する生成AIアプリケーション開発のためのプラットフォームです。
中身はGemini 2.0です。

Google AI Studioに大型アップデートが来てそれがすごかったです、より便利になりました。

このサイトでは従来のAIとの会話に加えて
* Webカメラ越しの対話
* 画面共有しての対話
が可能です。

### Google AI Studio の Stream Realtime の使い方
サイトの左サイドメニューからStream Realtimeを選択して、

画面中央下部の
Talk to Gemini (文字での対話 これまでのAIサイトと同じです。)
Show Gemini (Webカメラ越しの対話)
Share your screen (画面共有しての対話)
を選択します。

そして、「右」サイドのメニュー の 「Output format」 で Audio (音声)か Text (テキスト)を選択します。

注意点
音声での対話をすると、その後でテキストの出力に変更できません。
コードをなどを聞きたいときは、最初に出力をテキストに変えておくと良いと思います。
















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








## YouTube Summary with ChatGPT & Claude

https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli

これはChromeの拡張機能です。
動画の要約などをしてくれます。



















## tailwindgenie

https://tailwindgenie.com/

Next.jsのアプリを作る時、TailwindCSSの装飾でパーツを作るツール

無料







----------------------------------------

# ティア 3

* 便利だけど上位互換のティア1,2にあるAIサイトが便利すぎてティア3評価になっているものたちです。



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





## napkin

https://app.napkin.ai/

これはスライドショーやPDFファイルによくある説明用の図形を生成してくれるAIです。

説明の文章と、それに対応する図形をうまく合うような選択が出来ません。
慣れればいけるのでしょうか？

名前がちょっと不評。







## TinaMind

https://chromewebstore.google.com/detail/tinamind-gpt-4%E6%90%AD%E8%BC%89%E3%81%AEai%E3%82%A2%E3%82%B7%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%88/befflofjcniongenjmbkgkoljhgliihe

YouTube Summary with ChatGPT & Claudeの上位互換

Google Chromeの拡張機能です。

たくさんの機能が色々ありますが、自分は主にYouTube動画の翻訳 要約に使用しています。

Youtubeで英語の時、英文と翻訳文が上下2行に表示されて便利です。









## Felo

無料のAI検索エンジン

https://felo.ai/search

検索に加えて、マインドマップ、スライドデザインの作成が出来ます。

PRO版(有料)になると、検索に他のAIモデルを使用できます、300回まで。

無料版でもPRO版機能が1日5回まで使えます。









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

自分は課金してないのでここに置きます。

有料で力を発揮します。
これはCursorエディタでほんのちょっとだけ有料版が使えます。
Cursorエディタとの相性は抜群に良かったです、お金持ちなら課金して使うとレジェンドクラスに便利なツールだと思います。



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








## OpenAIのPalyground

有料

https://platform.openai.com/playground/

ここではAIに入力する時の、プロンプトの下書きを作ってくれます。

![OpenAIのプレイグラウンド 丸PNG.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/0c7374d9-9adf-6fa3-ca75-ae5f71d796a1.png)

★のボタンを押すと別ウィンドウが開きます。
そこに目的を書くとプロンプトの下書きを考えてくれます。

後は出力されたものを自分で編集して、自分が使用しているAIに貼り付けます。







## AIウェブアプリ開発

ウェブアプリ開発をトータルで管理しているサービス

Bolt.new
や
GPT Enginner


## Figma Sides

Figma Sidesがすごい！特徴や使用感を紹介します | 株式会社LIG(リグ)｜DX支援・システム開発・Web制作
https://liginc.co.jp/651908















## Chat Hub

最近は1つのAIで済ませて、それで物足りなかったら2つ目を使いに行くという感じで、同時並行の必要はないです。

https://chromewebstore.google.com/detail/chathub-gpt-4%E3%80%81gemini%E3%80%81clau/iaakpnchhognanibcahlpcplchdfmgma

これはChromeの拡張機能です。
有料は6つ、無料は2つまで同時に複数のAIチャットサイトにプロンプトを送れます。






## Lovable

https://x.com/dshukertjrjp/status/1859615952717205855

Lovableはいまいち触ってみる気になれない、気に入っても課金が大変そうだから。








## OctoComics

OctoComics - AIマンガ生成ツール - 無料のAI描画オンラインプラットフォーム
https://www.octocomics.com/home











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














# おまけ

AIとは関係ないけど使用しているサイト、サービス

## PC ChromeブラウザのGoogleレンズ

使い方
ChromeブラウザのURL入力欄にマウスカーソルをフォーカスして、Googleレンズを選択すると範囲選択できるようになるので翻訳したい箇所を選択します。

* 検索が可能です。
* 画像からでも翻訳が可能です。

以前からツールがありましたが、これほど手軽に使えるようになったのがすごい。



## コード専用タイピングゲーム

https://untyping.jp/

![コード専用タイピングゲーム.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/bcad5581-215c-ae0a-69f8-9f6f707dc126.png)

稀に5000超え出来るぐらいの腕前、5000超えてもかなりタイプミスがあります。

点数の感想としては、練習を続けてタッチタイピングが完璧になったら、6000超えはこれからずっと練習すれば数回は達成できるかもしれませんが、それ以上は不可能でしょう。






## Figma

https://www.figma.com/

Figmaで下書きを書いて画像に撮って「v0」に渡すと、コンポーネントのベースが一瞬で出来上がります。

画像に撮るには、Windows付属の「Snipping Tool」というのを使っています。



# VScode、Github Copilot、Cursorのエディタに対するAI史

2021年6月: GitHub Copilotが技術プレビューとして初めて導入される。

2022年7月: GitHub Copilotが一般公開され、すべてのGitHubアカウントを持つ開発者が利用可能に。

2023年: GitHub Copilot Chatが導入され、自然言語で質問しながらコードの提案や修正を受けることが可能になる。

2023年: GitHub Copilot CLIが登場し、コマンドラインからもAIの機能を活用できるようになる。

2023年: Cursorが登場し、VSCodeをフォークした新しいエディタとしてAI機能がネイティブに組み込まれる。Cursorは、開発者がよりシームレスにAIと連携して作業できるようになる。

2024年 Claude 3.5 Sonnet artifactが登場する。

2024年4月: CursorのAIが複数のファイルを同時に編集する機能が追加され、開発効率が向上する。

2024年: GitHub Copilot WorkSpaceが公開され、開発環境全体でAIを活用できるようになる。(予定)












# 参考

ノーコード＆AIカオスマップ更新【2024年10月版】

https://no-coders-japan.org/nocode-ai-industry-landscape-map

https://drive.google.com/file/d/1v24GbGYB8zZwutJvZAnh4ULxbq5TF2Qv/view


The Death of the Stubborn Developer | by Steve Yegge | Medium
https://steve-yegge.medium.com/the-death-of-the-stubborn-developer-b5e8f78d326b

The End of Programming as We Know It – O’Reilly
https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/

CLINEに全部賭けろ
https://zenn.dev/mizchi/articles/all-in-on-cline
