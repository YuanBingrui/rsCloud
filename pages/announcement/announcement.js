// pages/announcement/announcement.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var announcementService = require('../../service/announcement-service.js');
var tooltips = require('../common/tooltips.js');

Page({
  data: {
    limit: 10,
    offset: 1,
    sysCount: Number,
    queryText: String,
    announcementList: [],
    announcementSession: [],
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    this.getRsAnnouncementList();
    wx.startPullDownRefresh();
  },

  onPullDownRefresh: function () {
    console.log('pulldown');
    tooltips.showLoading('loadding');
    this.getRsAnnouncementList();
  },

  onReachBottom: function() {
    this.getAnnouncementMoreList();
    console.log('bottom');
  },

  getRsAnnouncementList: function () {
    this.data.offset = 1;
    announcementService.getAnnouncementList(this.data.limit, this.data.offset).then(res => {
      wx.hideLoading();
      if (res.data.errcode === 0) {
        console.log(res.data);
        this.data.sysCount = res.data.body.userdata["sys.count"];
        this.data.offset = this.data.offset + 1;
        let announcementData = res.data.body.rows;
        this.data.announcementSession = [].concat(announcementData);
        if (announcementData.length > 0) {
          this.queryAnnouncement();
        } else {
          this.data.announcementList = [];
        }
      } else {
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
      wx.stopPullDownRefresh();
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      wx.stopPullDownRefresh();
      console.log(err);
    })
  },

  getAnnouncementMoreList: function() {
    tooltips.showLoading('loadding');
    if (this.data.announcementSession.length < this.data.sysCount){
      if (this.data.sysCount - this.data.announcementSession.length >= 10){
        this.data.limit = 10;
      }else{
        this.data.limit = this.data.sysCount - this.data.announcementSession.length;
      }
      announcementService.getAnnouncementList(this.data.limit, this.data.offset).then(res => {
        wx.hideLoading();
        if (res.data.errcode === 0) {
          this.data.offset = this.data.offset + 1;
          let data = res.data.body.rows;
          this.data.announcementSession = this.data.announcementSession.concat(data);
          if (data.length > 0) {
            this.queryAnnouncement();
          }
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          console.log(res);
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        console.log(err);
      })
    }else{
      wx.hideLoading();
      tooltips.showToast('没有更多数据', '', '');
    }
    
  },

  queryAnnouncement: function (event) {
    if (event){
      this.data.queryText = event.detail.value;
    }
    if (this.data.queryText) {
      this.setData({
        announcementList: this.data.announcementSession.filter(announcement => {
          return announcement.GGXX_GGBT.value.toLowerCase().indexOf(this.data.queryText) > -1;
        })
      })
      if (this.data.announcementSession.length < this.data.sysCount) {
        this.getAnnouncementMoreList();
      }
    } else {
      this.setData({
        announcementList: this.data.announcementSession
      })
    }
  },

  goToAnnouncementDetail: function(event) {
    wx.navigateTo({
      url: '../announcement-detail/announcement-detail?data=' + JSON.stringify(event.currentTarget.dataset.item),
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
    return {
      title: '罗想云',
      path: '/pages/login/login'
    }
  }
})