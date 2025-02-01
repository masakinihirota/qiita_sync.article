<!--
title:   SAASスターター Next.js 15 shadcn/ui Postgres Drizzle Stripe テンプレート 👈️Supabaseに変更
tags:    Drizzle,Next.js,Supabase,shadcn,stripe
id:      f3a8251dd86c10ecbe75
private: false
-->
# SAASスターター
nextjs/saas-starter: Get started quickly with Next.js, Postgres, Stripe, and shadcn/ui.

https://github.com/nextjs/saas-starter

# SAASスターターの紹介(👆️と同じもの Vercelでの紹介)
Next.js SaaS Starter Template

https://vercel.com/templates/next.js/next-js-saas-starter

# デモ

Next.js SaaS Starter

https://next-saas-start.vercel.app/



このSAASスターターをPostgresからSupabaseに変更して動かします。

Supabase CLIはインストールしておいてください。
Dockerは立ち上げておき、

```terminal
supabase init

```

👆️このコマンドを実行してSupabaseをインストールしておいてください。

ローカルのSupabaseは立ち上げておきます。

# 新規作成、変更箇所

```.env
# Drizzleの環境変数
# ローカルのSupabaseへの接続用
POSTGRES_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
STRIPE_SECRET_KEY="sk_test_*****"
STRIPE_WEBHOOK_SECRET="whsec_*****"
BASE_URL=http://localhost:3000
AUTH_SECRET="*****"

# ローカルのSupabase環境変数
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="e*****"

```

### DB関連のフォルダ構造

```
lib
├── auth
├── db
│   ├── schema
│   │   └── originalSchema.ts
│   ├── drizzle.ts
│   ├── queries.ts
│   ├── seed.ts
│   └── setup.ts
├── payments
└── utils.ts

supabase
├── .branches
│   └── _current_branch
├── .temp
│   └── cli-latest
├── migrations
│   ├── meta
│   │   ├── _journal.json
│   │   └── 0000_snapshot.json
│   └── 0000_soft_the_anarchist.sql
├── .gitignore
└── config.toml

```

dbフォルダの下にschemaフォルダを作り、
`schema.ts` ファイルを、名前を変えてここに移動します。
ここはわかりやすく `originalSchema.ts` にしています。

Drizzleは指定フォルダ以下にスキーマファイルを置けば、
マイグレーションコマンドや、pushコマンド実行時に、
全スキーマファイルを読み込んでくれます。



```drizzle.config.ts
// import type { Config } from 'drizzle-kit';

// export default {
//   schema: './lib/db/schema.ts',
//   out: './lib/db/migrations',
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: process.env.POSTGRES_URL!,
//   },
// } satisfies Config;

// 👆 元のコード
// 👇 Supabase(ローカル)の設定に変更

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });

export default defineConfig({
  // フォルダ内にあるスキーマファイルを読み込む
  schema: './lib/db/schema',
  // Supabase へのマイグレーションファイルを出力するディレクトリ
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});

```

マイグレーション関連のファイルは、全てSupabaseのフォルダに移動します。

```generateAuthSecret.js
import crypto from 'node:crypto';

function generateAuthSecret() {
  console.log('Step 5: Generating AUTH_SECRET...');
  const fx = crypto.randomBytes(32).toString('hex');
  console.log("🚀 ~ generateAuthSecret ~ fx:", fx)
}

generateAuthSecret();

```

AUTH_SECRETに関しては、👆️のコードで出力されたコードをコピペします。

```.env
AUTH_SECRET="*****"

```

```terminal
ts-node te.js

```



# read.mdを読む前に。

read.mdはDEMO画面と同じ状態までの手順が書かれています。

途中に同梱の環境変数セットアップコマンドを使用して .env ファイルを作成しますが、

```terminal
pnpm db:setup

```

👆️このコマンドはDocker Postgres用の環境変数ファイル.envを作るためのものなので実行しません。

Stripeの環境変数は用意しておく必要があります。
Stripeを今使わないのなら用意しなくてもデモ画面は動きます。

環境変数のファイル作成と、DBの変更を行うだけでDEMO画面と同じぐらいにまで出来ます。



# read.mdの日本語訳

※このread.meはこのスターターの実行手順が書かれています。

### Next.js SaaS スターター

これは、認証サポート、支払いのためのStripe統合、およびログインユーザー向けのダッシュボードを備えたSaaSアプリケーションを構築するためのスターターテンプレートです。

**デモ: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

#### 特徴

- アニメーション付きターミナル要素を持つマーケティングランディングページ (`/`)
- Stripe Checkoutに接続する価格ページ (`/pricing`)
- ユーザー/チームのCRUD操作が可能なダッシュボードページ
- オーナーとメンバーの役割を持つ基本的なRBAC
- Stripeカスタマーポータルを使用したサブスクリプション管理
- JWTをクッキーに保存するメール/パスワード認証
- ログインルートを保護するグローバルミドルウェア
- サーバーアクションを保護するローカルミドルウェアまたはZodスキーマの検証
- ユーザーイベントのアクティビティログシステム

#### 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/)
- **データベース**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **支払い**: [Stripe](https://stripe.com/)
- **UIライブラリ**: [shadcn/ui](https://ui.shadcn.com/)

#### 始め方

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install

```

#### ローカルでの実行

同梱のセットアップスクリプトを使用して `.env` ファイルを作成します:

```bash
pnpm db:setup

```

次に、データベースのマイグレーションを実行し、デフォルトのユーザーとチームでデータベースをシードします:

```bash
pnpm db:migrate
pnpm db:seed

```

これにより、以下のユーザーとチームが作成されます:

- ユーザー: `test@test.com`
- パスワード: `admin123`

もちろん、`/sign-up` から新しいユーザーを作成することもできます。

最後に、Next.jsの開発サーバーを実行します:

```bash
pnpm dev

```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて、アプリを確認してください。

オプションとして、StripeのCLIを使用してローカルでStripeのWebhookをリッスンし、サブスクリプション変更イベントを処理することができます:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook

```

#### 支払いのテスト

Stripeの支払いをテストするには、以下のテストカード情報を使用します:

- カード番号: `4242 4242 4242 4242`
- 有効期限: 未来の日付
- CVC: 任意の3桁の番号

#### 本番環境への移行

SaaSアプリケーションを本番環境にデプロイする準備ができたら、以下の手順に従ってください:

##### 本番Stripe Webhookの設定

1. Stripeダッシュボードに移動し、本番環境用の新しいWebhookを作成します。
2. エンドポイントURLを本番APIルートに設定します（例: `https://yourdomain.com/api/stripe/webhook`）。
3. リッスンするイベントを選択します（例: `checkout.session.completed`, `customer.subscription.updated`）。

##### Vercelへのデプロイ

1. コードをGitHubリポジトリにプッシュします。
2. リポジトリを [Vercel](https://vercel.com/) に接続し、デプロイします。
3. Vercelのデプロイプロセスに従い、プロジェクトの設定を行います。

##### 環境変数の追加

Vercelプロジェクトの設定（またはデプロイ中）で、必要なすべての環境変数を追加します。本番環境用の値を更新することを忘れないでください。以下の変数を含めます:

1. `BASE_URL`: 本番ドメインを設定します。
2. `STRIPE_SECRET_KEY`: 本番環境用のStripeシークレットキーを使用します。
3. `STRIPE_WEBHOOK_SECRET`: ステップ1で作成した本番Webhookのシークレットを使用します。
4. `POSTGRES_URL`: 本番データベースのURLを設定します。
5. `AUTH_SECRET`: ランダムな文字列を設定します。`openssl rand -base64 32` で生成できます。