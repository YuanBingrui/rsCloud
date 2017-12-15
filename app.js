//app.js
var loginService = require('./service/login-service.js')

App({
  onLaunch: function() {
    loginService.autoLogin().then((res) => {
      if (res.data.errcode === 0){
        wx.redirectTo({
          url: './home/home'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})
