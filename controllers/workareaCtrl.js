angular.module('steam')

  .controller('optionsCtrl', ['$state', '$scope', '$modal', 'localStorageService', 'handler',
    function ($state, $scope, $modal, localStorageService, handler) {
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
    $scope.delete = function () {
      if (localStorageService.get('currentObjPath') != null) {
        handler.delete('/' + localStorageService.get('currentObjPath')).then(function () {
          swal('Object deleted successfully')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          swal('Unable to delete your current selection')
        })
      }
    }
  }])

  .controller('commentsCtrl', ['$scope', function ($scope) {}])

  .controller('createDocCtrl', ['$scope', function ($scope) { }])

  .controller('createRoomCtrl', ['$scope', function ($scope) {}])
