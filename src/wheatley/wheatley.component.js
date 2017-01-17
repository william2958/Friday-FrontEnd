(function() {
'use strict';

	angular.module('myApp')
	.component('wheatley', {
		templateUrl: 'src/wheatley/wheatley.html',
		controller: WheatleyController
	});

	WheatleyController.$inject = ['$rootScope', '$timeout'];
	function WheatleyController ($rootScope, $timeout) {
		var $ctrl = this;
		var loginListenerSuccess;
		var loginListenerFailure;
		var logoutListener;
		var responseListener;

		var width = 12;
		var responsewidth = 15;

		$ctrl.status = {'border': width+'px solid blue'};

		$ctrl.$onInit = function() {
			loginListenerSuccess = $rootScope.$on('auth:login-success', onLoginSuccess);
			loginListenerFailure = $rootScope.$on('auth:login-error', onLoginFailure);
			logoutListener = $rootScope.$on('auth:logout-success', onLogoutSuccess);
			responseListener = $rootScope.$on('wheatley:respond', onWheatleyRespond)
		};

		$ctrl.$onDestroy = function() {
			loginListenerSuccess();
			loginListenerFailure();
			logoutListener();
			responseListener();
		}

		function onLoginSuccess(event, data) {
			$ctrl.status = {'border': width+'px solid green'};
		};

		function onLoginFailure(event, data) {
			$ctrl.status = {'border': width+'px solid red'};
		};

		function onLogoutSuccess(event, data) {
			$ctrl.status = {'border': width+'px solid blue'};
		};

		function onWheatleyRespond(event, data) {
			if (data.code === 0) {
				// Key pressed code
				$ctrl.status = {'border': responsewidth+'px solid blue'};
				$timeout(function() {
					$ctrl.status = {'border': width+'px solid blue'};
				}, 20);
			} else if (data.code === 1) {
				// Loading code
				$ctrl.status = {'border': width+'px solid orange'};
			} 
		}

		

	}	

})();