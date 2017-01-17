(function() {
'use strict'

	angular.module('authorization')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$auth', '$state', '$rootScope', '$timeout'];
	function LoginController($auth, $state, $rootScope, $timeout) {

		var $ctrl = this;

		$ctrl.loginForm = {};

		$ctrl.handleLoginBtnClick = function() {
			console.log("Button Clicked");
			$rootScope.$broadcast('wheatley:respond', {code: 1});
			$auth.submitLogin($ctrl.loginForm)
				.then(function(resp) {
					// handle success response
					$state.go('dashboard.accounts')
					console.log("Login Successful!");
				})
				.catch(function(resp) {
					// handle error response
					$ctrl.errors = resp.errors;
					console.log(resp);
					console.log($ctrl.errors[0])
					console.log("Login Failed...");
				});
	    };

	    $ctrl.keypressed = function() {
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	console.log("button pressed");
	    }

	}


})();