module.exports = function(app){
  app.controller('reviewsController', ['$scope', '$http', '$location', 'reviewsService', 'loginService', function($scope, $http, $location, reviewsService, loginService){

    $scope.username = loginService.getUser();
    console.log('hihihihi reviews controller');

  }])
}
