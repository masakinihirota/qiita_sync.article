<!--
title:   Next.js 14 App router Middlewareを複数のファイルに分割する方法
tags:    AppRouter,Next.js,middleware
id:      c84daec1a48ee0a02199
private: false
-->
Next.jsのMiddlewareの機能毎に分割するために、
Middlewareのファイルもそれに合わせて分割する方法を考えます。

※↓Middlewareに関する前回の記事はNext.jsのMiddlewareドキュメントを読み解いていましたが、
今回の記事は分割する部分だけに焦点を当てています。

Next.jsでの初心者向け Middleware.ts入門 (v13.1.0) + 公式マニュアル 解説 + 複数のMiddlewareの実装方法 #Next.js - Qiita

https://qiita.com/masakinihirota/items/30a5e06e3288031b9788



# 複数のMiddlewareの実装方法

今回の記事のリポジトリ

masakinihirota/middleware-test

https://github.com/masakinihirota/middleware-test

この記事のコードが載っています。

```GitHub CLI
gh repo clone masakinihirota/middleware-test

```

↑Next.js 14 App router をベースとしてMiddlewareを複数に分割したソースコードです。

# 0からNext.jsをインストールする方法

pnpm create next-app@latest



# Middlewareの基礎

Next.jsインストール直後まっさらなNext.jsで
srcフォルダ直下に、Middlewareを追加します。

※srcフォルダを作った場合、 middleware.tsはsrc直下に置かなければなりません。

```src/middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "middleware.ts: request.nextUrl.pathname",
    request.nextUrl.pathname
  );

  return NextResponse.next();
}

export const config = {};

```

↑このファイルを作ります。
このMiddlewareの機能はマッチャーに適合したパスに対して、
console.logで現在のパスをterminalに表示させているだけです。

このファイルはMiddlewareの機能として最低限必要な物となっています。
NextRequest
NextResponse
request.nextUrl.pathname
NextResponse.next();
などの説明が自身でできなければ
このコード全てを理解しておいてください。

今の時代、AIに聞けば一瞬です。

`npm run dev`
を実行して、ブラウザで開いてみると、
VSCodeのterminalに下記のように出力されます。

```terminal
! 01-08 18:15:16> npm run dev

> middleware-test@0.1.0 dev
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000

 ✓ Ready in 4.5s
 ✓ Compiled /src/middleware in 657ms (64 modules)
middleware.ts: request.nextUrl.pathname /
 ○ Compiling / ...
 ✓ Compiled / in 4.6s (500 modules)
 ✓ Compiled in 472ms (235 modules)
middleware.ts: request.nextUrl.pathname /vercel.svg
middleware.ts: request.nextUrl.pathname /_next/static/css/app/layout.css
middleware.ts: request.nextUrl.pathname /next.svg
middleware.ts: request.nextUrl.pathname /_next/static/chunks/main-app.js
middleware.ts: request.nextUrl.pathname /_next/static/chunks/webpack.js
middleware.ts: request.nextUrl.pathname /_next/static/chunks/app-pages-internals.js
middleware.ts: request.nextUrl.pathname /_next/static/chunks/app/page.js
middleware.ts: request.nextUrl.pathname /_next/static/media/c9a5bc6a7c948fb0-s.p.woff2

```

これは、middleware.ts ファイルのマッチャーが↓このように設定されているためです。

```src/middleware.ts
export const config = {};   ＜＜＜マッチャー部分です

```

↑これはミドルウェアのマッチャー部分です
このように設定してあると全てのパスをチェックすることになります。

もともと、Middleware を設定すると、ブラウザからのアクセス時に、全てのパスをチェックすることになります。

そしてその全てのパスでMiddlewareが実行されています。



このようにmiddlewareを通ってきたことがterminalに出力されています。

ではconfigに "/" ルートだけを設定してみます。


```src/middleware.ts
export const config = {
  matcher: ["/"],  ＜＜＜＜Rootだけフィルタリングをしています。
};

```

↓その結果、MiddlewareがRootだけconsole.logが実行されています。

```terminal
> middleware-test@0.1.0 dev
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000

 ✓ Ready in 5s
 ✓ Compiled /src/middleware in 445ms (64 modules)
middleware.ts: request.nextUrl.pathname /
 ○ Compiling / ...
 ✓ Compiled / in 1927ms (491 modules)
 ✓ Compiled in 518ms (235 modules)

```



----------------------------------------

# ブラウザからのリクエストの正体

Next.jsのリクエストは ↓Web APIの拡張版です

Request - Web API | MDN
https://developer.mozilla.org/ja/docs/Web/API/Request

↑この仕様から拡張されています。

Functions: NextRequest | Next.js
https://nextjs.org/docs/app/api-reference/functions/next-request

↑これがNext.jsのリクエストの仕様です。

Next.jsのWebアプリがブラウザからサーバーにリクエストを送ると
この形式で送られます。

この中身を調べると何が送られてくるのかわかります。

そしてその送られてきたリクエストの中身をどうするかは
まずMiddlewareが判断することになります。

まずは中身の正体を見てみます。

↓このNext.jsのドキュメントを読んでみます。
Functions: NextRequest | Next.js
https://nextjs.org/docs/app/api-reference/functions/next-request


これでヘッダーの中身が見れます。
  console.log('MDN', request.headers);



----------------------------------------

# Middlewareの分割

Middlewareの基礎では
Middleware.tsで1つのconsole.logを実行しました。

これを応用して、
1つのmiddleware.tsファイルの中で2つのconsole.logを実行させます。
(単にconsole.log を↓2つにするだけです。)

```src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(
    'middleware.ts: request.nextUrl.pathname',
    request.nextUrl.pathname
  );

  const url = request.url;
  console.log('middleware.ts: request.url', url);

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

```

そして↑その実行結果をそのままに維持したまま、
2つのmiddlewareを作り、2つのファイルに分割します。

それにはNext.jsの2つの分割したMiddlewareに
リクエストとレスポンスを渡す必要があります。

```Middlewareの基礎
ブラウザからのリクエスト
Middleware
Next.jsアプリ

```

いままでは、このような流れだったのを
こんどは↑これを↓このように2つに分けます。

```Middlewareの分割
ブラウザからのリクエスト
Middleware1
Middleware2
Next.jsアプリ

```

分割したMiddleware

```src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

function middleware1(request: NextRequest) {

  console.log(
    'middleware1.ts: request.nextUrl.pathname',
    request.nextUrl.pathname
  );

  return NextResponse.next();
}

function middleware2(request: NextRequest) {

  const url = request.url;
  console.log('middleware2.ts: request.url', url);

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  middleware1(request);
  middleware2(request);
}

export const config = {
  matcher: ["/"],
};

```

これでブラウザをリロードすると
Terminalへの出力は全く同じままです。

単に2つの関数に分けて呼び出しただけです。

しかしNext.jsの
NextRequest
と
NextResponse
を使って、Middleware関数へ渡しています。



次に、これを非同期に実行してみます。


```src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

async function middleware1(request: NextRequest) {
  console.log(
    'middleware1.ts: request.nextUrl.pathname',
    request.nextUrl.pathname
  );

  return NextResponse.next();
}

async function middleware2(request: NextRequest) {
  const url = request.url;
  console.log('middleware2.ts: request.url', url);

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  await middleware1(request);
  await middleware2(request);
}

export const config = {
  matcher: ['/'],
};

```

非同期にしてもTerminalへの出力は同じになります。

これがMiddlewareのシンプルな分割パターンです。

次に高階関数パターンで分割してみます。

高階関数とは簡単に言えば、関数を引数として関数に渡すことです。

```src/middleware.ts
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

// async function middleware1(request: NextRequest) {
//   console.log(
//     'middleware1.ts: request.nextUrl.pathname',
//     request.nextUrl.pathname
//   );

//   return NextResponse.next();
// }

function withMiddleware1(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(
      'middleware1.ts: request.nextUrl.pathname',
      request.nextUrl.pathname
    );

    return middleware(request, event);
  };
}

async function middleware2(request: NextRequest) {
  const url = request.url;
  console.log('middleware2.ts: request.url', url);

  return NextResponse.next();
}

export default withMiddleware1(middleware2);

// export async function middleware(request: NextRequest) {
//   await middleware1(request);
//   await middleware2(request);
// }

export const config = {
  matcher: ['/'],
};

```

このコードは、前項目でやった↑非同期のMiddlewareを
高階関数で分割しました。

わかりやすいように、
コメントアウトした部分は非同期の部分です。

withMiddleware1の返り値に
Middleware1の関数を実行させて

呼び出し方法は
export default withMiddleware1(middleware2);
↑このように関数の引数に関数を呼んでいます。

return文内に関数を回ているのがちょっとわかりにくいですかね？

Next.jsやブラウザに返すのはNextResponse.next();
MiddlewareからMiddlewareに渡すのは middleware: NextMiddleware です。
このパターンを忘れないようにしましょう。

1番目のMiddlewareを2番目に渡すパターンはわかりました。

2番目のMiddlewareを3番目に渡したいときも同じように作ります。



----------------------------------------

さらなる応用例

3つのMiddlewareに分割してみた例

```src/middleware.ts
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

function withMiddleware1(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(
      'middleware1.ts: request.nextUrl.pathname',
      request.nextUrl.pathname
    );

    return middleware(request, event);
  };
}

function withMiddleware2(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.url;
    console.log('middleware2.ts: request.url', url);

    return middleware(request, event);
  };
}

async function middleware3(request: NextRequest) {
  const credentials = request.credentials;
  console.log('middleware3.ts: request.credentials', credentials);

  return NextResponse.next();
}

export default withMiddleware1(withMiddleware2(middleware3));

export const config = {
  matcher: ['/'],
};

```

※requestから適当なものを表示させています。

これでMiddlewareを3つに分けることが出来ました。



----------------------------------------

しかし
export default withMiddleware1(withMiddleware2(middleware3));
このように関数を入れ子にしていくのは見にくいので
もうひと工夫をします。

root直下もしくはsrcの下に middlewares フォルダを作成します。

複数のMiddlewareを受け取るベースを作ります。

```src/middlewares/chain.ts
import { NextMiddleware, NextResponse } from 'next/server';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}

```

これでMiddlewareを繰り返し読み込み、そして返す関数が出来たので

次は
独立したMiddlewareの機能(withMiddleware1,withMiddleware2)をmiddlewaresフォルダの下に移動します。

```src/middlewares/middleware1.ts
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware1(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log(
      'middleware1.ts: request.nextUrl.pathname',
      request.nextUrl.pathname
    );

    return middleware(request, event);
  };
}

```

```src/middlewares/middleware2.ts
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware2(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.url;
    console.log('middleware2.ts: request.url', url);

    return middleware(request, event);
  };
}

```

```src/middlewares/middleware3.ts
import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server';

export function withMiddleware3(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const credentials = request.credentials;
    console.log('middleware3.ts: request.credentials', credentials);

    return middleware(request, event);
  };
}

```

```src/middleware.ts
import { chain } from "./middlewares/chain";
import { withMiddleware1 } from "./middlewares/middleware1";
import { withMiddleware2 } from "./middlewares/middleware2";

export default chain([withMiddleware1, withMiddleware2]);

export const config = {
  matcher: ["/"],
};

```

3つのMiddlewareのファイルに分割しても
Terminalに表示される結果はおなじになっているのが確認できます。


```Terminal
middleware1.ts: request.nextUrl.pathname /
middleware2.ts: request.url http://localhost:3000/
middleware3.ts: request.credentials same-origin

```

新しいMiddlewareの機能を追加したければ、
middlewaresフォルダにmiddleware?.tsファイルを追加すればいいだけです。


以上でMiddlewareを複数のファイルに分割する方法は終了です。

あとはconsole.log()部分を各機能に変えるだけです。



# 国際化でMiddlewareを使用する場合

国際化の処理をNext.jsのMiddlewareでやるには
↓Next.jsに国際化のドキュメントページがあります。

Routing: Internationalization | Next.js
https://nextjs.org/docs/app/building-your-application/routing/internationalization



# 参考

HamedBahram/next-middleware-chain

https://github.com/HamedBahram/next-middleware-chain

jmarioste/next-middleware-guide

https://github.com/jmarioste/next-middleware-guide
