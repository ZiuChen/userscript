**此程序仅供学习交流使用，请勿用于真实上报，请于下载后24小时内删除，因使用此程序造成的任何后果开发者概不负责。**

## Required

* `Cookie`: 身份凭证
* `data`: 提交到服务器的数据

> 注意：程序读取的配置文件名为 `config.js`
> 
> 请在运行前**自行抓包**获取数据填入 `config.js` 中

## Usage

安装依赖

```sh
npm install
```

运行脚本

```sh
node index.js
```

## Notice

云函数部署环境下：

* **（必须）**  需要将 `PUSHPLUS_TOKEN` 加入环境变量
* **（可选）**  将`Cookie`加入环境变量，其key为 `DailyReportCookie`
