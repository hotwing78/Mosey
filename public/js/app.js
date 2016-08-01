(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
    app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService) {

        $scope.firstname = '';
        $scope.lastname = '';
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.isLocal = '';
        $scope.errorMessage = '';
        $scope.error = true;

        $scope.logout = function() {
            logoutService.logout();
        };

        $scope.register = function() {
            loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
                .success(function(response) {
                    $location.path('/mosey');
                }, function(response) {
                    $scope.errorMessage = response.data.message;
                });
        };

        $scope.login = function() {
            loginService.loginUser($scope.username, $scope.password)
                .then(function(response) {
                    console.log('successful')
                    $location.path('/mosey')

                }, function(response) {
                    console.log('unsuccessful');
                    $scope.errorMessage = response.data.message;
                });

        };


    }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('mapController', ['$scope', '$compile','$location','Markers','loginService', function($scope, $compile,$location,Markers,loginService) {

        // trying to have the name of the added place

        $scope.itin = [];


        $scope.addPlace = function() {
            console.log('clicked');
            Markers.itineraryAdd();
            map.hideInfoWindows();
        };

        $scope.deletePoint = function() {
            console.log('clicked delete');
            console.log(this.point.name);
            Markers.itineraryDelete(this.point);

            //Markers.itineraryDelete();
        };


        let map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });


        var pinIcon = new google.maps.MarkerImage(
                "./images/Mosey_Logo_Square.png",
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new google.maps.Size(50, 50)
            );


            var eatsIcon = new google.maps.MarkerImage(
                    "./images/Mosey_Eats_Square.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(40, 40)
                );


            var seeIcon = new google.maps.MarkerImage(
                    "./images/Mosey_Tour_Square.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(40, 40)
                );

        let lat = '';
        let lng = '';


        function content(point,name) {
            var htmlElement = `<div class = 'info'>
                            Name:\t<strong>${name}</strong></br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            <button ng-click ="addPlace(point)">ADD</button>
                            </div>`
                    var compiled = $compile(htmlElement)($scope)
                    return compiled[0];
                }

                $scope.getItinerary = function() {
                  //Redirect user to log in page if they are not logged in
                  if(loginService.getUsername() === undefined){
                      console.log('no log in');
                      $location.path('/login')
                      }
                // ******************************************************

                    map.removeMarkers();
                    map.addMarker({
                        lat: lat,
                        lng: lng,
                        title: 'user',
                        icon: pinIcon,
                    });
                    Markers.getMarker('additinerary').then(function(promise) {
                        //itin = promise;
                        angular.copy(promise,$scope.itin);
                        promise.forEach(function(point) {
                            if (point.name !== '') {
                                map.addMarker({
                                    lat: point.lat,
                                    lng: point.lng,
                                    title: point.name,
                                    icon: eatsIcon,

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
                                icon: pinIcon,
                                animation: google.maps.Animation.BOUNCE,
                            });
                            // *******************************************

                            // center map on user*******************************
                            map.setCenter(position.coords.latitude, position.coords.longitude);

                            // Resturant markers on the map*******************
                            Markers.getMarker('food').then(function(promise) {
                                let food = promise;
                                food.forEach(function(point) {
                                    if (point.name !== '') {
                                        map.addMarker({
                                            lat: point.lat,
                                            lng: point.lng,
                                            title: point.name,
                                            icon: eatsIcon,

                                            optimized: false,
                                            infoWindow: {
                                                content: content(point,point.name),//I have another function called content declared earlier
                                            },
                                            click: function(e) {
                                                Markers.setPoint(point);
                                            }
                                        }); //end addMarker
                                    } // end of the if statement
                                }); //End forEach
                            }); //End Markers.getRestaurants

                            // activity markers on the map*******************
                            Markers.getMarker('activity').then(function(promise) {
                                let food = promise;
                                food.forEach(function(point) {
                                    if (point.name !== '') {
                                        map.addMarker({
                                            lat: point.lat,
                                            lng: point.lng,
                                            title: point.name,
                                            icon: seeIcon,

                                            infoWindow: {
                                                content: content(point,point.activityname),//I have another function called content declared earlier
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

          }).catch(function(response) {
              $scope.errorMessage = response.data.message;
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
        var currentUser;

        // logout route in the works
        var logout = function() {
            $http.post('/logout').then(function(data) {
                console.log(data);
            })
        }

        return {

            // logout: logout; **not yet working

            getUser: function() {
                $http({
                    method: 'GET',
                    url: '/users',
                }).then(function(response) {
                    console.log('getting the user', response.data);
                    let userList = response.data
                    angular.copy(userList, usersArray)
                })
                return usersArray;
            },
            registerUser: function(firstname, lastname, email, username, password, isLocal) {
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
                return $http({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: username,
                        password: password,
                    }
                }).then(function(response) {
                    if (response.config.data.username === username) {
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

        var possiblePoint;

        return {
          // Sets the point to add to the itinerary
          setPoint: function(point){
             possiblePoint = point;
           },//********************************

           //gets the point stored in possiblePoint to be used when adding to the itinerary
            getPoint: function(){
              return possiblePoint;
            },

            //Makes the post to the itinerary database
            itineraryAdd: function() {
                $http({
                    url: '/itinerary',
                    method: 'post',
                    data: possiblePoint,
                })
            },
            //Makes the delete from the itinerary database
            itineraryDelete: function(point) {
                $http({
                    url: `/itinerary/${point}`,
                    method: 'delete',
                    data: JSON.stringify({point})
                }).success(function(response){
                    console.log(response);
                });
            },

            //Snags the users current coordinates on the map.
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

            // Makes a call to the restaurants database
            getMarker: function(type) {
                var promise = $http({
                    url: '/' + type,
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;
            },


            //Makes a call for the itinerary
            userItinerary: function(){
              var promise = $http({
                url: '/additinerary',
                method: 'get'
              }).then(function(results) {
                return results.data;
              })
              return promise;
            }

        } //End of return*****************************
    }]); //End of end of app.Factory******************
}

},{}],7:[function(require,module,exports){
module.exports = function(app){
  app.factory('reviewsService', ['$http', '$location', function($http, $location){

    let allReviewsList = [];

    return {
      getAllReviews: function(){
        $http({
          method: 'GET',
          url: '/savedreviews',
        }).then(function(response) {
            angular.copy(response.data, allReviewsList);
        })
        return allReviewsList
      }
    };
  }]);
}

},{}]},{},[4])