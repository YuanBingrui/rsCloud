// worklogadd.js
var moment = require('../../../../../utils/moment.js')

Page({
  data: {
    workdate: '',
    worktime: '',
    kind: '',
    workplan: '',
    project: '',
    duty: '',
    topic: '',
    content: '',
    bz: ''
  },

  onLoad: function (options) {
    this.setData({
      workdate: moment().year() + '-' + (moment().month()+1) + '-' + moment().date(),
      worktime: '1',
      kind: 'A',
      workplan: 'planB'
    })
  },

  bindDateChange: function (event){
    this.setData({
      workdate: event.detail.value 
    })
  },

  kindSelect: function(){
    var that = this
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            that.setData({
              kind: 'A'
            })
          break;
          case 1:
            that.setData({
              kind: 'B'
            })
          break;
          case 2:
            that.setData({
              kind: 'C'
            })
          break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  workplanSelect: function(){
    var that = this
    wx.showActionSheet({
      itemList: ['planA', 'planB', 'planC'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            that.setData({
              workplan: 'planA'
            })
            break;
          case 1:
            that.setData({
              workplan: 'planB'
            })
            break;
          case 2:
            that.setData({
              workplan: 'planC'
            })
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})