<!--
title:   v0 という shadcn/ui ＋ AI サービス by Vercel (開発者がAIに提案してもらい、UIをコピペできるコードにしてくれる。)
tags:    Vercel,shadcn,tailwindcss,v0
id:      4cc6f8637206e29502fd
private: false
-->
※現在このサービスは **Wait list** に登録してもらって、v0の完成待ちです。

# サイト

https://v0.dev

v0というこのサービスは、Vercel が開発したAIによる生成型ユーザーインターフェースシステムです。Shadcn/UIとTailwind CSSに基づいて、コピー＆ペーストできるReactコードを生成し、人々が自分のプロジェクトに使用できます。

開発者がプロンプトを入力すると、AIが３つの提案を出力してくれます。
開発者はその中から自分とマッチした提案を選択します。
これを繰り返して開発をしていきます。



# ドキュメント

https://v0.dev/docs

生成されたv0コードをアプリケーションに追加する方法について説明します。
AIにプロンプトを入力すると、その希望に沿ったのUIコードをAIが出力してくれます。
そして、AIに提案してもらったコードはコピペして使います。



# 前提知識

shadcn/ui というサービスがあります。

https://ui.shadcn.com/

shadcn/ui というのは？

shadcn/uiは、Radix UIと Tailwind CSSを組み合わせたコンポーネントのカタログです。このプロジェクトは、再利用可能なコンポーネントの集まりであり、開発速度とカスタマイズ性を両立することができます。shadcn/uiを使用することで、洗練されたコンポーネントを手軽に自身のソースフォルダーに組み込むことができます。
自身のソースコード上にcliを使用してコンポーネントをコピペするので、コンポーネントを柔軟にカスタマイズすることもできます。


# 例

https://v0.dev/t/0W13RkH

例えば↑このサンプルを見ると、右側にサイドバーがあります。
AIにプロンプトを入力するたびにコードを出力してくれて、さらに **v** の数字が一つ増えていくようです。

※↓import しているのは、 shadcn/ui のコンポーネントです。

v0

```v0
/**
 * v0 by Vercel Labs.
 * @see https://v0.dev/t/w9AZEZq
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
    return (
      <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black" >
      <div className="container px-4 md:px-6" >
        <div className="grid gap-6 items-center" >
          <div className="flex flex-col justify-center space-y-4 text-center" >
            <div className="space-y-2" >
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                                Revolutionize Your Email Experience
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto" >
                                Join us and take control of your inbox. Fast, secure, and designed for modern life.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto" >
              <form className="flex space-x-2" >
                <Input
                  className="max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button className="bg-white text-black"  type="submit">
                                    Join Now
                </Button>
              </form>
              <p className="text-xs text-zinc-200 dark:text-zinc-100" >
                                Get ready to redefine your email experience.
                <Link className="underline underline-offset-2 text-white"  href="/terms">
                                    Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

AIに提案をしてもらいます。

v22

```v22
/**
 * v0 by Vercel Labs.
 * @see https://v0.dev/t/0W13RkH
 */
export default function Component() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black" >
      <div className="container px-4 md:px-6" >
        <div className="grid gap-6 items-center" >
          <div className="flex flex-col justify-center space-y-8 text-center" >
            <div className="space-y-2" >
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                                Discover Our Unique Features
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto" >
                                Our features are designed to enhance your productivity and streamline your workflow.
              </p>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto" >
              <div className="grid grid-cols-3 gap-8" >
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path
                        d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Smart Inbox
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    Our Smart Inbox feature helps you manage your emails efficiently by prioritizing important emails.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 6 4-4 4 4" />
                      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                      <path d="m20 22-5-5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Seamless Integration
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    Seamless Integration allows you to connect with your favorite apps and services without leaving your inbox.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Advanced Customization
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    With Advanced Customization, you can personalize your email client to suit your preferences and work style.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Powerful Search
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    Our Powerful Search feature allows you to find any email, contact, or file in seconds.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Reliable Security
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    With Reliable Security, your data is always safe and protected.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 6 4-4 4 4" />
                      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                      <path d="m20 22-5-5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" >
                    Easy Collaboration
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100" >
                    Easy Collaboration allows you to share and edit documents with your team in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

```