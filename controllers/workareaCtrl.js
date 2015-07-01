angular.module("steam")

.controller("optionsCtrl", ["$scope", "$modal", function ($scope, $modal) {

	$scope.createdoc = function () {

		$modal.open({
			templateUrl: "views/createdoc.html",
			controller: "createdocCtrl"
		})
	};
}])

.controller("createdocCtrl", ["$scope", function ($scope){
	
}])

.controller("commentsCtrl", ["$scope", function ($scope) {

}]);
