<!--
title:   test-unit3を触る。 6年ぶりのメジャーバージョンアップ
tags:    Ruby,power-assert,test-unit,テスト
id:      8a9cd0bdd5aa31d21146
private: false
-->
# 注目はPower Assert
Power Assertはテスト途中の値を視覚的に表示してくれる。

library test/unit
http://docs.ruby-lang.org/ja/2.1.0/library/test=2funit.html
（このページのテストでtest-unit3の動作を見てみる。）

# test-unit3を動かす。
## 動作確認環境
ubuntu14
ruby 2.1.2
gem 2.3.0

## test-unitのインストール
gem install test-unit

## 使い方:
require "test-unit"

## ファイル
foo.rb
test_foo.rb
（今回は特にtestディレクトリを作らず、同じ階層に置いた。）

```ruby:foo.rb
class Foo
   def foo
     "foo"
   end
   def bar
     "foo"
   end
end
```

```ruby:test_foo.rb
require "test-unit"
require './foo'

class TC_Foo < Test::Unit::TestCase
  def setup
    @obj = Foo.new
  end

  # def teardown
  # end

  def test_foo
    assert_equal("foo", @obj.foo)
  end
  def test_bar
    assert_equal("bar", @obj.bar)
  end

# 追加部分
  def test_foo
    assert do
      ("foo" == @obj.bar)
    end
  end

  def test_bar
    assert do
      ("bar" == @obj.bar)
    end
  end
end

```

## 実行方法
ruby test_foo.rb

## 実行結果
![test_unit3.png](https://qiita-image-store.s3.amazonaws.com/0/44761/c60a0d60-1c17-f701-43f6-8e223819cc15.png)

# 参考

## Power Assertとは。
test-unit-power_assertをリリース - 継続にっき(2014-05-31)
http://www.callcc.net/diary/20140531.html#p01

## test-unit 公式サイト
http://test-unit.github.io/ja/index.html

注、2014年8月4日午前現在
test-unitのドキュメント
リファレンスマニュアル
のリンクが死亡中。