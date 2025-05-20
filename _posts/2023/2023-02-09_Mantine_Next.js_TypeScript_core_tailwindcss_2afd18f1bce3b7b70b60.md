<!--
title:   Mantine Core 一覧 (ReactのUIコンポーネントライブラリ )
tags:    Mantine,Next.js,TypeScript,core,tailwindcss
id:      2afd18f1bce3b7b70b60
private: false
-->
# Mantine Core ページ

https://mantine.dev/core/app-shell/

※2023年2月9日現在 Version 5.10.0 Coreのトップページがない、`https://mantine.dev/core/`が404扱いになっている。

# 関連ページ

https://qiita.com/masakinihirota/items/2cc35f848896d40b8ff3

# Mantineのcore一覧

|Layout |	説明	 |
|---|---|
|[AppShell](https://mantine.dev/core/app-shell/ "AppShell") |ヘッダー、ナビゲーションバー、フッター 、サイドバーなどがまとめてあり、簡単にコンテンツレイアウトを実装できます。また、特定のルートにのみ有効になるようにReact Routerを使用してAppShellを設定できます。|
|[AspectRatio](https://mantine.dev/core/aspect-ratio/ "AspectRatio") |レスポンシブな一貫した幅と高さの比率を維持します。イメージ、マップ、ビデオなどの他のメディアを表示するために使用できます。|
|[Center](https://mantine.dev/core/center/ "Center") |コンテンツを縦方向と横方向にセンタリングします。要素を中央に配置します。|
|[Container](https://mantine.dev/core/container/ "Container") |コンテナは最も基本的なレイアウト要素で、コンテンツを水平方向にセンタリングし、テーマから水平方向のパディングを追加します。Componentは以下のpropを受け付けます。コンテンツを水平方向に中央揃えし、テーマから水平パディングを追加する最も基本的なレイアウト要素です。|
|[Flex](https://mantine.dev/core/flex/ "Flex") |レスポンシブなプロップを提供するコンポーネントであり、基本的な方向性（column）とスマートフォン用の方向性（row）を設定できる。また、間隔を設定することも可能であり、baseやsmなどの値を使用して調整できます。|
|[Grid](https://mantine.dev/core/grid/ "Grid") |デフォルトで12列のレイアウトを使用しています。columnsプロパティをGridコンポーネントに設定することで、これを変更することができます。|
|[Group](https://mantine.dev/core/group/ "Group") |水平方向のflexコンテナー内の要素やコンポーネントを構成します。|
|[MediaQuery](https://mantine.dev/core/media-query/ "MediaQuery") |与えられたメディアクエリが一致する場合、子要素にスタイルを追加します。|
|[SimpleGrid](https://mantine.dev/core/simple-grid/ "SimpleGrid") |シンプルなフレックスボックスコンテナで、各子要素はカラムとして扱われます。各列は同じ量のスペースを取り、グリッドコンポーネントとは異なり、列のスパンを制御することはできません。各子要素を列として扱うシンプルなFlexboxコンテナです。各列は等しいスペースを取り、Gridコンポーネントとは異なり、行数を指定する必要がありません。|
|[Space](https://mantine.dev/core/space/ "Space") |要素間に水平または垂直のスペースを追加するために使用されます。|
|[Stack](https://mantine.dev/core/stack/ "Stack") |垂直なFlexコンテナー内の要素やコンポーネントを組み合わせるためのツールであり、インポートすることができます。Stackはレイアウトを容易に行うことができ、コンテナー内の各要素の間隔を調整したり、サイズを変更したりすることが可能です。|

|Buttons |	説明	 |
|---|---|
|[ActionIcon](https://mantine.dev/core/action-icon/ "ActionIcon") |色のプロパティは、theme.colors（カラーインデックス参照を含む）のキーのみを受け入れます。disabledプロパティがtrueの場合、ルート要素にdata-disabled属性が付与されます。loadingプロパティがtrueの場合、ルート要素にdata-loading属性が付与されます。|
|[Button](https://mantine.dev/core/button/ "Button") |ローディング状態を制御し、Loaderコンポーネントを指定するためのプロパティ（loading、loaderPositionなど）を使用できます。ボタンやリンクをmantineテーマのボタンスタイルでレンダリングします。|
|[CloseButton](https://mantine.dev/core/close-button/ "CloseButton") |CloseButtonは、クローズアイコンを持つプレメードのActionIconです。このコンポーネントは、ActionIconと同じプロパティを受け取り、さらにアイコンの幅と高さを制御するためのiconSizeプロパティを受け取ります。|
|[CopyButton](https://mantine.dev/core/copy-button/ "CopyButton") |use-clipboard フックに基づいています。その子要素は、次のプロパティを持つオブジェクトを受け取るボタンです。|
|[FileButton](https://mantine.dev/core/file-button/ "FileButton") |ファイルを選択するためのボタンを提供します。FileButtonには、追加のプロパティを渡すオプションがあり、フォームコンポーネントと組み合わせて使用することもできます。|
|[UnstyledButton](https://mantine.dev/core/unstyled-button/ "UnstyledButton") |デフォルトのボタンスタイルをリセットするために使用され、カスタムボタンを作成することができます。|

|Inputs |	説明	 |
|---|---|
|[Autocomplete](https://mantine.dev/core/autocomplete/ "Autocomplete") |ユーザー入力に任意のオプションをオートコンプリートします。データオブジェクトに追加のプロパティを追加して、アイテムをフィルタリングするためのフィルタ関数を作成することで変更できます。|
|[Checkbox](https://mantine.dev/core/checkbox/ "Checkbox") |ユーザーがオプションを選択したり、状態を変更したりできます。|
|[Chip](https://mantine.dev/core/chip/ "Chip") |複数のChipを同時に選択できるようにするために、子Chipコンポーネントの状態を管理するChip.Groupコンポーネントです。|
|[ColorInput](https://mantine.dev/core/color-input/ "ColorInput") | カラーピッカーのフォームタグを実装します。onChange コールバック関数を使用して、入力値が変更されたときにアクションを実行できます。|
|[ColorPicker](https://mantine.dev/core/color-picker/ "ColorPicker") |インラインカラーピッカーです。Mantine CoreからText、Stackなどをインポートして使用できます。|
|[FileInput](https://mantine.dev/core/file-input/ "FileInput") |ユーザーからのファイルをキャプチャするためのAPIです。これは、ユーザーがアップロードしたファイルを取得して処理するために使用されます。|
|[Input](https://mantine.dev/core/input/ "Input") |カスタム入力を作成するための基本コンポーネント。（重要：他の入力のためのベースであり、直接使用するように設計されていません。）|
|[JsonInput](https://mantine.dev/core/json-input/ "JsonInput") |Textareaコンポーネントをベースにしており、Jsonバリデーションロジックと、入力値をぼかしながらフォーマットするオプションが含まれています。|
|[MultiSelect](https://mantine.dev/core/multi-select/ "MultiSelect") |カスタムアイテムコンポーネントを必要としない場合や、表示ラベルをデフォルトと異なるものにする場合に使用できる2つの異なるデータ形式をサポートしています。文字列の配列とオブジェクトの配列です。ユーザーが与えられたデータから任意の量のオプションを選択することができます。|
|[NativeSelect](https://mantine.dev/core/native-select/ "NativeSelect") |多くのオプションに限定されたユーザーのフィードバックを得ることができます。次のフォーマットのデータを受け入れます：文字列の配列（アイテムの値がラベルと同じ場合）、オブジェクトの配列。|
|[NumberInput](https://mantine.dev/core/number-input/ "NumberInput") |小数点以下の桁数を指定して、小数点以下の値を変更できるようにするコンポーネントです。ユーザーから入力された番号をキャプチャ|
|[PasswordInput](https://mantine.dev/core/password-input/ "PasswordInput") |ユーザーからパスワードを取得し、表示/非表示を切り替え可能です。ユーザーからパスワードを取得する必要がある場合に使用します。コンポーネントは、パスワードの可視性を切り替えるオプションを提供します。|
|[Radio](https://mantine.dev/core/radio/ "Radio") |ラベルを付けたり、チェックボックスを無効にしたりすることができるReactコンポーネントです。|
|[Rating](https://mantine.dev/core/rating/ "Rating") |値を受け取ってレーティングを表示することができます。値は0から5までの小数点以下2桁までの数値で設定可能です。|
|[SegmentedControl](https://mantine.dev/core/segmented-control/ "SegmentedControl") |アイテムコンポーネントをカスタマイズする必要がない場合やラベルを異なる表示する必要がある場合に使用する2つの異なるデータフォーマットをサポートしています。複数セグメントによる水平制御をします。|
|[Select](https://mantine.dev/core/select/ "Select") |ユーザーが与えられたデータから1つのオプションを選ぶことができます。NativeSelectでは不可能なカスタム値の選択を作成する必要がある場合に、このコンポーネントを使用します。与えられたデータから1つのオプションを選択することを可能にします。カスタム値の選択が必要な場合に使用します。|
|[Slider](https://mantine.dev/core/slider/ "Slider") |さまざまな値からユーザー フィードバックを取得します。|
|[Switch](https://mantine.dev/core/switch/ "Switch") |ユーザーからのブーリアン入力を取得します。|
|[Textarea](https://mantine.dev/core/textarea/ "Textarea") |テキストエリアをオプションのオートサイズバリアントでレンダリングします。|
|[TextInput](https://mantine.dev/core/text-input/ "TextInput") |ユーザーからの文字列入力をキャプチャします。|
|[TransferList](https://mantine.dev/core/transfer-list/ "TransferList") |2 つのリスト間でアイテムを移動出来ます。|

|Navigation |	説明	 |
|---|---|
|[Anchor](https://mantine.dev/core/anchor/ "Anchor") |テーマ スタイルのリンクを表示します。|
|[Breadcrumbs](https://mantine.dev/core/breadcrumbs/ "Breadcrumbs") |指定されたセパレーターで（デフォルトでは/）を間に配置します。|
|[Burger](https://mantine.dev/core/burger/ "Burger") |開閉メニューボタンを描画します。|
|[NavLink](https://mantine.dev/core/nav-link/ "NavLink") |ナビゲーションリンクを作ります。|
|[Pagination](https://mantine.dev/core/pagination/ "Pagination") |アクティブなページを表示し、複数のページ間を移動することができます。|
|[Stepper](https://mantine.dev/core/stepper/ "Stepper") |ステップシーケンスに分けられたコンテンツを表示します。|
|[Tabs](https://mantine.dev/core/tabs/ "Tabs") |タブによるビューの切り替え。すべてのタブの色を変更するにはTabsコンポーネントの色を設定し、個々のタブの色を変更するにはTabs.Tabの色を設定します。また、反転されたタブもサポートされています。|

|Data display |	説明	 |
|---|---|
|[Accordion](https://mantine.dev/core/accordion/ "Accordion") |コンテンツを折りたたみ可能なセクションに分割します。|
|[Avatar](https://mantine.dev/core/avatar/ "Avatar") |ユーザープロフィール画像、イニシャルまたはフォールバックアイコンを表示する等の多様な機能を持っています。|
|[BackgroundImage](https://mantine.dev/core/background-image/ "BackgroundImage") |画像を背景として表示します。|
|[Badge](https://mantine.dev/core/badge/ "Badge") |バッジ、ピル、タグを表示します。|
|[Card](https://mantine.dev/core/card/ "Card") |ImageとDividerコンポーネントのコンテキストスタイルを持つカードです。|
|[ColorSwatch](https://mantine.dev/core/color-swatch/ "ColorSwatch") |ディスプレイの色見本を表示します。|
|[Image](https://mantine.dev/core/image/ "Image") |オブジェクトフィット、半径、プレースホルダーを変更するオプションを備えたimg要素のラッパーです。|
|[Indicator](https://mantine.dev/core/indicator/ "Indicator") |ある要素の隅に、さらなる要素を追加表示します。|
|[Kbd](https://mantine.dev/core/kbd/ "Kbd") |キーボードのボタンやキーの組み合わせを表示する。Ctrl + Kなどのキーストロークを表示するために使用されます。|
|[Spoiler](https://mantine.dev/core/spoiler/ "Spoiler") |コンテンツの長い部分を隠します。maxHeight プロパティを渡すと、コンテンツがスポイラーの下に隠されるポイントや、余分な部分の表示/非表示を制御できます。スポイラーとは重要な部分を暴露してしまう事です。|
|[ThemeIcon](https://mantine.dev/core/theme-icon/ "ThemeIcon") |要素内のアイコンをテーマカラーでレンダリングします。|
|[Timeline](https://mantine.dev/core/timeline/ "Timeline") |イベント一覧を時系列で表示します|

|Overlays |	説明	 |
|---|---|
|[Affix](https://mantine.dev/core/affix/ "Affix") |Portalコンポーネント内に固定位置のdiv要素をレンダリングする機能です。このコンポーネントを使用すると、画面上の任意の位置に固定された要素を表示できます。affix=添付する、貼る 書き添える|
|[Dialog](https://mantine.dev/core/dialog/ "Dialog") |DialogはModalコンポーネントの簡略版です。アクセシビリティやユーザビリティに配慮したModalの機能はほとんど含まれていません。ダイアログは、重要でない情報やアクションで注意を引くために使います。|
|[Drawer](https://mantine.dev/core/drawer/ "Drawer") |画面の任意の位置にオーバーレイ領域を表示します。|
|[HoverCard](https://mantine.dev/core/hover-card/ "HoverCard") |対象要素にカーソルを合わせたときにポップオーバー部を表示します。|
|[LoadingOverlay](https://mantine.dev/core/loading-overlay/ "LoadingOverlay") |センターローダーで指定されたコンテナ上にオーバーレイする。|
|[Menu](https://mantine.dev/core/menu/ "Menu") |セカンダリーアクションのリストを1つのインタラクティブエリアにまとめることができます。|
|[Modal](https://mantine.dev/core/modal/ "Modal") |ダイアログ、ポップオーバー、ライトボックスなどを作成するための強固な基盤を提供するコンポーネントを作ります。|
|[Overlay](https://mantine.dev/core/overlay/ "Overlay") |指定された要素を任意の色と不透明度でdiv要素に重ね合わせます。|
|[Popover](https://mantine.dev/core/popover/ "Popover") |指定されたターゲット要素からの相対パスでポップオーバー部を表示します。|
|[Tooltip](https://mantine.dev/core/tooltip/ "Tooltip") |マウスオーバーなどのイベント発生時に、指定された要素にツールチップを表示します。|

|Aa Typography |	説明	 |
|---|---|
|[Blockquote](https://mantine.dev/core/blockquote/ "Blockquote") |引用・転載文であることを示すタグを作ります。|
|[Code](https://mantine.dev/core/code/ "Code") |シンタックスハイライトを使用しないインラインまたはブロックコードです。デフォルトでは、コードの色はグレーですが、theme.colorsから任意の色に変更できます。|
|[Highlight](https://mantine.dev/core/highlight/ "Highlight") |文字列の一部をマークタグで強調表示します。LightとDarkのテーマをサポートしています。|
|[List](https://mantine.dev/core/list/ "List") |順序付きリストまたは非順序付きリストを表示します。リストの先頭にアイコンを付けたり、ネストさせて表示したりする事が出来ます。|
|[Mark](https://mantine.dev/core/mark/ "Mark") |テキストの一部を強調表示します。|
|[Table](https://mantine.dev/core/table/ "Table") |テーマスタイルでテーブルをレンダリングします。|
|[Text](https://mantine.dev/core/text/ "Text") |テーマスタイルでテキストやリンクを表示するコンポーネントです。|
|[Title](https://mantine.dev/core/title/ "Title") |タイトルタグをh1-h6 での見出しで表示するコンポーネントです。|
|[TypographyStylesProvider](https://mantine.dev/core/typography-styles-provider/ "TypographyStylesProvider") |htmlコンテンツにMantineのタイポグラフィースタイルを追加します。TypographyStylesProviderは、段落、見出し、リスト、引用、テーブル、リンク、画像、hr、コードおよびpreなどのスタイルを含んでいます。|

|Feedback |	説明	 |
|---|---|
|[Alert](https://mantine.dev/core/alert/ "Alert") |重要な静的メッセージを使用してユーザーの注意を引き付けるためのツールです。|
|[Loader](https://mantine.dev/core/loader/ "Loader") |ロード中の状態を表すアイコンを表示します。サイズを制御することで高さまたは幅（バリアントによって異なります）を調整できます。事前定義されたサイズ（xs、sm、md、lg、xl）を使用するか、数値を使用してサイズを指定できます。|
|[Notification](https://mantine.dev/core/notification/ "Notification") |ユーザーへの動的な通知とアラートの表示、通知システムの一部です。|
|[Progress](https://mantine.dev/core/progress/ "Progress") |タスクの状況をユーザーにフィードバックします。、必要なプロップ値（%で埋められたバーの幅）を渡すことでバーの色を変更できます。また、例えばコンポーネントを使用してインタラクティブなプログレスバーを作成する事ができます。|
|[RingProgress](https://mantine.dev/core/ring-progress/ "RingProgress") |タスクの進捗状況を円グラフでユーザーにフィードバックします。|
|[Skeleton](https://mantine.dev/core/skeleton/ "Skeleton") |コンテンツをロードするためのプレースホルダーを作成します。(プレースホルダーとは、入力欄に入力例などのテキストを薄いグレーで表示し、入力方法をユーザーに提示することができる機能です。 )|

|その他 (Miscellaneous) |	説明	 |
|---|---|
|[Box](https://mantine.dev/core/box/ "Box") |sx propを使用して任意の要素やコンポーネントにインラインスタイルを追加します。|
|[Collapse](https://mantine.dev/core/collapse/ "Collapse") |スライドダウン トランジションを使用してアニメーションプレゼンスを実現する機能です。|
|[Divider](https://mantine.dev/core/divider/ "Divider") |水平もしくは垂直な仕切り線を引きます、太さの変更や、ラベルを追記できます。|
|[FocusTrap](https://mantine.dev/core/focus-trap/ "FocusTrap") |モーダルウィンドウ内のフォーカスを囲い込むためのテクニックです。これは、ユーザーがモーダルウィンドウから外部にフォーカスを移動させないようにするために使用されます。|
|[Paper](https://mantine.dev/core/paper/ "Paper") |配色によって白または暗い背景を描画します。白（または黒）の背景に、テーマの影、境界半径、パディングをレンダリングします。|
|[Portal](https://mantine.dev/core/portal/ "Portal") |現在のコンテキスト以外のコンポーネントをレンダリングします、コンポーネントや要素を異なる場所にレンダリングするためのツールであり、親のスタイルを防ぐ必要がある場合に便利です。|
|[ScrollArea](https://mantine.dev/core/scroll-area/ "ScrollArea") |カスタムスクロールバー付きエリアを作ります。
|[Transition](https://mantine.dev/core/transition/ "Transition") |あらかじめ用意されたアニメーションでコンポーネントの存在をアピールします。



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

Perplexity.aiは、AIを用いた質問応答サービスで、日本語にも対応している。Perplexityとは、ある事象に対して、別の事象が発生した際の頻度（確率）を対数を組み合わせて表す機械学習の指標です。



https://qiita.com/masakinihirota/items/5e38d446fc5494a31b91

# mantineの公式サイト

https://mantine.dev/

# Mantine関連の便利なサイト

https://icflorescu.github.io/mantine-datatable

mantineの派生サイト？？？
公式にもリンクはみつからず、独自のサイトか？
