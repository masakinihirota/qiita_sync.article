<!--
title:   第二版 VSCode の Rules for AI 全体のルール設定 翻訳 GitHub Copilot
tags:    githubcopilot
id:      247bee4bd66ace86e1da
private: true
-->
注意:
この記事はGitHub Copilotの指示書の自分なりの使い方です。
GitHub Copilotに新しい機能が追加されたので、その機能と自分なりの使い方がメインとなります。
翻訳部分は、第一版に相当するSCode の Rules for AI 全体のルール設定 翻訳 GitHub Copilotを御覧ください。

まとめて１ファイル
複数ファイルに分割
どのような形だろうとGitHub Copilotには伝わります。
この記事は、
GitHub Copilotに正確な情報を伝えつつ、
人間とAIとのギャップを埋めるための指示書を、
人間が管理しやすい形を目指します。

# 追記 2025年3月26日

指示書のリポジトリ

masakinihirota/github-copilot-custom-instructions: GitHub Copilot 指示書

https://github.com/masakinihirota/github-copilot-custom-instructions

※ルールは各自で練り直してください。

追記終了



# 追記 2025年3月24日

<details><summary>指示書を書く心構え</summary>

## 指示書とは

AIと人間とのギャップを埋めるためのルール
AIは何も指示しないとあらゆる可能性を試そうとします。
人間がきちんとルールで縛っておくことが重要です。
そのための文書が指示書です。



## 下準備はきちんと行う

料理を作る前に材料と道具をすべて揃えておくように
AIも必要なすべての指示書やMCP、開発環境、モデル選定、タスクリストを用意しておきます。
例えば、バグの処理を頼むなら、AIは推論モデルを使うのが良いとされています。
Gemini 2.0 Flash Thinkingなど

AIはレールの上ならばきちんと動きますが、
AIは壊れた環境を直すのに適していません。
殆どの場合、修復不可能に破壊することになるでしょう。

したがって、すべてが正しく設定されいることを確認してください。



## AIは記憶しない

AIはタスクを実行するよう指示するたびに必要なコンテキストを再構築する必要があります。

AIは新しくチャットを開始するたびに、コードベースを0から理解しようとします。
AIに適切な指示書を与えることで、誤解を防ぎ、効率的なコーディングをすることが出来ます。



## AIは仕様を尊重することが得意ではない

コーディング中にテストを削ったり、APIを変更したり何でも行ってしまいます。
人間がコードレビュー時に仕様との整合性を確認する必要があります。
正確な情報を与えることやタスク分解をして問題を小さくするなどの対応が有効です。



## AIはイノシシ

AIは力ずくで問題を解決しようとします、
学習しながらうまくいくまで何回も試そうとします。
AIの試行回数の制限は付けておきましょう。

難しい問題の場合、人間ならば途中で立ち止まりますが、AIはタスクを忠実に完了させようと進み続けます。
AIの良い面でもあり、悪い面でもあります。
人間が実装書を作るに当たり、問題を回避したり、タスク分解をして問題を解決しやすくします。



## フォーマッターを利用する

AIは機械的なコーディングルールに従うのが苦手です。
Next.jsなどはBiome,Prettier等のツールを利用します。
VSCode本体や、GitHubにPush時にhusky等のツールで自動化を設定しておきます。



## MCPを使用する

モデルコンテキストプロトコル（MCP）サーバーは、LLMが環境とやり取りするための標準インターフェースを提供します。
使用することで、MCPはAIを強力にサポートしてくれます。



## 大きなファイルは禁止

ファイルが大きくなるとパフォーマンスに影響を与えます。
ファイルを小さく保つことが重要です。



## 静的な型

TypeScriptの型を利用することでAIは把握しやすくなります。



## ドキュメントを読ませる。

AIはトレーニングによって非常に多くのことを知っていますが、最新の情報に弱い場合があります、そのようなときは最新のドキュメントを読ませるようにします。

読ませ方は色々あります。
Web検索がサポートされているAIを利用する
MCPを利用する
ファイルにしてAIに読み込ませる。
ドキュメントのURLを教える



## 優先順位

AIは優先順位をつけることが苦手です。
指示された文章をすべて覚えておこうとするので
どうでもいいような情報がたくさんあると、
本当に大事なことを忘れることがあります。
だから、最初に「こういうことをお願い！」ってちゃんと伝えておくことが大切です。
あとは、関係ない情報はなるべく入れないようにするとか工夫をしましょう。



## テンプレートを作る

テンプレートとは必要なすべてのパーツを備えた最小限の実装です。
まずは大枠を作っておいて、全体を動かし、そして少しづつ実装していくのがおすすめです。



## AIに痛みはない

人間は限界以上の動作には痛みがでて自然に止まります。
AIは自分の限界を知るのが苦手です。
限界を認識させるために明示的な指示が必要です。
AIが実行できることのみを実装するように依頼することが重要です。



## リファクタリング

AIはコードをコピーする傾向があります
同じコードが増えた場合はコードを積極的にリファクタリングをするようにしましょう。
AIは指示がない限りコードを積極的にリファクタリングをしようとはしません。
重複を減らすように指示を出しましょう。

コードは、きれいに整理整頓して、メンテナンスしやすい状態を保ちましょう。

### リファクタリング前のリファクタリング

AIは変更を一度に行おうとしたり、関係のない箇所のリファクタリングをしようとします。
リファクタリングをするまえに、リファクタリングしやすいように下準備しておきましょう。
リファクタリングを終えた後は、人間がレビューすることが大切です。



## AIはすでにルールを持っている

AIは学習データやファインチューニング、コンテキストウィンドウによって形成されます。よってAIが生成するコードはそれらに大きく影響を受けます。

例えば、コンテキストウィンドウに特定のライブラリを使うコードがたくさんあれば、LLMもそのライブラリを使い続ける傾向があります。

ルールを変えたい場合は、指示書を使って自分のルールに従わせる必要があります。指示書に書いてない場合は、AIはすでに持っているルールでコードを生成し始めます。
コードベースは指示書よりもAIの行動に大きく影響を与えます。



</details>

追記終了



# 追記 2025年3月23日

<details><summary>VSCodeのエージェントモード？</summary>

GitHub Copilot in VS Code
https://code.visualstudio.com/docs/copilot/overview

公式ドキュメント


追記の前提
今のAIは大雑把に分けると
Chat 会話モード
Edits 編集モード
Agent mode 代理人モード
の3種類があります。

GitHub Copilotの種類
GitHub Copilot
GitHub Copilot Chat
GitHub Copilot CLI
GitHub Copilot Edits
GitHub Copilot Agent mode

VSCode のAI(土台だけ、操作の共通化？)
VScode Copilot Chat
VScode Copilot Edits エージェントモードに対応
※複数の同時編集セッションは未対応(並列にEditsは使えない)
`#codebase` はクエリに関連するコンテキストを見つけてくれます。

AIは1,2年前から進化を続けていて、AIとの会話、1ファイルの編集、複数ファイルの編集、一部、もしくは全体をAIにコードを提案してもらう代理人モードができるようになり、段々と便利になってきました。

今回の追記は、これまでは色んな会社がそれぞれ独自にAIを利用する方法を探っていたのが、「VScode共通の操作」の実装でどのAIも同じに使えるようになります・・・かもしれない。

それぞれ独自の指示書の設定やチャット枠、履歴がありました。

たとえばVScodeのAI、Agent modeの拡張機能は
* Cline
* Roo Code
* Gemini Code Assist
* その他
等群雄割拠の時代に突入していました、今回のVSCodeのアップデートで、操作や設定の共通化がされるのではないでしょうか？
MCPの利用など、独自設定は残るかもしれません。
これら独自の拡張機能開発者が、VSCodeのAgent modeでの操作を利用しない可能性もあります。



## VScode Agent mode

GitHub Copilot Agent mode
とは別に
VScodeでAgent modeが利用できるようになります。
※VScode Insidersで試験的に実装中

つまりこれからはそれぞれのAIモデルの実装や独自の拡張機能に依存せず、「VScode共通の操作」で各AIのエージェントモード (それ以外のモードも)が使えるようになります・・・かもしれない。

Use agent mode (preview)
https://code.visualstudio.com/docs/copilot/copilot-edits#_use-agent-mode-preview

VScodeのエージェントモードはファイルをいちいち指定する必要がなくなるそうです。

## 会話の共有

これまでは、GitHub Copilotでは
GitHub Copilot chat
GitHub Copilot Agent mode
ではそれぞれ会話の共有はされていませんでしたが
VScode Copilot Chat
VScode Copilot Edits
これらを利用することで、これからは会話の共有がされるようになります・・・かもしれない。

Copilot Chatでアイデアを練り、
Copilot Editsでコードを生成することができるようになります・・・かもしれない。

Copilot Edits
Send a chat request to Copilot Edits
https://code.visualstudio.com/docs/copilot/copilot-edits#_send-a-chat-request-to-copilot-edits

</details>

追記終了



# 前提(独自)

GitHub Copilotの指示書は3種類あり
1. VSCodeの指示書
2. 静的な指示書
3. 動的な指示書
と番号を振ってあります。

👆記事内では1番目、2番目、3番目とします。



## 複数の指示書に分ける目的

中型以上のWebアプリを作りたいから
※小型のアプリならば1ファイルでOK、何ならチャットやコメントで済ませてしまえるので指示書さえいりません。

指示書のアップデートをしやすくする。

人間が理解しやすくなる。

指示の抜け落ちなどが見つけやすくなる。

目的別に管理しやすくする。

固定のルールを再利用しやすくする。

一度きりのルールを作りやすくする。

チームで管理しやすくなる。

履歴を残しやすくする。

1ファイルのほうが管理しやすいが
これからの指示書はどんどん長くなる傾向があるので今のうちから分けておく。
※AIの進化具合によっては不要になるかもしれませんが、いまはまだ指示書は重要です。

指示書は、GitHub Copilotと人間との認識の差を埋めるためのルール。

設計書が大きく、指示書に書いてない部分はGitHub Copilotが自由にコードを生成してくる場合があります。
これは人間側の指示する内容が抜け落ちている場合が多いです。

# 設定のまとめ

それぞれの設定場所

```
# VSCode 本体の設定
settings.json

# リポジトリの直下
# GitHub Copilot 静的指示書
.github/copilot-instructions.md
.github/.copilot-codeGeneration-instructions.md
.github/.copilot-test-instructions.md
.github/.copilot-review-instructions.md
.github/.copilot-commit-message-instructions.md

# GitHub Copilot 動的指示書
.github/prompts/*.prompt.md

```

----------------------------------------

# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

※第一版に相当する VSCodeのRules for AI 全体のルール設定 翻訳 GitHub Copilotも合わせてご覧ください。

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

----------------------------------------

# 用語

* 指示書(独自)

英語では custom instructions file (公式Doc) と呼ばれます。

GitHub Copilotには3種類の方法での指示書が設定できます。
ルールが重複すると管理が煩雑になるため、目的別に指示書を使い分けます。

この記事では、GitHub Copilot に設定するファイルを「指示書」と定義します。
GitHub Copilot には3種類の指示書を設定でき、ルールの重複を避けて管理を効率化するため、目的別に使い分けます。



* プロンプトファイル

目的や、機能ごとにGitHub Copilotに読み込ませる指示書です。

この記事では3番目の指示書にあたり、動的な指示書と位置づけています。

以前はすべての指示書をプロンプトファイルと呼んでいましたが、
今回のアップデートから目的別に指示を出す動的な指示書をプロンプトファイルと呼んでいます。



* 設計書

Webアプリケーションの構想、概要、要件定義、画面設計、データベース設計、API設計、テスト計画などをまとめたドキュメントです。



* リポジトリ

Webアプリケーションのソースコードや関連ファイルを管理するための保管場所です。
Gitバージョン管理システムを用いて、変更履歴の追跡や共同開発を容易にします。



* タスクリスト

設計書に基づいて分割された、実装すべき目的や、機能単位のリスト。各タスクは、コード実装を優先して定義されます。



* タスクリスト分解

タスクリストの各項目を、より小さな実装単位に分割したものです。
1タスクの大きさが十分に小さかったらタスク分解の必要はありません。



* 実装書 (独自)

英語では Implementation document

GitHub Copilot に具体的なタスクを指示するための詳細なドキュメントです。

設計書をタスクリスト化して(タスクが大きい場合はタスク分解)、GitHub Copilotに指示しやすい大きさにしたものです。
問題を小さく分けることで、AI にすべての情報を与え、希望する提案を得やすくなります。

タスクリストの各項目を実装するために、AIに与える詳細な指示を記述したドキュメントです。

１つの実装書で１つの仕事の単位で書きます。

AIと会話して設計書から実装書を書きます。
会話をしていく中で、詳細な部分まで決めていきます。

## 考慮する項目

### 機能

機能、具体的な処理内容
限界値、条件、入力値の範囲、処理するデータ量
エラー対策、例外処理、エラーメッセージ、ログ出力方式
ストーリー、ユーザーシナリオ、ユースケース

### テスト

使用するテストフレームワーク、ユニットテスト、E2Eテスト、統合テスト、Playwright MCP

### 関数、コンポーネント、ページ

データの名前
型
範囲
意味
関係性
処理内容
入力内容
出力内容

などを決めていき実装書を完成させていきます。
GitHub Copilot の提案精度の向上を行います。

実装書を完成させたら、GitHub Copilot Agent mode等でコードを書いてもらいます。



## 指示書と実装書の違い

指示書はGitHub Copilotに設定する指示です。
実装書は設計書をタスクリスト(＆タスク分解)から、特定の目的や機能を詳細に書いたものです。
実装書の内容を基に、動的な指示書（プロンプトファイル）を作成し、GitHub Copilot に具体的なコード生成やテストなどのタスクを実行させる、という流れが考えられます。実装書は、AI との会話を通じて詳細を詰めていく過程で進化していくドキュメントと言えるでしょう。
実装書を作成する際には、GitHub Copilot がより良い提案をするために、以下の点を考慮すると良いでしょう:





----------------------------------------

# GitHub Copilotの指示書とは

GitHub Copilot in VS Code
https://code.visualstudio.com/docs/copilot/overview

Custom instructions for GitHub Copilot in VS Code
https://code.visualstudio.com/docs/copilot/copilot-customization

GitHub Copilotには事前に設定しておく
指示書があります。

詳しくは

VSCode の Rules for AI 全体のルール設定 翻訳 GitHub Copilot #githubcopilot - Qiita
https://qiita.com/masakinihirota/items/1694715063247574467d

👆この記事ではVSCodeに設定する指示と、リポジトリに設定する指示のかなりの部分が被っています。

👆この記事以降にプロンプトファイルという機能が追加されました。

以前は実質1つのみでしたが
(VSCode本体に書くか、リポジトリ直下に書くか)

3つ目の指示書、プロンプトファイルの導入で
静的(固定)なルール
動的なルール
を使い分けるという意味で、さらに柔軟な運用ができるようになりました。

今回はGitHub Copilotの指示書が3種類になったので、目的別にルールを使い分けてみます。



注意:
GitHub Copilotの公式で定めた場合のファイルは別ですが、
指示書の中で外部のファイル(指示書)を読み込ませようとするのは非推奨とされていました。
これは公式ドキュメントに書いてあります。
なので共通の指示書を作ってそれを個別の指示書に読み込ませるなどは止めたほうがいいでしょう。



## 現在のGitHub Copilotの指示書の種類

### それぞれの使用目的

3種類あります。

3種類を使い分けるとしたら
1. VSCode固定のルールをVSCode本体(settings.json)に書きます。
2. リポジトリ全体のルールをcopilot-instructions.mdに書きます。
3. 個別の機能や目的のルールはプロンプトファイルに書きます。

1の固定のルールとはVSCodeを使う時に毎回必ず守ってもらうルール。

2のリポジトリ全体のルールとはそのリポジトリで使う全体のルール

3の開発者の目的を明確に伝えるための指示書になります。
(毎回設定を全部読み込ませると、GitHub Copilotの提案がぼやけてしまうため。)


## 指示書のファイルの種類

1. VSCodeの設定settings.jsonファイル内
2. copilot-instructions.md
3. プロンプトファイル

これを使い分けて利用します。

### VSCode側の設定

settings.json

* 1 settings.jsonファイル内は通常のVSCodeの設定を開いて指示を追加できます。
自然言語とファイル名を指定できます。

これをVSCodeを使う上で必ず使う指示を書きます。

例
常に日本語で分かりやすい言葉を選び、丁寧な表現を心がけます。
語尾に「にゃー」をつけてください。



### GitHub Copilot側の設定

```
copilot-instructions.md
.copilot-codeGeneration-instructions.md
.copilot-test-instructions.md
.copilot-review-instructions.md
.copilot-commit-message-instructions.md

```

※デフォルト設定名

それぞれ
コード生成用の指示書
テスト用の指示書
レビュー用の指示書
コミットメッセージ用の指示書

* 2 copilot-instructions.md このファイルはリポジトリのルート直下の.github内に置くよう定められています。

リポジトリ全体に影響を与えるルールを書きます

例
TypeScript、Node.js、Next.js (App Router)、React、Shadcn UI、Radix UI、Tailwind CSS、Zustand、Supabase、Zodのエキスパートとして振る舞います。
Next.js 15 を使います。
App routerを使います。
Supabaseを使います。
Honoを使います。

* 3 プロンプトファイルは、ワークスペースの `.github/prompts` ディレクトリに 拡張子 `*****.prompt.md` のファイルを作成します。



----------------------------------------

# 指示書の使い分け

1. 固定ルールを `settings.json`
2. 全体静的ルールを `copilot-instructions.md`
3. 個別動的ルールを プロンプトファイル

固定ルールにはVSCodeの基本的なルールを書きます。
全体ルールにはリポジトリ単位のルールを書きます。
個別動的ルールは目的、機能単位にルールを書きます。
👆このように使い分けます。



----------------------------------------

# 指示書のためのリポジトリを作成

※GitHub Copilotはインストール、有効化済みとします。
※GitHub CLIがインストール済み
`ghコマンド` が使えるようになります。

## VSCode Insidersのインストール(スキップ可)

GitHub Copilot Agent modeは
VSCode Insidersでのみ使用できます。
(VSCodeの先行試験バージョン)
現在:2025年3月14日時点

Download Visual Studio Code Insiders
https://code.visualstudio.com/insiders/

Agent modeを使用したい場合は、インストールしておきます。

### GitHub Copilot Agent modeを有効化の確認

GitHub Copilotのエージェントモードを使ってみた #AI - Qiita
https://qiita.com/kei1-dev/items/e6b0ead5f24de35e30ed



## プロンプトファイルの有効化

GitHub Copilot のリポジトリ カスタム命令を追加する - GitHub Docs
https://docs.github.com/ja/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

VSCodeの設定

例: 一部抜粋

```settings.json
	"chat.promptFiles": true,
	"chat.renderRelatedFiles": true,
	"chat.agent.maxRequests": 20,
	"chat.mcp.discovery.enabled": true,
	"github.copilot.chat.codesearch.enabled": true,
	"github.copilot.chat.edits.temporalContext.enabled": true,
	"github.copilot.chat.newWorkspaceCreation.enabled": true,
	"github.copilot.chat.search.semanticTextResults": true,
  "github.copilot.chat.codeGeneration.useInstructionFiles": true

```



👆を追加します。
※実験的な機能の設定が含まれています。
有効化する場合は必要かどうか調べてから行ってください。

"chat.promptFiles": true
* プロンプトファイルの有効化。
この設定を有効にすると、チャット機能がプロンプトファイル（指示書）を利用できます。

"chat.renderRelatedFiles": true
* 関連ファイルの表示を有効化。
この設定により、チャット機能が現在のプロジェクトや作業中のファイルに関連するファイルを表示します。

"chat.agent.maxRequests": 20
* エージェントモードでの試行回数の上限。この設定は、エージェントモードで送信されるリクエスト数を制限します。
無制限に試行されるのを防ぎます。これがなくてループにハマると永遠に終わりません。
デフォルト値: 15

"chat.mcp.discovery.enabled": true
* MCPサーバーの探索機能を有効化。
この設定は、MCP（Microsoft Chat Protocol）サーバーへの接続や探索を可能にします。

"github.copilot.chat.codesearch.enabled": true
* GitHub Copilot Chatでコードベース検索機能（#codebase）を有効化します。
プロジェクト全体からコード検索を行い、関連する提案や結果を取得したい場合に使用します。

"github.copilot.chat.edits.temporalContext.enabled": true
* 最近編集した指示書やコードをGitHub Copilot Chatの提案に含めるかどうかをきめます。

"github.copilot.chat.newWorkspaceCreation.enabled": true
* 新しいワークスペース作成機能を有効化します。
これにより、チャット機能が新しい作業環境（ワークスペース）のセットアップを支援します。
新規プロジェクト開始時に便利です。

"github.copilot.chat.search.semanticTextResults": true
* セマンティック検索機能を有効化します。この設定では、意味的な一致（セマンティックマッチ）に基づいて検索結果が提供されます。
より高度な検索結果が必要な場合に使用します。





## 開発用のリポジトリの作成

開発するためにgitのリポジトリを作ります。

👇今回はスターターを使います。

nextjs/saas-starter: Get started quickly with Next.js, Postgres, Stripe, and shadcn/ui.
https://github.com/nextjs/saas-starter

### スターターのインストール

```terminal
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install

```

👆このスターターで使っている技術を洗い出します。

uithub というサービスでAIに聞くと便利です。
uithub はリポジトリを1ファイルにするWebサービスです。

Easily Ask Your LLM Coding Questions
https://uithub.com/

※似たようなサービスはかなりあります。

このURLをNotebookLMに読み込ませることで、そのリポジトリの解説が出来るようになります。

URLで登録しておくことで、NotebookLMの情報をいちいち手動で更新する必要がなくなります。


## 技術選定

次に技術選定をしておきます。
スターターで使用している技術
スターターに追加したい技術
を選んでおきます。

### 使用ツール、ライブラリ

例
Next.js
Supabase
Drizzle ORM
Hono API
Shadcn/UI
TailwindCSS

### テストツール

例
vitest
Storybook
テストケースは日本語で書く

### アカウント作成
Supabase(一部無料、有料)
Stripe(一部無料、有料)

※小さいアプリやテストだけなら無料で使えます。



## 開発用のリポジトリにツールの追加(スキップ可)

自分の使いたいツールやライブラリを追加

例
Honoなど

<details><summary>(省略)ローカルの開発環境設定</summary>

※👇基本的の素のスタータでも指示書の書き方は同じです。
自分独自の追加ツールを組み合わせてください。

ここからの環境設定は各自違うので、自分の場合を大まかに書いておきます。
詳細は私のQiita記事を御覧ください。

これをわざわざ書く目的は、
自分が十二分に使い倒しているツールや
技術などは
AIに指示するよりも
手動でインストールしたほうが早いからです。

そして手動でインストールして
基本的な使い方、
自分の使い方を
AIに教えるためでもあります。

例
DBはSupabaseを使う。
Drizzle ORMを使う。
APIはHonoを使う。

ツールを導入して、
いつも使っているコードの書き方も同時に書いておくと、AIも同コードを書いたほうがいいか理解してもらえます。

サンプルにもなります。

アーキテクチャ、フォルダ構造のサンプルにもなります。

例
コロケーション(一箇所にまとめておく考え方)を利用して、
1機能のコンポーネントのファイルは一箇所にまとめて置く。
	ビューコンポーネント(表示)
	ビジネスロジックコンポーネント(計算、アルゴリズム)
	フェッチコンポーネント(データの取得)
	テストファイル(ユニットテストvitest)
	ストーリファイル(Storybook)
をGitHub Copilotに教えます。


ローカルで開発するので、ローカルの開発環境を準備します。

URL

# ローカルの環境設定

スターターの\lib\db\setup.tsを参考にします。

## Stripeの設定

Step 1: Checking if Stripe CLI is installed and authenticated...
Step 3: Getting Stripe Secret Key
Step 4: Creating Stripe webhook...
今は行わない

# DBをSupabaseに変更

Step 2: Setting up Postgres

```terminal
stripe --version
stripe config --list

```

## ローカルのSupabase Dockerの立ち上げ

```terminal
supabase init
supabase start
supabase status

```

## 環境変数の設定

Step 5: Generating AUTH_SECRET...
Step 6: Writing environment variables to .env

```.env
？？？？？

```

アクセスの確認

ローカルのSupabaseの立ち上げ確認

</details>






省略するのは、スターターをカスタマイズして自分の慣れ親しんだツールを使い、それを指示書に教えるために必要ですが、ここをスキップしてもやることは同じだからです。

これでGitHub Copilotに与えるリポジトリの準備ができました。


----------------------------------------

ここからがメイン

# 具体的な指示書の作成

## 指示書の設定場所

### VSCodeのsettings.json

VSCodeの設定を開きます。

copilot-instructions.mdの指示書を有効化するために

```settings.json
"github.copilot.chat.codeGeneration.useInstructionFiles": true,

```

を設定します。

### copilot-instructions.md


リポジトリのルート直下

`.github/copilot-instructions.md`

を作成して指示を記入します。

```terminal
mkdir .github
touch .github/copilot-instructions.md

```

### プロンプトファイル

`.github/prompts/`フォルダを作成して、その中に置きます。

## 拡張子

```
*****.prompt.md

```

例

```terminal
mkdir .github/prompts/
touch .github/prompts/code-style.prompt.md
touch .github/prompts/comment-rule.prompt.md
touch .github/prompts/test-rule.prompt.md

```

👆GitHub Copilot公式ドキュメントでのファイル名

自分は、
コーディングスタイル
コメントルール
テストルールは
静的な指示書に書いたほうがいいと思います。

----------------------------------------

# 指示書の全体の配置

## 1. VSCode

settings.json

settings.json内に直接書くか、
指定したファイルを読み込みます。

## リポジトリ内

### 1. VSCodeに読み込ませる指示書

リポジトリ直下 or .github/直下
.copilot-codeGeneration-instructions.md
.copilot-test-instructions.md
.copilot-review-instructions.md
.copilot-commit-message-instructions.md



### 2. リポジトリ全体の指示書

.github/copilot-instructions.md



### 3. プロンプトファイル

.github/prompts/code-style.prompt.md
.github/prompts/comment-rule.prompt.md
.github/prompts/test-rule.prompt.md



----------------------------------------

# 1. VSCodeの指示書

固定(VSCode)の指示書
個人用のルールを書きます。

VSCodeのGitHub Copilotを使う上でずっと使い続けるルール

このファイルの指示の優先度は一番後回しにします。
※ルールが被った場合のため

## settings.jsonに登録する指示書の作成

```terminal
touch .copilot-codeGeneration-instructions.md
touch .copilot-test-instructions.md
touch .copilot-review-instructions.md
touch .copilot-commit-message-instructions.md

```

👆それぞれ
コード生成用の指示書
テスト用の指示書
レビュー用の指示書
コミットメッセージ用の指示書

※拡張子は `*****.md` です



## settings.json テンプレート

settings.json内で指示書を指定できます。
👇settings.json内の好きな場所に挿入してください。

```settings.json(一部)
// Customize GitHub Copilot in VS Code
 // https://code.visualstudio.com/docs/copilot/copilot-customization
 // テンプレート
 // 有効化(デフォルト)
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "github.copilot.chat.codeGeneration.instructions": [ // コード生成の設定です。
    {
      "file": ".copilot-codeGeneration-instructions.md"
    },
  ],
  "github.copilot.chat.testGeneration.instructions": [ // テストコード生成の設定です。
    {
      "file": ".copilot-test-instructions.md"
    },
  ],
  "github.copilot.chat.reviewSelection.instructions": [ // コードレビューの設定です。
   {
      "file": ".copilot-review-instructions.md"
    },
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [ //コミットメッセージ生成の設定です。
    {
      "file": ".copilot-commit-message-instructions.md"
    },
  ],

```

※👆ファイル指定式を採用しています。
指示は自然言語でも可能です。

自然言語で指示する場合は、

```settings.json
    {
      "text": "初心者にも分かりやすく説明します。"
    },

```

👆このように書きます。

半永久的に決まっているルールは、VSCodeのsettings.jsonに自然言語で書いておいたほうがいいです。

ファイルを指定している場合は、新しいリポジトリを作成するごとに👇設定が必要です。

* リポジトリの直下に指示書を置く。
* .github/フォルダを作ってそこに指示書をいれる。

など

例

```settings.json
	{
		"text": "常に日本語で分かりやすい言葉を選び、丁寧な表現を心がけます。"
	},
	{
		"text": "初心者にも分かりやすく説明します。"
	},
	{
		"text": "専門用語はできるだけ避け、必要な場合は簡単な説明を加えます。"
	},
	{
		"text": "常に励ましの言葉を添えます。学習意欲が高まるよう工夫します。"
	},
	{
		"text": "最後に、関連するTipsを教えて下さい。"
	},

```

## settings.json

それぞれの指示書に書きます。

### コード生成用の指示書

```.copilot-codeGeneration-instructions.md
# コード生成に関する指示

このファイルでは、GitHub Copilotがコードを生成する際に従うべき具体的な指示を定義します。

このファイルのルールの優先度は低いです。

## コード生成

* コードを書く前に既存のコードを深くレビューし動作を確認します。

* 正確な例を用いて、簡潔で技術的なTypeScriptコードを記述します。

* 宣言的なJSXを記述します。
* 関数型および宣言型のプログラミングパターンを使用し、クラスの使用は避けます。
* 補助動詞（`isLoading`、`hasError`など）を用いた説明的な変数名を使用します。
* ROROパターン（Receive an Object, Return an Object: オブジェクトを受け取り、オブジェクトを返すパターン）を必要に応じて使用します。
* エクスポートされたコンポーネント、サブコンポーネント、ヘルパー、静的コンテンツ、型でファイルを構成します。
* ディレクトリ名にはケバブケースを使用します（例：`components/personal-information`）。
* コンポーネントは名前付きエクスポートを使用します。
* コンポーネント名にはケバブケースを使用します（例：`my-component.tsx`）。
* 純粋な関数には `function` キーワードを使用します。
* 単純なステートメントには簡潔な構文を使用します。
* 条件文では不要な中括弧を避け、1行文では中括弧を省略します。
* セミコロンは省略します（ただし、文の曖昧さを避けるために必要な場合は使用します）。

## コメント

* コード例を示す際は、各行の目的を詳細なコメントで説明し、実行結果も示します。
* 複雑なロジックには明確で簡潔なコメントを付けます。

## セキュリティ

* データを危険にさらしたり、新たな脆弱性をもたらさないように、あらゆる段階で確認します。


```

コーディングルールが長くなったら
フロントエンドの指示書(Next.js、TypeScript、TailwindCSS、Shadcn/UI)
バックエンドの指示書(TypeScript、Hono)
DBの指示書(Supabase、Drizzle)
などのように分離させるとよいです。



### テスト用の指示書

```.copilot-test-instructions.md
# テストに関する指示

このファイルでは、GitHub Copilotがテストコードを生成する際に従うべき具体的な指示を定義します。

## テストファイル

* コンポーネントのテストコードはコンポーネントファイルと同じ場所に置くというコロケーションの考え方を採用します。


## テストコード ユニットテスト

* テストにはvitestとReact Testing Libraryを使用してコンポーネントのユニットテストを記述します。
* テストケースは日本語で書いてください。
* テストは `describe` でグループ化します。
* テストは `it` でテストケースを書いてください。
* 変数名などのフィールド名にはアンダースコアを使用してください。
* テストメソッド名を 'test_' でプレフィックスをつけてください。"
* 等号チェックには 'assertEqual' を使用してください。"
* 不等式チェックには 'assertNotEqual' を使用してください。"
* 真偽チェックには 'assertTrue' を使用してください。"
* 虚偽のチェックには 'assertFalse' を使用してください。"
* テストクラス名の前に 'Test' を付けてください。"
* 例外チェックには 'assertRaises' を使用してください。"
* 依存関係のモックには 'unittest.mock' を使用してください。"

## テストコード 統合テスト

* 重要なユーザーフローには統合テストを実装します。

```



### レビュー用の指示書

```.copilot-review-instructions.md
# コードレビューに関する指示

このファイルでは、GitHub Copilotがコードレビューを行う際に考慮すべき具体的な指示を定義します。

* 潜在的なセキュリティリスクがある場合は、追加のレビューを行います。
* コードの可読性を重視してレビューしてください。
* エラーハンドリングが適切か確認してください。
* テストケースが網羅されているか確認してください。

```



### コミットメッセージ用の指示書

```.copilot-commit-message-instructions.md
# コミットメッセージに関する指示

このファイルでは、GitHub Copilotがコミットメッセージを生成する際に従うべき具体的な指示を定義します。

* コミットメッセージは短く、要点を押さえたものにしてください。
* 変更内容の概要を明確に書いてください。

```



----------------------------------------

# 2. リポジトリ全体への静的な指示書

静的な指示書
チーム全体で共有するルールを書きます。

使いまわしをするルールです。

このファイルの指示の優先度は低くします。

リポジトリを分析して
使用しているツールの具体的な使用方法を指示します。

## 指示書の場所

リポジトリ直下

`.github/copilot-instructions.md` ファイル

## 2. 静的ルール (`.github/copilot-instructions.md`)

これらはリポジトリ全体に適用されるルールであり、プロジェクトの技術スタックやコーディング規約などを定義します。

```.github/copilot-instructions.md
# GitHub Copilot 全体の指示書

このリポジトリでは、Next.js SaaS スターターテンプレート ([https://github.com/nextjs/saas-starter](https://github.com/nextjs/saas-starter)) をベースに開発を行います。

## 振る舞い

* TypeScript、Node.js、Next.js (App Router)、React、Shadcn/UI、Radix UI、Tailwind CSS、Zustand、Supabase、Zod、Stripe、Vitest、 React Testing Library、Storybookのエキスパートとして振る舞います。



## 使用技術スタック

### 基本事項

* 言語: TypeScript、Node.js
* フレームワーク: Next.js (App Router)、React
* UIライブラリ: Shadcn/UI、 Radix UI、 Tailwind CSS
* 状態管理: Zustand
* バックエンド: Supabase、 Drizzle ORM
* スキーマ検証: Zod
* 決済: Stripe
* テスト: Vitest、 React Testing Library
* UIコンポーネントの管理: Storybook (ストーリファイル)



## コーディング規約

* 関数型および宣言型のプログラミングパターンを推奨し、クラスの使用はしないでください。
* 環境変数は `.env` ファイル `.env.local` ファイルで管理し、Next.js の仕組みに従って安全に利用してください。
* コンポーネントの配置パターンには、コンポーネントのコロケーション を考慮してください。
* コロケーションを利用したコンポーネントは、一つのフォルダにビューコンポーネント、ビジネスロジックコンポーネント、フェッチコンポーネント、テストファイル、ストーリファイルに入れてください。



## GitHub Copilot への追加指示

* 常に最新の Next.js (App Router) のベストプラクティス に従ったコードを生成してください。
* Supabase の認証、データベース操作、ストレージ利用に関するコード生成を支援してください。
* Stripe を利用した支払い処理、サブスクリプション管理に関するコード生成を支援してください。
* Shadcn/UI のコンポーネントを利用した、アクセシビリティの高いUIの実装を支援してください。
* Tailwind CSS を用いた、保守性の高いスタイリングの実装を支援してください。

## テストに関する指示

* vitest を使用したユニットテストの記述をしてください。
* React Testing Library を使用したコンポーネントのテストを記述してください。
* テストはdescribeでグループ化し、itでテストケースを記述してください。
* テストケースは日本語で記述してください。

## UIに関する指示

* UIはシンプルで直感的なデザインを心がけてください。
* モバイルフレンドリーなレスポンシブデザインを考慮してください。

## セキュリティ

* .env*ファイルはgitでコミットしません、必ずステージにあげないでください。

## ドキュメント

* README.md には使い方や説明等を記入してください。
* 設計書に関することは/docsフォルダ直下の設計書ファイル郡に反映させてください。
* 変更はそれぞれ /docsフォルダ や README.md に反映させてください。

```



----------------------------------------

# 3．目的、機能単位の指示書

GitHub Copilotではプロンプトファイルと呼びます。

※プロンプトファイル(*.prompt.md)は毎回指定する必要があります。
この指示書はGitHub Copilotへのドラッグアンドドロップで読み込ませることが可能です。



## 動的な指示書

特定の目的や、単体の機能を作る時用のルールを書きます。
機能を具体的に明確化してGitHub Copilotに説明するために必要です。

使い捨てするルールです。(独自)

利用しているリポジトリを使っている間、
ある程度の期間 AIに指示を与えるというイメージ。
AIとチャットで会話して、会話が終了するまでの間だけ覚えておくルールというイメージです。

このファイルの指示の優先度は一番高くします。



## 指示書の場所

リポジトリ直下

`.github/prompts` フォルダ

フォルダ内にプロンプトファイルとして作成します。

※拡張子は `*****.prompt.md` です



## 3. 動的ルール（プロンプトファイル `*.prompt.md`）

これらは特定の機能やタスクを開発する際に、必要に応じて利用する指示書です。
例えば、特定のReactコンポーネントを作成する場合の指示書は以下のようになります。

例: `components/user-profile.prompt.md`

```components/user-profile.prompt.md
# ユーザープロファイルコンポーネントの作成

## コンポーネントの目的

* ログインしているユーザーのプロフィール情報を表示するコンポーネントを作成します。

他の指示書と違っていたら、この指示を最優先とします。

## 技術要件

* Next.js v15を使用します。
* APIは Hono v4 を使用します。
* Reactを関数コンポーネントとして実装します。
* TypeScript で型定義を行います。
* UIは Radix UI の `<Avatar>` コンポーネントと適切なレイアウト要素を使用します。
* スタイルは Tailwind CSS を適用します。
* ユーザーデータは Supabase から取得します。

※バージョンも指定します。
(Next.js 15が2025年3月の最新バージョン、Next.js 14からの破壊的変更あり
page.tsx や layout.tsx の params や searchParams が Promise で渡されるようになり、データ取得が非同期になりました。これにより、Next.js 14までの同期的なデータ取得処理が動作しなくなります。)



## データ要件

* 以下のユーザー情報フィールドを表示します。

名前 (表示名)
メールアドレス
プロフィール画像 (URL)

## GitHub Copilot への指示

* Supabase のクライアントライブラリを使用して、ユーザーデータを非同期にフェッチする処理を実装してください。
* ローディング状態やエラー状態を適切に処理するUIを実装してください。
* プロフィール画像が存在しない場合のデフォルト表示を設定してください。
* Radix UI のコンポーネントを効果的に組み合わせて、アクセシブルなUIを構築してください。
* Tailwind CSS のユーティリティクラスを使用して、シンプルで見やすいスタイルを適用してください。
* 作成したコンポーネントの Storybook のストーリーファイル (`*****.stories.tsx`) を作成し、様々な表示パターンをテストできるようにしてください。
* vitest と React Testing Library を用いた簡単なユニットテストを作成してください。
例えば、データのローディング状態の表示や、ユーザー情報のレンダリングなどをテストしてください。



## 追加事項(将来の拡張予定)

* ダークモードにも対応できるようなスタイリングを検討してください。
* 将来的な拡張性を考慮し、コンポーネントのpropsを適切に定義してください。

```

※使い終わったプロンプトファイルは
`.github/prompts/completes` フォルダを作成し
そこに移動させておきます。 (独自)
削除しても構いません。



## ルールの個別具体的な例

### 例1: `component-style.prompt.md` (特定のコンポーネントのスタイルに関する指示)

```component-style.prompt.md
*   目標は、新しいユーザープロファイルコンポーネント (`UserProfile.tsx`) を生成することです。
*   このコンポーネントは、以下の要件を満たす必要があります。
    UIライブラリ: Shadcn UI の `Card` コンポーネントをベースにしてください。
    スタイル: Tailwind CSS を使用して、以下のスタイルを適用してください。
	 *   背景色は `bg-gray-100`
	 *   文字色は `text-gray-800`
	 *   角丸は `rounded-md`
	 *   内側のpaddingは `p-4`
    レスポンシブ: 画面幅が小さい場合は、要素が適切に折り返されるようにしてください。
    必要に応じてFigma参照



### 例2: `api-integration.prompt.md` (特定のAPI連携に関する指示)

* 目標は、`/api/users` エンドポイントからユーザーデータを取得し、それを表示する処理を実装することです。
* 以下の点を考慮してください。
    データ取得: Hono API を使用してデータを取得してください。
    認証: Supabase の認証ヘルパー (`supabase-auth-helpers`) を使用して、認証済みのユーザーのデータのみを取得してください。
    データ形式: APIのレスポンスは以下のJSON形式です。

json
{
  "id": "...",
  "name": "...",
  "email": "..."
}

エラーハンドリング: データ取得に失敗した場合は、適切なエラーメッセージを表示してください。

```



### 例3: `design.prompt.md` (設計書に関する指示)

```design.prompt.md
### 設計書

* 構想、概要を読んで設計書を書いてください。
	* 構想、概要: [Webアプリ].concept.md
	* 要件定義: [Webアプリ].requirements.md
	* 画面設計書: [Webアプリ].screen.md
	* 画面遷移図: [Webアプリ].screen-transition-diagram.md

* 設計書を docs フォルダ直下に作成してください：
	* 設計書: [Webアプリ].design.md
	* データベース設計: [Webアプリ].db.md
	* データベーススキーマ: [Webアプリ].db-schema.md
	* データベース関連図: [Webアプリ].db-entity-relationship-diagram.md
	* API設計書: [Webアプリ].api.md
	* テスト設計書: [Webアプリ].test.md

* 既存のWebアプリを修正する場合：
	* 既存のリポジトリを参照してWebアプリを開発してください
	* 変更時に設計書も同時に更新してください
* 設計書を作成したら、コードを作成する前にユーザーに設計書のチェックを依頼してください。

```

プロンプトファイルが長くなる場合は、タスク分解を行い、個々の指示の長さを短くして複数のファイルに分割します。
これは、AIの理解を助けるためです。
また、人間が指示書を作成する際にも、タスク分解を行うことで、タスクの抜け漏れや不足を防ぐことができます。

※ローカルのファイルは指定できますが、外部のファイルを読み込ませようとするとうまくいきません。



### 例4: 機能とそのテストのプロンプトファイル

動的な指示書（プロンプトファイル）で特定の機能を実装した後、そのテストを実行させ、さらにテストが希望通りに動作するようにいくつかの想定される動作をGitHub Copilotに伝える方法


* ステップ1：プロンプトファイルの作成と基本構造

1.  `.github/prompts/` フォルダ内に、機能に関連する名前を持つ拡張子 `.prompt.md` のファイルを作成します（例：`user-authentication.prompt.md`）。

プロンプトファイルの基本的な構造は以下のようになります：

```markdown
# [機能の目的や名前]

## テストに関する指示

*   [使用するテストフレームワーク名] を使用してテストを記述してください（例：Jest、vitest、React Testing Library）。
*   [テストの種類] を記述してください（例：ユニットテスト、統合テスト）。
*   テストは \`describe\` でグループ化し、\`it\` でテストケースを記述してください。

## テストで想定する動作

*   **[想定される動作1]** であることをテストで確認してください。
*   **[想定される動作2]** であることをテストで確認してください。
*   （必要に応じてさらに記述）

## テストの実行

*   上記のテストがすべて成功することを確認してください。

```

* ステップ2：具体的な指示と想定される動作の記述例

例えば、ユーザー認証機能を実装した後、そのテストを行いたい場合、`user-authentication.prompt.md` ファイルに以下のように記述できます。

```markdown
# ユーザー認証機能のテスト

## テストに関する指示

*   vitest と React Testing Library を使用してコンポーネントのユニットテストを記述してください。
*   認証成功時の処理、認証失敗時の処理、ローディング状態などをテストしてください。
*   テストケースは 日本語 で記述してください。
*   テストは \`describe\` で認証処理に関するグループを作り、\`it\` で個々のテストケースを記述してください。

## テストで想定する動作

*   正しいユーザー名とパスワード が入力された場合、認証が成功し、ダッシュボードにリダイレクトされることを確認してください。
*   誤ったユーザー名 が入力された場合、エラーメッセージが表示されることを確認してください。
*   誤ったパスワード が入力された場合、エラーメッセージが表示されることを確認してください。
*   認証処理中に ローディング 状態が表示されることを確認してください。
*   APIからのエラーが発生した場合、適切な エラーメッセージ がユーザーに表示されることを確認してください。

## テストの実行

*   上記のテストがすべて成功することを確認してください。
*   テストの実行後、成功したテストの数と失敗したテストの数を 日本語 で報告してください。
*   もし失敗したテストがあれば、その理由と修正案を提示してください。

```






## GitHub Copilotで使用可能なAIモデル

2025年3月現在

Claude 3.5
Claude 3.7 sonnet
Claude 3.7 sonnet Thinking
Gemini 2.0 Flash
GPT-4o
o1
o3-mini

## AIモデルが受け付けるプロンプトの長さ

Claude 3.5 Sonnet: 約200Kトークン（おおよそ300,000文字に相当）

Claude 3.7 Sonnet: 約200Kトークン（おおよそ300,000文字に相当）

Claude 3.7 Sonnet - Extended Thinking: 約200Kトークン（おおよそ300,000文字に相当）

Gemini 2.0 Flash: 最大1Mトークン（おおよそ1,500,000文字に相当）

GPT-4o: 最大128Kトークン（おおよそ192,000文字に相当）

o1: 最大128Kトークン（おおよそ192,000文字に相当）

o3-mini: 最大200Kトークン（おおよそ300,000文字に相当）



## 指示書に具体的な例を書くのが難しい時

リポジトリのどこか適当な場所に playground フォルダを作成します。

コンポーネントの例だったら
componentsフォルダの直下に置きます。
そしてお手本になるコンポーネントを書き、
GitHub Copilotにpalygroundフォルダを参考にしてくださいと指示を出します。

例えば、Next.js 15にHonoを導入した時、
APIの最小限のCRUDを書き、APIを利用する時はplaygroundを参考に生成してくださいと指示を出します。




----------------------------------------

## AIにも指示書を書かせる。

例えば、このBlog記事をNotebookLMに読ませて
さらに設計書をよませて
XXXXの機能を開発するので、動的な指示書(プロンプトファイル)を作ってください。
とお願いしたりします。

人間は細かいところまで指示書を書くのがお仕事です。

uithub
👆例えばこのサービスを使います。
似たようなサービスはたくさんありますが
URLを一文字変えるだけで簡単にアクセスできるので気に入っています。

uithub
NotebookLM
👆これらのWebサービスは👇を御覧ください。

私の使用しているAI関連サイト UPDATE 2025年3月 #Gemini - Qiita
https://qiita.com/masakinihirota/items/dc260e90f43a833d0e98

設計書を書くための情報源、市場調査なども
GeminiのDeep Researchに任せます。

https://uithub.com/
https://notebooklm.google.com/
https://gemini.google.com/app


----------------------------------------

# おまけ: GitHub CopilotをMCPで強化する

MCP（Model Context Protocol）は、AIが外部の情報源にアクセスするためのプロトコルです。

例えば、Next.jsやSupabaseのドキュメントといった情報を、AIが理解しやすい形式で接続するためのルールを定めています。

現時点では、GitHub CopilotはMCPに直接対応していませんが、VS Codeの拡張機能を利用することで、MCPサーバーを介して外部情報にアクセスし、GitHub Copilotの機能を拡張できます。






👇適当に検索して星やDL数がちょっと多いもの。
Copilot MCP - Visual Studio Marketplace
https://marketplace.visualstudio.com/items/?itemName=AutomataLabs.copilot-mcp



* MCPの概要:
    * MCPは、大規模言語モデル（LLM）が様々なデータソースやツールと連携するためのオープンな標準プロトコルです。
    * これにより、AIは最新のドキュメントやデータベース、APIなどの外部情報に基づいた、より正確でコンテキストに沿った提案やコード生成が可能になります。

* MCPサーバー:
    * MCPサーバーは、外部情報とLLMとの橋渡し役を担います。
    * 様々なデータソースに対応したMCPサーバーが開発されており、目的に応じて選択できます。

* VS Code拡張機能:
    * VS CodeでMCPを利用するためには、MCPサーバーと連携する拡張機能が必要です。
    * 例として、Clineなどの拡張機能が挙げられます。これらの拡張機能は、MCPサーバーをVS Code上で実行し、GitHub Copilotと連携させることができます。

* MCPの利点:
    * AIの知識を最新の状態に保つことができます。
    * 特定のドメイン知識や企業内の情報など、AIがデフォルトでは持たない情報にアクセスできます。
    * より複雑なタスクや、外部システムとの連携が必要な開発を支援できます。

* MCPを利用することで、GitHub Copilotをより強力な開発支援ツールとして活用できます。



## MCPツール：AI活用の効率化を加速する最先端ツール群

### 情報収集・分析

Perplexity
最新の情報検索に特化したAI検索エンジンです。従来の検索エンジンとは異なり、AIが情報を解析し、より精度の高い検索結果を提供します。

Firecrawl
複数のウェブサイトをクロールし、最新情報を収集・分析します。Deep Research機能により、競合他社の動向や市場トレンドの把握を自動化します。

### 個人情報管理

Memory
個人の情報を記憶し、必要な時に提供するAIツールです。個人の知識や経験を蓄積し、効率的な情報活用を支援します。

### 開発効率化

GitHub MCP
GitHubリポジトリの情報取得、PR作成、Issue管理などをLLMから直接操作できます。開発ワークフローを効率化し、生産性を向上させます。

Sentry
アプリケーションのエラー情報をリアルタイムで取得し、LLMが自動的に解析・修正します。デバッグ作業を効率化し、アプリケーションの安定性を高めます。

### ビジネス支援

Stripe MCP
サブスクリプション課金や決済管理を自動化します。煩雑な決済業務を効率化し、ビジネスの成長を支援します。

Supabase MCP
ユーザーデータやコンテンツのデータベース操作を自動化します。データベース管理の負担を軽減し、開発者はより重要な業務に集中できます。



# GitHub Copilotに頼る前に

GitHub Copilotでゼロから作るのもいいですが、
自分は使い慣れた使用するツールや環境変数は
自分でセットアップしておいたほうがいいと思っています。
自分はテンプレート(スタータ＋自分の慣れたツール)を作って、それを元にGitHub Copilotを利用するつもりです。



---

# 設計書と実装書

指示書をうまく使うために

## 要約 3行

設計書と指示書を作成します。

設計書からタスクリストを作成し、そのタスクが大きければ処理しやすい大きさにタスク分解し実装書として管理します。

実装書の通りにタスク単位でGitHub Copilotにコードを書いてもらい、テストと検証を行います。このサイクルを繰り返します。



## 目的

複雑な機能を持つWebアプリ開発において、GitHub Copilotを活用し、効率的かつ高品質な開発を実現する。

ある程度の規模の設計書をGitHub Copilotに直接読み込ませると、開発者が制御不能におちいります。
そのため、設計書から機能単位で分割したタスクリストを作成し、各タスクに対応する詳細な指示をまとめた「実装書」を作成します。
👆プロンプトファイルに相当します。

## ワークフロー

1. 設計書作成

Webアプリの設計書を作成します。

2. 開発環境構築

開発初期環境（スターターキット等）を準備します。
開発に必要なツールやライブラリを追加します。
ディレクトリ構成、基本的なコンポーネント、共通関数など、Webアプリの土台となるテンプレートを作成します。
テンプレートに基本的な最小限の動作を実装し、ユニットテストなどのテストコードを作成します。

3. タスク分解と実装書作成

設計書から機能を分割し、タスクリストを作成します。
タスクリストの各項目が大きすぎる場合は、さらにタスクを分割し、GitHub Copilotで扱いやすい粒度に調整します。
各タスクの詳細な仕様、バージョン情報など、GitHub Copilotへの指示を記述します。
これらの情報を「実装書」にまとめます。
実装書はタスクリストの各項目に対応する1機能単位で分けてGitHub Copilotに読み込ませます。

4. AIによる実装

作成したテンプレートと実装書をAIに読み込ませ、機能の実装をGitHub Copilotに行わせます。
実装したものをドキュメントとして出力します。

5. テストと検証 人間による理解

ユニットテスト、結合テスト、E2Eテストなど、適切なテストを実施し、実装された機能が設計通りに動作するか検証します。
必要に応じて修正、改善を行います。

※テストは人間のためのものであり、GitHub Copilotにコードを書くのをすべて任せるのなら最低限のテストがあればいいです。

6. 反復

実装書に基づく実装、テスト、検証のサイクルを繰り返し、Webアプリ全体を構築していきます。

## 実装書の役割

設計書と実際のコーディングの中間段階として、GitHub Copilotに対する詳細な指示書となります。
機能単位で分割されたタスクと、その実装に必要な情報をまとめます。
GitHub Copilotによる実装結果を検証するための基準となります。
GitHub Copilotとの円滑な連携を可能にするための重要な架け橋となります。

## 実装書のポイント

人間の手による制御のため、人間とGitHub Copilotとのバランスを考えます。
開発者は設計とタスク管理に集中し、AIは実装に特化させることで、効率的な開発を実現します。
詳細な実装書を作成することで、GitHub Copilotによる実装の精度と効率を高めます。
テストを重視し、品質の高いWebアプリを構築します。


---

# テスト駆動開発との相性

※注意 似ているけど全く違うものという話です。

GitHub Copilotに与える指示書、実装書に沿って開発してく手法をAI駆動開発とします。

再考 テスト駆動開発 #TDD - Qiita
https://qiita.com/masakinihirota/items/0a714d729d14da5cc7f4

## AI駆動開発とテスト駆動開発の相性の悪さ

### 問題

* テストリストの粒度と進め方の不整合

GitHub Copilotに任せるタスクと、テスト駆動開発のテストリストは全く違うものです。
タスクリスト分解したものとテストリストの大きさを無理やり合わせるのは開発が非効率です。

* テストの煩わしさ

人間主導の開発においてはテストが非常に有効ですが、GitHub Copilotが生成したコードに対して同様のテストを行うことが非効率です。

* 設計プロセスにおける人間との考え方の違い

テスト駆動開発はテストを先に書き設計を重視しますが、AI駆動開発は指示に基づきコード生成が先行します。
GitHub Copilotによるコードの生成は、テスト容易性を考慮した設計が必ずしも行われず、人間主導の設計との間にギャップが生じます。

* GitHub Copilotが自動修正してしまう問題

GitHub Copilotがコードを自動で修正するので、人間がテスト駆動開発でステップを回すとは意味合いが変わってきます。

* テストの目的とタイミングのずれ(独自)

テスト駆動開発はテストで仕様を明確化し設計を促進しますが、AI駆動開発ではコード生成後のテストを書くというものです。
回帰テストに重点が置かれ、初期段階のフィードバックや設計への誘導が不足します。

* リファクタリングの考え方の違い

テスト駆動開発では、テストで動作を保証しつつ可読性・保守性を高めるリファクタリングをします。一方、GitHub Copilotの自動修正は意図しない変更を招き、テスト駆動開発の安全なリファクタリングと矛盾します。

* 学習コストと導入の障壁

GitHub Copilotは設計書から指示書を生成しますが、そこから更にテスト駆動開発の考えを導入することは学習コスト等がかかり開発が遅れます。

* コストの問題

従量課金制のAIモデルを利用する場合、テストコードの生成や実行にかかるコストが追加で発生する可能性があります。



## 手順を変える

GitHub Copilotに動的な指示書でコードを生成させた後、人間がテストを書く場合、そのテストの主目的はレグレッションテストとなります。
これは、GitHub Copilotによるコード生成を「変更」と捉え、既存の機能が意図せず損なわれていないか、そして生成されたコードが設計書通りに動作するかどうかを確認するためです。

* 既存機能の維持と設計意図の確認、安定性の確保が主な役割です。
* テストの重点は、設計検証から機能確認へと変化します。
* 人間はGitHub Copilotによる生成コードの品質保証を担います。
* 自動テストの重要性やコード変更による問題の早期発見の意義があります。
•
この手順のようにテストは事後的な検証が中心となります。



---

# 最後に

指示書に正解はありません。開発する目的、プロジェクトの規模、チームの構成などによって、最適な指示書は異なります。
重要なのは、以下の点を考慮しながら、自分たちのプロジェクトに合った指示書を作成し、継続的に改善していくことです。

## 指示書作成のポイント

* 目的の明確化
何を実現したいのか、具体的な目標を明確に記述します。

* 具体性の追求
抽象的な表現を避け、具体的な要件や指示を記述します。
コード例や設計図などを積極的に活用します。

* 優先順位の明確化
複数の指示がある場合は、優先順位を明確に記述します。

* 継続的な改善
指示書の効果を定期的に評価し、改善を繰り返します。
チームメンバーからのフィードバックを積極的に取り入れます。

* 柔軟性
状況の変化に応じて、指示書を柔軟に修正します。
完璧な指示書を目指すのではなく、状況に合わせて変化できるようにします。




## 参考

基本設計について #ER図 - Qiita
https://qiita.com/hukuryo/items/97797a91d7e2ee0bcabc

👆設計書を作る参考。

