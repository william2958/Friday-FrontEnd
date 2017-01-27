(function() {
'use strict';

	angular.module('authorization')
	.controller('ConfirmEmailController', ConfirmEmailController);

	ConfirmEmailController.$inject = ['$state', 'AuthorizationService', 'myData'];
	function ConfirmEmailController($state, AuthorizationService, myData) {
		var $ctrl = this;

		console.log("Page loaded, sending request now with ", myData);

		$ctrl.$onInit = function() {

			var config = {
				'confirm_token': myData
			}

			AuthorizationService.confirmEmail(config)
			.then(function(resp) {
				$state.go('authorization.login');
			})
			.catch(function(resp) {
				console.log("Email was not successfully confirmed");
			})

		}

	}

})();