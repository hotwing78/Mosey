module.exports = function(app){
  app.factory('reviewsService', ['$http', '$location', function($http, $location){


    console.log('you on reviews service');

    let allReviewsList = [];

    return {
      getAllReviews: function(){
        console.log('getting reviews from server');
        $http({
          method: 'GET',
          url: '/savedreviews',
        }).then(function(response) {
          console.log('saved reviews', response, response.data)
            angular.copy(response.data, allReviewsList);
        })
        return allReviewsList
      }
    };
  }]);
}
