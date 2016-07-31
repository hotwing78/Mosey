module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itinerary = [];
        var restaurants = [];
        var possiblePoint;

        return {
          setPoint: function(point){
             possiblePoint = point;
           },
            getEats: function() {
                return restaurants
            },

            intineraryAdd: function() {
                $http({
                    url: '/itinerary',
                    method: 'post',
                    data: possiblePoint,
                })
                console.log(possiblePoint);

            },
            getCurrentLocation: function(lat, lng) {
                $http({
                    url: '/mosey',
                    method: 'post',
                    data: {
                        lat: lat,
                        lng: lng,
                    }
                });
            },

            getRestaurants: function() {
                var promise = $http({
                    url: '/food',
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;
            }

        } //End of return*****************************
    }]); //End of end of app.Factory******************
}
