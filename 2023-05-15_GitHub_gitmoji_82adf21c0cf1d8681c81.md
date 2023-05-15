<!--
title:   VSCodeでの GitHubの絵文字設定
tags:    GitHub,gitmoji,絵文字
id:      82adf21c0cf1d8681c81
private: true
-->
VSCodeでの
GitHubの絵文字設定



```settings.json
//////////////////////////////////////////////////////////
  // Gitmoji Commit
  //////////////////////////////////////////////////////////
  // 絵文字か、コードか選択する
  // emoji 絵文字が挿入される
  // code コードが挿入される
  "gitmoji.outputType": "emoji",
  // ↓設定したものだけを表示する
  // trueの場合 ユーザー設定のみ表示
  // falseの場合 デフォルト＋ユーザー設定の両方を表示
  "gitmoji.onlyUseCustomEmoji": true,
  // ユーザー設定 絵文字を設定する
  "gitmoji.addCustomEmoji": [
    // https://gitmoji.dev/
    // ↑からコードをコピペ出来ます。
    // テンプレート
    // { "emoji": "", "code": "", "description": "" },
    // { "emoji": "", "code": "", "description": "" },
    // { "emoji": "", "code": "", "description": "" },
    // 設定の順番通りに表示されるので、好きな順番に並べ替えてください。
    // アイコンが重複しても、コードが重複しても、表示されます。同じアイコンで別の説明を利用することも可能です。
    // 定型文 アイコン＋説明文

    {
      "emoji": "📝 ドキュメントの修正を行いました、機能に影響を与えていません。",
      "code": ":memo:",
      "description": "文言の修正をしました。機能に影響を与えないtypoからドキュメントの修正まで全部。"
    },
    // 自由文 アイコンのみ コミット文は自由に書いてください。

    {
      "emoji": "🩹 小さなBugを修正しました。",
      "code": ":adhesive_bandage:",
      "description": "小さなBugを修正しました。"
    },
    {
      "emoji": "🐛",
      "code": ":bug:",
      "description": "問題があったバグの修正をしました。"
    },
    {
      "emoji": "🎨 TailwindCSS",
      "code": ":art:",
      "description": "TailwindCSSのデザイン変更を行いました。"
    },
    {
      "emoji": "🎨 Mantine",
      "code": ":art:",
      "description": "Mantine（UI集）デザイン変更を行いました。"
    },
    {
      "emoji": "🎨 その他",
      "code": ":art:",
      "description": "コードのフォーマットなどの変更を行いました。"
    },
    {
      "emoji": "✨",
      "code": ":sparkles:",
      "description": "新機能を実装しました。"
    },

    {
      "emoji": "⚡️",
      "code": ":zap:",
      "description": "既存の機能に別の機能を追加しました。"
    },
    {
      "emoji": "🚧 作業中",
      "code": ":construction:",
      "description": "WIP work in progress 作業中です。"
    },
    {
      "emoji": "🔥",
      "code": ":fire:",
      "description": "不要な機能・使われなくなった機能の削除を行いました。"
    },
    {
      "emoji": "♻️",
      "code": ":recycle:",
      "description": "リファクタリングを行いました。"
    },
    { "emoji": "⚙", "code": ":gear:", "description": "設定の変更 config変更" },
    {
      "emoji": "🚑️",
      "code": ":ambulance:",
      "description": "緊急性の高いバグを修正した時に使います、これを見たら早めにレビューをしましょう。"
    },

    // { "emoji": "👍", "code": ":+1:", "description": "機能改善" },

    // { "emoji": "💢", "code": ":anger:", "description": "コンフリクトの解消をしました。" },

    // {
    //   "emoji": "💚",
    //   "code": ":green_heart:",
    //   "description": "テストやCIの修正・改善"
    // },
    // {
    //   "emoji": "👕",
    //   "code": ":shirt:",
    //   "description": "Lintエラーの修正やコードスタイルの修正"
    // },
    // { "emoji": "🚀", "code": ":rocket:", "description": "パフォーマンス改善" },
    // {
    //   "emoji": "🆙",
    //   "code": ":up:",
    //   "description": "依存パッケージなどのアップデート"
    // },
    // { "emoji": "👮", "code": ":cop:", "description": "セキュリティ関連の改善" },
    // { "emoji": "📚", "code": ":books:", "description": "ドキュメント" }
    // 定型文 アイコン＋説明文 （殆ど使わない）
    {
      "emoji": "🎉 プロジェクトを開始します！",
      "code": ":tada:",
      "description": "インストール＆初期化 開発開始です！"
    }
  ],

```