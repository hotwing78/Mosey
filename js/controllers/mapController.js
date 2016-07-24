module.exports = function(app) {
        app.controller('mapController',['$http','Markers',function($http,Markers) {
            Markers.getLocations();
            Markers.setMarker();
            Markers.getRestaurants();

        }]);
      }
