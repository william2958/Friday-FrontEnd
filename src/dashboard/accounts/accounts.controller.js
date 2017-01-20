(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountsController', AccountsController);

	AccountsController.$inject = ['auth', '$auth', '$http', 'AccountService'];
	function AccountsController(auth, $auth, $http, AccountService) {
		var $ctrl = this;
		$ctrl.accounts = auth.accounts;

		$ctrl.newAccount = {};

		// AccountService.getAccounts().then(function(response) {
		// 	console.log(response.data);
		// });

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
		}

		$ctrl.getStatus = function() {
			console.log("Status Update: ");
			console.log("The accounts are: ", $ctrl.accounts);
		}

	}

})();