import fetch from 'node-fetch'
import { notify, v2freeCookies, pushplusToken } from '@/node/utils'

async function checkIn(cookie: string) {
  const url = 'https://w1.v2free.net/user/checkin'
  return fetch(url, {
    method: 'POST',
    headers: { cookie }
  }).then((res) => res.json() as Promise<{ msg?: string }>)
}

export async function v2freeCheckin() {
  const msgList = []

  if (!v2freeCookies) return

  for (const c of v2freeCookies) {
    const checkInRes = await checkIn(c)
    msgList.push({
      message: checkInRes?.msg
    })
  }

  const message = msgList.map((item) => `v2free 签到结果: ${item.message}`).join('\n')

  console.log(message)

  await notify({
    token: pushplusToken || '',
    title: 'v2free 签到',
    content: message
  })
}
