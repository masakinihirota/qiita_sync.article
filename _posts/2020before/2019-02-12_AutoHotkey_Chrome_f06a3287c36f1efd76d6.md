<!--
title:   Chromeのタブ上でマウスホイールを動かすとタブが切り替わる。
tags:    AutoHotkey,Chrome
id:      f06a3287c36f1efd76d6
private: false
-->
目的
タイトル通り ＆ 備忘録的なもの。

対象
Chrome、AutoHotKeyを使っている人。

使い方
拡張子.ahkファイルの最下部にでも貼り付ける。

引用
How can I get google chrome to switch tabs using the mouse wheel? - Super User
https://superuser.com/questions/504687/how-can-i-get-google-chrome-to-switch-tabs-using-the-mouse-wheel

```AutoHotKey:chrome_wheel.ahk
puts 'code with syntax'

;; Wheel Scroll Tabs for Google Chrome

#IfWinActive ahk_class Chrome_WidgetWin_1
 ~$WheelDown::
 ~$WheelUp::
    MouseGetPos,, yaxis
    IfGreater,yaxis,23, Return
    IfEqual,A_ThisHotkey,~$WheelDown, Send ^{PgDn}
                                 Else Send ^{PgUp}
Return
#IfWinActive

```

マウスホイールの反応の幅（上下）が狭い場合は、
```    IfGreater,yaxis,23, Return ```
この行の23の数字をいじる。
