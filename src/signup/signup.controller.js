(function() {
'use strict';

	angular.module('myApp')
	.controller('SignupController', SignupController);

	function SignupController($auth) {

		var $ctrl = this;

		$ctrl.registrationForm = {};

		$ctrl.handleRegBtnClick = function() {
	      $auth.submitRegistration($ctrl.registrationForm)
	        .then(function(resp) {
	          // handle success response
	          console.log("Registration Success!")
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Registration Failed...")
	        });
    };

	}


})();