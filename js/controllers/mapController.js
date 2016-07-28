module.exports = function(app) {
    app.controller('mapController', ['$scope', '$compile', 'Markers', function($scope, $compile, Markers) {

        $scope.random = function() {
          let point = Markers.getPoint();
          Markers.intineraryAdd(point);
            console.log('clicked');

        };
        Markers.getLocation();
        Markers.getRestaurants().then(function(promise) {
            let food = promise;
            for (let i = 0; i < food.length; i++) {
                Markers.setMarker(food[i], function(point) {

                        var htmlElement = `<div class = 'info'>
                             Name:\t${point.name}</br>
                             Price:\t${point.price}</br>
                             Category:\t${point.category}</br>
                             <button ng-click ="random()">ADD</button> </div>`
                        var compiled = $compile(htmlElement)($scope)
                            return compiled[0];

                    }) //Passing in a anonomys function that returns compiled...On the fly.
            }
        });


    }]);
}
