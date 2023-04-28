<!--
title:   VSCode キーボードショートカットキー設定+AutoHotkey+HHKB Vim操作 (Windows)
tags:    AutoHotkey,HHKB,VSCode,Vim
id:      289fb1b34f0ec31ddf4c
private: false
-->


※個人メモ (秘伝のタレみたいになっている)

# VSCodeのキーバインド設定


| キー | 備考 |
| --- | --- |
| ctrl+n | エディタ内で最後に編集した場所に移動 |
| ctrl+n | 単語単位:インライン提案の次の単語を承諾する |
| ctrl+b | 単語単位:インライン提案の承認を元に戻す |
| ctrl+1 | コードランナーでの実行 |
| ctrl+2 | ターミナル間移動 |
| ctrl+2 | ターミナル間移動 |
| ctrl+shift+alt+a | 全画面表示切り替え |
| alt+a | 禅モード (執筆集中モード) |
| ctrl+shift+z | ターミナル表示切り替え |
| ctrl+shift+a | サイドバー表示切り替え |
| ctrl+shift+x | ミニマップのトグル |
| ctrl+alt+a | TailwindCSS inlineFold |
| ctrl+i | カッコ間の移動 |
| ctrl+shift+i | カッコ間の移動 |
| ctrl+shift+n | 新しいファイルを開く |
| ctrl+shift+alt+n | 新しいウィンドウを開く |
| ctrl+shift+alt+f | 複数ページの置換 |
| shift+f1 | 選択範囲をソート 昇順 |
| shift+f2 | 選択範囲をソート 降順 |
| ctrl+tab | 右のタブファイルへ移動 |
| ctrl+shift+tab | 左のタブファイルへ移動 |

※ 自分で設定しているキーバインドは、`keybindings.json`に記述しています。

## keybindings.json

```keybindings.json
[
  {
    // エディタ内で最後に編集した場所に移動
    "key": "ctrl+n",
    "command": "workbench.action.navigateToLastEditLocation"
  },
  {
    // 単語単位:インライン提案の次の単語を承諾する
    "key": "ctrl+n",
    "command": "editor.action.inlineSuggest.acceptNextWord",
    "when": "inlineSuggestionVisible && !editorReadonly"
  },
  {
    // 単語単位:インライン提案の承諾を元に戻す
    "key": "ctrl+b",
    "command": "editor.action.inlineSuggest.undo",
    "when": "canUndoInlineSuggestion && !editorReadonly"
  },
  {
    "key": "ctrl+b",
    "command": "-workbench.action.toggleSidebarVisibility"
  },
  {
    // コードランナーでの実行
    "key": "ctrl+1",
    "command": "code-runner.run"
  },
  {
    // コードランナーでの実行を無効化
    "key": "ctrl+alt+n",
    "command": "-code-runner.run"
  },
  {
    // ターミナル間移動
    "key": "ctrl+2",
    "command": "workbench.action.terminal.focus",
    "when": "editorTextFocus"
  },
  {
    // ターミナル間移動
    "key": "ctrl+2",
    "command": "workbench.action.focusFirstEditorGroup",
    "when": "terminalFocus"
  },
  {
    // 全画面表示切り替え
    "key": "ctrl+shift+alt+a",
    "command": "workbench.action.toggleFullScreen"
  },
  {
    // 禅モード (コーディング集中モード)
    "key": "alt+a",
    "command": "workbench.action.toggleZenMode"
  },
  {
    // ターミナル表示切り替え
    "key": "ctrl+shift+z",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    // サイドバー表示切り替え
    "key": "ctrl+shift+a",
    "command": "workbench.action.toggleSidebarVisibility"
  },
  {
    // ミニマップのトグル
    "key": "ctrl+shift+x",
    "command": "editor.action.toggleMinimap"
  },
  {
    // TailwindCSS inlineFold
    "key": "ctrl+alt+a",
    "command": "inlineFold.toggle"
  },
  {
    // カッコ間の移動
    "key": "ctrl+i",
    "command": "editor.action.jumpToBracket",
    "when": "editorTextFocus"
  },
  {
    // カッコ間の移動
    "key": "ctrl+shift+i",
    "command": "editor.action.jumpToBracket",
    "when": "editorTextFocus"
  },
  {
    // 新しいファイルを開く
    "key": "ctrl+shift+n",
    "command": "workbench.action.files.newUntitledFile"
  },
  {
    // 新しいウィンドウを開く
    "key": "ctrl+shift+alt+n",
    "command": "workbench.action.newWindow"
  },
  {
    // 置換
    "key": "ctrl+shift+f",
    "command": "-workbench.action.terminal.searchWorkspace",
    "when": "terminalFocus && terminalProcessSupported && terminalTextSelected"
  },
  {
    // 複数ページの置換
    "key": "ctrl+shift+alt+f",
    "command": "workbench.action.replaceInFiles"
  },
  {
    // 選択範囲をソート 昇順
    "key": "shift+f1",
    "command": "editor.action.sortLinesAscending"
  },
  {
    // 選択範囲をソート 降順
    "key": "shift+f2",
    "command": "editor.action.sortLinesDescending"
  },
  {
    // 右のタブファイルへ移動
    "key": "ctrl+tab",
    "command": "workbench.action.nextEditor"
  },
  {
    // 左のタブファイルへ移動
    "key": "ctrl+shift+tab",
    "command": "workbench.action.previousEditor"
  },
  {
    // HTMLタグの対応関係を範囲選択します。
    // 押す回数を増やすごとに
    // 範囲が広がります。
    "key": "alt+q",
    "command": "editor.emmet.action.balanceOut"
  },
  {
    // HTMLタグの対応関係を範囲選択します。
    // 押す回数を増やすごとに
    // 範囲が狭まります。
    "key": "shift+alt+q",
    "command": "editor.emmet.action.balanceIn"
  },
  {
    // パンくずリストの表示 その場所へジャンプする
    // デフォルト設定
    // "key": "ctrl+shift+."
    "key": "ctrl+shift+oem_period",
    "command": "breadcrumbs.toggleToOn",
    "when": "!config.breadcrumbs.enabled"
  },
  {
    // 拡張機能:ファイルのコピー
    "key": "alt+z",
    "command": "fileutils.duplicateFile"
  },
  {
    // ターミナルの最大化 トグル
    "key": "ctrl+shift+alt+z",
    "command": "workbench.action.toggleMaximizedPanel"
  },
  {
    // 拡張機能: サーバーの起動
    "key": "alt+o",
    "command": "extension.liveServer.goOnline",
    "when": "editorTextFocus"
  },
  {
    // 無効化:サーバーの起動
    "key": "alt+l alt+o",
    "command": "-extension.liveServer.goOnline",
    "when": "editorTextFocus"
  },
  {
    // ファイル名 相対パスのコピー
    "key": "ctrl+shift+c",
    "command": "copyRelativeFilePath",
    "when": "editorFocus"
  },
  {
    // ファイル名 相対パスのコピー
    "key": "ctrl+shift+c",
    "command": "copyRelativeFilePath",
    "when": "!editorFocus"
  },
  {
    // 選択範囲を広げる
    // デフォルト設定
    "key": "shift+alt+right",
    "command": "editor.action.smartSelect.expand",
    "when": "editorTextFocus"
  },
  {
    // 選択範囲を縮める
    // デフォルト設定
    "key": "shift+alt+left",
    "command": "editor.action.smartSelect.shrink",
    "when": "editorTextFocus"
  },

  // これより下は無効化したショートカットキー
  // 被っているショートカットキーをショートカットキーGUI設定画面で
  // キーバインドの削除を選ぶと追加される。
  {
    // 無効化:現在行を上にコピー
    "key": "shift+alt+up",
    "command": "-editor.action.copyLinesUpAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    // 無効化:現在行を下にコピー
    "key": "shift+alt+down",
    "command": "-editor.action.copyLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    // 無効化:設定ファイルを開く
    "key": "ctrl+oem_comma",
    "command": "-workbench.action.openSettings"
  },
  {
    // 無効化:VSCodeを閉じる
    "key": "ctrl+shift+w",
    "command": "-workbench.action.closeWindow"
  },
  {
    // 無効化:文字間隔をトグルする
    "key": "alt+z",
    "command": "-editor.action.toggleWordWrap"
  },
  {
    "key": "ctrl+k ctrl+shift+c",
    "command": "-copyRelativeFilePath",
    "when": "!editorFocus"
  },
  {
    "key": "ctrl+k ctrl+shift+c",
    "command": "-copyRelativeFilePath",
    "when": "editorFocus"
  },
  {
    "key": "ctrl+shift+c",
    "command": "-workbench.action.terminal.openNativeConsole",
    "when": "!terminalFocus"
  },
  {
    "key": "ctrl+shift+v",
    "command": "-notebook.cell.pasteAbove",
    "when": "notebookEditorFocused && !inputFocus"
  },
  {
    "key": "ctrl+shift+v",
    "command": "-workbench.action.terminal.paste",
    "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
  },

  {
    "key": "ctrl+right",
    "command": "-editor.action.inlineSuggest.acceptNextWord",
    "when": "inlineSuggestionVisible && !editorReadonly"
  },
  {
    "key": "ctrl+left",
    "command": "-editor.action.inlineSuggest.undo",
    "when": "canUndoInlineSuggestion && !editorReadonly"
  }
]


```

※ VSCode拡張機能に対応したショートカットキーもまとめています。



# AutoHotkeyの設定（キーバインド部分のみ）

※AutoHotkeyを使っている理由は、Windows全体でキーボードショートカットキーを設定できるからです。

```AutoHotkey.ahk
;基本カーソル移動
^h::Send, {Left}
^j::Send, {Down}
^k::Send, {Up}
^l::Send, {Right}

;＋Shiftキーで単語単位で移動
;秀丸のキー設定：単語移動(サンネル風) Ctrl+右 に設定する。
;サンネル風とは単語単位の移動で単語の後ろにカーソルが移動する。
^+l::Send, ^{Right}
^+h::Send, ^{Left}
;右手小指なので2箇所のキーにセット
^`;::Send, ^{Right} ;単語単位でのカーソル移動
^'::Send, ^{Right} ;単語単位でのカーソル移動

;行頭、行末へ移動
^u::Send, {Home}
^o::Send, {End}
^+u::Send, {Home}
^+o::Send, {End}

;画面上下複数行移動
;複数行移動
^+k::Send, {Up 5}
^+j::Send, {Down 5}

;範囲選択 行単位
;Altキー上下
!j::Send, +{Down} ;上下は通常移動
!k::Send, +{Up}    ;上下は通常移動

;LWinキーをWindowsキーから半角/全角キーに変える
LWin::++Space
;RWinキーをWindowsキーから半角/全角キーに変える
RWin::++Space

```

※ ;記号はコメントアウトになります。
※ 環境周りの依存設定は除外してあります、直接的なキーバインド設定だけを記載しています。

## AutoHotkeyの基本

「a::b」と書くと、aキーを押すとbキーが押されたように動作します。。

```
修飾シンボル
+ Shift
^ Control
! Alt
# Win

（複数のシンボルを同時に指定するときは、
「!+」のように間に何も空けずに連続して記述する。）

```

見た目と機能が違うキー
DeleteキーはBackspaceキー相当
Fn+DelはDeleteキー相当


参考サイト
キーリスト - AutoHotkey Wiki
http://ahkwiki.net/KeyList


# 環境

* VSCode
* AutoHotkey
* 秀丸エディタ
* HHKB

※VSCodeはコードを書くときに使っています。
※秀丸エディタは日本語の文章を書くときに使っています。

キーボードはHHKBを使っています。
AutoHotkeyでVim風の操作を実現しています。
