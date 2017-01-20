(function() {
'use strict';

	angular.module('dashboard')
	.controller('PinController', PinController);

	PinController.$inject = ['$state', '$element', 'PinService', '$rootScope']
	function PinController($state, $element, PinService, $rootScope) {

		var $ctrl = this;

		var digit1 = $element.find('#digit1');
		var digit2 = $element.find('#digit2');
		var digit3 = $element.find('#digit3');
		var digit4 = $element.find('#digit4');
		var digit5 = $element.find('#digit5');
		var digit6 = $element.find('#digit6');

		$ctrl.onInit = function() {
			digit1.focus();
		}

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

		$ctrl.digitEntered = function() {
			$rootScope.$broadcast('wheatley:respond', {code: 0});
		}

		$ctrl.setPin = function() {
			var finalPin = $ctrl.digit1;
			finalPin += $ctrl.digit2;
			finalPin += $ctrl.digit3;
			finalPin += $ctrl.digit4;
			finalPin += $ctrl.digit5;
			finalPin += $ctrl.digit6;
			PinService.setPin(finalPin);

			$state.go('dashboard.accounts')
		}
	}


})();