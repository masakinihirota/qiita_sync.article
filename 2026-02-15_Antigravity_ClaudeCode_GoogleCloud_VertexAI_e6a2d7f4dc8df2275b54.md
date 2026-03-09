<!--
title:   Antigravityの有料ユーザー Google AI Pro プランは特典でGCP用無料分$10もらえる、これでAntigravity × Vertex AI × Claude Codeの追加開発環境を追加
tags:    Antigravity,ClaudeCode,GoogleCloud,VertexAI
id:      e6a2d7f4dc8df2275b54
private: false
-->
### ※特にAI関連はバージョンアップが早いのでやり方が色々と変わる可能性があります、この記事のURLや内容をコピペしてAIに現在の最新の手順を教えてと聞いてみましょう。その時自分の環境(Mac/Win)やツール(使っているCLI)を入力すると自分専用の記事に変化します。

「Google AI Pro」プランや、その上位の「Google AI Ultra」プランを契約している皆さん。
素晴らしいエディタである「Antigravity」を使えるだけで満足していませんか？ 実はそれちょっともったいない使い方かもしれません。

これらのプランには、あまり知られていない**強力な「GCP（Google Cloud Platform）クレジット特典」** が付帯しています。

今回は、この「毎月もらえるクレジット」を活用して、今話題の自律型コーディングAI **「Claude Code」** を、Googleの最新エディタ **「Antigravity」** 上で**実質無料**で追加運用する技を紹介します。

### 更にGCPを初めて利用する方には・・・GCP初回利用時の特典

* **クレジット額:** **$300 分**（約45,000円相当）
* **有効期限:** **90日間**
* **対象:** GCPの新規利用ユーザー

最初の3ヶ月間は一定額までコストを気にせず各種サービスを試すことができます。



---

<details><summary>【コラム】そもそも「Vertex AI」とか「GCP」って何？
</summary>

今回の記事に出てきた用語、ちょっと難しそうに聞こえますよね。
ここでは、**「巨大な芸能事務所」** に例えて、ざっくりと解説します！

#### 1. GCP (Google Cloud Platform)

**＝「Googleが貸してくれる、巨大なスタジオ兼オフィスビル」**

Googleが世界中に持っているスーパーコンピューターや設備を、私たち一般人が時間貸しで使えるサービスです。今回の「AI特典」は、このビルの利用料として使えるチケットのようなものです。

#### 2. Vertex AI (バーテックス エーアイ)

**＝「AI専用の特別作業ルーム」**

GCPという巨大ビルの中にある、**「AIを使うための道具が全部そろった部屋」** です。
これまでは、AIを使うには自分でサーバーを立てたり、難しいプログラムを組んだりする必要がありましたが、Vertex AIという部屋に行けば、ボタン一つで最新のAIを呼び出して使えます。

#### 3. Model Garden (モデルガーデン)

**＝「AIタレント名鑑（カタログ）」**

Vertex AIの中で、「どのAIを使いますか？」と選べるカタログです。
ここには、Googleが育てたAIだけでなく、他社の優秀なAIも登録されています。

* **Gemini (ジェミニ):**
Googleが生んだ万能の天才タレント。文章も、画像も、動画も理解できるマルチな才能を持っています。
* **Claude (クロード):**
Anthropic社からスカウトされた外部の天才タレント。特に「プログラミング」や「自然な日本語」が得意で、エンジニアに大人気です。
* **Imagen (イマジェン):**
絵を描くのが得意な芸術家AI。

#### まとめると…

今回の記事で紹介した「Antigravity × Claude Code」の裏技は、

> **「Googleのビル（GCP）」にある「AI専用ルーム（Vertex AI）」で、「外部の天才（Claude）」を指名して仕事を頼む。その料金を「Googleからもらったチケット（特典）」で支払う。**

という仕組みなんです。
こう考えると、少し身近に感じませんか？

</details>

---

プロジェクト番号はGCPのプロジェクトページに表示されている

GCPダッシュボードメニュー画面
👇️左下のVertexAI＞右のModel Gardenを選択して希望するAIを有効化する必要があります。

![スクリーンショット 2026-03-08 041318.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1c9fb464-6e0c-4463-b591-34407dd27c64.png)


powershell

```terminal
# 作業中のプロジェクト: 2026 masakinihirota ＜＜プロジェクト名
# 番号: 10***************            ＜＜プロジェクト番号
# ID: masakinihirota               ＜＜これがプロジェクトID

# ログイン
gcloud auth login
gcloud auth application-default login

# 設定
gcloud config set project masakinihirota
gcloud services enable aiplatform.googleapis.com

# ID指定
$env:ANTHROPIC_VERTEX_PROJECT_ID="masakinihirota"

# プロジェクトIDを設定（ご自身のIDに書き換えてください）
$env:CLAUDE_CODE_VERTEX_AI_PROJECT_ID="masakinihirota"

# リージョンを設定（日本なら "asia-northeast1" ）
$env:CLAUDE_CODE_VERTEX_AI_PROJECT_ID="masakinihirota"
$env:CLAUDE_CODE_VERTEX_AI_REGION="asia-northeast1"

$env:CLAUDE_CODE_USE_VERTEX="1"
$env:CLOUD_ML_REGION="global"
$env:ANTHROPIC_VERTEX_PROJECT_ID="masakinihirota"
$env:VERTEX_REGION_CLAUDE_3_5_HAIKU="asia-northeast1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-6"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5@20251001"

```


# Google GCP初回特典で4.5万円の軍資金をゲットし、Claude CodeをVertex AIで動かすまで

Google Developer Programのプレミアム特典をフル活用して、最強のAIエンジニアリングツール「Claude Code」を爆速でセットアップする手順をまとめました。Windowsユーザー特有の「罠」についても詳しく解説します。

## Step 1: 全ての始まりは「プレミアム バッジ」から

まず、Google Developer Programで**プレミアム ティア バッジ**を獲得するところから物語が始まります。

* **アクティビティの謎:** プログラムに参加すると、Google Cloud（GCP）のアクティビティに「すべての保存されたページを表示」という項目が出現します。
* **正体:** これは単なる履歴ではなく、膨大なGCPサービスの中から自分が必要なドキュメントやリソースを即座に呼び出すための**「開発者専用ブックマーク」**です。

## Step 2: 4.5万円の「軍資金」を確保する

プレミアム特典として「10ドルのクレジット」がもらえると聞いて管理画面を覗くと、驚きの光景が待っていました。

* **クレジットの確認:** 特典を有効化すると、画面には **「¥45,854 クレジット残高」** の表示が！
* **有効期限に注意:** この強力なバフには期限があります（私の場合、約2ヶ月半後の2026年5月25日まで）。
* **攻略ポイント:** クレジットは自動適用されません。必ず「特典（Benefits）」ページから**「申し込む（Apply）」**をクリックし、自分のプロジェクトに紐づける必要があります。

## Step 3: Google Cloud側でのClaude有効化

Claude Codeを動かす前に、Google Cloud（Vertex AI）側で「Claudeを使っていいよ」という許可設定が必要です。

1. **プロジェクトの準備:** `2026-masakinihirota` のようなプロジェクトを作成します。
2. **モデルへのアクセス申請:** Vertex AIの「Model Garden」でClaude（Sonnet 4.6など）を探し、利用規約に同意します。
* **ここで失敗しやすい点:** 「想定ユーザー」の選択肢が出ます。個人開発や自作サービスなら `external customer or users` を含めておくと無難です。



## Step 4: 【最難関】PCの環境設定（PowerShellの罠）

ここが一番のハマりポイントでした。公式サイトの手順をそのまま打ってもエラーが出る場合があります。

### ❌ 失敗したコマンド（Mac/Linux用を混ぜてしまった）

```bash
export CLOUD_ML_REGION=global  # エラー：exportなんてコマンド知らないよ！
$env:ANTHROPIC_VERTEX_PROJECT_ID=masakinihirota # エラー：引用符がないから実行ファイルだと勘違い！

```

### ✅ 成功したコマンド（Windows PowerShell用）

PowerShellでは、値を必ず **`" "`（引用符）** で囲むのが鉄則です。

```powershell
# 1. Google Cloudにログイン
gcloud auth login
gcloud auth application-default login

# 2. 環境変数をセット（一気にコピペでOK）
$env:CLAUDE_CODE_USE_VERTEX="1"
$env:ANTHROPIC_VERTEX_PROJECT_ID="2026-masakinihirota"
$env:CLOUD_ML_REGION="us-central1"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6"

```

## Step 5: Claude Codeの起動と操作

設定が終われば、ターミナルで `claude` と打つだけです。

* **起動時の儀式:** 「Security notes」が表示されたら **Enterキー** を押して進みます。
* **モデルの選び方:** 途中でモデルを変えたいときは `/model opus` や `/model haiku` と打てば瞬時に切り替わります。
* **ファイルの指定:** ドラッグ＆ドロップはできませんが、`/add [パス]` でファイルを読み込ませるか、単にチャットで「このファイルを直して」と伝えるだけでAIがコードを書き始めます。

## 最後に：キャッシュ設定はどうする？

設定項目に `$env:DISABLE_PROMPT_CACHING="1"` というのがありましたが、**これは設定しなくてOK** です。
キャッシュを有効にしておけば、2回目以降のやり取りが爆速になり、せっかくのクレジットの消費も抑えられます。

---

**公式ドキュメント（困った時はここ）:**
[Claude Code on Google Vertex AI](https://code.claude.com/docs/en/google-vertex-ai)

## 嬉しい誤算：10ドルのつもりが 4.5万円！？

「プレミアム ティアなら10ドルのクレジットが使える」と聞き、設定を進めたところ、画面には **「¥45,854 クレジット残高」** の文字が。
無料トライアルやプロモーションが重なり、個人開発には十分すぎる軍資金を確保できました。
※GCPを始めた人用の+300ドル分(有効期間3ヶ月のみ)

---

## 1. 特典でもらえるお得な正体

あなたが契約している（あるいは検討している）プランで、毎月どれくらいの「開発資金」がもらえるのかを確認しましょう。この特典は、私たち個人のエンジニアの財布にとって非常に貴重です。

| プラン名 | 月額料金 | GCPクレジット特典 | その他の主な機能 |
| --- | --- | --- | --- |
| **AI Pro** | 2,900円 | **毎月 $10**<br>(約1,500円分) | Antigravity, 2TBストレージ, Flow, Whisk, Jules, 1,000 AI <br>※初月無料 |
| **AI Ultra** | 36,400円 | **毎月 $100**<br>(約15,000円分) | Antigravity, 30TBストレージ, Deep Think, Veo 3, Mariner, YouTube Premium, 25,000 AI <br>※最初の3ヶ月は半額 |

**AI Proの「$10」** とはいえ、個人開発レベルではかなりの量です。Claude 3.5 SonnetやOpusなどの高性能モデルでも、相当な量のコードを読み書きさせることができます。

そして**AI Ultraプランの「$100」** なら、スタートアップの開発合宿レベルで使い倒してもお釣りがくるでしょう。これを使わない手はありません。

---

## 2. なぜ「Antigravity × Claude Code」なのか？

この構成の凄さは、**「最強の作業環境」と「最強のAI社員」を、「Googleの財布」** で雇える点にあります。

1. **Antigravity (IDE)**: Googleが提供する最新のクラウド型エディタ。環境構築が不要で爆速。
2. **Claude Code (CLI)**: Anthropic社の自律型AI。「バグを直して」「テストを書いて」と命令するだけで、ファイルを編集し、コマンドを実行してくれる「AI社員」。
3. **Vertex AI (Model Garden)**: ここがキモです。Claude Codeのバックエンド（頭脳）を、Anthropic直接契約ではなくGoogle Cloud経由にすることで、**支払いを「特典クレジット」で相殺**します。

### Vertex AI経由で使うメリット

* Google Cloudの請求・予算管理で使える（Anthropicへの直接課金が不要）。
* Vertex AIのログ、監視、セキュリティ設定をそのまま利用可能。
* クォータやレイテンシの面で有利になる場合がある。

---

## 3. 【重要】特典を受け取るための必須設定

クレジットは自動的に降ってくるわけではありません。ここが落とし穴です。
利用開始前に、以下の手順で **「紐づけ」** を行う必要があります。

1. **GCP請求先アカウントの作成**
Google Cloud Consoleで請求先情報を登録します（クレジットカード登録が必要ですが、クレジット分までは請求されません）。
2. **プロフィールの紐づけ**
[Google Cloud Console](https://console.cloud.google.com/) にアクセスし、自分のGoogleアカウントとDeveloperプロフィールを紐づけます。
3. **特典の確認**
Google Cloud Consoleの「課金」→「クレジット」に、対象の金額（$10 または $100）が反映されているか確認します。

---

## 4. 実践：特典でClaude Codeを使えるようにしてもらう手順

環境が整ったら、あとはAntigravityを起動して設定するだけです。

### STEP 1: Vertex AI で Claude を有効化

GCPコンソールの「Vertex AI Model Garden」で、Claudeモデル（Sonnetなど）の使用を申請・有効にします。
※初回はモデルアクセス承認に数分〜数時間かかることがあります。また、使用するリージョン（us-central1など）とモデルの組み合わせに注意してください。

### STEP 2: Antigravity のターミナルで Claude Code をインストール

Antigravityのターミナルを開き、以下のコマンドでインストールを実行します（Mac/Linux/WSL環境の例）。

**前提条件：**

* Google Cloud CLI (`gcloud`) がインストール・認証済み（`gcloud auth login` と `gcloud auth application-default login` を実行）
* GCPプロジェクトで Vertex AI API が有効化済み（`gcloud services enable aiplatform.googleapis.com`）
* Vertex AI Model Garden から Claude モデルのアクセス承認が完了していること

**インストールコマンド：**

```bash
# インストールスクリプトを使用する場合
curl -fsSL https://claude.ai/install.sh | bash

# または npm経由の場合
npm install -g @anthropic-ai/claude-code

```

インストール後、`claude --version` で確認してください。

### STEP 3: Vertex AI への接続設定

Claude Code CLI を Vertex AI に接続する設定を行います（2026年現在の公式ベース）。

#### 方法A：環境変数を設定（推奨・最もシンプル）

シェル（`.zshrc` / `.bashrc` など）に以下を追加、またはターミナルで直接 `export` します。

```bash
# Vertex AI を有効化（これでデフォルトの Anthropic API から切り替え）
export CLAUDE_CODE_USE_VERTEX=1

# GCP プロジェクト ID（自分のものを入れる）
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id-here

# リージョン（global が基本、モデルによっては us-east5 / us-central1 など）
export CLOUD_ML_REGION=global

# オプション：プロンプトキャッシュを無効化（クォータ節約や安定性向上に有効）
# export DISABLE_PROMPT_CACHING=1

# オプション：特定モデル用のリージョンオーバーライド（必要に応じて）
# export VERTEX_REGION_CLAUDE_3_5_SONNET=us-east5

```

設定後は必ずシェルを再読み込みしてください。

```bash
source ~/.zshrc    # または ~/.bashrc

```

#### 方法B：設定ファイルで管理

`~/.claude/settings.json` を作成または編集して管理することも可能です。

```json
{
  "env": {
    "CLAUDE_CODE_USE_VERTEX": 1,
    "ANTHROPIC_VERTEX_PROJECT_ID": "your-project-id-here",
    "CLOUD_ML_REGION": "global",
    "DISABLE_PROMPT_CACHING": 1
  }
}

```

※保存後、Claude Code を再起動してください。

### STEP 4: 動作確認

ターミナルで以下を実行し、Vertex AI 経由で応答が返ってくれば成功です。

```bash
claude "どのプロバイダーを使っていますか？"

```

### 注意点

* **リージョン:** モデルによって制限があります（例: 一部モデルは `global` 非対応 → `us-east5` などに変更が必要）。
* **初期設定:** 初回はモデルアクセス承認待ちやクォータ制限に注意してください。
* **認証:** 認証は `gcloud` の Application Default Credentials を使用するため、別途 `gcloud auth application-default login` が必須です。

---

## まとめ

Google AI Pro / Ultra プランは、単なる「Antigravityが使えるサブスク」ではありません。
**「毎月$10〜$100分の計算リソースが支給される開発者支援プラン」**という側面があります。

契約を検討する際、または既に契約している場合、この特典は非常に大きなポイントになります。
Antigravityという最高のオフィスで、Claudeという最高の相棒と、コストを気にせず開発に没頭してみませんか？

**参考サイト・出典：**

* [【GCP利用者目線】Google One プラン一覧とAI Pro/Ultra契約内容の詳細まとめ | Midori Tech Briefing](https://yosuke4061.com/new_toppage/briefings/brief020/)
* [Claude Code Setup Guide](https://code.claude.com/docs/ja/setup)