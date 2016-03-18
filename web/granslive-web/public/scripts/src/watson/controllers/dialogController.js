define(function () {
    'use strict';

  function ctrl($scope, $rootScope, $sce, languageService, fileSystem, speechService){

	$scope.alert = {};  
	  
    $scope.dialogs = [];
    $scope.selectedDialog = {};
    $scope.selectedNlcClass = {};
	$scope.showMappingForm = false;
    $scope.prevConversation = {};
    $scope.recentConversation = {};
    $scope.userInput;
    $scope.conversations = [];
    $scope.profile = {};
    $scope.dialogFile;
    $scope.fileStream;
    $scope.showConfigDiv = "DIALOGS";
    $scope.objectStorageBasePath = "https://objectstorage-broker.ng.bluemix.net/v2/service_instances/78576e5b-b7c9-417a-9de3-9a1727ba7687/region/dallas/container/dialogs/";
    $scope.filePath = $scope.objectStorageBasePath;
    
    $scope.recording = false;
    
    $scope.rnrReq = {user_id: '08ce9763-62fb-46e8-9166-47ff05383960',
    				 password: 'a8GaXsOF75Z3',
    				 instance_url: '@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/',
    				 cluster_id: 'sccb616999_6af2_4a04_8ee9_26b22b102f46',
    				 collection_name: 'example_collection',
    				 ranker_id: '42AF7Ex10-rank-2247',
    				 query: {},
    				 wt: 'json',
    				 fields: 'id,title,body',
    				 applyRnR: true};
    
    $scope.showAddMappingLink = true;
    $scope.showSaveMappingForm = false;    
   
    $rootScope.footerLinks = [{label:'NodeRed', link:'http://myworkstyle-backend.mybluemix.net/'},
                              {label:'Dialog', link:'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html'},
                              {label:'Language Classifier', link:'http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/language-translation/'},
                              {label: 'Git Repository', link: 'https://hub.jazz.net/git/granslive/ibm-csc-demos'}];

    $scope.initDialogDemo = function (){
      console.log('In initDialogDemo >>>> ');
      $scope.resetAll();
      $scope.getDialogs();
//      $scope.recordAudio();
    };
    
    $scope.resetAll = function(){
    	console.log('\nIN resetALL function >>>>>>>> ');
        $scope.selectedDialog = {};
        $scope.prevConversation = {};
        $scope.recentConversation = {};
        $scope.userInput;
        $scope.conversations = [];
        $scope.profile = {};
        $scope.dialogFile;
        $scope.fileStream;
        $scope.filePath;
        $scope.showConfigDiv = "DIALOGS";
    }
    
    $scope.getDialogs = function(){
        if($scope.dialogs.length == 0){
          languageService.getDialogs().then(function(response) {
            console.log('\nResponse for Dialogs :>>>> ');
            $scope.dialogs = response.dialogs;
            console.log($scope.dialogs);
           },
           function(error) {
               console.log('ERROR IN getDialogs: >>>>>> ' +JSON.stringify(error));
           });
        }
      };

    $scope.testDialog = function(dialog){
    	console.log('IN testDialog: >>> ');
    	console.log(dialog);
    	$scope.selectedDialog = dialog;
        $scope.prevConversation = {};
        $scope.recentConversation = {};
        $scope.userInput;
        $scope.conversations = [];
        $scope.profile = {};
        $scope.showConfigDiv = "TEST";
    };
    
    $scope.showAddDialog = function(){
    	$scope.selectedDialog = {};
    	$scope.showConfigDiv = "ADD_DIALOG";
    };
    
    $scope.showUpdateDialog = function(dialog){
    	console.log('IN showUpdateDialog: >>> ');
    	console.log(dialog);
    	if(dialog){
    		$scope.selectedDialog = dialog;
    		$scope.fetchMappedNLCForDialog();
    	}else{
    		$scope.selectedDialog = {};
    	}
    	$scope.showConfigDiv = "UPDATE_DIALOG";
    };
    
    $scope.closeUpdateDialog = function(){
    	console.log('IN closeUpdateDialog: >>> ');
    	$scope.showConfigDiv = "DIALOGS";
    	$scope.selectedDialog = {};
    };
    
    $scope.fetchMappedNLCForDialog = function(){
    	if($scope.selectedDialog){
    		var searchQuery = "dialog_id:"+$scope.selectedDialog.dialog_id;
    		var mappingReq = {"action":"SEARCH", "query":searchQuery};
    		languageService.callNlcMappingFlow(mappingReq).then(function(response) {
    	    	console.log("\nSEARCHED MAPPED NLC CLASSES FOR DIALOG: >>>>>>>");
    	    	console.log(response);
    	    	$scope.selectedDialog.mappedClasses = response.data;
    	    },
            function(error) {
               console.log('ERROR IN searchMappings: >>>>>> ' +JSON.stringify(error));
            });
    	}
    }
    
    $scope.showSaveMappingsForm = function(nlcClass){
    	if(nlcClass == null || nlcClass == undefined){
    		$scope.selectedNlcClass = {};
    	}else{
    		$scope.selectedNlcClass = nlcClass;
    	}
    	$scope.showMappingForm = true;
    };
    
    $scope.saveNLCMapping = function(){
    	var mappingReq = $scope.selectedNlcClass;
    	mappingReq.action = "SAVE";
    	mappingReq.dialog_id = $scope.selectedDialog.dialog_id;
    	console.log('IN saveNLCMapping with mappingReq: ' +JSON.stringify(mappingReq));
		languageService.callNlcMappingFlow(mappingReq).then(function(response) {
	    	console.log("\nSAVE DIALOG - NLC CLASSES MAPPING: >>>>>>>");
	    	$scope.fetchMappedNLCForDialog();
	    	$scope.showAlert('alert-success', 'SUCCESS ! ', " Mapping saved successfully");
	    },
        function(error) {
           console.log('ERROR IN callNlcMappingFlow: >>>>>> ' +JSON.stringify(error));
           $scope.showAlert('alert-danger', 'ERROR ! ', JSON.stringify(error));
        });
    };
    
    $scope.deleteNLCMapping = function(nlcClass){
    	var mappingReq = nlcClass;
    	mappingReq.action = "DELETE";
    	console.log('IN deleteNLCMapping with mappingReq: ' +JSON.stringify(mappingReq));
		languageService.callNlcMappingFlow(mappingReq).then(function(response) {
	    	console.log("\nDELETE DIALOG - NLC CLASSES MAPPING SUCCESS: >>>>>>>");
	    	$scope.fetchMappedNLCForDialog();
	    	$scope.showAlert('alert-success', 'SUCCESS ! ', " Mapping deleted successfully");
	    },
        function(error) {
           console.log('ERROR IN deleteNLCMapping: >>>>>> ' +JSON.stringify(error));
           $scope.showAlert('alert-danger', 'ERROR ! ', JSON.stringify(error));
        });
    };
    
    $scope.createDialogTemplate = function(){
    	console.log('IN createDialogTemplate: >>> ');
    	console.log($scope.selectedDialog);
    	
    	var dialogTemplate = $scope.myFile;
        var createReq = {};
    	
        if($scope.selectedDialog.name){
    		createReq.name = $scope.selectedDialog.name;
    	}
        createReq.file = dialogTemplate;
    	
    	languageService.createDialog(createReq).then(function(response) {
	    	console.log("\nDIALOG CREATED SUCCESSFULLY: >>>>>>>");
	    	console.log(response);
	    	$scope.dialogs.push({dialog_id:response.data.dialog_id, name: $scope.selectedDialog.name});
	    	$scope.showAlert('alert-success', 'SUCCESS ! ', " Dialog created successfully");
	    },
        function(error) {
           console.log('ERROR IN createDialog: >>>>>> ' +JSON.stringify(error));
           $scope.showAlert('alert-danger', 'ERROR ! ', JSON.stringify(error));
        });
    }
    
    $scope.uploadDialogTemplate = function(){
    	console.log('IN uploadDialogTemplate: >>> ');
    	console.log($scope.selectedDialog);
    	var dialogTemplate = $scope.myFile;
        var uploadReq = {};
    	
    	if($scope.selectedDialog.dialog_id){
    		uploadReq.dialog_id = $scope.selectedDialog.dialog_id;
    	}
    	
    	uploadReq.file = dialogTemplate;
        
    	languageService.updateDialog(uploadReq).then(function(response) {
	    	console.log("\nDIALOG UPDATED SUCCESSFULLY: >>>>>>>");
	    	console.log(response);
	    	$scope.showAlert('alert-success', 'SUCCESS ! ', " Dialog updated successfully");
	    },
        function(error) {
           console.log('ERROR IN updateDialog: >>>>>> ' +JSON.stringify(error));
           $scope.showAlert('alert-danger', 'ERROR ! ', JSON.stringify(error));
        });
        
    }
    
    $scope.deleteDialog = function(dialog){
    	console.log('IN deleteDialog: >>> ');
    	console.log(dialog);
    	var r = confirm("Do you really want to delete this dialog!");
    	if (r == true) {
    		languageService.deleteDialog({dialog_id: dialog.dialog_id}).then(function(response) {
		    	console.log("\nDIALOG DELETED SUCCESSFULLY: >>>>>>>");
		    	console.log(response);
		    	var index = $scope.dialogs.indexOf(dialog);
		    	$scope.dialogs.splice(index, 1);   
		    	$scope.showAlert('alert-success', 'SUCCESS ! ', " Dialog deleted successfully");
		    },
	        function(error) {
               console.log('ERROR IN deleteDialog: >>>>>> ' +JSON.stringify(error));
               $scope.showAlert('alert-danger', 'ERROR ! ', JSON.stringify(error));
            });
    	} else {
    	    console.log('<<<< DO Nothing >>>>>');
    	}
    };
    
    $scope.checkIfEnterPressed = function(keyEvent){
    	if (keyEvent.which === 13){
    		$scope.converseWithWatson();
    	}
    };
    
    $scope.converseWithWatson = function(){
    	if(!$scope.userInput){
    		return true;
    	}else{
    		if($scope.userInput.toLowerCase().indexOf('more info') != -1){
    			$scope.callRnR();
    		}else{
    			$scope.doConversation();    	
    		}
    	}
    };
    
    $scope.doConversation = function(){
    	var doTest = false;
    	var saveInDB = "true";
    	
    	if($scope.prevConversation && $scope.prevConversation.client_id){
    		$scope.recentConversation = $scope.prevConversation;
    		$scope.recentConversation.params.input = $scope.userInput;
    		
    		if($scope.prevConversation.dialogResp){
    			$scope.recentConversation.client_id = $scope.prevConversation.dialogResp.client_id;
    			$scope.recentConversation.params.client_id = $scope.prevConversation.dialogResp.client_id;
    			$scope.recentConversation.params.conversation_id = $scope.prevConversation.dialogResp.conversation_id;
    		}
    		
    	}else{
    		$scope.recentConversation = {"action": "converse",
					    				  "source": "WEB",
					    				  "params": {
					    				    "input": $scope.userInput,
					    				    "saveindb":saveInDB
					    				  },
					    				  "reqDetails": {
					    				    "status": "ROUTE"
					    				  }
					    				}
    				
    			$scope.recentConversation.reqDetails = {"status": "ROUTE"};
    		}
    	
    	if($scope.showConfigDiv == 'TEST'){
    		doTest = true;
    		$scope.recentConversation.params.saveindb = "false";
    		$scope.recentConversation.params.dialog_id = $scope.selectedDialog.dialog_id;
    	}
    	
    	if($scope.showConfigDiv != 'TEST' && $scope.recentConversation.reqDetails.status == 'ROUTE'){
//			$scope.recentConversation.params.conversation_id = null;
		}
    	
    	$scope.recentConversation.dialogResp = {};
		$scope.recentConversation.timestamp = null;
    	console.log('\n\nRecent Conversation Request: >>> ');
		console.log($scope.recentConversation);
    	languageService.conversation($scope.recentConversation, doTest).then(function(response) {
	            console.log('\nWATSON DIALOG SERVICE RESPONSE: >>>>>>> ' +JSON.stringify(response.data));
	            console.log(response.data);
	            $scope.formatChatForDialogResp(response);
           },
           function(error) {
               console.log('ERROR IN conversation: >>>>>> ' +JSON.stringify(error));
           });
    };
    
    $scope.formatChatForDialogResp = function(response){
    	$scope.prevConversation = response.data;
    	var fullMsgText = "";
    	
    	if($scope.prevConversation.dialogResp && $scope.isJSON($scope.prevConversation.dialogResp.response)){
    		angular.forEach($scope.prevConversation.dialogResp.response, function(msg, key) {
        		console.log(msg);
        		if(msg && msg != ''){
        			if($scope.isJSON(msg)){
        				var msgObj = JSON.parse(msg);
        	    		if(msgObj.text && msgObj.text != 'DIALOG_COMPLETED'){
        	    			fullMsgText += " " +msgObj.text;
        	    		}
        	    		if(msgObj.attachments && msgObj.attachments.length > 0){
        	    			angular.forEach(msgObj.attachments, function(attachment, key) {
        	    				var attachmentObj = attachment;
        	    				if(attachmentObj.text){
        	    	    			fullMsgText += "<br /> " +attachmentObj.text;
        	    	    		}
        	    				if(attachmentObj.image_url){
        	    	    			fullMsgText += " <img src='" +attachmentObj.image_url+"' /><br />";
        	    	    		}
        	    			});
        	    		}
        			}else{
        				fullMsgText += "<br /> " +msg;
        	    		fullMsgText = fullMsgText.replace('\n', '<br />');
        	    		$scope.conversations.push({userInput: $scope.userInput, watsonResp: fullMsgText});
        			}
        		}    			
        	});
        	fullMsgText = fullMsgText.replace('\n', '<br />');
        	
            $scope.conversations.push({userInput: $scope.userInput, watsonResp: fullMsgText});
    	}else{
    		fullMsgText = $scope.prevConversation.dialogResp.response.join('<br />');
    		fullMsgText = fullMsgText.replace('\n', '<br />');
    		$scope.conversations.push({userInput: $scope.userInput, watsonResp: fullMsgText});
    	}    	
    	
        $scope.userInput = null;
        console.log($scope.conversations);
    };
    
    $scope.callRnR = function(){
    	$scope.rnrReq.query = 'What are the security groups provided in SharePoint';
    	languageService.callRnR($scope.rnrReq).then(function(rnrResponse) {
            console.log('\nWATSON RnR SERVICE RESPONSE: >>>>>>> ');
            console.log(rnrResponse);
            $scope.formatChatForRnRResp(rnrResponse);
       },
       function(error) {
           console.log('ERROR IN callRnR: >>>>>> ' +JSON.stringify(error));
       });
    };
    
    $scope.formatChatForRnRResp = function(rnrResponse){
    	var fullMsgText = '';
    	if(rnrResponse.response && $scope.isJSON(rnrResponse.response)){
    		angular.forEach(rnrResponse.response.docs, function(msg, key) {
        		console.log(msg);
        		fullMsgText += '<b>'+msg.title[0]+'</b><br />'
        		fullMsgText += msg.body[0]+'<br /><br />';
    		});
    	}
    	
    	fullMsgText = fullMsgText.replace('\n', '<br />');
        $scope.conversations.push({userInput: $scope.userInput, watsonResp: fullMsgText});
    };
    
    $scope.onResultCallback = function(data) {
	  console.log('onResultCallback:>>>>>>> ', data);
	  var result = data.results[data.results.length - 1];
	  var transcript = result.alternatives[0].transcript;
      $scope.$apply(function () {
    	  $scope.userInput = transcript;
      });

	  if (result.final) {
//		  $scope.stopRecordingAudio();
		  $scope.doConversation();
	  }
	};
    
    $scope.recordAudio = function(){
  	  	speechService.recognize($scope.onResultCallback);
  	  	$scope.recording = true;
    }
    
    $scope.stopRecordingAudio = function(){
    	console.log('\n\nstopRecordingAudio:>>>>>>> ');
    	setTimeout(function () {
            $scope.$apply(function () {
            	$scope.recording = false;
            	speechService.recognizeAbort();
            });
        }, 2000);
    	
    }
    
    $scope.isJSON = function(something) {
        if (typeof something != 'string')
            something = JSON.stringify(something);

        try {
            JSON.parse(something);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    $scope.showAlert = function(cssClass, title, msg){
    	$scope.alert = {};
    	$scope.alert.cssClass = cssClass;
    	$scope.alert.title = title;
    	$scope.alert.message = msg;
    	alert(msg);
    }

  }
  
  ctrl.$inject = ['$scope','$rootScope', '$sce', 'languageService', 'fileSystem', 'speechService'];
  return ctrl;

});
