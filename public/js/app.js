(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
        app.controller('mapController',['$http','Markers',function($http,Markers) {
            Markers.getLocations();
        }]);
      }

},{}],2:[function(require,module,exports){
module.exports = function(app){
  app.controller('RegController', ['$scope', '$http', '$location', 'RegService', function($scope, $http, $location, RegService){

    console.log('hihihihi registration controller');

  }])
}

},{}],3:[function(require,module,exports){
let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/reg.js')(app);
require('./controllers/mapController.js')(app);

//services
require('./services/reg.js')(app);
require('./services/mapServices.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'RegController',
      templateUrl: 'templates/registration.html',
    })
    .when('/map',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/', {
      redirectTo: '/map',
    })
}])

},{"./controllers/mapController.js":1,"./controllers/reg.js":2,"./services/mapServices.js":4,"./services/reg.js":5}],4:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers',['$http', function($http) {
            var map = new GMaps({
                div: '#map',
                lat: -12.043333,
                lng: -77.028333
            });
            return {
                getLocations: function() {
                    GMaps.geolocate({
                        success: function(position) {
                            map.setCenter(position.coords.latitude, position.coords.longitude);
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
  app.factory('RegService', function($http){
      
  })
}

},{}]},{},[3])