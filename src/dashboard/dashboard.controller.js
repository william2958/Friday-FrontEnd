(function() {
'use strict';

	angular.module('dashboard')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['auth', '$auth', '$state'];
	function DashboardController(auth, $auth, $state) {
		var $ctrl = this;

		$ctrl.name = auth.name;

		$ctrl.handleSignOutBtnClick = function() {
			$auth.signOut()
				.then(function(resp) {
					// handle success response
					$state.go('authorization.login');
				})
				.catch(function(resp) {
					// handle error response
					console.log("Unsuccessful log out")
				});
	    };

	}

})();