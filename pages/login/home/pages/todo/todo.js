// todo.js
var moment = require('../../../../../utils/moment.js')
var search = require('../../../../common/search/search.js')
var todoService = require('../../../../../service/todo-service.js')

Page({
  data: {
    listArr: [],
    date: '',
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    todoService.getTodoList(10, 1).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    let tempArr = [];
    for (let i = 0; i < 20; i++) {
      tempArr.push({ id: i, value: '待办事宜_00' + i, subvalue: 'fhakfasdhfasdfhasjkdfhashdjfas哈哈哈哈哈_00'+i })
    }
    this.setData({
      listArr: tempArr,
      date: moment().year()+'-'+(moment().month()+1)+'-'+moment().date()
    })
  },

  addSearchBoxStyle: function(event){
    this.setData({
      searchStyle: search.addSearchBoxStyle()
    })
  },

  delSearchBoxStyle: function(event){
    this.setData({
      searchStyle: search.delSearchBoxStyle()
    })
  }


})