require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    service: '../../Service/service',
    Cookies: '../../../lib/js.cookie',
    ajaxSetup: '../../../js/Controller/student/ajaxSetup',
    tpl: '../../../js/template/tpl'
  }
});

require(['jquery', 'easyui', 'service', 'Cookies', 'ajaxSetup', 'tpl'], function($, easyui, service, Cookies, ajaxSetup, tpl) {
  $(function() {
    initHeader();

    bindAddModule();
  });

  function initHeader() {
    service.getStuIndexPageData(function(retData) {
      let LogoImg = {
        logoImg: retData.data[1].img_src.loginImg,
        userName: retData.data[0].userInfo[0].TuserName,
        teacher: retData.data[0].userInfo[0].student
        // userImg: data.img_src.userImg
      };
      $('.header-wrap').html(tpl('Header', LogoImg));
      $('.top-nav-list').find('li').removeClass('cur');
      $($('.top-nav-list').find('li')[1]).addClass('cur');
    });
  }

  function bindAddModule() {
    $('#addModule').on('click', function() {
      var id = Cookies.get('userID');
      service.addModule(id, function(retData) {
        if (retData.code === 1) {
          $.messager.alert('提示消息', '课程添加成功', 'info');
        }
      });
    });
  }
});
