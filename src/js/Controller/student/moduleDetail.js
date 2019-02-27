require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    service: '../../Service/service',
    Cookies: '../../../lib/js.cookie',
    ajaxSetup: '../../../js/Controller/student/ajaxSetup',
    tpl: '../../../js/template/tpl'
  }
})

require(['jquery', 'service','Cookies', 'ajaxSetup', 'tpl'], function ($, service,Cookies, ajaxSetup, tpl) {
  $(function () {
    initHeader();
  })

  function initHeader() {
    service.getStuIndexPageData(function (retData) {
      let LogoImg = {
        logoImg: retData.data[1].img_src.loginImg,
        // swiperImg: data.img_src.swiperImg,
        userName: retData.data[0].userInfo[0].TuserName,
        teacher: retData.data[0].userInfo[0].student,
        // userImg: data.img_src.userImg
      }
      $('.header-wrap').html(tpl('Header', LogoImg));
    })
  }
})
