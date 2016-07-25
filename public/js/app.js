(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('hihihihi users controller');
    console.log('CLICKED REGGI');

    $scope.username = '';
    $scope.password = '';

    $scope.register = function(){
      console.log(`${$scope.username} is in the system`);
      loginService.registerUser($scope.username, $scope.password);
      $location.path('/register');
    };


  }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('mapController', ['$scope', 'Markers', function($scope, Markers) {
        var food = [];

        Markers.getRestaurants().then(function(promise){
          food = promise;
          console.log(food[0].name);
          for(let i = 0; i < food.length; i++){
          Markers.setMarker(food[i].lat,food[i].lng,food[i].name)
        }
        });
          console.log('Log here');

        //  Markers.setMarkers(Markers.getRestaurants().);
        // scope.$watch('food', function() {
        //     Markers.setMarker();
        // }, true);
    }]);
}

},{}],3:[function(require,module,exports){
let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/loginController.js')(app);
require('./controllers/mapController.js')(app);

//services
require('./services/loginService.js')(app);
require('./services/mapServices.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'loginController',
      templateUrl: 'templates/registration.html',
    })
    .when('/login', {
      controller: 'loginController',
      templateUrl: 'templates/logIn.html',
    })
    .when('/mosey',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/reviews',{
      controller: 'reviewsController',
      templateUrl: 'templates/reviews.html'
    })
    .when('/', {
      redirectTo: '/mosey',
    })
}])

},{"./controllers/loginController.js":1,"./controllers/mapController.js":2,"./services/loginService.js":4,"./services/mapServices.js":5}],4:[function(require,module,exports){
module.exports = function(app){
  app.factory('loginService', function($http){

    let username = "";

    return {

      registerUser: function(username,password){
          username = username;
          return $http({
            method: 'POST',
            url: '/#/register',
            data: {
              username: username,
              password: password,
            }
          }).then(function(response){
            console.log('getttting', response);
            console.log(response.data);
            console.log(username);
          })
      },
      getUsername: function(){
        return username;
      },


    }
  })
}

},{}],5:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        let food = {};
        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });
        return {
            setMarker: function(x, y, name) {
                map.addMarker({
                    lat: x,
                    lng: y,
                    title: name,
                    click: function(e) {
                        alert('You clicked on the ' + name + ' marker');
                    }
                });
            },
            getRestaurants: function() {
                var promise = $http({
                    url: '/food',
                    method: 'get'
                }).then(function(results) {
                  return results.data;
                });
                return promise;

            },

            getLocations: function() {
                GMaps.geolocate({
                    success: function(position) {
                        map.setCenter(position.coords.latitude, position.coords.longitude);

                        map.addMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
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
                    }
                });

            }

        }
    }]);
}

},{}]},{},[3])