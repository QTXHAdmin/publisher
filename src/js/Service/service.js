define(['jquery'], function($) {
    return {
        getTeacherHomeInfo: function(callback) {
            $.ajax({
                url: 'http://localhost:3000/a',
                type: 'GET',
                data: '',
                success: callback
            })
        }
    }
})