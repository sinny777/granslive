define(function () {
    'use strict';

    function ctrl($scope, $rootScope, $state, $timeout, ionicMaterialInk, googleLogin) {
//    	$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        
      $timeout(function() {
          $scope.$parent.hideHeader();
      }, 0);
      
      ionicMaterialInk.displayEffect();

        $scope.loginWithGoogle = function () {
        	console.log('\n\nIN loginWithGoogle :>>>>>>>>');
            var promise = googleLogin.startLogin();
            promise.then(function (data) {
            	$rootScope.currentUser = data;
                console.log('\n\nUSER LOGGED IN SUCCESSFULLY >>>>>>>>>');
                console.log($rootScope.currentUser);
                $state.transitionTo("app.places");
            }, function (data) {
                $scope.google_data = data;
            });
        }

   }
    
    ctrl.$inject = ['$scope','$rootScope','$state','$timeout','ionicMaterialInk','googleLogin'];
    return ctrl;

});