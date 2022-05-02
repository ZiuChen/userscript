// ==UserScript==
// @name         全自动风纪委
// @description  按下回车自动提交风纪委评价
// @namespace    http://tampermonkey.net
// @supportURL   https://github.com/ZiuChen
// @version      0.2
// @author       ZiuChen
// @updateURL
// @downloadURL
// @match        https://www.bilibili.com/judgement/*
// @icon         https://cdn.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @grant        MIT
// ==/UserScript==

/* 原理：DOM操作模拟点击，不会被检测异常 */
/* 使用方法：进入第一个案件后按下回车，后续无需人工干预自动完成所有风纪委任务 */
/* 仅供学习交流使用，安装后请于24小时内删除 */
document.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13 || location.href.indexOf("index") !== -1) return false;
  callBackFn();
});

async function callBackFn() {
  return await sleep(5000)
    .then(() => {
      document.querySelectorAll(".vote-btns .btn-group button")[0].click(); // 是否合适
      document.querySelectorAll(".vote-btns .will-you-watch button")[0].click(); // 会观看吗
      document.querySelector(".vote-anonymous .v-check-box__label").click(); // 勾选匿名
    })
    .then(() => sleep(0))
    .then(() => {
      document.querySelector(".vote-submit button").click(); // 提交
    })
    .then(() => sleep(5000))
    .then(() => {
      document.querySelector(".vote-result button").click(); // 跳转下一题
    })
    .then(() => sleep(0))
    .then(() => {
      callBackFn();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function sleep(timeout) {
  timeout += randInt(500, 1000); // 随机延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("timeout");
    }, timeout);
  });
}

function randInt(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}
