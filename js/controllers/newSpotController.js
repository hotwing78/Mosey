module.exports = function(app) {
    app.controller('newSpotController', ['$scope', '$location', 'newSpotService', function($scope, $location, AddSpot) {

        var moseyObject = {
            name : $scope.name = '',
            category: $scope.category = 'Tours',
            price: $scope.price = '$',
            localstake: $scope.localstake = '',
        }

        $scope.new = function() {
            if ($scope.name || $scope.localstake === '') {
                $scope.errorMessage = 'Fill in all fields'
            } else {
                AddSpot.moseyObject(moseyObject);
                AddSpot.addActivity();
            }
        }

    }]);
}
