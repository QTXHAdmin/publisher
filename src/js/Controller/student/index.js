require.config({
  // shim: {
  //     Swiper: ['jquery']
  // }
  paths: {
    jquery: '../../../lib/jquery.min',
    Swiper: '../../../lib/swiper/js/swiper.min',
    service: '../../Service/service',
    tpl: '../../template/tpl'
  }
});

require(['jquery', 'Swiper', 'service', 'tpl'], function ($, Swiper, service, tpl) {
  $(function () {

    getStuIndexPageData();
    initBannerArea();
  });

  function initBannerArea() {
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 水平切换选项
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    });
  }

  function getStuIndexPageData() {
    service.getStuIndexPageData(function (data) {
      let LogoImg = {
        logoImg: data[1].img_src.loginImg,
        // swiperImg: data[0].img_src.swiperImg.swiper_src,
        userName: data[0].userInfo[0].TuserName,
        teacher: data[0].userInfo[0].student,
        // userImg: data[0].img_src.userImg
      }
      $('.header-wrap').html(tpl('Header', LogoImg));
    })
  }
});
