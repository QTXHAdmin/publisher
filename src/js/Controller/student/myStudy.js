require.config({
  shim: {
    simplePagination: ['jquery']
  },
  paths: {
    jquery: '../../../lib/jquery.min',
    simplePagination: '../../../lib/jquery.simplePagination',
    service: '../../Service/service',
    Cookies: '../../../lib/js.cookie',
    ajaxSetUp: '../../Controller/student/ajaxSetup',
    tpl: '../../../js/template/tpl'
  }
});

require(['jquery', 'simplePagination', 'service', 'Cookies', 'ajaxSetup', 'tpl'], function($, simplePagination, service, Cookies, ajaxSetup, tpl) {
  $(function() {
    getMyStudyHeader();

    initPagination();
  });

  function initPagination() {
    $('.pagination').pagination({
      items: 100,
      itemsOnPage: 10,
      prevText: '上一页',
      nextText: '下一页'
    });
  }

  function getMyStudyHeader() {
    service.getStuIndexPageData(function(retData) {
      var logoImg = {
        logoImg: retData.data[1].img_src.loginImg,
        // swiperImg: data.img_src.swiperImg,
        userName: retData.data[0].userInfo[0].TuserName,
        teacher: retData.data[0].userInfo[0].student
        // userImg: data.img_src.userImg
      };
      $('.header-wrap').html(tpl('Header', logoImg));
      $('.top-nav-list').find('li').removeClass('cur');
      $($('.top-nav-list').find('li')[4]).addClass('cur');
    });
  }
});
