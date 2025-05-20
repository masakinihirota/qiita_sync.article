<!--
title:   Supabase のVSCode拡張機能
tags:    PostgreSQL,Supabase
id:      a36e864c09517526a6df
private: false
-->
VSCode上でDBの中身が見れます。
![SupabaseVSCodeExtentions_081424_041747_AM.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2a7e2cc2-869d-be26-5b9c-455ed79a8c14.jpeg)

この拡張機能はSupabaseローンチウィーク12で発表されたものの一つです。

# Supabaseローンチウィーク12

https://supabase.com/blog

## postgres-new

https://supabase.com/blog/postgres-new

GitHub Copilot(中身はGPT-4o)の支援を使ってPostgresのデータベース設計を手伝ってもらえるWebサービス。

### postgres-newの使用例

ドラッグアンドドロップによる CSVファイルからの データをインポート
入力した設計やデータから即座にテーブルを自動生成
レポートの生成とエクスポート
チャートを生成する
データベースダイアグラムを構築する ER図
SQL文の自動生成 (自動実行と手動実行が必要)
pgvector を用いたベクトル検索が可能
サンドボックス方式

中身はPostgresの派生であるブラウザ用組み込みデータベースのPGliteを使用しています。

チャートの生成は、メッセージに「チャート」（または類似語）という単語を追加するだけで、AI は SQL を使用して適切なクエリを実行します。

自分のアプリに適用するのはコピペします。

### 現在開発中
デプロイ機能
一般的なファイル(Word ドキュメント 画像)対応
他の人とのデータベースの共有
OPFSサポート
(これはWebアプリケーションがユーザーのローカルファイルシステムにアクセスできるようにするAPIです。
CRUD出来るようになります。)
データベースのエクスポート
(データベースの pg_dump を実行し、任意の Postgres データベースに復元できるようになります。)

### PGlite

ローカル開発、リモート開発に対応。

https://pglite.dev/

### pg-gateway

サーバサイドから Postgres のワイヤプロトコルを実装する TypeScript ライブラリ。認証リクエストやクエリ、その他のクライアントメッセージを自分で処理するためにフックできるAPIです。

https://github.com/supabase-community/pg-gateway

ローンチウィーク12では他にも👆このような発表がありました。



# 1個目 Supabase公式拡張機能

https://supabase.com/blog/github-copilot-extension-for-vs-code

👆Supabase公式のVSCode拡張機能がでました。これはGitHub Copilotが必要です。

## 拡張機能のURL

https://marketplace.visualstudio.com/items?itemName=Supabase.vscode-supabase-extension

## 必要なもの

VSCode
Docker
ローカルでのSupabase
GitHub Copilot
Supabase CLI

### Link

https://github.com/features/copilot

https://supabase.com/docs/guides/cli/getting-started

## 拡張機能で使用できる機能

### Supabaseに関する会話

GitHub Copilotを通してのSupabaseとのチャット

GitHub Copilotとのチャット時に、@supabaseを付けて会話します。

```
@supabase [質問]

```

とSupabaseに関する質問をします。

### SupabaseのmMgirations

Copilot ガイド付きデータベースMigrations
この拡張機能では、データベースMigrationsの作成を支援するガイドを提供します。

```
@supabase /migration <実行内容を記述>

```

### SupabaseのMigrationsリストの表示。

### Supabase内のDBテーブルの表示

左サイドバーでSupabaseアイコンを選ぶとDBの中身が見られます。

エディターから直接、列、型、データを含むテーブルとビューを表示します。

### Supabaseのトリガー関数の表示。

他にもVSCode拡張機能のSupabaseで検索したリストの中で見つけたもの。



# 2個目 Supabase用のスニペット拡張機能

https://marketplace.visualstudio.com/items?itemName=supabase-snippets.supabase-javascript-snippets

JavaScriptファイル上でSupabase用のスニペットが使えるようになります。
※TypeScriptファイルには対応していません。

## Supabaseスニペット一覧

| プレフィックス | 説明 |
|---|---|
| stc | Supabase テーブルに新しいレコードを作成する |
| ssrwc | 条件付きでテーブルからレコードを選択する |
| sbur | テーブル内のレコードを更新する |
| sbdr | テーブルからレコードを削除する |
| sbuf | Supabase ストレージにファイルをアップロードする |
| sbdf | Supabase ストレージからファイルを取得する |
| sbdelf | Supabase ストレージからファイルを削除する |
| sblf | Supabase ストレージ内のフォルダ内のファイルをリストする |
| sb-signup | ユーザーをサインアップする |
| sbs-login | ユーザーをログインさせる |
| sbs-logout | 現在のユーザーをログアウトする |
| sbgu | 現在のユーザーを取得する |
| sbgs | 現在のセッションを取得する |
| sbrp | メールアドレスのパスワードをリセットする |
| sioauth | OAuth を通じてユーザーをサインインする |
| fd | テーブルまたはビューに対して SELECT クエリを実行する |
| csurl | サインド URL を作成する |
| rpurl | パブリック URL を取得する |



```snipet.js
stc	Supabase テーブルに新しいレコードを作成する supabase table create
const { data, error } = await supabase
  .from('table_name')
  .insert({
    column1: value1,
    column2: value2,
    // Add more columns and values here
  })

ssrwc	条件付きでテーブルからレコードを選択する
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column_name', value)

sbur	テーブル内のレコードを更新する supabase update record
const { data, error } = await supabase
  .from('table_name')
  .update({
    column1: updatedValue
  })
  .eq('column_name', value)

sbdr	テーブルからレコードを削除する supabase delete record
const { data, error } = await supabase
    .from('table_name')
    .delete()
    .eq('column_name', value)

sbuf	Supabase ストレージにファイルをアップロードする supabase upload file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .upload('path/to/file', file)

sbdf	Supabase ストレージからファイルを取得する supabase donload file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .download('path/to/file')

sbdelf	Supabase ストレージからファイルを削除するsupabase delete file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .remove('path/to/file')

sblf	Supabase ストレージ内のフォルダ内のファイルをリストする supabase list file
const { data, error } = await supabase.storage
  .from('bucket_name')
  .list('path/to/folder')

sb-signup	ユーザーをサインアップする supabase signup
const { user, session, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

sbs-login	ユーザーをログインさせる supabase login
const { user, session, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

sbs-logout	現在のユーザーをログアウトする supabase logout
await supabase.auth.signOut()

sbgu	現在のユーザーを取得する supabase get user
const { data: { user } } = await supabase.auth.getUser()

sbgs	現在のセッションを取得する supabase get session
const session = supabase.auth.session()

sbrp	メールアドレスのパスワードをリセットする supabase reset password
await supabase.auth.resetPasswordForEmail('hello@example.com')

sioauth	OAuth を通じてユーザーをサインインする sign oauth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
  options: {
    redirectTo: 'https://example.com/welcome'
  }
})

fd	テーブルまたはビューに対して SELECT クエリを実行する from data
const { data, error } = await supabase
  .from('name_table')
  .select()

csurl	サインド URL を作成する create signed url
const { data, error } = await supabase
  .storage
  .from('avatars')
  .createSignedUrl('folder/avatar1.png', 60)

rpurl	パブリック URL を取得する
const { data } = supabase
  .storage
  .from('public-bucket')
  .getPublicUrl('folder/avatar1.png')

```
