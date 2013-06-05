/* Copyright 2013 Google Inc. All Rights Reserved.
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

package sfeir.devs.samples.greeting.spi;

import java.io.IOException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.users.User;

/**
 * Defines Greeting API.
 *
 */
@Api(name = "helloWorld", version = "v1", clientIds = { Ids.WEB_CLIENT_ID })
public class GreetingV1 {
	

	/**
	 * Provides the ability to query for a collection of Score entities.
	 * 
	 * @param user
	 *            object representing the current user making requests
	 * @return greeting string with user name
	 * @throws OAuthRequestException
	 *             if the token included in the request is invalid, the client
	 *             ID included in the token is not in the list of allowed
	 *             clientIds, or the audience included in the token is not in
	 *             the list of allowed audiences.
	 * @throws IOException
	 */
	@ApiMethod(name = "greetings.getGreeting")
	public Greeting getGreeting(User user) throws OAuthRequestException, IOException {

		if (user != null) {
			return Greeting.fromString(user.getNickname()); 
		} else {
			throw new OAuthRequestException("Invalid user.");
		}
	}

}
