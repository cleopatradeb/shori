app.controller('PactController', function($scope, $http){
  console.log('I am the PACT controller');
  $scope.reset = function() {
    $scope.pact = angular.copy($scope.master);
  };

  $scope.makePact = function(pact) {
    // $scope.master = angular.copy(user);
    console.log('make pact')
  };
});