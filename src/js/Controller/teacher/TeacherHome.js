require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    Swiper: '../../../lib/swiper/js/swiper.min',
    Cookies: '../../../lib/js.cookie',
    ajaxSetup: '../../../js/Controller/student/ajaxSetup',
    tpl: '../../template/tpl',
    service: '../../Service/service'
  }
});

require(['jquery', 'Swiper', 'Cookies', 'ajaxSetup', 'tpl', 'service'], function($, Swiper, Cookies, ajaxSetup, tpl, service) {
  $(function() {
    initBannerArea();
    getteacherhomeinfo();
  });

  function initBannerArea() {
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    });
  }

  function getteacherhomeinfo() {
    service.getTeacherHomeInfo(function(retData) {
      let a = {
        logoImg: retData.data[1].img_src.loginImg,
        swiperImg: retData.data[1].img_src.swiperImg,
        userName: retData.data[0].userInfo[1].SuserName,
        teacher: retData.data[0].userInfo[1].teacher,
        lessons: retData.data[2].lessons
      };
      let lessonItem = a.lessons;
      $('.swiperImg1').attr('src', a.swiperImg[0].swiper_src);
      $('.swiperImg2').attr('src', a.swiperImg[1].swiper_src);
      $('.swiperImg3').attr('src', a.swiperImg[2].swiper_src);
      $('.header-wrap').html(tpl('Header', a));
      $('.recom-list').html(tpl('Lessons', lessonItem));
      console.log(a.swiperImg);
      console.log(lessonItem);
      console.log(lessonItem[0].img_src);
    });
  }
});
