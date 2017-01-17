(function() {
'use strict';

	angular.module('myApp', ['ui.router', 'ng-token-auth'])
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$authProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $authProvider, $urlRouterProvider) {

		$authProvider.configure({
			apiUrl: 'http://localhost:3000'
		});

		$urlRouterProvider.otherwise('/login');

		$stateProvider

			.state('login', {
				url: '/login',
				templateUrl: 'src/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})

			.state('user', {
				abstract: true,
				template: '<ui-view></ui-view>',
				resolve: {
					auth: function($auth) {
						return $auth.validateUser();
					}
				}
			})

			.state('user.loggedin', {
				url: '/accounts',
				templateUrl: '/src/accounts/accounts.html',
				controller: 'AccountsController',
				controllerAs: 'account'
			})

			

	}
	// function($authProvider, $stateProvider) {
	// 	$authProvider.configure({
	// 		apiUrl: 'http://localhost:3000'
	// 	});

	// 	$stateProvider// only authenticated users will be able to see routes that are
	//       // children of this state
	//       .state('admin', {
	//         url: '/admin',
	//         abstract: true,
	//         template: 'ADMIN'
	//         // resolve: {
	//         //   auth: function($auth) {
	//         //   	console.log($auth.validateUser())
	//         //     return $auth.validateUser();
	//         //   }
	//         // }
	//       })

	//       // this route will only be available to authenticated users
	//       .state('admin.dashboard', {
	//         url: '/dash',
	//         templateUrl: '/admin/dash.html',
	//         controller: 'AdminDashCtrl'
	//       });
	// });

})();