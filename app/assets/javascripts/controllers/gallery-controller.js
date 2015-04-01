app.controller('GalleryController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('GalleryController');

  UserService.userHash()
  .then(function(data){
    $scope.allUsers = JSON.parse(data.data.all_users);
    $scope.userId = JSON.parse($routeParams.id);
    $scope.profileUser = _.filter($scope.allUsers, function(user){ return user.id === $scope.userId;})[0];
    $scope.profileUserArtpieces = $scope.profileUser.artpieces
  });

  $scope.creds = {
    bucket: 'shori/user_artpieces_uploads',
    access_key: gon.aws_access_key,
    secret_key: gon.aws_secret_key
  }
 
  $scope.upload = function() {

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
    $scope.imageUrl = 'https://s3-eu-west-1.amazonaws.com/shori/u ser_artpieces_uploads' + $scope.file.name;
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

  $(function(){
    $(document).on( 'scroll', function(){
      if ($(window).scrollTop() > 100) {
        $('.gallery-up-arrow').addClass('show');
      } else {
        $('.gallery-up-arrow').removeClass('show');
      }
    });
     });

  $scope.scrollToTop = function() {
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('body');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({scrollTop: offsetTop}, 250, 'linear');
  }
}]);