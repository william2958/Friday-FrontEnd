(function() {
'use strict';

	angular.module('myApp')
	.controller('AccountsController', AccountsController);

	AccountsController.$inject = ['auth'];
	function AccountsController(auth) {
		var $ctrl = this;
		$ctrl.accounts = auth.accounts;
		console.log($ctrl.accounts);
	}

})();