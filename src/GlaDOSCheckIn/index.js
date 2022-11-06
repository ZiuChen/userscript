/**
 * @name GlaDOSCheckIn.js
 * @author ZiuChen
 * @version 0.0.1
 * @Licence MIT
 */

const fetch = require('node-fetch')
const PushPlus = require('../lib/PushPlus')
const GlaDOSCookie = process.env['GlaDOSCookie']

const checkIn = async () => {
  const url = 'https://glados.rocks/api/user/checkin'
  if (!GlaDOSCookie) {
    console.log('环境变量GLADOSCookie未定义')
    return false
  }
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      cookie: GlaDOSCookie,
      origin: 'https://glados.rocks',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      'content-type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      token: 'glados.network'
    })
  }).then((res) => res.json())
}

const status = async () => {
  const url = 'https://glados.rocks/api/user/status'
  return fetch(url, {
    method: 'GET',
    headers: {
      cookie: GlaDOSCookie
    }
  })
}

const CheckIn = async () => {
  let checkInMessage = ''
  let leftDays = 0
  await checkIn().then((json) => {
    checkInMessage = json?.message
  })
  await status()
    .then((res) => res.json())
    .then((json) => {
      leftDays = parseInt(json?.data?.leftDays)
    })
  console.log(leftDays, checkInMessage)
  await PushPlus({
    title: 'GLaDOS签到',
    content: `签到结果: ${checkInMessage}, 剩余天数: ${leftDays}`
  })
}

exports.main_handler = async () => {
  return CheckIn()
}
