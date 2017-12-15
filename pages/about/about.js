// pages/about/about.js
var shareMessage = require('../../service/share-message.js');

Page({
  data: {

  },

  onLoad: function (options) {

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

  scanQRcode: function () {
    wx.saveImageToPhotosAlbum({
      filePath: '../../image/qrcode.png',
      complete: function (res) {
        console.log(res)
      }
    })
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})