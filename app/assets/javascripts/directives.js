// Message box directive that is crashing my app
// app.directive('message', ['$compile', '$templateCache', function factory($compile) {
//   'use strict';
//   var messageObject = {
//     templateUrl: "<%= asset_path('templates/message.html') %>",
//     controller: function(){
//       UserService.userHash();
//     }
//     transclude: true,
//     restrict: 'E',
//     scope: true
//   };
//   return messageObject;
// }]);

// Angular file Upload

app.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});