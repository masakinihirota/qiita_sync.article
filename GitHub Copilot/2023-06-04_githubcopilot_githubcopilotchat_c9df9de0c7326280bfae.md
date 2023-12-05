<!--
title:   GitHub Copilot chatの使い方
tags:    githubcopilot,githubcopilotchat
id:      c9df9de0c7326280bfae
private: false
-->
**Github Copilot chat** は**Github Copilot** で課金していれば、無料で利用できます。

※前の記事

GitHub Copilot導入後、初めて使う時。(豊富な使用例付き)

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882



# GitHub Copilot chatによる コミットメッセージ生成機能

通常のVScode コミットメッセージ入力欄の右側に星のアイコンが表示されています。
そのアイコンボタンを押すと、 **コミットメッセージを自動生成** してくれます。



# エージェント機能

GitHub Copilot chat にエージェントの概念が追加されました。

エージェントとは質問範囲を限定する機能です。


GitHub Copilot chatのチャット欄に
@
を入力するとエージェントの候補が現れます。

* @workspaceエージェント
現在のワークスペースのファイルについての質問をすることができます。

* @vscodeエージェント
VS Codeについての質問をすることができます。


エージェント機能は
* 一般的なプログラミングに関する質問に答えることができます。
* 特定のエージェントとチャットを行い、専門的な知識を持つエージェントからアクションを実行することができます。



## 現時点でのエージェント (2023年12月5日現在)

@workspace
@vscode

この2つです。

## 参考URL

公式Blog (英語)
Pursuit of wicked smartness in VS Code

https://code.visualstudio.com/blogs/2023/11/13/vscode-copilot-smarter



# スラッシュコマンド

GitHub Copilot chat欄に入力してください。

* `/api` - VS Codeの拡張開発について尋ねます。
* `/explain` - 選択したコードの動作を説明します。
* `/fix` - 選択したコードの問題を修正する提案をします。
* `/new` - 新しいワークスペースのためのコードを生成します。
* `/newNotebook` - 新しいJupyter Notebookを作成します。
* `/terminal` - ターミナルで何かをする方法を尋ねます。
* `/tests` - 選択したコードのためのユニットテストを生成します。

/help GitHub Copilot のヘルプを表示します。
/clear チャット欄をクリアします。




これらのコマンドは、エージェントと組み合わせて使用することができます。

例えば、`@workspace /explain`と入力すると、選択したコードの動作を説明します。

また、エディタの選択についての質問も、インラインチャットセッションを開始して尋ねることができます。

詳細は[GitHub Copilot](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode)の[Visual Studio Code](https://code.visualstudio.com/docs/editor/artificial-intelligence)に関するドキュメンテーションをご覧ください。



# GitHub Copilot chat inline機能

## FizzBuzz問題を解いて結果を表示させる。

inline機能から↓入力します。

```
reactコンポーネントでFizzBuzz問題を書いてください。出力はブラウザの画面上にしてください。

```


![AnimationFizzBuzz.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/6ab3b5c3-f930-ab6d-e039-4a94ba189c11.gif)

画面にコードが出力されます。
実際に動くのを確認しました。

※一度目は console.logだったのでやり直してもらいました。



## inline機能を使って翻訳をしてみる。

![Animation.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/22edf20c-ae2d-af3f-9bc9-aeeaa90ecd24.gif)

翻訳は長くても７０行程度まで（エディタの幅による）

AIの区切り記号で停止することがある。
※AIの区切り記号とは＝＝＝＝や＞＞＞＞など３-４文字以上の連続した記号文字。

※左側の青い停止ボタンは、gif作成動画ツールの停止ボタンです。

### 使用GIF動画作成ツール

ScreenToGif - 画面を録画し、編集して GIF、ビデオ、またはその他の形式で保存します。
https://www.screentogif.com/



# Github Copilot chat の機能

* インラインチャット
* チャットサイドバー



# インラインチャット

ショートカット
ctrl + i
ctrl + k i

ファイル上から直接提案をしてもらえます。

GitHub Copilot ではコメントを書いて提案を出してくれました。

コード以外にも翻訳もしてくれます。
例えばインラインチャット機能を使って、
README.mdが英語で、日本語に翻訳したい時にGitHub Copilot chat のインライン機能を起動させて「このREADME.mdを日本語に翻訳してください」と指示を出すと、翻訳してくれます。



# チャットサイドバー

プライマリサイドバー(＝デフォルトで左側にあるサイドバー)のGitHub Copilot chatのアイコンから開きます。

ショートカット無し

VSCodeのサイドバーを開いてそこでAIに質問をしたり、提案をしたりできます。



# キーボードショートカット

一部抜粋

```keybindings.json
  {
    // GitHub Copilot chat をプライマリバーに開きます。
    // GitHub Copilot chat 入力場所へのフォーカスします。
    "key": "ctrl+shift+x",
    "command": "workbench.panel.chatSidebar",
    "when": "viewContainer.workbench.view.extensions.enabled"
  },
  {
    // プライマリサイドバーを閉じます。(プライマリサイドバーが開いている時)
    "key": "ctrl+shift+x",
    "command": "workbench.action.closeSidebar",
    "when": "sideBarVisible"
  },
  {
    "key": "ctrl+k i",
    "command": "inlineChat.start",
    "when": "inlineChatHasProvider && !editorReadonly"
  },
  {
    "key": "ctrl+i",
    "command": "inlineChat.start",
    "when": "inlineChatHasProvider && !editorReadonly"
  }

```







# 翻訳テクニック

英語を翻訳するにはDeepL翻訳などを利用すればいいのですが、技術用語を含んだりすると翻訳がうまくいかない時があります。

そこでGitHub Copilot chatで翻訳をつかいます。

しかし、
「英文を翻訳してください。」
とだけただ伝えると、翻訳をしてくれる場合もありますが、殆どの場合は要約になってしまいます。
特に長文になるとほぼ確実に要約になってしまします。

何段階か手順を踏んで翻訳をしてくれるかを考えます。

この手順を沿えば確実に翻訳をしてくれるようになります。

* 1
一般的な翻訳方法は
テキスト形式のファイル、例えば markdownファイル(*.md) に英文を書いてGitHub Copilot chatに
「英文を翻訳してください。」
と翻訳をしてくれるように指示をします。
(長文になるほどに要約になってしまう。)

* 2
拡張子をコード形式のファイル
例えば TypeScriptファイル(*.tsx) に変えて、英文をコメントアウト化して
GitHub Copilot chatに
「英文を翻訳してください。」
と翻訳をしてくれるように指示をします。
(長文になるほどに要約になってしまう。)

* 3
英文の前に
en:
その下に
ja:
を挿入して、コメントアウトしてから
「英文を翻訳してください。」と指示する。

かなりの確率で翻訳してくれるようになる。
しかし要約になってしまう場合もある。

* 4
英文の前に
en:
その下に
ja:
を挿入して、コメントアウトしてから
トリガーキーを使い提案を出してもらって手動で翻訳する。

※この方法で100％確実に翻訳をしてくれます。

## 正規表現を使ってen: ja:を挿入するテクニック

en: ja: は正規表現を利用して挿入します。

上の行が置換前の正規表現です。
下の行が置換後の正規表現です。

↓

```
^([a-zA-Z].*)\n
ja:\n\nen:$1

```

^([a-zA-Z].*)は英文の先頭は英文字が来ることを想定しています。

数字も来る場合があるなら
^([a-zA-Z0-9].*)
とこのようにします。

$1は上の()カッコ内に一致した1番目をそのまま置換します。


## 環境
VScode
GitHub Copilot chat

GitHub Copilot chatに翻訳をさせようとするとそれは私の仕事ではありませんと断られます。
もしくは短い要約文になってしまいます。

GitHub Copilot chatはコメント部分の翻訳はしてくれるのでそれを逆手に取って翻訳をしてもらいます。

## 翻訳例

VSCode上で翻訳をしてもらいます。

翻訳文をコードの拡張子のコメントに入れてもらいます。

※英語の文章が長すぎる場合は、適度に空行を入れて段落に分けてください。


Create a New Supabase Project and Basic PostgreSQL Schema | egghead.io
https://egghead.io/lessons/postgresql-create-a-new-supabase-project-and-basic-postgresql-schema

この講座の書き起こしチャット部分を翻訳してもらいます。


↓元の英文

```translation.tsx
Instructor: Head over to database.new to create a new Supabase project. Then I'm going to sign in with GitHub, enter my username and password, and click Sign in. You'll see this has selected my default organization. We're going to be building a Twitter clone. The name of my project is going to be Blue Bird.

I'm going to click this button here to generate a database password. Make sure you copy this value into something like a password manager as this is your database password and the only time you'll be able to read that value. For the region, I'm going to select Sydney as this is closest to my geographical location. You want this region to be close to your users for the best performance.

Everything we'll do in this course will be on the free plan. I'm going to click this button to create my new project. You'll see this will take a little bit of time to set up our project. Once that's finished, we want to come over to the Table Editor to create a new table to store our tweets.

I'm going to leave row level security, or RLS enabled, as this is recommended. For the structure of our table, we've already got an id, but I'm going to change the type of this from int8 to uuid, and then click these three dots to set the default value for this column to be a freshly generated random uuid.

We also have a created_at timestamp which has a default value set to the time that this row was created. Now, if we click this cog, we can see some more options for this column, and we'll see the value for this column can be set to NULL.

Since this timestamp is automatically generated for us and we're going to use it for sorting our tweets, we're always going to want this column to have a value. Let's untick Is Nullable, and then add a new column for the title of our tweet. The type for this one is going to be text. We won't have a default value for this one, but we always want our tweets to have a title.

Let's also untick Is Nullable, and then click Save to create our tweets table. Now we can insert a new row. Again, these two values will be generated for us. We just need a title, which is going to be, first tweet, and then click Save to insert that new row into the tweets table.

I'm going to magically add two more tweets. We can see we have our first, second and third tweet in our Supabase database.

```

↑上の英文を正規表現にかけると↓下の英文のように変換されます。
そして全体を選択してコメントアウトしています。

```translation.tsx
// en:Instructor: We're going to use MPX to run the create-next-app package to create our new Next.js app. We're going to call this one blue-bird, and then this will step us through some questions to configure our project.
// ja:

// en:I'm going to use TypeScript. I do want ESLint. I want Tailwind CSS. I don't want to use the source directory. I do want to use the new app router, and I don't want to customise the default import alias. Once that's finished, we can change into our new directory and open it up in VS Code.
// ja:

// en:You can see we've got a starter project using the app directory with our index route that looks something like this. We can run npm run dev to start our development server, and if we navigate over to localhost over port 3000, we'll see the contents of that page.tsx file rendered in the browser.
// ja:

```

↑このような状態になった時にja:の後ろの部分でGitHub Copilot chatと使用して手動トリガーすると↓下のように翻訳をしてくれます。

```translation.tsx
// en:Instructor: We're going to use MPX to run the create-next-app package to create our new Next.js app. We're going to call this one blue-bird, and then this will step us through some questions to configure our project.
// ja:講師：私たちは、MPXを使用して、create-next-appパッケージを実行して、新しいNext.jsアプリを作成します。 これをblue-birdと呼び、これにより、プロジェクトを構成するためのいくつかの質問が表示されます。

// en:I'm going to use TypeScript. I do want ESLint. I want Tailwind CSS. I don't want to use the source directory. I do want to use the new app router, and I don't want to customise the default import alias. Once that's finished, we can change into our new directory and open it up in VS Code.
// ja:私はTypeScriptを使用します。 ESLintを使用したい。 Tailwind CSSを使用します。 ソースディレクトリを使用したくありません。 新しいアプリルーターを使用したい。 デフォルトのインポートエイリアスをカスタマイズしたくありません。 それが終わったら、新しいディレクトリに変更して、VS Codeで開きます。

// en:You can see we've got a starter project using the app directory with our index route that looks something like this. We can run npm run dev to start our development server, and if we navigate over to localhost over port 3000, we'll see the contents of that page.tsx file rendered in the browser.
// ja:appディレクトリを使用したスタータープロジェクトが表示され、次のようになっているindexルートが表示されます。 npm run devを実行して開発サーバーを起動でき、localhostのポート3000に移動すると、ブラウザーでそのページ.tsxファイルの内容がレンダリングされます。

```

英語部分を削除します
↓正規表現を使って英語部分を削除します。
置換後の正規表現文字列は空にします。

上の行が置換前の正規表現です。
下の行が置換後の正規表現です。

```
^// en:.*\n


```

ついでにja:部分も削除します。
置換後の正規表現文字列は空にします。

上の行が置換前の正規表現です。
下の行が置換後の正規表現です。

```
^// ja:


```


後はコメントアウトを外せば完成です。

日本語がおかしかったら
「校正してください」
とお願いすると読みやすい日本語にしてくれます。


## トリガーキーの設定方法は？

トリガーキーは↓下の記事を参照して設定しておいてください。

GitHub Copilot導入後、初めて使う時。(豊富な使用例付き)

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882





[GitHub Copilot chat changelog](https://github.blog/changelog/2023-07-14-github-copilot-july-14th-update/)

チャット履歴の保存と復元 – これにより、ユーザーが Visual Studio を閉じるたびにディスカッション/チャットを失うことがなくなります。現在は永続化され、復元されています。

チャット履歴のクリア
↓クリアコマンド
`/clear`

複数行の入力が可能になりました。
↓複数行の入力コマンド
`shift+enter`

チャット ツール ウィンドウにコンテンツを表示するためのストリーミング サポート – すべてのチャット エクスペリエンスにストリーミング サポートを追加しました。



テスト生成のための特定の挿入 – テスト生成では、別のファイルまたはプロジェクトへの挿入が必要になる場合があります。チャット ウィンドウのアクション ボタンによる特別な処理をサポートするようになりました。



生活の質の更新 - チャット エクスペリエンス全体でのコンテキスト、UI の更新、エラー メッセージの改善。




GitHub Copilot chatはファイルを指定したり、URLを渡すと読んでくれます。
たとえば↓のようにファイル名やURLを貼り付けてあげると、そのサイトの説明をしてくれます。


```GitHub Copilot chatとの会話
masakinihirota: readme.mdを読んでください。

GitHub Copilot: `readme.md`は、ファイル管理に関する説明が書かれたファイルです。このファイルでは、以下のような情報が記載されています。

- ファイル管理における思想について
- `vns`と`vns.blue`に関する思想について
- `vns.blue`の機能について

このファイルは、プロジェクトの説明やドキュメントとして利用されることが多いです。また、GitHubなどのリポジトリにおいては、リポジトリのトップページに表示されることがあります。



masakinihirota: Grafbaseとはなんですか？

GitHub Copilot: 申し訳ありませんが、私は「Grafbase」という用語について情報を持っていません。可能であれば、より詳細な情報を提供していただけますか？

masakinihirota: https://grafbase.com/

GitHub Copilot: Grafbaseは、グラフデータベースを提供する企業です。Grafbaseは、グラフデータベースを使用することで、複雑なデータの関係性を簡単に表現し、データの検索や分析を高速化することができます。Grafbaseは、GraphQLを使用してグラフデータベースにアクセスすることができ、GraphQLの柔軟性とグラフデータベースのパフォーマンスを組み合わせることができます。Grafbaseは、多くのWebアプリケーションやモバイルアプリケーションで使用されており、高速で信頼性が高く、柔軟性があります。



masakinihirota: Tigrisとはなんですか？

GitHub Copilot: 申し訳ありませんが、私は「Tigris」という用語について情報を持っていません。可能であれば、より詳細な情報を提供していただけますか？

masakinihirota: https://www.tigrisdata.com/docs/

GitHub Copilot: ありがとうございます。Tigrisは、データ分析およびビジネスインテリジェンスのためのクラウドベースのプラットフォームです。Tigrisを使用することで、データの収集、分析、可視化、共有を簡単に行うことができます。Tigrisは、多くのデータソースに対応しており、データの統合や変換を自動化することができます。また、Tigrisは、高度な分析機能を提供し、データの傾向やパターンを特定することができます。Tigrisは、多くの企業で使用されており、高速で信頼性が高く、柔軟性があります。提供されたリンクは、Tigrisの公式ドキュメントです。

```



GitHub Copilot Nightly は GitHub Copilot に統合されました。

https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly



**Github Copilot** が利用できれば、**Github Copilot chat** も利用できます。

※前の記事

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

この記事は **Github Copilot** の **チャット機能** について説明しています。

# Github Copilot chat

↓使用中の画面

![VSCode全画面表示.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/5702890d-37ef-c146-226e-9fc20198f68a.png)

↓画面構成の設定画面

![画面構成の設定画面説明付き.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/720838fe-53cd-480a-7145-45f57fe9d000.png)



## 公式の説明 GitHub Copilot chat

https://docs.github.com/en/early-access/copilot/github-copilot-chat-transparency-note

現在の所、**VSCode の Visual Studio Code Insider** (VSCode の開発版)でしか使えないようです。

ChatGPT のように普通に質問に答えてくれます。

ファイルを開いて、重要なコードを選択してから質問をするとより洗練された回答をしてくれます。

コマンドを使って質問すると、より洗練された回答をしてくれます。

VSCode 上で開いているファイルをみて答えてくれるようです。

## 導入＆使い方 GitHub Copilot chat

導入:省略

↓下記の記事を参考にして導入をしてください。

### 導入の参考 GitHub Copilot chat

GitHub Copilot chat 使ってみるよ！ - Qiita

https://qiita.com/kohashi/items/05bc01cbb3a74fdc7227

### 2つの初め方+自分で設定する 3つの初め方 GitHub Copilot chat

1. プライマリサイドバーから使用する。（デフォルト）
1. 右クリックから使用する。（マウスから）

1. 「新しいウィンドウ」から使用する。(次の項目で説明)
1. パネルを開いて Github Copilot chat から使用する。（自分で設定）
1. セカンダリサイドバーから使用する。（自分で設定）

※「自分で設定」とは、プライマリサイドバーの **Github Copilot chat** をパネル上やセカンダリサイドバーに移動させてその場所から使用する事です。

### 新しいウィンドウで開く方法 GitHub Copilot chat

`Chat: Open Editor (GitHub Copilot)`
をキーボードショートカットに自分で登録します。

```keybindings.json
{
  "key": "",
  "command": "workbench.action.openChat.copilot"
}

```

※デフォルトでのキー設定はありません。

## GitHub Copilot chat のコマンド一覧を表示する方法

入力欄から **`/help`** と入力すると、コマンドの一覧が表示されます。

### GitHub Copilot chat のコマンド一覧

コマンドを使って質問範囲を狭めているようです。
※普通に日本語で質問してもコードに関する事なら何でも答えてくれます。

**GitHub Copilot chat** で使えるコマンド一覧

```コマンド一覧
/vscode - Questions about VS Code
/tests - Generate unit tests for the selected code.
/simplify - Simplify the selected code.
/fix - Propose a fix for the problems in the selected code.
/explain - Explain step-by-step how the selected code works.
/ext - Ask about the VS Code extension development.
/help - General help about GitHub Copilot

```

`/vscode`
VS Code に関する質問

`/tests`
範囲選択したコードに対して、ユニットテストを生成してくれます。

`/simplify`
範囲選択したコードをシンプルにしてくれます。

`/fix`
範囲選択したコードの問題を修正してくれます。

`/explain`
範囲選択したコードの解説をしてくれます。

`/ext`
VS Code の拡張機能開発に関する質問

`/help`
GitHub Copilot に関する一般的な質問



## 使用例 範囲選択コマンド (例: explain コマンドを使用)

まず説明して欲しい範囲（例えば関数を先頭の宣言から閉じカッコまで）をマウスなどで選択します。

**Github Copilot chat** のウィンドウを開き入力欄に **`/explain`** と入力しリターンキーを入力するとコードの解説をしてくれます。

※**`/explain`** の後ろには何も入力する必要はありません。

※範囲選択をせずに **`/explain`** と入力すると、開いているファイル全体の解説をしてくれます。



## 日本語は？ GitHub Copilot chat

GitHub Copilot chatは日本語の質問でも大丈夫？

はい、日本語でも答えてくれます。



## GitHub Copilot chat の配置問題

### 悩み (個人の問題)  GitHub Copilot chat

これまでの私の使い方ですと、プライマリサイドバーで **GitHub Copilot chat** を開くと狭いので、いちいち **GitHub Copilot chat** を開いた時はマウスで幅を広げたり狭めたりしていました。

VSCode の拡張機能の中で **GitHub Copilot「系」** だけはマウスで幅を広げていたわけです。拡張機能ごとに幅を覚えてくれてなかったので今まで手動でした。

### 解決策 セカンダリサイドバー GitHub Copilot chat

VSCode のマニュアルを見直して新たに使える機能があったのでそれを利用しました。
セカンダリサイドバーを使う事でプライマリサイドバーは幅が狭い時用、セカンダリサイドバーは幅が広い時用に使い分ける事ができるようになりました。

↓ この場所にセカンダリサイドバーが追加されました。
公式の画像ですが、この画像ではセカンダリサイドバーはまだ説明されていないままです。

![VSCode画面（公式ページから）セカンダリサイドバー.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/eeaae519-685f-9eaf-8b1d-d0282a863e9f.png)

↑ **B** の Side Bar がプライマリサイドバーです。
そして、右側の赤い丸の場所でセカンダリサイドバーが使えるようになりました。

https://code.visualstudio.com/docs/getstarted/userinterface

### セカンダリサイドバーの使い方 GitHub Copilot chat

セカンダリサイドバーはドラッグアンドドロップで使えます。

例えば、**GitHub Copilot chat** のアイコンをセカンダリサイドバーがある右側にドラッグアンドドロップして使っています。
リセット（元に戻す）は右クリックから「場所のリセット」を選びます。

ターミナル上にドラッグアンドドロップしてしまうと消えるように見えるので注意してください。
パネルの項目が一つ増えているので気づくと思います。

### ウィンドウをどこに置くか？ GitHub Copilot chat

私は、**GitHub Copilot chat** のアイコンをセカンダリサイドバーがある右側にドラッグアンドドロップして使っています。

## キーボードショートカット GitHub Copilot chat

新機能:セカンダリサイドバー
VSCode の管理（左下の歯車アイコン）＞キーボードショートカットで
**セカンダリサイドバー**
で検索すると、

キーボードショートカット（デフォルト）
表示: セカンダリ サイド バー ビューをパネルに移動する
表示: セカンダリ サイド バーの表示/非表示を切り替える
表示: セカンダリ サイド バーにフォーカスする
表示: セカンダリ サイド バーを閉じる
の４つが表示されます。

↓ インプットボックスにフォーカスが当たらないので独自にキーボードショートカットを設定しました。

```keybindings.json
[
  // VSCodeは同じキーで複数のコマンドを実行する事ができます。
  // セカンダリサイドバーをトグルします。
  {
    "key": "ctrl+q",
    "command": "workbench.action.toggleAuxiliaryBar"
  },
  {
    // セカンダリサイドバーのインプットボックスにフォーカスします。
    "key": "ctrl+q",
    "command": "workbench.action.focusAuxiliaryBar"
  },
  {
    // セカンダリサイドバーを閉じます。
    "key": "ctrl+q",
    "command": "workbench.action.closeAuxiliaryBar",
    "when": "auxiliaryBarVisible"
  }
]

```

※ ポイントは**ショートカットキーを1つ**にしている所と、 閉じる時に`"when": "auxiliaryBarVisible"` この条件を追加することで、セカンダリサイドバーにフォーカスが当たっている時だけ有効になります。これで開くと閉じるのコマンドを同じキーで実行できるようになりました。

※`AuxiliaryBar`はセカンダリサイドバーの事です。

:::note warn
※パネルのターミナル上では **Ctrl+q** はシステムが使っているのでセカンダリサイドバーのトグルに利用できません。つまりフォーカスがターミナル上にある時はセカンダリサイドバーのトグルはできません。あくまで**Ctrl+q**は自分のキーボード配置の都合です。各自好きなキーに設定してください。
:::

↓ **インプットボックスにフォーカスを当てる必要がない**時は、一番目のショートカットキーだけでトグルします。

```keybindings.json
[
  // セカンダリサイドバーをトグルします。
  {
    "key": "ctrl+q",
    "command": "workbench.action.toggleAuxiliaryBar"
  }
]

```

- **Ctrl+Q**
  このキー設定は 2 つのコマンドを 1 つのキーで設定してあり、
  **GitHub Copilot chat** を表示して入力部分にフォーカスが当てるように設定しています。この設定ですぐに質問ができるようになっています。

※ キーボードショートカットのキーは自由に設定してください。
これは Ctrl キーが A キーの左にあるキーボード用の設定です。
※セカンダリサイドバーには **GitHub Copilot chat** だけを登録していると想定しています。

### 配置問題の詳細 GitHub Copilot chat

**GitHub Copilot chat** はデフォルトで左側に 2 個の吹き出し(2 個の画面？)のアイコンが登録されます。
これは画像 **A** の Activity Bar に登録され、**B** Side Bar の プライマリサイドバーを開いて使う事ができます。

現在サイドバーは 2 種類あって、プライマリサイドバーとセカンダリサイドバーがあります。

**GitHub Copilot chat** を使用できる選択肢は 画像 **D** の Panel を含めて３つあります

#### 使用場所の移動方法 GitHub Copilot chat

**A** の Activity Bar に登録されている **GitHub Copilot chat** アイコンをドラッグアンドドロップで移動できます。

**D** の Panel や セカンダリサイドバーの上でドラッグアンドドロップで移動できます。

(他の拡張機能も機能単位でドラッグアンドドロップで移動できます。)

これのどこに配置すればいいのか？という悩みです。

左側（デフォルト）、下側、右側です。

左側はプライマリサイドバー
下側はパネル
右側はセカンダリサイドバー

プライマリサイドバーはファイルや検索のアイコンがある場所の事です。
パネルはターミナルや、デバッグコンソールや出力などが表示される場所です。
セカンダリサイドバーは VSCode に新たに追加された機能です。

左側だとファイルや検索でよく使うと思いますが、**GitHub Copilot chat** で使うとなると狭いです。
なので GitHub Copilot chat を使う時はマウスで幅を広げて調整して、ファイルや検索の時は余分なスペースを取ってしまいコードを書くスペースを狭くしてしまいます、なので左の選択肢は無しです。

下はパネル上にドラッグアンドドロップするとターミナルやデバッグコンソールや出力と同じように表示されます。

しかし **GitHub Copilot chat** は縦長に見たいのでこの選択肢も無しです。

なので右側のセカンダリサイドバーにドラッグアンドドロップします。

そうするとセカンダリサイドバーを開く事によって **GitHub Copilot chat** が使えるようになります。

### 画面構成 GitHub Copilot chat
右上に画面構成のアイコンがあります。







# Tips GitHub Copilot chat

## 範囲選択

GitHub Copilot chatは賢く、範囲選択をした部分を認識してくれます。
そこに命令を出すと、その範囲選択した部分に対して命令を出してくれます。

↓スネークケースの文字列が7個あったとします。これを一部キャメルケースに変換してみます。

```
first_name
last_name
date_of_birth
social_security_number
home_address
email_address
phone_number

```

マウスなどで範囲選択をします。
GitHub Copilot chatウィンドウを開いて、指示を出します。
今回はキャメルケースに変換してと指示を出します。



GitHub Copilot chatウィンドウに結果が現れるので **挿入アイコンボタンを押す** と範囲選択済みですので上書きしてくれます。

↓結果

```

first_name
last_name
dateOfBirth, socialSecurityNumber, homeAddress, emailAddress, phoneNumber

```

このように一部キャメルケースに変換してくれます。



## Markdownに貼り付ける

例えばデータを用意してMarkdownに貼り付ける時に

「データをMarkdown形式で表示してください。」
だと
Markdownの表で出力されます。
(時々空気を読んで貼り付けられる形式に出力されるときもありますが。)

そんな時は
「データをMarkdownファイルに貼り付けられる形式で出力してください。」
などと「貼り付けられる形式」と目的をはっきり書くことで出力形式が代わります。








# 参考 GitHub Copilot chat

GitHub Copilot chatが解禁されたので使ってみての感想とChatGPTと比べてどうかの所感 - Qiita

https://qiita.com/AKB428/items/48fa5014b10052c05a45


GitHub Copilot chat 使ってみるよ！ - Qiita

https://qiita.com/kohashi/items/05bc01cbb3a74fdc7227



# GitHub Copilot と GitHub Copilot chatの共同作業

## テストとテストの実行環境に関して

単にテストコードとテストフレームワークをインストールするだけでは動きません。

関数からテストコードは自動生成してくれますが、
そのテストを実行させるボタンを押してもエラーが返ってくるだけで動きません。

(なので調査中)

`npm install jest -g`
`npm install mocha chai -g`
↑ これだけでは動きません。

コードとテストだけの使い方はまだ不明です。


## テストの検証を実際に行う

テストの検証を実際に行うためには、

Reactコンポーネントのテストを書こう | TypeScript入門『サバイバルTypeScript』


https://typescriptbook.jp/tutorials/component-test

[Jestを使ったスナップショットテストの作り方とやり方](https://typescriptbook.jp/tutorials/component-test#jest%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%83%86%E3%82%B9%E3%83%88%E3%81%AE%E4%BD%9C%E3%82%8A%E6%96%B9%E3%81%A8%E3%82%84%E3%82%8A%E6%96%B9)

このサイトの手順に従ってテストコードを書きます。

### 手順
テストとテストコードを書いて実行します。

コードもテストコードも文法的には正しいですが、テスト結果はわざとエラーが返ってくるようにします。

#### 具体的には
コードは
Reactのコンポーネントである
ONとOFFを切り替えるコンポーネントです。

テストコードは
最初の表示はOFFというボタンが表示されることを期待する。

#### エラー動作
ブラウザ上での動作的には
ボタンがOFFと表示を期待しているのに、ボタンはONと表示してしまう。

VSCode上でのコード的には
初期値をfalseだったが、わざとエラーを出すためにtrueを設定する。

これをプロンプトを使ってGitHub Copilotに聞いてみます。

### プロンプトを使った質問

プロンプトの内容は以下の通りです。

```
======== 役割:
あなたは経験豊富で有能なエンジニアとして振る舞ってください。

======== 命令書:
以下の制約条件と入力文を守ってください。

======== 制約条件:
・初心者でも理解できるように解説してください
・一歩一歩考えていきましょう。
・重要なキーワードを取り残さないでください。
・小学生にもわかりやすくしてください。
・日本語で回答してください。

======== 入力文:

======== コード:src\SimpleButton.tsx

import { useState } from "react"
export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(true)

  const handleClick = () => {
    setState((prevState) => !prevState)
  }
  return <button onClick={handleClick}>{state ? "ON" : "OFF"}</button>
}

======== テストコード:src\SimpleButton.test.tsx

import { render, screen } from "@testing-library/react"
import { SimpleButton } from "./SimpleButton"
import userEvent from "@testing-library/user-event"

test("ボタンをクリックするとON/OFFの表示が切り替わる", async () => {
  // ここにテストの中身を書いていきます
  const user = userEvent.setup()
  render(<SimpleButton />)
  const simpleButton = screen.getByRole("button")
  await user.click(simpleButton)
  expect(simpleButton).toHaveTextContent("ON")
})

test("スナップショットテスト 描画されてすぐはOFFと表示される", () => {
  const view = render(<SimpleButton />)
  expect(view.container).toMatchSnapshot()
})

======== エラーメッセージ:

  × ボタンをクリックするとON/OFFの表示が切り替わる
  × スナップショットテスト 描画されてすぐはOFFと表

  ● ボタンをクリックするとON/OFFの表示が切り替わる

    expect(element).toHaveTextContent()

    Expected element to have text content:
      ON
    Received:
      OFF

       9 |   const simpleButton = screen.getByRole
      10 |   await user.click(simpleButton)
    > 11 |   expect(simpleButton).toHaveTextConten
         |                        ^
      12 | })
      13 |
      14 | test("スナップショットテスト 描画されて

      at Object.<anonymous> (src/SimpleButton.test

  ● スナップショットテスト 描画されてすぐはOFFと表

    expect(received).toMatchSnapshot()

    Snapshot name: `スナップショットテスト 描画され

    - Snapshot  - 1
    + Received  + 1

      <div>
        <button>
    -     OFF
    +     ON
        </button>
      </div>

      14 | test("スナップショットテスト 描画されて
      15 |   const view = render(<SimpleButton />)
    > 16 |   expect(view.container).toMatchSnapsho
         |                          ^
      17 | })
      18 |
     3.853 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.

======== 出力文:

```



以下、プロンプトに対する回答

### Github Copilot chat

このコードは、Reactで簡単なボタンを作成する例です。ボタンをクリックすると、ON/OFFの表示が切り替わります。

テストコードでは、ボタンをクリックしたときに表示が切り替わるかどうかをテストしています。また、スナップショットテストを行っています。

テストコードのエラーメッセージによると、ボタンをクリックした後に表示が切り替わっていないため、テストが失敗しています。また、スナップショットテストでも、初期表示がOFFであることが期待されているのに、ONになっているため、テストが失敗しています。

これらのエラーを修正するには、SimpleButtonコンポーネントの初期状態をOFFにする必要があります。以下のように、useStateの初期値をfalseに変更してください。

これにより、初期表示が

```
import { useState } from "react"

export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(false)

  const handleClick = () => {
    setState((prevState) => !prevState)
  }

  return <button onClick={handleClick}>{state ? "ON" : "OFF"}</button>
}

```

これにより、初期表示がOFFになり、テストが正常に動作するようになります。


### Github Copilot chatの回答について

仕様的な間違いを見つけてくれました、修正箇所も正しく教えてくれました。

プロンプトで正確な指示と、コードとテストコードとエラーメッセージを貼り付けて聞けば、正しい回答をしてくれるようです。



## 他のAIにも聞いてみた。

プロンプトは同じす、それぞれの結果を貼り付けます。

### Bard

<details><summary>Bard</summary>

スナップショットテストは、テスト対象のコードが変更されたときに、その変更が意図したとおりに行われたかを確認するために使用されるテスト手法です。スナップショットテストでは、テスト対象のコードが実行されたときに生成される出力をスナップショットとして保存します。その後、テストを実行するたびに、スナップショットから出力を比較して、変更が意図したとおりに行われたかを確認します。

スナップショットテストは、コードの変更が意図したとおりに行われたかを確認するのに役立ちます。また、コードの変更が意図しない動作を引き起こしていないかを確認するのにも役立ちます。

スナップショットテストを使用するには、次の手順に従います。

テスト対象のコードが実行されたときに生成される出力をスナップショットとして保存します。
テストを実行するたびに、スナップショットから出力を比較して、変更が意図したとおりに行われたかを確認します。
スナップショットテストは、コードの変更が意図したとおりに行われたかを確認するのに役立つテスト手法です。スナップショットテストを使用すると、コードの変更が意図しない動作を引き起こしていないかを確認することもできます。


</details>

全く理解していません。


### Bing

<details><summary>Bing</summary>
こんにちは。Reactのボタンテストについてお答えします。

テストコードには、React Testing Libraryを使用することができます。以下のようなコードを書くことができます。

```src\SimpleButton.test.tsx
import { render, screen } from "@testing-library/react"
import { SimpleButton } from "./SimpleButton"
import userEvent from "@testing-library/user-event"

test("ボタンをクリックするとON/OFFの表示が切り替わる", async () => {
  // ここにテストの中身を書いていきます
  const user = userEvent.setup()
  render(<SimpleButton />)
  const simpleButton = screen.getByRole("button")
  await user.click(simpleButton)
  expect(simpleButton).toHaveTextContent("ON")
})

test("スナップショットテスト 描画されてすぐはOFFと表示される", () => {
  const view = render(<SimpleButton />)
  expect(view.container).toMatchSnapshot()
})
```

このコードでは、ボタンをクリックするとON/OFFの表示が切り替わることをテストしています。また、スナップショットテストも行っています。

参考になれば幸いです。

ソース: Bing との会話 2023/6/3
(1) buttonのclickイベントをテストする方法【React Testing Library】. https://amateur-engineer.com/react-testing-library-button-click/.
(2) 【React】buttonとcheckboxで学ぶTesting Libraryの超基本 - Qiita. https://qiita.com/suzuki0430/items/656213ca221ad75aaee4.
(3) Jest React TypeScript でボタン押下の挙動をテストする - Qiita. https://qiita.com/RYA234/items/14bdce587dbcf7eab032.


</details>

全く理解していません。





### perplexity

<details><summary>perplexity</summary>
このテストコードでは、SimpleButtonコンポーネントのテストを行っています。最初のテストでは、ボタンをクリックするとテキストが"ON"に変わることを期待していますが、実際には"OFF"のままであるため、テストが失敗しています。2番目のテストでは、コンポーネントが最初にレンダリングされたときに、ボタンのテキストが"OFF"であることを期待しています。しかし、実際にはボタンのテキストが"ON"であるため、テストが失敗しています。これらのエラーは、expect関数の引数が期待値と一致しないために発生しています。テストの中身を修正して、期待値と実際の値が一致するようにする必要があります。


</details>

正しく理解していますが、コードの修正は出来ていません。


### ChatGPT
※ChatGPT3.5 ブラウザ無料版を使用しています。

<details><summary>ChatGPT</summary>
エラーの部分は、src\SimpleButton.test.tsxファイルの11行目と16行目です。

ts
Copy code
expect(simpleButton).toHaveTextContent("ON")
11行目のコードでは、expectステートメントが、simpleButtonがテキストコンテンツとして"ON"を持っていることを期待しています。しかし、テストの実行結果では、実際には"OFF"が表示されています。このため、テストが失敗しました。

16行目のコードでは、expectステートメントが、view.containerがスナップショットと一致することを期待しています。しかし、スナップショットと実際のレンダリング結果は異なっているため、テストが失敗しました。

これらのテストの失敗は、SimpleButtonコンポーネントの実装に問題がある可能性があります。SimpleButtonコンポーネントが正しく動作するように修正する必要があります。


</details>

正しく理解していますが、コードの修正は出来ていません。


### phind

<details><summary>phind</summary>
The code in question is a React component SimpleButton that uses the useState hook to manage a boolean state value. The component renders a button element that toggles the state value between true and false when clicked. The test code checks whether the button toggles between "ON" and "OFF" as expected, and whether the component renders correctly.

The error message indicates that the first test, which checks whether the button toggles between "ON" and "OFF" as expected, failed. Specifically, the test expected the button to have text content of "ON" after clicking it, but instead it had text content of "OFF". Therefore, the error is in the implementation of the handleClick function in SimpleButton.tsx.

To fix this error, we need to modify the handleClick function to properly toggle the state value. One way to do this is to simply use the ! operator to invert the current state value. Here is an example implementation:

```
import { useState } from "react"
export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(true)

  const handleClick = () => {
    setState(!state)
  }
  return <button onClick={handleClick}>{state ? "ON" : "OFF"}</button>
}

```

With this implementation, the handleClick function properly toggles the state value between true and false using the ! operator. Therefore, when the button is clicked, the text content will toggle between "ON" and "OFF" as expected, and the test will pass.

To summarize, the error occurred because the code did not properly toggle the state value when the button was clicked. This caused the test to fail because it expected the button to have different text content after being clicked. By fixing the handleClick function to properly toggle the state value, the test will pass and the component will work as expected.



DeepL翻訳
問題のコードは、ReactコンポーネントのSimpleButtonで、useStateフックを使用してブール値の状態値を管理するものです。このコンポーネントでは、クリックすると状態値がtrueとfalseの間で切り替わるボタン要素をレンダリングします。テストコードでは、ボタンが期待通りに「ON」と「OFF」の間で切り替わるかどうか、また、コンポーネントが正しくレンダリングされるかどうかを確認します。

エラーメッセージは、ボタンが期待通りに「ON」と「OFF」の間で切り替わるかどうかをチェックする最初のテストが失敗したことを表しています。具体的には、このテストでは、ボタンをクリックするとテキストコンテンツが「ON」になることを期待していましたが、その代わりにテキストコンテンツが「OFF」になっていました。したがって、このエラーはSimpleButton.tsxのhandleClick関数の実装に起因しています。

このエラーを修正するには、状態の値を適切にトグルするようにhandleClick関数を修正する必要があります。その方法として、単純に「！」演算子を使って、現在の状態値を反転させる方法があります。以下はその実装例です：

(コード)

この実装では、handleClick関数が、!演算子を用いて状態の値をtrueとfalseの間で適切にトグルします。したがって、ボタンがクリックされると、テキストコンテンツは期待通りに「ON」と「OFF」の間でトグルし、テストはパスします。

要約すると、ボタンがクリックされたときに、コードが状態値を適切にトグルしなかったためにエラーが発生しました。このため、ボタンがクリックされた後に異なるテキストコンテンツが表示されることを期待していたため、テストが失敗してしまいました。handleClick関数を修正し、状態値を適切に切り替えるようにすれば、テストはパスし、コンポーネントは期待通りに動作するようになります。

</details>

正しく理解していますが、コードの修正は出来ていません。
日本語でと指定しているのに英語で返ってきました。

## テスト検証のまとめ

前提条件として、
Github Copilot chatはVSCode上で質問をして、回答を得ていました。
他のAIはブラウザからプロンプトだけを見てもらって、回答を得ていました。

そういった環境の違いもあるとはいえ、Github Copilot chatの回答は、正確に理解をしており、修正箇所も適切でした。

Github Copilot chatは唯一の有料ツールであったとはいえ、コードに関する質問は、Github Copilot chatが一番正確に回答をしてくれました。
さすがに、コードに関しては一日の長がありました。

正確な情報、適切なプロンプト、より良い開発環境を利用することで回答する精度が上がっているようです。



# GitHub Copilot の種類
※有料アプリを含みます

GitHub Copilotの開発元

GitHub Next

https://githubnext.com/

※ 調査日:2023年6月5日

## 使用可能
1. Copilot
1. Copilot Labs
1. Copilot Nightly
1. Copilot chat

## 使用可能な試作品 (usable prototype)
1. Copilot for CLI (command line interface)
1. Code Brushes
1. TestPilot
1. GitHub Copilot Labs
1. Visualizing a Codebase

## WAIT LISTに登録が必要。
1. Copilot for Docs
1. Copilot for Pull Requests (copilot4prs)
1. Copilot Voice
1. GitHub Blocks

## WIP (Work In Progress)開発中
1. GitHub Copilot Radar
1. GitHub Copilot for *Your* Codebase
1. Incremental CodeQL



# 辞書登録のすすめ

AIは区切り文字を認識します。
GitHub Copilot chatでは区切り文字を＜＜＜3文字以上などが利用されています。
区切り文字を認識すると、その文字を境にして、その前後の文字列を別の文字列として認識します。

そこで、質問する部分をコピペして、その後に登録した単語を入力すると簡単にそして素早く質問ができるようになります。

＜＜＜＜日本語で解説をしてください。
このキーワードを
「に」
という1文字で辞書登録します。

そすれば

「貼り付け部分」に
と入力するだけで

「貼り付け部分」＜＜＜＜日本語で解説をしてください。

と質問する事ができます。


自分がよく使う質問

＜＜＜＜日本語で解説をしてください。
に

＜＜＜＜このコードを解説してください。
こ

＜＜＜＜このエラーを解説してください。
こ

＜＜＜＜このコードを必要性、関連性、注意点を交えて解説してください。
こ





## キーボードショートカット 設定例

現在、キーボードショートカット はプライマリバーで開閉するようにしています。

```
  {
    // GitHub Copilot chat をプライマリバーに開きます。
    // GitHub Copilot chat 入力場所へのフォーカスします。
    "key": "ctrl+shift+x",
    "command": "workbench.panel.chatSidebar",
    "when": "viewContainer.workbench.view.extensions.enabled"
  },
  {
    // プライマリサイドバーを閉じます。(プライマリサイドバーが開いている時)
    "key": "ctrl+shift+x",
    "command": "workbench.action.closeSidebar",
    "when": "sideBarVisible"
  },

  // {
  //   // ↑上のを利用すれば、↓これは利用しません。
  //   // GitHub Copilot chat をプライマリバーで開閉します。
  //   // GitHub Copilot chat 入力場所へのフォーカスは無し。
  //   "key": "ctrl+shift+x",
  //   "command": "workbench.action.toggleSidebarVisibility"
  // },

```
