angular.module('steam')

  .factory('handler', ['$http', 'localStorageService', 'config', '$state', '$rootScope',
    function ($http, localStorageService, config, $state, $rootScope) {
      $rootScope.baseurl = config.baseurl
      $rootScope.restapi = config.baseurl + 'scripts/rest.pike?request='

      var handleRequest = function (response) {
        localStorageService.set('user', JSON.stringify(response.data.me))
          $rootScope.user = response.data.me.id
          if (response.status === 401) {
          $rootScope.authStatus = false
        }
        $rootScope.loading = false
        return response.data
      }

      var loginp = function () {
        var logindata = JSON.parse(localStorageService.get('logindata'))
        var user = JSON.parse(localStorageService.get('user'))
        return logindata && user && user.id && user.id !== 'guest'
      }

      var headers = function (login) {
        var logindata = JSON.parse(localStorageService.get('logindata'))
        if (loginp() || (login && logindata)) {
          return {
            headers: logindata
          }
        } else {
          return {}
        }
      }

      return {
        login: function (userid, password) {
          if (userid !== '' && password !== '') {
            localStorageService.set('logindata', JSON.stringify({
              Authorization: 'Basic ' + window.btoa(userid + ':' + password)
            }))
            return $http.get($rootScope.restapi + 'login', headers(true))
              .then(handleRequest)
              .catch(function (e) {
                $rootScope.authStatus = false
              })
          }
        },

        logout: function () {
          localStorageService.remove('logindata')
          localStorageService.remove('user')
          return $http.get($rootScope.restapi + 'login', headers()).then(handleRequest)
        },

        loginp: loginp,
        user: function () {
          if (loginp()) {
            return JSON.parse(localStorageService.get('user'))
          }
        },

        stateHandler: function (classType, objPath, objMimeType) { // eslint-disable-line
          if (classType === 'Room') {
            $rootScope.currentObjPath = objPath
            $state.go('workarea.list', { path: objPath })
          } else if (classType === 'Document') {
            $rootScope.currentObjPath = objPath
            $rootScope.currentObjMimeType = objMimeType
            $state.go('workarea.detailed', { path: objPath })
          }
        },

        get: function (request, isDoc) {
          $rootScope.loading = true
          if (isDoc) {
            return $http.get(request, headers())
              .then(function (response) {
                $rootScope.loading = false
                return response.data
              })
            }
          return $http.get($rootScope.restapi + request, headers()).then(handleRequest)
        },

        post: function (request, data) {
          return $http.post($rootScope.restapi + request, data, headers()).then(handleRequest)
        },

        put: function (request, data) {
          return $http.put($rootScope.restapi + request, data, headers()).then(handleRequest)
        },

        delete: function (request) {
          return $http['delete']($rootScope.restapi + request, headers()).then(handleRequest)
        }
      }
    }])

  // Handle authentication on state change
  .run(['$rootScope', '$state', 'handler', function ($rootScope, $state, handler) {
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      if (!handler.loginp() && next.requireLogin) {
        event.preventDefault()
        $state.go('login')
      } else if (handler.loginp() && !next.requireLogin) {
        event.preventDefault()
        $state.go('workarea.list')
      }
    })
  }])

  // Handle room || document on state change
  .run(['$rootScope', '$state', 'handler', function ($rootScope, $state, handler) {
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      // handler.stateType == "list"
      // if ()
      // {
      //     event.preventDefault()
      //     $state.go("") // Go to list view
      //     // change the location URL
      // }else if(){
      //     event.preventDefault()
      //     $state.go("") // Go to detailed view
      // }
    })
  }])

  // Actions on state change
  .run(['$rootScope', '$state', 'handler', function ($rootScope, $state, handler) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toState && toState.params && toState.params.autoActivateChild) {
        $state.go(toState.params.autoActivateChild)
        $rootScope.user = handler.user().id
      }})
  }])
