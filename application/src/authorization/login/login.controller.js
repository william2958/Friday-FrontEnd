(function() {
'use strict';

	// Controller for the login page
	angular.module('authorization')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', '$rootScope', '$timeout', 'AuthorizationService'];
	function LoginController($state, $rootScope, $timeout, AuthorizationService) {

		var $ctrl = this;

		// Attach all login form items to this object
		$ctrl.enteredLoginForm = {};

		$ctrl.validationerrors = false;

		// Set up a listener for a successful login from the Wheatley component
		var loginListenerSuccess;

		$ctrl.$onInit = function() {

			if (AuthorizationService.getToken()) {
				$state.go('dashboard.accounts');
			}

			$ctrl.errors = [];

			$ctrl.success = AuthorizationService.getSuccess();
			$ctrl.errors = AuthorizationService.getErrors();
			// Initialize the listener when the controller is initialized
			loginListenerSuccess = $rootScope.$on('login:success', onLoginSuccess);
			// Hide the forgot password field
			$ctrl.showforgotpassword = false;
			// Tell Wheatley to become normal sized
			$rootScope.$broadcast('wheatley:respond', {code: 5});
		};

		$ctrl.$onDestroy = function() {
			// Get rid of the listener
			loginListenerSuccess();
		};

		// Called when Wheatley broadcasts that the login was successful and
		// The success animation has been played
		function onLoginSuccess(event, data) {
			$state.go('authorization.pin');
		}

		// For when the user clicks "Sign-in"
		$ctrl.handleLoginBtnClick = function() {

			if ($ctrl.loginForm.$valid) {

				// Tell wheatley to show Loading indicator
				$rootScope.$broadcast('wheatley:respond', {code: 1});

				var config = {
					'email': $ctrl.enteredLoginForm.email,
					'password': $ctrl.enteredLoginForm.password
				};

				// Submit the form using AuthorizationService
				AuthorizationService.signIn(config)
					.then(function(resp) {
						var token = resp.data.auth_token;
						AuthorizationService.setToken(token);
						// Show success indicator
						$rootScope.$broadcast('wheatley:respond', {code: 6});
						// Pass off to wheatley
					})
					.catch(function(resp) {
						// If the sign in failed, clear all the messages
						// So that new ones can be added
						AuthorizationService.clearSuccess();
						$ctrl.success = [];
						AuthorizationService.clearErrors();
						$ctrl.errors = [];
						if (resp.data.status == 'error') {
							// If the server returned an error, add it
							// to the authorizationservice error array so 
							// it can be displayed on the login page
							AuthorizationService.addError(resp.data.message);

							// Update the errors for the view
							$ctrl.errors = AuthorizationService.getErrors();
						}
						// handle error response
						$rootScope.$broadcast('wheatley:respond', {code: 3});
						// Show the forgot password button after
						// the user entered the wrong password
						$ctrl.showforgotpassword = true;
					});
			} else {
				// console.log("error logging in.")
			}
	    };

	    $ctrl.keypressed = function(code) {
	    	// Tell wheatley to pulse everytime the user presses a key
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		// If the key was enter
	    		$ctrl.handleLoginBtnClick();
	    	}
    	};

	}


})();