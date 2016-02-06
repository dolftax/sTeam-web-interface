angular.module('steam')

  .controller('optionsCtrl', ['$state', '$scope', '$modal', '$location', 'localStorageService', 'handler',
    function ($state, $scope, $modal, $location, localStorageService, handler) {
    $scope.createdoc = function (docDetails) {
      $scope.docDetails = docDetails;
      $modal.open({
        templateUrl: 'views/createdoc.html',
        controller: 'createDocCtrl',
        resolve: {
          docDetails: function () {
            return $scope.docDetails;
          }
        }
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

  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    }
  }])

  .service('fileUpload', ['$rootScope', '$http', function ($rootScope, $http) {
    this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      $rootScope.loading = true;
      $rootScope.uploadComplete = false;
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function (){
        $rootScope.loading = false;
        $rootScope.uploadComplete = true;
        console.log("it is done");
      })
      .error(function (){
        console.log(status);
        $rootScope.loading = false;
        $rootScope.uploadComplete = false;
      });
    }
  }])

  .controller('createDocCtrl', ['$scope', '$location', '$modalInstance', 'fileUpload',
    function ($scope, $location, $modalInstance, fileUpload) {
      $scope.uploadFile = function (){
        var file = $scope.myFile;
        var uploadUrl = $location.path();
        console.log('file is ' );
        console.dir(file);
        fileUpload.uploadFileToUrl(file, uploadUrl);
      }
      $scope.submit = function () {
        // body...
      }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
  }])

  .controller('documentCtrl', ['$scope', 'PDFViewerService', function ($scope, pdf) {
    $scope.instance = pdf.Instance("viewer");
    $scope.prevPage = function () {
      $scope.instance.prevPage();
    }
    $scope.nextPage = function () {
      $scope.instance.nextPage();
    }
    $scope.gotoPage = function (page) {
      $scope.intance.gotoPage(page);
    }
    $scope.pageLoaded = function (currentPage, totalPages) {
      $scope.currentPage = currentPage;
      $scope.totalPages = totalPages;
    }
  }])

  .controller('createRoomCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
  }])
