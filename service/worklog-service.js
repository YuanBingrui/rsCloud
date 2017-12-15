var server = require('./http-service.js');
var wxRequest = require('./wxRequest.js');

var logColumns = {
  GZRZ_RZID: { name: "GZRZ_RZID", type: "String" },
  GZRZ_GZRQ: { name: "GZRZ_GZRQ", type: "String" },
  GZRZ_GS: { name: "GZRZ_GS", type: "String" },
  GZRZ_ZT: { name: "GZRZ_ZT", type: "String" },
  GZRZ_RZNR: { name: "GZRZ_RZNR", type: "String" },
  GZRZ_BZ: { name: "GZRZ_BZ", type: "String" },
  GZRZ_WHRID: { name: "GZRZ_WHRID", type: "String" },
  GZRZ_WHR: { name: "GZRZ_WHR", type: "String" },
  GZRZ_WHSJ: { name: "GZRZ_WHSJ", type: "String" },
  GZRZ_WFPID: { name: "GZRZ_WFPID", type: "String" },
  GZRZ_WFPNAME: { name: "GZRZ_WFPNAME", type: "String" },
  GCXM_XMMC: { name: "GCXM_XMMC", type: "String" },
  XMRW_SUBJECT: { name: "XMRW_SUBJECT", type: "String" },
  GZRZ_JHID: { name: "GZRZ_JHID", type: "String" },
  GZRZ_FL: { name: "GZRZ_FL", type: "String" }
};

var planColumns = {
  ZJH_JHID: { name: "ZJH_JHID", type: "String" },
  ZJHMX_RWZYX: { name: "ZJHMX_RWZYX", type: "String" },
  ZJHMX_NR: { name: "ZJHMX_NR", type: "String" }
};

function getWorklogList(limit, offset, wfwork, qsgzrq, zzgzrq) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2003,
      params: JSON.stringify({
        cloumns: logColumns,
        limit: limit,
        offset: offset,
        action: 2003,
        funtype: 2,
        wfwork: wfwork,
        qsgzrq: qsgzrq,
        zzgzrq: zzgzrq
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}


function getWorkPlan(workDate) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2002,
      params: JSON.stringify({
        cloumns: planColumns,
        action: 2002,
        funtype: 1,
        gzrq: workDate
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function insertWorklog(worklogContent){
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2001,
      params: JSON.stringify({
        action: 2001,
        czlx: 'I',
        data: {
          GZRZ_RZID: '',
          GZRZ_GZRQ: worklogContent.GZRZ_GZRQ,
          GZRZ_GS: worklogContent.GZRZ_GS,
          GZRZ_ZT: worklogContent.GZRZ_ZT,
          GZRZ_RZNR: worklogContent.GZRZ_RZNR,
          GZRZ_BZ: worklogContent.GZRZ_BZ,
          GZRZ_FL: worklogContent.GZRZ_FL,
          GZRZ_JHID: worklogContent.GZRZ_JHID
        }
      })
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=GB2312','Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function editWorklog(worklogContent) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2001,
      params: JSON.stringify({
        action: 2001,
        czlx: 'U',
        data: {
          GZRZ_RZID: worklogContent.GZRZ_RZID,
          GZRZ_GZRQ: worklogContent.GZRZ_GZRQ,
          GZRZ_GS: worklogContent.GZRZ_GS,
          GZRZ_ZT: worklogContent.GZRZ_ZT,
          GZRZ_RZNR: worklogContent.GZRZ_RZNR,
          GZRZ_BZ: worklogContent.GZRZ_BZ,
          GZRZ_FL: worklogContent.GZRZ_FL,
          GZRZ_JHID: worklogContent.GZRZ_JHID
        }
      })
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=GB2312', 'Cookie': wx.getStorageSync('cookie')
    },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function deleteWorklog(worklogContent) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 2001,
      params: JSON.stringify({
        action: 2001,
        czlx: 'D',
        data: {
          GZRZ_RZID: worklogContent.GZRZ_RZID,
          GZRZ_GZRQ: '',
          GZRZ_GS: '',
          GZRZ_ZT: '',
          GZRZ_RZNR: '',
          GZRZ_BZ: '',
          GZRZ_FL: '',
          GZRZ_JHID: ''
        }
      })
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie')
    },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

module.exports = {
  getWorklogList: getWorklogList,
  getWorkPlan: getWorkPlan,
  insertWorklog: insertWorklog,
  editWorklog: editWorklog,
  deleteWorklog: deleteWorklog
}