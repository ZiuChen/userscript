const config = require('./src/config')
const { getCookie } = require('./src/cookie')

const main = async () => {
  const users = []
  const cookies = []
  // 从环境变量中读取`USERS_INFO`
  try {
    users.push(...JSON.parse(config.users))
  } catch (error) {
    console.log('请检查`USERS_INFO`格式是否正确')
    return
  }
  // 遍历获取Cookie并存入`cookies`
  for (const [index, user] of users.entries()) {
    const name = `COOKIE_${index + 1}`
    const cookie = await getCookie(user.mobile, user.password)
    cookies.push({
      [name]: cookie
    })
  }
  console.log(cookies)
}

main()
