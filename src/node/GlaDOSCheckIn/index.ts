import fetch from 'node-fetch'
import { notify, gladosCookies, pushplusToken } from '@/node/utils'

async function checkIn(cookie: string) {
  const url = 'https://glados.rocks/api/user/checkin'
  return fetch(url, {
    method: 'POST',
    headers: {
      cookie,
      origin: 'https://glados.rocks',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      'content-type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      token: 'glados.network'
    })
  }).then((res) => res.json() as Promise<{ message: string }>)
}

async function status(cookie: string) {
  const url = 'https://glados.rocks/api/user/status'
  return fetch(url, {
    method: 'GET',
    headers: { cookie }
  }).then((res) => res.json() as Promise<{ data: { leftDays: number } }>)
}

async function info(cookie: string) {
  const url = 'https://glados.rocks/api/user/info'
  return fetch(url, {
    method: 'GET',
    headers: {
      cookie
    }
  }).then((res) => res.json() as Promise<{ data: { userInfo: { email: string } } }>)
}

/**
 * 保留前num位邮箱地址
 */
function hideEmail(email: string, num: number) {
  const atIndex = email.indexOf('@')
  const prefix = email.slice(0, atIndex)
  const maskedPrefix = prefix.slice(0, num).padEnd(prefix.length, '*')
  const suffix = email.slice(atIndex)
  return maskedPrefix + suffix
}

export async function gladosCheckin() {
  const msgList = []

  if (!gladosCookies) return

  for (const c of gladosCookies) {
    const checkInRes = await checkIn(c)
    const statusRes = await status(c)
    const infoRes = await info(c)

    msgList.push({
      email: hideEmail(infoRes?.data?.userInfo?.email, 4),
      leftDay: parseInt(statusRes?.data?.leftDays.toString()),
      message: checkInRes?.message
    })
  }

  const message =
    'GlaDOS 签到结果: \n' +
    msgList
      .map((item) => `邮箱: ${item.email}, 签到结果: ${item.message}, 剩余天数: ${item.leftDay}`)
      .join('\n')

  console.log(message)

  await notify({
    token: pushplusToken || '',
    title: 'GLaDOS 签到',
    content: message
  })
}
