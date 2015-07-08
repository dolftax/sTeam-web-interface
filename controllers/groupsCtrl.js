angular.module("steam")

.controller("groupsListCtrl", ["$scope", "handler", "$state", function ($scope, handler, $state) {
    handler.get("/home").then(function(response) {
        $scope.data = response;
        $scope.items = $scope.data.inventory;
    });

    $scope.state = function (stateType, objectPath, mimeType) {
        $state.go("workarea.user", { "path" : objectPath });
    };
}]);
