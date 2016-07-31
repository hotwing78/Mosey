module.exports = function(app){
  app.factory('reviewsService', ['$http', '$location', function($http, $location){

    let allReviewsList = [];

    return {
      getAllReviews: function(){
        $http({
          method: 'GET',
          url: '/savedreviews',
        }).then(function(response) {
            angular.copy(response.data, allReviewsList);
        })
        return allReviewsList
      }
    };
  }]);
}
