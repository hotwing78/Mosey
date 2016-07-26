module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itenerary = [];

        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });

        // var goldStar = {
        //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        //   fillColor: 'yellow',
        //   fillOpacity: 0.8,
        //   scale: .1,
        //   strokeColor: 'gold',
        //   strokeWeight: 14
        // };
        return {

            getLocationName: function() {
                return name;
            },//End of getLocationName************************************************************

            setMarker: function(point) {
                map.addMarker({
                    lat: point.lat,
                    lng: point.lng,
                    title: point.name,
                    // icon: goldStar,
                    click: function(e) {
                        itenerary.push(point);
                        console.log(itenerary);
                        alert('You clicked on the ' + point.name + ' marker');
                    }
                });

            },//End of setMarker******************************************************************

          /* This is where I make a call to the server to get the available eats in town*/
            getRestaurants: function() {
                var promise = $http({
                    url: '/food',
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;

            },//End of getRestaurants************************************************************

            /* This is where I make a call to the server to get the available events*/
            getEvents: function() {
                var promise = $http({
                    url: '/activity',
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;

            },//End of getEvent******************************************************************

            getItenerary: function() {
                return itenerary;
            },//End of getItenerary***************************************************************

            /*This is where I set the available activities to points on the map*/
            getLocations: function() {
                GMaps.geolocate({
                    success: function(position) {
                      $http({
                        url:'/mosey',
                        method:'post',
                        data: position
                      });
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

            }//End of getLocations**************************************************************

        }//End of return*****************************
    }]);//End of end of app.Factory************************************************************
}
