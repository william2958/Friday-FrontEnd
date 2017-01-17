(function() {
'use strict'

	angular.module('myApp')
	.controller('LoginController', LoginController);

	function LoginController($auth) {

		var $ctrl = this;

		$ctrl.loginForm = {};

		$ctrl.handleLoginBtnClick = function() {
			console.log("Button Clicked");
	      $auth.submitLogin($ctrl.loginForm)
	        .then(function(resp) {
	          // handle success response
	          console.log("success")
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("failed")
	        });
	    };
	}


})();