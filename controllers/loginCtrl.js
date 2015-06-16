var steam = angular.module("steam", ["ui.router", "angularLocalStorage", "ngCookies"]);

steam.controller("loginCtrl", ["$scope", "handler", "storage", "$stateProvider", function ( $scope, handler, storage, $stateProvider) {

$scope.logIn=function(){
        handler.login($scope.signInUsername, $scope.signInPasswd).then(function(response) {
                $state.go("workarea");
        }).catch(function(e){
                $state.go("login");
     })
};

$scope.logOut=function(){
    handler.logout();
};

$scope.isLogOut=function(){
    if(handler.loginp()==null||!handler.loginp()){
        return true;
    } else return false;            
};

}]);
