// ==UserScript==
// @name         Snapshot Everything
// @namespace    https://github.com/ZiuChen
// @version      1.0.1
// @description  Take snapshot on any site for any DOM.
// @author       ZiuChen
// @homepage     https://github.com/ZiuChen
// @supportURL   https://github.com/ZiuChen/userscript/issues
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00IDRoM2wyLTJoNmwyIDJoM2EyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMm04IDNhNSA1IDAgMCAwLTUgNWE1IDUgMCAwIDAgNSA1YTUgNSAwIDAgMCA1LTVhNSA1IDAgMCAwLTUtNW0wIDJhMyAzIDAgMCAxIDMgM2EzIDMgMCAwIDEtMyAzYTMgMyAwIDAgMS0zLTNhMyAzIDAgMCAxIDMtMyIvPjwvc3ZnPg==
// @require      https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/snapshot-everything/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/snapshot-everything/index.user.js
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_info
// ==/UserScript==

const USERSCRIPT_NAME = GM_info.script.name

GM_registerMenuCommand('Take Snapshot', async () => {
  try {
    const element = await inspectElement()
    if (!element) {
      throw new Error('No element selected')
    }

    const blob = await snapshot(element)
    if (blob) {
      downloadBlob(blob, `SnapshotEverything_${new Date().toISOString().slice(0, 10)}.png`)
    }
  } catch (error) {
    GM_notification({
      title: `${USERSCRIPT_NAME} Error`,
      text: error.message,
      timeout: 3000
    })
    throw error
  }
})

async function inspectElement() {
  return new Promise((resolve, reject) => {
    try {
      const inspector = new DOMInspector({
        color: '#4b9bfa',
        borderWidth: '1px',
        showSize: true,
        onSelect: ({ element }) => {
          inspector.stop()
          resolve(element)
        }
      })

      // 开始检查
      inspector.start()
    } catch (error) {
      reject(error)
    }
  })
}

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

class DOMInspector {
  constructor(options = {}) {
    this.options = {
      color: '#f00',
      borderWidth: '2px',
      borderRadius: '4px',
      zIndex: 9999,
      showSize: true,
      ...options
    }

    this.currentElement = null
    this.overlay = null
    this.sizeInfo = null
    this.isInspecting = false

    this.init()
  }

  init() {
    this.createOverlay()
    this.createSizeInfo()
  }

  createOverlay() {
    this.overlay = document.createElement('div')
    Object.assign(this.overlay.style, {
      position: 'fixed',
      pointerEvents: 'none',
      border: `${this.options.borderWidth} solid ${this.options.color}`,
      borderRadius: this.options.borderRadius,
      backgroundColor: `${this.options.color}20`,
      zIndex: this.options.zIndex,
      display: 'none'
    })
    document.body.appendChild(this.overlay)
  }

  createSizeInfo() {
    if (!this.options.showSize) return

    this.sizeInfo = document.createElement('div')
    Object.assign(this.sizeInfo.style, {
      position: 'fixed',
      pointerEvents: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: this.options.zIndex + 1,
      display: 'none',
      fontFamily: 'monospace'
    })
    document.body.appendChild(this.sizeInfo)
  }

  start() {
    if (this.isInspecting) return
    this.isInspecting = true

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('click', this.handleClick, true)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  stop() {
    if (!this.isInspecting) return
    this.isInspecting = false

    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('click', this.handleClick, true)
    document.removeEventListener('keydown', this.handleKeyDown)

    this.overlay.style.display = 'none'
    if (this.sizeInfo) this.sizeInfo.style.display = 'none'
    this.currentElement = null
  }

  handleMouseMove = (e) => {
    const element = document.elementFromPoint(e.clientX, e.clientY)
    if (!element || element === this.currentElement) return

    this.currentElement = element
    this.highlightElement(element)
  }

  highlightElement(element) {
    const rect = element.getBoundingClientRect()

    // 设置高亮框位置和尺寸
    Object.assign(this.overlay.style, {
      display: 'block',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    })

    // 显示尺寸信息
    if (this.sizeInfo) {
      Object.assign(this.sizeInfo.style, {
        display: 'block',
        left: `${rect.left}px`,
        top: `${rect.top - 30}px`,
        content: `${rect.width} × ${rect.height}`
      })
      this.sizeInfo.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

    if (this.options.onSelect) {
      const selector = this.getElementSelector(this.currentElement)
      this.options.onSelect({
        element: this.currentElement,
        selector
      })
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.stop()
    }
  }

  getElementSelector(element) {
    if (!element || !element.tagName) return ''

    const path = []
    let current = element

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase()

      if (current.id) {
        selector += `#${current.id}`
        path.unshift(selector)
        break
      } else {
        let nth = 1
        let sibling = current.previousElementSibling

        while (sibling) {
          if (sibling.tagName === current.tagName) nth++
          sibling = sibling.previousElementSibling
        }

        if (nth !== 1) selector += `:nth-of-type(${nth})`
      }

      path.unshift(selector)
      current = current.parentElement
    }

    return path.join(' > ')
  }

  destroy() {
    this.stop()
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
    }
    if (this.sizeInfo && this.sizeInfo.parentNode) {
      this.sizeInfo.parentNode.removeChild(this.sizeInfo)
    }
  }
}
