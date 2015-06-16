steam.factory("steam", ['$scope', 'storage', function ( $scope, storage ) {

    var baseurl = "http://dev-back1.techgrind.asia/",
        restapi = baseurl + "scripts/rest.pike?request=";

    var handle_request = function(response) {
        storage.add("user", JSON.stringify(response.data.me));
        return response.data;
    };

    var loginp = function() {
        var logindata = JSON.parse(storage.get("logindata"));
        var user = JSON.parse(storage.get("user"));
        return logindata && user && user.id && user.id !== "guest";
    };

    var headers = function(login) {
        var logindata = JSON.parse(storage.get("logindata"));
        if (loginp() || (login && logindata)) {
            return {
                headers: logindata
            };
        } else {
            return {};
        }
    };

    return {
        login: function(userid, password) {
            if (userid !== "" && password !== "") {
                storage.add("logindata", JSON.stringify({
                Authorization: "Basic " + window.btoa(userid + ":" + password)
            }));
                return $http.get(restapi + "login", headers(true)).then(handle_request);
            }
        },

        logout: function() {
            storage.remove("logindata");
            storage.remove("user");
            return $http.get(restapi + "login", headers()).then(handle_request);
        },

        loginp: loginp,
        user: function() {
            if (loginp()) {
                return JSON.parse(storage.get("user"));
            }
        },

        get: function(request) {
            return $http.get(restapi + request, headers()).then(handle_request);
        },

        post: function(request, data) {
            return $http.post(restapi + request, data, headers()).then(handle_request);
        },

        put: function(request, data) {
            return $http.put(restapi + request, data, headers()).then(handle_request);
        },

        delete: function(request) {
            return $http["delete"](restapi + request, headers()).then(handle_request);
        }
    };
}]);

steam.run(["$rootScope", "$location", "steam", "$stateProvider", function ($rootScope, $location, steam, $stateProvider ) {
    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        if (!steam.loginp()&& next.requireLogin) {
            event.preventDefault();
            $state.go("index.login");
        }else if(steam.loginp()&& !next.requireLogin){
         event.preventDefault();
        $state.go("index.workarea");
        }
    });
}]);
