module.exports = function(app){
  app.factory('loginService', function($http){

    let firstname = "";
    let lastname = "";
    let email = "";
    let username = "";
    let password = "";
    let isLocal = true;

    let usersArray = [];

    return {

      getUser: function(){
        console.log("here");
        $http({
          method: 'GET',
          url: '/users',
        }).then(function(response){
          console.log('YAY USER', response);
          console.log(response.data);
          let userList = response.data
          angular.copy(userList, usersArray)
        })
          return usersArray;
      },

      registerUser: function(firstname, lastname, email, username, password, isLocal){

          $http({
            method: 'POST',
            url: '/register',
            data: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              username: username,
              password: password,
              isLocal: true,
            }
          }).then(function(response){
            console.log('getttting', response);
            console.log(response.data);
            console.log(username);
          })
      },

      loginUser: function(username,password){
        console.log(username, password);
        $http({
          method: 'POST',
          url: '/login',
          data: {
            username: username,
            password: password,
          }
          }).then(function(response){
            console.log('user login', response)
        })
      },

      getUsername: function(){
        return username;
      },


    }
  })
}
