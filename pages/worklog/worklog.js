// pages/worklog/worklog.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var worklogService = require('../../service/worklog-service.js');

Page({
  data: {
    limit: 10,
    offset: 1,
    filter: {
      wfwork: 'H',
      qsgzrq: moment().startOf('month').format('YYYY-MM-DD'),
      zzgzrq: moment().endOf('month').format('YYYY-MM-DD')
    },
    logList: []
  },

  onLoad: function (options) {
    this.getWorklogList();
  },

  getWorklogList: function () {
    worklogService.getWorklogList(this.data.limit, this.data.offset, this.data.filter.wfwork, this.data.filter.qsgzrq, this.data.filter.zzgzrq).then(res => {
      if (res.data.errcode === 0) {
        console.log(res);
      } else {
        console.log(res);
      }
    }).catch(err => {
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})