// ==UserScript==
// @name             BJTU抢课脚本
// @description      北京交通大学抢课脚本
// @version          0.0.1
// @author           ZiuChen
// @source           https://github.com/ZiuChen/userscript
// @supportURL       https://github.com/ZiuChen/userscript
// @license          MIT
// @match            https://aa.bjtu.edu.cn/course_selection/*
// @namespace        https://github.com/ZiuChen/userscript
// @require          https://cdn.jsdelivr.net/npm/table-to-json@1.0.0/lib/jquery.tabletojson.min.js
// @grant            GM_notification
// @icon             https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// ==/UserScript==

const config = {
  tableSelector: 'table', // (必须) 表格选择器, 请勿修改
  matchName: ['40L096T:企业风险管理(B) 01'], // (必须) 匹配课程名 类型: string[], 将`课程`一栏的内容完整填入, 注意格式(包括课程号 课程名 课序号)
  timeout: 2500, // (必须) 每次检索时间间隔(ms), 建议在抢课初期提高频率, 中后期降低频率
  showActualId: true, // (必须) 是否显示课程真实 ID 以供填入上方 `target` 数组
  advanceQuery: '' // (可选) 传入查询字符串筛选掉部分课程, 提高检索速度
}

const keyMap = {
  /* table */
  choice: '选择',
  index: '序号',
  name: '课程',
  surplus: '课余量',
  credit: '学分',
  type: '考试类型',
  teacher: '上课教师',
  't&p': '时间地点',
  info: '选课限制说明',
  /* status */
  none: '无余量',
  chosen: '已选'
}

const URL = {
  _base: 'https://aa.bjtu.edu.cn/course_selection/courseselecttask/selects_action/?action=',
  _main: 'load',
  _submit: 'submit',
  _delete: 'delete',
  get main() {
    const suffix = '&iframe=school&page=1&perpage=1000'
    if (config.advanceQuery) {
      return this._base + config.advanceQuery + suffix
    } else {
      return this._base + this._main + suffix
    }
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
  if (string.indexOf(keyMap['chosen']) !== -1) return 1 // 已选中
  else if (string.indexOf(keyMap['none']) !== -1) return -1 // 无余量
  else return 0 // 未选中
}

const parse2Json = (text) => {
  const p = new DOMParser()
  const table = p.parseFromString(text, 'text/html')?.querySelector(config.tableSelector)
  return $(table).tableToJSON({
    ignoreHiddenRows: false,
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
  return fetch(url, { ...options })
    .then((res) => res.text())
    .then((text) => parse2Json(text))
    .catch((err) => {
      log('请求出错: ' + err)
    })
}

const matchName = async (table) => {
  for (const name of config.matchName) {
    for (const c of table) {
      const info = `[${c[keyMap['name']]} ${c[keyMap['teacher']]}] `
      if (c[keyMap['name']] === name) {
        log(info + '匹配成功')
        const status = c[keyMap['choice']].status
        if (status === 0) {
          log(info + '有余量, 发起抢课', 'warning')
          const f = new FormData()
          f.append('checkboxs', c[keyMap['choice']].id)
          req(URL.submit, {
            method: 'POST',
            body: f
          }).then(() => {
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
          log(info + '已抢到', 'error')
        }
      }
    }
  }
}

const start = () => {
  let count = 0
  setInterval(() => {
    req(URL.main)
      .then((table) => matchName(table))
      .then(() => {
        log(`已检索: ${++count}次`)
      })
  }, config.timeout)
}

const displayActualId = () => {
  const checkboxs = document.querySelectorAll('.checkbox')
  for (const c of checkboxs) {
    const span = document.createElement('span')
    span.innerHTML = c.value
    span.className = 'actual-id'
    c.after(span)
  }
}

const appendTriggerBtn = () => {
  const div = document.createElement('div')
  const span = document.createElement('span')
  const startBtn = document.createElement('button')
  startBtn.className = 'btn btn-mini btn-danger'
  startBtn.innerText = '开始抢课'
  startBtn.style = ' margin: 5px;'
  startBtn.onclick = start
  span.innerText = '待抢课程: ' + JSON.stringify(config.matchName)
  div.style = 'display: flex; justify-content: flex-end; align-items: center;'
  div.append(span, startBtn)
  document.querySelector('form')?.after(div)
}

const main = () => {
  if (config.matchName.length === 0) {
    alert('尚未配置 config.matchName 请配置后使用脚本')
    return
  }
  appendTriggerBtn()
  !config.showActualId || displayActualId()
}

main()
