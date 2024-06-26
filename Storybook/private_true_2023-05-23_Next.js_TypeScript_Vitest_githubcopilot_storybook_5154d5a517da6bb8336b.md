<!--
title:   Storybook 超入門 Ver7 SFC3 TailwindCSS vitest GitHubCopilot
tags:    Next.js,TypeScript,Vitest,githubcopilot,storybook
id:      5154d5a517da6bb8336b
private: true
-->
# 用語

## コンポーネントファイル
通常のReactのコンポーネントを定義するファイルです。
Storybookの影響を受けません、Storybookを使っていてもいなくてもコンポーネントのコードは同じになります、つまりコンポーネントファイルの中にStorybookの独自のコードは入らないのでロックインの心配はありません。


## ストーリーファイル
SFC3(Component Story Format 3.0)というフォーマットで記述されたファイルです。
Reactに依存しません、Storybookの独自のフォーマットです。

https://storybook.js.org/blog/component-story-format-3-0/


# Storybookとは？
Reactのコンポーネントを1つのアプリケーションのように扱えるツール
これを利用することでNext.jsのアプリからコンポーネントを切り離すことができ。
あらゆるコンポーネントのパターンをシミュレーションして設計、開発できる。

コンポーネントとはウェブアプリの画面を構成する最小単位です。

# 目的
最小限のStorybookはどのようなものか調べる、
０からStorybook使ってコンポーネントを作ってみる。
そして、作ったコンポーネントをどのように使っていくか見ていく。

# バージョン
storybook 7.0.13

Next.jsアプリは
![ウェブ画面.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/795484fe-1100-6438-d3b1-f451ff259a15.png)

Storybookを導入しても
（UIコンポーネントの管理ツールとも言えます。）
![Next.js２.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2204dc96-0725-05e7-dddf-4c74e9c61a3f.png)

上記図のUIコンポーネント部分をNext.jsから切り離して、Storybookの支配下に置きます。
そうすることで、コンポーネント同士のスパゲティ化を防ぐ効果が生まれます。
Next.js部分はビジネスロジックやDB等のデータアクセス部分に集中します。
表示する部分を作る時にStorybookからUIコンポーネントをimportします。
![Next.js3.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9c14595e-64b7-c63e-b1cc-382b5c620bb0.png)

Storybookの導入で画面表示のコンポーネントを切り離して独立させることができます。
Next.jsとUIコンポーネントを個別に管理することで、スパゲティ化を防ぐ効果があります。
そうすることで全体の構成が自然ときれいになります。

# Storybookを利用するための準備

Storybookは何かのフレームワークと組み合わせて使用します。
今回はNext.jsを使用します。

インストール
npmを最新にします。
npm install -g npm@latest

Next.jsをインストールします。
npx create-next-app@latest
	オプションでapp routerを選択します。

インストールしたフォルダに移動して

Storybookをインストールします。
npx storybook@latest init
    オプションでESlintを選択します。


# 基本方針
Storybookをインストールするとサンプルが src\stories の中に入っています。
しかしこれを削除します。

srcフォルダの下にcomponentsフォルダを作成します。
componentsフォルダの中にコンポーネントとストーリーファイルを作成します。
（テストファイルも同じフォルダに入れます。）



## 理由
これは、 src\stories というフォルダの中でストーリーファイルを管理してしまうとコンポーネントフィアルとストーリーファイルが別れてしまうので、2重管理になってしまうのを防ぐ狙いがあります。（テストも別のテストフォルダで管理すると3重管理になってしまうので、テストファイルも一つのフォルダの中で管理するようにします。）





# 0からStorybookを使ってコンポーネントを作ってみる

最小構成から始めるため最初からあるsrc\storiesに入っているサンプルを削除します。

場所
削除するフォルダ
src\storiesフォルダを削除します。

残しておくフォルダ
/.storybookフォルダはStorybookの設定が入っているのでそのまま残しておきます。



src\pages\index.tsxファイルを最小に変更
余分なimport文とreturn文の中身を適当な文字列に変えます。

```src\app\page.tsx
import type { NextPage } from "next"

const Home: NextPage = () => {
  // 適当な文字を出力
  return <main className="text-center">VNS.BLUE</main>
}

export default Home


```

src\pages\index.tsxファイルを装飾していた部分を削除して、TailwindCSSを使うための設定だけを残ししておきます。

```src\app\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```


ここで一旦ローカルを立ち上げてみます
npm run dev

http://localhost:3000/

トップページで文字列を確認

Storybookの動作確認
npm run storybook

Storiesフォルダを削除したので
Couldn't find any stories in your Storybook.
ストーリーファイルがありませんとでます。

ここから0からコンポーネントとストーリーファイルを作成していきます。

# Storybookで最小限のコンポーネントを作る。

一番シンプルなボタンのコンポーネントを作ります

componentsフォルダを作成して

コンポーネントファイルを作ります。

↓ Github Copilotを使用すると下記の1行を入力するだけで・・・

```Button.jsx

// シンプルなボタンコンポーネントの作成

```

↓ 後は適度にタブキーとリターンキーで行間をあけていくと

```Button.jsx
// シンプルなボタンコンポーネントの作成
// このコンポーネントは、ボタンのテキストとクリック時のイベントを受け取る

import React from "react"

// ボタンのテキストとクリック時のイベントを受け取る
type Props = {
  children: string
  onClick: () => void
}

// ボタンコンポーネント
const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

```

出来たボタンコンポーネントをトップページに配置します。

```
import Button from "@/components/Button"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <main className="text-center">
      {/* ボタンを表示します。 */}

      <Button onClick={() => alert("クリックされました。")}>ボタン</Button>
    </main>
  )
}

export default Home

```

http://localhost:3000/
を見ると

```
Unhandled Runtime Error
Error: Event handlers cannot be passed to Client Component props.
  <button className=... onClick={function} children=...>
                                ^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.

```

>訳
>未処理のランタイムエラー
>エラーです： イベントハンドラをクライアントコンポーネントのプロップに渡すことができません。
>  <button className=... onClick={function} children=...> です。
                                ^^^^^^^^^^
>インタラクティブ性が必要な場合は、この一部をクライアントコンポーネントに変換することを検討してください。


このようにエラーで動きません。

これはなぜかと言うと、Next.jsの仕様で、クライアントサイドで動くコンポーネントにはイベントハンドラを渡せないという制限があるからです。

これを解消するには Client Component というものを使います。
Next.jsは Server Component と Client Component という2種類のコンポーネントを提供しています。

Next.jsは基本的にすべてのファイルは Server Componentになっているのでこのエラーが出ました。
クライアントサイドで動かすファイルの上部に "use client" ディレクティブを宣言します。

ですので修正すると

```src\pages\index.tsx
"use client"

import Button from "@/components/Button"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <main className="text-center">
      {/* ボタンを表示します。 */}

      <Button onClick={() => alert("クリックされました。")}>ボタン</Button>
    </main>
  )
}

export default Home


```

ブラウザをリロードするとボタンが表示されました。

ボタンを押すとメッセージが表示されます。








次に、ストーリーファイルを作ります。


```Button.stories.jsx

// コンポーネントのストーリーが、引数をpropsとして受け取る単純なコンポーネントである場合。
import { ComponentMeta } from '@storybook/react';

// コンポーネントファイルを読み込む
import Button  from './Button';

export default {
  // ブラウザで表示するタイトル
  // titleは自由に変えられます。
  // titleを変えるとブラウザ画面上にエラーが出ます、その場合はtitleをもう一度クリックし直すと新しい設定値でコンポーネントを呼び出してくれエラーが直ります。
  title: "Button",

  // .storybook\main.jsの"stories"設定とマッチするファイルを探します。
  // Buttonの場合はButton.tsxファイルを探しています。
  component: Button,

  // TypeScriptの型設定
  // ComponentMetaは コンポーネントのストーリーが、引数をプロップとして受け取る単純なコンポーネントで使用します。
} as ComponentMeta<typeof Button>;

// storyです
// このコンポーネントにいろんな引数を与えて
// 色んなパターンの表示を見ることができます。
// storyはそれぞれ独立しているので、このように中身が同じアロー関数を与えても大丈夫です。（通常は色々なパターンの引数を与えシミュレートします。）

export const Default1 = () => <Button>Click me</Button>;

export const Default2 = () => <Button>Click me</Button>;

export const Default3 = () => <Button>Click me</Button>;

```














# 参考

Storybookを導入する際にやるべきこと3選

https://zenn.dev/sum0/articles/9463d16d9d40e2
