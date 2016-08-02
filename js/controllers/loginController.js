module.exports = function(app) {
    app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService) {

        $scope.firstname = '';
        $scope.lastname = '';
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.isLocal = '';
        $scope.errorMessage = '';
        $scope.error = true;


        // not yet working

        $scope.logout = function() {
            Session.clear();
            success(function(response) {
                $location.path('/login');
            }, function(response) {
                $scope.errorMessage = response.data.message;
            });
        };

        $scope.register = function() {
            loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
                .success(function(response) {
                    $location.path('/mosey');
                }, function(response) {
                    $scope.errorMessage = response.data.message;
                });
        };

        $scope.login = function() {
            loginService.loginUser($scope.username, $scope.password)
                .then(function(response) {
                    console.log('successful')
                    $location.path('/mosey')

                }, function(response) {
                    console.log('unsuccessful');
                    $scope.errorMessage = response.data.message;
                });

        };


    }]);
}
