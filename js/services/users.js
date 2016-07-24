module.exports = function(app){
  app.factory('UserService', function($http){

    let username = "";
    let usersArray = [];

    return {

      createUser: function(name,password){
        username = name;
        console.log(username, "IS LOGGING IN");

        $http({
          method: 'POST',
          url: ''
        })
      }
    }
  })
}
