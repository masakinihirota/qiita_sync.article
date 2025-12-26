<!--
title:   VSCode 拡張機能紹介「Wuunu」GitHub CopilotなどのAIから指示が可能なブラウザ上動作するGUIビジュアルエディタ。 ビジュアル調整 → 差分確認 → コミット、すべてブラウザ内で完結！ GitHub Copilot、Claude Code CLI、Codex CLI、Cursor CLI対応 Next.js React (Vite) Svelte その他 無料
tags:    GitHubCopilot,Next.js,VSCode,Wuunu
id:      c5823fab7a82eeffbafe
private: false
-->
一言感想 まるで、CursorやFigmaのGUI編集のようだ、IDEとブラウザだけで完結する時代に突入か？

## はじめに

普段、VS CodeとGitHub Copilotを使って開発をしている皆さん、こんな悩みはありませんか？

「AIにコードを書いてもらうのは速いけど、**画面を見ながら直感的にアプリを組み立てたい**」
「チャットとプレビュー画面を行き来するのが面倒」

そんな「開発者に欠けていたGUI（ビジュアルエディタ）」 を解決してくれる拡張機能が登場しました。それが、**Wuunu AI App Builder Extension** です。

今回は、あらゆるフレームワークやコーディングエージェント（Copilotなど）と連携できるこのツールについて、Next.jsでの利用も想定しながら紹介します。


![wuunu-intro_720w_15fps.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/f9233b9a-5302-42a4-963b-602888aa2ed6.gif)



XユーザーのWesleyさん: 「Just added visual editing for any coding agent. Works with your: ✅ Claude Code CLI ✅ Codex CLI ✅ GitHub Copilot ✅ Cursor CLI Make visual tweaks -&gt; view diffs -&gt; commit, all in the browser! Works with your app framework of choice: ✅ Next.js ✅ React (Vite) ✅ Svelte / X

https://x.com/wesley_bytegrad/status/2004207672552305149

あらゆるコーディングエージェント向けにビジュアル編集機能を追加しました。以下のツールと連携します：
✅ Claude Code CLI
✅ Codex CLI
✅ GitHub Copilot
✅ Cursor CLI

ビジュアル調整 → 差分確認 → コミット、すべてブラウザ内で完結！

お好みのアプリフレームワークに対応：
✅ Next.js
✅ React (Vite)
✅ Svelte
✅ Angular
✅ その他フレームワーク (.NET, Ruby など)

Cursorのビジュアルエディタがお気に入りなら、ぜひお試しください！



# 使い方

拡張機能をインストールする、するとダッシュボードが立ち上がります。

http://127.0.0.1:59865/

![スクリーンショット 2025-12-26 095501.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/a0851f2d-6326-417f-903c-21c277800791.png)

👆️このダッシュボードを閉じたとしても

![スクリーンショット 2025-12-26 100901.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/978f6694-f754-4047-a6fc-0d76a78a101d.png)


👆️左サイドバーメニューから立ち上がります。


お試し用として、新しくNext.js をクリーンインストールします。

```terminal
pnpm dlx create-next-app@latest wuunu-test --yes

```

※インストール後に`npm run dev` を立ち上げないでOKです。


Next.jsをインストール終了後、左サイドバーメニューから拡張機能「Wuunu」を立ち上げます。
すると、普段使っているブラウザが立ち上がりWuunuのダッシュボードが開きます。

http://127.0.0.1:64257/

👆️ここで開きます。



### 1 立ち上げ直後 ブラウザが開きます。

![01 立ち上げ直後.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/bba0e068-6f0d-465b-a354-bbd0c721cbb9.png)

👆️編集したいNext.jsを選び、アプリ名をクリックすると、その対象アプリが開きます。

![スクリーンショット 2025-12-26 101852.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/0dea758d-14a3-4103-b691-8c137036d66e.png)

👆️しばらく待ちます。(30秒ぐらいでした)

### 2 立ち上がり直後の画面

👇️左側にNext.jsのアプリが、右側にAIの作業エリアが開きます。

![02 場所指定.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9df4b25a-9100-467e-9dbf-8522ef367c3f.png)

👆️ブラウザ上でVSCodeのGitHub Copilotのような真似が出来ます。

1. まずは1でselectモード？にします。
2. GUIで画面上の要素を指定します。
※エスケープキーを押すとキャンセルできます。

### 3 編集前

![03 編集前.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/98ff53c9-1aca-4043-a4ed-3e3b018432df.png)

👆️AIチャット欄(GitHub Copilot)で編集します。
領域を指定すると右側に編集UIが表示されます。
編集を直接したり、AIに指示できます。

今回はAI(GitHub Copilot) に編集を指示しました。
「日本語で見やすくカラフルにして」

チャット送信ボタンを押します。


### 4 編集結果

![04 編集結果.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/91879bfd-f353-4dcc-986d-e5a317b5c087.png)

指定した領域のちょっと上の方までカラフルになってしまいました、後で直しましょう。


### 5 編集結果の確認

```terminal
npm run dev

```

👆️devモードで立ち上げ反映されているかを確認します。

http://localhost:3000/

👆️をDevモードを開く

ちゃんと反映されていますね。

👇️localhost:3000を開く時に、「Wuunu」の方は閉じてしまったので、右上に警告が出ています。これは

![スクリーンショット 2025-12-26 104934.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/5fc111a6-df2f-40b5-92ae-d37b4d39f003.png)

👆️右上の赤い文字は 「Wuunu」を閉じて停止してしばらくすると出てきます。

```text
Did not receive any chat update for a while, this may simply be an Internet connectivity issue or your agent has stopped working... We recommend waiting a bit and if nothing happens, cancelling and retrying if nothing happens.

```

```text
しばらくチャットの更新が届きません。これは単純にインターネット接続の問題か、エージェントが動作を停止している可能性があります...しばらくお待ちいただき、何も変化がない場合はキャンセルして再試行することをお勧めします。

```



以上で基本的な使い方は終了です。

このままでは物足りないのでNotebookLMにソースを突っ込んで👇️Blog記事を書いてもらいました。




NotebookLM解説

## Wuunu AI App Builder 拡張機能 とは？

Wuunuは、VS Code用の**「無料のローカルホストAIアプリビルダー」**です。

最大の特徴は、ブラウザ上で直接AIを使ってアプリを構築できる点です。開発者のWesley氏によると、これは**「開発者にとって欠けているGUI / ビジュアルエディタ」**として作られました。

### 主なメリット
*   **完全無料**: ローカルホスト環境で動作する無料ツールです。
*   **フレームワークを選ばない**: Next.jsを含むあらゆるアプリフレームワークに対応しています。
*   **コーディングエージェントと連携**: GitHub Copilotなどのコーディングエージェントと一緒に使えます。

## GitHub Copilot × Next.js でどう使う？

Wuunuは単なるプレビューツールではありません。**コーディングエージェントへのプロンプト送信を自動化**することができます。

例えば、Next.jsでフロントエンドを作っている際、Wuunuのビジュアルインターフェースを通じて指示を出し、裏側でCopilotなどのエージェントにコードを書かせるといったワークフローが可能になります。

### セットアップ手順（Quick Start）

使い方は非常にシンプルです。

1.  **インストール**:
    VS Codeの `Quick Open` (Ctrl+P) を開き、以下のコマンドを入力してインストールします。
    `bash
    ext install Wuunu.wuunu-ai-app-builder
    `

2.  **ダッシュボードを開く**:
    インストール後、サイドバーにあるWuunuアイコンをクリックし、ブラウザでダッシュボードを開きます。

3.  **アプリと連携する**:
    ダッシュボードから「新しいアプリを作成」するか「既存のアプリを開く」を選択します。
    Next.jsなどのサポートされているフレームワークであれば、**Wuunuのスニペット（ `<script>` タグなど）が自動的にアプリに挿入されます**。
    *もし自動挿入されない場合は、ダッシュボード下部にあるスニペットを手動でコードに追加してください。*

4.  **ウィジェットの確認**:
    アプリ内にウィジェットが表示されない場合は、`<script>` が正しくコード内にあるか確認してください。

## 知っておくべき注意点とTips

導入する前に、いくつか押さえておきたいポイントがあります。

*   **セキュリティと制限**:
    Wuunuはコーディングエージェントを呼び出す際、安全性を重視して慎重な設定を推奨しています。そのため、一部の操作（エージェントが特定の許可を求める場合など）はチャットインターフェースから承認できず、手動で行う必要がある場合があります。
*   **ベータ版のような扱い**:
    現在、頻繁にアップデートが行われています。伝統的なセマンティックバージョニング（semver）には従っていないため、**ベータ版ソフトウェア**として扱い、こまめな更新を確認することをお勧めします。
*   **常識的な運用を**:
    ホームディレクトリなどの重要なディレクトリを誤って開いたり操作したりしないよう、通常の開発同様に注意してください。

## まとめ：開発体験を視覚化しよう

Wuunuは、VS Code上のテキストベースのコーディング（Copilot）と、実際のアプリ画面（ブラウザ）の間にある「壁」を取り払ってくれるツールです。

Next.jsのようなモダンなフレームワークを使っているなら、**「エージェントにコードを書かせて、Wuunuで視覚的に操作する」**という新しい開発体験を、ぜひ無料で試してみてください。

**リンク:**
*   [Visual Studio Marketplace: Wuunu AI App Builder Extension]
*   質問やフィードバック: support@wuunu.com

***

### 開発者へのアナロジー
Wuunuは、**「AIのためのWebサイトビルダー（WixやWordPressのビジュアルエディタ）」を、あなたのローカル開発環境（VS Code）に持ち込むもの**と考えると分かりやすいでしょう。ただし、裏側で動いているのはブラックボックスなシステムではなく、あなたが普段使っているNext.jsのコードとGitHub Copilotです。

### ヒントとベストプラクティス

* Wuunu を使用すると、コーディングエージェントへの送信プロンプトを自動化できます。コーディングエージェントには安全な設定を使用することをお勧めします。
* コーディングエージェントの呼び出しは慎重に行うよう努めており、一部のユーザーがコーディングエージェント自体を使用する方法よりも制限が厳しくなっています。そのため、コーディングエージェントが特定の状況でユーザーの許可を必要とする場合など、現時点ではチャットインターフェースから承認できない場合があります。必要に応じて、手動で承認する必要があります。ただし、これはコーディングエージェントによって異なり、安全な方法でより多くの機能を実現できるよう継続的に取り組んでいます。
* Wuunu を使用しない場合と同じ常識に従うことをお勧めします。たとえば、IDE またはコーディング エージェントで重要なディレクトリ (ホームなど) を使用したり開いたりしないでください。
* 定期的にアップデートを公開していますので、バージョンを最新の状態に保ってください。現時点では従来のSEM Verには準拠していませんが、変更される可能性があります。現在はベータ版ソフトウェアとして扱い、頻繁なアップデートを予定してください。