/**
 * @name index.js
 * @author ZiuChen
 * @version 0.0.1
 * @Licence MIT
 */

const fetch = require("node-fetch")
const FormData = require("form-data")
const PushPlus = require("../lib/PushPlus")
const { cookie: DailyReportCookie, data } = require("./config")
const url = "https://newweixin.bjtu.edu.cn/ncov/wap/default/save"

const dateFormat = (fmt) => {
  const d = new Date()
  const opt = {
    "Y+": d.getFullYear().toString(),
    "M+": (d.getMonth() + 1).toString(),
    "D+": d.getDate().toString(),
    "H+": d.getHours().toString(),
    "m+": d.getMinutes().toString(),
    "S+": d.getSeconds().toString()
  }
  let ret
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"))
    }
  }
  return fmt
}

const obj2FormData = (data) => {
  const form = new FormData()
  for (const key in data) {
    form.append(key, data[key])
  }
  return form
}

const preProcess = (data) => {
  data.date = dateFormat("YYYYMMDD")
  return obj2FormData(data)
}

const main = () => {
  if (!DailyReportCookie) {
    console.log("环境变量DailyReportCookie未定义")
    return false
  }
  return fetch(url, {
    method: "POST",
    headers: {
      Cookie: DailyReportCookie
    },
    body: preProcess(data)
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      return PushPlus({
        title: "已执行每日上报",
        content: json.m
      })
    })
}

exports.main_handler = async () => {
  return await main()
}
