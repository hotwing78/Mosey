module.exports = function(app) {
    app.controller('newSpotController', ['$scope', '$location', 'newSpotService', function($scope, $location, AddSpot) {

        var moseyObject = {
            name : $scope.name = '',
            category: $scope.category = 'Tours',
            price: $scope.price = '$',
            localstake: $scope.localstake = '',
        }

        $scope.new = function() {

                AddSpot.moseyObject(moseyObject);
                AddSpot.addActivity();
            
        }

    }]);
}
