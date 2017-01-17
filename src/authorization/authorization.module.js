(function() {
	'use strict';

	angular.module('authorization', ['ng-token-auth'])
	.config(config);

	config.$inject = ['$authProvider'];
	function config($authProvider) {
		$authProvider.configure({
			apiUrl: 'http://localhost:3000',
	      tokenValidationPath:     '/auth/validate_token',
	      signOutUrl:              '/auth/sign_out',
	      emailRegistrationPath:   '/auth',
	      accountUpdatePath:       '/auth',
	      accountDeletePath:       '/auth',
	      confirmationSuccessUrl:  'http://localhost:3001/index.html#/login',
	      passwordResetPath:       '/auth/password',
	      passwordUpdatePath:      '/auth/password',
	      // The link that is included in the password reset email
	      passwordResetSuccessUrl: 'http://localhost:3001/index.html#/changepassword',
	      emailSignInPath:         '/auth/sign_in',
	      storage:                 'cookies',
	      forceValidateToken:      false,
	      validateOnPageLoad:      true,
	      proxyIf:                 function() { return false; },
	      proxyUrl:                '/proxy',
	      omniauthWindowType:      'sameWindow',
	      // cookieOps: {
	      //   path: "/",
	      //   expires: 9999,
	      //   expirationUnit: 'days',
	      //   secure: false,
	      //   domain: 'localhost:3000'
	      // }
	      createPopup: function(url) {
	        return window.open(url, '_blank', 'closebuttoncaption=Cancel');
	      },
	      parseExpiry: function(headers) {
	        // convert from UTC ruby (seconds) to UTC js (milliseconds)
	        return (parseInt(headers['expiry']) * 1000) || null;
	      },
	      handleLoginResponse: function(response) {
	        return response.data;
	      },
	      handleAccountUpdateResponse: function(response) {
	        return response.data;
	      },
	      handleTokenValidationResponse: function(response) {
	        return response.data;
	      }
	    });
	}

})();