// ==UserScript==
// @name             BJTU抢课脚本
// @description      北京交通大学抢课脚本
// @version          0.0.3
// @author           Ziu
// @source           https://github.com/ZiuChen/userscript
// @supportURL       https://github.com/ZiuChen/userscript
// @license          MIT
// @match            https://aa.bjtu.edu.cn/course_selection/*
// @updateURL        https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/BJTUCourse/userscript.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/BJTUCourse/userscript.user.js
// @namespace        https://github.com/ZiuChen/userscript
// @require          https://fastly.jsdelivr.net/npm/table-to-json@1.0.0/lib/jquery.tabletojson.min.js
// @connect          pushplus.plus
// @grant            GM_notification
// @grant            GM_xmlhttpRequest
// @icon             https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// ==/UserScript==

// 使用前请完整阅读 README.md
const config = {
  simpleMatchPatterns: [], // (可选) 简单匹配 课程名 支持泛选
  advanceMatchPatterns: [], // (可选) 高级匹配 匹配表格内的任意属性 支持泛选
  advanceQuery: '', // (可选) 查询字符串 指定需要检索的数据源
  pushPlusToken: '', // (可选) PushPlusToken
  timeout: 2500 // (必须) 检索时间间隔(ms)
}

const GlobalTasks = [] // 代码环境下的匹配任务

const URL = {
  selectPage: 'https://aa.bjtu.edu.cn/course_selection/courseselecttask/selects/',
  _base: 'https://aa.bjtu.edu.cn/course_selection/courseselecttask/selects_action/?action=',
  _main: 'load',
  _submit: 'submit',
  _delete: 'delete',
  _advanceQuery: config.advanceQuery || '',
  get main() {
    const suffix = '&iframe=school&page=1&perpage=1000'
    return this._base + this._main + this._advanceQuery + suffix
  },
  get submit() {
    return this._base + this._submit
  },
  get delete() {
    return this._base + this._delete
  }
}

const log = (content, type) => {
  const cMap = { success: 'green', warning: 'orange', error: 'red', info: 'blue', none: 'grey' }
  const color = cMap[type] === undefined ? cMap['none'] : cMap[type]
  const time = new Date().toLocaleTimeString()
  return console.log(`%c[${time}]` + `%c ${content}`, 'color: #005bac;', `color: ${color};`)
}

const parse2DOM = (text, selector) => {
  const p = new DOMParser()
  return p.parseFromString(text, 'text/html')?.querySelector(selector)
}

const parse2Json = (text) => {
  const table = parse2DOM(text, 'table')
  const toStatus = (string) => {
    if (string.indexOf('已选') !== -1) return 1 // 已选中
    else if (string.indexOf('无余量') !== -1) return -1 // 无余量
    else return 0 // 未选中
  }
  return $(table).tableToJSON({
    ignoreHiddenRows: false,
    headings: ['info', 'index', 'cname', 'remain', 'credit', 'type', 'tname', 'tap', 'more'],
    extractor: (cellIndex, $cell) => {
      return cellIndex === 0
        ? { status: toStatus($cell.text()), id: $cell.find('input').attr('value') }
        : $cell.text()
    }
  })
}

const req = async (url, options = {}) => {
  return fetch(url, { ...options }).catch((err) => {
    log('请求出错: ' + err)
  })
}

const submit = async (id) => {
  const f = new FormData()
  f.append('checkboxs', id) // 验证码: hashkey & answer
  return req(URL.submit, {
    method: 'POST',
    body: f
  })
}

const remove = async (id) => {
  const f = new FormData()
  f.append('select_id', id)
  return req(URL.delete, {
    method: 'POST',
    body: f
  })
}

const XHR = (XHROptions) => {
  // 仅用于跨域请求
  return new Promise((resolve) => {
    const onerror = (error) => resolve(undefined)
    XHROptions.timeout = 30 * 1000
    XHROptions.onload = (res) => resolve(res.response)
    XHROptions.onerror = onerror
    XHROptions.ontimeout = onerror
    GM_xmlhttpRequest(XHROptions)
  })
}

const sendMsg = async (info) => {
  config?.pushPlusToken &&
    XHR({
      anonymous: true,
      method: 'POST',
      url: `http://www.pushplus.plus/send`,
      data: JSON.stringify({
        token: config?.pushPlusToken,
        title: '抢课成功',
        content: info
      }),
      responseType: 'json'
    }).then(({ code, msg, data }) =>
      log(`PushPlus推送结果: [${code}] ${msg} 消息流水号: ${data}`, 'success')
    )
  GM_notification({
    title: '抢课成功',
    text: info,
    timeout: 10000,
    highlight: true
  })
}

const fetchSelectedTable = async () => {
  return req(URL.selectPage)
    .then((res) => res.text())
    .then((text) => parse2DOM(text, '.table'))
    .then((tableDOM) =>
      $(tableDOM).tableToJSON({
        ignoreHiddenRows: false,
        headings: ['id', 'cname', 'remain', 'credit', 'type', 'cstatus', 'tname', 'tap'],
        extractor: (cellIndex, $cell) => {
          return cellIndex === 0 ? $cell.find('a').attr('data-pk') : $cell.text()
        }
      })
    )
}

const modifyTask = (p) => {
  const index = GlobalTasks.indexOf(p)
  GlobalTasks[index].throw = undefined
}

const removeTask = (p) => {
  const index = GlobalTasks.indexOf(p)
  GlobalTasks.splice(index, 1)
}

const handleCourseThrow = async (p) => {
  const selectTable = await fetchSelectedTable()
  let flg = false
  for (const sc of selectTable) {
    if (sc.cname.indexOf(p.throw) !== -1) {
      flg = true
      remove(sc.id) // 抛掉 `throw` 指定的课程
      modifyTask(p)
    }
  }
  if (!flg) log('未匹配到throw课程', 'error')
}

const trialSubmit = async (c, p) => {
  const info = `[${c.cname} ${c.tname}] `
  const status = c.info.status
  if (status === 0) {
    log(info + '有余量, 发起抢课', 'warning')
    submit(c.info.id)
  } else if (status === -1) {
    // 无余量
  } else {
    if (!p?.throw) {
      log(info + '抢课成功', 'error')
      sendMsg(info)
      removeTask(p) // 移除当前匹配任务
    } else {
      // 配置了 `throw`属性 需要先抛课再执行抢课
      log(info + '抛出指定课堂', 'error')
      handleCourseThrow(p)
    }
  }
}

const isMatched = (c, p) => {
  const flags = []
  for (const [key, value] of Object.entries(p)) {
    // 遍历 pattern 的每个属性
    if (key === 'info') continue
    if (key === 'throw') continue
    flags.push(c[key].indexOf(value) !== -1)
  }
  return flags.indexOf(false) === -1
}

const advanceMatch = async (table, tasks) => {
  for (const c of table) {
    // 遍历 Table 中每个课程
    for (const p of tasks) {
      // 遍历 tasks 中每个匹配规则
      isMatched(c, p) && trialSubmit(c, p)
    }
  }
}

const toAdvancePattern = (matchNameTable) => {
  const ptns = []
  for (const cname of matchNameTable) {
    ptns.push({ cname })
  }
  return ptns
}

const cache = {
  set: (key, value) => window?.localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => JSON.parse(window?.localStorage.getItem(key))
}

const addMatchTask = () => {
  const flgs = [config.advanceMatchPatterns.length, config.simpleMatchPatterns.length]
  const ptns = flgs[0]
    ? config.advanceMatchPatterns
    : flgs[1]
    ? toAdvancePattern(config.simpleMatchPatterns)
    : toAdvancePattern(cache.get('simple-match'))
  GlobalTasks.push(...ptns)
}

const start = () => {
  let count = 0
  addMatchTask()
  const fun = async () => {
    if (!GlobalTasks.length) {
      log('任务列表为空, 本次抢课结束', 'success')
      return clearInterval(interval)
    }
    log(`检索第${++count}次`)
    return req(URL.main)
      .then((res) => res.text())
      .then((text) => parse2Json(text))
      .then((table) => advanceMatch(table, GlobalTasks))
  }
  fun()
  const interval = setInterval(fun, config.timeout || 2500)
}

const viewInit = () => {
  const div = document.createElement('div')
  const icon = document.createElement('i')
  const span1 = document.createElement('span')
  const input1 = document.createElement('input')
  const startBtn = document.createElement('button')
  const pauseBtn = document.createElement('button')
  const childs = [icon, span1, input1, startBtn, pauseBtn]
  icon.className = 'fa fa-question bigger-125'
  icon.title = '如有多个则以英文逗号 , 分隔 \n更多信息, 请见README'
  icon.click = () => window.open()
  startBtn.className = 'btn btn-mini btn-danger'
  startBtn.innerText = '开始抢课'
  startBtn.onclick = start
  pauseBtn.className = 'btn btn-mini btn-success'
  pauseBtn.innerText = '中止抢课'
  pauseBtn.onclick = () => window.location.reload()
  span1.innerText = '简单匹配'
  input1.id = 'simple-match'
  input1.placeholder = '简单匹配'
  input1.style['width'] = '500px'
  input1.value = cache.get('simple-match')
  input1.onchange = (e) => cache.set('simple-match', e.target.value.split(','))
  div.style = 'display: flex; justify-content: flex-end; align-items: center;'
  childs.forEach((c) => (c.style['margin-right'] = '5px'))
  div.append(...childs)
  document.querySelector('form')?.after(div)
}

const main = () => {
  viewInit()
}

main()
