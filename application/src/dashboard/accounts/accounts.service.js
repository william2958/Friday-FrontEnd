(function() {
'use strict';

	angular.module('dashboard')
	.service('AccountService', AccountService);

	AccountService.$inject = ['PinService'];
	function AccountService(PinService) {

		// Just a service to get the pin from PinService

		var service = this;

		service.getPin = function () {
			return PinService.getPin();
		};

	}

})();