(function() {
'use strict'

	angular.module('myApp')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['$auth'];
	function LoginController($auth) {

		var $ctrl = this;

		$ctrl.loginForm = {};

		$ctrl.handleLoginBtnClick = function() {
			console.log("Button Clicked");
	      $auth.submitLogin($ctrl.loginForm)
	        .then(function(resp) {
	          // handle success response
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
	}


})();