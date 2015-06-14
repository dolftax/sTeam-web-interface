steam.controller("loginCtrl", ["$scope","steam","$location","$window",function ($scope, sTeam, $location, $window) {

$scope.logIn=function(){
        var $btn = $("#btnSignIn");
        $btn.button("loading");
        sTeam.login($scope.userSignIn, $scope.signInpwd).then(function(response) {
                $btn.button("reset");
                $("#signIn").modal("hide");
                $location.path("/workarea");
                $window.location.reload();
        }).catch(function(e){
                $btn.button("reset");
                $("#signIn").modal("hide");
                alert("Wrong username or password");
     })
    }  
}]);
