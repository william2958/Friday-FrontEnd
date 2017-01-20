(function() {
'use strict'

	angular.module('authorization')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$auth', '$state', '$rootScope', '$timeout'];
	function LoginController($auth, $state, $rootScope, $timeout) {

		var $ctrl = this;

		$ctrl.loginForm = {};
		var loginListenerSuccess;

		$ctrl.$onInit = function() {
			loginListenerSuccess = $rootScope.$on('login:success', onLoginSuccess);
			$ctrl.showforgotpassword = false;
			$rootScope.$broadcast('wheatley:respond', {code: 5});
		}

		$ctrl.$onDestroy = function() {
			loginListenerSuccess();
		}

		function onLoginSuccess(event, data) {
			console.log("correct")
			$state.go('authorization.pin');
		}

		$ctrl.handleLoginBtnClick = function() {
			// console.log("Button Clicked");
			$rootScope.$broadcast('wheatley:respond', {code: 1});
			$auth.submitLogin($ctrl.loginForm)
				.then(function(resp) {
					$rootScope.$broadcast('wheatley:respond', {code: 6});
					// handle success response
					// Pass off to wheatley
				})
				.catch(function(resp) {
					// handle error response
					$rootScope.$broadcast('wheatley:respond', {code: 3});
					$ctrl.errors = resp.errors;
					$ctrl.showforgotpassword = true;
					// console.log(resp);
					// console.log($ctrl.errors[0])
					// console.log("Login Failed...");
				});
	    };

	    $ctrl.keypressed = function(code) {
	    	$rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		$ctrl.handleLoginBtnClick();
	    	}
    	}

	}


})();