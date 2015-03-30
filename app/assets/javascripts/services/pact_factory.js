app.factory('PactService', ['$http', function ($http) {
  var PactService = {
    createPact: function(pact_data){
      console.log('reached factory')
      return $http.post('/pacts', pact_data, {});
    },
    getPacts: function(){
      return $http.get('/pacts/pacts_data');
    }
  }
  return PactService;
}])

