angular.module("steam")

.controller("roomCtrl", ["$scope", "handler", function($scope, handler){
      handler.get("/home").then(function(response) {

            $scope.data = response;
            console.log(response);
      })
}]);

.controller("docCtrl", ["$scope", "ngAudio", "video", function($scope, ngAudio, video) {

      //Text
      $scope.data = {};

      $scope.menu = [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['font'],
            ['font-size'],
            ['font-color', 'hilite-color'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['code', 'quote', 'paragragh'],
            ['link', 'image']
      ];

      // Image
      $scope.image = {
            "src" : "",
            "description" : ""
      }

      // Audio
      $scope.audio = ngAudio.load("");

      // Video
      video.addSource("", "");
}]);

.controller("optionsCtrl", ["$scope", function ($scope) {

}])

.controller("commentsCtrl", ["$scope", function ($scope) {

}])

*/
