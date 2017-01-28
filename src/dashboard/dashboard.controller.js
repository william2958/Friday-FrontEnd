(function() {
'use strict';

	angular.module('dashboard')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$state', 'AuthorizationService'];
	function DashboardController($state, AuthorizationService) {
		// The controller for the dashboard
		var $ctrl = this;

		// Stores an object of the current user
		$ctrl.user;

		$ctrl.$onInit = function() {
			// Get the token if there is one
			if (AuthorizationService.getToken()) {
				// Get the user from the server using the token
				// Calls the rails user#index
				AuthorizationService.getUser(AuthorizationService.getToken())
				.success(function(resp) {
					// Set the user if it works
					$ctrl.user = resp;
				})
				.error(function(resp) {
					// Unauthorized
					// Delete token
					AuthorizationService.signOut();
					$state.go('authorization.login');
				});
			} else {
				// Unauthorized
				$state.go('authorization.login');
			}
		}

		// When the user signs out, destroy the auth token from
		// cookies by calling .signOut, then redirect
		$ctrl.handleSignOutBtnClick = function() {
			AuthorizationService.signOut();
			$state.go('authorization.login');
	    };

	}

})();