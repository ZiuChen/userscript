// ==UserScript==
// @name         全自动风纪委
// @description  进入评价界面自动开始提交风纪委评价
// @namespace    http://tampermonkey.net
// @supportURL   https://github.com/ZiuChen/userscript
// @version      0.7
// @author       ZiuChen
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/BiliAutoJudgement/bili-auto-judgement.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/BiliAutoJudgement/bili-auto-judgement.user.js
// @match        https://www.bilibili.com/judgement/*
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @grant        none
// @license      MIT
// ==/UserScript==

/* 原理：DOM操作模拟点击，不会被检测异常 */
/* 使用方法：进入第一个案件后按下确认，后续无需人工干预自动完成所有风纪委任务 */
/* 仅供学习交流使用，安装后请于24小时内删除 */

const CONFIG = {
  是否合适: 0, // 0合适 | 1一般 | 2普通 | 3不合适
  会观看吗: 1, // 0会观看 | 1不会观看
  是否匿名: true // true匿名 | false非匿名
}

alert(
  "[全自动风纪委] 脚本已加载，进入第一个案件后按下回车开启 \n 若无此消息，则脚本未被成功加载，需使用 Shift+F5 强制刷新"
)
document.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13 || location.href.indexOf("index") !== -1) return false
  alert("[全自动风纪委] 点击确认启动脚本")
  callBackFn()
})

async function callBackFn() {
  return await sleep(2500)
    .then(() => {
      document.querySelectorAll(".vote-btns .btn-group button")[CONFIG["是否合适"]]?.click() // 是否合适
      document.querySelectorAll(".vote-btns .will-you-watch button")[CONFIG["会观看吗"]]?.click() // 会观看吗
      if (CONFIG["是否匿名"]) {
        document.querySelector(".vote-anonymous .v-check-box__label")?.click() // 勾选匿名
      }
    })
    .then(() => sleep(0))
    .then(() => {
      document.querySelector(".vote-submit button")?.click() // 提交
    })
    .then(() => sleep(5000))
    .then(() => {
      document.querySelector(".vote-result button")?.click() // 跳转下一题
    })
    .then(() => sleep(0))
    .then(() => {
      callBackFn()
    })
    .catch((err) => {
      console.error(err)
      if (confirm("[全自动风纪委] 出错了，点击确定刷新。")) {
        location.reload()
      }
    })
}

async function sleep(timeout) {
  timeout += randInt(500, 1000) // 随机延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

function randInt(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10)
}
