// pages/todo-detail/todo-detail.js
var moment = require('../../utils/moment.js');
var todoService = require('../../service/todo-service.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');
var utilService = require('../../service/util-service.js');

Page({
  data: {
    todo: {},
    showPage: '',
    showBtn: false,
    master: [],
    details: [],
    detail1: [],
    partOneClick: true,
    partTwoClick: false,
    partThreeClick: false
  },

  onLoad: function (options) {
    this.setData({
      todo: JSON.parse(options.todo)
    })
    this.setNaivgationBarTitle(this.data.todo.WFDEF_NAME);
    this.getTodoDetail();
  },

  getTodoDetail: function() {
    let wfid = this.data.todo.WFAWT_WFID;
    if ((wfid === 'OA_GZRZ') || (wfid === 'DMG_CPWD') || (wfid === 'OA_GZJH') || (wfid === 'FYBX_FYBX') || (wfid === 'XS_SOMXSP') || (wfid === 'CG_POPS') || (wfid === 'CGJS_FKSQ') || (wfid === 'OA_GGXX') || (wfid === 'CGJS_FKJH') || (wfid === 'KQ_GRKQ') || (wfid === 'OA_CCSQ') || (wfid === 'XS_FYJHSP') || (wfid === 'CG_XQSQSP') || (wfid === 'HCP_ZYFS_YWTC') || (wfid === 'FYBX_SWSQ') || (wfid === 'FYBX_WZLYSQ') || (wfid === 'HCP_ZYFS_SOFKTJBG') || (wfid === 'HCP_ZYFS_XSSK') || (wfid === 'XSJS_QTKPSQ') || (wfid === 'FYBX_FYDJ') || (wfid === 'FYBX_WZLYDJ')) {
      todoService.getTodoDetail(wfid, this.data.todo.WFAWT_INST, this.data.todo.WFOPT_ZJID).then((res) => {
        if (res.data.errcode === 0) {
          let a = res.data;
          this.setData({
            showPage: wfid
          })
          switch (wfid) {
            case "OA_GZRZ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master)
              })
              this.setData({
                'master.GZRZ_WFHUSERNAME': utilService.deleteComma(this.data.master.GZRZ_WFHUSERNAME)
              })
              break;
            case "DMG_CPWD":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master)
              })
              this.setData({
                'master.CPWD_WFHUSERNAME': utilService.deleteComma(this.data.master.CPWD_WFHUSERNAME)
              })
              break;
            case "XSJS_QTKPSQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.QTKP_WFWUSERNAME': utilService.deleteComma(this.data.master.QTKP_WFWUSERNAME),
                'master.QTKP_WFHUSERNAME': utilService.deleteComma(this.data.master.QTKP_WFHUSERNAME)
              })
              break;
            case "FYBX_FYDJ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.FYDJ_WFWUSERNAME': utilService.deleteComma(this.data.master.FYDJ_WFWUSERNAME),
                'master.FYDJ_WFHUSERNAME': utilService.deleteComma(this.data.master.FYDJ_WFHUSERNAME)
              })
              break;
            case "FYBX_WZLYDJ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.WZLYDJ_WFWUSERNAME': utilService.deleteComma(this.data.master.WZLYDJ_WFWUSERNAME),
                'master.WZLYDJ_WFHUSERNAME': utilService.deleteComma(this.data.master.WZLYDJ_WFHUSERNAME)
              })
              break;
            case "CGJS_FKSQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master)
              })
              this.setData({
                'master.FKSQ_WFWUSERNAME': utilService.deleteComma(this.data.master.FKSQ_WFWUSERNAME),
                'master.FKSQ_WFHUSERNAME': utilService.deleteComma(this.data.master.FKSQ_WFHUSERNAME)
              })
              break;
            case "KQ_GRKQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master)
              })
              break;
            case "OA_CCSQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master)
              })
              break;
            case "OA_GZJH":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.ZJH_WFWUSERNAME': utilService.deleteComma(this.data.master.ZJH_WFWUSERNAME)
              })
              switch (this.data.master.ZJH_ZT) {
                case "P":
                  this.setData({
                    'master.ZJH_ZT': '计划'
                  })
                  break;
                case "S":
                  this.setData({
                    'master.ZJH_ZT': '审批'
                  })
                  break;
                case "E":
                  this.setData({
                    'master.ZJH_ZT': '执行'
                  })
                  break;
                case "F":
                  this.setData({
                    'master.ZJH_ZT': '确认'
                  })
                  break;
                case "C":
                  this.setData({
                    'master.ZJH_ZT': '完成'
                  })
                  break;
              }
              break;
            case "FYBX_FYBX":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.FYBX_WFHUSERNAME': utilService.deleteComma(this.data.master.FYBX_WFHUSERNAME)
              })
              break;
            case "CGJS_FKJH":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.FKJH_WFWUSERNAME': utilService.deleteComma(this.data.master.FKJH_WFWUSERNAME),
                'master.FKJH_WFHUSERNAME': utilService.deleteComma(this.data.master.FKJH_WFHUSERNAME)
              })
              break;
            case "XS_SOMXSP":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              break;
            case "XS_FYJHSP":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              break;
            case "CG_XQSQSP":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              break; 
            case "HCP_ZYFS_YWTC":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              break;
            case "CG_POPS":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows),
                detail1: utilService.weX5RowsDataTrimValueProperty(a.Detail1.rows)
              })
              break;
            case "OA_GGXX":
              //有下载附件需要处理
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master),
                details: a.files[0]
              })
              this.setData({
                'master.GGXX_WFWUSERNAME': utilService.deleteComma(this.data.master.GGXX_WFWUSERNAME),
                'master.GGXX_WFHUSERNAME': utilService.deleteComma(this.data.master.GGXX_WFHUSERNAME)
              })
              break;
            case "FYBX_SWSQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.SWSQ_WFWUSERNAME': utilService.deleteComma(this.data.master.SWSQ_WFWUSERNAME),
                'master.SWSQ_WFHUSERNAME': utilService.deleteComma(this.data.master.SWSQ_WFHUSERNAME)
              })
              break;
            case "FYBX_WZLYSQ":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows)
              })
              this.setData({
                'master.WZLYSQ_WFWUSERNAME': utilService.deleteComma(this.data.master.WZLYSQ_WFWUSERNAME),
                'master.WZLYSQ_WFHUSERNAME': utilService.deleteComma(this.data.master.WZLYSQ_WFHUSERNAME)
              })
              break;
            case "HCP_ZYFS_SOFKTJBG":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows),
                detail1: utilService.weX5RowsDataTrimValueProperty(a.Detail1.rows),
                detail1: this.formatDetail1Data(this.data.details, this.data.detail1)
              })
              this.setData({
                'master.H_SOFKTJBG_WFWUSERNAME': utilService.deleteComma(this.data.master.H_SOFKTJBG_WFWUSERNAME),
                'master.H_SOFKTJBG_WFHUSERNAME': utilService.deleteComma(this.data.master.H_SOFKTJBG_WFHUSERNAME)
              })
              break;
            case "HCP_ZYFS_XSSK":
              this.setData({
                master: utilService.weX5MasterDataToObject(a.Master.rows)[0],
                details: utilService.weX5RowsDataTrimValueProperty(a.Detail.rows),
                detail1: utilService.weX5RowsDataTrimValueProperty(a.Detail1.rows),
                'master.XSSK_BZ': utilService.deleteComma(this.data.master.XSSK_BZ)
              })
              this.setData({
                'master.XSSK_BZ': utilService.deleteComma(this.data.master.XSSK_BZ),
                'master.XSSK_WFWUSERNAME': utilService.deleteComma(this.data.master.XSSK_WFWUSERNAME),
                'master.XSSK_WFHUSERNAME': utilService.deleteComma(this.data.master.XSSK_WFHUSERNAME)
              })
              break;
            default:
              console.log('no type');
          }
          this.setData({
            showBtn: true
          })
        }
      }).catch(err => {
        console.error(err+"get todoDetail failed");
        this.setData({
          showPage: 'default',
          showBtn: true
        })
      })
    } else {
      this.setData({
        showPage: 'default',
        showBtn: true
      })
    }
  },

  doHandle: function() {
    wx.navigateTo({
      url: '../todo-submit/todo-submit?todo=' + JSON.stringify(this.data.todo)
    })
  },

  doClickPartOne: function() {
    if (this.data.partOneClick) {
      this.setData({
        partOneClick: false
      })
    } else {
      this.setData({
        partOneClick: true
      })
    }
  },

  doClickPartTwo: function() {
    if (this.data.partTwoClick) {
      this.setData({
        partTwoClick: false
      })
    } else {
      this.setData({
        partTwoClick: true
      })
    }
  },

  doClickPartThree: function() {
    if (this.data.partThreeClick) {
      this.setData({
        partThreeClick: false
      })
    } else {
      this.setData({
        partThreeClick: true
      })
    }
  },

  formatDetail1Data: function(detail, detail1) {
    let zlhIndex = [];
    let detail1Arr = [];
    detail.forEach((detailValue) => {
      zlhIndex.push(detailValue.SOMX_ZLH);
    })
    zlhIndex.forEach((zlhIndexValue) => {
      let tempArr = { zlhIndex: zlhIndexValue, before: [], after: [] };
      detail1.forEach((detail1Value) => {
        if (zlhIndexValue === detail1Value.SOMX_ZLH) {
          switch (detail1Value.BGBZ) {
            case "变更前":
              tempArr.before.push(detail1Value);
              break;
            case "变更后":
              tempArr.after.push(detail1Value);
              break;
          }
        }
      })
      detail1Arr.push(tempArr);
    })
    return detail1Arr;
  },

  setNaivgationBarTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
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