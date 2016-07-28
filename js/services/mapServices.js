module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {
        var itinerary = [];
        var restaurants = [];
        var possiblePoint;

        return {
          getPoint: function(){
             return possiblePoint;
           },
            getEats: function() {
                return restaurants
            },

            intineraryAdd: function(point) {
                $http({
                    url: '/itinerary',
                    method: 'post',
                    data: point,
                })

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
    }]); //End of end of app.Factory************************************************************
}
