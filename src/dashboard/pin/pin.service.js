(function() {
'use strict'

	angular.module('dashboard')
	.service('PinService', PinService);

	function PinService() {
		// Basic service to set and retreive the pin
		// Also stores the pin
		var service = this;
		service.pin = "";

		service.getPin = function() {
			return service.pin;
		}

		service.setPin = function(pin) {
			service.pin = pin;
		}

	}

})();