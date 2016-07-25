module.exports = function(app) {
    app.controller('mapController', ['$scope', 'Markers', function($scope, Markers) {
        var food = [];

        Markers.getRestaurants().then(function(promise){
          food = promise;
          console.log(food[0].name);
          for(let i = 0; i < food.length; i++){
          Markers.setMarker(food[i].lat,food[i].lng,food[i].name)
        }
        });
          console.log('Log here');

        //  Markers.setMarkers(Markers.getRestaurants().);
        // scope.$watch('food', function() {
        //     Markers.setMarker();
        // }, true);
    }]);
}
