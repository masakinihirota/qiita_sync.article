<!--
title:   テンプレートから始めるテスト駆動開発 (Next.js 13 App router、 vitest 、 Storybook、 Plop)
tags:    AppRouter,Next.js,Vitest,plop,storybook
id:      3c7ef09cbaebfa702bba
private: true
-->
理想的なサイクル

1. コンポーネントの設計をします。

1. plopを使い `*.tsx` (コンポーネントのテンプレートファイル)を作成します。同時に `*.stories.js` (Storybookファイル)と `*.test.tsx` (テストファイル)も作成します。

1. テスト駆動開発 vitest を使ってサイクルを回します。
    * テストを書きます。 RED
    * コードを書きます。 GREEN
    * リファクタリングを行います。 Refactoring
    * Storybookで動作確認をします。
完成に近づけます。

1. 設計図通りに完成させます。

1. コンポーネントを本体に取り込みます。

以上を繰り返します。

第一部は
↑これらを実現させる環境を構築します。

第二部は実際に作成した環境を使ってテスト駆動開発を行います。
ハンズオン形式



# 使用ツール

Next.js 13 App router
vitest ＋ in-source-testing
Storybook
Plop

Windows
VSCode


# ツール紹介

## Next.js 13 App router

React のフレームワーク

Next.js by Vercel - The React Framework
https://nextjs.org/

## vitest ＋ in-source-testing

viteを利用しているテスティングフレームワーク

in-source-testing は同じファイルの中に コードとテストを同時に書く手法

Vitest | A blazing fast unit test framework powered by Vite

https://vitest.dev/

Features | Guide | Vitest

https://vitest.dev/guide/features.html#in-source-testing

## Storybook

コンポーネント管理ツール

Storybook: Frontend workshop for UI development

https://storybook.js.org/


## PLOP

テンプレート自動生成ツール

Consistency Made Simple : PLOP

https://plopjs.com/


vitest の in-source-testing は上記サイクルの完成後に余裕があれば取り入れます。
(最初はコードとテストとストーリーファイルは分けておきたい。)