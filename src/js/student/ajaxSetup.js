$.ajaxSetup({
  headers: {
    'Authorization': Cookies.get('Authorization')
  },
  401: function() {
    window.location.href = '../../login.html';
  }
});
