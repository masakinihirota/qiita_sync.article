<!--
title:   私の使用しているAI関連サイト 2024年 12月版
tags:    GEMINI,Perplexity,cursor,database.build,githubcopilot
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




# 追記: 2024年10月30日

未来: 👇️これからリリース予定の期待しているサービス

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

AIによる自動デバッグも可能なバグレポートを1クリックで生成する「Jam」を使ってみた！ - paiza times

https://paiza.hatenablog.com/entry/2023/06/07/150000

## 良いと噂を聞いたもの

Lovable

https://x.com/dshukertjrjp/status/1859615952717205855

>LovableのSupabase連携めっちゃいいですね！
データベースマイグレーションや設定変更も勝手に行ってくれて、Lovableの画面を出ることなくどんどんアプリが作れてめっちゃ便利です！
もしまだ触ったことがない人がいたらぜひ触ってみてください！

ただしある人によると、一番最低のランクで課金したが2日でリミットになったそうだ。



無し

追記終了


# ティア 1

絶対相対評価です。

## gemini

https://gemini.google.com/app

gemini 2.0になり、能力の数値的には2024年12月時点で他のAIと比べるサイトで3位になっていました。

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



















## Perplexity

https://www.perplexity.ai/






## wrtn

https://wrtn.jp/

読めません・・・リートンと読むようです。

今は無料で有料AIサービスを仕えると言うので最もよく使うChromeブックマークのブックマークバーの位置においています。

シンプルに早い、ただそれだけです。

他の人格サービスは使っていません。それで十分です。



それぞれの分野に特化したキャラクターが答えてくれます。
日本製？でもAIモデルは海外のを利用しています。

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



### GitHub Copilot WorkSpace

GitHub Copilot Workspaceは、AIの力を借りて、プログラミング作業を大幅に効率化する新しい開発環境です。

* **自然言語で指示** プログラミング言語ではなく、普段使っている言葉でAIに指示を出すことができます。

* **AIが自動でコード生成** あなたの指示に基づいて、AIが自動的にコードを生成したり、修正したりしてくれます。

* **一連の作業を自動化** コードの作成だけでなく、テストやデバッグなど、プログラミングに関わる様々な作業を自動化できます。



👇️Wait Listに登録が必要です。

GitHub Next | Copilot Workspace

https://githubnext.com/projects/copilot-workspace

















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






















## database.build

Postgres Sandbox
https://database.build/

データベースのスキーマ関連を生成してくれるサービスです。

PostgreSQL系DB付きの本格アプリを作るときにすごい便利なサイトです。

例えばチャットで
「todoアプリを作るのを手伝ってください。」
とプロンプトを送ると、データベースのテーブル設計をしてくれて、SQL文を書いてくれて、同時にそのER図が表示されます。

更にAIと会話をして設計の修正や追加をしていけますし、同時にSQL文を実行するとER図にも反映されます。










## Supabaseのドキュメント用AI

https://supabase.com/

Supabaseに関する質問をAIが答えてくれます。
Postgres DB付きのアプリ開発者用です。










## Google AI Studio

https://aistudio.google.com/app/prompts/new_chat

Googleが提供する生成AIアプリケーション開発のためのプラットフォームです。

このサイトでは従来のAIとの会話に加えて
* Webカメラ越しの対話
* 画面共有しての対話
が可能です。











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







## YouTube Summary with ChatGPT & Claude

https://chromewebstore.google.com/detail/youtube-summary-with-chat/nmmicjeknamkfloonkhhcjmomieiodli

これはChromeの拡張機能です。
動画の要約などをしてくれます。



















## tailwindgenie

https://tailwindgenie.com/

Next.jsのアプリを作る時、TailwindCSSの装飾でパーツを作るツール

無料



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