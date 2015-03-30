app.controller('BrowseController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService, ArtpieceService){
  console.log('BrowseController');
  $scope.roleQuery = '';

  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    $scope.roletype = {artist:false, venue:false};
  });

  $scope.tabData = {
    selectedIndex: 0
  };
  $scope.next = function() {
    $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
  };
  $scope.previous = function() {
    $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
  };

  ArtpieceService.getArt()
}]);


