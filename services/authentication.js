sTeam.factory('auth', function($http, localStorageService) {

    var baseurl = 'http://dev-back1.techgrind.asia/',
        restapi = baseurl + 'scripts/rest.pike?request=';

    var handle_request = function(response) {
        localStorageService.add('user', JSON.stringify(response.data.me));
        console.log("steam-service", "response", response);
        return response.data;
    };

    var loginp = function() {
        var logindata = JSON.parse(localStorageService.get('logindata'));
        var user = JSON.parse(localStorageService.get('user'));
        console.log("logindebug", logindata, user);
        return logindata && user && user.id && user.id !== "guest";
    };

    var headers = function(login) {
        var logindata = JSON.parse(localStorageService.get('logindata'));
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
        console.log("sTeam service:", "login:", userid, password);

            if (userid !== "" && password !== "") {
                localStorageService.add('logindata', JSON.stringify({
                Authorization: 'Basic ' + window.btoa(userid + ":" + password)
            }));
                return $http.get(restapi + "login", headers(true)).then(handle_request);
            }
        },

        logout: function() {
            localStorageService.remove('logindata');
            localStorageService.remove('user');
            return $http.get(restapi + "login", headers()).then(handle_request);
        },

        loginp: loginp,
        user: function() {
            if (loginp()) {
                return JSON.parse(localStorageService.get('user'));
            }
        },

        get: function(request) {
            console.log("sTeam Service:", "GET", request);
            return $http.get(restapi + request, headers()).then(handle_request);
        },

        post: function(request, data) {
            console.log("sTeam Service:", "POST", request, data);
            return $http.post(restapi + request, data, headers()).then(handle_request);
        },

        put: function(request, data) {
            console.log("sTeam Service:", "PUT", request, data);
            return $http.put(restapi + request, data, headers()).then(handle_request);
        },

        delete: function(request) {
            console.log("sTeam Service:", "DELETE", request);
            return $http["delete"](restapi + request, headers()).then(handle_request);
        }
    };
});
