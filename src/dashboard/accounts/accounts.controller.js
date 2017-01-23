(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountsController', AccountsController);

	AccountsController.$inject = ['auth', '$auth', '$state', '$http', 'AccountService'];
	function AccountsController(auth, $auth, $state, $http, AccountService) {
		var $ctrl = this;
		$ctrl.accounts = {};

		$ctrl.newAccount = {};

		$ctrl.$onInit = function() {
			if (AccountService.getPin() === '') {
				// $state.go('authorization.pin')
			}
			$ctrl.accounts = $ctrl.getAccounts();
		}

		$ctrl.getAccounts = function() {
			AccountService.getAccounts().then(function(response) {
				$ctrl.accounts = response.data.accounts;
			})
		}

		$ctrl.submitNewAccount = function() {
			var config = {
				'website': $ctrl.newAccount.website,
				'email': $ctrl.newAccount.email,
				'user_name': $ctrl.newAccount.username,
				'password': $ctrl.newAccount.password
			};

			AccountService.addAccount(config).then(function(response) {
				console.log(response);
			});

			$ctrl.accounts = $ctrl.getAccounts();

		}

		$ctrl.getStatus = function() {
			console.log("Status Update: ");
			console.log("The accounts are: ", $ctrl.accounts);
			console.log("The pin is: ", AccountService.getPin())
		}

	}

})();