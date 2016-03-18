
define(function (require) {
    'use strict';
    
    var io =  require('/../utils/socket.io');
    var microphone =  require('/../utils/speechRecognizer');

  var factory = function ($http, $q, CONFIG) {
	  
	  var options = {
			  			ws: '',
			  			model: 'en-US_BroadbandModel'
			  		};
	  
	  options.message = {
			    'action': 'start',
			    'content-type': 'audio/l16;rate=16000',
			    'interim_results': true,
			    'continuous': true,
			    'word_confidence': true,
			    'timestamps': true,
			    'max_alternatives': 3,
			    'inactivity_timeout': 600
			  };
	  
	  var audio = undefined,
	  recognizer = new SpeechRecognizer(options, io);
  
    recognizer.onstart = function() {
	  console.log('speech.recognizer.onstart >>>>>>> ');
	};

	recognizer.onerror = function(error) {
	  console.log('speech.recognizer.onerror: >>>>>>> ', error);
	}
	  	
	  
		return {

		    recognize : function(onresultCallback){
		    	recognizer.onresult = onresultCallback;
		    	recognizer.start();
		    },
		    
		    recognizeAbort: function(){
		    	recognizer.stop();
		    }
		}
	
  }

	factory.$inject = ['$http', '$q', 'CONFIG'];
	return factory;
});

