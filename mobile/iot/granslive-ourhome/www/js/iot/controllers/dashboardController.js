define(function () {
    'use strict';

    function ctrl($scope, $rootScope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, iotService, timeStorage) {
    	$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        $timeout(function() {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
        }, 300);
        
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $scope.selectedPlace = {};
    	
        $scope.fetchSelectedPlace = function(){
        	
        	$scope.selectedPlace = timeStorage.get('selectedPlace');
        	console.log('IN fetchSelectedPlace: >>>>> ');
        	console.log($scope.selectedPlace);
        	if($scope.selectedPlace){
        		if($scope.selectedPlace.imagePath.indexOf('http') == -1){
        			$scope.selectedPlace.imagePath = 'http:'+$scope.selectedPlace.imagePath;
        		}
        		$scope.fetchBoards();
        	}
        }
        
        $scope.fetchBoards = function(){
        	var promise = iotService.getBoards($scope.selectedPlace.id);
            promise.then(function (response) {
                console.log('\n\nBOARDS FETCHED SUCCESSFULLY >>>>>>>>>');
                console.log(response.data);
                $scope.selectedPlace.boards = response.data.items;
                // Set Motion
                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight({
                        startVelocity: 3000
                    });
                }, 700)
            }, function (data) {
                console.log(data);
            });
        };
        
   }
    
    ctrl.$inject = ['$scope','$rootScope','$state','$timeout','ionicMaterialInk', 'ionicMaterialMotion', 'iotService', 'timeStorage'];
    return ctrl;

});