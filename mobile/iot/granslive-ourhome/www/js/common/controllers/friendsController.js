define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.$parent.setHeaderFab('left');

      // Delay expansion
      $timeout(function() {
          $scope.isExpanded = true;
          $scope.$parent.setExpanded(true);
      }, 300);

      // Set Motion
      ionicMaterialMotion.fadeSlideInRight();

      // Set Ink
      ionicMaterialInk.displayEffect();
   }
    
    ctrl.$inject = ['$scope', '$stateParams', '$timeout','ionicMaterialInk','ionicMaterialMotion'];
    return ctrl;

});
