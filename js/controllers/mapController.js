module.exports = function(app) {
    app.controller('mapController', ['$scope', '$compile', '$location', 'Markers', 'loginService', function($scope, $compile, $location, Markers, loginService) {

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
            new google.maps.Size(50, 50)
        );


        var eatsIcon = new google.maps.MarkerImage(
            "./images/Mosey_Eat.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(40, 40)
        );


        var seeIcon = new google.maps.MarkerImage(
            "./images/Mosey_Activities.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(40, 40)
        );

        let lat = '';
        let lng = '';

        $scope.itin = [];
        $scope.selector = 'all';

        $scope.getItinerary = function() {
            //Redirect user to log in page if they are not logged in
            if (loginService.getUsername() === undefined) {
                console.log('no log in');
                $location.path('/login')
            }
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
            $scope.itin.removeObject(point);
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

                addPlaces(); //End Markers.getRestaurants

            } else if ($scope.selector === 'food') {
                addEats();
            } else {
                addPlaces();
            }
        }

        function content(point, name) {
            var htmlElement = `<div class = 'info'>
                            Name:\t<strong>${point.name}</strong></br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            <button ng-click ="addPlace(point)">ADD</button>
                            </div>`
            var compiled = $compile(htmlElement)($scope)
            return compiled[0];
        }


        function userLocal() {
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
                            icon: eatsIcon,

                            click: function(e) {
                                console.log('click')
                            }
                        }); //end addMarker
                    } // end of the if statement
                }); //End forEach
            });
        };

        function userMarker(){
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
            }); //End Markers.getRestaurants

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
