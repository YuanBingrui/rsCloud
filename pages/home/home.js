// pages/home/home.js
var loginService = require('../../service/login-service.js');
var moment = require('../../utils/moment.js');

Page({
  data: {
    today: '',
    itemNum: 0
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    wx.showNavigationBarLoading();
    this.setData({
      itemNum: 20,
      today: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    });
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 3000)
  },

  goTodo: function () {
    wx.navigateTo({
      url: '../todo/todo'
    })
  },
  
  onShareAppMessage: function () {
    return {
      title: '罗想云',
      path: '/pages/login/login'
    }
  }
})