// ==UserScript==
// @name               Github Repo Info
// @name:en            Github Repo Info
// @name:zh-CN         Github 仓库信息
// @description        Get Github Repo info like repo size, create time and etc.
// @description:zh-CN  获取 Github 仓库信息，如仓库体积、创建事件等
// @version            1.0.0
// @author             ZiuChen
// @namespace          https://github.com/ZiuChen
// @source             https://github.com/ZiuChen/userscript
// @supportURL         https://github.com/ZiuChen/userscript/issues
// @updateURL          https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/GithubRepoInfo/userscript.user.js
// @downloadURL        https://fastly.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/GithubRepoInfo/userscript.user.js
// @icon               https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// @match              https://github.com/*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_deleteValue
// @grant              GM_registerMenuCommand
// ==/UserScript==

const githubTokenRef = () =>
  GM_getValue(
    'GITHUB_TOKEN',
    atob(
      'Z2l0aHViX3BhdF8xMUFaRldORVEwZE5CRE1zalRRTG4zX3dua2NDeFNFR1lmeHJueWpiSjdLUE1WeG1PYlRVNFhYNHYzV1liZlFNWFU2N0hPN1I1UE5yUkt1SHY0'
    )
  )

const MENU_COMMANDS = [
  {
    name: 'Show Repo Info',
    action: () => showRepoInfo(getCurrentRepoInfo())
  },
  {
    name: 'Fetch Repo Info',
    action: showRepoInfo
  },
  {
    name: 'Set Github Token',
    action: setGithubToken
  },
  {
    name: 'Reset Github Token',
    action: resetGithubToken
  },
  {
    name: 'View Current Github Token',
    action: () => {
      prompt('Current Github Token', githubTokenRef())
    }
  }
]

// 注册菜单命令
MENU_COMMANDS.forEach((command) => {
  GM_registerMenuCommand(
    command.name,
    function (event) {
      command.action()
    },
    { autoClose: true }
  )
})

/**
 * 获取 Repo 信息
 */
async function showRepoInfo(repo) {
  if (!repo) {
    repo = prompt('Type in Repo info. like: `vuejs/core`', getCurrentRepoInfo())
  }

  if (!repo) return

  // 检查 repo 是否合法
  const repoReg = /^[\w-]+\/[\w-]+$/

  if (!repoReg.test(repo)) {
    alert('Repo info is invalid.')
    return
  }

  const repoInfo = await fetchRepoInfo(repo)

  repoInfo && alert(repoInfo)
}

/**
 * 设置 Token
 */
function setGithubToken() {
  const token = prompt('Type in Github Token', githubTokenRef())

  if (!token) return

  GM_setValue('GITHUB_TOKEN', token)
}

/**
 * 重置 Token
 */
function resetGithubToken() {
  GM_deleteValue('GITHUB_TOKEN')
}

/**
 * 获取 repo 信息
 */
async function fetchRepoInfo(repo) {
  return fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      authorization: `token ${githubTokenRef()}`
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('Github Server Response:', res)

      const { size, created_at, updated_at, message } = res

      if (!size || !created_at) {
        throw new Error(
          'Repo info is not available. Please checkout Github Token is valid. ' + message
        )
      }

      const sizeText = `Size: ${formatSize(size)}`
      const createdText = `Created: ${formatTime(created_at)}`
      const updatedText = `Updated: ${formatTime(updated_at)}`

      return `${sizeText}\n${createdText}\n${updatedText}`
    })
    .catch((err) => {
      alert(err)
    })
}

/**
 * 获取当前 repo 信息
 */
function getCurrentRepoInfo() {
  // 从 url 中获取 repo 信息
  const repoReg = /github\.com\/(.+?)\/(.+?)(\/|$)/
  try {
    const [, owner, repo] = window.location.href.match(repoReg)
    return `${owner}/${repo}`
  } catch (error) {
    return ''
  }
}

/**
 * 格式化文件大小
 * 将文件大小转换为可读性更好的格式
 */
function formatSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * 格式化时间
 */
function formatTime(time) {
  return new Date(time).toLocaleString()
}
