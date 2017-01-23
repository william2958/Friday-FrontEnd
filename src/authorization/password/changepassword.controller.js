(function() {
'use strict';

	// The controller in charge of the page that updates the user's password
	angular.module('authorization')
	.controller('ChangePasswordController', ChangePasswordController);

	ChangePasswordController.$inject = ['$auth'];
	function ChangePasswordController($auth) {
		var $ctrl = this;

		// An object to hold all the form data
		$ctrl.updatePasswordForm = {};

		// Handle what happens when the user clicks the button
		$ctrl.handleUpdatePasswordBtnClick = function() {
	      $auth.updatePassword($ctrl.updatePasswordForm)
	        .then(function(resp) {
	          // handle success response
	          console.log("Password Reset Success");
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Password Reset Success");
	        });
	    };

	}

})();