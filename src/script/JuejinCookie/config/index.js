require('dotenv').config()

module.exports = {
  juejin: {
    login: 'https://juejin.cn/login',
    loginApi: '/passport/web/user/login',
    verifyApi: 'verify.snssdk.com/captcha/verify'
  },
  users: process.env.USERS_INFO
}
