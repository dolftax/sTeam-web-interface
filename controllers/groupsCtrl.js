angular.module('steam')

  .controller('groupsListCtrl', ['$scope', 'handler', function ($scope, handler) {
    handler.breadcrumbFunc()
    handler.get('/home').then(function (response) {
      $scope.data = response
      $scope.items = $scope.data.inventory
    })
  }])
