var loginService = require('./service/login-service.js')

App({
  onLaunch: function () {
    loginService.autoLogin().then((res) => {
      if (res.data.errcode === 0) {
        wx.switchTab({
          url: '../../pages/home/home'
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
})