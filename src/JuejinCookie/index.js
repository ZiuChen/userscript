const config = require('./src/config')
const { getCookie } = require('./src/cookie')
const { delay, randInt } = require('./src/utils')
const fs = require('fs')

const main = async () => {
  const users = []
  const cookies = {}
  // 从环境变量中读取`USERS_INFO`
  try {
    users.push(...JSON.parse(config.users))
  } catch (error) {
    console.log('请检查`USERS_INFO`格式是否正确')
    return
  }
  console.log(`共有${users.length}个账号`)
  // 遍历获取Cookie并存入`cookies`
  for (const [index, user] of users.entries()) {
    console.log(`第${index + 1}个账号`)
    await delay(randInt(0, 10) * 1000) // 10s 随机延迟
    const cookie = await getCookie(user.mobile, user.password)
    cookies[`COOKIE_${index + 1}`] = cookie
  }
  console.log(cookies)
  await fs.writeFileSync('data.txt', JSON.stringify(cookies), (err) => {
    if (err) console.log(err)
  })
}

main()
