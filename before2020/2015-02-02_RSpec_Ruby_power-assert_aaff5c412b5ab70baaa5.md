<!--
title:   ０からRubyでRSpecをPowerAssertでやる
tags:    RSpec,Ruby,power-assert
id:      aaff5c412b5ab70baaa5
private: false
-->
# 追加 2015年2月5日
続きを書きました。
[Ruby - 写経 PowerAssert (Rspec3) テストをリファクタリング - Qiita](http://qiita.com/masakinihirota/items/917fa94a79d5e94aee9f)
[Ruby - 実践 ０からPowerAssertでテストを作ってみる。（RSpec3） - Qiita](http://qiita.com/masakinihirota/items/34035ebb63e1aaa94aae)

#公開場所
[github : masakinihirota/powerTdce](https://github.com/masakinihirota/powerTdce)

[０からRubyでRSpecをPowerAssertでやる - Qiita](http://qiita.com/masakinihirota/items/aaff5c412b5ab70baaa5)


#写経
PowerAssertを使って写経してみました。
[Ruby - 写経 PowerAssert (Rspec3) - Qiita](http://qiita.com/masakinihirota/items/917fa94a79d5e94aee9f)

クラスを一つ作り、そのテストをどんどんリファクタリングして完成させていきます。

#初めに
デフォルトではすんなり動かず色々はまったので書いてみました。

#環境
Ubuntu14.04
ruby 2.2.0
rbenv 0.4.0
rspec 3.1.0
bundle 1.7.12
power_assert 0.2.2
rspec-power_assert 0.2.0

#bundle

bundleインストール
``gem install bundler``

bundle 初期化
``bundle init``
Gemfileが新規作成される。

Gemfileの書き換え

```Gemfile:Gemfile
source "https://rubygems.org"

group :test, :development do
    gem "rspec", ">= 3.1.0"
    gem 'guard-rspec'
    gem 'rspec-power_assert'

#デバック用のgem
    gem 'pry-byebug'
    gem 'tapp'
    gem 'awesome_print'

end
```

デバッグ用のgemは入れなくてもｏｋ

``bundle``
gem等インストールされる

#rspec

rspecの初期化

``bundle exec rspec --init``

.rspecファイルの書き換え

```rspec:.rspec
--color
--require spec_helper
--require rspec-power_assert

```

#テストのテスト

test_spec.rb
テスト動作確認のためのテストだけのファイル（参考リンクからコピペ）
[参考リンク:joker1007/rspec-power_assert spec の sample](https://github.com/joker1007/rspec-power_assert)

```rb:test_spec.rb
describe Rspec::PowerAssert do
  describe Array do
    describe "#map" do
      let(:array) { [1, 2, 3] }
      subject { %w(a b c) }

      before do
        @array = [1, 2, 3]
      end

      it do
        is_asserted_by { subject.map(&:upcase) == array }
      end

      it do
        is_asserted_by {
          subject.map(&:upcase) == array
        }
      end

      it do
        is_asserted_by { subject.map(&:upcase) == %w(A B C) }
      end

      it do
        is_asserted_by {
          subject.map(&:upcase) == %w(A B C)
        }
      end

      it do
        upcased = subject.map(&:upcase)
        upcased.pop
        is_asserted_by { upcased == @array }
      end

      it "should transform array" do
        is_expected.to eq %w(a b c)
        is_asserted_by { subject.map(&:upcase) == %w(A B C) }
      end

      it "should transform array (failed)" do
        is_asserted_by { subject.map(&:upcase) == %w(A B) }
      end

      it_is_asserted_by { subject.map(&:upcase) == %w(A B C) }

      it_is_asserted_by { subject.map(&:upcase) == %w(A B) }

      it_is_asserted_by do
        subject.map(&:upcase) == %w(A B C)
      end

      it_is_asserted_by "succ each element" do
        subject.map(&:succ) == ["b", "c", "e"] + @array
      end
    end
  end
end


```

``rspec spec/test_spec.rb``
でテストのテストが動くのを確認。

![powerassert.png](https://qiita-image-store.s3.amazonaws.com/0/44761/2aa2019f-92f6-e805-64af-01ff1626daf3.png)


``test_spec.rb``
はもう削除してもok

#プログラムとテストを書く
プログラムとそれをテストするファイルの作成

###プログラム側
`lib`ディレクトリを作成し、その中にhello.rbを入れる。

```ruby:lib/hello.rb

class Hello
  def message
    "hello?"
  end
end

```

###テスト側
テストするrspecファイル

`spec`ディレクトリの中にhello_spec.rbを入れる。

```ruby:spec/hello_spec.rb
describe Hello do
  it "message return hello" do
    expect(Hello.new.message).to eq "hello"
  end
end

```

###監視ディレクトリの追加
デフォルトではlibディレクトリを監視してくれないので設定の追加。

``spec/spec_helper.rb``
このファイルの最後尾に追加

```rspec:spec_helper.rb
（略）
Dir[File.join(File.dirname(__FILE__), "../lib/**/*.rb")].each { |f| require f }

```

`"../lib/**/*.rb"`部分はプログラムが入っているディレクトリ。

最近、rubyプログラムはgemを作ることが前提のようでプログラムはlibに入れているようだ、みんなが決めたレールに乗っておく。


###テスト実行

`rspec`

![rspec.png](https://qiita-image-store.s3.amazonaws.com/0/44761/5534b758-5cee-7e0e-cdd7-c13cff715187.png)


間違っていたら修正

hello?をhelloに

修正したらもう一度テスト。
`rspec`

テストに合格するのを確認。

（面倒だが、通らないテストに戻しておく。）

#guard

guardを使ってテストを自動化する

###guardの初期化
`guard init`

###guardの設定確認
`guard list`
でRspecの設定にチェックが入っていることを確認する。

  +--------+-----------+
  | Plugin | Guardfile |
  +--------+-----------+
  | Rspec  | ✔         |
  +--------+-----------+
![guardlist.png](https://qiita-image-store.s3.amazonaws.com/0/44761/c6d24333-767d-9f02-cd9d-47cce7412c45.png)

ShellはGuardのプラグインの一種（今回関係なし）

###Guardfile（設定の追加）

Guardfileが作られたが問題があって、
rspecファイルは監視するが、
rbファイルが監視されていない。
そこで監視するwatchメソッドを追加。
rbファイルを監視するようにする。

ruby設定の場所に追加する。

```ruby:Guardfile
（略）

  # Ruby files
  ruby = dsl.ruby
  dsl.watch_spec_files_for(ruby.lib_files)
  watch(%r{^lib/(.+)\.rb$}) { |m| "spec/#{m[1]}_spec.rb" }  #<<追加部分

（略）
```

これでGuard実行中にlibディレクトリの中のファイルを監視してくれる。



#オマケ

rspecタイプのテストをpower_assertタイプのテストに書き換え。

```ruby:hello_spec.rb
describe Hello do
  it "message return hello" do
    # expect(Hello.new.message).to eq "hello"
    is_asserted_by { Hello.new.message == "hello" }
  end
end

```

テスト実行

``rspec``

![powerassertHello.png](https://qiita-image-store.s3.amazonaws.com/0/44761/095511c9-27ad-c0ba-0106-f0e89e39c340.png)

#確認
成功したテストの中身も表示させる便利コマンド

Documentation出力
``rspec -f doc spec/``

html出力
``rspec -f html -o specs.html spec/``

Profiling
``rspec --profile spec/``


#ハマったところ

rspecタイプのテスト形式で書いていたので、希望通りのpower_assertタイプのテスト結果が表示されなかった。
最初はGuardとかがpower_assertタイプをrspecタイプに変換しないで直接実行されたのか？とまたパス設定ミス？などと悩んだ。

ファイルの名前を間違えたので。エラーで設定されてませんと出てきた。

rootディレクトリなら
直接ファイルをしてして実行した場合、
``rspec spec/power_pec.rb``
とファイル名が間違っていても実行される。

rootディレクトリ以外で
（テストが置いてあるディレクトリで直接テストファイルを指定してrspecコマンドを実行した。）
``rspec test_spec.rb``
（関係のないディレクトリからテストのディレクトリ内のテストファイルをしてして実行した。）
``rspec ../spec/test_spec.rb``
とパスが正しくても実行されない。

ルートディレクトリに置いたテストファイルを直接実行した場合では動いたので色々と勘違いしていた。

監視対象から外れたファイル名。
×
test_rspec.rb
test_sepc.rb

◯
test_spec.rb

***
.rspec

```rspec:.rspec
--require rspec-power_assert

```

と書くところを

```rspec:.rspec
--require power_assert

```

と書いていて
requireされないパスが通っていないと悩み続けた。

#参考リンク

[joker1007/rspec-power_assert spec](https://github.com/joker1007/rspec-power_assert)

[RSpecでPower Assertをやるには](http://ukstudio.jp/2014/09/21/rspec_power_assert/)

[Ruby - RSpecでpower_assertを使うためのrspec-power_assertを作ってみた - Qiita](http://qiita.com/joker1007/items/88077d6b2affeb42aa1c)

[RailsじゃないRspec3環境を構築する方法 - Qiita](http://qiita.com/yusabana/items/db44b81bdddf6ed0e9f5)

[rspecの書き方例 （英語） rspec/rspec-expectations](https://github.com/rspec/rspec-expectations)