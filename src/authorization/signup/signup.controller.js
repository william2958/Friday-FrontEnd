(function() {
'use strict';

	angular.module('authorization')
	.controller('SignupController', SignupController);

	SignupController.$inject = ['$state', '$rootScope', 'AuthorizationService']
	function SignupController($state, $rootScope, AuthorizationService) {

		var $ctrl = this;

		$ctrl.registrationForm = {};

		$ctrl.$onInit = function() {
			$rootScope.$broadcast('wheatley:respond', {code: 4});
		}

		$ctrl.handleRegBtnClick = function() {

			var config = {
				'email': $ctrl.registrationForm.email,
				'first_name': $ctrl.registrationForm.first_name,
				'last_name': $ctrl.registrationForm.last_name,
				'password': $ctrl.registrationForm.password
			}

			AuthorizationService.signUp(config)
			.then(function(resp) {
				// handle success response
				console.log("Registration Success!")
				$state.go('authorization.login')
			})
			.catch(function(resp) {
				// handle error response
				console.log("Registration Failed...")
			});
    	};

		$ctrl.keypressed = function(code) {
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		$ctrl.handleRegBtnClick();
	    	}
    	}

	}


})();