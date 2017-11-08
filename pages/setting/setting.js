var loginService = require('../../service/login-service.js');

Page({
  data: {
    username: 'YBR'
  },
  onLoad: function (options) {
  
  },

  logout: function () {
    loginService.logout().then((res) => {
      if (res.data.errcode === 0) {
        loginService.clearLogin()
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        console.log(res.data.desc)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})