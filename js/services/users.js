module.exports = function(app){
  app.factory('UserService', function($http){

    let username = "";
    let usersArray = [];

    return {

      getUser: function(){
          $http({
            method: 'GET',
            url: '/login',
          }).then(function(response){
            console.log('getttting', response);
            console.log(response.data);
            let userList = response.data
            angular.copy(userList, usersArray)
          })
          return usersArray;
      },

      createUser: function(name,password){
        username = name;
        console.log(username, "IS LOGGING IN");

        $http({
          method: 'POST',
          url: '/login',
          data: {
            username: name,
            password: password,
          }
        }).then(function(response){
          console.log(username);
          console.log('this is what is returning', response);
        })
      },

      getUserName: function(){
        return username;
      }
    }
  })
}
