angular.module("steam")

.factory("handler", ["$http", "localStorageService", "config", "$state", "$rootScope",
    function ($http, localStorageService, config, $state, $rootScope) {

    $rootScope.restapi = config.baseurl + "scripts/rest.pike?request=";

    var handle_request = function (response) {
        localStorageService.set("user", JSON.stringify(response.data.me));
        return response.data;
    };

    var loginp = function () {
        var logindata = JSON.parse(localStorageService.get("logindata")),
            user = JSON.parse(localStorageService.get("user"));
        return logindata && user && user.id && user.id !== "guest";
    };

    var stateHandler = function (classType, objPath, objMimeType) {
        if (classType == "Room") {
            $rootScope.currentObjPath = objPath;
            $state.go("workarea.list", { path: objPath });
        }
        else if(classType == "Document") {
            $rootScope.currentObjPath = objPath;
            $rootScope.currentObjMimeType = objMimeType;
            $state.go("workarea.detailed", { path: objPath, mimeType: objMimeType });
        };
    };

    var headers = function (login) {
        var logindata = JSON.parse(localStorageService.get("logindata"));
        if (loginp() || (login && logindata)) {
            return {
                headers: logindata
            };
        } else {
            return {};
        }
    };

    return {
        login: function (userid, password) {
            if (userid !== "" && password !== "") {
                localStorageService.set("logindata", JSON.stringify({
                Authorization: "Basic " + window.btoa(userid + ":" + password)
            }));
                return $http.get($rootScope.restapi + "login", headers(true)).then(handle_request);
            }
        },

        logout: function () {
            localStorageService.remove("logindata");
            localStorageService.remove("user");
            return $http.get($rootScope.restapi + "login", headers()).then(handle_request);
        },

        loginp: loginp,
        user: function () {
            if (loginp()) {
                return JSON.parse(localStorageService.get("user"));
            }
        },

        get: function (request) {
            return $http.get($rootScope.restapi + request, headers()).then(handle_request);
        },

        post: function (request, data) {
            return $http.post($rootScope.restapi + request, data, headers()).then(handle_request);
        },

        put: function (request, data) {
            return $http.put($rootScope.restapi + request, data, headers()).then(handle_request);
        },

        delete: function (request) {
            return $http["delete"]($rootScope.restapi + request, headers()).then(handle_request);
        }
    };
}])

// Handle authentication on state change
.run(["$rootScope", "$state", "handler", function ($rootScope, $state, handler ) {
    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        if (!handler.loginp()&& next.requireLogin) {
            event.preventDefault();
            $state.go("login");
        }else if(handler.loginp()&& !next.requireLogin){
            event.preventDefault();
            $state.go("workarea.list");
        }
    });
}])

// Handle room || document on state change
.run(["$rootScope", "$state", "handler", function ($rootScope, $state, handler ) {
    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        // handler.stateType == "list"
        // if ()
        // {
        //     event.preventDefault();
        //     $state.go(""); // Go to list view
        //     // change the location URL
        // }else if(){
        //     event.preventDefault();
        //     $state.go(""); // Go to detailed view
        // }
    });
}])

// Auto activating Private state by default
.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState && toState.params && toState.params.autoActivateChild){
        $state.go(toState.params.autoActivateChild);
    }});
}]);
