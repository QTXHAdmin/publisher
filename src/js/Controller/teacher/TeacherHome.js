require.config({
    paths: {
        jquery: '../../../lib/jquery.min',
        Swiper: '../../../lib/swiper/js/swiper.min',
        tpl: '../../template/tpl',
        service: '../../Service/service'
    }
});

require(['jquery', 'Swiper', 'tpl', 'service'], function($, Swiper, tpl, service) {
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
        service.getTeacherHomeInfo(function(data) {
            let LogoImg = {
                loginImg: data.img_src.loginImg,
                swiperImg: data.img_src.swiperImg,
                userName: data.userInfo[1].SuserName,
                teacher: data.userInfo[1].teacher,
            }
            let lessions = data.lessions;
            console.log(LogoImg.swiperImg);
            console.log(lessions);
            $('.swiperImg').attr('src', LogoImg.swiperImg);
            $('.header-wrap').html(tpl('Header', LogoImg));
        });
    }
});