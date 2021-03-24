const app = getApp()
// const { handleWxml, handelStyle } = require('./demo.js')

Page({
  data: {
    rgb: 'rgb(255,255,255)',//初始值
    pick: false,
    info: "😊不要讲话",
    src: '',
    infoFontSize: 30,


  },

  onLoad: function (options) {
    let that = this
    let myFirstPromise = new Promise(function(resolve, reject){
      that.widget = that.selectComponent('.widget')

      if(that.widget) {
        console.log('okk')
        setTimeout(function() {
          resolve('ok')
      }, 2000)
      }
  });
  myFirstPromise.then(function(data){
    console.log(323)

    that.renderToCanvas()

  })
    
    console.log(this.widget)
    // const ctx = wx.createCanvasContext('myCanvas')
    // ctx.setFillStyle('red')
    // ctx.fillRect(10, 10, 150, 75)
    // ctx.draw()
  },
  onReady: function(options) {
    // this.renderToCanvas()

  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    let rgb = e.detail.color;
    this.setData({
      rgb: rgb
    })
  },
  bindlinechange: function (e) {
    console.log(e.detail.value)
    this.setData({
      info: e.detail.value
    })

    this.renderToCanvas()
  },

  renderToCanvas() {
    let wxml = `<view class="item-box">
      <text class="text">${this.data.info}</text>
    </view>`
    const style = {
      itemBox: {
        width: 200,
        height: 200,
        borderRadius: 86,
        backgroundColor: this.data.rgb,
        borderWidth: 10,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // backgroundColor: '#ccc',
        // alignItems: 'center',
        // alignSelf: 'center',
        // alignItems: 'center'

      },
      text: {
        fontSize: 16,
        width: 200,
        height: 200,
        textAlign: 'center',
        verticalAlign: 'middle',
        // marginTop: 20,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignSelf: 'center',
        // display: 'flex',
        // textAlign: 'center',
        // justifyContent: 'center',
      },

    }
    const p1 = this.widget.renderToCanvas({ wxml, style

    })
    p1.then((res) => {
      console.log('container', res.layoutBox)
      this.container = res
    })
  },

  extraImage() {
    const p2 = this.widget.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      success(res) {
        console.log(res)
      }
    })
    p2.then(res => {
      this.setData({
        src: res.tempFilePath,
        width: 300,
        height: 300
      })
      
    })

    wx.saveImageToPhotosAlbum({
      filePath: this.data.src,
      success(res) { }
    })

    



  }
})


