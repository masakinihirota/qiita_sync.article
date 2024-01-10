<!--
title:   競技プログラミングで問題に集中するためのtools Windows10 WSL用  「code-runner」「atcoder-tools」
tags:    WSL,atcoder-tools,code-runner,online-judge-tools,競技プログラミング
id:      30a45cd250c0c99f8626
private: false
-->
# 競技プログラミングの便利なツール「atcoder-tools」
atcoder-toolsはサンプルコードの取得や課題の提出などを支援してくれるツールです。
しかしWindows10上からは利用できないそうです、そこでWSL(Windows Subsystem for Linux)上からこのツールを使います。
（WSLはVSCodeからでも簡単に利用できるようになりました。）

# 目的
ターミナルから
`abc コンテストid`とするとAtCoderABCのコンテスト6問（A～F問）が入力付きで取得できる。

ショートカット
ctrl+1 そのコンテストのプログラムを実行。
ctrl+2 そのコンテストのプログラムをテスト付きで実行＆確認。（≒テスト駆動開発）
ctrl+3 そのコンテストのプログラムをテストに通るならば提出。

※このように問題に集中できる環境を作ります。

# 環境
Windows10
WSL(Windows Subsystem for Linux)
VScode
zsh
c++11以降

### 作業ディレクトリ

Windows10から見ると
Dドライブ直下
`D:/2019/pg`

WSLから見ると
`/mnt/d/2019/pg`


### 便利なtool群
作成したプログラムのVSCodeエクステンション
code-runner
https://github.com/formulahendry/vscode-code-runner

VSCodeからWSLを使うためのVSCodeエクステンション
Remote - WSL
https://github.com/Microsoft/vscode-remote-release

AtCoderのコンテストを便利にするツール。
kyuridenamida/atcoder-tools: Convenient modules & tools for AtCoder users, written in Python 3.5
https://github.com/kyuridenamida/atcoder-tools
AtCoder Tools Documentation
https://kyuridenamida.github.io/atcoder-tools/#/

### WSLのC++環境
WSLインストール後
`sudo apt update`
`sudo apt upgrade`
`sudo apt install build-essential`
`sudo apt install gdb`

コンパイラのバージョン
`gcc --version`
デバッガのバージョン
`gdb --version`

VSCodeのインストール
VSCodeのエクステンションのインストール

- C/C++
- C++ Intellisense
- Code Runner
- CMake
- CMake Tools
- Bracket Pair Colorizer
- Settings Sync

# code-runner

### Code-RunnerをWSLで実行できるようにする
settings.jsonに追加

```settings.json
{
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\wsl.exe",
  "code-runner.runInTerminal": true,
  "code-runner.terminalRoot": "/mnt/",
  "code-runner.executorMap": {
    "cpp": "cd $dir && g++ -std=c++11 -Wall -pedantic \"$fileName\" -o \"$fileNameWithoutExt.out\" && $dir\"$fileNameWithoutExt.out\""
    // https://qiita.com/janus_wel/items/07140fcd1127b568087d
    // -std=c++11	対象ソースが C++11 準拠としてコンパイルする
    // -Wall	基本的な警告オプションを on にする
    // -pedantic ISO C/C++ に存在しない文法を警告する
  }
}

```

VSCodeのsettings.jsonに専用のコマンド
`"code-runner.terminalRoot": "/mnt/"`
を追加することでWSLにアクセスできるようになります。

# シェルをzshへ変更
zshを利用します。
ダウンロード
`sudo apt-get install zsh`

インストール
`sudo chsh -s $(which zsh)`

### 設定ファイル .zshrc

```.zshrc
export LANG=ja_JP.UTF-8

# HOMEのpath
export PATH=/mnt/d/2019/pg:$PATH
# シェルファイルの収納場所
export PATH=/mnt/d/2019/pg/sh:$PATH

plugins=(… zsh-completions)
autoload -U compinit && compinit

HISTFILE=~/.zsh_history
HISTSIZE=1000000
SAVEHIST=1000000
# ヒストリを共有
setopt share_history
# 直前と同じコマンドをヒストリに追加しない
setopt hist_ignore_dups
# ヒストリを呼び出してから実行する間に一旦編集
setopt hist_verify
# zsh の開始, 終了時刻をヒストリファイルに書き込む
setopt extended_history
# スペースで始まるコマンド行はヒストリリストから削除
setopt hist_ignore_space
# 余分な空白は詰めて記録
setopt hist_reduce_blanks
# historyコマンドは履歴に登録しない
setopt hist_no_store
# 補完時にヒストリを自動的に展開
setopt hist_expand

# 補完
# 補完機能を有効にする
autoload -Uz compinit
compinit

# VCSの情報を取得するzsh関数
autoload -Uz vcs_info
autoload -Uz colors
colors
# black red green yellow blue magenta cyan white

# PROMPT変数内で変数参照
setopt prompt_subst

# gitの色
# 通常
zstyle ':vcs_info:*' formats "%F{green}%c%u(%b)%f"
# formats 設定項目で %c,%u が使用可
zstyle ':vcs_info:git:*' check-for-changes true
# commit されていないファイルがある
zstyle ':vcs_info:git:*' stagedstr "%F{magenta}!"
# add されていないファイルがある
zstyle ':vcs_info:git:*' unstagedstr "%F{blue}+"
# rebase 途中,merge コンフリクト等 formats 外の表示
zstyle ':vcs_info:*' actionformats '[%b|%a]'

# %b ブランチ情報
# %a アクション名(mergeなど)
# %c changes
# %u uncommit

# プロンプト表示直前に vcs_info 呼び出し
precmd () { vcs_info }

# プロンプト（左）
# 2行表示
PROMPT="%{${fg[green]}%}[%n] %~%{${reset_color}%}
%# "

# プロンプト（右）
RPROMPT='${vcs_info_msg_0_} %{${fg[green]}%}%}%T%{${reset_color}%} '

zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
zstyle ':completion:*' ignore-parents parent pwd ..
zstyle ':completion:*:sudo:*' command-path /usr/local/sbin /usr/local/bin /usr/sbin /usr/bin /sbin /bin /usr/X11R6/bin

## 出力の文字列末尾に改行コードが無い場合でも表示
# unsetopt promptcr

## コアダンプサイズを制限
limit coredumpsize 102400

## 補完候補一覧でファイルの種別をマーク表示
setopt list_types

## 補完候補を一覧表示
setopt auto_list

## ファイル名で #, ~, ^ の 3 文字を正規表現として扱う
setopt extended_glob

## TAB で順に補完候補を切り替える
setopt auto_menu

## =command を command のパス名に展開する
setopt equals

## --prefix=/usr などの = 以降も補完
setopt magic_equal_subst

# ファイル名の展開で辞書順ではなく数値的にソート
setopt numeric_glob_sort

## 出力時8ビットを通す
setopt print_eight_bit

## 補完候補のカーソル選択を有効に
zstyle ':completion:*:default' menu select=1

## 補完候補の色づけ
zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}

## ディレクトリ名だけで cd
setopt auto_cd

## cd 時に自動で push
setopt autopushd

## 同じディレクトリを pushd しない
setopt pushd_ignore_dups

## カッコの対応などを自動的に補完
setopt auto_param_keys

## ディレクトリ名の補完で末尾の / を自動的に付加し、
# 次の補完に備える
setopt auto_param_slash

## スペルチェック
setopt correct

# cd -<TAB>で移動
# スタックの上限
DIRSTACKSIZE=100
setopt auto_pushd

# エイリアス
alias abc='atcodertools_gen.sh'
alias sub='atcodertools_submit.sh'
alias tes='atcodertools_test.sh'

```

設定を反映させます。
`source ~/.zshrc`


エイリアスはコマンドを短く出来ます。
例
`abc 137`


# atcoder-tools
入力を自動生成
kyuridenamida/atcoder-tools: Convenient modules & tools for AtCoder users, written in Python 3.5
https://github.com/kyuridenamida/atcoder-tools

インストール
`sudo pip3 install atcoder-tools`

chromeの拡張機能
Tampermonkey
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
スクリプト
https://kyuridenamida.github.io/atcoder-tools/index.user.js
このスクリプトをインストール済みであると、at-coderの問題ページに行くと解析されたスニペットが埋め込まれています。
例
ABC120のD問題
https://atcoder.jp/contests/abc120/tasks/abc120_d
を訪れるだけでいい。
（対応言語 C++ Java Rust	Python3）

### HOMEのアクセスしづらい問題
WSLのHOMEはCドライブの奥深いところにあるので
普段使用していたり、アクセスしやすい場所に変更します。

```
ホームの変更
sudo vim /etc/passwd

例
/home/ユーザ名
を
/mnt/d/普段使用している場所
に変更する。
/d/はドライブ名
```


`pwd`コマンドでHOMEが変更されたかどうか確認します。

## atcoder-tools使用方法

`atcoder-tools gen コンテストid`

例1
atcoderのABCコンテスト137回
基本形
`sudo atcoder-tools gen ABC137`

例2
configファイルを利用した例
`sudo atcoder-tools gen ABC137 --config /mnt/d/2019/pg/atcodertools.toml`

### atcodertoolsの設定ファイル
`atcodertools.toml`

###### tomlとは
設定ファイル記述言語 TOML - Qiita
https://qiita.com/b4b4r07/items/77c327742fc2256d6cbe
GitHub の中の人が提案した、設定ファイルを記述するための小さな言語です。

### 自動生成機能がついたテンプレートファイル
`my_template.cpp`

※優先順位
コマンドライン＞設定ファイル内

`atcoder-tools gen ABC136 --workspace /mnt/d/2019/pg/ABC/131-140 --config /mnt/d/2019/pg/atcodertools.toml`

workspace_dirをこのようにコマンドライン上で追加した場合設定ファイル内の設定よりも優先されて使用されます。

```atcodertools.toml
[codestyle]
indent_type = 'space'
indent_width = 4
workspace_dir = '/mnt/d/2019/pg/ABC/'
lang = 'cpp'
template_file='/mnt/d/2019/pg/my_template.cpp'
[etc]
download_without_login=false
parallel_download=false
save_no_session_cache=false

```
※わかりやすい設定だけ利用しました。

```
[postprocess]
exec_on_each_problem_dir='clang-format -i ./*.cpp'
exec_on_contest_dir='touch CMakeLists.txt'
```
※この設定とかよくわかりません。

### atcodertoolsの基本テンプレートファイル

```my_template.cpp
# include <bits/stdc++.h>
using namespace std;

// 総数を1000000007（素数）で割った余り
const long long mod = 1e9 + 7;

using ll = long long;
using pii  = pair<int, int>;
using pll = pair<ll, ll>;
# define ull unsigned long long
# define ld long double
# define vi vector<int>
# define vll vector<ll>
# define vc vector<char>
# define vs vector<string>
# define vpii vector<pii>
# define vpll vector<pll>

# define rep(i, n) for (int i = 0, i##_len = (n); i < i##_len; i++)
# define rep1(i, n) for (int i = 1, i##_len = (n); i <= i##_len; i++)
# define repr(i, n) for (int i = ((int)(n)-1); i >= 0; i--)
# define rep1r(i, n) for (int i = ((int)(n)); i >= 1; i--)

# define sz(x) ((int)(x).size())
# define all(x) (x).begin(), (x).end()
# define rall(x) (x).rbegin(), (x).rend()

# define SORT(v, n) sort(v, v + n);
# define VSORT(v) sort(v.begin(), v.end());
# define RSORT(x) sort(rall(x));
# define pb push_back
# define mp make_pair

# define INF (1e9)
# define PI (acos(-1))
# define EPS (1e-7)

ull gcd(ull a, ull b) { return b ? gcd(b, a % b) : a; }
ull lcm(ull a, ull b) { return a / gcd(a, b) * b; }

{% if mod %}
const long long MOD = {{ mod }};
{% endif %}
{% if yes_str %}
const string YES = "{{ yes_str }}";
{% endif %}
{% if no_str %}
const string NO = "{{ no_str }}";
{% endif %}

{% if prediction_success %}
void func({{ formal_arguments }}){

}
{% endif %}

int main(){
    // cout << fixed << setprecision(5);

    {% if prediction_success %}
    {{input_part}}
    func({{ actual_arguments }});
    {% else %}
    // Failed to predict input format
    {% endif %}
    return 0;
}

```




### Code-Runnerでatcoder-toolsをカスタム実行出来るようにする
先程のsettings.jsonにcustomCommand等を追加する。

```settings.json
{
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\wsl.exe",
  "code-runner.runInTerminal": true,
  "code-runner.saveAllFilesBeforeRun": true,
  "code-runner.saveFileBeforeRun": true,
  "code-runner.showRunCommandInEditorContextMenu": false,
  "code-runner.showRunCommandInExplorerContextMenu": false,
  "code-runner.terminalRoot": "/mnt/",
  "code-runner.customCommand": "cd $dir && g++ -std=c++11 -Wall -pedantic \"$fileName\" -o \"$fileNameWithoutExt.out\" && atcoder-tools test --exec ./$fileNameWithoutExt.out",
  "code-runner.executorMap": {
    "cpp": "cd $dir && g++ -std=c++11 -Wall -pedantic \"$fileName\" -o \"$fileNameWithoutExt.out\" && $dir\"$fileNameWithoutExt.out\"",
    // https://qiita.com/janus_wel/items/07140fcd1127b568087d
    // -std=c++11	対象ソースが C++11 準拠としてコンパイルする
    // -Wall	基本的な警告オプションを on にする
    // -pedantic ISO C/C++ に存在しない文法を警告する
  },
}

```

※必要な行を使用してください。

現在のショートカットの設定では下記のように割り当てています。
Run Codeに ctrl+1 （cppの実行ファイルを実行する。）
Run Custom Commandに ctrl+2 （atcoder-tools testを実行する。）


### シェルファイルを作る
シェルファイルの収納場所
/mnt/d/2019/pg/sh

ディレクトリを作り、テストデータなどをダウンロード

```atcodertools_gen.sh
number=$1
atcoder-tools gen ABC${number} --config /mnt/d/2019/pg/atcodertools.toml
```

ダウンロードしたテストデータでの実行。

```atcodertools_test.sh
execfile=$1
atcoder-tools test --exec ./${execfile}.out

```
プログラム提出用シェル

```atcodertools_submit.sh
execfile=$1
atcoder-tools submit -u --code ./main${execfile}.cpp --exec ./main${execfile}.out
# --unlock-safety, -u   By default, this script only submits the first code per problem. However, you can remove the safety by this option in order to submit codes twice or more.
# 2回以上提出する場合は -uオプションを付けてください。


```

※ソースファイルと実行ファイルを指定する必要があります、でないとデフォルトの名前が使用されてしまいます。
片方を指定すれば自動的にそのファイル名を利用してくれません。


/mnt/d/2019/pg/ABC/
このpathはABCコンテストのソース等を入れるディレクトリpath

### シェルの実行
abc [コンテスト開催番号]

例 atcoder ABCコンテスト135回の場合
`abc 135`

※取得できない場合1.5秒間隔で繰り返ししてくれるので、コンテスト開催時間の直前に実行しておくと便利です。

# VSCodeのショートカットに端末のコマンドを設定

端末にエイリアスを設定してあるので、それを呼び出します。
エイリアス
alias sub='atcodertools_submit.sh'
をショートカットで呼び出します。

例 ショートカットctrl+3

```keybindings.jsonに追記
{
  "key": "ctrl+3",
  "command": "workbench.action.terminal.sendSequence",
  "args": {
    "text": "sub \n"
  }
},
```

※参考
VSCodeのショートカットに端末で実行するコマンドを設定する。 - Qiita
https://qiita.com/masakinihirota/items/396e0398472833f25895
※WSLでは"text": で変換される変数のpathがエスケープシーケンスとなってしまいcdコマンド等が効きません。
ですのでCode Runnerで実行ファイルのあるディレクトリに移動してからこのショートカットを使用します。

# コンパイルエラー（既知の問題）
提出時の画面に表示されるコンパイルエラー

```
./Main.cpp:66:22: warning: ignoring return value of ‘int scanf(const char*, ...)’, declared with attribute warn_unused_result [-Wunused-result]
     scanf("%lld", &M);
                      ^
```

※エラーではなく警告です

atcoder-toolsで取得した自動入力付きのソースファイルで提出するとコンパイルエラーが表示されます。
これは`scan`が返り値を見ていないと怒られています。
実務では見過ごせないコンパイルエラーですが、競技プログラミングでは特に気にする必要はありません。
気になる人は`scan`の部分を`cin>>`に変更しましょう。

### その他

`atcoder-tools test`
 カレント・ディレクトリ上に実行ファイルと入出力(in_*.txt, out_*.txt)がある状態で実行するとローカルテストを行います。

`atcoder-tools submit`
 カレント・ディレクトリ上で実行すると対応する問題がサンプルに通る場合ソースコードを提出します。既にAtCoder上にその問題に対する提出がある場合、-uを指定しないと提出できないようになっています。

デフォルトのconfigの場所
C:\Users\ユーザー名\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\usr\local\lib\python3.6\dist-packages\atcodertools\tools
atcodertools-default.toml

この設定ファイルはworkspace_dir等を設定できます。

デフォルトのtemplateの場所
C:\Users\ユーザー名\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\usr\local\lib\python3.6\dist-packages\atcodertools\tools\templates

atcodertools-default.toml
default_template.cpp
これら設定ファイルを最初はHOMEにコピーを置いて微調整していきます。
コピーする時、自分用のファイルだとわかるように適当に名前を変えておきます。
default_template.cpp ＝＞ my_template.cpp


# 参考URL&この後やること
C#+VS Code でAtCoder やってみる(準備編) - Qiita
https://qiita.com/wishangel@github/items/c79356357c8d20323d5d

競技プログラミングのための補助ツールを作った - うさぎ小屋
https://kimiyuki.net/blog/2017/01/19/pr-online-judge-tools/

kmyk/online-judge-tools: Tools for online judge services. Downloading sample cases, Testing/Submitting your code, and various utilities.
https://github.com/kmyk/online-judge-tools

AtCoderのサンプルケースを自動でテストさせてみる(Win10&C++) - Qiita
https://qiita.com/dasiita08/items/4364a7a7adc700876e03

kyuridenamida/atcoder-tools: Convenient modules & tools for AtCoder users, written in Python 3.5
https://github.com/kyuridenamida/atcoder-tools

online-judge-tools · PyPI
https://pypi.org/project/online-judge-tools/