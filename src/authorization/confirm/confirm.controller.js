(function() {
'use strict';

	angular.module('authorization')
	.controller('ConfirmEmailController', ConfirmEmailController);

	// Controller to handle confirmation of email
	// Email is sent from server with a link to this controller with
	// a confirm token attached in the parameters. The router creates this
	// controller passing that confirm token into myData 
	// This controller sends that confirm token back to the server to confirm
	// The account
	ConfirmEmailController.$inject = ['$state', 'AuthorizationService', 'myData'];
	function ConfirmEmailController($state, AuthorizationService, myData) {
		var $ctrl = this;

		$ctrl.$onInit = function() {

			// Include the confirm_token in the request payload
			var config = {
				'confirm_token': myData
			}

			// Call the confirmEmail function of the AuthorizationService
			AuthorizationService.confirmEmail(config)
			.then(function(resp) {
				// Add a success message
				AuthorizationService.addSuccess(resp.data.message);
				// Redirect to the login page
				$state.go('authorization.login');
			})
			.catch(function(resp) {
				// Add an error message
				AuthorizationService.addError("Email was not successfully confirmed");
				// Redirect to the login page anyway, where the error message
				// will be displayed
				$state.go('authorization.login');
			})

		}

	}

})();