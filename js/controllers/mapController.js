module.exports = function(app) {
        app.controller('mapController', ['$scope', '$compile', '$location', 'Markers', 'loginService', function($scope, $compile, $location, Markers, loginService) {

                let lat = '';
                let lng = '';
                // trying to have the name of the added place
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
                    new google.maps.Size(30, 30)
                );

                var itinIcon = new google.maps.MarkerImage(
                    "./images/pin.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(30, 30)
                );

                var eatsIcon = new google.maps.MarkerImage(
                    "./images/food.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(40, 40)
                );


                var seeIcon = new google.maps.MarkerImage(
                    "./images/tour.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(50, 50)
                );

                $scope.itin = [];
                $scope.selector = 'all';
                $scope.newInstructions = false;
                $scope.toggle = function() {
                    $scope.newInstructions = !$scope.newInstructions;
                };

                $scope.getItinerary = function() {
                    //Redirect user to log in page if they are not logged in

                    userLocal();
                }

                $scope.addPlace = function() {
                    console.log('clicked');
                    Markers.itineraryAdd();
                    map.hideInfoWindows();
                };

                $scope.deletePoint = function(point) {
                    console.log('clicked delete');
                    console.log(this.point.name);
                    //$scope.itin.removeObject(point);
                    Markers.itineraryDelete(this.point);
                    map.removeMarkers();
                    userLocal();
                };

                $scope.getSelection = function() {
                    map.removeMarkers();
                    map.addMarker({
                        lat: lat,
                        lng: lng,
                        title: 'user',
                        icon: pinIcon,
                        animation: google.maps.Animation.BOUNCE,
                    })
                    if ($scope.selector === 'all') {
                        addEats();
                        addPlaces();
                    } else if ($scope.selector === 'food') {
                        addEats();
                    } else if ($scope.selector === 'itinerary'){
                        userLocal();
                    } else {
                        addPlaces();
                    }
                }

                function content(point, name) {
                    var htmlElement = `<div class = 'info'>
                            \t<strong>${point.name}</strong></br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            <button ng-click ="addPlace(point)">ADD</button>
                            </div>`
                    var compiled = $compile(htmlElement)($scope)
                    return compiled[0];
                }

                function itineraryContent(point, name) {
                    var htmlElement = `<div class = 'info'>
                            \t<strong>${point.name}</strong></br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            </div>`
                    var compiled = $compile(htmlElement)($scope)
                    return compiled[0];
                }


                function userLocal() {
                  if (loginService.getUsername() === undefined) {
                      console.log('no log in');
                      $location.path('/login')
                  }
                    console.table($scope.itin)
                    map.removeMarkers();
                    userMarker();
                    Markers.getMarker('additinerary').then(function(promise) {
                        //itin = promise;
                        angular.copy(promise, $scope.itin);
                        promise.forEach(function(point) {
                            if (point.name !== '') {

                                map.addMarker({
                                    lat: point.lat,
                                    lng: point.lng,
                                    title: point.name,
                                    icon: itinIcon,
                                    infoWindow: {
                                        content: itineraryContent(point, point.name), //I have another function called content declared earlier
                                    },
                                    click: function(e) {
                                        console.log('click')
                                          Markers.setPoint(point);
                                    }
                                }); //end addMarker
                            } // end of the if statement
                        }); //End forEach
                    });
                };

                function userMarker() {
                    map.addMarker({
                        lat: lat,
                        lng: lng,
                        title: 'user',
                        icon: pinIcon,
                        animation: google.maps.Animation.BOUNCE,
                    });

                }

                function addEats() {
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
                                        content: content(point, point.name), //I have another function called content declared earlier
                                    },
                                    click: function(e) {
                                        Markers.setPoint(point);

                                    }
                                }); //end addMarker
                            } // end of the if statement
                        }); //End forEach
                    });

                }

                function addPlaces() {
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
                                        content: content(point, point.name), //I have another function called content declared earlier
                                    },
                                    click: function(e) {
                                        Markers.setPoint(point);
                                    }
                                }); //end addMarker

                            } // end of the if statement
                        }); //End forEach
                    }); //End Markers.getMarker
                  }

                    GMaps.geolocate({
                        success: function(position) {
                            lat = position.coords.latitude;
                            lng = position.coords.longitude;


                            // intial map population*************************
                            Markers.getCurrentLocation(lat, lng);
                            map.setZoom(17);
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

                            addEats();
                            // activity markers on the map*******************
                            addPlaces();
                        },
                        error: function(error) {
                            alert('Geolocation failed: ' + error.message);
                        },
                        not_supported: function() {
                            alert("Your browser does not support geolocation");
                        }
                    });
                }]);
        }
