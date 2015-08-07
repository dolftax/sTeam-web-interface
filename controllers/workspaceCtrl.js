angular.module('steam')

  .controller('workspaceListCtrl', ['$rootScope', '$scope', 'handler', 'localStorageService',
    function ($rootScope, $scope, handler, localStorageService) {
    $scope.invokeObj = function (itemClass, itemPath, itemMimeType) {
      while(itemPath.charAt(0) === '/') {
        itemPath = itemPath.substr(1)
      }
      handler.stateHandler(itemClass, itemPath, itemMimeType)
    }

    if ((localStorageService.get('currentObjPath') !== ('/home/' + $rootScope.user))) {
      handler.get('/home/' + $rootScope.user).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
    } else {
      handler.get('/home' + localStorageService.get('currentObjPath')).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
     }
  }])

  .controller('workspaceDetailedCtrl', ['$http', '$scope', 'handler', 'localStorageService',
   function ($http, $scope, handler, localStorageService) {
    $scope.dataSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')
    handler.get($scope.dataSrc, true).then(function (response) {
      $scope.data = response
    })
    $scope.mimeTypeHandler = function () {
      if(localStorageService.get('currentObjMimeType') === 'application/x-unknown-content-type') {
        return 'unknown'
      } else if (localStorageService.get('currentObjMimeType').match(/image\/*/)) {
        return 'image'
      } else if (localStorageService.get('currentObjMimeType') === 'application/pdf') {
        return 'pdf'
      } else if (localStorageService.get('currentObjMimeType').match(/audio\/*/)) {
        return 'audio'
      } else if (localStorageService.get('currentObjMimeType').match(/video\/*/)) {
        return 'video'
      } else if (localStorageService.get('currentObjMimeType').match(/text\/*/)) {
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
