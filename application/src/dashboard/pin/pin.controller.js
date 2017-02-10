(function() {
'use strict';

	// The controller for the pin management, controlling the pin entering page
	// manages the focus of the cursor, and setting the pin when all six digits
	// are submitted. Once they are all submitted we can move on to the accounts
	// page of the dashboard

	// TO DO: add verification to confirm all 6 pins have been entered before
	// proceeding to the next page

	angular.module('dashboard')
	.controller('PinController', PinController);

	PinController.$inject = ['$state', '$element', 'PinService', '$rootScope', '$timeout', 'AuthorizationService'];
	function PinController($state, $element, PinService, $rootScope, $timeout, AuthorizationService) {

		var $ctrl = this;

		$ctrl.digit1 = "";
		$ctrl.digit2 = "";
		$ctrl.digit3 = "";
		$ctrl.digit4 = "";
		$ctrl.digit5 = "";
		$ctrl.digit6 = "";

		// Fetch all six digit fields
		var digit1 = $element.find('#digit1');
		var digit2 = $element.find('#digit2');
		var digit3 = $element.find('#digit3');
		var digit4 = $element.find('#digit4');
		var digit5 = $element.find('#digit5');
		var digit6 = $element.find('#digit6');

		// Set initial focus to the first digit
		$ctrl.$onInit = function() {
			if (AuthorizationService.getToken()) {
				// Get the user from the server using the token
				// Calls the rails user#index
				AuthorizationService.getUser(AuthorizationService.getToken())
				.success(function(resp) {
					// Set the user if it works
					$ctrl.user = resp;
					console.log($ctrl.user);
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
			digit1.focus();
			$ctrl.moreinfo = false;
		};

		// Set the focus to the next digit every time one digit is entered
		$ctrl.digit1entered = function() {
			if($ctrl.digit1.length === 1){
				digit2.focus();
			}
		};
		$ctrl.digit2entered = function() {
			if($ctrl.digit2.length === 1){
				digit3.focus();
			}
		};
		$ctrl.digit3entered = function() {
			if($ctrl.digit3.length === 1){
				digit4.focus();
			}
		};
		$ctrl.digit4entered = function() {
			if($ctrl.digit4.length === 1){
				digit5.focus();
			}
		};
		$ctrl.digit5entered = function() {
			if($ctrl.digit5.length === 1){
				digit6.focus();
			}
		};

		// Update wheatley whenever a key is pressed down
		$ctrl.digitEntered = function() {
			$rootScope.$broadcast('wheatley:respond', {code: 0});
		};

		// Try and submit the pin every time the user enters a digit
		$ctrl.digitEnteredUp = function() {
			$ctrl.submitPin();
		};

		// Function to call to submit the pin and handle errors
		$ctrl.submitPin = function() {
			$ctrl.setPin();
		};

		// Set the pin using the six entered digits
		$ctrl.setPin = function() {

			if ($ctrl.digit1.length === 1 && 
				$ctrl.digit2.length === 1 &&
				$ctrl.digit3.length === 1 &&
				$ctrl.digit4.length === 1 &&
				$ctrl.digit5.length === 1 &&
				$ctrl.digit6.length === 1) {
				var finalPin = $ctrl.digit1;
				finalPin += $ctrl.digit2;
				finalPin += $ctrl.digit3;
				finalPin += $ctrl.digit4;
				finalPin += $ctrl.digit5;
				finalPin += $ctrl.digit6;
				PinService.setPin(finalPin);
				// Tell wheatley to disappear
				$rootScope.$broadcast('wheatley:respond', {code: 7});
				$timeout(function() {
					// Move on to the next state
					$state.go('dashboard.accounts');
				}, 50);
			}
			
		};

		// Show the more information section
		$ctrl.showinfo = function() {
			$ctrl.moreinfo = true;
		};
	}


})();