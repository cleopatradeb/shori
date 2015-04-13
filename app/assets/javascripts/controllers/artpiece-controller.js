app.controller('ArtpieceController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'FollowService', 'PactService', 'ArtpieceService', function($scope, $http, $location, $routeParams, UserService, FollowService, PactService, ArtpieceService){
  console.log('I am the ART controller');  

  ArtpieceService.getArt()
  .then(function(data){
  $scope.artpieceArr = data.data;
    $scope.selectedArtpieceId = JSON.parse($routeParams.id)
    $scope.selectedArtpiece = _.where($scope.artpieceArr, {id: $scope.selectedArtpieceId})[0]
    console.log($scope.selectedArtpiece)
  })

  // $scope.printDiv = function(divName) {
  //   console.log('print')
  //   var printContents = document.getElementById(divName).innerHTML;
  //   var popupWin = window.open('', '_blank', 'width=300,height=300');
  //   popupWin.document.open()
  //   popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
  //   popupWin.document.close();
  // } 

  Stripe.setPublishableKey(gon.stripe_publishable_key);
  $scope.stripe_publishable_key = gon.stripe_publishable_key

  $scope.creds = {
    bucket: 'shori/qr_code_pictures',
    access_key: gon.aws_access_key,
    secret_key: gon.aws_secret_key
  }
 
  $scope.uploadQrCode = function() {
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
   
    if($scope.file) {
      var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
      console.log($scope.file.name);
   
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
    $scope.imageUrl = 'https://s3-eu-west-1.amazonaws.com/shori/qr_code_pictures/' + $scope.file.name;
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

}]);