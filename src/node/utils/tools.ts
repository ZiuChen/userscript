import fetch from 'node-fetch'

/**
 * 推送渠道
 */
export type PushPlusChannel = 'wechat' | 'webhook' | 'cp' | 'mail' | 'sms'

/**
 * 推送模板
 */
export type PushPlusTemplate =
  | 'html'
  | 'txt'
  | 'json'
  | 'markdown'
  | 'cloudMonitor'
  | 'jenkins'
  | 'route'
  | 'pay'

/**
 * 推送消息参数
 */
export interface PushPlusParams {
  /**
   * 用户令牌，可直接加到请求地址后，如：http://www.pushplus.plus/send/{token}
   */
  token: string
  /**
   * 消息标题
   */
  title?: string
  /**
   * 具体消息内容，根据不同template支持不同格式
   */
  content: string
  /**
   * 群组编码，不填仅发送给自己；channel为webhook时无效
   */
  topic?: string
  /**
   * 发送模板
   */
  template?: PushPlusTemplate
  /**
   * 发送渠道
   */
  channel?: PushPlusChannel
  /**
   * webhook编码
   */
  webhook?: string
  /**
   * 发送结果回调地址
   */
  callbackUrl?: string
  /**
   * 毫秒时间戳。格式如：1632993318000。服务器时间戳大于此时间戳，则消息不会发送
   */
  timestamp?: number
  /**
   * 好友令牌，微信公众号渠道填写好友令牌，企业微信渠道填写企业微信用户id
   */
  to?: string
}

export async function notify(params: PushPlusParams) {
  if (!params?.token || !params?.content) {
    return Promise.reject('PushPlus推送失败: 参数缺失')
  }

  params.content += `\n${new Date().getTime()}`

  return Promise.all([
    fetch('http://www.pushplus.plus/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...params })
    })
      .then(
        (res) =>
          res.json() as Promise<{
            code: number
            msg: string
            data: string
          }>
      )
      .then((json) => {
        const result = `PushPlus推送结果: [${json?.code}] ${json?.msg}, 消息流水号: ${json?.data}`
        console.log(result)
        return result
      })
  ]).catch((err) => console.log(err))
}
