var serverPrefix = "https://www.shangbing.com/wxapp"

function changeServer(newServer){
  this.serverPrefix = newServer
}

module.exports = {
  serverPrefix: serverPrefix,
  changeServer: changeServer
}