app.factory('ArtpieceService', ['$http', function ($http) {
  var ArtpieceService = {
    getArt: function(){
      return $http.get('/artpieces/artpieces_data');
    }
  }
  return ArtpieceService;
}])
