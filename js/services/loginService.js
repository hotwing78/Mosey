module.exports = function(app){
  app.factory('loginService', function($http){

    let firstname = "";
    let lastname = "";
    let email = "";
    let username = "";
    let password = "";
    let isLocal = true;

    let usersArray = []

    return {

      getUser: function(){
        console.log("here");
        $http({
          method: 'GET',
          url: '/users',
        }).then(function(response){
          console.log('YAY USER', response);
          console.log(response);
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
      getUsername: function(){
        return username;
      },


    }
  })
}
