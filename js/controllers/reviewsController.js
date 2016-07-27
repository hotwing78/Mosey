module.exports = function(app){
  app.controller('reviewsController', ['$scope', '$http', '$location', 'reviewsService', 'loginService', function($scope, $http, $location, reviewsService, loginService){

    $scope.reviewList = reviewsService.getAllReviews();
    $scope.username = loginService.getUsername();
    $scope.errorMessage = '';

    $scope.addReview = function(){
      console.log(`send new review ${$scope.reviewText}`);
      return $http({
        method: 'POST',
        url: '/reviews',
        data: {
          comment: $scope.reviewText,
          username: 'teammosey'
        }
      }).then(function(response){
        console.log('pina colada', response);
        return reviewsService.getAllReviews();
      })
    };


  }])
}
