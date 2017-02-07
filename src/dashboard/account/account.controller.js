(function() {
'use strict';

	angular.module('dashboard')
	.controller('AccountController', AccountController);

	AccountController.$inject = ['AuthorizationService', 'AccountService', '$rootScope', '$mdDialog']
	function AccountController(AuthorizationService, AccountService, $rootScope, $mdDialog) {

		// The controller for the individual account component

		var $ctrl = this;

		// Default classes for the component
		$ctrl.websiteClass = 'account_website';
		$ctrl.emailClass = 'account_email';
		$ctrl.inputType = 'password';
		$ctrl.buttonText = 'Show';
		$ctrl.editAccount = false;
		$ctrl.preview_size = '';

		// Object to copy to the user's clipboard
		var clipboard = new Clipboard('.copyButton');

		$ctrl.$onInit = function() {
			$ctrl.originalAccount = $ctrl.account.website;
			$ctrl.editedAccount = $ctrl.account.website.split('.')[0];
			// $ctrl.editedAccount = $ctrl.account.website.replace(/.com|.ca/gi, "");
			$ctrl.account.website = $ctrl.editedAccount;

			clipboard.on('success', function(e) {
			    $rootScope.$broadcast('dashboard:toast', {message: "Copied!"});

			    e.clearSelection();
			});

			clipboard.on('error', function(e) {
			    $rootScope.$broadcast('dashboard:toast', {message: "Error"});
			});
			
		}

		// When the user wishes to expand the account, switch the class
		// of the component
		$ctrl.expandAccount = function(account) {
			$ctrl.editAccountForm = {};
			$ctrl.editAccountForm.email = $ctrl.account.email;
			$ctrl.editAccountForm.website = $ctrl.originalAccount;
			$ctrl.editAccountForm.password = $ctrl.account.password;

			if (!$ctrl.editAccount) {
				// Show the account with this variable
				account.showAccount = !account.showAccount;

				// Switch the website class to enlarged and back
				if ($ctrl.websiteClass === 'account_website') {
					$ctrl.preview_size = 'preview_full';
					$ctrl.account.website = $ctrl.originalAccount;
					$ctrl.websiteClass = 'account_website_enlarged';
				} else if ($ctrl.websiteClass === 'account_website_enlarged') {
					$ctrl.preview_size = '';
					$ctrl.account.website = $ctrl.editedAccount;
					$ctrl.websiteClass = 'account_website';
				}

				// Switch the email class to enlarged and back
				if ($ctrl.emailClass === 'account_email') {
					$ctrl.emailClass = 'account_email_enlarged';
				} else if ($ctrl.emailClass === 'account_email_enlarged') {
					$ctrl.emailClass = 'account_email';
				}
			}
		}

		// Toggle between showing plain text password and a hidden password
		$ctrl.showPassword = function() {
			if ($ctrl.inputType == 'password') {
				$ctrl.inputType = 'text';
				$ctrl.buttonText = 'Hide';
			} else {
				$ctrl.inputType = 'password';
				$ctrl.buttonText = 'Show';
			}
		}

		// Toggle to editing mode
		$ctrl.toggleEditAccount = function(account) {
			$ctrl.showPassword();
			if ($ctrl.editAccount) {

				// Check to see if there was actually any changes
				if ($ctrl.editAccountForm.website !== $ctrl.account.website
					|| $ctrl.editAccountForm.email !== $ctrl.account.email
					|| $ctrl.editAccountForm.password !== $ctrl.account.password) {
					// Only submit changes if they are different

					// config object to be sent off to the server
					var config = {
						'website': $ctrl.editAccountForm.website,
						'email': $ctrl.editAccountForm.email,
						'password': $ctrl.editAccountForm.password,
						'_id': account._id.$oid
					}

					// We have to reencrypt the password
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
			  				var encryptedBytes = aesCtr.encrypt(aesjs.util.convertStringToBytes(config['password']));
			  				// Conver the array of bytes into a string so that it can be held in the database
			  				var encryptedPassword = encryptedBytes.toString();
			  				// Set the config.password to the string one
			  				config['password'] = encryptedPassword;
			  				// Send out the http request
			  				AuthorizationService.editAccount(config).then(function(response) {
			  					$ctrl.account.website = $ctrl.editAccountForm.website;
			  					$ctrl.account.email = $ctrl.editAccountForm.email;
			  					$ctrl.account.password = $ctrl.editAccountForm.password;
			  					// Log out the response to make sure it was successful
								$ctrl.editAccount = false;
							});
							
						}
					});
				} else {
					$ctrl.editAccount = false;
				}
			} else {
				$ctrl.editAccount = true;
			}
			
		}

		// Function to remove an account
		$ctrl.removeAccount = function(account) {
			var config = {
				'_id': account._id.$oid
			}
			AuthorizationService.deleteAccount(config)
				.then(function(resp) {
					// Broadcasts to accounts controller to refetch the accounts
					$rootScope.$broadcast('account:delete', {refresh: true});
				});
			
		}

		// Ask if the user is sure about deleting the account
		$ctrl.showConfirm = function(ev, account) {
			if ($ctrl.editAccount) {
				$ctrl.editAccount = false;
			} else {
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('Are you sure you want to delete this account?')
					.textContent('This will permanently delete the data!')
					.ariaLabel('Delete Account')
					.targetEvent(ev)
					.ok("I'm sure")
					.cancel('Cancel')
					.clickOutsideToClose(true);

				$mdDialog.show(confirm).then(function() {
					$ctrl.removeAccount(account);
					})
				};
			}
		}

})();