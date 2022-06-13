const fetch = require("node-fetch")
const PushPlusToken = process.env["PushPlusToken"] ?? console.log("环境变量PushPlusToken未定义")
const PushPlusURL = "http://www.pushplus.plus/send"
module.exports = async function pushPlus({
  token = PushPlusToken,
  title,
  content,
  topic,
  template,
  channel,
  webhook,
  callbackUrl,
  timestamp
}) {
  return fetch(PushPlusURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      title,
      content,
      topic,
      template,
      channel,
      webhook,
      callbackUrl,
      timestamp
    })
  })
    .then((res) => res.json())
    .then((json) => {
      const result = `PushPlus推送结果: [${json?.code}] ${json?.msg}, 消息流水号: ${json?.data}`
      console.log(result)
      return result
    })
    .catch((err) => console.log(err))
}
