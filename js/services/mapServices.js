module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itinerary = [];

        var map = new GMaps({
            div: '#map',
            lat: 32.79222,
            lng: -79.9404072,
        });

        var goldStar = {
          path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
          fillColor: 'yellow',
          fillOpacity: 0.8,
          scale: .1,
          strokeColor: 'gold',
          strokeWeight: 14
        };

        var infoWindowContent = '<button>Click to add!</button';
        return {

            getLocationName: function() {
                return name;
            },//End of getLocationName************************************************************

            setMarker: function(point) {
                map.addMarker({
                    lat: point.lat,
                    lng: point.lng,
                    title: point.name,
                    infoWindow: {
                    content: point.name + infoWindowContent,
                    click: function(e) {
                      $http({
                        url: '/itinerary',
                        method: 'post',
                        data: point,
                      });
                      console.log('clicked');

                    },
                    closeclick: function(e) {
                         $("#customer-details-container").hide();
                     }
                    // click: function(e) {
                    //   $http({
                    //     url: '/itinerary',
                    //     method: 'post',
                    //     data: point
                    //   })
                    //     itinerary.push(point);
                    //     console.log(itinerary);

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
            getLocation: function() {
                GMaps.geolocate({
                    success: function(position) {
                      let lat = position.coords.latitude;
                      let lng = position.coords.longitude;
                      $http({
                        url:'/mosey',
                        method:'post',
                        data:{
                          lat:lat,
                          lng:lng,
                          }
                      });
                      map.addMarker({
                          lat: lat,
                          lng: lng,
                          title: 'user',
                          icon: goldStar,
                      });
                        map.setCenter(position.coords.latitude, position.coords.longitude);
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
