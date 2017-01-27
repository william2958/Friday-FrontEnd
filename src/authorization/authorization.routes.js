(function() {
'use strict';

	angular.module('authorization')
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('authorization', {
				abstract: true,
				templateUrl: 'src/authorization/authorization.html'
			})

			.state('authorization.login', {
				url: '/login',
				templateUrl: 'src/authorization/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})

			.state('authorization.signup', {
				url: '/signup',
				templateUrl: 'src/authorization/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'signup'
			})

			.state('authorization.confirmemail', {
				url: '/confirm_email/:tokenParam',
				controller: 'ConfirmEmailController',
				controllerAs: 'confirmemail',
				resolve: {
					myData: ['$stateParams',
						function($stateParams) {
							return $stateParams.tokenParam;
						}]
				}
			})

			.state('authorization.forgotpassword', {
				url: '/forgotpassword',
				templateUrl: 'src/authorization/password/forgotpassword.html',
				controller: 'ForgotPasswordController',
				controllerAs: 'forgot'
			})

			.state('authorization.changepassword', {
				url: '/changepassword/:tokenParam',
				templateUrl: 'src/authorization/password/changepassword.html',
				controller: 'ChangePasswordController',
				controllerAs: 'change',
				resolve: {
					myData: ['$stateParams',
						function($stateParams) {
							return $stateParams.tokenParam;
						}]
				}
			});
	};

})();