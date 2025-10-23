[English](./README.md) | [中文](./README.zh-CN.md)

----

# Github Copilot Enhanced

一个用于增强 GitHub Copilot (Web) 的 UserScript。

> [!WARNING]  
> 请注意，此脚本并非官方产品，使用时请确保了解其工作原理及潜在风险。
> 
> 所有数据仅存储在本地浏览器中，不会上传到任何服务器。

![example-search](./docs/example-search.webp)

## 功能特性

### 🗄️ 长期存储
默认情况下，GitHub Copilot (Web) 仅保留 30 天内的聊天记录。
本脚本通过将聊天记录保存到浏览器的 IndexedDB 中，实现了更长时间的聊天记录保存功能。

## 🔍 搜索功能
- **快捷键打开**: 按下 `Ctrl/Cmd+K` 快速打开搜索面板
- **实时搜索**: 输入关键词时，实时显示匹配的聊天记录，支持模糊搜索
- **键盘导航**: 使用方向键浏览搜索结果，按 Enter 键打开对应聊天记录

### 🔄 自动同步
- **定期同步**: 每 30 分钟自动同步一次所有聊天记录
- **首次加载**: 页面加载时立即执行一次同步
- **后台运行**: 同步过程在后台进行，不影响正常使用

### 🔌 无缝集成
- **请求拦截**: 自动拦截 GitHub Copilot 的 API 请求
- **数据合并**: 将本地历史记录与服务器数据合并后返回
- **透明操作**: 对用户完全透明，无需额外操作

## 使用方法

### 安装
1. 安装 Tampermonkey 或其他 UserScript 管理器
2. [点此安装](https://github.com/ZiuChen/userscript/raw/refs/heads/main/src/userscript/github-copilot-enhanced/index.user.js) 该脚本

## 注意事项

1. **认证问题**: 项目使用浏览器已有的认证信息进行 API 请求，确保已登录 GitHub 并拥有访问 Copilot Pro 及以上的权限
2. **存储限制**: IndexedDB 受浏览器存储配额限制，过多数据可能导致存储失败
3. **隐私安全**: 所有数据仅存储在本地浏览器中，不会上传到任何服务器
4. **兼容性**: 需要支持 IndexedDB 的现代浏览器
5. **同步频率**: 默认 30 分钟同步一次，可根据需要调整
