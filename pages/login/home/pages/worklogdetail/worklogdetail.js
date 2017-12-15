// worklogdetail.js
var moment = require('../../../../../utils/moment.js')

Page({
  data: {
    workdate: '',
    worktime: '',
    kind: '',
    workplan: '',
    project: '',
    duty: '',
    status: '',
    maintain: '',
    maintainTime: '',
    topic: '',
    content: '',
    bz: ''
  },

  onLoad: function (options) {
    this.setNaivgationBarTitle(options.title)
    this.setData({
      workdate: moment().year() + '-' + moment().month() + '-' + moment().date(),
      worktime: '1',
      kind: '内勤',
      workplan: '次fsdafgsdgsdfgsdfgdf要：即链app增加新功能',
      project: '罗想云供应链',
      duty: '产品功能开发',
      status: '审核',
      maintain: '康帅博',
      maintainTime: moment().year() + '-' + (moment().month() - 1) + '-' + moment().date() + ' ' + moment().hour() + ':' + moment().minute() + ':' + moment().second(),
      topic: '罗想云微信小程序开发',
      content: '罗想云微信小程序开发',
      bz: '无'
    })
  },

  setNaivgationBarTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }
})