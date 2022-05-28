/**
 * @name v2FreeAutoCheckIn.js
 * @author ZiuChen
 * @Licence MIT
 */

const fetch = require("node-fetch") // 高版本node-fetch只支持import导入
const PushPlusToken = process.env["PushPlusToken"]
const v2freeCookie = process.env["v2freeCookie"]
const PushPlusURL = "http://www.pushplus.plus/send"
const v2fresURL = "https://w1.v2free.net/user/checkin"

async function pushPlus(data) {
  return await fetch(PushPlusURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

async function checkIn() {
  if (!PushPlusToken || !v2freeCookie) return "环境变量未定义"
  return await fetch(v2fresURL, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      cookie: v2freeCookie
    }
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      return pushPlus({
        token: PushPlusToken,
        title: "v2free已签到",
        content: json
      })
    })
    .catch((err) => console.log(err))
}

exports.main = async function remind() {
  return await checkIn()
}
