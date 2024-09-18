<!--
title:   v0 と GPT Engineer と Create.xyz の比較 (コンポーネント自動生成ツール)
tags:    GitHub,Next.js,Supabase,gptengineer,v0
id:      8146ac288c5cdf4bb8f3
private: false
-->
2024年9月18日
Create.xyzを追加しました。

調べれば調べるほど👇️似たようなサイトが出てきて、調査が中途半端になりました。

v0
GPT Engineer
Create.xyz
cursor composer
claude artifacts
amazon Bedrock artifacts
Galileo AI
Uizard
reweb

各サイト独自の特徴をもっています。

※未調査は永遠に未調査の可能性があります。

追記終了


## 比較

| 機能 | v0 | GPT Engineer | Create | Cursor composer |
|:-:|:-:|:-:|:-:|:-:|
| 出力コード | 個別コンポーネント | プロジェクト全体を考慮したコード | プロジェクト全体を考慮したコード | プロジェクトに沿ったコード |
| 出力ファイル | 1ファイル | 複数ファイル可能 | Next.jsのアプリとして出力 | コード |
| 設計ファイルの読み込み | 可能 | 可能 | ？ | 可能 |
| 成果物の公開 | 可能 | 可能 | 可能 | 無し |
| 会話の公開 | 可能 | 可能 | ？ | 無し |
| GitHub連携 | 無し | 可能 | 無し | 可能 |
| Supabase連携 | 無し | 可能 | 無し | ローカル、サーバー |
| プレビュー | 有る | 有る | 有る | 無し※1 |

※1
ローカルサーバーを起動すればブラウザで確認可能

----------------------------------------

Createを追加で調べてみました。
デフォルトでNext.jsのコードをダウンロードできるし、画像の追加も出来ます。

デザインはGUIで操作できますが、これは有料です。

動的なコンポーネントではなく、
ランディングページのデザイン等は v0 からの reweb で・・・



# その他の似たサイト

## Galileo AI

https://www.usegalileo.ai/

モバイル専用です。
モバイルアプリのUX／プロダクトデザイナー、モバイルインターフェースのデザインを作成します。



## Uizard

https://app.uizard.io/

自然言語の指示だけでサイトそのものを作ってくれます。

今回利用した場合だと、
Figmaみたいな感じで完成しました。
FigmaのようにGUIでパーツを大きくしたり小さくしたり調整が出来ます。

## reweb

未調査

GUIでデザインの操作が可能？



## その他のその他

cursor composer
claude artifacts
amazon Bedrock artifacts



----------------------------------------

# 成果物

プロンプト1回入力しただけで完璧なものが出来上がりました。
小さな不満はあるかもしれませんがたった1回でこの出来はすごいの一言です。

## v0 スクリーンショット

![v0_パスワードマネージャー.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/abcd2bc3-f084-b5da-234e-dc841fa9fbb1.png)

※プレビュー画面では動作します、v0はコンポーネントを作成するのに特化しています。

## GPT Eniginner

![GPT Eniginner_パスワードマネージャー説明.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b4d6856e-f134-8db9-8d5e-115bcfae5ba3.png)

※プレビュー画面では動作します、プレビュー画面上部にあるURLが(パスワードジェネレーターを変更するところ)このパスワードジェネレーターのURLにあたります。

GPT Eniginnerはアプリとして作られているのが特徴です。



## Create - free-to-use AI app builder

![Create_パスワードマネージャー2説明.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/d50b3f2c-271a-e630-a32d-2b0deb4a1709.png)

※プレビュー画面では動作します。

----------------------------------------

# v0 と GPT Engineer と Create とは？

v0は個別コンポーネント向けで、GPT Engineer と Createはアプリを作ります。

どれもコンポーネントを作り、その作ったコンポーネントをどう使うかで方向性が分岐していきます。

コンポーネントファーストとでもいうべきツールでしょうか。

## v0 とは？

https://v0.dev/chat

ドキュメント

https://v0.dev/docs

VercelによるAIを利用したgenerative user interface systemです。
自動でUIを作れます。

shadcn/uiとTailwind CSSをベースに、コピー＆ペーストで使いやすいReactコードを生成し、プロジェクトで利用することができます。

個別のコンポーネントを作るのに特化しています。



## GPT Engineerとは？

https://gptengineer.app/

ドキュメント

https://docs.gptengineer.app/

プログラミング支援ツールで、フロントエンドのコンポーネントを作ってくれます。

自然言語のみを使用して実際の Web アプリを迅速に構築できる AI Web ビルダー アプリです。
アイデアからアプリへの移行が簡単に出来ます。
使用技術は指定することが可能です。

GitHubやSupabaseとの連携も出来ます。
逆に、GitHubのリポジトリにプッシュした変更は全て、GPT Eniginnerにも反映されます。

<details><summary>その他 使用できる機能</summary>

npmパッケージも使用可能です。
これはライブラリがあったら、それを指定してGPT Eniginnerに取り込んで、それを元にアプリを作成してくれます。
一から作るよりも目的の物が早く作成できます。

npm パッケージの使用 - GPT エンジニア ドキュメント

https://docs.gptengineer.app/features/npm-packages/

hello-pangea/dnd パッケージを GPT Engineer プロジェクトに組み込むには、次のプロンプトを使用できます。

```プロンプト
Use the hello-pangea/dnd npm package to add drag-and-drop functionality to my Kanban board app.
Ensure users can add new cards, move them within columns, and reorder them.

```

注意
※GPT Engineer はこれらのサードパーティ パッケージの品質や信頼性を保証することは出来ません。


新しいプロジェクト生成を開始する前に、[詳細設定] モーダルで希望する技術スタックを選択できます。

デフォルトで shadcn/ui がサポートされています。
使用したい技術があるなら Advanced Settings で指定します。


GPT Eniginner と Supabase の連携の仕方

Supabase 統合 - GPT エンジニア ドキュメント

https://docs.gptengineer.app/integrations/supabase/

英語動画 Build a fullstack app using GPT Engineer & Supabase - YouTube

https://www.youtube.com/watch?v=6LztQnmRpew

画像の使用

画像の操作 - GPT エンジニア ドキュメント

https://docs.gptengineer.app/tips-tricks/using-images/


肝は Manage knowledge ここに自分で使う使用技術を書き込んでおけば、それに沿ったものを出力してくれます。

</details>

## Create

https://www.create.xyz/

ドキュメント

https://docs.create.xyz/create

自然言語で指示ができます。
試行回数は無制限？
AIはAnthropic Sonnet 3.5

ダウンロードも無料
ダウンロードはNext.jsのアプリとしてコードをダウンロードできます。
ダウンロードしたファイルを解凍して、ターミナルから `npm install` でインストールを行います。



有料ならFigmaのようにGUIでデザインを変更することが出来ます。
生成AIを選択できます。
GPT-4
Anthropic Opus
Google Gemini
Anthropic Haiku
Groq




## 使用している技術

### v0

デフォルトの使用技術
Shadcn/ui
TailwindCSS



### GPT Eniginner

チャット欄からライブラリの変更を指示することが出来ます。

デフォルトの使用技術
Vite
React
shadcn/ui
Tailwind
JavaScript

## Create

使用技術
React
TailwindCSS



----------------------------------------

# 使って比較してみる シンプルな基本動作の確認

最初はプロンプトを1回だけでどこまで出来るのかを見てみます。

比較方法は、両方のサイトでパスワードジェネレーターを作ってみます。

```
password generator

```

とだけ入力して実行ボタンを押します。



----------------------------------------

# 準備

どれもプレビュー画面がありますが、出力されたコードを実際のNext.jsで動くかどうか試すための下準備をしておきます。

Next.js App router をインストール

```terminal
# インストール
npx create-next-app@latest --typescript --tailwind --eslint

# 初期化
npx v0@latest init

```



----------------------------------------

# パスワードジェネレーター v0の場合

## v0

https://v0.dev/chat

このページを開いて、プロンプトに

```
password generator

```

と入力して、実行ボタンを押すだけです。
これで右側のプレビュー画面に表示されます。



実際にインストールをしてみます。

# インストール用コマンド

👆️の方で書いておいた Next.jsの下準備をしておいてください。

この👇️コマンドをプロジェクトのルートで実行します。

```terminal
npx shadcn@latest add "https://v0.dev/chat/b/pnLkzYt"

```

Next.jsのコード

appフォルダの下にpass_v0(フォルダ名は適当)を作り
page.jsxを作ります。
拡張子tsxでも良いのですが型の警告が出ます。

```src\app\pass_v0\page.jsx
import { PasswordGeneratorComponent } from "@/components/password-generator";

const page = () => {
	return (
		<div>
			<h1>PasswordGeneratorComponent</h1>
			<PasswordGeneratorComponent />
		</div>
	);
};

export default page;

```

トップページにリンクを作成

```src\app\page.tsx
export default function Home() {
  return (
			<div className="">
				{/* PasswordGeneratorComponent リンク*/}
				<a href="/pass_v0">Password Generator</a>
			</div>
		);
}

```

出力ソースの一部修正

```src\components\password-generator.tsx
- import { toast } from "@/components/ui/use-toast";
+ import { toast } from "@/hooks/use-toast";

```

※出力されたコードは use-toast への pathが間違っていました。

ローカル開発サーバーを立ち上げて確認します。

```terminal
npm run dev

```




公開URLから
右上の三点リーダーのドロップダウンメニューからview chat ボタンを押せばこれまでのv0との会話が表示されます。

右上のターミナルのアイコンを押せば

`npx shadcn@latest add "https://v0.dev/chat/*****`

と表示され、Next.jsのプロジェクトに追加できます。

※初期化の必要があります。

※このサンプルは右上のForkボタンで自分の所にコピーできます。

----------------------------------------

# パスワードジェネレーター GPT Engineerの場合

https://gptengineer.app/

このページを開いて
プロンプト入力の下にある Configure で使用技術を選択出来ます。

デフォルトでは
Vite
React
shadcn/ui
Tailwind
JavaScript
が選ばれています。



プロンプトに

```
password generator

```
と入力して、実行ボタンを押すだけです。



## GitHub

GitHubと直接接続します。



## Supabase integration

Supabaseと連結できます。
SupabaseのURLとAPI Keyを貼り付けるだけです。

GPT Eniginnerはプロジェクト単位で共通の設定が利用出来ます。

## 公開方法

右上の Publish ボタンから
ドロップダウンメニューが開くので
緑のDeployボタンを押します。
そうすると公開URLが表示され、誰でもアクセスできるようになります。

公開画面はトップ画面となり、作ったパスワードジェネレーターの画面は別に指定する必要があります。

## 出来上がったコンポーネント

`https://secure-squirrel-generator.gptengineer.run/password-generator`

コード修正後は、また右上のPublishボタンを押して次は Redeployボタンを押すことでコードが反映されます。


こちらもNext.jsでインストールしてみます。
こちらは、Next.js 用にコードが出力されていないので微調整が必要です。



# インストール コピーアンドペースト

👆️の方で書いておいた Next.jsの下準備をしておいてください。

コードは左のサイドメニューの
Edited 3 filesを開いて
コピーアンドペーストをします。

コードを見てみると 微修正が色々と必要です。

`src\components\PasswordGenerator.jsx`

"use client"; を最上部に追加

足りないライブラリを追加します。

```terminal
npm dlx shadcn@latest add switch
npm install sonner

```

`src\app\pass_gpt`

pass_gptフォルダを作成

```src\app\pass_gpt\page.jsx
import PasswordGenerator from "@/components/PasswordGenerator";

const PasswordGeneratorPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Password Generator
			</h1>
			<PasswordGenerator />
		</div>
	);
};

export default PasswordGeneratorPage;

```



```src\app\page.tsx
export default function Home() {
  return (
			<div className="">
				{/* PasswordGeneratorComponent リンク*/}
				<a href="/pass_v0">Password Generator v0</a>
				<br />
				{/* PasswordGenerator リンク*/}
				<a href="/pass_gpt">Password Generator GPT Engineer</a>
			</div>
		);
}

```



ローカル開発サーバーを立ち上げて

```terminal
npm run dev

```

一応、これでNext.jsでも動作確認が出来ました。



# インストール GitHub経由

最初にGitHubと連携の設定をします。

右上の GitHubボタンから

Connect to GitHubボタンを押します。
別ウィンドウが立ち上がります。

All repositories を選んで二段階認証をします。

接続の設定が完了したらもう一度右上のGitHubボタンを押します。

自分のボタンを選びます。

成功すると、右下にメッセージが出ます。

さらにもう一度 右上のGitHubボタンを開くと
Cloneの実行コードが表示されます。
Edit in VS Codeを選ぶとオンラインで編集が出来ます。
View on GitHubで GitHubのページが開きます。

まずは Cloneをします。
ローカルのPCの新しい空いている場所でVSCodeを立ち上げます。

自分は Clone で GitHub CLI を選びました。

```terminal
gh repo clone masakinihirota/secure-squirrel-generator

```

プロジェクトのroot(./secure-squirrel-generator)に移動してインストールをします。


```terminal
npm run install

```

ローカル開発サーバーを立ち上げて

```terminal
npm run dev

```

トップページ

`http://localhost:8080/`

開発したコンポーネントのページ

`http://localhost:8080/password-generator`

パスワードジェネレーター の動作確認をして終了です。






----------------------------------------

# パスワードジェネレーター Createの場合

https://www.create.xyz/

このページを開いて New Project を選びます。
※初回は プロンプトをすぐに入力できました。

右側に How to use (使い方)と出るのでその通りにします。

使用方法
- ご希望の内容を入力すると、アプリが表示されます。
- 小さく始めて、詳細を追加する スクリーンショットを貼り付けて再現する
- コンポーネントやインテグレーションを追加するには、'/'を押します。


プロンプトに

```
password generator

```
と入力して、Generateボタンを押すだけです。

## 公開方法

右上の Publish ボタンを押します。

URLの名前を指定して、 Claim URL and continue ボタンを押します。

👇️公開URLが取得されます。

公開URL
https://passwordgenerator.created.app

パスワードジェネレーター の動作確認をして終了です。



----------------------------------------

ここまでの感想

v0はコンポーネントとして出力されるので
コンポーネント単位でインストールできます。

GPT Eniginnerはアプリとして出力されるので、
一旦デプロイするか、GitHubに保存します。

GitHubと連携すれば、
逆にGitHubの変更もGPT Eniginnerにも反映されます。

Createはコード部分は無料ですが、GUIで操作するデザイン部分は有料と割り切っているようです。

コード部分だけ無料なのでそこは思いっきり指示が出来ます。
※回数制限は不明


----------------------------------------

次に、設計ファイルを読み込ませて作ってみます。

さらなる機能の探索へ

# v0

(未調査)



# GPT Engineer

Custom Knowledge
プロジェクトの使用する技術などを書いて置けます。
Next.js
Supabase
TailwindCSS
Shadcn/ui
を使います。

他に
その他の使用するライブラリを指定します。



# Create

(未調査)


----------------------------------------

プロジェクトを作って、そのプロジェクトで利用するページを作ります。

そのページで必要な設定を全部読み込ませます。



# ページの機能は作品登録

メインの機能は
汎用的な2つのリストの間をドラッグアンドドロップ

最初に、プロジェクトの設計図をかきます。
そしてそれをプロンプトとして、それぞれv0とGPT Engineerに渡してみます。



----------------------------------------

設計ファイルを用意して、👇️の設計書を読み込ませます。

## v0

チャット欄から設計書を読み込ませます。
チャット
design_document.mdを読み込んでコンポーネントを作ってください。

## GPT Eniginner

knowledgeから読み込ませます。
ただし現在の所、新しく始める時に、設計ファイル読み込ませる場所がわかりませんでした。
画像は右側の画像アイコンをクリックすることで読み込ませられます。

# Create

(未調査)



----------------------------------------

# 設計図

👇️作成を構想中のアプリの設計書から一部抜粋。

```design_document.md
# 使用技術

Next.js
Supabase
TailwindCSS
Shadcn/ui

# 目的

漫画もしくはアニメの2つの作品リストを用意します。
その作品リストの中から自分の好きな作品にドラッグアンドドロップで
登録できるようにします。

そうして、自分の好きな作品リストが作れるようにします。

# 画面構成

左に自分の好きな作品
右に作品リスト

右の作品リストにはカテゴリを切り替える事ができる機能を付けます。

## 用語

* アイテム

作品リストに登録してある作品を指します。
今回の場合は、漫画の作品名もしくはアニメの作品名になります。

* カテゴリ

アニメ、漫画というそれぞれの枠を指します。
後にカテゴリを増やせることも可能にします。
例えば、映画、小説などのカテゴリを将来的に増やす可能性があります。

* 作品リスト

事前に用意してある各カテゴリのアイテム群です。
作品名が表示されます。

* 自分の好きな作品リスト

作品リストの中からそのユーザーの好きな作品を集めたものです。
作品名、カテゴリ、評価が表示されます。


* 評価

作品をどのくらい好きか評価します。

* 評価方法

絶対相対評価で行います。

絶対相対評価とはまず一番好きな作品を決めて、その作品を基準とします。

あとから自分の好きな作品リストに追加する作品が、
同じぐらい好きかどうかで判断していきます。

評価の方式はティア方式で評価します。

* ティア方式とは

ティア1
ティア2
ティア3
普通、もしくは自分に合わない作品
未読、未評価
と5つの評価を準備しておきます。

登録時のデフォルトの評価は未読、未評価になります。

未読は、これから読む作品、期待している作品、評判が良さそうな作品を登録します。

一番好きなものをティア1に登録します。
次の作品からは同じぐらい好きだったらティア1へ
並び立たせることができないのならばティア2へ
これをティア3まで繰り返します。

そこまでに入らない作品は、
普通、もしくは自分に合わない作品
という評価になります。



## 機能

作品リストから自分の好きな作品リストへアイテムを渡せます。

ドラッグアンドドロップで渡せるようにします。

自分の好きな作品リストからドラッグアンドドロップをすると、
削除されます。

自分の好きな作品リストに登録した作品は評価できます。

作品リストに自分の好きな作品がない場合は、
そのユーザーが追加で作品を登録できます。



## 3つの役割

管理者
自分
他のユーザー



## 2つのカテゴリ

漫画
アニメ



## 2つのリスト

* 自分の好きな作品リスト

自分と管理者は編集可能、他人は編集不可

* カテゴリ別(漫画やアニメ)に作品が登録してある作品リスト

登録者と管理者以外削除不可

漫画の作品リストから自分の好きなリストの2つのリストを用意して
2つのリスト間をドラッグアンドドロップで行き来する。

```


----------------------------------------

結果

## v0

表示はできました、
しかし残念ながらドラッグアンドドロップ機能はうまく動きませんでした。
プロンプトで修正を依頼すれば動いてくれると思います。



## GPT Engineew

`https://gptengineer.app/projects/babc3c58-c0e1-4336-b7d7-962ba3ee476d`

最初はトップページなので knowledgeを入力する場所が見つかりませんでしたが、
二回目からは左サイドメニューが表示されチャット欄にknowledgeが表示されるので入れられます。

Manage knowledgeに設計書を再度記入してプロンプトを入れます。



## 感想

日本語のプロンプトでも指示が可能です。

今回、設計書に書いたような複雑な設計になると流石に一度では生成できませんでした。

命令は、1プロンプト1命令にしたほうが良いと思います。
1プロンプトで複数の命令をすると間違った結果が出やすいです。



### v0

日本語で会話が出来ます。



### GPT Engineer

日本語入力を理解してくれますが、
出力は英語です。

### Create

(未調査)


----------------------------------------

<details><summary>試してみた 追加プロンプト</summary>

作品リストからドラッグアンドドロップしてお気に入り作品リストにいれるとアイテムが追加されます。

お気に入り作品からドラッグアンドドロップでリストの外に出すとそのアイテムは削除されます。

お気に入り作品リストからドラッグアンドドロップでリストの外に出すと、アイテムを削除します。

作品リストからお気に入り作品リストへドラッグアンドドロップでアイテムを追加する機能を追加してください。

お気に入り作品リストの中のアイテムをドラッグアンドドロップでお気に入り作品リストの外に出すとそのアイテムを削除します。

作品リストに作品を追加するとき、その作品を入力したユーザーの名前も一緒にデータを入力したユーザーとして追記します。

お気に入り作品リストを評価ごとに自動で並べ替えをします。ティア1が上に来ます、次にティア2、その次にティア3が並びます。

</details>

----------------------------------------

# v0のそれから

(未調査)



----------------------------------------

# GPT Eniginnerのそれから

数度の会話の後で、ここまで出来ました。
(無料分のみ)

開発画面 (AIとの会話 チャット欄付き)
`https://gptengineer.app/projects/babc3c58-c0e1-4336-b7d7-962ba3ee476d`

アプリ画面
`https://preview--favorite-works-dragdrop.gptengineer.run`

機能
ドラッグアンドドロップでもアイテムを移動
作品リストからお気に入り作品リストに入れると登録
お気に入り作品リストから外に出すと削除
ティア方式で評価
ティアの順番で自動ソート
ユーザーが作品を登録



## アプリの使用方法

「作品リスト(右側)」の中から好きな作品を追加ボタンで追加、もしくはドラッグアンドドロップで「お気に入り作品リスト(左側)」に追加してください。

評価をすると評価順に並び替わります。

削除ボタンを押すか、ドラッグアンドドロップで「お気に入り作品リスト(左側)」の外に出すと削除されます。

右上にあるカテゴリのドロップダウンメニューから 漫画とアニメを選択できます。

「お気に入り作品リスト(左側)」に二重登録は出来ません。

「作品リスト(右側)」の下にある「作品登録」から、
作品名と作品登録者名を入力すると作品を追加できます。

修正点
同じ作品名なのに登録が出来てしまう
スマホの画面に切り替えると非常に見づらい
スマホで使わないようにして、スマホ専用の画面を別に作ったほうが良い。
登録作品が多くなったときのための絞り込み機能、分割表示機能
無限スクロール機能
ページネーション機能
ドラッグアンドドロップ時にアイコンの変更 持っているふうなアイコンにする。
アイテムの上にマウスアイオンが重なったときのアイコンの変更。ドラッグアンドドロップが出来ると直感的に思わせる。
新しく追加したときの日時を記録
評価をした時、変更したときの日時を記録。
アイテムの詳細情報を見るためのリンク機能、詳細情報ページの作成


## 実現した機能

作品リストからドラッグアンドドロップでお気に入り作品リストに登録できます。

お気に入り作品リストからドラッグアンドドロップで外に出すと削除できます。

お気に入り作品リストは評価順に自動で並び替えが出来ます。

同じ評価はABC順で自動で並べ替えをします。

作品を追加する時、追加したユーザー名も一緒に登録します。



## 感想

GPT Eniginnerのお試し画面でここまで動いてくれるのは感動しました。
後でDBに接続するバックグラウンドのコードが必要でしょうが、フロントエンドの画面としては完璧です。
ここから更に細かい機能の追加も出来そうです。

スクリーンショットよりも、実際に動かしてみるほうが凄さを実感できると思います。

これは個人で一から勉強して作ったら一月はかかるのではないでしょうか？

それがマニュアルを見ながらでも数時間で完了。
設計や入力プロンプトを考えられていたら、次からは2時間弱で作れてしまいそうです。
慣れた早い人なら30分もかからないのではないでしょうか？

コレでさらにGitHubでバージョン管理をして、
REWEBで調整、
Supabaseと postgres.newでDB設計。
まさに夢のツールになると思います。



# 参考

私の使用しているAI関連サイト 2024年 9月版 #GEMINI - Qiita

https://qiita.com/masakinihirota/items/dc260e90f43a833d0e98


----------------------------------------

# Createのそれから

(未調査)



----------------------------------------

# まとめ

次回から使うとすれば、

v0は使いやすいUIに徹底的に使いやすいような改良を重ねていくような使い方をしていきます。

GPT Eniginnerは全体の構造から使う技術を指定して使うようにします。
例えば最初は、
言語は TypeScript
フレームワークはNext.jsのApp router
ヘッドレスUI はShadcn/ui
DBはSupabase
ドラッグアンドドロップ ライブラリはdnd kit

と Manage knowledge に具体的に指定すると思います。

設計書も事前にきちんと作っておきます。
これは無料なら Gemini に、有料なら OpenAI o1 に相談します。

そして実際に使ってみて満足するまで GPT Eniginner に繰り返しプロンプトを入力します。

CreateはNext.jsで作成されるのでNext.jsを使う人ならば良いツールです。



----------------------------------------

# 追加したい、修正したい機能

タイトルの変更

モバイル対応

公式の登録
登録者によって表示、非表示を変更できる

ユーザーがアラシの場合を考えて、ユーザー名は自動で登録、その他の対処方法を考える。
viteで作られているのでNext.jsに変える。



----------------------------------------

# オアシス宣言

https://github.com/masakinihirota