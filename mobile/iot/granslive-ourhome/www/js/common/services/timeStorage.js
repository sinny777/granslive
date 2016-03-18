/*global define, console */

define(['angular'], function (angular) {
    "use strict";

    var factory = function ($localStorage) {

        var timeStorage = {};
        timeStorage.cleanUp = function () {
            var cur_time = new Date().getTime();
            for (var i = 0; i < $localStorage.length; i++) {
                var key = $localStorage.key(i);
                if (key.indexOf('_expire') === -1) {
                    var new_key = key + "_expire";
                    var value = $localStorage.getItem(new_key);
                    if (value && cur_time > value) {
                    	$localStorage.removeItem(key);
                    	$localStorage.removeItem(new_key);
                    }
                }
            }
        };
        
        timeStorage.remove = function (key) {
            this.cleanUp();
            var time_key = key + '_expire';
            $localStorage[key] = false;
            $localStorage[time_key] = false;
        };
        timeStorage.set = function (key, data, hours) {
            this.cleanUp();
            $localStorage[key] = data;
            var time_key = key + '_expire';
            var time = new Date().getTime();
            time = time + (hours * 1 * 60 * 60 * 1000);
            $localStorage[time_key] = time;
        };
        timeStorage.get = function (key) {
            this.cleanUp();
            var time_key = key + "_expire";
            if (!$localStorage[time_key]) {
                return false;
            }
            var expire = $localStorage[time_key] * 1;
            if (new Date().getTime() > expire) {
                $localStorage[key] = null;
                $localStorage[time_key] = null;
                return false;
            }
            return $localStorage[key];
        };
        return timeStorage;
    };
    
    factory.$inject = ['$localStorage'];
    return factory;
});

