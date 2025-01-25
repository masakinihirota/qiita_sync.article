<!--
title:   HonoをNext.jsで利用するため調べたメモ(+Supabase)
tags:    Drizzle,Hono,Next.js,Supabase
id:      a6b8e438a76543819f27
private: false
-->
公式ドキュメントからわからいことをAIで聞きつつ書いたメモ





# Next.jsとHonoとは何か？

Next.jsは通常はバックエンドとフロントエンドを兼ねるフレームワークです。
HonoはNext.jsのバックエンドを補強します。

Next.jsのAPIの代わりにHonoを使います。

* APIの代替
* 開発時に、サーバーとクライアント間の型情報の共有
* Middlewareの複数可

という機能が強化されます。

※Next.jsのAPIルートを完全に置き換えるわけではありません。

## Next.jsだけでも機能は十分にあるのになぜHonoを追加するのか？

個人の理由です。

開発中に、tRPCのようなサーバーとクライアント間の型情報を共有ができるからです。
Middlewareも複数ファイル使えます。
Next.jsは1ファイルのみ。(工夫すれば複数枚に分割可能)

ですので、
ある程度の大きさのアプリを作る場合は、Honoを追加したほうが便利なのではと思っています。

## APIの機能をHonoに代替させるなら、Next.jsは？
HonoのAPI機能を使うので、
Next.jsのAPIの機能を使いません。

ファイルの配置場所はNext.jsのルールに従いますが、
クライアント(ブラウザ)からの呼び出しは、Honoのクライアンを利用します。

Routing: Route Handlers | Next.js
https://nextjs.org/docs/app/building-your-application/routing/route-handlers

ブラウザからアクセスするだけでは、Next.jsがURIの位置にアクセスするよう指定しますが、
apiのクライアントはroute.tsにHonoのクライアントを指定するように設定してあります。





----------------------------------------

## インストール

Hono公式サンプル
Next.js版

HonoをNext.jsでインストールします。
途中の選択肢でnextjsを選びます。

```terminal
npm create hono@latest my-app
create-hono version 0.14.3
✔ Using target directory … my-app
? Which template do you want to use? nextjs
? Do you want to install project dependencies? yes インストールをするか？
? Which package manager do you want to use? npm npmでインストール
✔ Cloning the template

cd my-app
code .

```

Next.jsに最小単位のHonoが追加されています。

next 14.2.5

```terminal
npm run dev

 - Local:        http://localhost:3000

```



##

トランスパイル
TypeScriptはJavaScriptに変換します。




## 作成されたHonoのサンプルコード

app\api\[...route]\route.ts

```app\api\[...route]\route.ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

export const GET = handle(app)

```



## データの取得と加工をする場所

```app\api\[...route]\route.ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  // データの取得
  // データの加工
  return c.json({
    message: 'Hello from Hono!'
  })
})

export const GET = handle(app)

```

  // データの取得
  // データの加工
追加部分： 👆この場所でデータの取得と加工を行います。
この機能を別ファイルに抜き出すとコードが見やすくなります。



## リクエストとレスポンス

パスパラメータ、URL クエリ値を取得し、レスポンス ヘッダーを追加する方法は、次のように記述します。

```
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

// GETだけでなくPOST、PUT、DELETEも簡単に処理できます。

app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)

```


```
app.post
app.delete

```
👆 1つのappを、メソッド毎に設定しています。

👇 appを、チェーンメソッドで連結して設定しています。

※チェーンメソッドで設定も出来ます。

```
// チェーンメソッドで複数のルートを設定
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want to see ${page} of ${id}`)
})
.post('/posts', (c) => c.text('Created!', 201))
.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)

```

通常、app一つのインスタンス毎に、全てのHTTPメソッドをまとめて設定します。



## 返り値

返り値はjsonで返しています。

```
  return c.json({
    message: 'Hello from Hono!'
  })

```







----------------------------------------

# Routers

Honoには5つのRouterが用意されています。

* RegExpRouter
* TrieRouter
* SmartRouter
* LinearRouter
* PatternRouter



## Routersの説明

RegExpRouter
JavaScriptの世界で最速のルーターです。ルートパターンを「1つの大きな正規表現」に変換することで、1回のマッチングで結果を取得できます。 多くの場合、radix-tree のようなツリーベースのアルゴリズムを使用する方法よりも高速です。 ただし、RegExpRouter はすべてのルーティングパターンをサポートしているわけではありません。

TrieRouter
Trie-tree アルゴリズムを使用したルーターです。RegExpRouter と同じように線形ループを使用しません。 RegExpRouter ほど高速ではありませんが、Express ルーターよりもはるかに高速です。 TrieRouter は、RegExpRouter とは異なり、すべてのパターンをサポートしています。

SmartRouter
登録されたルーターから推測して最適なルーターを選択します。 Hono は、デフォルトで SmartRouter と 2 つのルーターを使用します。 アプリケーションの起動時に、SmartRouter はルーティングに基づいて最速のルーターを検出し、それを使い続けます。

LinearRouter
RegExpRouter は高速ですが、ルート登録フェーズが少し遅くなる可能性があります。そのため、リクエストごとに初期化する環境には適していません。 LinearRouter は「ワンショット」の状況に最適化されています。 文字列をコンパイルせずに線形アプローチでルートを追加するため、ルート登録は RegExpRouter よりも大幅に高速です。

PatternRouter
Hono のルーターの中で最も小さいルーターです。 Hono はすでにコンパクトですが、リソースが限られている環境でさらに小さくする必要がある場合は、PatternRouter を使用できます。 PatternRouter のみを使用するアプリケーションのサイズは 15KB 未満です。




## Web標準






## Middleware

ミドルウェアは、ハンドラーの前と後に実行されます。つまり、リクエストがハンドラーに届く前に何か処理をしたり、ハンドラーからレスポンスが返ってきた後に追加の処理をしたりします。これを「オニオン構造」と例えられることがあります。オニオンのように、ハンドラーの周りにミドルウェアが層になっているイメージです。

次のように「X-Response-Time」ヘッダーを追加するミドルウェアを記述できます。

```
app.use(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})

```

app.use():
これはミドルウェアを定義するためのメソッドです。リクエストが来るたびにこのミドルウェアが実行されます。

async (c, next) => { ... }:
これは非同期関数で、cはコンテキストを表し、リクエストやレスポンスにアクセスできます。nextは次の処理（ハンドラーや次のミドルウェア）を呼び出すための関数です。

X-Response-Time
ヘッダーに「X-」を付けるのは、独自規格や非標準的なヘッダーであることを示す一般的な慣習です。



## Honoスタックス

Honoスタックは、全ての開発者が簡単に使えるように設計された一連のツールで、特にフルスタックアプリケーションの構築に適しています。

Honoは、REST APIサーバーだけでなく、完全なアプリケーションを構築するための便利なツール群です。

•
Hono: APIサーバーとして機能します。

Zod: バリデーションに使用されます。

Zod Validator Middleware: Zodを用いたバリデーションをHonoで実行するためのミドルウェアです。

hc: 型安全なAPIアクセスを実現するHTTPクライアントです。
	hono clientの略称かと思っていた


これらを使ってAPIサーバーとクライアントを作成します。

getリクエストを受け取り、JSONを返すコードはさっき見ましたね。


### Zod

Zodで検証してクエリパラメータの値を受け取ります。

追加インストール

```terminal
npm i zod @hono/zod-validator

```

----------------------------------------

公式ドキュメント

# Getting Started

はじめる


## Basic

基本

```tsx
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app

```

基本コードではtextを返している

JSONも返せる

```tsx
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

```

### リクエストとレスポンス

パスパラメータ、URL クエリ値

```tsx
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

```

GETだけでなくPOST、PUT、DELETEも簡単に処理できます。

```tsx
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)

```

### HTMLを返す。

```tsx
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})

```

### 生のレスポンスを返す

```
app.get('/', () => {
  return new Response('Good morning!')
})

```

### ミドルウェアの使用

認証で使う場合

```
import { basicAuth } from 'hono/basic-auth'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

```

app.use はMiddlewareを使います。



### アダプタ

プラットフォームに依存する機能用のアダプタがあります。

Cloudflare Workersの例

```
import { upgradeWebSocket } from 'hono/cloudflare-workers'

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    // ...
  })
)

```



## Vercel

Next.jsのデプロイ先の候補の一つです。
Next.jsはVercelがオープンソースで開発しています。

Next.jsではEdge Functionsを使うことでVercelなどのEdge Runtime上で動的なAPIを作成することができます。Honoを使うことで他のランタイムと同じ構文でAPIを記述でき、多くのミドルウェアを利用することができます。

```terminal
npm create hono@latest my-app

```

```app/api/[[...route]]/route.ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'
// export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)

```



## Supabase Functions

Supabase Edge Functions はNext.jsと直接関係なく、関数をSupabaseに直接登録して実行します。

Supabase Edge Functions は、グローバルに分散され、ユーザーの近くで実行されるサーバー側の TypeScript 関数であり、パフォーマンスが向上します。これらの関数はDeno を使用して開発されており、セキュリティの向上や最新の JavaScript/TypeScript ランタイムなど、さまざまな利点があります。

Supabase CLI | Supabase Docs

https://supabase.com/docs/guides/local-development/cli/getting-started

※Supabase CLIがインストール済みであることを確認してください。



```terminal
supabase init

```

### エッジ関数の追加

Supabase プロジェクト内に、次の名前の新しい Edge 関数を作成します

```terminal
supabase functions new hello-world

```

このコマンドは、プロジェクト内に指定された名前の新しい Edge 関数を作成します。

supabase/functions/hello-world/index.ts

```index.ts
import { Hono } from 'jsr:@hono/hono'

// change this to your function name
const functionName = 'hello-world'
const app = new Hono().basePath(`/${functionName}`)

app.get('/hello', (c) => c.text('Hello from hono-server!'))

Deno.serve(app.fetch)

```

### 実行

関数をローカルで実行するには、次のコマンドを使用します。

この機能を実行するには、次のコマンドを使用します。

```terminal
supabase start # start the supabase stack
supabase functions serve --no-verify-jwt # start the Functions watcher

```

※この--no-verify-jwtフラグを使用すると、ローカル開発中に JWT 検証をバイパスできます。

cURL または Postman を使用して GET リクエストを実行します。

`http://127.0.0.1:54321/functions/v1/hello-world/hello`

```terminal
curl  --location  'http://127.0.0.1:54321/functions/v1/hello-world/hello'

```

このリクエストは、「Hello from hono-server!」というテキストを返します。

### デプロイ

1 つのコマンドで、すべての Edge Functions を Supabase にデプロイできます。

```terminal
supabase functions deploy

supabase functions deploy hello-world

```

あるいは、deploy コマンドで関数の名前を指定して、個々の Edge Functions をデプロイすることもできます。

Deploy to Production | Supabase Docs

https://supabase.com/docs/guides/functions/deploy



### Supabase functionsの使い道

APIエンドポイントの構築
ユーザー認証
外部サービスのWebhook処理
データのバリデーション
ビジネスロジックの実装
データの集計



## Ali Function Compute



## Service Worker



## Node.js



----------------------------------------

# API

## App

appは、ベースとなるインスタンスの作成

```
import { Hono } from 'hono'

const app = new Hono()
//...

export default app // for Cloudflare Workers or Bun

```


## Hono のインスタンスには以下のメソッドがあります。

app.HTTP_METHOD([path,]handler|middleware...)
app.all([path,]handler|middleware...)
app.on(method|method[], path|path[], handler|middleware...)
app.use([path,]middleware)
app.route(path, [app])
app.basePath(path)
app.notFound(handler)
app.onError(err, handler)
app.mount(path, anotherApp)
app.fire()
app.fetch(request, env, event)
app.request(path, options)



### app.HTTP_METHOD([path,]handler|middleware...)



### app.all([path,]handler|middleware...)



### app.on(method|method[], path|path[], handler|middleware...)



### app.use([path,]middleware)



### app.route(path, [app])



### app.basePath(path)



### app.notFound(handler)

app.notFound allows you to customize a Not Found Response.

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})



### app.onError(err, handler)

app.onError handles an error and returns a customized Response.

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})


### app.mount(path, anotherApp)

mount() を使用すると、他のフレームワークで構築されたアプリケーションを Hono アプリケーションにマウントできます。

import { Router as IttyRouter } from 'itty-router'
import { Hono } from 'hono'

// Create itty-router application
const ittyRouter = IttyRouter()

// Handle `GET /itty-router/hello`
ittyRouter.get('/hello', () => new Response('Hello from itty-router'))

// Hono application
const app = new Hono()

// Mount!
app.mount('/itty-router', ittyRouter.handle)



### app.fire()

app.fire()は、自動的にグローバルなフェッチイベントリスナーを追加します。
これは、非ESモジュールのCloudflare Workersなど、Service Worker APIを遵守する環境で役立ちます。

addEventListener('fetch', (event: FetchEventLike): void => {
  event.respondWith(this.dispatch(...))
})


### app.fetch(request, env, event)

app.fetchアプリケーションのエントリ ポイントになります。



### app.request(path, options)

request はテストに便利なメソッドです。

URL またはパス名を渡して GET リクエストを送信できます。
appは Response オブジェクトを返します。

test('GET /hello is ok', async () => {
  const res = await app.request('/hello')
  expect(res.status).toBe(200)
})

Request オブジェクトを渡すこともできます。

test('POST /message is ok', async () => {
  const req = new Request('Hello!', {
    method: 'POST',
  })
  const res = await app.request(req)
  expect(res.status).toBe(201)
})










### strict mode

strict modeは次のpathを区別します。
デフォルトでtrueです。

/hello
/hello/

app.get('/hello')
app.get('/hello/')

👆️同じではありません。

const app = new Hono({ strict: false })

falseに設定すると、
同じpathとして扱われます。



### router option

使用するルーターを指定します。
デフォルトのルーターは SmartRouter です。
RegExpRouter を使用する場合は、それを新しい Hono インスタンスに渡します。

```
import { RegExpRouter } from 'hono/router/reg-exp-router'

const app = new Hono({ router: new RegExpRouter() })

```



### Generics

Cloudflare Workers用？

c.set/c.get.

```
type Bindings = {
  TOKEN: string
}

type Variables = {
  user: User
}

const app = new Hono<{
  Bindings: Bindings
  Variables: Variables
}>()

app.use('/auth/*', async (c, next) => {
  const token = c.env.TOKEN // token is `string`
  // ...
  c.set('user', user) // user should be `User`
  await next()
})

```



## Routing

Hono のルーティングは柔軟かつ直感的です。

// HTTP Methods
app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))

// Wildcard ワイルドカード
app.get('/wild/*/card', (c) => {
  return c.text('GET /wild/*/card')
})

// Any HTTP methods 全てのメソッド
app.all('/hello', (c) => c.text('Any Method /hello'))

// Custom HTTP method オリジナルのメソッド
app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))

// Multiple Method 配列にいれる
app.on(['PUT', 'DELETE'], '/post', (c) =>
  c.text('PUT or DELETE /post')
)

// Multiple Paths 複数のパス
app.on('GET', ['/hello', '/ja/hello', '/en/hello'], (c) =>
  c.text('Hello')
)

※複数のメソッドと複数のパスを同時に設定して使うことは出来ません。



### パスパラメータ

app.get('/user/:name', async (c) => {
  const name = c.req.param('name')
  // ...
})

またはすべてのパラメータを一度に:

app.get('/posts/:id/comment/:comment_id', async (c) => {
  const { id, comment_id } = c.req.param()
  // ...
})


### オプションパラメータ

/api/animal
/api/animal/:type
この両方のpathを？記号で・・・

// Will match `/api/animal` and `/api/animal/:type`
app.get('/api/animal/:type?', (c) => c.text('Animal!'))



### 正規表現

正規表現の使用が可能です。

app.get('/post/:date{[0-9]+}/:title{[a-z]+}', async (c) => {
  const { date, title } = c.req.param()
  // ...
})



### スラッシュを含む

app.get('/posts/:filename{.+\\.png}', async (c) => {
  //...
})



このルーティング定義にマッチするURLの例

/posts/image.png
/posts/my-picture.png
/posts/folder/another-image.png
/posts/image.test.png



このルーティング定義にマッチしないURLの例

/posts/image.jpg (拡張子がpngではない)
/posts/image (拡張子がない)
/post/image.png (/postsではない)




### チェーンルート

app
  .get('/endpoint', (c) => {
    return c.text('GET /endpoint')
  })
  .post((c) => {
    return c.text('POST /endpoint')
  })
  .delete((c) => {
    return c.text('DELETE /endpoint')
  })

app一つのインスタンスで複数のメソッドをまとめて設定しています。
同じパスに対して複数のHTTPメソッド（GET、POST、DELETEなど）を簡潔に定義するための便利な構文です。



### グループ化
Hono インスタンスを使用してルートをグループ化し、route メソッドを使用してメイン アプリに追加できます。



```
const book = new Hono()

book.get('/', (c) => c.text('List Books')) // GET /book
book.get('/:id', (c) => {
  // GET /book/:id
  const id = c.req.param('id')
  return c.text('Get Book: ' + id)
})
book.post('/', (c) => c.text('Create Book')) // POST /book

const app = new Hono()
app.route('/book', book)

```

bookインスタンスはappインスタンスの相対パスになります。

app.route('/book', book)
このapp.routeメソッドでまとめています。

appインスタンスのパスは/bookですので、
bookインスタンスは/bookを基準とした相対パスになります。
bookインスタンスの設定を見ると、全て'/'ですので
bookインスタンスの全てのpathは'/book’が起点となります。

つまり、

book.get('/')は、実際には/book/へのGETリクエストを処理します。
book.get('/:id')は、実際には/book/:idへのGETリクエストを処理します。




### ベースを変更せずにグループ化する

ベースを維持しながら複数のインスタンスをグループ化することもできます。

```
const book = new Hono()
book.get('/book', (c) => c.text('List Books')) // GET /book
book.post('/book', (c) => c.text('Create Book')) // POST /book

const user = new Hono().basePath('/user')
user.get('/', (c) => c.text('List Users')) // GET /user
user.post('/', (c) => c.text('Create User')) // POST /user

const app = new Hono()
app.route('/', book) // Handle /book
app.route('/', user) // Handle /user

```

bookとuserという2つのインスタンスを作っています。

それをexportして使うわけですが、
一つのappインスタンスで複数のメソッドが使えるということになります。



### ベースパス

ベースパスを指定できます。

const api = new Hono().basePath('/api')
api.get('/book', (c) => c.text('List Books')) // GET /api/book

.basePath()メソッドで設定します。



### ホスト名によるルーティング

ホスト名が含まれていれば正常に動作します。

```
const app = new Hono({
  getPath: (req) => req.url.replace(/^https?:\/([^?]+).*$/, '$1'),
})

app.get('/www1.example.com/hello', (c) => c.text('hello www1'))
app.get('/www2.example.com/hello', (c) => c.text('hello www2'))

```

```
  getPath: (req) => req.url.replace(/^https?:\/([^?]+).*$/, '$1'),

```

これは、ウェブサイトへのアクセス情報（req）から、どの道を通るか（パス）を決める方法の設定です。

`https://www1.example.com/hello`
というパスを
`/www1.example.com/hello`
という文字列に書き換えます。


`/^https?:\/([^?]+).*$/`

この部分は正規表現を勉強する必要があります。

()で囲んだ部分を$1として抜き出しています。
正規表現は()で囲んだのを$[数字]で取り出せます。

app.get('/www1.example.com/hello', ...)は、「/www1.example.com/helloという道にGETでアクセスしてきた人には、『hello www1』というメッセージを表示する」というルール。

app.get('/www2.example.com/hello', ...)は、「/www2.example.com/helloという道にGETでアクセスしてきた人には、『hello www2』というメッセージを表示する」というルール。



### hostヘッダー値によるルーティング

Honoは、HonoコンストラクタでgetPath()関数を設定すれば、ホストヘッダ値を扱うことができます。

```
const app = new Hono({
  getPath: (req) =>
    '/' +
    req.headers.get('host') +
    req.url.replace(/^https?:\/\/[^/]+(\/[^?]*)/, '$1'),
})

app.get('/www1.example.com/hello', (c) => c.text('hello www1'))

// 次のリクエストはこのルートにマッチします。
// new Request('http://www1.example.com/hello', {
//  headers: { host: 'www1.example.com' },
// })

```

`http://www1.example.com/hello?name=usagi`
というURLから
`/hello`
というパスを取り出すことができます。

そして、getPath全体では、hostヘッダーの値とパスを組み合わせて、新しいパスを作っているます。

例えば、hostが「www1.example.com」、パスが「/hello」なら、「/www1.example.com/hello」という新しいパスが作られます。

そして、

`app.get('/www1.example.com/hello', ...)`
は、

`/www1.example.com/hello`

という道にGETでアクセスしてきた人には、
`hello www1`
というメッセージを表示というルール。だから、

`http://www1.example.com/hello`
というリクエストで、headersに
`host: 'www1.example.com'`
が含まれている場合、「hello www1」が表示されます。

この方法を使うと、hostヘッダーだけでなく、他のヘッダーの値によってルーティングを変えることもできます。

例えばUser-Agentヘッダーによるルーティングの変更が可能になります。



### ルーティングの優先度

#### 登録順

ハンドラーまたはミドルウェアは登録順に実行されます。

app.get('/book/a', (c) => c.text('a')) // a
app.get('/book/:slug', (c) => c.text('common')) // common

GET /book/a ---> `a`
GET /book/b ---> `common`

この場合、GET /book/a にアクセスすると、最初に /book/a のハンドラーが実行されて 'a' が返されます。
もし GET /book/b にアクセスすると、/book/:slug のハンドラーが実行されて 'common' が返されます。
/book/a のように、より具体的なパスが先に登録されていると、そちらが優先されます。

それから、一度ハンドラーが実行されると、そこで処理は止まります。



#### 失敗例

app.get('*', (c) => c.text('common')) // common
app.get('/foo', (c) => c.text('foo')) // foo

このコードで GET /foo にアクセスすると、実は 'common' が返ってきてしまします。

なぜかというと、* は全てにマッチするから、先に登録されている * のハンドラーが実行されてしまいます。
/foo のハンドラーは実行されないの。



#### Middleware

ミドルウェアを実行したい場合は、ハンドラーよりも前に書くのが鉄則です。

app.use(logger())
app.get('/foo', (c) => c.text('foo'))

こうすれば、/foo にアクセスする前に logger() ミドルウェアが実行されます。



#### どのパスにもマッチしない場合の処理

最後に、「フォールバック」ハンドラー、つまりどのパスにもマッチしない場合の処理を書く場合は、他のハンドラーよりも後にかきます。

app.get('/bar', (c) => c.text('bar')) // bar
app.get('*', (c) => c.text('fallback')) // fallback

GET /bar ---> `bar`
GET /foo ---> `fallback`



### Grouping ordering

ルーティングのグループ化の落とし穴について

ルーティングのグループ化において、その順序は極めて重要です。
route() 関数は、第二引数に指定されたルーティングオブジェクト（例えば three や two）を、自身のルーティングオブジェクト（two や app）に統合できます。

```
three.get('/hi', (c) => c.text('hi'))
two.route('/three', three)
app.route('/two', two)

export default app

```

この場合、GET /two/three/hi へのリクエストは、期待通り hi というレスポンスを返します。
これは、app のルーティングに /two が追加され、その /two の配下に /three が追加され、さらに /three の配下に /hi が存在するという階層構造が正しく構築されているためです。

しかしながら、ルーティングの追加順序を誤ると、意図しない結果を招きます。以下のコードを比較対象とします。

```
three.get('/hi', (c) => c.text('hi'))
app.route('/two', two) // `two` はまだルーティングを持っていない
two.route('/three', three)

export default app

```

このケースでは、GET /two/three/hi へのリクエストは 404 Not Found エラーを返します。
これは、app.route('/two', two) が実行される時点で、two はまだ /three のルーティング情報を持っていないためです。
結果として、app には /two のルーティングは追加されるものの、その配下に /three/hi は存在していません。



## Context

リクエスト処理
Hono では、HTTP リクエストを処理するためのさまざまなメソッドが提供されています。たとえば、get、post、put、delete などがあります。

レスポンス メソッド
Hono では、レスポンスを作成して送信するためのさまざまなメソッドが提供されています。たとえば、text、json、html、redirect、notFound などがあります。

ミドルウェア
ミドルウェアは、リクエストとレスポンスがルート ハンドラーに到達する前に、それらを変更するために使用できる関数です。

### req

Honoリクエストのインスタンスです。

```tsx
app.get('/hello', (c) => {
  const userAgent = c.req.header('User-Agent')
  // ...
})

```

### body()

HTTPレスポンスを返す

ヘッダーやHTTPステータスコードを設定できます。

c.header()
c.status()

※ テキストまたは HTML を返す場合は、c.text() または c.html() を使用できます。

```
app.get('/welcome', (c) => {
  // Set headers
  c.header('X-Message', 'Hello!')
  c.header('Content-Type', 'text/plain')

  // Set HTTP status code
  c.status(201)

  // Return the response body
  return c.body('Thank you for coming')
})

```

シュガーシンタックス 次のようにも書けます。

```
app.get('/welcome', (c) => {
  return c.body('Thank you for coming', 201, {
    'X-Message': 'Hello!',
    'Content-Type': 'text/plain',
  })
})

```

201
リクエストが成功し、新しいリソースが作成されたことを意味します。
この場合、厳密には新しいリソースが作成されているわけではありませんが、慣例的に成功を示すステータスコードとして使用されています。



### text()

テキストをContent-Type:text/plainとしてレンダリングします。

```
app.get('/say', (c) => {
  return c.text('Hello!')
})

```

/sayというパスへのGETリクエストを処理するルートを定義しています。
c.text()メソッドを使用しており、これはレスポンスとしてプレーンテキストを送信するための簡略化された方法です。



### json()

SON を Content-Type:application/json としてレンダリングします。

```
app.get('/api', (c) => {
  return c.json({ message: 'Hello!' })
})

```


### html()

HTML を Content-Type:text/html としてレンダリングします。

```
app.get('/', (c) => {
  return c.html('<h1>Hello! Hono!</h1>')
})

```

### notFound()

レスポンス Not Foundを返します。

```
app.get('/notfound', (c) => {
  return c.notFound()
})

```

### redirect()

リダイレクト、デフォルトのステータス コードは 302 です。

```
app.get('/redirect', (c) => {
  return c.redirect('/')
})
app.get('/redirect-permanently', (c) => {
  return c.redirect('/', 301)
})

```



### res

```
// Response object
app.use('/', async (c, next) => {
  await next()
  c.res.headers.append('X-Debug', 'Debug message')
})

```

解説

このミドルウェアは、すべてのリクエストに対して、レスポンスヘッダーに X-Debug: Debug message という情報を追加する処理を行っています。

app.use('/', async (c, next) => { ... })：これは、すべてのルート (/) に対してミドルウェアを設定しています。
このミドルウェアは、非同期 (async) 関数として定義されています。

await next()：この行は、
次のミドルウェアまたはルートハンドラを実行します。
next() が呼び出されることで、リクエスト処理のパイプラインが続行されます。
next()は リクエスト処理の制御を次のミドルウェアまたはルートハンドラーに移す関数です。


c.res.headers.append('X-Debug', 'Debug message')：
c はContextオブジェクトであり、リクエストとレスポンスの情報にアクセスできます。
この行では、レスポンスヘッダーに X-Debug という名前のヘッダーを追加し、その値を Debug message に設定しています。




### set() / get()

c.set()とc.get()は、Honoアプリケーションにおいて、リクエストスコープ内でのデータ共有を簡潔に行うための便利な機能です。
これにより、ミドルウェアとルートハンドラー間での情報のやり取りが容易になり、コードの可読性と保守性が向上します。

```tsx
app.use(async (c, next) => {
  c.set('message', 'Hono is cool!!')
  await next()
})

app.get('/', (c) => {
  const message = c.get('message')
  return c.text(`The message is "${message}"`)
})
Pass the Variables as Generics to the constructor of Hono to make it type-safe.


type Variables = {
  message: string
}

const app = new Hono<{ Variables: Variables }>()

```

c.set() と c.get() で設定・取得できる値は、現在のリクエストの処理の間のみ有効です。

異なるリクエスト間では、これらの値は共有されません。つまり、リクエストごとに独立したコンテキストが提供されます。

リクエストが完了すると、これらの値は破棄されます。



利用シーン

c.set()とc.get()は、例えば以下の様な場合に役立ちます。

認証情報の受け渡し: ミドルウェアで認証を行い、その結果をルートハンドラーで利用する。

ロギング: リクエストIDなどの情報をミドルウェアで設定し、ログ出力処理で利用する。

設定値の共有: アプリケーションの設定値をミドルウェアで読み込み、各ルートハンドラーで参照する。

レスポンスのカスタマイズ: ミドルウェアでレスポンスヘッダーを設定し、後続の処理で利用する。



### var

c.varは、Honoフレームワークにおいて、リクエストコンテキスト内で共有される変数に型安全にアクセスするための機能です。


```
const result = c.var.client.oneMethod()

```

カスタム・メソッドを提供するミドルウェアを作りたい場合は次のようにします。

```
type Env = {
  Variables: {
    echo: (str: string) => string
  }
}

const app = new Hono()

const echoMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})

```



ミドルウェアを複数のハンドラーで使用したい場合は、app.use() を使用できます。

次に、型安全にするために、Env を Generics として Hono のコンストラクターに渡す必要があります。

```
const app = new Hono<Env>()

app.use(echoMiddleware)

app.get('/echo', (c) => {
  return c.text(c.var.echo('Hello!'))
})

```



c.var の基本的な使い方

変数へのアクセス: c.var.propertyName の形式で、設定された変数にアクセスできます。

例えば、c.var.client.oneMethod() は、client という名前のオブジェクトに oneMethod というメソッドが存在することを期待します。

型安全性: c.var を使用すると、Hono の型システムを通じて、アクセスしようとしている変数の型が事前に定義されているため、タイプエラーをコンパイル時に検出できます。


#### AI解説 ミドルウェアでのカスタムメソッドの提供

createMiddleware 関数: createMiddleware<Env>() を使用して、カスタムミドルウェアを作成できます。
この関数は、Env 型の Generics を受け取り、ミドルウェアが利用できるコンテキストの型を定義します。
Env 型: Env 型は、ミドルウェアがアクセスできる変数の型を定義します。
上記の例では、Variables プロパティに echo という名前の関数が定義されています。
この関数は、文字列を受け取り、文字列を返す型であることが指定されています。
ミドルウェア内での c.set: ミドルウェア内で c.set('echo', (str) => str) を使用して、echo というキーに関数を設定します。
この関数は、受け取った文字列をそのまま返す単純な関数です。
これにより、c.var を通じてこの関数にアクセスできるようになります。
c.var でのカスタムメソッドの利用: ルートハンドラー内では、c.var.echo('Hello!') のようにして、ミドルウェアで設定した echo 関数を呼び出すことができます。
この例では、"Hello!" という文字列が echo 関数に渡され、結果として "Hello!" という文字列が返されます。
複数のハンドラーでのミドルウェアの使用
app.use(): app.use(echoMiddleware) を使用して、複数のルートハンドラーでミドルウェアを再利用できます。
Hono コンストラクタへの Env の適用: const app = new Hono<Env>() のように、Hono のコンストラクタに Env 型を渡すことで、ミドルウェアとハンドラー全体で型安全性を確保できます。

#### c.var の利点

型安全性: c.var を使用することで、コンパイル時に型エラーを検出でき、実行時のエラーを減らすことができます。
コードの整理: ミドルウェアで提供するカスタムメソッドを c.var を通じて提供することで、コードをより構造化し、保守性を高めることができます。
柔軟性: c.var を使用すると、ミドルウェアで様々なカスタムメソッドを提供でき、リクエスト処理を柔軟に拡張できます。

#### まとめ

まとめると、c.var は、Honoフレームワークにおける、型安全な変数アクセスとミドルウェアでのカスタムメソッドの提供を可能にする機能です。
これにより、より堅牢で保守性の高いアプリケーションを構築できます。
c.set() / c.get() と同様に、c.var で設定した値は、リクエストのスコープ内でのみ有効です。



### render() / setRenderer()

このコードは、Honoフレームワークでレスポンスのレイアウト（共通のHTML構造）を定義し、再利用する方法を示しています。
`c.setRenderer()`を使ってレイアウトを設定し、`c.render()`を使ってそのレイアウトにコンテンツを埋め込むことで、効率的にHTMLレスポンスを生成できます。

1. レイアウトの設定 (`c.setRenderer()`)

```tsx
app.use(async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      <html>
        <body>
          <p>{content}</p>
        </body>
      </html>
    )
  })
  await next()
})

```

*   `app.use(...)`: これはミドルウェアを登録しています。
このミドルウェアはすべてのリクエストに対して実行されます。

*   `c.setRenderer((content) => { ... })`: `c.setRenderer()`は、レスポンスを生成するための関数（レンダラー）を設定します。
この例では、`content`という引数を受け取る関数を渡しています。`content`は、後で`c.render()`で渡されるコンテンツです。

*   `c.html(...)`: `c.html()`は、HTMLレスポンスを生成します。
この例では、`content`を`<p>`タグで囲んだHTMLを生成しています。

*   `await next()`: 次のミドルウェアまたはルートハンドラーを実行します。

    この部分で、基本的なHTMLの骨組み（`<html>`, `<body>`など）を定義し、コンテンツを埋め込む場所(`{content}`)を指定しています。

2. コンテンツのレンダリング (`c.render()`)

```tsx
app.get('/', (c) => {
  return c.render('Hello!')
})

```

*   `c.render('Hello!')`: `c.render()`は、`c.setRenderer()`で設定したレンダラーを使ってレスポンスを生成します。
引数として渡された`'Hello!'`が、先ほど設定したレイアウトの`{content}`の部分に埋め込まれます。

結果として、`/`にアクセスすると、以下のHTMLが返されます。

```html
<html>
  <body>
    <p>Hello!</p>
  </body>
</html>
```

3. 引数のカスタマイズと型定義

`c.setRenderer()`に渡す関数は、複数の引数を受け取ることができます。
型安全性を確保するために、`declare module 'hono' { interface ContextRenderer { ... } }`を使って interface の型定義を追加できます。

```tsx
declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head: { title: string }
    ): Response | Promise<Response>
  }
}

```

この型定義により、レンダラー関数は`content`（文字列またはPromise）と`head`（`{ title: string }`型のオブジェクト）を受け取るようになります。

4. カスタマイズされた引数の使用例

```tsx
app.use('/pages/*', async (c, next) => {
  c.setRenderer((content, head) => {
    return c.html(
      <html>
        <head>
          <title>{head.title}</title>
        </head>
        <body>
          <header>{head.title}</header>
          <p>{content}</p>
        </body>
      </html>
    )
  })
  await next()
})

app.get('/pages/my-favorite', (c) => {
  return c.render(<p>Ramen and Sushi</p>, {
    title: 'My favorite',
  })
})

app.get('/pages/my-hobbies', (c) => {
  return c.render(<p>Watching baseball</p>, {
    title: 'My hobbies',
  })
})

```

この例では、`head`引数を使って`<title>`タグと`<header>`タグの内容を設定しています。

`/pages/my-favorite`にアクセスすると、タイトルが"My favorite"、コンテンツが"Ramen and Sushi"のHTMLが生成されます。

#### まとめ

まとめると、`c.setRenderer()`と`c.render()`を使うことで、HTMLの共通部分をレイアウトとして定義し、コンテンツだけを個別に指定することで、効率的にHTMLレスポンスを生成できます。
型定義を追加することで、型安全性を保ちながら、より柔軟なレイアウトのカスタマイズが可能になります。



### executionCtx

`executionCtx` は、Hono アプリケーションにおけるリクエストの実行コンテキストを提供するオブジェクトです。
これは、Cloudflare Workers などの環境で、非同期処理を制御するために使用されます。

`c.executionCtx.waitUntil()`

このメソッドは、非同期処理が完了するまでレスポンスの送信を遅らせるために使われます。

具体的には、`waitUntil()` に渡された Promise が解決されるまで、リクエストのライフサイクルが継続されます。

例えば、以下のコード例では、`/foo` というエンドポイントへのリクエストがあった際に、`c.env.KV.put(key, data)` という非同期の KV (Key-Value) ストレージへのデータ書き込み処理を `waitUntil()` に渡しています。

```tsx
app.get('/foo', async (c) => {
  c.executionCtx.waitUntil(c.env.KV.put(key, data))
  // ...
})

```

これにより、レスポンスがクライアントに送信される前に、`c.env.KV.put(key, data)` の処理が完了することが保証されます。

これは、レスポンス送信後もバックグラウンドで実行する必要がある処理（例えば、ログの記録やデータの更新など）を行う際に非常に便利です。

`executionCtx` は、リクエストの実行コンテキストを提供するオブジェクト

`c.executionCtx.waitUntil()` は、非同期処理の完了を待つために使用される
レスポンス送信後もバックグラウンドで実行する必要がある処理に便利

この機能を使うことで、リクエスト処理中に発生する非同期タスクを、レスポンスの送信に影響を与えることなく確実に実行できます。






### event

`event` プロパティ は、Cloudflare Workers 環境でのみ利用可能な `FetchEvent` オブジェクト を提供します。
`c.event.waitUntil()` は、非同期処理の完了を待つために使用され、レスポンス送信後もバックグラウンドで実行する必要がある処理を確実に行うことができます。
`c.env.MY_KV` は、Cloudflare Workers の bindings (KV 名前空間など) にアクセスするためのものです。

```
// Type definition to make type inference
type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// FetchEvent オブジェクト (Service Worker 構文を使用する場合にのみ設定)
app.get('/foo', async (c) => {
  c.event.waitUntil(c.env.MY_KV.put(key, data))
  // ...
})

```









### env

`c.env` は、Hono フレームワークにおいて、 Cloudflare Workers 環境で利用可能な環境変数、シークレット、KV 名前空間、D1 データベース、R2 バケットなどのバインディング にアクセスするためのオブジェクトです。

バインディング (bindings) とは、Cloudflare Worker に紐付けられた様々なリソースのことです。これらは、型に関わらずグローバル変数として利用でき、コンテキスト `c.env.BINDING_KEY` を通してアクセスできます。

*   コード例では、`Bindings` という型定義を使って、`MY_KV` という名前の KV 名前空間を定義しています。
そして、`Hono` インスタンスを生成する際に、この型定義をジェネリクスとして渡すことで、`c.env` から `MY_KV` にアクセスする際に型安全性を確保しています。

```tsx
type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  c.env.MY_KV.get('my-key')
  // ...
})

```

`c.env.MY_KV.get('my-key')` は、`MY_KV` という名前の KV 名前空間から、`my-key` というキーに対応する値を取得する処理です。

まとめ

`c.env` は、Cloudflare Workers 環境で利用可能なバインディングにアクセスするためのオブジェクトです。
バインディング は、環境変数、シークレット、KV 名前空間、D1 データベース、R2 バケットなど、ワーカーに紐付けられたリソースです。

`c.env.BINDING_KEY` のように、バインディングの名前を使って、それぞれの値にアクセスできます。

型定義を使って、`c.env` からアクセスする値の型安全性を確保できます。
Cloudflare Workers の環境で Hono アプリケーションを開発する際には、設定された環境変数やその他のリソースに `c.env` を通してアクセスします。

Next.js の環境では、環境変数は `process.env` を通じてアクセスします。Vercel での環境変数の設定については、Vercel のドキュメントを参照してください。Vercel では、Production 環境、Preview 環境、Development 環境に対して個別に環境変数を設定できます。また、API キーやデータベース URL のような機密性の高い情報は、シークレットとして管理する必要があります。



### error

`c.error` は、Hono フレームワークにおいて、 リクエスト処理中にハンドラーがエラーをスローした場合に、そのエラーオブジェクトが格納される場所 です。

ハンドラーがエラーをスローした場合
Hono のルートハンドラー（例えば、`app.get('/', ...)` で定義された関数）内でエラーが発生すると、そのエラーオブジェクトが `c.error` に設定されます。

`app.use()` で定義されたミドルウェア内でのアクセス

`c.error` は、`app.use()` で定義されたミドルウェア内で確認できます。
ミドルウェアは、リクエストがハンドラーに到達する前後に実行される処理を定義するために使用されます。

```tsx
app.use(async (c, next) => {
    await next()
    if (c.error) {
      // エラーが発生した場合の処理
    }
})

```

この例では、`await next()` によって次のミドルウェアまたはハンドラーが実行され、もしその処理中にエラーが発生すると、`c.error` が `if (c.error)` の条件を満たし、エラーハンドリングの処理が実行されます。

エラーオブジェクトの活用

`c.error` に格納されたエラーオブジェクトを利用して、エラーログの出力、エラーレスポンスの作成、エラーメッセージの表示など、様々なエラーハンドリング処理を行うことができます。

例

```tsx
app.use(async (c, next) => {
  try {
    await next();
  } catch (error) {
    c.error = error; // エラーを c.error に設定
    console.error("An error occurred:", error); // エラーログを出力
    return c.text("Internal Server Error", 500); // エラーレスポンスを返す
  }
});

app.get('/', (c) => {
  throw new Error('This is an example error!'); // 例としてエラーをスロー
  return c.text('Hello, Hono!');
});

```

この例では、ハンドラー内でエラーが発生した場合、ミドルウェアでエラーをキャッチし、ログ出力とエラーレスポンスの送信を行います。



### ContextVariableMap

`ContextVariableMap` は、Hono フレームワークにおいて、 ミドルウェアで使用される変数に型定義を追加するためのインターフェース です。

型定義の拡張

デフォルトでは、`c.set()` や `c.get()` で設定・取得できる変数の型は `any` となります。

`ContextVariableMap` を拡張することで、特定のミドルウェアで使用する変数に 厳密な型 を指定できます。

これにより、型安全性を高め、開発時のエラーを減らすことができます。

`declare module 'hono' { ... }`

この構文は、TypeScript において 既存のモジュール（ここでは 'hono'）に型定義を追加する ために使用します。

`interface ContextVariableMap` を宣言することで、`hono` モジュールが持つ `ContextVariableMap` インターフェースを拡張し、新しい型定義を追加しています。

例

```tsx
declare module 'hono' {
  interface ContextVariableMap {
    result: string
  }
}

```

この例では、`ContextVariableMap` に `result` というキーを追加し、その型を `string` と定義しています。



ミドルウェアでの使用
`createMiddleware` を使って作成したミドルウェア内で、`c.set('result', 'some values')` のように `c.set()` を使用して値を設定できます。この時、`result` は `string` 型として扱われます。

```tsx
const mw = createMiddleware(async (c, next) => {
  c.set('result', 'some values') // result is a string
  await next()
})

```

ハンドラーでの型推論
ハンドラー内で `c.get('result')` を使用して値を取得する際、TypeScript は、`ContextVariableMap` で定義した型情報に基づいて、`val` が `string` 型であると推論します。
`tsx
app.get('/', (c) => {
  const val = c.get('result') // val is a string
  // ...
  return c.json({ result: val })
})

```

型安全性の向上
`ContextVariableMap` を利用することで、ミドルウェアとハンドラー間で共有する変数の型が保証されるため、 タイプミスや型不一致によるエラーを防ぐ ことができます。

まとめ

`ContextVariableMap` は、Hono のミドルウェアで使用する変数に型定義を追加するためのインターフェースです。

`declare module 'hono' { ... }` 構文を使って、既存の `hono` モジュールに型定義を追加します。

ミドルウェアで `c.set()` を使用して値を設定する際、定義した型が適用されます。

ハンドラーで `c.get()` を使用して値を取得する際、TypeScript は定義された型を推論します。

`ContextVariableMap` を活用することで、 Hono アプリケーションの型安全性を向上させることができます 。

```tsx
// 型定義の追加
declare module 'hono' {
  interface ContextVariableMap {
    message: string;
    userId: number;
  }
}

// ミドルウェアの作成
const loggingMiddleware = createMiddleware(async (c, next) => {
  c.set('message', 'Request received');
  c.set('userId', 123);
  console.log('Before Handler:', c.get('message'), c.get('userId'));
  await next();
  console.log('After Handler:', c.get('message'), c.get('userId'));
});


app.use(loggingMiddleware);

// ハンドラーの作成
app.get('/', (c) => {
    const message = c.get('message');
    const userId = c.get('userId');
    return c.json({ message, userId });
});

```

この例では、`ContextVariableMap` を拡張し、`message` を `string` 型、 `userId` を `number` 型として定義しています。

ミドルウェアでは、これらの値を設定し、ハンドラーではそれらの値を取得しています。このように型定義をすることで、変数を使う箇所で型に関するエラーをコンパイル時に検出できます。



## HonoRequest

HonoRequest は、Request オブジェクトをラップする c.req から取得できるオブジェクトです。

### param()

パスパラメータの値を取得します。

```tsx
import { Hono } from 'hono'
const app = new Hono()

// Captured params
app.get('/entry/:id', async (c) => {
  const id = c.req.param('id')
  // ...
})

// Get all params at once
app.get('/entry/:id/comment/:commentId', async (c) => {
  const { id, commentId } = c.req.param()
})

```

### query()

リクエストのクエリ文字列パラメータを取得するためのメソッドです。

```tsx
import { Hono } from 'hono'
const app = new Hono()

// Query params
app.get('/search', async (c) => {
  const query = c.req.query('q')
})

// Get all params at once
app.get('/search', async (c) => {
  const { q, limit, offset } = c.req.query()
})

```

### queries()

Get multiple querystring parameter values
同じキーで複数の値を持つクエリ文字列パラメータを取得するためのメソッドです。

e.g. `/search?tags=A&tags=B`

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/search', async (c) => {
  // tags will be string[]
  const tags = c.req.queries('tags')
  // ...
})

```

### header()

ヘッダーの値を取得します。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => {
  const userAgent = c.req.header('User-Agent')
  return c.text(`Your user agent is ${userAgent}`)
})

```

c.req.header() が引数なしで呼び出されると、返されるレコードのすべてのキーは小文字になります。
大文字の名前を持つヘッダーの値を取得する場合は、c.req.header(“X-Foo”) を使用します。

```tsx
// ❌ Will not work
const headerRecord = c.req.header()
const foo = headerRecord['X-Foo']

// ✅ Will work
const foo = c.req.header('X-Foo')

```

### parseBody()

Parse Request body of type `multipart/form-data` or `application/x-www-form-urlencoded`

リクエストボディを解析するためのメソッドです。
特に、multipart/form-data や application/x-www-form-urlencoded 形式のデータを扱う際に使用されます。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.parseBody()
  // ...
})

```

`parseBody()` supports the following behaviors.

#### Single file

単一ファイル

```tsx
import { Context } from 'hono'
declare const c: Context

const body = await c.req.parseBody()
const data = body['foo']

```

`body['foo']` is `(string | File)`.

If multiple files are uploaded, the last one will be used.

複数のファイルがアップロードされた場合、最後のが使われます。

#### Multiple files

複数ファイル

```tsx
import { Context } from 'hono'
declare const c: Context

const body = await c.req.parseBody()
body['foo[]']

```

`body['foo[]']` is always `(string | File)[]`.

`[]` postfix is required.

複数のファイルを扱う場合は、キーに [] をつける必要があります。この場合、body['foo[]'] は (string | File)[] という配列になります。

#### Multiple files with same name

同じ名前の複数ファイルの扱い

```tsx
import { Context } from 'hono'
declare const c: Context

const body = await c.req.parseBody({ all: true })
body['foo']

```

`all` option is disabled by default.

- If `body['foo']` is multiple files, it will be parsed to `(string | File)[]`.
- If `body['foo']` is single file, it will be parsed to `(string | File)`.

body['foo'] が単一のファイルの場合は (string | File) 、複数のファイルの場合は (string | File)[] 型になります。

#### Dot notation

ドット表記

If you set the `dot` option `true`, the return value is structured based on the dot notation.

Imagine receiving the following data:

•
`tsx
const data = new FormData()
data.append('obj.key1', 'value1')
data.append('obj.key2', 'value2')

```

dot: true オプションを使用すると、ドット表記でネストされたデータを取得できます。この例では、body が { obj: { key1: 'value1', key2: 'value2' } } のようなオブジェクトになります。

```tsx
import { Context } from 'hono'
declare const c: Context

const body = await c.req.parseBody({ dot: true })
// body is `{ obj: { key1: 'value1', key2: 'value2' } }`

```

parseBody() は、HTTPリクエストのボディに含まれるフォームデータを解析し、JavaScriptオブジェクトとして扱うための便利なメソッドです。



### json()

Parses the request body of type `application/json`

リクエストボディが application/json 形式である場合に、その内容を解析して JavaScript オブジェクトとして取得するためのメソッドです。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.json()
  // ...
})

```

処理の流れ

クライアントが application/json 形式でデータを送信します。
サーバー側では、Hono の c.req.json() メソッドが呼び出されます。
c.req.json() は、リクエストボディの内容を解析し、JavaScript オブジェクトに変換します。
変換されたオブジェクトは、body 変数に格納され、以降の処理で使用できます。



### text()

Parses the request body of type `text/plain`

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.text()
  // ...
})

```

リクエストボディの内容を文字列として解析し、その文字列を返します。

### arrayBuffer()

Parses the request body as an `ArrayBuffer`

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.arrayBuffer()
  // ...
})

```

### blob()

Parses the request body as a `Blob`.

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.blob()
  // ...
})

```

### formData()

Parses the request body as a `FormData`.

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.post('/entry', async (c) => {
  const body = await c.req.formData()
  // ...
})

```

### valid()

検証済みのデータを取得します。

```tsx
app.post('/posts', async (c) => {
  const { title, body } = c.req.valid('form')
  // ...
})

```

Available targets are below.

- `form`
- `json`
- `query`
- `header`
- `cookie`
- `param`

See the [Validation section](/docs/guides/validation) for usage examples.

### routePath()

ハンドラー内で登録されたパスを取得できます。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/posts/:id', (c) => {
  return c.json({ path: c.req.routePath })
})

```

アクセスが
`/posts/123`
の場合、
`/posts/:id`
と返します。


```json
{ "path": "/posts/:id" }

```

### matchedRoutes()

ハンドラー内で一致したルートを返すので、デバッグに役立ちます。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.use(async function logger(c, next) {
  await next()
  c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
    const name =
      handler.name ||
      (handler.length < 2 ? '[handler]' : '[middleware]')
    console.log(
      method,
      ' ',
      path,
      ' '.repeat(Math.max(10 - path.length, 0)),
      name,
      i === c.req.routeIndex ? '<- respond from here' : ''
    )
  })
})

```

### path

リクエストのパス名を取得します。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/about/me', async (c) => {
  const pathname = c.req.path // `/about/me`
  // ...
})

```

### url

リクエストのURLを取得します。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/about/me', async (c) => {
  const url = c.req.url // `http://localhost:8787/about/me`
  // ...
})

```

### method

リクエストのメソッド名を取得します。

```tsx
import { Hono } from 'hono'
const app = new Hono()

app.get('/about/me', async (c) => {
  const method = c.req.method // `GET`
  // ...
})

```

### raw

The raw [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.

生のリクエストオブジェクト

```tsx
// For Cloudflare Workers
app.post('/', async (c) => {
  const metadata = c.req.raw.cf?.hostMetadata?
  // ...
})

```



## Exception

HTTPException は、Hono フレームワークにおいて、認証失敗などの致命的なエラーが発生した場合に、意図的に例外を発生させるために使用されます。

この例外を発生させることで、エラーを適切に処理し、クライアントにエラーレスポンスを返すことができます。

### throw HTTPException

この例では、ミドルウェアから HTTPException がスローされます。

```tsx
import { Hono } from 'hono'
const app = new Hono()
declare const authorized: boolean
// ---cut---
import { HTTPException } from 'hono/http-exception'

// ...

app.post('/auth', async (c, next) => {
  // authentication
  if (authorized === false) {
    throw new HTTPException(401, { message: 'Custom error message' })
  }
  await next()
})

```

ユーザーに返される応答を指定できます。

```tsx
import { HTTPException } from 'hono/http-exception'

const errorResponse = new Response('Unauthorized', {
  status: 401,
  headers: {
    Authenticate: 'error="invalid_token"',
  },
})

throw new HTTPException(401, { res: errorResponse })

```

### Handling HTTPException

スローされた HTTPException は `app.onError` で処理できます。

```tsx
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
import { HTTPException } from 'hono/http-exception'

// ...

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse()
  }
  // ...
  // ---cut-start---
  return c.text('Error')
  // ---cut-end---
})

```

### `cause`

原因オプションを使用して原因データを追加できます。

The `cause` option is available to add a [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) data.

```tsx
import { Hono, Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
const app = new Hono()
declare const message: string
declare const authorize: (c: Context) => void
// ---cut---
app.post('/auth', async (c, next) => {
  try {
    authorize(c)
  } catch (e) {
    throw new HTTPException(401, { message, cause: e })
  }
  await next()
})

```






## Presets

Honoには、それぞれ特定の用途に合わせて設計された複数のルーターがあります。

プリセットは、一般的なユースケースのために提供されており、毎回ルーターを指定する必要はありません。
すべてのプリセットからインポートされる Hono クラスは同じであり、ルーターだけが異なります。
したがって、プリセットは互換性があり、必要に応じて使い分けることができます。

Honoのプリセットには主に以下の3種類があります:

* hono

これはほとんどのユースケースに推奨されるプリセットです。

登録フェーズは hono/quick よりも遅い場合がありますが、起動後のパフォーマンスが高いです。

Deno、Bun、Node.js で構築された長寿命のサーバーに適しています。

Cloudflare Workers、Deno Deploy など、v8分離を使用する環境にも適しています。これらの環境では、起動後にある程度の時間、分離が維持されるからです。

ルーターには SmartRouter が使用されており、RegExpRouter と TrieRouter を組み合わせて最適なルーターを選択します。

* hono/quick

このプリセットは、リクエストごとにアプリケーションが初期化される環境向けに設計されています。

Fastly Compute のような環境での使用が推奨されます。

ルーターには SmartRouter が使用されており、LinearRouter と TrieRouter を組み合わせて最適なルーターを選択します。

* hono/tiny

これは、最も小さいルーターパッケージであり、リソースが限られた環境に適しています。

PatternRouter のみが使用され、アプリケーションのサイズを15KB未満に抑えることができます。
どのプリセットを使うべきか？

ほとんどのユースケースでは、hono プリセットが推奨されます。

Fastly Compute のように、リクエストごとに初期化される環境では、hono/quick が適しています。

リソースが限られた環境では、hono/tiny を使用すると、アプリケーションのサイズを小さくできます。
プリセットを使用することで、アプリケーションの要件に合わせて最適なルーターを簡単に選択でき、パフォーマンスを最大限に引き出すことができます。



----------------------------------------

# Guides

## Middleware

HonoにおけるMiddlewareは、Handlerの前後に実行される処理であり、リクエストを受け取る前やレスポンスを操作する際に利用されます。

Middlewareはapp.useまたはapp.HTTP_METHODで登録でき、パスやメソッドを指定することも可能です。



### ミドルウェアの定義

Middlewareの主な特徴は以下の通りです:

Handler は `Response` オブジェクトを返す必要があり、一つのHandlerのみが実行されます。

Middleware は何も返さず、`await next()` で次のMiddlewareに処理を渡します。

Middlewareは登録された順に実行されます。

最初のMiddlewareの `next` より前の処理が最初に実行され、`next` より後の処理は最後に実行されます。



```tsx
// すべてのルートとすべてのHTTPメソッドに対して適用します。
app.use(logger())

// パスを指定します。
app.use('/posts/*', cors())

// メソッドとパスを指定します。
app.post('/posts/*', basicAuth())

```

ハンドラー関数内で c.text() や c.json(), c.html() などのメソッドを使ってレスポンスを返すと、Honoはそのレスポンスをクライアントに送信し、それ以降の処理を停止します。

```tsx
app.post('/posts', (c) => c.text('Created!', 201))

```

👆️ レスポンスを返すとそこで処理が停止されます。これ以降のコードは実行されません。
実質return文がそこにあるのと同じです。

👇 この場合、ディスパッチする前に 4 つのミドルウェアは次のように処理されます。

```tsx
logger() -> cors() -> basicAuth() -> *handler*

```



### Execution order

ミドルウェアの実行順序は、登録された順序で決まります。
最初に登録されたMiddlewareの
nextより前の処理が最初に実行され、
nextより後の処理が最後に実行されます。

```tsx
app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})
app.use(async (_, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})
app.use(async (_, next) => {
  console.log('middleware 3 start')
  await next()
  console.log('middleware 3 end')
})

app.get('/', (c) => {
  console.log('handler')
  return c.text('Hello!')
})

```


ミドルウェアは、登録された順に実行されます。
例えば、以下のコードでは、

`middleware 1 start` が最初にログ出力され、
	`middleware 2 start`
		`middleware 3 start`
			`handler`
		`middleware 3 end`
	`middleware 2 end`
最後に
`middleware 1 end`
の順にログが出力されます。



### Built-in Middleware

HonoにはMiddlewareが備わっています。

```tsx
import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use(poweredBy())
app.use(logger())

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

```

👆 関数 use() がMiddlewareの設定に使われています。



### Custom Middleware

独自のMiddleware

```tsx
// Custom logger
app.use(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

// Add a custom header
app.use('/message/*', async (c, next) => {
  await next()
  c.header('x-message', 'This is middleware!')
})

app.get('/message/hello', (c) => c.text('Hello Middleware!'))

```

しかし、app.use()の中にミドルウェアを直接埋め込むと、再利用性が制限される可能性があります。

そのため、ミドルウェアを別のファイルに分離することができます。

ミドルウェアを分離する際に、コンテキストとネクストの型定義を失わないようにするために、HonoのファクトリーからcreateMiddleware()を使うことができます。

```tsx
import { createMiddleware } from 'hono/factory'

const logger = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

```

👇 型ジェネリックは createMiddleware で使用できます。

```tsx
createMiddleware<{Bindings: Bindings}>(async (c, next) =>

```

### Modify the Response After Next

レスポンスを後から変更するミドルウェアを設定する方法です。

```tsx
const stripRes = createMiddleware(async (c, next) => {
  await next()
  c.res = undefined // 元のレスポンスを一旦クリアするという意味
  c.res = new Response('New Response') // 新しいResponseオブジェクトを代入
})

```

👆 重要なのは、await next() の後に書かれた処理は、レスポンスが生成された後で実行されるということです。

この stripRes ミドルウェアは、すべてのリクエストに対して、元のレスポンスを破棄し、 'New Response' というテキストを持つ新しいレスポンスを返します。




### Context access inside Middleware arguments

ミドルウェア引数内のコンテキストにアクセスするには、app.useが提供するcontextパラメータを直接使用します。

import { cors } from 'hono/cors'

app.use('*', async (c, next) => {
  const middleware = cors({
    origin: c.env.CORS_ORIGIN,
  })
  return middleware(c, next)
})

このコードは、 app.use() に登録したミドルウェアの中で、引数として渡されるコンテキストオブジェクト c を通じて、リクエスト情報や環境変数にアクセスし、それを利用して動的にミドルウェアを構成する方法です。



### Extending the Context in Middleware

ミドルウェア内部のコンテキストを拡張するには、c.setを使います。
これを型安全にするには、{ Variables： { yourVariable： YourVariableType｝ createMiddleware関数にジェネリック引数を渡します。

```tsx
import { createMiddleware } from 'hono/factory'

const echoMiddleware = createMiddleware<{
  Variables: {
    echo: (str: string) => string
  }
}>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})

```

このコードは、ミドルウェアを使ってコンテキストを拡張し、型安全性を保ちながら、リクエスト処理をカスタマイズする方法を示しています。

コードの流れ

1. ミドルウェアの作成: createMiddleware にジェネリック引数として、Variables オブジェクトを定義します。ここでは echo という関数が、文字列を受け取って同じ文字列を返す型として指定されています。

2. コンテキストの設定: ミドルウェアの中で c.set('echo', (str) => str) を使って、コンテキストに echo という関数を設定します。この関数は受け取った文字列をそのまま返すものです。

3. 次の処理へ進む: await next() により、次の処理（この場合はルートハンドラー）に進みます。

4. エンドポイントの定義: app.get('/echo', echoMiddleware, (c) => { ... }) で /echo というエンドポイントを定義し、その中で c.var.echo('Hello!') を呼び出しています。これにより、'Hello!' という文字列が返されます。



## Helpers

ヘルパーはアプリケーションの開発を支援するために利用できます。
ミドルウェアとは異なり、ハンドラとして動作するのではなく、便利な機能を提供します。

例えば、Cookieヘルパーの使い方は以下の通りです：

```tsx
import { getCookie, setCookie } from 'hono/cookie'

const app = new Hono()

app.get('/cookie', (c) => {
  const yummyCookie = getCookie(c, 'yummy_cookie')
  // ...
  setCookie(c, 'delicious_cookie', 'macha')
  //
})

```


### Available Helpers

提供しているHelpers
※詳細はHelpersの章を見てください。

Accepts
Adapter
Cookie
css
Dev
Factory
html
JWT
SSG
Streaming
Testing
WebSocket



## JSX

hono/jsxを使えば、JSX構文でHTMLを書くことができます。

hono/jsxはクライアントで動作しますが、サーバー側でコンテンツをレンダリングするときに使うことが多いでしょう。

ここでは、サーバーとクライアントの両方に共通するJSXに関することをいくつか紹介します。

### Settings

```tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}

```

```
/** @jsx jsx */
/** @jsxImportSource hono/jsx */

```



### Usage

```index.tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

export default app

```



### Fragment

まとめ

Reactの
	<>
	</>
のこと

```index.tsx
import { Fragment } from 'hono/jsx'

const List = () => (
  <Fragment>
    <p>first child</p>
    <p>second child</p>
    <p>third child</p>
  </Fragment>
)

```

Or you can write it with <></> if it set up properly.

```index.tsx
const List = () => (
  <>
    <p>first child</p>
    <p>second child</p>
    <p>third child</p>
  </>
)

```

### PropsWithChildren

PropsWithChildrenを使って、関数コンポーネントにおける子要素（children）の型を正しく推論します。

```
import { PropsWithChildren } from 'hono/jsx'

type Post = {
  id: number
  title: string
}

function Component({ title, children }: PropsWithChildren<Post>) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

```


### Inserting Raw HTML

HTML を直接挿入するには、dangerouslySetInnerHTML を使用します。

```tsx
app.get('/foo', (c) => {
  const inner = { __html: 'JSX &middot; SSR' }
  const Div = <div dangerouslySetInnerHTML={inner} />
})

```

### Memoization

計算された文字列をメモ化してコンポーネントを最適化します。

```tsx
import { memo } from 'hono/jsx'

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)
const Layout = (
  <div>
    <Header />
    <p>Hono is cool!</p>
    <Footer />
  </div>
)

```

### Context

useContextを使用すると、propsを通して値を渡すことなく、コンポーネントツリーのどのレベルでもグローバルにデータを共有することができます。

```tsx
import type { FC } from 'hono/jsx'
import { createContext, useContext } from 'hono/jsx'

const themes = {
  light: {
    color: '#000000',
    background: '#eeeeee',
  },
  dark: {
    color: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = createContext(themes.light)

const Button: FC = () => {
  const theme = useContext(ThemeContext)
  return <button style={theme}>Push!</button>
}

const Toolbar: FC = () => {
  return (
    <div>
      <Button />
    </div>
  )
}

// ...

app.get('/', (c) => {
  return c.html(
    <div>
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    </div>
  )
})

```

### Async Component

hono/jsxは非同期コンポーネントをサポートしています。
c.html()でレンダリングすれば、自動的にawaitされます。

```tsx
const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 1000)) // sleep 1s
  return <div>Done!</div>
}

app.get('/', (c) => {
  return c.html(
    <html>
      <body>
        <AsyncComponent />
      </body>
    </html>
  )
})

```




### Suspense Experimental 実験的

### ErrorBoundary Experimental 実験的

### Integration with html Middleware

強力なテンプレートを作成するには、JSX ミドルウェアと HTML ミドルウェアを組み合わせます。詳細については、HTML ミドルウェアのドキュメントを参照してください。

html Helper - Hono
https://hono.dev/docs/helpers/html

```
import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

interface SiteData {
  title: string
  children?: any
}

const Layout = (props: SiteData) =>
  html`<!doctype html>
    <html>
      <head>
        <title>${props.title}</title>
      </head>
      <body>
        ${props.children}
      </body>
    </html>`

const Content = (props: { siteData: SiteData; name: string }) => (
  <Layout {...props.siteData}>
    <h1>Hello {props.name}</h1>
  </Layout>
)

app.get('/:name', (c) => {
  const { name } = c.req.param()
  const props = {
    name: name,
    siteData: {
      title: 'JSX with html sample',
    },
  }
  return c.html(<Content {...props} />)
})

export default app

```



### With JSX Renderer Middleware

JSX レンダラー ミドルウェアを使用すると、JSX を使用して HTML ページをより簡単に作成できます。

JSX Renderer Middleware - Hono
https://hono.dev/docs/middleware/builtin/jsx-renderer

### Override type definitions

型の定義をオーバーライドして、カスタム要素と属性を追加できます。

```tsx
declare module 'hono/jsx' {
  namespace JSX {
    interface IntrinsicElements {
      'my-custom-element': HTMLAttributes & {
        'x-event'?: 'click' | 'scroll'
      }
    }
  }
}

```



## Client Components

hono/jsxはサーバーサイドだけでなく、クライアントサイドもサポートしています。

つまり、ブラウザ上で動作するインタラクティブなUIを作成することが可能です。

私たちはこれをクライアント・コンポーネントまたはhono/jsx/domと呼んでいます。

これは高速で非常に小さい。

hono/jsx/domのカウンター・プログラムは、Brotli圧縮でわずか2.8KBです。

しかし、Reactの場合は47.8KBだ。

クライアント・コンポーネント固有の機能を紹介します。

### Counter example

以下は簡単なカウンターの例です。React と同じコードが動作します。

```tsx
import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <html>
      <body>
        <Counter />
      </body>
    </html>
  )
}

const root = document.getElementById('root')
render(<App />, root)

```

### render()

render() を使用して、指定された HTML 要素内に JSX コンポーネントを挿入できます。

render(<Component />, container)

### Hooks compatible with React

hono/jsx/domには、Reactと互換性があるか部分的に互換性があるフックがあります。

これらのAPIについては、Reactのドキュメントを参照してください。

Built-in React Hooks – React
https://react.dev/reference/react/hooks

```tsx
useState()
useEffect()
useRef()
useCallback()
use()
startTransition()
useTransition()
useDeferredValue()
useMemo()
useLayoutEffect()
useReducer()
useDebugValue()
createElement()
memo()
isValidElement()
useId()
createRef()
forwardRef()
useImperativeHandle()
useSyncExternalStore()
useInsertionEffect()
useFormStatus()
useActionState()
useOptimistic()

```



### startViewTransition() family

startViewTransition()ファミリーは、ビュー遷移APIを簡単に扱うための独自のフックと関数を含んでいます。

#### ビューの遷移って何？

画面上のコンテンツが切り替わる時の動きのことです。
例えば、ボタンを押したら画像が大きくなったり、新しいページに移動する時に少しフェードアウトしたりします。

#### startViewTransition() familyって何？

ビューの遷移をアニメーションで表現するための便利な関数

#### 1. An easiest example

startViewTransition() を使用すると、document.startViewTransition を使用して簡単に遷移を記述できます。

#### 2. Using viewTransition() with keyframes()


#### 3. Using useViewTransition



### The hono/jsx/dom runtime

クライアント・コンポーネント用の小さなJSXランタイムがあります。

これを使うと、hono/jsxを使うよりもバンドル結果が小さくなります。

tsconfig.jsonでhono/jsx/domを指定してください。

```
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx/dom"
  }
}

```

## Testing

テストは重要です。

実際、Honoのアプリケーションをテストするのは簡単です。

テスト環境の作り方はランタイムごとに異なるが、基本的な手順は同じです。

### Request and Response

Requestを作成し、Honoアプリケーションに渡してResponseを検証するだけです。
そして、app.requestという便利なメソッドを使うことができます。

型指定されたテスト クライアントについては、テスト ヘルパーを参照してください。

Testing Helper - Hono
https://hono.dev/docs/helpers/testing



### REST API のテスト サンプル

```tsx
app.get('/posts', (c) => {
  return c.text('Many posts')
})

app.post('/posts', (c) => {
  return c.json(
    {
      message: 'Created',
    },
    201,
    {
      'X-Custom': 'Thank you',
    }
  )
})

```

GET /posts リクエストを発行し、responseをテストします。

```tsx
describe('Example', () => {
  test('GET /posts', async () => {
    const res = await app.request('/posts')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Many posts')
  })
})

```

POST /posts リクエストを行うには、次の手順を実行します。

```tsx
test('POST /posts', async () => {
  const res = await app.request('/posts', {
    method: 'POST',
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})

```

JSON データを使用して /posts を POST するリクエストを行うには、次の手順を実行します。

```tsx
test('POST /posts', async () => {
  const res = await app.request('/posts', {
    method: 'POST',
    body: JSON.stringify({ message: 'hello hono' }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})

```

multipart/form-data データを含む /posts を POST リクエストするには、次の手順を実行します。

```tsx
test('POST /posts', async () => {
  const formData = new FormData()
  formData.append('message', 'hello')
  const res = await app.request('/posts', {
    method: 'POST',
    body: formData,
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})

```

Request クラスのインスタンスを渡すこともできます。

```
test('POST /posts', async () => {
  const req = new Request('http://localhost/posts', {
    method: 'POST',
  })
  const res = await app.request(req)
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})

```

この方法では、エンドツーエンドのようにテストできます。

### Env

テスト用にc.envを設定するには、app.requestの3番目のパラメータとして渡します。

これはCloudflare Workers Bindingsのような値をモックするのに便利です。

```tsx
const MOCK_ENV = {
  API_HOST: 'example.com',
  DB: {
    prepare: () => {
      /* mocked D1 */
    },
  },
}

test('GET /posts', async () => {
  const res = await app.request('/posts', {}, MOCK_ENV)
})

```



## Validation

Honoは、バリデーション機能を最小限にしか提供していませんが、サードパーティ製のバリデーターと組み合わせることで、その力を発揮します。

さらに、HonoのRPC(RemoteProcedureCall)機能を使うことで、APIの仕様をクライアント側と共有し、型安全性を確保できます。

簡単に言うと、Honoは単体では強力なバリデーション機能を持っていないものの、以下の2つの点で優れています。

サードパーティ製バリデーターとの連携
Zodのような外部ライブラリと組み合わせて使うことで、リクエストデータの検証を柔軟かつ厳密に行えます。

RPC機能による型共有APIの定義をクライアントと共有することで、クライアント側でAPIの型情報を利用でき、型エラーを防ぐことができます。

Honoには、`validator`という関数が用意されており、これを使ってリクエストのデータを検証できます。

`validator`はミドルウェアとして機能し、リクエストの`form`,`json`,`query`,`header`,`param`,`cookie`などのデータを検証できます。

`validator`のコールバック関数内で、データの検証を行い、検証済みのデータを返すことができます。

複数のバリデーターを組み合わせて、リクエストの異なる部分を検証することも可能です。

Zod Validator Middlewareを利用することで、さらに簡単にバリデーションを実装できます。



### Manual validator

まず、サードパーティのバリデーターを使用せずに受信値を検証する方法を紹介します。

```tsx
import { validator } from 'hono/validator'

```

フォームデータを検証するには、form最初の引数としてを指定し、2番目の引数としてコールバックを指定します。

コールバックでは、値を検証し、最後に検証された値を返します。

validatorミドルウェアとして使用できます。



```ts
app.post(
  '/posts',
  validator('form', (value, c) => {
    const body = value['body']
    if (!body || typeof body !== 'string') {
      return c.text('Invalid!', 400)
    }
    return {
      body: body,
    }
  }),
  //...

```

ハンドラ内で、`c.req.valid('form')`でバリデートされた値を取得することができます。

```ts
, (c) => {
  const { body } = c.req.valid('form')
  // ... do something
  return c.json(
    {
      message: 'Created!',
    },
    201
  )
}

```

バリデーションの対象には、フォームの他に、json、query、header、param、cookieがあります。

警告
jsonを検証する場合、リクエストにはContent-Type: application/jsonヘッダーを含める必要があります。
app.request()を使ってテストする際には、content-typeヘッダーを設定することが重要です。

```ts
const app = new Hono()
app.post(
  '/testing',
  validator('json', (value, c) => {
    // pass-through validator
    return value
  }),
  (c) => {
    const body = c.req.valid('json')
    return c.json(body)
  }
)

```

テストはこのように書くことができます。

```ts
// ❌ this will not work
const res = await app.request('/testing', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }),
})
const data = await res.json()
console.log(data) // undefined



// ✅ this will work
const res = await app.request('/testing', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }),
  headers: new Headers({ 'Content-Type': 'application/json' }),
})
const data = await res.json()
console.log(data) // { key: 'value' }
```

警告
ヘッダーを検証する場合、キーとして小文字の名前を使用する必要があります。
Idempotency-Keyヘッダーを検証する場合、キーとしてidempotency-keyを使用する必要があります。

```ts
// ❌ this will not work
app.post(
  '/api',
  validator('header', (value, c) => {
    // idempotencyKey is always undefined
    // so this middleware always return 400 as not expected
    const idempotencyKey = value['Idempotency-Key']

    if (idempotencyKey == undefined || idempotencyKey === '') {
      throw HTTPException(400, {
        message: 'Idempotency-Key is required',
      })
    }
    return { idempotencyKey }
  }),
  (c) => {
    const { idempotencyKey } = c.req.valid('header')
    // ...
  }
)



// ✅ this will work
app.post(
  '/api',
  validator('header', (value, c) => {
    // can retrieve the value of the header as expected
    const idempotencyKey = value['idempotency-key']

    if (idempotencyKey == undefined || idempotencyKey === '') {
      throw HTTPException(400, {
        message: 'Idempotency-Key is required',
      })
    }
    return { idempotencyKey }
  }),
  (c) => {
    const { idempotencyKey } = c.req.valid('header')
    // ...
  }
)

```



### Multiple validators

リクエストの異なる部分を検証するために、複数のバリデータを含めることもできます。

```ts
app.post(
  '/posts/:id',
  validator('param', ...),
  validator('query', ...),
  validator('json', ...),
  (c) => {
    //...
  }
```



### With Zod

Zodを使います。

Honoではサーボパーティのバリデーションライブラリを使うことを推奨しています。

```terminal
npm i zod

```

```ts
import { z } from 'zod'

```

スキーマを設定します。

```ts
const schema = z.object({
  body: z.string(),
})

```

検証用のコールバック関数でスキーマを使用し、検証された値を返すことができます。

```ts
const route = app.post(
  '/posts',
  validator('form', (value, c) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
      return c.text('Invalid!', 401)
    }
    return parsed.data
  }),
  (c) => {
    const { body } = c.req.valid('form')
    // ... do something
    return c.json(
      {
        message: 'Created!',
      },
      201
    )
  }
)

```



### Zod Validator Middleware

Zod Validator Middlewareを使うとさらに簡単になります。

```sh [npm]
npm i @hono/zod-validator

```

次のようにコードを書きます。

```ts
import { zValidator } from '@hono/zod-validator'

const route = app.post(
  '/posts',
  zValidator(
    'form',
    z.object({
      body: z.string(),
    })
  ),
  (c) => {
    const validated = c.req.valid('form')
    // ... use your validated data
  }
)
```



## RPC

ある意味Honoを使う上で、一番期待している機能です。

RPC機能により、サーバーとクライアント間でAPI仕様を共有することができます。

Validatorで指定された入力型と、
json()で出力された出力型を
エクスポートすることができます。

そして、HonoClientはそれをインポートすることができます。

注意
モノレポでRPC型が正しく動作するためには、クライアントとサーバーのtsconfig.jsonファイルの両方で、
compilerOptionsに「strict」:trueを設定してください。

Hono infers the output for all client endpoints as an empty object when building type defs · Issue #2270 · honojs/hono
https://github.com/honojs/hono/issues/2270#issuecomment-2143745118



### Server

サーバー側で必要なのは、バリデータを書いて変数ルートを作成することだけです。

次の例ではZod Validatorを使っています。

```ts{1}
const route = app.post(
  '/posts',
  zValidator(
    'form',
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  (c) => {
    // ...
    return c.json(
      {
        ok: true,
        message: 'Created!',
      },
      201
    )
  }
)

```

Then, export the type to share the API spec with the Client.
次に、API仕様をクライアントと共有するために、型をエクスポートします。

```ts
export type AppType = typeof route

```

### Client

クライアント側では、まず `hc` と `AppType` をインポートします。

```ts
import { AppType } from '.'
import { hc } from 'hono/client'

```

`hc` はクライアントを作成する関数です。
Genericsとして `AppType` を渡し、引数としてサーバのURLを指定します。

```ts
const client = hc<AppType>('http://localhost:8787/')

```

client.{path}.{method}`を呼び出し、サーバーに送信したいデータを引数として渡します。

```ts
const res = await client.posts.$post({
  form: {
    title: 'Hello',
    body: 'Hono is a cool project',
  },
})

```

`res` は 「fetch」 レスポンスと互換性があります。
res.json()`でサーバからデータを取得することができます。

```ts
if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}

```

現在、クライアントはファイルのアップロードをサポートしていません。


### Status code

200や404のようなステータス・コードをc.json()で明示的に指定した場合。
これは、クライアントに渡す型として追加されます。

```ts
// server.ts
const app = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post: Post | undefined = await getPost(id)

    if (post === undefined) {
      return c.json({ error: 'not found' }, 404) // Specify 404
    }

    return c.json({ post }, 200) // Specify 200
  }
)

export type AppType = typeof app

```

ステータスコードでデータを取得できます。

```ts
// client.ts
const client = hc<AppType>('http://localhost:8787/')

const res = await client.posts.$get({
  query: {
    id: '123',
  },
})

if (res.status === 404) {
  const data: { error: string } = await res.json()
  console.log(data.error)
}

if (res.ok) {
  const data: { post: Post } = await res.json()
  console.log(data.post)
}

// { post: Post } | { error: string }
type ResponseType = InferResponseType<typeof client.posts.$get>

// { post: Post }
type ResponseType200 = InferResponseType<
  typeof client.posts.$get,
  200
>

```

### Not Found

もしクライアントを使いたいのであれば、Not Foundレスポンスに `c.notFound()` を使うべきではありません。
クライアントがサーバから取得したデータを正しく推論することができません。

```ts
// server.ts
export const routes = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post: Post | undefined = await getPost(id)

    if (post === undefined) {
      return c.notFound() // ❌️
    }

    return c.json({ post })
  }
)

// client.ts
import { hc } from 'hono/client'

const client = hc<typeof routes>('/')

const res = await client.posts[':id'].$get({
  param: {
    id: '123',
  },
})

const data = await res.json() // 🙁 data is unknown

```

`c.json()`を使用し、Not Found Responseのステータスコードを指定してください。

```ts
export const routes = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post: Post | undefined = await getPost(id)

    if (post === undefined) {
      return c.json({ error: 'not found' }, 404) // Specify 404
    }

    return c.json({ post }, 200) // Specify 200
  }
)

```

### Path parameters

パスパラメータを含むルートを扱うこともできます。

```ts
const route = app.get(
  '/posts/:id',
  zValidator(
    'query',
    z.object({
      page: z.string().optional(),
    })
  ),
  (c) => {
    // ...
    return c.json({
      title: 'Night',
      body: 'Time to sleep',
    })
  }
)

```

`param`でパスに含めたい文字列を指定します。

```ts
const res = await client.posts[':id'].$get({
  param: {
    id: '123',
  },
  query: {},
})

```

### Headers

リクエストにヘッダーを追加することができます。

```ts
const res = await client.search.$get(
  {
    //...
  },
  {
    headers: {
      'X-Custom-Header': 'Here is Hono Client',
      'X-User-Agent': 'hc',
    },
  }
)

```

すべてのリクエストに共通のヘッダーを追加するには、 `hc` 関数の引数にそれを指定します。

```ts
const client = hc<AppType>('/api', {
  headers: {
    Authorization: 'Bearer TOKEN',
  },
})

```

### `init` option

fetch API を使ってサーバーにリクエストを送信する際の**initオプションの使い方

フェッチの `RequestInit` オブジェクトを `init` オプションとしてリクエストに渡すことができます。

initオプションを使うことで、fetchリクエストを細かく制御でき、リクエストの中断など高度な操作も可能になります。

以下はリクエストを中止する例です。

```ts
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const abortController = new AbortController()
const res = await client.api.posts.$post(
  {
    json: {
      // Request body
    },
  },
  {
    // RequestInit object
    init: {
      signal: abortController.signal,
    },
  }
)

// ...

abortController.abort()

```

`init`で定義された `RequestInit` オブジェクトが最優先されます。

これは `body | method | headers` のような他のオプションで設定されたものを上書きするために使用することができます。

非同期処理でデータがなかなか返ってこないため、処理を中断したい場合などに AbortController と init オプションを組み合わせて使用することができます

他に
ネットワークの障害
ユーザー操作
サーバー側での問題が発生
等、様々な状況で使用します。

initについて
fetch API の init オプションの場合は、リクエストの詳細設定を行うためのオブジェクトを指定するために使われます。



### `$url()`

You can get a `URL` object for accessing the endpoint by using `$url()`.

`url()`を使用すると、エンドポイントにアクセスするための `URL` オブジェクトを取得できます。

警告
絶対 URL を渡さないと動作しません。相対 URL `/` を渡すと、以下のエラーが発生します。

`Uncaught TypeError: Failed to construct 'URL': Invalid URL`

`Uncaught TypeError： URL' の構築に失敗しました： 無効なURLです。`



```ts
// ❌ Will throw error
const client = hc<AppType>('/')
client.api.post.$url()

// ✅ Will work as expected
const client = hc<AppType>('http://localhost:8787/')
client.api.post.$url()
```



```ts
const route = app
  .get('/api/posts', (c) => c.json({ posts }))
  .get('/api/posts/:id', (c) => c.json({ post }))

const client = hc<typeof route>('http://localhost:8787/')

let url = client.api.posts.$url()
console.log(url.pathname) // `/api/posts`

url = client.api.posts[':id'].$url({
  param: {
    id: '123',
  },
})
console.log(url.pathname) // `/api/posts/123`

```

$url()を使うことで、APIの型定義に基づいて、正しいURLを簡単に生成でき、パスパラメータがある場合は、paramオプションで値を指定することができます。

hc関数には必ず絶対パスを渡す必要があります。

$url()は、APIクライアントの実装を簡略化し、URL生成時のミスを防ぎ、型安全性を高める上で非常に重要な役割を果たします。



### Custom `fetch` method

カスタムフェッチメソッドを設定できます。

以下のCloudflare Workerのスクリプト例では、デフォルトのfetchの代わりにService Bindingsのfetchメソッドを使用しています。



```toml
# wrangler.toml
services = [
  { binding = "AUTH", service = "auth-service" },
]

```

```ts
// src/client.ts
const client = hc<CreateProfileType>('/', {
  fetch: c.env.AUTH.fetch.bind(c.env.AUTH),
})

```



### Infer

InferRequestTypeとInferResponseTypeを使って、
リクエストされるオブジェクトの型
と
返されるオブジェクトの型
を知ることが出来ます。

```ts
import type { InferRequestType, InferResponseType } from 'hono/client'

// InferRequestType
const $post = client.todo.$post
type ReqType = InferRequestType<typeof $post>['form']

// InferResponseType
type ResType = InferResponseType<typeof $post>

```

### Using SWR

You can also use a React Hook library such as [SWR](https://swr.vercel.app).

[SWR](https://swr.vercel.app)のようなReact Hookライブラリを使うこともできます。

```tsx
import useSWR from 'swr'
import { hc } from 'hono/client'
import type { InferRequestType } from 'hono/client'
import { AppType } from '../functions/api/[[route]]'

const App = () => {
  const client = hc<AppType>('/api')
  const $get = client.hello.$get

  const fetcher =
    (arg: InferRequestType<typeof $get>) => async () => {
      const res = await $get(arg)
      return await res.json()
    }

  const { data, error, isLoading } = useSWR(
    'api-hello',
    fetcher({
      query: {
        name: 'SWR',
      },
    })
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <h1>{data?.message}</h1>
}

export default App

```



### Using RPC with larger applications

hc関数と型推論を使って、大規模アプリケーションでRPC(RemoteProcedureCall)を利用する方法について解説します。

大規模なアプリケーションでは、APIのエンドポイントが増え、それらの型を管理するのが難しくなります。

Honoでは、型推論を活用して、この問題を解決できます。

型推論とは、コードから自動的に型を判断する仕組みです。

Honoでは、hc関数にAppTypeという型を渡すことで、クライアント側でAPIの型を安全に利用することができます。

この例では、authors.tsとbooks.tsという2つのサブルーターがあり、それぞれがHonoインスタンスを作成し、独自のAPIエンドポイントを定義しています。

これらのサブルーターをメインのindex.tsで結合することで、一つのアプリケーションを構築します。

```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => c.json('list authors'))
  .post('/', (c) => c.json('create an author', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app

```

```ts
// books.ts
import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => c.json('list books'))
  .post('/', (c) => c.json('create a book', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app

```

そして、index.tsでは、これらのサブルーターを app.route() で結合し、AppTypeをエクスポートしています。

```ts
// index.ts
import { Hono } from 'hono'
import authors from './authors'
import books from './books'

const app = new Hono()

const routes = app.route('/authors', authors).route('/books', books)

export default app
export type AppType = typeof routes

```

ここで重要なのは、app.route()でサブルーターを結合する際に、ハンドラーをチェーンすることです。

この方法で、型が常に推論され、AppTypeに正しい型情報が含まれるようになります。

これにより、クライアント側でhc関数を使うときに、APIエンドポイントの型が正しく推論され、安全にAPIを呼び出すことができるようになります。

AppTypeは、type of routesで定義されているように、ルートハンドラーの型を表現しています。

このAppTypeをhc関数に渡すことで、型安全なクライアントを作成できます。

これにより、client.authors.$get()やclient.books.$post()のような形で、型安全にAPIを呼び出すことができます。

このコード例では、authorsとbooksという2つのサブルーターを結合していますが、より多くのサブルーターを結合する場合でも、同じようにapp.route()でチェーンすることで、型推論を維持できます。

まとめ
•
hc関数と型推論を利用することで、大規模アプリケーションでも型安全なRPCを実現できます。
•
サブルーターをapp.route()で結合する際に、ハンドラーをチェーンすることで、型が正しく推論されるようにします。
•
ルートハンドラーの型をtypeof routesのように取得し、AppTypeとしてエクスポートします。
•
クライアント側では、hc関数にAppTypeを渡すことで、APIの型情報を利用できます。

この方法で、大規模なアプリケーションでも型安全性を保ちながら、効率的なAPI開発を行うことができます。また、型情報が自動的に推論されるため、コードの保守性も向上します。



### Known issues

既知の問題

#### IDE performance

RPCを使用する場合、ルートが多ければ多いほど、IDEは遅くなります。
その主な理由の1つは、アプリの型を推測するために大量の型のインスタンス化が実行されるからです。

例えば、あなたのアプリに次のようなルートがあるとします：

```ts
// app.ts
export const app = new Hono().get('foo/:id', (c) =>
  c.json({ ok: true }, 200)
)

```

Honoは次のように型を推測します。

```ts
export const app = Hono<BlankEnv, BlankSchema, '/'>().get<
  'foo/:id',
  'foo/:id',
  JSONRespondReturn<{ ok: boolean }, 200>,
  BlankInput,
  BlankEnv
>('foo/:id', (c) => c.json({ ok: true }, 200))

```

これは1つのルートに対する型のインスタンス化です。

ユーザーがこれらの型引数を手動で書く必要がないのは良いことですが、型のインスタンス化には多くの時間がかかることが知られています。

IDEで使用される`tsserver`は、アプリを使用するたびにこの時間のかかるタスクを行います。

ルートがたくさんある場合、IDEが大幅に遅くなる可能性があります。

しかし、この問題を軽減するためのヒントがあります。



##### Hono version mismatch

バックエンドがフロントエンドとは別のディレクトリにある場合、Honoのバージョンが一致していることを確認する必要があります。

Honoのバージョンをバックエンドとフロントエンドで使い分けると、「_Typeのインスタンス化が過度に深く、無限大になる可能性がある_」といった問題が発生します。

![hono-version-mismatch](https://github.com/user-attachments/assets/e4393c80-29dd-408d-93ab-d55c11ccca05)



##### TypeScript project references

[Hono version mismatch](#hono-version-mismatch)の場合のように、バックエンドとフロントエンドが別々になっていると問題が発生します。

バックエンドのコード(`AppType`など)にフロントエンドからアクセスしたい場合は、[project references](https://www.typescriptlang.org/docs/handbook/project-references.html)を使う必要があります。

TypeScriptのプロジェクトリファレンスは、あるTypeScriptコードベースが別のTypeScriptコードベースのコードにアクセスして利用することを可能にします。

 *(ソースはこちら： [Hono RPC And TypeScript Project References](https://catalins.tech/hono-rpc-in-monorepos/)*。



##### Compile your code before using it (recommended)

TypeScriptのコンパイル時に型を計算することで、IDEのパフォーマンスを向上させ、より型安全なクライアントを作成する方法について解説します。


* コードの事前コンパイルの利点

IDEの高速化
TypeScriptのコンパイラtscは、型推論などの重い処理をコンパイル時に実行できます。
これにより、IDE（Visual Studio Codeなど）は毎回型を計算する必要がなくなり、動作が高速になります [previous conversation]。

型安全性の向上
コンパイル時に型を計算することで、コード実行時の型エラーを減らすことができ、より安全なアプリケーション開発が可能になります [previous conversation, 110, 111]。

* hcWithTypeの利用

この例では、hc関数をラップしたhcWithTypeという新しい関数を導入しています。
hcWithTypeを使用すると、コンパイル時に型が計算されたクライアントを取得できます。

```ts
import { app } from './app'
import { hc } from 'hono/client'

// this is a trick to calculate the type when compiling
const client = hc<typeof app>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args)

```

このコードでは、
1. hc<typeof app>('')で、appの型情報を使ってhc関数を呼び出し、クライアントの型を取得しています。

2. export type Client = typeof clientで、クライアントの型をClientという型としてエクスポートしています。

3. hcWithType関数は、hc関数と同じ引数を受け取り、内部でhc<typeof app>を呼び出すことで、コンパイル済みの型情報を持つクライアントを返します。

これにより、hcWithTypeを使用するだけで、コンパイル時に型情報が計算されたクライアントを利用できるようになります。

コンパイル後、`hc` の代わりに `hcWithType` を使用すると、型が計算済みのクライアントを取得することができます。

```ts
const client = hcWithType('http://localhost:8787/')
const res = await client.posts.$post({
  form: {
    title: 'Hello',
    body: 'Hono is a cool project',
  },
})

```

* モノレポでの利用
もしプロジェクトがモノレポ（複数のプロジェクトが1つのリポジトリで管理されている構成）である場合は、turborepoのようなツールを使うことで、サーバープロジェクトとクライアントプロジェクトを分離し、依存関係を管理するのが容易になります。

* ビルドプロセスの調整
モノレポでない場合でも、concurrentlyやnpm-run-allのようなツールを使うことで、ビルドプロセスを調整できます。
これらのツールを使うことで、複数のビルドコマンドを同時に実行したり、特定の順番で実行したりできます。

* まとめ

TypeScriptのコンパイル時に型を計算することで、IDEのパフォーマンスが向上し、より型安全なクライアントを作成できます。

hcWithTypeを使うことで、コンパイル済みの型情報を持つクライアントを簡単に取得できます。

この方法を使うことで、大規模なアプリケーションでも型安全性を保ちながら、効率的な開発を行うことができます。

また、コンパイル時に型情報が計算されるため、開発時のエラーを早期に発見しやすくなり、コードの保守性も向上します。



##### Specify type arguments manually

これは少し面倒ですが、型のインスタンス化を避けるために型引数を手動で指定することができます。

```ts
const app = new Hono().get<'foo/:id'>('foo/:id', (c) =>
  c.json({ ok: true }, 200)
)
```

単一の型引数を指定するだけでパフォーマンスに違いが出ますが、ルートが多数ある場合は多くの時間と労力がかかります。

##### Split your app and client into multiple files

「大規模なアプリケーションでの RPC の使用」で説明されているように、アプリを複数のアプリに分割できます。また、アプリごとにクライアントを作成することもできます。

```ts
// authors-cli.ts
import { app as authorsApp } from './authors'
import { hc } from 'hono/client'

const authorsClient = hc<typeof authorsApp>('/authors')

// books-cli.ts
import { app as booksApp } from './books'
import { hc } from 'hono/client'

const booksClient = hc<typeof booksApp>('/books')
```

この方法では、tsserver はすべてのルートのタイプを一度にインスタンス化する必要がなくなります。



## Best Practices

# Best Practices

Hono is very flexible. You can write your app as you like.
However, there are best practices that are better to follow.

Honoは非常に柔軟なフレームワークであり、アプリケーションを自由に記述できますが、より良い開発のために推奨されるプラクティスがあります。

Honoにおけるベストプラクティスとして、コントローラーを可能な限り避けるという考え方について、分かりやすく解説します。

コントローラーの利用は、以下のような理由から推奨されていません。


* 型推論の困難さ: コントローラー内でパスパラメータ (:id など) を取得しようとする場合、型推論が正しく行われないことがあります。
複雑なジェネリクスを記述しない限り、コントローラー内でパスパラメータの型を安全に扱うことが難しくなります 。

以下の例では、bookPermalink関数（コントローラー）内で c.req.param('id') を使用していますが、id の型を推論するためには複雑な型定義が必要になります。
◦
一方、ハンドラーをパス定義の直後に記述する場合、id の型は自動的に推論されます。

* コードの複雑化: コントローラーを経由することで、コードが不必要に複雑になる可能性があります。

推奨される方法: ハンドラーを直接記述する
Honoでは、パスの定義（app.get('/books/:id', ...)）の直後に、リクエストを処理するハンドラーを直接記述することが推奨されています。
•
型安全性の向上: パスパラメータの型が自動的に推論されるため、型安全なコードを記述できます [previous conversation]。
•
コードの簡潔化: コントローラーを介さずに直接処理を記述することで、コードがより簡潔になり、可読性が向上します。

具体的な例
コントローラーを使用する場合 (推奨されない)
ハンドラーを直接記述する場合 (推奨)

例では、
/booksというパスへのGETリクエストに対して、ハンドラーを直接記述しています。これにより、型推論が働きやすくなり、コードもシンプルになります。

* まとめ
Honoでは、Ruby on Railsのようなコントローラーの使用は可能な限り避けるべきです。

代わりに、パスの定義の直後にハンドラーを直接記述することで、型安全性を高め、コードを簡潔に保つことができます。

型推論を最大限に活用することで、より効率的で保守性の高いアプリケーションを構築できます。

c.req.param('id') のように、パスパラメータにアクセスする際には、ハンドラー内で直接行うことで、型推論がより正確に働きます。

このプラクティスに従うことで、Honoアプリケーションの開発効率と保守性を大幅に向上させることができます。


### Don't make "Controllers" when possible

When possible, you should not create "Ruby on Rails-like Controllers".

```ts
// 🙁
// A RoR-like Controller
const booksList = (c: Context) => {
  return c.json('list books')
}

app.get('/books', booksList)
```

The issue is related to types. For example, the path parameter cannot be inferred in the Controller without writing complex generics.

```ts
// 🙁
// A RoR-like Controller
const bookPermalink = (c: Context) => {
  const id = c.req.param('id') // Can't infer the path param
  return c.json(`get ${id}`)
}

```

Therefore, you don't need to create RoR-like controllers and should write handlers directly after path definitions.

```ts
// 😃
app.get('/books/:id', (c) => {
  const id = c.req.param('id') // Can infer the path param
  return c.json(`get ${id}`)
})

```



### `factory.createHandlers()` in `hono/factory`

それでも RoR のようなコントローラーを作成したい場合は、hono/factory の factory.createHandlers() を使用します。
これを使用すると、型推論が正しく機能します。

```ts
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

// ...

// 😃
const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)

```

### Building a larger application

「Ruby on Rails のようなコントローラー」を作成せずに、より大きなアプリケーションを構築するには、app.route() を使用します。

アプリケーションに /authors および /books エンドポイントがあり、index.ts からファイルを分離したい場合は、authors.ts および books.ts を作成します。

```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list authors'))
app.post('/', (c) => c.json('create an author', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app

```

```ts
// books.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list books'))
app.post('/', (c) => c.json('create a book', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app

```

Then, import them and mount on the paths `/authors` and `/books` with `app.route()`.

そして、それらをインポートし、`app.route()`で `/authors` と `/books` のパスにマウントします。

```ts
// index.ts
import { Hono } from 'hono'
import authors from './authors'
import books from './books'

const app = new Hono()

app.route('/authors', authors)
app.route('/books', books)

export default app

```

上記のコードならうまくいくでしょう。しかし、これでは型安全性が失われてしまいます。

もし `RPC` の機能を使いたいのであれば、以下のようにメソッドを連結するのが良いでしょう。

```ts
// authors.ts
import { Hono } from "hono";

const app = new Hono()
  .get("/", (c) => c.json("list authors"))
  .post("/", (c) => c.json("create an author", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;

```

こうすることで、このルートを使うときに、型を適切に推測することができます。

## Miscellaneous その他

## FAQs

----------------------------------------

# Helpers

## Accepts Helper

Accepts Helperは、リクエストのAcceptヘッダーを処理するためのHonoのヘルパー関数です。

Accept ヘッダーとは
Acceptヘッダーは、クライアントがサーバーに送信するHTTPリクエストヘッダーの一つで、クライアントがどのコンテンツタイプやエンコーディング、言語などを理解できるかをサーバーに伝えます。

Accept-Encoding、Accept-Languageなどがその例です。

accepts() 関数の役割
accepts()関数は、Acceptヘッダーを解析し、適切な値を返します。これにより、クライアントの要求に応じて最適なレスポンスを提供できます。

### accepts()

```ts
import { accepts } from 'hono/accepts'

app.get('/', (c) => {
  const accept = accepts(c, {
    header: 'Accept-Language',
    supports: ['en', 'ja', 'zh'],
    default: 'en',
  })
  return c.json({ lang: accept })
})

```



### AcceptHeader type

AcceptHeader型の定義は以下の通りです。

```ts
export type AcceptHeader =
  | 'Accept'
  | 'Accept-Charset'
  | 'Accept-Encoding'
  | 'Accept-Language'
  | 'Accept-Patch'
  | 'Accept-Post'
  | 'Accept-Ranges'

```




### Options

required header: AcceptHeader
The target accept header.

required supports: string[]
The header values which your application supports.

required default: string
The default values.

optional match: (accepts: Accept[], config: acceptsConfig) => string
The custom match function.



## Adapter Helper

アダプター ヘルパーは、統一されたインターフェイスを通じてさまざまなプラットフォームとシームレスに対話する方法を提供します。



### Import

```ts
import { Hono } from 'hono'
import { env, getRuntimeKey } from 'hono/adapter'

```

### env()

env() 関数は、Cloudflare Workers のバインディングを超えて、異なるランタイム間で環境変数を取得するのに役立ちます。
env(c) で取得できる値は、ランタイムごとに異なる場合があります。

```ts
import { env } from 'hono/adapter'

app.get('/env', (c) => {
  // NAME is process.env.NAME on Node.js or Bun
  // NAME is the value written in `wrangler.toml` on Cloudflare
  const { NAME } = env<{ NAME: string }>(c)
  return c.text(NAME)
})

```

Supported Runtimes, Serverless Platforms and Cloud Services:

Cloudflare Workers
	wrangler.toml
Deno
	Deno.env
	.env file
Bun
	Bun.env
	process.env
Node.js
	process.env
Vercel
	Environment Variables on Vercel
AWS Lambda
	Environment Variables on AWS Lambda
Lambda@Edge
	Environment Variables on Lambda are not supported by Lambda@Edge, you need to use Lamdba@Edge event as an alternative.
Fastly Compute
	On Fastly Compute, you can use the ConfigStore to manage user-defined data.
Netlify
	On Netlify, you can use the Netlify Contexts to manage user-defined data.



### Specify the runtime

2 番目の引数としてランタイム キーを渡すことで、環境変数を取得するランタイムを指定できます。

```ts
app.get('/env', (c) => {
  const { NAME } = env<{ NAME: string }>(c, 'workerd')
  return c.text(NAME)
})

```



### getRuntimeKey()

getRuntimeKey() 関数は、現在のランタイムの識別子を返します。

```ts
app.get('/', (c) => {
  if (getRuntimeKey() === 'workerd') {
    return c.text('You are on Cloudflare')
  } else if (getRuntimeKey() === 'bun') {
    return c.text('You are on Bun')
  }
  ...
})

```



### Available Runtimes Keys

使用可能なランタイムキーは次のとおりです。

使用できないランタイムキーのランタイムはサポートされていて、「その他」としてラベル付けされている場合があります。

その一部はWinterCGのランタイムキーに触発されています。

workerd - Cloudflare Workers
deno
bun
node
edge-light - Vercel Edge Functions
fastly - Fastly Compute
other - Other unknown runtimes keys



## ConnInfo

ConnInfo Helper は接続情報の取得に役立ちます。たとえば、クライアントのリモート アドレスを簡単に取得できます。

### Import

Vercel

```ts
import { Hono } from 'hono'
import { getConnInfo } from 'hono/vercel'

```



### Usage

```ts
const app = new Hono()

app.get('/', (c) => {
  const info = getConnInfo(c) // info is `ConnInfo`
  return c.text(`Your remote address is ${info.remote.address}`)
})

```



### Type Definitions 型定義

getConnInfo() から取得できる値の型定義は次のとおりです。

```ts
type AddressType = 'IPv6' | 'IPv4' | undefined

type NetAddrInfo = {
  /**
   * Transport protocol type
   */
  transport?: 'tcp' | 'udp'
  /**
   * Transport port number
   */
  port?: number

  address?: string
  addressType?: AddressType
} & (
  | {
      /**
       * Host name such as IP Addr
       */
      address: string

      /**
       * Host name type
       */
      addressType: AddressType
    }
  | {}
)

/**
 * HTTP Connection information
 */
interface ConnInfo {
  /**
   * Remote information
   */
  remote: NetAddrInfo
}

```



## Cookie Helper

Cookie Helper は、Cookie を管理するための簡単なインターフェースを提供し、開発者がシームレスに Cookie を設定、解析、削除できるようにします。



### Import

```ts
import { Hono } from 'hono'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

```

### Usage

注意: 署名付き Cookie の設定と取得は、HMAC SHA-256 署名の作成に使用される WebCrypto API の非同期性により、Promise を返します。

```ts
const app = new Hono()

app.get('/cookie', (c) => {
  const allCookies = getCookie(c)
  const yummyCookie = getCookie(c, 'yummy_cookie')
  // ...
  setCookie(c, 'delicious_cookie', 'macha')
  deleteCookie(c, 'delicious_cookie')
  //
})

app.get('/signed-cookie', async (c) => {
  const secret = 'secret ingredient'
  // `getSignedCookie` will return `false` for a specified cookie if the signature was tampered with or is invalid
  const allSignedCookies = await getSignedCookie(c, secret)
  const fortuneCookie = await getSignedCookie(
    c,
    secret,
    'fortune_cookie'
  )
  // ...
  const anotherSecret = 'secret chocolate chips'
  await setSignedCookie(c, 'great_cookie', 'blueberry', anotherSecret)
  deleteCookie(c, 'great_cookie')
  //
})

```



### Options

#### setCookie & setSignedCookie

domain: string
expires: Date
httpOnly: boolean
maxAge: number
path: string
secure: boolean
sameSite: 'Strict' | 'Lax' | 'None'
priority: 'Low' | 'Medium' | 'High'
prefix: secure | 'host'
partitioned: boolean


例

```ts
// Regular cookies
setCookie(c, 'great_cookie', 'banana', {
  path: '/',
  secure: true,
  domain: 'example.com',
  httpOnly: true,
  maxAge: 1000,
  expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
  sameSite: 'Strict',
})

// Signed cookies
await setSignedCookie(
  c,
  'fortune_cookie',
  'lots-of-money',
  'secret ingredient',
  {
    path: '/',
    secure: true,
    domain: 'example.com',
    httpOnly: true,
    maxAge: 1000,
    expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
    sameSite: 'Strict',
  }
)

```



### deleteCookie

path: string
secure: boolean
domain: string


#### 例

```ts
deleteCookie(c, 'banana', {
  path: '/',
  secure: true,
  domain: 'example.com',
})

```





#### deleteCookie returns the deleted value:

```ts
const deletedCookie = deleteCookie(c, 'delicious_cookie')

```



### __Secure- and __Host- prefix

Cookie ヘルパーは、Cookie 名に __Secure- および __Host- プレフィックスをサポートします。 Cookie 名にプレフィックスがあるかどうかを確認する場合は、プレフィックス オプションを指定します。

```ts
const securePrefixCookie = getCookie(c, 'yummy_cookie', 'secure')
const hostPrefixCookie = getCookie(c, 'yummy_cookie', 'host')

const securePrefixSignedCookie = await getSignedCookie(
  c,
  secret,
  'fortune_cookie',
  'secure'
)
const hostPrefixSignedCookie = await getSignedCookie(
  c,
  secret,
  'fortune_cookie',
  'host'
)

```

また、Cookie を設定するときにプレフィックスを指定する場合は、プレフィックス オプションに値を指定します。

```ts
setCookie(c, 'delicious_cookie', 'macha', {
  prefix: 'secure', // or `host`
})

await setSignedCookie(
  c,
  'delicious_cookie',
  'macha',
  'secret choco chips',
  {
    prefix: 'secure', // or `host`
  }
)

```



### Following the best practices

新しい Cookie RFC (別名 cookie-bis) と CHIPS には、開発者が従うべき Cookie 設定のベスト プラクティスがいくつか含まれています。

RFC6265bis-13
Max-Age/Expires limitation
__Host-/__Secure- prefix limitation
CHIPS-01
Partitioned limitation
Hono is following the best practices. The cookie helper will throw an Error when parsing cookies under the following conditions:

The cookie name starts with __Secure-, but secure option is not set.
The cookie name starts with __Host-, but secure option is not set.
The cookie name starts with __Host-, but path is not /.
The cookie name starts with __Host-, but domain is set.
The maxAge option value is greater than 400 days.
The expires option value is 400 days later than the current time.



## css Helper

CSS ヘルパー - hono/css- は、Hono の JS(X) に組み込まれた CSS です。

JSX の CSS は、 という名前の JavaScript テンプレートリテラルに記述できますcss。 の戻り値はcssクラス名で、クラス属性の値に設定されます。<Style />コンポーネントには CSS の値が含まれます。

### import

```ts
import { Hono } from 'hono'
import { css, cx, keyframes, Style } from 'hono/css'

```

### css

cssテンプレート・リテラルにCSSを記述することができます。
この場合、class属性の値としてheaderClassを使用します。
<Style />はCSSの内容を含むので、忘れずに追加してください。

```ts
app.get('/', (c) => {
  const headerClass = css`
    background-color: orange;
    color: white;
    padding: 1rem;
  `
  return c.html(
    <html>
      <head>
        <Style />
      </head>
      <body>
        <h1 class={headerClass}>Hello!</h1>
      </body>
    </html>
  )
})

```



## Dev

Dev Helper は開発で使用できる便利なメソッドを提供します。

```ts
import { Hono } from 'hono'
import { getRouterName, showRoutes } from 'hono/dev'

```



### getRouterName()

現在使用しているルーターの名前は、getRouterName() で取得できます。

```ts
const app = new Hono()

// ...

console.log(getRouterName(app))

```




### showRoutes()

showRoutes()関数は登録されたルートをコンソールに表示します。
次のようなアプリケーションを考えてみましょう。

```ts
const app = new Hono().basePath('/v1')

app.get('/posts', (c) => {
  // ...
})

app.get('/posts/:id', (c) => {
  // ...
})

app.post('/posts', (c) => {
  // ...
})

showRoutes(app, {
  verbose: true,
})

```

このアプリケーションの実行が開始されると、ルートは次のようにコンソールに表示されます。

GET   /v1/posts
GET   /v1/posts/:id
POST  /v1/posts



## Factory Helper

FactoryHelperは、ミドルウェアなどのHonoのコンポーネントを作成するための便利な機能を提供します。

適切なTypeScript型を設定するのが難しい場合もありますが、このヘルパーによってそれが容易になります。



### import

```ts
import { Hono } from 'hono'
import { createFactory, createMiddleware } from 'hono/factory'

```

### createFactory()

createFactory()Factory クラスのインスタンスを作成します。

```ts
import { createFactory } from 'hono/factory'

const factory = createFactory()

```

Env 型をジェネリックとして渡すことができます。

```ts
type Env = {
  Variables: {
    foo: string
  }
}

const factory = createFactory<Env>()

```



### createMiddleware()

createMiddleware() は factory.createMiddleware() のショートカットです。この関数は、カスタム・ミドルウェアを作成します。

```ts
const messageMiddleware = createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('X-Message', 'Good morning!')
})

```

ヒント: メッセージのような引数を取得したい場合は、次のように関数として作成できます。

```ts
const messageMiddleware = (message: string) => {
  return createMiddleware(async (c, next) => {
    await next()
    c.res.headers.set('X-Message', message)
  })
}

app.use(messageMiddleware('Good evening!'))

```

### factory.createHandlers()

createHandlers()は、app.get('/')とは別の場所でハンドラを定義するのに役立ちます。

```ts
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

// ...

const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)

```



### factory.createApp()

createApp() は、適切な型を持つ Hono のインスタンスを作成するのに役立つ。このメソッドとcreateFactory()を併用すれば、Env型の定義が冗長にならずに済む。このようなアプリケーションの場合、2箇所でEnvを設定しなければならない：

```ts
import { createMiddleware } from 'hono/factory'

type Env = {
  Variables: {
    myVar: string
  }
}

// 1. Set the `Env` to `new Hono()`
const app = new Hono<Env>()

// 2. Set the `Env` to `createMiddleware()`
const mw = createMiddleware<Env>(async (c, next) => {
  await next()
})

app.use(mw)

```

createFactory()とcreateApp()を使うことで、Envを1カ所で設定できる。

```ts
import { createFactory } from 'hono/factory'

// ...

// Set the `Env` to `createFactory()`
const factory = createFactory<Env>()

const app = factory.createApp()

// factory also has `createMiddleware()`
const mw = factory.createMiddleware(async (c, next) => {
  await next()
})

```

createFactory() は、createApp() で作成されたアプリを初期化するために initApp オプションを受け取ることができます。
以下は、このオプションを使用する例です。

```ts
// factory-with-db.ts
type Env = {
  Bindings: {
    MY_DB: D1Database
  }
  Variables: {
    db: DrizzleD1Database
  }
}

export default createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = drizzle(c.env.MY_DB)
      c.set('db', db)
      await next()
    })
  },
})

```

```ts
// crud.ts
import factoryWithDB from './factory-with-db'

const app = factoryWithDB.createApp()

app.post('/posts', (c) => {
  c.var.db.insert()
  // ...
})

```



## html Helper

html Helperを使うと、JavaScriptのテンプレート・リテラルに `html` というタグでHTMLを書くことができます。
raw()`を使うと、内容がそのままレンダリングされる。これらの文字列は自分でエスケープしなければなりません。

### Import

```ts
import { Hono } from 'hono'
import { html, raw } from 'hono/html'

```

### html

```ts
const app = new Hono()

app.get('/:username', (c) => {
  const { username } = c.req.param()
  return c.html(
    html`<!doctype html>
      <h1>Hello! ${username}!</h1>`
  )
})

```

#### Insert snippets into JSX

インライン スクリプトを JSX に挿入します。

```tsx
app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <title>Test Site</title>
        {html`
          <script>
            // No need to use dangerouslySetInnerHTML.
            // If you write it here, it will not be escaped.
          </script>
        `}
      </head>
      <body>Hello!</body>
    </html>
  )
})

```

#### Act as functional component

HtmlEscapedString を返すためhtml、JSX を使用せずに完全に機能するコンポーネントとして動作できます。

##### Use `html` to speed up the process instead of `memo`

```typescript
const Footer = () => html`
  <footer>
    <address>My Address...</address>
  </footer>
`

```

#### Receives props and embeds values

propsを受け取り、値を埋め込む

```typescript
interface SiteData {
  title: string
  description: string
  image: string
  children?: any
}
const Layout = (props: SiteData) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
  <head prefix="og: http://ogp.me/ns#">
  <meta property="og:type" content="article">
  <!-- More elements slow down JSX, but not template literals. -->
  <meta property="og:title" content="${props.title}">
  <meta property="og:image" content="${props.image}">
</head>
<body>
  ${props.children}
</body>
</html>
`

const Content = (props: { siteData: SiteData; name: string }) => (
  <Layout {...props.siteData}>
    <h1>Hello {props.name}</h1>
  </Layout>
)

app.get('/', (c) => {
  const props = {
    name: 'World',
    siteData: {
      title: 'Hello <> World',
      description: 'This is a description',
      image: 'https://example.com/image.png',
    },
  }
  return c.html(<Content {...props} />)
})

```

### `raw()`

```ts
app.get('/', (c) => {
  const name = 'John &quot;Johnny&quot; Smith'
  return c.html(html`<p>I'm ${raw(name)}.</p>`)
})

```

### Tips

これらのライブラリのおかげで、Visual Studio Code と vim はテンプレートリテラルを HTML として解釈し、構文の強調表示と書式設定を適用できるようになります。

- <https://marketplace.visualstudio.com/items?itemName=bierner.lit-html>
- <https://github.com/MaxMEllon/vim-jsx-pretty>






## JWT

# JWT Authentication Helper

このヘルパーは、JSON Web Token (JWT) のエンコード、デコード、署名、検証の機能を提供します。JWT は、Web アプリケーションでの認証と承認の目的でよく使用されます。このヘルパーは、さまざまな暗号化アルゴリズムをサポートする堅牢な JWT 機能を提供します。

### Import

このヘルパーを使用するには、次のようにインポートします。

```ts
import { decode, sign, verify } from 'hono/jwt'

```

::: info
[JWT Middleware](/docs/middleware/builtin/jwt) also import the `jwt` function from the `hono/jwt`.
:::

### `sign()`

この関数は、ペイロードをエンコードし、指定されたアルゴリズムとシークレットを使用して署名することで、JWT トークンを生成します。

```ts
sign(
  payload: unknown,
  secret: string,
  alg?: 'HS256';

): Promise<string>;

```

#### Example

```ts
import { sign } from 'hono/jwt'

const payload = {
  sub: 'user123',
  role: 'admin',
  exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
}
const secret = 'mySecretKey'
const token = await sign(payload, secret)

```

#### Options

<br/>

##### <Badge type="danger" text="required" /> payload: `unknown`

The JWT payload to be signed. You can include other claims like in [Payload Validation](#payload-validation).

##### <Badge type="danger" text="required" /> secret: `string`

The secret key used for JWT verification or signing.

##### <Badge type="info" text="optional" /> alg: [AlgorithmTypes](#supported-algorithmtypes)

The algorithm used for JWT signing or verification. The default is HS256.

### `verify()`

この関数は、JWT トークンが本物であり、まだ有効であるかどうかを確認します。トークンが変更されていないことを確認し、Payload Validation を追加した場合にのみ有効性をチェックします。

```ts
verify(
  token: string,
  secret: string,
  alg?: 'HS256';
): Promise<any>;


```

#### Example

```ts
import { verify } from 'hono/jwt'

const tokenToVerify = 'token'
const secretKey = 'mySecretKey'

const decodedPayload = await verify(tokenToVerify, secretKey)
console.log(decodedPayload)

```

#### Options

<br/>

##### <Badge type="danger" text="required" /> token: `string`

検証する JWT トークン。

##### <Badge type="danger" text="required" /> secret: `string`

JWT の検証または署名に使用される秘密キー。

##### <Badge type="info" text="optional" /> alg: [AlgorithmTypes](#supported-algorithmtypes)

JWT の署名または検証に使用されるアルゴリズム。デフォルトは HS256 です。

### `decode()`

This function decodes a JWT token without performing signature verification. It extracts and returns the header and payload from the token.

```ts
decode(token: string): { header: any; payload: any };

```

#### Example

```ts
import { decode } from 'hono/jwt'

// Decode the JWT token
const tokenToDecode =
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAidXNlcjEyMyIsICJyb2xlIjogImFkbWluIn0.JxUwx6Ua1B0D1B0FtCrj72ok5cm1Pkmr_hL82sd7ELA'

const { header, payload } = decode(tokenToDecode)

console.log('Decoded Header:', header)
console.log('Decoded Payload:', payload)

```

#### Options

<br/>

##### <Badge type="danger" text="required" /> token: `string`

The JWT token to be decoded.

> The `decode` function allows you to inspect the header and payload of a JWT token _**without**_ performing verification. This can be useful for debugging or extracting information from JWT tokens.

### Payload Validation

When verifying a JWT token, the following payload validations are performed:

- `exp`: The token is checked to ensure it has not expired.
- `nbf`: The token is checked to ensure it is not being used before a specified time.
- `iat`: The token is checked to ensure it is not issued in the future.

Please ensure that your JWT payload includes these fields, as an object, if you intend to perform these checks during verification.

### Custom Error Types

The module also defines custom error types to handle JWT-related errors.

- `JwtAlgorithmNotImplemented`: Indicates that the requested JWT algorithm is not implemented.
- `JwtTokenInvalid`: Indicates that the JWT token is invalid.
- `JwtTokenNotBefore`: Indicates that the token is being used before its valid date.
- `JwtTokenExpired`: Indicates that the token has expired.
- `JwtTokenIssuedAt`: Indicates that the "iat" claim in the token is incorrect.
- `JwtTokenSignatureMismatched`: Indicates a signature mismatch in the token.

### Supported AlgorithmTypes

The module supports the following JWT cryptographic algorithms:

- `HS256`: HMAC using SHA-256
- `HS384`: HMAC using SHA-384
- `HS512`: HMAC using SHA-512
- `RS256`: RSASSA-PKCS1-v1_5 using SHA-256
- `RS384`: RSASSA-PKCS1-v1_5 using SHA-384
- `RS512`: RSASSA-PKCS1-v1_5 using SHA-512
- `PS256`: RSASSA-PSS using SHA-256 and MGF1 with SHA-256
- `PS384`: RSASSA-PSS using SHA-386 and MGF1 with SHA-386
- `PS512`: RSASSA-PSS using SHA-512 and MGF1 with SHA-512
- `ES256`: ECDSA using P-256 and SHA-256
- `ES384`: ECDSA using P-384 and SHA-384
- `ES512`: ECDSA using P-521 and SHA-512
- `EdDSA`: EdDSA using Ed25519



## SSG Helper

## Streaming

## Testing

# Testing Helper

テスト ヘルパーは、Hono アプリケーションのテストを容易にする機能を提供します。

### Import

```ts
import { Hono } from 'hono'
import { testClient } from 'hono/testing'

```

### `testClient()`

testClient()はHonoのインスタンスを第1引数にとり、Hono Clientのオブジェクトを返します。 これを使うことで、エディタ補完でリクエストを定義することができます。

```ts
import { testClient } from 'hono/testing'

it('test', async () => {
  const app = new Hono().get('/search', (c) =>
    c.json({ hello: 'world' })
  )
  const res = await testClient(app).search.$get()

  expect(await res.json()).toEqual({ hello: 'world' })
})

```



## WebSocket

WebSocket Helper は、Hono アプリケーションのサーバー側 WebSocket のヘルパーです。

現在、Cloudflare Workers / Pages、Deno、および Bun アダプターが利用可能です。

----------------------------------------

# Middleware

## Basic Authentication Middleware

HTTPの Basic認証 を実装します。ユーザー名とパスワードをBase64エンコードしてヘッダーに含めることで認証を行います。

このミドルウェアは、指定されたパスに Basic 認証を適用できます。Cloudflare Workers や他のプラットフォームで Basic 認証を実装するのは見た目よりも複雑ですが、このミドルウェアを使用すると簡単です。

基本認証スキームが内部でどのように機能するかの詳細については、MDN ドキュメントを参照してください。

HTTP authentication - HTTP | MDN
https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme



### Import

```ts
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

```

### Usage

```ts
const app = new Hono()

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

app.get('/auth/page', (c) => {
  return c.text('You are authorized')
})

```

特定のルート + メソッドに制限するには:

```ts
const app = new Hono()

app.get('/auth/page', (c) => {
  return c.text('Viewing page')
})

app.delete(
  '/auth/page',
  basicAuth({ username: 'hono', password: 'acoolproject' }),
  (c) => {
    return c.text('Page deleted')
  }
)

```

ユーザーを自分で確認したい場合はverifyUserオプションを指定してください。返答するとtrue承認されたことを意味します。

```ts
const app = new Hono()

app.use(
  basicAuth({
    verifyUser: (username, password, c) => {
      return (
        username === 'dynamic-user' && password === 'hono-password'
      )
    },
  })
)

```

### Options

#### <Badge type="danger" text="required" /> username: `string`

The username of the user who is authenticating.

#### <Badge type="danger" text="required" /> password: `string`

The password value for the provided username to authenticate against.

#### <Badge type="info" text="optional" /> realm: `string`

The domain name of the realm, as part of the returned WWW-Authenticate challenge header. The default is `"Secure Area"`.
See more: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate#directives

#### <Badge type="info" text="optional" /> hashFunction: `Function`

A function to handle hashing for safe comparison of passwords.

#### <Badge type="info" text="optional" /> verifyUser: `(username: string, password: string, c: Context) => boolean | Promise<boolean>`

The function to verify the user.

#### <Badge type="info" text="optional" /> invalidUserMessage: `string | object | MessageFunction`

`MessageFunction` is `(c: Context) => string | object | Promise<string | object>`. The custom message if the user is invalid.

### More Options

#### <Badge type="info" text="optional" /> ...users: `{ username: string, password: string }[]`



### Recipes

#### Defining Multiple Users

このミドルウェアでは、さらに `username` と `password` のペアを定義するオブジェクトを含む任意のパラメータを渡すこともできます。

```ts
app.use(
  '/auth/*',
  basicAuth(
    {
      username: 'hono',
      password: 'acoolproject',
      // Define other params in the first object
      realm: 'www.example.com',
    },
    {
      username: 'hono-admin',
      password: 'super-secure',
      // Cannot redefine other params here
    },
    {
      username: 'hono-user-1',
      password: 'a-secret',
      // Or here
    }
  )
)

```

または、ハードコードが少ない場合

```ts
import { users } from '../config/users'

app.use(
  '/auth/*',
  basicAuth(
    {
      realm: 'www.example.com',
      ...users[0],
    },
    ...users.slice(1)
  )
)

```



## Bearer Authentication Middleware

Bearer Authミドルウェアは、RequestヘッダーのAPIトークンを検証することで、認証を提供します。

HTTPの Bearer認証 を実装します。トークンをAuthorizationヘッダーに含めることで認証を行います。通常、 JWT (JSON Web Token) と組み合わせて使用 されます。

エンドポイントにアクセスする HTTP クライアントは、ヘッダ値として `Bearer {トークン}` を持つ `Authorization` ヘッダを追加します。

ターミナルから `curl` を使用すると、次のようになります。

```sh
curl -H 'Authorization: Bearer honoiscool' http://localhost:8787/auth/page

```

### Import

```ts
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

```

### Usage

> [!NOTE]
>token正規表現に一致する必要があり/[A-Za-z0-9._~+/-]+=*/ます。

一致しない場合は400エラーが返されます。

特に、この正規表現はURLセーフなBase64エンコードJWTと標準のBase64エンコードJWTの両方に対応しています。

このミドルウェアでは、ベアラートークンがJWTである必要はなく、上記の正規表現に一致していれば十分です。



```ts
const app = new Hono()

const token = 'honoiscool'

app.use('/api/*', bearerAuth({ token }))

app.get('/api/page', (c) => {
  return c.json({ message: 'You are authorized' })
})

```

特定のルート + メソッドに制限するには

```ts
const app = new Hono()

const token = 'honoiscool'

app.get('/api/page', (c) => {
  return c.json({ message: 'Read posts' })
})

app.post('/api/page', bearerAuth({ token }), (c) => {
  return c.json({ message: 'Created post!' }, 201)
})

```

複数のトークンを実装するには (例: 有効なトークンはすべて読み取り可能ですが、作成/更新/削除は特権トークンに制限されます)

```ts
const app = new Hono()

const readToken = 'read'
const privilegedToken = 'read+write'
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

app.on('GET', '/api/page/*', async (c, next) => {
  // List of valid tokens
  const bearer = bearerAuth({ token: [readToken, privilegedToken] })
  return bearer(c, next)
})
app.on(privilegedMethods, '/api/page/*', async (c, next) => {
  // Single valid privileged token
  const bearer = bearerAuth({ token: privilegedToken })
  return bearer(c, next)
})

// Define handlers for GET, POST, etc.

```

トークンの値を自分で確認したい場合は、verifyTokenオプションを指定します。
返されるとtrue、受け入れられたことを意味します。

```ts
const app = new Hono()

app.use(
  '/auth-verify-token/*',
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === 'dynamic-token'
    },
  })
)

```

### Options

#### <Badge type="danger" text="required" /> token: `string` | `string[]`

受信ベアラートークンを検証するための文字列。

#### <Badge type="info" text="optional" /> realm: `string`

返される WWW-Authenticate チャレンジ ヘッダーの一部としてのレルムのドメイン名。デフォルトは""です。
See more: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate#directives

#### <Badge type="info" text="optional" /> prefix: `string`

The prefix (or known as `schema`) for the Authorization header value. The default is `"Bearer"`.

#### <Badge type="info" text="optional" /> headerName: `string`

The header name. The default value is `Authorization`.

#### <Badge type="info" text="optional" /> hashFunction: `Function`

A function to handle hashing for safe comparison of authentication tokens.

#### <Badge type="info" text="optional" /> verifyToken: `(token: string, c: Context) => boolean | Promise<boolean>`

The function to verify the token.

#### <Badge type="info" text="optional" /> noAuthenticationHeaderMessage: `string | object | MessageFunction`

`MessageFunction` is `(c: Context) => string | object | Promise<string | object>`. The custom message if it does not have an authentication header.

#### <Badge type="info" text="optional" /> invalidAuthenticationHeaderMessage: `string | object | MessageFunction`

The custom message if the authentication header is invalid.

#### <Badge type="info" text="optional" /> invalidTokenMessage: `string | object | MessageFunction`

The custom message if the token is invalid.



## Body Limit Middleware

リクエストボディの サイズを制限 します。これにより、過大なリクエストによるサーバーへの負荷を軽減できます。

Body Limitミドルウェアはリクエストボディのファイルサイズを制限できます。
このミドルウェアはまず、リクエストに Content-Length ヘッダーがあればその値を使います。
それが設定されていなければ、ストリーム中のボディを読み込み、 指定されたファイルサイズより大きければエラーハンドラを実行します。

### Import

```ts
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'

```

### Usage

```ts
const app = new Hono()

app.post(
  '/upload',
  bodyLimit({
    maxSize: 50 * 1024, // 50kb
    onError: (c) => {
      return c.text('overflow :(', 413)
    },
  }),
  async (c) => {
    const body = await c.req.parseBody()
    if (body['file'] instanceof File) {
      console.log(`Got file sized: ${body['file'].size}`)
    }
    return c.text('pass :)')
  }
)

```

### Options

#### <Badge type="danger" text="required" /> maxSize: `number`

The maximum file size of the file you want to limit. The default is `100 * 1024` - `100kb`.

#### <Badge type="info" text="optional" /> onError: `OnError`

The error handler to be invoked if the specified file size is exceeded.

### Usage with Bun for large requests

Body Limit Middlewareを明示的に使用してデフォルトより大きなリクエストボディを許可している場合、それに応じてBun.serveの設定を変更する必要があるかもしれません。

本稿執筆時点では、Bun.serveのデフォルトのリクエストボディの上限は128MiBです。

HonoのBodyLimitMiddlewareにそれ以上の値を設定しても、リクエストは失敗し、さらにミドルウェアで指定されたonErrorハンドラは呼び出されません。

Bun.serve()がステータスコードを413に設定し、Honoにリクエストを渡す前に接続を終了するからです。

HonoとBunで128MiB以上のリクエストを受けたい場合は、Bunにも制限を設定する必要があります：

```ts
export default {
  port: process.env['PORT'] || 3000,
  fetch: app.fetch,
  maxRequestBodySize: 1024 * 1024 * 200, // your value here
}

```

または、設定に応じて次のようになります。

```ts
Bun.serve({
  fetch(req, server) {
    return app.fetch(req, { ip: server.requestIP(req) })
  },
  maxRequestBodySize: 1024 * 1024 * 200, // your value here
})

```



## Cache Middleware

レスポンスをキャッシュ します。これにより、同じリクエストに対するレスポンスを高速に返すことができます。
Next.jsのキャッシュ戦略を理解することも重要です。

Cacheミドルウェアは、Web標準のCacheAPIを使用します。

Cacheミドルウェアは現在、カスタムドメインを使用するCloudflareWorkersプロジェクトと、Deno1.26+を使用するDenoプロジェクトをサポートしています。

また、DenoDeployでも利用可能です。

CloudflareWorkersは、Cache-Controlヘッダーを尊重し、キャッシュされた応答を返します。

詳細については、CloudflareDocsのCacheを参照してください。

Denoはヘッダを尊重しないため、キャッシュを更新する必要がある場合は、独自のメカニズムを実装する必要があります。



各プラットフォームでの使用方法は、以下の使用方法を参照してください。

### Import

```ts
import { Hono } from 'hono'
import { cache } from 'hono/cache'

```

### Usage

::: code-group

```ts [Cloudflare Workers]
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
  })
)

```

```ts [Deno]
// Must use `wait: true` for the Deno runtime
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
    wait: true,
  })
)

```

:::

### Options

#### <Badge type="danger" text="required" /> cacheName: `string` | `(c: Context) => string` | `Promise<string>`

The name of the cache. Can be used to store multiple caches with different identifiers.

#### <Badge type="info" text="optional" /> wait: `boolean`

A boolean indicating if Hono should wait for the Promise of the `cache.put` function to resolve before continuing with the request. _Required to be true for the Deno environment_. The default is `false`.

#### <Badge type="info" text="optional" /> cacheControl: `string`

A string of directives for the `Cache-Control` header. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for more information. When this option is not provided, no `Cache-Control` header is added to requests.

#### <Badge type="info" text="optional" /> vary: `string` | `string[]`

Sets the `Vary` header in the response. If the original response header already contains a `Vary` header, the values are merged, removing any duplicates. Setting this to `*` will result in an error. For more details on the Vary header and its implications for caching strategies, refer to the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary).

#### <Badge type="info" text="optional" /> keyGenerator: `(c: Context) => string | Promise<string>`

Generates keys for every request in the `cacheName` store. This can be used to cache data based on request parameters or context parameters. The default is `c.req.url`.






Compress
レスポンスを 圧縮 します（例
gzip, br）。これにより、レスポンスのサイズを小さくして、クライアントへの転送時間を短縮できます。

Context Storage
リクエストのコンテキストに データを保存・取得 するための機能を提供します。`c.set()`や`c.get()`を使用して、リクエスト間でデータを共有できます。このデータはリクエストのライフサイクル内でのみ有効で、リクエストを跨いでの永続化はできません。

CORS
Cross-Origin Resource Sharing （クロスオリジンリソース共有）を制御します。異なるオリジンからのリクエストを許可するかどうかを定義できます。CORSヘッダーを設定することで、ブラウザのセキュリティ制限を回避し、異なるオリジン間でのリソース共有を可能にします。Next.jsでは、ミドルウェアまたは`next.config.js`でCORSを設定できます。

CSRF Protection
Cross-Site Request Forgery （クロスサイトリクエストフォージェリ）攻撃から保護します。通常、トークンを使用してリクエストが正規のものかどうかを検証します。

ETag
Entity Tag （エンティティタグ）を生成・検証します。これにより、リソースが変更されていない場合に、クライアントにキャッシュされたレスポンスを返すことができます。これにより、サーバーの負荷を軽減し、クライアントの応答性を向上させます。

IP Restriction
特定のIPアドレスからのアクセスを制限 します。これにより、特定のIPアドレスからの攻撃や不正アクセスを防止できます。

JSX Renderer
JSXをレンダリングするためのミドルウェアです。HonoでReactコンポーネントを使用する際に役立ちます。

JWT
JSON Web Token を検証します。認証や認可のために、リクエストに含まれるJWTを検証し、ユーザーのアクセスを制御します。NextAuth.jsのような認証ライブラリと連携して使われることが多いです。

Logger
リクエストの ログを出力 します。これにより、リクエストの詳細な情報を記録し、デバッグや監視に役立てることができます。カスタムのロガーミドルウェアを実装することも可能です。

Method Override
HTTPメソッドを オーバーライド します。例えば、POSTリクエストで`X-HTTP-Method-Override`ヘッダーを使って、PUTやDELETEなどの別のメソッドとして処理できます。

Pretty JSON
JSONレスポンスを 整形 します。開発時に、JSONレスポンスを人間が読みやすい形式で表示するために使用します。

Request ID
リクエストIDを生成し、コンテキストに設定 します。これにより、ログやトレースを追跡する際に役立ちます。

Secure Headers
セキュリティ関連のHTTPヘッダー を設定します。例えば、`X-Frame-Options`、`X-Content-Type-Options`、`Content-Security-Policy`などのヘッダーを設定して、クリックジャッキングやXSS（クロスサイトスクリプティング）などの攻撃を防ぎます。

Timeout
リクエスト処理に タイムアウトを設定 します。これにより、処理が長時間かかるリクエストを中断し、サーバーのリソースを保護します。

Timing
リクエスト処理の 時間を計測 します。パフォーマンスのボトルネックを特定し、最適化するために使用します。

Trailing Slash
URLの 末尾のスラッシュを統一 します。これにより、`/path`と`/path/`のようなURLを同じリソースとして扱うことができます。

3rd-party Middleware
サードパーティ製のミドルウェア を利用するための機能です。これにより、様々なライブラリの機能をHonoに統合できます。GraphQLサーバーミドルウェア、Sentryミドルウェア、Firebase認証ミドルウェアなどが例として挙げられます。

ミドルウェアの実行順序

ミドルウェアは、登録された順に実行されます。`app.use()`で登録されたミドルウェアは、ハンドラーの前に実行され、`next()`関数を呼び出すことで、次のミドルウェアまたはハンドラーに処理を渡します。ミドルウェアは、リクエストの処理前後に処理を追加できるため、認証、ロギング、CORSなどの共通処理を効率的に実装できます。

Next.jsのミドルウェアとの違い

Next.jsにもミドルウェアがありますが、Honoのミドルウェアとは役割が異なります。Next.jsのミドルウェアは、主にページやルートレベルでのアクセス制御を行います。一方、Honoのミドルウェアは、リクエストとレスポンスの処理に介入し、より細かい制御が可能です。Next.jsのミドルウェアは、リクエストがサーバーに到達する前に実行され、Honoのミドルウェアは、Honoアプリケーション内で実行されます。

まとめ

Honoのミドルウェアは、 リクエストとレスポンスの処理をカスタマイズ するための強力なツールです。
各ミドルウェアは、 認証、キャッシュ、ログ、セキュリティなど、特定の機能を提供 します。
ミドルウェアを 適切に組み合わせる ことで、Honoアプリケーションの機能を拡張し、セキュリティやパフォーマンスを向上させることができます。
実行順序を意識 してミドルウェアを登録することで、期待通りの動作を実現できます。
サードパーティ製のミドルウェア を利用することで、より複雑な機能を簡単に追加できます。

これらのミドルウェアを理解し、適切に利用することで、より堅牢で効率的なHonoアプリケーションを開発することができます。



## Combine Middleware

Combine Middleware は、複数のミドルウェア機能を 1 つのミドルウェアに結合します。

次の 3 つの機能があります。

some- 指定されたミドルウェアの 1 つのみを実行します。
every- 指定されたすべてのミドルウェアを実行します。
except- 条件が満たされない場合にのみ、指定されたすべてのミドルウェアを実行します。


### 使用法

Combine Middleware を使用した複雑なアクセス制御ルールの例を次に示します。

```ts
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { getConnInfo } from 'hono/cloudflare-workers'
import { every, some } from 'hono/combine'
import { ipRestriction } from 'hono/ip-restriction'
import { rateLimit } from '@/my-rate-limit'

const app = new Hono()

app.use(
  '*',
  some(
    every(
      ipRestriction(getConnInfo, { allowList: ['192.168.0.2'] }),
      bearerAuth({ token })
    ),
    // If both conditions are met, rateLimit will not execute.
    rateLimit()
  )
)

app.get('/', (c) => c.text('Hello Hono!'))

```

### some

true を返す最初のミドルウェアを実行します。
ミドルウェアは順番に適用され、いずれかのミドルウェアが正常に終了した場合、後続のミドルウェアは実行されません。

```ts
import { some } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'
import { myRateLimit } from '@/rate-limit'

// クライアントが有効なトークンを持っている場合は、レート制限をスキップします。
// それ以外の場合は、レート制限を適用します。

app.use(
  '/api/*',
  some(bearerAuth({ token }), myRateLimit({ limit: 100 }))
)

```



### every

すべてのミドルウェアを実行し、いずれかが失敗した場合は停止します。ミドルウェアは順番に適用され、いずれかのミドルウェアでエラーが発生した場合、後続のミドルウェアは実行されません。

```ts
import { some, every } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'
import { myCheckLocalNetwork } from '@/check-local-network'
import { myRateLimit } from '@/rate-limit'

// クライアントがローカルネットワーク内にある場合は、認証とレート制限をスキップします。
// そうでなければ、認証とレート制限を適用します。
app.use(
  '/api/*',
  some(
    myCheckLocalNetwork(),
    every(bearerAuth({ token }), myRateLimit({ limit: 100 }))
  )
)

```



### except

条件が満たされた場合を除いて、すべてのミドルウェアを実行します。
条件として文字列または関数を渡すことができます。
複数のターゲットを一致させる必要がある場合は、配列として渡します。

```ts
import { except } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'

// If client is accessing public API, skip authentication.
// Otherwise, require a valid token.
app.use('/api/*', except('/api/public/*', bearerAuth({ token })))

```






## Compress Middleware

このミドルウェアは、Accept-Encodingリクエストヘッダに従ってレスポンスボディを圧縮します。


### Import

```ts
import { Hono } from 'hono'
import { compress } from 'hono/compress'

```

### 使用法

```ts
const app = new Hono()

app.use(compress())

```

### オプション

オプションエンコーディング: 'gzip'|'deflate'
応答の圧縮を可能にする圧縮方式。 またはgzipのいずれかですdeflate。定義されていない場合は、両方が許可され、ヘッダーに基づいて使用されますAccept-Encoding。gzipこのオプションが指定されておらず、クライアントがヘッダーで両方を提供している場合は、 が優先されますAccept-Encoding。

オプションしきい値：number
圧縮する最小サイズ（バイト単位）。デフォルトは 1024 バイトです。



## Context Storage Middleware

リクエストのコンテキストに データを保存・取得 するための機能を提供します。
`c.set()`や`c.get()`を使用して、リクエスト間でデータを共有できます。
このデータはリクエストのライフサイクル内でのみ有効で、リクエストを跨いでの永続化はできません。

データをグローバルに保存して、アクセスできるようにしています。



## CORS Middleware

Cross-Origin Resource Sharing （クロスオリジンリソース共有）を制御します。
異なるオリジンからのリクエストを許可するかどうかを定義できます。CORSヘッダーを設定することで、ブラウザのセキュリティ制限を回避し、異なるオリジン間でのリソース共有を可能にします。

Next.jsでは、ミドルウェアまたは`next.config.js`でCORSを設定できます。


## CSRF Protection Middleware

Cross-Site Request Forgery （クロスサイトリクエストフォージェリ）攻撃から保護します。
通常、トークンを使用してリクエストが正規のものかどうかを検証します。

CSRF Protection Middlewareは、リクエストヘッダをチェックすることでCSRF攻撃を防ぎます。

このミドルウェアは、Originヘッダの値とリクエストされたURLを比較することで、フォーム要素での送信などのCSRF攻撃を防御します。
Originヘッダを送信しない古いブラウザや、リバースプロキシを使ってOriginヘッダを削除する環境では、うまく動作しないことがあります。
そのような環境では、他のCSRFトークンの方法を使用してください。



## ETag Middleware

EntityTag（エンティティタグ）を生成・検証します。

これにより、リソースが変更されていない場合に、クライアントにキャッシュされたレスポンスを返すことができます。

これにより、サーバーの負荷を軽減し、クライアントの応答性を向上させます。


ETagとは
リソースのバージョンを識別するためのヘッダーです。
ETagミドルウェアは、ETagヘッダーを自動的に追加し、キャッシュ効率を向上させるのに役立ちます。
Honoでは、ミドルウェアを柔軟に利用でき、独自のミドルウェアを作成したり、サードパーティのミドルウェアを利用したりできます。

## IP Restriction Middleware

特定のIPアドレスからのアクセスを制限 します。
これにより、特定のIPアドレスからの攻撃や不正アクセスを防止できます。



## JSX Renderer Middleware

JSXをレンダリングするためのミドルウェアです。
HonoでReactコンポーネントを使用する際に役立ちます。

## JWT Middleware

JSON Web Token を検証します。
認証や認可のために、リクエストに含まれるJWTを検証し、ユーザーのアクセスを制御します。
NextAuth.jsのような認証ライブラリと連携して使われることが多いです。

## Logger Middleware

リクエストの ログを出力 します。
これにより、リクエストの詳細な情報を記録し、デバッグや監視に役立てることができます。
カスタムのロガーミドルウェアを実装することも可能です。

## Method Override Middleware

HTTPメソッドを オーバーライド します。
例えば、POSTリクエストで`X-HTTP-Method-Override`ヘッダーを使って、PUTやDELETEなどの別のメソッドとして処理できます。

## Pretty JSON Middleware

JSONレスポンスを 整形 します。開発時に、JSONレスポンスを人間が読みやすい形式で表示するために使用します。

## Request ID Middleware

リクエストIDを生成し、コンテキストに設定 します。これにより、ログやトレースを追跡する際に役立ちます。

## Secure Headers Middleware

セキュリティ関連のHTTPヘッダーを設定します。

例えば、`X-Frame-Options`、`X-Content-Type-Options`、`Content-Security-Policy`などのヘッダーを設定して、クリックジャッキングやXSS（クロスサイトスクリプティング）などの攻撃を防ぎます。

## Timeout Middleware

リクエスト処理にタイムアウトを設定します。

これにより、処理が長時間かかるリクエストを中断し、サーバーのリソースを保護します。

## Timing Middleware

リクエスト処理の 時間を計測 します。
パフォーマンスのボトルネックを特定し、最適化するために使用します。

## Trailing Slash Middleware

URLの末尾のスラッシュを統一します。

これにより、`/path`と`/path/`のようなURLを同じリソースとして扱うことができます。

## 3rd-party Middleware Middleware

サードパーティ製のミドルウェアを利用するための機能です。

これにより、様々なライブラリの機能をHonoに統合できます。

GraphQLサーバーミドルウェア、Sentryミドルウェア、Firebase認証ミドルウェアなどが例として挙げられます。





----------------------------------------



# ミドルウェアの実行順序

ミドルウェアは、登録された順に実行されます。`app.use()`で登録されたミドルウェアは、ハンドラーの前に実行され、`next()`関数を呼び出すことで、次のミドルウェアまたはハンドラーに処理を渡します。ミドルウェアは、リクエストの処理前後に処理を追加できるため、認証、ロギング、CORSなどの共通処理を効率的に実装できます。

Next.jsのミドルウェアとの違い

Next.jsにもミドルウェアがありますが、Honoのミドルウェアとは役割が異なります。Next.jsのミドルウェアは、主にページやルートレベルでのアクセス制御を行います。一方、Honoのミドルウェアは、リクエストとレスポンスの処理に介入し、より細かい制御が可能です。Next.jsのミドルウェアは、リクエストがサーバーに到達する前に実行され、Honoのミドルウェアは、Honoアプリケーション内で実行されます。

まとめ

Honoのミドルウェアは、 リクエストとレスポンスの処理をカスタマイズ するための強力なツールです。
各ミドルウェアは、 認証、キャッシュ、ログ、セキュリティなど、特定の機能を提供 します。
ミドルウェアを 適切に組み合わせる ことで、Honoアプリケーションの機能を拡張し、セキュリティやパフォーマンスを向上させることができます。
実行順序を意識 してミドルウェアを登録することで、期待通りの動作を実現できます。
サードパーティ製のミドルウェア を利用することで、より複雑な機能を簡単に追加できます。

これらのミドルウェアを理解し、適切に利用することで、より堅牢で効率的なHonoアプリケーションを開発することができます。