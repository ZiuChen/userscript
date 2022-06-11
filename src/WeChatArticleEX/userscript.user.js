// ==UserScript==
// @name         微信文章浏览功能拓展
// @description  快速预览/保存封面图与文章摘要以及更多
// @namespace    https://github.com/ZiuChen/userscript
// @version      1.2.2
// @author       Ziu
// @match        *://mp.weixin.qq.com/s*
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/WeChatArticleEX/userscript.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/WeChatArticleEX/userscript.user.js
// @require      https://fastly.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require      https://fastly.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @license      MIT
// ==/UserScript==

let summary_show_state
let state = {
  url_state: true, // 是否启用封面图链接功能
  openNewWindow_state: true, // 是否在新窗口打开封面图链接
  datetype_state: true, // 是否修改默认时间显示模式
  summary_state: true, // 是否启用读取摘要功能
  clipboard_state: true, // 是否启用点击摘要复制到剪切板功能
  recommend_state: false, // 是否显示引导关注栏
  preview_state: true, // 封面图预览功能
  config_state: true // 是否默认显示设置侧边栏
}
// 设置框
let configBox =
  "<div id='config_window' style='position:fixed;z-index:999999;opacity:0.25;cursor:pointer;top:10%;left:0px;text-align:center;border-style:solid;border-width:2px;'>" +
  "<div id='config_url' class='shownConfig' title='点击跳转封面链接' style='font-size:13px;padding:8px 3px;color:#FFF;background-color:#25AE84;'>封面链接</div>" +
  "<div id='config_summary' class='shownConfig' title='点击隐藏/显示文章摘要' style='font-size:13px;padding:8px 3px;color:#FFF;background-color:#25ae84;'>文章摘要</div>" +
  "<div id='config_preview' class='unshownConfig' title='点击复制封面链接到剪切板' class=\"myclipboard\" data-clipboard-text=\"#\" style='font-size:13px;padding:8px 3px;color:#FFF;background-color:#25ae84;'>复制链接</div>" +
  "<div id='config_search' class='unshownConfig' title='在网络中搜索此文章' style='font-size:13px;padding:8px 3px;color:#FFF;background-color:#25ae84;'>搜索文章</div>" +
  "<div id='config_moreinfo' class='shownConfig' title='查看更多' style='font-size:13px;padding:4px 3px;color:#FFF;background-color:#25ae84;'>· · ·</div>" +
  "</div>"
$("body").append(configBox)
$(".unshownConfig").hide()
$("#config_moreinfo").click(function () {
  $(".unshownConfig").fadeIn()
  $("#config_moreinfo").html(":D")
  $("#config_moreinfo").click(function () {
    window.open("https://greasyfork.org/zh-CN/users/605474")
  })
})
// 给设置窗口添加效果 移入透明度加深 移出透明度变浅
$("#config_window").mouseenter(function () {
  $("#config_window").css("opacity", "1.0")
  $("#config_window > div").mouseenter(function () {
    var $this = $(this) // 把div元素转化成jQuery的对象
    $this.css("background-color", "#1b8262")
    $("#config_window > div").mouseleave(function () {
      $this.css("background-color", "#25ae84")
    })
  })
  $("#config_window>div").mousedown(function () {
    this.style.color = "#125540"
  })
  $("#config_window>div").mouseup(function () {
    this.style.color = "#FFF"
  })
})
$("#config_window").mouseleave(function () {
  $("#config_window").css("opacity", "0.25")
})
// 文章摘要
$("#config_summary").click(function () {
  $("#summary").toggle("fast")
  state.summary_state = false
})
// 微信文章搜索
$("#config_search").click(function () {
  let artname = $("#activity-name").text()
  let baseurl = "https://weixin.sogou.com/weixin?type=2&query="
  let trueurl = baseurl + artname
  if (state.openNewWindow_state === true) {
    window.open(trueurl)
  } else {
    window.location.href = trueurl
  }
})
// 封面图
if (state.url_state === true) {
  let linkReg = /msg_cdn_url = "(.*)"/gi
  let data = $("*").html()
  let url = linkReg.exec(data)
  let trueurl = url[1]
  // 跳转
  $("#config_url").click(function () {
    if (state.openNewWindow_state === true) {
      window.open(trueurl)
    } else {
      window.location.href = trueurl
    }
  })
  // 预览封面图功能
  if (state.preview_state === true) {
    // 引入封面图并设置默认隐藏
    $("#config_url").append('<img id="picture_url"></img>')
    $("#picture_url").attr("src", trueurl)
    $("#picture_url").css({
      zoom: "35%",
      position: "absolute",
      left: "140px",
      "border-radius": "8px",
      "box-shadow": "5px 5px 2px #555555"
    })
    $("#picture_url").hide()
    // 加入鼠标事件 实现预览功能
    $("#config_url").mouseenter(function () {
      $("#picture_url").fadeIn()
    })
    $("#config_url").mouseleave(function () {
      $("#picture_url").toggle()
    })
  }
  // 点击按钮复制封面链接到剪切板
  let clipboard = new ClipboardJS(".myclipboard") // 要使用 clipboard.js 需要声明一个clipboard实例
  $("#config_preview").attr("data-clipboard-text", trueurl)
  $("#config_preview").click(function () {
    let clipboard = new ClipboardJS("#config_preview") // 要使用 clipboard.js 需要声明一个clipboard实例
    alert("封面链接已复制到剪切板！")
  })
}
// 摘要
if (state.summary_state === true) {
  let meta = $('meta[name="description"]')
  let contents = meta[0].content
  if (contents === "") {
    $("#config_summary").css("background-color", "#ffa758")
    $("#config_summary").html("摘要为空")
    $("#config_summary").attr("title", "此篇文章无摘要")
  }
  // 点击摘要复制到剪切板
  if (state.clipboard_state === true) {
    let clipboard = new ClipboardJS(".myclipboard") // 要使用 clipboard.js 需要声明一个clipboard实例
  }
  $("#meta_content").append(
    "afterend",
    '<div id="summary" class="myclipboard" title="点击复制到剪切板" data-clipboard-text="#" style="color: #b2b2b2; border-radius: 5px"></div>'
  )
  $("#summary").html("文章摘要：" + contents)
  $("#summary").attr("data-clipboard-text", contents)
  // 给摘要设置样式与效果事件
  $("#summary").css({ "text-align": "left", "font-size": "15px" }) // 设置摘要左居中
  $("#summary").mouseenter(function () {
    $("#summary").css("color", "#474747")
  })
  $("#summary").mousedown(function () {
    $("#summary").css("color", "#070707")
  })
  $("#summary").mouseup(function () {
    $("#summary").css("color", "#474747")
    $("#config_moreinfo").html("复制成功")
    $("#config_window").css("opacity", "1.0")
    $("#config_moreinfo").css("background-color", "#1b8262")
  })
  $("#summary").mouseleave(function () {
    $("#summary").css("color", "#b2b2b2")
    $("#config_window").css("opacity", "0.25")
    $("#config_moreinfo").css("background-color", "#25ae84")
    $("#config_moreinfo").html("···")
  })
}
// 设置摘要是否默认显示
if (GM_getValue(summary_show_state) === false) {
  $("#summary").hide() // 设置默认隐藏摘要
}
//修改时间格式
if (state.datetype_state === true) {
  $("#publish_time").trigger("click")
}
//隐藏引导关注栏
if (state.recommend_state === false) {
  $(".qr_code_pc").hide()
}
// 默认显示设置侧边栏
if (state.config_state === false) {
  $("#config_window").hide() // 默认隐藏设置框
}
// 给ESC按键添加事件：按下出现设置框
$(document).keyup(function (event) {
  switch (event.keyCode) {
    case 27:
      $("#config_window").toggle()
  }
})
// 给设置菜单赋初值
if (GM_getValue("summary_show_state") === null) {
  GM_setValue("summary_show_state", true)
}
// 默认显示摘要：设置菜单
GM_registerMenuCommand("默认显示文章摘要", function () {
  if (GM_getValue(summary_show_state) === true) {
    GM_setValue(summary_show_state, false)
    alert("默认显示文章摘要:OFF")
    $("#summary").hide()
    console.log("默认显示文章摘要：" + GM_getValue(summary_show_state))
    return
  }
  if (GM_getValue(summary_show_state) === false) {
    GM_setValue(summary_show_state, true)
    alert("默认显示文章摘要:ON")
    $("#summary").show()
    console.log("默认显示文章摘要：" + GM_getValue(summary_show_state))
    return
  }
})
