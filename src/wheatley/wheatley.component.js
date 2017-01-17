(function() {
'use strict';

	angular.module('myApp')
	.component('wheatley', {
		templateUrl: 'src/wheatley/wheatley.html',
		controller: WheatleyController
	});

	WheatleyController.$inject = ['$rootScope'];
	function WheatleyController ($rootScope) {
		var $ctrl = this;
		var loginListenerSuccess;
		var loginListenerFailure;
		var logoutListener;

		$ctrl.backgroundColor = {'background-color': 'black'};

		$ctrl.$onInit = function() {
			loginListenerSuccess = $rootScope.$on('auth:login-success', onLoginSuccess);
			loginListenerFailure = $rootScope.$on('auth:login-error', onLoginFailure);
			logoutListener = $rootScope.$on('auth:logout-success', onLogoutSuccess);
		};

		$ctrl.$onDestroy = function() {
			loginListenerSuccess();
			loginListenerFailure();
		}

		function onLoginSuccess(event, data) {
			$ctrl.backgroundColor = {'background-color': 'green'};
		};

		function onLoginFailure(event, data) {
			$ctrl.backgroundColor = {'background-color': 'red'};
		};

		function onLogoutSuccess(event, data) {
			$ctrl.backgroundColor = {'background-color': 'black'};
		};

		

	}	

})();