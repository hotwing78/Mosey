module.exports = function(app){
  app.factory('loginService', function($http){

    let firstname = "";
    let lastname = "";
    let email = "";
    let username = "";
    let password = "";
    let isLocal = true;

    return {

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
