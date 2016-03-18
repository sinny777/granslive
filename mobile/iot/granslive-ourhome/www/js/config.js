/*global define */

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('CONFIG', {
			VERSION: '0.1',
			ENVIRONMENT: 'DEV',
			OAUTH: {
				DEV_REDIRECT_URL: 'http://localhost:8100/granslive-ourhome/www/',
				PROD_REDIRECT_URL: 'http://localhost/',
				CLIENT_ID: '209046335886-91uk1oop7qaieonhh2ei3uieafbpda2n.apps.googleusercontent.com',
				SECRET: 'FjbLCEY2_Uv9JhyvPpUyYoF0',
				SCOPE: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me'
			},
			ENDPOINTS: {
				IOT_ENDPOINT: 'https://iot-dot-granslive.appspot.com/_ah/api/iot/v1/'
			}
			
		});
    
});