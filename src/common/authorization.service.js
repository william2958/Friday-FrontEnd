(function() {
'use strict';

	angular.module('common')
	.service('AuthorizationService', AuthorizationService);

	AuthorizationService.$inject = ['$http', 'ApiPath', '$cookies'];
	function AuthorizationService($http, ApiPath, $cookies) {
		var service = this;

		service.signIn = function(data) {
			return $http.post(ApiPath + '/sign_in', data);
		}

		service.signUp = function(data) {
			return $http.post(ApiPath + '/sign_up', data);
		}

		service.signOut = function() {
			$cookies.remove('token');
		}

		service.getToken = function() {
			return $cookies.get('token');
		}

		service.setToken = function(token) {
			$cookies.put('token', token);
		}

		service.getUser = function(token) {
			return $http({
				method: 'GET',
				url: ApiPath + '/user',
				headers: {
					'Authorization': token
				}
			})
		}

		service.getAccounts = function(token) {
			return $http({
				method: 'GET',
				url: ApiPath + '/accounts',
				headers: {
					'Authorization': $cookies.get('token')
				}
			})
		}

		service.addAccount = function(data) {
			return $http({
				method: 'POST',
				url: ApiPath + '/accounts',
				data: data,
				headers: {
					'Authorization': $cookies.get('token')
				}
			})
		}

		service.confirmEmail = function(data) {
			return $http({
				method: 'POST',
				url: ApiPath + '/confirm_email',
				data: data
			})
		}

		service.requestPasswordReset = function(data) {
			console.log(data)
			return $http({
				method: 'GET',
				url: ApiPath + '/forgot_password',
				params: data
			})
		}

		service.changePassword = function(data) {
			console.log("Data getting sent to server to change password is", data)
			return $http({
				method: 'POST',
				url: ApiPath + '/change_password',
				data: data
			})
		}

	}

})();