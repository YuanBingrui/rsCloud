// tododetail.js
var moment = require('../../../../../utils/moment.js')

Page({
  data: {
    username: '',
    createDate: '',
    status: '',
    startDate: '',
    endDate: '',
    statusName: '',
    departmentName: '',
    dclr: '',
    bz: '',
    mxmc: '',
    mxXmss: '',
    mxContent: '',
    mxKind: '',
    mxStatus: ''
  },

  onLoad: function (options) {
    this.setData({
      username: '独孤求败',
      createDate: moment().year() + '-' + (moment().month() - 4) + '-' + moment().date() + ' ' + moment().hour() + ':' + moment().minute() + ':' + moment().second(),
      status: '执行',
      startDate: moment().year() + '-' + (moment().month() - 4) + '-' + moment().date(),
      endDate: moment().year() + '-' + (moment().month() - 2) + '-' + moment().date(),
      statusName: '执行',
      departmentName: '云平台开发部',
      dclr: '孤独求败',
      bz: '无',
      mxmc: '奥玛斯电梯（苏州）有限公司',
      mxXmss: '一般',
      mxContent: '功能优化及后期维护',
      mxKind: '计划',
      mxStatus: '未完成'
    })
    this.setNaivgationBarTitle(options.title)
  },

  setNaivgationBarTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }
})