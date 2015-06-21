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
		templateUrl: "/templates/workarea.html",
		requireLogin: true
	})

    $stateProvider.state("workarea.shared", {
		url: "^/workarea",
		controller: "workareaSharedCtrl",
		requireLogin: true,
		views: {
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

	// $urlRouterProvider.otherwise("/login");
});
