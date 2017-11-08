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

module.exports = {
  getWorklogList: getWorklogList
}