const v2Free = require("./src/v2FreeAutoCheckIn")
const iKuuu = require("./src/iKuuuCheckIn")

exports.main_handler = async () => {
  await v2Free
  await iKuuu
}
