module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        let food = {};
        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });
        return {
            setMarker: function(x, y, name) {
                map.addMarker({
                    lat: x,
                    lng: y,
                    title: name,
                    click: function(e) {
                        alert('You clicked on the ' + name + ' marker');
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
                    }
                });

            }

        }
    }]);
}
