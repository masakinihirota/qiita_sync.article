<!--
title:   VScode 複数の拡張子を1つのスニペットファイルで使い回す方法 (.js .jsx .ts .tsxファイルを一つにスニペットファイルで)
tags:    JavaScript,TypeScript,VSCode,snippet
id:      e76ed410c85ceceed62d
private: false
-->
環境
VSCode Insiders
※VSCode Insidersは、Visual Studio Codeの開発版であり、最新の機能や改善点を最初に試すことができるプレリリース版です。

スニペットの登録
まず左下の歯車から
ユーザースニペット
グローバルスニペット
ファイル名を入力
[ファイル名].code-snippet
今回はglobalと入力
global.code-snippets

↓ここに
`C:\***\Code - Insiders\User\snippets\global.code-snippets`
というファイルが出力されます。

※自分はこのフォルダ内にある他のスニペットファイルがあった場合、すべて削除しています。(お試し用のスニペットファイルとか残っていたので)

```
{
  "Console log": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "c",
    "body": ["console.log($1);", "$2"],
    "description": "Log output to console"
  }
}


```

`scope`という属性をカンマ区切りで指定するだけで複数の拡張子に対応します。

`"javascript,typescript,javascriptreact,typescriptreact"`の場合は
`.js`
`.jsx`
`.ts`
`.tsx`
に対応します。