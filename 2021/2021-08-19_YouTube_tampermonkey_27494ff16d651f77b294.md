<!--
title:   Youtube字幕の自動翻訳を日本語に固定する方法 PC版
tags:    YouTube,tampermonkey
id:      27494ff16d651f77b294
private: false
-->
この記事はオリジナルではなく単なる紹介記事になります。

Youtubeの長年の悩みが一つ解消されたので・・・
普通に検索していたら確かに見つけにくいと思います。

このスクリプトでYoutubeの外国語動画を開くだけで日本語の自動字幕が表示されます。
最初に設定しておくだけで、動画を開く段階では何も操作する必要はありません。

日本語字幕がついている場合の動作は不明です

TampermonkeyはChromeブラウザで独自のスクリプトを実行してくれます。

Tampermonkey
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo

紹介記事
【YouTube】字幕の自動翻訳を日本語に固定する方法【PC】 - 音又空間’
https://www.otomata01.com/entry/youtube-translate-japanese

スクリプト
YouTubeで自動翻訳字幕（日本語）を常にオン
https://greasyfork.org/ja/scripts/391647-youtube%E3%81%A7%E8%87%AA%E5%8B%95%E7%BF%BB%E8%A8%B3%E5%AD%97%E5%B9%95-%E6%97%A5%E6%9C%AC%E8%AA%9E-%E3%82%92%E5%B8%B8%E3%81%AB%E3%82%AA%E3%83%B3

```
// ==UserScript==
// @name YouTubeで自動翻訳字幕（日本語）を常にオン
// @description B:再度試みる　N,Enter:次の動画　P,]:前の動画　A:今の位置から再生するURLをコピー（Shift+A:タブのURLにも反映）　[:全画面化
// @version      0.5.15
// @run-at document-idle
// @match *://www.youtube.com/*
// @grant GM.setClipboard
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  const WAIT_PAGEOPEN_OFFSET = 0; // ミリ秒 不安定なら大きくする
  const ENABLE_EVENJAPANESE = 1; // 1なら日本語タイトルの動画でも実行
  const ENABLE_EVENEMBED = 1; // 1なら埋め込み動画でも実行
  const DISABLE_AUTO_GENERATED_JAPANESE = 1; // 1なら自動生成の日本語しかない時は字幕をオフ
  const ENABLE_WHEN_MUTED = 1; // 1なら音声がミュートされている時は字幕をオン
  const DO_NOT_SELECT_LANGUAGE = 0; // 1なら日本語を選択しない（字幕をオンにするだけ）
  const WORDS_TO_FORCE_ENABLE = /ラジオ/; // 動画タイトルに含むと字幕をオンにする正規表現　対象なしは/$^/
  const WORDS_TO_FORCE_DISABLE = /$^/; // 動画タイトルに含むと字幕をオフにする正規表現　対象なしは/$^/

  const WAIT_EACHACTION = 300; // ミリ秒 不安定なら大きくする
  const verbose = 0; // 開発用
  const VERBOSE_NOTIFY = 0; // 開発用　1:vn()
  const CHECK_ROAJ = 0; // 開発用　1:日本語にしなかった理由をalert

  //const WAIT_VIDEO_START = 0.2; // 秒 ビデオ再生開始後この秒数まで待つ 0～5ぐらい 不安定なら大きくする

  var checkROAJAlready = 0;

  var kaisuuA = 0;
  var per = (performance.now()) / 3;
  verb("performance.now:" + performance.now(), "wait_base:" + per + "ms");
  var wait_pageOpen = (per > 1500 ? 1500 : per < 300 ? 300 : per) + WAIT_PAGEOPEN_OFFSET;
  vn("wait_pageOpen : " + Math.floor(wait_pageOpen) + " ms");

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || e.target.getAttribute('contenteditable') == 'true') return;
    var key = (e.shiftKey ? "Shift+" : "") + (e.altKey ? "Alt+" : "") + (e.ctrlKey ? "Ctrl+" : "") + e.key;

    if (e.key === "[") { // [ 全画面化
      toggleFullScreen();
      return false;

      function toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    }
    if (key === "b") {
      toJP("forced");
      e.preventDefault();
      return false;
    }
    if (key === "n" || key === "Enter") {
      elecli("forced", '//a[@class="ytp-next-button ytp-button"]');
      e.preventDefault();
      return false;
    }
    if (key === "p" || key === "]") {
      elecli("forced", '//a[@class="ytp-prev-button ytp-button"]');
      e.preventDefault();
      return false;
    }
    if ((key === "a" || key === "Shift+A") && location.href.match(/\/\/www\.youtube\.com\/watch\?.*v\=([^?&]*)/)) {
      var ctimeEle = eleget0('//video');
      if (ctimeEle) {
        var ctime = Math.floor(ctimeEle.currentTime);
        //ctime = ctime < 1 ? "" : "&t=" + ((kaisuuA % 2) == 0 ? (ctime) : ((ctime / 60 / 60 >= 1 ? Math.floor(ctime / 60 / 60) + "h" : "") + (ctime / 60 >= 1 ? Math.floor(ctime / 60 % 60) + "m" : "") + ctime % 60 + "s"));
        var ret = (navigator.platform.indexOf("Win") != -1) ? "\r\n" : "\n";
        let newurl = key === "a" ? "https://www.youtube.com/watch?v=" + location.href.match(/v\=([^?&]*)/)[1] + (ctime > 0 ? ("&t=" + ctime) : "") : location.href.replace(/&t=\d*s?/, "") + (ctime > 0 ? ("&t=" + ctime) : "");
        //let domain = (kaisuuA % 3) < 2 ? 'https://www.youtube.com/watch?v=' : 'https://youtu.be/';
        //let newurl = key === "a" ? domain + location.href.match(/v\=([^?&]*)/)[1] + ctime : location.href.replace(/&t=[0-9hms]*s?/, "") + ctime;
        let te = eleget0('//h1[@class="title style-scope ytd-video-primary-info-renderer"]/yt-formatted-string[@force-default-style="" and @class="style-scope ytd-video-primary-info-renderer"]');
        let titleInPage = te ? te.innerText + " - YouTube" : null;
        //var cb = (document.title + ret + newurl + ret);
        var cb = ((titleInPage || document.title) + ret + newurl + ret);
        if (key === "Shift+A") history.pushState(null, null, newurl);
        GM.setClipboard(cb);
        elecli("forced", '//div[@class="ytp-right-controls"]/button[@aria-label="設定"]|//button[@class="ytp-button ytp-settings-button"]', 0, "close");
        elecli("forced", '//div[@class="ytp-right-controls"]/button[@aria-label="設定"]|//button[@class="ytp-button ytp-settings-button"]', 0.33, "blur"); // 設定ボタン
        kaisuuA = ++kaisuuA % 3;
      }
      e.preventDefault();
      return false;
    }
  }, false);

  var latestVideo = elegeta('//video').map(e => e.src).toString();

  setInterval(() => {
    if (elegeta('//video').map(e => e.src).toString() != latestVideo) { // video要素の.srcたちの変化を監視
      latestVideo = elegeta('//video').map(e => e.src).toString();
      checkROAJAlready = 0;
      if (VERBOSE_NOTIFY) vn(latestVideo, "//video変化 : " + elegeta('//video').length + "要素 ");
      //      run(wait_pageOpen * 3);
      if (latestVideo.length > 3) run(wait_pageOpen * 3); // src属性の中身があるvideo要素が1つ以上あれば
    }
  }, 1000);

  if (window === parent && location.href.match(/^https:\/\/www\.youtube\.com\/watch/)) run(wait_pageOpen * 2);

  for (let ele of elegeta('//div[@id="player"]/div/div/button[@aria-label="再生"]|//div[@id="player"]/div/div/button[@aria-label="Play"]')) {
    ele.addEventListener('click', () => { setTimeout(run, wait_pageOpen * 2) });
  }

  return;

  function run(delay = 500) {
    verb(elegeta('//video[@class="video-stream html5-main-video"]'))
    elegeta('//video').forEach(e => { if (!(e.src)) e.remove() })
    let video = elegeta('//video[@class="video-stream html5-main-video"]').slice(-1)[0]; // video要素が複数ある場合があるので最後の１つを取得
    if (!video) { verb("まだビデオ要素がありません"); return; }
    //verb(video.paused)
    //    if (video.paused == true || (video.currentTime < WAIT_VIDEO_START)) {
    if (!video.src) {
      verb("まだビデオ再生が始まっていません");
      setTimeout(() => run(delay), 100);
      return;
    }
    setTimeout(function() {
      elegeta('//video').forEach(e => { if (!(e.src)) e.remove() })
      verb("run");
      var title = eleget0('//h1/yt-formatted-string');
      if (!(location.href.match(/\/embed/)) && (!title || !eleget0('//div[contains(@class,"ytp-right-controls")]/button[@aria-haspopup="true"]|//button[@class="ytp-button ytp-settings-button" and @data-tooltip-target-id="ytp-settings-button"]'))) {
        setTimeout(run, 100);
        verb("title does not exist");
        return;
      }
      if (!ENABLE_EVENJAPANESE && title && ((title.innerText) || "").match(/[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+/)) { verb("title has Japanese character(s)"); return; } // タイトルに日本語あるならやめる
      setTimeout(() => { toJP(), wait_pageOpen });
    }, delay + ((window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ? 200 : 0));

  }

  function toJP(f = null) {
    if (!(location.href.match(ENABLE_EVENEMBED ? /:\/\/www\.youtube\.com\/watch\?|:\/\/www\.youtube\.com\/embed/ : /:\/\/www\.youtube\.com\/watch\?/))) return;
    if (eleget0('//button[@class="ytp-subtitles-button ytp-button" and @aria-pressed="true"]|//button[@class="ytp-subtitles-button ytp-button" and @aria-pressed="false"]')) { // 字幕ボタン
      elecli(f, '//button[@class="ytp-subtitles-button ytp-button" and @aria-label="字幕（c）" and @aria-pressed="false"]|//button[@class="ytp-subtitles-button ytp-button" and @aria-pressed="false"]', 1); // 字幕ボタン
      if (!DO_NOT_SELECT_LANGUAGE && !eleget0('//div[text()="デフォルトの字幕"]')) {
        elecli(f, '//div[@class="ytp-right-controls"]/button[@aria-label="設定"]|//button[@class="ytp-button ytp-settings-button"]', 2); // 設定ボタン
        elecli(f, '//div[@class="ytp-menuitem-label"]/div/span[text()="字幕"]|//div[@class="ytp-menuitem-label"]/div/span[contains(text(),"Subtitles/CC")]', 3, "close", "smooth");
        elecli(f, '//div[@class="ytp-menuitem-label" and text()="自動翻訳"]|//div[2]/div/div[@class="ytp-menuitem-label" and contains(text(),"Auto-translate")]', 4, "close", "instant");
        elecli(f, '//div[@class="ytp-menuitem-label" and text()="日本語"]|//div[@class="ytp-menuitem-label" and text()="Japanese"]', 5, "close");
        elecli(f, '//div[contains(@class,"ytp-right-controls")]/button[@aria-haspopup="true" and @aria-expanded="true"]|//button[@class="ytp-button ytp-settings-button" and @data-tooltip-target-id="ytp-settings-button" and @aria-expanded="true"]', 7, "blur");
      }
    }
  }

  function elecli(f, xpath, delay = 0, command = false, beha = null) {
    setTimeout(() => {
      var title = eleget0('//h1/yt-formatted-string');
      if (!f && (((title.innerText) || "").match(WORDS_TO_FORCE_DISABLE))) { elecli(1, '//button[@class="ytp-subtitles-button ytp-button" and @aria-pressed="true"]'); return }
      let muted = eleget0('//button[@class="ytp-mute-button ytp-button" and @title="ミュート解除（m）"]');
      verb(!f, !(ENABLE_WHEN_MUTED && muted), DISABLE_AUTO_GENERATED_JAPANESE, (((title.innerText) || "").match(WORDS_TO_FORCE_ENABLE) == null))
      if ((!f && !(ENABLE_WHEN_MUTED && muted) && DISABLE_AUTO_GENERATED_JAPANESE && (((title.innerText) || "").match(WORDS_TO_FORCE_ENABLE) == null))) { // 自動翻訳の日本語しかなければ字幕をオフにして終わる
        var str = "";
        for (let am of elegeta('//div[@class="ytp-menuitem-label"]')) { str += am.innerText };
        verb("available lang check:" + delay + ', //div[@class="ytp-menuitem-label"] .innerText: ' + str);
        if (str === 'アノテーション再生速度字幕 (1)画質オフ日本語 (自動生成)自動翻訳' || str === '自動再生アノテーション再生速度字幕 (1)画質オフ日本語 (自動生成)自動翻訳' || str === 'オフ日本語 (自動生成)自動翻訳' || str === '自動再生アノテーション再生速度字幕 (1)画質字幕を追加オフ日本語 (自動生成)自動翻訳' || str === '自動再生再生速度字幕 (1)画質字幕を追加オフ日本語 (自動生成)自動翻訳' || str.match(/^(自動再生)?再生速度字幕 \(1\)画質オフ日本語 \(自動生成\)自動翻訳$|字幕を追加オフ日本語 \(自動生成\)自動翻訳$/)) {
          elecli(1, '//button[@class="ytp-subtitles-button ytp-button" and @aria-pressed="true"]');
          //          roaj(str + "だったのでやめました");
          vn(str + "だったのでやめました");
          return;
        }
      }
      var ele = eleget0(xpath);
      verb(xpath, "...found : " + (elegeta(xpath).length));
      if (ele) {
        for (let ele of elegeta(xpath)) {
          if (command == "focus") {
            ele.focus();
            verb("...focused")
          } else {
            ele.click();
            verb("...clicked")
            if (window != parent && beha) {
              let foc = eleget0('//div[@id="movie_player"]|//div[@id="player"]');
              if (foc) foc.scrollIntoView({ behavior: beha, block: "center", inline: "center" });
            }
          }
        }
      } else {
        verb("...not found");
        if (command == "close") {
          elecli(f, '//div[contains(@class,"ytp-right-controls")]/button[@aria-haspopup="true" and @aria-expanded="true"]|//button[@class="ytp-button ytp-settings-button" and @data-tooltip-target-id="ytp-settings-button" and @aria-expanded="true"]'); // 歯車がオープンの状態の歯車
          //          roaj(xpath + "がなかったのでやめました");
          vn(xpath + "がなかったのでやめました");
        }
      }
      if (command == "blur") elecli(f, '//div[@id="movie_player"]|//div[@id="player"]/div/div/video', 0, "focus");
    }, delay * WAIT_EACHACTION);
  }

  function eleget0(xpath, node = document) {
    if (!xpath) return null;
    try {
      var ele = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
    } catch (e) { return null; }
  }

  function elegeta(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function verb() {
    if (verbose)
      for (let str of arguments) console.log(str);
  }

  function roaj(str) {
    if (CHECK_ROAJ && !checkROAJAlready) {
      alert(str);
      checkROAJAlready = 1;
    }
  }

  function vn(body, title = "") { // verbose notify
    if (VERBOSE_NOTIFY) notify(body, title);
  }

  function notify(body, title = "") {
    if (!("Notification" in window)) return;
    else if (Notification.permission == "granted") new Notification(title, { body: body });
    else if (Notification.permission !== "denied") Notification.requestPermission().then(function(permission) {
      if (permission === "granted") new Notification(title, { body: body });
    });
  }
})();


```