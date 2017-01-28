(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountController', AccountController);

	AccountController.$inject = ['AuthorizationService', '$rootScope']
	function AccountController(AuthorizationService, $rootScope) {

		// The controller for the individual account component

		var $ctrl = this;

		// Default classes for the component
		$ctrl.websiteClass = 'account_website';
		$ctrl.emailClass = 'account_email';
		$ctrl.inputType = 'password';
		$ctrl.buttonText = 'Show';

		// When the user wishes to expand the account, switch the class
		// of the component
		$ctrl.expandAccount = function(account) {
			// Show the account with this variable
			account.showAccount = !account.showAccount;

			// Switch the website class to enlarged and back
			if ($ctrl.websiteClass === 'account_website') {
				$ctrl.websiteClass = 'account_website_enlarged';
			} else if ($ctrl.websiteClass === 'account_website_enlarged') {
				$ctrl.websiteClass = 'account_website';
			}

			// Switch the email class to enlarged and back
			if ($ctrl.emailClass === 'account_email') {
				$ctrl.emailClass = 'account_email_enlarged';
			} else if ($ctrl.emailClass === 'account_email_enlarged') {
				$ctrl.emailClass = 'account_email';
			}
		}

		// Toggle between showing plain text password and a hidden password
		$ctrl.showPassword = function() {
			if ($ctrl.inputType == 'password') {
				$ctrl.inputType = 'text';
				$ctrl.buttonText = 'Hide';
			} else {
				$ctrl.inputType = 'password';
				$ctrl.buttonText = 'Show';
			}
		}

		// Function to remove an account
		$ctrl.removeAccount = function(account) {
			var config = {
				'_id': account._id.$oid
			}
			AuthorizationService.deleteAccount(config);

			// Broadcasts to accounts controller to refetch the accounts
			$rootScope.$broadcast('account:delete', {refresh: true});
		}

	}

})();