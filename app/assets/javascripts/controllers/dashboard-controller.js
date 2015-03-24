app.controller('DashboardController', function($scope, $http, User){
  console.log('I am the DASH controller');
  User.userHash()
  .then(function(data){
    $scope.currentUser = data.data.current_user
    $scope.allUsers = data.data.all_users;
    usersHash = JSON.parse($scope.allUsers)
    console.log(_.where(usersHash, {created_at === }));
  })
});

