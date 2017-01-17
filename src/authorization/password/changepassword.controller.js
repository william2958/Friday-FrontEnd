(function() {
'use strict';

	angular.module('authorization')
	.controller('ChangePasswordController', ChangePasswordController);

	ChangePasswordController.$inject = ['$auth'];
	function ChangePasswordController($auth) {
		var $ctrl = this;

		$ctrl.updatePasswordForm = {};

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