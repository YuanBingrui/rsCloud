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

function rowsDataTrimValueProperty(rows) {
  if (Array.isArray(rows) && rows.length > 0) {
    let result = [];
    rows.forEach(item => {
      let newItem = {};
      for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
          newItem[prop] = item[prop].value;
        }
      }
      result.push(newItem);
    });
    return result;
  }else{
    return rows;
  }
}

module.exports = {
  showToast: showToast,
  showLoading: showLoading,
  showModal: showModal,
  rowsDataTrimValueProperty: rowsDataTrimValueProperty
}