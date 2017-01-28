(function() {
'use strict';

	angular.module('dashboard')
	.config(routeConfig);

	// Set up the routes for the dashboard
	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$stateProvider
			// Set the default dashboard view
			.state('dashboard', {
				abstract: true,
				templateUrl: 'src/dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})

			// State for the accounts view
			.state('dashboard.accounts', {
				// url: '/accounts',
				templateUrl: 'src/dashboard/accounts/accounts.html',
				controller: 'AccountsController',
				controllerAs: 'account'
			})

			// State to set up the pin
			.state('authorization.pin', {
				// url: '/pin',
				templateUrl: 'src/dashboard/pin/pin.html',
				controller: 'PinController',
				controllerAs: 'pin'
			});

	}

})();