<!--
title:   Reactの状態管理はReduxの独走状態、2位は大きく離れてswrとreact-queryが競り合い中・・
tags:    React,Recoil,SWR,react-query,redux
id:      b16ca9a61b835d50c8ec
private: false
-->
2021/09/24 追記
これまでは状態管理にReduxやVuexなどの状態管理用ライブラリを使いますが、Graphqlを採用した場合にApollo Clientを利用することでフロントエンドの状態管理の実装がかなり楽になります。

追記終了

2021/01/17 追記

2020年版
満足度ランキング
State of JS 2020: JavaScript Flavors
https://2020.stateofjs.com/

最近よく聞く状態管理
pmndrs/jotai: 👻 Primitive, flexible state management for React
https://github.com/pmndrs/jotai

追記終了

2020/12/20 追記
npm trendsで調べたところ

recoil vs swr vs react query vs redux | npm trends
https://www.npmtrends.com/recoil-vs-swr-vs-react-query-vs-redux

recoil vs swr vs react query | npm trends
https://www.npmtrends.com/recoil-vs-swr-vs-react-query

reduxが圧倒しています2位は大きく離れてswrです。reduxは使い難いことは確かなのですが、この順位は当分維持される模様です。

React界隈ではNext.jsが注目されていてその付随技術？でVercelやswrが同じ会社で開発されているのでswrの注目度が高まっているようです。

検索トレンド
Redux, recoil, swr, react-query - 調べる - Google トレンド
https://trends.google.co.jp/trends/explore?q=Redux,recoil,swr,react-query

Google検索のトレンドではswrが多く検索されています。
3倍近く差が開いており、次の状態管理はswrが来るかもしれません。
（3文字なのでなにかの略語として調べられているかもしれませんし、逆にreact-queryはreactという単語がかぶっているので検索結果に出にくくなっているかもしれません。）

2019年版
The State of JavaScript 2019
https://2019.stateofjs.com/

発表時期
Reduxは2015年の5月頃
swr, react-queryは発表が2019年後半のほぼ同じ頃
それから半年して
Recoilは2020年の5月頃

2020/09/24 追記
Rewriting Facebook's "Recoil" React library from scratch in 100 lines
https://bennetthardwick.com/blog/recoil-js-clone-from-scratch-in-100-lines/

(8) Recoil: State Management for Today's React - Dave McCabe aka @mcc_abe at @ReactEurope 2020 - YouTube
https://www.youtube.com/watch?v=_ISAA_Jt9kI

追記終了

### Recoil

~~グーグルトレンドで遊んでいると、RecoilがReduxを抜いてトップに躍り出ていました、差は僅かですがこれは大きな出来事だと思います。~~

[Redux, recoil, mobx, useContext - 調べる - Google トレンド]
(https://trends.google.co.jp/trends/explore?q=Redux,recoil,mobx,useContext)

![Recoil Redux.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c7f59c4d-2396-01a8-c76e-99ca44f455ea.png)

ただし、日本国内ではReduxが難攻不落の要塞となっています。

Recoilについては
[Reactの実験的ステート管理ライブラリRecoilの基本的な使い方]
(https://sbfl.net/blog/2020/05/17/react-experimental-recoil-usage/)
この記事がわかりやすかったです。

# State of Frontend 2020
State of Frontend 2020 Report | TSH.io
https://tsh.io/state-of-frontend/#future-of-frontend

### State of Frontend 2021?

>However, in the frontend development community, the line between love and hate is very thin. And probably the best proof of that is what happened to Redux. A year or two ago, when you were working with React, Redux was also “the obvious choice”. But frontend developers got tired of the problems caused by using Redux and quickly jumped on the React hooks bandwagon. It’s summer 2020, already more people use hooks than Redux (see: Chapter 2) and as much as 34% of frontend devs believe that Redux will be gone in 3 years from now.

### DeepL翻訳

しかし、フロントエンド開発コミュニティでは、愛と憎しみの境界線は非常に薄いものです。そして、おそらくその一番の証拠は、Reduxに起こったことです。1年か2年前、Reactを使っていた頃は、Reduxも「当たり前の選択」でした。しかし、フロントエンド開発者たちはReduxを使うことによる問題に飽きてしまい、すぐにReactフックのバンドワゴンに飛び乗ってしまいました。今は2020年の夏で、すでにReduxよりも多くの人がフックを使うようになり（参照：第2章）、フロントエンド開発者の34%もの人が、今から3年後にはReduxがなくなると考えています。