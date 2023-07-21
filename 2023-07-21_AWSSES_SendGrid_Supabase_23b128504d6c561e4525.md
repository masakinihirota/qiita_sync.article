<!--
title:   AI製アプリが増えたため 開発中のSupabaseのメールは4件/1時間がリミットに 本番環境では別途SMTP を利用する。
tags:    AWSSES,SendGrid,Supabase
id:      23b128504d6c561e4525
private: false
-->
# 結論
発端はあるツィート↓ 確認してみるとIssueがありました。それによるとSupabaseデフォルトのメール件数は制限したけど、カスタムSMPTを使えば制限はありませんのでそちらをお使いくださいとのこと。

# 話の流れ

ツィートが流れてくる

Supabase、開発中にすぐEmail rate limit exceededなってしまうのですが良い対策ありますか？

https://twitter.com/dshukertjrjp/status/1681955531966271488

Notice: Change to the email rate limits (still unrestricted for custom SMTP) · supabase · Discussion #15896

https://github.com/orgs/supabase/discussions/15896

> Because of a few customers treating the email system as a spam system, we had to decrease the number of emails that you can send to 4 per hour.

> メールシステムをスパムシステムとして扱う顧客が何人かいたため、1時間に送信できるメールの数を4通に減らさなければなりませんでした。


## Issueの要約
最近、SupabaseはAI製のアプリケーションに利用され、スパムメールが増加しています。このため、1時間あたりの送信可能なメール数を4通に制限しています。この措置は、正当なユーザーを保護するためですのでご理解ください。
また、デフォルトのメールシステムはテスト用であり、本番環境での使用は推奨されていません。AWSのSESをカスタムSMTPプロバイダーとして使用することを推奨します。

# 疑問&質問
メール認証は本番環境では外部サービスを利用するべきなのか？

AWSのSES
Send Grid
などをカスタムSMTPプロバイダーとして使用してください。

> AWS SES (Amazon Web Services Simple Email Service) は、クラウドベースのメール配信サービスで、開発者や企業が高品質のメールを送信できるようにするために設計されています。SESは、SMTP、API、またはAWS SDKを介してアクセスでき、高い信頼性、スケーラビリティ、セキュリティを提供します。SESは、認証、配信、モニタリング、および分析の機能を提供し、開発者や企業がメール配信を簡単かつ効果的に管理できるようにします。

> SendGridは、クラウドベースのメール配信サービスで、開発者や企業が高品質のメールを送信できるようにするために設計されています。SendGridは、SMTP、API、またはWebインターフェースを介してアクセスでき、高い信頼性、スケーラビリティ、セキュリティを提供します。SendGridは、認証、配信、モニタリング、および分析の機能を提供し、開発者や企業がメール配信を簡単かつ効果的に管理できるようにします。

# SupabaseでカスタムSMTPプロバイダーの設定方法は？

Supabaseのダッシュボードから
左サイドバーのProject Settings

Settings > Auth

SMTP Settings
You can use your own SMTP server instead of the built-in email service.
> 内蔵の電子メールサービスの代わりに、独自のSMTPサーバーを使用することができます。

**Enable Custom SMTPをオンにする。**

![Supabase SMTP.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/f33a54d6-67c8-2081-8764-77edd8c7acab.png)

Emails will be sent using your custom SMTP provider
> 電子メールは、カスタムSMTPプロバイダを使用して送信されます。

All fields below must be filled
The following fields must be filled before custom SMTP can be properly enabled
> 以下のフィールドはすべて入力されている必要があります。
カスタムSMTPを正しく有効にする前に、以下のフィールドに入力する必要があります。


![Supabase SMTP2.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/b2cd10b2-8b81-180d-2615-4995abc21b23.png)

※↓下の[＊＊＊]内を設定してください。

```SMTP設定
Sender details

Sender email
[noreply@yourdomain.com]

This is the email address the emails are sent from
> メールの送信元メールアドレスです。

Sender name
[The name shown on the email メールに表示される名前]

Name displayed in the recipient's inbox
> 信者の受信トレイに表示される名前

SMTP Provider Settings
Your SMTP Credentials will always be encrypted in our database.
> SMTP認証情報は常に暗号化されてデータベースに保存されます。

Host
[your.smtp.host.com]

Hostname or IP address of your SMTP server.
> SMTPサーバーのホスト名またはIPアドレス。

Port number
[465]

Port used by your SMTP server. Common ports include 25, 465, and 587.
Avoid using port 25 as modern SMTP email clients shouldn't use this port, it is traditionally blocked by residential ISPs and Cloud Hosting Providers, to curb the amount of spam.
> SMTPサーバーが使用するポート。一般的なポートには25、465、587があります。
最新のSMTPメールクライアントはこのポートを使用しないため、ポート25の使用は避けてください。このポートは、スパムの量を抑制するため、一般家庭向けのISPやクラウドホスティングプロバイダーによって伝統的にブロックされています。

Minimum interval between emails being sent
> メールの送信間隔
[60]
seconds

How long between each email can a new email be sent via your SMTP server.
> SMTPサーバーを経由して新しいメールを送信する間隔を指定します。

Rate limit for sending emails
メール送信速度制限
[3 emails per hour > 1時間に3通 ]

How many emails can be sent per hour.
> 1時間に送信できるメールの数

Username
[Realtime App]

Password
[••••••••••••]

```



## Supabaseをつかっている場合メール認証を使うべきではないのか？
＊＊＊＊[WIP]

## Supabaseシステムのメールはスパム判定されているのか？
n=1の意見ですが、自分はGmailでスパム判定されていたことがあります。

## カスタムSMTPサービスを提供している会社は？

AWS SES
Send Grid
Mailgun
Postmark
SparkPost
SMTP2GO
Mailjet
Mandrill
Elastic Email
SocketLabs
Pepipost
MailerLite
Mailtrap
Dyn
AuthSMTP
JangoSMTP
MailChannels
MailCot
MailerSend
Mailosaur

※AI調べ

# 後記
Supabaseのメールサービスも魅力の一つだったので制限されて残念です。