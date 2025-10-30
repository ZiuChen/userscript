[English](./README.md) | [中文](./README.zh-CN.md)

----

# Github Copilot Enhanced

A UserScript for enhancing GitHub Copilot (Web).

> [!WARNING]  
> Please note, this script is not an official product. Make sure you understand how it works and the potential risks before using.
> 
> All data is stored only in your local browser and will not be uploaded to any server.

![example-search](./docs/example-search.webp)

## Feature Highlights

### 🗄️ Long-Term Storage
By default, GitHub Copilot (Web) only retains chat history for 30 days.
This script enables longer chat history retention by saving conversations to the browser's IndexedDB.

## 🔍 Search Functionality
- **Shortcut Open**: Press `Ctrl/Cmd+K` to quickly open the search panel
- **Live Search**: Shows matching chat records in real time as you type keywords, supports fuzzy search
- **Keyboard Navigation**: Use arrow keys to browse search results, press Enter to open the selected conversation

### ⚙️ Settings Panel
- **Quick Access**: Click the gear icon in the search panel to open settings
- **Configuration Management**: Centrally manage all script configuration options
- **WebDAV Sync**: Configure WebDAV server for cross-browser/device data synchronization

### 🔄 Auto Sync
- **Periodic Sync**: Automatically syncs all chat history every 30 minutes
- **Initial Load**: Executes one sync immediately when the page loads
- **Background Operation**: Sync runs in the background without affecting normal usage

### ☁️ WebDAV Sync
- **Simple Configuration**: Enter WebDAV server URL, username and password in settings panel
- **Manual Sync**: Support manual upload and download operations
- **Smart Merge**: Automatically merge local and remote data when downloading, keeping the latest version
- **Cross-Device**: Sync data across multiple devices via WebDAV

### 🔌 Seamless Integration
- **Request Interception**: Automatically intercepts GitHub Copilot API requests
- **Data Merging**: Merges local history with server data before returning
- **Transparent Operation**: Completely transparent to the user, no extra actions required

## Usage

### Installation
1. Install Tampermonkey or another UserScript manager
2. [Click here to install](https://github.com/ZiuChen/userscript/raw/refs/heads/main/src/userscript/github-copilot-enhanced/index.user.js) the script

### Configure WebDAV Sync (Optional)
1. Press `Ctrl/Cmd+K` to open the search panel
2. Click the gear icon in the top right corner to open settings panel
3. Fill in the "WebDAV Sync" section:
   - Server URL: e.g., `https://example.com/webdav`
   - Username and Password
4. Click "Save Config"
5. Click "Test Connection" to verify the configuration
6. Use "Upload Data" and "Download Data" buttons for manual sync

**Notes**:
- Before first upload, if remote file exists, it will automatically download and merge first
- When downloading, local and remote data will be automatically merged, keeping the newer timestamp version
- Supports mainstream WebDAV services like Nutstore, Nextcloud, etc.

## Notes

1. **Authentication Issues**: The project uses your browser's existing authentication info for API requests. Make sure you are logged into GitHub and have Copilot Pro or higher access
2. **Storage Limitations**: IndexedDB is subject to browser storage quotas; too much data may cause storage failures
3. **Privacy & Security**: 
   - All data is stored only in your local browser's IndexedDB
   - WebDAV sync is completely optional, no data will be uploaded if not configured
   - WebDAV credentials are encrypted and stored locally using GM_setValue
4. **Compatibility**: Requires a modern browser that supports IndexedDB
5. **Sync Frequency**: Default is to sync GitHub Copilot data every 30 minutes, can be adjusted as needed
6. **WebDAV Security**: 
   - Recommend using HTTPS protocol for WebDAV server
   - Regularly check the integrity of remote backup files
   - Be aware of WebDAV server storage space limitations
