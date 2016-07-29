module.exports = function(app) {
    app.controller('mapController', ['$scope', '$compile', 'Markers', function($scope, $compile, Markers) {
        let myCtrl = this;
        myCtrl.tab = 'mosey';

        $scope.random = function() {
            console.log('clicked');
            Markers.intineraryAdd();
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
            strokeWeight: 14
        }


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


        GMaps.geolocate({
            success: function(position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                Markers.getCurrentLocation(lat, lng);
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    title: 'user',
                    icon: goldStar,
                });
                map.setCenter(position.coords.latitude, position.coords.longitude);
                Markers.getRestaurants().then(function(promise) {
                    let food = promise;
                    food.forEach(function(point) {
                      if(point.name !== ''){
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
