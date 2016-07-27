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
    $scope.errorMessage = '';

    $scope.register = function(){
      console.log(`${$scope.firstname} is in the system`);
      loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
      .then(function(response) {
          console.log('user login', response);
      },function(response){
        console.log('response', response.data.message);
        $scope.errorMessage = response.data.message;
      });
    };

    $scope.login = function(){
      console.log("logging in!", $scope.username, $scope.password);
      loginService.loginUser($scope.username, $scope.password)
      .then(function(response) {
          console.log('user login', response);
      },function(response){
        console.log('response', response.data.message);
        $scope.errorMessage = response.data.message;
      });

    };


  }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('mapController', ['$scope', 'Markers', function($scope, Markers) {
        // $scope.itenerary = Markers.getItenerary();
        Markers.getLocation();
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

    $scope.reviewList = reviewsService.getAllReviews();
    $scope.username = loginService.getUsername();
    $scope.errorMessage = '';

    $scope.review = function(){
      console.log(`send new review ${$scope.reviewText}`);
      $http({
        method: 'POST',
        url: '/reviews',
        data: $scope.reviewText,
      }).then(function(response){
        console.log('pina colada', response);
        reviewsService.getAllReviews();
      })
    };


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
    .when('/', {
    redirectTo: '/mosey',
    })
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
}])

},{"./controllers/loginController.js":1,"./controllers/mapController.js":2,"./controllers/reviewsController.js":3,"./services/loginService.js":5,"./services/mapServices.js":6,"./services/reviewsService.js":7}],5:[function(require,module,exports){
module.exports = function(app) {
    app.factory('loginService', function($http) {

        let firstname = "";
        let lastname = "";
        let email = "";
        let username = "";
        let password = "";
        let isLocal = true;

        let usersArray = [];

        let currentUser = {};

        return {

            getUser: function() {
                console.log("here");
                $http({
                    method: 'GET',
                    url: '/users',
                }).then(function(response) {
                    console.log('YAY USER', response);
                    console.log(response.data);
                    let userList = response.data
                    angular.copy(userList, usersArray)
                })
                return usersArray;
            },
            registerUser: function(firstname, lastname, email, username, password, isLocal) {
                console.log('registerUser');
                return $http({
                        method: 'POST',
                        url: '/register',
                        data: {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            username: username,
                            password: password,
                            isLocal: isLocal,
                        }
                    });
            },
            loginUser: function(username, password) {
                console.log(username, password);
                return $http({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: username,
                        password: password,
                    }
                }).then(function(response){
                  console.log('we are logging in')
                  if (response.config.data.username ===username){
                    console.log(response.config.data.username);
                    angular.copy(response.config.data.username, currentUser)
                  }
                  return currentUser
                })
            },

            getUsername: function() {
                return currentUser
            },


        }
    })
}

},{}],6:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itinerary = [];

        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });

        var goldStar = {
          path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
          fillColor: 'yellow',
          fillOpacity: 0.8,
          scale: .1,
          strokeColor: 'gold',
          strokeWeight: 14
        };
        return {

            getLocationName: function() {
                return name;
            },//End of getLocationName************************************************************

            setMarker: function(point) {
                map.addMarker({
                    lat: point.lat,
                    lng: point.lng,
                    title: point.name,
                    click: function(e) {
                      $http({
                        url: '/itinerary',
                        method: 'post',
                        data: point
                      })
                        itinerary.push(point);
                        console.log(itinerary);
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
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                      let lat = position.coords.latitude;
                      let lng = position.coords.longitude;
                      $http({
                        url:'/mosey',
                        method:'post',
                        data:{
                          lat:lat,
                          lng:lng,
                          }
                      });
                      map.addMarker({
                          lat: lat,
                          lng: lng,
                          title: 'user',
                          icon: goldStar,
                      });
                        map.setCenter(position.coords.latitude, position.coords.longitude);
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
  app.factory('reviewsService', ['$http', '$location', function($http, $location){


    console.log('you on reviews service');

    let allReviewsList = [];

    return {
      getAllReviews: function(){
        console.log('getting reviews from server');
        $http({
          method: 'GET',
          url: '/savedreviews',
        }).then(function(response) {
          console.log('saved reviews', response, response.data)
            angular.copy(response.data, allReviewsList);
        })
        return allReviewsList
      }
    };
  }]);
}

},{}]},{},[4])