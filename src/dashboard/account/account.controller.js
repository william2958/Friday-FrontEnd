(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountController', AccountController);

	AccountController.$inject = []
	function AccountController() {
		var $ctrl = this;

		$ctrl.websiteClass = 'account_website';
		$ctrl.emailClass = 'account_email';

		$ctrl.expandAccount = function(account) {
			account.showAccount = !account.showAccount;
			if ($ctrl.websiteClass === 'account_website') {
				$ctrl.websiteClass = 'account_website_enlarged';
			} else if ($ctrl.websiteClass === 'account_website_enlarged') {
				$ctrl.websiteClass = 'account_website';
			}

			if ($ctrl.emailClass === 'account_email') {
				$ctrl.emailClass = 'account_email_enlarged';
			} else if ($ctrl.emailClass === 'account_email_enlarged') {
				$ctrl.emailClass = 'account_email';
			}
		}

	}

})();