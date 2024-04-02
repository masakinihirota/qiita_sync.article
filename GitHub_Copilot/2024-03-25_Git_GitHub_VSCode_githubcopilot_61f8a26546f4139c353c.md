<!--
title:   第三のGitHub Copilot CLIの使い方
tags:    Git,GitHub,VSCode,githubcopilot
id:      61f8a26546f4139c353c
private: false
-->
![VNS画面GitHubCopilot文字付き.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/74ce79e7-8fba-bc76-cbe6-a9e89ea15925.png)

※左サイドバー（左:第一）、エディター（右上:第ニ）部分でGitHub Copilotを使えていました、ついにターミナル部分(右下:第三)でもGitHub Copilotが使えるようになりました。

第三のGitHub Copilotは GitHub CLIの拡張機能という立ち位置です。

----------------------------------------

# 用語

- `git`: 分散型バージョン管理システムで、コード履歴を追跡できます。

- `GitHub`: gitリポジトリをホストするWebベースのプラットフォームで、コードの共有などが出来ます。

- `GitHub CLI`: コマンドラインからGitHubの機能にアクセスするためのツールです。

- `GitHub Copilot`: AI駆動のコード補完ツールで、コードを書く際の提案を提供します。(第一)

- `GitHub Copilot Chat`: GitHub Copilotの機能をテキストベースのチャット形式で利用できる機能です。(第ニ)

- `GitHub Copilot CLI`: 今回説明するツールです。(第三)

----------------------------------------

# 使い方

ターミナルで基本のコマンドを実行します。
提案のコマンド
説明のコマンド
の2種類があります。


## 基本のコマンド

`gh copilot suggest`
`gh copilot explain`

* 基本のコマンドを実行し対話を進める方法
* 基本のコマンドの後ろにダブルクォーテーションで提案や説明を囲んで尋ねたい文言をつけて実行する方法。
の2種類があります。

※CLI で Copilot を使用するには、
GitHub CLI がインストールされている必要があります。

※GitHub Copilotをサブスクライブ(＝購入)しておく必要があります。

# 基本使用例

対話方式で実際に実行してみます。

```terminal
> gh copilot suggest

Welcome to GitHub Copilot in the CLI!
version 1.0.1 (2024-03-22)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve. For more information, see https://gh.io/gh-copilot-transparency

? What kind of command can I help you with?  [Use arrows to move, type to filter]
> generic shell command
  gh command
  git command

```

ターミナル上で `gh copilot suggest` と聞くと、↑上記のように選択肢が現れます。

* generic shell command
一般的なシェルコマンドに関して
* gh command
 github cli コマンドに関して
* git command
 git コマンド に関して

のどれかを選択します。

今回は gitコマンドでブランチを作る方法を日本語で聞いてみます。
`git command` を選択し、 ↓ **ブランチを作る方法** と日本語で入力してみました。

```
? What kind of command can I help you with?
> git command


? What would you like the git command to do?
> ブランチを作る方法

Suggestion:

  git branch <branch-name>

? Select an option  [Use arrows to move, type to filter]
> Copy command to clipboard
  Explain command
  Execute command
  Revise command
  Rate response
  Exit

```


そうすると

```terminal
Suggestion:

  git branch <branch-name>

```

↑提案で
`git branch <branch-name>`のコマンドを提案してくました。

その後

```terminal
  Explain command
  Execute command
  Revise command
  Rate response
  Exit

```

↑これらのうちどれかを選びます。

* Explain command
コマンドの説明をしてくれます。
* Execute command
コマンドの実行（実際は実行されずに、クリップボードにコピーされます。）
* Revise command
自分の意に沿わなかった場合、コマンドの修正、再提案をお願いします。
* Rate response
報告します。
* Exit
対話を終わります。

以上が基本的な使い方です。

※詳しくは記事の続きをご覧ください。



## CLI での GitHub Copilot の使用例

## タスクを実行するための適切なコマンドを見つける

CLI の Copilot がより適切な提案します。

探しているコマンドのタイプ (汎用コマンド git または gh 他) を指定できます。

結果が期待したものと異なる場合は、返されたコマンドが期待どおりになるまで質問を修正し続けることができます。


### タスクに最適なコマンドを生成したら

クリップボードにコピーして必要な場所で実行します。

CLI で GitHub Copilot にコマンドの実行を依頼したりできます。



## 馴染みのないコマンドについて説明する

質問されたコマンドの説明に役立ちます。

CLI で GitHub Copilot で説明を生成すると、コマンドの理解が深まり、学習が強化され、生産性が向上し、コンテキストの切り替えが減少する可能性があります。

生成された説明は必ずしも正確または完全であるとは限らないため、出力を確認し、場合によっては修正する必要があることに注意することが重要です。コマンド ラインで実行するコマンドの正確性と適切性を確保することは、お客様の責任となります。



Using GitHub Copilot in the CLI - GitHub Docs
https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli

----------------------------------------
----------------------------------------
----------------------------------------

以下、公式マニュアルの翻訳とその解説

GitHub Copilot CLI の主な仕事２つで
ターミナル上から

* コマンドの提案
* 特定コマンドの説明

です。




----------------------------------------

# 前提

GitHub CLI の基礎を抑えている

GitHub Copilotに課金済み

VSCodeを使用中

CLI（ターミナル） で 使用するには、GitHub Copilot を有効にした後、CLI 拡張機能に GitHub Copilot をインストールする必要があります。

※詳細は **インストール** を御覧ください。






----------------------------------------

# ログイン

gh auth login

# インストール

gh extension install github/gh-copilot

# アップデート

gh extension upgrade gh-copilot

# GitHub Copilot CLI は GitHub CLIの拡張機能

**GitHub CLI の拡張機能という立ち位置です。**
なので使用方法は、GitHub CLI を使用するコマンドの
**gh**
を通して使用します。



# 使用方法

gh copilot SUBCOMMAND

# CLI で Copilot にコマンドの説明を求める

次のコマンドを実行すると、CLI で Copilot にコマンドの説明を依頼できます。

gh copilot explain
を実行後、プロンプトが表示されるので
sudo apt-get
と聞きたいコマンドを入力します。

<details><summary>出力結果 英語</summary>

```terminal
I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve. For more information, see https://gh.io/gh-copilot-transparency

? Which command would you like to explain?
> sudo apt-get

Explanation:

  • sudo is used to run a command with elevated rights, typically as the superuser (root).
  • apt-get is the command-line package management tool for Debian-based systems.
    • install is a sub-command used to install packages.
  • Note: Since the user did not provide any specific package name, the command itself does
  not perform any action and will prompt for additional input or display a help message.

```

英語だと詳細な説明をしてくれます。

</details>



説明したいコマンドをプロンプトに直接追加することもできます。

gh copilot explain "sudo apt-get"



<details><summary>出力結果 日本語</summary>

```terminal
> gh copilot explain "sudo apt-getについて日本語で解説してください。"

Welcome to GitHub Copilot in the CLI!
version 1.0.1 (2024-03-22)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve. For more information, see https://gh.io/gh-copilot-transparency
Explanation:

  •
  sudoは、特権のあるユーザーとしてコマンドを実行するために使用されます。
  • apt-
  getは、Ubuntuパッケージマネージャーです。
    •


installは、パッケージのインストールを指定します。
    •

typescriptは、インストールするパッケージ名です。

```

あまり良い説明になっていません。

</details>

# ヘルプ

gh copilot --help
gh copilot SUBCOMMAND --help



```terminal
> gh copilot --help
Your AI command line copilot.

Usage:
  copilot [command]

Examples:

$ gh copilot suggest "Install git"
$ gh copilot explain "traceroute github.com"


Available Commands:
  alias       Generate shell-specific aliases for convenience
  config      Configure options
  explain     Explain a command
  suggest     Suggest a command

Flags:
  -h, --help      help for copilot
  -v, --version   version for copilot

Use "copilot [command] --help" for more information about a command.

```


# CLI で Copilot にコマンドの提案を依頼する

次のコマンドを実行すると、CLI で Copilot にコマンドを提案するように依頼できます。

gh copilot suggest


これにより、必要なコマンドを取得するための対話型エクスペリエンスが開始されます。CLI の Copilot は、完了しようとしているタスクの実行に役立つコマンドを提案することを目的としています。CLI の Copilot がより適切な提案を提供できるようにするために、探しているコマンドのタイプ (汎用gitまたはgh) を指定できます。



必要なコマンドがすでにわかっている場合は、それをプロンプトに含めることもできます。

たとえば、Git をインストールする場合は、CLI で Copilot にコマンドを提案するように依頼できます。

gh copilot suggest "Install git"

結果が期待したものと異なる場合は、返されたコマンドが期待どおりになるまで質問を修正し続けることができます。これを行うには、[改訂] コマンドオプションを選択します。

タスクに最適なコマンドを生成したら、[クリップボードにコピー]オプションを選択することで、それをクリップボードに簡単にコピーして、必要な場所で実行できます。または、コマンドを実行することもできます。



## 使用例

自分の機器に git をインストールしたいとします。

```terminal
> gh copilot suggest "Install git"

Welcome to GitHub Copilot in the CLI!
version 1.0.1 (2024-03-22)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve. For more information, see https://gh.io/gh-copilot-transparency

? What kind of command can I help you with?
> generic shell command

Suggestion:

  sudo apt-get install git

? Select an option  [Use arrows to move, type
to filter]
> Copy command to clipboard
  Explain command
  Execute command
  Revise command
  Rate response
  Exit

```

選択肢の意味は以下の通りです：

- "Copy command to clipboard"：現在のコマンドをクリップボードにコピーします。

- "Explain command"：現在のコマンドの機能や動作を説明します。

- "Execute command"：現在のコマンドを実行します。これにより、コマンドの結果を直接確認できます。

- "Revise command"：現在のコマンドを修正または改善をおねがいします。

- "Rate response"：現在のレスポンス（コマンドの実行結果や説明など）の品質を評価します。これは、ツールの改善に役立てるためのフィードバックです。

- "Exit"：現在の操作を終了します。

↑上の提案はLinux用なので、Windowsと聞いてみます。

```terminal
? How should this be revised?
> windows

Suggestion:

  choco install git -y

? Select an option  [Use arrows to move, type
to filter]
> Copy command to clipboard
  Explain command
  Execute command
  Revise command
  Rate response
  Exit

```

choco install git -y がわからいので聞いてみます。

```terminal
? Select an option
> Explain command

Explanation:

  • choco install git is a command to install
  Git using Chocolatey package manager.
    • git is the package name to be
    installed.
  • -y is a flag that automatically answers
  "yes" to any prompts during the installation  process.

? Select an option  [Use arrows to move, type
to filter]
> Copy command to clipboard
  Explain command
  Execute command
  Revise command
  Rate response
  Exit

```

# コマンドの実行

Execute command
を選択すると、
Copilot CLIはコマンドをクリップボードにコピーし、対話型セッションを自動的に終了します。

その後、自分でコマンドを貼り付けて実行します。



# Copilotのエイリアス設定

gh copilot alias

を使用すると、CLIでCopilotのエイリアスを作成できます。
エイリアスはCLIでCopilotを使用するために必須ではありませんが、キー入力が少なくて済みます。

※エイリアスとは、ショートカットコマンドです。

gh copilot alias

↑このコマンドを実行して、自分が使用している↓Shellを選択します。

```terminal
> gh copilot alias

? Which shell to generate aliases for?  [Use arrows to move, type to filter]
> Bash
  PowerShell
  Zsh

```

例えば、PowerShellを選ぶと、

<details><summary>PowerShell用エイリアスコードの出力結果</summary>

```terminal
>  gh copilot alias

? Which shell to generate aliases for?
> PowerShell
function ghcs {
        # Debug support provided by common PowerShell function parameters, which is natively aliased as -d or -db
        # https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_commonparameters?view=powershell-7.4#-debug
        param(
                [ValidateSet('gh', 'git', 'shell')]
                [Alias('t')]
                [String]$Target = 'shell',

                [Parameter(Position=0, ValueFromRemainingArguments)]
                [string]$Prompt
        )
        begin {
                # Create temporary file to store potential command user wants to execute when exiting
                $executeCommandFile = New-TemporaryFile

                # Store original value of GH_DEBUG environment variable
                $envGhDebug = $Env:GH_DEBUG
        }
        process {
                if ($PSBoundParameters['Debug']) {
                        $Env:GH_DEBUG = 'api'
                }

                gh copilot suggest -t $Target -s "$executeCommandFile" $Prompt
        }
        end {
                # Execute command contained within temporary file if it is not empty
                if ($executeCommandFile.Length -gt 0) {
                        # Extract command to execute from temporary file
                        $executeCommand = (Get-Content -Path $executeCommandFile -Raw).Trim()

                        # Insert command into PowerShell up/down arrow key history
                        [Microsoft.PowerShell.PSConsoleReadLine]::AddToHistory($executeCommand)

                        # Insert command into PowerShell history
                        $now = Get-Date
                        $executeCommandHistoryItem = [PSCustomObject]@{
                                CommandLine = $executeCommand
                                ExecutionStatus = [Management.Automation.Runspaces.PipelineState]::NotStarted
                                StartExecutionTime = $now
                                EndExecutionTime = $now.AddSeconds(1)
                        }
                        Add-History -InputObject $executeCommandHistoryItem

                        # Execute command
                        Write-Host "`n"
                        Invoke-Expression $executeCommand
                # Clean up temporary file used to store potential command user wants to execute when exiting
                Remove-Item -Path $executeCommandFile
                                                                                ants to execute when exiting
                # Restore GH_DEBUG environment variable to its original value
                $Env:GH_DEBUG = $envGhDebug
        }
}

function ghce {
        # Debug support provided by common PowerShell function parameters, which is natively aliased as -d or -db
        # https://learn.microsoft.com/en-us/powershell/module/microsoft.powershe is natively aliased as -d or -dbll.core/about/about_commonparameters?view=powershell-7.4#-debug                 ll.core/about/about_commonparameters?view=powershell-7.4#-debug
        param(
                [Parameter(Position=0, ValueFromRemainingArguments)]
                [string[]]$Prompt
        )
        begin {
                # Store original value of GH_DEBUG environment variable
                $envGhDebug = $Env:GH_DEBUG
        }
        process {
                if ($PSBoundParameters['Debug']) {
                        $Env:GH_DEBUG = 'api'
                }

                gh copilot explain $Prompt
        }
        clean {
                # Restore GH_DEBUG environment variable to its original value
                $Env:GH_DEBUG = $envGhDebug
        }
}

```
</details>

と出力されるので、 **自分のシェルの設定ファイルに貼り付けてください。**



## デフォルトのエイリアス名

提供されているエイリアス作成コマンドを使用して、
gh copilot suggest
gh copilot explain
↑これらのコマンドのエイリアスを作成できます。

提供されているエイリアスは ghcs と ghce です。

ghcs と ghce を使用するには、シェルの設定ファイルにエイリアスの設定を追加する必要があります。

### エイリアスの頭文字
ghcs
gh copilot suggest

ghce
gh copilot explain
※頭文字を取ったエイリアス、ユーザーが独自に設定できます。

## エイリアス名の変更

```terminal
function ghcs { ＜＜エイリアス名
・・・

function ghce { ＜＜エイリアス名
・・・

```

自分のシェルの設定ファイルに、この行のghcs、ghce部分を変更すればエイリアス名を独自に設定できます。



## エイリアスの実行

ghcsエイリアスを使用して［Execute command］を選択すると、CLIのCopilotはコマンドを実行する前に確認を要求されます。
確認プロンプトのデフォルトは「No」ですが、これは `gh copilot config` オプションで設定を変更できます。

確認するとコマンドが実行され、シェルの履歴に記録されます。

以下の例では、Bash、PowerShell、および Zsh の設定ファイルにエイリアス設定を追加する方法です。

<details><summary>各シェルの設定例</summary>

それぞれ設定ファイルに追記します。

## Bash

```Bash configuration file
echo 'eval "$(gh copilot alias -- bash)"' >> ~/.bashrc

```

## PowerShell

```PowerShell profile
$GH_COPILOT_PROFILE = Join-Path -Path $(Split-Path -Path $PROFILE -Parent) -ChildPath "gh-copilot.ps1"
gh copilot alias -- pwsh | Out-File ( New-Item -Path $GH_COPILOT_PROFILE -Force )
echo ". $GH_COPILOT_PROFILE" >> $PROFILE

```

## Zsh

```Zsh configuration file
echo 'eval "$(gh copilot alias -- zsh)"' >> ~/.zshrc

```

エイリアスを設定したら、次を実行できます。

ghcs 'print "Hello world!"'

</details>


# 通常のコマンド
gh copilot suggest 'print "Hello world!"'

# ghcsエイリアス使用
ghcs 'print "Hello world!"'

※入力が短くなりました。



# gh copilot suggest の実行例

<details><summary>実行例</summary>

↓ Shell上で実行したいコマンド
print "Hello world!"

これを ↓ gh copilot suggest で聞いてみます、

gh copilot suggest 'print "Hello world!"'

```terminal
> gh copilot suggest 'print "Hello world!"'

Welcome to GitHub Copilot in the CLI!
version 1.0.1 (2024-03-22)

I'm powered by AI, so surprises and mistakes are possible. Make sure to verify any generated code or suggestions, and share feedback so that we can learn and improve. For more information, see https://gh.io/gh-copilot-transparency

? What kind of command can I help you with?
> git command

Suggestion:

  echo "Hello world!"

? Select an option
> Revise command

? How should this be revised?
> powershell

Suggestion:

  Write-Output "Hello world!"

? Select an option
> Execute command

Without using the `ghcs` alias or `-s,--shell-out` flag, the suggested command will be copied to your clipboard for you to paste and execute.

Command copied to clipboard!

```

↑修正案にPowershellを入力しました。

Bash,zshだと
`echo "Hello world!"`
になりますが、

Powershellの場合は
`Write-Output "Hello world!"`
だというのがわかりました。

※しかし、実際はPowershellで **echo "Hello world!"** のコマンドを動かしても正常に動きます。
人間が判断すれば、どちらでも実行可能であることがわかります。
`Write-Output` はPowershell専用のコマンドです。

↓クリップボードにコピーされたコマンド
Write-Output "Hello world!"

Execute commandを選ぶと、
クリップボードにコピーされるので、ターミナルに貼り付けて実行します。

</details>



----------------------------------------
----------------------------------------
----------------------------------------

# 第三のGitHub Copilot CLIとは？

VSCodeには基本三つの場所があります。

ファイラー、メニュー等のサイドバー部分
エディター本体部分
ターミナル、CLIの実行部分

これまでは、
ファイラーとエディター部分でGitHub Copilotを利用できていましたが、
今回、第三番目のターミナルでもCLI上で使用できるようになりました。

GitHub Copilot
GitHub Copilot Chat
GitHub Copilot CLI <new

形としてはGitHub CLIの拡張機能という位置づけです。

なので  GitHub CLI の **gh** コマンドで実行します。

取り扱えるコマンドは、
git
gh
一般的なコマンドshell
の3種類になります。


----------------------------------------

自分の認識
VSCodeで使う場合、

第一弾
GitHub Copilot
VSCodeの左サイドバーを開いて使う

	チャットウィンドウが開くようになりました。
	(ツールからは廃止されました。)

第二弾
GitHub Copilot Chat
VSCodeのエディタ画面上から使う

	エディタ上から 直接入力になりました。
	(アイコンからは廃止されました。)

第三弾
GitHub Copilot CLI
VSCodeのターミナルから使う

	2024年3月頃から使えるようになりました。



----------------------------------------
----------------------------------------
----------------------------------------






CLIで使うコマンドの提案やその解説が主な使用方法になります。



前提として
GitHub CLI があって、
gh や git コマンドを利用します。

それをAIを利用できるようになったのが

GitHub Copilot CLIになります。



GitHub Copilot CLIは
GitHub CLIの拡張機能であり、
GitHub Copilot の３番目のサービスになります。

GitHub Copilotは３番目のサービスとして使えるようになりました。

GitHub Copilot
GitHub Copilot Chat
GitHub Copilot CLI
の３つです。


基本的に
出力されるものは間違っている可能性が必ず残っているので、
最終的には、人間の目で確認しなければいけません。

ファイルの削除や、HDDのフォーマットなどのコマンドなどは、
特に注意する必要があります。

GitHub Copilot CLIが自動的にコマンドを実行することはありません、
必ず人間の最終決定が必要となります。

これが、AIが人間を超えることの出来ないという根拠の一つです。

GitHub Copilot CLIは、
コマンドとコマンド ラインの理解を高めるための強力なツール




----------------------------------------

# CLI での GitHub Copilot について

ターミナルにチャットのようなインターフェイスを提供し、コマンド ラインについて質問できるようにします。


## 入力

GitHub Copilot Individual サブスクリプションをお持ちの場合は、CLI で GitHub Copilot にアクセスできるようになります。

質問を解析し、自然言語処理と機械学習を組み合わせて回答を提供します。


ユーザー入力
自然言語のプロンプト
	普通の会話
質問の形式
	質問

入力は問い合わせたいコマンド タイプ、つまり
汎用シェル コマンド、
Git (git)、
GitHub CLI (gh)
も含まれます。

このシステムは、コマンド ライン関連の質問に
応答することだけを目的としています。



## 応答の生成

提案されたコマンド
質問されたコマンドの説明の形式

提案されたコマンドを実行する場合は、
コマンドをコピーして、
ターミナルの別のウィンドウ
またはタブに貼り付けます。



## 出力

CLI の Copilot は、質問に対して最も適切な回答を提供することを目的としています。
ただし、必ずしも求めている答えが得られるとは限りません。

ユーザーは、システムによって生成された応答をレビューおよび検証して、応答が正確かつ適切であることを確認する責任があります。



----------------------------------------
----------------------------------------
----------------------------------------

Configuring GitHub Copilot in the CLI - GitHub Docs
https://docs.github.com/en/copilot/github-copilot-in-the-cli/configuring-github-copilot-in-the-cli

# CLI での GitHub Copilot の設定

使用状況の分析や、execute コマンドオプションのデフォルトの動作を設定できます。



## 設定するコマンド

gh copilot config

* オプションの使用状況分析
* コマンド実行確認をするかどうか

現在（2024年3月25日）、設定できるのは2つです。


## オプションの使用状況分析

GitHubがユーザーの使用パターンを理解し、サービスを改善するための情報を収集することを許可するかどうかの設定です

収集されるデータにはユーザーが入力したクエリ（検索や問い合わせ）は含まれません。


## コマンドの実行確認について

ghcs エイリアスを使用して、提案されたコマンドの実行を選択すると、CLI の Copilot はコードを実行するかどうかを確認するプロンプトを表示します。詳細については、"CLI で GitHub Copilot を使う" を参照してください。

コマンドの誤実行を防ぐため、確認プロンプトのデフォルトは「No」になっています。









GitHub Copilot CLI（コマンドラインインターフェース）を使用すると、提案されたコードを実行する前に確認プロンプトが表示されます。これは、ユーザーが意図しないコードを誤って実行するのを防ぐための機能です。

たとえば、ghcsというエイリアスを使用してコマンドを実行するとき、GitHub Copilotは次のように動作します。

ghcsコマンドをターミナルで入力します。
GitHub Copilotは、入力に基づいて最適なコードを提案します。
提案されたコードを実行するかどうかを確認するプロンプトが表示されます。
この確認プロンプトは、デフォルトで「No」に設定されています。これは、ユーザーが誤って「Enter」キーを押してコマンドを実行するのを防ぐためです。

ただし、この設定は変更可能で、より迅速なコード実行を優先する場合は、「Yes」に変更することができます。ただし、デフォルトを「Yes」に設定すると、誤って危険なコマンドを実行するリスクが高まるため、注意が必要です。

以上が、GitHub Copilot CLIでのコマンド実行確認についての説明です。具体的な使用方法や設定方法については、「GitHub Copilot in the CLI」のドキュメンテーションを参照してください。








## 送られる使用状況分析データ形式

オプトアウト（＝設定をOFF）しない限り、CLI の Copilot は以下の形式のペイロードを分析システムに送信します。

GitHub はユーザーのプライバシーに非常に配慮しており、特定の個人のデータを見ることはなく、製品の意思決定に役立てるために集計データと傾向のみを調査します。

```terminal
{
	"platform": "darwin",
	"architecture": "arm64",
	"version": "0.3.0-beta",
	"custom_event": "true",
	"event_parent_command": "explain",
	"event_name": "Explain",
	"sha": "08*****4a",
	"thread_id": "e6*****70"
}

```


----------------------------------------

# About the execute command confirmation

コマンド動作の実行確認

たとえば、`ghcs` というエイリアスを独自に設定してあるとします。

この時、ghcs エイリアスを使用して、提案されたコマンドの実行を選択すると、CLI の Copilot はコードを実行するかどうかを確認するプロンプトを表示します。





----------------------------------------
----------------------------------------
----------------------------------------


# GitHub Copilot CLI の弱点

* 複雑なコマンド
* 最新のツール
では正しい提案ができない場合があります。

CLI の範囲外を超える質問には答えるように設計されていません。

英語で書かれた自然言語のコンテンツでトレーニングしているので、
その他の言語で質問した場合パフォーマンスが異なる可能性があります。
