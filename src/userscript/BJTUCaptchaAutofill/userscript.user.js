// ==UserScript==
// @name         识别并自动填写MIS验证码
// @namespace    https://github.com/ZiuChen/NO-FLASH-Upload
// @version      1.0.0
// @description  识别并自动填写北京交通大学MIS入口的验证码，使用前需自行申请讯飞印刷文字识别API
// @author       Ziu
// @updateURL    https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @downloadURL  https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @match        https://cas.bjtu.edu.cn/*
// @connect      webapi.xfyun.cn
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js
// @icon         https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @license      MIT
// ==/UserScript==

// 使用前请先申请: 讯飞开放平台 印刷文字识别接口 申请链接 www.xfyun.cn 每天可免费识别500次
// apikey存储在本地不会上传
const global = {
  hostUrl: 'https://webapi.xfyun.cn/v1/service/v1/ocr/general',
  appid: localStorage.getItem('xf_appid'), // 控制台->我的应用->文字识别->印刷文字识别->APPID
  apiKey: localStorage.getItem('xf_apiKey'), // 控制台->我的应用->文字识别->印刷文字识别->APIKey
  imgSrc: document.querySelector('.captcha').src // img src
}

const init = () => {
  if (!global.appid || !global.apiKey) {
    const appid = prompt('[讯飞印刷文字识别]请输入appid: ')
    const apiKey = prompt('[讯飞印刷文字识别]请输入apiKey: ')
    if (appid && apiKey) {
      localStorage.setItem('xf_appid', appid)
      localStorage.setItem('xf_apiKey', apiKey)
      global.appid = appid
      global.apiKey = apiKey
      return true
    } else {
      return false
    }
  }
  return true
}

// 获取图片base64编码
const getBase64 = async () => {
  return fetch(global.imgSrc).then(async (res) => {
    if (res.ok) {
      return res.blob().then(async (blob) => {
        const readFileAsync = (blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        }
        return readFileAsync(blob).then((base64) => {
          return base64.split('base64,')[1] // 移除前缀
        })
      })
    } else {
      alert('获取源图像失败')
    }
  })
}

// 组装业务参数
const getXParamStr = () => {
  return CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(
      JSON.stringify({
        language: 'cn|en'
      })
    )
  )
}

// 组装请求头
const getReqHeader = () => {
  const xParamStr = getXParamStr()
  const ts = parseInt(new Date().getTime() / 1000) // 获取当前时间戳
  const xCheckSum = CryptoJS.MD5(global.apiKey + ts + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': global.appid,
    'X-CurTime': ts + '',
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum
  }
}

// 生成请求body
const getPostBody = async () => {
  return getBase64().then((base64) => {
    return 'image=' + base64
  })
}

// 发起xmlhttpRequest请求（GM函数和浏览器原生）
// @Github andywang425
const XHR = (XHROptions) => {
  return new Promise((resolve) => {
    const onerror = (error) => {
      console.log('XHR出错')
      resolve(undefined)
    }
    if (XHROptions.GM) {
      if (XHROptions.method === 'POST') {
        if (XHROptions.headers === undefined) XHROptions.headers = {}
        if (XHROptions.headers['Content-Type'] === undefined)
          XHROptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
      }
      XHROptions.timeout = 30 * 1000
      XHROptions.onload = (res) => resolve({ response: res, body: res.response })
      XHROptions.onerror = onerror
      XHROptions.ontimeout = onerror
      GM_xmlhttpRequest(XHROptions)
    } else {
      const xhr = new XMLHttpRequest()
      xhr.open(XHROptions.method, XHROptions.url)
      if (XHROptions.method === 'POST' && xhr.getResponseHeader('Content-Type') === null)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      if (XHROptions.cookie) xhr.withCredentials = true
      if (XHROptions.responseType !== undefined) xhr.responseType = XHROptions.responseType
      xhr.timeout = 30 * 1000
      xhr.onload = (ev) => {
        const res = ev.target
        resolve({ response: res, body: res.response })
      }
      xhr.onerror = onerror
      xhr.ontimeout = onerror
      xhr.send(XHROptions.data)
    }
  })
}

const reviseString = (originString) => {
  const rules = {
    '*': ['x', 'X', '×'],
    '/': ['.'],
    ' ': ['=', '元', '月'] // remove
  }
  let rtnString = originString
  for (let symbol of Object.keys(rules)) {
    let rule = rules[symbol]
    rule.forEach((r) => {
      if (originString.indexOf(r) !== -1) {
        rtnString = rtnString.replace(r, symbol)
      } else {
        // 未匹配到修正规则
      }
    })
  }
  console.log('originString: ' + originString)
  console.log('rtnString: ' + rtnString)
  return rtnString
}

// 处理ocr识别传回的字符串
const calcResult = (string) => {
  try {
    return eval(reviseString(string))
  } catch (error) {
    confirm('计算失败，点击确定重新识别') && location.reload()
  }
}

// 发送识别请求
getPostBody()
  .then((body) => {
    if (!init()) throw new Error('初始化错误，请检查API是否正确输入')
    XHR({
      GM: true,
      anonymous: true,
      method: 'POST',
      url: global.hostUrl,
      headers: getReqHeader(),
      data: body,
      responseType: 'json'
    }).then((response) => {
      const originString = response?.body?.data?.block[0]?.line[0]?.word[0]?.content
      if (originString) {
        const result = calcResult(originString)
        document.querySelector('#id_captcha_1').value = result // 填入输入框内
      } else {
        confirm('识别失败，点击确定重新识别') && location.reload()
      }
    })
  })
  .catch((error) => {
    alert('出错了: ' + error)
  })
