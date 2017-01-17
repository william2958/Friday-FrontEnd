(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountsController', AccountsController);

	AccountsController.$inject = ['auth', '$auth', '$http'];
	function AccountsController(auth, $auth, $http) {
		var $ctrl = this;
		$ctrl.accounts = auth.accounts;

		$http.get('http://localhost:3000/accounts').then(function(response) {
			console.log("Response Data is: ", response.data.data.accounts);
		})

	}

})();