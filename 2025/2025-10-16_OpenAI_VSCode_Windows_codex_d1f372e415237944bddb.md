<!--
title:   OpenAI Codex IDE拡張機能 (VSCode用) の導入と活用ガイド 有料会員用
tags:    OpenAI,VSCode,Windows,codex,拡張機能
id:      d1f372e415237944bddb
private: false
-->
# VSCodeで実現するAIペアプログラミング

今まではブラウザで使っていたChatGPT
ChatGPT
https://chatgpt.com/ja-JP/

これをVSCodeから直接使えるようになります。
そのための拡張機能です。

:::note

ChatGPT 料金設定
https://chatgpt.com/ja-JP/pricing/

使用するにはPlus,Proプランが必要です。

Plusプラン 20$/月(月3000円)
Proプラン 200$/月(月3万円)
$=150円計算

:::

Windows環境で開発を行っている皆さん、AIによるコーディング支援を最大限に活用できていますか？

OpenAIの強力なコーディングエージェント「Codex」をVS Codeに統合する「Codex IDE拡張機能」は、開発プロセスを一変させる可能性を秘めています。本記事では、この拡張機能の概要から、**特にWindowsユーザーが最高の体験を得るためのセットアップ方法**、そしてその強力な機能群までを詳しく解説します。

## 1. Codex IDE拡張機能とは？

Codexは、OpenAIが開発した**コーディングエージェント**であり、単なるコード補完以上の能力を持っています。この拡張機能を導入することで、CodexはIDE内で**コードを読み取り、修正し、実行する**ことが可能になります。

Codexは、開発者が「より速く構築し、バグを潰し、慣れないコードを理解する」のを助けることで、ペアプログラミングのように機能します。

**主な利用シーン（導入によるメリット）**：

*   関数やコンポーネントの自動生成
*   既存コードの説明・コメント生成
*   単体テストやモックの生成
*   小さなリファクタリング案の提示
*   エラー箇所の原因推定と修正案提示

## 2. Windows VS Codeでの導入とセットアップ

Codex IDE拡張機能は、VS Codeのマーケットプレイスから入手できます。

Codex IDE extension
https://developers.openai.com/codex/ide/

👆️「Download for Visual Studio Code」のリンクをクリックします。

![スクリーンショット 2025-10-16 191939.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ccddccd9-dd48-4c9a-89e0-45bdea337de1.png)



### 重要な前提：WSLワークスペースの利用推奨

現在、Codex VS Code拡張機能はmacOSとLinuxで利用可能であり、**Windowsサポートはまだ実験的**です。

Windows環境で最適な体験を得るためには、**WSL（Windows Subsystem for Linux）ワークスペース内**でCodexを使用することが強く推奨されています。セットアップの際は、専用のWindowsセットアップガイドを参照するか、VS Code + WSLに関するMicrosoftのドキュメントを参照してください。

### 拡張機能のインストールと配置

1.  **インストール**：Visual Studio Code marketplace、またはVisual Studio Code Insiders用のダウンロードリンクから拡張機能を入手します。
2.  **VS Codeの再起動**：VS Codeを使用している場合、インストール後に拡張機能が左側のサイドバーに表示されない場合は、**再起動が必要になる場合があります**。
3.  **配置**：拡張機能は、他の拡張機能の隣、左側のサイドバーに表示されます。よりアクセスしやすくするため、VS CodeではCodexアイコンを**クリック＆ドラッグしてエディター画面の右側に移動させ、右側のサイドバーに配置する**ことができます。
4.  **サインイン**：インストール後、**ChatGPTアカウント**でのサインインが求められます。推奨される方法であり、ChatGPTプランに含まれる利用クレジットを使用できるため、追加の設定なしでCodexを利用できます。APIキーを使用する場合は、追加の設定が必要です。

![スクリーンショット 2025-10-16 191646.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/49fd9cf5-77bf-4a82-8b06-cecdefc7f739.png)

![スクリーンショット 2025-10-16 191824.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1d9d4018-2e0c-44f4-b1d4-450041577c53.png)

導入が完了すると、開いているファイルや選択されたコードのコンテキストを利用し、より短いプロンプトで、迅速かつ関連性の高い結果を得ながら、**シームレスにチャット、編集、変更のプレビュー**を行えます。

## 3. 強力なエージェント機能を使いこなす

Codexは単なる補完機能ではなく、高度な設定を通じてその動作を制御できます。

### コンテキストの活用とショートカット

*   **ファイル参照**：プロンプト内でファイルをタグ付けして参照できます（例：`@example.tsx`）。
*   **ショートカット**：Codexチャットの切り替えや、Codexコンテキストへの追加など、一連のコマンドが提供されており、IDE設定でキーボードショートカットとして割り当てることができます。

### モデルと推論労力の調整

1.  **モデルの切り替え**：デフォルトはGPT-5ですが、エージェント的コーディングに最適化された最新モデルである**GPT-5-Codex**に切り替えることが推奨されています。
2.  **推論の労力（Reasoning Effort）**：Codexが回答する前にどれだけ「考える」かを調整できます。
    *   **高**に設定すると、回答に時間はかかりますが、より複雑なタスクを実行できます。
    *   単純なタスクでスピードが必要な場合は、**低**を使用できます。

### 承認モード（Approval Modes）

Codexがコンピューター上で実行できる操作を制御します。

1.  **Agent (エージェント) — デフォルト**：
    作業ディレクトリ内でファイルの読み取り、編集、コマンドの自動実行が可能です。ただし、作業ディレクトリ外の作業やインターネットアクセスにはユーザーの承認が必要です。
2.  **Chat (チャット)**：
    単に会話や計画を立てたい場合に切り替えます。
3.  **Agent (Full Access) (エージェント（フルアクセス）)**：
    承認なしでファイル読み取り、編集、ネットワークアクセスを含むコマンド実行を許可しますが、**使用には注意が必要**です。

## 4. セキュリティと運用上の注意点

Windows/WSL環境でCodexを利用する際も、以下のセキュリティガイドラインを厳守してください。

*   **出力の検証**：生成されたコードのセキュリティや正確性については、必ず**人がレビュー**してからマージしてください。
*   **機密情報の送信禁止**：コードやコメントにシークレット、個人情報、プロダクションの接続文字列などの**機密情報**が含まれている場合、IDEからモデルへ送信される恐れがあるため、事前に除去またはマスクしてください。
*   **APIキー管理**：APIキーを拡張に直接登録する場合は、ローカルの安全なストレージや環境変数を使い、**キーをリポジトリに含めない**ことが重要です。

---

## 🧠 GPT-5-Codex とは？

* GPT-5-Codex は、**GPT-5 のバリエーション**で、**ソフトウェア工学／コーディングタスク**に特化して最適化されたモデルです。([OpenAI][1])
* コード実装、リファクタリング、バグ修正、統合テスト、コードレビューなど、より複雑な開発ワークフローを自律的に処理する能力を強化されているとのことです。([OpenAI][1])
* 小さなタスクでは素早く結果を出し、大きな複雑なタスクではより思考時間をかけて取り組むよう、**処理の深さ（reasoning effort）を動的に調整する**よう設計されています。([OpenAI][1])
* また、コードレビュー機能を重視しており、重大なバグを事前に検出できる能力を持つように訓練されているとの説明もあります。([OpenAI][1])
* GitHub Copilot にもこの GPT-5-Codex が統合されつつあり、IDE 内で選択可能というアナウンスも公開されています。([The GitHub Blog][2])


Codex IDE extension
https://developers.openai.com/codex/ide



[1]: https://openai.com/index/introducing-upgrades-to-codex/?utm_source=chatgpt.com "Introducing upgrades to Codex"
[2]: https://github.blog/changelog/2025-09-23-openai-gpt-5-codex-is-rolling-out-in-public-preview-for-github-copilot/?utm_source=chatgpt.com "OpenAI GPT-5-Codex is rolling out in public preview for ..."

---

👇️最初は左側に表示されます。

![スクリーンショット 2025-10-16 193539.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/a61e54b9-1122-4486-af85-2c4108aa5585.png)

👇️左上のCODEXあたりをマウスでドラッグアンドドロップで右側へ移動しました。
![スクリーンショット 2025-10-16 193600.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b7a3c740-2c35-42a5-9e7c-63c14602eae7.png)

👇️下側のモデル名からメニューが開き、モデル選択が出来ます。
![スクリーンショット 2025-10-16 193921.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/1653e1e4-8ce5-49f3-9a5e-174ba8ea6bb1.png)



---


Codex IDE拡張機能は、「IDE内で直接的にモデルを操る」強力なツールです。Windows環境の方はWSLを活用し、このAIエージェントの能力を最大限に引き出して、開発効率を向上させましょう。