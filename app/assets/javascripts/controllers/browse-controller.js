app.controller('BrowseController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
  console.log('BrowseController');
  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    $scope.roletype = {artist:false, venue:false};
  });
}]);
