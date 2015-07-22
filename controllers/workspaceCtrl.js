angular.module("steam")

.controller("workspaceListCtrl", ["$rootScope", "$scope", "handler", function($rootScope, $scope, handler){
    $rootScope.user = handler.user().id;

    if(($rootScope.currentObjPath == "undefined") || ($rootScope.currentObjPath != ("/home/" + $rootScope.user))) {
        handler.get("/home/" + $rootScope.user).then(function(response) {
            $scope.data = response;
            $scope.items = $scope.data.inventory;
        });
    }
    else {
        handler.get("/home" + $rootScope.currentObjPath).then(function(response) {
            $scope.data = response;
            $scope.items = $scope.data.inventory;
        });
    };
}])

.controller("workspaceDetailedCtrl", ["$rootScope", "$scope", "handler", "ngAudio", "video", function($rootScope, $scope, handler, ngAudio, video){
      $rootScope.user = handler.user().id;
      $scope.downloadPath = $rootScope.restapi + $rootScope.currentObjPath;
      handler.get($rootScope.currentObjPath + $rootScope.user).then(function(response) {

      $scope.data = response;
      $scope.items = $scope.data.inventory;

      // Image
      $scope.image = {
            src : "",
            description : ""
      }

      // Audio
      $scope.audio = ngAudio.load("");

      // Video
      $scope.video.addSource("", "");

})
}]);
