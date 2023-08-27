<!--
title:   Supabaseの認証であるsupabase-auth-helpers から auth-helpers は何が変わったのか？
tags:    Supabase,auth-helpers,supabase-auth-helpers
id:      e02bf72d71ae06f31b4c
private: false
-->
2022年の6月にsupabaseの認証がsupabase-auth-helpers から auth-helpers に変更されました。

https://supabase.com/blog/2022/07/05/beta-update-june-2022

結論から書くと
supabase-auth-helpersは全部入りの認証ライブラリ。
auth-helpers は個別の認証ライブラリです。

```
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

```

と、このように前者はreactとnextjsが一緒に入っています。
それを切り分けたのが後者のauth-helpersです。

```
import { UserProvider } from @supabase/auth-helpers-react
import { supabaseClient } from @supabase/auth-helpers-nextjs

```

各フレームワークのライブラリを全部一緒に入れていたのが前者、各フレームワークごとに独立させたのが後者。
React
Next.js
Sveltekit
Remix
今ではこの数だけが対応していますが、これから対応するフレームワークを増やしていくためにライブラリの肥大を避けるため分割したのではないかと思われます。