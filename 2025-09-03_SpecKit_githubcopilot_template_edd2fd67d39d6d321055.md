<!--
title:   中規模以上のWebアプリ開発の考え方： Template ＋ コロケーション ＋ 仕様書駆動開発「Spec Kit」with GitHub Copilot
tags:    SpecKit,githubcopilot,template,コロケーション
id:      edd2fd67d39d6d321055
private: false
-->
kiroが出た当時から、kiroの仕様書駆動開発とGitHub Copilotの融合が来る日を想像していました。
そこで出てきたのが、Spec Kit です。(このツールはまだ未知数)

なぜ 「Spec Kit」 だけに任せずに余計なものをつけるのか？

GitHub Copilotに完全に任せると、ゼロからすべてを構築することになります。
ですが、Templateを利用すれば、車輪の再発明を避けることができます。

例えば、今回紹介している TemplateはVercelが公開しているものであり、出力が不安定なAIよりもはるかに信頼できます。



コロケーションを採用するのはなぜか？
この👇️2つの記事を読んでください、コロケーションはAI開発と相性があっていると思います。

コンポーネントコロケーションパターン #React - Qiita

https://qiita.com/masakinihirota/items/27f961dfa6871aad0550

Next.js App routerでの ルーティングとコンポーネントを別々に管理 #AppRouter - Qiita

https://qiita.com/masakinihirota/items/2695cba68816794e33d3

コロケーションを採用することで、コードの各範囲をきっちりと区切ることができて、範囲を狭めることが出来ます。

AIを使うコツは、
* 全体を把握してもらうこと
* コードを書く範囲を絞ること
* 最新の情報を与えること
* そして正確な情報と量と
* 適切なプロンプトを与えること
です。



# 中規模以上での開発

Template ＋ コロケーション ＋ 仕様書駆動開発「Spec Kit」

## Template

Template で土台を固めます。

👇️Template例

https://vercel.com/templates

等でスターターなど 自分の作りたいWebアプリの土台になるのを選びます。

例
vercel/ai-chatbot: A full-featured, hackable Next.js AI chatbot built by Vercel

https://github.com/vercel/ai-chatbot

(👆️最終更新日は執筆時点で2025年9月1日、今日は2025年9月4日)



## コロケーション

コロケーションでミニアプリのようにそれぞれ独立させる。

コロケーションは、Next.js の 1ページ1仕様書＆機能と考え 1ページに ビュー、ビジネスロジック、DBを一つの塊として開発をする。



## 仕様書駆動開発

仕様書駆動開発でミニアプリを適当な大きさのタスク分解をして開発をします。
TemplateはVercelとかが作っていて、ある程度まではしっかりしています。

1ページを仕様書駆動開発 ＋ 機能 なので、そこから
* 要件定義 (何を作りたいか？)
* 技術リスト (何で作るか？ Next.js 15、Drizzle ORM等)
👆️この２つをあわせてタスクリストを作る。
* タスクリスト (全体の実装計画)
* タスク分解 (全体の仕事をAIでも実装できる大きさに分解、サブタスク化も考える)
* 実装 (AIによる実装)
の4段階で実装します。


この開発の肝は、コロケーションで大きなアプリを小さなアプリの集合体のような感じで組み立てる。
レゴブロックのように完成させていく。

Next.js は App router をつかって 1ページはルーティングとページで構成され、1ページは複数のコンポーネントで組み立てられる。

## ミニアプリ (ルーティング＋コンポーネント)

### ルーティング

```ts
/src/[***]/page.tsx //ページファイル
/src/app/[***]/api/route.ts //フェッチファイル

```

### コンポーネント

```ts
/src/comonents/[***].tsx //ビューコンポーネント
/src/comonents/[***].logic.ts //ビジネスロジックコンポーネント
/src/comonents/[***].test.ts //テストファイル
/src/comonents/[***].story.ts //(Storybookファイル)

```

が1フォルダで管理されます。
詳しくはコロケーションの記事をご覧ください。



これらをテンプレートとして用意しておいて、GitHub Copilotにいつもこの形でページを追加するようにお願いをします。
GitHub Copilotはコピーが得意なので、大抵はトレースして作ってくれます。



# 参考

AI駆動開発の手法 「大きな石開発」：効率的で堅牢なWebアプリ開発の提案 #Next.js - Qiita

https://qiita.com/masakinihirota/items/88d91559b9a111389b15

大きな石 ＝ Template

小さな石 ＝ コロケーションで

砂 ＝ GitHub Copilotでコード生成


# テスト

AIが出すコードにテストではなくレグレッションテストを書く。

v0などのUI画面
v0などが出すUI画面に静的な項目が表示されているかのチェックテストを書く。
次に動的な値でもチェックをするテストを書く。

Playwriteで総合テストを書く。