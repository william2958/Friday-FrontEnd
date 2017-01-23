(function() {
'use strict'

	// Controller for the login page
	angular.module('authorization')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$auth', '$state', '$rootScope', '$timeout'];
	function LoginController($auth, $state, $rootScope, $timeout) {

		var $ctrl = this;

		// Attach all login form items to this object
		$ctrl.loginForm = {};

		// Set up a listener for a successful login from the Wheatley component
		var loginListenerSuccess;

		$ctrl.$onInit = function() {
			// Initialize the listener when the controller is initialized
			loginListenerSuccess = $rootScope.$on('login:success', onLoginSuccess);
			// Hide the forgot password field
			$ctrl.showforgotpassword = false;
			// Tell Wheatley to become normal sized
			$rootScope.$broadcast('wheatley:respond', {code: 5});
		}

		$ctrl.$onDestroy = function() {
			// Get rid of the listener
			loginListenerSuccess();
		}

		// Called when Wheatley broadcasts that the login was successful and
		// The success animation has been played
		function onLoginSuccess(event, data) {
			$state.go('authorization.pin');
		}

		// For when the user clicks "Sign-in"
		$ctrl.handleLoginBtnClick = function() {
			// Tell wheatley to show Loading indicator
			$rootScope.$broadcast('wheatley:respond', {code: 1});
			// Submit the form using $auth
			$auth.submitLogin($ctrl.loginForm)
				.then(function(resp) {
					// Show success indicator
					$rootScope.$broadcast('wheatley:respond', {code: 6});
					// handle success response
					// Pass off to wheatley
				})
				.catch(function(resp) {
					// handle error response
					$rootScope.$broadcast('wheatley:respond', {code: 3});
					// Show the errors to the user
					$ctrl.errors = resp.errors;
					$ctrl.showforgotpassword = true;
				});
	    };

	    $ctrl.keypressed = function(code) {
	    	// Tell wheatley to pulse everytime the user presses a key
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		// If the key was enter
	    		$ctrl.handleLoginBtnClick();
	    	}
    	}

	}


})();