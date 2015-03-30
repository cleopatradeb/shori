app.factory('FollowService', ['$http', '$scope', function($http, $scope) {
  var FollowService = {
    createFollowing: function(data){
      return $http.post('/followings', data)
    },
    destroyFollowing: function(data){
      console.log(data.following_id)
      return $http({
        url:'/followings/' + data.following_id,
        method: 'DELETE',
        data: {following_id: data.following_id}
      })
    }
  }
  return FollowService;
}])