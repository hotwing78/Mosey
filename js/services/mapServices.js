module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var map = new GMaps({
            div: '#map',
            lat: -22.043333,
            lng: -77.028333
        });
        return {
            getLocations: function() {
                GMaps.geolocate({
                    success: function(position) {
                        let lat = position.coords.latitude
                        let lng = position.coords.longitude
                        $http({
                            url: '/',
                            method: 'Post',
                            data: lat,lng
                        });
                        map.setCenter(lat, lng);
                        map.addMarker({
                            lat: lat,
                            lng: lng,
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
