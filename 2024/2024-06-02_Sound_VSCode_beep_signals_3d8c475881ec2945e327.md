<!--
title:   VSCodeで鳴る音を消す設定
tags:    Sound,VSCode,beep,signals
id:      3d8c475881ec2945e327
private: false
-->
# VSCodeの設定

設定ファイルの場所 Windows
c:\Users\{ユーザーネーム}\AppData\Roaming\Code\User\settings.json

👇この設定をsettings.jsonファイルに追記します。

```settings.json
  "editor.accessibilitySupport": "off",
```

もしくは、
細かく制御したい場合

```settings.json
  "accessibility.signals.sounds.volume": 0,
  "accessibility.signals.progress": { "sound": "off" },
  "accessibility.signals.positionHasError": { "sound": "off" },
  "accessibility.signals.positionHasWarning": { "announcement": "off" },
  "accessibility.signals.chatResponseReceived": { "sound": "off" },
  "accessibility.signals.voiceRecordingStopped": { "sound": "off" },
  "accessibility.signals.chatRequestSent": { "sound": "off" },
  "accessibility.signals.clear": {"sound": "off" },
  "accessibility.signals.lineHasFoldedArea": {"sound": "off" },
  "accessibility.signals.lineHasInlineSuggestion": {"sound": "off" },
  "accessibility.signals.noInlayHints": {"sound": "off" },
  "accessibility.signals.notebookCellCompleted": {"sound": "off" },
  "accessibility.signals.onDebugBreak": {"sound": "off" },
  "accessibility.signals.notebookCellFailed": {"sound": "off" },
  "accessibility.signals.taskCompleted": {"sound": "off" },
  "accessibility.signals.terminalQuickFix": {"sound": "off" },
  "accessibility.signals.terminalCommandFailed": {"sound": "off" },
  "accessibility.signals.terminalBell": {"sound": "off" },
  "accessibility.signals.taskFailed": {"sound": "off" },
  "accessibility.signals.lineHasWarning": {"sound": "off" },
  "accessibility.signals.lineHasError": {"sound": "off" },
  "accessibility.signals.lineHasBreakpoint": {"sound": "off" },
  "accessibility.signals.diffLineModified": {"sound": "off" },
  "accessibility.signals.diffLineInserted": {"sound": "off" },
  "accessibility.signals.diffLineDeleted": {"sound": "off" },

```
