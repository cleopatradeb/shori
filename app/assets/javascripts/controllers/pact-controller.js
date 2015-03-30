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
    // Profile User's Artpieces To Be Added To Pact
    $scope.profileUserArtpieces = $scope.profileUser.artpieces
    $scope.reset = function(){
      $scope.newPact = angular.copy($scope.master);
    }
    $scope.profileUserArtpiecesId = _.map($scope.profileUser.artpieces, function(artpiece){return artpiece.id})
    $scope.profileUserArtpiecesLength = $scope.profileUserArtpieces.length

    $scope.pactForm = {};

    // Checkboxes 
    $scope.art = $scope.profileUserArtpiecesId;
    $scope.newPact = {};
    $scope.checkAll = function() {
      $scope.newPact.art = angular.copy($scope.art);
    };
    $scope.uncheckAll = function() {
      $scope.newPact.art = [];
    };
    // Make a Pact instance
    if($scope.currentUser.role === 'artist') {
      $scope.artistId = $scope.currentUser.id
      $scope.venueId = $scope.profileUser.id
    }
    else {
      $scope.artistId = $scope.profileUser.id
      $scope.venueId = $scope.currentUser.id
    }
    // makePact function
    $scope.makePact = function(newPact) {
      $scope.start_date = pactForm.startDate.value
      $scope.end_date = pactForm.endDate.value
      pact_data = {
        start_date: $scope.start_date, 
        end_date:$scope.end_date, 
        venue_id:$scope.venueId, 
        artist_id:$scope.artistId, 
        selected_artpieces: $scope.art
      }
      console.log(pact_data);
      // get pact data from form
      PactService.createPact(pact_data)
      .then(function(response){
        // dynamically show pact
        console.log('passed pact factory');
        $scope.newPact = angular.copy($scope.master);
      })
      console.log('make pact')
    };
  })
});

