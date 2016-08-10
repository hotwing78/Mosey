module.exports = function(app) {
    app.factory('Markers', ['$http', function($http) {

        var possiblePoint;

        return {
          // Sets the point to add to the itinerary
          setPoint: function(point){
             possiblePoint = point;
           },//********************************

           //gets the point stored in possiblePoint to be used when adding to the itinerary
            getPoint: function(){
              return possiblePoint;
            },

            //Makes the post to the itinerary database
            itineraryAdd: function() {
                $http({
                    url: '/itinerary',
                    method: 'post',
                    data: possiblePoint,
                })
            },
            //Makes the delete from the itinerary database
            itineraryDelete: function(point) {
                $http({
                    url: '/deleteitinerary',
                    method: 'post',
                    data: JSON.stringify(point)
                }).success(function(response){
                    console.log(response);
                });
            },

            //Snags the users current coordinates on the map.
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

            // Makes a call to the restaurants database
            getMarker: function(type) {
                var promise = $http({
                    url: '/' + type,
                    method: 'get'
                }).then(function(results) {
                    return results.data;
                });
                return promise;
            },


            //Makes a call for the itinerary
            userItinerary: function(){
              var promise = $http({
                url: '/additinerary',
                method: 'get'
              }).then(function(results) {
                return results.data;
              })
              return promise;
            }

        } //End of return*****************************
    }]); //End of end of app.Factory******************
}
