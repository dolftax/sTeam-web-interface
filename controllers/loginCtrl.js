angular.module('steam')

  .controller('loginCtrl', ['$rootScope', '$scope', 'handler', '$state', 'localStorageService',
    function ($rootScope, $scope, handler, $state, localStorageService) {
    $scope.logIn = function () {
      $rootScope.loading = true
      handler.login($scope.signInUsername, $scope.signInPasswd).then(function (response) {
        $state.go('workarea.list')
      })
    }
  }])
