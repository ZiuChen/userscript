import fetch from 'node-fetch'
import { notify, iKuuuCookies, pushplusToken } from '@/node/utils'

async function checkIn(cookie: string) {
  const url = 'https://ikuuu.eu/user/checkin'
  return fetch(url, {
    method: 'POST',
    headers: { cookie }
  }).then((res) => res.json() as Promise<{ msg: string }>)
}

export async function ikuuuCheckin() {
  const msgList = []

  if (!iKuuuCookies) return

  for (const c of iKuuuCookies) {
    const checkInRes = await checkIn(c)
    msgList.push({
      message: checkInRes?.msg
    })
  }

  const message = msgList.map((item) => `iKuuu 签到结果: ${item.message}`).join('\n')

  console.log(message)

  await notify({
    token: pushplusToken || '',
    title: 'iKuuu 签到',
    content: message
  })
}
