const v2Free = require("./v2FreeAutoCheckIn")
const iKuuu = require("./iKuuuCheckIn")

exports.main_handler = async () => {
  await v2Free
  await iKuuu
}
