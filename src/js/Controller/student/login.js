require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    sh1: '../../../lib/sha1',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    ajaxSetup: '../../../js/student/ajaxSetup',
    cookie: '../../../lib/js.cookie'
  }
});

require(['jquery', 'sh1', 'easyui', 'cookie'], function($, sh1, easyui, Cookies) {
  $(function() {
    $('#submitBtn').on('click', function() {
      var dataArr = $('#login').serializeArray();
      // console.log(dataArr);
      /* eslint-disable-next-line */
      dataArr[1].value = b64_sha1(dataArr[1].value);
      // console.log(dataArr);
      $.ajax({
        url: 'http://localhost:45550/authorize',
        type: 'POST',
        data: dataArr,
        dataType: 'json',
        success: function(resData) {
          if (resData.category === 1) {
            if (resData.data.code !== 1) {
              $.messager.alert('消息标题', '登录失败，此账号没有教师权限', 'error');
              return;
            }
            Cookies.set('Authorization', dataArr[1]);
            Cookies.set('userID', resData.data.id);
            window.location.href = 'http://localhost:30000/api/view/teacher/t_home.html';
          }
          if (resData.category === 2) {
            if (resData.data.code !== 1) {
              $.messager.alert('消息标题', '登录失败，用户名和密码不匹配', 'error');
              return;
            }
            Cookies.set('Authorization', dataArr[1]);
            Cookies.set('userID', resData.data.id);
            window.location.href = 'http://localhost:30000/api/view/student/index.html';
          }
        }
      });
    });
  });
});
