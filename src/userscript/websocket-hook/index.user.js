// ==UserScript==
// @name         Websocket Hook
// @namespace    https://github.com/ZiuChen
// @version      1.0.0
// @description  Hook all Websocket message and log them to a global array for debugging or analysis.
// @author       ZiuChen
// @homepage     https://github.com/ZiuChen
// @supportURL   https://github.com/ZiuChen/userscript/issues
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMSA1SDhsNC00bDQgNGgtM3Y0LjQzYy0uNzUuNDYtMS40MiAxLjAzLTIgMS42OXptMTEgNmwtNC00djNhNi43NDcgNi43NDcgMCAwIDAtNyA2LjE3QTMuMDA2IDMuMDA2IDAgMCAwIDkuMTcgMjBBMy4wMDYgMy4wMDYgMCAwIDAgMTMgMjEuODNBMy4wMSAzLjAxIDAgMCAwIDE0LjgzIDE4Yy0uMy0uODYtLjk4LTEuNTMtMS44My0xLjgzYy40Ny00IDQuNDctNC4yIDQuOTUtNC4ydjN6bS0xMS4zNy41OUE3LjYzIDcuNjMgMCAwIDAgNiAxMFY3bC00IDRsNCA0di0zYzEuMzQuMDMgMi42My41IDMuNjQgMS40Yy4yNS0uNjQuNTgtMS4yNS45OS0xLjgxIi8+PC9zdmc+
// @grant        unsafeWindow
// @run-at       document-start
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/websocket-hook/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/websocket-hook/index.user.js
// ==/UserScript==

// 日志默认关闭，设置为 true 可开启调试输出
const LOG_ENABLED = false

// 初始化消息记录数组
const messages = []

// 将消息记录数组挂载到 unsafeWindow，方便外部访问
unsafeWindow.__ws_messages = unsafeWindow.__ws_messages || messages

/** 保存原始 WebSocket */
const OriginalWebSocket = unsafeWindow.WebSocket

// 用于存储原始 listener -> 包装 listener 的映射，方便 removeEventListener
const listenerMap = new WeakMap()

/**
 * 复制静态属性从源构造函数到目标构造函数
 * @param {Function} targetCtor - 目标构造函数
 * @param {Function} sourceCtor - 源构造函数
 */
function copyStaticProps(targetCtor, sourceCtor) {
  ;['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach((k) => {
    if (k in sourceCtor)
      try {
        targetCtor[k] = sourceCtor[k]
      } catch (e) {}
  })
}

/**
 * 将数据转换为字符串表示形式
 * 尽量安全，不做异步读取 Blob
 * @param {any} data - 要转换的数据
 * @returns {string} - 数据的字符串表示形式
 */
function dataToString(data) {
  try {
    if (typeof data === 'string') return data
    if (data === null || data === undefined) return String(data)
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data)
      let binary = ''
      const chunkSize = 0x8000
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize))
      }
      return 'ArrayBuffer(base64):' + btoa(binary)
    }
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
      return `[Blob: size=${data.size} type=${data.type}]`
    }
    if (typeof data === 'object') {
      try {
        return JSON.stringify(data)
      } catch (e) {
        return Object.prototype.toString.call(data)
      }
    }
    return String(data)
  } catch (e) {
    try {
      return String(data)
    } catch (e2) {
      return '[unserializable]'
    }
  }
}

/**
 * 新的 WebSocket 构造函数
 * @param {string} url - WebSocket 连接的 URL
 * @param {string|string[]} [protocols] - 可选的子协议
 * @returns 原始 WebSocket 的 Proxy
 */
function HookedWebSocket(url, protocols) {
  const realWs =
    protocols === undefined ? new OriginalWebSocket(url) : new OriginalWebSocket(url, protocols)

  const handler = {
    get(target, prop, receiver) {
      // 拦截 send 方法
      if (prop === 'send') {
        const originalSend = realWs.send.bind(realWs)
        return function (data) {
          // 累积到单个全局数组
          messages.push({
            type: 'sent',
            url: url,
            data,
            ts: Date.now()
          })
          if (LOG_ENABLED) console.debug('[WS Hook] send ->', url, data)
          return originalSend(data)
        }
      }

      // 拦截 addEventListener，以便拦截 'message' 事件 listener
      if (prop === 'addEventListener') {
        return function (type, listener, options) {
          if (type === 'message' && typeof listener === 'function') {
            const wrapped = function (event) {
              messages.push({
                type: 'recv',
                url: url,
                data: event.data,
                ts: Date.now()
              })
              if (LOG_ENABLED) console.debug('[WS Hook] recv <-', url, event.data)
              return listener.call(this, event)
            }
            listenerMap.set(listener, wrapped)
            return realWs.addEventListener.call(realWs, type, wrapped, options)
          } else {
            return realWs.addEventListener.call(realWs, type, listener, options)
          }
        }
      }

      // 拦截 removeEventListener，使用映射找到包装函数
      if (prop === 'removeEventListener') {
        return function (type, listener, options) {
          const wrapped = listenerMap.get(listener) || listener
          return realWs.removeEventListener.call(realWs, type, wrapped, options)
        }
      }

      // 拦截 onmessage 属性的读取与返回
      if (prop === 'onmessage') {
        return realWs.onmessage
      }

      // 对函数类型的属性，保证 this 绑定到真实 WebSocket 上
      const value = realWs[prop]
      if (typeof value === 'function') {
        return value.bind(realWs)
      }
      return value
    },

    set(target, prop, value, receiver) {
      // 当设置 onmessage handler 时，用包装函数包一层以便拦截接收消息
      if (prop === 'onmessage' && typeof value === 'function') {
        const wrapped = function (event) {
          messages.push({
            type: 'recv',
            url: url,
            data: event.data,
            ts: Date.now()
          })
          if (LOG_ENABLED) console.debug('[WS Hook] onmessage <-', url, event.data)
          return value.call(this, event)
        }
        listenerMap.set(value, wrapped)
        realWs.onmessage = wrapped
        return true
      }
      try {
        realWs[prop] = value
        return true
      } catch (e) {
        return false
      }
    },

    has(target, prop) {
      return prop in realWs
    },
    getOwnPropertyDescriptor(target, prop) {
      const desc = Object.getOwnPropertyDescriptor(realWs, prop)
      if (desc) return desc
      return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(realWs), prop)
    }
  }

  return new Proxy(realWs, handler)
}

try {
  HookedWebSocket.prototype = OriginalWebSocket.prototype
  copyStaticProps(HookedWebSocket, OriginalWebSocket)

  unsafeWindow.WebSocket = HookedWebSocket
  console.debug('[WS Hook] WebSocket hooked')
} catch (e) {
  console.error('[WS Hook] failed to install hook', e)
}
