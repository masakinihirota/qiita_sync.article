<!--
title:   OpenAI の 「Plans.md (唯一の生きた文書) 戦略」 をVSCode GitHub Copilot で実行する方法
tags:    OpenAI,VSCode,githubcopilot,plans.md
id:      62367ca7ab1766cbd012
private: false
-->
## 最初に
指示書を新規に作成、もしくは既存の指示書を破棄します。
なぜなら OpenAI の Plans.md 戦略は 「plans.mdファイル を唯一の指示書」とするからです。
そして OpenAI の Codex CLI GPT-5-Codex には スラッシュコマンド(/plans /reviewなど)が揃っています。
なので、GitHub Copilot側で スラッシュコマンドを用意する必要があります。
この記事は、その部分を解説した記事になります。

これは一言で言うと、開発の指示書を1ファイルだけで終わらせます。

## 使用する CLI,IDEの料金プラン
* ChatGPT 月20ドル
* GitHub Copilot 月10ドル
で安く済ませたい人向け
AIに金をかけられる人は👇️ソース(codex_exec_plans.md)から 直接Codex CLI をいじったほうが早いです。

openai-cookbook/articles/codex_exec_plans.md at main · openai/openai-cookbook
https://github.com/openai/openai-cookbook/blob/main/articles/codex_exec_plans.md



# 環境
Windows11
VSCode
GitHub Copilot proプラン以上
proプラン
10$/month(1500円/月額)
100＄/year(1万5千円/年額)
($＝150円計算、学生無料etc.)
使用モデル: GPT-5-Codex(GitHub Copilotのプレミアムリクエストを消費することで300回使えます)

このドキュメントは、GitHub Copilot を用いて `plans.md` 戦略を実行するための運用手順と参照ファイルをまとめたものです。

# OpenAI の plans.md 戦略の説明

## 4つの指導原則(哲学)

自己完結型、自己充足型、初心者誘導型、成果重視型

### 原則1 自己完結型

相手に期待せず、自身がすべてを知っている状態にする。前提知識ゼロでも大丈夫にします。

### 原則2 自己充足型

進捗に応じて書き換えていく、だが原則1の自己完結を必ず維持させる。

### 原則3 初心者誘導型

任せるということはしない、初心者に手取り足取り教えるように開発のレールをきっちりと敷く。

### 原則4 成果重視型

見た目の綺麗さなどとかよりも、きちんと動作することが大事。
目に見える結果で判断をする。


## ExecPlan
ExecPlanというユニークな名前を与える
ユニークな名前をつけることで、AIは特別な扱いをする。
※計画=plan

### ExecPlanの読者とは？
GPT-5-Codexのこと
※読者=AIエージェント=GPT-5-Codex=ペアプログラミングの相方=資料を読む人=読者

作業ツリーとplans.md(=提供されたExecPlanファイル)のみを持つ完全な初心者として扱われます。その他の記憶(ファイル)や外部のコンテキストを持っていません。
※これは強力な要約機能を持っているので実現しているようです。

## GPT-5-Codexについて
このモデルは、高品質な計画を作成するようにトレーニングされているため、それ以前のモデルで必要だった「計画」に関する指示はGPT-5-Codexでは不要になりました。
コア原則は「シンプルであるほど良い」

## GPT-5-Codexのテスト駆動開発
GPT5-Codexはテスト駆動開発で開発するのですか？それとも具体的にテスト駆動開発で開発してくださいと指示は必要ですか？
TDDは明示的に指示された場合のみ実施され、既定ではありません。
※指示書に「TDDを徹底します。」と書き加えておくと良いでしょう。

## plants.md とは？
plants.md はどんどん更新されいく唯一の生きた文書として扱われます。
基本方針は、完全なる初心者として扱い、計画に関することをすべてを教え込んで成長させていきます。

## シンプルな機能を実装する
シンプルな機能を実装したい時はplans.mdを使わないでください
直接AIに指示してください

## 複雑な2つ目の機能を実装する場合は？
そのままつづけて同じplans.mdを使用します。
新しくplans.mdを用意しません。
これは「エグゼクティブサマリー」という機能を使って要約して記録していくためです。
もし、全く別の新しいプロジェクトを他で開始するというのならば、新しいplans.mdを用意して、それを最後まで使います。

## 目的を教えたい(機能の実装など)
作業の目的と意図を最初に書きます。
ユーザーの視点から、その変更がなぜ重要か、何ができるようになるか、そして動作していることをどのように確認できるかを数文で説明します。

## 具体的なステップ
編集する場所、実行するコマンド、観察すべき結果など、正確なステップで読者（AIエージェント）を導きます。


### ExecPlanの主要セクション
* 目的/全体像
* 進捗
* 決定ログ
* 驚きと発見
* 文脈とオリエンテーション
* 作業計画
* 具体的なステップ
* 検証と受け入れ

### 実際の流れ
AIと組んでペアプログラミングのように行います。

人間が大まかに計画を立てる 調査と初期計画
AIが実行 マイルストーン
相談しながら計画を更新(人間もplans.mdを直接編集します)
これを繰り返す

### これからの開発者は
plans.mdを読むと、これからの開発者は
コードを書くよりも
完璧なプロンプトを書くよりも
「完璧な計画」を立てることに重きを置くようになると
OpenAIは言っていると思います。

### 英語の指示、日本語の出力
質問(人間)
plans.md という指示書があります。この指示書で考えるのは英語で、出力は日本語でという指示は効果はありますか？

回答 GitHub Copilot(GPT-5-Codex)
指示として明記されていれば、エージェントは「内部思考（英語）」と「出力（日本語）」を切り分けるよう努めますが、思考言語を完全に制御することは難しく、実質的な効果は「出力を日本語に統一させやすくする」程度です。
Tips: ドキュメント側でも出力言語を統一しておくと、レビュープロセスでの混乱を減らせます。

AGENTS.md(この記事ではcopilot-instructions.md)の役割は？
plans.mdを使用するタイミング（複雑な機能の作成や大規模なリファクタリング時）と、計画の定義を示す用語（例：「ExecPlan」）を記述することで、これらの文書を使用するように指示します。

## 計画の骨格
ExecPlanは厳格な構造を持っています。特に、Progress、Surprises & Discoveries、Decision Log、Outcomes & Retrospectiveのセクションは必須であり、作業の進行に合わせて更新し続ける必要があります。

| セクション名 | 内容と役割 | 重要なポイント |
| :--- | :--- | :--- |
| `# <Short, action-oriented description>` | 短く、行動志向の説明。 | |
| `## Purpose / Big Picture` | ユーザーがこの変更から何を得るか、そしてそれをどのように確認できるかを説明。 | |
| `## Progress` | チェックボックス付きのリストを使用して、詳細なステップを要約。停止するたびに、完了したタスクと残りのタスクを記録。 | タイムスタンプを使用することが推奨されます。 |
| `## Surprises & Discoveries` | 実装中に発見された予期せぬ挙動、バグ、最適化、洞察を短い証拠スニペットとともに文書化。 | |
| `## Decision Log` | 計画作業中に行ったすべての重要な設計上の決定とその理由（Rationale）を記録。 | |
| `## Outcomes & Retrospective` | 主要なマイルストーンまたは完了時に、達成されたこと、残った課題、学んだ教訓を要約。 | |
| `## Context and Orientation` | 読者（エージェント）が何も知らないと仮定して、タスクに関連する現在の状態を説明。キーファイルとモジュールをフルパスで指定。 | |
| `## Plan of Work` | 編集と追加の順序を散文で記述。ファイル名、関数、モジュール、変更内容を具体的に記述。 | |
| `## Concrete Steps` | 実行する正確なコマンドと実行場所（作業ディレクトリ）を明記。予想される出力のトランスクリプトも示し、読者が比較できるようにする。 | |
| `## Validation and Acceptance` | 検証はオプションではありません。システムを起動または実行する方法、および観察すべき動作を記述。検証を「テストコマンドを実行し、新しいテスト<name>が合格する」といった形で、人が検証できる行動として表現。 | |









## 良い点
指示書が少なくなる
2つのコマンド(plans.prompt、review.prompt)とテストだけで良くなる
要件定義書、設計書はAIに書いてもらう

## 悪い点
Codexの仕様をGitHub Copilotに合わせるのが大変

自分の能力以上のことをさせると破綻しやすくなる、バグのループに陥りやすくなる
コミットをすぐにリセット出来るようにしておく
`git reset --soft HEAD~` 等

複雑な箇所ほどバグの原因になりやすい。

アプリ全体のコードをAIで書き続けるようにはしない
自分自身がアプリ全体のコードを把握出来るようにしておく
なのでできるだけ範囲を狭くする
アプリの機能だったりを部分的に実装するように設計書を書く。


## 動画

Shipping with Codex - YouTube
https://www.youtube.com/watch?v=Gr41tYOzE20

## ソース
👇codex_exec_plans.md のリポジトリ
openai-cookbook/articles/codex_exec_plans.md at main · openai/openai-cookbook
https://github.com/openai/openai-cookbook/blob/main/articles/codex_exec_plans.md

Dev Day の Shipping with Codex 講演で言及された Plans.md ファイル - ChatGPT / Codex CLI を使ったコーディング - OpenAI 開発者コミュニティ
https://community.openai.com/t/plans-md-file-mentioned-in-the-shipping-with-codex-talk-at-dev-day/1361628/3

## このplants.md ファイルをつかった OpenAIの戦略とは？

NotebookLMで作成した解説動画
https://x.com/masakinihirota/status/1978283053416862191

## plans.md

<details><summary>plans.md</summary>

```
# Codex Execution Plans (ExecPlans):

This document describes the requirements for an execution plan ("ExecPlan"), a design document that a coding agent can follow to deliver a working feature or system change. Treat the reader as a complete beginner to this repository: they have only the current working tree and the single ExecPlan file you provide. There is no memory of prior plans and no external context.

## How to use ExecPlans and PLANS.md

When authoring an executable specification (ExecPlan), follow PLANS.md _to the letter_. If it is not in your context, refresh your memory by reading the entire PLANS.md file. Be thorough in reading (and re-reading) source material to produce an accurate specification. When creating a spec, start from the skeleton and flesh it out as you do your research.

When implementing an executable specification (ExecPlan), do not prompt the user for "next steps"; simply proceed to the next milestone. Keep all sections up to date, add or split entries in the list at every stopping point to affirmatively state the progress made and next steps. Resolve ambiguities autonomously, and commit frequently.

When discussing an executable specification (ExecPlan), record decisions in a log in the spec for posterity; it should be unambiguously clear why any change to the specification was made. ExecPlans are living documents, and it should always be possible to restart from _only_ the ExecPlan and no other work.

When researching a design with challenging requirements or significant unknowns, use milestones to implement proof of concepts, "toy implementations", etc., that allow validating whether the user's proposal is feasible. Read the source code of libraries by finding or acquiring them, research deeply, and include prototypes to guide a fuller implementation.

## Requirements

NON-NEGOTIABLE REQUIREMENTS:

* Every ExecPlan must be fully self-contained. Self-contained means that in its current form it contains all knowledge and instructions needed for a novice to succeed.
* Every ExecPlan is a living document. Contributors are required to revise it as progress is made, as discoveries occur, and as design decisions are finalized. Each revision must remain fully self-contained.
* Every ExecPlan must enable a complete novice to implement the feature end-to-end without prior knowledge of this repo.
* Every ExecPlan must produce a demonstrably working behavior, not merely code changes to "meet a definition".
* Every ExecPlan must define every term of art in plain language or do not use it.

Purpose and intent come first. Begin by explaining, in a few sentences, why the work matters from a user's perspective: what someone can do after this change that they could not do before, and how to see it working. Then guide the reader through the exact steps to achieve that outcome, including what to edit, what to run, and what they should observe.

The agent executing your plan can list files, read files, search, run the project, and run tests. It does not know any prior context and cannot infer what you meant from earlier milestones. Repeat any assumption you rely on. Do not point to external blogs or docs; if knowledge is required, embed it in the plan itself in your own words. If an ExecPlan builds upon a prior ExecPlan and that file is checked in, incorporate it by reference. If it is not, you must include all relevant context from that plan.

## Formatting

Format and envelope are simple and strict. Each ExecPlan must be one single fenced code block labeled as `md` that begins and ends with triple backticks. Do not nest additional triple-backtick code fences inside; when you need to show commands, transcripts, diffs, or code, present them as indented blocks within that single fence. Use indentation for clarity rather than code fences inside an ExecPlan to avoid prematurely closing the ExecPlan's code fence. Use two newlines after every heading, use # and ## and so on, and correct syntax for ordered and unordered lists.

When writing an ExecPlan to a Markdown (.md) file where the content of the file *is only* the single ExecPlan, you should omit the triple backticks.

Write in plain prose. Prefer sentences over lists. Avoid checklists, tables, and long enumerations unless brevity would obscure meaning. Checklists are permitted only in the `Progress` section, where they are mandatory. Narrative sections must remain prose-first.

## Guidelines

Self-containment and plain language are paramount. If you introduce a phrase that is not ordinary English ("daemon", "middleware", "RPC gateway", "filter graph"), define it immediately and remind the reader how it manifests in this repository (for example, by naming the files or commands where it appears). Do not say "as defined previously" or "according to the architecture doc." Include the needed explanation here, even if you repeat yourself.

Avoid common failure modes. Do not rely on undefined jargon. Do not describe "the letter of a feature" so narrowly that the resulting code compiles but does nothing meaningful. Do not outsource key decisions to the reader. When ambiguity exists, resolve it in the plan itself and explain why you chose that path. Err on the side of over-explaining user-visible effects and under-specifying incidental implementation details.

Anchor the plan with observable outcomes. State what the user can do after implementation, the commands to run, and the outputs they should see. Acceptance should be phrased as behavior a human can verify ("after starting the server, navigating to [http://localhost:8080/health](http://localhost:8080/health) returns HTTP 200 with body OK") rather than internal attributes ("added a HealthCheck struct"). If a change is internal, explain how its impact can still be demonstrated (for example, by running tests that fail before and pass after, and by showing a scenario that uses the new behavior).

Specify repository context explicitly. Name files with full repository-relative paths, name functions and modules precisely, and describe where new files should be created. If touching multiple areas, include a short orientation paragraph that explains how those parts fit together so a novice can navigate confidently. When running commands, show the working directory and exact command line. When outcomes depend on environment, state the assumptions and provide alternatives when reasonable.

Be idempotent and safe. Write the steps so they can be run multiple times without causing damage or drift. If a step can fail halfway, include how to retry or adapt. If a migration or destructive operation is necessary, spell out backups or safe fallbacks. Prefer additive, testable changes that can be validated as you go.

Validation is not optional. Include instructions to run tests, to start the system if applicable, and to observe it doing something useful. Describe comprehensive testing for any new features or capabilities. Include expected outputs and error messages so a novice can tell success from failure. Where possible, show how to prove that the change is effective beyond compilation (for example, through a small end-to-end scenario, a CLI invocation, or an HTTP request/response transcript). State the exact test commands appropriate to the project’s toolchain and how to interpret their results.

Capture evidence. When your steps produce terminal output, short diffs, or logs, include them inside the single fenced block as indented examples. Keep them concise and focused on what proves success. If you need to include a patch, prefer file-scoped diffs or small excerpts that a reader can recreate by following your instructions rather than pasting large blobs.

## Milestones

Milestones are narrative, not bureaucracy. If you break the work into milestones, introduce each with a brief paragraph that describes the scope, what will exist at the end of the milestone that did not exist before, the commands to run, and the acceptance you expect to observe. Keep it readable as a story: goal, work, result, proof. Progress and milestones are distinct: milestones tell the story, progress tracks granular work. Both must exist. Never abbreviate a milestone merely for the sake of brevity, do not leave out details that could be crucial to a future implementation.

Each milestone must be independently verifiable and incrementally implement the overall goal of the execution plan.

## Living plans and design decisions

* ExecPlans are living documents. As you make key design decisions, update the plan to record both the decision and the thinking behind it. Record all decisions in the `Decision Log` section.
* ExecPlans must contain and maintain a `Progress` section, a `Surprises & Discoveries` section, a `Decision Log`, and an `Outcomes & Retrospective` section. These are not optional.
* When you discover optimizer behavior, performance tradeoffs, unexpected bugs, or inverse/unapply semantics that shaped your approach, capture those observations in the `Surprises & Discoveries` section with short evidence snippets (test output is ideal).
* If you change course mid-implementation, document why in the `Decision Log` and reflect the implications in `Progress`. Plans are guides for the next contributor as much as checklists for you.
* At completion of a major task or the full plan, write an `Outcomes & Retrospective` entry summarizing what was achieved, what remains, and lessons learned.

# Prototyping milestones and parallel implementations

It is acceptable—-and often encouraged—-to include explicit prototyping milestones when they de-risk a larger change. Examples: adding a low-level operator to a dependency to validate feasibility, or exploring two composition orders while measuring optimizer effects. Keep prototypes additive and testable. Clearly label the scope as “prototyping”; describe how to run and observe results; and state the criteria for promoting or discarding the prototype.

Prefer additive code changes followed by subtractions that keep tests passing. Parallel implementations (e.g., keeping an adapter alongside an older path during migration) are fine when they reduce risk or enable tests to continue passing during a large migration. Describe how to validate both paths and how to retire one safely with tests. When working with multiple new libraries or feature areas, consider creating spikes that evaluate the feasibility of these features _independently_ of one another, proving that the external library performs as expected and implements the features we need in isolation.

## Skeleton of a Good ExecPlan

```md
# <Short, action-oriented description>

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

If PLANS.md file is checked into the repo, reference the path to that file here from the repository root and note that this document must be maintained in accordance with PLANS.md.

## Purpose / Big Picture

Explain in a few sentences what someone gains after this change and how they can see it working. State the user-visible behavior you will enable.

## Progress

Use a list with checkboxes to summarize granular steps. Every stopping point must be documented here, even if it requires splitting a partially completed task into two (“done” vs. “remaining”). This section must always reflect the actual current state of the work.

- [x] (2025-10-01 13:00Z) Example completed step.
- [ ] Example incomplete step.
- [ ] Example partially completed step (completed: X; remaining: Y).

Use timestamps to measure rates of progress.

## Surprises & Discoveries

Document unexpected behaviors, bugs, optimizations, or insights discovered during implementation. Provide concise evidence.

- Observation: …
  Evidence: …

## Decision Log

Record every decision made while working on the plan in the format:

- Decision: …
  Rationale: …
  Date/Author: …

## Outcomes & Retrospective

Summarize outcomes, gaps, and lessons learned at major milestones or at completion. Compare the result against the original purpose.

## Context and Orientation

Describe the current state relevant to this task as if the reader knows nothing. Name the key files and modules by full path. Define any non-obvious term you will use. Do not refer to prior plans.

## Plan of Work

Describe, in prose, the sequence of edits and additions. For each edit, name the file and location (function, module) and what to insert or change. Keep it concrete and minimal.

## Concrete Steps

State the exact commands to run and where to run them (working directory). When a command generates output, show a short expected transcript so the reader can compare. This section must be updated as work proceeds.

## Validation and Acceptance

Describe how to start or exercise the system and what to observe. Phrase acceptance as behavior, with specific inputs and outputs. If tests are involved, say "run <project’s test command> and expect <N> passed; the new test <name> fails before the change and passes after>".

## Idempotence and Recovery

If steps can be repeated safely, say so. If a step is risky, provide a safe retry or rollback path. Keep the environment clean after completion.

## Artifacts and Notes

Include the most important transcripts, diffs, or snippets as indented examples. Keep them concise and focused on what proves success.

## Interfaces and Dependencies

Be prescriptive. Name the libraries, modules, and services to use and why. Specify the types, traits/interfaces, and function signatures that must exist at the end of the milestone. Prefer stable names and paths such as `crate::module::function` or `package.submodule.Interface`. E.g.:

In crates/foo/planner.rs, define:

    pub trait Planner {
        fn plan(&self, observed: &Observed) -> Vec<Action>;
    }
\```

If you follow the guidance above, a single, stateless agent -- or a human novice -- can read your ExecPlan from top to bottom and produce a working, observable result. That is the bar: SELF-CONTAINED, SELF-SUFFICIENT, NOVICE-GUIDING, OUTCOME-FOCUSED.

When you revise a plan, you must ensure your changes are comprehensively reflected across all sections, including the living document sections, and you must write a note at the bottom of the plan describing the change and the reason why. ExecPlans must describe not just the what but the why for almost everything.

```

</details>

👆️ソースかこれをコピペしてください。

<details><summary>plans.md 日本語訳</summary>



### PLANS.md (日本語訳)

以下は文書の全体です。この文書のプロンプティングは、ユーザーに重要なフィードバックを提供し、モデルが計画で指定されたものを正確に実装するように導くために慎重に選択されました。ユーザーは、自分のニーズに合わせてファイルをカスタマイズしたり、必要なセクションを追加・削除したりすることで利益を得られるかもしれません。

```plans.md
# Codex Execution Plans (ExecPlans):

この文書は、実行計画 ("ExecPlan") の要件を説明します。これは、コーディングエージェントが機能する機能やシステム変更を提供するために従う設計文書です。読者をこのリポジトリの完全な初心者として扱ってください：彼らは現在の作業ツリーとあなたが提供する単一の ExecPlan ファイルしか持っていません。以前の計画の記憶や外部コンテキストはありません。

## ExecPlans と PLANS.md の使用方法

実行可能な仕様 (ExecPlan) を著述する際は、PLANS.md を _文字通り_ 従ってください。あなたのコンテキストにない場合は、PLANS.md ファイル全体を読んで記憶を更新してください。ソース資料を徹底的に読み（そして再読）して正確な仕様を作成してください。仕様を作成する際は、スケルトンから始め、あなたの研究とともに肉付けしてください。

実行可能な仕様 (ExecPlan) を実装する際は、「次のステップ」をユーザーにプロンプトしないでください；単に次のマイルストーンに進んでください。すべてのセクションを最新に保ち、停止するたびにリストにエントリを追加または分割して、進捗と次のステップを肯定的に述べます。曖昧さを自律的に解決し、頻繁にコミットしてください。

実行可能な仕様 (ExecPlan) を議論する際は、仕様にログを記録して将来のために保存してください；仕様が変更された理由が明確にわかるようにしてください。ExecPlans は生きている文書であり、常に ExecPlan と他の作業なしで再開できるようにしてください。

挑戦的な要件や重要な未知数を持つ設計を研究する際は、マイルストーンを使用して概念実証、「おもちゃの実装」などを実装し、ユーザーの提案が実現可能かどうかを検証できるようにしてください。ライブラリのソースコードを読み、深く研究し、より完全な実装をガイドするプロトタイプを含めてください。

## 要件

交渉不可能な要件：

* すべての ExecPlan は完全に自己完結している必要があります。自己完結とは、現在の形式で初心者が成功するために必要なすべての知識と指示を含んでいることを意味します。
* すべての ExecPlan は生きている文書です。貢献者は、進捗が進むにつれて、発見が発生し、設計決定が最終化されるにつれて、それを改訂する必要があります。各改訂は完全に自己完結したままにしてください。
* すべての ExecPlan は、初心者がこのリポジトリの事前知識なしに機能をエンドツーエンドで実装できるようにする必要があります。
* すべての ExecPlan は、単に「定義を満たす」コード変更ではなく、明らかに動作する動作を生成する必要があります。
* すべての ExecPlan は、すべての専門用語を平易な言語で定義するか、使用しないようにしてください。

目的と意図が最初に来ます。数文で、この変更がユーザーの視点からなぜ重要かを説明してください：この変更後に行えることと以前に行えなかったこと、そしてそれを動作しているのを見る方法。次に、その結果を達成するための正確なステップをガイドしてください。何を編集するか、何を実行するか、何を観察するかを包括的に。

計画を実行するエージェントは、ファイルをリストし、読み、検索し、プロジェクトを実行し、テストを実行できます。それは以前のコンテキストを知らず、以前のマイルストーンからあなたが何を意味したかを推測できません。あなたが依存するあらゆる仮定を繰り返してください。外部のブログやドキュメントを指さないでください；知識が必要な場合は、あなた自身の言葉で計画自体に埋め込んでください。ExecPlan が以前の ExecPlan に基づき、そのファイルがチェックインされている場合は、参照で組み込んでください。されていない場合は、その計画からすべての関連コンテキストを含める必要があります。

## フォーマット

フォーマットとエンベロープはシンプルで厳格です。各 ExecPlan は、 `md` とラベル付けされた単一のフェンスされたコードブロックでなければならず、三重バックティックで始まり終わります。内部に追加の三重バックティックコードフェンスをネストしないでください；コマンド、トランスクリプト、diff、またはコードを表示する必要がある場合は、単一のフェンス内でインデントされたブロックとして提示してください。ExecPlan のコードフェンスを早期に閉じないように、ExecPlan 内でコードフェンスを使用するのではなく、明確にするためにインデントを使用してください。すべての見出しの後に 2 つの改行を使用し、# と ## などを正しい構文で使用し、順序付きと順序なしリストを正しく使用してください。

ExecPlan を Markdown (.md) ファイルに書き込む場合、ファイルの内容が *のみ* 単一の ExecPlan である場合は、三重バックティックを省略してください。

平易な散文で書いてください。リストよりも文を優先してください。意味を曖昧にしない限り、チェックリスト、テーブル、長大な列挙を避けてください。チェックリストは `Progress` セクションでのみ許可され、そこでは必須です。ナラティブセクションは散文優先のままにしてください。

## ガイドライン

自己完結と平易な言語が最も重要です。普通の英語ではないフレーズ ("daemon", "middleware", "RPC gateway", "filter graph") を導入する場合、それをすぐに定義し、このリポジトリでどのように現れるかを思い出させてください（たとえば、それが現れるファイルやコマンドを命名することで）。「以前に定義されたように」または「アーキテクチャドキュメントによると」と言わないでください。ここで必要な説明を含めてください、繰り返しでも。

一般的な失敗モードを避けてください。未定義の専門用語に依存しないでください。結果のコードがコンパイルするが意味のあることを何もしないほど狭く機能の「文字」を記述しないでください。重要な決定をリーダーに委託しないでください。曖昧さがある場合、計画自体でそれを解決し、なぜその道を選んだかを説明してください。ユーザーに見える効果を過度に説明し、付随的な実装詳細を過少指定するようにしてください。

観測可能な結果で計画を固定してください。実装後にユーザーが何ができるか、実行するコマンド、表示される出力について述べてください。受け入れは、人間が検証できる動作としてフレーズしてください（「サーバーを開始した後、[http://localhost:8080/health](http://localhost:8080/health) にナビゲートすると HTTP 200 とボディ OK が返される」）ではなく、内部属性（「HealthCheck 構造体を追加」）。変更が内部的な場合、その影響がどのように示されるかを説明してください（たとえば、変更前後に失敗し成功するテストを実行し、新しい動作を使用するシナリオを示すことで）。

リポジトリコンテキストを明示的に指定してください。リポジトリ相対パスでファイルを命名し、関数とモジュールを正確に命名し、新しいファイルを作成する場所を記述してください。複数の領域に触れる場合、初心者が自信を持ってナビゲートできるように、それらの部分がどのように適合するかを説明する短いオリエンテーション段落を含めてください。コマンドを実行する際は、作業ディレクトリと正確なコマンドラインを表示してください。結果が環境に依存する場合、仮定を述べ、合理的な場合に代替を提供してください。

べき等で安全にしてください。ステップを複数回実行しても損傷やドリフトを引き起こさないように書いてください。ステップが途中で失敗する場合、再試行または適応する方法を含めてください。移行や破壊的な操作が必要な場合、バックアップや安全なフォールバックを詳述してください。テスト可能な変更を優先し、進むにつれて検証できるようにしてください。

検証はオプションではありません。テストを実行し、適用可能な場合はシステムを開始し、何か有用なことを観察する指示を含めてください。新しい機能や機能の包括的なテストを記述してください。初心者が成功と失敗を区別できるように、期待される出力とエラーメッセージを含めてください。可能であれば、コンパイルを超えて変更が効果的であることを証明する方法を示してください（たとえば、小さなエンドツーエンドシナリオ、CLI 呼び出し、または HTTP リクエスト/レスポンストランスクリプトを通じて）。プロジェクトのツールチェーンに適した正確なテストコマンドを述べ、その結果をどのように解釈するかを述べてください。

証拠をキャプチャしてください。あなたのステップがターミナル出力、短い diff、またはログを生成する場合、単一のフェンスされたブロック内でインデントされた例としてそれらを含めてください。それらを簡潔に保ち、成功を証明するものに焦点を当ててください。パッチを含める必要がある場合、あなたの指示に従ってリーダーが再作成できるファイルスコープの diff または小さな抜粋を優先してください、大規模な blob を貼り付けるのではなく。

## マイルストーン

マイルストーンは官僚主義ではなくナラティブです。作業をマイルストーンに分ける場合、各マイルストーンを短い段落で導入し、スコープ、何が存在しなかったものがマイルストーンの終わりまでに存在するもの、実行するコマンド、観察することを期待する受け入れを記述してください。読みやすいストーリーとして保ってください：目標、作業、結果、証明。進捗とマイルストーンは別です：マイルストーンはストーリーを伝え、進捗は細かい作業を追跡します。両方が存在する必要があります。将来の実装にとって重要である可能性のある詳細を省略しないでください、簡潔さのためにマイルストーンを省略しないでください。

各マイルストーンは独立して検証可能で、実行計画の全体的な目標を段階的に実装する必要があります。

## 生きている計画と設計決定

* ExecPlans は生きている文書です。主要な設計決定を行う際は、決定とその背後にある思考の両方を記録するために計画を更新してください。すべての決定を `Decision Log` セクションに記録してください。
* ExecPlans は `Progress` セクション、`Surprises & Discoveries` セクション、`Decision Log`、および `Outcomes & Retrospective` セクションを含み、維持する必要があります。これらはオプションではありません。
* オプティマイザの動作、パフォーマンスのトレードオフ、予期しないバグ、またはあなたのアプローチを形成した逆/適用解除のセマンティクスを発見した場合、`Surprises & Discoveries` セクションに短い証拠スニペット（テスト出力が理想的）でそれらの観察をキャプチャしてください。
* 実装中にコースを変更する場合、`Decision Log` で理由を文書化し、`Progress` に影響を反映してください。計画はあなたのためのチェックリストと同じくらい次の貢献者へのガイドです。
* 主要なタスクまたは完全な計画の完了時に、`Outcomes & Retrospective` エントリを書いて、何が達成されたか、何が残っているか、学んだ教訓を要約してください。

# プロトタイピングマイルストーンと並行実装

より大きな変更をデリスクする際に、明示的なプロトタイピングマイルストーンを含めることは受け入れ可能であり、しばしば奨励されます。例：依存関係に低レベルのオペレーターを追加して実現可能性を検証する、またはオプティマイザの効果を測定しながら 2 つの構成順序を探索する。プロトタイプを追加的でテスト可能に保ってください。スコープを「プロトタイピング」として明確にラベル付けしてください；実行と結果の観察を記述してください；プロトタイプを昇格または廃棄する基準を述べてください。

テストがパスしたままになる追加的なコード変更を優先してください。並行実装（例：移行中に古いパスとともにアダプターを保持する）は、リスクを減らし、テストが継続してパスすることを可能にする場合に問題ありません。両方のパスを検証する方法を記述し、テストで安全に一方を退役させる方法を記述してください。複数の新しいライブラリや機能領域で作業する場合、これらの機能を互いに独立して評価するスパイクを作成することを検討してください、外部ライブラリが期待通りに動作し、私たちが必要とする機能を分離して実装することを証明します。

## 良い ExecPlan のスケルトン

```md
# <短く、行動指向の説明>

この ExecPlan は生きている文書です。作業が進むにつれて、`Progress`、`Surprises & Discoveries`、`Decision Log`、および `Outcomes & Retrospective` セクションを最新に保つ必要があります。

PLANS.md ファイルがリポジトリにチェックインされている場合、ここからリポジトリルートへのパスを参照し、この文書が PLANS.md に従って維持される必要があることに注意してください。

## 目的 / 大きな絵

数文で、この変更後に誰かが得るものを説明し、それが動作しているのを見る方法。あなたが有効にするユーザーに見える動作を述べてください。

## 進捗

細かいステップを要約するためにチェックボックス付きリストを使用してください。部分的に完了したタスクを 2 つに分割する必要がある場合でも、すべての停止ポイントをここに文書化してください。このセクションは常に作業の実際の現在の状態を反映する必要があります。

- [x] (2025-10-01 13:00Z) 完了したステップの例。
- [ ] 未完了のステップの例。
- [ ] 部分的に完了したステップの例（完了: X; 残り: Y）。

進捗のレートを測定するためにタイムスタンプを使用してください。

## 驚きと発見

実装中に発見された予期しない動作、バグ、最適化、または洞察を文書化してください。簡潔な証拠を提供してください。

- 観察: …
  証拠: …

## 決定ログ

計画で作られたすべての決定を以下のフォーマットで記録してください：

- 決定: …
  根拠: …
  日付/著者: …

## 成果と振り返り

主要なマイルストーンまたは完了時に成果、ギャップ、学んだ教訓を要約してください。元の目的に対して結果を比較してください。

## コンテキストとオリエンテーション

読者が何も知らないかのように、このタスクに関連する現在の状態を記述してください。フルパスで主要なファイルとモジュールを命名してください。使用する非自明な用語を定義してください。以前の計画を参照しないでください。

## 作業計画

散文で、編集と追加のシーケンスを記述してください。各編集について、ファイルと場所（関数、モジュール）を命名し、何を挿入または変更するかを述べてください。具体的に最小限に保ってください。

## 具体的なステップ

実行する正確なコマンドと場所（作業ディレクトリ）を述べてください。コマンドが出力を生成する場合、比較できるように短い期待されるトランスクリプトを表示してください。このセクションは作業が進むにつれて更新する必要があります。

## 検証と受け入れ

システムを開始または実行する方法と何を観察するかを記述してください。受け入れを動作としてフレーズしてください、特定の入力と出力で。テストが関わる場合、「<プロジェクトのテストコマンド> を実行し、<N> がパスすることを期待；新しいテスト <name> は変更前後に失敗し成功する」。

## べき等性と回復

ステップを安全に繰り返せる場合、そう述べてください。ステップがリスクがある場合、安全な再試行またはロールバックパスを提供してください。完了後に環境をクリーンに保ってください。

## アーティファクトとノート

最も重要なトランスクリプト、diff、またはスニペットをインデントされた例として含めてください。それらを簡潔に保ち、成功を証明するものに焦点を当ててください。

## インターフェースと依存関係

規範的にしてください。使用するライブラリ、モジュール、サービスを命名し、なぜかを述べてください。マイルストーンの終わりまでに存在する必要がある型、トレイト/インターフェース、関数シグネチャを指定してください。`crate::module::function` や `package.submodule.Interface` のような安定した名前とパスを優先してください。例：

crates/foo/planner.rs で定義：

    pub trait Planner {
        fn plan(&self, observed: &Observed) -> Vec<Action>;
    }
```

上記のガイドラインに従う場合、単一のステートレスエージェント -- または人間の初心者 -- は ExecPlan を上から下に読み、動作する観測可能な結果を生成できます。それがバーです：自己完結、自己充足、初心者ガイド、結果指向。

計画を改訂する場合、すべてのセクション、生きている文書セクションを含む変更が包括的に反映されていることを確認し、計画の下部に変更と理由を説明するノートを書いてください。ExecPlans は何だけでなくなぜも説明する必要があります。


</details>

## 前提知識 GitHub Copilot のプロンプト

GitHub Copilotでは
* copilot-instructions.md
* *-instructions.md
* *.prompt.md
の3種類の指示書があります。

copilot-instructions.mdが、プロジェクト全体の指示書
*-instructions.mdが、特定の目的や、特定のファイルに対する個別の指示書
*.prompt.mdが、特定のタスクの指示書/GitHub Copilotのチャット欄からスラッシュコマンドになる



### GitHub Copilot のプロンプトファイル作成方法

初めてのプロンプト ファイル - GitHub Docs
https://docs.github.com/ja/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file

初めてのカスタム指示 - GitHub Docs
https://docs.github.com/ja/copilot/tutorials/customization-library/custom-instructions/your-first-custom-instructions



#### 1. /saveコマンドのプロンプトファイルの新規作成方法
GitHub Copilotのチャット欄で
`/save`
コマンドを実行すると、現状のチャットの保存と、tools等を設定した新規promptファイルが作成できます。

![スクリーンショット 2025-10-14 192815.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/cacac896-cec0-426a-a6ba-dc9b269e33e5.png)

![スクリーンショット 2025-10-14 192938.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/dc3637ea-54d6-48e0-a2b9-cb73dcf0a9ea.png)

※👆️`new.prompt.md` のファイル名は後から変更します。
保存先は `*.prompt.md`ファイルを保存する場所に設定されています。

#### 2. 基本のプロンプトファイルの新規作成方法
👇️MCP出現以前の一世代前の通常のプロンプトファイルの作り方。

VSCodeでCtrl+Shift+pでコマンド入力欄を開く

![スクリーンショット 2025-10-14 064042.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/53c96909-4843-449c-ac60-640eebc13b03.png)

👆️promptと入力

![スクリーンショット 2025-10-14 064204.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/88a139ee-01cf-4307-baf1-fbbbe49972a4.png)

👆️チャット： プロンプト ファイルの構成...を選択

![スクリーンショット 2025-10-14 163215.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c7c5ce35-3e6a-4708-bc82-9c800029f2b3.png)

👆️新しいファイルか、既存のプロンプトファイル科を選択

![スクリーンショット 2025-10-14 064312.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/264bf77f-c66f-4fc6-8711-3a3d3e5d004e.png)

👆️場所を選択

![スクリーンショット 2025-10-14 064329.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/fe8beadf-a87e-4d2c-a6a9-52fce3946f85.png)

👆️プロンプトファイルの名前を入力

![スクリーンショット 2025-10-14 064518.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/123c7969-35bb-4e66-8ad0-4b1ede9a2361.png)

👆️空のプロンプトファイルが作成できます。


![スクリーンショット 2025-10-14 163307.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/44761/c9b793d0-afb4-414b-b77e-87d981bc5a9e.png)

GitHub Copilot のチャット欄で
`/[ファイル名]`
で実行出来るようになります。

```[ファイル名].prompt.md
---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

```

👆️内容を決め

GitHub Copilot chat欄で
`/[ファイル名]`
と入力して実行します。

これでスラッシュコマンドとして実行できるようになります。








# GitHub Copilot で OpenAI の plans.md 戦略を動かすための実装

この流れは、AIが単にコードを生成するだけでなく、仕様決定から実行、記録、進捗管理までを一貫して担うプロセスです。

## 前提
指示書は0から新規に作成します。
既存の指示書があるならすべて破棄します。

構想、アイデア、メモから何を作りたいか決めます。

## 要件定義書と設計書

構想、アイデア、メモをAIに渡し、
要件定義書を書きます。
ユーザーの課題解決やアイデアを具体化します。

壁打ちして完成度を上げます。
主要機能、ターゲットユーザー、満たすべき制約**を整理させ要件定義書として具体化します。
これで全体の要件定義書が出来上がります。

要件定義書に基づき、システム構成図、データモデル（ER図）、主要コンポーネントの設計、API仕様などを含む設計書をAIに作成させます。

全体を一気に作るような設計書は作りません。
各個別の機能ごとの設計書を作るように指示をします。
一気に作ろうとしても、よほどうまく調整しない限りCodexを数時間も連続で動かすことは出来ません。
AIの特性、設計の複雑度等を諸々考慮できる人はやってみてください。

* 最初は1機能ごとの設計書を作るようにしましょう。

AIを使うコツは出来る限り範囲を狭めることです。
設計をはっきりしっかり書くことです、ふわふわの指示ではAIは戸惑ってしまいます。

1機能のコードの実装が終わっても、次の新しい設計書をつくり`plans.prompt.md`に書き換えて使います。
そして`plans.md`はそのまま使い続けます。

## copilot-instructions.md の作成

GitHub Copilotに対する指示を中心に書きます。(となるのが理想)

copilot-instructions.md の例

```copilot-instructions.md
---
applyTo: "**"
---

# 生成AIへの 指示書 for `vns-masakinihirota` プロジェクト

文書は必ず日本語を使用してください。

## プロジェクトの概要

このプロジェクトは、`masakinihirota` Web アプリケーションを開発するためのマルチリポジトリワークスペースです。
以下の関心ごとを分離したリポジトリで構成されます。

- **`vns-masakinihirota`**: コアアプリケーションコード（実装およびテスト）、GitHub Copilot 用の指示書・プロンプト、ドキュメント
- **`vns-masakinihirota-design`**: 人間が作る設計書・構想・要件定義

## 全体の把握

serenaでスキャンしてください。
現在のプロジェクトを Serena MCP を利用して分析してください。

serenaのメモリから、現状を抜き出し把握します。
タスクが終わるたびにserenaに進捗状況を更新を行います。

## その他

GitHub Copilot の返信の最後に、なにか Tips と関連するアドバイスがありましたら教えて下さい。

```

※AGENTS.mdと重なっている部分が多くあります。(試行錯誤中なので各自改良してください)

## AGENTS.md の作成

Codexに対する指示を中心に書きます。(となるのが理想)

```AGENTS.md
文書は日本語で書いてください。

## ExecPlanについて

複雑な機能や大規模なリファクタリングに取り組む際は、
必ず [plans.md](./plans.md) を使用してください。

「ExecPlan」という言葉を使ったときは、
[plans.md](./plans.md) を参照し、以下を実行してください：

1. 全体像を理解する
2. 進捗状況を確認する
3. 作業後に [plans.md](./plans.md) を更新する
4. 発見事項と決定事項を記録する

[plans.md](./plans.md) はあなたの長期記憶であり、
プロジェクトの羅針盤です。

### ドキュメントのルール

`docs`フォルダにドキュメントを書いてください
ドキュメントが無いならばmarkdown形式で新規作成してください
常に `docs`フォルダ内のドキュメントを最新の状態にしてください。

# 作業終了時
作業が完了したらドキュメントを更新してください。
作業が完了したら、`npm run check` `npm run build` `npm run test` を実行し、すべてが正常に動作することを確認してください。
確認が完了したら、変更をコミットしてください。

```

※copilot-instructions.mdと重なっている部分が多くあります。(試行錯誤中なので各自改良してください)



## plans.prompt.mdの設定

👆️上で完成した設計書を`plans.prompt.md`に設定します。




実装例

```plans.prompt.md
---
description: 'plans.mdの実装を依頼するプロンプト'
mode: agent
model: GPT-5-Codex (Preview)
tools: ['search/codebase', 'problems', 'changes', 'fetch', 'githubRepo', 'edit/editFiles', 'search', 'runTests', 'runCommands', 'runTasks', 'runNotebooks', 'new', 'extensions', 'usages', 'vscodeAPI', 'think', 'testFailure', 'openSimpleBrowser', 'todos', 'Sentry/search_docs', 'github/create_or_update_file', 'serena/*', 'context7/*', 'sequentialthinking/sequentialthinking', 'edit', 'chrome-devtools/*', 'Postgres(LOCAL-supabase)/*', 'supabase/apply_migration', 'supabase/confirm_cost', 'supabase/deploy_edge_function', 'supabase/execute_sql', 'supabase/generate_typescript_types', 'supabase/get_advisors', 'supabase/get_anon_key', 'supabase/get_edge_function', 'supabase/get_logs', 'supabase/list_migrations', 'supabase/list_tables', 'supabase/search_docs', 'unsplash/*', 'vscode/get_terminal_output', 'shadcn-ui/*', 'shadcn/*', 'playwright/browser_navigate', 'playwright/browser_resize', 'playwright/browser_select_option', 'calil-library-mcp/*', 'sequentialthinking/*']
---

[plans.md](./plans.md) を読んでください。

# TDD(テスト駆動開発)
TDDを徹底します。

## アクセス制御システムの実装

以下のドキュメントを参考に、
ライブラリの統合方法を調査し、
詳細な実行計画を作成してください。

`アクセス権限設計書.md`

この設計書を[plans.md](./plans.md)に書いてください。
[plans.md](./plans.md) に基づいて実装してください。
進捗に応じて [plans.md](./plans.md) を更新してください。

## このプロンプトが終了したら
正常に終了したか確かめてください
エラーが出てないかチェックしてください。
テストが通っているか確認してください。
以上がすべて確認できたら
コミットをしてください

コミットが完了したら
レビューを行います。
`.github\prompts\review.prompt.md`

レビューが完了したらドキュメントを更新します。
ドキュメントのフォルダは
`[ドキュメントのpath]`
です。

```

## プラン開始 `/plans` スラッシュコマンドの実行

GitHub Copilotのチャット欄から `/plans` スラッシュコマンドを実行します。

plans.mdファイルが調査を開始します。
コードが実装されていきます。
plans.mdが更新されていきます。

**進捗と記録の永続化**: AIは実装タスクを完了するたびに、**`plans.md`**に**実行内容、完了日時、発生した課題（あれば）、次のステップ**などを記録し、**進捗を継続的に更新**します。これは、AIの**自己管理と記録の永続化**の核となります。

テストも同時並行で実装されているはずです。
カバレッジなどのチェックも行っています。

**実行中のベストプラクティス（監視）**:
   - AIは実装中、コーディング規約の遵守、セキュリティ上の懸念点、パフォーマンスなどの**ベストプラクティス**を常に**自己監視**します。不備があれば即座に修正を試みます。
   -
途中でループなどのバグが怒らなければ最後までいき、コミットなどの後処理をさせます。



## review.prompt.md の作成

実装例

```review.prompt.md
---
description: Review 指示書
mode: agent
model: GPT-5-Codex (Preview)
tools: ['search/codebase', 'problems', 'changes', 'fetch', 'githubRepo', 'edit/editFiles', 'search', 'runTests', 'runCommands', 'runTasks', 'runNotebooks', 'new', 'extensions', 'usages', 'vscodeAPI', 'think', 'testFailure', 'openSimpleBrowser', 'todos', 'Sentry/search_docs', 'github/create_or_update_file', 'serena/*', 'context7/*', 'sequentialthinking/sequentialthinking', 'edit', 'chrome-devtools/*', 'Postgres(LOCAL-supabase)/*', 'supabase/apply_migration', 'supabase/confirm_cost', 'supabase/deploy_edge_function', 'supabase/execute_sql', 'supabase/generate_typescript_types', 'supabase/get_advisors', 'supabase/get_anon_key', 'supabase/get_edge_function', 'supabase/get_logs', 'supabase/list_migrations', 'supabase/list_tables', 'supabase/search_docs', 'unsplash/*', 'vscode/get_terminal_output', 'shadcn-ui/*', 'shadcn/*', 'playwright/browser_navigate', 'playwright/browser_resize', 'playwright/browser_select_option', 'calil-library-mcp/*', 'sequentialthinking/*']
---

mainブランチとの差分を対象にレビューしてください。
変更箇所ごとに潜在的なバグ、仕様逸脱、動作退行、パフォーマンス劣化、セキュリティ・可用性への影響を優先度順に指摘してください（例: 致命的 > 重大 > 注意 > 軽微）。
各指摘は、影響範囲・再現手順・期待される挙動・修正の方向性を簡潔にまとめ、該当ファイルと行番号を必ず明示してください。
想定と違う動作が懸念される箇所は、理由や前提（例: 入力値、非同期処理、例外処理）を添えて質問または確認事項として列挙してください。
重大な変更にテストが追加されていない場合は、欠落テストの種類や想定ケースを指摘し、必要に応じて具体例を示してください。
問題が見つからなかった場合でも、その旨と残るリスクや追加検証が望ましい箇所を記録してください。

# オプション選択
1. ベースブランチと比較（mainブランチとの差分）
2. コミットされていない部分のレビュー

```

※👆️オプション選択は上手くいっていない

これでレビュー `/review` スラッシュコマンドの完成です。



## レビュー開始 `/review` スラッシュコマンドの実行

GitHub Copilotのチャット欄からレビューの `/review` スラッシュコマンドを実行します。

GPT-5-Codex のレビューは他のAIと違い、重大な報告から知らせてくれます。

**レビュー GPT-5-Codexの活用**: 作成したレビュー用プロンプトファイルを使用し、コード、設計、ドキュメントの**レビュー**を実行させます。

**必要に応じた軌道修正**:
   - レビュー結果や実行中に見つかった問題点に基づき、AIは**要件定義、設計書、`plans.md`、またはコード自体**の**軌道修正**（修正計画の立案と実行）を行います。



レビューで重大インシデントがなければコミットやマージなどを行い、次の実装に向かいます。
並列開発をしていたら、コンフリクトの処理をする場合があります。


# これまでのAIレビューとGPT-5-Codexのレビューの質の違い

GPT-5-Codexはレビューに自信を持っています。

## 従来のツール：

	❌ スタイルの問題: インデントが4スペースではありません
	❌ 命名: 変数名が長すぎます
	❌ コメント: ここにコメントを追加してください
	❌ 改行: 空行が多すぎます
	...（20〜30個の指摘）

## GPT-5-Codex：

	🚨 P0: セキュリティの問題
	ユーザー入力が直接SQLクエリに使用されています。
	SQLインジェクションのリスクがあります。

	[詳細な説明とテストケース]

「1つか2つの本当に重要な問題だけを教えてくれます。時間を無駄にしません」



## レビュースレッドの独立性

```
	実装スレッド（バイアスあり）
	「この方法で実装する！」
	　↓
	　❌ 客観的な視点が失われる

	レビュースレッド（バイアスなし）
	「新鮮な目で確認」
	　↓
	　✅ 問題を発見しやすい

```




## 用意

### plans.md 戦略で必要なファイル
- GitHub Copilotを制御する指示書: `copilot-instructions.md`
- plans.md 戦略の実行を制御する指示書: `AGENTS.md`
- plans.md 戦略本体: `plans.md`
- GitHub Copilot の起動トリガー（/plans）: `plans.prompt.md`
- GitHub Copilot の起動トリガー（/review）: `review.prompt.md`

※トリガーはGitHub Copilot chat欄にスラッシュコマンドを入力することで起動します。
スラッシュコマンドとは単語の前にスラッシュ記号を付けて実行されるGitHub Copilotの機能です。
GitHub Copilotのプロンプトファイルの使い方を十分に理解して利用してください。
作成方法や実行方法などは、GitHub Copilotの公式ドキュメントを参照してください。

### ExecPlan

copilot-instructions.md にExecPlanを使用する際のシンプルなルールを記述します。
* ユーザーがショートハンドとして使用できる用語
* 計画文書を使用する際のシンプルなルール
を記述します。
ここでは、それを "ExecPlan" と呼びます。

### copilot-instructions.md

GitHub CopilotやVSCodeに対する指示を書きます。

※AGENTS.mdと一つにまとめても全然構いません。

### AGENTS.md

plans.md戦略に対する指示を書きます。

※copilot-instructions.mdと一つにまとめても全然構いません。

### plans.md

Codexエージェントが**大規模なプロジェクトや複雑なコード変更**に取り組む際に、計画を立て、その進捗を追跡するために利用する文書が**`plans.md`**です。Next.jsでToDoリストを実装するなどの複雑なタスクをCodexに委任する際、このファイルが設計と実行の中心的な役割を果たします。

## `plans.md`の使用手順（Codexとの協働）

### 1. 環境とルールの設定
Codexに`plans.md`を確実に使用させるため、環境とルールを設定します。

* **Codexの準備:** IDE拡張機能やCLIなど、任意の環境でCodexを利用できるように準備します。
* **ルール設定（`AGENTS.md`）:** リポジトリ内の`AGENTS.md`に、複雑な作業を行う際のルールを記述します。「実行計画（ExecPlan）」とは何か、**`plans.md`を参照し、その計画に従う**ことをCodexに指示します。

---

### 2. 計画の作成依頼
ユーザーは、Codexに対してToDo機能の設計と計画作成を依頼します。

* **機能の概要提示:** ToDo機能の「最終的な状態（end state）」や必要なライブラリ、Next.jsの構造などをプロンプトとして伝えます。
* **計画作成の依頼:** ユーザーはCodexに対し、「この機能（ToDoリスト実装）を実装するための**プランを作成してほしい**」と依頼します。この際、計画を特別なものとして認識させるため、「ExecPlan」などの特定の用語をアンカーとして与えることが推奨されます。

---

### 3. 計画（`plans.md`）のレビューと承認
Codexは依頼を受けて`plans.md`を作成します。これはユーザーが実装開始前に確認し、フィードバックを与える設計ドキュメントとなります。

* **`plans.md`の内容:**
    * **全体像（Big Picture）**
    * **ToDoリスト（To-do list）**：具体的な実装ステップ。
    * **進捗状況（Progress）**
    * **発見と驚き（Surprises and Discoveries）**
    * **決定ログ（Decision Log）**
* **機能:** `plans.md`は「**生きているドキュメント**」（living document）として機能し、Codexが大規模な計画に取り組む際の**記憶**となります。
* **実行の指示:** 計画に問題がなければ、ユーザーはCodexに「実行（implement/execute）してほしい」と指示します。

---

### 4. 計画の実行と進捗管理
Codexは`plans.md`のToDoリストに基づき、実装作業を長時間（数時間）継続します。

* **Codexによる検証ループ:** Codexはコードの記述に加え、既存のテストを実行し、テストに合格するまでコードを修正し続けます（TDDワークフロー）。
* **人間の監視と介入:** ユーザーはテストの実行状況や作業ログを監視します。テストが長時間失敗し続けるなど、作業が計画から逸脱している場合は介入し、「計画を少し戻す必要があるかもしれない」といった指示を与えることができます。

---

### 5. 完了の確認と最終レビュー
Codexが実装タスクを完了した後、最終的な成果物を確認し、品質を確保します。

* **完了サマリーの確認:** 実装完了後、`plans.md`の「進捗（Progress）」セクションを確認します。`plans.md`は**エグゼクティブサマリー**として機能し、達成された主要な項目（機能、ドキュメントの更新など）をチェックリスト形式で示します。
* **徹底的なコードレビューの依頼:** ToDo機能のコードが完成した後、Codexに対し、さらに`/review`コマンドなどで**コードレビュー**を依頼します。バグが発見された場合は修正を依頼し、再度レビューを行うサイクル（fix and review）を繰り返します。

このプロセスにより、`plans.md`はCodexが複雑なタスクを忘れたり、方向性を見失ったりすることなく、長期にわたって厳密な計画を遂行するための「設計図」および「記憶」として利用されます。

### レビュー用のプロンプトファイルの作成

※Codex CLI には /review コマンドが用意されていますが、GitHub Copilot にはありませんので自作する必要があります。
GitHub Copilot のプロンプトファイルを使ってレビューのプロンプトファイルを作ります。

### plans.prompt.md
このファイルにAIに書いてもらった設計書を記載しています。
起動前に、設計書を `plans.md` に読んでもらうように指示しています。
起動するとコードの実装が始まります。


### review.prompt.md
コード実装後に、GPT-5-Codex(別AIでも可) にレビューを依頼するためのトリガーです。
実装されたコードのレビューをしてもらいます。



## 起動方法(トリガー)
GitHub Copilot のチャット欄に以下を入力すると、それぞれの機能が起動します。

- `/plans` — plans.md 戦略を起動 モデルは GPT-5-Codex を使用 もしくは別のAIを使用
- `/review` — レビューを実施 GPT-5-Codex もしくは別のAIを使用

GPT-5-Codexは、コードレビューの実施と重大な欠陥の発見に特化した学習を受けています。
レビューを別のAIに任せると客観的な評価が得られます。

※GitHub Copilotのpromptシステムを十分に理解して利用してください。

## ドキュメントの更新
`AGENTS.md`に、コードの変更があった場合、`docs\index.md`のドキュメントも同時に更新するように指示しています。

## 主要ファイル

### ファイルの構成

```構成
.github
├── bak
│   └── plans.bak
├── prompts
│   ├── AGENTS.md
│   ├── plans.md
│   ├── plans.prompt.md
│   └── review.prompt.md
└── copilot-instructions.md

```

### GitHub Copilot 関連指示ファイル
- .github/copilot-instructions.md # GitHub Copilot用の指示ファイル

### plans.md 戦略関連指示ファイル
- AGENTS.md # plans.md戦略用の指示ファイル
- plans.md # 唯一の生きた文書
- plans.prompt.md #トリガー スラッシュコマンド用
- review.prompt.md #トリガー スラッシュコマンド用

※promptsフォルダ内においてるのはまとめて置いておいたほうが編集しやすいから。

### その他
- plans.bak # plans.mdのバックアップファイル


## 具体的なplans.mdの使用手順

設計書をplans.prompt.mdに設定できたら。

スラッシュコマンド
`/plans`
`/review`
を往復します。

必要なら人の手で修復を行います。

## レビュー作業の流れ

```
# 基本的な使い方
## 1. レビュー実行
/review

## 2. 問題が見つかった場合
「この問題を修正してください」

## 3. 修正後、再度レビュー
/review

## 4. このように、問題がなくなるまで繰り返します。

## 5. 最終確認
git add .
git commit -m "機能実装完了"
git push origin codex

PRを作成します。

```


# Tips

* 要件定義書、設計書の段階で機能を絞り、シンプルに作ります。
全体を一気に実装しようとしても失敗しやすいです。

---

* plans.mdを複製して、git worktreeで並列開発します。
(最近はVSCodeに「マージをAIに任せられる機能」が追加されたのでコンフリクトしても楽です。)
他にも、plans.mdを別のCLI(claude code,Gemini CLI)や、別のIDE(Cursor, Windsurf)に機能実装をやらせることも出来ます。

---

* 自力回復できるスキルがある人向け
バグループなど解決困難になった場合
解決困難なソースコードをもとに
plans.bak(バックアップ用plans.md)を元に新しくplans.mdを用意します。
「現在のソースコードを元に、AIに指示するためのplanをplans.mdに出力してくだい。」と指示します。
そのplans.mdをみてバグの原因になりそうな部分を見つけます。
変に複雑な指示になっている箇所が怪しい場合が多いです。
これを適切に修正すると良くなる場合が多いです。
その部分を直したら、再度plans.mdを実行するとうまくいくと思います。

---

* 自分なりの
要件定義書や設計書を書くのが得意なAIは？
コード生成が得意なAIは？
レビューが得意なAIは？
テストを書くのが得意なAIは？は
ドキュメントを書くのがが得意なAIは？
を見つけておきます。

---

実行計画が間違っていた場合は？
その部分は人間が良く見ておく必要があります。
AIをペアプログラマーの相方として扱ってください。

---

実装の途中で間違った方向に行ってしまったかどうかを知るには？
テスト駆動開発で開発を行い、そのテストを監視するなど工夫をします。
毎回レビューでチェックを行います。

---

👇️UIを作る時に指示書に追加します。
UIを実装したら、必ずスクリーンショットを生成して
視覚的に検証してください。

デザインと完全に一致するまで、
微調整を繰り返してください。
生成されたスクリーンショットを確認し、
デザインと一致しているか検証してください。

---

👇️UIを作る時に指示書に追加します。

このデザインを実装してください。
[AIやFigma等で生成したUIモックアップの画像を添付]
[スナップショット]

---

長時間作業のコツ

```
1. 最初に全体計画を立てさせる
2. 進捗を plans.md で管理させる
3. 定期的にテストを監視
4. 必要に応じて軌道修正

```

---





## 参考URL
plans.md 戦略の解説（外部）: Qiita 記事等をご参照ください。

GPT-5-Codex の概要 npaka
https://note.com/npaka/n/n8538f2ad7004

Shipping with Codex - YouTube
https://www.youtube.com/watch?v=Gr41tYOzE20

【保存版】OpenAIのエンジニアが語る開発を１０倍速にするCodeXの使い方大全：バイブコーディングで設計→実装→レビューまで自動化｜チャエン | 重要AIニュースを毎日発信⚡️
https://note.com/chaen_channel/n/n68e6ae9df467

コードレビューから大規模リファクタリングまで：OpenAIエンジニアが明かすCodex活用技法｜Zenk
https://note.com/honest_murre2984/n/na079bc306227

### codex_exec_plans.md

https://github.com/openai/openai-cookbook/blob/main/articles/codex_exec_plans.md



# 感想
GPT-5-Codex が高性能でコードの実装能力やレビューに特化した学習を受けていることがわかりました。
それに、AIがMCPなどを利用してネットにつながった今、指示書にいろいろな設定を書くよりも
ネットから最新の情報を直接取得したほうが良い場合があります。
なので、Webアプリ特有の指示以外はネットから情報を取得してもらうことで、
指示書をできるだけシンプルに保つことが出来るようになりました。