app.factory('FollowService', ['$http', function ($http) {
  var FollowService = {
    createFollowing: function(data){
      return $http.post('/followings', data)
    }
  }
  return FollowService;
}])