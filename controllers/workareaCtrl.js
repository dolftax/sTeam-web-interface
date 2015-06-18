angular.module("steam")

.controller("workspaceCtrl", ["$scope", "video", function($scope, video) {

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

      // Video
      video.addSource("", "");
}]);