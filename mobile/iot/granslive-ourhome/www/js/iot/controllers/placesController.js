define(function () {
    'use strict';

    function ctrl($scope, $rootScope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, iotService, timeStorage) {
    	$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);
        
        /*
        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
        */
        
      $scope.places = {};
      $scope.selectedPlace = {};
    	
        $scope.fetchPlaces = function () {
        	console.log('\n\nIN fetchPlaces :>>>>>>>>');
        	$timeout(function () {
     	        document.getElementById('fab-places').classList.toggle('on');
     	    }, 600);
            var promise = iotService.getPlaces();
            promise.then(function (response) {
                console.log('\n\nPLACES FETCHED SUCCESSFULLY >>>>>>>>>');
                console.log(response.data);
                $scope.places = response.data.items;
                
                if($scope.places.length == 1){
                	$scope.selectedPlace = $scope.places[0];
                	timeStorage.set('selectedPlace', place, 1);
                	$state.transitionTo("app.dashboard");
                }
               
                $timeout(function() {
	                ionicMaterialMotion.fadeSlideInRight({
	                    selector: '.animate-fade-slide-in .item'
	                });
                }, 900);
                
            }, function (data) {
                console.log(data);
            });
        };
        
        $scope.placeSelected = function(place){
        	console.log('USER SELECTED THE PLACE: >>>>> ');
        	console.log(place);
        	$scope.selectedPlace = place;
        	timeStorage.set('selectedPlace', place, 1);
        	$state.transitionTo("app.dashboard");
        };
        
        $scope.showAddPlacePanel = function(){
        	console.log('IN showAddPlacePanel: >>>>> ');
        }
        
   }
    
    ctrl.$inject = ['$scope','$rootScope','$state','$timeout','ionicMaterialInk', 'ionicMaterialMotion', 'iotService', 'timeStorage'];
    return ctrl;

});