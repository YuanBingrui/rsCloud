// pages/todo/todo.js
var search = require('../common/search/search.js');
var moment = require('../../utils/moment.js');
var momentPipe = require('../../utils/moment-pipe.js');
var todoService = require('../../service/todo-service.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');
var wxRequest = require('../../service/wxRequest.js');

Page({

  data: {
    todos: [],
    todoSession: [],
    queryText: '',
    limit: 10,
    offset: 1,
    sysCount: Number,
    filter: {
      myType: 'ALL',
      myDays: 'ALL'
    },
    todoTypes: [],
    searchStyle: search.initData(),
    showModal: false,
    modalList: [],
    myDaysList: [{ wFAWT_WFID: 'ALL', wFDEF_NAME: '全部' }, { wFAWT_WFID: '7', wFDEF_NAME: '一周内' },{ wFAWT_WFID: '10', wFDEF_NAME: '10天内' }, { wFAWT_WFID: '20', wFDEF_NAME: '20天内' }, { wFAWT_WFID: '30', wFDEF_NAME: '30天内' }],
    dataType: ''
  },

  onLoad: function (options) {
    this.getTodoTypes(); 
  },

  onShow: function () {
    this.getTodoTypes();
    console.log(getCurrentPages())
  },

  onPullDownRefresh: function () {
    console.log('pull')
    tooltips.showLoading('loadding');
    this.getTodoList();
  },

  onReachBottom: function () {
    this.getTodoMoreList();
    console.log('bottom');
  },

  getTodoTypes: function() {
    todoService.getTodoTypes().then((res) => {
      if (res.data && res.data.body === undefined) {
        this.setData({
          todoTypes: [{
            Type: '类别',
            wFAWT_WFID: 'ALL',
            wFDEF_NAME: '全部工作流'
          }]
        })
      }else{
        this.setData({
          todoTypes: res.data.body
        })
        wxRequest.wxGetStorage('rshareTodoFilter').then(rshareTodoFilter => {
          if (rshareTodoFilter) {
            this.setData({
              filter: rshareTodoFilter.data
            })
            let a = this.data.todoTypes.filter(one => one.wFAWT_WFID === this.data.filter.myType);
            if (a.length === 0) {
              this.setData({
                filter: {
                  myType: 'ALL',
                  myDays: 'ALL'
                }
              })
            }
          }
          this.getTodoList();
        }).catch(err => {
          console.log(err)
          console.log(this.data.filter)
          this.getTodoList();
        });
      }
      console.log(this.data.todoTypes)
    }).catch(err => {
      tooltips.showToast(err, '', '../../image/fail.png');
      console.log(err)
    })
  },

  getTodoList: function() {
    console.log(this.data.filter)
    this.data.offset = 1;
    this.data.limit = 10;
    todoService.getTodoList(this.data.limit, this.data.offset, this.data.filter).then((res) => {
      wx.hideLoading();
      if (res.data.errcode === 0) {
        console.log(res.data)
        this.data.sysCount = res.data.body.userdata["sys.count"];
        this.data.offset = this.data.offset + 1;
        let todoData = tooltips.rowsDataTrimValueProperty(res.data.body.rows);
        this.data.todoSession = [].concat(momentPipe.timeformatPipe(todoData, 'todo'));
        if (todoData.length > 0) {
          this.queryTodos();
        } else {
          this.setData({
            todos: []
          })
        }
      }else{
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
        console.log(res);
      }
      wx.stopPullDownRefresh();
    }).catch(err => {
      wx.hideLoading();
      tooltips.showToast(err, '', '../../image/fail.png');
      wx.stopPullDownRefresh();
      console.log(err)
    })
  },

  getTodoMoreList: function () {
    tooltips.showLoading('loadding');
    if (this.data.todoSession.length < this.data.sysCount) {
      if (this.data.sysCount - this.data.todoSession.length >= 10) {
        this.data.limit = 10;
      } else {
        this.data.limit = this.data.sysCount - this.data.todoSession.length;
      }
      todoService.getTodoList(this.data.limit, this.data.offset, this.data.filter).then(res => {
        wx.hideLoading();
        if (res.data.errcode === 0) {
          this.data.offset = this.data.offset + 1;
          let todoData = tooltips.rowsDataTrimValueProperty(res.data.body.rows);
          this.data.todoSession = this.data.todoSession.concat(momentPipe.timeformatPipe(todoData, 'todo'));
          if (todoData.length > 0) {
            this.queryTodos();
          }
        } else {
          tooltips.showToast(res.data.desc, '', '../../image/fail.png');
          console.log(res);
        }
      }).catch(err => {
        tooltips.showToast(err, '', '../../image/fail.png');
        console.log(err);
      })
    } else {
      wx.hideLoading();
      tooltips.showToast('没有更多数据', '', '');
    }
  },

  queryTodos: function (event) {
    if (event) {
      this.data.queryText = event.detail.value;
    }
    if (this.data.queryText) {
      this.setData({
        todos: this.data.todoSession.filter(todo => {
          return ((todo.WFDEF_NAME.toLowerCase().indexOf(this.data.queryText) > -1) || (todo.WFAWT_TITLE.toLowerCase().indexOf(this.data.queryText) > -1));
        })
      })
      if (this.data.todoSession.length < this.data.sysCount) {
        this.getTodoMoreList();
      }
    } else {
      this.setData({
        todos: this.data.todoSession
      })
    }
  },

  goToTodoDetail: function (event) {
    wx.navigateTo({
      url: '../todo-detail/todo-detail?todo=' + JSON.stringify(event.currentTarget.dataset.item)
    })
  },  

  addSearchBoxStyle: function (event) {
    this.setData({
      searchStyle: search.addSearchBoxStyle()
    })
  },

  delSearchBoxStyle: function (event) {
    this.setData({
      searchStyle: search.delSearchBoxStyle()
    })
  },

  /* my-modal */
  showModal: function(event){
    this.isChecked(this.data.filter);
    if (event.currentTarget.dataset.type === "category"){
      this.setData({
        modalList: this.data.todoTypes,
        dataType: event.currentTarget.dataset.type
      })
    }else{
      this.setData({
        modalList: this.data.myDaysList,
        dataType: event.currentTarget.dataset.type
      })
    }
    if (this.data.showModal){
      this.setData({
        showModal: false
      })
    }else{
      this.setData({
        showModal: true
      })
    }
  },

  cancel: function(){
    this.setData({
      showModal: false
    })
  },

  confirm: function(){
    this.setData({
      showModal: false
    })
    wx.setStorage({
      key: "rshareTodoFilter",
      data: this.data.filter
    })
    //wx.startPullDownRefresh();
    this.getTodoList();
  },

  radioChange: function(event){
    if (this.data.dataType === "category"){
      this.setData({
        'filter.myType': event.detail.value
      })
    }else{
      this.setData({
        'filter.myDays': event.detail.value
      })
    }
  },

  isChecked: function(filter){
    let that = this;
    this.data.todoTypes.forEach((todotype, index1) => {
      if (todotype.isChecked){
        if (todotype.wFAWT_WFID !== filter.myType) {
          this.data.todoTypes[index1] = { wFAWT_WFID: todotype.wFAWT_WFID, wFDEF_NAME: todotype.wFDEF_NAME, isChecked: false }
        }
      } else if (todotype.wFAWT_WFID === filter.myType){
        this.data.todoTypes[index1] = { wFAWT_WFID: todotype.wFAWT_WFID, wFDEF_NAME: todotype.wFDEF_NAME, isChecked: true }
      }
    })
    this.data.myDaysList.forEach((daytype, index2) => {
      if (daytype.isChecked) {
        if (daytype.wFAWT_WFID !== filter.myDays) {
          this.data.myDaysList[index2] = { wFAWT_WFID: daytype.wFAWT_WFID, wFDEF_NAME: daytype.wFDEF_NAME, isChecked: false }
        }
      } else if (daytype.wFAWT_WFID === filter.myDays) {
        this.data.myDaysList[index2] = { wFAWT_WFID: daytype.wFAWT_WFID, wFDEF_NAME: daytype.wFDEF_NAME, isChecked: true }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})