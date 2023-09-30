<!--
title:   Next.js App routerで複数の認証 (メール、GitHub、Google 等)  を同時に使いたい場合 どうやって組み合わせればいいの？
tags:    AppRouter,Next.js,Supabase
id:      af0bb9e876898039e862
private: true
-->
Next.js App routerで複数の認証
メール
GitHub
Google
等

を使いたい場合
どうやって組み合わせればいいの？

それぞれ独立させたい場合
例えば、メールとGitHubでログインしても別人として扱いたい。

全部まとめて一つにしたい場合。
同一人物として気軽に切り替えて使いたい。

これからドキュメントを調べて、楽な方で行きたいと思います。


----------------------------------------

npx create-next-app -e with-supabase auth

touch .env.local

```.env.local
NEXT_PUBLIC_SUPABASE_URL=https://zhlmcrnnjbsfhbnctenz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey***********************************74

```

Auth | Supabase Docs

https://supabase.com/docs/guides/auth

認証:この人は入場を許可されるべきですか? 「はい」の場合、彼らは誰ですか?
許可:一度入ったら何をすることが許可されますか?


サードパーティプロバイダーを構成する#
サードパーティプロバイダの設定#
Authentication > Providers > Auth Providersに移動し、
それぞれのクライアントIDとシークレットを入力すれば、
ボタンをクリックするだけでサードパーティプロバイダを有効にできる。






Vercel リダイレクト

Redirect URLs | Supabase Docs

https://supabase.com/docs/guides/auth/concepts/redirect-urls

パスワードレスサインインやサードパーティプロバイダを
使用する場合、
Supabaseのクライアントライブラリメソッドには、
認証後のリダイレクト先を指定するredirectToパラメータが
用意されています。
デフォルトでは、ユーザはSITE_URLにリダイレクトされますが、
SITE_URLを変更したり、
リダイレクト先のURLを許可リストに追加したりすることが
できます。

必要なURLを許可リストに追加したら、
redirectToパラメータにユーザーをリダイレクトさせたいURLを
指定します。



Next.js Auth Helpers のインストール

npm i @supabase/auth-helpers-nextjs @supabase/supabase-js



create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null
);

insert into
  posts(title)
values
  ('first post'),
  ('second post'),
  ('third post')



app/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  // クライアント作成
  const supabase = createServerComponentClient({ cookies });
  // postsテーブルからデータ取得
  const { data: posts } = await supabase.from("posts").select();

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}



Github OAuthを有効にするには、
GitHub OAuthアプリケーションをセットアップして、
アプリケーションの認証情報をSupabaseダッシュボードに
追加する必要があります。

ここではAuthButton.tsxを作成して、ログインボタンとログアウトボタンを作っています。

今回はボタン押下時に認証処理を行いたいので、use clientを冒頭に記載します。
つまり、クライアントコンポーネントになるのでcreateClientComponentClient関数を用いて Supabase クライアントを作成します。



サインイン処理については、SignInWithOAuth 関数で
Github 認証を実装しており、ユーザーがサインインに成功すると、

http://localhost:3000/auth/callback

にリダイレクトする想定です。



AuthButton.tsx
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const AuthButton = () => {
  // Supabaseクライアント作成
  const supabase = createClientComponentClient();

  // サインイン処理
  const handleSignIn = async () => {
    // GitHub OAuthで認証する
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  // サインアウト処理
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <button onClick={handleSignIn}>Login</button>
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
};



app/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
 import { AuthButton } from "./_components/AuthButton";

export default async function Home() {
 const supabase = createServerComponentClient({ cookies });
 const { data: posts } = await supabase.from("posts").select();

 return (
   <>
     <AuthButton />
     <pre>{JSON.stringify(posts, null, 2)}</pre>;
   </>
 );
}



3. Route Handlers の作成
サインインに成功すると、http://localhost:3000/auth/callback
にリダイレクトするので、Router Handler を作成する必要があります。

今回は、app ディレクトリ配下にauth/callback/route.tsを作成します。
このルートで実行しているのは、Code Exchange(コード交換) です。

まず、リクエストURLからクエリパラメータcodeを指定して、
認証コードを取得します。
認証コードが存在する場合に、
createRouteHandlerClient関数でクライアントを作成し、
exchangeCodeForSession関数で
アプリ側とSupabaseとの間でセッションを確立しています。



import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Code Exchange用のルートハンドラ
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // 認証コードを使用して、Supabaseとのセッションを確立する
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // サインイン後にリダイレクトするURLを指定
  return NextResponse.redirect(requestUrl.origin);
}



ここまでの内容をまとめると、
GitHub認証を通じてセッションが確立され、
ユーザの認証とアプリケーションとSupabaseの間で
セキュアに通信が行えるになりました。

セッション情報には認証情報が管理されるため、
今後Supabaseへアクセスする際にはセッション情報が
使用されます。



create policy "authenticated user can select posts" ON "public"."posts"
as permissive for select
-		 to public
+		 to authenticated
using (true);
























Login with GitHub | Supabase Docs

https://supabase.com/docs/guides/auth/social-login/auth-github


