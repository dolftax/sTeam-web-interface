var steam = angular.module("steam", ["ui.router"]);

steam.config(function($stateProvider, $urlRouteProvider) {
	$urlRouteProvider.when("", "/index.login");
	$urlRouteProvider.otherwise("/index.login");

	$stateProvider
	.state("index", {
		templateUrl: "index.html",
		controller: "mainCtrl",
		requireLogin: false
	})

	.state("index.login", {
		templateUrl: "/templates/login.html",
		requireLogin: false
	})

	.state("index.workarea", {
		templateUrl: "/templates/workarea.html",
		controller: "workareaCtrl",
		requireLogin: true,
		views: {
			"shared@index.workarea": {
				templateUrl: "/views/list"
			}
			":username@workarea": {
				templateUrl: "/views/list"
			}
		}
	})
});
