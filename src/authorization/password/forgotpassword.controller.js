(function() {
'use strict';

	// Controller for when the user clicks "forgot password"
	angular.module('authorization')
	.controller('ForgotPasswordController', ForgotPasswordController);

	ForgotPasswordController.$inject = ['$auth'];
	function ForgotPasswordController($auth) {
		var $ctrl = this;

		// An object to hold all the form data
		$ctrl.passwordResetForm = {};

		// To handle when the user clicks forgot password and filled out the form
		$ctrl.handlePwdResetBtnClick = function() {
	      $auth.requestPasswordReset($ctrl.passwordResetForm)
	        .then(function(resp) {
	          // handle success response
	          console.log("Password Reset Email Sent.");
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Password Reset Failed");
	        });
	    };
	}

})();