angular.module("steam", ["ui.router", "angularLocalStorage", "ngCookies"])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "/templates/login.html",
		controller: "loginCtrl",
		requireLogin: false
	})

	.state("workarea", {
		url: "/workarea",
		templateUrl: "/templates/workarea.html",
		controller: "workareaSharedCtrl",
		requireLogin: true
	})

	.state("workarea.shared", {
		url: "/shared",
		templateUrl: "/templates/workarea.html",
		controller: "workareaSharedCtrl",
		views: {
			"breadcrumb@workarea.shared": {
				templateUrl: "/views/options.html"
			},
			"workspace@workarea.shared": {
				templateUrl: "/views/workspace.html"
			}
		}
	})

	.state("workarea.user", {
		url: "/:username",
		templateUrl: "/templates/workarea.html",
		controller: "workareaUserCtrl",
		requireLogin: true,
		views: {
			"breadcrumb@workarea.user": {
				templateUrl: "/views/options.html"
			},
			"workspace@workarea.user": {
				templateUrl: "/views/workspace.html"
			},
			"comments@workarea.user": {
				templateUrl: "/views/comments.html"
			}
		}
	})
});
