angular.module('steam', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'textAngular', 'pdf', 'ngVideo'])

  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'loginCtrl',
      requireLogin: false
    })

      .state('workarea', {
        url: '/',
        requireLogin: true,
        templateUrl: '/templates/workarea.html',
        params: {
          autoActivateChild: 'workarea.list'
        }
      })

      .state('workarea.groups', {
        url: '^/groups/:path',
        requireLogin: true,
        views: {
          'options': {
            templateUrl: '/views/options.html',
            controller: 'optionsCtrl'
          },
          'groupsList': {
            templateUrl: '/views/groupsList.html',
            controller: 'groupsListCtrl'
          }
        }
      })

      .state('workarea.list', {
        url: '^/room/:path',
        requireLogin: true,
        views: {
          'options': {
            templateUrl: '/views/options.html',
            controller: 'optionsCtrl'
          },
          'workspaceList': {
            templateUrl: '/views/workspaceList.html',
            controller: 'workspaceListCtrl'
          },
          'comments': {
            templateUrl: '/views/comments.html',
            controller: 'commentsCtrl'
          }
        }
      })

      .state('workarea.detailed', {
        url: '^/document/:path',
        requireLogin: true,
        views: {
          'options': {
            templateUrl: '/views/options.html',
            controller: 'optionsCtrl'
          },
          'workspaceDetailed': {
            templateUrl: '/views/workspaceDetailed.html',
            controller: 'workspaceDetailedCtrl'
          },
          'comments': {
            templateUrl: '/views/comments.html',
            controller: 'commentsCtrl'
          }
        }
      })

    // Handle when routes here. In case of accesing a room directly, post login,
    // map the request URL and redirect to /path_to_room
    $urlRouterProvider
      .when('', '/')
      .otherwise('/login')
  })
