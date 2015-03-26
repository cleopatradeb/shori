app.controller('ProfileController', function($scope, $http, $compile, $templateCache, $location, $routeParams, UserService, FollowService){
  console.log('I am the PROFILE controller');
    // Profile User Info - Others' Profile Page
    $scope.getProfileUserFollowers = function(data){
    // All Users
    $scope.usersArr = JSON.parse(data.all_users);
    // User whose page we are on
    $scope.userId = JSON.parse($routeParams.id);
    // Current User Info - Own Profile Page
    $scope.currentUser = JSON.parse(data.current_user);
    $scope.profileUser = _.filter($scope.usersArr, function(user){ return user.id === $scope.userId;})[0]
    // console.log($scope.profileUser)
    // Profile user's followers - Others' Profile Page
    $scope.profileUserFollowings = $scope.profileUser.followings
    // console.log($scope.profileUserFollowings);
    // Number of followers profile has - Others' Profile Page 
    $scope.profileUserFollowersCount = $scope.profileUserFollowings.length
    // console.log($scope.profileUserFollowersCount);
    // // ID of all profile's followers - Others' Profile Page
    $scope.profileUserFollwersIds = _.map($scope.profileUserFollowings, function(following){return following.follower_id})
    // console.log($scope.profileUserFollwersIds);
    // Name of profile's followers - Others' Profile Page
    $scope.profileUserFollowers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.profileUserFollwersIds, user.id) === true) {
        $scope.profileUserFollowers.push(user);
      }
    });
    console.log($scope.profileUserFollowers);
    }
  
  // Dynamically add Following
  UserService.userHash()
  .then(function(data){
    $scope.getProfileUserFollowers(data.data);
    // Current user's followers - Own Profile Page
    $scope.currentUserFollowings = $scope.currentUser.followings
    // Number of followers user has - Own Profile Page 
    $scope.currentUserFollowersCount = $scope.currentUserFollowings.length
    // ID of all user's followers - Own Profile Page
    $scope.currentUserFollwersIds = _.map($scope.currentUserFollowings, function(following){return following.follower_id})
    // Name of user's followers - Own Profile Page
    $scope.currentUserFollowers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.currentUserFollwersIds, user.id) === true) {
        $scope.currentUserFollowers.push(user);
      }
    });
    // Setting conditions for follow/un-follow button
    if ((_.contains($scope.profileUserFollwersIds, $scope.currentUser.id)) === false) {
      console.log('i am not following this person')
      $scope.follow = true
      $scope.unfollow = false
    }
    else {
      $scope.follow = false
      $scope.unfollow = true
    }
    // Button - Follow this user
    $scope.followMe = (function(){
      $scope.follow = !$scope.follow;
    });
    // Button - Un-follow this user
    
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
        console.log(data);
        $scope.getProfileUserFollowers(data);
        $scope.currentUserFollowers = JSON.parse(data.all_users);
      })
    });
  }
  // Unfollow User
  $scope.unmakeAFollowing = function() {
    $scope.followingToDelete = _.where($scope.profileUser.followings, {follower_id: $scope.currentUser.id})
    // console.log($scope.followingToDelete[0].id)
    data = {following_id: $scope.followingToDelete[0].id}
    FollowService.destroyFollowing(data)
    .then(function(response){
      $http.get('/users/user_data')
      .success(function(data){
        console.log(data);
        $scope.getProfileUserFollowers(data);
        $scope.currentUserFollowers = JSON.parse(data.all_users);
      })
    });
  }

  $scope.messageClicked = function() {
    console.log('message button clicked');
    // $scope.messageTemplate = $compile($templateCache.get('message.html'));
    // console.log($templateCache.get('message.html')($scope));
  }
});