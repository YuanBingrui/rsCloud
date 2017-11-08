var server = require('./http-service.js');
var wxRequest = require('./wxRequest.js');

var columns = {
  GGFL_FLMC: { name: "GGFL_FLMC", type: "String" },
  GGXX_BLTS: { name: "GGXX_BLTS", type: "String" },
  GGXX_FBDXID: { name: "GGXX_FBDXID", type: "String" },
  GGXX_FBSJ: { name: "GGXX_FBSJ", type: "String" },
  GGXX_GGBT: { name: "GGXX_GGBT", type: "String" },
  GGXX_GGID: { name: "GGXX_GGID", type: "Striing" },
  GGXX_GGNR: { name: "GGXX_GGNR", type: "String" },
  GGXX_WHR: { name: "GGXX_WHR", type: "String" },
  GGXX_WHSJ: { name: "GGXX_WHSJ", type: "String" },
  RYXX_MC: { name: "RYXX_MC", type: "String" }
};

function getAnnouncementList(limit, offset) {
  var requestObject = {
    url: server.serverPrefix + '/rshareapi',
    data: {
      action: 3,
      params: JSON.stringify({
        cloumns: columns,
        limit: limit,
        offset: offset,
        action: 3,
        funtype: 3,
        Condition: ""
      })
    },
    header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': wx.getStorageSync('cookie') },
    method: 'POST'
  }
  return wxRequest.wxRequest(requestObject)
}

module.exports = {
  getAnnouncementList: getAnnouncementList
}