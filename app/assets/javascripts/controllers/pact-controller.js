app.controller('PactController', function($scope, $http, UserService, PactService){
  console.log('I am the PACT controller');
  $scope.reset = function(){
    $scope.newPact = angular.copy($scope.master);
  }
  // Date Options
  $scope.options = {
    format: 'yyyy-mm-dd',
    onClose: function(e) {
      // do something when the picker closes   
    }
  }

  // Make a Pact instance
  $scope.pactForm = {};
  $scope.makePact = function(newPact) {
    $scope.start_date = $scope.pactForm.$$success.parse[0].$viewValue
    $scope.end_date = $scope.pactForm.$$success.parse[1].$viewValue
    console.log($scope.pactForm.$$success.parse[0].$viewValue);
    console.log($scope.pactForm.$$success.parse[1].$viewValue);
    pact_data = {start_date: $scope.start_date, end_date:$scope.end_date}
    console.log(pact_data);
    // get pact data from form
    PactService.createPact(pact_data)
    .then(function(response){
      // dynamically show pact
      console.log('passed pact factory');
      $scope.newPact = angular.copy($scope.master);
    })
    // console.log('make pact')
  };
});

