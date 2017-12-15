var moment = require('./moment.js');

function transform(listDateTime, component) {
  listDateTime = listDateTime + ''; // make sure it's a string
  let nowDate = moment().format('YYYY/M/D');
  let listDate = moment(listDateTime).format('YYYY/M/D');
  // 当天的数据，显示几点几分『x:xx』
  if (moment(nowDate).isSame(listDate)) {
    return ('worklog' === component) ? '今天' : moment(listDateTime).format('H:mm');
  }
  // 昨天的数据，显示『昨天』
  else if (moment(moment(nowDate).subtract(1, 'days')).isSame(listDate)) {
    return '昨天';
  }
  // 一周之内非两天内的数据，显示『星期x』
  else if (moment(listDateTime).isBetween(moment(nowDate).subtract(7, 'days'), moment(nowDate).subtract(1, 'days'), 'day')) {
    return getWeekCN(moment(listDate).isoWeekday());
  }
  // 一周之前的数据
  else {
    // 当年的显示月日『x/x』
    if (moment(nowDate).isSame(listDate, 'year')) {
      return moment(listDateTime).format('M/D');
    }
    // 其他显示年月日【xxxx/x/x】
    return listDate;
  }
}

function meridiem(datetime) {
  let hour = moment(datetime).hour();
  let minute = moment(datetime).minute();
  if (hour < 9) {
    return "早上";
  } else if (hour < 11 && minute < 30) {
    return "上午";
  } else if (hour < 13 && minute < 30) {
    return "中午";
  } else if (hour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}

function getWeekCN(weekday) {
  let result = '';
  switch (weekday) {
    case 1:
      result = '星期一';
      break;
    case 2:
      result = '星期二';
      break;
    case 3:
      result = '星期三';
      break;
    case 4:
      result = '星期四';
      break;
    case 5:
      result = '星期五';
      break;
    case 6:
      result = '星期六';
      break;
    case 7:
      result = '星期日';
      break;
  }
  return result;
}

function timeformatPipe(listarr, component) {
  switch (component) {
    case 'worklog':
      return listarr.filter((one) => {
        return one.GZRZ_GZRQ = transform(one.GZRZ_GZRQ, component)
      })
      break;
    case 'todo':
      return listarr.filter((one) => {
        return one.WFAWT_BEGIN = transform(one.WFAWT_BEGIN, component)
      })
      break;
    // case 'announcement':
    //   return listarr.filter((one) => {
    //     return one.GGXX_WHR = transform(one.GGXX_WHR, component)
    //   })
    //   break;
  }
  
}

module.exports = {
  timeformatPipe: timeformatPipe
}