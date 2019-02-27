$.ajaxSetup({
  headers: {
    'Authorization': Cookies.get('Authorization')
  },
  StatusCode: {
    401: function(){
      window.location.href = './systemLogin.html'
    }
  }
})
