(function() {
'use strict';

	// The controller in charge of the page that updates the user's password
	angular.module('authorization')
	.controller('ChangePasswordController', ChangePasswordController);

	ChangePasswordController.$inject = ['$state', 'AuthorizationService', 'myData'];
	function ChangePasswordController($state, AuthorizationService, myData) {
		var $ctrl = this;

		// An object to hold all the form data
		$ctrl.updatePasswordForm = {};

		console.log(myData);

		// Handle what happens when the user clicks the button
		$ctrl.handleUpdatePasswordBtnClick = function() {

			var config = {
				'confirm_token': myData,
				'password': $ctrl.updatePasswordForm.password
			}

	      AuthorizationService.changePassword(config)
	        .then(function(resp) {
	          // handle success response
	          $state.go('authorization.login')
	          console.log("Password Reset Success");
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Password Reset Success");
	        });
	    };

	}

})();