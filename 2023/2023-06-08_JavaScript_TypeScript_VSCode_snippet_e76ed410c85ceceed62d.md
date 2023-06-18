<!--
title:   VScode 複数の拡張子を1つのスニペットファイルで使い回す方法 (.js .jsx .ts .tsxファイルを一つのスニペットファイルで)
tags:    JavaScript,TypeScript,VSCode,snippet
id:      e76ed410c85ceceed62d
private: false
-->

# 環境
Windows10
VSCode Insiders
※VSCode Insidersは、Visual Studio Codeの開発版であり、最新の機能や改善点を最初に試すことができるプレリリース版です。

※通常のVScodeでも同じようにできると思います。



# スニペットの登録方法
まず、VSCodeの左下の歯車アイコンから
ユーザースニペットを選択
新しいグローバルスニペットファイルを選択
そしてファイル名を入力すると・・・

下記のようなファイルが出力されます。

`[ファイル名].code-snippet`
今回はglobalと入力
`global.code-snippets`が出来ます。



# スニペットファイルの保存場所は
↓ここに
`*****\Code - Insiders\User\snippets\global.code-snippets`
というファイルが出力されます。

※自分はこのフォルダ内にある他のスニペットファイルがあった場合、すべて削除しています。(お試し用のスニペットファイルとか残っていたので)

# ファイル内容の書き換え

```global.code-snippets
{
  "Console log": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "c",
    "body": ["console.log($1);", "$2"],
    "description": "Log output to console"
  }
}


```

`"scope"`の場所で、拡張子をカンマ区切りで指定するだけで複数の拡張子に対応してくれます。

`"javascript,typescript,javascriptreact,typescriptreact"`の場合は
`.js`
`.jsx`
`.ts`
`.tsx`
に対応します。

あとはスニペットごとに"scope"を指定してあげればOKです。
