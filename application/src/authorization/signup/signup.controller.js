(function() {
'use strict';

	angular.module('authorization')
	.controller('SignupController', SignupController);

	SignupController.$inject = ['$state', '$rootScope', 'AuthorizationService'];
	function SignupController($state, $rootScope, AuthorizationService) {

		// Controller to handle user registration
		var $ctrl = this;

		// Object for all the data in the form
		$ctrl.registrationForm = {};

		$ctrl.passwords_match = false;

		$ctrl.$onInit = function() {
			// Reset the errors on initialization
			$ctrl.errors = [];
			// Tell wheatley to be smaller
			$rootScope.$broadcast('wheatley:respond', {code: 4});
		};

		$ctrl.handleRegBtnClick = function() {

			if ($ctrl.signupForm.$valid) {

				if ($ctrl.registrationForm.password === $ctrl.registrationForm.password_confirmation) {

					AuthorizationService.clearSuccess();
					AuthorizationService.clearErrors();

					$ctrl.passwords_match = false;

					// Set up a config object to hold all the data from the form
					var config = {
						'email': $ctrl.registrationForm.email,
						'first_name': $ctrl.registrationForm.first_name,
						'last_name': $ctrl.registrationForm.last_name,
						'password': $ctrl.registrationForm.password
					};

					// Tell wheatley to show Loading indicator
					$rootScope.$broadcast('wheatley:respond', {code: 1});

					// Tell AuthorizationService to send out the request with the
					// config parameters
					AuthorizationService.signUp(config)
					.then(function(resp) {
						// handle success response
						// Show success indicator
						$rootScope.$broadcast('wheatley:respond', {code: 2});
						AuthorizationService.addSuccess('User successfully registered.');
						AuthorizationService.clearErrors();
						$state.go('authorization.login');
					})
					.catch(function(resp) {
						if (resp.data.status == 'error'){
							// Display the errors to the user
							AuthorizationService.addError(resp.data.message);
							$ctrl.errors = AuthorizationService.getErrors();
						}
					});
				} else {
					$ctrl.passwords_match = true;
				}

			}
    	};

    	$ctrl.handleCancelClick = function() {
    		// If the sign up cancelled, clear all the messages
			// So that new ones can be added
			AuthorizationService.clearSuccess();
			$ctrl.success = [];
			AuthorizationService.clearErrors();
			$ctrl.errors = [];
    		$state.go('authorization.login');
    	};

    	// Every time the user presses a key update wheatley
		$ctrl.keypressed = function(code) {
			// Tell wheatley to pulse
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		// If the user enters the enter key
	    		$ctrl.handleRegBtnClick();
	    	}
    	};

	}


})();