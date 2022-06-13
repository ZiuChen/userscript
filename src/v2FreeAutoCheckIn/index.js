/**
 * @name v2FreeAutoCheckIn.js
 * @author ZiuChen
 * @version 0.3
 * @Licence MIT
 */

const fetch = require("node-fetch")
const PushPlus = require("./lib/PushPlus")
const v2freeCookie = process.env["v2freeCookie"]
const v2freeURL = "https://w1.v2free.net/user/checkin"

const CheckIn = async () => {
  if (!v2freeCookie) {
    console.log("环境变量v2freeCookie未定义")
    return false
  }
  return fetch(v2freeURL, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      cookie: v2freeCookie
    }
  })
    .then((res) => res.json())
    .then((json) => {
      const result = `v2free已签到: ${json.msg}`
      console.log(result)
      return PushPlus({
        title: "v2free已签到",
        content: result
      })
    })
    .catch((err) => console.log(err))
}

exports.main_handler = async () => {
  return await CheckIn()
}
