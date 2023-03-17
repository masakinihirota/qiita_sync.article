<!--
title:   Windows7 AutoHotkey HHKB Pro2 Vimライクっぽいもの
tags:    AutoHotkey,HHKB
id:      fae4dd0185226d4b49df
private: false
-->
HHKB Pro2にはカーソルキーがありません。
vimに似たカーソル操作で動かすためにAutoHotkeyを導入しました。
これでほぼホームポジションから手を動かさずに操作できます。
キーはアプリごとに設定する必要があります。
ファイル操作などはマウスを使っています。

自分用のメモ書き
AutoHotkeyの使用例

Window毎にキー設定を変える
AutoHotKeyのツールである Window spyで対象アプリのClassを見つける。

例
Window Title Class and Process
AutoHotkey.ahk - メモ帳
ahk_class Notepad     <<<<<<ここの文字列をコピー
ahk_exe notepad.exe

<img width="573" alt="AutoHotkey.png" src="https://qiita-image-store.s3.amazonaws.com/0/44761/4df80db2-c71b-f864-007d-f9ac032d8e2a.png">


```AutoHotkey:AutoHotkey.ahk
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Recommended for catching common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;＝基本
; 「;」セミコロンの右側はコメント文になる。
; 「;」セミコロンは行頭または半角空白後に置く。
; 「;」キーを利用するときは`を先頭において「`;」と書く。
; 複数のシンボルを同時に指定するときは、
; 「!+」のように間に何も開けずに連続して記述する。
; 「a::b」と書くと、aを押すとbが押されます。

;＝記号
;修飾シンボル
;+ Shift
;^ Control
;! Alt
;# Win
;& 2つのキーを連結（同時押し）

;＝注意
;CapsLockキーをCtrlキーに
;Capslock::Ctrl
;sc03a::Ctrl
;CaplLockを変更すると不具合あるらしい。（OKという報告も有り）
;ちなみに、CapsLock→CtrlはHHKB Pro2では不要。
;ちなみに、CapsLock→Ctrlはネットブックではレジストリ書き換え（by KeySwap）で実行済。

;＝テンプレ（対象アプリウィンドウを増やすためのテンプレ）
;|| WinActive("")		;コメント

;＝基本HHKB
#If WinActive("ahk_class Notepad") 		;メモ帳
|| WinActive("ahk_class Chrome_WidgetWin_1")	;Chrome
|| WinActive("ahk_class Hidemaru32Class")	;秀丸
|| WinActive("ahk_class XLMAIN")		;エクセル
|| WinActive("ahk_class CabinetWClass")		;エクスプローラー
|| WinActive("ahk_class TMainForm")		;Leeys

;＝英文字変換
^m::Send, {F10}			;英文字に変換
^+m::Send, {F7}			;カタカナに変換

;＝カーソル（Ctrl+英字でカーソル移動）
^h::Send, {Left}
^j::Send, {Down}
^k::Send, {Up}
^l::Send, {Right}
^u::Send, {Home} ;行頭へ
^o::Send, {End} ;行末へ
#IfWinActive

#If WinActive("ahk_class Chrome_WidgetWin_1")	;Chrome
,::Send, ^+{Space}
#IfWinActive

;＝言語関係
;LWinキーをWindowsキーから半角/全角キーに変える
LWin::++Space
;RWinキーをWindowsキーから半角/全角キーに変える
RWin::++Space

```