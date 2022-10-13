require('dotenv').config()
const { main_handler: v2Free } = require('./src/v2FreeAutoCheckIn')
const { main_handler: iKuuu } = require('./src/iKuuuCheckIn')

exports.main_handler = async () => {
  await v2Free()
  await iKuuu()
}
