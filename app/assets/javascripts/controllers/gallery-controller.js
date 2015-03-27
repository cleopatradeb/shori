app.controller('GalleryController', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('I am the GALLERY controller');
  UserService.userHash()
  .then(function(data){
    $scope.allUsers = JSON.parse(data.data.all_users);
    $scope.userId = JSON.parse($routeParams.id);
    $scope.profileUser = _.filter($scope.allUsers, function(user){ return user.id === $scope.userId;})[0];
    console.log($scope.profileUser);
    $scope.profileUserArtpieces = $scope.profileUser.artpieces
    console.log($scope.profileUserArtpieces);
  });

  console.log(gon.aws_access_key)
  console.log(gon.aws_secret_key)
  $scope.creds = {
    bucket: 'shori',
    access_key: gon.aws_access_key,
    secret_key: gon.aws_secret_key
  }
 
  $scope.upload = function() {
    console.log($scope.newArtpiece.name)
    console.log($scope.newArtpiece.description)
    console.log($scope.newArtpiece.length)
    console.log($scope.newArtpiece.depth)
    console.log($scope.newArtpiece.height)
    console.log($scope.newArtpiece.price)
    console.log($scope.newArtpiece.insurance)
    console.log($scope.file.name)
    console.log(gon.current_user_id)
    // Configure The S3 Object 
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
   
    if($scope.file) {
      var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
   
      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(err.message);
          return false;
        }
        else {
          // Success!
          alert('Upload Done');
        }
      })
      .on('httpUploadProgress',function(progress) {
        // Log Progress Information
        console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
      })
    }
    else {
      // No File Selected
      alert('No File Selected');
    }
    $scope.imageUrl = 'https://s3-eu-west-1.amazonaws.com/shori/' + $scope.file.name;
    $http.post('/artpieces', {
      name: $scope.newArtpiece.name, 
      description: $scope.newArtpiece.description, 
      length: $scope.newArtpiece.length, 
      height: $scope.newArtpiece.height, 
      depth: $scope.newArtpiece.depth, 
      price: $scope.newArtpiece.price, 
      insurance: $scope.newArtpiece.insurance, 
      image: $scope.imageUrl,
      user_id: gon.current_user_id
    });
  }
});