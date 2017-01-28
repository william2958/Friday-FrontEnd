(function() {
'use strict';

	// Configure the routes for the authorization module
	angular.module('authorization')
	.config(routeConfig);

	// Set up the config object with stateprovider and urlrouterprovider
	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
	function routeConfig ($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode({
			enabled: true
		});

		// Set the default state to login
		$urlRouterProvider.otherwise('/');

		$stateProvider
			// Add the states for the module

			// Set up the base template for all other states to inherit
			.state('authorization', {
				abstract: true,
				templateUrl: 'src/authorization/authorization.html'
			})

			// Login state
			.state('authorization.login', {
				url: '/',
				templateUrl: 'src/authorization/login/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			})

			// Signup state
			.state('authorization.signup', {
				// url: '/signup',
				templateUrl: 'src/authorization/signup/signup.html',
				controller: 'SignupController',
				controllerAs: 'signup'
			})

			// Confirm email state, this one doesn't have a template 
			// Because it is a straight redirect
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

			// Forgot password state
			.state('authorization.forgotpassword', {
				// url: '/forgotpassword',
				templateUrl: 'src/authorization/password/forgotpassword.html',
				controller: 'ForgotPasswordController',
				controllerAs: 'forgot'
			})

			// Change password state
			// Includes a parameter in the url
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