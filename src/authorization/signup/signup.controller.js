(function() {
'use strict';

	angular.module('authorization')
	.controller('SignupController', SignupController);

	SignupController.$inject = ['$state', '$rootScope', 'AuthorizationService']
	function SignupController($state, $rootScope, AuthorizationService) {

		// Controller to handle user registration
		var $ctrl = this;

		// Object for all the data in the form
		$ctrl.registrationForm = {};

		// Errors to show the user if something goes wrong
		$ctrl.errors;

		$ctrl.$onInit = function() {
			// Reset the errors on initialization
			$ctrl.errors = [];
			// Tell wheatley to be smaller
			$rootScope.$broadcast('wheatley:respond', {code: 4});
		}

		$ctrl.handleRegBtnClick = function() {

			// Set up a config object to hold all the data from the form
			var config = {
				'email': $ctrl.registrationForm.email,
				'first_name': $ctrl.registrationForm.first_name,
				'last_name': $ctrl.registrationForm.last_name,
				'password': $ctrl.registrationForm.password
			}

			// Tell AuthorizationService to send out the request with the
			// config parameters
			AuthorizationService.signUp(config)
			.then(function(resp) {
				// handle success response
				AuthorizationService.addSuccess('User successfully registered.')
				AuthorizationService.clearErrors();
				$state.go('authorization.login')
			})
			.catch(function(resp) {
				if (resp.data.status == 'error'){
					// Display the errors to the user
					AuthorizationService.addError(resp.data.message)
					$ctrl.errors = AuthorizationService.getErrors();
				}
			});
    	};

    	// Every time the user presses a key update wheatley
		$ctrl.keypressed = function(code) {
			// Tell wheatley to pulse
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		// If the user enters the enter key
	    		$ctrl.handleRegBtnClick();
	    	}
    	}

	}


})();