require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    simplePagination: '../../../lib/jquery.simplePagination',
    service: '../../Service/service',
    tpl: '../../template/tpl'
  }
})

require(['jquery', 'simplePagination', 'service', 'tpl'], function ($, simplePagination, service, tpl) {
  $(function () {
    getModuleIndexPageData();

    bindDropMenuEvent();

    initPagination();
  })

  function getModuleIndexPageData() {
    service.getStuIndexPageData(function (data) {
      let LogoImg = {
        logoImg: data[1].img_src.loginImg,
        // swiperImg: data.img_src.swiperImg,
        userName: data[0].userInfo[0].TuserName,
        teacher: data[0].userInfo[0].student,
        // userImg: data.img_src.userImg
      }
      $('.header-wrap').html(tpl('Header', LogoImg));
    })

  }

  function initPagination() {
    $('.pagination').pagination({
      items: 100,
      itemsOnPage: 10,
      prevText: '上一页',
      nextText: '下一页'
    })
  }

  function bindDropMenuEvent() {
    $('.fold-symbol').on('click', function () {
      if ($(this).text() === '+') {
        $(this).parent().parent().height('162px');
        $(this).parent().parent().siblings().height('40px');
        $(this).text('-');
      } else {
        $(this).parent().parent().height('40px');
        $(this).text('+');
      }
    })
  }
})

