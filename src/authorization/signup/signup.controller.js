(function() {
'use strict';

	angular.module('authorization')
	.controller('SignupController', SignupController);

	SignupController.$inject = ['$auth', '$state', '$rootScope']
	function SignupController($auth, $state, $rootScope) {

		var $ctrl = this;

		$ctrl.registrationForm = {};

		$ctrl.$onInit = function() {
			$rootScope.$broadcast('wheatley:respond', {code: 4});
		}

		$ctrl.handleRegBtnClick = function() {

			$state.go('authorization.login')

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

		$ctrl.keypressed = function(code) {
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		$ctrl.handleRegBtnClick();
	    	}
    	}

	}


})();