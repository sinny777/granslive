/*global define, console */

define(['angular'], function (angular) {
    "use strict";

    var factory = function ($http, $q, $interval, $log, CONFIG, timeStorage) {

        var service = {};
        $http.defaults.headers.common['Content-Type'] = 'application/json';
		$http.defaults.headers.common['Accept'] = 'application/json';
		$http.defaults.headers.common['Authorization'] = 'Bearer '+timeStorage.get('google_access_token');
        
        service.getPlaces = function (){
            var deferred = $q.defer();
            var places = timeStorage.get('places');
            if(places){
            	deferred.resolve({data: places});
            }else{
            	return $http({
                    url: CONFIG.ENDPOINTS.IOT_ENDPOINT+'collectionresponse_place',
                    method: "GET"
                }).success(function (resp) {
                	timeStorage.set('places', resp, 1);
                    deferred.resolve(resp);
                }, function(resp) {
                    deferred.reject(resp);
                });
            }            
            return deferred.promise;
        };
        
        service.getBoards = function (placeId){
            var deferred = $q.defer();
            var boards = timeStorage.get(placeId+'_boards');
            if(boards){
            	deferred.resolve({data: boards});
            }else{
            	 return $http({
                     url: CONFIG.ENDPOINTS.IOT_ENDPOINT+'collectionresponse_board?placeId='+placeId,
                     method: "GET"
                 }).success(function (resp) {
                 	timeStorage.set(placeId+'_boards', resp, 1);
                     deferred.resolve(resp);
                 }, function(resp) {
                     deferred.reject(resp);
                 });
            }            
            return deferred.promise;
        };
        
        return service;
    };
    
	factory.$inject = ['$http', '$q', '$interval', '$log', 'CONFIG', 'timeStorage'];
	return factory;
});