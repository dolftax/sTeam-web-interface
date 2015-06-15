steam.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when("", "index.login");
	$urlRouterProvider.otherwise("index.login");

	$stateProvider
	.state("index", {
		templateUrl: "index.html",
		controller: "mainCtrl",
		requireLogin: false
	})

	.state("index.login", {
		templateUrl: "/templates/login.html",
		controller: "loginCtrl",
		requireLogin: false
	})

	.state("index.workarea", {
		templateUrl: "/templates/workarea.html",
		controller: "workareaCtrl",
		requireLogin: true,
		views: {
			"shared@index.workarea": {
				templateUrl: "/views/list"
			},
			":username@workarea": {
				templateUrl: "/views/list"
			}
		}
	})
});
