app.controller('BrowseController', function($scope, $http, $location, UserService){
  console.log('BROWSE CONTROLLER');
  UserService.userHash()
  .then(function(data){
    $scope.allUsers = data.data.all_users;
    $scope.usersArr = JSON.parse($scope.allUsers);
    $scope.roletype = {artist:false, venue:false};
  });
  $http.get('/users/user_data')
  .success(function(data){
    if (data === null) {
      $location.path('/users/log_in')
    }
  })
});
