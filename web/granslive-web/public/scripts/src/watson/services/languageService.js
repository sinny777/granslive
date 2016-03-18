
define(['angular'], function (angular) {
    "use strict";

  var factory = function ($http, $q, CONFIG) {
    	
	var querystring = require('querystring');
	var nodered_backend_url = CONFIG.NODERED_BACKEND_URL;
	var _promises = {};
	  
	var _genericCallback = function(key, data){
      _promises[key] = data;
	};

	  var _promisesGetter = function(method, URL, data, key, refresh){
	      if(!refresh && _promises[key]!== undefined){
	          return $q.when(_promises[key]);
	      }else{
	          return _ajaxRequest(method, URL, data, key);
	      }
	  };

	  var _ajaxRequest = function(method, URL, data, key, headers){
	      var deferred = $q.defer();
	      
	      if(!headers){
	    	  headers = {'Content-Type': 'application/json', 'Accept':'application/json','Access-Control-Allow-Origin':'*'};
	      }
	      
	      $http({method: method, url: URL, data:data, headers: headers}).
	          success(function(data) {
	              deferred.resolve(data);
	              if(URL==="GET") _genericCallback(key,data);
	          }).
	          error(function(data) {
	              deferred.reject(data);
	          }
	      );
	      return deferred.promise;
	  };

	return {

	    getDialogs : function(refresh){
	        return _promisesGetter('GET','/api/dialog/dialogs', null, "dialogs", refresh);
	    },
	    createDialog : function(createReq){
	    	var fd = new FormData();
	    	fd.append('name', createReq.name);
	    	fd.append('file', createReq.file);
	    	return $http({
	            url: '/api/dialog/create',
	            method: "POST",
	            data: fd,
	            headers: {'Content-Type': undefined},
	            transformRequest: angular.identity
	        });
	    },
	    updateDialog : function(uploadReq){
	    	var fd = new FormData();
	    	fd.append('dialog_id', uploadReq.dialog_id);
	    	fd.append('file', uploadReq.file);
	    	
	    	return $http({
	            url: '/api/dialog/update',
	            method: "POST",
	            data: fd,
	            headers: {'Content-Type': undefined},
	            transformRequest: angular.identity
	        });    	
	    },
	    deleteDialog : function(params){
	        return _ajaxRequest('POST','/api/dialog/delete', params, null);
	    },
	    conversation : function(converseReq, doTest){
	    	var nodeFlowUrl = nodered_backend_url;
	    	if(doTest){
	    		nodeFlowUrl = nodeFlowUrl+'/test';
	    	}else{
	    		nodeFlowUrl = nodeFlowUrl+'/converse';
	    	}
	    	console.log('nodeFlowUrl: >>> ' +nodeFlowUrl);
	    	return $http({
	            url: nodeFlowUrl,
	            method: "POST",
	            data: converseReq
	        });
	    },
	    getUserIntent: function(nlcReq){
	        return _ajaxRequest('POST','/api/dialog/intent', nlcReq, null);
	    },
	    updateProfile: function(profile){
	        return _ajaxRequest('POST','/api/dialog/profile', profile, null);
	    },
	    callNlcMappingFlow : function(mappingReq){
	    	var nodeFlowUrl = nodered_backend_url;
	    	nodeFlowUrl = nodeFlowUrl+'/mappings';
	    	console.log('nodeFlowUrl: >>> ' +nodeFlowUrl);
	    	return $http({
	            url: nodeFlowUrl,
	            method: "POST",
	            data: mappingReq
	        });
	    },
	    callRnR : function(rnrReq){
	    	/*
	    	var rnrfullGetUrl = rnrReq.instance_url+rnrReq.cluster_id+'/solr/'+rnrReq.collection_name;
	    	if(rnrReq.applyRnR){
	    		rnrfullGetUrl += '/fcselect?';
	    	}else{
	    		rnrfullGetUrl += '/select?';
	    	}
	    	var query  = querystring.stringify({q: rnrReq.query.q, ranker_id: rnrReq.ranker_id, fl: rnrReq.fields, wt: rnrReq.wt});
	    	rnrfullGetUrl = rnrfullGetUrl + query;
	    	console.log(rnrfullGetUrl);
	    	return $http({
	            url: rnrfullGetUrl,
	            method: "GET"
	        });
	        */
	    	return _ajaxRequest('POST','/api/dialog/rnr', rnrReq, null);
	    	
	    }
	}
	
  }

	factory.$inject = ['$http', '$q', 'CONFIG'];
	return factory;
});

