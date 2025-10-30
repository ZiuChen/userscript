[English](./README.md) | [中文](./README.zh-CN.md)

----

# Highlight Translation

划词翻译用户脚本，支持多种翻译服务商，支持翻译源与用户设置跨设备同步。

1. 支持通过辅助键（双击 Ctrl/Cmd）唤起翻译浮窗，浮窗支持在固定位置展示
2. 内置了一系列翻译服务
   1. 谷歌翻译（无需配置）
   2. Chrome 内置翻译（无需配置）
   3. GLM（无需配置）
   4. 百度翻译
   5. OpenAI 兼容的自定义端点
3. 翻译源与设置跟随 Tampermonkey 同步：可通过 Google Drive / Dropbox / OneDrive / WebDAV 同步
4. 支持自动检测语言，支持设置主要与次要语言
5. 界面简洁易用，适配深色模式

## 安装
1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. [点此安装划词翻译脚本](https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/highlight-translation/index.user.js)
3. 安装完成后，在页面选中文本，双击 Ctrl/Cmd 即可唤起翻译浮窗
