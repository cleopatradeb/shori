app.controller('ArtpieceController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', 'PactService', 'ArtpieceService', function($scope, $http, $location, $routeParams, UserService, FollowService, PactService, ArtpieceService){
  console.log('I am the ART controller');  

  ArtpieceService.getArt()
  .then(function(data){
  $scope.artpieceArr = data.data;
    $scope.selectedArtpieceId = JSON.parse($routeParams.id)
    $scope.selectedArtpiece = _.where($scope.artpieceArr, {id: $scope.selectedArtpieceId})[0]
    console.log($scope.selectedArtpiece)
  })

  $scope.printDiv = function(divName) {
    console.log('print')
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open()
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
    popupWin.document.close();
  } 

  Stripe.setPublishableKey(gon.stripe_publishable_key);

}]);