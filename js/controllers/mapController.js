module.exports = function(app) {
    app.controller('mapController', ['$scope', 'Markers', function($scope, Markers) {
        // $scope.itenerary = Markers.getItenerary();

        Markers.getRestaurants().then(function(promise){
          let food = promise;
          for(let i = 0; i < food.length; i++){
          Markers.setMarker(food[i])
        }
        });
          console.log('Log here');

        //  Markers.setMarkers(Markers.getRestaurants().);
        // scope.$watch('food', function() {
        //     Markers.setMarker();
        // }, true);
    }]);
}
