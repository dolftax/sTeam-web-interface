angular.module("steam", ["ui.router", "LocalStorageModule", "colorpicker.module", "wysiwyg.module", "ngAudio", "ngVideo"])

.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
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
		templateUrl: "/templates/workarea.html"
	})
	
    .state("workarea.shared", {
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
			}
		}
	})

	.state("workarea.user", {
		url: "^/user",
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
	})

	// Handle when routes here. In case of accesing a room directly, post login,
	// map the request URL and redirect to /path_to_room 
	// $urlRouterProvider.otherwise("/login");
});
