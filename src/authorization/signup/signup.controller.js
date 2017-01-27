(function() {
'use strict';

	angular.module('authorization')
	.controller('SignupController', SignupController);

	SignupController.$inject = ['$state', '$rootScope', 'AuthorizationService']
	function SignupController($state, $rootScope, AuthorizationService) {

		var $ctrl = this;

		$ctrl.registrationForm = {};

		$ctrl.errors;

		$ctrl.$onInit = function() {
			$ctrl.errors = [];
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
				AuthorizationService.addSuccess('User successfully registered.')
				AuthorizationService.clearErrors();
				$state.go('authorization.login')
			})
			.catch(function(resp) {
				if (resp.data.status == 'error'){
					AuthorizationService.addError(resp.data.message)
					$ctrl.errors = AuthorizationService.getErrors();
				}
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