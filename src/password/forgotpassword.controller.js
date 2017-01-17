(function() {
'use strict';

	angular.module('myApp')
	.controller('ForgotPasswordController', ForgotPasswordController);

	ForgotPasswordController.$inject = ['$auth'];
	function ForgotPasswordController($auth) {
		var $ctrl = this;

		$ctrl.passwordResetForm = {};

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