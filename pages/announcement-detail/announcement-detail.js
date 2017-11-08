// pages/announcement-detail/announcement-detail.js
var moment = require('../../utils/moment.js');

Page({

  data: {
    noticeTitle: '',
    noticeContent: '',
    noticekind: '',
    staydays: '',
    publisher: '',
    publishdate: '',
    maintain: '',
    maintaindate: ''
  },

  onLoad: function (options) {
    this.setData({
      noticeTitle: options.title,
      noticeContent: '  亲爱的同事为增进员工健康管理，预防疾病，公司决定近期安排2016年6月30日前入职的正式员工进行健康体检，为提升体检的交通便利性，就近为大家安排体检机构（体检套餐一致），常熟员工安排在当地美年体检中心、苏州员工在爱康国宾苏州体检中心进行体检；本次体检项目在过往的基础上，另针对男女性及目前较高发的疾病增加了筛查项目；使体检覆盖更全面；详见附件二苏州员工体检安排：7月27日(苏州工业园区东环路1408号东环时代广场)常熟员工体检安排：7月27日(常熟市黄河路22号汇丰时代广场2#楼)',
      noticekind: '信息发布',
      staydays: '180',
      publisher: '昭君',
      publishdate: moment().year() + '-' + (moment().month() - 2) + '-' + moment().date() + ' ' + moment().hour() + ':' + moment().minute() + ':' + moment().second(),
      maintain: '昭君',
      maintaindate: moment().year() + '-' + (moment().month() - 1) + '-' + moment().date() + ' ' + moment().hour() + ':' + moment().minute() + ':' + moment().second()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})