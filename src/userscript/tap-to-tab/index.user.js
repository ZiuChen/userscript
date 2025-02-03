// ==UserScript==
// @name         Tap to Tab
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Tap to Tab on Tampermonkey!
// @author       ZiuChen
// @homepage     https://github.com/ZiuChen
// @supportURL   https://github.com/ZiuChen/userscript/issues
// @match        *://*/*
// @run-at       document-start
// @grant        GM_openInTab
// @grant        GM_addStyle
// @grant        unsafeWindow
// @updateURL    https://jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/tap-to-tab/index.user.js
// @downloadURL  https://jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/tap-to-tab/index.user.js
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xMS41IDExbDYuMzggNS4zN2wtLjg4LjE4bC0uNjQuMTJjLS42My4xMy0uOTkuODMtLjcxIDEuNGwuMjcuNThsMS4zNiAyLjk0bC0xLjQyLjY2bC0xLjM2LTIuOTNsLS4yNi0uNThhLjk4NS45ODUgMCAwIDAtMS41Mi0uMzZsLS41MS40bC0uNzEuNTd6bS0uNzQtMi4zMWEuNzYuNzYgMCAwIDAtLjc2Ljc2VjIwLjljMCAuNDIuMzQuNzYuNzYuNzZjLjE5IDAgLjM1LS4wNi40OC0uMTZsMS45MS0xLjU1bDEuNjYgMy42MmMuMTMuMjcuNC40My42OS40M2MuMTEgMCAuMjIgMCAuMzMtLjA4bDIuNzYtMS4yOGMuMzgtLjE4LjU2LS42NC4zNi0xLjAxTDE3LjI4IDE4bDIuNDEtLjQ1YS45LjkgMCAwIDAgLjQzLS4yNmMuMjctLjMyLjIzLS43OS0uMTItMS4wOGwtOC43NC03LjM1bC0uMDEuMDFhLjc2Ljc2IDAgMCAwLS40OS0uMThNMTUgMTBWOGg1djJ6bS0xLjE3LTUuMjRsMi44My0yLjgzbDEuNDEgMS40MWwtMi44MyAyLjgzek0xMCAwaDJ2NWgtMnpNMy45MyAxNC42NmwyLjgzLTIuODNsMS40MSAxLjQxbC0yLjgzIDIuODN6bTAtMTEuMzJsMS40MS0xLjQxbDIuODMgMi44M2wtMS40MSAxLjQxek03IDEwSDJWOGg1eiIvPjwvc3ZnPg==
// ==/UserScript==

'use strict'

let pending
let lastNode
let skipOver
let delay = 300

unsafeWindow.addEventListener(
  'beforeunload',
  () => {
    if (pending) {
      clearTimeout(pending)
      pending = null
    }
  },
  false
)

function scheduleClick(e) {
  let n = e.target
  let props = {
    clientX: e.clientX,
    clientY: e.clientY,
    screenX: e.screenX,
    screenY: e.screenY,
    view: e.view,
    bubbles: true,
    cancelable: true
  }
  pending = setTimeout(() => {
    pending = null
    skipOver = n
    n.dispatchEvent(new MouseEvent('click', props))
  }, delay)
}

function stopEvent(e) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
}

unsafeWindow.addEventListener(
  'click',
  (e) => {
    if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || e.button !== 0) return

    let n = e.target

    if (n && skipOver === n) {
      //skip over our own dispatch
      skipOver = null
      return
    }

    for (let i = 4; i >= 0 && n && !n.href; i--) {
      n = n.parentNode
    }
    if (!n) return

    let last = lastNode
    lastNode = n
    let good =
      e.isTrusted &&
      n.href &&
      /^(https?|ftps?|file):/i.test(n.href) &&
      n.getAttribute('href') !== '#'
    //&& (n.getAttribute("target") !== "_self");

    if (pending) {
      if (n === last) {
        clearTimeout(pending)
        pending = null
        GM_openInTab(n.href, { active: false })
        stopEvent(e)

        if (n.style.animationName === 'bang') {
          n.style.animation = 'bong 1.3s ease-in'
        } else {
          n.style.animation = 'bang 1.3s ease-in'
        }
      } else if (good) {
        clearTimeout(pending)
        scheduleClick(e)
        stopEvent(e)
      }
    } else if (good) {
      scheduleClick(e)
      stopEvent(e)
    }
  },
  true
)

GM_addStyle(`@keyframes bang {
  from {
    opacity: 0;
  }
}

@keyframes bong {
  from {
    opacity: 0;
  }
}`)
