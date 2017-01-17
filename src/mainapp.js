(function() {
'use strict';

	angular.module('myApp', ['ui.router', 'authorization'])
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

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

			.state('signup', {
				url: '/signup',
				templateUrl: 'src/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'signup'
			})

			.state('forgotpassword', {
				url: '/forgotpassword',
				templateUrl: 'src/password/forgotpassword.html',
				controller: 'ForgotPasswordController',
				controllerAs: 'forgot'
			})

			.state('changepassword', {
				url: '/changepassword',
				templateUrl: 'src/password/changepassword.html',
				controller: 'ChangePasswordController',
				controllerAs: 'change'
			})

			

	}

})();