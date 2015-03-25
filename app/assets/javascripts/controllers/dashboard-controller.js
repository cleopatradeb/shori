app.controller('DashboardController', function($scope, $http, UserService){
  UserService.userHash()
  .then(function(data){
    $scope.currentUser = JSON.parse(data.data.current_user);
    console.log($scope.currentUser);
    $scope.allUsers = data.data.all_users;
    usersArr = JSON.parse($scope.allUsers);
    $scope.filteredArr = _.filter(usersArr, function(user){return moment(user.created_at).isAfter(LastWeekStart())});
    $scope.artpieces = $scope.currentUser.artpieces;
    $scope.followingsData = $scope.currentUser.followings;
    console.log($scope.followingsData);
    $scope.followings = _.pluck($scope.followingsData, 'following_id');
    console.log($scope.followings);
    $scope.followingsUsers = [];
    _.map(usersArr, function(user){
      if (_.contains($scope.followings, user.id) === true) {
        $scope.followingsUsers.push(user);
      }
      else {}
    });
  })
});

// underscore functions to try out _.filter _.toArray _.invert & _.findKey
// create a moment-formatted join date