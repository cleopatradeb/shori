app.factory('FollowService', ['$http', function ($http) {
  var FollowService = {
    createFollowing: function(user){
      return $http.post('users/create_following');
    }
  }
  return FollowService;
}])