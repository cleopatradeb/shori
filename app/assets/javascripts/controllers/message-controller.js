app.controller('MessageController', ['$scope', '$http', function($scope, $http){
  console.log('I am the MSG controller');
  if (!gon.current_user) {
    window.location.href = "/users/sign_in";
  }
}]);