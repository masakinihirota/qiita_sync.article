<!--
title:   TeleportHQ  （FigmaのデザインをNext.jsコードに変換してくれるツール）他6ツールとの比較
tags:    Figma,Locofy,Next.js,TeleportHQ,overlay
id:      0c8bc09e032f2155a3b5
private: false
-->
追記 2023年6月11日
TeleportHQが日本語に対応していました。

追記終了

# はじめに
Figmaでプロトタイプを作っても、それをどうNext.jsに取り込めばいいか？
デザインをコード化してくれるツールが色々出てきたようなのでそれらを調査してみました。

これらのツールには他にも色々と機能が付属していますが、あくまでもデザインファイルをコード化してNext.jsに反映させるかという部分を調べています。

## 自分が考えたこのツールの使い方
* ランディングページなどの、1枚でデザインするページ用
* オリジナルコンポーネントを作ってコード化し、それをNext.jsのStorybookに放り込む。

個人で使う分には[Mantine UI](https://mantine.dev/)や[Tailwind UI](https://tailwindui.com/)などのデザインをコピペしたほうが便利だと思う。

難しいのでは？
* 動的なサイト全体を想定して作ったFigmaデザインファイルをNext.jsのコードに出力させる。

## 想定
Figmaを利用している。
Next.js、TailwindCSSを利用する予定。

現状、静的なサイト、ランディングページ等になら使えそうかも・・・
Figmaで動的なデザインで作っても複雑なのは難しそう。

## 7つのコード ツール (推奨順)
* TeleportHQ
* Locofy
* Overlay
* FUNCTION12
* Anima
* Figma to HTML
* monday hero
これらの類似ツールを調べた結果、この中ではTeleportHQが良かったです。

基本的に、Figmaデザインファイルではフレームではダメでコンポーネント化したものでないとコード化してくれません。

これらのツールはFigmaのデザインファイルをコード化する以外にも、
デザインしたものを編集する機能を持っているものもあります。
なので、Figmaのデザインファイルを取り込む機能を持ったコード化ツールといえます。
Figma以外のデザインツールからインポートする機能を持ったものもありましたしね。









## TeleportHQ
コードをダウンロードしてインストールする手間は有るものの
他と比べればとにかく楽、簡単、無料、早い。
（大型プロジェクトの場合は有料プランに入る必要があるようだ）

コードの表示は可能。
ダウンロードは可能。

### サイトURL
Low-code Front-end Design & Development Platform | TeleportHQ
https://teleporthq.io/

### コード化する方法
Figmaプラグインタイプ

### Figmaプラグイン
TeleportHQ - Figma to Code - Export HTML, CSS, React & Vue – Figma
https://www.figma.com/community/plugin/992726161890204477/TeleportHQ---Figma-to-Code---Export-HTML%2C-CSS%2C-React-%26-Vue

### コード化できるフロントエンド
React
Next.js
Gatsby
Vue
Nuxt
Gridsome
Angular
Preact
Stencil
Html

### Next.jsでコード化可能なStyle
Inline Styles
CSSModules
CSS
Styled Components
Styled JSX
React JSS

### コードの取得方法
表示画面からのコピー
Sandboxで見ることが可能
ファイルのダウンロード
無料で可能

ダウンロード後
`yarn`インストールでNext.jsのプロジェクトを作成するまで出来る。

TeleportHQ は デザインをコードに変換してくれるツール
静的なサイトならばかなり便利。

### 感想
このツールはここまで出来るのかと衝撃的だったので推奨ツールとして選びました。
FigmaデザインファイルからNext.jsまでスムーズにウェブアプリ化まで出来てしまいます。
このツールはぜひとも試してみて欲しい。

Next.jsを選んだ場合、ダウンロードファイルから`npm install`or`yarn`コマンドで直接プロジェクトが作成可能。
静的ページならばそのまま利用可能だと思います。

`yarn dev`で `http://localhost:3000/`にデザインしたままのページが表示されます。

現在（2022年11月30日）Next.jsのバージョンが12
デザインをそのままコードに落とし込むのでcssコードに変換されるソースはかなり細かい設定の数値が沢山使われます。
Figmaでデザインを作って、そのデザインをコード化してからNext.jsで**動的**ページを作るのは大変かもしれません。（TailwindCSSはソース内にデザインの設定値を置くから。※TailwindCSSが使えるかどうかは未確認）









## Locofy
Webとモバイル対応
コードの表示は可能
コードのコピーは可能
ダウンロードは可能
ただし、フリートライアルの２０日間のみ。
ただし、残り１日でフィードバックフォームに記入、フィードバックコールをするとさらに何度でも２０日間延長出来る。

### サイトURL
Locofy.ai - ship your products 3-4x faster — with low code
https://www.locofy.ai/

### コード化する方法
Figmaプラグインタイプ

### Figmaプラグイン
Locofy FREE BETA - Figma to React, React Native, HTML/CSS, Next.js, Gatsby – Figma
https://www.figma.com/community/plugin/1056467900248561542/Locofy-FREE-BETA---Figma-to-React%2C-React-Native%2C-HTML%2FCSS%2C-Next.js%2C-Gatsby

プラグイン使用時、コード化まで色々と指定する必要があった。

### コード化出来るフロントエンド
React
HTML/CSS
Next.js
Gatsby
React Native

### Reactでコード化可能なStyle
CSS Modules
TailwindCSS
Styled Components (Coming soon)(2022年12月1日)

### 感想
TailwindCSSまで対応している。
アカウント無料継続する条件のハードルが少し高い。









## Overlay
コードの表示は可能
コードのコピーは可能
ダウンロードはボタンが表示されずやり方が分からなかった。

### サイトURL
Overlay | Design production ready code components
https://www.overlay-tech.com/

### コード化する方法
Figmaプラグインタイプ

### Figmaプラグイン
Overlay (Figma components to React, Vue, HTML) – Figma
https://www.figma.com/community/plugin/893806009348766137/Overlay-(Figma-components-to-React%2C-Vue%2C-HTML)

### コード化出来るフロントエンド
React
Vue
HTML

### Reactでコード化可能なStyle
SCSS
Styled Components





## FUNCTION12
コードの表示は可能
ダウンロードは有料プラン

### サイトURL
FUNCTION12 - Design to code automation for professionals.
https://function12.io/

### コード化する方法
FigmaデザインファイルのURLを貼り付けるタイプ

### コードの取得方法
#### ログインしていない
トップページからFigmaのURLを貼り付けでTranslate for Freeボタンを押す。
Figmaデザインファイルを読み込むので暫く待つ。
アカウントを作ってログインせずにURLを貼り付けるとお試しモードみたいな感じになり、
ダウンロード時にログインしてくださいと促されダウンロード出来ない。
コードは見れるし、そのコードのコピーも可能。

#### ログイン済み
FUNCTION12でアカウントを作りログインする。
ログインしたら、プロジェクトを作る。
この時、
* Source Type
Figma（現在 Figma一択）
* Source URLquestion
 ttp://www.「FigmaデザインファイルのURL」（取得方法は下記に記載）
* Project Name
「適当な名前」

(Figmaの右上の青いボタン「共有」から、
サブウィンドウが表示されるので、その左下にある「リンクをコピーする」をクリック、
クリップボードにコピーされているので、そのURLを貼り付ける。)

読み込み終了後、
左側のFigmaデザインのFigmaのフレームを複数選択する。
そうすると右画面で選択されたFigmaのフレームが表示され、
右画面の上側にあるタブをSceneLayoutからCodeViewに変更するとコードが見れる。
これをコピー・アンド・ペーストすればいいようだ。

Figmaデザインファイルのコンポーネント化したものでないとコード化出来ない。
フレームではコード化されない。

### コード化出来るフロントエンド
HTML
Flutter
Figma to React (Coming soon)
Figma to ReactNative (Coming soon)
Figma to Vue (Coming soon)
Figma to Next (Coming soon)
まだコード化できない模様。（2022年12月1日）







## Anima
コードの表示もダウンロードも有料プラン

### サイトURL
Figma - Export Design to Code - Anima
https://www.animaapp.com/figma

### コード化する方法
Figmaプラグインタイプ
有料プランでないとコードの表示やダウンロードが出来ない模様。

### Figmaプラグイン
Anima - Export Figma to HTML, React & Vue code – Figma
https://www.figma.com/community/plugin/857346721138427857/Anima---Export-Figma-to-HTML%2C-React-%26-Vue-code

### コード化出来るフロントエンド
React
Vue
Html

### Reactでコード化可能なStyle
Plain CSS
Styled Components
Sass (Beta版)





## Figma to HTML, React, and more
Figma内にあるプラグイン

コードの表示は出来ず。
ダウンロードは可能でしたがほぼ空のファイルでした。

### サイトURL
無し

### コード化する方法
Figmaプラグインタイプ

### Figmaプラグイン
Figma to HTML – Figma
https://www.figma.com/community/plugin/851183094275736358/Figma-to-HTML

### コード化できるフレームワーク
Figma to WordPress
Figma to HTML5
Figma to Webflow
Figma to Shopify
Figma to Flutter
Figma to React
Figma to Squarespace
Figma to Drupal
Figma to Custom Software
Figma to Mobile Application

### コード化できるStyle
HTML/CSS

### 感想
コンポーネントを選んでダウンロードを選んでもHTML関連のファイルが出来るだけで、
デザインをそのままコード化というのには程遠いい状況でした。
使い方がいまいちわからなかったです。
（ダウンロードの横にあったサイトのリンクは宣伝だと思ったので途中で止めました。）








## monday hero
基本有料
14日間のフリートライアル

スマフォ特化
Swiftのみ
Flutter
Kotlin (Comming Soon)
React (Comming Soon)
Next.js対応していないのでこれ以上調査せず。




# 終わりに

小規模プロジェクトや個人利用の場合、そしてTailwindCSSを利用する場合、 ***「動的なサイト」*** を作る場合はデザインとコードを分業せずに、
Tailwind UI - Official Tailwind CSS Components & Templates
https://tailwindui.com/
このような出来上がったUIを利用して並べたほうが効率的かもしれない。
静的ページで作ったランディングページだけは利用する等使い分けたほうがいいと思う。

<details><summary>ツール群を調べてみた感想（開ける必要は無し）</summary>

前提 TailwindCSSを使う予定

動的なサイトを作る場合に、
Figmaのデザインファイルをコード化するツールを利用するには欠点があると思う。
Figmaで作り上げたデザインをそのままコード化するのだが、
コード化した際は細かい設定で非常に見にくいソースコードになり、
そのデザインから動的なサイトを作ろうとすると、
非常に作りにくくなるのではないかという点だ。

まだ実際に試していないが、
TailwindCSSの場合はプログラムソースの中にデザインの設定値をおいてあるので
非常に読みにくいソースになるのではないかと思う。

ランディングページならば1枚画像みたいなものなので中身をいじる必要は殆どない。
だからあくまでも静的なサイトを作るためのものだ、
CSSファイルを分離するタイプのスタイルだとそれほど混乱しないのかもしれない。

動的に作るデザインの場合はMantine UIを使ってFigma用のデザインシステムを利用して、
それから並べてみるつもりだが、これはこれから試すので結論はまだ出ない。
Figma上で簡単にページを作ってそれからコード化を試すには時間がかかりすぎるのでやらないつもりだ。

コード化ツールとしては後発のこのTeleportHQやLocofyは無料で出来るのでこの2つに絞って試してみるつもりだ。
後発であるがゆえに、コードのダウンロードでさえも無料で開放されている。

</details>