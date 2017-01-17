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
				resolve: {
					auth: function($auth) {
						return $auth.validateUser();
					}
				},
				controller: 'DashboardController',
				controllerAs: 'dashboard'
			})

			.state('dashboard.accounts', {
				url: '/accounts',
				templateUrl: 'src/dashboard/accounts/accounts.html',
				controller: 'AccountsController',
				controllerAs: 'account'
			})

	}

})();