<!--
title:   AIエディタ(VSCodeの派生) Antigravityに指示書を設定しよう (厳しいルールでAIを縛る) ＋ 色々細かなTips (ルールの設定場所など)
tags:    Antigravity,gemini3.0
id:      674a500e07f1ff5b40ad
private: false
-->
(公式) Google Antigravity のスタートガイド

https://codelabs.developers.google.com/getting-started-google-antigravity

# 採用ツール

**Antigravity** を用いて下記のツール、ライブラリで開発します。

Next.js 16
Tailwind CSS
Shadcn/UI
Supabase
Drizzle
Hono
nuqs
Zod
three.js (グラフィックス用)

デジタル庁デザインシステム

## Antigravityの指示書を置く

>Next.js で開発するルールを設定します。 AntigravityでAIの指示書を書きます。最初にNext.jsをインストールして、指示書を置く場所を教えて下さい。そこに詳細な指示書を書きます。

指示をするとルート直下に AI_RULES.md を作ってくれた。

```src
/AI_RULES.md

```

しかしAIで開発する際はルールをきっちりと決めておきたい、そのために複数の指示書を目的別に置くつもりなので聞いてみた。

>目的ごとに複数の指示書を書きたい、その場合はどこに置くのか？ Antigravityでの設定場所がわからない

Antigravity（私）において、特定の設定画面や隠しファイル設定場所のようなものはありません。「ワークスペースにあるファイルを私が読み取って理解する」 という仕組みになっています。

ですので、ファイルとして置いていただければどこでも認識できますが、目的ごとに複数の指示書を作成・管理する場合、私たち（AIエージェント）が認識しやすい推奨のディレクトリ構成があります。

以下のフォルダを作成して配置することをお勧めします。

推奨構成: .agent ディレクトリ
プロジェクトルートに .agent というフォルダを作り、その中に整理します。

```
[アプリのルート]/
	├── .agent/
	│   ├── rules/          <-- ★ルール・指針系はここ
	│   │   ├── general.md  (現在のAI_RULES.mdを移動・分割)
	│   │   ├── design.md   (デザイン規約)
	│   │   └── db.md       (データベース設計規約)
	│   │
	│   └── workflows/      <-- ★手順・ワークフロー系はここ
	│       ├── deploy.md   (デプロイ手順)
	│       └── tdd.md      (TDDの手順など)
	│
	├── src/
	├── package.json
	└── ...

```

なぜこの場所がよいか
AIにとって明確: .agent という名前であれば、それが「アプリのコードそのもの」ではなく「エージェントへの指示」であることが明確になります。
.agent/workflows の特別扱い: システム上、.agent/workflows に置かれたマークダウンファイルは、私が「実行可能な手順書」として認識し、呼び出しやすくなる特別な機能があります。（例: /tdd-global のようなコマンドで呼び出せるようになります）
提案
現在ルートにある

AI_RULES.md
 をベースに、このフォルダ構成を作成しましょうか？もしよろしければ、私がフォルダを作成し、現在のファイルを移動・整理の準備をします。

---

## ルールの衝突予防

複数のルールを作ると矛盾が交じる時がある、
なので事前にルールに矛盾はないかを聞いておく。

## どのような指示がいいか？

ルールは人それぞれだが知見を得たものを一つ

実践フルAIコーディング
https://zenn.dev/erukiti/articles/2512-full-ai-cofing

👆️一言で言うと、事前に人間ではとても厳しいルールを作ってAIにコードを書いてもらう。


## かなり厳しいルールを作ってもらった。

```

## AIコーディング規範

### 目的

AIは、本規範に厳格に従い、**不変性、予測可能性、そして完全なテスト容易性**を確保したコードを生成すること。例外処理は型システムで強制し、ランタイムエラーの発生を最小限に抑える。

---

### I. 構造とモジュール化のルール (Modularity & Architecture)

| No. | 必須ルール | 詳細（AIへの指示） |
| :--- | :--- | :--- |
| **I-1** | **テストの最重要性** | **結合テスト**が最も重要であり、全ての機能は厳格なテストの下で実装されること。 |
| **I-2** | **インポート管理** | `require` および 一般的な `import` 文は禁止。必ず **`import` 宣言**を使用し、eslint-plugin-boundariesに従い、ディレクトリのインポート方向を強制すること。 |
| **I-3** | **サブパス禁止** | `import "hoge/sub"` のような深い階層のサブパス import は禁止。常に公開されたパスからインポートすること。 |
| **I-4** | **Barrel Export 厳守** | 各ディレクトリには必ず **`index.ts`** ファイルを設置し、そのレイヤーで公開してよいものだけを export すること。 |
| **I-5** | **Index.ts の純粋性** | `index.ts` は **re-export 以外**のロジック（関数定義など）を記述してはならない。 |
| **I-6** | **Default Export 禁止** | `export default` は使用せず、全て **名前付きエクスポート (Named Export)** を使用すること。 |

---

### II. 機能とデータ処理のルール (Functional & Data Flow)

| No. | 必須ルール | 詳細（AIへの指示） |
| :--- | :--- | :--- |
| **II-1** | **クラス禁止** | `class` の定義は原則禁止。互換性維持など、どうしても必要な場合のみ例外的に許可する。 |
| **II-2** | **Enum 禁止** | `enum` は絶対に使用しないこと。 |
| **II-3** | **完全な不変性** | 変数の再代入を防ぐため、**`let` の使用を禁止**し、全ての変数を `const` で宣言すること。オブジェクトや配列の型には必ず **`readonly`** を付与し、不変性を強制すること。 |
| **II-4** | **Argument Object 強制** | 関数の引数が 2 つ以上になる場合、必ず **単一のオブジェクト（名前付き引数パターン）**として渡すこと。 |
| **II-5** | **シャドーイング禁止** | スコープ外の変数と同じ名前の変数を、内側のスコープで宣言すること（シャドーイング）を禁止する。 |
| **II-6** | **マジックバリュー禁止** | コード内に直接、意味の不明瞭な数値や文字列（マジックナンバー、マジックストリング）を記述することを禁止。必ず `const` 定義すること。 |

---

### III. エラーと非同期処理のルール (Error Handling & Types)

| No. | 必須ルール | 詳細（AIへの指示） |
| :--- | :--- | :--- |
| **III-1** | **Throw 禁止** | 例外を発生させる `throw` 文は禁止。 |
| **III-2** | **Try/Catch 禁止** | `try / catch` の使用は、外部システムとの境界（腐敗防止層）でのみ許可し、それ以外のレイヤーでは禁止する。 |
| **III-3** | **非同期処理の型** | `Promise` を直接返さず、必ず **`ResultAsync`** のような Result 型に寄せて、成功/失敗の結果を型で明示すること。 |
| **III-4** | **Zod safeParse 強制** | Zod ライブラリを使用する際、検証メソッドは `parse` ではなく、必ず **`safeParse`** を使用すること。 |
| **III-5** | **型アサーション禁止** | `as` や `!` (非 null アサーション) を使用した型アサーションを禁止する。必ず型ガード関数や適切なチェックで型を絞り込むこと。 |
| **III-6** | **ネストの制限** | 制御フロー（`if`, `for`, `while` など）のネストは深さ **1** までとし、早期リターン（ガード節）を用いてコードを平坦に保つこと。 |

---

### IV. AI運用とテスト・品質ガード（Operational & AI-specific rules）

| No. | 必須ルール | 詳細（AIへの指示） |
| :--- | :--- | :--- |
| **IV-1** | **暗黙のフォールバック禁止 (No implicit fallback)** | LLM による勝手な補完・暗黙のフォールバックを禁止します。欠損値や想定外の状態については、必ず明示的に失敗を返す（Result 型等）か、仕様として事前に定義されたフォールバックを適用してテストで検証してください。 |
| **IV-2** | **ダミー/NO-OP 実装の禁止 (No mocking in production)** | プロダクション用コード内での NO-OP / ダミー実装を禁止します。テストでモックを使う場合でも、必ず“実 DB を用いた結合テスト”を作成し、モックのみで成功するケースを許容しないこと。|
| **IV-3** | **fail-fast の条件付き適用** | `fail-fast` を無条件に適用することを禁止します。fail-fast を採用する場合はリスク評価と回復戦略（リトライ、代替処理、監視/アラート）を明文化し、該当箇所を限定（例: 腐敗防止層）してテストで検証すること。|
| **IV-4** | **結合テスト重視・サーバー側実DB使用・カバレッジ目標** | サーバー側 API/Repository は「実 DB を用いた結合テスト」を必須とし、サーバー側コードのカバレッジは **100% を目標** とする（現実的制約がある場合は CI によるフル結合テストの夜間実行等の補完を許可）。 |
| **IV-5** | **TSDoc の厳格化** | 公開 API、Repository メソッド、Server Actions、複雑な関数には必ず TSDoc を記述し、`目的 (purpose)`, `内容 (params/returns)`, `注意事項 (remarks)` を必須化する。日本語で記載し、@example を用いて使い方を示すこと。 |
| **IV-6** | **CI と linter による自動阻止** | 上記ルールは文書化するだけでなく、CI と linter（ESLint + 各種プラグイン）で自動検出・阻止できる仕組みを必ず導入すること。PR マージ前にルール違反がある場合はブロックされるように設定する（TSDoc 必須チェック、禁止構文の検出、カバレッジゲートなど）。 |

**運用メモ**:
- ルールは必ず CI と lint で守らせる。単にルールを書くだけでは不十分。
- テスト用モックは許されるが、その場合でも「モックでのみグリーンになるテスト」を許さず、実 DB を利用した結合テストを同等レベルで確保すること。


```

👆️私はCIのルールを削ってもらった、初期開発時は、GitHubへpush時にhuskyでLint、ビルドしているため。
本番環境での運用時にはCIを導入予定

AIでのLintは、BiomeよりもESLintのほうがルールを設定できるのでいいらしい。

追加ルールを考える

テストカバレッジ 100%守る
守れなかったらなぜ守れなかったかのレポートを提出




# Tips

## どうしたらいいか迷った時

```
[なにか迷っている問題]
＜＜＜＜推奨度と理由付きで選択肢を出してください。

```

と最下行を追加して尋ねる。

## Antigravityで動作確認などをブラウザでも使えるようにする。

会話で

```
go to antigravity.google

```

と指示することでブラウザが必要になるので
Antigravity専用のブラウザ拡張機能のインストールが始まる。

Web開発では必須。

## 質問を工夫する

Xユーザーのテツメモ｜AI図解×検証｜Newsletterさん: 「📕"AIへの質問"が異常にうまい人の共通点というか…ChatGPTやClaudeから深い回答を引き出す方法が海外で大バズ中 「あなたはどう思う？」ではなく「誰がどう言うか？」と聞くこと。 たとえば… 普通の質問「この問題についてどう思う？」 https://t.co/1NnDrmdhNw」 / X
https://x.com/tetumemo/status/1998029536022442295

## Nano Banana Proの裏技

Xユーザーのわど🐏12/14から大型企画さん: 「Nano Banana Proの裏技 Gemini に任意の画像をアップロードし、 「画像を JSON プロンプトに変換し、サイズと詳細を含めてください」と指示 すると、画像を再現するためのプロンプトを出力してくれるので、 変更したい部分だけを修正して使用可能」 / X
https://x.com/wad0427/status/1996912450931957808

## プロンプトの書き方原則

Xユーザーのmasakinihirotaさん: 「プロンプトの書き方原則 ＞＞＞https://t.co/2dO8WtoCEj https://t.co/r1XOtVIwax」 / X
https://x.com/masakinihirota/status/1997039330406420808

![スクリーンショット 2025-12-06 052221.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/20cd4c33-b441-43cf-b671-8a3ae8188241.png)

## デジタル庁のデザインシステムで作成

Xユーザーのmasakinihirotaさん: 「記事を投稿しました！ GitHub Copilotエディタを使ってUI/UXの作成 (Shadcn/UIとデジタル庁のデザインシステムで作成👈️相性が良い) Next.js用 on #Qiita https://t.co/g9gbfedThW」 / X
https://x.com/masakinihirota/status/1996677479730499925


## 設定：拡張機能マーケットプレイスの変更

VSCodeからGoogle Antigravityへ

https://zenn.dev/iwatagumi/articles/9d143653579ab8#設定：拡張機能マーケットプレイスの変更

```
👇️設定を開く:

右上の歯車アイコンをクリック

Open Antigravity User Settings を開く

```

![スクリーンショット 2025-12-09 084744.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/8f1e761c-9a86-43e7-b138-110b04d3b6a1.png)


```

👇️以下の項目を VS Code の公式 URL に変更します。

Marketplace Item URL: https://marketplace.visualstudio.com/items

Marketplace Gallery URL: https://marketplace.visualstudio.com/_apis/public/gallery

```

![スクリーンショット 2025-12-09 084626.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/4cb6aa31-0200-4ffb-abcc-f26b15c4ca23.png)

再起動: 設定変更後、Antigravity を再起動します。




## 日本語化

マーケットプレイスを開きます。

Japaneseで検索します。

👇️**Japanese Language Pack for Visual Studio Code** が見つかります。

![スクリーンショット 2025-12-09 222411.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/65a940cd-a54f-4ce3-ba8a-9d9bcf73607b.png)

Japanese Language Pack for Visual Studio Code - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja

拡張機能をインストールします。

ctrl + p で
コマンドパレットから 「Configure Display Language」 で「日本語」を選択して再起動します。




## Antigravity での ルールの設定場所。

Antigravityの設定はこの5箇所から入れる。
※この他にVSCodeエディタ本体の設定ファイルもあります。

### 1. 右上の歯車アイコン から開く。

![スクリーンショット 2025-12-09 090833.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1d70bd92-dc20-4ccc-aa4b-6729816e9373.png)

### 2. 右下の Antigravity - Settings から開く。

![スクリーンショット 2025-12-09 090843.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/3f88379d-bbdd-443a-874c-65c4c48c8243.png)

### 3. 右下のSettings を開けた 中の Customizations Manage(青文字) から開く。

![スクリーンショット 2025-12-09 090854.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c61c4d90-0acb-4744-a556-b4fd00281626.png)

### 4. 3.と同じ 右下のSettings を開けた 中の 下側にある Advanced Settings(青文字) を開く。

👇️Antigravityのシステム設定画面が開く

![スクリーンショット 2025-12-09 090910.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2ad027cd-af9c-4370-80d9-60138e1f1ff1.png)

### 5. 右上の三点リーダーから開く

エディター画面の右上にある三点リーダーからドロップダウンメニューを開き、Customizations を選択します。

![スクリーンショット 2025-12-09 223716.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b9fbaf18-56f7-4563-b52a-edf250b96837.png)



## 上の 3. Manage から開くと Customizationsが開く

ここから グローバルの設定をかける。

Rules WorkFlows の2つのタブがある。


```
PCのC:ドライブ
    └─Users
        └─[ユーザーネーム]
             └─.gemini
                  └─GEMINI.md    <-- ★全体ルールはここ(Gemini CLI等と共通)

[アプリのルート]/
	├── .agent/
	│   ├── rules/          <-- ★ルール・指針系はここ
	│   │   ├── general.md  (例:現在のAI_RULES.mdを移動・分割)
	│   │   ├── design.md   (例:デザイン規約)
	│   │   └── db.md       (例:データベース設計規約)
	│   │
	│   └── workflows/      <-- ★手順・ワークフロー系はここ
	│       ├── deploy.md   (例:デプロイ手順)
	│       └── tdd.md      (例:TDDの手順など)
	│
	├── src/
	├── package.json
	└── ...

```

### 👇️Rulesのタブ

全体のルールがかける、ファイル名と保存場所は👇️ここ(Windows11)

```
C:\Users\[ユーザーネーム]\.gemini\GEMINI.md

```

👆️この GEMINI.md は1つだけ作れる。

![スクリーンショット 2025-12-09 095216.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/397bc20a-174f-439f-8aac-c1864bcdaa3b.png)


👆️作成済みだと Rulesタブから 👇️+Globalのボタンは消える


![スクリーンショット 2025-12-09 091949.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/0e9565dc-64d1-4bb9-af13-f9143fe2d0be.png)

右側にある
＋Workspace ボタンを押すと、ワークスペース(VSCodeのワークスペース、リポジトリ内の `.agents/rules` 内に置かれる。

### 👇️Workflowsのタブ

ワークスペース、リポジトリ内の `.agents/workflows` 内に置かれる。

手順などのルールを置く。

ここに作るとチャット欄で 「/」 と入力すると選択できる **スラッシュコマンド** になる。

Workflowsのタブ内には ＋Global ＋Workflows の2つのボタンがある。

＋GlobalはPC内のAntigravityで開いたワークスペース、リポジトリ全体に影響を与える指示書をかける。
＋Workflowsは現在Antigravityが開いているワークスペース、リポジトリ全体に影響を与える指示書を書ける。

![スクリーンショット 2025-12-09 092525.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/efcd6aa1-c941-4712-af6e-bc1174913aa0.png)

グルーバルのworkflowsのファイルは👇️ここに作成される。

```
C:\Users\[ユーザーネーム]\.gemini\antigravity\global_workflows\[任意のファイル名(lower case)].md

```

Workspaceの指示書は👇️ここに作成される。

```
[アプリのルート]/
	└── .agent/
	   └── workflows/      <-- ★手順・ワークフロー系はここ
	      ├── deploy.md   (例:デプロイ手順)
	      └── tdd.md      (例:TDDの手順)

```

## 指示書、ルール

指示書、ルールを書く時、

Gemini CLIなども使わず、Antigravityでアプリ1つだけ作るなら ワークスペースやリポジトリ内の `.agent`の一箇所だけにしておく。

複数のアプリを作るようになったら、共通のルールをグルーバルにまとめておくといいだろう。

### リポジトリ
1つのフォルダをAntigravityで開いて開発するパターン

### ワークスペース
複数のリポジトリを一箇所でまとめて開いて開発するパターン
Webアプリのフォルダと、設計書のフォルダを分けたりとか、フロントエンド、バックエンドのフォルダを分けているとかの場合に使う機能。



## ルールとワークフロー解説

Antigravityには、「**ルール**」と「**ワークフロー**」という2つの便利なカスタマイズ機能があるんですね。これは、エージェントさんをもっとかしこく、あなたのやりたいように動かすための設定です。

### 💧 ルール (Rules)

ルールは、例えるなら**エージェントさんへの「お約束」や「学校の校則」**のようなものです。

* **何をするの？**
    * エージェントさんがコードやテストを作るときに、「**いつも守ってね**」とあらかじめ決めておく**ガイドライン**です。
* **どんな例があるの？**
    * 「必ずこのコードの書き方（スタイル）で書いてね」
    * 「作ったメソッドには、いつも説明文（ドキュメント）をつけてね」
* **特徴**
    * これは**システムへの指示**に近いので、**いつも**エージェントさんが考えて行動する時に影響を与えます。

### 📝 ワークフロー (Workflows)

ワークフローは、例えるなら**あなたがいつでも使える「便利なメモ」** のようなものです。

* **何をするの？**
    * あらかじめ、よく使う **「保存しておいたプロンプト（指示）」** のことです。
* **どうやって使うの？**
    * エージェントさんとお話しているときに、**/（スラッシュ）**を入力して、その保存しておいた指示を**あなたのタイミングで**呼び出して（トリガーして）使います。
* **特徴**
    * これもエージェントさんの動きを助けますが、**あなたが「今これを使って！」と選んだときだけ**働きます。


| | ルール (Rules) | ワークフロー (Workflows) |
| :--- | :--- | :--- |
| **イメージ** | エージェントの **「校則」** | あなたが選べる **「保存済みプロンプト」** |
| **影響の仕方** | **常に**（いつも）エージェントの行動をガイドする | **オンデマンド**（あなたが選んだ時だけ）トリガーする |
| **役割** | エージェントの**基本的な動作やスタイル**を決める | 特定の場面で**素早く、決まった指示**を出す |