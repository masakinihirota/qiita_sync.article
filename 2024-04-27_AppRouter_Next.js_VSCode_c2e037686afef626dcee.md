<!--
title:   VSCodeの新機能 タブの表示名をカスタムする。Next.js Routing Files 専用 
tags:    AppRouter,Next.js,VSCode
id:      c2e037686afef626dcee
private: false
-->
Next.js の App router は同じファイル名が多くなるので、この機能は助かると思います。

# 参考

NextjsでVSCodeのタブのカスタムラベルを設定してみた #VSCode - Qiita

https://qiita.com/k_bobchin/items/c5031f5dfdc018c022ee

Visual Studio Code March 2024

https://code.visualstudio.com/updates/v1_88#_extensions-update-improvements

👆️を参考に
VSCodeのsettings.jsonに追記します。

<details><summary>VSCodeのバージョン</summary>

```text
バージョン: 1.88.1 (user setup)
日付: 2024-04-10T17:41:02.734Z
Node.js: 18.18.2
OS: Windows_NT x64 10.0.19045

```

</details>

## 例
`src/app/layout.tsx` の場合

| 変数名 | 説明 | 例 |
|---|---|---|
| `${filename}` | ファイル名 | `layout` |
| `${extname}` | 拡張子名 | `.tsx` |
| `${dirname}` | 一つ上のフォルダ名 | `app` (=`${dirname(0)}`) |
| `${dirname(N)}` | N+1個上のフォルダ名 | `src` `${dirname(1)}` (N=1の場合)  |

* `${dirname(N)}` は、N+1個上のフォルダ名を返す変数です。Nを指定することで、さらに上の階層のフォルダ名を取得できます。 `${dirname(0)}`～
* 例はあくまで一例です。実際のファイル名やフォルダ名に合わせて変数を置き換えてください。

## 設定

```settings.json
  //////////////////////////////////////////////////////////
  // 実験的機能
  //////////////////////////////////////////////////////////
  // VSCodeの新機能 タブの表示名をカスタムする。
  // Next.js Routing Files 専用
  "workbench.editor.customLabels.enabled": true,
  "workbench.editor.customLabels.patterns": {
    "**/layout.{js,jsx,tsx}": "${dirname}のレイアウト",
    "**/page.{js,jsx,tsx}": "${dirname}のページ",
    "**/loading.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/not-found.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/error.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/global-error.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/template.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/default.{js,jsx,tsx}": "${dirname}の${filename}.${extname}",
    "**/route.{js,ts}": "${dirname} ${filename}.${extname} API",
    "**/callback/route.{js,ts}": "${dirname(1)} ${dirname} ${filename}.${extname}",
  },

```

※layoutとpageだけはよく使うので特別扱い。

Next.js App router を使っている人は、VSCodeの `settings.json` に貼り付けるだけで大丈夫です。