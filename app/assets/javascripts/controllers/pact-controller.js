app.controller('PactController', function($scope, $http, $routeParams, UserService, PactService){
  console.log('I am the PACT controller');
  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    // User whose page we are on
    $scope.userId = JSON.parse($routeParams.id);
    // Current User Info - Own Profile Page
    $scope.currentUser = JSON.parse(data.data.current_user);
    $scope.profileUser = _.filter($scope.usersArr, function(user){ return user.id === $scope.userId;})[0]
    $scope.reset = function(){
      $scope.newPact = angular.copy($scope.master);
    }
    // Make a Pact instance
    if($scope.currentUser.role === 'artist') {
      $scope.artistId = $scope.currentUser.id
      $scope.venueId = $scope.profileUser.id
    }
    else {
      $scope.artistId = $scope.profileUser.id
      $scope.venueId = $scope.currentUser.id
    }

    console.log($scope.artistId)
    console.log($scope.venueId)
    $scope.pactForm = {};
    $scope.makePact = function(newPact) {
      $scope.start_date = pactForm.startDate.value
      $scope.end_date = pactForm.endDate.value
      console.log(pactForm.startDate.value);
      console.log(pactForm.endDate.value);
      pact_data = {start_date: $scope.start_date, end_date:$scope.end_date, user_id:$scope.currentUser.id, venue_id:$scope.venueId, artist_id:$scope.artistId}
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
  })
});

