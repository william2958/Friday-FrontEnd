(function() {
'use strict';

	// The main application
	angular.module('myApp', ['ui.router', 'authorization', 'dashboard', 'info'])
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

	}

})();