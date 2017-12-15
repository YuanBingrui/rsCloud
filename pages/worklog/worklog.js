// pages/worklog/worklog.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var momentPipe = require('../../utils/moment-pipe.js');
var worklogService = require('../../service/worklog-service.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');

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
    worklogDetail: {
      action: String,
      data: Object
    },
    searchStyle: search.initData()
  },

  onLoad: function (options) {},

  onShow: function () {
    this.getWorklogList();
    wx.startPullDownRefresh();
    console.log(getCurrentPages())
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
      wx.hideLoading();
      if (res.data.errcode === 0) {
        this.data.sysCount = res.data.body.userdata["sys.count"];
        this.data.offset = this.data.offset + 1;
        let worklogData = tooltips.rowsDataTrimValueProperty(res.data.body.rows);
        this.data.worklogListSession = [].concat(momentPipe.timeformatPipe(worklogData, 'worklog'));
        if (worklogData.length > 0) {
          this.queryWorklog();
        } else {
          this.setData({
            worklogList: []
          })
        }
      } else {
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
      wx.stopPullDownRefresh();
    }).catch(err => {
      wx.hideLoading();
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
          let data = tooltips.rowsDataTrimValueProperty(res.data.body.rows);
          this.data.worklogListSession = this.data.worklogListSession.concat(momentPipe.timeformatPipe(data, 'worklog'));
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
          return worklog.GZRZ_ZT.toLowerCase().indexOf(this.data.queryText) > -1;
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
    this.setData({
      'worklogDetail.action': 'readOnly',
      'worklogDetail.data': event.currentTarget.dataset.item
    });
    wx.navigateTo({
      url: '../worklog-detail/worklog-detail?worklogDetail=' + JSON.stringify(this.data.worklogDetail)
    })
  },

  addWorklog: function () {
    this.setData({
      'worklogDetail.action': 'insert',
      'worklogDetail.data': ''
    });
    wx.navigateTo({
      url: '../worklog-detail/worklog-detail?worklogDetail=' + JSON.stringify(this.data.worklogDetail)
    })
  },

  filterWorklog: function () {
    wx.navigateTo({
      url: '../worklog-filter/worklog-filter?filter=' + JSON.stringify(this.data.filter)
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

  changeFilter: function(filter) {
    this.setData({
      filter: filter
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