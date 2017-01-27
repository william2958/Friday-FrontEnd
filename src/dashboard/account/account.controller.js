(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountController', AccountController);

	AccountController.$inject = []
	function AccountController() {
		var $ctrl = this;

		$ctrl.account.account_show;

		$ctrl.showItem = function(index) {
			$ctrl.account[index].account_show = true;
		}

	}

})();