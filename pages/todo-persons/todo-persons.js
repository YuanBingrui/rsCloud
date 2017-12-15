// pages/todo-persons/todo-persons.js
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');
var utilService = require('../../service/util-service.js');
var search = require('../common/search/search.js');

Page({

  data: {
    queryText: '',
    //新增的bChoosed用来标记默认被选中， bEndChoosed用来标记最终是否选中
    handlePeoples: [],
    personLists: [],
    departmentLists: [],
    roleLists: [],
    //用于存放搜索结果，界面显示的处理对象
    showPersonLists: [],
    showDepartmentLists: [],
    showRoleLists: [],
    personClick: true,
    departmentClick: false,
    roleClick: false,
    searchStyle: search.initData()
  },

  onLoad: function (options) {
    this.data.handlePeoples = JSON.parse(options.handlePersons);
    console.log(this.data.handlePeoples)
    this.sortPersons();
  },

  sortPersons: function() {
    this.data.handlePeoples.forEach(oneperson => {
      if (oneperson.value === 'Y') {
        oneperson.bChoosed = true;
        oneperson.bEndChoosed = true;
        if (oneperson.userType === 'U') {
          this.setData({
            personClick: true
          })
        } else if (oneperson.userType === 'G') {
          this.setData({
            departmentClick: true
          })
        } else if (oneperson.userType === 'R') {
          this.setData({
            roleClick: true
          })
        }
      } else {
        oneperson.bChoosed = false;
      }
      if (oneperson.userType === 'U') {
        this.data.personLists.push(oneperson);
        this.data.showPersonLists.push(oneperson);
      } else if (oneperson.userType === 'G') {
        this.data.departmentLists.push(oneperson);
        this.data.showDepartmentLists.push(oneperson);
      } else if (oneperson.userType === 'R') {
        this.data.roleLists.push(oneperson);
        this.data.showRoleLists.push(oneperson);
      } else {
        console.log('userType is wrong,not the one of "U,G,R"!');
      }
    })
    this.setData({
      showPersonLists: this.data.showPersonLists,
      showDepartmentLists: this.data.showDepartmentLists,
      showRoleLists: this.data.showRoleLists
    })
  },

  updatePersons: function(event) {
    this.setData({
      showPersonLists: this.data.personLists,
      showDepartmentLists: this.data.departmentLists,
      showRoleLists: this.data.roleLists
    })
    this.data.queryText = event.detail.value.toLowerCase().replace(/,|\.|-/g, ' ');
    let queryWords = this.data.queryText.split(' ').filter(w => !!w.trim().length);
    if (queryWords.length) {
      this.setData({
        showPersonLists: this.data.showPersonLists.filter((person) => {
          let oneperson = person;
          return (oneperson.userName.toLowerCase().indexOf(queryWords) > -1);
        })
      })
    }
    if (queryWords.length) {
      this.setData({
        showDepartmentLists: this.data.showDepartmentLists.filter((person) => {
          let oneDepartment = person;
          return (oneDepartment.userName.toLowerCase().indexOf(queryWords) > -1);
        })
      })
    }
    if (queryWords.length) {
      this.setData({
        showRoleLists: this.data.showRoleLists.filter((person) => {
          let oneUser = person;
          return (oneUser.userName.toLowerCase().indexOf(queryWords) > -1);
        })
      })
    }
    this.setData({
      personClick: true,
      departmentClick: true,
      roleClick: true
    })
  },

  checkboxChange: function(event){
    switch (event.currentTarget.dataset.type){
      case 'YH':
        this.data.personLists.forEach((person, index) => {
          this.data.personLists[index].bEndChoosed = false;
          event.detail.value.forEach(one => {
            if (one === person.userID) {
              this.data.personLists[index].bEndChoosed = true
            }
          })
        })
        break;
      case 'BM':
        this.data.departmentLists.forEach((department, index1) => {
          this.data.departmentLists[index1].bEndChoosed = false;
          event.detail.value.forEach(one1 => {
            if (one1 === department.userID) {
              this.data.departmentLists[index1].bEndChoosed = true 
            }
          })
        })
        break;
      case 'JS':
        this.data.roleLists.forEach((role, index2) => {
          this.data.roleLists[index2].bEndChoosed = false;
          event.detail.value.forEach(one2 => {
            if (one2 === role.userID) {
              this.data.roleLists[index2].bEndChoosed = true
            }
          })
        })
        break;
    }
  },

  confirm: function(){
    this.data.handlePeoples = this.data.personLists.concat(this.data.departmentLists, this.data.roleLists);
    console.log(this.data.handlePeoples)
    let pagesArr = getCurrentPages();
    if (pagesArr.length > 1) {
      let prePage = pagesArr[pagesArr.length - 2];
      prePage.handleTodoPersons(this.data.handlePeoples)
    }
    wx.navigateBack({
      delta: 1
    })
  },

  cancel: function(){
    wx.navigateBack({
      delta: 1
    })
  },

  doClickPerson: function() {
    if (this.data.personClick) {
      this.setData({
        personClick: false
      })
    } else {
      this.setData({
        personClick: true
      })
    }
  },

  doClickDepartment: function() {
    if (this.data.departmentClick) {
      this.setData({
        departmentClick: false
      })
    } else {
      this.setData({
        departmentClick: true
      })
    }
  },

  doClickUser: function() {
    if (this.data.roleClick) {
      this.setData({
        roleClick: false
      })
    } else {
      this.setData({
        roleClick: true
      })
    }
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

  onShareAppMessage: function () {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})