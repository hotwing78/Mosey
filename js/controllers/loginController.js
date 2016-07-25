module.exports = function(app){
  app.controller('loginController', ['$scope', '$http', '$location', 'loginService', function($scope, $http, $location, loginService){

    console.log('hihihihi users controller');

    $scope.name="";
    $scope.password="";
    $scope.usersArray = loginService.getUser();

    $scope.login = function(){
      console.log(`${scope.name} is in the systemmm`);
      UserService.createUser($scope.name,$scope.password);
      $location.path('/login');
    }

  }])
}
