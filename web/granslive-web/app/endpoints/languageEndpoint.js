
module.exports = function(watson, bluemix, fs) {
	
	var dialogServiceCred = bluemix.getServiceCreds('dialog');
	dialogServiceCred.version = "v1";
  	var dialog_service = watson.dialog(dialogServiceCred);
  	
  	var nlcCred = bluemix.getServiceCreds('natural_language_classifier');
  	nlcCred.version = "v1";
  	var nlcService = watson.natural_language_classifier(nlcCred);
  	
  	var rnrCred = bluemix.getServiceCreds('retrieve_and_rank');
  	rnrCred.version = "v1";
  	var rnrService = watson.retrieve_and_rank(rnrCred);
  	
    return{
          
       // ****** BELOW METHODS FOR WATSON DIALOG AND LANGUAGE CLASSIFIER SERVICES *******
          
          getDialogs: function(req,res) {
            console.log('\nIN LanguageEndpoint to getDialogs >>>>>>>>>>');
            dialog_service.getDialogs({}, function(err, dialogs) {
              if (err)
                res.send(err.code, {'message': err.error});
              else
                res.json(dialogs);
            });
          },
          
          createDialog: function(req, res){
        	  console.log('\nIN LanguageEndpoint to createDialog >>>>>>>>>>');  
        	  
        	  var tempFilePath = req.files.file.path;
        	  var newFilePath = tempFilePath+req.files.file.name;
        	  
        	  fs.rename(tempFilePath, newFilePath, function(err) {
        	        if (err) throw err;
        	        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        	        fs.unlink(tempFilePath, function() {
        	            if (err) throw err;
        	        });
        	        
        	      var params = {};
              	  params.name = req.body.name;
              	  params.file = fs.createReadStream(newFilePath);
              	  dialog_service.createDialog(params,
              		  function(err, response) {
              		  if (err){
              			  console.log(err);
              			  res.send(err.code, {'message': err.error});
              		  } else{
	              			fs.unlink(newFilePath, function() {
	            	            if (err) throw err;
	            	        });
                            res.json(response);
              		  }
              		});
        	        
        	    });
          },
          
          updateDialog: function(req, res){
        	  console.log('\n\nIN LanguageEndpoint to updateDialog >>>>>>>>>>'); 
        	  var tempFilePath = req.files.file.path;
        	  var newFilePath = tempFilePath+req.files.file.name;
        	  
        	  fs.rename(tempFilePath, newFilePath, function(err) {
      	        if (err) throw err;
      	        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      	        fs.unlink(tempFilePath, function() {
      	            if (err) throw err;
      	        });
      	        
      	      var params = {};
            	  params.dialog_id = req.body.dialog_id;
            	  params.file = fs.createReadStream(newFilePath);
            	  dialog_service.updateDialog(params,
            		  function(err, response) {
            		  if (err){
            			  console.log(err);
            			  res.send(err.code, {'message': err.error});
            		  } else{
	              			fs.unlink(newFilePath, function() {
	            	            if (err) throw err;
	            	        });
                          res.json(response);
            		  }
            		});
      	        
      	    });
          },
          
          deleteDialog: function(req, res){
        	  console.log('\nIN LanguageEndpoint to deleteDialog >>>>>>>>>>');    
        	  console.log(req.body);
        	  dialog_service.deleteDialog(req.body,
        		  function(err, response) {
        		  if (err)
        			  res.send(err.code, {'message': err.error});
                    else
                      res.json(response);
        		});
          },
          
          getUserIntent: function(req, res){
        	  console.log('\nIN LanguageEndpoint to getUserIntent >>>>>>>>>>');        	  
        	  nlcService.classify(req.body.params,
        		  function(err, response) {
        		  if (err)
                      res.send(500, {'message': err});
                    else
                      res.json(response);
        		});
          },
          
          updateProfile: function(req, res){
        	  console.log('\nIN LanguageEndpoint to updateProfile >>>>>>>>>>');        	  
        	  dialog_service.updateProfile(req.body,
        		  function(err, response) {
        		  if (err)
                      res.send(500, {'message': err});
                    else
                      res.json(response);
        		});
          },
          
          conversation: function(req, res){
        	  console.log('\nIN LanguageEndpoint to conversation >>>>>>>>>>');
              dialog_service.conversation(req.body.params, function(err, conversation) {
                if (err)
                  res.send(500, {'message': err});
                else
                  res.json(conversation);
              });
          },
          
          callRnR: function(req, res){
        	  console.log('\nIN LanguageEndpoint to callRnR >>>>>>>>>>');
        	  var params = {
        			  cluster_id: req.body.cluster_id,
        			  collection_name: req.body.collection_name,
        			  wt: req.body.wt
        			};
        	  var solrClient = rnrService.createSolrClient(params);
        	  
        	  if(req.applyRnR){
        		  var qs = require('qs');
        		  var query = qs.stringify(req.body.query);
        		  solrClient.get('fcselect', query, function(err, searchResponse) {
        		    if(err) {
        		      res.send(500, {'message': err});
        		    } else {
        		        res.json(searchResponse);
        		      }
        		  });
        	  }else{
        		  console.log('Searching all documents.');
            	  var query = solrClient.createQuery();
            	  query.q(req.body.query);

            	  solrClient.search(query, function(err, searchResponse) {
            	    if(err) {
            	      console.log('Error searching for documents: ' + err);
            	      res.send(500, {'message': err});
            	    } else {
            	        console.log('Found ' + searchResponse.response.numFound + ' documents.');
            	        console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
            	        res.json(searchResponse);
            	      }
            	  });
        	  }
          }
          
        }

}
