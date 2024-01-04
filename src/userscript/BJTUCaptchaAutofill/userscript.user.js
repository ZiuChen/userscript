// ==UserScript==
// @name         识别并自动填写MIS验证码
// @namespace    https://github.com/ZiuChen/NO-FLASH-Upload
// @version      1.1.0
// @description  识别并自动填写北京交通大学MIS入口的验证码，使用前需自行申请讯飞印刷文字识别API
// @author       Ziu
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @match        https://cas.bjtu.edu.cn/*
// @connect      webapi.xfyun.cn
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @license      MIT
// ==/UserScript==

/**
 * 使用前请先申请: 讯飞开放平台 印刷文字识别接口 申请链接 www.xfyun.cn 每天可免费识别 500 次
 * 控制台/我的应用/文字识别/印刷文字识别 获取到 APPID 和 APIKey
 * apikey存储在本地不会上传到服务器
 */
const global = {
  /**
   * 讯飞印刷文字识别接口地址
   */
  hostUrl: 'https://webapi.xfyun.cn/v1/service/v1/ocr/general',
  /**
   * APPID
   */
  appid: null,
  /**
   * APIKey
   */
  apiKey: null,
  /**
   * 验证码图片选择器
   */
  imgSelector: '.captcha',
  /**
   * 验证码输入框选择器
   */
  inputSelector: '#id_captcha_1'
}

const console = {
  log: window.console.log.bind(window.console, '[识别并自动填写MIS验证码]'),
  error: window.console.error.bind(window.console, '[识别并自动填写MIS验证码]'),
  warn: window.console.warn.bind(window.console, '[识别并自动填写MIS验证码]'),
  info: window.console.info.bind(window.console, '[识别并自动填写MIS验证码]')
}

/**
 * 获取验证码图片的base64编码
 */
async function getCaptchaImage() {
  const img = document.querySelector(global.imgSelector)
  if (!img) {
    alert('未找到验证码图片')
    return
  }

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const base64 = canvas.toDataURL()
  return base64
}

/**
 * blob转base64
 */
async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * 组装请求头
 */
function getReqHeader() {
  const xParamStr = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(
      JSON.stringify({
        language: 'cn|en'
      })
    )
  )
  const timeStamp = parseInt(new Date().getTime() / 1000) // 获取当前时间戳
  const xCheckSum = CryptoJS.MD5(global.apiKey + timeStamp + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': global.appid,
    'X-CurTime': timeStamp + '',
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum
  }
}

/**
 * 修正识别字符串
 */
function reviseString(ocrResult) {
  const rules = {
    '*': ['x', 'X', '×'],
    '/': ['.'],
    ' ': ['='] // remove
  }
  let res = ocrResult
  for (const symbol of Object.keys(rules)) {
    const rule = rules[symbol]
    rule.forEach((r) => {
      if (ocrResult.indexOf(r) !== -1) {
        res = res.replace(r, symbol)
      }
    })
  }

  // 修正后的字符串中仍然存在非数字字符
  if (res.match(/[^0-9\+\-\*\/\.]/g)) {
    res = res.replace(/[^0-9\+\-\*\/\.]/g, '')
  }

  console.log('originString: ' + ocrResult)
  console.log('rtnString: ' + res)
  return res
}

/**
 * 处理ocr识别传回的字符串
 * 执行计算并返回结果
 */
function calcResult(string) {
  try {
    return eval(reviseString(string))
  } catch (error) {
    confirm('计算失败，点击确定重新识别') && location.reload()
  }
}

/**
 * GM_xmlhttpRequest 封装
 */
function fetchWithGM(url, options) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: options.method || 'GET',
      url,
      headers: options.headers,
      data: options.data,
      responseType: options.responseType || 'json',
      timeout: options.timeout || 10 * 1000,
      onload: resolve,
      onerror: reject,
      ontimeout: () => reject('请求超时')
    })
  })
}

/**
 * 参数预检查并填充到全局变量
 */
function precheck() {
  // 优先从 GM_getValue 中获取
  global.appid = GM_getValue('xf_appid')
  global.apiKey = GM_getValue('xf_apiKey')

  if (!global.appid || !global.apiKey) {
    // 尝试从 localStorage 中获取
    global.appid = localStorage.getItem('xf_appid')
    global.apiKey = localStorage.getItem('xf_apiKey')
  }

  if (!global.appid || !global.apiKey) {
    const appid = prompt('[讯飞印刷文字识别] 请输入appid: ')
    if (appid) {
      global.appid = appid
      GM_setValue('xf_appid', appid)
    }

    const apiKey = prompt('[讯飞印刷文字识别] 请输入apiKey: ')
    if (apiKey) {
      global.apiKey = apiKey
      GM_setValue('xf_apiKey', apiKey)
    }
  }

  if (!global.appid || !global.apiKey) {
    return false
  }

  return true
}

/**
 * 识别并填充验证码
 * @param {*} image base64编码的验证码图片
 */
async function captchAndFill(image) {
  // 将 base64 图片转换为讯飞识别接口所需的格式
  image = 'image=' + image.split('base64,')[1]

  if (!precheck()) {
    alert('初始化错误，请检查 Key 是否正确输入')
  }

  const input = document.querySelector(global.inputSelector)
  let inputPlaceholder = input?.placeholder
  inputPlaceholder && (input.placeholder = '正在识别验证码...')

  try {
    const res = await fetchWithGM(global.hostUrl, {
      method: 'POST',
      headers: getReqHeader(),
      data: image,
      responseType: 'json'
    })
    console.log('res', res)

    const ocrResult = res?.response?.data?.block[0]?.line[0]?.word[0]?.content
    if (!ocrResult) {
      throw new Error('ocrResult is invalid', ocrResult)
    }

    const numberResult = calcResult(ocrResult)
    if (numberResult === undefined) {
      throw new Error('numberResult is invalid', numberResult)
    }

    const target = document.querySelector(global.inputSelector)
    if (!target) {
      alert('未找到验证码输入框')
      return
    }
    target.value = numberResult // 填入输入框内
  } catch (error) {
    console.error(error)
    confirm('识别失败，点击确定重新识别') && location.reload()
  }

  input.placeholder = inputPlaceholder
}

;(async () => {
  const base64 = await getCaptchaImage()
  captchAndFill(base64)

  // 点击验证码图片时重新识别
  document.querySelector(global.imgSelector).addEventListener('click', async () => {
    const base64 = await getCaptchaImage()
    captchAndFill(base64)
  })
})()
