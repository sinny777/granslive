define(function (require) {
    'use strict';
    
    var angular = require('angular'),
	config = require('config'),
	uiRouter = require('uiRouter'),
	ngStorage = require('ngStorage'),
	ionic = require('ionicAngular'),
	iotModule = angular.module('iotModule', ['ionic', 'ngStorage', 'app.config', 'ui.router']);

    iotModule.factory('iotService', require('iot/services/iotService'));
    
    iotModule.controller('placesController', require('iot/controllers/placesController'));
    iotModule.controller('dashboardController', require('iot/controllers/dashboardController'));
    

return iotModule;

});
