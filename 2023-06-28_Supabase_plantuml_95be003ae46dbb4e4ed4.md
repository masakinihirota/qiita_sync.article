<!--
title:   PlantUMLでER図を書く その時に必要なSupabaseの型情報 SupabaseのGUIから作るテーブルの型のまとめ (＋PostgreSQL)
tags:    ER図,Supabase,plantuml
id:      95be003ae46dbb4e4ed4
private: false
-->
PlantUMLを書く時にSupabaseで使える型がよく分からなかったので調べてみました。

Supabaseのテーブル設計でPlantUMLのER図で書く時は、SupabaseのダッシュボードのGUIから作成するSupabaseのテーブル作成で使える型をそのままつかいます。
なので↓の表は、Supabaseの型もPlantUMLのER図の型どちらも同じになります。

# Supabase と PlantUMLのER図 それぞれの型と範囲、説明

| Supabaseの型 | PlantUMLのER図 | 範囲 | 説明 |
|---|---|---|---|
| int2 | int2 | -32768 から 32767 | 2バイト符号付き整数 |
| int4 | int4 | -2147483648 から 2147483647 | 4バイト符号付き整数 |
| int8 | int8 | -9223372036854775808 から 9223372036854775807 | 8バイト符号付き整数 |
| float4 | float4 | -3.40282347E+38 から 3.40282347E+38 | 4バイト単精度浮動小数点数 |
| float8 | float8 | -1.7976931348623157E+308 から 1.7976931348623157E+308 | 8バイト倍精度浮動小数点数 |
| numeric | numeric | 任意の精度とスケールの定数小数点 | 数値 |
| json | json | - | JSONオブジェクト |
| jsonb | jsonb | - | JSONオブジェクトの拡張版 |
| text | text | - | 可変長文字列 |
| varchar | varchar | - | 固定長文字列 |
| uuid | uuid | - | 汎用一意識別子 UUID v4 |
| date | date | 4713 BC から 5874897 AD | 日付 |
| time | time | 00:00:00 から 24:00:00 | 時刻 |
| timetz | timetz | 00:00:00 から 24:00:00 | タイムゾーン付き時刻 |
| timestamp | timestamp | 4713 BC から 294276 AD | タイムスタンプ |
| timestamptz | timestamptz | 4713 BC から 294276 AD | タイムゾーン付きタイムスタンプ |
| bool | bool | - | 真偽値 |

※↑Supabaseの型はダッシュボードのGUIでテーブルを作る時に選択できる全ての型です。

## 時刻の型について

- `time`: 時刻を表す型です。時刻の範囲は00:00:00から24:00:00の間で、精度はマイクロ秒までサポートされています。タイムゾーンを考慮しないため、異なるタイムゾーンで同じ時刻を表すことができます。

- `timetz`: 時刻を表す型で、タイムゾーンを考慮します。`time`型と同様に、時刻の範囲は00:00:00から24:00:00の間で、精度はマイクロ秒までサポートされています。

- `timestamp`: 日付と時刻を表す型です。日付と時刻の範囲は4713 BCから294276 ADの間で、精度はマイクロ秒までサポートされています。タイムゾーンを考慮しないため、異なるタイムゾーンで同じ日時を表すことができます。

- `timestamptz`: 日付と時刻を表す型で、タイムゾーンを考慮します。`timestamp`型と同様に、日付と時刻の範囲は4713 BCから294276 ADの間で、精度はマイクロ秒までサポートされています。

# json と jsonbの違い

- `json`は、JSONオブジェクトをテキスト形式で格納します。そのため、JSONオブジェクトを取り出すためには、毎回パースする必要があります。

- `jsonb`は、JSONオブジェクトをバイナリ形式で格納します。そのため、JSONオブジェクトを取り出すためには、パースする必要がありません。また、`jsonb`は、インデックスを作成することができます。

つまり、`jsonb`は、`json`よりも高速であり、より効率的にJSONオブジェクトを格納することができます。ただし、`jsonb`は、ストレージの使用量が多くなるため、ストレージ容量に注意する必要があります。また、`jsonb`は、`json`よりも若干複雑なクエリを書く必要がある場合があります。



# PostgreSQLの型

※↓PostgreSQLにはあってSupabaseのGUIからは設定できない型はかなりあります。

※PostgreSQLの型はバージョン15を参考にしています。

https://www.postgresql.jp/document/15/html/datatype.html

| データ型 | 別名 | 説明 |
|---|---|---|
| bigint | int8 | 8バイト符号付き整数 |
| bigserial | serial8 | 自動増分8バイト整数 |
| bit [ (n) ] |  | 固定長ビット列 |
| bit varying [ (n) ] | varbit [ (n) ] | 可変長ビット列 |
| boolean | bool | 論理値（真/偽） |
| box |  | 平面上の矩形 |
| bytea |  | バイナリデータ（「バイトの配列（byte array）」） |
| character [ (n) ] | char [ (n) ] | 固定長文字列 |
| character varying [ (n) ] | varchar [ (n) ] | 可変長文字列 |
| cidr |  | IPv4もしくはIPv6ネットワークアドレス |
| circle |  | 平面上の円 |
| date |  | 暦の日付（年月日） |
| double precision | float8 | 倍精度浮動小数点（8バイト） |
| inet |  | IPv4もしくはIPv6ホストアドレス |
| integer | int, int4 | 4バイト符号付き整数 |
| interval [ fields ] [ (p) ] |  | 時間間隔 |
| json |  | テキストのJSONデータ |
| jsonb |  | バイナリ JSON データ, 展開型 |
| line |  | 平面上の無限直線 |
| lseg |  | 平面上の線分 |
| macaddr |  | MAC（Media Access Control）アドレス |
| macaddr8 |  | MAC (Media Access Control) アドレス (EUI-64 形式) |
| money |  | 貨幣金額 |
| numeric [ (p, s) ] | decimal [ (p, s) ] | 精度の選択可能な高精度数値 |
| path |  | 平面上の幾何学的経路 |
| pg_lsn |  | PostgreSQLログシーケンス番号 |
| pg_snapshot |  | ユーザレベルのトランザクションIDスナップショット |
| point |  | 平面上の幾何学的点 |
| polygon |  | 平面上の閉じた幾何学的経路 |
| real | float4 | 単精度浮動小数点（4バイト） |
| smallint | int2 | 2バイト符号付き整数 |
| smallserial | serial2 | 自動増分2バイト整数 |
| serial | serial4 | 自動増分4バイト整数 |
| text |  | 可変長文字列 |
| time [ (p) ] [ without time zone ] |  | 時刻（時間帯なし） |
| time [ (p) ] with time zone | timetz | 時間帯付き時刻 |
| timestamp [ (p) ] [ without time zone ] |  | 日付と時刻（時間帯なし） |
| timestamp [ (p) ] with time zone | timestamptz | 時間帯付き日付と時刻 |
| tsquery |  | テキスト検索問い合わせ |
| tsvector |  | テキスト検索文書 |
| txid_snapshot |  | ユーザレベルのトランザクションIDスナップショット(廃止予定。pg_snapshotを参照) |
| uuid |  | 汎用一意識別子 |
| xml |  | XMLデータ |

※確認していませんが、SQL Editor からSQL文を流し込めば使える・・・かもしれない・・・