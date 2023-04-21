const config = require('./config')
const { getBrowser, closeBrowser } = require('./browser')
const { calcGapPosition } = require('./utils')

const formatCookie = (cookies) => {
  const cookieItems = []
  for (let item of cookies) {
    cookieItems.push(item.name + '=' + item.value)
  }
  return cookieItems.join(';')
}

const getCookie = async (mobile, password) => {
  try {
    const browser = await getBrowser()
    const page = await browser.newPage()
    await page.goto(config.juejin.login)
    await page.waitForTimeout(1000)
    await page.waitForSelector('.clickable')
    await page.click('.clickable')
    await page.waitForTimeout(1000)
    await page.waitForSelector('input[name=loginPhoneOrEmail]')
    console.log('--------------------')
    console.log(`输入账号 ${mobile}`)
    await page.type('input[name=loginPhoneOrEmail]', mobile, { delay: 50 })
    console.log(`输入密码 ****`)
    await page.type('input[name=loginPassword]', password, { delay: 50 })
    await page.waitForTimeout(1000)
    await page.click('.btn')
    console.log(`开始登录`)
    await page.waitForSelector('#captcha-verify-image')
    await page.waitForTimeout(1000)
    let slideNum = 10 //最多尝试10次滑块验证
    let slideStatus = false
    let loginStatus = false
    let loginRes = null
    while (slideNum > 0 && slideStatus == false) {
      console.log(`开始第${10 - slideNum + 1}次验证`)
      const imageSrc = await page.$eval('#captcha-verify-image', (el) => el.src)
      const distance = await calcGapPosition(page, imageSrc)
      await page.hover('.secsdk-captcha-drag-icon')
      let ele = await page.$('.secsdk-captcha-drag-icon')
      let gapEle = await page.$('.captcha_verify_img_slide')
      let gapBlock = await gapEle.boundingBox()
      let block = await ele.boundingBox()
      await page.mouse.down()
      await page.mouse.move(
        gapBlock.x + distance + gapBlock.width - block.width / 2 - 5,
        block.y + block.y / 2,
        { steps: 50 }
      )
      await page.mouse.up()
      let verifyRes = await page.waitForResponse(
        (response) => response.url().includes(config.juejin.verifyApi) && response.status() === 200
      )
      let jsonRes = await verifyRes.json()
      if (jsonRes.code == 200) {
        // 验证通过
        slideStatus = true
        console.log('验证成功,登录中...')
        loginRes = await page.waitForResponse(
          (response) => response.url().includes(config.juejin.loginApi) && response.status() === 200
        )
        try {
          jsonRes = await loginRes.json()
          if (jsonRes.message && jsonRes.message == 'error') {
            console.log(jsonRes)
            console.log(`掘金登录失败[0]`)
          } else {
            loginRes = jsonRes.data || {}
            loginStatus = true
          }
        } catch (err) {
          console.log(err)
          console.log(`登录出错`)
        }
      } else {
        await page.waitForTimeout(5 * 1000)
        await page.$('.secsdk_captcha_refresh--text')
      }
      slideNum--
    }
    if (!loginStatus) {
      console.log(`掘金登录失败[1]`)
      return false
    }
    console.log(`登录成功`)
    console.log('--------------------')
    await page.waitForTimeout(2 * 1000)
    const cookie = await page.cookies()
    const cookieStr = formatCookie(cookie)
    await closeBrowser()
    return cookieStr
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCookie,
  formatCookie
}
