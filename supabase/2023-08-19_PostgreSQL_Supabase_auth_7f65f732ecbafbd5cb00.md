<!--
title:   Supabase Auth スキーマ と そのテーブルの詳細
tags:    PostgreSQL,Supabase,auth
id:      7f65f732ecbafbd5cb00
private: false
-->
追記 2024年5月4日
以前は`@supabase/auth-helpers-nextjs`認証パッケージが使われていましたが、現在は`@supabase/ssr`認証パッケージの使用が推奨されています。

追記終了



# この記事の趣旨

PostgreSQLの認証についてざっくり理解することを目的とします。
高度な技術力が必要な内容ではなく、どのような役割なのか全体を理解する手助けをすることを目的としています。
そしてこの記事の半分はSupabase公式ドキュメントのAuthenticationの翻訳になります。


# 最も大事なこと

X 認証は自分で実装する必要はありません。
◯ 認証は自分で実装してはいけません。

セキュリティリスクはPCの発達により年々高度化しています。
例えば数年前のセキュリティ対策では通用しない場合があります。
そのセキュリティの情報を追いかけるのは、セキュリティの専門家でさえ難しいのが現状です。

そのため、セキュリティの専門家が作成した認証機能を利用することが最も重要です。
前段と矛盾しますが、素人がセキュリティについて数ヶ月しっかり勉強して考えるよりも、プロのセキュリティサービスに任せる方がはるかにましです。
そのためのセキュリティサービスはネット検索をすればたくさん見つかります。



# 開発で重要なこと

Authenticationで重要なことは、認証と認可の違いを理解することです。



## 認証と認可

認証と認可は、セキュリティの観点から非常に重要な概念です。認証と認可の違いを理解することは、セキュリティを向上させるために重要です。

認証は、誰であるかを確認することです。それぞれのユーザーを識別します。
認可は、誰が何をすることができるかを確認することです。色々な行動の許可をするかどうかを決めます。

あるマンションで入口にセキュリティドアがある時、そのマンションの「住人であるかを確認」するのが認証で、
マンションの数多くある部屋の中で、自分の部屋に「入る鍵」（＝部屋に入れる）が認可に当たります。
鍵を使って自分の部屋の中にはいると、(許可を得て？)自分の部屋の中で食事をしたり、寝たり、冷蔵庫から物を取り出したり自由に出来ます。

認証は、ユーザーがアプリに **入る前** の行動
認可は、ユーザーがアプリに **入った後** の行動

最初は混乱しますが、勉強していくうちに全然別のものだと自然にわかってきます。



# データベースのテーブル

データベースを扱う上で基礎中の基礎となるのがテーブルです。

データベースはエクセルの新規ファイルを開いたような状態です。
ただし、エクセル程には自由ではなく、どのような場所にどのような情報を書くかが決まっています。

↓下のテーブルは、マンションの住人の情報を書いたテーブルです。
横には情報の項目を書いていきます。

縦にはその情報の内容を書いていきます。

| 部屋番号 | 名前 | 部屋の鍵 | 冷蔵庫 | テレビ | ベッド | エアコン |
| --- | --- | --- | --- | --- | --- | --- |
| 101 | 山田 | 所持 | 閉 | ON | 有り | 28℃ |
| 102 | 田中 | 未所持 | 閉 | OFF | 無し | OFF |
| 103 | 鈴木 | 所持 | 開 | OFF | 有り | OFF |
| 104 | 佐藤 | 失くす | 開 | ON | 有り | 27℃ |

※ 102号室の田中さんは鍵を部屋の中に忘れてしまったのかもしれません。
ベットがないのなら布団派でしょうか？

※ 104号室の佐藤さんは鍵を失くしてしまいました。
そして、冷蔵庫のドアは開けっ放しで、テレビとエアコンのスイッチはつけたまま、で大変です。
などと情報を読み取れます。

情報を画一化するのがデータベースのテーブルです。

「画一化」とは、ある基準に従って、一定の形式や規格に合わせて統一することを指します。データベースの場合、データの形式や構造を統一することで、データの管理や利用を効率化することができます。

例えば、データベース内のテーブルやカラムの名前やデータ型を統一することで、データの取り扱いが容易になります。また、データの入力や出力の形式を統一することで、データの取り扱いがスムーズになります。



# ポリシー

Policy

ポリシーは、PostgreSQLの ルールエンジン です。
ルールエンジンと言われてもピンと来ないかもしれません。

部屋の入室許可を自分だけにするか、家族全員にするか、友人にも許可するか等、
誰が何をしてもいいか？を決めるのがポリシーです。



# RLS

RLSは、Row Level Securityの略です。
PostgreSQLの代表的なセキュリティキーワードの一つです。

RLSはポリシーを行に対して適用することができます。

これは部屋の中の冷蔵庫の開け閉め、ベッドの利用の許可、テレビのスイッチのオンオフ等を許可するというレベルでデーターへのアクセス権が決められます。

認証 誰がマンションに出入りできるか？
Authentication

認可 誰が部屋に入る許可を持っているか？
Authorization

RLS 入った人が、その部屋の中で何ができるか？
row-level security


## RLSはポリシーの一部ですか？

はい、RLS (Row-Level Security) は、ポリシーの一部です。RLSは、データベースの行に対するアクセスを制御するための機能であり、ポリシーを使用して実装されます。ポリシーは、どのユーザーがどの行にアクセスできるかを定義するために使用されます。したがって、RLSは、ポリシーの一部であり、ポリシーを使用して実装されます。



# ポリシーとRLSの違い

ポリシーはデータベースのテーブルに対するアクセスを制御するために使用されます。
RLSは行に対するアクセスを制御するために使用されます。

ポリシーが部屋の入室許可を出すかどうかなら。
RLSは部屋に入ってその後の冷蔵庫の開けしめ、テレビのスイッチのオンオフ等を許可するかどうか事細かく決められて便利です。

セキュリティの専門家には怒られそうな内容ですが、ざっくり理解するにはこれで十分だと思います。

次に、前提の情報としてSupabase全体のスキーマを把握します。
Supabaseのスキーマは以下の通りです。



# スキーマとは

スキーマは、データベース内のオブジェクトを分類するための仕組みであり、テーブルやビュー、関数などのオブジェクトをまとめることができます。つまり、スキーマの中にテーブルが含まれているということになります。

publicならば、誰でもアクセスできるスキーマです。
Authならば、認証に関するスキーマです。

このようにテーブルをスキーマで分類することでテーブルの管理がしやすくなります。タグ付けのようなものです。

データベースの基礎はここまでで、次にSupabaseのスキーマを見ていきます。



# Supabase の初期スキーマ

Supabaseのプロジェクトを作成すると、以下のようなスキーマが作成されます。

合計10個の スキーマがあります。

開発関連 (削除可能)
| 名前 | テーブル数 |
| --- | --- |
| schema public | 0 |

システム関連 (削除禁止)
| 名前 | テーブル数 |
| --- | --- |
| schema auth | 15 |
| schema extensions | 0 |
| schema graphql | 0 |
| schema graphql_public | 0 |
| schema pgsodium | 1 |
| schema pgsodium_masks | 0 |
| schema realtime | 0 |
| schema storage | 3 |
| schema vault | 1 |

※schema publicは削除して0から作り直すことができます。

開発者は、schema publicにテーブルを作成して開発を進めていきます。


# 個別スキーマの説明

Supabaseには、複数のスキーマが用意されています。スキーマとは、データベース内のオブジェクトを分類するための仕組みであり、テーブルやビュー、関数などのオブジェクトをまとめることができます。以下に、各スキーマの説明を示します。

- `schema public`: 開発者が作成したテーブルを格納するスキーマです。開発者が作成したアプリケーションで使用するテーブルをここに格納することができます。

- `schema auth`: 認証用のテーブルを格納するスキーマです。Supabaseの認証機能で使用するテーブルがここに格納されます。**※この記事のメインテーマです。**

- `schema extensions`: PostgreSQLの拡張機能を格納するスキーマです。Supabaseで使用する拡張機能がここに格納されます。

- `schema graphql`: GraphQLのスキーマを格納するスキーマです。GraphQLのスキーマがここに格納されます。

- `schema graphql_public`: GraphQLの公開スキーマを格納するスキーマです。GraphQLの公開スキーマがここに格納されます。

- `schema pgsodium`: pgsodium拡張機能のためのスキーマです。pgsodium拡張機能で使用するテーブルがここに格納されます。

- `schema pgsodium_masks`: pgsodium拡張機能のためのスキーマです。pgsodium拡張機能で使用するテーブルがここに格納されます。

- `schema realtime`: リアルタイム機能のためのスキーマです。リアルタイム機能で使用するテーブルがここに格納されます。

- `schema storage`: ストレージ機能のためのスキーマです。ストレージ機能で使用するテーブルがここに格納されます。

- `schema vault`: シークレット管理機能のためのスキーマです。シークレット管理機能で使用するテーブルがここに格納されます。

# sodiumとは
sodium とは ナトリウムのことです、つまり塩です、日本語の技術用語では**ソルト**といいます。

Sodiumは、Supabaseが提供する、安全で簡単に使用できる暗号化ライブラリです。Sodiumは、暗号化、復号化、署名、ハッシュ、パスワードハッシュなど、多数の暗号化機能を提供しています。

Sodiumは、Supabaseの他の機能と同様に、オープンソースであり、誰でも使用することができます。Sodiumを使用することで、アプリケーションのセキュリティを向上させることができます。

↓を参照してください。

ソルト付きハッシュのソルトはどこに保存するのが一般的か - Qiita

https://qiita.com/ockeghem/items/d7324d383fb7c104af58

データベース内にソルト
データベース外にペッパー



## schema vaultとは

Vaultは、Postgresの拡張機能であり、Supabase UIと共に、暗号化されたシークレットやその他のデータをデータベースに安全かつ簡単に保存できるようにします。これにより、ストックディストリビューションで利用可能なものを超えた方法でPostgresを使用することができるようになります。

Vaultは、ディスク上で認証付き暗号化を使用して保存されたSecretsとEncryption Keysのテーブルであり、Postgresビューを介して復号化された形式で利用可能になっています。これにより、シークレットをSQLからアプリケーションで使用できます。シークレットは、ディスク上で暗号化および認証されて保存されているため、バックアップやレプリケーションストリームも、復号化または偽造できない方法でこの暗号化を保持します。

VaultのダッシュボードUIを使用すると、シークレットの保存が簡単になります。ボタンをクリックして、シークレットを入力して保存します。必要に応じて、自分で暗号化キーを作成して、指定されたキーを使用してシークレットを暗号化してディスクに保存できます。

Vault UIには、SecretsとEncryption Keysの2つの主要な部分があります。Vaultを使用する方法については、UIまたはSQLを使用してシークレットと暗号化キーを管理できます。



以上で、Supabaseのスキーマ関連の基本的な説明は終わりです。

ここからは Auth を探っていきます。



# Supabase Auth スキーマ の テーブルの詳細

Supabase Auth スキーマの詳細を調べていきます。

## Supabase Auth スキーマ 内の全テーブルの説明

- `audit_log_entries`: 認証に関するログを格納するテーブル。
- `flow_state`: 認証フローの状態を格納するテーブル。
- `identities`: ユーザーの認証情報を格納するテーブル。
- `instances`: 認証インスタンスの情報を格納するテーブル。
- `mfa_amr_claims`: MFAのAMRクレームを格納するテーブル。
- `mfa_challenges`: MFAのチャレンジを格納するテーブル。
- `mfa_factors`: MFAのファクターを格納するテーブル。
- `refresh_tokens`: リフレッシュトークンを格納するテーブル。
- `saml_providers`: SAMLプロバイダーの情報を格納するテーブル。
- `saml_relay_states`: SAMLリレーステートを格納するテーブル。
- `schema_migrations`: データベースのスキーママイグレーション情報を格納するテーブル。
- `sessions`: セッション情報を格納するテーブル。
- `sso_domains`: SSOドメイン情報を格納するテーブル。
- `sso_providers`: SSOプロバイダー情報を格納するテーブル。
- `users`: ユーザー情報を格納するテーブル。

※認証関連でここの情報が一番知りたい所です、特に2つ以上の認証を実装する場合は、このテーブルの情報を知ることが重要です。

2つ以上の認証とは、

例えば
メール認証
GitHub認証
Google認証
X認証(Twitter認証)

等の複数の組み合わせを指します。







# Supabase Auth スキーマ 内の全テーブルとカラム数

| テーブル名        | カラム数   |
|-------------------|------------|
| audit_log_entries | 5 columns  |
| flow_state        | 11 columns |
| identities        | 8 columns  |
| instances         | 5 columns  |
| mfa_amr_claims    | 5 columns  |
| mfa_challenges    | 5 columns  |
| mfa_factors       | 8 columns  |
| refresh_tokens    | 9 columns  |
| saml_providers    | 8 columns  |
| saml_relay_states | 8 columns  |
| schema_migrations | 1 columns  |
| sessions          | 7 columns  |
| sso_domains       | 5 columns  |
| sso_providers     | 4 columns  |
| users             | 34 columns |


# Auth テーブル

| テーブル名 | 説明 | カラム数 |
| --- | --- | --- |
| audit_log_entries | ユーザーアクションの監査トレイルを格納する | 5 |
| flow_state | pkce ログインのメタデータを格納する | 11 |
| identities | ユーザーに関連付けられた ID を格納する | 8 |
| instances | 複数のサイトでユーザーを管理する | 5 |
| mfa_amr_claims | マルチファクタ認証のための認証メソッド参照クレームを格納する | 5 |
| mfa_challenges | チャレンジリクエストに関するメタデータを格納する | 5 |
| mfa_factors | ファクタに関するメタデータを格納する | 8 |
| refresh_tokens | JWT トークンの有効期限が切れた場合に使用されるトークンを格納する | 9 |
| saml_providers | SAML Identity Provider 接続を管理する | 8 |
| saml_relay_states | 各 Service Provider で開始されたログインの SAML Relay State 情報を格納する | 8 |
| schema_migrations | auth システムの更新を管理する | 1 |
| sessions | ユーザーに関連付けられたセッションデータを格納する | 7 |
| sso_domains | SSO メールアドレスドメインマッピングを管理する | 5 |
| sso_providers | SSO Identity Provider 情報を管理する | 4 |
| users | セキュアなスキーマ内のユーザーログインデータを格納する | 34 |

## Auth テーブルの詳細な説明

1. `audit_log_entries` テーブル
   - ユーザーアクションの監査トレイルを格納するテーブルです。
   - このテーブルには、ユーザーが行ったアクション、アクションが実行された日時、およびアクションを実行したユーザーの情報が含まれます。

2. `flow_state` テーブル
   - PKCE ログインのメタデータを格納するテーブルです。
   - このテーブルには、PKCE ログインの状態、リクエストトークン、およびリダイレクト URI などの情報が含まれます。

3. `identities` テーブル
   - ユーザーに関連付けられた ID を格納するテーブルです。
   - このテーブルには、ユーザーの ID、プロバイダーの種類、およびプロバイダーの ID などの情報が含まれます。

4. `instances` テーブル
   - 複数のサイトでユーザーを管理するためのテーブルです。
   - このテーブルには、サイトの ID、ユーザーの ID、およびサイトでのユーザーのロールなどの情報が含まれます。

5. `mfa_amr_claims` テーブル
   - マルチファクタ認証のための認証メソッド参照クレームを格納するテーブルです。
   - このテーブルには、認証メソッドの種類、認証メソッドの ID、およびユーザーの ID などの情報が含まれます。

6. `mfa_challenges` テーブル
   - チャレンジリクエストに関するメタデータを格納するテーブルです。
   - このテーブルには、チャレンジの種類、チャレンジの状態、およびチャレンジの作成日時などの情報が含まれます。

7. `mfa_factors` テーブル
   - ファクタに関するメタデータを格納するテーブルです。
   - このテーブルには、ファクタの種類、ファクタの ID、およびユーザーの ID などの情報が含まれます。

8. `refresh_tokens` テーブル
   - JWT トークンの有効期限が切れた場合に使用されるトークンを格納するテーブルです。
   - このテーブルには、トークンの ID、トークンの有効期限、およびトークンが発行された日時などの情報が含まれます。

9. `saml_providers` テーブル
   - SAML Identity Provider 接続を管理するテーブルです。
   - このテーブルには、Identity Provider の ID、Identity Provider の名前、および Identity Provider の設定などの情報が含まれます。

10. `saml_relay_states` テーブル
    - 各 Service Provider で開始されたログインの SAML Relay State 情報を格納するテーブルです。
    - このテーブルには、Relay State の ID、Relay State の作成日時、および Relay State に関連付けられたユーザーの ID などの情報が含まれます。

11. `schema_migrations` テーブル
    - auth システムの更新を管理するテーブルです。
    - このテーブルには、スキーマのバージョンなどの情報が含まれます。

12. `sessions` テーブル
    - ユーザーに関連付けられたセッションデータを格納するテーブルです。
    - このテーブルには、セッションの ID、セッションの作成日時、およびセッションに関連付けられたユーザーの ID などの情報が含まれます。

13. `sso_domains` テーブル
    - SSO メールアドレスドメインマッピングを管理するテーブルです。
    - このテーブルには、ドメインの ID、ドメインの名前、およびドメインに関連付けられた Identity Provider の ID などの情報が含まれます。

14. `sso_providers` テーブル
    - SSO Identity Provider 情報を管理するテーブルです。
    - このテーブルには、Identity Provider の ID、Identity Provider の名前、および Identity Provider の設定などの情報が含まれます。

15. `users` テーブル
    - セキュアなスキーマ内のユーザーログインデータを格納するテーブルです。
    - このテーブルには、ユーザーの ID、ユーザーのメールアドレス、およびユーザーのパスワードなどの情報が含まれます。



## テーブルの説明で使われた用語集
* ID (Identity)
   - ユーザーを一意に識別するための情報のことを指します。例えば、ユーザー名、メールアドレス、UUID などがあります。

* JWT (JSON Web Token)
   - ウェブアプリケーション間で安全に情報をやり取りするための仕組みの一つで、JSON 形式で情報をエンコードしたトークンのことを指します。

* Multi-Factor Authentication (マルチファクタ認証)
   - パスワードなどの単一の認証要素だけでなく、複数の認証要素を組み合わせて認証を行う仕組みです。例えば、SMS による認証コード、ハードウェアトークン、生体認証などがあります。

* PKCE (Proof Key for Code Exchange)
   - OAuth 2.0 認証フローの一種で、Web アプリケーションやモバイルアプリケーションなどのクライアントアプリケーションが、安全にアクセストークンを取得するための仕組みです。

* Relay State
    - SAML 認証フローで使用される、リクエストとレスポンスの間で状態を保持するための情報のことを指します。

* SAML (Security Assertion Markup Language)
   - シングルサインオン (SSO) のための標準規格の一つで、XML 形式で認証情報をやり取りするための仕組みです。

* SSO (Single Sign-On)
    - 複数のアプリケーションやサービスに対して、一度の認証でアクセスできるようにする仕組みです。ユーザーは一度認証すれば、複数のアプリケーションやサービスにアクセスできます。

* Schema (スキーマ)
    - データベースにおいて、テーブルやカラムなどのデータ構造を定義するための仕組みです。

* Session (セッション)
    - ユーザーがシステムにログインしている期間のことを指します。セッション中は、ユーザーの認証情報が保持され、ユーザーがシステム上での操作を行うことができます。

* チャレンジ (Challenge)
   - マルチファクタ認証などで、ユーザーに対して認証要素を要求することを指します。例えば、SMS による認証コードの送信、ハードウェアトークンの挿入などがあります。

* ファクタ (Factor)
   - マルチファクタ認証で使用される認証要素のことを指します。例えば、SMS による認証コード、ハードウェアトークン、生体認証などがあります。

* パスワード (Password)
    - ユーザーがシステムにログインするための認証情報の一つで、秘密の文字列のことを指します。

* メールアドレスドメイン (Email Address Domain)
    - メールアドレスの「@」以降の部分のことを指します。例えば、example.com などがあります。

* ロール (Role)
   - システム上でのユーザーの権限を管理するための仕組みです。サービス利用者に対するそれぞれの役割であって、例えば、管理者、編集者、閲覧者などがあります。

* ユーザーアクション (User Action)
   - ユーザーがシステム上で行う操作のことを指します。例えば、ログイン、ログアウト、データの作成、更新、削除などがあります。

* 監査トレイル (Audit Trail)
   - システム上で行われた操作のログを記録するための仕組みです。監査トレイルを使用することで、システム上で何が行われたかを追跡することができます。

* 認証メソッド (Authentication Method)
   - ユーザーの認証を行うための方法のことを指します。例えば、パスワード、生体認証、ハードウェアトークン、SMS による認証コードなどがあります。

* マッピング (Mapping)
   - 複数のデータソースの間で、データの変換や統合を行うための仕組みです。例えば、SAML プロバイダと Supabase の間で、ユーザーのメールアドレスをマッピングすることがあります。

* Identity Provider (IdP)
   - ユーザーの認証情報を提供するサービスのことを指します。例えば、Google、Facebook、Twitter などがあります。

* トークン (Token)
   - 認証や認可などのために使用される、一時的な情報のことを指します。例えば、アクセストークン、リフレッシュトークン、JWT などがあります。

## マルチファクタ認証の説明
マルチファクタはメールで認証した後、スマフォのアプリで認証するということです。

マルチファクタが直列の認証ならば
複数の認証が並列の認証ということになります。
    ユーザーがどの認証を選択するか選べます。



# auth スキーマのテーブルの詳細

気になった所
idは各テーブルで使われていますが
idの型が UUID形式であったり、文字列形式、BIGINT形式であったりしています。

システム的に自動生成される場合は文字列形式で、
開発者がさわるテーブルは、UUID形式で衝突したいための仕様でしょうか？
よくわかりません。
これはSupabase開発者に聞かないとわかりませんね。



## auth.audit_log_entries テーブル

audit_log_entriesテーブルは、Supabaseの認証機能に関する操作のログを記録するために使用されます。

1. `instance_id`: ログが属するインスタンスのIDを示します。このカラムは、UUID形式で保存されます。
2. `id`: ログのIDを示します。このカラムは、UUID形式で保存されます。
3. `payload`: ログに関する情報を示します。このカラムは、JSON形式で保存されます。
4. `created_at`: ログが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
5. `ip_address`: ログが作成されたIPアドレスを示します。このカラムは、文字列形式で保存されます。



## auth.flow_state テーブル

flow_stateテーブルは、OAuth2フローの状態を管理するために使用されます。

1. `id`: フロー状態のIDを示します。このカラムは、UUID形式で保存されます。
2. `user_id`: フロー状態に関連するユーザーのIDを示します。このカラムは、UUID形式で保存されます。
3. `auth_code`: 認証コードを示します。このカラムは、文字列形式で保存されます。
4. `code_challenge_method`: 認証コードのチャレンジメソッドを示します。このカラムは、ユーザー定義型で保存されます。
5. `code_challenge`: 認証コードのチャレンジを示します。このカラムは、文字列形式で保存されます。
6. `provider_type`: プロバイダータイプを示します。このカラムは、文字列形式で保存されます。
7. `provider_access_token`: プロバイダーアクセストークンを示します。このカラムは、文字列形式で保存されます。
8. `provider_refresh_token`: プロバイダーリフレッシュトークンを示します。このカラムは、文字列形式で保存されます。
9. `created_at`: フロー状態が作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
10. `updated_at`: フロー状態が更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
11. `authentication_method`: 認証方法を示します。このカラムは、文字列形式で保存されます。



## auth.identities テーブル

identities テーブルは、Supabaseの認証機能に関するユーザーのアイデンティティ情報を管理するために使用されます。

1. `id`: アイデンティティ情報のIDを示します。このカラムは、文字列形式で保存されます。
2. `user_id`: アイデンティティ情報に関連するユーザーのIDを示します。このカラムは、UUID形式で保存されます。
3. `identity_data`: アイデンティティ情報を示します。このカラムは、JSONB形式で保存されます。
4. `provider`: アイデンティティ情報を提供するプロバイダーを示します。このカラムは、文字列形式で保存されます。
5. `last_sign_in_at`: 最後にサインインした日時を示します。このカラムは、タイムスタンプ形式で保存されます。
6. `created_at`: アイデンティティ情報が作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
7. `updated_at`: アイデンティティ情報が更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
8. `email`: アイデンティティ情報に含まれるオプションのメールアドレスを示します。このカラムは、文字列形式で保存されます。

※`email` は、identities テーブルの identity_data カラム内の email プロパティを参照して、その値を自動的に生成するカラムです。
このカラムを使用することで、ユーザーのメールアドレスを簡単に取得することができます。
つまり、 JSONB形式 で保存されている identity_data カラム内の email プロパティの値をより簡単に取得するための email カラムです。

例えば、以下のような JSONB形式 で保存されている identity_data カラム内の email プロパティの値を取得するためには、
`SELECT identity_data->>'email' FROM identities;`
というようなクエリを実行する必要がありますが、
`SELECT email FROM identities;`
というようなクエリを実行することで、より簡単に取得することができます。



## auth.instances テーブル

このテーブルは、Supabaseのプロジェクトに関する情報を管理するために使用されます。

1. `id`: プロジェクトのIDを示します。このカラムは、UUID形式で保存されます。
2. `uuid`: プロジェクトのUUIDを示します。このカラムは、UUID形式で保存されます。
3. `raw_base_config`: プロジェクトの基本設定を示します。このカラムは、文字列形式で保存されます。
4. `created_at`: プロジェクトが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
5. `updated_at`: プロジェクトが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。



## auth.mfa_amr_claims テーブル

`auth.mfa_amr_claims`テーブルは、MFA (Multi-Factor Authentication)のAMR (Authentication Methods References)クレームを管理するために使用されます。

1. `session_id`: セッションのIDを示します。このカラムは、UUID形式で保存されます。
2. `created_at`: クレームが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
3. `updated_at`: クレームが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
4. `authentication_method`: 認証方法を示します。このカラムは、文字列形式で保存されます。
5. `id`: クレームのIDを示します。このカラムは、UUID形式で保存されます。



## auth.mfa_challenges テーブル

`auth.mfa_challenges`テーブルは、MFA (Multi-Factor Authentication)の認証チャレンジを管理するために使用されます。

1. `id`: 認証チャレンジのIDを示します。このカラムは、UUID形式で保存されます。
2. `factor_id`: 認証チャレンジに関連するファクターのIDを示します。このカラムは、UUID形式で保存されます。
3. `created_at`: 認証チャレンジが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
4. `verified_at`: 認証チャレンジが検証された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
5. `ip_address`: 認証チャレンジが発生したIPアドレスを示します。このカラムは、INET形式で保存されます。INETは、IPv4またはIPv6アドレスを表すPostgreSQLのデータ型です。



## auth.mfa_factors テーブル

`auth.mfa_factors`テーブルは、MFA (Multi-Factor Authentication)のファクターを管理するために使用されます。

1. `id`: ファクターのIDを示します。このカラムは、UUID形式で保存されます。
2. `user_id`: ファクターが関連するユーザーのIDを示します。このカラムは、UUID形式で保存されます。
3. `friendly_name`: ファクターのフレンドリーな名前を示します。このカラムは、文字列形式で保存されます。
4. `factor_type`: ファクターのタイプを示します。このカラムは、ユーザー定義型で保存されます。
5. `status`: ファクターのステータスを示します。このカラムは、ユーザー定義型で保存されます。
6. `created_at`: ファクターが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
7. `updated_at`: ファクターが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
8. `secret`: ファクターの秘密鍵を示します。このカラムは、文字列形式で保存されます。秘密鍵は、MFAの認証に使用されます。



## auth.refresh_tokens テーブル

`auth.refresh_tokens`テーブルは、アクセストークンのリフレッシュトークンを管理するために使用されます。

1. `instance_id`: インスタンスのIDを示します。このカラムは、UUID形式で保存されます。
2. `id`: リフレッシュトークンのIDを示します。このカラムは、BIGINT形式で保存されます。
3. `token`: リフレッシュトークンを示します。このカラムは、文字列形式で保存されます。
4. `user_id`: リフレッシュトークンが関連するユーザーのIDを示します。このカラムは、文字列形式で保存されます。
5. `revoked`: リフレッシュトークンが無効化されたかどうかを示します。このカラムは、真偽値形式で保存されます。
6. `created_at`: リフレッシュトークンが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
7. `updated_at`: リフレッシュトークンが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
8. `parent`: 親トークンのIDを示します。このカラムは、文字列形式で保存されます。
9. `session_id`: セッションのIDを示します。このカラムは、UUID形式で保存されます。



## auth.saml_providers テーブル

`auth.saml_providers`テーブルは、SAML (Security Assertion Markup Language)プロバイダーを管理するために使用されます。

1. `id`: SAMLプロバイダーのIDを示します。このカラムは、UUID形式で保存されます。
2. `sso_provider_id`: SSO (Single Sign-On)プロバイダーのIDを示します。このカラムは、UUID形式で保存されます。
3. `entity_id`: SAMLプロバイダーのエンティティIDを示します。このカラムは、文字列形式で保存されます。
4. `metadata_xml`: SAMLプロバイダーのメタデータXMLを示します。このカラムは、文字列形式で保存されます。
5. `metadata_url`: SAMLプロバイダーのメタデータURLを示します。このカラムは、文字列形式で保存されます。
6. `attribute_mapping`: SAMLプロバイダーの属性マッピングを示します。このカラムは、JSONB形式で保存されます。
7. `created_at`: SAMLプロバイダーが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
8. `updated_at`: SAMLプロバイダーが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。



## auth.saml_relay_states テーブル

`auth.saml_relay_states`テーブルは、SAML (Security Assertion Markup Language)のリレーステートを管理するために使用されます。

1. `id`: リレーステートのIDを示します。このカラムは、UUID形式で保存されます。
2. `sso_provider_id`: SSO (Single Sign-On)プロバイダーのIDを示します。このカラムは、UUID形式で保存されます。
3. `request_id`: リクエストのIDを示します。このカラムは、文字列形式で保存されます。
4. `for_email`: リレーステートが関連するメールアドレスを示します。このカラムは、文字列形式で保存されます。
5. `redirect_to`: リダイレクト先のURLを示します。このカラムは、文字列形式で保存されます。
6. `from_ip_address`: リレーステートが発生したIPアドレスを示します。このカラムは、INET形式で保存されます。INETは、IPv4またはIPv6アドレスを表すPostgreSQLのデータ型です。
7. `created_at`: リレーステートが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
8. `updated_at`: リレーステートが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。



## auth.schema_migrations テーブル

`auth.schema_migrations`テーブルは、データベースのスキーマのバージョンを管理するために使用されます。

1. `version`: スキーマのバージョンを示します。このカラムは、文字列形式で保存されます。スキーマのバージョンは、通常、マイグレーションファイルの名前に基づいています。例えば、`001_initial.sql`という名前のマイグレーションファイルは、バージョン`001`を表します。



## auth.sessions テーブル

`auth.sessions`テーブルは、ユーザーのセッションを管理するために使用されます。

1. `id`: セッションのIDを示します。このカラムは、UUID形式で保存されます。
2. `user_id`: セッションが関連するユーザーのIDを示します。このカラムは、UUID形式で保存されます。
3. `created_at`: セッションが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
4. `updated_at`: セッションが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
5. `factor_id`: セッションが関連するファクターのIDを示します。このカラムは、UUID形式で保存されます。
6. `aal`: セッションのAAL (Authenticator Assurance Level)を示します。このカラムは、ユーザー定義型の`aal_level`で保存されます。
7. `not_after`: セッションが期限切れになる日時を示します。このカラムは、タイムスタンプ形式で保存されます。このカラムはNULL可能であり、NULLの場合は期限がないことを示します。



## auth.sso_domains テーブル

`auth.sso_domains`テーブルは、SSO (Single Sign-On)ドメインを管理するために使用されます。

1. `id`: SSOドメインのIDを示します。このカラムは、UUID形式で保存されます。
2. `sso_provider_id`: SSOプロバイダーのIDを示します。このカラムは、UUID形式で保存されます。
3. `domain`: SSOドメインを示します。このカラムは、文字列形式で保存されます。
4. `created_at`: SSOドメインが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
5. `updated_at`: SSOドメインが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。



## auth.sso_providers テーブル

`auth.sso_providers`テーブルは、SSO (Single Sign-On)プロバイダーを管理するために使用されます。

1. `id`: SSOプロバイダーのIDを示します。このカラムは、UUID形式で保存されます。
2. `resource_id`: SSOプロバイダーを一意に識別するためのリソースIDを示します。このカラムは、大文字小文字を区別しない文字列形式で保存されます。このカラムは、インフラストラクチャのコードで使用することができます。
3. `created_at`: SSOプロバイダーが作成された日時を示します。このカラムは、タイムスタンプ形式で保存されます。
4. `updated_at`: SSOプロバイダーが更新された日時を示します。このカラムは、タイムスタンプ形式で保存されます。



## auth.users テーブル

`auth.users`テーブルは、ユーザーを管理するために使用されます。
auth.users テーブルのカラムは34個あります。

1. `instance_id`: ユーザーが属するインスタンスのIDを示します。
2. `id`: ユーザーのIDを示します。
3. `aud`: JWTのaudienceフィールドに格納される値を示します。
4. `role`: ユーザーのロールを示します。
5. `email`: ユーザーのメールアドレスを示します。
6. `encrypted_password`: ユーザーのパスワードを示します。
7. `email_confirmed_at`: メールアドレスが確認された日時を示します。
8. `invited_at`: ユーザーが招待された日時を示します。
9. `confirmation_token`: メールアドレスの確認に使用されるトークンを示します。
10. `confirmation_sent_at`: 確認トークンが送信された日時を示します。
11. `recovery_token`: パスワードリカバリに使用されるトークンを示します。
12. `recovery_sent_at`: リカバリトークンが送信された日時を示します。
13. `email_change_token_new`: 新しいメールアドレスの確認に使用されるトークンを示します。
14. `email_change`: 変更されたメールアドレスを示します。
15. `email_change_sent_at`: メールアドレス変更トークンが送信された日時を示します。
16. `last_sign_in_at`: 最後にログインした日時を示します。
17. `raw_app_meta_data`: アプリケーションのメタデータを示します。
18. `raw_user_meta_data`: **ユーザーのメタデータを示します。**
19. `is_super_admin`: ユーザーがスーパー管理者かどうかを示します。
20. `created_at`: ユーザーが作成された日時を示します。
21. `updated_at`: ユーザーが更新された日時を示します。
22. `phone`: ユーザーの電話番号を示します。
23. `phone_confirmed_at`: 電話番号が確認された日時を示します。
24. `phone_change`: 変更された電話番号を示します。
25. `phone_change_token`: 電話番号変更に使用されるトークンを示します。
26. `phone_change_sent_at`: 電話番号変更トークンが送信された日時を示します。
27. `confirmed_at`: ユーザーが確認された日時を示します。
28. `email_change_token_current`: 現在のメールアドレスの確認に使用されるトークンを示します。
29. `email_change_confirm_status`: メールアドレス変更の確認ステータスを示します。
30. `banned_until`: ユーザーがアカウント停止された期限を示します。
31. `reauthentication_token`: 再認証に使用されるトークンを示します。
32. `reauthentication_sent_at`: 再認証トークンが送信された日時を示します。
33. `is_sso_user`: SSOからのアカウントかどうかを示します。
34. `deleted_at`: ユーザーが削除された日時を示します。

※ **ユーザーのメタデータ** は、auth.usersテーブルの raw_user_meta_data カラムに格納されます。
JSON形式であり、1つのカラムに複数の項目が入っています。

サインアップ時に メタデータを保存できます。

```sql
const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
  options: {
    data: {
      first_name: 'John',
      age: 27,
    },
  },
})

```

ユーザーメタデータ へのアクセス方法↓

```
const {
  data: { user },
} = await supabase.auth.getUser()
let metadata = user.user_metadata

```


※ ユーザーメタデータは、ユーザーに関する情報で、メールアドレスやパスワード以外の情報を指します。

例えば、ユーザーの名前、年齢、住所、プロフィール画像などの情報を保存することができます。

ユーザーメタデータは、 auth.users テーブルの **raw_user_meta_data** カラムに保存されます。


### 高度なテクニック

トリガーを使う

ユーザーがサインアップするたびに public.profiles テーブルに行を追加したい場合、トリガーを使用することができます。
しかし、トリガーが失敗すると、ユーザー登録がブロックされる可能性があります。

```sql
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

### auth.usersカラムの詳細

※典型的なOAuth認証した後に、public.profilesテーブルにユーザーデータを追加するslq文です。

```database_sql\usertable.sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone null default now(),
  username text unique,
  full_name text,
  constraint username_length check (char_length(username) >= 6)
);



-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

raw_user_meta_dataはauth.usersテーブルのカラムの1つです。
その中ではJSON形式のデータが格納されています。

<details><summary>auth.usersのカラム(またはフィールド)</summary>

auth.usersのカラム

```auth.usersカラム
"instance_id",
"id",
"aud",
"role",
"email",
"encrypted_password",
"email_confirmed_at",
"invited_at",
"confirmation_token",
"confirmation_sent_at",
"recovery_token",
"recovery_sent_at",
"email_change_token_new",
"email_change",
"email_change_sent_at",
"last_sign_in_at",
"raw_app_meta_data",
"raw_user_meta_data", ＜＜＜ここからデータを取得します。
"is_super_admin",
"created_at",
"updated_at",
"phone",
"phone_confirmed_at",
"phone_change",
"phone_change_token",
"phone_change_sent_at",
"confirmed_at",
"email_change_token_current",
"email_change_confirm_status",
"banned_until",
"reauthentication_token",
"reauthentication_sent_at",
"is_sso_user",
"deleted_at"

```

↓auth.usersのカラムの中のraw_user_meta_dataのJSON形式のデータ

取得するデータです。

```raw_user_meta_data

"raw_user_meta_data",
"{
""iss"":""https://api.github.com"",
""sub"":""76*****"",
""name"":""*****"",
""email"":""*****@gmail.com"",
""full_name"":""*****"",
""user_name"":""*****"",
""avatar_url"":""https://avatars.githubusercontent.com/u/*****?v=4"",""provider_id"":""76*****"",
""email_verified"":true,
""phone_verified"":false,
""preferred_username"":""*****""
}",



```

</details>


AIによると現代のDB論では、設計によりますが、第一正規化をせずに1つのカラムに複数のデータを入れるのは問題ないということです。

Supabaseの場合は、auth.usersのカラムの中のraw_user_meta_dataのJSON形式のデータを複数設定してあります。



ここまでで、auth スキーマのテーブルの詳細は終了です。

----------------------------------------
----------------------------------------
----------------------------------------



# Supabase 公式ドキュメント Auth ページ

ここより下は、 Supabase 公式ドキュメントの Auth ページをざっくりと翻訳しています。

※必要な部分だけ翻訳しています。 (主に Next.js 関連)

Supabase のセキュリティという心臓部 Auth

Auth | Supabase Docs

https://supabase.com/docs/guides/auth

このページを翻訳しつつ重要な部分を抜粋していきます。

最初に

Supabaseのダッシュボードを開いて

左サイドバーのSQL Editorを開きます。

select * from auth.users

を実行すると、ユーザーの一覧が表示されます。

authスキーマの usersテーブルのカラムを調べるコマンドです。

SQL文を見ても分かる通り、この Supabase のシステム部分である Authスキーマ の usersテーブル は、システム的に削除できないだけで通常のリレーショナルデータベースのテーブルと同じです。



## Vercel

VercelプレビューURL
Vercelを使用する場合、 SITE_URL を公式サイトのURLに設定します。ローカル開発やデプロイメントプレビューのために、次の追加のリダイレクトURLを追加します。

http://localhost:3000/**

https://*-username.vercel.app/**



Vercelは、デプロイのURLに関する環境変数である NEXT_PUBLIC_VERCEL_URL を提供しています。
詳細については、Vercelのドキュメントを参照してください。

この変数を使用して、環境に応じて動的にリダイレクトできます。
また、次の環境変数の値を設定する必要があります。

NEXT_PUBLIC_SITE_URL は、本番環境でのサイトURLに設定する必要があります。
これにより、リダイレクトが正常に機能するようになります。



```
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: getURL(),
  },
})

```

## Authorization

### 行レベルのセキュリティ

詳細な認証ルールが必要な場合、PostgreSQLの行レベルセキュリティ(RLS)に勝るものはありません。SupabaseではRLSのオン/オフを簡単に切り替えることができます。


### Policies (ポリシー)

ポリシーはPostgreSQLのルールエンジンです。非常に強力で柔軟性があり、独自のビジネスニーズに合った複雑なSQLルールを書くことができます。



### RLSとポリシーの違い

RLS（行レベルセキュリティ）は、PostgreSQLの機能であり、データベースの行に対するアクセスを制御するために使用されます。

一方、ポリシーはPostgreSQLのルールエンジンであり、データベースのテーブルに対するアクセスを制御するために使用されます。

RLSは、行に対するアクセスを制御するために使用され、

ポリシーは、テーブルに対するアクセスを制御するために使用されます。

RLSは、データベースの行に対するアクセスを制御するために使用されるため、より詳細な認証ルールを実装することができます。

一方、ポリシーは、テーブルに対するアクセスを制御するために使用されるため、より高度なアクセス制御を実装することができます。

テーブルに対するアクセス制御とは、データベースのテーブルに対するアクセスを制限することを指します。
これにより、不正なアクセスや悪意のあるアクセスを防止し、データのセキュリティを確保することができます。
アクセス制御は、認証や認可などのセキュリティ機能を使用して実装されます。
データベースのテーブルに対するアクセス制御は、データベース管理者が設定することができます。

## RLSはポリシーの一部ですか？

RLS (Row-Level Security) は、PostgreSQLのポリシーの一部です。RLSは、テーブルの行に対するアクセスを制御するために使用されます。RLSを使用すると、ユーザーがテーブルの特定の行にアクセスできるかどうかを制御することができます。RLSは、ポリシーを使用して実装されます。ポリシーは、テーブルに対するアクセスを制御するために使用されるPostgreSQLの機能であり、RLSを含む様々なセキュリティ機能を実装するために使用されます。


# ルール エンジン

ルールエンジンとは、特定のルールに基づいて自動的に判断や処理を行うソフトウェアのことを指します。ルールエンジンは、特定の条件に基づいて自動的にアクションを実行することができます。例えば、ポリシーはPostgreSQLのルールエンジンであり、データベースのテーブルに対するアクセスを制御するために使用されます。ルールエンジンは、ビジネスルールやセキュリティルールなど、様々なルールを自動的に処理するために使用されます。ルールエンジンは、人間が手動で処理するよりも高速で正確な処理を行うことができます。

## ルール エンジンを使用すると

ポリシーを使用すると、データベースがルール エンジンになります。このようにクエリを繰り返しフィルタリングする代わりに...

```
const loggedInUserId = 'd0714948'
let { data, error } = await supabase
  .from('users')
  .select('user_id, name')
  .eq('user_id', loggedInUserId)   ＜＜＜フィルタリング ユーザーが存在するかのチェック この行を省略できるようになります。

// console.log(data)
// => { id: 'd0714948', name: 'Jane' }

```

データベース テーブルにルールを定義する↓だけで、auth.uid() = user_idミドルウェアからフィルターを削除した場合でも、リクエストはルールに合格した行を返します。

ポリシーやRLSを事前に設定しておくことでフィルタリング↑を行う必要がなくなります。
このようにユーザーの存在をコードの中でチェック↓する必要がなくなりました。

```
let { data, error } = await supabase.from('users').select('user_id, name')

// console.log(data)
// Still => { id: 'd0714948', name: 'Jane' }

```

※どちらも出力結果は同じになります。
しかし、RLSを有効にするパターンを選んでおけば、もしセキュリティが破られ ↑`supabase.from` 等の命令が実行された場合でも、RLSが有効ならば安全が確保されます。
つまりRLSを有効にすることで2段階のセキュリティが機能するという意味になります。
1.SQL文の実行時チェック
2.RLSのフィルタリング

## 仕組み

1. ユーザーがサインアップします。
2. Supabaseは、auth.usersテーブルに新しいユーザーを作成します。
3. Supabaseは、ユーザーのUUIDを含む新しい JWT を返します。
4. データベースへの全てのリクエストは JWT を送信します。
5. PostgreSQLは、 JWT を検査し、リクエストを行ったユーザーを特定します。
6. ユーザのUIDは、行へのアクセスを制限するポリシーで使用できます。

### auth.uid()

Supabaseは、PostgreSQLの特別な関数である auth.uid() を提供し、 JWT からユーザのUIDを抽出します。これは、ポリシーを作成する際に特に便利です。



### JWTとは

1. JWT (JSON Web Token) は、認証情報を安全に伝送するための仕組みです。
2. JWT は、3つのパートから構成されています。それぞれ、ヘッダ、ペイロード、署名です。
3. ヘッダには、JWT の種類や署名アルゴリズムなどが含まれます。
4. ペイロードには、ユーザーの認証情報が含まれます。具体的には、ユーザーのIDや権限などの情報が含まれます。
5. 署名には、ヘッダとペイロードを結合したものに対して、秘密鍵を使用して生成された署名が含まれます。
6. JWT は、認証サーバーで生成され、クライアントに送信されます。
7. クライアントは、JWT を保持し、必要な場合にサーバーに送信します。
8. サーバーは、JWT を検証し、 ペイロード に含まれる情報を使用して、ユーザーを認証します。
9. JWT は、暗号化されているため、安全に伝送することができます。また、署名により、JWT が改ざんされていないことを検証することができます。



### ペイロードとは

1. ペイロードとは、JWT の中で、実際に伝送されるデータのことを指します。
2. ペイロードには、ユーザーの認証情報が含まれます。具体的には、ユーザーのIDや権限などの情報が含まれます。
3. ペイロードは、Base64 エンコードされています。これは、データを安全に伝送するための方法の一つです。
4. ペイロードには、標準的なクレームと、カスタムクレームが含まれます。
5. 標準的なクレームには、JWT の有効期限や発行者などが含まれます。
6. カスタムクレームには、アプリケーション独自の情報が含まれます。例えば、ユーザーのIDや権限などが含まれます。
7. ペイロードは、秘密鍵を持つ認証サーバーで生成されます。
8. クライアントは、ペイロードを受け取り、必要な場合にサーバーに送信します。
9. サーバーは、ペイロードを検証し、ユーザーを認証します。



### クレームについて

1. クレームとは、JWT の中で、情報を表すキーと値のペアのことを指します。
2. クレームには、標準的なクレームと、カスタムクレームがあります。
3. 標準的なクレームには、JWT の有効期限や発行者などが含まれます。これらのクレームは、JWT の仕様に定義されています。
4. カスタムクレームには、アプリケーション独自の情報が含まれます。例えば、ユーザーのIDや権限などが含まれます。これらのクレームは、アプリケーションの要件に応じて定義されます。
5. クレームは、JSON 形式で表現されます。具体的には、キーと値のペアが { } で囲まれ、キーと値は : で区切られます。
6. クレームは、Base64 エンコードされています。これは、データを安全に伝送するための方法の一つです。
7. クレームは、秘密鍵を持つ認証サーバーで生成されます。
8. クライアントは、クレームを受け取り、必要な場合にサーバーに送信します。
9. サーバーは、クレームを検証し、ユーザーを認証します。



## ユーザー管理

Supabase は、ユーザーを認証および管理するための複数のエンドポイントを提供します。

サインアップ
パスワードを使用してサインインする
パスワードレス/ワンタイムパスワード (OTP) でサインインする
OAuth でサインインする
サインアウト



ユーザーがサインアップすると、Supabase はユーザーに一意の ID を割り当てます。この ID は、データベースのどこでも参照することができます。

例えば、auth.users テーブルの id を user_id フィールドで参照することで、profiles テーブルを作成することができます。これにより、ユーザーのプロフィール情報を auth.users テーブルと関連付けることができます。




# QUICK STARTS

Use Supabase Auth with Next.js | Supabase Docs

https://supabase.com/docs/guides/auth/quickstarts/nextjs



# AUTHENTICATION 認証

## 認証の種類

### Email Login

### Magic Link Login

### Phone Login

### Social Login

### Enterprise SSO


### social provider リスト

* Google
* Facebook
* Apple
* Azure (Microsoft)
* Twitter
* GitHub
* Gitlab
* Bitbucket
* Discord
* Figma
* Kakao
* Keycloak
* LinkedIn
* Notion
* Slack
* Spotify
* Twitch
* WorkOS
* Zoom



#### Provider Tokens

OAuthフローが完了すると、Supabase Auth はユーザーをサインインします。

OAuthフローで使用されたプロバイダートークンのコピーが返されます。
例えば、Googleプロバイダートークンを使用して、ユーザーの代わりにGoogle APIにアクセスすることができます。

ただし、プロバイダートークンは意図的にプロジェクトのデータベースに保存されません。

これは、プロバイダートークンがサードパーティシステムの潜在的に機密性の高いユーザーデータにアクセスできるためです。

異なるアプリケーションには異なるニーズがあり、1つのアプリケーションのOAuthスコープは、別のアプリケーションよりもかなり許可されている場合があります。

OAuthフローを完了したブラウザー以外でプロバイダートークンを使用する場合は、手動で安全なサーバーに送信する必要があります。



##### プロバイダートークンとは

プロバイダートークンは、OAuthフローを通じて取得されるトークンであり、サードパーティのシステムにアクセスするために使用されます。このトークンには、ユーザーの機密情報が含まれる場合があります。例えば、Googleプロバイダートークンには、ユーザーのメールアドレスやカレンダー情報などが含まれる場合があります。このため、プロバイダートークンは潜在的に機密性の高いユーザーデータにアクセスできるため、安全に管理する必要があります。



##### プロバイダートークンをわざと保存しない理由

プロバイダートークンをプロジェクトのデータベースに保存すると、第三者による不正アクセスやデータ漏洩のリスクが高まるため、意図的に保存されないようになっています。



##### 手動で安全なサーバーに送信

手動で安全なサーバーに送信するとは、OAuthフローを完了したブラウザー以外でプロバイダートークンを使用する場合に、プロバイダートークンを安全なサーバーに送信することを意味します。これにより、プロバイダートークンが第三者に漏洩することを防ぎ、ユーザーの機密情報を保護することができます。ただし、安全なサーバーに送信する前に、送信先のサーバーが信頼できるかどうかを確認する必要があります。



## Password Reset パスワードリセット

パスワードリセットのための電子メールを送信するには、.resetPasswordForEmailを使用します。

この際に redirectToパラメータ を指定することで、Eメールのリンクがマジックリンクとして機能し、ユーザーをログインさせ、redirectToパラメータで指定されたURLに移動させることができます。

パスワードを更新するフォームを作成し、.updateUserメソッドを呼び出すことで、新しいパスワードを設定することができます。


### Single Page Application (SPA)

Supabaseでは、ユーザーのパスワードをリセットするための便利なメソッド .resetPasswordForEmail が提供されています。

このメソッドは、redirectToというパラメータを受け取ります。
このパラメータには、パスワード更新ページへの絶対URLを渡します。ただし、このURLは、Authentication > Redirect Configuration で許可されたリダイレクトURLリストに保存されている必要があります。そうでない場合、ユーザーはリダイレクトされません。


#### Email link

パスワードリセットのために送信されるEメールのリンクは、マジックリンクのように機能します。つまり、リンクをクリックすると、ウェブサイトにログインされます。.resetPasswordForEmailメソッドにリダイレクトURLを渡したため、ユーザーはパスワード更新ページに送信されるはずです。

#### Update Password

パスワードを更新するには、.updateUserメソッドを呼び出し、このメソッドに新しいパスワードを渡します。

### Server-Side Rendering (SSR)

#### Sending password reset email

Supabaseでは、ユーザーのパスワードをリセットするための便利なメソッド
.resetPasswordForEmail が提供されています。

このメソッドは、redirectToというパラメータを受け取ります。このパラメータには、コールバックページへの絶対URLと、パスワード更新ページへのクエリパラメータを渡します。
ただし、このURLは、Authentication > Redirect Configuration で許可されたリダイレクトURLリストに保存されている必要があります。そうでない場合、ユーザーはリダイレクトされません。



#### Email link

Eメールのリンクをクリックすると、指定したredirectTo URLにリダイレクトされ、exchange codeが含まれるパスに移動します。このリンクは、マジックリンクのように機能します。

#### Exchange authorization code

認証コードの交換

サーバーページにリダイレクトした後、クエリパラメータのcodeからコードを取得し、.exchangeCodeForSession関数に渡す必要があります。

#### Update Password#

パスワードを更新するには、.updateUserメソッドを呼び出し、このメソッドに新しいパスワードを渡します。



## Email Templates

認証フローに使用される電子メール メッセージをカスタマイズできます。次の電子メール テンプレートを編集できます。

サインアップを確認する
ユーザーを招待する
マジックリンク
メールアドレスを変更する
パスワードを再設定する

### 用語

以下の変数が使用可能なテンプレートシステムが提供されています。

| 変数名 | 説明 |
| --- | --- |
| {{ .ConfirmationURL }} | 確認URLが含まれます。例えば、サインアップ確認URLは次のようになります: https://project-ref.supabase.co/auth/v1/verify?token={{ .TokenHash }}&type=signup&redirect_to=https://example.com/path 。 |
| {{ .Token }} | 6桁のワンタイムパスワード（OTP）が含まれます。{{. ConfirmationURL }}の代わりに使用できます。 |
| {{ .TokenHash }} | {{ .Token }}のハッシュバージョンが含まれます。これは、メールテンプレート内の独自のEメールリンクを構築するために役立ちます。 |
| {{ .SiteURL }} | アプリケーションのサイトURLが含まれます。これは、プロジェクトの認証設定で構成できます。 |



### Limitations

Email Prefetching

Eメールのプリフェッチング

特定のEメールプロバイダーには、受信したEメールからURLリンクをプリフェッチするスパム検出やその他のセキュリティ機能がある場合があります。この場合、送信された{{ .ConfirmationURL }}は即座に消費され、"Token has expired or is invalid"エラーが発生します。

これを防ぐためには、以下の方法を使用できます。

Eメールテンプレートに{{ .Token }}を含めて、EメールOTPを使用します。

ユーザーを確認アクションをクリックするページにリダイレクトするための独自のEメールリンクを作成します。例えば、Eメールテンプレートに次のようなものを含めることができます。


ユーザーは、ボタンをクリックしてアクションを確認できるサイト上のページに移動する必要があります。

ボタンには、実際の確認リンクが含まれている必要があります。このリンクは、URLのconfirmation_url={{ .ConfirmationURL }}クエリパラメータを解析して取得できます。


### Email Tracking

「Eメールトラッキング」を有効にしている外部のEメールプロバイダーを使用している場合、SupabaseのEメールテンプレート内のリンクは上書きされ、期待どおりに機能しません。Eメールリンクが上書きされないようにするには、Eメールトラッキングを無効にすることをお勧めします。

### Redirecting the user to a server-side endpoint

ユーザーをサーバーサイドエンドポイントにリダイレクトする

サーバーサイドレンダリングを使用する場合、ユーザーを認証した後にページを返す前に、Eメールリンクをサーバーサイドエンドポイントにリダイレクトさせたい場合があります。ただし、デフォルトのEメールリンクは、セッションがクエリフラグメントに含まれた状態でリダイレクトURLにユーザーをリダイレクトします。セッションはデフォルトでクエリフラグメントに返されるため、サーバーサイドでアクセスできません。



# AUTHORIZATION 認可

## Enable Captcha Protection

Supabaseでは、サインイン、サインアップ、パスワードリセットのフォームにキャプチャを追加するオプションを提供しています。これにより、ボットや悪意のあるスクリプトからウェブサイトを安全に保つことができます。Supabase認証はhCaptchaとCloudflare Turnstileをサポートしています。

### Sign up for Captcha

### Enable Captcha protection for your Supabase project

### Add the Captcha frontend component


## Configuring Custom SMTP

カスタム SMTP を構成する

### 認証SMTP
現時点では、組み込みサービスを介して 1 時間あたり最大4 通の電子メールを送信して、Supabase プラットフォームを試用できます。デフォルトの電子メール サービスは全体としてベスト エフォート ベースで提供されます。当社はサービスの維持に最善を尽くし、電子メール サービスを継続する必要があるかどうかを判断するためにサービスの使用状況を定期的にレビューします。

実稼働に向けて進むにつれて、制限を増やすためにカスタム SMTP サービスが必要になる場合があります。カスタム SMTP サーバーを使用すると、1 時間あたりに送信される電子メールの数に独自の上限を設定できます。

レート制限を超えて、SMTP サーバーは次のことにも役立つ場合があります。

到達性と評判の管理
スケーラビリティ
分析と追跡
コンプライアンスとスパム対策

### SMTP の設定方法

### SMTP プロバイダー

* Twilio SendGrid
* AWS SES
* Resend



## Managing User Data

セキュリティ上の理由から、自動生成されたAPIではauthスキーマは公開されません。

Supabaseはauth.usersテーブルを提供していますが、APIを介してアクセスしたいユーザーデータを格納するためにpublicスキーマにテーブルを作成することをおすすめします。

### Creating user tables

ユーザーデータを格納するためにテーブルを作成する場合、データの整合性を確保するために、主キーでauth.usersテーブルを参照することが役立ちます。

```sql
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,

  primary key (id)
);

```

public.profilesテーブルのid列は、auth.usersテーブルの主キーであるid列を参照しています。
つまり、public.profilesテーブルのid列は、auth.usersテーブルの主キーを参照する外部キーです。

また、 public.profiles テーブルの id列 は、public.profilesテーブルの主キーでもあります。

つまり、 public.profiles の id列 は、主キーであり、外部キーでもあるということになります。

また、auth.usersを参照する際には、on delete cascade句を指定することが重要です。省略すると、ユーザーを削除する際に問題が発生する可能性があります。

※注意 Supabaseが管理するauth.usersなどのスキーマやテーブルに対して、外部キー参照として主キーのみを使用してください。PostgreSQLでは、一意のインデックスでバックアップされた列に対して外部キー参照を指定することができます（必ずしも主キーである必要はありません）。

主キーは変更されないことが保証されています。Supabaseによって管理される列、インデックス、制約、またはその他のデータベースオブジェクトはいつでも変更される可能性があり、直接参照する際には注意が必要です。


###  Deleting Users

ユーザーを削除する場合は、直接削除するか、管理コンソールの「Authentication > Users」から削除することができます。

ただし、auth.usersテーブルからユーザーを削除しても、ユーザーが自動的にサインアウトされるわけではありません。SupabaseはJSON Web Tokens（JWT）を使用しているため、ユーザーのJWTは有効期限が切れるまで「有効」なままです。

ユーザーのアクセスを即座に取り消したい場合は、Row Level Securityポリシーを使用してください。

注意：Supabase Storageのオブジェクトの所有者である場合、ユーザーを削除することはできません。
ユーザーがStorageオブジェクトの所有者である場合、Authユーザーを削除しようとするとエラーが発生します。
この場合は、そのユーザーのすべてのオブジェクトを削除するか、別のユーザーに所有権を再割り当てしてください。

### Exporting Users

ユーザーのエクスポート(出力)

SupabaseはPostgreSQLの上に構築されているので、SQL Editorタブでauth.usersとauth.identitiesテーブルを照会し、全てのユーザーを抽出することができます：

```
select * from auth.users;

```

ダッシュボードから結果をCSVでエクスポートすることもできます：


### Public access

Row Level Securityが有効になっているので、このテーブルにはAPI経由でアクセスできるが、Policiesを設定しない限りデータは返されません。
データを誰でも読めるようにしたいが、ログインしているユーザーだけが自分のデータを更新できるようにしたい場合、Policiesは次のようになります：

```sql
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

```

### Private access

データを所有するユーザーだけが読めるようにするには、上記のfor selectクエリ部分を変更します。

```sql
create policy "Profiles are viewable by users who created them."
  on profiles for select
  using ( auth.uid() = id );

```

このパターンを使用すると、APIを介してテーブルをクエリできるようになります。
なのでAPIクエリにデータフィルタを含める必要がなくなります。
代わりに、ポリシーがそれを処理してくれます。
これにより、APIクエリが簡素化され、セキュリティが向上します。

#### APIを介してテーブルをクエリできるようになるとは

データベーステーブルに対してSQLクエリを実行できるようになることを指しています。SQLクエリを使用することで、データベーステーブルから必要なデータを取得したり、データを更新したり、削除したりすることができます。APIを介してデータベーステーブルに対してクエリを実行することで、データベースの操作を自動化することができます。

```sql
// This will return nothing while the user is logged out
const { data } = await supabase.from('profiles').select('id, username, avatar_url, website')

// After the user is logged in, this will only return
// the logged-in user's data - in this case a single row
const { error } = await supabase.auth.signIn({ email })
const { data: profile } = await supabase
  .from('profiles')
  .select('id, username, avatar_url, website')

```

↑このコードは、SupabaseのAPIを使用して、データベーステーブルからデータを取得する方法を示しています。

- 1行目のコードは、ログインしていないユーザーがデータを取得しようとした場合、何も返さないことを示しています。これは、Row Level Securityが有効になっている場合、ポリシーによってデータがフィルタリングされるためです。
- 4行目のコードは、ユーザーがログインした後に、ログインしたユーザーのデータのみを返すことを示しています。この場合、`email`を使用してユーザーを認証し、`profiles`テーブルからデータを取得しています。
- このコードの注意点は、Row Level Securityが有効になっている場合、ポリシーによってデータがフィルタリングされるため、ログインしていないユーザーはデータを取得できないことです。また、ログインしたユーザーは、自分のデータのみを取得できることに注意してください。


### Bypassing Row Level Security

RLS (Row Level Security) をバイパスする方法。

データベーステーブルからデータを取得する際に、ポリシー RLS によってデータがフィルタリングされるため、ログインしていないユーザーはデータを取得できません。

ユーザ・プロファイルの全リストを取得する場合は、行レベル・セキュリティをバイパスするためにAPIやクライアント・ライブラリで使用できる **service_key** を提供しています。

この **service_key** を公開しないように注意してください。
**service_key** はサーバーサイドでのみ使用してください。





### Accessing User Metadata

SupabaseのAPIを使用して、ユーザーのメタデータを取得する方法。

```
const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
  options: {
    data: {
      first_name: 'John',       ＜＜メタデータ
      age: 27,
    },
  },
})

```

このコードは、SupabaseのAPIを使用して、ユーザーのメタデータを取得する方法です。

- 1行目のコードは、`supabase.auth.signUp()`を使用して、新しいユーザーをサインアップする方法を示しています。この場合、`email`と`password`を使用して、新しいユーザーを作成しています。
- 4-8行目のコードは、`options`オブジェクトを使用して、ユーザーにメタデータを割り当てる方法を示しています。この場合、`first_name`と`age`の2つのメタデータをユーザーに割り当てています。

このコードを使用することで、新しいユーザーを作成し、必要に応じてユーザーにメタデータを割り当てることができます。

ただし、注意点として、`email`と`password`は必須項目であるため、これらの情報を提供する必要があります。また、メタデータはオプションであり、必要に応じて割り当てることができます。

#### 認証情報

`email`
`password`

#### メタデータ

上記の認証情報以外の情報を指します。
今回の場合は
first_name: 'John',
age: 27,
がそれに当たります。



```
const {
  data: { user },
} = await supabase.auth.getUser()
let metadata = user.user_metadata

```

このコードは、SupabaseのAPIを使用して、ユーザーのメタデータを取得する方法です。

ユーザーがサインアップする際に割り当てられたメタデータは、
auth.usersテーブルの **raw_user_meta_data** 列に保存されています。



supabase.auth.getUser()を使用して、現在ログインしているユーザーのメタデータを取得できます。

※ 認証情報以外の情報＝メタデータ

Supabaseではメタデータを auth.usersテーブルの raw_user_meta_data 列に保存されています。

開発者が独自に、 public.profiles を作ってそこにメタデータを保存することもできます。





### Advanced techniques

SupabaseのAPIを使用して、トリガーを使用して新しいユーザーがサインアップするたびに、public.profilesテーブルに新しい行を追加する方法です。

- トリガーを使用することで、新しいユーザーがサインアップするたびに、 public.profiles テーブルに新しい行を追加することができます。
- ただし、トリガーが失敗すると、ユーザーサインアップがブロックされる可能性があるため、コードが十分にテストされていることを確認する必要があります。

この文章を使用することで、トリガーを使用してpublic.profilesテーブルに新しい行を追加する方法を理解し、トリガーが失敗するとユーザーサインアップがブロックされる可能性があることを理解することができます。

↓ public.profiles テーブルに メタデータを保存するコードです。

```
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

このコードは、SupabaseのAPIを使用して、新しいユーザーがサインアップするたびに、public.profilesテーブルに新しい行を追加するトリガーを作成する方法を示しています。

- 2-12行目のコードは、`public.handle_new_user()`という関数を作成しています。
この関数は、新しいユーザーが作成されたときにトリガーされ、public.profilesテーブルに新しい行を追加します。この場合、`id`列には、新しいユーザーの`id`が自動的に割り当てられます。

- 15-17行目のコードは、`on_auth_user_created`というトリガーを作成しています。このトリガーは、`auth.users`テーブルに新しい行が挿入されたときにトリガーされ、`public.handle_new_user()`関数が呼び出されます。

このコードを使用することで、新しいユーザーがサインアップするたびに、public.profilesテーブルに新しい行を追加するトリガーを作成することができます。ただし、注意点として、トリガーが失敗すると、ユーザーサインアップがブロックされる可能性があるため、コードが十分にテストされていることを確認する必要があります。







## Multi-Factor Authentication

https://supabase.com/docs/guides/auth/auth-mfa

多要素認証 (MFA) は、二要素認証 (2FA) とも呼ばれ、追加の検証手順を通じて ID を検証することにより、アプリケーションに追加のセキュリティ層を追加します。

非常に難解、将来的には簡単に構築できるシステムが欲しい。
非常に難解、将来的には簡単に構築できるシステムが欲しい。


## Row Level Security

https://supabase.com/docs/guides/auth/row-level-security

### RLS (Row Level Security)

詳細な権限付与ルールが必要な場合、PostgreSQLの行レベルセキュリティ（RLS）に勝るものはありません。

ポリシーはPostgreSQLのルールエンジンです。非常に強力で柔軟なため、独自のビジネスニーズに合った複雑なSQLルールを書くことができます。


### ポリシー

ポリシーはコツをつかめば簡単に理解できます。各ポリシーはテーブルにアタッチされ、テーブルにアクセスするたびにポリシーが実行されます
WHERE句をすべてのクエリに追加するようなものだと思えばいいでしょう。

例えば、以下のようなポリシーです。

```sql
create policy "Individuals can view their own todos."
    on todos for select
    using ( auth.uid() = user_id );

```

ユーザーがTODOテーブルから SQLの select しようとするたびに、このように↓変換されます：

```
select *
from todos
where auth.uid() = todos.user_id; -- ポリシーは暗黙のうちに付加されます。

```


### ヘルパー関数

Supabaseは、 ポリシー で使用できるいくつかの簡単な関数を提供しています。

`auth.uid()`

リクエストを行ったユーザの ID を返します。

`auth.jwt()`

リクエストを行ったユーザのJWTを返します。


### Examples#

https://supabase.com/docs/guides/auth/row-level-security#examples

* Allow read access
* Restrict updates
* Only anon or authenticated access
* Policies with joins
* Policies with security definer functions
* Verifying email domains
* Time to live for rows
* Advanced policies

読み取りアクセスを許可する
更新の制限
非アクセスまたは認証されたアクセスのみ
結合を持つポリシー
セキュリティ定義機能を持つポリシー
メールドメインの検証
行の有効期限
高度なポリシー

### Tips

#### ポリシーを使用しない方法

SupabaseのAPIを使用して、認証ルールをミドルウェアに配置する方法。

- ポリシーを使用する代わりに、認証ルールをミドルウェアに配置することができます。これは、他のバックエンド<->ミドルウェア<->フロントエンドアーキテクチャと同様に、Edge Functionsを使用して実行することができます。

- ポリシーはツールであり、特に「サーバーレス/Jamstack」のセットアップでは、ミドルウェアをデプロイする必要がなく、ブラウザから直接JavaScriptライブラリを使用できるため、特に効果的です。

- アプリケーションに別の認証方法を使用したい場合は、それも問題ありません。Supabaseは「ただのPostgres」であるため、アプリケーションがPostgresと動作する場合、Supabaseでも動作します。

- このアプローチを使用する場合は、テーブルのRLSを有効にする必要があります。その後、サービスロールキー（クライアントライブラリ用）またはPostgresロールを使用して、RLSをバイパスできます。
このアプローチでは、ポリシーを作成する必要はありません。RLSを有効にするだけで十分です。


#### クライアントでサービス・キーを使用しない

SupabaseのAPIを使用して、サービスキーをクライアントで使用しないようにする方法。

Supabaseは、RLSをバイパスするために使用できる特別な「サービス」キーを提供しています。

これは管理に役立ちますが、ブラウザで使用してはいけません。、そしてユーザーに公開してもいけません。

注意点として、サービスキーを使用してクライアントを初期化しても、ユーザートークンが設定されている場合はRLSがオーバーライドされないことがあります。

つまり、ユーザーがクライアントでサインインしている場合、SupabaseはユーザーのRLSポリシーに従います。

したがって、サービスキーを使用してクライアントを初期化する場合は、ユーザートークンが設定されているかどうかを確認する必要があります。また、サービスキーをクライアントで使用しないようにすることで、セキュリティ上のリスクを回避することができます。

※ユーザー トークンが設定されている場合、サービス キーを使用してクライアントを初期化しても RLS はオーバーライドされません。ユーザーがクライアントでサインインしている場合、Supabase はユーザーの RLS ポリシーに従います。



#### Testing policies

ポリシーのテスト

データベース自体でポリシーをテストする方法。

フロントエンドに切り替えたり、別のユーザーとしてログインしたりすることなく、データベース自体でポリシーをテストするには、以下のヘルパーSQLプロシージャを使用できます。

このヘルパーSQLプロシージャは、ポリシーが正しく機能しているかどうかを確認するために使用されます。

具体的には、ポリシーによって制限された行にアクセスできないことを確認するために使用されます。

このヘルパーSQLプロシージャは、Supabaseのドキュメントから提供されています。

したがって、このヘルパーSQLプロシージャを使用することで、データベース自体でポリシーをテストすることができます。

```sql
grant anon, authenticated to postgres;

create or replace procedure auth.login_as_user (user_email text)
    language plpgsql
    as $$
declare
    auth_user auth.users;
begin
    select
        * into auth_user
    from
        auth.users
    where
        email = user_email;
    execute format('set request.jwt.claim.sub=%L', (auth_user).id::text);
    execute format('set request.jwt.claim.role=%I', (auth_user).role);
    execute format('set request.jwt.claim.email=%L', (auth_user).email);
    execute format('set request.jwt.claims=%L', json_strip_nulls(json_build_object('app_metadata', (auth_user).raw_app_meta_data))::text);

    raise notice '%', format( 'set role %I; -- logging in as %L (%L)', (auth_user).role, (auth_user).id, (auth_user).email);
    execute format('set role %I', (auth_user).role);
end;
$$;

create or replace procedure auth.login_as_anon ()
    language plpgsql
    as $$
begin
    set request.jwt.claim.sub='';
    set request.jwt.claim.role='';
    set request.jwt.claim.email='';
    set request.jwt.claims='';
    set role anon;
end;
$$;

create or replace procedure auth.logout ()
    language plpgsql
    as $$
begin
    set request.jwt.claim.sub='';
    set request.jwt.claim.role='';
    set request.jwt.claim.email='';
    set request.jwt.claims='';
    set role postgres;
end;
$$;

```

SupabaseのAPIを使用して、特定のユーザーに切り替える方法。

特定のユーザーに切り替えるには、

call auth.login_as_user('my@email.com');

を使用します。

また、

call auth.login_as_anon();

を使用して、anonロールに切り替えることもできます。

終了したら、

call auth.logout();

を使用して、postgresロールに戻ります。

これらのプロシージャは、ポリシーのpgTAPユニットテストを書くためにも使用できます。

したがって、これらのプロシージャを使用することで、特定のユーザーに切り替えてポリシーをテストすることができます。

また、pgTAPユニットテストを書くためにも使用できます。


### Deprecated features

廃止された機能

* auth.role()

auth.role()を使用する代わりに、PostgresでTOフィールドを使用することを推奨します。



* auth.email()

代わりに
auth.jwt() ->> 'email'
を使用してください

リクエストを行ったユーザーの電子メールを返します。



## Server-side Rendering

https://supabase.com/docs/guides/auth/server-side-rendering

Supabase Auth はサーバーサイドレンダリング（SSR）をサポートしています。

- サーバーサイドレンダリング（SSR）は、レンダリングパフォーマンスを最適化し、高度なキャッシュ戦略を活用するための人気のある方法です。Supabase Authは、ユーザー情報にアクセスする必要がある場合や、サーバーがAPIリクエストをユーザーの代理で承認してコンテンツをレンダリングする必要がある場合に、サーバーサイドレンダリングをサポートしています。

- Supabase Authで認証すると、サーバーから2つの情報が発行されます。1つはJWT形式のアクセストークンであり、もう1つはランダムに生成されたリフレッシュトークンです。

- ほとんどのSupabaseプロジェクトでは、authサーバーが<project-ref>.supabase.co/auth/v1でリッスンしているため、アクセストークンとリフレッシュトークンは、sb-access-tokenとsb-refresh-tokenのクッキーとして<project-ref>.supabase.coドメインに設定されます。

- ただし、これらのクッキーはSame-Origin Policy（SOP）に従って、ドメイン間でのクッキーアクセスを制限するため、Webブラウザーからアクセスすることはできません。したがって、これらのクッキーはWebアプリケーションからアクセスすることはできず、これらのクッキーはアプリケーションのサーバーに送信されません。

したがって、Supabase Authは、サーバーサイドレンダリングをサポートしており、アクセストークンとリフレッシュトークンは、クッキーとして<project-ref>.supabase.coドメインに設定されます。ただし、これらのクッキーはWebアプリケーションからアクセスすることはできず、アプリケーションのサーバーに送信されません。


### Understanding the authentication flow

認証フローを理解する

https://supabase.com/docs/guides/auth/server-side-rendering#understanding-the-authentication-flow

サインインメソッドを呼び出すと、ブラウザ上で動作しているクライアントライブラリはリクエストをSupabase Authサーバに送信します。認証サーバは、電話番号、メールアドレスとパスワードの組み合わせ、マジックリンク、ソーシャルログイン（プロジェクトで設定している場合）のどれを認証するかを決定します。

ユーザーの身元確認が成功すると、Supabase Authサーバはユーザーをシングルページアプリにリダイレクトします。


#### Tips

Supabase DashboardでリダイレクトURLを設定することができます。

*や**のようなワイルドカードのマッチパターンを使って、異なる形式のURLへのリダイレクトを許可することができます。

Supabase Authは2つの認証フローをサポートしています：

Implicit と PKCE です。

PKCE フローは一般的にサーバ上で使用されます。
PKCE フローでは、リプレイ攻撃や URL キャプチャ攻撃からユーザを保護するために、 いくつかの追加ステップを導入しています。

Implicit フローとは異なり、ユーザはサーバ上で access_token と refresh_token にアクセスすることができます。



### Bringing it together#

Supabase Authが認証フローでどのように機能するかを説明し、サーバーサイドレンダリングを必要としないリダイレクトルートを確認することの重要性について。

- 認証フローからわかるように、ユーザーがログインした後にブラウザがアプリケーションのサーバーに送信する最初のリクエストには、ユーザーに関する情報が含まれていません。これは、最初にクライアント側のJavaScriptライブラリが実行され、アクセスとリフレッシュトークンがサーバーで利用可能になるためです。

- ログイン後のリダイレクトルートでサーバーサイドレンダリングを必要としないことを確認することが非常に重要です。認証が必要な他のルートについては、アクセスとリフレッシュトークンをサーバーに送信することができるため、同じような制限はありません。

Supabase Authがサーバーサイドレンダリングでユーザー情報にアクセスする方法を説明し、アクセストークンとリフレッシュトークンを使用してセッションを識別することの重要性について。

- サーバーサイドレンダリングのコードでは、以下のようにしてユーザー情報にアクセスできます。

```javascript
const refreshToken = req.cookies['my-refresh-token']
const accessToken = req.cookies['my-access-token']

if (refreshToken && accessToken) {
  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
    {
      auth: { persistSession: false },
    }
  })
} else {
  // make sure you handle this case!
  throw new Error('User is not authenticated.')
}

// returns user information
await supabase.auth.getUser()
```

- このコードでは、アクセストークンとリフレッシュトークンを使用してセッションを識別しています。
アクセストークンは有効期間が短く、リフレッシュトークンは長期間有効ですが、ユーザーがアクティブなセッションを持っているとは限りません。
ユーザーがログアウトした場合や、アプリケーションがmy-refresh-tokenクッキーを削除できなかった場合など、古いリフレッシュトークンがブラウザに残っている可能性があります。
また、リフレッシュトークンは最初に使用されてから数秒後しか使用できません。
したがって、アクセストークンが期限切れになる直前にのみリフレッシュトークンを使用し、アプリケーションでログアウトバグが発生しないようにすることが重要です。

- 認証エラーを処理する場合、ブラウザでページをレンダリングするのを遅延させることが良いプラクティスです。
ただし、アクセストークンには一部のユーザー情報が含まれているため、一部の場合には、この情報を使用してページをレンダリングすることができます。


### よくある質問

#### Next.jsのルートプリフェッチでサーバーサイドにセッションがない？

<Link href="/...">コンポーネントやRouter.push()APIを使ってNext.jsでルートプリフェッチを使用すると、ブラウザがアクセスおよびリフレッシュトークンを処理する前に、サーバーサイドのリクエストを送信することができます。これは、これらのリクエストにクッキーが設定されていない可能性があり、サーバーコードが認証されていないコンテンツをレンダリングすることを意味します。

ユーザーのエクスペリエンスを向上させるには、サインイン後、Next.jsからのルートプリフェッチを含まない特定のページにユーザーをリダイレクトすることをお勧めします。ブラウザで実行されているSupabaseクライアントライブラリがURLフラグメントからアクセストークンとリフレッシュトークンを取得したら、プリフェッチを使用する任意のページにユーザーを送ることができます。



#### クッキーをHttpOnlyにするには？

これは必要ありません。アクセストークンとリフレッシュトークンの両方は、アプリケーションの異なるコンポーネントに受け渡されるように設計されています。ブラウザベースのアプリケーションは、ブラウザセッションを適切に維持するために、リフレッシュトークンにアクセスする必要があります。



#### サーバーが無効なリフレッシュトークンエラーを受け取ります。何が起こっているのでしょうか？

ブラウザからサーバに送信されたリフレッシュトークンが古くなっている可能性があります。onAuthStateChange リスナーのコールバックにバグがなく、アプリケーションの寿命の比較的早い段階で登録されていることを確認してください。

サーバ側でこのエラーが発生した場合は、レンダリングをブラウザに延期して、クライアントライブラリが最新のリフレッシュトークンにアクセスできるようにしてください。



#### クッキーにもっと短い Max-Age パラメータを設定すべきでしょうか?

Max-AgeあるいはExpiresクッキー・パラメータは、ブラウザが値をサーバに送信するかどうかを制御するだけです。リフレッシュ・トークンはそのブラウザにおけるユーザの長期間の認証セッションを表しますから、クッキーに短いMax-AgeやExpiresパラメータを設定しても、ユーザ体験は劣化するだけです。

ユーザがログアウトしたかセッションが終了したことを確認する唯一の方法は、getUser() でユーザの詳細を取得することです。



#### SameSiteプロパティには何を使うべきでしょうか？

いくつかのプロパティはユーザー体験を低下させる可能性があるため、さまざまな状況におけるプロパティの動作を理解していることを確認してください。

良いデフォルトは、ユーザがあなたのサイトに移動するときにクッキーを送信するLaxを使うことです。クッキーは通常Secure属性を必要とし、HTTPS経由でのみ送信されます。ただし、localhostで開発する場合、これが問題になることがあります。



#### CDNやキャッシュを使ってサーバーサイド・レンダリングを使うことはできますか？

はい。しかし、少なくともリフレッシュ・トークン・クッキーの値をキャッシュ・キーに含めるように注意する必要があります。そうしないと、誤って異なるユーザのデータを含むページを提供してしまうかもしれません！

また、適切なキャッシュコントロールヘッダを設定してください。キャッシュ・キーは1時間以内ごとに無効にすることをお勧めします。



#### どの認証フローがPKCEをサポートしていますか?

現在のところ、PKCEはMagic Link、OAuth、Sign Up、Password Recoveryの各ルートでサポートされています。これらは、SupabaseクライアントライブラリのsignInWithOtp, signInWithOAuth, signUp, resetPasswordForEmailメソッドに対応しています。PKCE を電話とメールの OTP で使用する場合、暗黙的なフローに関する動作に変更はありません。




# AUTH HELPERS

https://supabase.com/docs/guides/auth/auth-helpers

## Overview

Supabaseのフレームワーク固有の認証ユーティリティ集です。

## Auth UI


## Flutter Auth UI


## Next.js (App Router版)

https://supabase.com/docs/guides/auth/auth-helpers/nextjs

### 動画講座

Why you need cookie-based Auth for the Next.js 13 App Router 🍪 - YouTube

https://www.youtube.com/watch?v=w3LD0Z73vgU

Cookie-based Auth and the Next.js 13 App Router - YouTube

https://www.youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF

Next.js 13 App Routerは、リアルタイム購読などのクライアントコードと、データ取得などのサーバーコードをとても簡単に書くことができます。このシリーズでは、クライアントコンポーネント、サーバーコンポーネント、ルートハンドラ、サーバーアクション、ミドルウェアでセッションを利用できるように、Supabase Authがクッキーを使用するように設定する方法を説明します。

Next.js Auth Helpersパッケージは、ユーザーのセッションをlocalStorageではなくCookieに保存するようにSupabase Authの設定をします。

これにより、アプリルータの
クライアントとサーバ

```
クライアントコンポーネント
サーバコンポーネント
サーバアクション
ルートハンドラ
ミドルウェア
```

でセッションを利用できるようになります。
セッションはSupabaseへのリクエストと共に自動的に送信されます。



### セッションとはなんですか？

- この場合のセッションとは、ユーザーがログインしている間にアプリケーションがユーザーに関する情報を保持するための仕組みです。

- Next.js Auth Helpersパッケージは、Supabase Authを設定して、ユーザーのセッションをlocalStorageではなくCookieに保存するようにしています。

- これにより、アプリケーションのクライアントとサーバーのコンポーネント、サーバーアクション、ルートハンドラ、ミドルウェアでセッションが利用できるようになります。

- セッションは、クライアントから Supabaseへのリクエストと共に自動的に送信されます。
つまり、ユーザーがログインしている間は、セッション情報が保持され、リクエストに含まれるため、サーバーサイドでセッション情報を取得することができます。


### セッション情報とはなんですか？

この文章↑におけるセッション情報とは、ユーザーがログインしている間にアプリケーションがユーザーに関する情報を保持するための情報です。
具体的には、ユーザーの認証情報やアクセス権限などが含まれます。Supabase Authでは、セッション情報をCookieに保存することができます。セッション情報は、クライアントからSupabaseへのリクエストと共に自動的に送信され、サーバーサイドでセッション情報を取得することができます。

### Cookieの保存場所はブラウザ上にですか？

Cookieはブラウザに保存されます。Cookieは、Webサイトがユーザーのブラウザに保存する小さなテキストファイルであり、Webサイトがユーザーに関する情報を保持するために使用されます。
Cookieは、ブラウザがWebサイトにリクエストを送信するたびに、自動的にWebサイトに送信されます。したがって、Cookieは、Webサイトとブラウザの間で情報を共有するための一般的な方法です。


### Automatic Configuration (recommended)

Next.js の App Router を使う上で推奨される Supabase の構成。(推奨)



create-next-appコマンドとwith-supabaseテンプレートを使用して、Next.js AuthヘルパーによるCookieベースの認証設定を自動化（テンプレートを使用）します。

`npx create-next-app -e with-supabase`

これにより、次のように設定された新しいNext.jsアプリが作成されます：

Cookie-based Auth クッキーベースの認証
Middleware to refresh user's session ユーザーのセッションを更新するミドルウェア
Code Exchange Route ？？？
TypeScript
Tailwind CSS

#### 環境変数

Declare Environment Variables

API設定からプロジェクトのURLとanonキーを取得し、以下の環境変数を含む.env.localファイルを作成する：

```.env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

```

#### ローカルでNext.jsアプリを起動する

`npm run dev`


### マニュアルでの設定

Manual Configuration

npm install @supabase/auth-helpers-nextjs @supabase/supabase-js

```.env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

```

#### Managing session with Middleware

ミドルウェアによるセッションの管理

サーバ上でSupabaseクライアントを使用する場合、ユーザの認証セッションが有効なままであることを保証するために、特別な手順を実行する必要があります。

ユーザーのセッションはCookieで追跡されるので、このCookieを読み取り、必要に応じて更新する必要があります。

Next.jsのサーバーコンポーネントでは、クッキーを読み取ることはできますが、書き戻すことはできません。
一方、ミドルウェアはクッキーの読み込みと書き込みの両方が可能です。

※↑重要ポイント

Next.jsのミドルウェアは、各ルートがレンダリングされる直前に実行されます。サーバーコンポーネントのルートを読み込む前に、ミドルウェアを使ってユーザーのセッションをリフレッシュします。

プロジェクトのルートに新しい middleware.ts ファイルを作成します。

```middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}

```

※TypeScript の型を Supabase CLI からコマンドで生成し、createMiddlewareClient に渡すことで、Supabase クライアントに型のサポートを追加することができます。

※ getSession関数は、Supabaseクライアントを使用するServer Componentルートに対して呼び出す必要があります。これにより、クッキーからユーザーのセッションが読み取られ、必要に応じて更新されます。



#### Managing sign-in with Code Exchange

1. Next.jsのAuthヘルパーは、サーバーサイドの認証フローを使用して、ユーザーをアプリケーションにサインインするように設定されています。
2. 認証コードとユーザーのセッションを交換するために、コード交換ルートを設定する必要があります。
3. Code Exchangeルートは、サーバーサイドで実行され、認証コードを受け取り、Supabaseに送信して、ユーザーのセッションを取得します。
4. セッションは、クッキーに保存され、将来のリクエストで使用されます。
5. ユーザーがログインしている間は、セッション情報が保持され、リクエストに含まれるため、サーバーサイドでセッション情報を取得することができます。
6. Next.jsでこれを動作させるために、この交換を実行するコールバックRoute Handlerを作成します。

以上のように、Next.jsのAuthヘルパーを使用するためには、Code Exchangeルートを設定し、コールバックRoute Handlerを作成する必要があります。
これにより、サーバーサイドで認証コードを受け取り、ユーザーのセッションを取得し、クッキーに保存することができます。

#### Code Exchangeルートとは？

Code Exchangeルートは、OAuth 2.0認証フローの一部であり、認証コードをアクセストークンに交換するためのエンドポイントです。
Next.js Auth Helpersを使用する場合、Code Exchangeルートは、サーバーサイドで実行され、認証コードを受け取り、Supabaseに送信して、ユーザーのセッションを取得するために使用されます。
Code Exchangeルートは、アプリケーションのバックエンドに実装され、認証コードを受け取り、アクセストークンを取得するために使用されます。
Code Exchangeルートは、セキュリティ上の理由から、HTTPSを使用する必要があります。


Next.jsでこれを動作させるために、この交換を実行するコールバックRoute Handlerを作成します：

新しいファイルを作成します。

```app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

```

Supabase CLIでTypeScript型を生成し、 createRouteHandlerClient に渡すことで、Supabaseクライアントに型サポートを追加することができます。


### Authentication

認証はクライアントサイドでもサーバサイドでも行うことができます。supabase-js のすべての認証方式は Auth Helpers クライアントでサポートされています。

注意

認証フローでは、ユーザーのセッションのコードを交換するために Code Exchange Route が必要です。



#### Client-side

クライアントコンポーネントは、イベントハンドラから認証プロセスをトリガーするために使用できます。

つまり、ユーザーがボタンをクリックしたときなどのイベントを検知して、認証プロセスを開始することができます。

Supabase Auth Helpersクライアントを使用することで、クライアントサイドでも認証を行うことができます。

ただし、認証フローでは、ユーザーのセッションのコードを交換するためにCode Exchange Routeが必要です。


##### イベントハンドラから認証プロセスをトリガーするとはなんですか？

イベントハンドラとは、ユーザーがWebページ上で何らかのアクションを実行したときに、そのアクションに応じた処理を実行するためのJavaScriptの関数のことです。

例えば、ボタンをクリックしたときに何らかの処理を実行する場合、そのボタンに対してクリックイベントを設定し、そのイベントが発生したときに実行する関数を指定します。

Supabase Auth Helpersを使用する場合、クライアントコンポーネントを使用して、イベントハンドラから認証プロセスをトリガーすることができます。つまり、ボタンをクリックしたときに認証プロセスを開始することができます。


```app/login.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/lib/database.types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  )
}

```

※Supabase CLIでTypeScript型を生成し、createClientComponentClientに渡すことで、Supabaseクライアントに型サポートを追加することができます。





#### Server-side

サーバーコンポーネントとルートハンドラを組み合わせることで、フォーム送信から認証プロセスをトリガーすることができます。



#### Sign Up Route

```app/auth/sign-up.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient<Database>({ cookies })

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}

```

※TypeScript型をSupabase CLIで生成し、createRouteHandlerClientに渡すことで、Supabaseクライアントに型サポートを追加することができます。

※301 ステータスを返すと、POST ルートから GET ルートにリダイレクトされます。


#### Login Route

```app/auth/login.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient<Database>({ cookies })

  await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}

```

※TypeScript 型は Supabase CLI で生成し、createRouteHandlerClient に渡すことで Supabase クライアントに型サポートを追加することができます。

※301 ステータスを返すと、POST ルートから GET ルートにリダイレクトされます。



#### Logout Route

```app/auth/logout.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient<Database>({ cookies })

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  })
}

```

※Supabase CLIでTypeScript型を生成し、createRouteHandlerClientに渡すことで、Supabaseクライアントに型サポートを追加することができます。



##### Login Page

```app/login.tsx
export default function Login() {
  return (
    <form action="/auth/login" method="post">
      <label htmlFor="email">Email</label>
      <input name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
      <button formAction="/auth/sign-up">Sign Up</button>
    </form>
  )
}

```

### Creating a Supabase Client

Next.js Auth Helpersを使用する場合、Supabaseクライアントにアクセスするには以下の5つの方法があります。

- Client Components：クライアントサイドで認証を行うためのコンポーネント。
createClientComponentClientを使用して、Supabaseクライアントを作成します。

- Server Components：サーバーサイドで認証を行うためのコンポーネント。
createServerComponentClientを使用して、Supabaseクライアントを作成します。

- Server Actions：サーバーサイドで認証を行うためのアクション。
createServerActionClientを使用して、Supabaseクライアントを作成します。

- Route Handlers：サーバーサイドで認証を行うためのルートハンドラ。
createRouteHandlerClientを使用して、Supabaseクライアントを作成します。

- Middleware：サーバーサイドで認証を行うためのミドルウェア。
createMiddlewareClientを使用して、Supabaseクライアントを作成します。

これらの方法を使用することで、Supabaseクライアントを簡単に作成し、認証プロセスを実行することができます。

これにより、Supabaseクライアントを正しいコンテキストで簡単にインスタンス化することができます。

ClientClientComponentcreate
ClientServerComponentcreate
ClientServerActioncreate
ClientRouteHandlercreate
ClientMiddlewarecreate

この中のコンテキストを変更するだけで、Auth Helpersが残りの処理を処理します。
つまり、Supabaseクライアントを作成するためのコードを簡単に変更することができ、コンテキストに応じて適切なSupabaseクライアントを作成することができます。
これにより、コードの再利用性が向上し、開発の効率が向上します。

#### Client Components

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#client-components

#### Server Components

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#server-components

#### Server Actions

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#server-actions

#### Route Handlers

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#route-handlers

#### Middleware

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware

refreshing session の例を参照してください。

#### Edge Runtime

https://supabase.com/docs/guides/auth/auth-helpers/nextjs#edge-runtime

Edge Runtimeは、サーバーコンポーネントとルートハンドラをEdgeノードからホストし、ユーザーの場所にできるだけ近い場所からルートを提供することができます。

Edge Runtimeを使用するには、ランタイム変数をedgeに設定するようにルートを構成する必要があります。さらに、Supabaseクライアントを作成する前に、Edgeルートからcookies()関数を呼び出す必要があります。

つまり、Edge Runtimeを使用する場合、サーバーコンポーネントとルートハンドラをEdgeノードからホストし、ユーザーの場所にできるだけ近い場所からルートを提供することができます。また、cookies()関数を呼び出すことで、Supabaseクライアントを作成する前に必要なクッキーを設定することができます。

#### Server Components


```app/page.tsx
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Page() {
  const cookieStore = cookies()

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.from('todos').select()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

```

※TypeScript型をSupabase CLIで生成し、createServerComponentClientに渡すことで、Supabaseクライアントに型サポートを追加することができます。



#### Route Handlers

```app/api/todos/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { title } = await request.json()
  const cookieStore = cookies()

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })

  const { data } = await supabase.from('todos').insert({ title }).select()
  return NextResponse.json(data)
}

```

※Supabase CLIでTypeScript型を生成し、createRouteHandlerClientに渡すことで、Supabaseクライアントに型サポートを追加することができます。



#### Static Routes

Server ComponentsとRoute Handlersはデフォルトでは静的で、データはビルド時に一度だけ取得され、値はキャッシュされます。Supabaseへのリクエストはビルド時に発生するため、Supabaseへのリクエストと一緒に渡すユーザー、セッション、クッキーはありません。そのため、supabase-jsのcreateClient関数を使用して、静的ルートのデータを取得することができます。



#### Server Components

```app/page.tsx
import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/lib/database.types'

export default async function Page() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase.from('todos').select()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

```

※TypeScript 型を Supabase CLI で生成し、createClient に渡すことで、Supabase クライアントに型サポートを追加することができます。




#### Route Handlers

```app/api/todos/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const { title } = await request.json()

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase.from('todos').insert({ title }).select()
  return NextResponse.json(data)
}

```

※TypeScript 型を Supabase CLI で生成し、createClient に渡すことで、Supabase クライアントに型サポートを追加することができます。


### その他の例

Build a Twitter Clone with the Next.js App Router and Supabase | egghead.io

https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb

Cookie-based Auth and the Next.js 13 App Router - YouTube

https://www.youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF

Full App Router example
supabase/examples/auth/nextjs at master · supabase/supabase

https://github.com/supabase/supabase/tree/master/examples/auth/nextjs

Realtime Subscriptions
supabase/examples/auth/nextjs/app/realtime-posts.tsx at master · supabase/supabase

https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/realtime-posts.tsx

Protected Routes
supabase/examples/auth/nextjs/app/[id]/page.tsx at master · supabase/supabase

https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/%5Bid%5D/page.tsx

Conditional Rendering in Client Components with SSR
supabase/examples/auth/nextjs/app/[id]/page.tsx at master · supabase/supabase

https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/%5Bid%5D/page.tsx



### Migration Guide

v0.7.X#への移行
PKCE 認証フロー
PKCEは、Next.js Auth Helpersによって実装された新しいサーバーサイド認証フローです。ユーザーのセッションと認証コードを交換するために、/auth/callback用の新しいRoute Handlerが必要です。

このRoute Handlerを実装するには、上記のCode Exchange Routeの手順を確認してください。

認証
redirectTo または emailRedirectTo を持つ認証メソッドの場合、この新しいコード交換 Route Handler - /auth/callback に設定する必要があります。これはsignUp関数の例です：

```
supabase.auth.signUp({
  email: 'jon@example.com',
  password: 'sup3rs3cur3',
  options: {
    emailRedirectTo: 'http://localhost:3000/auth/callback',
  },
})

```

#### Deprecated Functions

Next.js認証ヘルパーのv0.7.xでは、createClient関数に新しい命名規則が実装されました。

createMiddlewareSupabaseClient
createBrowserSupabaseClient
createServerComponentSupabaseClient
createRouteHandlerSupabaseClient
↑これらの関数は非推奨としてマークされ、将来のバージョンのAuthヘルパーで削除される予定です。

createMiddlewareSupabaseClient は createMiddlewareClient に置き換えられました。
createBrowserSupabaseClient は createClientComponentClient に置き換えられました。
createServerComponentSupabaseClient は createServerComponentClient に置き換えられました。
createRouteHandlerSupabaseClient は createRouteHandlerClient に置き換えられました。




#### createClientComponentClient returns singleton

createClientComponentClient はシングルトンを返します。
すべてのクライアントコンポーネントで共有されるSupabaseクライアントのインスタンスが単一であることを保証するロジックを実装する必要がなくなりました。これはデフォルトになり、createClientComponentClient関数で処理されます！



## Remix


## SvelteKit



# DEEP DIVE

https://supabase.com/docs/learn/auth-deep-dive/auth-deep-dive-jwts

Part One: JWTs
Part Two: Row Level Security
Part Three: Policies
Part Four: GoTrue
Part Five: Google OAuth




## 疑問

### 質問A

複数の認証を設定した場合
一人のユーザーが複数の認証を使用したらどうなるのですか？
例えばGitHub認証とGoogle認証を使えるように設定した場合
それぞれログイン、ログアウトしたら
同一人物判定できるのですか？
それとも別の人物として扱われるのですか？

### 答えA

Supabase Authでは、複数の認証方式を設定することができます。例えば、GitHub認証とGoogle認証を設定した場合、同じユーザーがそれぞれの認証方式を使用してログインした場合、Supabase Authは同じユーザーとして扱います。つまり、同じユーザーが異なる認証方式を使用してログインした場合でも、Supabase Authは同じユーザーとして認識します。

#### 例

ユーザーAが2つの認証式を使い分ける場合
認証A＝＞認証A
認証B＝＞認証B
それぞれ独立している。同一人物だと判定されません。

ただし、異なる認証方式でログインした場合、それぞれの認証方式に対応するユーザーアカウントが作成されます。例えば、GitHub認証でログインした場合とGoogle認証でログインした場合、それぞれの認証方式に対応するユーザーアカウントが作成されます。これは、Supabase Authが自動的に異なる認証方式で作成されたユーザーアカウントをリンクする機能を提供していないためです。

#### 違う認証間同士での認証の紐づけ

したがって、同じユーザーが異なる認証方式でログインした場合、アプリケーション側でユーザーアカウントをリンクする必要があります。これには、以下の手順が必要です。

ユーザーが異なる認証方式でログインした場合、それぞれの認証方式に対応するユーザーアカウントが作成されます。
アプリケーション側で、ユーザーが同じ人物であることを確認し、それぞれのユーザーアカウントをリンクします。これには、ユーザーがログインしたときに、ユーザーのメールアドレスやユーザーIDなどの情報を使用して、既存のユーザーアカウントを検索し、リンクする必要があります。
以上の手順を実行することで、同じユーザーが異なる認証方式でログインした場合でも、アプリケーション側で同じユーザーとして扱うことができます。

具体的には
GitHub認証でログイン、ログアウトしたら
(もう一度同じ認証で)
GitHub認証でログインしたら同一人物と判定される。

↑間に違うGoogle認証でログイン、ログアウトを挟んでもGitHub認証とは交わりません。

GitHub認証でログイン、ログアウト ＞＞＞ ユーザーA
Google認証でログイン、ログアウト ＞＞＞ ユーザーB
GitHub認証でログイン、ログアウト ＞＞＞ ユーザーA
とそれぞれ別人として扱われます。



### 質問B

同一人物だと判定する方法はありますか？

### 答えB

GitHub認証とGoogle認証を使えるように設定した場合で
GitHub認証とGoogle認証を使ったのが同一人物と判定したい場合は
GitHub認証とGoogle認証で共通の項目を探して判断をする必要があるでしょう。

手軽なのはメールアドレスでしょう。
しかしGitHub認証とGoogle認証を疑うわけではないですが、
GitHub認証とGoogle認証側で別のメールアドレスを登録時に使っていたり
登録時の時間差で古いメールアドレスと新しいメールアドレスを使っていたりする等
いろんな問題が持ち上がってくると思います。

それでも同一人物だと判定する方法はこの記事の域を大きく超えているので
一旦ここで終了します。



# 真っ先に拾ったとは (名前の由来 masakinihirota)

インターネットという情報の洪水の中からまっさきに価値がある情報を拾い上げる。
VNS開発中・・・
