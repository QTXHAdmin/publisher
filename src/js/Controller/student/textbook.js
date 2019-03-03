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
    getModuleIndexPageData();

    bindDropMenuEvent();

    initPagination();
  });

  function getModuleIndexPageData() {
    service.getStuIndexPageData(function(retData) {
      let LogoImg = {
        logoImg: retData.data[1].img_src.loginImg,
        // swiperImg: data.img_src.swiperImg,
        userName: retData.data[0].userInfo[0].TuserName,
        teacher: retData.data[0].userInfo[0].student
        // userImg: data.img_src.userImg
      };
      $('.header-wrap').html(tpl('Header', LogoImg));
      $('.top-nav-list').find('li').removeClass('cur');
      $($('.top-nav-list').find('li')[2]).addClass('cur');
    });
  }

  function initPagination() {
    $('.pagination').pagination({
      items: 100,
      itemsOnPage: 10,
      prevText: '上一页',
      nextText: '下一页'
    });
  }

  function bindDropMenuEvent() {
    $('.fold-symbol').on('click', function() {
      if ($(this).text() === '+') {
        $(this).parent().parent().height('162px');
        $(this).parent().parent().siblings().height('40px');
        $(this).text('-');
        $(this).parent().parent().siblings().find('.fold-symbol').text('+');
      } else {
        $(this).parent().parent().height('40px');
        $(this).text('+');
      }
    });

    $('.subcate-list').on('click', '.subcate', function() {
      var tplData = {};
      var childText = $(this).text();
      var parentText = $(this).parent().parent().find('.title').text();
      tplData.childCateName = childText;
      tplData.parentCateName = parentText;
      var html = tpl('moduleNav', tplData);
      $('.module-nav').html(html);
    });
  }
});
