define(function (require) {
    'use strict';
    
    var angular = require('angular'),
	config = require('config'),
	ngRoute = require('angularRoute'),
	ngStorage = require('angularLocalStorage'),
//	uiBootstrap = require('ui.bootstrap'),
    watsonModule = angular.module('watsonModule', ['ngRoute',
                                                   'ngAnimate',
                                                   'LocalStorageModule',
//                                                   'ui.bootstrap',
                                                   'app.config']);

    watsonModule.factory('languageService', require('watson/services/languageService'));
    watsonModule.factory('speechService', require('watson/services/speechService'));
    
    watsonModule.controller('dialogController', require('watson/controllers/dialogController'));
    

    return watsonModule;

});
