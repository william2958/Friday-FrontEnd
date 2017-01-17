(function() {
'use strict';

	angular.module('dashboard')
	.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['auth', '$auth', '$state'];
	function DashboardController(auth, $auth, $state) {
		var $ctrl = this;

		$ctrl.name = auth.name;

		console.log(auth);

		$ctrl.handleSignOutBtnClick = function() {
			console.log("triggered")
			$auth.signOut()
				.then(function(resp) {
					// handle success response
					$state.go('login');
					console.log("Successful Log Out")
				})
				.catch(function(resp) {
					// handle error response
					console.log("Unsuccessful log out")
				});
	    };

	}

})();