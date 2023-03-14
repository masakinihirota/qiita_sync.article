<!--
title:   写経 PowerAssert (Rspec3) テストをリファクタリング
tags:    Ruby,power-assert,rspec3,リファクタリング
id:      917fa94a79d5e94aee9f
private: false
-->
#追加 2015年2月5日
[０からRubyでRSpecをPowerAssertでやる - Qiita](http://qiita.com/masakinihirota/items/aaff5c412b5ab70baaa5)
[Ruby - 実践 ０からPowerAssertでテストを作ってみる。（RSpec3） - Qiita](http://qiita.com/masakinihirota/items/34035ebb63e1aaa94aae)
続きを書きました。

#PowerAssertを使いテストを写経する。
RubyでRspecのPowerAssertをインストールしたので使ってみます。


最初は基本的な動作確認をした後、クラスを一つ作り、そのテストをどんどんリファクタリングして完成させていきます。

###クリアできなかった問題
Rspec機能の一部である `subject` をPowerAssertでどうやって実現すればいいのかわからず、パス。

#参考リンク
写経に使ったページ
[Ruby - 使えるRSpec入門・その1「RSpecの基本的な構文や便利な機能を理解する」 - Qiita](http://qiita.com/jnchito/items/42193d066bd61c740612)

#最初に
基本的な動作確認、まずRspecタイプのテストを動かし、次にpower_assertタイプのテストの動作確認をする。

#ファイルの説明
 1. テスト.rb テストの動作確認用のテストファイル
 1. 写経.rb 其の1 最初に使ったクラス。
 1. 写経.rb 其の2 写経の途中でchild?メソッドを追加したクラス

 1. 写経_spec.rb 写経.rb のテストファイル


###テスト.rb

```ruby:テスト.rb
#rspec type
describe '四則演算' do
  it '1 + 1 は 2 になること' do
    expect(1 + 1).to eq 2
  end
end

#power_assert type
describe '四則演算' do
  it '1 + 1 は 2 になること' do
    is_asserted_by { 1 + 1 == 2 }
    is_asserted_by { (1 + 1) == 2 }
  end

  it_is_asserted_by { 1 + 1 == 2 }
  it_is_asserted_by { (1 + 1) == 2 }
  it_is_asserted_by "1 + 1 は 2 になること" do (1 + 1)  == 2 end
  # it_is_asserted_by "test" { 2 == 2 } # {} は err

  it_is_asserted_by "1 + 1 は 2 になること" do
    1 + 1 == 2
     # (1 + 1)  == 6 # hihyouji test ha hitotu
  end

end



#基本
describe 'test' do
  it '1 + 1 'do
    is_asserted_by { 1 + 1 == 2 }
  end
end

# 複数のエクスペクテーション
describe 'test' do
  it '1 + 1 'do
    is_asserted_by { 1 + 3 == 4 }
    is_asserted_by { 1 - 3 == -2 }
    is_asserted_by { 1 * 3 == 3 }
    is_asserted_by { 6 / 3 == 2 }
  end
end

#ネストした describe
describe ' ' do
  describe ' ' do
    it ' ' do
      is_asserted_by { ( 1 + 1 ) ==  2 }
    end

  end

  describe ' ' do
    it ' ' do
      is_asserted_by { ( 2 - 1) == 1 }
    end
  end
end

```


### 写経.rb 其の1

```ruby:写経.rb
class User
  def initialize(name:, age:)
    @name = name
    @age = age
  end
  def greet
    if @age <= 12
      "ぼくは#{@name}だよ。"
    else
      "僕は#{@name}です。"
    end
  end
end


```

### 写経.rb 其の2 （写経.rb 其の1にchild?メソッドを追加）

```ruby:写経.rb
class User
  def initialize(name:, age:)
    @name = name
    @age = age
  end
  def greet
    if child?
      "ぼくは#{@name}だよ。"
    else
      "僕は#{@name}です。"
    end
  end
  def child?
    @age <= 12
  end
end



```

### 写経_spec.rb

```ruby:写経_spec.rb

# describe / it / expect の役割
# ネストした describe
# context の使い方
# before の使い方
# let / let! / subject の使い方
# shared_examples の使い方
# shared_context の使い方
# pending と skip の使い分け

# context と before でもう少し便利に
describe User do
  describe '#greet' do
    it ' 12ika ' do
      user = User.new(name: 'tarou', age:12 )
      is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
    end
    it '13 ijyou ' do
      user = User.new(name: 'tarou', age:13 )
      is_asserted_by { user.greet == '僕はtarouです。'}
    end
  end
end

# context で条件別にグループ化する
describe User do
  describe '#greet' do
    context '12ika ' do
      it 'hiragana 'do
        user = User.new(name: 'tarou', age:12 )
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      it 'kanji ' do
        user = User.new(name: 'tarou', age:13)
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#before で共通の前準備をする
describe User do
  describe '#greet' do
    before do
      @params = { name: 'tarou'}
    end
    context '12ika ' do
      it 'hiragana 'do
        user = User.new(@params.merge(age:12) )
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      it 'kanji ' do
        user = User.new(@params.merge(age:13) )
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#ネストした describe や context の中で before を使う
describe User do
  describe '#greet' do
    before do
      @params = { name: 'tarou'}
    end
    context '12ika ' do
      before do
        @params.merge!(age: 12)
      end
      it 'hiragana 'do
        user = User.new(@params)
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      before do
        @params.merge!(age: 13)
      end
      it 'kanji ' do
        user = User.new(@params )
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#インスタンス変数のかわりに let を使う
describe User do
  describe '#greet' do
    let(:params){ { name: 'tarou'} }
    context '12ika ' do
      before do
        params.merge!(age: 12)
      end
      it 'hiragana 'do
        user = User.new(params)
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      before do
        params.merge!(age: 13)
      end
      it 'kanji ' do
        user = User.new(params )
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#user を let にする
describe User do
  describe '#greet' do
    let(:user) { User.new(params) }
    let(:params){ { name: 'tarou'} }
    context '12ika ' do
      before do
        params.merge!(age: 12)
      end
      it 'hiragana 'do
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      before do
        params.merge!(age: 13)
      end
      it 'kanji ' do
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#let のメリットを活かして age も let で置き換える
describe User do
  describe '#greet' do
    let(:user) { User.new(params) }
    let(:params){ { name: 'tarou', age: age } }
    context '12ika ' do
      let(:age) { 12 }
      it 'hiragana 'do
        is_asserted_by { user.greet == 'ぼくはtarouだよ。'}
      end
    end
    context '13ijyou ' do
      let(:age) { 13 }
      it 'kanji ' do
        is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end
  end
end

#subject を使ってテスト対象のオブジェクトを1箇所にまとめる
# describe User do
#   describe '#greet' do
#     let(:user) { User.new(params) }
#     let(:params){ { name: 'tarou', age: age } }
#     subject { user.greet }
#     context '12ika ' do
#       let(:age) { 12 }
#       it 'hiragana 'do
#         is_asserted_by == 'ぼくはtarouだよ。'
#       end
#     end
#     context '13ijyou ' do
#       let(:age) { 13 }
#       it 'kanji ' do
#         is_asserted_by ==  '僕はtarouです。'
#       end
#     end
#   end
# end

#it に渡す文字列（'ひらがなで答えること' など）を省略
describe User do
  describe '#greet' do
    let(:user) { User.new(params) }
    let(:params){ { name: 'tarou', age: age } }
    context '12ika ' do
      let(:age) { 12 }
      it_is_asserted_by { user.greet == 'ぼくはtarouだよ。' }
    end
    context '13ijyou ' do
      let(:age) { 13 }
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end
  end
end

#リファクタリングしてテストコードの完成！
describe User do
  describe '#greet' do
    let(:user) { User.new(name: 'tarou', age: age) }
    context '12ika ' do
      let(:age) { 12 }
      it_is_asserted_by { user.greet == 'ぼくはtarouだよ。' }
    end
    context '13ijyou ' do
      let(:age) { 13 }
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end
  end
end

# example の再利用: shared_examples と it_behaves_like
describe User do
  describe '#greet' do
    let(:user) { User.new(name: 'tarou', age: age) }

    context '0歳の場合' do
      let(:age) { 0 }
      it_is_asserted_by { user.greet ==  'ぼくはtarouだよ。'}
    end
    context '12歳の場合' do
      let(:age) { 12 }
      it_is_asserted_by { user.greet ==  'ぼくはtarouだよ。'}
    end

    context '13歳の場合' do
      let(:age) { 13 }
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end
    context '100歳の場合' do
      let(:age) { 100 }
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end
  end
end


#example を再利用
describe User do
  describe '#greet' do
    let(:user) { User.new(name: 'tarou', age: age) }

    shared_examples '子どものあいさつ' do
      it_is_asserted_by { user.greet ==  'ぼくはtarouだよ。'}
    end

    context '0歳の場合' do
      let(:age) { 0 }
      it_behaves_like '子どものあいさつ'
    end
    context '12歳の場合' do
      let(:age) { 12 }
      it_behaves_like '子どものあいさつ'
    end

    shared_examples '大人のあいさつ' do
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end

    context '13歳の場合' do
      let(:age) { 13 }
      it_behaves_like '大人のあいさつ'
    end
    context '100歳の場合' do
      let(:age) { 100 }
      it_behaves_like '大人のあいさつ'
    end
  end
end

# context の再利用: shared_context と include_context
describe User do
  describe '#greet' do
    let(:user) { User.new(name: 'tarou', age: age) }
    context '12ika ' do
      let(:age) { 12 }
      it_is_asserted_by { user.greet == 'ぼくはtarouだよ。' }
    end
    context '13ijyou ' do
      let(:age) { 13 }
      it_is_asserted_by { user.greet ==  '僕はtarouです。'}
    end
  end

  describe '#child?' do
    let(:user) { User.new(name: 'tarou', age: age) }
    context '12ika' do
      let(:age) { 12 }
      it_is_asserted_by { user.child? == true }
    end
   context '13ijyou' do
      let(:age) { 13 }
      it_is_asserted_by { user.child? == false }
    end
  end
end

#context を再利用
describe User do
    let(:user) { User.new(name: 'tarou', age: age) }
    shared_context '12 ' do
      let(:age) { 12 }
    end
    shared_context '13 ' do
      let(:age) { 13 }
    end

    describe '#greet' do
      context '12ika' do
        include_context '12 '
        it_is_asserted_by { user.greet == 'ぼくはtarouだよ。' }
      end
      context '13ijyou' do
        include_context '13 '
        it_is_asserted_by { user.greet ==  '僕はtarouです。'}
      end
    end

  describe '#child?' do
    context '12ika' do
      include_context '12 '
      it_is_asserted_by { user.child? == true }
    end
    context '13ijyou' do
      include_context '13 '
      it_is_asserted_by { user.child? == false }
    end
  end
end

# どうしても動かないテストに保留マークを付ける: pending
describe 'sensai' do
  it 'sensai test' do
    is_asserted_by { 1 + 2 == 3 }
    pending
    is_asserted_by { 1 + 2 == 5 }
  end
end

# 問答無用でテストの実行を止める: skip
describe '何らかの理由で実行したくないクラス' do
  it '実行したくないテスト' do
    is_asserted_by { 1 + 2 == 3 }

    skip 'とりあえずここで実行を保留'
    # ここから先は実行されない
    is_asserted_by { 1 + 2 == 8 }
  end
end

# テストはあとで書く: 中身の無い it
describe User do
  describe '#good_bye' do
    context '12ika' do
      it 'hiragana sayounara'
    end

    context '13ijyou' do
      it 'kanji sayounara'
    end
  end
end

```

#ハマったところ
subjectのpower_assertでの使い方。

説明文をキーにして引っ張っている所
shared_context '12 '
include_context '12 '



#最終的な実行結果
![syakyou002.png](https://qiita-image-store.s3.amazonaws.com/0/44761/e764ce97-87da-3da7-70bd-be041963ab03.png)