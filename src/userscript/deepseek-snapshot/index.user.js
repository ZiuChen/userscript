// ==UserScript==
// @name         Deepseek Snapshot
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Take snapshot for chat history on Deepseek.
// @author       ZiuChen
// @match        https://chat.deepseek.com/*
// @icon         https://favicon.im/deepseek.com
// @require      https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/deepseek-snapshot/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/deepseek-snapshot/index.user.js
// @grant        GM_registerMenuCommand
// ==/UserScript==

GM_registerMenuCommand('Copy to clipboard', async () => {
  const chat = document.querySelector('.dad65929')
  if (!chat) {
    console.error('Chat element not found')
    return
  }

  const blob = await snapshot(chat)
  copyImageToClipboard(blob)
})

GM_registerMenuCommand('Download to file', async () => {
  const chat = document.querySelector('.dad65929')
  if (!chat) {
    console.error('Chat element not found')
    return
  }

  const blob = await snapshot(chat)
  const filename = `deepseek_snapshot_${new Date().toISOString().slice(0, 10)}.png`
  downloadBlob(blob, filename)
})

async function snapshot(dom) {
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  const canvas = await html2canvas(dom, {
    scale: 3,
    backgroundColor: preferredTheme === 'dark' ? '#000' : '#fff',
    useCORS: true,
    logging: false
  })

  if (!canvas) {
    console.error('Failed to create canvas')
    return
  }

  const toBlob = async (canvas) => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    })
  }

  // Convert canvas to blob
  const blob = await toBlob(canvas)
  if (!blob) {
    console.error('Failed to convert canvas to blob')
    return
  }

  return blob
}

function copyImageToClipboard(blob) {
  const item = new ClipboardItem({
    'image/png': blob
  })

  navigator.clipboard.write([item]).then(
    () => {
      console.log('Image copied to clipboard')
    },
    (error) => {
      console.error('Failed to copy image to clipboard:', error)
    }
  )
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 100)
}
