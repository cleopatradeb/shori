app.controller('ProfileController', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('I am the PROFILE controller');
  UserService.userHash()
  .then(function(data){
    // All Users
    $scope.usersArr = JSON.parse(data.data.all_users);
    // User whose page we are on
    $scope.userId = JSON.parse($routeParams.id);
    // Current User Info - Own Profile Page
    $scope.currentUser = JSON.parse(data.data.current_user);
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

    // Profile User Info - Others' Profile Page
    $scope.profileUser = _.filter($scope.usersArr, function(user){ return user.id === $scope.userId;})[0]
    console.log($scope.profileUser)
    // Profile user's followers - Others' Profile Page
    $scope.profileUserFollowings = $scope.profileUser.followings
    console.log($scope.profileUserFollowings);
    // Number of followers profile has - Others' Profile Page 
    $scope.profileUserFollowersCount = $scope.profileUserFollowings.length
    console.log($scope.profileUserFollowersCount);
    // // ID of all profile's followers - Others' Profile Page
    $scope.profileUserFollwersIds = _.map($scope.profileUserFollowings, function(following){return following.follower_id})
    console.log($scope.profileUserFollwersIds);
    // Name of profile's followers - Others' Profile Page
    $scope.profileUserFollowers = [];
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.profileUserFollwersIds, user.id) === true) {
        $scope.profileUserFollowers.push(user);
      }
    });
    console.log($scope.profileUserFollowers);
  });


  // Button - Follow this user
  $scope.follow = true
  $scope.followMe = (function(){
    $scope.follow = !$scope.follow;
  });
  // Button - Unfollow this user
  $scope.unfollow = false
  $scope.unfollowMe = (function(){
    $scope.follow = true;
    $scope.unfollow = false;
  });

  // Follow User
  $scope.makeAFollowing = function() {
    data = {user_id: $scope.userId, follower_id: $scope.currentUser.id}
    FollowService.createFollowing(data);
    console.log('made A Following');
  }

});