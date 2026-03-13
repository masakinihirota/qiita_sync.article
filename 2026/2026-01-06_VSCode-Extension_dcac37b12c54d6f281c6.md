<!--
title:   TED:30分ごとに5分の運動をしよう >>VSCode拡張機能 30分作業・5分休憩で健康寿命を向上させるポモドーロタイマー 自作
tags:    VSCode-Extension
id:      dcac37b12c54d6f281c6
private: false
-->
https://www.youtube.com/watch?v=ZLq1SbBQRWY

## リポジトリ

https://github.com/masakinihirota/healthspan-timer

## リリース

Release v0.0.1 - Initial Release · masakinihirota/healthspan-timer
https://github.com/masakinihirota/healthspan-timer/releases/tag/v0.0.1



1. ローカルにインストールしてためします。

![スクリーンショット 2026-01-06 102314.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/e9c2afba-54ff-4719-bdeb-87e0e3865f91.png)


👆️リリースにある healthspan-timer-0.0.1.zipファイルをダウンロードして解凍するか healthspan-timer-0.0.1.vsix をダウンロードします。

拡張機能ビュー（Ctrl+Shift+X）を開きます。

![スクリーンショット 2026-01-06 102237.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/2cd6911b-7280-4589-af7f-93458051e6e6.png)


拡張機能ビューの右上の3点リーダー「...」を開き→「VSIX からのインストール...」を選択します。
ダウンロードした healthspan-timer-0.0.1.vsix を選択します。
インストールの完了です。



👇️readme.md 日本語

# HealthSpan Timer - 健康寿命向上タイマー

VS Code用の30分作業・5分休憩で健康寿命を向上させるポモドーロタイマー拡張機能です。

## 機能

### 🍅 ポモドーロタイマー
- **30分作業 → 5分休憩** のサイクルで集中力を管理
- ステータスバーに残り時間をリアルタイム表示
- クリックで簡単操作

### ⚠️ スマートな通知システム
時間が経過すると、**クリックするまで警告を表示**し続けます：
- 🎨 **色変更**: ステータスバーが警告色に変化
- 💡 **点滅**: ステータスバーが点滅して注意喚起
- 🔔 **OS通知**: Windowsのシステム通知
- 🔊 **音声通知**: ビープ音で知らせる

### 🎯 使い方
1. VS Codeを起動すると、画面下にあるステータスバーの右側に `🍅 30:00` と表示されます
2. クリックするとタイマーが開始します
3. 30分経過すると警告が表示されます
4. クリックすると5分休憩モードに切り替わります
5. 5分経過後、再びクリックで作業モードに戻ります

動作画像

![スクリーンショット 2026-01-06 102955.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/9a9e150b-c239-4bb2-b650-86fdee33e571.png)


## コマンド

### ⏱️ タイマー操作
- `HealthSpan Timer: 開始` - タイマーを開始
- `HealthSpan Timer: 一時停止` - タイマーを一時停止/再開
- `HealthSpan Timer: リセット` - タイマーをリセット
- `HealthSpan Timer: 次へスキップ` - 次のフェーズにスキップ

### ⚙️ 設定（GUIで簡単変更）
- `HealthSpan Timer: 設定を開く` - VS Codeの設定パネルを開く
- `HealthSpan Timer: 作業時間を設定` - 作業時間を数値入力で設定
- `HealthSpan Timer: 休憩時間を設定` - 休憩時間を数値入力で設定
- `HealthSpan Timer: 時間表示モードを変更` - 時間表示方法をクイックピックで選択
- `HealthSpan Timer: 警告方法を変更` - 警告方法をクイックピックで選択

**使い方:**
1. `Ctrl+Shift+P`（Windows/Linux）または `Cmd+Shift+P`（Mac）でコマンドパレットを開く
2. コマンド名を入力して選択
3. 必要に応じて値を入力またはクイックピックで選択

## 設定

設定画面（`Ctrl+,`）で以下をカスタマイズできます：

### タイマー設定
- `pomodoro.workDuration`: 作業時間（分、1-120、デフォルト: 30）
- `pomodoro.breakDuration`: 休憩時間（分、1-60、デフォルト: 5）
- `pomodoro.showTimeMode`: 時間表示モード
  - `always`: 常に時間を表示（デフォルト）
  - `toggle`: クリックで時間表示を切り替え
  - `never`: 時間を表示しない（停止時は「時間停止」と表示）

### 警告設定
- `pomodoro.warningMethod`: 警告方法
  - `color`: 色変更のみ
  - `blink`: 点滅のみ
  - `both`: 両方（デフォルト）
- `pomodoro.warningColor`: 警告時の色（16進数、デフォルト: `#FF5555`）

### 🔔 通知機能
- `pomodoro.enableSound`: 音声通知を有効にする（デフォルト: `true`）
- `pomodoro.enableOSNotification`: **ネイティブOS通知**を有効にする（デフォルト: `true`）
  - Windows: Windows Toast Notification
  - Mac: macOS Notification Center
  - Linux: D-Bus Notification
- `pomodoro.autoStart`: VS Code起動時に自動開始（デフォルト: `false`）

## GUI設定パネル

コマンドパレット（`Ctrl+Shift+P`）から以下のコマンドで、GUIを使って簡単に設定を変更できます：

### 📊 設定コマンド
1. **HealthSpan Timer: 作業時間を設定**
   - 数値入力ボックスで作業時間を設定
   - 1～120分の範囲で入力可能

2. **HealthSpan Timer: 休憩時間を設定**
   - 数値入力ボックスで休憩時間を設定
   - 1～60分の範囲で入力可能

3. **HealthSpan Timer: 時間表示モードを変更**
   - クイックピックで3つのモードから選択
   - `⏱️ 常に表示` / `🔄 クリックで切り替え` / `🔕 表示しない`

4. **HealthSpan Timer: 警告方法を変更**
   - クイックピックで警告方法を選択
   - `🎨 色変更` / `💡 点滅` / `🎨💡 両方`

5. **HealthSpan Timer: 設定を開く**
   - VS Codeの設定パネルを開く（詳細な設定も可能）

## 🧪 テストモード

開発時に素早くテストできるクイックテストコマンドを用意しています：

- `HealthSpan Timer: 🧪 クイックテスト（10秒/3秒）`
  - 作業時間: 10秒
  - 休憩時間: 3秒
  - すべての機能を短時間でテストできます
  - テスト終了後は、手動で通常の時間設定に戻してください

## インストール方法
Ctrl+Shift+P → HealthSpan Timer: 🧪 クイックテスト（10秒/3秒）
### 開発モードで実行
1. このフォルダをVS Codeで開く
2. ターミナルで `npm install` を実行
3. `F5` キーを押してデバッグモードで起動

### ビルドしてインストール
`bash
npm install
npm run compile
`

## ⚠️ 初回セットアップ

初回起動時に以下を実行してください：
`bash
npm install
`

これにより、ネイティブOS通知機能に必要な依存関係がインストールされます。

## 技術スタック
- TypeScript
- VS Code Extension API
- Node.js

## ライセンス
MIT

## 作者
masakinihirota@gmail.com

---

**楽しいコーディングを！ 🍅 HealthSpan Timerで健康寿命を向上させましょう！**