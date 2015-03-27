app.controller('GalleryController', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('I am the GALLERY controller');
  UserService.userHash()
  .then(function(data){
    $scope.allUsers = JSON.parse(data.data.all_users);
    $scope.userId = JSON.parse($routeParams.id);
    $scope.profileUser = _.filter($scope.allUsers, function(user){ return user.id === $scope.userId;})[0];
    console.log($scope.profileUser);
    $scope.profileUserArtpieces = $scope.profileUser.artpieces
    console.log($scope.profileUserArtpieces);
  });

  
});