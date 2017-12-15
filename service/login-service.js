var server = require('../service/http-service.js')
var wxRequest = require('../service/wxRequest.js')
var hexmd5 = require('../utils/md5.js')

function login(login) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2,
      params: JSON.stringify({
        deviceType: 1,
        entcode: login.entcode,
        userid: login.username,
        passwd: hexmd5.hex_md5(login.username + 'VKSOFT' + login.password + '1.0')
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function logout() {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 6,
      params: JSON.stringify({
        action: 6
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function autoLogin(){
  return wxRequest.wxGetStorage('login').then((res) => {
    return this.login(res.data)
  }).catch(err => {
    console.log(err)
    return { data: { errcode: 'getStorage:fail data not found'}}
  }) 
}

function saveLogin(login){
  wx.setStorage({
    key: 'login',
    data: login,
  })
}

function clearLogin(){
  wx.removeStorage({
    key: 'login'
  })
}

module.exports = {
  login: login,
  logout: logout,
  autoLogin: autoLogin,
  saveLogin: saveLogin,
  clearLogin: clearLogin
}