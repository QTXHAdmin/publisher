require.config({
    // shim: {
    //     Swiper: ['jquery']
    // },
    paths: {
        jquery: '../../lib/jquery.min',
        // sh1: '../../lib/sha1',
        // easyui: '../../lib/jquery-easyui/jquery.easyui.min',
        // ajaxSetup: '../../js/student/ajaxSetup',
        // cookie: '../../lib/js.cookie',
        Swiper: '../../lib/swiper/js/swiper.min'
    }
});

require(['jquery', 'Swiper'], function($, Swiper) {
    $(function() {
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
});
