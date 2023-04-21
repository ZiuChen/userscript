import fetch from 'node-fetch'
import { notify } from '@/node/utils'
import { checkinData } from './config'
import { dateFormat, obj2FormData } from './utils'

function processData(data: any) {
  data.date = dateFormat('YYYYMMDD')
  return obj2FormData(data)
}

export async function main() {
  const cookie = process.env['DailyReportCookie'] || ''

  return fetch('https://newweixin.bjtu.edu.cn/ncov/wap/default/save', {
    method: 'POST',
    headers: {
      Cookie: cookie
    },
    body: processData(checkinData)
  })
    .then((res) => res.json())
    .then(({ e, m, d }) => {
      const result = `已执行每日上报: [${e}] ${m} ${JSON.stringify(d)}`
      console.log(result)
      return notify({
        token: process.env['PushPlusToken'] || '',
        title: '已执行每日上报',
        content: result
      })
    })
}
