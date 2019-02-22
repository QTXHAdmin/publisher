define(['jquery'], function ($) {
  return {
    getTeacherHomeInfo: function (callback) {
      $.ajax({
        url: 'http://localhost:45550/indexInfo',
        type: 'GET',
        data: '',
        success: callback
      })
    },
    getStuIndexPageData: function (callback) {
      $.ajax({
        url: 'http://localhost:45550/indexInfo',
        type: 'GET',
        data: '',
        dataType: 'json',
        success: callback
      })
    }
  }
})
