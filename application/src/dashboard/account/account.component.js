(function() {
'use strict';

	// Add the account component
	// It is bound to an account that is passed in with an attribute
	angular.module('dashboard')
	.component('account', {
		templateUrl: 'src/dashboard/account/account.html',
		bindings: {
			account: '<'
		},
		controller: 'AccountController'
	});

})();