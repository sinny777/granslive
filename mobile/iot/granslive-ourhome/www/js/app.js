/*global define, require */

define([
	'angular',
    'uiRouter',
	'ngStorage',
	'config',
    'common/commonModule',
    'iot/iotModule',
    'ionicMaterial',
    'ionMdInput',
    'ionicAngular'
], function (angular, uiRouter) {
    'use strict';

    var app =  angular.module('app', ['ionic', 'ionic-material', 'ionMdInput', 'ngStorage', 'app.config', 'commonModule', 'iotModule', 'ui.router']);

		app.run(function($ionicPlatform, $rootScope) {
		    $ionicPlatform.ready(function() {
		        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		        // for form inputs)
		        if (window.cordova && window.cordova.plugins.Keyboard) {
		            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		        }
		        if (window.StatusBar) {
		            // org.apache.cordova.statusbar required
		            StatusBar.styleDefault();
		        }
		    });
		    
		    $rootScope.currentUser = {};
		});
		
		app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		
		    // Turn off caching for demo simplicity's sake
		    $ionicConfigProvider.views.maxCache(0);
		
		    /*
		    // Turn off back button text
		    $ionicConfigProvider.backButton.previousTitleText(false);
		    */
		
		});
		
		return app;


});
