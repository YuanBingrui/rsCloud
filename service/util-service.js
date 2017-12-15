function weX5RowsDataTrimValueProperty(rows) {
  if (Array.isArray(rows) && rows.length > 0) {
    let result = [];
    rows.forEach(item => {
      let newItem = {};
      for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
          if (item[prop] && item[prop].value) {
            newItem[prop] = item[prop].value;
          }
        }
      }
      result.push(newItem);
    });
    return result;
  }
  return rows;
}

function weX5MasterDataToObject(master) {
  if (Array.isArray(master) && master.length > 0) {
    let result = {};
    master.forEach(item => {
      result[item.fldid] = item.fldvalue;
    });
    return result;
  }
  return master;
}

function deleteComma(username) {
  return username.replace(/(^\,*)|(\,*$)/g, "");
}

module.exports = {
  weX5RowsDataTrimValueProperty: weX5RowsDataTrimValueProperty,
  weX5MasterDataToObject: weX5MasterDataToObject,
  deleteComma: deleteComma
}