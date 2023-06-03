<!--
title:   コンポーネントコロケーションパターン
tags:    Next.js,React,Storybook,TypeScript,tailwindcss
id:      40a529c6a7a4b3fcc806
private: true
-->

コンポーネントコロケーションパターン
component collocation pattern
component_collocation_pattern

コンポーネント単位で一つにまとめる
ソースコードも
テストファイルも
ストーリーファイルも

TypeScriptの型定義ファイルも
フォルダ単位でカプセル化を行う。
＝コンポーネントを外部からアクセスできない


画面表示に表示されるpresentationのコンポーネントがコンポーネントの最小単位

一つのフォルダにまとめて入れる開発手法
小規模開発向け

ロジックのコンポーネントを分ける

Collocation
https://kentcdodds.com/blog/colocation

コロケーション | makotot.dev
https://www.makotot.dev/posts/colocation-translation-ja

[Next.jsのAppRouter] コロケーションパターンを実現し、eslintで依存の向きを強制する方法
https://zenn.dev/ampersand/articles/9cf546795074d1

Collocation
コロケーションとは、ネットワークへの常時接続環境のもとに、サーバや回線接続装置などを共同の場所に設置する事を言う。ユーザが構築した、サーバを預かって管理保守していくサービスの事を、コロケーションサービスや、ハウジングサービスという。


