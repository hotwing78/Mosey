(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('hihihihi users controller');

    $scope.name="";
    $scope.password="";
    $scope.usersArray = loginService.getUser();

    $scope.login = function(){
      console.log(`${scope.name} is in the systemmm`);
      UserService.createUser($scope.name,$scope.password);
      $location.path('/login');
    }

  }])
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
        app.controller('mapController',['$http','Markers',function($http,Markers) {
            Markers.getLocations();
            Markers.setMarker();
            Markers.getRestaurants();

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
      controller: 'UserController',
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
    // .when('/chat',{
    //   controller: 'BasicController',
    //   templateUrl: 'templates/chat.html'
    // })
    .when('/', {
      redirectTo: '/mosey',
    })
}])

},{"./controllers/loginController.js":1,"./controllers/mapController.js":2,"./services/loginService.js":4,"./services/mapServices.js":5}],4:[function(require,module,exports){
module.exports = function(app){
  app.factory('loginService', function($http){

    let username = "";
    let usersArray = [];

    return {

      getUser: function(){
          $http({
            method: 'GET',
            url: '/users',
          }).then(function(response){
            console.log('getttting', response);
            console.log(response.data);
            let userList = response.data
            angular.copy(userList, usersArray)
          })
          return usersArray;
      },

      createUser: function(name,password){
        username = name;
        console.log(username, "IS LOGGING IN");

        $http({
          method: 'POST',
          url: '/login',
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: name,
            password: password,
          }
        }).then(function(response){
          console.log(username);
          console.log('this is what is returning', response);
        })
      },

      getUserName: function(){
        return username;
      }
    }
  })
}

},{}],5:[function(require,module,exports){
module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        let food = [];
        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });
        return {

            getRestaurants: function() {
                $http({
                    url: '/food',
                    method: 'get'
                }).then(function(results) {
                    let response = results.data;
                    console.table(response);
                    map.addMarker({
                        lat: response[0].lat,
                        lng: response[0].lng,
                        title: response[0].name,
                        click: function(e) {
                            alert('You clicked on the '+ response[0].name + ' marker');
                        }
                    });

                });

            },
            setMarker: function() {
                map.addMarker({

                    lat: 32.79222,
                    lng: -79.9404072,
                    title: 'Damon',
                    click: function(e) {
                        alert('You clicked in this marker');
                    }
                });
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
                    },
                    always: function() {
                        alert("Done!");
                    }
                });

            }

        }
    }]);
}

},{}]},{},[3])