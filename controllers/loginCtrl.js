angular.module("steam")

.controller("loginCtrl", ["$scope", "handler", "$state", function ($scope, handler, $state) {

$scope.logIn=function(){
        handler.login($scope.signInUsername, $scope.signInPasswd).then(function(response) {
                $state.go("workarea.list");
        }).catch(function(e){
                $state.go("login");
     });
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
