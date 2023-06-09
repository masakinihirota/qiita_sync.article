<!--
title:   Next.js 13 (app router) with Supabase Authentication の解説
tags:    AppRouter,Next.js,Supabase,authentication
id:      3b063f27ce902db68b05
private: true
-->

# 解説
# 解説
# 解説
# 解説
# 解説


# VNS.BLUEって何？
VNS.BLUE は 開発中のサイト名です、ボタンになっていて押すとトップに戻ります。
サイト名は各自自由に変えてください。

# 目的

認証ボタンの作成 Next.js 13 (app router) with Supabase Authentication(メール認証) - Qiita

https://qiita.com/masakinihirota/items/770742842f3f020bb758

この記事の解説

## 環境

Windows10
VSCode
Next.js 13.4.1 app router
TailwindCSS
Supabase
Supabase 認証ヘルパー
react-hook-form
Zod


# リポジトリ

masakinihirota/Next.js13.4AppRouterWithSupabaseAuthentication

https://github.com/masakinihirota/Next.js13.4AppRouterWithSupabaseAuthentication


# インストール

リポジトリを使用せずに、0 からソースコードを見つつ認証ボタンアプリを構築していきます。

## フレームワークのインストール

`npx create-next-app@latest`

コマンドの実行

```terminal
05-09 03:38:29> npx create-next-app@latest
√ What is your project named? ... [アプリ名]
√ Would you like to use TypeScript with this project? ... No / [Yes]
√ Would you like to use ESLint with this project? ... No / [Yes]
√ Would you like to use Tailwind CSS with this project? ... No / [Yes]
√ Would you like to use `src/` directory with this project? ... No / [Yes]
√ Use App Router (recommended)? ... No / [Yes]
√ Would you like to customize the default import alias? ... No / [Yes]
Creating a new Next.js app in next13appauth\[アプリ名]

```

※選択肢は、全部 [Yes] を選択かそのままリターンキーを押してください。

インストールした先に移動します。
`cd [アプリ名]`

この場所で VSCode を開きます。
`code .`

インストールしたバージョン
Next.js 13.4.1

# ライブラリをインストール

## 認証、フォーム、バリデーション関連

### Supabase認証関連
`npm install @supabase/supabase-js@latest @supabase/auth-helpers-nextjs@latest classnames encoding`

### フォーム関連
`npm install react-hook-form @hookform/resolvers`

`npm install -D @tailwindcss/forms`

### バリデーション関連
`npm install zod`

# 環境ファイルの作成

```.env
NEXT_PUBLIC_SUPABASE_URL=https://*****************.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***********************

```

`.env` 関連を `.gitignore` ファイルに追加します。

```.gitignore

# local env files
.env*.local
.env.development.local
.env.test.local
.env.production.local

# env files
.env

```

# 環境のコード

### .eslintrc.json

```.eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    // 同じ名前の変数が複数のスコープで使用されると警告を表示する
    "no-shadow": "warn",
    // 未使用の変数がある場合に警告を表示する
    "no-unused-vars": "warn",
    // React フックで使用される依存関係がすべて指定されていることを確認する
    "react-hooks/exhaustive-deps": "warn",
    // React の関数コンポーネントの書き方についての規約を定めるために使用されます。
    "react/function-component-definition": "off",
    // JSX 内で関数のバインドを禁止する
    "react/jsx-no-bind": "off",
    // JSX で React を使用する際に、必ず React をインポートすることを強制するルール
    "react/react-in-jsx-scope": "off"
  }
}

```

### next.config.js

```next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true }

module.exports = nextConfig

```

### tailwind.config.js

```tailwind.config.js
/** @type {import('tailwindcss').Config} */
const forms = require("@tailwindcss/forms")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [forms],
}

```





# 現時点で起動確認

`npm run dev`

エラーが出てもそれはNext.js側のフォントのエラーが出ると思います。
ダウンロードできなかったフォントのエラーの場合、代わりのフォントが使用されます。

<details><summary>Next.jsのエラー(詳細)</summary>

現時点で、ターミナルにエラーが出力されます。

対処方法は
`Inter` というフォントを使わないことです。
Next.jsでデフォルトで採用されているフォントです。
このアプリでは使用しません。

ターミナルのログ

```terminal
- wait compiling /page (client and server)...
FetchError: request to https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap failed, reason: connect ECONNREFUSED 2404:6800:4004:828::200a:443
    at ClientRequest.<anonymous> (next.js\node_modules\next\dist\compiled\node-fetch\index.js:1:65756)
    at ClientRequest.emit (node:events:513:28)
    at TLSSocket.socketErrorListener (node:_http_client:502:9)
    at TLSSocket.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  type: 'system',
  errno: 'ECONNREFUSED',
  code: 'ECONNREFUSED'
}
- error Failed to download `Inter` from Google Fonts. Using fallback font instead.

```

これは

```src\app\layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

```

`Inter` というフォントをダウンロードできないとなっているのでこのフォントを使わなければこのエラーは消えます、根本的な解消方法ではありませんが今回はこのフォントを使わないことにします。

</details>

# トップページのソースコード

## src\appディレクトリ

### src\app\layout.tsx

上書きします。

```src\app\layout.tsx
import { AuthProvider } from "@/components/Auth/AuthProvider"
import createClient from "@/lib/supabase-server"
import Link from "next/link"

import "@/styles/globals.css"

// layout はキャッシュしないでください。:特に動的なサイトの場合は、revalidate を 0 に設定してください。
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token || null

  return (
    <html lang="jp">
      <body>
        <main>
          <Link href="/">VNS.BLUE</Link>
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}

```



### src\app\page.tsx

このページも上書きします。

```src\app\page.tsx
"use client"
import Link from "next/link"
import Auth from "@/components/Auth"
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"

export default function Home() {
  const { initial, user, view, signOut } = useAuth()

  if (initial) {
    return <div>Loading...</div>
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />
  }

  return (
    <div>
      {user ? (
        <>
          <Link href="/auth">
            <button>認証ボタン</button>
          </Link>
          <h3>
            ユーザーの役割: <strong>{user.role}</strong>
          </h3>
          <Link href="/profile">自分のプロフィールを見る</Link>
          <br />
          <Link href="/">
            <button type="button" onClick={signOut}>
              ログアウトする
            </button>
          </Link>
        </>
      ) : (
        <Link href="/auth">
          <button>認証ボタン</button>
        </Link>
      )}
    </div>
  )
}

```

# 認証ボタンのソースコード

## src\app\authButtonディレクトリ

### src\app\authButton\page.tsx


```src\app\authButton\page.tsx
"use client"

import Link from "next/link"

import Auth from "@/components/Auth"
import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"

export default function Home() {
  const { initial, user, view, signOut } = useAuth()

  if (initial) {
    return <div>ローディング中です...</div>
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />
  }

  if (user) {
    return (
      <div>
        <h2>あなたの情報ページです。</h2>
        <code>
          ユーザーの役割: <strong> {user.role}</strong>
        </code>
        <br />
        <Link href="/profile">自分のプロフィールを見る。</Link>
        <br />
        <Link href="/">ホームに戻る。</Link>
        <br />
        <button type="button" onClick={signOut}>
          ログアウトする。
        </button>
      </div>
    )
  }

  return <Auth view={view} />
}


```

## src\app\profile ディレクトリ



### src\app\profile\loading.js

```src\app\profile\loading.js
export default function Loading() {
  return <div>データロード中...</div>
}

```



### src\app\profile\page.js

```src\app\profile\page.js
import Link from "next/link"
import { redirect } from "next/navigation"

import SignOut from "@/components/Auth/SignOut"
import createClient from "@/lib/supabase-server"

export default async function Profile() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div>
      <h2>あなたのメールアドレス</h2>
      <code>{user.email}</code>
      <div>最後にログインした日時</div>
      日本時間: <code>{new Date(user.last_sign_in_at).toLocaleString("ja-JP")}</code>
      <br />
      <SignOut />
      <br />
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

```



## src\components\Auth ディレクトリ

### src\components\Auth\AuthProvider.js

```src\components\Auth\AuthProvider.js
"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import supabase from "@/lib/supabase-browser"

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
}

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
}

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [initial, setInitial] = useState(true)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [view, setView] = useState(VIEWS.SIGN_IN)
  const router = useRouter()
  const { accessToken, ...rest } = props

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()
      setSession(activeSession)
      setUser(activeSession?.user ?? null)
      setInitial(false)
    }
    getActiveSession()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh()
      }

      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD)
          break
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN)
          break
        default:
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signOut: () => supabase.auth.signOut(),
    }
  }, [initial, session, user, view])

  return <AuthContext.Provider value={value} {...rest} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthはAuthProviderの中で使用する必要があります。")
  }
  return context
}

```

### src\components\Auth\index.js

```src\components\Auth\index.js
"use client"

import { useAuth, VIEWS } from "./AuthProvider"
import ResetPassword from "./ResetPassword"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import UpdatePassword from "./UpdatePassword"

const Auth = ({ view: initialView }) => {
  let { view } = useAuth()

  if (initialView) {
    view = initialView
  }

  switch (view) {
    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword />
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />
    case VIEWS.SIGN_UP:
      return <SignUp />
    default:
      return <SignIn />
  }
}

export default Auth


```

### src\components\Auth\ResetPassword.js

```src\components\Auth\ResetPassword.js
"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const ResetPasswordSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
})

const ResetPassword = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setSuccessMessage("パスワード再設定の案内を送付しました。")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  })

  return (
    <div>
      <h2>パスワードを忘れた人用のページです。</h2>
      <form onSubmit={handleSubmit(resetPassword)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          className={cn("input", errors.email && "bg-red-50")}
          id="email"
          name="email"
          placeholder="masakinihirota@vns.blue"
          type="email"
          {...register("email")}
        />
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <button type="submit">メールアドレス宛にパスワード変更用のメッセージを送信</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        ログイン画面に戻る
      </button>
      <br />
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}

export default ResetPassword

```


### src\components\Auth\SignIn.js

```src\components\Auth\SignIn.js
"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const SignInSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  password: z.string().nonempty("パスワードを入力してください。"),
})

const SignIn = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setErrorMessage(error.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  })

  return (
    <div>
      <h2>ここはログインページです。</h2>
      <form onSubmit={handleSubmit(signIn)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          className={cn("input", errors.email && "bg-red-50")}
          id="email"
          name="email"
          placeholder="masakinihirota@vns.blue"
          type="email"
          {...register("email")}
        />
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <label htmlFor="email">パスワード</label>
        <input
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        <br />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <button type="button" onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}>
          パスワードを忘れましたか？
        </button>
        <br />
        <button type="submit">ログインボタン</button>
      </form>
      <div>
        <p>↓アカウントが無い場合は</p>
        <button type="button" onClick={() => setView(VIEWS.SIGN_UP)}>
          VNS.BLUEに登録
        </button>
      </div>
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

export default SignIn

```

### src\components\Auth\SignOut.js

```src\components\Auth\SignOut.js
"use client"

import { useAuth } from "@/components/Auth/AuthProvider"

export default function SignOut() {
  const { signOut } = useAuth()

  async function handleSignOut() {
    const { error } = await signOut()

    if (error) {
      console.error("ログアウトに失敗しました 次のコードをお知らせください。:", error)
    }
  }

  return (
    <button type="button" onClick={handleSignOut}>
      ログアウトする
    </button>
  )
}

```

### src\components\Auth\SignUp.js

```src\components\Auth\SignUp.js
"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth, VIEWS } from "@/components/Auth/AuthProvider"
import supabase from "@/lib/supabase-browser"

import Link from "next/link"

const SignUpSchema = z.object({
  email: z.string().email("メールアドレスが正しくありません").nonempty("メールを入力してください。"),
  password: z.string().nonempty("パスワードを入力してください。"),
})

const SignUp = () => {
  const { setView } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      setSuccessMessage("成功しました！詳細については、メールをご確認ください。")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <div>
      <h2>ここはアカウントの作成ページです。</h2>
      <form onSubmit={handleSubmit(signUp)}>
        <label htmlFor="email">メールアドレス</label>
        <input
          className={cn("input", errors.email && "bg-red-50")}
          id="email"
          name="email"
          placeholder="masakinihirota@vns.blue"
          type="email"
          {...register("email")}
        />
        {errors.email ? <div>{errors.email.message}</div> : null}
        <br />
        <label htmlFor="email">パスワード</label>
        <input
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <br />
        <button type="submit">アカウントを作成するボタン</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <button type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
        すでにアカウントを作成済みの場合はログインをしてください。
        <br />
        ログイン画面に戻る。
      </button>
      <br />
      <Link href="/">ホームに戻る。</Link>
    </div>
  )
}

export default SignUp

```


## src\components\Auth\UpdatePassword.js

```src\components\Auth\UpdatePassword.js
"use client"

import { useState } from "react"
import cn from "classnames"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import supabase from "@/lib/supabase-browser"

const UpdatePasswordSchema = z.object({
  password: z.string().nonempty("パスワードを入力してください。"),
})

const UpdatePassword = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  async function updatePassword(formData) {
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    })

    if (error) {
      setErrorMessage(error.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
  })

  return (
    <div>
      <h2>ここはパスワードの更新用のページです。</h2>
      <form onSubmit={handleSubmit(updatePassword)}>
        <label htmlFor="email">新しいパスワード</label>
        <input
          className={cn("input", errors.password && "bg-red-50")}
          id="password"
          name="password"
          type="password"
          {...register("password")}
        />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <button type="submit">パスワードの更新</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default UpdatePassword

```

## src\lib ディレクトリ

### src\lib\supabase-browser.js

```src\lib\supabase-browser.js
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

const supabase = createBrowserSupabaseClient();

export default supabase;

```

### src\lib\supabase-server.js

```src\lib\supabase-server.js
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });

```

## src\styles ディレクトリ

`globals.css`が `src/app`ディレクトリの直下に置かれているので、`styles` ディレクトリを作成して移動させます。

`src\app\globals.css`
から
`src\styles\globals.css`
へ移動させます。

中身も↓のようにTailwindCSSの設定部分の下側をすべて削除しました。

### src\styles\globals.css

```src\styles\globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

```



# 認証ボタンの動作確認を行います。

`npm run dev`

## 動作確認

認証ボタンを押す。

メールアドレスとパスワードを用いてアカウントを作成する。

> ↓アカウントが無い場合は
VNS.BLUEに登録ボタンを押す。

ログアウトする。

メールアドレスとパスワードを用いてログインする。

自分のプロフィールを見る。

パスワードを忘れた場合の動作を確認する。

VNS.BLUEボタンを押してトップページに戻る。

ホームに戻る。ボタンを押してトップページに戻る。

※ VNS.BLUEは開発中のサイト名です。
サイト名は各自自由に変えてください。


以上で認証ボタンの作成は完了です。

これよりしたは参考サイトのURL等です。

# その他

##  Supabase と Vercel の連携

Vercelにデプロイする場合、連携しておくと ちょっと便利で安全です。

何が嬉しいのか？
Supabase と Vercel の連携をすると、環境変数が自動で設定されます。ローカルにダウンロードして`.env`ファイルも作成できます。環境変数ファイルを自分で管理を任せるので少し安全です。

Next.js×Supabase×Vercel 連携について - Qiita

https://qiita.com/kaho_eng/items/8a7faf77222a599fb31c

# 参考 URL

## blog版

app router版 (下記の page router 記事の app router へのアップデート版)
Authentication in Next.js with Supabase and Next 13 - Mykhaylo Ryechkin

https://www.misha.wtf/blog/supabase-auth-next-13

page router版
User Authentication in Next.js with Supabase - Mykhaylo Ryechkin

https://www.misha.wtf/blog/nextjs-supabase-auth

---

## dev.to版

https://dev.to/mryechkin/authentication-in-nextjs-with-supabase-and-next-13-36le

Authentication in Next.js with Supabase and Next 13 - DEV Community

https://dev.to/mryechkin/authentication-in-nextjs-with-supabase-and-next-13-36le

User Authentication in Next.js with Supabase - DEV Community

https://dev.to/mryechkin/user-authentication-in-nextjs-with-supabase-4l12

話題の Supabase でサクッと認証機能をつくってみた！ - Qiita

https://qiita.com/kaho_eng/items/cb8d735b5b6ca1b3a6c5

## Supabase 公式

Supabase 公式動画リスト
Next.js with Supabase - YouTube

https://www.youtube.com/playlist?list=PL5S4mPUpp4OtwG-qCxm8gA_hjaBq0OPdz

Supabase 公式ドキュメント

Supabase Auth with Next.js app directory | Supabase Docs

https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components


# Qiita記事をGitHub上で管理する。

## qiita_sync

qiita-syncの導入 体験記 - Qiita

https://qiita.com/masakinihirota/items/ecd8383bcfea2cb5c8bd

masakinihirota/qiita_sync.article

https://github.com/masakinihirota/qiita_sync.article
