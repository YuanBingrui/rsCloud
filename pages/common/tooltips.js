function showToast(title,icon,image){
  wx.showToast({
    title: title,
    icon: icon,
    image: image,
    mask: true,
    duration: 2000
  })
}

function showModal(){
  wx.showModal({
    title: '',
    content: '',
    showCancel: true,
    cancelText: '',
    cancelColor: '',
    confirmText: '',
    confirmColor: ''
  })
}

module.exports = {
  showToast: showToast,
  showModal: showModal
}