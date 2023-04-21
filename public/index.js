const { gladosCheckin, ikuuuCheckin, v2freeCheckin } = require('./checkin.cjs.js')

exports.main_handler = async () => {
  await Promise.allSettled([gladosCheckin(), v2freeCheckin(), ikuuuCheckin()]).then((results) => {
    console.log(results)
  })
}
