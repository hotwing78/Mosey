module.exports = function(app) {
    app.controller('mapController', ['$scope','$compile', 'Markers', function($scope,$compile, Markers) {

        $scope.random = function(){
          console.log('clicked');
        };
        Markers.getLocation();
        Markers.getRestaurants().then(function(promise){
          let food = promise;
          for(let i = 0; i < food.length; i++){
          Markers.setMarker(food[i],function(point) {

            var htmlElement =  '<div ng-click="random()" >'
            + point.name + ' ADD' +'</div>'
            var compiled = $compile(htmlElement)($scope)
            return compiled[0];

          })
        }
        });
          console.log('Log here');

        //  Markers.setMarkers(Markers.getRestaurants().);
        // scope.$watch('food', function() {
        //     Markers.setMarker();
        // }, true);
    }]);
}
