define(['jquery'], function($) {
  return {
    getTeacherHomeInfo: function(callback) {
      $.ajax({
        url: 'http://localhost:45550/api/a',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    getStuIndexPageData: function(callback) {
      $.ajax({
        url: 'http://localhost:45550/api/a',
        type: 'GET',
        data: '',
        dataType: 'json',
        success: callback
      });
    },
    getMyStudyCourseTakingNum: function(id, callback) {
      $.ajax({
        url: 'http://localhost:45550/api/users/' + id,
        type: 'GET',
        data: '',
        dataType: 'json',
        success: callback
      });
    },
    addModule: function(id, callback) {
      $.ajax({
        url: 'http://localhost:45550/api/users/' + id,
        type: 'GET',
        data: '',
        dataType: 'json'
      }).done(function(retData) {
        retData.data.courseTakingNum++;
        // console.log(retData.data.courseTakingNum);
        $.ajax({
          url: 'http://localhost:45550/api/users/' + id,
          type: 'PUT',
          data: retData.data,
          dataType: 'json',
          success: callback
        });
      });
    }
  };
});
