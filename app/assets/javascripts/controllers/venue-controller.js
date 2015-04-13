app.controller('VenueController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('I am the venue controller');
  UserService.userHash()
  .then(function(data){
    $scope.allUsers = JSON.parse(data.data.all_users);
    $scope.userId = JSON.parse($routeParams.id);
    $scope.profileUser = _.filter($scope.allUsers, function(user){ return user.id === $scope.userId;})[0];
    $scope.profileUserVenuepics = $scope.profileUser.venuepics
  });

  $scope.creds = {
    bucket: 'shori/user_venue_uploads',
    access_key: gon.aws_access_key,
    secret_key: gon.aws_secret_key
  }
 
  // $scope.upload = function() {
  //   // Configure The S3 Object 
  //   AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
  //   AWS.config.region = 'us-east-1';
  //   var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
   
  //   if($scope.file) {
  //     var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
   
  //     bucket.putObject(params, function(err, data) {
  //       if(err) {
  //         // There Was An Error With Your S3 Config
  //         alert(err.message);
  //         return false;
  //       }
  //       else {
  //         // Success!
  //         alert('Upload Done');
  //       }
  //     })
  //     .on('httpUploadProgress',function(progress) {
  //       // Log Progress Information
  //       console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
  //     })
  //   }
  //   else {
  //     // No File Selected
  //     alert('No File Selected');
  //   }
  //   $scope.imageUrl = 'https://s3-eu-west-1.amazonaws.com/shori/user_venue_uploads/' + $scope.file.name;
  //   $http.post('/artpieces', {
  //     name: $scope.newArtpiece.name, 
  //     description: $scope.newArtpiece.description, 
  //     length: $scope.newArtpiece.length, 
  //     height: $scope.newArtpiece.height, 
  //     depth: $scope.newArtpiece.depth, 
  //     price: $scope.newArtpiece.price, 
  //     insurance: $scope.newArtpiece.insurance, 
  //     image: $scope.imageUrl,
  //     user_id: gon.current_user_id
  //   });
  // }
}]);