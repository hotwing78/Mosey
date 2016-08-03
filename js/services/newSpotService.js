module.exports = function(app) {
    app.factory('newSpotService', ['$http', function($http) {

        var moseyObject;

        return {
            moseyObject: function(obj) {
              console.log(obj.name , obj.localstake);
              moseyObject = obj;
            },
            addFood: function(){
            $http({
                method: 'POST',
                url: '/newfood',
                data: moseyObject,
                })
            },

            addActivity: function() {
              $http({
                method: 'POST',
                url: '/newactivity',
                data: moseyObject,
                  })
            }

          }//end of return
    }]);//end of factory
}//end of module
