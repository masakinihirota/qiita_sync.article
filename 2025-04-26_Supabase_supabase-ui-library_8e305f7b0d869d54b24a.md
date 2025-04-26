<!--
title:   Supabase-UI-Library OAuth認証 (Google、GitHub)＋匿名認証
tags:    Supabase,supabase-ui-library
id:      8e305f7b0d869d54b24a
private: false
-->
Supabase-UI-Library を使って、Google認証、GitHub認証、匿名認証(AI製)を実装しました。

Supabase-UI-Library を使えば OAuthの設定(認証用のキーを取得する、Supabaseの設定)の手間だけで実装できます。

OAuth認証用のキーは各自で取得してください。
Supabaseのサーバーの設定は各自で設定をしてください。
匿名認証はOAuth認証を参考にGitHub Copilotで実装しています。

# この記事のリポジトリ

masakinihirota/Supabase-UI-Library

https://github.com/masakinihirota/Supabase-UI-Library

# README.md

素のNext.jsにSupabase UI Library の Social Authを追加して、ファイルを少し編集をしました。

# 採用技術
* Next.js 15 App router
* Supabase
* Supabase UI Library の Social Auth
を使って
Google Auth
GitHub Auth
匿名 Auth (GitHub Copilot製)
を実装しています。

Supabase UI Library
https://supabase.com/ui

* Drizzle ORM
* Biome
* lint-staged

supabase/config.toml の[analytics]などをfalseにしています。
理由はローカルでの動作を軽くしたり、trueにするとWindowsのローカル環境ではうまく動かないためです。

`.github/supabase/prompts/*`
これはSupabaseの公式の指示書です

supabase/examples/prompts at master · supabase/supabase

https://github.com/supabase/supabase/tree/master/examples/prompts