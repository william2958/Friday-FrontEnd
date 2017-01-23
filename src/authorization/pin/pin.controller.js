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

	PinController.$inject = ['$state', '$element', 'PinService', '$rootScope', '$timeout']
	function PinController($state, $element, PinService, $rootScope, $timeout) {

		var $ctrl = this;

		// Fetch all six digit fields
		var digit1 = $element.find('#digit1');
		var digit2 = $element.find('#digit2');
		var digit3 = $element.find('#digit3');
		var digit4 = $element.find('#digit4');
		var digit5 = $element.find('#digit5');
		var digit6 = $element.find('#digit6');

		// Set initial focus to the first digit
		$ctrl.$onInit = function() {
			digit1.focus();
		}

		// Set the focus to the next digit every time one digit is entered
		$ctrl.digit1entered = function() {
			digit2.focus();
		}
		$ctrl.digit2entered = function() {
			digit3.focus();
		}
		$ctrl.digit3entered = function() {
			digit4.focus();
		}
		$ctrl.digit4entered = function() {
			digit5.focus();
		}
		$ctrl.digit5entered = function() {
			digit6.focus();
		}
		$ctrl.digit6entered = function() {
			$ctrl.setPin();
		}

		// Update wheatley whenever a key is pressed down
		$ctrl.digitEntered = function() {
			$rootScope.$broadcast('wheatley:respond', {code: 0});
		}

		// Set the pin using the six entered digits
		$ctrl.setPin = function() {
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
				$state.go('dashboard.accounts')
			}, 50);
			
		}
	}


})();