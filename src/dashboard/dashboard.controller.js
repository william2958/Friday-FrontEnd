(function() {
'use strict';

	angular.module('dashboard')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$state', '$rootScope', 'AuthorizationService', '$mdToast'];
	function DashboardController($state, $rootScope, AuthorizationService, $mdToast) {
		// The controller for the dashboard
		var $ctrl = this;

		var toastListener;

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

			// Start listening for toast messages
			toastListener = $rootScope.$on('dashboard:toast', showToastMessage);
		}

		// When the user signs out, destroy the auth token from
		// cookies by calling .signOut, then redirect
		$ctrl.handleSignOutBtnClick = function() {
			AuthorizationService.signOut();
			$state.go('authorization.login');
	    };

		// Show a little toast message
		var last = {
			bottom: true,
			top: false,
			left: false,
			right: true
		};

		$ctrl.toastPosition = angular.extend({},last);

		$ctrl.getToastPosition = function() {
			sanitizePosition();

			return Object.keys($ctrl.toastPosition)
				.filter(function(pos) { return $ctrl.toastPosition[pos]; })
				.join(' ');
		};

		function sanitizePosition() {
			var current = $ctrl.toastPosition;

			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;

			last = angular.extend({},current);
		}

		$ctrl.showSimpleToast = function(message) {
			var pinTo = $ctrl.getToastPosition();

			$mdToast.show(
				$mdToast.simple()
				.textContent(message)
				.position(pinTo )
				.hideDelay(1000)
			);
		};

		$ctrl.showActionToast = function() {
			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
				.textContent('Marked as read')
				.action('UNDO')
				.highlightAction(true)
				.highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
				.position(pinTo);

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {
					alert('You clicked the \'UNDO\' action.');
				}
			});
		};

		// Function to call all the toast methods above
		function showToastMessage(event, data) {
			$ctrl.showSimpleToast(data.message);
		}

	}

})();