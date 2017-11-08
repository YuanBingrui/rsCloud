// pages/login/login.js
var loginService = require('../../service/login-service.js');
var tooltips = require('../common/tooltips.js');

Page({
  data: {
    login: {
      entcode: 'rs',
      username: '',
      password: ''
    },
    loading: false
  },

  submit: function (event) {
    console.log(event);
    this.setData({
      loading: true
    });
    if (event.detail.value.username !== '' && event.detail.value.password !== '') {
      this.data.login.username = event.detail.value.username;
      this.data.login.password = event.detail.value.password;
      loginService.login(this.data.login).then(res => {
        if (res.data.errcode === 0) {
          if (res.header['Set-Cookie']) {
            wx.setStorageSync('cookie', res.header['Set-Cookie'])
          }
          console.log(wx.getStorageSync('cookie'));
          loginService.saveLogin(this.data.login);
          tooltips.showToast(res.data.desc, 'success', '');
          this.setData({
            loading: false
          });
          wx.switchTab({
            url: '../home/home'
          });
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          this.setData({
            loading: false
          });
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        this.setData({
          loading: false
        });
      })
    } else {
      tooltips.showToast('用户名和密码不能为空', '', '../../image/fail.png');
      this.setData({
        loading: false
      });
    }
  },

  onShareAppMessage: function () {
    return {
      title: '罗想云',
      path: '/pages/login/login'
    }
  }
})