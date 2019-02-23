<<<<<<< HEAD
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
=======
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
>>>>>>> bae1c0e501aff76e9368cc72a53d165224fcc483
    }
  }
})
