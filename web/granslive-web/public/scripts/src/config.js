/*global define */

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('CONFIG', {
			VERSION: '0.1',
			ENVIRONMENT: 'DEV',
			NODERED_BACKEND_URL: 'https://myworkstyle-backend.mybluemix.net'
		});
    
});