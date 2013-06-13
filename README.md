appengine-endpoints-backend-java
================================

This application implements a simple backend for a greeting api using
Google Cloud Endpoints, App Engine, Oauth2 and Java.

## Products
- [App Engine][1]

## Language
- [Java][2]

## APIs
- [Google Cloud Endpoints][3]
- [Google App Engine Maven plugin][6]

## Configuration
### Create OAuth 2.0 client IDs
 1. Go to https://code.google.com/apis/console and create or choose your project.
 2. Click on API Access link, fill in all relevant infomations and click `create a new Oauth2 client ID` or `create anthor client ID` if you already created one
    - make sur that `web application` is selected
    - click `Your site or hostname (more options)` link and then fill in :
       optional : `Authorized Redirect URIs : https://app-id.appspot.com`
       required : `Authorized JavaScript Origins :  https://app-id.appspot.com`. Add all urls that will be used to access your app (localhost:8080 for  example to test locally).
    - validate your creation

3. Update the value of `application` in `appengine-web.xml` to the app ID you
   have registered in the App Engine admin console and would like to use to host
   your instance of this sample.
4. Update the values in `src/main/java/sfeir/devs/samples/spi/Ids.java` to
   reflect the respective client IDs you have registered in the
   [APIs Console][4].
5. Update the value of `CLIENT_ID` in
   `webapp/js/base.js` to reflect the web client ID you have registered in the
   [APIs Console][4].
6. mvn clean install
7. Run the application with `mvn appengine:devserver`, and ensure it's running
   by visiting your local server's  address (by default [localhost:8080][5].)
8. Regenerate client lib by running : mvn appengine:endpoints_get_client_lib
9. Deploy your application to GAP : mvn appengine:update
10. Access your application on https://app-id.appspot.com


[1]: https://developers.google.com/appengine
[2]: http://java.com/en/
[3]: https://developers.google.com/appengine/docs/java/endpoints/
[4]: https://code.google.com/apis/console
[5]: https://localhost:8080/
[6]: https://developers.google.com/appengine/docs/java/tools/maven

Your done
