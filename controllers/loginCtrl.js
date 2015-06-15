var steam = angular.module("steam", ["ui.router", "angularLocalStorage", "ngCookies"]);

steam.controller("loginCtrl", ['$scope', 'storage', function ( $scope, storage ) {

$scope.logIn=function(){
        steam.login($scope.signInUsername, $scope.signInPasswd).then(function(response) {
                $state.go("workarea");
        }).catch(function(e){
                $state.go("login");
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
