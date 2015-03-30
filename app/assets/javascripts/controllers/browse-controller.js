app.controller('BrowseController', '$scope', '$http', '$location', 'UserService'  [function($scope, $http, $location, UserService){
  
  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    $scope.roletype = {artist:false, venue:false};
  });
  $http.get('/users/user_data')
  .success(function(data){
    if (data === null) {
      $location.path('/users/log_in')
    }
  })
}]);
