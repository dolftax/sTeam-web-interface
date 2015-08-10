angular.module('steam')

  .controller('optionsCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.createdoc = function () {
      $modal.open({
        templateUrl: 'views/createdoc.html',
        controller: 'createDocCtrl'
      })
    }

    $scope.createroom = function () {
      $modal.open({
        templateUrl: 'views/createroom.html',
        controller: 'createRoomCtrl'
      })
    }

  }])

  .filter('reverse', function () {
    return function(items) {
      return items.slice().reverse()
    }
  })

  .controller('commentsCtrl', ['$scope', function ($scope) {}])

  .controller('createDocCtrl', ['$scope', function ($scope) { }])

  .controller('createRoomCtrl', ['$scope', function ($scope) {}])
