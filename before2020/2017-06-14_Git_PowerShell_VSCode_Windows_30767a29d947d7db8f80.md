<!--
title:   VScode内のターミナル（Powershell）でコマンド補完（gitとか）(Windows用)
tags:    Git,PowerShell,VSCode,Windows,補完
id:      30767a29d947d7db8f80
private: false
-->
2023年1月27日追記
`Microsoft.PowerShell_profile.ps1`の設置場所が
ドキュメントの
`WindowsPowerShell`
から
`PowerShell`
に変更になりました。
`posh-git`なども再インストールする必要があります。

具体例
`C:\Users\[ユーザー名]\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
から
`C:\Users\[ユーザー名]\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`
に変更されました。

追記終了


---

VScodeのターミナルで補完が効かなかったので、どうすれば補完してくれるようになるかを調べた備忘録。

Windows10でのGitコマンドの補完

### 自分の環境
Windows10 64
PowerShell
バージョンを調べる
`$PSVersionTable`
> PSVersion 7.1.3

[Visual Studio Code - Code Editing. Redefined]
(https://code.visualstudio.com/)

# VSCodeでの補完

### posh-gitのインストール
[posh-git by dahlbyk]
(http://dahlbyk.github.io/posh-git/)

VSCodeのターミナルを開き下記のコマンドを入れます。
インストールコマンド
`Install-Module -Name posh-git -AllowPrerelease `
と
設定ファイル`Microsoft.PowerShell_profile.ps1`に書き込むコマンド
`"Import-Module posh-git" | Add-Content $PROFILE`

### posh-dockerのインストール
githubリポジトリ
[samneirinck/posh-docker: Powershell tab completion for Docker]
(https://github.com/samneirinck/posh-docker)

`Install-Module -Scope CurrentUser posh-docker`

確認
Powershellのターミナルから
`git c`
`タブキー`
これで
`git checkout`
と出れば補完が効いています。
更にタブキーを押せばその他の候補がタブキーを押すごとに表示されます。

例（タブキーを押すと候補が順に、シフトタブキーで逆順に表示される。）

```
git cherry
git cherry-pick
git citool
git clean
git clone
git commit
git config
git checkout ←ループ

```

※補完が効いていないようならVSCodeを再起動してみてください。

### posh-gitのアップデート

`Update-Module -Name posh-git -AllowPrerelease`


# さらに、VSCodeでエイリアスを使いたい場合は

VSCode上のpowershellの設定ファイルを書く。エイリアスを使う、Beep音を消すetc。 - Qiita
https://qiita.com/masakinihirota/items/6ea743af309b39b5ba9b


#### Q.
PowerShellにはどんなコマンド補完ツールがあるのか？
#### A.
posh-XXXというツールをインストールすればできるようになる。
gitなら
[posh-git](http://dahlbyk.github.io/posh-git/)、[posh-git(github.com)](https://github.com/dahlbyk/posh-git)

Dockerなら
[posh-docker(github.com)](https://github.com/samneirinck/posh-docker)


# 現在の設定（2021年5月12日現在）

```Microsoft.PowerShell_profile.ps1

# エイリアス
# If you want posh-git to detect your own aliases for git, then you must have set the alias before importing posh-git. So if you have Set-Alias g git then ensure it is executed before Import-Module posh-git, and g checkout will complete as if you'd typed git.
# エイリアスはImport-Module posh-gitの上の方に書いておくこと。
# 先に書いておくことでエイリアスでも補完が効くようになる。
# 長いコマンドを短くしたいだけならSet-Aliasを使う。
Set-Alias ll Get-ChildItem
Set-Alias lll Get-ChildItem

# git系
Set-Alias g git

# docker系
Set-Alias do docker

# function Get-Docker { & docker $args }
# New-Alias -Name do -Value Get-Docker -Force -Option AllScope



# unix系のgrepとは挙動が違う
Set-Alias grep Select-String

# 予測 IntelliSense を有効にする
Set-PSReadLineOption -PredictionSource History

Import-Module posh-git
Import-Module posh-docker
Import-Module PSReadLine

# パスとGitステータスを入れ替える
$GitPromptSettings.DefaultPromptWriteStatusFirst = $false

#  現在のディレクトリ以外のパスを~で省略する。
$GitPromptSettings.DefaultPromptAbbreviateHomeDirectory = $true

# 色 HTML Color Names
# https://www.w3schools.com/colors/colors_names.asp
# フルパスの色
# $GitPromptSettings.DefaultPromptPath.ForegroundColor = 'Orange'
# $GitPromptSettings.DefaultPromptPath.ForegroundColor = 0xFFA500
# $GitPromptSettings.DefaultPromptPath.ForegroundColor = 0x7FFFD4
# $GitPromptSettings.DefaultPromptPath.ForegroundColor = 0xB0E0E6
$GitPromptSettings.DefaultPromptPath.ForegroundColor = 0x9ACD32

# パス名とコマンド入力欄の間に改行を入れる。
# コマンド入力欄の前に現在の時刻を表示する。
$GitPromptSettings.DefaultPromptBeforeSuffix.Text = '`n$([DateTime]::now.ToString("MM-dd HH:mm:ss "))'

# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Black
$GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Blue
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Cyan
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkBlue
# mainの色と同じ
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkCyan
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkGray
$GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkGreen
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkMagenta
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkRed
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::DarkYellow
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Gray
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Green
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Magenta
# $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Red
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::White
# 無し $GitPromptSettings.DefaultPromptBeforeSuffix.ForegroundColor = [ConsoleColor]::Yellow

# ヒストリーをカウントし表示
# $GitPromptSettings.DefaultPromptSuffix = '$((Get-History -Count 1).id + 1)$(" >" * ($nestedPromptLevel + 1)) '

# プロンプトのパス部分を区切り文字で囲む
# $GitPromptSettings.BeforePath = '{'
# $GitPromptSettings.AfterPath = '}'
# $GitPromptSettings.BeforePath.ForegroundColor = 'yellow'
# $GitPromptSettings.AfterPath.ForegroundColor = 'yellow'

# PowerShellコマンドが失敗すると、!が表示されます。（成功するまで）
function global:PromptWriteErrorInfo() {
    if ($global:GitPromptValues.DollarQuestion) { return }

    if ($global:GitPromptValues.LastExitCode) {
        "`e[31m(" + $global:GitPromptValues.LastExitCode + ") `e[0m"
    }
    else {
        "`e[31m! `e[0m"
    }
}

$global:GitPromptSettings.DefaultPromptBeforeSuffix.Text = '`n$(PromptWriteErrorInfo)$([DateTime]::now.ToString("MM-dd HH:mm:ss"))'



# ベル音(Beep)を消す
Set-PSReadlineOption -BellStyle None


# 複数wordで空白を含むコマンドの場合fuctionを使う。
function s
{
    npm run start
}

function b
{
    npm run build
}

function d
{
    npm run dev
}

function t
{
    npm run test
}

function gd
{
    git diff --cached
}

function gcm($message)
{
    git commit -m $message
}

function gc
{
    git checkout $args
}


# ローカル専用
function GGG
{
    git checkout main | git merge - | git branch
}
# リポジトリがオンライン上にある場合。
# git push origin HEAD | git checkout main | git merge - | git push origin HEAD | git branch



# ブランチ名を書き換える
function brm
{
    git branch -m  $args | git branch
}

function ma
{
    git checkout main | git branch
}

function merge
{
    git merge $args  | git branch
}



# grep
function gg
{
    git grep $args
}

function gr
{
    git grep $args
}

function gre
{
    git grep $args
}

function st
{
    git status
}



# ブランチを新たに作成
function cb
{
     & git checkout -b $args | Get-GitBranch
}

function main
{


    git checkout main
}


# push
function pu
{
    git push origin
}

function gpu
{
    git push origin
}


# ブランチの削除後 ブランチのリスト表示
function DDD
{
	# mainを間違って削除しないようにする。
	if ($args -ne 'main') {
		git checkout main | git branch -D $args | Get-GitBranch
	}
}

# コマンド実行前にコミットしたかどうかを見る
# ブランチが消せない状態なら用済みブランチは消えない
# mainブランチに移動後main以外のブランチを削除
# その後ブランチを表示
function DDDDD
{
    git checkout main | git branch --merged `
  | Select-String -NotMatch -Pattern "(master|main)" `
  | %{ git branch -d $_.ToString().Trim() } | Get-GitBranch
}



# log表示
function Get-GitTree { & git log --graph --oneline --decorate  }
New-Alias -Name lo -Value Get-GitTree -Force -Option AllScope



# -s ショートフォーマットで表示
# -b ショートフォーマットでも分岐情報や追跡情報を表示します。
function Get-GitStatus { & git status -sb $args }
New-Alias -Name stb -Value Get-GitStatus -Force -Option AllScope



# 全部をaddするなら aa .
# -uのオプションもok
# git add -u (git add --update)
# バージョン管理されていて、変更があったすべてのファイルがaddされる
# バージョン管理されていないファイルはaddされない

function Get-GitAdd { & git add --all $args }
New-Alias -Name aa -Value Get-GitAdd -Force -Option AllScope


# 変更を見てからコミットメセージを編集＆コミット
function Get-GitCommit { & git add --all | git commit -ev $args }
New-Alias -Name cm -Value Get-GitCommit -Force -Option AllScope



# コミット
# コマンドがかぶる時ビルトインのコマンドを消去
##### remove-item alias:gc -force

# 変更を見てからコミットメセージを編集＆コミット
function Get-GitCommit { & git commit -ev $args }
New-Alias -Name gm -Value Get-GitCommit -Force -Option AllScope


# g co だと補完が効く
function Get-GitCheckout { & git checkout $args }
New-Alias -Name co -Value Get-GitCheckout -Force -Option AllScope

# ブランチ表示
function Get-GitBranch { & git branch $args }
New-Alias -Name br -Value Get-GitBranch -Force -Option AllScope



# function Get-GitPush { & git Push $args }
# New-Alias -Name gps -Value Get-GitPush -Force -Option AllScope

# function Get-GitPull { & git pull $args }
# New-Alias -Name gpl -Value Get-GitPull -Force -Option AllScope

# function Get-GitFetch { & git fetch $args }
# New-Alias -Name f -Value Get-GitFetch -Force -Option AllScope

# function Get-GitRemote { & git remote -v $args }
# New-Alias -Name r -Value Get-GitRemote -Force -Option AllScope


#######################################################
# 実験

# プロンプトの前後に文章を入れる
# function prompt {
#    # Your non-prompt logic here
#    $prompt = Write-Prompt "Text before posh-git prompt " -ForegroundColor ([ConsoleColor]::Green)
#    $prompt += & $GitPromptScriptBlock
#    $prompt += Write-Prompt "Text after posh-git prompt" -ForegroundColor ([ConsoleColor]::Magenta)
#    if ($prompt) { "$prompt " } else { " " }
# }



function touch($filename)
{
	New-Item ($filename)
}


# storybook
function sb
{
    yarn storybook
}


```