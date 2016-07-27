module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('CLICKED REGGI');

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.isLocal = '';
    $scope.errorMessage = '';

    $scope.register = function(){
      console.log(`${$scope.firstname} is in the system`);
      loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
      .then(function(response) {
          console.log('user login', response);
      },function(response){
        console.log('response', response.data.message);
        $scope.errorMessage = response.data.message;
      });
    };

    $scope.login = function(){
      console.log("logging in!", $scope.username, $scope.password);
      loginService.loginUser($scope.username, $scope.password)
      .then(function(response) {
          console.log('user login', response);
      },function(response){
        console.log('response', response.data.message);
        $scope.errorMessage = response.data.message;
      });

    };


  }]);
}
