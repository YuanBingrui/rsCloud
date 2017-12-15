// pages/worklog-detail/worklog-detail.js
var moment = require('../../utils/moment.js');
var worklogService = require('../../service/worklog-service.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');

Page({
  data: {
    worklogDetail: {
      action: String,
      data: Object
    },
    showFlag: Boolean,
    showFlag2: Boolean, 
    worklogContent: {},
    flArr: [{id: 'N', value: '内勤'}, {id: 'W', value: '外勤'}],
    flIndex: 0,
    workPlanList: [{
      GCXM_XMMC: String,
      XMRW_SUBJECT: String,
      ZJHMX_NR: String,
      ZJHMX_RWZYX: String,
      ZJH_JHID: String,
      SHOW_VALUE: String
    }],
    workplanIndex: 0,
    disabled: Boolean
  },

  onLoad: function (options) {
    console.log(JSON.parse(options.worklogDetail));
    this.setData({
      'worklogDetail.action': JSON.parse(options.worklogDetail).action,
    })
    if (this.data.worklogDetail.action === 'readOnly'){
      this.setData({
        worklogContent: JSON.parse(options.worklogDetail).data,
        disabled: true,
        showFlag: true,
        showFlag2: true
      })
      this.setNaivgationBarTitle('日志');
    } else if (this.data.worklogDetail.action === 'insert'){
      this.setData({
        disabled: false,
        showFlag: false,
        showFlag2: false,
        worklogContent: {
          GZRZ_GZRQ: moment().format('YYYY-MM-DD'),
          GZRZ_GS: 1,
          GZRZ_FL: 'N',
          GZRZ_WFPNAME: '',
          GZRZ_ZT: '',
          GZRZ_RZNR: '',
          GZRZ_WHR: '',
          GZRZ_WHSJ: '',
          GZRZ_BZ: '',
          GZRZ_JHID: '',
          GCXM_XMMC: '',
          XMRW_SUBJECT: ''
        }
      })
      this.setNaivgationBarTitle('新增日志');
    }
    this.getWorkPlan();
    this.selectedValue('f1');
    this.selectedValue('workplan');
    console.log(this.data.worklogDetail.action);
  },

  getWorkPlan: function() {
    worklogService.getWorkPlan(this.data.worklogContent.GZRZ_GZRQ).then(res => {
      if (res.data.errcode === 0) {
        let dataRows = tooltips.rowsDataTrimValueProperty(res.data.body.rows);
        console.log(dataRows);
        if (dataRows.length > 0){
          for (let i = 0; i < dataRows.length; i++) {
            this.data.workPlanList[i] = dataRows[i];
            this.data.workPlanList[i].SHOW_VALUE = dataRows[i].ZJHMX_RWZYX + ':' + dataRows[i].ZJHMX_NR;
          }
          this.setData({
            workPlanList: this.data.workPlanList
          })
        }else{
          this.setData({
            workPlanList: [{
              GCXM_XMMC: String,
              XMRW_SUBJECT: String,
              ZJHMX_NR: String,
              ZJHMX_RWZYX: String,
              ZJH_JHID: String,
              SHOW_VALUE: String
            }],
            'worklogContent.GZRZ_JHID': '',
            'worklogContent.GCXM_XMMC': '',
            'worklogContent.XMRW_SUBJECT': ''
          })
        }
        this.pickerChange();
        console.log(this.data.workPlanList);
      }else{
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err);
    })
  },

  selectedValue: function(category) {
    let that = this;
    if (category === 'fl'){
      this.data.flArr.filter((flone, index) => {
        if (flone.id === that.data.worklogContent.GZRZ_FL) {
          that.setData({
            flIndex: index
          })
        }
      })
    }else{
      this.data.workPlanList.filter((workplan, index) => {
        if (workplan.ZJH_JHID === that.data.worklogContent.GZRZ_JHID) {
          that.setData({
            workplanIndex: index
          })
        }
      })
    }
  },

  changeDatetime: function() {
    this.setData({
      'worklogContent.GZRZ_GZRQ': JSON.parse(event.data).data.data.data.data.detail.value
    })
    this.getWorkPlan();
    this.selectedValue('workplan');
  },

  pickerChange: function(event) {
    if(event){
      if (event.currentTarget.dataset.type === 'fl') {
        this.setData({
          flIndex: event.detail.value,
          'worklogContent.GZRZ_FL': this.data.flArr[event.detail.value].id
        })
      } else {
        this.setData({
          workplanIndex: event.detail.value,
          'worklogContent.GZRZ_JHID': this.data.workPlanList[event.detail.value].ZJH_JHID
        })
      }
    }else{
      this.setData({
        'worklogContent.GZRZ_JHID': this.data.workPlanList[this.data.workplanIndex].ZJH_JHID,
        'worklogContent.GCXM_XMMC': this.data.workPlanList[this.data.workplanIndex].GCXM_XMMC,
        'worklogContent.XMRW_SUBJECT': this.data.workPlanList[this.data.workplanIndex].XMRW_SUBJECT
      })
    } 
  },

  applyWorklog: function() {
    this.setData({
      disabled: true
    })
    if (this.data.worklogDetail.action === 'insert') {
      worklogService.insertWorklog(this.data.worklogContent).then(res => {
        if (res.data.errcode === 0) {
          console.log(res.data)
          tooltips.showToast(res.data.desc, '', '');
          wx.navigateBack({
            delta: 1
          })
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          this.setData({
            disabled: false
          })
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        console.log(err);
      })
    } else if (this.data.worklogDetail.action === 'edit') {
      worklogService.editWorklog(this.data.worklogContent).then(res => {
        if (res.data.errcode === 0) {
          console.log(res.data);
          tooltips.showToast(res.data.desc, '', '');
          this.setNaivgationBarTitle('日志');
          this.setData({
            'worklogDetail.action': 'readOnly',
            disabled: true,
            showFlag: true
          })
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          this.setData({
            disabled: false
          })
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        console.log(err);
      })
    }
  },

  dismissWorklog: function() {
    if (this.data.worklogDetail.action === 'insert') {
      wx.navigateBack({
        delta: 1
      })
    } else if(this.data.worklogDetail.action === 'edit'){
      this.setNaivgationBarTitle('日志');
      this.setData({
        'worklogDetail.action': 'readOnly',
        disabled: true,
        showFlag: true
      })
    }
  },

  deleteLog: function() {
    let that = this;
    if (this.data.worklogContent.GZRZ_WFPID === '0000') {
      wx.showModal({
        showCancel: false,
        content: '确定删除该日志？',
        success: function (res) {
          worklogService.deleteWorklog(that.data.worklogContent).then(res => {
            if (res.data.errcode === 0) {
              console.log(res.data);
              wx.navigateBack({
                delta: 1
              })
            } else {
              tooltips.showToast(res.data.desc, '', '../../image/fail.png');
            }
          }).catch(err => {
            tooltips.showToast(err, '', '../../image/fail.png');
            console.log(err);
          })
        }
      })
    } else {
      tooltips.showToast('只有初始状态的日志允许删除！', '', '../../image/fail.png');
    }
  },

  editLog: function() {
    if (this.data.worklogContent.GZRZ_WFPID === '0000') {  
      this.setNaivgationBarTitle('修改日志');
      this.setData({
        'worklogDetail.action': 'edit',
        disabled: false,
        showFlag: false
      })
    } else {
      tooltips.showToast('只有初始状态的日志允许修改！', '', '../../image/fail.png');
    }
  },

  changeValue: function (event) {
    console.log(event.currentTarget.dataset.input)
    switch (event.currentTarget.dataset.input){
      case 'GS':
        this.data.worklogContent.GZRZ_GS = event.detail.value
        break;
      case 'ZT':
        this.data.worklogContent.GZRZ_ZT = event.detail.value
        break;
      case 'NR':
        this.data.worklogContent.GZRZ_RZNR = event.detail.value
        break;
      case 'BZ':
        this.data.worklogContent.GZRZ_BZ = event.detail.value
        break;
    }
  },

  setNaivgationBarTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    })
  },

  onShareAppMessage: function() {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})