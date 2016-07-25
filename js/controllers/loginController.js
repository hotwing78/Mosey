module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('hihihihi users controller');
    console.log('CLICKED REGGI');

    $scope.username = '';
    $scope.password = '';

    $scope.register = function(){
      console.log(`${$scope.username} is in the system`);
      loginService.registerUser($scope.username, $scope.password);
      $location.path('/register');
    };


  }]);
}
