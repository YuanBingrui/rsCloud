// login.js
var loginService = require('../../service/login-service.js')
var tooltips = require('../common/tooltips.js')

Page({
  data: {
    login: {
      entcode: 'rs',
      username: '',
      password: '',
      errorMessage: ''
    },
    display: true,
    loading: false
  },

  onLoad: function (options) {
    console.log('onLoad');
  },

  getUsername: function (e) {
    if (this.data.display){
      this.setData({
        'login.username': e.detail.value
      })
    }else{
      this.setData({
        display: true,
        'login.username': e.detail.value
      })
    }
  },
  getPassword: function (e) {
    if (this.data.display) {
      this.setData({
        'login.password': e.detail.value
      })
    } else {
      this.setData({
        display: true,
        'login.password': e.detail.value
      })
    }
  },

  submit: function (event) {
    this.setData({
      loading: true
    })
    if(this.data.username !== '' && this.data.password !== ''){
      loginService.login(this.data.login).then(res => {
        if (res.data.errcode === 0) {
          loginService.saveLogin(this.data.login)
          tooltips.showToast(res.data.desc,'success','')
          this.setData({
            loading: false
          })
          wx.redirectTo({
            url: './home/home'
          })
        } else {
          this.setData({
            'login.errorMessage': res.data.desc,
            display: false,
            loading: false
          });
        }
      }).catch(err => {
        this.setData({
          'login.errorMessage': err,
          display: false,
          loading: false
        });
      })
    }else{
      this.setData({
        'login.errorMessage': '用户名和密码不能为空',
        display: false,
        loading: false
      });  
    }   
  } 
})