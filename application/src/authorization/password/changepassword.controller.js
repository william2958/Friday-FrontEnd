(function() {
'use strict';

	angular.module('authorization')
	.controller('ChangePasswordController', ChangePasswordController);

	// The controller in charge of the page that updates the user's password
	ChangePasswordController.$inject = ['$state', 'AuthorizationService', 'myData'];
	function ChangePasswordController($state, AuthorizationService, myData) {
		var $ctrl = this;

		// An object to hold all the form data
		$ctrl.updatePasswordForm = {};

		$ctrl.passwords_match = false;

		// Handle what happens when the user clicks the button
		$ctrl.handleUpdatePasswordBtnClick = function() {

			if ($ctrl.verifyPasswordForm.$valid) {
				
				if ($ctrl.updatePasswordForm.password === $ctrl.updatePasswordForm.password_confirmation) {

					$ctrl.passwords_match = false;

					// Set up the config parameters for the reqest parameters
					var config = {
						'confirm_token': myData,
						'password': $ctrl.updatePasswordForm.password
					};

					// Clear all the messages before we return anything
					AuthorizationService.clearSuccess();
					$ctrl.success = [];
					AuthorizationService.clearErrors();
					$ctrl.errors = [];

					// Call the change password function with the config parameters
					AuthorizationService.changePassword(config)
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
				} else {
					$ctrl.passwords_match = true;
				}
			}
	    };

	}

})();