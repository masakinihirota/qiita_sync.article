<!--
title:   site2pdf サイトをPDFファイルにするツール 例えば、サイトのドキュメントをPDFファイルにしてそれをNotebookLMに読み込ませて質問する。
tags:    NotebookLM,site2pdf,tool
id:      8afe748130717e178df4
private: false
-->
何度も使いそうなのでメモ

laiso/site2pdf at blog.lai.so

https://github.com/laiso/site2pdf?ref=blog.lai.so

複数ページに渡るドキュメントなどでこの使用します。

## 基本の使い方

PDF化したいサイトのURLをメモ

```terminal
npx site2pdf-cli "メモしたURL"

```

## 実行例

今回はDrizzle ORMのドキュメントをPDFファイルにします。

Drizzle ORMを訪れます。

Drizzle ORM - next gen TypeScript ORM.

https://orm.drizzle.team/

ドキュメントのページを開きます。

Drizzle ORM - Why Drizzle?

https://orm.drizzle.team/docs/overview

このDrizzleのドキュメントを開くと、overview(概要欄)ページが開きます。
このままでは概要欄ページだけがPDFファイルになるので
ドキュメント全体をPDFファイルにするために

`https://orm.drizzle.team/docs/overview`
を
`https://orm.drizzle.team/docs/`
と編集します。

コマンドを実行します。

```terminal
> npx site2pdf-cli "https://orm.drizzle.team/docs/"
Generating PDF for https://orm.drizzle.team/docs/ and sub-links matching /^https:\/\/orm.drizzle.team\/docs\//
loading https://orm.drizzle.team/docs/

(省略)

Generated PDF for https://orm.drizzle.team/docs/typebox
PDF saved to C:\Users\hi\Documents\_ドキュメント2025\supabase\out\orm-drizzle-team-docs.pdf

```

👆️省略部分には読み込みページの一覧が表示されています。
outのフォルダが作られそこに "orm-drizzle-team-docs.pdf"というファイル名で出力されます。

PostgreSQLなどはPDFが用意されていたのですが、他は見かけなかったのでツールを使いました。
NotebookLMに読み込ませるにはPDF形式が良いだろうとこのツールを選びました。