// pages/home/home.js
var loginService = require('../../service/login-service.js');
var moment = require('../../utils/moment.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');
var todoService = require('../../service/todo-service.js');
var announcementService = require('../../service/announcement-service.js');

const RSHARE_WORKLOG_AUTHORITYID = '170020001';

Page({
  data: {
    isGetWoklog: Boolean,
    todo: {},
    announcement: {}
  },

  onLoad: function (options) {
    this.getAuthority();
  },

  onShow: function () {
    this.getTodoList();
    this.getAnnouncement();
  },

  getAuthority: function() {
    loginService.getAuthority().then(res => {
      if (res.data.errcode === 0) {
        let authority = res.data.body;
        if (authority !== '') {
          let a = ',' + authority + ',';
          let b = ',' + RSHARE_WORKLOG_AUTHORITYID + ',';
          if (a.indexOf(b) > -1) {
            this.setData({
              isGetWoklog: true
            });
          } else {
            this.setData({
              isGetWoklog: false
            });
          };
        }
      } else {
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(res);
    })
  },

  getTodoList: function() {
    todoService.getTodoList(1, 1).then((res) => {
      if (res.data.errcode === 0) {
        this.setData({
          todo: tooltips.rowsDataTrimValueProperty(res.data.body.rows)[0]
        })
        console.log(this.data.todo)
      }else{
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err)
    })
  },

  getAnnouncement: function(){
    announcementService.getAnnouncementList(1, 1).then(res => {
      if (res.data.errcode === 0) {
        this.setData({
          announcement: tooltips.rowsDataTrimValueProperty(res.data.body.rows)[0]
        })
        console.log(this.data.announcement)
      } else {
      tooltips.showToast(res.data.desc, '', '../../image/fail.png');
      console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err);
    })
  },

  goTodoDetail: function () {
    wx.navigateTo({
      url: '../todo-detail/todo-detail?todo=' + JSON.stringify(this.data.todo)
    })
  },

  goAnnouncementDetail: function () {
    wx.navigateTo({
      url: '../announcement-detail/announcement-detail?data=' + JSON.stringify(this.data.announcement)
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