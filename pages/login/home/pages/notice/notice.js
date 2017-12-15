// notice.js
var moment = require('../../../../../utils/moment.js')
var search = require('../../../../common/search/search.js')

Page({
  data: {
    noticeList: [],
    noticeDate: '',
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    let tempArr = [];
    for (let i = 0; i < 20; i++) {
      tempArr.push({ id: i, value: '电子公告_00' + i, subvalue: '紧急通知！紧急通知！紧急通知！重要的事情说三遍！哈哈哈哈哈哈' + i })
    }
    this.setData({
      noticeList: tempArr,
      noticeDate: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
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
  }

})