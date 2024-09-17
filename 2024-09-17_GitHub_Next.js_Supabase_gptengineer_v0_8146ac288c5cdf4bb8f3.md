<!--
title:   v0 と GPT Engineer の比較 (コンポーネント自動生成ツール)
tags:    GitHub,Next.js,Supabase,gptengineer,v0
id:      8146ac288c5cdf4bb8f3
private: false
-->
最初はかなり前に **v0** を知り、最近 **GPT Eniginner** が無名ながらも先発のv0なみにすごいと噂を見て実際にどうなのか試してみました。

結論から書くと 無名ながら **GPT Eniginner** は **v0** 以上にすごい！

デザイン力は **v0** のほうがすごいらしいのですが、そこまで見ていません。
連携する力等のトータルでみると **GPT Eniginner** の方に軍配が上がります。

好みだけで言えば **v0** のほうが好きです。

----------------------------------------

# 成果物

プロンプト1回入力しただけで完璧なものが出来上がりました。
どちらも小さな不満はあるかもしれませんがたった1回でこの出来はすごいの一言です。

## v0

![v0_パスワードマネージャー.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/abcd2bc3-f084-b5da-234e-dc841fa9fbb1.png)

※動作します、v0はコンポーネントを作成するのに特化しています。

## GPT Eniginner

![GPT Eniginner_パスワードマネージャー説明.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b4d6856e-f134-8db9-8d5e-115bcfae5ba3.png)

※動作します、プレビュー画面上部にあるURLが(パスワードジェネレーターを変更するところ)このパスワードジェネレーターのURLにあたります。

GPT Eniginnerはアプリとして作られているのが特徴です。

どちらもプレビュー画面ですが、動作させることが出来ます。



----------------------------------------

# v0 と GPT Engineer とは？

v0は個別コンポーネント向けで、GPT Engineerはアプリを作ります。

どちらもコンポーネントを作り、その作ったコンポーネントをどう使うかで双方の方向性が分岐していきます。

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

</details>



## 比較

| 機能 | v0 | GPT Engineer |
|:-:|:-:|:-:|
| 出力コード | 個別コンポーネント | プロジェクト全体を考慮したコード |
| 出力ファイル | 1ファイル | 複数ファイル可能 |
| 設計ファイルの読み込み | 可能 | 可能 |
| 成果物の公開 | 可能 | 可能 |
| 会話の公開 | 可能 | 可能 |
| GitHub連携 | 機能無し | 可能 |
| Supabase連携 | 機能無し | 可能 |


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

どちらもプレビュー画面がありますが、
出力されたコードを実際のNext.jsで動くかどうか試すための下準備をしておきます。

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



## 公開URL

出来上がった成果物です。

https://v0.build/pnLkzYt

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

動作確認をして v0の基本動作確認は終了です。



公開URLから
右上の三点リーダーのドロップダウンメニューからview chat ボタンを押せばこれまでのv0との会話が表示されます。

チャット自身を公開するURLも用意されています。

`https://v0.dev/chat/ZTJ4fRWIYzE`


右上のターミナルのアイコンを押せば

`npx shadcn@latest add "https://v0.dev/chat/b/pnLkzYt"`

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

成果物

`https://gptengineer.app/projects/65d32dab-2156-48c7-bd37-16354703893d`

画面中央上の

preview--secure-squirrel-generator.gptengineer.run/index
を
preview--secure-squirrel-generator.gptengineer.run/password-generator

に変更します。これだけできちんと動きます。

※右上のアイコン群はWeb開発をしていると直感でわかるものばかりです。
歯車は設定、
<>GitHub はコードをGitHubに
Publishは公開方法
□に矢印は別画面で表示
スマホアイコンはスマホ形式で見る
円の矢印はリロード

※右上の歯車アイコンを押すと色々設定ができます。

Knowledge

これは、そのプロジェクト特有の設定を追加できます。
アプリを作る前に作っておいた設計書を貼り付ければ、その設計が反映されます。



## GitHub

GitHubと直接接続します。



## Supabase integration

Supabaseと連結できます。
SupabaseのURLとAPI Keyを貼り付けるだけです。

GPT Eniginnerはプロジェクト単位で共通の設定が利用出来ます。



## 成果物

`https://gptengineer.app/projects/65d32dab-2156-48c7-bd37-16354703893d`

## 公開方法

右上の Publish ボタンから
ドロップダウンメニューが開くので
緑のDeployボタンを押します。
そうすると公開URLが表示され、誰でもアクセスできるようになります。

公開画面はトップ画面となり、作ったパスワードジェネレーターの画面は別に指定する必要があります。

index トップ画面

`https://secure-squirrel-generator.gptengineer.run/`

作られたページ

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

ここまでの感想

v0はコンポーネントとして出力されるので
コンポーネント単位でインストールできます。

GPT Eniginnerはアプリとして出力されるので、
一旦デプロイするか、GitHubに保存します。

GitHubと連携すれば、
逆にGitHubの変更もGPT Eniginnerにも反映されます。


----------------------------------------

設計ファイルを読み込ませて作ってみます。

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

出来上がったもの

## v0

`https://v0.build/nDxzpOv`

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

今回、設計書に書いたような複雑な設計になると流石にどちらも一度では生成できませんでした。

命令は、1プロンプト1命令にしたほうが良いと思います。
1プロンプトで複数の命令をすると間違った結果が出やすいです。



画像に関してはまだ試していません。



### v0

日本語で会話が出来ます。


### GPT Engineer

日本語入力を理解してくれますが、
出力は英語です。



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

`https://gptengineer.app/projects/babc3c58-c0e1-4336-b7d7-962ba3ee476d`

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


----------------------------------------

追加したい機能

タイトルの変更
モバイル対応

公式の登録
登録者によって表示、非表示を変更できる



----------------------------------------

# まとめ

最初はv0でコンポーネントの部品を作り、
GPT Eniginnerでアプリ全体を作っていくというイメージになりました。

GitHub連携とSupabase連携がとても魅力的でした。

# オアシス宣言

https://github.com/masakinihirota