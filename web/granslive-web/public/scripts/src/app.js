define([
	'angular',	
	'angularRoute',
    'angularAnimate',
    'angularLocalStorage',
    'angularToastr',
    'angularFilesystem',
    'bootstrap',
//    'ui.bootstrap',
    'cryptojslib',
    'querystring',
	'config',
	'common/commonModule',
	'watson/watsonModule'
], function (angular, angularRoute) {
    'use strict';

    var myworkstyle =  angular.module('myworkstyle', [
        'ngRoute',
        'ngAnimate',
//        'ui.bootstrap',
        'LocalStorageModule',
        'toastr',
        'fileSystem',
        'app.config',
        'commonModule',
        'watsonModule'
    ]);

    
    myworkstyle.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            containerId: 'toast-container',
            extendedTimeOut: 2000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            maxOpened: 0,
            messageClass: 'toast-message',
            newestOnTop: true,
            onHidden: null,
            onShown: null,
            positionClass: 'toast-top-full-width',
            preventDuplicates: false,
            progressBar: false,
            tapToDismiss: true,
            target: 'body',
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    });
    
	
    
    myworkstyle.run(['$rootScope','$location',function($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            console.log('IN routeChangeStart >>>>>>> ');
             $rootScope.footerLinks = [];
        });

    }]);
     
    
    return myworkstyle;


});
