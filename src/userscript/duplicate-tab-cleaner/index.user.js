// ==UserScript==
// @name         Duplicate Tab Cleaner
// @namespace    https://github.com/ZiuChen/userscript
// @version      1.0.0
// @description  Detects and cleans duplicate tabs (identified by URL), supports triggering cleanup via menu command.
// @description:zh  检测并清理重复的标签页（通过 URL 识别），支持通过菜单命令触发清理操作。
// @author       ZiuChen
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik03LjUgMTFDNSAxMSAzIDEzIDMgMTUuNWMwIC44OC4yNSAxLjcxLjY5IDIuNEwuNjEgMjFMMiAyMi4zOWwzLjEyLTMuMDdjLjY5LjQzIDEuNTEuNjggMi4zOC42OGMyLjUgMCA0LjUtMiA0LjUtNC41UzEwIDExIDcuNSAxMW0wIDdhMi41IDIuNSAwIDAgMSAwLTVhMi41IDIuNSAwIDAgMSAwIDVNMjMgNXYxNGMwIDEuMTEtLjg5IDItMiAySDEwLjk1Yy44MS0uNSAxLjUtMS4xOSAyLjAyLTJIMjFWOWgtOFY1SDN2NS44MkMxLjc3IDEyIDEgMTMuNjYgMSAxNS41VjVjMC0xLjEuOS0yIDItMmgxOGEyIDIgMCAwIDEgMiAyIi8+PC9zdmc+
// @match        *://*/*
// @grant        GM.getTab
// @grant        GM.saveTab
// @grant        GM.getTabs
// @grant        GM.setValue
// @grant        GM.addValueChangeListener
// @grant        GM.getValue
// @grant        GM.addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/duplicate-tab-cleaner/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/duplicate-tab-cleaner/index.user.js
// ==/UserScript==

;(async function () {
  'use strict'

  // Compatibility wrappers (supports GM.* and legacy GM_* APIs)
  const gm = {
    async getTab() {
      if (typeof GM !== 'undefined' && GM.getTab) return await GM.getTab()
      return await new Promise((resolve) => GM_getTab(resolve))
    },
    async saveTab(tab) {
      if (typeof GM !== 'undefined' && GM.saveTab) return await GM.saveTab(tab)
      if (typeof GM_saveTab === 'function')
        return await new Promise((resolve) => GM_saveTab(tab, resolve))
      return
    },
    async getTabs() {
      if (typeof GM !== 'undefined' && GM.getTabs) return await GM.getTabs()
      return await new Promise((resolve) => GM_getTabs(resolve))
    },
    async setValue(key, val) {
      if (typeof GM !== 'undefined' && GM.setValue) return await GM.setValue(key, val)
      return await new Promise((resolve) => GM_setValue(key, val).then(resolve).catch(resolve))
    },
    addValueChangeListener(key, cb) {
      if (typeof GM !== 'undefined' && GM.addValueChangeListener)
        return GM.addValueChangeListener(key, cb)
      if (typeof GM_addValueChangeListener === 'function') return GM_addValueChangeListener(key, cb)
      return null
    },
    async getValue(key, def) {
      if (typeof GM !== 'undefined' && GM.getValue) return await GM.getValue(key, def)
      return await new Promise((resolve) => resolve(GM_getValue ? GM_getValue(key, def) : def))
    },
    registerMenuCommand(name, fn, accessKey) {
      try {
        if (typeof GM !== 'undefined' && GM.registerMenuCommand)
          return GM.registerMenuCommand(name, fn, accessKey)
      } catch (_) {}
      if (typeof GM_registerMenuCommand === 'function')
        return GM_registerMenuCommand(name, fn, accessKey)
      return null
    },
    addStyle(css) {
      try {
        if (typeof GM !== 'undefined' && GM.addStyle) return GM.addStyle(css)
      } catch (e) {}
      const s = document.createElement('style')
      s.textContent = css
      document.head.appendChild(s)
    }
  }

  // Config
  const CONFIG = {
    closeRequestPrefix: 'dupe-close:',
    keepFlagKey: 'dupe-keep',
    normalizeOptions: {
      removeHash: true,
      removeUtm: true,
      removeTrailingSlash: true
    },
    banner: {
      id: 'dupe-close-banner',
      autoRedirectDelayMs: 8000,
      redirectUrl: 'about:blank'
    }
  }

  // Language detection: prefer Simplified Chinese for zh-CN / zh-Hans, otherwise English
  function detectLang() {
    const langs = (navigator.languages && navigator.languages.join(',')) || navigator.language || ''
    const norm = langs.toLowerCase()
    // If explicit zh-CN or zh-hans present -> simplified
    if (/zh-(cn|hans?)/i.test(norm)) return 'zh'
    // If only zh present but no TW/HK/Hant -> treat as simplified
    if (/(^|,|\b)zh($|,|\b)/.test(norm) && !/(zh-(tw|hk|hant))/i.test(norm)) return 'zh'
    return 'en'
  }
  const LANG = detectLang()

  const M = {
    en: {
      menu: 'Clean duplicate tabs (dupe-cleaner)',
      noDuplicates: 'No duplicate tabs found for this URL.',
      noDuplicatesLosers: 'No duplicate tabs to close (losers excluded by keep flag).',
      foundConfirm: (sameCount, losersCount) =>
        `Found ${sameCount} tabs with same normalized URL.\nWill request ${losersCount} tab(s) to close. Proceed?`,
      sent: 'Close requests sent to duplicates (they will try to close themselves).',
      bannerMessage: 'This tab is a duplicate and was requested to close. Choose an action:',
      fallbackBannerMessage:
        'Duplicate detected — cannot close programmatically. Click "Close now" or "Keep here".',
      btnCloseNow: 'Close now',
      btnKeepHere: 'Keep here',
      btnCloseRedirect: 'Close & Redirect',
      confirmOk: 'OK',
      confirmCancel: 'Cancel'
    },
    zh: {
      menu: '清理重复标签（dupe-cleaner）',
      noDuplicates: '未发现与当前 URL 重复的标签页。',
      noDuplicatesLosers: '没有需要关闭的重复标签（某些标签被标记为保留）。',
      foundConfirm: (sameCount, losersCount) =>
        `检测到 ${sameCount} 个相同（规范化后）URL 的标签页。\n将请求 ${losersCount} 个标签页自行关闭。继续？`,
      sent: '已向重复标签发送关闭请求（它们会尝试自行关闭）。',
      bannerMessage: '此标签为重复，已请求关闭。请选择操作：',
      fallbackBannerMessage: '检测到重复——无法以编程方式关闭。请点击“立即关闭”或“保留此页”。',
      btnCloseNow: '立即关闭',
      btnKeepHere: '保留此页',
      btnCloseRedirect: '关闭并跳转',
      confirmOk: '确定',
      confirmCancel: '取消'
    }
  }

  function t(k, ...args) {
    const dict = M[LANG] || M.en
    const v = dict[k]
    if (typeof v === 'function') return v(...args)
    return v
  }

  // Utilities
  function normalizeUrl(raw) {
    try {
      const u = new URL(raw, location.href)
      if (CONFIG.normalizeOptions.removeHash) u.hash = ''
      if (CONFIG.normalizeOptions.removeTrailingSlash) {
        if (u.pathname.length > 1 && u.pathname.endsWith('/')) {
          u.pathname = u.pathname.replace(/\/+$/, '')
        }
      }
      if (CONFIG.normalizeOptions.removeUtm) {
        const remove = []
        for (const k of u.searchParams.keys()) {
          if (/^utm_/i.test(k)) remove.push(k)
        }
        for (const k of remove) u.searchParams.delete(k)
      }
      return u.toString()
    } catch (e) {
      return raw
    }
  }

  function makeCloseKey(tabId) {
    return CONFIG.closeRequestPrefix + tabId
  }

  function addBanner(message, actions = []) {
    if (document.getElementById(CONFIG.banner.id)) return
    const style = `
      #${CONFIG.banner.id} {
        position: fixed;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(20,20,20,0.92);
        color: #fff;
        padding: 10px 14px;
        border-radius: 6px;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: sans-serif;
        font-size: 13px;
      }
      #${CONFIG.banner.id} button {
        margin-left: 8px;
        background: #fff;
        color: #111;
        border: none;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
      }
    `
    gm.addStyle(style)
    const div = document.createElement('div')
    div.id = CONFIG.banner.id
    div.innerHTML = `<span>${message}</span>`
    for (const act of actions) {
      const b = document.createElement('button')
      b.textContent = act.label
      b.addEventListener('click', act.onClick)
      div.appendChild(b)
    }
    const closeX = document.createElement('button')
    closeX.textContent = '✕'
    closeX.style.marginLeft = '10px'
    closeX.addEventListener('click', () => {
      const el = document.getElementById(CONFIG.banner.id)
      if (el) el.remove()
    })
    div.appendChild(closeX)
    document.documentElement.appendChild(div)
    return div
  }

  // State
  let myTab = null
  let myId = null
  const normalized = normalizeUrl(location.href)
  let isClosingInProgress = false

  // Register tab info once at load
  async function registerTab() {
    myTab = await gm.getTab()
    if (!myTab) myTab = {}
    myTab.url = normalized
    myTab.ts = Date.now()
    if (typeof myTab[CONFIG.keepFlagKey] === 'undefined') myTab[CONFIG.keepFlagKey] = false
    await gm.saveTab(myTab)

    // find myId by comparing references
    const tabs = await gm.getTabs()
    for (const [id, t] of Object.entries(tabs || {})) {
      if (t && t === myTab) {
        myId = id
        break
      }
    }
    // heuristic fallback
    if (!myId) {
      for (const [id, t] of Object.entries(tabs || {})) {
        if (
          t &&
          t.url === myTab.url &&
          typeof t.ts !== 'undefined' &&
          Math.abs((t.ts || 0) - myTab.ts) < 2000
        ) {
          myId = id
          break
        }
      }
    }
  }

  // cleanup on unload
  async function cleanupOnUnload() {
    window.addEventListener('beforeunload', async () => {
      try {
        if (!myTab) myTab = await gm.getTab()
        if (myTab) {
          myTab.url = null
          myTab.ts = Date.now()
          myTab._closedByScript = true
          await gm.saveTab(myTab)
        }
      } catch (e) {
        /* ignore */
      }
    })
  }

  // evaluate duplicates and request close (invoked on-demand)
  async function evaluateAndRequestClose() {
    // refresh our tab info first
    try {
      if (!myTab) myTab = await gm.getTab()
      myTab.ts = Date.now()
      await gm.saveTab(myTab)
    } catch (e) {
      /* ignore */
    }

    const tabs = await gm.getTabs()
    const same = []
    for (const [id, t] of Object.entries(tabs || {})) {
      if (!t) continue
      if (t.url === normalized) {
        same.push({ id, tab: t, ts: t.ts || 0, keep: !!t[CONFIG.keepFlagKey] })
      }
    }
    if (same.length <= 1) {
      alert(t('noDuplicates'))
      return
    }

    // choose winner: prefer any with keep flag, else current visible tab, else earliest ts
    let winnerId = null
    const keepEntry = same.find((s) => s.keep)
    if (keepEntry) winnerId = keepEntry.id
    if (!winnerId) {
      if (document.visibilityState === 'visible' && myId) {
        const own = same.find((s) => s.id === myId)
        if (own) winnerId = myId
      }
    }
    if (!winnerId) {
      same.sort((a, b) => (a.ts || 0) - (b.ts || 0))
      winnerId = same[0].id
    }

    const losers = same.filter((s) => s.id !== winnerId && !s.keep)
    if (losers.length === 0) {
      alert(t('noDuplicatesLosers'))
      return
    }

    // confirm with user
    const doIt = confirm(t('foundConfirm', same.length, losers.length))
    if (!doIt) return

    // send close requests
    for (const ent of losers) {
      const key = makeCloseKey(ent.id)
      const payload = {
        by: winnerId,
        ts: Date.now(),
        url: normalized
      }
      try {
        await gm.setValue(key, JSON.stringify(payload))
      } catch (e) {
        /* ignore */
      }
    }
    alert(t('sent'))
  }

  // on receiving a close request targeted at this tab
  async function onCloseRequest(payload) {
    if (isClosingInProgress) return
    isClosingInProgress = true

    // respect keep flag
    if (myTab && myTab[CONFIG.keepFlagKey]) {
      isClosingInProgress = false
      return
    }

    try {
      window.close()
      await new Promise((res) => setTimeout(res, 500))
      // still open: show fallback banner
      if (!document.hidden) {
        addBanner(t('bannerMessage'), [
          {
            label: t('btnCloseNow'),
            onClick: () => {
              try {
                window.close()
              } catch (e) {}
            }
          },
          {
            label: t('btnKeepHere'),
            onClick: async () => {
              myTab[CONFIG.keepFlagKey] = true
              await gm.saveTab(myTab)
              const el = document.getElementById(CONFIG.banner.id)
              if (el) el.remove()
            }
          },
          {
            label: t('btnCloseRedirect'),
            onClick: () => {
              location.href = CONFIG.banner.redirectUrl
            }
          }
        ])
        if (CONFIG.banner.autoRedirectDelayMs > 0) {
          setTimeout(() => {
            if (
              document.getElementById(CONFIG.banner.id) &&
              !(myTab && myTab[CONFIG.keepFlagKey])
            ) {
              location.href = CONFIG.banner.redirectUrl
            }
          }, CONFIG.banner.autoRedirectDelayMs)
        }
      }
    } catch (e) {
      addBanner(t('fallbackBannerMessage'), [
        {
          label: t('btnCloseNow'),
          onClick: () => {
            try {
              window.close()
            } catch (ex) {}
          }
        },
        {
          label: t('btnKeepHere'),
          onClick: async () => {
            myTab[CONFIG.keepFlagKey] = true
            await gm.saveTab(myTab)
            const el = document.getElementById(CONFIG.banner.id)
            if (el) el.remove()
          }
        }
      ])
    } finally {
      isClosingInProgress = false
    }
  }

  // setup listener for close requests targeted at this tab
  function setupCloseListener() {
    if (!myId) return
    const key = makeCloseKey(myId)
    gm.addValueChangeListener(key, async (name, oldV, newV) => {
      if (!newV) return
      let payload = null
      try {
        payload = JSON.parse(newV)
      } catch (e) {
        payload = { raw: newV }
      }
      await onCloseRequest(payload)
    })
  }

  // register menu command to let user trigger cleaning on demand
  function registerCommand() {
    gm.registerMenuCommand(
      t('menu'),
      async () => {
        try {
          if (!myTab) myTab = await gm.getTab()
          myTab.ts = Date.now()
          await gm.saveTab(myTab)
        } catch (e) {}
        await evaluateAndRequestClose()
      },
      'd'
    ) // access key 'd' (optional)
  }

  // initialize
  await registerTab()
  await cleanupOnUnload()
  setupCloseListener()
  registerCommand()

  // expose helper to console
  window.__dupeCleaner = {
    myId,
    myTab,
    triggerCleanup: evaluateAndRequestClose,
    getTabs: gm.getTabs,
    normalizeUrl
  }
})()
