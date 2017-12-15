// pages/worklog-filter/worklog-filter.js
var moment = require('../../utils/moment.js');
var shareMessage = require('../../service/share-message.js');

Page({
  data: {
    filter: {
      wfwork: String,
      qsgzrq: String,
      zzgzrq: String
    },
    wfworkStatus: Boolean,
    wfworkArr: [{ value: 'W', name: '待我处理', checked: false }, { value: 'H', name: '我已处理', checked: false }]
  },

  onLoad: function (options) {
    this.setData({
      filter: JSON.parse(options.filter)
    })
    if (this.data.filter.wfwork == 'W'){
      this.setData({
        'wfworkArr[0].checked': true
      })
    }else{
      this.setData({
        'wfworkArr[1].checked': true
      })
    }
  },

  valueChange: function(event) {
    switch (event.currentTarget.dataset.type) {
      case 'WF':
        this.setData({
          'filter.wfwork': event.detail.value
        })
        break;
      case 'QS':
        this.setData({
          'filter.qsgzrq': event.detail.value
        })
        break;
      case 'ZZ':
        this.setData({
          'filter.zzgzrq': event.detail.value
        })
        break;
    }
  },

  confirm: function(){
    let pagesArr = getCurrentPages();
    if (pagesArr.length > 1) {
      let prePage = pagesArr[pagesArr.length - 2];
      prePage.changeFilter(this.data.filter)
    }
    wx.navigateBack({
      delta: 1
    })
  },

  reset: function(){
    this.setData({
      'filter.wfwork': 'H',
      'filter.qsgzrq': moment().startOf('month').format('YYYY-MM-DD'),
      'filter.zzgzrq': moment().endOf('month').format('YYYY-MM-DD'),
      'wfworkArr[0].checked': false,
      'wfworkArr[1].checked': true

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