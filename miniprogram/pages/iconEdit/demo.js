const wxml = () => {

  return `
<view class="container" >
  <view class="item-box green" >
    <text class="text">yeah!</text>
  </view>
</view>
`
}

const style = () => {
  let style  = {
    container: {
    },
    itemBox: {
      width: 200,
        height: 200,
        borderRadius: 86,
  },
    red: {
      backgroundColor: '#ff0000'
    },
    green: {
      backgroundColor: '#00ff00'
    },
    blue: {
      backgroundColor: '#0000ff',
        alignItems: 'center',
          justifyContent: 'center',
  },
    text: {
      width: 80,
        height: 60,
          textAlign: 'center',
            verticalAlign: 'middle',
  },
    img: {
      width: 40,
        height: 40,
          borderRadius: 20,
  }
  }
}


module.exports = {
  wxml,
  style
}
