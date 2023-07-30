const { gladosCheckin, ikuuuCheckin, v2freeCheckin } = require('./checkin.cjs.js')

exports.main_handler = async () => {
  const res = await Promise.allSettled([gladosCheckin(), v2freeCheckin(), ikuuuCheckin()])
  console.log(res)
}
