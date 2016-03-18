define(function () {
    'use strict';

  function ctrl($rootScope, $scope, $http){

    $rootScope.gotoTop = function (){
      $('body,html').animate({scrollTop:0},400);
    };

    $rootScope.initNavBar = function(){
    //  commonService.pageLoadCalls();
    };
    
    $scope.homeLinks = [];
    
    $scope.getHomeLinks = function(){
    	console.log('IN getHomeLinks >>>>>>>>>> ');
    	var req = {
    			 method: 'GET',
    			 url: '/resources/homelinks.json',
    			 headers: {
    			   'Accept': 'application/json'
    			 } 
    			}

		$http(req).then(function(data){
			$scope.homeLinks = data.data;
			//console.log(JSON.stringify($scope.homeLinks.data));    				
		}, function(err){
			console.log(err);
		});
    };

  }
  
  ctrl.$inject = ['$rootScope', '$scope', '$http'];
  return ctrl;

});

