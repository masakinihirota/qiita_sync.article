<!--
title:   GitHub Copilot導入後、初めて使う時。(豊富な使用例付き)
tags:    githubcopilot,githubcopilotchat
id:      0e58a6b921e4420a2882
private: false
-->
追記 2025年4月26日
Copilot Chat の会話共有: Copilot Chat でのやり取りをリンクで共有できるようになったため、個人的な開発の質問や問題解決について、他の開発者と情報を共有しやすくなりました。

Copilot Chat のビジョン入力 (パブリックプレビュー): Copilot Chat で画像を入力として扱えるようになったため、エラー画面のスクリーンショットを見せて質問したり、デザインのアイデアを画像で共有してコード生成のヒントを得たりといった、新しい使い方ができるようになります。

* 手書きのワイヤーフレームや、Figma などのデザインツールで作成した UI のスクリーンショットを Copilot Chat に見せることができます。
* 「このデザインに基づいて、ボタンの HTML と CSS を生成してください」「この画面レイアウトを実現するための React コンポーネントの基本的なコードを書いてください」といった指示を出すことができます。
* Copilot は画像を解析し、そこに描かれている要素やレイアウトを理解して、コード生成のヒントとなる提案をしてくれるようになります。

開発者は、コードを書くよりも、設計書や指示書、Figmaなどのツールを使った画像を描く技術が求められるようになっていくと思います。
よく言われることですが、設計書等を書いた後は、GitHub Copilotは8割ぐらいまではすぐに作ってくれますが、残り2割の最後の詰めは未だに人間の力が必要です。

今回の画像を読み込ませられる機能は、残り2割の部分をより縮められるようになるのではないでしょうか。

追記終了

追記 2025年4月15日

GitHub Copilot Agent mode に自動実行モードが追加されました。
実験機能・非推奨です。よくわからないならば絶対に有効化しないでください。

```settings.json
  // GitHub Copilot Agent Mode 有効化
  "chat.agent.enabled": true,
	// 自動実行モード (YOLO モード)
	"chat.tools.autoApprove": true,

```

追記終了



追記 2025年2月4日
OpenAIの最新推論モデル「o3-mini」が「GitHub Copilot」などで利用可能に - 窓の杜

https://forest.watch.impress.co.jp/docs/news/1659601.html

追記終了



追記 2025年1月7日
GitHub Copilot AI進化の大まかな段階

1. 提案

GitHub Copilot

2. 説明

GitHub Copilot、GitHub Copilot chat等

3. 自然言語での構築

Copilot Workspace、GitHub Copilot Edits、GitHub Spark(Wait list中)

自然言語による複数のファイルに指示ができるようになります。


4. AIエージェント(不完全自立型AI)

GitHub Copilot Agent Mode

Documentation for Visual Studio Code
https://code.visualstudio.com/docs/?dv=win&build=insiders

GitHub Copilot Agent Modeが登場。タスクを与えると自律的にプログラミング、テストコードも修正、テストが失敗すればデバッグも － Publickey
https://www.publickey1.jp/blog/25/github_copilot_agent_mode.html

AIがコパイロット(副操縦士)からエージェント(代理人)になりました。
この 3.までは人間がメインにコードを書きサポートをAIがしていましたが、4.からは人間が指示を出しAIがコードを書きます。主従逆転が起きています。

主なAIエージェント
Devin、Cline、Roo Code、OpenHands等
👆 これらのうち VSCode(Cursor)の拡張機能から使えるものがいくつかあります。
GitHub Copilotの有償契約を結んでいるとGitHub CopilotのAIモデルが利用できます。 **(実質定額)**

1 と 2 はほぼ同時に登場しました。
その後、3 もAIの発達により出来るようになりました。

GitHub Sparkの登場でGitHub CopilotもAIエージェントになるかもしれません。

GitHub Copilot はこの3つとも備わっています。
しかし現状3はまだまだ発展途上です。スタートダッシュは得意ですし知識もほぼ必要ありませんが、ある程度作り込むとAIを操作する側の知識が強く要求されてきます。

AIの問題解決能力はまだ高くありませんが、ある程度まではAIに任せる時代がきたようです。

しかしこれらの機能によってIT職種の仕事が奪われるということは無いでしょう、より高い技術を持つ必要になりましたが。

追記終了



追記 2024年11月27日
GitHub Copilotがうまく使えない方へ、思った通りの提案を出してくれない人へ。

問題を小さく分けましょう。
問題を大きくするほど、人間の暗黙の了解などが入り、AIに教えなくてもなんとかしてくれるだろうという思い込みが意識下で生じます。
それを避けるために、AIにすべての情報を完璧に与えることで自分の希望した提案を出てくるようになります。

このBlog記事の通りにやると100％の正確な情報を与える事でそれでようやく希望する提案を出してくれることがわかります。

人間側が情報の出し惜しみしてはいけません。そしてそれは問題を小さく分けることでやりやすくなります。

他にも、AIになんの情報が足りないかを逆に質問してほしいなど、AIを使うテクニックが色々とあるのでそれを調べて自分のAIに対する質問力を鍛える必要があります。AIは自分を映す鏡であり、自分の使い方次第によって能力が左右されるツールです。

追記終了



# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

https://qiita.com/masakinihirota/items/8971aa8ccead3193e77f



## キーボードショートカットキー (VSCode)

※提案＝GitHub Copilotが出力するコードの事です。

| GitHub Copilot 操作                                                               | ショートカットキー |
| ------------------------------------------------------------------ | ------------------ |
| 提案を受け入れる                                                   | TAB キー           |
| 提案を拒否する                                                     | Esc キー           |
| まとめて提案を表示させる                                           | Ctrl+Enter キー    |
| 提案を単語単位で受け入れる                                               | Ctrl ＋ 右矢印キー  |
| 提案を単語単位での受け入れを元に戻す [独自](#キーボードショートカットキー)  | Ctrl+b  |
| 次の提案を見る                                                     | Alt ＋]            |
| 前の提案に戻る                                                     | Alt ＋[            |
| インライン候補をトリガーする [独自](#キーボードショートカットキー) | Alt ＋/            |
| Labs 機能リストを表示                                              | Ctrl+Shift+Alt+e   |
| サイドバー開閉のトグル [独自](#キーボードショートカットキー)       | Ctrl+Shift+a       |


| インラインチャットの操作                                               | ショートカットキー |
| ------------------------------------------------------------------ | ------------------ |
| インライン チャット: コード チャットを開始する | ctrl + l, ctrl + k l|
| インライン チャット: 変更を受け入れる | ctrl + Enterキー |
| インライン チャット: チャット欄のフォーカルの変更 | 上下キー |


※GitHub Copilotが長いコードを提案してきた時、ショートカットキーの「単語単位で受け入れる」を使用すると便利です。

※ インライン候補をトリガーするとは提案が表示される場所ならばどこでも GitHub Copilot が動きます。
例えば、提案が表示される場所からカーソルが動かしてしまっても、カーソルを元の場所に戻してトリガーコマンドを使うと提案が表示されます。

※ インライン候補をトリガーするはデフォルトのキー設定では動きません。：Windows で確認
自分でキーボードショートカットキーを設定する必要があります。（これは自分の環境だけかもしれません。）


# 導入後（課金後）

導入後に何をしていいのか？何が出来るのかがよくわからなかったので調べてみた。

# 環境

Windows10
GitHub Copilot (導入 1年契約 or 1月契約)
VSCode
VSCode Insider (VSCodeの開発版 GitHub Copilot chatを使用するために必要)


# GitHub Copilot の種類

1. Copilot
1. Copilot Labs
1. Copilot for Individuals
1. Copilot for Business
1. Copilot X
1. Copilot Chat
1. Copilot for Pull Requests
1. Copilot for CLI (command line interface)
1. Copilot Voice
1. Copilot for Docs

- Copilot
  GitHub Copilot の**基本的な機能**です。**OpenAI Codex**をベースに作られています。Visual Studio Code、Visual Studio、Neovim、JetBrains の各統合開発環境（IDE）で利用できます。
- Copilot Labs
  GitHub Copilot の**実験的な機能**を提供するプログラムです。このプログラムは、GitHub Copilot の最新機能を試す事ができます。
  いうなれば、幅広く横に広げる機能を追加していきます。
- Copilot for Individuals
  料金のプラン名：**個人利用向け**の GitHub Copilot です。このプランは、個人で利用する場合に適しています。
- Copilot for Business
  料金のプラン名：**ビジネス利用向け**の GitHub Copilot です。このプランは、ビジネスで利用する場合に適しています。
- Copilot X
  **GPT-4**を活用した、GitHub Copilot の高度な機能を提供するプログラムです。このプログラムは、より高度なコード補完機能を提供します。日本ではまだ発表されていません。
- Copilot Chat
  Copilot X の機能の一つと思われる名前。チャットベースのコード補完機能を提供するプログラムです。このプログラムは、**チャットベースのコード補完機能**を提供します。
- Copilot for Pull Requests
  Copilot X の機能の一つと思われる名前。Pull Request 作成時にコード補完機能を提供するプログラムです。このプログラムは、**Pull Request 作成時にコード補完機能**を提供します。
- Copilot for CLI(command line interface)
  Copilot X の機能の一つと思われる名前。コマンドラインインターフェース（CLI）で利用できる GitHub Copilot です。このプログラムは、**CLI 上でコード補完機能**を提供します。
- Copilot Voice
  Copilot X の機能の一つと思われる名前。音声入力によるコード補完機能を提供するプログラムです。このプログラムは、**音声入力によるコード補完機能**を提供します。
- Copilot for Docs
  Copilot X の機能の一つと思われる名前。ドキュメント作成時にコード補完機能を提供するプログラムです。このプログラムは、**ドキュメント作成時にコード補完機能**を提供します。

※GitHub Copilotは、OpenAIが作成した人工知能モデルのOpenAI Codexを利用しています。OpenAI Codexは、数十億行の公開されたソースコードでトレーニングされた、コーディングに特化した言語モデルであり、GPT-3をベースにしています。Codexは、GPT-3よりもコード生成に特化しているため、GitHub Copilotのコード補完機能に適しています。

※Copilot X シリーズはOpenAIの新しいGPT-4モデルを採用しただけでなく、Copilotにチャットと音声機能を導入し、Pull Request、コマンドライン、ドキュメントにCopilotを組み込んで、プロジェクトに関する質問に対応します。あらゆるステップでAIを活用できるようになることによって、開発者の生産性に対する考え方を根本から再定義していくツールになる予定です。

「Copilot X シリーズの開発コンセプトが、**開発ライフサイクル全体を通してすぐに利用できる AI アシスタント**に進化させるべく取り組んでいます。」とあるのでこれらの機能を統合したものを Copilot X シリーズとして提供されるものと思われます。

- Copilot Chat
- Copilot for Pull Requests
- Copilot for CLI(command line interface)
- Copilot Voice
- Copilot for Docs


# どんな事ができるのか？（英語）

https://githubnext.com/projects/code-brushes

※このサイトでは具体的な挙動が見れるので特にオススメです。
ボタンひとつで切り替えて表示されるので、**GitHub Copilot を理解するのに一番便利なサイト**だと思います。

`ORIGINAL CODE（ボタン）CODE UPDATED WITH MAKE MORE READABLE BRUSH`

中央のボタンを押すだけで切り替えられます。
左側はオリジナルコード、右側は GitHub Copilot が書き換えたコードが表示されます。

## 用語 GitHub Copilot 関連

### 提案 Suggest

提案とは、GitHub Copilot が出してくるコードの事です。

### GitHub Copilot コマンド パレット

**GitHub Copilot Labs** の機能をボタン一つで呼び出すための機能です。
それぞれの関数名の上に出てくる約 10 個の Copilot アイコンの事を指します。
アイコン一つ一つに **GitHub Copilot Labs** の機能が振り分けられています。

### GitHub Copilot ステータスアイコン

VSCode 画面下のパネルにあるアイコンです。
（左サイドバーにある GitHub Copilot のアイコンと同じアイコンがあるはずです。）
GitHub Copilot の機能が有効かどうかを確認する事ができます。

このアイコンから GitHub Copilot の機能を有効にしたり、無効にしたりする事ができます。

### テレメトリデータ

システムから収集された状態情報、性能指標、および操作データなどのデータの事です。主に Web 開発において、Web サイトの訪問者数やアプリケーションの使用状況を収集し、品質管理やトラブルシューティングに役立つ。データ収集システム、データベース、ビジネスインテリジェンスツール、機械学習アルゴリズムなどが使用されます。



# はじめの一歩

VSCode で使用する。問題はここから、

最初に、これらの VSCode 拡張機能を入れます。

- GitHub Copilot 拡張機能

GitHub Copilot
https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

※GitHub Copilot X の発表はされましたが、まだ詳細な報告はされていません。 (2023 年 3 月 28 日)

上記の拡張機能を入れると VSCode の再起動が求められます。
次に拡張機能を利用するため GitHub にログインをするように求められます。

ログインをします。

## GitHub Copilot の有効化、無効化

GitHub Copilot ステータスアイコンをマウスでクリックする事で、オンオフを選択できます。
※VSCode の下にあるステータスバーに表示されているアイコンです。

# 使い方

## GitHub Copilot の基本的な使い方

### 何かコードを書きたい

作成したい言語に適した拡張子がついた新しいファイルを用意します。
関数名を考えて書き出します。
そうすると、Copilot がコードを提案してきます。

### 例 基礎中の基礎 基本的な使い方

```Dates.js
function calculateDaysBetweenDates(begin, end) {


```

※calculateDaysBetweenDatesの意味は、日付間の日数を計算する関数です。
begin=開始日、end=終了日

ここまで書けば提案が表示されます。

**TAB キー**で決定します。

提案を拒否する場合は、
**Esc キー**を押します。

以上が基本的な使い方です。

※関数名が作成したいコードの説明になっているのがポイントです。
GitHub Copilot は関数名を見て、その関数が何をするのかを理解しています。
他のファイルを含め、周囲のコードから関数や変数を正しく「推測」する事ができます。

## さらなる Copilot の機能

#### 他の提案を見たい時

提案が出ている場面で
**次の提案を見る: Alt ＋]**
**以前の提案に戻る: Alt ＋[**

これらのショートカットキーを使用します。

#### 1単語ごとに確定していきたい

**1単語ごとに提案を受け入れます: Ctrl ＋右矢印キー**

**1単語ごとに確定した提案を元に戻します: Ctrl ＋左矢印キー**

このショートカットキーは文章が提案された時に、**「単語単位」** で提案を受け入れます。

#### まとめて提案を出す

通常は１行に 1 つづつ、その他の次の提案はショートカットキーで一つ一つ見ていきますが、それらをまとめて表示したい時に使用します。

**まとめて提案を別ウィンドウに表示させたい: Ctrl+Enter キー**

まとめて提案を複数表示させる事が出来ます。
別ウィンドウが開きますのでその中から選びます。
どれを選ぶか決めたら、提案の上にある **Accept Solution** をクリックします。

拒否したい場合は **タブ** を閉じます。

### ある特定の場所（カーソルの場所）で提案を始めたい時

**インライン候補をトリガーする Alt +/**
これは、GitHub Copilot に手動でコードの提案をさせるショートカットキーです。
現在の位置で GitHub Copilot を使いたい場合に使用します。

※提案にカーソルを合わせると、提案を選択するための GitHub Copilot コマンド パレットが表示されます。

### コメント欄からコードを書く

### 例 コメント書いてコードを提案してもらう

```LeapYear.ts
// うるう年の判定
function

```

↑ コメントに書きたいコードの説明を書き、そして function まで書いて暫く待つとコードを提案をしてくれます。

Alt+] で次の提案を見る事が出来ます。
Alt+[ で前の提案に戻る事が出来ます。

※提案が複数ある場合

```LeapYear.ts
//うるう年の判定
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
console.log(isLeapYear(2020));
console.log(isLeapYear(2021));

```

↑ タブキーを押していくだけで、コードを書いていく事が出来ます。

※isLeapYearと関数名を提案してくれました。
自分は特にそうですが、同じ名前の関数を書いてしまいがちなので、提案してくれるのはありがたいです。
AIにどんどん関数名を考えてもらいましょう。

これは逆に、GitHub Copilot が関数名（もしくはコメント）から作者の意図を理解している証拠です。
自分で関数名、変数名を1文字や意味のない単語(foo,buz等)で書いてしまうと、最適な提案をするのが難しくなります。

ファイルの拡張子は「.ts」(TypeScript)なので型を提案してもらう事が出来ます。

カーソルを関数の上に持っていき、
GitHub Copilot コマンド パレットの「型を追加」ボタンを押します。
そうすると、自動的に範囲選択がされて、型をつける事が出来ます。

```LeapYear.ts
//うるう年の判定
function isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
console.log(isLeapYear(2020));
console.log(isLeapYear(2021));

```

↑ このように自動で型をつけてくれます。

関数名まで提案してくれています。
このように GitHub Copilot をうまく使えば関数名や変数名などに悩む必要がなくなります。
適切な名前をつけるのは熟練者でも難しいですが、それを考える必要がなくなるのは大きいですね。



### ちょっとしたテクニック1

初心者のうちで文法がまだわからない場合等、コメントを書いてコードを提案してもらいます。
ただし、この方法だといつまでたっても自分が文法を覚えません。

**コメントはそのファイルの適切な場所に書いてください。**

関数だけではなく、HTMLのタグなども提案してくれます。
バックエンドはわかるが、フロントエンドはわからないような場合にも使えます。

例えばまずコメントを書いてから提案をすると、HTMLのコードを提案してくれます。

```form.tsx
{/* 名前を入力 */}

{/* メール項目を入力 */}

```

それぞれのコメントの直下にカーソルを持ってきて、提案をしてもらうと、

```form.tsx
{/* 名前を入力 */}
<label htmlFor="name">お名前</label>
<input type="text" id="name" name="name" required />

{/* メール項目を入力 */}
<label htmlFor="email">メール</label>
<input type="email" id="email" name="email" required />

```

それぞれコードを書いてくれます。

テストコードも提案してくれます。

```form.test.tsx
// メールテスト

```

と、コメントを書くことで

```form.test.tsx
// メールテスト
const emailInput = screen.getByRole("textbox", { name: /メール/i });
expect(emailInput).toBeInTheDocument();

```

テストコードも提案してくれます。
※ただし、ファイル名、拡張子、前後のコード等に影響されて提案がされます。
このテクニックのコードは前後のコードが省略されてます。



### ちょっとしたテクニック2

```page.tsx
<a href="/">Home</a>

```

👆このコードに TailwindCSS で装飾を追加したいと思います。

```page.tsx
{/* 中央に配置 */}
<a className='' href="/">Home</a>

```

👆TailwindCSS の装飾を追加するために、

* コメントを追加しました。
* `className=''` とTailwindCSSの設定をしました。

しかし、カーソルを装飾部分に持っていっても、GitHub Copilot の提案は出てきません。
これは、提案がすでに完了している、もしくは適切な場所ではないと判断されるためです。

なのでわざと、改行を入れて提案をさせます。

```page.tsx
{/* 中央に配置 */}
<a className='
' href="/">Home</a>

```

このように改行を入れて、

```page.tsx
{/* 中央に配置 */}
<a className='●
' href="/">Home</a>

```

●の部分にカーソルを持ってくると、そのカッコ内の提案が表示されます。

1回目の提案

```page.tsx
{/* 中央に配置 */}
<a className='block text-center mt-4
' href="/">Home</a>

```

2回目の提案

```page.tsx
{/* 中央に配置 */}
<a className='block text-center mt-4 text-blue-500 underline
' href="/">Home</a>

```

👆1回目の提案で中央の配置のコードが追加され、
2回の提案で色を変えて、アンダーラインをひくコードが追加されました。
このあと改行を元に戻すと完成になります。



#### 型を消す

一つ前の項目で↓関数ができました。

```LeapYear.ts
//うるう年の判定
function isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
console.log(isLeapYear(2020));
console.log(isLeapYear(2021));

```

↑上のように型をつけたけど消したい場合は、もう一度 GitHub Copilot ~~コマンドパレット~~の型のアイコンを押すと ↓ 下のように型が外れたコードになります。

※GitHub Copilotのコマンドパレットは廃止されました。



```LeapYear.ts
//うるう年の判定
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
console.log(isLeapYear(2020));
console.log(isLeapYear(2021));

```

# GitHub Copilot のコツ

## コメントを活用します

コメントを書きましょう、コメントが充実している程そして正確な程 提案が良くなります。

型をつけましょう、型をつける事で提案が良くなります。

その他にも・・・

- データの名前
- データの型
- データの範囲
- データの意味
- データの関係性
- データの処理内容
- データの出力内容
- 日本語で書いた解説や説明をするコメント
  全部書く必要はありませんが、できるだけ多くの情報を書くようにしましょう。
  多くの情報があればあるほど提案の精度が上がっていきます。

逆に与えるデータが間違っていると、提案も間違ってしまいます。

※ 英語で書いたほうがより良い提案が得られるかもしれません。（未検証）

### 例 詳細なコメントを書いてみる

コメントを充実させるとどうなるか見てみましょう。

#### 詳細なコメントを書いた場合

↓ コメント内で FizzBuzz 問題について色々と書いてみます。
(FizzBuzz 問題は有名なのでコメントも正確な提案をしてくれました。)

```fizzBuzz.ts
// 関数の名前:FizzBuzz問題
// 引数: 最大値
// 返り値: なし
// 処理内容: 1から最大値までの数値をコンソールに出力する
//           ただし、3の倍数の時は数値の代わりに「Fizz」を、
//           5の倍数の時は「Buzz」を、
//           3の倍数かつ5の倍数の時は「FizzBuzz」を出力する
function

```

↑ このようにコメントを書くと、提案が正確になります。
なのでこの状態から、

↓ このように提案を出してみるとこうなりました。

```fizzBuzz.ts
// 関数の名前:FizzBuzz問題
// 引数: 最大値
// 返り値: なし
// 処理内容: 1から最大値までの数値をコンソールに出力する
//           ただし、3の倍数の時は数値の代わりに「Fizz」を、
//           5の倍数の時は「Buzz」を、
//           3の倍数かつ5の倍数の時は「FizzBuzz」を出力する
function fizzBuzz(max) {
    for (var i = 1; i <= max; i++) {
        var output = "";
        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }
        if (output === "") {
            output += i;
        }
        console.log(output);
    }
}

```

### 例 詳細なコメントにさらに追記する、複数の提案を見る。

↓ この行をコメントに追記してみました。
`// 引数のでデフォルト値は100`

```fizzBuzz.ts
// 関数の名前:FizzBuzz問題
// 引数: 最大値
// 引数のでデフォルト値は100
// 返り値: なし
// 処理内容: 1から最大値までの数値をコンソールに出力する
//           ただし、3の倍数の時は数値の代わりに「Fizz」を、
//           5の倍数の時は「Buzz」を、
//           3の倍数かつ5の倍数の時は「FizzBuzz」を出力する
//           それ以外の場合は数値を出力する
function

```

`function`を入力した時点で **ctrl+Enter** を押してみます。
そうすると別ウィンドウが開き、複数の提案を見る事が出来ます。

提案を見るとコメントを読み込んでコードを書いてくれます。

```fizzBuzz.ts
// 関数の名前:FizzBuzz問題
// 引数: 最大値
// 引数のでデフォルト値は100
// 返り値: なし
// 処理内容: 1から最大値までの数値をコンソールに出力する
//           ただし、3の倍数の時は数値の代わりに「Fizz」を、
//           5の倍数の時は「Buzz」を、
//           3の倍数かつ5の倍数の時は「FizzBuzz」を出力する
//           それ以外の場合は数値を出力する
function fizzBuzz(max:number = 100):void {
  for (let i:number = 1; i <= max; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('FizzBuzz')
    } else if (i % 3 === 0) {
      console.log('Fizz')
    } else if (i % 5 === 0) {
      console.log('Buzz')
    } else {
      console.log(i)
    }
  }
}


```

↑ 複数の提案の中に引数のデフォルト値と型を書いたコードがありそれを選択肢してみました。このように、より詳細な情報を与えれば一段上の提案をしてくれます。

### 例 複数の提案を見る その 2

関数名を書かなくても、コメントから類推してコードを提案してくれます。

↓ このように SQL 文があったとします、コメントアウトしておきます。
そして`type User`と入力した時点で **Ctrl ＋ Enter** を押すと、別のウィンドウに幾つかの提案が表示されます。

```users.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type User

```

**Accept Solution** を押すとその提案が採用されます。

<details><summary>複数の提案が提示されます。(長いので折りたたみます)</summary>

```User.ts

Synthesizing 7/10 solutions

=======
Suggestion 1

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

// Path: posts.ts
// CREATE TABLE posts (
//   id INT PRIMARY KEY,
//   title VARCHAR(255) NOT NULL,
//   content TEXT NOT NULL,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
//   user_id INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};

// Path: comments.ts
// CREATE TABLE comments (
//   id INT PRIMARY KEY,
//   content TEXT NOT NULL,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
//   post_id INT NOT NULL,
//   user_id INT NOT NULL,
//   FOREIGN KEY (post_id) REFERENCES posts(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
type Comment = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  post_id: number;
  user_id: number;
};

// Path: likes.ts
// CREATE TABLE likes (
//   id INT PRIMARY KEY,
//   post_id INT NOT NULL,
//   user_id INT NOT NULL,
//   FOREIGN KEY (post_id) REFERENCES posts(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
type Like = {
  id: number;
  post_id: number;
  user_id: number;
};

// Path: views.ts
// CREATE TABLE views (
//   id INT PRIMARY KEY,
//   post_id INT NOT NULL,
//   user_id INT NOT NULL,
//   FOREIGN KEY (post_id) REFERENCES posts(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
type View = {
  id: number;
  post_id: number;
  user_id: number;
};

// Path: follows.ts
// CREATE TABLE follows (
//   id INT PRIMARY KEY,
//   user_id INT NOT NULL,
//   follower_id INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id),
//   FOREIGN KEY (follower_id) REFERENCES users(id)
// );
type Follow = {
  id: number;

=======
Suggestion 2

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export const selectUserByEmail = async (email: string): Promise<User> => {
  try {
    const result = await connection("users")
      .select("*")
      .where("email", "=", email);

    return result[0];
  } catch (error) {
    throw new Error(error.sqlMessage || error.message);
  }
};

=======
Suggestion 3

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export default User;

=======
Suggestion 4

type Users = {
  id: number;
  username: string;
  password: string;
  email: string;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
//

=======
Suggestion 5

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

// Path: userssssss.ts
// CREATE TABLE recipes (
//   id INT PRIMARY KEY,
//   title VARCHAR(50) NOT NULL,
//   user_id INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
type Recipe = {
  id: number;
  title: string;
  user_id: number;
};

// Path: userssssss.ts
// CREATE TABLE ingredients (
//   id INT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   recipe_id INT NOT NULL,
//   FOREIGN KEY (recipe_id) REFERENCES recipes(id)
// );
type Ingredient = {
  id: number;
  name: string;
  recipe_id: number;
};

// Path: userssssss.ts
// CREATE TABLE steps (
//   id INT PRIMARY KEY,
//   instruction VARCHAR(255) NOT NULL,
//   recipe_id INT NOT NULL,
//   FOREIGN KEY (recipe_id) REFERENCES recipes(id)
// );
type Step = {
  id: number;
  instruction: string;
  recipe_id: number;
};

// Path: userssssss.ts
// CREATE TABLE tags (
//   id INT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL
// );
type Tag = {
  id: number;
  name: string;
};

// Path: userssssss.ts
// CREATE TABLE recipe_tags (
//   id INT PRIMARY KEY,
//   recipe_id INT NOT NULL,
//   tag_id INT NOT NULL,
//   FOREIGN KEY (recipe_id) REFERENCES recipes(id),
//   FOREIGN KEY (tag_id) REFERENCES tags(id)
// );
type RecipeTag = {
  id: number;
  recipe_id: number;
  tag_id: number;
};

// Path: userssssss.ts
// CREATE TABLE comments (
//   id INT PRIMARY KEY,
//   content VARCHAR(255) NOT NULL,
//   user_id INT NOT NULL,
//   recipe_id INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id),
//   FOREIGN KEY (recipe_id) REFERENCES recipes(id)
// );
type Comment = {
  id: number;
  content: string;
  user_id: number;
  recipe_id: number;
};

// Path: userssssss.ts
// CREATE TABLE likes (
//   id INT PRIMARY KEY,
//   user_id INT

=======
Suggestion 6

type Userss = {
  id: number;
  username: string;
  password: string;
  email: string;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type UserssInsert = {
  username: string;
  password: string;
  email: string;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type UserssUpdate = {
  id: number;
  username: string;
  password: string;
  email: string;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type UserssDelete = {
  id: number;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type UserssSelect = {
  id: number;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type UserssSelectAll = {
  id: number;
};

// Path: userssssss.ts
// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
export class UserssRepository {
  private readonly tableName = "users";
  private readonly connection: mysql.Connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  // Path: userssssss.ts
  // INSERT INTO users (username, password, email) VALUES (?, ?, ?)
  async insert(userss: Users

=======
Suggestion 7

type User = {
    id: number,
    username: string,
    password: string,
    email: string
}

const users: User[] = [
    { id: 1, username: "admin", password: "123", email: "


```

</details>

**GitHub Copilot** の基本的な使い方は以上で終了です。
次は、VScode拡張機能である **GitHub Copilot Labs** の機能を紹介します。
この拡張機能を使うことで、**GitHub Copilot** の機能をより便利に使うことができます。

# GitHub Copilot Labs

## 公式サイト

GitHub Copilot Labs

GitHub Next | GitHub Copilot Labs
https://githubnext.com/projects/copilot-labs

## GitHub Copilot Labs の機能のまとめ

GitHub Copilot 公式の VSCode 拡張機能です。
※他のエディタにもそれぞれあるようです。（未確認）
GitHub Copilot の方が、Amazon CodeWhisperer よりも、便利だと感じるのはこのツールのおかげです。

## GitHub Copilot Labs の利用方法

二通りあります。

- 関数の上などに表示される Github Copilot ~~コマンドパレット~~ のアイコンボタンを押して利用します。
- VSCode の左サイドバーから **GitHub Copilot Labs**を開き、機能を選択します。

# ~~コマンドパレットから利用する方法~~

## アイコンの説明

![GitHub Copilotアイコン画像説明付き.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c59d6119-a693-a156-7f4b-65c57d9308d4.png)

## 一覧

- IDE Brushes: Suggest test
- IDE Brushes: Make this code more readable
- IDE Brushes: Add Types to this code
- IDE Brushes: Find a bug in this code
- IDE Brushes: Make this code easier to debug
- IDE Brushes: Clean up this code
- IDE Brushes: Document the steps of this code
- IDE Brushes: Make this code more robust
- IDE Brushes: Break this code into smaller chunks
- IDE Brushes: Document this code
- IDE Brushes: Use a custom brush

### IDE Brushes の説明

- IDE Brushes: Suggest test (テストを提案する)
  カーソルが関数上にある時に出現します、関数の引数や戻り値の型を推測し、テストコードを提案します。

- IDE Brushes: Make this code more readable（コードを読みやすくする）
  コードの可読性を高めるために、インデントや改行を追加し、コードブロックを整理する事ができます。

- IDE Brushes: Add Types to this code（コードに型を追加する）
  変数や関数の引数、戻り値に型を追加し、静的型付けを導入する事ができます。

- IDE Brushes: Find a bug in this code（コード内のバグを見つける）
  コードの解析を行い、可能なバグを検出する事ができます。

- IDE Brushes: Make this code easier to debug（コードをデバッグしやすくする）
  デバッグしやすいように、デバッグ情報を出力するコードや、条件分岐を追加するコードを挿入する事ができます。

- IDE Brushes: Clean up this code（コードをクリーンアップする）
  コードの冗長性を削除し、不要なコードを削除して、コードの品質を向上させます。

- IDE Brushes: Document the steps of this code（コードの手順をドキュメント化する）
  コードの動作を説明するコメントを追加し、コードの理解を容易にする事ができます。

- IDE Brushes: Make this code more robust（コードをより堅牢にする）
  エラーハンドリングコードを追加し、コードの品質を向上させます。

- IDE Brushes: Break this code into smaller chunks（コードをより小さな塊に分割する）
  大きな関数やクラスを小さな関数やクラスに分割する事で、コードをより管理しやすくする事ができます。

- IDE Brushes: Document this code（コードをドキュメント化する）
  コードの目的や動作を説明するコメントを追加する事で、コードの理解を容易にする事ができます。

- IDE Brushes: Use a custom brush（カスタムブラシを使用する）
  ユーザーが自分で定義したブラシを使用する事ができます。これにより、特定のプロジェクトに最適なブラシを作成する事ができます。

※ここでいうブラシとは GitHub Copilot の動作と結果の事です。



#### Find a bug in this codeとMake this code easier to debugの違いを教えて

どちらもコードのバグを検出する機能です。

前者がコードにバグがある場合にそれを特定することを目的としているのに対し、後者はコードをデバッグしやすくすることを目的としている点です。

「Find a bug in this code」は、コードにバグがある場合にそれを特定するために使用されます。これは、コードが期待どおりに動作しない場合に役立ちます。例えば、変数が正しく設定されていない、関数が正しく呼び出されていない、条件分岐が誤っているなどの問題を特定することができます。

「Make this code easier to debug」は、コードをデバッグしやすくするために使用されます。これは、コードが期待どおりに動作している場合でも、将来的に問題が発生する可能性があるため、コードをデバッグしやすくすることが重要である場合に役立ちます。例えば、変数や関数に意味のある名前を付ける、コメントを追加する、デバッグ用のログを出力するなどの方法があります。

どちらの機能も、コードの品質を向上させるために非常に役立ちます。どちらを使用するかは、コードの問題によって異なります。


#### Document the steps of this codeとDocument this codeの違いを教えて

どちらもコードを説明する機能です。

前者がコードの手順を文書化することを目的としているのに対し、後者はコード自体を文書化することを目的としている点です。

「Document the steps of this code」は、コードの手順を文書化するために使用されます。これは、コードが何をしているかを理解するのに役立ちます。例えば、関数がどのように動作するか、変数がどのように設定されるかなどを説明することができます。

「Document this code」は、コード自体を文書化するために使用されます。これは、コードの目的や機能、変数や関数の説明などを提供することができます。これにより、コードを読む人がコードの意図を理解しやすくなります。

どちらの機能も、コードの読みやすさを向上させるために非常に役立ちます。どちらを使用するかは、文書化する内容によって異なります。



### Github Copilot ~~コマンドパレット~~ の詳細な説明

#### Suggest test （~~コマンドパレット~~の一番左）

機能: コードからテストコードを生成します。

※この関数は次の項目の「Make this code more readable」と「Add Types to this code」で修正された関数です。

```addNumbers.ts
function addNumbers(num1: number, num2: number): number {
  // 足し算の結果を返す
  return num1 + num2
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Suggest test** をクリックします。

左サイドバーが開き **TEST GENERATION** プルダウンメニューが開きます。

Detected Function で選択された関数がわかります。

**Suggest a new test** を押します。

↓ このようにテストコードが生成されました。

```addNumbers.test.ts
describe('test auth13', function() {
    it('test auth13.addNumbers', function(done) {
        // console.log('test auth13.addNumbers');
        let result = auth13.addNumbers(10, 20);
        assert.equal(result, 30);
        done();
    })
})

```

**Run this test**ボタンを押すとテストが実行されます。
(プロジェクト or グローバルなテスト実行環境が必要です、無いと Error running test エラーが出力されます。)

#### Make this code more readable の使い方

機能: コードをより読みやすくします。

↓ このよう読みにくい関数があったとします、
関数名は単語にもなっていなくて、引数も戻り値も何を返すのかわかりません。
**GitHub Copilot** はこの関数を読みやすくしてくれます。

```aaa.ts
function aaa(bbb,ccc){
  // 足し算の結果を返す
  return bbb + ccc}

```

やり方は、関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Make this code more readable** をクリックします。
（スマイルアイコン これは **Suggest test** の左隣りにあります。）

↓ 今回は、このように修正されました。

```addNumbers.ts
function addNumbers(num1, num2) {
  // 足し算の結果を返す
  return num1 + num2
}

```

↑ 関数名はコメントを参考に命名されています。
引数も数値を 2 つ返す事が第三者にもわかります。

ついでに、`addNumbers.ts` とファイル名を変えておきました。（これは手動で変えました）

#### Add Types to this code の使い方

機能: 型を追加します。

↓ この関数は、一つ上の項目の Make this code more readable の使い方で得られた関数を利用しています。

```addNumbers.ts
function addNumbers(num1: number, num2: number): number {
  // 足し算の結果を返す
  return num1 + num2
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Add Types to this code** をクリックします。
（スマイルアイコンの左隣り）

```addNumbers.ts
function addNumbers(num1: number, num2: number): number {
  // 足し算の結果を返す
  return num1 + num2
}

```

↑ このように型が追加されました。

#### Find a bug in this code の使い方

機能: バグを見つけます。（虫のアイコン）

ファイル名、関数名どちらも sum(合計)なのに結果が掛け算になっています。これを修正してもらいます。

```sum.js
function sum(a, b) {
  return a * b;
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Find a bug in this code** をクリックします。

```sum.js
function sum(a, b) {
  return a + b;
}

```

↑ このように修正されました。

#### Make this code easier to debug の使い方

機能: デバッグをしやすくします。 （虫とコード実行のアイコン）

```sum.js
function sum(a, b) {
  return a + b;
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Make this code easier to debug** をクリックします。

```sum.js
function sum(a, b) {
  console.log('sum ' + a + ' ' + b);
  return a + b;
}

```

↑ このように console.log が追加されるので、デバッグしやすくなります。

#### Clean up this code の使い方

機能: コードをきれいにします。（ゴミ箱のアイコン）

例えば、一つ上の **Make this code easier to debug** で追加された`console.log`は本来の関数には不要なので削除してもらいます。

使用例

```sum.js
function sum(a, b) {
  console.log('sum ' + a + ' ' + b);
  return a + b;
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Clean up this code** をクリックします。

```sum.js
function sum(a, b) {
  return a + b;
}

```

↑ このように `console.log` が削除されています。

#### Document the steps of this code の使い方

機能: コードの手順をドキュメント化します。(リストのアイコン)

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Document the steps of this code** をクリックします。

```sum.js
// Define a function named sum that takes two parameters named a and b.
function sum(a, b) {
  // Return the sum of a and b.
  return a + b;
}

```

↑ このようにコメントが追加されます。

不要になったら **Clean up this code** (ゴミ箱のアイコン)で削除してください。

#### Make this code more robust の使い方

機能: 例外処理を追加します。（セキュリティガードのアイコン）

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Make this code more robust** をクリックします。

```sum.js
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Expected two numbers as arguments');
  }
  return a + b;
}

```

↑ このように例外処理が追加されます。

コードのよってどのように処理されるかはそのコード次第です。

#### Break this code into smaller chunks の使い方

機能: コードを小さな塊に分割します。（円グラフを分割するアイコン）

```calc.js
// 関数名:掛け算と足し算
// 引数:数字を2個
// 出力:足し算の結果と掛け算の結果を同時に出力する。
// 処理1:足し算を実行する
// 処理2:掛け算を実行する
// 処理3:足し算と掛け算の結果を出力する
function

```

↑ この状態から提案をしてもらいます。

```calc.js
// 関数名:掛け算と足し算
// 引数:数字を2個
// 出力:足し算の結果と掛け算の結果を同時に出力する。
// 処理1:足し算を実行する
// 処理2:掛け算を実行する
// 処理3:足し算と掛け算の結果を出力する
function calc(num1, num2) {
    var result1 = num1 + num2;
    var result2 = num1 * num2;
    console.log(result1, result2);
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Break this code into smaller chunks** をクリックします。

```calc.js
// 関数名:掛け算と足し算
// 引数:数字を2個
// 出力:足し算の結果と掛け算の結果を同時に出力する。
// 処理1:足し算を実行する
// 処理2:掛け算を実行する
// 処理3:足し算と掛け算の結果を出力する
function add(num1, num2) {
    return num1 + num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function calc(num1, num2) {
    console.log(add(num1, num2), multiply(num1, num2));
}

```

↑ このように関数が分割されていきます。

#### Document this code の使い方

機能: コードに JSDoc を追加します。（本のアイコン）

サンプルが Javascript の場合ですので JSDoc が追加されています。
JSDoc 以外にもその言語にあったドキュメントを追加してくれます。

```sum.js
function sum(a, b) {
  return a + b;
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Document this code** をクリックします。

```sum.js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}

```

↑ このように JSDoc が追加されていきます。（いろんなパターンがあります。）

他のパターン

通常のコメントで追加されています。

```sum.js
// This function returns the sum of two numbers.
function sum(a, b) {
    return a + b;
  }

```

#### Use a Custom brush の使い方

この機能は、標準で提供されている機能で満足していない場合、**Use a Custom brush** という機能を使う事で、自分でカスタマイズした機能を使う事が出来ます。

### 例 Use a Custom brush の使い方 その 1

↓ 例えば、足し算のつもりなのに掛け算の結果を返す関数があったとします。

```sum.js
function sum(a, b) {
  return a * b;
}

```

関数の{}内にカーソルを持ってきて、GitHub Copilot パレットの中から **Use a Custom brush** をクリックします。
（一番右端にあるアイコン）

入力を促されるウィンドウが開くので
「足し算をする」と入力します。（日本語で ok！）

そうすると ↓ のように関数が修正されます。

```sum.js
function sum(a, b) {
  return a + b;
}

```

### 例 Use a Custom brush の使い方 その 2

ColorButton というコンポーネントがあったとします。
（コードにあった拡張子である必要があります。）

```tailwindcss.tsx
export const ColorButton = () => {
  return <button>色のボタン</button>
}

```

TailwindCSS のクラスを追加して暖色系に装飾してみたいとします。

関数全体を範囲選択します。
**Use a custom brush**をクリックします。（一番右端にあるアイコン）

入力を促されるウィンドウが開くので
「TailwindCSS で暖色系に装飾してください。」と入力します。（日本語で ok！）

```tailwindcss.tsx
export const ColorButton = () => {
  return <button className="bg-yellow-300">キャンセル</button>
}

```

↑ このように暖色系の className が追加されます。

(className は TailwindCSS のクラス名です。)

※このようにユーザーの任意の機能を独自に作成する事が出来ます。
もっと細かく指示を与えれば複雑な命令も可能です。

# VSCode の左サイドバーから GitHub Copilot Labs を開き、機能を利用する

## 実際に使用してみる

新しいファイルを用意します、拡張子は使用する言語にしておきます。
既存のファイルでも大丈夫です。

左サイドバーにある Copilot アイコンを押します。
そうすると左サイドバーの隣にウィンドウが開きます。

- EXPLAIN コードの解説をおこなう。
  これは事前に用意されているコメントを使用して GitHub Copilot を利用します。

- LANGUAGE TRANSLATION 言語の変換
  例：JavaScript のコードを Python へ変換

- BRUSHES アイコンをクリックする事で各種機能が使用できる。
  これは GitHub Copilot ~~コマンドパレット~~の左サイドバー版です。

- TEST GENERATION コードに対してテストコードを作る。
  一つの関数からテストコードを作成、実行が出来るようになります。

## 各機能の説明

### EXPLAIN

コードの解説を行う機能です。

↓ のような関数があった場合

```sum.js
function sum(a, b) {
  return a + b
}

```

関数の部分を範囲選択します。
(範囲選択をする事で、左サイドバーに選ばれた関数が表示されます。)

VSCode の左サイドバーにある Copilot アイコンを押します。
**EXPLAIN** メニューを開きます。

選択した関数の下にプルダウンメニューで 5 つの選択肢が選べます。
(内容はファイルタイプに依存したコメントアウト記法で記述されたコメントになります。)

### 選択できるメニュー

- Custom
- Explain code
- code does following
- code does following (English)
- Show example code

#### Custom を選択した場合

Custom を選択した場合は、自分でカスタマイズした機能を使用する事が出来ます。

左サイドバーの GitHub Copilot Labs を開きます。
Explain code を選択します。
Advanced を開きます。
Prompt に自分のコメントを入力します。
コメントは正確なほど正しい結果を得られます。

↓undefined の部分にコメントを入力します。
このコメントは、コードの解説を行うコメントになります。

Prompt

```Prompt.ts
undefined

```

Stops

```Stops.ts
*/
```

コードの解説を行うコメントを追加する事で正確な結果が出力されます。

今回は、Prompt 部分にコメントを書き込む事になります。

Prompt

```Prompt
引き算に書き直してください。

```

と入力してみます。（日本語で ok！）

**Ask Copilot**を押します。
そうすると

RESULT に以下のように表示されます。

RESULT

<details><summary>複数の提案が提示されます。(長いので折りたたみます)</summary>

```RESULT.ts
引き算に書き直してください。 // Language: typescript
function sub(a, b) {
  return a - b
}


割り算に書き直してください。

// Language: typescript
function div(a, b) {
  return a / b
}


掛け算に書き直してください。

// Language: typescript
function mul(a, b) {
  return a * b
}


大きい方を返す関数を書いてください。

// Language: typescript
function max(a, b) {
  return a > b ? a : b
}


小さい方を返す関数を書いてください。

// Language: typescript
function min(a, b) {
  return a < b ? a : b
}


2つの引数の和を返す関数を書いてください。

// Language: typescript
function sum(a, b) {
  return a + b
}


2つの引数の差を返す関数を書いてください。

// Language: typescript
function sub(a, b) {
  return a - b
}


2つの引数の商を返す関数を書いてください。

// Language: typescript
function div(a, b) {
  return a / b
}


2つの引数の積を返す関数を書いてください。

// Language: typescript
function mul(a, b) {
  return a * b
}


2つの引数のうち、大きい方を返す関数を書いてください。

// Language: typescript
function max(a, b) {
  return a > b ? a : b
}


2つの引数のうち、小さい方を返す関数を書いてください。

// Language: typescript
function min(a, b) {
  return a < b ? a : b
}


// Language: typescript
function sum(a, b) {
  return a + b
}


// Language: typescript
function sub(a, b) {
  return a - b
}


// Language: typescript
function div(a, b) {
  return a / b
}


// Language: typescript
function mul(a, b) {
  return a * b
}


// Language: typescript
function max(a, b) {
  return a > b ? a : b
}


// Language: typescript
function min(a, b) {
  return a < b ? a : b
}


// Language: typescript
function sum(a, b) { */

```

↑ 今回は、このような結果が得られました。

</details>

#### Explain code を選択した場合

選択したコードに対して、
コードの解説を行うコメントを追加する事で、コードの理解を容易にする事ができます。

設定されているコメントは以下のようになっています。

Prompt

```Prompt.ts
/* Here is the explanation for the code above:
1.

```

訳
以下、上記コードの説明です。

**Ask Copilot**を押します。
RESULT に以下のように表示されます。

RESULT

```RESULT.ts
/* Here is the explanation for the code above:
1. The function sum is declared with two parameters: a and b.
2. The function sum returns the sum of its parameters.
3. Variables are declared with the var keyword. Here we declare the variable a and b.
4. The var keyword is used to declare variables that will be scoped to the current function.
5. The variable a is assigned the value 10.
6. The variable b is assigned the value 20.
7. The function sum is called with the arguments 10 and 20.
8. The function returns the value 30.
9. The statement is terminated with a semicolon (;). */

```

#### code does following を選択した場合

選択したコードに対して、
コードの動作を説明するコメントを追加する事で、コードの理解を容易にする事ができます。

設定されているコメントは以下のようになっています。

Prompt

```Prompt.ts
/* The code above does the following:
1.

```

訳
このコードを以下のようにします。

**Ask Copilot**を押します。
RESULT に以下のように表示されます。

RESULT

```RESULT.ts
RESULT
/* The code above does the following:
1. Defines a function called sum that takes two arguments a and b.
2. The arguments a and b are both of type number.
3. The function returns a value of type number, which is the sum of a and b. */

```

#### code does following (English)を選択した場合

選択したコードに対して、
コードの動作を説明するコメントを追加する事で、コードの理解を容易にする事ができます。

設定されているコメントは以下のようになっています。

Prompt

```Prompt.ts
/* The code above does the following, explained in English:
1.

```

訳
このコードは、英語で説明すると次のようになります。

**Ask Copilot**を押します。
RESULT に以下のように表示されます。

RESULT

```RESULT.ts
RESULT
/* The code above does the following, explained in English:
1. We declare a function called sum that takes two parameters, a and b.
2. The function returns the sum of a and b. */

```

#### Show example code を選択した場合

選択したコードに対して、実際にコードの使い方を見せてくれます。

設定されているコメントは以下のようになっています。

Prompt

```Prompt.ts
/* This is an example for calling this function:

```

訳
この関数を呼び出す場合の例です。

**Ask Copilot**を押します。
RESULT に以下のように表示されます。

RESULT

```RESULT.ts
RESULT
/* This is an example for calling this function: import { sum } from './sum';

console.log(sum(1, 2));
// => 3 */

```

↑ のように使い方を教えてくれます。
import の仕方まで教えてくれています。

:::note info
ここまで説明を読んでくれた方は、左サイドバーの **GitHub Copilot Labs の EXPLAIN** は単なるコメントだと理解してもらえたはずです。

このように **GitHub Copilot** の肝はコメントです、正確で多くの情報を書きましょう。
コメントをどのように書くかでどれだけ深く柔軟に使えるかが決まります。
アプリを作るにあたって設計などの事前準備が大変重要です。

:::

かと言ってコメントを多く書いても AI はまだまだ発展途上なので、どの程度の情報量を書き込むかは開発者に依存しています、各個人がバランスを取って最適な情報量を探ってみてください。
また、**GitHub Copilot**は製作者の意図を汲み取ってくれるわけではありません。GPT-4,5,6 に期待しましょう。
TAB キーを押すだけのようなプログラミングで終わるツールではありません。

閑話休題

### Advanced から日本語化する

例えば、`code does following (English)` を選択した場合のように
`in English` を付けた事ですべての言語を英語で出力するよう指示しています。

そこで、ここを `in Japanese` に書き換えてみます。

※ただし固定の項目
Explain code
code does following
code does following (English)
Show example code
これらの **Advanced** を変更すると、どれも **Custom** 項目に強制敵に変更されます。
なのでこれは実質 **Custom** の利用方法になリます。

## 実際に動かしてみる

↓ 関数を範囲選択します。

```fizzBuzz.ts
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
function fizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz"
  } else if (num % 3 === 0) {
    return "Fizz"
  } else if (num % 5 === 0) {
    return "Buzz"
  } else {
    return num
  }
}

```

Explain Code を選び、
↓Advanced の Prompt を変更します。

Prompt

```Prompt.ts
/* Here is the explanation for the code above in Japanese:
1.

```

と `in Japanese` と追記します。

そうしてから **Ask Copilot** ボタンを押すと、

RESULT

```RESULT.ts
RESULT
/* Here is the explanation for the code above in Japanese:
1. まず、`if`文で3と5の倍数の条件を先に書いてしまうと、3の倍数も5の倍数も同時に満たす場合にFizzBuzzとなりません。
2. そこで、3と5の倍数の条件を先に書くと、3の倍数の場合は`else if`以下の処理はスキップされるので、3の倍数を判定できます。
3. この時点で5の倍数の場合は、3と5の倍数の条件を満たすため、`else if`以下の処理はスキップされます。
4. この時点で5の倍数でない場合は、3の倍数ではないため、`else`以下の処理が実行されます。 */

```

※この機能はまだ不完全で、いろいろな不具合が一番出やすいです機能です。

- 同じ行が続く
- 意味不明な説明になっている。
  等の不具合をよく見かけます。たぶん正確な情報を与える事が出来てないからだと思いますが・・。

### LANGUAGE TRANSLATION

機能: 現在のコードを他言語へ変換してくれます。

↓ このような関数があったとします。
関数全体を範囲選択します。

```fizzBuzz.ts
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
function fizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz"
  } else if (num % 3 === 0) {
    return "Fizz"
  } else if (num % 5 === 0) {
    return "Buzz"
  } else {
    return num
  }
}

```

左サイドバーの `GitHub Copilot Labs` を開きます。

`Translate code into` で変換後の言語を選択します。
(今回は Python を選択します。)

**Ask Copilot** を押します。

```fizzBuzz.py
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
def fizzBuzz(num):
  if num % 3 == 0 and num % 5 == 0:
    return "FizzBuzz"
  elif num % 3 == 0:
    return "Fizz"
  elif num % 5 == 0:
    return "Buzz"
  else:
    return num

```

↑ このように無事 Python に変換されました。

### BRUSHES

機能: 関数の上に表示される GitHub Copilot ~~コマンドパレット~~ の左サイドバー版です。
機能はまったく同じです。

詳しくは、[~~コマンドパレット~~から利用する方法](#コマンドパレットから利用する方法)を見てください。

### TEST GENERATION

機能: テストコードを生成してくれます。

作成したテストを実行するためにはグローバルか、開発中のアプリにテストフレームワークをインストールしておく必要があります。

#### テストコードを生成する

`Suggest a new test`
新しいテストの提案

`Run this test`
テストを実行する

### 例 テストコードを生成する

テストコードを書きたいコードを範囲選択します。
VSCode の左サイドバー GitHUb Copilot パレットの中から **Write a test for this code** をクリックします。

左サイドバーの **TEST GENERATION** で関数が選ばれている(Detected Function)のがわかります。

```sum.js
function sum(a, b) {
  return a + b
}

```

`Suggested Test` の中からテストコードが選ばれているのがわかります。
複数の関数が選ばれている場合は、範囲選択をやり直すよう促されます。

`Suggest Test` をクリックしてしばらく待つと、テストコードが追加されます。
右上のコピーアイコンを使ってコピーします。

```sum.test.js
describe('test sum', function() {
    it('test sum', function(done) {
        assert.equal(sum(1, 2), 3);
        done();
    })
})

```

`Run Test` をクリックするとテストが実行されます。
(プロジェクト or グローバルなテスト実行環境が必要です。
実行環境が無いと `Error running test` というエラーが出力されます。)

# キーボードショートカットキー

独自に設定したキーボードショートカットキーです。
Windows の VSCode の設定です。
VSCode の左下の歯車アイコンをクリックして設定を開きます。

## インライン候補をトリガーするキーボードショートカットキーの設定

- インライン候補をトリガーする。

※ インライン候補をトリガーするとは提案が表示される場所ならばどこでも **GitHub Copilot** が動きます。
例えば、提案が表示される場所からカーソルが動かしてしまっても、カーソルを元の場所に戻してトリガーコマンドを使うと提案が表示されます。

※ インライン候補をトリガーするはデフォルトのキー設定では動きません。：Windows で確認
自分でキーボードショートカットキーを設定する必要があります。（これは自分の環境だけかもしれません。）

- サイドバーの表示・非表示を切り替える。

**Github Copilot Labs** の色々な機能を使うためには、サイドバーを表示する必要があるため設定したキーボードショートカットキーです。

```keybindings.json

// 一部抜粋
{
  // インライン候補をトリガーする Github Copilot
  "key": "alt+/",
  "command": "editor.action.inlineSuggest.trigger",
  "when": "config.github.copilot.inlineSuggest.enable && editorTextFocus && !editorHasSelection && !inlineSuggestionsVisible"
},
{
  // サイドバーの表示・非表示を切り替える
  "key": "ctrl+shift+a",
  "command": "workbench.action.toggleSidebarVisibility"
},

```

※ **"key"** の設定は好きなショートカットキーに変更してください。

## 単語単位の提案のキーボードショートカットキーの設定

```keybindings.json

// 一部抜粋
{
  // 単語単位:インライン提案の次の単語を承諾する Github Copilot
  "key": "ctrl+right",
  "command": "editor.action.inlineSuggest.acceptNextWord",
  "when": "inlineSuggestionVisible && !editorReadonly"
},
{
  // 前回のコマンドをやり直す
  "key": "ctrl+b",
  "command": "default:undo"
},



```

## 自分のキーボードショートカット設定

```keybindings.json
{
  // インライン候補をトリガーする Github Copilot
  "key": "ctrl+m",
  "command": "editor.action.inlineSuggest.trigger",
  "when": "config.github.copilot.inlineSuggest.enable && editorTextFocus && !editorHasSelection && !inlineSuggestionsVisible"
},
{
  // 単語単位:インライン提案の次の単語を承諾する Github Copilot
  "key": "ctrl+n",
  "command": "editor.action.inlineSuggest.acceptNextWord",
  "when": "inlineSuggestionVisible && !editorReadonly"
},
{
  // 前回のコマンドをやり直す
  "key": "ctrl+b",
  "command": "default:undo"
},



```

### 自分の設定例

※ Ctrl+mで提案を表示する。
※ Ctrl+nで単語単位で一つ受け入れる。
※ Ctrl+bで単語単位で一つ戻る。

※ インライン候補のトリガーをctrl+mに設定しています。
※ 単語単位の提案のキーボードショートカットキーはctrl+nに設定しています。
※ 単語単位の提案を元に戻す設定はctrl+bに設定しています。

default:undoの設定にはシステムでは未設定です。
※ **"key"** の設定は好きなショートカットキーに変更してください。



# ネットで拾ったテクニック Tips

使えるかどうかは個人の感想レベルの話であって、公式情報ではありません。

## 翻訳

V さんは Twitter を使っています: 「GitHub Copilot でコメント機能を使った q: と a: 機能スゴイ。」 / Twitter

https://twitter.com/voluntas/status/1647224026492813312

### 例1 翻訳をしてもらう

↓ このように英語のコメントがあったとします。

```middleware.js

/**
 * Any Server Component route that uses a Supabase client must be added to this
 * middleware's `matcher` array. Without this, the Server Component may try to make a
 * request to Supabase with an expired `access_token`.
 */

```

↓ 翻訳したい文章の先頭に en:とつけます。
そして、新たにコメントで // ja: と追記します。そうすると・・

```middleware.js
/**
 * en:Any Server Component route that uses a Supabase client must be added to this
 * middleware's `matcher` array. Without this, the Server Component may try to make a
 * request to Supabase with an expired `access_token`.
 */

// ja:

```

※ja:やjp:などどちらでも大丈夫です。

jp:と 「:」記号まで付けてください。

↓ このように日本語の翻訳が追加されます。

```middleware.js
/**
 * en:Any Server Component route that uses a Supabase client must be added to this
 * middleware's `matcher` array. Without this, the Server Component may try to make a
 * request to Supabase with an expired `access_token`.
 */

// jp:Supabaseクライアントを使用するすべてのServer Componentルートは、この
// jp:ミドルウェアの`matcher`配列に追加する必要があります。これがないと、Server Componentは
// jp:期限切れの`access_token`でSupabaseにリクエストしようとする可能性があります。

```

### 例2 翻訳をしてもらう
短いコメントの場合

```middleware.js
// Use withAuth to add the middleware to your custom API route.
// ja:

```

↑英文コメントの下に`// ja: `とコメントで追記するだけで↓翻訳してくれます。

```middleware.js
// Use withAuth to add the middleware to your custom API route.
// ja: withAuthを使用して、ミドルウェアをカスタムAPIルートに追加します。

```

※短い英文の場合は、「en:」を省略できます。
`// ja:` だけを書いてからトリガーすると翻訳してくれます。

```Server-Side Rendering.md
Single-page apps with server-side rendering (SSR) is a popular way to optimize rendering performance and leverage advanced caching strategies.
ja: サーバーサイドレンダリングを使用すると、レンダリングパフォーマンスを最適化し、高度なキャッシュ戦略を活用できます。

Supabase Auth supports server-side rendering when you need access to user information, or your server needs to authorize API requests on behalf of your user to render content.
ja:
When a user authenticates with Supabase Auth, two pieces of information are issued by the server:

```

↑ 2個目まではja:を書いてからトリガーすると翻訳してくれます。


```Server-Side Rendering.md
Single-page apps with server-side rendering (SSR) is a popular way to optimize rendering performance and leverage advanced caching strategies.
ja: サーバーサイドレンダリングを使用すると、レンダリングパフォーマンスを最適化し、高度なキャッシュ戦略を活用できます。


Supabase Auth supports server-side rendering when you need access to user information, or your server needs to authorize API requests on behalf of your user to render content.
ja: Supabase Authは、ユーザー情報にアクセスする必要がある場合や、サーバーがユーザーの代わりにAPIリクエストを承認してコンテンツをレンダリングする必要がある場合に、サーバーサイドレンダリングをサポートしています。

When a user authenticates with Supabase Auth, two pieces of information are issued by the server:
ja: ユーザーがSupabase Authで認証すると、サーバーから2つの情報が発行されます。

```

2個目まではja:を書くことで翻訳してくれました。
さらに、3個目の英文はja:を書かなくても英文の下にカーソルを持っていき提案キーを押すだけで翻訳してくれました。
どうやらGitHub Copilot chatが学習してくれたようです。おまけに翻訳時に空行まで付けてくれました。



## 例3 READ.MEファイルを翻訳をしてもらう

普通に翻訳をしてくださいというだけでは上手く翻訳してくれない場合があります。
READ.MEを用意して

`readme.mdを日本語に翻訳してください`

とするだけで、きれいに翻訳してくれます。

またGitHub Copilot chatウィンドウの右クリックメニューでコピーを選択すると
markdownファイル形式でコピーができます。



## 説明を書いてもらう

### 例 説明を書いてもらう

↓ 例えばこのようなコードがあったとします。

```react.tsx
import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()


```

↓ ファイルの先頭にこのようなコメントを追記します。

```react.tsx
// q:このコードの説明を書く
// a:

```

↓ このようにソースコードの先頭にコメントを記入します。

```react.tsx
// q:このコードの説明を書く
// a:

import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()

```

↓ 後はタブキーを押していくだけで、コードのように説明文が提案されていきます。
提案が表示されなくなるまで続けていくとこんな感じになります。

```react.tsx
// q:このコードの説明を書く
// a:Reactのルートコンポーネント
// a:StrictModeは、開発モードでのみ有効になる
// a:Appコンポーネントをレンダリングする
// a:reportWebVitalsは、パフォーマンスを計測するための関数
// a:containerは、DOMの要素を指定する
// a:rootは、containerを指定して、Reactのルートを作成する
// a:root.renderは、Reactのルートにコンポーネントをレンダリングする
// a:StrictModeは、開発モードでのみ有効になる
// a:Appコンポーネントをレンダリングする
// a:reportWebVitalsは、パフォーマンスを計測するための関数

import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()

```

## やっぱり英語

日本語でコメントを書くよりも
作りたいものを日本語で DeepL 翻訳にかけて英語にして
コメントに貼り付けてからコードを提案してもらったほうがいいかも・・・
（未確認情報）

## ピンポイントでのデバック

**Github Copilot Labs** の **Find a bug in this code** でもいいですが、

ピンポイントでデバックしたい時
`// デバック表示` とコメントを書くと、その箇所に適したデバックコードを提案してくれます。
どんなデバックコードを書いたら良いか等の考える手間が省けます。

※デバックするコードを挿入する場所や、提案されたデバックコードが適切かどうかは人間が判断する必要があります。

### 例 ピンポイントでのデバック

↓ `// デバック表示` を 4 行目に挿入してみます。
そうすると
`console.log("num = " + num)`を提案してくれました

```fizzBuzz.js
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
function fizzBuzz(num) {
  // デバック表示
  console.log("num = " + num)
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz"
  } else if (num % 3 === 0) {
    return "Fizz"
  } else if (num % 5 === 0) {
    return "Buzz"
  } else {
    return num
  }
}

```

## Json からのオブジェクトを作成

Json データをコメントとして貼り付けるだけで提案をしてくれます。

↓ 貼り付けた Json データ

```test01.json
// [
//     {"id" : "1", "name" : "masakinihirota"},
//     {"id" : "2", "name" : "VNS.BLUE"}
//   ]
// オブジェクトを作成

```

### 例 1 オブジェクトを作成

```
// [
//     {"id" : "1", "name" : "masakinihirota"},
//     {"id" : "2", "name" : "VNS.BLUE"}
//   ]
// オブジェクトを作成
var obj = [
  { id: "1", name: "masakinihirota" },
  { id: "2", name: "VNS.BLUE" },
]
// JSONに変換
var json = JSON.stringify(obj)
// JSONを表示
console.log(json)
// JSONをオブジェクトに変換
var obj2 = JSON.parse(json)
// オブジェクトを表示
console.log(obj2)
// オブジェクトの要素を表示
console.log(obj2[0].id)
console.log(obj2[0].name)
console.log(obj2[1].id)
console.log(obj2[1].name)

```

### 例 2 オブジェクトを作成 まとめて提案

↓ まとめて提案を表示させて **_Ctrl+Enter キー_** その中から選びます。

```test01.json
// [
//     {"id" : "1", "name" : "masakinihirota"},
//     {"id" : "2", "name" : "VNS.BLUE"}
//   ]
// オブジェクトを作成
let obj = {
  id: "1",
  name: "masakinihirota",
}
let obj2 = {
  id: "2",
  name: "VNS.BLUE",
}
// 配列を作成
let arr = [obj, obj2]
// JSON文字列に変換
let json = JSON.stringify(arr)
// JSONを表示
console.log(json)
// Path: test02.ts
// [
//     {"id" : "1", "name" : "masakinihirota"},
//     {"id" : "2", "name" : "VNS.BLUE"}
//   ]
// JSON文字列を作成
let json = '[{"id" : "1", "name" : "masakinihirota"},{"id" : "2", "name" : "VNS.BLUE"}]'
// JSONをオブジェクトに変換
let arr = JSON.parse(json)
// オブジェクトを表示
console.log(arr)
// Path: test03.ts
// [
//     {"id" : "1", "name" : "masakinihirota"},
//     {"id" : "2", "name" : "VNS.BLUE"}
//   ]


```

※拡張子は`.json`なのに Javascript で提案されいます。
これは周りのコードが Javascript ファイルだったからだと思います。

※重複した提案は削除しています。

## 関数のリファクタリング

リファクタリングをしたい関数の下に
`// [関数名]をリファクタリングしてください` とコメントを書くと
リファクタリングを提案してくれます。

### 例 関数のリファクタリング

↓ このコードの上側の関数はすでに作成済みの関数です。
この関数をリファクタリングしたいとします。

関数の下にスペースを開けてリファクタリングしたい関数の名前を書きます。
`// fizzBuzzをリファクタリングしてください。` とコメントを書くと

```fizzBuzz.js
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
function fizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz"
  } else if (num % 3 === 0) {
    return "Fizz"
  } else if (num % 5 === 0) {
    return "Buzz"
  } else {
    return num
  }
}



// fizzBuzzをリファクタリングしてください。
// Fizz を7の倍数 Buzzを11の倍数
function

```

↑ このコードの下側の関数は コメントから **function** までを手動で入力しています。

```fizzBuzz.js
// fizzBuzz問題を解く
// 3の倍数ならFizz、5の倍数ならBuzz、3と5の倍数ならFizzBuzzを返す
function fizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz"
  } else if (num % 3 === 0) {
    return "Fizz"
  } else if (num % 5 === 0) {
    return "Buzz"
  } else {
    return num
  }
}



// fizzBuzzをリファクタリングしてください。
// Fizz を7の倍数 Buzzを11の倍数
function fizzBuzz(num) {
  if (num % 7 === 0 && num % 11 === 0) {
    return "FizzBuzz"
  } else if (num % 7 === 0) {
    return "Fizz"
  } else if (num % 11 === 0) {
    return "Buzz"
  } else {
    return num
  }
}

```

↑ リファクタリングなので当然同じ関数名で提案が表示されます。
出来上がったら（関数名が同じでなので）上側の関数を削除してください。

※ちょっと例が悪いですね。


## 型ファイルをピン止め

VSCodeにはピン止めという機能があります。
ピン止めすると、VSCodeを閉じても再度開いた時にピン止めしたファイルは開いた状態になります。

### typescript.d.ts の型定義ファイルをピン止めめのやり方
開いたファイルのタブを右クリックして、ピン止めを選択します。

[VSCode で使ってるライブラリの .d.ts をピン止めしてコードを書くと、今までとは比較にならないぐらい補完精度が爆上がりして便利だ...](https://twitter.com/mizchi/status/1658045044811792394?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1658045044811792394%7Ctwgr%5E5453708b72c04511186a13a5c77c7b92d9ecdc6c%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fembed.zenn.studio%2Ftweetzenn-embedded__e6edb053f1ebd)


## 設計書をファイルにしてピン止め

設計書をピン止めしておくと、GitHub Copilot chatが設計書を見ながらコードの提案をしてくれます。

私はMarkdownファイルを使用して書いており、項目を開いておくとカーソルがあるその範囲内の項目上下数行分が優先的に考慮され、提案されます。

GitHub Copilot chatに聞く際は、余分なファイルを閉じておくと提案の精度が上がります。


## Github Copilot が見ている範囲

### GitHub 公認トレーナー 岩永先生の講座を聞いてみた

#### 発表資料

https://speakerdeck.com/dzeyelid/tech-street-catch-up-on-github-latest-updates-202306

#### What's 岩永先生？

> フリーランス/ZEN Architects 所属
> Microsoft MVP for Azure, GitHub 公認トレーナー
> 業務では Microsoft Azure や GitHub の技術アドバイザリやワークショップの講師を担当。
> Twitter:@dz\_

質問: GitHub Copilot で扱われるデータは？
答え: User Engagement Data、提案の採用／却下等のアクション、メトリックやエラーなど一般的な使用状況
Prompts、入力している内容、カーソルの前後のコードやコメント、開いているタブの内容

質問: Github Copilot が見ている範囲は？
答え: エディターで開いているタブすべてが監視下にあります。

しかし、たとえ監視下の範囲でもそこには色々と優先順位があります。
より精度の良い提案をしてもらうためには、関連するファイルをそれぞれ開いておくと良いでしょう。
逆に関係のないファイルは閉じておいたほうが良いでしょう。

質問: GitHub Copilot を用いて書いたコードは？
GitHub Copilot の利用者に所有権と責任がある。
パブリックコードに一致するコードは、提案に含めない設定ができる。

### 自分の想像、体験から出した答え

優先順位は
1. ファイルで範囲選択をしている箇所
1. ファイルでカーソルが置いてあった場所から上下数行分のコード、コメント部分
1. 開いているファイル全体 (ファイルを開いているが、範囲選択はしていない 例:ターミナル上にカーソルがあった)
1. VSCode画面には表示されていないファイルだが、タブで開いてある複数のファイル
1. コミットログを見ている、直近のコミットを見ている。
1. 質問 (ファイルを開いているが、範囲選択はしていない)
1. 質問 (ファイルやタブを閉じている。)
1. GitHub Copilot chatとの会話ログ (ファイルやタブすべてを閉じている)
   みたいな感じだと思います。

※「もっと詳しく教えてください」等と **主語を抜かして質問をすると** 優先順位に従って質問が返ってきます。(※重要)
※普通に質問したい場合は、すべてのファイルを閉じておいた方が良いです。(※重要)
※GitHub Copilotは賢く、開いているファイルと関係のない質問にも答えることができます。つまり、質問自体が開いているファイルとの関連性が低いと判断されると、優先順位が低くなると思われます。
※会話ログに関しては、過去の会話ログを参考にしているかどうかは不明です。参考にしていたとしても、優先順位はかなり低いと思われます。



例:
* ファイルを開いたまま質問すると、そのファイルに関した答えを返してきます。

* 前に聞いた質問やその答えを忘れたような言動が見られます。
会話ログの優先順位は低いので、忘れたような答えになるようです。

* 会話ログを確実に見て返事をもらうためには、会話の重要部分を貼り付けて質問をすればいいと思います。

※注意点:トークンを超える情報は参考にされません。10個や20個のファイルを開いていても、情報が過多になると参考にされないと思われます。
(参考: ChatGPTでは英文字で4096、日本語で3000文字程度のトークン数が許容されていますが、GitHub Copilotの許容トークン数は不明です。)


#### 講座でのその他 Tips
関数を書く際に、その関数の使用例を示すと、より正確な関数の提案をしてくれます。
例えば、2つの日付の計算を行う場合、コメントで使用例を示すことができます。

##### before: シンプルな下準備 コメントのみ

```dayCalc.js
// 関数 2つの日付の計算
function

```

とだけ書いて提案を受け取るよりも、

コメントにもっと情報を書いたり、
それ以外にも実際に使用する方法をコードに書いて提案の精度を上げる方法があります。

コメントの追加＋使用例を書くと

##### after: コメントに情報を追加＋使用例を書く

```dayCalc.js
// 関数 2つの日付の計算
// 秒まで計算します
function ＊＊＊

// 使用例
dayCalc("2019-12-17 03:24:00", "2023-06-17 12:12:32")

```

※ カーソルを＊＊＊の場所に持っていき、インライン候補をトリガーします。
（提案を出してもらう時は＊＊＊は入力しません。）

GitHub Copilot を使っていない人のために、工夫をしてから複数の提案を出すとどのように変化するかを見てください。

<details><summary>提案をすべて見て比較する。(長いので折りたたみます)</summary>

機能だけをコメントに書いた場合場合

```dayCalc.js
// 関数 2つの時間の差を計算する。
function

```

GitHub Copilot chat 複数の提案

```GitHUb Copilot


Synthesizing 7/10 solutions

=======
Suggestion 1

function dayCalc() {
  // 入力された日付を取得
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  // 日付の差を計算
  var diff = Math.abs(date1.getTime() - date2.getTime());
  var diffDay = Math.ceil(diff / (1000 * 3600 * 24));

  // 結果を出力
  document.getElementById("result").innerHTML =
    "2つの日付の差は" + diffDay + "日です。";
}

=======
Suggestion 2

function dayCalc(start, end){
    // 日付の差を計算する
    var diff = end.getTime() - start.getTime();
    // 時間に換算する(1000ミリ秒 * 60秒 * 60分 * 24時間)
    var diffDay = diff / (1000 * 60 * 60 * 24);
    // 戻り値
    return diffDay;
}

=======
Suggestion 3

function calcDay() {
    // 入力された値を取得
    var year1 = document.getElementById("year1").value;
    var month1 = document.getElementById("month1").value;
    var day1 = document.getElementById("day1").value;
    var year2 = document.getElementById("year2").value;
    var month2 = document.getElementById("month2").value;
    var day2 = document.getElementById("day2").value;

    // 計算
    var date1 = new Date(year1, month1, day1);
    var date2 = new Date(year2, month2, day2);
    var dayDiff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

    // 結果を出力
    document.getElementById("dayDiff").innerHTML = dayDiff;
}

=======
Suggestion 4

function dayCalc(date1, date2) {
  // 日付をミリ秒に変換
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // 差分のミリ秒を計算
  var ms_diff = Math.abs(date1_ms - date2_ms);
  // 差分のミリ秒を日付に変換
  var days = Math.floor(ms_diff / (1000 * 60 * 60 * 24));
  return days;
}

=======
Suggestion 5

function dayCalc(){
  // 2つの日付の差分を求める
  var diff = Math.abs(date2.getTime() - date1.getTime());
  // 日付に換算する
  var diffDay = diff / (1000 * 60 * 60 * 24);
  // 結果を出力する
  document.write("2つの日付の差は" + diffDay + "日です。");
}

=======
Suggestion 6

function dayCalc() {
  // 入力された日付を取得
  var inputDate1 = document.getElementById("inputDate1").value;
  var inputDate2 = document.getElementById("inputDate2").value;
  // Dateオブジェクトを生成
  var date1 = new Date(inputDate1);
  var date2 = new Date(inputDate2);
  // 日数を計算
  var diffDay = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
  // 結果を表示
  document.getElementById("result").innerHTML = diffDay;
}

=======
Suggestion 7

function dayCalc() {
    var d1 = new Date(document.getElementById("date1").value);
    var d2 = new Date(document.getElementById("date2").value);
    var diff = d2.getTime() - d1.getTime();
    var diffDay = diff / (1000 * 60 * 60 * 24);
    document.getElementById("diffDate").innerHTML = diffDay + "日間";
}



```

機能からさらにコメントと使用例を追加した場合

```dayCalc.js
// 関数 2つの日付の計算
// 秒まで計算します
function

// 使用例
dayCalc("2019-12-17 03:24:00", "2023-06-17 12:12:32")

```

GitHub Copilot chat 複数の提案

```GitHUb Copilot
Synthesizing 10/10 solutions

=======
Suggestion 1

function dayCalc(date1, date2) {
    // 日付を表す文字列からDateオブジェクトを生成します
    const datetime1 = new Date(date1);
    const datetime2 = new Date(date2);
    // 差分をミリ秒で取得します
    const msDiff = datetime2.getTime() - datetime1.getTime();
    // ミリ秒を秒に変換します
    const secDiff = msDiff / 1000;
    // 秒を表示します
    console.log(`${secDiff}秒の差があります`);
}

=======
Suggestion 2

function dayCalc(date1, date2) {
  // 文字列から日付オブジェクトを生成
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // 2つの日付の差分(ミリ秒)を計算
  const diff = d2.getTime() - d1.getTime();
  // 差分(ミリ秒)を秒、分、時間、日付に変換
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  // 余りを計算
  const sec2 = sec % 60;
  const min2 = min % 60;
  const hour2 = hour % 24;
  // 日付を表示
  console.log(`${day}日と${hour2}時間${min2}分${sec2}秒です。`);
}

=======
Suggestion 3

function dayCalc(date1, date2) {
  // 日付を表す文字列からDateオブジェクトを作成
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);

  // 2つの日付の差分（ミリ秒）を計算
  const diff = dt2.getTime() - dt1.getTime();

  // 差分（ミリ秒）を秒に変換
  const diffSec = diff / 1000;

  // 差分（秒）を表示
  console.log(`${diffSec}秒の差があります。`);
}

=======
Suggestion 4

function dayCalc(date1, date2) {
  // 日付をUnix時間に変換
  const date1Unix = new Date(date1).getTime()
  const date2Unix = new Date(date2).getTime()
  // 差分のミリ秒を計算
  const msDiff = Math.abs(date2Unix - date1Unix)
  // 差分のミリ秒を秒に変換
  const secDiff = msDiff / 1000
  // 秒数を日数に変換
  const dayDiff = secDiff / 60 / 60 / 24
  // 結果を表示
  console.log(`${date1}から${date2}までは${dayDiff}日です`)
}

=======
Suggestion 5

function dayCalc(date1, date2) {
  // 引数をDate型に変換
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  // 2つの日付の差分をミリ秒で取得します
  const diff = d2.getTime() - d1.getTime()

  // 差分を秒に変換します
  const diffSec = diff / 1000

  // 差分の秒を表示
  console.log(diffSec + "秒の差があります")
}

=======
Suggestion 6

function dayCalc(date1, date2) {
  // 日付を表す文字列からDateオブジェクトを作成
  var dateObj1 = new Date(date1);
  var dateObj2 = new Date(date2);

  // 2つの日付の差分（ミリ秒）を計算
  var msDiff = dateObj2.getTime() - dateObj1.getTime();
  // 差分のミリ秒を秒に変換
  var secDiff = msDiff / 1000;
  // 差分の秒を分に変換
  var minDiff = secDiff / 60;
  // 差分の分を時間に変換
  var hDiff = minDiff / 60;
  // 差分の時間を日に変換
  var daysDiff = hDiff / 24;

  // 差分を表示
  console.log(daysDiff + "日間の差があります");
}

=======
Suggestion 7

function dayCalc(date1, date2) {
  // 日付の差分を計算
  var diff = Date.parse(date2) - Date.parse(date1);
  // ミリ秒を秒に変換
  var diffSec = diff / 1000;
  // 秒を切り捨て
  var diffSecRound = Math.floor(diffSec);
  // 秒を表示
  console.log(diffSecRound + "秒の差があります");
}

=======
Suggestion 8

function dayCalc(date1, date2) {
  // 日付をミリ秒に変換
  const date1_ms = new Date(date1).getTime();
  const date2_ms = new Date(date2).getTime();

  // 差をミリ秒で取得
  const msDiff = date2_ms - date1_ms;

  // ミリ秒を秒に変換
  const secDiff = msDiff / 1000;

  // 秒を切り捨て
  const secDiffRound = Math.floor(secDiff);

  // 結果を表示
  console.log(secDiffRound + "秒の差があります。");
}

=======
Suggestion 9

function dayCalc(date1, date2) {
  // 日付をミリ秒に変換
  const d1 = new Date(date1).getTime()
  const d2 = new Date(date2).getTime()

  // 差分を計算する
  const diff = d2 - d1

  // ミリ秒を秒に変換
  const diff_sec = diff / 1000

  // 時間単位の差分
  const diff_sec_rounded = Math.round(diff_sec)

  // 差分を表示する
  console.log(diff_sec_rounded)
}

=======
Suggestion 10

function dayCalc(date1, date2) {
  // 日付をUNIX時間に変換
  var d1 = new Date(date1).getTime()
  var d2 = new Date(date2).getTime()

  // 2つの日付の差分を計算
  var diff = (d2 - d1) / 1000

  // 差分を表示
  console.log(diff + "秒の差があります")
}

```

</details>



### テストファイルを開いておくテクニック

※テストコードを書いておいてからコードを書く場合
テストコードを他のタブで開いておくと提案されるコードの精度が上がります。



### AI に聞いてみる (上記の講座を聞く前の以前の考察)

> Github Copilot が見ている範囲は？

1. 現在開いているファイルのみを見ている。
2. VSCode でファイルを開いているのは見ている。
3. ローカルリポジトリを見ている。
4. Github 上のリポジトリを見ている。
   Github Copilot を VSCode で使っています。
   関数の提案などはどの範囲までを参考にしているのでしょうか？

AI の回答 (要約)

> ChatGPT
> Copilot は VSCode で開いているファイルとローカルのリポジトリを見て、関数の提案や補完に活用していますが、GitHub 上のリポジトリのコードにはアクセスできません。

> Bing
> Github Copilot は、VSCode でファイルを開いているのは見ていると思います。ローカルリポジトリや Github 上のリポジトリを見ているかどうかは、公式ドキュメントには明記されていませんでした。

> Bard
> 現在開いているファイル、VSCode で開いているすべてのファイル、ローカルリポジトリ、および GitHub 上のすべてのリポジトリを見ています。つまり、Copilot は、作業しているコードの特定の状況に関連するコードを提案できます。

> Perplexity
> どのコードを見ているかは不明

> Phind
> VSCode で現在開いているファイルに限定されるわけではありません。

というわけで、2 番目の回答が多いようです。

2. VSCode でファイルを開いているのは見ている。

↓ 全体を見るのはまだ開発中であると WIP(work in progress) と書かれています。

GitHub Next | GitHub Copilot for _Your_ Codebase

https://githubnext.com/projects/copilot-view/

> GitHub Copilot only knows about the contents of your current file and possibly a few other open tabs, rendering it blind to important type definitions, patterns and greater connections in your codebase. We want to let GitHub Copilot see your entire repo when it comes up with its suggestions.

> GitHub Copilot は、編集中に現在のファイルの内容と、場合によっては他の開いているタブの内容しか知らないため、コードベース内の重要な型定義やパターン、より大きな関連性を把握する事ができない。私たちは、GitHub Copilot が提案を出す時に、リポジトリ全体を見る事ができるようにしたいと考えています。

## vitest の in-source testing を使う

### in-source testingとは？

Vitest テストコードを実装ファイルと同一のファイルに記述する

https://zenn.dev/azukiazusa/articles/vitest-same-test-file

コードとテストコードを同一ファイル内において開発できるということは、AIにとっても有利なのではないかと思います。何しろAIが見ている範囲が確実にそのファイル内に収まっているので、いちいちテストファイルをVSCodeのタブで開く必要がないため、コードを書くハードルが下がります。また、**Copilotにテストを提案させて挿入ボタンを押すだけ**で、テストコードを簡単に記述することができます。

AI 時代のコードの書き方, あるいは Copilot に優しくするプロンプターになる方法

https://zenn.dev/mizchi/articles/ai-programmer

> copilot はテストから実装を生成するのは苦手だが、実装からテストケースを生成する精度はかなり高い。



### In-source testing vitest公式ドキュメント

In-source testing | Guide | Vitest

https://vitest.dev/guide/in-source.html

AIに聞いてみると、この機能は他のテストツールでもかなりの数で搭載されているようです。



# VSCode 上 で GitHub Copilot の設定をする

**Github Copilot** の有効か無効か
**Github Copilot** での言語単位での設定
等を決めます。

VSCode の **settings.json** に以下の設定を追加します。

設定例

```settings.json
{
  // Github Copilot の提案の表示を有効にするかどうか決めます。
  "editor.inlineSuggest.enabled": true,
  // 言語単位で Github Copilot を有効にするかどうかを決めます。
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "typescriptreact": true,
    "javascript": true,
    "markdown": true,
    "python": true,
    "yaml": false,
    "php": false
  },
  // 関数等の上に表示されるコマンドパレットのSuggest testを
  // 表示するかどうかを決めます。
  "github.copilot-labs.showTestGenerationLenses": true,
  // 関数等の上に表示されるコマンドパレットのアイコンを
  // 表示するかどうかを決めます。
  "github.copilot-labs.showBrushesLenses": true,
  // 不明
  "github.copilot.advanced": {},
}

```

※ advanced は不明です。
将来の拡張のための設定かもしれません。

# GitHub.com 上 で GitHub Copilot の設定をする

https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-settings-on-githubcom#enabling-or-disabling-duplication-detection

## 設定 著作権関連

※著作権関連
公開コードと一致しているかどうかのチェックをします。
ライセンス等を気にする製品を作る方は必須です。

- 任意のページの右上隅にあるプロフィール写真をクリックし、**Settings** をクリックします。
- 左側のサイドバーで、**Copilot** をクリックします。

## 設定 公開コードかどうかのチェック

**Suggestions matching public code GitHub Copilot can allow or block suggestions matching public code. See the GitHub Copilot documentation to learn more.**

許可する場合 **Allow**
公開コードと一致しても使用する。

ブロックする場合 **Block**
公開コードと一致している場合は使用しない。

新しい設定を保存するには、Save ボタンをクリックします。

## 設定 テレメトリ コードの共有の許可

自分のコードを Microsoft および OpenAI と共有するかどうかを選択できます。

**Allow GitHub to use my code snippets for product improvements**

GitHub によるテレメトリデータの使用を許可または禁止するには、**[製品の改善のために GitHub がコード スニペットを使用することを許可する]** の選択を解除します。

新しい設定を保存するには、Save ボタンをクリックします。

※テレメトリデータ: システムから収集された状態情報、性能指標、および操作データなどのデータの事です。主に Web 開発において、Web サイトの訪問者数やアプリケーションの使用状況を収集し、品質管理やトラブルシューティングに役立つ。データ収集システム、データベース、ビジネスインテリジェンスツール、機械学習アルゴリズムなどが使用されます。


# 参考記事
これらは参考になった記事が多いので、なるべく読むようにしてください。

GitHub Copilot で AI ペア プログラマーに身をゆだねたら、委ねすぎたまま行った件。 - Qiita

https://qiita.com/kazuya-ho2/items/0ed7a4399630dcea1186

GitHub Copilot for CLI があればコマンドなんてもう覚えなくていいのでは？ - Qiita

https://qiita.com/ekusiadadus/items/af374a10b55003412e3f

copilot-explorer | Hacky repo to see what the Copilot extension sends to the server

https://thakkarparth007.github.io/copilot-explorer/posts/copilot-internals

https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot

https://github.com/features/copilot/#faq-privacy-copilot-for-business

Getting started with GitHub Copilot in Visual Studio Code - GitHub Docs

https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code

コード補完 - AI-Native Development Guide

https://ai-native-development.gitbook.io/docs/v/ja/basic/code-to-code

GitHub Copilot for Individuals はアンチパターンをどこまでリファクタしてくれるのか？

https://zenn.dev/bs_kansai/articles/1632bd54d30524?redirected=1

GitHub Copilot にいいコードを書いてもらう方法 - GMO インターネットグループ グループ研究開発本部（次世代システム研究室）

https://recruit.gmo.jp/engineer/jisedai/blog/how-to-hack-github-copilot/

> まとめ　 GitHub Copilot と仲良くやる方法
> 結論 「コメント書け！」
>
> - テンプレ的な import 文や config の実装は GitHub Copilot にサジェストさせると一瞬で完了。
> - 複雑なビジネスロジック実装では、まずコメント書け！すると AI はサジェスト精度が大幅に向上。
> - いいサジェストが来ない時は、コメントが悪い。書いてほしい処理を一般的な技術用語で説明する事。
> - どんなにコメントを頑張ってもまだ完璧に 100 点は難しい。結構イージーな文法エラーがあったりする。
> - 1 人でググりながらサンプルを読んであれこれやるより、AI のサジェストを活用したほうがだいぶ早く実装が完了する。まずやりたい事をコメントで書くと AI がとりあえず実装してくれる。それをベースにググると効率が良かった。

AI-Native Development Guide（日本語版）

https://ai-native-development.gitbook.io/docs/v/ja/

Github Copilot のかしこい使い方

https://zenn.dev/gon/articles/06fe05730f8294

GitHub Copilot を使ったコードリーディングのコツ その 1 - Qiita

https://qiita.com/takagimeow/items/9d68471297d1ff75cf22

> 巨大なプロジェクトのコードリーデング
> ファイルの末尾に以下のコメントを挿入します。

```
/*
Write a description about SnippetStorage's each method here.
1.
*/

```

※巨大プロジェクトなのでコードをすべて読み込ませるのは無理なので、
このような工夫で AI にコードリーデングの手伝いを実現させています。

https://speakerdeck.com/dzeyelid/tech-street-catch-up-on-github-latest-updates-202306

AI 時代のコードの書き方, あるいは Copilot に優しくするプロンプターになる方法

https://zenn.dev/mizchi/articles/ai-programmer

>穴埋めソルバーである、ということから逆に考えて、実装から型を推論させることができるが、実装を書いて型を推論するか、型を書いて実装を生成するかなら、労力としては、後者の方がよいと自分は思う。






## 雑学 Github Copilot

日本語の文章を書く手助けもしてくれます。

コードでエラーが起きたら、現在のコードをコピーして GitHub Copilot に貼り付けてみるといいかもしれません。

もしそれで解決しないのなら、ChatGPT に貼り付けてみるといいかもしれません。

# 感想 GitHub Copilot

この記事に書いた事をすべて身につけても、結局はコメントの利用方法（＝ユーザーの質問力）が無限にあるので、10－20%ぐらいしか使いこなせていないという実感があります。

Github Copilot では解決できない問題は Bing や ChatGPT に投げています。
(最近 Bing でもコード対応してくれているので助かります。)

AI の特性を考えてコメントにいかに良い質問などを書けるかが、そしてその人間の能力にかかっているかが大きいと思います。

なので AI によってプログラマーの仕事がなくなるという事は「まったく」ないと思います。


# ここより下は、未確認情報に降格

以前は記事に乗せていましたが、GitHub Copilot の不具合だったり、実際に効果があるのかどうかの検証ができていないので、ここより下は未確認情報に降格します。

複数の拡張機能のオンオフの組み合わせ、VSCodeのsetting.jsonの設定の変更や、Editorに関する拡張機能をすべてオフ、すべてのsetting.jsonを消した場合の動作などを試してみましたが、まだまだ検証不足のようでしたので、ここより下の情報は一旦未確認情報に降格します。

GitHub CopilotなどAIは出力ごとに、様々な要因で出力が変わるので、検証が難しいです。



# GitHub Copilot を始める前に （※重要）

GitHub Copilot を始める前に下記の拡張機能をOFFにしてください。
自動挿入機能を持つ拡張機能は、GitHub Copilot と競合するため、正常に動作しません。

具体的な GitHub Copilot と **相性の悪い** 拡張機能

* Auto Close Tag v0.5.14で不具合確認
* Auto Rename Tag v0.1.10で不具合確認

これらの拡張機能がONになっていると、コードが正常に出力されない、コメントが正常に挿入されない等の不具合が発生します。

※ VSCode Insiderで不具合を確認したので、VSCodeでも同じ不具合が発生する可能性があります。

追記 2023年7月4日

GitHub Copilot Nightly は GitHub Copilot に統合されました。

https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly

追記終了

# 何が足りてないか？何が欲しいか？

GitHub Copilot が登場してからかなり経ちました、
後発の GitHub Copilot 類似ツールも多数登場しています。
その後発のツールには付いているが、 GitHub Copilot にはまだ付いていない機能がいくつかあります。



## 自動修正機能

エラー修正等はGitHub Copilot に指示を出さないと出来ません。



## 読み込み機能

GitHub Copilot は現在自動で読み込み範囲を決めています。
現在の所どこを読み込んでいるのかは結果表示に1行目に表示されます。

しかし、他の類似ツールは自分で読み込み場所を指定することが出来ます。



### プロジェクト全体 or リポジトリ全体を読み込む機能、ファイル読み込み機能。

GitHub Copilot には、ユーザーが指定してプロジェクト、リポジトリ全体を読み込ませる機能はありません。
GitHub Copilot はリポジトリを見ているかもしれないし、いていないかもしれな、はっきりわかりません。

GitHub Copilot は開いているファイルを読み込ませるならば実現できます。
GitHub Copilot chat inline機能の場合、ファイルを開けばそのファイルから直接指示を送れます。

GitHub Copilot は正確な情報を得るためにファイルを開いておく必要があります。



### ドキュメント読み込み機能

外部のドキュメント、つまり指定したツールの公式サイトの最新の情報を読み込ませることなどが出来る機能。

読み込ませるとそれを元にして質問に答えてくれたり、最新の情報に沿ったコードを生成してくれるようになります。

現在のGitHub Copilot は古い情報を元にしてコードを生成してしまう事があります。

# Tips

## 文字の大きさ

左サイドバーにGitHub Copilot の情報を表示します。
そうすると右上に三点リーダーのアイコンがあるので
「新しいウィンドウでチャットを開く」で
新しいウィンドウを開くことが出来る。
そのウィンドウでは
新しいウィンドウでは文字の大きさを
Ctrl + - 小さくする
Ctrl + = 大きくする
で変更できる。

VSCode 本体で文字の大きさを変更すると、GitHub Copilot にも反映されますが、
全体の文字に影響を与えてしまう。



## 途中で途切れたら

「続きを書いて」

とお願いをする。
