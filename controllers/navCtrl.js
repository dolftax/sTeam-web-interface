angular.module('steam')

  .controller('navCtrl', ['$rootScope', '$scope', 'handler', '$state', 'localStorageService',
    function ($rootScope, $scope, handler, $state, localStorageService) {
    $scope.authStatus = {
      logOut: function () {
        handler.logout()
        $state.go('login')
      },
      isLoggedOut: function () {
        if (handler.loginp() == null || !handler.loginp()) {
          return true
        } else return false
      }
    }
    $rootScope.user = localStorageService.get('username')
  }])
