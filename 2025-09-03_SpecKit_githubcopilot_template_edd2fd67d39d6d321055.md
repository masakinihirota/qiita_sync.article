<!--
title:   中規模以上のWebアプリ開発の考え方： Template ＋ コロケーション ＋ 仕様書駆動開発「Spec Kit」with GitHub Copilot
tags:    SpecKit,githubcopilot,template,コロケーション
id:      edd2fd67d39d6d321055
private: false
-->
kiroが出た当時から、kiroの仕様書駆動開発とGitHub Copilotの融合が来る日を想像していました。
底に出てきたのが、Spec Kit です。(このツールはまだ未知数)

# 中規模以上での開発

Template＋ コロケーション ＋ 仕様書駆動開発 の3種の神器

## Template

Template で土台を固める。

👇️Template例

https://vercel.com/templates

等でスターターなど自分の作りたいWebアプリの土台になるのを選びます。

例
vercel/ai-chatbot: A full-featured, hackable Next.js AI chatbot built by Vercel

https://github.com/vercel/ai-chatbot

(👆️最終更新日は執筆時点で2025年9月1日、今日は2025年9月4日)



## コロケーション

コロケーションでミニアプリのようにそれぞれ独立させる。

コンポーネントコロケーションパターン #React - Qiita

https://qiita.com/masakinihirota/items/27f961dfa6871aad0550

Next.js App routerでの ルーティングとコンポーネントを別々に管理 #AppRouter - Qiita

https://qiita.com/masakinihirota/items/2695cba68816794e33d3

コロケーションは、Next.js の 1ページ1仕様書＆機能と考え 1ページに ビュー、ビジネスロジック、DBを一つの塊として開発をする。



## 仕様書駆動開発

仕様書駆動開発でミニアプリを適当な大きさのタスク分解をして開発をする。

と言うふうに自分は考えています。

TemplateはVercelとかが作っていて、ある程度まではしっかりしているのでおすすめ。


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

[***]/page.tsx ページファイル
[***]/api/route.ts フェッチファイル

### 1コンポーネント

comonents/[***]/ の下にファイルを置く

ビューコンポーネント [***].tsx
ビジネスロジックコンポーネント [***].ts
テストファイル [***].test.ts
[***]story.ts(Storybookファイル)


が1フォルダで管理される。

これらをテンプレートとして用意しておいて、GitHub Copilotにいつもこの形でページを追加するようにお願いをする。
GitHub Copilotはコピーが得意なので、大抵はトレースして作ってくれる。