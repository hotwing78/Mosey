module.exports = function(app) {
    app.controller('mapController', ['$scope', '$compile', 'Markers', function($scope, $compile, Markers) {

        // trying to have the name of the added place

        $scope.itin = [];
        $scope.addPlace = function() {
            console.log('clicked');
            Markers.itineraryAdd();
            console.log(Markers.getPoint());
          
            itin.push(Markers.getPoint());
        };


        let map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });

        let goldStar = {
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            scale: .1,
            strokeColor: 'gold',
            strokeWeight: 1
        }

                let lat = '';
                let lng = '';


        function content(point) {
            var htmlElement = `<div class = 'info'>
                            Name:\t<strong>${point.name}</strong></br>
                            Price:\t${point.price}</br>
                            Category:\t${point.category}</br>
                            <button ng-click ="addPlace()">ADD</button>
                            </div>`
                    var compiled = $compile(htmlElement)($scope)
                    return compiled[0];
                }

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
