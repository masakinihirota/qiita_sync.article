<!--
title:   Web開発ツール スター数調査（テストツール、状態管理、GraphQL）
tags:    GraphQL,TanStackQuery,テストツール,状態管理
id:      c963f4d13b40bfb198eb
private: false
-->
２０２１年末から２０２２年６月までのスター数増加分を調査

調査元
２０２１年までの累積データ
JavaScript ライジングスター 2021
https://risingstars.js.org/2021/ja

２０２２年６月までのデータ
各ツールのGithubページ

| | |2021年|2022年6月30日| |
|:----|:----|:----|:----|:----|
||**テストツール**|累計スター数|現在のスター数|増加分|
|1|Playwright|32.00|39.60|7.60|
|2|storybook|67.90|72.10|4.20|
|3|Cypress|35.80|39.30|3.50|
|4|Puppeteer|75.5|78.7|3.20|
|5|Jest|37.60|39.50|1.90|
|6|Mock Service Worker|8.00|9.9|1.90|
|7|rrweb|10.90|11.80|0.90|
|8|React-testing-library|15.70|16.60|0.90|
|9|Vitest|2.1|5.3|3.20|
|10|jsdom|16.80|17.60|0.80|


| | |2021年|2022年6月30日| |
|:----|:----|:----|:----|:----|
||**状態管理**|累計スター数|現在のスター数|増加分|
|1|Zustand|12.70|18.70|6.00|
|2|XState|18.50|20.60|2.10|
|3|Jotai|6.70|8.90|2.20|
|4|Recoil|15.40|17.10|1.70|
|5|Pinia|4.70|7.90|3.20|
|6|Redux|57.30|58.30|1.00|
|7|Valtio|3.6|4.70|1.10|
|8|Vuex|27.20|27.60|0.40|
|9|MobX|24.70|25.40|0.70|
|10|Nano stores|1.20|1.40|0.20|


| | |2021年|2022年6月30日| |
|:----|:----|:----|:----|:----|
||**GraphQL**|累計スター数|現在のスター数|増加分|
|1|Prisma|19.40|23.80|4.40|
|2|Hasura GraphQL Engine|25.00|27.30|2.30|
|3|Redwood|10.50|14.10|3.60|
|4|Gatsby|52.10|53.20|1.10|
|5|GraphQL Code Generator|8.10|8.90|0.80|
|6|Apollo client|17.10|17.90|0.80|
|7|Directus|13.40|16.50|3.10|
|8|GraphiQL|13.00|13.70|0.70|
|9|Apollo Server|12.20|12.70|0.50|
|10|Vendure|3.00|3.50|0.50|

トップ以外で、今年に入って伸びてきているツール
Vitest（テストツール）
https://vitest.dev/

Pinia（状態管理）
https://pinia.vuejs.org/

Directus（GraphQL）
https://directus.io/

あなたのプロダクトに Apollo Client は必要ないかもしれない - 一休.com Developers Blog
https://user-first.ikyu.co.jp/entry/2022/07/01/121325


## 状態管理

The new wave of React state management | Hacker News
https://news.ycombinator.com/item?id=31959289


昔（6年ぐらい前）はRedux一択でしたが、今は選択肢が大量にあります。
Photoshop,Googleスプレッドシートのような大量の状態管理が必要な場合はReduxが良いのでしょうが、そうでなければReactQuery等で十分です。

Redux ToolKit(RTK)の登場によりReduxの冗長性が排除され簡素化されました。

そして、RTK Queryも生まれました。
これはReduxやRedux Toolkitを知らなくても使えます。


### React Query 改め TanStack Query

https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/

React Query は Ver4より TanStack Queryと名前が改められました。
TanStack Queryにより、サーバーの状態を処理するあらゆる種類のアプリの構築が非常に簡単になりました。これまで作成するのが非常に困難だったものが、今ではほんの数行で、以前よりもうまく機能します。

キャッシュを使用するか、しないかを設定したい等と細かく設定したい場合。

### urql

https://formidable.com/open-source/urql/

キャッシュとGraphQLを使用する場合。

### Jotai

https://jotai.org/

### Zustand

https://github.com/pmndrs/zustand

グローバルストアが必要な場合は、APIがおそらくこれらの中で最も簡単です。

## SWR
https://swr.vercel.app/ja

複雑なローカル状態の状態管理（Photoshop等）と、
APIを介してデータをフェッチおよび更新するための状態管理を区別する。
これらに必要な解決策はかなり異なっています。

## Recoil
コンポーネントをまたいだStateを自由にいくつでも持つことができる

https://nulab.com/ja/blog/nulab/recoil-example/

https://engineering.linecorp.com/ja/blog/line-sec-frontend-using-recoil-to-get-a-safe-and-comfortable-state-management/

# GraphQL

https://user-first.ikyu.co.jp/entry/2022/07/01/121325

# Stack Overflow Developer Survey

https://survey.stackoverflow.co/2022/

Stack Overflow

https://dev.insights.stackoverflow.com/trends?tags=reactjs%2Cangular%2Cvue.js