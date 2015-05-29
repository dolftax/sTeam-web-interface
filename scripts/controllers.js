var app=angular.module("sTeam", ["ngRoute","steam","LocalStorageModule"]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider,$locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/index.html",
        controller: "IndexCtrl",
        requireLogin: false
    })
  
    .when("/index", {
        templateUrl: "views/index.html",
        controller: "IndexCtrl",
        requireLogin: false
    })

    .when("/index.html", {
        templateUrl: "views/index.html",
        controller: "IndexCtrl",
        requireLogin: false
    })

    .when("/notifications", {
        templateUrl: "views/notifications.html",
        controller: "notificationsCtrl",
        requireLogin: true
    })

    .when("/editProfile", {
        templateUrl: "views/editProfile.html",
        controller: "editProfileCtrl",
        requireLogin: true
    })

    .when("/messages", {
        templateUrl: "views/messages.html",
        controller: "messagesCtrl",
        requireLogin: true
    })

    .when("/adminPanel", {
        templateUrl: "views/adminPanel.html",
        controller: "adminPanelCtrl",
        requireLogin: true
    })

    .when("/home/:parameters*",{
        templateUrl: "views/home.html",
        controller: "homeCtrl",
        requireLogin: true
    })

    .when("/home/",{
        templateUrl: "views/home.html",
        controller: "homeCtrl",
        requireLogin: true
    })

    .when("/home",{
        templateUrl: "views/home.html",
        controller: "homeCtrl",
        requireLogin: true
    })

    .when("/error",{
        templateUrl: "views/error.html",
        controller: "errorCtrl",
        requireLogin: true
    })

    .otherwise({ redirectTo: "/error" });
}]);

app.run(["$rootScope", "$location", "steam", function ($rootScope, $location,steam ) {
    $rootScope.$on ("$routeChangeStart", function (event, next, current) {
        if (!steam.loginp()&& next.requireLogin) {
            event.preventDefault();
            $location.path("/");
        } else if (steam.loginp() && !next.requireLogin) {
            event.preventDefault();
        $location.path("/notifications");
        }
    });
}]);

app.controller("IndexCtrl", ["$scope","steam","$location","$window",function ($scope,steam,$location,$window) {
    $scope.logIn = function () {
        var $btn = $("#btnSignIn");
        $btn.button("loading");
        steam.login($scope.userSignIn,$scope.signInpwd).then(function(response) {
            $btn.button("reset");
            $("#signIn").modal("hide");
            $location.path("/notifications");
            $window.location.reload();
        }).catch(function(e){
            $btn.button("reset");
            $("#signIn").modal("hide");
            swal("Whoops", "Wrong username or password", "error");
     })
    }  
}]);

app.controller("errorCtrl", ["$scope", function ($scope) {  
}]);

app.controller("editProfileCtrl", ["$scope", function ($scope) {
}]);

app.controller("notificationsCtrl", ["$scope", function ($scope) {
}]);

app.controller("messagesCtrl", ["$scope", function ($scope) { 
}]);

app.controller("adminPanelCtrl", ["$scope", function ($scope) { 
}]);

app.controller("homeCtrl", ["$scope","$routeParams","$location","steam","localStorageService","$window",function ($scope,$routeParams,$location,steam,localStorageService,$window) {
    $scope.myUrl = "http://dev-back1.techgrind.asia/scripts/rest.pike?request=/home/"+$routeParams.parameters;
    var userDetails = steam.user();
    $("#loadingBarModal").modal("show"); 

    $scope.saveText=function() {   
        var $btn = $("#btnSavaTextDocument");
        $btn.button("loading");
        var text=document.getElementById("saveTextContent").value;
        var data = JSON.stringify( { content:text});
        var request=/home/+$routeParams.parameters;    
        steam.post(request, data).then(function(response) {
            $btn.button("reset")
            alert("The document was saved successfully.");
        }).catch(function(e){
            $btn.button("reset");
            alert("Error while saving the file");
     });
    }   

    $scope.createNewTextFile=function(){
        var $btn = $("#btnSavaNewTextDocument");
        var data = JSON.stringify({ content: $scope.newtxtContent, type: "Document" });
        var request="/home/"+$routeParams.parameters+"/"+$scope.newtxtFileName;  
        
        $btn.button("loading"); 
        steam.put(request, data).then(function(response) {
            $btn.button("reset");
            $("#createNewTextDocumentModal").modal("hide"); 
            swal("The file was successfully created.", "success");
            $window.location.reload();
        }).catch(function(e){
            $btn.button("reset");
            swal("Whoops!", "Error while creating the file", "error");
        });
    }

    $scope.createRoom=function(){
        var $btn = $("#btnCreateRoom");
        $btn.button("loading");
        var data = JSON.stringify({ type: "Room" });
        var request="/home/"+$routeParams.parameters+"/"+$scope.roomName;
        steam.put(request,data).then(function(response) {
            $btn.button("reset");
            $("#createRoomModal").modal("hide");
            alert("The room was successfully created.");
            $window.location.reload();
        }).catch(function(e){
            $btn.button("reset");
            alert("Error while creating the room");
        });
     }

     $scope.WebUrl = "http://dev-back1.techgrind.asia";

     if($routeParams.parameters==null){
    

        $scope.RestQuery="/home/";
    }else{
        $scope.RestQuery="/home/"+$routeParams.parameters;
    }
    steam.get($scope.RestQuery).then(function(response) {

        if(response.error!=null){
            $location.path("/error");
        }else{
            $scope.Data = response;
            if (angular.isArray(response.object)) {
                $scope.objects = response.object;
                $scope.Dtype="room";
            } else {
                $scope.Dtype="doc";
                $scope.objects = [response.object];     
            }
            if (angular.isArray(response.inventory)) {
                $scope.inventory = response.inventory;
            } else {
                $scope.inventory = [response.inventory];
            }  
         
            //CREATE PATH FROM parameters 
            var path=$routeParams.parameters;
            if(path!=null){
                var indexs=[];
                for (i = 0; i < path.length; i++) { 
                    if(path.charAt(i)==="/")
                        indexs.push(i);
                }                   
                var name=path.split("/");
                var paths=[];
                paths.push({name:"home",url:"/home"});
                var i=0;      
                for (i = 0; i < indexs.length; i++) { 
                    paths.push({name:name[i],url:"/home/"+path.substring(0,indexs[i])});
                }
                paths.push({name:name[i],url:"/home/"+path});
                $scope.paths=paths;
            }else{
                $scope.paths=[{name:"home",url:"/home"}];
            }
        }
        $("#loadingBarModal").modal("hide"); 

    }).catch(function(e){
        $("#loadingBarModal").modal("hide");
        $location.path("/error");
        $window.location.reload();
     });  
    
      $scope.isHome=function(){
        return ($routeParams.parameters==undefined);
    }
}]);
app.controller("navController", ["$scope", "$location","steam",function ($scope,$location,steam) {
        
        $scope.setClass = function(path) {    
            if ($location.path().substr(0, path.length) == path) {
                return "active"
            }else{
                return ""
            }
        }
        $scope.logOut=function(){
         steam.logout();

        }
        $scope.isLogOut=function(){
        if(steam.loginp()==null||!steam.loginp()){
            return true;
        }else return false;            
    }        
    }]);
