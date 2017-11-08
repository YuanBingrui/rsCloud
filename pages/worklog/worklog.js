// pages/worklog/worklog.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var worklogService = require('../../service/worklog-service.js');
var tooltips = require('../common/tooltips.js');

Page({
  data: {
    limit: 10,
    offset: 1,
    filter: {
      wfwork: 'H',
      qsgzrq: moment().startOf('month').format('YYYY-MM-DD'),
      zzgzrq: moment().endOf('month').format('YYYY-MM-DD')
    },
    worklogList: [],
    worklogListSession: [],
    queryText: String,
    sysCount: Number,
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    this.getWorklogList();
    wx.startPullDownRefresh();
  },

  onPullDownRefresh: function () {
    tooltips.showLoading('loadding');
    this.getWorklogList();
  },

  onReachBottom: function () {
    this.getWorklogMoreList();
    console.log('bottom');
  },

  getWorklogList: function () {
    this.data.offset = 1;
    worklogService.getWorklogList(this.data.limit, this.data.offset, this.data.filter.wfwork, this.data.filter.qsgzrq, this.data.filter.zzgzrq).then(res => {
      if (res.data.errcode === 0) {
        console.log(res.data);
        this.data.sysCount = res.data.body.userdata["sys.count"];
        this.data.offset = this.data.offset + 1;
        let worklogData = res.data.body.rows;
        this.data.worklogListSession = [].concat(worklogData);
        if (worklogData.length > 0) {
          this.queryWorklog();
        } else {
          this.data.worklogList = [];
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

  getWorklogMoreList: function () {
    tooltips.showLoading('loadding');
    if (this.data.worklogListSession.length < this.data.sysCount) {
      if (this.data.sysCount - this.data.worklogListSession.length >= 10) {
        this.data.limit = 10;
      } else {
        this.data.limit = this.data.sysCount - this.data.worklogListSession.length;
      }
      worklogService.getWorklogList(this.data.limit, this.data.offset, this.data.filter.wfwork, this.data.filter.qsgzrq, this.data.filter.zzgzrq).then(res => {
        wx.hideLoading();
        if (res.data.errcode === 0) {
          this.data.offset = this.data.offset + 1;
          let data = res.data.body.rows;
          this.data.worklogListSession = this.data.worklogListSession.concat(data);
          if (data.length > 0) {
            this.queryWorklog();
          }
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          console.log(res);
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        console.log(err);
      })
    } else {
      wx.hideLoading();
      tooltips.showToast('没有更多数据', '', '');
    }

  },

  queryWorklog: function (event) {
    if (event) {
      this.data.queryText = event.detail.value;
    }
    if (this.data.queryText) {
      this.setData({
        worklogList: this.data.worklogListSession.filter(worklog => {
          return worklog.GGXX_GGBT.value.toLowerCase().indexOf(this.data.queryText) > -1;
        })
      })
      if (this.data.worklogListSession.length < this.data.sysCount) {
        this.getWorklogMoreList();
      }
    } else {
      this.setData({
        worklogList: this.data.worklogListSession
      })
    }
  },

  goToWorklogDetail: function (event) {
    wx.navigateTo({
      url: '../worklog-detail/worklog-detail?data=' + JSON.stringify(event.currentTarget.dataset.item),
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

  onShareAppMessage: function () {
    return {
      title: '罗想云',
      path: '/pages/login/login'
    }
  }
})