(function() {
'use strict';

	angular.module('myApp', ['ui.router', 'authorization', 'dashboard'])
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/login');

	}

})();