<!--
title:   Next.js 13 App Router の調査 DynamicServerError - Dynamic Server Usage
tags:    AppRouter,Next.js
id:      07e2c56cb8f470e3d65a
private: true
-->
Next.js 13 App Router の調査

# DynamicServerError - Dynamic Server Usage

DynamicServerError - Dynamic Server Usage | Next.js

https://nextjs.org/docs/messages/dynamic-server-error


# DynamicServerError - 動的サーバーの使用法

## このメッセージが発生した理由

このメッセージが発生した理由は、非同期コンテキスト（next/headersのヘッダーやクッキーなど）に依存するNext.js関数を使用しようとしたが、その関数を実行する関数と同じコールスタックにバインドされていなかったためです。たとえば、setTimeoutやsetIntervalの内部でcookies()を呼び出すなどです。

### 解説

このメッセージが出た理由は、Next.js関数を使っているのに、その関数を実行する関数と同じコールスタックにバインドされていなかったからです。つまり、関数を呼び出すときに、その関数が必要とする情報が、呼び出し元の関数とは別の場所にあったということです。

#### コールスタック
プログラムが実行される際に、どの関数がどの順序で呼び出されたかを記録するスタックのことです。つまり、関数が呼び出されるたびに、その関数がスタックに追加され、関数が終了するとスタックから削除されます。

#### コールスタックにバインドされていない
このメッセージで言及されている「コールスタックにバインドされていない」とは、関数を呼び出すときに必要な情報が、呼び出し元の関数とは別の場所にあるということです。
つまり、関数を呼び出すときに、その関数が必要とする情報が、呼び出し元の関数とは別のスタックにあるということです。

例えば、setTimeoutやsetIntervalの中で、Cookie や Headerなどの関数を呼び出すと、その関数が必要とする情報が、setTimeoutやsetIntervalのスタックにあるため、関数を実行するときに必要な情報が見つからず、エラーが発生します。

この問題を解決するためには、関数を呼び出すときに必要な情報を、同じスタック内にバインドする必要があります。これは、非同期コンテキストと呼ばれるもので、Next.jsでは、CookieやHeaderなどの関数を、Reactコンポーネントツリー内の任意の場所から呼び出すために使用されます。

利用用途としては、Next.jsでCookieやHeaderなどの関数を使用する場合に、非同期コンテキストを使用することが推奨されています。また、非同期処理であっても同じコールスタック内でデータを渡す必要がある場合にも、 非同期コンテキスト を使用することができます。



Next.jsでは、Reactコンポーネントツリー内の任意の場所からCookieやHeaderなどの関数を呼び出す場合に、非同期コンテキストを使用することが推奨されています。これにより、関数を呼び出すときに必要な情報を、同じコールスタック内にバインドすることができます。

非同期コンテキストを使用することで、関数を呼び出すときに必要な情報を、同じコールスタック内にバインドすることができるため、エラーを回避することができます。ただし、非同期コンテキストを誤用すると、パフォーマンスの問題が発生する可能性があるため、注意が必要です。



Next.jsでは、静的ページの生成中に動的関数の使用を検出すると、DynamicServerErrorをスローし、それをキャッチしてページを自動的に動的レンダリングに移行します。しかし、キャッチされない場合は、このビルド時エラーになります。



# 非同期コンテキストとは何ですか？
非同期コンテキストとは、非同期処理であっても同じコールスタック内でデータを渡す方法のことです。Next.jsでは、Reactコンポーネントツリー内の任意の場所からCookieやHeaderなどの関数が呼び出された場合に使用されます。JavaScriptでは、非同期処理が多用されるため、非同期コンテキストを使用することで、コールスタック内でデータを渡すことができます。



# これが発生する可能性のあるシナリオ

* 関数がsetTimeoutまたはsetIntervalの内部で呼び出され、コンテキストがバインドされているコールスタックの外部で値が読み込まれた。

* 関数が非同期操作の後に呼び出されたが、プロミスが待ち受けられなかった。これにより、非同期操作が完了した後に関数が呼び出され、新しい実行コンテキストが生成され、元の非同期コンテキストが失われる可能性があります。



#### 解説

「setTimeout」や「setInterval」とは、JavaScriptで非同期処理を実行するための関数です。これらの関数は、指定された時間が経過した後に、指定された関数を実行することができます。

しかし、setTimeoutやsetIntervalの中でCookieやHeaderなどの関数を呼び出すと、その関数が必要とする情報が、setTimeoutやsetIntervalのスタックにあるため、関数を実行するときに必要な情報が見つからず、エラーが発生します。

また、言及されている「async operation」とは、非同期処理のことです。
JavaScriptでは、非同期処理が多用されるため、async/awaitやPromiseなどの機能が提供されています。
しかし、async/awaitやPromiseを使用する場合、必ずawaitやthenを使用して、非同期処理が完了するまで待機する必要があります。
そうしない場合、非同期処理が完了する前に関数が呼び出される可能性があり、その結果、元の非同期コンテキストが失われる可能性があります。

例えば、以下のようなコードがあった場合、Cookieが取得できず、ビルド時エラーが発生します。

```javascript
import { cookies } from 'next/headers'

async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      // cookies will be called outside of the async context, causing a build-time error
      resolve(cookies())
    }, 1000)
  )
}
```

この場合、setTimeoutの中でCookieを取得しようとしていますが、setTimeoutのスタックにCookieがないため、ビルド時エラーが発生します。

以上が、setTimeoutやsetIntervalの中でCookieやHeaderなどの関数を呼び出す場合や、async/awaitやPromiseを使用する場合の注意点についての説明です。


setTimeoutのスタックにCookieがないというのは？

setTimeoutの中でCookieを取得しようとした場合に、Cookieが見つからないということです。

JavaScriptでは、setTimeoutやsetIntervalのような非同期処理が多用されます。これらの関数は、指定された時間が経過した後に、指定された関数を実行することができます。しかし、setTimeoutやsetIntervalの中でCookieやHeaderなどの関数を呼び出す場合、その関数が必要とする情報が、setTimeoutやsetIntervalのスタックにあるため、関数を実行するときに必要な情報が見つからず、エラーが発生します。

たとえば、以下のようなコードがあった場合、setTimeoutの中でCookieを取得しようとしていますが、setTimeoutのスタックにCookieがないため、ビルド時エラーが発生します。

このように、setTimeoutやsetIntervalの中でCookieやHeaderなどの関数を呼び出す場合は、注意が必要です。関数を呼び出すときに必要な情報が、呼び出し元の関数とは別の場所にあるため、関数を実行するときに必要な情報が見つからず、エラーが発生する可能性があります。

# 誤った使用例

app/page.js

```
import { cookies } from 'next/headers'

async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      // cookies will be called outside of the async context, causing a build-time error
      resolve(cookies().getAll())
    }, 1000)
  )
}

export default async function Page() {
  const cookieData = await getCookieData()
  return <div>Hello World</div>
}

```

#### 解説

このコードは、Next.jsで動的レンダリングを行う際に、非同期コンテキストを維持するための例です。

```javascript
import { cookies } from 'next/headers'
```
- `next/headers`から`cookies`をインポートしています。

```javascript
async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      // cookies will be called outside of the async context, causing a build-time error
      resolve(cookies().getAll())
    }, 1000)
  )
}
```
- `getCookieData`関数は、Promiseを返す非同期関数です。
- `setTimeout`関数を使用して、1秒後に関数を実行します。
- `cookies`関数を呼び出して、Cookieを取得します。
- `resolve`関数を使用して、Promiseを解決します。

```javascript
export default async function Page() {
  const cookieData = await getCookieData()
  return <div>Hello World</div>
}
```
- `Page`関数は、Promiseを返す非同期関数です。
- `getCookieData`関数を呼び出して、Cookieを取得します。
- `await`キーワードを使用して、Promiseが解決されるまで待機します。
- `<div>Hello World</div>`を返します。



## Possible Ways to Fix It

JavaScriptでは、setTimeout、setInterval、イベントハンドラ、Promiseなどの非同期処理が多用されます。これらの処理は、新しい実行コンテキストを作成するため、async/awaitを使用する場合には注意が必要です。

async/awaitを使用する場合、Promiseをawaitすることで、非同期処理が完了するまで待機する必要があります。
そうしない場合、非同期処理が完了する前に関数が呼び出される可能性があり、その結果、元の非同期コンテキストが失われる可能性があります。

たとえば、以下のようなコードがあった場合、Promiseをawaitしないため、関数が呼び出されるタイミングが非同期処理の完了後になる可能性があります。

```javascript
import { cookies } from 'next/headers'

async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      // cookies will be called outside of the async context, causing a build-time error
      resolve(cookies())
    }, 1000)
  )
}

async function main() {
  const cookieDataPromise = getCookieData()
  // cookieDataPromise may not be resolved yet
  console.log(await cookieDataPromise)
}

main()
```

この場合、getCookieData関数がPromiseを返すため、main関数内でPromiseをawaitする必要があります。そうしない場合、getCookieData関数が完了する前にconsole.logが実行される可能性があります。

このように、async/awaitを使用する場合は、Promiseをawaitすることで、非同期処理が完了するまで待機する必要があります。

また、setTimeout、setInterval、イベントハンドラなどの非同期処理を使用する場合は、async/awaitを使用することで、元の非同期コンテキストを維持することができます。




# 正しい使用例

Example of Correct Usage

```javascript
import { cookies } from 'next/headers'

async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

export default async function Page() {
  const cookieData = await getCookieData()
  return <div>Hello World</div>
}

```

#### 解説

このコードは、Next.jsで動的レンダリングを行う際に、非同期コンテキストを維持するための例です。

```javascript
import { cookies } from 'next/headers'
```
- `next/headers`から`cookies`をインポートしています。

```javascript
async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}
```
- `getCookieData`関数は、Promiseを返す非同期関数です。
- `cookies`関数を呼び出して、Cookieを取得します。
- `setTimeout`関数を使用して、1秒後に関数を実行します。
- `resolve`関数を使用して、Promiseを解決します。

```javascript
export default async function Page() {
  const cookieData = await getCookieData()
  return <div>Hello World</div>
}
```
- `Page`関数は、Promiseを返す非同期関数です。
- `getCookieData`関数を呼び出して、Cookieを取得します。
- `await`キーワードを使用して、Promiseが解決されるまで待機します。
- `<div>Hello World</div>`を返します。

このコードは、非同期処理を行う際に、非同期コンテキストを維持することができます。これにより、Cookieなどの情報を取得する際に、ビルド時エラーを回避することができます。

このコードの利用用途としては、CookieやHeaderなどの情報を取得する際に、非同期コンテキストを維持する必要がある場合に使用することができます。また、Next.jsで動的レンダリングを行う際にも使用することができます。


