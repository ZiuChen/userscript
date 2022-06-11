// ==UserScript==
// @name         Mcmod快捷搜索
// @namespace    https://github.com/ZiuChen/userscript
// @version      0.2.2
// @description  一键跳转到CurseForge，全速下载模组
// @author       ZiuChen
// @match        *://www.mcmod.cn/class/*
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/McmodQuickSearch/userscript.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/McmodQuickSearch/userscript.user.js
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @grant        none
// @licence      MIT
// ==/UserScript==

$(".common-link-icon-frame-style-3:last").append(
  '<li><a id="AdditionIcon" data-original-title="Search" target="_blank" rel="nofollow noreferrer" href="#"><svg class="common-mcicon common-linkicon common-linkicon-github" aria-hidden="true"><use xlink:href="#common-icon-official"></use></svg></a><span title="SearchInCurseForge" class="name">Search</span></li>'
)
let ModName = $(".class-title h4").text() // 优先搜索小标题名
if (ModName === "") {
  ModName = $(".class-title h3").text() // 小标题为空，则搜索主标题名
}
let trueurl = "https://files.xmdhs.top/curseforge/s?q=" + ModName // 注意，此处url须用//baidu.com这样的形式
$("#AdditionIcon").attr("href", trueurl)
let Xsite = $("#AdditionIcon").offset().left - 49
let Ysite = $("#AdditionIcon").offset().top - 42
let elePosition = "transform: translate(" + Xsite + "px, " + Ysite + "px);"
$("#AdditionIcon").mouseenter(function () {
  $("body").append(
    '<div id="littleTip" class="tooltip bs-tooltip-top show" role="tooltip" style="will-change: transform; position: absolute; ' +
      elePosition +
      ' top: 0px; left: 0px;" x-placement="top"><div class="arrow" style="left: 62px;"></div><div class="tooltip-inner">去CurseForge搜索</div></div>'
  )
})
$("#AdditionIcon").mouseleave(function () {
  $("#littleTip").remove()
})
