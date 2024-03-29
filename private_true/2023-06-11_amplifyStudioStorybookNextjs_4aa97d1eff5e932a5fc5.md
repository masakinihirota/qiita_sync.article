<!--
title:   既存のデザインシステムを利用する方法 FigmaからStorybookそしてNext.jsへ (デジタル庁のを使用する NPO法人向けサイト等)
tags:    デザインシステム
id:      4aa97d1eff5e932a5fc5
private: true
-->

# 目的
デジタル庁デザインシステムにまるごと乗っかってFigmaからStorybookに落としてNext.jsでTailwindCSSにするまで。
デザインにこだわらないのでこのデザインシステムをそのまま利用する。






# 環境
Next.js
Storybook
Chromatic
TailwindCSS
Figma
Chromatic

Figmaでプロジェクトを作成する

デジタル庁がデザインシステムをFigmaで発表
そのデジタル庁のデザインシステムをそのまま流用する

ChromaticにはNext.jsアプリにStorybookをインストールして
そのStorybookをChromaticに登録する

FigmaのデータをStorybookに取り込む
FigmaのプラグインStorybook connectを利用する

取り込んだデザインをTailwindCSSに変換する
ChatGPTかGitHub Copilot でCSSをTailwindCSSにコード変換する





# 使用サイト

Github
masakinihirota/storybook_connect
https://github.com/masakinihirota/storybook_connect

Figma UI デザインツール。

https://www.figma.com/

Storybook コンポーネント管理ツール

https://storybook.js.org

Chromatic Storybook をホスティングするサービス。

https://www.chromatic.com/


デジタル庁デザインシステム

https://www.figma.com/@jpdigitalagency

※TailwindCSSに対応していない
TailwindCSSに変換をする

デザインシステムに関するご要望・ご質問はデジタル庁ウェブサイトよりお問い合わせください。

https://form-www.digital.go.jp/contact/

Storybook Connect – Figmaのプラグイン

https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect
ストーリーをFigmaのワークスペースに埋め込んで、実際の実装を一箇所で相互参照することができます。
StorybookConnectウィンドウを開くと、実際のコンポーネントとのインタラクションが開始されます。

FigmaとStorybookを連携することで
Figma上にStorybookのウィンドウを表示させることができ、
よりシームレスにUIコンポーネントの確認が進められます。

Storybook Connect Pluginを使用すると、以下のことが可能になります：

デザイン・コンポーネントをストーリーにリンクする
Figmaのインタラクティブなストーリーで遊ぶ
実装を設計と比較する

コンポーネントをリンクする
コンポーネントやバリアントをストーリーにリンクすると、
そのリンクはFigmaのすべてのインスタンスに伝わります。
また、共同作業者にもストーリー・リンクが表示されます。

実装とデザインを比較するプラグインには、
アウトライン、メジャー、
背景などのおなじみのツールを含む、
コンパクトかつパワフルなストーリー埋め込みが
付属しています。

サイドバーからストーリーブックを開くFigmaのサイドバーにある
「StorybookConnect」
セクションをちらっと見るだけで、
どのコンポーネントがリンクされているかを
確認できます。

アクセスコントロールとセキュリティのために、
Chromaticアカウントが必要です、
こちらから無料でサインアップしてください。

Storybookのディスコードに参加し、
#figma-pluginチャンネルでサポートを受けることが
できます！



# 変換
まずStorybookでTailwindCSSを利用できるようにする。

Integrate Tailwind CSS with Storybook | Storybook

https://storybook.js.org/recipes/tailwindcss


# 最初のデザインシステムのイメージ
デザインシステムのはパーツを作っておいて、それを再利用していくシステム。
＋アクセシビリティがついている

# Storybook connect

デザイナーとFigmaで協業するエンジニアの事始め - Qiita

https://qiita.com/ta1m1kam/items/93bfcc38d0501333073f



###########################################################

# プロジェクトの開始

新しいフォルダ、storybook_connectフォルダを作成

## Next.jsのインストール

インストール
npx create-next-app@latest

プロジェクト名
storybook_connect

インストールのオプション選択
√ What is your project named? ... storybook_connect
√ Would you like to use TypeScript with this project? ... No / Yes
√ Would you like to use ESLint with this project? ... No / Yes
√ Would you like to use Tailwind CSS with this project? ... No / Yes
√ Would you like to use `src/` directory with this project? ... No / Yes
√ Use App Router (recommended)? ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
√ What import alias would you like configured? ... @/*

動作確認
npm run dev

## Storybookをインストール
npx storybook@latest init

動作確認
npm run storybook


## Githubリポジトリに公開する
Next.jsやStorybookをインストール後、Github上にリポジトリにを公開する


## Chromatic
GitHub でリポジトリを連携して共有リンクを取得する

Chromatic
https://www.chromatic.com/

アカウントを作ってログインして

Github上にアップロードしたNext.jsのプロジェクトの追加
Add project
右上にある水色のボタン

Github上のリポジトリから先ほど作成したNext.jsのプロジェクトを選ぶ
Choose from GitHub
左のボタン

npm install --save-dev chromatic

npx chromatic --project-token=ch************71
※プロジェクトによって --project-token の値は変わります。

このコマンドを実行することで
Nice. You published a Storybook.
Each component was securely indexed and versioned on our CDN.


# storybook connect
FigmaからStorybookに取り込む
Next.jsでStorybookを利用して開発をする



ストーリーブックを再度パブリッシュする
テストパブリッシュコマンドを再度実行し、UIの調整をアップロードし、Chromaticが変更をキャッチします。

npx chromatic --project-token=ch************71

script
package.json
  "chromatic": "npx chromatic --project-token=ch************71"

現在は以下の3つの内容を提供しています。
* スタイル (色や形など基礎となるもの)
* コンポーネント (ボタンや入力フォームなど、具体的なパーツ集)
* テンプレート (コンポーネントを用いた頻出する画面のテンプレート)



Chromatic で Storybook を公開する
Storybook が存在する GitHub リポジトリを Chromatic に追加する



Chromatic側で公開用のトークンが
自動生成されます。
例えば、更新したStorybookを手動でChromatic側に反映す
る場合にも以下のコマンドを
叩きます。

npx chromatic --project-token=ch************71

少し待つと公開が完了します。
ローカルにログファイル
build-storybook.log
が生成されるので
.gitignoreに追加しておきます。

```.gitignore
# Storybook
build-storybook.log

```

Chromaticのダッシュボードで
Library へ移動

ページ左上に Share libraryがあるので
共有リンクを取得します。
このリンクを公開すると、ライブラリが公開されます。



Storybook Connect を使って Figma で Storybook のコンポーネントを確認する ++ Gaji-Laboブログ
https://www.gaji.jp/blog/2022/05/26/9784/

Storybook Connect を使って Figma で Storybook のコンポーネントを確認する

Storybook Connect プラグインを使って Figma と Chromatic 上の Storybook を連携する方法

Figma と Storybook を連携することで Figma 上に Storybook のウィンドウを表示させることができ、よりシームレスに UI コンポーネントの確認が進められます。



前提
Figma と Chromatic のアカウントがあること
Figma にプロジェクトが既にあること
Chromatic に Storybook プロジェクトが既にあること

Figma に Storybook Connect をインストールする

Storybook Connect の初期設定

パーマリンクの取得

左サイドバーのManageから
ManageのCollaborateタブを選択する

https://<branch>--<appid>.chromatic.com
https://www.chromatic.com/library?appId=64*****************cc&branch=main


# 参考

デザイナーとFigmaで協業するエンジニアの事始め - Qiita

https://qiita.com/ta1m1kam/items/93bfcc38d0501333073f

デジタル庁のサイトやばすぎるwww - Qiita

https://qiita.com/mu_tomoya/items/f78f1fad3a8b57ac7dc3

Understanding Success Criterion 2.5.8: Target Size (Minimum) | WAI | W3C

https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

現在策定中の「WCAG2.2」に「2.5.8: Target Size (Minimum)」という新しい達成基準
