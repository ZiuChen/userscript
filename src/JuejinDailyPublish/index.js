// HUAWEI P30 Pro 2340x1080
const TIME_OUT = 1000
const LOAD_TIME_OUT = 5000
let title = ''

// 解锁屏幕
const unlock = () => {
  if (!device.isScreenOn()) {
    device.wakeUp()
    sleep(500)
    swipe(500, 2000, 500, 1000, 1500)
  }
}

const customBack = () => {
  back()
  sleep(TIME_OUT)
}

const customClick = (x, y) => {
  click(x, y)
  sleep(TIME_OUT)
}

const clickItemByBound = (item) => {
  const bounds = item.bounds()
  const flag = customClick(bounds.centerX(), bounds.centerY())
  return flag
}

const navBarClick = (navName) => {
  className('android.widget.FrameLayout')
    .desc(navName)
    .find()
    .forEach(function (tv) {
      clickItemByBound(tv)
    })
}

const clickText = (text) => {
  className('android.widget.TextView')
    .text(text)
    .find()
    .forEach(function (tv) {
      log(text)
      clickItemByBound(tv)
    })
}

const clickImage = (id) => {
  className('android.widget.ImageView')
    .id(id)
    .find()
    .forEach(function (tv) {
      log(id)
      clickItemByBound(tv)
    })
}

const generateMsg = (title) => {
  const date = new Date()
  const symbols = [', ', '，', '。', ' ', '\n']
  const msgList = [
    date.getMonth() + 1,
    '月',
    date.getDate(),
    '日 ',
    '每日阅读打卡',
    symbols[random(0, symbols.length - 1)],
    '今天阅读了《',
    title,
    '》，'
  ]
  const suffixs = [
    '看了这篇文章对自己收获很大，希望能有机会实践下来',
    '这篇文章实在太妙了！必须码住!',
    '干货满满，好文章值得分享',
    '总结的很系统很全面',
    '以前一直挺好奇的，现在终于有机会学习！受益匪浅！',
    '点赞，通俗易懂！',
    '值得好好阅读一番~',
    '文章内容太优秀了，佩服作者！',
    '值得一看，学习了！',
    '文章讲得很好，值得学习！',
    '文章质量很高，值得学习和收藏，很适合我这种菜鸡。',
    '光看是不行，最好跟着文章敲代码。',
    '感觉自己需要学习的太多啦',
    '从这篇文章可以学到很多知识点',
    '文章内容干货满满，值得学习，推荐！'
  ]
  const emojis = [
    '[思考]',
    '[奋斗]',
    '[偷笑]',
    '[委屈]',
    '[拥抱]',
    '[送心]',
    '[呲牙]',
    '[吃瓜群众]',
    '[睡]',
    '[憨笑]',
    '[机智]',
    '[力量]'
  ]

  const msg =
    msgList.join('') + suffixs[random(0, suffixs.length - 1)] + emojis[random(0, emojis.length - 1)]
  return msg
}

const main = () => {
  unlock()

  // 启动 App
  launchApp('稀土掘金')

  // 等待程序启动
  waitForActivity('im.juejin.android.ui.MainActivity')

  sleep(TIME_OUT)

  // 切换到`首页`
  navBarClick('首页')

  // 刷新推荐文章列表
  swipe(580, 850, 580, 850 + 850, TIME_OUT)

  // 休眠 2s + 5s 等待列表加载完成
  sleep(TIME_OUT + LOAD_TIME_OUT)

  // 进入第一篇推荐文章
  className('android.widget.TextView')
    .id('com.daimajia.gold:id/title')
    .find()
    .forEach((item, index) => {
      // 跳过第一个广告
      if (index === 1) {
        log('点击文章')
        log(item.text())
        clickItemByBound(item)
        return
      }
    })

  // 获取文章 title
  id('com.daimajia.gold:id/article_title')
    .find()
    .forEach(function (tv) {
      title = tv.text()
    })

  // 点击右上角三个点
  clickImage('com.daimajia.gold:id/iv_more')

  // 复制文章链接
  const copyParent = text('复制链接').findOne().parent()
  clickItemByBound(copyParent)

  customBack() // 返回主页

  sleep(TIME_OUT)

  // 底部导航栏 沸点
  navBarClick('沸点')

  // 我加入的圈子
  clickText('我加入的圈子')

  // 进入第一个圈子
  const groupParent = text('好文推荐').findOne().parent()
  clickItemByBound(groupParent)

  // 点击右下角悬浮按钮
  clickImage('com.daimajia.gold:id/btn_post')

  // 链接 按钮
  clickImage('com.daimajia.gold:id/iv_link_button')

  // paste() // 默认自动粘贴

  // 添加 解析
  clickText('添加')

  // 等待解析完成
  sleep(TIME_OUT + LOAD_TIME_OUT * 2)

  const message = generateMsg(title)

  // 将 msg 写入剪切板并粘贴
  setClip(message)

  paste()

  sleep(TIME_OUT)

  // 发布
  clickText('发布')

  // 返回主页
  customBack()
  customBack()
  customBack()

  // 退出 App
  customBack()
  customBack()
}

main()
