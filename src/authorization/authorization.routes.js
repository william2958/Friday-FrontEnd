(function() {
'use strict';

	angular.module('authorization')
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('login', {
				url: '/login',
				templateUrl: 'src/authorization/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})

			.state('signup', {
				url: '/signup',
				templateUrl: 'src/authorization/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'signup'
			})

			.state('forgotpassword', {
				url: '/forgotpassword',
				templateUrl: 'src/authorization/password/forgotpassword.html',
				controller: 'ForgotPasswordController',
				controllerAs: 'forgot'
			})

			.state('changepassword', {
				url: '/changepassword',
				templateUrl: 'src/authorization/password/changepassword.html',
				controller: 'ChangePasswordController',
				controllerAs: 'change'
			});
	};

})();