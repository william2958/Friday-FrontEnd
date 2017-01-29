(function() {
'use strict';

	// Controller for when the user clicks "forgot password"
	angular.module('authorization')
	.controller('ForgotPasswordController', ForgotPasswordController);

	ForgotPasswordController.$inject = ['$state', 'AuthorizationService'];
	function ForgotPasswordController($state, AuthorizationService) {
		var $ctrl = this;

		// An object to hold all the form data
		$ctrl.passwordResetForm = {};

		// To handle when the user clicks forgot password and filled out the form
		$ctrl.handlePwdResetBtnClick = function() {

			if ($ctrl.emailForm.$valid) {

				// Set up the config parameters for the reqest parameters
				var config = {
					'email': $ctrl.passwordResetForm.email
				};

				// Clear all the messages before we return anything
				AuthorizationService.clearSuccess();
				$ctrl.success = [];
				AuthorizationService.clearErrors();
				$ctrl.errors = [];

				// Tell AuthorizationService to send a request to reset the password
				AuthorizationService.requestPasswordReset(config)
					.then(function(resp) {
						// handle success response
						// Add a success message to the authorization service
						AuthorizationService.addSuccess(resp.data.message);
						$state.go('authorization.login');
					})
					.catch(function(resp) {
						// handle error response
						// Add an error message to the authorization service
						AuthorizationService.addError(resp.data.message);
						$state.go('authorization.login');
					});
		    };
		}	
	}

})();