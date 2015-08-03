angular.module('steam')

  .controller('workspaceListCtrl', ['$rootScope', '$scope', 'handler', function ($rootScope, $scope, handler) {
    $scope.invokeObj = function (itemClass, itemPath, itemMimeType) {
      while(itemPath.charAt(0) === '/') {
        itemPath = itemPath.substr(1)
      }
      handler.stateHandler(itemClass, itemPath, itemMimeType)
    }
    if (($rootScope.currentObjPath !== ('/home/' + $rootScope.user))) {
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

  .controller('workspaceDetailedCtrl', ['$http', '$rootScope', '$scope', 'handler', function ($http, $rootScope, $scope, handler) {
    $scope.dataSrc = $rootScope.baseurl + 'home/' + $rootScope.currentObjPath
    handler.get($scope.dataSrc, true).then(function (response) {
      $scope.data = response
    })
    $scope.mimeTypeHandler = function () {
      if($rootScope.currentObjMimeType === 'application/x-unknown-content-type') {
        return 'unknown'
      } else if ($rootScope.currentObjMimeType.match(/image\/*/)) {
        return 'image'
      } else if ($rootScope.currentObjMimeType === 'application/pdf') {
        return 'pdf'
      } else if ($rootScope.currentObjMimeType.match(/audio\/*/)) {
        return 'audio'
      } else if ($rootScope.currentObjMimeType.match(/video\/*/)) {
        return 'video'
      } else if ($rootScope.currentObjMimeType.match(/text\/*/)) {
        return 'text'
      } else { return 'notfound' }
    }

    // Audio
    // $scope.audio = ngAudio.load($scope.data)

    // Video
    $scope.interface = {}
    $scope.$on('$videoReady', function videoReady () {
      $scope.interface.sources.add($scope.data)
    })
  }])
