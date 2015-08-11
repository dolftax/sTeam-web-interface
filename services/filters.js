angular.module('steam')

  .filter('reverse', function () {
    return function(items) {
      return items.slice().reverse()
    }
  })

  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url)
    }
  }])
