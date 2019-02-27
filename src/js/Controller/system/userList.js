require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    Cookies: '../../../lib/js.cookie',
    ajaxSetup: '../../Controller/student/ajaxSetup',
    tpl: '../../template/tpl'
  }
})

require(['jquery', 'easyui', 'Cookies', 'ajaxSetup', 'tpl'], function ($, easyui, Cookies, ajaxSetup, tpl) {
  $(function () {
    initTable();
  })

  function initTable() {
    $('#table').datagrid({
      title: '用户列表',
      fit: true,
      fitColumns: true,
      page: 1,
      itemsOnPage: 10,
      pagination: true,
      // url: 'http://localhost:45550/api/users',
      // method: 'GET',
      onBeforeLoad: function (param) {
        param._page = param.page,
          param._limit = param.rows,
          param._sort = 'id',
          param._order = 'desc'
      },
      loader: function (param, successFn, errorFn) {
        $.ajax({
          url: 'http://localhost:45550/api/users',
          data: param,
          type: 'GET',
          dataType: 'json',
          success: function (retData, status, xhr) {
            successFn({
              total: xhr.getResponseHeader('X-Total-Count'),
              rows: retData.data
            })
          }
        })
      },
      columns: [[
        { field: 'ck', checkbox: true, width: 50 },
        { field: 'id', title: '用户ID', width: 80 },
        { field: 'userName', title: '用户名', width: 100 },
        { field: 'name', title: '姓名', width: 80 },
        { field: 'email', title: '邮箱', width: 200 },
        { field: 'telephone', title: '手机', width: 120 },
        { field: 'courseNum', title: '课程数', width: 50 },
        { field: 'courseTakingNum', title: '开课中', width: 50 },
        {
          field: 'teacherIdentity', title: '教师身份', width: 70, formatter: function (value, row, index) {
            if ("" + value == "true") {
              return '有'
            } else {
              return '--'
            }
          }
        },
        {
          field: 'status', title: '用户状态', width: 100, formatter: function (value, row, index) {
            if ("" + value == "true") {
              return '已激活'
            } else {
              return '未激活'
            }
          }
        },
        {
          field: 'operation', title: '操作', width: 120, formatter: function (value, row, index) {
            var htmlStr = '';
            htmlStr += '<a href="javascript:" onclick="viewInfo(' + index + ')">查看信息</a>';
            htmlStr += '&nbsp&nbsp&nbsp';
            htmlStr += '<a href="javascript:" onclick="deleteUser(' + index + ')">删除</a>'
            return htmlStr;
          }
        }
      ]],
      toolbar: [{
        iconCls: 'icon-edit',
        text: '修改',
        handler: function () {

        }
      }, {
        text: '删除',
        iconCls: 'icon-remove',
        handler: function () {
          var selectedRow = $('#table').datagrid('getSelected');
          if (!selectedRow) {
            $.messager.alert('提示消息', '请先选中后删除', 'warning');
            return;
          };
          $.messager.confirm('提醒消息', '您确定要删除吗', function (r) {
            if (!r) {
              return;
            }
            var rowIndex = $('#table').datagrid('getRowIndex', selectedRow);
            deleteUser(rowIndex);
          })
        }
      }, {
        text: '添加',
        iconCls: 'icon-add',
        handler: function () {
          $('#addDialog').dialog({
            title: '添加用户',
            width: 400,
            height: 300,
            minimizable: true,
            maximizable: true,
            resizable: true,
            modal: true,
            onBeforeClose: function () {

            },
            buttons: [{
              text: '添加',
              iconCls: 'icon-ok',
              handler: function () {
                $.ajax({
                  url: 'http://localhost:45550/api/users',
                  data: $('#addForm').serializeArray(),
                  type: 'POST',
                  dataType: 'json'
                }).done(function () {
                  $('#addForm')[0].reset();
                  $('#addDialog').dialog('close');
                  $('#table').datagrid('reload');
                })
              }
            }, {
              text: '取消',
              iconCls: 'icon-cancel',
              handler: function () {
                $('#addForm')[0].reset();
                $('#addDialog').dialog('close');
              }
            }]
          })
        }
      }]
    })
  }

  function deleteUser(rowIndex) {
    var rows = $('#table').datagrid('getRows');
    var id = rows[rowIndex].id;
    $.ajax({
      url: 'http://localhost:45550/api/users/' +id,
      type: 'DELETE',
      dataType: 'json'
    }).done(function () {
      $('#table').datagrid('reload');
    })
  }

  function viewInfo(index) {
    console.log($('#table').datagrid('getRows'));
  }

})
