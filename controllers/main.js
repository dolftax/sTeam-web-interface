var sTeam = angular.module("sTeam", ["ui.router"]);

sTeam.config(function($stateProvider, $urlRouteProvider) {
	$urlRouteProvider.when("", "/index");
	$urlRouteProvider.otherwise("/index");

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
