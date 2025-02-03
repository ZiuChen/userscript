// ==UserScript==
// @name         Lock Screen
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Locks given websites.
// @author       Sarfraz, ZiuChen
// @homepage     https://github.com/ZiuChen
// @supportURL   https://github.com/ZiuChen/userscript/issues
// @run-at       document-start
// @require      https://registry.npmmirror.com/jquery/3.7.1/files/dist/jquery.min.js
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/lock-screen/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/lock-screen/index.user.js
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNzQ3ZDhjIiBkPSJNMjAuNSAxM2EyLjUgMi41IDAgMCAxIDIuNSAyLjV2LjVhMSAxIDAgMCAxIDEgMXY0YTEgMSAwIDAgMS0xIDFoLTVhMSAxIDAgMCAxLTEtMXYtNGExIDEgMCAwIDEgMS0xdi0uNWEyLjUgMi41IDAgMCAxIDIuNS0yLjVtMCAxYTEuNSAxLjUgMCAwIDAtMS41IDEuNXYuNWgzdi0uNWExLjUgMS41IDAgMCAwLTEuNS0xLjVNMjAgNEgydjEyaDEzdjJoLTJ2MmgydjJIN3YtMmgydi0ySDJhMiAyIDAgMCAxLTItMlY0YzAtMS4xMS44OS0yIDItMmgxOGEyIDIgMCAwIDEgMiAydjcuNTNjLS41OS0uMzQtMS4yNy0uNTMtMi0uNTN6Ii8+PC9zdmc+
// ==/UserScript==

'use strict'

const CSS_CODE = /* css */ `.userscript-lock-screen__mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}

.userscript-lock-screen__input {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 150px;
  height: 30px;
  font-size: 20px;
  border: none;
  outline: none;
  background: transparent;
}

@media (prefers-color-scheme: light) {
  .userscript-lock-screen__mask {
    background: #f5f5f5;
  }

  .userscript-lock-screen__input {
    color: #141414;
  }
}

@media (prefers-color-scheme: dark) {
  .userscript-lock-screen__mask {
    background: #141414;
  }

  .userscript-lock-screen__input {
    color: #f5f5f5;
  }
}`

const TIMEOUT = 0.5 // minutes
const PIN = localStorage.getItem('userscript-lock-screen/pwd')
let idleTimer = null

if (!PIN) {
  const result = prompt('Enter Password')
  if (!result) {
    alert('Password cannot be empty')
    return
  }

  localStorage.setItem('userscript-lock-screen/pwd', result)
  location.reload()
}

insertCSS(CSS_CODE)
hide()
setupInterval()

$('*').bind(
  'mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick',
  () => {
    clearInterval(idleTimer)
    setupInterval()
  }
)

function setupInterval() {
  idleTimer = setInterval(hide, TIMEOUT * 60000)
}

function hide() {
  const container = document.createElement('div')
  container.className = 'userscript-lock-screen__mask'
  document.body.appendChild(container)

  const form = document.createElement('form')
  form.className = 'userscript-lock-screen__form'
  const input = document.createElement('input')
  input.type = 'password'
  input.className = 'userscript-lock-screen__input'
  input.autocomplete = 'off'
  form.appendChild(input)
  container.appendChild(form)

  input.oninput = function () {
    if (input.value === PIN) {
      document.body.removeChild(container)
    }
  }
}

function insertCSS(code) {
  const style = document.createElement('style')
  style.textContent = code
  document.head.appendChild(style)
}
