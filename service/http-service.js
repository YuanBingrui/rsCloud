var serverPrefix = "https://oa.roadshare.com/rshare"

function changeServer(newServer){
  this.serverPrefix = newServer
}

module.exports = {
  serverPrefix: serverPrefix,
  changeServer: changeServer
}