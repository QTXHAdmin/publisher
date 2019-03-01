require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    Cookies: '../../../lib/js.cookie',
    ajaxSetup: '../../Controller/student/ajaxSetup',
    tpl: '../../template/tpl'
  }
});

require(['jquery', 'easyui', 'Cookies', 'ajaxSetup', 'tpl'], function($, easyui, Cookies, ajaxSetup, tpl) {
  $(function() {
    initTable();
    initSearchBox();
  });

  function initSearchBox() {
    $('#ss').searchbox({
      searcher: function(value, name) {
        // alert(value + ',' + name);
        var param = $.parseJSON('{"' + name + '_like":"' + value + '"}');
        initTable(param);
      },
      menu: '#mm',
      prompt: '用户ID/用户名'
    });
  }

  function initTable(param) {
    var isEditing = false;
    $('#table').datagrid({
      title: '用户列表',
      fitColumns: true,
      singleSelect: true,
      page: 1,
      itemsOnPage: 10,
      pagination: true,
      queryParams: param,
      fit: true,
      // url: 'http://localhost:45550/api/users',
      // method: 'GET',
      onBeforeLoad: function(param) {
        /* eslint-disable no-unused-expressions */
        /* eslint-disable-next-line */
        param._page = param.page,
        param._limit = param.rows,
        param._sort = 'id',
        param._order = 'desc';
      },
      loader: function(param, successFn, errorFn) {
        $.ajax({
          url: 'http://localhost:45550/api/users',
          data: param,
          type: 'GET',
          dataType: 'json',
          success: function(retData, status, xhr) {
            successFn({
              total: xhr.getResponseHeader('X-Total-Count'),
              rows: retData.data
            });
          }
        });
      },
      onBeforeEdit: function(index, row) {
        isEditing = true;
        $(this).datagrid('refreshRow', index);
      },
      onEndEdit: function(index, row) {
        isEditing = false;
        $(this).datagrid('refreshRow', index);
      },
      onCancelEdit: function(index, row) {
        isEditing = false;
        $(this).datagrid('reload', index);
      },
      onDblClickRow: function(index, row) {
        $(this).datagrid('beginEdit', index);
      },
      columns: [[
        { field: 'ck', checkbox: true, width: 50 },
        { field: 'id', title: '用户ID', width: 120 },
        { field: 'userName', title: '用户名', width: 100, editor: { type: 'text' } },
        { field: 'name', title: '姓名', width: 80, editor: { type: 'text' } },
        { field: 'email', title: '邮箱', width: 200, editor: { type: 'text' } },
        { field: 'telephone', title: '手机', width: 120, editor: { type: 'text' } },
        { field: 'courseNum', title: '课程数', width: 50, editor: { type: 'numberbox' } },
        { field: 'courseTakingNum', title: '开课中', width: 50, editor: { type: 'numberbox' } },
        {
          field: 'teacherIdentity',
          title: '教师身份',
          width: 70,
          formatter: function(value, row, index) {
            if (+value === 1) {
              return '有';
            } else {
              return '--';
            }
          },
          editor: { type: 'numberbox' }
        },
        {
          field: 'status',
          title: '用户状态',
          width: 100,
          formatter: function(value, row, index) {
            if (+value === 1) {
              return '已激活';
            } else {
              return '未激活';
            }
          },
          editor: { type: 'numberbox' }
        },
        {
          field: 'operation',
          title: '操作',
          width: 120,
          formatter: function(value, row, index) {
            var htmlStr = '';
            if (isEditing) {
              htmlStr += '<a href="javascript:" onclick="saveEdit(' + index + ')">保存修改</a>';
              htmlStr += '&nbsp&nbsp&nbsp';
              htmlStr += '<a href="javascript:" onclick="cancelEdit(' + index + ')">取消</a>';
            } else {
              htmlStr += '<a href="javascript:" onclick="viewInfo(' + index + ')">查看信息</a>';
              htmlStr += '&nbsp&nbsp&nbsp';
              htmlStr += '<a href="javascript:" onclick="deleteUser(' + index + ')">删除</a>';
            }
            return htmlStr;
          }
        }
      ]],
      toolbar: [{
        iconCls: 'icon-edit',
        text: '修改',
        handler: function() {
          var selectedRow = $('#table').datagrid('getSelected');
          if (!selectedRow) {
            $.messager.alert('提示消息', '请先选中后再修改', 'warning');
            return;
          }
          var rowIndex = $('#table').datagrid('getRowIndex', selectedRow);
          editUser(rowIndex);
        }
      }, {
        text: '删除',
        iconCls: 'icon-remove',
        handler: function() {
          var selectedRow = $('#table').datagrid('getSelected');
          if (!selectedRow) {
            $.messager.alert('提示消息', '请先选中后删除', 'warning');
            return;
          };
          var rowIndex = $('#table').datagrid('getRowIndex', selectedRow);
          /* eslint-disable-next-line */
          deleteUser(rowIndex);
        }
      }, {
        text: '添加',
        iconCls: 'icon-add',
        handler: function() {
          $('#addDialog').dialog({
            title: '添加用户',
            width: 400,
            height: 300,
            minimizable: true,
            maximizable: true,
            resizable: true,
            modal: true,
            buttons: [{
              text: '添加',
              iconCls: 'icon-ok',
              handler: function() {
                $.ajax({
                  url: 'http://localhost:45550/api/users',
                  data: $('#addForm').serializeArray(),
                  type: 'POST',
                  dataType: 'json'
                }).done(function() {
                  $('#addForm')[0].reset();
                  $('#addDialog').dialog('close');
                  $('#table').datagrid('reload');
                });
              }
            }, {
              text: '取消',
              iconCls: 'icon-cancel',
              handler: function() {
                $('#addForm')[0].reset();
                $('#addDialog').dialog('close');
              }
            }]
          });
        }
      }]
    });
  }

  window.cancelEdit = function(rowIndex) {
    $('#table').datagrid('cancelEdit', rowIndex);
  };

  window.saveEdit = function(rowIndex) {
    var originalRow = $('#table').datagrid('getRows')[rowIndex];
    originalRow = $.extend({}, originalRow);
    $('#table').datagrid('endEdit', rowIndex);
    var editRow = $('#table').datagrid('getRows')[rowIndex];
    $('#table').datagrid('beginEdit', rowIndex);
    // console.log(originalRow);
    // console.log(editRow);
    $.ajax({
      url: 'http://localhost:45550/api/users/' + editRow.id,
      data: editRow,
      type: 'PUT',
      dataType: 'json'
    }).done(function() {
      $('#table').datagrid('endEdit', rowIndex);
      $.messager.show({
        title: '提示消息',
        msg: '修改成功',
        timeout: 2000
      });
    }).fail(function() {
      $.messager.show({
        title: '提示消息',
        msg: '修改失败，请重试',
        timeout: 2000
      });
      var editors = $('#table').datagrid('getEditors', rowIndex);
      editors.forEach(function(editor, index) {
        // console.log(editor.field);
        var fieldName = editor.field;
        switch (fieldName) {
          case 'userName':
            $(editor.target).val(originalRow.userName);
            break;
          case 'name':
            $(editor.target).val(originalRow.name);
            break;
          case 'email':
            $(editor.target).val(originalRow.email);
            break;
          case 'telephone':
            $(editor.target).val(originalRow.telephone);
            break;
          case 'courseNum':
            editor.target.numberbox('setValue', originalRow.courseNum);
            break;
          case 'courseTakingNum':
            editor.target.numberbox('setValue', originalRow.courseTakingNum);
            break;
          case 'teacherAuthority':
            editor.target.numberbox('setValue', originalRow.teacherAuthority);
            break;
          case 'status':
            editor.target.numberbox('setValue', originalRow.status);
            break;
        }
      });
    });
  };

  function editUser(rowIndex) {
    var row = $('#table').datagrid('getRows')[rowIndex];
    var html = tpl('systemDialog', row);
    $('#viewDialog').html(html);
    $('#viewDialog').dialog({
      title: '修改用户信息',
      minimizable: true,
      maximizable: true,
      resizable: true,
      modal: true,
      buttons: [{
        text: '确定',
        iconCls: 'icon-ok',
        handler: function() {
          $.ajax({
            url: 'http://localhost:45550/api/users/' + row.id,
            data: $('#editForm').serializeArray(),
            type: 'PUT',
            dataType: 'json'
          }).done(function(retData) {
            $('#table').datagrid('reload');
            $('#viewDialog').dialog('close');
            $.messager.show({
              title: '提示消息',
              msg: '修改成功',
              timeout: 2000
            });
          });
        }
      }, {
        text: '取消',
        iconCls: 'icon-cancel',
        handler: function() {
          $('#viewDialog').dialog('close');
        }
      }]
    });
  }

  window.deleteUser = function(rowIndex) {
    $.messager.confirm('提醒消息', '您确定要删除吗', function(r) {
      if (!r) {
        return;
      }
      var rows = $('#table').datagrid('getRows');
      var id = rows[rowIndex].id;
      $.ajax({
        url: 'http://localhost:45550/api/users/' + id,
        type: 'DELETE',
        dataType: 'json'
      }).done(function() {
        $('#table').datagrid('reload');
      });
    });
  };

  window.viewInfo = function(rowIndex) {
    var row = $('#table').datagrid('getRows')[rowIndex];
    var html = tpl('systemDialog', row);
    $('#viewDialog').html(html);
    $('#viewDialog').dialog({
      title: '用户详细信息',
      width: 400,
      height: 300,
      minimizable: true,
      maximizable: true,
      resizable: true,
      modal: true,
      buttons: [{
        text: '关闭',
        iconCls: 'icon-ok',
        handler: function() {
          $('#viewDialog').dialog('close');
        }
      }]
    });
  };
});
