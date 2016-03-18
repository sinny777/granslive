
console.log('\n\n<<<<<<<<< INSIDE main.js >>>>>>>>>');

require.config({
    paths :{
    	'jquery' : '../lib/jquery/dist/jquery.min',
        'angular' :'../lib/angular/angular',
        'angularRoute' : '../lib/angular-route/angular-route.min',
        'angularLocalStorage' : '../lib/angular-local-storage/dist/angular-local-storage.min',
        'angularAnimate' : '../lib/angular-animate/angular-animate.min',
        'angularFilesystem': '../lib/angular-filesystem/src/filesystem',
        'angularToastr': '../lib/angular-toastr/dist/angular-toastr.tpls.min',
        'bootstrap' : '../lib/bootstrap/dist/js/bootstrap.min',
        'ui.bootstrap':'../lib/angular-bootstrap/ui-bootstrap.min',
        'cryptojslib' : '../lib/cryptojslib/rollups/pbkdf2',
        'querystring': '../lib/querystring/querystring.min',
        'text': '../lib/text'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular']
        },
        'angularAnimate' :{
            deps: ['angular']
        },
        'angularToastr': {
            deps: ['angularAnimate']
        },
        'angularLocalStorage' :{
            deps: ['angular']
        },
        'angularFilesystem' :{
            deps: ['angular']
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'querystring' : {
            exports : 'querystring'
        },
        'jquery':{
        	 exports : 'jquery'
        },
        'bootstrap' : {
        	deps: ['jquery'],
        	exports: 'bootstrap'
        }, 
        'ui.bootstrap': {
            deps: ['angular','bootstrap'],
            exports: 'ui.bootstrap'
        }           
    },
    priority: 
    	[
           'jquery',
	       'angular',
	       'cryptojslib',
	       'querystring',
	       'bootstrap',
	       'ui.bootstrap'
	   ],
   deps: [
          'initialize'
          ]
});

/*
require(['require','angular','bootstrap','app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myworkstyle']);
    });
});
*/
