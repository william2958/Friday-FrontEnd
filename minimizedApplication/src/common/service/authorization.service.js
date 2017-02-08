angular.module('common')
.service('AuthorizationService', AuthorizationService);

AuthorizationService.$inject = ['$http', 'ApiPath', '$cookies'];
function AuthorizationService($http, ApiPath, $cookies) {

	// This service will use parameters to send requests if the 
	// data is in the post, otherwise, when sending tokens,
	// it will include the token in the header of the request.

	var service = this;

	// Flash messages to inform the user on actions behind the scenes
	service.errors = [];
	service.success = [];

	// Add an error
	service.addError = function(error) {
		service.errors.push(error);
	};

	// Get all the errors, returns an array
	service.getErrors = function() {
		return service.errors;
	};

	// Clear Errors
	service.clearErrors = function() {
		service.errors = [];
	};

	// Add a success message
	service.addSuccess = function(success) {
		service.success.push(success);
	};

	// Get all the Success messages
	service.getSuccess = function() {
		return service.success;
	};

	// Clear Success messages
	service.clearSuccess = function() {
		service.success = [];
	};

	// Sign in an user, accepts a config object with 
	// All the data that needs to be sent
	// (email, password)
	service.signIn = function(data) {
		return $http.post(ApiPath + '/sign_in', data);
	};

	// Sign up an user, accepts a config object with 
	// All the data that needs to be sent
	// (email, first_name, last_name, password)
	service.signUp = function(data) {
		return $http.post(ApiPath + '/sign_up', data);
	};

	// Sign out a user
	service.signOut = function() {
		// remove the token that's stored in the cookies
		$cookies.remove('token');
	};

	// Fetch the token from cookie storage
	service.getToken = function() {
		return $cookies.get('token');
	};

	// Set a new token into cookie stories
	service.setToken = function(token) {
		$cookies.put('token', token);
	};

	// Get the user from the index function
	// on the server, returns user object
	service.getUser = function(token) {
		return $http({
			method: 'GET',
			url: ApiPath + '/user',
			headers: {
				'Authorization': token
			}
		});
	};

	// Get the accounts from the server with a token
	service.getAccounts = function(token) {
		return $http({
			method: 'GET',
			url: ApiPath + '/accounts',
			headers: {
				'Authorization': $cookies.get('token')
			}
		});
	};

	// Add an account to the server with a token
	service.addAccount = function(data) {
		return $http({
			method: 'POST',
			url: ApiPath + '/accounts',
			data: data,
			headers: {
				'Authorization': $cookies.get('token')
			}
		});
	};

	// Edit an account
	service.editAccount = function(data) {
		return $http({
			method: 'POST',
			url: ApiPath + '/accounts_edit',
			data: data,
			headers: {
				'Authorization': $cookies.get('token')
			}
		});
	};

	// Delete an account from the server
	service.deleteAccount = function(accountid) {
		return $http({
			method: 'POST',
			url: ApiPath + '/accounts_delete',
			data: accountid,
			headers: {
				'Authorization': $cookies.get('token')
			}
		});
	};

	// Confirm the email of a user with a token
	service.confirmEmail = function(token) {
		return $http({
			method: 'POST',
			url: ApiPath + '/confirm_email',
			data: token
		});
	};

	// Request a password reset with an email payload
	service.requestPasswordReset = function(data) {
		return $http({
			method: 'GET',
			url: ApiPath + '/forgot_password',
			params: data
		});
	};

	// Change the password of a user with confirm token
	// originally provided by the server through an email
	service.changePassword = function(data) {
		return $http({
			method: 'POST',
			url: ApiPath + '/change_password',
			data: data
		});
	};

}