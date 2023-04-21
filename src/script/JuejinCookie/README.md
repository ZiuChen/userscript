# 批量获取掘金Cookie

**脚本仅供学习交流使用, 请勿实际应用, 由使用此脚本导致的任何后果与开发者无关**

## 使用步骤

### 安装依赖

项目使用pnpm管理依赖，在终端内输入：

```sh
# 进入项目根目录
cd .\src\JuejinCookie\
# 执行安装依赖
pnpm install
```

### 配置参数

将根目录下`.env.example`按要求修改后，将其重命名为`.env`

> 云函数部署下，可以直接在环境变量中定义`USERS_INFO`

### 运行脚本

运行`index.js`

```sh
node index.js
```

脚本运行完毕, 将通过**控制台日志**输出Cookie数组
