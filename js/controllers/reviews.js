module.exports = function(app){
  app.controller('reviewsController', ['$scope', '$http', '$location', 'ReviewsService', function($scope, $http, $location, ReviewsService){

    console.log('hihihihi reviews controller');

  }])
}
