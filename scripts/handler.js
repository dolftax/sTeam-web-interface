var app=angular.module('steam', ['ngRoute','LocalStorageModule']);

app.factory('steam', function($http, localStorageService) {
  var baseurl, handle_request, headers, loginp, restapi;
  baseurl = 'http://dev-back1.techgrind.asia/';
  restapi = baseurl + 'scripts/rest.pike?request=';
  handle_request = function(response) {
    localStorageService.add('user', JSON.stringify(response.data.me));
    console.log("steam-service", "response", response);
    return response.data;
  };
  loginp = function() {
    var logindata, user;
    logindata = JSON.parse(localStorageService.get('logindata'));
    user = JSON.parse(localStorageService.get('user'));
    console.log("logindebug", logindata, user);
    return logindata && user && user.id && user.id !== "guest";
  };
  headers = function(login) {
    var logindata;
    logindata = JSON.parse(localStorageService.get('logindata'));
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
      console.log("steam-service", "login:", userid, password);
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
      console.log("steam-service", "GET", request);
      return $http.get(restapi + request, headers()).then(handle_request);
    },
    post: function(request, data) {
      console.log("steam-service", "POST", request, data);
      return $http.post(restapi + request, data, headers()).then(handle_request);
    },
    put: function(request, data) {
      console.log("steam-service", "PUT", request, data);
      return $http.put(restapi + request, data, headers()).then(handle_request);
    },
    "delete": function(request) {
      console.log("steam-service", "DELETE", request);
      return $http["delete"](restapi + request, headers()).then(handle_request);
    }
  };
});
