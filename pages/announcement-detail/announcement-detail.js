// pages/announcement-detail/announcement-detail.js
var moment = require('../../utils/moment.js');
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  data: {
    announcementItem: {},
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
      announcementItem: JSON.parse(options.data)  
    });
    WxParse.wxParse('announcementContent', 'html', this.data.announcementItem.GGXX_GGNR.value, that);
  },

  onShareAppMessage: function () {
    return {
      title: '罗想云',
      path: '/pages/login/login'
    }
  }
})