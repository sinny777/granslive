
require.config({
    paths :{
	    angular:          '../lib/angular/angular.min',
        angularAnimate:   '../lib/angular-animate/angular-animate.min',
        angularSanitize:  '../lib/angular-sanitize/angular-sanitize.min',
        uiRouter:         '../lib/angular-ui-router/release/angular-ui-router.min',
        ngStorage:        '../lib/ngstorage/ngStorage.min',
        ionic:            '../lib/ionic/js/ionic.min',
        ionicMaterial:    '../lib/ionic-material/dist/ionic.material.min',
	    ionMdInput:       '../lib/ion-md-input/js/ion-md-input.min',
        ionicAngular:     '../lib/ionic/js/ionic-angular.min',
	    text:             '../lib/js/text'
    },
    shim: {
    	angular : {exports : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        ngStorage :{ deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], exports : 'ionic'},
        ionicMaterial :  {deps: ['ionic'], exports : 'ionicMaterial'},
        ionMdInput :  {deps: ['ionic'], exports : 'ionMdInput'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']}        
    },
    priority: [
	       'angular',
	       'ionic',
	       'ionicMaterial',
	       'ionMdInput'
	   ],
	   deps: [
          'bootstrap'
      ]
});

