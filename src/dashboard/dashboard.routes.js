(function() {
'use strict';

	angular.module('dashboard')
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('dashboard', {
				abstract: true,
				templateUrl: 'src/dashboard/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})

			.state('dashboard.accounts', {
				url: '/accounts',
				templateUrl: 'src/dashboard/accounts/accounts.html',
				controller: 'AccountsController',
				controllerAs: 'account'
			})

			.state('authorization.pin', {
				url: '/pin',
				templateUrl: 'src/authorization/pin/pin.html',
				controller: 'PinController',
				controllerAs: 'pin'
			});

	}

})();