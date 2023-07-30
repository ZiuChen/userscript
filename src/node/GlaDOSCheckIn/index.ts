import fetch from 'node-fetch'
import puppeteer, { Browser } from 'puppeteer'
import {
  notify,
  gladosCookies,
  pushplusToken,
  parseCookieString,
  hideEmail,
  sleep,
  puppeteerExecutablePath
} from '@/node/utils'

let browser = null as null | Browser

async function checkIn(cookie: string) {
  console.log('puppeteer', puppeteerExecutablePath)

  if (!browser)
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      executablePath: puppeteerExecutablePath
    })

  const page = await browser.newPage()
  const cookieArr = parseCookieString(cookie)

  await page.setCookie(...cookieArr)
  await page.goto('https://glados.rocks/console/checkin')
  await page.waitForSelector('.ui.positive.button')
  await page.click('.ui.positive.button')

  await sleep(5 * 1000) // 等待签到完毕

  const elementHandle = await page.waitForSelector('.message > .content')
  const text = await page.evaluate((element) => {
    element?.querySelector('.header')?.remove() // 将 .header 移除 保留签到结果
    return element?.textContent
  }, elementHandle)

  return { message: text }
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

export async function gladosCheckin() {
  const msgList = [] as { email: string; leftDay: number; message: string }[]

  if (!gladosCookies) return

  // 并发请求
  await Promise.all(
    gladosCookies.map(async (c: string) => {
      const checkInRes = await checkIn(c)
      const statusRes = await status(c)
      const infoRes = await info(c)

      msgList.push({
        email: hideEmail(infoRes?.data?.userInfo?.email, 4),
        leftDay: parseInt(statusRes?.data?.leftDays.toString()),
        message: checkInRes?.message || ''
      })
    })
  )

  if (browser) {
    await browser.close()
  }

  const message =
    'GlaDOS 签到结果: \n' +
    msgList
      .map((item) => `邮箱: ${item.email}, 签到结果: ${item.message}, 剩余天数: ${item.leftDay}`)
      .join('\n')

  await notify({
    token: pushplusToken || '',
    title: 'GLaDOS 签到',
    content: message
  })

  return message
}
