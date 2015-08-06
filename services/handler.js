angular.module('steam')

  .factory('handler', ['$http', 'localStorageService', 'config', '$state', '$rootScope',
    function ($http, localStorageService, config, $state, $rootScope) {
      localStorageService.set('baseurl', config.baseurl)
      localStorageService.set('restapi', (config.baseurl + 'scripts/rest.pike?request='))
      var handleRequest = function (response) {
        localStorageService.set('user', JSON.stringify(response.data.me))
          localStorageService.set('userId', response.data.me.id)
          if (response.status === 401) {
          localStorageService.set('authStatus', false)
        }
        $rootScope.loading = false
        return response.data
      }

      var loginp =  function () {
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
            return $http.get(localStorageService.get('restapi') + 'login', headers(true))
              .then(handleRequest)
              .catch(function (e) {
                localStorageService.set('authStatus', false)
              })
          }
        },

        loginp: loginp,
        logout: function () {
          localStorageService.clearAll()
          $state.go('login')
        },

        user: function () {
          if (loginp()) {
            return JSON.parse(localStorageService.get('user'))
          }
        },

        stateHandler: function (classType, objPath, objMimeType) { // eslint-disable-line
          if (classType === 'Room') {
            localStorageService.set('currentObjPath', objPath)
            $state.go('workarea.list', { path: objPath })
          } else if (classType === 'Document') {
            localStorageService.set('currentObjPath', objPath)
            localStorageService.set('currentObjMimeType', objMimeType)
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
          return $http.get(localStorageService.get('restapi') + request, headers()).then(handleRequest)
        },

        post: function (request, data) {
          return $http.post(localStorageService.get('restapi') + request, data, headers()).then(handleRequest)
        },

        put: function (request, data) {
          return $http.put(localStorageService.get('restapi') + request, data, headers()).then(handleRequest)
        },

        delete: function (request) {
          return $http['delete'](localStorageService.get('restapi') + request, headers()).then(handleRequest)
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

  // Actions on state change
  .run(['$rootScope', '$state', 'handler', 'localStorageService',
    function ($rootScope, $state, handler, localStorageService) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toState && toState.params && toState.params.autoActivateChild) {
        $state.go(toState.params.autoActivateChild)
        localStorageService.set('userId', handler.user().id)
      }})
  }])
