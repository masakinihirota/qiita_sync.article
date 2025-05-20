<!--
title:   Next.js Supabase でのGitHub認証時のログはDocker側で出力される。(ローカル開発中)
tags:    Docker,Drizzle,Next.js,Supabase,docker-for-windows
id:      14c90fbb23f43d44e6d8
private: false
-->
# 結論

認証時の詳細なログはDocker側で出力されます。

認証失敗時の詳細なログはどこの出力されるのか？ を調べてみました。



## それぞれのログ

Docker側に詳細なログが出力されます。(結論)
Next.js側ではメッセージか簡易すぎます。
Supabaseのダッシュボード側では見方がわかりませんでした。



# 例

タイトル通り、Next.js Supabase で開発していて、Webアプリでユーザー認証に成功したとき、auth.usersテーブルにデータが保存され、トリガーを使いpublicテーブルにそのデータをコピーする場合です。

認証に失敗した場合、
Next.jsのターミナルでのログでは原因の特定は困難です。

```terminal
 GET /?error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user 200 in 140ms

 ```

ターミナルに出力されるログ 👆トリガーが失敗したときに、ターミナル側で出力されるログですが、これでは原因がよくわかりません。

詳細なログはDocker側に出力されていました、

![Dockerのコンテナ 説明.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/d05bc0b1-5540-c527-1d7f-764540c33e51.png)

![Dockerのログ 棒.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/cd661df4-25b4-ae51-b79c-1276fcbdcb2f.png)

👆 詳細なログが出力されています。

後はログを読むか、コピペしてAIに聞くだけです。

* 開発中は試したい動作の開始から終了までのログが欲しいので、Logs画面の右側のゴミバケツアイコンで毎回リセットします。



# Supabaseのダッシュボードのログ

Supabaseのダッシュボードではログが見れませんでした。
(コマンドを実行して出力する形式のようですが、ログを出力させるコマンドは知りません。)

Supabaseのダッシュボードの左サイドメニューのLogからログは見れるようですが、

ログ画面の上にある Insert Sourceのドロップダウンメニューのauth_logsを選ぶと、

```
select
  timestamp, event_message, metadata
  from auth_logs edge_logs limit 5

```

このselectを実行しても、

```
{
  "code": 500,
  "message": "An error has occurred: fetch failed",
  "requestId": "cd8af92e-dd1f-4c22-9284-c2275417b08f"
}

```

👆このように出力されてしまい、希望通りのログが見れませんでした。
全く使い方がわかっていない状態です。

# 実際のコード

Next.jsでSupabaseを利用したGitHub認証

使用テーブル
auth.users <<認証成功時、このテーブルに登録されます。
public.roots <<auth.usersに登録されたデータで必要なカラムをこのrootsテーブルにコピーします。

※auth.usersはSupabaseのシステムで利用するので、アプリ側では読み込み専用になります。

## 挿入用関数とトリガー

```add_root.sql
-- 新規ユーザー登録時に、auth.usersに行が挿入されたとき、public.rootsに行を挿入するトリガー用の関数
create or replace function public.add_root()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    -- GitHub認証時に得た情報を利用してrootsテーブルにデータを挿入します
    begin
        insert into public.roots (
            id,                   -- ユーザー識別用ID
            aud,                  -- 認証情報
            email,                -- ユーザーのメールアドレス
            email_confirmed_at,   -- メール確認日時
            last_sign_in_at,      -- 最後のサインイン日時
            raw_app_meta_data,    -- アプリからのメタ情報
            raw_user_meta_data,   -- ユーザーに関する全メタ情報（JSON）
            name,                 -- ユーザー名（表示名）
            full_name,            -- フルネーム
            user_name,            -- ユーザー名（システム用）
            created_at,           -- アカウント作成日時
            updated_at,           -- 更新日時
            deleted_at           -- 削除日時
        )
        values (
            new.id,                                   -- auth.usersの新しいID
            new.aud,                                  -- auth.usersの認証情報
            new.email,                                -- auth.usersのメールアドレス
            new.email_confirmed_at,                   -- auth.usersのメール確認日時
            new.last_sign_in_at,                      -- auth.usersの最後のサインイン日時
            new.raw_app_meta_data,                    -- アプリメタ情報
            new.raw_user_meta_data,                    -- ユーザーメタ情報全体
            new.raw_user_meta_data ->> 'name',          -- ユーザー名（表示用）
            new.raw_user_meta_data ->> 'full_name',     -- ユーザーのフルネーム
            new.raw_user_meta_data ->> 'user_name',     -- システム用ユーザー名
            new.created_at,                           -- 作成日時
            new.updated_at,                           -- 更新日時
            new.deleted_at                           -- 削除日時
        );
    exception when others then
        -- エラー発生時、詳細なエラーメッセージを出力
        raise exception 'Error inserting into roots table: %', sqlerrm;
    end;
    return new;
end;
$$;

-- auth.usersに新しいユーザーが作成されると、public.add_root関数を実行するトリガーを設定します
create or replace trigger add_root
    after insert on auth.users
    for each row execute procedure public.add_root();

```

👇Drizzleを使ってrootsテーブルを作成します。

```roots.ts
import {
  foreignKey,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const roots = pgTable(
  'roots',
  {
    id: uuid('id').primaryKey().notNull(),
    aud: text('aud'),
    email: text('email').notNull(),
    emailConfirmedAt: timestamp('email_confirmed_at'),
    lastSignInAt: timestamp('last_sign_in_at'),
    rawAppMetaData: jsonb('raw_app_meta_data'),
    rawUserMetaData: jsonb('raw_user_meta_data'),
    name: text('name'),
    fullName: text('full_name'),
    userName: text('user_name'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at')
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [authUsers.id]
    }).onDelete('cascade')
  ]
)

```

# 取得したデータ

## auth.usersのデータ

```auth.users_data.json
{
  "instance_id": "00000000-0000-0000-0000-000000000000",
  "id": "*****",
  "aud": "authenticated",
  "role": "authenticated",
  "email": "*****@gmail.com",
  "encrypted_password": null,
  "email_confirmed_at": "2025-02-06 23:07:05.487861+00",
  "invited_at": null,
  "confirmation_token": "",
  "confirmation_sent_at": null,
  "recovery_token": "",
  "recovery_sent_at": null,
  "email_change_token_new": "",
  "email_change": "",
  "email_change_sent_at": null,
  "last_sign_in_at": "2025-02-06 23:07:05.491238+00",
  "raw_app_meta_data": {
    "provider": "github",
    "providers": [
      "github"
    ]
  },
  "raw_user_meta_data": {
    "iss": "https://api.github.com",
    "sub": "*****",
    "name": "masakinihirota",
    "email": "*****@gmail.com",
    "full_name": "masakinihirota",
    "user_name": "masakinihirota",
    "avatar_url": "https://avatars.githubusercontent.com/u/*****?v=4",
    "provider_id": "*****",
    "email_verified": true,
    "phone_verified": false,
    "preferred_username": "masakinihirota"
  },
  "is_super_admin": null,
  "created_at": "2025-02-06 23:07:05.472528+00",
  "updated_at": "2025-02-06 23:07:05.495121+00",
  "phone": null,
  "phone_confirmed_at": null,
  "phone_change": "",
  "phone_change_token": "",
  "phone_change_sent_at": null,
  "confirmed_at": "2025-02-06 23:07:05.487861+00",
  "email_change_token_current": "",
  "email_change_confirm_status": 0,
  "banned_until": null,
  "reauthentication_token": "",
  "reauthentication_sent_at": null,
  "is_sso_user": false,
  "deleted_at": null,
  "is_anonymous": false
}

```


## rootsテーブルにコピーされたデータ

```roots_rows.csv
id,aud,email,email_confirmed_at,last_sign_in_at,raw_app_meta_data,provider,raw_user_meta_data,name,full_name,user_name,created_at,updated_at,deleted_at
*****,authenticated,*****@gmail.com,,,"{""provider"":""github"",""providers"":[""github""]}",,"{""iss"":""https://api.github.com"",""sub"":""*****"",""name"":""masakinihirota"",""email"":""*****@gmail.com"",""full_name"":""masakinihirota"",""user_name"":""masakinihirota"",""avatar_url"":""https://avatars.githubusercontent.com/u/*****?v=4"",""provider_id"":""*****"",""email_verified"":true,""phone_verified"":false,""preferred_username"":""masakinihirota""}",masakinihirota,masakinihirota,masakinihirota,2025-02-06 23:07:05.472528,2025-02-06 23:07:05.472528,

```

👆見にくい場合はAIにJSON形式に変換してくださいと👇お願いすると。

```root.json
{
  "id": "*****",
  "aud": "authenticated",
  "email": "*****@gmail.com",
  "email_confirmed_at": null,
  "last_sign_in_at": null,
  "raw_app_meta_data": {
    "provider": "github",
    "providers": ["github"]
  },
  "provider": null,
  "raw_user_meta_data": {
    "iss": "https://api.github.com",
    "sub": "*****",
    "name": "masakinihirota",
    "email": "*****@gmail.com",
    "full_name": "masakinihirota",
    "user_name": "masakinihirota",
    "avatar_url": "https://avatars.githubusercontent.com/u/*****?v=4",
    "provider_id": "*****",
    "email_verified": true,
    "phone_verified": false,
    "preferred_username": "masakinihirota"
  },
  "name": "masakinihirota",
  "full_name": "masakinihirota",
  "user_name": "masakinihirota",
  "created_at": "2025-02-06 23:07:05.472528",
  "updated_at": "2025-02-06 23:07:05.472528",
  "deleted_at": null
}

```
