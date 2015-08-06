angular.module('steam')

  .controller('loginCtrl', ['$rootScope', '$scope', 'handler', '$state', 'localStorageService',
    function ($rootScope, $scope, handler, $state, localStorageService) {
    $scope.logIn = function () {
      $rootScope.loading = true
      handler.login($scope.signInUsername, $scope.signInPasswd).then(function (response) {
        localStorageService.set('userId', $scope.signInUsername)
        $state.go('workarea.list')
      }).catch(function (e) {
        $state.go('login')
      })
    }
  }])
