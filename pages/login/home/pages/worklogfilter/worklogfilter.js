// worklogfilter.js
var moment = require('../../../../../utils/moment.js')

Page({
  data: {
    items: [{ value: 'I', name: '待我处理' },
            { value: 'F', name: '我已处理' }],
    startdate: '',
    enddate: ''
  },

  onLoad: function (options) {
    this.initDate()
  },

  initDate: function(){
    this.setData({
      startdate: moment().year() + '-' + (moment().month() + 1) + '-01',
      enddate: moment().year() + '-' + (moment().month() + 1) + '-' + moment().daysInMonth()
    })
  },

  startDateChange: function (event) {
    this.setData({
      startdate: event.detail.value
    })
  },

  endDateChange: function (event) {
    this.setData({
      enddate: event.detail.value
    })
  },

  radioChange: function(event){
    console.log(event.detail.value)
  },

  formReset: function(){
    this.initDate()
  }

})