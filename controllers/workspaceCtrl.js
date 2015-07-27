angular.module('steam')

  .controller('workspaceListCtrl', ['$rootScope', '$scope', 'handler', function ($rootScope, $scope, handler) {
    $rootScope.user = handler.user().id

    if (($rootScope.currentObjPath === 'undefined') || ($rootScope.currentObjPath !== ('/home/' + $rootScope.user))) {
      handler.get('/home/' + $rootScope.user).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
    } else {
      handler.get('/home' + $rootScope.currentObjPath).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
    }
  }])

  .controller('workspaceDetailedCtrl', ['$rootScope', '$scope', 'handler', 'pdf', 'ngAudio', function ($rootScope, $scope, handler, pdf, ngAudio) {
    $rootScope.user = handler.user().id
    $scope.downloadPath = $rootScope.restapi + '/home' + $rootScope.currentObjPath
    handler.get('/home' + $rootScope.currentObjPath).then(function (response) {
      $scope.data = response
    })

    // Audio
    $scope.audio = ngAudio.load(response)

    // Video
    $scope.interface = {}
    $scope.$on('$videoReady', function videoReady () {
        $scope.interface.sources.add(response)
    })
  }])
