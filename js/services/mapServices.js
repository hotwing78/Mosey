module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
       let eats = [];
        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });
        return {
            getRestaurants: function(){
              $http({
                url: '/restaurants',
                method:'get'
              }).then(function(results){
                let response = results.data;
                response.forEach(function(){
                  if(response.Category === 'Seafood'){
                     eats.push(response.Name);
                     console.log(response.Name);
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
