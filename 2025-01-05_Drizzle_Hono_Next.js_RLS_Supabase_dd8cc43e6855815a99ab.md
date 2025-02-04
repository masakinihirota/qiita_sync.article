<!--
title:   Drizzle RLS Supabase Next.js Hono 最小限の開発
tags:    Drizzle,Hono,Next.js,RLS,Supabase
id:      dd8cc43e6855815a99ab
private: true
-->

2025年1月26日
現在: 限定記事

todo




----------------------------------------
----------------------------------------

今回は👇️このスターターを利用します。

SAASスターター
nextjs/saas-starter: Get started quickly with Next.js, Postgres, , and shadcn/ui.

https://github.com/nextjs/saas-starter

👆スターターの紹介(Vercelでの紹介)
Next.js SaaS Starter Template

https://vercel.com/templates/next.js/next-js-saas-starter

👆️スターターのデモ
Next.js SaaS Starter

https://next-saas-start.vercel.app/


----------------------------------------

# スタータを利用して
Next.js
Supabase
Drizzle
Hono
Stripe
等を組み合わせて使います。

Storybook

有料なので使ってない
FigmaのDevモード


## 





## 





----------------------------------------

# 開発時重要コマンド



## Drizzle基本コマンド

```terminal
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
npx drizzle-kit pull
npx drizzle-kit reset

npm run db:seeds

```

## SQL

SupabaseのダッシュボードのSQL EditorからSQL文を実行します。

テーブルデータ削除

```sql
# usersテーブルのデータの確認
SELECT * FROM users;

# usersテーブル内のデータの削除
-- テーブル内のデータを取得
SELECT * FROM users;

-- テーブル内のデータを削除
DELETE FROM users; -- 特定の条件で削除する場合
TRUNCATE TABLE users; -- テーブルのデータをすべて削除（高速）

-- テーブル自体を削除
DROP TABLE users;

Supabaseのロール一覧
SELECT * FROM pg_roles;

```

特定の条件に合致するデータを削除する場合は DELETE を使用します。
テーブル内の全てのデータを高速に削除する場合は TRUNCATE TABLE を使用します。
テーブル自体が不要になった場合は DROP TABLE を使用します。

※👆 TRUNCATE命令はDELETE命令よりも高速に動作しますが、間違って全件削除しても、元に戻せません。
外部キー制約がある場合には使用できません。

そのためにバックアップは **必須** です。





## package.jsonバージョン調査

```terminal
npm install -g npm-check-updates
# バージョン調査
ncu

# 全ライブラリ アップグレード
ncu -u

```

package.jsonのnpmのバージョンを一括で書き変えてくれるncuが便利だった - tacamy--blog

https://tacamy.hatenablog.com/entry/2016/08/10/193603

## 

supabase CLIの更新
scoop update supabase


## 




## 





----------------------------------------

# 開発時URL


## ローカルのSupabaseのダッシュボード

http://127.0.0.1:54323/project/default/editor






## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------

# 





## 





## 





----------------------------------------
----------------------------------------



