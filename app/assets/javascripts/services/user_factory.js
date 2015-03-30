app.factory('UserService', ['$http', function($http) {
  var UserService = {
    userHash: function(){
      return $http.get('/users/user_data');
    }
  }
  return UserService;
}])
