/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * if VCAP_SERVICES exists then it returns
 * username, password and url
 * for the first service that stars with 'name' or {} otherwise
 * @param  String name, service name
 * @return {Object} the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */
module.exports.getServiceCreds = function(name) {
    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            if (service_name.indexOf(name) === 0) {
                var service = services[service_name][0];
                return {
                    url: service.credentials.url,
                    username: service.credentials.username,
                    password: service.credentials.password
                };
            }
        }
    }else{
    	// THIS ELSE BLOCK IS TO RUN THE APPLICATION LOCALLY
    	if(name == 'language-translation'){
    		return {
    			 "url": "https://gateway.watsonplatform.net/language-translation/api",
    	            "username": "34afdcc3-504f-4f61-a999-1fdcfd0d5565",
    	            "password": "X9LmZphvDbSC",
    	             version: 'v2'
    		}
    	}
    	if(name == 'dialog'){
    		return {
    			"url": "https://gateway.watsonplatform.net/dialog/api",
                "username": "69b6ecc1-c777-4709-9e3c-89c84a05d659",
                "password": "68k7zhwODohx",
        	     version: 'v1'
    		}
    	}
    	if(name == 'natural_language_classifier'){
    		return {
    			"url": "https://gateway.watsonplatform.net/natural-language-classifier/api",
                "username": "751f3775-06e8-47ab-934b-0cb68749362a",
                "password": "hoh3IC1Xegv7",
        	     version: 'v1'
    		}
    	}
    	if(name == 'retrieve_and_rank'){
    		return {
    			 "url": "https://gateway.watsonplatform.net/retrieve-and-rank/api",
    	            "username": "08ce9763-62fb-46e8-9166-47ff05383960",
    	            "password": "a8GaXsOF75Z3",
    	             version: 'v1'
    		}
    	}
    	if(name == 'speech_to_text'){
    		return {
    			"url": "https://stream.watsonplatform.net/speech-to-text/api",
                "password": "eoOB2PFBEAWT",
                "username": "d5214313-4222-43f8-8c97-ea73eb5954d0"
    		}
    	}
    }
    return {};
};