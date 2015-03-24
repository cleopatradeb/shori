app.factory('User', ['$http', function ($http) {
  
  var User = {
    userHash: function(){
      return $http.get('/users/user_data')
    }
  }
  return User;
}])