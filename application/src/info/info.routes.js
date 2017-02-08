(function() {
'use strict';

	angular.module('info')
	.config(routeConfig);

	// Set up routes for additional information
	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$stateProvider

			// State about the security
			.state('security', {
				url: '/about',
				templateUrl: 'src/info/security/security.html',
				controller: 'SecurityInfoController',
				controllerAs: 'security'
			});

	}

})();