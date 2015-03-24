app.controller('DashboardController', function($scope, $http, User){
  console.log('I am the DASH controller');
  User.userHash()
  .then(function(data){
    $scope.currentUser = JSON.parse(data.data.current_user);
    console.log('current user is' + $scope.currentUser);
    $scope.allUsers = data.data.all_users;
    usersArr = JSON.parse($scope.allUsers);
    $scope.filteredArr = _.filter(usersArr, function(user){return moment(user.created_at).isAfter(LastWeekStart())});
    $scope.artpieces = $scope.currentUser.artpieces;
  })
});

// create a moment-formatted join date
