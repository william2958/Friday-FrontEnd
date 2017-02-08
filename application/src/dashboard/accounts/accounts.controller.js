(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountsController', AccountsController);

	// Controller to handle all accounts
	AccountsController.$inject = ['$state', '$http', 'AccountService', 'AuthorizationService', '$rootScope'];
	function AccountsController($state, $http, AccountService, AuthorizationService, $rootScope) {
		var $ctrl = this;

		// Object to hold all the accounts that belong to this user
		$ctrl.accounts = {};

		// Objects for new account form
		$ctrl.newAccount = {};
		// Only show the form when the user clicks new form
		$ctrl.showForm = false;
		$ctrl.search = "";

		$ctrl.slidervalue = 8;

		var deleteListener;

		// Used for generating a random password
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		$ctrl.$onInit = function() {
			// Double check that the user has a pin registered, 
			// or else redirect to pin entering state
			if (AccountService.getPin() === '') {
				$state.go('authorization.pin');
			}
			// Fetch the accounts using the function below
			$ctrl.accounts = $ctrl.getAccounts();		

			deleteListener = $rootScope.$on('account:delete', onAccountDelete);
		};

		// Function to get all the accounts from the server
		$ctrl.getAccounts = function() {
			// Call the accounts service
			AuthorizationService.getAccounts()

			.then(function(response) {

				// Once the accounts have arrived assign them
				$ctrl.accounts = response.data.data.accounts;

				// Fetch the pin from the account service
				var pin = AccountService.getPin();

				// Set up all the required variables for hashing
				// convert the pin into something the scrypt can work with
				var password = new buffer.SlowBuffer(pin.normalize('NFKC'));
				// Just some salt
	      		var salt = new buffer.SlowBuffer("someSalt".normalize('NFKC'));
				var N=512, r=8, p=1, dkLen=32;
				var encryptedkey;

				// Call this library to generate a 32-bit hash from the pin
				// So that we can AES encrypt it
				scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
					if (error) {
						// console.log("Error: " + error);
					} else if (key) {
						// If the hashing was successful
						encryptedkey = key;
						// Loop through all the accounts and decrypt their passwords
						angular.forEach($ctrl.accounts, function(value, key) {
							// If the account has a password
				  			if ($ctrl.accounts[key].password) {
				  				// Set up an aesCtr which is what AES library needs
				  				var aesCtr = new aesjs.ModeOfOperation.ctr(encryptedkey, new aesjs.Counter(5));
				  				// Turn the string of bytes back into an array that AES can work with
				  				var decryptedPassword = JSON.parse("[" + $ctrl.accounts[key].password + "]");
				  				// Decrypt the password retreived from the server
				  				var decryptedBytes = aesCtr.decrypt(decryptedPassword);
				  				// Turn it back into text
				  				var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
				  				// Set the password for the account to the decrypted version
				  				$ctrl.accounts[key].password = decryptedText;
				  			}
						});
						// All accounts have now been decrypted
						// console.log("Passwords decrypted, accounts is now: ", $ctrl.accounts)
					}
				});

				// Loop through each account removing the .com and .ca from the title
				// angular.forEach($ctrl.accounts, function(value, key) {
				// 	if ($ctrl.accounts[key].website){
				// 		$ctrl.accounts[key].website = $ctrl.accounts[key].website.replace(/.com|.ca/gi, "");
		  // 			}
				// });
			});
		};

		// Function to allow the controller to submit a new account
		$ctrl.submitNewAccount = function() {

			if ($ctrl.addAccountForm.$valid) {

				console.log($ctrl.newAccount);

				// The configuration for the http request
				var config = {
					'website': $ctrl.newAccount.website,
					'email': $ctrl.newAccount.email,
					'user_name': $ctrl.newAccount.username,
					'password': $ctrl.newAccount.password
				};

				// Get the required parameters for the encryption
				var pin = AccountService.getPin();
				var password = new buffer.SlowBuffer(pin.normalize('NFKC'));
	      		var salt = new buffer.SlowBuffer("someSalt".normalize('NFKC'));
				var N=512, r=8, p=1, dkLen=32;
				var encryptedkey;

				// Start hashing the pin into a password for AES
				scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
					if (error) {
						console.log("Error: " + error);
					} else if (key) {
						encryptedkey = key;
		  				var aesCtr = new aesjs.ModeOfOperation.ctr(encryptedkey, new aesjs.Counter(5));
		  				// Encrypt the password the user put in after converting it to bytes
		  				var encryptedBytes = aesCtr.encrypt(aesjs.util.convertStringToBytes(config.password));
		  				// Conver the array of bytes into a string so that it can be held in the database
		  				var encryptedPassword = encryptedBytes.toString();
		  				// Set the config.password to the string one
		  				config.password = encryptedPassword;
		  				// Send out the http request
		  				AuthorizationService.addAccount(config).then(function(response) {
		  					// Log out the response to make sure it was successful
							// console.log(response);
							$ctrl.showForm = !$ctrl.showForm;
							// Reload the accounts
							$ctrl.accounts = $ctrl.getAccounts();
							$ctrl.newAccount = {};
						});
						
					} else {

					}
				});
			}
		};

		// Show the form when the user clicks add account
		$ctrl.handleAddAccountButtonClick = function() {
			$ctrl.showForm = !$ctrl.showForm;
		};

		// Every time the user presses a key update wheatley
		$ctrl.keypressed = function(code) {
			// Tell wheatley to pulse
	    	// $rootScope.$broadcast('wheatley:respond', {code: 0});
	    	if (code.keyCode === 13){
	    		// If the user enters the enter key
	    		$ctrl.submitNewAccount();
	    	}
    	};

    	function onAccountDelete(event, data) {
    		$ctrl.accounts = $ctrl.getAccounts();
    	}

    	$ctrl.lengthChanged = function() {

    		var text = "";

		    for( var i=0; i < $ctrl.slidervalue; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    $ctrl.newAccount.password = text;
    	};

	}

})();