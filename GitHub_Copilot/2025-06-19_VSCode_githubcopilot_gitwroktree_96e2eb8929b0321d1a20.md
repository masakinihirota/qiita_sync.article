<!--
title:   手動AI並列開発： Git Wroktree と GitHub Copilot と VSCode を用いた開発
tags:    VSCode,githubcopilot,gitwroktree
id:      96e2eb8929b0321d1a20
private: false
-->
# 追記 2025年8月10日

VSCodeがGit Wroktreeのサポートをしました。

2025年7月（バージョン1.103）

https://code.visualstudio.com/updates/v1_103#_git-worktree-support

ワークツリーを使用すると、複数のブランチを一度にチェックアウトできるため、コンテキストを切り替えることなく変更をテストしたり、並行して作業したりすることが容易になります。

Gitリポジトリを含むフォルダまたはワークスペースを開くと、ワークツリーが自動的に検出され、ソース管理リポジトリビューに表示されるようになりました。

コマンドパレットまたはソース管理リポジトリビューから利用可能なコマンドを使用して、新しいウィンドウまたは現在のウィンドウでワークツリーを表示、作成、削除、開くことができます。

追記終了






# 要約

やることはシンプルです。

`git worktree`コマンドを使って開発用等の複数のブランチをつくり、
ブランチごとにコピーとインストールを行います。
(実際に動作確認をする場合は `git worktree` でブランチを作る場合、再構築が必要です。.envのコピーなど)

それぞれを別々のVSCodeウィンドウを立ち上げ、
それぞれのチャット欄からGitHub Copilotに指示を与えて、＜＜ここで並列に指示が可能
成果物をチェック
mainブランチにマージし
コンフリクトが起きたら、それもGitHub Copilotに対処してもらいます。
以上を繰り返します。

途中で、生成AIでコードのテストを先に書いて、テスト駆動開発で開発をしても良いです。

`git worktree` を使う時に、VSCodeの拡張機能やCLIツールを利用して、作業の負担を減らします。

![git worktree2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b147f480-bee6-4a4f-8ce7-b9729994abd8.png)

# GitHub Copilotシリーズ

https://qiita.com/masakinihirota/items/0e58a6b921e4420a2882

https://qiita.com/masakinihirota/items/c9df9de0c7326280bfae

https://qiita.com/masakinihirota/items/61f8a26546f4139c353c

https://qiita.com/masakinihirota/items/1694715063247574467d

https://qiita.com/masakinihirota/items/247bee4bd66ace86e1da

https://qiita.com/masakinihirota/items/b5ae692191d197eb5ad7

https://qiita.com/masakinihirota/items/8971aa8ccead3193e77f

https://qiita.com/masakinihirota/items/96e2eb8929b0321d1a20

https://qiita.com/masakinihirota/items/a2c0ef5e6f9a0aa868d1

https://qiita.com/masakinihirota/items/a925a2b68ab8374c7fd0


## スライド

git worktreeの使い方を中心に解説したスライドです。

https://rsayfhny.gensparkspace.com/

### スライドの作り方

gensparkのAIスライドで 「git worktreeの使い方を教えて」 と頼みます。

以上です。



## ブランチ数、ワーキングツリー(作業フォルダ)数の決め方

自分のPCのウィンドウ、ウィンドウコントロールツールで決める。
マウスジェスチャでウィンドウをコントロールできる数

例
デュアルディスプレイで、片側に2画面づつコントロールできるなら計４ブランチ(main＋作業ブランチ３)

手動AI並列開発の場合、作業用のブランチは2～3あれば十分だとおもいます。
人間側のチェックなどで、なんやかんや交互に行き来すると時間が足りなくなります。


----------------------------------------

## 用語集

### Git Worktree (ワーキングツリー)

一つのGitリポジトリから **複数のワーキングツリー（作業フォルダ）** を作成し、それぞれ異なるブランチで同時に作業を可能にするGitの機能です。ブランチ切り替え時の手間を省き、**並列作業** を効率化します。

### メインワーキングツリー

`git init` や `git clone` で作成される、実際にファイルが置いてあり、コードを編集するフォルダのことです。

### リンクドワーキングツリー

`git worktree add` コマンド で作成される同じリポジトリを参照する独立した作業空間となり、異なるブランチをチェックアウトしたり、実験的な変更を加えたりすることができます。

### ワーキングツリー（作業フォルダ） (Working Directory)

Gitリポジトリの特定のブランチのファイルが展開され、実際にコードを編集する場所。`git worktree`で複数作成できます。

### リポジトリ本体
Gitでバージョン管理されているプロジェクトの全ての履歴、ブランチ情報が格納されている実体（通常`.git`フォルダ内）です。ワーキングツリーを削除しても影響はありません。

### `git worktree list`
現在存在する全てのワーキングツリーとそのパス、関連ブランチを表示するコマンド。

### `git worktree add [パス] [ブランチ名]`
新しいワーキングツリーを作成するコマンド。指定したパスに新しいワーキングツリー（作業フォルダ）を作り、指定ブランチをチェックアウトします。

### `git worktree remove [パス]`
指定したワーキングツリー（作業フォルダ）をGit管理から外し、フォルダ自体も削除するコマンド。

### `.env`ファイル
環境設定を記述するファイル。`git worktree`で新しいワーキングツリーを作成しても自動でコピーされないため、手動でのコピーや設定が必要です。


## 参考

Git - git-worktree Documentation

https://git-scm.com/docs/git-worktree#_limitations



----------------------------------------

## 注意点

### ワーキングツリー（作業フォルダ）の削除

`git worktree`のワーキングツリー（作業フォルダ）を削除したとしても
ワーキングツリー（作業フォルダ）が削除されるだけで、
コミット済みの内容やリポジトリの本体の方は削除されません。

ただし、未コミットの変更部分は失われます。

### 1つのブランチの複数のworktreeのチェックアウト



----------------------------------------

## 初めに

**「自動」AI並列開発** 従量課金で開発 linux mac WSL2
と
**「手動」AI並列開発** 定額課金で開発 Windows linux mac その他

この記事は、「手動」AI並列開発のやり方を解説します。

Git Worktree と GitHub Copilot、VS Codeを組み合わせたAI並列開発の考え方、実践方法の記事です。

### 「自動」AI並列開発

従量課金で開発をしても良いという人は
Claude Code + tmux で **「自動」AI並列開発** が出来ます。
こちらがおすすめです。

Claude CodeをAPI経由で利用する場合は「従量課金制」（使った分だけ支払う方式）

Claude Codeを定額で使いたい場合は
Maxプラン（月額100～200ドル）
$100／月
$200／月
のサブスクリプション
を選択できます。
この2つのプランは、「たくさん使いたいがそこまでヘビーではない」ユーザーと、「業務や研究でほぼ一日中使い倒す」ヘビーユーザーの両方に対応
※完全な無制限ではありません。

Maxプランは従量課金の細かい心配なく、かなり多くのコード生成やAI作業ができますが、短期間に極端な大量利用をすると一時的に制限がかかります。



そこまでお金をかけられない人は👇

### 「手動」AI並列開発

GitHub Copilot ＋ VSCode で **「手動」AI並列開発** が出来ます。

※Windows環境の人
※WSL2を使えない人、macやlinux環境を用意できない人

肝は `git worktree` という機能を使い、複数のブランチを作成し、複数のVSCodeウィンドウ画面を立ち上げて開発を行います。

#### GitHub Copilot

Copilot Pro：年額100ドル（または月額10ドル）
Copilot Pro+：年額390ドル（または月額39ドル）


### 料金の比較

Claude Code とGitHub Copilotを比較すると
値段は約10倍差あります。
従量課金の場合は不明



## 利点

人の能力上限、PCの性能上限までAI並列開発が可能
VSCodeに課金済みなら後はすべて無料
Windowsでも簡単に準備可能
VSCodeのワークスペース機能で、設計書、コード、指示書のリポジトリを簡単にまとめることが可能です。

## 欠点

開発はすべてほぼ手動になります。
自動で開発を任せられない。
ワークスペースとブランチの管理が大変



## claude code + tumx

**「自動」AI並列開発**
もうすでに記事がたくさんあるので検索してください。


<details><summary>Claude Codeとは？</summary>

Claude Codeは、Anthropic社が開発した大規模言語モデル「Claude」を基盤とした、コード生成・管理に特化した開発ツールです。

## なぜVS CodeではなくClaude Codeを推すのか？

多くの開発者が使い慣れているVS Code（Visual Studio Code）もAI連携機能を強化していますが、AI並列開発においてClaude Codeが特に優位とされる理由は以下の点に集約されます。

### 1. プロジェクト全体を横断的に把握する能力

Claude Codeの最大の強みは、プロジェクト全体を横断的に理解し、整合性を保ったコードを生成できる点にあります。

* **変数宣言の最適化**: 従来のAIツールでは、ファイルごとに独立してコードを生成するため、例えば「変数A」を異なるファイルで重複して宣言してしまうといった非効率やエラーの原因となることがありました。
Claude Codeはプロジェクト全体を見通すため、このような重複を避け、最適なスコープで変数を宣言します。

* **関数とファイルの整合性**: 同様に、関数やファイルの定義においても、プロジェクト全体の構造と整合性を考慮して生成します。
これにより、モジュール間の依存関係が明確になり、可読性・保守性の高いコードベースが構築されます。

これまでのAIツールが「部分最適」に留まりがちだったのに対し、Claude Codeは「**全体最適**」を目指すことができるため、人間が手動で整合性を確認・修正する手間を大幅に削減できます。

### 2. 大規模プロジェクトへの対応力

Claude Codeは、**10万字を超えるような大規模なコードベースや、何十ものファイルに分割されたプロジェクトにも対応可能**です。

これは、従来のAIでは難しかった、複雑なシステム全体の設計意図を理解し、その中で整合性の取れたコードを生成する能力を示しています。

これにより、エンタープライズレベルのアプリケーション開発においても、AIの力を最大限に活用することが期待できます。

### 3. 人間の補助による高精度な開発

もちろん、Claude Codeが万能というわけではありません。特に複雑なロジックや高度な要件を持つシステムの場合、生成されたコードにエラーが含まれることもあります。

しかし、これはAI開発における避けられない側面であり、Claude Codeにおいても人間の開発者による補助が不可欠です。

人間が最終的な動作確認やデバッグを行うことで、AIが生成したコードの精度をさらに高め、信頼性の高いシステムを構築することができます。

Claude Codeは、人間の開発者とAIが協調して開発を進める「AI並列開発」の理想的な形を実現するツールと言えるでしょう。

Claude Codeは、プロジェクト全体を見通し、整合性の取れたコードを大規模に生成できるという点で、従来のAIツールや汎用エディタのAI連携機能とは一線を画します。

AI並列開発を本格的に導入し、開発効率と品質を飛躍的に向上させたいと考えるのであれば、Claude Codeは強力な選択肢となるでしょう。

</details>



----------------------------------------

AIエージェントが複数のタスクを同時に処理したり、人間の開発者がAIの提案と並列して別の作業を進めたりする場面が増える中で、従来の開発ワークフローでは**「ブランチの切り替え」や「コンテキストの切り替え」**に無駄な時間が発生しがちです。

そこで今回ご紹介したいのが、Gitの強力な機能である**「Git Worktree」**です。

git worktree は、1つのGitリポジトリに対して複数のワーキングツリー（作業フォルダ）を作成・管理するためのコマンドです。これにより、同時に複数のブランチで作業を進めることが可能になります。

`git init` や `git cloen`で作るのがメインワーキングツリーでコードを編集するフォルダです。

git worktree add コマンドを使うと、このメインワーキングツリーとは別に、同じリポジトリを参照するリンクドワーキングツリーを複数作成できます。それぞれのリンクドワーキングツリーは独立した作業空間となり、異なるブランチをチェックアウトしたり、実験的な変更を加えたりすることができます。









**「手動」AI並列開発** の肝であるgit worktreeの説明

# git worktreeの説明

手法として
* git stachを使う
* git cloneを使う
* git worktreeを使う
の3種類が思いつきます。

このなかで、AI並列開発に適しているのは
git worktreeになります。


| 方法             | Copilot同時利用環境  | 独立性 | リソース消費 | セットアップ難易度 | Git 操作 | VSCode拡張機能との親和性 |
| :----------- | :------------------- | :----- | :----------- | :--------------- | :------- | :----------------------- |
| **Git Stash** | ✕                           | 低い     | 低い           | 低い                     | 複雑      | 低い                                 |
| **Git Clone** | ◯                           | 高い     | 高い           | 低い                     | 簡単      | 高い                                 |
| **Git Worktree** | ◯                       | 中程度 | 中程度        | 中程度                 | 中程度   | 高い                                 |




### 1. Git Stash を利用した一時保存

※操作などがものすごく大変

Gitの **`stash`** コマンドを使用することで、現在の作業内容を一時的に退避させ、別の作業に切り替えることができます。

* **利点**: 現在の作業を失うことなく、別のブランチでの作業や緊急の修正に対応できます。
* **課題**:
* 複数のAI（Copilot）を同時に異なるコンテキストで動かすことはできません。CopilotはVS Codeの現在の開いているファイルやプロジェクトのコンテキストに基づいて動作するため、別の作業に切り替えるたびにコンテキストも切り替わります。
* 一時保存と復元（`stash pop`）の作業が、慣れないうちは複雑に感じられることがあります。
* `git stash` を利用する際には、手動でGitブランチを切り替える必要があります。



### 2. Git Clone を利用したローカル複数リポジトリ

※ローカルで完結しない

同じリポジトリをローカルの異なるフォルダに複数クローンすることで、それぞれのリポジトリで独立した作業環境を構築できます。

* **利点**: それぞれのフォルダで独立したVS Codeウィンドウを開き、異なるタスクに対してCopilotを利用できます。
* **課題**:
* GitHub（リモートリポジトリ）上では、当然ながら同じリポジトリが一つとして管理されています。ローカルで複数のクローンを持つことで、誤って異なる作業内容を同じブランチにプッシュしてしまうリスクがあります。
* VS Codeのウィンドウを複数（異なるフォルダで開く）用意する必要があり、ウィンドウ管理が複雑になる可能性があります。


英語
I have no idea what use case is satisfied by git worktree, based on that blog po... | Hacker News
https://news.ycombinator.com/item?id=19007761

＞＞そのブログ記事から判断すると、git worktree がどのようなユースケースを満たすのか全く分かりません。どうしても2つのブランチをチェックアウトする必要がある場合、クローンを2回実行すればいいのではないでしょうか。

👆 `git workttree`よりも `git clone` を使うべきかどうかの議論。



### 3. Git Worktree を利用した複数ワーキングツリー（作業フォルダ）管理

※今回の記事で利用

Gitの **`worktree`** コマンドは、一つのGitリポジトリから複数のワーキングツリー（作業フォルダ）を作成し、それぞれ異なるブランチで作業することを可能にします。

* **利点**:
* 一つのリポジトリの配下で、複数の独立した作業環境を効率的に管理できます。
* それぞれ異なるブランチにチェックアウトしたワーキングツリー（作業フォルダ）で、Copilotを同時に利用することが可能です。
* `git worktree` を管理するためのVS Code拡張機能（例: git_worktree_manager）も利用可能です。
* **課題**:
* `.env` ファイルなど、Gitが追跡していない（`.gitignore` で除外されている）設定ファイルは、新しいワーキングツリー（作業フォルダ）には自動でコピーされません。手動でのコピーやシンボリックリンクの設定やインストールが必要になる場合があります。

#### 独立した作業環境の提供

AIエージェントが異なるタスクやブランチで同時にコード生成・修正を行う際、それぞれの作業を独立したワーキングツリーで行うことで、コンフリクトのリスクを最小限に抑え、作業の隔離性を高めることができます。

AIが生成したコードと人間の手による修正が互いに干渉することなく、クリーンな状態で作業を進めることが可能です。



#### 高速なコンテキスト切り替えと作業効率化

AIが生成したコードを人間の開発者がレビュー・修正する際も、`git stash`や一時コミットなしで瞬時にワーキングツリー（作業フォルダ）を移動できます。

例えば、AIが新機能Aのコードを生成している間に、開発者は別のワーキングツリーで新機能Bのレビューを行う、といったことがスムーズに実現します。

これにより、「ブランチ切り替え→スタッシュ/コミット→別ブランチ移動」といった煩雑な手順が不要となり、コンテキストスイッチのオーバーヘッドを大幅に削減します。



#### 効率的なデバッグ・テスト・比較検証

AIが提案した複数の改善案（例えば、アルゴリズムの異なる実装やパフォーマンスチューニングの異なるアプローチ）を同時に評価したり、異なるアプローチを並列してテストしたりする際にも、それぞれの案を異なるワーキングツリーで展開し、比較検討することが可能です。

これは、AIが生成したコードの品質評価や選択において、非常に強力な支援となります。



#### 「clone地獄」からの解放

従来の複数タスク並列作業では、異なるブランチで作業するために同じリポジトリを何度もクローンする**「clone地獄」**に陥りがちでした。
Git Worktreeは、ディスク容量を節約しながら、この問題を根本から解決します。



#### Git Worktree と通常のGitブランチの比較

Git Worktreeと通常のGitブランチ操作の主な違いは、ワーキングツリー（作業フォルダ）の扱いにあります。

| 特徴                 | Git Worktree                     | 通常のGitブランチ（`git switch`など） |
| :------------------- | :------------------------------- | :------------------------------------ |
| ワーキングツリー（作業フォルダ） | 複数の物理的な作業フォルダを作成 | 単一の作業フォルダ内でブランチを切り替える |
| 並列作業 | 異なるブランチで同時に作業が可能 | 一度に一つのブランチのみで作業が可能   |
| コンテキスト切替 | `cd`コマンドでフォルダ移動するだけ | ブランチ切り替えコマンドが必要（`git stash`等で変更退避が必要な場合あり） |
| ファイル管理 | 各ワーキングツリーで独立したファイル群を保持 | 単一フォルダ内でファイルが切り替わる |
| ディスク容量 | オブジェクトを共有するため効率的 | 複数クローンより効率的だが、ワーキングツリーよりは非効率（複数クローンする場合） |

特にAI並列開発のように、複数のタスクが同時に進行し、それぞれが独立した環境を必要とする場合、Git Worktreeは通常のブランチ操作に比べて圧倒的な効率性と安全性を開発者にもたらします。



## 基本コマンド

```terminal
# リスト表示
git worktree list
# 追加
git worktree add
# 削除
git worktree remove

```

### list コマンド

```terminal
git worktree list

```

👆このコマンドの結果を理解できれば基本の9割がた理解できています。



### add コマンド

同じ深さにブランチのフォルダを作ります。

AI並列開発の場合、リポジトリの外にブランチのフォルダを作ることを推奨します。
フォルダごとに独立させたほうがGitHub Copilotの混乱や、検索時での結果に重複がなくなるからです。


`git worktree add [パス文字列] [ブランチ名]`

[パス文字列]：新しいワーキングツリー（作業フォルダ）を作る場所
[ブランチ名]：新しくチェックアウトするブランチ名（省略すると現在のブランチの内容がコピーされます）

```terminal
git worktree add ../dev-work feature/t1
git worktree add ../hotfix main
#                    ↑ ../ とすることで、並列に作成しています

```
`../`をつけると一つ上のフォルダの位置から新しくフォルダを作ります。


git branchをすると、worktreeには+が付きます

```terminal
git branch
   main
 * develop
 + feature/t1

```

worktreeへ移動
`cd` を実行してフォルダを移動することで、ブランチ移動と同じ意味になります。

```terminal
cd ../dev-work

```

GUIでマウスで移動したり、

👇codeコマンドで別ウィンドウを広げたりします。

```terminal
code ../dev-work

```

gitで追跡しているファイルのコピーですので、.gitignoreに指定された`.env`ファイルなどはコピーされません
コピーやインストールを忘れずに行うようにしましょう。



### remove コマンド

`git worktree remove [パス文字列]`

[パス文字列]：削除したいワーキングツリー（作業フォルダ）のパスを指定します。

このコマンドを実行すると、
指定したワーキングツリー（作業フォルダ）が「Gitの管理対象」から外れます。
フォルダ自体も削除されます（中身も消えますので注意！）。
メインのリポジトリや他のワーキングツリーには影響しません。

pruneとの違いは👇

## 削除の違い

`git worktree remove` と `git worktree prune` の違いを、分かりやすく表でまとめます。

| コマンド                  | 目的・動作                                                                                   | 使うタイミング                                   |
|------------------|--------------------------------------------------------------|----------------------------------|
| git worktree remove | 指定したワーキングツリー（作業フォルダ）を明示的に削除し、管理から外す | もう使わないワーキングツリーを消したい時  |
| git worktree prune   | 実体が無いワーキングツリーの「管理情報」だけを自動でクリーンアップする    | 手動でフォルダを消した後など        |

---

「remove」は普通の削除、「prune」はお掃除（整理）と覚えると分かりやすいです！
安全に作業するため、消す前に大事なファイルがないか確認しましょう。




----------------------------------------

# Git Worktreeを使った手動AI並列開発の説明

AI並列開発は、以下のような特性を持つ人に特に適しています。

AI並列開発は、以下のような特性を持つ方に特に適しています。

---

## AI並列開発に適した人材

AI並列開発は、複数のタスクやアイデアを同時に効率よく進められる能力が求められる分野です。特に、以下のような特性を持つ方は、その特性を活かして大いに活躍できるでしょう。

* **並列思考力がある方**: 複数のタスクやアイデアを同時に処理し、それらの関連性を理解しながら並行して思考を進められる方は、複雑なAI開発プロセスにおいて強みを発揮します。
* **マルチタスク処理が得意な方**: 複数のプロジェクトやタスクを同時に進行させ、それぞれの進捗を管理しながら効率的に業務を進められる方は、AI並列開発のスピード感を損なうことなく貢献できます。
* **発想力が豊かな方**: 瞬時に多様なアイデアを思いつき、それらを具体化しようとする意欲のある方は、AI開発における新たなアプローチや解決策を生み出す上で非常に重要です。
* **思考のスピードが速い方**: アイデアの具現化や問題解決において、迅速に思考を巡らせ効率的に作業を進められる方は、開発サイクルの短縮に貢献できます。
* **時間管理と効率性を重視する方**: スケジュールの隙間を有効活用し、常にタイムパフォーマンス（タイパ）を意識して動ける方は、限られた時間の中で最大限の成果を出すことが求められるAI並列開発において、大きなアドバンテージとなります。

AI並列開発は、人間の能力とAIの能力を最大限に引き出し、開発効率を飛躍的に高める可能性を秘めています。

(しかし、AIが生成するコードのレビューや検証など、人間側がAIの生成速度に追いつくのが難しいという側面もあります。)



----------------------------------------

# git worktreeを手助けする、VSCode拡張機能、CLIツール

## Worktree補助ツール

Git Worktreeをより使いやすくするためのVS Code拡張機能やCLIツールが存在します。

### VS Code拡張機能

#### Git Worktree Manager

多機能版、Git Worktreeの作成、削除、切り替えなどをVS CodeのGUIで直感的に操作できます。
左の独自拡張機能メニューから操作


Git Worktree Manager - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=jackiotyu.git-worktree-manager

2025年6月19日評価
最近バージョンアップが頻繁でGUIで使うならこれ一択

ブランチの追加
/git_worktree_manager-app                5b60208 [main]
/git_worktree_manager-app.worktree/test  5b60208 [main]

👆[アプリ名].worktree/[新ブランチ名]というパスに新ブランチが追加されます。

大抵のことはGUIで操作が可能ですが、

##### ブランチの移動は・・・👇

拡張機能からも移動できますが、`git worktree list`コマンドで

```terminal
git worktree list

C:/src/git_worktree_manager/git_worktree_manager-app                     5b60208 [main]
C:/src/git_worktree_manager/git_worktree_manager-app.worktree/worktree1  5b60208 [work111]
C:/src/git_worktree_manager/git_worktree_manager-app.worktree/worktree3  5b60208 [hotfix001]

```

👆「パスの先がリポジトリの外の場所」の場合、VSCodeの機能で表示されたパスをctrlキーを押しながらマウスでクリックをするとVSCodeの新しくウィンドウが開いてそれがブランチ移動の代わりになります。

`git worktree`では `git switch` `git checkout` `git branch`では移動できません。

`git worktree list`コマンドと `git branch`コマンドは必ずしも一致しない場合があります。

##### 削除は・・・👇

ブランチの削除は、削除したいブランチ以外に移動して、そこから拡張機能の右クリックから
ワーキングツリー操作＞ワーキングツリーを削除

```terminal
 git worktree list

```

で削除されたことを確認。

ブランチも削除します。




#### Git Worktree

Git Worktreeの機能を提供する別の拡張機能です。

Git Worktree - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=PhilStainer.git-worktree

コマンドパレットから操作

使いづらかったので削除



#### Git Worktrees

Git Worktrees - Visual Studio Marketplace
https://marketplace.visualstudio.com/items?itemName=GitWorktrees.git-worktrees

使い方がよくわからず



### CLIツール

#### Phantom

Git worktreeを用いたシームレスな並列開発のための強力なCLIツールです。
Powershellはサポートされていません、使うには少し工夫が必要です。

aku11i/phantom: A powerful CLI tool for seamless parallel development with Git worktrees.

https://github.com/aku11i/phantom/tree/main

日本語
phantom/README.ja.md at main · aku11i/phantom

https://github.com/aku11i/phantom/blob/main/README.ja.md

Claude Codeを20万円分使ってバイブコーディングの生産性を更に向上させるツールを作った

https://zenn.dev/aktriver/articles/2025-06-claude-code-200k-vibe-coding

##### 特色

ブランチ名とワーキングフォルダが一緒の名前

設定をしておくと、未追跡のファイルのコピーやインストールを自動化

シェル補完？ Powershellは無し？
Powershellで使えるけどエラーが出るので、
VSCodeでターミナルを立ち上げる時は `Git Bash` を使います。

Windowsで使えるか？
使えるけど工夫が必要

##### インストール

```terminal
npm install -g @aku11i/phantom

```



##### 設定ファイル

```phantom.config.json
{
  "worktreesDirectory": "../phantom-worktrees",
  "postCreate": {
    "copyFiles": [
      ".env",
      ".env.local",
      "config/local.json"
    ],
    "commands": [
      "pnpm install",
      "pnpm build"
    ]
  }
}

```

👆worktreesDirectory はワーキングツリー（作業フォルダ）の相対or絶対パスを指定します。
👆copyFilesにはgitが追跡していないファイルを指定します。
👆commandsでは、node_moduelもインストールやビルドをしてくれるようになります。





##### ワーキングフォルダの作成

`phantom exec <worktree> <command>`

```terminal
# `Git Bash`
phantom create dev

```

👆 `.git/phantom/worktrees/` に `dev` という名前の新しい `Git worktree` 作業フォルダが作成されます。



```
your-project/    # Gitリポジトリ
├── .git/
│   └── phantom/
│       └── worktrees/        # Phantomが管理するディレクトリ
│           ├── feature-awesome/  # ブランチ名 = worktree名
│           ├── bugfix-login/     # 別のworktree
│           └── hotfix-critical/  # さらに別のworktree
└── ...

```


##### エディタ統合

VSCodeのターミナルでは `Git Bash`を使います。

```terminal
# VS Code `Git Bash` で開く
phantom create dev4 --exec "code ."

# または既存のworktreeを開く
phantom exec feature code .
phantom create  --exec "code ." test-1
phantom create test-2 --exec "code ."

```


##### 戻る

```terminal
exit

```

👆ワーキングフォルダ(作業フォルダ)にいる場合に、mainブランチに戻ります。

##### 削除する

```terminal
phantom delete [ブランチ名]

#例
phantom delete feature-awesome

```





##### help

```
$ phantom -h
Phantom - Git Worktree Manager

A CLI tool for managing Git worktrees with enhanced functionality

USAGE
  phantom <command> [options]



COMMANDS
  create      Create a new Git worktree (phantom)
  attach      Attach to an existing branch by creating a new worktree
  list        List all Git worktrees (phantoms)
  where       Output the filesystem path of a specific worktree
  delete      Delete a Git worktree (phantom)
  exec        Execute a command in a worktree directory
  shell       Open an interactive shell in a worktree directory
  version     Display phantom version information
  completion  Generate shell completion scripts
  mcp         Manage MCP server for AI assistants
  github      GitHub-specific commands for phantom
  gh          GitHub-specific commands for phantom (alias)



GLOBAL OPTIONS
  -h, --help     Show help
  -v, --version  Show version

Run 'phantom <command> --help' for more information on
a command.

```

##### issue

deleteコマンドは VSCodeでブランチのフォルダが開いていると削除できません。
ですのでVSCodeのウィンドウを閉じてからコマンドを実行します。


```terminal
# または既存のworktreeを開く
phantom exec feature code .
```

👆`phantom exec dev code .`
既存のブランチが、別ウィンドウで開かない。


##### Phantom MCP

phantom/docs/mcp.md at main · aku11i/phantom

https://github.com/aku11i/phantom/blob/main/docs/mcp.md

##### インストール

VSCodeでPhantom MCPをインストールします。
VSCodeのターミナルでは `Git Bash`を使います。

```terminal
code --add-mcp '{
  "name": "Phantom",
  "command": "phantom",
  "args": ["mcp", "serve"],
  "transport": "stdio"
}'

```


```terminal
任意のworktreeでコマンドを実行
phantom exec feature-awesome {実行したいコマンド}
# 例: phantom exec feature-awesome npm run build

```




##### fzf (Windows Posershell)

参考
fzfのインストール方法と初期設定
https://zenn.dev/kabec_dev/articles/d5c42b7a530714

PowerShell+fzfでコマンド入力支援
https://zenn.dev/mebiusbox/articles/b922c7e6ded49a



---

#### Sproutee

Gitワーキングツリーの作成を自動化し、指定されたファイルを新しいワーキングツリーにコピーするCLIツールです。複数のエディタの自動起動もサポートしています。

daisuke310vvv/sproutee

https://github.com/daisuke310vvv/sproutee

Build済みをダウンロード





---

### ウィンドコントロールツール

マウスジェスチャでウィンドのコントロール(ウィンドウの位置、大きさ)を変更できるツール。

Windowsのツール
AutoHotkeyのMouseGestureL.ahkを使っています。

git worktreeのブランチを
VSCodeの拡張機能からGUIで新しくウィンドウを開いた後、
ウィンドウの配置を素早く決めることが出来ます。

参考
AutoHotKeyとMouseGestureLとその他の設定集2024年版｜ 松水映山紅MatsumiEizanko
https://note.com/matsumi_835/n/n37bdd3b66f38

マウスジェスチャーを使いこなせ！【作業効率化】
https://www.2yusukegmgmgm.com/2366



----------------------------------------

# VSCodeで実際に試す

Next.jsをインストール

```terminal
npx create-next-app@latest [WebAppName] --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

```

## 拡張機能

拡張機能を使って

git worktreeの
2つのブランチを作る
devA
devB

1VSCodeで完結させたいのなら `.git`フォルダ内に置く
複数のVSCodeを開くのが前提なら、現在のリポジトリ外に置く

イメージとして

リポジトリ 中
├── .git
│    ├──workdev 中にブランチを作る
│   └── worktree
├── public
├── src
│   └── app
├── .gitignore
├── package.json
└── README.md


リポジトリ 外にブランチを作る
mainブランチ
├── .git(フォルダ)
├── public
├── src
│   └── app
├── .gitignore
├── package.json
└── README.md

devブランチ
├── .git(ファイル)
├── public
├── src
│   └── app
├── .gitignore
├── package.json
└── README.md

👆️.gitファイルの👇中身

```.git
gitdir: C:/src/git_worktree_manager/git_worktree_manager-app/.git/worktrees/dev-work

```



```terminal
> git worktree list
C:/src/git_worktree_manager/git_worktree_manager-app  5b60208 [main]
C:/src/git_worktree_manager/dev-work                  5b60208 [dev]

```

👆どちらのブランチの端末からも同じ結果が得られる



mainブランチから

```terminal
> git branch
+ dev
* main

```

devから

```terminal
> git branch
* dev
+ main

```

現在のブランチには*記号がつく
worktreeブランチには+記号がつく

ブランチを削除する

ブランチを削除する時は、フォルダのパス名を指定します。
ブランチ名を指定しても削除されません。
削除したいブランチの端末上からは、そのブランチは削除出来ません。

```terminal
git worktree remove [フォルダのパス]

X git worktree remove [ブランチ名] << 間違いです。ブランチ名では削除されません。

```



設計書
要件定義書
タスクリストを作る
タスクをページごとにタスク分解をして、タスク毎にまとめる
タスクからプロンプトファイルを作る

devA
devB
のブランチそれぞれにページ単位でタスクを分けておき、
それを各ブランチに分け与える



----------------------------------------

実際に触ってみて
複数のブランチを使った場合の
手動AI並列開発を考える

# ブランチ戦略を考える

# 並列AI戦略

git worktreeを使う場合ブランチをその都度削除するわけにはいかないので、ブランチは使いまわします。

タスクの範囲を、ページ単位になるように範囲を狭めます。

仕事の組織で言うと

役割(ブランチ名)

オーナー(人：システムエンジニア、プログラマー)
	社長(main)
		部長A(leaderA)
			社員1(dev/testA)
			社員2(dev/featureA)
			社員3(dev/HotfixA)
		部長B(leaderB)
			社員4(dev/testB)
			社員5(dev/featureB)
			社員6(dev/HotfixB)

社長がタスクリストなどを管理
	タスクリストからタスク分解をしてタスクを取り出します。
	タスクリストの進捗管理
	製品の管理
	リポジトリのマージ
	デプロイ

部長がタスクを管理する役割
	部長が（ページ単位、アプリのメニュー単位）でコンポーネントを請負
	タスクの管理
	タスクの大きさを調整、大きい場合はサブタスクに分解

社員がタスクのコード化をする役割
	テスト駆動開発
	タスク、サブタスクの実装
	コードの実装
	パーツや、コンポーネント同士の連結など



----------------------------------------

# VSCodeワークスペース

<details><summary>VSCodeワークスペース</summary>


VSCodeのワークスペース機能を利用してプロジェクトを１から作成します。

### 1. プロジェクトの準備

まず、AI並列開発の基盤となるリポジトリ構成を準備します。

## VSCodeのワークスペース

並列開発を効率化するために、以下のようなリポジトリ構造をワークスペースで作成します。

* **Webアプリのリポジトリ**:
* Next.jsなどのフレームワークがインストールされた、アプリケーション本体のコードを管理するリポジトリです。

* **GitHub Copilot指示書のリポジトリ**:
* 自身で作成した`.github`ディレクトリを含むリポジトリです。
* この`.github`ディレクトリには、GitHub Copilotに特定のコーディングスタイルや規約、ベストプラクティスを指示するための設定ファイルが含まれています。これにより、GitHub Copilotがプロジェクト全体で一貫性のあるコードを生成する手助けとなります。
* アプリへの個別の指示は、後述のタスクリストとプロンプトファイルで別途作成します。

* **設計書リポジリ**:
* プロジェクトのアーキテクチャ、データベーススキーマ、API仕様、UI/UXデザインなど、開発に必要な各種設計書を管理するリポジトリです。
* 概要、要件定義書、設計書、画面設計書、ワイヤーフレーム、詳細設計書、DB設計書、API設計書、テスト設計書、バックアップ/リストア計画、セキュリティチェックリストなどの設計書関連のファイルを置きます。

* **ドキュメントリポジリ**:
* ユーザーマニュアル、APIドキュメント、開発者向けガイド、プロジェクトの進捗報告書など、設計書以外のあらゆる種類のドキュメントを管理するリポジトリです。
* プロジェクトの知識共有と継続的な改善に役立ちます。



## **ワークスペースのディレクトリ構造**

これらのリポジトリを統合し、管理しやすくするために、以下のようなワークスペースのディレクトリ構造を作ります。

```
プロジェクト名/
├── [プロジェクト名]-app/               # アプリケーション本体用のフォルダ
├── [プロジェクト名]-custom-instructions/ # GitHub Copilot指示書用のフォルダ
├── [プロジェクト名]-design/            # 設計書用のフォルダ
└── [プロジェクト名]-doc/                 # ドキュメント用のフォルダ
```

今回の例では、`git_worktree_manager-custom-instructions`というGitHub Copilot指示書用のフォルダを作成し、その中にCopilotへの詳細な指示を格納します。このフォルダの中身は、例えば以下のようになります。

```
.
├── _tasks
│   ├── 1_todo
│   ├── 2_doing
│   ├── 3_done
│   ├── 4_archived
│   └── TASK_LIST.md
├── .github
│   ├── supabase
│   │   ├── .supabase-instructions.md
│   │   ├── code-format-sql.md
│   │   ├── database-create-migration.md
│   │   ├── database-functions.md
│   │   ├── database-rls-policies.md
│   │   ├── declarative-database-schema.md
│   │   ├── edge-functions.md
│   │   ├── nextjs-supabase-auth.md
│   │   ├── README.md
│   │   └── SupabaseのMCPのコマンド一覧.md
│   ├── .context7-instructions.md
│   ├── .copilot-character-instructions.md
│   ├── .copilot-codeGeneration-instructions.md
│   ├── .copilot-commit-message-instructions.md
│   ├── .copilot-review-instructions.md
│   ├── .copilot-task-instructions.md
│   ├── .copilot-test-instructions.md
│   ├── .figma-instructions.md
│   ├── copilot-instructions.md
│   └── typescript-react.instructions.md
└── README.md
```

GitHub Copilotは**ワークスペース単位**でコンテキストを見ています。そのため、指示書が別フォルダにあっても、VS Codeのワークスペースとして一つにまとめれば、GitHub Copilotに指示を与えることが可能です。



### 2. **プロンプトファイルの作成**

AI並列開発を効果的に進めるには、AIへの明確な指示が不可欠です。プロンプトファイルは以下の手順で作成します。

1. 仕様書を書いてイメージを固める

「こんなものを作りたい」という大まかなイメージを文書化します。

2. 要件定義書でイメージを具体化する

イメージを具体的な設計に落とし込みます。

3. 設計書でAIに指示できるレベルのすべての情報を提供する

AIがコード生成できるよう、アーキテクチャやデータ構造など詳細な情報を記述します。

4. タスクリストを作成し、AIにタスク分解してもらう

設計書からAIにタスクを細かく分解してもらいます。

5. タスクリストから1タスクを取り出し、プロンプトファイルを作成する

各タスクごとに、GitHub Copilotへの具体的な指示をプロンプトファイルとして作成します。



</details>



----------------------------------------

# 指示書

## GitHub CopilotへのGit Worktree並列開発指示書

### 目的

この指示書は、既にGit Worktreeを使用しているチームが、GitHub Copilotを活用して開発プロセスを効率化するためのものです。

---

### Git Worktreeの基本

* **コンテキスト切り替えの削減**: 複数の開発ブランチ間で、ファイルやIDEの状態を切り替えることなく並列して作業できます。
* **独立した作業環境**: 各worktreeは独立した作業ディレクトリであり、それぞれが異なる開発ブランチをチェックアウトできます。これにより、異なる機能やタスクに同時に取り組めます。
* **mainブランチの同期**: 作業を開始する前にmainブランチが常に最新であることを確認することが、コンフリクトを最小限に抑える上で最も重要です。

---

### 開発フローとCopilotの役割

#### 1. mainブランチの同期と管理

ユーザーは、新しい作業を開始する前や定期的に、**mainブランチを常に最新の状態に保つ**ようにします。これがすべての開発ブランチの基盤となります。

**Copilotの役割**:
ユーザーが新しいタスクやブランチでの作業を開始しようとしている際、「まず、すべての開発の起点となる**mainブランチが最新に同期されていることを確認しましょう**」と提案。以下のコマンドとその目的（mainへのコード集中管理）を説明します。

```terminal
git switch main
git pull origin main

```

#### 2. 新しいWorktreeと開発ブランチの作成

ユーザーは、各開発タスクのために、最新のmainブランチから派生した新しいworktreeと開発ブランチ（devブランチ）を作成します。Copilotはこの**独立した環境でのコード生成を支援**します。

**Copilotの役割**:
ユーザーが新しい開発タスクに着手する際、「このタスク用に**git worktreeを使って新しい独立した開発環境を作成しましょう**」と提案。以下のコマンド例を、ユーザーが分かりやすいように具体的なパスやブランチ名で示唆し、worktreeを作成するメリット（完全な独立性、コンテキスト切り替え削減）を説明します。

```terminal
# mainブランチが最新であることを確認後、新しいworktreeを作成
git worktree add ../<作業ディレクトリ名> dev/<新規ブランチ名>
# 例: git worktree add ../my-feature-work dev/my-new-feature

```

#### 3. Worktree内でのコード生成と開発

各worktreeは通常のGitリポジトリとして機能します。ユーザーはそれぞれのdevブランチ内で、**Copilotの支援を受けてコードを生成し、開発を進めます**。

**Copilotの役割**:
* `git status`, `git add`, `git commit`, `git push`など、ブランチ内での一般的なGit操作を通常通り支援します。
* この独立したworktree内で、ユーザーの指示に基づいてコードスニペット、関数、クラスなどを積極的に生成します。
* 特定の機能やコンポーネントのコード生成要求に対して、このdevブランチのコンテキストに合わせた提案を行います。

#### 4. 作業の完了とmainへのマージ

開発が完了したら、ユーザーは自分の開発ブランチを最新のmainブランチと同期し、プルリクエストを通じてmainにマージする準備をします。

**推奨フロー**:
作業中のworktree内で、最新のmainを自身の開発ブランチにリベースまたはマージします。

```terminal
git fetch origin main
git rebase origin/main # または git merge origin/main

```

プルリクエストを作成し、レビュー後にmainにマージします。

**Copilotの役割**:
開発ブランチでのコミットが一段落した際、「**mainブランチへのマージの準備はできていますか？**」と尋ねます。マージ前にmainの変更を取り込むための`merge`コマンドを提案し、コンフリクト解決を支援します。

#### 5. Worktreeの再利用

作業が完了し、開発ブランチがmainにマージされたら、開発ブランチは再利用できるようにします。






----------------------------------------

# AIの各モデルの説明

## GitHub Copilotのモデルのまとめ1

Copilot Chatでは、OpenAI、Anthropic、Googleなど、様々なAIモデルが利用できます。それぞれのモデルは異なる強みを持つため、あなたのタスクに最適なモデルを選ぶことが重要です。

### OpenAI モデル

#### **GPT-4.1**
* **特徴**: OpenAIの最新モデル。GPT-4oを全面的に上回り、コーディング、指示のフォロー、長いコンテキストの理解が大幅に向上しています。速度、応答性、汎用推論に優れています。
* **最適なユースケース**:
* コードの説明、コメント追加、バグ調査、コードスニペットの生成
* 多言語プロンプトの理解
* 一般的な開発タスクのデフォルト選択

#### **GPT-4o**
* **特徴**: テキストと画像をサポートするマルチモーダルモデル。リアルタイム応答が可能で、多言語コンテキストでのパフォーマンスと視覚的コンテンツの解釈に優れています。
* **最適なユースケース**:
* コードの説明、コメント追加、バグ調査、コードスニペットの生成
* 多言語プロンプト、画像ベースの質問
* 軽量な開発タスク、会話型プロンプト

#### **GPT-4.5 (パブリックプレビュー)**
* **特徴**: 推論、信頼性、コンテキスト理解が改善されたモデル。複雑なロジック、高品質なコード生成、微妙な意図の解釈に適しています。
* **最適なユースケース**:
* 複数ステップのタスク、深いコード理解を要するタスク
* コードのドキュメント作成、複雑なコード生成、バグ調査
* 意思決定プロンプト（ライブラリ、パターン、アーキテクチャの比較検討）

#### **o1**
* **特徴**: 複雑な複数ステップのタスクと深い論理的推論をサポートする、やや古い推論モデル。デバッグに特に適しています。
* **最適なユースケース**:
* コードの最適化、複雑なシステムのデバッグ
* 構造化コードの生成、分析の要約、コードのリファクタリング

#### **o3 (パブリックプレビュー)**
* **特徴**: oシリーズで最も高性能な推論モデル。深いコーディングワークフローや複雑な複数ステップのタスクに最適です。
* **最適なユースケース**:
* コードの最適化、複雑なシステムのデバッグ
* 構造化コードの生成、分析の要約、コードのリファクタリング

#### **o3-mini**
* **特徴**: 待機時間とリソース使用量を低く抑えながらコーディングパフォーマンスを実現する、高速でコスト効率の高い推論モデル。
* **最適なユースケース**:
* リアルタイムのコード提案、コードの説明
* 新しい概念の学習、迅速なプロトタイプ作成
* 単純なコーディングの質問や反復的なコーディングの質問

#### **o4-mini (パブリックプレビュー)**
* **特徴**: oシリーズで最も効率的なモデル。待機時間とリソース使用量を低く抑えながらコーディングパフォーマンスを発揮する、コスト効率に優れた推論モデル。
* **最適なユースケース**:
* リアルタイムのコード提案、コードの説明
* 新しい概念の学習、迅速なプロトタイプ作成
* 単純なコーディングの質問や反復的なコーディングの質問

### Claude モデル

#### **Claude Sonnet 3.5**
* **特徴**: 日常的な開発者タスク向けに設計された高速でコスト効率の高いモデル。迅速な回答、明確な要約、基本的なロジックを必要とするタスクに優れています。
* **最適なユースケース**:
* コードの説明、コメント追加、簡単な言語の質問、コードスニペットの生成
* ドキュメント作成、定型コード生成
* コスト制約のある環境

#### **Claude Sonnet 3.7**
* **特徴**: 大規模または複雑なコードベース全体の構造化された推論を必要とする開発タスクに優れる強力なモデル。迅速な回答と深い段階的な分析を両立します。
* **最適なユースケース**:
* 複数ファイルのリファクタリング、アーキテクチャの計画
* 機能開発、アルゴリズムの設計、分析情報の提供

#### **Claude Sonnet 4 (パブリックプレビュー)**
* **特徴**: 詳細情報は提供されていませんが、現在パブリックプレビュー段階です。

#### **Claude Opus 4 (パブリックプレビュー)**
* **特徴**: 詳細情報は提供されていませんが、現在パブリックプレビュー段階です。

### Gemini モデル

#### **Gemini 2.0 Flash**
* **特徴**: リアルタイムの対話型アプリケーション向けに最適化されたGoogleの高速マルチモーダルモデル。視覚的な入力とエージェントによる推論を利用します。
* **最適なユースケース**:
* コードスニペットの生成、フィードバックループの設計
* 画像ベースの分析（UI検査、図分析、レイアウトデバッグなど）
* フロントエンドプロトタイピング、バグ調査

#### **Gemini 2.5 Pro (パブリックプレビュー)**
* **特徴**: Googleの最新AIモデル。高度な推論とコーディング機能で複雑なタスクを処理し、長いコンテキストの理解と分析を必要とする大量の研究ワークフローにも適しています。
* **最適なユースケース**:
* 複雑なコード生成、複雑なシステムのデバッグ
* 科学的研究、長いコンテキストの処理（広範なドキュメント、データセット、コードベースの分析）

これらの情報を参考に、あなたの具体的なタスクに最適なAIモデルを選択してください。

タスクに適した AI モデルの選択 - GitHub Docs
https://docs.github.com/ja/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task

## GitHub Copilotのモデルのまとめ2

* **GPT-4o**: 速度、応答性、汎用推論に優れており、広範な知識、迅速な反復、基本的なコード理解が必要な一般的な開発タスクに適しています。
* **o3-mini (OpenAI o3-mini)**: 低いレイテンシとリソース使用量を維持しながらコーディングパフォーマンスを実現する、高速で費用対効果の高い推論モデルです。簡単なフィルタリングやソートなど、深い推論を必要としないタスクに最適です。
* **Gemini 2.0 Flash**: 画像入力をサポートし、UIの検査、図の分析、レイアウトのデバッグなど、視覚的なコンテキストが問題解決を促進するシナリオに特に役立ちます。
* **Claude Sonnet 3.5**: ドキュメント作成、言語固有の質問への回答、定型コードの生成など、日常的なコーディングのサポートに適しており、コストに制約のある環境で推奨されます。
* **Claude Sonnet 3.7**: ソフトウェア開発ライフサイクル全般（最初の設計からバグ修正、メンテナンス、最適化まで）に優れており、コンポーネント間のコンテキスト理解が重要な複数ファイルのリファクタリングやアーキテクチャ計画に特に適しています。

さまざまなタスクを使った AI モデルの比較 - GitHub Docs

https://docs.github.com/ja/copilot/using-github-copilot/ai-models/comparing-ai-models-using-different-tasks



----------------------------------------

## `.git` 隠しフォルダを見えるようにします。

VSCodeで `.git`フォルダを見えるようにします。

通常は非表示ですが、表示させることが可能です。

```settings.json
...
	"files.exclude": {
		// 見えるようにする。
		// git worktreeのため
		"**/.git": false,

```

`git worktree` はフォルダ移動がブランチの切り替えになります。
VSCodeはリポジトリのルート以下はファイルの表示が可能ですが、
ルートの外のファイルを見ることは少し面倒です。

VSCodeを1ウィンドウで活用する時は、
`git worktree` を使う時に `.git`以下にフォルダを作成することでそこをブランチにできます。

基本的に`.git` は追跡されないので、その中に `git worktree`用のブランチを設定するよう指示して使いやすくしています。

### 通常の使い方

「リポジトリのroot」 の外にブランチを作る

```
リポジトリのroot
├── .git
│   └── worktree
├── public
├── src
├── .gitignore
└── README.md

workdev // ブランチ用のフォルダ

```

### .gitフォルダ内にworktree用のブランチを置く使い方

「`.git`の下」にブランチを作る

```
リポジトリのroot
├── .git
│    ├──workdev    // ブランチ用のフォルダ
│   └── worktree
├── public
├── src
├── .gitignore
└── README.md

```

### VSCodeウィンドウを1枚で開発

`.git`内にブランチ用のフォルダを設定することが可能です。
そうすることでVSCodeのウィンドウ1枚でブランチ間を簡単に移動することが出来るようになります。

### AI並列開発をしたい場合

外にブランチ用のフォルダを設定することで、
複数のVSCodeのウィンドウを用意します。

この方法でAI並列開発がしやすくなります。




----------------------------------------
