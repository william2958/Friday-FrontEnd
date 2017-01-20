(function() {
'use strict';

	angular.module('dashboard')
	.service('AccountService', AccountService);

	// ApiPath is a constant defined in the dashboard module
	AccountService.$inject = ['$http', 'ApiPath', 'PinService'];
	function AccountService($http, ApiPath, PinService) {
		var service = this;

		// Service function to fetch accounts data from the server using
		// A simple $http.get command.
		service.getAccounts = function () {
			return $http.get(ApiPath + '/accounts.json').then(function(response) {
				return response.data;
			});
		};

		service.addAccount = function (data) {
			return $http.post(ApiPath + '/accounts', data).then(function(response) {
				return response.data;
			});
		}

	}

})();