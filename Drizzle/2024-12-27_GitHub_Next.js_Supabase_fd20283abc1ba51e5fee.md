<!--
title:   GitHub認証 ソーシャルログイン (Next.js Supabase ローカル開発環境用)
tags:    GitHub,Next.js,Supabase
id:      fd20283abc1ba51e5fee
private: false
-->
# このコードのリポジトリ

masakinihirota/nextjs_supabase

https://github.com/masakinihirota/nextjs_supabase

GitHub認証の動作確認済み

# 目的

Bolt.newというWebサービスでGitHub認証機能を作ってもらいましたが、どのように動いているのか実際のコードを確認します。

この記事では、SupabaseでGitHub認証を確認します。ローカル環境で動作させます。



# 前提知識

*   Next.js 15
*   Supabase (サーバー環境)
*   Supabase (ローカル環境)
*   TypeScript
*   VSCode
*   GitHub

Supabase  (ローカル環境) ダッシュボード

http://localhost:54323/project/default



# Next.js インストール

```terminal
npx create-next-app@latest --typescript --tailwind --eslint

[app name]
√ Would you like your code inside a `src/` directory? ... No / [Yes]
√ Would you like to use App Router? (recommended) ... No / [Yes]
√ Would you like to use Turbopack for `next dev`? ... No / [Yes]
√ Would you like to customize the import alias (`@/*` by default)? ... No / [Yes]
√ What import alias would you like configured? ... @/*

```



## Next.jsの環境ファイル

※注意

環境変数のファイルは `.env` というファイル名にしてください。

<details><summary>Next.jsの環境変数設定に関するトラブルシューティング</summary>
`.env.local` ファイルでは環境変数を読み込んでくれませんでした。(Windows10環境)

`.env.local`の設定は正しいと信じ込み、他の場所を色々試しましたが`undefined`となり、読み込んでくれませんでした。以前あったトラブルを思い出し、`.env`とファイル名を変更したら読み込んでくれました。

</details>



## ローカル環境のSupabase インストール

```terminal
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-icons

supabase init
supabase start
supabase status

```

### Supabaseの環境変数

```terminal
         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: ey*****I0
service_role key: ey*****U
   S3 Access Key: 62*****3c
   S3 Secret Key: 85*****07
       S3 Region: local

```

## Next.js アプリの環境変数

## Next.js、GitHub認証の環境変数

GitHubの環境変数 GITHUB_CLIENT_ID と GITHUB_SECRET の取得方法は👇️を御覧ください。

Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub) #OAuth - Qiita

https://qiita.com/masakinihirota/items/706326a64dab3ffbf55b

GitHub認証 ローカルで動かす OAuth-practice #localhost - Qiita

https://qiita.com/masakinihirota/items/f9b99ca444ddeda1f4ef



```terminal
touch .env

```

`.env`ファイルに以下を記述します。

```.env
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 環境変数
# Next.js 15
# GITHUB ローカル環境
GITHUB_REDIRECT_URI="http://127.0.0.1:54321/auth/v1/callback"
GITHUB_CLIENT_ID="Ox****"
GITHUB_SECRET="e3*****"

# ローカルのSupabase環境変数
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ey*****"

# Drizzleの環境変数
# ローカルのSupabaseへの接続用
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# サーバーのSupabaseへの接続用
# DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE].supabase.co:5432/postgres

```



# 認証機能の実装: Supabase Authを用いた ソーシャルログイン (GitHub認証)

Next.js Supabase でのソーシャルログイン (Github認証) を作成します。



### SupabaseでのGitHub認証の有効化

Supabaseの設定ファイルに追記します。

```config.toml
...
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

```



# Supabaseがエラーで起動しない場合

supabase_vector_[アプリ名] container is not ready: unhealthy エラー対処方法 Supabaseローカル開発環境 #Supabase - Qiita

https://qiita.com/masakinihirota/items/5578a6cf89780de120a3

```config.toml
...
[analytics]
enabled = false
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

```

👆️設定ファイルの一部 [analytics] を無効化します。



# Next.js での GitHub認証コードの実装

GitHub認証に必要な最低限のファイルツリー

```
./src
├── app
│   ├── auth
│   │   └── callback
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── auth
│       └── social-login-buttons.tsx
└── lib
    └── supabase.ts

./supabae
└── config.toml

```

supabaseフォルダは `supabase init` コマンドで自動で出来ます。



## src\app\layout.tsx

```src\app\layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```



## src\app\page.tsx

```src\app\page.tsx
import { SocialLoginButtons } from '@/components/auth/social-login-buttons';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <h1 className="text-2xl font-bold text-center text-foreground">
        ソーシャルログイン
      </h1>
      <SocialLoginButtons />
    </div>
  );
}

```



## src\components\auth\social-login-buttons.tsx

```src\components\auth\social-login-buttons.tsx
'use client';

import { supabase } from '@/lib/supabase';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export function SocialLoginButtons() {
  // 確認
  console.log('SocialLoginButtons');
  const handleGithubLogin = async () => {
    // 確認
    console.log('handleGithubLogin');
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // サーバー側でのリダイレクトURLを指定
        // redirectTo: `${window.location.origin}/auth/callback`,
        // ローカル環境でのリダイレクトURLを指定
        redirectTo: 'http://192.168.1.2:3000/auth/callback',
      },
    });
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // サーバー側でのリダイレクトURLを指定
        // redirectTo: `${window.location.origin}/auth/callback`,
        // ローカル環境でのリダイレクトURLを指定
        redirectTo: 'http://192.168.1.2:3000/auth/callback',

      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <button
        onClick={handleGithubLogin}
      >
        <FaGithub className="w-5 h-5" />
        GitHubでログイン
      </button>
      <button
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="w-5 h-5" />
        Googleでログイン
      </button>
    </div>
  );
}

```



## src\lib\supabase.ts

```src\lib\supabase.ts
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

```

## src\app\auth\callback\route.ts

```src\app\auth\callback\route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}

```



以上でコードは終了です。

Next.jsを立ち上げ、
Supabaseを立ち上げ
ログインボタンを押せば、Supabaseのauth.usersテーブルにユーザーが登録されています。



## Supabaseに登録したユーザーを見る方法

Table Editorから schema authを選択
usersテーブルを選択

SQL Editorから
SQL文を入力

ダッシュボードから Authentication
から見ることが出来ます。


## Supabaseから認証済みユーザーデータの削除

これはシステムに登録されているので、削除手段が少ないです。

ダッシュボードから Authentication から削除できます。
AuthenticationでUsersテーブルの情報が見れます。
削除したいユーザーを選択すると、詳細な情報が見れます。
その下に削除ボタンがあるので押します。


# その他

GitHub認証を応用して Google認証 等も追加できます。
ログインボタンだけは作ってあります。

GoogleからソーシャルログインのIDとSECRETを取得しておきます。

config.tomlに追記します。

```config.toml
...
[auth.external.google]
enabled = true
client_id = "env(GOOGLE_CLIENT_ID)"
secret = "env(GOOGLE_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""

```

後はGitHubと似たような感じでコードを組み立てます。

# 最後に

Blot.newを使うと1行のプロンプトで Next.jsとSupabaseのGitHub認証コードが出ます。
Blot.newでの出力時にエラーが出るのは .envファイルを自分で書く必要があるからです。

自分が昔GitHub認証のコードを調べたときは1週間ぐらいやった気がしましたが、今では1行で終わりです。

中身を知らないままコードを書いていっても危険だと思い、ちょっと調べてみました。
認証は `Supabaseの SSR`ではなく `@supabase/auth-helpers-nextjs` を使っていました。

この記事を利用してDrizzleを使う記事を書く予定です。

