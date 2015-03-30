app.controller('ArtpieceController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', 'PactService', 'ArtpieceService', function($scope, $http, $location, $routeParams, UserService, FollowService, PactService, ArtpieceService){
  console.log('I am the ART controller');  


  ArtpieceService.getArt()
  .then(function(data){
    $scope.artpieceArr = data.data;
    $scope.selectedArtpieceId = JSON.parse($routeParams.id)
    $scope.selectedArtpiece = _.where($scope.artpieceArr, {id: $scope.selectedArtpieceId})[0]
    console.log($scope.selectedArtpiece)
    
  })
}]);