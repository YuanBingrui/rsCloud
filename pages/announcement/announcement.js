// pages/announcement/announcement.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var announcementService = require('../../service/announcement-service.js');
var tooltips = require('../common/tooltips.js');

Page({
  data: {
    limit: 10,
    offset: 1,
    noticeList: [],
    noticeDate: '',
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    wx.showNavigationBarLoading();
    let tempArr = [];
    for (let i = 0; i < 20; i++) {
      tempArr.push({ id: i, value: '电子公告_00' + i, subvalue: '紧急通知！紧急通知！紧急通知！重要的事情说三遍！哈哈哈哈哈哈' + i })
    }
    this.setData({
      noticeList: tempArr,
      noticeDate: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    });
    this.getAnnouncementList();
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function() {

  },

  getAnnouncementList: function () {
    announcementService.getAnnouncementList(this.data.limit, this.data.offset).then(res => {
      if (res.data.errcode === 0) {
        console.log(res);
      } else {
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err);
    })
  },

  addSearchBoxStyle: function (event) {
    this.setData({
      searchStyle: search.addSearchBoxStyle()
    })
  },

  delSearchBoxStyle: function (event) {
    this.setData({
      searchStyle: search.delSearchBoxStyle()
    })
  },
  
  onShareAppMessage: function () {
  
  }
})