/*global define, require, console, cordova, navigator */

define(['require','angular','app', 'routes'], function (reqiure, angular, app, routes) {
    'use strict';

    console.log('\n\n<<<<<<<<< INSIDE INITIALIZE >>>>>>>>>');
    
    var $html,
        onDeviceReady = function () {
            angular.bootstrap(document, [app.name]);
        };

    document.addEventListener("deviceready", onDeviceReady, false);
     
    
    if (typeof cordova === 'undefined') {
        $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function () {
            try {
            	 angular.bootstrap(document, [app.name]);
            } catch (e) {
                console.error(e.stack || e.message || e);
            }
        });
    }
    
});