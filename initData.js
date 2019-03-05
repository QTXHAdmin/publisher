var Mock = require('mockjs');

module.exports = () => {
  var data = Mock.mock({
    'users|3000': [{
      'id|+1': 1000,
      'userName': '@title(1)',
      'name': '@cname',
      'email': '@email',
      'telephone': '@natural(13000000000, 1500000000000)',
      'courseNum': '@integer(10, 20)',
      'courseTakingNum': '@integer(0, 10)',
      'teacherIdentity': '@integer(0,1)',
      'status': '@integer(0,1)'
    }]
  });
  return data;
};
