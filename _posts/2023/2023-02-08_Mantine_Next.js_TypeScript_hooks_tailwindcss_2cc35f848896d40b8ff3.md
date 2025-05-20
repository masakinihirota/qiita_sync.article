<!--
title:   Mantine Hooks 一覧 (ReactのUIコンポーネントライブラリ )
tags:    Mantine,Next.js,TypeScript,hooks,tailwindcss
id:      2cc35f848896d40b8ff3
private: false
-->
# Mantine Hooks ページ

https://mantine.dev/hooks/use-counter/

※2023年2月9日現在 Version 5.10.0 Hooksのトップページがない、`https://mantine.dev/hooks/`が404扱いになっている。

# 関連ページ

https://qiita.com/masakinihirota/items/2afd18f1bce3b7b70b60

# MantineのHooks一覧

|状態管理 |	説明	 |
|---|---|
|	[use-counter](https://mantine.dev/hooks/use-counter/ "use-counter") 	|	与えられた境界の中で状態を増減させるhookです。	|
|	[use-debounced-state](https://mantine.dev/hooks/use-debounced-state/ "use-debounced-state") 	|	値の変更を遅延させるhookです。Reactの状態に基づいて重い操作を実行したい場合などに便利です	|
|	[use-debounced-value](https://mantine.dev/hooks/use-debounced-value/ "use-debounced-value") 	|	値の変更を遅延させるhookです。Reactの状態に基づいて重い操作を実行したい場合に便利です。	|
|	[use-disclosure](https://mantine.dev/hooks/use-disclosure/ "use-disclosure") 	|	モーダル開閉制御などのブール状態を管理するフックです。open、close、toggleハンドラを提供し、オプションのonOpenおよびonCloseコールバックを受け入れます。	|
|	[use-id](https://mantine.dev/hooks/use-id/ "use-id") 	|	レンダリングを超えて持続するランダムなIDを生成するフックです。このフックは、通常、入力要素をラベルにバインドするために使用されます。生成されたランダムなIDはrefに保存されます。	|
|	[use-idle](https://mantine.dev/hooks/use-idle/ "use-idle") 	|	与えられた時間 (ms) の間、ユーザーが何もしなかったかどうかを検出します。	|
|	[use-input-state](https://mantine.dev/hooks/use-input-state/ "use-input-state") 	|	入力値の状態を管理します。ネイティブとカスタム入力の状態。	|
|	[use-interval](https://mantine.dev/hooks/use-interval/ "use-interval") 	|	開始インターバル、停止インターバル、トグルインターバル、現在のインターバルステータスを返すオブジェクトを提供します。	|
|	[use-list-state](https://mantine.dev/hooks/use-list-state/ "use-list-state") 	|	ReactのuseStateフックに似たような形式で、配列を1つの引数として受け取り、リストの値とそれらを変更するためのハンドラーをタプルで返す。このフックは、リスト内の値を追加、削除、置き換えなどの操作を行うための関数を提供します。	|
|	[use-local-storage](https://mantine.dev/hooks/use-local-storage/ "use-local-storage") 	|	localStorageからの値をReactステートとして使用することを可能にします。HookはuseStateと同じように動作しますが、値もlocalStorageに書き込みます。	|
|	[use-pagination](https://mantine.dev/hooks/use-pagination/ "use-pagination") 	|	より柔軟な制御が必要な場合に使用できるフックです。@mantine/hooksからexportされています。ページネーションコンポーネントを作成するために使用できます。	|
|	[use-previous](https://mantine.dev/hooks/use-previous/ "use-previous") 	|	開発者がコンポーネントを作成する際に使用できる機能であり、以前のバージョンから変更されたプロパティを取得して再利用することができます。	|
|	[use-queue](https://mantine.dev/hooks/use-queue/ "use-queue") 	|	現在の状態のデータ量を制限し、残りのデータをキューに入れる機能です。例えば、@mantine/notificationsパッケージでは、現在の状態にあるデータ量を制限することができます。	|
|	[use-set-state](https://mantine.dev/hooks/use-set-state/ "use-set-state") 	|	クラスコンポーネント内のthis.setStateと同様に動作します。これは、現在の状態に部分的な状態を浅くマージするものです。	|
|	[use-timeout](https://mantine.dev/hooks/use-timeout/ "use-timeout") 	|	指定されたミリ秒後にコールバック関数を呼び出すタイマーを設定するためのAPIです。	|
|	[use-toggle](https://mantine.dev/hooks/use-toggle/ "use-toggle") 	|	与えられた値を切り替えるためのフックです。これは、状態パターンの共通的なパターンを実装します。	|
|	[use-uncontrolled](https://mantine.dev/hooks/use-uncontrolled/ "use-uncontrolled") 	|	制御されるコンポーネントと制御されないコンポーネントの両方の状態を管理することができます。	|
|	[use-validated-state](https://mantine.dev/hooks/use-validated-state/ "use-validated-state") 	|	状態が設定されるたびに与えられたルールで状態を検証します。それは、現在の検証状態、最後の正しい値、およびエラーメッセージを含むオブジェクトを返します。	|

|UI and Dom |	説明	 |
|---|---|
|	[use-click-outside](https://mantine.dev/hooks/use-click-outside/ "use-click-outside") 	|	指定された要素の外側をクリックやタッチイベントを検出した時、何かの処理をしたい場合に便利なhookです。デフォルトでは、use-click-outsideはmousedownとtouchstartイベントを聞き、変更することも可能です。 ドロップダウンメニューなどに使います。	|
|	[use-color-scheme](https://mantine.dev/hooks/use-color-scheme/ "use-color-scheme") 	|	システムのカラースキームを取得するための関数であり、darkまたはlightの値を返します。	|
|	[use-element-size](https://mantine.dev/hooks/use-element-size/ "use-element-size") 	|	指定した要素の幅と高さを取得します。	|
|	[use-event-listener](https://mantine.dev/hooks/use-event-listener/ "use-event-listener") 	|	refが割り当てられた要素にイベントリスナーを追加するものです。HookはaddEventListenerメソッドと同じオプションをサポートします。	|
|	[use-focus-return](https://mantine.dev/hooks/use-focus-return/ "use-focus-return") 	|	指定された条件が満たされたときにフォーカスを最後にフォーカスした要素に自動的に戻す機能です。例えば、モーダルコンポーネントで使用されています。	|
|	[use-focus-trap](https://mantine.dev/hooks/use-focus-trap/ "use-focus-trap") 	|	モーダル、ドロワー、メニューなどでフォーカスを特定のノードに固定するためのツールです。少なくとも1つの入力可能な要素を含むノードが必要であり、ノードがアンマウントされたときにフォーカスがリセットされる。	|
|	[use-focus-within](https://mantine.dev/hooks/use-focus-within/ "use-focus-within") 	|	指定した要素の内部にフォーカスがあるかどうかを検出し真偽値を返すhookです。フォーカスがあたっている時になにかの処理を追加します。	|
|	[use-fullscreen](https://mantine.dev/hooks/use-fullscreen/ "use-fullscreen") 	|	Fullscreen APIを使用して、指定された要素に入り/出ることを可能にするものです。デフォルトでは、refを提供しない場合、フックはドキュメントを対象とします。	|
|	[use-hotkeys](https://mantine.dev/hooks/use-hotkeys/ "use-hotkeys") 	|	最初の引数としてホットキーとハンドラーのタプルの配列を受け入れます：ホットキー - ホットキー文字列（例：ctrl + E、shift + alt + L、mod + Sなど）。	|
|	[use-hover](https://mantine.dev/hooks/use-hover/ "use-hover") 	|	マウスがターゲット要素またはドロップダウン上にあるときにのみ表示されます。ドロップダウン内でアンカーやボタンを使用できますが、入力は推奨されていません。Mantine.uiメニューのホバーカラーを変更するには、CSSを使用します。	|
|	[use-intersection](https://mantine.dev/hooks/use-intersection/ "use-intersection") 	|	Intersection Observer APIを使用して、与えられた要素とスクロールコンテナまたはbody要素との交差情報を取得するMantineのラッパーです。	|
|	[use-media-query](https://mantine.dev/hooks/use-media-query/ "use-media-query") 	|	ブラウザの幅に合わせて変化する機能を追加します。	|
|	[use-mouse](https://mantine.dev/hooks/use-mouse/ "use-mouse") 	|	ビューポートまたは指定された要素からの相対的なマウス位置の取得を取得します。	|
|	[use-move](https://mantine.dev/hooks/use-move/ "use-move") 	|	任意の要素に対する移動動作を処理します。	|
|	[use-reduced-motion](https://mantine.dev/hooks/use-reduced-motion/ "use-reduced-motion") 	|	コンポーネントがマウントされると、useEffectフックが呼び出されます。ほとんどの場合はこれで問題ありませんが、値の変更を追跡する必要がある場合は、マウント時にuseEffectが呼ばれないようにするために、サンプルのような実装が必要になります。	|
|	[use-resize-observer](https://mantine.dev/hooks/use-resize-observer/ "use-resize-observer") 	|	コンポーネントのリサイズを検知するhookです。幅と高さと要素の位置を取得します。	|
|	[use-scroll-into-view](https://mantine.dev/hooks/use-scroll-into-view/ "use-scroll-into-view") 	|	任意の可スクロール要素のスクロール動作を処理します。基本的な使用方法は、element.scrollIntoView()と同じです。	|
|	[use-scroll-lock](https://mantine.dev/hooks/use-scroll-lock/ "use-scroll-lock") 	|	document.body overflowをhiddenに設定して現在の位置でスクロールをロックする機能です。スクロールをロックします。	|
|	[use-viewport-size](https://mantine.dev/hooks/use-viewport-size/ "use-viewport-size") 	|	リサイズとオリエンテーションチェンジイベントを購読し、SSR時には{width: 0, height: 0}を返すフックです。	|

|Utilities |	説明	 |
|---|---|
|	[use-clipboard](https://mantine.dev/hooks/use-clipboard/ "use-clipboard") 	|	navigator.clipboardを操作するためのインターフェイスを提供します。	|
|	[use-document-title](https://mantine.dev/hooks/use-document-title/ "use-document-title") 	|	文書タイトルを設定するために使用されます。値が変更され、かつ空文字列でない場合にフックがトリガーされます。	|
|	[use-document-visibility](https://mantine.dev/hooks/use-document-visibility/ "use-document-visibility") 	|	現在のタブがアクティブかどうかを検出するために使用されるhookであり、document.visibilityStateを返します。	|
|	[use-eye-dropper](https://mantine.dev/hooks/use-eye-dropper/ "use-eye-dropper") 	|	カーソル上の色を選択できます。	|
|	[use-favicon](https://mantine.dev/hooks/use-favicon/ "use-favicon") 	|	ファビコンを切り替えるためのhookです。コンポーネント内でfaviconとして設定する必要があるfavicon URL（サポートされているフォーマット：.ico、.png、.svg、.gif）を渡すためのhookです。URLが変更されるたびにhookがトリガーされます。	|
|	[use-hash](https://mantine.dev/hooks/use-hash/ "use-hash") 	|	URLからハッシュ値を取得したり、ハッシュ変更イベントに購読したり、ハッシュを設定したりすることができるツールです。	|
|	[use-merged-ref](https://mantine.dev/hooks/use-merged-ref/ "use-merged-ref") 	|	複数のrefを使用する必要がある場合に使用するフックです。これは、domノードに渡される関数を返します。	|
|	[use-network](https://mantine.dev/hooks/use-network/ "use-network") 	|	ネットワーク接続の状態を取得するためのJavaScriptフックであり、オンライン/オフラインの状態を取得したり、RTT（Round Trip Time）やダウンリンクなどの情報を取得することができます。	|
|	[use-os](https://mantine.dev/hooks/use-os/ "use-os") 	|	ユーザーのOSを検出するためのツールであり、可能な値はundetermined、macos、ios、windows、android、linuxです。	|
|	[use-page-leave](https://mantine.dev/hooks/use-page-leave/ "use-page-leave") 	|	マウスがページから離れたときに指定した関数を呼び出すものです。	|
|	[use-text-selection](https://mantine.dev/hooks/use-text-selection/ "use-text-selection") 	|	現在のテキスト選択を返すフックであり、テキスト選択を無効にすることができます。例えば、ユーザビリティのために、テキスト選択を無効にすることが望ましい場合があります。	|
|	[use-window-event](https://mantine.dev/hooks/use-window-event/ "use-window-event") 	|	コンポーネントマウント時にウィンドウへのイベントリスナーを追加し、アンマウント時に削除するものです。	|
|	[use-window-scroll](https://mantine.dev/hooks/use-window-scroll/ "use-window-scroll") 	|	現在のスクロール位置を返し、指定された位置にスムーズにスクロールする関数を提供する。	|

|Lifecycle |	説明	 |
|---|---|
|	[use-did-update](https://mantine.dev/hooks/use-did-update/ "use-did-update") 	|	コンポーネントがマウントされると、useEffectフックが呼び出されます。ほとんどの場合はこれで問題ありませんが、値の変更を追跡する必要がある場合は、マウント時にuseEffectが呼ばれないようにするために、サンプルのような実装が必要になります。	|
|	[use-force-update](https://mantine.dev/hooks/use-force-update/ "use-force-update") 	|	状態変更なしにコンポーネントを再レンダリングするための関数であり、関数を呼び出すとコンポーネントが再レンダリングされる。	|
|	[use-isomorphic-effect](https://mantine.dev/hooks/use-isomorphic-effect/ "use-isomorphic-effect") 	|	サーバーサイドレンダリング中にuseEffectを使用し、水平後にuseLayoutEffectを使用することを可能にします。どこでも使用できます。	|
|	[use-logger](https://mantine.dev/hooks/use-logger/ "use-logger") 	|	コンポーネントがレンダリングされるたびに与えられた値をコンソールに記録します。開発ツールを使用してコンソール内の状態変化を確認できます。	|
|	[use-shallow-effect](https://mantine.dev/hooks/use-shallow-effect/ "use-shallow-effect") 	|	参照比較ではなく、浅い依存関係の比較を行うuseEffectと同じように機能します。	|

# Mantineとは？

ReactのUIコンポーネントライブラリで、120種類以上の豊富なコンポーネントとHooksを提供しています。
使いやすさ、アクセシビリティ、開発者体験を重視したネイティブなダークテーマサポートを備えています。
ドキュメントがわかりやすく、Componentの種類が多く、アップデートの頻度が速いなどかなり優れたUIライブラリであると評価されています。

## perplexityで調査

この記事はAIを用いた質問応答サービス

https://www.perplexity.ai/

を利用して調査しました。
一度に全てのHooksを調査することはまだ不可能でしたので、それぞれ個別に検索・調査しました。

`perplexityAI` について日本語で答えてください。

https://www.perplexity.ai/?s=u&uuid=f8a98d79-dec4-414a-8d48-c18c4ea5276a

Perplexity.aiは、AIを用いた質問応答サービスで、日本語にも対応している[1]。Perplexityとは、ある事象に対して、別の事象が発生した際の頻度（確率）を対数を組み合わせて表す機械学習の指標である[1]。

[1]

https://qiita.com/masakinihirota/items/5e38d446fc5494a31b91

# mantineの公式サイト

https://mantine.dev/

# Mantine関連の便利なサイト

https://icflorescu.github.io/mantine-datatable

mantineの派生サイト？？？
公式にもリンクはみつからず、独自のサイトか？
