const app = getApp()
// const { handleWxml, handelStyle } = require('./demo.js')

Page({
  data: {
    rgb: 'rgb(250,185,15)',//初始值
    pick: false,
    fontColorPick: false,
    fontColorRgb: 'rgb(105,105,105)',
    info: "😊我可以说句话吗？",
    src: '',
    authorSrc: '../../images/norton.jpeg',
    infoFontSize: 30,
    btnLoading: false,
    show:false,
    wechatColor: 'green',
    buttons: [
      {
        type: 'primary',
        className: '',
        text: '关闭',
        value: 1
      }
    ]

  },

  autoChangeColor() {
    let that = this
    setTimeout(function () {
      if (that.data.wechatColor == 'green') {
        that.setData({
          wechatColor: 'red'
        })
        that.autoChangeColor()
        console.log('exec')
      }
    }, 1000)
  },
  onLoad: function (options) {
    let that = this
    let myFirstPromise = new Promise(function(resolve, reject){
      that.widget = that.selectComponent('.widget')

      if(that.widget) {
        
        setTimeout(function() {
          resolve('ok')
      }, 1000)
      }

      // this.autoChangeColor()
  });
  myFirstPromise.then(function(data){

    that.renderToCanvas()

  })

  },
  onReady: function(options) {
    // this.renderToCanvas()

  },

  open: function () {
    this.setData({
      show: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  tofontColorPick: function () {
    this.setData({
      fontColorPick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    let rgb = e.detail.color;
    this.setData({
      rgb: rgb
    })
    this.renderToCanvas()

  },

  handleResetInfo() {
    this.setData({
      info: ''
    })
    this.renderToCanvas()

  },
  handlePickFontColor(e) { //! 字体颜色handle
    let rgb = e.detail.color;
    // console.log('字体颜色',rgb)
    this.setData({
      fontColorRgb: rgb
    })
    this.renderToCanvas()

  },
  bindlinechange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      info: e.detail.value
    })

    this.renderToCanvas()
  },

  renderToCanvas() {
    let wxml = `<view class="item-box" style="width:200px; height: 200px;">
      <text class="text">${this.data.info}</text>
    </view>`
    const style = {
      itemBox: {
        width: 185,
        height: 185,
        borderRadius: 78,
        backgroundColor: this.data.rgb,

      },
      text: {
        fontSize: this.data.infoFontSize,
        color: this.data.fontColorRgb,
        width: 180,
        height: 180,
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '1.4em',
      },

    }
    const p1 = this.widget.renderToCanvas({ wxml, style

    })
    p1.then((res) => {
      // console.log('container', res.layoutBox)
      this.container = res
    })
  },

  sliderChangeHandle(e) { //!修改字体handle

    this.setData({
      infoFontSize: e.detail.value,
    })
    this.renderToCanvas()

  },
  extraImage() {
    this.setData({
      btnLoading: true,
    })
    const p2 = this.widget.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,

    })
    p2.then(res => {
        this.setData({
          btnLoading: false,
        })
      
      this.setData({
        src: res.tempFilePath,
        width: 300,
        height: 300
      })
      let that = this
      setTimeout(function () {
        wx.showToast({
          title: '完成渲染，请到相册查看！',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.saveImageToPhotosAlbum({
          filePath: that.data.src,
          success(res) { }
        })
      }, 1000)
    })
  }
})


