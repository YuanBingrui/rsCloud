var loginService = require('../../service/login-service.js');
var shareMessage = require('../../service/share-message.js');
var worklogService = require('../../service/worklog-service.js');
var tooltips = require('../common/tooltips.js');

Page({
  data: {
    username: ''
  },
  onLoad: function (options) {
    this.getWorklogList();
  },

  getWorklogList: function(){
    worklogService.getWorklogList(1, 1).then(res => {
      if (res.data.errcode === 0) {
        this.setData({
          username: tooltips.rowsDataTrimValueProperty(res.data.body.rows)[0].GZRZ_WHR
        })
        console.log(tooltips.rowsDataTrimValueProperty(res.data.body.rows)) 
      } else {
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err);
    })
  },

  logout: function () {
    loginService.logout().then((res) => {
      if (res.data.errcode === 0) {
        loginService.clearLogin()
        wx.reLaunch({
          url: '../login/login'
        })
      } else {
        console.log(res.data.desc)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  
  onShareAppMessage: function () {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})