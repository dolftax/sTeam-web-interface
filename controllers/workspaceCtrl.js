angular.module("steam")

.controller("grouplistCtrl", ["$scope", function ($scope) {

}])

.controller("workspaceCtrl", ["$scope", "handler", "ngAudio", "video", function($scope, handler, ngAudio, video){
      handler.get("/home").then(function(response) {

      $scope.data = response;

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
