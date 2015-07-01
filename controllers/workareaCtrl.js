angular.module("steam")

.controller("optionsCtrl", ["$scope", "$modal", function ($scope, $modal) {

	$scope.createdoc = function () {

		$modal.open({
			templateUrl: "views/createdoc.html",
			controller: "createdocCtrl"
		})
	};

	$scope.createroom = function () {

		$modal.open({
			templateUrl: "views/createroom.html",
			controller: "createroomCtrl"
		})
	};

}])

.controller("createdocCtrl", ["$scope", function ($scope){
	
}])

.controller("createroomCtrl", ["$scope", function ($scope){
	
}])

.controller("commentsCtrl", ["$scope", function ($scope) {

}]);
