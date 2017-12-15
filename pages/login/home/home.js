// home.js
var moment = require('../../../utils/moment.js')
var loginService = require('../../../service/login-service.js')

Page({
  data: {
    today: '',
    itemNum: 0
  },

  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.setData({
      itemNum: 20, 
      today: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    });
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 3000)
  },

  goTodo: function(){
    wx.navigateTo({
      url: './pages/todo/todo'
    })
  },

  logout: function(){
    loginService.logout().then((res) => {
      if(res.data.errcode === 0){
        loginService.clearLogin()
        wx.redirectTo({
          url: '../login'
        })
      }else{
        console.log(res.data.desc)
      }  
    }).catch(err => {
      console.log(err)
    })
  }
})