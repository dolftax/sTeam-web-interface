angular.module('steam')

  .controller('workspaceListCtrl', ['$rootScope', '$scope', 'handler', function ($rootScope, $scope, handler) {
    $scope.invokeObj = function (itemClass, itemPath, itemMimeType) {
      while(itemPath.charAt(0) === '/') {
        itemPath = itemPath.substr(1)
      }
      handler.stateHandler(itemClass, itemPath, itemMimeType)
    }
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

  .controller('workspaceDetailedCtrl', ['$rootScope', '$scope', 'handler', 'ngAudio', function ($rootScope, $scope, handler, ngAudio) {
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

    // Text
    taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['indent', 'outdent'],
      ['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount']
    ]
  }])
