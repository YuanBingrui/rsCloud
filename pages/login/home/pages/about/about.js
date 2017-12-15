// about.js
Page({
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    wx.hideShareMenu()
  },

  actionSheetTap: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['识别图中二维码'],
      success: function (e) {
        that.scanQRcode()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  scanQRcode: function(){
    wx.getImageInfo({
      src: '../../../../../image/qrcode.png',
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
        console.log(res.path)
      }
    })
    wx.scanCode({
      success: (res) => {
        // wx.getImageInfo({
        //   src: '../../../../../image/qrcode.png',
        //   success: function (res) {
        //     console.log(res.width)
        //     console.log(res.height)
        //     console.log(res.path)
        //   }
        // })
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      imageUrl: '../../../../../image/qrcode.png',
      success: function(res) {
        console.log(res)
      },
      fail: function (res) {
       console.log(res.err)
      }
    }
  }
})