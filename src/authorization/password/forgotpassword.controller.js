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
	      AuthorizationService.requestPasswordReset($ctrl.passwordResetForm)
	        .then(function(resp) {
	          // handle success response
	          $state.go('authorization.login')
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Password Reset Failed");
	        });
	    };
	}

})();