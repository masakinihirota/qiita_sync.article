<!--
title:   Fauna の紹介 （Temporal Database ） なぜ定番のSQLを使わずFQLという謎言語を使うのか？
tags:    BiTemporalDataModel,Database,Fauna,faunadb,temporal
id:      c232832bd72ae11905e7
private: false
-->
# Faunaとは

Fauna | The data API for modern applications
https://fauna.com/

Faunaの紹介
Faunaとはデータベースの名前です。
MySQLとかPostgres、SQLite等のように、
たくさんあるデータベースアプリケーションの一つです。
（少し前まではFaunaDBでした。）

Faunaは英語で
> 動物相（どうぶつそう、英:Fauna）
ある特定の地域と時間における動物を表す集合的な用語である。
これに対応する植物の集合の概念は植物相である。
さらに全生物を対象とする言葉に生物相がある。
ラテン語の仮名書きであるファウナの形でもよく使われる。

Faunaで検索するとFaunaデータベースの情報はまず出てこないので
**FaunaDB**でよく検索します。

Faunaではデータを操作する言語にSQLではなく、FQLを採用しています。

リレーショナルデータベース上でデータを操作するのにSQLを使用するのと同じように、
FQLではFaunaデータベース上のデータを操作するFauna専用のデータベース操作言語です。

**ここでFauna最大の疑問、なぜデータベースなのにSQLを使わないのでしょうか？**

普通、SQLは長年の実績があるしノウハウも豊富にあって技術も枯れていますから、
データベースを使うならSQL一択で他の選択肢はないと思います。

でも、それなのになぜFQLという謎のデータベース操作言語を使うのでしょうか？

それは、SQLは**日時を文字列**と認識しています、
FQLでは**日時を日時**として認識するからです。

意味がわかるでしょうか？

SQLでの日時は日頃よく使っているデータタイプだと、
触ったことがある人ならそう思うはずです。

でも本当にそうでしょうか？
SQLで日時を扱っているのでしょうか？

実を言うとSQLでは日時を扱っていません。
SQLでは数値と文字列の組み合わせたタイプの型なのです。

例えば、SQLでデータを上書きしたら過去のデータは消えてしまい再現できません
プログラム等で履歴等をサポートする必要があります。

Faunaは従来のデータベースに時系列をシステムとして組み込んだ
次世代型のデータベースなのです。

この時系列を組み込んだデータベースを
総じてTemporal Databaseといいます。

>英語でTemporalとは
現世の、世間的な、(空間に対して)時間的な、
一時の、(聖職者・教会に対して)聖職でない、
時を表わす、時制の、こめかみの、側頭の

Temporal Databaseはいくつか種類があって
Faunaはその数あるTemporal Databaseの種類の一つです。

>Temporal Databaseとは
時間軸をデータベースの設計思想に組み込んだデータベースです。

時間を設計思想に組み込む？どういう言う意味でしょうか？

ちょっと整理しますとデータベースには次元の壁のようなものがあります。

![SQLとFQL.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/92fef1a3-d0fa-6757-a0c6-4cb5c5922d2c.png)
※ 時間軸が追加されている。

- １次元、データ軸だけで表現するのがSQL
MySQLやPostgres、SQLiteなどのリレーショナルデータベースがこれに当たります。
※最新のデータベースではオプションで時系列をサポートしているデータベースもあります。
その場合は拡張SQLを使用しているそうです。（未確認）

- ２次元、データ軸、時間軸で表すタイプのデータベース
Fauna、FQL言語がこれに当たります。
FaunaはTemporal Databaseの一種であるBiTemporal Databaseです。

>BiTemporalとは
2つのTemporalという意味です。

時間を2つの要素に分解してシステムに組み込んでいるという意味です。
なにが2つかは後ほど説明します。

- ３次元、データ軸、時間軸、空間軸で表すタイプのデータベースもあります。
Spatio-temporal Database
時空間データベース
時間や空間的な情報とを関連付けて表示されるデータ群を
より直接的により効率的に扱うためのデータベースです。
GPSを使用した地図アプリなどで使われているようです。
これは全く知らないので詳しくはかけません。

>Spatio- 空間の space

#### 補足
1次元はMySQLやPostgresなどのデータベース
2次元はTemporal Databaseデータベース
1次元でも時系列をサポートしていると書きましたが、建て増しの様なイメージ。操作するのはSQLを拡張したもの。
2次元では設計思想から時系列を考慮に入れているイメージ。操作するのは最初から言語の設計思想に組み込まれているもの。FaunaではFQLを使用しています。

データベース全体をみると技術は未だ発展途上にあります、いつの日かSQLがデファクトスタンダードで無くなる日が来るのではないでしょうか？

#時間軸を組み込んだデータベース

Faunaは時間軸を組み込んだデータベースであり、
従来のリレーショナルデータベースの操作言語であるSQLは使えないので
FQLというFauna専用のデータベース操作言語を使用すると書きました。

では時間軸を組み込むとは何でしょうか？
リレーショナルデータベースとは何が違うのでしょうか？

# 簡単な例

あるデータベースに、
データを入力して新規作成して、
データを更新して、
データを削除します。

この場合、
リレーショナルデータベースでは
データの履歴を追うことは出来ません。

リレーショナルデータベースでは、
そのような履歴を追うには
自分でプログラムを書いたり拡張機能を使う必要があります。

Faunaは時間軸を取り入れたデータベースなので出来ます。
いつ入力し、いつ更新し、いつ削除したのかを
データベース側が記録してくれています。

ここで問題なのは使用する側が時間の概念を習得しておかないと
どのように動いているのか理解できない事です。

データベース上の時間を考えたことあるでしょうか？

時間は連続しているはずなのに
リレーショナルデータベース内の時間データは離散的です。

> 離散的とは
連続的ではないさま。数学で、値や数量がとびとびになっているさま。
粒子や物体などの個数、実数のなかの整数、量子力学における物理量などが離散的な値をとる。

離散的とはここではその時点での時間です。

リレーショナルデータベースでは
あるデータを入力した時点、もしくは想定した時間を数値として入力します。
これではスナップショット的にデータを保存しているだけです。

> スナップショットとは
ある時点でのソースコードや、ファイル、ディレクトリ、
データベースファイルなどの状態を抜き出したもの

FaunaはTemporal Databaseと説明しましたが
扱うデータモデルは時系列を考慮した
BiTemporal Data Modelを使用しています。
このBiTemporal Data Modelとは何でしょうか？
（接頭語 Bi は2つという意味を含む言葉でした。）

それは、まず時系列のデータには2種類あると考えます。
**valid time**
と
**transaction time**
です。

valid timeは
ある要素が正しい場合にtrueとするパターン
(データベース上にあるかどうかは関係がありません、 現実の時間、実際リアルに起こった事象。)

例
あなたが現実世界で2000年4月1日に入社したなら
2000年4月1日以降はtrueと判定されます。

transaction timeは
(データベース上にデータがある時間です、データベース内の時間記録。)

例
2000年4月1日に入社して
2020年3月31日に退社したなら
transaction timeは
2000年4月1日～2020年3月31日です。

上記の2種類を組み合わせると
4つのパターンができあがります。

１
どちらも使用しない
Snapshot Model
これがリレーショナルデータベースのよくある使い方です。

２
valid timeだけ使う
Valid Time Data Model
Historical DB
※詳しく知りませんごめんなさい

３
transactional timeだけ使う
Transactional Data Model
Rollback DB
※詳しく知りませんごめんなさい

４
valid time と transactional timeの両方を使う
BiTemporal Data Model
Fauna DB

ようやくFaunaの本体が見えてきました。

**Faunaとはvalid time と transactional timeの両方のデータモデルを使用した
時系列を考慮したデータベースです。**


時系列の概念を考慮した4つのパターンに分けました。

１の
Snapshot Model
このタイプは時刻情報を保持していません。
履歴の追跡は困難です。
追跡が不要なデータの場合はこのタイプのデータベースで十分です。

２の
Valid Time Data Model

３の
Transactional Data Model

４の
BiTemporal Data Model
２と３の２つの要素を使っているので、BiTemporal と呼ばれています。

valid time
transaction time
この2つを勉強していけばFaunaをより高度に使えるようになります。
これ以上はFaunaを紹介するという目的からはずれてきてるので、この記事はここまでにしておきます。

興味が湧いた方は下記URLを御覧ください。
より詳しく書かれています。

参考
BiTemporal Data Modelに入門中 - だいたいよくわからないブログ
https://matsu-chara.hatenablog.com/entry/2017/04/01/110000

時制データベース
https://ja.wikinew.wiki/wiki/Temporal_database


# 擬似的な時系列データベースの実現とは？
リレーショナルデータベースの代表格であるpostgres等は擬似的に時系列データベースを実現しています。

例えば普通のリレーショナルデータベースの場合
2月10日 入金1000円 合計1000円
3月14日 入金2000円 合計3000円
というデータがあった場合

通常は2月10日のデータを上書きして3月14日の合計額は3000円となります。
そして、上書きしたので過去のデータ（2月10日の入金額）はわかりません。
（計算すればわかりますが、何かしらの機能を使うか、なにかそれ専用の計算プログラムを書く必要があります。）

postgresは擬似的に時系列を再現します。
postgresの場合は2月10日のデータを非表示にして、新たな場所に3月14日のデータを書き込みして前回のデータを消しません。
消さないので過去の履歴をたどって2月10日のデータを復活させて表示しているのです。
postgresは日時というものを認識しているわけではないのです。

時系列を組み込んだデータベースの場合は
入金したという事実を「認識」してデータを入力しているので復活とか余分な作業をする必要がありません。
すべてデータベース側が処理してくれます。（ただし、使用する人が時系列のデータを入力していると意識して使わなければ、それはただの1次元のデータベースとなってしまいます。）

想像してみてください、銀行の入出金などのデータを扱う場合プログラマー側がデータを繊細に追うしかありません、その作業を想像するだけで気が○いそうです。でも時制データベースを使えばプログラマー側が意識することなくシステム側で全て面倒を見てくれるのです。目的に沿って使えば時制データベースは絶大な力を発揮してくれるのです。

# 日本語 Documents
markdown化してDeepL翻訳にかけたもの。

[https://github.com/masakinihirota/FaunaDB_Documents]
(https://github.com/masakinihirota/FaunaDB_Documents)

# その他
Faunaをリレーショナルデータベースとして使いたい場合は
GraphQLを使用すればいいと思います。
時系列の概念を特に意識すること無く使えます。

Faunaの特徴は
BiTempral databaseに加えて
サーバーレスデータベースだという特徴があります。
Vercelで簡単にそして安全に自作アプリに追加できます。

Next.jsでFaunaを使う。Github Vercel Next.js FaunaでNext.jsに無料で簡単に安全にサーバレスDBを追加する。 - Qiita
https://qiita.com/masakinihirota/items/86e0716b914e94493f35


※この記事は**FaunaはなぜSQLを使わないのか？**という疑問を解消するために書きました。