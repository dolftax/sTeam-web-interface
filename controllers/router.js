angular.module("steam", ["ui.router", "LocalStorageModule", "textAngular", "ngAudio", "ngVideo"])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state("login", {
		url: "/login",
		templateUrl: "/templates/login.html",
		controller: "loginCtrl",
		requireLogin: false
	})

	.state("workarea", {
		url: "/",
		requireLogin: true,
		templateUrl: "/templates/workarea.html",
		params: {
			autoActivateChild: "workarea.user"
    }
	})

    .state("workarea.groups", {
		url: "^/groups",
		requireLogin: true,
		views: {
			"options": {
				templateUrl: "/views/options.html",
				controller: "optionsCtrl"
			},
			"groupsList": {
				templateUrl: "/views/groupsList.html",
				controller: "groupsListCtrl"
			}
		}
	})

	.state("workarea.user", {
		url: "^/workarea",
		requireLogin: true,
		views: {
			"options": {
				templateUrl: "/views/options.html",
				controller: "optionsCtrl"
			},
			"workspace": {
				templateUrl: "/views/workspace.html",
				controller: "workspaceCtrl"
			},
			"comments": {
				templateUrl: "/views/comments.html",
				controller: "commentsCtrl"
			}
		}
	});

	// Handle when routes here. In case of accesing a room directly, post login,
	// map the request URL and redirect to /path_to_room 
	$urlRouterProvider
	.when("/user", "/workarea/user")
	.when("", "/")
	.otherwise("/login");
});
