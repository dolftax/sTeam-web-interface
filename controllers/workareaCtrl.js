angular.module("steam")

.controller("workareaSharedCtrl", ["$scope", function ($scope) {

}])

.controller("workareaUserCtrl", ["$scope", function ($scope) {

}])

.controller("workspaceCtrl", ["$scope", "ngAudio", "video", function($scope, ngAudio, video) {

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
