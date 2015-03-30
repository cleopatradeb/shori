app.controller('BrowseController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    $scope.roletype = {artist:false, venue:false};
  });
}]);
