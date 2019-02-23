require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    service: '../../Service/service',
    tpl: '../../../js/template/tpl'
  }
})

require(['jquery', 'service', 'tpl'], function ($, service, tpl) {
  $(function () {
    initHeader();
  })

  function initHeader() {
    service.getStuIndexPageData(function (data) {
      let LogoImg = {
        loginImg: data[1].img_src.loginImg,
        // swiperImg: data.img_src.swiperImg,
        userName: data[0].userInfo[0].TuserName,
        teacher: data[0].userInfo[0].student,
        // userImg: data.img_src.userImg
      }
      $('.header-wrap').html(tpl('Header', LogoImg));
    })
  }
})
