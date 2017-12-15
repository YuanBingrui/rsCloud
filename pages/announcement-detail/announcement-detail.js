// pages/announcement-detail/announcement-detail.js
var moment = require('../../utils/moment.js');
var WxParse = require('../../utils/wxParse/wxParse.js');
var shareMessage = require('../../service/share-message.js');

Page({

  data: {
    announcementItem: {},
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
      announcementItem: JSON.parse(options.data)  
    });
    console.log(JSON.parse(options.data))
    WxParse.wxParse('announcementContent', 'html', this.data.announcementItem.GGXX_GGNR, that);
  },

  onShareAppMessage: function () {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})