# datastore-server-app repo overview

The datastore-app-server repo contains a simple Node.js server implementation.  The primary purpose of the server is to deploy the static build of the [datastore-web-app](https://github.com/craigmcchesney/datastore-web-app) React application, avoiding the need to install a full Apache web server to fulfill that need.  

A secondary objective is to provide a mechanism for augmenting the [datastore](https://github.com/osprey-dcs/datastore) and [datastore-service](https://github.com/osprey-dcs/datastore-service) Java server APIs with additional functionality.  The initial server implementation in this repo contains a simple config API, and a placeholder authentication API stub.

The Express.js framework is used for routing in the server.  The server implementation follows the pattern described in the article [Build and Deploy a Web Application With React and Node.js+Express](https://medium.com/geekculture/build-and-deploy-a-web-application-with-react-and-node-js-express-bce2c3cfec32). 

## server routes and web application routing

The server's api routes are organized under an "api" path, e.g., "/api/auth" and "/api/config".  Any unhandled routes are sent to the web application static file, where the web app performs its own routing using React Router for navigating to pages and updating the browser location/history.

For example, to call the config API, the web application invokes "fetch()" with the path "/api/config/getClientConfig" (full URL http://localhost:9000/api/config/getClientConfig).

The web application is accessed via http://localhost:9000 when deployed as a statically built file running under the server.

## server scripts

The package.json file defines the following scripts for running/building the server and client applications invoked using "npm run script-name":

* start - Starts the server using node.
* server - Starts the server using nodemon, which updates the running server with changes made to the underlying files automatically.

## repo directories

* root directory - Contains package.json, package-lock.json, and the main JavaScript entry point, index.js.
* server - Contains "server.js".  An instance of the Server class is created by index.js.  Sets up handlers for the various server routes.
* routes - Provides handlers "config.js" and "auth.js" for mapping API routes to controller functions.
* controllers - Includes "config.js" and "auth.js" controllers with functions implementing the config and authentication APIs, respectively.
* middleware - Includes "valiate-input.js" for validating API requests.
