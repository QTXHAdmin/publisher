require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min'
  }
})

require(['jquery', 'easyui'], function ($, easyui) {
  $(function () {
    initTable();
  })

  function initTable() {
    console.log(11111);
    $('#table').datagrid({
      title: '用户列表',
      fit: true,
      url: 'http://localhost:45550/api/users',
      method: 'GET',
      columns: [
        { field: 'ck', checkbox: true, width: 50},
        { field: 'userID', title: '用户ID', width: 120 },
        { field: 'userName', title: '用户名',width: 120 },
        { field: 'name', title: '姓名',width: 120 },
        { field: 'email', title: '邮箱',width: 120 },
        { field: 'telephone', title: '手机',width: 120 },
        { field: 'courseNum', title: '课程数',width: 120 },
        { field: 'courseTakingNum', title: '开课中',width: 120 },
        { field: 'teacherIdentity', title: '教师身份',width: 120, formatter: function(value, row, index){
          if(value == true){
            return '有'
          }else{
            return '--'
          }
        } },
        { field: 'status', title: '用户状态', formatter: function(value, row, index){
          if(value == true){
            return '已激活'
          }else{
            return '未激活'
          }
        }}
      ],
      toolbars: [{
        iconCls: 'icon-edit',
        title: '修改'
      }]
    })
  }
})
