require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    Cookies: '../../../lib/js.cookie'
  }
});

require(['jquery', 'easyui', 'Cookies'], function($, easyui, Cookies) {
  $(function() {
    initMenu();

    initAccordion();

    bindExitEvent();
  });

  function bindExitEvent() {
    $('#exitBtn').on('click', function(e) {
      e.preventDefault();
      $.messager.confirm('提醒消息', '您确定要退出吗', function(r) {
        if (!r) {
          /* eslint-disable-next-line */
          return;
        }
        window.location.href = 'http://localhost:30000/systemLogin.html';
        Cookies.remove('Authorization');
      });
    });
  }

  function initMenu() {
    $('#cc').layout();
  }

  function initAccordion() {
    $('#aa').accordion({
      animate: true,
      fit: true
    });
    $('#tt').tabs({
      border: false,
      fit: true
    });
    $('#personal-user').on('click', function() {
      var tabTitle = $(this).text();
      if ($('#tt').tabs('exists', tabTitle)) {
        $('#tt').tabs('select', tabTitle);
        return;
      }
      var url = 'http://localhost:30000/view/system/userlist.html';
      $('#tt').tabs('add', {
        title: tabTitle,
        content: '<iframe border="0" width="100%" height="100%" src="' + url + '"></iframe>',
        closable: true,
        fit: true
      });
    });
  }
});
