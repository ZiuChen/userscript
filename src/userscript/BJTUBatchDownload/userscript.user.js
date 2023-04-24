// ==UserScript==
// @name         批量下载课程平台资源
// @namespace    https://github.com/ZiuChen/NO-FLASH-Upload
// @version      0.3
// @description  在资源列表添加按钮，点击即可批量下载课程平台资源
// @author       Ziu
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/getResources.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/getResources.user.js
// @match        http://cc.bjtu.edu.cn:81/meol/*
// @require      https://fastly.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @grant        none
// ==/UserScript==

function getFileLinks() {
  let fileLinks = []
  for (let i = 0; i < $('tbody>tr').length; i++) {
    let href = $($('tbody>tr')[i]).find('td>a').attr('href')
    if (href && href.indexOf('listview.jsp?') != 0) {
      fileLinks.push(
        'http://cc.bjtu.edu.cn:81/meol/common/script/download.jsp' +
          $($('tbody>tr')[i]).find('td>a').attr('href').split('download_preview.jsp')[1]
      )
    }
  }
  return fileLinks
}

function appendButton() {
  if (location.href.indexOf('listview.jsp?') == -1) {
    return
  }
  $('.subtitle').append(
    /*html*/
    `<span style="color: #015aab; cursor: pointer"><a id="download-all" title="下载此目录下所有文件" >下载此目录下所有文件</a></span>`
  )
  $('#download-all').click(() => {
    if (window.confirm('即将弹出若干窗口，但随下载完成将自动关闭')) {
      let fileLinks = getFileLinks()
      if (fileLinks.length) {
        fileLinks.forEach((value) => {
          window.open(value)
        })
      } else {
        alert('当前目录无文件')
      }
    } else {
      console.log('请求已中断')
    }
  })
}

appendButton()
