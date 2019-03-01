require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min'
  }
});

require(['jquery', 'easyui'], function($, easyui) {
  $(function() {
    initMenu();

    initAccordion();
  });

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
