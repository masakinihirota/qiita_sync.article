<!--
title:   最新のPostgreSQL SQL文をAIに書かせるMCP「pg-aiguide」 (AI利用時のPostgreSQLデータベース用MCP)
tags:    PostgreSQL,VSCode
id:      e83b4c032242b65ee8a8
private: false
-->
XユーザーのAvi Chawlaさん: 「Big moment for Postgres! AI coding tools have been surprisingly bad at writing Postgres code. Not because the models are dumb, but because of how they learned SQL in the first place. LLMs are trained on the internet, which is full of outdated Stack Overflow answers and https://t.co/ZVJmwXJuSZ 」 / X
https://x.com/_avichawla/status/2005527034127433933

>AIが学習すると古い時代のコードまで学習するのでAIが生成するPostgreSQLは最新でない場合が多い、このMCPを使えばAI用のMCPとして最新のSQL文を書くことが出来るようになる。

AIコーディングツールがPostgreSQLコードを生成する際の課題として、インターネット上の古い情報や不完全なチュートリアルに基づいて学習したため、最新のPostgreSQLの進化（例：GENERATED ALWAYS AS IDENTITY、部分インデックス、NULLS NOT DISTINCTなど）を反映しないコードが生成されることが挙げられます。これを解決するために、TigerDatabase が開発した「pg-aiguide」というオープンソースのMCPを紹介します。

このツールは、公式PostgreSQLマニュアルへのセマンティック検索と、PostgreSQLのベストプラクティスを反映したスキルを提供することで、AIがより良いPostgreSQLコードを生成できるように支援します。

### 実験結果
- MCPサーバーを無効にした場合と有効にした場合のeコマースサイトのスキーマ生成を比較。
- MCPサーバーを有効にした場合、インデックスが420%増加、制約が235%増加、テーブル数が60%増加、自動化関数/トリガーが11個追加されるなど、データ整合性とパフォーマンスの向上が見られました。

### 特徴
- バージョン対応のセマンティック検索（PG14 vs PG17の違いを認識）
- スキーマ設計、インデックス、制約に関する意見付きベストプラクティス
- Claude Code、Cursor、VS CodeなどMCP対応ツールとの互換性
- 無料でオープンソース

## はじめに
近年、GitHub CopilotやClaudeなどのAIコーディングアシスタントは開発に欠かせないものになりました。しかし、PostgreSQLのコード生成において、AIが「古い構文を使う」「インデックス設定が甘い」「ベストプラクティスを無視する」といった不満を感じたことはありませんか？

今回は、Timescale社が公開した**Model Context Protocol (MCP)** サーバー、**「pg-aiguide」** を紹介します。これをVS Codeに導入することで、AIアシスタントにPostgreSQLの深い専門知識を与えることができます。

## pg-aiguide とは？

**pg-aiguide** は、AIコーディングツールがより高品質なPostgreSQLコードを生成できるように支援するためのMCPサーバーです。

通常のAIモデルは一般的な知識を持っていますが、pg-aiguideを接続することで以下の機能が追加されます。

1.  **公式マニュアルのセマンティック検索**: PostgreSQLのバージョンを意識した公式ドキュメントの検索が可能です。
2.  **AI最適化された「スキル」**: AIエージェントが自動的に利用する、厳選されたベストプラクティス集（スキーマ設計、インデックス戦略など）が含まれています。
3.  **拡張機能のドキュメント**: TimescaleDBなどの拡張機能に関するドキュメントもサポートしています。

### 導入の効果
Timescale社の検証によると、pg-aiguideを有効にした場合と無効にした場合で、生成されるスキーマに以下のような劇的な違いが出たと報告されています。

*   **制約（Constraints）が4倍**: データの整合性がより強固に。
*   **インデックスが55%増加**: 部分インデックスや式インデックスなど、高度な設定を含む。
*   **最新機能の活用**: `GENERATED ALWAYS AS IDENTITY` など、モダンなPostgreSQL（PG17推奨など）のパターンを採用。

---

## VS Code へのインストール方法

pg-aiguideはパブリックMCPサーバーとして提供されており、VS Codeに簡単に組み込むことができます。

### 手順：コマンドラインからの追加

VS Code（または VS Code Insiders）を使用している場合、ターミナルから以下のコマンドを実行することでMCPサーバーを追加できます。

**VS Code (通常版) の場合:**
`bash
code --add-mcp '{"name":"pg-aiguide","type":"http","url":"https://mcp.tigerdata.com/docs"}'
`

**VS Code Insiders の場合:**
`bash
code-insiders --add-mcp '{"name":"pg-aiguide","type":"http","url":"https://mcp.tigerdata.com/docs"}'
`

※ このコマンドは、VS CodeのMCP対応機能に対して設定を追加するものです。

### （参考）設定ファイルへの記述
もし手動で設定ファイル（例: `mcp.json` や利用しているAI拡張機能の設定）を編集する必要がある場合は、以下のJSON設定を使用します。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/03696e5a-084c-4e01-8ac9-a5248cad8c72.png)

```json
{
  "mcpServers": {
    "pg-aiguide": {
      "type": "http",
      "url": "https://mcp.tigerdata.com/docs"
    }
  }
}
```

---

## 使い方とプロンプト例

インストールが完了すると、VS Code内のAIアシスタントは自動的にpg-aiguideのツール（検索機能やスキル）を利用できるようになります。特別なコマンドは必要なく、いつも通りチャットで依頼するだけです。

### 基本的な使い方の例

**プロンプト例 1：シンプルなスキーマ作成**
> ユーザー名と一意のメールアドレスを保存するためのPostgresテーブルスキーマを作成してください。

このプロンプトに対し、pg-aiguideは単に `CREATE TABLE` するだけでなく、適切なデータ型や制約（Constraints）、インデックスを考慮したコードを生成するようAIを誘導します。

**プロンプト例 2：複雑な要件定義**
より高度な設計も可能です。例えば以下のようなシナリオを与えます。

> あなたはシニアソフトウェアエンジニアです。IoTデバイス企業のPostgresスキーマを作成するタスクがあります。デバイスは工場のフロアで環境データ（温度、湿度、気圧など）を収集します。各デバイスには一意のIDと人間が読める名前があります。データ収集時刻も記録したいです。
> 最近のデータ分析では異常値の検出が必要で、長期的な統計分析も行います。

このようなプロンプトを投げると、pg-aiguideは以下の要素を考慮して回答を生成します：
*   **Schema design**: 時系列データに適した設計。
*   **Indexing strategies**: 分析クエリを高速化するインデックス。
*   **Performance tuning**: 大量データに対するパフォーマンス考慮。

### 内部で何が起きているのか？

AIが回答を生成する際、pg-aiguideは裏側で以下のツール機能を提供しています。

*   **semantic_search_postgres_docs**: 公式マニュアルから関連情報を検索し、バージョンに合った正確な仕様を確認します。
*   **view_skill**: スキーマ設計や命名規則、データ整合性に関する「オピニオネイテッド（意見を持った）」なベストプラクティスをAIに注入します。

---

## まとめ
pg-aiguideは、AIがPostgreSQLの専門知識を活用して、より実用的で高品質なコードを生成することを可能にします。

pg-aiguideをVS Codeに導入することで、あなたのAIアシスタントは単なる「コード生成ツール」から、「最新のPostgreSQLベストプラクティスを知るエキスパート」へと進化します。

特に、古いバージョンの知識に引きずられがちなLLMの弱点を補い、堅牢でパフォーマンスの高いデータベース設計を行いたい開発者にとっては、必須のツールと言えるでしょう。

**リソース:**
*   GitHubリポジトリ: [timescale/pg-aiguide](https://github.com/timescale/pg-aiguide)