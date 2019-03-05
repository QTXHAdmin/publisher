const dbJson = require('./src/db-name-password.json');
const sha1 = require('./src/lib/sha1.js');

exports.verifyTeacherIdentity = function(userName, psd) {
  var verified = false;
  var id;
  dbJson.tea_name_psd.forEach(function(value, index) {
    if (value.userName === userName && value.password === psd) {
      verified = true;
      id = value.id;
    }
  });
  if (verified === true) {
    return {
      msg: '教师身份认证成功',
      code: 1,
      id: id
    };
  } else {
    return {
      msg: '教师身份认证失败',
      code: 0
    };
  }
};

exports.verifyStu = function(userName, psd) {
  var verified = false;
  var id;
  dbJson.stu_name_psd.forEach(function(value, index) {
    if (value.userName === userName && value.password === psd) {
      verified = true;
      id = value.id;
    }
  });
  if (verified === true) {
    return {
      msg: '学生身份认证成功',
      code: 1,
      id: id
    };
  } else {
    return {
      msg: '学生身份认证失败',
      code: 0
    };
  }
};
