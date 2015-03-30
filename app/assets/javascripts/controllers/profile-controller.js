app.controller('ProfileController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', 'PactService', function($scope, $http, $location, $routeParams, UserService, FollowService, PactService){

  // Profile User Info - Others' Profile Page
  UserService.userHash()
  .then(function(data){
    $scope.usersArr = JSON.parse(data.data.all_users);
    $scope.currentUser = JSON.parse(data.data.current_user);
    $scope.currentUserId = $scope.currentUser.id;
    $scope.profileUserId = JSON.parse($routeParams.id);
    $scope.profileUser = _.filter($scope.usersArr, function(user){ return user.id === $scope.profileUserId;})[0]

    // Followings
    $scope.profileUserFollowings = $scope.profileUser.followings
    $scope.profileUserFollowingCount = $scope.profileUserFollowings.length
    $scope.profileUserFollowingsIds = _.pluck($scope.profileUserFollowings, 'follower_id');
    $scope.profileUserFollowedUsers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.profileUserFollowingsIds, user.id) === true) {
        $scope.profileUserFollowedUsers.push(user);
      }
    });

    // Pacts
    PactService.getPacts()
    .then(function(data){
      $scope.currentVenuePacts = data.data.current_venue_pacts
      $scope.currentArtistPacts = data.data.current_artist_pacts
      $scope.allPacts = data.data.all_pacts
    })
  });
  
  // Dynamically add Following
  UserService.userHash()
  .then(function(data){
    $scope.getProfileUserFollowers(data.data);
    $scope.currentUserFollowings = $scope.currentUser.followings
    $scope.currentUserFollowersCount = $scope.currentUserFollowings.length
    $scope.currentUserFollwersIds = _.map($scope.currentUserFollowings, function(following){return following.follower_id})
    $scope.currentUserFollowers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.currentUserFollwersIds, user.id) === true) {
        $scope.currentUserFollowers.push(user);
      }
    });

    // Follow/ Un-follow Button
    if ((_.contains($scope.profileUserFollwersIds, $scope.currentUser.id)) === false) {
      $scope.follow = true
      $scope.unfollow = false
    }
    else {
      $scope.follow = false
      $scope.unfollow = true
    }
    // Button - Follow
    $scope.followMe = (function(){
      $scope.follow = !$scope.follow;
    });
    // Button - Un-follow
    $scope.unfollowMe = (function(){
      $scope.follow = true;
      $scope.unfollow = false;
    });
  });

  // Follow User
  $scope.makeAFollowing = function() {
    data = {user_id: $scope.userId, follower_id: $scope.currentUser.id}
    FollowService.createFollowing(data)
    .then(function(response){
      $http.get('/users/user_data')
      .success(function(data){
        $scope.getProfileUserFollowers(data);
        $scope.currentUserFollowers = JSON.parse(data.all_users);
      })
    });
  }
  // Unfollow User
  $scope.unmakeAFollowing = function() {
    $scope.followingToDelete = _.where($scope.profileUser.followings, {follower_id: $scope.currentUser.id})
    data = {following_id: $scope.followingToDelete[0].id}
    FollowService.destroyFollowing(data)
    .then(function(response){
      $http.get('/users/user_data')
      .success(function(data){
        $scope.getProfileUserFollowers(data);
        $scope.currentUserFollowers = JSON.parse(data.all_users);
      })
    });
  }

  // Message Box
  $scope.messageClicked = function() {
    console.log('message button clicked');
  }
}]);