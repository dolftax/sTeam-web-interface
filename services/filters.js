angular.module('steam')

  .filter('reverse', function () {
    return function(item) {
      return item.slice().reverse()
    }
  })

  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url)
    }
  }])
