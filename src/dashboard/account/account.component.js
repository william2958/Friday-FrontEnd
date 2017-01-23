(function() {
'use strict';

	angular.module('dashboard')
	.component('account', {
		templateUrl: 'src/dashboard/account/account.html',
		bindings: {
			account: '<'
		},
		controller: 'AccountController'
	});

})();