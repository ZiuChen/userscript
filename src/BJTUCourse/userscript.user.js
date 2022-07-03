// ==UserScript==
// @name             BJTU抢课脚本
// @description      北京交通大学抢课脚本
// @version          0.0.1
// @author           ZiuChen
// @source           https://github.com/ZiuChen/userscript
// @supportURL       https://github.com/ZiuChen/userscript
// @license          MIT
// @match            https://aa.bjtu.edu.cn/course_selection/*
// @updateURL        https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/BJTUCourse/userscript.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/BJTUCourse/userscript.user.js
// @namespace        https://github.com/ZiuChen/userscript
// @require          https://cdn.jsdelivr.net/npm/table-to-json@1.0.0/lib/jquery.tabletojson.min.js
// @grant            GM_notification
// @icon             https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// ==/UserScript==

// 使用前请完整阅读 README.md
const config = {
  tableSelector: 'table', // (必须) 表格选择器, 请勿修改
  matchName: [], // (可选) 简单匹配 课程名, 将`课程`一栏的内容完整填入, 支持泛选, 若要抢某一门课, 则需完整复制课程号 课程名 课序号
  matchPattern: [], // (可选) 高级匹配 匹配表格内的任意值, 支持泛选
  timeout: 2500 // (必须) 每次检索时间间隔(ms), 建议在抢课初期提高频率, 中后期降低频率
}

const headings = ['info', 'index', 'cname', 'remain', 'credit', 'type', 'tname', 'tap', 'more']

const URL = {
  _base: 'https://aa.bjtu.edu.cn/course_selection/courseselecttask/selects_action/?action=',
  _main: 'load',
  _submit: 'submit',
  _delete: 'delete',
  get main() {
    const suffix = '&iframe=school&page=1&perpage=1000'
    return this._base + this._main + suffix
  },
  get submit() {
    return this._base + this._submit
  },
  get delete() {
    return this._base + this._delete
  }
}

const log = (content, type) => {
  let time = new Date().toLocaleTimeString()
  let color = ''
  switch (type) {
    case 'success':
      color = 'green'
      break
    case 'warning':
      color = 'orange'
      break
    case 'error':
      color = 'red'
      break
    case 'info':
      color = 'blue'
      break
    default:
      color = 'grey'
      break
  }
  return console.log(`%c[${time}]` + `%c ${content}`, 'color: #005bac;', `color: ${color};`)
}

const formatStatus = (string) => {
  if (string.indexOf('已选') !== -1) return 1 // 已选中
  else if (string.indexOf('无余量') !== -1) return -1 // 无余量
  else return 0 // 未选中
}

const parse2Json = (text) => {
  const p = new DOMParser()
  const table = p.parseFromString(text, 'text/html')?.querySelector(config.tableSelector)
  return $(table).tableToJSON({
    ignoreHiddenRows: false,
    headings,
    extractor: (cellIndex, $cell) => {
      return cellIndex === 0
        ? { status: formatStatus($cell.text()), id: $cell.find('input').attr('value') }
        : $cell.text()
    }
  })
}

const filter = (array, key, value) => {
  return array.filter((item) => {
    return item[key] === value
  })
}

const req = async (url, options = {}) => {
  return fetch(url, { ...options }).catch((err) => {
    log('请求出错: ' + err)
  })
}

const submit = async (id) => {
  const f = new FormData()
  f.append('checkboxs', id)
  return req(URL.submit, {
    method: 'POST',
    body: f
  })
}

const trialSubmit = async (c) => {
  const info = `[${c.cname} ${c.tname}] `
  const status = c.info.status
  if (status === 0) {
    log(info + '有余量, 发起抢课', 'warning')
    submit(c.info.id).then(() => {
      log(info + '抢课成功', 'error')
      GM_notification({
        title: '抢课成功',
        text: info,
        timeout: 10000,
        highlight: true
      })
    })
  } else if (status === -1) {
    log(info + '无余量')
  } else {
    // log(info + '已抢到', 'success')
  }
}

const matchPattern = (c, p) => {
  const flags = []
  for (const [key, value] of Object.entries(p)) {
    // 遍历 pattern 的每个属性
    if (key === 'info') continue
    flags.push(c[key].indexOf(value) !== -1)
  }
  return flags.indexOf(false) === -1
}

const advanceMatch = async (table, patterns) => {
  for (const c of table) {
    // 遍历 Table 中每个课程
    for (const p of patterns) {
      // 遍历 patterns 中每个匹配规则
      matchPattern(c, p) && trialSubmit(c)
    }
  }
}

const simpleMatch = async (table, nameTable) => {
  const patterns = []
  for (const cname of nameTable) {
    patterns.push({ cname })
  }
  advanceMatch(table, patterns)
}

const cache = {
  set: (key, value) => {
    try {
      const r = JSON.stringify(value)
      return window?.localStorage.setItem(key, r)
    } catch (error) {
      alert('格式错误')
      return
    }
  },
  get: (key) => JSON.parse(window?.localStorage.getItem(key))
}

const start = () => {
  let count = 0
  const fun = async () => {
    log(`检索第${++count}次`)
    return req(URL.main)
      .then((res) => res.text())
      .then((text) => parse2Json(text))
      .then((table) =>
        config.matchPattern.length
          ? advanceMatch(table, config.matchPattern)
          : simpleMatch(
              table,
              config.matchName.length ? config.matchName : cache.get('simple-match')
            )
      )
  }
  fun()
  setInterval(fun, config.timeout)
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
