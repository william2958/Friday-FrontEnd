(function() {
'use strict';

	// The default module for everything to extend off of
	// Hosts the api path constant and the service
	// to communicate with the server
	angular.module('common', ['ngCookies', 'ngMaterial'])
	// .constant('ApiPath', 'http://localhost:3000');
	// .constant('ApiPath', 'https://assistantfriday.herokuapp.com');
	// .constant('ApiPath', 'https://rails-beanstalk-env.qm9rusarbf.us-west-2.elasticbeanstalk.com');
	.constant('ApiPath', 'https://api.assistantfriday.com');

})();