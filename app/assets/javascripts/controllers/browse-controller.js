app.controller('BrowseController', function($scope, $http, $location){
  console.log('I am the BROWSE controller');
  
  $http.get('/users/user_data')
  .success(function(data){
    console.log(data);
    if (data === null) {
      $location.path('/users/log_in')
    }
  })
});