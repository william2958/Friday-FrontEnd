(function() {
'use strict';

	angular.module('myApp')
	.component('checklogin', {
		template: '<div ng-if="$ctrl.show">Successfully Logged in</div>',
		controller: LoggedInController
	});

	LoggedInController.$inject = ['$rootScope', '$auth'];
	function LoggedInController($rootScope, $auth) {
		var $ctrl = this;
		var listener;

		$ctrl.$onInit = function() {
			$ctrl.show = false;
			listener = $rootScope.$on('auth:login-success', onLoginSuccess);
		};

		$ctrl.$onDestroy = function() {
			listener()
		};

		function onLoginSuccess(event, data) {
			$ctrl.show = true;
			console.log($rootScope.user.signedIn)
			console.log($auth.validateUser())
		}

	}

})();

