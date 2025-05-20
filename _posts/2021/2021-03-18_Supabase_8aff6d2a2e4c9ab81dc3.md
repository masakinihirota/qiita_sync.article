<!--
title:   Supabaseのサーバーが置いてある都市までの距離
tags:    Supabase
id:      8aff6d2a2e4c9ab81dc3
private: false
-->
追記 2021年8月20日
東京サーバーが追加されていました。

# DBサーバーまでの距離

SupabaseはFirebaseの代替になるように開発されているBaaS（Backend as a Service）です。

Firebaseと違うのは、一つとしてFirebaseのDB（データベース）がNoSQL（Firestore）なのに対して、
SupabaseはRDB（PostgreSQL）になっているところです。

※RDB:Relational Database（リレーショナルデータベース）

しかし、このSupabaseのDBサーバーは日本の近くに置かれていません。
なのでちょっと距離を調べてみました。

東京との距離順にソート済み

| 都市 | 距離 |
|:-:|:-:|
|Southeast Asia Singapole|5,325.950648km|
|South Asia Munbai|6,738.533635km|
|Oceania Sydney|7,833.161128km|
|Canada Central|8,068.703487km|
|West US North California|8,557.173548km|
|Cenntral EU Frankfurt|9,346.654556km|
|West EU London|9,573.164282km|
|West EU Ireland|9,661.791953km|
|East US North Virginia|10,984.257083km|
|South Africa Cape Town|14,754.541759km|
|South America Sao Paulo|18,552.832931km|

Supabaseで新規にプロジェクトを作成する時はシンガポールを選びましょう。

# 参考
２地点間の距離と方位角 - 高精度計算サイト
https://keisan.casio.jp/exec/system/1257670779