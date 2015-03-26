app.controller('ProfileController', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('I am the PROFILE controller');
  UserService.userHash()
  .then(function(data){
    // Profile Page Info
    $scope.allUsers = data.data.all_users;
    $scope.usersArr = JSON.parse($scope.allUsers);
    $scope.userId = JSON.parse($routeParams.id);
    $scope.profileUser = _.where($scope.usersArr, {id: $scope.userId})[0]

    // Current User Info
    $scope.currentUser = JSON.parse(data.data.current_user);
    // Current user's followers
    $scope.followingsArr = _.map($scope.usersArr, function(user){return user.followings})
    $scope.flatFollowingsArr = _.flatten($scope.followingsArr);
    console.log($scope.flatFollowingsArr);
    $scope.followersArr = _.where($scope.flatFollowingsArr, {following_id: $scope.currentUser.id})
    console.log($scope.followersArr);
    // ID of all user's followers
    $scope.followers = _.map($scope.followersArr, function(followers){return followers.user_id})
    // Number of followers user has 
    $scope.followersCount = $scope.followers.length
    console.log($scope.followersCount)
    // Name of user's followers
    $scope.followersNamesArr = [];
    // Getting user's followings user instances
    _.map($scope.usersArr, function(user){
      if (_.contains($scope.followers, user.id) === true) {
        $scope.followersNamesArr.push(user);
      }
    });
    console.log($scope.followersNamesArr);
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