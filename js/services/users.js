module.exports = function(app){
  app.factory('UserService', function($http){

    let username = "";

    return {

      createUser: function(name,password){
        username = name;
        console.log(username, "IS LOGGING IN");

        $http({
          method: 'POST',
          url: '/#/login',
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
