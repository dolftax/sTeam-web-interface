angular.module('steam')

  .controller('loginCtrl', ['$rootScope', '$scope', 'handler', '$state', function ($rootScope, $scope, handler, $state) {
    $scope.logIn = function () {
      $rootScope.loading = true
      handler.login($scope.signInUsername, $scope.signInPasswd).then(function (response) {
        $state.go('workarea.list')
      }).catch(function (e) {
        $state.go('login')
      })
    }
  }])
