angular.module('steam')

  .controller('navCtrl', ['$scope', 'handler', '$state', 'localStorageService',
    function ($scope, handler, $state, localStorageService) {
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
    $scope.userId = localStorageService.get('userId')
  }])
