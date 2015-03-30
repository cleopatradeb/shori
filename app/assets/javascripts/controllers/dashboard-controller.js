app.controller('DashboardController', ['$scope', '$http', 'UserService', 'FollowService', 'PactService', function($scope, $http, UserService, FollowService, PactService){
  UserService.userHash()
  .then(function(data){
    // Defining general JSON variables 
    $scope.currentUser = JSON.parse(data.data.current_user);
    $scope.usersArr = JSON.parse(data.data.all_users);
    // Getting users signed up in past week
    $scope.filteredArr = _.filter(usersArr, function(user){return moment(user.created_at).isAfter(LastWeekStart())});
    // Current user's art pieces
    $scope.artpieces = $scope.currentUser.artpieces;
    // Current user's followings data
    $scope.followingsData = $scope.currentUser.followings;
    $scope.followings = _.pluck($scope.followingsData, 'following_id');
    console.log($scope.followings)
    $scope.followingsUsers = [];
    // Getting user's followings user instances
    _.map(usersArr, function(user){
      if (_.contains($scope.followings, user.id) === true) {
        $scope.followingsUsers.push(user);
      }
    });
  })
}]);