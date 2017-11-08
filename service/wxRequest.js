function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)      
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}

function wxRequest(requestObject) {
  var wxRequest = wxPromisify(wx.request)
  return wxRequest({
    url: requestObject.url,
    method: requestObject.method,
    data: requestObject.data,
    header: requestObject.header
  })
}

function wxGetStorage(key){
  var wxGetStorage = wxPromisify(wx.getStorage)
  return wxGetStorage({
    key: key
  })
}

module.exports = {
  wxRequest: wxRequest,
  wxGetStorage: wxGetStorage
}