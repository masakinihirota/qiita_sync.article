<!--
title:   `npm install --save-dev @prisma/cli` でエラー
tags:    prisma
id:      1f091dc725ce4dfabafe
private: false
-->
備忘録

# 結論
```yarn版
# @prisma/cli をアンイストール
yarn remove @prisma/cli
# prisma をインストール
yarn add prisma --dev
# prismaをついでにインストール
yarn add @prisma/client
```

`yarn add @prisma/cli ` が非推奨になり、
`yarn add prisma --dev ` が推奨されるようになりました。

```npm版
# @prisma/cliをアンイストールする。
npm uninstall @prisma/cli
# prismaをインストールする。
npm install prisma --save-dev
# prismaをついでにインストール
npm install @prisma/client
```

```
Output:
┌───────────────────────┐
│                                                                       │
│     The package @prisma/cli has been renamed to prisma.   │
│                                                                        │
│     Please uninstall @prisma/cli first.                      │
│     Then install prisma to continue using Prisma CLI: │
│                                                                       │
│         # Uninstall old CLI                                      │
│         yarn remove @prisma/cli                              │
│                                                                        │
│         # Install new CLI                                         │
│         yarn add prisma --dev                                 │
│                                                                        │
│         # Invoke via npx                                         │
│         yarn prisma --help                                      │
│                                                                        │
│     Learn more here: https://github.com/prisma/prisma/releases/tag/2.16.0   │
│                                                                         │
└───────────────────────┘


```

ちょっと古い記事だと
`npm uninstall @prisma/cli`のままなのが結構あるので検索用として残します。



# 起こった問題

```
npm install --save-dev @prisma/cli
npm i -D @prisma/cli
yarn add @prisma/cli
```

のどれかでインストールすると


```***err.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! @prisma/cli@2.20.1 preinstall: `node scripts/preinstall-entry.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the @prisma/cli@2.20.1 preinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\hi\AppData\Roaming\npm-cache\_logs\2021-05-07T03_05_47_308Z-debug.log
```

とエラーが出る

# 原因
`@prisma/cli`の名前がバージョンアップに伴い`prisma`に変更されました。
