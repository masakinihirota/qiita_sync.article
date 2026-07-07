<!--
title:   GitHub CopilotのAIクレジットを消費せずに、無料でGemini 3.5 FlashをVSCodeのBYOK機能で利用する設定方法
tags:    BYOK,GitHubCopilot,VSCode,gemini3.5
id:      fa3711f97245766beb7e
private: false
-->
想定: Next.js やPostgres Drizzle HonoなどのWeb開発でのAI利用

無料は一日あたり20回です。
メインには使えなくても、ちょっと聞きたいこと、レビュー、簡単な処理やコード生成、定型処理、シンプルなコマンド実行 などには十分使えます。

GitHub Copilotを使い込んでいると、毎月のAIクレジット（使用枠）の残量が気になることはありませんか？

VSCodeのGitHub Copilotに搭載されたBYOK（Bring Your Own Key）機能を活用すれば、Google AI Studioで発行した無料のAPIキーを登録し、Copilotのクレジットを一切消費せずに Gemini 3.5 Flash を利用することが可能です。

本記事では、Googleアカウントの注意点を交えながら、APIキーの発行からVSCodeへの登録までの手順を解説します。

Xユーザーのmasakinihirotaさん: 「GitHub CopilotのBYOK機能を使ってこのGemini 3.5Flash をGitHub CopilotのAIクレジットを消費しないで使うことが出来ました。注意点 Googleアカウントの有料枠で使用するとGoogleの方のAIクレジットの課金がひつよう。無料のGoogleアカウントを作ってAI StudioでAPI KEYを作ってそれを登録すると無料 https://t.co/auNKMZfqge」 / X
https://x.com/masakinihirota/status/2073095776524476627

## 無料枠の回数は

無料枠での1日あたりの上限は「20回」です。

確認方法
Google AI Studio の左サイドメニューのレート制限をご覧ください。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/50430154-5774-4600-99a0-0619999e017d.png)

RPM（Requests Per Minute）
1分間に送信できる最大リクエスト（会話や提案）の回数です。画面の「1 / 5」は上限5回に対し、直近で1回消費したことを示します。

TPM（Tokens Per Minute）とは、1分間に処理できる文字やコードの総量（トークン数）の制限です。画面の「250K」は最大25万トークンまで扱えることを示し、「3.14K」は直近で約3140トークン消費していることを表します。Copilotで巨大なファイルを読み込ませると上限を超えやすいので注意してください。

RPD（Requests Per Day）
24時間（1日）に送信できる最大リクエストの回数です。画面の「4 / 20」は上限20回に対し、今日すでに4回消費したことを示します。

## Gemini 3.5Flash の実力は？

DeepSWE
https://deepswe.datacurve.ai/

👇️DeepSWEというベンチマークの画像です。
能力はGLM-5.2とKimi-2.7-codeの間というぐらいです。[medium]の場合 (これはVSCode側では設定できません)

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/fb489934-bc3e-4a83-afe5-f06f87f9243e.png)



VSCode のGitHub Copilotから Gemini 3.5FlashをAIクレジット消費無しで利用可能。

## GitHub CopilotのBYOKで登録方法

前提 VSCode で GitHub Copilotの基本的な使い方を知っている


👇️aistudio.google.com にアクセス
[Google AI Studio](https://aistudio.google.com/)

(以前にGoogleで課金したアカウントだと有料のAPIキーしか作成できません、なので、新しくGoogleアカウントを作っておく必要があります、そうすると無料のAPIキーを作成できます。)

👇️有料課金したことがあるアカウントだと、このようにTier1・前払いと出てしまいます。(残高ゼロの状態)
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c53920f5-108c-441b-af2e-6e78ac474a3a.png)

👇️Google無料アカウントの場合
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/039a1041-9c22-4ff0-b139-6ebae658f52a.png)

👆️このように「無料枠」と表示されます。

※有料枠をもつGoogleアカウントから無料枠に切り替える一番簡単な方法は新しくGoogleアカウントを作ることです。


👇️左下にある鍵のアイコンからAPIキーを作成します。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/982da005-7dce-4939-98e8-1edfb648eb43.png)

👇️右上の 「APIキーを作成」ボタンをクリック

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/5de81223-2db9-4e4a-91d7-c42da667ba1c.png)

APIキーをメモしておく

VSCode GitHub Copilotに移動して、
GitHub Copilotの右下の歯車アイコンから

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/76fa7a14-5f7f-429e-922a-1dc768b1a6b6.png)

BYOK機能を使う
👇️「＋モデルの追加」を押します。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/434129f8-2574-4ad8-a2e2-ef39791d845e.png)

👇️Googleを選択します。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/a1905c54-98bc-4f5e-bcd2-113798cd941e.png)

1. グループ名(自由に入力) → 名前を google
2. APIキー → ai.studioから取得したキーを登録

すると👇️ googleの枠が登録できます。
ピンで止めておくと使いやすいです。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/27dfebf0-46a4-49fe-b5de-c1b7a627eece.png)

👇️実際にAIモデルを選択画面で [AIのモデル名] Google とでていたら成功です。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/ff8a9211-04d0-4325-ab85-0ea8a862037e.png)