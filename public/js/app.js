(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
        app.controller('mapController',['$http','Markers',function($http,Markers) {
            Markers.getLocations();
            Markers.postData();            
        }]);
      }

},{}],2:[function(require,module,exports){
module.exports = function(app){
  app.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){

    console.log('hihihihi users controller');

  }])
}

},{}],3:[function(require,module,exports){
let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/users.js')(app);
require('./controllers/mapController.js')(app);

//services
require('./services/users.js')(app);
require('./services/mapServices.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'UserController',
      templateUrl: 'templates/registration.html',
    })
    .when('/login', {
      controller: 'UserController',
      templateUrl: 'templates/login.html',
    })
    .when('/mosey',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/reviews',{
      controller: 'ReviewsController',
      templateUrl: 'templates/reviews.html'
    })
    .when('/chat',{
      // controller: 'ReviewsController',
      templateUrl: 'templates/chat.html'
    })
    .when('/', {
      redirectTo: '/mosey',
    })
}])

},{"./controllers/mapController.js":1,"./controllers/users.js":2,"./services/mapServices.js":4,"./services/users.js":5}],4:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        let lat = '';
        let lng= '';
        let center = {
            lat: lat,
            lng: lng
        };
        let newCenter = JSON.stringify(center);
        var map = new GMaps({
            div: '#map',
            lat: -22.043333,
            lng: -77.028333
        });
        return {
          postData: function(newCenter) {
               $http.post('/mosey',{
                  center: newCenter
              });

          },
            getLocations: function() {
                GMaps.geolocate({
                    success: function(position) {
                        lat = position.coords.latitude
                        lng = position.coords.longitude
                        map.setCenter(lat,lng);
                        map.addMarker({
                            lat: lat,
                            lng: lng,
                            title: 'Damon',
                            click: function(e) {
                                alert('You clicked in this marker');
                            }
                        });
                        console.log(position.coords.latitude + ' ' + position.coords.longitude);

                        map.setZoom(20)
                    },
                    error: function(error) {
                        alert('Geolocation failed: ' + error.message);
                    },
                    not_supported: function() {
                        alert("Your browser does not support geolocation");
                    },
                    always: function() {
                        alert("Done!");
                    }
                });

            }

        }
    }]);
}

},{}],5:[function(require,module,exports){
module.exports = function(app){
  app.factory('UserService', function($http){

  })
}

},{}]},{},[3])