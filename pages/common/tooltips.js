function showToast(title,icon,image){
  wx.showToast({
    title: title,
    icon: icon,
    image: image,
    mask: true,
    duration: 2000
  })
}

function showLoading(title){
  wx.showLoading({
    title: title,
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
  showLoading: showLoading,
  showModal: showModal
}