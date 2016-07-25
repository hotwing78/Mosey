module.exports = function(app){
  app.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){

    console.log('hihihihi users controller');

    $scope.name="";
    $scope.password="";
    $scope.usersArray = UserService.getUser();

    $scope.login = function(){
      console.log(`${scope.name} is in the systemmm`);
      UserService.createUser($scope.name,$scope.password);
      $location.path('/login');
    }

  }])
}
