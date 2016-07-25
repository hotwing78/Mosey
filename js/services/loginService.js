module.exports = function(app){
  app.factory('loginService', function($http){

    let username = "";

    return {

      registerUser: function(username,password){
          username = username;
          return $http({
            method: 'POST',
            url: '/register',
            data: {
              username: username,
              password: password,
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
