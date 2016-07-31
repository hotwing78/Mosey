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
    $scope.error = false;

    $scope.register = function(){
      console.log(`${$scope.firstname} is in the system`);
      loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
      .success(function(response) {
          console.log('user login', response);
          $location.path = ('/mosey');
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

          console.log('successful')
          $location.path('/mosey')
          
      },function(response){
        console.log('response', response.data.message);
        console.log('unsuccessful');
        $scope.errorMessage = response.data.message;
      });

    };


  }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
        app.controller('mapController', ['$scope', '$compile', 'Markers', function($scope, $compile, Markers) {

                let lat = '';
                let lng = '';
                // Initializing Gmaps
                let map = new GMaps({
                    div: '#map',
                    lat: 32.79222,
                    lng: -79.9404072,
                });
                // *************************************
                //The gold star user marker
                let goldStar = {
                        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                        fillColor: 'yellow',
                        fillOpacity: 0.8,
                        scale: .1,
                        strokeColor: 'gold',
                        strokeWeight: 1
                    }
                    // ****************************************

                function content(point) {
                    var htmlElement = `<div class = 'info'>
                            Name:\t${point.name}</br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            <button ng-click ="random()">ADD</button>
                            </div>`
                    var compiled = $compile(htmlElement)($scope)
                    return compiled[0];
                }

                $scope.random = function() {
                    console.log('clicked');
                    Markers.itineraryAdd();
                };
                $scope.getItinerary = function() {
                    map.removeMarkers();
                    map.addMarker({
                        lat: lat,
                        lng: lng,
                        title: 'user',
                        icon: goldStar,
                    });
                    Markers.userItinerary().then(function(promise) {
                        let itin = promise;
                        console.table(itin);
                        itin.forEach(function(point) {
                            if (point.name !== '') {
                                map.addMarker({
                                    lat: point.lat,
                                    lng: point.lng,
                                    title: point.name,

                                    click: function(e) {
                                        console.log('click')
                                    }
                                }); //end addMarker
                            } // end of the if statement
                        }); //End forEach
                    });
                    }


                    GMaps.geolocate({
                        success: function(position) {
                            lat = position.coords.latitude;
                            lng = position.coords.longitude;

                            // intial map population*************************
                            Markers.getCurrentLocation(lat, lng);
                            // User location on the map
                            map.addMarker({
                                lat: lat,
                                lng: lng,
                                title: 'user',
                                icon: goldStar,
                            });
                            // *******************************************

                            // center map on user*******************************
                            map.setCenter(position.coords.latitude, position.coords.longitude);

                            // Resturant markers on the map*******************
                            Markers.getRestaurants().then(function(promise) {
                                let food = promise;
                                food.forEach(function(point) {
                                    if (point.name !== '') {
                                        map.addMarker({
                                            lat: point.lat,
                                            lng: point.lng,
                                            title: point.name,
                                            fillColor: '#4caf50',
                                            color: 'yellow',
                                            infoWindow: {
                                                content: content(point),

                                            },
                                            click: function(e) {
                                                Markers.setPoint(point);
                                            }
                                        }); //end addMarker
                                    } // end of the if statement
                                }); //End forEach
                            }); //End Markers.getRestaurants
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
                }]);
        }

},{}],3:[function(require,module,exports){
Array.prototype.removeObject = function(object){
  var idx = this.indexOf(object);
  if (typeof idx === "number"){
    console.log(idx);
      this.splice(idx,1);
  }
}

module.exports = function(app) {
    app.controller('reviewsController', ['$scope', '$http', '$location', 'reviewsService', 'loginService', function($scope, $http, $location, reviewsService, loginService) {

        $scope.reviewList = reviewsService.getAllReviews();
        $scope.username = loginService.getUsername();
        $scope.errorMessage = '';
        $scope.addReview = function() {
            console.log(`send new review ${$scope.reviewText}`);
            return $http({
                method: 'POST',
                url: '/reviews',
                data: {
                    comment: $scope.reviewText
                    // username: 'teammosey'
                }
            }).catch(function(response) {
                console.log('BRANDON', response);
                $scope.errorMessage = response.data.message;
            }).then(function(response) {
                console.log('pina colada', response);
                return reviewsService.getAllReviews();
            })


        };

        $scope.deleteReview = function(review) {
            console.log("review:" , review);
            var comment = {
              id: review.id,
              comment: review.comment,
              username: review.username
            }
            console.log(comment);
          return $http({
            method: 'POST',
            url: '/deletereviews',
            data: comment,
          }).then(function(res){
            // console.log(res);
            // var indexOfReview = $scope.reviewList.indexOf(review);
            // console.log(indexOfReview);
            // $scope.reviewList.splice(indexOfReview, 1);
            $scope.reviewList.removeObject(review);
          }).catch(function(response) {
              console.log('BRANDON', response);
              $scope.errorMessage = response.data.message;
          })
          // .then(function(response){
          //   console.log('deletttting this response: ', response);
          // }), function(error){
          //   console.log('delete error');
          // }
            // $scope.reviewList.splice(index, 1);
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
        var currentUser = {};

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
                    currentUser = response.config.data.username;
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
        var restaurants = [];
        var possiblePoint;

        return {
          setPoint: function(point){
             possiblePoint = point;
           },
            getEats: function() {
                return restaurants
            },

            intineraryAdd: function() {
                $http({
                    url: '/itinerary',
                    method: 'post',
                    data: possiblePoint,
                })
                console.log(possiblePoint);

            },
            getCurrentLocation: function(lat, lng) {
                $http({
                    url: '/mosey',
                    method: 'post',
                    data: {
                        lat: lat,
                        lng: lng,
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

            userItinerary: function(){
              var promise = $http({
                url: '/itinerary',
                method: 'get'
              }).then(function(results) {
                return results.data;
              })
              return promise;
            }

        } //End of return*****************************
    }]); //End of end of app.Factory************************************************************
}

},{}],7:[function(require,module,exports){
module.exports = function(app){
  app.factory('reviewsService', ['$http', '$location', function($http, $location){


    console.log('you on reviews service');

    let allReviewsList = [];

    return {
      getAllReviews: function(){
        // console.log('getting reviews from server');
        $http({
          method: 'GET',
          url: '/savedreviews',
        }).then(function(response) {
          console.log('saved reviews', response, response.data)
            angular.copy(response.data, allReviewsList);
        })
        console.log('allReviewsList issss', allReviewsList);
        return allReviewsList
      }
    };
  }]);
}

},{}]},{},[4])