var server = require('./http-service.js');
var wxRequest = require('./wxRequest.js');

var IsGetTodoDetail = Boolean;
var params = '';
var detailcols = {};
var columns = {
  SWLX: { name: "SWLX", type: "String" },
  WFAWT_BEGIN: { name: "WFAWT_BEGIN", type: "String" },
  WFAWT_END: { name: "WFAWT_END", type: "String" },
  WFAWT_INST: { name: "WFAWT_INST", type: "String" },
  WFAWT_PID: { name: "WFAWT_PID", type: "String" },
  WFAWT_PNAME: { name: "WFAWT_PNAME", type: "String" },
  WFAWT_PUSER: { name: "WFAWT_PUSER", type: "String" },
  WFAWT_SUMMARY: { name: "WFAWT_SUMMARY", type: "String" },
  WFAWT_TITLE: { name: "WFAWT_TITLE", type: "String" },
  WFAWT_WFID: { name: "WFAWT_WFID", type: "String" },
  WFDEF_CLASS: { name: "WFDEF_CLASS", type: "String" },
  WFDEF_NAME: { name: "WFDEF_NAME", type: "String" },
  WFLOG_HWAY: { name: "WFLOG_HWAY", type: "String" },
  WFOPT_ZJID: { name: "WFOPT_ZJID", type: "String" }
};

function getTodoTypes() {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 9,
      params: JSON.stringify({
        action: '9'
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function getTodoList(limit, offset, filter){
  let myFilter = filter || {
    myType: 'ALL',
    myDays: 'ALL'
  };
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 3,
      params: JSON.stringify({
        cloumns: columns,
        limit: limit,
        offset: offset,
        myType: myFilter.myType,
        myDays: myFilter.myDays,
        action: 3,
        funtype: 1,
        Condition: ""
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function getTodoDetail(wfid, wfinst, zjid) {
  if ((wfid === 'OA_GZRZ') || (wfid === 'DMG_CPWD') || (wfid === 'CGJS_FKSQ') || (wfid === 'OA_GGXX') || (wfid === 'KQ_GRKQ') || (wfid === 'OA_CCSQ')) {
    IsGetTodoDetail = true;
    params = JSON.stringify({
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      functype: 1,
      action: 7
    });
  } else if (wfid === 'OA_GZJH') {
    IsGetTodoDetail = true;
    detailcols = {
      GCXM_XMMC: { name: "GCXM_XMMC", type: "String" },
      XMRW_SUBJECT: { name: "XMRW_SUBJECT", type: "String" },
      ZJHMX_JHID: { name: "ZJHMX_JHID", type: "String" },
      ZJHMX_LX: { name: "ZJHMX_LX", type: "String" },
      ZJHMX_NR: { name: "ZJHMX_NR", type: "String" },
      ZJHMX_RWZYX: { name: "ZJHMX_RWZYX", type: "String" },
      ZJHMX_SM: { name: "ZJHMX_SM", type: "String" },
      ZJHMX_WCQK: { name: "ZJHMX_WCQK", type: "String" },
      ZJHMX_ZT: { name: "ZJHMX_ZT", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      detailcols: detailcols
    });
  } else if (wfid === 'FYBX_FYBX') {
    IsGetTodoDetail = true;
    detailcols = {
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      FYBXMX_BMID: { name: "FYBXMX_BMID", type: "String" },
      FYBXMX_BXBZ: { name: "FYBXMX_BXBZ", type: "String" },
      FYBXMX_BXDID: { name: "FYBXMX_BXDID", type: "String" },
      FYBXMX_BZ: { name: "FYBXMX_BZ", type: "String" },
      FYBXMX_CDRYID: { name: "FYBXMX_CDRYID", type: "String" },
      FYBXMX_CDWLDW: { name: "FYBXMX_CDWLDW", type: "String" },
      FYBXMX_FPJE: { name: "FYBXMX_FPJE", type: "String" },
      FYBXMX_FYXMID: { name: "FYBXMX_FYXMID", type: "String" },
      FYBXMX_HBID: { name: "FYBXMX_HBID", type: "String" },
      FYBXMX_KJDWID: { name: "FYBXMX_KJDWID", type: "String" },
      FYBXMX_QRBXJE: { name: "FYBXMX_QRBXJE", type: "String" },
      FYBXMX_QSRQ: { name: "FYBXMX_QSRQ", type: "String" },
      FYBXMX_SQBXJE: { name: "FYBXMX_SQBXJE", type: "String" },
      FYBXMX_SQDID: { name: "FYBXMX_SQDID", type: "String" },
      FYBXMX_XH: { name: "FYBXMX_XH", type: "String" },
      FYBXMX_XMID: { name: "FYBXMX_XMID", type: "String" },
      FYBXMX_YSSQJE: { name: "FYBXMX_YSSQJE", type: "String" },
      FYBXMX_YSXMID: { name: "FYBXMX_YSXMID", type: "String" },
      FYBXMX_YSZHID: { name: "FYBXMX_YSZHID", type: "String" },
      FYBXMX_ZZRQ: { name: "FYBXMX_ZZRQ", type: "String" },
      FYXM_XMMC: { name: "FYXM_XMMC", type: "String" },
      GCXM_XMMC: { name: "GCXM_XMMC", type: "String" },
      HB_MC: { name: "HB_MC", type: "String" },
      KJDW_JC: { name: "KJDW_JC", type: "String" },
      RYXX_MC: { name: "RYXX_MC", type: "String" },
      YSXM_MC: { name: "YSXM_MC", type: "String" },
      YSZH_MC: { name: "YSZH_MC", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      detailcols: detailcols
    });
  } else if (wfid === 'XS_SOMXSP') {
    IsGetTodoDetail = true;
    let mastercols = {
      GCXM_XMMC: { name: "GCXM_XMMC", type: "String" },
      KHXX_JC: { name: "KHXX_JC", type: "String" },
      SOMXPS_JHFHRQ: { name: "SOMXPS_JHFHRQ", type: "Date" },
      SOMXPS_PSID: { name: "SOMXPS_PSID", type: "String" },
      SOMXPS_QRFHRQ: { name: "SOMXPS_QRFHRQ", type: "Date" },
      SOMXPS_SOID: { name: "SOMXPS_SOID", type: "String" },
      SOMXPS_WLID: { name: "SOMXPS_WLID", type: "String" },
      SOMXPS_XQSL: { name: "SOMXPS_XQSL", type: "String" },
      SOMXPS_YXFHRQ: { name: "SOMXPS_YXFHRQ", type: "Date" },
      SOMX_HSJE: { name: "SOMX_HSJE", type: "Double" },
      SOMX_HSJG: { name: "SOMX_HSJG", type: "Double" },
      SOMX_WSJE: { name: "SOMX_WSJE", type: "Double" },
      SOMX_WSJG: { name: "SOMX_WSJG", type: "Double" },
      SOMX_ZLH: { name: "SOMX_ZLH", type: "String" },
      WLXX_MC: { name: "WLXX_MC", type: "String" },
      XSYMC: { name: "XSYMC", type: "String" },
      yxxg: { name: "yxxg", type: "Boolean" },
      SOMXPS_BZ: { name: "SOMXPS_BZ", type: "String" }
    };
    detailcols = {
      HQRYMC: { name: "HQRYMC", type: "String" },
      SOMXHQ_HQRQ: { name: "SOMXHQ_HQRQ", type: "String" },
      SOMXHQ_PSID: { name: "SOMXHQ_PSID", type: "String" },
      SOMXHQ_YJ: { name: "SOMXHQ_YJ", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '销售订单审批工作流',
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'CG_POPS') {
    IsGetTodoDetail = true;
    let mastercols = {
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      CGY_MC: { name: "CGY_MC", type: "String" },
      GYSXX_JC: { name: "GYSXX_JC", type: "String" },
      POMX_DDLX: { name: "POMX_DDLX", type: "String" },
      POPS_BZ: { name: "POPS_BZ", type: "String" },
      POPS_POID: { name: "POPS_POID", type: "String" },
      POPS_ZT: { name: "POPS_ZT", type: "String" },
      PO_DDRQ: { name: "PO_DDRQ", type: "String" },
      PO_JHDHRQ: { name: "PO_JHDHRQ", type: "String" },
      PO_JSFS: { name: "PO_JSFS", type: "String" },
      PO_LX: { name: "PO_LX", type: "String" },
      PO_XQRQ: { name: "PO_XQRQ", type: "String" }
    };
    detailcols = {
      POHQ_HQRQ: { name: "POHQ_HQRQ", type: "String" },
      POHQ_YJ: { name: "POHQ_YJ", type: "String" },
      RYXX_MC: { name: "RYXX_MC", type: "String" }
    };
    let detail1cols = {
      POMX_HSJE: { name: "POMX_HSJE", type: "Double" },
      POMX_HSJG: { name: "POMX_HSJG", type: "Double" },
      POMX_WSJE: { name: "POMX_WSJE", type: "Double" },
      POMX_WSJG: { name: "POMX_WSJG", type: "Double" },
      POMX_XQSL: { name: "POMX_XQSL", type: "String" },
      WLXX_GG: { name: "WLXX_GG", type: "String" },
      WLXX_JLDW: { name: "WLXX_JLDW", type: "String" },
      WLXX_MC: { name: "WLXX_MC", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 4,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '采购订单审批工作流',
      mastercols: mastercols,
      detailcols: detailcols,
      detail1cols: detail1cols
    });
  } else if (wfid === 'CGJS_FKJH') {
    IsGetTodoDetail = true;
    detailcols = {
      FKJHMX_BZ: { name: "FKJHMX_BZ", type: "String" },
      FKJHMX_FKDX: { name: "FKJHMX_FKDX", type: "String" },
      FKJHMX_FKLX: { name: "FKJHMX_FKLX", type: "String" },
      FKJHMX_FKZLFHZT: { name: "FKJHMX_FKZLFHZT", type: "String" },
      FKJHMX_JHFKRQ: { name: "FKJHMX_JHFKRQ", type: "String" },
      FKJHMX_JHID: { name: "FKJHMX_JHID", type: "String" },
      FKJHMX_JHJE: { name: "FKJHMX_JHJE", type: "String" },
      FKJHMX_KSQJE: { name: "FKJHMX_KSQJE", type: "String" },
      FKJHMX_LDJE: { name: "FKJHMX_LDJE", type: "String" },
      FKJHMX_LJZFJE: { name: "FKJHMX_LJZFJE", type: "String" },
      FKJHMX_LSH: { name: "FKJHMX_LSH", type: "String" },
      FKJHMX_PJJE: { name: "FKJHMX_PJJE", type: "String" },
      FKJHMX_QKJE: { name: "FKJHMX_QKJE", type: "String" },
      FKJHMX_SERIALNO: { name: "FKJHMX_SERIALNO", type: "String" },
      FKJHMX_SJFKRQ: { name: "FKJHMX_SJFKRQ", type: "String" },
      FKJHMX_SKDWID: { name: "FKJHMX_SKDWID", type: "String" },
      FKJHMX_SKDWMC: { name: "FKJHMX_SKDWMC", type: "String" },
      FKJHMX_SPJE: { name: "FKJHMX_SPJE", type: "String" },
      FKJHMX_XH: { name: "FKJHMX_XH", type: "String" },
      FKJHMX_XJJE: { name: "FKJHMX_XJJE", type: "String" },
      FKJHMX_YFKJE: { name: "FKJHMX_YFKJE", type: "String" },
      FKJHMX_YHZFZT: { name: "FKJHMX_YHZFZT", type: "String" },
      FKJHMX_YSQJE: { name: "FKJHMX_YSQJE", type: "String" },
      FKJHMX_ZFSJ: { name: "FKJHMX_ZFSJ", type: "String" },
      FKJHMX_ZFZT: { name: "FKJHMX_ZFZT", type: "String" },
      FKJHMX_ZT: { name: "FKJHMX_ZT", type: "String" },
      GYSXX_FKBL: { name: "GYSXX_FKBL", type: "String" },
      SFLX_MC: { name: "SFLX_MC", type: "String" }
    }
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '采购订单审批工作流',
      detailcols: detailcols
    });
  } else if (wfid === 'XSJS_QTKPSQ') {
    IsGetTodoDetail = true;
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '其他开票申请审批',
    });
  } else if (wfid === 'XS_FYJHSP') {
    IsGetTodoDetail = true;
    let mastercols = {
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      GCXM_XMMC: { name: "GCXM_XMMC", type: "String" },
      KHXX_JC: { name: "KHXX_JC", type: "String" },
      SOFH_AHTFK: { name: "SOFH_AHTFK", type: "String" },
      SOFH_BZ: { name: "SOFH_BZ", type: "String" },
      SOFH_FHSL: { name: "SOFH_FHSL", type: "Integer" },
      SOFH_HTID: { name: "SOFH_HTID", type: "String" },
      SOFH_JHDD: { name: "SOFH_JHDD", type: "String" },
      SOFH_JHDID: { name: "SOFH_JHDID", type: "String" },
      SOFH_JHFHRQ: { name: "SOFH_JHFHRQ", type: "String" },
      SOFH_LXR: { name: "SOFH_LXR", type: "String" },
      SOFH_QKFH: { name: "SOFH_QKFH", type: "String" },
      SOFH_YSFS: { name: "SOFH_YSFS", type: "String" },
      SOFH_YWRQ: { name: "SOFH_YWRQ", type: "String" },
      XSYMC: { name: "XSYMC", type: "String" }
    };
    detailcols = {
      SOFHMX_JHSL: { name: "SOFHMX_JHSL", type: "Integer" },
      SOFHMX_WLPH: { name: "SOFHMX_WLPH", type: "String" },
      WLXX_GG: { name: "WLXX_GG", type: "String" },
      WLXX_MC: { name: "WLXX_MC", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'XSJS_QTKPSQ') {
    IsGetTodoDetail = true;
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '其他开票申请审批'
    });
  } else if (wfid === 'FYBX_FYDJ') {
    IsGetTodoDetail = true;
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '费用登记'
    });
  } else if (wfid === 'FYBX_WZLYDJ') {
    IsGetTodoDetail = true;
    params = JSON.stringify({
      action: 7,
      functype: 2,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '物资领用登记'
    });
  } else if (wfid === 'CG_XQSQSP') {
    IsGetTodoDetail = true;
    let mastercols = {
      XQSQ_SQDID: { name: "XQSQ_SQDID", type: "String" },
      XQSQ_BMID: { name: "XQSQ_BMID", type: "String" },
      SQBMMC: { name: "SQBMMC", type: "String" },
      XQSQ_CGBMID: { name: "XQSQ_CGBMID", type: "String" },
      XQSQ_SQR: { name: "XQSQ_SQR", type: "String" },
      XQSQ_BZ: { name: "XQSQ_BZ", type: "String" }
    };
    detailcols = {
      XQSQMX_XH: { name: "XQSQMX_XH", type: "Integer" },
      XQSQMX_ZLH: { name: "XQSQMX_ZLH", type: "String" },
      XQSQMX_WLID: { name: "XQSQMX_WLID", type: "String" },
      WLXX_MC: { name: "WLXX_MC", type: "String" },
      XQSQMX_BZ: { name: "XQSQMX_BZ", type: "String" },
      XQSQMX_XQSL: { name: "XQSQMX_XQSL", type: "String" },
      WLXX_JLDW: { name: "WLXX_JLDW", type: "String" },
      XQSQMX_FXQSL: { name: "XQSQMX_FXQSL", type: "String" },
      WLXX_FZJLDW: { name: "WLXX_FZJLDW", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'HCP_ZYFS_YWTC') {
    IsGetTodoDetail = true;
    let mastercols = {
      H_YWTC_TCID: { name: "H_YWTC_TCID", type: "String" },
      H_YWTC_YEAR: { name: "H_YWTC_YEAR", type: "Integer" },
      H_YWTC_MONTH: { name: "H_YWTC_MONTH", type: "Integer" },
      H_YWTC_TCZSL: { name: "H_YWTC_TCZSL", type: "Double" },
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      H_XSTCMX_TCBL: { name: "H_XSTCMX_TCBL", type: "Double" },
      H_XSTCMX_DJBL: { name: "H_XSTCMX_DJBL", type: "Double" },
      H_YWTC_TCZJE: { name: "H_YWTC_TCZJE", type: "Double" }
    };
    detailcols = {
      SOMX_ZLH: { name: "SOMX_ZLH", type: "String" },
      H_YWTCMX_SJXSSBJ: { name: "H_YWTCMX_SJXSSBJ", type: "Double" },
      H_YWTCMX_JBSBJ: { name: "H_YWTCMX_JBSBJ", type: "Double" },
      H_YWTCMX_XSSBJ: { name: "H_YWTCMX_XSSBJ", type: "Double" },
      SOMX_HSJG: { name: "SOMX_HSJG", type: "Double" },
      H_YWTCMX_TCBL: { name: "H_YWTCMX_TCBL", type: "Double" },
      H_YWTCMX_YWTC: { name: "H_YWTCMX_YWTC", type: "Double" },
      H_YWTCMX_CE: { name: "H_YWTCMX_CE", type: "Double" },
      H_YWTCMX_TCZE: { name: "H_YWTCMX_TCZE", type: "Double" },
      H_YWTCMX_SJTCZE: { name: "H_YWTCMX_SJTCZE", type: "Double" },
      H_YWTCMX_BZ: { name: "H_YWTCMX_BZ", type: "String" },
      H_YWTCMX_XH: { name: "H_YWTCMX_XH", type: "Integer" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'FYBX_SWSQ') {
    IsGetTodoDetail = true;
    let mastercols = {
      SWSQ_SWLX: { name: "SWSQ_SWLX", type: "String" },
      SWSQ_SWID: { name: "SWSQ_SWID", type: "String" },
      SWSQ_SQRQ: { name: "SWSQ_SQRQ", type: "Date" },
      SWSQ_QSRQ: { name: "SWSQ_QSRQ", type: "Date" },
      SWSQ_ZZRQ: { name: "SWSQ_ZZRQ", type: "Date" },
      RYXX_MC: { name: "RYXX_MC", type: "String" },
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      SWSQ_CYRYMC: { name: "SWSQ_CYRYMC", type: "String" },
      SWSQ_SQSY: { name: "SWSQ_SQSY", type: "String" },
      SWSQ_ZT: { name: "SWSQ_ZT", type: "String" },
      SWSQ_BZ: { name: "SWSQ_BZ", type: "String" },
      SWSQ_WHR: { name: "SWSQ_WHR", type: "String" },
      SWSQ_WHSJ: { name: "SWSQ_WHSJ", type: "String" },
      SWSQ_WFWUSERNAME: { name: "SWSQ_WFWUSERNAME", type: "String" },
      SWSQ_WFHUSERNAME: { name: "SWSQ_WFHUSERNAME", type: "String" }
    };
    detailcols = {
      SWSQSH_XH: { name: "SWSQSH_XH", type: "Integer" },
      SWSQSH_SHYJSM: { name: "SWSQSH_SHYJSM", type: "String" },
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      RYXX_MC: { name: "RYXX_MC", type: "String" },
      SWSQSH_SHSJ: { name: "SWSQSH_SHSJ", type: "Date" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'FYBX_WZLYSQ') {
    IsGetTodoDetail = true;
    let mastercols = {
      KJDW_JC: { name: "KJDW_JC", type: "String" },
      FYLX_MC: { name: "FYLX_MC", type: "String" },
      WZLYSQ_SWID: { name: "WZLYSQ_SWID", type: "String" },
      WZLYSQ_SQID: { name: "WZLYSQ_SQID", type: "String" },
      WZLYSQ_SQRQ: { name: "WZLYSQ_SQRQ", type: "Date" },
      WZLYSQ_QSRQ: { name: "WZLYSQ_QSRQ", type: "Date" },
      WZLYSQ_ZZRQ: { name: "WZLYSQ_ZZRQ", type: "Date" },
      RYXX_MC: { name: "RYXX_MC", type: "String" },
      BM_BMMC: { name: "BM_BMMC", type: "String" },
      WZLYSQ_SYRYMC: { name: "WZLYSQ_SYRYMC", type: "String" },
      WZLYSQ_SQSY: { name: "WZLYSQ_SQSY", type: "String" },
      WZLYSQ_ZT: { name: "WZLYSQ_ZT", type: "String" },
      WZLYSQ_BZ: { name: "WZLYSQ_BZ", type: "String" },
      WZLYSQ_LYDID: { name: "WZLYSQ_LYDID", type: "String" },
      WZLYSQ_WHR: { name: "WZLYSQ_WHR", type: "String" },
      WZLYSQ_WHSJ: { name: "WZLYSQ_WHSJ", type: "Date" },
      WZLYSQ_WFWUSERNAME: { name: "WZLYSQ_WFWUSERNAME", type: "String" },
      WZLYSQ_WFHUSERNAME: { name: "WZLYSQ_WFHUSERNAME", type: "String" }
    };
    detailcols = {
      WZLYSQMX_XH: { name: "WZLYSQMX_XH", type: "Integer" },
      WZLYSQMX_WLXX: { name: "WZLYSQMX_WLXX", type: "String" },
      WZLYSQMX_ZLH: { name: "WZLYSQMX_ZLH", type: "String" },
      WZLYSQMX_XQSL: { name: "WZLYSQMX_XQSL", type: "Double" },
      WZLYSQMX_XQRQ: { name: "WZLYSQMX_XQRQ", type: "Date" },
      WZLYSQMX_BZ: { name: "WZLYSQMX_BZ", type: "String" }
    };
    params = JSON.stringify({
      action: 7,
      functype: 3,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      mastercols: mastercols,
      detailcols: detailcols
    });
  } else if (wfid === 'HCP_ZYFS_SOFKTJBG') {
    IsGetTodoDetail = true;
    let mastercols = {};
    detailcols = {};
    let detail1cols = {};
    params = JSON.stringify({
      action: 7,
      functype: 4,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '订单付款条件变更工作流',
      mastercols: mastercols,
      detailcols: detailcols,
      detail1cols: detail1cols
    });
  } else if (wfid === 'HCP_ZYFS_XSSK') {
    IsGetTodoDetail = true;
    let mastercols = {};
    detailcols = {};
    let detail1cols = {};
    params = JSON.stringify({
      action: 7,
      functype: 4,
      wfid: wfid,
      wfinst: wfinst,
      zjid: zjid,
      title: '住友销售收款工作流',
      mastercols: mastercols,
      detailcols: detailcols,
      detail1cols: detail1cols
    });
  } else {
    IsGetTodoDetail = false;
  }
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 7,
      params: params
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  if (IsGetTodoDetail) {
    return wxRequest.wxRequest(requestObject)
  }else{
    return new Promise((resolve, reject) => {
      reject('no reshareapi');
    });
  }
}

function getFlowInfo(wfid, wfinst){
  let columnss = {
    USERS_NAME: { name: "USERS_NAME", type: "String" },
    WFLOG_COMMENT: { name: "WFLOG_COMMENT", type: "String" },
    WFLOG_HUSERID: { name: "WFLOG_HUSERID", type: "String" },
    WFLOG_HWAY: { name: "WFLOG_HWAY", type: "String" },
    WFLOG_REND: { name: "WFLOG_REND", type: "String" }
  };
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 3,
      params: JSON.stringify({
        wfid: wfid,
        wfinst: wfinst,
        action: 3,
        funtype: 11,
        cloumns: columns
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function getHandleContent(task_classid, task_statusid, task_id, task_inst, task_proctype) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 31,
      params: JSON.stringify({
        task_classid: task_classid,
        task_statusid: task_statusid,
        task_id: task_id,
        task_inst: task_inst,
        task_proctype: task_proctype,
        action: '31'
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

function doSubmit(params){
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 4,
      params: JSON.stringify({
        task_classid: params.task_classid,
        task_statusid: params.task_statusid,
        task_id: params.task_id,
        task_inst: params.task_inst,
        task_proctype: params.task_proctype,
        task_nextsid: params.task_nextsid,
        comment: params.comment,
        nextusers: params.nextusers,
        action: '4'
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded; charset=GB2312', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

module.exports = {
  getTodoTypes: getTodoTypes,
  getTodoList: getTodoList,
  getTodoDetail: getTodoDetail,
  getFlowInfo: getFlowInfo,
  getHandleContent: getHandleContent,
  doSubmit: doSubmit
}