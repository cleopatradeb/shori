app.controller('GalleryController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', function($scope, $http, $location, $routeParams, UserService, FollowService){
  console.log('GalleryController');

  $scope.getUserDataForGallery = function(){
    UserService.userHash()
    .then(function(data){
      $scope.allUsers = JSON.parse(data.data.all_users);
      $scope.currentUser = JSON.parse(data.data.current_user);
      $scope.currentUserId = $scope.currentUser.id;
      $scope.userId = JSON.parse($routeParams.id);
      $scope.profileUser = _.filter($scope.allUsers, function(user){ return user.id === $scope.userId;})[0];
      $scope.profileUserArtpieces = $scope.profileUser.artpieces
    });    
  }

  $scope.getUserDataForGallery();

  $scope.creds = {
    bucket: 'shori',
    access_key: gon.aws_access_key,
    secret_key: gon.aws_secret_key
  }
 
  $scope.upload = function() {
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
   
    if($scope.file) {
      var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
   
      bucket.putObject(params, function(err, data) {
        if(err) {
          alert(err.message);
          return false;
        }
        else {
          alert('Upload Done');
        }
      })
      .on('httpUploadProgress',function(progress) {
        console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
      })
    }
    else {
      alert('No File Selected');
    }
    $scope.imageUrl = 'https://s3-eu-west-1.amazonaws.com/shori/' + $scope.file.name;
    $scope.newArtpiece.user = $scope.currentUserId;
    $http.post('/artpieces', {
      name: $scope.newArtpiece.name, 
      description: $scope.newArtpiece.description, 
      width: $scope.newArtpiece.width, 
      height: $scope.newArtpiece.height, 
      depth: $scope.newArtpiece.depth, 
      type: $scope.newArtpiece.type, 
      price: $scope.newArtpiece.price, 
      insurance: $scope.newArtpiece.insurance, 
      image: $scope.imageUrl,
      user_id: $scope.newArtpiece.user
    });
    $scope.getUserDataForGallery();
  }

  $(function(){
    $(document).on( 'scroll', function(){
      if ($(window).scrollTop() > 100) {
        $('.gallery-up-arrow').addClass('show');
      } else {
        $('.gallery-up-arrow').removeClass('show');
      }
    });
    $('#gallery-add-button').click(function(){
      $('#gallery-add-photo').toggleClass('hide');
      $('html, body').animate({ scrollTop: $(document).height()-$(window).height() }, 300);
    });
    $('#gallery-submit-art').click(function(){
      $('#gallery-add-photo').toggleClass('hide');
      $("html, body").animate({ scrollTop: 0 }, 300);
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