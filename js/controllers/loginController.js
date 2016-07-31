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
    $scope.error = true;

    $scope.register = function(){
      console.log(`${$scope.firstname} is in the system`);
      loginService.registerUser($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.isLocal)
      .success(function(response) {
          console.log('user login', response);
          $location.path = ('/mosey');
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

          console.log('successful')
          $location.path('/mosey')
          
      },function(response){
        console.log('response', response.data.message);
        console.log('unsuccessful');
        $scope.errorMessage = response.data.message;
      });

    };


  }]);
}
