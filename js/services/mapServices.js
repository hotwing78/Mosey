module.exports = function(app) {
    app.factory('Markers',['$http', function($http) {
            var map = new GMaps({
                div: '#map',
                lat: -12.043333,
                lng: -77.028333
            });
            return {
                getLocations: function() {
                    GMaps.geolocate({
                        success: function(position) {
                            map.setCenter(position.coords.latitude, position.coords.longitude);
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
