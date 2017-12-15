// pages/todo-submit/todo-submit.js
var moment = require('../../utils/moment.js');
var todoService = require('../../service/todo-service.js');
var tooltips = require('../common/tooltips.js');
var shareMessage = require('../../service/share-message.js');
var utilService = require('../../service/util-service.js');

Page({
  data: {
    todo: {},
    flowInfos: {},
    hFlowInfos: [],
    wFlowInfo: [],
    idea: '',
    choosedUserName: '',
    choosedPersonID: '',
    choosedDepartmentID: '',
    choosedRoleID: '',
    //选中的下步处理事务信息
    handle: {
      taskProctype: '',
      nextTask: ''
    },
    //下步处理列表
    nextTaskLists: [{ wPID: '', wPName: '', wPValue: '', wfUsers: '' }],
    //处理对象列表
    handlePersons: [{ selectMode: Number, userCanUnCheck: String, userID: String, userName: String, userType: String, value: String, wPID: String, bChoosed: Boolean, bEndChoosed: Boolean }],
    handleFs: [{ value: 'wfopGO', name: '提交' }, { value: 'wfopGOBACK', name: '退回' }, { value: 'wfopVeto', name: '否决' }, { value: 'wfopTRANSFER', name: '转交' }, { value: 'wfopPULLBACK', name: '撤回' }, { value: 'wfopIDO', name: '我来处理' }, { value: 'wfopManage', name: '调度' }],
    handleFsIndex: 0,
    nextTaskIndex: 0
  },

  onLoad: function (options) {
    this.setData({
      todo: JSON.parse(options.todo)
    })
    console.log(this.data.todo)
    this.getFlowInfo();
  },

  onShow: function () {
  
  },

  getFlowInfo: function(){
    this.data.handle.taskProctype = 'wfopGO';
    todoService.getFlowInfo(this.data.todo.WFAWT_WFID, this.data.todo.WFAWT_INST).then((res) => {
      if (res.data.errcode === 0) {
        console.log(res)
        let a = res.data;
        this.setData({
          flowInfos: utilService.weX5RowsDataTrimValueProperty(a.body.rows)
        })
        for (let i=0; i < this.data.flowInfos.length; i++) {
          if (this.data.flowInfos[i].WFLOG_HWAY.indexOf('待处理') >= 0) {
            this.data.flowInfos[i].WFLOG_WUSER = utilService.deleteComma(this.data.flowInfos[i].WFLOG_WUSER);
            this.data.wFlowInfo[this.data.wFlowInfo.length] = this.data.flowInfos[i];
          } else {
            this.data.hFlowInfos[this.data.hFlowInfos.length] = this.data.flowInfos[i];  
          }
        }
        this.setData({
          wFlowInfo: this.data.wFlowInfo,
          hFlowInfos: this.data.hFlowInfos
        })
      }
      this.changeProctype(this.data.handle.taskProctype);
    }).catch(err => {
      console.log(err)
    })
  },

  changeProctype: function(taskProctype) {
    todoService.getHandleContent(this.data.todo.WFDEF_CLASS, this.data.todo.WFAWT_PID, this.data.todo.WFAWT_WFID, this.data.todo.WFAWT_INST, taskProctype).then(res => {
      if (res.data && 0 === res.data.errcode) {
        let a = res.data;
        this.setData({
          nextTaskLists: a.body.wFInfoUsers
        })
        if (this.data.nextTaskLists.length !== 0) {
          this.setData({
            'handle.nextTask': this.data.nextTaskLists[0].wPID || ''
          })
          this.changeNextTask(this.data.handle.nextTask);
        } else {
          this.setData({
            'handle.nextTask': '',
            choosedUserName: '',
            handlePersons: ''
          })
        }
        console.log(this.data.nextTaskLists)
      } else {
        console.log(res.data.desc)
        tooltips.showToast(res.data.desc, '', '../../image/fail.png');
      }
    }).catch(err => {
      console.log(err);
      tooltips.showToast(err, '', '../../image/fail.png');
    })
  },

  changeNextTask: function(nextTask) {
    this.setData({
      choosedUserName: '',
      choosedPersonID: '',
      choosedDepartmentID: '',
      choosedRoleID: ''
    })
    this.data.nextTaskLists.forEach(oneTask => {
      if (oneTask.wPID === nextTask) {
        this.data.handlePersons = oneTask.wfUsers;
        console.log(oneTask.wfUsers);
        if (this.data.handlePersons.length > 0) {
          this.data.handlePersons.forEach(onePerson => {
            if (onePerson.value === 'Y') {
              if (this.data.choosedUserName === '') {
                this.setData({
                  choosedUserName: onePerson.userName
                })
              } else {
                this.setData({
                  choosedUserName: this.data.choosedUserName + ',' + onePerson.userName
                })
              }
              if (onePerson.userType === 'U') {
                if (this.data.choosedPersonID === '') {
                  this.setData({
                    choosedPersonID: onePerson.userID
                  })
                } else {
                  this.setData({
                    choosedPersonID: this.data.choosedPersonID + ',' + onePerson.userID
                  })
                }
              } else if (onePerson.userType === 'G') {
                if (this.data.choosedDepartmentID === '') {
                  this.setData({
                    choosedDepartmentID: onePerson.userID
                  })
                } else {
                  this.setData({
                    choosedDepartmentID: this.data.choosedDepartmentID + ',' + onePerson.userID
                  })
                }
              } else if (onePerson.userType === 'R') {
                if (this.data.choosedRoleID === '') {
                  this.setData({
                    choosedRoleID:  onePerson.userID
                  })
                } else {
                  this.setData({
                    choosedRoleID: this.data.choosedRoleID + ',' + onePerson.userID
                  })
                }
              }
            }
          })
        }
      }
    })
  },

  onSubmit: function() {
    let params = {
      task_classid: '',
      task_statusid: '',
      task_id: '',
      task_inst: '',
      task_proctype: '',
      task_nextsid: '',
      comment: '',
      nextusers: {},
      action: 4
    };
    //选中的处理对象（人员U、部门G、角色R）
    let nextuser = { users: '', usergroups: '', userroles: '' };
    params.task_proctype = this.data.handle.taskProctype;
    params.task_classid = this.data.todo.WFDEF_CLASS.value;
    params.task_id = this.data.todo.WFAWT_WFID.value;
    params.task_inst = this.data.todo.WFAWT_INST.value;
    params.task_statusid = this.data.todo.WFAWT_PID.value;
    params.task_nextsid = this.data.todo.WFAWT_PID.value;
    params.action = 4;
    params.comment = this.data.idea;
    if (this.data.handle.taskProctype === "wfopTRANSFER" || (this.data.handle.taskProctype === "wfopGO") || (this.data.handle.taskProctype === "wfopGOBACK") || (this.data.handle.taskProctype === "wfopManage")) {
      nextuser.users = this.data.choosedPersonID;
      nextuser.usergroups = this.data.choosedDepartmentID;
      nextuser.userroles = this.data.choosedRoleID;
      params.task_nextsid = this.data.handle.nextTask;
    } else if (this.data.handle.taskProctype === "wfopVeto") {
      params.task_nextsid = '9999';
    }
    params.nextusers = nextuser;
    //下步处理非结束，必须选择处理对象
    if (this.data.handle.nextTask !== '9999' && this.data.handle.taskProctype !== 'wfopPULLBACK') {
      if ((nextuser.users === undefined && nextuser.usergroups === undefined && nextuser.userroles === undefined)
        || (nextuser.users === null && nextuser.usergroups === null && nextuser.userroles === null) || (nextuser.users === "" && nextuser.usergroups === "" && nextuser.userroles === "")
        || (nextuser.users.length === 0 && nextuser.usergroups.length === 0 && nextuser.userroles.length === 0)) {
        tooltips.showToast('请选择下一步处理人!', '', '../../image/fail.png');        
        return;
      }
    }
    wx.showModal({
      content: '是否确认提交？',
      success: function (res) {
        wx.showLoading({
          title: ''
        })
        if (res.confirm) {
          todoService.doSubmit(params).then(res => {
            if (res.data && 0 === res.data.errcode) {
              wx.hideLoading();
              tooltips.showToast('成功', '', '');
              wx.navigateBack({
                delta: 2
              })
            } else {
              wx.hideLoading();
              tooltips.showToast(res.data.desc, '', '../../image/fail.png');
              console.log(res.data.desc)
            }
          }).catch(err => {
            wx.hideLoading();
            tooltips.showToast(res.data.desc, '', '../../image/fail.png');
            console.error('error:' + err);
          })
        } else if (res.cancel) {
          wx.hideLoading();
          console.log('用户点击取消')
        }
      }
    })
  },

  chooseTodoPersons: function() {
    console.log(this.data.handlePersons);
    wx.navigateTo({
      url: '../todo-persons/todo-persons?handlePersons=' + JSON.stringify(this.data.handlePersons),
    }) 
  },

  handleTodoPersons: function(data) {
    this.setData({
      handlePersons: data,
      choosedUserName: '',
      choosedPersonID: '',
      choosedDepartmentID: '',
      choosedRoleID: ''
    })
    this.data.handlePersons.forEach(one => {
      if (one.bEndChoosed) {
        if (this.data.choosedUserName === '') {
          this.setData({
            choosedUserName: one.userName
          })
        } else {
          this.setData({
            choosedUserName: this.data.choosedUserName + ',' + one.userName
          })
        }
        if (one.userType === 'U') {
          if (this.data.choosedPersonID === '') {
            this.setData({
              choosedPersonID: one.userID
            })
          } else {
            this.setData({
              choosedPersonID: this.data.choosedPersonID + ',' + one.userID
            })
          }
        } else if (one.userType === 'G') {
          if (this.data.choosedDepartmentID === '') {
            this.setData({
              choosedDepartmentID: one.userID
            })
          } else {
            this.setData({
              choosedDepartmentID: this.data.choosedDepartmentID + ',' + one.userID
            })
          }
        } else if (one.userType === 'R') {
          if (this.data.choosedRoleID === '') {
            this.setData({
              choosedRoleID: one.userID
            })
          } else {
            this.setData({
              choosedRoleID: this.data.choosedRoleID + ',' + one.userID
            })
          }
        }
      }
    })
  },

  valueChange: function (event) {
    if (event.currentTarget.dataset.type === 'FS') {
      this.setData({
        handleFsIndex: event.detail.value,
        'handle.taskProctype': this.data.handleFs[event.detail.value].value
      })
    } else {
      this.setData({
        nextTaskIndex: event.detail.value,
        'handle.nextTask': this.data.nextTaskLists[event.detail.value].wPID
      })
    }
    console.log(this.data.handle)
  },

  changeValue: function(event) {
    this.setData({
      idea: event.detail.value
    })
    console.log(this.data.idea)
  },

  onShareAppMessage: function () {
    return {
      title: shareMessage.title,
      path: shareMessage.path,
      imageUrl: shareMessage.imageUrl
    }
  }
})