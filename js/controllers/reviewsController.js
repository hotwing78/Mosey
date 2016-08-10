Array.prototype.removeObject = function(object) {
    var idx = this.indexOf(object);
    if (typeof idx === "number") {
        console.log(idx);
        this.splice(idx, 1);
    }
}

module.exports = function(app) {
    app.controller('reviewsController', ['$scope', '$http', '$location', 'reviewsService', 'loginService', function($scope, $http, $location, reviewsService, loginService) {
        $scope.reviewList = reviewsService.getAllReviews();
        $scope.username = loginService.getUsername();
        $scope.errorMessage = '';

        $scope.addReview = function() {
            console.log(`send new review ${$scope.reviewText}`);
            return $http({
                method: 'POST',
                url: '/reviews',
                data: {
                    comment: $scope.reviewText
                }
            }).catch(function(response) {
                $scope.errorMessage = response.data.message;
            }).then(function(response) {
                return reviewsService.getAllReviews();
                $scope.data = null;
            });
        };

        $scope.deleteReview = function(review) {
            var comment = {
                id: review.id,
                comment: review.comment,
                username: review.username
            }
            return $http({
                method: 'POST',
                url: '/deletereviews',
                data: comment,
            }).then(function(res) {
                $scope.reviewList.removeObject(review);
            }).catch(function(response) {
                $scope.errorMessage = response.data.message;
            })
        };
    }])
}
