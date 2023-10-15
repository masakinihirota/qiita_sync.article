<!--
title:    Next.js Supabaseの組み合わせに GitHub Actionsを導入する。 DBの型安全、テスト、バックアップを自動生成、自動実行をする。
tags:    GitHub,GitHubActions,Next.js,Supabase
id:      9f5161c0f00c9e54f93a
private: true
-->

この記事を読む前に

この記事は未完成です。
Supabaseのサーバーの用意が大変面倒だったのでローカルの動作確認で
ストップしています。



環境として
Supabaseのローカル、サーバー環境の2種類を用意する必要があります。

コマンドラインでローカルの動作を確認して
GitHub ActionsでGitHub上のリポジトリから動作の確認をします。


GitHubに環境変数を登録する必要があります。
.env.localのローカルはダメで
.env サーバーの環境変数を登録する必要があります。

環境変数がないと、GitHubからSupabase サーバー の
型の生成やテストなどが出来ません。



# 環境

個人開発
Next.js
Supabase
GitHub
GitHubActions



# 下準備

<details><summary>下準備</summary>

# Next.jsインストール

↓このページを参考にします。

Use Supabase with Next.js | Supabase Docs

https://supabase.com/docs/guides/getting-started/quickstarts/nextjs



npx create-next-app -e with-supabase

Next.jsの公式サンプルの一つです。
↓このリポジトリをそのまま利用します。

next.js/examples/with-supabase at canary · vercel/next.js

https://github.com/vercel/next.js/tree/canary/examples/with-supabase



動作確認
npm run dev

これではまだ、このサンプルは動きません。

Supabaseの環境ファイルが必要です。

Supabaseのプロジェクトを作って環境変数を取得する必要があります。



# 環境ファイルを作る

※Supabaseでプロジェクトを作成済みで、
プロジェクトの設定情報は知っているものとします。

touch .env.local

```.env.local
NEXT_PUBLIC_SUPABASE_URL=https://zhlmcrnnjbsfhbnctenz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey***********************************74

```

.env.local.example
は削除します。



動作確認
npm run dev
npm run build
npm run start

※npm run devで起動していると、npm run buildはエラーを出して止まってしまうので、
npm run devは停止させてから npm run buildを実行させてください



## GitHub へのPUSH

GitHub Actionsを利用するためには GitHub でリポジトリを作る必要があります。

VSCodeの機能で
左サイドバーのソース管理で
Branchの発行ボタンを押します。

Publish to GitHub public repository [GitHubアカウント名]/githubaction

publicを選択してGitHub上にリポジトリを作成します。

ターミナルから
gh browse
を実行するとブラウザ上からリポジトリを開くことが出来ます。

GitHubへはVSCodeの機能 ソース管理で簡単にリポジトリが作成され、PUSH出来ました。



# Supabaseにサンプルのテーブルとデータを入力

↓Supabaseのダッシュボードから

左サイドバー＞SQL Editorから

```SQL_EDITOR.sql
 -- Create the table
 create table countries (
   id serial primary key,
   name text not null
 );

 -- Insert some sample data into the table
 insert into countries (name) values ('United States');
 insert into countries (name) values ('Canada');
 insert into countries (name) values ('Mexico');

```

↑を実行します。

```
Success. No rows returned

```

が出れば成功です。



次に、DBデータ表示用のページを作ります。

まずは、トップページをシンプルにします。

```app\page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div>
      <h1>VNS.BLUE</h1>
      <Link href="/countries">countries</Link>
    </div>
  );
}


```



次にデータ表示用のページを作ります。

mkdir app/countries
touch app/countries/page.tsx

```src/app/countries/page.tsx
  import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
  import { cookies } from "next/headers";

  export default async function Index() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    const { data: countries } = await supabase.from("countries").select();

    return (
      <ul className="my-auto text-foreground">
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    );
  }

```



これで
npm run dev
で立ち上がり、

http://localhost:3000/countries
このページに行くとSupabaseからデータを取得できていることが確認できます。

</details>

下準備終了。



----------------------------------------

# SupabaseをGitHub Actionsで動かす

3つのドキュメント

Generate types using GitHub Actions | Supabase Docs
https://supabase.com/docs/guides/cli/github-action/generating-types

Automated testing using GitHub Actions | Supabase Docs
https://supabase.com/docs/guides/cli/github-action/testing

Automated backups using GitHub Actions | Supabase Docs
https://supabase.com/docs/guides/cli/github-action/backups



この3つのSupabaseドキュメントは

SupabaseのDB内から

型を自動取得する方法
テストを自動実行する方法
バックアップを自動実行する方法

が出来るようになります。



----------------------------------------

# GitHub Actions を使用した型の自動生成

まずはGitHub Actionsで自動生成する前に

手動で型の生成を実行して型ファイルを生成してみます。


supabase gen types typescript > database.types.ts




Generate types using GitHub Actions | Supabase Docs

https://supabase.com/docs/guides/cli/github-action/generating-types

型安全
型の生成

型の生成
Supabase CLI を使って、Postgres データベースから自動的に Typescript 定義を生成することができます。

これらの定義を supabase-js クライアントに渡すことで、クライアント、サーバー、データベースの間でエンドツーエンドの型安全性を得ることができます。

リポジトリ内で、
.github/workflows
↑このフォルダ内に
generate-types.yml
という新しいファイルを作成します。

このスニペットをファイル内にコピーすると、新しいPRが作成されるたびにアクションが実行されます。

このファイルが正しく動作するためには、以下の前提条件が必要です。

supabase CLIがインストールされていること。
supabase initコマンドを実行して、Supabaseプロジェクトが初期化されていること。
supabase db startコマンドを実行して、PostgreSQLサーバーが起動していること。



mkdir .github/workflows/
touch .github/workflows/generate-types.yml

```generate-types.yml
name: 'generate-types'
on:
  push:
    branches:
      - main

jobs:
  build: 
    runs-on: ubuntu-latest
    steps:
        - uses: supabase/setup-cli@v1
            with:
            version: latest
        - run: supabase init
        - run: supabase db start
        - name: Verify generated types match Postgres schema
          run: |
            supabase gen types typescript --local > schema.gen.ts
            if ! git diff --ignore-space-at-eol --exit-code --quiet schema.gen.ts; then
              echo "Detected uncommitted changes after build. See status below:"
              git diff
              exit 1
            fi

```

※個人開発を想定しているのでpull_requestから push mainブランチのタイミングに変更しました。



## 解説

↑このYAMLファイルは、GitHubのpushイベントがトリガーとなって、Ubuntu最新版で実行されるジョブを定義しています。

このジョブは、以下の手順を実行します。

1. supabase/setup-cli@v1を使用して、最新バージョンのsupabase CLIをセットアップします。
2. supabase initを実行します。
3. supabase db startを実行します。
4. supabase gen types typescript --localを実行して、Postgresスキーマに基づいてTypeScriptの型を生成します。
5. git diffを使用して、生成されたスキーマファイルとローカルの変更を比較します。
6. 変更がある場合は、変更内容を表示して、ジョブを失敗させます。

このファイルの長所は、Postgresスキーマに基づいてTypeScriptの型を自動生成することで、手動で型を作成する手間を省くことができることです。また、変更がある場合はジョブを失敗させるため、変更をコミットする前に問題を修正することができます。

このファイルの利用用途は、Postgresスキーマに基づいてTypeScriptの型を自動生成することが必要な場合に使用することができます。例えば、Supabaseを使用している場合には、SupabaseのCLIを使用してTypeScriptの型を生成することができます。



```
    - name: Verify generated types match Postgres schema
      run: |
        supabase gen types typescript --local > schema.gen.ts
        if ! git diff --ignore-space-at-eol --exit-code --quiet schema.gen.ts; then
          echo "Detected uncommitted changes after build. See status below:"
          git diff
          exit 1
        fi

```

↑このYAMLファイルのこの部分は、Postgresスキーマに基づいてTypeScriptの型を自動生成し、生成された型が正しいかどうかを検証するためのステップです。

1. `name: Verify generated types match Postgres schema`：このステップの名前です。このステップでは、生成された型がPostgresスキーマに基づいて正しく生成されているかどうかを検証します。
2. `run: |`：このステップで実行するコマンドを示す記号です。`|`は、複数行のコマンドを実行するために使用されます。
3. `supabase gen types typescript --local > schema.gen.ts`：このコマンドは、Postgresスキーマに基づいてTypeScriptの型を自動生成し、`schema.gen.ts`というファイルに出力します。
4. `if ! git diff --ignore-space-at-eol --exit-code --quiet schema.gen.ts; then`：このコマンドは、生成された型が正しいかどうかを検証するために、`schema.gen.ts`ファイルとローカルの変更を比較します。
5. `echo "Detected uncommitted changes after build. See status below:"`：このコマンドは、変更がある場合に表示されるメッセージです。
6. `git diff`：このコマンドは、変更内容を表示します。
7. `exit 1`：このコマンドは、ジョブを失敗させます。

このYAMLファイルの長所は、Postgresスキーマに基づいてTypeScriptの型を自動生成することで、手動で型を作成する手間を省くことができることです。また、変更がある場合はジョブを失敗させるため、変更をコミットする前に問題を修正することができます。

このYAMLファイルは、PostgreSQLデータベースのスキーマに基づいてTypeScriptの型を自動生成するためのものであり、生成された型が実際のデータベースのスキーマと一致しない場合には、ジョブが失敗し、新しい型ファイルが上書きされます。

このファイルは、pushイベントに反応するように設定されているため、push時に自動的に実行されます。
push前に生成された型が実際のデータベースのスキーマと一致していることを確認することができます。



----------------------------------------

# GitHub Actions を使用した自動テスト

Automated testing using GitHub Actions | Supabase Docs

https://supabase.com/docs/guides/cli/github-action/testing

##通常のデータベースのテスト


自動テストの前に
テストが実行できるようにします。

Testing Your Database | Supabase Docs

https://supabase.com/docs/guides/database/testing


まずは使用しているSupabaseのプロジェクトの
ダッシュボードから 
左サイドバーのDashboardのExtensionsから
PGTAPを有効にします。

そして
supabase stop
supabase start
とsupabaseを再起動します。



次に
テストファイルを置くフォルダとファイルの作成をします。

mkdir supabase\tests\database

touch supabase\tests\database\auth.test.sql

```auth.test.sql
begin;
select plan(1); -- only one statement to run

SELECT has_column(
    'auth',
    'users',
    'id',
    'id should exist'
);

select * from finish();
rollback;

```

実行結果

```terminal
> supabase test db
supabase/tests/database/auth.test.sql .. ok
All tests successful.
Files=1, Tests=1,  0 wallclock secs ( 0.01 usr  0.00 sys +  0.02 cusr  0.00 csys =  0.03 CPU)
Result: PASS

```



## 解説

このSQLコードは、PostgreSQLデータベースの`auth`スキーマ内の`users`テーブルに`id`カラムが存在するかどうかを確認するためのテストです。

1. `begin;` - トランザクションを開始します。
2. `select plan(1);` - テストプランを設定します。この場合、1つのステートメントだけが実行されます。
3. `SELECT has_column('auth', 'users', 'id', 'id should exist');` - `auth`スキーマ内の`users`テーブルに`id`カラムが存在するかどうかを確認します。`has_column`関数は、指定されたスキーマ、テーブル、カラムが存在する場合に真を返します。この場合、`id`カラムが存在することが期待されます。
4. `select * from finish();` - テストを完了します。`finish`関数は、テストが成功したことを示すために真を返します。
5. `rollback;` - トランザクションをロールバックし、変更を取り消します。

このテストの長所は、PostgreSQLデータベースのスキーマに対して簡単に実行できることです。また、`has_column`関数を使用することで、カラムの存在を簡単に確認できます。

このテストは、PostgreSQLデータベースのスキーマに対して簡単に実行できるため、開発者がデータベースのスキーマを変更した場合に、スキーマが正しく構成されていることを確認するために使用できます。また、このテストは、CI/CDパイプラインに統合されることができ、自動的に実行されるため、開発者が手動でテストを実行する必要がなくなります。






## GitHub Action を使ってテストを実行する

リポジトリ内の .github/workflows フォルダに database-tests.yml という名前のファイルを作成します。
このスニペットをファイル内にコピーすると、pushするたびにアクションが実行されます。



mkdir .github/workflows/
touch .github/workflows/database-tests.yml

```database-tests.yml
name: "database-tests"
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: supabase/setup-cli@v1
        with:
          version: 1.11.4
      - run: supabase db start
      - run: supabase test db

```

※個人開発を想定しているのでpull_requestから push mainブランチのタイミングに変更しました。




今回のテストはpush時にテストを実行するようにしました。

テストをされるのは、サーバーのSupabaseです。
これはGitHub Actionsにより自動実行されます。

結果は リポジトリのトップナビバーにある Actionsのタブを開きます。

ローカルのSupabaseをテストするのは
supabase db testで実行します。








## Edge Functions のテスト

Edge Functions のユニットテストを作成したら、GitHub Action を使ってテストを実行します。

リポジトリ内の .github/workflows フォルダに functions-tests.yml というファイルを作成します。このスニペットをファイル内にコピーすると、pushするたびにアクションが実行されます。



touch .github/workflows/functions-tests.yml



```functions-tests.yml
name: 'functions-tests'
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: supabase/setup-cli@v1
        with:
          version: 1.11.4
      - run: supabase start
      - run: supabase functions serve
      - run: deno test --allow-all deno-test.ts --env-file .env.local

```

※個人開発を想定しているのでpull_requestから push mainブランチのタイミングに変更しました。




## Supabase の DBのテストについて

pgTAP: Unit Testing | Supabase Docs

https://supabase.com/docs/guides/database/extensions/pgtap


公式サイト pgTAP: Unit Testing for PostgreSQL

https://pgtap.org/

Supabase CLI のコマンド (v1.28.3) - Qiita

https://qiita.com/masakinihirota/items/685f70770d8224ba2fa5





使用方法
pgTAP: Unit Testing | supabase
https://supabase.com/docs/guides/database/extensions/pgtap

このコマンドを使うにはpgtapのextensionを有効にする必要があります。

有効にした後、supabase コンテナを再起動する。
supabaesディレクトリの下に適当なファイルを作成する。

```[ファイル名].txt
begin;
select plan( 1 );

select has_table( 'profiles' );

select * from finish();
rollback;

```

※ 拡張子はわからないのでtxtにしておく。
※ テストファイルの書き方が不明

テストファイル作成後、
supabase test db
を実行する。











----------------------------------------

## GitHub Actions を使用した自動バックアップ

Automated backups using GitHub Actions | Supabase Docs

https://supabase.com/docs/guides/cli/github-action/backups














疑問
リモートのテストのやり方は？



