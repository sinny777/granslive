
define(['angular'], function (angular) {
    "use strict";

    var directive = function () {
    	return {
    	    restrict: 'A',
    	    link: function(scope, element, attrs){
    	      if (attrs.toggle=="tooltip"){
    	    	  $(element).tooltip();
    	      }
    	      if (attrs.toggle=="popover"){
    	    	  $(element).popover();
    	      }
    	    }
    	  }
    }
    
    directive.$inject = ['$parse'];
    return directive;
	
});

