<!--
title:   VSCode上のpowershellの設定ファイルを書く。エイリアスを使う、Beep音を消すetc。
tags:    PowerShell,VSCode,エイリアス
id:      6ea743af309b39b5ba9b
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

# より詳細な設定の記事を書きました。
現在の設定（2021年5月12日現在）
VScode内のターミナル（Powershell）でコマンド補完（gitとか）(Windows用) - Qiita
https://qiita.com/masakinihirota/items/30767a29d947d7db8f80

Widndows10の設定ファイルの場所＆ファイル名
`C:\Users\{ユーザー名}\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

# 希望
VSCodeのpowershellでも.bashrcや、.zshrcのような設定ファイルのエイリアスを使いたい、git diffと毎回打つのは面倒だな・・・

# 結論
管理者権限で制限モードを解いて、powershellのプロファイルに記入します。

VSCode内のパワーシェルから
`Set-ExecutionPolicy Unrestricted -Scope CurrentUser`
と権限を設定します。

プロファイルを編集します。
`notepad $profile`

```Microsoft.PowerShell_profile.ps1
# 長いコマンドを短くしたいだけならSet-Aliasを使う。
Set-Alias ll Get-ChildItem
Set-Alias lll Get-ChildItem
Set-Alias g git

# 空白を含むコマンドの場合fuctionを使う。
function dev
{
    npm run dev
}

function gd
{
    git diff
}

function gg
{
    git grep $args
}

Set-Alias excel "C:\Program Files (x86)\Microsoft Office\Office10\Excel.exe"
```

コピペｏｋ
これ以下は解説です。

## 前提
VSCodeのshellはpowershellです。
これはすでに最新のバージョンにしてあります。

powershellのバージョン確認方法
powershellから`$PSVersionTable`を入力

```
D:\2017_12> $PSVersionTable

Name                           Value
----                           -----
PSVersion                      5.1.14409.1012
PSEdition                      Desktop
PSCompatibleVersions           {1.0, 2.0, 3.0, 4.0...}
BuildVersion                   10.0.14409.1012
CLRVersion                     4.0.30319.42000
WSManStackVersion              3.0
PSRemotingProtocolVersion      2.3
SerializationVersion           1.1.0.1

```

現在のバージョンは`PSVersion 5.1`です。


## 環境
Windows7 64bit
VSCode 1.19.1
powershell 5.1

# 実際のやり方

## 制限モードを解く
まず作成したプロファイルを実行するために管理者権限のシェルから以下のコマンドを実行し、制限モードを解きます。

VSCode内のパワーシェルから
`Set-ExecutionPolicy Unrestricted -Scope CurrentUser`

これを実行しないとセキュリティ上の問題でユーザー設定のプロファイルが実行されません。（※重要）

追記（2017年12月21日）
` -Scope CurrentUser`
とオプションを付ける事で権限の無制限化を使用ユーザーのみに限定します。

## プロファイルファイルを編集します。
`notepad $profile`

notepadアプリが立ち上げます。

＜参考＞
設定ファイル場所
`C:\Users\＜ユーザー名＞\Documents\WindowsPowerShell`

設定を書き込みます。

```Microsoft.PowerShell_profile.ps1
Set-Alias lll Get-ChildItem

```

| 説明       | コマンド |
|:-----------------|:------------------:|
| エイリアス設定コマンド |Set-Alias|
|ユーザーが設定したいエイリアス | lll |
|PowerShellのコマンド | Get-ChildItem |

設定を反映させるためVSCodeを再起動させます。（※重要）

## 画面出力結果

```
D:\2017_12> lll


    Directory: D:\2017_12


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2017/12/19      7:43                Jane
d-----       2017/12/20     12:32                webapp

```

このように表示されたら成功です。

# 空白を含むコマンドの場合は？

`Set-Alias gd git diff`
などと 空白スペースをあけて設定するとダメなようです。
`Set-Alias gd "git diff" `
と""で囲ってもエラーになります。

そこで、functionで設定します。

```Microsoft.PowerShell_profile.ps1
function gd
{
    git diff
}

```
設定を反映させるためVSCodeを再起動させます。（※重要）
コマンドが正常に動けば成功です。

git diffは「q」で抜け出せます。


# 引数を含むコマンドの場合は？

```Microsoft.PowerShell_profile.ps1
function gg
{
    git grep $args
}


```
$argsで複数の引数でも対応できます。

`gg ＜検索したい文字列＞ ＜フォルダ名＞`
のようにしてフォルダを絞ることもできます。

単語検索
gg -w ＜検索したい文字列＞

大文字小文字を無視して検索
gg -i ＜検索したい文字列＞


```Microsoft.PowerShell_profile.ps1
function gg
{
    git grep $args[0]
}

```
引数を1つだけにしたい時は、
$args[0]に変更して引数を1つだけ受け取らせます。



### おまけ1
エクセルを立ち上げる。

```Microsoft.PowerShell_profile.ps1

Set-Alias excel "C:\Program Files (x86)\Microsoft Office\Office10\Excel.exe"

```

### おまけ2

`get-alias `
PowerShellに組み込み済みのエイリアスのリストが表示されます。
Get-Alias のエイリアスは `gal`です。

### おまけ3
あれから＊年、現在の肥大化した姿（2020/12/15）

```Microsoft.PowerShell_profile.ps1
# PowerShellのショートカット
# VSCodeで使う場合は変更後VSCodeの再起動必須。

Import-Module 'C:\tools\poshgit\dahlbyk-posh-git-9bda399\src\posh-git.psd1'

if(-not $env:path.Split(';').Contains('.')){
    $env:path += ";."
}

# Chocolatey profile
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

function global:prompt {
    $origLASTEXITCODE = $LASTEXITCODE
    Write-VcsStatus

    # Replace $home by ~ if current path includes $home
    $curPath = $ExecutionContext.SessionState.Path.CurrentLocation.Path
    if ($curPath.ToLower().StartsWith($Home.ToLower()))
    {
        $curPath = "~" + $curPath.SubString($Home.Length)
    }

    # Limit path length up to maxPathLength
    $maxPathLength = 80
    if ($curPath.Length -gt $maxPathLength) {
        $curPath = '...' + $curPath.SubString($curPath.Length - $maxPathLength + 3)
    }

    Write-Host $curPath -ForegroundColor DarkGreen
    $global:LASTEXITCODE = $origLASTEXITCODE

    if ($?) {
        Write-Host " (*'-')"  -NoNewLine -ForegroundColor "DarkGreen"
    } else {
        Write-Host " (*;-;)"  -NoNewLine -ForegroundColor "Red"
    }
    return "> "
}

# エイリアス
# 長いコマンドを短くしたいだけならSet-Aliasを使う。
Set-Alias ll Get-ChildItem
Set-Alias lll Get-ChildItem

Set-Alias excel "C:\Program Files (x86)\Microsoft Office\Office10\Excel.exe"

# git系
Set-Alias g git

# unix系のgrepとは挙動が違う
Set-Alias grep Select-String



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
    git co main | git branch
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



# ブランチを新たに作成
function cb
{
   & git co -b $args | Get-GitBranch
}

function main
{
    git co main
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



function DDD
{
    git branch -D $args
}

# mainブランチに移動後main以外のブランチを削除
# その後ブランチを表示
function DDDDD
{
    git co main | git branch --merged `
  | Select-String -NotMatch -Pattern "(master|main)" `
  | %{ git branch -d $_.ToString().Trim() } | Get-GitBranch
}



# log表示
function Get-GitTree { & git log --graph --oneline --decorate  }
New-Alias -Name lo -Value Get-GitTree -Force -Option AllScope

# -s ショートフォーマットで表示
# -b ショートフォーマットでも分岐情報や追跡情報を表示します。
function Get-GitStatus { & git status -sb $args }
New-Alias -Name st -Value Get-GitStatus -Force -Option AllScope



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


```