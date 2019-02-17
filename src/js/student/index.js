$(function() {
  initBannerArea();
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
