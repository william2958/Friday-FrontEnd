(function() {
'use strict';

	angular.module('myApp')
	.controller('AccountsController', AccountsController);

	AccountsController.$inject = ['auth', '$auth'];
	function AccountsController(auth, $auth) {
		var $ctrl = this;
		$ctrl.accounts = auth.accounts;

		$ctrl.handleSignOutBtnClick = function() {
			console.log("triggered")
	      $auth.signOut()
	        .then(function(resp) {
	          // handle success response
	          console.log("Successful Log Out")
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.log("Unsuccessful log out")
	        });
	    };

	}

})();