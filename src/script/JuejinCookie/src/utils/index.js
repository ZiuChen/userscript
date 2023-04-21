// 计算登录滑块的移动距离
const calcGapPosition = async (page, src) => {
  const distance = await page.evaluate(async (src) => {
    const findMost2 = (arr) => {
      //  定义一个空对象存储数据
      var h = {}
      //    假设频率高的数出现次数初始为0
      var maxNum = 0
      //    清空频率高的数
      var maxEle = null
      //    对数组从左往右遍历
      for (var i = 0; i < arr.length; i++) {
        //    对数组的每一个数据进行存储存于a
        var a = arr[i]
        // 判断存储的数字是否为默认值， 存在 对属性的值进行+1，不存在 往对象中重新添加属性赋值为1；
        h[a] === undefined ? (h[a] = 1) : h[a]++
        // 判断存入的数据是否大于初始的频率高数，如果满足将存入高频数和出现次数的覆盖前一次的。
        if (h[a] > maxNum) {
          maxEle = a
          maxNum = h[a]
        }
      }
      return {
        times: maxNum,
        value: maxEle
      }
    }
    const imageLoaded = (document, src) => {
      return new Promise((r, j) => {
        const image = document.createElement('img')
        image.setAttribute('src', src)
        image.crossOrigin = 'Anonymous'
        image.addEventListener('load', () => {
          r(image)
        })
        image.addEventListener('error', () => {
          j()
        })
      })
    }
    const image = await imageLoaded(document, src).catch((err) => {
      console.log('图片加载失败')
    })
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imageInfo = ctx.getImageData(0, 0, image.width, image.height)
    const imageData = imageInfo.data
    const gap = 1
    let positionX = []
    for (var h = 0; h < image.height; h += gap) {
      for (var w = 0; w < image.width; w += gap) {
        var position = (image.width * h + w) * 4
        var r = imageData[position],
          g = imageData[position + 1],
          b = imageData[position + 2]
        let num = 0
        if (r >= 252) num += 1
        if (g >= 252) num += 1
        if (b >= 252) num += 1
        if (num >= 2) {
          positionX.push(w)
        }
      }
    }
    return findMost2(positionX)
  }, src)
  return (distance.value * 340) / 552
}

const delay = (timeout) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, timeout)
  })
}

const randInt = (min, max = 10) => {
  return parseInt(Math.random() * (max - min + 1) + min, 10)
}

module.exports = { calcGapPosition, delay, randInt }
