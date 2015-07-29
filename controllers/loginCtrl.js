angular.module('steam')

  .controller('loginCtrl', ['$scope', 'handler', '$state', function ($scope, handler, $state) {
    $scope.logIn = function () {
      handler.login($scope.signInUsername, $scope.signInPasswd).then(function (response) {
        $state.go('workarea.list')
      }).catch(function (e) {
        $state.go('login')
      })
    }
  }])
