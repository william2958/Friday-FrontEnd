(function() {
'use strict';

	angular.module('dashboard')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$state', 'AuthorizationService'];
	function DashboardController($state, AuthorizationService) {
		var $ctrl = this;

		$ctrl.user;

		$ctrl.$onInit = function() {
			if (AuthorizationService.getToken()) {
				AuthorizationService.getUser(AuthorizationService.getToken())
				.success(function(resp) {
					$ctrl.user = resp;
				})
				.error(function(resp) {
					console.log("There has been an error with finding the user")
					$state.go('authorization.login');
				});
			} else {
				$state.go('authorization.login');
			}
		}

		$ctrl.handleSignOutBtnClick = function() {
			AuthorizationService.signOut()
			$state.go('authorization.login');
	    };

	}

})();