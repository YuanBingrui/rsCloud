// worklog.js
var moment = require('../../../../../utils/moment.js')
var search = require('../../../../common/search/search.js')

Page({
  data: {
    worklogList: [],
    date: '',
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    let tempArr = [];
    for (let i = 0; i < 20; i++) {
      tempArr.push({ id: i, value: '工作日志_00' + i, subvalue: '今天又是充实的一天，感觉学了好多东西，有点小忙，哈哈哈哈！！！！！' + i })
    }
    this.setData({
      worklogList: tempArr,
      date: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
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

  addWorklog: function(){
    wx.navigateTo({
      url: '../worklogadd/worklogadd',
    })
  },

  filterWorklog: function(){
    wx.navigateTo({
      url: '../worklogfilter/worklogfilter',
    })
  }
})