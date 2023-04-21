# Deploy Guide

从开发体验出发，代码使用TS编写

- 如果你要部署到腾讯云函数执行，由于云函数不支持直接运行TS，因此需要编译为JS
- 如果你可以直接运行，那么不必编译，直接执行`pnpm ts`即可

## 编译代码为JS

### use PNPM

拉取代码到本地后，在`userscript`目录下执行

```bash
pnpm i # 安装依赖
```

如果没有安装`pnpm`，可以通过`npm i pnpm -g`全局安装

安装完依赖，将自己的Cookie、Token等信息填入`.sample.env`，并将其重命名为`.env`

> **Note**
> 
> `.env`文件中的值必须写在一行内，否则会出现错误

修改完毕后，执行：

```bash
pnpm build # 编译为JS
```

编译完毕后，`userscript`目录下会出现`dist`文件，如果你要部署云函数，则将`dist`目录部署到云函数即可

如果你要本地运行，则可以使用：

```bash
pnpm start # 本地运行
```

在命令行窗口查看日志输出

### use NPM

我强烈建议你使用`pnpm`命令执行相关操作，如果遇到问题，也可以将上文中的命令换为对应的NPM命令：

```bash
npm i # 安装依赖
npm run build # 编译为JS
npm run start # 本地运行
```

## 直接运行

### use PNPM

```bash
pnpm i # 安装依赖
pnpm ts # 直接运行
```

### use NPM

```bash
npm i # 安装依赖
npm run ts # 直接运行
```