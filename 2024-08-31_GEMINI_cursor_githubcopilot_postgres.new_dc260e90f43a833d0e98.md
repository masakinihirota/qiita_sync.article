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



# お試し中

AIによる自動デバッグも可能なバグレポートを1クリックで生成する「Jam」を使ってみた！ - paiza times

https://paiza.hatenablog.com/entry/2023/06/07/150000

無し





# ティア 1


## wrtn

https://wrtn.jp/

読めません・・・リートンと読むようです。

それぞれの分野に特化したキャラクターが答えてくれます。
日本製？でもAIモデルは海外のを利用しています。

有料生成AIを無料・無制限で利用できる「リートン」が大規模リニューアル - 窓の杜

https://forest.watch.impress.co.jp/docs/news/1630839.html

　「リートン」は複数の生成AIを日本語対応にしたAIプラットフォーム。「ChatGPT」「Claude」「Stable Diffusion 3」などの最新AIモデルを無料・無制限で利用することが可能。

👆️これらのモデルは使えますが、バージョンの指定はできず、現在どのバージョンを使っているかは不明です。

有料生成AIを無料・無制限で利用できるためか、反応が早い。
早いのは正義。


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

Google Geminiに画像生成AI「Imagen 3」実装 - PC Watch
https://pc.watch.impress.co.jp/docs/news/1630845.html

使ってみると、人物は有料の Gemini Advance モデルでないと出力してくれないようです。
※将来実装予定

「オアシスを書いて」とプロンプトを書くと、書いてくれました。

![Gemini_Generated_Image_lfj89elfj89elfj8.jfif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9c5dd13b-10d1-b54e-e6bf-d1d4e3f27c96.jpeg)





## GitHub Copilot

https://github.com/features/copilot

プログラムを書く時に使います。(年契約で課金中 月10ドル)

学生や、OSSの開発者は無料



GitHub Copilotに OpenAI の
GPT 4o
o1-preview
o1-mini
AIモデルが選択可能です。



## v0

https://v0.dev/chat

現在v0には、新しくバージョン「Chat」と古い「Legacy」があります。

- Chat https://v0.dev/chat

- Legacy https://v0.dev/?from=chat


無料の利用可能 2024年10月7日 現在

課金有り

* ドキュメント v0.dev docs

https://v0.dev/docs

* Explore - v0

https://v0.dev/explore

👆️他の人の制作物

AIと相談しながらTailwindCSSで装飾されたフロントエンドを作るのを手伝ってくれます。
無料でも毎日クレジットが復活するので少しつづ進めていけます。
うまくすれば複雑なものでも1日1コンポーネント、簡単なものなら(手動でやったほうが早いが)3つぐらい出来ます。

本当に便利ですが本格的に使うとなると課金が必要です。

### リセット時間

無料だと1日に10回チャットが出来ます、それ以上はリセット時間を過ぎるまで待つ必要があります。
リセット時間が過ぎると試行回数が回復します。

世界標準時0時 = 日本標準時午前9時

https://x.com/v0/status/1840944045964869898

v0 では、Supabase、Drizzle、Prisma に関する質問に答えられるようになりました。

v0を日本語で利用できるようになりました。

https://x.com/v0/status/1841313318101037391

v0はあくまでも静的なUIレイアウトとスタイルを表示に特化しています。

ドラッグアンドドロップのようなインタラクティブな機能は、実際のブラウザ環境でJavaScriptが動作確認することで初めて機能します。

文字を入力して、リストに追加し、それを表示する程度のことは出来ました。

既存のコンポーネントのコードを貼り付けて指示をして編集することも出来ます。



### 現在の私の使い方

Webアプリの設計書を書きます。
その設計書を1ファイルにまとめます。
Webアプリの画面設計をします。

v0に設計ファイルを読み込ませます。
画面設計に沿ってページ単位で作るように指示します。

もしも複雑な画面の場合は
最小単位の画面設計をし直し、もしくは共通のコンポーネントを切り出して設計します。
その単位でコンポーネントを作ってもらって
コンポーネントを組み合わせて画面をつくります。

以下、繰り返します。

### 使う時に気をつけること

事前に設定書を書いておくと
v0に教えておくことで反映してくれます。
例えば2つのコンポーネントを使う時、事前に共通の名前にしておくことでDBに保存する時など便利です。

### v0に聞いた共有できるコンポーネントの作り方。

質問：
Next.jsとSupabaseを利用します。 Next.jsで利用するコンポーネントをv0に生成してもらう時にSupabaseのテーブルを共有したいと思います。その場合テーブルのデータはどうしたら同じにして生成してもらえますか？



<details><summary>回答：</summary>

はい、Next.jsとSupabaseを利用する際に、Supabaseのテーブル構造を共有してコンポーネントを生成することは可能です。以下の方法で実現できます：

1. Supabaseのテーブル構造をSQL形式で共有する：
テーブルの作成に使用したSQLコマンドを提供してください。これにより、テーブルの正確な構造を把握できます。
2. テーブル構造に基づいてTypeScriptの型定義を作成する：
SQLの構造から、TypeScriptの型定義を作成します。これにより、型安全性を確保しつつ、正確なデータ構造を反映したコンポーネントを生成できます。
3. 型定義を使用してNext.jsコンポーネントを生成する：
作成した型定義を使用して、Next.jsのコンポーネントを生成します。


例えば、以下のようなSQLでテーブルを作成したとします：

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

このSQLを共有していただければ、以下のようなTypeScript型定義を作成し、それに基づいてコンポーネントを生成できます：

```typescript
type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};
```

そして、この型定義を使用してNext.jsコンポーネントを生成します。例えば：

```typescriptreact
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabaseクライアントの初期化
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select('*')

      if (error) {
        console.error('Error fetching users:', error)
      } else {
        setUsers(data || [])
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>ユーザーリスト</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}) - 作成日: {new Date(user.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

このようにして、Supabaseのテーブル構造を共有し、それに基づいてTypeScriptの型定義を作成し、その型定義を使用してNext.jsコンポーネントを生成することができます。テーブル構造を共有する際は、CREATE TABLE文やテーブルのスキーマ情報を提供していただければ、それに基づいて適切なコンポーネントを生成できます。

</details>




### v0で生成したコンポーネントからSupabaseで利用できるSQL文を作るには？

普通にv0に質問すれば、SQL文を出力してくれます。


### v0が読み込めるファイル数は？

現在1つです、設定書が複数のファイルに分かれている場合は、コンポーネントの生成に必要な情報を1つのファイルにまとめておいてv0に渡す必要があります。


### v0はUIのコンポーネントを作るのに特化している

v0はUIのコンポーネントを作るのに特化しています、なのでロジックを考えさせたりテストを書かせたりすることも出来と言えば出来るのですが、それだったらVSCodeのGitHub Copilot(有料)やCursor(有料)で自分で直接コードを書いたほうが良いと思います。

軽く土台を作ってもらったらVSCode等で編集したほうが良いと思います。







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

Youtubeで英語の時、英文と翻訳文が上下2行に表示されて便利です。



## Felo

無料のAI検索エンジン

https://felo.ai/search

検索に加えて、マインドマップ、スライドデザインの作成が出来ます。

PRO版(有料)になると、検索に他のAIモデルを使用できます、300回まで。

無料版でもPRO版機能が1日5回まで使えます。

















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

AIとは関係ないけど使用しているサイト

## PC ChromeブラウザのGoogleレンズ

使い方
URL入力欄にフォーカスして、Googleレンズを選択すると範囲選択できるようになるので翻訳したい箇所を選択します。

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