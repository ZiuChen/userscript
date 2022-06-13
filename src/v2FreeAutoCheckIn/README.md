## v2FreeAutoCheckIn

### 注意事项

* **需配置环境变量 `PushPlusToken` 与 `v2freeCookie`**
  *  `PushPlusToken` 访问[此网站](http://www.pushplus.plus/)申请，每日有免费推送额度
  * `v2freeCookie` 可以携带登录状态访问[此网站](https://w1.v2free.net/user/checkin)，从 Network 中抓取，经过测试，此Cookie长期有效
* **由于不同checker位于不同的目录下，需要分别安装依赖**
* **Node-Fetch版本为 `2.6.7`，安装时需额外指定版本**

```shell
  # 自动安装依赖(推荐)
  npm i 
  # 手动安装依赖
  npm install node-fetch@2 -D
```

### 额外说明

搭配云函数触发器，可以每日定时运行：

> 每日12点自动执行

```corn
  "cron": "0 0 12 * * * *"
```