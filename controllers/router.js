angular.module("steam", ["ui.router", "LocalStorageModule", "colorpicker.module", "wysiwyg.module", "ngAudio", "ngVideo"])

.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state("login", {
		url: "/login",
		templateUrl: "/templates/login.html",
		controller: "loginCtrl",
		requireLogin: false
	})

    $stateProvider.state("workarea", {
		url: "/",
		requireLogin: true,
		views: {
			"": {
				templateUrl: "/templates/workarea.html",
				controller: "workareaSharedCtrl"
			},
			"options": {
				templateUrl: "/views/options.html"
			},
			"workspace": {
				templateUrl: "/views/workspace.html"
			}
		}
	})

	.state("workarea.user", {
		url: "^/user",
		controller: "workareaUserCtrl",
		requireLogin: true,
		views: {
			"options": {
				templateUrl: "/views/options.html"
			},
			"workspace": {
				templateUrl: "/views/workspace.html"
			},
			"comments": {
				templateUrl: "/views/comments.html"
			}
		}
	})

	// Handle when routes here. In case of accesing a room directly, post login,
	// map the request URL and redirect to /path_to_room 
	// $urlRouterProvider.otherwise("/login");
});
