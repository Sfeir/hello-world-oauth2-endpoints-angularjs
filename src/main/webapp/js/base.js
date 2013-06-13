/* Copyright 2013 Sfeir Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Client ID of the application (from the APIs Console).
 * 
 * @type {string}
 */
CLIENT_ID = 'your client id';

/**
 * Scopes used by the application.
 * 
 * @type {string}
 */
SCOPES = 'https://www.googleapis.com/auth/userinfo.email';

/**
 * Response type of the auth token.
 * 
 * @type {string}
 */
RESPONSE_TYPE = 'token id_token';

/**
 * Configures $hhtp angularjs object to use the header 'Authorizarion'
 * with the 'token.id_token' access token got from oauth2 serveur.
 * Sets the email and nickname of the logged user in $scope and then redirect to /home
 */
userAuthenticated = function($http, $scope, $location) {
	var request = gapi.client.oauth2.userinfo
			.get()
			.execute(function(resp) {
						if (!resp.code) {
							var token = gapi.auth.getToken();
							$http.defaults.headers.common['Authorization'] = '  Bearer '
									+ token.id_token;
							
							$scope.signed = true;
							$scope.email = resp.email;
							queryGreeting($http, $scope);
							
							$location.path('/home');
							$scope.$apply();
						}
					});
};

/**
 * Handles the auth flow, with the given value for immediate mode.
 * 
 * @param {boolean}
 *            mode Whether or not to use immediate mode.
 * @param {Function}
 *            callback Callback to call on completion.
 */
signin = function(mode, callback) {
	gapi.auth.authorize({
		client_id : CLIENT_ID,
		scope : SCOPES,
		immediate : mode,
		response_type : RESPONSE_TYPE
	}, callback)
};

/**
 * Presents the user with the authorization popup.
 */
authenticate = function($http, $scope, $location) {
	if (!$scope.signed) {
		signin(false, userAuthenticated($http, $scope, $location));
	} else {
		$scope.signed = false;
		$location.path('/login');
	}
};

/**
 * Queries for greeting the logged user.
 * This function uses $http angularjs object to send a GET request to 
 * cloud endpoint. Note that $http is well configured regarding security constraints
 * 
 */
queryGreeting = function($http, $scope) {
	$http.get("https://hello-world-angularjs.appspot.com/_ah/api/helloWorld/v2/greetings")
		 .success(function(data, status, headers, config) {
				$scope.greeting = data.greeting;})
		  .error(function(data, status, headers, config) {
				console.log('got error : ' + config);
		   });
};

/**
 * Initializes the application. It loads asynchronously all needed libraries
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
initialize = function(apiRoot) {
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			// bootstrap manually angularjs after our apis are loaded
			angular.bootstrap(document, [ "helloapp" ]);
		}
	}
	apisToLoad = 2; // must match number of calls to gapi.client.load()
	gapi.client.load('helloWorld', 'v2', callback, apiRoot);
	gapi.client.load('oauth2', 'v2', callback);
};
