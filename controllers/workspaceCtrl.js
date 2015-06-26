angular.module("steam")

.controller("grouplistCtrl", ["$scope", function ($scope) {

}])

.controller("workspaceCtrl", ["$scope", "handler", "ngAudio", "video", function($scope, handler, ngAudio, video){
      handler.get("/home").then(function(response) {

      $scope.data = response;
      console.log(response);

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
      $scope.video.addSource("", "");

})
}]);
