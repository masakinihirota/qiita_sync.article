<!--
title:   実践 ０からPowerAssertでテストを作ってみる。（RSpec3）
tags:    RSpec,Ruby,bdd,power-assert,rspec3
id:      34035ebb63e1aaa94aae
private: false
-->
#実践 ０からPowerAssertでテストを作ってみる。（RSpec3）

これは
[Ruby - 写経 PowerAssert (Rspec3) テストをリファクタリング - Qiita](http://qiita.com/masakinihirota/items/917fa94a79d5e94aee9f)
[０からRubyでRSpecをPowerAssertでやる - Qiita](http://qiita.com/masakinihirota/items/aaff5c412b5ab70baaa5)
の続きです。

# BDDで振る舞いを考えてメソッドを作ってみる。

メソッドの想定
ある特定のURLからその下層のURLも含めてどんなパターンでも一定のルールに基づいたファイル名に変換する。
下位階層は_（アンダーバー）でつなげる。
拡張子は.txtにする。

例
https://developer.chrome.com/extensions
↓
extensions.txt

将来的には、URLからスクレイピングしてファイル名毎にHTMLファイルを保存するメソッドの一部。

#テストを書く

## 0 最初に小さな動作確認をしたrubyファイルで色々見る。

ベタ書きして、色々なパターンを試してみます。
自分はsublime text3のBuild機能をつかってその場で動かして動作確認しています。
Windowsだったら[RDE](http://homepage2.nifty.com/sakazuki/rde/index.html)とか、コマンドラインツールだったらPryとか確認に使うのでしょうか？


```ruby:tmp.rb
require 'pp'
require 'tapp'
require 'awesome_print'

url = "https://developer.chrome.com/extensions"
url = "https://developer.chrome.com/extensions/"
url = "https://developer.chrome.com/extensions/getstarted"
url = "https://developer.chrome.com/extensions/extensions/tabs"

p url.gsub(reg, '')

reg = %r(https:\/\/developer\.chrome\.com\/)

# ap url.gsub(/https:\/\/developer\.chrome\.com\//, '')
# url.gsub(/https:\/\/developer\.chrome\.com\//, '').tapp.gsub(/\//,'_').tapp

pp url.gsub(reg, '')
pp url.gsub(reg, '').gsub(/\//,'_')
pp url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')
pp url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')+".txt"

```

test.rbにはまだ何も書いてない。

```ruby:test.rb

```

空のテストを作り実行するとpendingになる事を確認しておく。

```ruby:test_spec.rb
describe "abbreviation url 2 url_file_name " do
    it "extensions"

end

```


## 1 テスト側だけで動くようにプログラムとテストを書く

空のメソッドを作る

```ruby:test.rb
def url_file_name(url)

end

```

テストを作る
URL文字列を設定する。
正規表現を設定する、%rは正規表現リテラル
PowerAssertで想定した結果と比較する。

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    it "does something" do
        url = "https://developer.chrome.com/extensions"
        reg = %r(https:\/\/developer\.chrome\.com\/)
        is_asserted_by { url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')+".txt" == "extensions.txt"}
    end

end

```

テストが通るのを確認する。

***


## 2 テストの中の共通部分を切り出す

空のまま

```ruby:test.rb
def url_file_name(url)

end

```

共通部分を切り出す

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    let(:url) { "https://developer.chrome.com/extensions" }
    let(:reg) { %r(https:\/\/developer\.chrome\.com\/) }

    it "does something" do
        is_asserted_by { url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')+".txt" == "extensions.txt"}
    end

end

```

テストが通るのを確認する。

***

## 3 テストの中にメソッド（追加のテスト）を追加する

空のまま

```ruby:test.rb
def url_file_name(url)

end

```

追加メソッドがpendingになるように空のテストを追加する。
`it "url_file_name"`

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    let(:url) { "https://developer.chrome.com/extensions" }
    let(:reg) { %r(https:\/\/developer\.chrome\.com\/) }

    it "does something" do
        # url = "https://developer.chrome.com/extensions"
        # reg = %r(https:\/\/developer\.chrome\.com\/)
        is_asserted_by { url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')+".txt" == "extensions.txt"}
    end

    it "url_file_name"

end

```

テストが通るのを確認する。
pendingになるのを確認する。

## 4 テストの中のreg部分を消す

空のメソッドのまま

```ruby:test.rb
def url_file_name(url)

end

```

メソッドにする部分のregを削除
メソッドのテストを追加する

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    let(:url) { "https://developer.chrome.com/extensions" }

    it "url_file_name" do
        is_asserted_by{ url_file_name(url)== "extensions.txt"}
    end

end

```

テストが通るのを確認する。
メソッドの中身を書いてないのでテストは通らない。

***

## 5 メソッドを書く

メソッドを書く

```ruby:test.rb
def url_file_name(url)
    url.gsub(/https:\/\/developer\.chrome\.com\//, '').gsub(/\//,'_').gsub(/_$/,'')+".txt"

end

```

特になし

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    let(:url) { "https://developer.chrome.com/extensions" }

    it "url_file_name" do
        is_asserted_by{ url_file_name(url) == "extensions.txt" }
    end

end

```

テストが通るのを確認する。
テストが赤いままなら緑になるまで頑張る。

***

## 6 メソッドをリファクタリング

メソッドをリファクタリング
regを正規表現リテラル化

```ruby:test.rb
def url_file_name(url)
    reg = %r(https:\/\/developer\.chrome\.com\/)
    url.gsub(reg, '').gsub(/\//,'_').gsub(/_$/,'')+".txt"

end

```

特になし

```ruby:test_spec.rb
describe "abbreviation url 2 url_file_name " do
    let(:url) { "https://developer.chrome.com/extensions" }
    it "url_file_name" do
        is_asserted_by{ url_file_name(url) == "extensions.txt" }
    end

end

```

テストが通るのを確認する。

***

## 7 urlを戻す。
このままではURLの色々なパターンが試せないのでurlをテスト内（itの中）に戻す。

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    it "extensions" do
        url = "https://developer.chrome.com/extensions"
        is_asserted_by{ url_file_name(url) == "extensions.txt" }
    end

end

```

テストが通るのを確認する。

***

## 8 テストの種類を増やす。

```ruby:test_spec.rb

describe "abbreviation url 2 url_file_name " do
    it "extensions" do
        url = "https://developer.chrome.com/extensions"
        is_asserted_by{ url_file_name(url) == "extensions.txt" }
    end
    it "extensions/" do
        url = "https://developer.chrome.com/extensions/"
        is_asserted_by{ url_file_name(url) == "extensions.txt" }
    end
    it "extensions/getstarted" do
        url = "https://developer.chrome.com/extensions/getstarted"
        is_asserted_by{ url_file_name(url) == "extensions_getstarted.txt" }
    end
    it "extensions/extensions/tabs" do
        url = "https://developer.chrome.com/extensions/extensions/tabs"
        is_asserted_by{ url_file_name(url) == "extensions_extensions_tabs.txt" }
    end

end

```

テストが通るのを確認する。
一応これで完成。

***

テストの作り方は間違っていると思いますが一応通ったのでその過程を書いてみました。皆さんはどのようにして書いているのでしょうか？より良いテストの書き方を知っている方、是非教えて下さい。