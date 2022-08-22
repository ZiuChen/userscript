/**
 * @name iKuuuCheckIn.js
 * @author ZiuChen
 * @version 0.2
 * @Licence MIT
 */

const fetch = require("node-fetch")
const PushPlus = require("../lib/PushPlus")
const iKuuuCookie = process.env["iKuuuCookie"]
const iKuuuURL = "https://ikuuu.dev/user/checkin"

const CheckIn = async () => {
  if (!iKuuuCookie) {
    console.log("环境变量iKuuuCookie未定义")
    return false
  }
  return fetch(iKuuuURL, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      cookie: iKuuuCookie
    }
  })
    .then((res) => res.json())
    .then((json) => {
      const result = `iKuuu已签到: ${json.msg}`
      console.log(result)
      return PushPlus({
        title: "iKuuu已签到",
        content: result
      })
    })
    .catch((err) => console.log(err))
}

exports.main_handler = async () => {
  return CheckIn()
}
