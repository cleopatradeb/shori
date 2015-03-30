app.controller('DashboardController', ['$scope', '$http', 'UserService', 'FollowService', 'PactService', function($scope, $http, UserService, FollowService, PactService){
  console.log('dashboard controller')

  UserService.userHash()
  .then(function(data){
    $scope.currentUser = JSON.parse(data.data.current_user);
    $scope.usersArr = JSON.parse(data.data.all_users);

    // New Users Feed
    $scope.filteredArr = _.filter($scope.usersArr, function(user){return moment(user.created_at).isAfter(LastWeekStart())});

    // Dashboard - Followings
    $scope.currentUserFollowings = $scope.currentUser.followings;
    $scope.currentUserFollowingsCount = $scope.currentUserFollowings.length;
    $scope.currentUserFollowingsIds = _.pluck($scope.currentUserFollowings, 'follower_id');
    $scope.currentUserFollowedUsers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.currentUserFollowingsIds, user.id) === true) {
        $scope.currentUserFollowedUsers.push(user);
      }
    });

  })
}]);