var steam = angular.module("steam", ["ui.router", "angularLocalStorage", "ngCookies"]);

steam.controller("loginCtrl", ["$scope", "steam", "storage", "$stateProvider", function ( $scope, steam, storage, $stateProvider) {

$scope.logIn=function(){
        steam.login($scope.signInUsername, $scope.signInPasswd).then(function(response) {
                $stateProvider.state.go("workarea");
        }).catch(function(e){
                $stateProvider.state.go("login");
     })
};

$scope.logOut=function(){
    steam.logout();
};

$scope.isLogOut=function(){
    if(steam.loginp()==null||!steam.loginp()){
        return true;
    } else return false;            
};

}]);
