var server = require('./http-service.js');
var wxRequest = require('./wxRequest.js');
var hexmd5 = require('../utils/md5.js');

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
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
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

function getAuthority() {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 9001,
      params: JSON.stringify({
        limit: 10,
        offset: 1,
        action: 9001,
        funtype: 13
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
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
  clearLogin: clearLogin,
  getAuthority: getAuthority
}