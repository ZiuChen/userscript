[English](./README.md) | [中文](./README.zh-CN.md)

----

# Duplicate Tab Cleaner

## 功能摘要
- 按规范化后的 URL 检测重复标签页。
- 通过 GM tab-store 协调：选出保留页（winner），向重复页写入“请自关”请求。
- 重复页尝试 window.close()；若失败则显示可交互的提示栏，让用户手动关闭或保留。
- 支持简体中文与英文界面，自动根据浏览器语言选择。

## 安装与使用
- 在 Tampermonkey 中新建脚本，粘贴并保存本 userscript（默认匹配所有站点，可修改 @match）。
- 在任意页面点击 Tampermonkey 脚本菜单中的“清理重复标签（dupe-cleaner）”（或英文 “Clean duplicate tabs (dupe-cleaner)”），即可触发一次去重。
- 也可在控制台运行 window.__dupeCleaner.triggerCleanup() 触发。

## 要求（权限 / API）
- 需要 GM.getTab / GM.saveTab / GM.getTabs / GM.setValue / GM.addValueChangeListener 等 API（脚本已兼容 GM_* 旧 API）。
- 所有参与去重的标签页需安装并运行此脚本，否则不会出现在 GM 的 tab-store 中。

## 配置与扩展
- 可在脚本内 CONFIG 区域修改：URL 规范化选项、自动跳转目标、提示延时等。
- 可修改 @match 限制为仅在指定域名或路径启用。
- 可扩展多语言词条、去重策略（保留最早/当前/用户标记）等。

## 限制与注意事项
- 普通 userscript 无法强制关闭任意标签页（浏览器通常限制 window.close()），因此脚本采用“请求自关 + 提示用户”策略作为退路。
- 若要完全自动强制关闭标签，需要开发浏览器扩展并申请 tabs 权限（不是 userscript 能做到的）。
- 若遇到某些标签未被识别为已注册，请确保脚本在这些页面确实运行（没有被 CSP 或脚本管理器阻止）。
