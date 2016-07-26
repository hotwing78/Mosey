(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('CLICKED REGGI');

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.isLocal = '';

    $scope.register = function(){
      console.log(`${$scope.firstname} is in the system`);
      loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal);
     $location.path('/#/mosey');
    };


  }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('mapController', ['$scope', 'Markers', function($scope, Markers) {
        //$scope.myItenerary = Markers.getItenerary();

        Markers.getRestaurants().then(function(promise){
          let food = promise;
          for(let i = 0; i < food.length; i++){
          Markers.setMarker(food[i])
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
module.exports = function(app){
  app.controller('reviewsController', ['$scope', '$http', '$location', 'reviewsService', 'loginService', function($scope, $http, $location, reviewsService, loginService){

    $scope.username = loginService.getUser();
    console.log('hihihihi reviews controller');

  }])
}

},{}],4:[function(require,module,exports){
let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/loginController.js')(app);
require('./controllers/mapController.js')(app);
require('./controllers/reviewsController.js')(app);

//services
require('./services/loginService.js')(app);
require('./services/mapServices.js')(app);
require('./services/reviewsService.js')(app);

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

},{"./controllers/loginController.js":1,"./controllers/mapController.js":2,"./controllers/reviewsController.js":3,"./services/loginService.js":5,"./services/mapServices.js":6,"./services/reviewsService.js":7}],5:[function(require,module,exports){
module.exports = function(app){
  app.factory('loginService', function($http){

    let firstname = "";
    let lastname = "";
    let email = "";
    let username = "";
    let password = "";
    let isLocal = true;

    let usersArray = []

    return {

      getUser: function(){
        console.log("here");
        $http({
          method: 'GET',
          url: '/users',
        }).then(function(response){
          console.log('YAY USER', response);
          console.log(response);
          let userList = response.data
          angular.copy(userList, usersArray)
        })
          return usersArray;
      },

      registerUser: function(firstname, lastname, email, username, password, isLocal){

          $http({
            method: 'POST',
            url: '/register',
            data: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              username: username,
              password: password,
              isLocal: true,
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

},{}],6:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itenerary = [];

        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });

        // var goldStar = {
        //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        //   fillColor: 'yellow',
        //   fillOpacity: 0.8,
        //   scale: .1,
        //   strokeColor: 'gold',
        //   strokeWeight: 14
        // };
        return {

            getLocationName: function() {
                return name;
            },//End of getLocationName************************************************************

            setMarker: function(point) {
                map.addMarker({
                    lat: point.lat,
                    lng: point.lng,
                    title: point.name,
                    // icon: goldStar,
                    click: function(e) {
                        itenerary.push(point);
                        console.log(itenerary);
                        alert('You clicked on the ' + point.name + ' marker');
                    }
                });

            },//End of setMarker******************************************************************

          /* This is where I make a call to the server to get the available eats in town*/
            getRestaurants: function() {
                var promise = $http({
                    url: '/food',
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;

            },//End of getRestaurants************************************************************

            /* This is where I make a call to the server to get the available events*/
            getEvents: function() {
                var promise = $http({
                    url: '/activity',
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;

            },//End of getEvent******************************************************************

            getItenerary: function() {
                return itenerary;
            },//End of getItenerary***************************************************************

            /*This is where I set the available activities to points on the map*/
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

            }//End of getLocations**************************************************************

        }//End of return*****************************
    }]);//End of end of app.Factory************************************************************
}

},{}],7:[function(require,module,exports){
module.exports = function(app){
  app.factory('reviewsService', function($http){
    console.log('memem');

    return {
      
    }
  })
}

},{}]},{},[4])