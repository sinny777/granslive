/*global define, require */

define(['app'], function (app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

    	$stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'appController'
        })
        
        .state('app.places', {
            url: '/places',
            views:{
                'menuContent': {
                    templateUrl: 'templates/places.html',
                    controller: 'placesController'
                },
                'fabContent': {
                    template: '<button id="fab-places" data-ng-click="showAddPlacePanel()" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-plus"></i></button>',
                    controller: 'placesController'
                }
            }
        })
        
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'dashboardController'
                },
                'fabContent': {
                    template: '<button id="fab-dashboard" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-dashboard').classList.toggle('on');
                        }, 800);
                    }
                }
            }
        })

        
        .state('app.share', {
            url: '/share',
            views:{
                'menuContent': {
                    templateUrl: 'templates/shareControl.html',
                    controller: 'ActivityCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-activity').classList.toggle('on');
                        }, 200);
                    }
                }
            }
        })

        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html',
                    controller: 'friendsController'
                },
                'fabContent': {
                    template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-friends').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })

        .state('app.rooms', {
            url: '/rooms',
            views: {
                'menuContent': {
                    templateUrl: 'templates/rooms.html',
                    controller: 'GalleryCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-gallery').classList.toggle('on');
                        }, 600);
                    }
                }
            }
        })

        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'loginController'
                },
                'fabContent': {
                    template: '',
                    controller: 'loginController'
                }
            }
        })
		
        .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact.html',
                    controller: 'appController'
                },
                'fabContent': {
                    template: '<button id="fab-contact" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-contact').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })

        .state('app.faq', {
            url: '/faq',
            views: {
                'menuContent': {
                    templateUrl: 'templates/faqs.html',
                    controller: 'appController'
                },
                'fabContent': {
                    template: '<button id="fab-faqs" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-faqs').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');


    }]);


});